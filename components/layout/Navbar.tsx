"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { siteMeta } from "@/data/socials";
import { MenuIcon, CloseIcon } from "@/components/ui/icons";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#timeline", label: "Approach" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[backdrop-filter,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "border-b border-white/[0.06] bg-bg/60 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:h-18 sm:px-8 3xl:max-w-7xl"
        >
          <a
            href="#top"
            className="group inline-flex items-center gap-2.5"
            aria-label={`${siteMeta.name} — home`}
          >
            <span
              aria-hidden="true"
              className="relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-md border border-white/10"
            >
              <span className="absolute inset-0 bg-gradient-to-br from-[#5b8def] to-[#b47cff] opacity-90" />
              <span className="relative font-mono text-[0.7rem] font-semibold text-white/95">
                TS
              </span>
            </span>
            <span className="font-mono text-sm tracking-[0.16em] text-fg/90 group-hover:text-fg">
              TAY&nbsp;SHOFER
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative inline-flex items-center rounded-full px-3.5 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-fg transition-colors hover:border-white/20 hover:bg-white/[0.07]"
            >
              <span className="relative z-[1]">Get in touch</span>
              <span
                aria-hidden="true"
                className="relative z-[1] h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#5b8def] to-[#b47cff]"
              />
            </a>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-fg md:hidden"
          >
            <MenuIcon size={20} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-[60] md:hidden"
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-bg/85 backdrop-blur-xl"
            />
            <motion.div
              className="absolute inset-x-3 bottom-3 top-20 flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-bg-elevated/95 p-6"
              initial={prefersReduced ? false : { y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={prefersReduced ? { opacity: 0 } : { y: 16, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.28em] text-fg-muted">
                  Menu
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-fg"
                >
                  <CloseIcon size={20} />
                </button>
              </div>
              <ul className="mt-10 flex flex-col gap-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-3 py-4 text-2xl font-medium tracking-tight text-fg transition-colors hover:bg-white/[0.04]"
                    >
                      {l.label}
                      <span
                        aria-hidden="true"
                        className="text-fg-subtle group-hover:text-fg"
                      >
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#5b8def] to-[#b47cff] px-5 py-3 text-base font-medium text-bg"
                >
                  Get in touch
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
