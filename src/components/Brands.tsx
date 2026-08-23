import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { BRAND_LOGOS } from "@/data/assets";
import { BRANDS } from "@/data/brands";

/**
 * The brand wall.
 *
 * A logo grid on its own is decoration — every locksmith site has one, and it
 * says nothing a customer can use. Naming the blade profiles and systems
 * carried for each make turns the same grid into evidence, and it is the kind
 * of detail only someone who actually does the work would bother to list.
 *
 * A static grid rather than a carousel: a carousel would hide most of the
 * makes behind an interaction, which is the opposite of the point.
 */
export function Brands() {
  return (
    <section id="makes" className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-content px-5">
        <SectionHeading
          eyebrow="Makes we cover"
          title="Cut and coded for what's on Kent roads"
          lead="Blade profiles and key systems we carry, by make. Not sure which yours takes? Give us the registration and we'll tell you."
        />

        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3 md:grid-cols-4">
          {BRANDS.map((brand) => (
            <li key={brand.slug}>
              <BrandTile {...brand} />
            </li>
          ))}

          {/* Double-width. Twenty-two makes plus a two-wide tile is twenty-four
              cells, which divides evenly by 2, 3 and 4 — so no breakpoint ends
              on a hole showing the grid's hairline background through it. */}
          <li className="col-span-2">
            <a
              href="#callback"
              className="group flex h-full min-h-[9.5rem] flex-col justify-between bg-ink p-5 text-white transition-colors duration-200 hover:bg-red"
            >
              <span className="font-mono text-eyebrow font-medium text-white/60 uppercase transition-colors group-hover:text-white/80">
                Not listed?
              </span>
              <span className="flex items-end justify-between gap-2">
                <span className="text-h3 font-semibold">
                  Tell us your reg
                </span>
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={2}
                  className="mb-1 size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

function BrandTile({
  slug,
  name,
  systems,
}: {
  slug: string;
  name: string;
  systems: string;
}) {
  const logo = BRAND_LOGOS[slug];
  const hasLogo = Boolean(logo) && typeof logo !== "string";

  return (
    <div className="group flex h-full min-h-[9.5rem] flex-col justify-between bg-paper p-5 transition-colors duration-200 hover:bg-shell">
      <div className="flex h-10 items-center">
        {hasLogo ? (
          <Image
            src={logo as Exclude<typeof logo, string | null>}
            alt={name}
            height={40}
            unoptimized
            style={{ width: "auto", height: "auto" }}
            className="max-h-10 max-w-[7rem] grayscale opacity-60 transition duration-200 group-hover:opacity-100 group-hover:grayscale-0"
          />
        ) : (
          /* Until artwork lands, the make is set in the display face. A grid of
             these still reads as a brand wall rather than a gap. */
          <span className="font-display text-lg font-bold tracking-tight text-slate transition-colors duration-200 [font-stretch:112%] group-hover:text-ink">
            {name}
          </span>
        )}
      </div>

      <div className="mt-4">
        {hasLogo && (
          <p className="text-sm font-semibold">{name}</p>
        )}
        <p className="mt-1 font-mono text-[0.6875rem] leading-relaxed font-medium text-slate">
          {systems}
        </p>
      </div>
    </div>
  );
}
