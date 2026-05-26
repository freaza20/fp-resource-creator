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
  provider: "mock";
  model: "mock-education-generator-v1";
  metadata: {
    generatedAt: string;
    difficulty: DifficultyLevel;
    durationMinutes: number;
    requiresTeacherReview: boolean;
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
