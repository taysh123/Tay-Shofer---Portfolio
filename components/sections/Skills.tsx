"use client";

import { useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { Tilt } from "@/components/ui/Tilt";
import { SparkIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { skillGroups, type SkillGroup } from "@/data/skills";

export function Skills() {
  // Promote AI card to the first/featured slot.
  const ordered = [...skillGroups].sort((a, b) => {
    if (a.id === "ai") return -1;
    if (b.id === "ai") return 1;
    return 0;
  });

  return (
    <Section
      id="skills"
      eyebrow="02 — Toolkit"
      title={<>What I work with</>}
      intro="A practical stack — sharpened in coursework, projects, and AI-assisted iteration."
    >
      <Reveal
        as="ul"
        stagger={0.08}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        {ordered.map((group, i) => (
          <RevealItem
            key={group.id}
            as="li"
            className={cn(i === 0 ? "xl:col-span-2" : "")}
          >
            <Tilt className="h-full">
              <SkillCard group={group} index={i} featured={group.id === "ai"} />
            </Tilt>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}

function SkillCard({
  group,
  index,
  featured,
}: {
  group: SkillGroup;
  index: number;
  featured: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty(
      "--hx",
      `${((e.clientX - rect.left) / rect.width) * 100}%`,
    );
    el.style.setProperty(
      "--hy",
      `${((e.clientY - rect.top) / rect.height) * 100}%`,
    );
    el.dataset.hover = "true";
  };

  const onLeave = () => {
    if (ref.current) ref.current.dataset.hover = "false";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "group relative isolate h-full overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-[transform,border-color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-7",
        featured
          ? "border-white/15 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-white/[0.05] hover:border-white/25"
          : "border-white/[0.10] bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.05]",
      )}
    >
      <span aria-hidden="true" className="hover-halo" />

      {featured && (
        <>
          {/* AI card halo + sweep */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-[#5b8def]/40 via-[#b47cff]/35 to-transparent opacity-80 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -bottom-24 h-64 w-64 rounded-full bg-gradient-to-br from-[#b47cff]/25 to-transparent opacity-70 blur-3xl"
          />
          <span
            aria-hidden="true"
            className="ai-sweep pointer-events-none absolute left-0 top-0 h-px w-1/3 bg-gradient-to-r from-transparent via-[#b47cff] to-transparent"
          />
        </>
      )}

      {!featured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-[#5b8def]/22 to-[#b47cff]/16 opacity-50 blur-3xl"
        />
      )}

      <div className="relative flex items-center justify-between gap-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-fg-subtle">
          {String(index + 1).padStart(2, "0")} · {group.caption}
        </p>
        {featured && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/30 bg-violet-400/[0.08] px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fg">
            <SparkIcon size={12} className="text-[#b47cff]" />
            Modern edge
          </span>
        )}
      </div>
      <h3
        className={cn(
          "relative mt-3 font-medium tracking-tight text-fg",
          featured ? "text-2xl sm:text-3xl" : "text-2xl sm:text-[1.6rem]",
        )}
      >
        {group.title}
      </h3>
      <ul className="relative mt-6 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li key={item.label}>
            <Tag
              emphasis={
                featured || item.emphasis === "advanced" ? "accent" : "default"
              }
            >
              {item.label}
              {item.emphasis === "advanced" && (
                <span aria-hidden="true" className="ml-1.5 opacity-70">
                  ✦
                </span>
              )}
            </Tag>
          </li>
        ))}
      </ul>
    </div>
  );
}
