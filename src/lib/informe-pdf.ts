import PDFDocument from "pdfkit";
import { diagnosticoResultado as diagEs } from "@/content";
import { diagnosticoResultado as diagEn } from "@/content-en";
import type { Reporte } from "@/lib/diagnostico";

type Lang = "es" | "en";
const L = {
  es: { sub: "DIAGNÓSTICO DE DOMINIO · REPORTE PARCIAL", resultado: "Resultado de", solicitado: "Solicitado por", servidor: "Servidor", seguridad: "Seguridad", correo: "Correo / DNS", ok: "OK", warn: "REVISAR", fail: "FALLA", locale: "es-CO" },
  en: { sub: "DOMAIN DIAGNOSTIC · PARTIAL REPORT", resultado: "Result for", solicitado: "Requested by", servidor: "Server", seguridad: "Security", correo: "Email / DNS", ok: "OK", warn: "REVIEW", fail: "FAIL", locale: "en-US" },
} as const;

// Paleta de marca
const ABISMO = "#061E24";
const TEAL = "#0B7285";
const CIAN = "#15AABF";
const MENTA = "#2Fb389"; // menta legible sobre blanco (el #63E6BE no contrasta)
const AMBAR = "#B9781F";
const ROJO = "#C23B3B";
const GRIS = "#48626B";
const TINTA = "#16323A";
const LINEA = "#DDE9EC";

const colorEstado = (e: string) => (e === "ok" ? MENTA : e === "warn" ? AMBAR : ROJO);

/** Genera el PDF del reporte parcial y devuelve un Buffer. */
export function generarInformePDF(
  datos: { nombre: string; dominio: string },
  reporte: Reporte,
  lang: Lang = "es",
): Promise<Buffer> {
  const t = L[lang];
  const aviso = (lang === "en" ? diagEn : diagEs).aviso;
  const textoEstado = (e: string) => (e === "ok" ? t.ok : e === "warn" ? t.warn : t.fail);
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 48 });
    const chunks: Buffer[] = [];
    doc.on("data", (c: Buffer) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const ancho = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const x0 = doc.page.margins.left;

    // Encabezado
    doc.rect(0, 0, doc.page.width, 90).fill(ABISMO);
    doc.fillColor("#E6F2F4").fontSize(20).font("Helvetica-Bold").text("Crubol Technology", x0, 30);
    doc.fillColor(CIAN).fontSize(10).font("Helvetica").text(t.sub, x0, 56);

    doc.moveDown(3);
    doc.fillColor(TINTA).fontSize(16).font("Helvetica-Bold").text(`${t.resultado} ${reporte.dominio}`, x0, 120);
    doc.fillColor(GRIS).fontSize(10).font("Helvetica").text(
      `${t.solicitado}: ${datos.nombre}  ·  ${new Date().toLocaleDateString(t.locale, { year: "numeric", month: "long", day: "numeric" })}`,
    );
    doc.fillColor(GRIS).fontSize(9).text(
      `${t.servidor}: ${reporte.meta.servidor}  ·  ${reporte.meta.tls}  ·  IP ${reporte.meta.ip}`,
    );

    // Puntajes
    doc.moveDown(1);
    const yP = doc.y;
    doc.roundedRect(x0, yP, ancho / 2 - 6, 54, 8).fillAndStroke("#F4FAFB", LINEA);
    doc.roundedRect(x0 + ancho / 2 + 6, yP, ancho / 2 - 6, 54, 8).fillAndStroke("#F4FAFB", LINEA);
    doc.fillColor(TEAL).fontSize(24).font("Helvetica-Bold").text(`${reporte.scores.seguridad}/100`, x0 + 16, yP + 10);
    doc.fillColor(GRIS).fontSize(9).font("Helvetica").text(t.seguridad, x0 + 16, yP + 38);
    doc.fillColor(TEAL).fontSize(24).font("Helvetica-Bold").text(`${reporte.scores.correo}/100`, x0 + ancho / 2 + 22, yP + 10);
    doc.fillColor(GRIS).fontSize(9).font("Helvetica").text(t.correo, x0 + ancho / 2 + 22, yP + 38);
    doc.y = yP + 66;
    doc.fillColor(TINTA).fontSize(10).font("Helvetica-Oblique").text(String(reporte.resumen ?? "").slice(0, 200), x0, doc.y);

    // Grupos y checks. Se acotan tamaños por si el reporte llega manipulado.
    const s = (v: unknown, n = 300) => String(v ?? "").slice(0, n);
    for (const g of (reporte.grupos || []).slice(0, 10)) {
      doc.moveDown(1);
      if (doc.y > doc.page.height - 140) doc.addPage();
      doc.fillColor(TEAL).fontSize(13).font("Helvetica-Bold").text(s(g.titulo, 120), x0, doc.y);
      doc.moveDown(0.4);
      for (const c of (g.checks || []).slice(0, 20)) {
        if (doc.y > doc.page.height - 90) doc.addPage();
        const y = doc.y;
        doc.roundedRect(x0, y, 58, 16, 4).fill(colorEstado(c.estado));
        doc.fillColor("#FFFFFF").fontSize(8).font("Helvetica-Bold").text(textoEstado(c.estado), x0, y + 4, { width: 58, align: "center" });
        doc.fillColor(TINTA).fontSize(10).font("Helvetica-Bold").text(s(c.titulo, 120), x0 + 68, y, { width: ancho - 68 });
        doc.fillColor(GRIS).fontSize(9).font("Helvetica").text(`${s(c.valor, 200)} — ${s(c.consejo)}`, x0 + 68, doc.y, { width: ancho - 68 });
        doc.moveDown(0.6);
      }
    }

    // Aviso legal
    if (doc.y > doc.page.height - 160) doc.addPage();
    doc.moveDown(1);
    doc.moveTo(x0, doc.y).lineTo(x0 + ancho, doc.y).stroke(LINEA);
    doc.moveDown(0.6);
    doc.fillColor(GRIS).fontSize(7.5).font("Helvetica").text(aviso, x0, doc.y, {
      width: ancho,
      align: "justify",
    });
    doc.moveDown(0.6);
    doc.fillColor(GRIS).fontSize(7.5).text(
      "CRUBOL TECHNOLOGY S.A.S. · NIT 902107870-4 · Bogotá, Colombia · info@crubol.com · crubol.com.co",
      { width: ancho, align: "center" },
    );

    doc.end();
  });
}
