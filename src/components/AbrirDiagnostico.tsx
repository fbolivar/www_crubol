"use client";

import { diagnostico } from "@/content";
import { EVENTO_DIAGNOSTICO } from "./DiagnosticoPopup";

/** Enlace del pie que abre la ventana de diagnóstico de dominio. */
export function AbrirDiagnostico() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(EVENTO_DIAGNOSTICO))}
      className="text-left text-sm text-niebla transition-colors hover:text-texto"
    >
      {diagnostico.linkFooter}
    </button>
  );
}
