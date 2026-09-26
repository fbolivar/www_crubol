# ADR 0003 — Diagnóstico de dominio (análisis parcial automático)

Fecha: 2026-09-25 · Estado: aceptado (aprobado por Fernando)

## Contexto
Se pidió una herramienta que, al ingresar un dominio, lo analice y muestre un
informe (progreso + resultado en pestaña nueva) y capture al prospecto con un
formulario para el "informe completo".

## Decisión
- **Alcance del análisis automático (pasivo y seguro):** cabeceras de seguridad
  (HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
  Permissions-Policy, exposición del `Server`), certificado SSL/TLS (validez,
  días restantes, emisor, versión de protocolo) y SEO on-page (título, meta,
  H1/H2, alt, formato de imagen). Todo equivale a lo que ve un navegador.
- **NO se hace escaneo activo de puertos ni de vulnerabilidades** desde el endpoint
  público: escanear dominios de terceros sin autorización es un riesgo legal y de
  abuso, y las plataformas serverless lo limitan. Eso queda para el "informe
  completo" que los socios ejecutan manualmente y con autorización del cliente —
  que es la captura de lead solicitada.
- **Protección SSRF (crítica):** `src/lib/diagnostico.ts` rechaza IPs literales y
  cualquier dominio que resuelva a rangos privados/reservados/loopback/link-local
  (incluida la IP de metadatos 169.254.169.254), y sigue redirecciones revalidando
  cada salto. Timeouts en fetch (9s) y TLS (8s).
- **Arquitectura:** Route Handler `POST /api/diagnostico` (Node) hace el análisis;
  la página `/diagnostico?d=<dominio>` (noindex) muestra el progreso y el informe y,
  al final, un formulario que envía el lead + puntajes a info@crubol.com (vía
  `/api/contacto`). El popup abre esa página en pestaña nueva.

## Consecuencias
- El endpoint es público. **Pendiente producción:** rate limiting a nivel de Vercel
  para evitar abuso (uso del analizador como proxy/escáner masivo).
- El informe es intencionalmente parcial; el valor profundo (puertos, vulnerabilidades,
  exposición) se entrega en el servicio manual, personalizado con los datos capturados.
- Sin dependencias nuevas: usa `node:dns/tls/net` y `fetch` nativos.
