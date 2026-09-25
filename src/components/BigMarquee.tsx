import Image from "next/image";
import { marquesinaGrande } from "@/content";
import { Marquee } from "./ui/Marquee";

/** Marquesina grande: texto en contorno menta, sin relleno, sobre textura de código. */
export function BigMarquee() {
  return (
    <section aria-hidden className="relative overflow-hidden bg-abismo py-12">
      {/* Textura de código de fondo (duotono muy tenue) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div className="duotono h-full w-full">
          <Image src="/fotos/codigo.jpg" alt="" fill sizes="100vw" className="object-cover" />
        </div>
      </div>
      <div className="relative">
        <Marquee velocidad="lento">
          {marquesinaGrande.map((t) => (
            <span
              key={t}
              className="texto-contorno mx-8 font-display text-4xl font-bold uppercase sm:text-6xl"
            >
              {t}
              <span className="mx-8 text-menta">·</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
