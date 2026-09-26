"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import * as ES from "@/content";
import * as EN from "@/content-en";

export type Idioma = "es" | "en";
type Contenido = typeof ES;

const CLAVE = "crubol_idioma";

const Ctx = createContext<{
  idioma: Idioma;
  setIdioma: (i: Idioma) => void;
  c: Contenido;
} | null>(null);

export function IdiomaProvider({ children }: { children: ReactNode }) {
  const [idioma, setEstado] = useState<Idioma>("es");

  useEffect(() => {
    let guardado: string | null = null;
    try {
      guardado = localStorage.getItem(CLAVE);
    } catch {
      /* localStorage no disponible */
    }
    if (guardado === "en" || guardado === "es") {
      // Sincronización única desde localStorage tras la hidratación (patrón válido).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEstado(guardado);
      try {
        document.documentElement.lang = guardado === "en" ? "en" : "es-CO";
      } catch {
        /* ignorar */
      }
    }
  }, []);

  const setIdioma = (i: Idioma) => {
    setEstado(i);
    try {
      localStorage.setItem(CLAVE, i);
    } catch {
      /* ignorar */
    }
    try {
      document.documentElement.lang = i === "en" ? "en" : "es-CO";
    } catch {
      /* ignorar */
    }
  };

  const c = (idioma === "en" ? (EN as unknown as Contenido) : ES);
  return <Ctx.Provider value={{ idioma, setIdioma, c }}>{children}</Ctx.Provider>;
}

/** Devuelve el árbol de contenido del idioma activo (ES por defecto). */
export function useC(): Contenido {
  const ctx = useContext(Ctx);
  return ctx ? ctx.c : ES;
}

/** Idioma activo y función para cambiarlo. */
export function useIdioma(): { idioma: Idioma; setIdioma: (i: Idioma) => void } {
  const ctx = useContext(Ctx);
  if (!ctx) return { idioma: "es", setIdioma: () => {} };
  return { idioma: ctx.idioma, setIdioma: ctx.setIdioma };
}
