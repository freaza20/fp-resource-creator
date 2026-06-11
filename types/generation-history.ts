import type { AIModelId, AIProviderId, ResourceType } from "@/lib/ai/types";
import type { LanguageSublevel, ProfessionalFamily } from "@/types/vocational";

export type GenerationEventStatus = "success" | "error";

export type GenerationHistoryEvent = {
  id: string;
  userId: string | null;
  status: GenerationEventStatus;
  provider: AIProviderId | "unknown";
  model: AIModelId | "unknown";
  resourceId: string | null;
  resourceTitle: string | null;
  resourceType: ResourceType;
  professionalFamily: ProfessionalFamily | null;
  languageLevel: LanguageSublevel;
  estimatedInputTokens: number;
  estimatedOutputTokens: number;
  estimatedCostUsd: number;
  errorMessage: string | null;
  createdAt: string;
};
