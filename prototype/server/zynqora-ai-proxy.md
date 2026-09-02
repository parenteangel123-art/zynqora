# Zynqora AI — servidor (proxy de Gemini)

Este es el **único componente de servidor** que necesita el prototipo para pasar de
**modo demo** a **IA real**. Su trabajo:

1. Guardar la clave `GEMINI_API_KEY` (nunca llega al navegador).
2. Exponer una **API semántica** propia de Zynqora (`POST /` con `{ task, ... }`).
3. Traducir cada `task` a llamadas a la **API oficial de Google Gemini**
   (modelo adecuado + herramientas: Google Search grounding, TTS multi‑hablante…).
4. Aplicar el *system prompt* de **"Zynqora AI"** (nunca menciona "Gemini" al usuario).

El cliente (`app.js` → `GeminiProvider`) llama a `AI_CONFIG.endpoint` y ya está.
En **Configuración → Zynqora AI** pega la URL pública de este servidor y la app pasa a
`IA real`. Si el campo está vacío, la app funciona en `demo` (motor local + voz del navegador).

---

## 1. Variables de entorno

| Variable | Obligatoria | Descripción |
|---|---|---|
| `GEMINI_API_KEY` | ✅ | Clave de Google AI Studio / Vertex. **Solo en el servidor.** |
| `ALLOWED_ORIGIN` | recomendada | Origen del artifact/app para CORS (`*` en pruebas). |
| `ZYNQORA_SHARED_SECRET` | recomendada | Si se define, el cliente debe mandar `Authorization: Bearer <secret>`. |

## 2. Modelos usados (configurables desde `AI_CONFIG.models` en el cliente)

| Tarea | Modelo por defecto | Motivo |
|---|---|---|
| `chat` (conversación) | `gemini-2.5-flash` | rapidez |
| `chat` (intención compleja: examen, plan, paso a paso, ejercicios) | `gemini-2.5-pro` | razonamiento |
| `document` (PDF / imagen) | `gemini-2.5-pro` | calidad multimodal |
| `presentation` | `gemini-2.5-pro` | estructura + decisión de elemento visual |
| `podcast_script` | `gemini-2.5-pro` | guion coherente |
| `podcast_tts` | `gemini-2.5-flash-preview-tts` | texto → voz, hasta 2 hablantes |

> Los nombres de modelo se pasan desde el cliente en `body.model`; el servidor los
> valida contra una lista blanca. Cambiar de modelo = cambiar `AI_CONFIG.models`.

## 3. API semántica (contrato cliente ⇄ servidor)

`POST /`  ·  `Content-Type: application/json`

```jsonc
// task: "chat"
{ "task":"chat", "lang":"es",
  "text":"Explícame las derivadas",
  "intent":"explain|exercise|summarize|...|null",
  "history":[{"role":"user|model","text":"..."}],
  "context":{ "subject":"Historia", "title":"Revolución Francesa.pdf",
              "summary":"...", "concepts":[...], "topics":[...] } | null,
  "profile":{ "level":"bach", "goals":["exams"], "lang":"es" } | null,
  "allowSearch": true,
  "model":"gemini-2.5-flash" }
// -> { "html":"<p>…</p>", "text":"…", "sources":[{"title":"…","uri":"…"}]?, "quiz":{…}?, "tutor":true }

// task: "document"  (análisis de apuntes)
{ "task":"document", "file":{ "name":"apuntes.pdf", "mime":"application/pdf", "dataBase64":"..." } }
// -> { "summary":"…", "concepts":[…], "topics":[…], "difficulty":"med", "readMin":10 }

// task: "presentation"
{ "task":"presentation", "material":{…}, "style":0 }
// -> { "slides":[ {"type":"title|bullets|timeline|compare|definition|highlight|closing", ...} ] }

// task: "podcast_script"
{ "task":"podcast_script", "material":{…}, "approach":0, "minutes":10, "voiceStyle":0 }
// -> { "title":"…", "two":false, "dur":600, "segments":[ {"speaker":"A|B","text":"…","t":0} ] }

// task: "podcast_tts"
{ "task":"podcast_tts",
  "segments":[{ "speaker":"A", "text":"...mil setecientos ochenta y nueve..." }],  // texto YA normalizado para voz
  "direction":"Habla en español de forma cálida... pausas naturales... nunca dígito por dígito...",
  "twoSpeakers":true, "voiceA":"Kore", "voiceB":"Puck", "style":0 }
// -> { "mime":"audio/wav", "audioBase64":"..." }   (o { "audioUrl":"..." } si se sube a storage)
```

