"use client";

import type { ReactNode } from "react";
import { servicios } from "@/content";
import { useWhatsApp } from "./WhatsAppModal";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { HexIcon } from "./ui/HexIcon";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
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
    <section id="servicios" className="bg-niebla-clara py-20 sm:py-28">
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
              <article className="group flex h-full flex-col rounded-3xl border border-linea bg-papel p-7 transition-all duration-300 ease-marca hover:-translate-y-2 hover:border-teal">
                <div className="flex items-center justify-between">
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
    </section>
  );
}
