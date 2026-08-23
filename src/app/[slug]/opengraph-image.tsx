import { TOWNS, getTownBySlug } from "@/data/towns";
import { ogImage, OG_SIZE } from "@/lib/og-image";

export const alt = "Car key replacement — mobile auto locksmith in Kent";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return TOWNS.map((town) => ({ slug: town.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const town = getTownBySlug(slug);
  return ogImage({
    title: town
      ? `Car Key Replacement in ${town.town}`
      : "Car Key Replacement",
  });
}
