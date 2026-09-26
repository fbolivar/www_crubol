"use client";

import { nosotros } from "@/content";
import { useWhatsApp } from "./WhatsAppModal";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { DuotoneImage } from "./ui/DuotoneImage";
import { HexOutline, DotGrid } from "./ui/Decor";
import { IconEscudo, IconCheck, IconWhatsApp } from "./ui/Icons";

export function Nosotros() {
  const { abrir } = useWhatsApp();
  return (
    <section id="nosotros" className="relative overflow-hidden bg-papel py-20 sm:py-28">
      <DotGrid className="left-6 top-10 h-28 w-28 opacity-60" color="rgba(11,114,133,0.35)" />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 lg:grid-cols-2 lg:gap-16">
        {/* Izquierda: fotos superpuestas + sello + tarjeta de dato */}
        <Reveal className="relative">
          <div className="relative">
            {/* Foto principal */}
            <DuotoneImage
              src="/fotos/soporte.jpg"
              alt="Atención directa de los socios de Crubol"
              className="aspect-[4/3] rounded-3xl border border-linea shadow-xl"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            {/* Foto secundaria superpuesta */}
            <div className="absolute -bottom-10 -right-4 w-1/2 sm:-right-8">
              <DuotoneImage
                src="/fotos/consultoria.jpg"
                alt="Equipo de Crubol en sesión de diagnóstico"
                className="aspect-square rounded-2xl border-4 border-papel shadow-2xl"
                sizes="(max-width: 1024px) 50vw, 22vw"
              />
            </div>
            {/* Sello flotante */}
            <div className="absolute -left-3 -top-5 rounded-2xl bg-teal px-5 py-3 text-white shadow-lg">
              <span className="block font-display text-2xl font-bold leading-none">+25</span>
              <span className="text-[11px] leading-tight">años de experiencia combinada</span>
            </div>
            <HexOutline className="-right-6 top-6 h-16 w-16" color="rgba(11,114,133,0.5)" />
          </div>

          {/* Tarjeta de dato societario */}
          <div className="mt-16 flex items-center gap-4 rounded-2xl border border-linea bg-niebla-clara p-6">
            <span className="inline-flex shrink-0 text-teal">
              <IconEscudo className="h-8 w-8" />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-tinta">
                {nosotros.tarjeta.titulo}
              </p>
            </div>
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
              <Button variante="teal" onClick={() => abrir()}>
                {nosotros.cta}
              </Button>
              <button
                type="button"
                onClick={() => abrir()}
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
