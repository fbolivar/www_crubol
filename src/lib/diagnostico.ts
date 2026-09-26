import dnsp from "node:dns/promises";
import net from "node:net";
import tls from "node:tls";

// --------------------------------------------------------------------------
// Tipos del reporte
// --------------------------------------------------------------------------
export type Estado = "ok" | "warn" | "fail";
export type Check = { titulo: string; estado: Estado; valor: string; consejo: string };
export type Grupo = { titulo: string; checks: Check[] };
export type Reporte = {
  dominio: string;
  urlFinal: string;
  scores: { seguridad: number; correo: number };
  resumen: string;
  meta: { servidor: string; tls: string; ip: string };
  grupos: Grupo[];
};

// --------------------------------------------------------------------------
// Normalización y protección contra SSRF
// --------------------------------------------------------------------------
export function normalizarDominio(entrada: string): string | null {
  let v = (entrada || "").trim().toLowerCase();
  v = v.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0].split("?")[0];
  v = v.split(":")[0];
  if (/^([a-z0-9](-?[a-z0-9])*\.)+[a-z]{2,}$/.test(v) && v.length <= 253) return v;
  return null;
}

function ipPrivada(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const p = ip.split(".").map(Number);
    if (p[0] === 10 || p[0] === 127 || p[0] === 0) return true;
    if (p[0] === 169 && p[1] === 254) return true;
    if (p[0] === 172 && p[1] >= 16 && p[1] <= 31) return true;
    if (p[0] === 192 && p[1] === 168) return true;
    if (p[0] === 100 && p[1] >= 64 && p[1] <= 127) return true;
    if (p[0] >= 224) return true;
    return false;
  }
  const low = ip.toLowerCase();
  if (low === "::1" || low === "::") return true;
  if (low.startsWith("fe80")) return true;
  if (low.startsWith("fc") || low.startsWith("fd")) return true;
  if (low.startsWith("::ffff:")) return ipPrivada(low.split(":").pop() || "");
  return false;
}

async function guardarHost(host: string): Promise<void> {
  if (net.isIP(host)) throw new Error("No se permiten direcciones IP, solo dominios.");
  const addrs = await dnsp.lookup(host, { all: true });
  if (addrs.length === 0) throw new Error("No se pudo resolver el dominio.");
  for (const a of addrs) if (ipPrivada(a.address)) throw new Error("Dominio no permitido.");
}

// --------------------------------------------------------------------------
// Fetch seguro con seguimiento manual de redirecciones
// --------------------------------------------------------------------------
async function fetchSeguro(
  urlInicial: string,
  metodo: "GET" | "HEAD" = "GET",
  maxHops = 4,
): Promise<{ res: Response; urlFinal: string; saltos: number }> {
  let url = urlInicial;
  for (let i = 0; i < maxHops; i++) {
    const u = new URL(url);
    if (u.protocol !== "https:" && u.protocol !== "http:")
      throw new Error("Protocolo no permitido.");
    await guardarHost(u.hostname);
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 9000);
    let res: Response;
    try {
      res = await fetch(u.toString(), {
        method: metodo,
        redirect: "manual",
        signal: ctrl.signal,
        headers: { "User-Agent": "CrubolDiagnostico/1.0 (+https://crubol.com.co)" },
      });
    } finally {
      clearTimeout(t);
    }
    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      url = new URL(res.headers.get("location")!, u).toString();
      continue;
    }
    return { res, urlFinal: u.toString(), saltos: i };
  }
  throw new Error("Demasiadas redirecciones.");
}

// --------------------------------------------------------------------------
// TLS
// --------------------------------------------------------------------------
function analizarTLS(host: string): Promise<{
  ok: boolean;
  diasRestantes: number | null;
  emisor: string;
  protocolo: string;
}> {
  return new Promise((resolve) => {
    const socket = tls.connect({ host, port: 443, servername: host, timeout: 8000 }, () => {
      const cert = socket.getPeerCertificate();
      const protocolo = socket.getProtocol() || "";
      let diasRestantes: number | null = null;
      let emisor = "";
      if (cert && cert.valid_to) {
        diasRestantes = Math.floor((new Date(cert.valid_to).getTime() - Date.now()) / 86400000);
        const raw = (cert.issuer?.O ?? cert.issuer?.CN ?? "") as string | string[];
        emisor = Array.isArray(raw) ? raw.join(", ") : raw;
      }
      resolve({ ok: socket.authorized, diasRestantes, emisor, protocolo });
      socket.end();
    });
    socket.on("error", () => resolve({ ok: false, diasRestantes: null, emisor: "", protocolo: "" }));
    socket.on("timeout", () => {
      socket.destroy();
      resolve({ ok: false, diasRestantes: null, emisor: "", protocolo: "" });
    });
  });
}

// --------------------------------------------------------------------------
// Helpers DNS
// --------------------------------------------------------------------------
async function txt(name: string): Promise<string[]> {
  try {
    return (await dnsp.resolveTxt(name)).map((a) => a.join(""));
  } catch {
    return [];
  }
}
async function ipDe(host: string): Promise<string> {
  try {
    return (await dnsp.lookup(host)).address;
  } catch {
    return "";
  }
}

