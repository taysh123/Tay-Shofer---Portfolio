import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SectionHeader } from "@/components/ui/SectionHeader";

type SectionProps = {
  id?: string;
  ariaLabel?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
  containerClassName?: string;
  divider?: boolean;
  children: ReactNode;
};

export function Section({
  id,
  ariaLabel,
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  containerClassName,
  divider = true,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={id && title ? `${id}-title` : undefined}
      className={cn(
        "relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-28 lg:py-36 3xl:py-44",
        divider && "section-divider",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-6xl 3xl:max-w-7xl",
          containerClassName,
        )}
      >
        {(eyebrow || title || intro) && (
          <SectionHeader
            id={id}
            eyebrow={eyebrow}
            title={title}
            intro={intro}
            align={align}
          />
        )}
        {children}
      </div>
    </section>
  );
}
