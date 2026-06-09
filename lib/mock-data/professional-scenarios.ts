import type { ProfessionalFamily, ProfessionalScenario } from "@/types/vocational";

const mostCustomerFacingFamilies = [
  "Administración y Gestión",
  "Comercio y Marketing",
  "Hostelería y Turismo",
  "Imagen Personal",
  "Sanidad",
  "Servicios Socioculturales y a la Comunidad",
  "Transporte y Mantenimiento de Vehículos",
] satisfies ProfessionalFamily[];

const technicalFamilies = [
  "Edificación y Obra Civil",
  "Electricidad y Electrónica",
  "Energía y Agua",
  "Fabricación Mecánica",
  "Informática y Comunicaciones",
  "Instalación y Mantenimiento",
  "Transporte y Mantenimiento de Vehículos",
] satisfies ProfessionalFamily[];

const productionFamilies = [
  "Agraria",
  "Fabricación Mecánica",
  "Industrias Alimentarias",
  "Industrias Extractivas",
  "Madera, Mueble y Corcho",
  "Marítimo-Pesquera",
  "Química",
  "Textil, Confección y Piel",
  "Vidrio y Cerámica",
] satisfies ProfessionalFamily[];

export const professionalScenarios = [
  {
    id: "supplier-order",
    title: "Realizar un pedido a un proveedor",
    description:
      "El alumnado solicita productos o materiales, confirma cantidades, condiciones y fecha de entrega.",
    applicableFamilies: [
      "Administración y Gestión",
      "Agraria",
      "Artes Gráficas",
      "Comercio y Marketing",
      "Hostelería y Turismo",
      "Industrias Alimentarias",
      "Imagen Personal",
    ],
    suggestedLevels: ["A2-low", "A2", "A2-high", "B1-low"],
    skillFocus: ["writing", "vocabulary", "mediation"],
    communicativeGoal:
      "Pedir materiales de forma clara y educada usando cantidades, plazos y fórmulas de cortesía.",
    suggestedResourceTypes: ["worksheet", "exam"],
    exampleContexts: [
      "pedido de material de oficina",
      "pedido de productos de peluquería",
      "solicitud de ingredientes a un proveedor",
    ],
  },
  {
    id: "customer-complaint",
    title: "Responder a una queja de cliente",
    description:
      "El alumnado identifica el problema, se disculpa, propone una solución y mantiene un tono profesional.",
    applicableFamilies: mostCustomerFacingFamilies,
    suggestedLevels: ["A2-high", "B1-low", "B1", "B1-high"],
    skillFocus: ["reading", "writing", "customer-service"],
    communicativeGoal:
      "Gestionar una reclamación con empatía, claridad y una solución realista.",
    suggestedResourceTypes: ["reading", "worksheet", "exam"],
    exampleContexts: [
      "pedido incompleto",
      "habitación ruidosa",
      "cita mal registrada",
      "reparación retrasada",
    ],
  },
  {
    id: "appointment-booking",
    title: "Gestionar una cita o reserva",
    description:
      "El alumnado confirma disponibilidad, registra datos, propone alternativas y cierra la interacción.",
    applicableFamilies: [
      "Actividades Físicas y Deportivas",
      "Hostelería y Turismo",
      "Imagen Personal",
      "Sanidad",
      "Servicios Socioculturales y a la Comunidad",
      "Textil, Confección y Piel",
    ],
    suggestedLevels: ["A2-low", "A2", "A2-high"],
    skillFocus: ["speaking", "writing", "customer-service"],
    communicativeGoal:
      "Confirmar fecha, hora, servicio y datos esenciales en una interacción breve.",
    suggestedResourceTypes: ["listening", "worksheet"],
    exampleContexts: [
      "cita de peluquería",
      "reserva de actividad deportiva",
      "cita sanitaria",
      "prueba de arreglos de una prenda",
    ],
  },
  {
    id: "technical-incident",
    title: "Comunicar o resolver una incidencia técnica",
    description:
      "El alumnado describe una avería, hace preguntas básicas y explica pasos de resolución o seguimiento.",
    applicableFamilies: technicalFamilies,
    suggestedLevels: ["A2", "A2-high", "B1-low", "B1"],
    skillFocus: ["listening", "speaking", "vocabulary"],
    communicativeGoal:
      "Describir un problema técnico y guiar al usuario con instrucciones sencillas.",
    suggestedResourceTypes: ["listening", "worksheet", "exam"],
    exampleContexts: [
      "impresora bloqueada",
      "corte eléctrico",
      "vehículo con ruido extraño",
      "incidencia en una instalación",
    ],
  },
  {
    id: "service-explanation",
    title: "Explicar un servicio o procedimiento",
    description:
      "El alumnado presenta un servicio, explica pasos, condiciones, duración y recomendaciones finales.",
    applicableFamilies: [
      "Actividades Físicas y Deportivas",
      "Comercio y Marketing",
      "Hostelería y Turismo",
      "Imagen Personal",
      "Informática y Comunicaciones",
      "Instalación y Mantenimiento",
      "Sanidad",
      "Servicios Socioculturales y a la Comunidad",
      "Transporte y Mantenimiento de Vehículos",
    ],
    suggestedLevels: ["A2-high", "B1-low", "B1", "B1-high"],
    skillFocus: ["speaking", "writing", "vocabulary"],
    communicativeGoal:
      "Explicar un proceso profesional de manera ordenada y comprensible para un cliente o usuario.",
    suggestedResourceTypes: ["reading", "worksheet", "exam"],
    exampleContexts: [
      "explicar un tratamiento de estética",
      "describir una reparación",
      "presentar un servicio turístico",
      "dar instrucciones de alta de usuario",
    ],
  },
  {
    id: "safety-instructions",
    title: "Dar instrucciones de seguridad",
    description:
      "El alumnado comprende y comunica normas, prohibiciones, riesgos y pasos de prevención.",
    applicableFamilies: [
      "Actividades Físicas y Deportivas",
      "Agraria",
      "Edificación y Obra Civil",
      "Electricidad y Electrónica",
      "Energía y Agua",
      "Fabricación Mecánica",
      "Industrias Alimentarias",
      "Industrias Extractivas",
      "Marítimo-Pesquera",
      "Química",
      "Seguridad y Medio Ambiente",
      "Vidrio y Cerámica",
    ],
    suggestedLevels: ["A2", "A2-high", "B1-low"],
    skillFocus: ["reading", "listening", "vocabulary"],
    communicativeGoal:
      "Comprender y comunicar normas de prevención con lenguaje claro y directo.",
    suggestedResourceTypes: ["reading", "listening", "worksheet"],
    exampleContexts: [
      "uso de equipo de protección",
      "normas en laboratorio",
      "seguridad en obra",
      "higiene alimentaria",
    ],
  },
  {
    id: "budget-request",
    title: "Pedir o enviar un presupuesto",
    description:
      "El alumnado solicita información, detalla necesidades, compara opciones y confirma condiciones.",
    applicableFamilies: [
      "Artes Gráficas",
      "Artes y Artesanías",
      "Comercio y Marketing",
      "Imagen y Sonido",
      "Madera, Mueble y Corcho",
      "Textil, Confección y Piel",
      "Transporte y Mantenimiento de Vehículos",
    ],
    suggestedLevels: ["A2-high", "B1-low", "B1"],
    skillFocus: ["reading", "writing", "mediation"],
    communicativeGoal:
      "Solicitar o responder a un presupuesto con requisitos, precios, plazos y condiciones.",
    suggestedResourceTypes: ["worksheet", "exam"],
    exampleContexts: [
      "presupuesto de reparación de vehículo",
      "presupuesto de impresión",
      "mueble a medida",
      "arreglo de prenda",
    ],
  },
  {
    id: "product-description",
    title: "Describir un producto o material",
    description:
      "El alumnado describe características, usos, ventajas, composición o instrucciones básicas.",
    applicableFamilies: [
      "Agraria",
      "Artes y Artesanías",
      "Comercio y Marketing",
      "Industrias Alimentarias",
      "Madera, Mueble y Corcho",
      "Textil, Confección y Piel",
      "Vidrio y Cerámica",
    ],
    suggestedLevels: ["A2-low", "A2", "A2-high", "B1-low"],
    skillFocus: ["speaking", "writing", "vocabulary"],
    communicativeGoal:
      "Presentar un producto con datos esenciales y lenguaje persuasivo o técnico básico.",
    suggestedResourceTypes: ["reading", "worksheet"],
    exampleContexts: [
      "descripción de producto local",
      "ficha de prenda",
      "material cerámico",
      "producto alimentario",
    ],
  },
  {
    id: "progress-update",
    title: "Comunicar el progreso de una tarea o proyecto",
    description:
      "El alumnado informa del estado de un trabajo, próximos pasos, retrasos y necesidades.",
    applicableFamilies: [
      ...technicalFamilies,
      "Imagen y Sonido",
      "Química",
      "Seguridad y Medio Ambiente",
      "Servicios Socioculturales y a la Comunidad",
    ],
    suggestedLevels: ["A2-high", "B1-low", "B1"],
    skillFocus: ["writing", "speaking", "mediation"],
    communicativeGoal:
      "Actualizar a un cliente, responsable o equipo sobre estado, dificultades y próximos pasos.",
    suggestedResourceTypes: ["worksheet", "exam"],
    exampleContexts: [
      "avance de reparación",
      "estado de proyecto audiovisual",
      "seguimiento de intervención social",
      "informe breve de mantenimiento",
    ],
  },
  {
    id: "quality-control-report",
    title: "Completar un control de calidad",
    description:
      "El alumnado registra resultados, identifica problemas y propone acciones correctivas.",
    applicableFamilies: productionFamilies,
    suggestedLevels: ["A2-high", "B1-low", "B1"],
    skillFocus: ["reading", "writing", "vocabulary"],
    communicativeGoal:
      "Describir resultados de control de calidad con datos básicos y acciones concretas.",
    suggestedResourceTypes: ["reading", "worksheet", "exam"],
    exampleContexts: [
      "lote con defecto",
      "medición fuera de tolerancia",
      "producto alimentario no conforme",
      "acabado de pieza defectuoso",
    ],
  },
] satisfies ProfessionalScenario[];
