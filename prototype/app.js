/* ============================================================
   Zynqora — Prototipo interactivo (Fase 0.7)
   Sin backend. Datos simulados. Estado local.
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- ICONS ---------------- */
  var I = {
    logo: '<path d="M5 4h14l-9 7h9l-14 9 5-9H5z" fill="currentColor"/>',
    today: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.2 1.8"/>',
    book: '<path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15H7.5A2.5 2.5 0 0 0 5 20.5z"/><path d="M5 20.5A2.5 2.5 0 0 1 7.5 18H19v3H7.5A2.5 2.5 0 0 1 5 20.5z"/>',
    notes: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M9.5 13h5M9.5 16.5h5"/>',
    chart: '<path d="M4 19V5M4 19h16M8 16v-4M12 16V9M16 16v-6"/>',
    user: '<circle cx="12" cy="8.5" r="3.5"/><path d="M5.5 19.5a6.5 6.5 0 0 1 13 0"/>',
    upload: '<path d="M12 16V5M8 9l4-4 4 4"/><path d="M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"/>',
    cards: '<rect x="4" y="7" width="13" height="13" rx="2.5"/><path d="M8 4h9a3 3 0 0 1 3 3v9"/>',
    quiz: '<circle cx="12" cy="12" r="8.5"/><path d="M9.5 9.5a2.6 2.6 0 0 1 5 .8c0 1.8-2.5 2-2.5 3.5"/><circle cx="12" cy="17" r=".6" fill="currentColor"/>',
    arrowR: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowL: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    chevR: '<path d="m9 6 6 6-6 6"/>',
    chevL: '<path d="m15 6-6 6 6 6"/>',
    chevD: '<path d="m6 9 6 6 6-6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="M5 12.5 10 17l9-10"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    spark: '<path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7z"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 1.7"/>',
    doc: '<path d="M7 3h8l4 4v14H7z"/><path d="M15 3v4h4M10 12h6M10 15.5h6M10 8.5h3"/>',
    layers: '<path d="M12 4 3 9l9 5 9-5-9-5z"/><path d="M3 14l9 5 9-5"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8" fill="currentColor"/>',
    bell: '<path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z"/><path d="M10 19a2 2 0 0 0 4 0"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17"/>',
    logout: '<path d="M14 20H6V4h8M18 12H9M15 8l4 4-4 4"/>',
    cloud: '<path d="M7 18a4 4 0 0 1-.5-8A6 6 0 0 1 18 11a3.5 3.5 0 0 1 0 7z"/>',
    trash: '<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/>',
    play: '<path d="M8 5.5v13l11-6.5z"/>',
    pause: '<path d="M9 5v14M15 5v14"/>',
    expand: '<path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
    volume: '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M15.5 8.5a4 4 0 0 1 0 7M18 6a7.5 7.5 0 0 1 0 12"/>',
    volumeOff: '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9l5 6M21 9l-5 6"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6"/>',
    skipBack: '<path d="M11 6 4 12l7 6zM19 6l-7 6 7 6z"/>',
    skipFwd: '<path d="m13 6 7 6-7 6zM5 6l7 6-7 6z"/>',
    scroll2: '<path d="M8 4h9a2 2 0 0 1 2 2v11a2 2 0 0 0 2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 0-2-2z M10 9h6M10 13h6M10 17h4"/>',
    scale: '<path d="M12 4v16M5 20h14M6 7h12M9 7l-3.5 6a2.8 2.8 0 0 0 6 0zM18 7l-3.5 6a2.8 2.8 0 0 0 6 0z"/>',
    lightning: '<path d="M13 3 5 13h5l-1 8 8-11h-5z"/>',
    refresh: '<path d="M4 5v5h5M20 19v-5h-5"/><path d="M19 10a7 7 0 0 0-13-2M5 14a7 7 0 0 0 13 2"/>',
    alert: '<path d="M12 4 2.5 20h19z"/><path d="M12 10v4M12 17.5v.5"/>',
    send: '<path d="M4 12 20 4l-6 16-3-7z"/><path d="M11 13 20 4"/>',
    calendar: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
    wand: '<path d="M6 20 18 8M15 5l1.2 2.8L19 9l-2.8 1.2L15 13l-1.2-2.8L11 9l2.8-1.2z"/>',
    summary: '<path d="M5 5h14M5 10h14M5 15h9M5 20h6"/>',
    message: '<path d="M20 4H4v13h4v4l5-4h7z"/>',
    image: '<rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="9" cy="9" r="1.6"/><path d="m5 18 5-5 3 3 3-3 3 3"/>',
    text: '<path d="M5 5h14M9 5v14M5 19h8"/>',
    landmark: '<path d="M4 21h16M5 21V10M19 21V10M4 10h16L12 4z M9 21v-7M15 21v-7"/>',
    sigma: '<path d="M17 4H6l6 8-6 8h11"/>',
    coins: '<ellipse cx="9" cy="7" rx="6" ry="3"/><path d="M3 7v5c0 1.7 2.7 3 6 3M3 12v5c0 1.7 2.7 3 6 3"/><ellipse cx="15" cy="14" rx="6" ry="3"/><path d="M21 14v5c0 1.7-2.7 3-6 3"/>',
    dna: '<path d="M7 3c0 6 10 6 10 12s-10 6-10 12M17 3c0 6-10 6-10 12s10 6 10 12M8 6h8M9 9h6M8 15h8M9 18h6"/>',
    atom: '<circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="9" ry="4"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)"/>',
    flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3M7.5 14h9"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-.7-1.5-.7-2.5S14 12 15.5 12H18a3 3 0 0 0 3-3 6 6 0 0 0-6-6z"/><circle cx="8" cy="10" r="1" fill="currentColor"/><circle cx="12" cy="7" r="1" fill="currentColor"/><circle cx="16" cy="10" r="1" fill="currentColor"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z M14 6l4 4"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    dumbbell: '<path d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12"/>',
    brain: '<path d="M12 5a3 3 0 0 0-6 .5C4.5 6 4 7.5 5 9c-1 1.5 0 3.5 2 4 0 2 1.5 3 3 3h2V5z M12 5a3 3 0 0 1 6 .5c1.5.5 2 2 1 3.5 1 1.5 0 3.5-2 4 0 2-1.5 3-3 3h-2"/>',
    trophy: '<path d="M8 4h8v4a4 4 0 0 1-8 0zM8 6H5v1a3 3 0 0 0 3 3M16 6h3v1a3 3 0 0 1-3 3M10 15h4M9 20h6M12 15v5"/>'
  };
  function icon(name, size) {
    return '<svg viewBox="0 0 24 24" width="' + (size || 20) + '" height="' + (size || 20) + '" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + (I[name] || "") + "</svg>";
  }
  var SUBJECT_ICONS = ["landmark", "sigma", "dna", "coins", "flask", "atom", "book", "brain", "globe", "palette"];

  /* ---------------- i18n ---------------- */
  var I18N = {
    es: {
      "proto.mobile": "Móvil", "proto.tablet": "Tablet", "proto.desktop": "Escritorio",
      "proto.screens": "Pantallas", "proto.hide": "Ocultar", "proto.reveal": "Mostrar controles",
      "proto.demoNote": "Prototipo · datos simulados, sin conexión real",

      "menu.welcome": "Bienvenida", "menu.app": "Aplicación", "menu.states": "Estados",
      "menu.landing": "Landing", "menu.onboarding": "Onboarding", "menu.dashboard": "Dashboard · Hoy",
      "menu.subjects": "Mis materias", "menu.subject": "Detalle de materia", "menu.notes": "Mis apuntes",
      "menu.addMaterial": "Añadir material", "menu.analysis": "Análisis de material",
      "menu.document": "Material del documento", "menu.path": "Camino de estudio", "menu.study": "Modos de repaso", "menu.fill": "Completa la palabra",
      "menu.flashcards": "Flashcards", "menu.test": "Test", "menu.results": "Resultados",
      "menu.progress": "Progreso", "menu.calendar": "Calendario", "menu.plan": "Plan recomendado",
      "menu.ai": "Zynqora AI", "menu.settings": "Configuración",
      "menu.stFirst": "Dashboard · primera vez", "menu.stEmptyNotes": "Apuntes · vacío",
      "menu.stAllclear": "Estudio · sin repasos", "menu.stError": "Error de conexión",

      "nav.today": "Hoy", "nav.subjects": "Materias", "nav.notes": "Apuntes",
      "nav.calendar": "Calendario", "nav.progress": "Progreso", "nav.profile": "Perfil", "nav.ai": "Zynqora AI",

      "common.continue": "Continuar", "common.back": "Atrás", "common.next": "Siguiente",
      "common.prev": "Anterior", "common.skip": "Saltar", "common.save": "Guardar", "common.cancel": "Cancelar",
      "common.add": "Añadir", "common.min": "min", "common.minutes": "minutos", "common.seeAll": "Ver todo",
      "common.demoAction": "Acción de demostración", "common.close": "Cerrar", "common.optional": "opcional",
      "common.today": "Hoy", "common.tomorrow": "Mañana",
      "err.subjectName": "Escribe un nombre para la materia.",
      "err.taskTitle": "Escribe un título para la tarea.",
      "err.profName": "El nombre no puede estar vacío.",
      "err.badEmail": "Introduce un email válido.",

      "landing.signin": "Iniciar sesión", "landing.badge": "Estudio con inteligencia",
      "landing.title": "Sabe qué estudiar antes de que abras el libro.",
      "landing.sub": "Sube tu material. Zynqora lo entiende, crea tu contenido de estudio y te dice exactamente qué repasar hoy.",
      "landing.cta": "Empezar gratis", "landing.demo": "Ver demo",
      "landing.note": "Sin tarjeta. Web, iOS y Android con una sola cuenta.",
      "landing.f1t": "De tu material", "landing.f1d": "PDFs, apuntes, fotos y texto se convierten en material estructurado.",
      "landing.f2t": "Repetición espaciada", "landing.f2d": "El sistema decide cuándo repasar cada concepto.",
      "landing.f3t": "Enfoque diario", "landing.f3d": "Una recomendación clara cada día, no un panel de cifras.",
      "landing.footer": "© 2026 Zynqora · Prototipo de diseño",

      "ob.step": "Paso {n} de {total}", "ob.nameLabel": "Nombre de la materia",
      "ob.welcomeTitle": "Bienvenido a Zynqora", "ob.welcomeSub": "Vamos a personalizar tu experiencia. Nos llevará menos de un minuto.",
      "ob.welcomeStart": "Comenzar",
      "ob.qHow": "¿Cómo conociste Zynqora?",
      "ob.howFriend": "Un amigo", "ob.howTiktok": "TikTok", "ob.howInsta": "Instagram", "ob.howYoutube": "YouTube",
      "ob.howGoogle": "Google / Internet", "ob.howOther": "Otra forma",
      "ob.qGoal": "¿Qué quieres conseguir con Zynqora?", "ob.qGoalSub": "Puedes elegir varias.",
      "ob.goalGrades": "Mejorar mis notas", "ob.goalOrganise": "Organizar mejor mi estudio", "ob.goalExams": "Preparar exámenes",
      "ob.goalUnderstand": "Entender mejor mis asignaturas", "ob.goalTime": "Ahorrar tiempo estudiando", "ob.goalHabit": "Crear un hábito de estudio",
      "ob.qLevel": "¿Qué estudias?",
      "ob.lvlEso": "ESO", "ob.lvlBach": "Bachillerato", "ob.lvlUniv": "Universidad", "ob.lvlFp": "Formación profesional", "ob.lvlOtro": "Otro",
      "ob.qFirst": "¿Qué quieres estudiar primero?", "ob.qFirstSub": "Elige una materia o crea una nueva.",
      "ob.createNew": "Crear una materia nueva", "ob.newNamePh": "Nombre de la materia",
      "ob.readyTitle": "Perfecto. Zynqora está lista para ti.", "ob.readySub": "Ya puedes empezar a estudiar de forma más inteligente.",
      "ob.readyStart": "Empezar",

      "greet.morning": "Buenos días", "greet.afternoon": "Buenas tardes", "greet.evening": "Buenas noches",

      "dash.nextStep": "Tu siguiente paso", "dash.reason": "Basado en lo que necesitas reforzar.",
      "dash.reviewTopic": "Repasar {topic}", "dash.studyWeak": "Estudiar {topic}",
      "dash.startSession": "Empezar", "dash.estimated": "{n} min estimados",
      "dash.reviews": "repasos", "dash.weak": "conceptos débiles", "dash.streak": "días de racha",
      "dash.todayProgress": "Progreso de hoy", "dash.goalLeft": "Te faltan {n} min para tu objetivo.",
      "dash.goalDone": "Objetivo de hoy alcanzado. Buen trabajo.",
      "dash.upcoming": "Próximas tareas", "dash.nextExam": "Próximo examen", "dash.inDays": "en {n} días",
      "dash.weakTitle": "Conceptos que necesitan refuerzo",
      "dash.lastTest": "Último test", "dash.lastTestSub": "{score}/{total} en {topic}",
      "dash.askAiCard": "Pregunta a Zynqora AI sobre lo que estás estudiando.",
      "dash.open": "Abrir", "dash.prepPlan": "¿Quieres que Zynqora te prepare un plan?",
      "dash.seePlan": "Ver plan recomendado",

      "subjects.title": "Mis materias", "subjects.add": "Añadir materia", "subjects.switchTo": "Cambiar de materia",
      "subjects.docs": "documentos", "subjects.doc1": "documento", "subjects.mastery": "{n}% de dominio", "subjects.empty": "Sin materias",
      "subjects.emptySub": "Crea tu primera materia para empezar a organizar tu estudio.",
      "subjects.newTitle": "Nueva materia", "subjects.newSub": "Dale un nombre, un icono y un color.",
      "subjects.icon": "Icono", "subjects.color": "Color", "subjects.namePlaceholder": "Historia",

      "subject.overall": "Dominio general",
      "tab.docs": "Documentos", "tab.flashcards": "Flashcards", "tab.tests": "Tests", "tab.progress": "Progreso", "tab.weak": "Débiles",
      "subject.noDocs": "Aún no hay documentos en esta materia.", "subject.addMaterial": "Añadir material",
      "subject.studyNow": "Estudiar ahora", "subject.startTest": "Hacer un test", "subject.reviewCards": "Repasar flashcards",
      "subject.cardsCount": "{n} flashcards", "subject.testsCount": "{n} tests realizados",
      "subject.weakList": "Conceptos débiles de esta materia", "subject.noWeak": "No hay conceptos débiles detectados.",
      "subject.sessions": "Sesiones de estudio", "subject.lastSession": "Última sesión: hace {n} días",

      "notes.title": "Mis apuntes", "notes.addMaterial": "Añadir material",
      "notes.sub": "Todo tu material de estudio, organizado por materia.",
      "notes.docsIn": "en {subject}", "notes.pages": "páginas", "notes.ready": "Listo", "notes.analyzing": "Analizando",
      "notes.open": "Abrir", "notes.askAi": "Preguntar a Zynqora AI",
      "notes.emptyTitle": "Aún no has añadido material",
      "notes.emptySub": "Sube un PDF, un documento, una foto o escribe una nota. Zynqora lo convertirá en material de estudio.",

      "add.title": "Añadir material", "add.sub": "¿Qué tipo de material quieres añadir a {subject}?",
      "add.pdf": "PDF", "add.pdfSub": "Apuntes, temario o esquemas en PDF",
      "add.doc": "Documento", "add.docSub": "Word, Google Docs o similar",
      "add.image": "Imagen o foto", "add.imageSub": "Foto de apuntes o pizarra",
      "add.text": "Texto", "add.textSub": "Escribe o pega tus notas",
      "add.sourceTitle": "Elige el archivo", "add.sourceSub": "Selecciona un archivo o usa un ejemplo",
      "add.choose": "Seleccionar archivo", "add.example": "Usar documento de ejemplo",
      "add.exampleNote": "El prototipo no procesa archivos reales. Usa el ejemplo para ver el flujo completo.",
      "add.selected": "Seleccionado", "add.analyze": "Analizar material", "add.remove": "Quitar",
      "add.textPlaceholder": "Escribe o pega aquí tus apuntes…", "add.demoFileNote": "Simulado — no se sube ni se lee ningún contenido real.",

      "analysis.title": "Análisis", "analysis.working": "Analizando material…",
      "analysis.s1": "Leyendo el documento", "analysis.s2": "Identificando el contenido",
      "analysis.s3": "Detectando conceptos importantes", "analysis.s4": "Localizando áreas que necesitan refuerzo",
      "analysis.readyTitle": "Tu material está listo",
      "analysis.readySub": "Zynqora ha entendido tu material y ha preparado el contenido de estudio.",
      "analysis.mConcepts": "conceptos detectados", "analysis.mDifficulty": "dificultad estimada",
      "analysis.mTopics": "temas principales", "analysis.mReadTime": "min de lectura",
      "analysis.mainConcepts": "Conceptos importantes", "analysis.weakAreas": "Áreas que necesitan refuerzo",
      "analysis.viewSummary": "Ver resumen", "analysis.makeFlashcards": "Crear flashcards",
      "analysis.makeTest": "Crear test", "analysis.makeSession": "Crear sesión de estudio", "analysis.askAi": "Preguntar a Zynqora AI",
      "diff.easy": "Baja", "diff.med": "Media", "diff.hard": "Alta",

      "document.title": "Material", "document.summary": "Resumen", "document.readFull": "Leer resumen completo",
      "document.structured": "Contenido estructurado", "document.generated": "Material generado",
      "document.study": "Estudiar esto", "document.createSession": "Crear sesión de estudio",
      "document.flashcardsN": "{n} flashcards", "document.questionsN": "{n} preguntas", "document.summaryN": "1 resumen",
      "document.ready": "Listas para estudiar", "document.aiAnalysis": "Análisis de Zynqora", "document.askAi": "Preguntar a Zynqora AI sobre este material",

      "doc.status.pending": "Pendiente", "doc.status.processing": "Procesando", "doc.status.analyzed": "Analizado", "doc.status.failed": "No se pudo analizar",
      "doc.realBadge": "Contenido del archivo real", "doc.localBadge": "Generado localmente del texto real", "doc.exampleBadge": "Contenido de ejemplo",
      "doc.wordsN": "{n} palabras", "doc.charsN": "{n} caracteres", "doc.noText": "Sin texto extraído",
      "doc.detailTitle": "Documento", "doc.meta.type": "Tipo", "doc.meta.size": "Tamaño", "doc.meta.date": "Fecha", "doc.meta.subject": "Materia", "doc.meta.status": "Estado", "doc.meta.source": "Origen del texto",
      "doc.content": "Contenido extraído", "doc.contentMore": "Ver todo el texto", "doc.contentLess": "Ver menos",
      "doc.summarySection": "Resumen", "doc.conceptsSection": "Conceptos principales", "doc.keyPoints": "Puntos importantes",
      "doc.changeSubject": "Cambiar materia", "doc.startReview": "Empezar repaso", "doc.delete": "Eliminar documento",
      "doc.deleteQ": "¿Eliminar este documento?", "doc.deleteSub": "Se borrarán también su resumen, flashcards y sesiones. No afecta a otros documentos.",
      "doc.deleted": "Documento eliminado", "doc.genSummary": "Generar resumen", "doc.regen": "Regenerar",
      "doc.ocrPending": "Imagen guardada — el texto se leerá con OCR al conectar el backend.",
      "doc.attach": "Adjuntar a Zynqora AI", "doc.fromDoc": "Basado en: {name}",
      "an.reading": "Leyendo el archivo", "an.extracting": "Extrayendo el contenido", "an.analyzing": "Analizando el texto", "an.preparing": "Preparando tu material",
      "an.failedTitle": "No se pudo leer el contenido", "an.pendingTitle": "Imagen guardada",
      "an.textOk": "Texto extraído · {n} palabras", "an.keepAnyway": "Guardar de todas formas",
      "add.chooseSub": "Arrastra un archivo aquí o selecciónalo. TXT y PDF se leen en el navegador; imágenes se guardan para OCR.",
      "add.dropHere": "Suelta el archivo", "add.pasteReal": "El texto que pegues se lee y se usa de verdad.",

      "study.title": "Sesión de estudio", "study.recommended": "Recomendado para hoy",
      "study.about": "Unos {n} minutos", "study.includes": "Incluye",
      "study.bReviews": "{n} flashcards de repaso", "study.bQuestions": "{n} preguntas nuevas", "study.bSummary": "1 resumen del tema",
      "study.why": "Por qué esta sesión",
      "study.begin": "Empezar sesión", "study.customize": "Personalizar",
      "study.allClearTitle": "Todo al día", "study.allClearSub": "No tienes repasos pendientes en esta materia.",
      "study.doTest": "Hacer un test",

      "fc.title": "Flashcards", "fc.showAnswer": "Ver respuesta", "fc.answer": "Respuesta",
      "fc.tapHint": "Pulsa para ver la respuesta", "fc.again": "Necesito repasarlo", "fc.known": "Lo sabía",
      "fc.dontGetIt": "No lo entiendo", "fc.explainAi": "Explicar con Zynqora AI",
      "fc.doneTitle": "Repaso completado", "fc.doneSub": "{known} de {total} sabidas · {again} para repasar pronto",
      "fc.toTest": "Continuar con el test", "fc.toDash": "Volver al panel",

      "test.title": "Test", "test.pick": "Elige una opción", "test.correct": "Correcto", "test.incorrect": "No exactamente",
      "test.next": "Siguiente", "test.finish": "Ver resultados", "test.whyFailed": "¿Por qué he fallado? Preguntar a Zynqora AI",

      "results.title": "Resultados", "results.score": "puntuación", "results.questions": "preguntas",
      "results.correct": "correctas", "results.incorrect": "incorrectas",
      "results.mastered": "Conceptos dominados", "results.weak": "Conceptos débiles",
      "results.understandErrors": "¿Quieres entender tus errores?", "results.askAi": "Preguntar a Zynqora AI",
      "results.whatNow": "¿Qué debería estudiar ahora?", "results.seeRec": "Ver recomendación",
      "results.backPanel": "Volver al panel",

      "progress.title": "Progreso", "progress.overall": "General", "progress.thisSubject": "Esta materia",
      "progress.studyMinutes": "Minutos de estudio", "progress.last14": "Últimos 14 días",
      "progress.twoWeeksAgo": "Hace 2 sem", "progress.today": "Hoy",
      "progress.thisWeek": "esta semana", "progress.currentStreak": "racha", "progress.avgMastery": "dominio medio",
      "progress.sessions": "Sesiones", "progress.sessionsSub": "{n} sesiones en 14 días",
      "progress.bySubject": "Por materia", "progress.concepts": "Dominio de conceptos", "progress.reinforce": "Reforzar",

      "cal.title": "Calendario", "cal.addTask": "Añadir tarea", "cal.noTasks": "Sin tareas este día.",
      "cal.tasksFor": "Tareas · {date}", "cal.newTask": "Nueva tarea", "cal.taskTitle": "Título",
      "cal.subject": "Materia", "cal.type": "Tipo", "cal.date": "Fecha", "cal.time": "Hora",
      "cal.typeExercise": "Ejercicio", "cal.typeReview": "Repaso", "cal.typeStudy": "Estudio", "cal.typeExam": "Examen",
      "cal.taskDetail": "Detalle de la tarea", "cal.markDone": "Marcar como hecha", "cal.done": "Hecha",
      "cal.markUndone": "Marcar como pendiente",
      "cal.desc": "Descripción", "cal.descPh": "Detalles, temas a cubrir…", "cal.descOpt": "Descripción (opcional)",
      "cal.editTask": "Editar tarea", "cal.edit": "Editar", "cal.delete": "Eliminar",
      "cal.deleteConfirm": "¿Eliminar esta tarea? No se puede deshacer.",
      "cal.taskDeleted": "Tarea eliminada",
      "cal.prepPlanQ": "Tienes un examen el {day}. ¿Quieres que Zynqora te prepare un plan?",
      "cal.prepPlan": "Preparar plan con Zynqora",

      "plan.title": "Plan recomendado", "plan.for": "Para: {exam}",
      "plan.intro": "Zynqora ha repartido el estudio en los días que faltan para tu examen.",
      "plan.addToCalendar": "Añadir el plan al calendario", "plan.added": "Plan añadido a tu calendario",
      "plan.mon": "Lun", "plan.tue": "Mar", "plan.wed": "Mié", "plan.thu": "Jue", "plan.fri": "Vie",

      "ai.title": "Zynqora AI", "ai.subtitle": "Tu compañero de estudio",
      "ai.placeholder": "Pregunta sobre lo que estás estudiando…",
      "ai.demoNote": "Respuestas simuladas para el prototipo. Aquí se conectará el sistema de IA real.",
      "ai.newConv": "Nuevo chat", "ai.yourConvs": "Tus conversaciones", "ai.noConvs": "Aún no hay conversaciones.",
      "ai.deleteConv": "Eliminar conversación", "ai.deleteConvQ": "¿Eliminar esta conversación?",
      "ai.deleteConvSub": "Se borrará para siempre.", "ai.convDeleted": "Conversación eliminada",
      "ai.ctxSubject": "Contexto: {subject}", "ai.ctxDoc": "Contexto: {doc}",
      "ai.ctxSubjectDoc": "Contexto: {subject} · {doc}",
      "ai.ctxFlashcard": "Contexto: flashcard · {t}", "ai.ctxTest": "Contexto: pregunta fallada",
      "ai.ctxResult": "Contexto: tu último test de {subject}",
      "ai.attach": "Adjuntar", "ai.attachPdf": "PDF", "ai.attachDoc": "Documento", "ai.attachImage": "Imagen / foto",
      "ai.ctxAdded": "Contexto añadido: {name}", "ai.usingContext": "He añadido {name} al contexto de esta conversación.",
      "ai.sugExplain": "Explícame este concepto", "ai.sugSimple": "Explícamelo de forma sencilla",
      "ai.sugExample": "Ponme un ejemplo", "ai.sugCompare": "Compara dos ideas de este tema",
      "ai.sugQuiz": "Pregúntame para comprobar si lo he entendido",
      "ai.sugWhyFailed": "¿Por qué he fallado esta pregunta?", "ai.sugSummarize": "Resume mis apuntes",
      "ai.sugImprove": "¿Cómo puedo mejorar?", "ai.backToConvs": "Conversaciones",
      "ai.ctxLabel": "Contexto", "ai.ctxNone": "Sin contexto",
      "ai.tSimple": "Explícamelo más fácil", "ai.tExample": "Ponme un ejemplo", "ai.tQuiz": "Hazme una pregunta", "ai.tDeeper": "Profundiza",
      "ai.fAnother": "Otro ejercicio", "ai.fHarder": "Más difícil", "ai.fEasier": "Más fácil", "ai.fCorrect": "Corrígeme",

      "settings.title": "Configuración", "settings.language": "Idioma", "settings.theme": "Tema",
      "settings.themeLight": "Claro", "settings.themeDark": "Oscuro", "settings.themeAuto": "Sistema",
      "settings.accent": "Color de acento",
      "accent.violet": "Violeta", "accent.blue": "Azul", "accent.green": "Verde", "accent.pink": "Rosa", "accent.orange": "Naranja",
      "premium.title": "Zynqora Premium", "premium.sub": "Estudia sin límites.",
      "premium.f1t": "IA sin límites", "premium.f1d": "Genera todo el resumen, flashcards y tests que necesites.",
      "premium.f2t": "Planes de examen", "premium.f2d": "Zynqora organiza tu estudio día a día.",
      "premium.f3t": "Estadísticas avanzadas", "premium.f3d": "Analiza tu progreso y tus puntos débiles a fondo.",
      "premium.f4t": "Sin anuncios", "premium.f4d": "Una experiencia limpia y enfocada.",
      "premium.cta": "Probar Premium",
      "study.pTitle": "Personalizar sesión", "study.pSub": "Ajusta esta sesión de estudio.",
      "study.pMore": "Más flashcards", "study.pShorter": "Sesión más corta", "study.pTest": "Incluir test al final",
      "study.pApply": "Aplicar cambios",
      "path.title": "Tu camino de estudio", "path.sub": "Cuatro pasos para dominar {topic}.",
      "path.n1t": "Repasa", "path.n1s": "{topic}", "path.n2t": "Practica", "path.n2s": "Conceptos clave",
      "path.n3t": "Comprueba", "path.n3s": "Test rápido", "path.n4t": "Domina", "path.n4s": "Repaso final",
      "path.start": "Continuar el camino", "path.done": "¡Camino completado!", "path.step": "Paso {n} de 4",
      "mode.title": "¿Cómo quieres repasar?", "mode.sub": "Elige la forma de estudiar {topic} hoy.", "mode.rec": "Recomendado",
      "mode.flashcards": "Flashcards", "mode.flashcardsS": "Pregunta y respuesta",
      "mode.test": "Test", "mode.testS": "Opción múltiple con feedback",
      "mode.fill": "Completa la palabra", "mode.fillS": "Rellena el hueco de la frase",
      "mode.match": "Relaciona conceptos", "mode.matchS": "Une cada término con su definición",
      "mode.explain": "Explica con tus palabras", "mode.explainS": "Cuéntaselo a Zynqora AI",
      "mode.identify": "Identifica el concepto", "mode.identifyS": "¿A qué idea se refiere?",
      "fib.title": "Completa la palabra", "fib.check": "Comprobar", "fib.next": "Siguiente", "fib.finish": "Terminar",
      "fib.correct": "¡Correcto!", "fib.wrong": "Casi. La respuesta era: {a}",
      "rm.matchTitle": "Relaciona cada concepto con su definición", "rm.identifyTitle": "¿A qué concepto se refiere esta descripción?",
      "rm.explainTitle": "Explícalo con tus palabras", "rm.explainPh": "Escribe tu explicación de {c}…", "rm.explainSend": "Enviar a Zynqora AI",
      "rm.done": "Ejercicio completado", "rm.back": "Volver al camino",
      "streak.title": "¡Racha de {n} días!", "streak.sub": "Sigue así mañana para no perderla.",
      "profile.editPhoto": "Editar perfil", "profile.photoTitle": "Foto de perfil", "profile.photoSub": "Elige una imagen o un color.",
      "profile.choosePhoto": "Elegir imagen", "profile.photoSaved": "Foto actualizada",
      "profile.editTitle": "Editar perfil", "profile.editSub": "Tu nombre y foto se guardan en este dispositivo.",
      "profile.nameLabel": "Nombre", "profile.emailLabel": "Email",
      "profile.emailNote": "El email se sustituye al iniciar sesión con una cuenta real.",
      "profile.photoSection": "Foto", "profile.saved": "Perfil actualizado",
      "settings.notifications": "Notificaciones", "settings.notifOn": "Activadas", "settings.notifOff": "Desactivadas",
      "settings.study": "Preferencias de estudio", "settings.dailyGoal": "Objetivo diario",
      "settings.sessionLength": "Duración de sesión", "settings.short": "Corta", "settings.balanced": "Equilibrada", "settings.long": "Larga",
      "settings.reminders": "Recordatorio de estudio", "settings.remindersVal": "Todos los días · 18:00",
      "settings.reminderTime": "Hora del recordatorio",
      "settings.reminderNote": "El ajuste se guarda. El prototipo aún no envía notificaciones push.",
      "settings.account": "Cuenta", "settings.signout": "Cerrar sesión", "settings.deleteAccount": "Eliminar cuenta",
      "settings.wipeConfirm": "¿Eliminar todos tus datos de este dispositivo? Materias, chats, calendario y progreso se borrarán. No se puede deshacer.",
      "settings.wipeDone": "Datos eliminados",
      "settings.version": "Zynqora · versión de prototipo", "settings.plan": "Plan", "settings.planFree": "Gratis",

      "states.firstTitle": "Aún no hay nada que estudiar",
      "states.firstSub": "Añade tu primer material y Zynqora preparará tu plan de estudio en menos de un minuto.",
      "states.howItWorks": "Cómo funciona",
      "states.hiw1t": "Añade tu material", "states.hiw1d": "PDF, documento, foto o texto",
      "states.hiw2t": "Zynqora lo entiende", "states.hiw2d": "Resumen, flashcards y preguntas",
      "states.hiw3t": "Estudia con foco", "states.hiw3d": "Te decimos qué repasar cada día",
      "states.errorTitle": "No se pudo cargar tu panel",
      "states.errorSub": "Comprueba tu conexión. Tus datos están a salvo.", "states.retry": "Reintentar"
    },
    en: {
      "proto.mobile": "Mobile", "proto.tablet": "Tablet", "proto.desktop": "Desktop",
      "proto.screens": "Screens", "proto.hide": "Hide", "proto.reveal": "Show controls",
      "proto.demoNote": "Prototype · simulated data, no real connection",

      "menu.welcome": "Welcome", "menu.app": "Application", "menu.states": "States",
      "menu.landing": "Landing", "menu.onboarding": "Onboarding", "menu.dashboard": "Dashboard · Today",
      "menu.subjects": "My subjects", "menu.subject": "Subject detail", "menu.notes": "My notes",
      "menu.addMaterial": "Add material", "menu.analysis": "Material analysis",
      "menu.document": "Document material", "menu.path": "Study path", "menu.study": "Review modes", "menu.fill": "Fill the word",
      "menu.flashcards": "Flashcards", "menu.test": "Test", "menu.results": "Results",
      "menu.progress": "Progress", "menu.calendar": "Calendar", "menu.plan": "Recommended plan",
      "menu.ai": "Zynqora AI", "menu.settings": "Settings",
      "menu.stFirst": "Dashboard · first time", "menu.stEmptyNotes": "Notes · empty",
      "menu.stAllclear": "Study · nothing due", "menu.stError": "Connection error",

      "nav.today": "Today", "nav.subjects": "Subjects", "nav.notes": "Notes",
      "nav.calendar": "Calendar", "nav.progress": "Progress", "nav.profile": "Profile", "nav.ai": "Zynqora AI",

      "common.continue": "Continue", "common.back": "Back", "common.next": "Next",
      "common.prev": "Previous", "common.skip": "Skip", "common.save": "Save", "common.cancel": "Cancel",
      "common.add": "Add", "common.min": "min", "common.minutes": "minutes", "common.seeAll": "See all",
      "common.demoAction": "Demo action", "common.close": "Close", "common.optional": "optional",
      "common.today": "Today", "common.tomorrow": "Tomorrow",
      "err.subjectName": "Enter a name for the subject.",
      "err.taskTitle": "Enter a title for the task.",
      "err.profName": "Name can't be empty.",
      "err.badEmail": "Enter a valid email.",

      "landing.signin": "Sign in", "landing.badge": "Studying, with intelligence",
      "landing.title": "It knows what to study before you open the book.",
      "landing.sub": "Upload your material. Zynqora understands it, builds your study content and tells you exactly what to review today.",
      "landing.cta": "Start free", "landing.demo": "See demo",
      "landing.note": "No card. Web, iOS and Android with one account.",
      "landing.f1t": "From your material", "landing.f1d": "PDFs, notes, photos and text become structured study material.",
      "landing.f2t": "Spaced repetition", "landing.f2d": "The system decides when to review each concept.",
      "landing.f3t": "Daily focus", "landing.f3d": "One clear recommendation each day, not a wall of numbers.",
      "landing.footer": "© 2026 Zynqora · Design prototype",

      "ob.step": "Step {n} of {total}", "ob.nameLabel": "Subject name",
      "ob.welcomeTitle": "Welcome to Zynqora", "ob.welcomeSub": "Let's personalise your experience. It takes less than a minute.",
      "ob.welcomeStart": "Get started",
      "ob.qHow": "How did you hear about Zynqora?",
      "ob.howFriend": "A friend", "ob.howTiktok": "TikTok", "ob.howInsta": "Instagram", "ob.howYoutube": "YouTube",
      "ob.howGoogle": "Google / Internet", "ob.howOther": "Another way",
      "ob.qGoal": "What do you want to achieve with Zynqora?", "ob.qGoalSub": "You can pick several.",
      "ob.goalGrades": "Improve my grades", "ob.goalOrganise": "Organise my study better", "ob.goalExams": "Prepare for exams",
      "ob.goalUnderstand": "Understand my subjects better", "ob.goalTime": "Save time studying", "ob.goalHabit": "Build a study habit",
      "ob.qLevel": "What are you studying?",
      "ob.lvlEso": "Secondary", "ob.lvlBach": "High school", "ob.lvlUniv": "University", "ob.lvlFp": "Vocational training", "ob.lvlOtro": "Other",
      "ob.qFirst": "What do you want to study first?", "ob.qFirstSub": "Pick a subject or create a new one.",
      "ob.createNew": "Create a new subject", "ob.newNamePh": "Subject name",
      "ob.readyTitle": "Perfect. Zynqora is ready for you.", "ob.readySub": "You can now start studying more intelligently.",
      "ob.readyStart": "Start",

      "greet.morning": "Good morning", "greet.afternoon": "Good afternoon", "greet.evening": "Good evening",

      "dash.nextStep": "Your next step", "dash.reason": "Based on what you need to reinforce.",
      "dash.reviewTopic": "Review {topic}", "dash.studyWeak": "Study {topic}",
      "dash.startSession": "Start", "dash.estimated": "{n} min estimated",
      "dash.reviews": "reviews", "dash.weak": "weak concepts", "dash.streak": "day streak",
      "dash.todayProgress": "Today's progress", "dash.goalLeft": "{n} min left to reach your goal.",
      "dash.goalDone": "Today's goal reached. Nice work.",
      "dash.upcoming": "Upcoming tasks", "dash.nextExam": "Next exam", "dash.inDays": "in {n} days",
      "dash.weakTitle": "Concepts that need reinforcement",
      "dash.lastTest": "Last test", "dash.lastTestSub": "{score}/{total} on {topic}",
      "dash.askAiCard": "Ask Zynqora AI about what you're studying.",
      "dash.open": "Open", "dash.prepPlan": "Want Zynqora to prepare a plan for you?",
      "dash.seePlan": "See recommended plan",

      "subjects.title": "My subjects", "subjects.add": "Add subject", "subjects.switchTo": "Switch subject",
      "subjects.docs": "documents", "subjects.doc1": "document", "subjects.mastery": "{n}% mastery", "subjects.empty": "No subjects",
      "subjects.emptySub": "Create your first subject to start organising your study.",
      "subjects.newTitle": "New subject", "subjects.newSub": "Give it a name, an icon and a colour.",
      "subjects.icon": "Icon", "subjects.color": "Colour", "subjects.namePlaceholder": "History",

      "subject.overall": "Overall mastery",
      "tab.docs": "Documents", "tab.flashcards": "Flashcards", "tab.tests": "Tests", "tab.progress": "Progress", "tab.weak": "Weak spots",
      "subject.noDocs": "No documents in this subject yet.", "subject.addMaterial": "Add material",
      "subject.studyNow": "Study now", "subject.startTest": "Take a test", "subject.reviewCards": "Review flashcards",
      "subject.cardsCount": "{n} flashcards", "subject.testsCount": "{n} tests taken",
      "subject.weakList": "Weak concepts in this subject", "subject.noWeak": "No weak concepts detected.",
      "subject.sessions": "Study sessions", "subject.lastSession": "Last session: {n} days ago",

      "notes.title": "My notes", "notes.addMaterial": "Add material",
      "notes.sub": "All your study material, organised by subject.",
      "notes.docsIn": "in {subject}", "notes.pages": "pages", "notes.ready": "Ready", "notes.analyzing": "Analysing",
      "notes.open": "Open", "notes.askAi": "Ask Zynqora AI",
      "notes.emptyTitle": "You haven't added material yet",
      "notes.emptySub": "Upload a PDF, a document, a photo or write a note. Zynqora will turn it into study material.",

      "add.title": "Add material", "add.sub": "What kind of material do you want to add to {subject}?",
      "add.pdf": "PDF", "add.pdfSub": "Notes, syllabus or outlines as PDF",
      "add.doc": "Document", "add.docSub": "Word, Google Docs or similar",
      "add.image": "Image or photo", "add.imageSub": "Photo of notes or whiteboard",
      "add.text": "Text", "add.textSub": "Type or paste your notes",
      "add.sourceTitle": "Choose the file", "add.sourceSub": "Select a file or use an example",
      "add.choose": "Select file", "add.example": "Use example document",
      "add.exampleNote": "The prototype doesn't process real files. Use the example to see the full flow.",
      "add.selected": "Selected", "add.analyze": "Analyse material", "add.remove": "Remove",
      "add.textPlaceholder": "Type or paste your notes here…", "add.demoFileNote": "Simulated — nothing is uploaded or read.",

      "analysis.title": "Analysis", "analysis.working": "Analysing material…",
      "analysis.s1": "Reading the document", "analysis.s2": "Identifying the content",
      "analysis.s3": "Detecting key concepts", "analysis.s4": "Finding areas that need reinforcement",
      "analysis.readyTitle": "Your material is ready",
      "analysis.readySub": "Zynqora has understood your material and prepared the study content.",
      "analysis.mConcepts": "concepts detected", "analysis.mDifficulty": "estimated difficulty",
      "analysis.mTopics": "main topics", "analysis.mReadTime": "min read",
      "analysis.mainConcepts": "Key concepts", "analysis.weakAreas": "Areas that need reinforcement",
      "analysis.viewSummary": "View summary", "analysis.makeFlashcards": "Create flashcards",
      "analysis.makeTest": "Create test", "analysis.makeSession": "Create study session", "analysis.askAi": "Ask Zynqora AI",
      "diff.easy": "Low", "diff.med": "Medium", "diff.hard": "High",

      "document.title": "Material", "document.summary": "Summary", "document.readFull": "Read full summary",
      "document.structured": "Structured content", "document.generated": "Generated material",
      "document.study": "Study this", "document.createSession": "Create study session",
      "document.flashcardsN": "{n} flashcards", "document.questionsN": "{n} questions", "document.summaryN": "1 summary",
      "document.ready": "Ready to study", "document.aiAnalysis": "Zynqora analysis", "document.askAi": "Ask Zynqora AI about this material",

      "doc.status.pending": "Pending", "doc.status.processing": "Processing", "doc.status.analyzed": "Analysed", "doc.status.failed": "Couldn't analyse",
      "doc.realBadge": "Real file content", "doc.localBadge": "Generated locally from the real text", "doc.exampleBadge": "Example content",
      "doc.wordsN": "{n} words", "doc.charsN": "{n} characters", "doc.noText": "No text extracted",
      "doc.detailTitle": "Document", "doc.meta.type": "Type", "doc.meta.size": "Size", "doc.meta.date": "Date", "doc.meta.subject": "Subject", "doc.meta.status": "Status", "doc.meta.source": "Text source",
      "doc.content": "Extracted content", "doc.contentMore": "Show all text", "doc.contentLess": "Show less",
      "doc.summarySection": "Summary", "doc.conceptsSection": "Key concepts", "doc.keyPoints": "Important points",
      "doc.changeSubject": "Change subject", "doc.startReview": "Start review", "doc.delete": "Delete document",
      "doc.deleteQ": "Delete this document?", "doc.deleteSub": "Its summary, flashcards and sessions will be removed too. Other documents are unaffected.",
      "doc.deleted": "Document deleted", "doc.genSummary": "Generate summary", "doc.regen": "Regenerate",
      "doc.ocrPending": "Image saved — the text will be read via OCR once the backend is connected.",
      "doc.attach": "Attach to Zynqora AI", "doc.fromDoc": "Based on: {name}",
      "an.reading": "Reading the file", "an.extracting": "Extracting the content", "an.analyzing": "Analysing the text", "an.preparing": "Preparing your material",
      "an.failedTitle": "Couldn't read the content", "an.pendingTitle": "Image saved",
      "an.textOk": "Text extracted · {n} words", "an.keepAnyway": "Keep it anyway",
      "add.chooseSub": "Drag a file here or select it. TXT and PDF are read in the browser; images are saved for OCR.",
      "add.dropHere": "Drop the file", "add.pasteReal": "The text you paste is read and actually used.",

      "study.title": "Study session", "study.recommended": "Recommended for today",
      "study.about": "About {n} minutes", "study.includes": "Includes",
      "study.bReviews": "{n} review flashcards", "study.bQuestions": "{n} new questions", "study.bSummary": "1 topic summary",
      "study.why": "Why this session",
      "study.begin": "Start session", "study.customize": "Customise",
      "study.allClearTitle": "All caught up", "study.allClearSub": "Nothing due for review in this subject.",
      "study.doTest": "Take a test",

      "fc.title": "Flashcards", "fc.showAnswer": "Show answer", "fc.answer": "Answer",
      "fc.tapHint": "Tap to reveal the answer", "fc.again": "Need to review", "fc.known": "I knew it",
      "fc.dontGetIt": "I don't get it", "fc.explainAi": "Explain with Zynqora AI",
      "fc.doneTitle": "Review complete", "fc.doneSub": "{known} of {total} known · {again} to review soon",
      "fc.toTest": "Continue with the test", "fc.toDash": "Back to dashboard",

      "test.title": "Test", "test.pick": "Choose an option", "test.correct": "Correct", "test.incorrect": "Not quite",
      "test.next": "Next", "test.finish": "See results", "test.whyFailed": "Why did I get this wrong? Ask Zynqora AI",

      "results.title": "Results", "results.score": "score", "results.questions": "questions",
      "results.correct": "correct", "results.incorrect": "incorrect",
      "results.mastered": "Mastered concepts", "results.weak": "Weak concepts",
      "results.understandErrors": "Want to understand your mistakes?", "results.askAi": "Ask Zynqora AI",
      "results.whatNow": "What should I study now?", "results.seeRec": "See recommendation",
      "results.backPanel": "Back to dashboard",

      "progress.title": "Progress", "progress.overall": "Overall", "progress.thisSubject": "This subject",
      "progress.studyMinutes": "Study minutes", "progress.last14": "Last 14 days",
      "progress.twoWeeksAgo": "2 wks ago", "progress.today": "Today",
      "progress.thisWeek": "this week", "progress.currentStreak": "streak", "progress.avgMastery": "avg mastery",
      "progress.sessions": "Sessions", "progress.sessionsSub": "{n} sessions in 14 days",
      "progress.bySubject": "By subject", "progress.concepts": "Concept mastery", "progress.reinforce": "Reinforce",

      "cal.title": "Calendar", "cal.addTask": "Add task", "cal.noTasks": "No tasks this day.",
      "cal.tasksFor": "Tasks · {date}", "cal.newTask": "New task", "cal.taskTitle": "Title",
      "cal.subject": "Subject", "cal.type": "Type", "cal.date": "Date", "cal.time": "Time",
      "cal.typeExercise": "Exercise", "cal.typeReview": "Review", "cal.typeStudy": "Study", "cal.typeExam": "Exam",
      "cal.taskDetail": "Task detail", "cal.markDone": "Mark as done", "cal.done": "Done",
      "cal.markUndone": "Mark as pending",
      "cal.desc": "Description", "cal.descPh": "Details, topics to cover…", "cal.descOpt": "Description (optional)",
      "cal.editTask": "Edit task", "cal.edit": "Edit", "cal.delete": "Delete",
      "cal.deleteConfirm": "Delete this task? This can't be undone.",
      "cal.taskDeleted": "Task deleted",
      "cal.prepPlanQ": "You have an exam on {day}. Want Zynqora to prepare a plan?",
      "cal.prepPlan": "Prepare plan with Zynqora",

      "plan.title": "Recommended plan", "plan.for": "For: {exam}",
      "plan.intro": "Zynqora has spread the study across the days left before your exam.",
      "plan.addToCalendar": "Add plan to calendar", "plan.added": "Plan added to your calendar",
      "plan.mon": "Mon", "plan.tue": "Tue", "plan.wed": "Wed", "plan.thu": "Thu", "plan.fri": "Fri",

      "ai.title": "Zynqora AI", "ai.subtitle": "Your study companion",
      "ai.placeholder": "Ask about what you're studying…",
      "ai.demoNote": "Simulated answers for the prototype. The real AI system plugs in here.",
      "ai.newConv": "New chat", "ai.yourConvs": "Your conversations", "ai.noConvs": "No conversations yet.",
      "ai.deleteConv": "Delete conversation", "ai.deleteConvQ": "Delete this conversation?",
      "ai.deleteConvSub": "It will be gone for good.", "ai.convDeleted": "Conversation deleted",
      "ai.ctxSubject": "Context: {subject}", "ai.ctxDoc": "Context: {doc}",
      "ai.ctxSubjectDoc": "Context: {subject} · {doc}",
      "ai.ctxFlashcard": "Context: flashcard · {t}", "ai.ctxTest": "Context: missed question",
      "ai.ctxResult": "Context: your last {subject} test",
      "ai.attach": "Attach", "ai.attachPdf": "PDF", "ai.attachDoc": "Document", "ai.attachImage": "Image / photo",
      "ai.ctxAdded": "Context added: {name}", "ai.usingContext": "I've added {name} to this conversation's context.",
      "ai.sugExplain": "Explain this concept", "ai.sugSimple": "Explain it simply",
      "ai.sugExample": "Give me an example", "ai.sugCompare": "Compare two ideas from this topic",
      "ai.sugQuiz": "Quiz me to check I understood",
      "ai.sugWhyFailed": "Why did I get this question wrong?", "ai.sugSummarize": "Summarise my notes",
      "ai.sugImprove": "How can I improve?", "ai.backToConvs": "Conversations",
      "ai.ctxLabel": "Context", "ai.ctxNone": "No context",
      "ai.tSimple": "Explain it more simply", "ai.tExample": "Give me an example", "ai.tQuiz": "Ask me a question", "ai.tDeeper": "Go deeper",
      "ai.fAnother": "Another one", "ai.fHarder": "Harder", "ai.fEasier": "Easier", "ai.fCorrect": "Correct me",

      "settings.title": "Settings", "settings.language": "Language", "settings.theme": "Theme",
      "settings.themeLight": "Light", "settings.themeDark": "Dark", "settings.themeAuto": "System",
      "settings.accent": "Accent colour",
      "accent.violet": "Violet", "accent.blue": "Blue", "accent.green": "Green", "accent.pink": "Pink", "accent.orange": "Orange",
      "premium.title": "Zynqora Premium", "premium.sub": "Study without limits.",
      "premium.f1t": "Unlimited AI", "premium.f1d": "Generate all the summaries, flashcards and tests you need.",
      "premium.f2t": "Exam plans", "premium.f2d": "Zynqora organises your study day by day.",
      "premium.f3t": "Advanced stats", "premium.f3d": "Analyse your progress and weak spots in depth.",
      "premium.f4t": "No ads", "premium.f4d": "A clean, focused experience.",
      "premium.cta": "Try Premium",
      "study.pTitle": "Customise session", "study.pSub": "Adjust this study session.",
      "study.pMore": "More flashcards", "study.pShorter": "Shorter session", "study.pTest": "Include a test at the end",
      "study.pApply": "Apply changes",
      "path.title": "Your study path", "path.sub": "Four steps to master {topic}.",
      "path.n1t": "Review", "path.n1s": "{topic}", "path.n2t": "Practise", "path.n2s": "Key concepts",
      "path.n3t": "Check", "path.n3s": "Quick test", "path.n4t": "Master", "path.n4s": "Final review",
      "path.start": "Continue the path", "path.done": "Path complete!", "path.step": "Step {n} of 4",
      "mode.title": "How do you want to review?", "mode.sub": "Pick how to study {topic} today.", "mode.rec": "Recommended",
      "mode.flashcards": "Flashcards", "mode.flashcardsS": "Question and answer",
      "mode.test": "Test", "mode.testS": "Multiple choice with feedback",
      "mode.fill": "Fill the word", "mode.fillS": "Fill the gap in the sentence",
      "mode.match": "Match concepts", "mode.matchS": "Link each term to its definition",
      "mode.explain": "Explain in your words", "mode.explainS": "Tell it to Zynqora AI",
      "mode.identify": "Identify the concept", "mode.identifyS": "Which idea is this?",
      "fib.title": "Fill the word", "fib.check": "Check", "fib.next": "Next", "fib.finish": "Finish",
      "fib.correct": "Correct!", "fib.wrong": "Almost. The answer was: {a}",
      "rm.matchTitle": "Match each concept to its definition", "rm.identifyTitle": "Which concept does this description refer to?",
      "rm.explainTitle": "Explain it in your own words", "rm.explainPh": "Write your explanation of {c}…", "rm.explainSend": "Send to Zynqora AI",
      "rm.done": "Exercise complete", "rm.back": "Back to the path",
      "streak.title": "{n}-day streak!", "streak.sub": "Keep it up tomorrow so you don't lose it.",
      "profile.editPhoto": "Edit profile", "profile.photoTitle": "Profile photo", "profile.photoSub": "Choose an image or a colour.",
      "profile.choosePhoto": "Choose image", "profile.photoSaved": "Photo updated",
      "profile.editTitle": "Edit profile", "profile.editSub": "Your name and photo are saved on this device.",
      "profile.nameLabel": "Name", "profile.emailLabel": "Email",
      "profile.emailNote": "Email is replaced when you sign in with a real account.",
      "profile.photoSection": "Photo", "profile.saved": "Profile updated",
      "settings.notifications": "Notifications", "settings.notifOn": "On", "settings.notifOff": "Off",
      "settings.study": "Study preferences", "settings.dailyGoal": "Daily goal",
      "settings.sessionLength": "Session length", "settings.short": "Short", "settings.balanced": "Balanced", "settings.long": "Long",
      "settings.reminders": "Study reminder", "settings.remindersVal": "Every day · 18:00",
      "settings.reminderTime": "Reminder time",
      "settings.reminderNote": "The setting is saved. The prototype doesn't send push notifications yet.",
      "settings.account": "Account", "settings.signout": "Sign out", "settings.deleteAccount": "Delete account",
      "settings.wipeConfirm": "Delete all your data on this device? Subjects, chats, calendar and progress will be erased. This can't be undone.",
      "settings.wipeDone": "Data deleted",
      "settings.version": "Zynqora · prototype version", "settings.plan": "Plan", "settings.planFree": "Free",

      "states.firstTitle": "Nothing to study yet",
      "states.firstSub": "Add your first material and Zynqora will prepare your study plan in under a minute.",
      "states.howItWorks": "How it works",
      "states.hiw1t": "Add your material", "states.hiw1d": "PDF, document, photo or text",
      "states.hiw2t": "Zynqora understands it", "states.hiw2d": "Summary, flashcards and questions",
      "states.hiw3t": "Study with focus", "states.hiw3d": "We tell you what to review each day",
      "states.errorTitle": "Couldn't load your dashboard",
      "states.errorSub": "Check your connection. Your data is safe.", "states.retry": "Retry"
    }
  };

  /* ---- Fase 1.0 strings (plans, limits, policies, AI tools) ---- */
  (function (P) {
    for (var k in P.es) I18N.es[k] = P.es[k];
    for (var k2 in P.en) I18N.en[k2] = P.en[k2];
  })({
    es: {
      "menu.plans": "Planes", "menu.checkout": "Checkout (demo)", "menu.policies": "Políticas", "menu.aitools": "Herramientas IA",
      "menu.policiesFull": "Políticas y condiciones",
      "plan.free": "Zynqora Free", "plan.plus": "Zynqora Plus", "plan.pro": "Zynqora Pro",
      "plan.freeShort": "Free", "plan.plusShort": "Plus", "plan.proShort": "Pro",
      "plans.title": "Elige cómo quieres estudiar", "plans.sub": "Empieza gratis y actualiza cuando necesites más.",
      "plans.monthly": "Mensual", "plans.annual": "Anual",
      "plans.perMonth": "/mes", "plans.perYear": "/año", "plans.free0": "0 €",
      "plans.save": "Ahorras {pct}% frente al pago mensual",
      "plans.popular": "Más popular", "plans.proTag": "Experiencia IA avanzada",
      "plans.proSub": "Para estudiantes que quieren aprovechar Zynqora al máximo",
      "plans.current": "Tu plan actual", "plans.choose": "Elegir {plan}",
      "plans.downgrade": "Cambiar a Free", "plans.cta": "Actualizar", "plans.manage": "Gestionar plan",
      "plans.noAds": "Sin anuncios. Solo tú, tus estudios y Zynqora.",
      "feat.aiMessages": "Mensajes a Zynqora AI", "feat.files": "Archivos para estudiar",
      "feat.tests": "Tests generados", "feat.flashcards": "Flashcards generadas",
      "feat.podcasts": "Podcasts IA", "feat.presentations": "Presentaciones IA",
      "feat.conceptMaps": "Mapas conceptuales IA", "feat.subjects": "Materias",
      "feat.perMonth": "{n} al mes", "feat.unlimited": "Sin límite", "feat.none": "No incluido", "feat.persBasic": "Colores básicos",
      "usage.title": "Tu plan", "usage.resets": "Los límites se renuevan cada mes.",
      "usage.reached": "Has alcanzado el límite de esta función en tu plan.",
      "usage.atLimit": "límite alcanzado",
      "up.title": "Has llegado al límite de tu plan Free",
      "up.body": "Puedes seguir estudiando con Zynqora actualizando tu plan.",
      "up.usedFeature": "Has utilizado tus {limit} {feature} de este mes.",
      "up.plusOffer": "Actualiza a Plus para disponer de hasta {n} {feature} al mes.",
      "short.aiMessages": "mensajes de IA", "short.files": "archivos", "short.tests": "tests", "short.flashcards": "flashcards",
      "up.subjectsUsed": "Tu plan Free incluye {limit} materias.",
      "up.subjectsOffer": "Actualiza a Plus para tener hasta {n} materias.",
      "up.toPlus": "Actualizar a Plus", "up.seeAll": "Ver todos los planes", "up.notNow": "Ahora no",
      "fm.podcastT": "Convierte tus apuntes en un podcast",
      "fm.presentationT": "Transforma tus apuntes en una presentación",
      "fm.conceptMapT": "Convierte tus apuntes en un mapa conceptual",
      "fm.personalizationT": "Más opciones de personalización",
      "fm.availPlus": "Esta función está disponible en Zynqora Plus y Pro.",
      "fm.seePlans": "Ver planes",
      "co.title": "Checkout de demostración", "co.plan": "Plan", "co.total": "Total",
      "co.name": "Nombre", "co.email": "Email", "co.payment": "Método de pago",
      "co.paymentDemo": "Pago de demostración — no se procesa ningún cobro real.",
      "co.card": "Tarjeta (demo)", "co.confirm": "Confirmar suscripción",
      "co.note": "Checkout de demostración. No se solicita ni se procesa ningún dato bancario real.",
      "co.welcome": "¡Bienvenido a {plan}! ✨",
      "co.welcomeSub": "Tu plan de demostración está activo. Puedes volver a Free cuando quieras desde tu perfil.",
      "co.start": "Empezar", "co.cancelAnytime": "Puedes cancelar la renovación en cualquier momento.",
      "tools.title": "Herramientas de estudio IA", "tools.sub": "Convierte tu material en nuevos formatos.",
      "tools.podcast": "Crear podcast", "tools.podcastS": "Escucha tus apuntes como un episodio.",
      "tools.presentation": "Crear presentación", "tools.presentationS": "Genera diapositivas a partir de tu material.",
      "tools.conceptMap": "Crear mapa conceptual", "tools.conceptMapS": "Visualiza cómo se conectan las ideas.",
      "tf.source": "Material", "tf.style": "Estilo", "tf.preview": "Vista previa",
      "tf.generate": "Generar", "tf.edit": "Editar", "tf.export": "Exportar",
      "tf.step": "Paso {n} de {total}",
      "tf.demoPreview": "Vista previa de demostración. La generación real se conectará más adelante.",
      "tf.podcastStyle1": "Conversación (2 voces)", "tf.podcastStyle2": "Narración (1 voz)",
      "tf.presStyle1": "Minimalista", "tf.presStyle2": "Visual",
      "tf.mapStyle1": "Radial", "tf.mapStyle2": "Jerárquico",
      "pol.title": "Políticas y condiciones",
      "pol.sub": "Todo lo que necesitas saber sobre Zynqora, explicado de forma clara y transparente.",
      "pol.nutshell": "En pocas palabras",
      "pol.nut1t": "Cancelación", "pol.nut1d": "Las suscripciones pueden cancelarse para evitar futuras renovaciones.",
      "pol.nut2t": "Renovación", "pol.nut2d": "Las condiciones de renovación se muestran antes de contratar.",
      "pol.nut3t": "Reembolsos", "pol.nut3d": "Las condiciones aplicables se muestran antes de la compra.",
      "pol.nut4t": "Privacidad", "pol.nut4d": "Los datos se tratarán de acuerdo con la Política de Privacidad.",
      "pol.nut5t": "IA", "pol.nut5d": "Zynqora AI es una herramienta de apoyo al estudio y sus respuestas pueden contener errores.",
      "pol.adsTitle": "Sin anuncios",
      "pol.adsBody": "Sin anuncios. Solo tú, tus estudios y Zynqora. Zynqora no utiliza anuncios dentro de la aplicación en ninguno de sus planes: sin banners, sin publicidad entre ejercicios y sin anuncios intrusivos.",
      "pol.disclaimer": "Este texto es un borrador de producto. Las condiciones definitivas deberán adaptarse a la legislación aplicable antes del lanzamiento comercial. Los derechos legales del consumidor prevalecen cuando correspondan.",
      "pol.s01t": "Objetivo de Zynqora", "pol.s01b": "Zynqora es una herramienta digital de apoyo al estudio que ayuda a organizar materiales, generar contenido de repaso (resúmenes, flashcards, tests) y planificar el aprendizaje.",
      "pol.s02t": "Aceptación de las condiciones", "pol.s02b": "Al crear una cuenta o utilizar Zynqora, el usuario acepta estas condiciones. Si no está de acuerdo, no debe utilizar el servicio.",
      "pol.s03t": "Cuenta de usuario", "pol.s03b": "El usuario es responsable de mantener la confidencialidad de sus credenciales y de la actividad realizada desde su cuenta.",
      "pol.s04t": "Planes y servicios", "pol.s04b": "Zynqora ofrece un plan gratuito y planes de pago (Plus y Pro) con distintos límites de uso. Las funciones de cada plan pueden evolucionar.",
      "pol.s05t": "Precios y pagos", "pol.s05b": "Los precios se muestran antes de contratar, con los impuestos aplicables cuando corresponda. Los importes de esta versión son orientativos.",
      "pol.s06t": "Pagos y proveedores", "pol.s06b": "Cuando se habiliten los pagos reales, se procesarán a través de proveedores de pago externos. Zynqora no almacena datos completos de tarjetas.",
      "pol.s07t": "Suscripciones y renovación", "pol.s07b": "Las suscripciones de pago se renuevan por periodos equivalentes salvo cancelación. Las condiciones de renovación se muestran antes de contratar.",
      "pol.s08t": "Cancelación", "pol.s08b": "El usuario puede cancelar la renovación en cualquier momento desde su perfil. El acceso de pago se mantiene hasta el final del periodo ya abonado.",
      "pol.s09t": "Reembolsos", "pol.s09b": "Las condiciones de reembolso aplicables se muestran antes de la compra. Podrá existir una garantía comercial de satisfacción de 30 minutos para determinados planes, sujeta a las condiciones aplicables. Los derechos legales del consumidor prevalecen cuando correspondan.",
      "pol.s10t": "Pruebas y promociones", "pol.s10b": "Zynqora puede ofrecer periodos de prueba o promociones con condiciones específicas, que se comunicarán en cada caso.",
      "pol.s11t": "Privacidad y protección de datos", "pol.s11b": "Los datos personales se tratan conforme a la Política de Privacidad, que detalla finalidades, bases legales y derechos.",
      "pol.s12t": "Datos tratados", "pol.s12b": "Zynqora puede tratar datos de cuenta, datos de uso del servicio y el contenido que el usuario decida subir para utilizar las funciones de estudio.",
      "pol.s13t": "Uso de los datos", "pol.s13b": "Los datos se utilizan para prestar el servicio, mejorarlo, dar soporte y cumplir obligaciones legales. No se venden a terceros.",
      "pol.s14t": "Seguridad", "pol.s14b": "Zynqora aplica medidas técnicas y organizativas razonables para proteger la información. Ningún sistema es completamente infalible.",
      "pol.s15t": "Proveedores externos", "pol.s15b": "Zynqora se apoya en proveedores de infraestructura, inteligencia artificial y analítica necesarios para prestar el servicio, sujetos a los acuerdos de tratamiento de datos correspondientes.",
      "pol.s16t": "Derechos del usuario", "pol.s16b": "El usuario puede acceder, rectificar, eliminar y portar sus datos, así como oponerse o limitar determinados tratamientos, según la normativa aplicable.",
      "pol.s17t": "Archivos y contenido del usuario", "pol.s17b": "El usuario puede subir materiales de estudio (PDF, documentos, imágenes o texto) para utilizar las funciones de Zynqora. El usuario declara tener derecho a utilizar dichos materiales. Para prestar el servicio, los archivos podrán ser procesados por los proveedores tecnológicos necesarios cuando la arquitectura real lo requiera. Las condiciones detalladas se recogerán en la Política de Privacidad.",
      "pol.s18t": "Zynqora AI y contenido generado", "pol.s18b": "Zynqora AI ofrece apoyo educativo. Sus respuestas se generan mediante sistemas de inteligencia artificial y pueden contener errores. El usuario debe verificar la información importante. Zynqora no garantiza que una respuesta sea siempre correcta y no sustituye a profesores, profesionales u otras fuentes oficiales cuando corresponda.",
      "pol.s19t": "Uso responsable", "pol.s19b": "El usuario se compromete a no usar Zynqora para fines ilícitos, para infringir derechos de terceros ni para generar contenido dañino.",
      "pol.s20t": "Propiedad intelectual", "pol.s20b": "Zynqora y sus elementos de marca pertenecen a sus titulares. El usuario conserva los derechos sobre su propio contenido.",
      "pol.s21t": "Disponibilidad del servicio", "pol.s21b": "Zynqora se esfuerza por mantener el servicio disponible, pero pueden producirse interrupciones por mantenimiento o causas técnicas.",
      "pol.s22t": "Eliminación de cuentas", "pol.s22b": "El usuario puede eliminar su cuenta en cualquier momento. La eliminación conlleva el borrado o la anonimización de sus datos según los plazos legales.",
      "pol.s23t": "Suspensión de cuentas", "pol.s23b": "Zynqora puede suspender o restringir cuentas que incumplan estas condiciones o que pongan en riesgo el servicio o a otros usuarios.",
      "pol.s24t": "Modificación del servicio", "pol.s24b": "Zynqora puede añadir, modificar o retirar funciones para mejorar el producto, avisando de los cambios relevantes.",
      "pol.s25t": "Modificación de las políticas", "pol.s25b": "Estas condiciones pueden actualizarse. Los cambios sustanciales se comunicarán con una antelación razonable.",
      "pol.s26t": "Atención al cliente", "pol.s26b": "El usuario puede contactar con el equipo de soporte a través de los canales indicados dentro de la aplicación.",
      "pol.s27t": "Legislación aplicable", "pol.s27b": "Estas condiciones se regirán por la legislación que resulte aplicable según el domicilio del usuario y la normativa de consumo vigente."
    },
    en: {
      "menu.plans": "Plans", "menu.checkout": "Checkout (demo)", "menu.policies": "Policies", "menu.aitools": "AI tools",
      "menu.policiesFull": "Policies & terms",
      "plan.free": "Zynqora Free", "plan.plus": "Zynqora Plus", "plan.pro": "Zynqora Pro",
      "plan.freeShort": "Free", "plan.plusShort": "Plus", "plan.proShort": "Pro",
      "plans.title": "Choose how you want to study", "plans.sub": "Start free and upgrade when you need more.",
      "plans.monthly": "Monthly", "plans.annual": "Annual",
      "plans.perMonth": "/mo", "plans.perYear": "/yr", "plans.free0": "€0",
      "plans.save": "Save {pct}% vs paying monthly",
      "plans.popular": "Most popular", "plans.proTag": "Advanced AI experience",
      "plans.proSub": "For students who want to get the most out of Zynqora",
      "plans.current": "Your current plan", "plans.choose": "Choose {plan}",
      "plans.downgrade": "Switch to Free", "plans.cta": "Upgrade", "plans.manage": "Manage plan",
      "plans.noAds": "No ads. Just you, your studies and Zynqora.",
      "feat.aiMessages": "Messages to Zynqora AI", "feat.files": "Files to study",
      "feat.tests": "Generated tests", "feat.flashcards": "Generated flashcards",
      "feat.podcasts": "AI podcasts", "feat.presentations": "AI presentations",
      "feat.conceptMaps": "AI concept maps", "feat.subjects": "Subjects",
      "feat.perMonth": "{n} / month", "feat.unlimited": "Unlimited", "feat.none": "Not included", "feat.persBasic": "Basic colours",
      "usage.title": "Your plan", "usage.resets": "Limits reset every month.",
      "usage.reached": "You've reached this feature's limit on your plan.",
      "usage.atLimit": "limit reached",
      "up.title": "You've hit your Free plan limit",
      "up.body": "You can keep studying with Zynqora by upgrading your plan.",
      "up.usedFeature": "You've used your {limit} {feature} for this month.",
      "up.plusOffer": "Upgrade to Plus for up to {n} {feature} per month.",
      "short.aiMessages": "AI messages", "short.files": "files", "short.tests": "tests", "short.flashcards": "flashcards",
      "up.subjectsUsed": "Your Free plan includes {limit} subjects.",
      "up.subjectsOffer": "Upgrade to Plus for up to {n} subjects.",
      "up.toPlus": "Upgrade to Plus", "up.seeAll": "See all plans", "up.notNow": "Not now",
      "fm.podcastT": "Turn your notes into a podcast",
      "fm.presentationT": "Turn your notes into a presentation",
      "fm.conceptMapT": "Turn your notes into a concept map",
      "fm.personalizationT": "More personalisation options",
      "fm.availPlus": "This feature is available on Zynqora Plus and Pro.",
      "fm.seePlans": "See plans",
      "co.title": "Demo checkout", "co.plan": "Plan", "co.total": "Total",
      "co.name": "Name", "co.email": "Email", "co.payment": "Payment method",
      "co.paymentDemo": "Demo payment — no real charge is processed.",
      "co.card": "Card (demo)", "co.confirm": "Confirm subscription",
      "co.note": "Demo checkout. No real banking details are requested or processed.",
      "co.welcome": "Welcome to {plan}! ✨",
      "co.welcomeSub": "Your demo plan is active. You can switch back to Free anytime from your profile.",
      "co.start": "Get started", "co.cancelAnytime": "You can cancel the renewal at any time.",
      "tools.title": "AI study tools", "tools.sub": "Turn your material into new formats.",
      "tools.podcast": "Create podcast", "tools.podcastS": "Listen to your notes as an episode.",
      "tools.presentation": "Create presentation", "tools.presentationS": "Generate slides from your material.",
      "tools.conceptMap": "Create concept map", "tools.conceptMapS": "See how the ideas connect.",
      "tf.source": "Material", "tf.style": "Style", "tf.preview": "Preview",
      "tf.generate": "Generate", "tf.edit": "Edit", "tf.export": "Export",
      "tf.step": "Step {n} of {total}",
      "tf.demoPreview": "Demo preview. Real generation will be connected later.",
      "tf.podcastStyle1": "Conversation (2 voices)", "tf.podcastStyle2": "Narration (1 voice)",
      "tf.presStyle1": "Minimal", "tf.presStyle2": "Visual",
      "tf.mapStyle1": "Radial", "tf.mapStyle2": "Hierarchical",
      "pol.title": "Policies & terms",
      "pol.sub": "Everything you need to know about Zynqora, explained clearly and transparently.",
      "pol.nutshell": "In a nutshell",
      "pol.nut1t": "Cancellation", "pol.nut1d": "Subscriptions can be cancelled to avoid future renewals.",
      "pol.nut2t": "Renewal", "pol.nut2d": "Renewal terms are shown before you subscribe.",
      "pol.nut3t": "Refunds", "pol.nut3d": "Applicable terms are shown before purchase.",
      "pol.nut4t": "Privacy", "pol.nut4d": "Data is processed in line with the Privacy Policy.",
      "pol.nut5t": "AI", "pol.nut5d": "Zynqora AI is a study-support tool and its answers may contain errors.",
      "pol.adsTitle": "No ads",
      "pol.adsBody": "No ads. Just you, your studies and Zynqora. Zynqora does not use in-app advertising on any of its plans: no banners, no ads between exercises and no intrusive advertising.",
      "pol.disclaimer": "This text is a product draft. The final terms will need to be adapted to applicable law before commercial launch. Statutory consumer rights prevail where they apply.",
      "pol.s01t": "What Zynqora is for", "pol.s01b": "Zynqora is a digital study-support tool that helps you organise materials, generate review content (summaries, flashcards, tests) and plan your learning.",
      "pol.s02t": "Acceptance of the terms", "pol.s02b": "By creating an account or using Zynqora, you accept these terms. If you do not agree, you should not use the service.",
      "pol.s03t": "User account", "pol.s03b": "You are responsible for keeping your credentials confidential and for activity carried out from your account.",
      "pol.s04t": "Plans and services", "pol.s04b": "Zynqora offers a free plan and paid plans (Plus and Pro) with different usage limits. The features of each plan may evolve.",
      "pol.s05t": "Prices and payments", "pol.s05b": "Prices are shown before you subscribe, including applicable taxes where relevant. The amounts in this version are indicative.",
      "pol.s06t": "Payments and providers", "pol.s06b": "When real payments are enabled, they will be processed through external payment providers. Zynqora does not store full card details.",
      "pol.s07t": "Subscriptions and renewal", "pol.s07b": "Paid subscriptions renew for equivalent periods unless cancelled. Renewal terms are shown before you subscribe.",
      "pol.s08t": "Cancellation", "pol.s08b": "You can cancel the renewal at any time from your profile. Paid access continues until the end of the period already paid for.",
      "pol.s09t": "Refunds", "pol.s09b": "Applicable refund terms are shown before purchase. A 30-minute commercial satisfaction guarantee may exist for certain plans, subject to the applicable conditions. Statutory consumer rights prevail where they apply.",
      "pol.s10t": "Trials and promotions", "pol.s10b": "Zynqora may offer trial periods or promotions with specific conditions, communicated in each case.",
      "pol.s11t": "Privacy and data protection", "pol.s11b": "Personal data is processed in line with the Privacy Policy, which sets out purposes, legal bases and rights.",
      "pol.s12t": "Data processed", "pol.s12b": "Zynqora may process account data, service-usage data and the content you choose to upload in order to use the study features.",
      "pol.s13t": "Use of data", "pol.s13b": "Data is used to provide the service, improve it, give support and meet legal obligations. It is not sold to third parties.",
      "pol.s14t": "Security", "pol.s14b": "Zynqora applies reasonable technical and organisational measures to protect information. No system is completely infallible.",
      "pol.s15t": "Third-party providers", "pol.s15b": "Zynqora relies on infrastructure, AI and analytics providers needed to run the service, subject to the relevant data-processing agreements.",
      "pol.s16t": "User rights", "pol.s16b": "You can access, rectify, delete and port your data, and object to or restrict certain processing, in accordance with applicable law.",
      "pol.s17t": "User files and content", "pol.s17b": "You can upload study materials (PDF, documents, images or text) to use Zynqora's features. You declare that you have the right to use those materials. To provide the service, files may be processed by the necessary technology providers when the real architecture requires it. Detailed terms will be set out in the Privacy Policy.",
      "pol.s18t": "Zynqora AI and generated content", "pol.s18b": "Zynqora AI provides educational support. Its answers are generated by artificial-intelligence systems and may contain errors. You should verify important information. Zynqora does not guarantee that an answer is always correct and does not replace teachers, professionals or other official sources where relevant.",
      "pol.s19t": "Responsible use", "pol.s19b": "You agree not to use Zynqora for unlawful purposes, to infringe third-party rights or to generate harmful content.",
      "pol.s20t": "Intellectual property", "pol.s20b": "Zynqora and its brand elements belong to their owners. You keep the rights to your own content.",
      "pol.s21t": "Service availability", "pol.s21b": "Zynqora strives to keep the service available, but interruptions may occur due to maintenance or technical issues.",
      "pol.s22t": "Account deletion", "pol.s22b": "You can delete your account at any time. Deletion involves erasing or anonymising your data within the legal time limits.",
      "pol.s23t": "Account suspension", "pol.s23b": "Zynqora may suspend or restrict accounts that breach these terms or that put the service or other users at risk.",
      "pol.s24t": "Changes to the service", "pol.s24b": "Zynqora may add, change or remove features to improve the product, notifying users of relevant changes.",
      "pol.s25t": "Changes to the policies", "pol.s25b": "These terms may be updated. Substantial changes will be communicated with reasonable notice.",
      "pol.s26t": "Customer support", "pol.s26b": "You can contact the support team through the channels indicated within the app.",
      "pol.s27t": "Governing law", "pol.s27b": "These terms are governed by the law applicable based on your place of residence and the consumer regulations in force."
    }
  });

  /* ---- Fase 1.1 strings (checkout, podcast, presentations, profile) ---- */
  (function (P) {
    for (var k in P.es) I18N.es[k] = P.es[k];
    for (var k2 in P.en) I18N.en[k2] = P.en[k2];
  })({
    es: {
      "co.title": "Finalizar pago",
      "co.activating": "Estás activando {plan}",
      "co.cycleMonthly": "facturación mensual", "co.cycleAnnual": "facturación anual",
      "co.methodCard": "Tarjeta", "co.methodPaypal": "PayPal",
      "co.cardName": "Nombre en la tarjeta", "co.cardNumber": "Número de tarjeta",
      "co.expiry": "Caducidad", "co.cvc": "CVC", "co.country": "País", "co.zip": "Código postal",
      "co.pay": "Pagar {amount}",
      "co.simNote": "Pago simulado — demo de producto, no se realiza ningún cobro real",
      "co.paypalNote": "Al continuar se abriría PayPal (simulado en esta demo).",
      "co.payPaypal": "Continuar con PayPal",
      "co.welcome": "¡Bienvenido a {plan}! ✨",
      "co.welcomeSub": "Tu plan de demostración está activo y tus límites se han actualizado. Puedes volver a Free cuando quieras desde tu perfil.",
      "co.start": "Empezar", "co.cancelNote": "Puedes cancelar la renovación en cualquier momento. Sin permanencia.",
      "plans.policiesLink": "Políticas y condiciones",
      "plans.reviewFree": "Repaso básico", "plans.reviewFull": "Repaso avanzado",
      "bul.allFree": "Todo lo de Free", "bul.allPlus": "Todo lo de Plus",
      "bul.calendar": "Calendario y tareas", "bul.streak": "Racha de estudio",
      "bul.langs": "Español + English", "bul.noAds": "Sin anuncios",
      "bul.colorsBasic": "Colores básicos", "bul.persFull": "Personalización completa",
      "bul.aiAdvanced": "Experiencia IA avanzada",
      "bul.ai": "Zynqora AI — {n} mensajes al mes", "bul.files": "{n} archivos al mes",
      "bul.tests": "{n} tests al mes", "bul.fc": "{n} flashcards al mes",
      "bul.pod": "{n} podcasts al mes", "bul.pres": "{n} presentaciones IA al mes",
      "bul.map": "{n} mapas conceptuales al mes",
      "bul.subj": "{n} materias", "bul.subjUnlim": "Materias sin límite razonable",
      "tools.podcastS": "Convierte tus apuntes en una explicación que puedes escuchar.",
      "tools.presentationS": "Transforma tus apuntes en una presentación visual, clara y lista para estudiar.",
      "tools.conceptMapS": "Visualiza cómo se conectan las ideas de tu material.",
      "tf.whatCreate": "¿Qué quieres crear?",
      "tf.podStudy": "Podcast de estudio", "tf.podStudyS": "Una explicación locutada de tu material",
      "tf.duration": "Duración",
      "tf.durShort": "Corto", "tf.durMedium": "Medio", "tf.durDeep": "Profundo",
      "tf.min": "{n} min",
      "tf.podEx": "Explicación", "tf.podRev": "Repaso", "tf.podConv": "Conversación",
      "tf.presMin": "Minimalista", "tf.presAcad": "Académico", "tf.presVis": "Visual", "tf.presCrea": "Creativo",
      "tf.mapRadial": "Radial", "tf.mapHier": "Jerárquico",
      "tf.createPodcast": "Crear podcast", "tf.createPres": "Crear presentación", "tf.createMap": "Crear mapa",
      "tf.genPodcast": "Zynqora está preparando tu podcast…",
      "tf.genPres": "Zynqora está montando tu presentación…",
      "tf.genMap": "Zynqora está trazando tu mapa…",
      "tf.genSub": "Esto tardaría unos segundos con el servicio real.",
      "tf.podNote": "Audio de demostración. La generación de voz real se conectará más adelante.",
      "tf.presNote": "Presentación de demostración generada a partir de tu material.",
      "tf.mapNote": "Mapa de demostración. La generación real se conectará más adelante.",
      "tf.regen": "Regenerar", "tf.export": "Exportar", "tf.edit": "Editar",
      "tf.exportDemo": "Exportación simulada en esta demo.",
      "tf.editDemo": "Edición simulada en esta demo.",
      "tf.regenDone": "Regenerado (demo).",
      "mat.actionsTitle": "¿Qué quieres hacer con este material?",
      "mat.ask": "Preguntar a Zynqora", "mat.summary": "Crear resumen", "mat.flashcards": "Crear flashcards",
      "mat.test": "Crear test", "mat.podcast": "Crear podcast", "mat.presentation": "Crear presentación",
      "mat.conceptMap": "Crear mapa conceptual", "mat.exercises": "Crear ejercicios",
      "fm.availPlus": "Esta función forma parte de Zynqora Plus.",
      "fm.podcastD": "Convierte cualquier material en un podcast de estudio que puedes escuchar.",
      "fm.presentationD": "Transforma tus apuntes en una presentación visual lista para repasar.",
      "fm.conceptMapD": "Genera un mapa conceptual con las ideas de tu material y sus conexiones.",
      "fm.personalizationD": "Desbloquea todos los colores de acento y opciones de personalización.",
      "fm.toPlus": "Actualizar a Plus",
      "up.title": "Has alcanzado el límite de tu plan Free",
      "prof.title": "Perfil", "prof.editProfile": "Editar perfil", "prof.managePlan": "Gestionar plan",
      "prof.settings": "Configuración", "prof.statStreak": "días de racha", "prof.statSubjects": "materias",
      "prof.statAi": "mensajes IA", "prof.monthlyUse": "Uso mensual",
      "pol.nut1t": "Sin anuncios", "pol.nut1d": "Zynqora no muestra publicidad en ningún plan.",
      "pol.nut2t": "Cancelación", "pol.nut2d": "La suscripción puede cancelarse según las condiciones aplicables.",
      "pol.nut3t": "Reembolsos", "pol.nut3d": "Las condiciones de reembolso se muestran antes de contratar.",
      "pol.nut4t": "Protección de datos", "pol.nut4d": "Los datos se tratan conforme a la Política de Privacidad.",
      "pol.nut5t": "Zynqora AI", "pol.nut5d": "Puede cometer errores; verifica la información importante.",
      "pol.nut6t": "Tus materiales", "pol.nut6d": "Se utilizan para las funciones de estudio correspondientes.",
      "pol.disclaimer": "Estas condiciones deberán revisarse y adaptarse a la legislación aplicable antes del lanzamiento comercial. Los derechos legales del consumidor prevalecen cuando correspondan."
    },
    en: {
      "co.title": "Complete payment",
      "co.activating": "You're activating {plan}",
      "co.cycleMonthly": "monthly billing", "co.cycleAnnual": "annual billing",
      "co.methodCard": "Card", "co.methodPaypal": "PayPal",
      "co.cardName": "Name on card", "co.cardNumber": "Card number",
      "co.expiry": "Expiry", "co.cvc": "CVC", "co.country": "Country", "co.zip": "Postal code",
      "co.pay": "Pay {amount}",
      "co.simNote": "Simulated payment — product demo, no real charge is made",
      "co.paypalNote": "Continuing would open PayPal (simulated in this demo).",
      "co.payPaypal": "Continue with PayPal",
      "co.welcome": "Welcome to {plan}! ✨",
      "co.welcomeSub": "Your demo plan is active and your limits are updated. You can switch back to Free anytime from your profile.",
      "co.start": "Get started", "co.cancelNote": "You can cancel the renewal at any time. No commitment.",
      "plans.policiesLink": "Policies & terms",
      "plans.reviewFree": "Basic review", "plans.reviewFull": "Advanced review",
      "bul.allFree": "Everything in Free", "bul.allPlus": "Everything in Plus",
      "bul.calendar": "Calendar and tasks", "bul.streak": "Study streak",
      "bul.langs": "Spanish + English", "bul.noAds": "No ads",
      "bul.colorsBasic": "Basic colours", "bul.persFull": "Full personalisation",
      "bul.aiAdvanced": "Advanced AI experience",
      "bul.ai": "Zynqora AI — {n} messages/month", "bul.files": "{n} files/month",
      "bul.tests": "{n} tests/month", "bul.fc": "{n} flashcards/month",
      "bul.pod": "{n} podcasts/month", "bul.pres": "{n} AI presentations/month",
      "bul.map": "{n} concept maps/month",
      "bul.subj": "{n} subjects", "bul.subjUnlim": "No reasonable subject limit",
      "tools.podcastS": "Turn your notes into an explanation you can listen to.",
      "tools.presentationS": "Turn your notes into a clear visual presentation, ready to study.",
      "tools.conceptMapS": "See how the ideas in your material connect.",
      "tf.whatCreate": "What do you want to create?",
      "tf.podStudy": "Study podcast", "tf.podStudyS": "A narrated explanation of your material",
      "tf.duration": "Length",
      "tf.durShort": "Short", "tf.durMedium": "Medium", "tf.durDeep": "Deep",
      "tf.min": "{n} min",
      "tf.podEx": "Explanation", "tf.podRev": "Review", "tf.podConv": "Conversation",
      "tf.presMin": "Minimal", "tf.presAcad": "Academic", "tf.presVis": "Visual", "tf.presCrea": "Creative",
      "tf.mapRadial": "Radial", "tf.mapHier": "Hierarchical",
      "tf.createPodcast": "Create podcast", "tf.createPres": "Create presentation", "tf.createMap": "Create map",
      "tf.genPodcast": "Zynqora is preparing your podcast…",
      "tf.genPres": "Zynqora is building your presentation…",
      "tf.genMap": "Zynqora is drawing your map…",
      "tf.genSub": "This would take a few seconds with the real service.",
      "tf.podNote": "Demo audio. Real voice generation will be connected later.",
      "tf.presNote": "Demo presentation generated from your material.",
      "tf.mapNote": "Demo map. Real generation will be connected later.",
      "tf.regen": "Regenerate", "tf.export": "Export", "tf.edit": "Edit",
      "tf.exportDemo": "Simulated export in this demo.",
      "tf.editDemo": "Simulated editing in this demo.",
      "tf.regenDone": "Regenerated (demo).",
      "mat.actionsTitle": "What do you want to do with this material?",
      "mat.ask": "Ask Zynqora", "mat.summary": "Create summary", "mat.flashcards": "Create flashcards",
      "mat.test": "Create test", "mat.podcast": "Create podcast", "mat.presentation": "Create presentation",
      "mat.conceptMap": "Create concept map", "mat.exercises": "Create exercises",
      "fm.availPlus": "This feature is part of Zynqora Plus.",
      "fm.podcastD": "Turn any material into a study podcast you can listen to.",
      "fm.presentationD": "Turn your notes into a visual presentation ready to review.",
      "fm.conceptMapD": "Generate a concept map with your material's ideas and how they connect.",
      "fm.personalizationD": "Unlock every accent colour and personalisation option.",
      "fm.toPlus": "Upgrade to Plus",
      "up.title": "You've reached your Free plan limit",
      "prof.title": "Profile", "prof.editProfile": "Edit profile", "prof.managePlan": "Manage plan",
      "prof.settings": "Settings", "prof.statStreak": "day streak", "prof.statSubjects": "subjects",
      "prof.statAi": "AI messages", "prof.monthlyUse": "Monthly use",
      "pol.nut1t": "No ads", "pol.nut1d": "Zynqora shows no advertising on any plan.",
      "pol.nut2t": "Cancellation", "pol.nut2d": "The subscription can be cancelled subject to the applicable conditions.",
      "pol.nut3t": "Refunds", "pol.nut3d": "Refund conditions are shown before you subscribe.",
      "pol.nut4t": "Data protection", "pol.nut4d": "Data is processed in line with the Privacy Policy.",
      "pol.nut5t": "Zynqora AI", "pol.nut5d": "It can make mistakes; verify important information.",
      "pol.nut6t": "Your materials", "pol.nut6d": "They're used for the corresponding study features.",
      "pol.disclaimer": "These terms will need to be reviewed and adapted to applicable law before commercial launch. Statutory consumer rights prevail where they apply."
    }
  });

  /* ---- Fase 1.2 strings (presentation deck + podcast player) ---- */
  (function (P) {
    for (var k in P.es) I18N.es[k] = P.es[k];
    for (var k2 in P.en) I18N.en[k2] = P.en[k2];
  })({
    es: {
      "pres.st0": "Minimal", "pres.st1": "Editorial", "pres.st2": "Académico", "pres.st3": "Visual", "pres.st4": "Oscuro",
      "pres.style": "Estilo de presentación",
      "pres.genPrefix": "Presentación",
      "pres.byZynqora": "Generado por Zynqora AI",
      "pres.slides": "{n} diapositivas",
      "pres.present": "Modo presentación", "pres.exit": "Salir",
      "pres.thumbs": "Miniaturas",
      "pres.note": "Presentación de demostración generada a partir de tu material · estilo {style}. Los elementos visuales se adaptan al tema.",
      "pres.tWhy": "¿Por qué es importante?", "pres.tBig": "La idea general",
      "pres.tKey": "Los puntos clave", "pres.tRemember": "Lo que debes recordar",
      "pres.tTimeline": "Cómo encaja todo", "pres.tStructure": "El recorrido del tema",
      "pres.tDef": "Concepto clave", "pres.tCompare": "Dos ideas frente a frente",
      "pres.tHighlight": "Para el examen", "pres.tClose": "Repaso final",
      "pres.closeSub": "Domina estos puntos y tendrás el tema.",
      "gen.pres1": "Analizando tus apuntes…", "gen.pres2": "Organizando las ideas…", "gen.pres3": "Creando la estructura…",
      "gen.pres4": "Seleccionando elementos visuales…", "gen.pres5": "Preparando tu presentación…",
      "gen.pod1": "Analizando tus apuntes…", "gen.pod2": "Escribiendo el guion…", "gen.pod3": "Ajustando el tono y el ritmo…",
      "gen.pod4": "Preparando el audio…",
      "gen.map1": "Analizando tus apuntes…", "gen.map2": "Detectando conceptos…", "gen.map3": "Trazando las conexiones…",
      "gen.done": "¡Listo!",
      "pod.approach": "¿Cómo quieres aprenderlo?",
      "pod.apExplain": "Explicación", "pod.apExplainS": "De cero, paso a paso",
      "pod.apReview": "Repaso", "pod.apReviewS": "Rápido, antes del examen",
      "pod.apConv": "Conversación", "pod.apConvS": "Dos voces charlando",
      "pod.duration": "Duración", "pod.voice": "Voz", "pod.voiceStyle": "Estilo de voz",
      "pod.voice1": "Voz 1", "pod.voice2": "Voz 2",
      "pod.voice1S": "Cálida", "pod.voice2S": "Clara",
      "pod.vsNatural": "Natural", "pod.vsTeacher": "Profesor", "pod.vsPodcast": "Podcast", "pod.vsConv": "Conversación",
      "pod.generate": "Generar podcast",
      "pod.coverSub": "{approach} · {min} min",
      "pod.volume": "Volumen",
      "pod.transcript": "Transcripción", "pod.follow": "Sigue el audio",
      "pod.back15": "−15 s", "pod.fwd15": "+15 s",
      "pod.ambientNote": "Reproductor funcional con audio ambiente de demostración (Web Audio API). La voz TTS con «{voice} · {style}» está preparada para conectar un servicio de generación de voz.",
      "pod.ambientNoteNoAudio": "Reproductor de demostración. La voz TTS con «{voice} · {style}» está preparada para conectar un servicio de generación de voz.",
      "mat.upTitle": "Material analizado", "mat.upSub": "¿Qué quieres hacer con este material?"
    },
    en: {
      "pres.st0": "Minimal", "pres.st1": "Editorial", "pres.st2": "Academic", "pres.st3": "Visual", "pres.st4": "Dark",
      "pres.style": "Presentation style",
      "pres.genPrefix": "Presentation",
      "pres.byZynqora": "Generated by Zynqora AI",
      "pres.slides": "{n} slides",
      "pres.present": "Present mode", "pres.exit": "Exit",
      "pres.thumbs": "Thumbnails",
      "pres.note": "Demo presentation generated from your material · {style} style. The visuals adapt to the topic.",
      "pres.tWhy": "Why it matters", "pres.tBig": "The big picture",
      "pres.tKey": "Key points", "pres.tRemember": "What to remember",
      "pres.tTimeline": "How it fits together", "pres.tStructure": "The topic's path",
      "pres.tDef": "Key concept", "pres.tCompare": "Two ideas side by side",
      "pres.tHighlight": "For the exam", "pres.tClose": "Final review",
      "pres.closeSub": "Master these points and you've got the topic.",
      "gen.pres1": "Analysing your notes…", "gen.pres2": "Organising the ideas…", "gen.pres3": "Building the structure…",
      "gen.pres4": "Selecting visual elements…", "gen.pres5": "Preparing your presentation…",
      "gen.pod1": "Analysing your notes…", "gen.pod2": "Writing the script…", "gen.pod3": "Tuning tone and pace…",
      "gen.pod4": "Preparing the audio…",
      "gen.map1": "Analysing your notes…", "gen.map2": "Detecting concepts…", "gen.map3": "Drawing the connections…",
      "gen.done": "Ready!",
      "pod.approach": "How do you want to learn it?",
      "pod.apExplain": "Explanation", "pod.apExplainS": "From scratch, step by step",
      "pod.apReview": "Review", "pod.apReviewS": "Quick, before the exam",
      "pod.apConv": "Conversation", "pod.apConvS": "Two voices chatting",
      "pod.duration": "Length", "pod.voice": "Voice", "pod.voiceStyle": "Voice style",
      "pod.voice1": "Voice 1", "pod.voice2": "Voice 2",
      "pod.voice1S": "Warm", "pod.voice2S": "Clear",
      "pod.vsNatural": "Natural", "pod.vsTeacher": "Teacher", "pod.vsPodcast": "Podcast", "pod.vsConv": "Conversation",
      "pod.generate": "Generate podcast",
      "pod.coverSub": "{approach} · {min} min",
      "pod.volume": "Volume",
      "pod.transcript": "Transcript", "pod.follow": "Follows the audio",
      "pod.back15": "−15 s", "pod.fwd15": "+15 s",
      "pod.ambientNote": "Working player with a demo ambience track (Web Audio API). TTS voice with “{voice} · {style}” is wired to connect a voice-generation service later.",
      "pod.ambientNoteNoAudio": "Demo player. TTS voice with “{voice} · {style}” is wired to connect a voice-generation service later.",
      "mat.upTitle": "Material analysed", "mat.upSub": "What do you want to do with this material?"
    }
  });

  /* ---- Fase 1.3 strings (Zynqora AI engine, voice, mode) ---- */
  (function (P) {
    for (var k in P.es) I18N.es[k] = P.es[k];
    for (var k2 in P.en) I18N.en[k2] = P.en[k2];
  })({
    es: {
      "ai.modeDemo": "Demo", "ai.modeReal": "IA real",
      "ai.sources": "Fuentes",
      "ai.demoNote": "Modo demo · motor local de Zynqora AI. Conecta tu servidor para la IA real (Gemini), la búsqueda web y la voz.",
      "ai.realNote": "Zynqora AI conectado. Respuestas, búsqueda web y voz reales.",
      "gen.pod1": "Analizando el material…", "gen.pod2": "Creando el guion…", "gen.pod3": "Preparando la narración…",
      "gen.pod4": "Generando la voz…", "gen.pod5": "Preparando el audio…",
      "gen.errTitle": "No hemos podido generarlo ahora mismo",
      "gen.errBody": "Zynqora AI no ha respondido. Inténtalo de nuevo.",
      "gen.retry": "Reintentar",
      "pod.noteReal": "Voz generada por Zynqora AI, con pausas, entonación y pronunciación natural de fechas y números.",
      "pod.noteBrowser": "Voz del navegador (demo) con dirección de voz aplicada: pausas, ritmo variable y pronunciación natural de fechas y números («1789» → «mil setecientos ochenta y nueve»). Conectado, el guion y esta misma dirección van a Gemini TTS (voz de estudio de alta calidad).",
      "pod.noteScript": "Vista previa del guion. Tu navegador no permite leer la voz; conecta Zynqora AI para la voz generada.",
      "pod.music": "Música de fondo",
      "pod.noVoice": "Tu navegador no permite reproducir la voz. Conecta Zynqora AI para la voz generada.",
      "pod.twoVoices": "Dos voces", "pod.voiceA": "Voz A", "pod.voiceB": "Voz B",
      "pod.prevLine": "Frase anterior", "pod.nextLine": "Frase siguiente",
      "set.ai": "Zynqora AI", "set.aiMode": "Modo",
      "set.aiDemo": "Demo · motor local + voz del navegador",
      "set.aiReal": "IA real · Gemini",
      "set.aiEndpoint": "Servidor de Zynqora AI",
      "set.aiEndpointPh": "https://tu-servidor…/zynqora-ai",
      "set.aiConnect": "Conectar", "set.aiDisconnect": "Desconectar",
      "set.aiHelp": "En modo demo, Zynqora AI usa un motor local y la voz del navegador. Conecta tu servidor (un proxy de Gemini) para activar la IA real, la búsqueda web y la voz Gemini TTS.",
      "set.aiKeyNote": "La app nunca guarda ninguna API key. La clave GEMINI_API_KEY vive solo en tu servidor. Código y guía: docs/DEPLOY.md",
      "set.aiConnected": "Conectado a Zynqora AI",
      "set.cloud": "Zynqora Cloud (Supabase)",
      "set.cloudHelp": "Conecta un proyecto de Supabase para guardar tus datos en la nube, iniciar sesión y usar la IA real de Gemini de forma segura. La guía paso a paso (sin saber programar) está en docs/DEPLOY.md.",
      "set.cloudUrl": "URL de Supabase", "set.cloudUrlPh": "https://xxxx.supabase.co",
      "set.cloudKey": "Clave pública (anon)", "set.cloudKeyPh": "eyJhbGciOiJI…",
      "set.cloudConnect": "Conectar", "set.cloudConnected": "Cloud conectado",
      "set.cloudDisconnect": "Desconectar cloud",
      "set.cloudLocalNote": "Sin conectar, tus datos se guardan solo en este dispositivo (IndexedDB).",
      "auth.title": "Zynqora Cloud", "auth.signin": "Iniciar sesión", "auth.signup": "Crear cuenta",
      "auth.email": "Email", "auth.password": "Contraseña", "auth.name": "Nombre",
      "auth.forgot": "He olvidado la contraseña", "auth.recoverSent": "Si el email existe, te hemos enviado un enlace.",
      "auth.noCloud": "Aún no has conectado Supabase. Ve a Configuración → Zynqora Cloud, o abre docs/DEPLOY.md.",
      "auth.signedInAs": "Sesión iniciada como", "auth.signout": "Cerrar sesión",
      "auth.toSignup": "¿No tienes cuenta? Crear una", "auth.toSignin": "¿Ya tienes cuenta? Iniciar sesión",
      "auth.err": "No se ha podido completar. Revisa el email y la contraseña."
    },
    en: {
      "ai.modeDemo": "Demo", "ai.modeReal": "Real AI",
      "ai.sources": "Sources",
      "ai.demoNote": "Demo mode · Zynqora AI local engine. Connect your server for real AI (Gemini), web search and voice.",
      "ai.realNote": "Zynqora AI connected. Real answers, web search and voice.",
      "gen.pod1": "Analysing the material…", "gen.pod2": "Writing the script…", "gen.pod3": "Preparing the narration…",
      "gen.pod4": "Generating the voice…", "gen.pod5": "Preparing the audio…",
      "gen.errTitle": "We couldn't generate it right now",
      "gen.errBody": "Zynqora AI didn't respond. Please try again.",
      "gen.retry": "Try again",
      "pod.noteReal": "Voice generated by Zynqora AI, with natural pauses, intonation and pronunciation of dates and numbers.",
      "pod.noteBrowser": "Browser voice (demo) with voice direction applied: pauses, variable pace and natural pronunciation of dates and numbers (“1789” → “seventeen eighty-nine”). When connected, the script and this same direction go to Gemini TTS (high-quality study voice).",
      "pod.noteScript": "Script preview. Your browser can't read the voice; connect Zynqora AI for generated voice.",
      "pod.music": "Background music",
      "pod.noVoice": "Your browser can't play the voice. Connect Zynqora AI for generated voice.",
      "pod.twoVoices": "Two voices", "pod.voiceA": "Voice A", "pod.voiceB": "Voice B",
      "pod.prevLine": "Previous line", "pod.nextLine": "Next line",
      "set.ai": "Zynqora AI", "set.aiMode": "Mode",
      "set.aiDemo": "Demo · local engine + browser voice",
      "set.aiReal": "Real AI · Gemini",
      "set.aiEndpoint": "Zynqora AI server",
      "set.aiEndpointPh": "https://your-server…/zynqora-ai",
      "set.aiConnect": "Connect", "set.aiDisconnect": "Disconnect",
      "set.aiHelp": "In demo mode, Zynqora AI uses a local engine and the browser voice. Connect your server (a Gemini proxy) to enable real AI, web search and Gemini TTS voice.",
      "set.aiKeyNote": "The app never stores any API key. The GEMINI_API_KEY lives only on your server. Code and guide: docs/DEPLOY.md",
      "set.aiConnected": "Connected to Zynqora AI",
      "set.cloud": "Zynqora Cloud (Supabase)",
      "set.cloudHelp": "Connect a Supabase project to save your data in the cloud, sign in, and use the real Gemini AI securely. The step-by-step guide (no coding needed) is in docs/DEPLOY.md.",
      "set.cloudUrl": "Supabase URL", "set.cloudUrlPh": "https://xxxx.supabase.co",
      "set.cloudKey": "Public key (anon)", "set.cloudKeyPh": "eyJhbGciOiJI…",
      "set.cloudConnect": "Connect", "set.cloudConnected": "Cloud connected",
      "set.cloudDisconnect": "Disconnect cloud",
      "set.cloudLocalNote": "Until connected, your data is saved only on this device (IndexedDB).",
      "auth.title": "Zynqora Cloud", "auth.signin": "Sign in", "auth.signup": "Create account",
      "auth.email": "Email", "auth.password": "Password", "auth.name": "Name",
      "auth.forgot": "I forgot my password", "auth.recoverSent": "If that email exists, we've sent you a link.",
      "auth.noCloud": "You haven't connected Supabase yet. Go to Settings → Zynqora Cloud, or open docs/DEPLOY.md.",
      "auth.signedInAs": "Signed in as", "auth.signout": "Sign out",
      "auth.toSignup": "No account? Create one", "auth.toSignin": "Have an account? Sign in",
      "auth.err": "Couldn't complete that. Check the email and password."
    }
  });

  /* ================= BILINGUAL CONTENT — subjects ================= */
  /* Each subject is fully self-contained. Documents, flashcards, tests and AI
     answers belong to their subject and never mix. */
  var SUBJECTS = [
    {
      id: "hist", name: { es: "Historia", en: "History" }, icon: "landmark", color: "#B07D3C",
      mastery: 58, testsTaken: 2, lastSessionDays: 2,
      weak: { es: ["Causas económicas de la crisis", "Girondinos frente a jacobinos"], en: ["Economic causes of the crisis", "Girondins vs Jacobins"] },
      doc: {
        id: "hist-d1", kind: "pdf", pages: 16, sizeMB: "3.2",
        title: { es: "Revolución Francesa.pdf", en: "French Revolution.pdf" },
        analysis: {
          concepts: 24, difficulty: "med", topicsN: 5, readMin: 12,
          main: {
            es: ["Antiguo Régimen", "Estados Generales de 1789", "Asamblea Nacional", "Toma de la Bastilla", "Declaración de los Derechos del Hombre", "El Terror y Robespierre"],
            en: ["Ancien Régime", "Estates-General of 1789", "National Assembly", "Storming of the Bastille", "Declaration of the Rights of Man", "The Terror and Robespierre"]
          },
          topics: {
            es: ["1 · El Antiguo Régimen y sus crisis", "2 · 1789: de los Estados Generales a la Asamblea", "3 · La monarquía constitucional", "4 · La República y el Terror", "5 · El Directorio y el fin de la Revolución"],
            en: ["1 · The Ancien Régime and its crises", "2 · 1789: from the Estates-General to the Assembly", "3 · The constitutional monarchy", "4 · The Republic and the Terror", "5 · The Directory and the end of the Revolution"]
          }
        },
        summary: {
          es: "La Revolución Francesa (1789–1799) puso fin al Antiguo Régimen en Francia. Una profunda crisis financiera y social llevó a Luis XVI a convocar los Estados Generales; el Tercer Estado se proclamó Asamblea Nacional y, tras la toma de la Bastilla, se aprobó la Declaración de los Derechos del Hombre y del Ciudadano. La radicalización condujo a la proclamación de la República, la ejecución del rey y el Terror dirigido por Robespierre, hasta el giro moderado del Directorio y el ascenso de Napoleón.",
          en: "The French Revolution (1789–1799) ended the Ancien Régime in France. A deep financial and social crisis forced Louis XVI to summon the Estates-General; the Third Estate declared itself the National Assembly and, after the storming of the Bastille, the Declaration of the Rights of Man and of the Citizen was passed. Radicalisation led to the Republic, the king's execution and the Terror led by Robespierre, until the moderate turn of the Directory and Napoleon's rise."
        }
      },
      flashcards: [
        { diff: "med",
          q: { es: "¿Qué eran los Estados Generales?", en: "What were the Estates-General?" },
          a: { es: "Una asamblea que reunía a los tres estamentos (nobleza, clero y Tercer Estado). Luis XVI la convocó en 1789, tras más de 170 años sin reunirse, para aprobar nuevos impuestos.", en: "An assembly of the three estates (nobility, clergy and Third Estate). Louis XVI summoned it in 1789, after more than 170 years, to approve new taxes." } },
        { diff: "easy",
          q: { es: "¿Qué simbolizó la toma de la Bastilla el 14 de julio de 1789?", en: "What did the storming of the Bastille on 14 July 1789 symbolise?" },
          a: { es: "El fin del poder absoluto del rey y el inicio de la revolución popular. La Bastilla era una fortaleza-prisión, símbolo del despotismo real.", en: "The end of the king's absolute power and the start of the popular revolution. The Bastille was a fortress-prison, a symbol of royal despotism." } },
        { diff: "med",
          q: { es: "¿Qué proclamó la Declaración de los Derechos del Hombre y del Ciudadano (1789)?", en: "What did the Declaration of the Rights of Man and of the Citizen (1789) proclaim?" },
          a: { es: "La libertad, la igualdad ante la ley, la soberanía nacional y la separación de poderes como derechos naturales e inalienables.", en: "Liberty, equality before the law, national sovereignty and the separation of powers as natural, inalienable rights." } },
        { diff: "hard",
          q: { es: "¿Qué fue el Terror (1793–1794)?", en: "What was the Terror (1793–1794)?" },
          a: { es: "El período en que el Comité de Salvación Pública, con Robespierre al frente, reprimió a los opositores mediante ejecuciones masivas en la guillotina para defender la República.", en: "The period when the Committee of Public Safety, led by Robespierre, repressed opponents through mass executions by guillotine to defend the Republic." } }
      ],
      quiz: [
        { correct: 0,
          q: { es: "¿Qué estamento pagaba la mayoría de los impuestos en el Antiguo Régimen?", en: "Which estate paid most of the taxes under the Ancien Régime?" },
          opts: { es: ["El Tercer Estado", "La nobleza", "El clero", "Todos por igual"], en: ["The Third Estate", "The nobility", "The clergy", "Everyone equally"] },
          exp: { es: "La nobleza y el clero estaban exentos de la mayoría de impuestos; el peso fiscal recaía sobre el Tercer Estado: campesinos, burguesía y artesanos.", en: "The nobility and clergy were exempt from most taxes; the fiscal burden fell on the Third Estate: peasants, bourgeoisie and artisans." } },
        { correct: 0,
          q: { es: "¿En qué año se tomó la Bastilla?", en: "In what year was the Bastille stormed?" },
          opts: { es: ["1789", "1792", "1799", "1804"], en: ["1789", "1792", "1799", "1804"] },
          exp: { es: "La toma de la Bastilla ocurrió el 14 de julio de 1789, fecha que hoy es la fiesta nacional de Francia.", en: "The storming of the Bastille took place on 14 July 1789, now France's national holiday." } },
        { correct: 0,
          q: { es: "¿Quién lideró el Comité de Salvación Pública durante el Terror?", en: "Who led the Committee of Public Safety during the Terror?" },
          opts: { es: ["Robespierre", "Napoleón", "Luis XVI", "Luis XVIII"], en: ["Robespierre", "Napoleon", "Louis XVI", "Louis XVIII"] },
          exp: { es: "Maximilien Robespierre encabezó el Comité de Salvación Pública. Fue guillotinado en julio de 1794, poniendo fin al Terror.", en: "Maximilien Robespierre led the Committee of Public Safety. He was guillotined in July 1794, ending the Terror." } }
      ],
      ai: {
        es: {
          explain: "<p>El <strong>Antiguo Régimen</strong> era el sistema social y político de Francia antes de 1789: una monarquía absoluta con la sociedad dividida en tres estamentos.</p><p>Nobleza y clero tenían privilegios y apenas pagaban impuestos; el Tercer Estado —el 97% de la población— sostenía al Estado pero no tenía poder político. Esa desigualdad, unida a la crisis financiera, es la causa de fondo de la Revolución.</p>",
          simple: "<p>Imagina un país con tres grupos. Dos de ellos —los nobles y la Iglesia— tienen tierras y cargos y no pagan impuestos. El tercero, que es casi todo el mundo, trabaja y paga todo, pero no decide nada.</p><p>Cuando el rey se queda sin dinero y sube más los impuestos, ese tercer grupo dice basta. Eso es 1789.</p>",
          example: "<p><strong>Ejemplo concreto:</strong> un campesino del Tercer Estado en 1788 entrega parte de su cosecha al señor (derechos feudales), paga el diezmo a la Iglesia y encima el impuesto real, la <em>taille</em>.</p><p>Un noble con más tierras que él no paga casi nada. Ese contraste aparece en los <em>Cuadernos de Quejas</em> redactados antes de los Estados Generales.</p>",
          quiz: "<p>Te pregunto: ¿qué diferencia hay entre la <strong>Asamblea Nacional</strong> de 1789 y la <strong>Convención Nacional</strong> de 1792?</p><p>Pista: piensa en qué forma de gobierno defendía cada una.</p>",
          summarize: "<p><strong>Resumen de tus apuntes:</strong> la Revolución Francesa (1789–1799) acaba con el Antiguo Régimen en tres fases:</p><p>1) <strong>1789</strong> — Estados Generales, Asamblea Nacional, toma de la Bastilla, Declaración de Derechos.<br>2) <strong>1792–1794</strong> — República, ejecución de Luis XVI, Terror de Robespierre.<br>3) <strong>1795–1799</strong> — Directorio, hasta el golpe de Napoleón.</p><p>Idea clave: el paso de la soberanía del rey a la nación.</p>"
        },
        en: {
          explain: "<p>The <strong>Ancien Régime</strong> was France's social and political system before 1789: an absolute monarchy with society split into three estates.</p><p>Nobility and clergy held privileges and paid almost no tax; the Third Estate — 97% of the population — supported the state but had no political power. That inequality, plus the financial crisis, is the root cause of the Revolution.</p>",
          simple: "<p>Picture a country with three groups. Two of them — the nobles and the Church — own land and offices and pay no tax. The third, which is almost everyone, works and pays for everything but decides nothing.</p><p>When the king runs out of money and raises taxes again, that third group says enough. That's 1789.</p>",
          example: "<p><strong>Concrete example:</strong> a Third-Estate peasant in 1788 gives part of his harvest to the lord (feudal dues), pays the tithe to the Church, and on top of that the royal tax, the <em>taille</em>.</p><p>A noble with more land than him pays almost nothing. That contrast appears in the <em>Cahiers de doléances</em> written before the Estates-General.</p>",
          quiz: "<p>Here's one for you: what's the difference between the <strong>National Assembly</strong> of 1789 and the <strong>National Convention</strong> of 1792?</p><p>Hint: think about which form of government each defended.</p>",
          summarize: "<p><strong>Summary of your notes:</strong> the French Revolution (1789–1799) ends the Ancien Régime in three phases:</p><p>1) <strong>1789</strong> — Estates-General, National Assembly, storming of the Bastille, Declaration of Rights.<br>2) <strong>1792–1794</strong> — Republic, execution of Louis XVI, Robespierre's Terror.<br>3) <strong>1795–1799</strong> — Directory, until Napoleon's coup.</p><p>Key idea: sovereignty moves from the king to the nation.</p>"
        }
      }
    },

    {
      id: "bio", name: { es: "Biología", en: "Biology" }, icon: "dna", color: "#5A54C9",
      mastery: 66, testsTaken: 3, lastSessionDays: 1,
      weak: { es: ["Diferencias entre mitosis y meiosis", "Cruce dihíbrido"], en: ["Mitosis vs meiosis", "Dihybrid cross"] },
      doc: {
        id: "bio-d1", kind: "pdf", pages: 14, sizeMB: "2.6",
        title: { es: "Genética y herencia.pdf", en: "Genetics and inheritance.pdf" },
        analysis: {
          concepts: 21, difficulty: "med", topicsN: 5, readMin: 10,
          main: {
            es: ["ADN y genes", "Mitosis", "Meiosis", "Alelos dominantes y recesivos", "Leyes de Mendel", "Genotipo y fenotipo"],
            en: ["DNA and genes", "Mitosis", "Meiosis", "Dominant and recessive alleles", "Mendel's laws", "Genotype and phenotype"]
          },
          topics: {
            es: ["1 · El ADN y la información genética", "2 · División celular: mitosis", "3 · Meiosis y gametos", "4 · Herencia mendeliana", "5 · Genotipo, fenotipo y probabilidad"],
            en: ["1 · DNA and genetic information", "2 · Cell division: mitosis", "3 · Meiosis and gametes", "4 · Mendelian inheritance", "5 · Genotype, phenotype and probability"]
          }
        },
        summary: {
          es: "La genética estudia cómo se transmite la información hereditaria. El ADN contiene los genes, que se presentan en versiones alternativas llamadas alelos. La mitosis produce células idénticas para el crecimiento y la reparación; la meiosis produce gametos con la mitad de cromosomas y genera variabilidad. Las tres leyes de Mendel (uniformidad, segregación e independencia) explican las proporciones con que aparecen los caracteres en la descendencia.",
          en: "Genetics studies how hereditary information is passed on. DNA contains genes, which occur in alternative versions called alleles. Mitosis produces identical cells for growth and repair; meiosis produces gametes with half the chromosomes and generates variability. Mendel's three laws (uniformity, segregation and independent assortment) explain the ratios in which traits appear in offspring."
        }
      },
      flashcards: [
        { diff: "med",
          q: { es: "¿Qué diferencia hay entre gen y alelo?", en: "What's the difference between a gene and an allele?" },
          a: { es: "Un gen es un fragmento de ADN que determina un carácter; un alelo es cada una de las variantes posibles de ese gen (por ejemplo, 'flor púrpura' frente a 'flor blanca').", en: "A gene is a stretch of DNA that determines a trait; an allele is each possible variant of that gene (e.g. 'purple flower' vs 'white flower')." } },
        { diff: "easy",
          q: { es: "¿Cuál es el resultado de la mitosis?", en: "What is the result of mitosis?" },
          a: { es: "Dos células hijas genéticamente idénticas a la célula madre, con el mismo número de cromosomas.", en: "Two daughter cells genetically identical to the parent cell, with the same number of chromosomes." } },
        { diff: "med",
          q: { es: "¿Qué establece la ley de la segregación de Mendel?", en: "What does Mendel's law of segregation state?" },
          a: { es: "Los dos alelos de un gen se separan durante la formación de los gametos, de modo que cada gameto recibe solo uno.", en: "The two alleles of a gene separate during gamete formation, so each gamete receives only one." } },
        { diff: "hard",
          q: { es: "En un cruce dihíbrido AaBb × AaBb, ¿qué proporción fenotípica se obtiene?", en: "In a dihybrid cross AaBb × AaBb, what phenotypic ratio results?" },
          a: { es: "9 : 3 : 3 : 1, si los dos genes se distribuyen de forma independiente.", en: "9 : 3 : 3 : 1, if the two genes assort independently." } }
      ],
      quiz: [
        { correct: 0,
          q: { es: "En un cruce Aa × Aa, ¿qué proporción fenotípica se espera en la descendencia?", en: "In an Aa × Aa cross, what phenotypic ratio is expected in the offspring?" },
          opts: { es: ["3 dominante : 1 recesivo", "1 : 1", "9 : 3 : 3 : 1", "Todos dominantes"], en: ["3 dominant : 1 recessive", "1 : 1", "9 : 3 : 3 : 1", "All dominant"] },
          exp: { es: "Un cruce monohíbrido entre dos heterocigotos (Aa × Aa) produce 1 AA : 2 Aa : 1 aa, es decir 3 individuos con fenotipo dominante por cada 1 recesivo.", en: "A monohybrid cross between two heterozygotes (Aa × Aa) yields 1 AA : 2 Aa : 1 aa, i.e. 3 dominant-phenotype individuals for every 1 recessive." } },
        { correct: 0,
          q: { es: "¿Cuántos cromosomas tiene un gameto humano?", en: "How many chromosomes does a human gamete have?" },
          opts: { es: ["23", "46", "92", "22"], en: ["23", "46", "92", "22"] },
          exp: { es: "Los gametos son haploides (n = 23). Al unirse óvulo y espermatozoide se restablece el número diploide (2n = 46).", en: "Gametes are haploid (n = 23). When egg and sperm fuse, the diploid number is restored (2n = 46)." } },
        { correct: 0,
          q: { es: "¿Qué proceso genera variabilidad genética en la descendencia?", en: "Which process generates genetic variability in offspring?" },
          opts: { es: ["Meiosis", "Mitosis", "Replicación del ADN", "Traducción"], en: ["Meiosis", "Mitosis", "DNA replication", "Translation"] },
          exp: { es: "La meiosis genera variabilidad por el entrecruzamiento (recombinación) y la distribución al azar de los cromosomas hacia los gametos.", en: "Meiosis generates variability through crossing over (recombination) and the random assortment of chromosomes into gametes." } }
      ],
      ai: {
        es: {
          explain: "<p>La <strong>ley de la segregación</strong> dice que los dos alelos de un gen se separan al formarse los gametos: cada óvulo o espermatozoide lleva <strong>solo uno</strong>.</p><p>Por eso, al cruzar dos heterocigotos (Aa × Aa), los gametos posibles son A o a con igual probabilidad, y la descendencia sale 1 AA : 2 Aa : 1 aa → 3:1 en fenotipo.</p>",
          simple: "<p>Cada carácter tiene <strong>dos cartas</strong>, una de tu madre y otra de tu padre. Al crear un gameto, metes <strong>una sola carta</strong> en el sobre, al azar.</p><p>Tu descendiente abrirá su sobre y el tuyo y se quedará con esa pareja. Eso es la segregación.</p>",
          example: "<p><strong>Ejemplo:</strong> el color de la flor del guisante. A = púrpura (dominante), a = blanca (recesiva).</p><p>Cruzas Aa × Aa. Los gametos son A o a. Combinándolos: AA, Aa, Aa, aa → 3 flores púrpuras y 1 blanca. Ratio 3:1.</p>",
          quiz: "<p>Comprobemos: en un cruce <strong>AaBb × AaBb</strong> con genes independientes, ¿qué proporción fenotípica esperas?</p><p>Piensa en cada gen por separado y luego combínalos.</p>",
          summarize: "<p><strong>Resumen:</strong> el ADN contiene los genes; cada gen tiene alelos. La mitosis da 2 células idénticas (crecimiento); la meiosis da 4 gametos haploides con variabilidad.</p><p>Leyes de Mendel: uniformidad (F1 igual), segregación (los alelos se separan, 3:1) e independencia (9:3:3:1 en dihíbridos).</p>"
        },
        en: {
          explain: "<p>The <strong>law of segregation</strong> says the two alleles of a gene separate when gametes form: each egg or sperm carries <strong>only one</strong>.</p><p>So crossing two heterozygotes (Aa × Aa), the possible gametes are A or a with equal probability, and offspring come out 1 AA : 2 Aa : 1 aa → 3:1 in phenotype.</p>",
          simple: "<p>Each trait has <strong>two cards</strong>, one from your mother and one from your father. When you make a gamete, you put <strong>just one card</strong> in the envelope, at random.</p><p>Your offspring opens their envelope and yours and keeps that pair. That's segregation.</p>",
          example: "<p><strong>Example:</strong> pea flower colour. A = purple (dominant), a = white (recessive).</p><p>Cross Aa × Aa. Gametes are A or a. Combining them: AA, Aa, Aa, aa → 3 purple flowers and 1 white. Ratio 3:1.</p>",
          quiz: "<p>Let's check: in an <strong>AaBb × AaBb</strong> cross with independent genes, what phenotypic ratio do you expect?</p><p>Think about each gene separately, then combine them.</p>",
          summarize: "<p><strong>Summary:</strong> DNA holds the genes; each gene has alleles. Mitosis gives 2 identical cells (growth); meiosis gives 4 haploid gametes with variability.</p><p>Mendel's laws: uniformity (F1 alike), segregation (alleles separate, 3:1) and independent assortment (9:3:3:1 in dihybrids).</p>"
        }
      }
    },

    {
      id: "mat", name: { es: "Matemáticas", en: "Mathematics" }, icon: "sigma", color: "#3E8E6F",
      mastery: 51, testsTaken: 1, lastSessionDays: 4,
      weak: { es: ["Regla de la cadena", "Problemas de optimización"], en: ["Chain rule", "Optimisation problems"] },
      doc: {
        id: "mat-d1", kind: "pdf", pages: 11, sizeMB: "1.7",
        title: { es: "Derivadas.pdf", en: "Derivatives.pdf" },
        analysis: {
          concepts: 18, difficulty: "hard", topicsN: 5, readMin: 9,
          main: {
            es: ["Concepto de límite", "Tasa de variación media e instantánea", "Definición de derivada", "Reglas de derivación", "Regla de la cadena", "Máximos y mínimos"],
            en: ["Concept of limit", "Average and instantaneous rate of change", "Definition of derivative", "Differentiation rules", "Chain rule", "Maxima and minima"]
          },
          topics: {
            es: ["1 · Límites y continuidad", "2 · La derivada como límite", "3 · Reglas de derivación", "4 · Regla de la cadena", "5 · Aplicaciones: crecimiento, máximos y mínimos"],
            en: ["1 · Limits and continuity", "2 · The derivative as a limit", "3 · Differentiation rules", "4 · The chain rule", "5 · Applications: growth, maxima and minima"]
          }
        },
        summary: {
          es: "La derivada de una función en un punto mide su ritmo de cambio instantáneo y coincide con la pendiente de la recta tangente. Se define como el límite de la tasa de variación media cuando el incremento tiende a cero. A partir de esa definición se obtienen reglas prácticas (suma, producto, cociente y cadena) que permiten derivar sin calcular límites, y que se aplican al estudio del crecimiento y a la búsqueda de máximos y mínimos.",
          en: "The derivative of a function at a point measures its instantaneous rate of change and equals the slope of the tangent line. It is defined as the limit of the average rate of change as the increment tends to zero. From that definition come practical rules (sum, product, quotient and chain) that let you differentiate without computing limits, and that apply to studying growth and finding maxima and minima."
        }
      },
      flashcards: [
        { diff: "easy",
          q: { es: "¿Qué representa geométricamente la derivada de f en x = a?", en: "What does the derivative of f at x = a represent geometrically?" },
          a: { es: "La pendiente de la recta tangente a la gráfica de f en el punto (a, f(a)).", en: "The slope of the tangent line to the graph of f at the point (a, f(a))." } },
        { diff: "med",
          q: { es: "Escribe la definición de derivada como límite.", en: "Write the definition of the derivative as a limit." },
          a: { es: "f'(a) = lím(h→0) [f(a+h) − f(a)] / h.", en: "f'(a) = lim(h→0) [f(a+h) − f(a)] / h." } },
        { diff: "easy",
          q: { es: "¿Cuál es la derivada de f(x) = xⁿ?", en: "What is the derivative of f(x) = xⁿ?" },
          a: { es: "f'(x) = n·xⁿ⁻¹ (regla de la potencia).", en: "f'(x) = n·xⁿ⁻¹ (power rule)." } },
        { diff: "hard",
          q: { es: "Deriva f(x) = sen(3x²) usando la regla de la cadena.", en: "Differentiate f(x) = sin(3x²) using the chain rule." },
          a: { es: "f'(x) = cos(3x²) · 6x. Se deriva la función externa (seno) y se multiplica por la derivada de la interna (3x²).", en: "f'(x) = cos(3x²) · 6x. Differentiate the outer function (sine) and multiply by the derivative of the inner one (3x²)." } }
      ],
      quiz: [
        { correct: 0,
          q: { es: "La derivada de f(x) = 5x³ es:", en: "The derivative of f(x) = 5x³ is:" },
          opts: { es: ["15x²", "5x²", "15x³", "x²"], en: ["15x²", "5x²", "15x³", "x²"] },
          exp: { es: "Por la regla de la potencia: la derivada de 5x³ es 5·3·x² = 15x².", en: "By the power rule: the derivative of 5x³ is 5·3·x² = 15x²." } },
        { correct: 0,
          q: { es: "Si f'(a) = 0 y f''(a) < 0, en x = a hay:", en: "If f'(a) = 0 and f''(a) < 0, at x = a there is:" },
          opts: { es: ["Un máximo local", "Un mínimo local", "Un punto de inflexión", "Una asíntota"], en: ["A local maximum", "A local minimum", "An inflection point", "An asymptote"] },
          exp: { es: "Derivada primera nula (punto crítico) y segunda derivada negativa: la función es cóncava hacia abajo, es decir, un máximo local.", en: "First derivative zero (critical point) and negative second derivative: the function is concave down, i.e. a local maximum." } },
        { correct: 0,
          q: { es: "La derivada de un producto f·g es:", en: "The derivative of a product f·g is:" },
          opts: { es: ["f'·g + f·g'", "f'·g'", "f'·g − f·g'", "(f'·g − f·g') / g²"], en: ["f'·g + f·g'", "f'·g'", "f'·g − f·g'", "(f'·g − f·g') / g²"] },
          exp: { es: "Regla del producto: (f·g)' = f'·g + f·g'. La opción con g² en el denominador es la regla del cociente.", en: "Product rule: (f·g)' = f'·g + f·g'. The option with g² in the denominator is the quotient rule." } }
      ],
      ai: {
        es: {
          explain: "<p>La <strong>derivada</strong> mide cómo cambia una función. Si f(t) es la posición de un coche en el instante t, f'(t) es su velocidad: cuánto cambia la posición por cada unidad de tiempo.</p><p>Formalmente es el límite de [f(a+h) − f(a)]/h cuando h → 0, es decir, la pendiente de la recta tangente en ese punto.</p>",
          simple: "<p>Piensa en subir una montaña. La derivada en un punto es lo empinada que está la cuesta justo ahí: positiva si subes, negativa si bajas y cero en la cima o en el valle. Nada más.</p>",
          example: "<p><strong>Ejemplo:</strong> f(x) = x². Su derivada es f'(x) = 2x.</p><p>En x = 3 la pendiente vale 6: la recta tangente sube 6 unidades por cada unidad que avanzas en x. En x = 0 la derivada es 0: la parábola tiene ahí su mínimo.</p>",
          quiz: "<p>Comprobemos: si f(x) = x³ − 3x, ¿en qué valores de x tiene la función un máximo o un mínimo?</p><p>Pista: resuelve f'(x) = 0 y estudia el signo.</p>",
          summarize: "<p><strong>Resumen:</strong> derivada = ritmo de cambio = pendiente de la tangente, definida como límite de la tasa de variación media.</p><p>Reglas clave: potencia (xⁿ → n·xⁿ⁻¹), suma, producto, cociente y cadena. Aplicaciones: el signo de f' indica crecimiento/decrecimiento; f'(a) = 0 da puntos críticos; el signo de f'' distingue máximos de mínimos.</p>"
        },
        en: {
          explain: "<p>The <strong>derivative</strong> measures how a function changes. If f(t) is a car's position at time t, f'(t) is its speed: how much the position changes per unit of time.</p><p>Formally it's the limit of [f(a+h) − f(a)]/h as h → 0, that is, the slope of the tangent line at that point.</p>",
          simple: "<p>Think of climbing a mountain. The derivative at a point is how steep the slope is right there: positive going up, negative going down, and zero at the peak or the valley. That's it.</p>",
          example: "<p><strong>Example:</strong> f(x) = x². Its derivative is f'(x) = 2x.</p><p>At x = 3 the slope is 6: the tangent line rises 6 units for every unit you move in x. At x = 0 the derivative is 0: the parabola has its minimum there.</p>",
          quiz: "<p>Let's check: if f(x) = x³ − 3x, at what values of x does the function have a maximum or a minimum?</p><p>Hint: solve f'(x) = 0 and study the sign.</p>",
          summarize: "<p><strong>Summary:</strong> derivative = rate of change = slope of the tangent, defined as the limit of the average rate of change.</p><p>Key rules: power (xⁿ → n·xⁿ⁻¹), sum, product, quotient and chain. Applications: the sign of f' shows increase/decrease; f'(a) = 0 gives critical points; the sign of f'' tells maxima from minima.</p>"
        }
      }
    },

    {
      id: "eco", name: { es: "Economía", en: "Economics" }, icon: "coins", color: "#4B6FB0",
      mastery: 43, testsTaken: 0, lastSessionDays: 7,
      weak: { es: ["Elasticidad precio de la demanda", "Desplazamientos frente a movimientos"], en: ["Price elasticity of demand", "Shifts vs movements"] },
      doc: {
        id: "eco-d1", kind: "pdf", pages: 12, sizeMB: "2.1",
        title: { es: "Oferta y demanda.pdf", en: "Supply and demand.pdf" },
        analysis: {
          concepts: 19, difficulty: "med", topicsN: 5, readMin: 11,
          main: {
            es: ["Escasez y elección", "Ley de la demanda", "Ley de la oferta", "Precio de equilibrio", "Elasticidad", "Coste de oportunidad"],
            en: ["Scarcity and choice", "Law of demand", "Law of supply", "Equilibrium price", "Elasticity", "Opportunity cost"]
          },
          topics: {
            es: ["1 · Escasez, elección y coste de oportunidad", "2 · La demanda y sus determinantes", "3 · La oferta y sus determinantes", "4 · El equilibrio de mercado", "5 · Elasticidad"],
            en: ["1 · Scarcity, choice and opportunity cost", "2 · Demand and its determinants", "3 · Supply and its determinants", "4 · Market equilibrium", "5 · Elasticity"]
          }
        },
        summary: {
          es: "El mercado coordina las decisiones de compradores y vendedores a través del precio. La ley de la demanda dice que, si todo lo demás permanece constante, al subir el precio se demanda menos; la ley de la oferta, que al subir el precio se ofrece más. El punto donde ambas curvas se cruzan es el precio de equilibrio. La elasticidad mide cuánto reacciona la cantidad ante cambios en el precio.",
          en: "The market coordinates the decisions of buyers and sellers through price. The law of demand says that, all else equal, a higher price means less is demanded; the law of supply, that a higher price means more is supplied. Where the two curves cross is the equilibrium price. Elasticity measures how much quantity reacts to price changes."
        }
      },
      flashcards: [
        { diff: "easy",
          q: { es: "¿Qué es el coste de oportunidad?", en: "What is opportunity cost?" },
          a: { es: "El valor de la mejor alternativa a la que se renuncia al tomar una decisión.", en: "The value of the best alternative given up when making a decision." } },
        { diff: "med",
          q: { es: "¿Qué provoca un desplazamiento de la curva de demanda (no un movimiento a lo largo de ella)?", en: "What causes a shift of the demand curve (not a movement along it)?" },
          a: { es: "Un cambio en un determinante distinto del precio: renta, gustos, precio de bienes relacionados o expectativas.", en: "A change in a determinant other than price: income, tastes, prices of related goods or expectations." } },
        { diff: "med",
          q: { es: "¿Qué ocurre en un mercado si el precio está por encima del de equilibrio?", en: "What happens in a market if the price is above equilibrium?" },
          a: { es: "Hay exceso de oferta (excedente): los vendedores bajan el precio hasta volver al equilibrio.", en: "There is excess supply (a surplus): sellers cut the price until it returns to equilibrium." } },
        { diff: "hard",
          q: { es: "¿Cuándo se dice que una demanda es elástica?", en: "When is demand said to be elastic?" },
          a: { es: "Cuando su elasticidad-precio es mayor que 1 en valor absoluto: la cantidad varía proporcionalmente más que el precio.", en: "When its price elasticity is greater than 1 in absolute value: quantity varies proportionally more than price." } }
      ],
      quiz: [
        { correct: 0,
          q: { es: "Si sube el precio de un bien y todo lo demás no cambia, la cantidad demandada:", en: "If a good's price rises and nothing else changes, the quantity demanded:" },
          opts: { es: ["Disminuye", "Aumenta", "No varía", "Se duplica"], en: ["Falls", "Rises", "Stays the same", "Doubles"] },
          exp: { es: "Es la ley de la demanda: relación inversa entre precio y cantidad demandada, manteniendo constante el resto (ceteris paribus).", en: "It's the law of demand: an inverse relationship between price and quantity demanded, holding all else constant (ceteris paribus)." } },
        { correct: 0,
          q: { es: "El precio de equilibrio es aquel en el que:", en: "The equilibrium price is the one at which:" },
          opts: { es: ["La cantidad ofrecida es igual a la demandada", "La oferta es máxima", "La demanda es cero", "El Estado fija el precio"], en: ["Quantity supplied equals quantity demanded", "Supply is at its maximum", "Demand is zero", "The state sets the price"] },
          exp: { es: "En el equilibrio no hay ni escasez ni excedente: lo que los vendedores quieren vender coincide con lo que los compradores quieren comprar.", en: "At equilibrium there is neither shortage nor surplus: what sellers want to sell equals what buyers want to buy." } },
        { correct: 0,
          q: { es: "Una bajada de la renta de los consumidores desplaza la curva de demanda de un bien normal:", en: "A fall in consumers' income shifts the demand curve of a normal good:" },
          opts: { es: ["Hacia la izquierda", "Hacia la derecha", "No la desplaza", "La vuelve vertical"], en: ["To the left", "To the right", "It doesn't shift it", "It makes it vertical"] },
          exp: { es: "En un bien normal, menos renta significa menos demanda a cada precio: la curva se desplaza hacia la izquierda.", en: "For a normal good, less income means less demand at every price: the curve shifts to the left." } }
      ],
      ai: {
        es: {
          explain: "<p>La <strong>demanda</strong> describe cuánto están dispuestos a comprar los consumidores a cada precio. La <strong>ley de la demanda</strong> dice que, si nada más cambia, a mayor precio menor cantidad demandada: por eso la curva tiene pendiente negativa.</p><p>Ojo: un cambio de precio te mueve <em>a lo largo</em> de la curva; un cambio en la renta o los gustos <em>desplaza</em> toda la curva.</p>",
          simple: "<p>Cuanto más caro está algo, menos gente lo compra. Cuanto mejor pagado está venderlo, más empresas lo fabrican. El precio se queda donde esas dos fuerzas se equilibran.</p>",
          example: "<p><strong>Ejemplo:</strong> entradas de conciertos. Si el precio pasa de 40 € a 80 €, muchos deciden no ir: bajamos por la curva de demanda.</p><p>Pero si actúa un artista de moda, a <em>cualquier</em> precio quiere ir más gente: la curva entera se desplaza a la derecha y el precio de equilibrio sube.</p>",
          quiz: "<p>Piensa: si el gobierno fija un precio máximo del alquiler <strong>por debajo</strong> del de equilibrio, ¿qué pasa con la cantidad de pisos ofrecidos y con las listas de espera?</p>",
          summarize: "<p><strong>Resumen:</strong> el mercado equilibra oferta y demanda a través del precio.</p><p>Demanda: relación inversa precio-cantidad; se desplaza por renta, gustos y bienes relacionados. Oferta: relación directa; se desplaza por costes y tecnología. Equilibrio: donde se cruzan. Elasticidad: sensibilidad de la cantidad al precio (>1 elástica, <1 inelástica).</p>"
        },
        en: {
          explain: "<p><strong>Demand</strong> describes how much consumers are willing to buy at each price. The <strong>law of demand</strong> says that, all else equal, a higher price means a lower quantity demanded: that's why the curve slopes down.</p><p>Note: a price change moves you <em>along</em> the curve; a change in income or tastes <em>shifts</em> the whole curve.</p>",
          simple: "<p>The more expensive something is, the fewer people buy it. The better paid it is to sell it, the more firms make it. The price settles where those two forces balance.</p>",
          example: "<p><strong>Example:</strong> concert tickets. If the price goes from €40 to €80, many decide not to go: we move down the demand curve.</p><p>But if a trending artist performs, more people want to go at <em>any</em> price: the whole curve shifts right and the equilibrium price rises.</p>",
          quiz: "<p>Think: if the government sets a maximum rent <strong>below</strong> equilibrium, what happens to the number of flats offered and to the waiting lists?</p>",
          summarize: "<p><strong>Summary:</strong> the market balances supply and demand through price.</p><p>Demand: inverse price-quantity relationship; shifts with income, tastes and related goods. Supply: direct relationship; shifts with costs and technology. Equilibrium: where they cross. Elasticity: how sensitive quantity is to price (>1 elastic, <1 inelastic).</p>"
        }
      }
    }
  ];

  var TREND = [8, 14, 10, 0, 22, 18, 26, 15, 0, 12, 20, 24, 16, 14];

  /* per-subject study content for the new review modes */
  var EXTRA_STUDY = {
    hist: {
      fill: [
        { s: { es: "La toma de la ___ fue uno de los acontecimientos simbólicos de la Revolución Francesa.", en: "The storming of the ___ was one of the symbolic events of the French Revolution." }, a: { es: "Bastilla", en: "Bastille" } },
        { s: { es: "El Tercer Estado se proclamó Asamblea ___ en 1789.", en: "The Third Estate declared itself the ___ Assembly in 1789." }, a: { es: "Nacional", en: "National" } },
        { s: { es: "El período de ejecuciones masivas dirigido por Robespierre se conoce como el ___.", en: "The period of mass executions led by Robespierre is known as the ___." }, a: { es: "Terror", en: "Terror" } }
      ],
      match: [
        { t: { es: "Antiguo Régimen", en: "Ancien Régime" }, d: { es: "Sistema social y político anterior a 1789", en: "Social and political system before 1789" } },
        { t: { es: "Bastilla", en: "Bastille" }, d: { es: "Prisión-fortaleza tomada el 14 de julio de 1789", en: "Fortress-prison stormed on 14 July 1789" } },
        { t: { es: "Robespierre", en: "Robespierre" }, d: { es: "Líder del Comité de Salvación Pública", en: "Leader of the Committee of Public Safety" } }
      ]
    },
    bio: {
      fill: [
        { s: { es: "Los dos alelos de un gen se separan durante la formación de los ___.", en: "The two alleles of a gene separate during the formation of ___." }, a: { es: "gametos", en: "gametes" } },
        { s: { es: "La ___ produce dos células hijas idénticas a la célula madre.", en: "___ produces two daughter cells identical to the parent cell." }, a: { es: "mitosis", en: "mitosis" } },
        { s: { es: "Un individuo con dos alelos distintos para un gen es ___.", en: "An individual with two different alleles for a gene is ___." }, a: { es: "heterocigoto", en: "heterozygous" } }
      ],
      match: [
        { t: { es: "Alelo", en: "Allele" }, d: { es: "Cada variante posible de un gen", en: "Each possible variant of a gene" } },
        { t: { es: "Mitosis", en: "Mitosis" }, d: { es: "División que da dos células idénticas", en: "Division giving two identical cells" } },
        { t: { es: "Meiosis", en: "Meiosis" }, d: { es: "División que produce gametos con variabilidad", en: "Division producing gametes with variability" } }
      ]
    },
    mat: {
      fill: [
        { s: { es: "La derivada de una función en un punto es la ___ de la recta tangente.", en: "The derivative of a function at a point is the ___ of the tangent line." }, a: { es: "pendiente", en: "slope" } },
        { s: { es: "Si f'(a) = 0 y f''(a) < 0, en x = a hay un ___.", en: "If f'(a) = 0 and f''(a) < 0, at x = a there is a ___." }, a: { es: "máximo", en: "maximum" } },
        { s: { es: "Los números que usamos para contar (1, 2, 3…) se llaman números ___.", en: "The numbers we use to count (1, 2, 3…) are called ___ numbers." }, a: { es: "naturales", en: "natural" } }
      ],
      match: [
        { t: { es: "Derivada", en: "Derivative" }, d: { es: "Pendiente de la recta tangente", en: "Slope of the tangent line" } },
        { t: { es: "Límite", en: "Limit" }, d: { es: "Valor al que se acerca una función", en: "Value a function approaches" } },
        { t: { es: "Regla de la cadena", en: "Chain rule" }, d: { es: "Método para derivar funciones compuestas", en: "Method to differentiate composite functions" } }
      ]
    },
    eco: {
      fill: [
        { s: { es: "El precio donde la cantidad ofrecida es igual a la demandada es el precio de ___.", en: "The price where quantity supplied equals quantity demanded is the ___ price." }, a: { es: "equilibrio", en: "equilibrium" } },
        { s: { es: "La subida generalizada y sostenida de los precios es la ___.", en: "A general, sustained rise in prices is ___." }, a: { es: "inflación", en: "inflation" } },
        { s: { es: "Si sube el precio de un bien, la cantidad demandada ___.", en: "If a good's price rises, the quantity demanded ___." }, a: { es: "disminuye", en: "falls" } }
      ],
      match: [
        { t: { es: "Demanda", en: "Demand" }, d: { es: "Lo que los consumidores quieren comprar", en: "What consumers want to buy" } },
        { t: { es: "Oferta", en: "Supply" }, d: { es: "Lo que las empresas quieren vender", en: "What firms want to sell" } },
        { t: { es: "Elasticidad", en: "Elasticity" }, d: { es: "Sensibilidad de la cantidad al precio", en: "How sensitive quantity is to price" } }
      ]
    }
  };

  /* ================= PLANS + USAGE (simulated) ================= */
  var PLANS = {
    free: { key: "free", price: { m: 0, y: 0 },
      limits: { aiMessages: 20, files: 3, tests: 5, flashcards: 20, podcasts: 0, presentations: 0, conceptMaps: 2, subjects: 3 }, pers: "basic" },
    plus: { key: "plus", price: { m: 7.99, y: 79.99 }, popular: true,
      limits: { aiMessages: 300, files: 30, tests: 50, flashcards: 200, podcasts: 10, presentations: 5, conceptMaps: 20, subjects: 10 }, pers: "full" },
    pro: { key: "pro", price: { m: 14.99, y: 149.99 },
      limits: { aiMessages: 1000, files: 100, tests: 200, flashcards: 1000, podcasts: 30, presentations: 20, conceptMaps: 100, subjects: Infinity }, pers: "full" }
  };
  var PLAN_KEYS = ["free", "plus", "pro"];
  var CMP_ROWS = ["aiMessages", "files", "tests", "flashcards", "podcasts", "presentations", "conceptMaps", "subjects"];
  var METER_ROWS = ["aiMessages", "files", "tests", "flashcards"];
  var BASIC_ACCENTS = ["violet", "blue"];

  /* per-subject exercise banks for "ponme un ejercicio" — 3 niveles, con solución por pasos */
  var EXERCISES = {
    hist: {
      es: {
        easy: [
          { q: "¿En qué año se tomó la Bastilla y qué simbolizó?", steps: ["La fecha exacta es el 14 de julio de 1789.", "La Bastilla era una prisión-fortaleza que representaba el poder absoluto del rey.", "Su asalto marcó el paso de la autoridad al pueblo."], a: "1789; simbolizó el inicio de la Revolución y el fin del poder absoluto." },
          { q: "¿Qué tres estamentos formaban la sociedad del Antiguo Régimen?", steps: ["Dos estamentos privilegiados y uno no privilegiado.", "Nobleza y clero apenas pagaban impuestos.", "El Tercer Estado (pueblo llano) soportaba la carga fiscal."], a: "Nobleza, clero y Tercer Estado." },
          { q: "¿Quién era el rey de Francia al empezar la Revolución y qué le ocurrió?", steps: ["Monarca absoluto de la casa de Borbón.", "Perdió el poder con la Revolución y fue juzgado por la Convención."], a: "Luis XVI; fue ejecutado en la guillotina en enero de 1793." }
        ],
        med: [
          { q: "Explica en 3 líneas por qué la convocatoria de los Estados Generales desató la crisis de 1789.", steps: ["Francia estaba en bancarrota y el rey necesitaba aprobar nuevos impuestos.", "El Tercer Estado exigió voto por cabeza y no por estamento.", "Al bloquearse la votación, se proclamó Asamblea Nacional: ruptura con el orden estamental."], a: "La crisis fiscal obligó a convocarlos; el conflicto sobre cómo votar llevó al Tercer Estado a constituirse en Asamblea Nacional." },
          { q: "Ordena cronológicamente: toma de la Bastilla, ejecución de Luis XVI, Declaración de Derechos, golpe de Napoleón.", steps: ["Toma de la Bastilla: 14 de julio de 1789.", "Declaración de los Derechos del Hombre: agosto de 1789.", "Ejecución de Luis XVI: enero de 1793.", "Golpe de Napoleón (18 de brumario): 1799."], a: "Bastilla → Declaración de Derechos → ejecución de Luis XVI → golpe de Napoleón." },
          { q: "¿Qué fue el Terror y quién lo dirigió?", steps: ["Fase de 1793–1794 de represión sistemática contra los llamados enemigos de la Revolución.", "Lo dirigió el Comité de Salvación Pública.", "Su figura principal fue Robespierre; terminó con su caída en Termidor (julio de 1794)."], a: "Un periodo de represión y ejecuciones masivas (1793–1794) dirigido por Robespierre desde el Comité de Salvación Pública." }
        ],
        hard: [
          { q: "Compara los objetivos de girondinos y jacobinos en 1793.", steps: ["Girondinos: burguesía moderada, república descentralizada, frenar la radicalización.", "Jacobinos: apoyados por los sans-culottes de París, gobierno central fuerte, medidas radicales.", "Los jacobinos se impusieron en 1793 y abrieron el Terror."], a: "Girondinos moderados y federalistas frente a jacobinos radicales y centralistas; vencieron los jacobinos." },
          { q: "¿Qué papel jugaron los sans-culottes de París en la radicalización de la Revolución?", steps: ["Eran artesanos y trabajadores urbanos de París.", "Presionaban mediante jornadas revolucionarias: asaltos y manifestaciones armadas.", "Empujaron medidas como la Ley del Máximo (control de precios) y la caída de los girondinos."], a: "Fueron la fuerza de choque popular que empujó la Revolución hacia posiciones cada vez más radicales." },
          { q: "Define «Antiguo Régimen» y cita dos de sus rasgos fiscales.", steps: ["Es el sistema político y social anterior a 1789.", "Se basaba en la monarquía absoluta de derecho divino y en la sociedad estamental.", "Rasgos fiscales: exención de impuestos de nobleza y clero; peso fiscal sobre el Tercer Estado; diezmo eclesiástico."], a: "El orden absolutista y estamental previo a la Revolución: nobleza y clero exentos, el Tercer Estado soportaba los impuestos." }
        ]
      },
      en: {
        easy: [
          { q: "In what year was the Bastille stormed, and what did it symbolise?", steps: ["The exact date is 14 July 1789.", "The Bastille was a fortress-prison standing for the king's absolute power.", "Its fall marked authority passing to the people."], a: "1789; it symbolised the start of the Revolution and the end of absolute power." },
          { q: "What three estates made up society under the Ancien Régime?", steps: ["Two privileged estates and one unprivileged.", "Nobility and clergy paid almost no tax.", "The Third Estate (commoners) carried the fiscal burden."], a: "Nobility, clergy and the Third Estate." },
          { q: "Who was the king of France at the start of the Revolution, and what happened to him?", steps: ["An absolute Bourbon monarch.", "He lost power in the Revolution and was tried by the Convention."], a: "Louis XVI; he was guillotined in January 1793." }
        ],
        med: [
          { q: "In 3 lines, explain why summoning the Estates-General triggered the 1789 crisis.", steps: ["France was bankrupt and the king needed to pass new taxes.", "The Third Estate demanded voting by head, not by estate.", "When the vote deadlocked, it proclaimed itself the National Assembly, breaking with the estate order."], a: "The fiscal crisis forced the summons; the dispute over how to vote led the Third Estate to form the National Assembly." },
          { q: "Put in chronological order: storming of the Bastille, execution of Louis XVI, Declaration of Rights, Napoleon's coup.", steps: ["Storming of the Bastille: 14 July 1789.", "Declaration of the Rights of Man: August 1789.", "Execution of Louis XVI: January 1793.", "Napoleon's coup (18 Brumaire): 1799."], a: "Bastille → Declaration of Rights → execution of Louis XVI → Napoleon's coup." },
          { q: "What was the Terror and who led it?", steps: ["A 1793–1794 phase of systematic repression against so-called enemies of the Revolution.", "It was run by the Committee of Public Safety.", "Its leading figure was Robespierre; it ended with his fall in Thermidor (July 1794)."], a: "A period of mass repression and executions (1793–1794) led by Robespierre through the Committee of Public Safety." }
        ],
        hard: [
          { q: "Compare the aims of the Girondins and the Jacobins in 1793.", steps: ["Girondins: moderate bourgeoisie, decentralised republic, slow the radicalisation.", "Jacobins: backed by the Paris sans-culottes, strong central government, radical measures.", "The Jacobins prevailed in 1793 and opened the Terror."], a: "Moderate, federalist Girondins versus radical, centralist Jacobins; the Jacobins won." },
          { q: "What role did the Paris sans-culottes play in the radicalisation of the Revolution?", steps: ["They were Paris artisans and urban workers.", "They applied pressure through revolutionary journées: assaults and armed demonstrations.", "They pushed measures such as the Law of the Maximum (price controls) and the fall of the Girondins."], a: "They were the popular strike force that pushed the Revolution toward ever more radical positions." },
          { q: "Define the 'Ancien Régime' and name two of its fiscal features.", steps: ["It is the political and social system before 1789.", "It rested on absolute monarchy by divine right and a society of estates.", "Fiscal features: tax exemption for nobility and clergy; fiscal burden on the Third Estate; the Church tithe."], a: "The absolutist, estate-based order before the Revolution: nobility and clergy exempt, the Third Estate bearing the taxes." }
        ]
      }
    },
    bio: {
      es: {
        easy: [
          { q: "Define «alelo» con un ejemplo.", steps: ["Un gen ocupa un lugar (locus) en el cromosoma.", "Un alelo es cada variante posible de ese gen.", "Ejemplo: el gen del color de la flor puede tener el alelo púrpura y el alelo blanco."], a: "Cada una de las formas alternativas de un mismo gen; por ejemplo, flor púrpura frente a blanca." },
          { q: "¿Qué significa que un individuo sea homocigoto?", steps: ["El prefijo homo- significa «igual».", "Tiene los dos alelos iguales para ese gen: AA o aa."], a: "Que porta dos alelos idénticos para el gen considerado." },
          { q: "¿Cuántas células hijas produce la mitosis y cómo son?", steps: ["La mitosis es una sola división.", "Reparte el material genético por igual entre las dos células."], a: "Dos células hijas genéticamente idénticas a la original (2n)." }
        ],
        med: [
          { q: "En un cruce Aa × Aa, calcula las proporciones genotípica y fenotípica.", steps: ["Haz el cuadro de Punnett con los gametos A y a de cada progenitor.", "Genotipos resultantes: 1 AA : 2 Aa : 1 aa.", "Si A domina sobre a, los fenotipos son 3 dominante : 1 recesivo."], a: "Proporción genotípica 1:2:1; proporción fenotípica 3:1." },
          { q: "Explica la diferencia entre mitosis y meiosis en número de divisiones y de células.", steps: ["Mitosis: 1 división → 2 células 2n idénticas.", "Meiosis: 2 divisiones → 4 células n.", "La meiosis reduce a la mitad el número de cromosomas y genera variabilidad."], a: "Mitosis: 1 división y 2 células 2n. Meiosis: 2 divisiones y 4 células n." },
          { q: "¿Por qué la meiosis genera variabilidad genética? Cita dos mecanismos.", steps: ["1) El entrecruzamiento (crossing-over) en la profase I: intercambio de fragmentos entre cromosomas homólogos.", "2) La segregación independiente de los homólogos en la anafase I."], a: "Por el entrecruzamiento y por la segregación independiente de los cromosomas homólogos." }
        ],
        hard: [
          { q: "Un individuo AaBb se autocruza. ¿Qué proporción fenotípica esperas si los genes son independientes?", steps: ["Cada gen da por separado una proporción 3:1.", "Al ser independientes, se multiplican: (3:1) × (3:1).", "Resultado: 9 A_B_ : 3 A_bb : 3 aaB_ : 1 aabb."], a: "9 : 3 : 3 : 1." },
          { q: "El daltonismo es recesivo ligado al X. Madre portadora × padre sano: ¿probabilidad de hijo varón daltónico?", steps: ["Madre XᴬXᵃ, padre XᴬY.", "Los hijos varones reciben la X de la madre: 1/2 Xᴬ (sano) y 1/2 Xᵃ (daltónico).", "Entre los varones, la mitad son daltónicos; sobre el total de la descendencia, 1/4."], a: "1/2 de los hijos varones; 1/4 del total de la descendencia." },
          { q: "Explica por qué un carácter recesivo puede «saltarse» generaciones.", steps: ["Los portadores heterocigotos (Aa) no manifiestan el carácter.", "Aun así, transmiten el alelo recesivo sin mostrarlo.", "El carácter reaparece cuando dos portadores tienen descendencia aa."], a: "Porque los heterocigotos portan el alelo sin expresarlo y lo transmiten a la siguiente generación." }
        ]
      },
      en: {
        easy: [
          { q: "Define 'allele' with an example.", steps: ["A gene occupies a place (locus) on the chromosome.", "An allele is each possible variant of that gene.", "Example: the flower-colour gene may have a purple allele and a white allele."], a: "Each of the alternative forms of the same gene; e.g. purple vs white flower." },
          { q: "What does it mean for an individual to be homozygous?", steps: ["The prefix homo- means 'same'.", "It has two identical alleles for that gene: AA or aa."], a: "It carries two identical alleles for the gene in question." },
          { q: "How many daughter cells does mitosis produce, and what are they like?", steps: ["Mitosis is a single division.", "It splits the genetic material equally between the two cells."], a: "Two daughter cells genetically identical to the original (2n)." }
        ],
        med: [
          { q: "In an Aa × Aa cross, work out the genotypic and phenotypic ratios.", steps: ["Draw the Punnett square with gametes A and a from each parent.", "Resulting genotypes: 1 AA : 2 Aa : 1 aa.", "If A is dominant over a, phenotypes are 3 dominant : 1 recessive."], a: "Genotypic ratio 1:2:1; phenotypic ratio 3:1." },
          { q: "Explain how mitosis and meiosis differ in number of divisions and resulting cells.", steps: ["Mitosis: 1 division → 2 identical 2n cells.", "Meiosis: 2 divisions → 4 n cells.", "Meiosis halves the chromosome number and generates variability."], a: "Mitosis: 1 division, 2 cells (2n). Meiosis: 2 divisions, 4 cells (n)." },
          { q: "Why does meiosis generate genetic variability? Name two mechanisms.", steps: ["1) Crossing-over in prophase I: exchange of fragments between homologous chromosomes.", "2) Independent assortment of the homologues in anaphase I."], a: "Through crossing-over and through the independent assortment of homologous chromosomes." }
        ],
        hard: [
          { q: "An AaBb individual self-crosses. What phenotypic ratio do you expect if the genes are independent?", steps: ["Each gene gives a 3:1 ratio on its own.", "Being independent, the ratios multiply: (3:1) × (3:1).", "Result: 9 A_B_ : 3 A_bb : 3 aaB_ : 1 aabb."], a: "9 : 3 : 3 : 1." },
          { q: "Colour blindness is X-linked recessive. Carrier mother × unaffected father: probability of a colour-blind son?", steps: ["Mother XᴬXᵃ, father XᴬY.", "Sons get their X from the mother: 1/2 Xᴬ (unaffected), 1/2 Xᵃ (colour-blind).", "Among sons, half are affected; of the whole offspring, 1/4."], a: "1/2 of the sons; 1/4 of the whole offspring." },
          { q: "Explain why a recessive trait can appear to 'skip' generations.", steps: ["Heterozygous carriers (Aa) do not show the trait.", "They still pass on the recessive allele without displaying it.", "The trait reappears when two carriers have aa offspring."], a: "Because heterozygotes carry the allele without expressing it and pass it to the next generation." }
        ]
      }
    },
    mat: {
      es: {
        easy: [
          { q: "Deriva f(x) = x³.", steps: ["Aplica la regla de la potencia: la derivada de xⁿ es n·xⁿ⁻¹.", "Aquí n = 3: baja el 3 como factor y resta 1 al exponente."], a: "f'(x) = 3x²." },
          { q: "Deriva f(x) = 5x.", steps: ["El exponente de x es 1.", "Regla de la potencia: 1·5·x⁰ = 5."], a: "f'(x) = 5." },
          { q: "Deriva f(x) = x² + 4.", steps: ["Deriva término a término.", "x² → 2x.", "La constante 4 tiene derivada 0."], a: "f'(x) = 2x." }
        ],
        med: [
          { q: "Deriva f(x) = 3x⁴ − 5x² + 2.", steps: ["Deriva cada término con la regla de la potencia.", "3x⁴ → 4·3x³ = 12x³.", "−5x² → −2·5x = −10x.", "La constante +2 → 0."], a: "f'(x) = 12x³ − 10x." },
          { q: "Halla la ecuación de la recta tangente a f(x) = x² en x = 2.", steps: ["Calcula el punto: f(2) = 4, así que es (2, 4).", "Deriva: f'(x) = 2x.", "Pendiente en x = 2: f'(2) = 4.", "Recta punto-pendiente: y − 4 = 4(x − 2)."], a: "y = 4x − 4." },
          { q: "Calcula los máximos y mínimos de f(x) = x³ − 3x.", steps: ["Deriva: f'(x) = 3x² − 3.", "Iguala a cero: 3x² − 3 = 0 → x = ±1.", "Segunda derivada: f''(x) = 6x.", "f''(1) = 6 > 0 → mínimo; f''(−1) = −6 < 0 → máximo."], a: "Máximo en x = −1 (valor 2); mínimo en x = 1 (valor −2)." }
        ],
        hard: [
          { q: "Deriva f(x) = (2x + 1)⁵ usando la regla de la cadena.", steps: ["Función externa: u⁵, con u = 2x + 1.", "Deriva la externa: 5u⁴.", "Multiplica por la derivada de la interna: u' = 2.", "Junta: 5(2x + 1)⁴ · 2."], a: "f'(x) = 10(2x + 1)⁴." },
          { q: "Deriva f(x) = x²·eˣ.", steps: ["Es un producto: usa (u·v)' = u'v + uv'.", "u = x² → u' = 2x; v = eˣ → v' = eˣ.", "f'(x) = 2x·eˣ + x²·eˣ.", "Saca factor común eˣ."], a: "f'(x) = eˣ(x² + 2x)." },
          { q: "Aplica la definición de derivada como límite a f(x) = x².", steps: ["Escribe el cociente incremental: [f(x+h) − f(x)] / h = [(x+h)² − x²] / h.", "Desarrolla (x+h)² = x² + 2xh + h².", "Simplifica: (2xh + h²) / h = 2x + h.", "Toma el límite cuando h → 0."], a: "f'(x) = 2x." }
        ]
      },
      en: {
        easy: [
          { q: "Differentiate f(x) = x³.", steps: ["Apply the power rule: the derivative of xⁿ is n·xⁿ⁻¹.", "Here n = 3: bring the 3 down as a factor and subtract 1 from the exponent."], a: "f'(x) = 3x²." },
          { q: "Differentiate f(x) = 5x.", steps: ["The exponent of x is 1.", "Power rule: 1·5·x⁰ = 5."], a: "f'(x) = 5." },
          { q: "Differentiate f(x) = x² + 4.", steps: ["Differentiate term by term.", "x² → 2x.", "The constant 4 has derivative 0."], a: "f'(x) = 2x." }
        ],
        med: [
          { q: "Differentiate f(x) = 3x⁴ − 5x² + 2.", steps: ["Differentiate each term with the power rule.", "3x⁴ → 4·3x³ = 12x³.", "−5x² → −2·5x = −10x.", "The constant +2 → 0."], a: "f'(x) = 12x³ − 10x." },
          { q: "Find the equation of the tangent line to f(x) = x² at x = 2.", steps: ["Find the point: f(2) = 4, so it is (2, 4).", "Differentiate: f'(x) = 2x.", "Slope at x = 2: f'(2) = 4.", "Point-slope line: y − 4 = 4(x − 2)."], a: "y = 4x − 4." },
          { q: "Find the maxima and minima of f(x) = x³ − 3x.", steps: ["Differentiate: f'(x) = 3x² − 3.", "Set to zero: 3x² − 3 = 0 → x = ±1.", "Second derivative: f''(x) = 6x.", "f''(1) = 6 > 0 → minimum; f''(−1) = −6 < 0 → maximum."], a: "Maximum at x = −1 (value 2); minimum at x = 1 (value −2)." }
        ],
        hard: [
          { q: "Differentiate f(x) = (2x + 1)⁵ using the chain rule.", steps: ["Outer function: u⁵, with u = 2x + 1.", "Differentiate the outer: 5u⁴.", "Multiply by the derivative of the inner: u' = 2.", "Combine: 5(2x + 1)⁴ · 2."], a: "f'(x) = 10(2x + 1)⁴." },
          { q: "Differentiate f(x) = x²·eˣ.", steps: ["It is a product: use (u·v)' = u'v + uv'.", "u = x² → u' = 2x; v = eˣ → v' = eˣ.", "f'(x) = 2x·eˣ + x²·eˣ.", "Factor out eˣ."], a: "f'(x) = eˣ(x² + 2x)." },
          { q: "Apply the limit definition of the derivative to f(x) = x².", steps: ["Write the difference quotient: [f(x+h) − f(x)] / h = [(x+h)² − x²] / h.", "Expand (x+h)² = x² + 2xh + h².", "Simplify: (2xh + h²) / h = 2x + h.", "Take the limit as h → 0."], a: "f'(x) = 2x." }
        ]
      }
    },
    eco: {
      es: {
        easy: [
          { q: "Según la ley de la demanda, ¿qué le pasa a la cantidad demandada si sube el precio?", steps: ["La ley de la demanda describe una relación inversa entre precio y cantidad demandada.", "Se cumple manteniendo constante todo lo demás (ceteris paribus)."], a: "Disminuye." },
          { q: "Define «precio de equilibrio».", steps: ["Es el precio en el que se cruzan la oferta y la demanda.", "A ese precio, la cantidad ofrecida es igual a la cantidad demandada."], a: "El precio al que la cantidad ofrecida iguala a la demandada: no hay ni escasez ni excedente." },
          { q: "Pon un ejemplo de coste de oportunidad.", steps: ["El coste de oportunidad es el valor de la mejor alternativa a la que renuncias.", "Piensa en cómo empleas tu tiempo o tu dinero."], a: "Estudiar el sábado en lugar de trabajar: el coste de oportunidad es el salario que dejas de ganar." }
        ],
        med: [
          { q: "Describe el efecto sobre el equilibrio de un aumento de la demanda con la oferta constante.", steps: ["La curva de demanda se desplaza a la derecha.", "La curva de oferta no cambia.", "El nuevo punto de corte queda más arriba y a la derecha."], a: "Suben tanto el precio de equilibrio como la cantidad de equilibrio." },
          { q: "Explica la diferencia entre un movimiento a lo largo de la curva de demanda y un desplazamiento de la curva.", steps: ["Movimiento a lo largo: lo causa un cambio en el precio del propio bien.", "Desplazamiento: lo causa otro factor (renta, gustos, precio de bienes relacionados)."], a: "El movimiento a lo largo responde al precio del bien; el desplazamiento, a factores distintos del precio." },
          { q: "Si la elasticidad-precio de la demanda es 0,4, ¿es elástica o inelástica? ¿Qué implica para el ingreso si sube el precio?", steps: ["El valor absoluto de la elasticidad es 0,4 < 1 → demanda inelástica.", "La cantidad cae proporcionalmente menos que lo que sube el precio.", "El ingreso total (precio × cantidad) aumenta."], a: "Inelástica; si sube el precio, el ingreso total aumenta." }
        ],
        hard: [
          { q: "¿Qué ocurre con el mercado si se fija un precio máximo por debajo del equilibrio?", steps: ["A ese precio bajo, la cantidad demandada sube y la ofrecida baja.", "Aparece un exceso de demanda: escasez.", "Suelen surgir colas, listas de espera o mercado negro."], a: "Se genera escasez (exceso de demanda) y mecanismos de racionamiento no monetarios." },
          { q: "Explica el efecto de un impuesto por unidad sobre el precio que paga el consumidor y el que recibe el productor.", steps: ["El impuesto abre una «cuña» entre el precio que paga el consumidor y el que recibe el productor.", "El precio al consumidor sube; el que recibe el productor baja.", "El reparto de la carga depende de las elasticidades relativas de oferta y demanda."], a: "El consumidor paga más y el productor recibe menos; soporta más carga el lado más inelástico." },
          { q: "Relaciona inflación y poder adquisitivo con un ejemplo numérico.", steps: ["La inflación es la subida generalizada y sostenida de los precios.", "Si los precios suben un 10 % y tu salario nominal no cambia...", "Con 100 € compras lo que antes costaba unos 91 €."], a: "La inflación reduce el poder adquisitivo: con la misma renta nominal compras menos bienes reales." }
        ]
      },
      en: {
        easy: [
          { q: "By the law of demand, what happens to quantity demanded if the price rises?", steps: ["The law of demand describes an inverse relationship between price and quantity demanded.", "It holds with everything else constant (ceteris paribus)."], a: "It falls." },
          { q: "Define 'equilibrium price'.", steps: ["It is the price where the supply and demand curves cross.", "At that price, quantity supplied equals quantity demanded."], a: "The price at which quantity supplied equals quantity demanded: no shortage, no surplus." },
          { q: "Give an example of opportunity cost.", steps: ["Opportunity cost is the value of the best alternative you give up.", "Think about how you spend your time or money."], a: "Studying on Saturday instead of working: the opportunity cost is the wage you forgo." }
        ],
        med: [
          { q: "Describe the effect on equilibrium of an increase in demand with supply held constant.", steps: ["The demand curve shifts to the right.", "The supply curve does not change.", "The new intersection is higher and further right."], a: "Both the equilibrium price and the equilibrium quantity rise." },
          { q: "Explain the difference between a movement along the demand curve and a shift of the curve.", steps: ["Movement along: caused by a change in the good's own price.", "Shift: caused by another factor (income, tastes, prices of related goods)."], a: "A movement along responds to the good's price; a shift responds to factors other than price." },
          { q: "If price elasticity of demand is 0.4, is it elastic or inelastic? What does that imply for revenue if the price rises?", steps: ["The absolute value of elasticity is 0.4 < 1 → inelastic demand.", "Quantity falls proportionally less than the price rises.", "Total revenue (price × quantity) increases."], a: "Inelastic; if the price rises, total revenue increases." }
        ],
        hard: [
          { q: "What happens to the market if a price ceiling is set below equilibrium?", steps: ["At that low price, quantity demanded rises and quantity supplied falls.", "An excess of demand appears: a shortage.", "Queues, waiting lists or a black market tend to emerge."], a: "A shortage (excess demand) develops, along with non-monetary rationing mechanisms." },
          { q: "Explain the effect of a per-unit tax on the price the consumer pays and the price the producer receives.", steps: ["The tax drives a wedge between the price the consumer pays and the price the producer receives.", "The consumer price rises; the producer price falls.", "How the burden splits depends on the relative elasticities of supply and demand."], a: "The consumer pays more and the producer receives less; the more inelastic side bears more of the burden." },
          { q: "Relate inflation and purchasing power with a numerical example.", steps: ["Inflation is a general, sustained rise in prices.", "If prices rise 10% and your nominal wage does not change...", "With €100 you buy what used to cost about €91."], a: "Inflation reduces purchasing power: with the same nominal income you buy fewer real goods." }
        ]
      }
    }
  };

  function exBank(sid) {
    var b = EXERCISES[sid];
    if (!b) return null;
    return b[DB.lang] || b.es;
  }

  /* =====================================================================
     FASE D — MATERIAL REAL: ingesta de archivos + generación extractiva
     ---------------------------------------------------------------------
     Todo lo que se ejecuta localmente en el navegador (sin red, respetando
     la CSP del artifact). Los puntos que necesitan backend/Gemini están
     marcados con TODO(backend) y con un estado honesto en la UI.
     ===================================================================== */

  var STOPWORDS = {
    es: ("el la los las un una unos unas de del a al y o u que se su sus lo le les me mi mis te tu tus nos os en por para con sin so sobre entre hasta desde tras ante bajo cabe hacia según durante mediante como más menos muy tan tanto ya no ni si sí son fue era eran fueron ser es está estan están estar este esta estos estas ese esa esos esas aquel aquella cuando donde cual cuales quien quienes porque pero aunque sino también así pues entonces hay han ha he has había habían haber sido cada todo toda todos todas otro otra otros otras mismo misma sus le lo uno dos tres parte forma manera vez veces caso casos hecho través").split(/\s+/),
    en: ("the a an of to and or in on at for with without by as is are was were be been being this that these those it its his her their our your my not no nor from into than then so such can may will would could should have has had which who whom what when where why how each all both other more most less very too also just only than then there here about over under between during through against upon within into onto off out up down one two three part way case fact through").split(/\s+/)
  };

  var Ingest = (function () {
    function readText(file) {
      return new Promise(function (res, rej) {
        var r = new FileReader();
        r.onload = function () { res(String(r.result || "")); };
        r.onerror = function () { rej(r.error || new Error("read")); };
        r.readAsText(file);
      });
    }
    function readBuffer(file) {
      return new Promise(function (res, rej) {
        var r = new FileReader();
        r.onload = function () { res(r.result); };
        r.onerror = function () { rej(r.error || new Error("read")); };
        r.readAsArrayBuffer(file);
      });
    }
    function readDataURL(file) {
      return new Promise(function (res, rej) {
        var r = new FileReader();
        r.onload = function () { res(String(r.result || "")); };
        r.onerror = function () { rej(r.error || new Error("read")); };
        r.readAsDataURL(file);
      });
    }
    function inflate(bytes, raw) {
      if (typeof DecompressionStream === "undefined") return Promise.reject(new Error("no-ds"));
      try {
        var ds = new DecompressionStream(raw ? "deflate-raw" : "deflate");
        var stream = new Blob([bytes]).stream().pipeThrough(ds);
        return new Response(stream).arrayBuffer().then(function (ab) { return new Uint8Array(ab); });
      } catch (e) { return Promise.reject(e); }
    }
    function unescPdf(s) {
      return String(s).replace(/\\(\d{1,3}|n|r|t|b|f|\(|\)|\\)/g, function (_, c) {
        if (c === "n") return "\n"; if (c === "r") return ""; if (c === "t") return " ";
        if (c === "b" || c === "f") return " ";
        if (c === "(" || c === ")" || c === "\\") return c;
        if (/^\d+$/.test(c)) { var n = parseInt(c, 8); return n >= 32 && n < 383 ? String.fromCharCode(n) : ""; }
        return c;
      });
    }
    function pdfOps(content) {
      var out = [];
      var toks = content.match(/\((?:\\[\s\S]|[^()\\])*\)|<[0-9A-Fa-f\s]+>|\bTd\b|\bTD\b|\bT\*\b|\bTJ\b|\bTj\b|\bBT\b|\bET\b/g) || [];
      toks.forEach(function (tk) {
        if (tk[0] === "(") out.push(unescPdf(tk.slice(1, -1)));
        else if (tk[0] === "<") {
          var hex = tk.slice(1, -1).replace(/\s+/g, "");
          var str = "";
          for (var i = 0; i + 1 < hex.length; i += 2) { var cc = parseInt(hex.substr(i, 2), 16); if (cc >= 32) str += String.fromCharCode(cc); }
          out.push(str);
        } else if (tk === "Td" || tk === "TD" || tk === "T*" || tk === "ET") out.push("\n");
      });
      return out.join("");
    }
    function pdfText(buf) {
      var u8 = new Uint8Array(buf);
      var latin1 = "";
      for (var i = 0; i < u8.length; i++) latin1 += String.fromCharCode(u8[i]);
      var streams = [];
      var re = /stream\r?\n?([\s\S]*?)\r?\n?endstream/g, m;
      while ((m = re.exec(latin1)) !== null) streams.push(m[1]);
      if (!streams.length) return Promise.resolve("");
      return streams.reduce(function (chain, raw) {
        return chain.then(function (acc) {
          var bytes = Uint8Array.from(raw, function (c) { return c.charCodeAt(0) & 0xff; });
          var tryList = [inflate(bytes, false), inflate(bytes, true)];
          return tryList[0]
            .catch(function () { return tryList[1]; })
            .then(function (u) { return new TextDecoder("latin1").decode(u); })
            .catch(function () { return (/\b(Tj|TJ|BT)\b/.test(raw) ? raw : ""); })
            .then(function (content) {
              if (content && /\b(Tj|TJ|BT)\b/.test(content)) acc.push(pdfOps(content));
              return acc;
            });
        });
      }, Promise.resolve([])).then(function (parts) {
        var txt = parts.join("\n")
          .replace(/[ \t]{2,}/g, " ")
          .replace(/\n{3,}/g, "\n\n")
          .replace(/(\w)-\n(\w)/g, "$1$2")
          .replace(/\n(?=[a-záéíóúñ,;])/g, " ")
          .trim();
        return txt;
      });
    }
    function decodeXml(s) {
      return String(s).replace(/&(#\d+|#x[0-9a-f]+|amp|lt|gt|quot|apos);/gi, function (_, e) {
        if (e === "amp") return "&"; if (e === "lt") return "<"; if (e === "gt") return ">";
        if (e === "quot") return '"'; if (e === "apos") return "'";
        if (e[0] === "#") return String.fromCharCode(e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
        return _;
      });
    }
    function docxText(buf) {
      var u8 = new Uint8Array(buf);
      var target = "word/document.xml";
      for (var i = 0; i + 30 < u8.length; i++) {
        if (u8[i] === 0x50 && u8[i + 1] === 0x4b && u8[i + 2] === 0x03 && u8[i + 3] === 0x04) {
          var method = u8[i + 8] | (u8[i + 9] << 8);
          var compSize = (u8[i + 18] | (u8[i + 19] << 8) | (u8[i + 20] << 16) | (u8[i + 21] << 24)) >>> 0;
          var nameLen = u8[i + 26] | (u8[i + 27] << 8);
          var extraLen = u8[i + 28] | (u8[i + 29] << 8);
          var fname = "";
          for (var k = 0; k < nameLen; k++) fname += String.fromCharCode(u8[i + 30 + k]);
          if (fname === target) {
            var start = i + 30 + nameLen + extraLen;
            var data = u8.subarray(start, compSize ? start + compSize : u8.length);
            var toXml = method === 0 ? Promise.resolve(data) : inflate(data, true);
            return toXml.then(function (bytes) {
              var xml = new TextDecoder().decode(bytes);
              xml = xml.replace(/<w:tab[^>]*>/g, " ").replace(/<\/w:p>/g, "\n").replace(/<[^>]+>/g, "");
              return decodeXml(xml).replace(/[ \t]{2,}/g, " ").replace(/\n{3,}/g, "\n\n").trim();
            });
          }
        }
      }
      return Promise.reject(new Error("docx-notfound"));
    }

    // devuelve { title, kind, mime, sizeBytes, addedAt, status, textSource, text, image, note }
    function ingest(file) {
      var name = file.name || (DB.lang === "en" ? "document" : "documento");
      var ext = (name.split(".").pop() || "").toLowerCase();
      var mime = file.type || "";
      var base = { title: name, sizeBytes: file.size || 0, mime: mime, addedAt: Date.now(), image: null, note: null };
      var minChars = 24;
      if (ext === "txt" || ext === "md" || ext === "text" || /^text\/(plain|markdown)/.test(mime)) {
        return readText(file).then(function (tx) {
          tx = (tx || "").replace(/\r\n/g, "\n").trim();
          var ok = tx.replace(/\s/g, "").length >= minChars;
          return Object.assign(base, { kind: "text", text: ok ? tx : null, textSource: ext === "md" ? "md" : "txt", status: ok ? "analyzed" : "failed", note: ok ? null : "empty" });
        });
      }
      if (ext === "pdf" || mime === "application/pdf") {
        return readBuffer(file).then(pdfText).then(function (tx) {
          var ok = tx && tx.replace(/\s/g, "").length >= 80;
          return Object.assign(base, { kind: "pdf", text: ok ? tx : null, textSource: ok ? "pdf" : null, status: ok ? "analyzed" : "failed", note: ok ? null : "pdf-extract" });
        }).catch(function () { return Object.assign(base, { kind: "pdf", text: null, textSource: null, status: "failed", note: "pdf-extract" }); });
      }
      if (ext === "docx" || /officedocument\.wordprocessingml/.test(mime)) {
        return readBuffer(file).then(docxText).then(function (tx) {
          var ok = tx && tx.length >= 40;
          return Object.assign(base, { kind: "docx", text: ok ? tx : null, textSource: ok ? "docx" : null, status: ok ? "analyzed" : "failed", note: ok ? null : "docx-extract" });
        }).catch(function () { return Object.assign(base, { kind: "docx", text: null, textSource: null, status: "failed", note: "docx-extract" }); });
      }
      if (/^image\//.test(mime) || ["jpg", "jpeg", "png", "webp", "gif", "bmp", "heic", "heif"].indexOf(ext) > -1) {
        return readDataURL(file).then(function (url) {
          return Object.assign(base, { kind: "image", image: url, text: null, textSource: null, status: "pending", note: "ocr" });
        }).catch(function () { return Object.assign(base, { kind: "image", text: null, status: "failed", note: "ocr" }); });
      }
      if (ext === "doc" || mime === "application/msword") {
        return Promise.resolve(Object.assign(base, { kind: "docx", text: null, status: "failed", note: "doc-legacy" }));
      }
      return Promise.resolve(Object.assign(base, { kind: "file", text: null, status: "failed", note: "unsupported" }));
    }

    return { ingest: ingest, pdfText: pdfText, docxText: docxText, hasDecompression: typeof DecompressionStream !== "undefined" };
  })();

  /* --------- generación local extractiva a partir del texto real --------- */
  var DocGen = (function () {
    function sw() { var m = STOPWORDS[DB.lang === "en" ? "en" : "es"], o = {}; m.forEach(function (w) { o[w] = 1; }); return o; }
    function words(text) { return (String(text || "").toLowerCase().match(/[a-zà-ÿ0-9']{2,}/gi) || []); }
    function sentences(text) {
      var t = String(text || "").replace(/\s+/g, " ").trim();
      var out = [], buf = "";
      for (var i = 0; i < t.length; i++) {
        buf += t[i];
        var ch = t[i], nx = t[i + 1];
        if ((ch === "." || ch === "!" || ch === "?" || ch === "…") && (nx === undefined || nx === " ")) {
          var tail = buf.slice(-6).toLowerCase();
          if (!/\d[.,]$/.test(buf) && !/\b(sr|sra|dr|dra|etc|p\.?\s?ej|vs|n[oº]|art|fig|cap|pág|pp|ed|vol|s\.?\s?xix?)\.$/i.test(tail.trim())) {
            out.push(buf.trim()); buf = "";
          }
        }
      }
      if (buf.trim()) out.push(buf.trim());
      return out.filter(function (s) { return s.length > 24 && /[a-zà-ÿ]/i.test(s); });
    }
    function keyTerms(text, n) {
      var stop = sw(), freq = {}, lc = {};
      words(text).forEach(function (w) { lc[w] = (lc[w] || 0) + 1; if (!stop[w] && w.length > 3 && !/^\d+$/.test(w)) freq[w] = (freq[w] || 0) + 1; });
      var terms = Object.keys(freq).sort(function (a, b) { return freq[b] - freq[a]; }).slice(0, n || 10);
      // frases con mayúscula NO al principio de frase (posesivas reales), o multi-palabra
      var t = String(text).replace(/\s+/g, " ");
      var capRe = /[A-ZÁÉÍÓÚÑÀ-Ý][\wà-ÿ]+(?:\s+(?:de|del|la|el|los|las|of|the|y|and|von)?\s?[A-ZÁÉÍÓÚÑÀ-Ý][\wà-ÿ]+){0,3}/g;
      var cf = {}, m;
      while ((m = capRe.exec(t)) !== null) {
        var phrase = m[0].trim();
        var before = t.slice(Math.max(0, m.index - 2), m.index);
        var atStart = m.index === 0 || /[.!?…]\s?$/.test(before);
        var multiWord = /\s/.test(phrase);
        var lcForm = phrase.toLowerCase();
        // descartar: palabra suelta al inicio de frase que también aparece en minúscula (artefacto), o stopword
        if (stop[lcForm]) continue;
        if (!multiWord && atStart && lc[lcForm]) continue;
        if (phrase.length < 4) continue;
        cf[phrase] = (cf[phrase] || 0) + 1 + (multiWord ? 1 : 0);
      }
      var phrases = Object.keys(cf).sort(function (a, b) { return cf[b] - cf[a] || b.length - a.length; }).slice(0, 8);
      return { terms: terms, phrases: phrases, freq: freq };
    }
    function scoreSentence(s, freq) {
      var ws = words(s), sc = 0;
      ws.forEach(function (w) { sc += (freq[w] || 0); });
      return ws.length ? sc / Math.sqrt(ws.length) : 0;
    }
    function analyze(text) {
      var sents = sentences(text);
      var kt = keyTerms(text, 16);
      var wc = words(text).length;
      var concepts = (kt.phrases.length >= 3 ? kt.phrases : kt.phrases.concat(kt.terms)).slice(0, 8);
      var diff = wc > 900 ? "hard" : wc > 300 ? "med" : "easy";
      return { sents: sents, kt: kt, wordCount: wc, readMin: Math.max(1, Math.round(wc / 180)), concepts: concepts, difficulty: diff, sentenceCount: sents.length };
    }
    function summarize(text) {
      var a = analyze(text);
      if (!a.sents.length) return { summary: "", keyPoints: [], concepts: [], wordCount: a.wordCount, readMin: a.readMin, difficulty: a.difficulty };
      var scored = a.sents.map(function (s, i) { return { s: s, i: i, sc: scoreSentence(s, a.kt.freq) + (i === 0 ? 2 : 0) }; });
      var take = Math.min(5, Math.max(2, Math.ceil(a.sents.length / 4)));
      var top = scored.slice().sort(function (x, y) { return y.sc - x.sc; }).slice(0, take).sort(function (x, y) { return x.i - y.i; });
      var kp = a.sents.filter(function (s) { return /\b(es|era|fue|son|eran|fueron|significa|consiste|se define|se considera|se caracteriza|is|are|was|were|means|consists|refers to|is defined)\b/i.test(s); }).slice(0, 6);
      if (kp.length < 3) kp = a.sents.slice(0, Math.min(5, a.sents.length));
      return { summary: top.map(function (x) { return x.s; }).join(" "), keyPoints: kp, concepts: a.concepts, wordCount: a.wordCount, readMin: a.readMin, difficulty: a.difficulty };
    }
    function flashcards(text, n) {
      n = n || 8;
      var a = analyze(text), en = DB.lang === "en", cards = [];
      a.sents.forEach(function (s) {
        if (cards.length >= n) return;
        var m = s.match(/^([A-ZÁÉÍÓÚÑÀ-Ý][\wà-ÿ %()'\-]{2,48}?)\s+(es|era|fue|son|eran|fueron|significa|consiste en|se define como|se conoce como|is|was|are|were|means|refers to)\s+(.+)/);
        if (m) cards.push({ q: (en ? "What " + (/\b(is|are)\b/.test(m[2]) ? "is" : "was") + " " + m[1].trim() + "?" : "¿Qué " + (/\b(es|son)\b/.test(m[2]) ? "es" : "fue") + " " + m[1].trim() + "?"), a: s.replace(/\s+/g, " ").trim() });
      });
      var pool = (a.kt.phrases.concat(a.kt.terms));
      for (var i = 0; i < pool.length && cards.length < n; i++) {
        var term = pool[i];
        var re = new RegExp("(^|[^\\wà-ÿ])(" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")([^\\wà-ÿ]|$)", "i");
        var s2 = a.sents.filter(function (x) { return re.test(x) && x.length < 220; })[0];
        if (s2 && !cards.some(function (c) { return c.a.toLowerCase() === term.toLowerCase(); })) {
          cards.push({ q: (en ? "Fill in the blank — " : "Completa la frase — ") + s2.replace(re, "$1_____$3"), a: term });
        }
      }
      return cards.slice(0, n);
    }
    function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t2 = a[i]; a[i] = a[j]; a[j] = t2; } return a; }
    function quiz(text, n, difficulty) {
      n = n || 5;
      var a = analyze(text), en = DB.lang === "en";
      var terms = a.kt.phrases.concat(a.kt.terms).filter(function (x) { return x.length > 4; });
      terms = terms.filter(function (v, i) { return terms.map(function (x) { return x.toLowerCase(); }).indexOf(v.toLowerCase()) === i; });
      var sents = a.sents.filter(function (s) { return s.length > 34 && s.length < 230; });
      var out = [];
      for (var si = 0; si < sents.length && out.length < n; si++) {
        var s = sents[si];
        var inS = terms.filter(function (tm) { return new RegExp("\\b" + tm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i").test(s); });
        if (!inS.length) continue;
        var ans = inS[0];
        var distract = shuffle(terms.filter(function (tm) { return tm.toLowerCase() !== ans.toLowerCase() && !new RegExp("\\b" + tm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i").test(s); })).slice(0, 3);
        if (distract.length < 3) continue;
        var stem = s.replace(new RegExp("\\b" + ans.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i"), "_____");
        var opts = shuffle([ans].concat(distract));
        out.push({
          q: (en ? "Which word completes this line from the document?" : "¿Qué palabra completa esta frase del documento?") + "\n«" + stem + "»",
          opts: opts, correct: opts.indexOf(ans),
          exp: (en ? "The document reads: " : "El documento dice: ") + "“" + s + "”"
        });
      }
      return out.slice(0, n);
    }
    function exercises(text, tier) {
      var a = analyze(text), en = DB.lang === "en", out = [];
      var verb = tier === "hard" ? (en ? "Analyse and relate to the rest of the topic" : "Analiza y relaciónalo con el resto del tema")
        : tier === "easy" ? (en ? "Define in one sentence" : "Define en una frase")
        : (en ? "Explain in your own words" : "Explícalo con tus palabras");
      a.concepts.slice(0, 6).forEach(function (term) {
        var s = a.sents.filter(function (x) { return x.toLowerCase().indexOf(term.toLowerCase()) > -1; })[0];
        out.push({ q: verb + ": " + term + ".", steps: [], a: s || "" });
      });
      if (!out.length) out.push({ q: (en ? "Summarise the main idea of the document in 3 lines." : "Resume la idea principal del documento en 3 líneas."), steps: [], a: a.sents.slice(0, 2).join(" ") });
      return out;
    }
    function answer(text, question) {
      var a = analyze(text), en = DB.lang === "en";
      var qWords = words(question).filter(function (w) { return !sw()[w] && w.length > 2; });
      if (!qWords.length) return null;
      var ranked = a.sents.map(function (s, i) {
        var lw = s.toLowerCase(), hits = 0;
        qWords.forEach(function (w) { if (lw.indexOf(w) > -1) hits++; });
        return { s: s, i: i, hits: hits };
      }).filter(function (x) { return x.hits > 0; }).sort(function (x, y) { return y.hits - x.hits || x.i - y.i; });
      if (!ranked.length) return { html: "<p>" + (en ? "I couldn't find that in this document. It covers: " : "No encuentro eso en este documento. Trata sobre: ") + a.concepts.slice(0, 4).join(", ") + ".</p>", grounded: false, tutor: true };
      var picks = [];
      for (var i = 0; i < ranked.length && picks.length < 3; i++) {
        if (picks.indexOf(ranked[i].i) < 0 && (!picks.length || Math.abs(ranked[i].i - picks[picks.length - 1]) !== 0)) picks.push(ranked[i].i);
      }
      picks.sort(function (x, y) { return x - y; });
      var quote = picks.map(function (i) { return a.sents[i]; }).join(" ");
      return { html: "<p>" + (en ? "From the document:" : "Según el documento:") + "</p><blockquote>" + esc(quote) + "</blockquote>", grounded: true, tutor: true };
    }
    function podcastSegments(text, title, approach, minutes, lang) {
      var en = (lang || DB.lang) === "en";
      var sum = summarize(text);
      var name = title || (en ? "your notes" : "tus apuntes");
      var lines = [];
      lines.push((en ? "Welcome to your Zynqora study podcast. Today we're going through " : "Bienvenido a tu podcast de estudio de Zynqora. Hoy repasamos ") + name + ". " + (en ? "This is built from your own document." : "Está hecho a partir de tu propio documento."));
      if (sum.summary) lines.push((en ? "The big picture: " : "La idea general: ") + sum.summary);
      sum.keyPoints.slice(0, 6).forEach(function (kp, i) { lines.push((en ? "Point " : "Punto ") + (i + 1) + ": " + kp); });
      if (approach === 1) sum.keyPoints.slice(0, 2).forEach(function (kp) { lines.push((en ? "Ask yourself: can you explain this? " : "Pregúntate: ¿sabrías explicar esto? ") + kp); });
      lines.push(en ? "That's the core of your document. Review these points and the topic is yours." : "Eso es lo esencial de tu documento. Repasa estos puntos y el tema es tuyo.");
      var totalWords = lines.reduce(function (n, l) { return n + l.split(/\s+/).length; }, 0) || 1;
      var dur = Math.round((minutes || 8) * 60), acc = 0;
      var segs = lines.map(function (l) {
        var st = { speaker: "A", text: l, speech: (typeof normalizeScriptForSpeech === "function" ? normalizeScriptForSpeech(l, en ? "en" : "es", name) : l), t: Math.round(acc / totalWords * (dur - 4)) };
        acc += l.split(/\s+/).length;
        return st;
      });
      return { title: name, segments: segs, dur: dur, two: false, approach: approach || 0, source: "doc", direction: (typeof addVoiceDirection === "function" ? addVoiceDirection(en ? "en" : "es", (typeof POD_VSTYLE_KEYS !== "undefined" ? POD_VSTYLE_KEYS[0] : "natural"), false) : "") };
    }
    function slides(text, title) {
      var sum = summarize(text), a = analyze(text), en = DB.lang === "en";
      var name = (title || (en ? "Your notes" : "Tus apuntes")).replace(/\.(pdf|docx|txt|md)$/i, "");
      var kp = sum.keyPoints;
      var d = [];
      d.push({ type: "title", kicker: en ? "Study deck" : "Presentación de estudio", title: name, hero: 1, sub: (en ? "Generated from your document" : "Generado a partir de tu documento") + " · " + a.sentenceCount + (en ? " sentences" : " frases") });
      d.push({ type: "bullets", kicker: en ? "Introduction" : "Introducción", title: en ? "What this is about" : "De qué trata", list: [sum.summary || kp[0] || ""].filter(Boolean) });
      if (sum.concepts.length) d.push({ type: "bullets", kicker: en ? "Key concepts" : "Conceptos principales", title: en ? "The core ideas" : "Las ideas clave", list: sum.concepts.slice(0, 6) });
      kp.slice(0, 3).forEach(function (p, i) {
        d.push({ type: "bullets", kicker: (en ? "Development " : "Desarrollo ") + (i + 1), title: sum.concepts[i] || (en ? "Detail " : "Detalle ") + (i + 1), list: [p] });
      });
      var example = a.sents.filter(function (s) { return /\b(por ejemplo|ejemplo|p\.?\s?ej|for example|e\.g\.|such as)\b/i.test(s); })[0];
      d.push({ type: "bullets", kicker: en ? "Example" : "Ejemplo", title: en ? "A concrete case" : "Un caso concreto", list: [example || a.sents[Math.min(3, a.sents.length - 1)] || ""].filter(Boolean) });
      d.push({ type: "bullets", kicker: en ? "Summary" : "Resumen", title: en ? "In short" : "En resumen", list: kp.slice(0, 4) });
      d.push({ type: "closing", kicker: en ? "Conclusion" : "Conclusión", title: name, sub: en ? "Review these points before your exam." : "Repasa estos puntos antes del examen.", list: sum.concepts.slice(0, 4), heroFaint: 1 });
      return d;
    }
    return { analyze: analyze, summarize: summarize, flashcards: flashcards, quiz: quiz, exercises: exercises, answer: answer, podcastSegments: podcastSegments, slides: slides, keyTerms: keyTerms, sentences: sentences };
  })();

  /* --------------------- capa de documentos (DB.documents) --------------------- */
  function docById(id) { return (DB.documents || []).filter(function (d) { return d.id === id; })[0] || null; }
  function docsOfSubject(sid) { return (DB.documents || []).filter(function (d) { return d.subjectId === sid; }); }
  function docHasText(d) { return !!(d && d.text && d.text.replace(/\s/g, "").length > 40); }
  function docNoteText(code) {
    var en = DB.lang === "en";
    var M = {
      "pdf-extract": en ? "This PDF's text couldn't be extracted in the browser (it may be scanned or use custom fonts). Full PDF extraction runs on the backend once connected." : "No se pudo extraer el texto de este PDF en el navegador (puede ser escaneado o usar fuentes propias). La extracción completa de PDF se hará en el backend al conectarlo.",
      "docx-extract": en ? "This .docx couldn't be read in the browser. DOCX extraction runs on the backend once connected." : "No se pudo leer este .docx en el navegador. La extracción de DOCX se hará en el backend al conectarlo.",
      "doc-legacy": en ? "Legacy .doc isn't supported in the browser — save it as .docx or .pdf, or connect the backend." : "El formato .doc antiguo no se admite en el navegador — guárdalo como .docx o .pdf, o conecta el backend.",
      "ocr": en ? "Image saved. Reading text from photos (OCR) needs the backend — the pipeline is ready to connect." : "Imagen guardada. Leer el texto de las fotos (OCR) necesita el backend — el pipeline está listo para conectar.",
      "empty": en ? "This file looks empty or too short to analyse." : "Este archivo parece vacío o demasiado corto para analizar.",
      "unsupported": en ? "Unsupported file type." : "Tipo de archivo no admitido.",
      "seeded": en ? "Example content — this subject's demo material, not a file you uploaded." : "Contenido de ejemplo — material de demostración de esta materia, no un archivo que hayas subido."
    };
    return M[code] || "";
  }
  // genera (y cachea) el material derivado del texto real de un documento
  var DOCGEN_VERSION = 3;
  function docEnsureAnalysis(d) {
    if (!d || !docHasText(d)) return;
    if (!d.analysis || d._analysisSource !== d.textSource || d._genV !== DOCGEN_VERSION) {
      var s = DocGen.summarize(d.text);
      d.analysis = { concepts: s.concepts, keyPoints: s.keyPoints, wordCount: s.wordCount, readMin: s.readMin, difficulty: s.difficulty };
      d.summary = s.summary;
      d._analysisSource = d.textSource;
      d._genV = DOCGEN_VERSION;
      d.flashcards = null; d.quiz = null;
      d._fcCharged = d._fcCharged || 0; d._quizCharged = d._quizCharged || 0;
    }
  }
  function docFlashcards(d, n) {
    docEnsureAnalysis(d);
    if (!d.flashcards || !d.flashcards.length) {
      d.flashcards = DocGen.flashcards(d.text, n || 8);
      if (d.flashcards.length && !d._fcCharged) { incUsage("flashcards", d.flashcards.length); d._fcCharged = 1; persist("documents"); }
    }
    return d.flashcards;
  }
  function docQuiz(d, n, difficulty) {
    docEnsureAnalysis(d);
    if (!d.quiz || !d.quiz.length) {
      d.quiz = DocGen.quiz(d.text, n || 5, difficulty);
      if (d.quiz.length && !d._quizCharged) { incUsage("tests", 1); d._quizCharged = 1; persist("documents"); }
    }
    return d.quiz;
  }
  function migrateDocuments() {
    if (Array.isArray(DB.documents) && DB.documents.length) return;
    var now = Date.now(), list = [];
    DB.subjects.forEach(function (s, si) {
      if (s.doc) {
        var a = s.doc.analysis || {};
        list.push({
          id: s.doc.id || uid(), subjectId: s.id, title: s.doc.title, kind: s.doc.kind || "pdf",
          mime: "application/pdf", sizeBytes: Math.round(parseFloat(s.doc.sizeMB || "2") * 1048576),
          addedAt: now - (si * 3 + 2) * 86400000, status: "analyzed", textSource: null, text: null, image: null, note: "seeded",
          analysis: { concepts: L(a.main) || [], keyPoints: L(a.topics) || [], wordCount: 0, readMin: a.readMin || 10, difficulty: a.difficulty || "med" },
          summary: s.doc.summary, flashcards: null, quiz: null, sessions: [], seeded: true, pages: s.doc.pages || 12
        });
      }
      (s.extraDocs || []).forEach(function (ed) {
        list.push({
          id: ed.id || uid(), subjectId: s.id, title: ed.title, kind: ed.kind || "pdf",
          mime: "", sizeBytes: 0, addedAt: now - 86400000, status: ed.analyzing ? "processing" : "analyzed",
          textSource: ed.text ? "paste" : null, text: ed.text || null, image: null, note: ed.text ? null : "seeded",
          analysis: null, summary: null, flashcards: null, quiz: null, sessions: [], seeded: !ed.text, pages: ed.pages || 8
        });
      });
    });
    DB.documents = list;
  }

  /* ================= STORE ================= */
  function lsGet(k, d) { try { var v = localStorage.getItem(k); return v == null ? d : v; } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function clone(x) { return JSON.parse(JSON.stringify(x)); }
  function uid() { return "id" + Math.random().toString(36).slice(2, 9); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function fmtBytes(n) {
    n = n || 0;
    if (n < 1024) return n + " B";
    if (n < 1048576) return Math.round(n / 1024) + " KB";
    return (n / 1048576).toFixed(1) + " MB";
  }
  function fmtDate(ms) {
    try { return new Date(ms).toLocaleDateString(DB.lang === "en" ? "en-US" : "es-ES", { day: "numeric", month: "short", year: "numeric" }); }
    catch (e) { return ""; }
  }

  /* ---- IndexedDB: persistencia real de todos los datos del usuario ---- */
  var Store = (function () {
    var NAME = "zynqora", VER = 1, db = null, PENDING = {}, timer = null;
    var KEYS = ["state", "profile", "subjects", "conversations", "calendar", "sessions", "documents"];
    function open() {
      return new Promise(function (res) {
        try {
          if (!window.indexedDB) return res(null);
          var req = indexedDB.open(NAME, VER);
          req.onupgradeneeded = function () { try { req.result.createObjectStore("kv"); } catch (e) {} };
          req.onsuccess = function () { db = req.result; res(db); };
          req.onerror = function () { res(null); };
          req.onblocked = function () { res(null); };
          setTimeout(function () { if (!db) res(null); }, 2500);
        } catch (e) { res(null); }
      });
    }
    function get(key) {
      return new Promise(function (res) {
        if (!db) return res(undefined);
        try {
          var rq = db.transaction("kv", "readonly").objectStore("kv").get(key);
          rq.onsuccess = function () { res(rq.result); };
          rq.onerror = function () { res(undefined); };
        } catch (e) { res(undefined); }
      });
    }
    function put(key, val) {
      try { if (db) db.transaction("kv", "readwrite").objectStore("kv").put(clone(val), key); } catch (e) {}
    }
    function loadAll() {
      return Promise.all(KEYS.map(get)).then(function (r) {
        var o = {}; KEYS.forEach(function (k, i) { o[k] = r[i]; }); return o;
      });
    }
    function flush() {
      var p = PENDING; PENDING = {}; clearTimeout(timer); timer = null;
      Object.keys(p).forEach(function (k) { try { put(k, p[k]()); } catch (e) {} });
    }
    function schedule(key, getter) { PENDING[key] = getter; clearTimeout(timer); timer = setTimeout(flush, 300); }
    function clearAll() {
      return new Promise(function (res) {
        try { if (!db) return res(); var rq = db.transaction("kv", "readwrite").objectStore("kv").clear(); rq.onsuccess = function () { res(); }; rq.onerror = function () { res(); }; }
        catch (e) { res(); }
      });
    }
    return { open: open, loadAll: loadAll, put: put, flush: flush, schedule: schedule, clearAll: clearAll, available: function () { return !!db; } };
  })();

  var PERSIST_MAP = {
    subjects: function () { return DB.subjects; },
    conversations: function () { return DB.conversations; },
    calendar: function () { return DB.calendar; },
    sessions: function () { return DB.sessions; },
    documents: function () { return DB.documents; },
    profile: function () { return DB.profile; },
    state: function () {
      return {
        currentSubjectId: DB.currentSubjectId, pathProgress: DB.pathProgress,
        reviewsDueBySubject: DB.reviewsDueBySubject, lastTestBySubject: DB.lastTestBySubject,
        studiedMin: DB.studiedMin, streak: DB.streak, streakDates: DB.streakDates,
        goalMin: DB.goalMin, sessionLength: DB.sessionLength, notifications: DB.notifications,
        reminder: DB.reminder, plan: DB.plan, usage: DB.usage, onboardingDone: DB.onboardingDone
      };
    }
  };
  function persist(key) { if (PERSIST_MAP[key]) Store.schedule(key, PERSIST_MAP[key]); }
  function persistAll() { Object.keys(PERSIST_MAP).forEach(persist); Store.flush(); }
  function hydrate(d) {
    if (d.profile && d.profile.id) DB.profile = d.profile;
    if (Array.isArray(d.subjects) && d.subjects.length) DB.subjects = d.subjects;
    if (Array.isArray(d.conversations)) DB.conversations = d.conversations;
    if (Array.isArray(d.calendar)) DB.calendar = d.calendar;
    if (Array.isArray(d.sessions)) DB.sessions = d.sessions;
    if (Array.isArray(d.documents) && d.documents.length) DB.documents = d.documents;
    var s = d.state;
    if (s && typeof s === "object") {
      ["currentSubjectId", "pathProgress", "reviewsDueBySubject", "lastTestBySubject", "studiedMin",
        "streak", "streakDates", "goalMin", "sessionLength", "notifications", "reminder", "usage", "onboardingDone"
      ].forEach(function (k) { if (s[k] !== undefined && s[k] !== null) DB[k] = s[k]; });
      if (s.plan && PLANS[s.plan]) DB.plan = s.plan;
    }
    syncUser();
  }
  function syncUser() {
    USER.name = (DB.profile && DB.profile.name) || "Ángel";
    USER.initial = (USER.name.trim().charAt(0) || "Z").toUpperCase();
    if (DB.profile && DB.profile.avatar != null) DB.avatar = DB.profile.avatar;
  }
  function userEmail() { return (DB.profile && DB.profile.email) || (DB.lang === "en" ? "Add your email" : "Añade tu email"); }
  function isoDate(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function addDays(n) { var d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + n); return d; }

  var DB = {
    lang: lsGet("zynqora.lang", "es") === "en" ? "en" : "es",
    theme: lsGet("zynqora.theme", "system"),
    accent: lsGet("zynqora.accent", "violet"),
    avatar: lsGet("zynqora.avatar", ""),
    plan: (function () { var p = lsGet("zynqora.plan", "free"); return PLANS[p] ? p : "free"; })(),
    usage: (function () {
      try { var v = JSON.parse(lsGet("zynqora.usage", "null")); if (v && typeof v === "object") return v; } catch (e) {}
      return { aiMessages: 6, files: 1, tests: 2, flashcards: 8, podcasts: 0, presentations: 0, conceptMaps: 1 };
    })(),
    notifications: true,
    sessionLength: "balanced",
    reminder: { on: false, time: "18:00" },
    pathProgress: {},
    goalMin: 30,
    studiedMin: 14,
    streak: 5,
    streakDates: [],
    onboardingDone: false,
    profile: { id: (lsGet("zynqora.localUser", "") || ("u" + Math.random().toString(36).slice(2, 9))), name: "Ángel", email: "", avatar: lsGet("zynqora.avatar", "") },
    subjects: clone(SUBJECTS),
    currentSubjectId: "hist",
    reviewsDueBySubject: { hist: 12, bio: 16, mat: 8, eco: 5 },
    lastTestBySubject: {},
    sessions: [],
    conversations: [],
    calendar: [],
    documents: []
  };
  lsSet("zynqora.localUser", DB.profile.id);

  // seed calendar + conversations
  function seedContent() {
    DB.calendar = [
      { id: uid(), title: { es: "Examen de Historia", en: "History exam" }, subjectId: "hist", type: "exam", date: isoDate(addDays(5)), time: "09:00", done: false },
      { id: uid(), title: { es: "Flashcards de Genética", en: "Genetics flashcards" }, subjectId: "bio", type: "review", date: isoDate(addDays(1)), time: "", done: false },
      { id: uid(), title: { es: "Ejercicios de derivadas", en: "Derivatives exercises" }, subjectId: "mat", type: "exercise", date: isoDate(addDays(2)), time: "17:30", done: false },
      { id: uid(), title: { es: "Repaso de oferta y demanda", en: "Supply and demand review" }, subjectId: "eco", type: "study", date: isoDate(addDays(3)), time: "", done: false },
      { id: uid(), title: { es: "Sesión de estudio · Historia", en: "Study session · History" }, subjectId: "hist", type: "study", date: isoDate(addDays(0)), time: "18:00", done: false }
    ];
    DB.conversations = [
      { id: uid(), contextId: "hist", title: { es: "Revolución Francesa", en: "French Revolution" }, updated: Date.now() - 3600e3,
        messages: [
          { role: "user", text: { es: "Explícame el Antiguo Régimen", en: "Explain the Ancien Régime" } },
          { role: "ai", htmlKey: ["hist", "explain"], tutor: true }
        ] },
      { id: uid(), contextId: "mat", title: { es: "Derivadas", en: "Derivatives" }, updated: Date.now() - 86400e3,
        messages: [
          { role: "user", text: { es: "¿Qué es una derivada?", en: "What is a derivative?" } },
          { role: "ai", htmlKey: ["mat", "explain"], tutor: true }
        ] },
      { id: uid(), contextId: "bio", title: { es: "Genética", en: "Genetics" }, updated: Date.now() - 2 * 86400e3,
        messages: [
          { role: "user", text: { es: "Resume mis apuntes de genética", en: "Summarise my genetics notes" } },
          { role: "ai", htmlKey: ["bio", "summarize"], tutor: true }
        ] },
      { id: uid(), contextId: "hist", title: { es: "Preparación examen", en: "Exam prep" }, updated: Date.now() - 5 * 3600e3,
        messages: [
          { role: "user", text: { es: "Tengo el examen de Historia el viernes, ¿cómo me organizo?", en: "My History exam is on Friday, how should I organise?" } },
          { role: "ai", htmlKey: ["_generic", "plan"] }
        ] }
    ];
  }
  seedContent();
  migrateDocuments();
  function resetLocalData() {
    DB.usage = { aiMessages: 0, files: 0, tests: 0, flashcards: 0, podcasts: 0, presentations: 0, conceptMaps: 0 };
    DB.notifications = true; DB.sessionLength = "balanced"; DB.reminder = { on: false, time: "18:00" };
    DB.pathProgress = {}; DB.goalMin = 30; DB.studiedMin = 0; DB.streak = 0; DB.streakDates = [];
    DB.onboardingDone = false; DB._streakBumped = 0;
    DB.profile = { id: "u" + Math.random().toString(36).slice(2, 9), name: "Ángel", email: "", avatar: "" };
    DB.avatar = ""; DB.subjects = clone(SUBJECTS); DB.currentSubjectId = "hist";
    DB.reviewsDueBySubject = { hist: 12, bio: 16, mat: 8, eco: 5 };
    DB.lastTestBySubject = {}; DB.sessions = []; DB.documents = [];
    seedContent();
    migrateDocuments();
    S = { screen: "landing", vp: S.vp, ob: 0, obGoals: [], calMonth: new Date() };
    S.convId = null;
    syncUser();
  }

  /* ================= PLAN / USAGE HELPERS ================= */
  function saveUsage() { lsSet("zynqora.usage", JSON.stringify(DB.usage)); }
  function planOf() { return PLANS[DB.plan] || PLANS.free; }
  function planLimit(f) { return planOf().limits[f]; }
  function usageOf(f) { return DB.usage[f] || 0; }
  function remainingOf(f) { var l = planLimit(f); return l === Infinity ? Infinity : Math.max(0, l - usageOf(f)); }
  function canUse(f) { return remainingOf(f) > 0; }
  function incUsage(f, n) {
    var l = planLimit(f);
    var v = (DB.usage[f] || 0) + (n || 1);
    DB.usage[f] = (l === Infinity) ? v : Math.min(l, v);
    saveUsage(); persist("state");
  }
  function setPlan(k) { DB.plan = PLANS[k] ? k : "free"; lsSet("zynqora.plan", DB.plan); persist("state"); }
  function planName(k) { return t("plan." + (k || DB.plan)); }
  function featLabel(f) { return t("feat." + f); }
  function fmtPrice(n) {
    var s = (n % 1 === 0) ? String(n) : n.toFixed(2);
    return DB.lang === "en" ? "€" + s : s.replace(".", ",") + " €";
  }
  function limitLabel(pk, f) {
    var v = PLANS[pk].limits[f];
    if (v === Infinity) return t("feat.unlimited");
    if (f === "subjects") return String(v);
    if (v === 0) return t("feat.none");
    return t("feat.perMonth", { n: v });
  }
  function gateStart(feature, n) {
    if (!canUse(feature)) { openUpgrade(feature); return false; }
    incUsage(feature, n || 1);
    return true;
  }
  function openUpgrade(feature) { S.sheet = { kind: "upgrade", feature: feature }; render(true); }
  function openFeature(feature) { S.sheet = { kind: "feature", feature: feature }; render(true); }

  /* ================= ACCENT COLORS ================= */
  var ACCENTS = {
    violet: { light: "#5A54C9", dark: "#8E8BF3" },
    blue: { light: "#3667C9", dark: "#7098F0" },
    green: { light: "#2F8F63", dark: "#4CB98A" },
    pink: { light: "#B04E82", dark: "#DE86B0" },
    orange: { light: "#BE7735", dark: "#DBA05C" }
  };
  var ACCENT_KEYS = ["violet", "blue", "green", "pink", "orange"];
  function hexMix(a, b, w) {
    a = a.replace("#", ""); b = b.replace("#", "");
    function ch(h, i) { return parseInt(h.substr(i, 2), 16); }
    var r = Math.round(ch(a, 0) + (ch(b, 0) - ch(a, 0)) * w);
    var g = Math.round(ch(a, 2) + (ch(b, 2) - ch(a, 2)) * w);
    var bl = Math.round(ch(a, 4) + (ch(b, 4) - ch(a, 4)) * w);
    return "#" + [r, g, bl].map(function (x) { return ("0" + Math.max(0, Math.min(255, x)).toString(16)).slice(-2); }).join("");
  }
  function effectiveDark() {
    if (DB.theme === "dark") return true;
    if (DB.theme === "light") return false;
    try { return window.matchMedia("(prefers-color-scheme: dark)").matches; } catch (e) { return false; }
  }
  function applyAccent() {
    var dark = effectiveDark();
    var base = (ACCENTS[DB.accent] || ACCENTS.violet)[dark ? "dark" : "light"];
    var st = document.documentElement.style;
    st.setProperty("--accent", base);
    st.setProperty("--accent-press", dark ? hexMix(base, "#ffffff", 0.16) : hexMix(base, "#000000", 0.14));
  }

  /* ================= i18n helpers ================= */
  function t(key, vars) {
    var dict = I18N[DB.lang] || I18N.es;
    var s = dict[key] != null ? dict[key] : (I18N.es[key] != null ? I18N.es[key] : key);
    if (vars) Object.keys(vars).forEach(function (k) { s = s.replace("{" + k + "}", vars[k]); });
    return s;
  }
  function L(obj) { if (obj == null) return ""; if (typeof obj === "string") return obj; if (Array.isArray(obj)) return obj; return obj[DB.lang] != null ? obj[DB.lang] : obj.es; }
  function greeting() { var h = new Date().getHours(); return h < 6 ? t("greet.evening") : h < 13 ? t("greet.morning") : h < 20 ? t("greet.afternoon") : t("greet.evening"); }
  function diffLabel(d) { return t("diff." + (d || "med")); }
  function fmtMonth(d) {
    return d.toLocaleDateString(DB.lang === "en" ? "en-US" : "es-ES", { month: "long", year: "numeric" });
  }
  function fmtDay(d) {
    return d.toLocaleDateString(DB.lang === "en" ? "en-US" : "es-ES", { weekday: "long", day: "numeric", month: "long" });
  }
  var USER = { name: "Ángel", initial: "Á" };

  function subj(id) { return DB.subjects.filter(function (s) { return s.id === (id || DB.currentSubjectId); })[0] || DB.subjects[0]; }
  function cur() { return subj(DB.currentSubjectId); }
  function reviewsDue(id) { return DB.reviewsDueBySubject[id || DB.currentSubjectId] || 0; }

  /* ================= ZYNQORA AI ================= */
  var EXTRA_AI = {
    hist: {
      es: { compare: "<p>Los <strong>girondinos</strong> y los <strong>jacobinos</strong> eran las dos grandes facciones de la Convención (1792).</p><ul><li><strong>Girondinos</strong>: burguesía moderada, defendían una república descentralizada y frenar la radicalización.</li><li><strong>Jacobinos</strong>: más radicales, apoyados por los <em>sans-culottes</em> de París, partidarios de un gobierno fuerte y centralizado.</li></ul><p>La pugna la ganaron los jacobinos en 1793, y de ahí surge el Terror.</p>" },
      en: { compare: "<p>The <strong>Girondins</strong> and the <strong>Jacobins</strong> were the two main factions in the Convention (1792).</p><ul><li><strong>Girondins</strong>: moderate bourgeoisie, favoured a decentralised republic and slowing the radicalisation.</li><li><strong>Jacobins</strong>: more radical, backed by the Paris <em>sans-culottes</em>, in favour of a strong centralised government.</li></ul><p>The Jacobins won that struggle in 1793, and the Terror followed.</p>" }
    },
    bio: {
      es: { compare: "<p><strong>Mitosis</strong> y <strong>meiosis</strong> son dos tipos de división celular con fines distintos.</p><ul><li><strong>Mitosis</strong>: 1 división → 2 células idénticas (2n). Sirve para crecer y reparar.</li><li><strong>Meiosis</strong>: 2 divisiones → 4 gametos distintos (n). Genera variabilidad y hace posible la reproducción sexual.</li></ul>" },
      en: { compare: "<p><strong>Mitosis</strong> and <strong>meiosis</strong> are two kinds of cell division with different purposes.</p><ul><li><strong>Mitosis</strong>: 1 division → 2 identical cells (2n). For growth and repair.</li><li><strong>Meiosis</strong>: 2 divisions → 4 different gametes (n). Creates variability and enables sexual reproduction.</li></ul>" }
    },
    mat: {
      es: { compare: "<p>La <strong>primera</strong> y la <strong>segunda derivada</strong> dicen cosas distintas de la función.</p><ul><li><strong>f'(x)</strong>: pendiente. Su signo indica si la función crece o decrece; f'(x)=0 marca un punto crítico.</li><li><strong>f''(x)</strong>: curvatura. Si f''&gt;0 la función es cóncava hacia arriba (mínimo); si f''&lt;0, hacia abajo (máximo).</li></ul>" },
      en: { compare: "<p>The <strong>first</strong> and <strong>second derivative</strong> tell you different things about a function.</p><ul><li><strong>f'(x)</strong>: slope. Its sign shows whether the function is increasing or decreasing; f'(x)=0 marks a critical point.</li><li><strong>f''(x)</strong>: curvature. If f''&gt;0 the function is concave up (minimum); if f''&lt;0, concave down (maximum).</li></ul>" }
    },
    eco: {
      es: { compare: "<p>No es lo mismo <strong>moverse a lo largo</strong> de la curva de demanda que <strong>desplazarla</strong>.</p><ul><li><strong>Movimiento a lo largo</strong>: lo provoca un cambio en el <em>precio</em> del propio bien.</li><li><strong>Desplazamiento</strong>: lo provoca cualquier otro factor: renta, gustos, precio de bienes relacionados, expectativas.</li></ul>" },
      en: { compare: "<p><strong>Moving along</strong> the demand curve is not the same as <strong>shifting</strong> it.</p><ul><li><strong>Movement along</strong>: caused by a change in the good's own <em>price</em>.</li><li><strong>Shift</strong>: caused by any other factor: income, tastes, prices of related goods, expectations.</li></ul>" }
    }
  };

  var ZAI = {
    greet: {
      es: [
        "<p>¡Hola! 👋 Qué bien tenerte por aquí. ¿Qué te apetece estudiar hoy?</p>",
        "<p>¡Hola! 😊 Estoy lista para ayudarte. ¿Repasamos algo, resolvemos una duda o te pongo a prueba?</p>",
        "<p>¡Hola de nuevo! ¿Por dónde quieres empezar?</p>",
        "<p>¡Ey! Me alegra verte. Dime qué necesitas y nos ponemos.</p>"
      ],
      en: [
        "<p>Hi! 👋 Great to see you. What would you like to study today?</p>",
        "<p>Hey! 😊 Ready to help. Shall we review something, clear up a doubt, or test you?</p>",
        "<p>Hi again! Where would you like to start?</p>",
        "<p>Hey! Good to see you. Tell me what you need and let's get to it.</p>"
      ]
    },
    hello: {
      es: "<p>¡Hola! 👋 Soy <strong>Zynqora AI</strong>.</p><p>Estoy aquí para ayudarte a estudiar, resolver dudas y organizar tu aprendizaje.</p><p>¿Qué quieres hacer hoy?</p>",
      en: "<p>Hi! 👋 I'm <strong>Zynqora AI</strong>.</p><p>I'm here to help you study, answer questions and organise your learning.</p><p>What would you like to do today?</p>"
    },
    /* ---- global topic answers (work with or without context) ---- */
    topics: {
      es: [
        { re: /n[uú]meros?\s+naturales|los naturales\b/, html:
          "<p>Claro 👋</p><p>Los <strong>números naturales</strong> son los que usamos para <strong>contar</strong>: 1, 2, 3, 4, 5…</p>" +
          "<p>Si tienes 5 libros, el número <strong>5</strong> te dice cuántos hay. No tienen decimales ni signo negativo.</p>" +
          "<p>💡 Truco: son los números que aparecen cuando empiezas a contar en voz alta.</p>",
          quiz: { q: "¿Cuál de estos es un número natural?", opts: ["−3", "7", "2,5"], correct: 1, exp: "7 es natural: sirve para contar y no tiene signo ni decimales. −3 es entero (negativo) y 2,5 es decimal." } },
        { re: /n[uú]meros?\s+enteros/, html:
          "<p>Los <strong>números enteros</strong> son los naturales <em>más</em> el cero <em>y</em> los negativos: …, −3, −2, −1, 0, 1, 2, 3, …</p><p>Se usan cuando algo puede ir hacia arriba o hacia abajo: temperaturas bajo cero, deudas, plantas de un edificio.</p>" },
        { re: /derivad[ao]s?\b/, html:
          "<p>Claro 👋</p><p>Una <strong>derivada</strong> nos dice <strong>cómo cambia una función</strong> cuando cambia su variable. Es la <strong>velocidad de cambio</strong> en un punto.</p>" +
          "<p>Imagina un coche: si <em>f(t)</em> es la posición en el instante <em>t</em>, la derivada <em>f'(t)</em> es su <strong>velocidad</strong>. Geométricamente, la derivada en un punto es la <strong>pendiente</strong> de la recta tangente a la gráfica ahí.</p>" +
          "<p><strong>Ejemplo:</strong> si f(x) = x², su derivada es f'(x) = 2x. En x = 3 la pendiente vale 6.</p>" +
          "<p>💡 Regla básica: la derivada de xⁿ es n·xⁿ⁻¹.</p>" },
        { re: /(qu[eé] es una funci[oó]n|explica.*funcion|las funciones\b)/, html:
          "<p>Una <strong>función</strong> es una regla que asigna a cada valor de entrada <strong>un único</strong> valor de salida.</p><p>Se escribe <em>f(x)</em>: metes una <em>x</em> y sale un número. Ejemplo: f(x) = 2x + 1 → f(3) = 7.</p><p>Piénsala como una máquina: entra algo, se transforma, y sale un resultado.</p>" },
        { re: /(l[ií]mite de una funci[oó]n|qu[eé] es un l[ií]mite|los l[ií]mites\b)/, html:
          "<p>El <strong>límite</strong> de una función indica a qué valor <strong>se acerca</strong> f(x) cuando x se aproxima a un punto, aunque no llegue a tocarlo.</p><p>Ejemplo: cuando x → 2, la función f(x) = x + 1 se acerca a 3. Los límites son la base para definir la continuidad y la derivada.</p>" },
        { re: /fracci[oó]n|fracciones/, html:
          "<p>Una <strong>fracción</strong> representa partes de un todo: <strong>a/b</strong>, donde <em>b</em> (denominador) dice en cuántas partes divides y <em>a</em> (numerador) cuántas tomas.</p><p>Ejemplo: 3/4 de una pizza son 3 porciones de 4.</p>" },
        { re: /revoluci[oó]n francesa/, html:
          "<p>La <strong>Revolución Francesa</strong> (1789–1799) acabó con el Antiguo Régimen en Francia.</p><p>Empezó por una crisis económica y el descontento del Tercer Estado. Hitos: los <strong>Estados Generales</strong>, la <strong>Asamblea Nacional</strong>, la <strong>toma de la Bastilla</strong> (14 julio 1789) y la <strong>Declaración de los Derechos del Hombre</strong>. Luego llegaron la República, la ejecución de Luis XVI y el <strong>Terror</strong> de Robespierre.</p>" },
        { re: /bastilla/, html:
          "<p>La <strong>toma de la Bastilla</strong> (14 de julio de 1789) fue el momento simbólico del inicio de la Revolución Francesa.</p><p>La Bastilla era una fortaleza-prisión de París que representaba el poder absoluto del rey. Su asalto por el pueblo marcó que la autoridad pasaba a la nación. Hoy es la fiesta nacional de Francia.</p>" },
        { re: /\badn\b|[aá]cido desoxirribo|gen[eé]tica|mendel/, html:
          "<p>El <strong>ADN</strong> es la molécula que guarda la información hereditaria. Se organiza en <strong>genes</strong>, y cada gen puede tener variantes llamadas <strong>alelos</strong>.</p><p><strong>Mendel</strong> descubrió, con guisantes, que esos caracteres se heredan según reglas fijas: uniformidad, segregación (proporción 3:1) e independencia.</p>" },
        { re: /mitosis|meiosis/, html:
          "<p><strong>Mitosis</strong> y <strong>meiosis</strong> son dos formas de división celular:</p><ul><li><strong>Mitosis:</strong> una división → 2 células hijas idénticas (2n). Sirve para crecer y reparar tejidos.</li><li><strong>Meiosis:</strong> dos divisiones → 4 gametos con la mitad de cromosomas (n) y variabilidad genética. Es la base de la reproducción sexual.</li></ul>" },
        { re: /oferta y demanda|ley de la demanda|ley de la oferta/, html:
          "<p><strong>Oferta y demanda</strong> explican cómo se forma el precio en un mercado.</p><ul><li><strong>Demanda</strong>: cuanto más caro, menos compra la gente.</li><li><strong>Oferta</strong>: cuanto más caro, más quieren vender las empresas.</li></ul><p>El <strong>precio de equilibrio</strong> es donde ambas coinciden: ni sobra ni falta producto.</p>" },
        { re: /inflaci[oó]n/, html:
          "<p>La <strong>inflación</strong> es la subida generalizada y sostenida de los precios. Si hay inflación, con el mismo dinero compras menos: pierde poder adquisitivo.</p><p>Se mide con el IPC. Causas típicas: más demanda que oferta, subida de costes, o demasiado dinero en circulación.</p>" }
      ],
      en: [
        { re: /natural numbers?/, html:
          "<p>Sure 👋</p><p><strong>Natural numbers</strong> are the ones we use to <strong>count</strong>: 1, 2, 3, 4, 5…</p><p>If you have 5 books, the number <strong>5</strong> tells you how many. No decimals, no negative sign.</p><p>💡 Trick: they're the numbers you say out loud when you start counting.</p>",
          quiz: { q: "Which of these is a natural number?", opts: ["−3", "7", "2.5"], correct: 1, exp: "7 is natural: used for counting, no sign or decimals. −3 is an integer (negative) and 2.5 is a decimal." } },
        { re: /integers?/, html: "<p><strong>Integers</strong> are the natural numbers <em>plus</em> zero <em>and</em> the negatives: …, −3, −2, −1, 0, 1, 2, 3, …</p><p>Used when something can go up or down: temperatures below zero, debts, building floors.</p>" },
        { re: /derivatives?\b/, html:
          "<p>Sure 👋</p><p>A <strong>derivative</strong> tells you <strong>how a function changes</strong> as its input changes — the <strong>rate of change</strong> at a point.</p>" +
          "<p>Think of a car: if <em>f(t)</em> is position at time <em>t</em>, the derivative <em>f'(t)</em> is its <strong>speed</strong>. Geometrically, the derivative at a point is the <strong>slope</strong> of the tangent line there.</p>" +
          "<p><strong>Example:</strong> if f(x) = x², its derivative is f'(x) = 2x. At x = 3 the slope is 6.</p>" +
          "<p>💡 Basic rule: the derivative of xⁿ is n·xⁿ⁻¹.</p>" },
        { re: /(what is a function|explain functions|the functions\b)/, html:
          "<p>A <strong>function</strong> is a rule that gives each input <strong>exactly one</strong> output.</p><p>Written <em>f(x)</em>: put in an <em>x</em>, get a number out. Example: f(x) = 2x + 1 → f(3) = 7.</p><p>Think of a machine: something goes in, gets transformed, a result comes out.</p>" },
        { re: /(what is a limit|limit of a function|the limits\b)/, html:
          "<p>A <strong>limit</strong> tells you the value f(x) <strong>approaches</strong> as x gets close to a point, even if it never quite reaches it.</p><p>Example: as x → 2, f(x) = x + 1 approaches 3. Limits are the basis for continuity and the derivative.</p>" },
        { re: /fractions?/, html: "<p>A <strong>fraction</strong> is parts of a whole: <strong>a/b</strong>, where <em>b</em> (denominator) is how many parts you split into and <em>a</em> (numerator) how many you take.</p><p>Example: 3/4 of a pizza is 3 slices out of 4.</p>" },
        { re: /french revolution/, html: "<p>The <strong>French Revolution</strong> (1789–1799) ended the Ancien Régime in France.</p><p>It started with an economic crisis and the Third Estate's discontent. Milestones: the <strong>Estates-General</strong>, the <strong>National Assembly</strong>, the <strong>storming of the Bastille</strong> (14 July 1789) and the <strong>Declaration of the Rights of Man</strong>. Then came the Republic, Louis XVI's execution and Robespierre's <strong>Terror</strong>.</p>" },
        { re: /bastille/, html: "<p>The <strong>storming of the Bastille</strong> (14 July 1789) was the symbolic start of the French Revolution.</p><p>The Bastille was a Paris fortress-prison standing for the king's absolute power. The people's assault marked authority passing to the nation. It's now France's national holiday.</p>" },
        { re: /\bdna\b|genetics|mendel/, html: "<p><strong>DNA</strong> is the molecule that stores hereditary information. It's organised into <strong>genes</strong>, and each gene can have variants called <strong>alleles</strong>.</p><p><strong>Mendel</strong> found, with pea plants, that traits are inherited by fixed rules: uniformity, segregation (3:1 ratio) and independent assortment.</p>" },
        { re: /mitosis|meiosis/, html: "<p><strong>Mitosis</strong> and <strong>meiosis</strong> are two kinds of cell division:</p><ul><li><strong>Mitosis:</strong> one division → 2 identical daughter cells (2n). For growth and tissue repair.</li><li><strong>Meiosis:</strong> two divisions → 4 gametes with half the chromosomes (n) and genetic variability. The basis of sexual reproduction.</li></ul>" },
        { re: /supply and demand|law of demand|law of supply/, html: "<p><strong>Supply and demand</strong> explain how a market price forms.</p><ul><li><strong>Demand</strong>: the higher the price, the less people buy.</li><li><strong>Supply</strong>: the higher the price, the more firms want to sell.</li></ul><p>The <strong>equilibrium price</strong> is where they meet: no shortage, no surplus.</p>" },
        { re: /inflation/, html: "<p><strong>Inflation</strong> is a general, sustained rise in prices. With inflation, the same money buys less: it loses purchasing power.</p><p>It's measured with the CPI. Typical causes: demand outpacing supply, rising costs, or too much money in circulation.</p>" }
      ]
    },
    bank: {
      es: {
        thanks: ["<p>¡De nada! Aquí estoy cuando quieras seguir. 💪</p>", "<p>Un placer. Ánimo con el estudio.</p>", "<p>Cuando quieras. Vas bien. 🙂</p>"],
        why_failed: "<p>Repasemos ese fallo. Lo importante no es la respuesta correcta en sí, sino <strong>por qué</strong> la otra opción te pareció válida.</p><p>Vuelve al enunciado, localiza el dato clave y comprueba qué condición no se cumplía. {topicline}</p>",
        improve: "<p>Para mejorar en <strong>{topic}</strong>, céntrate en <strong>{weak}</strong>.</p><ul><li>Repasa el resumen del tema (5 min).</li><li>6 flashcards de ese concepto hoy.</li><li>Un test breve mañana para fijar.</li></ul>",
        plan: "<p>Así repartiría el estudio para tu examen:</p><ul><li><strong>Lun</strong> · Resumen + 8 flashcards del tema principal.</li><li><strong>Mar</strong> · Repaso de {weak}.</li><li><strong>Mié</strong> · Flashcards de toda la materia.</li><li><strong>Jue</strong> · Test de práctica completo.</li><li><strong>Vie</strong> · Repaso ligero, sin agobios.</li></ul><p class=\"ai-followup\">Puedo añadir este plan a tu calendario si te va bien.</p>",
        prep_exam: "<p>Para preparar el examen de <strong>{topic}</strong>, te propongo tres bloques:</p><ol><li><strong>Entender</strong>: lee el resumen y pídeme lo que no te quede claro.</li><li><strong>Practicar</strong>: flashcards + completa la palabra de {c1} y {c2}.</li><li><strong>Comprobar</strong>: un test completo y repasamos juntos los fallos.</li></ol><p>Si me dices la fecha, te lo reparto por días.</p>",
        default_ctx: "<p>Dime qué necesitas de <strong>{topic}</strong> y lo vemos: un concepto, un ejemplo, un resumen o un test.</p>",
        default_free: "<p>Cuéntame qué quieres estudiar y te ayudo directamente.</p>",
        detailed_generic: "<p>Te lo explico paso a paso 👇</p><p><strong>1 · La idea:</strong> quédate primero con <strong>{term}</strong> en una frase, con tus palabras.<br><strong>2 · Un ejemplo:</strong> busca un caso concreto que ya conozcas y compruébalo contra esa frase.<br><strong>3 · El matiz:</strong> fíjate en la condición o excepción que suele caer en el examen.</p><p>Dime tu curso o pégame el fragmento de tus apuntes sobre <strong>{term}</strong> y lo desarrollo con ejemplos a tu nivel.</p>",
        direct_generic: "<p>Vamos con <strong>{term}</strong> 👇</p><p>Para dártelo bien afinado necesito un poco más: dime <strong>de qué materia</strong> es o <strong>pégame el fragmento de tus apuntes</strong>, y te lo explico con la definición, un ejemplo resuelto y un truco para recordarlo.</p><p>Si es de Historia, Biología, Matemáticas o Economía, elige el contexto arriba y lo cojo al vuelo.</p>",
        help_exercise: "<p>Vamos a verlo 👇</p><p>Para ayudarte de verdad necesito el <strong>enunciado del ejercicio</strong> (pégalo aquí o hazle una foto y adjúntala). Con eso te lo desmenuzo paso a paso.</p><p>Mientras tanto, cuéntame: ¿qué has intentado y dónde te has quedado atascado?</p>",
        summarize: "<p>Para resumírtelos necesito el material: <strong>pega el texto aquí</strong> o adjunta el archivo, y si eliges un <strong>contexto</strong> arriba resumo directamente tus apuntes de esa materia.</p>",
        quiz_intro: ["<p>Vamos allá 👇</p>", "<p>Empezamos 👇</p>", "<p>Aquí tienes la primera 👇</p>"],
        quiz_generic: "<p>Vamos a comprobarlo. Contéstame a esto:</p><p><em>{qstem}</em></p>"
      },
      en: {
        thanks: ["<p>You're welcome! I'm here whenever you want to keep going. 💪</p>", "<p>My pleasure. Good luck with the studying.</p>", "<p>Anytime. You're doing well. 🙂</p>"],
        why_failed: "<p>Let's go over that miss. What matters isn't the right answer itself, but <strong>why</strong> the other option looked valid to you.</p><p>Go back to the question, find the key fact and check which condition wasn't met. {topicline}</p>",
        improve: "<p>To improve in <strong>{topic}</strong>, focus on <strong>{weak}</strong>.</p><ul><li>Review the topic summary (5 min).</li><li>6 flashcards on that concept today.</li><li>A short test tomorrow to lock it in.</li></ul>",
        plan: "<p>Here's how I'd spread the study for your exam:</p><ul><li><strong>Mon</strong> · Summary + 8 flashcards on the main topic.</li><li><strong>Tue</strong> · Review of {weak}.</li><li><strong>Wed</strong> · Flashcards across the whole subject.</li><li><strong>Thu</strong> · Full practice test.</li><li><strong>Fri</strong> · Light review, no stress.</li></ul><p class=\"ai-followup\">I can add this plan to your calendar if it works for you.</p>",
        prep_exam: "<p>To prepare the <strong>{topic}</strong> exam, here are three blocks:</p><ol><li><strong>Understand</strong>: read the summary and ask me anything unclear.</li><li><strong>Practise</strong>: flashcards + fill-the-word on {c1} and {c2}.</li><li><strong>Check</strong>: a full test, then we go through the misses together.</li></ol><p>Tell me the date and I'll spread it across days.</p>",
        default_ctx: "<p>Tell me what you need on <strong>{topic}</strong> and we'll do it: a concept, an example, a summary or a test.</p>",
        default_free: "<p>Tell me what you want to study and I'll help you straight away.</p>",
        detailed_generic: "<p>Step by step 👇</p><p><strong>1 · The idea:</strong> first pin down <strong>{term}</strong> in one sentence, in your own words.<br><strong>2 · An example:</strong> find a concrete case you already know and test it against that sentence.<br><strong>3 · The catch:</strong> spot the condition or exception that tends to come up in exams.</p><p>Tell me your course, or paste the bit of your notes about <strong>{term}</strong>, and I'll develop it with examples at your level.</p>",
        direct_generic: "<p>Let's take <strong>{term}</strong> 👇</p><p>To get it right for you I need a little more: tell me <strong>which subject</strong> it's from or <strong>paste the bit of your notes</strong>, and I'll give you the definition, a worked example and a memory trick.</p><p>If it's History, Biology, Maths or Economics, pick the context above and I'll take it from there.</p>",
        help_exercise: "<p>Let's look at it 👇</p><p>To really help I need the <strong>problem statement</strong> (paste it here, or take a photo and attach it). Then I'll break it down step by step.</p><p>Meanwhile, tell me: what have you tried and where did you get stuck?</p>",
        summarize: "<p>To summarise them I need the material: <strong>paste the text here</strong> or attach the file, and if you pick a <strong>context</strong> above I'll summarise that subject's notes directly.</p>",
        quiz_intro: ["<p>Let's go 👇</p>", "<p>Here we go 👇</p>", "<p>First one 👇</p>"],
        quiz_generic: "<p>Let's check. Answer this:</p><p><em>{qstem}</em></p>"
      }
    },
    tutorBtns: ["ai.tSimple", "ai.tExample", "ai.tQuiz", "ai.tDeeper"],
    _fi: 0,
    extractTerm: function (text) {
      var m = (text || "").match(/(?:expl[ií]ca(?:me)?|qu[eé] (?:es|son)|h[aá]blame de|what (?:is|are)|explain|tell me about)\s+(?:los?\s+|las?\s+|el\s+|la\s+|the\s+|a\s+)?([a-záéíóúñ0-9\s'\-]{2,40})/i);
      return m ? m[1].replace(/[?.!,]+$/, "").trim() : "";
    },
    match: function (text) {
      var s = (text || "").toLowerCase().trim();
      if (/^(hola|holaa|holi|buenas|hey|hi|hello|qu[eé] tal|hola zynqora|buenos d[ií]as|buenas tardes)[\s!.]*$/.test(s)) return "greet";
      if (/^(gracias|thanks|thank you|muchas gracias|genial|perfecto|ok gracias|mil gracias)[\s!.]*$/.test(s)) return "thanks";
      if (/no (lo )?entiend[eo].*(ejercicio|problema|esto|apartado)|ay[uú]dame con (este|el) (ejercicio|problema)|c[oó]mo (se )?(hace|resuelve) (este|el)|don'?t (get|understand).*(exercise|problem|this)|help.*(with|me).*(exercise|problem)/.test(s)) return "help_exercise";
      if (/compar|diferencia|frente a|\bvs\b|versus/.test(s)) return "compare";
      if (/(prepar|prep).*(examen|exam|prueba|test)\b|c[oó]mo (estudio|preparo|me organizo).*(examen|exam)|examen.*(viernes|lunes|martes|mi[eé]rcoles|jueves|s[aá]bado|domingo|semana|ma[ñn]ana)/.test(s)) return "prep_exam";
      if (/\bplan de estudio\b|organiz.*(estudio|semana)|repartir.*d[ií]as|planifica/.test(s)) return "plan";
      if (/profundiz|m[aá]s detalle|en detalle|desarrolla|ampl[ií]a|deeper|in detail|elaborate|cu[eé]ntame m[aá]s/.test(s)) return "detailed";
      if (/(m[aá]s )?sencill|simpl|m[aá]s f[aá]cil|easy|plain|expl[ií]ca(lo|melo).*(f[aá]cil|sencill)/.test(s)) return "simple";
      if (/ponme un ejempl|dame un ejempl|un ejempl|give me an example|example of/.test(s)) return "example";
      if (/res[uú]me|res[uú]men de|summar[iy]|haz un resumen/.test(s)) return "summarize";
      if (/ponme .*(ejercicio|ejercicios|problema|problemas)|dame .*(ejercicio|ejercicios|problema|problemas)|h[aá]zme .*(ejercicio|ejercicios|problema|problemas)|un ejercicio de|ejercicios de|give me .*(exercise|exercises|problem|problems)|practice problems?/.test(s)) return "exercise";
      if (/ponme (una )?(flashcard|tarjeta)|h[aá]zme (una )?(flashcard|tarjeta)|dame (una )?(flashcard|tarjeta)|(a|one) flashcard|make .*flashcard/.test(s)) return "flashcard";
      if (/hazme (un |una )?(test|prueba|quiz|examen|pregunta)|ponme un (test|quiz|examen)|examíname|pregúntame|preg[uú]nta me|quiz me|test me|hazme preguntas/.test(s)) return "quiz";
      if (/(por qu[eé]|porqu[eé]|porque|why).*(fall|wrong|mal|error|incorrect)|fall[eé].*(pregunt|question)|entender.*(error|fallo)/.test(s)) return "why_failed";
      if (/c[oó]mo (puedo )?mejorar|mejorar en|improve|do better/.test(s)) return "improve";
      if (/explica|expl[ií]ca|explain|qu[eé] es|que es|qu[eé] son|qu[eé] significa|what is|what are|c[oó]mo funciona|h[aá]blame de|tell me about|def[ií]nem?e/.test(s)) return "explain";
      return "default";
    },
    topicMatch: function (text) {
      var arr = this.topics[DB.lang] || this.topics.es;
      for (var i = 0; i < arr.length; i++) if (arr[i].re.test((text || "").toLowerCase())) return arr[i];
      return null;
    },
    detectSubject: function (text) {
      var s = (text || "").toLowerCase();
      if (/revoluci[oó]n francesa|antiguo r[eé]gimen|bastilla|robespierre|asamblea nacional|french revolution|ancien r[eé]gime|1789|jacobin|girondin|\bhistoria\b|\bhistory\b/.test(s)) return "hist";
      if (/gen[eé]tica|mendel|\badn\b|\bdna\b|cromosoma|mitosis|meiosis|alelo|genotipo|fenotipo|genetics|\bbiolog/.test(s)) return "bio";
      if (/derivad|integral|l[ií]mite|funci[oó]n|n[uú]meros? naturales|pendiente|tangente|m[aá]ximo|m[ií]nimo|derivative|limit\b|calculus|matem[aá]tic|\bmaths?\b|[aá]lgebra|c[aá]lculo/.test(s)) return "mat";
      if (/oferta|demanda|inflaci[oó]n|elasticidad|equilibrio de mercado|coste de oportunidad|\bpib\b|supply|demand|inflation|\bmarket\b|econom[ií]/.test(s)) return "eco";
      // materias del usuario por nombre exacto
      try {
        for (var i = 0; i < DB.subjects.length; i++) {
          var nm = (L(DB.subjects[i].name) || "").toLowerCase();
          if (nm.length > 2 && s.indexOf(nm) > -1) return DB.subjects[i].id;
        }
      } catch (e) {}
      return null;
    },
    _sub: function (str, s, term) {
      var topicline = s
        ? (DB.lang === "en" ? "In <strong>" + L(s.name) + "</strong>, mistakes often come from mixing up two similar cases." : "En <strong>" + L(s.name) + "</strong> los errores suelen venir de confundir dos casos parecidos.")
        : (DB.lang === "en" ? "Underline the exact wording — that's usually where the trap is." : "Subraya el enunciado exacto: ahí suele estar la trampa.");
      return String(str)
        .replace(/{topic}/g, s ? L(s.name) : (DB.lang === "en" ? "this topic" : "este tema"))
        .replace(/{weak}/g, s ? (L(s.weak)[0] || "") : (DB.lang === "en" ? "the trickier parts" : "las partes que más cuestan"))
        .replace(/{c1}/g, s ? (L(s.doc.analysis.main)[0] || "") : "")
        .replace(/{c2}/g, s ? (L(s.doc.analysis.main)[1] || "") : "")
        .replace(/{qstem}/g, s && s.quiz[0] ? L(s.quiz[0].q) : (DB.lang === "en" ? "Explain the main idea in your own words." : "Explica la idea principal con tus palabras."))
        .replace(/{term}/g, term || (DB.lang === "en" ? "that" : "eso"))
        .replace(/{topicline}/g, topicline);
    },
    _pick: function (a) { return a[Math.floor(Math.random() * a.length)]; },
    /* returns { html, quiz?, tutor? } — always tries to ANSWER, not interrogate */
    ask: function (text, opts) {
      opts = opts || {};
      var intent = opts.intent || this.match(text);
      var gb = this.bank[DB.lang] || this.bank.es;
      var TUTOR = ["explain", "simple", "example", "compare", "summarize", "detailed", "prep_exam"];

      if (intent === "greet") return { html: this._pick(this.greet[DB.lang] || this.greet.es) };
      if (intent === "thanks") return { html: this._pick(gb.thanks) };

      // effective subject: a topic named in the message wins over the conversation context
      var sid = this.detectSubject(text) || opts.contextId;
      var s = sid ? subj(sid) : null;

      // "hazme un test" → start it right away with a real question
      if (intent === "quiz") {
        if (s && s.quiz && s.quiz[0]) {
          var q0 = s.quiz[0];
          return { html: this._pick(gb.quiz_intro), quiz: { q: L(q0.q), opts: L(q0.opts), correct: q0.correct, exp: L(q0.exp) }, tutor: false };
        }
        return { html: this._sub(gb.quiz_generic, s), tutor: false };
      }

      // help with an exercise → we genuinely need the statement
      if (intent === "help_exercise") return { html: this._sub(gb.help_exercise, s), tutor: false };

      // "ponme un ejercicio" / "ponme 5 ejercicios" → generate them from subject content
      if (intent === "exercise") {
        var etier = /dif[ií]cil|avanzad|hard|challenging/.test((text || "").toLowerCase()) ? "hard"
          : /f[aá]cil|sencill|b[aá]sic|easy/.test((text || "").toLowerCase()) ? "easy" : "med";
        var xb = exBank(sid);
        if (xb) {
          var xn = 1, xm = (text || "").match(/(\d+)\s*(ejercicio|problema|exercise|problem)/i);
          if (xm) xn = Math.max(1, Math.min(5, parseInt(xm[1], 10)));
          var xs = (xb[etier] || xb.med).slice(0, xn).map(function (x) { return x.q; });
          var lead = DB.lang === "en" ? (xn > 1 ? "Here are " + xn + " exercises" : "Here's an exercise") : (xn > 1 ? "Aquí tienes " + xn + " ejercicios" : "Aquí tienes un ejercicio");
          var foot = DB.lang === "en" ? "Send me your answers and I'll check them." : "Mándame tus respuestas y las corrijo.";
          return { html: "<p>" + lead + " 👇</p><ol>" + xs.map(function (x) { return "<li>" + x + "</li>"; }).join("") + '</ol><p class="ai-followup">' + foot + "</p>", tutor: true };
        }
        return { html: this._sub(gb.help_exercise, s), tutor: false };
      }
      // "ponme una flashcard"
      if (intent === "flashcard") {
        if (s && s.flashcards && s.flashcards.length) {
          var rf = s.flashcards[Math.floor(Math.random() * s.flashcards.length)];
          var foot2 = DB.lang === "en" ? "Cover the answer and test yourself." : "Tapa la respuesta y ponte a prueba.";
          return { html: '<p>Flashcard 👇</p><div class="ai-fc"><div class="ai-fc-q">' + L(rf.q) + '</div><div class="ai-fc-a">' + L(rf.a) + '</div></div><p class="ai-followup">' + foot2 + "</p>", tutor: true };
        }
        return { html: this._sub(gb.default_free, s), tutor: false };
      }

      // direct topical answers (números naturales, derivadas, revolución francesa…)
      var tm = (["explain", "simple", "detailed", "default", "summarize"].indexOf(intent) > -1) ? this.topicMatch(text) : null;
      if (tm) return { html: tm.html, quiz: tm.quiz || null, tutor: true };

      // subject bank (context or detected)
      if (s) {
        var sbank = (s.ai && s.ai[DB.lang]) || {};
        var ebank = (EXTRA_AI[s.id] && EXTRA_AI[s.id][DB.lang]) || {};
        var key = intent === "detailed" ? "explain" : intent;
        var out = sbank[key] || ebank[key];
        if (out) {
          out = this._sub(out, s).replace(/<p class="ai-followup">[\s\S]*?<\/p>\s*$/, "");
          if (intent === "detailed") out += (DB.lang === "en" ? "<p>That's the core idea. I can add the exam angle or a worked example.</p>" : "<p>Esa es la idea central. Puedo añadir el enfoque de examen o un ejemplo resuelto.</p>");
          return { html: out, tutor: TUTOR.indexOf(intent) > -1 };
        }
        if (intent === "example" || intent === "compare") {
          // no bank entry: still give a subject-grounded answer, not a question
          return { html: this._sub(gb.direct_generic, s, L(s.doc.analysis.main)[0] || L(s.name)), tutor: true };
        }
      }

      // generic — still answers
      var term = this.extractTerm(text);
      var g;
      if (intent === "detailed") g = gb.detailed_generic;
      else if (intent === "prep_exam") g = gb.prep_exam;
      else if (intent === "why_failed" || intent === "improve" || intent === "plan") g = gb[intent];
      else if ((intent === "explain" || intent === "simple" || intent === "example") && term) g = gb.direct_generic;
      else g = s ? gb.default_ctx : gb.default_free;
      if (Array.isArray(g)) g = this._pick(g);
      return { html: this._sub(g, s, term), tutor: TUTOR.indexOf(intent) > -1 };
    },
    resolveKey: function (k) { // k = [subjectId|_generic, intent]
      if (k[0] === "_generic") {
        var gb = this.bank[DB.lang] || this.bank.es;
        var g = gb[k[1]] || gb.default_free;
        if (Array.isArray(g)) g = g[0];
        return this._sub(g, cur());
      }
      var s = subj(k[0]);
      var v = (s.ai[DB.lang] && s.ai[DB.lang][k[1]]) || (s.ai.es && s.ai.es[k[1]]) || (EXTRA_AI[s.id] && EXTRA_AI[s.id][DB.lang] && EXTRA_AI[s.id][DB.lang][k[1]]) || "";
      return this._sub(v, s);
    }
  };

  var AI_CTX = null;      // {kind, label}
  var AI_TYPING = false;
  var AI_ATTACH = null;   // {name, type}

  /* ================= COMPONENTS + CHROME ================= */
  var scroll = document.getElementById("scroll");
  var stage = document.getElementById("stage");
  var frame = document.getElementById("frame");

  var S = {
    screen: "landing", vp: "desktop",
    subjTab: "docs", subjPop: 0,
    fcIndex: 0, fcFlipped: 0, fcKnown: 0, fcAgain: 0,
    qIndex: 0, qPicked: null, qAnswered: 0, qScore: 0,
    ob: 0, obLevel: null,
    analysisStep: 0, analysisRunning: 0,
    addType: null, addPick: null,
    calMonth: null, calSel: null,
    convId: null, convListView: 0,
    sheet: null,
    dashFirst: 0, variant: null
  };

  function ring(pct, size, sw, center) {
    size = size || 44; sw = sw || 4;
    var p = Math.max(0, Math.min(99.9, pct));
    var r = (size - sw) / 2, c = 2 * Math.PI * r, off = c * (1 - p / 100);
    return '<div class="ring" style="width:' + size + 'px;height:' + size + 'px"><svg width="' + size + '" height="' + size + '">' +
      '<circle class="rt" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" stroke-width="' + sw + '"/>' +
      '<circle class="rf" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" stroke-width="' + sw + '" stroke-dasharray="' + c + '" stroke-dashoffset="' + off + '"/></svg>' +
      (center ? '<div class="rc">' + center + "</div>" : "") + "</div>";
  }
  function barEl(pct, color) { return '<div class="bar"><i style="width:' + pct + '%' + (color ? ";background:" + color : "") + '"></i></div>'; }
  var AVATAR_PRESETS = ["#5A54C9", "#3667C9", "#2F8F63", "#B04E82", "#BE7735", "#7A5CC0"];
  function avatarInner() {
    if (DB.avatar && DB.avatar.indexOf("data:") === 0) return '<img class="avatar-img" src="' + DB.avatar + '" alt="">';
    return USER.initial;
  }
  function avatarBg() { return (DB.avatar && DB.avatar.indexOf("#") === 0) ? DB.avatar : "var(--accent-soft)"; }
  function avatarColor() { return (DB.avatar && DB.avatar.indexOf("#") === 0) ? "#fff" : "var(--accent)"; }
  function pill(txt, cls) { return '<span class="pill ' + (cls || "") + '">' + txt + "</span>"; }
  function subjIcon(s, sz) { return '<span class="subj-icon ' + (sz || "") + '" style="background:' + s.color + '18;color:' + s.color + '">' + icon(s.icon, sz === "sm" ? 15 : sz === "lg" ? 25 : 20) + "</span>"; }
  function tint(hex, a) { return hex + a; }

  var NAV = [
    { id: "dashboard", key: "nav.today", icon: "today" },
    { id: "subjects", key: "nav.subjects", icon: "book" },
    { id: "notes", key: "nav.notes", icon: "notes" },
    { id: "calendar", key: "nav.calendar", icon: "calendar" },
    { id: "profile", key: "nav.profile", icon: "user" }
  ];
  var SIDE = NAV.slice(0, 4).concat([{ id: "progress", key: "nav.progress", icon: "chart" }, { id: "profile", key: "nav.profile", icon: "user" }]);

  function chrome(active, body, opts) {
    opts = opts || {};
    var side = '<nav class="sidenav">' +
      '<div class="brand"><span class="mk">' + icon("logo", 20) + "</span>Zynqora</div>" +
      SIDE.map(function (n) { return '<button class="nav-item ' + (n.id === active ? "on" : "") + '" data-nav="' + n.id + '">' + icon(n.icon, 18) + t(n.key) + "</button>"; }).join("") +
      '<button class="nav-ai" data-nav="ai">' + icon("spark", 16) + t("nav.ai") + "</button>" +
      '<div class="nav-spacer"></div>' +
      '<button class="nav-foot" data-nav="profile"><span class="av" style="background:' + avatarBg() + ";color:" + avatarColor() + '">' + avatarInner() + '</span><span><span class="nm">' + USER.name + '</span><br><span class="pl">' + planName() + "</span></span></button>" +
      "</nav>";
    var bottom = opts.noBottom ? "" : '<nav class="bottomnav">' +
      NAV.map(function (n) { return '<button class="bn-item ' + (n.id === active ? "on" : "") + '" data-nav="' + n.id + '">' + icon(n.icon, 21) + t(n.key) + "</button>"; }).join("") + "</nav>";
    return '<div class="app">' + side + '<div class="main">' + body + bottom + "</div></div>";
  }

  function topbar(title, opts) {
    opts = opts || {};
    var ai = opts.noAi ? "" : '<button class="tb-ai" data-nav="ai">' + icon("spark", 14) + "<span>Zynqora AI</span></button>";
    return '<div class="topbar ' + (opts.bordered ? "bordered" : "") + '">' +
      (opts.back ? '<button class="back" data-nav="' + opts.back + '">' + icon("arrowL", 18) + "</button>" : "") +
      "<h1>" + title + "</h1>" +
      '<div class="tb-actions">' + (opts.actions || "") + ai + "</div></div>";
  }

  function subjSwitcher() {
    var s = cur();
    return '<div class="subj-switch"><button class="subj-btn" data-action="subj-pop"><span class="sc" style="background:' + s.color + '"></span>' + L(s.name) + icon("chevD", 14) + "</button>" +
      (S.subjPop ? '<div class="subj-pop">' + DB.subjects.map(function (x) {
        return '<button class="' + (x.id === s.id ? "on" : "") + '" data-action="subj-set" data-id="' + x.id + '"><span class="sc" style="background:' + x.color + '"></span>' + L(x.name) + "</button>";
      }).join("") + '<div class="div"></div><button data-nav="subjects">' + icon("plus", 14) + t("subjects.add") + "</button></div>" : "") + "</div>";
  }

  function aiLink(labelKey, ctxKind, ctxLabel) {
    return '<button class="ai-link" data-ai-open="' + ctxKind + '" data-ai-label="' + (ctxLabel || "").replace(/"/g, "&quot;") + '">' + icon("spark", 14) + t(labelKey) + "</button>";
  }

  var MENU = [
    { g: "menu.welcome", items: [["landing", "menu.landing"], ["onboarding", "menu.onboarding"]] },
    { g: "menu.app", items: [
      ["dashboard", "menu.dashboard"], ["subjects", "menu.subjects"], ["subject", "menu.subject"],
      ["notes", "menu.notes"], ["addMaterial", "menu.addMaterial"], ["analysis", "menu.analysis"],
      ["document", "menu.document"], ["path", "menu.path"], ["study", "menu.study"],
      ["flashcards", "menu.flashcards"], ["fillblank", "menu.fill"], ["test", "menu.test"],
      ["results", "menu.results"], ["progress", "menu.progress"],
      ["calendar", "menu.calendar"], ["plan", "menu.plan"], ["ai", "menu.ai"], ["aitools", "menu.aitools"],
      ["plans", "menu.plans"], ["checkout", "menu.checkout"], ["policies", "menu.policies"], ["settings", "menu.settings"], ["auth", "auth.title"]
    ] },
    { g: "menu.states", items: [
      ["st-first", "menu.stFirst"], ["st-empty-notes", "menu.stEmptyNotes"],
      ["st-allclear", "menu.stAllclear"], ["st-error", "menu.stError"]
    ] }
  ];

  var V = {};

  /* ---- Landing ---- */
  V.landing = function () {
    var s = cur();
    return '<div style="min-height:100%;display:flex;flex-direction:column;background:var(--app-bg)">' +
      '<header style="display:flex;align-items:center;justify-content:space-between;padding:22px 24px">' +
        '<div class="row" style="gap:9px;font-weight:600;font-size:17px;letter-spacing:-.015em"><span style="color:var(--accent)">' + icon("logo", 20) + "</span>Zynqora</div>" +
        '<button class="btn btn-ghost btn-sm" data-nav="onboarding">' + t("landing.signin") + "</button></header>" +
      '<div class="wrap" style="max-width:960px;flex:1;display:flex;flex-direction:column;justify-content:center;padding-top:24px;padding-bottom:40px">' +
        '<div class="landing-grid" style="display:grid;gap:40px">' +
          '<div style="max-width:30ch"><div class="pill accent" style="margin-bottom:18px"><span class="dot"></span>' + t("landing.badge") + "</div>" +
            '<h1 style="font-size:37px;line-height:1.08;letter-spacing:-.03em;font-weight:600">' + t("landing.title") + "</h1>" +
            '<p style="font-size:16px;color:var(--muted);margin-top:16px;line-height:1.55">' + t("landing.sub") + "</p>" +
            '<div class="row" style="gap:10px;margin-top:26px"><button class="btn btn-primary btn-lg" data-nav="onboarding">' + t("landing.cta") + icon("arrowR", 16) + "</button>" +
            '<button class="btn btn-ghost btn-lg" data-nav="dashboard">' + t("landing.demo") + "</button></div>" +
            '<p class="txt-sm txt-muted" style="margin-top:14px">' + t("landing.note") + "</p></div>" +
          '<div class="hero-visual"><div style="position:absolute;inset:0;padding:22px;display:flex;flex-direction:column;gap:12px">' +
            '<div class="eyebrow">' + t("dash.nextStep") + '</div><div style="font-size:20px;font-weight:600;letter-spacing:-.02em">' + L(s.name) + " · " + L(s.doc.title).replace(".pdf", "").replace(".PDF", "") + "</div>" +
            '<div class="row txt-sm txt-muted" style="gap:6px">' + icon("clock", 14) + "24 " + t("common.minutes") + '</div><div class="bar" style="margin-top:2px"><i style="width:58%"></i></div>' +
            '<div style="margin-top:auto;display:flex;gap:8px">' + pill('<span class="dot" style="background:var(--good)"></span>12 ' + t("dash.reviews")) + pill("5 " + t("dash.streak")) + "</div></div></div></div>" +
        '<div class="landing-feat" style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:52px">' +
          featCard("notes", t("landing.f1t"), t("landing.f1d")) + featCard("layers", t("landing.f2t"), t("landing.f2d")) + featCard("target", t("landing.f3t"), t("landing.f3d")) + "</div></div>" +
      '<footer style="padding:22px 24px;border-top:1px solid var(--border);color:var(--faint);font-size:12px">' + t("landing.footer") + "</footer>" +
      "<style>@container (max-width:760px){.landing-feat{grid-template-columns:1fr!important}.landing-grid h1{font-size:29px!important}}@container (min-width:900px){.landing-grid{grid-template-columns:1fr 1fr;align-items:center}}</style></div>";
  };
  function featCard(ic, tt, d) {
    return '<div class="card"><div style="color:var(--accent);margin-bottom:10px">' + icon(ic, 20) + '</div><div class="h-sec" style="font-size:14.5px">' + tt + '</div><p class="txt-sm txt-muted" style="margin-top:4px">' + d + "</p></div>";
  }

  /* ---- Onboarding ---- */
  function obReady() {
    if (S.ob === 1) return !!S.obSource;
    if (S.ob === 2) return (S.obGoals && S.obGoals.length > 0);
    if (S.ob === 3) return !!S.obLevel;
    if (S.ob === 4) return !!S.obFirst && (S.obFirst !== "new" || (document.getElementById("obNewName") && document.getElementById("obNewName").value.trim()));
    return true;
  }
  function obOpt(field, v, label, opts) {
    opts = opts || {};
    var on = opts.multi ? (S.obGoals || []).indexOf(v) > -1 : S["ob" + field.charAt(0).toUpperCase() + field.slice(1)] === v;
    return '<button class="ob-opt ' + (opts.multi ? "" : "rounded") + " " + (on ? "sel" : "") + '" data-action="ob-pick" data-field="' + field + '" data-v="' + v + '"' + (opts.multi ? ' data-multi="1"' : "") + ">" +
      (opts.emoji ? '<span class="ob-emoji">' + opts.emoji + "</span>" : "") +
      '<span style="flex:1">' + label + "</span>" +
      '<span class="ck">' + (on ? icon("check", 12) : "") + "</span></button>";
  }
  V.onboarding = function () {
    var total = 4;
    var dots = S.ob >= 1 && S.ob <= 4 ? '<div class="step-dots">' + [1, 2, 3, 4].map(function (i) { return '<i class="' + (i === S.ob ? "on" : i < S.ob ? "done" : "") + '"></i>'; }).join("") + "</div>" : "";
    var inner = "";
    if (S.ob === 0) {
      inner = '<div class="ob-hero"><span class="wave">👋</span><h1 style="font-size:27px;letter-spacing:-.02em;font-weight:600">' + t("ob.welcomeTitle") + '</h1>' +
        '<p class="txt-muted" style="margin:10px auto 0;max-width:32ch">' + t("ob.welcomeSub") + '</p>' +
        '<button class="btn btn-primary btn-lg" style="margin-top:26px" data-action="ob-next">' + t("ob.welcomeStart") + icon("arrowR", 16) + "</button></div>";
    } else if (S.ob === 1) {
      inner = obHead(1, "ob.qHow") +
        '<div class="ob-list">' +
          obOpt("source", "friend", t("ob.howFriend"), { emoji: "🧑‍🤝‍🧑" }) + obOpt("source", "tiktok", t("ob.howTiktok"), { emoji: "🎵" }) +
          obOpt("source", "insta", t("ob.howInsta"), { emoji: "📸" }) + obOpt("source", "youtube", t("ob.howYoutube"), { emoji: "▶️" }) +
          obOpt("source", "google", t("ob.howGoogle"), { emoji: "🔍" }) + obOpt("source", "other", t("ob.howOther"), { emoji: "✨" }) +
        "</div>";
    } else if (S.ob === 2) {
      inner = obHead(2, "ob.qGoal", "ob.qGoalSub") +
        '<div class="ob-list">' +
          obOpt("goals", "grades", t("ob.goalGrades"), { multi: 1 }) + obOpt("goals", "organise", t("ob.goalOrganise"), { multi: 1 }) +
          obOpt("goals", "exams", t("ob.goalExams"), { multi: 1 }) + obOpt("goals", "understand", t("ob.goalUnderstand"), { multi: 1 }) +
          obOpt("goals", "time", t("ob.goalTime"), { multi: 1 }) + obOpt("goals", "habit", t("ob.goalHabit"), { multi: 1 }) +
        "</div>";
    } else if (S.ob === 3) {
      inner = obHead(3, "ob.qLevel") +
        '<div class="ob-list">' +
          obOpt("level", "eso", t("ob.lvlEso")) + obOpt("level", "bach", t("ob.lvlBach")) + obOpt("level", "univ", t("ob.lvlUniv")) +
          obOpt("level", "fp", t("ob.lvlFp")) + obOpt("level", "otro", t("ob.lvlOtro")) +
        "</div>";
    } else if (S.ob === 4) {
      inner = obHead(4, "ob.qFirst", "ob.qFirstSub") +
        '<div class="ob-list">' +
          DB.subjects.map(function (x) {
            var on = S.obFirst === x.id;
            return '<button class="ob-opt rounded ' + (on ? "sel" : "") + '" data-action="ob-pick" data-field="first" data-v="' + x.id + '"><span class="ob-emoji" style="color:' + x.color + '">' + icon(x.icon, 15) + '</span><span style="flex:1">' + L(x.name) + '</span><span class="ck">' + (on ? icon("check", 12) : "") + "</span></button>";
          }).join("") +
          '<button class="ob-opt rounded ' + (S.obFirst === "new" ? "sel" : "") + '" data-action="ob-pick" data-field="first" data-v="new"><span class="ob-emoji">' + icon("plus", 15) + '</span><span style="flex:1">' + t("ob.createNew") + '</span><span class="ck">' + (S.obFirst === "new" ? icon("check", 12) : "") + "</span></button>" +
        "</div>" +
        (S.obFirst === "new" ? '<input class="field" id="obNewName" placeholder="' + t("ob.newNamePh") + '" style="margin-top:12px" value="' + esc(S.obNewName || "") + '">' : "");
    } else {
      inner = '<div class="ob-hero"><div style="width:64px;height:64px;border-radius:20px;background:var(--good-soft);color:var(--good);display:grid;place-items:center;margin:0 auto 18px">' + icon("check", 30) + "</div>" +
        '<h1 style="font-size:25px;letter-spacing:-.02em;font-weight:600;text-wrap:balance">' + t("ob.readyTitle") + '</h1>' +
        '<p class="txt-muted" style="margin:10px auto 0;max-width:32ch">' + t("ob.readySub") + '</p>' +
        '<button class="btn btn-primary btn-lg" style="margin-top:26px" data-action="ob-finish">' + t("ob.readyStart") + icon("arrowR", 16) + "</button></div>";
    }
    var showNext = S.ob >= 1 && S.ob <= 4;
    return '<div style="min-height:100%;display:flex;flex-direction:column;background:var(--app-bg)">' +
      '<header style="display:flex;align-items:center;justify-content:space-between;padding:20px 22px">' +
        (S.ob > 0 && S.ob <= 4 ? '<button class="btn btn-ghost btn-sm" data-action="ob-back">' + icon("arrowL", 15) + t("common.back") + "</button>" : '<span class="row" style="gap:8px;font-weight:600"><span style="color:var(--accent)">' + icon("logo", 18) + "</span>Zynqora</span>") +
        dots +
        (S.ob >= 1 && S.ob <= 4 ? '<button class="btn btn-ghost btn-sm" data-action="ob-finish">' + t("common.skip") + "</button>" : "<span></span>") +
      "</header>" +
      '<div class="fade-in" style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:20px;max-width:520px;margin:0 auto;width:100%">' + inner +
        (showNext ? '<button class="btn btn-primary btn-block btn-lg" style="margin-top:24px" data-action="ob-next" ' + (obReady() ? "" : "disabled") + ">" + t("common.continue") + "</button>" : "") +
      "</div></div>";
  };
  function obHead(n, qKey, subKey) {
    return '<div class="eyebrow" style="margin-bottom:12px">' + t("ob.step", { n: n, total: 4 }) + '</div><h1 class="ob-q">' + t(qKey) + "</h1>" +
      (subKey ? '<p class="txt-muted" style="margin-top:6px">' + t(subKey) + "</p>" : "");
  }
  function typeCard(kind, key) {
    var m = { pdf: "doc", doc: "notes", image: "image", text: "text" };
    return '<button class="type-card" data-action="add-type" data-type="' + kind + '"><span class="ti">' + icon(m[kind], 20) + "</span><b>" + t(key) + "</b><span>" + t(key + "Sub") + "</span></button>";
  }

  /* ---- Dashboard ---- */
  V.dashboard = function () {
    if (S.dashFirst) return V["st-first"]();
    var s = cur();
    var pct = Math.min(100, Math.round(DB.studiedMin / DB.goalMin * 100));
    var lt = DB.lastTestBySubject[s.id];
    var upcoming = DB.calendar.filter(function (x) { return !x.done && x.date >= isoDate(addDays(0)); }).sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    var nextExam = upcoming.filter(function (x) { return x.type === "exam"; })[0];
    var examDays = nextExam ? Math.round((new Date(nextExam.date) - addDays(0)) / 86400e3) : 0;
    var docTopic = L(s.doc.title).replace(/\.(pdf|PDF)$/, "");
    var nextStepText = reviewsDue(s.id) > 0 ? t("dash.reviewTopic", { topic: docTopic }) : t("dash.studyWeak", { topic: (L(s.weak)[0] || docTopic) });
    var body = topbar(greeting() + ", " + USER.name, { actions: subjSwitcher() }) +
      '<div class="wrap stagger">' +
        '<div class="card card-lg" style="border-color:var(--accent-line)">' +
          '<div class="eyebrow" style="color:var(--accent)">' + t("dash.nextStep") + "</div>" +
          '<div class="row" style="gap:12px;margin-top:12px">' + subjIcon(s, "sm") +
            '<div><div style="font-size:19px;font-weight:600;letter-spacing:-.02em">' + nextStepText + "</div>" +
            '<div class="txt-sm txt-muted" style="margin-top:2px">' + L(s.name) + " · " + t("dash.estimated", { n: 24 }) + "</div></div></div>" +
          '<p class="txt-sm txt-muted" style="margin-top:14px">' + t("dash.reason") + "</p>" +
          '<button class="btn btn-primary btn-lg btn-block" style="margin-top:16px" data-action="dash-start">' + icon("play", 15) + t("dash.startSession") + "</button></div>" +

        (lt ? '<button class="card" style="margin-top:14px;width:100%;text-align:left" data-nav="results"><div class="between"><div><div class="eyebrow">' + t("dash.lastTest") + "</div>" +
          '<div style="margin-top:6px;font-size:15px">' + t("dash.lastTestSub", { score: lt.score, total: lt.total, topic: L(s.name) }) + "</div></div>" + ring(Math.round(lt.score / lt.total * 100), 44, 4) + "</div></button>" : "") +

        '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:14px">' +
          mini(String(reviewsDue(s.id)), t("dash.reviews"), "layers") +
          mini(String(L(s.weak).length), t("dash.weak"), "target") +
          mini(String(DB.streak), t("dash.streak"), "lightning") + "</div>" +

        '<div class="card" style="margin-top:14px"><div class="between"><span class="h-sec">' + t("dash.todayProgress") + '</span><span class="mono txt-sm txt-muted">' + DB.studiedMin + " / " + DB.goalMin + " " + t("common.min") + "</span></div>" +
          '<div style="margin-top:12px">' + barEl(pct) + '</div><p class="txt-sm txt-muted" style="margin-top:10px">' + (DB.studiedMin >= DB.goalMin ? t("dash.goalDone") : t("dash.goalLeft", { n: DB.goalMin - DB.studiedMin })) + "</p></div>" +

        (upcoming.length ? '<div class="card" style="margin-top:14px"><div class="between"><span class="h-sec">' + t("dash.upcoming") + '</span><button class="btn btn-ghost btn-sm" data-nav="calendar">' + t("common.seeAll") + "</button></div>" +
          '<div class="divide" style="margin-top:4px">' + upcoming.slice(0, 3).map(taskRow).join("") + "</div></div>" : "") +

        (nextExam && examDays <= 7 ? '<div class="ai-block" style="margin-top:14px"><div class="ah">' + icon("calendar", 13) + t("dash.nextExam") + "</div>" +
          '<div class="txt-sm">' + L(nextExam.title) + " · " + t("dash.inDays", { n: examDays }) + '</div><button class="ai-link" style="margin-top:10px" data-action="go-plan" data-exam="' + nextExam.id + '">' + icon("wand", 14) + t("dash.seePlan") + "</button></div>" : "") +

        '<div class="card" style="margin-top:14px"><div class="between"><span class="h-sec">' + t("dash.weakTitle") + '</span><button class="btn btn-ghost btn-sm" data-nav="subject" data-tab="weak">' + t("common.seeAll") + "</button></div>" +
          '<div class="divide" style="margin-top:4px">' + L(s.weak).map(function (w) { return weakRow(w, L(s.name)); }).join("") + "</div></div>" +

        '<div class="card" style="margin-top:14px;border-color:var(--accent-line)"><div class="row" style="gap:12px">' +
          '<span style="width:36px;height:36px;border-radius:10px;background:var(--accent);color:#fff;display:grid;place-items:center;flex-shrink:0">' + icon("spark", 17) + "</span>" +
          '<div style="flex:1"><div style="font-weight:600;letter-spacing:-.01em">Zynqora AI</div><div class="txt-sm txt-muted">' + t("dash.askAiCard") + "</div></div>" +
          '<button class="btn btn-secondary btn-sm" data-nav="ai">' + t("dash.open") + "</button></div></div>" +

        '<button class="card" style="margin-top:14px;width:100%;text-align:left" data-nav="aitools"><div class="between"><div><div class="eyebrow">' + t("tools.title") + '</div><div class="txt-sm txt-muted" style="margin-top:4px">' + t("tools.sub") + '</div></div><span style="color:var(--faint)">' + icon("chevR", 18) + "</span></div></button>" +
      "</div>";
    return chrome("dashboard", body);
  };
  function mini(v, l, ic) { return '<div class="card" style="padding:14px 15px"><div class="between"><span style="font-size:19px;font-weight:600;letter-spacing:-.02em">' + v + '</span><span style="color:var(--faint)">' + icon(ic, 15) + '</span></div><div class="txt-sm txt-muted" style="margin-top:2px">' + l + "</div></div>"; }
  function weakRow(tt, sb) { return '<button class="list-row tap" style="width:100%" data-nav="study"><span class="ic" style="background:var(--attn-soft);color:var(--attn)">' + icon("target", 17) + '</span><span class="gr"><span class="tt">' + tt + '</span><span class="sb">' + sb + '</span></span><span class="ch">' + icon("chevR", 18) + "</span></button>"; }
  var TASK_TYPE = { exam: { ic: "flag", c: "var(--danger)" }, review: { ic: "refresh", c: "var(--accent)" }, study: { ic: "book", c: "var(--good)" }, exercise: { ic: "dumbbell", c: "var(--attn)" } };
  function taskTypeLabel(ty) { return t("cal.type" + ty.charAt(0).toUpperCase() + ty.slice(1)); }
  function taskRow(x) {
    var tt = TASK_TYPE[x.type] || TASK_TYPE.study;
    var sname = subj(x.subjectId);
    var when = x.date === isoDate(addDays(0)) ? t("common.today") : x.date === isoDate(addDays(1)) ? t("common.tomorrow") : new Date(x.date).toLocaleDateString(DB.lang === "en" ? "en-US" : "es-ES", { day: "numeric", month: "short" });
    return '<button class="list-row tap" style="width:100%" data-action="task-open" data-id="' + x.id + '"><span class="tk" style="background:' + tt.c + '18;color:' + tt.c + '">' + icon(tt.ic, 16) + "</span>" +
      '<span class="gr"><span class="tt">' + L(x.title) + '</span><span class="sb">' + taskTypeLabel(x.type) + " · " + L(sname.name) + " · " + when + (x.time ? " · " + x.time : "") + "</span></span>" +
      (x.done ? '<span class="pill good" style="height:22px">' + icon("check", 11) + "</span>" : '<span class="ch">' + icon("chevR", 16) + "</span>") + "</button>";
  }

  /* ---- Subjects list ---- */
  V.subjects = function () {
    var body = topbar(t("subjects.title"), { actions: '<button class="btn btn-secondary btn-sm" data-action="add-subject">' + icon("plus", 15) + t("subjects.add") + "</button>" }) +
      '<div class="wrap wide"><div class="stagger" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px">' +
        DB.subjects.map(function (s) {
          var due = reviewsDue(s.id);
          var ndocs = (s.doc ? 1 : 0) + (s.extraDocs ? s.extraDocs.length : 0);
          return '<button class="card" style="text-align:left" data-action="open-subject" data-id="' + s.id + '"><div class="row" style="gap:12px">' + subjIcon(s) +
            '<div style="flex:1;min-width:0"><div style="font-weight:600;letter-spacing:-.01em">' + L(s.name) + '</div><div class="txt-sm txt-muted">' + ndocs + " " + (ndocs === 1 ? t("subjects.doc1") : t("subjects.docs")) + "</div></div>" +
            (due ? pill(String(due), "accent") : pill(icon("check", 11), "good")) + "</div>" +
            '<div style="margin-top:14px">' + barEl(s.mastery, s.color) + '</div><div class="txt-sm txt-muted mono" style="margin-top:7px">' + t("subjects.mastery", { n: s.mastery }) + "</div></button>";
        }).join("") +
        '<button class="card" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:var(--muted);border-style:dashed;min-height:150px" data-action="add-subject">' + icon("plus", 20) + '<span class="txt-sm">' + t("subjects.add") + "</span></button>" +
      "</div></div>";
    return chrome("subjects", body);
  };

  /* ---- Subject detail ---- */
  V.subject = function () {
    var s = cur();
    var tab = S.subjTab;
    var tabs = ["docs", "flashcards", "tests", "progress", "weak"];
    var head = topbar(L(s.name), { back: "subjects", actions: subjSwitcher() }) +
      '<div class="wrap"><div class="card card-lg" style="display:flex;align-items:center;gap:16px">' + subjIcon(s, "lg") +
        '<div style="flex:1"><div class="eyebrow">' + t("subject.overall") + '</div><div style="font-size:26px;font-weight:600;letter-spacing:-.02em;margin-top:2px">' + s.mastery + "%</div></div>" + ring(s.mastery, 54, 5) + "</div>" +
      '<div class="tabs" style="margin-top:20px">' + tabs.map(function (x) { return '<button class="' + (x === tab ? "on" : "") + '" data-action="subj-tab" data-tab="' + x + '">' + t("tab." + x) + "</button>"; }).join("") + "</div>" +
      '<div class="fade-in" style="margin-top:16px">';
    var inner = "";
    if (tab === "docs") {
      var sdocs = docsOfSubject(s.id);
      inner = (sdocs.length ? '<div class="card divide" style="padding:4px 20px">' + sdocs.map(docRow).join("") + "</div>" : '<div class="empty"><div class="eic">' + icon("notes", 22) + "</div><p>" + t("subject.noDocs") + "</p></div>") +
        '<button class="btn btn-secondary btn-block" style="margin-top:14px" data-action="add-to-subject">' + icon("plus", 15) + t("subject.addMaterial") + "</button>";
    } else if (tab === "flashcards") {
      inner = '<div class="card"><div class="between"><span class="h-sec">' + t("subject.cardsCount", { n: s.flashcards.length }) + '</span>' + pill(String(reviewsDue(s.id)) + " " + t("dash.reviews"), "accent") + "</div>" +
        '<div class="divide" style="margin-top:6px">' + s.flashcards.slice(0, 3).map(function (c) { return '<div class="list-row" style="padding:11px 0"><span class="gr"><span class="tt" style="font-weight:450;font-size:13.5px">' + L(c.q) + '</span><span class="sb">' + diffLabel(c.diff) + "</span></span></div>"; }).join("") + "</div>" +
        '<button class="btn btn-primary btn-block" style="margin-top:12px" data-nav="flashcards">' + icon("cards", 15) + t("subject.reviewCards") + "</button></div>";
    } else if (tab === "tests") {
      inner = '<div class="card"><div class="row" style="gap:10px"><span class="subj-icon sm" style="background:var(--surface-2);color:var(--muted)">' + icon("quiz", 15) + "</span>" +
        '<div style="flex:1"><div style="font-weight:600">' + t("subject.testsCount", { n: s.testsTaken }) + '</div><div class="txt-sm txt-muted">' + s.quiz.length + " " + t("results.questions") + "</div></div></div>" +
        '<button class="btn btn-primary btn-block" style="margin-top:12px" data-nav="test">' + icon("quiz", 15) + t("subject.startTest") + "</button></div>";
    } else if (tab === "progress") {
      inner = '<div class="card"><div class="between"><span class="h-sec">' + t("subject.overall") + '</span><span class="mono txt-sm txt-muted">' + s.mastery + '%</span></div><div style="margin-top:12px">' + barEl(s.mastery, s.color) + "</div>" +
        '<div class="txt-sm txt-muted" style="margin-top:14px">' + t("subject.lastSession", { n: s.lastSessionDays }) + "</div></div>" +
        '<div class="card" style="margin-top:14px"><span class="h-sec">' + t("progress.concepts") + '</span><div class="divide" style="margin-top:4px">' +
        L(s.doc.analysis.main).slice(0, 4).map(function (m, i) { var v = [82, 66, 54, 38][i]; var col = v >= 70 ? "var(--good)" : v >= 45 ? "var(--accent)" : "var(--attn)"; return '<div class="concept-row"><span class="cn">' + m + '</span><span class="cb">' + barEl(v, col) + '</span><span class="cv mono">' + v + "%</span></div>"; }).join("") + "</div></div>";
    } else if (tab === "weak") {
      inner = L(s.weak).length ? '<div class="card divide" style="padding:4px 20px">' + L(s.weak).map(function (w) {
        return '<div class="list-row" style="padding:13px 0"><span class="ic" style="background:var(--attn-soft);color:var(--attn)">' + icon("target", 17) + '</span><span class="gr"><span class="tt">' + w + "</span></span>" +
          '<button class="ai-link" data-ai-open="explain" data-ai-label="' + w.replace(/"/g, "&quot;") + '">' + icon("spark", 13) + t("fc.explainAi") + "</button></div>";
      }).join("") + "</div>" : '<div class="empty"><div class="eic" style="background:var(--good-soft);color:var(--good)">' + icon("check", 22) + "</div><p>" + t("subject.noWeak") + "</p></div>";
    }
    return chrome("subjects", head + inner + "</div></div>");
  };
  /* ================== FASE D — pantallas de material ================== */
  function docKindIcon(d) { return d.kind === "text" ? "text" : d.kind === "image" ? "image" : "doc"; }
  function docStatusPill(d) {
    var st = d.status || "analyzed";
    var tone = st === "analyzed" ? "good" : st === "failed" ? "danger" : st === "processing" ? "accent" : "attn";
    var ic = st === "analyzed" ? "check" : st === "failed" ? "alert" : st === "processing" ? "refresh" : "clock";
    return pill(icon(ic, 11) + t("doc.status." + st), tone);
  }
  function docSourceBadge(d) {
    if (d.seeded) return '<span class="gen-local-badge" style="color:var(--muted);background:var(--surface-2)">' + t("doc.exampleBadge") + "</span>";
    if (docHasText(d)) return '<span class="gen-local-badge">' + t("doc.localBadge") + "</span>";
    return "";
  }
  function curDoc() {
    return docById(S.docId) || docsOfSubject(DB.currentSubjectId)[0] || (DB.documents || [])[0] || null;
  }
  function docRow(d) {
    var an = d.status === "processing";
    var meta;
    if (an) meta = t("notes.analyzing") + "…";
    else if (docHasText(d)) meta = t("doc.wordsN", { n: (d.analysis && d.analysis.wordCount) || DocGen.analyze(d.text).wordCount }) + " · " + t("doc.status." + (d.status || "analyzed"));
    else if (d.seeded) meta = (d.pages || 12) + " " + t("notes.pages") + " · " + t("doc.exampleBadge").toLowerCase();
    else meta = t("doc.status." + (d.status || "pending"));
    return '<button class="list-row ' + (an ? "" : "tap") + '" style="width:100%" ' + (an ? "" : 'data-action="open-doc" data-id="' + d.id + '"') + '><span class="ic">' + icon(docKindIcon(d), 18) + "</span>" +
      '<span class="gr"><span class="tt" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(L(d.title)) + '</span><span class="sb">' + meta + "</span></span>" +
      (an ? '<div class="an-spin"></div>' : docStatusPill(d)) + "</button>";
  }

  /* ---- Notes (all material) ---- */
  V.notes = function () {
    var body = topbar(t("notes.title"), { actions: '<button class="btn btn-secondary btn-sm" data-action="add-material">' + icon("plus", 15) + t("notes.addMaterial") + "</button>" }) +
      '<div class="wrap"><p class="txt-sm txt-muted" style="margin-bottom:18px">' + t("notes.sub") + '</p>' +
      (!(DB.documents || []).length
        ? '<div class="empty" style="padding-top:30px"><div class="eic">' + icon("notes", 22) + '</div><h3>' + t("notes.emptyTitle") + '</h3><p>' + t("notes.emptySub") + '</p><button class="btn btn-primary btn-lg" style="margin-top:14px" data-action="add-material">' + icon("plus", 15) + t("notes.addMaterial") + "</button></div>"
        : '<div class="stagger" style="display:flex;flex-direction:column;gap:22px">' +
        DB.subjects.map(function (s) {
          var docs = docsOfSubject(s.id);
          if (!docs.length) return "";
          return '<div><div class="row" style="gap:10px;margin-bottom:10px">' + subjIcon(s, "sm") + '<span style="font-weight:600;letter-spacing:-.01em">' + L(s.name) + '</span><span class="txt-sm txt-muted">' + docs.length + " " + (docs.length === 1 ? t("subjects.doc1") : t("subjects.docs")) + "</span></div>" +
            '<div class="card divide" style="padding:4px 18px">' + docs.map(docRow).join("") + "</div></div>";
        }).join("") + "</div>") + "</div>";
    return chrome("notes", body);
  };

  /* ---- Add material ---- */
  V.addMaterial = function () {
    var s = cur();
    if (!S.addType) {
      var body = topbar(t("add.title"), { back: "notes", noAi: true }) +
        '<div class="wrap" style="max-width:560px"><p class="txt-sm txt-muted" style="margin-bottom:18px">' + t("add.sub", { subject: L(s.name) }) + '</p>' +
          '<div class="type-grid">' + typeCard("pdf", "add.pdf") + typeCard("doc", "add.doc") + typeCard("image", "add.image") + typeCard("text", "add.text") + "</div></div>";
      return chrome("notes", body);
    }
    var typeName = t("add." + S.addType);
    if (S.addType === "text") {
      var b2 = topbar(typeName, { back: "addMaterial", noAi: true }) +
        '<div class="wrap" style="max-width:560px"><label class="label">' + typeName + " · " + L(s.name) + '</label>' +
        '<textarea class="field" id="addText" style="height:170px;padding:12px 14px;line-height:1.5" placeholder="' + t("add.textPlaceholder") + '"></textarea>' +
        '<p class="txt-sm txt-muted" style="margin-top:8px">' + t("add.pasteReal") + '</p>' +
        '<button class="btn btn-primary btn-lg btn-block" style="margin-top:14px" data-action="run-analysis">' + icon("wand", 16) + t("add.analyze") + "</button></div>";
      return chrome("notes", b2);
    }
    var b3 = topbar(typeName + " · " + L(s.name), { back: "addMaterial", noAi: true }) +
      '<div class="wrap" style="max-width:560px">' +
        (S.addPick
          ? '<div class="filechip"><span class="fi">' + icon(S.addType === "image" ? "image" : "doc", 18) + '</span><div style="flex:1;min-width:0"><div style="font-weight:500;font-size:13.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(S.addPick.name) + '</div><div class="txt-sm txt-muted mono">' + S.addPick.size + (S.addPick.mime ? " · " + esc(S.addPick.mime) : "") + '</div></div><button class="btn btn-ghost btn-sm" data-action="add-clear">' + t("add.remove") + "</button></div>" +
            '<button class="btn btn-primary btn-lg btn-block" style="margin-top:16px" data-action="run-analysis">' + icon("wand", 16) + t("add.analyze") + "</button>"
          : '<div class="dropzone" id="dropzone"><div style="width:46px;height:46px;border-radius:12px;background:var(--accent-soft);color:var(--accent);display:grid;place-items:center;margin:0 auto 12px">' + icon("upload", 22) + "</div>" +
              '<div style="font-weight:600;font-size:14px">' + t("add.sourceTitle") + '</div><div class="txt-sm txt-muted" style="margin-top:4px;max-width:34ch;margin-left:auto;margin-right:auto">' + t("add.chooseSub") + "</div>" +
              '<button class="btn btn-secondary btn-sm" style="margin-top:14px" data-action="file-pick">' + t("add.choose") + '</button><input type="file" id="fileInput" accept="' + (S.addType === "image" ? "image/*" : ".pdf,.txt,.md,.docx,application/pdf,text/plain") + '" style="display:none"></div>' +
            '<p class="txt-sm txt-muted" style="margin-top:12px">' + (Ingest.hasDecompression ? "" : (DB.lang === "en" ? "Note: your browser can't decompress PDF streams — PDF extraction may be limited." : "Nota: tu navegador no puede descomprimir flujos de PDF — la extracción de PDF puede ser limitada.")) + "</p>") +
      "</div>";
    return chrome("notes", b3);
  };

  /* ---- Analysis (progreso + resultado real) ---- */
  V.analysis = function () {
    var d = docById(S.docId);
    var name = d ? L(d.title) : "";
    if (!d || S.analysisStep < 4) {
      var keys = ["an.reading", "an.extracting", "an.analyzing", "an.preparing"];
      var body = topbar(t("analysis.title"), { back: "notes", noAi: true }) +
        '<div class="wrap" style="max-width:520px"><div class="card card-lg">' +
          '<div class="row" style="gap:10px;margin-bottom:6px"><div class="an-spin"></div><span style="font-weight:600;letter-spacing:-.01em">' + t("analysis.working") + "</span></div>" +
          '<p class="txt-sm txt-muted" style="margin-bottom:8px">' + esc(name) + "</p>" +
          '<div id="anSteps">' + keys.map(function (k, i) {
            var cls = i < S.analysisStep ? "in done" : i === S.analysisStep ? "in active" : "";
            return '<div class="an-step ' + cls + '"><span class="dot">' + (i < S.analysisStep ? icon("check", 12) : "") + '</span><span class="tt">' + t(k) + "</span></div>";
          }).join("") + "</div></div></div>";
      return chrome("notes", body);
    }
    // resultado
    if (d.status === "failed") {
      return chrome("notes", topbar(t("analysis.title"), { back: "notes" }) +
        '<div class="wrap stagger" style="max-width:560px">' +
          '<div style="text-align:center;margin-bottom:16px"><div style="width:52px;height:52px;border-radius:15px;background:var(--danger-soft);color:var(--danger);display:grid;place-items:center;margin:0 auto 10px">' + icon("alert", 24) + "</div>" +
            '<div class="h-page">' + t("an.failedTitle") + '</div></div>' +
          '<div class="card"><div class="row" style="gap:10px">' + icon(docKindIcon(d), 18) + '<b style="font-size:14px">' + esc(name) + '</b></div>' +
            '<p class="txt-sm" style="margin-top:10px;color:var(--ink-2);line-height:1.55">' + docNoteText(d.note) + "</p></div>" +
          '<button class="btn btn-secondary btn-block" style="margin-top:14px" data-action="doc-open" data-id="' + d.id + '">' + t("an.keepAnyway") + "</button>" +
          '<button class="btn btn-ghost btn-block" style="margin-top:8px" data-action="doc-del" data-id="' + d.id + '" style="color:var(--danger)">' + t("doc.delete") + "</button>" +
        "</div>");
    }
    if (d.status === "pending") {
      return chrome("notes", topbar(t("analysis.title"), { back: "notes" }) +
        '<div class="wrap stagger" style="max-width:560px">' +
          '<div style="text-align:center;margin-bottom:16px"><div style="width:52px;height:52px;border-radius:15px;background:var(--attn-soft);color:var(--attn);display:grid;place-items:center;margin:0 auto 10px">' + icon("image", 24) + "</div>" +
            '<div class="h-page">' + t("an.pendingTitle") + '</div></div>' +
          (d.image ? '<img src="' + d.image + '" alt="" style="width:100%;max-height:320px;object-fit:contain;border-radius:12px;border:1px solid var(--border);background:var(--surface-2)">' : "") +
          '<p class="txt-sm txt-muted" style="margin-top:12px">' + t("doc.ocrPending") + "</p>" +
          '<button class="btn btn-primary btn-block" style="margin-top:14px" data-action="doc-open" data-id="' + d.id + '">' + t("notes.open") + "</button>" +
        "</div>");
    }
    // analyzed con texto real
    var a = d.analysis || {};
    var sum = docHasText(d) ? DocGen.summarize(d.text) : { concepts: a.concepts || [], keyPoints: a.keyPoints || [], summary: d.summary || "", wordCount: a.wordCount || 0, readMin: a.readMin || 8, difficulty: a.difficulty || "med" };
    var b2 = topbar(t("analysis.title"), { back: "notes" }) +
      '<div class="wrap stagger" style="max-width:620px">' +
        '<div style="text-align:center;margin-bottom:18px"><div style="width:56px;height:56px;border-radius:16px;background:var(--good-soft);color:var(--good);display:grid;place-items:center;margin:0 auto 12px">' + icon("check", 26) + "</div>" +
          '<div class="h-page">' + t("analysis.readyTitle") + '</div>' +
          '<p style="margin:8px auto 0">' + docSourceBadge(d) + "</p></div>" +
        '<div class="metricgrid">' +
          '<div class="metric"><b>' + (sum.concepts.length || (a.concepts || []).length) + '</b><span>' + t("analysis.mConcepts") + '</span></div>' +
          '<div class="metric"><b>' + diffLabel(sum.difficulty) + '</b><span>' + t("analysis.mDifficulty") + '</span></div>' +
          '<div class="metric"><b>' + (sum.wordCount || (a.wordCount || 0)) + '</b><span>' + (DB.lang === "en" ? "words" : "palabras") + '</span></div>' +
          '<div class="metric"><b>' + (sum.readMin || a.readMin || 1) + '</b><span>' + t("analysis.mReadTime") + "</span></div></div>" +
        (sum.summary ? '<div class="card" style="margin-top:14px"><div class="eyebrow">' + t("doc.summarySection") + '</div><p class="body" style="margin-top:8px">' + esc(sum.summary) + "</p></div>" : "") +
        (sum.concepts.length ? '<div class="card" style="margin-top:14px"><div class="eyebrow">' + t("analysis.mainConcepts") + '</div><div class="divide" style="margin-top:4px">' +
          sum.concepts.slice(0, 8).map(function (x) { return '<div class="list-row" style="padding:10px 0"><span class="gr"><span class="tt" style="font-weight:450;font-size:13.5px">' + esc(x) + "</span></span></div>"; }).join("") + "</div></div>" : "") +
        '<div style="margin-top:18px"><div class="eyebrow" style="margin-bottom:10px">' + t("mat.actionsTitle") + "</div>" + matActions(d) + "</div>" +
        '<button class="btn btn-primary btn-block btn-lg" style="margin-top:14px" data-action="doc-open" data-id="' + d.id + '">' + t("notes.open") + "</button>" +
      "</div>";
    return chrome("notes", b2);
  };

  /* material → grid de acciones IA (comparte pantalla de análisis y detalle) */
  function matActions(d) {
    var did = d && d.id ? d.id : "";
    var noText = !docHasText(d) && !(d && d.seeded);
    var items = [
      { k: "ask", ic: "spark", act: 'data-action="doc-ask" data-id="' + did + '"' },
      { k: "summary", ic: "summary", act: 'data-action="doc-summary" data-id="' + did + '"' },
      { k: "flashcards", ic: "cards", act: 'data-action="doc-review" data-mode="flashcards" data-id="' + did + '"', feat: "flashcards" },
      { k: "test", ic: "quiz", act: 'data-action="doc-review" data-mode="test" data-id="' + did + '"', feat: "tests" },
      { k: "exercises", ic: "text", act: 'data-action="doc-exercises" data-id="' + did + '"' },
      { k: "podcast", ic: "message", act: 'data-action="tool-open" data-m="podcast" data-doc="' + did + '"', feat: "podcasts" },
      { k: "presentation", ic: "layers", act: 'data-action="tool-open" data-m="presentation" data-doc="' + did + '"', feat: "presentations" },
      { k: "conceptMap", ic: "target", act: 'data-action="tool-open" data-m="conceptMap" data-doc="' + did + '"', feat: "conceptMaps" }
    ];
    return '<div class="mat-actions">' + items.map(function (it) {
      var locked = it.feat && !canUse(it.feat);
      var dim = noText && it.k !== "ask" && it.k !== "summary";
      return '<button class="mat-act"' + (dim ? ' style="opacity:.55"' : "") + " " + it.act + '><span class="ma-i">' + icon(it.ic, 17) + "</span><b>" + t("mat." + it.k) + "</b>" + (locked ? '<span class="ma-lock">PLUS</span>' : "") + "</button>";
    }).join("") + "</div>";
  }

  /* ---- Document detail (premium) ---- */
  V.docDetail = V.document = function () {
    var d = curDoc();
    if (!d) { S.screen = "notes"; return V.notes(); }
    var s = subj(d.subjectId);
    var real = docHasText(d);
    if (real) docEnsureAnalysis(d);
    var a = d.analysis || {};
    var sum = real ? { summary: d.summary || "", keyPoints: (a.keyPoints || []), concepts: (a.concepts || []) }
      : { summary: d.seeded ? L(d.summary) : "", keyPoints: [], concepts: (d.seeded ? (a.concepts || []) : []) };
    var full = !!S._docTextFull;
    var textPreview = real ? (full ? d.text : d.text.slice(0, 900)) : "";
    var body = topbar(esc(L(d.title)), { back: "notes", noAi: true, actions:
      (real || d.seeded ? '<button class="btn btn-secondary btn-sm" data-action="doc-review" data-mode="flashcards" data-id="' + d.id + '">' + t("doc.startReview") + "</button>" : "") }) +
      '<div class="wrap wide"><div class="doc-grid" style="display:grid;gap:18px;grid-template-columns:1fr">' +
        "<div>" +
          '<div class="card"><div class="row" style="gap:10px;align-items:flex-start"><span class="ic" style="width:40px;height:40px;flex-shrink:0">' + icon(docKindIcon(d), 19) + "</span>" +
            '<div style="flex:1;min-width:0"><div style="font-weight:600;letter-spacing:-.01em;word-break:break-word">' + esc(L(d.title)) + '</div>' +
            '<div style="margin-top:6px">' + docStatusPill(d) + " " + docSourceBadge(d) + "</div></div></div>" +
            '<div class="divide" style="margin-top:12px">' +
              '<div class="switchrow"><span class="txt-sm txt-muted">' + t("doc.meta.subject") + '</span><button class="chip-sel" data-action="doc-subj-pop" data-id="' + d.id + '">' + L(s.name) + " " + icon("chevD", 12) + "</button></div>" +
              (S.docSubjPop === d.id ? '<div style="padding:6px 0"><div class="chip-row">' + DB.subjects.map(function (x) { return '<button class="chip-sel ' + (x.id === d.subjectId ? "on" : "") + '" data-action="doc-set-subj" data-id="' + d.id + '" data-v="' + x.id + '">' + L(x.name) + "</button>"; }).join("") + "</div></div>" : "") +
              '<div class="switchrow"><span class="txt-sm txt-muted">' + t("doc.meta.type") + '</span><span class="txt-sm">' + (d.mime || d.kind || "—") + "</span></div>" +
              '<div class="switchrow"><span class="txt-sm txt-muted">' + t("doc.meta.size") + '</span><span class="txt-sm">' + (d.sizeBytes ? fmtBytes(d.sizeBytes) : "—") + "</span></div>" +
              '<div class="switchrow"><span class="txt-sm txt-muted">' + t("doc.meta.date") + '</span><span class="txt-sm">' + fmtDate(d.addedAt) + "</span></div>" +
              (d.textSource ? '<div class="switchrow"><span class="txt-sm txt-muted">' + t("doc.meta.source") + '</span><span class="txt-sm">' + d.textSource.toUpperCase() + "</span></div>" : "") +
            "</div></div>" +

            (d.image ? '<div class="card" style="margin-top:14px"><img src="' + d.image + '" alt="" style="width:100%;max-height:340px;object-fit:contain;border-radius:10px;background:var(--surface-2)"><p class="txt-sm txt-muted" style="margin-top:10px">' + t("doc.ocrPending") + "</p></div>" : "") +

            (real ? '<div class="card" style="margin-top:14px"><div class="eyebrow">' + t("doc.content") + '</div><pre style="white-space:pre-wrap;font-family:var(--font);font-size:13px;line-height:1.6;margin-top:10px;color:var(--ink-2);max-height:' + (full ? "none" : "260px") + ';overflow:hidden">' + esc(textPreview) + (!full && d.text.length > 900 ? "…" : "") + "</pre>" +
              (d.text.length > 900 ? '<button class="ai-link" style="margin-top:10px" data-action="doc-text-toggle">' + (full ? t("doc.contentLess") : t("doc.contentMore")) + "</button>" : "") + "</div>"
             : (!d.seeded && !d.image ? '<div class="card" style="margin-top:14px"><p class="txt-sm" style="color:var(--ink-2);line-height:1.55">' + docNoteText(d.note || "seeded") + "</p></div>" : "")) +

            (d.seeded && sum.summary ? '<div class="card" style="margin-top:14px"><div class="eyebrow">' + t("doc.summarySection") + '</div><p class="body" style="margin-top:8px">' + esc(sum.summary) + '</p><p style="margin-top:8px">' + docSourceBadge(d) + "</p></div>" : "") +
        "</div><div>" +

          (real && sum.summary ? '<div class="card"><div class="between"><div class="eyebrow">' + t("doc.summarySection") + '</div>' + docSourceBadge(d) + '</div><p class="body" style="margin-top:10px">' + esc(sum.summary) + '</p>' +
            '<button class="btn btn-secondary btn-sm" style="margin-top:10px" data-action="doc-summary" data-id="' + d.id + '">' + t("doc.regen") + "</button></div>" : "") +

          (real && sum.concepts.length ? '<div class="card" style="margin-top:14px"><div class="eyebrow">' + t("doc.conceptsSection") + '</div><div class="divide" style="margin-top:4px">' +
            sum.concepts.slice(0, 8).map(function (x) { return '<div class="list-row" style="padding:9px 0"><span class="gr"><span class="tt" style="font-weight:450;font-size:13px">' + esc(x) + "</span></span></div>"; }).join("") + "</div></div>" : "") +

          (real && sum.keyPoints.length ? '<div class="card" style="margin-top:14px"><div class="eyebrow">' + t("doc.keyPoints") + '</div><div class="stack" style="gap:8px;margin-top:8px">' +
            sum.keyPoints.slice(0, 6).map(function (x) { return '<div class="txt-sm" style="display:flex;gap:8px"><span style="color:var(--accent)">' + icon("chevR", 13) + "</span><span>" + esc(x) + "</span></div>"; }).join("") + "</div></div>" : "") +

          '<div class="card" style="margin-top:14px"><div class="h-sec" style="font-size:14px;margin-bottom:12px">' + t("mat.actionsTitle") + "</div>" + matActions(d) + "</div>" +

          '<button class="btn btn-ghost btn-block" style="margin-top:12px;color:var(--danger)" data-action="doc-del" data-id="' + d.id + '">' + icon("trash", 14) + t("doc.delete") + "</button>" +
        "</div><style>@container (min-width:900px){.doc-grid{grid-template-columns:1.35fr 1fr}}</style></div></div>";
    return chrome("notes", body);
  };
  function gen(ic, tt, sb, to) { return '<button class="list-row tap" style="width:100%;padding:10px 0" data-nav="' + to + '"><span class="ic" style="width:32px;height:32px">' + icon(ic, 16) + '</span><span class="gr"><span class="tt" style="font-size:13.5px">' + tt + '</span><span class="sb">' + sb + '</span></span><span class="ch">' + icon("chevR", 16) + "</span></button>"; }

  /* ---- Learning path ---- */
  function pathStep() { return DB.pathProgress[DB.currentSubjectId] || 0; }
  V.path = function () {
    var s = cur();
    var topic = L(s.doc.title).replace(/\.(pdf|PDF)$/, "");
    var step = pathStep();
    var nodes = [
      { k: 1, tt: t("path.n1t"), ss: topic, ic: "cards", mode: "flashcards" },
      { k: 2, tt: t("path.n2t"), ss: t("path.n2s"), ic: "text", mode: "fill" },
      { k: 3, tt: t("path.n3t"), ss: t("path.n3s"), ic: "quiz", mode: "test" },
      { k: 4, tt: t("path.n4t"), ss: t("path.n4s"), ic: "trophy", mode: "flashcards" }
    ];
    var body = topbar(t("path.title"), { back: "dashboard", actions: subjSwitcher() }) +
      '<div class="wrap" style="max-width:520px">' +
        '<p class="txt-sm txt-muted" style="margin-bottom:6px">' + t("path.sub", { topic: topic }) + "</p>" +
        '<div class="between" style="margin:14px 0 18px"><span class="pill accent">' + t("path.step", { n: Math.min(4, step + 1) }) + "</span>" +
          '<div class="bar" style="flex:1;margin-left:14px"><i style="width:' + (step / 4 * 100) + '%"></i></div></div>' +
        '<div class="stagger">' + nodes.map(function (n, i) {
          var st = i < step ? "done" : i === step ? "current" : "locked";
          var tag = i < step ? "button" : (i === step ? "button" : "div");
          return '<div class="path-node ' + st + '"><div class="pn-rail"><div class="pn-dot">' + (i < step ? icon("check", 16) : icon(n.ic, 16)) + "</div>" + (i < 3 ? '<div class="pn-line"></div>' : "") + "</div>" +
            "<" + tag + ' class="path-card ' + (i === step ? "current" : "") + '" ' + (st !== "locked" ? 'data-action="path-go" data-mode="' + n.mode + '" data-node="' + i + '"' : "") + '>' +
              '<div class="pc-k">' + n.k + " · " + n.tt + '</div><div class="pc-t">' + n.tt + '</div><div class="pc-s">' + n.ss + "</div>" +
            "</" + tag + "></div>";
        }).join("") + "</div>" +
        (step >= 4 ? '<div class="celebrate-inline card" style="margin-top:10px;text-align:center;background:var(--good-soft);border-color:transparent"><div style="font-weight:600;color:var(--good)">' + t("path.done") + '</div></div>' : "") +
        (step < 4 ? '<button class="btn btn-primary btn-lg btn-block" style="margin-top:20px" data-action="path-go" data-mode="' + nodes[step].mode + '" data-node="' + step + '">' + icon("play", 15) + t("path.start") + "</button>" : "") +
      "</div>";
    return chrome("dashboard", body);
  };

  /* ---- Mode picker ---- */
  V.study = function () {
    var s = cur();
    var recMode = S._fromPath != null ? (["flashcards", "fill", "test", "flashcards"][S._pathNode || 0]) : "flashcards";
    var modes = [
      { m: "flashcards", ic: "cards" }, { m: "test", ic: "quiz" }, { m: "fill", ic: "text" },
      { m: "match", ic: "layers" }, { m: "explain", ic: "spark" }, { m: "identify", ic: "target" }
    ].map(function (x) { x.rec = x.m === recMode; return x; });
    var body = topbar(t("mode.title"), { back: S._fromPath ? "path" : "dashboard" }) +
      '<div class="wrap" style="max-width:560px"><p class="txt-sm txt-muted" style="margin-bottom:18px">' + t("mode.sub", { topic: L(s.name) }) + "</p>" +
        '<div class="mode-grid stagger">' + modes.map(function (x) {
          return '<button class="mode-card" data-action="mode-go" data-mode="' + x.m + '">' +
            (x.rec ? '<span class="rec">' + t("mode.rec") + "</span>" : "") +
            '<span class="mc-i">' + icon(x.ic, 19) + "</span>" +
            "<b>" + t("mode." + x.m) + "</b><span>" + t("mode." + x.m + "S") + "</span></button>";
        }).join("") + "</div>" +
        '<button class="btn btn-ghost btn-block" style="margin-top:14px" data-action="personalize">' + t("study.customize") + "</button></div>";
    return chrome("dashboard", body);
  };
  function bit(ic, txt) { return '<div class="row" style="gap:9px;font-size:13.5px"><span style="color:var(--accent)">' + ic + "</span>" + txt + "</div>"; }

  /* ---- Fill the word ---- */
  V.fillblank = function () {
    var s = cur();
    var items = (EXTRA_STUDY[s.id] && EXTRA_STUDY[s.id].fill) || (EXTRA_STUDY.hist.fill);
    var i = S.fibIndex || 0;
    var it = items[i];
    var parts = L(it.s).split("___");
    var checked = S.fibChecked;
    var val = (S.fibVal || "");
    var ok = checked && val.trim().toLowerCase() === L(it.a).toLowerCase();
    var body = '<div class="topbar bordered"><button class="back" data-nav="path">' + icon("x", 18) + '</button><h1>' + t("fib.title") + " · " + L(s.name) + '</h1><span class="tb-actions mono txt-sm txt-muted">' + (i + 1) + " / " + items.length + "</span></div>" +
      '<div style="padding:0 20px 8px"><div class="bar thin"><i style="width:' + Math.round(i / items.length * 100) + '%"></i></div></div>' +
      '<div class="wrap" style="max-width:520px;display:flex;flex-direction:column;flex:1;justify-content:center">' +
        '<p class="fib-sentence">' + parts[0] + '<span class="fib-blank">' + (checked ? L(it.a) : "&nbsp;") + "</span>" + (parts[1] || "") + "</p>" +
        '<input class="fib-input ' + (checked ? (ok ? "ok" : "bad") : "") + '" id="fibInput" style="margin-top:22px" value="' + val.replace(/"/g, "&quot;") + '" ' + (checked ? "disabled" : "") + ' autocomplete="off">' +
        (checked ? '<p class="txt-sm" style="margin-top:12px;color:' + (ok ? "var(--good)" : "var(--danger)") + '">' + (ok ? t("fib.correct") : t("fib.wrong", { a: L(it.a) })) + "</p>" : "") +
        '<div style="margin-top:22px">' + (checked
          ? '<button class="btn btn-primary btn-block btn-lg" data-action="fib-next">' + (i + 1 < items.length ? t("fib.next") : t("fib.finish")) + icon("arrowR", 15) + "</button>"
          : '<button class="btn btn-primary btn-block btn-lg" data-action="fib-check">' + t("fib.check") + "</button>") + "</div>" +
      "</div>";
    return chrome("dashboard", body, { noBottom: true });
  };

  /* ---- Other modes (match / identify / explain) ---- */
  V.reviewMode = function () {
    var s = cur();
    var mode = S.mode;
    var inner, title;
    if (mode === "match") {
      title = t("rm.matchTitle");
      var pairs = (EXTRA_STUDY[s.id] && EXTRA_STUDY[s.id].match) || EXTRA_STUDY.hist.match;
      var defs = pairs.map(function (p, i) { return { i: i, txt: L(p.d) }; });
      if (!S.rmShuffled) { S.rmShuffled = defs.slice().sort(function () { return Math.random() - 0.5; }); S.rmPick = {}; }
      inner = '<div class="stack" style="gap:12px">' + pairs.map(function (p, i) {
        var sel = S.rmPick[i];
        var done = S.rmChecked;
        var right = done && sel === i;
        return '<div class="card" style="padding:14px 16px"><div style="font-weight:600;font-size:14px">' + L(p.t) + "</div>" +
          '<select class="fib-input" style="margin-top:8px;text-align:left;height:40px;font-size:13px' + (done ? (right ? ";border-color:var(--good)" : ";border-color:var(--danger)") : "") + '" data-action="rm-sel" data-row="' + i + '" ' + (done ? "disabled" : "") + '>' +
          '<option value="">—</option>' + S.rmShuffled.map(function (d) { return '<option value="' + d.i + '"' + (sel === d.i ? " selected" : "") + ">" + d.txt + "</option>"; }).join("") + "</select></div>";
      }).join("") + "</div>" +
        '<div style="margin-top:18px">' + (S.rmChecked
          ? '<button class="btn btn-primary btn-block btn-lg" data-action="rm-done">' + t("rm.back") + "</button>"
          : '<button class="btn btn-primary btn-block btn-lg" data-action="rm-check">' + t("fib.check") + "</button>") + "</div>";
    } else if (mode === "identify") {
      title = t("rm.identifyTitle");
      var q = s.quiz[0];
      inner = '<p class="fib-sentence" style="font-size:16px">' + L(q.q) + "</p>" +
        '<div class="grid" style="gap:10px;margin-top:16px">' + L(q.opts).map(function (o, i) {
          var cls = ""; if (S.rmChecked) { if (i === q.correct) cls = "correct"; else if (i === S.rmPickOne) cls = "wrong"; }
          return '<button class="option ' + cls + '" data-action="rm-one" data-i="' + i + '" ' + (S.rmChecked ? "disabled" : "") + "><span class=\"key\">" + String.fromCharCode(65 + i) + "</span>" + o + "</button>";
        }).join("") + "</div>" +
        (S.rmChecked ? '<div class="card" style="margin-top:14px;background:var(--surface-2)"><p class="txt-sm" style="color:var(--ink-2)">' + L(q.exp) + "</p></div>" +
          '<button class="btn btn-primary btn-block btn-lg" style="margin-top:16px" data-action="rm-done">' + t("rm.back") + "</button>" : "");
    } else { // explain
      title = t("rm.explainTitle");
      var c1 = L(s.doc.analysis.main)[0] || L(s.name);
      inner = '<div class="card"><div style="font-weight:600;font-size:15px">' + c1 + '</div>' +
        '<textarea class="field" id="rmExplain" style="height:120px;margin-top:12px;padding:12px 14px;line-height:1.5" placeholder="' + t("rm.explainPh", { c: c1 }) + '"></textarea>' +
        '<button class="btn btn-primary btn-block" style="margin-top:12px" data-action="rm-explain" data-c="' + c1.replace(/"/g, "&quot;") + '">' + icon("spark", 14) + t("rm.explainSend") + "</button></div>";
    }
    var body = '<div class="topbar bordered"><button class="back" data-nav="path">' + icon("x", 18) + '</button><h1>' + t("mode." + mode) + " · " + L(s.name) + "</h1></div>" +
      '<div class="wrap" style="max-width:520px"><p class="txt-sm txt-muted" style="margin-bottom:16px">' + title + "</p>" + inner + "</div>";
    return chrome("dashboard", body, { noBottom: true });
  };

  /* ---- Flashcards ---- */
  function fcActions() {
    var deck = activeFlashcards();
    var cardQ = deck[S.fcIndex] ? L(deck[S.fcIndex].q) : "";
    if (S.fcFlipped) return '<div class="row" style="gap:10px"><button class="btn btn-secondary btn-block btn-lg" data-action="fc-next" data-known="0" style="border-color:var(--attn);color:var(--attn)">' + t("fc.again") + "</button>" +
      '<button class="btn btn-primary btn-block btn-lg" data-action="fc-next" data-known="1">' + t("fc.known") + "</button></div>" +
      (activeReviewDoc() ? "" : '<div style="text-align:center;margin-top:12px">' + aiLink("fc.explainAi", "explain", cardQ) + "</div>");
    return '<div class="row" style="gap:10px">' +
      '<button class="btn btn-ghost" data-action="fc-prev" ' + (S.fcIndex === 0 ? "disabled" : "") + ">" + icon("chevL", 15) + t("common.prev") + "</button>" +
      '<button class="btn btn-secondary btn-block btn-lg" data-action="fc-flip">' + t("fc.showAnswer") + "</button></div>";
  }
  V.flashcards = function () {
    var s = cur();
    var rd = activeReviewDoc();
    var deck = activeFlashcards();
    var backTo = rd ? "document" : (S._fromPath != null ? "path" : "study");
    if (!deck.length) return chrome("dashboard", topbar(t("fc.title"), { back: backTo, noAi: true }) + '<div class="wrap"><div class="empty" style="padding-top:40px"><div class="eic">' + icon("cards", 22) + "</div><p>" + (DB.lang === "en" ? "Not enough text to build flashcards from this document." : "No hay texto suficiente para crear flashcards de este documento.") + "</p></div></div>", { noBottom: true });
    if (S.fcIndex >= deck.length) S.fcIndex = 0;
    var total = deck.length, c = deck[S.fcIndex];
    var label = rd ? L(rd.title) : L(s.name);
    var body = '<div class="topbar bordered"><button class="back" data-nav="' + backTo + '">' + icon("x", 18) + '</button><h1>' + t("fc.title") + " · " + esc(label) + '</h1><span class="tb-actions mono txt-sm txt-muted">' + (S.fcIndex + 1) + " / " + total + "</span></div>" +
      '<div style="padding:0 20px 8px"><div class="bar thin"><i style="width:' + Math.round(S.fcIndex / total * 100) + '%"></i></div></div>' +
      '<div class="wrap" style="max-width:500px;display:flex;flex-direction:column;flex:1;justify-content:center">' +
        '<div class="fc-scene"><div class="fc ' + (S.fcFlipped ? "flipped" : "") + '" data-action="fc-flip">' +
          '<div class="fc-face"><div class="fh">' + pill(rd ? t("doc.localBadge") : diffLabel(c.diff)) + '<span class="txt-sm txt-muted">' + esc(label) + '</span></div><div class="ft">' + esc(L(c.q)) + '</div><div class="hint">' + t("fc.tapHint") + "</div></div>" +
          '<div class="fc-face fc-back"><div class="fh"><span class="eyebrow">' + t("fc.answer") + '</span></div><div class="ft">' + esc(L(c.a)) + "</div></div></div></div>" +
        '<div id="fcActions" style="margin-top:24px">' + fcActions() + "</div></div>";
    return chrome("dashboard", body, { noBottom: true });
  };
  V["fc-done"] = function () {
    var s = cur();
    var body = topbar(t("fc.title"), { back: "dashboard", noAi: true }) +
      '<div class="wrap" style="max-width:480px"><div class="empty" style="padding-top:30px"><div class="eic" style="background:var(--good-soft);color:var(--good)">' + icon("check", 24) + "</div>" +
        "<h3>" + t("fc.doneTitle") + "</h3><p>" + t("fc.doneSub", { known: S.fcKnown, total: (S.fcKnown + S.fcAgain), again: S.fcAgain }) + "</p>" +
        '<div class="row" style="gap:10px;margin-top:16px"><button class="btn btn-secondary" data-nav="dashboard">' + t("fc.toDash") + '</button><button class="btn btn-primary" data-nav="test">' + t("fc.toTest") + "</button></div></div></div>";
    return chrome("dashboard", body, { noBottom: true });
  };

  /* ---- Test ---- */
  V.test = function () {
    var s = cur();
    var rd = activeReviewDoc();
    var quiz = activeQuiz();
    var backTo = rd ? "document" : (S._fromPath != null ? "path" : "study");
    if (!quiz.length) return chrome("dashboard", topbar(t("test.title"), { back: backTo, noAi: true }) + '<div class="wrap"><div class="empty" style="padding-top:40px"><div class="eic">' + icon("quiz", 22) + "</div><p>" + (DB.lang === "en" ? "Not enough text to build a test from this document." : "No hay texto suficiente para crear un test de este documento.") + "</p></div></div>", { noBottom: true });
    if (S.qIndex >= quiz.length) S.qIndex = 0;
    var label = rd ? L(rd.title) : L(s.name);
    var total = quiz.length, q = quiz[S.qIndex], keys = ["A", "B", "C", "D"];
    var body = '<div class="topbar bordered"><button class="back" data-nav="' + backTo + '">' + icon("x", 18) + '</button><h1>' + t("test.title") + " · " + esc(label) + '</h1><span class="tb-actions mono txt-sm txt-muted">' + (S.qIndex + 1) + " / " + total + "</span></div>" +
      '<div style="padding:0 20px 4px"><div class="bar thin"><i style="width:' + Math.round((S.qIndex + (S.qAnswered ? 1 : 0)) / total * 100) + '%"></i></div></div>' +
      '<div class="wrap" style="max-width:560px;display:flex;flex-direction:column;flex:1">' +
        '<div style="margin-top:14px;font-size:18px;font-weight:500;letter-spacing:-.01em;line-height:1.4">' + esc(L(q.q)).replace(/\n/g, "<br>") + "</div>" +
        '<div class="grid" style="gap:10px;margin-top:18px">' + L(q.opts).map(function (o, i) {
          var cls = ""; if (S.qAnswered) { if (i === q.correct) cls = "correct"; else if (i === S.qPicked) cls = "wrong"; }
          return '<button class="option ' + cls + '" data-action="q-pick" data-i="' + i + '" ' + (S.qAnswered ? "disabled" : "") + '><span class="key">' + (S.qAnswered && i === q.correct ? icon("check", 13) : keys[i]) + "</span>" + esc(o) + "</button>";
        }).join("") + "</div>" +
        (S.qAnswered ? '<div class="card fade-in" style="margin-top:16px;background:var(--surface-2)"><div class="row" style="gap:8px;font-weight:600;font-size:13.5px;color:' + (S.qPicked === q.correct ? "var(--good)" : "var(--danger)") + '">' +
            icon(S.qPicked === q.correct ? "check" : "x", 15) + (S.qPicked === q.correct ? t("test.correct") : t("test.incorrect")) + '</div><p class="txt-sm" style="margin-top:8px;color:var(--ink-2);line-height:1.55">' + esc(L(q.exp)) + "</p>" +
            (S.qPicked !== q.correct ? '<div style="margin-top:10px">' + aiLink("test.whyFailed", "why_failed", L(q.q)) + "</div>" : "") + "</div>" : "") +
        '<div style="margin-top:24px">' + (S.qAnswered ? '<button class="btn btn-primary btn-block btn-lg" data-action="q-next">' + (S.qIndex + 1 < total ? t("test.next") : t("test.finish")) + icon("arrowR", 15) + "</button>" : '<button class="btn btn-secondary btn-block btn-lg" disabled>' + t("test.pick") + "</button>") + "</div></div>";
    return chrome("dashboard", body, { noBottom: true });
  };

  /* ---- Results ---- */
  V.results = function () {
    var s = cur();
    var rdR = S.reviewDoc ? docById(S.reviewDoc) : null;
    var lt = rdR
      ? { score: (typeof S.qScore === "number" ? S.qScore : 0), total: Math.max(1, (rdR.quiz || []).length || 1) }
      : (DB.lastTestBySubject[s.id] || { score: 2, total: s.quiz.length });
    var pct = Math.round(lt.score / lt.total * 100);
    var mastered = rdR && rdR.analysis ? (rdR.analysis.concepts || []).slice(0, 3) : L(s.doc.analysis.main).slice(0, 3);
    var body = topbar(t("results.title"), { back: "dashboard", noAi: true }) +
      '<div class="wrap stagger" style="max-width:600px">' +
        '<div class="card card-lg" style="text-align:center"><div style="width:128px;margin:6px auto 10px">' + ring(pct, 128, 9, '<div style="font-size:25px;font-weight:600;letter-spacing:-.02em;line-height:1">' + lt.score + "/" + lt.total + '</div><div class="txt-sm txt-muted" style="margin-top:3px">' + pct + "%</div>") + "</div>" +
          '<div class="row txt-sm txt-muted" style="justify-content:center;gap:14px"><span>' + lt.score + " " + t("results.correct") + "</span><span>" + (lt.total - lt.score) + " " + t("results.incorrect") + "</span></div></div>" +
        '<div class="res-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px">' +
          '<div class="card"><div class="row" style="gap:7px;color:var(--good);font-weight:600;font-size:13px">' + icon("check", 14) + t("results.mastered") + '</div><div class="stack" style="gap:9px;margin-top:12px">' + mastered.map(function (m) { return '<div class="txt-sm">' + m + "</div>"; }).join("") + "</div></div>" +
          '<div class="card"><div class="row" style="gap:7px;color:var(--attn);font-weight:600;font-size:13px">' + icon("target", 14) + t("results.weak") + '</div><div class="stack" style="gap:9px;margin-top:12px">' + L(s.weak).map(function (m) { return '<div class="txt-sm">' + m + "</div>"; }).join("") + "</div></div></div>" +
        '<div class="card" style="margin-top:14px"><div style="font-weight:600;letter-spacing:-.01em">' + t("results.understandErrors") + "</div>" +
          '<div style="margin-top:10px">' + aiLink("results.askAi", "why_failed", L(s.name)) + "</div></div>" +
        '<div class="ai-block" style="margin-top:14px"><div class="ah">' + icon("spark", 13) + t("results.whatNow") + '</div><div class="txt-sm">' +
          L({ es: "Dedica tu próxima sesión a " + (L(s.weak)[0] || "") + ": 6 flashcards y una explicación breve.", en: "Spend your next session on " + (L(s.weak)[0] || "") + ": 6 flashcards and a short explanation." }) + '</div>' +
          '<button class="ai-link" style="margin-top:10px" data-nav="study">' + icon("play", 13) + t("results.seeRec") + "</button></div>" +
        '<button class="btn btn-secondary btn-block btn-lg" style="margin-top:16px" data-nav="dashboard">' + t("results.backPanel") + "</button></div>" +
      "<style>@container (max-width:520px){.res-grid{grid-template-columns:1fr!important}}</style>";
    return chrome("dashboard", body, { noBottom: true });
  };

  /* ---- Progress ---- */
  V.progress = function () {
    var s = cur();
    var mx = Math.max.apply(null, TREND);
    var pts = TREND.map(function (v, i) { return (i / (TREND.length - 1) * 100).toFixed(1) + "," + (100 - v / mx * 88 - 6).toFixed(1); }).join(" ");
    var avg = Math.round(DB.subjects.reduce(function (a, x) { return a + x.mastery; }, 0) / DB.subjects.length);
    var body = topbar(t("progress.title"), { actions: subjSwitcher() }) +
      '<div class="wrap wide"><div class="prog-grid stagger" style="display:grid;grid-template-columns:1fr;gap:14px">' +
        '<div class="card"><div class="between"><span class="h-sec">' + t("progress.studyMinutes") + '</span><span class="mono txt-sm txt-muted">' + t("progress.last14") + "</span></div>" +
          '<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="width:100%;height:120px;margin-top:14px;overflow:visible"><polygon points="0,100 ' + pts + ' 100,100" fill="var(--accent)" opacity="0.08"/><polyline points="' + pts + '" fill="none" stroke="var(--accent)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/><circle cx="100" cy="' + (100 - TREND[TREND.length - 1] / mx * 88 - 6).toFixed(1) + '" r="2.4" fill="var(--accent)" vector-effect="non-scaling-stroke"/></svg>' +
          '<div class="between" style="margin-top:8px"><span class="mono txt-sm txt-muted">' + t("progress.twoWeeksAgo") + '</span><span class="mono txt-sm txt-muted">' + t("progress.today") + "</span></div></div>" +
        '<div class="prog-stats" style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">' +
          sc("3,6 h", t("progress.thisWeek"), "clock") + sc(String(DB.streak), t("progress.currentStreak"), "lightning") + sc(avg + "%", t("progress.avgMastery"), "target") + "</div>" +
        '<div class="card"><span class="h-sec">' + t("progress.sessions") + '</span><div class="heatstrip" style="margin-top:14px">' + TREND.map(function (v) { return '<i style="opacity:' + (v === 0 ? ".12" : (0.25 + v / mx * 0.7).toFixed(2)) + '"></i>'; }).join("") + '</div><div class="txt-sm txt-muted" style="margin-top:10px">' + t("progress.sessionsSub", { n: 12 }) + "</div></div>" +
        '<div class="card"><span class="h-sec">' + t("progress.bySubject") + '</span><div class="divide" style="margin-top:4px">' +
          DB.subjects.map(function (x) { return '<div class="concept-row"><span class="sc" style="width:9px;height:9px;border-radius:3px;background:' + x.color + '"></span><span class="cn">' + L(x.name) + '</span><span class="cb">' + barEl(x.mastery, x.color) + '</span><span class="cv mono">' + x.mastery + "%</span></div>"; }).join("") + "</div></div>" +
        '<div class="card"><div class="between"><span class="h-sec">' + t("progress.concepts") + " · " + L(s.name) + '</span><button class="btn btn-ghost btn-sm" data-nav="study">' + t("progress.reinforce") + "</button></div>" +
          '<div class="divide" style="margin-top:4px">' + L(s.doc.analysis.main).slice(0, 5).map(function (m, i) { var v = [86, 68, 55, 40, 33][i]; var col = v >= 70 ? "var(--good)" : v >= 45 ? "var(--accent)" : "var(--attn)"; return '<div class="concept-row"><span class="cn">' + m + '</span><span class="cb">' + barEl(v, col) + '</span><span class="cv mono">' + v + "%</span></div>"; }).join("") + "</div></div>" +
      "</div><style>@container (min-width:920px){.prog-grid{grid-template-columns:1fr 1fr}.prog-grid>.card:first-child,.prog-grid>.prog-stats{grid-column:1/-1}}</style></div>";
    return chrome("progress", body);
  };
  function sc(v, l, ic) { return '<div class="card" style="padding:16px"><span style="color:var(--faint)">' + icon(ic, 16) + '</span><div style="font-size:20px;font-weight:600;letter-spacing:-.02em;margin-top:8px">' + v + '</div><div class="txt-sm txt-muted">' + l + "</div></div>"; }

  /* ---- Calendar ---- */
  V.calendar = function () {
    var m = S.calMonth || new Date();
    var y = m.getFullYear(), mo = m.getMonth();
    var first = new Date(y, mo, 1);
    var startDow = (first.getDay() + 6) % 7; // Monday-first
    var daysInMonth = new Date(y, mo + 1, 0).getDate();
    var todayIso = isoDate(addDays(0));
    var sel = S.calSel || todayIso;
    var dow = DB.lang === "en" ? ["M", "T", "W", "T", "F", "S", "S"] : ["L", "M", "X", "J", "V", "S", "D"];
    var cells = "";
    for (var i = 0; i < 42; i++) {
      var dayNum = i - startDow + 1;
      var d = new Date(y, mo, dayNum);
      var iso = isoDate(d);
      var out = dayNum < 1 || dayNum > daysInMonth;
      var tasks = DB.calendar.filter(function (x) { return x.date === iso; });
      var dots = tasks.slice(0, 3).map(function (x) { return '<i style="background:' + (TASK_TYPE[x.type] || TASK_TYPE.study).c + '"></i>'; }).join("");
      cells += '<button class="cal-cell ' + (out ? "out" : "") + " " + (iso === todayIso ? "today" : "") + " " + (iso === sel ? "sel" : "") + '" data-action="cal-day" data-iso="' + iso + '">' + d.getDate() + '<span class="cdots">' + dots + "</span></button>";
    }
    var selTasks = DB.calendar.filter(function (x) { return x.date === sel; }).sort(function (a, b) { return (a.time || "z") < (b.time || "z") ? -1 : 1; });
    var selDate = new Date(sel);
    var exam = selTasks.filter(function (x) { return x.type === "exam"; })[0];
    var body = topbar(t("cal.title"), { actions: '<button class="btn btn-secondary btn-sm" data-action="add-task">' + icon("plus", 15) + t("cal.addTask") + "</button>" }) +
      '<div class="wrap" style="max-width:640px"><div class="card">' +
        '<div class="cal-head"><h2 class="cap-first">' + fmtMonth(m) + '</h2><div class="cal-nav"><button data-action="cal-prev">' + icon("chevL", 16) + '</button><button data-action="cal-next">' + icon("chevR", 16) + "</button></div></div>" +
        '<div class="cal-grid">' + dow.map(function (x) { return '<div class="cal-dow">' + x + "</div>"; }).join("") + cells + "</div></div>" +
        '<div class="between" style="margin-top:20px;margin-bottom:6px"><span class="h-sec cap-first">' + fmtDay(selDate) + '</span><button class="btn btn-ghost btn-sm" data-action="add-task">' + icon("plus", 14) + t("cal.addTask") + "</button></div>" +
        (selTasks.length ? '<div class="card divide" style="padding:4px 18px">' + selTasks.map(taskRow).join("") + "</div>" : '<div class="card" style="text-align:center;color:var(--muted);font-size:13px;padding:24px">' + t("cal.noTasks") + "</div>") +
        (exam ? '<div class="ai-block" style="margin-top:14px"><div class="ah">' + icon("wand", 13) + "Zynqora AI</div>" +
          '<div class="txt-sm">' + t("cal.prepPlanQ", { day: selDate.toLocaleDateString(DB.lang === "en" ? "en-US" : "es-ES", { weekday: "long" }) }) + "</div>" +
          '<button class="ai-link" style="margin-top:10px" data-action="go-plan" data-exam="' + exam.id + '">' + icon("wand", 14) + t("cal.prepPlan") + "</button></div>" : "") +
      "</div>";
    return chrome("calendar", body);
  };

  /* ---- Plan ---- */
  V.plan = function () {
    var examId = S._planExam;
    var exam = DB.calendar.filter(function (x) { return x.id === examId; })[0] || DB.calendar.filter(function (x) { return x.type === "exam"; })[0];
    var s = subj(exam ? exam.subjectId : DB.currentSubjectId);
    var days = [
      { k: "plan.mon", t: { es: L(s.name) + " · resumen + 8 flashcards", en: L(s.name) + " · summary + 8 flashcards" } },
      { k: "plan.tue", t: { es: "Repaso de " + (L(s.weak)[0] || "conceptos clave"), en: "Review of " + (L(s.weak)[0] || "key concepts") } },
      { k: "plan.wed", t: { es: "Flashcards de toda la materia", en: "Flashcards across the whole subject" } },
      { k: "plan.thu", t: { es: "Test de práctica (" + s.quiz.length + " preguntas)", en: "Practice test (" + s.quiz.length + " questions)" } },
      { k: "plan.fri", t: { es: "Repaso ligero antes del examen", en: "Light review before the exam" } }
    ];
    var body = topbar(t("plan.title"), { back: "calendar" }) +
      '<div class="wrap" style="max-width:600px"><div class="card card-lg"><div class="row" style="gap:10px">' + subjIcon(s, "sm") +
        '<div><div class="eyebrow" style="color:var(--accent)">' + t("plan.for", { exam: exam ? L(exam.title) : L(s.name) }) + '</div><p class="txt-sm txt-muted" style="margin-top:6px">' + t("plan.intro") + "</p></div></div></div>" +
      '<div class="card" style="margin-top:14px">' + days.map(function (d, i) {
        return '<div class="plan-day ' + (i === 0 ? "now" : "") + '"><div class="pd">' + t(d.k) + '</div><div class="pb"><b>' + L(d.t) + "</b></div></div>";
      }).join("") + "</div>" +
      '<button class="btn btn-primary btn-lg btn-block" style="margin-top:16px" data-action="plan-add">' + icon("calendar", 15) + t("plan.addToCalendar") + "</button></div>";
    return chrome("calendar", body, { noBottom: true });
  };

  /* ---- Zynqora AI ---- */
  function attachIcon(ty) { return icon(ty === "image" ? "image" : ty === "doc" ? "notes" : "doc", 13); }
  function msgHtml(m, idx) {
    if (m.role === "system") return '<div class="ctx-added">' + icon("spark", 12) + "<span>" + L(m.text) + "</span></div>";
    if (m.role === "user") {
      var utxt = L(m.text);
      return '<div class="msg-user">' + (m.attach ? '<span class="msg-attach">' + attachIcon(m.attach.type) + m.attach.name + "</span>" + (utxt ? "<br>" : "") : "") + utxt + "</div>";
    }
    var txt = m.htmlKey ? ZAI.resolveKey(m.htmlKey) : (m.html || L(m.text));
    var quiz = "";
    if (m.quiz && !m.quizDone) {
      quiz = '<div class="ai-quiz"><div class="aq-q">' + L(m.quiz.q) + '</div><div class="aq-opts">' +
        L(m.quiz.opts).map(function (o, i) { return '<button class="aq-opt" data-action="ai-quiz" data-msg="' + idx + '" data-i="' + i + '">' + o + "</button>"; }).join("") + "</div></div>";
    } else if (m.quiz && m.quizDone) {
      quiz = '<div class="ai-quiz"><div class="aq-opts">' + L(m.quiz.opts).map(function (o, i) {
        var cls = i === m.quiz.correct ? "correct" : (i === m.quizPick ? "wrong" : "");
        return '<span class="aq-opt ' + cls + '">' + o + "</span>";
      }).join("") + '</div><div class="aq-exp txt-sm" style="margin-top:8px;color:var(--ink-2)">' + (m.quizPick === m.quiz.correct ? "✓ " : "") + L(m.quiz.exp) + "</div></div>";
    }
    var sources = "";
    if (m.sources && m.sources.length) {
      sources = '<div class="ai-sources"><div class="as-h">' + icon("globe", 12) + t("ai.sources") + "</div>" +
        m.sources.slice(0, 5).map(function (sr) {
          var label = (sr && (sr.title || sr.uri || sr.url)) || "";
          return '<span class="as-item">' + String(label).replace(/</g, "&lt;").slice(0, 70) + "</span>";
        }).join("") + "</div>";
    }
    return '<div class="msg-ai"><span class="am">' + icon("spark", 13) + '</span><div class="abody">' + txt + quiz + sources + "</div></div>";
  }
  var CTX_NONE = "__none__";
  function convCtx(c) { return c && c.contextId ? c.contextId : (c && c.contextId === null ? null : (c ? c.subjectId : null)); }
  function convLabel(c) {
    var cid = convCtx(c);
    if (!cid) return t("ai.ctxNone");
    var s = subj(cid);
    return c && c._ctxDoc ? t("ai.ctxSubjectDoc", { subject: L(s.name), doc: c._ctxDoc }) : L(s.name);
  }
  V.ai = function () {
    if (S.convListView || (!S.convId && !AI_CTX)) return aiList();
    var conv = DB.conversations.filter(function (c) { return c.id === S.convId; })[0];
    var msgs = conv ? conv.messages : [];
    var m = msgs.map(msgHtml).join("");
    if (AI_TYPING) m += '<div class="msg-ai"><span class="am">' + icon("spark", 13) + '</span><div class="abody"><span class="typing"><i></i><i></i><i></i></span></div></div>';
    var lastAi = null;
    for (var i = msgs.length - 1; i >= 0; i--) { if (msgs[i].role === "ai") { lastAi = msgs[i]; break; } }
    var sug;
    var exActive = conv && conv.thread && (conv.thread.exercise || conv.thread.docEx) && ["exercise", "followup"].indexOf(conv.thread.lastIntent) > -1;
    if (exActive && lastAi && lastAi.tutor) sug = ["ai.fAnother", "ai.fHarder", "ai.fEasier", "ai.fCorrect"];
    else if (lastAi && lastAi.tutor) sug = ZAI.tutorBtns;
    else if (AI_CTX && AI_CTX.kind === "why_failed") sug = ["ai.sugWhyFailed", "ai.sugSimple", "ai.sugExample"];
    else sug = ["ai.sugExplain", "ai.sugExample", "ai.sugCompare", "ai.sugSummarize", "ai.sugQuiz"];
    var cid = convCtx(conv);
    var ctxOpts = '<button data-action="ai-ctx-set" data-v="' + CTX_NONE + '" class="' + (!cid ? "on" : "") + '">' + t("ai.ctxNone") + "</button>" +
      DB.subjects.map(function (x) { return '<button data-action="ai-ctx-set" data-v="' + x.id + '" class="' + (cid === x.id ? "on" : "") + '"><span class="sc" style="background:' + x.color + '"></span>' + L(x.name) + "</button>"; }).join("");
    return '<div class="chat">' +
      '<div class="chat-head"><span class="zmk">' + icon("spark", 18) + '</span><div style="flex:1"><h2>' + t("ai.title") + " " + aiBadge() + '</h2><p>' + t("ai.subtitle") + '</p></div>' +
        '<button class="chat-back" data-action="ai-list" title="' + t("ai.backToConvs") + '">' + icon("layers", 14) + '</button><button class="back" data-nav="dashboard">' + icon("x", 18) + "</button></div>" +
      '<div class="chat-ctx-wrap"><button class="chat-ctx" data-action="ai-ctx-pop">' + icon("book", 13) + "<span>" + t("ai.ctxLabel") + ": " + convLabel(conv) + "</span>" + icon("chevD", 12) + "</button>" +
        (S.ctxPop ? '<div class="ctx-pop">' + ctxOpts + "</div>" : "") + "</div>" +
      '<div class="chat-scroll" id="chatScroll">' + m + "</div>" +
      (AI_ATTACH ? '<div class="attach-tray"><span class="attach-chip">' + attachIcon(AI_ATTACH.type) + AI_ATTACH.name + '<button data-action="attach-clear">' + icon("x", 12) + "</button></span></div>" : "") +
      '<div class="chat-sugg">' + sug.map(function (k) { return '<button class="sugg" data-ai-sugg="' + k + '">' + t(k) + "</button>"; }).join("") + "</div>" +
      '<div class="chat-input">' +
        '<button class="attach-btn" data-action="attach-menu">' + icon("plus", 16) + "</button>" +
        (S.attachMenu ? '<div class="attach-menu">' +
          '<button data-action="attach-pick" data-type="pdf">' + icon("doc", 15) + t("ai.attachPdf") + "</button>" +
          '<button data-action="attach-pick" data-type="doc">' + icon("notes", 15) + t("ai.attachDoc") + "</button>" +
          '<button data-action="attach-pick" data-type="image">' + icon("image", 15) + t("ai.attachImage") + "</button>" +
          '<input type="file" id="aiFileInput" style="display:none">' +
        "</div>" : "") +
        '<textarea id="aiInput" rows="1" placeholder="' + t("ai.placeholder") + '"></textarea><button class="chat-send" data-action="ai-send">' + icon("send", 17) + "</button></div>" +
      '<div class="chat-note">' + t(aiIsReal() ? "ai.realNote" : "ai.demoNote") + "</div></div>";
  };
  function aiList() {
    var body = topbar(t("ai.title"), { back: "dashboard", noAi: true, actions: '<button class="btn btn-secondary btn-sm" data-action="new-conv">' + icon("plus", 15) + t("ai.newConv") + "</button>" }) +
      '<div class="wrap" style="max-width:600px"><div class="row" style="gap:12px;margin-bottom:6px"><span class="zmk" style="width:38px;height:38px;border-radius:11px;background:var(--accent);color:#fff;display:grid;place-items:center">' + icon("spark", 18) + "</span>" +
        '<div><div style="font-weight:600;letter-spacing:-.01em">' + t("ai.title") + '</div><div class="txt-sm txt-muted">' + t("ai.subtitle") + "</div></div></div>" +
      '<div class="eyebrow" style="margin:18px 0 6px">' + t("ai.yourConvs") + "</div>" +
      (DB.conversations.length ? '<div class="conv-list">' + DB.conversations.slice().sort(function (a, b) { return b.updated - a.updated; }).map(function (c) {
        var last = c.messages[c.messages.length - 1];
        var preview = last.role === "user" ? L(last.text) : (last.htmlKey ? ZAI.resolveKey(last.htmlKey).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : (last.html || L(last.text || "")).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
        var cid = convCtx(c);
        var thSub = c.thread && c.thread.subjectId && subj(c.thread.subjectId);
        var title = c.title ? L(c.title) : (thSub ? L(thSub.name) : (cid ? L(subj(cid).name) : t("ai.title")));
        if (S._convDel === c.id) {
          return '<div class="conv-item conv-del-row"><span class="ci" style="background:var(--danger-soft);color:var(--danger)">' + icon("trash", 15) + '</span>' +
            '<div class="ct"><b>' + t("ai.deleteConvQ") + '</b><span>' + t("ai.deleteConvSub") + '</span></div>' +
            '<button class="btn btn-ghost btn-sm" data-action="conv-del-cancel">' + t("common.cancel") + '</button>' +
            '<button class="btn btn-sm" style="background:var(--danger);color:#fff" data-action="conv-del-confirm" data-id="' + c.id + '">' + t("cal.delete") + '</button></div>';
        }
        return '<div class="conv-item"><button class="ci-open" data-action="open-conv" data-id="' + c.id + '"><span class="ci">' + icon("message", 15) + '</span><div class="ct"><b>' + title + '</b><span>' + preview.slice(0, 64) + "</span></div></button>" +
          '<button class="ci-del" data-action="conv-del" data-id="' + c.id + '" title="' + t("ai.deleteConv") + '" aria-label="' + t("ai.deleteConv") + '">' + icon("trash", 14) + "</button></div>";
      }).join("") + "</div>" : '<div class="card" style="text-align:center;color:var(--muted);font-size:13px;padding:24px">' + t("ai.noConvs") + "</div>") +
      '<button class="btn btn-primary btn-block btn-lg" style="margin-top:16px" data-action="new-conv">' + icon("plus", 15) + t("ai.newConv") + "</button>" +
      '<p class="chat-note" style="margin-top:14px">' + t("ai.demoNote") + "</p></div>";
    return chrome("dashboard", body, { noBottom: true });
  }

  /* ---- Plans ---- */
  function usageRow(f) {
    var l = planLimit(f), u = usageOf(f);
    var inf = l === Infinity;
    var uc = inf ? u : Math.min(u, l);
    var pct = inf ? 0 : Math.min(100, Math.round(uc / l * 100));
    var full = !inf && uc >= l;
    var near = !inf && !full && uc / l >= 0.85;
    var col = full ? "var(--danger)" : near ? "var(--attn)" : "var(--muted)";
    return '<div class="usage-item"><div class="between"><span class="txt-sm">' + featLabel(f) + '</span>' +
      '<span class="mono txt-sm" style="color:' + col + '">' + (inf ? t("feat.unlimited") : uc + " / " + l + (full ? " · " + t("usage.atLimit") : "")) + '</span></div>' +
      (inf ? "" : '<div class="bar thin" style="margin-top:7px"><i style="width:' + pct + '%' + (full ? ";background:var(--danger)" : near ? ";background:var(--attn)" : "") + '"></i></div>') + "</div>";
  }
  V.plans = function () {
    var yr = (S.billing || "monthly") === "annual";
    function bul(k, n) { return t("bul." + k, n != null ? { n: n } : null); }
    var LM = { free: PLANS.free.limits, plus: PLANS.plus.limits, pro: PLANS.pro.limits };
    var BULLETS = {
      free: [bul("calendar"), bul("ai", LM.free.aiMessages), bul("files", LM.free.files), bul("tests", LM.free.tests), bul("fc", LM.free.flashcards), bul("subj", LM.free.subjects), bul("streak"), t("plans.reviewFree"), bul("colorsBasic"), bul("langs"), bul("noAds")],
      plus: [bul("allFree"), bul("ai", LM.plus.aiMessages), bul("files", LM.plus.files), bul("tests", LM.plus.tests), bul("fc", LM.plus.flashcards), bul("pod", LM.plus.podcasts), bul("pres", LM.plus.presentations), bul("map", LM.plus.conceptMaps), bul("subj", LM.plus.subjects), bul("persFull"), bul("noAds")],
      pro: [bul("allPlus"), bul("ai", LM.pro.aiMessages), bul("files", LM.pro.files), bul("tests", LM.pro.tests), bul("fc", LM.pro.flashcards), bul("pod", LM.pro.podcasts), bul("pres", LM.pro.presentations), bul("map", LM.pro.conceptMaps), bul("subjUnlim"), bul("aiAdvanced"), bul("persFull"), bul("noAds")]
    };
    var body = topbar(t("plans.title"), { back: "profile", noAi: true }) +
      '<div class="wrap wide" style="max-width:1000px">' +
        '<p class="txt-sm txt-muted" style="margin-bottom:16px">' + t("plans.sub") + "</p>" +
        '<div class="plan-toggle"><button class="' + (!yr ? "on" : "") + '" data-action="set-billing" data-v="monthly">' + t("plans.monthly") + '</button>' +
          '<button class="' + (yr ? "on" : "") + '" data-action="set-billing" data-v="annual">' + t("plans.annual") + "</button></div>" +
        '<div class="plans-grid stagger">' + PLAN_KEYS.map(function (k) {
          var p = PLANS[k], isCur = DB.plan === k;
          var price = k === "free" ? t("plans.free0") : fmtPrice(yr ? p.price.y : p.price.m);
          var per = k === "free" ? "" : (yr ? t("plans.perYear") : t("plans.perMonth"));
          var sub2 = "";
          if (k === "free") sub2 = DB.lang === "en" ? "Free forever" : "Siempre gratis";
          else if (yr) { var pct = Math.round((1 - p.price.y / (p.price.m * 12)) * 100); sub2 = t("plans.save", { pct: pct }); }
          else sub2 = fmtPrice(p.price.y) + t("plans.perYear");
          var tag = k === "pro" ? t("plans.proTag") : (k === "plus" ? t("plans.proSub") : "");
          var feats = BULLETS[k].map(function (f) { return "<li>" + icon("check", 13) + "<span>" + f + "</span></li>"; }).join("");
          var cta;
          if (isCur) cta = '<button class="btn btn-secondary btn-block" disabled>' + t("plans.current") + "</button>";
          else if (k === "free") cta = '<button class="btn btn-ghost btn-block" data-action="downgrade-free">' + t("plans.downgrade") + "</button>";
          else cta = '<button class="btn btn-primary btn-block" data-action="pick-plan" data-v="' + k + '">' + t("plans.choose", { plan: t("plan." + k + "Short") }) + "</button>";
          return '<div class="plan-card ' + (p.popular ? "popular " : "") + (isCur ? "current" : "") + '">' +
            (p.popular ? '<div class="plan-badge">' + t("plans.popular") + "</div>" : "") +
            '<div class="pc-name">' + t("plan." + k) + '</div><div class="pc-tag">' + (tag || "&nbsp;") + "</div>" +
            '<div class="pc-price"><span class="amt">' + price + '</span><span class="per">' + per + "</span></div>" +
            '<div class="pc-save">' + (sub2 || "&nbsp;") + "</div>" +
            '<ul class="pc-feats">' + feats + "</ul>" + cta + "</div>";
        }).join("") + "</div>" +
        '<p class="txt-sm txt-muted" style="text-align:center;margin-top:18px">' + t("plans.noAds") + "</p>" +
        '<div style="text-align:center;margin-top:12px"><button class="btn btn-secondary btn-sm" data-nav="policies">📄&nbsp; ' + t("plans.policiesLink") + "</button></div>" +
      "</div>";
    return chrome("profile", body);
  };
  V.checkout = function () {
    var k = S.checkoutPlan || "plus", p = PLANS[k];
    var yr = (S.billing || "monthly") === "annual";
    var amount = fmtPrice(yr ? p.price.y : p.price.m) + (yr ? t("plans.perYear") : t("plans.perMonth"));
    var method = S.coMethod || "card";
    var fields = method === "card"
      ? '<div class="co-fields">' +
          '<div class="full"><label class="label">' + t("co.cardName") + '</label><input class="field" id="coName" value="' + USER.name + '"></div>' +
          '<div class="full"><label class="label">' + t("co.cardNumber") + '</label><input class="field" inputmode="numeric" placeholder="1234 1234 1234 1234"></div>' +
          '<div><label class="label">' + t("co.expiry") + '</label><input class="field" placeholder="MM / AA"></div>' +
          '<div><label class="label">' + t("co.cvc") + '</label><input class="field" inputmode="numeric" placeholder="123"></div>' +
          '<div><label class="label">' + t("co.country") + '</label><input class="field" value="' + (DB.lang === "en" ? "Spain" : "España") + '"></div>' +
          '<div><label class="label">' + t("co.zip") + '</label><input class="field" placeholder="28001"></div>' +
        "</div>" +
        '<button class="btn btn-primary btn-lg btn-block" style="margin-top:16px" data-action="checkout-confirm">' + t("co.pay", { amount: amount }) + "</button>"
      : '<div class="co-paypal">' + icon("globe", 22) + '<div style="margin-top:8px">' + t("co.paypalNote") + "</div></div>" +
        '<button class="btn btn-primary btn-lg btn-block" style="margin-top:14px" data-action="checkout-confirm">' + t("co.payPaypal") + "</button>";
    var body = topbar(t("co.title"), { back: "plans", noAi: true }) +
      '<div class="wrap co-panel">' +
        '<div class="co-sum"><div class="cs-p">' + t("co.activating", { plan: t("plan." + k) }) + "</div>" +
          '<div class="cs-plan">' + t("plan." + k) + " · " + (yr ? t("co.cycleAnnual") : t("co.cycleMonthly")) + "</div>" +
          '<div class="cs-amt">' + amount + "</div></div>" +
        '<div class="co-methods">' +
          '<button class="' + (method === "card" ? "on" : "") + '" data-action="co-method" data-v="card">' + icon("coins", 15) + t("co.methodCard") + "</button>" +
          '<button class="' + (method === "paypal" ? "on" : "") + '" data-action="co-method" data-v="paypal">' + icon("globe", 15) + t("co.methodPaypal") + "</button>" +
        "</div>" +
        fields +
        '<div class="co-sim">🔒 ' + t("co.simNote") + "</div>" +
        '<p class="txt-sm txt-muted" style="text-align:center;margin-top:8px">' + t("co.cancelNote") + "</p>" +
      "</div>";
    return chrome("profile", body, { noBottom: true });
  };
  V.checkoutDone = function () {
    var k = S.checkoutPlan || "plus";
    var body = '<div class="topbar"></div><div class="wrap" style="max-width:440px"><div class="empty" style="padding-top:40px">' +
      '<div class="eic" style="background:var(--good-soft);color:var(--good)">' + icon("check", 26) + "</div>" +
      "<h3>" + t("co.welcome", { plan: t("plan." + k) }) + "</h3><p>" + t("co.welcomeSub") + "</p>" +
      '<div class="usage-list" style="max-width:320px;width:100%;margin:18px auto 0">' + METER_ROWS.map(usageRow).join("") + "</div>" +
      '<button class="btn btn-primary btn-lg" style="margin-top:18px" data-nav="dashboard">' + t("co.start") + "</button>" +
      "</div></div>";
    return chrome("profile", body, { noBottom: true });
  };

  /* ---- Policies ---- */
  V.policies = function () {
    var open = S.polOpen || {};
    var nums = [];
    for (var i = 1; i <= 27; i++) nums.push((i < 10 ? "0" : "") + i);
    var emo = ["💳", "🔄", "💰", "🔐", "🤖", "📄"];
    var body = topbar(t("pol.title"), { back: "profile", noAi: true }) +
      '<div class="wrap" style="max-width:680px">' +
        '<p class="txt-sm txt-muted" style="margin-bottom:16px">' + t("pol.sub") + "</p>" +
        '<div class="card" style="background:var(--accent-soft);border-color:var(--accent-line)"><div class="eyebrow" style="color:var(--accent)">' + t("pol.nutshell") + "</div>" +
          '<div class="nutshell-grid">' + [1, 2, 3, 4, 5, 6].map(function (j) {
            return '<div class="nut"><div class="nut-t">' + emo[j - 1] + " " + t("pol.nut" + j + "t") + '</div><div class="nut-d">' + t("pol.nut" + j + "d") + "</div></div>";
          }).join("") + "</div></div>" +
        '<div class="card" style="margin-top:14px;padding:6px 20px">' + nums.map(function (n) {
          var isOpen = !!open[n];
          return '<div class="pol-acc ' + (isOpen ? "open" : "") + '"><button class="pol-acc-h" data-action="acc-toggle" data-v="' + n + '"><span>' + n + " · " + t("pol.s" + n + "t") + "</span>" + icon("chevD", 16) + "</button>" +
            (isOpen ? '<div class="pol-acc-b">' + t("pol.s" + n + "b") + "</div>" : "") + "</div>";
        }).join("") + "</div>" +
        '<div class="card" style="margin-top:14px"><div class="row" style="gap:11px;align-items:flex-start"><span style="color:var(--accent);flex-shrink:0">' + icon("spark", 16) + "</span>" +
          '<div><div style="font-weight:600;letter-spacing:-.01em">' + t("pol.adsTitle") + '</div><p class="txt-sm txt-muted" style="margin-top:4px;line-height:1.55">' + t("pol.adsBody") + "</p></div></div></div>" +
        '<p class="txt-sm txt-muted" style="margin-top:16px;line-height:1.55">' + t("pol.disclaimer") + "</p>" +
      "</div>";
    return chrome("profile", body);
  };

  /* ================= AI study tools — podcast / presentation / concept map ================= */
  var TOOL_META = {
    podcast: { feat: "podcasts", ic: "mic", create: "pod.generate" },
    presentation: { feat: "presentations", ic: "layers", create: "tf.createPres" },
    conceptMap: { feat: "conceptMaps", ic: "target", create: "tf.createMap" }
  };
  var POD_DUR = { short: 300, medium: 600, deep: 1200 };
  var POD_APPROACH = [["pod.apExplain", "pod.apExplainS", "🎙️"], ["pod.apReview", "pod.apReviewS", "🔄"], ["pod.apConv", "pod.apConvS", "💬"]];
  var POD_VOICES = [["pod.voice1", "pod.voice1S", "🗣️"], ["pod.voice2", "pod.voice2S", "🎧"]];
  var POD_VSTYLES = ["pod.vsNatural", "pod.vsTeacher", "pod.vsPodcast", "pod.vsConv"];
  var PRES_STYLES = ["pres.st0", "pres.st1", "pres.st2", "pres.st3", "pres.st4"];
  var MAP_STYLES = ["tf.mapRadial", "tf.mapHier"];
  var GEN_SEQ = {
    presentation: ["gen.pres1", "gen.pres2", "gen.pres3", "gen.pres4", "gen.pres5"],
    podcast: ["gen.pod1", "gen.pod2", "gen.pod3", "gen.pod4", "gen.pod5"],
    conceptMap: ["gen.map1", "gen.map2", "gen.map3"]
  };
  function fmtClock(sec) { sec = Math.max(0, Math.round(sec)); var mm = Math.floor(sec / 60), ss = sec % 60; return mm + ":" + (ss < 10 ? "0" : "") + ss; }

  /* ---- content-aware visuals ---- */
  function fig(vb, inner) { return '<svg viewBox="0 0 ' + vb + '" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + inner + "</svg>"; }
  var HERO = {
    hist: fig("72 72", '<rect x="8" y="30" width="14" height="36"/><rect x="50" y="30" width="14" height="36"/><rect x="20" y="42" width="32" height="24"/><path d="M8 30v-4m4.7 4v-4m4.7 4v-4M50 30v-4m4.7 4v-4m4.7 4v-4"/><path d="M27 42v24m9-24v24m9-24v24"/><path d="M4 66h64"/><path d="M52 22v-9l13 4.5L52 22"/>'),
    bio: fig("64 74", '<path d="M16 3C16 20 44 21 44 37S16 54 16 71"/><path d="M44 3C44 20 16 21 16 37S44 54 44 71"/><path d="M19 11h22M22 19h16M26 27h12M26 47h12M22 55h16M19 63h22"/>'),
    mat: fig("70 66", '<path d="M8 56h56M14 6v52"/><path d="M14 52C30 52 34 12 62 10"/><path d="M20 46 54 22" stroke-dasharray="3 4"/><circle cx="37" cy="34" r="2.6" fill="currentColor" stroke="none"/><path d="M62 10l-5-1m5 1-1 5"/>'),
    eco: fig("70 66", '<path d="M8 56h56M14 6v52"/><path d="M16 50 58 14"/><path d="M16 16 58 52"/><circle cx="37" cy="33" r="2.8" fill="currentColor" stroke="none"/><path d="M52 8v9m0-9h-9m9 0-3 4M52 64v-9m0 9h-9m9 0-3-4"/>'),
    _: fig("64 64", '<rect x="10" y="12" width="44" height="30" rx="3"/><path d="M20 22h24M20 30h16"/><path d="M22 52h20M32 42v10"/>')
  };
  function conceptIcon(txt, s) {
    var q = (txt || "").toLowerCase();
    if (/bastilla|prisi[oó]n|fortaleza|bastille/.test(q)) return "landmark";
    if (/declaraci[oó]n|derechos|rights|constituci|ley\b/.test(q)) return "scroll2";
    if (/terror|robespierre|guillotin|ejecuci|comit[eé]/.test(q)) return "flag";
    if (/asamblea|estados generales|convenci[oó]n|assembly|estates|directorio/.test(q)) return "book";
    if (/antiguo r[eé]gimen|ancien|estamento|monarqu[ií]a/.test(q)) return "landmark";
    if (/\badn\b|\bdna\b|gen\b|genes|cromosoma|alelo|nucle/.test(q)) return "dna";
    if (/mitosis|meiosis|c[eé]lula|divisi[oó]n celular|cell|gameto/.test(q)) return "atom";
    if (/mendel|herencia|genotipo|fenotipo|cruce|dih[ií]brido|dominan|recesiv/.test(q)) return "flask";
    if (/l[ií]mite|limit|continuidad/.test(q)) return "target";
    if (/derivad|pendiente|tangente|derivative|slope|tasa de variaci/.test(q)) return "sigma";
    if (/regla|cadena|potencia|producto|cociente|rule/.test(q)) return "sigma";
    if (/m[aá]ximo|m[ií]nimo|optimiz|maxima|minima|inflexi/.test(q)) return "chart";
    if (/oferta|supply/.test(q)) return "coins";
    if (/demanda|demand|consumidor/.test(q)) return "coins";
    if (/precio|equilibrio|price|equilibrium|mercado/.test(q)) return "target";
    if (/elasticidad|elasticity/.test(q)) return "lightning";
    if (/escasez|coste|oportunidad|scarcity|cost|elecci/.test(q)) return "clock";
    return s ? s.icon : "spark";
  }
  var TL = {
    hist: [["1789", "Estados Generales y toma de la Bastilla", "Estates-General and storming of the Bastille"],
      ["1791", "Constitución y monarquía constitucional", "Constitution and constitutional monarchy"],
      ["1793", "República, ejecución de Luis XVI y el Terror", "Republic, execution of Louis XVI and the Terror"],
      ["1799", "Golpe de Napoleón: fin de la Revolución", "Napoleon's coup: end of the Revolution"]],
    bio: [["1", "El ADN guarda la información en genes", "DNA stores information in genes"],
      ["2", "La mitosis copia la célula (2n → 2n)", "Mitosis copies the cell (2n → 2n)"],
      ["3", "La meiosis produce gametos (2n → n)", "Meiosis produces gametes (2n → n)"],
      ["4", "Las leyes de Mendel predicen la herencia", "Mendel's laws predict inheritance"]],
    mat: [["1", "Límite: a qué valor se acerca la función", "Limit: the value the function approaches"],
      ["2", "Derivada = límite de la tasa de variación", "Derivative = limit of the rate of change"],
      ["3", "Reglas: potencia, producto, cociente, cadena", "Rules: power, product, quotient, chain"],
      ["4", "Aplicación: crecimiento, máximos y mínimos", "Use: growth, maxima and minima"]],
    eco: [["1", "Escasez: hay que elegir (coste de oportunidad)", "Scarcity: you must choose (opportunity cost)"],
      ["2", "La demanda baja si sube el precio", "Demand falls when price rises"],
      ["3", "La oferta sube si sube el precio", "Supply rises when price rises"],
      ["4", "El mercado se equilibra donde se cruzan", "The market clears where they cross"]]
  };
  function tlFor(id) { return (TL[id] || TL.mat).map(function (r) { return { y: r[0], t: DB.lang === "en" ? r[2] : r[1] }; }); }
  function cmpPair(html) {
    var m = String(html).match(/<li>([\s\S]*?)<\/li>/g) || [];
    function clean(x) { return x.replace(/<\/?li>/g, "").replace(/<[^>]+>/g, "").trim(); }
    if (m.length >= 2) {
      var a = clean(m[0]).split(":"), b = clean(m[1]).split(":");
      return [{ h: a.shift().trim(), p: a.join(":").trim() }, { h: b.shift().trim(), p: b.join(":").trim() }];
    }
    return [{ h: "", p: clean(html) }, { h: "", p: "" }];
  }

  V.aitools = function () {
    var body = topbar(t("tools.title"), { back: "dashboard", actions: subjSwitcher() }) +
      '<div class="wrap" style="max-width:540px"><p class="txt-sm txt-muted" style="margin-bottom:16px">' + t("tools.sub") + "</p>" +
        '<div class="stagger" style="display:flex;flex-direction:column;gap:12px">' +
        ["podcast", "presentation", "conceptMap"].map(function (m) {
          var meta = TOOL_META[m], locked = !canUse(meta.feat);
          return '<button class="tool-card" data-action="tool-open" data-m="' + m + '"><span class="tc-i">' + icon(meta.ic, 19) + "</span>" +
            '<span class="tc-g"><b>' + t("tools." + m) + "</b><span>" + t("tools." + m + "S") + "</span></span>" +
            (locked ? '<span class="tc-lock">' + icon("flag", 13) + "</span>" : icon("chevR", 16)) + "</button>";
        }).join("") + "</div></div>";
    return chrome("dashboard", body);
  };

  /* ---- step 1: options ---- */
  function toolOptions(m) {
    if (m === "podcast") {
      var ap = S.podApproach || 0, du = S.podDur || "medium", vo = S.podVoiceIdx || 0, vs = S.podVStyleIdx || 0;
      return '<div class="card"><div class="eyebrow">' + t("pod.approach") + '</div><div class="cfg-cards">' +
          POD_APPROACH.map(function (a, i) { return '<button class="cfg-card ' + (ap === i ? "on" : "") + '" data-action="pod-approach" data-n="' + i + '"><span class="cf-e">' + a[2] + '</span><b>' + t(a[0]) + "</b><span>" + t(a[1]) + "</span></button>"; }).join("") + "</div></div>" +
        '<div class="card" style="margin-top:12px"><div class="eyebrow">' + t("pod.duration") + '</div><div class="cfg-cards">' +
          ["short", "medium", "deep"].map(function (dk) { return '<button class="cfg-card ' + (du === dk ? "on" : "") + '" data-action="pod-dur" data-v="' + dk + '"><b>' + t("tf.min", { n: POD_DUR[dk] / 60 }) + "</b><span>" + t("tf.dur" + dk.charAt(0).toUpperCase() + dk.slice(1)) + "</span></button>"; }).join("") + "</div></div>" +
        '<div class="card" style="margin-top:12px"><div class="eyebrow">' + t("pod.voice") + '</div><div class="cfg-cards cfg-2">' +
          POD_VOICES.map(function (v, i) { return '<button class="cfg-card ' + (vo === i ? "on" : "") + '" data-action="pod-voice" data-n="' + i + '"><span class="cf-e">' + v[2] + '</span><b>' + t(v[0]) + "</b><span>" + t(v[1]) + "</span></button>"; }).join("") + "</div>" +
          '<div class="eyebrow" style="margin-top:14px">' + t("pod.voiceStyle") + '</div><div class="chip-row" style="margin-top:10px">' +
          POD_VSTYLES.map(function (st, i) { return '<button class="chip-sel ' + (vs === i ? "on" : "") + '" data-action="pod-vstyle" data-n="' + i + '">' + t(st) + "</button>"; }).join("") + "</div></div>";
    }
    if (m === "presentation") {
      var ps = S.presStyleIdx || 0;
      return '<div class="card"><div class="eyebrow">' + t("pres.style") + '</div><div class="cfg-cards cfg-2">' +
        PRES_STYLES.map(function (st, i) { return '<button class="cfg-card ' + (ps === i ? "on" : "") + '" data-action="tool-optstyle" data-n="' + i + '"><b>' + t(st) + "</b></button>"; }).join("") + "</div></div>";
    }
    var mi = S.mapStyleIdx || 0;
    return '<div class="card"><div class="eyebrow">' + t("tf.style") + '</div><div class="chip-row" style="margin-top:12px">' +
      MAP_STYLES.map(function (st, i) { return '<button class="chip-sel ' + (mi === i ? "on" : "") + '" data-action="tool-optstyle" data-n="' + i + '">' + t(st) + "</button>"; }).join("") + "</div></div>";
  }

  /* ---- presentation deck ---- */
  function deckFor(s) {
    var a = s.doc.analysis, main = L(a.main), title = L(s.doc.title).replace(/\.(pdf|PDF)$/, "");
    var en = DB.lang === "en";
    var ebank = (EXTRA_AI[s.id] && EXTRA_AI[s.id][DB.lang]) || {};
    var slides = [];
    slides.push({ type: "title", kicker: L(s.name), title: title, hero: 1, sub: t("pres.genPrefix") + " · " + t("pres.slides", { n: 8 }) + " · " + t("pres.byZynqora") });
    slides.push({ type: "bullets", kicker: t("pres.tWhy"), title: t("pres.tBig"), list: main.slice(0, 3), heroFaint: 1 });
    slides.push({ type: "bullets", kicker: t("pres.tKey"), title: t("pres.tRemember"), list: main.slice(0, 5) });
    slides.push({ type: "timeline", kicker: t("pres.tTimeline"), title: (s.id === "hist" ? (en ? "Timeline 1789–1799" : "Cronología 1789–1799") : t("pres.tStructure")), tl: tlFor(s.id) });
    var fc0 = (s.flashcards || [])[0];
    if (fc0) slides.push({ type: "definition", kicker: t("pres.tDef"), title: L(fc0.q), sub: L(fc0.a), heroFaint: 1 });
    slides.push({ type: "compare", kicker: t("pres.tCompare"), title: (en ? "Don't mix these up" : "No los confundas"),
      cmp: ebank.compare ? cmpPair(ebank.compare) : [{ h: main[0] || L(s.name), p: (en ? "First key idea of the topic." : "Primera idea clave del tema.") }, { h: main[1] || "", p: (en ? "A second idea to keep separate." : "Otra idea que no debes mezclar.") }] });
    slides.push({ type: "highlight", kicker: t("pres.tHighlight"), big: L(s.weak).length, title: (en ? "weak spots to nail before the exam" : "puntos débiles que reforzar antes del examen"), list: L(s.weak) });
    slides.push({ type: "closing", kicker: t("pres.tClose"), title: title, sub: t("pres.closeSub"), list: main.slice(0, 4), heroFaint: 1 });
    return slides;
  }
  function slideHtml(sl, s) {
    var heroCls = sl.hero ? "ps-hero" : (sl.heroFaint ? "ps-hero faint" : "");
    var hero = heroCls ? '<div class="' + heroCls + '">' + (HERO[s.id] || HERO._) + "</div>" : "";
    var title = sl.type === "highlight"
      ? '<div class="ps-title"><span class="hl-big">' + sl.big + "</span>" + sl.title + "</div>"
      : '<div class="ps-title">' + sl.title + "</div>";
    var sub = (sl.sub && sl.type !== "highlight") ? '<div class="ps-sub">' + sl.sub + "</div>" : "";
    var body = "";
    if (sl.type === "timeline") {
      body = '<div class="pres-tl">' + sl.tl.map(function (r, i) {
        return '<div class="ptl"><div class="ptl-rail"><span class="ptl-y"><b>' + r.y + "</b></span>" + (i < sl.tl.length - 1 ? '<span class="ptl-line"></span>' : "") + '</div><div class="ptl-t">' + r.t + "</div></div>";
      }).join("") + "</div>";
    } else if (sl.type === "compare") {
      body = '<div class="pres-cmp">' + sl.cmp.map(function (c) { return '<div class="pcm">' + (c.h ? "<h4>" + c.h + "</h4>" : "") + (c.p ? "<p>" + c.p + "</p>" : "") + "</div>"; }).join("") + "</div>";
    } else if (sl.list && sl.list.length) {
      body = '<div class="ps-list">' + sl.list.map(function (x) { return '<div class="pli"><span class="pli-i">' + icon(conceptIcon(x, s), 15) + "</span><span>" + x + "</span></div>"; }).join("") + "</div>";
    }
    return hero + '<div class="ps-kicker">' + sl.kicker + "</div>" + title + sub + '<div class="ps-body">' + body + "</div>";
  }
  function stageHtml(deck, idx, st, s) {
    return '<div class="pres-stage"><div class="pres-slide anim" data-st="' + st + '" data-type="' + deck[idx].type + '">' + slideHtml(deck[idx], s) + "</div></div>";
  }
  function presResult(s) {
    var deck = curDeck(s);
    var idx = Math.min(Math.max(0, S.slideIdx || 0), deck.length - 1);
    var st = S.presStyleIdx || 0;
    var thumbs = !!S.presThumbs;
    return '<div class="deck">' +
      stageHtml(deck, idx, st, s) +
      '<div class="pres-progress">' + deck.map(function (_, i) { return '<i class="' + (i < idx ? "on" : i === idx ? "cur" : "") + '"></i>'; }).join("") + "</div>" +
      '<div class="pres-toolbar">' +
        '<button class="pt-b" data-action="slide-prev" ' + (idx === 0 ? "disabled" : "") + ">" + icon("chevL", 16) + "</button>" +
        '<span class="pt-c">' + (idx + 1) + " / " + deck.length + "</span>" +
        '<button class="pt-b" data-action="slide-next" ' + (idx === deck.length - 1 ? "disabled" : "") + ">" + icon("chevR", 16) + "</button>" +
        '<span class="sp"></span>' +
        '<button class="pt-b ' + (thumbs ? "on" : "") + '" data-action="pres-thumbs" title="' + t("pres.thumbs") + '">' + icon("grid", 15) + "</button>" +
        '<button class="pt-b" data-action="pres-present" title="' + t("pres.present") + '">' + icon("expand", 15) + "</button>" +
      "</div>" +
      (thumbs ? '<div class="pres-thumbs">' + deck.map(function (d, i) {
        return '<button class="pres-thumb" data-st="' + st + '" data-action="pres-goto" data-n="' + i + '"><div class="tk">' + d.kicker + '</div><div class="tt">' + (d.type === "highlight" ? d.big + " · " + d.title : d.title) + "</div></button>";
      }).join("") + "</div>" : "") +
      '<div class="pod-note" style="margin-top:12px">' + icon("spark", 13) + "<span>" + t("pres.note", { style: t(PRES_STYLES[st]) }) + "</span></div>" +
      '<div class="row" style="gap:10px;margin-top:10px"><button class="btn btn-secondary btn-block" data-action="pres-present">' + icon("expand", 14) + t("pres.present") + '</button><button class="btn btn-secondary btn-block" data-action="tool-regen">' + t("tf.regen") + '</button><button class="btn btn-primary btn-block" data-action="pres-export">' + t("tf.export") + "</button></div>" +
    "</div>";
  }
  function presentOverlay(s) {
    var deck = curDeck(s);
    var idx = Math.min(Math.max(0, S.slideIdx || 0), deck.length - 1);
    var st = S.presStyleIdx || 0;
    return '<div class="present-overlay">' +
      '<div class="present-top"><span>' + L(s.doc.title).replace(/\.(pdf|PDF)$/, "") + " · " + (idx + 1) + "/" + deck.length + '</span><button data-action="pres-exit">' + icon("x", 18) + "</button></div>" +
      '<div class="present-body">' + stageHtml(deck, idx, st, s) + "</div>" +
      '<div class="present-nav"><button data-action="slide-prev" ' + (idx === 0 ? "disabled" : "") + ">" + icon("chevL", 18) + '</button><span class="pn-c">' + (idx + 1) + " / " + deck.length + '</span><button data-action="slide-next" ' + (idx === deck.length - 1 ? "disabled" : "") + ">" + icon("chevR", 18) + "</button></div>" +
    "</div>";
  }
  function curDeck(s) { return (S.deckData && S.deckData.length ? S.deckData : deckFor(s)); }
  function deckLen() { try { return curDeck(cur()).length; } catch (e) { return 8; } }

  /* ---- concept map ---- */
  function mapResult(s) {
    var main = L(s.doc.analysis.main).slice(0, 6);
    var core = L(s.doc.title).replace(/\.(pdf|PDF)$/, "");
    return '<div class="cmap"><div class="cm-core">' + core + "</div>" +
      '<div class="cm-branches">' + main.map(function (x) { return '<div class="cm-node">' + x + "</div>"; }).join("") + "</div></div>" +
      '<div class="pod-note" style="margin-top:12px">' + icon("spark", 13) + "<span>" + t("tf.mapNote") + "</span></div>" +
      '<div class="row" style="gap:10px;margin-top:10px"><button class="btn btn-secondary btn-block" data-action="tool-regen">' + t("tf.regen") + '</button><button class="btn btn-primary btn-block" data-action="pres-export">' + t("tf.export") + "</button></div>";
  }

  /* ================= ZYNQORA AI — PROVIDER LAYER ================= */
  /* One config swaps model / provider / mode without touching the app. */
  var AI_CONFIG = {
    provider: "gemini",                          // motor de IA (marca visible: "Zynqora AI")
    ttsProvider: "gemini",                       // motor de voz
    webSearch: true,                             // Google Search grounding en modo real
    // --- FASE F: backend de Supabase (Edge Function zynqora-ai) ---
    supabaseUrl: lsGet("zynqora.supabaseUrl", ""),        // https://<ref>.supabase.co
    supabaseAnonKey: lsGet("zynqora.supabaseAnonKey", ""),// clave anon pública (la RLS protege los datos)
    authToken: lsGet("zynqora.authToken", ""),            // JWT de sesión (lo pone el módulo Auth)
    endpoint: lsGet("zynqora.aiEndpoint", ""),            // alternativa: URL directa (Cloudflare Worker)
    models: {
      chat: "gemini-2.5-flash",                  // conversación rápida
      reasoning: "gemini-2.5-pro",               // problemas complejos / verificación
      documents: "gemini-2.5-pro",               // análisis de PDF / imágenes
      tts: "gemini-2.5-flash-preview-tts"        // texto → voz (multi-hablante)
    }
  };
  function aiEndpointUrl() {
    if (AI_CONFIG.supabaseUrl) return AI_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/functions/v1/zynqora-ai";
    return AI_CONFIG.endpoint || "";
  }
  function aiMode() { return aiEndpointUrl() ? "real" : "demo"; }
  function aiIsReal() { return aiMode() === "real"; }
  function aiBadge() {
    return '<span class="ai-badge ' + (aiIsReal() ? "real" : "demo") + '">' + (aiIsReal() ? t("ai.modeReal") : t("ai.modeDemo")) + "</span>";
  }
  var SEARCHY_RE = /\b(busca|b[uú]scame|buscar|search for|look up|googlea|noticias|hoy\b|[uú]ltima hora|actualmente|ahora mismo|en 20\d\d|este a[nñ]o|reciente|recientes|qui[eé]n gan[oó]|poblaci[oó]n actual|precio (de|del|actual)|cotizaci[oó]n|resultado del partido|qu[eé] ha pasado|qu[eé] pas[oó] (hoy|ayer)|current|latest news)\b/i;

  function materialFor(subjectId, docId) {
    var d = docId ? docById(docId) : null;
    if (d && docHasText(d)) {
      docEnsureAnalysis(d);
      return { subject: L(subj(d.subjectId).name), title: L(d.title), summary: d.summary, concepts: (d.analysis && d.analysis.concepts) || [], topics: (d.analysis && d.analysis.keyPoints) || [], fullText: d.text, source: d.textSource || "doc" };
    }
    var s = subj(subjectId); if (!s) return null;
    return { subject: L(s.name), title: L(s.doc.title), summary: L(s.doc.summary), concepts: L(s.doc.analysis.main), topics: L(s.doc.analysis.topics) };
  }
  function aiProfile() {
    return { name: USER.name, level: S.obLevel || null, goals: S.obGoals || [], plan: DB.plan, lang: DB.lang };
  }

  /* ---- DEMO provider: local rule-based engine + on-device browser voice ---- */
  var DemoProvider = {
    id: "demo",
    _wait: function (v, ms) { return new Promise(function (res) { setTimeout(function () { res(v); }, ms || 480); }); },
    chat: function (o) {
      if (o.allowSearch !== false && SEARCHY_RE.test(o.text || "")) {
        return this._wait({
          html: (DB.lang === "en"
            ? "<p>🔎 <strong>Real-time web search</strong> is part of Zynqora AI once connected — it uses Google Search. In demo mode I can't browse the internet, but I can still help with what I know about the topic.</p>"
            : "<p>🔎 La <strong>búsqueda web en tiempo real</strong> forma parte de Zynqora AI conectado (usa Google Search). En modo demo no puedo consultar Internet, pero sí puedo ayudarte con lo que ya sé del tema.</p>"),
          tutor: true, demo: true
        }, 520);
      }
      var r = ZAI.ask(o.text, { intent: o.intent, contextId: o.contextId });
      r.demo = true;
      return this._wait(r, 620);
    },
    podcastScript: function (o) {
      var d = o.docId ? docById(o.docId) : null;
      if (d && docHasText(d)) return this._wait(DocGen.podcastSegments(d.text, L(d.title), o.approach || 0, o.minutes || 8, o.lang), 260);
      return this._wait(buildPodScript(o), 260);
    },
    presentation: function (o) {
      var d = o.docId ? docById(o.docId) : null;
      if (d && docHasText(d)) return this._wait(DocGen.slides(d.text, L(d.title)), 260);
      return this._wait(deckFor(subj(o.subjectId)), 260);
    },
    analyzeDocument: function (o) {
      var d = o.docId ? docById(o.docId) : null;
      if (d && docHasText(d)) { var s2 = DocGen.summarize(d.text); return this._wait({ result: { summary: s2.summary, concepts: s2.concepts, keyPoints: s2.keyPoints, difficulty: s2.difficulty, readMin: s2.readMin }, demo: true }, 300); }
      var s = subj(o.subjectId), a = s.doc.analysis;
      return this._wait({ concepts: a.concepts, difficulty: a.difficulty, main: L(a.main), summary: L(s.doc.summary), demo: true }, 400);
    },
    generateSummary: function (o) {
      var d = o.docId ? docById(o.docId) : null;
      if (!d || !docHasText(d)) return Promise.reject({ demo: true, reason: "no-text" });
      var s = DocGen.summarize(d.text);
      return this._wait({ result: { summary: s.summary, concepts: s.concepts, keyPoints: s.keyPoints, difficulty: s.difficulty, readMin: s.readMin }, demo: true }, 300);
    },
    generateFlashcards: function (o) {
      var d = o.docId ? docById(o.docId) : null;
      if (!d || !docHasText(d)) return Promise.reject({ demo: true, reason: "no-text" });
      return this._wait({ result: { cards: DocGen.flashcards(d.text, o.count || 8) }, demo: true }, 300);
    },
    generateQuiz: function (o) {
      var d = o.docId ? docById(o.docId) : null;
      if (!d || !docHasText(d)) return Promise.reject({ demo: true, reason: "no-text" });
      return this._wait({ result: { questions: DocGen.quiz(d.text, o.count || 5, o.difficulty) }, demo: true }, 300);
    },
    generateExercises: function (o) {
      var d = o.docId ? docById(o.docId) : null;
      if (!d || !docHasText(d)) return Promise.reject({ demo: true, reason: "no-text" });
      return this._wait({ result: { exercises: DocGen.exercises(d.text, o.difficulty || "med") }, demo: true }, 300);
    },
    tts: function () { return Promise.reject({ demo: true, reason: "no-tts" }); }
  };

  /* ---- REAL provider: Zynqora AI real, vía Edge Function de Supabase (o proxy).
         La GEMINI_API_KEY vive SOLO en el backend. El frontend nunca la ve. ---- */
  var RealGeminiProvider = {
    id: "gemini",
    _call: function (task, body) {
      var url = aiEndpointUrl();
      if (!url) return Promise.reject({ noEndpoint: true });
      var headers = { "content-type": "application/json" };
      var bearer = AI_CONFIG.authToken || AI_CONFIG.supabaseAnonKey;
      if (bearer) headers["authorization"] = "Bearer " + bearer;
      if (AI_CONFIG.supabaseAnonKey) headers["apikey"] = AI_CONFIG.supabaseAnonKey;
      return fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Object.assign({ task: task, lang: DB.lang }, body || {}))
      }).then(function (res) {
        return res.text().then(function (tx) {
          var data; try { data = tx ? JSON.parse(tx) : {}; } catch (e) { data = { detail: tx }; }
          if (res.status === 402 && data && data.code === "LIMIT_REACHED") throw { limitReached: true, quota: data.quota };
          if (!res.ok) throw { status: res.status, detail: (data && data.detail) || tx };
          return data;
        });
      });
    },
    generateSummary: function (o) { return this._call("generate_summary", { documentId: o.docId, subjectId: o.subjectId }); },
    generateFlashcards: function (o) { return this._call("generate_flashcards", { documentId: o.docId, subjectId: o.subjectId, count: o.count || 8, difficulty: o.difficulty || "med" }); },
    generateQuiz: function (o) { return this._call("generate_quiz", { documentId: o.docId, subjectId: o.subjectId, count: o.count || 5, difficulty: o.difficulty || "med" }); },
    generateExercises: function (o) { return this._call("generate_exercises", { documentId: o.docId, subjectId: o.subjectId, count: o.count || 3, difficulty: o.difficulty || "med" }); },
    chat: function (o) {
      return this._call("chat", {
        text: o.text, intent: o.intent || null,
        history: (o.history || []).map(function (m) {
          var txt = m.htmlKey ? ZAI.resolveKey(m.htmlKey) : (m.html || L(m.text || ""));
          return { role: m.role === "ai" ? "model" : "user", text: String(txt).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() };
        }),
        context: (o.contextId || o.docId) ? materialFor(o.contextId, o.docId) : null,
        docId: o.docId || null,
        profile: o.profile || aiProfile(),
        allowSearch: AI_CONFIG.webSearch && o.allowSearch !== false,
        model: /prep_exam|detailed|plan|why_failed|exercise|compare/.test(o.intent || "") ? AI_CONFIG.models.reasoning : AI_CONFIG.models.chat
      });
    },
    podcastScript: function (o) {
      return this._call("generate_podcast_script", {
        subjectId: o.subjectId, documentId: o.docId || null,
        approach: o.approach, minutes: o.minutes, voiceStyle: o.voiceStyle
      }).then(function (r) { return r.result || r; });
    },
    tts: function (o) {
      return this._call("podcast_tts", {
        segments: (o.segments || []).map(function (s) { return { speaker: s.speaker, text: s.speech || s.text }; }),  // texto ya normalizado para voz
        direction: o.direction || "",              // dirección de interpretación (tono, pausas, énfasis)
        voiceA: o.voiceA, voiceB: o.voiceB, style: o.style, twoSpeakers: o.twoSpeakers
      });
    },
    presentation: function (o) {
      return this._call("generate_presentation", { subjectId: o.subjectId, documentId: o.docId || null, style: o.style })
        .then(function (r) { return realSlidesToDeck((r.result && r.result.slides) || r.slides || []); });
    },
    analyzeDocument: function (o) { return this._call("generate_summary", { documentId: o.docId, subjectId: o.subjectId }).then(function (r) { return r.result || r; }); }
  };
  // alias histórico
  var GeminiProvider = RealGeminiProvider;

  // adapta el JSON de slides de Gemini al formato que renderiza slideHtml()
  function realSlidesToDeck(slides) {
    var en = DB.lang === "en";
    var out = [];
    (slides || []).forEach(function (sl, i) {
      if (i === 0) { out.push({ type: "title", kicker: en ? "Study deck" : "Presentación de estudio", title: sl.title || "", hero: 1, sub: sl.subtitle || "" }); return; }
      var list = (sl.key_points && sl.key_points.length) ? sl.key_points : (sl.content ? [sl.content] : []);
      if (sl.example) list = list.concat([(en ? "Example: " : "Ejemplo: ") + sl.example]);
      out.push({ type: i === (slides.length - 1) ? "closing" : "bullets", kicker: sl.subtitle || ("· " + i), title: sl.title || "", list: list, sub: sl.subtitle || "" });
    });
    return out.length ? out : [{ type: "title", kicker: "Zynqora", title: en ? "Deck" : "Presentación", hero: 1 }];
  }

  var ZynqoraAI = aiIsReal() ? RealGeminiProvider : DemoProvider;
  function refreshAIProvider() { ZynqoraAI = aiIsReal() ? RealGeminiProvider : DemoProvider; }
  function aiSetEndpoint(ep) {
    AI_CONFIG.endpoint = ep || "";
    lsSet("zynqora.aiEndpoint", AI_CONFIG.endpoint);
    refreshAIProvider();
  }
  function aiSetCloud(url, anonKey) {
    AI_CONFIG.supabaseUrl = (url || "").trim().replace(/\/+$/, "");
    AI_CONFIG.supabaseAnonKey = (anonKey || "").trim();
    lsSet("zynqora.supabaseUrl", AI_CONFIG.supabaseUrl);
    lsSet("zynqora.supabaseAnonKey", AI_CONFIG.supabaseAnonKey);
    refreshAIProvider();
  }

  /* =====================================================================
     FASE F — Auth + Sync con Supabase.
     AMBOS MÓDULOS ESTÁN DORMIDOS mientras no haya `AI_CONFIG.supabaseUrl`.
     En el artifact (sin backend) nunca se ejecutan: la app sigue 100% local.
     Contrato REST de Supabase Auth y PostgREST — sin dependencias externas.
     ===================================================================== */
  var Auth = (function () {
    function base() { return (AI_CONFIG.supabaseUrl || "").replace(/\/+$/, ""); }
    function enabled() { return !!(AI_CONFIG.supabaseUrl && AI_CONFIG.supabaseAnonKey); }
    function _post(path, body) {
      return fetch(base() + "/auth/v1/" + path, {
        method: "POST",
        headers: { "content-type": "application/json", "apikey": AI_CONFIG.supabaseAnonKey },
        body: JSON.stringify(body || {})
      }).then(function (r) { return r.text().then(function (tx) { var j; try { j = tx ? JSON.parse(tx) : {}; } catch (e) { j = {}; } if (!r.ok) throw j; return j; }); });
    }
    function session() {
      try { var s = JSON.parse(lsGet("zynqora.session", "null")); return (s && s.access_token) ? s : null; } catch (e) { return null; }
    }
    function setSession(j) {
      if (!j || !j.access_token) return null;
      var s = { access_token: j.access_token, refresh_token: j.refresh_token, user: j.user, expires_in: j.expires_in, at: Date.now() };
      lsSet("zynqora.session", JSON.stringify(s));
      AI_CONFIG.authToken = j.access_token; lsSet("zynqora.authToken", j.access_token);
      if (j.user) {
        DB.profile = DB.profile || {};
        DB.profile.id = j.user.id;
        if (j.user.email) DB.profile.email = j.user.email;
        syncUser(); persist("profile");
      }
      refreshAIProvider();
      return s;
    }
    return {
      enabled: enabled,
      session: session,
      user: function () { var s = session(); return s ? s.user : null; },
      signUp: function (email, password, name) {
        return _post("signup", { email: email, password: password, data: { name: name || "" } }).then(function (j) { if (j.access_token) setSession(j); return j; });
      },
      signIn: function (email, password) {
        return _post("token?grant_type=password", { email: email, password: password }).then(setSession);
      },
      recover: function (email) { return _post("recover", { email: email }); },
      refresh: function () {
        var s = session(); if (!s || !s.refresh_token) return Promise.reject({ noSession: true });
        return _post("token?grant_type=refresh_token", { refresh_token: s.refresh_token }).then(setSession);
      },
      signOut: function () {
        var s = session();
        lsSet("zynqora.session", ""); AI_CONFIG.authToken = ""; lsSet("zynqora.authToken", "");
        refreshAIProvider();
        if (s) { try { fetch(base() + "/auth/v1/logout", { method: "POST", headers: { apikey: AI_CONFIG.supabaseAnonKey, authorization: "Bearer " + s.access_token } }); } catch (e) {} }
      },
      deleteAccount: function () {
        // RPC delete_my_account() — borra el usuario en Supabase (cascada). Ver 0004_functions.sql.
        return Sync._rpc("delete_my_account", {});
      }
    };
  })();

  /* Sincronización local (IndexedDB) ↔ Supabase (PostgREST).
     - Supabase manda cuando hay sesión; IndexedDB = caché/offline.
     - upsert por UUID -> sin duplicados aunque el push se repita.
     - conflicto: last-write-wins por updated_at.
     NOTA: los `id` locales del prototipo son "idXXXX" (no UUID). Al activar el
     cloud hay que migrarlos a crypto.randomUUID() — marcado con TODO abajo. */
  var Sync = (function () {
    function base() { return (AI_CONFIG.supabaseUrl || "").replace(/\/+$/, ""); }
    function on() { return Auth.enabled() && !!Auth.session(); }
    function headers(extra) {
      var s = Auth.session();
      return Object.assign({
        "content-type": "application/json",
        "apikey": AI_CONFIG.supabaseAnonKey,
        "authorization": "Bearer " + ((s && s.access_token) || AI_CONFIG.supabaseAnonKey)
      }, extra || {});
    }
    function rest(path, opts) {
      return fetch(base() + "/rest/v1/" + path, Object.assign({ headers: headers(opts && opts.headers) }, opts))
        .then(function (r) { return r.text().then(function (tx) { var j; try { j = tx ? JSON.parse(tx) : null; } catch (e) { j = null; } if (!r.ok) throw { status: r.status, body: j || tx }; return j; }); });
    }
    function _rpc(fn, args) {
      if (!Auth.enabled()) return Promise.reject({ noCloud: true });
      return rest("rpc/" + fn, { method: "POST", body: JSON.stringify(args || {}) });
    }
    // mapea DB.* -> filas de tabla. Devuelve null si la entidad no se sincroniza aún.
    function rowsFor(entity, uid) {
      if (entity === "subjects") return DB.subjects.map(function (s) { return { id: s.id, user_id: uid, name: L(s.name), icon: s.icon, color: s.color, mastery: s.mastery || 0 }; });
      if (entity === "calendar") return DB.calendar.map(function (t) { return { id: t.id, user_id: uid, subject_id: t.subjectId || null, title: L(t.title), description: t.desc || null, type: t.type || "study", due_date: t.date, due_time: t.time || null, done: !!t.done }; });
      if (entity === "documents") return (DB.documents || []).filter(function (d) { return !d.seeded; }).map(function (d) { return { id: d.id, user_id: uid, subject_id: d.subjectId || null, name: L(d.title), kind: d.kind, mime_type: d.mime || null, size: d.sizeBytes || 0, storage_path: d.storagePath || null, status: d.status === "analyzed" ? "ready" : d.status, text_source: d.textSource || null, extracted_text: d.text || null, summary: d.summary || null, metadata: d.analysis || {} }; });
      if (entity === "conversations") return DB.conversations.filter(function (c) { return c.messages && c.messages.length; }).map(function (c) { return { id: c.id, user_id: uid, subject_id: c.contextId || null, document_id: c.docId || null, title: c.title ? L(c.title) : null, thread: c.thread || {} }; });
      if (entity === "sessions") return DB.sessions.map(function (x) { return { id: x.id, user_id: uid, subject_id: x.subjectId || null, document_id: x.docId || null, mode: x.mode || "review", score: x.score, total: x.total || null }; });
      return null;
    }
    var ENTITIES = { subjects: "subjects", calendar: "calendar_tasks", documents: "documents", conversations: "conversations", sessions: "study_sessions" };
    return {
      _rpc: _rpc,
      enabled: on,
      push: function (entity) {
        if (!on()) return Promise.resolve();
        var uid = Auth.user() && Auth.user().id;
        var table = ENTITIES[entity]; if (!table || !uid) return Promise.resolve();
        var rows = rowsFor(entity, uid); if (!rows || !rows.length) return Promise.resolve();
        return rest(table + "?on_conflict=id", { method: "POST", headers: { "prefer": "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify(rows) }).catch(function () {});
      },
      pushAll: function () {
        if (!on()) return Promise.resolve();
        return Promise.all(Object.keys(ENTITIES).map(this.push.bind(this)));
      },
      pull: function () {
        if (!on()) return Promise.resolve(null);
        // TODO(cloud): traer cada tabla, hidratar DB.*, resolver conflictos por updated_at.
        // Estructura lista; se activa cuando el usuario inicie sesión con Supabase.
        return Promise.all([
          rest("profiles?select=*&limit=1"),
          rest("subjects?select=*"),
          rest("documents?select=*"),
          rest("conversations?select=*&order=updated_at.desc"),
          rest("calendar_tasks?select=*"),
          rest("study_sessions?select=*&order=created_at.desc&limit=200"),
          _rpc("current_usage", {})
        ]).then(function (r) {
          return { profile: (r[0] || [])[0], subjects: r[1], documents: r[2], conversations: r[3], calendar: r[4], sessions: r[5], usage: r[6] };
        }).catch(function () { return null; });
      },
      usage: function () { return _rpc("current_usage", {}); },
      touchStreak: function () { return _rpc("touch_streak", {}); }
    };
  })();
  try { window.ZynqoraCloud = { Auth: Auth, Sync: Sync, config: AI_CONFIG }; } catch (e) {}

  /* ================= PODCAST — script + on-device voice (TTS-ready) ================= */
  /* ================= NORMALIZACIÓN DEL GUION PARA VOZ =================
     La transcripción visual conserva "1789"; el TTS recibe "mil setecientos ochenta y nueve".
     Pipeline: generatePodcastScript -> normalizeScriptForSpeech -> addVoiceDirection -> generateTTS */
  var SP_U = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte", "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve"];
  var SP_T = ["", "", "", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
  var SP_H = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];
  var MONTHS_ES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var MONTHS_EN = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
  var EN_U = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  var EN_T = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  var FEM_RE = /^(personas?|mujeres|alumnas?|ni[ñn]as?|casas?|causas?|ideas?|p[áa]ginas?|razones|palabras?|preguntas?|respuestas?|d[ée]cadas?|semanas?|horas?|leyes?|guerras?|revoluciones?|c[ée]lulas?|unidades?|toneladas?|hect[áa]reas?|frases?|obras?|partes?|etapas?|fases?|batallas?|ciudades?|regiones?|monedas?|libras?|toneladas?|v[íi]ctimas?|tropas?|monarqu[íi]as?|dinast[íi]as?|constituciones?)/i;
  function sp999(n) {
    n = parseInt(n, 10); if (!n) return "";
    if (n === 100) return "cien";
    var h = Math.floor(n / 100), r = n % 100, o = h ? SP_H[h] : "";
    if (r) { if (o) o += " "; o += r < 30 ? SP_U[r] : SP_T[Math.floor(r / 10)] + (r % 10 ? " y " + SP_U[r % 10] : ""); }
    return o;
  }
  function spInt(n) {
    n = parseInt(n, 10); if (isNaN(n)) return "";
    if (n < 0) return "menos " + spInt(-n);
    if (n < 1000) return sp999(n) || "cero";
    if (n < 1000000) {
      var th = Math.floor(n / 1000), r = n % 1000;
      var tt = th === 1 ? "mil" : sp999(th).replace(/uno$/, "un") + " mil";
      return (tt + (r ? " " + sp999(r) : "")).trim();
    }
    var m = Math.floor(n / 1000000), rr = n % 1000000;
    return ((m === 1 ? "un millón" : spInt(m) + " millones") + (rr ? " " + spInt(rr) : "")).trim();
  }
  function spFem(w, fem) { return fem ? w.replace(/ientos\b/g, "ientas").replace(/uno\b/g, "una") : w; }
  function spDecimal(n) {
    n = String(n).trim();
    if (n.indexOf(",") > -1) {
      var p = n.split(",");
      return spInt(p[0].replace(/[.\s]/g, "")) + " coma " + p[1].split("").map(function (d) { return SP_U[+d] || d; }).join(" ");
    }
    return spInt(n.replace(/[.\s]/g, ""));
  }
  function enInt(n) {
    n = parseInt(n, 10); if (isNaN(n)) return "";
    if (n < 20) return EN_U[n];
    if (n < 100) return EN_T[Math.floor(n / 10)] + (n % 10 ? "-" + EN_U[n % 10] : "");
    if (n < 1000) return EN_U[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + enInt(n % 100) : "");
    if (n < 1000000) return enInt(Math.floor(n / 1000)) + " thousand" + (n % 1000 ? " " + enInt(n % 1000) : "");
    return String(n);
  }
  function enYear(y) {
    y = parseInt(y, 10);
    if (y >= 2000 && y < 2010) return "two thousand" + (y % 10 ? " " + enInt(y % 10) : "");
    if (y >= 1000) { var hi = Math.floor(y / 100), lo = y % 100; return enInt(hi) + (lo ? (lo < 10 ? " oh " + enInt(lo) : " " + enInt(lo)) : " hundred"); }
    return enInt(y);
  }
  function romanToInt(r) {
    var m = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }, t = 0; r = String(r).toUpperCase();
    for (var i = 0; i < r.length; i++) { var c = m[r[i]] || 0, nx = m[r[i + 1]] || 0; t += c < nx ? -c : c; }
    return t;
  }
  function ordEN(n) { var o = { 1: "first", 2: "second", 3: "third", 5: "fifth", 8: "eighth", 9: "ninth", 12: "twelfth" }; return o[n] || (enInt(n).replace(/y$/, "ie") + "th"); }
  function numWords(n, lang, fem) { return lang === "en" ? enInt(n) : spFem(spInt(n), fem); }
  function yearWords(y, lang) { return lang === "en" ? enYear(y) : spInt(y); }
  function monthName(m, lang) { return (lang === "en" ? MONTHS_EN : MONTHS_ES)[Math.max(0, Math.min(11, m - 1))]; }
  function capFirst(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function normalizeScriptForSpeech(text, lang, topic) {
    if (!text) return text;
    try {
      var en = lang === "en";
      var s = " " + String(text) + " ";
      /* matemáticas (solo para voz; la transcripción visual conserva la fórmula) */
      s = s.replace(/([A-Za-zπ0-9\)])\s*²/g, "$1 " + (en ? "squared" : "al cuadrado"));
      s = s.replace(/([A-Za-zπ0-9\)])\s*³/g, "$1 " + (en ? "cubed" : "al cubo"));
      s = s.replace(/([A-Za-z0-9\)])\s*\^\s*(\d+)/g, function (_, b, e) { return b + (en ? " to the power of " + e : " elevado a " + spInt(e)); });
      s = s.replace(/√\s*(\d+)/g, function (_, n) { return (en ? "square root of " : "raíz cuadrada de ") + numWords(n, lang); });
      s = s.replace(/√/g, en ? "square root of " : "raíz cuadrada de ");
      s = s.replace(/π/g, "pi");
      /* coeficiente + variable: "2x" -> "dos equis" */
      s = s.replace(/\b(\d{1,4})\s*([xy])\b/g, function (_, n, v) { return en ? numWords(n, "en") + " " + v : spInt(n) + " " + (v === "x" ? "equis" : "i griega"); });
      if (!en) s = s.replace(/\b([xy])\b(?=\s*(?:\+|-|·|×|\*|=|²|³|\^|\/))/g, function (_, v) { return v === "x" ? "equis" : "i griega"; });
      s = s.replace(/\s=\s/g, en ? " equals " : " es igual a ");
      s = s.replace(/([\wÁÉÍÓÚÑáéíóúñ)])\s*\+\s*([\wÁÉÍÓÚÑáéíóúñ(])/g, "$1 " + (en ? "plus" : "más") + " $2");
      s = s.replace(/([\d)])\s*[·×*]\s*([\dA-Za-z(])/g, "$1 " + (en ? "times" : "por") + " $2");
      s = s.replace(/(\d)\s*\/\s*(\d)/g, "$1 " + (en ? "over" : "entre") + " $2");
      /* fechas dd/mm/aaaa · dd-mm-aaaa · dd.mm.aaaa */
      s = s.replace(/\b(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{3,4})\b/g, function (_, d, m, y) {
        return numWords(d, lang) + (en ? " " : " de ") + monthName(parseInt(m, 10), lang) + (en ? " " : " de ") + yearWords(y, lang);
      });
      /* "14 de julio de 1789" / "14 de julio" / "14 julio 1789" */
      var mn = (en ? MONTHS_EN : MONTHS_ES).join("|");
      s = s.replace(new RegExp("\\b(\\d{1,2})\\s+(?:de\\s+)?(" + mn + ")(?:\\s+(?:de\\s+)?(\\d{3,4}))?\\b", "gi"), function (m0, d, mon, y) {
        return numWords(d, lang) + " de " + mon.toLowerCase() + (y ? " de " + yearWords(y, lang) : "");
      });
      /* rangos de años: "1789–1799" / "1789-1799" -> "... a ..." */
      s = s.replace(/\b(1\d{3}|20\d{2})\s*[–—\-]\s*(1\d{3}|20\d{2})\b/g, function (_, a, b) { return yearWords(a, lang) + (en ? " to " : " a ") + yearWords(b, lang); });
      /* siglos: "siglo XVIII", "s. XIX" */
      s = s.replace(/\b(siglos?|s\.)\s+([IVXLCDM]{1,6})\b/g, function (_, w, rom) {
        return (/^s\.$/i.test(w) ? "siglo" : w.toLowerCase()) + " " + spInt(romanToInt(rom));
      });
      s = s.replace(/\bcent(?:ury|uries)\s+([IVXLCDM]{1,6})\b/gi, function (_, rom) { return "century " + enInt(romanToInt(rom)); });
      s = s.replace(/\b([IVXLCDM]{2,6})(?:st|nd|rd|th)?\s+(centur)/gi, function (_, rom, c) { return ordEN(romanToInt(rom)) + " " + c; });
      /* romanos en "capítulo/tema/unidad/parte X" (NO en nombres propios como Luis XVI) */
      s = s.replace(/\b(cap[íi]tulo|tema|unidad|parte|fase|lecci[óo]n|bloque|chapter|unit|part|lesson)\s+([IVXLCDM]{1,6})\b/gi, function (_, w, rom) {
        return w + " " + numWords(String(romanToInt(rom)), lang);
      });
      /* porcentajes */
      s = s.replace(/(\d+(?:[.,]\d+)?)\s*%/g, function (_, n) { return (en ? enInt(String(n).replace(/[.,].*/, "")) + (/[.,]/.test(n) ? " point " + n.replace(/^\d+[.,]/, "").split("").map(function (d) { return EN_U[+d] || d; }).join(" ") : "") : spDecimal(n)) + (en ? " percent" : " por ciento"); });
      /* moneda € */
      s = s.replace(/(\d[\d.]*?)(?:,(\d{1,2}))?\s*€/g, function (_, int, cents) {
        var w = spInt(int.replace(/[.\s]/g, ""));
        return cents ? w + " euros con " + spInt(cents) : w + " euros";
      });
      /* unidades */
      var UN = { km: ["kilómetro", "kilómetros"], m: ["metro", "metros"], cm: ["centímetro", "centímetros"], mm: ["milímetro", "milímetros"], kg: ["kilogramo", "kilogramos"], g: ["gramo", "gramos"], mg: ["miligramo", "miligramos"], l: ["litro", "litros"], ml: ["mililitro", "mililitros"] };
      s = s.replace(/(\d+(?:[.,]\d+)?)\s*(km\/h|km|cm|mm|kg|mg|ml|min|m|g|l)\b/g, function (m0, n, u) {
        if (en) return spDecimal(n) + " " + u;
        var num = spDecimal(n), one = /^(uno|una)$/.test(num);
        if (u === "km/h") return (one ? "un" : num) + " kilómetro" + (one ? "" : "s") + " por hora";
        var M2 = { min: ["minuto", "minutos"] };
        var tab = UN[u] || M2[u];
        return (one ? "un" : num) + " " + (tab ? tab[one ? 0 : 1] : u);
      });
      s = s.replace(/(-?\d+(?:[.,]\d+)?)\s*°\s*C\b/gi, function (_, n) { return spDecimal(n) + (en ? " degrees Celsius" : " grados Celsius"); });
      /* separador de miles "2.500" -> "dos mil quinientos" · decimales "7,5" -> "siete coma cinco" */
      s = s.replace(/\b(\d{1,3}(?:\.\d{3})+)\b/g, function (_, n) { return en ? enInt(n.replace(/\./g, "")) : spInt(n.replace(/\./g, "")); });
      s = s.replace(/\b(\d{1,4}),(\d{1,3})\b/g, function (_, a, b) { return spInt(a) + " coma " + b.split("").map(function (d) { return SP_U[+d] || d; }).join(" "); });
      /* años en prosa con palabra de contexto */
      var YWORDS = en ? "in|around|by|since|until|between|and|to|year|of|circa" : "en|hacia|desde|hasta|entre|para|año|años|del|de|y|a|allá por|corría el|era el|circa";
      s = s.replace(new RegExp("(^|[\\s(¿¡\"—–])(" + YWORDS + ")(\\s+)(1\\d{3}|20\\d{2})\\b", "gi"), function (m0, b, w, sp, y) { return b + w + sp + yearWords(y, lang); });
      s = s.replace(/([.!?]\s+)(1\d{3}|20\d{2})(?=[.\s])/g, function (_, pre, y) { return pre + capFirst(yearWords(y, lang)); });
      /* número + palabra: "3 causas", "25 alumnos", "1500 personas", "1789 comenzó" (evita página/código) */
      s = s.replace(/([A-Za-zÁÉÍÓÚÑáéíóúñ.]+\s+)?(\d{1,4})\s+([A-Za-zÁÉÍÓÚÑáéíóúñ]+)/g, function (m0, pre, n, word) {
        if (parseInt(n, 10) === 0) return m0;
        var p = (pre || "").toLowerCase();
        if (/\b(p[áa]g|p[áa]gina|c[óo]digo|referencia|n[úu]mero|tel[eé]fono|isbn|figura|tabla|versi[óo]n|art[íi]culo|habitaci[óo]n|aula)\.?\s*$/.test(p)) return m0;
        var fem = FEM_RE.test(word);
        var isCount = fem || /^(alumnos|casos|euros|d[óo]lares|metros|kil[óo]|habitantes|a[nñ]os|d[ií]as|veces|puntos|estudiantes|hombres|soldados|muertos|v[íi]ctimas|ejemplos|tipos|grupos|elementos)/i.test(word);
        var isYear = /^1\d{3}$|^20\d{2}$/.test(n) && !isCount;
        var v = isYear ? yearWords(n, lang) : numWords(n, lang, fem);
        return (pre || "") + v + " " + word;
      });
      /* años sueltos restantes: solo "(1789)", "…1789." (no "página 1789 del") */
      s = s.replace(/([(¿¡"—–])(1\d{3}|20\d{2})(?=[).,;:!?"—–])/g, function (_, pre, y) { return pre + yearWords(y, lang); });
      s = s.replace(/([.!?;:]\s*)(1\d{3}|20\d{2})\b/g, function (_, pre, y) { return pre + capFirst(yearWords(y, lang)); });
      /* números pequeños sueltos restantes (no COVID-19, no x-2) */
      s = s.replace(/(^|[^-\w.])(\d{1,3})(?=[.,;:!?)\s]|$)/g, function (m0, pre, n) { return parseInt(n, 10) ? pre + spInt(n) : m0; });
      return s.replace(/\s{2,}/g, " ").trim();
    } catch (e) { return text; }
  }

  var POD_VSTYLE_KEYS = ["natural", "teacher", "podcast", "conv"];
  function addVoiceDirection(lang, styleKey, two) {
    var en = lang === "en";
    var toneES = { natural: "cercano y natural", teacher: "de profe joven que explica con paciencia", podcast: "de podcaster con energía y curiosidad", conv: "de conversación relajada entre dos personas" }[styleKey] || "cercano y natural";
    var toneEN = { natural: "warm and natural", teacher: "of a young teacher explaining patiently", podcast: "of an energetic, curious podcaster", conv: "of a relaxed two-person conversation" }[styleKey] || "warm and natural";
    if (en) {
      return "Speak English in a warm, natural, conversational way, with a tone " + toneEN + ". " +
        "Imagine you're explaining this to a student sitting in front of you — don't read it like a document. " +
        "Use human, expressive intonation. Vary your pace and intensity slightly. Pause naturally between ideas. " +
        "Emphasise important dates, key concepts and conclusions, without overdoing it. " +
        "Pronounce dates and numbers naturally and clearly, never digit by digit. Avoid any monotone or robotic tone. " +
        (two ? "There are two voices with slightly different personalities holding a real educational conversation." : "");
    }
    return "Habla en español de forma cálida, natural y conversacional, con un tono " + toneES + ". " +
      "Imagina que le explicas el tema a un estudiante sentado enfrente: no leas el texto como un documento. " +
      "Usa una entonación humana y expresiva. Varía ligeramente el ritmo y la intensidad. Haz pausas naturales entre ideas. " +
      "Da énfasis a las fechas importantes, los conceptos clave y las conclusiones, sin exagerar. " +
      "Pronuncia las fechas y los números de forma natural y comprensible; nunca dígito por dígito. Evita por completo el tono monótono o robótico. " +
      (two ? "Son dos voces con personalidades ligeramente distintas manteniendo una conversación educativa real." : "");
  }

  /* generatePodcastScript() — guion pensado para ser hablado */
  function buildPodScript(o) {
    var s = subj(o.subjectId || DB.currentSubjectId);
    var en = (o.lang || DB.lang) === "en";
    var lang = en ? "en" : "es";
    var approach = o.approach || 0;
    var minutes = o.minutes || 10;
    var two = approach === 2;
    var name = L(s.name);
    var sents = L(s.doc.summary).split(/\.\s+/).map(function (x) { return x.trim().replace(/\.$/, ""); }).filter(function (x) { return x.length > 8; }).map(function (x) { return x + "."; });
    var concepts = L(s.doc.analysis.main);
    var fcs = s.flashcards || [];
    var segs = [];
    var A = function (x) { segs.push({ speaker: "A", text: x }); };
    var B = function (x) { segs.push({ speaker: "B", text: x }); };

    if (two) {
      A(en ? "Hey, welcome to your Zynqora study podcast. Today we're taking a look at " + name.toLowerCase() + "." : "Hola, bienvenido a tu podcast de estudio de Zynqora. Hoy le echamos un vistazo a " + name.toLowerCase() + ".");
      B(en ? "Nice. So where do we start?" : "Genial. ¿Y por dónde empezamos?");
      A((en ? "Let's start with the big idea. " : "Empecemos por la idea general. ") + (sents[0] || ""));
      concepts.slice(0, 4).forEach(function (c, i) {
        B(en ? "Okay, and " + c.toLowerCase() + "?" : "Vale, ¿y " + c.toLowerCase() + "?");
        A(sents[i + 1] || (en ? "Think of " + c.toLowerCase() + " as one of those ideas you should be able to say in one sentence." : "Piensa en " + c.toLowerCase() + " como una de esas ideas que deberías saber decir en una frase."));
      });
      if (fcs[0]) { B((en ? "Quick one for whoever's listening: " : "Una rápida para quien nos escucha: ") + L(fcs[0].q)); A((en ? "Right. " : "Eso es. ") + L(fcs[0].a)); }
      A(en ? "And that's the review. Go over these points one more time and the topic is yours." : "Y hasta aquí el repaso. Repasa estos puntos una vez más y el tema es tuyo.");
      B(en ? "See you next episode." : "Nos vemos en el próximo.");
    } else {
      A((en ? "Hey, welcome to your Zynqora study podcast. Today we're going through " + name.toLowerCase() + ", step by step and without rushing." : "Hola, bienvenido a tu podcast de estudio de Zynqora. Hoy vamos a repasar " + name.toLowerCase() + ", paso a paso y sin prisa."));
      if (sents[0]) A((en ? "Here's the big picture. " : "Aquí tienes la idea general. ") + sents[0]);
      sents.slice(1, 4).forEach(function (x) { A(x); });
      concepts.slice(0, 4).forEach(function (c, i) {
        A((en ? "Idea number " : "Idea número ") + (i + 1) + ": " + c + ". " + (sents[i + 1] ? "" : (en ? "Try to say it in your own words." : "Intenta decirlo con tus propias palabras.")));
      });
      if (approach === 1) {
        A(en ? "Now, a couple of quick questions to check yourself." : "Y ahora, un par de preguntas rápidas para comprobar.");
        fcs.slice(0, 2).forEach(function (fc) { A((en ? "Question: " : "Pregunta: ") + L(fc.q)); A((en ? "The answer: " : "La respuesta: ") + L(fc.a)); });
      }
      A(en ? "That's it for today. Review these points and you'll be ready." : "Esto es todo por hoy. Repasa estos puntos y estarás listo.");
    }
    var totalWords = segs.reduce(function (n, sg) { return n + sg.text.split(/\s+/).length; }, 0) || 1;
    var dur = Math.round(minutes * 60), acc = 0;
    segs = segs.map(function (sg) {
      var st = { speaker: sg.speaker, text: sg.text, speech: normalizeScriptForSpeech(sg.text, lang, name), t: Math.round(acc / totalWords * (dur - 4)) };
      acc += sg.text.split(/\s+/).length;
      return st;
    });
    return {
      title: L(s.doc.title).replace(/\.(pdf|PDF)$/, ""), segments: segs, dur: dur, two: two, approach: approach,
      direction: addVoiceDirection(lang, POD_VSTYLE_KEYS[o.voiceStyle || 0], two)
    };
  }

  /* ---- voz on-device (demo): normalización + entonación + pausas ---- */
  var SPEECH = { ok: false, voices: [], segIdx: 0, playing: false, script: null, dur: 0, nudge: null, queue: [], qi: 0 };
  function speechInit() {
    try {
      if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") return;
      SPEECH.ok = true;
      var load = function () { try { SPEECH.voices = window.speechSynthesis.getVoices() || []; } catch (e) {} };
      load();
      try { window.speechSynthesis.addEventListener("voiceschanged", load); } catch (e) {}
      try { window.speechSynthesis.onvoiceschanged = load; } catch (e) {}
    } catch (e) {}
  }
  function speechAvailable() { return SPEECH.ok; }
  function pickStyleVoice(lang, which) {
    var code = (lang || "es").slice(0, 2).toLowerCase();
    var vs = SPEECH.voices.filter(function (v) { return v.lang && v.lang.toLowerCase().indexOf(code) === 0; });
    if (!vs.length) vs = SPEECH.voices;
    if (!vs.length) return null;
    var nice = vs.filter(function (v) { return /natural|neural|online|enhanced|premium|google/i.test(v.name) && !/compact/i.test(v.name); });
    var pool = nice.length ? nice : vs;
    if (which === "B") { var alt = pool.filter(function (v) { return v !== pool[0]; }); return alt[0] || vs[1] || pool[0]; }
    return pool[0];
  }
  function styleParams(styleKey, speaker) {
    var p = { rate: 1, pitch: 1 };
    if (styleKey === "teacher") p = { rate: 0.97, pitch: 1.0 };
    else if (styleKey === "podcast") p = { rate: 1.06, pitch: 1.05 };
    else if (styleKey === "conv") p = { rate: 1.03, pitch: 1.02 };
    if (speaker === "B") p.pitch += 0.12;
    return p;
  }
  function buildSpeechQueue(script, fromSeg) {
    var q = [], styleKey = POD_VSTYLE_KEYS[S.podVStyleIdx || 0];
    for (var i = fromSeg; i < script.segments.length; i++) {
      var seg = script.segments[i];
      var txt = seg.speech || seg.text;
      var parts = txt.match(/[^.!?…]+[.!?…]*/g) || [txt];
      parts.forEach(function (p) {
        p = p.trim(); if (!p) return;
        var sp = styleParams(styleKey, script.two ? seg.speaker : "A");
        var emph = /\b(mil\b|por ciento|es igual|recuerda|important|clave|nunca|siempre|la respuesta|conclusi|no olvides|fíjate)/i.test(p);
        q.push({ segIdx: i, text: p, speaker: seg.speaker, t: seg.t,
          rate: sp.rate * (emph ? 0.93 : 1) * (1 + (Math.random() * 0.05 - 0.025)),
          pitch: sp.pitch });
      });
    }
    return q;
  }
  function speechStop() {
    SPEECH.playing = false;
    if (SPEECH.nudge) { clearInterval(SPEECH.nudge); SPEECH.nudge = null; }
    try { window.speechSynthesis.cancel(); } catch (e) {}
    bgmStop();
  }
  function speechSpeakFrom(fromSeg) {
    if (!SPEECH.ok || !SPEECH.script) return;
    speechStop();
    var script = SPEECH.script, lang = DB.lang === "en" ? "en-US" : "es-ES";
    SPEECH.queue = buildSpeechQueue(script, Math.max(0, Math.min(fromSeg, script.segments.length - 1)));
    SPEECH.qi = 0; SPEECH.segIdx = -1;
    SPEECH.playing = true; S.podPlaying = 1;
    var vA = pickStyleVoice(lang, "A"), vB = pickStyleVoice(lang, "B");
    var vol = S.podVol == null ? 0.9 : S.podVol;
    bgmStart();
    function next() {
      if (!SPEECH.playing) return;
      if (SPEECH.qi >= SPEECH.queue.length) { podFinish(); return; }
      var it = SPEECH.queue[SPEECH.qi];
      if (it.segIdx !== SPEECH.segIdx) { SPEECH.segIdx = it.segIdx; S.podPos = it.t; updatePodDom(SPEECH.dur); }
      var u;
      try { u = new SpeechSynthesisUtterance(it.text); } catch (e) { podFinish(); return; }
      u.lang = lang;
      u.rate = Math.min(2, Math.max(0.55, it.rate * (S.podSpeed || 1)));
      u.pitch = Math.max(0.5, Math.min(1.7, it.pitch));
      u.volume = vol;
      var v = (script.two && it.speaker === "B") ? vB : vA;
      if (v) u.voice = v;
      u.onend = function () { if (!SPEECH.playing) return; SPEECH.qi++; next(); };
      u.onerror = function () { SPEECH.qi++; if (SPEECH.playing) next(); };
      try { window.speechSynthesis.speak(u); } catch (e) { podFinish(); }
    }
    if (SPEECH.nudge) clearInterval(SPEECH.nudge);
    SPEECH.nudge = setInterval(function () {
      if (!SPEECH.playing || S.screen !== "toolFlow" || (S.toolStep || 0) !== 3 || S.tool !== "podcast" || S.presMode) { clearInterval(SPEECH.nudge); SPEECH.nudge = null; return; }
      var segs = script.segments;
      var nT = SPEECH.segIdx + 1 < segs.length ? segs[SPEECH.segIdx + 1].t : SPEECH.dur;
      if (S.podPos < nT - 1) { S.podPos = Math.min(nT - 0.5, S.podPos + 1); updatePodDom(SPEECH.dur); }
    }, 1000);
    render(true);
    next();
  }

  /* ---- música de fondo opcional (secundaria, volumen bajo, OFF por defecto) ---- */
  var BGM = { ctx: null, nodes: [] };
  function bgmStop() { BGM.nodes.forEach(function (n) { try { if (n.stop) n.stop(); n.disconnect(); } catch (e) {} }); BGM.nodes = []; }
  function bgmStart() {
    if (!S.podMusic) return;
    try {
      var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      if (!BGM.ctx) BGM.ctx = new AC();
      if (BGM.ctx.state === "suspended") BGM.ctx.resume();
      bgmStop();
      var g = BGM.ctx.createGain(); g.gain.value = 0.026; g.connect(BGM.ctx.destination);
      var f = BGM.ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 480; f.connect(g);
      [98, 146.83, 196].forEach(function (fr) {
        var o = BGM.ctx.createOscillator(); o.type = "sine"; o.frequency.value = fr;
        var og = BGM.ctx.createGain(); og.gain.value = 0.5;
        o.connect(og); og.connect(f); o.start(); BGM.nodes.push(o, og);
      });
      BGM.nodes.push(g, f);
    } catch (e) {}
  }
  function podFinish() {
    speechStop();
    S.podPlaying = 0; S.podPos = SPEECH.dur || (S.podScript && S.podScript.dur) || POD_DUR[S.podDur || "medium"];
    render(true);
  }
  function podScript() {
    if (!S.podScript) {
      var td = S.toolDoc ? docById(S.toolDoc) : null;
      S.podScript = (td && docHasText(td))
        ? DocGen.podcastSegments(td.text, L(td.title), S.podApproach || 0, POD_DUR[S.podDur || "medium"] / 60, DB.lang)
        : buildPodScript({ subjectId: cur().id, approach: S.podApproach || 0, minutes: POD_DUR[S.podDur || "medium"] / 60, voiceStyle: S.podVStyleIdx || 0 });
    }
    return S.podScript;
  }
  function transcriptFor(s) {
    return podScript().segments.map(function (sg) { return { t: sg.t, text: sg.text, speaker: sg.speaker }; });
  }
  function podcastResult(s) {
    var sc = podScript();
    var dur = sc.dur;
    var pos = Math.min(dur, S.podPos || 0);
    var pct = pos / dur * 100;
    var tdoc = S.toolDoc ? docById(S.toolDoc) : null;
    var title = (sc.title || (tdoc ? L(tdoc.title) : L(s.doc.title))).replace(/\.(pdf|PDF|txt|docx|md)$/i, "");
    var subjId = HERO[s.id] ? s.id : "_";
    var approach = t(POD_APPROACH[S.podApproach || 0][0]);
    var voice = sc.two ? t("pod.twoVoices") : t(POD_VOICES[S.podVoiceIdx || 0][0]);
    var vstyle = t(POD_VSTYLES[S.podVStyleIdx || 0]);
    var speeds = [0.75, 1, 1.25, 1.5, 2];
    var vol = S.podVol == null ? 0.9 : S.podVol;
    var tr = sc.segments;
    var curLine = -1;
    for (var i = 0; i < tr.length; i++) if (pos >= tr[i].t) curLine = i;
    var canPlay = aiIsReal() || speechAvailable();
    var noteKey = aiIsReal() ? "pod.noteReal" : (speechAvailable() ? "pod.noteBrowser" : "pod.noteScript");
    return '<div class="pod-shell">' +
      '<div class="pod-cover" data-subj="' + subjId + '"><span class="pc-art">' + (HERO[s.id] || HERO._) + "</span>" +
        '<div class="pc-top"><span class="pc-badge">' + icon("mic", 12) + t("pres.byZynqora") + "</span>" + aiBadge() + "</div>" +
        '<div class="pc-title">' + title + '</div>' +
        '<div class="pc-sub">' + approach + " · " + t("tf.min", { n: Math.round(dur / 60) }) + " · " + L(s.name) + "</div>" +
        '<div class="pc-by">' + voice + " · " + vstyle + "</div></div>" +
      '<div class="pod-panel">' +
        '<div class="pod-scrub" id="podScrub"><i id="podBar" style="width:' + pct + '%"></i><span class="pk" style="left:' + pct + '%"></span></div>' +
        '<div class="pod-time"><span id="podCur">' + fmtClock(pos) + '</span><span>' + fmtClock(dur) + "</span></div>" +
        '<div class="pod-transport">' +
          '<button class="pod-tb" data-action="pod-skip" data-v="-1" title="' + t("pod.prevLine") + '">' + icon("skipBack", 16) + "</button>" +
          (canPlay
            ? '<button class="pod-play" data-action="pod-toggle">' + icon(S.podPlaying ? "pause" : "play", 22) + "</button>"
            : '<button class="pod-play" disabled title="' + t("pod.noVoice") + '" style="opacity:.4">' + icon("play", 22) + "</button>") +
          '<button class="pod-tb" data-action="pod-skip" data-v="1" title="' + t("pod.nextLine") + '">' + icon("skipFwd", 16) + "</button>" +
        "</div>" +
        '<div class="pod-row2"><div class="pod-speed">' +
          speeds.map(function (sp) { return '<button class="' + ((S.podSpeed || 1) === sp ? "on" : "") + '" data-action="pod-speed" data-v="' + sp + '">' + sp + "x</button>"; }).join("") + "</div>" +
          '<div class="pod-vol">' + icon(vol <= 0.001 ? "volumeOff" : "volume", 16) + '<input type="range" id="podVol" min="0" max="1" step="0.01" value="' + vol + '" aria-label="' + t("pod.volume") + '"></div></div>' +
        '<div class="pod-music"><button class="pod-mus-t ' + (S.podMusic ? "on" : "") + '" data-action="pod-music">🎵 ' + t("pod.music") + " · " + (S.podMusic ? "ON" : "OFF") + "</button></div>" +
      "</div>" +
      '<div class="pod-panel pod-transcript"><div class="ptr-head"><span>' + t("pod.transcript") + "</span><span>" + t("pod.follow") + "</span></div>" +
        '<div class="ptr-scroll" id="ptrScroll">' + tr.map(function (ln, i) {
          return '<button class="ptr-line ' + (i === curLine ? "on" : "") + '" data-action="ptr-seekline" data-n="' + i + '">' +
            '<span class="pt-ts">' + fmtClock(ln.t) + "</span>" +
            (sc.two ? '<span class="ptr-sp">' + (ln.speaker === "B" ? t("pod.voiceB") : t("pod.voiceA")) + "</span> " : "") + ln.text + "</button>";
        }).join("") + "</div></div>" +
      '<div class="pod-note">' + icon("spark", 13) + "<span>" + t(noteKey, { voice: t(POD_VOICES[S.podVoiceIdx || 0][0]), style: vstyle }) + "</span></div>" +
      '<button class="btn btn-ghost btn-block" style="margin-top:10px" data-action="tool-regen">' + t("tf.regen") + "</button>" +
    "</div>";
  }
  function updatePodDom(dur) {
    var bar = document.getElementById("podBar");
    if (!bar) return false;
    var pct = Math.max(0, Math.min(100, S.podPos / dur * 100));
    bar.style.width = pct.toFixed(2) + "%";
    var scrub = document.getElementById("podScrub"), pk = scrub && scrub.querySelector(".pk");
    if (pk) pk.style.left = pct.toFixed(2) + "%";
    var cur = document.getElementById("podCur"); if (cur) cur.textContent = fmtClock(S.podPos);
    var lines = document.querySelectorAll("#ptrScroll .ptr-line");
    if (lines.length) {
      var segs = podScript().segments, idx = -1;
      for (var i = 0; i < lines.length && i < segs.length; i++) if (S.podPos >= segs[i].t) idx = i;
      lines.forEach(function (el, j) { el.classList.toggle("on", j === idx); });
      var sc = document.getElementById("ptrScroll");
      if (idx >= 0 && lines[idx] && sc) { try { sc.scrollTo({ top: lines[idx].offsetTop - sc.offsetTop - 74, behavior: "smooth" }); } catch (e) { sc.scrollTop = lines[idx].offsetTop - sc.offsetTop - 74; } }
    }
    return true;
  }
  function podStop() {
    if (S.podTimer) { clearInterval(S.podTimer); S.podTimer = null; }
    if (S.genTimer) { clearInterval(S.genTimer); S.genTimer = null; }
    S.podPlaying = 0; speechStop();
  }
  function podToggle() {
    var sc = podScript();
    if (S.podPlaying) { speechStop(); S.podPlaying = 0; render(true); return; }
    SPEECH.script = sc; SPEECH.dur = sc.dur;
    var line = 0;
    for (var i = 0; i < sc.segments.length; i++) if ((S.podPos || 0) >= sc.segments[i].t) line = i;
    if ((S.podPos || 0) >= sc.dur - 1) line = 0;
    if (aiIsReal() || speechAvailable()) speechSpeakFrom(line);
    else toast(t("pod.noVoice"));
  }
  function podSeekLine(n) {
    var sc = podScript();
    n = Math.max(0, Math.min(n, sc.segments.length - 1));
    S.podPos = sc.segments[n].t;
    if (S.podPlaying) speechSpeakFrom(n); else render(true);
  }
  function podSkip(delta) {
    var sc = podScript(), cur2 = 0;
    for (var i = 0; i < sc.segments.length; i++) if ((S.podPos || 0) >= sc.segments[i].t) cur2 = i;
    podSeekLine(cur2 + delta);
  }

  function runGenSeq(charge) {
    if (!S.tool) return;
    if (charge) incUsage(TOOL_META[S.tool].feat);
    S.presMode = 0; S.genError = 0; speechStop(); S.podPlaying = 0;
    if (S.podTimer) { clearInterval(S.podTimer); S.podTimer = null; }
    if (S.genTimer) { clearInterval(S.genTimer); S.genTimer = null; }
    S.podScript = null; S.deckData = null;
    S.toolStep = 2; S.genIdx = 0; S.slideIdx = 0; S.podPos = 0; render(true);
    var seq = GEN_SEQ[S.tool] || GEN_SEQ.presentation;
    var tool = S.tool;
    var myT = setInterval(function () {
      if (myT !== S.genTimer || S.screen !== "toolFlow" || (S.toolStep || 0) !== 2) { clearInterval(myT); return; }
      S.genIdx = (S.genIdx || 0) + 1;
      if (S.genIdx >= seq.length) {
        clearInterval(myT); if (S.genTimer === myT) S.genTimer = null;
        var req = tool === "podcast"
          ? ZynqoraAI.podcastScript({ subjectId: cur().id, docId: S.toolDoc || null, approach: S.podApproach || 0, minutes: POD_DUR[S.podDur || "medium"] / 60, voiceStyle: S.podVStyleIdx || 0, lang: DB.lang })
          : tool === "presentation"
            ? ZynqoraAI.presentation({ subjectId: cur().id, docId: S.toolDoc || null, style: S.presStyleIdx || 0, lang: DB.lang })
            : Promise.resolve(null);
        req.then(function (data) {
          if (S.screen !== "toolFlow" || S.tool !== tool) return;
          if (tool === "podcast") S.podScript = data;
          else if (tool === "presentation") S.deckData = data;
          S.toolStep = 3; S.slideIdx = 0; S.podPos = 0; render();
        }).catch(function () {
          if (S.screen !== "toolFlow" || S.tool !== tool) return;
          S.genError = 1; render();
        });
      } else render(true);
    }, 520);
    S.genTimer = myT;
  }
  function toolGenerate() { runGenSeq(true); }

  V.toolFlow = function () {
    var m = S.tool || "podcast", step = S.toolStep || 0, s = cur();
    if (m === "presentation" && step === 3 && S.presMode) return presentOverlay(s);
    var stepLabels = [t("tf.source"), m === "podcast" ? t("pod.approach") : t("tf.style"), t("tf.preview")];
    var inner;
    if (step === 0) {
      var srcDocs = docsOfSubject(s.id);
      if (!srcDocs.length) srcDocs = (DB.documents || []).slice(0, 6);
      inner = '<div class="card"><div class="eyebrow">' + t("tf.source") + '</div><div class="divide" style="margin-top:4px">' +
        srcDocs.map(function (d) {
          var on = S.toolDoc === d.id;
          var meta = docHasText(d) ? t("doc.wordsN", { n: (d.analysis && d.analysis.wordCount) || 0 }) + " · " + t("doc.localBadge") : (d.seeded ? t("doc.exampleBadge") : t("doc.status." + (d.status || "pending")));
          return '<button class="list-row tap" style="width:100%" data-action="tool-src" data-id="' + d.id + '"><span class="ic">' + icon(docKindIcon(d), 17) + '</span><span class="gr"><span class="tt">' + esc(L(d.title)) + '</span><span class="sb">' + meta + '</span></span>' + (on ? '<span class="pill accent" style="height:22px">' + icon("check", 11) + "</span>" : '<span class="ch">' + icon("chevR", 16) + "</span>") + "</button>";
        }).join("") + "</div></div>";
    } else if (step === 1) {
      inner = toolOptions(m) + '<button class="btn btn-primary btn-lg btn-block" style="margin-top:16px" data-action="tool-generate">' + icon("wand", 15) + t(TOOL_META[m].create) + "</button>";
    } else if (step === 2 && S.genError) {
      inner = '<div class="card"><div class="empty" style="padding:30px 16px"><div class="eic" style="background:var(--danger-soft);color:var(--danger)">' + icon("alert", 22) + "</div>" +
        "<h3>" + t("gen.errTitle") + "</h3><p>" + t("gen.errBody") + "</p>" +
        '<button class="btn btn-primary" style="margin-top:14px" data-action="tool-generate">' + icon("refresh", 15) + t("gen.retry") + "</button></div></div>";
    } else if (step === 2) {
      var seq = GEN_SEQ[m] || GEN_SEQ.presentation, gi = S.genIdx || 0;
      inner = '<div class="card"><div class="tf-gen"><div class="orb">' + icon("spark", 26) + "</div>" +
        '<div class="gt">' + t(seq[Math.min(gi, seq.length - 1)]) + "</div>" +
        '<div class="gen-steps">' + seq.map(function (k, i) {
          var cls = i < gi ? "done" : i === gi ? "active" : "";
          return '<div class="gs ' + cls + '"><span class="gsd">' + (i < gi ? icon("check", 10) : "") + "</span>" + t(k) + "</div>";
        }).join("") + "</div></div></div>";
    } else {
      inner = m === "podcast" ? podcastResult(s) : m === "presentation" ? presResult(s) : mapResult(s);
    }
    var wide = step === 3 && m === "presentation";
    var body = '<div class="topbar bordered"><button class="back" data-action="tool-back">' + icon("x", 18) + '</button><h1>' + t("tools." + m) + "</h1>" +
      (step < 3 ? '<span class="tb-actions mono txt-sm txt-muted">' + t("tf.step", { n: Math.min(step + 1, 3), total: 3 }) + "</span>" : "") + "</div>" +
      '<div class="wrap" style="max-width:' + (wide ? 620 : 540) + 'px">' +
        (step < 3 ? '<div class="tf-steps">' + stepLabels.map(function (x, i) { return '<span class="' + (i <= step ? "on" : "") + '">' + x + "</span>"; }).join("") + "</div>" : "") +
        inner + "</div>";
    return chrome("dashboard", body, { noBottom: true });
  };

  /* ---- Settings ---- */
  V.settings = function () {
    var lb = function (v, cur, lbl) { return '<button class="chip-sel ' + (cur === v ? "on" : "") + '" data-action="set-' + (arguments[3] || "") + '" data-v="' + v + '">' + lbl + "</button>"; };
    var body = topbar(t("settings.title"), { noAi: true }) +
      '<div class="wrap" style="max-width:600px">' +
        '<div class="card card-lg row" style="gap:16px"><span class="avatar-lg" style="background:' + avatarBg() + ";color:" + avatarColor() + '">' + avatarInner() + '</span><div style="flex:1"><div style="font-size:17px;font-weight:600;letter-spacing:-.01em">' + USER.name + '</div><div class="txt-sm txt-muted">' + userEmail() + '</div>' + pill(planName() + (DB.plan !== "free" ? " ✨" : "")) + '</div><button class="btn btn-secondary btn-sm" data-action="edit-photo">' + t("profile.editPhoto") + "</button></div>" +

        '<div class="card" style="margin-top:14px"><div class="between"><div><div class="eyebrow">' + t("usage.title") + '</div><div style="font-size:17px;font-weight:600;letter-spacing:-.01em;margin-top:4px">' + planName() + (DB.plan !== "free" ? " ✨" : "") + '</div></div>' +
          (DB.plan === "free" ? '<button class="btn btn-primary btn-sm" data-nav="plans">' + t("plans.cta") + "</button>" : '<button class="btn btn-secondary btn-sm" data-nav="plans">' + t("plans.manage") + "</button>") + "</div>" +
          '<div class="usage-list" style="margin-top:16px">' + METER_ROWS.map(usageRow).join("") + "</div>" +
          '<p class="txt-sm txt-muted" style="margin-top:12px">' + t("usage.resets") + "</p></div>" +

        '<div class="card" style="margin-top:14px"><div class="between"><div class="eyebrow">' + t("set.ai") + "</div>" + aiBadge() + "</div>" +
          '<div class="txt-sm" style="margin-top:8px;font-weight:500">' + (aiIsReal() ? t("set.aiReal") : t("set.aiDemo")) + "</div>" +
          '<p class="txt-sm txt-muted" style="margin-top:8px;line-height:1.5">' + t("set.aiHelp") + "</p>" +
          '<label class="label" style="margin-top:14px">' + t("set.aiEndpoint") + "</label>" +
          '<input class="field" id="aiEndpoint" placeholder="' + t("set.aiEndpointPh") + '" value="' + (AI_CONFIG.endpoint || "").replace(/"/g, "&quot;") + '">' +
          '<div class="row" style="gap:10px;margin-top:12px">' +
            '<button class="btn btn-primary btn-block" data-action="ai-connect">' + t(aiIsReal() ? "set.aiConnected" : "set.aiConnect") + "</button>" +
            (aiIsReal() ? '<button class="btn btn-ghost" data-action="ai-disconnect">' + t("set.aiDisconnect") + "</button>" : "") + "</div>" +
          '<p class="txt-sm txt-muted" style="margin-top:10px;line-height:1.5">🔒 ' + t("set.aiKeyNote") + "</p></div>" +

        '<div class="card" style="margin-top:14px"><div class="between"><div class="eyebrow">' + t("set.cloud") + "</div>" +
          (Auth.enabled() ? pill(icon("check", 11) + t("set.cloudConnected"), "good") : pill(t("set.aiDemo").split(" · ")[0], "")) + "</div>" +
          '<p class="txt-sm txt-muted" style="margin-top:8px;line-height:1.5">' + t("set.cloudHelp") + "</p>" +
          '<label class="label" style="margin-top:14px">' + t("set.cloudUrl") + '</label>' +
          '<input class="field" id="cloudUrl" placeholder="' + t("set.cloudUrlPh") + '" value="' + esc(AI_CONFIG.supabaseUrl || "") + '">' +
          '<label class="label" style="margin-top:10px">' + t("set.cloudKey") + '</label>' +
          '<input class="field" id="cloudKey" placeholder="' + t("set.cloudKeyPh") + '" value="' + esc(AI_CONFIG.supabaseAnonKey || "") + '">' +
          '<div class="row" style="gap:10px;margin-top:12px">' +
            '<button class="btn btn-primary btn-block" data-action="cloud-connect">' + t(Auth.enabled() ? "set.cloudConnected" : "set.cloudConnect") + "</button>" +
            (Auth.enabled() ? '<button class="btn btn-ghost" data-action="cloud-disconnect">' + t("set.cloudDisconnect") + "</button>" : "") + "</div>" +
          (Auth.enabled()
            ? (Auth.session()
              ? '<div class="switchrow" style="border:none;margin-top:8px"><span class="txt-sm">' + t("auth.signedInAs") + " <strong>" + esc((Auth.user() && Auth.user().email) || "") + '</strong></span><button class="btn btn-ghost btn-sm" data-action="cloud-signout">' + t("auth.signout") + "</button></div>"
              : '<button class="btn btn-secondary btn-block" style="margin-top:10px" data-nav="auth">' + t("auth.signin") + " / " + t("auth.signup") + "</button>")
            : '<p class="txt-sm txt-muted" style="margin-top:10px">' + t("set.cloudLocalNote") + "</p>") + "</div>" +

        '<div class="card" style="margin-top:14px"><div class="eyebrow" style="margin-bottom:12px">' + t("settings.language") + '</div><div class="chip-row">' +
          '<button class="chip-sel ' + (DB.lang === "es" ? "on" : "") + '" data-lang-set="es">Español</button><button class="chip-sel ' + (DB.lang === "en" ? "on" : "") + '" data-lang-set="en">English</button></div></div>' +

        '<div class="card" style="margin-top:14px"><div class="eyebrow" style="margin-bottom:12px">' + t("settings.theme") + '</div><div class="chip-row">' +
          '<button class="chip-sel ' + (DB.theme === "light" ? "on" : "") + '" data-theme-set="light">' + t("settings.themeLight") + '</button>' +
          '<button class="chip-sel ' + (DB.theme === "dark" ? "on" : "") + '" data-theme-set="dark">' + t("settings.themeDark") + '</button>' +
          '<button class="chip-sel ' + (DB.theme === "system" ? "on" : "") + '" data-theme-set="system">' + t("settings.themeAuto") + "</button></div>" +
          '<div style="height:1px;background:var(--border);margin:14px 0"></div>' +
          '<div class="eyebrow" style="margin-bottom:12px">' + t("settings.accent") + '</div><div class="accent-pick">' +
          ACCENT_KEYS.map(function (k) {
            var c = ACCENTS[k][effectiveDark() ? "dark" : "light"];
            var locked = planOf().pers === "basic" && BASIC_ACCENTS.indexOf(k) < 0;
            return '<button class="' + (DB.accent === k ? "on" : "") + (locked ? " locked" : "") + '" style="background:' + c + ";color:" + c + '" data-action="' + (locked ? "accent-locked" : "set-accent") + '" data-v="' + k + '" title="' + t("accent." + k) + (locked ? " · Plus" : "") + '"></button>';
          }).join("") + "</div>" +
          (planOf().pers === "basic" ? '<p class="txt-sm txt-muted" style="margin-top:10px">' + t("feat.persBasic") + " · " + t("plan.plus") + "</p>" : "") + "</div>" +

        (DB.plan === "free" ? '<div class="card" style="margin-top:14px;border-color:var(--accent-line);background:var(--accent-soft)">' +
          '<div style="font-weight:600;letter-spacing:-.01em">' + t("premium.title") + '</div><div class="txt-sm txt-muted" style="margin-top:2px">' + t("premium.f1d") + '</div>' +
          '<button class="btn btn-primary btn-sm" style="margin-top:12px" data-action="premium">' + t("premium.cta") + "</button></div>" : "") +

        '<div class="card" style="margin-top:14px"><div class="switchrow"><div><div style="font-weight:500;font-size:14px">' + t("settings.notifications") + '</div><div class="txt-sm txt-muted">' + (DB.notifications ? t("settings.notifOn") : t("settings.notifOff")) + '</div></div><button class="toggle ' + (DB.notifications ? "on" : "") + '" data-action="toggle-notif"><i></i></button></div>' +
          '<div style="height:1px;background:var(--border);margin:4px 0"></div>' +
          '<div class="switchrow" style="border:none"><div><div style="font-weight:500;font-size:14px">' + t("settings.reminders") + '</div><div class="txt-sm txt-muted">' + ((DB.reminder && DB.reminder.on) ? (DB.reminder.time || "18:00") : t("settings.notifOff")) + '</div></div><button class="toggle ' + ((DB.reminder && DB.reminder.on) ? "on" : "") + '" data-action="toggle-reminder"><i></i></button></div>' +
          ((DB.reminder && DB.reminder.on) ? '<div class="switchrow" style="border:none;border-top:1px solid var(--border)"><span class="txt-sm" style="font-weight:500">' + t("settings.reminderTime") + '</span><input class="field" type="time" style="width:auto" id="reminderTime" value="' + (DB.reminder.time || "18:00") + '"></div>' : "") +
          '<p class="txt-sm txt-muted" style="margin:6px 2px 0">' + t("settings.reminderNote") + "</p></div>" +

        '<div class="card" style="margin-top:14px"><div class="eyebrow" style="margin-bottom:12px">' + t("settings.study") + '</div>' +
          '<div class="txt-sm" style="font-weight:500;margin-bottom:8px">' + t("settings.dailyGoal") + '</div><div class="chip-row" style="margin-bottom:14px">' +
          [15, 30, 45, 60].map(function (g) { return '<button class="chip-sel ' + (DB.goalMin === g ? "on" : "") + '" data-action="set-goal" data-v="' + g + '">' + g + " min</button>"; }).join("") + "</div>" +
          '<div class="txt-sm" style="font-weight:500;margin-bottom:8px">' + t("settings.sessionLength") + '</div><div class="chip-row">' +
          ["short", "balanced", "long"].map(function (v) { return '<button class="chip-sel ' + (DB.sessionLength === v ? "on" : "") + '" data-action="set-slen" data-v="' + v + '">' + t("settings." + v) + "</button>"; }).join("") + "</div></div>" +

        '<div class="card" style="margin-top:14px;padding:6px 20px"><div class="divide">' +
          '<button class="list-row tap" style="width:100%" data-nav="plans"><span class="ic">' + icon("trophy", 17) + '</span><span class="gr"><span class="tt" style="font-weight:450;font-size:13.5px">' + t("menu.plans") + "</span></span><span class=\"ch\">" + icon("chevR", 16) + "</span></button>" +
          '<button class="list-row tap" style="width:100%" data-nav="policies"><span class="ic">' + icon("flag", 17) + '</span><span class="gr"><span class="tt" style="font-weight:450;font-size:13.5px">' + t("menu.policiesFull") + "</span></span><span class=\"ch\">" + icon("chevR", 16) + "</span></button>" +
          '<button class="list-row tap" style="width:100%" data-nav="landing"><span class="ic">' + icon("logout", 17) + '</span><span class="gr"><span class="tt" style="font-weight:450;font-size:13.5px">' + t("settings.signout") + "</span></span></button>" +
          '<button class="list-row tap" style="width:100%;color:var(--danger)" data-action="wipe-local"><span class="ic" style="color:var(--danger)">' + icon("trash", 17) + '</span><span class="gr"><span class="tt" style="font-weight:450;font-size:13.5px;color:var(--danger)">' + t("settings.deleteAccount") + "</span></span></button></div></div>" +
        '<p class="txt-sm txt-muted" style="text-align:center;margin-top:20px">' + t("settings.version") + "</p></div>";
    return chrome("profile", body);
  };

  /* ---- Zynqora Cloud — inicio de sesión (FASE F). Solo activo si Auth.enabled(). ---- */
  V.auth = function () {
    var body = topbar(t("auth.title"), { back: "settings", noAi: true });
    if (!Auth.enabled()) {
      return chrome("profile", body +
        '<div class="wrap" style="max-width:460px"><div class="empty" style="padding-top:36px"><div class="eic">' + icon("cloud", 22) + "</div>" +
        "<p>" + t("auth.noCloud") + '</p><button class="btn btn-primary btn-lg" style="margin-top:14px" data-nav="settings">' + t("set.cloud") + "</button></div></div>");
    }
    var sess = Auth.session();
    if (sess) {
      return chrome("profile", body +
        '<div class="wrap" style="max-width:460px"><div class="card"><div class="txt-sm txt-muted">' + t("auth.signedInAs") + '</div><div style="font-weight:600;margin-top:4px">' + esc((sess.user && sess.user.email) || "") + '</div>' +
        '<button class="btn btn-secondary btn-block" style="margin-top:14px" data-action="cloud-signout">' + t("auth.signout") + "</button></div></div>");
    }
    var mode = S.authMode === "signup" ? "signup" : "signin";
    return chrome("profile", body +
      '<div class="wrap" style="max-width:420px">' +
        '<div class="tabs" style="margin-bottom:16px"><button class="' + (mode === "signin" ? "on" : "") + '" data-action="auth-mode" data-v="signin">' + t("auth.signin") + '</button><button class="' + (mode === "signup" ? "on" : "") + '" data-action="auth-mode" data-v="signup">' + t("auth.signup") + "</button></div>" +
        (mode === "signup" ? '<label class="label">' + t("auth.name") + '</label><input class="field" id="authName" autocomplete="name">' : "") +
        '<label class="label"' + (mode === "signup" ? ' style="margin-top:10px"' : "") + '>' + t("auth.email") + '</label><input class="field" id="authEmail" type="email" autocomplete="email">' +
        '<label class="label" style="margin-top:10px">' + t("auth.password") + '</label><input class="field" id="authPass" type="password" autocomplete="' + (mode === "signup" ? "new-password" : "current-password") + '">' +
        '<div id="authErr"></div>' +
        '<button class="btn btn-primary btn-block btn-lg" style="margin-top:16px" data-action="auth-submit" data-v="' + mode + '">' + t(mode === "signup" ? "auth.signup" : "auth.signin") + "</button>" +
        (mode === "signin" ? '<button class="btn btn-ghost btn-block" style="margin-top:6px" data-action="auth-recover">' + t("auth.forgot") + "</button>" : "") +
        '<p class="txt-sm txt-muted" style="text-align:center;margin-top:14px">🔒 ' + t("set.aiKeyNote") + "</p>" +
      "</div>");
  };

  function profRow(ic, label, nav) {
    return '<button class="list-row tap" style="width:100%" data-nav="' + nav + '"><span class="ic">' + icon(ic, 17) + '</span><span class="gr"><span class="tt" style="font-weight:450;font-size:13.5px">' + label + '</span></span><span class="ch">' + icon("chevR", 16) + "</span></button>";
  }
  V.profile = function () {
    var body = topbar(t("prof.title"), { noAi: true, actions: '<button class="btn btn-ghost btn-sm" data-nav="settings">' + icon("edit", 14) + t("prof.settings") + "</button>" }) +
      '<div class="wrap" style="max-width:600px">' +
        '<div class="card card-lg"><div class="row" style="gap:16px"><span class="avatar-lg" style="background:' + avatarBg() + ";color:" + avatarColor() + '">' + avatarInner() + "</span>" +
          '<div style="flex:1;min-width:0"><div style="font-size:18px;font-weight:600;letter-spacing:-.01em">' + USER.name + "</div>" +
            '<div class="txt-sm txt-muted">' + userEmail() + '</div>' +
            '<div style="margin-top:6px">' + pill(planName() + (DB.plan !== "free" ? " ✨" : "")) + "</div></div></div>" +
          '<div class="row" style="gap:10px;margin-top:16px"><button class="btn btn-secondary btn-block" data-action="edit-photo">' + t("prof.editProfile") + '</button><button class="btn btn-primary btn-block" data-nav="plans">' + t("prof.managePlan") + "</button></div></div>" +

        '<div class="prof-stats">' +
          '<div class="prof-stat"><b>' + DB.streak + '</b><span>' + t("prof.statStreak") + "</span></div>" +
          '<div class="prof-stat"><b>' + DB.subjects.length + '</b><span>' + t("prof.statSubjects") + "</span></div>" +
          '<div class="prof-stat"><b>' + (planLimit("aiMessages") === Infinity ? usageOf("aiMessages") : Math.min(usageOf("aiMessages"), planLimit("aiMessages")) + " / " + planLimit("aiMessages")) + '</b><span>' + t("prof.statAi") + "</span></div></div>" +

        '<div class="card" style="margin-top:14px"><div class="between"><span class="h-sec">' + t("prof.monthlyUse") + "</span>" +
          (DB.plan === "free" ? '<button class="btn btn-primary btn-sm" data-nav="plans">' + t("plans.cta") + "</button>" : '<button class="btn btn-secondary btn-sm" data-nav="plans">' + t("plans.manage") + "</button>") + "</div>" +
          '<div class="usage-list" style="margin-top:16px">' + METER_ROWS.map(usageRow).join("") + "</div>" +
          '<p class="txt-sm txt-muted" style="margin-top:12px">' + t("usage.resets") + "</p></div>" +

        '<div class="card" style="margin-top:14px;padding:6px 20px"><div class="divide">' +
          profRow("book", t("nav.subjects"), "subjects") +
          profRow("calendar", t("nav.calendar"), "calendar") +
          profRow("chart", t("nav.progress"), "progress") +
          profRow("palette", t("prof.settings"), "settings") +
          profRow("trophy", t("menu.plans"), "plans") +
          profRow("flag", t("menu.policiesFull"), "policies") +
        "</div></div>" +
        '<button class="btn btn-ghost btn-block" style="margin-top:14px" data-nav="landing">' + icon("logout", 15) + t("settings.signout") + "</button>" +
        '<p class="txt-sm txt-muted" style="text-align:center;margin-top:14px">' + t("settings.version") + "</p>" +
      "</div>";
    return chrome("profile", body);
  };

  /* ---- State screens ---- */
  V["st-first"] = function () {
    var body = topbar(greeting() + ", " + USER.name) +
      '<div class="wrap"><div class="empty" style="padding-top:20px"><div class="eic">' + icon("upload", 24) + "</div>" +
        "<h3>" + t("states.firstTitle") + "</h3><p>" + t("states.firstSub") + "</p>" +
        '<button class="btn btn-primary btn-lg" style="margin-top:14px" data-nav="addMaterial">' + icon("plus", 15) + t("subject.addMaterial") + "</button></div>" +
        '<div class="card" style="margin-top:8px"><div class="eyebrow">' + t("states.howItWorks") + '</div><div style="margin-top:14px">' +
          [["hiw1"], ["hiw2"], ["hiw3"]].map(function (x, i) { return '<div class="an-step in ' + (i === 0 ? "active" : "") + '" style="opacity:1;transform:none"><span class="dot">' + (i + 1) + '</span><div><div class="tt">' + t("states." + x[0] + "t") + '</div><div class="txt-sm txt-muted">' + t("states." + x[0] + "d") + "</div></div></div>"; }).join("") + "</div></div></div>";
    return chrome("dashboard", body);
  };
  V["st-empty-notes"] = function () {
    var body = topbar(t("notes.title")) + '<div class="wrap"><div class="empty"><div class="eic">' + icon("notes", 24) + "</div><h3>" + t("notes.emptyTitle") + "</h3><p>" + t("notes.emptySub") + "</p>" +
      '<button class="btn btn-primary btn-lg" style="margin-top:14px" data-nav="addMaterial">' + icon("upload", 15) + t("notes.addMaterial") + "</button></div></div>";
    return chrome("notes", body);
  };
  V["st-allclear"] = function () {
    var body = topbar(t("study.title"), { back: "dashboard", noAi: true }) +
      '<div class="wrap"><div class="empty" style="padding-top:40px"><div class="eic" style="background:var(--good-soft);color:var(--good)">' + icon("check", 24) + "</div>" +
        "<h3>" + t("study.allClearTitle") + "</h3><p>" + t("study.allClearSub") + "</p>" +
        '<div class="row" style="gap:10px;margin-top:14px"><button class="btn btn-secondary" data-nav="dashboard">' + t("results.backPanel") + '</button><button class="btn btn-primary" data-nav="test">' + t("study.doTest") + "</button></div></div></div>";
    return chrome("dashboard", body, { noBottom: true });
  };
  V["st-error"] = function () {
    var body = topbar(t("nav.today")) + '<div class="wrap"><div class="empty" style="padding-top:44px"><div class="eic" style="background:var(--danger-soft);color:var(--danger)">' + icon("alert", 24) + "</div>" +
      "<h3>" + t("states.errorTitle") + "</h3><p>" + t("states.errorSub") + "</p>" +
      '<button class="btn btn-primary btn-lg" style="margin-top:14px" data-action="reload">' + icon("refresh", 15) + t("states.retry") + "</button></div></div>";
    return chrome("dashboard", body);
  };

  /* ---- Sheets ---- */
  function sheetHtml() {
    if (!S.sheet) return "";
    var inner = "";
    if (S.sheet.kind === "add-subject") {
      var col = S.sheet.color || "#B07D3C", ic = S.sheet.icon || "landmark";
      var colors = ["#B07D3C", "#5A54C9", "#3E8E6F", "#4B6FB0", "#A0506B", "#C0873C"];
      inner = "<h3>" + t("subjects.newTitle") + '</h3><p class="sub">' + t("subjects.newSub") + "</p>" +
        '<label class="label">' + t("ob.nameLabel") + '</label><input class="field" id="sheetName" placeholder="' + t("subjects.namePlaceholder") + '">' +
        '<label class="label" style="margin-top:16px">' + t("subjects.icon") + '</label><div class="icon-pick">' + SUBJECT_ICONS.map(function (n) { return '<button class="' + (n === ic ? "on" : "") + '" data-action="sheet-icon" data-v="' + n + '">' + icon(n, 18) + "</button>"; }).join("") + "</div>" +
        '<label class="label" style="margin-top:16px">' + t("subjects.color") + '</label><div class="color-pick">' + colors.map(function (c) { return '<button class="' + (c === col ? "on" : "") + '" style="background:' + c + ";color:" + c + '" data-action="sheet-color" data-v="' + c + '"></button>'; }).join("") + "</div>" +
        '<div class="row" style="gap:10px;margin-top:20px"><button class="btn btn-ghost btn-block" data-action="sheet-close">' + t("common.cancel") + '</button><button class="btn btn-primary btn-block" data-action="sheet-save-subject">' + t("common.save") + "</button></div>";
    } else if (S.sheet.kind === "add-task") {
      var d = S.sheet.date || (S.calSel || isoDate(addDays(0)));
      var ty = S.sheet.type || "study";
      var sid = S.sheet.subjectId || DB.currentSubjectId;
      var isEd = !!S.sheet.editId;
      inner = "<h3>" + t(isEd ? "cal.editTask" : "cal.newTask") + "</h3>" +
        '<label class="label">' + t("cal.taskTitle") + '</label><input class="field" id="taskTitle" value="' + esc(S.sheet.title || "") + '" placeholder="' + (DB.lang === "en" ? "Review chapter 3" : "Repasar el tema 3") + '">' +
        '<label class="label" style="margin-top:16px">' + t("cal.subject") + '</label><div class="chip-row">' + DB.subjects.map(function (x) { return '<button class="chip-sel ' + (x.id === sid ? "on" : "") + '" data-action="sheet-tsubj" data-v="' + x.id + '">' + L(x.name) + "</button>"; }).join("") + "</div>" +
        '<label class="label" style="margin-top:16px">' + t("cal.type") + '</label><div class="chip-row">' + ["exercise", "review", "study", "exam"].map(function (x) { return '<button class="chip-sel ' + (x === ty ? "on" : "") + '" data-action="sheet-ttype" data-v="' + x + '">' + taskTypeLabel(x) + "</button>"; }).join("") + "</div>" +
        '<label class="label" style="margin-top:16px">' + t("cal.descOpt") + '</label><textarea class="field" id="taskDesc" rows="2" placeholder="' + t("cal.descPh") + '">' + esc(S.sheet.desc || "") + '</textarea>' +
        '<div class="row" style="gap:12px;margin-top:16px"><div style="flex:1"><label class="label">' + t("cal.date") + '</label><input class="field" type="date" id="taskDate" value="' + d + '"></div>' +
        '<div style="flex:1"><label class="label">' + t("cal.time") + " (" + t("common.optional") + ')</label><input class="field" type="time" id="taskTime" value="' + esc(S.sheet.time || "") + '"></div></div>' +
        '<div class="row" style="gap:10px;margin-top:20px"><button class="btn btn-ghost btn-block" data-action="sheet-close">' + t("common.cancel") + '</button><button class="btn btn-primary btn-block" data-action="sheet-save-task">' + t("common.save") + "</button></div>";
    } else if (S.sheet.kind === "task") {
      var x = DB.calendar.filter(function (k) { return k.id === S.sheet.id; })[0];
      if (!x) return "";
      var tt = TASK_TYPE[x.type] || TASK_TYPE.study;
      inner = '<div class="row" style="gap:12px;margin-bottom:12px"><span class="tk" style="width:40px;height:40px;background:' + tt.c + "18;color:" + tt.c + '">' + icon(tt.ic, 18) + "</span>" +
        '<div><h3 style="margin:0">' + L(x.title) + '</h3><span class="sub" style="margin:0">' + taskTypeLabel(x.type) + " · " + L(subj(x.subjectId).name) + "</span></div></div>" +
        '<div class="divide"><div class="switchrow"><span class="txt-sm txt-muted">' + t("cal.date") + '</span><span class="txt-sm">' + new Date(x.date).toLocaleDateString(DB.lang === "en" ? "en-US" : "es-ES", { weekday: "long", day: "numeric", month: "long" }) + (x.time ? " · " + x.time : "") + "</span></div>" +
        (x.desc ? '<div style="padding:10px 0 2px"><span class="txt-sm txt-muted">' + t("cal.desc") + '</span><p class="txt-sm" style="margin:4px 0 0;white-space:pre-wrap">' + esc(x.desc) + "</p></div>" : "") + "</div>" +
        (S.sheet.confirmDelete
          ? '<div class="card" style="margin-top:14px;border-color:var(--danger);background:var(--danger-soft)">' +
              '<p class="txt-sm" style="margin:0 0 12px;color:var(--danger)">' + t("cal.deleteConfirm") + '</p>' +
              '<div class="row" style="gap:10px"><button class="btn btn-ghost btn-block" data-action="task-delete-cancel">' + t("common.cancel") + '</button>' +
              '<button class="btn btn-block" style="background:var(--danger);color:#fff" data-action="task-delete-confirm" data-id="' + x.id + '">' + t("cal.delete") + "</button></div></div>"
          : (x.type === "exam" ? '<button class="btn btn-secondary btn-block" style="margin-top:14px" data-action="go-plan" data-exam="' + x.id + '">' + icon("wand", 15) + t("cal.prepPlan") + "</button>" : "") +
            '<div class="row" style="gap:10px;margin-top:14px"><button class="btn btn-ghost btn-block" data-action="task-edit" data-id="' + x.id + '">' + icon("edit", 14) + t("cal.edit") + '</button><button class="btn btn-primary btn-block" data-action="task-toggle" data-id="' + x.id + '">' + (x.done ? t("cal.markUndone") : t("cal.markDone")) + "</button></div>" +
            '<button class="btn btn-ghost btn-block" style="margin-top:8px;color:var(--danger)" data-action="task-delete" data-id="' + x.id + '">' + icon("trash", 14) + t("cal.delete") + "</button>");
    } else if (S.sheet.kind === "personalize") {
      var row = function (k, key) { return '<div class="switchrow" style="border:none;padding:11px 0"><span style="font-size:14px;font-weight:450">' + t(key) + '</span><button class="toggle ' + (S.sheet[k] ? "on" : "") + '" data-action="sheet-ptoggle" data-v="' + k + '"><i></i></button></div>'; };
      inner = "<h3>" + t("study.pTitle") + '</h3><p class="sub">' + t("study.pSub") + "</p>" +
        '<div class="divide">' + row("more", "study.pMore") + row("shorter", "study.pShorter") + row("test", "study.pTest") + "</div>" +
        '<div class="row" style="gap:10px;margin-top:18px"><button class="btn btn-ghost btn-block" data-action="sheet-close">' + t("common.cancel") + '</button><button class="btn btn-primary btn-block" data-action="sheet-papply">' + t("study.pApply") + "</button></div>";
    } else if (S.sheet.kind === "photo") {
      var pv = (S.sheet.name != null) ? S.sheet.name : (DB.profile && DB.profile.name) || USER.name;
      var pe = (S.sheet.email != null) ? S.sheet.email : (DB.profile && DB.profile.email) || "";
      inner = "<h3>" + t("profile.editTitle") + '</h3><p class="sub">' + t("profile.editSub") + "</p>" +
        '<div style="display:flex;justify-content:center;margin:8px 0 14px"><span class="avatar-lg" style="width:76px;height:76px;font-size:26px;background:' + avatarBg() + ";color:" + avatarColor() + '">' + avatarInner() + "</span></div>" +
        '<label class="label">' + t("profile.nameLabel") + '</label><input class="field" id="profName" value="' + esc(pv) + '">' +
        '<label class="label" style="margin-top:14px">' + t("profile.emailLabel") + '</label><input class="field" id="profEmail" type="email" value="' + esc(pe) + '" placeholder="tu@email.com">' +
        '<p class="chat-note" style="margin-top:6px">' + t("profile.emailNote") + "</p>" +
        '<label class="label" style="margin-top:14px">' + t("profile.photoSection") + '</label>' +
        '<div class="avatar-presets" style="justify-content:center">' + AVATAR_PRESETS.map(function (c) { return '<button class="' + (DB.avatar === c ? "on" : "") + '" style="background:' + c + '" data-action="photo-preset" data-v="' + c + '">' + USER.initial + "</button>"; }).join("") + "</div>" +
        '<button class="btn btn-secondary btn-block" style="margin-top:12px" data-action="photo-pick">' + icon("image", 15) + t("profile.choosePhoto") + '</button><input type="file" id="photoInput" accept="image/*" style="display:none">' +
        '<div class="row" style="gap:10px;margin-top:16px"><button class="btn btn-ghost btn-block" data-action="sheet-close">' + t("common.cancel") + '</button><button class="btn btn-primary btn-block" data-action="save-profile">' + t("common.save") + "</button></div>";
    } else if (S.sheet.kind === "premium") {
      var f = function (n) { return '<div class="premium-feat">' + icon("check", 16) + "<div><b>" + t("premium.f" + n + "t") + "</b><span>" + t("premium.f" + n + "d") + "</span></div></div>"; };
      inner = '<div class="row" style="gap:11px;margin-bottom:10px"><span class="zmk" style="width:36px;height:36px;border-radius:10px;background:var(--accent);color:#fff;display:grid;place-items:center">' + icon("trophy", 17) + "</span>" +
        '<div><h3 style="margin:0">' + t("premium.title") + '</h3><span class="sub" style="margin:0">' + t("premium.sub") + "</span></div></div>" +
        '<div class="divide">' + f(1) + f(2) + f(3) + f(4) + "</div>" +
        '<button class="btn btn-primary btn-block btn-lg" style="margin-top:16px" data-action="go-plans-sheet">' + t("up.seeAll") + "</button>" +
        '<p class="chat-note" style="margin-top:10px">' + t("proto.demoNote") + "</p>";
    } else if (S.sheet.kind === "upgrade") {
      var uf = S.sheet.feature;
      var uLine = uf === "subjects"
        ? t("up.subjectsUsed", { limit: PLANS.free.limits.subjects }) + " " + t("up.subjectsOffer", { n: PLANS.plus.limits.subjects })
        : t("up.usedFeature", { limit: PLANS.free.limits[uf], feature: t("short." + uf) }) + " " + t("up.plusOffer", { n: PLANS.plus.limits[uf], feature: t("short." + uf) });
      inner = '<div class="up-ic">' + icon("lightning", 22) + "</div>" +
        "<h3>" + t("up.title") + "</h3>" +
        '<p class="sub" style="margin-bottom:12px">' + uLine + "</p>" +
        (uf !== "subjects" ? '<div style="margin-bottom:14px">' + usageRow(uf) + "</div>" : "") +
        '<p class="txt-sm txt-muted" style="margin-bottom:16px">' + t("up.body") + "</p>" +
        '<button class="btn btn-primary btn-block btn-lg" data-action="upgrade-plus">' + t("up.toPlus") + "</button>" +
        '<button class="btn btn-secondary btn-block" style="margin-top:8px" data-action="upgrade-see">' + t("up.seeAll") + "</button>" +
        '<button class="btn btn-ghost btn-block" style="margin-top:4px" data-action="sheet-close">' + t("up.notNow") + "</button>";
    } else if (S.sheet.kind === "feature") {
      var xf = S.sheet.feature;
      var tk = xf === "podcasts" ? "fm.podcastT" : xf === "presentations" ? "fm.presentationT" : xf === "conceptMaps" ? "fm.conceptMapT" : "fm.personalizationT";
      var dk = xf === "podcasts" ? "fm.podcastD" : xf === "presentations" ? "fm.presentationD" : xf === "conceptMaps" ? "fm.conceptMapD" : "fm.personalizationD";
      var em = xf === "podcasts" ? "🎙️" : xf === "presentations" ? "🎞️" : xf === "conceptMaps" ? "🗺️" : "🎨";
      inner = '<div class="up-ic">' + em + "</div>" +
        "<h3>" + t(tk) + "</h3>" +
        '<p class="sub" style="margin-bottom:6px">' + t("fm.availPlus") + "</p>" +
        '<p class="txt-sm txt-muted" style="margin-bottom:16px">' + t(dk) + "</p>" +
        '<button class="btn btn-primary btn-block btn-lg" data-action="upgrade-plus">' + t("fm.toPlus") + "</button>" +
        '<button class="btn btn-secondary btn-block" style="margin-top:8px" data-action="upgrade-see">' + t("fm.seePlans") + "</button>" +
        '<button class="btn btn-ghost btn-block" style="margin-top:4px" data-action="sheet-close">' + t("common.close") + "</button>";
    } else if (S.sheet.kind === "confirm") {
      inner = '<div class="up-ic" style="background:var(--danger-soft);color:var(--danger)">' + icon("alert", 20) + "</div>" +
        "<h3>" + esc(S.sheet.title) + '</h3><p class="sub" style="margin-bottom:16px">' + esc(S.sheet.body) + "</p>" +
        '<button class="btn btn-block btn-lg" style="background:var(--danger);color:#fff" data-action="confirm-yes">' + esc(S.sheet.confirmLabel || t("cal.delete")) + "</button>" +
        '<button class="btn btn-ghost btn-block" style="margin-top:6px" data-action="sheet-close">' + t("common.cancel") + "</button>";
    }
    return '<div class="sheet-overlay" data-action="sheet-close"><div class="sheet" data-stop="1">' + inner + "</div></div>";
  }

  /* ================= RENDER / NAV / EVENTS ================= */
  function render(soft) {
    var fn = V[S.screen] || V.landing;
    if (["document", "notes", "study", "analysis", "addMaterial", "subject", "calendar", "plan"].indexOf(S.screen) < 0 && S.screen.indexOf("st-") !== 0) S.variant = null;
    var aiConv = S.screen === "ai" && !S.convListView && (S.convId || AI_CTX);
    scroll.classList.toggle("lockscroll", !!aiConv);
    scroll.innerHTML = '<div class="view' + (soft ? "" : " view-enter") + '">' + fn() + "</div>" + sheetHtml();
    if (!aiConv) scroll.scrollTop = 0;
    buildMenu();
    afterRender();
  }
  function afterRender() {
    var cs = document.getElementById("chatScroll");
    if (cs) cs.scrollTop = cs.scrollHeight;
    var ta = document.getElementById("aiInput");
    if (ta) {
      ta.addEventListener("input", function () { ta.style.height = "auto"; ta.style.height = Math.min(96, ta.scrollHeight) + "px"; });
      ta.addEventListener("keydown", function (e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); aiSend(); } });
    }
    var fi = document.getElementById("fileInput");
    if (fi) fi.addEventListener("change", function () {
      if (fi.files && fi.files[0]) { pickFile(fi.files[0]); }
    });
    var dz = document.getElementById("dropzone");
    if (dz) {
      dz.addEventListener("dragover", function (e) { e.preventDefault(); dz.classList.add("hot"); });
      dz.addEventListener("dragleave", function () { dz.classList.remove("hot"); });
      dz.addEventListener("drop", function (e) {
        e.preventDefault(); dz.classList.remove("hot");
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) pickFile(e.dataTransfer.files[0]);
      });
    }
    var afi = document.getElementById("aiFileInput");
    if (afi) afi.addEventListener("change", function () {
      if (afi.files && afi.files[0]) { AI_ATTACH = { name: afi.files[0].name, type: "pdf" }; S.attachMenu = 0; render(true); }
    });
    var pfi = document.getElementById("photoInput");
    if (pfi) pfi.addEventListener("change", function () {
      var f = pfi.files && pfi.files[0]; if (!f) return;
      var keepOpen = S.sheet && S.sheet.kind === "photo";
      if (keepOpen) keepProfileSheet();
      try {
        var rd = new FileReader();
        rd.onload = function () { setAvatar(String(rd.result)); if (!keepOpen) S.sheet = null; render(keepOpen); toast(t("profile.photoSaved")); };
        rd.readAsDataURL(f);
      } catch (e) { setAvatar(AVATAR_PRESETS[1]); if (!keepOpen) S.sheet = null; render(keepOpen); }
    });
    var fib = document.getElementById("fibInput");
    if (fib) {
      fib.focus();
      fib.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); var b = document.querySelector('[data-action="fib-check"],[data-action="fib-next"]'); if (b) b.click(); } });
    }
    if (S.screen === "analysis" && S.analysisStep < 4 && !S.analysisRunning) runAnalysis();

    var scrub = document.getElementById("podScrub");
    if (scrub) scrub.addEventListener("click", function (e) {
      var r = scrub.getBoundingClientRect();
      var frac = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      var sc = podScript(), tgt = frac * sc.dur, line = 0;
      for (var i = 0; i < sc.segments.length; i++) if (tgt >= sc.segments[i].t) line = i;
      podSeekLine(line);
    });
    var podVol = document.getElementById("podVol");
    if (podVol) podVol.addEventListener("input", function () {
      var v = parseFloat(podVol.value);
      S.podVol = v;
      var svg = podVol.parentNode.querySelector("svg");
      if (svg) svg.outerHTML = icon(v <= 0.001 ? "volumeOff" : "volume", 16);
    });
    var aiEp = document.getElementById("aiEndpoint");
    if (aiEp) aiEp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); var b = document.querySelector('[data-action="ai-connect"]'); if (b) b.click(); } });
    var remT = document.getElementById("reminderTime");
    if (remT) remT.addEventListener("change", function () {
      if (!DB.reminder) DB.reminder = { on: true, time: "18:00" };
      DB.reminder.time = remT.value || "18:00"; persist("state"); render(true);
    });
    var ptrOn = document.querySelector("#ptrScroll .ptr-line.on");
    if (ptrOn) { var psc = document.getElementById("ptrScroll"); if (psc) psc.scrollTop = Math.max(0, ptrOn.offsetTop - psc.offsetTop - 74); }

    /* --- validación en vivo de campos obligatorios --- */
    [["sheetName", '[data-action="sheet-save-subject"]'],
     ["taskTitle", '[data-action="sheet-save-task"]'],
     ["obNewName", '[data-action="ob-next"]'],
     ["profName", '[data-action="save-profile"]']
    ].forEach(function (pair) {
      var el = document.getElementById(pair[0]); if (!el) return;
      var btn = document.querySelector(pair[1]);
      var sync = function () {
        var empty = !el.value.trim();
        if (btn) btn.disabled = empty;
        if (!empty) { el.classList.remove("invalid"); var e0 = el.parentNode.querySelector(".field-err"); if (e0) e0.remove(); }
      };
      el.addEventListener("input", sync);
      sync();
    });
  }
  function keepProfileSheet() {
    if (!S.sheet) return;
    var n = document.getElementById("profName"), e = document.getElementById("profEmail");
    if (n) S.sheet.name = n.value;
    if (e) S.sheet.email = e.value;
  }
  function saveProfile() {
    var n = ((document.getElementById("profName") || {}).value || "").trim();
    var em = ((document.getElementById("profEmail") || {}).value || "").trim();
    if (!n) { fieldError("profName", t("err.profName")); return; }
    if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { fieldError("profEmail", t("err.badEmail")); return; }
    if (!DB.profile) DB.profile = { id: "u" + Math.random().toString(36).slice(2, 9) };
    DB.profile.name = n; DB.profile.email = em;
    syncUser(); persist("profile");
    S.sheet = null; render(); toast(t("profile.saved"));
  }
  function busy(key, ms) {
    var now = Date.now();
    if (!S._busyAt) S._busyAt = {};
    if (S._busyAt[key] && now - S._busyAt[key] < (ms || 1400)) return true;
    S._busyAt[key] = now;
    return false;
  }
  function keepTaskSheet() {
    if (!S.sheet) return;
    var g = function (id) { var e = document.getElementById(id); return e ? e.value : undefined; };
    var v;
    if ((v = g("taskTitle")) !== undefined) S.sheet.title = v;
    if ((v = g("taskDesc")) !== undefined) S.sheet.desc = v;
    if ((v = g("taskDate")) !== undefined) S.sheet.date = v;
    if ((v = g("taskTime")) !== undefined) S.sheet.time = v;
  }
  function fieldError(id, msg) {
    var el = document.getElementById(id); if (!el) return;
    el.classList.add("invalid");
    if (!el.parentNode.querySelector(".field-err")) {
      var e0 = document.createElement("div"); e0.className = "field-err"; e0.textContent = msg;
      el.parentNode.insertBefore(e0, el.nextSibling);
    }
    el.focus();
  }

  function runAnalysis() {
    if (S.analysisRunning) return;
    S.analysisRunning = 1;
    S.analysisStep = 0;
    var startT = Date.now();
    var rec = docById(S.docId);
    var pending = S._ingestPromise || Promise.resolve();
    var finished = false;
    var settle = function () {
      if (finished) return; finished = true;
      S.analysisRunning = 0; S.analysisStep = 4;
      if (rec) {
        if (rec.status === "processing") rec.status = docHasText(rec) ? "analyzed" : (rec.image ? "pending" : "failed");
        if (docHasText(rec)) docEnsureAnalysis(rec);
      }
      persist("documents");
      if (S.screen === "analysis") render(true);
    };
    var tick = function () {
      if (S.screen !== "analysis") { S.analysisRunning = 0; return; }
      if (S.analysisStep < 3) { S.analysisStep++; render(true); setTimeout(tick, 620); return; }
      render(true);
      pending.then(function () {
        setTimeout(settle, Math.max(0, 1300 - (Date.now() - startT)));
      }, function () { setTimeout(settle, 300); });
    };
    setTimeout(tick, 450);
  }

  function go(screen) {
    if (screen !== "toolFlow") { podStop(); S.presMode = 0; }
    if (screen === "flashcards") { S.fcIndex = 0; S.fcFlipped = 0; S.fcKnown = 0; S.fcAgain = 0; }
    if (screen === "test") { S.qIndex = 0; S.qPicked = null; S.qAnswered = 0; S.qScore = 0; }
    if (screen === "fillblank") { S.fibIndex = 0; S.fibChecked = 0; S.fibVal = ""; }
    if (screen === "onboarding") { S.ob = 0; S.obSource = null; S.obGoals = []; S.obLevel = null; S.obFirst = null; }
    if (screen === "analysis") { S.analysisStep = 4; S.analysisRunning = 0; }
    if (screen === "addMaterial") { S.addType = null; S.addPick = null; S.addFile = null; }
    if (["flashcards", "test", "results", "fc-done"].indexOf(screen) < 0) S.reviewDoc = null;
    if (screen === "document") { S.docSubjPop = null; }
    if (screen === "dashboard") S.dashFirst = 0;
    if (screen === "calendar" && !S.calMonth) S.calMonth = new Date();
    if (screen === "ai") { AI_CTX = null; S.convId = null; S.convListView = 1; S.attachMenu = 0; AI_ATTACH = null; S.ctxPop = 0; }
    if (["dashboard", "subject", "subjects", "notes", "calendar", "progress", "profile", "ai", "document", "results", "plans", "checkout", "checkoutDone", "policies", "aitools"].indexOf(screen) > -1) S._fromPath = null;
    S.screen = screen;
    render();
  }

  /* ---- AI ---- */
  var TUTOR_INTENT = { "ai.tSimple": "simple", "ai.tExample": "example", "ai.tQuiz": "quiz", "ai.tDeeper": "detailed" };
  function newGreetConv(contextId) {
    var c = { id: uid(), contextId: contextId === CTX_NONE ? null : (contextId === undefined ? DB.currentSubjectId : contextId), updated: Date.now(),
      messages: [{ role: "ai", html: (ZAI.hello[DB.lang] || ZAI.hello.es), tutor: false }] };
    DB.conversations.push(c); persist("conversations"); return c;
  }
  function ensureConv() {
    if (S.convId) { var e = DB.conversations.filter(function (c) { return c.id === S.convId; })[0]; if (e) return e; }
    var c = newGreetConv(); S.convId = c.id; return c;
  }
  var VAGUE_RE = /^\W*(s[ií]|no|claro|vale|ok|okay|examen|para (el|un) examen|el examen|ejercicio|un ejercicio|la general|general|entender|entenderlo|todo|ambos|the exam|for the exam|an exercise|understand it|both|everything)\W*$/i;

  /* ---------- contexto conversacional: hilo del chat + follow-ups ---------- */
  function ensureThread(c) {
    if (!c.thread) c.thread = { subjectId: null, topic: null, lastIntent: null, exercise: null, steps: [] };
    return c.thread;
  }
  function isFollowup(text) {
    var s = (text || "").toLowerCase().trim();
    if (!s || s.length > 64) return false;
    return /^(otr[oa]s?|otr[oa]|un[oa]? m[aá]s|un[oa]? parecid[oa]?|dame otr|ponme otr|h[aá]zme otr|m[aá]s dif[ií]cil|m[aá]s f[aá]cil|m[aá]s sencill[oa]|sube (el|la) (nivel|dificultad)|baja (el|la) (nivel|dificultad)|corr[ií]ge(me)?|corrige|expl[ií]came? (el|ese|mi|los?) (error|fallo|paso|pasos)|explica (el|ese|mi) (error|fallo|paso)|no (lo )?entiendo|no me queda claro (el|ese) paso|(el |ese )?(primer|segundo|tercer|cuarto|quinto|[uú]ltimo) paso|(el )?paso \d+|s[ií]gue|contin[uú]a|continua|siguiente|another( one)?|one more|one like (that|it)|(a bit )?(harder|easier|simpler|more difficult)|make it (harder|easier)|correct me|check (my|this|that|it)|is (this|that|it) (right|correct)|explain (the|my|that) (error|mistake|step)|i don'?t (get|understand)|which step|step \d+|keep going|go on|next( one)?)\b/i.test(s);
  }
  function tierLabel(tier) {
    var L2 = { easy: { es: "fácil", en: "easy" }, med: { es: "nivel medio", en: "medium" }, hard: { es: "difícil", en: "hard" } };
    return (L2[tier] || L2.med)[DB.lang === "en" ? "en" : "es"];
  }
  function serveExercise(c, sid, tier, idx) {
    var bank = exBank(sid);
    if (!bank) return null;
    if (!bank[tier]) tier = "med";
    var list = bank[tier];
    idx = ((idx % list.length) + list.length) % list.length;
    var ex = list[idx];
    var th = ensureThread(c);
    th.subjectId = sid;
    th.exercise = { subjectId: sid, tier: tier, idx: idx, q: ex.q, steps: (ex.steps || []).slice(), a: ex.a };
    th.steps = (ex.steps || []).slice();
    th.lastAnswer = null;
    var en = DB.lang === "en";
    var head = (en ? "Exercise" : "Ejercicio") + " (" + tierLabel(tier) + ") 👇";
    var foot = en
      ? 'Send me your answer and I\'ll check it — or say "another", "harder" or "easier".'
      : 'Mándame tu respuesta y la corrijo — o dime "otro", "más difícil" o "más fácil".';
    return { html: "<p>" + head + "</p><p><strong>" + esc(ex.q) + '</strong></p><p class="ai-followup">' + foot + "</p>", tutor: true };
  }
  var CMD_INTENTS = ["exercise", "flashcard", "quiz", "greet", "thanks", "explain", "simple", "example", "summarize", "compare", "help_exercise", "prep_exam", "plan", "detailed", "why_failed", "improve"];
  function looksLikeAnswer(tx) {
    if (!tx || isFollowup(tx)) return false;
    return CMD_INTENTS.indexOf(ZAI.match(tx)) < 0;
  }
  function lastUserAnswer(c) {
    var th = c.thread;
    if (th && th.lastAnswer) return th.lastAnswer;
    // el hilo sigue el ejercicio activo: si no hay respuesta registrada, es que aún no ha respondido
    if (th && (th.exercise || th.docEx)) return null;
    for (var i = c.messages.length - 1; i >= 0; i--) {
      var m = c.messages[i];
      if (m.role === "user") {
        var tx = (L(m.text) || "").trim();
        if (looksLikeAnswer(tx)) return tx;
      }
    }
    return null;
  }
  function gradeExercise(c) {
    var th = ensureThread(c), ex = th.exercise;
    if (!ex) return null;
    var en = DB.lang === "en";
    var ans = lastUserAnswer(c);
    var sol = "<p><strong>" + esc(ex.q) + "</strong></p>" +
      (ex.steps && ex.steps.length ? "<ol>" + ex.steps.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ol>" : "") +
      "<p>" + (en ? "Answer: " : "Respuesta: ") + "<strong>" + esc(ex.a) + "</strong></p>";
    var cmp = ans
      ? '<p class="ai-followup">' + (en ? "You wrote: “" + esc(ans.slice(0, 160)) + "”. Compare it step by step with the above — where does it first diverge?" : "Escribiste: «" + esc(ans.slice(0, 160)) + "». Compárala paso a paso con lo de arriba: ¿en qué paso se separa?") + "</p>"
      : '<p class="ai-followup">' + (en ? "Send me your attempt and I'll point out exactly where it goes wrong." : "Mándame tu intento y te señalo dónde falla exactamente.") + "</p>";
    return { html: sol + cmp, tutor: true };
  }
  function demoFollowup(c, text) {
    var th = ensureThread(c);
    var s = (text || "").toLowerCase();
    var en = DB.lang === "en";
    var TIERS = ["easy", "med", "hard"];

    // "no entiendo el paso 2" / "el paso 2" / "segundo paso" / "step 2"
    var stepN = null;
    var m = s.match(/paso\s+(\d+)|step\s+(\d+)/);
    if (m) stepN = parseInt(m[1] || m[2], 10);
    else {
      var ord = s.match(/\b(primer|segundo|tercer|cuarto|quinto|first|second|third|fourth|fifth)\b/);
      if (ord && /paso|step/.test(s)) stepN = { primer: 1, segundo: 2, tercer: 3, cuarto: 4, quinto: 5, first: 1, second: 2, third: 3, fourth: 4, fifth: 5 }[ord[1]];
    }
    if (stepN != null) {
      var steps = th.steps || [];
      if (!steps.length) return null; // sin pasos guardados → deja pasar a la respuesta normal
      var stp = steps[stepN - 1];
      if (!stp) return { html: "<p>" + (en ? "That has " + steps.length + " steps. Which one (1–" + steps.length + ")?" : "Eso tiene " + steps.length + " pasos. ¿Cuál (1–" + steps.length + ")?") + "</p>", tutor: true };
      var nxt = steps[stepN] ? '<p class="ai-followup">' + (en ? "Then step " : "Después, paso ") + (stepN + 1) + ": " + esc(steps[stepN]) + "</p>" : '<p class="ai-followup">' + (en ? "That was the last step." : "Ese era el último paso.") + "</p>";
      return { html: "<p>" + (en ? "Step " : "Paso ") + stepN + ":</p><p>" + esc(stp) + "</p>" + nxt, tutor: true };
    }

    if (th.exercise) {
      var ex = th.exercise, ti = TIERS.indexOf(ex.tier);
      if (/m[aá]s dif[ií]cil|harder|more difficult|sube (el|la) (nivel|dificultad)|make it harder/.test(s)) {
        if (ti >= 2) { var r1 = serveExercise(c, ex.subjectId, "hard", ex.idx + 1); return { html: "<p>" + (en ? "Already at the hardest level — here's another one:" : "Ya es el nivel más alto; te pongo otro:") + "</p>" + r1.html, tutor: true }; }
        return serveExercise(c, ex.subjectId, TIERS[ti + 1], 0);
      }
      if (/m[aá]s f[aá]cil|m[aá]s sencill|easier|simpler|baja (el|la) (nivel|dificultad)|make it easier/.test(s)) {
        if (ti <= 0) { var r2 = serveExercise(c, ex.subjectId, "easy", ex.idx + 1); return { html: "<p>" + (en ? "Already at the easiest level — here's another one:" : "Ya es el nivel más fácil; te pongo otro:") + "</p>" + r2.html, tutor: true }; }
        return serveExercise(c, ex.subjectId, TIERS[ti - 1], 0);
      }
      if (/otr[oa]|un[oa]? m[aá]s|parecid|another|one more|one like|siguiente|next/.test(s)) {
        return serveExercise(c, ex.subjectId, ex.tier, ex.idx + 1);
      }
      if (/corr[ií]ge|corrige|correct me|check (my|this|that|it)|is (this|that|it) (right|correct)|expl[ií]ca.*(error|fallo|mistake)|explain (the |my |that )?(error|mistake)|soluci[oó]n|solution|resu[eé]lve(lo)?|solve it/.test(s)) {
        return gradeExercise(c);
      }
    }

    if (/^(s[ií]gue|contin[uú]a|continua|keep going|go on|next( one)?|siguiente)\b/.test(s)) {
      if (th.exercise) return serveExercise(c, th.exercise.subjectId, th.exercise.tier, th.exercise.idx + 1);
      return null;
    }
    return null;
  }
  function extractSteps(html) {
    var out = [];
    var li = String(html || "").match(/<li>([\s\S]*?)<\/li>/g);
    if (li && li.length >= 2) {
      li.forEach(function (x) { out.push(x.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()); });
      return out;
    }
    var m = String(html || "").replace(/<br\s*\/?>/g, "\n").match(/(?:^|\n)\s*\d+\s*[·.)]\s*([^\n]+)/g);
    if (m && m.length >= 2) m.forEach(function (x) { out.push(x.replace(/^\s*\n?\s*\d+\s*[·.)]\s*/, "").replace(/<[^>]+>/g, "").trim()); });
    return out;
  }

  function aiPush(role, payload, attach) {
    var c = ensureConv();
    if (role === "user") c.messages.push({ role: "user", text: { es: payload, en: payload }, attach: attach || null });
    else if (role === "system") c.messages.push({ role: "system", text: { es: payload, en: payload } });
    else if (typeof payload === "object") c.messages.push({ role: "ai", html: payload.html, quiz: payload.quiz || null, tutor: !!payload.tutor, sources: payload.sources || null });
    else c.messages.push({ role: "ai", html: payload });
    c.updated = Date.now();
    persist("conversations");
  }
  function docRespond(c, text, intent) {
    var th = ensureThread(c);
    var d = docById(c.docId || th.docId);
    if (!d || !docHasText(d)) return null;
    var en = DB.lang === "en", s = (text || "").toLowerCase();
    var TIERS = ["easy", "med", "hard"];
    var wantsEx = intent === "exercise" || (!intent && ZAI.match(text) === "exercise" && !isFollowup(text));
    function bank(tier) {
      if (!th.docExBank) th.docExBank = {};
      if (!th.docExBank[tier] || !th.docExBank[tier].length) th.docExBank[tier] = DocGen.exercises(d.text, tier);
      return th.docExBank[tier];
    }
    function serve(tier, idx) {
      if (TIERS.indexOf(tier) < 0) tier = "med";
      var list = bank(tier);
      if (!list.length) return null;
      idx = ((idx % list.length) + list.length) % list.length;
      th.docEx = { tier: tier, idx: idx, q: list[idx].q, a: list[idx].a };
      th.lastIntent = "exercise";
      return { html: "<p>" + (en ? "Exercise (from your document · " : "Ejercicio (de tu documento · ") + tierLabel(tier) + ") 👇</p><p><strong>" + esc(list[idx].q) + '</strong></p><p class="ai-followup">' + (en ? 'Say "another", "harder", "easier" or "correct me".' : 'Dime "otro", "más difícil", "más fácil" o "corrígeme".') + "</p>", tutor: true };
    }
    if (!intent && isFollowup(text) && th.docEx) {
      var ti = TIERS.indexOf(th.docEx.tier);
      if (/m[aá]s dif[ií]cil|harder|more difficult/.test(s)) return serve(TIERS[Math.min(2, ti + 1)], ti >= 2 ? th.docEx.idx + 1 : 0);
      if (/m[aá]s f[aá]cil|m[aá]s sencill|easier|simpler/.test(s)) return serve(TIERS[Math.max(0, ti - 1)], ti <= 0 ? th.docEx.idx + 1 : 0);
      if (/otr[oa]|another|one more|parecid|siguiente|next/.test(s)) return serve(th.docEx.tier, th.docEx.idx + 1);
      if (/corr[ií]ge|corrige|correct me|soluci[oó]n|solution|resu[eé]lve/.test(s)) {
        var ans = lastUserAnswer(c);
        return { html: "<p><strong>" + esc(th.docEx.q) + "</strong></p>" + (th.docEx.a ? "<p>" + (en ? "The document says: " : "El documento dice: ") + "“" + esc(th.docEx.a) + "”</p>" : "") + '<p class="ai-followup">' + (ans ? (en ? "You wrote: “" + esc(ans.slice(0, 140)) + "”. Compare it with the passage above." : "Escribiste: «" + esc(ans.slice(0, 140)) + "». Compáralo con el fragmento de arriba.") : (en ? "Send me your attempt and I'll compare it with the document." : "Mándame tu intento y lo comparo con el documento.")) + "</p>", tutor: true };
      }
      if (/no (lo )?entiendo|expl[ií]came|explain/.test(s) && th.docEx.a) return { html: "<p>" + (en ? "Here's the relevant passage from the document:" : "Este es el fragmento relevante del documento:") + "</p><blockquote>" + esc(th.docEx.a) + "</blockquote>", tutor: true };
      return null;
    }
    if (wantsEx) {
      var tier = /dif[ií]cil|hard/.test(s) ? "hard" : /f[aá]cil|easy|sencill/.test(s) ? "easy" : (th.docEx ? th.docEx.tier : "med");
      return serve(tier, th.docEx ? th.docEx.idx + 1 : 0);
    }
    if (isFollowup(text)) return null;
    if (th.docEx && looksLikeAnswer(text)) {
      th.lastAnswer = text;
      return { html: "<p><strong>" + esc(th.docEx.q) + "</strong></p>" + (th.docEx.a ? "<p>" + (en ? "The document says: " : "El documento dice: ") + "“" + esc(th.docEx.a) + "”</p>" : "") + '<p class="ai-followup">' + (en ? "You wrote: “" + esc(text.slice(0, 140)) + "”. Compare it with the passage above." : "Escribiste: «" + esc(text.slice(0, 140)) + "». Compáralo con el fragmento de arriba.") + "</p>", tutor: true };
    }
    return DocGen.answer(d.text, text);
  }
  function aiRespond(text, intent) {
    AI_TYPING = true; render(true);
    var c = ensureConv();
    var th = ensureThread(c);
    var q = text, useIntent = intent;

    // --- modo demo: chat anclado a un documento (contenido real extraído) ---
    if (!aiIsReal() && (c.docId || th.docId)) {
      var dr = docRespond(c, text, intent);
      if (dr) {
        setTimeout(function () {
          AI_TYPING = false;
          if (dr.tutor && th.docEx) th.lastIntent = th.lastIntent || "followup";
          aiPush("ai", dr);
          persist("conversations");
          render(true);
        }, 560);
        return;
      }
    }

    // --- modo demo: resolver follow-ups contra el hilo de la conversación ---
    if (!aiIsReal()) {
      var vagueEx = !intent && c._lastQ && VAGUE_RE.test(text) && /ejercicio|exercise/i.test(text);
      var wantsEx = intent === "exercise" || vagueEx || (!intent && ZAI.match(text) === "exercise" && !isFollowup(text));
      if (!intent && isFollowup(text)) {
        var fu = demoFollowup(c, text);
        if (fu) {
          setTimeout(function () {
            AI_TYPING = false;
            th.lastIntent = "followup";
            aiPush("ai", fu);
            persist("conversations");
            render(true);
          }, 560);
          return;
        }
      }
      // ejercicio activo + el usuario manda una respuesta libre → califícala
      if (!intent && !wantsEx && !isFollowup(text) && th.exercise && looksLikeAnswer(text)) {
        var g = gradeExercise(c);
        if (g) {
          setTimeout(function () {
            AI_TYPING = false;
            th.lastIntent = "followup";
            aiPush("ai", g);
            persist("conversations");
            render(true);
          }, 600);
          return;
        }
      }
      if (wantsEx) {
        var sidE = ZAI.detectSubject(text) || th.subjectId || convCtx(c) || DB.currentSubjectId;
        var tierE = /dif[ií]cil|avanzad|hard|challenging/.test(text.toLowerCase()) ? "hard"
          : /f[aá]cil|sencill|b[aá]sic|easy/.test(text.toLowerCase()) ? "easy"
          : (th.exercise && th.exercise.subjectId === sidE ? th.exercise.tier : "med");
        var startIdx = (th.exercise && th.exercise.subjectId === sidE) ? th.exercise.idx + 1 : 0;
        var served = serveExercise(c, sidE, tierE, startIdx);
        if (served) {
          setTimeout(function () {
            AI_TYPING = false;
            th.lastIntent = "exercise";
            aiPush("ai", served);
            persist("conversations");
            render(true);
          }, 620);
          return;
        }
      }
    }

    // for follow-up/tutor intents, keep the conversation's topic in play
    if (intent && ["simple", "example", "detailed", "quiz", "compare", "summarize"].indexOf(intent) > -1 && c._lastQ) q = c._lastQ + " — " + text;
    // vague reply after a real question → answer the original question directly
    if (!intent && c._lastQ && VAGUE_RE.test(text)) {
      if (/ejercicio|exercise/i.test(text)) { useIntent = "exercise"; q = c._lastQ; }
      else { q = c._lastQ; useIntent = /examen|detalle|exam|detail/i.test(text) ? "detailed" : "explain"; }
    }
    // el tema del hilo (deducido de las preguntas) manda sobre el contexto por defecto de la conversación
    var effCtx = ((!intent && ZAI.detectSubject(text)) || th.subjectId || convCtx(c)) || null;
    ZynqoraAI.chat({ text: q, intent: useIntent, contextId: effCtx, docId: (c.docId || th.docId || null), history: c.messages.slice(-8), profile: aiProfile(), allowSearch: AI_CONFIG.webSearch })
      .then(function (r) {
        AI_TYPING = false;
        if (ZAI.topicMatch(q)) c._topicHit = 1;
        if (useIntent) th.lastIntent = useIntent;
        var st = extractSteps(r.html);
        if (st.length >= 2) th.steps = st;
        aiPush("ai", r);
        persist("conversations");
        render(true);
      })
      .catch(function (err) {
        AI_TYPING = false;
        if (err && err.limitReached) { render(true); openUpgrade("aiMessages"); return; }
        var detail = (err && err.status === 401) ? (DB.lang === "en" ? " (sign in again in Settings → Zynqora Cloud)" : " (vuelve a iniciar sesión en Configuración → Zynqora Cloud)") : "";
        aiPush("ai", { html: "<p>" + (DB.lang === "en" ? "Zynqora AI couldn't respond right now. Please try again." : "Zynqora AI no ha podido responder ahora mismo. Inténtalo de nuevo.") + detail + "</p>" });
        render(true);
      });
  }
  function aiSend(prefill, intent) {
    var ta = document.getElementById("aiInput");
    var v = prefill != null ? prefill : (ta ? ta.value.trim() : "");
    var att = AI_ATTACH;
    if (!v && !att) return;
    if (!canUse("aiMessages")) { openUpgrade("aiMessages"); return; }
    incUsage("aiMessages");
    var c = ensureConv();
    var th = ensureThread(c);
    if (!intent && v && !VAGUE_RE.test(v) && !isFollowup(v)) {
      var vIntent = ZAI.match(v);
      var isCmd = ["exercise", "flashcard", "quiz", "help_exercise", "greet", "thanks"].indexOf(vIntent) > -1;
      if (!isCmd) {
        c._lastQ = v;                                // remember the last real question for follow-ups
        th.topic = v;
      }
      var dsub = ZAI.detectSubject(v);
      if (dsub) th.subjectId = dsub;                 // a subject named in the message always updates the thread
      else if (!isCmd && !th.subjectId && convCtx(c)) th.subjectId = convCtx(c);
      if (th.exercise && looksLikeAnswer(v)) th.lastAnswer = v;   // el usuario ha respondido al ejercicio
    }
    aiPush("user", v || "", att);
    if (att) { c._ctxDoc = att.name; aiPush("system", t("ai.ctxAdded", { name: att.name })); }
    if (ta) ta.value = "";
    AI_ATTACH = null; S.attachMenu = 0;
    render(true);
    if (att && !v) {
      AI_TYPING = true; render(true);
      ZynqoraAI.chat({ text: "", intent: "summarize", contextId: convCtx(c), history: c.messages.slice(-6), profile: aiProfile() })
        .then(function (r) {
          AI_TYPING = false;
          aiPush("ai", { html: "<p>" + t("ai.usingContext", { name: "<strong>" + att.name + "</strong>" }) + "</p>" + r.html, tutor: true });
          render(true);
        })
        .catch(function () {
          AI_TYPING = false;
          aiPush("ai", { html: "<p>" + (DB.lang === "en" ? "Zynqora AI couldn't process that file right now." : "Zynqora AI no ha podido procesar ese archivo ahora mismo.") + "</p>" });
          render(true);
        });
    } else {
      aiRespond(v, intent || null);
    }
  }
  function aiAnswerQuiz(msgIdx, pick) {
    var c = DB.conversations.filter(function (x) { return x.id === S.convId; })[0];
    if (!c || !c.messages[msgIdx] || !c.messages[msgIdx].quiz) return;
    var m = c.messages[msgIdx];
    m.quizDone = true; m.quizPick = pick;
    var ok = pick === m.quiz.correct;
    render(true);
    AI_TYPING = true; render(true);
    setTimeout(function () {
      AI_TYPING = false;
      aiPush("ai", { html: ok ? (DB.lang === "en" ? "<p>Exactly! ✅ " + L(m.quiz.exp) + "</p><p>Want another one, a bit harder?</p>" : "<p>¡Exacto! ✅ " + L(m.quiz.exp) + "</p><p>¿Quieres otra un poco más difícil?</p>")
        : (DB.lang === "en" ? "<p>Not quite. " + L(m.quiz.exp) + "</p><p>Shall I explain that part again more simply?</p>" : "<p>No exactamente. " + L(m.quiz.exp) + "</p><p>¿Te explico esa parte otra vez, más fácil?</p>"), tutor: true });
      render(true);
    }, 640);
  }
  function aiOpenContext(kind, label) {
    var s = cur();
    if (!canUse("aiMessages")) { openUpgrade("aiMessages"); return; }
    incUsage("aiMessages");
    var realKind = (kind === "doc" || kind === "note") ? "explain" : kind;
    var q = kind === "why_failed" ? t("ai.sugWhyFailed") : kind === "improve" ? t("ai.sugImprove") : t("ai.sugExplain");
    AI_CTX = { kind: realKind };
    var c = { id: uid(), contextId: s.id, updated: Date.now(), messages: [], _ctxDoc: (kind === "doc" || kind === "note") ? L(s.doc.title).replace(/\.(pdf|PDF)$/, "") : null };
    DB.conversations.push(c); S.convId = c.id; S.convListView = 0;
    aiPush("user", q);
    S.screen = "ai"; render();
    aiRespond(q, realKind);
  }

  /* ---- toast ---- */
  function toast(msg) {
    var old = frame.querySelector(".toast.floating"); if (old) old.remove();
    var el = document.createElement("div"); el.className = "toast floating"; el.innerHTML = icon("check", 16) + msg;
    frame.appendChild(el);
    setTimeout(function () { el.style.transition = "opacity .3s"; el.style.opacity = "0"; setTimeout(function () { el.remove(); }, 300); }, 1900);
  }
  function celebrate(then) {
    (function () {
      var today = new Date().toISOString().slice(0, 10);
      if (!DB.streakDates) DB.streakDates = [];
      if (DB.streakDates.indexOf(today) > -1) return; // ya cuenta hoy → no re-incrementar (ni al recargar)
      var y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      DB.streak = (DB.streakDates.indexOf(y) > -1 || !DB.streakDates.length) ? (DB.streak || 0) + 1 : 1;
      DB.streakDates.push(today);
      DB._streakBumped = 1;
      persist("state");
    })();
    var el = document.createElement("div"); el.className = "celebrate";
    el.innerHTML = '<div class="cbox"><span class="cflame">🔥</span><div class="ctitle">' + t("streak.title", { n: DB.streak }) + '</div><div class="csub">' + t("streak.sub") + "</div></div>";
    frame.appendChild(el);
    setTimeout(function () { el.style.transition = "opacity .3s"; el.style.opacity = "0"; setTimeout(function () { el.remove(); if (then) then(); }, 300); }, 1550);
  }
  function finishActivity(nextScreen) {
    var fromPath = S._fromPath != null;
    if (fromPath) DB.pathProgress[DB.currentSubjectId] = Math.min(4, (S._pathNode || 0) + 1);
    var rd = S.reviewDoc ? docById(S.reviewDoc) : null;
    try {
      var sess = { id: uid(), subjectId: DB.currentSubjectId, docId: rd ? rd.id : null, mode: S.mode || (fromPath ? "path" : null),
        score: (typeof S.qScore === "number" ? S.qScore : null), total: (S.mode === "test" ? (activeQuiz() || []).length : null), at: Date.now() };
      DB.sessions.push(sess);
      if (rd) { rd.sessions = rd.sessions || []; rd.sessions.push(sess); persist("documents"); }
    } catch (e) {}
    persist("sessions"); persist("state"); persist("subjects");
    var target = nextScreen;
    if (nextScreen === "path" && !fromPath) target = "fc-done";
    celebrate(function () { S._fromPath = null; go2(target === "results" ? "results" : target); });
  }
  function startMode(mode) {
    S.reviewDoc = null;
    if (mode === "flashcards" && !gateStart("flashcards", cur().flashcards.length)) return;
    if (mode === "test" && !gateStart("tests")) return;
    S.mode = mode;
    if (mode === "flashcards") { S.fcIndex = 0; S.fcFlipped = 0; S.fcKnown = 0; S.fcAgain = 0; go2("flashcards"); }
    else if (mode === "test") { S.qIndex = 0; S.qPicked = null; S.qAnswered = 0; S.qScore = 0; go2("test"); }
    else if (mode === "fill") { S.fibIndex = 0; S.fibChecked = 0; S.fibVal = ""; go2("fillblank"); }
    else { S.rmShuffled = null; S.rmPick = {}; S.rmChecked = 0; S.rmPickOne = null; go2("reviewMode"); }
  }
  function activeReviewDoc() { var d = S.reviewDoc ? docById(S.reviewDoc) : null; return (d && docHasText(d)) ? d : null; }
  function activeFlashcards() { var d = activeReviewDoc(); return d ? docFlashcards(d) : cur().flashcards; }
  function activeQuiz() { var d = activeReviewDoc(); return d ? docQuiz(d) : cur().quiz; }
  function docAsk(docId) {
    var d = docById(docId); if (!d) return;
    if (!canUse("aiMessages")) { openUpgrade("aiMessages"); return; }
    var en = DB.lang === "en";
    var hello = "<p>" + (en ? "Ask me about " : "Pregúntame sobre ") + "<strong>" + esc(L(d.title)) + "</strong>." +
      (docHasText(d) ? " " + (en ? "I'll answer from its content." : "Responderé a partir de su contenido.")
        : " " + (en ? "(No text was extracted, so I can only help in general terms.)" : "(No se ha extraído texto, así que solo puedo ayudarte de forma general.)")) + "</p>";
    var c = { id: uid(), contextId: d.subjectId, docId: d.id, updated: Date.now(),
      title: { es: L(d.title), en: L(d.title) },
      messages: [{ role: "ai", html: hello, tutor: true }] };
    ensureThread(c); c.thread.docId = d.id; c.thread.subjectId = d.subjectId;
    DB.conversations.push(c);
    S.convId = c.id; S.convListView = 0; S._convDel = null; AI_CTX = null; AI_ATTACH = null; S.ctxPop = 0;
    persist("conversations");
    go2("ai");
  }
  function docReview(docId, mode) {
    var d = docById(docId); if (!d) return;
    mode = mode || "flashcards";
    DB.currentSubjectId = d.subjectId;
    if (!docHasText(d)) { S.reviewDoc = null; startMode(mode); return; }
    if (mode === "flashcards") {
      var haveFc = d.flashcards && d.flashcards.length;
      if (!haveFc && !canUse("flashcards")) { openUpgrade("flashcards"); return; }
      var fc = docFlashcards(d);
      if (!fc.length) { toast(DB.lang === "en" ? "Not enough text for flashcards — try the summary." : "No hay texto suficiente para flashcards — prueba el resumen."); return; }
      S.reviewDoc = d.id; S.mode = "flashcards"; S._fromPath = null;
      S.fcIndex = 0; S.fcFlipped = 0; S.fcKnown = 0; S.fcAgain = 0; go2("flashcards");
    } else {
      var haveQ = d.quiz && d.quiz.length;
      if (!haveQ && !canUse("tests")) { openUpgrade("tests"); return; }
      var qz = docQuiz(d);
      if (!qz.length) { toast(DB.lang === "en" ? "Not enough text for a test — try the summary or flashcards." : "No hay texto suficiente para un test — prueba el resumen o las flashcards."); return; }
      S.reviewDoc = d.id; S.mode = "test"; S._fromPath = null;
      S.qIndex = 0; S.qPicked = null; S.qAnswered = 0; S.qScore = 0; go2("test");
    }
  }
  function docExercises(docId) {
    var d = docById(docId); if (!d) return;
    if (!canUse("aiMessages")) { openUpgrade("aiMessages"); return; }
    if (!docHasText(d)) { docAsk(docId); return; }
    var c = { id: uid(), contextId: d.subjectId, docId: d.id, updated: Date.now(),
      title: { es: L(d.title), en: L(d.title) }, messages: [] };
    var th = ensureThread(c); th.docId = d.id; th.subjectId = d.subjectId;
    var ex = DocGen.exercises(d.text, "med");
    th.docExercises = ex; th.docExIdx = 0; th.docExTier = "med";
    th.exercise = null;
    DB.conversations.push(c);
    S.convId = c.id; S.convListView = 0; S._convDel = null; AI_CTX = null; S.ctxPop = 0;
    incUsage("aiMessages");
    aiPush("user", DB.lang === "en" ? "Give me an exercise on this document" : "Ponme un ejercicio de este documento");
    aiPush("ai", { html: "<p>" + (DB.lang === "en" ? "Exercise (from your document) 👇" : "Ejercicio (de tu documento) 👇") + "</p><p><strong>" + esc(ex[0].q) + '</strong></p><p class="ai-followup">' + (DB.lang === "en" ? 'Say "another", "harder" or "easier".' : 'Dime "otro", "más difícil" o "más fácil".') + "</p>", tutor: true });
    th.lastIntent = "exercise";
    persist("conversations");
    go2("ai");
  }
  function setAvatar(v) { DB.avatar = v; if (DB.profile) DB.profile.avatar = v; lsSet("zynqora.avatar", v); persist("profile"); }

  /* ---- menu ---- */
  var protoMenu = document.getElementById("protoMenu");
  var menuBtn = document.getElementById("menuBtn");
  function buildMenu() {
    protoMenu.innerHTML = MENU.map(function (g) {
      return "<h6>" + t(g.g) + "</h6>" + g.items.map(function (it) { return '<button data-goto="' + it[0] + '" class="' + (it[0] === S.screen ? "on" : "") + '">' + t(it[1]) + "</button>"; }).join("");
    }).join("");
  }
  function hideMenu() { protoMenu.hidden = true; menuBtn.setAttribute("aria-expanded", "false"); }
  menuBtn.addEventListener("click", function () { var o = protoMenu.hidden; protoMenu.hidden = !o; menuBtn.setAttribute("aria-expanded", String(o)); });

  function applyStatic() {
    document.querySelectorAll("[data-i]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i")); });
    document.getElementById("revealBtn").textContent = t("proto.reveal");
  }
  function setVp(vp) { S.vp = vp; stage.dataset.vp = vp; document.querySelectorAll(".proto-bar [data-vp]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.vp === vp)); }); }
  function setTheme(mode) {
    DB.theme = mode; lsSet("zynqora.theme", mode);
    if (mode === "system") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", mode);
    document.querySelectorAll(".proto-bar [data-theme-set]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.themeSet === mode)); });
    applyAccent();
    render(true);
  }
  function setLang(lang) {
    DB.lang = lang; lsSet("zynqora.lang", lang);
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll(".proto-bar [data-lang-set]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.langSet === lang)); });
    applyStatic(); render(true);
  }

  /* ---- events ---- */
  document.addEventListener("click", function (e) {
    var t2 = e.target.closest("[data-nav],[data-action],[data-goto],[data-vp],[data-theme-set],[data-lang-set],[data-ai-open],[data-ai-sugg]");
    if (!t2) {
      if (!e.target.closest("#protoMenu,#menuBtn")) hideMenu();
      if (S.attachMenu && !e.target.closest(".attach-menu,.attach-btn")) { S.attachMenu = 0; render(true); }
      if (S.subjPop && !e.target.closest(".subj-switch")) { S.subjPop = 0; render(true); }
      if (S.ctxPop && !e.target.closest(".chat-ctx-wrap")) { S.ctxPop = 0; render(true); }
      return;
    }
    var d = t2.dataset;

    if (d.vp) return setVp(d.vp);
    if (d.themeSet) return setTheme(d.themeSet);
    if (d.langSet) return setLang(d.langSet);
    if (d.goto != null) { hideMenu(); return gotoScreen(d.goto); }
    if (d.aiOpen != null) return aiOpenContext(d.aiOpen, d.aiLabel || "");
    if (d.aiSugg) {
      var SM = { "ai.sugExplain": "explain", "ai.sugSimple": "simple", "ai.sugExample": "example", "ai.sugCompare": "compare", "ai.sugQuiz": "quiz", "ai.sugSummarize": "summarize", "ai.sugWhyFailed": "why_failed", "ai.sugImprove": "improve",
        "ai.tSimple": "simple", "ai.tExample": "example", "ai.tQuiz": "quiz", "ai.tDeeper": "detailed" };
      S.ctxPop = 0; aiSend(t(d.aiSugg), SM[d.aiSugg] || null); return;
    }
    if (d.nav) {
      if (d.nav === "subject" && d.tab) S.subjTab = d.tab;
      if (d.nav === "test" && !gateStart("tests")) return;
      if (d.nav === "flashcards" && !gateStart("flashcards", cur().flashcards.length)) return;
      return go(d.nav);
    }

    var a = d.action;
    if (a === "sheet-close") { if (e.target.closest(".sheet") && !e.target.closest("button")) return; S.sheet = null; return render(true); }
    switch (a) {
      case "ob-next":
        var obn = document.getElementById("obNewName");
        if (obn) S.obNewName = obn.value;
        if (S.ob < 5) { S.ob++; render(); }
        break;
      case "ob-back": if (S.ob > 0) { S.ob--; render(); } break;
      case "ob-pick":
        if (d.multi) {
          S.obGoals = S.obGoals || [];
          var ix = S.obGoals.indexOf(d.v);
          if (ix > -1) S.obGoals.splice(ix, 1); else S.obGoals.push(d.v);
        } else {
          S["ob" + d.field.charAt(0).toUpperCase() + d.field.slice(1)] = d.v;
        }
        render(true);
        break;
      case "ob-finish":
        if (S.obFirst === "new") {
          var nm = (document.getElementById("obNewName") || {}).value || S.obNewName || "";
          if (nm && nm.trim()) { var ns = makeSubject(nm.trim(), "book", "#5A54C9"); DB.currentSubjectId = ns.id; }
        } else if (S.obFirst && subj(S.obFirst)) {
          DB.currentSubjectId = S.obFirst;
        }
        DB.onboardingDone = true; persist("state");
        go("dashboard");
        break;
      case "subj-pop": S.subjPop = !S.subjPop; render(true); break;
      case "subj-set": DB.currentSubjectId = d.id; S.subjPop = 0; render(true); break;
      case "open-subject": DB.currentSubjectId = d.id; S.subjTab = "docs"; go("subject"); break;
      case "open-doc": S.docId = d.id; S._docTextFull = 0; S.docSubjPop = null; go("document"); break;
      case "open-conv": S.convId = d.id; S.convListView = 0; S._convDel = null; AI_CTX = null; AI_ATTACH = null; S.ctxPop = 0; go2("ai"); break;
      case "conv-del": S._convDel = d.id; render(true); break;
      case "conv-del-cancel": S._convDel = null; render(true); break;
      case "conv-del-confirm": {
        DB.conversations = DB.conversations.filter(function (x) { return x.id !== d.id; });
        if (S.convId === d.id) { S.convId = null; S.convListView = 1; }
        S._convDel = null;
        persist("conversations"); Store.flush();
        render(); toast(t("ai.convDeleted"));
        break;
      }
      case "new-conv":
        var c = newGreetConv();
        S.convId = c.id; S.convListView = 0; AI_CTX = null; AI_ATTACH = null; S.attachMenu = 0; S.ctxPop = 0; go2("ai"); break;
      case "ai-list": S.convListView = 1; S.convId = null; AI_CTX = null; AI_ATTACH = null; S.attachMenu = 0; S.ctxPop = 0; render(); break;
      case "ai-send": aiSend(); break;
      case "ai-ctx-pop": S.ctxPop = !S.ctxPop; render(true); break;
      case "ai-ctx-set": {
        var cc = DB.conversations.filter(function (x) { return x.id === S.convId; })[0];
        if (cc) {
          cc.contextId = d.v === CTX_NONE ? null : d.v;
          if (d.v === CTX_NONE) cc._ctxDoc = null;
          var cth = ensureThread(cc);
          cth.subjectId = d.v === CTX_NONE ? null : d.v;   // el contexto elegido a mano manda sobre el hilo
          cth.exercise = null; cth.lastAnswer = null; cth.steps = [];
          persist("conversations");
        }
        S.ctxPop = 0; render(true); break;
      }
      case "ai-quiz": aiAnswerQuiz(parseInt(d.msg, 10), parseInt(d.i, 10)); break;
      case "attach-menu": S.attachMenu = !S.attachMenu; render(true); break;
      case "attach-pick":
        S.attachMenu = 0;
        var an = d.type === "image" ? (DB.lang === "en" ? "Notes photo.jpg" : "Foto apuntes.jpg")
          : d.type === "doc" ? L(cur().name) + (DB.lang === "en" ? " notes.docx" : " apuntes.docx")
          : L(cur().doc.title);
        AI_ATTACH = { name: an, type: d.type };
        render(true);
        setTimeout(function () { var ti = document.getElementById("aiInput"); if (ti) ti.focus(); }, 30);
        break;
      case "attach-clear": AI_ATTACH = null; render(true); break;
      case "subj-tab": S.subjTab = d.tab; render(true); break;
      case "add-subject":
        if (DB.subjects.length >= planLimit("subjects")) { openUpgrade("subjects"); break; }
        S.sheet = { kind: "add-subject" }; render(true); break;
      case "sheet-icon": S.sheet.icon = d.v; render(true); break;
      case "sheet-color": S.sheet.color = d.v; render(true); break;
      case "sheet-save-subject": saveSubject(); break;
      case "add-material": S.addType = null; S.addFile = null; S.addPick = null; go("addMaterial"); break;
      case "add-to-subject": case "add-type":
        if (a === "add-to-subject") { S.addType = null; S.addFile = null; S.addPick = null; go("addMaterial"); break; }
        S.addType = d.type; S.addFile = null; S.addPick = null;
        if (S.screen === "onboarding") { break; }
        render(); break;
      case "file-pick": var fi = document.getElementById("fileInput"); if (fi) fi.click(); break;
      case "add-clear": S.addFile = null; S.addPick = null; render(); break;
      case "run-analysis": if (busy("analysis")) break; startAnalysis(); break;
      /* --- documentos (FASE D) --- */
      case "doc-open": S.docId = d.id; S._docTextFull = 0; S.docSubjPop = null; go("document"); break;
      case "doc-text-toggle": S._docTextFull = !S._docTextFull; render(true); break;
      case "doc-subj-pop": S.docSubjPop = (S.docSubjPop === d.id ? null : d.id); render(true); break;
      case "doc-set-subj": {
        var dsx = docById(d.id); if (dsx) { dsx.subjectId = d.v; persist("documents"); }
        S.docSubjPop = null; render(true);
        toast(DB.lang === "en" ? "Moved to " + L(subj(d.v).name) : "Movido a " + L(subj(d.v).name));
        break;
      }
      case "doc-del":
        S.sheet = { kind: "confirm", act: "docdel", docId: d.id, title: t("doc.deleteQ"), body: t("doc.deleteSub"), confirmLabel: t("doc.delete") };
        render(true); break;
      case "doc-summary": {
        var dsm = docById(d.id); if (!dsm || !docHasText(dsm)) { toast(DB.lang === "en" ? "No text to summarise." : "No hay texto para resumir."); break; }
        if (aiIsReal() && ZynqoraAI.generateSummary) {
          toast(DB.lang === "en" ? "Generating with Zynqora AI…" : "Generando con Zynqora AI…");
          ZynqoraAI.generateSummary({ docId: dsm.id, subjectId: dsm.subjectId }).then(function (r) {
            var a = (r && r.result) || r || {};
            if (a.summary) dsm.summary = a.summary;
            dsm.analysis = { concepts: a.concepts || (dsm.analysis && dsm.analysis.concepts) || [], keyPoints: a.keyPoints || [], wordCount: (dsm.analysis && dsm.analysis.wordCount) || 0, readMin: a.readMin || 5, difficulty: a.difficulty || "med" };
            dsm._genV = DOCGEN_VERSION; persist("documents");
            S.docId = dsm.id; S._docTextFull = 0; go("document");
            toast(DB.lang === "en" ? "Summary generated by Zynqora AI" : "Resumen generado por Zynqora AI");
          }).catch(function (err) {
            if (err && err.limitReached) { openUpgrade("aiMessages"); return; }
            dsm.analysis = null; dsm._analysisSource = null; docEnsureAnalysis(dsm); persist("documents");
            S.docId = dsm.id; go("document");
            toast(DB.lang === "en" ? "Used local summary (AI unavailable)" : "Resumen local (IA no disponible)");
          });
          break;
        }
        dsm.analysis = null; dsm._analysisSource = null; dsm._genV = null; docEnsureAnalysis(dsm); persist("documents");
        S.docId = dsm.id; S._docTextFull = 0; go("document");
        toast(DB.lang === "en" ? "Summary generated from the real text" : "Resumen generado del texto real");
        break;
      }
      case "doc-ask": docAsk(d.id); break;
      case "doc-review": docReview(d.id, d.mode); break;
      case "doc-exercises": docExercises(d.id); break;
      case "fc-flip":
        S.fcFlipped = !S.fcFlipped;
        var fcEl = document.querySelector(".fc");
        if (fcEl) { fcEl.classList.toggle("flipped", !!S.fcFlipped); var fa = document.getElementById("fcActions"); if (fa) fa.innerHTML = fcActions(); }
        else render();
        break;
      case "fc-prev": if (S.fcIndex > 0) { S.fcIndex--; S.fcFlipped = 0; render(); } break;
      case "fc-next":
        if (d.known === "1") S.fcKnown++; else S.fcAgain++;
        var sN = cur();
        var fcDeck = activeFlashcards();
        if (S.fcIndex + 1 < fcDeck.length) { S.fcIndex++; S.fcFlipped = 0; render(); }
        else {
          if (!activeReviewDoc()) { DB.reviewsDueBySubject[sN.id] = Math.max(0, reviewsDue(sN.id) - S.fcKnown); sN.mastery = Math.min(99, sN.mastery + 2); }
          DB.studiedMin += 6;
          finishActivity(S._fromPath != null ? "path" : "fc-done");
        }
        break;
      case "q-pick":
        if (S.qAnswered) return;
        S.qPicked = parseInt(d.i, 10); S.qAnswered = 1;
        if (S.qPicked === activeQuiz()[S.qIndex].correct) S.qScore++;
        render(true);
        break;
      case "q-next":
        var sQ = cur();
        var qDeck = activeQuiz();
        if (S.qIndex + 1 < qDeck.length) { S.qIndex++; S.qPicked = null; S.qAnswered = 0; render(true); }
        else {
          DB.studiedMin += 9;
          if (!activeReviewDoc()) {
            DB.lastTestBySubject[sQ.id] = { score: S.qScore, total: qDeck.length };
            sQ.testsTaken++;
            sQ.mastery = Math.max(20, Math.min(99, sQ.mastery + (S.qScore >= qDeck.length - 1 ? 4 : S.qScore === 0 ? -2 : 1)));
          }
          finishActivity("results");
        }
        break;
      /* learning path + modes */
      case "path-go": S._fromPath = 1; S._pathNode = parseInt(d.node, 10); go("study"); break;
      case "mode-go": startMode(d.mode); break;
      case "fib-check": S.fibVal = (document.getElementById("fibInput") || {}).value || ""; S.fibChecked = 1; render(true); break;
      case "fib-next":
        S.fibChecked = 0; S.fibVal = "";
        var items = (EXTRA_STUDY[DB.currentSubjectId] && EXTRA_STUDY[DB.currentSubjectId].fill) || EXTRA_STUDY.hist.fill;
        if ((S.fibIndex || 0) + 1 < items.length) { S.fibIndex = (S.fibIndex || 0) + 1; render(); }
        else { S.fibIndex = 0; DB.studiedMin += 4; finishActivity("path"); }
        break;
      case "rm-check":
        document.querySelectorAll('[data-action="rm-sel"]').forEach(function (sel) {
          S.rmPick[parseInt(sel.dataset.row, 10)] = sel.value === "" ? undefined : parseInt(sel.value, 10);
        });
        S.rmChecked = 1; render(true); break;
      case "rm-one": if (S.rmChecked) break; S.rmPickOne = parseInt(d.i, 10); S.rmChecked = 1; render(true); break;
      case "rm-done": DB.studiedMin += 4; finishActivity("path"); break;
      case "rm-explain":
        var txt = (document.getElementById("rmExplain") || {}).value || "";
        var cc = { id: uid(), contextId: DB.currentSubjectId, updated: Date.now(), messages: [] };
        DB.conversations.push(cc); S.convId = cc.id; S.convListView = 0;
        aiPush("user", txt || (DB.lang === "en" ? "Here's my explanation of " + d.c : "Mi explicación de " + d.c));
        S.screen = "ai"; render();
        aiRespond(txt, "why_failed");
        break;
      case "edit-photo": S.sheet = { kind: "photo" }; render(true); break;
      case "photo-preset": keepProfileSheet(); setAvatar(d.v); render(true); break;
      case "photo-pick": keepProfileSheet(); var pfi = document.getElementById("photoInput"); if (pfi) pfi.click(); break;
      case "save-profile": saveProfile(); break;
      /* calendar */
      case "cal-prev": S.calMonth = new Date((S.calMonth || new Date()).getFullYear(), (S.calMonth || new Date()).getMonth() - 1, 1); render(true); break;
      case "cal-next": S.calMonth = new Date((S.calMonth || new Date()).getFullYear(), (S.calMonth || new Date()).getMonth() + 1, 1); render(true); break;
      case "cal-day": S.calSel = d.iso; render(true); break;
      case "add-task": S.sheet = { kind: "add-task", date: S.calSel || isoDate(addDays(0)) }; render(true); break;
      case "sheet-tsubj": keepTaskSheet(); S.sheet.subjectId = d.v; render(true); break;
      case "sheet-ttype": keepTaskSheet(); S.sheet.type = d.v; render(true); break;
      case "sheet-save-task": saveTask(); break;
      case "task-open": S.sheet = { kind: "task", id: d.id }; render(true); break;
      case "task-toggle": var tk = DB.calendar.filter(function (x) { return x.id === d.id; })[0]; if (tk) tk.done = !tk.done; persist("calendar"); S.sheet = null; render(true); break;
      case "task-edit": {
        var te = DB.calendar.filter(function (x) { return x.id === d.id; })[0];
        if (te) S.sheet = { kind: "add-task", editId: te.id, title: L(te.title), desc: te.desc || "",
          time: te.time || "", subjectId: te.subjectId, type: te.type, date: te.date };
        render(true); break;
      }
      case "task-delete":
        if (S.sheet && S.sheet.kind === "task") { S.sheet.confirmDelete = 1; render(true); }
        break;
      case "task-delete-cancel":
        if (S.sheet) { S.sheet.confirmDelete = 0; render(true); }
        break;
      case "task-delete-confirm": {
        DB.calendar = DB.calendar.filter(function (x) { return x.id !== d.id; });
        persist("calendar"); Store.flush(); S.sheet = null; render(); toast(t("cal.taskDeleted"));
        break;
      }
      case "go-plan": S._planExam = d.exam; S.sheet = null; go2("plan"); break;
      case "plan-add": addPlanToCalendar(); break;
      /* settings */
      case "toggle-notif": DB.notifications = !DB.notifications; persist("state"); render(true); break;
      case "toggle-reminder":
        if (!DB.reminder) DB.reminder = { on: false, time: "18:00" };
        DB.reminder.on = !DB.reminder.on; persist("state"); render(true); break;
      case "wipe-local":
        S.sheet = { kind: "confirm", act: "wipe", title: t("settings.deleteAccount"), body: t("settings.wipeConfirm"), confirmLabel: t("settings.deleteAccount") };
        render(true);
        break;
      case "confirm-yes": {
        var cact = S.sheet && S.sheet.act;
        var cdoc = S.sheet && S.sheet.docId;
        S.sheet = null;
        if (cact === "wipe") {
          Store.clearAll().then(function () {
            try { Object.keys(localStorage).forEach(function (k) { if (k.indexOf("zynqora.") === 0) localStorage.removeItem(k); }); } catch (e) {}
            resetLocalData();
            render();
            toast(t("settings.wipeDone"));
            try { if (location.protocol === "http:" || location.protocol === "https:") location.reload(); } catch (e) {}
          });
        } else if (cact === "docdel") {
          DB.documents = (DB.documents || []).filter(function (x) { return x.id !== cdoc; });
          DB.conversations = DB.conversations.filter(function (c) { return c.docId !== cdoc; });
          if (S.docId === cdoc) S.docId = null;
          persist("documents"); persist("conversations"); Store.flush();
          S.screen = "notes"; render();
          toast(t("doc.deleted"));
        } else {
          render(true);
        }
        break;
      }
      case "set-goal": DB.goalMin = parseInt(d.v, 10); persist("state"); render(true); break;
      case "set-slen": DB.sessionLength = d.v; persist("state"); render(true); break;
      case "set-accent": setAccent(d.v); break;
      case "dash-start": S._fromPath = null; go("path"); break;
      case "personalize": S.sheet = { kind: "personalize", more: 0, shorter: 0, test: 1 }; render(true); break;
      case "sheet-ptoggle": S.sheet[d.v] = !S.sheet[d.v]; render(true); break;
      case "sheet-papply": S.sheet = null; toast(DB.lang === "en" ? "Session updated" : "Sesión actualizada"); render(true); break;
      case "premium": S.sheet = { kind: "premium" }; render(true); break;
      /* plans + checkout + limits */
      case "go-plans-sheet": S.sheet = null; go2("plans"); break;
      case "set-billing": S.billing = d.v; render(true); break;
      case "pick-plan": S.checkoutPlan = d.v; go2("checkout"); break;
      case "upgrade-plus": S.sheet = null; S.checkoutPlan = "plus"; go2("checkout"); break;
      case "upgrade-see": S.sheet = null; go2("plans"); break;
      case "checkout-confirm": if (busy("checkout")) break; setPlan(S.checkoutPlan || "plus"); go2("checkoutDone"); toast(DB.lang === "en" ? "Demo plan activated" : "Plan de demostración activado"); break;
      case "downgrade-free": setPlan("free"); render(true); toast(DB.lang === "en" ? "Now on Free" : "Ahora en Free"); break;
      case "co-method": S.coMethod = d.v; render(true); break;
      case "accent-locked": openFeature("personalization"); break;
      case "ai-connect": {
        var ep = ((document.getElementById("aiEndpoint") || {}).value || "").trim();
        if (ep && !/^https?:\/\//i.test(ep)) ep = "https://" + ep;
        aiSetEndpoint(ep);
        render(true); toast(ep ? t("set.aiConnected") : (DB.lang === "en" ? "Back to demo mode" : "De nuevo en modo demo"));
        break;
      }
      case "ai-disconnect": aiSetEndpoint(""); render(true); toast(DB.lang === "en" ? "Back to demo mode" : "De nuevo en modo demo"); break;
      case "cloud-connect": {
        var cu = ((document.getElementById("cloudUrl") || {}).value || "").trim();
        var ck = ((document.getElementById("cloudKey") || {}).value || "").trim();
        if (cu && !/^https?:\/\//i.test(cu)) cu = "https://" + cu;
        aiSetCloud(cu, ck);
        render(true);
        toast(Auth.enabled() ? (DB.lang === "en" ? "Cloud connected — sign in to sync" : "Cloud conectado — inicia sesión para sincronizar") : (DB.lang === "en" ? "Back to local mode" : "De nuevo en modo local"));
        break;
      }
      case "cloud-disconnect":
        Auth.signOut(); aiSetCloud("", ""); render(true);
        toast(DB.lang === "en" ? "Back to local mode" : "De nuevo en modo local");
        break;
      case "cloud-signout": Auth.signOut(); render(true); toast(DB.lang === "en" ? "Signed out" : "Sesión cerrada"); break;
      case "auth-mode": S.authMode = d.v; render(true); break;
      case "auth-submit": {
        var ae = ((document.getElementById("authEmail") || {}).value || "").trim();
        var ap = ((document.getElementById("authPass") || {}).value || "");
        var an = ((document.getElementById("authName") || {}).value || "").trim();
        if (!ae || ap.length < 6) { var eb = document.getElementById("authErr"); if (eb) eb.innerHTML = '<div class="field-err">' + t("auth.err") + "</div>"; break; }
        var pr = d.v === "signup" ? Auth.signUp(ae, ap, an) : Auth.signIn(ae, ap);
        pr.then(function () { S.screen = "settings"; render(); toast(DB.lang === "en" ? "Signed in" : "Sesión iniciada"); if (Sync.enabled()) Sync.pushAll(); })
          .catch(function () { var eb2 = document.getElementById("authErr"); if (eb2) eb2.innerHTML = '<div class="field-err">' + t("auth.err") + "</div>"; });
        break;
      }
      case "auth-recover": {
        var re = ((document.getElementById("authEmail") || {}).value || "").trim();
        if (re) Auth.recover(re).catch(function () {});
        toast(t("auth.recoverSent"));
        break;
      }
      case "acc-toggle": S.polOpen = S.polOpen || {}; S.polOpen[d.v] = !S.polOpen[d.v]; render(true); break;
      /* AI study tools */
      case "tool-open": {
        var tm = TOOL_META[d.m];
        if (!canUse(tm.feat)) { openFeature(tm.feat); break; }
        podStop();
        S.toolDoc = (d.doc && docById(d.doc) && docHasText(docById(d.doc))) ? d.doc : null;
        S.tool = d.m; S.toolStep = S.toolDoc ? 1 : 0;
        S.podDur = "medium"; S.podApproach = 0; S.podVoiceIdx = 0; S.podVStyleIdx = 0; S.podSpeed = 1; S.podPos = 0; S.podVol = 0.6;
        S.presStyleIdx = 0; S.mapStyleIdx = 0; S.slideIdx = 0; S.presThumbs = 0; S.presMode = 0; S.genIdx = 0;
        go2("toolFlow"); break;
      }
      case "tool-step": S.toolStep = parseInt(d.n, 10); render(true); break;
      case "tool-src": {
        var td = docById(d.id);
        S.toolDoc = (td && docHasText(td)) ? d.id : null;
        if (td) DB.currentSubjectId = td.subjectId;
        S.toolStep = 1; render(true); break;
      }
      case "tool-optstyle":
        if (S.tool === "presentation") S.presStyleIdx = parseInt(d.n, 10);
        else S.mapStyleIdx = parseInt(d.n, 10);
        render(true); break;
      case "pod-dur": S.podDur = d.v; render(true); break;
      case "pod-approach": S.podApproach = parseInt(d.n, 10); render(true); break;
      case "pod-voice": S.podVoiceIdx = parseInt(d.n, 10); render(true); break;
      case "pod-vstyle": S.podVStyleIdx = parseInt(d.n, 10); render(true); break;
      case "tool-generate": if (busy("gen")) break; toolGenerate(); break;
      case "tool-back": podStop(); S.presMode = 0; go2("aitools"); break;
      case "pod-toggle": podToggle(); break;
      case "pod-speed": S.podSpeed = parseFloat(d.v); if (S.podPlaying) speechSpeakFrom(SPEECH.segIdx); else render(true); break;
      case "pod-music": S.podMusic = !S.podMusic; if (S.podPlaying) { if (S.podMusic) bgmStart(); else bgmStop(); } render(true); break;
      case "pod-skip": podSkip(parseInt(d.v, 10)); break;
      case "ptr-seekline": podSeekLine(parseInt(d.n, 10)); break;
      case "slide-prev": S.slideIdx = Math.max(0, (S.slideIdx || 0) - 1); render(true); break;
      case "slide-next": S.slideIdx = Math.min(deckLen() - 1, (S.slideIdx || 0) + 1); render(true); break;
      case "pres-goto": S.slideIdx = parseInt(d.n, 10); render(true); break;
      case "pres-thumbs": S.presThumbs = !S.presThumbs; render(true); break;
      case "pres-present":
        S.presMode = 1; render(true);
        try { var _fr = document.getElementById("frame"); if (_fr && _fr.requestFullscreen) _fr.requestFullscreen().catch(function () {}); } catch (e) {}
        break;
      case "pres-exit":
        S.presMode = 0; render(true);
        try { if (document.fullscreenElement) document.exitFullscreen(); } catch (e) {}
        break;
      case "pres-edit": toast(t("tf.editDemo")); break;
      case "pres-export": toast(t("tf.exportDemo")); break;
      case "tool-regen": runGenSeq(false); toast(t("tf.regenDone")); break;
      case "toast": toast(t("common.demoAction")); break;
      case "reload": go("dashboard"); break;
    }
  });
  function go2(screen) { if (screen !== "toolFlow") { podStop(); S.presMode = 0; } S.screen = screen; render(); }

  function makeSubject(name, ic, color) {
    var base = clone(SUBJECTS[0]);
    base.id = uid(); base.name = { es: name, en: name }; base.icon = ic || "book"; base.color = color || "#5A54C9";
    base.mastery = 0; base.testsTaken = 0; base.lastSessionDays = 0; base.extraDocs = [];
    base.doc.id = uid(); base.doc.title = { es: name + ".pdf", en: name + ".pdf" };
    DB.subjects.push(base); DB.reviewsDueBySubject[base.id] = 0;
    persist("subjects"); persist("state");
    return base;
  }
  function saveSubject() {
    var name = ((document.getElementById("sheetName") || {}).value || "").trim();
    if (!name) { fieldError("sheetName", t("err.subjectName")); return; }
    var ns = makeSubject(name, S.sheet.icon || "book", S.sheet.color || "#5A54C9");
    DB.currentSubjectId = ns.id;
    persist("state");
    S.sheet = null; S.subjTab = "docs"; S.screen = "subject"; render();
    toast(DB.lang === "en" ? "Subject added" : "Materia añadida");
  }
  function setAccent(key) {
    DB.accent = key; lsSet("zynqora.accent", key);
    applyAccent();
    document.querySelectorAll(".proto-bar [data-accent-set]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.accentSet === key)); });
    render(true);
  }
  function saveTask() {
    var title = ((document.getElementById("taskTitle") || {}).value || "").trim();
    if (!title) { fieldError("taskTitle", t("err.taskTitle")); return; }
    var date = (document.getElementById("taskDate") || {}).value || isoDate(addDays(0));
    var time = (document.getElementById("taskTime") || {}).value || "";
    var desc = ((document.getElementById("taskDesc") || {}).value || "").trim();
    var isEdit = !!S.sheet.editId;
    if (S.sheet.editId) {
      var ex = DB.calendar.filter(function (k) { return k.id === S.sheet.editId; })[0];
      if (ex) {
        ex.title = { es: title, en: title }; ex.subjectId = S.sheet.subjectId || ex.subjectId;
        ex.type = S.sheet.type || ex.type; ex.date = date; ex.time = time; ex.desc = desc;
      }
    } else {
      DB.calendar.push({ id: uid(), title: { es: title, en: title }, subjectId: S.sheet.subjectId || DB.currentSubjectId, type: S.sheet.type || "study", date: date, time: time, desc: desc, done: false });
    }
    persist("calendar");
    S.calSel = date; S.sheet = null; render();
    toast(DB.lang === "en" ? (isEdit ? "Task updated" : "Task added") : (isEdit ? "Tarea actualizada" : "Tarea añadida"));
  }
  function pickFile(f) {
    S.addFile = f;
    S.addPick = { name: f.name, size: fmtBytes(f.size), mime: f.type || "" };
    render();
  }
  function startAnalysis() {
    var s = cur();
    var isPaste = S.addType === "text";
    var pasted = isPaste ? ((document.getElementById("addText") || {}).value || "").trim() : "";
    if (isPaste) {
      if (pasted.replace(/\s/g, "").length < 24) { fieldError("addText", DB.lang === "en" ? "Paste at least a short paragraph." : "Pega al menos un párrafo corto."); return; }
    } else if (!S.addFile) {
      toast(DB.lang === "en" ? "Choose a file first." : "Elige un archivo primero."); return;
    }
    if (!gateStart("files")) return;

    var rec = {
      id: uid(), subjectId: s.id,
      title: isPaste ? (DB.lang === "en" ? "Pasted notes" : "Notas pegadas") : S.addFile.name,
      kind: isPaste ? "text" : "file",
      mime: isPaste ? "text/plain" : (S.addFile.type || ""),
      sizeBytes: isPaste ? pasted.length : (S.addFile.size || 0),
      addedAt: Date.now(), status: "processing",
      textSource: isPaste ? "paste" : null, text: isPaste ? pasted : null, image: null, note: null,
      analysis: null, summary: null, flashcards: null, quiz: null, sessions: [], seeded: false, pages: 0
    };
    DB.documents.push(rec);
    S.docId = rec.id;
    persist("documents");

    S._ingestPromise = isPaste ? Promise.resolve() : Ingest.ingest(S.addFile).then(function (r) {
      rec.kind = r.kind || "file"; rec.mime = r.mime || rec.mime;
      if (r.sizeBytes) rec.sizeBytes = r.sizeBytes;
      rec.text = r.text || null; rec.textSource = r.textSource || null;
      rec.image = r.image || null; rec.note = r.note || null;
      rec.status = r.status || "failed";
    }).catch(function () { rec.status = "failed"; rec.note = "unsupported"; });

    S.addFile = null; S.addPick = null;
    S.analysisStep = 0; S.analysisRunning = 0;
    S.screen = "analysis"; render();
  }
  function addPlanToCalendar() {
    var s = cur();
    var labels = [
      { es: L(s.name) + " · resumen + flashcards", en: L(s.name) + " · summary + flashcards" },
      { es: "Repaso de " + (L(s.weak)[0] || ""), en: "Review of " + (L(s.weak)[0] || "") },
      { es: "Flashcards de " + L(s.name), en: L(s.name) + " flashcards" },
      { es: "Test de práctica", en: "Practice test" },
      { es: "Repaso ligero", en: "Light review" }
    ];
    for (var i = 0; i < 5; i++) DB.calendar.push({ id: uid(), title: labels[i], subjectId: s.id, type: i === 3 ? "exercise" : i === 2 ? "review" : "study", date: isoDate(addDays(i + 1)), time: "", done: false });
    persist("calendar");
    toast(t("plan.added")); go2("calendar");
  }

  function gotoScreen(id) {
    if (id === "st-first") { S.dashFirst = 1; S.screen = "dashboard"; return render(); }
    if (id.indexOf("st-") === 0) { if (id === "st-empty-notes") S.variant = "empty"; if (id === "st-allclear") S.variant = "allclear"; S.screen = id; return render(); }
    if (id === "analysis") { S.analysisStep = 4; S.analysisRunning = 0; S.screen = "analysis"; return render(); }
    if (id === "ai") { S.convListView = 1; S.convId = null; AI_CTX = null; AI_ATTACH = null; S.attachMenu = 0; S.ctxPop = 0; S.screen = "ai"; return render(); }
    go(id);
  }

  var protoBar = document.getElementById("protoBar"), revealBtn = document.getElementById("revealBtn");
  document.getElementById("hideBtn").addEventListener("click", function () { protoBar.classList.add("hidden"); revealBtn.hidden = false; });
  revealBtn.addEventListener("click", function () { protoBar.classList.remove("hidden"); revealBtn.hidden = true; });

  /* ---- keyboard: presentation navigation ---- */
  document.addEventListener("keydown", function (e) {
    if (S.screen !== "toolFlow" || (S.toolStep || 0) !== 3 || S.tool !== "presentation") return;
    if (/^(INPUT|TEXTAREA)$/.test((e.target && e.target.tagName) || "")) return;
    if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
      e.preventDefault(); S.slideIdx = Math.min(deckLen() - 1, (S.slideIdx || 0) + 1); render(true);
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault(); S.slideIdx = Math.max(0, (S.slideIdx || 0) - 1); render(true);
    } else if (e.key === "Escape" && S.presMode) {
      S.presMode = 0; render(true);
      try { if (document.fullscreenElement) document.exitFullscreen(); } catch (err) {}
    } else if ((e.key === "f" || e.key === "F") && !S.presMode) {
      S.presMode = 1; render(true);
    }
  });

  /* ---- init ---- */
  try { window.ZynqoraSpeech = { normalize: normalizeScriptForSpeech, direction: addVoiceDirection }; } catch (e) {}
  speechInit();
  S.calMonth = new Date();
  S.obGoals = [];
  syncUser();
  try { window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () { applyAccent(); render(true); }); } catch (e) {}
  setVp("desktop");
  setTheme(DB.theme);
  setLang(DB.lang);
  setAccent(DB.accent);
  applyStatic();

  scroll.innerHTML = '<div class="view"><div class="app-splash"><span class="mk">' + icon("logo", 26) + "</span></div></div>";
  Store.open()
    .then(function () { return Store.available() ? Store.loadAll() : null; })
    .then(function (data) {
      var hasData = data && (data.state || (Array.isArray(data.subjects) && data.subjects.length));
      if (hasData) hydrate(data);
      else if (Store.available()) persistAll();          // primera vez: sembrar la base
      if (!Array.isArray(DB.documents) || !DB.documents.length) { migrateDocuments(); persist("documents"); }
      if (hasData && DB.onboardingDone && S.screen === "landing") S.screen = "dashboard";
    })
    .catch(function () {})
    .then(function () {
      setLang(DB.lang); applyAccent(); syncUser();
      render();
      try { window.addEventListener("beforeunload", function () { Store.flush(); }); } catch (e) {}
      try { window.addEventListener("pagehide", function () { Store.flush(); }); } catch (e) {}
    });
})();

