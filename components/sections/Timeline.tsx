import { Section } from "@/components/ui/Section";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { timeline } from "@/data/timeline";

export function Timeline() {
  return (
    <Section
      id="timeline"
      eyebrow="04 — Approach"
      title={<>What I build, and how</>}
      intro="Four principles that shape the code I write and the products I want to be part of."
    >
      <Reveal as="ol" stagger={0.08} className="relative">
        <div
          aria-hidden="true"
          className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent sm:left-6"
        />
        <ul className="space-y-10 sm:space-y-14">
          {timeline.map((entry, i) => (
            <RevealItem key={entry.id} as="li" className="relative pl-12 sm:pl-20">
              <div
                aria-hidden="true"
                className="absolute left-0 top-1.5 flex h-9 w-9 items-center justify-center sm:h-12 sm:w-12"
              >
                <span className="absolute inset-0 rounded-full border border-white/12 bg-bg-elevated/80 backdrop-blur-md" />
                <span className="relative font-mono text-[0.7rem] tracking-[0.18em] text-fg-muted sm:text-xs">
                  0{i + 1}
                </span>
                <span className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#5b8def]/20 to-[#b47cff]/20 opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100" />
              </div>
              <h3 className="text-xl font-medium tracking-tight text-fg sm:text-2xl">
                {entry.title}
              </h3>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
                {entry.body}
              </p>
            </RevealItem>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
