// supabase/functions/zynqora-ai/index.ts
//
// EL ÚNICO ENDPOINT DE IA. El frontend habla solo con esta función.
// Flujo por petición:
//   1. autenticar usuario (JWT de Supabase Auth)
//   2. comprobar la cuota del plan (consume_quota en Postgres)  -> 402 si se agota
//   3. recuperar contexto (RAG sobre document_chunks, o texto del documento)
//   4. construir el prompt con la personalidad de Zynqora
//   5. llamar a Gemini (la API key vive en Deno.env, nunca sale de aquí)
//   6. devolver la respuesta
//   7. (la cuota ya quedó registrada en el paso 2)
//
// GEMINI_API_KEY: SOLO en Supabase Secrets. NUNCA en el frontend.

import { corsHeaders, json, limitReached } from "../_shared/http.ts";
import { getUser, userClient } from "../_shared/supabase.ts";
import { embedQuery, generate, geminiConfigured, MODELS, pickModel, tts } from "../_shared/gemini.ts";
import {
  buildContextBlock, type ChatCtx, exercisesPrompt, flashcardsPrompt,
  podcastPrompt, presentationPrompt, quizPrompt, summaryPrompt, SYSTEM_ZYNQORA, toHtml,
} from "../_shared/prompt.ts";

// tarea -> feature de cuota. null = no consume cuota.
const QUOTA: Record<string, string | null> = {
  chat: "aiMessages",
  generate_summary: null,           // el resumen no cuenta (se regenera libremente)
  generate_flashcards: "flashcards",
  generate_quiz: "tests",
  generate_exercises: "aiMessages",
  generate_podcast_script: "podcasts",
  generate_presentation: "presentations",
  podcast_tts: null,
  search: null,
};

