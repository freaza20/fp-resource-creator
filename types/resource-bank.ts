import type { ResourceType } from "./resource";
import type {
  LanguageSublevel,
  LearningTrack,
  ProfessionalFamily,
  SkillFocus,
  SupportLevel,
  VocationalLevel,
} from "./vocational";

export type ResourceBankSection = {
  title: string;
  body: string;
  tasks?: string[];
};

export type ResourceBankSource = {
  generatedBy: "codex" | "human" | "import";
  reviewed: boolean;
  createdAt: string;
};

export type ResourceBankContent = {
  studentInstructions: string;
  teacherNotes?: string;
  sections: ResourceBankSection[];
  answerKey?: string[];
};

export type ResourceBankItem = {
  id: string;
  title: string;
  type: ResourceType;
  professionalFamily: ProfessionalFamily;
  vocationalLevel: VocationalLevel;
  learningTrack: LearningTrack;
  supportLevel: SupportLevel;
  languageLevel: LanguageSublevel;
  scenario: string;
  skillFocus: SkillFocus[];
  estimatedMinutes: number;
  content: ResourceBankContent;
  tags: string[];
  source: ResourceBankSource;
};

export type ResourceBankValidationResult = {
  valid: boolean;
  errors: string[];
};

export type ResourceBankCoverageCell = {
  professionalFamily: ProfessionalFamily;
  languageLevel: LanguageSublevel;
  count: number;
};

export type ResourceBankCoverageSummary = {
  totalResources: number;
  totalFamilies: number;
  coveredFamilies: number;
  uncoveredFamilies: ProfessionalFamily[];
  coverageByLearningTrack: Array<{
    learningTrack: LearningTrack;
    count: number;
  }>;
  coverageBySupportLevel: Array<{
    supportLevel: SupportLevel;
    count: number;
  }>;
  coverageByFamily: Array<{
    professionalFamily: ProfessionalFamily;
    count: number;
  }>;
  coverageByLevel: Array<{
    languageLevel: LanguageSublevel;
    count: number;
  }>;
  coverageByResourceType: Array<{
    type: ResourceType;
    count: number;
  }>;
  matrix: ResourceBankCoverageCell[];
};
