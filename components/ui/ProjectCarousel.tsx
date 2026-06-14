"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/cn";
import { ProjectImage, ACCENT } from "@/components/ui/ProjectImage";
import { Tag } from "@/components/ui/Tag";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import type { Project } from "@/data/projects";

const STEP_MAX = 40; // max degrees between cards — keeps few cards as a forward arc
const AUTO_MS = 4200; // auto-advance cadence
const DRAG_SENSITIVITY = 0.34; // degrees of rotation per pixel dragged

type Props = {
  projects: Project[];
  activeIndex: number;
  onActiveChange: (index: number) => void;
};

export function ProjectCarousel({ projects, activeIndex, onActiveChange }: Props) {
  const reduced = useReducedMotionPref();
  const n = projects.length;
  const step = Math.min(360 / n, STEP_MAX);
  const isRing = 360 / n <= STEP_MAX; // full cylinder vs. forward arc
  const angleFor = (i: number) => (i - (n - 1) / 2) * step;

  const stageRef = useRef<HTMLDivElement>(null);
  const rotation = useMotionValue(-angleFor(activeIndex));
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);

  const [dims, setDims] = useState({ cardW: 300, cardH: 345, radius: 360 });
  const [paused, setPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, rot: 0 });

  // Pause all carousel work while the section is scrolled out of view.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Measure the stage to derive card size + ring radius responsively.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      const cardW = Math.round(Math.max(208, Math.min(340, w * 0.62)));
      const cardH = Math.round(cardW * 1.15);
      const radius = Math.round(
        (cardW / 2) / Math.tan((step * Math.PI) / 180 / 2) * 1.06,
      );
      setDims({ cardW, cardH, radius });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [step]);

  // Animate rotation toward the active card whenever the active index changes.
  useEffect(() => {
    if (reduced) return;
    const current = rotation.get();
    let target = -angleFor(activeIndex);
    while (target - current > 180) target -= 360;
    while (target - current < -180) target += 360;
    controlsRef.current?.stop();
    controlsRef.current = animate(rotation, target, {
      type: "spring",
      stiffness: 90,
      damping: 18,
      mass: 0.9,
    });
    return () => controlsRef.current?.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, reduced, n, step]);

  // Auto-advance — gentle, paused on hover/focus/drag, off-screen, and reduced motion.
  useEffect(() => {
    if (reduced || paused || !onScreen || n < 2) return;
    const id = window.setInterval(() => {
      onActiveChange((activeIndex + 1) % n);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused, onScreen, n, activeIndex, onActiveChange]);

  const resolveIndex = (rot: number) => {
    const raw = Math.round(-rot / step + (n - 1) / 2);
    return isRing ? ((raw % n) + n) % n : Math.max(0, Math.min(n - 1, raw));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (reduced || e.button !== 0) return;
    controlsRef.current?.stop();
    dragging.current = true;
    setPaused(true);
    dragStart.current = { x: e.clientX, rot: rotation.get() };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    rotation.set(dragStart.current.rot + dx * DRAG_SENSITIVITY);
  };
  const endDrag = () => {
    if (!dragging.current) return;
    dragging.current = false;
    const next = resolveIndex(rotation.get());
    if (next === activeIndex) {
      // Re-snap to exact angle even when the index didn't change.
      animate(rotation, -angleFor(activeIndex), {
        type: "spring",
        stiffness: 90,
        damping: 18,
      });
    } else {
      onActiveChange(next);
    }
    setPaused(false);
  };

  // Controls always cycle so the last card's "Next" stays live (matches auto-advance).
  const go = (dir: 1 | -1) => {
    onActiveChange((((activeIndex + dir) % n) + n) % n);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  const active = projects[activeIndex];

  // ── Reduced-motion fallback: a static, responsive flat grid ──────────────
  if (reduced) {
    return (
      <div>
        <div
          role="group"
          aria-roledescription="project list"
          aria-label="Projects"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onActiveChange(i)}
              aria-pressed={i === activeIndex}
              className={cn(
                "rounded-2xl text-left transition-colors",
                i === activeIndex
                  ? "ring-1 ring-[var(--ring)]"
                  : "opacity-80 hover:opacity-100",
              )}
              style={
                {
                  ["--ring" as string]: ACCENT[p.accent].solid,
                } as React.CSSProperties
              }
            >
              <CardFace project={p} active={i === activeIndex} />
            </button>
          ))}
        </div>
        <CarouselStatus index={activeIndex} total={n} name={active.name} />
      </div>
    );
  }

  // ── 3D carousel ──────────────────────────────────────────────────────────
  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Projects"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        if (!dragging.current) setPaused(false);
      }}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
    >
      <div className="carousel-stage">
      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative z-[1] w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
        style={{ height: dims.cardH + 64, perspective: "2000px" }}
      >
        {/* Recenter shell — pulls the ring back so the front card lands on the
            screen plane (net Z = 0): no perspective warp, crisp text. */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translateZ(-${dims.radius}px)`,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              rotateY: rotation,
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {projects.map((p, i) => (
              <CarouselCard
                key={p.id}
                project={p}
                active={i === activeIndex}
                angle={angleFor(i)}
                radius={dims.radius}
                cardW={dims.cardW}
                cardH={dims.cardH}
                rotation={rotation}
                onSelect={() => onActiveChange(i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <CarouselButton label="Previous project" onClick={() => go(-1)}>
          <ArrowLeftIcon size={18} />
        </CarouselButton>

        <div className="flex items-center gap-2" aria-hidden="true">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              tabIndex={-1}
              onClick={() => onActiveChange(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === activeIndex
                  ? "w-6 bg-fg"
                  : "w-1.5 bg-fg-subtle/50 hover:bg-fg-subtle",
              )}
            />
          ))}
        </div>

        <CarouselButton label="Next project" onClick={() => go(1)}>
          <ArrowRightIcon size={18} />
        </CarouselButton>
      </div>

      <CarouselStatus index={activeIndex} total={n} name={active.name} />
    </div>
  );
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-fg-muted backdrop-blur-md transition-colors hover:border-white/25 hover:bg-white/[0.08] hover:text-fg"
    >
      {children}
    </button>
  );
}

function CarouselStatus({
  index,
  total,
  name,
}: {
  index: number;
  total: number;
  name: string;
}) {
  return (
    <p className="sr-only" aria-live="polite">
      Project {index + 1} of {total}: {name}
    </p>
  );
}

function CarouselCard({
  project,
  active,
  angle,
  radius,
  cardW,
  cardH,
  rotation,
  onSelect,
}: {
  project: Project;
  active: boolean;
  angle: number;
  radius: number;
  cardW: number;
  cardH: number;
  rotation: MotionValue<number>;
  onSelect: () => void;
}) {
  // World-facing angle of this card → emphasis (front cards larger/brighter).
  const front = useTransform(rotation, (r) => {
    let a = (r + angle) % 360;
    if (a > 180) a -= 360;
    if (a < -180) a += 360;
    return Math.max(0, Math.cos((a * Math.PI) / 180));
  });
  // Peeks stay bright enough to read as cards in light mode (`f^0.55` lifts the
  // near-front range), while genuinely back-facing cards still fade to 0. Depth
  // is carried by scale + a depth-of-field blur, not near-invisibility.
  const opacity = useTransform(front, (f) => Math.pow(f, 0.55));
  const scale = useTransform(front, (f) => 0.8 + 0.2 * f);
  const blurPx = useTransform(front, (f) => Math.min(4, (1 - f) * 6));
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: cardW,
        height: cardH,
        marginLeft: -cardW / 2,
        marginTop: -cardH / 2,
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.button
        type="button"
        onClick={onSelect}
        // Only the front card participates in the a11y tree / tab order.
        inert={!active}
        aria-hidden={!active}
        aria-label={`View ${project.name}`}
        style={{ opacity, scale, filter, backfaceVisibility: "hidden" }}
        className="block h-full w-full rounded-2xl"
      >
        <CardFace project={project} active={active} />
      </motion.button>
    </div>
  );
}

/**
 * Shared card visual (3D ring + flat fallback). Media-first and adaptive:
 *  - with a screenshot → the image IS the card; text is a secondary overlay.
 *  - without one → branded placeholder media + a compact text block.
 */
function CardFace({ project, active }: { project: Project; active: boolean }) {
  const label = project.caseStudy ? "Case Study" : "Project";
  const hasImage = Boolean(project.media?.image);

  return (
    <article
      className="relative flex h-full flex-col overflow-hidden rounded-2xl border transition-[box-shadow,border-color] duration-500"
      style={{
        background: "var(--surface-card)",
        borderColor: active
          ? "var(--surface-card-border-active)"
          : "var(--surface-card-border)",
        boxShadow: active ? "var(--shadow-card-active)" : "var(--shadow-card)",
      }}
    >
      {hasImage ? (
        <>
          {/* Media-dominant: screenshot fills the card, text reads off a scrim. */}
          <div className="absolute inset-0">
            <ProjectImage
              project={project}
              className="h-full w-full"
              sizes="(max-width: 640px) 80vw, 360px"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/45 to-transparent"
          />
          <div className="relative mt-auto p-5">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/70">
              {label}
            </p>
            <h3 className="mt-1.5 line-clamp-2 text-base font-medium tracking-tight text-white">
              {project.name}
            </h3>
          </div>
        </>
      ) : (
        <>
          <ProjectImage project={project} className="aspect-[16/10] w-full" />
          <div className="flex flex-1 flex-col p-5">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-fg-subtle">
              {label}
            </p>
            <h3 className="mt-2 line-clamp-2 text-base font-medium tracking-tight text-fg">
              {project.name}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.slice(0, 3).map((s) => (
                <li key={s}>
                  <Tag>{s}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </article>
  );
}