> **Capa de normalización de voz** (cliente, `normalizeScriptForSpeech` en `app.js`): antes de mandar
> nada al TTS, cada segmento se convierte a su forma **hablada** — fechas (`1789` → «mil setecientos
> ochenta y nueve»), fechas con día y mes, siglos (`XVIII` → «dieciocho»), porcentajes, moneda,
> unidades, `x²` → «x al cuadrado», etc. La **transcripción visual conserva la forma original**.
> El servidor también puede re‑normalizar como red de seguridad, pero recibe `segments[].text` ya listo.
> La `direction` (de `addVoiceDirection`) se antepone como instrucción de estilo/tono al TTS.

El cliente ya usa exactamente estos campos (`app.js` → `GeminiProvider`).

## 4. System prompt de Zynqora AI

```
Eres "Zynqora AI", el asistente de estudio de la app Zynqora. Tu identidad de marca
es Zynqora AI: NUNCA menciones a Google, Gemini ni el modelo subyacente.

Reglas:
- Si la petición es clara, RESPONDE DIRECTAMENTE. No preguntes "¿para qué lo necesitas?".
- No obligues al usuario a cambiar de asignatura: la materia es contexto, no restricción.
- Si el usuario pide un ejercicio, CRÉALO. Si pide "otro más difícil", súbelo de nivel.
- Si dice "no lo entiendo", explícalo de otra forma más sencilla.
- Si dice "hazme preguntas", inicia un mini-quiz.
- Mantén el contexto de la conversación (a qué "segundo paso" se refiere, etc.).
- Adapta nivel, dificultad y longitud al perfil y a la conversación, sin preguntarlo cada vez.
- Prioriza claridad sobre cantidad. Usa títulos, listas, ejemplos, fórmulas y un resumen final
  cuando ayuden, pero no te alargues sin necesidad.
- En matemáticas/ciencias, verifica el resultado. Si no estás seguro, dilo. No inventes.
- Devuelve el cuerpo en HTML simple (<p>, <ul>, <ol>, <strong>, <em>). Sin <script> ni <style>.
- Si has usado búsqueda web, no inventes fuentes: usa solo las que devuelva el grounding.
Cuando haya material del usuario en "context", ÚSALO y no lo contradigas.
```

## 5. Cloudflare Worker (archivo único, listo para desplegar)

`wrangler.toml`:
```toml
name = "zynqora-ai"
main = "worker.js"
compatibility_date = "2025-01-01"
# secreto:  npx wrangler secret put GEMINI_API_KEY
[vars]
ALLOWED_ORIGIN = "*"
```

