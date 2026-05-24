import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section" | "li";
  interactive?: boolean;
};

export function GlassCard({
  children,
  className,
  as: Tag = "div",
  interactive = false,
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        "surface-glass relative overflow-hidden rounded-2xl",
        interactive &&
          "transition-[transform,border-color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/15 hover:bg-white/[0.045]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
