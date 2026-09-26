"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import * as ES from "@/content";
import * as EN from "@/content-en";

export type Idioma = "es" | "en";
type Contenido = typeof ES;

const Ctx = createContext<{ idioma: Idioma; c: Contenido } | null>(null);

/** El idioma lo determina la ruta (`/` = es, `/en` = en). */
export function IdiomaProvider({
  inicial = "es",
  children,
}: {
  inicial?: Idioma;
  children: ReactNode;
}) {
  useEffect(() => {
    try {
      document.documentElement.lang = inicial === "en" ? "en" : "es-CO";
    } catch {
      /* ignorar */
    }
  }, [inicial]);

  const c = inicial === "en" ? (EN as unknown as Contenido) : ES;
  return <Ctx.Provider value={{ idioma: inicial, c }}>{children}</Ctx.Provider>;
}

/** Devuelve el árbol de contenido del idioma activo (ES por defecto). */
export function useC(): Contenido {
  const ctx = useContext(Ctx);
  return ctx ? ctx.c : ES;
}

/** Idioma activo. */
export function useIdioma(): Idioma {
  const ctx = useContext(Ctx);
  return ctx ? ctx.idioma : "es";
}