const PROVEEDORES: [RegExp, string][] = [
  [/google|googlemail|gmail/i, "Google Workspace"],
  [/outlook|microsoft|office365/i, "Microsoft 365"],
  [/zoho/i, "Zoho"],
  [/titan|spacemail/i, "Titan Email"],
  [/secureserver|godaddy/i, "GoDaddy"],
  [/protonmail|proton\.me/i, "Proton"],
  [/pphosted|proofpoint/i, "Proofpoint"],
  [/mailgun|mandrill|sendgrid|amazonses/i, "Envío transaccional"],
];
const SELECTORES = ["google", "default", "selector1", "selector2", "k1", "k2", "dkim", "mail", "s1", "s2", "mxvault", "zoho"];
const DNSBL = ["zen.spamhaus.org", "b.barracudacentral.org"];

async function enListaNegra(ip: string): Promise<boolean | null> {
  if (!net.isIPv4(ip)) return null;
  const rev = ip.split(".").reverse().join(".");
  let algunaError = false;
  for (const bl of DNSBL) {
    try {
      await dnsp.resolve4(`${rev}.${bl}`);
      return true; // resolvió => listada
    } catch (e) {
      const code = (e as NodeJS.ErrnoException).code;
      if (code !== "ENOTFOUND" && code !== "ENODATA") algunaError = true;
    }
  }
  return algunaError ? null : false;
}

