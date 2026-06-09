import type {
  LanguageSublevel,
  LearningTrack,
  ProfessionalFamily,
  SkillFocus,
  SupportLevel,
  VocationalLevel,
} from "./vocational";

export type ResourceType = "reading" | "worksheet" | "listening" | "exam";

export type TeachingResource = {
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
  content: string;
  createdAt: string;
};
