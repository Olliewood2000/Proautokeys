import type { Metadata } from "next";
import { BRAND } from "@/data/towns";

export const SITE_URL = "https://proautokeys.co.uk";

const OG_LOCALE = "en_GB";

/**
 * Shared page metadata so title, description, canonical and social tags
 * never drift apart. File-based opengraph-image / icon conventions still
 * supply the images.
 */
export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    applicationName: BRAND,
    alternates: { canonical: path },
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: OG_LOCALE,
      siteName: BRAND,
      title,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/** Safe JSON-LD serialisation so a `</script>` in copy cannot break out. */
export function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const SERVICE_OFFERS = [
  "Lost car keys",
  "All keys lost",
  "Spare keys",
  "Broken or snapped keys",
  "Key fob repair",
  "Locked out",
];
