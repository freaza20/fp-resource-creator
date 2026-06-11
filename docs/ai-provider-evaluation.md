# Evaluación De Proveedores IA

## Objetivo

Esta guía define la Fase 12.6 del proyecto: comparar modelos IA antes de
conectar APIs reales a la aplicación.

La evaluación no ejecuta llamadas externas todavía. Su función es preparar una
decisión técnica y pedagógica con criterios explícitos:

- coste por recurso;
- calidad esperada para Inglés Profesional FP;
- adecuación a FP Básica, Grado Medio y Grado Superior;
- salida estructurada;
- facilidad de integración;
- riesgos de proveedor.

## Modelos Candidatos

Los candidatos iniciales viven en `lib/mock-data/ai-model-candidates.ts`.

La primera matriz incluye:

- Mistral Small 4.
- Gemini 2.5 Flash-Lite.
- DeepSeek V4 Flash.
- GPT-5.4 nano.
- Claude Haiku 4.5.
- Llama 4 Scout vía Groq.
- Llama 3.1 8B Instant vía Groq.

La app no debe asumir que el primer candidato será el proveedor final. El orden
actual es una recomendación provisional basada en coste, riesgos e integración
esperada.

## Casos De Prueba

Los casos viven en `lib/mock-data/ai-evaluation-cases.ts`.

Cubren:

- FP Básica: pedir ayuda en el trabajo, A2-low.
- Grado Medio Comercio: responder a una queja, B1-low.
- Grado Medio Informática: llamada de soporte técnico, A2-high.
- Grado Medio Imagen Personal: confirmar una cita, A2.
- Grado Superior Turismo: reserva y petición especial, B1.

Estos casos deben revisarse desde criterio docente antes de ejecutar pruebas
reales con APIs.

## Rúbrica

La rúbrica pondera:

- utilidad docente real;
- control del nivel lingüístico;
- contexto profesional FP;
- tratamiento de FP Básica;
- salida estructurada;
- coste y escalabilidad.

En la fase real, cada output debería revisarse con puntuación de 1 a 5 por
criterio y observaciones docentes.

## Ruta Interna

La pantalla de trabajo está en:

```text
/ai-evaluation
```

No es una pantalla final para usuarios. Es una herramienta interna para decidir
qué proveedores conectar primero.

## Siguiente Paso Tras La Revisión

Después de revisar la pantalla, se debe elegir una batería corta de modelos para
prueba real:

- un candidato principal;
- un candidato ultra-económico;
- un fallback estable.

La recomendación inicial es probar Mistral Small 4, Gemini 2.5 Flash-Lite y
GPT-5.4 nano. DeepSeek y Groq pueden añadirse si se desea comparar coste mínimo
o velocidad.

## Restricciones

- No guardar claves API en Git.
- No exponer claves en componentes cliente.
- No llamar proveedores reales desde la UI.
- Toda llamada real debe pasar por Route Handlers de servidor.
- Registrar coste estimado antes de abrir el uso a usuarios reales.
