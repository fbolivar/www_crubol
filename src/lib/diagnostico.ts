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
const SELECTORES = ["google", "default", "selector1", "selector2", "k1", "k2", "dkim", "mail", "s1", "s2", "mxvault", "zoho", "titan1", "titan2", "titan", "protonmail", "sm"];
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
type Lang = "es" | "en";

// Diccionario de textos del reporte (títulos, valores y consejos).
const STR = {
  es: {
    gSeg: "Seguridad y cabeceras",
    gSsl: "Certificado SSL/TLS",
    gMail: "Correo y dominio (SPF · DKIM · DMARC)",
    // valores comunes
    present: "Presente", notFoundM: "No encontrado", notFoundF: "No encontrada",
    unknown: "Desconocida", unknownM: "Desconocido", notVerifiable: "No verificable",
    yes: "Sí", noRedir: "No redirige", hidden: "Oculta", published: "Publicado",
    trusted: "Confiable", days: "días restantes", noConfig: "No configurado",
    restrictsTo: "Restringe a", noIssuerRestriction: "Sin restricción de emisor",
    noCookies: "Sin cookies", withoutSecure: "sin 'Secure' de",
    respHttps: "El sitio responde por HTTPS", noHttps: "No responde por HTTPS",
    noMx: "Sin MX (no recibe correo)", spfSoft: "Presente pero permisivo (~all/+all)",
    spfStrict: "Presente y estricto", dkimYes: "Detectado (selector", dkimNo: "No detectado en selectores comunes",
    policy: "Política", defined: "definida", blacklisted: "Aparece en una lista negra",
    notBlacklisted: "Sin registros en listas negras",
    // títulos
    tHttps: "HTTPS activo", tRedir: "Redirección HTTP → HTTPS",
    tHsts: "HSTS (Strict-Transport-Security)", tCsp: "Content-Security-Policy",
    tXcto: "X-Content-Type-Options", tClick: "Protección de clickjacking",
    tRef: "Referrer-Policy", tCookies: "Cookies seguras", tTech: "Exposición de tecnología",
    tSecTxt: "security.txt", tCertValid: "Certificado válido", tCertVig: "Vigencia del certificado",
    tTls: "Versión de TLS", tCaa: "Registro CAA", tIssuer: "Emisor", tMx: "Registros MX",
    tRep: "Reputación (listas negras)",
    // consejos
    cHttps: "Todo el tráfico debe ir cifrado por HTTPS.",
    cRedir: "El acceso por HTTP debe redirigir siempre a HTTPS.",
    cHsts: "Obliga al navegador a usar siempre HTTPS.",
    cCsp: "Reduce el riesgo de inyección de scripts (XSS).",
    cXcto: "Evita que el navegador adivine el tipo de contenido.",
    cClick: "X-Frame-Options o CSP frame-ancestors evitan el secuestro de clics.",
    cRef: "Controla qué información de origen se comparte.",
    cCookies: "Las cookies deben llevar Secure, HttpOnly y SameSite.",
    cTech: "Revelar software y versiones facilita ataques dirigidos.",
    cSecTxt: "Un /.well-known/security.txt facilita el reporte responsable de fallas.",
    cCertValid: "Un certificado válido protege la identidad del sitio.",
    cCertVig: "Renueve antes de que expire para evitar caídas y alertas.",
    cTls: "Use TLS 1.2 o 1.3; versiones anteriores son inseguras.",
    cCaa: "CAA limita qué autoridades pueden emitir certificados para su dominio.",
    cIssuer: "Autoridad certificadora que respalda el certificado.",
    cMx: "Los MX definen quién recibe el correo del dominio.",
    cSpf: "SPF declara qué servidores pueden enviar en su nombre; use -all.",
    cDkim: "DKIM firma sus correos; evita suplantación. (Sondeo parcial de selectores.)",
    cDmarc: "DMARC protege su marca del phishing; apunte a p=quarantine o reject.",
    cRep: "Estar en listas negras (DNSBL) daña la entregabilidad del correo.",
    rHigh: "Buena base — con ajustes menores queda sólido.",
    rMid: "Hay varios puntos por reforzar; conviene priorizar.",
    rLow: "Hay mucho por mejorar — y eso es buena noticia: gana fácil priorizando.",
  },
  en: {
    gSeg: "Security & headers",
    gSsl: "SSL/TLS certificate",
    gMail: "Email & domain (SPF · DKIM · DMARC)",
    present: "Present", notFoundM: "Not found", notFoundF: "Not found",
    unknown: "Unknown", unknownM: "Unknown", notVerifiable: "Not verifiable",
    yes: "Yes", noRedir: "Does not redirect", hidden: "Hidden", published: "Published",
    trusted: "Trusted", days: "days remaining", noConfig: "Not configured",
    restrictsTo: "Restricts to", noIssuerRestriction: "No issuer restriction",
    noCookies: "No cookies", withoutSecure: "without 'Secure' of",
    respHttps: "The site responds over HTTPS", noHttps: "Does not respond over HTTPS",
    noMx: "No MX (does not receive email)", spfSoft: "Present but permissive (~all/+all)",
    spfStrict: "Present and strict", dkimYes: "Detected (selector", dkimNo: "Not detected in common selectors",
    policy: "Policy", defined: "defined", blacklisted: "Listed on a blocklist",
    notBlacklisted: "No records on blocklists",
    tHttps: "HTTPS active", tRedir: "HTTP → HTTPS redirect",
    tHsts: "HSTS (Strict-Transport-Security)", tCsp: "Content-Security-Policy",
    tXcto: "X-Content-Type-Options", tClick: "Clickjacking protection",
    tRef: "Referrer-Policy", tCookies: "Secure cookies", tTech: "Technology disclosure",
    tSecTxt: "security.txt", tCertValid: "Valid certificate", tCertVig: "Certificate validity",
    tTls: "TLS version", tCaa: "CAA record", tIssuer: "Issuer", tMx: "MX records",
    tRep: "Reputation (blocklists)",
    cHttps: "All traffic must be encrypted over HTTPS.",
    cRedir: "HTTP access must always redirect to HTTPS.",
    cHsts: "Forces the browser to always use HTTPS.",
    cCsp: "Reduces the risk of script injection (XSS).",
    cXcto: "Prevents the browser from guessing the content type.",
    cClick: "X-Frame-Options or CSP frame-ancestors prevent click hijacking.",
    cRef: "Controls what origin information is shared.",
    cCookies: "Cookies should carry Secure, HttpOnly and SameSite.",
    cTech: "Revealing software and versions makes targeted attacks easier.",
    cSecTxt: "A /.well-known/security.txt enables responsible vulnerability reporting.",
    cCertValid: "A valid certificate protects the site's identity.",
    cCertVig: "Renew before it expires to avoid outages and warnings.",
    cTls: "Use TLS 1.2 or 1.3; earlier versions are insecure.",
    cCaa: "CAA limits which authorities can issue certificates for your domain.",
    cIssuer: "Certificate authority backing the certificate.",
    cMx: "MX records define who receives the domain's email.",
    cSpf: "SPF declares which servers may send on your behalf; use -all.",
    cDkim: "DKIM signs your email; prevents spoofing. (Partial selector probe.)",
    cDmarc: "DMARC protects your brand from phishing; aim for p=quarantine or reject.",
    cRep: "Being on blocklists (DNSBL) harms email deliverability.",
    rHigh: "Good baseline — a few minor tweaks and it's solid.",
    rMid: "Several points to reinforce; worth prioritizing.",
    rLow: "Plenty to improve — and that's good news: easy wins by prioritizing.",
  },
} as const;

