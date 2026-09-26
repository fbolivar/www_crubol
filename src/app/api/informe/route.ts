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
  const resumen = `Dominio: ${reporte.dominio}\nSeguridad web: ${reporte.scores.seguridad}/100\nCorreo/DNS: ${reporte.scores.correo}/100`;

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
      attachments: [adjunto],
    }),
    transport.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to: correo,
      subject: `Su diagnóstico de ${reporte.dominio} — Crubol`,
      text: `Hola ${nombre},\n\nAdjuntamos el reporte parcial del diagnóstico de ${reporte.dominio}.\n${resumen}\n\nUn socio de Crubol lo contactará para el informe completo (escaneo profundo de puertos, vulnerabilidades y recomendaciones priorizadas).\n\nCrubol Technology S.A.S. · info@crubol.com`,
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
