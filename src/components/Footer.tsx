"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useC, useIdioma } from "@/i18n";
import { AbrirDiagnostico } from "./AbrirDiagnostico";

export function Footer() {
  const { pie, empresa } = useC();
  const idioma = useIdioma();
  const pathname = usePathname();
  const home = idioma === "en" ? "/en" : "/";
  const hrefPriv = idioma === "en" ? "/en/privacy-policy" : "/politica-privacidad";
  // En la home los enlaces de sección son anclas de la misma página; en otras
  // páginas (política) deben apuntar a la home del idioma: /#servicios, /en#servicios.
  const enHome = pathname === "/" || pathname === "/en";
  const hrefSeccion = (href: string) =>
    href.startsWith("#") && !enHome ? `${home}${href}` : href;
  return (
    <footer className="border-t border-white/10 bg-abismo">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo + descripción */}
          <div className="lg:col-span-1">
            <Image
              src="/marca/crubol-logo-oscuro.png"
              alt="Crubol Technology"
              width={1911}
              height={758}
              className="h-8 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-niebla">{pie.descripcion}</p>
          </div>

          {/* Columnas de enlaces */}
          {pie.columnas.map((col, idx) => (
            <div key={col.titulo}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-menta">
                {col.titulo}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.enlaces.map((e) => (
                  <li key={e.label}>
                    <a
                      href={hrefSeccion(e.href)}
                      className="text-sm text-niebla transition-colors hover:text-texto"
                    >
                      {e.label}
                    </a>
                  </li>
                ))}
                {/* La segunda columna (Empresa/Company) suma el enlace del diagnóstico. */}
                {idx === 1 && (
                  <li>
                    <AbrirDiagnostico />
                  </li>
                )}
              </ul>
            </div>
          ))}

          {/* Contacto */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-menta">
              {pie.contacto.titulo}
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-niebla">
              <li>
                <a
                  href={`mailto:${empresa.correo}`}
                  className="transition-colors hover:text-texto"
                >
                  {pie.contacto.correo}
                </a>
              </li>
              <li>{pie.contacto.ciudad}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-xs text-niebla/70">{pie.legal}</p>
            <a
              href={hrefPriv}
              className="text-xs text-niebla transition-colors hover:text-texto"
            >
              {pie.privacidad}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
