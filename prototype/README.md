# Zynqora — Prototipo interactivo (Fase 1.3.1)

Demo **navegable, interactiva y multi-materia**. Sin backend, sin IA real, sin autenticación, sin pagos. Estado en memoria; idioma y tema en `localStorage`.

## Cómo abrirlo

- **Artifact:** el enlace que te ha pasado Claude (móvil, tablet y escritorio; idioma y tema se recuerdan).
- **En local:** doble clic en `prototype/index.html` (archivo autocontenido, sin dependencias).

## Estructura del código

- `_template.html` — HTML + CSS (sistema de diseño).
- `app.js` — i18n (ES/EN), contenido bilingüe por materia, store reactivo, motor Zynqora AI simulado, pantallas, navegación.
- `build.sh` — inyecta `app.js` en `_template.html` → genera `index.html`. Ejecuta `bash build.sh` tras cualquier cambio.
- `index.html` — **generado**. No editar a mano.

## Qué probar

1. **Materias** (`Materias`): 4 de ejemplo (Historia, Biología, Matemáticas, Economía) + `+ Añadir materia` (nombre, icono, color). Cambia de materia con el selector de la barra superior. Cada materia tiene documentos, flashcards, tests, progreso y conceptos débiles propios.
2. **Añadir material** (`Apuntes → + Añadir material`): tipo (PDF / Documento / Imagen / Texto) → archivo real o ejemplo → animación de análisis → resultado **coherente con la materia** (Revolución Francesa nunca mezcla con genética).
3. **Zynqora AI**: lista de conversaciones + `+ Nueva conversación`; respuestas simuladas que **varían** según la pregunta y el contexto de la materia. Accesos contextuales en flashcards, tests, resultados, documentos y dashboard.
4. **Calendario**: navega meses, selecciona días, `+ Añadir tarea` (título, materia, tipo, fecha, hora). Con un examen, `Preparar plan con Zynqora` genera un plan Lun–Vie que puede añadirse al calendario.
5. **Flashcards / Tests**: interactivos, con contenido de la materia seleccionada. Al terminarlos cambian progreso, repasos pendientes, dominio y la tarjeta "Último test" del dashboard.
6. **Dashboard**: responde a "¿Qué debería estudiar ahora?" — siguiente paso, progreso, repasos, conceptos débiles, próximas tareas, próximo examen, racha.
7. **Configuración**: idioma (cambia toda la interfaz), tema, notificaciones, preferencias de estudio.
8. **Barra del prototipo**: Móvil / Tablet / Escritorio, tema y ES/EN, menú de pantallas, Ocultar.

## Novedades de la Fase 1.3.1 — voz humana + pronunciación inteligente del podcast

Pipeline separado: `generatePodcastScript()` → `normalizeScriptForSpeech()` → `addVoiceDirection()` → `generateTTS()` → reproductor.

- **Dos capas: transcripción visual ≠ texto para voz.** La transcripción sigue mostrando `1789`, `14 de julio de 1789`, `siglo XVIII`, `x²`, `25%`; el TTS recibe la versión hablada.
- **`normalizeScriptForSpeech(text, lang, topic)`** (probado, ES y EN):
  - **Fechas**: `1789` → «mil setecientos ochenta y nueve», `1945` → «mil novecientos cuarenta y cinco», `2026` → «dos mil veintiséis». Solo cuando el contexto indica año («en 1789», «de 1793 a 1794», «(1789–1799)», fin de frase). **`página 1789` NO se convierte.**
  - **Día + mes + año**: `14 de julio de 1789` → «catorce de julio de mil setecientos ochenta y nueve»; `12/10/1492` → «doce de octubre de mil cuatrocientos noventa y dos».
  - **Siglos**: `siglo XVIII` → «siglo dieciocho» (pero `Luis XVI` se respeta, no es un siglo).
  - **Números**: `3 causas` → «tres causas», `1500 personas` → «mil quinientas personas» (concordancia de género), `2.500` → «dos mil quinientos».
  - **Matemáticas** (solo para la voz): `x²` → «x al cuadrado», `2x + 3 = 7` → «dos equis más tres es igual a siete», `√25` → «raíz cuadrada de veinticinco», `π` → «pi».
  - **Porcentajes**: `25%` → «veinticinco por ciento», `7,5%` → «siete coma cinco por ciento».
  - **Moneda / unidades / grados**: `10,50 €` → «diez euros con cincuenta», `5 km` → «cinco kilómetros», `20 min` → «veinte minutos», `37 °C` → «treinta y siete grados Celsius».
