// supabase/functions/ingest/index.ts
//
// Procesa un documento ya subido a Supabase Storage.
// El frontend:
//   1. crea la fila en `documents` (status='processing', storage_path='documents/<uid>/<uuid>.<ext>')
//   2. sube el archivo a Storage en esa ruta
//   3. POST /functions/v1/ingest  { "documentId": "<uuid>" }
//
// Esta función:
//   descarga -> identifica tipo -> extrae texto (PDF/DOCX/TXT) u OCR (imagen, Gemini Vision)
//   -> normaliza -> trocea -> embeddings -> document_chunks -> actualiza status
//
// Estados de `documents.status`:  processing -> ready | failed | pending(image sin OCR)
// NUNCA se marca 'ready' si no se pudo extraer texto real.

import { corsHeaders, json } from "../_shared/http.ts";
import { adminClient, getUser } from "../_shared/supabase.ts";
import { chunk, extract } from "../_shared/extract.ts";
import { embed, generate, geminiConfigured, MODELS, readImage } from "../_shared/gemini.ts";
import { summaryPrompt, SYSTEM_ZYNQORA } from "../_shared/prompt.ts";

Deno.serve(async (req) => {
  const cors = corsHeaders(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return json({ error: "POST only" }, 405, cors);

  const user = await getUser(req);
  if (!user) return json({ error: "unauthorized" }, 401, cors);

  let body: any;
  try { body = await req.json(); } catch { return json({ error: "bad json" }, 400, cors); }
  const documentId: string = body.documentId;
  if (!documentId) return json({ error: "documentId required" }, 400, cors);

  const admin = adminClient();

  // el documento debe existir y ser del usuario (comprobación explícita: aquí usamos service_role)
  const { data: doc, error: docErr } = await admin
    .from("documents")
    .select("id, user_id, subject_id, name, mime_type, storage_path, kind")
    .eq("id", documentId)
    .maybeSingle();
  if (docErr || !doc) return json({ error: "document not found" }, 404, cors);
  if (doc.user_id !== user.id) return json({ error: "forbidden" }, 403, cors);

  const setStatus = (status: string, detail?: string, extra: Record<string, unknown> = {}) =>
    admin.from("documents").update({ status, status_detail: detail ?? null, ...extra }).eq("id", documentId);

  await setStatus("processing");

  try {
    if (!doc.storage_path) {
      await setStatus("failed", "no-storage-path");
      return json({ status: "failed", detail: "no-storage-path" }, 200, cors);
    }

    // 1. descargar de Storage
    const { data: file, error: dlErr } = await admin.storage.from("documents").download(doc.storage_path);
    if (dlErr || !file) {
      await setStatus("failed", "download-failed");
      return json({ status: "failed", detail: "download-failed" }, 200, cors);
    }
    const bytes = new Uint8Array(await file.arrayBuffer());

    // 2. extraer texto
    let ex = await extract(bytes, doc.mime_type || file.type || "", doc.name);

    // 2b. imagen -> OCR con Gemini Vision
    if (ex.kind === "image") {
      if (!geminiConfigured()) {
        await setStatus("pending", "ocr-required", { kind: "image" });
        return json({ status: "pending", detail: "ocr-required (GEMINI_API_KEY missing)" }, 200, cors);
      }
      const b64 = base64FromBytes(bytes);
      const ocr = await readImage(b64, doc.mime_type || "image/png", "es");
      ex = { text: ocr, status: ocr.replace(/\s/g, "").length >= 15 ? "ready" : "failed", detail: ocr ? undefined : "ocr-no-text", kind: "image" };
    }

    if (ex.status !== "ready" || !ex.text) {
      await setStatus("failed", ex.detail || "no-text", { kind: ex.kind });
      return json({ status: "failed", detail: ex.detail || "no-text" }, 200, cors);
    }

    // 3. resumen + análisis (opcional, si hay Gemini)
    let summary: string | null = null;
    let metadata: Record<string, unknown> = { wordCount: ex.text.split(/\s+/).length, pages: ex.pages || null };
    if (geminiConfigured()) {
      try {
        const r = await generate({
          model: MODELS.reasoning, json: true, temperature: 0.4, maxOutputTokens: 1200,
          system: SYSTEM_ZYNQORA + "\n\nMATERIAL:\n" + ex.text.slice(0, 12000) + "\n\n" + summaryPrompt("es"),
          contents: [{ role: "user", parts: [{ text: "Genera el JSON de resumen." }] }],
        });
        const a = JSON.parse(r.text);
        summary = a.summary || null;
        metadata = { ...metadata, concepts: a.concepts || [], keyPoints: a.keyPoints || [], difficulty: a.difficulty || "med", readMin: a.readMin || Math.max(1, Math.round(metadata.wordCount as number / 180)) };
      } catch { /* seguimos sin resumen IA */ }
    }

    // 4. trocear + embeddings
    const chunks = chunk(ex.text);
    // limpia chunks previos (reingesta)
    await admin.from("document_chunks").delete().eq("document_id", documentId);

    let embedded = 0;
    if (geminiConfigured()) {
      for (const c of chunks) {
        let vec: number[] | null = null;
        try { vec = await embed(c.content); } catch { vec = null; }
        await admin.from("document_chunks").insert({
          document_id: documentId, user_id: user.id, content: c.content, chunk_index: c.idx,
          embedding: vec, metadata: {},
        });
        if (vec) embedded++;
      }
    } else {
      // sin Gemini: guardamos los chunks sin vector (RAG desactivado, se usa texto completo)
      for (const c of chunks) {
        await admin.from("document_chunks").insert({
          document_id: documentId, user_id: user.id, content: c.content, chunk_index: c.idx, embedding: null, metadata: {},
        });
      }
    }

    // 5. marcar como listo
    await setStatus("ready", null, {
      kind: ex.kind,
      text_source: ex.kind === "image" ? "ocr" : ex.kind === "text" ? "txt" : ex.kind,
      extracted_text: ex.text,
      summary,
      metadata,
    });

    return json({
      status: "ready",
      chars: ex.text.length,
      chunks: chunks.length,
      embedded,
      ragEnabled: embedded > 0,
      summary: !!summary,
    }, 200, cors);
  } catch (e) {
    await setStatus("failed", "ingest-error:" + String(e).slice(0, 150));
    return json({ status: "failed", detail: String(e).slice(0, 300) }, 200, cors);
  }
});

function base64FromBytes(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}
