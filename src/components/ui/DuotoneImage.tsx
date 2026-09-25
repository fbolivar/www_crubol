import Image from "next/image";

/**
 * Foto con tratamiento duotono teal (ver .duotono en globals.css) para que las
 * fotografías de distinta procedencia se vean como un sistema con la marca.
 */
export function DuotoneImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`duotono overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
