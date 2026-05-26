import type { ProfessionalFamilyProfile } from "@/types/vocational";

export const professionalFamilies = [
  {
    id: "family-admin",
    name: "Administración y Gestión",
    description:
      "Comunicación administrativa, pedidos, facturas, proveedores y atención formal por email.",
    commonScenarios: [
      "supplier-order-email",
      "invoice-follow-up",
      "complaint-response",
    ],
  },
  {
    id: "family-commerce",
    name: "Comercio y Marketing",
    description:
      "Atención al cliente, ventas, reclamaciones, disponibilidad de producto y seguimiento comercial.",
    commonScenarios: [
      "product-availability",
      "customer-complaint",
      "sales-follow-up",
    ],
  },
  {
    id: "family-it",
    name: "Informática y Comunicaciones",
    description:
      "Soporte técnico, tickets, mantenimiento, ciberseguridad básica y explicación de incidencias.",
    commonScenarios: [
      "helpdesk-password-reset",
      "network-issue-report",
      "software-installation-guide",
    ],
  },
  {
    id: "family-hospitality",
    name: "Hostelería y Turismo",
    description:
      "Reservas, check-in, recomendaciones turísticas, alergias alimentarias y quejas de huéspedes.",
    commonScenarios: [
      "hotel-booking-confirmation",
      "restaurant-allergy-request",
      "guest-complaint",
    ],
  },
  {
    id: "family-personal-image",
    name: "Imagen Personal",
    description:
      "Citas, servicios de peluquería, recomendaciones, trato al cliente y cuidados posteriores.",
    commonScenarios: [
      "salon-appointment",
      "haircare-advice",
      "service-complaint-response",
    ],
  },
] satisfies ProfessionalFamilyProfile[];
