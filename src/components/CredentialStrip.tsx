import Image from "next/image";
import { Car, Navigation, PoundSterling, Star, Wrench } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { PROOF, hasGoogleRating } from "@/data/proof";

/**
 * The last band of the dark block, between the hero and the key edge.
 *
 * These four are claims the business can stand behind today. When a Google
 * rating or an accreditation exists, `src/data/proof.ts` gets filled in and
 * this section grows to hold it — until then it carries facts rather than
 * an empty "as featured in" shelf.
 */
const FACTS = [
  {
    icon: Navigation,
    title: "We come to you",
    detail: "Roadside, driveway or car park",
  },
  {
    icon: Wrench,
    title: "Cut & coded on site",
    detail: "No recovery, no garage booking",
  },
  {
    icon: Car,
    title: "All makes & models",
    detail: "Cars, vans and motorbikes",
  },
  {
    icon: PoundSterling,
    title: "Price before we travel",
    detail: "Agreed on the phone, not on arrival",
  },
];

export function CredentialStrip() {
  return (
    <section className="on-ink border-t border-white/10 bg-ink text-white">
      <div className="mx-auto max-w-content px-5 py-8 md:py-10">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-7 md:grid-cols-4 md:gap-x-8">
          {FACTS.map(({ icon: Icon, title, detail }, i) => (
            <Reveal key={title} as="li" delay={i} className="flex gap-3">
              <Icon
                aria-hidden="true"
                strokeWidth={1.75}
                className="mt-0.5 size-5 shrink-0 text-red"
              />
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-1 text-[0.8125rem] leading-snug text-white/55">
                  {detail}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <ProofRow />
      </div>
    </section>
  );
}

/** Renders nothing at all until there is something real to show. */
function ProofRow() {
  const showRating = hasGoogleRating();
  const marks = PROOF.accreditations.filter(
    (a) => a.logo && typeof a.logo !== "string",
  );

  if (!showRating && marks.length === 0) return null;

  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-6">
      {showRating && (
        <p className="flex items-center gap-2 text-sm">
          <span aria-hidden="true" className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                strokeWidth={0}
                className={`size-4 ${
                  i < Math.round(PROOF.googleRating ?? 0)
                    ? "fill-red"
                    : "fill-white/20"
                }`}
              />
            ))}
          </span>
          <span className="font-semibold">
            {PROOF.googleRating?.toFixed(1)}
          </span>
          <span className="text-white/55">
            from {PROOF.googleReviewCount} Google reviews
          </span>
        </p>
      )}

      {marks.map((mark) => (
        <Image
          key={mark.name}
          src={mark.logo as Exclude<typeof mark.logo, string | null>}
          alt={mark.name}
          height={32}
          className="h-8 w-auto opacity-70"
        />
      ))}
    </div>
  );
}
