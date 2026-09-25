import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variante = "menta" | "teal" | "contorno-claro" | "contorno-oscuro";

const estilos: Record<Variante, string> = {
  // Sobre oscuro: relleno menta, texto abismo.
  menta: "bg-menta text-abismo hover:shadow-[0_10px_30px_-8px_rgba(99,230,190,0.6)]",
  // Sobre claro: relleno teal, texto blanco.
  teal: "bg-teal text-white hover:shadow-[0_10px_30px_-8px_rgba(11,114,133,0.5)]",
  // Contorno sobre oscuro.
  "contorno-oscuro":
    "border border-white/25 text-texto hover:border-menta hover:text-menta",
  // Contorno sobre claro.
  "contorno-claro":
    "border border-linea text-tinta hover:border-teal hover:text-teal",
};

const clasesBase =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-display font-medium " +
  "transition-all duration-300 ease-marca hover:-translate-y-[3px] " +
  "focus-visible:outline-2 focus-visible:outline-cian";

type CommonProps = { variante?: Variante; children: ReactNode; className?: string };

export function ButtonLink({
  variante = "menta",
  children,
  className = "",
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${clasesBase} ${estilos[variante]} ${className}`} {...props}>
      {children}
    </a>
  );
}

export function Button({
  variante = "menta",
  children,
  className = "",
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${clasesBase} ${estilos[variante]} ${className}`} {...props}>
      {children}
    </button>
  );
}
