import type {
  AIResourceRequest,
  AIResourceResponse,
  ResourceType,
} from "@/lib/ai/types";
import type { ProfessionalFamily, SkillFocus } from "@/types/vocational";

type MockFamilyContext = {
  scenario: string;
  teacherFocus: string;
  defaultSkills: SkillFocus[];
};

const familyContexts: Partial<Record<ProfessionalFamily, MockFamilyContext>> = {
  "Administración y Gestión": {
    scenario:
      "un auxiliar administrativo prepara un email de pedido para un proveedor",
    teacherFocus: "estructura formal de email, cantidades y peticiones educadas",
    defaultSkills: ["writing", "vocabulary", "mediation"],
  },
  "Comercio y Marketing": {
    scenario:
      "un auxiliar de atención al cliente responde a una queja por un pedido retrasado",
    teacherFocus: "disculpas, soluciones, seguimiento y tono profesional",
    defaultSkills: ["writing", "customer-service", "grammar"],
  },
  "Informática y Comunicaciones": {
    scenario:
      "un técnico de soporte ayuda a un usuario con una contraseña y una incidencia de red",
    teacherFocus:
      "vocabulario técnico, pasos de resolución e interacción profesional",
    defaultSkills: ["listening", "speaking", "vocabulary"],
  },
  "Hostelería y Turismo": {
    scenario:
      "un recepcionista de hotel confirma una reserva y explica detalles de llegada",
    teacherFocus: "datos de reserva, preguntas educadas e información del huésped",
    defaultSkills: ["speaking", "writing", "customer-service"],
  },
  "Imagen Personal": {
    scenario:
      "un auxiliar de peluquería confirma una cita y recomienda un servicio",
    teacherFocus: "atención al cliente, consejos educados y vocabulario de servicios",
    defaultSkills: ["speaking", "customer-service", "vocabulary"],
  },
};

const defaultFamily: ProfessionalFamily = "Administración y Gestión";

const resourceTitles: Record<ResourceType, string> = {
  reading: "Actividad de lectura",
  listening: "Guion de escucha",
  worksheet: "Ficha guiada",
  exam: "Prueba de evaluación",
};

const buildResourceContent = (
  request: AIResourceRequest,
  context: MockFamilyContext,
): string => {
  const vocabulary =
    request.vocabulary?.words.join(", ") ?? "vocabulario profesional";
  const grammar = request.grammar?.title ?? "gramática seleccionada por el docente";
  const support =
    request.options.studentSupport === "high"
      ? "con inicios de frase y modelos de respuesta"
      : "con instrucciones breves y una tarea final corta";

  const templates: Record<ResourceType, string> = {
    reading: `Lectura para ${request.level}: ${context.scenario}. El texto practica ${grammar} y reutiliza ${vocabulary}. Incluye preguntas globales, preguntas de detalle y una respuesta profesional breve ${support}.`,
    listening: `Escucha para ${request.level}: ${context.scenario}. Incluye un guion natural, vocabulario previo, dos preguntas globales y cuatro preguntas de detalle. Enfoque: ${grammar} y ${context.teacherFocus}.`,
    worksheet: `Ficha para ${request.level}: ${context.scenario}. Empieza con activación breve, añade práctica controlada de ${grammar}, reutiliza ${vocabulary} y termina con una tarea profesional ${support}.`,
    exam: `Prueba para ${request.level}: ${context.scenario}. Incluye comprensión, vocabulario en contexto, práctica gramatical de ${grammar}, una tarea escrita y criterios breves de corrección. Vocabulario: ${vocabulary}.`,
  };

  return templates[request.resourceType];
};

const createResourceTitle = (
  request: AIResourceRequest,
  context: MockFamilyContext,
): string => {
  const familyName = request.group?.professionalFamily ?? defaultFamily;

  return `${resourceTitles[request.resourceType]} · ${familyName} · ${context.teacherFocus}`;
};

export async function requestMockAIResource(
  request: AIResourceRequest,
  prompt: string,
): Promise<AIResourceResponse> {
  const family = request.group?.professionalFamily ?? defaultFamily;
  const context = familyContexts[family] ?? familyContexts[defaultFamily];
  const generatedAt = new Date().toISOString();
  const vocationalLevel = request.group?.vocationalLevel ?? "Grado Medio";
  const learningTrack = vocationalLevel === "FP Básica" ? "foundation" : "professional";

  if (!context) {
    throw new Error("No se ha podido preparar el contexto mock de IA.");
  }

  await new Promise((resolve) => setTimeout(resolve, 250));

  return {
    resource: {
      id: `generated-${request.resourceType}-${Date.now()}`,
      title: createResourceTitle(request, context),
      type: request.resourceType,
      professionalFamily: family,
      vocationalLevel,
      learningTrack,
      supportLevel:
        learningTrack === "foundation"
          ? "high"
          : request.options.studentSupport === "high"
            ? "high"
            : "medium",
      languageLevel: request.level,
      scenario:
        request.group?.scenarios[0] ??
        request.vocabulary?.scenario ??
        "supplier-order-email",
      skillFocus:
        request.grammar?.skillFocus ??
        request.vocabulary?.skillFocus ??
        context.defaultSkills,
      content: buildResourceContent(request, context),
      createdAt: generatedAt,
    },
    prompt,
    provider: "mock",
    model: "mock-education-generator-v1",
    metadata: {
      generatedAt,
      difficulty: request.options.difficulty,
      durationMinutes: request.options.durationMinutes,
      requiresTeacherReview: true,
    },
  };
}
