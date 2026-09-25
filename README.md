# Sitio web — Crubol Technology S.A.S.

Sitio corporativo de una sola página, orientado a conversión (solicitar un
diagnóstico gratuito). Español latinoamericano neutro, tratando de usted.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind 4 · Framer Motion ·
`next/font/local` · `next/image`. Sin CMS ni base de datos: el contenido vive en
`src/content.ts`. Ver `docs/adr/0001-sitio-estatico-corporativo.md`.

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:3000
```

Otros comandos:

```bash
npm run build    # build de producción
npm start        # sirve el build de producción
npm run lint     # ESLint
npx tsc --noEmit # chequeo de tipos
```

## Dónde cambiar el contenido

Todo el texto está en **`src/content.ts`**, separado de los componentes. Para
cambiar copia no hace falta tocar UI.

### Números de WhatsApp (importante)

En `src/content.ts`, objeto **`whatsapp`**. Cada canal tiene su número y su
mensaje ya redactado. El número va en **formato internacional sin `+`, espacios
ni guiones** (ejemplo: `573001234567`).

```ts
export const whatsapp = {
  comercial: { responsable: "Emerson Cruz", numero: "573000000000", ... },
  soporte:   { responsable: "Fernando Bolívar", numero: "573000000001", ... },
};
```

Todos los botones de WhatsApp abren un **modal** que deja elegir entre Comercial
y Soporte; al elegir se abre `wa.me` con el mensaje del canal.

### Otros datos pendientes (marcados con `TODO` en `content.ts`)

- `empresa.telefono` — teléfono público (Nosotros y JSON-LD).
- `empresa.direccion` — dirección para el JSON-LD (o dejar solo ciudad/país).

## Formulario de contacto

El formulario valida los campos obligatorios en el cliente y abre el correo del
visitante (`mailto:` a `contacto@crubol.com.co`) con los datos ya redactados. No
hay backend ni base de datos. Para migrar a envío por servidor (p. ej. Resend),
reemplazar el `window.location.href` de `src/components/ContactForm.tsx` por una
llamada a un Route Handler; el resto de la UI no cambia.

## Marca y activos

- Logos en `public/marca/` (`crubol-logo-oscuro.png`, `crubol-logo-claro.png`,
  `crubol-isotipo.png`). El hexágono reemplaza la O de Crubol; su hueco es
  transparente. No redibujar ni sustituir por texto.
- Fuentes autoalojadas en `public/fonts/` (Space Grotesk, IBM Plex Sans, IBM
  Plex Mono), cargadas con `next/font/local` — sin CDN.
- Paleta en `src/app/globals.css` (`@theme`) y `tailwind.config.ts`.
  **Regla crítica:** el menta `#63E6BE` solo se usa sobre fondos oscuros; en
  secciones claras el acento es teal `#0B7285`.

## Accesibilidad y rendimiento

- Respeta `prefers-reduced-motion`: sin animaciones, contenido en estado final.
- Modal con `role="dialog"`, `aria-modal` y foco atrapado (Esc / clic fuera cierran).
- HTML semántico, `lang="es-CO"`, foco visible en todo elemento interactivo.
- Reporte de Lighthouse en `docs/lighthouse/reporte-desktop.html`.

## Despliegue en Vercel

1. Subir el repositorio a GitHub.
2. En [vercel.com](https://vercel.com) → **New Project** → importar el repo.
3. Framework: **Next.js** (autodetectado). Sin variables de entorno requeridas.
4. **Deploy**. Cada push a la rama principal genera un despliegue de producción;
   cada PR genera un preview.
5. Dominio: en **Settings → Domains**, agregar `crubol.com.co` y apuntar el DNS
   según las instrucciones de Vercel.

> Si a futuro se agrega envío de formulario por servidor, definir la variable
> correspondiente (p. ej. `RESEND_API_KEY`) en **Settings → Environment
> Variables**, nunca en el código.

## Auditoría de Lighthouse (build de producción, preset desktop)

| Categoría        | Puntaje |
|------------------|---------|
| Rendimiento      | 100     |
| Accesibilidad    | 100     |
| Buenas prácticas | 100     |
| SEO              | 100     |

FCP 0.2 s · LCP 0.7 s · TBT 0 ms · CLS 0.001 · peso total ~351 KiB (< 500 KB).
