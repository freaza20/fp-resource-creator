# Teacher AI App

SaaS educativo impulsado por IA para profesorado de inglés profesional en Formación Profesional.

## Visión General

Teacher AI App ayuda a docentes de FP a crear y adaptar recursos de inglés contextualizados por familia profesional, ciclo, nivel y situación laboral. El producto se centra en recursos prácticos para FP Básica, Grado Medio y Grado Superior, con progresión lingüística desde A2-low hasta B1-high.

La aplicación está pensada para generar materiales revisables: emails profesionales, role plays, listenings, worksheets, readings, exámenes breves, vocabulario técnico y actividades comunicativas conectadas con el mundo laboral.

FP Básica se trata como una línea pedagógica propia: `foundation`. No se plantea como una versión rebajada de Grado Medio o Superior, sino como recursos de base, breves, muy guiados y orientados a recuperar confianza comunicativa dentro del Ámbito de Comunicación y Ciencias Sociales.

## Funcionalidades Actuales

- Dashboard FP-first con grupos, recursos recientes y métricas.
- Taxonomía base de familias profesionales.
- Subniveles lingüísticos A2-low, A2, A2-high, B1-low, B1 y B1-high.
- Mock data de grupos, vocabulario, gramática, escenarios y recursos.
- Arquitectura de IA simulada con prompts separados por tipo de recurso.
- Route Handler interno para generación IA con proveedor mock y control freemium.
- Estado cliente modular con Zustand.
- Biblioteca FP inicial conectada a recursos aprobados del banco editorial.
- Biblioteca avanzada con búsqueda, filtros, vista de detalle y cobertura editorial.
- Soporte explícito para `foundation` en FP Básica y `professional` en Grado Medio/Superior.
- Perfil de usuario mock con plan freemium, verificación de teléfono y límites de uso.
- Configuración docente inicial para preferencias de generación y adaptación.
- Flujo mock para adaptar recursos de la biblioteca a grupos concretos.
- Validación local del banco de recursos con `npm run validate:resource-bank`.
- Modelo editorial con familias FP completas, escenarios reutilizables, plantillas y cobertura.

## Familias Profesionales

La app contempla el catálogo base de familias profesionales de ciclos de FP en España. Cada familia se clasifica con una prioridad editorial:

- `core`: familias prioritarias para el banco inicial.
- `secondary`: familias relevantes para expansión progresiva.
- `specialized`: familias de cobertura más específica.

El catálogo vive en `lib/mock-data/professional-families.ts`.

## Ejemplos De Situaciones Profesionales

- Escribir un email para realizar un pedido a un proveedor.
- Responder a una queja de cliente.
- Atender una llamada de soporte técnico.
- Confirmar una reserva de hotel.
- Responder a un cliente que pide cita en una peluquería.

## Stack

- Next.js 16.2.6.
- App Router.
- React 19.2.4.
- TypeScript 5.
- Tailwind CSS 4.
- Zustand.
- ESLint 9.
- npm.

## Instalación

```bash
npm install
```

```bash
npm run dev
```

Abre:

```text
http://localhost:3000
```

## Verificación

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Estructura Principal

```text
app/
components/
  adapt/
  dashboard/
  library/
  layout/
  profile/
  settings/
  ui/
hooks/
content/
  resource-bank/
    pending/
    approved/
    rejected/
docs/
lib/
  adaptation/
  ai/
    prompts/
    providers/
  billing/
  resource-bank/
  mock-data/
scripts/
store/
types/
```

## Banco De Recursos

La app incluye un pipeline editorial para generar recursos desde otras tareas de Codex sin tocar la aplicación principal.

- `content/resource-bank/pending/`: recursos generados pendientes de revisión.
- `content/resource-bank/approved/`: recursos revisados y listos para importar.
- `content/resource-bank/rejected/`: recursos descartados o incompletos.

El contrato de datos está en `types/resource-bank.ts`. La validación vive en `lib/resource-bank/validate-resource-bank-item.ts` y el mapeo hacia recursos ligeros de la app en `lib/resource-bank/map-bank-item-to-resource.ts`.

La guía operativa está en `docs/resource-bank-guidelines.md`.

Para validar los recursos locales del banco:

```bash
npm run validate:resource-bank
```

Los recursos aprobados se cargan desde `lib/resource-bank/approved-resource-bank.ts` y se muestran en `/library`.

## Modelo Editorial

La Fase 8 introduce una capa editorial para evitar que el banco crezca como una colección desordenada de recursos.

- `types/editorial-template.ts`: contratos para plantillas editoriales.
- `lib/mock-data/professional-scenarios.ts`: situaciones profesionales reutilizables.
- `lib/mock-data/editorial-templates.ts`: moldes pedagógicos por escenario.
- `lib/resource-bank/coverage.ts`: cálculo de cobertura por familia, nivel y tipo.
- `docs/editorial-model.md`: guía editorial del producto.

El modelo distingue:

- `foundation`: FP Básica, base comunicativa, apoyo alto y microtareas.
- `professional`: Grado Medio y Superior, recursos profesionales por familia y situación.

## Modelo Freemium

La app incluye una arquitectura mock para preparar autenticación, perfil y límites antes de conectar Supabase.

