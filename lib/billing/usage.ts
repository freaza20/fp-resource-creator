import { planDefinitions } from "@/lib/mock-data/billing";
import type { PlanDefinition, SubscriptionPlan, UsageSnapshot } from "@/types/billing";
import type { UserProfile } from "@/types/user";

export const getPlanDefinition = (plan: SubscriptionPlan): PlanDefinition => {
  const planDefinition = planDefinitions.find((item) => item.id === plan);

  if (!planDefinition) {
    throw new Error(`Plan no reconocido: ${plan}`);
  }

  return planDefinition;
};

export const getUsagePercentage = (used: number, limit: number): number => {
  if (limit <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((used / limit) * 100));
};

export const canUseAiGeneration = (user: UserProfile): boolean => {
  const plan = getPlanDefinition(user.plan);

  if (plan.limits.requiresPhoneForAi && !user.verification.phoneVerified) {
    return false;
  }

  return user.usage.aiGenerationsUsed < plan.limits.aiGenerationsPerMonth;
};

export const createUsageRows = (
  usage: UsageSnapshot,
  plan: PlanDefinition,
): Array<{
  label: string;
  used: number;
  limit: number;
}> => [
  {
    label: "Generaciones IA",
    used: usage.aiGenerationsUsed,
    limit: plan.limits.aiGenerationsPerMonth,
  },
  {
    label: "Recursos guardados",
    used: usage.savedResourcesUsed,
    limit: plan.limits.savedResources,
  },
  {
    label: "Grupos",
    used: usage.groupsUsed,
    limit: plan.limits.groups,
  },
  {
    label: "Bancos de vocabulario",
    used: usage.customVocabularyBanksUsed,
    limit: plan.limits.customVocabularyBanks,
  },
  {
    label: "Bancos de gramática",
    used: usage.customGrammarBanksUsed,
    limit: plan.limits.customGrammarBanks,
  },
];
