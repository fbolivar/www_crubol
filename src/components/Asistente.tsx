"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { asistente } from "@/content";
import { useWhatsApp } from "./WhatsAppModal";
import { IconCerrar, IconWhatsApp, IconFlecha } from "./ui/Icons";

type Mensaje = { role: "user" | "assistant"; content: string };

export function Asistente() {
  const { abrir } = useWhatsApp();
  const reduce = useReducedMotion();
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { role: "assistant", content: asistente.saludo },
  ]);
  const [cargando, setCargando] = useState(false);
  const [texto, setTexto] = useState("");
  const finRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll al último mensaje.
  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }, [mensajes, cargando, reduce]);

  useEffect(() => {
    if (abierto) setTimeout(() => inputRef.current?.focus(), 50);
  }, [abierto]);

  async function enviar(pregunta: string) {
    const q = pregunta.trim();
    if (!q || cargando) return;
    const historial: Mensaje[] = [...mensajes, { role: "user", content: q }];
    setMensajes(historial);
    setTexto("");
    setCargando(true);
    try {
      const r = await fetch("/api/asistente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Se envían solo los turnos de conversación (sin el saludo inicial).
        body: JSON.stringify({ messages: historial.slice(1) }),
      });
      const data = await r.json();
      const reply =
        r.ok && data.reply ? String(data.reply) : String(data.error || asistente.error);
      setMensajes((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMensajes((m) => [...m, { role: "assistant", content: asistente.error }]);
    } finally {
      setCargando(false);
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    enviar(texto);
  };

  const dur = reduce ? 0 : 0.25;

  return (
    <>
      {/* Botón flotante */}
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-label={abierto ? "Cerrar asistente" : "Abrir asistente"}
        aria-expanded={abierto}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-teal to-cian text-white shadow-[0_10px_30px_-6px_rgba(21,170,191,0.6)] transition-transform duration-300 ease-marca hover:-translate-y-1"
      >
        {!abierto && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-menta/40 animate-halo" aria-hidden />
        )}
        <span className="relative">
          {abierto ? <IconCerrar className="h-6 w-6" /> : <ChatIcon />}
        </span>
      </button>

      <AnimatePresence>
        {abierto && (
          <motion.div
            role="dialog"
            aria-label={asistente.titulo}
            initial={{ opacity: 0, y: reduce ? 0 : 20, scale: reduce ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 20, scale: reduce ? 1 : 0.98 }}
            transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 z-40 flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-white/10 bg-profundo shadow-2xl"
          >
            {/* Encabezado */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-teal to-cian px-4 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                <ChatIcon />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display font-bold text-white">{asistente.titulo}</p>
                <span className="flex items-center gap-1.5 text-xs text-white/90">
                  <span className="h-2 w-2 rounded-full bg-menta" />
                  {asistente.subtitulo}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setAbierto(false)}
                aria-label="Cerrar"
                className="rounded-lg p-1 text-white/80 transition-colors hover:text-white"
              >
                <IconCerrar className="h-5 w-5" />
              </button>
            </div>

            {/* Mensajes */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {mensajes.map((m, i) => (
                <div
                  key={i}
                  className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <p
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                      m.role === "user"
                        ? "rounded-br-sm bg-teal text-white"
                        : "rounded-tl-sm bg-abismo/60 text-texto"
                    }`}
                  >
                    {m.content}
                  </p>
                </div>
              ))}

              {cargando && (
                <div className="flex justify-start">
                  <span className="flex gap-1 rounded-2xl rounded-tl-sm bg-abismo/60 px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-2 w-2 rounded-full bg-niebla"
                        animate={reduce ? undefined : { opacity: [0.3, 1, 0.3] }}
                        transition={reduce ? undefined : { duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </span>
                </div>
              )}

              {/* Sugerencias iniciales */}
              {mensajes.length === 1 && !cargando && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {asistente.sugerencias.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => enviar(s)}
                      className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-niebla transition-colors hover:border-menta hover:text-menta"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div ref={finRef} />
            </div>

            {/* Acción: dejar datos */}
            <button
              type="button"
              onClick={() => abrir()}
              className="mx-4 mb-2 flex items-center justify-center gap-2 rounded-xl border border-menta/40 py-2 text-sm font-medium text-menta transition-colors hover:bg-menta/10"
            >
              <IconWhatsApp className="h-4 w-4" />
              {asistente.ctaDatos}
            </button>

            {/* Entrada */}
            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-white/10 p-3">
              <input
                ref={inputRef}
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                maxLength={1000}
                placeholder={asistente.placeholder}
                aria-label={asistente.placeholder}
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-abismo/60 px-3 py-2.5 text-sm text-texto placeholder:text-niebla/60 focus:border-menta focus:outline-none focus-visible:outline-2 focus-visible:outline-cian"
              />
              <button
                type="submit"
                disabled={cargando || !texto.trim()}
                aria-label="Enviar"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal to-cian text-white transition-opacity disabled:opacity-40"
              >
                <IconFlecha className="h-5 w-5" />
              </button>
            </form>
            <p className="px-4 pb-3 text-center text-[10px] leading-tight text-niebla/60">
              {asistente.aviso}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h16v11H8l-4 4z" />
      <path d="M8 10h8M8 13h5" />
    </svg>
  );
}
