/**
 * Indicativos telefónicos por país para el widget de WhatsApp.
 * Colombia va primero (valor por defecto); el resto en orden alfabético.
 * `flag` es emoji; `code` incluye el signo +.
 */
export type Indicativo = { pais: string; code: string; flag: string };

export const indicativos: Indicativo[] = [
  { pais: "Colombia", code: "+57", flag: "🇨🇴" },
  { pais: "Alemania", code: "+49", flag: "🇩🇪" },
  { pais: "Argentina", code: "+54", flag: "🇦🇷" },
  { pais: "Australia", code: "+61", flag: "🇦🇺" },
  { pais: "Bolivia", code: "+591", flag: "🇧🇴" },
  { pais: "Brasil", code: "+55", flag: "🇧🇷" },
  { pais: "Canadá", code: "+1", flag: "🇨🇦" },
  { pais: "Chile", code: "+56", flag: "🇨🇱" },
  { pais: "China", code: "+86", flag: "🇨🇳" },
  { pais: "Corea del Sur", code: "+82", flag: "🇰🇷" },
  { pais: "Costa Rica", code: "+506", flag: "🇨🇷" },
  { pais: "Cuba", code: "+53", flag: "🇨🇺" },
  { pais: "Ecuador", code: "+593", flag: "🇪🇨" },
  { pais: "El Salvador", code: "+503", flag: "🇸🇻" },
  { pais: "España", code: "+34", flag: "🇪🇸" },
  { pais: "Estados Unidos", code: "+1", flag: "🇺🇸" },
  { pais: "Francia", code: "+33", flag: "🇫🇷" },
  { pais: "Guatemala", code: "+502", flag: "🇬🇹" },
  { pais: "Honduras", code: "+504", flag: "🇭🇳" },
  { pais: "India", code: "+91", flag: "🇮🇳" },
  { pais: "Italia", code: "+39", flag: "🇮🇹" },
  { pais: "Japón", code: "+81", flag: "🇯🇵" },
  { pais: "México", code: "+52", flag: "🇲🇽" },
  { pais: "Nicaragua", code: "+505", flag: "🇳🇮" },
  { pais: "Panamá", code: "+507", flag: "🇵🇦" },
  { pais: "Paraguay", code: "+595", flag: "🇵🇾" },
  { pais: "Perú", code: "+51", flag: "🇵🇪" },
  { pais: "Portugal", code: "+351", flag: "🇵🇹" },
  { pais: "Puerto Rico", code: "+1", flag: "🇵🇷" },
  { pais: "Reino Unido", code: "+44", flag: "🇬🇧" },
  { pais: "República Dominicana", code: "+1", flag: "🇩🇴" },
  { pais: "Uruguay", code: "+598", flag: "🇺🇾" },
  { pais: "Venezuela", code: "+58", flag: "🇻🇪" },
];
