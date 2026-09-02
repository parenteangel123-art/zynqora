// _shared/extract.ts — extracción de texto de archivos + troceo (chunking).
// PDF -> unpdf (pdf.js empaquetado para Deno).  DOCX -> mammoth.  TXT/MD -> decode.
// Imagen -> se delega a Gemini Vision (ver gemini.readImage), aquí solo marcamos el tipo.

export type ExtractStatus = "ready" | "failed" | "pending";

export interface ExtractResult {
  text: string;
  status: ExtractStatus;
  detail?: string;   // código legible del problema
  pages?: number;
  kind: "text" | "pdf" | "docx" | "image" | "file";
}

function clean(t: string): string {
  return t
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/(\w)-\n(\w)/g, "$1$2")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function extract(bytes: Uint8Array, mime: string, name: string): Promise<ExtractResult> {
  const ext = (name.split(".").pop() || "").toLowerCase();

  if (ext === "txt" || ext === "md" || /^text\//.test(mime)) {
    const t = clean(new TextDecoder().decode(bytes));
    return { text: t, status: t.replace(/\s/g, "").length >= 20 ? "ready" : "failed", detail: t ? undefined : "empty", kind: "text" };
  }

  if (ext === "pdf" || mime === "application/pdf") {
    try {
      const { extractText, getDocumentProxy } = await import("npm:unpdf@0.12.1");
      const pdf = await getDocumentProxy(bytes);
      const { totalPages, text } = await extractText(pdf, { mergePages: true });
      const t = clean(Array.isArray(text) ? text.join("\n\n") : text);
      const ok = t.replace(/\s/g, "").length >= 60;
      return { text: ok ? t : "", status: ok ? "ready" : "failed", detail: ok ? undefined : "pdf-empty-or-scanned", pages: totalPages, kind: "pdf" };
    } catch (e) {
      return { text: "", status: "failed", detail: "pdf-extract:" + String(e).slice(0, 120), kind: "pdf" };
    }
  }

  if (ext === "docx" || /wordprocessingml/.test(mime)) {
    try {
      const mammoth = await import("npm:mammoth@1.8.0");
      // mammoth espera un Buffer/ArrayBuffer
      const { value } = await mammoth.extractRawText({ arrayBuffer: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) });
      const t = clean(value);
      const ok = t.length >= 40;
      return { text: ok ? t : "", status: ok ? "ready" : "failed", detail: ok ? undefined : "docx-empty", kind: "docx" };
    } catch (e) {
      return { text: "", status: "failed", detail: "docx-extract:" + String(e).slice(0, 120), kind: "docx" };
    }
  }

  if (/^image\//.test(mime) || ["png", "jpg", "jpeg", "webp"].includes(ext)) {
    // el texto lo saca Gemini Vision en la función ingest (readImage). Aquí solo el tipo.
    return { text: "", status: "pending", detail: "ocr-required", kind: "image" };
  }

  if (ext === "doc" || mime === "application/msword") {
    return { text: "", status: "failed", detail: "doc-legacy", kind: "file" };
  }
  return { text: "", status: "failed", detail: "unsupported", kind: "file" };
}

/**
 * Troceo por frases con solape. ~900 chars por chunk, solape de 1 frase.
 * Suficiente para RAG sin partir ideas por la mitad.
 */
export function chunk(text: string, opts: { size?: number; overlap?: number } = {}): { content: string; idx: number }[] {
  const size = opts.size ?? 900;
  const overlap = opts.overlap ?? 1;
  const sents = text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?…])\s+(?=[A-ZÁÉÍÓÚÑ0-9"¿¡])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const chunks: { content: string; idx: number }[] = [];
  let buf: string[] = [];
  let len = 0;
  for (let i = 0; i < sents.length; i++) {
    buf.push(sents[i]);
    len += sents[i].length + 1;
    if (len >= size) {
      chunks.push({ content: buf.join(" "), idx: chunks.length });
      buf = buf.slice(Math.max(0, buf.length - overlap));
      len = buf.join(" ").length;
    }
  }
  if (buf.length && (chunks.length === 0 || buf.join(" ") !== chunks[chunks.length - 1].content)) {
    chunks.push({ content: buf.join(" "), idx: chunks.length });
  }
  return chunks.length ? chunks : [{ content: text.slice(0, size), idx: 0 }];
}
