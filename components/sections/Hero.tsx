"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { siteMeta } from "@/data/socials";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { HeroArtifact } from "@/components/effects/HeroArtifact";
import { Magnetic } from "@/components/ui/Magnetic";
import { ArrowDownIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { easeOutExpo, easeSpringSoft } from "@/lib/motion";

const subtitleWords = siteMeta.tagline.split(" ");

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const orbY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReduced ? 0 : 180],
  );

  const gridY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReduced ? 0 : -80],
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReduced ? 0 : 60],
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.85],
    [1, prefersReduced ? 1 : 0],
  );

  const baseTransition = {
    duration: 0.9,
    ease: easeSpringSoft,
  } as const;

  return (
    <section
      id="top"
      ref={containerRef}
      aria-label="Introduction"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:min-h-[110vh] 3xl:pt-48"
    >
      {/* Counter-parallax grid mask */}
      <motion.div
        aria-hidden="true"
        style={{ y: gridY }}
        className="pointer-events-none absolute inset-0 -z-20 opacity-50"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 70% 50% at 50% 35%, #000 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 50% at 50% 35%, #000 30%, transparent 80%)",
          }}
        />
      </motion.div>

      {/* Parallax orb cluster */}
      <motion.div
        aria-hidden="true"
        style={{ y: orbY }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <GlowOrb
          tone="duo"
          size={760}
          className="left-1/2 top-[10%] -translate-x-1/2 opacity-90"
        />

        <GlowOrb
          tone="cyan"
          size={460}
          className="-left-20 top-1/2 opacity-70"
        />

        {/* Floating orb */}
        <motion.div
          animate={
            prefersReduced
              ? undefined
              : { y: [0, -14, 0] }
          }
          transition={
            prefersReduced
              ? undefined
              : {
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="absolute -right-20 top-[33%]"
        >
          <GlowOrb
            tone="violet"
            size={460}
            className="opacity-70"
          />
        </motion.div>
      </motion.div>

      {/* Engineering/systems lattice — scroll-reactive 3D centerpiece */}
      <HeroArtifact progress={scrollYProgress} />

      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
        className="relative mx-auto w-full max-w-5xl 3xl:max-w-6xl"
      >
        {/* Availability */}
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...baseTransition, delay: 0.1 }}
          className="font-mono text-xs uppercase tracking-[0.32em] text-fg-muted sm:text-[0.8rem]"
        >
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="relative inline-flex h-1.5 w-1.5"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-[#b47cff]/60" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#5b8def] to-[#b47cff]" />
            </span>

            Available for software development roles
          </span>
        </motion.p>

        {/* Main title */}
        <h1
          className="mt-6 text-balance font-semibold leading-[0.95] tracking-tight text-fg sm:mt-8"
          style={{
            fontSize: "clamp(2.75rem, 8.2vw, 7rem)",
          }}
        >
          <span className="sr-only">{siteMeta.name}</span>

          <SplitReveal
            text="Tay"
            delay={0.18}
            reduced={!!prefersReduced}
          />

          <br />

          <SplitReveal
            text="Shofer."
            delay={0.32}
            reduced={!!prefersReduced}
            gradient
          />
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.55,
            ease: easeOutExpo,
          }}
          className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted sm:text-xl 3xl:text-2xl"
        >
          {subtitleWords.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={prefersReduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.6 + i * 0.018,
                ease: easeOutExpo,
              }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.05,
            ease: easeOutExpo,
          }}
          className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:items-center sm:gap-4"
        >
          <Magnetic>
            <a
              href="#projects"
              className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-fg px-6 text-sm font-medium text-bg transition-transform duration-300 hover:scale-[1.02] sm:h-14 sm:text-base"
            >
              <span className="relative z-[1]">
                View Work
              </span>

              <ArrowUpRightIcon
                size={18}
                className="relative z-[1]"
              />

              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-[#5b8def] to-[#b47cff] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm font-medium text-fg backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/[0.08] sm:h-14 sm:text-base"
            >
              Get in touch
            </a>
          </Magnetic>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-20 flex items-center gap-3 text-fg-subtle sm:mt-28"
          aria-hidden="true"
        >
          <span className="hairline w-12" />

          <span className="font-mono text-[0.7rem] uppercase tracking-[0.28em]">
            Scroll
          </span>

          <motion.span
            animate={
              prefersReduced
                ? undefined
                : { y: [0, 4, 0] }
            }
            transition={
              prefersReduced
                ? undefined
                : {
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
            className="inline-flex"
          >
            <ArrowDownIcon size={16} />
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}

function SplitReveal({
  text,
  delay,
  reduced,
  gradient,
}: {
  text: string;
  delay: number;
  reduced: boolean;
  gradient?: boolean;
}) {
  return (
    <span
      className={
        gradient
          ? "text-gradient inline-block"
          : "inline-block"
      }
    >
      <motion.span
        initial={reduced ? false : { y: "110%" }}
        animate={{ y: "0%" }}
        transition={{
          duration: 1.05,
          delay,
          ease: easeOutExpo,
        }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </span>
  );
}