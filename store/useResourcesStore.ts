"use client";

import { create } from "zustand";

import { teachingResources } from "@/lib/mock-data/resources";
import type { TeachingResource } from "@/types/resource";

type ResourcesStore = {
  resources: TeachingResource[];
  addResource: (resource: TeachingResource) => void;
  deleteResource: (resourceId: TeachingResource["id"]) => void;
  duplicateResource: (resourceId: TeachingResource["id"]) => void;
};

const createDuplicatedResource = (
  resource: TeachingResource,
): TeachingResource => ({
  ...resource,
  id: `${resource.id}-copy-${Date.now()}`,
  title: `${resource.title} (copy)`,
  createdAt: new Date().toISOString(),
});

export const useResourcesStore = create<ResourcesStore>((set, get) => ({
  resources: [...teachingResources],
  addResource: (resource) =>
    set((state) => ({
      resources: [resource, ...state.resources],
    })),
  deleteResource: (resourceId) =>
    set((state) => ({
      resources: state.resources.filter((resource) => resource.id !== resourceId),
    })),
  duplicateResource: (resourceId) => {
    const resource = get().resources.find((item) => item.id === resourceId);

    if (!resource) {
      return;
    }

    set((state) => ({
      resources: [createDuplicatedResource(resource), ...state.resources],
    }));
  },
}));
