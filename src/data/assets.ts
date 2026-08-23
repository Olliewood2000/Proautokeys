import type { StaticImageData } from "next/image";
import heroKey from "@/../public/hero-key.webp";
import logo from "@/../public/logo.webp";
import logoWhite from "@/../public/logo-white.webp";

/**
 * Image manifest.
 *
 * Every image the site uses is declared here. Statically imported images carry
 * their own dimensions, so `next/image` reserves the right space and nothing
 * shifts on load. Leave an entry as `null` and the component renders a neutral
 * placeholder instead of requesting a missing file, which keeps
 * `npm run dev` free of 404s while assets are outstanding.
 */
export type AssetPath = string | StaticImageData | null;

export const ASSETS = {
  /** Red circular keyhole mark + wordmark, on transparency. */
  logo: logo as AssetPath,

  /** Light-on-dark variant, used in the header and the footer. */
  logoWhite: logoWhite as AssetPath,

  /** Hero shot: two cut Ford fobs on a branded tag, in front of the car. */
  heroKey: heroKey as AssetPath,
} as const;

/**
 * Manufacturer logos for the brand wall, keyed by the `slug` in
 * `src/data/brands.ts`.
 *
 * Deliberately empty. Any make missing from here renders as a wordmark tile,
 * so the section is complete and shippable before a single logo file arrives
 * and no make ever shows as a broken image.
 *
 * To add one: drop the file in `public/brands/`, import it at the top of this
 * file, and add a line here.
 *
 *   import ford from "@/../public/brands/ford.webp";
 *   export const BRAND_LOGOS = { ford };
 *
 * Use a transparent WebP or SVG with the mark trimmed to its own bounds and no
 * baked-in padding — the tile supplies the spacing, and artwork that carries
 * its own margin renders visibly smaller than the marks either side of it.
 * These are third-party trademarks, so only include makes the business is
 * comfortable displaying.
 */
export const BRAND_LOGOS: Record<string, AssetPath> = {};
