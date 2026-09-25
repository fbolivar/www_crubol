import type { ReactNode } from "react";

/**
 * Marquesina CSS de bucle infinito. Duplica el contenido para un loop sin
 * costura (la animación traslada -50%). `pausable` la detiene al pasar el
 * cursor. Respeta reduced-motion vía globals.css.
 */
export function Marquee({
  children,
  velocidad = "normal",
  pausable = false,
  className = "",
}: {
  children: ReactNode;
  velocidad?: "normal" | "lento";
  pausable?: boolean;
  className?: string;
}) {
  const anim = velocidad === "lento" ? "animate-marquee-lento" : "animate-marquee";
  return (
    <div className={`group relative overflow-hidden ${className}`} aria-hidden>
      <div
        className={`flex w-max ${anim} ${pausable ? "group-hover:[animation-play-state:paused]" : ""}`}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </div>
    </div>
  );
}
