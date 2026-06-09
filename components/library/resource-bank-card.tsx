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
  listening: "Escucha",
  reading: "Lectura",
  worksheet: "Ficha",
};

const learningTrackLabels: Record<ResourceBankItem["learningTrack"], string> = {
  foundation: "Base FP Básica",
  professional: "Profesional",
};

const skillLabels: Record<ResourceBankItem["skillFocus"][number], string> = {
  "customer-service": "Atención al cliente",
  grammar: "Gramática",
  listening: "Escucha",
  mediation: "Mediación",
  reading: "Lectura",
  speaking: "Oral",
  vocabulary: "Vocabulario",
  writing: "Escritura",
};

const joinClasses = (...classes: Array<string | false | undefined>): string =>
  classes.filter(Boolean).join(" ");

export function ResourceBankCard({
  isSelected = false,
  item,
  onSelect,
}: {
  isSelected?: boolean;
  item: ResourceBankItem;
  onSelect?: (item: ResourceBankItem) => void;
}) {
  const firstSection = item.content.sections[0];

  return (
    <Card
      className={joinClasses(
        "flex h-full flex-col transition-colors",
        onSelect &&
          "cursor-pointer hover:border-zinc-300 hover:bg-zinc-50/70 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/40",
        isSelected && "border-zinc-950 dark:border-zinc-50",
      )}
      onClick={() => onSelect?.(item)}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onKeyDown={(event) => {
        if (!onSelect) {
          return;
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(item);
        }
      }}
    >
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md border border-zinc-200 px-2 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
            {resourceTypeLabels[item.type]}
          </span>
          <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            {item.languageLevel}
          </span>
          <span className="rounded-md bg-sky-50 px-2 py-1 text-xs font-medium text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">
            {learningTrackLabels[item.learningTrack]}
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
              {skillLabels[skill]}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
