/** Iconos de línea, propios (sin librerías). currentColor hereda el color. */
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconEscudo = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const IconServidor = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="18" height="7" rx="1.5" />
    <rect x="3" y="13" width="18" height="7" rx="1.5" />
    <path d="M7 7.5h.01M7 16.5h.01" />
  </svg>
);

export const IconChip = (p: P) => (
  <svg {...base} {...p}>
    <rect x="7" y="7" width="10" height="10" rx="1.5" />
    <path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3" />
  </svg>
);

// Red neuronal (ícono de IA según el manual de marca).
export const IconRedNeuronal = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="5" cy="6" r="1.6" />
    <circle cx="5" cy="18" r="1.6" />
    <circle cx="12" cy="12" r="1.9" />
    <circle cx="19" cy="7" r="1.6" />
    <circle cx="19" cy="17" r="1.6" />
    <path d="M6.5 6.8l4 4M6.4 17.2l4.1-4M13.6 11l4-3.4M13.7 13l3.9 3.2" />
  </svg>
);

export const IconDocumento = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 3h8l4 4v14H6z" />
    <path d="M14 3v4h4M9 13h6M9 17h6M9 9h2" />
  </svg>
);

export const IconRayo = (p: P) => (
  <svg {...base} {...p}>
    <path d="M13 3L5 13h6l-2 8 8-10h-6z" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...base} {...p}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const IconArroba = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M16 12v1.5a2.5 2.5 0 005 0V12a9 9 0 10-3.5 7.1" />
  </svg>
);

export const IconMapa = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s-7-6.3-7-11a7 7 0 1114 0c0 4.7-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const IconWhatsApp = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 20l1.4-4A8 8 0 1120 12a8 8 0 01-11 7.4L4 20z" />
    <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.6.8-1.1l-.6-1.2a.8.8 0 00-1-.4l-.7.3a4 4 0 01-1.9-1.9l.3-.7a.8.8 0 00-.4-1l-1.2-.6c-.5-.2-1.1.2-1.1.8z" />
  </svg>
);

export const IconBrujula = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
  </svg>
);

export const IconMenu = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const IconCerrar = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IconFlecha = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
