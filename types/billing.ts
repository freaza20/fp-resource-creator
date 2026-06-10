export type SubscriptionPlan = "free" | "pro" | "school";

export type BillingInterval = "monthly" | "yearly";

export type UsageLimits = {
  aiGenerationsPerMonth: number;
  savedResources: number;
  groups: number;
  customVocabularyBanks: number;
  customGrammarBanks: number;
  canExportPdf: boolean;
  requiresPhoneForAi: boolean;
};

export type UsageSnapshot = {
  billingPeriod: string;
  aiGenerationsUsed: number;
  savedResourcesUsed: number;
  groupsUsed: number;
  customVocabularyBanksUsed: number;
  customGrammarBanksUsed: number;
};

export type PlanDefinition = {
  id: SubscriptionPlan;
  name: string;
  description: string;
  priceLabel: string;
  limits: UsageLimits;
};

export type UsageEventType =
  | "ai-generation"
  | "resource-save"
  | "group-create"
  | "vocabulary-bank-create"
  | "grammar-bank-create";

export type UsageEvent = {
  id: string;
  userId: string;
  type: UsageEventType;
  createdAt: string;
  billingPeriod: string;
};
