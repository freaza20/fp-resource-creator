import { aiEvaluationCases } from "@/lib/mock-data/ai-evaluation-cases";
import {
  estimateAverageCostPerResource,
  estimateBenchmarkCost,
} from "@/lib/ai-evaluation/cost-estimator";
import type {
  AIModelCandidate,
  AIModelEvaluationSummary,
} from "@/types/ai-evaluation";

const statusScore: Record<AIModelCandidate["status"], number> = {
  alternativa: 76,
  comparativa: 68,
  descartable: 52,
  principal: 88,
};

const providerAdjustment: Partial<Record<AIModelCandidate["provider"], number>> = {
  Anthropic: -6,
  DeepSeek: -2,
  Google: 2,
  Groq: -1,
  Mistral: 4,
  OpenAI: 1,
};

const costScore = (averageCostPerCaseUsd: number): number => {
  if (averageCostPerCaseUsd <= 0.0007) {
    return 10;
  }

  if (averageCostPerCaseUsd <= 0.0012) {
    return 6;
  }

  if (averageCostPerCaseUsd <= 0.003) {
    return 2;
  }

  return -8;
};

export function createModelEvaluationSummary(
  candidate: AIModelCandidate,
): AIModelEvaluationSummary {
  const averageCostPerCaseUsd = estimateAverageCostPerResource(
    candidate,
    aiEvaluationCases,
  );
  const totalBenchmarkCostUsd = estimateBenchmarkCost(candidate, aiEvaluationCases);
  const estimatedCostPerThousandResourcesUsd = averageCostPerCaseUsd * 1_000;
  const weightedScore = Math.max(
    0,
    Math.min(
      100,
      statusScore[candidate.status] +
        (providerAdjustment[candidate.provider] ?? 0) +
        costScore(averageCostPerCaseUsd),
    ),
  );

  return {
    averageCostPerCaseUsd,
    candidate,
    estimatedCostPerThousandResourcesUsd,
    recommendation: createRecommendationText(
      candidate,
      weightedScore,
      estimatedCostPerThousandResourcesUsd,
    ),
    totalBenchmarkCostUsd,
    weightedScore,
  };
}

export function rankModelCandidates(
  candidates: AIModelCandidate[],
): AIModelEvaluationSummary[] {
  return candidates
    .map(createModelEvaluationSummary)
    .sort((a, b) => b.weightedScore - a.weightedScore);
}

function createRecommendationText(
  candidate: AIModelCandidate,
  weightedScore: number,
  estimatedCostPerThousandResourcesUsd: number,
): string {
  if (candidate.status === "principal" && weightedScore >= 90) {
    return "Muy buen candidato para primera prueba real.";
  }

  if (estimatedCostPerThousandResourcesUsd < 1 && weightedScore >= 75) {
    return "Interesante para freemium y generación de alto volumen.";
  }

  if (candidate.status === "comparativa") {
    return "Útil como referencia de calidad, no como modelo por defecto.";
  }

  if (candidate.status === "descartable") {
    return "Mantener solo como referencia de coste mínimo.";
  }

  return "Candidato secundario pendiente de benchmark real.";
}
