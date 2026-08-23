/**
 * The makes we cut and code for, with the blade profiles and systems carried
 * for each.
 *
 * TODO: every `systems` string below is a draft and must be confirmed with the
 * partner locksmith before this goes live. Publishing a profile we do not
 * actually carry is worse than publishing nothing — anyone in the trade will
 * spot it, and a customer who rings quoting it will be disappointed. Same
 * standing caveat as the price range in `faqs.ts`.
 *
 * `slug` is the lookup key into `BRAND_LOGOS` in `src/data/assets.ts`. A make
 * with no logo file renders as a wordmark tile instead, so this list can be
 * complete before the artwork is.
 *
 * Keep the count two short of a multiple of twelve — 10, 22, 34. The grid adds
 * a two-cell CTA tile after the last make, and the total has to divide by 2, 3
 * and 4 or one breakpoint ends on an empty cell with the grid's hairline
 * background showing through it.
 */
export type Brand = {
  slug: string;
  name: string;
  systems: string;
};

export const BRANDS: Brand[] = [
  { slug: "ford", name: "Ford", systems: "HU101 · Tibbe FO21 · smart proximity" },
  { slug: "vauxhall", name: "Vauxhall", systems: "HU100 · HU100R" },
  { slug: "volkswagen", name: "Volkswagen", systems: "HU66 · MQB" },
  { slug: "audi", name: "Audi", systems: "HU66 · MQB" },
  { slug: "bmw", name: "BMW", systems: "HU92 · HU100R · CAS / FEM" },
  { slug: "mercedes-benz", name: "Mercedes-Benz", systems: "HU64 · FBS3 / FBS4" },
  { slug: "toyota", name: "Toyota", systems: "TOY43 · TOY48 · smart" },
  { slug: "nissan", name: "Nissan", systems: "NSN14 · DAT17 · I-Key" },
  { slug: "honda", name: "Honda", systems: "HON66 · smart" },
  { slug: "peugeot", name: "Peugeot", systems: "VA2 · HU83 · VA6" },
  { slug: "citroen", name: "Citroën", systems: "VA2 · HU83" },
  { slug: "renault", name: "Renault", systems: "VAC102 · NE73 · card key" },
  { slug: "kia", name: "Kia", systems: "HYN17 · TOY48" },
  { slug: "hyundai", name: "Hyundai", systems: "HYN17 · TOY48" },
  { slug: "mini", name: "MINI", systems: "HU92 · HU100R" },
  { slug: "land-rover", name: "Land Rover", systems: "HU101 · KVM" },
  { slug: "seat", name: "SEAT", systems: "HU66 · MQB" },
  { slug: "skoda", name: "Škoda", systems: "HU66 · MQB" },
  { slug: "fiat", name: "Fiat", systems: "SIP22 · GT15" },
  { slug: "volvo", name: "Volvo", systems: "HU101 · HU56R" },
  { slug: "mazda", name: "Mazda", systems: "MAZ24 · MAZ13" },
  { slug: "suzuki", name: "Suzuki", systems: "HU133 · SZ11" },
];
