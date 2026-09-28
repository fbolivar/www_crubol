"use client";

import { useC } from "@/i18n";
import { useWhatsApp } from "./WhatsAppModal";
import { HeroArt } from "./HeroArt";
import { TechMarquee } from "./TechMarquee";
import { Button, ButtonLink } from "./ui/Button";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { Reveal } from "./ui/Reveal";
import { HexOutline, HexSolid, DotGrid, Glow } from "./ui/Decor";
import { ShapeDivider } from "./ui/ShapeDivider";
import { IconRayo } from "./ui/Icons";

export function Hero() {
  const { hero } = useC();
  const { abrir } = useWhatsApp();
  return (
    <section id="top" className="relative overflow-hidden bg-abismo pt-28 pb-0 sm:pt-32">
      {/* Resplandor de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 75% 20%, rgba(21,170,191,0.12), transparent 70%)",
        }}
      />
      {/* Decoraciones geométricas de marca */}
      <Glow className="-left-20 top-10 h-72 w-72" color="rgba(11,114,133,0.22)" />
      <HexOutline className="left-[4%] top-[36%] h-20 w-20 opacity-40" />
      <HexSolid className="right-[6%] top-[62%] h-24 w-24" />
      <DotGrid className="bottom-40 left-[42%] h-24 w-24 opacity-30" />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 pb-12 lg:grid-cols-2 lg:gap-10 lg:pb-16">
          {/* Columna izquierda */}
          <div>
            <Reveal prioritario>
              <SectionEyebrow icon={<IconRayo />} tono="oscuro">
                {hero.eyebrow}
              </SectionEyebrow>
            </Reveal>
            <Reveal prioritario>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight text-texto sm:text-5xl lg:text-6xl">
                {hero.tituloAntes}{" "}
                <span className="texto-gradiente">{hero.tituloResaltado}</span>
              </h1>
            </Reveal>
            <Reveal prioritario>
              <p className="mt-6 max-w-xl text-lg text-niebla">{hero.parrafo}</p>
            </Reveal>
            <Reveal prioritario>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variante="menta" onClick={() => abrir()}>
                  {hero.ctaPrimario}
                </Button>
                <ButtonLink variante="contorno-oscuro" href="#servicios">
                  {hero.ctaSecundario}
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Columna derecha: pieza central de marca con chips flotantes */}
          <Reveal delay={0.15}>
            <HeroArt />
          </Reveal>
        </div>
      </div>

      <TechMarquee />
      <div className="relative h-[60px] sm:h-[90px]">
        <ShapeDivider fill="var(--color-papel)" posicion="bottom" variante="curva" />
      </div>
    </section>
  );
}
