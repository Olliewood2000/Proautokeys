import { KENT_CENTRE, project } from "@/data/kent-map";

/**
 * The phone number lives here and nowhere else. When the tracked number
 * arrives, changing these two constants changes it everywhere on the site.
 */
export const PHONE_TEL = "+441622938999";
export const PHONE_DISPLAY = "01622 938999";
/**
 * `tel:` href used by every call button. The `+` is percent-encoded so
 * mobile browsers open the dialer instead of also treating the href as a
 * page to load (Safari's "trying to open multiple pages" prompt).
 */
export const PHONE_HREF = `tel:${encodeURIComponent(PHONE_TEL)}`;

export const BRAND = "ProAutoKeys";

export type Town = {
  slug: string; // "car-key-replacement-maidstone"
  town: string; // "Maidstone"
  county: string; // "Kent"
  /** Centres the coverage map. Town-hall latitude/longitude is close enough. */
  lat: number;
  lon: number;
  nearbyAreas: string[];
  localIntro: string; // MUST be genuinely unique per town, never templated
};

export const TOWNS: Town[] = [
  {
    slug: "car-key-replacement-maidstone",
    town: "Maidstone",
    county: "Kent",
    lat: 51.272,
    lon: 0.523,
    nearbyAreas: [
      "Bearsted",
      "Aylesford",
      "Coxheath",
      "Loose",
      "Barming",
      "Boughton Monchelsea",
      "Harrietsham",
      "Hollingbourne",
      "Detling",
      "Yalding",
      "Marden",
      "Staplehurst",
      "Lenham",
    ],
    localIntro:
      "We cover Maidstone town centre and the villages around it, from the retail parks off the A229 to the residential streets around Mote Park and the commuter car parks near Maidstone East and West. Most jobs are done at the roadside or wherever your car is parked, so there's no need to arrange recovery or get the vehicle to a garage.",
  },
];

export function getTownBySlug(slug: string): Town | undefined {
  return TOWNS.find((t) => t.slug === slug);
}

export function getTownByName(name: string): Town | undefined {
  return TOWNS.find((t) => t.town === name);
}

/**
 * Everything a page renders. Town pages derive this from a Town entry; the
 * homepage supplies its own generic brand version of the same shape.
 */
export type PageData = {
  /** Used in the H1, FAQ answers, metadata and JSON-LD areaServed. */
  town: string;
  county: string;
  h1: string;
  coverageHeading: string;
  coverageAreasLabel: string;
  nearbyAreas: string[];
  localIntro: string;
  footerCoverage: string;
  /** Centre of the coverage glow on the drawn map, in map-space units. */
  mapFocus: { x: number; y: number };
  /** Pins and names a single town. Omitted on the county-wide page. */
  mapLabel?: string;
  /** WGS84 point for JSON-LD areaServed. Omitted on the county-wide page. */
  geo?: { lat: number; lon: number };
};

export function pageDataForTown(town: Town): PageData {
  return {
    town: town.town,
    county: town.county,
    h1: `Car Key Replacement in ${town.town}`,
    coverageHeading: `Covering ${town.town} & the surrounding villages`,
    coverageAreasLabel: `Areas we cover around ${town.town}`,
    nearbyAreas: town.nearbyAreas,
    localIntro: town.localIntro,
    footerCoverage: `Mobile auto locksmith services across ${town.town} and ${town.county}`,
    mapFocus: project(town.lat, town.lon),
    mapLabel: town.town,
    geo: { lat: town.lat, lon: town.lon },
  };
}

export const HOME_PAGE_DATA: PageData = {
  town: "Kent",
  county: "Kent",
  h1: "Car Key Replacement in Kent",
  coverageHeading: "Covering Kent, end to end",
  coverageAreasLabel: "Towns we cover across Kent",
  nearbyAreas: [
    "Maidstone",
    "Ashford",
    "Canterbury",
    "Chatham",
    "Gillingham",
    "Rochester",
    "Sittingbourne",
    "Faversham",
    "Tonbridge",
    "Tunbridge Wells",
    "Sevenoaks",
    "Dartford",
    "Gravesend",
    "Whitstable",
    "Herne Bay",
  ],
  localIntro:
    "We're a mobile auto locksmith service working across Kent, from the Medway towns and the coast through to the villages along the M20 and A2 corridors. Keys are cut, programmed and tested at your vehicle, wherever it happens to be parked, so there's no recovery to arrange and no garage appointment to wait for.",
  footerCoverage: "Mobile auto locksmith services across Kent",
  mapFocus: KENT_CENTRE,
};
