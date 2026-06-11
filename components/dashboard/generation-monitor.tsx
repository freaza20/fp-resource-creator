import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AIResourceResponse } from "@/lib/ai/types";

type GenerationStatus = "idle" | "generating" | "success" | "error";

type GenerationMonitorProps = {
  error: string | null;
  response: AIResourceResponse | null;
  status: GenerationStatus;
};

const providerLabels: Record<AIResourceResponse["provider"], string> = {
  mistral: "Mistral",
  mock: "Mock local",
  openai: "OpenAI",
};

const statusLabels: Record<GenerationStatus, string> = {
  error: "Error",
  generating: "Generando",
  idle: "En espera",
  success: "Completado",
};

const statusClasses: Record<GenerationStatus, string> = {
  error: "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300",
  generating:
    "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  idle: "bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300",
  success:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
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

export function GenerationMonitor({
  error,
  response,
  status,
}: GenerationMonitorProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>Monitor IA</CardTitle>
          <CardDescription>
            Última generación, proveedor, tokens y coste estimado.
          </CardDescription>
        </div>
        <span
          className={`rounded-md px-2 py-1 text-xs font-medium ${statusClasses[status]}`}
        >
          {statusLabels[status]}
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </div>
        ) : null}

        {response ? (
          <>
            <div className="rounded-md border border-zinc-100 p-3 dark:border-zinc-900">
              <p className="text-xs font-medium uppercase text-zinc-400">
                Recurso creado
              </p>
              <p className="mt-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                {response.resource.title}
              </p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {providerLabels[response.provider]} · {response.model}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Metric
                label="Entrada"
                value={`${response.metadata.estimatedInputTokens} tokens`}
              />
              <Metric
                label="Salida"
                value={`${response.metadata.estimatedOutputTokens} tokens`}
              />
              <Metric
                label="Coste estimado"
                value={formatUsd(response.metadata.estimatedCostUsd)}
              />
              <Metric
                label="Generado"
                value={formatDateTime(response.metadata.generatedAt)}
              />
            </div>

            <div className="rounded-md bg-zinc-50 p-3 text-sm leading-6 text-zinc-500 dark:bg-zinc-900/70 dark:text-zinc-400">
              Revisión docente obligatoria antes de usar en aula.
            </div>
          </>
        ) : (
          <div className="rounded-md border border-dashed border-zinc-200 p-4 text-sm leading-6 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            Genera un recurso de prueba para ver aquí los metadatos de Mistral o
            del proveedor activo.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-zinc-50 p-3 dark:bg-zinc-900/70">
      <p className="text-xs font-medium text-zinc-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
        {value}
      </p>
    </div>
  );
}
