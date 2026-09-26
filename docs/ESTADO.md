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
- Formulario de contacto ahora envía por SMTP (Titan Email) a info@crubol.com vía
  `src/app/api/contacto/route.ts` (antes era mailto). Secretos SMTP_* en .env.local
  y Vercel; con campo trampa anti-spam y reply-to al visitante.
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

## Datos ya cargados
- Correo: info@crubol.com (OJO: el dominio del sitio es crubol.com.co; confirmar
  si el correo debe ser @crubol.com o @crubol.com.co).
- WhatsApp: +57 300 406 9787 y +57 321 921 3134. Al contactar se elige uno al azar.
- Teléfono JSON-LD: +57 300 406 9787.

## Asistente de chat con IA (ADR 0002)
- Bot de chat (botón flotante teal) que responde con el portafolio como base de
  conocimiento. Modelo Anthropic `claude-haiku-4-5` vía Route Handler
  `src/app/api/asistente/route.ts`. KB en `src/lib/asistente-kb.ts`.
- Secreto `ANTHROPIC_API_KEY` en `.env.local` (dev, ya cargada por Fernando) y Vercel
  (prod, pendiente); NO en el repo. `.env.example` documenta la variable.
- Dep nueva: `@anthropic-ai/sdk`. Guardas: largo de mensaje, historial, max_tokens.
- Dos botones flotantes: WhatsApp (verde) y asistente (teal). "Dejar mis datos"
  abre el widget de WhatsApp.
- Verificado con la clave real: responde bien, no da precios, reconduce fuera de
  tema y no revela el prompt. Respuestas en texto plano (sin Markdown).
- PENDIENTE producción: cargar ANTHROPIC_API_KEY en Vercel y agregar rate limiting
  a nivel de plataforma (endpoint público).

## Diagnóstico de dominio (ADR 0003)
- Ventana emergente (una vez por sesión + enlace "Diagnóstico Infraestructura" en el
  pie) donde se ingresa un dominio; abre `/diagnostico?d=<dominio>` en pestaña nueva.
- Análisis PARCIAL y seguro en `POST /api/diagnostico` (`src/lib/diagnostico.ts`):
  cabeceras de seguridad, certificado SSL/TLS y SEO on-page, con puntajes.
- NO escanea puertos ni vulnerabilidades (queda para el informe manual con
  autorización). Protección SSRF: rechaza IPs y rangos privados; timeouts.
- La página de resultados muestra progreso animado, el informe, preguntas frecuentes
  y un aviso legal (blindaje). El formulario del informe envía a `/api/informe`, que
  genera un PDF del reporte parcial (pdfkit) y lo manda por correo a info@crubol.com
  y al visitante. Verificado con dominios reales; SSRF probado (IP/localhost rechazados);
  PDF válido generado y enviado.
- Deps nuevas: pdfkit (PDF del reporte).
- PENDIENTE producción: rate limiting en Vercel para /api/diagnostico y /api/asistente.

## Widget de WhatsApp y política
- El modal de WhatsApp es ahora un formulario tipo chat (nombre, correo, número,
  área) que al enviar abre wa.me con un número elegido al azar. Botón flotante global.
- Página /politica-privacidad (Ley 1581 de 2012). Enlazada en el pie y en el widget.
  PENDIENTE: revisión legal por Fernando.

## TODO datos de Fernando (marcados en content.ts)
- Dirección pública para JSON-LD (o dejar solo ciudad/país).

## Notas para la próxima sesión

- Los `.woff2` viven en `public/fonts`; los paquetes `@fontsource/*` solo son la fuente.
- Regla de contraste crítica: el menta (#63E6BE) SOLO sobre fondos oscuros; en claro, teal.
- Para capturas: `npx next start -p 3111` + Playwright (chromium en ms-playwright cache).
- Lighthouse local: pasar CHROME_PATH del chromium de Playwright y TMPDIR escribible.
