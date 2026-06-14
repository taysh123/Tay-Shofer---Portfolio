import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Project, ProjectAccent, ProjectMedia } from "@/data/projects";

export const ACCENT: Record<
  ProjectAccent,
  { solid: string; soft: string; from: string; to: string }
> = {
  cyan: {
    solid: "#5b8def",
    soft: "rgba(91,141,239,0.22)",
    from: "rgba(91,141,239,0.30)",
    to: "rgba(91,141,239,0)",
  },
  violet: {
    solid: "#b47cff",
    soft: "rgba(180,124,255,0.22)",
    from: "rgba(180,124,255,0.30)",
    to: "rgba(180,124,255,0)",
  },
  amber: {
    solid: "#fbbf24",
    soft: "rgba(251,191,36,0.20)",
    from: "rgba(251,191,36,0.26)",
    to: "rgba(251,191,36,0)",
  },
};

function monogram(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /[a-z]/i.test(w)) // ignore "&", "·", etc. → "Orders & Delivery" = OD
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/**
 * Renders a project's media with graceful fallbacks:
 *   - `image` + `mobileImage` → art-directed (CSS-swapped) responsive images
 *   - `image` only → single responsive image
 *   - no `image` → branded accent-gradient placeholder (faux app window)
 *
 * Always fills its parent, which must be `position: relative` with a set size.
 */
export function ProjectImage({
  project,
  className,
  sizes = "(max-width: 640px) 100vw, 50vw",
}: {
  project: Pick<Project, "name" | "accent" | "media">;
  className?: string;
  sizes?: string;
}) {
  const media: ProjectMedia | undefined = project.media;
  const accent = ACCENT[project.accent];
  const alt = media?.alt ?? `${project.name} — interface screenshot`;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {media?.image ? (
        media.mobileImage ? (
          <>
            <Image
              src={media.image}
              alt={alt}
              fill
              sizes={sizes}
              className="hidden object-cover object-top sm:block"
            />
            <Image
              src={media.mobileImage}
              alt={alt}
              fill
              sizes={sizes}
              className="object-cover object-top sm:hidden"
            />
          </>
        ) : (
          <Image
            src={media.image}
            alt={alt}
            fill
            sizes={sizes}
            className="object-cover object-top"
          />
        )
      ) : (
        // Branded "preview pending" frame — intentional in both themes, no asset.
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col bg-bg-elevated"
        >
          {/* accent wash */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(120% 90% at 50% 0%, ${accent.from}, ${accent.to} 62%)`,
            }}
          />
          {/* fine schematic grid, masked to a soft center */}
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(var(--ph-line) 1px, transparent 1px), linear-gradient(90deg, var(--ph-line) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage:
                "radial-gradient(80% 72% at 50% 46%, #000 30%, transparent 82%)",
              WebkitMaskImage:
                "radial-gradient(80% 72% at 50% 46%, #000 30%, transparent 82%)",
            }}
          />
          {/* window chrome with a faux address pill */}
          <div className="relative flex items-center gap-1.5 px-4 py-3">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: accent.soft }}
            />
            <span className="h-2 w-2 rounded-full bg-fg-subtle/30" />
            <span className="h-2 w-2 rounded-full bg-fg-subtle/20" />
            <span className="ml-2 h-2.5 w-[55%] rounded-full bg-fg-subtle/10" />
          </div>
          {/* monogram */}
          <div className="relative flex flex-1 items-center justify-center">
            <span
              className="font-mono text-[2.75rem] font-semibold tracking-tight"
              style={{
                color: accent.solid,
                textShadow: `0 0 28px ${accent.soft}`,
              }}
            >
              {monogram(project.name)}
            </span>
          </div>
          {/* inner vignette for depth */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: "inset 0 0 52px var(--ph-vignette)" }}
          />
        </div>
      )}
    </div>
  );
}
