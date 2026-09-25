import { whatsapp } from "@/content";

/** Elige una de las líneas de WhatsApp al azar (balancea la atención). */
export function numeroWhatsAppAleatorio(): string {
  const nums = whatsapp.numeros;
  return nums[Math.floor(Math.random() * nums.length)];
}

/**
 * Construye el enlace wa.me con el mensaje ya redactado. Si no se pasa número,
 * se elige uno al azar entre las líneas configuradas.
 */
export function enlaceWhatsApp(mensaje: string, numero?: string): string {
  const num = numero ?? numeroWhatsAppAleatorio();
  return `https://wa.me/${num}?text=${encodeURIComponent(mensaje)}`;
}
