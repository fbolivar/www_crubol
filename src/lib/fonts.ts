import localFont from "next/font/local";

// Space Grotesk 500/700 -> titulares, cifras, botones
export const spaceGrotesk = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "../../public/fonts/SpaceGrotesk-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/SpaceGrotesk-700.woff2", weight: "700", style: "normal" },
  ],
});

// IBM Plex Sans 400/700 -> texto corrido, listas, formularios
export const plexSans = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    { path: "../../public/fonts/IBMPlexSans-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/IBMPlexSans-700.woff2", weight: "700", style: "normal" },
  ],
});

// IBM Plex Mono 500 -> etiquetas, datos, pies, subtítulos de sección
export const plexMono = localFont({
  variable: "--font-mono",
  display: "swap",
  src: [{ path: "../../public/fonts/IBMPlexMono-500.woff2", weight: "500", style: "normal" }],
});
