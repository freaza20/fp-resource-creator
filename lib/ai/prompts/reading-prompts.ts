import type { PromptTemplateInput } from "@/lib/ai/types";

export function buildReadingPrompt(input: PromptTemplateInput): string {
  return [
    "Actúa como un profesor experto de inglés profesional para Formación Profesional en España.",
    `Crea un reading para ${input.groupName}, ciclo ${input.cycleName}, ${input.vocationalLevel}.`,
    `Familia profesional: ${input.familyName}. Subnivel lingüístico: ${input.level}.`,
    `Situación profesional: ${input.scenarioTitle}.`,
    `Contexto gramatical: ${input.grammarTitle}. ${input.grammarExplanation}`,
    `Vocabulario objetivo: ${input.vocabularyTitle} (${input.vocabularyWords.join(", ")}).`,
    `Dificultad: ${input.options.difficulty}. Duración estimada: ${input.options.durationMinutes} minutos.`,
    "El recurso debe incluir:",
    "- Un texto breve, natural y adecuado al entorno profesional del ciclo.",
    "- 5 preguntas de comprensión graduadas.",
    "- Una actividad final de producción escrita o speaking.",
    input.options.includeAnswerKey
      ? "- Solucionario claro para el docente."
      : "- Sin solucionario.",
    input.options.includeTeacherNotes
      ? "- Notas docentes con posibles adaptaciones."
      : "- Sin notas docentes.",
    "Evita textos genéricos. Usa una situación laboral verosímil y vocabulario de la familia profesional.",
  ].join("\n");
}