- **`addVoiceDirection(lang, estilo, dosVoces)`**: instrucción de interpretación (tono cálido y conversacional, pausas naturales, énfasis en fechas/conceptos, «nunca dígito por dígito»). En demo se aplica lo que el navegador permite (voz más natural, ritmo variable, pausas por frase, ±entonación, tono según estilo); conectado, esta misma dirección se antepone al guion en **Gemini TTS**.
- **Naturalidad (demo)**: cada segmento se divide en **frases** que se locutan por separado → **pausas naturales**; el ritmo varía ligeramente y baja un ~7% en frases con fechas o palabras clave; se elige la voz más natural disponible; en conversación, **dos voces** distintas (tono/pitch).
- **Guion escrito para ser hablado**: «Hola, bienvenido a tu podcast… hoy vamos a repasar… paso a paso y sin prisa», en vez de prosa académica.
- **Estilos de voz**: Natural · Profesor · **Podcast** · Conversación (afectan al tono/ritmo y a la dirección de voz).
- **🎵 Música de fondo ON/OFF** (por defecto OFF, volumen bajo, nunca sustituye a la voz).
- **Estados de generación**: *Analizando el material… → Creando el guion… → Preparando la narración… → Generando la voz… → Preparando el audio…*. Si falla: error + reintentar (nunca música en lugar de voz).
- Debug: `window.ZynqoraSpeech.normalize(texto, "es")` para probar la normalización.

## Novedades de la Fase 1.3 — arquitectura de IA real (Gemini) + voz del podcast

- **Capa de proveedor `ZynqoraAIProvider`**: la app solo habla con una API semántica propia
  (`chat`, `podcastScript`, `presentation`, `analyzeDocument`, `tts`). Dos implementaciones:
  - `DemoProvider` — motor local basado en reglas + **voz del navegador**.
  - `GeminiProvider` — llamadas reales a Google Gemini **a través de tu servidor** (`AI_CONFIG.endpoint`),
    con selección de modelo, Google Search grounding y TTS multi-hablante.
- **Configuración central** (`AI_CONFIG` en `app.js`): `provider: "gemini"`, `ttsProvider: "gemini"`,
  `webSearch: true`, `models: { chat: gemini-2.5-flash, reasoning/documents: gemini-2.5-pro, tts: gemini-2.5-flash-preview-tts }`,
  `endpoint` (se pega en Configuración).
- **Modo DEMO ↔ IA REAL**: `Configuración → Zynqora AI`. Sin servidor = **Demo**; con servidor conectado = **IA real**.
  Badge visible en el chat, en la portada del podcast y en Configuración. Nada de respuestas simuladas
  haciéndose pasar por IA real.
- **La marca es "Zynqora AI"** — nunca se muestra "Gemini" al usuario final.
- **Búsqueda web honesta**: en demo, Zynqora dice claramente que la búsqueda en tiempo real se activa
  al conectar el servidor (no inventa fuentes). En real, `GeminiProvider` añade `google_search` y muestra las **Fuentes**.
- **Conversación real**: respuestas directas, sin preguntas innecesarias; la materia es **contexto, no restricción**
  (en Historia puedes preguntar por matemáticas); mantiene el contexto ("ponme un ejemplo" → del último tema,
  "ahora hazme preguntas" → mini-quiz).
