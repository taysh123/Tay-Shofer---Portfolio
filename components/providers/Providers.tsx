"use client";

import { ThemeProvider } from "./ThemeProvider";
import { AccessibilityProvider } from "./AccessibilityProvider";
import { BootSequence } from "@/components/effects/BootSequence";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { AIChatWidget } from "@/components/ui/AIChatWidget";
import { AccessibilityPanel } from "@/components/ui/AccessibilityPanel";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AccessibilityProvider>
        <BootSequence />
        {children}
        <CommandPalette />
        <AIChatWidget />
        <AccessibilityPanel />
      </AccessibilityProvider>
    </ThemeProvider>
  );
}
