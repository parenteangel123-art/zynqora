# Zynqora — Arquitectura

## Visión general

```
┌──────────────────────────────────────────────────────────────┐
│  FRONTEND — Expo Universal (React Native + RN Web)            │
│  (hoy: prototipo prototype/index.html; misma lógica portable) │
│                                                              │
│   AIProvider  ──►  DemoProvider        (sin backend)          │
│               └─►  RealGeminiProvider  (con backend)          │
│   Auth        ──►  Supabase Auth (dormant si no hay URL)      │
│   Sync        ──►  Supabase REST  (dormant si no hay sesión)  │
│   Store       ──►  IndexedDB  (caché / offline)               │
└───────────────┬──────────────────────────────────────────────┘
                │ HTTPS (JWT del usuario en Authorization)
                ▼
┌──────────────────────────────────────────────────────────────┐
│  SUPABASE                                                     │
│                                                              │
│  Auth  ── email+contraseña, recuperación, sesión, JWT        │
│                                                              │
│  Postgres + RLS                                              │
│   profiles subjects documents document_chunks                │
│   conversations messages calendar_tasks                      │
│   flashcards quizzes study_sessions quiz_results             │
│   streaks ai_usage subscriptions plans                       │
│   RPC: match_document_chunks() consume_quota()               │
│        current_usage() touch_streak() delete_my_account()    │
│                                                              │
│  Storage  ── bucket "documents" (privado), "avatars"         │
│                                                              │
│  Edge Functions (Deno)                                       │
│   • zynqora-ai   auth → cuota → RAG → prompt → Gemini → resp │
│   • ingest       Storage → extraer → OCR → chunk → embed     │
│                                                              │
│  Secrets:  GEMINI_API_KEY  (solo aquí)                       │
└───────────────┬──────────────────────────────────────────────┘
                │ HTTPS (GEMINI_API_KEY, server-only)
                ▼
        Google Gemini  (chat, embeddings, vision/OCR, TTS)
```

**Regla invariable:** el frontend NUNCA habla con Gemini. Siempre pasa por `zynqora-ai`.
La `GEMINI_API_KEY` vive solo en Supabase Secrets.

---

## Flujo de una pregunta con documento (RAG)

```
Usuario: "Explícame el segundo apartado de mis apuntes"
  │
  ├─ frontend → POST /functions/v1/zynqora-ai  { task:"chat", text, documentId, history }
  │             (Authorization: Bearer <JWT del usuario>)
  │
  ├─ zynqora-ai:
  │   1. getUser(JWT)                         → user.id
  │   2. consume_quota("aiMessages")          → 402 si agotado (LIMIT_REACHED)
  │   3. embedQuery(text)                     → vector
  │      match_document_chunks(vector, docId) → pasajes relevantes (RLS: solo los del usuario)
  │      (si no hay embeddings → usa documents.extracted_text como fallback)
  │   4. system = SYSTEM_ZYNQORA + pasajes + perfil
  │   5. Gemini generateContent(model, system, history+text)
  │   6. → { html, text, sources?, grounded:true, tutor:true }
  │
  └─ frontend: aiPush("ai", respuesta); persiste en messages
```

Si la información no está en los pasajes, la personalidad de Zynqora responde:
*"Eso no aparece en tus apuntes, pero puedo explicártelo con conocimiento general si quieres."*

---

## Flujo de subida + ingesta

```
frontend:
  1. INSERT documents { name, mime_type, size, subject_id,
                        storage_path:"documents/<uid>/<uuid>.<ext>", status:"processing" }
  2. Storage.upload("documents/<uid>/<uuid>.<ext>", file)
  3. POST /functions/v1/ingest { documentId }

ingest:
  1. getUser → comprueba documents.user_id === user.id
  2. Storage.download(storage_path)
  3. extract(bytes, mime):
       txt/md  → decode
       pdf     → unpdf (pdf.js)         ── escaneado → status "failed" (honesto)
       docx    → mammoth
       imagen  → status "pending" → Gemini Vision OCR → texto
  4. Gemini → resumen + conceptos (metadata)
  5. chunk(texto) → por frases, ~900 chars, solape 1 frase
  6. por cada chunk: Gemini embed() → document_chunks.embedding (vector 768)
  7. UPDATE documents { status:"ready", extracted_text, summary, metadata, text_source }
     (NUNCA "ready" si no se extrajo texto real)
```

---

## Modo demo ↔ modo real

