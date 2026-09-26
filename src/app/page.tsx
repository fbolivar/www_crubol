import type { Metadata } from "next";
import { seo, empresa } from "@/content";
import { Landing } from "@/components/Landing";

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: {
    canonical: "/",
    languages: { "es-CO": "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: seo.url,
    siteName: empresa.nombre,
    title: seo.title,
    description: seo.description,
  },
};

export default function Home() {
  return <Landing lang="es" />;
}
