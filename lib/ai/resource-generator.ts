import { buildExamPrompt } from "@/lib/ai/prompts/exam-prompts";
import { buildListeningPrompt } from "@/lib/ai/prompts/listening-prompts";
import { buildReadingPrompt } from "@/lib/ai/prompts/reading-prompts";
import { buildWorksheetPrompt } from "@/lib/ai/prompts/worksheet-prompts";
import { getAIProvider } from "@/lib/ai/providers";
import { getConfiguredProviderId } from "@/lib/ai/providers/provider-config";
import { professionalScenarios } from "@/lib/mock-data/professional-scenarios";
import type {
  AIResourceRequest,
  AIResourceResponse,
  GenerationValidationResult,
  PromptTemplateInput,
  ResourceGenerationOptions,
  ResourceType,
} from "@/lib/ai/types";

export const defaultGenerationOptions: ResourceGenerationOptions = {
  difficulty: "standard",
  durationMinutes: 50,
  includeAnswerKey: true,
  includeTeacherNotes: true,
  studentSupport: "medium",
};

const promptBuilders: Record<
  ResourceType,
  (input: PromptTemplateInput) => string
> = {
  reading: buildReadingPrompt,
  listening: buildListeningPrompt,
  worksheet: buildWorksheetPrompt,
  exam: buildExamPrompt,
};

export function validateGenerationOptions(
  options: ResourceGenerationOptions,
): GenerationValidationResult {
  const errors: string[] = [];

  if (options.durationMinutes < 10 || options.durationMinutes > 120) {
    errors.push("La duración debe estar entre 10 y 120 minutos.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

const getPrimaryScenarioTitle = (request: AIResourceRequest): string => {
  const scenarioId = request.group?.scenarios[0] ?? request.vocabulary?.scenario;

  return (
    professionalScenarios.find((scenario) => scenario.id === scenarioId)?.title ??
    "Situación profesional pendiente de seleccionar"
  );
};

const createPromptTemplateInput = (
  request: AIResourceRequest,
): PromptTemplateInput => ({
  cycleName: request.group?.cycleName ?? "Ciclo pendiente",
  familyName: request.group?.professionalFamily ?? "Familia profesional pendiente",
  groupName: request.group?.name ?? "Grupo sin seleccionar",
  level: request.level,
  scenarioTitle: getPrimaryScenarioTitle(request),
  vocationalLevel: request.group?.vocationalLevel ?? "Nivel de FP pendiente",
  grammarTitle: request.grammar?.title ?? "Gramática pendiente de seleccionar",
  grammarExplanation:
    request.grammar?.explanation ??
    "El docente definirá el foco gramatical antes de usar el recurso.",
  vocabularyTitle:
    request.vocabulary?.title ?? "Vocabulario pendiente de seleccionar",
  vocabularyWords: request.vocabulary?.words ?? [
    "workplace language",
    "professional instructions",
    "customer interaction",
  ],
  options: request.options,
});

export function preparePrompt(request: AIResourceRequest): string {
  return promptBuilders[request.resourceType](createPromptTemplateInput(request));
}

export async function generateResource(
  request: AIResourceRequest,
): Promise<AIResourceResponse> {
  const validation = validateGenerationOptions(request.options);

  if (!validation.valid) {
    throw new Error(validation.errors.join(" "));
  }

  const prompt = preparePrompt(request);
  const provider = getAIProvider(getConfiguredProviderId());

  return provider.generateResource(request, {
    prompt,
    requestId: `${provider.id}-request-${Date.now()}`,
  });
}
