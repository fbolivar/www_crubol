import type { Metadata } from "next";
import { spaceGrotesk, plexSans, plexMono } from "@/lib/fonts";
import { empresa, seo, servicios } from "@/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: seo.title,
  description: seo.description,
  applicationName: empresa.nombre,
  authors: [{ name: empresa.nombre }],
  keywords: [
    "TI Bogotá",
    "ciberseguridad Colombia",
    "ISO 27001",
    "infraestructura tecnológica",
    "inteligencia artificial empresas",
    "cumplimiento",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: seo.url,
    siteName: empresa.nombre,
    title: seo.title,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: { index: true, follow: true },
};

// JSON-LD: ProfessionalService con datos societarios reales.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: empresa.nombre,
  description: seo.description,
  url: seo.url,
  email: empresa.correo,
  telephone: empresa.telefono,
  taxID: empresa.nit,
  areaServed: { "@type": "Country", name: "Colombia" },
  address: {
    "@type": "PostalAddress",
    streetAddress: empresa.direccion.calle,
    addressLocality: empresa.direccion.ciudad,
    addressRegion: empresa.direccion.region,
    addressCountry: empresa.direccion.pais,
  },
  slogan: empresa.frase,
  makesOffer: servicios.items.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.titulo },
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-CO"
      className={`${spaceGrotesk.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          // JSON-LD generado a partir de datos propios (content.ts).
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
