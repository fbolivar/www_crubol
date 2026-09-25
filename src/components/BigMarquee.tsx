import { marquesinaGrande } from "@/content";
import { Marquee } from "./ui/Marquee";

/** Marquesina grande: texto en contorno menta, sin relleno. */
export function BigMarquee() {
  return (
    <section aria-hidden className="bg-abismo py-12">
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
    </section>
  );
}
