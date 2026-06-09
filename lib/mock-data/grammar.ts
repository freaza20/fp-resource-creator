import type { GrammarTopic } from "@/types/grammar";

export const grammarTopics = [
  {
    id: "grammar-polite-requests",
    title: "Peticiones formales con could y would",
    level: "A2-high",
    professionalFamily: "Transversal",
    skillFocus: ["writing", "speaking", "customer-service"],
    explanation:
      "Se usa para pedir información, hacer solicitudes y mantener un tono profesional en emails, llamadas y atención al cliente.",
  },
  {
    id: "grammar-advice-should",
    title: "Consejos con should y should not",
    level: "A2",
    professionalFamily: "Transversal",
    skillFocus: ["speaking", "writing", "customer-service"],
    explanation:
      "Se usa para recomendar servicios, dar instrucciones posteriores y responder a necesidades habituales de clientes.",
  },
  {
    id: "grammar-imperatives-procedures",
    title: "Imperativos para procedimientos e instrucciones",
    level: "A2-low",
    professionalFamily: "Transversal",
    skillFocus: ["listening", "speaking", "grammar"],
    explanation:
      "Se usa para dar instrucciones claras paso a paso en procedimientos laborales y rutinas de seguridad.",
  },
  {
    id: "grammar-first-conditional-troubleshooting",
    title: "Primer condicional para resolver incidencias",
    level: "B1",
    professionalFamily: "Informática y Comunicaciones",
    skillFocus: ["speaking", "writing", "grammar"],
    explanation:
      "Se usa para explicar resultados probables en soporte técnico, por ejemplo qué ocurrirá si un usuario reinicia un dispositivo.",
  },
  {
    id: "grammar-past-simple-incident-reports",
    title: "Past simple para partes de incidencia",
    level: "B1-low",
    professionalFamily: "Transversal",
    skillFocus: ["writing", "mediation", "grammar"],
    explanation:
      "Se usa para informar de acciones terminadas, incidencias, quejas y pasos de seguimiento en contextos profesionales.",
  },
] satisfies GrammarTopic[];
