/**
 * The signature. A milled key-blade profile cutting the dark hero into the
 * white page below — the one place the page borrows the shape of the trade's
 * own artifact. Used exactly once; repeated anywhere else it stops being a
 * detail and becomes wallpaper.
 *
 * Drawn as an SVG `<pattern>` in user units rather than a stretched viewBox,
 * so the tooth pitch stays a constant 360px at every viewport width the way
 * real milling would, instead of squashing on phones and gaping on monitors.
 *
 * The ink is the blade and the white below is the metal milled away, so the
 * cuts notch upward out of a continuous spine rather than hanging down off it.
 * Four cuts per tile at varying depths with flanks at roughly 45°; the profile
 * returns to the spine at x=360, so the tile is seamless.
 */
const BITTING = [
  "M0,0 L0,16",
  "L46,16 L56,9 L84,9 L94,16",
  "L140,16 L150,5 L178,5 L188,16",
  "L228,16 L238,11 L266,11 L276,16",
  "L312,16 L322,7 L350,7 L360,16",
  "L360,0 Z",
].join(" ");

export function KeyEdge() {
  return (
    <div aria-hidden="true" className="bg-paper">
      <svg
        className="block h-5 w-full text-ink"
        preserveAspectRatio="none"
        focusable="false"
      >
        <defs>
          <pattern
            id="key-edge-bitting"
            patternUnits="userSpaceOnUse"
            width="360"
            height="20"
          >
            <path d={BITTING} fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#key-edge-bitting)" />
      </svg>
    </div>
  );
}
