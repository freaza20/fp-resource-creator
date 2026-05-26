import type {
  LanguageSublevel,
  ProfessionalFamily,
  SkillFocus,
} from "./vocational";

export type VocabularyCategory =
  | "supplier-communication"
  | "customer-service"
  | "technical-support"
  | "hospitality-service"
  | "salon-services"
  | "workplace-safety";

export type VocabularySet = {
  id: string;
  title: string;
  category: VocabularyCategory;
  professionalFamily: ProfessionalFamily;
  scenario: string;
  level: LanguageSublevel;
  skillFocus: SkillFocus[];
  words: string[];
};
