import nodemailer from "nodemailer";
import { generarInformePDF } from "@/lib/informe-pdf";
import { normalizarDominio, type Reporte } from "@/lib/diagnostico";

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
  const reporte = body.reporte;

  if (!nombre || !esCorreo(correo)) {
    return Response.json({ error: "Datos incompletos." }, { status: 400 });
  }
  if (!reporteValido(reporte) || !normalizarDominio(reporte.dominio)) {
    return Response.json({ error: "Reporte inválido." }, { status: 400 });
  }

  let pdf: Buffer;
  try {
    pdf = await generarInformePDF({ nombre, dominio: reporte.dominio }, reporte);
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
  const resumen = `Dominio: ${reporte.dominio}\nSeguridad: ${reporte.scores.seguridad}/100\nWeb/SEO: ${reporte.scores.web}/100`;

  try {
    // Aviso a Crubol con el lead + PDF.
    await transport.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to: SMTP_TO || SMTP_USER,
      replyTo: `${nombre} <${correo}>`,
      subject: `Diagnóstico de dominio — ${reporte.dominio}`,
      text: `Nuevo lead de diagnóstico.\n\nNombre: ${nombre}\nCorreo: ${correo}\n${resumen}\n\nAdjunto el reporte parcial en PDF.`,
      attachments: [adjunto],
    });

    // Copia al visitante con su reporte parcial.
    await transport.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to: correo,
      subject: `Su diagnóstico de ${reporte.dominio} — Crubol`,
      text: `Hola ${nombre},\n\nAdjuntamos el reporte parcial del diagnóstico de ${reporte.dominio}.\n${resumen}\n\nUn socio de Crubol lo contactará para el informe completo (escaneo profundo de puertos, vulnerabilidades y recomendaciones priorizadas).\n\nCrubol Technology S.A.S. · info@crubol.com`,
      attachments: [adjunto],
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Error enviando informe:", error);
    return Response.json(
      { error: "No pudimos enviar el reporte. Intente de nuevo o escríbanos a info@crubol.com." },
      { status: 502 },
    );
  }
}
