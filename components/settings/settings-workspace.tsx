"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  learningTracks,
  professionalFamilies,
  supportLevels,
  vocationalLevels,
} from "@/lib/resource-bank/constants";
import { useSessionStore } from "@/store/useSessionStore";
import type {
  GenerationStyle,
  InstructionLanguagePreference,
} from "@/types/user";
import type {
  LearningTrack,
  ProfessionalFamily,
  SupportLevel,
  VocationalLevel,
} from "@/types/vocational";

const instructionLanguageLabels: Record<InstructionLanguagePreference, string> = {
  english: "Inglés",
  mixed: "Mixto",
  spanish: "Español",
};

const generationStyleLabels: Record<GenerationStyle, string> = {
  assessment: "Evaluación",
  communicative: "Comunicativo",
  guided: "Guiado",
  "vocabulary-first": "Vocabulario primero",
};

const learningTrackLabels: Record<LearningTrack, string> = {
  foundation: "Base FP Básica",
  professional: "Profesional",
};

const supportLevelLabels: Record<SupportLevel, string> = {
  high: "Alto",
  low: "Bajo",
  medium: "Medio",
};

export function SettingsWorkspace() {
  const currentUser = useSessionStore((state) => state.currentUser);
  const updatePreferences = useSessionStore((state) => state.updatePreferences);

  if (!currentUser) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Configuración no disponible</CardTitle>
          <CardDescription>
            Inicia sesión para cargar tus preferencias docentes.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const preferences = currentUser.preferences;

  const toggleFamily = (family: ProfessionalFamily) => {
    const exists = preferences.defaultFamilies.includes(family);

    updatePreferences({
      defaultFamilies: exists
        ? preferences.defaultFamilies.filter((item) => item !== family)
        : [...preferences.defaultFamilies, family],
    });
  };

  const toggleVocationalLevel = (level: VocationalLevel) => {
    const exists = preferences.vocationalLevels.includes(level);

    updatePreferences({
      vocationalLevels: exists
        ? preferences.vocationalLevels.filter((item) => item !== level)
        : [...preferences.vocationalLevels, level],
    });
  };

  return (
    <>
      <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/20">
        <div className="space-y-3">
          <div className="inline-flex rounded-md border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
            Configuración docente
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
              Preferencias para adaptar recursos
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Estas opciones servirán para adaptar la biblioteca y la futura IA
              a tus grupos, niveles y estilo de trabajo.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Familias profesionales</CardTitle>
            <CardDescription>
              Selecciona las familias que impartes con más frecuencia.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {professionalFamilies.map((family) => {
              const active = preferences.defaultFamilies.includes(family);

              return (
                <button
                  className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "border-zinc-950 bg-zinc-950 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-950"
                      : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  }`}
                  key={family}
                  onClick={() => toggleFamily(family)}
                  type="button"
                >
                  {family}
                </button>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Niveles que impartes</CardTitle>
            <CardDescription>
              La app usará esta información para priorizar plantillas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {vocationalLevels.map((level) => {
              const active = preferences.vocationalLevels.includes(level);

              return (
                <button
                  className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm font-medium transition-colors ${
                    active
                      ? "border-zinc-950 bg-zinc-950 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-950"
                      : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  }`}
                  key={level}
                  onClick={() => toggleVocationalLevel(level)}
                  type="button"
                >
                  {level}
                  <span>{active ? "Activo" : "Inactivo"}</span>
                </button>
              );
            })}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SelectCard
          label="Línea por defecto"
          onChange={(value) =>
            updatePreferences({ defaultLearningTrack: value as LearningTrack })
          }
          options={learningTracks.map((track) => ({
            label: learningTrackLabels[track],
            value: track,
          }))}
          value={preferences.defaultLearningTrack}
        />
        <SelectCard
          label="Apoyo por defecto"
          onChange={(value) =>
            updatePreferences({ defaultSupportLevel: value as SupportLevel })
          }
          options={supportLevels.map((level) => ({
            label: supportLevelLabels[level],
            value: level,
          }))}
          value={preferences.defaultSupportLevel}
        />
        <SelectCard
          label="Idioma de instrucciones"
          onChange={(value) =>
            updatePreferences({
              instructionLanguage: value as InstructionLanguagePreference,
            })
          }
          options={Object.entries(instructionLanguageLabels).map(
            ([value, label]) => ({ label, value }),
          )}
          value={preferences.instructionLanguage}
        />
        <SelectCard
          label="Estilo de generación"
          onChange={(value) =>
            updatePreferences({ generationStyle: value as GenerationStyle })
          }
          options={Object.entries(generationStyleLabels).map(([value, label]) => ({
            label,
            value,
          }))}
          value={preferences.generationStyle}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <NotesCard
          label="Criterios para FP Básica"
          value={preferences.fpBasicNotes}
        />
        <NotesCard
          label="Criterios para Grado Medio/Superior"
          value={preferences.professionalTrackNotes}
        />
      </section>
    </>
  );
}

function SelectCard({
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
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <select
          className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-600"
          onChange={(event) => onChange(event.target.value)}
          value={value}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </CardContent>
    </Card>
  );
}

function NotesCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        <CardDescription>
          Nota docente mock. En una fase posterior será editable y persistente.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
