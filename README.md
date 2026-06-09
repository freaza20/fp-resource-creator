# Teacher AI App

SaaS educativo impulsado por IA para profesorado de inglés profesional en Formación Profesional.

## Visión General

Teacher AI App ayuda a docentes de FP a crear y adaptar recursos de inglés contextualizados por familia profesional, ciclo, nivel y situación laboral. El producto se centra en recursos prácticos para FP Básica, Grado Medio y Grado Superior, con progresión lingüística desde A2-low hasta B1-high.

La aplicación está pensada para generar materiales revisables: emails profesionales, role plays, listenings, worksheets, readings, exámenes breves, vocabulario técnico y actividades comunicativas conectadas con el mundo laboral.

## Funcionalidades Actuales

- Dashboard FP-first con grupos, recursos recientes y métricas.
- Taxonomía base de familias profesionales.
- Subniveles lingüísticos A2-low, A2, A2-high, B1-low, B1 y B1-high.
- Mock data de grupos, vocabulario, gramática, escenarios y recursos.
- Arquitectura de IA simulada con prompts separados por tipo de recurso.
- Estado cliente modular con Zustand.
- Biblioteca FP inicial conectada a recursos aprobados del banco editorial.
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
  dashboard/
  library/
  layout/
  ui/
hooks/
content/
  resource-bank/
    pending/
    approved/
    rejected/
docs/
lib/
  ai/
    prompts/
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

### Fase 9: Settings Y Configuración Docente

- Preferencias del profesor.
- Familias profesionales que imparte.
- Subnivel por grupo.
- Parámetros de generación.
- Bancos propios de vocabulario y gramática.
- Persistencia local inicial.

### Fase 10: Biblioteca FP Avanzada

- Filtros por familia profesional, ciclo, subnivel, skill y escenario.
- Vista detallada de recurso.
- Duplicado, adaptación y regeneración.

### Fase 11: IA Real

- Route Handler seguro para generación.
- Integración con proveedor IA barato.
- Salida estructurada en JSON.
- Límites de uso y control de coste.

### Fase 12: Supabase Y Producto SaaS

- Autenticación.
- Persistencia de grupos, recursos y bancos.
- Planes y límites.
- Métricas de uso.

## Principios

- FP-first.
- Ejemplos profesionales realistas.
- IA como asistente, no como sustituto docente.
- Revisión humana obligatoria.
- Arquitectura modular y preparada para crecer.