- **Podcast con VOZ REAL (ya no música)**:
  - El guion depende del tipo: **Explicación** (narrador), **Repaso** (+ preguntas rápidas),
    **Conversación** (diálogo Voz A / Voz B con turnos).
  - En demo se **lee en voz alta con `SpeechSynthesis` del navegador** (voz on-device real), con dos voces
    distintas para la conversación, velocidad y volumen aplicados de verdad.
  - Con Zynqora AI conectado, el guion pasa a **Gemini TTS** (`multiSpeakerVoiceConfig` para conversación).
  - Estados de generación reales: *Analizando el material… → Creando el guion… → Preparando la narración… → Generando la voz… → Preparando el audio…*. Si la IA falla: mensaje de error + reintentar (no arranca música).
  - Transcripción con marcas de tiempo, línea activa resaltada y **salto al tocar una línea** (o el scrubber, o ±frase).
- **Presentaciones** ya pasan por `ZynqoraAI.presentation()` (demo = generación por código; real = Gemini decide
  el tipo de elemento visual por diapositiva: timeline / comparación / tarjetas / destacado).
- **Servidor de referencia listo para desplegar**: [`server/zynqora-ai-proxy.md`](server/zynqora-ai-proxy.md)
  — Cloudflare Worker de un archivo (también Vercel/Supabase Edge), system prompt de Zynqora AI, `GEMINI_API_KEY`
  server-side, y qué falta para producción.

### REAL / DEMO / PREPARADO PARA API

| Parte | En el artifact (sin servidor) | Con `AI_CONFIG.endpoint` conectado |
|---|---|---|
| Motor conversacional | **Demo** (reglas locales) | **Real** — Gemini 2.5 Flash/Pro |
| Búsqueda web | Demo — lo dice claramente | **Real** — Google Search grounding + fuentes |
| Voz del podcast | **Real pero del navegador** (`SpeechSynthesis`, on-device) | **Real** — Gemini TTS (multi-hablante) |
| Guion del podcast / estructura de presentación / análisis de archivo | **Demo** (contenido sembrado) | **Real** — Gemini |
| Ilustraciones de presentaciones | por código (sin fuente inventada) | igual, o `imagen-3` / búsqueda con licencia (opcional) |
| API key | nunca en el cliente | solo en tu servidor (`GEMINI_API_KEY`) |

## Novedades de la Fase 1.2 — presentaciones y podcast con vida

**Presentaciones IA**
- Deck de **8 diapositivas** con composiciones distintas: portada con ilustración, listas con **iconos por concepto** (elegidos según el texto), **línea temporal** (Historia: 1789 · 1791 · 1793 · 1799), tarjeta de concepto clave, comparación a dos columnas, dato destacado y cierre.
- **Ilustraciones que dependen del tema**: Historia → fortaleza/Bastilla; Biología → hélice de ADN; Matemáticas → ejes con curva y tangente; Economía → curvas de oferta y demanda cruzándose.
- **5 estilos** (Minimal · Editorial · Académico · Visual · Oscuro) que cambian tipografía, fondo, tarjetas y tratamiento.
- **Reproductor mejorado**: barra de progreso segmentada, **miniaturas** navegables, `n / N`, ← / →, teclado (←/→, F, Esc) y **Modo presentación** a pantalla completa dentro del marco.
- **Animaciones** suaves de entrada por diapositiva y de sus elementos (fade + slide + scale).
- **Generación con feedback**: "Analizando tus apuntes… → Organizando las ideas… → Creando la estructura… → Seleccionando elementos visuales… → Preparando tu presentación…".

**Podcast IA**
- Antes de generar: **¿Cómo quieres aprenderlo?** (Explicación / Repaso / Conversación) → **Duración** (5 / 10 / 20 min) → **Voz** (Voz 1 cálida / Voz 2 clara) → **Estilo de voz** (Natural / Profesor / Conversacional) → "Generar podcast".
- **Portada visual** premium por materia: 🎙️ + título + enfoque + duración + "Generado por Zynqora AI".
- **Reproductor de audio funcional**: ▶/⏸, barra de progreso (arrastrable/clicable), tiempo actual/total, **−15 s / +15 s**, velocidad **0.75 / 1 / 1.25 / 1.5 / 2×** y **control de volumen**.
- **Audio real de demostración** generado con la **Web Audio API** (pista ambiente que responde a play/pausa/volumen); la **voz TTS** (Voz · Estilo) queda como capa **preparada para conectar** un servicio de generación de voz.
- **Transcripción** con marcas de tiempo `[MM:SS]`, desplazable, con la línea activa resaltada; **al pulsar una línea, el reproductor salta a ese momento**.

