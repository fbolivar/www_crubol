# ADR 0002 — Asistente de chat con IA (Anthropic)

Fecha: 2026-09-25 · Estado: aceptado (aprobado por Fernando)

## Contexto
Se pidió un asistente de chat que responda preguntas de los clientes basándose en
el "Portafolio de Servicios 2026". El ADR 0001 dejó el sitio como estático sin
backend; este asistente introduce, de forma acotada, una función de servidor.

## Decisión
- **Modelo:** Anthropic `claude-haiku-4-5` (elegido por Fernando por costo: ≈5×
  más barato que Opus, rápido y suficiente para un FAQ acotado). El system prompt
  (portafolio) se cachea para reducir costo en cada turno. Nota: Haiku no admite
  `output_config.effort`, por eso no se usa.
- **Backend mínimo:** un Route Handler `src/app/api/asistente/route.ts` (runtime
  Node) recibe la conversación y llama a la API de Anthropic. La página sigue siendo
  estática; solo esta ruta es dinámica.
- **Secreto:** `ANTHROPIC_API_KEY` vive en `.env.local` (dev) y en Variables de
  Entorno de Vercel (prod). Nunca en el código ni en el repositorio.
- **Dependencia nueva:** `@anthropic-ai/sdk` (justificada: cliente oficial para el bot).
- **Grounding y guardas:** el bot responde solo con el portafolio (`lib/asistente-kb.ts`),
  en el tono de marca (usted, sin alarmismo, sin inventar precios ni clientes). Si no
  sabe algo, reconduce a "Dejar mis datos" (WhatsApp) o a info@crubol.com.
- **Control de costo/abuso:** endpoint público con límites de largo de mensaje
  (1000 car.), historial (últimos 12 turnos), `max_tokens` 600 y `effort: low`.

## Consecuencias
- Hay un costo por mensaje (según uso). Se puede bajar cambiando el modelo a
  `claude-haiku-4-5` (≈5× más barato) en `route.ts` si el volumen lo amerita.
- **Pendiente antes de producción:** cargar `ANTHROPIC_API_KEY` en Vercel y añadir
  rate limiting a nivel de plataforma (Vercel Firewall / WAF o similar), ya que el
  endpoint es público y sin autenticación.
- Hay dos botones flotantes: WhatsApp (verde) y asistente (teal), lado a lado. El
  contacto por WhatsApp también se alcanza desde "Dejar mis datos" en el chat.
