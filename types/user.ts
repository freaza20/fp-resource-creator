import type { SubscriptionPlan, UsageSnapshot } from "./billing";
import type {
  LearningTrack,
  ProfessionalFamily,
  SupportLevel,
  VocationalLevel,
} from "./vocational";

export type UserRole = "teacher" | "school-admin" | "admin";

export type VerificationStatus = {
  emailVerified: boolean;
  phoneVerified: boolean;
  emailVerifiedAt?: string;
  phoneVerifiedAt?: string;
};

export type InstructionLanguagePreference = "spanish" | "english" | "mixed";

export type GenerationStyle =
  | "guided"
  | "communicative"
  | "assessment"
  | "vocabulary-first";

export type TeacherPreferences = {
  defaultFamilies: ProfessionalFamily[];
  vocationalLevels: VocationalLevel[];
  defaultLearningTrack: LearningTrack;
  defaultSupportLevel: SupportLevel;
  defaultSessionMinutes: number;
  instructionLanguage: InstructionLanguagePreference;
  generationStyle: GenerationStyle;
  prioritisedSkills: string[];
  fpBasicNotes: string;
  professionalTrackNotes: string;
};

export type UserProfile = {
  id: string;
  email: string;
  phone?: string;
  fullName: string;
  role: UserRole;
  schoolName?: string;
  autonomousRegion?: string;
  plan: SubscriptionPlan;
  verification: VerificationStatus;
  usage: UsageSnapshot;
  preferences: TeacherPreferences;
  createdAt: string;
};

export type SessionState = {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
};
