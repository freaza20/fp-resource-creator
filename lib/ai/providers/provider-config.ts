import type { AIProviderId } from "@/lib/ai/types";

const validProviders = ["mock", "mistral", "openai"] as const;

export function getConfiguredProviderId(): AIProviderId {
  const provider = process.env.AI_PROVIDER ?? "mock";

  if (validProviders.includes(provider as AIProviderId)) {
    return provider as AIProviderId;
  }

  return "mock";
}

export function getMistralConfig() {
  return {
    apiKey: process.env.MISTRAL_API_KEY ?? "",
    maxTokens: Number(process.env.MISTRAL_MAX_TOKENS ?? 1800),
    model: process.env.MISTRAL_MODEL ?? "mistral-small-latest",
    temperature: Number(process.env.MISTRAL_TEMPERATURE ?? 0.2),
  };
}
