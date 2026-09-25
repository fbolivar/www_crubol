import { WhatsAppProvider } from "@/components/WhatsAppModal";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <WhatsAppProvider>
      <Header />
      <main>
        <Hero />
      </main>
    </WhatsAppProvider>
  );
}