export async function analizarDominio(dominio: string, lang: Lang = "es"): Promise<Reporte> {
  const D = STR[lang];
  // Guarda previa contra SSRF: valida que el dominio no resuelva a IP privada
  // ANTES de cualquier conexión (fetch, TLS o DNSBL).
  await guardarHost(dominio);

  const [principal, ip, tlsInfo, mx, spfTxts, dmarcTxts, caa] = await Promise.all([
    fetchSeguro(`https://${dominio}`),
    ipDe(dominio),
    analizarTLS(dominio),
    dnsp.resolveMx(dominio).catch(() => [] as { exchange: string; priority: number }[]),
    txt(dominio),
    txt(`_dmarc.${dominio}`),
    dnsp.resolveCaa(dominio).catch(() => []),
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
    check(D.tHttps, urlFinal.startsWith("https://") ? "ok" : "fail",
      urlFinal.startsWith("https://") ? D.respHttps : D.noHttps, D.cHttps),
    check(D.tRedir, redir === null ? "warn" : redir ? "ok" : "fail",
      redir === null ? D.notVerifiable : redir ? D.yes : D.noRedir, D.cRedir),
    check(D.tHsts, tiene("strict-transport-security") ? "ok" : "fail",
      tiene("strict-transport-security") ? D.present : D.notFoundM, D.cHsts),
    check(D.tCsp, tiene("content-security-policy") ? "ok" : "warn",
      tiene("content-security-policy") ? D.present : D.notFoundF, D.cCsp),
    check(D.tXcto, h.get("x-content-type-options")?.toLowerCase() === "nosniff" ? "ok" : "warn",
      h.get("x-content-type-options") || D.notFoundM, D.cXcto),
    check(D.tClick,
      tiene("x-frame-options") || /frame-ancestors/i.test(h.get("content-security-policy") || "") ? "ok" : "warn",
      tiene("x-frame-options") ? h.get("x-frame-options")! : D.notFoundM, D.cClick),
    check(D.tRef, tiene("referrer-policy") ? "ok" : "warn",
      h.get("referrer-policy") || D.notFoundF, D.cRef),
    check(D.tCookies, cookies.length === 0 ? "ok" : cookiesInseguras === 0 ? "ok" : "warn",
      cookies.length === 0 ? D.noCookies : `${cookiesInseguras} ${D.withoutSecure} ${cookies.length}`,
      D.cCookies),
    check(D.tTech,
      tiene("x-powered-by") || /\d/.test(h.get("server") || "") ? "warn" : "ok",
      h.get("x-powered-by") || h.get("server") || D.hidden, D.cTech),
    check(D.tSecTxt, secTxt ? "ok" : "warn", secTxt ? D.published : D.notFoundM, D.cSecTxt),
  ];

  // ---- Certificado SSL/TLS ----
  const protoOk = tlsInfo.protocolo === "TLSv1.3" || tlsInfo.protocolo === "TLSv1.2";
  const caaEmisores = caa.map((c) => c.issue || c.issuewild).filter(Boolean);
  const caaRestringe = caaEmisores.length > 0;
  const ssl: Check[] = [
    check(D.tCertValid, tlsInfo.ok ? "ok" : "fail", tlsInfo.ok ? D.trusted : D.notVerifiable, D.cCertValid),
    check(D.tCertVig,
      tlsInfo.diasRestantes === null ? "warn" : tlsInfo.diasRestantes < 15 ? "fail" : tlsInfo.diasRestantes < 30 ? "warn" : "ok",
      tlsInfo.diasRestantes === null ? D.unknown : `${tlsInfo.diasRestantes} ${D.days}`, D.cCertVig),
    check(D.tTls, protoOk ? "ok" : "warn", tlsInfo.protocolo || D.unknown, D.cTls),
    check(D.tCaa, caaRestringe ? "ok" : "warn",
      caa.length === 0 ? D.noConfig : caaRestringe ? `${D.restrictsTo}: ${caaEmisores.join(", ")}` : D.noIssuerRestriction,
      D.cCaa),
    check(D.tIssuer, tlsInfo.emisor ? "ok" : "warn", tlsInfo.emisor || D.unknownM, D.cIssuer),
  ];

  // ---- Correo y dominio ----
  const spf = spfTxts.find((t) => /^v=spf1/i.test(t)) || "";
  const spfSuave = /[?+]all/i.test(spf);
  const dmarc = dmarcTxts.find((t) => /^v=DMARC1/i.test(t)) || "";
  const dmarcPol = (dmarc.match(/p=(\w+)/i)?.[1] || "").toLowerCase();

  const dkimHits = await Promise.all(
    SELECTORES.map((s) => txt(`${s}._domainkey.${dominio}`).then((r) => ({ s, r }))),
  );
  const dkimSel = dkimHits.find((x) => x.r.some((v) => /v=DKIM1|k=|p=/i.test(v)))?.s || "";

  const mxHost = mx.sort((a, b) => a.priority - b.priority)[0]?.exchange || "";
  const proveedor = PROVEEDORES.find(([re]) => re.test(mxHost))?.[1] || "";
  const listaNegra = await enListaNegra(ip);

  const correo: Check[] = [
    check(D.tMx, mx.length > 0 ? "ok" : "warn",
      mx.length > 0 ? `${mxHost}${proveedor ? ` (${proveedor})` : ""}` : D.noMx, D.cMx),
    check("SPF", !spf ? "fail" : spfSuave ? "warn" : "ok",
      !spf ? D.notFoundM : spfSuave ? D.spfSoft : D.spfStrict, D.cSpf),
    check("DKIM", dkimSel ? "ok" : "warn",
      dkimSel ? `${D.dkimYes} ${dkimSel})` : D.dkimNo, D.cDkim),
    check("DMARC", !dmarc ? "fail" : dmarcPol === "reject" || dmarcPol === "quarantine" ? "ok" : "warn",
      !dmarc ? D.notFoundM : `${D.policy}: ${dmarcPol || D.defined}`, D.cDmarc),
    check(D.tRep, listaNegra === null ? "warn" : listaNegra ? "fail" : "ok",
      listaNegra === null ? D.notVerifiable : listaNegra ? D.blacklisted : D.notBlacklisted, D.cRep),
  ];

  const scoreSeg = puntaje([...seg, ...ssl]);
  const scoreCorreo = puntaje(correo);
  const media = Math.round((scoreSeg + scoreCorreo) / 2);

  return {
    dominio,
    urlFinal,
    scores: { seguridad: scoreSeg, correo: scoreCorreo },
    resumen: media >= 80 ? D.rHigh : media >= 55 ? D.rMid : D.rLow,
    meta: { servidor: h.get("server") || D.hidden, tls: tlsInfo.protocolo || "—", ip: ip || "—" },
    grupos: [
      { titulo: D.gSeg, checks: seg },
      { titulo: D.gSsl, checks: ssl },
      { titulo: D.gMail, checks: correo },
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