**Compartido**
- Tras subir/analizar un material: rejilla de **7 acciones** (🧠 Preguntar · 📝 Resumir · 🃏 Flashcards · 🧪 Test · 🎙️ Podcast · 🎞️ Presentación · 🗺️ Mapa conceptual), también en la pantalla del documento. Las de Plus muestran la etiqueta PLUS.
- Responsive: en móvil se ocultan las miniaturas y los controles se apilan; tablet y escritorio muestran la experiencia completa.

### Qué es REAL / SIMULADO / PREPARADO PARA API en estas dos funciones

| Parte | Estado |
|---|---|
| Navegación del deck, miniaturas, modo presentación, teclado, animaciones | **REAL** (interactivo) |
| Reproductor de podcast (play/pausa/seek/skip/velocidad/volumen) + audio ambiente Web Audio | **REAL** |
| Transcripción y salto por marcas de tiempo | **REAL** (contenido derivado del material sembrado) |
| Contenido de diapositivas y guion del podcast | **SIMULADO** (se genera a partir del material de ejemplo de cada materia, no por IA) |
| Ilustraciones | **SIMULADO** (set de SVG por materia; no generación de imágenes) |
| Voz TTS del podcast, exportación real (PDF/PPTX/MP3), generación por IA a partir de PDF/imagen reales | **PREPARADO PARA API** |

## Novedades de la Fase 1.1 — pulido de checkout, podcast, presentaciones y perfil

- **Checkout "Finalizar pago"** (demo visual, sin Stripe/PayPal reales): resumen "Estás activando Zynqora Plus · facturación mensual/anual · precio", métodos **Tarjeta / PayPal**, campos visuales (nombre en la tarjeta, número, caducidad, CVC, país, código postal), botón "Pagar 7,99 €/mes" y aviso "🔒 Pago simulado — demo de producto, no se realiza ningún cobro real". Al confirmar: cambia el plan localmente, muestra "¡Bienvenido a Zynqora Plus! ✨" y **actualiza los límites** (se ven en la pantalla de éxito).
- **Podcast IA** (herramienta completa): material → "¿Qué quieres crear?" (🎙️ Podcast de estudio) → duración (Corto 5 / Medio 10 / Profundo 20 min) → estilo (Explicación / Repaso / Conversación) → "Crear podcast" → animación "Zynqora está preparando tu podcast…" → **reproductor visual** con play/pausa, barra de progreso, tiempo actual/total y velocidad 1x·1.25x·1.5x·2x. Reproducción simulada acelerada; sin audio real ("la generación de voz real se conectará más adelante").
- **Presentaciones IA**: material → estilo (Minimalista / Académico / Visual / Creativo) → generar → **presentación de demostración navegable** (← / →, "3 / 8", puntos), con diapositivas construidas a partir del material real de la materia (título, "¿Por qué es importante?", puntos clave, estructura, comprobaciones, a reforzar). Botones Editar / Regenerar / Exportar (simulados).
- **Mapa conceptual IA**: material → estilo → mapa de demostración (concepto central + ramas del material).
- **Material → IA**: tras analizar un material, aparece una rejilla con **7 acciones**: Preguntar a Zynqora · Crear resumen · Crear flashcards · Crear test · Crear podcast · Crear presentación · Crear mapa conceptual (las de Plus muestran la etiqueta PLUS y abren el modal si estás en Free). También en la pantalla del documento.
- **Planes**: listas de funciones tal cual el brief ("Calendario y tareas", "Zynqora AI — 20 mensajes al mes", "Todo lo de Free/Plus", "Repaso básico", "Colores básicos", "Personalización completa", "Experiencia IA avanzada", "Materias sin límite razonable"…), selector Mensual/Anual con precio y ahorro inmediatos, botones "Elegir Plus" / "Elegir Pro" / "Plan actual", "📄 Políticas" debajo de las tarjetas.
- **Modales**: función premium → "Esta función forma parte de Zynqora Plus." + descripción + [Actualizar a Plus] [Ver planes]. Límite alcanzado → "Has alcanzado el límite de tu plan Free." + barra de uso (p. ej. "Mensajes a Zynqora AI 20 / 20") + [Actualizar a Plus].
- **Perfil rediseñado** (`Perfil` en la navegación): avatar, nombre, email, plan, racha · materias · mensajes IA, uso mensual con barras, accesos a Materias / Calendario / Progreso / Configuración / Planes / Políticas, "Editar perfil" (cambia el avatar) y "Gestionar plan".
- **Responsive de la cuenta corregido**: la barra lateral queda fija y compacta arriba (ya no se va al fondo con páginas largas); "Perfil" es un elemento propio del menú lateral **y** de la barra inferior, con avatar + nombre + plan siempre visibles en móvil, tablet y escritorio.
- **Cero anuncios** reafirmado en planes, políticas ("En pocas palabras" → "💳 Sin anuncios") y a lo largo de la app.

