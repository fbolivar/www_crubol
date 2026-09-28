import type { Metadata } from "next";
import { PoliticaView } from "@/components/PoliticaView";

export const metadata: Metadata = {
  title: "Privacy Policy · Crubol Technology",
  description:
    "Personal data processing policy of Crubol Technology S.A.S. under Colombia's Law 1581 of 2012.",
  alternates: {
    canonical: "/en/privacy-policy",
    languages: {
      "es-CO": "/politica-privacidad",
      en: "/en/privacy-policy",
      "x-default": "/politica-privacidad",
    },
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "/en/privacy-policy",
    title: "Privacy Policy · Crubol Technology",
    description:
      "Personal data processing policy of Crubol Technology S.A.S. under Colombia's Law 1581 of 2012.",
  },
};

export default function PrivacyPolicy() {
  return <PoliticaView idioma="en" />;
}
