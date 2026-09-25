import { porque } from "@/content";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { ProgressBar } from "./ui/ProgressBar";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { IconEscudo } from "./ui/Icons";

export function PorQue() {
  return (
    <section id="por-que" className="bg-abismo py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 lg:grid-cols-2 lg:gap-16">
        {/* Izquierda: compromisos + tarjeta de socio */}
        <div>
          <Reveal>
            <SectionEyebrow icon={<IconEscudo />} tono="oscuro">
              {porque.eyebrow}
            </SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-texto sm:text-4xl">
              {porque.tituloAntes}{" "}
              <span className="texto-gradiente">{porque.tituloResaltado}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 flex flex-col gap-5">
            {porque.compromisos.map((c) => (
              <ProgressBar key={c.label} valor={c.valor} label={c.label} />
            ))}
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-profundo/60 p-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal to-cian font-display text-lg font-bold text-abismo">
                {porque.socio.iniciales}
              </span>
              <div>
                <div className="font-display font-medium text-texto">
                  {porque.socio.nombre}
                </div>
                <div className="text-sm text-niebla">{porque.socio.rol}</div>
                <div className="mt-1 font-mono text-xs text-menta">
                  {porque.socio.credencial}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Derecha: filas numeradas */}
        <RevealGroup className="flex flex-col gap-3">
          {porque.filas.map((f) => (
            <RevealItem key={f.numero}>
              <div className="flex gap-5 rounded-2xl border border-white/10 bg-profundo/40 p-6 transition-colors duration-300 hover:border-menta/40">
                <span className="font-display text-2xl font-bold text-menta">
                  {f.numero}
                </span>
                <div>
                  <h3 className="font-display text-lg font-medium text-texto">
                    {f.titulo}
                  </h3>
                  <p className="mt-1 text-niebla">{f.descripcion}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
