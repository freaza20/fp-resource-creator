import type { ResourceType } from "@/types/resource";
import type {
  LanguageSublevel,
  ProfessionalFamily,
  SkillFocus,
  VocationalLevel,
} from "@/types/vocational";

export const resourceTypes = [
  "reading",
  "worksheet",
  "listening",
  "exam",
] satisfies ResourceType[];

export const professionalFamilies = [
  "Actividades Físicas y Deportivas",
  "Administración y Gestión",
  "Agraria",
  "Artes Gráficas",
  "Artes y Artesanías",
  "Comercio y Marketing",
  "Edificación y Obra Civil",
  "Electricidad y Electrónica",
  "Energía y Agua",
  "Fabricación Mecánica",
  "Informática y Comunicaciones",
  "Hostelería y Turismo",
  "Imagen Personal",
  "Imagen y Sonido",
  "Industrias Alimentarias",
  "Industrias Extractivas",
  "Instalación y Mantenimiento",
  "Madera, Mueble y Corcho",
  "Marítimo-Pesquera",
  "Química",
  "Sanidad",
  "Seguridad y Medio Ambiente",
  "Servicios Socioculturales y a la Comunidad",
  "Textil, Confección y Piel",
  "Transporte y Mantenimiento de Vehículos",
  "Vidrio y Cerámica",
] satisfies ProfessionalFamily[];

export const vocationalLevels = [
  "FP Básica",
  "Grado Medio",
  "Grado Superior",
] satisfies VocationalLevel[];

export const languageSublevels = [
  "A2-low",
  "A2",
  "A2-high",
  "B1-low",
  "B1",
  "B1-high",
] satisfies LanguageSublevel[];

export const skillFocusOptions = [
  "reading",
  "writing",
  "listening",
  "speaking",
  "mediation",
  "vocabulary",
  "grammar",
  "customer-service",
] satisfies SkillFocus[];
