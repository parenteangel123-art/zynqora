# Cómo conectar Zynqora a un backend real (Supabase + Gemini)

> Esta guía está escrita para alguien que **no programa**.
> No necesitas entender el código. Solo copiar, pegar y pulsar botones.
> Tiempo aproximado: **30–45 minutos**. Todo lo que se usa aquí tiene **plan gratuito**.

Cuando termines, Zynqora dejará de funcionar "en local en el navegador" y pasará a:
guardar tus datos en la nube, permitir crear cuenta e iniciar sesión, y usar la **IA real de Gemini**
(con la clave guardada de forma segura en el servidor, nunca en la app).

Si te atascas en un paso, no pasa nada: **la app sigue funcionando en modo demo** hasta que termines.

---

## Lo que vas a necesitar

1. Un ordenador con acceso a internet.
2. Una cuenta de correo.
3. 15 minutos para instalar **una** herramienta (la "CLI de Supabase"). Es un programa que se
   ejecuta escribiendo comandos; te doy los comandos exactos.

No hace falta tarjeta de crédito para nada de esto.

---

## Índice

1. [Crear la cuenta y el proyecto de Supabase](#1-crear-la-cuenta-y-el-proyecto-de-supabase)
2. [Instalar la herramienta de Supabase (CLI)](#2-instalar-la-herramienta-de-supabase-cli)
3. [Conectar la herramienta con tu proyecto](#3-conectar-la-herramienta-con-tu-proyecto)
4. [Crear las tablas (migraciones) y activar pgvector](#4-crear-las-tablas-migraciones-y-activar-pgvector)
5. [Crear los "cubos" de almacenamiento (Storage)](#5-crear-los-cubos-de-almacenamiento-storage)
6. [Conseguir la clave de Google Gemini](#6-conseguir-la-clave-de-google-gemini)
7. [Guardar los secretos en Supabase](#7-guardar-los-secretos-en-supabase)
8. [Publicar las funciones (Edge Functions)](#8-publicar-las-funciones-edge-functions)
9. [Configurar la app para que use el backend](#9-configurar-la-app-para-que-use-el-backend)
10. [Probar el inicio de sesión](#10-probar-el-inicio-de-sesión)
11. [Probar la subida de un documento](#11-probar-la-subida-de-un-documento)
12. [Probar la IA](#12-probar-la-ia)
13. [Si algo va mal](#si-algo-va-mal)

---

## 1. Crear la cuenta y el proyecto de Supabase

1. Ve a **https://supabase.com** y pulsa **"Start your project"**.
2. Inicia sesión con GitHub o con tu correo.
3. Pulsa **"New project"**.
4. Rellena:
   - **Name**: `zynqora` (o lo que quieras).
   - **Database Password**: pulsa **"Generate a password"** y **guárdala en un sitio seguro**
     (un gestor de contraseñas, una nota). La vas a necesitar en el paso 3.
   - **Region**: elige la más cercana a ti (p. ej. *West EU (Ireland)*).
   - **Plan**: **Free**.
5. Pulsa **"Create new project"**. Tarda 1–2 minutos en estar listo.

Cuando esté listo, ve a **Project Settings** (el icono del engranaje, abajo a la izquierda) → **API**.
Anota estos tres valores (los usarás más adelante):

| Nombre en Supabase | Para qué sirve | ¿Secreto? |
|---|---|---|
| **Project URL** (`https://xxxx.supabase.co`) | dirección de tu backend | no |
| **Project API keys → `anon` `public`** | clave pública de la app | no (la protege la seguridad de la base de datos) |
| **Project API keys → `service_role` `secret`** | clave todopoderosa del servidor | **SÍ — no la pongas nunca en la app** |

También anota, de **Project Settings → General**, el **Reference ID** (algo como `abcdxyz123`).

---

## 2. Instalar la herramienta de Supabase (CLI)

Elige tu sistema:

### Windows
1. Instala **Scoop** (un instalador). Abre **PowerShell** (busca "PowerShell" en el menú Inicio) y pega:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   irm get.scoop.sh | iex
   ```
2. Instala la CLI de Supabase:
   ```powershell
   scoop install supabase
   ```

### macOS
1. Abre la app **Terminal**.
2. Si no tienes Homebrew, instálalo pegando lo que dice **https://brew.sh**.
3. Instala la CLI:
   ```bash
   brew install supabase/tap/supabase
   ```

### Comprobar que funciona
En la misma terminal, escribe:
```bash
supabase --version
```
Si te devuelve un número (p. ej. `2.x.x`), perfecto.

---

## 3. Conectar la herramienta con tu proyecto

1. En la terminal, **entra en la carpeta de este proyecto** (la que contiene la carpeta `supabase/`).
   - Windows: `cd C:\ruta\a\Zynqora`
   - macOS: `cd /ruta/a/Zynqora`
2. Inicia sesión en Supabase (se abrirá el navegador para confirmar):
   ```bash
   supabase login
   ```
3. Vincula la carpeta con tu proyecto (sustituye `TU_REFERENCE_ID` por el que anotaste en el paso 1):
   ```bash
   supabase link --project-ref TU_REFERENCE_ID
   ```
   Te pedirá la **Database Password** que guardaste en el paso 1. Pégala (no se verá al escribir).

---

## 4. Crear las tablas (migraciones) y activar pgvector

Un solo comando crea **todas** las tablas, la seguridad (RLS), pgvector y los planes:

```bash
supabase db push
```

Verás una lista de archivos `.sql` que se aplican (`0001_extensions`, `0002_schema`, …).
Al terminar, entra en el panel de Supabase → **Table Editor** y comprueba que aparecen tablas como
`profiles`, `subjects`, `documents`, `document_chunks`, `conversations`, `messages`, `calendar_tasks`, …

> **pgvector** (para la búsqueda inteligente en tus apuntes) se activa solo con la migración `0001`.
> No tienes que hacer nada más.

---

## 5. Crear los "cubos" de almacenamiento (Storage)

Los archivos que subas se guardan en Supabase Storage. Hay que crear dos cubos:

1. En el panel de Supabase → **Storage** → **New bucket**.
2. Crea uno llamado exactamente **`documents`**:
   - **Public bucket**: **desactivado** (los documentos son privados).
   - **File size limit**: `25` MB.
3. Crea otro llamado exactamente **`avatars`**:
   - **Public bucket**: **activado**.
   - **File size limit**: `2` MB.

Las reglas de acceso (que cada usuario solo vea sus archivos) **ya se crearon** en el paso 4.

---

## 6. Conseguir la clave de Google Gemini

1. Ve a **https://aistudio.google.com/apikey**.
2. Inicia sesión con tu cuenta de Google.
3. Pulsa **"Create API key"** → **"Create API key in new project"**.
4. Copia la clave (empieza por `AIza...`). **Guárdala bien.** Esta clave es **secreta**.

> El plan gratuito de Gemini incluye una cuota generosa para empezar. Si más adelante creces,
> tendrás que añadir facturación en Google Cloud, pero para probar no hace falta.

---

## 7. Guardar los secretos en Supabase

En la terminal (en la carpeta del proyecto), ejecuta estos dos comandos.
Sustituye lo que va después del `=` por tus valores reales:

```bash
supabase secrets set GEMINI_API_KEY=AIza_tu_clave_de_gemini
supabase secrets set ALLOWED_ORIGIN=*
```

> `ALLOWED_ORIGIN=*` está bien para probar. Cuando publiques la app en una web,
> cámbialo a la URL de esa web:
> `supabase secrets set ALLOWED_ORIGIN=https://tu-app.vercel.app`

**No necesitas** poner `SUPABASE_URL` ni las claves de Supabase: Supabase las inyecta
automáticamente en las funciones.

---

## 8. Publicar las funciones (Edge Functions)

Son dos: la de IA y la de procesado de archivos.

```bash
supabase functions deploy zynqora-ai
supabase functions deploy ingest
```

Cuando terminen, en el panel → **Edge Functions**, verás las dos con estado *Deployed*.
La URL de la IA será:

```
https://TU-REFERENCE-ID.supabase.co/functions/v1/zynqora-ai
```

---

## 9. Configurar la app para que use el backend

### Opción A — el prototipo actual (artifact / index.html)

1. Abre Zynqora.
2. Ve a **Perfil → Configuración → Zynqora AI → Zynqora Cloud**.
3. Rellena:
   - **URL de Supabase**: tu *Project URL* (`https://xxxx.supabase.co`).
   - **Clave pública (anon)**: la clave `anon` `public` del paso 1.
4. Pulsa **Conectar**.

La app detecta la URL, calcula sola la dirección de la Edge Function y cambia el badge a **IA real**.
Mientras esos campos estén vacíos, la app sigue en **Demo** (motor local + voz del navegador).

### Opción B — la app real de Expo (cuando exista)

Crea un archivo `.env` en la raíz (copia de `.env.example`) con:

```
EXPO_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJI...
```

y reinicia el servidor de Expo.

---

## 10. Probar el inicio de sesión

1. En Zynqora, ve a **Configuración → Zynqora Cloud → Crear cuenta**.
2. Introduce un correo y una contraseña (mínimo 6 caracteres).
3. Pulsa **Crear cuenta**.
   - Si en `config.toml` dejaste `enable_confirmations = false` (por defecto), entras directamente.
   - Si lo pusiste en `true`, revisa tu correo y confirma.
4. Ve al panel de Supabase → **Authentication → Users**. Debe aparecer tu usuario.
5. En **Table Editor → profiles**, debe haber una fila con tu correo (se crea sola).

**Prueba de seguridad rápida:** crea un segundo usuario, crea una materia con él, cierra sesión,
entra con el primero → **no** debes ver la materia del segundo. (Eso es la RLS funcionando.)

---

## 11. Probar la subida de un documento

1. Con la sesión iniciada, ve a **Apuntes → Añadir material → Documento**.
2. Sube un PDF **de texto** (no una foto escaneada) o un `.txt`.
3. La app:
   - crea la fila en `documents` (estado *procesando*),
   - sube el archivo a Storage (`documents/<tu-id>/...`),
   - llama a la función `ingest`.
4. En unos segundos el estado pasa a **Analizado**. En **Table Editor → documents** verás
   `status = ready` y `extracted_text` con el contenido. En **document_chunks** verás los trozos.
5. Si subes una **foto** de apuntes, `ingest` usa Gemini Vision para leerla (OCR).

---

## 12. Probar la IA

1. Abre el documento → **Preguntar a Zynqora**.
2. Pregunta algo que esté en el documento ("¿En qué año se firmó…?").
3. La respuesta debe salir **del contenido del documento** (RAG). En **Edge Functions → zynqora-ai → Logs**
   verás la petición.
4. Prueba la conversación: *"Ponme un ejercicio"* → *"Más difícil"* → *"Corrígeme"*.
5. Prueba el límite: como estás en plan **Free**, tras 20 mensajes de IA el servidor devuelve
   `402 LIMIT_REACHED` y la app muestra *"Has alcanzado el límite de tu plan"*.
   En **Table Editor → ai_usage** verás el contador subir.

---

## Si algo va mal

| Síntoma | Qué mirar |
|---|---|
| `supabase link` falla | ¿Reference ID correcto? ¿contraseña de la base de datos correcta? |
| `db push` falla en `0001_extensions` | Vuelve a lanzarlo; a veces pgvector tarda en habilitarse. Si persiste, en el panel → **Database → Extensions**, activa `vector` a mano y quita esa línea de `0001`. |
| La subida de archivos falla | ¿Creaste los buckets `documents` y `avatars` con esos nombres exactos? |
| La IA responde `ai_not_configured` | Falta `supabase secrets set GEMINI_API_KEY=...` o no redeployaste la función después. |
| La IA responde `unauthorized` | La app no está mandando el token de sesión. Cierra e inicia sesión otra vez. |
| CORS / "blocked by CORS policy" | `supabase secrets set ALLOWED_ORIGIN=<la URL exacta de tu app>` y redeploy. |
| Ver logs de una función | Panel → **Edge Functions → (nombre) → Logs**. |
| Empezar de cero | `supabase db reset` (¡borra TODO!) y repite desde el paso 4. |

**Recuerda:** mientras no completes esto, Zynqora funciona en modo demo. Nada se rompe.
La clave de Gemini **solo** está en Supabase Secrets. La app nunca la ve.

---

## Después: publicar la web (opcional)

La app de Expo se publica gratis en **Vercel** o **Cloudflare Pages**:
1. Sube el repositorio a GitHub.
2. En Vercel: *New Project* → elige el repo → *Framework: Expo* → añade las variables
   `EXPO_PUBLIC_SUPABASE_URL` y `EXPO_PUBLIC_SUPABASE_ANON_KEY` → *Deploy*.
3. Copia la URL final y ejecútalo:
   `supabase secrets set ALLOWED_ORIGIN=https://esa-url` + `supabase functions deploy zynqora-ai`.
