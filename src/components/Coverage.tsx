import Link from "next/link";
import { PhoneTextLink } from "@/components/CallLink";
import { CoverageMap } from "@/components/CoverageMap";
import { SectionHeading } from "@/components/SectionHeading";
import { getTownByName } from "@/data/towns";
import type { PageData } from "@/data/towns";

/**
 * The dark island in the middle of the page. A coverage map wants a dark
 * ground to read against, and the band breaks up what would otherwise be four
 * light sections in a row.
 *
 * The towns run as a ruled two-column list rather than the pill cloud that was
 * here before, which read as tags to be clicked and were not links.
 */
export function Coverage({ page }: { page: PageData }) {
  return (
    <section id="coverage" className="on-ink bg-ink py-16 text-white md:py-24">
      <div className="mx-auto max-w-content px-5">
        <div className="md:grid md:grid-cols-2 md:items-center md:gap-16">
          <div>
            <SectionHeading
              eyebrow="Where we work"
              title={page.coverageHeading}
              lead={page.localIntro}
              tone="dark"
            />

            <p className="mt-8 text-body text-white/65">
              Not sure if we reach you? Give us a call and we&apos;ll tell you
              straight away.{" "}
              <PhoneTextLink className="text-white decoration-red/60 hover:decoration-red" />
            </p>
          </div>

          <div className="reveal mt-12 md:mt-0">
            <CoverageMap focus={page.mapFocus} label={page.mapLabel} />
          </div>
        </div>

        <div className="mt-14 border-t border-white/12 pt-8">
          <h3 className="font-mono text-eyebrow font-medium text-white/50 uppercase">
            {page.coverageAreasLabel}
          </h3>
          <ul className="mt-5 grid grid-cols-2 gap-x-8 sm:grid-cols-3 md:grid-cols-5">
            {page.nearbyAreas.map((area) => {
              const town = getTownByName(area);
              return (
                <li
                  key={area}
                  className="border-b border-white/10 py-2.5 text-sm text-white/75"
                >
                  {town ? (
                    <Link
                      href={`/${town.slug}`}
                      className="transition-colors hover:text-white"
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
      </div>
    </section>
  );
}
