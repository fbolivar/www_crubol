"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { diagnosticoResultado as diagEs } from "@/content";
import { diagnosticoResultado as diagEn } from "@/content-en";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { IconEscudo, IconCheck } from "./ui/Icons";

type Estado = "ok" | "warn" | "fail";
type Check = { titulo: string; estado: Estado; valor: string; consejo: string };
type Grupo = { titulo: string; checks: Check[] };
type Reporte = {
  dominio: string;
  scores: { seguridad: number; correo: number };
  resumen: string;
  meta: { servidor: string; tls: string; ip: string };
  grupos: Grupo[];
};
type Lang = "es" | "en";
type TDiag = typeof diagEs;

const colorScore = (n: number) =>
  n >= 80 ? "#63E6BE" : n >= 50 ? "#F5B64A" : "#F87171";

const txt = {
  es: {
    sinDominio: "Falta el dominio a analizar.",
    incompleto: "No pudimos completar el análisis.",
    conexion: "No pudimos conectar con el analizador. Revise su conexión.",
    volver: "← Ir al sitio",
    servidor: "Servidor",
    enviando: "Enviando…",
  },
  en: {
    sinDominio: "Missing domain to analyze.",
    incompleto: "We couldn't complete the analysis.",
    conexion: "We couldn't reach the analyzer. Check your connection.",
    volver: "← Back to site",
    servidor: "Server",
    enviando: "Sending…",
  },
} as const;

export function DiagnosticoResultado() {
  const params = useSearchParams();
  const dominio = params.get("d") || "";
  const lang: Lang = params.get("lang") === "en" ? "en" : "es";
  const t: TDiag = lang === "en" ? (diagEn as unknown as TDiag) : diagEs;
  const home = lang === "en" ? "/en" : "/";
  const l = txt[lang];

  const [fase, setFase] = useState<"cargando" | "ok" | "error">("cargando");
  const [reporte, setReporte] = useState<Reporte | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [msgIdx, setMsgIdx] = useState(0);
  const hecho = useRef(false);

  useEffect(() => {
    if (hecho.current) return;
    hecho.current = true;
    let iv: ReturnType<typeof setInterval> | undefined;
    (async () => {
      if (!dominio) {
        setErrorMsg(l.sinDominio);
        setFase("error");
        return;
      }
      iv = setInterval(() => setMsgIdx((i) => (i + 1) % t.cargando.mensajes.length), 1600);
      try {
        const r = await fetch("/api/diagnostico", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dominio, lang }),
        });
        const data = await r.json();
        if (r.ok && data.reporte) {
          setReporte(data.reporte);
          setFase("ok");
        } else {
          setErrorMsg(data.error || l.incompleto);
          setFase("error");
        }
      } catch {
        setErrorMsg(l.conexion);
        setFase("error");
      } finally {
        if (iv) clearInterval(iv);
      }
    })();
    return () => {
      if (iv) clearInterval(iv);
    };
  }, [dominio, t, l]);

  return (
    <div className="min-h-screen bg-abismo">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link href={home} aria-label="Crubol Technology">
            <Image src="/marca/crubol-logo-oscuro.png" alt="Crubol Technology" width={1911} height={758} className="h-8 w-auto" />
          </Link>
          <Link href={home} className="text-sm font-medium text-menta hover:text-texto">
            {l.volver}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12">
        {fase === "cargando" && <Cargando idx={msgIdx} t={t} />}
        {fase === "error" && <ErrorBox mensaje={errorMsg} t={t} home={home} />}
        {fase === "ok" && reporte && <Informe reporte={reporte} t={t} lang={lang} l={l} home={home} />}
      </main>
    </div>
  );
}

function Cargando({ idx, t }: { idx: number; t: TDiag }) {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <span className="h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-cian" />
      <p className="mt-8 font-display text-lg text-texto">{t.cargando.mensajes[idx]}</p>
      <p className="mt-2 text-sm text-niebla">{t.cargando.nota}</p>
    </div>
  );
}

function ErrorBox({ mensaje, t, home }: { mensaje: string; t: TDiag; home: string }) {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-profundo p-8 text-center">
      <h1 className="font-display text-xl font-bold text-texto">{t.errorTitulo}</h1>
      <p className="mt-3 text-niebla">{mensaje}</p>
      <Link
        href={home}
        className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-teal to-cian px-6 py-3 font-display font-medium text-white"
      >
        {t.reintentar}
      </Link>
    </div>
  );
}

function ScoreRing({ valor, label, t }: { valor: number; label: string; t: TDiag }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.max(0, Math.min(100, valor)) / 100);
  const color = colorScore(valor);
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 110 110" className="h-full w-full -rotate-90">
          <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          <circle cx="55" cy="55" r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-bold" style={{ color }}>{valor}</span>
          <span className="text-[10px] text-niebla">{t.de100}</span>
        </div>
      </div>
      <span className="mt-2 font-mono text-xs uppercase tracking-wider text-niebla">{label}</span>
    </div>
  );
}

const iconoEstado: Record<Estado, { bg: string; el: React.ReactNode }> = {
  ok: { bg: "bg-menta/15 text-menta", el: <IconCheck className="h-3.5 w-3.5" /> },
  warn: { bg: "bg-[#F5B64A]/15 text-[#F5B64A]", el: <span className="text-xs font-bold">!</span> },
  fail: { bg: "bg-[#F87171]/15 text-[#F87171]", el: <span className="text-xs font-bold">✕</span> },
};

