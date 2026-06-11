import type { AIModelCandidate } from "@/types/ai-evaluation";

export const aiModelCandidates = [
  {
    id: "mistral-small-4",
    provider: "Mistral",
    modelName: "Mistral Small 4",
    apiModelId: "mistral-small-latest",
    inputPricePerMillionTokensUsd: 0.1,
    outputPricePerMillionTokensUsd: 0.3,
    contextWindowTokens: 128_000,
    strengths: [
      "Muy buen equilibrio coste/calidad",
      "Modelo europeo y multilingue",
      "Buen candidato para generación pedagógica estructurada",
    ],
    risks: [
      "Conviene validar obediencia estricta a JSON",
      "Puede requerir prompts muy explícitos para FP Básica",
    ],
    recommendedUse:
      "Candidato principal para recursos estándar, adaptación y generación freemium.",
    status: "principal",
    sourceUrl: "https://mistral.ai/pricing/",
  },
  {
    id: "gemini-25-flash-lite",
    provider: "Google",
    modelName: "Gemini 2.5 Flash-Lite",
    apiModelId: "gemini-2.5-flash-lite",
    inputPricePerMillionTokensUsd: 0.1,
    outputPricePerMillionTokensUsd: 0.4,
    contextWindowTokens: 1_000_000,
    strengths: [
      "Muy barato para alto volumen",
      "Contexto amplio",
      "Buena opción para tareas simples y lotes editoriales",
    ],
    risks: [
      "Hay que controlar tokens de pensamiento",
      "La calidad pedagógica debe compararse con Mistral y OpenAI",
    ],
    recommendedUse:
      "Candidato ultra-económico para recursos simples y generación masiva.",
    status: "principal",
    sourceUrl: "https://ai.google.dev/gemini-api/docs/pricing",
  },
  {
    id: "deepseek-v4-flash",
    provider: "DeepSeek",
    modelName: "DeepSeek V4 Flash",
    apiModelId: "deepseek-v4-flash",
    inputPricePerMillionTokensUsd: 0.14,
    outputPricePerMillionTokensUsd: 0.28,
    contextWindowTokens: 1_000_000,
    strengths: [
      "Coste muy bajo",
      "JSON output disponible",
      "Contexto amplio para bancos extensos",
    ],
    risks: [
      "Revisar privacidad, jurisdicción y confianza de proveedor",
      "Validar consistencia en inglés educativo para FP",
    ],
    recommendedUse:
      "Alternativa económica para comparar coste/calidad antes de producción.",
    status: "alternativa",
    sourceUrl: "https://api-docs.deepseek.com/quick_start/pricing",
  },
  {
    id: "openai-gpt-54-nano",
    provider: "OpenAI",
    modelName: "GPT-5.4 nano",
    apiModelId: "gpt-5.4-nano",
    inputPricePerMillionTokensUsd: 0.2,
    outputPricePerMillionTokensUsd: 1.25,
    contextWindowTokens: 128_000,
    strengths: [
      "API estable y documentación sólida",
      "Buena integración con salida estructurada",
      "Buen fallback para casos donde importe fiabilidad",
    ],
    risks: [
      "Salida más cara que Mistral/Gemini para recursos largos",
      "No debería ser el único modelo freemium sin límites estrictos",
    ],
    recommendedUse:
      "Fallback estable para validar calidad y salida JSON antes de escalar.",
    status: "alternativa",
    sourceUrl: "https://developers.openai.com/api/docs/pricing",
  },
  {
    id: "claude-haiku-45",
    provider: "Anthropic",
    modelName: "Claude Haiku 4.5",
    apiModelId: "claude-haiku-4-5",
    inputPricePerMillionTokensUsd: 1,
    outputPricePerMillionTokensUsd: 5,
    contextWindowTokens: 200_000,
    strengths: [
      "Buen criterio lingüístico y redacción cuidada",
      "Útil como referencia de calidad",
      "Interesante para revisión o mejora de recursos premium",
    ],
    risks: [
      "Demasiado caro para generación freemium masiva",
      "No parece necesario para tareas simples de FP",
    ],
    recommendedUse:
      "Modelo comparativo de calidad, no candidato por defecto de bajo coste.",
    status: "comparativa",
    sourceUrl: "https://platform.claude.com/docs/en/about-claude/pricing",
  },
  {
    id: "groq-llama-4-scout",
    provider: "Groq",
    modelName: "Llama 4 Scout",
    apiModelId: "llama-4-scout",
    inputPricePerMillionTokensUsd: 0.11,
    outputPricePerMillionTokensUsd: 0.34,
    contextWindowTokens: 128_000,
    strengths: [
      "Muy rápido",
      "Coste bajo",
      "Buena opción para respuestas interactivas y borradores",
    ],
    risks: [
      "Calidad pedagógica por comprobar",
      "Puede necesitar validación fuerte de formato",
    ],
    recommendedUse:
      "Alternativa rápida para generación interactiva si la calidad acompaña.",
    status: "alternativa",
    sourceUrl: "https://groq.com/pricing",
  },
  {
    id: "groq-llama-31-8b",
    provider: "Groq",
    modelName: "Llama 3.1 8B Instant",
    apiModelId: "llama-3.1-8b-instant",
    inputPricePerMillionTokensUsd: 0.05,
    outputPricePerMillionTokensUsd: 0.08,
    contextWindowTokens: 128_000,
    strengths: [
      "Coste extremadamente bajo",
      "Latencia muy baja",
      "Útil para borradores o tareas auxiliares",
    ],
    risks: [
      "Probablemente insuficiente para nivelación pedagógica fina",
      "Mayor riesgo de respuestas superficiales",
    ],
    recommendedUse:
      "Modelo descartable como default, pero útil para comparar mínimos de coste.",
    status: "descartable",
    sourceUrl: "https://groq.com/pricing",
  },
] satisfies AIModelCandidate[];
