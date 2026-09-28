import type { Metadata } from "next";
import { PoliticaView } from "@/components/PoliticaView";

export const metadata: Metadata = {
  title: "Política de Privacidad · Crubol Technology",
  description:
    "Política de tratamiento de datos personales de Crubol Technology S.A.S. conforme a la Ley 1581 de 2012 de Colombia.",
  alternates: {
    canonical: "/politica-privacidad",
    languages: {
      "es-CO": "/politica-privacidad",
      en: "/en/privacy-policy",
      "x-default": "/politica-privacidad",
    },
  },
  openGraph: {
    type: "article",
    locale: "es_CO",
    url: "/politica-privacidad",
    title: "Política de Privacidad · Crubol Technology",
    description:
      "Política de tratamiento de datos personales de Crubol Technology S.A.S. conforme a la Ley 1581 de 2012 de Colombia.",
  },
};

export default function PoliticaPrivacidad() {
  return <PoliticaView idioma="es" />;
}
