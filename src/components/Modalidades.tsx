"use client";

import { useState } from "react";
import { useC } from "@/i18n";
import { useWhatsApp } from "./WhatsAppModal";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { Reveal } from "./ui/Reveal";
import { IconBrujula, IconCheck } from "./ui/Icons";

export function Modalidades() {
  const { modalidades } = useC();
  const { abrir } = useWhatsApp();
  const [pestana, setPestana] = useState<string>(modalidades.pestanas[0].id);
  const visibles = modalidades.items.filter((m) => m.tipo === pestana);

  return (
    <section id="modalidades" className="bg-papel py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <SectionEyebrow icon={<IconBrujula />} tono="claro">
              {modalidades.eyebrow}
            </SectionEyebrow>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-tinta sm:text-4xl">
            {modalidades.tituloAntes}{" "}
            <span className="text-teal">{modalidades.tituloResaltado}</span>
          </h2>
        </Reveal>

        {/* Pestañas */}
        <div className="mt-8 flex justify-center">
          <div
            role="tablist"
            aria-label="Modalidades"
            className="inline-flex rounded-full border border-linea bg-niebla-clara p-1"
          >
            {modalidades.pestanas.map((t) => {
              const activa = t.id === pestana;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={activa}
                  onClick={() => setPestana(t.id)}
                  className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                    activa ? "bg-teal text-white" : "text-gris hover:text-tinta"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibles.map((m) => (
            <article
              key={m.titulo}
              className={`group relative flex flex-col rounded-3xl p-7 transition-all duration-300 ease-marca hover:-translate-y-2 ${
                m.destacado
                  ? "border-2 border-teal bg-tinta text-texto shadow-xl"
                  : "border border-linea bg-papel"
              }`}
            >
              {m.destacado && "cinta" in m && (
                <span className="absolute -top-3 right-6 rounded-full bg-menta px-4 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-abismo">
                  {m.cinta}
                </span>
              )}
              <h3
                className={`font-display text-xl font-bold ${m.destacado ? "text-white" : "text-tinta"}`}
              >
                {m.titulo}
              </h3>
              <p
                className={`mt-1 font-mono text-xs uppercase tracking-wider ${m.destacado ? "text-menta" : "text-teal"}`}
              >
                {m.formato}
              </p>
              <p className={`mt-4 ${m.destacado ? "text-niebla" : "text-gris"}`}>
                {m.descripcion}
              </p>
              <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                {m.incluye.map((it) => (
                  <li
                    key={it}
                    className={`flex items-start gap-2 text-sm ${m.destacado ? "text-texto" : "text-tinta"}`}
                  >
                    <IconCheck
                      className={`mt-0.5 h-4 w-4 shrink-0 ${m.destacado ? "text-menta" : "text-teal"}`}
                    />
                    {it}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => abrir()}
                className={`mt-6 rounded-xl py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5 ${
                  m.destacado
                    ? "bg-menta text-abismo"
                    : "border border-teal text-teal hover:bg-teal hover:text-white"
                }`}
              >
                Hablemos de esta opción
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
