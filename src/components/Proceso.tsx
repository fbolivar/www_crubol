import { proceso } from "@/content";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { IconBrujula } from "./ui/Icons";

export function Proceso() {
  return (
    <section id="proceso" className="bg-abismo py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
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

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {proceso.pasos.map((p) => (
            <RevealItem key={p.numero}>
              <div className="flex h-full flex-col items-center rounded-2xl border border-white/10 bg-profundo/40 p-7 text-center transition-all duration-300 ease-marca hover:-translate-y-2 hover:border-menta/40">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-menta/40 font-display text-xl font-bold text-menta">
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
    </section>
  );
}
