"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function formatear(n: number, decimales: number) {
  return n.toLocaleString("es-CO", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });
}

/**
 * Cuenta desde 0 hasta `valor` al entrar en pantalla, easing cúbico, 1,4 s.
 * Con prefers-reduced-motion muestra el valor final directamente.
 */
export function Counter({
  valor,
  prefijo = "",
  sufijo = "",
  duracion = 1400,
}: {
  valor: number;
  prefijo?: string;
  sufijo?: string;
  duracion?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const enVista = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  const decimales = Number.isInteger(valor) ? 0 : 1;

  useEffect(() => {
    if (!enVista || reduce) return;
    let raf = 0;
    const inicio = performance.now();
    const tick = (ahora: number) => {
      const p = Math.min((ahora - inicio) / duracion, 1);
      setN(valor * easeOutCubic(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enVista, reduce, valor, duracion]);

  // Con reduced-motion se muestra el valor final sin animar.
  const mostrado = reduce ? formatear(valor, decimales) : formatear(n, decimales);

  return (
    <span ref={ref}>
      {prefijo}
      {mostrado}
      {sufijo}
    </span>
  );
}
