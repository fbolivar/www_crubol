"use client";

import { nosotros } from "@/content";
import { useWhatsApp } from "./WhatsAppModal";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { IconEscudo, IconCheck, IconWhatsApp } from "./ui/Icons";

export function Nosotros() {
  const { abrir } = useWhatsApp();
  return (
    <section id="nosotros" className="bg-papel py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16">
        {/* Izquierda: tarjeta + sello flotante */}
        <Reveal className="relative">
          <div className="relative rounded-3xl border border-linea bg-niebla-clara p-8 sm:p-10">
            <span className="inline-flex text-teal">
              <IconEscudo className="h-10 w-10" />
            </span>
            <p className="mt-6 font-display text-2xl font-bold text-tinta sm:text-3xl">
              {nosotros.tarjeta.titulo}
            </p>
            <p className="mt-4 font-mono text-sm leading-relaxed text-gris">
              {nosotros.tarjeta.dato}
            </p>
          </div>
          {/* Sello flotante */}
          <div className="absolute -right-3 -top-5 rounded-2xl bg-teal px-5 py-3 text-white shadow-lg sm:right-6">
            <span className="block font-display text-xl font-bold leading-none">+25</span>
            <span className="text-[11px] leading-tight">años de experiencia combinada</span>
          </div>
        </Reveal>

        {/* Derecha */}
        <div>
          <Reveal>
            <SectionEyebrow icon={<IconEscudo />} tono="claro">
              {nosotros.eyebrow}
            </SectionEyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-tinta sm:text-4xl">
              {nosotros.tituloAntes}{" "}
              <span className="text-teal">{nosotros.tituloResaltado}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-gris">{nosotros.apertura}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-6 flex flex-col gap-3">
              {nosotros.puntos.map((p) => (
                <li key={p} className="flex items-start gap-3 text-tinta">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                    <IconCheck className="h-4 w-4" />
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button variante="teal" onClick={abrir}>
                {nosotros.cta}
              </Button>
              <button
                type="button"
                onClick={abrir}
                className="inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-tinta"
              >
                <IconWhatsApp className="h-5 w-5" />
                Escríbanos por WhatsApp
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
