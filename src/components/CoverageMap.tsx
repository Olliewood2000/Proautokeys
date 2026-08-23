import { KENT_OUTLINE, KENT_TOWNS, MAP_VIEWBOX, project } from "@/data/kent-map";

/**
 * Kent as a stamped plate: crimson fill, brand-red edge, a milled inner
 * rim, and a survey tick on every town named in the list beside it.
 *
 * Decorative — the ruled town list is the accessible version of the same
 * information, so this is hidden from assistive tech rather than duplicated
 * into it.
 *
 * Deliberately no distance rings, no coverage wash and no graticule. Rings
 * would put a number on the reach that nobody has measured, and a grid is
 * the kind of technical dressing that makes a silhouette look generated.
 */

const FILL = "#5c141c";
const RED = "#c8102e";
const TICK = 6;

export function CoverageMap({
  focus,
  label,
}: {
  focus: { x: number; y: number };
  /** Town pages pin and name their town. The county page has nothing to pin. */
  label?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={MAP_VIEWBOX}
      className="h-auto w-full"
    >
      <defs>
        <clipPath id="coverage-clip">
          <path d={KENT_OUTLINE} />
        </clipPath>
      </defs>

      <path d={KENT_OUTLINE} fill={FILL} />

      {/* Clipped so only the inner half of a thick stroke shows — a milled
          rim rather than a second, offset outline. */}
      <g clipPath="url(#coverage-clip)">
        <path
          d={KENT_OUTLINE}
          fill="none"
          stroke={RED}
          strokeOpacity="0.22"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </g>

      <path
        d={KENT_OUTLINE}
        fill="none"
        stroke={RED}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />

      {KENT_TOWNS.map(({ name, lat, lon }) => {
        if (label && name === label) return null;
        const { x, y } = project(lat, lon);
        return (
          <rect
            key={name}
            x={x - TICK / 2}
            y={y - TICK / 2}
            width={TICK}
            height={TICK}
            fill={RED}
          />
        );
      })}

      {label && (
        <>
          <circle cx={focus.x} cy={focus.y} r={6} fill={RED} />
          <circle cx={focus.x} cy={focus.y} r={2.5} fill="#ffffff" />
          <text
            x={focus.x + 14}
            y={focus.y + 4}
            fill="#ffffff"
            fontSize="13"
            fontWeight="500"
            letterSpacing="0.12em"
            fontFamily="var(--font-plex-mono), ui-monospace, monospace"
          >
            {label}
          </text>
        </>
      )}
    </svg>
  );
}
