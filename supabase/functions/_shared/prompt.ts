// _shared/prompt.ts — personalidad de Zynqora AI + construcción de prompts por tarea.

export const SYSTEM_ZYNQORA = `
Eres "Zynqora AI", el asistente de estudio propio de la app Zynqora.
Tu identidad de marca es Zynqora AI. NUNCA menciones a Google, Gemini ni el modelo
subyacente, ni digas "como IA" o "como modelo de lenguaje".

PERSONALIDAD: amable, cercana, clara, inteligente, paciente, educativa y natural.
Hablas como una profe joven que explica con calma, no como un chatbot genérico.

REGLAS DE CONVERSACIÓN:
- Si la petición es clara, RESPONDE DIRECTAMENTE. Nunca preguntes "¿es para un examen?"
  ni "¿qué quieres estudiar?" antes de ayudar. Primero cumples, luego (opcional) ofreces
  un siguiente paso ("Si quieres, te pongo un ejercicio.").
- La materia seleccionada es CONTEXTO PREFERENTE, no una barrera. Si el usuario está en
  Historia y pregunta por los números naturales, respóndele igual.
- Si pide un ejercicio -> CRÉALO. "Otro" -> siguiente. "Más difícil"/"más fácil" -> ajusta el nivel.
  "Corrígeme" -> corrige su último intento. "No entiendo el paso N" -> reexplica ESE paso.
  "Hazme preguntas" -> mini-quiz.
- Mantén el contexto del hilo: sabes a qué "segundo paso", a qué ejercicio o a qué apartado
  se refiere el usuario.
- Adapta nivel, longitud y dificultad al perfil y a la conversación sin volver a preguntarlo.

DOCUMENTOS DEL USUARIO:
- Cuando haya "context.document" o pasajes recuperados por RAG, ESA es tu fuente prioritaria.
- No inventes datos del documento. Si la respuesta no está en el material, dilo con naturalidad:
  "Eso no aparece en tus apuntes, pero puedo explicártelo con conocimiento general si quieres."
- No contradigas el documento con conocimiento general.

FORMATO:
- Devuelve el cuerpo en HTML simple: <p>, <ul>, <ol>, <strong>, <em>, <blockquote>. Sin <script>/<style>.
- Usa listas, ejemplos y un resumen final solo cuando ayuden. No te alargues sin necesidad.
- En matemáticas y ciencias verifica el resultado; si no estás seguro, dilo. No inventes.
- Si has usado búsqueda web, cita solo las fuentes que devuelva el grounding.
`.trim();

export function toHtml(t: string): string {
  const esc = (s: string) => s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]!));
  return t.split(/\n{2,}/).map((p) => {
    if (/^\s*[-*]\s+/.test(p)) {
      return "<ul>" + p.split(/\n/).map((li) => "<li>" + esc(li.replace(/^\s*[-*]\s+/, "")) + "</li>").join("") + "</ul>";
    }
    return "<p>" + esc(p).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") + "</p>";
  }).join("");
}

export interface ChatCtx {
  subject?: string;
  title?: string;
  summary?: string;
  concepts?: string[];
  passages?: { content: string; similarity: number }[];   // RAG
  fullText?: string;                                       // fallback si no hay chunks
}

export interface ChatProfile {
  level?: string | null;
  goals?: string[];
  lang?: string;
}

