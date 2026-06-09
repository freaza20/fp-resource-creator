import type { EditorialTemplate } from "@/types/editorial-template";

export const editorialTemplates = [
  {
    id: "template-complaint-response",
    title: "Respuesta profesional a una queja",
    scenarioId: "customer-complaint",
    supportedFamilies: [
      "Comercio y Marketing",
      "Hostelería y Turismo",
      "Imagen Personal",
      "Informática y Comunicaciones",
      "Transporte y Mantenimiento de Vehículos",
    ],
    supportedLevels: ["A2-high", "B1-low", "B1", "B1-high"],
    learningTrack: "professional",
    defaultSupportLevel: "medium",
    resourceTypes: ["reading", "worksheet", "exam"],
    skillFocus: ["reading", "writing", "customer-service"],
    communicativeGoal:
      "Responder a una queja con disculpa, explicación breve y solución concreta.",
    teacherUseCase:
      "Útil para una sesión de writing funcional o para una prueba breve de atención al cliente.",
    adaptationNotes: [
      "Cambiar el problema por una situación propia de la familia profesional.",
      "Ajustar la complejidad de la explicación según el nivel lingüístico.",
      "Mantener siempre tono profesional y solución accionable.",
    ],
    baseStructure: [
      {
        title: "Input profesional",
        purpose: "Presentar la queja o incidencia desde el punto de vista del cliente.",
        suggestedTask: "Identificar problema, urgencia y expectativa del cliente.",
      },
      {
        title: "Lenguaje útil",
        purpose: "Activar fórmulas de disculpa, empatía, explicación y solución.",
        suggestedTask: "Clasificar frases por función comunicativa.",
      },
      {
        title: "Producción guiada",
        purpose: "Construir una respuesta completa con tono adecuado.",
        suggestedTask: "Redactar un email o mensaje profesional de 80-120 palabras.",
      },
    ],
  },
  {
    id: "template-supplier-order",
    title: "Pedido a proveedor",
    scenarioId: "supplier-order",
    supportedFamilies: [
      "Administración y Gestión",
      "Hostelería y Turismo",
      "Imagen Personal",
      "Industrias Alimentarias",
      "Agraria",
    ],
    supportedLevels: ["A2-low", "A2", "A2-high", "B1-low"],
    learningTrack: "professional",
    defaultSupportLevel: "medium",
    resourceTypes: ["worksheet", "exam"],
    skillFocus: ["writing", "vocabulary", "mediation"],
    communicativeGoal:
      "Solicitar productos, cantidades, condiciones y fecha de entrega por escrito.",
    teacherUseCase:
      "Especialmente útil para alumnado con poca autonomía escrita porque permite trabajar con plantillas.",
    adaptationNotes: [
      "Usar productos y unidades reales de la familia profesional.",
      "En A2-low ofrecer banco de frases y tabla de cantidades.",
      "En B1-low añadir negociación de plazo, precio o disponibilidad.",
    ],
    baseStructure: [
      {
        title: "Situación y lista de productos",
        purpose: "Definir necesidad profesional y vocabulario técnico.",
        suggestedTask: "Completar una tabla con producto, cantidad y prioridad.",
      },
      {
        title: "Modelo de email",
        purpose: "Mostrar estructura formal mínima.",
        suggestedTask: "Ordenar partes del email y completar huecos.",
      },
      {
        title: "Pedido final",
        purpose: "Producir una versión adaptada al contexto del ciclo.",
        suggestedTask: "Escribir el email final con saludo, pedido, pregunta y cierre.",
      },
    ],
  },
  {
    id: "template-technical-incident",
    title: "Incidencia técnica y pasos de resolución",
    scenarioId: "technical-incident",
    supportedFamilies: [
      "Electricidad y Electrónica",
      "Informática y Comunicaciones",
      "Instalación y Mantenimiento",
      "Transporte y Mantenimiento de Vehículos",
      "Fabricación Mecánica",
    ],
    supportedLevels: ["A2", "A2-high", "B1-low", "B1"],
    learningTrack: "professional",
    defaultSupportLevel: "medium",
    resourceTypes: ["listening", "worksheet", "exam"],
    skillFocus: ["listening", "speaking", "vocabulary"],
    communicativeGoal:
      "Describir una avería, hacer preguntas básicas y explicar una acción de seguimiento.",
    teacherUseCase:
      "Funciona bien como dramatización de soporte técnico o escucha con ficha de incidencia.",
    adaptationNotes: [
      "Incluir piezas, síntomas y acciones propias del sector.",
      "En niveles A2, limitar las instrucciones a pasos cortos.",
      "En B1, añadir hipótesis, causa probable y seguimiento.",
    ],
    baseStructure: [
      {
        title: "Ficha de incidencia",
        purpose: "Recoger datos esenciales de cliente, equipo y problema.",
        suggestedTask: "Completar la ficha tras leer o escuchar la conversación.",
      },
      {
        title: "Preguntas de diagnóstico",
        purpose: "Practicar preguntas simples para acotar la avería.",
        suggestedTask: "Relacionar pregunta, respuesta y posible causa.",
      },
      {
        title: "Resolución o escalado",
        purpose: "Explicar próximos pasos con lenguaje claro.",
        suggestedTask: "Simular una llamada breve entre técnico y cliente.",
      },
    ],
  },
  {
    id: "template-appointment-booking",
    title: "Gestión de cita o reserva",
    scenarioId: "appointment-booking",
    supportedFamilies: [
      "Hostelería y Turismo",
      "Imagen Personal",
      "Sanidad",
      "Actividades Físicas y Deportivas",
      "Textil, Confección y Piel",
    ],
    supportedLevels: ["A2-low", "A2", "A2-high"],
    learningTrack: "professional",
    defaultSupportLevel: "medium",
    resourceTypes: ["listening", "worksheet"],
    skillFocus: ["speaking", "writing", "customer-service"],
    communicativeGoal:
      "Confirmar disponibilidad, datos básicos, hora, servicio y cierre amable.",
    teacherUseCase:
      "Muy útil para grupos de FP Básica y Grado Medio porque genera interacción oral inmediata.",
    adaptationNotes: [
      "Usar agendas simples en A2-low.",
      "Añadir cambios de hora o petición especial en A2-high.",
      "Mantener turnos cortos y fórmulas repetibles.",
    ],
    baseStructure: [
      {
        title: "Solicitud del cliente",
        purpose: "Presentar el servicio solicitado y las restricciones de disponibilidad.",
        suggestedTask: "Extraer servicio, fecha preferida y dato pendiente.",
      },
      {
        title: "Agenda o disponibilidad",
        purpose: "Obligar a elegir o proponer alternativa realista.",
        suggestedTask: "Seleccionar la mejor hora y justificarla.",
      },
      {
        title: "Confirmación",
        purpose: "Cerrar la interacción de forma profesional.",
        suggestedTask: "Escribir o representar la confirmación final.",
      },
    ],
  },
  {
    id: "template-safety-instructions",
    title: "Instrucciones de seguridad en el puesto",
    scenarioId: "safety-instructions",
    supportedFamilies: [
      "Agraria",
      "Edificación y Obra Civil",
      "Electricidad y Electrónica",
      "Fabricación Mecánica",
      "Industrias Alimentarias",
      "Química",
      "Seguridad y Medio Ambiente",
    ],
    supportedLevels: ["A2", "A2-high", "B1-low"],
    learningTrack: "professional",
    defaultSupportLevel: "medium",
    resourceTypes: ["reading", "listening", "worksheet"],
    skillFocus: ["reading", "listening", "vocabulary"],
    communicativeGoal:
      "Comprender riesgos, equipo de protección y pasos obligatorios antes de una tarea.",
    teacherUseCase:
      "Encaja como actividad breve al inicio de una unidad técnica o como preparación para prácticas.",
    adaptationNotes: [
      "Usar señales, verbos imperativos y vocabulario visual.",
      "Evitar textos largos en A2; priorizar instrucciones numeradas.",
      "En B1-low añadir consecuencias, excepciones y reporte de incidentes.",
    ],
    baseStructure: [
      {
        title: "Normas clave",
        purpose: "Presentar instrucciones breves y accionables.",
        suggestedTask: "Relacionar norma con riesgo o imagen.",
      },
      {
        title: "Caso de riesgo",
        purpose: "Aplicar las normas a una situación concreta.",
        suggestedTask: "Decidir qué debe hacer el trabajador y explicar por qué.",
      },
      {
        title: "Checklist profesional",
        purpose: "Transferir el lenguaje a una herramienta de aula o taller.",
        suggestedTask: "Completar una checklist antes de iniciar la tarea.",
      },
    ],
  },
  {
    id: "template-service-explanation",
    title: "Explicación de servicio o procedimiento",
    scenarioId: "service-explanation",
    supportedFamilies: [
      "Comercio y Marketing",
      "Hostelería y Turismo",
      "Imagen Personal",
      "Informática y Comunicaciones",
      "Sanidad",
      "Transporte y Mantenimiento de Vehículos",
    ],
    supportedLevels: ["A2-high", "B1-low", "B1", "B1-high"],
    learningTrack: "professional",
    defaultSupportLevel: "medium",
    resourceTypes: ["reading", "worksheet", "exam"],
    skillFocus: ["speaking", "writing", "vocabulary"],
    communicativeGoal:
      "Explicar pasos, duración, condiciones y recomendaciones con orden y claridad.",
    teacherUseCase:
      "Sirve como puente entre vocabulario técnico y producción oral profesional.",
    adaptationNotes: [
      "Definir claramente quién escucha: cliente, paciente, usuario o compañero.",
      "Usar conectores de secuencia según nivel.",
      "Incluir una comprobación de comprensión al final.",
    ],
    baseStructure: [
      {
        title: "Servicio o procedimiento",
        purpose: "Presentar contexto y objetivo profesional.",
        suggestedTask: "Ordenar los pasos principales.",
      },
      {
        title: "Lenguaje de secuencia",
        purpose: "Practicar conectores y verbos de instrucción.",
        suggestedTask: "Completar frases con first, then, after that, finally.",
      },
      {
        title: "Explicación final",
        purpose: "Producir una explicación adaptada al interlocutor.",
        suggestedTask: "Grabar o representar una explicación breve.",
      },
    ],
  },
  {
    id: "template-foundation-workplace-basics",
    title: "Base FP Básica: supervivencia comunicativa laboral",
    scenarioId: "service-explanation",
    supportedFamilies: [
      "Administración y Gestión",
      "Comercio y Marketing",
      "Imagen Personal",
      "Instalación y Mantenimiento",
      "Transporte y Mantenimiento de Vehículos",
    ],
    supportedLevels: ["A2-low", "A2"],
    learningTrack: "foundation",
    defaultSupportLevel: "high",
    resourceTypes: ["worksheet", "listening"],
    skillFocus: ["speaking", "vocabulary", "listening"],
    communicativeGoal:
      "Practicar frases básicas para pedir ayuda, confirmar instrucciones y completar rutinas laborales simples.",
    teacherUseCase:
      "Diseñada para FP Básica dentro del Ámbito de Comunicación y Ciencias Sociales, con alumnado que necesita reconstruir bases de inglés.",
    adaptationNotes: [
      "Limitar cada recurso a una función comunicativa concreta.",
      "Usar frases modelo, repetición y cambios mínimos.",
      "Evitar producción larga; priorizar respuesta oral o escrita de una frase.",
    ],
    baseStructure: [
      {
        title: "Frases de supervivencia",
        purpose: "Dar lenguaje inmediatamente utilizable.",
        suggestedTask: "Relacionar frase con significado y repetir con apoyo visual.",
      },
      {
        title: "Cambio mínimo",
        purpose: "Practicar una estructura con vocabulario profesional.",
        suggestedTask: "Sustituir una palabra: tool, appointment, product, customer.",
      },
      {
        title: "Mini interacción",
        purpose: "Generar éxito rápido en expresión oral.",
        suggestedTask: "Dramatización de 2-4 turnos con tarjeta A/B.",
      },
    ],
  },
  {
    id: "template-foundation-functional-reading",
    title: "Base FP Básica: lectura funcional breve",
    scenarioId: "safety-instructions",
    supportedFamilies: [
      "Actividades Físicas y Deportivas",
      "Comercio y Marketing",
      "Electricidad y Electrónica",
      "Hostelería y Turismo",
      "Imagen Personal",
      "Instalación y Mantenimiento",
    ],
    supportedLevels: ["A2-low", "A2"],
    learningTrack: "foundation",
    defaultSupportLevel: "high",
    resourceTypes: ["reading", "worksheet"],
    skillFocus: ["reading", "vocabulary"],
    communicativeGoal:
      "Entender información laboral muy breve: horarios, señales, instrucciones, listas o mensajes.",
    teacherUseCase:
      "Útil para sesiones de 15-25 minutos con alumnado que necesita recuperar confianza lectora.",
    adaptationNotes: [
      "Usar tablas, listas, señales o mensajes cortos.",
      "Incluir una única estrategia: localizar dato, unir imagen-palabra o completar frase.",
      "Cerrar con una tarea observable y pequeña.",
    ],
    baseStructure: [
      {
        title: "Input breve",
        purpose: "Presentar un texto funcional de baja carga.",
        suggestedTask: "Localizar días, horas, objetos, lugares o acciones.",
      },
      {
        title: "Apoyo visual o tabla",
        purpose: "Reducir carga lingüística y aumentar comprensión.",
        suggestedTask: "Completar huecos con opciones dadas.",
      },
      {
        title: "Salida mínima",
        purpose: "Consolidar con una frase útil.",
        suggestedTask: "Escribir o decir una frase modelo adaptada.",
      },
    ],
  },
] satisfies EditorialTemplate[];
