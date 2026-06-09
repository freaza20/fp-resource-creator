import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ResourceBankItem } from "@/types/resource-bank";

const resourceTypeLabels: Record<ResourceBankItem["type"], string> = {
  exam: "Examen",
  listening: "Listening",
  reading: "Reading",
  worksheet: "Worksheet",
};

export function ResourceBankCard({ item }: { item: ResourceBankItem }) {
  const firstSection = item.content.sections[0];

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md border border-zinc-200 px-2 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
            {resourceTypeLabels[item.type]}
          </span>
          <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            {item.languageLevel}
          </span>
          <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
            Revisado
          </span>
        </div>
        <CardTitle className="text-base">{item.title}</CardTitle>
        <CardDescription>{item.scenario}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
            Contexto
          </p>
          <div className="grid gap-2 text-sm text-zinc-600 dark:text-zinc-300">
            <p>{item.professionalFamily}</p>
            <p>
              {item.vocationalLevel} · {item.estimatedMinutes} min
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
            Primera actividad
          </p>
          <p className="line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            {firstSection.body}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          {item.skillFocus.map((skill) => (
            <span
              className="rounded-md bg-zinc-50 px-2 py-1 text-xs text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400"
              key={skill}
            >
              {skill}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
