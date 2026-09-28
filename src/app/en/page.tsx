import type { Metadata } from "next";
import { seo as seoEn } from "@/content-en";
import { empresa } from "@/content";
import { Landing } from "@/components/Landing";

export const metadata: Metadata = {
  title: seoEn.title,
  description: seoEn.description,
  keywords: [
    "IT Bogotá",
    "cybersecurity Colombia",
    "ISO 27001",
    "IT infrastructure",
    "artificial intelligence for companies",
    "compliance",
  ],
  alternates: {
    canonical: "/en",
    languages: { "es-CO": "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${seoEn.url}/en`,
    siteName: empresa.nombre,
    title: seoEn.title,
    description: seoEn.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seoEn.title,
    description: seoEn.description,
  },
};

export default function HomeEn() {
  return <Landing lang="en" />;
}
