# Tay Shofer — Portfolio

[![Live Site](https://img.shields.io/badge/Live%20Site-tayshofer.dev-5b8def?style=flat-square&logo=vercel&logoColor=white)](https://tayshofer.dev)
[![Built with Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-ff0055?style=flat-square)](https://www.framer.com/motion/)

A premium, AI-native software engineer portfolio — cinematic, interactive, and built to impress. Designed and engineered from scratch with a focus on performance, accessibility, and developer craft.

**Live:** [tayshofer.dev](https://tayshofer.dev) &nbsp;·&nbsp; **GitHub:** [taysh123](https://github.com/taysh123)

---

## Features

- **3D Project Carousel** — CSS-3D rotating showcase with drag/touch spin, auto-advance, and a rich detail panel, paired so the carousel and detail stay in sync
- **Scroll-Reactive Hero Lattice** — An engineering/systems node-graph (CSS `preserve-3d`) that slowly rotates and parallaxes on scroll
- **Subtle 3D Card Tilt** — Pointer-driven tilt on skill/approach cards, sharing the 3D language site-wide
- **Dark/Light Mode** — Elegant theme switcher with smooth transitions and localStorage persistence
- **Command Palette** — `Ctrl+K` / `Cmd+K` to navigate, toggle theme, open links, and more
- **Accessibility Panel** — Floating a11y button with reduced motion, high contrast, and large text toggles
- **AI Chat Widget** — "Ask Tay AI" assistant with streaming-like responses and keyword matching
- **Project Case Studies** — Slide-over panels with architecture, challenges, decisions, and learnings
- **Interactive Background** — Mouse-reactive glow + scroll-driven ambient orbs
- **Cinematic Motion System** — Framer Motion 12 with spring-physics, viewport triggers, and stagger
- **Approach Section** — Showcase of engineering principles and workflow
- **Fully Responsive** — Mobile-first from 375px to 1920px+
- **WCAG AA Accessible** — Focus management, skip links, ARIA labels, screen reader support
- **Production-Ready SEO** — OG images, JSON-LD schema, sitemap, robots.txt

---

## Featured Projects

The showcase carousel presents real, shipped projects — each with its own screenshots and a full case study (architecture, challenges, decisions, learnings):

| Project | What it is | Stack | Links |
|---|---|---|---|
| **SentinelAI** | AI-assisted Security Operations Center with a real-time detection→alerting pipeline | ASP.NET Core · Next.js · SignalR · RabbitMQ · Docker | [GitHub](https://github.com/taysh123/SentinelAI) |
| **DeveloperOS** | Private, local-first desktop workspace that indexes and answers questions about your own code | Python · SQLite FTS5 · Ollama · PWA/CLI | [GitHub](https://github.com/taysh123/DeveloperOS) |
| **T Poker** | Home-game poker companion across web + Android with a cross-language settlement engine | React Native (Expo) · .NET 8 · C# · PostgreSQL | [Live](https://poker-home-games-three.vercel.app/) · [GitHub](https://github.com/taysh123/poker-home-games) |
| **GRAVITY FLOW** | One-touch physics puzzler — 150 levels, endless mode, store-ready | Phaser 3 · TypeScript · Matter.js · Capacitor | [Play](https://taysh123.github.io/Gravity-Game/) · [GitHub](https://github.com/taysh123/Gravity-Game) |
| **Orders & Delivery** | End-to-end ordering/dispatch system modeled as a state machine | Node.js · REST · SQL · React | [GitHub](https://github.com/taysh123/orders-delivery-management-system) |
| **Job Assistant** | Automated job-hunt pipeline delivering curated roles to Telegram | Python · SQLite · Telegram Bot API · GitHub Actions | [GitHub](https://github.com/taysh123/job-assistant) |

> Project content lives in [`data/projects.ts`](data/projects.ts); screenshots in [`public/projects/`](public/projects). Projects render media when present and fall back to a branded placeholder otherwise.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + CSS Custom Properties |
| Animation | Framer Motion 12 |
| Fonts | Geist Sans + Geist Mono |
| Icons | Custom SVG (no external icon library) |
| Deployment | Vercel |

---

## Architecture

```
app/
  layout.tsx          # Root layout: providers, flash-prevention, SEO metadata
  page.tsx            # Main page orchestrating all sections
  globals.css         # Design tokens, light/dark themes, a11y modes, utilities

components/
  providers/          # React Context providers (Theme, Accessibility)
  layout/             # Navbar (with scroll-progress line), Footer
  sections/           # Hero, About, Skills, Projects, EngineeringPanel (Approach), Contact
  effects/            # AmbientGlow, HeroArtifact (3D systems lattice), BootSequence
  ui/                 # Design system: GlassCard, Reveal, Section, Tag, Magnetic, Tilt,
                      #   ProjectCarousel, ProjectDetail, ProjectImage,
                      #   ThemeToggle, CommandPalette, AccessibilityPanel,
                      #   CaseStudyPanel, AIChatWidget, icons
  seo/                # JsonLd schema markup

data/
  projects.ts         # Project definitions + media + full case study content
  skills.ts           # Skill groups
  socials.ts          # Contact info, site metadata

lib/
  motion.ts                # Framer Motion easing curves + variant presets
  useReducedMotionPref.ts  # Combined OS + a11y-panel reduced-motion signal (gates JS 3D)
  cn.ts                    # className combiner
  obfuscate.ts             # Base64 phone encoding
```

### Design System

All design tokens live in `app/globals.css` under `@theme` (Tailwind v4 pattern):

- **Colors:** `--color-bg`, `--color-fg`, `--color-accent-cyan`, `--color-accent-violet`
- **Light mode:** `[data-theme="light"]` overrides with a premium slate palette
- **Accessibility modes:** `[data-high-contrast]`, `[data-large-text]`, `[data-reduced-motion]`
- **Easings:** `--ease-out-expo`, `--ease-out-quint`, `--ease-spring-soft`

### Theme Architecture

Themes are managed via React Context (`ThemeProvider`) with `localStorage` persistence. A flash-prevention inline script in `layout.tsx` reads the stored preference before first paint, eliminating any flicker.

```
localStorage('theme') → data-theme on <html> → CSS variable overrides
```

---

## Performance & Accessibility

- **Transform-only animations** — compositor-promoted, zero layout thrashing
- **`prefers-reduced-motion` respected everywhere** — OS setting + in-app a11y toggle, combined via `useReducedMotionPref` so even JS-driven 3D (carousel, hero lattice, tilt) fully disables and falls back to static layouts
- **Lazy-loaded** non-critical components
- **No external icon libraries** — custom SVG icons with consistent stroke weight
- **WCAG AA contrast** in both dark and light themes
- **Full keyboard navigation** — Tab order, focus rings, ARIA labels, skip-to-content link
- **Screen reader support** — `aria-live` regions, `aria-modal`, semantic HTML
- **JSON-LD schema** — Person + WebSite structured data for SEO

---

## Motion System

All animations are defined in `lib/motion.ts` as reusable Framer Motion variants:

| Variant | Use |
|---------|-----|
| `fadeUp` | Standard section content entrance |
| `fadeIn` | Opacity-only transitions |
| `maskReveal` | Cinematic clip-path reveal for headings |
| `scaleIn` | Card and modal entrances |
| `lineGrow` | Hairline/eyebrow decorators |
| `staggerContainer` | Wraps list animations with configurable delay |

The ambient background uses `useScroll` for parallax orbs and `requestAnimationFrame` for mouse-reactive glow. The 3D layer (project carousel, hero systems lattice, card tilt) is built with pure CSS 3D transforms (`perspective` / `preserve-3d`) driven by Framer motion values — **no Three.js, zero added dependencies** — and is gated behind `useReducedMotionPref` (the OS media query *or* the in-app a11y toggle), since the CSS reduced-motion kill-switch cannot stop a JS-driven transform loop.

---

## AI-Assisted Workflow

This portfolio was built with Claude (Anthropic) as an AI pair programmer. AI assistance was used for:

- Architecture decisions and pattern validation
- Accessibility review and ARIA implementation
- CSS design token system design
- Motion system design and easing curves
- Test case generation for project logic
- Code review and refactoring suggestions

The project itself demonstrates the kind of AI-native engineering approach Tay brings to every build.

---

## Local Development

```bash
# Clone
git clone https://github.com/taysh123/tayshofer-portfolio
cd tayshofer-portfolio

# Install
npm install

# Start dev server
npm run dev
# → http://localhost:3000

# Build for production
npm run build

# Run linter
npm run lint
```

**Requirements:** Node.js 20+

---

## Deployment

Deployed on **Vercel** with zero-config setup. Push to `main` triggers automatic production deployment.

```bash
# One-time Vercel setup
npx vercel

# Production deploy
git push origin main
```

Environment variables: none required (fully static).

---

## Project Structure Highlights

### Why no CSS-in-JS or external UI library?

The design system is built on CSS custom properties + Tailwind v4, which gives full control over theming, transitions, and responsive behavior without the runtime cost of CSS-in-JS. Every visual decision is intentional.

### Why custom SVG icons?

External icon libraries add bundle weight and introduce stroke/style inconsistencies. Custom icons ensure a unified visual language at zero cost.

### Why Framer Motion for animations?

Framer Motion's `useReducedMotion()` hook, `AnimatePresence`, and `useScroll` provide exactly what's needed: performant, interruptible animations that respect accessibility preferences out of the box.

---

## License

MIT — feel free to use this as inspiration, but please don't copy it wholesale without attribution.

---

*Built and designed by [Tay Shofer](https://tayshofer.dev).*
