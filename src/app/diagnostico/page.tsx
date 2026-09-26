import type { Metadata } from "next";
import { Suspense } from "react";
import { DiagnosticoResultado } from "@/components/DiagnosticoResultado";

export const metadata: Metadata = {
  title: "Diagnóstico de dominio · Crubol Technology",
  description: "Análisis parcial y gratuito de seguridad, SSL y SEO de su dominio.",
  robots: { index: false, follow: false },
};

export default function DiagnosticoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-abismo" />}>
      <DiagnosticoResultado />
    </Suspense>
  );
}
