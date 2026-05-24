"use client";

import { useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { Magnetic } from "@/components/ui/Magnetic";
import { ArrowUpRightIcon, GithubIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { projects, type Project } from "@/data/projects";

const accentMap: Record<Project["accent"], string> = {
  cyan: "from-[#5b8def]/40 via-[#5b8def]/10 to-transparent",
  violet: "from-[#b47cff]/40 via-[#b47cff]/10 to-transparent",
  amber: "from-amber-300/30 via-amber-200/10 to-transparent",
};

export function Projects() {
  const sorted = [...projects].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  );

  return (
    <Section
      id="projects"
      eyebrow="03 — Selected work"
      title={<>Projects I'm proud of</>}
      intro="A small set of focused builds. Each one is end-to-end — designed, written, and shipped from scratch."
    >
      <Reveal
        as="ul"
        stagger={0.12}
        className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2"
      >
        {sorted.map((p) => (
          <RevealItem
            key={p.id}
            as="li"
            className={cn(p.featured && "lg:col-span-2")}
          >
            <ProjectCard project={p} />
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const featured = !!project.featured;

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
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
    <Magnetic strength={featured ? 8 : 6} className="block h-full">
      <article
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={cn(
          "group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.10] bg-white/[0.035] p-7 backdrop-blur-xl transition-[border-color,background-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/20 hover:bg-white/[0.05] sm:p-9",
          featured && "lg:p-12 3xl:p-16",
        )}
      >
        <span aria-hidden="true" className="hover-halo" />
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full blur-3xl",
            "bg-gradient-to-br",
            accentMap[project.accent],
          )}
        />

        <header className="relative flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-fg-subtle">
              {featured ? "Featured" : "Project"}
              {project.year && ` · ${project.year}`}
            </p>
            <h3
              className={cn(
                "mt-3 text-3xl font-semibold tracking-tight text-fg",
                featured && "sm:text-4xl lg:text-5xl 3xl:text-6xl",
              )}
            >
              {project.name}
            </h3>
            <p
              className={cn(
                "mt-2 text-base text-fg-muted",
                featured && "text-lg sm:text-xl",
              )}
            >
              {project.tagline}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-fg-muted transition-all duration-500 group-hover:border-white/30 group-hover:bg-white/[0.08] group-hover:text-fg sm:inline-flex"
          >
            <ArrowUpRightIcon size={20} />
          </span>
        </header>

        <p
          className={cn(
            "relative mt-8 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg",
            featured && "lg:max-w-3xl",
          )}
        >
          {project.description}
        </p>

        <ul className="relative mt-7 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>

        <footer className="relative mt-auto flex flex-wrap items-center gap-3 pt-9">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-4 py-2 text-sm text-fg transition-colors hover:border-white/30 hover:bg-white/[0.08]"
          >
            <GithubIcon size={16} />
            View on GitHub
            <ArrowUpRightIcon size={14} />
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg"
            >
              Live demo
              <ArrowUpRightIcon size={14} />
            </a>
          )}
        </footer>
      </article>
    </Magnetic>
  );
}
