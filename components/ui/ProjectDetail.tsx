"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ProjectImage, ACCENT } from "@/components/ui/ProjectImage";
import { Tag } from "@/components/ui/Tag";
import {
  ArrowUpRightIcon,
  GithubIcon,
  BookOpenIcon,
} from "@/components/ui/icons";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import type { Project } from "@/data/projects";

/**
 * Rich detail view for the active carousel project. Two-column on large
 * screens (visual + spec sheet), cross-fading on change. Guarantees the
 * Projects section has real depth even with only a couple of projects.
 */
export function ProjectDetail({
  project,
  onViewCaseStudy,
}: {
  project: Project;
  onViewCaseStudy: () => void;
}) {
  const reduced = useReducedMotionPref();
  const gallery = project.media?.gallery ?? [];
  // Selected gallery shot overrides the main visual.
  const [shot, setShot] = useState<string | null>(null);
  // Reset the gallery selection whenever the active project changes, so the
  // large visual always belongs to the current project (falls back to its
  // cover). Render-phase reset avoids the stale-image flash a useEffect reset
  // would cause under the AnimatePresence cross-fade below.
  const [shotProjectId, setShotProjectId] = useState(project.id);
  if (shotProjectId !== project.id) {
    setShotProjectId(project.id);
    setShot(null);
  }
  const shotKey = `${project.id}:${shot ?? "cover"}`;

  const fit = project.media?.fit ?? "cover";
  const objectClass =
    fit === "contain" ? "object-contain" : "object-cover object-top";
  const accent = ACCENT[project.accent];
  const frameStyle =
    fit === "contain"
      ? {
          backgroundImage: `radial-gradient(120% 100% at 50% 0%, ${accent.from}, ${accent.to} 72%)`,
        }
      : undefined;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12"
      >
        {/* Visual */}
        <div>
          <div
            className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.02]"
            style={frameStyle}
          >
            {shot ? (
              <Image
                key={shotKey}
                src={shot}
                alt={`${project.name} — detail screenshot`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={objectClass}
              />
            ) : (
              <ProjectImage
                project={project}
                className="h-full w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
          </div>

          {gallery.length > 0 && (
            <ul className="mt-3 flex gap-3">
              {[
                ...(project.media?.image
                  ? [{ src: project.media.image, alt: project.media.alt }]
                  : []),
                ...gallery,
              ].map((g) => (
                <li key={g.src}>
                  <button
                    type="button"
                    onClick={() => setShot(g.src)}
                    aria-label={g.alt ?? `${project.name} screenshot`}
                    className={cn(
                      "relative h-14 w-20 overflow-hidden rounded-lg border transition-colors",
                      shot === g.src
                        ? "border-white/35"
                        : "border-white/10 hover:border-white/25",
                    )}
                  >
                    <Image
                      src={g.src}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Spec sheet */}
        <div className="flex flex-col">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-fg-subtle">
            {project.caseStudy ? "Case Study" : "Project"}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-2 text-base text-fg-muted sm:text-lg">
            {project.tagline}
          </p>
          <p className="mt-5 text-pretty text-base leading-relaxed text-fg-muted">
            {project.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li key={s}>
                <Tag>{s}</Tag>
              </li>
            ))}
          </ul>

          <footer className="mt-8 flex flex-wrap items-center gap-3">
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

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-80"
              >
                Open App
                <ArrowUpRightIcon size={14} />
              </a>
            )}

            {project.caseStudy && (
              <button
                type="button"
                onClick={onViewCaseStudy}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-4 py-2 text-sm text-fg-muted transition-colors hover:border-[#b47cff]/30 hover:bg-[#b47cff]/[0.06] hover:text-fg"
              >
                <BookOpenIcon size={14} />
                Case Study
              </button>
            )}
          </footer>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
