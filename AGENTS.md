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
- `lib/ai/`: frontera de IA con tipos, prompts, orquestador y proveedor mock.
- `store/`: estado cliente modular con Zustand.
- `hooks/`: hooks de aplicación, como generación de recursos.
- `components/ui/`: primitivas reutilizables.
- `components/dashboard/`: piezas del dashboard FP.
- `components/layout/`: estructura de navegación.
- `app/`: rutas App Router y composición de página.

## Reglas De Dominio

- El producto es FP-first. No introducir ESO, Bachillerato ni inglés general salvo como contenido auxiliar claramente justificado.
- Toda generación debe estar contextualizada por familia profesional, ciclo, subnivel, escenario y skill.
- Los recursos deben poder clasificarse por familia, nivel, escenario, tipo y foco comunicativo.
- Los prompts deben vivir en `lib/ai/prompts/`, separados por tipo de recurso.
- La UI no debe llamar directamente a proveedores IA. Debe pasar por hooks y servicios de `lib/ai/`.
- No conectar OpenAI, Supabase, autenticación, pagos ni PDF sin una fase explícita.

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
- Lee el contexto local antes de editar.
- Respeta cambios existentes del usuario.
- Mantén la separación entre datos, estado, UI, IA y futura persistencia.
- Si añades una familia profesional, crea también escenarios, vocabulario y recursos coherentes.
- Si añades un tipo de recurso, actualiza tipos, prompts, mock service, UI y documentación.
- Prioriza utilidad docente real frente a demostraciones superficiales.
