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
  const estilo =
    tono === "oscuro"
      ? "text-menta bg-menta/10 ring-menta/25"
      : "text-teal bg-teal/10 ring-teal/25";
  return (
    <p
      className={`eyebrow inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 ring-1 ring-inset ${estilo}`}
    >
      <span aria-hidden className="[&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </span>
      {children}
    </p>
  );
}
