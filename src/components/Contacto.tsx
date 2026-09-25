"use client";

import { contacto, empresa } from "@/content";
import { useWhatsApp } from "./WhatsAppModal";
import { ContactForm } from "./ContactForm";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { Reveal } from "./ui/Reveal";
import { IconArroba, IconMapa, IconWhatsApp } from "./ui/Icons";

const iconos = {
  email: <IconArroba className="h-5 w-5" />,
  texto: <IconMapa className="h-5 w-5" />,
  whatsapp: <IconWhatsApp className="h-5 w-5" />,
};

export function Contacto() {
  const { abrir } = useWhatsApp();
  return (
    <section id="contacto" className="bg-abismo py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <SectionEyebrow icon={<IconArroba />} tono="oscuro">
              {contacto.eyebrow}
            </SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-texto sm:text-4xl">
              {contacto.tituloAntes}{" "}
              <span className="texto-gradiente">{contacto.tituloResaltado}</span>
            </h2>
            <p className="mt-5 text-lg text-niebla">{contacto.parrafo}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 flex flex-col gap-3">
            {contacto.datos.map((d) => {
              const contenido = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-menta/10 text-menta">
                    {iconos[d.tipo]}
                  </span>
                  <span>
                    <span className="block text-sm text-niebla">{d.label}</span>
                    <span className="font-medium text-texto">{d.valor}</span>
                  </span>
                </>
              );
              const clase =
                "flex items-center gap-4 rounded-2xl border border-white/10 bg-profundo/40 p-4 text-left transition-colors hover:border-menta/40";
              if (d.tipo === "email")
                return (
                  <a key={d.label} href={`mailto:${empresa.correo}`} className={clase}>
                    {contenido}
                  </a>
                );
              if (d.tipo === "whatsapp")
                return (
                  <button key={d.label} type="button" onClick={abrir} className={clase}>
                    {contenido}
                  </button>
                );
              return (
                <div key={d.label} className={clase}>
                  {contenido}
                </div>
              );
            })}
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
