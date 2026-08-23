import type { MetadataRoute } from "next";
import { TOWNS } from "@/data/towns";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...TOWNS.map((town) => ({
      url: `${SITE_URL}/${town.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
