import type { MetadataRoute } from "next";
import { seo } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const alternates = { languages: { "es-CO": seo.url, en: `${seo.url}/en` } };
  return [
    {
      url: seo.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates,
    },
    {
      url: `${seo.url}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates,
    },
    {
      url: `${seo.url}/politica-privacidad`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
