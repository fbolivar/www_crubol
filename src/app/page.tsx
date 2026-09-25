import { WhatsAppProvider } from "@/components/WhatsAppModal";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Nosotros } from "@/components/Nosotros";
import { Contadores } from "@/components/Contadores";
import { Servicios } from "@/components/Servicios";
import { PorQue } from "@/components/PorQue";
import { BigMarquee } from "@/components/BigMarquee";
import { Proceso } from "@/components/Proceso";
import { Modalidades } from "@/components/Modalidades";
import { Contacto } from "@/components/Contacto";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
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
    </WhatsAppProvider>
  );
}
