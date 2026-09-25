"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { hero } from "@/content";

const { panel } = hero;
const maxBarra = Math.max(...panel.grafica.barras);

/** Panel de operación simulado: se inclina en 3D siguiendo el cursor (máx 4°). */
export function HeroPanel() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), {
    stiffness: 150,
    damping: 20,
  });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), {
    stiffness: 150,
    damping: 20,
  });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: reduce ? 0 : rotX, rotateY: reduce ? 0 : rotY, transformStyle: "preserve-3d" }}
        className="rounded-2xl border border-white/10 bg-profundo/70 p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md sm:p-6"
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="font-display text-sm font-medium text-texto">
            {panel.titulo}
          </span>
          <span className="flex items-center gap-2 text-xs text-menta">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-menta animate-halo" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-menta" />
            </span>
            {panel.estado}
          </span>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-3 py-4">
          {panel.kpis.map((k) => (
            <div key={k.label} className="rounded-xl bg-abismo/50 p-3">
              <div className="font-display text-xl font-bold text-cian">
                {k.valor}
                {k.sufijo}
              </div>
              <div className="mt-1 text-[11px] leading-tight text-niebla">{k.label}</div>
            </div>
          ))}
        </div>

        {/* Gráfica de barras */}
        <div className="rounded-xl bg-abismo/50 p-4">
          <div className="mb-3 flex items-baseline justify-between">
            <span className="text-xs text-texto">{panel.grafica.titulo}</span>
            <span className="text-[11px] text-menta">{panel.grafica.subtitulo}</span>
          </div>
          <div className="flex h-24 items-end gap-1.5">
            {panel.grafica.barras.map((b, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-teal to-menta"
                initial={{ height: reduce ? `${(b / maxBarra) * 100}%` : 0 }}
                whileInView={{ height: `${(b / maxBarra) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: reduce ? 0 : i * 0.085, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </div>
        </div>

        {/* Filas de estado */}
        <div className="mt-4 flex flex-col gap-2">
          {panel.filas.map((f) => (
            <div
              key={f.label}
              className="flex items-center justify-between rounded-lg bg-abismo/40 px-3 py-2 text-xs"
            >
              <span className="text-niebla">{f.label}</span>
              <span className="font-mono text-menta">{f.valor}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
