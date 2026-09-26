"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useC } from "@/i18n";
import { useWhatsApp } from "./WhatsAppModal";
import { LanguageToggle } from "./LanguageToggle";
import { Button, ButtonLink } from "./ui/Button";
import { IconMenu, IconCerrar } from "./ui/Icons";

export function Header() {
  const { nav } = useC();
  const { abrir } = useWhatsApp();
  const [compacto, setCompacto] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompacto(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuAbierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAbierto]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-marca ${
        compacto
          ? "border-b border-white/10 bg-abismo/80 py-2 backdrop-blur-md"
          : "border-b border-transparent bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <a href="#top" aria-label="Crubol Technology — inicio" className="flex items-center">
          <Image
            src="/marca/crubol-logo-oscuro.png"
            alt="Crubol Technology"
            width={1911}
            height={758}
            priority
            className={`w-auto transition-all duration-300 ease-marca ${
              compacto ? "h-7" : "h-9"
            }`}
          />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {nav.enlaces.map((e) => (
            <a
              key={e.href}
              href={e.href}
              className="text-sm text-niebla transition-colors hover:text-texto"
            >
              {e.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          {/* Los contenedores controlan la visibilidad (el botón base es inline-flex). */}
          <span className="hidden md:inline-flex">
            <ButtonLink
              variante="contorno-oscuro"
              href={nav.portal.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {nav.portal.label}
            </ButtonLink>
          </span>
          <span className="hidden sm:inline-flex">
            <Button variante="menta" onClick={() => abrir()}>
              {nav.cta}
            </Button>
          </span>
          <button
            type="button"
            className="rounded-lg p-2 text-texto lg:hidden"
            aria-label="Abrir menú"
            aria-expanded={menuAbierto}
            onClick={() => setMenuAbierto(true)}
          >
            <IconMenu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Menú móvil a pantalla completa */}
      {menuAbierto && (
        <div className="fixed inset-0 z-50 flex flex-col bg-abismo lg:hidden">
          <div className="flex items-center justify-between px-4 py-4">
            <Image
              src="/marca/crubol-logo-oscuro.png"
              alt="Crubol Technology"
              width={1911}
              height={758}
              className="h-8 w-auto"
            />
            <button
              type="button"
              className="rounded-lg p-2 text-texto"
              aria-label="Cerrar menú"
              onClick={() => setMenuAbierto(false)}
            >
              <IconCerrar className="h-6 w-6" />
            </button>
          </div>
          <nav
            aria-label="Móvil"
            className="flex flex-1 flex-col justify-center gap-2 px-6"
          >
            {nav.enlaces.map((e) => (
              <a
                key={e.href}
                href={e.href}
                onClick={() => setMenuAbierto(false)}
                className="border-b border-white/10 py-4 font-display text-2xl text-texto"
              >
                {e.label}
              </a>
            ))}
            <Button
              variante="menta"
              className="mt-6"
              onClick={() => {
                setMenuAbierto(false);
                abrir();
              }}
            >
              {nav.cta}
            </Button>
            <ButtonLink
              variante="contorno-oscuro"
              href={nav.portal.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3"
              onClick={() => setMenuAbierto(false)}
            >
              {nav.portal.label}
            </ButtonLink>
            <div className="mt-6">
              <LanguageToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
