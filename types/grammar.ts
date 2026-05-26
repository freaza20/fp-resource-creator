import type {
  LanguageSublevel,
  ProfessionalFamily,
  SkillFocus,
} from "./vocational";

export type GrammarTopic = {
  id: string;
  title: string;
  level: LanguageSublevel;
  professionalFamily: ProfessionalFamily | "Transversal";
  skillFocus: SkillFocus[];
  explanation: string;
};
