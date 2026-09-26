import nodemailer from "nodemailer";
import { generarInformePDF } from "@/lib/informe-pdf";
import { normalizarDominio, type Reporte } from "@/lib/diagnostico";
import { permitido, respuesta429 } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

function esCorreo(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

// Validación mínima de la forma del reporte recibido del cliente.
function reporteValido(r: unknown): r is Reporte {
  if (typeof r !== "object" || r === null) return false;
  const x = r as Record<string, unknown>;
  return (
    typeof x.dominio === "string" &&
    typeof x.scores === "object" &&
    Array.isArray(x.grupos) &&
    typeof x.meta === "object"
  );
}

export async function POST(req: Request) {
  if (!permitido(req, "informe", 5, 600000)) return respuesta429();

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM, SMTP_TO } =
    process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    return Response.json(
      { error: "El envío no está configurado en este momento." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const nombre = String(body.nombre ?? "").trim().slice(0, 200);
  const correo = String(body.correo ?? "").trim().slice(0, 200);
  const lang: "es" | "en" = body.lang === "en" ? "en" : "es";
  const reporte = body.reporte;

  if (!nombre || !esCorreo(correo)) {
    return Response.json({ error: "Datos incompletos." }, { status: 400 });
  }
  if (!reporteValido(reporte) || !normalizarDominio(reporte.dominio)) {
    return Response.json({ error: "Reporte inválido." }, { status: 400 });
  }

  let pdf: Buffer;
  try {
    pdf = await generarInformePDF({ nombre, dominio: reporte.dominio }, reporte, lang);
  } catch (error) {
    console.error("Error generando PDF:", error);
    return Response.json({ error: "No pudimos generar el reporte." }, { status: 500 });
  }

  const port = Number(SMTP_PORT) || 465;
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });

  const adjunto = {
    filename: `diagnostico-${reporte.dominio}.pdf`,
    content: pdf,
    contentType: "application/pdf",
  };
  const resumen = `Dominio: ${reporte.dominio}\nSeguridad web: ${reporte.scores.seguridad}/100\nCorreo/DNS: ${reporte.scores.correo}/100`;

  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const tarjetas = `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:16px 0">
      <tr>
        <td style="padding:12px 20px;background:#F4FAFB;border:1px solid #DDE9EC;border-radius:10px;text-align:center">
          <div style="font-size:26px;font-weight:700;color:#0B7285">${reporte.scores.seguridad}/100</div>
          <div style="font-size:12px;color:#48626B">Seguridad web</div>
        </td>
        <td style="width:12px"></td>
        <td style="padding:12px 20px;background:#F4FAFB;border:1px solid #DDE9EC;border-radius:10px;text-align:center">
          <div style="font-size:26px;font-weight:700;color:#0B7285">${reporte.scores.correo}/100</div>
          <div style="font-size:12px;color:#48626B">Correo / DNS</div>
        </td>
      </tr>
    </table>`;

  const vt =
    lang === "en"
      ? {
          sub: "DOMAIN DIAGNOSTIC · PARTIAL REPORT",
          saludo: `Hi ${esc(nombre)},`,
          adjunto: `Attached is the partial diagnostic report for <strong>${esc(reporte.dominio)}</strong>.`,
          cierre:
            "A Crubol partner will contact you for the <strong>full report</strong>: deep scanning of ports, vulnerabilities and prioritized recommendations.",
          pie: "Full details are in the attached PDF. Crubol Technology S.A.S. · info@crubol.com · crubol.com.co",
          subject: `Your ${reporte.dominio} diagnostic — Crubol`,
          textPlano: `Hi ${nombre},\n\nAttached is the partial diagnostic report for ${reporte.dominio}.\n${resumen}\n\nA Crubol partner will contact you for the full report (deep scanning of ports, vulnerabilities and prioritized recommendations).\n\nCrubol Technology S.A.S. · info@crubol.com`,
        }
      : {
          sub: "DIAGNÓSTICO DE DOMINIO · REPORTE PARCIAL",
          saludo: `Hola ${esc(nombre)},`,
          adjunto: `Adjuntamos el reporte parcial del diagnóstico de <strong>${esc(reporte.dominio)}</strong>.`,
          cierre:
            "Un socio de Crubol lo contactará para el <strong>informe completo</strong>: escaneo profundo de puertos, vulnerabilidades y recomendaciones priorizadas.",
          pie: "El detalle completo está en el PDF adjunto. Crubol Technology S.A.S. · info@crubol.com · crubol.com.co",
          subject: `Su diagnóstico de ${reporte.dominio} — Crubol`,
          textPlano: `Hola ${nombre},\n\nAdjuntamos el reporte parcial del diagnóstico de ${reporte.dominio}.\n${resumen}\n\nUn socio de Crubol lo contactará para el informe completo (escaneo profundo de puertos, vulnerabilidades y recomendaciones priorizadas).\n\nCrubol Technology S.A.S. · info@crubol.com`,
        };

  const htmlVisitante = `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#16323A;max-width:560px;margin:0 auto">
    <div style="background:#061E24;padding:20px 24px;border-radius:12px 12px 0 0">
      <span style="color:#E6F2F4;font-size:20px;font-weight:700">Crubol Technology</span>
      <span style="color:#15AABF;font-size:12px;display:block;margin-top:4px">${vt.sub}</span>
    </div>
    <div style="border:1px solid #DDE9EC;border-top:none;border-radius:0 0 12px 12px;padding:24px">
      <p style="margin:0 0 8px">${vt.saludo}</p>
      <p style="margin:0 0 4px;color:#48626B">${vt.adjunto}</p>
      ${tarjetas}
      <p style="margin:0 0 16px;color:#48626B">${vt.cierre}</p>
      <p style="margin:0;font-size:12px;color:#9FC2C9">${vt.pie}</p>
    </div>
  </div>`;

  const htmlCrubol = `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#16323A">
    <h2 style="color:#0B7285;margin:0 0 12px">Nuevo lead de diagnóstico</h2>
    <p style="margin:0 0 4px"><strong>Nombre:</strong> ${esc(nombre)}</p>
    <p style="margin:0 0 4px"><strong>Correo:</strong> ${esc(correo)}</p>
    <p style="margin:0 0 4px"><strong>Dominio:</strong> ${esc(reporte.dominio)}</p>
    ${tarjetas}
    <p style="color:#48626B">Adjunto el reporte parcial en PDF.</p>
  </div>`;

  // Se envían las dos copias de forma independiente: la falla de una no afecta
  // a la otra. La copia al visitante puede caer en spam si el SPF/DKIM/DMARC del
  // dominio remitente no están bien configurados.
  const [crubol, visitante] = await Promise.allSettled([
    transport.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to: SMTP_TO || SMTP_USER,
      replyTo: `${nombre} <${correo}>`,
      subject: `Diagnóstico de dominio — ${reporte.dominio}`,
      text: `Nuevo lead de diagnóstico.\n\nNombre: ${nombre}\nCorreo: ${correo}\n${resumen}\n\nAdjunto el reporte parcial en PDF.`,
      html: htmlCrubol,
      attachments: [adjunto],
    }),
    transport.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to: correo,
      replyTo: SMTP_TO || SMTP_USER,
      subject: vt.subject,
      text: vt.textPlano,
      html: htmlVisitante,
      attachments: [adjunto],
    }),
  ]);

  if (crubol.status === "rejected") console.error("Aviso a Crubol falló:", crubol.reason);
  if (visitante.status === "rejected") console.error("Copia al visitante falló:", visitante.reason);

  // Éxito si al menos una copia salió (normalmente ambas).
  if (crubol.status === "fulfilled" || visitante.status === "fulfilled") {
    return Response.json({ ok: true });
  }
  return Response.json(
    { error: "No pudimos enviar el reporte. Intente de nuevo o escríbanos a info@crubol.com." },
    { status: 502 },
  );
}
