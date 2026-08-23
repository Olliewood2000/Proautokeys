import type { MetadataRoute } from "next";
import { SITE_URL } from "@/components/JsonLd";
import { TOWNS } from "@/data/towns";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: SITE_URL, lastModified, priority: 1 },
    ...TOWNS.map((town) => ({
      url: `${SITE_URL}/${town.slug}`,
      lastModified,
      priority: 0.9,
    })),
    { url: `${SITE_URL}/privacy`, lastModified, priority: 0.1 },
    { url: `${SITE_URL}/terms`, lastModified, priority: 0.1 },
  ];
}
