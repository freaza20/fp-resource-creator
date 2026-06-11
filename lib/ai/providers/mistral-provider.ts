import { getMistralConfig } from "@/lib/ai/providers/provider-config";
import type { AIResourceProvider } from "@/lib/ai/providers/types";
import type {
  AIResourceRequest,
  ResourceType,
  DifficultyLevel,
} from "@/lib/ai/types";
import type { SkillFocus, SupportLevel } from "@/types/vocational";

type MistralChatResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  usage?: {
    completion_tokens?: number;
    prompt_tokens?: number;
    total_tokens?: number;
  };
};

type MistralResourcePayload = {
  title?: string;
  content?: string;
  skillFocus?: SkillFocus[];
  teacherNotes?: string;
};

const mistralSmallPricing = {
  inputPerMillionTokensUsd: 0.1,
  outputPerMillionTokensUsd: 0.3,
};

const resourceTypeLabels: Record<ResourceType, string> = {
  exam: "prueba",
  listening: "escucha",
  reading: "lectura",
  worksheet: "ficha",
};

const difficultyLabels: Record<DifficultyLevel, string> = {
  challenge: "reto",
  foundation: "base",
  standard: "estandar",
};

const getSupportLevel = (request: AIResourceRequest): SupportLevel => {
  if (request.group?.vocationalLevel === "FP Básica") {
    return "high";
  }

  return request.options.studentSupport;
};

const estimateCost = (
  inputTokens: number,
  outputTokens: number,
): number =>
  (inputTokens / 1_000_000) * mistralSmallPricing.inputPerMillionTokensUsd +
  (outputTokens / 1_000_000) * mistralSmallPricing.outputPerMillionTokensUsd;

const extractJsonObject = (content: string): MistralResourcePayload => {
  try {
    return JSON.parse(content) as MistralResourcePayload;
  } catch {
    const start = content.indexOf("{");
    const end = content.lastIndexOf("}");

    if (start === -1 || end === -1 || end <= start) {
      throw new Error("Mistral no devolvió un JSON válido.");
    }

    return JSON.parse(content.slice(start, end + 1)) as MistralResourcePayload;
  }
};

const buildSystemPrompt = (): string =>
  [
    "Eres un asistente experto en Ingles Profesional para Formacion Profesional en Espana.",
    "Generas recursos revisables para docentes, nunca material final sin revision humana.",
    "Respeta el nivel linguistico indicado y adapta FP Basica como linea foundation con apoyo alto.",
    "Devuelve exclusivamente JSON valido con estas claves: title, content, skillFocus, teacherNotes.",
    "No incluyas markdown, comentarios ni texto fuera del JSON.",
  ].join(" ");

const buildUserPrompt = (request: AIResourceRequest, prompt: string): string =>
  [
    `Tipo de recurso: ${resourceTypeLabels[request.resourceType]}.`,
    `Nivel: ${request.level}.`,
    `Dificultad: ${difficultyLabels[request.options.difficulty]}.`,
    `Duracion: ${request.options.durationMinutes} minutos.`,
    `Grupo: ${request.group?.name ?? "grupo pendiente"}.`,
    `Familia profesional: ${request.group?.professionalFamily ?? "pendiente"}.`,
    `Nivel FP: ${request.group?.vocationalLevel ?? "pendiente"}.`,
    `Ciclo: ${request.group?.cycleName ?? "pendiente"}.`,
    "Prompt pedagogico preparado por la app:",
    prompt,
  ].join("\n");

export const mistralAIProvider: AIResourceProvider = {
  id: "mistral",
  model: "mistral-small-latest",
  async generateResource(request, context) {
    const config = getMistralConfig();

    if (!config.apiKey) {
      throw new Error(
        "Falta MISTRAL_API_KEY. Mantén AI_PROVIDER=mock o añade la clave en .env.local.",
      );
    }

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      body: JSON.stringify({
        max_tokens: config.maxTokens,
        messages: [
          {
            content: buildSystemPrompt(),
            role: "system",
          },
          {
            content: buildUserPrompt(request, context.prompt),
            role: "user",
          },
        ],
        model: config.model,
        response_format: {
          type: "json_object",
        },
        temperature: config.temperature,
      }),
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!response.ok) {
      const message = await response.text();

      throw new Error(
        `Mistral devolvió un error ${response.status}: ${message.slice(0, 240)}`,
      );
    }

    const data = (await response.json()) as MistralChatResponse;
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Mistral no devolvió contenido para el recurso.");
    }

    const parsed = extractJsonObject(content);
    const generatedAt = new Date().toISOString();
    const inputTokens =
      data.usage?.prompt_tokens ?? Math.ceil(context.prompt.length / 4);
    const outputTokens =
      data.usage?.completion_tokens ?? Math.ceil(content.length / 4);
    const vocationalLevel = request.group?.vocationalLevel ?? "Grado Medio";
    const learningTrack =
      vocationalLevel === "FP Básica" ? "foundation" : "professional";

    return {
      resource: {
        content:
          parsed.content ??
          "La respuesta de Mistral no incluyó contenido suficiente para el recurso.",
        createdAt: generatedAt,
        id: `mistral-${request.resourceType}-${Date.now()}`,
        languageLevel: request.level,
        learningTrack,
        professionalFamily:
          request.group?.professionalFamily ?? "Administración y Gestión",
        scenario:
          request.group?.scenarios[0] ??
          request.vocabulary?.scenario ??
          "supplier-order-email",
        skillFocus:
          parsed.skillFocus ??
          request.grammar?.skillFocus ??
          request.vocabulary?.skillFocus ??
          ["vocabulary", "writing"],
        supportLevel: getSupportLevel(request),
        title:
          parsed.title ??
          `Recurso ${resourceTypeLabels[request.resourceType]} con Mistral`,
        type: request.resourceType,
        vocationalLevel,
      },
      metadata: {
        difficulty: request.options.difficulty,
        durationMinutes: request.options.durationMinutes,
        estimatedCostUsd: estimateCost(inputTokens, outputTokens),
        estimatedInputTokens: inputTokens,
        estimatedOutputTokens: outputTokens,
        generatedAt,
        requiresTeacherReview: true,
      },
      model: "mistral-small-latest",
      prompt: context.prompt,
      provider: "mistral",
    };
  },
};
