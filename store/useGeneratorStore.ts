"use client";

import { create } from "zustand";

import type { GrammarTopic } from "@/types/grammar";
import type { StudentGroup } from "@/types/group";
import type { ResourceType } from "@/types/resource";
import type { LanguageSublevel } from "@/types/vocational";
import type { VocabularySet } from "@/types/vocabulary";

type GeneratorStore = {
  selectedGroup: StudentGroup | null;
  selectedLevel: LanguageSublevel | null;
  selectedGrammar: GrammarTopic | null;
  selectedVocabulary: VocabularySet | null;
  selectedResourceType: ResourceType | null;
  setSelectedGroup: (group: StudentGroup | null) => void;
  setSelectedLevel: (level: LanguageSublevel | null) => void;
  setSelectedGrammar: (grammar: GrammarTopic | null) => void;
  setSelectedVocabulary: (vocabulary: VocabularySet | null) => void;
  setSelectedResourceType: (resourceType: ResourceType | null) => void;
};

export const useGeneratorStore = create<GeneratorStore>((set) => ({
  selectedGroup: null,
  selectedLevel: null,
  selectedGrammar: null,
  selectedVocabulary: null,
  selectedResourceType: null,
  setSelectedGroup: (selectedGroup) => set({ selectedGroup }),
  setSelectedLevel: (selectedLevel) => set({ selectedLevel }),
  setSelectedGrammar: (selectedGrammar) => set({ selectedGrammar }),
  setSelectedVocabulary: (selectedVocabulary) => set({ selectedVocabulary }),
  setSelectedResourceType: (selectedResourceType) =>
    set({ selectedResourceType }),
}));
