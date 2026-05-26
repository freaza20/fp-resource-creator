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

const familyContexts: Record<ProfessionalFamily, MockFamilyContext> = {
  "Administración y Gestión": {
    scenario:
      "an administrative assistant preparing an order email for a supplier",
    teacherFocus: "formal email structure, quantities and polite requests",
    defaultSkills: ["writing", "vocabulary", "mediation"],
  },
  "Comercio y Marketing": {
    scenario:
      "a customer service assistant replying to a complaint about a delayed order",
    teacherFocus: "apologies, solutions, follow-up and professional tone",
    defaultSkills: ["writing", "customer-service", "grammar"],
  },
  "Informática y Comunicaciones": {
    scenario:
      "a helpdesk technician supporting a user with a password and network issue",
    teacherFocus:
      "technical vocabulary, troubleshooting steps and professional interaction",
    defaultSkills: ["listening", "speaking", "vocabulary"],
  },
  "Hostelería y Turismo": {
    scenario:
      "a hotel receptionist confirming a booking and explaining arrival details",
    teacherFocus: "booking details, polite questions and guest information",
    defaultSkills: ["speaking", "writing", "customer-service"],
  },
  "Imagen Personal": {
    scenario:
      "a salon assistant confirming an appointment and suggesting a service",
    teacherFocus: "customer care, polite advice and service vocabulary",
    defaultSkills: ["speaking", "customer-service", "vocabulary"],
  },
};

const defaultFamily: ProfessionalFamily = "Administración y Gestión";

const resourceTitles: Record<ResourceType, string> = {
  reading: "Reading task",
  listening: "Listening script",
  worksheet: "Guided worksheet",
  exam: "Assessment pack",
};

const buildResourceContent = (
  request: AIResourceRequest,
  context: MockFamilyContext,
): string => {
  const vocabulary =
    request.vocabulary?.words.join(", ") ?? "professional workplace vocabulary";
  const grammar = request.grammar?.title ?? "teacher-selected grammar";
  const support =
    request.options.studentSupport === "high"
      ? "with sentence starters and model answers"
      : "with concise instructions and a short final task";

  const templates: Record<ResourceType, string> = {
    reading: `Reading for ${request.level}: ${context.scenario}. The text practises ${grammar} and recycles ${vocabulary}. Include gist questions, detail questions and a short professional response ${support}.`,
    listening: `Listening for ${request.level}: ${context.scenario}. Provide a natural script, pre-listening vocabulary, two gist questions and four detail questions. Focus on ${grammar} and ${context.teacherFocus}.`,
    worksheet: `Worksheet for ${request.level}: ${context.scenario}. Start with a warm-up, add controlled practice for ${grammar}, recycle ${vocabulary}, and finish with a workplace task ${support}.`,
    exam: `Exam for ${request.level}: ${context.scenario}. Include reading comprehension, vocabulary in context, grammar practice for ${grammar}, a writing prompt and brief correction criteria. Vocabulary focus: ${vocabulary}.`,
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
  const context = familyContexts[family];
  const generatedAt = new Date().toISOString();

  await new Promise((resolve) => setTimeout(resolve, 250));

  return {
    resource: {
      id: `generated-${request.resourceType}-${Date.now()}`,
      title: createResourceTitle(request, context),
      type: request.resourceType,
      professionalFamily: family,
      vocationalLevel: request.group?.vocationalLevel ?? "Grado Medio",
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
