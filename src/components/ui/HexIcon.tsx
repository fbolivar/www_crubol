import type { ReactNode } from "react";

/**
 * Contenedor hexagonal para iconos de servicio.
 * `tono` claro -> acento teal (legible sobre fondo claro).
 * `tono` oscuro -> acento menta (solo sobre fondo oscuro).
 */
export function HexIcon({
  children,
  tono = "claro",
}: {
  children: ReactNode;
  tono?: "claro" | "oscuro";
}) {
  const color = tono === "claro" ? "#0B7285" : "#63E6BE";
  const fondo = tono === "claro" ? "rgba(11,114,133,0.08)" : "rgba(99,230,190,0.10)";
  return (
    <span
      className="relative inline-flex h-14 w-14 items-center justify-center"
      style={{ color }}
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        fill={fondo}
        stroke={color}
        strokeWidth={4}
      >
        <path d="M50 4 L89 27 L89 73 L50 96 L11 73 L11 27 Z" />
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}
