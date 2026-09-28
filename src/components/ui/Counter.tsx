"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function formatear(n: number, decimales: number) {
  return n.toLocaleString("es-CO", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });
}

/**
 * Cuenta desde 0 hasta `valor` al entrar en pantalla, easing cúbico, 1,4 s.
 * Usa IntersectionObserver nativo (con verificación inicial) y cae al valor
 * final si el observer no está disponible. Con prefers-reduced-motion muestra
 * el valor final sin animar.
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
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  const decimales = Number.isInteger(valor) ? 0 : 1;

  useEffect(() => {
    if (reduce) {
      setN(valor);
      return;
    }
    const el = ref.current;
    let raf = 0;
    let lanzado = false;

    const animar = () => {
      if (lanzado) return;
      lanzado = true;
      const inicio = performance.now();
      const tick = (ahora: number) => {
        const p = Math.min((ahora - inicio) / duracion, 1);
        setN(valor * easeOutCubic(p));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    // Sin IntersectionObserver (o sin elemento): mostramos el valor final.
    if (!el || typeof IntersectionObserver === "undefined") {
      animar();
      return () => cancelAnimationFrame(raf);
    }

    const obs = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          animar();
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.1 },
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduce, valor, duracion]);

  const mostrado = formatear(reduce ? valor : n, decimales);

  return (
    <span ref={ref}>
      {prefijo}
      {mostrado}
      {sufijo}
    </span>
  );
}
