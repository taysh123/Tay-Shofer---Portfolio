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
    id: "poker",
    name: "Poker Home Games Management",
    tagline: "A complete home-game companion for poker nights",
    description:
      "An end-to-end management tool for running real-life poker home games — tracking sessions, buy-ins, players, and outcomes so the table runs smoothly and the math takes care of itself.",
    stack: ["React", "TypeScript", "State Machines", "Local Storage", "Vercel"],
    repoUrl: "https://github.com/taysh123/poker-home-games",
    liveUrl: "https://poker-home-games-three.vercel.app/",
    demoUrl: "https://poker-home-games-three.vercel.app/",
    featured: true,
    accent: "violet",
    caseStudy: {
      architecture:
        "Client-side React application with a finite state machine at its core — each poker session moves through defined states (setup → active → settling → closed). Player buy-ins and chip counts are modeled as immutable records, with all balance calculations derived from a single source of truth. State is persisted to localStorage so sessions survive page refreshes.",
      challenges: [
        "Handling edge cases in pot splitting (odd chips, all-in scenarios, multiple side pots) without rounding errors",
        "Designing a UI intuitive enough for non-technical players mid-game, under pressure",
        "Keeping session state consistent when players rebuy or leave mid-game",
        "Ensuring the math is always reconcilable — every chip must be accounted for",
      ],
      decisions: [
        "Client-side state only — no backend needed; the game host device owns all state",
        "localStorage persistence with versioned schema migrations for future compatibility",
        "Immutable records for each transaction, enabling full session replay and audit trail",
        "Mobile-first layout — the host typically uses a phone at the table",
      ],
      learned: [
        "Designing complex state machines that remain comprehensible as rules multiply",
        "The value of exhaustive edge case testing for financial/game logic",
        "How to simplify a complex domain (poker rules) into a usable product interface",
        "Balancing feature completeness with UI simplicity for non-technical users",
      ],
      aiWorkflow:
        "Used Claude to validate game logic edge cases — specifically the multi-way pot splitting algorithm. AI pair programming helped stress-test the state machine transitions and catch scenarios that manual testing missed.",
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
];
