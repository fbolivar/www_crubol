import nodemailer from "nodemailer";
import { permitido, respuesta429 } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX = 2000; // tope de caracteres por campo

function limpiar(v: unknown): string {
  return typeof v === "string" ? v.trim().slice(0, MAX) : "";
}

function esCorreo(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  if (!permitido(req, "contacto", 5, 600000)) return respuesta429();

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM, SMTP_TO } =
    process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    return Response.json(
      { error: "El envío de correo no está configurado en este momento." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  // Anti-spam: campo trampa oculto. Si viene lleno, es un bot -> fingimos éxito.
  if (limpiar(body.website)) {
    return Response.json({ ok: true });
  }

  const datos = {
    nombre: limpiar(body.nombre),
    empresa: limpiar(body.empresa),
    correo: limpiar(body.correo),
    telefono: limpiar(body.telefono),
    necesidad: limpiar(body.necesidad),
    mensaje: limpiar(body.mensaje),
  };

  if (!datos.nombre || !datos.empresa || !datos.necesidad) {
    return Response.json({ error: "Faltan campos obligatorios." }, { status: 400 });
  }
  if (!esCorreo(datos.correo)) {
    return Response.json({ error: "El correo no es válido." }, { status: 400 });
  }

  const destino = SMTP_TO || SMTP_USER;
  const port = Number(SMTP_PORT) || 465;

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // 465 = SSL/TLS implícito (Titan)
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });

  const filas = [
    ["Nombre", datos.nombre],
    ["Empresa", datos.empresa],
    ["Correo", datos.correo],
    ["Teléfono", datos.telefono || "—"],
    ["Situación", datos.necesidad],
  ];
  const textoPlano =
    filas.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nMensaje:\n${datos.mensaje || "(sin mensaje)"}\n\n— Enviado desde el formulario de crubol.com.co`;

  const html = `
    <div style="font-family:Arial,sans-serif;color:#16323A">
      <h2 style="color:#0B7285;margin:0 0 12px">Nuevo contacto desde el sitio</h2>
      <table style="border-collapse:collapse">
        ${filas
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 12px 4px 0;color:#48626B">${k}</td><td style="padding:4px 0"><strong>${escapar(v)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:16px 0 4px;color:#48626B">Mensaje:</p>
      <p style="margin:0;white-space:pre-wrap">${escapar(datos.mensaje) || "(sin mensaje)"}</p>
      <hr style="border:none;border-top:1px solid #DDE9EC;margin:20px 0"/>
      <p style="color:#9FC2C9;font-size:12px">Enviado desde el formulario de crubol.com.co</p>
    </div>`;

  try {
    await transport.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to: destino,
      replyTo: `${datos.nombre} <${datos.correo}>`,
      subject: `Contacto web — ${datos.empresa}`,
      text: textoPlano,
      html,
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Error enviando correo de contacto:", error);
    return Response.json(
      { error: "No pudimos enviar su mensaje. Intente de nuevo o escríbanos a info@crubol.com." },
      { status: 502 },
    );
  }
}

/** Escapa HTML para evitar inyección en el cuerpo del correo. */
function escapar(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
