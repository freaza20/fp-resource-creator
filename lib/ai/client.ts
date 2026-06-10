import type {
  AIResourceApiRequest,
  AIResourceApiResponse,
  AIResourceRequest,
  AIResourceResponse,
} from "@/lib/ai/types";
import type { UserProfile } from "@/types/user";

const createApiPayload = (
  request: AIResourceRequest,
  user?: UserProfile | null,
): AIResourceApiRequest => ({
  request,
  user: user
    ? {
        id: user.id,
        plan: user.plan,
        phoneVerified: user.verification.phoneVerified,
        aiGenerationsUsed: user.usage.aiGenerationsUsed,
      }
    : undefined,
});

export async function requestAIResourceGeneration(
  request: AIResourceRequest,
  user?: UserProfile | null,
): Promise<AIResourceResponse> {
  const response = await fetch("/api/ai/generate", {
    body: JSON.stringify(createApiPayload(request, user)),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const payload = (await response.json()) as AIResourceApiResponse;

  if (!payload.ok) {
    throw new Error(payload.error.message);
  }

  return payload.data;
}
