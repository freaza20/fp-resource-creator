import type { PromptTemplateInput } from "@/lib/ai/types";

export function buildWorksheetPrompt(input: PromptTemplateInput): string {
  return [
    "Actúa como creador de worksheets de inglés profesional para Formación Profesional.",
    `Diseña una ficha para ${input.groupName}, ciclo ${input.cycleName}, ${input.vocationalLevel}.`,
    `Familia profesional: ${input.familyName}. Subnivel lingüístico: ${input.level}.`,
    `Situación profesional: ${input.scenarioTitle}.`,
    `Gramática central: ${input.grammarTitle}. ${input.grammarExplanation}`,
    `Set léxico: ${input.vocabularyTitle}. Palabras: ${input.vocabularyWords.join(", ")}.`,
    `Dificultad: ${input.options.difficulty}. Apoyo: ${input.options.studentSupport}.`,
    "La ficha debe contener:",
    "- Warm-up breve y accionable.",
    "- Práctica controlada con ejemplos.",
    "- Actividad guiada conectada con una situación profesional realista.",
    "- Mini tarea final comunicativa.",
    input.options.includeAnswerKey
      ? "- Answer key separado para el profesor."
      : "- Sin answer key.",
    input.options.includeTeacherNotes
      ? "- Sugerencias de adaptación para alumnado con distinto ritmo."
      : "- Sin sugerencias extra.",
  ].join("\n");
}
