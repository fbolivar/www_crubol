"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Barra de progreso que se llena al entrar en pantalla, 1,4 s. */
export function ProgressBar({ valor, label }: { valor: number; label: string }) {
  const reduce = useReducedMotion();
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-texto">{label}</span>
        <span className="font-display font-medium text-menta">{valor}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-teal to-menta"
          initial={{ width: reduce ? `${valor}%` : 0 }}
          whileInView={{ width: `${valor}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.4, ease: EASE }}
        />
      </div>
    </div>
  );
}
