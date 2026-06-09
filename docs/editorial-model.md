# Modelo Editorial FP

Este documento define cómo debe crecer la biblioteca editorial de Teacher AI App.

## Principio Central

La app no debe comportarse como un generador genérico de inglés. Su valor está en combinar:

- Biblioteca editorial revisada.
- Situaciones profesionales reales.
- Adaptación por familia de FP.
- Nivel lingüístico ajustado al grupo.
- Línea pedagógica diferenciada para FP Básica.
- Revisión y criterio docente.

## Capas Del Modelo

### 1. Familia Profesional

Representa el contexto laboral principal del alumnado. Cada familia incluye:

- Descripción docente.
- Prioridad editorial: `core`, `secondary` o `specialized`.
- Dominios comunicativos.
- Escenarios habituales.
- Áreas de vocabulario.

Las familias `core` deben priorizarse al crear banco de recursos porque suelen tener más presencia en centros o mayor demanda transversal.

### 2. Escenario Profesional

Un escenario es una situación comunicativa reutilizable.

Ejemplos:

- Responder a una queja.
- Realizar un pedido a proveedor.
- Gestionar una cita.
- Comunicar una incidencia técnica.
- Explicar un servicio.
- Dar instrucciones de seguridad.

Un escenario puede aplicarse a varias familias. Por ejemplo, `customer-complaint` puede adaptarse a Comercio, Hostelería, Imagen Personal, Informática o Transporte.

### 3. Plantilla Editorial

Una plantilla editorial no es un recurso final. Es un patrón pedagógico para crear recursos consistentes.

Debe indicar:

- Escenario asociado.
- Familias compatibles.
- Niveles lingüísticos recomendados.
- Línea pedagógica: `foundation` o `professional`.
- Nivel de apoyo por defecto: `high`, `medium` o `low`.
- Tipos de recurso posibles.
- Objetivo comunicativo.
- Uso docente.
- Notas de adaptación.
- Estructura base.

La IA futura debe generar desde estas plantillas, no desde una instrucción vacía.

### 4. Recurso Del Banco

Un recurso del banco es un material concreto, revisable y clasificado.

Debe tener:

- Familia profesional.
- Nivel de FP.
- Línea pedagógica.
- Nivel de apoyo.
- Subnivel lingüístico.
- Escenario.
- Skill focus.
- Tiempo estimado.
- Contenido para alumnado.
- Notas docentes cuando sean útiles.
- Solucionario si procede.

Los recursos nuevos generados por agentes deben entrar primero en `content/resource-bank/pending/`.

### FP Básica Como Línea Foundation

FP Básica debe tratarse como una línea pedagógica propia dentro de la app.

No debe modelarse como una versión más fácil de Grado Medio o Superior. En muchos grupos, Inglés forma parte del Ámbito de Comunicación y Ciencias Sociales y la prioridad real es reconstruir bases, recuperar confianza y conectar el idioma con tareas laborales muy concretas.

Los recursos de FP Básica deben usar:

- `learningTrack: "foundation"`
- `supportLevel: "high"` como punto de partida habitual
- duración corta, preferiblemente 15-25 minutos
- instrucciones muy simples
- frases modelo
- repetición y cambios mínimos
- tareas de unir, completar, ordenar, elegir y decir una frase
- producción escrita de una frase o mensaje muy breve
- role plays de 2-4 turnos
- éxito rápido y visible

Ejemplos adecuados:

- Entender un horario de trabajo.
- Pedir ayuda.
- Presentarse en un entorno laboral.
- Identificar herramientas.
- Leer una señal de seguridad.
- Completar una ficha básica.
- Avisar de una ausencia con un mensaje corto.

Ejemplos a evitar en FP Básica:

- Emails largos de 100-150 palabras.
- Readings extensos con preguntas abstractas.
- Role plays sin andamiaje.
- Tareas que dependan de precisión gramatical alta.
- Recursos profesionales complejos sin recuperación de básicos.

