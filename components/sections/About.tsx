import { Section } from "@/components/ui/Section";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";

const stats = [
  {
    label: "Education",
    value: "B.Sc. Computer Science",
    detail: "Bachelor's degree — graduated",
  },
  {
    label: "Core focus",
    value: "C / C++ Engineering",
    detail: "Data structures, algorithms, systems thinking",
  },
  {
    label: "Looking for",
    value: "Junior software roles",
    detail: "Real-world systems, mentorship, ownership",
  },
];

const paragraphs = [
  "I graduated with a Bachelor's degree in Computer Science with a strong foundation in software development — particularly C and C++, where I've spent the most time sharpening data structures, algorithms, and problem-solving.",
  "I write code that's deliberate: efficient where it matters, readable everywhere else, and structured so the next person (often future me) can move quickly without breaking things.",
  "I'm now looking for a junior software developer role where I can contribute to real-world systems and keep growing alongside experienced engineers.",
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="01 — About"
      title={
        <>
          Engineer with a discipline for
          <br className="hidden sm:block" /> <span className="text-gradient">clarity, craft, and follow-through.</span>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal as="div" stagger={0.08}>
          <div className="space-y-5 text-base leading-relaxed text-fg-muted sm:text-lg">
            {paragraphs.map((p, i) => (
              <RevealItem key={i} as="div">
                <p>{p}</p>
              </RevealItem>
            ))}
          </div>
        </Reveal>

        <Reveal as="ul" stagger={0.08} className="grid gap-3 sm:gap-4">
          {stats.map((s) => (
            <RevealItem key={s.label} as="li">
              <GlassCard className="p-5 sm:p-6">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-fg-subtle">
                  {s.label}
                </p>
                <p className="mt-3 text-xl font-medium tracking-tight text-fg sm:text-2xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {s.detail}
                </p>
              </GlassCard>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
