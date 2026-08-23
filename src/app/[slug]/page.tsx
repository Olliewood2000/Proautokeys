import { notFound } from "next/navigation";
import { LandingPage } from "@/components/LandingPage";
import { TOWNS, getTownBySlug, pageDataForTown } from "@/data/towns";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return TOWNS.map((town) => ({ slug: town.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[slug]">) {
  const { slug } = await params;
  const town = getTownBySlug(slug);
  if (!town) return {};

  return pageMetadata({
    title: `Car Key Replacement ${town.town} | Mobile Auto Locksmith`,
    description: `Lost, broken or locked in? Mobile auto locksmith covering ${town.town} and surrounding areas. Car keys cut and programmed at your vehicle. Call now for a quote.`,
    path: `/${town.slug}`,
  });
}

export default async function TownPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const town = getTownBySlug(slug);
  if (!town) notFound();

  return <LandingPage page={pageDataForTown(town)} path={`/${town.slug}`} />;
}
