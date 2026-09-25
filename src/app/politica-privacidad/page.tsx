import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { empresa } from "@/content";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidad · Crubol Technology",
  description:
    "Política de tratamiento de datos personales de Crubol Technology S.A.S. conforme a la Ley 1581 de 2012 de Colombia.",
  alternates: { canonical: "/politica-privacidad" },
};

const ACTUALIZADA = "25 de septiembre de 2026";

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 font-display text-xl font-bold text-tinta sm:text-2xl">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 leading-relaxed text-gris">{children}</p>;
}

export default function PoliticaPrivacidad() {
  return (
    <>
      {/* Encabezado simple */}
      <header className="border-b border-linea bg-papel">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link href="/" aria-label="Crubol Technology — inicio" className="flex items-center">
            <Image
              src="/marca/crubol-logo-claro.png"
              alt="Crubol Technology"
              width={1911}
              height={758}
              className="h-8 w-auto"
            />
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-teal transition-colors hover:text-tinta"
          >
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <main className="bg-papel">
        <article className="mx-auto max-w-3xl px-4 py-14">
          <p className="eyebrow text-teal">Legal</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-tinta sm:text-4xl">
            Política de Tratamiento de Datos Personales
          </h1>
          <p className="mt-3 text-sm text-gris">
            Última actualización: {ACTUALIZADA}
          </p>

          <P>
            En cumplimiento de la Ley Estatutaria 1581 de 2012, el Decreto 1074 de 2015
            y demás normas concordantes sobre protección de datos personales en
            Colombia, {empresa.nombre} (en adelante, «Crubol») adopta la presente
            política, que rige el tratamiento de los datos personales que recolectamos
            a través de este sitio web y de nuestros canales de contacto.
          </P>

          <H>1. Responsable del tratamiento</H>
          <P>
            {empresa.nombre}, sociedad identificada con NIT {empresa.nit} y matrícula{" "}
            {empresa.matricula} de la {empresa.camara}, con domicilio en{" "}
            {empresa.ciudad}, Colombia. Correo de contacto para asuntos de datos
            personales: <a className="text-teal underline underline-offset-2" href={`mailto:${empresa.correo}`}>{empresa.correo}</a>.
          </P>

          <H>2. Datos que recolectamos</H>
          <P>
            Recolectamos únicamente los datos que usted nos proporciona de forma
            voluntaria al diligenciar nuestros formularios de contacto o al iniciar una
            conversación por WhatsApp: nombre, correo electrónico, número de teléfono o
            WhatsApp, empresa, área de interés y el contenido del mensaje que decida
            enviarnos. No recolectamos datos sensibles ni datos de menores de edad.
          </P>

          <H>3. Finalidad del tratamiento</H>
          <P>Los datos personales se tratan con las siguientes finalidades:</P>
          <ul className="mt-3 flex flex-col gap-2 text-gris">
            {[
              "Atender sus solicitudes de contacto, diagnóstico o cotización.",
              "Comunicarnos con usted por los canales que nos indique (correo o WhatsApp).",
              "Elaborar y enviar propuestas de servicios que usted haya solicitado.",
              "Dar seguimiento a la relación comercial o de servicio.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                {t}
              </li>
            ))}
          </ul>
          <P>
            No vendemos, arrendamos ni compartimos sus datos personales con terceros
            con fines comerciales. Tampoco los usamos para elaborar perfiles ni para
            decisiones automatizadas.
          </P>

          <H>4. Autorización y base legal</H>
          <P>
            Al enviar un formulario de este sitio o al escribirnos por WhatsApp, usted
            autoriza de manera previa, expresa e informada el tratamiento de sus datos
            personales para las finalidades aquí descritas, conforme al artículo 9 de
            la Ley 1581 de 2012. Esta autorización puede ser revocada en cualquier
            momento, sin efecto retroactivo.
          </P>

          <H>5. Canales de contacto y terceros</H>
          <P>
            El contacto se realiza por correo electrónico y por WhatsApp. WhatsApp es un
            servicio operado por Meta Platforms, Inc.; al comunicarse con nosotros por
            ese medio, sus datos también se sujetan a las políticas de privacidad de
            dicho proveedor. Este sitio no utiliza cookies de rastreo publicitario ni
            herramientas de analítica que identifiquen individualmente a los visitantes.
          </P>

          <H>6. Conservación de los datos</H>
          <P>
            Conservamos sus datos personales durante el tiempo necesario para atender su
            solicitud y mantener la relación comercial o de servicio, y por el término
            adicional que exijan las obligaciones legales aplicables. Una vez cumplidas
            las finalidades y vencidos dichos términos, procederemos a su supresión
            segura.
          </P>

          <H>7. Derechos del titular</H>
          <P>Como titular de sus datos personales, usted tiene derecho a:</P>
          <ul className="mt-3 flex flex-col gap-2 text-gris">
            {[
              "Conocer, actualizar y rectificar sus datos personales.",
              "Solicitar prueba de la autorización otorgada.",
              "Ser informado sobre el uso que se ha dado a sus datos.",
              "Revocar la autorización y/o solicitar la supresión de sus datos, cuando proceda.",
              "Acceder de forma gratuita a sus datos personales.",
              "Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                {t}
              </li>
            ))}
          </ul>

          <H>8. Cómo ejercer sus derechos</H>
          <P>
            Puede ejercer sus derechos escribiendo a{" "}
            <a className="text-teal underline underline-offset-2" href={`mailto:${empresa.correo}`}>{empresa.correo}</a>,
            indicando su nombre, el derecho que desea ejercer y la información de
            contacto. Atenderemos las consultas en un término máximo de diez (10) días
            hábiles y los reclamos en un término máximo de quince (15) días hábiles,
            conforme a la Ley 1581 de 2012.
          </P>

          <H>9. Seguridad de la información</H>
          <P>
            Adoptamos medidas técnicas, humanas y administrativas razonables para
            proteger sus datos personales frente a acceso no autorizado, pérdida,
            alteración o divulgación indebida.
          </P>

          <H>10. Vigencia y cambios</H>
          <P>
            La presente política rige a partir de su publicación y puede ser actualizada
            para reflejar cambios legales u operativos. Cualquier modificación
            sustancial se informará a través de este sitio web.
          </P>

          <H>11. Contacto</H>
          <P>
            Para cualquier inquietud relacionada con el tratamiento de sus datos
            personales, escríbanos a{" "}
            <a className="text-teal underline underline-offset-2" href={`mailto:${empresa.correo}`}>{empresa.correo}</a>.
          </P>
        </article>
      </main>

      <Footer />
    </>
  );
}
