"use client";

import { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useAccessibility } from "@/components/providers/AccessibilityProvider";
import { AccessibilityIcon, XIcon } from "@/components/ui/icons";

type ToggleRowProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  id: string;
};

function ToggleRow({ label, description, checked, onChange, id }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-fg cursor-pointer">
          {label}
        </label>
        <p className="mt-0.5 text-xs text-fg-muted">{description}</p>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={[
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b47cff] focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          checked
            ? "border-[#b47cff] bg-[#b47cff]/20"
            : "border-white/20 bg-white/[0.06]",
        ].join(" ")}
      >
        <span
          className={[
            "pointer-events-none inline-block h-4 w-4 transform rounded-full shadow-lg transition-transform duration-200",
            checked
              ? "translate-x-5 bg-[#b47cff]"
              : "translate-x-0.5 bg-fg-subtle",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

export function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const { reducedMotion, highContrast, largeText, toggle } = useAccessibility();
  const prefersReduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.[0]?.focus();
  }, [open]);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Accessibility settings"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-72 overflow-hidden rounded-2xl border border-white/[0.12] bg-bg-elevated/95 p-5 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-fg-subtle">
                Accessibility
              </h2>
              <button
                type="button"
                aria-label="Close accessibility panel"
                onClick={() => setOpen(false)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-fg-muted transition-colors hover:text-fg"
              >
                <XIcon size={14} />
              </button>
            </div>

            <div className="mt-2 divide-y divide-white/[0.06]">
              <ToggleRow
                id="a11y-reduced-motion"
                label="Reduced Motion"
                description="Minimize animations and transitions"
                checked={reducedMotion}
                onChange={() => toggle("reducedMotion")}
              />
              <ToggleRow
                id="a11y-high-contrast"
                label="High Contrast"
                description="Increase text and border contrast"
                checked={highContrast}
                onChange={() => toggle("highContrast")}
              />
              <ToggleRow
                id="a11y-large-text"
                label="Larger Text"
                description="Increase the base font size"
                checked={largeText}
                onChange={() => toggle("largeText")}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Accessibility settings"
        aria-expanded={open}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-bg-elevated/90 text-fg-muted shadow-lg backdrop-blur-sm transition-colors hover:border-white/20 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b47cff] focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <AccessibilityIcon size={18} />
      </button>
    </div>
  );
}
