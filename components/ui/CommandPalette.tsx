"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { SearchIcon, ArrowUpRightIcon } from "@/components/ui/icons";

type Command = {
  id: string;
  label: string;
  category: string;
  description?: string;
  action: () => void;
  shortcut?: string;
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function openLink(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const prefersReduced = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIdx(0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const commands: Command[] = [
    {
      id: "nav-home",
      label: "Go to Home",
      category: "Navigate",
      action: () => { close(); scrollTo("top"); },
    },
    {
      id: "nav-about",
      label: "Go to About",
      category: "Navigate",
      action: () => { close(); scrollTo("about"); },
    },
    {
      id: "nav-skills",
      label: "Go to Skills",
      category: "Navigate",
      action: () => { close(); scrollTo("skills"); },
    },
    {
      id: "nav-projects",
      label: "Go to Projects",
      category: "Navigate",
      action: () => { close(); scrollTo("projects"); },
    },
    {
      id: "nav-approach",
      label: "Go to Approach",
      category: "Navigate",
      action: () => { close(); scrollTo("approach"); },
    },
    {
      id: "nav-contact",
      label: "Go to Contact",
      category: "Navigate",
      action: () => { close(); scrollTo("contact"); },
    },
    {
      id: "toggle-theme",
      label: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
      category: "Actions",
      description: `Currently ${theme} mode`,
      action: () => { toggleTheme(); close(); },
    },
    {
      id: "open-github",
      label: "Open GitHub Profile",
      category: "External",
      action: () => { close(); openLink("https://github.com/taysh123"); },
    },
    {
      id: "open-linkedin",
      label: "Open LinkedIn Profile",
      category: "External",
      action: () => { close(); openLink("https://www.linkedin.com/in/tay-shofer-1b2b54287"); },
    },
    {
      id: "project-poker",
      label: "View Poker Home Games",
      category: "Projects",
      description: "Open on GitHub",
      action: () => { close(); openLink("https://github.com/taysh123/poker-home-games"); },
    },
    {
      id: "project-poker-live",
      label: "Live Demo — Poker Home Games",
      category: "Projects",
      action: () => { close(); openLink("https://poker-home-games.vercel.app"); },
    },
    {
      id: "project-orders",
      label: "View Orders & Delivery",
      category: "Projects",
      description: "Open on GitHub",
      action: () => { close(); openLink("https://github.com/taysh123/orders-delivery-management-system"); },
    },
  ];

  const filtered = query.trim()
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase()) ||
          c.description?.toLowerCase().includes(query.toLowerCase()),
      )
    : commands;

  // Group by category
  const categories = Array.from(new Set(filtered.map((c) => c.category)));

  // Reset the highlighted row whenever the query changes — adjusted during
  // render (React's recommended pattern) rather than in an effect.
  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    setActiveIdx(0);
  }

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      close();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % filtered.length);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + filtered.length) % filtered.length);
    }
    if (e.key === "Enter" && filtered[activeIdx]) {
      filtered[activeIdx].action();
    }
  };

  useEffect(() => {
    if (!listRef.current) return;
    const active = listRef.current.querySelector<HTMLElement>("[data-active='true']");
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={close}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={handleKeyDown}
            className="fixed left-1/2 top-[20vh] z-[81] w-full max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-white/[0.12] bg-bg-elevated/95 shadow-2xl backdrop-blur-xl"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3.5">
              <SearchIcon size={16} className="shrink-0 text-fg-subtle" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands…"
                aria-label="Command search"
                className="flex-1 bg-transparent text-sm text-fg placeholder:text-fg-subtle focus:outline-none"
              />
              <kbd className="hidden rounded border border-white/10 px-1.5 py-0.5 font-mono text-[0.65rem] text-fg-subtle sm:block">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <ul
              ref={listRef}
              role="listbox"
              aria-label="Commands"
              className="max-h-80 overflow-y-auto py-2"
            >
              {filtered.length === 0 && (
                <li className="px-4 py-8 text-center text-sm text-fg-subtle">
                  No commands found
                </li>
              )}
              {categories.map((cat) => (
                <li key={cat} role="none">
                  <p className="px-4 pb-1 pt-2 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-fg-subtle">
                    {cat}
                  </p>
                  <ul role="group" aria-label={cat}>
                    {filtered
                      .filter((c) => c.category === cat)
                      .map((cmd) => {
                        const globalIdx = filtered.indexOf(cmd);
                        const isActive = globalIdx === activeIdx;
                        return (
                          <li
                            key={cmd.id}
                            role="option"
                            aria-selected={isActive}
                            data-active={isActive}
                          >
                            <button
                              type="button"
                              onClick={cmd.action}
                              onMouseEnter={() => setActiveIdx(globalIdx)}
                              className={[
                                "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors",
                                isActive
                                  ? "bg-[#b47cff]/10 text-fg"
                                  : "text-fg-muted hover:bg-white/[0.04] hover:text-fg",
                              ].join(" ")}
                            >
                              <span className="text-sm">{cmd.label}</span>
                              {cmd.description && (
                                <span className="shrink-0 text-xs text-fg-subtle">
                                  {cmd.description}
                                </span>
                              )}
                              {cmd.category === "External" && (
                                <ArrowUpRightIcon size={12} className="shrink-0 text-fg-subtle" />
                              )}
                            </button>
                          </li>
                        );
                      })}
                  </ul>
                </li>
              ))}
            </ul>

            {/* Footer hint */}
            <div className="flex items-center gap-3 border-t border-white/[0.06] px-4 py-2.5">
              <span className="font-mono text-[0.62rem] text-fg-subtle">
                <kbd className="rounded border border-white/10 px-1 py-0.5">↑↓</kbd>
                {" "}navigate
              </span>
              <span className="font-mono text-[0.62rem] text-fg-subtle">
                <kbd className="rounded border border-white/10 px-1 py-0.5">↵</kbd>
                {" "}select
              </span>
              <span className="font-mono text-[0.62rem] text-fg-subtle">
                <kbd className="rounded border border-white/10 px-1 py-0.5">esc</kbd>
                {" "}close
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
