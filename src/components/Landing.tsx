import { IdiomaProvider, type Idioma } from "@/i18n";
import { WhatsAppProvider } from "@/components/WhatsAppModal";
import { Asistente } from "@/components/Asistente";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Nosotros } from "@/components/Nosotros";
import { Contadores } from "@/components/Contadores";
import { Servicios } from "@/components/Servicios";
import { PorQue } from "@/components/PorQue";
import { BigMarquee } from "@/components/BigMarquee";
import { Proceso } from "@/components/Proceso";
import { Modalidades } from "@/components/Modalidades";
import { DiagnosticoPopup } from "@/components/DiagnosticoPopup";
import { Contacto } from "@/components/Contacto";
import { Footer } from "@/components/Footer";

/** Página principal, reutilizada por la ruta ES (/) y EN (/en). */
export function Landing({ lang }: { lang: Idioma }) {
  return (
    <IdiomaProvider inicial={lang}>
      <WhatsAppProvider>
        <Header />
        <main>
          <Hero />
          <Nosotros />
          <Contadores />
          <Servicios />
          <PorQue />
          <BigMarquee />
          <Proceso />
          <Modalidades />
          <Contacto />
        </main>
        <Footer />
        <Asistente />
        <DiagnosticoPopup />
      </WhatsAppProvider>
    </IdiomaProvider>
  );
}
