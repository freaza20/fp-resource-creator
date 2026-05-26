export type ProfessionalFamily =
  | "Administración y Gestión"
  | "Comercio y Marketing"
  | "Informática y Comunicaciones"
  | "Hostelería y Turismo"
  | "Imagen Personal";

export type VocationalLevel = "FP Básica" | "Grado Medio" | "Grado Superior";

export type LanguageSublevel =
  | "A2-low"
  | "A2"
  | "A2-high"
  | "B1-low"
  | "B1"
  | "B1-high";

export type SkillFocus =
  | "reading"
  | "writing"
  | "listening"
  | "speaking"
  | "mediation"
  | "vocabulary"
  | "grammar"
  | "customer-service";

export type ProfessionalFamilyProfile = {
  id: string;
  name: ProfessionalFamily;
  description: string;
  commonScenarios: string[];
};

export type ProfessionalScenario = {
  id: string;
  title: string;
  professionalFamily: ProfessionalFamily;
  description: string;
  suggestedLevels: LanguageSublevel[];
  skillFocus: SkillFocus[];
};
