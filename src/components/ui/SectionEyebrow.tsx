import type { ReactNode } from "react";

/**
 * Subtítulo de sección: icono + texto en mono, mayúsculas, tracking amplio.
 * `tono` decide el color del acento (menta en oscuro, teal en claro).
 */
export function SectionEyebrow({
  icon,
  children,
  tono = "oscuro",
}: {
  icon: ReactNode;
  children: ReactNode;
  tono?: "oscuro" | "claro";
}) {
  const color = tono === "oscuro" ? "text-menta" : "text-teal";
  return (
    <p className={`eyebrow flex items-center gap-2 ${color}`}>
      <span aria-hidden className="[&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </span>
      {children}
    </p>
  );
}
