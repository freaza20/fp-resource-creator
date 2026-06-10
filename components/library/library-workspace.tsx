"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ResourceBankCard } from "@/components/library/resource-bank-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  languageSublevels,
  learningTracks,
  professionalFamilies,
  resourceTypes,
  skillFocusOptions,
  supportLevels,
} from "@/lib/resource-bank/constants";
import type {
  ResourceBankCoverageSummary,
  ResourceBankItem,
} from "@/types/resource-bank";
import { useAdaptationStore } from "@/store/useAdaptationStore";

type LibraryWorkspaceProps = {
  coverage: ResourceBankCoverageSummary;
  items: ResourceBankItem[];
};

type LibraryFilters = {
  family: string;
  level: string;
  learningTrack: string;
  query: string;
  resourceType: string;
  skill: string;
  supportLevel: string;
};

const defaultFilters: LibraryFilters = {
  family: "all",
  level: "all",
  learningTrack: "all",
  query: "",
  resourceType: "all",
  skill: "all",
  supportLevel: "all",
};

const resourceTypeLabels: Record<ResourceBankItem["type"], string> = {
  exam: "Examen",
  listening: "Escucha",
  reading: "Lectura",
  worksheet: "Ficha",
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

const learningTrackLabels: Record<ResourceBankItem["learningTrack"], string> = {
  foundation: "Base FP Básica",
  professional: "Profesional",
};

const supportLevelLabels: Record<ResourceBankItem["supportLevel"], string> = {
  high: "Alto",
  low: "Bajo",
  medium: "Medio",
};

export function LibraryWorkspace({ coverage, items }: LibraryWorkspaceProps) {
  const router = useRouter();
  const selectBaseResource = useAdaptationStore(
    (state) => state.selectBaseResource,
  );
  const [filters, setFilters] = useState<LibraryFilters>(defaultFilters);
  const [selectedItemId, setSelectedItemId] = useState(items[0]?.id ?? "");

  const filteredItems = useMemo(() => {
    const normalizedQuery = filters.query.trim().toLowerCase();

    return items.filter((item) => {
      const searchableText = [
        item.title,
        item.scenario,
        item.professionalFamily,
        item.vocationalLevel,
        item.languageLevel,
        item.learningTrack,
        item.supportLevel,
        item.tags.join(" "),
        item.skillFocus.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return (
        (filters.family === "all" ||
          item.professionalFamily === filters.family) &&
        (filters.level === "all" || item.languageLevel === filters.level) &&
        (filters.learningTrack === "all" ||
          item.learningTrack === filters.learningTrack) &&
        (filters.resourceType === "all" || item.type === filters.resourceType) &&
        (filters.skill === "all" ||
          item.skillFocus.includes(filters.skill as never)) &&
        (filters.supportLevel === "all" ||
          item.supportLevel === filters.supportLevel) &&
        (normalizedQuery.length === 0 ||
          searchableText.includes(normalizedQuery))
      );
    });
  }, [filters, items]);

  const selectedItem =
    filteredItems.find((item) => item.id === selectedItemId) ??
    filteredItems[0] ??
    items[0];

  const updateFilter = (key: keyof LibraryFilters, value: string) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const handleUseAsBase = (item: ResourceBankItem) => {
    selectBaseResource(item);
    router.push("/adapt");
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
      <div className="flex min-w-0 flex-col gap-4">
        <LibraryFiltersPanel
          filters={filters}
          onReset={resetFilters}
          onUpdate={updateFilter}
          resultCount={filteredItems.length}
        />

        <section className="grid gap-4 md:grid-cols-2">
          {filteredItems.map((item) => (
            <ResourceBankCard
              isSelected={item.id === selectedItem?.id}
              item={item}
              key={item.id}
              onSelect={(nextItem) => setSelectedItemId(nextItem.id)}
            />
          ))}
        </section>

        {filteredItems.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No hay recursos con esos filtros</CardTitle>
              <CardDescription>
                Prueba a ampliar familia, nivel o tipo de recurso. Este hueco
                también puede servir como prioridad editorial para la próxima
                tanda de recursos.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : null}
      </div>

      <aside className="flex flex-col gap-4 xl:sticky xl:top-6 xl:self-start">
        {selectedItem ? (
          <ResourceDetailPanel item={selectedItem} onUseAsBase={handleUseAsBase} />
        ) : null}
        <CoveragePanel coverage={coverage} />
      </aside>
    </div>
  );
}

function LibraryFiltersPanel({
  filters,
  onReset,
  onUpdate,
  resultCount,
}: {
  filters: LibraryFilters;
  onReset: () => void;
  onUpdate: (key: keyof LibraryFilters, value: string) => void;
  resultCount: number;
}) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <CardTitle>Explorar biblioteca</CardTitle>
            <CardDescription>
              {resultCount} recurso(s) coinciden con los criterios actuales.
            </CardDescription>
          </div>
          <button
            className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-200 px-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
            onClick={onReset}
            type="button"
          >
            Limpiar filtros
          </button>
        </div>
      </CardHeader>

      <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium text-zinc-700 dark:text-zinc-200">
            Búsqueda
          </span>
          <input
            className="h-10 rounded-md border border-zinc-200 bg-white px-3 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-600"
            onChange={(event) => onUpdate("query", event.target.value)}
            placeholder="Queja, reserva, soporte..."
            type="search"
            value={filters.query}
          />
        </label>

        <FilterSelect
          label="Familia"
          onChange={(value) => onUpdate("family", value)}
          options={professionalFamilies.map((family) => ({
            label: family,
            value: family,
          }))}
          value={filters.family}
        />

        <FilterSelect
          label="Nivel"
          onChange={(value) => onUpdate("level", value)}
          options={languageSublevels.map((level) => ({
            label: level,
            value: level,
          }))}
          value={filters.level}
        />

        <FilterSelect
          label="Tipo"
          onChange={(value) => onUpdate("resourceType", value)}
          options={resourceTypes.map((type) => ({
            label: resourceTypeLabels[type],
            value: type,
          }))}
          value={filters.resourceType}
        />

        <FilterSelect
          label="Línea"
          onChange={(value) => onUpdate("learningTrack", value)}
          options={learningTracks.map((track) => ({
            label: learningTrackLabels[track],
            value: track,
          }))}
          value={filters.learningTrack}
        />

        <FilterSelect
          label="Destreza"
          onChange={(value) => onUpdate("skill", value)}
          options={skillFocusOptions.map((skill) => ({
            label: skillLabels[skill],
            value: skill,
          }))}
          value={filters.skill}
        />

        <FilterSelect
          label="Apoyo"
          onChange={(value) => onUpdate("supportLevel", value)}
          options={supportLevels.map((supportLevel) => ({
            label: supportLevelLabels[supportLevel],
            value: supportLevel,
          }))}
          value={filters.supportLevel}
        />
      </CardContent>
    </Card>
  );
}

