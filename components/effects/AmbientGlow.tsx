"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Ambient gradient orbs that drift on scroll. Fixed-position, transform-only
 * (compositor-cheap), gated by prefers-reduced-motion.
 */
export function AmbientGlow() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const cyanX = useTransform(scrollYProgress, [0, 1], ["-6%", "8%"]);
  const cyanY = useTransform(scrollYProgress, [0, 1], ["-4%", "6%"]);
  const violetX = useTransform(scrollYProgress, [0, 1], ["6%", "-8%"]);
  const violetY = useTransform(scrollYProgress, [0, 1], ["4%", "-6%"]);
  const drift = useTransform(scrollYProgress, [0, 1], [0, -120]);

  if (prefersReduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-[3] overflow-hidden"
    >
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
    </div>
  );
}
