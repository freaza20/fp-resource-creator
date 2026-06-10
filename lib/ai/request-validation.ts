import { getPlanDefinition } from "@/lib/billing/usage";
import type {
  AIResourceApiRequest,
  AIResourceRequest,
  GenerationValidationResult,
  ResourceGenerationOptions,
  ResourceType,
} from "@/lib/ai/types";

const resourceTypes = ["reading", "worksheet", "listening", "exam"] as const;
const difficulties = ["foundation", "standard", "challenge"] as const;
const supportLevels = ["low", "medium", "high"] as const;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isResourceType = (value: unknown): value is ResourceType =>
  typeof value === "string" &&
  resourceTypes.includes(value as (typeof resourceTypes)[number]);

const isGenerationOptions = (
  value: unknown,
): value is ResourceGenerationOptions => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.durationMinutes === "number" &&
    typeof value.includeAnswerKey === "boolean" &&
    typeof value.includeTeacherNotes === "boolean" &&
    typeof value.difficulty === "string" &&
    typeof value.studentSupport === "string" &&
    difficulties.includes(value.difficulty as (typeof difficulties)[number]) &&
    supportLevels.includes(value.studentSupport as (typeof supportLevels)[number])
  );
};

export function isAIResourceRequest(value: unknown): value is AIResourceRequest {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isResourceType(value.resourceType) &&
    typeof value.level === "string" &&
    isGenerationOptions(value.options) &&
    ("group" in value || value.group === undefined) &&
    ("grammar" in value || value.grammar === undefined) &&
    ("vocabulary" in value || value.vocabulary === undefined)
  );
}

export function parseAIResourceApiRequest(
  body: unknown,
): AIResourceApiRequest | null {
  if (!isRecord(body) || !isAIResourceRequest(body.request)) {
    return null;
  }

  const user = isRecord(body.user)
    ? {
        id: String(body.user.id ?? ""),
        plan: String(body.user.plan ?? "free"),
        phoneVerified: Boolean(body.user.phoneVerified),
        aiGenerationsUsed: Number(body.user.aiGenerationsUsed ?? 0),
      }
    : undefined;

  return {
    request: body.request,
    user,
  };
}

export function validateApiGenerationRequest(
  payload: AIResourceApiRequest,
): GenerationValidationResult {
  const errors: string[] = [];

  if (!payload.request.group) {
    errors.push("Selecciona un grupo antes de generar.");
  }

  if (payload.request.options.durationMinutes < 10) {
    errors.push("La duración mínima es de 10 minutos.");
  }

  if (payload.request.options.durationMinutes > 120) {
    errors.push("La duración máxima es de 120 minutos.");
  }

  if (payload.user) {
    const plan = getPlanDefinition(
      payload.user.plan === "pro" || payload.user.plan === "school"
        ? payload.user.plan
        : "free",
    );

    if (plan.limits.requiresPhoneForAi && !payload.user.phoneVerified) {
      errors.push("Verifica el teléfono para activar generaciones IA.");
    }

    if (payload.user.aiGenerationsUsed >= plan.limits.aiGenerationsPerMonth) {
      errors.push("Has alcanzado el límite mensual de generaciones IA.");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
