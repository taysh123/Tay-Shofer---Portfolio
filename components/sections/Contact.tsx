"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Magnetic } from "@/components/ui/Magnetic";
import {
  PhoneIcon,
  GithubIcon,
  LinkedinIcon,
  ArrowUpRightIcon,
} from "@/components/ui/icons";
import { socials } from "@/data/socials";
import { decodePhone } from "@/lib/obfuscate";

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="05 — Contact"
      title={
        <>
          Let&apos;s build something
          <br className="hidden sm:block" />{" "}
          <span className="text-gradient">worth shipping.</span>
        </>
      }
      intro="If you're hiring, collaborating, or just want to say hi — I'd love to hear from you."
    >
      <Reveal as="div" className="relative">
        <GlassCard className="relative p-7 sm:p-10 lg:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#5b8def]/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-[#b47cff]/20 blur-3xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-fg-subtle">
                Primary channel
              </p>
              <Magnetic strength={6} className="mt-4 inline-block">
                <a
                  href={`mailto:${socials.email}?subject=${encodeURIComponent("Hi Tay")}`}
                  className="group inline-flex flex-wrap items-baseline gap-2 text-balance text-2xl font-medium tracking-tight text-fg transition-colors hover:text-fg sm:text-4xl lg:text-5xl"
                  style={{ fontSize: "clamp(1.5rem, 3.8vw, 3rem)" }}
                >
                  {socials.email}
                  <span
                    aria-hidden="true"
                    className="inline-flex h-7 w-7 -translate-y-1 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-fg-muted transition-all duration-500 group-hover:translate-y-[-6px] group-hover:border-white/25 group-hover:text-fg sm:h-10 sm:w-10"
                  >
                    <ArrowUpRightIcon size={16} />
                  </span>
                </a>
              </Magnetic>

              <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <li>
                  <a
                    href={socials.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-fg transition-colors hover:border-white/25 hover:bg-white/[0.07]"
                  >
                    <GithubIcon size={16} />
                    github.com/{socials.github.handle}
                    <ArrowUpRightIcon size={14} />
                  </a>
                </li>
                <li>
                  <a
                    href={socials.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-fg transition-colors hover:border-white/25 hover:bg-white/[0.07]"
                  >
                    <LinkedinIcon size={16} />
                    LinkedIn — {socials.linkedin.label}
                    <ArrowUpRightIcon size={14} />
                  </a>
                </li>
                <li>
                  <PhoneReveal />
                </li>
              </ul>
            </div>

            <address className="not-italic">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-fg-subtle">
                Status
              </p>
              <p className="mt-4 text-balance text-lg leading-relaxed text-fg-muted sm:text-xl">
                Open to junior software developer roles — onsite, hybrid, or
                remote. I respond fast, write clearly, and care about the work.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-fg-muted">
                <li className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="relative inline-flex h-2 w-2"
                  >
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
                    <span className="relative inline-block h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Available now
                </li>
                <li className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-block h-2 w-2 rounded-full bg-white/40"
                  />
                  Time zone: Israel (GMT+3)
                </li>
                <li className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-block h-2 w-2 rounded-full bg-white/40"
                  />
                  Working in English
                </li>
              </ul>
            </address>
          </div>
        </GlassCard>
      </Reveal>
    </Section>
  );
}

function PhoneReveal() {
  const [revealed, setRevealed] = useState<string | null>(null);

  const handleReveal = () => {
    if (revealed) return;
    setRevealed(decodePhone(socials.phoneEncoded));
  };

  return (
    <>
      {revealed ? (
        <a
          href={`tel:${revealed.replace(/[^0-9+]/g, "")}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-fg transition-colors hover:border-white/25 hover:bg-white/[0.07]"
        >
          <PhoneIcon size={16} />
          {revealed}
          <ArrowUpRightIcon size={14} />
        </a>
      ) : (
        <button
          type="button"
          onClick={handleReveal}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-fg-muted transition-colors hover:border-white/25 hover:bg-white/[0.07] hover:text-fg"
          aria-label="Reveal phone number"
        >
          <PhoneIcon size={16} />
          Reveal phone
        </button>
      )}
    </>
  );
}

