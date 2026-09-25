/**
 * Divisor de sección angulado o curvo (estilo TechGuru). Se coloca al borde
 * superior o inferior de una sección; `fill` debe ser el color de la sección
 * hacia la que apunta (el color que "invade" el borde).
 */
export function ShapeDivider({
  fill,
  posicion = "bottom",
  variante = "angulo",
  className = "",
}: {
  fill: string;
  posicion?: "top" | "bottom";
  variante?: "angulo" | "curva";
  className?: string;
}) {
  const esTop = posicion === "top";
  const path =
    variante === "curva"
      ? "M0,64 C360,8 1080,120 1440,40 L1440,120 L0,120 Z"
      : "M0,120 L1440,24 L1440,120 Z";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 ${esTop ? "top-0" : "bottom-0"} ${className}`}
      style={{ lineHeight: 0 }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-[60px] w-full sm:h-[90px]"
        style={{ transform: esTop ? "rotate(180deg)" : undefined }}
      >
        <path d={path} fill={fill} />
      </svg>
    </div>
  );
}
