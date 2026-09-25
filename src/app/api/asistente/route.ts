import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/lib/asistente-kb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Límites para controlar costo y abuso (endpoint público).
const MAX_MENSAJES = 12; // últimos turnos que se envían al modelo
const MAX_LARGO_MSG = 1000; // caracteres por mensaje
const MODELO = "claude-haiku-4-5";

type Turno = { role: "user" | "assistant"; content: string };

function esTurnoValido(x: unknown): x is Turno {
  if (typeof x !== "object" || x === null) return false;
  const t = x as Record<string, unknown>;
  return (
    (t.role === "user" || t.role === "assistant") &&
    typeof t.content === "string" &&
    t.content.trim().length > 0
  );
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "El asistente no está configurado en este momento." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const crudos = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(crudos)) {
    return Response.json({ error: "Falta el historial." }, { status: 400 });
  }

  // Sanea: solo user/assistant, recorta largo y toma los últimos turnos.
  const messages = crudos
    .filter(esTurnoValido)
    .map((t) => ({ role: t.role, content: t.content.slice(0, MAX_LARGO_MSG) }))
    .slice(-MAX_MENSAJES);

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "No hay pregunta que responder." }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  try {
    const respuesta = await client.messages.create({
      model: MODELO,
      max_tokens: 600,
      // El system prompt (portafolio) se cachea: repetido en cada turno.
      system: [
        { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
      ],
      messages,
    });

    const texto = respuesta.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    return Response.json({
      reply:
        texto ||
        "Con gusto le ayudo. ¿Sobre qué frente quiere saber: infraestructura, ciberseguridad, inteligencia artificial o cumplimiento?",
    });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return Response.json(
        { error: "Estamos recibiendo muchas consultas. Intente de nuevo en un momento." },
        { status: 429 },
      );
    }
    console.error("Error del asistente:", error);
    return Response.json(
      { error: "No pude procesar su mensaje. Intente de nuevo o déjenos sus datos." },
      { status: 500 },
    );
  }
}