// --------------------------------------------------------------------------
// Análisis principal
// --------------------------------------------------------------------------
export async function analizarDominio(dominio: string): Promise<Reporte> {
  const [principal, ip, tlsInfo, mx, spfTxts, dmarcTxts, caa] = await Promise.all([
    fetchSeguro(`https://${dominio}`),
    ipDe(dominio),
    analizarTLS(dominio),
    dnsp.resolveMx(dominio).catch(() => [] as { exchange: string; priority: number }[]),
    txt(dominio),
    txt(`_dmarc.${dominio}`),
    dnsp.resolveCaa(dominio).catch(() => [] as { issue?: string }[]),
  ]);
  const { res, urlFinal } = principal;
  const h = res.headers;
  const tiene = (n: string) => !!h.get(n);

  // Comprobaciones HTTP adicionales (no fatales)
  const [redir, secTxt] = await Promise.all([
    fetchSeguro(`http://${dominio}`, "HEAD").then((r) => r.urlFinal.startsWith("https://")).catch(() => null),
    fetchSeguro(`https://${dominio}/.well-known/security.txt`, "HEAD").then((r) => r.res.ok).catch(() => false),
  ]);

  // ---- Seguridad y cabeceras ----
  const cookies = (h.getSetCookie?.() ?? []) as string[];
  const cookiesInseguras = cookies.filter((c) => !/;\s*secure/i.test(c)).length;
  const seg: Check[] = [
    check("HTTPS activo", urlFinal.startsWith("https://") ? "ok" : "fail",
      urlFinal.startsWith("https://") ? "El sitio responde por HTTPS" : "No responde por HTTPS",
      "Todo el tráfico debe ir cifrado por HTTPS."),
    check("Redirección HTTP → HTTPS", redir === null ? "warn" : redir ? "ok" : "fail",
      redir === null ? "No verificable" : redir ? "Sí" : "No redirige",
      "El acceso por HTTP debe redirigir siempre a HTTPS."),
    check("HSTS (Strict-Transport-Security)", tiene("strict-transport-security") ? "ok" : "fail",
      tiene("strict-transport-security") ? "Presente" : "No encontrado",
      "Obliga al navegador a usar siempre HTTPS."),
    check("Content-Security-Policy", tiene("content-security-policy") ? "ok" : "warn",
      tiene("content-security-policy") ? "Presente" : "No encontrada",
      "Reduce el riesgo de inyección de scripts (XSS)."),
    check("X-Content-Type-Options", h.get("x-content-type-options")?.toLowerCase() === "nosniff" ? "ok" : "warn",
      h.get("x-content-type-options") || "No encontrado", "Evita que el navegador adivine el tipo de contenido."),
    check("Protección de clickjacking",
      tiene("x-frame-options") || /frame-ancestors/i.test(h.get("content-security-policy") || "") ? "ok" : "warn",
      tiene("x-frame-options") ? h.get("x-frame-options")! : "No encontrado",
      "X-Frame-Options o CSP frame-ancestors evitan el secuestro de clics."),
    check("Referrer-Policy", tiene("referrer-policy") ? "ok" : "warn",
      h.get("referrer-policy") || "No encontrada", "Controla qué información de origen se comparte."),
    check("Cookies seguras", cookies.length === 0 ? "ok" : cookiesInseguras === 0 ? "ok" : "warn",
      cookies.length === 0 ? "Sin cookies" : `${cookiesInseguras} sin 'Secure' de ${cookies.length}`,
      "Las cookies deben llevar Secure, HttpOnly y SameSite."),
    check("Exposición de tecnología",
      tiene("x-powered-by") || /\d/.test(h.get("server") || "") ? "warn" : "ok",
      h.get("x-powered-by") || h.get("server") || "Oculta",
      "Revelar software y versiones facilita ataques dirigidos."),
    check("security.txt", secTxt ? "ok" : "warn", secTxt ? "Publicado" : "No encontrado",
      "Un /.well-known/security.txt facilita el reporte responsable de fallas."),
  ];

  // ---- Certificado SSL/TLS ----
  const protoOk = tlsInfo.protocolo === "TLSv1.3" || tlsInfo.protocolo === "TLSv1.2";
  const caaEmisores = caa.map((c) => c.issue).filter(Boolean).join(", ");
  const ssl: Check[] = [
    check("Certificado válido", tlsInfo.ok ? "ok" : "fail", tlsInfo.ok ? "Confiable" : "No verificable",
      "Un certificado válido protege la identidad del sitio."),
    check("Vigencia del certificado",
      tlsInfo.diasRestantes === null ? "warn" : tlsInfo.diasRestantes < 15 ? "fail" : tlsInfo.diasRestantes < 30 ? "warn" : "ok",
      tlsInfo.diasRestantes === null ? "Desconocida" : `${tlsInfo.diasRestantes} días restantes`,
      "Renueve antes de que expire para evitar caídas y alertas."),
    check("Versión de TLS", protoOk ? "ok" : "warn", tlsInfo.protocolo || "Desconocida",
      "Use TLS 1.2 o 1.3; versiones anteriores son inseguras."),
    check("Registro CAA", caa.length > 0 ? "ok" : "warn",
      caa.length > 0 ? `Restringe a: ${caaEmisores}` : "No configurado",
      "CAA limita qué autoridades pueden emitir certificados para su dominio."),
    check("Emisor", tlsInfo.emisor ? "ok" : "warn", tlsInfo.emisor || "Desconocido",
      "Autoridad certificadora que respalda el certificado."),
  ];

  // ---- Correo y dominio ----
  const spf = spfTxts.find((t) => /^v=spf1/i.test(t)) || "";
  const spfSuave = /[?+]all/i.test(spf);
  const dmarc = dmarcTxts.find((t) => /^v=DMARC1/i.test(t)) || "";
  const dmarcPol = (dmarc.match(/p=(\w+)/i)?.[1] || "").toLowerCase();

  // DKIM: sondeo de selectores comunes
  const dkimHits = await Promise.all(
    SELECTORES.map((s) => txt(`${s}._domainkey.${dominio}`).then((r) => ({ s, r }))),
  );
  const dkimSel = dkimHits.find((x) => x.r.some((v) => /v=DKIM1|k=|p=/i.test(v)))?.s || "";

  const mxHost = mx.sort((a, b) => a.priority - b.priority)[0]?.exchange || "";
  const proveedor = PROVEEDORES.find(([re]) => re.test(mxHost))?.[1] || "";
  const listaNegra = await enListaNegra(ip);

  const correo: Check[] = [
    check("Registros MX", mx.length > 0 ? "ok" : "warn",
      mx.length > 0 ? `${mxHost}${proveedor ? ` (${proveedor})` : ""}` : "Sin MX (no recibe correo)",
      "Los MX definen quién recibe el correo del dominio."),
    check("SPF", !spf ? "fail" : spfSuave ? "warn" : "ok",
      !spf ? "No encontrado" : spfSuave ? "Presente pero permisivo (~all/+all)" : "Presente y estricto",
      "SPF declara qué servidores pueden enviar en su nombre; use -all."),
    check("DKIM", dkimSel ? "ok" : "warn",
      dkimSel ? `Detectado (selector ${dkimSel})` : "No detectado en selectores comunes",
      "DKIM firma sus correos; evita suplantación. (Sondeo parcial de selectores.)"),
    check("DMARC", !dmarc ? "fail" : dmarcPol === "reject" || dmarcPol === "quarantine" ? "ok" : "warn",
      !dmarc ? "No encontrado" : `Política: ${dmarcPol || "definida"}`,
      "DMARC protege su marca del phishing; apunte a p=quarantine o reject."),
    check("Reputación (listas negras)",
      listaNegra === null ? "warn" : listaNegra ? "fail" : "ok",
      listaNegra === null ? "No verificable" : listaNegra ? "Aparece en una lista negra" : "Sin registros en listas negras",
      "Estar en listas negras (DNSBL) daña la entregabilidad del correo."),
  ];

  const scoreSeg = puntaje([...seg, ...ssl]);
  const scoreCorreo = puntaje(correo);

  return {
    dominio,
    urlFinal,
    scores: { seguridad: scoreSeg, correo: scoreCorreo },
    resumen: resumenDe(Math.round((scoreSeg + scoreCorreo) / 2)),
    meta: { servidor: h.get("server") || "Oculto", tls: tlsInfo.protocolo || "—", ip: ip || "—" },
    grupos: [
      { titulo: "Seguridad y cabeceras", checks: seg },
      { titulo: "Certificado SSL/TLS", checks: ssl },
      { titulo: "Correo y dominio (SPF · DKIM · DMARC)", checks: correo },
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