`worker.js`:
```js
const GEMINI = "https://generativelanguage.googleapis.com/v1beta/models";
const ALLOWED_MODELS = new Set([
  "gemini-2.5-flash", "gemini-2.5-pro", "gemini-2.5-flash-preview-tts",
]);
const SYSTEM = `Eres "Zynqora AI"...`; // (el prompt de la sección 4)

export default {
  async fetch(req, env) {
    const cors = {
      "access-control-allow-origin": env.ALLOWED_ORIGIN || "*",
      "access-control-allow-headers": "content-type,authorization",
      "access-control-allow-methods": "POST,OPTIONS",
    };
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    if (req.method !== "POST") return json({ error: "POST only" }, 405, cors);

    if (env.ZYNQORA_SHARED_SECRET) {
      const auth = req.headers.get("authorization") || "";
      if (auth !== `Bearer ${env.ZYNQORA_SHARED_SECRET}`) return json({ error: "unauthorized" }, 401, cors);
    }

    let body;
    try { body = await req.json(); } catch { return json({ error: "bad json" }, 400, cors); }
    const model = ALLOWED_MODELS.has(body.model) ? body.model : "gemini-2.5-flash";
    const key = env.GEMINI_API_KEY;
    if (!key) return json({ error: "server not configured" }, 500, cors);

    try {
      switch (body.task) {
        case "chat":            return json(await chat(body, model, key), 200, cors);
        case "document":        return json(await analyzeDoc(body, "gemini-2.5-pro", key), 200, cors);
        case "presentation":    return json(await presentation(body, "gemini-2.5-pro", key), 200, cors);
        case "podcast_script":  return json(await podcastScript(body, "gemini-2.5-pro", key), 200, cors);
        case "podcast_tts":     return json(await podcastTTS(body, "gemini-2.5-flash-preview-tts", key), 200, cors);
        default:                return json({ error: "unknown task" }, 400, cors);
      }
    } catch (e) {
      return json({ error: "ai_failed", detail: String(e).slice(0, 300) }, 502, cors);
    }
  },
};

const json = (o, s = 200, h = {}) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json", ...h } });

async function gen(model, key, payload) {
  const r = await fetch(`${GEMINI}/${model}:generateContent?key=${key}`, {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error(`gemini ${r.status}: ${await r.text()}`);
  return r.json();
}

// ---- chat (+ Google Search grounding cuando allowSearch) ----
async function chat(b, model, key) {
  const ctx = b.context ? `\n\nMATERIAL DEL USUARIO (${b.context.subject} · ${b.context.title}):\n${b.context.summary}\nConceptos: ${(b.context.concepts||[]).join(", ")}` : "";
  const prof = b.profile ? `\n\nPERFIL: nivel=${b.profile.level||"?"} objetivos=${(b.profile.goals||[]).join(",")}` : "";
  const contents = [
    ...(b.history || []).map(m => ({ role: m.role, parts: [{ text: m.text }] })),
    { role: "user", parts: [{ text: b.text }] },
  ];
  const payload = {
    systemInstruction: { parts: [{ text: SYSTEM + ctx + prof + "\nIdioma de respuesta: " + (b.lang || "es") }] },
    contents,
    generationConfig: { temperature: 0.6, maxOutputTokens: 1400 },
  };
  if (b.allowSearch) payload.tools = [{ google_search: {} }];  // grounding real

  const data = await gen(model, key, payload);
  const cand = data.candidates?.[0];
  const text = (cand?.content?.parts || []).map(p => p.text || "").join("").trim();
  const gm = cand?.groundingMetadata;
  const sources = (gm?.groundingChunks || [])
    .map(c => c.web && { title: c.web.title, uri: c.web.uri })
    .filter(Boolean);
  return { html: toHtml(text), text, sources: sources.length ? sources : undefined, tutor: true };
}

// texto plano de Gemini -> HTML simple y seguro
function toHtml(t) {
  const esc = s => s.replace(/[<>&]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
  return t.split(/\n{2,}/).map(p => {
    if (/^\s*[-*]\s+/.test(p)) return "<ul>" + p.split(/\n/).map(li => "<li>" + esc(li.replace(/^\s*[-*]\s+/, "")) + "</li>").join("") + "</ul>";
    return "<p>" + esc(p).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") + "</p>";
  }).join("");
}

// ---- análisis de documento / imagen ----
async function analyzeDoc(b, model, key) {
  const f = b.file;
  const data = await gen(model, key, {
    contents: [{ role: "user", parts: [
      { inline_data: { mime_type: f.mime, data: f.dataBase64 } },
      { text: "Analiza este material de estudio. Devuelve SOLO JSON: {summary, concepts:[], topics:[], difficulty:'easy|med|hard', readMin:number}. Idioma: " + (b.lang || "es") },
    ] }],
    generationConfig: { responseMimeType: "application/json" },
  });
  return JSON.parse(data.candidates[0].content.parts[0].text);
}

// ---- presentación (Gemini decide el tipo de elemento visual por diapositiva) ----
async function presentation(b, model, key) {
  const m = b.material || {};
  const data = await gen(model, key, {
    systemInstruction: { parts: [{ text:
      "Crea una presentación de estudio a partir del material. 8 diapositivas. " +
      "Cada diapositiva tiene 'type': usa 'timeline' si hay fechas/proceso cronológico, " +
      "'compare' si contrapone dos ideas, 'definition' para un concepto clave, " +
      "'highlight' para un dato/estadística, 'bullets' para conceptos, 'title'/'closing' para apertura y cierre. " +
      "Devuelve SOLO JSON {slides:[{type,kicker,title,sub?,list?,tl?,cmp?,big?}]}. Idioma: " + (b.lang || "es") }] },
    contents: [{ role: "user", parts: [{ text: JSON.stringify(m) }] }],
    generationConfig: { responseMimeType: "application/json" },
  });
  return JSON.parse(data.candidates[0].content.parts[0].text).slides;
}

// ---- guion del podcast (el tipo de podcast afecta al guion) ----
async function podcastScript(b, model, key) {
  const approach = ["explicación (un narrador explica claro y ordenado)",
                    "repaso (explicación + conceptos clave + preguntas rápidas)",
                    "conversación (diálogo natural entre dos voces A y B)"][b.approach || 0];
  const data = await gen(model, key, {
    systemInstruction: { parts: [{ text:
      `Escribe el guion de un podcast de estudio de ~${b.minutes || 10} minutos, estilo: ${approach}. ` +
      `ESCRÍBELO PARA SER HABLADO, no como un artículo: frases cortas, tono cercano, "vamos a ver...", ` +
      `"fíjate en esto...". Al citar una fecha, dila también en palabras la primera vez ("1789, es decir, ` +
      `mil setecientos ochenta y nueve"). Basado SOLO en el material. ` +
      `Devuelve SOLO JSON {title, two:boolean, dur:${(b.minutes||10)*60}, segments:[{speaker:'A'|'B', text}]}. ` +
      `Para 'conversación' alterna A/B de forma natural. Idioma: ${b.lang || "es"}.` }] },
    contents: [{ role: "user", parts: [{ text: JSON.stringify(b.material || {}) }] }],
    generationConfig: { responseMimeType: "application/json" },
  });
  const sc = JSON.parse(data.candidates[0].content.parts[0].text);
  // reparte timestamps por nº de palabras
  const words = sc.segments.reduce((n, s) => n + s.text.split(/\s+/).length, 0) || 1;
  let acc = 0;
  sc.segments = sc.segments.map(s => {
    const seg = { ...s, t: Math.round((acc / words) * (sc.dur - 4)) };
    acc += s.text.split(/\s+/).length; return seg;
  });
  return sc;
}

