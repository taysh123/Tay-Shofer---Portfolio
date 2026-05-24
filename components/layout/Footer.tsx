import { siteMeta, socials } from "@/data/socials";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-12 border-t border-white/[0.06] px-5 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between 3xl:max-w-7xl">
        <div>
          <a
            href="#top"
            className="inline-flex items-center gap-2.5"
            aria-label={`${siteMeta.name} — back to top`}
          >
            <span
              aria-hidden="true"
              className="relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-md border border-white/10"
            >
              <span className="absolute inset-0 bg-gradient-to-br from-[#5b8def] to-[#b47cff] opacity-90" />
              <span className="relative font-mono text-[0.7rem] font-semibold text-white/95">
                TS
              </span>
            </span>
            <span className="font-mono text-sm tracking-[0.16em] text-fg">
              TAY&nbsp;SHOFER
            </span>
          </a>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-fg-muted">
            Built from scratch with Next.js, React, Tailwind, and Framer Motion.
            Designed, written, and shipped by Tay.
          </p>
          <p className="mt-5 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-fg-subtle">
            <span
              aria-hidden="true"
              className="inline-block h-1 w-1 rounded-full bg-gradient-to-br from-[#5b8def] to-[#b47cff]"
            />
            By the way — <span className="text-gradient">I built this website.</span>
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-fg-muted sm:items-end">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-fg-subtle">
            © {year} — {siteMeta.domain}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 sm:justify-end">
            <a
              href={`mailto:${socials.email}`}
              className="transition-colors hover:text-fg"
            >
              Email
            </a>
            <a
              href={socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-fg"
            >
              GitHub
            </a>
            <a
              href={socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-fg"
            >
              LinkedIn
            </a>
            <a href="#top" className="transition-colors hover:text-fg">
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
