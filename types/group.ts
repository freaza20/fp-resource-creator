import type { GrammarTopic } from "./grammar";
import type {
  LanguageSublevel,
  ProfessionalFamily,
  VocationalLevel,
} from "./vocational";
import type { VocabularySet } from "./vocabulary";

export type VocationalGroup = {
  id: string;
  name: string;
  vocationalLevel: VocationalLevel;
  professionalFamily: ProfessionalFamily;
  cycleName: string;
  languageLevel: LanguageSublevel;
  publisher: string;
  grammarTopics: GrammarTopic["id"][];
  vocabularySets: VocabularySet["id"][];
  scenarios: string[];
};

export type StudentGroup = VocationalGroup;
