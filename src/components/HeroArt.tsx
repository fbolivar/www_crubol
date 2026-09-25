"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { IconEscudo, IconChip, IconServidor, IconDocumento } from "./ui/Icons";

const EASE = [0.16, 1, 0.3, 1] as const;
const HEX = "M200 40 L338 120 L338 280 L200 360 L62 280 L62 120 Z";

// Nodos de circuito que salen del núcleo (como en los fondos de marca).
const NODOS = [
  { x1: 200, y1: 200, x2: 320, y2: 96, cx: 320, cy: 96 },
  { x1: 200, y1: 200, x2: 348, y2: 210, cx: 348, cy: 210 },
  { x1: 200, y1: 200, x2: 300, y2: 320, cx: 300, cy: 320 },
  { x1: 200, y1: 200, x2: 78, y2: 300, cx: 78, cy: 300 },
  { x1: 200, y1: 200, x2: 52, y2: 150, cx: 52, cy: 150 },
  { x1: 200, y1: 200, x2: 120, y2: 70, cx: 120, cy: 70 },
];

// Chips flotantes con los frentes de servicio.
const CHIPS = [
  { icon: <IconEscudo className="h-4 w-4" />, label: "Ciberseguridad activa", color: "text-menta", pos: "left-[48%] top-[4%]", delay: 0 },
  { icon: <IconChip className="h-4 w-4" />, label: "Automatización con IA", color: "text-cian", pos: "right-[1%] top-[38%]", delay: 0.4 },
  { icon: <IconServidor className="h-4 w-4" />, label: "Infraestructura & Cloud", color: "text-menta", pos: "left-[1%] top-[54%]", delay: 0.8 },
  { icon: <IconDocumento className="h-4 w-4" />, label: "Cumplimiento ISO 27001", color: "text-cian", pos: "left-[26%] bottom-[3%]", delay: 1.2 },
];

export function HeroArt() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* Resplandores de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[12%] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(21,170,191,0.35), transparent 70%)" }}
      />

      {/* Anillos hexagonales + circuito */}
      <motion.svg
        aria-hidden
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? undefined : { duration: 80, ease: "linear", repeat: Infinity }}
      >
        <defs>
          <linearGradient id="hexgrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#63E6BE" />
            <stop offset="100%" stopColor="#15AABF" />
          </linearGradient>
        </defs>
        {/* Anillos concéntricos */}
        <path d={HEX} fill="none" stroke="rgba(99,230,190,0.18)" strokeWidth="1.5" />
        <g transform="translate(200 200) scale(0.72) translate(-200 -200)">
          <path d={HEX} fill="none" stroke="rgba(21,170,191,0.25)" strokeWidth="1.5" />
        </g>
        <g transform="translate(200 200) scale(1.28) translate(-200 -200)">
          <path d={HEX} fill="none" stroke="rgba(99,230,190,0.10)" strokeWidth="1.5" />
        </g>
        {/* Trazas de circuito + nodos */}
        {NODOS.map((n, i) => (
          <g key={i}>
            <line x1={n.x1} y1={n.y1} x2={n.x2} y2={n.y2} stroke="rgba(21,170,191,0.35)" strokeWidth="1" />
            <circle cx={n.cx} cy={n.cy} r="4" fill="#63E6BE" />
          </g>
        ))}
      </motion.svg>

      {/* Núcleo: isotipo de marca, con pulso de brillo */}
      <motion.div
        className="absolute left-1/2 top-1/2 flex h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        style={{ background: "radial-gradient(circle, rgba(11,114,133,0.35), transparent 70%)" }}
        animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
        transition={reduce ? undefined : { duration: 4, ease: "easeInOut", repeat: Infinity }}
      >
        <Image
          src="/marca/crubol-isotipo.png"
          alt="Isotipo de Crubol Technology"
          width={798}
          height={798}
          priority
          className="h-full w-full object-contain drop-shadow-[0_0_24px_rgba(99,230,190,0.45)]"
        />
      </motion.div>

      {/* Chips flotantes */}
      {CHIPS.map((c) => (
        <motion.div
          key={c.label}
          className={`absolute ${c.pos} flex items-center gap-2 rounded-xl border border-white/10 bg-profundo/80 px-3 py-2 shadow-xl backdrop-blur-md`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: reduce ? 0 : c.delay }}
        >
          <motion.span
            className={c.color}
            animate={reduce ? undefined : { y: [0, -5, 0] }}
            transition={reduce ? undefined : { duration: 5, ease: "easeInOut", repeat: Infinity, delay: c.delay }}
          >
            {c.icon}
          </motion.span>
          <span className="whitespace-nowrap text-xs font-medium text-texto">{c.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
