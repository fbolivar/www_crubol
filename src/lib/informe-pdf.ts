import PDFDocument from "pdfkit";
import { diagnosticoResultado } from "@/content";
import type { Reporte } from "@/lib/diagnostico";

// Paleta de marca
const ABISMO = "#04161B";
const TEAL = "#0B7285";
const CIAN = "#15AABF";
const MENTA = "#2Fb389"; // menta legible sobre blanco (el #63E6BE no contrasta)
const AMBAR = "#B9781F";
const ROJO = "#C23B3B";
const GRIS = "#48626B";
const TINTA = "#16323A";
const LINEA = "#DDE9EC";

const colorEstado = (e: string) => (e === "ok" ? MENTA : e === "warn" ? AMBAR : ROJO);
const textoEstado = (e: string) => (e === "ok" ? "OK" : e === "warn" ? "REVISAR" : "FALLA");

/** Genera el PDF del reporte parcial y devuelve un Buffer. */
export function generarInformePDF(
  datos: { nombre: string; dominio: string },
  reporte: Reporte,
): Promise<Buffer> {
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
    doc.fillColor("#E8F4F6").fontSize(20).font("Helvetica-Bold").text("Crubol Technology", x0, 30);
    doc.fillColor(CIAN).fontSize(10).font("Helvetica").text("DIAGNÓSTICO DE DOMINIO · REPORTE PARCIAL", x0, 56);

    doc.moveDown(3);
    doc.fillColor(TINTA).fontSize(16).font("Helvetica-Bold").text(`Resultado de ${reporte.dominio}`, x0, 120);
    doc.fillColor(GRIS).fontSize(10).font("Helvetica").text(
      `Solicitado por: ${datos.nombre}  ·  ${new Date().toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}`,
    );
    doc.fillColor(GRIS).fontSize(9).text(
      `Servidor: ${reporte.meta.servidor}  ·  ${reporte.meta.tls}  ·  IP ${reporte.meta.ip}`,
    );

    // Puntajes
    doc.moveDown(1);
    const yP = doc.y;
    doc.roundedRect(x0, yP, ancho / 2 - 6, 54, 8).fillAndStroke("#F4FAFB", LINEA);
    doc.roundedRect(x0 + ancho / 2 + 6, yP, ancho / 2 - 6, 54, 8).fillAndStroke("#F4FAFB", LINEA);
    doc.fillColor(TEAL).fontSize(24).font("Helvetica-Bold").text(`${reporte.scores.seguridad}/100`, x0 + 16, yP + 10);
    doc.fillColor(GRIS).fontSize(9).font("Helvetica").text("Seguridad", x0 + 16, yP + 38);
    doc.fillColor(TEAL).fontSize(24).font("Helvetica-Bold").text(`${reporte.scores.correo}/100`, x0 + ancho / 2 + 22, yP + 10);
    doc.fillColor(GRIS).fontSize(9).font("Helvetica").text("Correo / DNS", x0 + ancho / 2 + 22, yP + 38);
    doc.y = yP + 66;
    doc.fillColor(TINTA).fontSize(10).font("Helvetica-Oblique").text(reporte.resumen, x0, doc.y);

    // Grupos y checks
    for (const g of reporte.grupos) {
      doc.moveDown(1);
      if (doc.y > doc.page.height - 140) doc.addPage();
      doc.fillColor(TEAL).fontSize(13).font("Helvetica-Bold").text(g.titulo, x0, doc.y);
      doc.moveDown(0.4);
      for (const c of g.checks) {
        if (doc.y > doc.page.height - 90) doc.addPage();
        const y = doc.y;
        doc.roundedRect(x0, y, 58, 16, 4).fill(colorEstado(c.estado));
        doc.fillColor("#FFFFFF").fontSize(8).font("Helvetica-Bold").text(textoEstado(c.estado), x0, y + 4, { width: 58, align: "center" });
        doc.fillColor(TINTA).fontSize(10).font("Helvetica-Bold").text(c.titulo, x0 + 68, y, { width: ancho - 68 });
        doc.fillColor(GRIS).fontSize(9).font("Helvetica").text(`${c.valor} — ${c.consejo}`, x0 + 68, doc.y, { width: ancho - 68 });
        doc.moveDown(0.6);
      }
    }

    // Aviso legal
    if (doc.y > doc.page.height - 160) doc.addPage();
    doc.moveDown(1);
    doc.moveTo(x0, doc.y).lineTo(x0 + ancho, doc.y).stroke(LINEA);
    doc.moveDown(0.6);
    doc.fillColor(GRIS).fontSize(7.5).font("Helvetica").text(diagnosticoResultado.aviso, x0, doc.y, {
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
