"use client";

import { hero } from "@/content";
import { useWhatsApp } from "./WhatsAppModal";
import { HeroPanel } from "./HeroPanel";
import { TechMarquee } from "./TechMarquee";
import { Button, ButtonLink } from "./ui/Button";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { Reveal } from "./ui/Reveal";
import { IconRayo } from "./ui/Icons";

export function Hero() {
  const { abrir } = useWhatsApp();
  return (
    <section id="top" className="relative overflow-hidden bg-abismo pt-28 sm:pt-32">
      {/* Resplandor de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 75% 20%, rgba(21,170,191,0.12), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 pb-12 lg:grid-cols-2 lg:gap-10 lg:pb-16">
          {/* Columna izquierda */}
          <div>
            <Reveal>
              <SectionEyebrow icon={<IconRayo />} tono="oscuro">
                {hero.eyebrow}
              </SectionEyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight text-texto sm:text-5xl lg:text-6xl">
                {hero.tituloAntes}{" "}
                <span className="texto-gradiente">{hero.tituloResaltado}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg text-niebla">{hero.parrafo}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variante="menta" onClick={abrir}>
                  {hero.ctaPrimario}
                </Button>
                <ButtonLink variante="contorno-oscuro" href="#servicios">
                  {hero.ctaSecundario}
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {hero.confianza.avatares.map((a) => (
                    <span
                      key={a}
                      className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-abismo bg-gradient-to-br from-teal to-cian font-display text-sm font-bold text-abismo"
                    >
                      {a}
                    </span>
                  ))}
                </div>
                <p className="max-w-xs text-sm text-niebla">{hero.confianza.texto}</p>
              </div>
            </Reveal>
          </div>

          {/* Columna derecha: panel simulado */}
          <Reveal delay={0.15}>
            <HeroPanel />
          </Reveal>
        </div>
      </div>

      <TechMarquee />
    </section>
  );
}
