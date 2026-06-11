import type {
  AIEvaluationCase,
  AIEvaluationCriterion,
} from "@/types/ai-evaluation";

export const aiEvaluationCases = [
  {
    id: "fp-basic-ask-for-help-a2-low",
    title: "FP Básica: pedir ayuda en el trabajo",
    professionalFamily: "Administración y Gestión",
    vocationalLevel: "FP Básica",
    learningTrack: "foundation",
    languageLevel: "A2-low",
    resourceType: "worksheet",
    skillFocus: ["speaking", "vocabulary"],
    scenario:
      "Un alumno en prácticas no entiende una instrucción sencilla y necesita pedir ayuda de forma educada.",
    teacherGoal:
      "Reforzar bases comunicativas con frases modelo, repetición guiada y éxito rápido.",
    expectedOutput:
      "Microficha con instrucciones en español, frases modelo en inglés, práctica oral breve y apoyo alto.",
    estimatedInputTokens: 1_700,
    estimatedOutputTokens: 1_200,
  },
  {
    id: "commerce-customer-complaint-b1-low",
    title: "Grado Medio Comercio: responder a una queja",
    professionalFamily: "Comercio y Marketing",
    vocationalLevel: "Grado Medio",
    learningTrack: "professional",
    languageLevel: "B1-low",
    resourceType: "reading",
    skillFocus: ["writing", "customer-service"],
    scenario:
      "Un cliente reclama que su pedido llegó incompleto y espera una respuesta profesional.",
    teacherGoal:
      "Practicar disculpas, soluciones, tono profesional y estructura de email.",
    expectedOutput:
      "Lectura o modelo de email con análisis de tono, vocabulario funcional y tarea de respuesta.",
    estimatedInputTokens: 2_100,
    estimatedOutputTokens: 1_600,
  },
  {
    id: "it-helpdesk-phone-call-a2-high",
    title: "Grado Medio Informática: llamada de soporte técnico",
    professionalFamily: "Informática y Comunicaciones",
    vocationalLevel: "Grado Medio",
    learningTrack: "professional",
    languageLevel: "A2-high",
    resourceType: "listening",
    skillFocus: ["listening", "vocabulary", "speaking"],
    scenario:
      "Un técnico de soporte atiende a un usuario que no puede acceder a su cuenta.",
    teacherGoal:
      "Trabajar pasos de resolución, vocabulario técnico básico y preguntas de comprobación.",
    expectedOutput:
      "Guion de escucha natural, preguntas de comprensión y role play breve con apoyo medio.",
    estimatedInputTokens: 2_000,
    estimatedOutputTokens: 1_500,
  },
  {
    id: "hairdressing-appointment-a2",
    title: "Grado Medio Imagen Personal: confirmar una cita",
    professionalFamily: "Imagen Personal",
    vocationalLevel: "Grado Medio",
    learningTrack: "professional",
    languageLevel: "A2",
    resourceType: "worksheet",
    skillFocus: ["speaking", "customer-service", "vocabulary"],
    scenario:
      "Una clienta pide una cita en una peluquería y pregunta por un tratamiento sencillo.",
    teacherGoal:
      "Practicar disponibilidad, horarios, recomendaciones educadas y vocabulario de servicios.",
    expectedOutput:
      "Ficha guiada con diálogo modelo, sustitución controlada y producción oral por parejas.",
    estimatedInputTokens: 1_900,
    estimatedOutputTokens: 1_400,
  },
  {
    id: "tourism-booking-special-request-b1",
    title: "Grado Superior Turismo: reserva y petición especial",
    professionalFamily: "Hostelería y Turismo",
    vocationalLevel: "Grado Superior",
    learningTrack: "professional",
    languageLevel: "B1",
    resourceType: "exam",
    skillFocus: ["writing", "mediation", "customer-service"],
    scenario:
      "Un huésped confirma una reserva y solicita late check-in, habitación tranquila y opciones sin gluten.",
    teacherGoal:
      "Evaluar comprensión de datos, mediación breve y respuesta escrita profesional.",
    expectedOutput:
      "Prueba breve con comprensión, vocabulario funcional, tarea escrita y rúbrica de corrección.",
    estimatedInputTokens: 2_400,
    estimatedOutputTokens: 2_000,
  },
] satisfies AIEvaluationCase[];

export const aiEvaluationCriteria = [
  {
    id: "teacher-utility",
    label: "Utilidad docente real",
    description:
      "El recurso se puede llevar al aula con poca edición y responde a una necesidad habitual de FP.",
    weight: 25,
  },
  {
    id: "language-level",
    label: "Control del nivel lingüístico",
    description:
      "Respeta el subnivel A2-low a B1-high sin simplificar de más ni subir la dificultad.",
    weight: 20,
  },
  {
    id: "fp-context",
    label: "Contexto profesional FP",
    description:
      "La situación laboral, vocabulario y tarea final encajan con la familia profesional.",
    weight: 18,
  },
  {
    id: "foundation-support",
    label: "Tratamiento de FP Básica",
    description:
      "Cuando el caso es foundation, ofrece microtareas, apoyo alto y recuperación de bases.",
    weight: 15,
  },
  {
    id: "structured-output",
    label: "Salida estructurada",
    description:
      "Devuelve JSON válido, estable y fácil de transformar en recurso guardable.",
    weight: 12,
  },
  {
    id: "cost-control",
    label: "Coste y escalabilidad",
    description:
      "El coste por recurso permite un modelo freemium con margen y límites razonables.",
    weight: 10,
  },
] satisfies AIEvaluationCriterion[];
