"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { servicios } from "@/content";
import { useWhatsApp } from "./WhatsAppModal";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { HexIcon } from "./ui/HexIcon";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { DotGrid, HexOutline } from "./ui/Decor";
import { ShapeDivider } from "./ui/ShapeDivider";
import {
  IconServidor,
  IconEscudo,
  IconRedNeuronal,
  IconDocumento,
  IconBrujula,
  IconFlecha,
  IconCheck,
  IconCerrar,
} from "./ui/Icons";

const iconos: ReactNode[] = [
  <IconServidor key="0" className="h-6 w-6" />,
  <IconEscudo key="1" className="h-6 w-6" />,
  <IconRedNeuronal key="2" className="h-6 w-6" />,
  <IconDocumento key="3" className="h-6 w-6" />,
];

type Servicio = (typeof servicios.items)[number];

export function Servicios() {
  const { abrir } = useWhatsApp();
  const [activo, setActivo] = useState<number | null>(null);

  return (
    <section
      id="servicios"
      className="relative overflow-hidden bg-niebla-clara py-20 pb-28 sm:py-28 sm:pb-36"
    >
      <DotGrid className="right-8 top-16 h-28 w-28 opacity-60" color="rgba(11,114,133,0.3)" />
      <HexOutline className="left-[3%] top-[45%] h-16 w-16 opacity-30" color="rgba(11,114,133,0.5)" />
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="max-w-2xl">
          <SectionEyebrow icon={<IconBrujula />} tono="claro">
            {servicios.eyebrow}
          </SectionEyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-tinta sm:text-4xl">
            {servicios.tituloAntes}{" "}
            <span className="text-teal">{servicios.tituloResaltado}</span>
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
          {servicios.items.map((s, i) => (
            <RevealItem key={s.numero}>
              <button
                type="button"
                onClick={() => setActivo(i)}
                aria-haspopup="dialog"
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-linea bg-papel p-7 text-left transition-all duration-300 ease-marca hover:-translate-y-2 hover:border-teal hover:shadow-xl"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rotate-45 bg-gradient-to-br from-teal/10 to-cian/10 transition-colors duration-300 group-hover:from-teal/20 group-hover:to-cian/20"
                />
                <div className="relative flex items-center justify-between">
                  <HexIcon tono="claro">{iconos[i]}</HexIcon>
                  <span className="font-display text-3xl font-bold text-linea">
                    {s.numero}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-tinta">
                  {s.titulo}
                </h3>
                <p className="mt-2 text-gris">{s.descripcion}</p>
                <ul className="mt-5 grid grid-cols-2 gap-2">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm text-tinta">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                      {it}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-2 self-start text-sm font-medium text-teal transition-all group-hover:gap-3">
                  {servicios.verDetalle.replace(" →", "")}
                  <IconFlecha className="h-4 w-4" />
                </span>
              </button>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
      <ShapeDivider fill="var(--color-abismo)" posicion="bottom" variante="angulo" />

      <ServicioModal
        servicio={activo !== null ? servicios.items[activo] : null}
        icono={activo !== null ? iconos[activo] : null}
        onCerrar={() => setActivo(null)}
        onSolicitar={() => {
          setActivo(null);
          abrir();
        }}
      />
    </section>
  );
}

function ServicioModal({
  servicio,
  icono,
  onCerrar,
  onSolicitar,
}: {
  servicio: Servicio | null;
  icono: ReactNode;
  onCerrar: () => void;
  onSolicitar: () => void;
}) {
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previoRef = useRef<HTMLElement | null>(null);
  const abierto = servicio !== null;

  const cerrar = useCallback(() => onCerrar(), [onCerrar]);

  useEffect(() => {
    if (!abierto) {
      previoRef.current?.focus?.();
      return;
    }
    previoRef.current = document.activeElement as HTMLElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
    }, 0);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [abierto]);

  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cerrar();
        return;
      }
      if (e.key !== "Tab") return;
      const foco = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])',
      );
      if (!foco || foco.length === 0) return;
      const primero = foco[0];
      const ultimo = foco[foco.length - 1];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [abierto, cerrar]);

  const dur = reduce ? 0 : 0.25;

  return (
    <AnimatePresence>
      {servicio && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: dur }}
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={cerrar}
            className="absolute inset-0 bg-abismo/80 backdrop-blur-sm"
            tabIndex={-1}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="serv-titulo"
            initial={{ opacity: 0, y: reduce ? 0 : 20, scale: reduce ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 20, scale: reduce ? 1 : 0.98 }}
            transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-linea bg-papel p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={cerrar}
              aria-label="Cerrar"
              className="absolute right-4 top-4 rounded-lg p-1 text-gris transition-colors hover:text-tinta"
            >
              <IconCerrar className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-4">
              <HexIcon tono="claro">{icono}</HexIcon>
              <h2 id="serv-titulo" className="font-display text-2xl font-bold text-tinta">
                {servicio.titulo}
              </h2>
            </div>
            <p className="mt-4 text-gris">{servicio.intro}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {servicio.detalles.map((d) => (
                <div key={d.titulo} className="rounded-2xl border border-linea bg-niebla-clara p-4">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="font-display text-sm font-bold text-tinta">{d.titulo}</p>
                      <p className="mt-1 text-sm text-gris">{d.descripcion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-teal/5 p-4">
              <p className="font-mono text-xs uppercase tracking-wider text-teal">
                {servicios.idealLabel}
              </p>
              <p className="mt-1 text-sm text-tinta">{servicio.idealPara}</p>
            </div>

            <button
              type="button"
              onClick={onSolicitar}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal py-3.5 font-display font-medium text-white transition-all duration-300 ease-marca hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_rgba(11,114,133,0.5)]"
            >
              {servicios.cta.replace(" →", "")}
              <IconFlecha className="h-4 w-4" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
