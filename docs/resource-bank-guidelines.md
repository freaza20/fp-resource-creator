# Guía Del Banco De Recursos

Esta guía define cómo debe trabajar cualquier tarea de Codex dedicada a generar recursos para el banco editorial de la app.

## Objetivo

Generar recursos de inglés profesional para Formación Profesional en España sin tocar la UI, stores, tipos ni lógica de aplicación.

Los recursos nuevos deben guardarse como JSON en:

```text
content/resource-bank/pending/
```

Antes de generar una tanda grande de recursos, revisa también `docs/editorial-model.md`.

Después de revisión humana, los recursos válidos podrán pasar a:

```text
content/resource-bank/approved/
```

Los recursos descartados o incompletos pueden moverse a:

```text
content/resource-bank/rejected/
```

Los recursos aprobados aparecen en la pantalla `/library` de la aplicación.

## Reglas Para Tareas De Generación

- Crear solo archivos `.json` dentro de `content/resource-bank/pending/`.
- No modificar código de aplicación.
- No modificar `lib/mock-data/resources.ts` directamente.
- No usar textos de relleno.
- Cada recurso debe estar contextualizado por familia profesional, ciclo, subnivel, escenario y skill.
- Cada recurso debe declarar `learningTrack` y `supportLevel`.
- Los recursos de FP Básica deben usar `learningTrack: "foundation"` y normalmente `supportLevel: "high"`.
- Siempre que sea posible, partir de una plantilla de `lib/mock-data/editorial-templates.ts`.
- `source.reviewed` debe ser `false` en recursos pendientes.
- Los IDs deben ser estables, en kebab-case y descriptivos.

## Familias Profesionales Iniciales

- `Actividades Físicas y Deportivas`
- `Administración y Gestión`
- `Agraria`
- `Artes Gráficas`
- `Artes y Artesanías`
- `Comercio y Marketing`
- `Edificación y Obra Civil`
- `Electricidad y Electrónica`
- `Energía y Agua`
- `Fabricación Mecánica`
- `Informática y Comunicaciones`
- `Hostelería y Turismo`
- `Imagen Personal`
- `Imagen y Sonido`
- `Industrias Alimentarias`
- `Industrias Extractivas`
- `Instalación y Mantenimiento`
- `Madera, Mueble y Corcho`
- `Marítimo-Pesquera`
- `Química`
- `Sanidad`
- `Seguridad y Medio Ambiente`
- `Servicios Socioculturales y a la Comunidad`
- `Textil, Confección y Piel`
- `Transporte y Mantenimiento de Vehículos`
- `Vidrio y Cerámica`

## Niveles Permitidos

- `FP Básica`
- `Grado Medio`
- `Grado Superior`

## Líneas Pedagógicas

- `foundation`: FP Básica, recuperación de bases, tareas breves, alto andamiaje.
- `professional`: Grado Medio y Grado Superior, inglés profesional contextualizado.

## Niveles De Apoyo

- `high`: frases modelo, opciones, tareas cortas y producción muy guiada.
- `medium`: apoyo parcial, modelos y producción controlada.
- `low`: mayor autonomía y producción más abierta.

## Subniveles Permitidos

- `A2-low`
- `A2`
- `A2-high`
- `B1-low`
- `B1`
- `B1-high`

## Tipos De Recurso

- `reading`
- `worksheet`
- `listening`
- `exam`

## Skills Permitidas

- `reading`
- `writing`
- `listening`
- `speaking`
- `mediation`
- `vocabulary`
- `grammar`
- `customer-service`

## Ejemplo JSON

```json
{
  "id": "bank-admin-supplier-order-email-a2-low",
  "title": "Email to a supplier: office supplies order",
  "type": "worksheet",
  "professionalFamily": "Administración y Gestión",
  "vocationalLevel": "FP Básica",
  "learningTrack": "foundation",
  "supportLevel": "high",
  "languageLevel": "A2-low",
  "scenario": "supplier-order-email",
  "skillFocus": ["writing", "vocabulary"],
  "estimatedMinutes": 45,
  "content": {
    "studentInstructions": "Complete and write a short email to order office supplies from a supplier.",
    "teacherNotes": "Pre-teach quantity, delivery date and polite request formulas before the writing task.",
    "sections": [
      {
        "title": "Useful Language",
        "body": "We would like to order..., Could you confirm..., Please send us...",
        "tasks": [
          "Match each expression with its function.",
          "Complete the missing words in the supplier email."
        ]
      },
      {
        "title": "Writing Task",
        "body": "Write an email ordering 20 notebooks, 10 boxes of pens and 5 folders. Ask for the total price and delivery date."
      }
    ],
    "answerKey": [
      "Could you confirm = polite request.",
      "delivery date = fecha de entrega."
    ]
  },
  "tags": ["supplier", "order", "email", "office supplies"],
  "source": {
    "generatedBy": "codex",
    "reviewed": false,
    "createdAt": "2026-05-27T14:30:00.000Z"
  }
}
```

## Checklist Antes De Dar Por Terminado Un Recurso

- El recurso representa una situación profesional real.
- El nivel lingüístico corresponde al subnivel indicado.
- Si es FP Básica, el recurso es foundation, breve y con apoyo alto.
- Las instrucciones para alumnado son claras.
- Las notas docentes ayudan a usar el recurso en clase.
- Las tareas son accionables.
- El `answerKey` existe cuando el recurso lo necesita.
- No hay contenido genérico que pueda servir para cualquier familia profesional sin adaptación.

## Validación Local

Después de crear, revisar o mover recursos del banco, ejecuta:

```bash
npm run validate:resource-bank
```

El comando revisa los JSON de `pending`, `approved` y `rejected`. Si un archivo no cumple el contrato, mostrará la ruta y el campo que debe corregirse.
