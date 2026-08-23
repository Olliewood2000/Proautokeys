import type { AssetPath } from "@/data/assets";

/**
 * Social proof, kept in one place and honest by default.
 *
 * Everything here starts empty. Nothing invents a rating, a review count or a
 * membership the business does not have — the components read these values and
 * simply render less when they are absent, so an unfilled field costs a little
 * page furniture rather than showing a fabricated claim.
 *
 * Filling any of them in is the only step needed; no component has to change.
 * `googleRating` and `googleReviewCount` also feed `aggregateRating` into the
 * LocalBusiness structured data, which is why they must reflect the real
 * Google Business Profile and nothing else.
 */
export type Accreditation = {
  name: string;
  /** Drop the mark in /public and wire it through ASSETS. */
  logo: AssetPath;
};

export const PROOF: {
  googleRating: number | null;
  googleReviewCount: number | null;
  /** Year the business started trading, e.g. 2016. */
  tradingSince: number | null;
  accreditations: Accreditation[];
} = {
  googleRating: null,
  googleReviewCount: null,
  tradingSince: null,
  accreditations: [],
};

export const hasGoogleRating = (): boolean =>
  PROOF.googleRating !== null && PROOF.googleReviewCount !== null;
