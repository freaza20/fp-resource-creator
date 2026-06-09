export type ProfessionalFamily =
  | "Actividades Físicas y Deportivas"
  | "Administración y Gestión"
  | "Agraria"
  | "Artes Gráficas"
  | "Artes y Artesanías"
  | "Comercio y Marketing"
  | "Edificación y Obra Civil"
  | "Electricidad y Electrónica"
  | "Energía y Agua"
  | "Fabricación Mecánica"
  | "Informática y Comunicaciones"
  | "Hostelería y Turismo"
  | "Imagen Personal"
  | "Imagen y Sonido"
  | "Industrias Alimentarias"
  | "Industrias Extractivas"
  | "Instalación y Mantenimiento"
  | "Madera, Mueble y Corcho"
  | "Marítimo-Pesquera"
  | "Química"
  | "Sanidad"
  | "Seguridad y Medio Ambiente"
  | "Servicios Socioculturales y a la Comunidad"
  | "Textil, Confección y Piel"
  | "Transporte y Mantenimiento de Vehículos"
  | "Vidrio y Cerámica";

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

export type EditorialPriority = "core" | "secondary" | "specialized";

export type ProfessionalCommunicationDomain =
  | "administration"
  | "customer-service"
  | "technical-support"
  | "sales"
  | "safety"
  | "healthcare"
  | "tourism"
  | "maintenance"
  | "production"
  | "education-care"
  | "creative-services"
  | "environment";

export type ProfessionalFamilyProfile = {
  id: string;
  name: ProfessionalFamily;
  description: string;
  priority: EditorialPriority;
  communicationDomains: ProfessionalCommunicationDomain[];
  commonScenarios: string[];
  vocabularyAreas: string[];
};

export type ProfessionalScenario = {
  id: string;
  title: string;
  description: string;
  applicableFamilies: ProfessionalFamily[];
  suggestedLevels: LanguageSublevel[];
  skillFocus: SkillFocus[];
  communicativeGoal: string;
  suggestedResourceTypes: Array<"reading" | "worksheet" | "listening" | "exam">;
  exampleContexts: string[];
};
