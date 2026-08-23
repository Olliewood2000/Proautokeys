import type { Faq } from "@/data/faqs";
import { PROOF, hasGoogleRating } from "@/data/proof";
import { BRAND, PHONE_TEL } from "@/data/towns";
import { SERVICE_OFFERS, SITE_URL, jsonLd } from "@/lib/seo";

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
    />
  );
}

const LOGO_URL = `${SITE_URL}/logo.webp`;
const IMAGE_URL = `${SITE_URL}/hero-key.webp`;
const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const offerCatalog = {
  "@type": "OfferCatalog",
  name: "Mobile auto locksmith services",
  itemListElement: SERVICE_OFFERS.map((name) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name,
      provider: { "@id": BUSINESS_ID },
    },
  })),
};

export function LocalBusinessJsonLd({
  town,
  path,
  geo,
}: {
  town: string;
  path: string;
  geo?: { lat: number; lon: number };
}) {
  const pageUrl = `${SITE_URL}${path}`;
  const isHome = path === "/";

  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": WEBSITE_ID,
            url: SITE_URL,
            name: BRAND,
            inLanguage: "en-GB",
            publisher: { "@id": BUSINESS_ID },
          },
          {
            // Locksmith is the specific LocalBusiness subtype Google expects
            // for this trade. One stable @id so town pages do not look like
            // separate businesses.
            "@type": ["Locksmith", "LocalBusiness"],
            "@id": BUSINESS_ID,
            name: BRAND,
            description: `Mobile auto locksmith replacing, cutting and programming car keys at your vehicle in ${town}.`,
            url: SITE_URL,
            telephone: PHONE_TEL,
            image: IMAGE_URL,
            logo: {
              "@type": "ImageObject",
              url: LOGO_URL,
            },
            address: {
              "@type": "PostalAddress",
              addressRegion: "Kent",
              addressCountry: "GB",
            },
            areaServed: isHome
              ? { "@type": "AdministrativeArea", name: "Kent" }
              : {
                  "@type": "City",
                  name: town,
                  containedInPlace: {
                    "@type": "AdministrativeArea",
                    name: "Kent",
                  },
                  ...(geo && {
                    geo: {
                      "@type": "GeoCoordinates",
                      latitude: geo.lat,
                      longitude: geo.lon,
                    },
                  }),
                },
            hasOfferCatalog: offerCatalog,
            ...(hasGoogleRating() && {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: PROOF.googleRating,
                reviewCount: PROOF.googleReviewCount,
              },
            }),
          },
          {
            "@type": "WebPage",
            "@id": `${pageUrl}#webpage`,
            url: pageUrl,
            name: isHome
              ? "Car Key Replacement in Kent"
              : `Car Key Replacement in ${town}`,
            isPartOf: { "@id": WEBSITE_ID },
            about: { "@id": BUSINESS_ID },
            inLanguage: "en-GB",
            primaryImageOfPage: IMAGE_URL,
          },
        ],
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

export function BreadcrumbJsonLd({
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
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: town,
            item: `${SITE_URL}${path}`,
          },
        ],
      }}
    />
  );
}
