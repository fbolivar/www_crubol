import { analizarDominio, normalizarDominio } from "@/lib/diagnostico";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const dominio = normalizarDominio(String((body as { dominio?: unknown })?.dominio ?? ""));
  if (!dominio) {
    return Response.json(
      { error: "Ingrese un dominio válido (por ejemplo, empresa.com)." },
      { status: 400 },
    );
  }

  try {
    const reporte = await analizarDominio(dominio);
    return Response.json({ reporte });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "";
    // Errores esperables de red o de política (SSRF / no resuelve).
    if (
      /no permitid|IP|resolver|redirecc|Protocolo/i.test(msg) ||
      msg.includes("ENOTFOUND") ||
      msg.includes("abort")
    ) {
      return Response.json(
        {
          error:
            "No pudimos analizar ese dominio. Verifique que esté bien escrito y accesible por internet.",
        },
        { status: 422 },
      );
    }
    console.error("Error en diagnóstico:", error);
    return Response.json(
      { error: "No pudimos completar el análisis. Intente de nuevo en un momento." },
      { status: 500 },
    );
  }
}
