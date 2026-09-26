import dns from "node:dns/promises";
import net from "node:net";
import tls from "node:tls";

// --------------------------------------------------------------------------
// Tipos del reporte
// --------------------------------------------------------------------------
export type Estado = "ok" | "warn" | "fail";
export type Check = {
  titulo: string;
  estado: Estado;
  valor: string;
  consejo: string;
};
export type Grupo = { titulo: string; checks: Check[] };
export type Reporte = {
  dominio: string;
  urlFinal: string;
  scores: { seguridad: number; web: number };
  resumen: string;
  meta: { servidor: string; htmlKB: number; palabras: number; tls: string };
  grupos: Grupo[];
};

// --------------------------------------------------------------------------
// Normalización y protección contra SSRF
// --------------------------------------------------------------------------
export function normalizarDominio(entrada: string): string | null {
  let v = (entrada || "").trim().toLowerCase();
  v = v.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0].split("?")[0];
  v = v.split(":")[0]; // sin puerto
  if (/^([a-z0-9](-?[a-z0-9])*\.)+[a-z]{2,}$/.test(v) && v.length <= 253) return v;
  return null;
}

function ipPrivada(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const p = ip.split(".").map(Number);
    if (p[0] === 10 || p[0] === 127 || p[0] === 0) return true;
    if (p[0] === 169 && p[1] === 254) return true; // link-local / metadata
    if (p[0] === 172 && p[1] >= 16 && p[1] <= 31) return true;
    if (p[0] === 192 && p[1] === 168) return true;
    if (p[0] === 100 && p[1] >= 64 && p[1] <= 127) return true; // CGNAT
    if (p[0] >= 224) return true; // multicast / reservado
    return false;
  }
  const low = ip.toLowerCase();
  if (low === "::1" || low === "::") return true;
  if (low.startsWith("fe80")) return true; // link-local
  if (low.startsWith("fc") || low.startsWith("fd")) return true; // ULA
  if (low.startsWith("::ffff:")) return ipPrivada(low.split(":").pop() || "");
  return false;
}

/** Resuelve el host y rechaza IPs literales o rangos privados/reservados. */
async function guardarHost(host: string): Promise<void> {
  if (net.isIP(host)) throw new Error("No se permiten direcciones IP, solo dominios.");
  const addrs = await dns.lookup(host, { all: true });
  if (addrs.length === 0) throw new Error("No se pudo resolver el dominio.");
  for (const a of addrs) {
    if (ipPrivada(a.address)) throw new Error("Dominio no permitido.");
  }
}

// --------------------------------------------------------------------------
// Fetch seguro con seguimiento manual de redirecciones (revalida cada salto)
// --------------------------------------------------------------------------
async function fetchSeguro(
  urlInicial: string,
  maxHops = 4,
): Promise<{ res: Response; urlFinal: string }> {
  let url = urlInicial;
  for (let i = 0; i < maxHops; i++) {
    const u = new URL(url);
    if (u.protocol !== "https:" && u.protocol !== "http:")
      throw new Error("Protocolo no permitido.");
    await guardarHost(u.hostname);

    const controlador = new AbortController();
    const t = setTimeout(() => controlador.abort(), 9000);
    let res: Response;
    try {
      res = await fetch(u.toString(), {
        redirect: "manual",
        signal: controlador.signal,
        headers: { "User-Agent": "CrubolDiagnostico/1.0 (+https://crubol.com.co)" },
      });
    } finally {
      clearTimeout(t);
    }

    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      url = new URL(res.headers.get("location")!, u).toString();
      continue;
    }
    return { res, urlFinal: u.toString() };
  }
  throw new Error("Demasiadas redirecciones.");
}

// --------------------------------------------------------------------------
// Certificado TLS
// --------------------------------------------------------------------------
function analizarTLS(
  host: string,
): Promise<{ ok: boolean; diasRestantes: number | null; emisor: string; protocolo: string }> {
  return new Promise((resolve) => {
    const socket = tls.connect(
      { host, port: 443, servername: host, timeout: 8000 },
      () => {
        const cert = socket.getPeerCertificate();
        const protocolo = socket.getProtocol() || "";
        let diasRestantes: number | null = null;
        let emisor = "";
        if (cert && cert.valid_to) {
          diasRestantes = Math.floor(
            (new Date(cert.valid_to).getTime() - Date.now()) / 86400000,
          );
          const raw = (cert.issuer?.O ?? cert.issuer?.CN ?? "") as string | string[];
          emisor = Array.isArray(raw) ? raw.join(", ") : raw;
        }
        resolve({ ok: socket.authorized, diasRestantes, emisor, protocolo });
        socket.end();
      },
    );
    socket.on("error", () =>
      resolve({ ok: false, diasRestantes: null, emisor: "", protocolo: "" }),
    );
    socket.on("timeout", () => {
      socket.destroy();
      resolve({ ok: false, diasRestantes: null, emisor: "", protocolo: "" });
    });
  });
}

