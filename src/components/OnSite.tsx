import Image from "next/image";
import { KeyRound } from "lucide-react";
import { ASSETS } from "@/data/assets";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Mid-page proof that the job happens at the vehicle. Sits between the
 * services grid and the three steps so the landing page is not type-only
 * between the hero photograph and the callback form.
 *
 * The hero already owns the edge-to-edge crop, so this one stays inside
 * the content column. A missing asset renders a steel placeholder rather
 * than requesting a file that is not there yet.
 */
export function OnSite() {
  const photo = ASSETS.onSite;
  const hasPhoto = Boolean(photo) && typeof photo !== "string";

  return (
    <section id="on-site" className="bg-paper pb-16 md:pb-24">
      <div className="mx-auto max-w-content px-5">
        <Reveal as="figure" className="relative overflow-hidden rounded-card">
          <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
            {hasPhoto ? (
              <Image
                src={photo as Exclude<typeof photo, string | null>}
                alt="Locksmith programming a replacement car key on a key-cutting machine"
                fill
                placeholder="blur"
                sizes="(min-width: 1140px) 1140px, 100vw"
                className="object-cover object-[center_58%]"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex size-full items-center justify-center bg-steel"
              >
                <KeyRound strokeWidth={1} className="size-20 text-white/10" />
              </div>
            )}

            <div aria-hidden="true" className="on-site-scrim absolute inset-0" />
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-[3px] bg-red"
            />
          </div>

          <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-8">
            <p className="flex items-center gap-3 font-mono text-eyebrow font-medium text-white/70 uppercase">
              <span aria-hidden="true" className="h-3.5 w-0.5 shrink-0 bg-red" />
              On site
            </p>
            <p className="mt-3 max-w-[32ch] text-h3 text-white">
              Cut and coded at the vehicle — no garage, no recovery.
            </p>
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
