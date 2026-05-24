export type ProjectAccent = "cyan" | "violet" | "amber";

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  repoUrl: string;
  demoUrl?: string;
  featured?: boolean;
  accent: ProjectAccent;
  year?: string;
};

export const projects: Project[] = [
  {
    id: "poker",
    name: "Poker Home Games Management",
    tagline: "A complete home-game companion for poker nights",
    description:
      "An end-to-end management tool for running real-life poker home games — tracking sessions, buy-ins, players, and outcomes so the table runs smoothly and the math takes care of itself.",
    stack: ["Game logic", "State management", "Data modeling"],
    repoUrl: "https://github.com/taysh123/poker-home-games",
    featured: true,
    accent: "violet",
  },
  {
    id: "orders-delivery",
    name: "Orders & Delivery Management",
    tagline: "Ordering and dispatch, modeled end-to-end",
    description:
      "A management system covering the full ordering and delivery lifecycle — from customer order entry through dispatch, status updates, and fulfillment — built with reliability and clean data flow as the priority.",
    stack: ["Full-stack", "Database", "API"],
    repoUrl: "https://github.com/taysh123/orders-delivery-management-system",
    accent: "cyan",
  },
];
