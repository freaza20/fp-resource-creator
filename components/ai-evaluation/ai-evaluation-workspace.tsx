import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { aiEvaluationCases, aiEvaluationCriteria } from "@/lib/mock-data/ai-evaluation-cases";
import { aiModelCandidates } from "@/lib/mock-data/ai-model-candidates";
import { formatUsd } from "@/lib/ai-evaluation/cost-estimator";
import { rankModelCandidates } from "@/lib/ai-evaluation/recommendation";
import type {
  AIEvaluationCase,
  AIModelCandidate,
  AIModelEvaluationSummary,
} from "@/types/ai-evaluation";

const statusLabels: Record<AIModelCandidate["status"], string> = {
  alternativa: "Alternativa",
  comparativa: "Comparativa",
  descartable: "Referencia",
  principal: "Principal",
};

const statusClasses: Record<AIModelCandidate["status"], string> = {
  alternativa:
    "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  comparativa:
    "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300",
  descartable:
    "bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300",
  principal:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
};

const resourceTypeLabels: Record<AIEvaluationCase["resourceType"], string> = {
  exam: "Prueba",
  listening: "Escucha",
  reading: "Lectura",
  worksheet: "Ficha",
};

export function AIEvaluationWorkspace() {
  const summaries = rankModelCandidates(aiModelCandidates);
  const topCandidate = summaries[0];
  const totalWeight = aiEvaluationCriteria.reduce(
    (sum, criterion) => sum + criterion.weight,
    0,
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/20">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Evaluación interna IA
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
              Benchmark preparatorio de modelos para Inglés Profesional FP.
            </h1>
            <p className="mt-4 text-sm leading-6 text-zinc-500 dark:text-zinc-400 sm:text-base">
              Esta pantalla compara proveedores por coste, encaje pedagógico y
              riesgo antes de conectar ninguna API real. Los resultados son
              estimaciones y sirven para decidir qué modelos probar primero.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Recomendación provisional
            </p>
            <p className="mt-1 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
              {topCandidate?.candidate.modelName ?? "Pendiente"}
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              {topCandidate?.recommendation ??
                "Añade candidatos para calcular la recomendación."}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard
          label="Modelos candidatos"
          value={aiModelCandidates.length.toString()}
          description="Incluye OpenAI, Anthropic, Mistral, Google, DeepSeek y Groq."
        />
        <MetricCard
          label="Casos FP"
          value={aiEvaluationCases.length.toString()}
          description="Cubren FP Básica, Grado Medio y Grado Superior."
        />
        <MetricCard
          label="Rúbrica"
          value={`${totalWeight}%`}
          description="Ponderación docente para valorar outputs reales."
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_420px]">
        <Card>
          <CardHeader>
            <CardTitle>Ranking provisional</CardTitle>
            <CardDescription>
              Ordenado por coste, encaje esperado y riesgo de integración.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {summaries.map((summary, index) => (
              <ModelSummaryCard index={index} key={summary.candidate.id} summary={summary} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rúbrica docente</CardTitle>
            <CardDescription>
              Criterios que usaremos cuando generemos outputs reales.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiEvaluationCriteria.map((criterion) => (
              <div
                className="rounded-md border border-zinc-100 p-3 dark:border-zinc-900"
                key={criterion.id}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                    {criterion.label}
                  </p>
                  <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
                    {criterion.weight}%
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                  {criterion.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Casos de prueba</CardTitle>
            <CardDescription>
              Escenarios que después ejecutaremos contra proveedores reales.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 lg:grid-cols-2">
              {aiEvaluationCases.map((evaluationCase) => (
                <EvaluationCaseCard
                  evaluationCase={evaluationCase}
                  key={evaluationCase.id}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
        No hay ninguna API real conectada en esta fase. La siguiente decisión
        será elegir 2 o 3 modelos para ejecutar pruebas reales con presupuesto
        bajo y límites estrictos desde servidor.
      </section>
    </div>
  );
}

function MetricCard({
  description,
  label,
  value,
}: {
  description: string;
  label: string;
  value: string;
}) {
  return (
    <Card className="p-5">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold text-zinc-950 dark:text-zinc-50">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
        {description}
      </p>
    </Card>
  );
}

function ModelSummaryCard({
  index,
  summary,
}: {
  index: number;
  summary: AIModelEvaluationSummary;
}) {
  const { candidate } = summary;

  return (
    <article className="rounded-md border border-zinc-100 p-4 dark:border-zinc-900">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-zinc-950 px-2 py-1 text-xs font-medium text-white dark:bg-zinc-50 dark:text-zinc-950">
              #{index + 1}
            </span>
            <span
              className={`rounded-md px-2 py-1 text-xs font-medium ${statusClasses[candidate.status]}`}
            >
              {statusLabels[candidate.status]}
            </span>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {candidate.provider}
            </span>
          </div>
          <h2 className="mt-3 text-base font-semibold text-zinc-950 dark:text-zinc-50">
            {candidate.modelName}
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            {candidate.recommendedUse}
          </p>
        </div>

        <div className="grid min-w-[180px] grid-cols-2 gap-2 text-sm">
          <CostBox label="1 recurso" value={formatUsd(summary.averageCostPerCaseUsd)} />
          <CostBox
            label="1.000 recursos"
            value={formatUsd(summary.estimatedCostPerThousandResourcesUsd, 2)}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <SignalList items={candidate.strengths} title="Fortalezas" />
        <SignalList items={candidate.risks} title="Riesgos" />
      </div>
    </article>
  );
}

function CostBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-zinc-50 p-3 dark:bg-zinc-900/70">
      <p className="text-xs font-medium text-zinc-400">{label}</p>
      <p className="mt-1 font-semibold text-zinc-950 dark:text-zinc-50">
        {value}
      </p>
    </div>
  );
}

function SignalList({ items, title }: { items: string[]; title: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase text-zinc-400">{title}</p>
      <ul className="mt-2 space-y-1.5 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function EvaluationCaseCard({
  evaluationCase,
}: {
  evaluationCase: AIEvaluationCase;
}) {
  return (
    <article className="rounded-md border border-zinc-100 p-4 dark:border-zinc-900">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
          {evaluationCase.languageLevel}
        </span>
        <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
          {resourceTypeLabels[evaluationCase.resourceType]}
        </span>
        <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
          {evaluationCase.learningTrack}
        </span>
      </div>

      <h3 className="mt-3 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
        {evaluationCase.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
        {evaluationCase.scenario}
      </p>
      <div className="mt-3 rounded-md bg-zinc-50 p-3 dark:bg-zinc-900/70">
        <p className="text-xs font-medium uppercase text-zinc-400">
          Objetivo docente
        </p>
        <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          {evaluationCase.teacherGoal}
        </p>
      </div>
    </article>
  );
}
