"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { mockUserProfile } from "@/lib/mock-data/user-profile";
import type { SubscriptionPlan } from "@/types/billing";
import type { TeacherPreferences, UserProfile } from "@/types/user";

type SessionStore = {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  loginMock: () => void;
  logoutMock: () => void;
  verifyPhoneMock: () => void;
  upgradePlanMock: (plan: Exclude<SubscriptionPlan, "free">) => void;
  consumeAiGenerationMock: () => boolean;
  updatePreferences: (preferences: Partial<TeacherPreferences>) => void;
};

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      currentUser: mockUserProfile,
      isAuthenticated: true,
      loginMock: () =>
        set({
          currentUser: mockUserProfile,
          isAuthenticated: true,
        }),
      logoutMock: () =>
        set({
          currentUser: null,
          isAuthenticated: false,
        }),
      verifyPhoneMock: () =>
        set((state) => {
          if (!state.currentUser) {
            return state;
          }

          return {
            currentUser: {
              ...state.currentUser,
              verification: {
                ...state.currentUser.verification,
                phoneVerified: true,
                phoneVerifiedAt: new Date().toISOString(),
              },
            },
          };
        }),
      upgradePlanMock: (plan) =>
        set((state) => {
          if (!state.currentUser) {
            return state;
          }

          return {
            currentUser: {
              ...state.currentUser,
              plan,
            },
          };
        }),
      consumeAiGenerationMock: () => {
        let consumed = false;

        set((state) => {
          if (!state.currentUser) {
            return state;
          }

          consumed = true;

          return {
            currentUser: {
              ...state.currentUser,
              usage: {
                ...state.currentUser.usage,
                aiGenerationsUsed: state.currentUser.usage.aiGenerationsUsed + 1,
              },
            },
          };
        });

        return consumed;
      },
      updatePreferences: (preferences) =>
        set((state) => {
          if (!state.currentUser) {
            return state;
          }

          return {
            currentUser: {
              ...state.currentUser,
              preferences: {
                ...state.currentUser.preferences,
                ...preferences,
              },
            },
          };
        }),
    }),
    {
      name: "teacher-ai-session",
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      }),
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
