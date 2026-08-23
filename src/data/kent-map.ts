/**
 * A stylised Kent outline for the coverage section.
 *
 * Built from real boundary and coastal points projected with a plain
 * equirectangular transform, longitude scaled by cos(51.2°) so the county is
 * not stretched sideways. The north and east coasts carry the character —
 * Grain, the Medway notch, Sheppey, the Swale, Thanet, Dungeness — and are
 * drawn with quadratic segments so they read as a coast rather than a
 * polygon. The Sussex and London borders stay as straight chords: those
 * edges are political lines, not shoreline.
 *
 * A few points fall outside a 0–640 / 0–400 box (Allhallows sits above the
 * origin latitude, North Foreland east of the origin longitude), so the
 * viewBox carries padding rather than the path being clamped to fit.
 */
export const MAP_VIEWBOX = "-16 -28 684 440";

const LON_ORIGIN = 0.03;
const LAT_ORIGIN = 51.45;
const LON_SCALE = 460.4;
const LAT_SCALE = 734.8;

export function project(lat: number, lon: number): { x: number; y: number } {
  return {
    x: Math.round((lon - LON_ORIGIN) * LON_SCALE),
    y: Math.round((LAT_ORIGIN - lat) * LAT_SCALE),
  };
}

export const KENT_OUTLINE = [
  "M103,-10", // Dartford
  "Q116,0 138,2", // Greenhithe
  "Q160,4 172,3", // Gravesend
  "Q184,1 200,-4", // Shorne Marshes
  "Q215,-9 249,-13", // Cliffe
  "Q283,-18 299,-15", // Allhallows
  "Q314,-12 321,-7", // Grain, north
  "Q327,-3 313,1", // Grain, east tip
  "Q299,4 286,14", // Grain, inner
  "Q272,24 286,21", // Medway notch
  "Q299,18 314,21", // Iwade
  "Q329,24 333,14", // Queenborough
  "Q337,4 349,13", // Sheerness
  "Q360,21 382,24", // Minster
  "Q404,26 408,33", // Warden Point
  "Q411,39 415,47", // Leysdown
  "Q418,54 391,54", // Shellness
  "Q364,54 357,61", // Elmley / the Swale
  "Q350,68 374,72",
  "Q398,75 429,70", // Oare
  "Q459,65 483,61", // Whitstable
  "Q506,57 523,54", // Herne Bay
  "Q539,51 549,53", // Reculver
  "Q559,54 573,52", // Birchington
  "Q587,50 606,47", // Westgate
  "Q625,43 638,44", // Margate
  "Q651,44 651,50", // Foreness
  "Q651,55 650,61", // North Foreland
  "Q648,67 644,79", // Broadstairs
  "Q640,90 628,97", // Ramsgate
  "Q616,103 611,116", // Pegwell Bay
  "Q605,129 619,148", // Sandwich
  "Q633,166 633,181", // Deal
  "Q632,195 628,209", // Kingsdown
  "Q624,222 621,225", // St Margaret's
  "Q617,228 607,233", // South Foreland
  "Q597,238 563,255", // Dover
  "Q529,271 521,274", // Folkestone
  "Q513,276 499,277", // Sandgate
  "Q485,278 464,295", // Hythe
  "Q443,312 431,327", // Dymchurch
  "Q419,342 411,355", // New Romney
  "Q403,367 429,380", // Lydd
  "Q455,392 445,394", // Dungeness, east horn
  "Q435,395 435,395", // Dungeness tip
  "L352,378", // Camber / Rye border
  "L322,345",
  "L266,298", // Northiam
  "L221,295", // Hawkhurst
  "L166,257", // Lamberhurst
  "L107,234", // Tunbridge Wells
  "L70,203", // Penshurst
  "L16,187", // Edenbridge
  "L18,132", // Westerham
  "L1,101", // Biggin Hill
  "L31,66", // Orpington border
  "L66,42", // Swanley
  "Z",
].join(" ");

/**
 * The towns named in the coverage list, plotted so the map carries the same
 * information the list does instead of being a shape with a wash over it.
 * Town-centre coordinates; at this scale three decimals is already sub-pixel.
 *
 * Keep in step with `nearbyAreas` on the homepage in `towns.ts`. A town in one
 * and not the other is the kind of mismatch nobody notices for a year.
 */
export const KENT_TOWNS: { name: string; lat: number; lon: number }[] = [
  { name: "Dartford", lat: 51.446, lon: 0.219 },
  { name: "Gravesend", lat: 51.442, lon: 0.37 },
  { name: "Rochester", lat: 51.388, lon: 0.505 },
  { name: "Chatham", lat: 51.38, lon: 0.522 },
  { name: "Gillingham", lat: 51.385, lon: 0.55 },
  { name: "Sittingbourne", lat: 51.34, lon: 0.735 },
  { name: "Faversham", lat: 51.317, lon: 0.892 },
  { name: "Whitstable", lat: 51.36, lon: 1.026 },
  { name: "Herne Bay", lat: 51.371, lon: 1.128 },
  { name: "Canterbury", lat: 51.28, lon: 1.079 },
  { name: "Ashford", lat: 51.148, lon: 0.875 },
  { name: "Maidstone", lat: 51.272, lon: 0.523 },
  { name: "Sevenoaks", lat: 51.272, lon: 0.19 },
  { name: "Tonbridge", lat: 51.196, lon: 0.276 },
  { name: "Tunbridge Wells", lat: 51.132, lon: 0.263 },
];

/** Fallback focus for the county-wide page, which has no single town to pin. */
export const KENT_CENTRE = project(51.2, 0.7);
