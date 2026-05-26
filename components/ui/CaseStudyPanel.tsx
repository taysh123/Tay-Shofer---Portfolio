"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { type Project } from "@/data/projects";
import { GithubIcon, ArrowUpRightIcon, XIcon } from "@/components/ui/icons";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export function CaseStudyPanel({ project, onClose }: Props) {
  const prefersReduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    setTimeout(() => closeRef.current?.focus(), 50);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && project.caseStudy && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} — Case Study`}
            initial={
              prefersReduced
                ? { opacity: 0 }
                : { x: "100%", opacity: 0 }
            }
            animate={{ x: 0, opacity: 1 }}
            exit={
              prefersReduced
                ? { opacity: 0 }
                : { x: "100%", opacity: 0 }
            }
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-[61] flex w-full flex-col overflow-y-auto border-l border-white/[0.08] bg-bg-elevated/98 shadow-2xl backdrop-blur-xl sm:max-w-xl lg:max-w-2xl"
          >
            {/* Header */}
            <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/[0.06] bg-bg-elevated/95 px-6 py-5 backdrop-blur-sm sm:px-8">
              <div className="min-w-0">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-fg-subtle">
                  Case Study
                </p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                  {project.name}
                </h2>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-fg px-3 py-1.5 text-xs font-medium text-bg transition-opacity hover:opacity-80"
                  >
                    Live demo
                    <ArrowUpRightIcon size={12} />
                  </a>
                )}
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs text-fg transition-colors hover:border-white/25 hover:bg-white/[0.08]"
                >
                  <GithubIcon size={12} />
                  GitHub
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  aria-label="Close case study"
                  onClick={onClose}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-fg-muted transition-colors hover:border-white/20 hover:text-fg"
                >
                  <XIcon size={16} />
                </button>
              </div>
            </header>

            {/* Body */}
            <div className="flex-1 space-y-8 px-6 py-8 sm:px-8">
              {/* Architecture */}
              <Section title="Architecture">
                <p className="text-base leading-relaxed text-fg-muted">
                  {project.caseStudy.architecture}
                </p>
              </Section>

              {/* Challenges */}
              <Section title="Challenges Solved">
                <ul className="space-y-2.5">
                  {project.caseStudy.challenges.map((c, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b47cff]"
                      />
                      <span className="text-sm leading-relaxed text-fg-muted">{c}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              {/* Decisions */}
              <Section title="Engineering Decisions">
                <ul className="space-y-2.5">
                  {project.caseStudy.decisions.map((d, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5b8def]"
                      />
                      <span className="text-sm leading-relaxed text-fg-muted">{d}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              {/* Learned */}
              <Section title="What I Learned">
                <ul className="space-y-2.5">
                  {project.caseStudy.learned.map((l, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fg-subtle"
                      />
                      <span className="text-sm leading-relaxed text-fg-muted">{l}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              {/* AI Workflow */}
              {project.caseStudy.aiWorkflow && (
                <Section title="AI-Assisted Workflow">
                  <div className="rounded-xl border border-[#b47cff]/20 bg-[#b47cff]/[0.06] p-4">
                    <p className="text-sm leading-relaxed text-fg-muted">
                      {project.caseStudy.aiWorkflow}
                    </p>
                  </div>
                </Section>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-fg-subtle">
        {title}
      </h3>
      {children}
    </section>
  );
}