/** Construye el bloque de contexto (documento + RAG + perfil) que se antepone al system. */
export function buildContextBlock(ctx: ChatCtx | null, profile: ChatProfile | null, lang: string): string {
  let out = "\nIdioma de respuesta: " + (lang || "es") + ".";
  if (profile) {
    out += `\nPERFIL DEL ESTUDIANTE: nivel=${profile.level || "?"} objetivos=${(profile.goals || []).join(", ") || "?"}.`;
  }
  if (ctx) {
    if (ctx.passages && ctx.passages.length) {
      out += `\n\nPASAJES RELEVANTES DEL DOCUMENTO DEL USUARIO (${ctx.subject || ""} · ${ctx.title || ""}), usa esto como fuente prioritaria:\n`;
      out += ctx.passages.map((p, i) => `[${i + 1}] ${p.content}`).join("\n");
    } else if (ctx.fullText) {
      out += `\n\nDOCUMENTO DEL USUARIO (${ctx.subject || ""} · ${ctx.title || ""}), fuente prioritaria:\n${ctx.fullText.slice(0, 12000)}`;
    } else if (ctx.summary) {
      out += `\n\nMATERIAL DEL USUARIO (${ctx.subject || ""} · ${ctx.title || ""}):\n${ctx.summary}\nConceptos: ${(ctx.concepts || []).join(", ")}`;
    }
  }
  return out;
}

// ---- prompts de las tareas de generación de estudio ----

export function summaryPrompt(lang: string): string {
  return `Resume el material del usuario. Devuelve SOLO JSON:
{"summary": "3-6 frases", "concepts": ["..."], "keyPoints": ["..."], "difficulty": "easy|med|hard", "readMin": number}
Basado ÚNICAMENTE en el material. No añadas información que no esté. Idioma: ${lang}.`;
}

export function flashcardsPrompt(n: number, difficulty: string, lang: string): string {
  return `Crea ${n} flashcards de estudio a partir del material del usuario, dificultad ${difficulty}.
Preguntas claras, respuestas breves y correctas SEGÚN EL MATERIAL. Devuelve SOLO JSON:
{"cards":[{"question":"...","answer":"...","difficulty":"${difficulty}"}]}. Idioma: ${lang}.`;
}

export function quizPrompt(n: number, difficulty: string, lang: string): string {
  return `Crea un test de ${n} preguntas tipo test (4 opciones) sobre el material del usuario, dificultad ${difficulty}.
Las preguntas y respuestas deben poder verificarse en el material. Devuelve SOLO JSON:
{"questions":[{"q":"...","opts":["a","b","c","d"],"correct":0,"exp":"por qué, citando el material"}]}. Idioma: ${lang}.`;
}

export function exercisesPrompt(n: number, difficulty: string, lang: string): string {
  return `Crea ${n} ejercicios (enunciados abiertos) sobre el material del usuario, dificultad ${difficulty}.
Para cada uno incluye la solución por pasos y la respuesta final. Devuelve SOLO JSON:
{"exercises":[{"q":"enunciado","steps":["paso 1","paso 2"],"a":"respuesta final"}]}. Idioma: ${lang}.`;
}

export function podcastPrompt(minutes: number, approach: number, lang: string): string {
  const style = ["explicación (un narrador claro y ordenado)",
    "repaso (explicación + conceptos clave + preguntas rápidas)",
    "conversación (diálogo natural entre dos voces A y B)"][approach || 0];
  return `Escribe el guion de un podcast de estudio de ~${minutes} minutos, estilo: ${style}.
ESCRÍBELO PARA SER HABLADO (frases cortas, tono cercano). Al citar una fecha, dila también en
palabras la primera vez ("1789, es decir, mil setecientos ochenta y nueve"). Basado SOLO en el
material del usuario. Devuelve SOLO JSON:
{"title":"...","two":${(approach || 0) === 2},"dur":${minutes * 60},"segments":[{"speaker":"A"|"B","text":"..."}]}
Idioma: ${lang}.`;
}

export function presentationPrompt(lang: string): string {
  return `Crea una presentación de estudio a partir del material del usuario.
Estructura: portada, introducción, conceptos principales, desarrollo (2-4), ejemplos, resumen, conclusión.
Adapta el número de diapositivas al contenido. NO inventes datos que contradigan el material.
Devuelve SOLO JSON:
{"title":"...","slides":[{"title":"...","subtitle":"...","content":"...","key_points":["..."],"example":"...","visual_suggestion":"idea de imagen/diagrama, sin URL"}]}
Idioma: ${lang}.`;
}
