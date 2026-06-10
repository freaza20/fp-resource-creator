import type { PlanDefinition } from "@/types/billing";

export const planDefinitions = [
  {
    id: "free",
    name: "Gratuito",
    description:
      "Para probar la biblioteca y activar créditos IA gratuitos con teléfono verificado.",
    priceLabel: "0 €/mes",
    limits: {
      aiGenerationsPerMonth: 5,
      savedResources: 10,
      groups: 3,
      customVocabularyBanks: 2,
      customGrammarBanks: 2,
      canExportPdf: false,
      requiresPhoneForAi: true,
    },
  },
  {
    id: "pro",
    name: "Pro",
    description:
      "Para docentes que generan, adaptan y guardan recursos de forma habitual.",
    priceLabel: "Pendiente",
    limits: {
      aiGenerationsPerMonth: 100,
      savedResources: 500,
      groups: 30,
      customVocabularyBanks: 50,
      customGrammarBanks: 50,
      canExportPdf: true,
      requiresPhoneForAi: false,
    },
  },
  {
    id: "school",
    name: "Centro",
    description:
      "Para departamentos o centros con varios docentes y uso compartido.",
    priceLabel: "A medida",
    limits: {
      aiGenerationsPerMonth: 1000,
      savedResources: 5000,
      groups: 200,
      customVocabularyBanks: 300,
      customGrammarBanks: 300,
      canExportPdf: true,
      requiresPhoneForAi: false,
    },
  },
] satisfies PlanDefinition[];
