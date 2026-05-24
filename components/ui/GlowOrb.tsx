import { cn } from "@/lib/cn";

type GlowOrbProps = {
  className?: string;
  tone?: "cyan" | "violet" | "duo";
  size?: number;
};

export function GlowOrb({ className, tone = "duo", size = 480 }: GlowOrbProps) {
  const gradient =
    tone === "cyan"
      ? "radial-gradient(closest-side, rgba(91,141,239,0.55), rgba(91,141,239,0) 70%)"
      : tone === "violet"
        ? "radial-gradient(closest-side, rgba(180,124,255,0.55), rgba(180,124,255,0) 70%)"
        : "radial-gradient(closest-side, rgba(91,141,239,0.45), rgba(180,124,255,0.35) 45%, rgba(180,124,255,0) 70%)";

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full blur-3xl", className)}
      style={{
        width: size,
        height: size,
        background: gradient,
      }}
    />
  );
}
