import type {
  LanguageSublevel,
  ProfessionalFamily,
  SkillFocus,
  VocationalLevel,
} from "./vocational";

export type ResourceType = "reading" | "worksheet" | "listening" | "exam";

export type TeachingResource = {
  id: string;
  title: string;
  type: ResourceType;
  professionalFamily: ProfessionalFamily;
  vocationalLevel: VocationalLevel;
  languageLevel: LanguageSublevel;
  scenario: string;
  skillFocus: SkillFocus[];
  content: string;
  createdAt: string;
};
