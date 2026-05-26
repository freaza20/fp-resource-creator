"use client";

import { Card } from "@/components/ui/card";
import { grammarTopics } from "@/lib/mock-data/grammar";
import { vocabularySets } from "@/lib/mock-data/vocabulary";
import { useGeneratorStore } from "@/store/useGeneratorStore";
import type { ResourceType } from "@/types/resource";

const resourceTypes: ResourceType[] = ["reading", "worksheet", "listening", "exam"];

export function QuickGenerator() {
  const selectedResourceType = useGeneratorStore(
    (state) => state.selectedResourceType,
  );
  const setSelectedGrammar = useGeneratorStore(
    (state) => state.setSelectedGrammar,
  );
  const setSelectedVocabulary = useGeneratorStore(
    (state) => state.setSelectedVocabulary,
  );
  const setSelectedResourceType = useGeneratorStore(
    (state) => state.setSelectedResourceType,
  );

  const currentResourceType = selectedResourceType ?? "reading";

  return (
    <Card className="p-5" id="generator">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            Generador FP
          </p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Ajusta el tipo de recurso para una situación profesional.
          </p>
        </div>
        <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
          Mock IA
        </span>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label className="text-xs font-medium uppercase text-zinc-400">
            Tipo de recurso
          </label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {resourceTypes.map((type) => (
              <button
                className={`rounded-md border px-3 py-2 text-sm font-medium capitalize transition-colors ${
                  currentResourceType === type
                    ? "border-zinc-950 bg-zinc-950 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-950"
                    : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900"
                }`}
                key={type}
                onClick={() => setSelectedResourceType(type)}
                type="button"
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          <button
            className="rounded-md border border-zinc-200 p-3 text-left transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            onClick={() => setSelectedGrammar(grammarTopics[2] ?? null)}
            type="button"
          >
            <span className="text-xs font-medium text-zinc-400">
              Función comunicativa
            </span>
            <span className="mt-1 block text-sm font-semibold text-zinc-950 dark:text-zinc-50">
              Modals for advice and safety rules
            </span>
          </button>
          <button
            className="rounded-md border border-zinc-200 p-3 text-left transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            onClick={() => setSelectedVocabulary(vocabularySets[2] ?? null)}
            type="button"
          >
            <span className="text-xs font-medium text-zinc-400">
              Banco recomendado
            </span>
            <span className="mt-1 block text-sm font-semibold text-zinc-950 dark:text-zinc-50">
              IT support and troubleshooting
            </span>
          </button>
        </div>
      </div>
    </Card>
  );
}
