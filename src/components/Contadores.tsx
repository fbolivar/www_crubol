"use client";

import { useC } from "@/i18n";
import { Counter } from "./ui/Counter";
import { RevealGroup, RevealItem } from "./ui/Reveal";

export function Contadores() {
  const { contadores } = useC();
  return (
    <section className="bg-abismo py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <RevealGroup className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {contadores.map((c, i) => (
            <RevealItem
              key={c.label}
              className={`px-4 text-center lg:px-6 ${
                i > 0 ? "lg:border-l lg:border-white/10" : ""
              } ${i % 2 === 1 ? "border-l border-white/10 lg:border-l" : ""}`}
            >
              <div className="font-display text-4xl font-bold text-menta sm:text-5xl">
                <Counter valor={c.valor} prefijo={c.prefijo} sufijo={c.sufijo} />
              </div>
              <div className="mt-2 text-sm text-niebla">{c.label}</div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
