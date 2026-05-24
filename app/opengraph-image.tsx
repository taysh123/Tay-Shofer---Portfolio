import { ImageResponse } from "next/og";
import { siteMeta } from "@/data/socials";

export const runtime = "edge";
export const alt = `${siteMeta.name} — ${siteMeta.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [first, ...rest] = siteMeta.name.split(" ");
  const last = rest.join(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(60% 60% at 18% 8%, rgba(91,141,239,0.55), transparent 60%), radial-gradient(50% 55% at 96% 12%, rgba(180,124,255,0.55), transparent 60%), #070709",
          color: "#e7e9ee",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg,#5b8def,#b47cff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 24,
              letterSpacing: 2,
              color: "white",
            }}
          >
            TS
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              opacity: 0.85,
              textTransform: "uppercase",
            }}
          >
            tayshofer.dev
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 132,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: -3,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span style={{ display: "flex" }}>{first}&nbsp;</span>
            <span
              style={{
                display: "flex",
                background:
                  "linear-gradient(120deg,#5b8def,#b47cff 60%,#f0c0ff)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {last}.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              opacity: 0.78,
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {siteMeta.role} — building polished digital products, real-time
            systems, and memorable user experiences.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            opacity: 0.7,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <span style={{ display: "flex" }}>Portfolio · 2026</span>
          <span style={{ display: "flex" }}>github.com/taysh123</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
