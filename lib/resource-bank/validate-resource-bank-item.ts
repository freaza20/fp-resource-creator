import {
  languageSublevels,
  learningTracks,
  professionalFamilies,
  resourceTypes,
  skillFocusOptions,
  supportLevels,
  vocationalLevels,
} from "@/lib/resource-bank/constants";
import type {
  ResourceBankItem,
  ResourceBankValidationResult,
} from "@/types/resource-bank";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(isNonEmptyString);

const pushMissingString = (
  errors: string[],
  value: unknown,
  path: string,
): void => {
  if (!isNonEmptyString(value)) {
    errors.push(`${path} debe ser un texto no vacío.`);
  }
};

const validateSections = (errors: string[], value: unknown): void => {
  if (!Array.isArray(value) || value.length === 0) {
    errors.push("content.sections debe incluir al menos una sección.");
    return;
  }

  value.forEach((section, index) => {
    if (!isRecord(section)) {
      errors.push(`content.sections[${index}] debe ser un objeto.`);
      return;
    }

    pushMissingString(errors, section.title, `content.sections[${index}].title`);
    pushMissingString(errors, section.body, `content.sections[${index}].body`);

    if (section.tasks !== undefined && !isStringArray(section.tasks)) {
      errors.push(`content.sections[${index}].tasks debe ser una lista de textos.`);
    }
  });
};

export function validateResourceBankItem(
  item: unknown,
): ResourceBankValidationResult {
  const errors: string[] = [];

  if (!isRecord(item)) {
    return {
      valid: false,
      errors: ["El recurso debe ser un objeto JSON."],
    };
  }

  pushMissingString(errors, item.id, "id");
  pushMissingString(errors, item.title, "title");
  pushMissingString(errors, item.scenario, "scenario");

  if (!resourceTypes.includes(item.type as never)) {
    errors.push("type no coincide con un tipo de recurso permitido.");
  }

  if (!professionalFamilies.includes(item.professionalFamily as never)) {
    errors.push("professionalFamily no coincide con una familia profesional permitida.");
  }

  if (!vocationalLevels.includes(item.vocationalLevel as never)) {
    errors.push("vocationalLevel no coincide con un nivel de FP permitido.");
  }

  if (!learningTracks.includes(item.learningTrack as never)) {
    errors.push("learningTrack debe ser foundation o professional.");
  }

  if (!supportLevels.includes(item.supportLevel as never)) {
    errors.push("supportLevel debe ser high, medium o low.");
  }

  if (item.vocationalLevel === "FP Básica" && item.learningTrack !== "foundation") {
    errors.push("Los recursos de FP Básica deben usar learningTrack foundation.");
  }

  if (!languageSublevels.includes(item.languageLevel as never)) {
    errors.push("languageLevel no coincide con un subnivel permitido.");
  }

  if (!Array.isArray(item.skillFocus) || item.skillFocus.length === 0) {
    errors.push("skillFocus debe incluir al menos un foco.");
  } else if (
    item.skillFocus.some((skill) => !skillFocusOptions.includes(skill as never))
  ) {
    errors.push("skillFocus contiene valores no permitidos.");
  }

  if (
    typeof item.estimatedMinutes !== "number" ||
    item.estimatedMinutes < 5 ||
    item.estimatedMinutes > 180
  ) {
    errors.push("estimatedMinutes debe ser un número entre 5 y 180.");
  }

  if (!isRecord(item.content)) {
    errors.push("content debe ser un objeto.");
  } else {
    pushMissingString(
      errors,
      item.content.studentInstructions,
      "content.studentInstructions",
    );
    validateSections(errors, item.content.sections);

    if (item.content.teacherNotes !== undefined) {
      pushMissingString(errors, item.content.teacherNotes, "content.teacherNotes");
    }

    if (item.content.answerKey !== undefined && !isStringArray(item.content.answerKey)) {
      errors.push("content.answerKey debe ser una lista de textos.");
    }
  }

  if (!isStringArray(item.tags)) {
    errors.push("tags debe ser una lista de textos.");
  }

  if (!isRecord(item.source)) {
    errors.push("source debe ser un objeto.");
  } else {
    if (!["codex", "human", "import"].includes(String(item.source.generatedBy))) {
      errors.push("source.generatedBy debe ser codex, human o import.");
    }

    if (typeof item.source.reviewed !== "boolean") {
      errors.push("source.reviewed debe ser booleano.");
    }

    pushMissingString(errors, item.source.createdAt, "source.createdAt");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function assertResourceBankItem(item: unknown): asserts item is ResourceBankItem {
  const validation = validateResourceBankItem(item);

  if (!validation.valid) {
    throw new Error(validation.errors.join(" "));
  }
}