### 5. Cobertura Editorial

La cobertura permite saber qué hay y qué falta.

La app calcula cobertura por:

- Familia profesional.
- Subnivel lingüístico.
- Línea pedagógica.
- Nivel de apoyo.
- Tipo de recurso.
- Matriz familia x nivel.

Esto ayuda a decidir qué recursos generar después, evitando que el banco crezca de forma desequilibrada.

La pantalla `/library` muestra una primera lectura de esa cobertura para que el docente o editor vea:

- Recursos aprobados disponibles.
- Familias ya cubiertas.
- Familias sin recursos.
- Próximas prioridades editoriales.

## Priorización Recomendada

### Primera Prioridad

- Administración y Gestión.
- Comercio y Marketing.
- Informática y Comunicaciones.
- Hostelería y Turismo.
- Imagen Personal.
- Sanidad.
- Electricidad y Electrónica.
- Instalación y Mantenimiento.
- Transporte y Mantenimiento de Vehículos.
- Servicios Socioculturales y a la Comunidad.

### Segunda Prioridad

- Actividades Físicas y Deportivas.
- Agraria.
- Artes Gráficas.
- Edificación y Obra Civil.
- Fabricación Mecánica.
- Imagen y Sonido.
- Industrias Alimentarias.
- Química.
- Seguridad y Medio Ambiente.
- Textil, Confección y Piel.

### Especializada

- Artes y Artesanías.
- Energía y Agua.
- Industrias Extractivas.
- Madera, Mueble y Corcho.
- Marítimo-Pesquera.
- Vidrio y Cerámica.

## Recursos Más Útiles Para 2 Horas Semanales

Para Inglés Profesional de primer curso, conviene priorizar recursos breves y reutilizables:

- Actividades de 20-25 minutos para calentar o practicar vocabulario.
- Sesiones de 45-55 minutos para una clase completa.
- Secuencias de 90-110 minutos para dos clases.
- Pruebas breves con rúbrica clara.

Los formatos más valiosos son:

- Emails profesionales.
- Role plays.
- Listenings con ficha de trabajo.
- Readings basados en documentos laborales.
- Worksheets guiadas.
- Mini-exámenes.
- Tareas finales por situación profesional.
- Rúbricas de speaking y writing.

## Uso De La Biblioteca

La biblioteca debe permitir al profesorado encontrar un recurso en menos de un minuto.

Por eso la experiencia debe priorizar:

- Búsqueda por palabras reales: queja, reserva, pedido, soporte, cita.
- Filtros por familia profesional.
- Filtros por subnivel lingüístico.
- Filtros por línea pedagógica.
- Filtros por nivel de apoyo.
- Filtros por tipo de recurso.
- Filtros por skill.
- Vista rápida del contenido y notas docentes.
- Acción para usar un recurso como base de adaptación.

La adaptación con IA llegará después, pero la interfaz ya debe tratar cada recurso como un punto de partida editable.

## Política Lingüística Del Producto

La herramienta está dirigida a profesorado de FP en España. Por tanto:

- La interfaz debe estar en español.
- Los filtros, botones, métricas y etiquetas visibles deben estar en español.
- Las notas docentes deben estar en español.
- Los textos que forman parte del input didáctico pueden estar en inglés.
- En FP Básica, las instrucciones deben ser preferiblemente en español o mixtas con alto andamiaje.
- En Grado Medio y Superior, el input y la producción pueden usar más inglés según el objetivo.

## Criterios De Calidad

Un recurso editorialmente válido debe:

- Representar una tarea laboral realista.
- Ser apropiado para el subnivel indicado.
- Incluir instrucciones claras para alumnado.
- Ayudar al docente a ahorrar tiempo.
- Evitar inglés general desconectado del ciclo.
- Ser adaptable a otro grupo sin perder el foco profesional.
- Tener un output evaluable: email, llamada, ficha, respuesta, explicación, checklist o informe breve.
