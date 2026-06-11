"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGenerationHistoryStore } from "@/store/useGenerationHistoryStore";
import type { GenerationHistoryEvent } from "@/types/generation-history";

const providerLabels: Record<GenerationHistoryEvent["provider"], string> = {
  mistral: "Mistral",
  mock: "Mock local",
  openai: "OpenAI",
  unknown: "Desconocido",
};

const statusClasses: Record<GenerationHistoryEvent["status"], string> = {
  error: "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300",
  success:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
};

const statusLabels: Record<GenerationHistoryEvent["status"], string> = {
  error: "Error",
  success: "OK",
};

const formatUsd = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 6,
    minimumFractionDigits: 4,
    style: "currency",
  }).format(value);

const formatDateTime = (date: string): string =>
  new Intl.DateTimeFormat("es", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
  }).format(new Date(date));

export function GenerationHistory() {
  const events = useGenerationHistoryStore((state) => state.events);
  const clearHistory = useGenerationHistoryStore((state) => state.clearHistory);
  const totalEstimatedCost = events.reduce(
    (sum, event) => sum + event.estimatedCostUsd,
    0,
  );
  const latestEvents = events.slice(0, 6);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>Historial IA</CardTitle>
          <CardDescription>
            Registro local de pruebas, errores y coste estimado.
          </CardDescription>
        </div>
        <button
          className="rounded-md px-2.5 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-950 disabled:pointer-events-none disabled:opacity-40 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
          disabled={events.length === 0}
          onClick={clearHistory}
          type="button"
        >
          Limpiar
        </button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <SummaryBox label="Eventos" value={events.length.toString()} />
          <SummaryBox label="Coste total" value={formatUsd(totalEstimatedCost)} />
        </div>

        {latestEvents.length > 0 ? (
          <div className="space-y-2">
            {latestEvents.map((event) => (
              <HistoryEventRow event={event} key={event.id} />
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-zinc-200 p-4 text-sm leading-6 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            Aún no hay eventos registrados. La próxima generación guardará aquí
            proveedor, modelo, tokens, coste y estado.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SummaryBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-zinc-50 p-3 dark:bg-zinc-900/70">
      <p className="text-xs font-medium text-zinc-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
        {value}
      </p>
    </div>
  );
}

function HistoryEventRow({ event }: { event: GenerationHistoryEvent }) {
  return (
    <article className="rounded-md border border-zinc-100 p-3 dark:border-zinc-900">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-md px-2 py-1 text-xs font-medium ${statusClasses[event.status]}`}
            >
              {statusLabels[event.status]}
            </span>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {providerLabels[event.provider]} · {event.model}
            </span>
          </div>
          <p className="mt-2 truncate text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            {event.resourceTitle ?? event.errorMessage ?? "Generación sin título"}
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            {event.languageLevel} · {event.resourceType} ·{" "}
            {formatDateTime(event.createdAt)}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            {formatUsd(event.estimatedCostUsd)}
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            {event.estimatedInputTokens + event.estimatedOutputTokens} tokens
          </p>
        </div>
      </div>
    </article>
  );
}
