"use client";

import { useRouter } from "next/navigation";
import { useIdioma } from "@/i18n";

/** Toggle de idioma ES / EN (navega entre / y /en). */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const idioma = useIdioma();
  const router = useRouter();

  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className={`inline-flex items-center rounded-full border border-white/15 p-0.5 ${className}`}
    >
      {(["es", "en"] as const).map((l) => {
        const activo = idioma === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => router.push(l === "en" ? "/en" : "/")}
            aria-pressed={activo}
            className={`rounded-full px-2.5 py-1 font-mono text-xs uppercase transition-colors ${
              activo ? "bg-menta text-abismo" : "text-niebla hover:text-texto"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
