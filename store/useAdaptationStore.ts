"use client";

import { create } from "zustand";

import { adaptResourceMock } from "@/lib/adaptation/mock-adapter";
import type {
  AdaptationOptions,
  AdaptationResult,
} from "@/types/adaptation";
import type { ResourceBankItem } from "@/types/resource-bank";
import type { StudentGroup } from "@/types/group";
import type { TeacherPreferences } from "@/types/user";

type AdaptationStore = {
  selectedBaseResource: ResourceBankItem | null;
  selectedGroup: StudentGroup | null;
  options: AdaptationOptions | null;
  isAdapting: boolean;
  error: string | null;
  adaptationResult: AdaptationResult | null;
  selectBaseResource: (resource: ResourceBankItem) => void;
  setTargetGroup: (group: StudentGroup | null) => void;
  setOptions: (options: AdaptationOptions) => void;
  startAdaptation: (input: {
    teacherPreferences: TeacherPreferences;
  }) => Promise<AdaptationResult | null>;
  reset: () => void;
};

export const useAdaptationStore = create<AdaptationStore>((set, get) => ({
  selectedBaseResource: null,
  selectedGroup: null,
  options: null,
  isAdapting: false,
  error: null,
  adaptationResult: null,
  selectBaseResource: (resource) =>
    set({
      selectedBaseResource: resource,
      adaptationResult: null,
      error: null,
    }),
  setTargetGroup: (group) =>
    set({
      selectedGroup: group,
      adaptationResult: null,
      error: null,
    }),
  setOptions: (options) =>
    set({
      options,
      adaptationResult: null,
      error: null,
    }),
  startAdaptation: async ({ teacherPreferences }) => {
    const { options, selectedBaseResource, selectedGroup } = get();

    if (!selectedBaseResource || !selectedGroup || !options) {
      set({
        error: "Selecciona recurso base, grupo y opciones antes de adaptar.",
      });
      return null;
    }

    set({
      isAdapting: true,
      error: null,
    });

    try {
      const result = await adaptResourceMock({
        baseResource: selectedBaseResource,
        targetGroup: selectedGroup,
        teacherPreferences,
        options,
      });

      set({
        adaptationResult: result,
        isAdapting: false,
      });

      return result;
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "No se ha podido adaptar el recurso.",
        isAdapting: false,
      });

      return null;
    }
  },
  reset: () =>
    set({
      selectedBaseResource: null,
      selectedGroup: null,
      options: null,
      isAdapting: false,
      error: null,
      adaptationResult: null,
    }),
}));
