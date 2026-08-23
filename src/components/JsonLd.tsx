import type { Faq } from "@/data/faqs";
import { PROOF, hasGoogleRating } from "@/data/proof";
import { BRAND, PHONE_TEL } from "@/data/towns";

export const SITE_URL = "https://proautokeys.co.uk";

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd({
  town,
  path,
}: {
  town: string;
  path: string;
}) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}${path}#business`,
        name: BRAND,
        description: `Mobile auto locksmith replacing, cutting and programming car keys at your vehicle in ${town}.`,
        url: `${SITE_URL}${path}`,
        telephone: PHONE_TEL,
        areaServed: { "@type": "Place", name: town },
        address: { "@type": "PostalAddress", addressRegion: "Kent", addressCountry: "GB" },
        // Only emitted once a real Google rating is recorded in proof.ts.
        // Marking up a rating that is not shown on the page, or not real, is
        // a manual action risk.
        ...(hasGoogleRating() && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: PROOF.googleRating,
            reviewCount: PROOF.googleReviewCount,
          },
        }),
      }}
    />
  );
}

export function FaqJsonLd({ items }: { items: Faq[] }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }}
    />
  );
}