function FilterSelect({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  value: string;
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-medium text-zinc-700 dark:text-zinc-200">
        {label}
      </span>
      <select
        className="h-10 rounded-md border border-zinc-200 bg-white px-3 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-600"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value="all">Todos</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ResourceDetailPanel({
  item,
  onUseAsBase,
}: {
  item: ResourceBankItem;
  onUseAsBase: (item: ResourceBankItem) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap gap-2">
          <Badge>{resourceTypeLabels[item.type]}</Badge>
          <Badge>{item.languageLevel}</Badge>
          <Badge>{item.vocationalLevel}</Badge>
          <Badge>{learningTrackLabels[item.learningTrack]}</Badge>
          <Badge>Apoyo {supportLevelLabels[item.supportLevel].toLowerCase()}</Badge>
        </div>
        <CardTitle className="text-base">{item.title}</CardTitle>
        <CardDescription>{item.scenario}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <DetailBlock title="Instrucciones para alumnado">
          {item.content.studentInstructions}
        </DetailBlock>

        {item.content.teacherNotes ? (
          <DetailBlock title="Notas docentes">{item.content.teacherNotes}</DetailBlock>
        ) : null}

        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
            Estructura
          </p>
          <div className="space-y-3">
            {item.content.sections.map((section) => (
              <div
                className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
                key={section.title}
              >
                <p className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
                  {section.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
            Adaptación futura
          </p>
          <button
            className="h-10 w-full rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
            onClick={() => onUseAsBase(item)}
            type="button"
          >
            Usar como base
          </button>
          <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">
            Preparado para conectar con preferencias del docente y generación IA
            en una fase posterior.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function DetailBlock({
  children,
  title,
}: {
  children: string;
  title: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
        {title}
      </p>
      <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
        {children}
      </p>
    </div>
  );
}

function CoveragePanel({
  coverage,
}: {
  coverage: ResourceBankCoverageSummary;
}) {
  const nextPriorities = coverage.uncoveredFamilies.slice(0, 5);
  const topFamilies = coverage.coverageByFamily
    .filter((entry) => entry.count > 0)
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cobertura editorial</CardTitle>
        <CardDescription>
          {coverage.coveredFamilies} de {coverage.totalFamilies} familias tienen
          recursos aprobados.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <CoverageMetric label="Recursos" value={coverage.totalResources} />
          <CoverageMetric label="Familias" value={coverage.coveredFamilies} />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
            Líneas pedagógicas
          </p>
          <div className="space-y-2">
            {coverage.coverageByLearningTrack.map((entry) => (
              <div
                className="flex items-center justify-between gap-3 text-sm"
                key={entry.learningTrack}
              >
                <span className="text-zinc-600 dark:text-zinc-300">
                  {learningTrackLabels[entry.learningTrack]}
                </span>
                <span className="font-medium text-zinc-950 dark:text-zinc-50">
                  {entry.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
            Ya cubiertas
          </p>
          <div className="space-y-2">
            {topFamilies.map((entry) => (
              <div
                className="flex items-center justify-between gap-3 text-sm"
                key={entry.professionalFamily}
              >
                <span className="min-w-0 truncate text-zinc-600 dark:text-zinc-300">
                  {entry.professionalFamily}
                </span>
                <span className="font-medium text-zinc-950 dark:text-zinc-50">
                  {entry.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
            Próximas prioridades
          </p>
          <div className="flex flex-wrap gap-2">
            {nextPriorities.map((family) => (
              <Badge key={family}>{family}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CoverageMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/60">
      <p className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
        {value}
      </p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-400">
        {label}
      </p>
    </div>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-zinc-200 px-2 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
      {children}
    </span>
  );
}