function Informe({
  reporte,
  t,
  lang,
  l,
  home,
}: {
  reporte: Reporte;
  t: TDiag;
  lang: Lang;
  l: (typeof txt)[Lang];
  home: string;
}) {
  return (
    <div>
      <SectionEyebrow icon={<IconEscudo />} tono="oscuro">
        {t.eyebrow}
      </SectionEyebrow>

      <div className="mt-6 flex flex-col items-start gap-8 sm:flex-row sm:items-center">
        <div className="flex gap-6">
          <ScoreRing valor={reporte.scores.seguridad} label={t.labelSeguridad} t={t} />
          <ScoreRing valor={reporte.scores.correo} label={t.labelWeb} t={t} />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-texto">
            {t.resultadoDe} <span className="text-cian">{reporte.dominio}</span>
          </h1>
          <p className="mt-2 text-niebla">{reporte.resumen}</p>
          <p className="mt-2 font-mono text-xs text-niebla/70">
            {l.servidor}: {reporte.meta.servidor} · {reporte.meta.tls} · IP {reporte.meta.ip}
          </p>
        </div>
      </div>

      {reporte.grupos.map((g) => (
        <section key={g.titulo} className="mt-10">
          <h2 className="font-display text-lg font-bold text-texto">{g.titulo}</h2>
          <div className="mt-4 grid gap-3">
            {g.checks.map((c) => (
              <div key={c.titulo} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-profundo/50 p-4">
                <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${iconoEstado[c.estado].bg}`}>
                  {iconoEstado[c.estado].el}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold text-texto">{c.titulo}</p>
                  <p className="text-sm text-texto/90">{c.valor}</p>
                  <p className="mt-0.5 text-xs text-niebla">{c.consejo}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <p className="mt-8 rounded-2xl border border-white/10 bg-profundo/40 p-4 text-sm text-niebla">
        {t.parcialNota}
      </p>

      <FormularioInforme reporte={reporte} t={t} lang={lang} l={l} home={home} />

      <section className="mt-16">
        <SectionEyebrow icon={<IconEscudo />} tono="oscuro">
          {t.faqEyebrow}
        </SectionEyebrow>
        <h2 className="mt-3 font-display text-2xl font-bold text-texto sm:text-3xl">
          {t.faqTituloAntes}{" "}
          <span className="texto-gradiente">{t.faqTituloResaltado}</span>
        </h2>
        <div className="mt-6 divide-y divide-white/10 border-t border-white/10">
          {t.faq.map((f, i) => (
            <div key={f.p} className="flex gap-5 py-5">
              <span className="font-display text-sm font-bold text-cian">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display font-bold text-texto">{f.p}</h3>
                <p className="mt-1.5 text-sm text-niebla">{f.r}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-12 border-t border-white/10 pt-6 text-xs leading-relaxed text-niebla/60">
        {t.aviso}
      </p>
    </div>
  );
}

function FormularioInforme({
  reporte,
  t,
  lang,
  l,
  home,
}: {
  reporte: Reporte;
  t: TDiag;
  lang: Lang;
  l: (typeof txt)[Lang];
  home: string;
}) {
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "error">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const nombre = String(fd.get("nombre") || "").trim();
    const correo = String(fd.get("correo") || "").trim();
    if (!nombre || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) || !fd.get("politica")) return;
    setEstado("enviando");
    try {
      const r = await fetch("/api/informe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, reporte, lang }),
      });
      setEstado(r.ok ? "ok" : "error");
    } catch {
      setEstado("error");
    }
  };

  if (estado === "ok") {
    return (
      <div className="mt-8 flex items-center gap-3 rounded-2xl border border-menta/30 bg-menta/10 p-6">
        <IconCheck className="h-6 w-6 shrink-0 text-menta" />
        <p className="text-texto">{t.form.gracias}</p>
      </div>
    );
  }

  const hrefPriv = home === "/en" ? "/politica-privacidad?lang=en" : "/politica-privacidad";

  return (
    <form onSubmit={onSubmit} className="mt-8 rounded-3xl border border-cian/30 bg-gradient-to-b from-profundo to-abismo p-6 sm:p-8">
      <h2 className="font-display text-xl font-bold text-texto">🔓 {t.form.titulo}</h2>
      <p className="mt-2 text-sm text-niebla">{t.form.texto}</p>
      <div className="mx-auto mt-5 flex max-w-md flex-col gap-3">
        <input name="nombre" required placeholder={t.form.nombre} className="rounded-xl border border-white/10 bg-abismo/60 px-4 py-3 text-sm text-texto placeholder:text-niebla/60 focus:border-menta focus:outline-none" />
        <input name="correo" type="email" required placeholder={t.form.correo} className="rounded-xl border border-white/10 bg-abismo/60 px-4 py-3 text-sm text-texto placeholder:text-niebla/60 focus:border-menta focus:outline-none" />
        <label className="flex items-start gap-2 text-left text-xs text-niebla">
          <input type="checkbox" name="politica" required className="mt-0.5 accent-teal" />
          <span>
            {t.form.politicaAntes}{" "}
            <Link href={hrefPriv} target="_blank" className="text-menta underline underline-offset-2">
              {t.form.politicaLink}
            </Link>
            .
          </span>
        </label>
        {estado === "error" && <p className="text-sm text-[#F87171]">{t.form.error}</p>}
        <button type="submit" disabled={estado === "enviando"} className="rounded-xl bg-gradient-to-r from-teal to-cian py-3 font-display font-medium text-white transition-all hover:-translate-y-0.5 disabled:opacity-60">
          {estado === "enviando" ? l.enviando : t.form.enviar}
        </button>
      </div>
    </form>
  );
}