## Novedades de la Fase 1.0 — planes, límites y políticas (todo simulado)

- **Planes locales** (`PLANS` en `app.js`): **Free** (0 €), **Zynqora Plus** (7,99 €/mes · 79,99 €/año), **Zynqora Pro** (14,99 €/mes · 149,99 €/año). Estado en `DB.plan` + `DB.usage` (persistidos). **Sin Stripe, sin pagos, sin backend.**
- **Pantalla de planes** (`Planes`, o desde Perfil → Tu plan): "Elige cómo quieres estudiar", selector **Mensual / Anual** con ahorro, tres tarjetas (Plus = "Más popular", Pro = "Experiencia IA avanzada"), comparativa de IA / archivos / tests / flashcards / podcast / presentaciones / mapas / materias. "Sin anuncios. Solo tú, tus estudios y Zynqora."
- **Contador de uso** en Perfil → *Tu plan*: barras `17/20` mensajes IA, `2/3` archivos, `3/5` tests, `12/20` flashcards (se ponen en ámbar al acercarse al límite; se renuevan cada mes).
- **Límites Free reales en el prototipo:** al agotar los mensajes de IA, los archivos o los tests, la función se bloquea y aparece el **modal de actualización** ("Has llegado al límite de tu plan Free" → *Actualizar a Plus* / *Ver todos los planes* / *Ahora no*). Elegante, no agresivo.
- **Funciones Premium:** Podcast IA y Presentaciones IA no están en Free → **modal de función** ("Esta función está disponible en Zynqora Plus y Pro" → *Ver planes*). Los colores de acento avanzados también quedan bloqueados en Free.
- **Checkout de demostración:** *Actualizar a Plus* → resumen del plan, Nombre, Email y un método de pago **solo visual** (no se pide ni se procesa ningún dato bancario) → *Confirmar suscripción* → "¡Bienvenido a Zynqora Plus! ✨". Desde Perfil se puede volver a Free.
- **Herramientas de estudio IA** (`Herramientas IA`, o desde el dashboard / un documento): flujo visual Material → Estilo → Vista previa para **Podcast**, **Presentación** y **Mapa conceptual**. Vista previa de demostración; la generación real se conectará más adelante.
- **Políticas y condiciones** (`Políticas`, o desde Perfil): bloque *"En pocas palabras"* + **27 apartados en acordeón** (cerrados por defecto), con secciones específicas para *Zynqora AI y contenido generado*, *Archivos y contenido del usuario*, garantía comercial de 30 min y política de **cero anuncios**. Incluye nota de que el texto es un borrador que deberá adaptarse a la legislación aplicable.
- **Zynqora AI — acciones directas:** además de explicar directamente, ahora crea directamente **ejercicios** ("Ponme 3 ejercicios de derivadas") y **flashcards** ("Ponme una flashcard") a partir del contenido de la materia.

## Ajuste — Zynqora AI: respuestas directas y naturales