// ---- TTS real (multi-hablante para conversación) ----
async function podcastTTS(b, model, key) {
  const twoSpeakers = !!b.twoSpeakers;
  const dir = b.direction ? b.direction.trim() + "\n\n" : "";   // dirección de voz (tono, pausas, énfasis)
  const script = dir + (twoSpeakers
    ? b.segments.map(s => `${s.speaker === "B" ? "Voz B" : "Voz A"}: ${s.text}`).join("\n")
    : b.segments.map(s => s.text).join("\n"));

  const speechConfig = twoSpeakers
    ? { multiSpeakerVoiceConfig: { speakerVoiceConfigs: [
        { speaker: "Voz A", voiceConfig: { prebuiltVoiceConfig: { voiceName: b.voiceA || "Kore" } } },
        { speaker: "Voz B", voiceConfig: { prebuiltVoiceConfig: { voiceName: b.voiceB || "Puck" } } },
      ] } }
    : { voiceConfig: { prebuiltVoiceConfig: { voiceName: b.voiceA || "Kore" } } };

  const data = await gen(model, key, {
    contents: [{ role: "user", parts: [{ text: script }] }],
    generationConfig: { responseModalities: ["AUDIO"], speechConfig },
  });
  const part = data.candidates[0].content.parts.find(p => p.inlineData || p.inline_data);
  const inline = part.inlineData || part.inline_data;
  // Gemini TTS devuelve PCM 24kHz; envuélvelo en WAV o súbelo a R2/S3 y devuelve audioUrl.
  return { mime: inline.mimeType || inline.mime_type || "audio/L16;rate=24000", audioBase64: inline.data };
}
```

> **Voces Gemini TTS** (prebuilt): `Kore`, `Puck`, `Charon`, `Fenrir`, `Aoede`, `Leda`…
> El cliente manda `voiceA`/`voiceB` según la elección "Voz 1 / Voz 2" y el estilo
> (Natural / Profesor / Conversacional) se inyecta como instrucción de tono en el guion.

## 6. Despliegue rápido

```bash
npm i -g wrangler
wrangler login
wrangler secret put GEMINI_API_KEY      # pega la clave
wrangler deploy                         # -> https://zynqora-ai.<tu-cuenta>.workers.dev
```

Pega esa URL en **Zynqora → Configuración → Zynqora AI → Servidor de Zynqora AI → Conectar**.

Equivalentes válidos sin cambios de lógica: **Vercel Edge Function**, **Supabase Edge Function**
(Deno), **Deno Deploy**, **Netlify Function**. En Supabase encaja con la arquitectura de la Fase 0
(`supabase/functions/zynqora-ai/index.ts`).

## 7. Producción — lo que falta

- **Audio del podcast**: subir el WAV/MP3 a storage (R2 / Supabase Storage) y devolver `audioUrl`
  en vez de base64; el cliente usaría un `<audio>` real (hoy usa `SpeechSynthesis` del navegador en demo).
- **Extracción de PDF/DOCX**: enviar el fichero como `inline_data` (hasta ~20 MB) o subir a
  Files API de Gemini para documentos grandes; DOCX → convertir a PDF o texto antes.
- **Cuotas y coste**: contar tokens por usuario (`ai_usage`), aplicar los límites de plan en el
  servidor (no solo en el cliente), cachear respuestas idénticas.
- **Seguridad**: `ZYNQORA_SHARED_SECRET` + rate‑limit + validación de tamaño de ficheros.
- **Imágenes de presentaciones**: opcionalmente `imagen-3` (generación) o una búsqueda de imágenes
  con licencia; hoy el cliente usa ilustraciones/diagramas por código (sin fuente inventada).
- **Observabilidad**: log de errores (Sentry) y métricas (PostHog) como en la Fase 0.

## 8. FASE D — pipeline de material real (ingesta + RAG)

El cliente (`app.js`) ya implementa **localmente** todo lo que la CSP del artifact permite:

| Paso | En el navegador (hoy, `Ingest` / `DocGen` en `app.js`) | En el backend (a conectar) |
|---|---|---|
| **Upload** | `<input type=file>` + drag&drop | Subida directa a Supabase Storage (`documents/`) |
| **Extracción TXT/MD** | `FileReader.readAsText` — **real** | — |
| **Extracción PDF** | parser inline + `DecompressionStream` (FlateDecode). Funciona con PDF de texto; falla con PDF escaneado o fuentes incrustadas raras → estado `failed` honesto | `unpdf` / `pdf.js` en Edge Function, o Gemini `inline_data` |
| **Extracción DOCX** | ZIP + `DecompressionStream('deflate-raw')` sobre `word/document.xml` — **real** para .docx estándar | `mammoth` en Edge Function |
| **OCR de imágenes** | ❌ no disponible en el navegador → la imagen se **guarda** (`doc.image`, dataURL) con estado `pending` | Gemini vision (`document` task con `inline_data` de imagen) |
| **Normalización** | limpieza de espacios, guiones de corte, saltos | igual, servidor |
| **Chunking** | `DocGen.sentences()` (segmentación por frases) | troceo por tokens con solape |
| **Indexación / embeddings** | ❌ (no hay red) | `text-embedding-004` → `document_chunks.embedding vector` (pgvector) |
| **RAG** | `DocGen.answer()` = recuperación **extractiva** por solapamiento de palabras clave (sin invención) | top-k por similitud de vector → contexto para Gemini |
| **Generación** (resumen, flashcards, test, ejercicios, guion, slides) | `DocGen.*` extractivo, con badge **"generado localmente del texto real"** | `chat` / tasks de este proxy con el `context.fullText` real |

**Contrato que YA envía el cliente cuando hay documento** (`GeminiProvider.chat`):

```jsonc
{ "task":"chat", "text":"Explícame el apartado 3", "docId":"id...",
  "context":{ "subject":"Historia", "title":"apuntes.pdf",
              "summary":"...", "concepts":[...], "topics":[...],
              "fullText":"…texto extraído real…", "source":"pdf" } }
```

El servidor solo tiene que **usar `context.fullText`** (o hacer RAG sobre `document_chunks` si ya
está indexado) y responder. Nada más cambia en el cliente.

**Nuevo task sugerido para el backend** (opcional, sustituye a la extracción local):

```jsonc
// task: "ingest"   — recibe el archivo desde Storage, devuelve texto + troceo
{ "task":"ingest", "storagePath":"documents/uid/abc.pdf", "mime":"application/pdf" }
// -> { "text":"…", "chunks":[{ "text":"…", "idx":0 }], "pages":12, "status":"analyzed" }
```

**Regla de oro respetada:** en modo demo, ningún archivo se sube a ningún sitio; el contenido del
usuario no sale del navegador; y todo lo generado sin IA lleva un badge honesto. Cuando se conecte
el backend, `materialFor(subjectId, docId)` ya adjunta `fullText` y basta con desplegar este proxy.
