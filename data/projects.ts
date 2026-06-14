export type ProjectAccent = "cyan" | "violet" | "amber";

export type CaseStudy = {
  architecture: string;
  challenges: string[];
  decisions: string[];
  learned: string[];
  aiWorkflow?: string;
};

/**
 * Future-ready media for a project. Every field is optional with graceful
 * fallbacks at the render layer: missing `gallery` → no strip; missing
 * `mobileImage` → falls back to `image`; missing `image` → the accent-gradient
 * placeholder treatment. Paths are under /public (e.g. "/projects/poker.png").
 */
export type ProjectMedia = {
  image?: string;
  mobileImage?: string;
  alt?: string;
  gallery?: { src: string; alt?: string }[];
  /**
   * How the image sits in its frame. "cover" (default) fills + crops — right for
   * wide desktop screenshots. "contain" shows the whole image centered on an
   * accent-tinted backdrop — right for tall portrait phone screenshots.
   */
  fit?: "cover" | "contain";
};

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  repoUrl: string;
  demoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  accent: ProjectAccent;
  media?: ProjectMedia;
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    id: "sentinelai",
    name: "SentinelAI",
    tagline: "An AI-assisted Security Operations Center, built like the real thing",
    description:
      "A full Security Operations Center platform modeled on tools like CrowdStrike and Microsoft Sentinel. A modular-monolith ASP.NET Core backend feeds a real-time Next.js dashboard through an event-ingestion → detection → threat-scoring → alerting pipeline — with live alert streaming over SignalR, an incident workflow, MITRE ATT&CK mapping, and an optional AI analysis mode. Runs end-to-end with a single Docker command.",
    stack: [
      "ASP.NET Core",
      ".NET 8",
      "Next.js",
      "TypeScript",
      "SignalR",
      "RabbitMQ",
      "Docker",
    ],
    repoUrl: "https://github.com/taysh123/SentinelAI",
    featured: true,
    accent: "cyan",
    media: {
      image: "/projects/sentinelai/dashboard.png",
      alt: "SentinelAI real-time SOC dashboard",
      fit: "cover",
      gallery: [
        { src: "/projects/sentinelai/ai-analysis.png", alt: "AI-generated alert analysis panel" },
        { src: "/projects/sentinelai/live-alerts.png", alt: "Live alert stream" },
        { src: "/projects/sentinelai/incident-kanban.png", alt: "Incident Kanban workflow" },
        { src: "/projects/sentinelai/architecture.png", alt: "System architecture overview" },
      ],
    },
    caseStudy: {
      architecture:
        "A modular-monolith ASP.NET Core backend organized into clear domains (ingestion, detection, alerting, incidents, identity) with a real-time Next.js dashboard. Security events flow through a pipeline — ingestion → rule-based detection → threat scoring → alerting — with RabbitMQ decoupling the stages and SignalR streaming alerts to the browser as they happen. Auth uses RS256 JWTs; the whole stack builds and runs from one Docker command.",
      challenges: [
        "Streaming alerts to the dashboard in real time without overwhelming the client or the message bus",
        "Designing a threat-scoring + detection layer that maps cleanly onto MITRE ATT&CK techniques",
        "Making first-run reproducible — generating keys/secrets, waiting for health, and seeding demo data idempotently",
        "Offering AI analysis without ever requiring a paid API key or external calls",
      ],
      decisions: [
        "Modular monolith over microservices — domain isolation and a real message bus, without distributed-systems overhead",
        "An optional AI mode backed by a built-in mock provider, so the platform is free to run and a real provider would use a user-supplied key",
        "One-command Docker startup (idempotent) — strong random secrets, RS256 keys, health gating, auto-open dashboard",
        "SignalR for push instead of client polling, keeping the live SOC view genuinely live",
      ],
      learned: [
        "Designing an event-driven detection pipeline that stays observable and debuggable",
        "Architecting a modular monolith that could be split into services later without rework",
        "Real-time full-stack delivery across a .NET backend and a Next.js frontend",
        "Packaging a multi-service system so a reviewer can run it in one step",
      ],
      aiWorkflow:
        "Used Claude to design the detection-rule abstraction and the MITRE ATT&CK mapping, and to shape the optional AI-analysis prompt structure (Summary, Risk, MITRE, Recommended Actions, Investigation Steps) behind a swappable provider interface.",
    },
  },
  {
    id: "developeros",
    name: "DeveloperOS",
    tagline: "A private, local-first workspace for understanding your own code",
    description:
      "A desktop developer workspace that indexes your project folders into a private, searchable knowledge base. Ask plain-English questions answered with real file:line citations — it declines instead of guessing — then study any codebase, generate docs, summarize meetings into tasks, and track your work. Fully offline-first: no account, no cloud, no telemetry, with optional local AI via Ollama and a one-click Windows installer.",
    stack: [
      "Python",
      "SQLite FTS5",
      "Local AI (Ollama)",
      "Desktop App",
      "PWA",
      "CLI",
    ],
    repoUrl: "https://github.com/taysh123/DeveloperOS",
    featured: true,
    accent: "violet",
    media: {
      image: "/projects/developeros/dashboard.png",
      alt: "DeveloperOS dashboard overview",
      fit: "cover",
      gallery: [
        { src: "/projects/developeros/ai-features.png", alt: "Grounded Search & Ask with file:line citations" },
        { src: "/projects/developeros/learning.png", alt: "Learning center generated from your code" },
        { src: "/projects/developeros/career.png", alt: "Career tools — leads, CV match, interview prep" },
        { src: "/projects/developeros/hero.png", alt: "DeveloperOS desktop experience" },
      ],
    },
    caseStudy: {
      architecture:
        "Point DeveloperOS at your code and it builds a private SQLite FTS5 index that powers ranked search and grounded Q&A — every answer cites real file:line locations and the system declines when the index doesn't support a claim. A provider architecture defaults to an offline mock and can use free local AI via Ollama; the dashboard is served over a CSRF-guarded loopback API bound to 127.0.0.1 and runs as a standalone desktop window, an installable PWA, or a full CLI.",
      challenges: [
        "Grounding answers in the real index so the assistant cites evidence instead of hallucinating",
        "Incremental re-indexing that stays fast as projects grow",
        "Shipping a per-user Windows installer (and portable exe) with a clean uninstall and no admin rights",
        "Delivering a genuinely private, offline-first product — no account, no telemetry, key-presence-only display",
      ],
      decisions: [
        "Local-first by default — data never leaves the machine; the loopback API is CSRF-guarded",
        "SQLite FTS5 for grounded keyword retrieval instead of a heavyweight external vector database",
        "A swappable AI provider (offline mock → optional Ollama) so no API key is ever required",
        "One codebase delivered three ways — desktop window, installable PWA, and CLI",
      ],
      learned: [
        "Building grounded, citation-first retrieval that earns trust by refusing to guess",
        "Packaging a Python app into a signed-feeling desktop experience (PyInstaller + Inno Setup)",
        "Designing a privacy-preserving architecture as a first-class product feature",
        "Turning a personal tool into a polished, installable product with onboarding",
      ],
      aiWorkflow:
        "DeveloperOS is itself an AI-native tool; building it meant designing the provider seam, the grounded-citation contract, and the prompt structure for explanations, quizzes, and grading — with Claude used to validate the retrieval-grounding rules.",
    },
  },
  {
    id: "poker",
    name: "T Poker",
    tagline: "The private poker club in your pocket — web, Android, and a real settlement engine",
    description:
      "A polished home-game poker companion shipped across web and Android. Run cash games and tournaments, track every buy-in and rebuy, and settle the night down to the fewest exact transfers. A greedy debt-minimization engine runs identically on the .NET backend (C# decimal) and on-device (TypeScript integer cents), pinned by a shared test suite — alongside a full local-first tournament director with a controllable blind clock, payout structures, and lifetime stats.",
    stack: [
      "React Native (Expo)",
      "TypeScript",
      ".NET 8",
      "C#",
      "PostgreSQL",
      "Vercel",
    ],
    repoUrl: "https://github.com/taysh123/poker-home-games",
    liveUrl: "https://poker-home-games-three.vercel.app/",
    demoUrl: "https://poker-home-games-three.vercel.app/",
    accent: "amber",
    media: {
      image: "/projects/poker/home.png",
      alt: "T Poker home screen — Cash Game or Tournament",
      fit: "contain",
      gallery: [
        { src: "/projects/poker/tournament-live.png", alt: "Live tournament dashboard" },
        { src: "/projects/poker/podium.png", alt: "Tournament podium results" },
        { src: "/projects/poker/final-count.png", alt: "The Final Count — guided settlement" },
        { src: "/projects/poker/stats.png", alt: "Lifetime stats and P&L" },
      ],
    },
    caseStudy: {
      architecture:
        "A cross-platform product: a React Native (Expo) app and a React web client, backed by a .NET 8 API and PostgreSQL. Guest mode runs an entire game on-device (AsyncStorage, nothing uploaded); accounts add cloud sync, groups, and lifetime stats. The financial core — a greedy debt-minimization engine that collapses a night into the fewest transfers — is implemented twice (C# decimal on the server, TypeScript integer-cents on device) and pinned by a shared test suite so both agree to the cent.",
      challenges: [
        "Guaranteeing identical money math across two languages and two runtimes",
        "Making end-of-night settlement foolproof — the live 'Final Count' reconciles every chip on the table",
        "A serious tournament director: editable blind structures, a pause/resume clock, rebuys, late reg, and exact largest-remainder payouts",
        "Seamless guest → account upgrade, including invite deep links that resume after sign-in",
      ],
      decisions: [
        "Local-first guest mode — start a full game in 30 seconds with no sign-up",
        "One algorithm, two implementations, one shared test suite — correctness over DRY",
        "Integer cents on-device to eliminate floating-point money errors",
        "A premium 'Velvet Table' UI (haptics, shimmer, confetti) to make a utility feel like a product",
      ],
      learned: [
        "Shipping the same product across web and native from a shared mental model",
        "Cross-language correctness via a shared, language-agnostic test suite",
        "Modeling real-world tournament rules (clocks, payouts, rebuys) as reliable software",
        "End-to-end ownership: backend, mobile, web, and store-ready release assets",
      ],
      aiWorkflow:
        "Used Claude to stress-test the debt-minimization algorithm and the largest-remainder payout math, and to reconcile the C# and TypeScript implementations against the shared edge-case suite.",
    },
  },
  {
    id: "gravity-flow",
    name: "GRAVITY FLOW",
    tagline: "A one-touch physics puzzler — hold to pull a lost star home",
    description:
      "A polished mobile physics game. Press and hold to create a point of gravity and guide a star through 150 hand-tuned levels across 15 worlds, each ending in its own boss — plus an endless accelerating arcade mode with weekly leaderboards, a 3-star mastery layer, and a no-pay-to-win cosmetics economy. Built on a strict-TypeScript Phaser + Matter.js core with 103 passing tests and wrapped for Android and iOS with Capacitor.",
    stack: [
      "Phaser 3",
      "TypeScript",
      "Matter.js",
      "Vite",
      "Vitest",
      "Capacitor",
    ],
    repoUrl: "https://github.com/taysh123/Gravity-Game",
    liveUrl: "https://taysh123.github.io/Gravity-Game/",
    demoUrl: "https://taysh123.github.io/Gravity-Game/",
    accent: "violet",
    media: {
      image: "/projects/gravity-flow/gameplay.png",
      alt: "GRAVITY FLOW gravity-puzzle gameplay",
      fit: "contain",
      gallery: [
        { src: "/projects/gravity-flow/boss.png", alt: "World boss encounter" },
        { src: "/projects/gravity-flow/gravity-run.png", alt: "Endless Gravity Run mode" },
        { src: "/projects/gravity-flow/cosmetics.png", alt: "Cosmetics store" },
        { src: "/projects/gravity-flow/win.png", alt: "3-star level mastery" },
      ],
    },
    caseStudy: {
      architecture:
        "A Phaser 3 game in strict TypeScript with a Matter.js physics core: holding the screen creates an inverse-square gravity well that pulls the star, with drag to steer and release to let go. Levels are data-driven so 150 of them across 7 mechanics stay maintainable, and a Vitest suite (103 tests) pins the physics and progression logic. The web build is wrapped for Android/iOS with Capacitor, with native plugins (AdMob, RevenueCat, Firebase) guarded so the web bundle never ships them.",
      challenges: [
        "Tuning 150 levels and their bosses so each teaches a new idea and still feels fair",
        "Deterministic endless runs and a weekly challenge where everyone races the same seed",
        "Getting the gravity 'feel' right — responsive, physical, and learnable in one touch",
        "Keeping native-only plugins out of the web build without forking the codebase",
      ],
      decisions: [
        "Data-driven levels so content scales without bespoke code per level",
        "Strict TypeScript + Vitest to keep a large game maintainable and regression-safe",
        "Capacitor to ship native from one web codebase",
        "An earned cosmetics economy — explicitly no pay-to-win",
      ],
      learned: [
        "Game architecture: scenes, an entity/mechanic system, and data-driven content",
        "Physics tuning and deterministic simulation for fair leaderboards",
        "Shipping one codebase to web and native app stores",
        "Disciplined module boundaries that keep 150 levels + 7 mechanics tractable",
      ],
      aiWorkflow:
        "Used Claude to design the data-driven level schema and to generate and verify deterministic test cases for the physics and endless-seed logic.",
    },
  },
  {
    id: "orders-delivery",
    name: "Orders & Delivery Management",
    tagline: "Ordering and dispatch, modeled end-to-end",
    description:
      "A management system covering the full ordering and delivery lifecycle — from customer order entry through dispatch, status updates, and fulfillment — built with reliability and clean data flow as the priority.",
    stack: ["Full-Stack", "Node.js", "REST API", "SQL", "React"],
    repoUrl: "https://github.com/taysh123/orders-delivery-management-system",
    accent: "cyan",
    caseStudy: {
      architecture:
        "Full-stack application with a REST API backend and React frontend. Orders move through a lifecycle modeled as a finite state machine (pending → confirmed → dispatched → delivered → closed). The database schema is fully normalized with foreign key constraints enforcing referential integrity. API endpoints are resource-oriented with consistent error shapes.",
      challenges: [
        "Modeling concurrent order state transitions safely without race conditions",
        "Designing the delivery status system to be extensible for future courier integrations",
        "Keeping the UI reactive to order state changes without a real-time backend (polling strategy)",
        "Balancing database normalization with query performance for the order list views",
      ],
      decisions: [
        "API-first design — the backend is fully usable without the frontend, enabling future integrations",
        "Normalized relational schema with explicit foreign keys over embedded documents",
        "Optimistic UI updates with server reconciliation for perceived responsiveness",
        "Separate read and write endpoints to isolate query complexity from mutation logic",
      ],
      learned: [
        "End-to-end full-stack development from database schema design to polished UI",
        "How to model real-world business workflows as reliable, auditable state machines",
        "REST API design patterns and the importance of consistent error handling",
        "The discipline of writing migrations and keeping schema changes reversible",
      ],
      aiWorkflow:
        "Used Claude to review the database schema design for normalization issues and to generate comprehensive test cases for the order state transition logic.",
    },
  },
  {
    id: "job-assistant",
    name: "Job Assistant",
    tagline: "An automated job hunt that delivers curated roles to your Telegram",
    description:
      "A personal, low-cost job-finding pipeline. On a schedule it pulls new software-engineering postings from multiple boards (Remotive, We Work Remotely, Greenhouse, Lever…), filters them by your preferences, removes duplicates, and sends a single paginated digest to Telegram — one job card at a time with Save / Ignore / Open / Mark-Applied actions and a weekly summary. Everything is tracked in SQLite and orchestrated by GitHub Actions, with a deliberately reliability-first, no-AI-at-runtime v1.",
    stack: ["Python", "SQLite", "Telegram Bot API", "Pydantic", "GitHub Actions"],
    repoUrl: "https://github.com/taysh123/job-assistant",
    accent: "amber",
    // No screenshots yet (chat-based bot) — renders the branded placeholder.
    // Drop a `media` block here later to upgrade with no other code change.
    caseStudy: {
      architecture:
        "A clean pipeline — collect → filter → dedup → persist → deliver — over a registry of source adapters (Remotive, We Work Remotely RSS, Greenhouse, Lever). SQLite is the single durable store (committed back to the repo after each run) holding jobs, run history, and bot state. Three scheduled GitHub Actions crons (collect, bot, weekly) are serialized on one concurrency group so they never clash writing the database; the Telegram digest is one message that edits in place, with page state persisted in SQLite.",
      challenges: [
        "GitHub Actions can't host a live bot, so commands and Prev/Next paging are processed on the next scheduled run — with an optional local long-poll watcher for instant handling",
        "Telegram allows only one getUpdates consumer at a time — handling the 409 conflict gracefully",
        "Reliable de-duplication across runs and across sources with different shapes",
        "Serializing scheduled jobs so concurrent runs never corrupt the database",
      ],
      decisions: [
        "Deliberately no AI and no auto-apply in v1 — favouring reliability and easy maintenance",
        "SQLite committed to the repo as the single, durable copy of state",
        "A source-adapter registry so new job boards plug in without touching the pipeline",
        "Cron-based delivery with an optional watcher for low-latency interaction",
      ],
      learned: [
        "Designing a resilient ETL-style pipeline with idempotent, serialized scheduled jobs",
        "Working within platform constraints (Actions, Telegram getUpdates) instead of fighting them",
        "Building an extensible adapter/registry pattern for heterogeneous data sources",
        "Shipping a genuinely useful personal tool with tests and CI",
      ],
      aiWorkflow:
        "Built with AI-assisted development — used Claude to design the source-adapter abstraction and to generate offline test fixtures for the filtering and dedup pipeline.",
    },
  },
];
