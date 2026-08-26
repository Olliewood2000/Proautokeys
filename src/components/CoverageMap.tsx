"use client";

import { useId } from "react";
import {
  KENT_CORRIDORS,
  KENT_OUTLINE,
  KENT_TOWNS,
  MAP_VIEWBOX,
  project,
} from "@/data/kent-map";

/**
 * Kent as a corridor chart: a dark plate, brand-red edge, a milled inner
 * rim, the M20 / M2 / A2 / A21 centrelines, and a lit node on every town
 * named in the list below it.
 *
 * Decorative — the ruled town list is the accessible version of the same
 * information, so this is hidden from assistive tech rather than duplicated
 * into it. Nodes take pointer hover only; they are not in the tab order.
 *
 * Deliberately no distance rings, no coverage wash and no graticule. Rings
 * would put a number on the reach that nobody has measured, and a grid is
 * the kind of technical dressing that makes a silhouette look generated.
 */

const FILL = "#1a2228";
const RED = "#c8102e";
const LABEL_FONT = "var(--font-plex-mono), ui-monospace, monospace";

function corridorPath(points: { lat: number; lon: number }[]): string {
  return points
    .map((point, i) => {
      const { x, y } = project(point.lat, point.lon);
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}

export function CoverageMap({
  focus,
  label,
  activeTown = null,
  onTownHover,
}: {
  focus: { x: number; y: number };
  /** Town pages pin and name their town. The county page has nothing to pin. */
  label?: string;
  activeTown?: string | null;
  onTownHover?: (name: string | null) => void;
}) {
  const clipId = `coverage-clip-${useId().replace(/:/g, "")}`;
  const hoverMatchesTown =
    activeTown != null &&
    KENT_TOWNS.some((town) => town.name === activeTown);
  const highlighted = (hoverMatchesTown ? activeTown : null) ?? label ?? null;
  const dimOthers = Boolean(highlighted);

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={MAP_VIEWBOX}
      className="h-auto w-full"
    >
      <defs>
        <clipPath id={clipId}>
          <path d={KENT_OUTLINE} />
        </clipPath>
      </defs>

      <path d={KENT_OUTLINE} fill={FILL} />

      {/* Clipped so only the inner half of a thick stroke shows — a milled
          rim rather than a second, offset outline. */}
      <g clipPath={`url(#${clipId})`}>
        <path
          d={KENT_OUTLINE}
          fill="none"
          stroke={RED}
          strokeOpacity="0.22"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {KENT_CORRIDORS.map((corridor) => (
          <path
            key={corridor.id}
            d={corridorPath(corridor.points)}
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.28"
            strokeWidth="1.35"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}
      </g>

      <path
        d={KENT_OUTLINE}
        fill="none"
        stroke={RED}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />

      {KENT_CORRIDORS.map((corridor) => {
        const { x, y } = project(corridor.labelAt.lat, corridor.labelAt.lon);
        return (
          <text
            key={`${corridor.id}-label`}
            x={x}
            y={y}
            fill="#ffffff"
            fillOpacity="0.4"
            fontSize="9"
            fontWeight="500"
            letterSpacing="0.14em"
            fontFamily={LABEL_FONT}
            className="hidden sm:block"
          >
            {corridor.label}
          </text>
        );
      })}

      {KENT_TOWNS.map(({ name, lat, lon }) => {
        if (label && name === label) return null;
        const { x, y } = project(lat, lon);
        const isActive = highlighted === name;
        const labelLeft = x > 470;
        return (
          <g
            key={name}
            opacity={dimOthers && !isActive ? 0.35 : 1}
            className="transition-opacity duration-150"
            onPointerEnter={() => onTownHover?.(name)}
            onPointerLeave={() => onTownHover?.(null)}
          >
            <circle
              cx={x}
              cy={y}
              r={isActive ? 12 : 8}
              fill={RED}
              fillOpacity={isActive ? 0.28 : 0.18}
            />
            <circle cx={x} cy={y} r={isActive ? 3.5 : 2.5} fill={RED} />
            <circle cx={x} cy={y} r={14} fill="transparent" />
            {isActive && (
              <text
                x={labelLeft ? x - 14 : x + 14}
                y={y + 4}
                fill="#ffffff"
                fontSize="13"
                fontWeight="500"
                letterSpacing="0.12em"
                fontFamily={LABEL_FONT}
                textAnchor={labelLeft ? "end" : "start"}
              >
                {name}
              </text>
            )}
          </g>
        );
      })}

      {label && (
        <g>
          <circle cx={focus.x} cy={focus.y} r={6} fill={RED} />
          <circle cx={focus.x} cy={focus.y} r={2.5} fill="#ffffff" />
          <text
            x={focus.x + 14}
            y={focus.y + 4}
            fill="#ffffff"
            fontSize="13"
            fontWeight="500"
            letterSpacing="0.12em"
            fontFamily={LABEL_FONT}
          >
            {label}
          </text>
        </g>
      )}
    </svg>
  );
}
