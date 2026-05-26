"use client";

import { createContext, useContext, useEffect, useState } from "react";

type A11yPrefs = {
  reducedMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
};

type A11yContextValue = A11yPrefs & {
  toggle: (key: keyof A11yPrefs) => void;
};

const A11yContext = createContext<A11yContextValue>({
  reducedMotion: false,
  highContrast: false,
  largeText: false,
  toggle: () => {},
});

export function useAccessibility() {
  return useContext(A11yContext);
}

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [prefs, setPrefs] = useState<A11yPrefs>({
    reducedMotion: false,
    highContrast: false,
    largeText: false,
  });

  useEffect(() => {
    const stored: Partial<A11yPrefs> = {};
    try {
      const raw = localStorage.getItem("a11y");
      if (raw) Object.assign(stored, JSON.parse(raw));
    } catch {}
    const next = { ...prefs, ...stored };
    setPrefs(next);
    sync(next);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function sync(p: A11yPrefs) {
    const el = document.documentElement;
    el.setAttribute("data-reduced-motion", String(p.reducedMotion));
    el.setAttribute("data-high-contrast", String(p.highContrast));
    el.setAttribute("data-large-text", String(p.largeText));
  }

  const toggle = (key: keyof A11yPrefs) => {
    setPrefs((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      sync(next);
      try {
        localStorage.setItem("a11y", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  return (
    <A11yContext.Provider value={{ ...prefs, toggle }}>
      {children}
    </A11yContext.Provider>
  );
}
