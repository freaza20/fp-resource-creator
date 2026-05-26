"use client";

import { create } from "zustand";

import { studentGroups } from "@/lib/mock-data/groups";
import type { StudentGroup } from "@/types/group";

type GroupUpdates = Partial<Omit<StudentGroup, "id">>;

type GroupsStore = {
  groups: StudentGroup[];
  selectedGroup: StudentGroup | null;
  addGroup: (group: StudentGroup) => void;
  removeGroup: (groupId: StudentGroup["id"]) => void;
  updateGroup: (groupId: StudentGroup["id"], updates: GroupUpdates) => void;
  selectGroup: (groupId: StudentGroup["id"] | null) => void;
};

export const useGroupsStore = create<GroupsStore>((set, get) => ({
  groups: [...studentGroups],
  selectedGroup: null,
  addGroup: (group) =>
    set((state) => ({
      groups: [...state.groups, group],
    })),
  removeGroup: (groupId) =>
    set((state) => ({
      groups: state.groups.filter((group) => group.id !== groupId),
      selectedGroup:
        state.selectedGroup?.id === groupId ? null : state.selectedGroup,
    })),
  updateGroup: (groupId, updates) =>
    set((state) => {
      const groups = state.groups.map((group) =>
        group.id === groupId ? { ...group, ...updates } : group,
      );

      return {
        groups,
        selectedGroup:
          state.selectedGroup?.id === groupId
            ? groups.find((group) => group.id === groupId) ?? null
            : state.selectedGroup,
      };
    }),
  selectGroup: (groupId) =>
    set({
      selectedGroup:
        groupId === null
          ? null
          : get().groups.find((group) => group.id === groupId) ?? null,
    }),
}));
