"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { SunIcon, MoonIcon } from "@/components/ui/icons";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const prefersReduced = useReducedMotion();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={[
        "relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-fg-muted transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-fg focus-visible:outline-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={prefersReduced ? false : { opacity: 0, rotate: -30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, rotate: 30, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <MoonIcon size={16} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={prefersReduced ? false : { opacity: 0, rotate: 30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, rotate: -30, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            <SunIcon size={16} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
