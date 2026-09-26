/**
 * Rate limiting simple en memoria (ventana fija) por IP.
 *
 * Nota: en serverless el estado es por instancia; esto frena abusos triviales
 * y ráfagas, pero NO sustituye un control a nivel de plataforma (Vercel WAF /
 * Firewall o Upstash). Úsese como defensa en profundidad.
 */
type Registro = { conteo: number; reinicio: number };
const mapa = new Map<string, Registro>();

export function ipDeRequest(req: Request): string {
  const xff = req.headers.get("x-forwarded-for") || "";
  return (
    xff.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "desconocida"
  );
}

/**
 * Devuelve true si la solicitud está permitida; false si excede el límite.
 * `max` solicitudes por `ventanaMs` por (clave + IP).
 */
export function permitido(
  req: Request,
  clave: string,
  max: number,
  ventanaMs: number,
): boolean {
  const ahora = Date.now();

  // Poda perezosa para evitar crecimiento indefinido del mapa.
  if (mapa.size > 5000) {
    for (const [k, r] of mapa) if (ahora > r.reinicio) mapa.delete(k);
  }

  const k = `${clave}:${ipDeRequest(req)}`;
  const r = mapa.get(k);
  if (!r || ahora > r.reinicio) {
    mapa.set(k, { conteo: 1, reinicio: ahora + ventanaMs });
    return true;
  }
  if (r.conteo >= max) return false;
  r.conteo++;
  return true;
}

/** Respuesta 429 estándar. */
export function respuesta429(): Response {
  return Response.json(
    { error: "Demasiadas solicitudes. Intente de nuevo en un momento." },
    { status: 429 },
  );
}
