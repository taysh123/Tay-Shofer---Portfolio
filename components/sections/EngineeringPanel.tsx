"use client";

import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Tilt";
import {
  ZapIcon,
  SmartphoneIcon,
  SparkIcon,
  AccessibilityIcon,
  LayersIcon,
  CpuIcon,
} from "@/components/ui/icons";

type Pillar = {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: "cyan" | "violet";
};

const pillars: Pillar[] = [
  {
    icon: <ZapIcon size={18} />,
    title: "Performance-First",
    description:
      "Lighthouse-optimized builds. Transform-only animations, lazy loading, and zero layout shift. Every millisecond counts.",
    accent: "cyan",
  },
  {
    icon: <SmartphoneIcon size={18} />,
    title: "Mobile-First Design",
    description:
      "Responsive from 375px up. Fluid typography, touch-friendly targets, and layouts that feel native on any screen.",
    accent: "violet",
  },
  {
    icon: <SparkIcon size={18} />,
    title: "AI-Native Workflow",
    description:
      "Claude as a daily pair programmer — validating logic, generating test cases, reviewing architecture, and speeding up delivery.",
    accent: "cyan",
  },
  {
    icon: <AccessibilityIcon size={18} />,
    title: "Accessibility-First",
    description:
      "WCAG AA contrast, focus management, screen reader support, keyboard navigation, and prefers-reduced-motion throughout.",
    accent: "violet",
  },
  {
    icon: <LayersIcon size={18} />,
    title: "Clean Architecture",
    description:
      "Component-driven, data-separated, and typed end-to-end. Designed to be understood at a glance and extended without pain.",
    accent: "cyan",
  },
  {
    icon: <CpuIcon size={18} />,
    title: "Production Deployed",
    description:
      "Every project is shipped on Vercel with automatic preview deployments, proper metadata, SEO, and OG images.",
    accent: "violet",
  },
];

const accentClasses = {
  cyan: {
    icon: "text-[#5b8def] bg-[#5b8def]/10 border-[#5b8def]/20",
    glow: "from-[#5b8def]/20 to-transparent",
  },
  violet: {
    icon: "text-[#b47cff] bg-[#b47cff]/10 border-[#b47cff]/20",
    glow: "from-[#b47cff]/20 to-transparent",
  },
};

export function EngineeringPanel() {
  return (
    <Section
      id="approach"
      eyebrow="04 — Approach"
      title={<>Built for performance and people</>}
      intro="From C and C++ foundations to shipped, polished products — the principles that shape every decision I make, from architecture to animation timing."
    >
      <Reveal
        as="ul"
        stagger={0.09}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {pillars.map((p) => {
          const ac = accentClasses[p.accent];
          return (
            <RevealItem key={p.title} as="li">
              <Tilt className="h-full">
              <GlassCard
                interactive
                className="group relative flex h-full flex-col gap-4 overflow-hidden p-6"
              >
                {/* Subtle corner glow */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br blur-2xl ${ac.glow} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                <span
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border ${ac.icon}`}
                  aria-hidden="true"
                >
                  {p.icon}
                </span>

                <div>
                  <h3 className="text-base font-semibold tracking-tight text-fg">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                    {p.description}
                  </p>
                </div>
              </GlassCard>
              </Tilt>
            </RevealItem>
          );
        })}
      </Reveal>
    </Section>
  );
}
