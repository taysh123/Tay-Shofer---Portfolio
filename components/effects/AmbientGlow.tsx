"use client";

import { useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Ambient gradient orbs that drift on scroll + react to mouse position.
 * Fixed-position, transform-only (compositor-cheap), gated by prefers-reduced-motion.
 */
export function AmbientGlow() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const cyanX = useTransform(scrollYProgress, [0, 1], ["-6%", "8%"]);
  const cyanY = useTransform(scrollYProgress, [0, 1], ["-4%", "6%"]);
  const violetX = useTransform(scrollYProgress, [0, 1], ["6%", "-8%"]);
  const violetY = useTransform(scrollYProgress, [0, 1], ["4%", "-6%"]);
  const drift = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // Mouse-reactive glow overlay via CSS custom properties
  useEffect(() => {
    if (prefersReduced) return;
    let rafId: number;
    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
    };

    const tick = () => {
      // Smooth lerp toward target
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      document.documentElement.style.setProperty("--mouse-x", `${currentX}%`);
      document.documentElement.style.setProperty("--mouse-y", `${currentY}%`);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafId);
      document.documentElement.style.removeProperty("--mouse-x");
      document.documentElement.style.removeProperty("--mouse-y");
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-[3] overflow-hidden"
    >
      {/* Scroll-driven orbs */}
      <motion.div
        style={{ x: cyanX, y: cyanY }}
        className="absolute -left-[20%] top-[8%] h-[42rem] w-[42rem] rounded-full opacity-70 blur-[120px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(91,141,239,0.30), rgba(91,141,239,0) 70%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ x: violetX, y: violetY }}
        className="absolute -right-[18%] top-[42%] h-[40rem] w-[40rem] rounded-full opacity-70 blur-[120px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(180,124,255,0.28), rgba(180,124,255,0) 70%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: drift }}
        className="absolute left-1/2 top-[120%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-60 blur-[110px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(91,141,239,0.22), rgba(180,124,255,0.16) 45%, rgba(180,124,255,0) 75%)",
          }}
        />
      </motion.div>

      {/* Mouse-reactive glow layer */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(44rem 44rem at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(180,124,255,0.055), transparent 65%)",
          transition: "background 0.05s linear",
        }}
      />
    </div>
  );
}
