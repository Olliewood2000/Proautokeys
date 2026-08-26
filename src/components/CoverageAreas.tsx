import { MapPin } from "lucide-react";
import Link from "next/link";
import { PhoneTextLink } from "@/components/CallLink";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { getTownByName } from "@/data/towns";
import type { PageData } from "@/data/towns";

/**
 * The back half of the coverage story — town pages only. `Coverage` above
 * carries the map and the first two paragraphs of local copy; the remaining
 * paragraphs and the villages list live here instead of being piled into
 * one dark section.
 *
 * The villages list is promoted from a footnote-style ruled list into the
 * visual anchor for this section — pinned markers, larger type — so the
 * light half of the story has something to look at that isn't just more
 * paragraphs. No content is invented: it's the same `nearbyAreas` list,
 * given room to be the main event rather than an afterthought.
 *
 * Not synced to the map's hover state on purpose — the two are no longer
 * adjacent, so a hover link between them would point at a map the visitor
 * has already scrolled past.
 */
export function CoverageAreas({ page }: { page: PageData }) {
  if (!page.localScenarios) return null;

  const remainingParagraphs = page.localIntro.slice(2);

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-content px-5">
        <div className="md:grid md:grid-cols-2 md:items-start md:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Also covering"
              title={page.coverageAreasLabel}
            />

            <ul className="mt-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {page.nearbyAreas.map((area) => {
                const town = getTownByName(area);
                return (
                  <li
                    key={area}
                    className="flex items-center gap-2.5 border-b border-line py-3"
                  >
                    <MapPin
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className={`size-4 shrink-0 ${
                        town ? "text-red" : "text-slate/40"
                      }`}
                    />
                    {town ? (
                      <Link
                        href={`/${town.slug}`}
                        className="text-body font-medium transition-colors hover:text-red-dark"
                      >
                        {area}
                      </Link>
                    ) : (
                      <span className="text-body text-slate">{area}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal className="mt-12 md:mt-0" delay={1}>
            {remainingParagraphs.length > 0 && (
              <div className="space-y-4">
                {remainingParagraphs.map((paragraph, i) => (
                  <p key={i} className="max-w-[58ch] text-body text-slate">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            <p className="mt-6 text-body text-slate">
              Not sure if we reach you? Give us a call and we&apos;ll tell you
              straight away. <PhoneTextLink />
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