Deno.serve(async (req) => {
  const cors = corsHeaders(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return json({ error: "POST only" }, 405, cors);

  // 1. AUTH
  const user = await getUser(req);
  if (!user) return json({ error: "unauthorized" }, 401, cors);

  let body: any;
  try { body = await req.json(); } catch { return json({ error: "bad json" }, 400, cors); }
  const task: string = body.task || "chat";
  const lang: string = body.lang === "en" ? "en" : "es";

  if (!geminiConfigured()) {
    return json({ error: "ai_not_configured", detail: "GEMINI_API_KEY missing on the server" }, 503, cors);
  }

  const db = userClient(req);      // respeta RLS (todas las consultas van filtradas por auth.uid())

  // 2. CUOTA — consume_quota() usa auth.uid(), así que va por el cliente del usuario (RLS/JWT).
  //    La función es SECURITY DEFINER: escribe en ai_usage saltándose la RLS de escritura.
  const feature = QUOTA[task];
  let quota: any = null;
  if (feature) {
    const { data, error } = await db.rpc("consume_quota", { p_feature: feature, p_amount: 1 });
    if (error) return json({ error: "quota_check_failed", detail: error.message }, 500, cors);
    quota = data;
    if (quota && quota.allowed === false) return limitReached(quota, cors);
  }

  try {
    switch (task) {
      case "chat":                    return json(await chat(body, db, lang), 200, cors);
      case "search":                  return json(await search(body, db), 200, cors);
      case "generate_summary":        return json(await genJson(body, db, lang, summaryPrompt(lang), MODELS.reasoning), 200, cors);
      case "generate_flashcards":     return json(await genJson(body, db, lang, flashcardsPrompt(body.count || 8, body.difficulty || "med", lang), MODELS.reasoning), 200, cors);
      case "generate_quiz":           return json(await genJson(body, db, lang, quizPrompt(body.count || 5, body.difficulty || "med", lang), MODELS.reasoning), 200, cors);
      case "generate_exercises":      return json(await genJson(body, db, lang, exercisesPrompt(body.count || 3, body.difficulty || "med", lang), MODELS.reasoning), 200, cors);
      case "generate_podcast_script": return json(await genPodcast(body, db, lang), 200, cors);
      case "generate_presentation":   return json(await genJson(body, db, lang, presentationPrompt(lang), MODELS.documents), 200, cors);
      case "podcast_tts":             return json(await tts(body), 200, cors);
      default:                        return json({ error: "unknown task: " + task }, 400, cors);
    }
  } catch (e) {
    console.error("zynqora-ai error:", e);
    return json({ error: "ai_failed", detail: String(e).slice(0, 400) }, 502, cors);
  }
});

// ---------------------------------------------------------------------------
// contexto: RAG sobre document_chunks, o el texto del documento como fallback
// ---------------------------------------------------------------------------
async function resolveContext(body: any, db: any, question: string): Promise<ChatCtx | null> {
  const docId: string | null = body.documentId || body.docId || null;
  const subjectId: string | null = body.subjectId || body.contextId || null;
  if (!docId && !subjectId) {
    // el frontend puede mandar ya `context` (fase D) — úsalo tal cual
    return body.context || null;
  }

  const ctx: ChatCtx = {};
  if (docId) {
    const { data: doc } = await db.from("documents").select("name, subject_id, summary, metadata, extracted_text").eq("id", docId).maybeSingle();
    if (doc) {
      ctx.title = doc.name;
      ctx.summary = doc.summary || undefined;
      ctx.concepts = doc.metadata?.concepts || [];
      const { data: subj } = await db.from("subjects").select("name").eq("id", doc.subject_id).maybeSingle();
      ctx.subject = subj?.name;
      // 1) RAG
      try {
        const qv = await embedQuery(question || ctx.title || "");
        const { data: passages } = await db.rpc("match_document_chunks", {
          query_embedding: qv, match_count: 6, p_document_id: docId, p_subject_id: null,
        });
        if (passages && passages.length) {
          ctx.passages = passages.map((p: any) => ({ content: p.content, similarity: p.similarity }));
        }
      } catch { /* sin embeddings -> fallback */ }
      // 2) fallback: texto completo (troncado en prompt.ts)
      if (!ctx.passages && doc.extracted_text) ctx.fullText = doc.extracted_text;
    }
  } else if (subjectId) {
    const { data: subj } = await db.from("subjects").select("name").eq("id", subjectId).maybeSingle();
    ctx.subject = subj?.name;
    try {
      const qv = await embedQuery(question || ctx.subject || "");
      const { data: passages } = await db.rpc("match_document_chunks", {
        query_embedding: qv, match_count: 6, p_document_id: null, p_subject_id: subjectId,
      });
      if (passages && passages.length) ctx.passages = passages.map((p: any) => ({ content: p.content, similarity: p.similarity }));
    } catch { /* noop */ }
  }
  return ctx;
}

// ---------------------------------------------------------------------------
// CHAT
// ---------------------------------------------------------------------------
async function chat(body: any, db: any, lang: string) {
  const text: string = body.text || "";
  const history: { role: string; text: string }[] = body.history || [];
  const ctx = await resolveContext(body, db, text);
  const allowSearch = body.allowSearch === true && !ctx?.passages && !ctx?.fullText;
  const model = pickModel(
    body.model,
    /prep_exam|detailed|plan|why_failed|exercise|compare/.test(body.intent || "") ? MODELS.reasoning : MODELS.chat,
  );
  const system = SYSTEM_ZYNQORA + buildContextBlock(ctx, body.profile || null, lang);

  const contents = [
    ...history.slice(-10).map((m) => ({
      role: (m.role === "assistant" || m.role === "model" ? "model" : "user") as "user" | "model",
      parts: [{ text: (m.text || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() }],
    })),
    { role: "user" as const, parts: [{ text }] },
  ];

  const r = await generate({ model, system, contents, temperature: 0.6, maxOutputTokens: 1500, googleSearch: allowSearch });
  return {
    html: toHtml(r.text || ""),
    text: r.text,
    sources: r.sources.length ? r.sources : undefined,
    grounded: !!(ctx?.passages?.length || ctx?.fullText),
    tutor: true,
  };
}

// ---------------------------------------------------------------------------
// GENERACIÓN JSON (summary / flashcards / quiz / exercises / presentation)
// ---------------------------------------------------------------------------
async function genJson(body: any, db: any, lang: string, prompt: string, model: string) {
  const ctx = await resolveContext(body, db, body.query || body.text || "");
  const system = SYSTEM_ZYNQORA + buildContextBlock(ctx, null, lang) + "\n\n" + prompt;
  const r = await generate({
    model, system, json: true, temperature: 0.5, maxOutputTokens: 3000,
    contents: [{ role: "user", parts: [{ text: "Genera el JSON pedido a partir del material." }] }],
  });
  let parsed: unknown;
  try { parsed = JSON.parse(r.text); }
  catch { parsed = { error: "bad_model_json", raw: r.text.slice(0, 500) }; }
  return { result: parsed, grounded: !!(ctx?.passages?.length || ctx?.fullText) };
}

// ---------------------------------------------------------------------------
// PODCAST SCRIPT (reparte timestamps por nº de palabras, como el frontend)
// ---------------------------------------------------------------------------
async function genPodcast(body: any, db: any, lang: string) {
  const minutes = body.minutes || 8;
  const approach = body.approach || 0;
  const ctx = await resolveContext(body, db, "");
  const system = SYSTEM_ZYNQORA + buildContextBlock(ctx, null, lang) + "\n\n" + podcastPrompt(minutes, approach, lang);
  const r = await generate({
    model: MODELS.reasoning, system, json: true, temperature: 0.65, maxOutputTokens: 3500,
    contents: [{ role: "user", parts: [{ text: "Genera el guion del podcast a partir del material." }] }],
  });
  let sc: any;
  try { sc = JSON.parse(r.text); } catch { return { error: "bad_model_json", raw: r.text.slice(0, 500) }; }
  const segs: { speaker: string; text: string }[] = sc.segments || [];
  const totalWords = segs.reduce((n, s) => n + (s.text || "").split(/\s+/).length, 0) || 1;
  const dur = sc.dur || minutes * 60;
  let acc = 0;
  sc.segments = segs.map((s) => {
    const seg = { ...s, t: Math.round((acc / totalWords) * (dur - 4)) };
    acc += (s.text || "").split(/\s+/).length;
    return seg;
  });
  sc.dur = dur;
  return { result: sc, grounded: !!(ctx?.passages?.length || ctx?.fullText) };
}

// ---------------------------------------------------------------------------
// SEARCH — depuración de RAG (devuelve los pasajes recuperados)
// ---------------------------------------------------------------------------
async function search(body: any, db: any) {
  const q: string = body.query || body.text || "";
  const qv = await embedQuery(q);
  const { data, error } = await db.rpc("match_document_chunks", {
    query_embedding: qv, match_count: body.count || 6,
    p_document_id: body.documentId || null, p_subject_id: body.subjectId || null,
  });
  if (error) throw new Error(error.message);
  return { passages: data || [] };
}
