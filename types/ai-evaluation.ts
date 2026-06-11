import type { ResourceType } from "@/types/resource";
import type {
  LanguageSublevel,
  LearningTrack,
  ProfessionalFamily,
  SkillFocus,
  VocationalLevel,
} from "@/types/vocational";

export type AIProviderName =
  | "OpenAI"
  | "Anthropic"
  | "Mistral"
  | "Google"
  | "DeepSeek"
  | "Groq";

export type AIModelCandidateStatus =
  | "principal"
  | "alternativa"
  | "comparativa"
  | "descartable";

export type AIModelCandidate = {
  id: string;
  provider: AIProviderName;
  modelName: string;
  apiModelId: string;
  inputPricePerMillionTokensUsd: number;
  outputPricePerMillionTokensUsd: number;
  contextWindowTokens: number | null;
  strengths: string[];
  risks: string[];
  recommendedUse: string;
  status: AIModelCandidateStatus;
  sourceUrl: string;
};

export type AIEvaluationCase = {
  id: string;
  title: string;
  professionalFamily: ProfessionalFamily;
  vocationalLevel: VocationalLevel;
  learningTrack: LearningTrack;
  languageLevel: LanguageSublevel;
  resourceType: ResourceType;
  skillFocus: SkillFocus[];
  scenario: string;
  teacherGoal: string;
  expectedOutput: string;
  estimatedInputTokens: number;
  estimatedOutputTokens: number;
};

export type AIEvaluationCriterion = {
  id: string;
  label: string;
  description: string;
  weight: number;
};

export type AICostEstimate = {
  inputCostUsd: number;
  outputCostUsd: number;
  totalCostUsd: number;
};

export type AIModelEvaluationSummary = {
  candidate: AIModelCandidate;
  averageCostPerCaseUsd: number;
  totalBenchmarkCostUsd: number;
  estimatedCostPerThousandResourcesUsd: number;
  weightedScore: number;
  recommendation: string;
};
