"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResourcesStore } from "@/store/useResourcesStore";
import type { ResourceType } from "@/types/resource";

const resourceTypeLabels: Record<ResourceType, string> = {
  reading: "Lectura",
  worksheet: "Ficha",
  listening: "Escucha",
  exam: "Prueba",
};

const resourceTypeStyles: Record<ResourceType, string> = {
  reading: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
  worksheet:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
  listening:
    "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
  exam: "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300",
};

const formatDate = (date: string): string =>
  new Intl.DateTimeFormat("es", {
    day: "2-digit",
    month: "short",
  }).format(new Date(date));

const formatResourceContent = (content: unknown): string => {
  if (typeof content === "string") {
    return content;
  }

  if (content && typeof content === "object") {
    return Object.values(content)
      .map((value) => (typeof value === "string" ? value : JSON.stringify(value)))
      .join(" ");
  }

  return "";
};

export function RecentResources() {
  const resources = useResourcesStore((state) => state.resources);
  const duplicateResource = useResourcesStore((state) => state.duplicateResource);
  const recentResources = resources.slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle>Recursos FP recientes</CardTitle>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Materiales listos para revisar, adaptar o reutilizar por familia.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentResources.map((resource) => (
          <article
            className="rounded-md border border-zinc-100 p-3 transition-colors hover:border-zinc-200 hover:bg-zinc-50 dark:border-zinc-900 dark:hover:border-zinc-800 dark:hover:bg-zinc-900/60"
            key={resource.id}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ${resourceTypeStyles[resource.type]}`}
                  >
                    {resourceTypeLabels[resource.type]}
                  </span>
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {resource.languageLevel}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {resource.professionalFamily}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {formatDate(resource.createdAt)}
                  </span>
                </div>
                <h3 className="truncate text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                  {resource.title}
                </h3>
                <p className="line-clamp-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                  {formatResourceContent(resource.content)}
                </p>
              </div>
              <button
                className="shrink-0 rounded-md px-2.5 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                onClick={() => duplicateResource(resource.id)}
                type="button"
              >
                Duplicar
              </button>
            </div>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
