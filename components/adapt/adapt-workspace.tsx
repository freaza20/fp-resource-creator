"use client";

import { useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPlanDefinition } from "@/lib/billing/usage";
import { approvedResourceBankItems } from "@/lib/resource-bank/approved-resource-bank";
import {
  learningTracks,
  supportLevels,
} from "@/lib/resource-bank/constants";
import { useAdaptationStore } from "@/store/useAdaptationStore";
import { useGroupsStore } from "@/store/useGroupsStore";
import { useResourcesStore } from "@/store/useResourcesStore";
import { useSessionStore } from "@/store/useSessionStore";
import type { AdaptationMode, AdaptationOptions } from "@/types/adaptation";
import type { InstructionLanguagePreference } from "@/types/user";
import type { LearningTrack, SupportLevel } from "@/types/vocational";

const adaptationModeLabels: Record<AdaptationMode, string> = {
  "assessment-version": "Convertir en prueba breve",
  "change-context": "Cambiar contexto profesional",
  extend: "Ampliar actividad",
  "increase-support": "Aumentar andamiaje",
  simplify: "Simplificar",
};

const instructionLanguageLabels: Record<InstructionLanguagePreference, string> = {
  english: "Inglés",
  mixed: "Mixto",
  spanish: "Español",
};

const supportLevelLabels: Record<SupportLevel, string> = {
  high: "Alto",
  low: "Bajo",
  medium: "Medio",
};

