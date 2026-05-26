"use client";

import { useCallback, useState } from "react";

import { generateResource } from "@/lib/ai/resource-generator";
import type { AIResourceRequest, AIResourceResponse } from "@/lib/ai/types";

type GenerationStatus = "idle" | "generating" | "success" | "error";

type UseResourceGenerationResult = {
  status: GenerationStatus;
  isLoading: boolean;
  error: string | null;
  response: AIResourceResponse | null;
  generate: (request: AIResourceRequest) => Promise<AIResourceResponse | null>;
  reset: () => void;
};

export function useResourceGeneration(): UseResourceGenerationResult {
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<AIResourceResponse | null>(null);

  const generate = useCallback(async (request: AIResourceRequest) => {
    setStatus("generating");
    setError(null);

    try {
      const nextResponse = await generateResource(request);

      setResponse(nextResponse);
      setStatus("success");

      return nextResponse;
    } catch (generationError) {
      const message =
        generationError instanceof Error
          ? generationError.message
          : "No se pudo generar el recurso.";

      setError(message);
      setStatus("error");

      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
    setResponse(null);
  }, []);

  return {
    status,
    isLoading: status === "generating",
    error,
    response,
    generate,
    reset,
  };
}
