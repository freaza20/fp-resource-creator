import type { PromptTemplateInput } from "@/lib/ai/types";

export function buildExamPrompt(input: PromptTemplateInput): string {
  return [
    "Actúa como profesor de inglés profesional que prepara pruebas claras para Formación Profesional.",
    `Crea un exam para ${input.groupName}, ciclo ${input.cycleName}, ${input.vocationalLevel}.`,
    `Familia profesional: ${input.familyName}. Subnivel lingüístico: ${input.level}.`,
    `Situación profesional: ${input.scenarioTitle}.`,
    `Contenido gramatical: ${input.grammarTitle}. ${input.grammarExplanation}`,
    `Vocabulario evaluado: ${input.vocabularyTitle} (${input.vocabularyWords.join(", ")}).`,
    `Dificultad: ${input.options.difficulty}. Tiempo recomendado: ${input.options.durationMinutes} minutos.`,
    "La prueba debe incluir:",
    "- Reading corto con preguntas.",
    "- Ejercicio de vocabulario contextualizado.",
    "- Ejercicio de gramática con instrucciones inequívocas.",
    "- Writing prompt realista.",
    "- Criterios de evaluación breves.",
    input.options.includeAnswerKey
      ? "- Solucionario y criterios de corrección."
      : "- Sin solucionario.",
    "Debe ser adecuada para una revisión humana docente antes de uso en aula.",
  ].join("\n");
}
