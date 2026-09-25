"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { whatsappForm } from "@/content";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import { indicativos } from "@/lib/indicativos";
import { IconCerrar, IconWhatsApp } from "./ui/Icons";

type Ctx = { abrir: () => void };
const WhatsAppCtx = createContext<Ctx | null>(null);

/** Hook para abrir el widget de WhatsApp desde cualquier componente. */
export function useWhatsApp() {
  const ctx = useContext(WhatsAppCtx);
  if (!ctx) throw new Error("useWhatsApp debe usarse dentro de WhatsAppProvider");
  return ctx;
}

const inputBase =
  "w-full rounded-xl border border-white/10 bg-abismo/60 px-4 py-3 text-sm text-texto " +
  "placeholder:text-niebla/60 focus:border-menta focus:outline-none " +
  "focus-visible:outline-2 focus-visible:outline-cian";

type Errores = Partial<Record<"nombre" | "correo" | "telefono", string>>;

export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const [abierto, setAbierto] = useState(false);
  const [errores, setErrores] = useState<Errores>({});
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previoRef = useRef<HTMLElement | null>(null);

  const abrir = useCallback(() => {
    previoRef.current = document.activeElement as HTMLElement;
    setAbierto(true);
  }, []);
  const cerrar = useCallback(() => setAbierto(false), []);

  // Bloquea el scroll del fondo y devuelve el foco al cerrar.
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
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [abierto]);

  // Escape para cerrar y foco atrapado dentro del diálogo.
  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cerrar();
        return;
      }
      if (e.key !== "Tab") return;
      const foco = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])',
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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = {
      nombre: String(fd.get("nombre") ?? "").trim(),
      correo: String(fd.get("correo") ?? "").trim(),
      indicativo: String(fd.get("indicativo") ?? "+57").trim(),
      telefono: String(fd.get("telefono") ?? "").trim(),
      area: String(fd.get("area") ?? "").trim(),
    };
    const err: Errores = {};
    if (!v.nombre) err.nombre = "Indíquenos su nombre.";
    if (!v.correo) err.correo = "Indíquenos su correo.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.correo))
      err.correo = "Revise el formato del correo.";
    if (!v.telefono) err.telefono = "Indíquenos su WhatsApp.";
    setErrores(err);
    if (Object.keys(err).length > 0) {
      const primero = Object.keys(err)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${primero}"]`)?.focus();
      return;
    }

    const mensaje = [
      `Hola, soy ${v.nombre}.`,
      `Correo: ${v.correo}`,
      `WhatsApp: ${v.indicativo} ${v.telefono}`,
      v.area && `Área de interés: ${v.area}`,
      "",
      "Escribo desde crubol.com.co y quiero que me contacten.",
    ]
      .filter(Boolean)
      .join("\n");

    // Se elige una línea al azar dentro de enlaceWhatsApp().
    window.open(enlaceWhatsApp(mensaje), "_blank", "noopener,noreferrer");
    cerrar();
  };

  const dur = reduce ? 0 : 0.25;

  return (
    <WhatsAppCtx.Provider value={{ abrir }}>
      {children}

      {/* Botón flotante de WhatsApp (a la izquierda del asistente) */}
      <button
        type="button"
        onClick={abrir}
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-5 right-[5.5rem] z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)] transition-transform duration-300 ease-marca hover:-translate-y-1"
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366]/40 animate-halo" aria-hidden />
        <IconWhatsApp className="relative h-7 w-7" />
      </button>

      <AnimatePresence>
        {abierto && (
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
              aria-labelledby="wa-titulo"
              initial={{ opacity: 0, y: reduce ? 0 : 20, scale: reduce ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduce ? 0 : 20, scale: reduce ? 1 : 0.98 }}
              transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-profundo shadow-2xl"
            >
              {/* Encabezado tipo chat */}
              <div className="flex items-center gap-3 bg-gradient-to-r from-teal to-cian px-5 py-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                  <IconWhatsApp className="h-6 w-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 id="wa-titulo" className="font-display font-bold text-white">
                    {whatsappForm.titulo}
                  </h2>
                  <span className="flex items-center gap-1.5 text-xs text-white/90">
                    <span className="h-2 w-2 rounded-full bg-menta" />
                    {whatsappForm.estado}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={cerrar}
                  aria-label="Cerrar"
                  className="rounded-lg p-1 text-white/80 transition-colors hover:text-white"
                >
                  <IconCerrar className="h-5 w-5" />
                </button>
              </div>

              {/* Cuerpo */}
              <div className="p-5">
                {/* Burbuja de saludo */}
                <p className="mb-4 rounded-2xl rounded-tl-sm bg-abismo/60 p-3 text-sm text-texto">
                  {whatsappForm.saludo}
                </p>

                <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
                  <div>
                    <input
                      name="nombre"
                      aria-label={whatsappForm.campos.nombre}
                      aria-invalid={!!errores.nombre}
                      placeholder={`${whatsappForm.campos.nombre} *`}
                      className={inputBase}
                    />
                    {errores.nombre && (
                      <p className="mt-1 text-xs text-red-400">{errores.nombre}</p>
                    )}
                  </div>

                  <div>
                    <input
                      name="correo"
                      type="email"
                      aria-label={whatsappForm.campos.correo}
                      aria-invalid={!!errores.correo}
                      placeholder={`${whatsappForm.campos.correo} *`}
                      className={inputBase}
                    />
                    {errores.correo && (
                      <p className="mt-1 text-xs text-red-400">{errores.correo}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex gap-2">
                      <select
                        name="indicativo"
                        defaultValue="+57"
                        aria-label="Indicativo de país"
                        className="w-[42%] shrink-0 rounded-xl border border-white/10 bg-abismo/60 px-2 py-3 text-sm text-texto focus:border-menta focus:outline-none focus-visible:outline-2 focus-visible:outline-cian"
                      >
                        {indicativos.map((p) => (
                          <option key={`${p.pais}${p.code}`} value={p.code}>
                            {p.pais} {p.code}
                          </option>
                        ))}
                      </select>
                      <input
                        name="telefono"
                        type="tel"
                        inputMode="numeric"
                        aria-label={whatsappForm.campos.telefono}
                        aria-invalid={!!errores.telefono}
                        placeholder={`${whatsappForm.campos.telefono} *`}
                        className={`${inputBase} min-w-0 flex-1`}
                      />
                    </div>
                    {errores.telefono && (
                      <p className="mt-1 text-xs text-red-400">{errores.telefono}</p>
                    )}
                  </div>

                  <select
                    name="area"
                    defaultValue=""
                    aria-label={whatsappForm.campos.area}
                    className={`${inputBase} appearance-none`}
                  >
                    <option value="">{whatsappForm.placeholderArea}</option>
                    {whatsappForm.opciones.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>

                  <button
                    type="submit"
                    className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal to-cian py-3 font-display font-medium text-white transition-all duration-300 ease-marca hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(21,170,191,0.6)]"
                  >
                    <IconWhatsApp className="h-5 w-5" />
                    {whatsappForm.enviar}
                  </button>

                  <p className="text-center text-xs text-niebla">
                    {whatsappForm.legalAntes}{" "}
                    <Link
                      href="/politica-privacidad"
                      className="text-menta underline-offset-2 hover:underline"
                      onClick={cerrar}
                    >
                      {whatsappForm.legalLink}
                    </Link>
                    .
                  </p>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </WhatsAppCtx.Provider>
  );
}
