import { ImageResponse } from "next/og";
import { empresa, seo } from "@/content";

export const alt = seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagen propia para Open Graph / Twitter, con la marca en fondo oscuro.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#061E24",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="52" height="52" viewBox="0 0 100 100" fill="none">
            <path
              d="M50 4 L89 27 L89 73 L50 96 L11 73 L11 27 Z"
              stroke="#63E6BE"
              strokeWidth={6}
            />
          </svg>
          <span style={{ color: "#E6F2F4", fontSize: 40, fontWeight: 700 }}>
            Crubol Technology
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#9FC2C9",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Seguridad que habilita
          </span>
          <span
            style={{
              color: "#E6F2F4",
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.15,
              marginTop: 20,
              maxWidth: 900,
            }}
          >
            Soluciones de TI y ciberseguridad en Bogotá
          </span>
        </div>

        <span style={{ color: "#63E6BE", fontSize: 28 }}>{empresa.dominio}</span>
      </div>
    ),
    size,
  );
}