- Si la petición es clara, **Zynqora responde directamente**, sin interrogar antes ni explicar sus propias capacidades.
  - "Explícame las derivadas" / "Explícame los números naturales" → explicación directa (idea + ejemplo + regla).
  - "Hazme un test de la Revolución Francesa" → empieza el test en el mismo mensaje (pregunta con opciones).
  - "Resume estos apuntes" → resume directamente.
  - "No entiendo este ejercicio" → intenta ayudar; solo pide el enunciado si de verdad no está disponible.
  - "Hola" → saludo cálido y natural preguntando qué necesitas (aún no hay petición concreta).
- **Solo pregunta** cuando la petición es ambigua, falta información imprescindible o la acción no puede hacerse sin ella.
- El **tema del mensaje manda sobre el contexto** de la conversación: preguntar por mitosis con "Contexto: Historia" responde de Biología, sin mezclar materias.
- Las respuestas de seguimiento cortas ("Examen", "Sí", "La general") continúan el tema anterior en vez de reiniciarlo.
- La oferta de siguiente paso (botones) es **opcional**: primero se cumple la petición, luego se ofrece continuar.

## Novedades de la Fase 0.9

- **Zynqora AI global**: ya no hace falta cambiar de materia para preguntar. Selector `Contexto: … ▾` con "Sin contexto" (respuesta libre) o una materia (usa su contenido). Respuestas mucho más ricas y variadas por intención (explicación / sencilla / detallada / ejemplo / comparación / resumen / prep. examen / errores). Se comporta como profesor particular: botones de seguimiento [Explícamelo más fácil] [Ponme un ejemplo] [Hazme una pregunta] [Profundiza] y **mini-preguntas dentro del chat** (respondes tocando una opción y Zynqora te corrige).
- **Camino de estudio** (`Repasa → Practica → Comprueba → Domina`): pantalla con progreso; completar una etapa avanza el camino.
- **Modos de repaso**: Flashcards · Test · Completa la palabra · Relaciona conceptos · Explica con tus palabras · Identifica el concepto (todos navegables, contenido por materia).
- **Completa la palabra**: rellena el hueco de una frase, feedback inmediato.
- **Rachas**: animación breve "🔥 ¡Racha de N días!" al terminar una sesión.
- **Foto de perfil**: `Editar foto` → imagen (si el entorno lo permite) o color; se recuerda.
- Onboarding, calendario, temas, colores, idiomas: se mantienen.

## Novedades de la Fase 0.8

- **Zynqora AI conversacional**: saludo natural, "Hola" responde de forma variada (no plantilla), respuestas por intención (explicar / sencillo / ejemplo / comparar / resumir / preguntar / error / plan) con longitud según la pregunta y un siguiente paso al final cuando tiene sentido.
- **Adjuntos en el chat**: botón `+` → PDF / Documento / Imagen. El archivo aparece como tarjeta en el mensaje (con opción de quitar antes de enviar); al enviar, "Contexto añadido: X".
- **Contexto de materia** visible: `Contexto: Historia · Revolución Francesa`, cambia con la materia.
- **Nuevo chat** funcional: crea conversación, limpia contexto, muestra el saludo, aparece en el historial (incl. "Preparación examen Historia").
- **Onboarding** rediseñado: bienvenida + 4 preguntas rápidas (cómo conociste Zynqora, objetivos, nivel, materia inicial) + pantalla final.
- **Colores de acento** en Configuración: violeta / azul / verde / rosa / naranja, se aplican al instante en toda la app y se recuerdan.
- Sesión "Personalizar" y "Zynqora Premium" ahora abren hojas reales.

## Conectar la IA real más adelante

Toda la IA pasa por `ZAI.ask(text, { intent, subjectId })` en `app.js`. Sustituir esa función por una llamada al backend real no requiere tocar la interfaz. Los adjuntos se representan como `{name, type}` en el mensaje, listos para enviar al análisis real.

## Contenido de demostración por materia

- **Historia** → Revolución Francesa (Antiguo Régimen, Estados Generales, Bastilla, Declaración de Derechos, el Terror…)
- **Biología** → Genética y herencia (ADN, mitosis, meiosis, leyes de Mendel…)
- **Matemáticas** → Derivadas (límite, definición de derivada, regla de la cadena, máximos y mínimos…)
- **Economía** → Oferta y demanda (escasez, ley de la demanda, equilibrio, elasticidad…)
