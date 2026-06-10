import { requestMockAIResource } from "@/lib/ai/mock-ai-service";
import type { AIResourceProvider } from "@/lib/ai/providers/types";

export const mockAIProvider: AIResourceProvider = {
  id: "mock",
  model: "mock-education-generator-v1",
  generateResource: (request, context) =>
    requestMockAIResource(request, context.prompt),
};
