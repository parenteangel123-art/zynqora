// _shared/gemini.ts — cliente REST de Google Gemini.
// La API key vive SOLO aquí (Deno.env). Nunca se devuelve al frontend.

const KEY = Deno.env.get("GEMINI_API_KEY");
const BASE = "https://generativelanguage.googleapis.com/v1beta";

// Lista blanca de modelos: el frontend puede sugerir cuál, pero el servidor decide.
export const MODELS = {
  chat: Deno.env.get("GEMINI_MODEL_CHAT") || "gemini-3.6-flash",
  reasoning: Deno.env.get("GEMINI_MODEL_REASONING") || "gemini-3.6-flash",
  documents: Deno.env.get("GEMINI_MODEL_DOCUMENTS") || "gemini-3.6-flash",
  embedding: Deno.env.get("GEMINI_MODEL_EMBEDDING") || "gemini-embedding-001",
  tts: Deno.env.get("GEMINI_MODEL_TTS") || "gemini-3.1-flash-tts-preview",
} as const;

const ALLOWED = new Set(Object.values(MODELS));

export function pickModel(requested: string | undefined, fallback: string): string {
  return requested && ALLOWED.has(requested) ? requested : fallback;
}

export function geminiConfigured(): boolean {
  return !!KEY;
}

interface GenPart { text?: string; inlineData?: { mimeType: string; data: string }; inline_data?: { mime_type: string; data: string } }
interface GenContent { role: "user" | "model"; parts: GenPart[] }

export interface GenerateOpts {
  model: string;
  system?: string;
  contents: GenContent[];
  temperature?: number;
  maxOutputTokens?: number;
  json?: boolean;
  googleSearch?: boolean;
}

export interface GenerateResult {
  text: string;
  sources: { title: string; uri: string }[];
  raw: unknown;
}

async function call(model: string, payload: unknown): Promise<any> {
  if (!KEY) throw new Error("GEMINI_API_KEY not configured");
  const r = await fetch(`${BASE}/models/${model}:generateContent?key=${KEY}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error(`gemini ${r.status}: ${(await r.text()).slice(0, 400)}`);
  return r.json();
}

export async function generate(o: GenerateOpts): Promise<GenerateResult> {
  const payload: Record<string, unknown> = {
    contents: o.contents,
    generationConfig: {
      temperature: o.temperature ?? 0.6,
      maxOutputTokens: o.maxOutputTokens ?? 1600,
      ...(o.json ? { responseMimeType: "application/json" } : {}),
    },
  };
  if (o.system) payload.systemInstruction = { parts: [{ text: o.system }] };
  if (o.googleSearch) payload.tools = [{ google_search: {} }];

  const data = await call(o.model, payload);
  const cand = data?.candidates?.[0];
  const text = (cand?.content?.parts || []).map((p: GenPart) => p.text || "").join("").trim();
  const gm = cand?.groundingMetadata;
  const sources = (gm?.groundingChunks || [])
    .map((c: any) => (c.web ? { title: c.web.title, uri: c.web.uri } : null))
    .filter(Boolean) as { title: string; uri: string }[];
  return { text, sources, raw: data };
}

/** Embedding de un texto -> vector de 768 dims (text-embedding-004). */
export async function embed(text: string): Promise<number[]> {
  if (!KEY) throw new Error("GEMINI_API_KEY not configured");
  const r = await fetch(`${BASE}/models/${MODELS.embedding}:embedContent?key=${KEY}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      model: `models/${MODELS.embedding}`,
      content: { parts: [{ text: text.slice(0, 8000) }] },
      taskType: "RETRIEVAL_DOCUMENT",
    }),
  });
  if (!r.ok) throw new Error(`embed ${r.status}: ${(await r.text()).slice(0, 300)}`);
  const j = await r.json();
  return j?.embedding?.values || [];
}

export async function embedQuery(text: string): Promise<number[]> {
  if (!KEY) throw new Error("GEMINI_API_KEY not configured");
  const r = await fetch(`${BASE}/models/${MODELS.embedding}:embedContent?key=${KEY}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      model: `models/${MODELS.embedding}`,
      content: { parts: [{ text: text.slice(0, 4000) }] },
      taskType: "RETRIEVAL_QUERY",
    }),
  });
  if (!r.ok) throw new Error(`embedQuery ${r.status}`);
  const j = await r.json();
  return j?.embedding?.values || [];
}

/** OCR / lectura de una imagen (base64) -> texto plano. */
export async function readImage(base64: string, mime: string, lang: string): Promise<string> {
  const data = await call(MODELS.documents, {
    contents: [{
      role: "user",
      parts: [
        { inline_data: { mime_type: mime, data: base64 } },
        { text: `Transcribe TODO el texto visible de esta imagen (apuntes/pizarra). Devuelve solo el texto, sin comentarios. Si no hay texto legible, responde exactamente: __NO_TEXT__. Idioma probable: ${lang}.` },
      ],
    }],
    generationConfig: { temperature: 0 },
  });
  const t = (data?.candidates?.[0]?.content?.parts || []).map((p: GenPart) => p.text || "").join("").trim();
  return t === "__NO_TEXT__" ? "" : t;
}

/**
 * TTS de Gemini. Devuelve PCM base64 (mono 24 kHz). El backend debería
 * envolverlo en WAV o subirlo a Storage; aquí lo devolvemos tal cual.
 */
export async function tts(opts: {
  segments: { speaker?: string; text: string }[];
  direction?: string;
  twoSpeakers?: boolean;
  voiceA?: string;
  voiceB?: string;
}): Promise<{ mime: string; audioBase64: string }> {
  const dir = opts.direction ? opts.direction.trim() + "\n\n" : "";
  const script = dir + (opts.twoSpeakers
    ? opts.segments.map((s) => `${s.speaker === "B" ? "Voz B" : "Voz A"}: ${s.text}`).join("\n")
    : opts.segments.map((s) => s.text).join("\n"));

  const speechConfig = opts.twoSpeakers
    ? {
      multiSpeakerVoiceConfig: {
        speakerVoiceConfigs: [
          { speaker: "Voz A", voiceConfig: { prebuiltVoiceConfig: { voiceName: opts.voiceA || "Kore" } } },
          { speaker: "Voz B", voiceConfig: { prebuiltVoiceConfig: { voiceName: opts.voiceB || "Puck" } } },
        ],
      },
    }
    : { voiceConfig: { prebuiltVoiceConfig: { voiceName: opts.voiceA || "Kore" } } };

  const data = await call(MODELS.tts, {
    contents: [{ role: "user", parts: [{ text: script }] }],
    generationConfig: { responseModalities: ["AUDIO"], speechConfig },
  });
  const part = (data?.candidates?.[0]?.content?.parts || [])
    .find((p: GenPart) => p.inlineData || p.inline_data);
  const inline = part?.inlineData || part?.inline_data;
  if (!inline) throw new Error("tts: no audio in response");
  return {
    mime: inline.mimeType || inline.mime_type || "audio/L16;rate=24000",
    audioBase64: inline.data,
  };
}
