<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Visión General

`teacher-ai-app` es un SaaS educativo impulsado por IA para profesorado de inglés profesional en Formación Profesional en España. El producto se centra exclusivamente en FP y ayuda a crear, adaptar, organizar y evaluar recursos por:

- Familia profesional.
- Ciclo formativo.
- Nivel de FP: FP Básica, Grado Medio y Grado Superior.
- Subnivel lingüístico: A2-low, A2, A2-high, B1-low, B1 y B1-high.
- Línea pedagógica: `foundation` para FP Básica y `professional` para Grado Medio/Superior.
- Situación profesional: emails, pedidos, citas, quejas, soporte técnico, reservas, atención al cliente, procedimientos y tareas laborales reales.

La IA debe actuar como asistente del docente. El profesor siempre revisa, adapta y decide el uso final del contenido.

## Stack Tecnológico

- Next.js 16.2.6 con App Router.
- React 19.2.4.
- TypeScript 5 con `strict` activo.
- Tailwind CSS 4.
- Zustand para estado cliente.
- ESLint 9.
- npm.

Antes de modificar código de Next.js, consulta la documentación local en `node_modules/next/dist/docs/`.

## Arquitectura

- `types/`: contratos transversales de dominio, FP, recursos, vocabulario y gramática.
- `lib/mock-data/`: datos semilla realistas para familias profesionales, escenarios, grupos, vocabulario, gramática y recursos.
- `content/resource-bank/`: entrada editorial para recursos generados por tareas separadas de Codex.
- `docs/resource-bank-guidelines.md`: guía obligatoria para generar recursos compatibles con el banco.
- `docs/editorial-model.md`: guía del modelo editorial, criterios de calidad y priorización.
- `docs/ai-provider-evaluation.md`: guía para comparar proveedores IA antes de conectar APIs reales.
- `lib/resource-bank/`: validación y transformación de recursos estructurados.
- `lib/billing/`: lógica de límites, planes y uso freemium.
- `lib/adaptation/`: servicios para adaptar recursos de biblioteca a grupos.
- `lib/ai/`: frontera de IA con tipos, prompts, validación, cliente interno, orquestador y proveedores.
- `lib/ai/providers/`: interfaz común para proveedor mock y proveedores reales futuros.
- `lib/ai-evaluation/`: cálculo de costes y ranking provisional de proveedores IA.
- `store/`: estado cliente modular con Zustand.
- `hooks/`: hooks de aplicación, como generación de recursos.
- `components/ui/`: primitivas reutilizables.
- `components/ai-evaluation/`: herramienta interna para evaluar proveedores IA.
- `components/adapt/`: flujo de adaptación de recursos.
- `components/dashboard/`: piezas del dashboard FP.
- `components/library/`: componentes de la biblioteca FP y del banco de recursos.
- `components/profile/`: perfil de usuario, plan, verificación y límites.
- `components/settings/`: preferencias docentes y configuración pedagógica.
- `components/layout/`: estructura de navegación.
- `scripts/`: utilidades locales de validación y mantenimiento.
- `app/`: rutas App Router y composición de página.

## Reglas De Dominio

