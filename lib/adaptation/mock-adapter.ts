import type {
  AdaptationOptions,
  AdaptationRequest,
  AdaptationResult,
} from "@/types/adaptation";

const adaptationModeLabels: Record<AdaptationOptions["mode"], string> = {
  "assessment-version": "versión de evaluación",
  "change-context": "cambio de contexto profesional",
  extend: "ampliación",
  "increase-support": "aumento de andamiaje",
  simplify: "simplificación",
};

const instructionLanguageLabels: Record<
  AdaptationOptions["instructionLanguage"],
  string
> = {
  english: "inglés",
  mixed: "formato mixto",
  spanish: "español",
};

export async function adaptResourceMock(
  request: AdaptationRequest,
): Promise<AdaptationResult> {
  const createdAt = new Date().toISOString();
  const { baseResource, options, targetGroup } = request;

  await new Promise((resolve) => setTimeout(resolve, 350));

  const changesApplied = [
    `Adaptado al grupo ${targetGroup.name}.`,
    `Línea pedagógica: ${options.learningTrack === "foundation" ? "Base FP Básica" : "Profesional"}.`,
    `Nivel de apoyo: ${options.supportLevel}.`,
    `Modo de adaptación: ${adaptationModeLabels[options.mode]}.`,
    `Duración objetivo: ${options.sessionMinutes} minutos.`,
    `Instrucciones en ${instructionLanguageLabels[options.instructionLanguage]}.`,
  ];

  if (options.includeAnswerKey) {
    changesApplied.push("Incluye solucionario o criterios de respuesta.");
  }

  const adaptedContent = [
    `Recurso adaptado desde: ${baseResource.title}.`,
    `Grupo objetivo: ${targetGroup.name} (${targetGroup.cycleName}).`,
    `Objetivo docente: ${options.adaptationGoal}.`,
    `Propuesta: mantener la situación profesional, ajustar el apoyo al alumnado y cerrar con una producción breve revisable.`,
    `Notas de uso: revisar vocabulario técnico, tiempos y ejemplos antes de llevarlo al aula.`,
  ].join(" ");

  return {
    id: `adaptation-${baseResource.id}-${Date.now()}`,
    adaptedResource: {
      id: `adapted-${baseResource.id}-${Date.now()}`,
      title: `${baseResource.title} · adaptado para ${targetGroup.name}`,
      type: baseResource.type,
      professionalFamily: targetGroup.professionalFamily,
      vocationalLevel: targetGroup.vocationalLevel,
      learningTrack: options.learningTrack,
      supportLevel: options.supportLevel,
      languageLevel: targetGroup.languageLevel,
      scenario: baseResource.scenario,
      skillFocus: baseResource.skillFocus,
      content: adaptedContent,
      createdAt,
    },
    baseResourceId: baseResource.id,
    targetGroupId: targetGroup.id,
    changesApplied,
    teacherNotes:
      "Resultado simulado. La versión final debe ser revisada por el docente antes de usarla en clase.",
    requiresTeacherReview: true,
    createdAt,
  };
}
