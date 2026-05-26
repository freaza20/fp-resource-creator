import type { TeachingResource } from "@/types/resource";

export const teachingResources = [
  {
    id: "resource-email-admin-supplier-order",
    title: "Email to a supplier: placing an order",
    type: "worksheet",
    professionalFamily: "Administración y Gestión",
    vocationalLevel: "FP Básica",
    languageLevel: "A2-low",
    scenario: "supplier-order-email",
    skillFocus: ["writing", "vocabulary"],
    content:
      "A guided worksheet where students complete and then write a short email to order office supplies, confirm quantities and ask for a delivery date.",
    createdAt: "2026-05-26T10:00:00.000Z",
  },
  {
    id: "resource-commerce-complaint-response",
    title: "Replying to a customer complaint",
    type: "reading",
    professionalFamily: "Comercio y Marketing",
    vocationalLevel: "Grado Medio",
    languageLevel: "A2-high",
    scenario: "complaint-response",
    skillFocus: ["reading", "writing", "customer-service"],
    content:
      "A professional email exchange about a delayed order, with comprehension questions and a short response task using polite language.",
    createdAt: "2026-05-26T10:15:00.000Z",
  },
  {
    id: "resource-it-helpdesk-password-reset",
    title: "Helpdesk call: password reset",
    type: "listening",
    professionalFamily: "Informática y Comunicaciones",
    vocationalLevel: "Grado Medio",
    languageLevel: "B1-low",
    scenario: "helpdesk-password-reset",
    skillFocus: ["listening", "speaking", "vocabulary"],
    content:
      "A listening script where a technician checks user details, gives password reset instructions and confirms that the user can log in.",
    createdAt: "2026-05-26T10:30:00.000Z",
  },
  {
    id: "resource-hospitality-booking-exam",
    title: "Hotel booking confirmation exam",
    type: "exam",
    professionalFamily: "Hostelería y Turismo",
    vocationalLevel: "Grado Superior",
    languageLevel: "B1",
    scenario: "hotel-booking-confirmation",
    skillFocus: ["reading", "writing", "customer-service"],
    content:
      "A short assessment covering booking details, polite requests, guest information and a written confirmation email.",
    createdAt: "2026-05-26T10:45:00.000Z",
  },
  {
    id: "resource-salon-appointment-roleplay",
    title: "Salon appointment and client preferences",
    type: "worksheet",
    professionalFamily: "Imagen Personal",
    vocationalLevel: "Grado Medio",
    languageLevel: "A2",
    scenario: "salon-appointment",
    skillFocus: ["speaking", "customer-service", "vocabulary"],
    content:
      "A role-play worksheet for booking a salon appointment, asking about client preferences and confirming service time and price.",
    createdAt: "2026-05-26T11:00:00.000Z",
  },
] satisfies TeachingResource[];
