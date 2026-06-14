"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { ProjectCarousel } from "@/components/ui/ProjectCarousel";
import { ProjectDetail } from "@/components/ui/ProjectDetail";
import { CaseStudyPanel } from "@/components/ui/CaseStudyPanel";
import { projects } from "@/data/projects";

// Featured projects first; index drives both the carousel and the detail panel.
const sorted = [...projects].sort(
  (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
);

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showCaseStudy, setShowCaseStudy] = useState(false);

  const active = sorted[activeIndex];

  return (
    <>
      <Section
        id="projects"
        eyebrow="03 — Selected work"
        title={<>Projects I&apos;m proud of</>}
        intro="A small set of focused builds. Each one is end-to-end — designed, written, and shipped from scratch. Spin the carousel or use the arrows to explore."
      >
        <ProjectCarousel
          projects={sorted}
          activeIndex={activeIndex}
          onActiveChange={setActiveIndex}
        />

        <div className="mt-10 sm:mt-12 lg:mt-14">
          <ProjectDetail
            project={active}
            onViewCaseStudy={() => setShowCaseStudy(true)}
          />
        </div>
      </Section>

      <CaseStudyPanel
        project={showCaseStudy ? active : null}
        onClose={() => setShowCaseStudy(false)}
      />
    </>
  );
}
