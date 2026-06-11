# Configuración Del Proveedor Mistral

## Estado Actual

La integración de Mistral está preparada, pero no activa por defecto.

Por seguridad y control de coste, la app sigue usando:

```text
AI_PROVIDER=mock
```

El provider real vive en:

```text
lib/ai/providers/mistral-provider.ts
```

La generación sigue entrando por:

```text
app/api/ai/generate/route.ts
```

## Variables De Entorno

Usa `.env.local.example` como referencia y crea un archivo local privado:

```text
.env.local
```

Contenido esperado:

```text
AI_PROVIDER=mistral
MISTRAL_API_KEY=tu_clave_real
MISTRAL_MODEL=mistral-small-latest
MISTRAL_MAX_TOKENS=1800
MISTRAL_TEMPERATURE=0.2
```

No subas `.env.local` a Git.

## Modelo Inicial

El modelo inicial será:

```text
mistral-small-latest
```

Motivos:

- coste bajo;
- buen equilibrio para recursos educativos;
- proveedor europeo;
- suficiente para generación A2-low a B1 si el prompt está bien estructurado.

## Límites Iniciales

Para las primeras pruebas reales:

- mantener `MISTRAL_MAX_TOKENS=1800`;
- probar solo 5 a 10 generaciones;
- revisar manualmente todos los recursos;
- mantener límites freemium en servidor;
- no abrir el provider real a usuarios hasta tener Supabase y métricas reales.

## Pasos Para Activar

1. Crear cuenta en Mistral Studio.
2. Crear o seleccionar un workspace.
3. Añadir saldo o método de pago si Mistral lo exige para API.
4. Crear una API key.
5. Guardarla solo en `.env.local`.
6. Reiniciar `npm run dev`.
7. Probar una generación desde la app.

## Criterios De Validación

La primera prueba debe confirmar:

- que la API responde;
- que el JSON se parsea correctamente;
- que el recurso guardado mantiene el contrato `TeachingResource`;
- que los metadatos incluyen tokens y coste estimado;
- que el contenido necesita revisión docente, no publicación automática.
