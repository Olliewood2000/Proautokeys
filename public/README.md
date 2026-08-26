# Images

Drop assets in this folder, then wire them up in `src/data/assets.ts`. Any
entry left as `null` there renders a neutral placeholder instead of requesting
a missing file, so the site stays clean while assets are outstanding.

| File | Status | Notes |
|---|---|---|
| `logo.webp` | Done | 329x144, transparent. Used on light grounds; the header and footer both run the white variant now. |
| `logo-white.webp` | Done | Same mark with the wordmark in white, for the dark header and footer. Renders 91x40 and 110x48. |
| `hero-key.webp` | Done | 1024x819. Two cut Ford fobs on a branded tag in front of the car. |
| `callback-nissan.webp` | Done | 1008x743, transparent. Qashqai facing left, behind the callback form. |
| `callback-focus.webp` | Done | 1002x619, transparent. Focus facing right, behind the callback form. |
| `callback-motorway.webp` | Done | 1024x512. Red-tinted motorway behind the callback form, cars and graphite floor. |
| `brands/*.png` | Done | All 22 makes. Transparent PNGs named after the slug in `src/data/brands.ts`. |
| Accreditation marks | Outstanding | Only if a real accreditation exists. Register in `assets.ts`, then reference from `accreditations` in `src/data/proof.ts`. |

The coverage map no longer needs an image. It is drawn as an SVG from projected
boundary points in `src/data/kent-map.ts`.

## Replacing the hero image

The hero now **crops** — it fills a column that bleeds off the right edge of the
page on desktop and a 5:4 band on mobile — so the subject needs to survive being
cut on all four sides. Keep the keys and the hand well inside the middle of the
frame.

The current file is 1024px wide. It fills roughly half the viewport on desktop,
so on a 1440px screen at 2x it is being asked for around 1500px and is
upscaling. **A 1600–2000px source would visibly sharpen it**, and is the single
biggest remaining image win.

## Manufacturer logos

All 22 makes in `src/data/brands.ts` have a transparent PNG in `public/brands/`,
named after the slug (`ford.png`, `mercedes-benz.png`, `land-rover.png`). They
are imported in `src/data/assets.ts` and listed in `BRAND_LOGOS`. A make missing
from that map still renders as a wordmark tile, so a dropped file can never show
as a broken image.

Tiles render them with `unoptimized` so the browser is served the PNG itself.
They display greyscale at 60% opacity and come up to full colour on hover.

These are third-party trademarks used to indicate compatibility. Only include
makes the business is comfortable displaying.

## How the logo files were made

The supplied artwork was a JPEG on a solid black field, which would have shown
as a black box against the white header. Both WebP files were derived from it
by flood filling the black surround to transparency, knocking out the keyhole
inside the `O`, trimming the empty margin, and resizing to 144px tall.
`logo-white.webp` additionally maps the near-neutral wordmark pixels to white
while leaving the red mark untouched.

That's a raster recovery, not a real cut-out. **If a vector version of the logo
exists — SVG, AI, EPS or PDF — it's worth swapping in**, since it would be
smaller again and stay perfectly crisp at any size. Ask the designer.

## Adding a new image

1. Export as WebP.
2. Put it in this folder.
3. Import it in `src/data/assets.ts` and set the matching entry.

Use static imports rather than string paths. Next then knows the intrinsic
dimensions at build time, reserves the right space, and fingerprints the file
for immutable caching.

Give fixed-size images an explicit `width`/`height` rather than a `sizes`
prop. With `sizes`, Next generates a srcset spanning every device width up to
3840px, which bloats the HTML and can make browsers download a render many
times larger than needed.
