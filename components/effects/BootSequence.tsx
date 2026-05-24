"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function BootSequence() {
  const [done, setDone] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setDone(true);
      return;
    }
    const t = window.setTimeout(() => setDone(true), 700);
    return () => window.clearTimeout(t);
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-white/10"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-br from-[#5b8def] to-[#b47cff]"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="relative font-mono text-sm font-semibold tracking-[0.12em] text-white">
              TS
            </span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
