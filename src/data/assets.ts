import type { StaticImageData } from "next/image";
import callbackFocus from "@/../public/callback-focus.webp";
import callbackNissan from "@/../public/callback-nissan.webp";
import heroKey from "@/../public/hero-key.webp";
import logo from "@/../public/logo.webp";
import logoWhite from "@/../public/logo-white.webp";
import audi from "@/../public/brands/audi.png";
import bmw from "@/../public/brands/bmw.png";
import citroen from "@/../public/brands/citroen.png";
import fiat from "@/../public/brands/fiat.png";
import ford from "@/../public/brands/ford.png";
import honda from "@/../public/brands/honda.png";
import hyundai from "@/../public/brands/hyundai.png";
import kia from "@/../public/brands/kia.png";
import landRover from "@/../public/brands/land-rover.png";
import mazda from "@/../public/brands/mazda.png";
import mercedesBenz from "@/../public/brands/mercedes-benz.png";
import mini from "@/../public/brands/mini.png";
import nissan from "@/../public/brands/nissan.png";
import peugeot from "@/../public/brands/peugeot.png";
import renault from "@/../public/brands/renault.png";
import seat from "@/../public/brands/seat.png";
import skoda from "@/../public/brands/skoda.png";
import suzuki from "@/../public/brands/suzuki.png";
import toyota from "@/../public/brands/toyota.png";
import vauxhall from "@/../public/brands/vauxhall.png";
import volkswagen from "@/../public/brands/volkswagen.png";
import volvo from "@/../public/brands/volvo.png";

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

  /** Nissan Qashqai, facing left. Peeks out from behind the callback form. */
  callbackCarLeft: callbackNissan as AssetPath,

  /** Ford Focus, facing right. Peeks out from behind the callback form. */
  callbackCarRight: callbackFocus as AssetPath,
} as const;

/**
 * Manufacturer logos for the brand wall, keyed by the `slug` in
 * `src/data/brands.ts`.
 *
 * Files live in `public/brands/` as transparent PNGs, named after the slug.
 * The brand tile renders them with `unoptimized` so the browser is served
 * the PNG itself rather than a WebP/AVIF conversion.
 *
 * A make missing from here still renders as a wordmark tile, so a dropped
 * file can never show as a broken image.
 */
export const BRAND_LOGOS: Record<string, AssetPath> = {
  audi,
  bmw,
  citroen,
  fiat,
  ford,
  honda,
  hyundai,
  kia,
  "land-rover": landRover,
  mazda,
  "mercedes-benz": mercedesBenz,
  mini,
  nissan,
  peugeot,
  renault,
  seat,
  skoda,
  suzuki,
  toyota,
  vauxhall,
  volkswagen,
  volvo,
};
