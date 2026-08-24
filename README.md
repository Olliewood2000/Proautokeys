# ProAutoKeys

Call-driven marketing site for a mobile auto locksmith lead-generation brand
covering Kent. Next.js App Router, TypeScript, Tailwind CSS v4, deployed on
Vercel.

The single job of every page is to get someone standing next to their car to
tap the phone button. If a change doesn't move someone closer to calling, it
doesn't belong.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Environment

The callback form posts to `/api/callback`, which sends the enquiry by email
through [Resend](https://resend.com). Without these set the route returns 503
and the form tells the visitor to ring instead — it will never report success
for an enquiry that went nowhere.

```bash
RESEND_API_KEY=re_...              # required
CALLBACK_TO_EMAIL=you@example.com  # required — where enquiries land
CALLBACK_FROM_EMAIL=...            # optional; must be on a Resend-verified
                                   # domain. Defaults to Resend's test sender,
                                   # which is fine locally but not in production.
```

Stop the dev server before running a build. Both write to `.next`, and a build
running underneath `next dev` will make it read a half-written manifest and
throw `SyntaxError: Unexpected end of JSON input` until the build finishes.

## Changing the phone number

`src/data/towns.ts`, top of the file:

```ts
export const PHONE_TEL = "+441622938999";
export const PHONE_DISPLAY = "01622 938999";
```

Those two constants are the only place the number appears. Swapping in a
tracked number is a one-line edit each, no search-and-replace anywhere else.

## Adding a town

Adding a town is a data entry, not a build. Append an object to `TOWNS` in
`src/data/towns.ts`:

```ts
{
  slug: "car-key-replacement-ashford",
  town: "Ashford",
  county: "Kent",
  lat: 51.146,
  lon: 0.874,
  nearbyAreas: ["Willesborough", "Kennington", "Charing", ...],
  localIntro: "...",
}
```

`lat`/`lon` place the town's pin on the drawn Kent map. Town hall coordinates
are close enough — the map is a plot, not a survey.

If the town should also appear as a dot on the homepage map, add it to
`KENT_TOWNS` in `src/data/kent-map.ts` and to `nearbyAreas` on
`HOME_PAGE_DATA`. Those two lists are the map and the ruled list beside it, and
they are meant to say the same thing.

The page at `/car-key-replacement-ashford` is then statically generated at
build time, and picked up automatically by `sitemap.ts`, the metadata, and the
LocalBusiness JSON-LD.

`localIntro` **must be genuinely unique per town** — specific roads, retail
parks, station car parks, landmarks. Templated intros with the town name
swapped in are the fastest way to get a set of pages treated as doorway pages.
Write it as if you know the place.

## Images

Both logo variants and the hero photo are in place as WebP.

Everything is registered in `src/data/assets.ts`, and anything still `null`
renders a neutral placeholder rather than a broken image — so drop the file in
`/public` and point the entry at it. See `public/README.md` for sizes, for how
the logo files were derived, and for the conventions that keep image payloads
small.

The coverage map is drawn as an SVG from projected boundary points in
`src/data/kent-map.ts`, so it needs no image file at all.

Accreditation marks are the one image set with no home yet. When one is real,
add the file, register it in `src/data/assets.ts`, and reference it from
`accreditations` in `src/data/proof.ts`.

## Adding manufacturer logos

The brand wall in `src/components/Brands.tsx` reads `BRAND_LOGOS` in
`src/data/assets.ts`, keyed by the `slug` in `src/data/brands.ts`. That record
is empty, so every make currently renders as a wordmark tile — a complete,
shippable section with no artwork. Add logos one at a time as they arrive; no
component changes are needed.

## Social proof

`src/data/proof.ts` holds the Google rating, review count, trading year and
accreditations, all empty. Fill any of them in and the credential strip under
the hero grows to show it; the rating additionally emits `aggregateRating` into
the LocalBusiness structured data. Nothing here is invented, and nothing should
be.

## Content still to confirm

- The £120–£300 price range in the first FAQ answer needs confirming with the
  partner locksmith. See the TODO in `src/data/faqs.ts`.
- Every `systems` string in `src/data/brands.ts` is a draft. The blade profiles
  and key systems must be confirmed with the partner locksmith before launch —
  listing a profile that isn't carried is worse than listing nothing.
- `src/app/privacy/page.tsx` and `src/app/terms/page.tsx` are stubs and need
  real wording before launch.
- `SITE_URL` in `src/components/JsonLd.tsx` and `metadataBase` in
  `src/app/layout.tsx` assume `https://proautokeys.co.uk`. Update if the real
  domain differs.

## Structure

```
src/
  app/
    page.tsx           generic brand homepage
    [slug]/page.tsx    town pages, generateStaticParams from TOWNS
    privacy/, terms/   stubs
    sitemap.ts         generated from TOWNS
    robots.ts
    globals.css        design tokens as a Tailwind v4 @theme
  components/
    LandingPage.tsx    composes the section order for home and town pages
    ...                one file per section
  data/
    towns.ts           phone constants, Town type, TOWNS, homepage content
    faqs.ts            FAQ copy, shared by the accordion and the JSON-LD
    brands.ts          makes and the key systems carried for each
    proof.ts           ratings and accreditations, empty until they are real
    kent-map.ts        projected boundary and town points for the coverage map
    assets.ts          image manifest, including BRAND_LOGOS
```

## Rules worth keeping

**Red means "tap this".** `red` and `red-dark` belong to the call CTAs and
small icon accents. Never a full-bleed fill. Once red shows up decoratively,
the call button stops standing out and the page fails at its only job. Where a
second call button shares a screen with the hero CTA — the header — it runs as
`tone="outline"` for the same reason.

**The hero CTA must be fully visible above the fold at 375x667.** That's the
pass/fail test for any hero change. Shrink the subline or the H1 before you
let the button drop below the fold.

**Nothing may overlap the sticky call bar.** No cookie banners, no chat
widgets, no promo bars.

**The key-blade edge is used exactly once**, between the hero and the page.
Repeated anywhere else it stops being a signature and becomes wallpaper.

**Motion budget:** a staggered hero entrance, the call-icon pulse, scroll
reveals on section headings, card hover lift, and the accordion. All CSS, no
animation library, and `prefers-reduced-motion` turns the lot off.

**No fabricated trust signals.** There are no testimonials, reviews,
accreditations or badges because none exist yet. Don't invent them — put them
in `src/data/proof.ts` when they're real and the UI will pick them up.

**Two display utilities on one element resolve by stylesheet order, not class
order.** `CallButton` sets its own `inline-flex`, so responsive show/hide goes
on a wrapper, never as `hidden md:inline-flex` on the button itself.
