"use client";

import { create } from "zustand";

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
  updatePreferences: (preferences: Partial<TeacherPreferences>) => void;
};

export const useSessionStore = create<SessionStore>((set) => ({
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
}));
