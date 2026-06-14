"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";

/**
 * Engineering/systems lattice — a minimal node-graph rendered across three
 * Z-depth planes (CSS preserve-3d) that slowly rotates and reacts to scroll.
 * Reads as an architecture / data-flow diagram rather than an abstract shape.
 *
 * Each plane is a flat SVG (so edges are trivial + correct); the 3D illusion
 * comes from the planes' translateZ offsets parallaxing under one rotation.
 * Decorative only: aria-hidden, pointer-events-none, behind the headline.
 */

type Node = { x: number; y: number; tone: "cyan" | "violet" };

const NODES: Node[] = [
  { x: 50, y: 16, tone: "violet" },
  { x: 22, y: 36, tone: "cyan" },
  { x: 78, y: 34, tone: "cyan" },
  { x: 34, y: 62, tone: "violet" },
  { x: 66, y: 64, tone: "violet" },
  { x: 50, y: 86, tone: "cyan" },
  { x: 13, y: 72, tone: "cyan" },
  { x: 87, y: 70, tone: "violet" },
];

const EDGES: [number, number][] = [
  [0, 1], [0, 2], [1, 2], [1, 3], [2, 4],
  [3, 4], [3, 5], [4, 5], [1, 6], [2, 7], [6, 3], [7, 4],
];

// A couple of edges carry a travelling pulse to suggest data flow (kept minimal
// so the continuous SVG animation stays cheap).
const FLOWS: [number, number][] = [
  [0, 1], [3, 5],
];

function Lattice({
  animated,
  showEdges = true,
}: {
  animated: boolean;
  showEdges?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full overflow-visible"
      fill="none"
    >
      {showEdges &&
        EDGES.map(([a, b], i) => (
          <line
            key={`e${i}`}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="url(#ha-edge)"
            strokeWidth={0.45}
            strokeLinecap="round"
          />
        ))}

      {NODES.map((n, i) => (
        <g key={`n${i}`}>
          <circle
            cx={n.x}
            cy={n.y}
            r={3.4}
            fill={n.tone === "cyan" ? "url(#ha-cyan)" : "url(#ha-violet)"}
            opacity={0.55}
          />
          <circle
            cx={n.x}
            cy={n.y}
            r={1.25}
            fill={n.tone === "cyan" ? "#bcd6ff" : "#e0caff"}
            style={
              animated && i % 2 === 0
                ? {
                    animation: `ha-pulse ${3.5 + (i % 4) * 0.7}s ease-in-out ${i * 0.3}s infinite`,
                  }
                : undefined
            }
          />
        </g>
      ))}

      {animated &&
        FLOWS.map(([a, b], i) => (
          <circle key={`f${i}`} r={0.95} fill="#dce8ff">
            <animateMotion
              dur={`${3 + i * 0.8}s`}
              repeatCount="indefinite"
              path={`M${NODES[a].x},${NODES[a].y} L${NODES[b].x},${NODES[b].y}`}
            />
          </circle>
        ))}
    </svg>
  );
}

export function HeroArtifact({
  progress,
}: {
  progress?: MotionValue<number>;
}) {
  const reduced = useReducedMotionPref();

  // Scroll fallback so the hooks are unconditional even without a progress MV.
  const fallback = useMotionValue(0);
  const p = progress ?? fallback;

  // Skip the spin loop once the hero has scrolled out of view (it has faded to
  // 0 by ~0.72 progress) — avoids re-rasterizing the SVG every frame off-screen.
  const visibleRef = useRef(true);
  useMotionValueEvent(p, "change", (v) => {
    visibleRef.current = v < 0.8;
  });

  // Idle continuous spin (~45s/turn) — paused under reduced motion / off-screen.
  const idle = useMotionValue(0);
  useAnimationFrame((t) => {
    if (!reduced && visibleRef.current) idle.set((t / 1000) * 8);
  });

  const scrollRotY = useTransform(p, [0, 1], [0, 40]);
  const scrollRotX = useTransform(p, [0, 1], [11, -16]);
  const scrollZ = useTransform(p, [0, 1], [0, -150]);
  const scrollOpacity = useTransform(p, [0, 0.72], [0.62, 0]);

  const rotateY = useTransform(() =>
    reduced ? 20 : idle.get() + scrollRotY.get(),
  );
  const rotateX = useTransform(() => (reduced ? 12 : scrollRotX.get()));
  const z = useTransform(() => (reduced ? 0 : scrollZ.get()));

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-4%] top-1/2 hidden h-[clamp(22rem,40vw,38rem)] w-[clamp(22rem,40vw,38rem)] -translate-y-1/2 md:block lg:right-[3%]"
      style={{ perspective: "1200px" }}
    >
      {/* Shared gradient/glow defs (document-global ids, defined once). */}
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <defs>
          <linearGradient
            id="ha-edge"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="100"
            y2="100"
          >
            <stop offset="0%" stopColor="#5b8def" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#b47cff" stopOpacity="0.85" />
          </linearGradient>
          <radialGradient id="ha-cyan">
            <stop offset="0%" stopColor="#5b8def" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#5b8def" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ha-violet">
            <stop offset="0%" stopColor="#b47cff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#b47cff" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      <GlowOrb
        tone="duo"
        size={420}
        className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70"
      />

      <motion.div
        className="relative h-full w-full"
        style={{
          rotateX,
          rotateY,
          z,
          opacity: reduced ? 0.5 : scrollOpacity,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Back depth plane */}
        <div
          className="absolute inset-0"
          style={{
            transform: "translateZ(-170px) scale(0.82)",
            opacity: 0.4,
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        >
          <Lattice animated={false} />
        </div>

        {/* Main plane — carries pulses + data flow */}
        <div
          className="absolute inset-0"
          style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        >
          <Lattice animated={!reduced} />
        </div>

        {/* Front accent plane — glowing nodes only, for foreground depth */}
        <div
          className="absolute inset-0"
          style={{
            transform: "translateZ(150px) scale(1.1)",
            opacity: 0.5,
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        >
          <Lattice animated={false} showEdges={false} />
        </div>
      </motion.div>
    </div>
  );
}