export function AdaptWorkspace() {
  const groups = useGroupsStore((state) => state.groups);
  const currentUser = useSessionStore((state) => state.currentUser);
  const consumeAiGenerationMock = useSessionStore(
    (state) => state.consumeAiGenerationMock,
  );
  const addResource = useResourcesStore((state) => state.addResource);
  const {
    adaptationResult,
    error,
    isAdapting,
    options,
    selectedBaseResource,
    selectedGroup,
    selectBaseResource,
    setOptions,
    setTargetGroup,
    startAdaptation,
  } = useAdaptationStore();

  const fallbackResource = approvedResourceBankItems[0] ?? null;
  const fallbackGroup = groups[0] ?? null;

  useEffect(() => {
    if (!selectedBaseResource && fallbackResource) {
      selectBaseResource(fallbackResource);
    }
  }, [fallbackResource, selectBaseResource, selectedBaseResource]);

  useEffect(() => {
    if (!selectedGroup && fallbackGroup) {
      setTargetGroup(fallbackGroup);
    }
  }, [fallbackGroup, selectedGroup, setTargetGroup]);

  const defaultOptions = useMemo<AdaptationOptions | null>(() => {
    if (!currentUser || !selectedGroup) {
      return null;
    }

    return {
      adaptationGoal:
        selectedGroup.vocationalLevel === "FP Básica"
          ? "Reducir carga, añadir frases modelo y cerrar con una producción muy breve."
          : "Ajustar el recurso al ciclo, mantener contexto laboral y generar una producción revisable.",
      includeAnswerKey: true,
      instructionLanguage: currentUser.preferences.instructionLanguage,
      learningTrack:
        selectedGroup.vocationalLevel === "FP Básica"
          ? "foundation"
          : currentUser.preferences.defaultLearningTrack,
      mode:
        selectedGroup.vocationalLevel === "FP Básica"
          ? "increase-support"
          : "change-context",
      sessionMinutes:
        selectedGroup.vocationalLevel === "FP Básica"
          ? 20
          : currentUser.preferences.defaultSessionMinutes,
      supportLevel:
        selectedGroup.vocationalLevel === "FP Básica"
          ? "high"
          : currentUser.preferences.defaultSupportLevel,
    };
  }, [currentUser, selectedGroup]);

  useEffect(() => {
    if (!options && defaultOptions) {
      setOptions(defaultOptions);
    }
  }, [defaultOptions, options, setOptions]);

  if (!currentUser) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Inicia sesión para adaptar recursos</CardTitle>
          <CardDescription>
            El flujo de adaptación usa perfil docente, límites freemium y grupos.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const plan = getPlanDefinition(currentUser.plan);
  const phoneRequired =
    plan.limits.requiresPhoneForAi && !currentUser.verification.phoneVerified;
  const aiLimitReached =
    currentUser.usage.aiGenerationsUsed >= plan.limits.aiGenerationsPerMonth;
  const canAdapt = !phoneRequired && !aiLimitReached;

  const updateOptions = (updates: Partial<AdaptationOptions>) => {
    setOptions({
      ...(options ?? defaultOptions),
      ...updates,
    } as AdaptationOptions);
  };

  const handleAdapt = async () => {
    if (!canAdapt || !currentUser) {
      return;
    }

    const consumed = consumeAiGenerationMock();

    if (!consumed) {
      return;
    }

    await startAdaptation({
      teacherPreferences: currentUser.preferences,
    });
  };

  const handleSave = () => {
    if (adaptationResult) {
      addResource(adaptationResult.adaptedResource);
    }
  };

  return (
    <>
      <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/20">
        <div className="space-y-3">
          <div className="inline-flex rounded-md border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
            Adaptación mock
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
              Adaptar recurso a un grupo
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Selecciona un recurso base, elige un grupo y aplica preferencias
              docentes. Esta fase simula la IA y el consumo freemium.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Recurso base y grupo</CardTitle>
            <CardDescription>
              La adaptación usará el banco editorial y los datos del grupo.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-zinc-700 dark:text-zinc-200">
                Recurso base
              </span>
              <select
                className="h-10 rounded-md border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-600"
                onChange={(event) => {
                  const resource = approvedResourceBankItems.find(
                    (item) => item.id === event.target.value,
                  );

                  if (resource) {
                    selectBaseResource(resource);
                  }
                }}
                value={selectedBaseResource?.id ?? ""}
              >
                {approvedResourceBankItems.map((resource) => (
                  <option key={resource.id} value={resource.id}>
                    {resource.title}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-zinc-700 dark:text-zinc-200">
                Grupo destino
              </span>
              <select
                className="h-10 rounded-md border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-600"
                onChange={(event) => {
                  const group = groups.find(
                    (item) => item.id === event.target.value,
                  );

                  setTargetGroup(group ?? null);
                }}
                value={selectedGroup?.id ?? ""}
              >
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado freemium</CardTitle>
            <CardDescription>
              {currentUser.usage.aiGenerationsUsed}/
              {plan.limits.aiGenerationsPerMonth} generaciones IA usadas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`rounded-lg border p-4 ${
                canAdapt
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300"
                  : "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300"
              }`}
            >
              <p className="text-sm font-medium">
                {canAdapt
                  ? "Adaptación IA mock disponible"
                  : phoneRequired
                    ? "Verifica el teléfono para activar créditos IA"
                    : "Has alcanzado el límite mensual"}
              </p>
              <p className="mt-1 text-sm leading-6">
                El plan gratuito requiere teléfono verificado antes de consumir
                créditos de IA.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Opciones de adaptación</CardTitle>
            <CardDescription>
              Puedes ajustar la salida antes de generar la versión mock.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <SelectField
              label="Modo"
              onChange={(value) => updateOptions({ mode: value as AdaptationMode })}
              options={Object.entries(adaptationModeLabels).map(
                ([value, label]) => ({ label, value }),
              )}
              value={options?.mode ?? ""}
            />
            <SelectField
              label="Línea"
              onChange={(value) =>
                updateOptions({ learningTrack: value as LearningTrack })
              }
              options={learningTracks.map((track) => ({
                label: track === "foundation" ? "Base FP Básica" : "Profesional",
                value: track,
              }))}
              value={options?.learningTrack ?? ""}
            />
            <SelectField
              label="Apoyo"
              onChange={(value) =>
                updateOptions({ supportLevel: value as SupportLevel })
              }
              options={supportLevels.map((level) => ({
                label: supportLevelLabels[level],
                value: level,
              }))}
              value={options?.supportLevel ?? ""}
            />
            <SelectField
              label="Idioma de instrucciones"
              onChange={(value) =>
                updateOptions({
                  instructionLanguage: value as InstructionLanguagePreference,
                })
              }
              options={Object.entries(instructionLanguageLabels).map(
                ([value, label]) => ({ label, value }),
              )}
              value={options?.instructionLanguage ?? ""}
            />
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-zinc-700 dark:text-zinc-200">
                Duración
              </span>
              <input
                className="h-10 rounded-md border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-600"
                min={10}
                onChange={(event) =>
                  updateOptions({ sessionMinutes: Number(event.target.value) })
                }
                type="number"
                value={options?.sessionMinutes ?? 50}
              />
            </label>
            <label className="flex items-center gap-2 self-end text-sm font-medium text-zinc-700 dark:text-zinc-200">
              <input
                checked={options?.includeAnswerKey ?? true}
                onChange={(event) =>
                  updateOptions({ includeAnswerKey: event.target.checked })
                }
                type="checkbox"
              />
              Incluir solucionario
            </label>
            <label className="grid gap-1.5 text-sm md:col-span-2">
              <span className="font-medium text-zinc-700 dark:text-zinc-200">
                Objetivo de adaptación
              </span>
              <textarea
                className="min-h-24 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-600"
                onChange={(event) =>
                  updateOptions({ adaptationGoal: event.target.value })
                }
                value={options?.adaptationGoal ?? ""}
              />
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generación</CardTitle>
            <CardDescription>
              La salida será mock y requerirá revisión docente.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button
              className="h-10 w-full rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
              disabled={!canAdapt || isAdapting}
              onClick={handleAdapt}
              type="button"
            >
              {isAdapting ? "Adaptando..." : "Adaptar recurso"}
            </button>
            {error ? (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                {error}
              </p>
            ) : null}
          </CardContent>
        </Card>
      </section>

      {adaptationResult ? (
        <Card>
          <CardHeader>
            <CardTitle>{adaptationResult.adaptedResource.title}</CardTitle>
            <CardDescription>{adaptationResult.teacherNotes}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              {adaptationResult.adaptedResource.content}
            </p>
            <div className="grid gap-2">
              {adaptationResult.changesApplied.map((change) => (
                <div
                  className="rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-300"
                  key={change}
                >
                  {change}
                </div>
              ))}
            </div>
            <button
              className="h-10 rounded-md border border-zinc-200 px-4 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
              onClick={handleSave}
              type="button"
            >
              Guardar en recursos recientes
            </button>
          </CardContent>
        </Card>
      ) : null}
    </>
  );
}

function SelectField({
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
        className="h-10 rounded-md border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-600"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
