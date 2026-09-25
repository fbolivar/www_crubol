import Image from "next/image";
import { proceso } from "@/content";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { HexOutline, HexSolid } from "./ui/Decor";
import { IconBrujula } from "./ui/Icons";

export function Proceso() {
  return (
    <section id="proceso" className="relative overflow-hidden bg-abismo py-20 sm:py-28">
      {/* Foto del data center como textura de fondo (duotono tenue) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.10]">
        <div className="duotono h-full w-full">
          <Image
            src="/fotos/datacenter.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
      <HexSolid className="right-[8%] top-16 h-24 w-24" />
      <HexOutline className="left-[6%] bottom-16 h-16 w-16 opacity-40" />

      <div className="relative mx-auto max-w-6xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <SectionEyebrow icon={<IconBrujula />} tono="oscuro">
              {proceso.eyebrow}
            </SectionEyebrow>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-texto sm:text-4xl">
            {proceso.tituloAntes}{" "}
            <span className="texto-gradiente">{proceso.tituloResaltado}</span>
          </h2>
        </Reveal>

        <div className="relative mt-14">
          {/* Línea conectora (solo en escritorio) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden border-t border-dashed border-menta/30 lg:block"
          />
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {proceso.pasos.map((p) => (
              <RevealItem key={p.numero}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-white/10 bg-profundo/60 p-7 text-center backdrop-blur-sm transition-all duration-300 ease-marca hover:-translate-y-2 hover:border-menta/40">
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-menta/40 bg-abismo font-display text-xl font-bold text-menta">
                    {p.numero}
                  </span>
                  <span className="mt-4 font-mono text-xs uppercase tracking-widest text-cian">
                    {p.dia}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-medium text-texto">
                    {p.titulo}
                  </h3>
                  <p className="mt-2 text-sm text-niebla">{p.descripcion}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
