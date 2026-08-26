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

export type KentCorridor = {
  id: string;
  label: string;
  points: { lat: number; lon: number }[];
  /** Anchor for the mono road label, offset off the carriageway. */
  labelAt: { lat: number; lon: number };
};

/**
 * The corridors a mobile job actually travels. Centrelines simplified from
 * OpenStreetMap motorway/trunk (and A2 primary) ways in Kent, then projected
 * with `project()` so they sit on the same plate as the outline. The county
 * clipPath trims anything that would stick out at Dartford or Sussex.
 */
export const KENT_CORRIDORS: KentCorridor[] = [
  {
    id: "m20",
    label: "M20",
    points: [
      { lat: 51.3896, lon: 0.1862 },
      { lat: 51.3888, lon: 0.1932 },
      { lat: 51.385, lon: 0.2072 },
      { lat: 51.3834, lon: 0.2282 },
      { lat: 51.3781, lon: 0.2422 },
      { lat: 51.3703, lon: 0.2562 },
      { lat: 51.3643, lon: 0.2632 },
      { lat: 51.356, lon: 0.2702 },
      { lat: 51.3193, lon: 0.2842 },
      { lat: 51.3139, lon: 0.3052 },
      { lat: 51.3095, lon: 0.3192 },
      { lat: 51.307, lon: 0.3402 },
      { lat: 51.3071, lon: 0.3542 },
      { lat: 51.3085, lon: 0.3682 },
      { lat: 51.3091, lon: 0.3892 },
      { lat: 51.3111, lon: 0.4032 },
      { lat: 51.3115, lon: 0.4102 },
      { lat: 51.3101, lon: 0.4242 },
      { lat: 51.3069, lon: 0.4312 },
      { lat: 51.3039, lon: 0.4452 },
      { lat: 51.3022, lon: 0.4592 },
      { lat: 51.3005, lon: 0.4662 },
      { lat: 51.2985, lon: 0.4802 },
      { lat: 51.296, lon: 0.4872 },
      { lat: 51.2964, lon: 0.4942 },
      { lat: 51.2976, lon: 0.5012 },
      { lat: 51.2989, lon: 0.5152 },
      { lat: 51.2986, lon: 0.5222 },
      { lat: 51.2912, lon: 0.5362 },
      { lat: 51.2879, lon: 0.5502 },
      { lat: 51.2879, lon: 0.5642 },
      { lat: 51.2866, lon: 0.5712 },
      { lat: 51.2841, lon: 0.5782 },
      { lat: 51.2824, lon: 0.5852 },
      { lat: 51.277, lon: 0.5922 },
      { lat: 51.2686, lon: 0.6062 },
      { lat: 51.2635, lon: 0.6132 },
      { lat: 51.2579, lon: 0.6272 },
      { lat: 51.2531, lon: 0.6342 },
      { lat: 51.2492, lon: 0.6412 },
      { lat: 51.2463, lon: 0.6482 },
      { lat: 51.245, lon: 0.6552 },
      { lat: 51.24, lon: 0.6692 },
      { lat: 51.233, lon: 0.6832 },
      { lat: 51.2278, lon: 0.6902 },
      { lat: 51.2251, lon: 0.6972 },
      { lat: 51.2232, lon: 0.7112 },
      { lat: 51.2207, lon: 0.7182 },
      { lat: 51.2162, lon: 0.7252 },
      { lat: 51.2138, lon: 0.7322 },
      { lat: 51.2104, lon: 0.7392 },
      { lat: 51.2088, lon: 0.7462 },
      { lat: 51.2043, lon: 0.7532 },
      { lat: 51.2021, lon: 0.7602 },
      { lat: 51.1988, lon: 0.7672 },
      { lat: 51.1936, lon: 0.7812 },
      { lat: 51.1902, lon: 0.7952 },
      { lat: 51.1888, lon: 0.8092 },
      { lat: 51.1883, lon: 0.8232 },
      { lat: 51.187, lon: 0.8302 },
      { lat: 51.1774, lon: 0.8442 },
      { lat: 51.1658, lon: 0.8582 },
      { lat: 51.1611, lon: 0.8652 },
      { lat: 51.1592, lon: 0.8722 },
      { lat: 51.1551, lon: 0.8792 },
      { lat: 51.15, lon: 0.8932 },
      { lat: 51.1466, lon: 0.9002 },
      { lat: 51.1406, lon: 0.9072 },
      { lat: 51.1359, lon: 0.9142 },
      { lat: 51.132, lon: 0.9212 },
      { lat: 51.1299, lon: 0.9282 },
      { lat: 51.1164, lon: 0.9492 },
      { lat: 51.1083, lon: 0.9772 },
      { lat: 51.1047, lon: 0.9842 },
      { lat: 51.1005, lon: 1.0052 },
      { lat: 51.0991, lon: 1.0262 },
      { lat: 51.0966, lon: 1.0402 },
      { lat: 51.0945, lon: 1.0612 },
      { lat: 51.0926, lon: 1.0682 },
      { lat: 51.0919, lon: 1.0752 },
      { lat: 51.0921, lon: 1.0892 },
      { lat: 51.0936, lon: 1.1032 },
      { lat: 51.0933, lon: 1.1102 },
      { lat: 51.0913, lon: 1.1172 },
      { lat: 51.0908, lon: 1.1242 },
      { lat: 51.0917, lon: 1.1312 },
      { lat: 51.0943, lon: 1.1382 },
      { lat: 51.0954, lon: 1.1452 },
      { lat: 51.0957, lon: 1.1592 },
    ],
    labelAt: { lat: 51.2, lon: 0.72 },
  },
  {
    id: "m2",
    label: "M2",
    points: [
      { lat: 51.3998, lon: 0.433 },
      { lat: 51.3996, lon: 0.445 },
      { lat: 51.3982, lon: 0.451 },
      { lat: 51.3892, lon: 0.463 },
      { lat: 51.3819, lon: 0.469 },
      { lat: 51.3763, lon: 0.475 },
      { lat: 51.3668, lon: 0.487 },
      { lat: 51.3518, lon: 0.499 },
      { lat: 51.341, lon: 0.505 },
      { lat: 51.3333, lon: 0.511 },
      { lat: 51.3293, lon: 0.517 },
      { lat: 51.3269, lon: 0.523 },
      { lat: 51.325, lon: 0.547 },
      { lat: 51.3248, lon: 0.553 },
      { lat: 51.3256, lon: 0.559 },
      { lat: 51.3277, lon: 0.565 },
      { lat: 51.3341, lon: 0.577 },
      { lat: 51.336, lon: 0.583 },
      { lat: 51.3413, lon: 0.607 },
      { lat: 51.3419, lon: 0.613 },
      { lat: 51.342, lon: 0.625 },
      { lat: 51.3397, lon: 0.637 },
      { lat: 51.3348, lon: 0.649 },
      { lat: 51.3246, lon: 0.679 },
      { lat: 51.3211, lon: 0.685 },
      { lat: 51.3177, lon: 0.697 },
      { lat: 51.3077, lon: 0.715 },
      { lat: 51.3027, lon: 0.727 },
      { lat: 51.2983, lon: 0.739 },
      { lat: 51.2974, lon: 0.745 },
      { lat: 51.2971, lon: 0.787 },
      { lat: 51.2949, lon: 0.811 },
      { lat: 51.2954, lon: 0.817 },
      { lat: 51.3025, lon: 0.841 },
      { lat: 51.3031, lon: 0.847 },
      { lat: 51.3018, lon: 0.859 },
      { lat: 51.3021, lon: 0.877 },
      { lat: 51.2979, lon: 0.907 },
      { lat: 51.2976, lon: 0.913 },
      { lat: 51.2982, lon: 0.919 },
      { lat: 51.301, lon: 0.925 },
    ],
    labelAt: { lat: 51.352, lon: 0.68 },
  },
  {
    id: "a2",
    label: "A2",
    points: [
      { lat: 51.4575, lon: 0.0835 },
      { lat: 51.4535, lon: 0.0975 },
      { lat: 51.4497, lon: 0.1185 },
      { lat: 51.4483, lon: 0.1325 },
      { lat: 51.4485, lon: 0.1395 },
      { lat: 51.4479, lon: 0.1535 },
      { lat: 51.4425, lon: 0.1675 },
      { lat: 51.4383, lon: 0.1745 },
      { lat: 51.4349, lon: 0.1815 },
      { lat: 51.4311, lon: 0.2025 },
      { lat: 51.427, lon: 0.2165 },
      { lat: 51.4261, lon: 0.2235 },
      { lat: 51.4258, lon: 0.2305 },
      { lat: 51.4283, lon: 0.2375 },
      { lat: 51.4269, lon: 0.2445 },
      { lat: 51.4277, lon: 0.2585 },
      { lat: 51.4283, lon: 0.2655 },
      { lat: 51.4304, lon: 0.2725 },
      { lat: 51.4309, lon: 0.2865 },
      { lat: 51.4302, lon: 0.3215 },
      { lat: 51.4267, lon: 0.3285 },
      { lat: 51.4209, lon: 0.3425 },
      { lat: 51.41, lon: 0.3775 },
      { lat: 51.407, lon: 0.3915 },
      { lat: 51.4024, lon: 0.4055 },
      { lat: 51.4014, lon: 0.4125 },
      { lat: 51.3998, lon: 0.4335 },
      { lat: 51.398, lon: 0.4405 },
      { lat: 51.3992, lon: 0.4475 },
      { lat: 51.3984, lon: 0.4685 },
      { lat: 51.3948, lon: 0.4965 },
      { lat: 51.3905, lon: 0.5035 },
      { lat: 51.3847, lon: 0.5105 },
      { lat: 51.3796, lon: 0.5245 },
      { lat: 51.3783, lon: 0.5385 },
      { lat: 51.3746, lon: 0.5455 },
      { lat: 51.3653, lon: 0.6015 },
      { lat: 51.3633, lon: 0.6085 },
      { lat: 51.3591, lon: 0.6295 },
      { lat: 51.3582, lon: 0.6365 },
      { lat: 51.3522, lon: 0.6645 },
      { lat: 51.3502, lon: 0.6785 },
      { lat: 51.3412, lon: 0.7275 },
      { lat: 51.3416, lon: 0.7345 },
      { lat: 51.3403, lon: 0.7415 },
      { lat: 51.3364, lon: 0.7555 },
      { lat: 51.3334, lon: 0.7765 },
      { lat: 51.3314, lon: 0.7835 },
      { lat: 51.3288, lon: 0.7975 },
      { lat: 51.3197, lon: 0.8325 },
      { lat: 51.3139, lon: 0.8605 },
      { lat: 51.3137, lon: 0.8675 },
      { lat: 51.3115, lon: 0.8745 },
      { lat: 51.3016, lon: 0.9235 },
      { lat: 51.3008, lon: 0.9305 },
      { lat: 51.2968, lon: 0.9445 },
      { lat: 51.2919, lon: 0.9585 },
      { lat: 51.2902, lon: 0.9655 },
      { lat: 51.2894, lon: 0.9795 },
      { lat: 51.29, lon: 0.9935 },
      { lat: 51.286, lon: 1.0215 },
      { lat: 51.2842, lon: 1.0285 },
      { lat: 51.2796, lon: 1.0425 },
      { lat: 51.2752, lon: 1.0495 },
      { lat: 51.2696, lon: 1.0635 },
      { lat: 51.265, lon: 1.0705 },
      { lat: 51.2585, lon: 1.0775 },
      { lat: 51.2549, lon: 1.0845 },
      { lat: 51.2543, lon: 1.0915 },
      { lat: 51.2555, lon: 1.1055 },
      { lat: 51.2552, lon: 1.1125 },
      { lat: 51.2544, lon: 1.1195 },
      { lat: 51.2514, lon: 1.1265 },
      { lat: 51.2455, lon: 1.1335 },
      { lat: 51.2355, lon: 1.1405 },
      { lat: 51.2295, lon: 1.1475 },
      { lat: 51.2225, lon: 1.1545 },
      { lat: 51.2106, lon: 1.1685 },
      { lat: 51.2072, lon: 1.1755 },
      { lat: 51.1954, lon: 1.1825 },
      { lat: 51.1841, lon: 1.1965 },
      { lat: 51.1821, lon: 1.2035 },
      { lat: 51.1765, lon: 1.2105 },
      { lat: 51.1734, lon: 1.2245 },
      { lat: 51.1716, lon: 1.2455 },
      { lat: 51.1693, lon: 1.2525 },
      { lat: 51.1657, lon: 1.2595 },
      { lat: 51.1611, lon: 1.2665 },
      { lat: 51.159, lon: 1.2735 },
      { lat: 51.1559, lon: 1.2805 },
      { lat: 51.1547, lon: 1.2875 },
      { lat: 51.1545, lon: 1.3015 },
      { lat: 51.1519, lon: 1.3155 },
      { lat: 51.1489, lon: 1.3225 },
      { lat: 51.1323, lon: 1.3295 },
    ],
    labelAt: { lat: 51.228, lon: 1.14 },
  },
  {
    id: "a21",
    label: "A21",
    points: [
      { lat: 51.2822, lon: 0.1489 },
      { lat: 51.2782, lon: 0.1522 },
      { lat: 51.2702, lon: 0.1627 },
      { lat: 51.2662, lon: 0.1696 },
      { lat: 51.2582, lon: 0.1723 },
      { lat: 51.2542, lon: 0.1744 },
      { lat: 51.2502, lon: 0.1776 },
      { lat: 51.2462, lon: 0.1895 },
      { lat: 51.2422, lon: 0.2061 },
      { lat: 51.2382, lon: 0.2088 },
      { lat: 51.2342, lon: 0.2158 },
      { lat: 51.2262, lon: 0.2202 },
      { lat: 51.2222, lon: 0.2231 },
      { lat: 51.2102, lon: 0.2255 },
      { lat: 51.1942, lon: 0.2323 },
      { lat: 51.1902, lon: 0.2354 },
      { lat: 51.1862, lon: 0.2376 },
      { lat: 51.1822, lon: 0.269 },
      { lat: 51.1782, lon: 0.289 },
      { lat: 51.1742, lon: 0.2987 },
      { lat: 51.1702, lon: 0.3031 },
      { lat: 51.1662, lon: 0.3059 },
      { lat: 51.1622, lon: 0.306 },
      { lat: 51.1582, lon: 0.3041 },
      { lat: 51.1542, lon: 0.3032 },
      { lat: 51.1502, lon: 0.3031 },
      { lat: 51.1462, lon: 0.3048 },
      { lat: 51.1422, lon: 0.3125 },
      { lat: 51.1342, lon: 0.3521 },
      { lat: 51.1302, lon: 0.3578 },
      { lat: 51.1262, lon: 0.3594 },
      { lat: 51.1222, lon: 0.3669 },
      { lat: 51.1182, lon: 0.3787 },
      { lat: 51.1142, lon: 0.3882 },
      { lat: 51.1102, lon: 0.4007 },
      { lat: 51.1062, lon: 0.4042 },
      { lat: 51.1022, lon: 0.4042 },
      { lat: 51.0982, lon: 0.4033 },
      { lat: 51.0942, lon: 0.3988 },
      { lat: 51.0902, lon: 0.396 },
      { lat: 51.0862, lon: 0.4039 },
      { lat: 51.0822, lon: 0.4167 },
    ],
    labelAt: { lat: 51.22, lon: 0.14 },
  },
];

/** Fallback focus for the county-wide page, which has no single town to pin. */
export const KENT_CENTRE = project(51.2, 0.7);
