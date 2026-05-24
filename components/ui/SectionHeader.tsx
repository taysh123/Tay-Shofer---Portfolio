"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { lineGrow, maskReveal, viewportOnce } from "@/lib/motion";

type SectionHeaderProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
}: SectionHeaderProps) {
  const prefersReduced = useReducedMotion();

  return (
    <header
      className={cn(
        "mb-12 sm:mb-16 lg:mb-20",
        align === "center" && "mx-auto max-w-2xl text-center",
      )}
    >
      {eyebrow && (
        <motion.div
          className={cn(
            "flex items-center gap-3",
            align === "center" && "justify-center",
          )}
          initial={prefersReduced ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.span
            aria-hidden="true"
            variants={prefersReduced ? undefined : lineGrow}
            className="inline-block h-px w-8 origin-left bg-gradient-to-r from-[#5b8def] to-[#b47cff]"
          />
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-fg-muted sm:text-xs">
            <span className="text-gradient">{eyebrow}</span>
          </p>
        </motion.div>
      )}
      {title && (
        <motion.h2
          id={id ? `${id}-title` : undefined}
          initial={prefersReduced ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
          variants={prefersReduced ? undefined : maskReveal}
          className="mt-5 text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-4xl lg:text-5xl"
          style={{ fontSize: "clamp(1.875rem, 3.6vw, 3.25rem)" }}
        >
          {title}
        </motion.h2>
      )}
      {intro && (
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: [0.2, 0.9, 0.25, 1], delay: 0.15 }}
          className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg"
        >
          {intro}
        </motion.p>
      )}
    </header>
  );
}
