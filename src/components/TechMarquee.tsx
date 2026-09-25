import { hero } from "@/content";
import { Marquee } from "./ui/Marquee";

/** Marquesina de tecnologías; se pausa al pasar el cursor. */
export function TechMarquee() {
  return (
    <div className="border-y border-white/10 py-5">
      <Marquee pausable>
        {hero.tecnologias.map((t) => (
          <span
            key={t}
            className="mx-6 font-mono text-sm tracking-wide text-niebla/80"
          >
            {t}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
