# Despliegue en Vercel — Sitio Crubol

Repositorio: https://github.com/fbolivar/www_crubol · Rama de producción: `main`.
Stack: Next.js 16 (App Router). Sin base de datos ni pagos (ADR 0001).

## Variables de entorno (obligatorias)
Se configuran en Vercel → Project → Settings → Environment Variables, para
**Production** y **Preview**. Nunca se suben al repositorio.

| Variable | Valor | Para qué |
|---|---|---|
| `ANTHROPIC_API_KEY` | `sk-ant-...` (console.anthropic.com) | Asistente de chat |
| `SMTP_HOST` | `smtp.titan.email` | Envío de correo |
| `SMTP_PORT` | `465` | Envío de correo |
| `SMTP_USER` | `info@crubol.com` | Envío de correo |
| `SMTP_PASSWORD` | contraseña del buzón | Envío de correo |
| `SMTP_FROM` | `Crubol Web <info@crubol.com>` | Remitente |
| `SMTP_TO` | `info@crubol.com` | Destino de leads |

Sin estas variables el sitio carga, pero el asistente, el formulario y el envío
de informes muestran "no configurado".

## Primer deploy (paso a paso)
1. **Local en verde:** `npm run lint && npm run build` sin errores. Auditoría de
   seguridad aprobada (`docs/seguridad/AUD-20260925.md`: APTO CON CONDICIONES).
2. **Importar repo:** vercel.com → Add New… → Project → importar `fbolivar/www_crubol`.
   Framework: Next.js (autodetectado). No cambiar el build command.
3. **Variables de entorno:** antes de "Deploy", agregar las 7 variables de la tabla
   en **Production** y **Preview** (mismos valores para ambos, salvo que se separen
   credenciales de prueba en Preview).
4. **Deploy.** Cada push a `main` genera producción; cada PR, un Preview.
5. **Probar en la URL de producción** (ver "Camino dorado").
6. **Dominio:** Settings → Domains → agregar `crubol.com.co`; configurar el DNS en
   el registrador (los registros exactos los indica Vercel: normalmente A `76.76.21.21`
   o CNAME a `cname.vercel-dns.com`). HTTPS se emite solo al validar el DNS.

## Camino dorado (probar en la URL real)
- [ ] La home carga y es responsive (móvil y escritorio).
- [ ] Asistente: abre, responde una pregunta y "Dejar mis datos" abre WhatsApp.
- [ ] WhatsApp: el widget abre `wa.me` con uno de los dos números.
- [ ] Formulario de contacto: envía y llega a `info@crubol.com`.
- [ ] Diagnóstico: ingresar un dominio → abre `/diagnostico`, muestra el informe y,
      al pedir el informe completo, llega el PDF por correo.

## Post-deploy
- **Headers:** verificar en https://securityheaders.com con la URL de producción
  (deben salir CSP, HSTS, X-Frame-Options, etc.).
- **Rate limiting (condición C-03):** activar Vercel Firewall/WAF para `/api/*`
  (el limitador en memoria es por instancia). Vercel → Firewall → reglas por ruta.
- **Observabilidad:** activar Vercel Analytics o revisar Logs para errores 500.

## Rollback
Vercel → Deployments → elegir el último deployment estable → **Promote to
Production** (instantáneo). No requiere volver a construir.

## Contactos / notas
- Correo operativo: info@crubol.com · Dominio: crubol.com.co
- Repo público: confirmado como intencional (sin secretos en el código).
