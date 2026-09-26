"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { diagnostico } from "@/content";
import { useWhatsApp } from "./WhatsAppModal";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { Glow, HexSolid } from "./ui/Decor";
import { IconEscudo, IconCerrar } from "./ui/Icons";

// Evento global para abrir el popup desde otros componentes (p. ej. el pie).
export const EVENTO_DIAGNOSTICO = "crubol:diagnostico";
const CLAVE_SESION = "crubol_diag_mostrado";
const DEMORA_MS = 30000; // aparece esporádicamente tras ~30s, una vez por sesión

function normalizarDominio(entrada: string): string | null {
  let v = entrada.trim().toLowerCase();
  v = v.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
  if (/^([a-z0-9](-?[a-z0-9])*\.)+[a-z]{2,}$/.test(v)) return v;
  return null;
}

export function DiagnosticoPopup() {
  const { abrir: abrirWhatsApp } = useWhatsApp();
  const reduce = useReducedMotion();
  const [abierto, setAbierto] = useState(false);
  const [valor, setValor] = useState("");
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const previoRef = useRef<HTMLElement | null>(null);

  const abrir = useCallback(() => {
    previoRef.current = document.activeElement as HTMLElement;
    setAbierto(true);
  }, []);
  const cerrar = useCallback(() => setAbierto(false), []);

  // Apertura esporádica (una vez por sesión) + apertura por evento (pie).
  useEffect(() => {
    let yaMostrado = false;
    try {
      yaMostrado = sessionStorage.getItem(CLAVE_SESION) === "1";
    } catch {
      /* sessionStorage puede no estar disponible */
    }
    const t = yaMostrado
      ? undefined
      : setTimeout(() => {
          try {
            sessionStorage.setItem(CLAVE_SESION, "1");
          } catch {
            /* ignorar */
          }
          abrir();
        }, DEMORA_MS);

    const onEvento = () => abrir();
    window.addEventListener(EVENTO_DIAGNOSTICO, onEvento);
    return () => {
      if (t) clearTimeout(t);
      window.removeEventListener(EVENTO_DIAGNOSTICO, onEvento);
    };
  }, [abrir]);

  // Scroll bloqueado, foco y Escape mientras está abierto.
  useEffect(() => {
    if (!abierto) {
      previoRef.current?.focus?.();
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>("input,button")?.focus();
    }, 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [abierto, cerrar]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const dominio = normalizarDominio(valor);
    if (!dominio) {
      setError(diagnostico.errorDominio);
      return;
    }
    setError("");
    cerrar();
    abrirWhatsApp(`Solicito un diagnóstico gratuito para el dominio: ${dominio}`);
  };

  const dur = reduce ? 0 : 0.25;

  return (
    <AnimatePresence>
      {abierto && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: dur }}
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={cerrar}
            className="absolute inset-0 bg-abismo/85 backdrop-blur-sm"
            tabIndex={-1}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="diag-titulo"
            initial={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.97 }}
            transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-profundo p-7 text-center shadow-2xl sm:p-9"
          >
            <Glow className="left-1/2 -top-10 h-56 w-56 -translate-x-1/2" color="rgba(21,170,191,0.25)" />
            <HexSolid className="right-[-6%] top-[-6%] h-24 w-24" />

            <button
              type="button"
              onClick={cerrar}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 rounded-lg p-1 text-niebla transition-colors hover:text-texto"
            >
              <IconCerrar className="h-5 w-5" />
            </button>

            <div className="relative">
              <div className="flex justify-center">
                <SectionEyebrow icon={<IconEscudo />} tono="oscuro">
                  {diagnostico.eyebrow}
                </SectionEyebrow>
              </div>
              <h2
                id="diag-titulo"
                className="mt-4 font-display text-3xl font-bold leading-tight text-texto sm:text-4xl"
              >
                {diagnostico.tituloAntes}{" "}
                <span className="texto-gradiente">{diagnostico.tituloResaltado}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-niebla">{diagnostico.parrafo}</p>

              <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-3">
                <div className="flex items-center rounded-xl border border-white/15 bg-abismo/60 px-4 focus-within:border-menta">
                  <span className="select-none pr-1 font-mono text-sm text-niebla/70">
                    https://
                  </span>
                  <input
                    value={valor}
                    onChange={(e) => {
                      setValor(e.target.value);
                      if (error) setError("");
                    }}
                    inputMode="url"
                    aria-label="Dominio a evaluar"
                    aria-invalid={!!error}
                    placeholder={diagnostico.placeholder}
                    className="min-w-0 flex-1 bg-transparent py-3.5 text-texto placeholder:text-niebla/50 focus:outline-none"
                  />
                </div>
                {error && <p className="text-sm text-menta">{error}</p>}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal to-cian py-3.5 font-display font-medium text-white transition-all duration-300 ease-marca hover:-translate-y-0.5 hover:shadow-[0_12px_34px_-8px_rgba(21,170,191,0.6)]"
                >
                  {diagnostico.cta.replace(" →", "")} →
                </button>
              </form>
              <p className="mt-4 text-xs text-niebla/70">{diagnostico.nota}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
