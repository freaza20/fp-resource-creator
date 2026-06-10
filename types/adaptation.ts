import type { ResourceBankItem } from "./resource-bank";
import type { TeachingResource } from "./resource";
import type { StudentGroup } from "./group";
import type {
  InstructionLanguagePreference,
  TeacherPreferences,
} from "./user";
import type { LearningTrack, SupportLevel } from "./vocational";

export type AdaptationMode =
  | "simplify"
  | "extend"
  | "change-context"
  | "increase-support"
  | "assessment-version";

export type AdaptationOptions = {
  mode: AdaptationMode;
  learningTrack: LearningTrack;
  supportLevel: SupportLevel;
  instructionLanguage: InstructionLanguagePreference;
  sessionMinutes: number;
  includeAnswerKey: boolean;
  adaptationGoal: string;
};

export type AdaptationRequest = {
  baseResource: ResourceBankItem;
  targetGroup: StudentGroup;
  teacherPreferences: TeacherPreferences;
  options: AdaptationOptions;
};

export type AdaptationResult = {
  id: string;
  adaptedResource: TeachingResource;
  baseResourceId: ResourceBankItem["id"];
  targetGroupId: StudentGroup["id"];
  changesApplied: string[];
  teacherNotes: string;
  requiresTeacherReview: boolean;
  createdAt: string;
};
