import { whatsapp, type CanalWhatsApp } from "@/content";

/** Construye el enlace wa.me con el mensaje ya redactado para el canal. */
export function enlaceWhatsApp(canal: CanalWhatsApp): string {
  const { numero, mensaje } = whatsapp[canal];
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}