| | Sin backend (demo) | Con backend (real) |
|---|---|---|
| IA | `DemoProvider` = motor de reglas `ZAI` + `DocGen` extractivo | `RealGeminiProvider` → Edge Function → Gemini |
| Voz podcast | `SpeechSynthesis` del navegador | guion de Gemini + (futuro) TTS de Gemini; `SpeechSynthesis` sigue de fallback |
| Persistencia | IndexedDB (`Store`) | Supabase (fuente de verdad) + IndexedDB (caché) |
| Auth | ninguna (perfil local `DB.profile`) | Supabase Auth (`profiles.id = auth.uid()`) |
| Límites | contador local `DB.usage` | `consume_quota()` en Postgres — **no se salta recargando** |
| Archivos | leídos en el navegador (TXT/PDF/DOCX) | Storage + `ingest` (+ OCR real) |

La conmutación es por **configuración**: si `AI_CONFIG.supabaseUrl` está puesto → real; si no → demo.
El badge de la UI nunca dice "IA real" si sigue usando `DemoProvider`.

---

## Sincronización local ↔ nube

Cuando hay sesión, Supabase es la fuente de verdad. IndexedDB se usa como caché para arranque
instantáneo y para trabajar sin conexión momentánea.

- **Pull** al iniciar sesión / al abrir la app: `Sync.pull()` trae `subjects`, `documents`,
  `conversations`, `messages`, `calendar_tasks`, `study_sessions`, `streaks`, `ai_usage` → hidrata `DB`.
- **Push** tras cada mutación (con debounce): `Sync.push(entity)` hace `upsert` en la tabla
  correspondiente por `id`.
- **Conflictos**: *last-write-wins* por `updated_at`. Los `id` son UUID generados en cliente,
  así que un `upsert` no crea duplicados aunque el push se repita.
- **Sin conexión**: las mutaciones se acumulan en `Store` (`pendingSync`) y se reintenta al volver.

En el prototipo estos módulos (`Auth`, `Sync`) están escritos pero **dormidos**: solo actúan si
`AI_CONFIG.supabaseUrl` está configurado. Así el artifact no cambia de comportamiento.

---

## Mapa: pantalla del frontend → tabla / función

| Pantalla / acción | Tabla(s) | Edge Function |
|---|---|---|
| Onboarding, perfil | `profiles` | — |
| Materias | `subjects` | — |
| Añadir material | `documents`, Storage `documents/` | `ingest` |
| Ficha del documento | `documents`, `document_chunks` | — |
| Chat / "Preguntar a Zynqora" | `conversations`, `messages` | `zynqora-ai` (`chat`) |
| Resumen del documento | `documents.summary` | `zynqora-ai` (`generate_summary`) |
| Flashcards | `flashcards` | `zynqora-ai` (`generate_flashcards`) |
| Test | `quizzes`, `quiz_results` | `zynqora-ai` (`generate_quiz`) |
| Ejercicios | (en `messages`) | `zynqora-ai` (`generate_exercises`) |
| Podcast | (guion en cliente) | `zynqora-ai` (`generate_podcast_script`, `podcast_tts`) |
| Presentación | (en cliente) | `zynqora-ai` (`generate_presentation`) |
| Calendario | `calendar_tasks` | — |
| Sesión de repaso | `study_sessions` | — |
| Racha | `streaks` | RPC `touch_streak()` |
| Planes / consumo | `plans`, `ai_usage`, `subscriptions` | RPC `consume_quota()`, `current_usage()` |
| Eliminar cuenta | (cascada) | RPC `delete_my_account()` |

---

## Migración del prototipo a Expo

El prototipo (`prototype/app.js`) ya está estructurado para portarse:

| Módulo del prototipo | Se convierte en (Expo) |
|---|---|
| `V.*` (funciones que devuelven HTML) | componentes/pantallas de `expo-router` |
| `DB` (objeto en memoria) | store (Zustand / TanStack Query) hidratado desde Supabase |
| `Store` (IndexedDB) | `expo-sqlite` / `AsyncStorage` como caché |
| `AI_CONFIG` + `GeminiProvider` | `lib/ai.ts` con el mismo contrato (ya idéntico) |
| `Ingest` / `DocGen` (extractivo local) | fallback offline; la ruta principal es `ingest` |
| `t()` / `L()` (i18n) | `i18next` / `expo-localization` |
| `normalizeScriptForSpeech` | se mantiene tal cual (cliente) |
