# Modelo Editorial FP

Este documento define cómo debe crecer la biblioteca editorial de Teacher AI App.

## Principio Central

La app no debe comportarse como un generador genérico de inglés. Su valor está en combinar:

- Biblioteca editorial revisada.
- Situaciones profesionales reales.
- Adaptación por familia de FP.
- Nivel lingüístico ajustado al grupo.
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
- Subnivel lingüístico.
- Escenario.
- Skill focus.
- Tiempo estimado.
- Contenido para alumnado.
- Notas docentes cuando sean útiles.
- Solucionario si procede.

Los recursos nuevos generados por agentes deben entrar primero en `content/resource-bank/pending/`.

### 5. Cobertura Editorial

La cobertura permite saber qué hay y qué falta.

La app calcula cobertura por:

- Familia profesional.
- Subnivel lingüístico.
- Tipo de recurso.
- Matriz familia x nivel.

Esto ayuda a decidir qué recursos generar después, evitando que el banco crezca de forma desequilibrada.

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

## Criterios De Calidad

Un recurso editorialmente válido debe:

- Representar una tarea laboral realista.
- Ser apropiado para el subnivel indicado.
- Incluir instrucciones claras para alumnado.
- Ayudar al docente a ahorrar tiempo.
- Evitar inglés general desconectado del ciclo.
- Ser adaptable a otro grupo sin perder el foco profesional.
- Tener un output evaluable: email, llamada, ficha, respuesta, explicación, checklist o informe breve.
