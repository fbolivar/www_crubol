"use client";

import type { ReactNode } from "react";
import { servicios } from "@/content";
import { useWhatsApp } from "./WhatsAppModal";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { HexIcon } from "./ui/HexIcon";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { DotGrid, HexOutline } from "./ui/Decor";
import { ShapeDivider } from "./ui/ShapeDivider";
import {
  IconServidor,
  IconEscudo,
  IconChip,
  IconDocumento,
  IconBrujula,
  IconFlecha,
} from "./ui/Icons";

const iconos: ReactNode[] = [
  <IconServidor key="0" className="h-6 w-6" />,
  <IconEscudo key="1" className="h-6 w-6" />,
  <IconChip key="2" className="h-6 w-6" />,
  <IconDocumento key="3" className="h-6 w-6" />,
];

export function Servicios() {
  const { abrir } = useWhatsApp();
  return (
    <section
      id="servicios"
      className="relative overflow-hidden bg-niebla-clara py-20 pb-28 sm:py-28 sm:pb-36"
    >
      <DotGrid className="right-8 top-16 h-28 w-28 opacity-60" color="rgba(11,114,133,0.3)" />
      <HexOutline className="left-[3%] top-[45%] h-16 w-16 opacity-30" color="rgba(11,114,133,0.5)" />
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="max-w-2xl">
          <SectionEyebrow icon={<IconBrujula />} tono="claro">
            {servicios.eyebrow}
          </SectionEyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-tinta sm:text-4xl">
            {servicios.tituloAntes}{" "}
            <span className="text-teal">{servicios.tituloResaltado}</span>
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
          {servicios.items.map((s, i) => (
            <RevealItem key={s.numero}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-linea bg-papel p-7 transition-all duration-300 ease-marca hover:-translate-y-2 hover:border-teal">
                {/* Acento angulado en la esquina */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rotate-45 bg-gradient-to-br from-teal/10 to-cian/10 transition-colors duration-300 group-hover:from-teal/20 group-hover:to-cian/20"
                />
                <div className="relative flex items-center justify-between">
                  <HexIcon tono="claro">{iconos[i]}</HexIcon>
                  <span className="font-display text-3xl font-bold text-linea">
                    {s.numero}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-tinta">
                  {s.titulo}
                </h3>
                <p className="mt-2 text-gris">{s.descripcion}</p>
                <ul className="mt-5 grid grid-cols-2 gap-2">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-center gap-2 text-sm text-tinta"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                      {it}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={abrir}
                  className="mt-6 inline-flex items-center gap-2 self-start text-sm font-medium text-teal transition-all group-hover:gap-3"
                >
                  {servicios.cta.replace(" →", "")}
                  <IconFlecha className="h-4 w-4" />
                </button>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
      <ShapeDivider fill="var(--color-abismo)" posicion="bottom" variante="angulo" />
    </section>
  );
}
