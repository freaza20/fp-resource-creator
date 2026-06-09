import type { ProfessionalFamilyProfile } from "@/types/vocational";

export const professionalFamilies = [
  {
    id: "family-physical-sports",
    name: "Actividades Físicas y Deportivas",
    description:
      "Instrucciones de entrenamiento, seguridad, atención a usuarios y promoción de servicios deportivos.",
    priority: "secondary",
    communicationDomains: ["customer-service", "safety"],
    commonScenarios: ["service-explanation", "safety-instructions", "appointment-booking"],
    vocabularyAreas: ["equipment", "body movement", "safety rules", "fitness goals"],
  },
  {
    id: "family-admin",
    name: "Administración y Gestión",
    description:
      "Comunicación administrativa, pedidos, facturas, proveedores, agenda y atención formal por email.",
    priority: "core",
    communicationDomains: ["administration", "customer-service"],
    commonScenarios: ["supplier-order", "invoice-follow-up", "meeting-arrangement"],
    vocabularyAreas: ["office supplies", "invoices", "delivery dates", "formal emails"],
  },
  {
    id: "family-agrarian",
    name: "Agraria",
    description:
      "Procesos agrícolas, maquinaria, seguridad, pedidos, productos y comunicación con clientes o proveedores.",
    priority: "secondary",
    communicationDomains: ["production", "safety", "sales"],
    commonScenarios: ["product-description", "safety-instructions", "supplier-order"],
    vocabularyAreas: ["crops", "tools", "machinery", "weather", "quality control"],
  },
  {
    id: "family-graphic-arts",
    name: "Artes Gráficas",
    description:
      "Encargos de impresión, revisión de diseños, presupuestos, materiales y comunicación con clientes.",
    priority: "secondary",
    communicationDomains: ["creative-services", "customer-service"],
    commonScenarios: ["budget-request", "product-description", "customer-complaint"],
    vocabularyAreas: ["printing", "formats", "deadlines", "design changes"],
  },
  {
    id: "family-arts-crafts",
    name: "Artes y Artesanías",
    description:
      "Descripción de piezas, encargos personalizados, materiales, ferias, venta y comunicación con clientes.",
    priority: "specialized",
    communicationDomains: ["creative-services", "sales"],
    commonScenarios: ["product-description", "budget-request", "customer-complaint"],
    vocabularyAreas: ["materials", "handmade products", "custom orders", "exhibitions"],
  },
  {
    id: "family-commerce",
    name: "Comercio y Marketing",
    description:
      "Atención al cliente, ventas, reclamaciones, disponibilidad de producto y seguimiento comercial.",
    priority: "core",
    communicationDomains: ["sales", "customer-service"],
    commonScenarios: ["customer-complaint", "product-description", "sales-follow-up"],
    vocabularyAreas: ["prices", "offers", "returns", "product features"],
  },
  {
    id: "family-building",
    name: "Edificación y Obra Civil",
    description:
      "Obras, mediciones, materiales, prevención, coordinación de equipos y comunicación de incidencias.",
    priority: "secondary",
    communicationDomains: ["technical-support", "safety", "production"],
    commonScenarios: ["safety-instructions", "technical-incident", "progress-update"],
    vocabularyAreas: ["materials", "site safety", "measurements", "tools"],
  },
  {
    id: "family-electricity",
    name: "Electricidad y Electrónica",
    description:
      "Instalaciones, averías, instrucciones de seguridad, partes técnicos y explicación de procedimientos.",
    priority: "core",
    communicationDomains: ["technical-support", "safety", "maintenance"],
    commonScenarios: ["technical-incident", "safety-instructions", "service-explanation"],
    vocabularyAreas: ["components", "faults", "tools", "safety procedures"],
  },
  {
    id: "family-energy-water",
    name: "Energía y Agua",
    description:
      "Mantenimiento de instalaciones, eficiencia energética, incidencias, mediciones y prevención de riesgos.",
    priority: "specialized",
    communicationDomains: ["maintenance", "environment", "safety"],
    commonScenarios: ["technical-incident", "safety-instructions", "progress-update"],
    vocabularyAreas: ["energy systems", "water treatment", "meters", "maintenance"],
  },
  {
    id: "family-mechanical",
    name: "Fabricación Mecánica",
    description:
      "Procesos de fabricación, planos, control de calidad, maquinaria, seguridad y comunicación de incidencias.",
    priority: "secondary",
    communicationDomains: ["production", "safety", "maintenance"],
    commonScenarios: ["safety-instructions", "technical-incident", "quality-control-report"],
    vocabularyAreas: ["machines", "measurements", "materials", "quality checks"],
  },
  {
    id: "family-it",
    name: "Informática y Comunicaciones",
    description:
      "Soporte técnico, tickets, mantenimiento, ciberseguridad básica y explicación de incidencias.",
    priority: "core",
    communicationDomains: ["technical-support", "customer-service"],
    commonScenarios: ["technical-incident", "helpdesk-call", "service-explanation"],
    vocabularyAreas: ["hardware", "software", "accounts", "network issues"],
  },
  {
    id: "family-hospitality",
    name: "Hostelería y Turismo",
    description:
      "Reservas, check-in, recomendaciones turísticas, alergias alimentarias y quejas de huéspedes.",
    priority: "core",
    communicationDomains: ["tourism", "customer-service", "sales"],
    commonScenarios: ["booking-confirmation", "customer-complaint", "service-explanation"],
    vocabularyAreas: ["bookings", "guest requests", "food allergies", "local recommendations"],
  },
  {
    id: "family-personal-image",
    name: "Imagen Personal",
    description:
      "Citas, servicios de peluquería o estética, recomendaciones, trato al cliente y cuidados posteriores.",
    priority: "core",
    communicationDomains: ["customer-service", "sales"],
    commonScenarios: ["appointment-booking", "service-explanation", "customer-complaint"],
    vocabularyAreas: ["appointments", "treatments", "haircare", "skin care"],
  },
  {
    id: "family-audiovisual",
    name: "Imagen y Sonido",
    description:
      "Producción audiovisual, equipos, planificación de rodajes, instrucciones técnicas y trato con clientes.",
    priority: "secondary",
    communicationDomains: ["creative-services", "technical-support"],
    commonScenarios: ["budget-request", "technical-incident", "progress-update"],
    vocabularyAreas: ["equipment", "shooting schedule", "editing", "sound checks"],
  },
  {
    id: "family-food-industries",
    name: "Industrias Alimentarias",
    description:
      "Procesos de producción, higiene, calidad, etiquetado, seguridad alimentaria y pedidos.",
    priority: "secondary",
    communicationDomains: ["production", "safety", "sales"],
    commonScenarios: ["quality-control-report", "safety-instructions", "supplier-order"],
    vocabularyAreas: ["ingredients", "hygiene", "packaging", "quality standards"],
  },
  {
    id: "family-extractive",
    name: "Industrias Extractivas",
    description:
      "Procesos de extracción, maquinaria, prevención de riesgos, informes de incidencia y seguridad.",
    priority: "specialized",
    communicationDomains: ["production", "safety", "maintenance"],
    commonScenarios: ["safety-instructions", "technical-incident", "progress-update"],
    vocabularyAreas: ["machinery", "protective equipment", "materials", "risk prevention"],
  },
  {
    id: "family-maintenance",
    name: "Instalación y Mantenimiento",
    description:
      "Instalaciones, mantenimiento preventivo, averías, instrucciones técnicas y atención a clientes.",
    priority: "core",
    communicationDomains: ["maintenance", "technical-support", "customer-service"],
    commonScenarios: ["technical-incident", "service-explanation", "customer-complaint"],
    vocabularyAreas: ["faults", "tools", "maintenance checks", "repair times"],
  },
  {
    id: "family-wood",
    name: "Madera, Mueble y Corcho",
    description:
      "Materiales, fabricación, pedidos a medida, acabados, presupuestos y comunicación con clientes.",
    priority: "specialized",
    communicationDomains: ["production", "sales", "customer-service"],
    commonScenarios: ["budget-request", "product-description", "customer-complaint"],
    vocabularyAreas: ["wood types", "measurements", "finishes", "custom furniture"],
  },
  {
    id: "family-maritime",
    name: "Marítimo-Pesquera",
    description:
      "Seguridad marítima, operaciones pesqueras, mantenimiento, comunicaciones básicas y partes de incidencia.",
    priority: "specialized",
    communicationDomains: ["safety", "production", "maintenance"],
    commonScenarios: ["safety-instructions", "technical-incident", "progress-update"],
    vocabularyAreas: ["vessels", "weather", "equipment", "safety procedures"],
  },
  {
    id: "family-chemistry",
    name: "Química",
    description:
      "Laboratorio, seguridad, procedimientos, control de calidad, materiales y comunicación de resultados.",
    priority: "secondary",
    communicationDomains: ["production", "safety", "environment"],
    commonScenarios: ["safety-instructions", "quality-control-report", "progress-update"],
    vocabularyAreas: ["lab equipment", "substances", "measurements", "safety signs"],
  },
  {
    id: "family-healthcare",
    name: "Sanidad",
    description:
      "Recepción de pacientes, citas, instrucciones básicas, hábitos saludables y comunicación empática.",
    priority: "core",
    communicationDomains: ["healthcare", "customer-service"],
    commonScenarios: ["appointment-booking", "service-explanation", "customer-complaint"],
    vocabularyAreas: ["appointments", "symptoms", "instructions", "patient care"],
  },
  {
    id: "family-safety-environment",
    name: "Seguridad y Medio Ambiente",
    description:
      "Prevención, emergencias, protocolos, gestión ambiental, inspecciones y comunicación de riesgos.",
    priority: "secondary",
    communicationDomains: ["safety", "environment"],
    commonScenarios: ["safety-instructions", "progress-update", "technical-incident"],
    vocabularyAreas: ["risk prevention", "waste management", "emergencies", "inspection"],
  },
  {
    id: "family-social-services",
    name: "Servicios Socioculturales y a la Comunidad",
    description:
      "Comunicación con usuarios, familias y equipos; rutinas, incidencias, mediación y cuidado.",
    priority: "core",
    communicationDomains: ["education-care", "customer-service"],
    commonScenarios: ["progress-update", "service-explanation", "customer-complaint"],
    vocabularyAreas: ["daily routines", "care needs", "family communication", "activities"],
  },
  {
    id: "family-textile",
    name: "Textil, Confección y Piel",
    description:
      "Prendas, arreglos, materiales, medidas, encargos, incidencias y atención al cliente.",
    priority: "secondary",
    communicationDomains: ["production", "sales", "customer-service"],
    commonScenarios: ["appointment-booking", "budget-request", "customer-complaint"],
    vocabularyAreas: ["garments", "measurements", "materials", "alterations"],
  },
  {
    id: "family-vehicles",
    name: "Transporte y Mantenimiento de Vehículos",
    description:
      "Recepción de vehículos, diagnóstico, presupuestos, reparaciones, entrega y explicación de averías.",
    priority: "core",
    communicationDomains: ["maintenance", "technical-support", "customer-service"],
    commonScenarios: ["technical-incident", "budget-request", "service-explanation"],
    vocabularyAreas: ["vehicle parts", "faults", "repairs", "quotes"],
  },
  {
    id: "family-glass-ceramics",
    name: "Vidrio y Cerámica",
    description:
      "Procesos de fabricación, materiales, control de calidad, pedidos específicos y seguridad.",
    priority: "specialized",
    communicationDomains: ["production", "safety", "sales"],
    commonScenarios: ["quality-control-report", "safety-instructions", "product-description"],
    vocabularyAreas: ["materials", "kilns", "defects", "custom orders"],
  },
] satisfies ProfessionalFamilyProfile[];
