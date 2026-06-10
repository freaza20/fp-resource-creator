import type { AIProviderId, AIResourceRequest, AIResourceResponse } from "@/lib/ai/types";

export type AIProviderContext = {
  prompt: string;
  requestId: string;
};

export type AIResourceProvider = {
  id: AIProviderId;
  model: AIResourceResponse["model"];
  generateResource: (
    request: AIResourceRequest,
    context: AIProviderContext,
  ) => Promise<AIResourceResponse>;
};
