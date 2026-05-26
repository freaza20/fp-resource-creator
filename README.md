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

## Familias Profesionales Iniciales

- Administración y Gestión.
- Comercio y Marketing.
- Informática y Comunicaciones.
- Hostelería y Turismo.
- Imagen Personal.

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
  layout/
  ui/
hooks/
lib/
  ai/
    prompts/
  mock-data/
store/
types/
```

## Roadmap Próximo

### Fase 6: Settings Y Configuración Docente

- Preferencias del profesor.
- Familias profesionales que imparte.
- Subnivel por grupo.
- Parámetros de generación.
- Bancos propios de vocabulario y gramática.
- Persistencia local inicial.

### Fase 7: Biblioteca FP

- Filtros por familia profesional, ciclo, subnivel, skill y escenario.
- Vista detallada de recurso.
- Duplicado, adaptación y regeneración.

### Fase 8: IA Real

- Route Handler seguro para generación.
- Integración con proveedor IA barato.
- Salida estructurada en JSON.
- Límites de uso y control de coste.

### Fase 9: Supabase Y Producto SaaS

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
