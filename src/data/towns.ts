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
  /** One entry per paragraph. MUST be genuinely unique per town, never templated. */
  localIntro: string[];
  /** Exactly 4 per town — rendered as cards in the "Where keys go missing" section. */
  localScenarios: { title: string; line: string }[];
  /** Exactly 2 per town — appended to the shared FAQ list on town pages. */
  localFaqs: { q: string; a: string }[];
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
    localIntro: [
      "Maidstone is a town built around its car parks. Between Fremlin Walk, King Street and the retail parks strung along the A229, there's a good chance that if you've lost a key in Maidstone, you've lost it somewhere with a barrier and a pay machine. We come to the vehicle wherever it's sitting — multi-storey, surface car park, roadside or driveway — and cut and code the new key there.",
      "The two stations catch people out more than anywhere else. Maidstone East and Maidstone West both fill up with commuters leaving cars all day, and a key that goes missing in London at four in the afternoon becomes a problem in a Kent station car park at seven in the evening. We can meet you at the car rather than you arranging recovery to get it home.",
      "Away from the centre, most of our Maidstone work is on driveways in the villages — Bearsted, Loose, Coxheath, Barming — and at workplaces along the M20 corridor. The town's mix of newer company cars and older runarounds means we carry both ends of the range, from basic transponder blades through to smart proximity keys that have to be coded to the vehicle.",
      "Wherever you are in Maidstone, the process is the same: tell us the registration on the phone, get a price before anyone travels, and we'll come to the car.",
    ],
    localScenarios: [
      {
        title: "Fremlin Walk & King Street",
        line: "Keys lost mid-shop, or locked in the boot with the shopping.",
      },
      {
        title: "Maidstone East & West",
        line: "Back from London to a station car park and no key in your pocket.",
      },
      {
        title: "Mote Park & the retail parks",
        line: "Dog walks, football, the school run — keys that don't make it back to the car.",
      },
      {
        title: "The villages & M20 corridor",
        line: "Driveway jobs in Bearsted, Loose and Coxheath, and workplace call-outs along the motorway.",
      },
    ],
    localFaqs: [
      {
        q: "Do you cover the Maidstone villages as well as the town centre?",
        a: "Yes. Bearsted, Loose, Coxheath, Barming, Boughton Monchelsea, Harrietsham, Hollingbourne, Detling, Yalding, Marden, Staplehurst and Lenham are all regular call-outs for us, and a driveway job in a village is no different to one in a town centre car park. If you're not sure whether you're in range, ring and ask — we'll tell you straight away.",
      },
      {
        q: "Can you get to me in a multi-storey car park?",
        a: "Yes, and it's one of the more common jobs in Maidstone. Fremlin Walk, King Street and the station car parks are all fine — we work at the vehicle wherever it's parked. It's worth telling us the level and bay number when you call so we're not walking the whole car park looking for you.",
      },
    ],
  },
  {
    slug: "car-key-replacement-rochester",
    town: "Rochester",
    county: "Kent",
    lat: 51.388,
    lon: 0.505,
    nearbyAreas: [
      "Strood",
      "Chatham",
      "Frindsbury",
      "Borstal",
      "Wainscott",
      "Cuxton",
      "Halling",
      "Cliffe",
      "Higham",
      "Hoo St Werburgh",
    ],
    localIntro: [
      "A lot of our Rochester work happens on the Medway City Estate. It's a working estate — units, yards, delivery drivers, people on shift — and a lost or snapped key there isn't just an inconvenience, it's a van that can't go out. We come to the unit or the yard, cut and code the key on site, and you're moving again without a recovery truck getting involved.",
      "Rochester station is the other one that catches people. It's a commuter station, so cars sit there all day and sometimes all weekend, and there's a particular kind of bad evening that involves getting off a train after a few days away and finding the car key isn't where you thought it was. We'll meet you at the station car park and sort it there.",
      "Around the high street, the castle and the Esplanade, it's mostly visitor parking and short stays — keys locked in boots, fobs that have stopped working, keys dropped somewhere between the car and the cathedral. Across the river in Strood and up towards Wainscott and Frindsbury, it's driveway work: spare keys, all keys lost, and the occasional key snapped off in an older ignition.",
      "Rochester's vehicle mix runs the full range, from work vans and older diesels through to newer cars with proximity keys, so we carry blades and programming kit for both.",
    ],
    localScenarios: [
      {
        title: "Medway City Estate",
        line: "Van keys lost on shift, or snapped in the ignition mid-round.",
      },
      {
        title: "Rochester station",
        line: "Home from a few days away to a car you can't get into.",
      },
      {
        title: "The high street & castle",
        line: "Visitor parking, locked boots and fobs that stop working.",
      },
      {
        title: "Strood & Wainscott",
        line: "Driveway jobs — spare keys, all keys lost, worn-out ignitions.",
      },
    ],
    localFaqs: [
      {
        q: "Can you come out to the Medway City Estate during working hours?",
        a: "Yes, and it's one of our more common Rochester call-outs. We'll come to the unit or the yard and work at the vehicle, so a van that's lost its key doesn't need recovering off the estate. Tell us the unit or road when you call and we'll find you.",
      },
      {
        q: "Do you cover Strood and Chatham as well as Rochester itself?",
        a: "Yes. The Medway towns run into each other, so Strood, Chatham, Frindsbury, Wainscott, Borstal and the villages out towards Hoo and Cliffe are all within range. It's the same service wherever the car is — we come to it rather than the other way round.",
      },
    ],
  },
  {
    slug: "car-key-replacement-sittingbourne",
    town: "Sittingbourne",
    county: "Kent",
    lat: 51.34,
    lon: 0.735,
    nearbyAreas: [
      "Milton Regis",
      "Kemsley",
      "Bobbing",
      "Borden",
      "Newington",
      "Iwade",
      "Bapchild",
      "Teynham",
      "Tunstall",
      "Rodmersham",
    ],
    localIntro: [
      "Sittingbourne has an unusual number of car parks for its size, and we end up in most of them. Sittingbourne Shopping Park is the big one — Currys, Halfords, The Range, PureGym — and between the gym bags, the trolleys and the boot loads of shopping, it's a reliable source of keys that end up locked in, dropped, or simply not where they should be. The Forum car park in the town centre is much the same.",
      "Then there are the supermarkets. Aldi, Lidl, Morrisons, Asda and Sainsbury's all have their own car parks in and around Sittingbourne, and a fair share of our local work is someone standing next to a full boot with the key sitting on the passenger seat. We come out, get you in without damaging anything, and if the key's genuinely gone we can cut and code a new one there and then.",
      "The stations spread the work out further than people expect. Sittingbourne, Kemsley and Newington all serve commuters leaving cars for the day, and Kemsley in particular is quiet enough that a car sitting there with no way into it is a long evening. We'll come to the station car park rather than you arranging recovery.",
      "Out towards Milton Regis, Bobbing, Borden and the villages along the A2, it's mostly driveway work — spare keys cut before they're needed, and all-keys-lost jobs on cars that have been sitting a while. The A249 down to the M2 means we're rarely far away.",
    ],
    localScenarios: [
      {
        title: "Sittingbourne Shopping Park",
        line: "Gym bags, trolleys and keys that end up locked in the boot.",
      },
      {
        title: "The Forum & town centre",
        line: "Short stays, dropped fobs and keys that don't make it back.",
      },
      {
        title: "The supermarket car parks",
        line: "Aldi, Lidl, Morrisons, Asda, Sainsbury's — a full boot and no key.",
      },
      {
        title: "Sittingbourne, Kemsley & Newington stations",
        line: "Commuter cars left all day, and no way in at the end of it.",
      },
    ],
    localFaqs: [
      {
        q: "Do you cover Milton Regis, Kemsley and the surrounding villages?",
        a: "Yes. Milton Regis, Kemsley, Bobbing, Borden, Newington, Iwade, Bapchild, Teynham, Tunstall and Rodmersham are all within our usual range, along with Sittingbourne itself. A driveway job in a village works exactly the same as one in a town centre car park — we come to the vehicle.",
      },
      {
        q: "I'm at Sittingbourne Shopping Park with my keys locked in the car. Can you help?",
        a: "That's one of the most common calls we get locally. We use non-destructive entry, so there's no damage to the door or the lock, and in most cases we're in without any drama. If the key itself has gone missing rather than being locked inside, we can cut and code a replacement at the vehicle.",
      },
    ],
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
  localIntro: string[];
  /** Town-only: renders the "Where keys go missing" card grid. Omitted on the homepage. */
  localScenarios?: { title: string; line: string }[];
  /** Town-only: appended to the shared FAQ list. Omitted on the homepage. */
  localFaqs?: { q: string; a: string }[];
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
    localScenarios: town.localScenarios,
    localFaqs: town.localFaqs,
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
  localIntro: [
    "We're a mobile auto locksmith service working across Kent, from the Medway towns and the coast through to the villages along the M20 and A2 corridors. Keys are cut, programmed and tested at your vehicle, wherever it happens to be parked, so there's no recovery to arrange and no garage appointment to wait for.",
  ],
  footerCoverage: "Mobile auto locksmith services across Kent",
  mapFocus: KENT_CENTRE,
};
