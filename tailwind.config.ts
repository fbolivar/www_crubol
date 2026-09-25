import type { Config } from "tailwindcss";

/**
 * Tailwind 4 lee los tokens desde `@theme` en globals.css.
 * Este archivo declara la paleta y tipografías de marca de forma explícita
 * (entregable solicitado) y define el `content` para el árbol de la app.
 *
 * Regla de contraste: el menta solo se usa sobre fondos oscuros.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        abismo: "#04161B",
        profundo: "#0A2630",
        "profundo-2": "#0C2E39",
        teal: "#0B7285",
        cian: "#15AABF",
        menta: "#63E6BE",
        texto: "#E8F4F6",
        niebla: "#93B7C0",
        papel: "#FBFDFD",
        "niebla-clara": "#EEF7F8",
        tinta: "#16323A",
        gris: "#48626B",
        linea: "#DDE9EC",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      transitionTimingFunction: {
        marca: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
