import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DashboardIcon, SparkIcon } from "@/components/ui/icons";

type DashboardHeroProps = {
  activeGroupName: string;
  generationError: string | null;
  grammarTitle: string;
  isGenerating: boolean;
  vocabularyTitle: string;
  onGenerateResource: () => void | Promise<void>;
};

export function DashboardHero({
  activeGroupName,
  generationError,
  grammarTitle,
  isGenerating,
  vocabularyTitle,
  onGenerateResource,
}: DashboardHeroProps) {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Dashboard FP
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
              Inglés profesional para ciclos de Formación Profesional.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-500 dark:text-zinc-400 sm:text-base">
              Organiza grupos, familias profesionales y escenarios laborales
              para generar recursos adaptados desde A2-low hasta B1-high.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button disabled={isGenerating} onClick={onGenerateResource}>
              <SparkIcon />
              {isGenerating ? "Generando..." : "Generar recurso demo"}
            </Button>
            <Button variant="secondary">
              <DashboardIcon />
              Revisar biblioteca
            </Button>
          </div>
        </div>
        {generationError ? (
          <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
            {generationError}
          </p>
        ) : null}
      </div>

      <div className="grid gap-0 divide-y divide-zinc-200 dark:divide-zinc-800 md:grid-cols-3 md:divide-x md:divide-y-0">
        <div className="p-5">
          <p className="text-xs font-medium uppercase text-zinc-400">
            Grupo activo
          </p>
          <p className="mt-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            {activeGroupName}
          </p>
        </div>
        <div className="p-5">
          <p className="text-xs font-medium uppercase text-zinc-400">
            Enfoque actual
          </p>
          <p className="mt-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            {grammarTitle}
          </p>
        </div>
        <div className="p-5">
          <p className="text-xs font-medium uppercase text-zinc-400">
            Vocabulario
          </p>
          <p className="mt-2 truncate text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            {vocabularyTitle}
          </p>
        </div>
      </div>
    </Card>
  );
}
