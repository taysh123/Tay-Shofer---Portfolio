import type { MetadataRoute } from "next";
import { siteMeta } from "@/data/socials";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: siteMeta.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
