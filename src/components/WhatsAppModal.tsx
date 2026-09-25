"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { whatsapp } from "@/content";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import { IconCerrar, IconWhatsApp } from "./ui/Icons";

type Ctx = { abrir: () => void };
const WhatsAppCtx = createContext<Ctx | null>(null);

/** Hook para abrir el selector de WhatsApp desde cualquier componente. */
export function useWhatsApp() {
  const ctx = useContext(WhatsAppCtx);
  if (!ctx) throw new Error("useWhatsApp debe usarse dentro de WhatsAppProvider");
  return ctx;
}

const canales = [whatsapp.comercial, whatsapp.soporte] as const;
const claves = ["comercial", "soporte"] as const;

export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const [abierto, setAbierto] = useState(false);
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previoRef = useRef<HTMLElement | null>(null);

  const abrir = useCallback(() => {
    previoRef.current = document.activeElement as HTMLElement;
    setAbierto(true);
  }, []);
  const cerrar = useCallback(() => setAbierto(false), []);

  // Bloquea el scroll del fondo y restaura el foco al cerrar.
  useEffect(() => {
    if (!abierto) {
      previoRef.current?.focus?.();
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Enfoca el primer control del diálogo.
    const t = setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    }, 0);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [abierto]);

  // Escape para cerrar y foco atrapado (Tab cíclico) dentro del diálogo.
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
    <WhatsAppCtx.Provider value={{ abrir }}>
      {children}
      <AnimatePresence>
        {abierto && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur }}
          >
            {/* Fondo: clic fuera cierra */}
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
              aria-labelledby="wa-titulo"
              aria-describedby="wa-desc"
              initial={{ opacity: 0, y: reduce ? 0 : 16, scale: reduce ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduce ? 0 : 16, scale: reduce ? 1 : 0.98 }}
              transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md rounded-2xl border border-white/10 bg-profundo p-6 shadow-2xl sm:p-7"
            >
              <div className="mb-1 flex items-start justify-between gap-4">
                <div className="flex items-center gap-2 text-menta">
                  <IconWhatsApp className="h-5 w-5" />
                  <h2 id="wa-titulo" className="font-display text-lg font-medium text-texto">
                    ¿Con quién quiere hablar?
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={cerrar}
                  aria-label="Cancelar"
                  className="rounded-lg p-1 text-niebla transition-colors hover:text-texto"
                >
                  <IconCerrar className="h-5 w-5" />
                </button>
              </div>
              <p id="wa-desc" className="mb-5 text-sm text-niebla">
                Elija el área y le abrimos WhatsApp con el mensaje listo.
              </p>

              <div className="flex flex-col gap-3">
                {canales.map((c, i) => (
                  <a
                    key={c.area}
                    href={enlaceWhatsApp(claves[i])}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={cerrar}
                    className="group flex items-center gap-4 rounded-xl border border-white/10 bg-abismo/40 p-4 transition-all duration-300 ease-marca hover:-translate-y-1 hover:border-menta"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-menta/15 text-menta">
                      <IconWhatsApp className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display font-medium text-texto">
                        {c.area}
                      </span>
                      <span className="block text-sm text-niebla">
                        {c.responsable} · {c.descripcion}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              <button
                type="button"
                onClick={cerrar}
                className="mt-5 w-full rounded-xl border border-white/10 py-2.5 text-sm text-niebla transition-colors hover:text-texto"
              >
                Cancelar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </WhatsAppCtx.Provider>
  );
}
