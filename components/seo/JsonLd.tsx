import { siteMeta, socials } from "@/data/socials";

export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteMeta.name,
    url: siteMeta.url,
    jobTitle: siteMeta.role,
    description: siteMeta.tagline,
    sameAs: [socials.github.url, socials.linkedin.url],
    email: `mailto:${socials.email}`,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Computer Science — B.Sc.",
    },
    knowsAbout: [
      "C",
      "C++",
      "Python",
      "Java",
      "JavaScript",
      "C#",
      "React",
      "Next.js",
      "PostgreSQL",
      "Linux",
      "Git",
      "AI-assisted development",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteMeta.name} — ${siteMeta.role}`,
    url: siteMeta.url,
    inLanguage: "en",
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
