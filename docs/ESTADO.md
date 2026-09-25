# ESTADO — www (Sitio Crubol Technology)

> Memoria del proyecto. Toda sesión empieza leyendo este archivo y termina actualizándolo.

## Qué es
Sitio corporativo de una sola página de CRUBOL TECHNOLOGY S.A.S., orientado a
conversión (solicitar diagnóstico gratuito). Next.js 16 (App Router) + TypeScript +
Tailwind 4 + Framer Motion. Sin Supabase, sin Stripe, sin base de datos (ver ADR 0001).

## Fase actual
frontend — en curso.

## Fases completadas
- arquitectura: decidida vía ADR 0001 (sitio estático, mailto, UI a medida).

## Decisiones tomadas
- El brief de Crubol manda sobre la plantilla SaaS. Ver `docs/adr/0001-sitio-estatico-corporativo.md`.
- Formulario por `mailto:` (sin backend). Migrable a Resend después.
- Framer Motion es la única dependencia nueva de runtime.
- Fuentes autoalojadas en `/public/fonts` con `next/font/local`.
- Logos en `/public/marca` (oscuro, claro, isotipo). Imagen `soc.webp` descartada por peso.

## Hecho hasta ahora
- Sistema de diseño: paleta de marca en `@theme` (globals.css) + `tailwind.config.ts`,
  fuentes, `content.ts` con todo el texto y la constante WHATSAPP, layout con
  metadata/OG/Twitter y JSON-LD ProfessionalService, `lang="es-CO"`.
- Componentes UI base: Icons, HexIcon, SectionEyebrow, Button, Reveal, Counter,
  ProgressBar, Marquee.
- Selector de WhatsApp (WhatsAppModal): dialog accesible, foco atrapado, Esc/clic fuera.
- Header (fijo, se compacta al hacer scroll, menú móvil) + Hero (panel simulado con
  inclinación 3D, marquesina de tecnologías).
- `npm run build` y `tsc --noEmit` pasan. Verificado visualmente en 360/768/1280/1920.

## Pendientes / próxima acción
- PARADA: aprobación de diseño de Fernando sobre Header + Hero antes de seguir.
- Faltan secciones: Nosotros, Contadores, Servicios, Por qué, Marquesina grande,
  Proceso, Modalidades, Contacto (form), Pie.
- SEO: sitemap.ts, robots.ts, opengraph-image.
- README con despliegue en Vercel y dónde cambiar los números de WhatsApp.
- Reporte de Lighthouse.

## TODO datos de Fernando (marcados en content.ts)
- Números de WhatsApp reales (comercial Emerson, soporte Fernando).
- Teléfono público (Nosotros y JSON-LD).
- Dirección pública para JSON-LD (o dejar solo ciudad/país).

## Notas para la próxima sesión
- Los `.woff2` viven en `public/fonts`; los paquetes `@fontsource/*` solo son la fuente.
- Regla de contraste crítica: el menta (#63E6BE) SOLO sobre fondos oscuros; en claro, teal.
