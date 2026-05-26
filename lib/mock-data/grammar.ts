import type { GrammarTopic } from "@/types/grammar";

export const grammarTopics = [
  {
    id: "grammar-polite-requests",
    title: "Polite requests with could and would",
    level: "A2-high",
    professionalFamily: "Transversal",
    skillFocus: ["writing", "speaking", "customer-service"],
    explanation:
      "Used to ask for information, make requests and sound professional in emails, calls and customer interactions.",
  },
  {
    id: "grammar-advice-should",
    title: "Advice with should and should not",
    level: "A2",
    professionalFamily: "Transversal",
    skillFocus: ["speaking", "writing", "customer-service"],
    explanation:
      "Used to recommend services, give aftercare instructions and respond to common customer needs.",
  },
  {
    id: "grammar-imperatives-procedures",
    title: "Imperatives for procedures and instructions",
    level: "A2-low",
    professionalFamily: "Transversal",
    skillFocus: ["listening", "speaking", "grammar"],
    explanation:
      "Used to give clear step-by-step instructions in workplace procedures and safety routines.",
  },
  {
    id: "grammar-first-conditional-troubleshooting",
    title: "First conditional for troubleshooting",
    level: "B1",
    professionalFamily: "Informática y Comunicaciones",
    skillFocus: ["speaking", "writing", "grammar"],
    explanation:
      "Used to explain likely results in technical support, for example what will happen if a user restarts a device.",
  },
  {
    id: "grammar-past-simple-incident-reports",
    title: "Past simple for incident reports",
    level: "B1-low",
    professionalFamily: "Transversal",
    skillFocus: ["writing", "mediation", "grammar"],
    explanation:
      "Used to report completed actions, incidents, complaints and follow-up steps in professional contexts.",
  },
] satisfies GrammarTopic[];
