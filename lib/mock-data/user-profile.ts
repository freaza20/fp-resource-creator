import type { UserProfile } from "@/types/user";

export const mockUserProfile = {
  id: "user-maria-lopez",
  email: "maria.lopez@iesfp-demo.es",
  phone: "+34 600 123 456",
  fullName: "María López",
  role: "teacher",
  schoolName: "IES Formación Profesional Demo",
  autonomousRegion: "Andalucía",
  plan: "free",
  verification: {
    emailVerified: true,
    phoneVerified: false,
    emailVerifiedAt: "2026-06-01T08:30:00.000Z",
  },
  usage: {
    billingPeriod: "2026-06",
    aiGenerationsUsed: 0,
    savedResourcesUsed: 5,
    groupsUsed: 5,
    customVocabularyBanksUsed: 2,
    customGrammarBanksUsed: 1,
  },
  preferences: {
    defaultFamilies: [
      "Administración y Gestión",
      "Comercio y Marketing",
      "Informática y Comunicaciones",
      "Imagen Personal",
    ],
    vocationalLevels: ["FP Básica", "Grado Medio", "Grado Superior"],
    defaultLearningTrack: "foundation",
    defaultSupportLevel: "high",
    defaultSessionMinutes: 50,
    instructionLanguage: "mixed",
    generationStyle: "guided",
    prioritisedSkills: ["vocabulary", "speaking", "writing"],
    fpBasicNotes:
      "Priorizar microtareas, frases modelo, éxito rápido y recuperación de bases.",
    professionalTrackNotes:
      "Contextualizar siempre con situaciones laborales reales y producción final revisable.",
  },
  createdAt: "2026-06-01T08:00:00.000Z",
} satisfies UserProfile;
