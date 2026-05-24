export type SkillEntry = {
  label: string;
  emphasis?: "advanced" | "primary";
};

export type SkillGroup = {
  id: string;
  title: string;
  caption: string;
  items: SkillEntry[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    caption: "Core programming",
    items: [
      { label: "C" },
      { label: "C++", emphasis: "advanced" },
      { label: "Python" },
      { label: "Java" },
      { label: "JavaScript (ES6+)" },
      { label: "C#" },
    ],
  },
  {
    id: "web",
    title: "Web Technologies",
    caption: "Frontend craft",
    items: [
      { label: "React" },
      { label: "Next.js" },
      { label: "Vite" },
      { label: "CSS3" },
      { label: "HTML5" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Databases",
    caption: "Systems & data",
    items: [
      { label: "SQL" },
      { label: "PostgreSQL" },
      { label: "MySQL" },
      { label: "Firebase" },
      { label: "Linux" },
      { label: "Git" },
      { label: "GitHub" },
    ],
  },
  {
    id: "ai",
    title: "AI & Automation",
    caption: "Modern engineering edge",
    items: [
      { label: "AI-assisted development" },
      { label: "Claude Code workflows" },
      { label: "LLM-assisted engineering" },
      { label: "Prompt-driven development" },
      { label: "API integration" },
      { label: "Debugging with AI assistance" },
    ],
  },
  {
    id: "engineering",
    title: "Engineering Workflow",
    caption: "How I build",
    items: [
      { label: "Clean architecture" },
      { label: "Reusable components" },
      { label: "Version control" },
      { label: "Iterative development" },
      { label: "Documentation" },
      { label: "Maintainable code" },
      { label: "Testing mindset" },
    ],
  },
];