- El producto es FP-first. No introducir ESO, Bachillerato ni inglés general salvo como contenido auxiliar claramente justificado.
- Toda generación debe estar contextualizada por familia profesional, ciclo, subnivel, escenario y skill.
- FP Básica debe tratarse como línea `foundation`: recursos breves, muy guiados, con apoyo alto y orientados a reconstruir bases comunicativas.
- No crear para FP Básica recursos largos o equivalentes a Grado Medio rebajado.
- Los recursos deben poder clasificarse por familia, nivel, escenario, tipo y foco comunicativo.
- Los escenarios profesionales deben ser reutilizables entre familias cuando tenga sentido.
- Las plantillas editoriales viven en `lib/mock-data/editorial-templates.ts` y deben orientar futuras generaciones IA.
- Los prompts deben vivir en `lib/ai/prompts/`, separados por tipo de recurso.
- La UI no debe llamar directamente a proveedores IA. Debe pasar por hooks, `lib/ai/client.ts` y Route Handlers internos.
- La generación de recursos debe entrar por `app/api/ai/generate/route.ts`, incluso cuando el proveedor sea mock.
- Las claves reales de proveedores IA deben vivir solo en variables de entorno de servidor, nunca en componentes cliente, stores ni hooks.
- La ruta `/ai-evaluation` es interna y preparatoria. No debe llamar APIs reales hasta una fase explícita de benchmark conectado.
- Antes de elegir proveedor IA, revisar casos, costes y rúbrica en `docs/ai-provider-evaluation.md`.
- No conectar OpenAI, Supabase, autenticación, pagos ni PDF sin una fase explícita.
- El modelo freemium actual es mock. La sesión demo persiste en `localStorage` para probar recorridos, pero no debe tratarse como seguridad real hasta conectar Supabase Auth y validación en servidor.
- El teléfono debe usarse como barrera para activar créditos gratuitos de IA, no como fricción inicial innecesaria.
- La adaptación actual es mock. Debe pasar por `store/useAdaptationStore.ts` y `lib/adaptation/`, no llamarse directamente desde la UI final.
- El flujo de adaptación debe respetar límites freemium antes de consumir generación IA real o simulada.
- Las tareas de Codex dedicadas a generar recursos deben escribir solo en `content/resource-bank/pending/` y seguir `docs/resource-bank-guidelines.md`.
- Los recursos pendientes no deben importarse a la app sin revisión humana.
- Los recursos aprobados se cargan desde `content/resource-bank/approved/` mediante `lib/resource-bank/approved-resource-bank.ts`.
- Ejecutar `npm run validate:resource-bank` tras añadir o mover recursos del banco.
- Al ampliar el banco, revisar la cobertura con `lib/resource-bank/coverage.ts` para priorizar huecos reales.
- La pantalla `/library` debe seguir siendo una herramienta de trabajo: filtros claros, detalle de recurso y acciones orientadas a adaptación.

## Política Lingüística

- La interfaz visible de la app debe estar en español.
- La navegación, filtros, botones, métricas, estados y metadatos visibles deben estar en español.
- Las notas docentes deben estar en español.
- El contenido didáctico puede estar en inglés, español o mixto según nivel, tipo de recurso y finalidad.
- En FP Básica `foundation`, las instrucciones al alumnado deben priorizar español o formato mixto muy guiado.
- Los identificadores internos, tipos TypeScript, rutas y claves de datos pueden seguir en inglés.

## Convenciones De Código

- Usar TypeScript en todos los archivos nuevos.
- Mantener modelos pequeños, explícitos y reutilizables.
- Preferir imports absolutos con `@/`.
- Usar `satisfies` en mock data para validar contratos sin perder inferencia.
- Evitar `any`.
- Evitar archivos gigantes; dividir por dominio o responsabilidad.
- No usar textos de relleno. Los ejemplos deben representar situaciones profesionales reales de FP.
- Ejecutar `npx tsc --noEmit`, `npm run lint` y `npm run build` antes de cerrar fases de implementación.

## Estilo Visual

La interfaz debe sentirse como una herramienta SaaS profesional para docentes:

- Limpia, sobria y fácil de escanear.
- Inspirada en Linear, Notion y Supabase, sin copiar marcas.
- Densa cuando haya datos, pero con jerarquía clara.
- Preparada para dark mode.
- Sin estética de landing genérica en pantallas de herramienta.

## Instrucciones Para Futuros Agentes IA

- Trabaja siempre en español.
- Antes de cerrar una fase con UI, revisa que la interfaz visible no mezcle etiquetas en inglés salvo contenido didáctico justificado.
- Lee el contexto local antes de editar.
- Respeta cambios existentes del usuario.
- Mantén la separación entre datos, estado, UI, IA y futura persistencia.
- Si añades una familia profesional, crea también escenarios, vocabulario y recursos coherentes.
- Si añades un escenario transversal, indica familias aplicables, niveles sugeridos y tipos de recurso.
- Si añades una plantilla editorial, vincúlala a un escenario existente.
- Si añades un tipo de recurso, actualiza tipos, prompts, mock service, UI y documentación.
- Si añades un proveedor IA, implementa `AIResourceProvider` en `lib/ai/providers/` y conserva el contrato de respuesta estructurada.
- Si generas recursos para el banco, no modifiques UI ni stores; crea JSON compatible con `types/resource-bank.ts`.
- Prioriza utilidad docente real frente a demostraciones superficiales.
- Cuando modifiques la biblioteca, mantén separados la carga de datos del banco y la interacción cliente.