- `types/user.ts`: perfil, verificación y preferencias docentes.
- `types/billing.ts`: planes, límites y eventos de uso.
- `store/useSessionStore.ts`: sesión mock y acciones simuladas.
- `lib/mock-data/user-profile.ts`: usuario docente de ejemplo.
- `lib/mock-data/billing.ts`: planes `Gratuito`, `Pro` y `Centro`.
- `app/profile`: perfil, verificación y límites.
- `app/settings`: preferencias docentes.

La estrategia freemium prevista es:

- email verificado para entrar y probar la biblioteca.
- teléfono verificado para activar créditos gratuitos de IA.
- planes de pago para ampliar generaciones, grupos, recursos guardados y exportaciones.

Durante la fase mock, la sesión y los recursos creados se persisten en
`localStorage` con Zustand para validar recorridos entre `/profile`,
`/settings`, `/adapt` y el dashboard. Esta persistencia no sustituye a Supabase
Auth ni a la validación real de límites en servidor.

## Adaptación De Recursos

La Fase 11 conecta biblioteca, perfil docente, grupos y límites freemium mediante un flujo mock.

- `types/adaptation.ts`: petición, opciones y resultado de adaptación.
- `lib/adaptation/mock-adapter.ts`: servicio simulado de adaptación.
- `store/useAdaptationStore.ts`: estado del recurso base, grupo, opciones y resultado.
- `app/adapt`: pantalla de adaptación.

Flujo previsto:

```text
Biblioteca
→ Usar como base
→ Adaptar a grupo
→ Consumir crédito IA mock
→ Guardar recurso adaptado
```

## Arquitectura IA

La Fase 12 prepara la integración real con proveedores IA sin exponer claves ni
acoplar la UI a un SDK externo.

- `app/api/ai/generate/route.ts`: endpoint interno para generar recursos.
- `lib/ai/client.ts`: cliente usado por hooks de React.
- `lib/ai/request-validation.ts`: validación de petición y límites freemium mock.
- `lib/ai/providers/types.ts`: contrato común de proveedor IA.
- `lib/ai/providers/mock-provider.ts`: proveedor activo por defecto.
- `lib/ai/resource-generator.ts`: prepara prompts y delega en el proveedor.

Flujo de generación:

```text
UI
→ hook de generación
→ cliente interno
→ /api/ai/generate
→ validación de petición y límite
→ proveedor IA
→ respuesta estructurada
```

La respuesta incluye metadatos de coste estimado:

- tokens de entrada estimados.
- tokens de salida estimados.
- coste aproximado en USD.
- marca de revisión docente obligatoria.

Cuando se conecte una API real, el proveedor deberá implementarse en
`lib/ai/providers/` y usar variables de entorno de servidor. Las claves no deben
aparecer en componentes, hooks ni stores.

## Roadmap Próximo

### Fase 6: Banco Editorial

- Pipeline editorial del banco de recursos.

### Fase 7: Biblioteca FP

- Recursos aprobados de ejemplo.
- Script de validación del banco.
- Pantalla `/library` conectada al banco aprobado.

### Fase 8: Modelo Editorial FP

- Catálogo completo de familias profesionales.
- Escenarios transversales adaptables por familia.
- Plantillas editoriales reutilizables.
- Cobertura del banco de recursos.
- Documentación del modelo editorial.

### Fase 9: Biblioteca FP Avanzada

- Filtros por familia profesional, subnivel, tipo y skill.
- Filtros por línea pedagógica y nivel de apoyo.
- Búsqueda por título, escenario, tags o contexto.
- Vista de detalle de recurso.
- Panel de cobertura editorial.
- Acción preparada para adaptar recursos en fases posteriores.
- Adaptación explícita de FP Básica como línea `foundation`.

### Fase 10: Perfil, Freemium Y Configuración Docente

- Perfil de usuario mock.
- Modelo freemium con límites.
- Verificación de teléfono simulada para activar créditos IA.
- Preferencias docentes iniciales.
- Rutas `/profile` y `/settings`.

### Fase 11: Generador Adaptativo

- Ruta `/adapt`.
- Uso de recurso base desde biblioteca.
- Combinación de preferencias docentes, grupo y banco editorial.
- Consumo de crédito IA mock.
- Guardado de recurso adaptado en recursos recientes.
- Persistencia local de sesión demo para probar verificación, plan y consumo.

### Fase 12: Frontera IA Segura

- Route Handler seguro para generación.
- Capa de proveedor IA intercambiable.
- Validación de petición y límites freemium mock.
- Salida estructurada con estimación de tokens y coste.
- Hook de generación conectado al endpoint interno.

### Fase 12.5: Proveedor IA Real

- Crear cuenta del proveedor seleccionado.
- Añadir variables de entorno locales.
- Implementar proveedor real en `lib/ai/providers/`.
- Probar con presupuesto bajo y límites estrictos.

### Fase 13: Supabase Y Producto SaaS

- Autenticación.
- Persistencia de grupos, recursos y bancos.
- Planes y límites.
- Métricas de uso.

## Principios

- FP-first.
- Interfaz de la app en español.
- Contenido didáctico en inglés, español o mixto según nivel y finalidad.
- Ejemplos profesionales realistas.
- IA como asistente, no como sustituto docente.
- Revisión humana obligatoria.
- Arquitectura modular y preparada para crecer.
