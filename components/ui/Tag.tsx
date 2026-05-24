import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagProps = {
  children: ReactNode;
  className?: string;
  emphasis?: "default" | "accent";
};

export function Tag({ children, className, emphasis = "default" }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em]",
        emphasis === "default" &&
          "border-white/10 bg-white/[0.03] text-fg-muted",
        emphasis === "accent" &&
          "border-violet-400/30 bg-violet-400/[0.08] text-fg",
        className,
      )}
    >
      {children}
    </span>
  );
}
