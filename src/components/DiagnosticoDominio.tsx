"use client";

import { useState, type FormEvent } from "react";
import { diagnostico } from "@/content";
import { useWhatsApp } from "./WhatsAppModal";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { Reveal } from "./ui/Reveal";
import { Glow, HexOutline, HexSolid, DotGrid } from "./ui/Decor";
import { IconEscudo } from "./ui/Icons";

// Valida un dominio, con o sin protocolo/ruta. Devuelve el dominio limpio o null.
function normalizarDominio(entrada: string): string | null {
  let v = entrada.trim().toLowerCase();
  v = v.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
  if (/^([a-z0-9](-?[a-z0-9])*\.)+[a-z]{2,}$/.test(v)) return v;
  return null;
}

export function DiagnosticoDominio() {
  const { abrir } = useWhatsApp();
  const [valor, setValor] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const dominio = normalizarDominio(valor);
    if (!dominio) {
      setError(diagnostico.errorDominio);
      return;
    }
    setError("");
    // El dominio viaja como contexto al formulario de WhatsApp.
    abrir(`Solicito un diagnóstico gratuito para el dominio: ${dominio}`);
  };

  return (
    <section className="relative overflow-hidden bg-abismo py-20 sm:py-28">
      <Glow className="left-1/2 top-10 h-80 w-80 -translate-x-1/2" color="rgba(21,170,191,0.18)" />
      <HexSolid className="right-[8%] top-14 h-24 w-24" />
      <HexOutline className="left-[6%] bottom-16 h-16 w-16 opacity-40" />
      <DotGrid className="left-[10%] top-20 h-24 w-24 opacity-20" />

      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <Reveal>
          <div className="flex justify-center">
            <SectionEyebrow icon={<IconEscudo />} tono="oscuro">
              {diagnostico.eyebrow}
            </SectionEyebrow>
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-texto sm:text-5xl">
            {diagnostico.tituloAntes}{" "}
            <span className="texto-gradiente">{diagnostico.tituloResaltado}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-niebla">
            {diagnostico.parrafo}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <div className="flex flex-1 items-center rounded-xl border border-white/15 bg-profundo/60 px-4 focus-within:border-menta">
              <span className="select-none pr-1 font-mono text-sm text-niebla/70">
                https://
              </span>
              <input
                value={valor}
                onChange={(e) => {
                  setValor(e.target.value);
                  if (error) setError("");
                }}
                inputMode="url"
                aria-label="Dominio a evaluar"
                aria-invalid={!!error}
                placeholder={diagnostico.placeholder}
                className="min-w-0 flex-1 bg-transparent py-3.5 text-texto placeholder:text-niebla/50 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal to-cian px-6 py-3.5 font-display font-medium text-white transition-all duration-300 ease-marca hover:-translate-y-0.5 hover:shadow-[0_12px_34px_-8px_rgba(21,170,191,0.6)]"
            >
              {diagnostico.cta.replace(" →", "")} →
            </button>
          </form>
          {error && <p className="mt-3 text-sm text-menta">{error}</p>}
          <p className="mt-4 text-xs text-niebla/70">{diagnostico.nota}</p>
        </Reveal>
      </div>
    </section>
  );
}
