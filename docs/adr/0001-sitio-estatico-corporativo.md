# ADR 0001 — Sitio corporativo estático, sin Supabase ni Stripe

Fecha: 2026-09-25 · Estado: aceptado

## Contexto
La plantilla BC SaaS Fabric asume una app SaaS con Supabase (Postgres + RLS),
Stripe y shadcn/ui. El encargo real de `www` es distinto: el sitio corporativo
de una sola página de Crubol Technology S.A.S., orientado a conversión, sin panel
de usuario, sin autenticación, sin cobros y sin base de datos.

## Decisión
Para este proyecto el brief de Crubol manda sobre la plantilla:

- **Sin Supabase, sin Stripe, sin RLS.** No hay datos de usuario que persistir.
- **UI a medida** con Tailwind, sin shadcn/ui ni otras librerías de componentes.
- **Contenido en `content.ts`** tipado, no en CMS ni base de datos.
- **Formulario de contacto por `mailto:`** a contacto@crubol.com.co, con validación
  previa en el cliente. Cero backend, cero costo, cero terceros. Se puede migrar a
  un Route Handler con Resend más adelante sin tocar los componentes.
- **Framer Motion** como única dependencia nueva de runtime (animaciones de scroll,
  contadores, inclinación 3D y respeto a `prefers-reduced-motion`). Las marquesinas,
  el LED y el degradado del H1 van en CSS puro.
- **Fuentes** Space Grotesk, IBM Plex Sans e IBM Plex Mono autoalojadas desde
  `/public/fonts` con `next/font/local` (sin CDN). Copiadas de los paquetes
  `@fontsource/*`, que quedan solo como fuente de los `.woff2` en dev.

## Consecuencias
- Las reglas de RLS y migraciones de la plantilla no aplican aquí; `supabase/` y
  las variables Supabase/Stripe del `.env.example` quedan sin uso en este repo.
- Si a futuro se agrega captura de leads en base de datos o pagos, se revisa esta
  decisión y se reintroduce Supabase con RLS por `organization_id`.
