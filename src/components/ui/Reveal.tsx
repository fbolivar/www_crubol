"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode, ElementType } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Aparición al entrar en viewport: opacidad 0->1 y desplazamiento 32px->0.
 * Con prefers-reduced-motion, muestra el contenido en su estado final.
 */
export function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
  prioritario = false,
  ...props
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  /** Contenido above-the-fold: se pinta visible desde el primer render
   *  (sin gate de opacidad) para no penalizar el LCP. */
  prioritario?: boolean;
} & HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as "div"];

  if (reduce || prioritario) {
    const Tag = as as ElementType;
    return (
      <Tag className={className} {...(props as object)}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Contenedor que escalona la entrada de sus hijos <RevealItem> 90 ms.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={{
        oculto: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
