# Zynqora — verificación del backend

Estos checks **no se pueden ejecutar en el entorno donde se creó el código** (no hay Supabase
desplegado ni clave de Gemini). Ejecútalos **después** de seguir `DEPLOY.md`.

Marca cada uno cuando pase. Si alguno falla, mira `DEPLOY.md → Si algo va mal`.

---

## A. Base de datos y RLS (SQL)

Archivo: `supabase/tests/rls_test.sql` (pgTAP).

```bash
# instala pgTAP una sola vez
supabase db push   # ya lo hiciste; pgTAP se instala con la migración de tests si la añades
# o a mano en el SQL Editor:
#   create extension if not exists pgtap with schema extensions;

# ejecuta:
supabase test db
```

Comprueba:
- [ ] Todas las tablas tienen RLS activada.
- [ ] Un usuario A **no** puede `select` filas de un usuario B (subjects, documents, conversations, calendar_tasks, profiles).
- [ ] Un usuario A **no** puede `update`/`delete` filas de B.
- [ ] `plans` es legible por cualquiera.
- [ ] `ai_usage` es de solo lectura desde el cliente.

## B. Auth

- [ ] `POST /auth/v1/signup` crea el usuario **y** una fila en `profiles` (trigger `handle_new_user`).
- [ ] Contraseña incorrecta → `400 invalid_grant`.
- [ ] `POST /auth/v1/recover` con un correo existente devuelve `200` (envía email si hay SMTP).
- [ ] El token expira y se refresca con `refresh_token`.
- [ ] `RPC delete_my_account()` borra el usuario y **todo** en cascada.

## C. Storage

- [ ] Subir a `documents/<mi-uid>/x.pdf` → OK.
- [ ] Subir a `documents/<uid-de-otro>/x.pdf` → **403** (política de Storage).
- [ ] Descargar un archivo de otro usuario → **403**.

## D. Ingesta (`ingest`)

Con un PDF de texto real:
```bash
curl -s -X POST "$SUPABASE_URL/functions/v1/ingest" \
  -H "Authorization: Bearer $USER_JWT" -H "content-type: application/json" \
  -d '{"documentId":"<uuid>"}'
```
- [ ] Responde `{"status":"ready","chunks":N,"embedded":N}`.
- [ ] `documents.status` pasa a `ready`, `extracted_text` tiene contenido.
- [ ] `document_chunks` tiene N filas con `embedding` no nulo.
- [ ] Con un **PDF escaneado** → `status:"failed"`, detalle `pdf-empty-or-scanned` (NO "ready").
- [ ] Con una **imagen** → OCR de Gemini → `status:"ready"` con el texto transcrito.
- [ ] Con un archivo `.zip` → `status:"failed"`, detalle `unsupported`.

## E. RAG

```bash
curl -s -X POST "$SUPABASE_URL/functions/v1/zynqora-ai" \
  -H "Authorization: Bearer $USER_JWT" -H "content-type: application/json" \
  -d '{"task":"search","query":"¿cuándo se firmó el tratado?","documentId":"<uuid>"}'
```
- [ ] Devuelve `passages[]` ordenados por `similarity` descendente.
- [ ] Los `passages` contienen realmente la frase relevante del documento.
- [ ] Nunca devuelve chunks de documentos de otro usuario.

## F. Gemini / chat

```bash
curl -s -X POST "$SUPABASE_URL/functions/v1/zynqora-ai" \
  -H "Authorization: Bearer $USER_JWT" -H "content-type: application/json" \
  -d '{"task":"chat","text":"Explícame las derivadas","lang":"es"}'
```
- [ ] Responde con `{html, text, tutor:true}` — explicación directa, **sin** preguntar "¿es para un examen?".
- [ ] `{"task":"chat","text":"Ponme un ejercicio","history":[...]}` → genera un ejercicio.
- [ ] Con `documentId` y una pregunta cuya respuesta está en el doc → `grounded:true` y usa el pasaje.
- [ ] Con `documentId` y una pregunta ajena al doc → dice que no aparece en los apuntes.
- [ ] Sin `Authorization` → `401`.

## G. Límites

- [ ] Con plan `free`, tras 20 llamadas `task:"chat"` en el mes → la 21 responde `402` con
      `{"error":"limit_reached","code":"LIMIT_REACHED","quota":{...}}`.
- [ ] `ai_usage` refleja `count` = 20, `feature` = `aiMessages`, `period` = mes actual.
- [ ] Recargar la app / repetir la petición **no** resetea el contador.
- [ ] `RPC current_usage()` devuelve `{"aiMessages":20,...}`.
- [ ] Cambiar la suscripción a `plus` (fila en `subscriptions`) sube el límite automáticamente
      (trigger `sync_profile_plan`).

## H. Conversaciones

- [ ] `conversations` + `messages` guardan el hilo real.
- [ ] Secuencia: "Explícame las derivadas" → "Ahora ponme un ejercicio" → "Más difícil" →
      "No entiendo el segundo paso" — el modelo recibe el `history` y responde en contexto.

## I. No romper el artifact (modo demo)

- [ ] Con `AI_CONFIG.supabaseUrl` **vacío**, la app funciona igual que en la FASE D
      (documentos locales, chat demo, límites locales, ES/EN, persistencia IndexedDB).
- [ ] El badge dice **Demo**, no "IA real".
