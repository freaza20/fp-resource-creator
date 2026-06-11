import type {
  AICostEstimate,
  AIEvaluationCase,
  AIModelCandidate,
} from "@/types/ai-evaluation";

export function estimateGenerationCost(
  candidate: AIModelCandidate,
  evaluationCase: Pick<
    AIEvaluationCase,
    "estimatedInputTokens" | "estimatedOutputTokens"
  >,
): AICostEstimate {
  const inputCostUsd =
    (evaluationCase.estimatedInputTokens / 1_000_000) *
    candidate.inputPricePerMillionTokensUsd;
  const outputCostUsd =
    (evaluationCase.estimatedOutputTokens / 1_000_000) *
    candidate.outputPricePerMillionTokensUsd;

  return {
    inputCostUsd,
    outputCostUsd,
    totalCostUsd: inputCostUsd + outputCostUsd,
  };
}

export function estimateAverageCostPerResource(
  candidate: AIModelCandidate,
  cases: AIEvaluationCase[],
): number {
  if (cases.length === 0) {
    return 0;
  }

  const total = cases.reduce(
    (sum, evaluationCase) =>
      sum + estimateGenerationCost(candidate, evaluationCase).totalCostUsd,
    0,
  );

  return total / cases.length;
}

export function estimateBenchmarkCost(
  candidate: AIModelCandidate,
  cases: AIEvaluationCase[],
): number {
  return cases.reduce(
    (sum, evaluationCase) =>
      sum + estimateGenerationCost(candidate, evaluationCase).totalCostUsd,
    0,
  );
}

export function formatUsd(value: number, maximumFractionDigits = 4): string {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits,
    minimumFractionDigits: value < 0.01 ? 4 : 2,
    style: "currency",
  }).format(value);
}
