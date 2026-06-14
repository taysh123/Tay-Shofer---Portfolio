"use client";

import { ThemeProvider } from "./ThemeProvider";
import { AccessibilityProvider } from "./AccessibilityProvider";
import { BootSequence } from "@/components/effects/BootSequence";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { AIChatWidget } from "@/components/ui/AIChatWidget";
import { AccessibilityPanel } from "@/components/ui/AccessibilityPanel";
import type { Theme, A11yPrefs } from "@/lib/theme";

export function Providers({
  children,
  initialTheme,
  initialA11y,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
  initialA11y: A11yPrefs;
}) {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <AccessibilityProvider initialPrefs={initialA11y}>
        <BootSequence />
        {children}
        <CommandPalette />
        <AIChatWidget />
        <AccessibilityPanel />
      </AccessibilityProvider>
    </ThemeProvider>
  );
}
