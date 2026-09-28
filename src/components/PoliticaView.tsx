import Link from "next/link";
import Image from "next/image";
import { politica as politicaEs } from "@/content";
import { politica as politicaEn } from "@/content-en";
import { Footer } from "@/components/Footer";
import { IdiomaProvider, type Idioma } from "@/i18n";

/** Vista de la política de privacidad, compartida por la ruta ES y la EN. */
export function PoliticaView({ idioma }: { idioma: Idioma }) {
  const t = idioma === "en" ? politicaEn : politicaEs;
  const home = idioma === "en" ? "/en" : "/";

  return (
    <IdiomaProvider inicial={idioma}>
      <header className="border-b border-linea bg-papel">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link href={home} aria-label="Crubol Technology" className="flex items-center">
            <Image
              src="/marca/crubol-logo-claro.png"
              alt="Crubol Technology"
              width={1911}
              height={758}
              className="h-8 w-auto"
            />
          </Link>
          <Link
            href={home}
            className="text-sm font-medium text-teal transition-colors hover:text-tinta"
          >
            {t.volver}
          </Link>
        </div>
      </header>

      <main className="bg-papel">
        <article className="mx-auto max-w-3xl px-4 py-14">
          <p className="eyebrow text-teal">{t.eyebrow}</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-tinta sm:text-4xl">
            {t.titulo}
          </h1>
          <p className="mt-3 text-sm text-gris">
            {t.actualizadoLabel}: {t.fecha}
          </p>
          <p className="mt-3 leading-relaxed text-gris">{t.intro}</p>

          {t.secciones.map((s) => (
            <section key={s.titulo}>
              <h2 className="mt-10 font-display text-xl font-bold text-tinta sm:text-2xl">
                {s.titulo}
              </h2>
              {s.parrafos.map((p) => (
                <p key={p} className="mt-3 leading-relaxed text-gris">
                  {p}
                </p>
              ))}
              {"lista" in s && s.lista && (
                <ul className="mt-3 flex flex-col gap-2 text-gris">
                  {s.lista.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                      {it}
                    </li>
                  ))}
                </ul>
              )}
              {"cierre" in s && s.cierre && (
                <p className="mt-3 leading-relaxed text-gris">{s.cierre}</p>
              )}
            </section>
          ))}
        </article>
      </main>

      <Footer />
    </IdiomaProvider>
  );
}
