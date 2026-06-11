"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { AIResourceRequest, AIResourceResponse } from "@/lib/ai/types";
import type { GenerationHistoryEvent } from "@/types/generation-history";
import type { UserProfile } from "@/types/user";

type GenerationHistoryStore = {
  events: GenerationHistoryEvent[];
  addSuccessEvent: (
    response: AIResourceResponse,
    request: AIResourceRequest,
    user?: UserProfile | null,
  ) => void;
  addErrorEvent: (
    errorMessage: string,
    request: AIResourceRequest,
    user?: UserProfile | null,
  ) => void;
  clearHistory: () => void;
  getTotalEstimatedCost: () => number;
};

const maxStoredEvents = 50;

const createBaseEvent = (
  request: AIResourceRequest,
  user?: UserProfile | null,
) => ({
  createdAt: new Date().toISOString(),
  languageLevel: request.level,
  professionalFamily: request.group?.professionalFamily ?? null,
  resourceType: request.resourceType,
  userId: user?.id ?? null,
});

export const useGenerationHistoryStore = create<GenerationHistoryStore>()(
  persist(
    (set, get) => ({
      events: [],
      addErrorEvent: (errorMessage, request, user) =>
        set((state) => {
          const event: GenerationHistoryEvent = {
            ...createBaseEvent(request, user),
            errorMessage,
            estimatedCostUsd: 0,
            estimatedInputTokens: 0,
            estimatedOutputTokens: 0,
            id: `generation-error-${Date.now()}`,
            model: "unknown",
            provider: "unknown",
            resourceId: null,
            resourceTitle: null,
            status: "error",
          };

          return {
            events: [event, ...state.events].slice(0, maxStoredEvents),
          };
        }),
      addSuccessEvent: (response, request, user) =>
        set((state) => {
          const event: GenerationHistoryEvent = {
            ...createBaseEvent(request, user),
            errorMessage: null,
            estimatedCostUsd: response.metadata.estimatedCostUsd,
            estimatedInputTokens: response.metadata.estimatedInputTokens,
            estimatedOutputTokens: response.metadata.estimatedOutputTokens,
            id: `generation-success-${Date.now()}`,
            model: response.model,
            provider: response.provider,
            resourceId: response.resource.id,
            resourceTitle: response.resource.title,
            status: "success",
          };

          return {
            events: [event, ...state.events].slice(0, maxStoredEvents),
          };
        }),
      clearHistory: () =>
        set({
          events: [],
        }),
      getTotalEstimatedCost: () =>
        get().events.reduce((sum, event) => sum + event.estimatedCostUsd, 0),
    }),
    {
      name: "teacher-ai-generation-history",
      partialize: (state) => ({
        events: state.events,
      }),
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
