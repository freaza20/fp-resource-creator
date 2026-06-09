/* global console, process */

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const resourceBankDirectories = [
  "content/resource-bank/pending",
  "content/resource-bank/approved",
  "content/resource-bank/rejected",
];

const allowedValues = {
  type: ["reading", "worksheet", "listening", "exam"],
  professionalFamily: [
    "Actividades Físicas y Deportivas",
    "Administración y Gestión",
    "Agraria",
    "Artes Gráficas",
    "Artes y Artesanías",
    "Comercio y Marketing",
    "Edificación y Obra Civil",
    "Electricidad y Electrónica",
    "Energía y Agua",
    "Fabricación Mecánica",
    "Informática y Comunicaciones",
    "Hostelería y Turismo",
    "Imagen Personal",
    "Imagen y Sonido",
    "Industrias Alimentarias",
    "Industrias Extractivas",
    "Instalación y Mantenimiento",
    "Madera, Mueble y Corcho",
    "Marítimo-Pesquera",
    "Química",
    "Sanidad",
    "Seguridad y Medio Ambiente",
    "Servicios Socioculturales y a la Comunidad",
    "Textil, Confección y Piel",
    "Transporte y Mantenimiento de Vehículos",
    "Vidrio y Cerámica",
  ],
  vocationalLevel: ["FP Básica", "Grado Medio", "Grado Superior"],
  learningTrack: ["foundation", "professional"],
  supportLevel: ["high", "medium", "low"],
  languageLevel: ["A2-low", "A2", "A2-high", "B1-low", "B1", "B1-high"],
  skillFocus: [
    "reading",
    "writing",
    "listening",
    "speaking",
    "mediation",
    "vocabulary",
    "grammar",
    "customer-service",
  ],
};

const isRecord = (value) =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const isStringArray = (value) =>
  Array.isArray(value) && value.every(isNonEmptyString);

const requireString = (errors, value, path) => {
  if (!isNonEmptyString(value)) {
    errors.push(`${path} debe ser un texto no vacío.`);
  }
};

const validateSections = (errors, value) => {
  if (!Array.isArray(value) || value.length === 0) {
    errors.push("content.sections debe incluir al menos una sección.");
    return;
  }

  value.forEach((section, index) => {
    if (!isRecord(section)) {
      errors.push(`content.sections[${index}] debe ser un objeto.`);
      return;
    }

    requireString(errors, section.title, `content.sections[${index}].title`);
    requireString(errors, section.body, `content.sections[${index}].body`);

    if (section.tasks !== undefined && !isStringArray(section.tasks)) {
      errors.push(`content.sections[${index}].tasks debe ser una lista de textos.`);
    }
  });
};

const validateResource = (item) => {
  const errors = [];

  if (!isRecord(item)) {
    return ["El recurso debe ser un objeto JSON."];
  }

  requireString(errors, item.id, "id");
  requireString(errors, item.title, "title");
  requireString(errors, item.scenario, "scenario");

  for (const [field, values] of Object.entries(allowedValues)) {
    if (field === "skillFocus") {
      continue;
    }

    if (!values.includes(item[field])) {
      errors.push(`${field} no coincide con un valor permitido.`);
    }
  }

  if (!Array.isArray(item.skillFocus) || item.skillFocus.length === 0) {
    errors.push("skillFocus debe incluir al menos un foco.");
  } else if (
    item.skillFocus.some((skill) => !allowedValues.skillFocus.includes(skill))
  ) {
    errors.push("skillFocus contiene valores no permitidos.");
  }

  if (item.vocationalLevel === "FP Básica" && item.learningTrack !== "foundation") {
    errors.push("Los recursos de FP Básica deben usar learningTrack foundation.");
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
    requireString(
      errors,
      item.content.studentInstructions,
      "content.studentInstructions",
    );
    validateSections(errors, item.content.sections);

    if (item.content.teacherNotes !== undefined) {
      requireString(errors, item.content.teacherNotes, "content.teacherNotes");
    }

    if (
      item.content.answerKey !== undefined &&
      !isStringArray(item.content.answerKey)
    ) {
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

    requireString(errors, item.source.createdAt, "source.createdAt");
  }

  return errors;
};

const readJsonFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => join(directory, entry.name));
};

const validateFile = async (filePath) => {
  const rawContent = await readFile(filePath, "utf8");

  try {
    const parsed = JSON.parse(rawContent);
    return validateResource(parsed).map((error) => `${filePath}: ${error}`);
  } catch (error) {
    return [`${filePath}: JSON inválido. ${error.message}`];
  }
};

const filePaths = (
  await Promise.all(resourceBankDirectories.map(readJsonFiles))
).flat();

const errors = (await Promise.all(filePaths.map(validateFile))).flat();

if (errors.length > 0) {
  console.error("Banco de recursos inválido:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Banco de recursos válido: ${filePaths.length} archivo(s) revisado(s).`);
