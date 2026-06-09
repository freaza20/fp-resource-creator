import type { ResourceType } from "./resource";
import type {
  LanguageSublevel,
  ProfessionalFamily,
  SkillFocus,
} from "./vocational";

export type EditorialTemplateStep = {
  title: string;
  purpose: string;
  suggestedTask: string;
};

export type EditorialTemplate = {
  id: string;
  title: string;
  scenarioId: string;
  supportedFamilies: ProfessionalFamily[];
  supportedLevels: LanguageSublevel[];
  resourceTypes: ResourceType[];
  skillFocus: SkillFocus[];
  communicativeGoal: string;
  teacherUseCase: string;
  adaptationNotes: string[];
  baseStructure: EditorialTemplateStep[];
};
