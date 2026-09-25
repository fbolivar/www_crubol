# ESTADO — www (Sitio Crubol Technology)

> Memoria del proyecto. Toda sesión empieza leyendo este archivo y termina actualizándolo.

## Qué es

Sitio corporativo de una sola página de CRUBOL TECHNOLOGY S.A.S., orientado a
conversión (solicitar diagnóstico gratuito). Next.js 16 (App Router) + TypeScript +
Tailwind 4 + Framer Motion. Sin Supabase, sin Stripe, sin base de datos (ver ADR 0001).

## Fase actual

frontend — COMPLETA. Diseño aprobado por Fernando. Sitio funcional de punta a punta.

## Fases completadas

- arquitectura: ADR 0001 (sitio estático, mailto, UI a medida).
- frontend: 11 secciones, animaciones, SEO, accesibilidad, Lighthouse.

## Decisiones tomadas

- El brief de Crubol manda sobre la plantilla SaaS. Ver `docs/adr/0001-...`.
- Formulario por `mailto:` (sin backend). Migrable a Resend después.
- Framer Motion es la única dependencia nueva de runtime.
- Fuentes autoalojadas en `/public/fonts` con `next/font/local`.
- Logos en `/public/marca`. Imagen `soc.webp` descartada por peso (1.2 MB).

## Hecho

- Sistema de diseño (paleta en @theme + tailwind.config, fuentes, content.ts).
- Layout con metadata/OG/Twitter, JSON-LD ProfessionalService, `lang="es-CO"`.
- 11 secciones: header, hero (panel 3D + marquesina), nosotros, contadores,
  servicios, por qué, marquesina grande, proceso, modalidades (pestañas),
  contacto (form validado + mailto), pie.
- Selector de WhatsApp (modal accesible, foco atrapado, Esc/clic fuera).
- SEO: sitemap.ts, robots.ts, opengraph-image.tsx.
- README con despliegue en Vercel y dónde cambiar los números de WhatsApp.
- Verificado en 360/768/1280/1920. `build`, `tsc` y `eslint` limpios.
- Lighthouse desktop 100/100/100/100. Peso ~351 KiB (< 500 KB).
  Reporte en `docs/lighthouse/reporte-desktop.html`.
- Rama `feat/sitio-crubol`, 5 commits. Sin push todavía.

## Rediseño estilo TechGuru (sobre el diseño aprobado)

- A pedido de Fernando, se adoptó el lenguaje visual del template TechGuru
  conservando paleta y contenido honesto: divisores angulados/curvos entre
  secciones, hexágonos y puntos flotantes (`ui/Decor`, `ui/ShapeDivider`),
  botón con degradado, conectores en el proceso.
- Fotos con licencia CC0 (dominio público) con tratamiento duotono teal
  (`ui/DuotoneImage`, clase `.duotono`): data center, código, soporte,
  consultoría. Usadas en nosotros (fotos superpuestas), proceso, marquesina
  grande y contacto. Créditos en `docs/creditos-imagenes.md`.
- NO se usaron `inicial.jpg`/`raro.jpg`/`soc.webp` (texto en inglés y azul).
- Lighthouse se mantiene 100/100/100/100; peso 468 KiB.

## Pendientes / próxima acción

- Fernando: revisar y aprobar el sitio completo.
- Reemplazar los `TODO` de `content.ts` con datos reales (ver abajo).
- Push de la rama y PR a `main` cuando Fernando dé el visto bueno.
- Deploy en Vercel + dominio `crubol.com.co`.
- Opcional: auditoría de seguridad de pre-lanzamiento (headers, deps).

## TODO datos de Fernando (marcados en content.ts)

- Números de WhatsApp reales (comercial Emerson, soporte Fernando).
- Teléfono público (Nosotros y JSON-LD).
- Dirección pública para JSON-LD (o dejar solo ciudad/país).

## Notas para la próxima sesión

- Los `.woff2` viven en `public/fonts`; los paquetes `@fontsource/*` solo son la fuente.
- Regla de contraste crítica: el menta (#63E6BE) SOLO sobre fondos oscuros; en claro, teal.
- Para capturas: `npx next start -p 3111` + Playwright (chromium en ms-playwright cache).
- Lighthouse local: pasar CHROME_PATH del chromium de Playwright y TMPDIR escribible.
