import { mistralAIProvider } from "@/lib/ai/providers/mistral-provider";
import { mockAIProvider } from "@/lib/ai/providers/mock-provider";
import type { AIProviderId } from "@/lib/ai/types";

const providers = {
  mistral: mistralAIProvider,
  mock: mockAIProvider,
} as const;

export function getAIProvider(providerId: AIProviderId = "mock") {
  if (providerId === "mistral") {
    return providers.mistral;
  }

  if (providerId === "openai") {
    throw new Error(
      "El proveedor OpenAI todavía no está conectado. Usa AI_PROVIDER=mock.",
    );
  }

  return providers.mock;
}
