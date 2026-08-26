"use client";

import { useState } from "react";
import Link from "next/link";
import { PhoneTextLink } from "@/components/CallLink";
import { CoverageMap } from "@/components/CoverageMap";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { getTownByName } from "@/data/towns";
import type { PageData } from "@/data/towns";

/**
 * The dark island in the middle of the page. A coverage map wants a dark
 * ground to read against, and the band breaks up what would otherwise be four
 * light sections in a row.
 *
 * Hover state lives here so the list and the map can light the same town —
 * on the homepage, where the villages list still lives in this section.
 *
 * Town pages carry 3-4 paragraphs of local copy, more than a map column
 * can hold gracefully alongside it. Only the first two run here, next to a
 * map that sticks in place (the same pattern the FAQ heading uses against
 * its taller accordion) rather than being centred against a tall column.
 * The rest of the copy, plus the villages list, move to `CoverageAreas`
 * directly below — see that file for why the list isn't rendered here too.
 */
export function Coverage({ page }: { page: PageData }) {
  const [hoveredTown, setHoveredTown] = useState<string | null>(null);
  const isTownPage = Boolean(page.localScenarios);
  const introParagraphs = isTownPage
    ? page.localIntro.slice(0, 2)
    : page.localIntro;

  return (
    <section id="coverage" className="on-ink bg-ink py-16 text-white md:py-24">
      <div className="mx-auto max-w-content px-5">
        <div className="md:grid md:grid-cols-2 md:items-start md:gap-16">
          <div>
            <SectionHeading
              eyebrow="Where we work"
              title={page.coverageHeading}
              tone="dark"
            />

            <div className="mt-5 space-y-4">
              {introParagraphs.map((paragraph, i) => (
                <p key={i} className="max-w-[58ch] text-body text-white/65">
                  {paragraph}
                </p>
              ))}
            </div>

            {!isTownPage && (
              <p className="mt-6 text-body text-white/65">
                Not sure if we reach you? Give us a call and we&apos;ll tell
                you straight away.{" "}
                <PhoneTextLink className="text-white decoration-red/60 hover:decoration-red" />
              </p>
            )}
          </div>

          <Reveal
            className="mt-12 md:sticky md:top-[7.5rem] md:mt-0"
            delay={1}
          >
            <CoverageMap
              focus={page.mapFocus}
              label={page.mapLabel}
              activeTown={hoveredTown}
              onTownHover={setHoveredTown}
            />
          </Reveal>
        </div>

        {!isTownPage && (
          <div className="mt-14 border-t border-white/12 pt-8">
            <h3 className="font-mono text-eyebrow font-medium text-white/50 uppercase">
              {page.coverageAreasLabel}
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-8 sm:grid-cols-3 md:grid-cols-5">
              {page.nearbyAreas.map((area) => {
                const town = getTownByName(area);
                const isActive = hoveredTown === area;
                return (
                  <li
                    key={area}
                    className={`border-b border-white/10 py-2.5 text-sm transition-colors ${
                      isActive ? "text-white" : "text-white/75"
                    }`}
                    onMouseEnter={() => setHoveredTown(area)}
                    onMouseLeave={() => setHoveredTown(null)}
                  >
                    {town ? (
                      <Link
                        href={`/${town.slug}`}
                        className="transition-colors hover:text-white"
                        onFocus={() => setHoveredTown(area)}
                        onBlur={() => setHoveredTown(null)}
                      >
                        {area}
                      </Link>
                    ) : (
                      area
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
