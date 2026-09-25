"use client";

import { useState, type FormEvent } from "react";
import { contacto, empresa } from "@/content";
import { IconFlecha } from "./ui/Icons";

const { form } = contacto;

type Errores = Partial<Record<"nombre" | "empresa" | "correo" | "necesidad", string>>;

const inputBase =
  "w-full rounded-xl border border-linea bg-white px-4 py-3 text-tinta placeholder:text-gris/60 " +
  "focus:border-teal focus:outline-none focus-visible:outline-2 focus-visible:outline-cian";

/**
 * Formulario en caja blanca. Valida los campos obligatorios en el cliente y,
 * al pasar, abre el correo con el mensaje ya redactado (mailto). Sin backend.
 */
export function ContactForm() {
  const [errores, setErrores] = useState<Errores>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = {
      nombre: String(fd.get("nombre") ?? "").trim(),
      empresa: String(fd.get("empresa") ?? "").trim(),
      correo: String(fd.get("correo") ?? "").trim(),
      telefono: String(fd.get("telefono") ?? "").trim(),
      necesidad: String(fd.get("necesidad") ?? "").trim(),
      mensaje: String(fd.get("mensaje") ?? "").trim(),
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
      e.currentTarget.querySelector<HTMLElement>(`[name="${primero}"]`)?.focus();
      return;
    }

    const cuerpo = [
      `Nombre: ${v.nombre}`,
      `Empresa: ${v.empresa}`,
      `Correo: ${v.correo}`,
      v.telefono && `Teléfono: ${v.telefono}`,
      `Situación: ${v.necesidad}`,
      "",
      v.mensaje || "(sin mensaje adicional)",
    ]
      .filter(Boolean)
      .join("\n");

    const href =
      `mailto:${empresa.correo}` +
      `?subject=${encodeURIComponent(`Diagnóstico gratis — ${v.empresa}`)}` +
      `&body=${encodeURIComponent(cuerpo)}`;
    window.location.href = href;
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
    >
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

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal py-3.5 font-display font-medium text-white transition-all duration-300 ease-marca hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_rgba(11,114,133,0.5)]"
      >
        {form.enviar.replace(" →", "")}
        <IconFlecha className="h-4 w-4" />
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