// --------------------------------------------------------------------------
// Análisis principal
// --------------------------------------------------------------------------
export async function analizarDominio(dominio: string): Promise<Reporte> {
  const { res, urlFinal } = await fetchSeguro(`https://${dominio}`);
  const h = res.headers;

  // Cuerpo HTML (limitado)
  let html = "";
  const largo = Number(h.get("content-length") || "0");
  if (largo < 3_000_000) {
    try {
      html = (await res.text()).slice(0, 1_500_000);
    } catch {
      html = "";
    }
  }

  const tlsInfo = await analizarTLS(dominio);

  // ---- Grupo: Seguridad y cabeceras ----
  const tiene = (n: string) => !!h.get(n);
  const seg: Check[] = [
    check(
      "HTTPS activo",
      urlFinal.startsWith("https://") ? "ok" : "fail",
      urlFinal.startsWith("https://") ? "El sitio responde por HTTPS" : "El sitio no fuerza HTTPS",
      "Todo el tráfico debe ir cifrado por HTTPS.",
    ),
    check(
      "HSTS (Strict-Transport-Security)",
      tiene("strict-transport-security") ? "ok" : "fail",
      tiene("strict-transport-security") ? "Presente" : "No encontrado",
      "Obliga al navegador a usar siempre HTTPS.",
    ),
    check(
      "Content-Security-Policy",
      tiene("content-security-policy") ? "ok" : "warn",
      tiene("content-security-policy") ? "Presente" : "No encontrada",
      "Reduce el riesgo de inyección de scripts (XSS).",
    ),
    check(
      "X-Content-Type-Options",
      h.get("x-content-type-options")?.toLowerCase() === "nosniff" ? "ok" : "warn",
      h.get("x-content-type-options") || "No encontrado",
      "Evita que el navegador adivine el tipo de contenido.",
    ),
    check(
      "Protección de clickjacking",
      tiene("x-frame-options") || /frame-ancestors/i.test(h.get("content-security-policy") || "")
        ? "ok"
        : "warn",
      tiene("x-frame-options") ? h.get("x-frame-options")! : "No encontrado",
      "X-Frame-Options o CSP frame-ancestors evitan el secuestro de clics.",
    ),
    check(
      "Referrer-Policy",
      tiene("referrer-policy") ? "ok" : "warn",
      h.get("referrer-policy") || "No encontrada",
      "Controla qué información de origen se comparte al navegar.",
    ),
    check(
      "Permissions-Policy",
      tiene("permissions-policy") ? "ok" : "warn",
      tiene("permissions-policy") ? "Presente" : "No encontrada",
      "Limita el acceso a cámara, micrófono, ubicación, etc.",
    ),
    check(
      "Exposición del servidor",
      /\d/.test(h.get("server") || "") ? "warn" : "ok",
      h.get("server") || "Oculto",
      "Revelar la versión del servidor facilita ataques dirigidos.",
    ),
  ];

  // ---- Grupo: Certificado SSL ----
  const protoOk = tlsInfo.protocolo === "TLSv1.3" || tlsInfo.protocolo === "TLSv1.2";
  const ssl: Check[] = [
    check(
      "Certificado válido",
      tlsInfo.ok ? "ok" : "fail",
      tlsInfo.ok ? "Confiable" : "No verificable",
      "Un certificado válido y confiable protege la identidad del sitio.",
    ),
    check(
      "Vigencia del certificado",
      tlsInfo.diasRestantes === null ? "warn" : tlsInfo.diasRestantes < 15 ? "fail" : tlsInfo.diasRestantes < 30 ? "warn" : "ok",
      tlsInfo.diasRestantes === null ? "Desconocida" : `${tlsInfo.diasRestantes} días restantes`,
      "Renueve antes de que expire para evitar caídas y alertas.",
    ),
    check(
      "Versión de TLS",
      protoOk ? "ok" : "warn",
      tlsInfo.protocolo || "Desconocida",
      "Use TLS 1.2 o 1.3; las versiones anteriores son inseguras.",
    ),
    check(
      "Emisor",
      tlsInfo.emisor ? "ok" : "warn",
      tlsInfo.emisor || "Desconocido",
      "Autoridad certificadora que respalda el certificado.",
    ),
  ];

  // ---- Grupo: SEO On-Page ----
  const titulo = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "").trim();
  const metaDesc = (
    html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1] ||
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)?.[1] ||
    ""
  ).trim();
  const h1 = (html.match(/<h1[\s>]/gi) || []).length;
  const h2 = (html.match(/<h2[\s>]/gi) || []).length;
  const imgs = html.match(/<img\b[^>]*>/gi) || [];
  const sinAlt = imgs.filter((t) => !/\balt\s*=/i.test(t)).length;
  const modernas = /\.(webp|avif)\b/i.test(html) || /<source[^>]+image\/(webp|avif)/i.test(html);
  const palabras = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  const seo: Check[] = [
    check(
      "Título (title)",
      !titulo ? "fail" : titulo.length >= 30 && titulo.length <= 65 ? "ok" : "warn",
      titulo ? `${titulo.length} caracteres` : "No encontrado",
      "Ideal 50-60 caracteres con su palabra clave.",
    ),
    check(
      "Meta descripción",
      !metaDesc ? "fail" : metaDesc.length >= 120 && metaDesc.length <= 165 ? "ok" : "warn",
      metaDesc ? `${metaDesc.length} caracteres` : "No encontrada",
      "Ideal 140-160 caracteres con llamado a la acción.",
    ),
    check(
      "Encabezado H1",
      h1 === 1 ? "ok" : h1 === 0 ? "fail" : "warn",
      `${h1} encontrado${h1 === 1 ? "" : "s"}`,
      "Debe haber un solo H1, claro y descriptivo.",
    ),
    check(
      "Subtítulos H2",
      h2 > 0 ? "ok" : "warn",
      `${h2} encontrado${h2 === 1 ? "" : "s"}`,
      "Estructure el contenido con H2/H3 jerárquicos.",
    ),
    check(
      "Imágenes con texto alt",
      imgs.length === 0 ? "warn" : sinAlt === 0 ? "ok" : "warn",
      imgs.length === 0 ? "Sin imágenes" : `${sinAlt} sin alt de ${imgs.length}`,
      "El alt mejora SEO y accesibilidad.",
    ),
    check(
      "Formato de imagen moderno",
      imgs.length === 0 ? "warn" : modernas ? "ok" : "warn",
      imgs.length === 0 ? "N/D" : modernas ? "Sí" : "No detectado",
      "WebP/AVIF reducen el peso y aceleran la carga.",
    ),
  ];

  const scoreSeg = puntaje([...seg, ...ssl]);
  const scoreWeb = puntaje(seo);

  return {
    dominio,
    urlFinal,
    scores: { seguridad: scoreSeg, web: scoreWeb },
    resumen: resumenDe(scoreSeg),
    meta: {
      servidor: h.get("server") || "Oculto",
      htmlKB: Math.round((html.length / 1024) * 10) / 10,
      palabras,
      tls: tlsInfo.protocolo || "—",
    },
    grupos: [
      { titulo: "Seguridad y cabeceras", checks: seg },
      { titulo: "Certificado SSL/TLS", checks: ssl },
      { titulo: "SEO On-Page", checks: seo },
    ],
  };
}

function check(titulo: string, estado: Estado, valor: string, consejo: string): Check {
  return { titulo, estado, valor, consejo };
}

function puntaje(checks: Check[]): number {
  if (checks.length === 0) return 0;
  const pts = checks.reduce((a, c) => a + (c.estado === "ok" ? 1 : c.estado === "warn" ? 0.4 : 0), 0);
  return Math.round((pts / checks.length) * 100);
}

function resumenDe(score: number): string {
  if (score >= 80) return "Buena base — con ajustes menores queda sólido.";
  if (score >= 55) return "Hay varios puntos por reforzar; conviene priorizar.";
  return "Hay mucho por mejorar — y eso es buena noticia: gana fácil priorizando.";
}
