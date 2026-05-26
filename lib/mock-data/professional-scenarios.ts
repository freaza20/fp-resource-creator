import type { ProfessionalScenario } from "@/types/vocational";

export const professionalScenarios = [
  {
    id: "supplier-order-email",
    title: "Email para realizar un pedido a un proveedor",
    professionalFamily: "Administración y Gestión",
    description:
      "El alumnado redacta un email formal para solicitar productos, confirmar cantidades y pedir fecha de entrega.",
    suggestedLevels: ["A2-high", "B1-low", "B1"],
    skillFocus: ["writing", "vocabulary", "mediation"],
  },
  {
    id: "complaint-response",
    title: "Responder a una queja de un cliente",
    professionalFamily: "Comercio y Marketing",
    description:
      "El alumnado responde con tono profesional a una queja sobre retraso, producto defectuoso o mala experiencia.",
    suggestedLevels: ["A2-high", "B1-low", "B1-high"],
    skillFocus: ["writing", "customer-service", "grammar"],
  },
  {
    id: "helpdesk-password-reset",
    title: "Llamada de soporte para resetear una contraseña",
    professionalFamily: "Informática y Comunicaciones",
    description:
      "El alumnado practica una interacción de helpdesk con instrucciones paso a paso y comprobación de datos.",
    suggestedLevels: ["A2", "A2-high", "B1"],
    skillFocus: ["listening", "speaking", "vocabulary"],
  },
  {
    id: "hotel-booking-confirmation",
    title: "Confirmar una reserva de hotel",
    professionalFamily: "Hostelería y Turismo",
    description:
      "El alumnado confirma fechas, número de huéspedes, servicios incluidos y condiciones de llegada.",
    suggestedLevels: ["A2-low", "A2", "B1-low"],
    skillFocus: ["speaking", "writing", "customer-service"],
  },
  {
    id: "salon-appointment",
    title: "Responder a un cliente que pide cita",
    professionalFamily: "Imagen Personal",
    description:
      "El alumnado gestiona una cita de peluquería, pregunta preferencias y confirma servicio, precio aproximado y hora.",
    suggestedLevels: ["A2-low", "A2", "A2-high"],
    skillFocus: ["speaking", "writing", "customer-service"],
  },
] satisfies ProfessionalScenario[];
