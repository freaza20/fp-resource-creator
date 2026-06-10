import type { GrammarTopic } from "@/types/grammar";
import type { StudentGroup } from "@/types/group";
import type {
  ResourceType as AppResourceType,
  TeachingResource,
} from "@/types/resource";
import type { LanguageSublevel } from "@/types/vocational";
import type { VocabularySet } from "@/types/vocabulary";

export type ResourceType = AppResourceType;

export type DifficultyLevel = "foundation" | "standard" | "challenge";

export type AIProviderId = "mock" | "openai";

export type AIModelId =
  | "mock-education-generator-v1"
  | "gpt-5-nano"
  | "provider-model-pending";

export type ResourceGenerationOptions = {
  difficulty: DifficultyLevel;
  durationMinutes: number;
  includeAnswerKey: boolean;
  includeTeacherNotes: boolean;
  studentSupport: "low" | "medium" | "high";
};

export type AIResourceRequest = {
  group: StudentGroup | null;
  level: LanguageSublevel;
  grammar: GrammarTopic | null;
  vocabulary: VocabularySet | null;
  resourceType: ResourceType;
  options: ResourceGenerationOptions;
};

export type AIResourceResponse = {
  resource: TeachingResource;
  prompt: string;
  provider: AIProviderId;
  model: AIModelId;
  metadata: {
    generatedAt: string;
    difficulty: DifficultyLevel;
    durationMinutes: number;
    estimatedInputTokens: number;
    estimatedOutputTokens: number;
    estimatedCostUsd: number;
    requiresTeacherReview: boolean;
  };
};

export type AIResourceApiRequest = {
  request: AIResourceRequest;
  user?: {
    id: string;
    plan: string;
    phoneVerified: boolean;
    aiGenerationsUsed: number;
  };
};

export type AIResourceApiResponse =
  | {
      ok: true;
      data: AIResourceResponse;
    }
  | {
      ok: false;
      error: {
        code:
          | "invalid-request"
          | "usage-limit"
          | "provider-error"
          | "unknown-error";
        message: string;
      };
    };

export type PromptTemplateInput = {
  cycleName: string;
  familyName: string;
  groupName: string;
  level: LanguageSublevel;
  scenarioTitle: string;
  vocationalLevel: string;
  grammarTitle: string;
  grammarExplanation: string;
  vocabularyTitle: string;
  vocabularyWords: string[];
  options: ResourceGenerationOptions;
};

export type GenerationValidationResult = {
  valid: boolean;
  errors: string[];
};
