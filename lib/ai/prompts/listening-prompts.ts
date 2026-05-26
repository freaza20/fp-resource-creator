import type { PromptTemplateInput } from "@/lib/ai/types";

export function buildListeningPrompt(input: PromptTemplateInput): string {
  return [
    "Actúa como diseñador de actividades de listening para inglés profesional de Formación Profesional.",
    `Prepara un listening para ${input.groupName}, ciclo ${input.cycleName}, ${input.vocationalLevel}.`,
    `Familia profesional: ${input.familyName}. Subnivel lingüístico: ${input.level}.`,
    `Situación profesional: ${input.scenarioTitle}.`,
    `Objetivo gramatical: ${input.grammarTitle}. ${input.grammarExplanation}`,
    `Vocabulario que debe aparecer: ${input.vocabularyWords.join(", ")}.`,
    `Apoyo al alumnado: ${input.options.studentSupport}. Duración: ${input.options.durationMinutes} minutos.`,
    "El recurso debe incluir:",
    "- Un guion de audio realista con dos hablantes o una situación profesional concreta.",
    "- Actividad de pre-listening para activar vocabulario.",
    "- Preguntas de gist y detail.",
    "- Tarea breve posterior para usar el lenguaje escuchado.",
    input.options.includeAnswerKey
      ? "- Respuestas esperadas para corrección rápida."
      : "- Sin respuestas.",
    "El tono debe ser claro, útil y apropiado para alumnado de FP en España.",
  ].join("\n");
}
