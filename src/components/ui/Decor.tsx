/**
 * Decoraciones geométricas de marca (hexágonos, mallas de puntos, resplandores).
 * Todas son SVG/CSS propios, decorativos (aria-hidden) y sin captura de puntero.
 * La animación de flotación respeta prefers-reduced-motion vía globals.css.
 */

const HEX = "M50 3 L91 26.5 L91 73.5 L50 97 L9 73.5 L9 26.5 Z";

/** Hexágono de contorno, flotante. */
export function HexOutline({
  className = "",
  color = "var(--color-menta)",
  ancho = 2,
  flotar = true,
}: {
  className?: string;
  color?: string;
  ancho?: number;
  flotar?: boolean;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      className={`pointer-events-none absolute ${flotar ? "animate-flotar" : ""} ${className}`}
      fill="none"
      stroke={color}
      strokeWidth={ancho}
    >
      <path d={HEX} />
    </svg>
  );
}

/** Hexágono relleno translúcido, flotante lento. */
export function HexSolid({
  className = "",
  color = "rgba(21,170,191,0.12)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      className={`pointer-events-none absolute animate-flotar-lento ${className}`}
      fill={color}
    >
      <path d={HEX} />
    </svg>
  );
}

/** Malla de puntos (patrón de fondo). */
export function DotGrid({
  className = "",
  color = "rgba(147,183,192,0.5)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      width="120"
      height="120"
    >
      <defs>
        <pattern id="dg" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" fill={color} />
        </pattern>
      </defs>
      <rect width="120" height="120" fill="url(#dg)" />
    </svg>
  );
}

/** Resplandor difuso de color (blob). */
export function Glow({
  className = "",
  color = "rgba(21,170,191,0.25)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{ background: color }}
    />
  );
}
