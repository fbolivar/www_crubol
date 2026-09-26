"use client";

import { useState, type FormEvent } from "react";
import { useC } from "@/i18n";
import { IconFlecha, IconCheck } from "./ui/Icons";

type Errores = Partial<Record<"nombre" | "empresa" | "correo" | "necesidad", string>>;
type Estado = "idle" | "enviando" | "ok" | "error";

const inputBase =
  "w-full rounded-xl border border-linea bg-white px-4 py-3 text-tinta placeholder:text-gris/60 " +
  "focus:border-teal focus:outline-none focus-visible:outline-2 focus-visible:outline-cian";

/**
 * Formulario en caja blanca. Valida en el cliente y envía los datos al
 * Route Handler /api/contacto, que los remite por correo a info@crubol.com.
 */
export function ContactForm() {
  const { contacto } = useC();
  const { form } = contacto;
  const [errores, setErrores] = useState<Errores>({});
  const [estado, setEstado] = useState<Estado>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    const v = {
      nombre: String(fd.get("nombre") ?? "").trim(),
      empresa: String(fd.get("empresa") ?? "").trim(),
      correo: String(fd.get("correo") ?? "").trim(),
      telefono: String(fd.get("telefono") ?? "").trim(),
      necesidad: String(fd.get("necesidad") ?? "").trim(),
      mensaje: String(fd.get("mensaje") ?? "").trim(),
      website: String(fd.get("website") ?? ""), // trampa anti-spam
    };

    const err: Errores = {};
    if (!v.nombre) err.nombre = "Indíquenos su nombre.";
    if (!v.empresa) err.empresa = "Indíquenos su empresa.";
    if (!v.correo) err.correo = "Indíquenos su correo.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.correo))
      err.correo = "Revise el formato del correo.";
    if (!v.necesidad) err.necesidad = "Elija una opción.";

    setErrores(err);
    if (Object.keys(err).length > 0) {
      const primero = Object.keys(err)[0];
      formEl.querySelector<HTMLElement>(`[name="${primero}"]`)?.focus();
      return;
    }

    setEstado("enviando");
    setErrorMsg("");
    try {
      const r = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data.ok) {
        setEstado("ok");
        formEl.reset();
      } else {
        setEstado("error");
        setErrorMsg(
          data.error || "No pudimos enviar su mensaje. Intente de nuevo.",
        );
      }
    } catch {
      setEstado("error");
      setErrorMsg("No pudimos enviar su mensaje. Revise su conexión e intente de nuevo.");
    }
  };

  if (estado === "ok") {
    return (
      <div className="flex flex-col items-center rounded-3xl bg-white p-8 text-center shadow-2xl sm:p-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal">
          <IconCheck className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-xl font-bold text-tinta">
          ¡Mensaje enviado!
        </h3>
        <p className="mt-2 text-gris">
          Gracias por escribirnos. Le respondemos los socios en breve.
        </p>
        <button
          type="button"
          onClick={() => setEstado("idle")}
          className="mt-6 text-sm font-medium text-teal hover:text-tinta"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
    >
      {/* Campo trampa anti-spam (oculto para personas) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo id="nombre" label={form.campos.nombre} error={errores.nombre} required />
        <Campo id="empresa" label={form.campos.empresa} error={errores.empresa} required />
        <Campo
          id="correo"
          label={form.campos.correo}
          type="email"
          error={errores.correo}
          required
        />
        <Campo id="telefono" label={form.campos.telefono} type="tel" />
      </div>

      <div className="mt-4">
        <Etiqueta htmlFor="necesidad" required>
          {form.campos.necesidad}
        </Etiqueta>
        <select
          id="necesidad"
          name="necesidad"
          defaultValue=""
          aria-invalid={!!errores.necesidad}
          className={`${inputBase} appearance-none`}
        >
          <option value="" disabled>
            {form.placeholderSelect}
          </option>
          {form.opciones.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        {errores.necesidad && <Error>{errores.necesidad}</Error>}
      </div>

      <div className="mt-4">
        <Etiqueta htmlFor="mensaje">{form.campos.mensaje}</Etiqueta>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          className={`${inputBase} resize-none`}
        />
      </div>

      {estado === "error" && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal py-3.5 font-display font-medium text-white transition-all duration-300 ease-marca hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_rgba(11,114,133,0.5)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {estado === "enviando" ? (
          "Enviando…"
        ) : (
          <>
            {form.enviar.replace(" →", "")}
            <IconFlecha className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

function Etiqueta({
  children,
  htmlFor,
  required,
}: {
  children: React.ReactNode;
  htmlFor: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-tinta">
      {children}
      {required && <span className="text-teal"> *</span>}
    </label>
  );
}

function Error({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-sm text-red-600">{children}</p>;
}

function Campo({
  id,
  label,
  type = "text",
  error,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Etiqueta htmlFor={id} required={required}>
        {label}
      </Etiqueta>
      <input
        id={id}
        name={id}
        type={type}
        aria-invalid={!!error}
        className={inputBase}
      />
      {error && <Error>{error}</Error>}
    </div>
  );
}
