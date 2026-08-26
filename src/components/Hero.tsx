import Image from "next/image";
import Link from "next/link";
import { KeyRound } from "lucide-react";
import { CallButton } from "@/components/CallLink";
import { ASSETS } from "@/data/assets";
import type { PageData } from "@/data/towns";

/**
 * The photograph runs off the right edge rather than sitting in a contained
 * box, and the scrims carry it back into the flat ink. On mobile it drops
 * below the text instead, so the headline and the call button are the first
 * things painted.
 */
export function Hero({ page, path }: { page: PageData; path: string }) {
  const photo = ASSETS.heroKey;
  const hasPhoto = Boolean(photo) && typeof photo !== "string";

  return (
    <section className="on-ink relative isolate overflow-hidden bg-ink text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-64 -left-56 size-[34rem] rounded-full bg-red/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-content px-5 pt-12 md:grid md:min-h-[30rem] md:grid-cols-[minmax(0,1fr)_46%] md:items-center md:pt-16 md:pb-20">
        <div className="md:max-w-[33rem]">
          {path !== "/" && (
            <nav aria-label="Breadcrumb" className="rise mb-5">
              <ol className="flex items-center gap-2 font-mono text-eyebrow font-medium text-white/50 uppercase">
                <li>
                  <Link href="/" className="transition-colors hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white/70">{page.town}</li>
              </ol>
            </nav>
          )}

          <p className="rise flex items-center gap-3 font-mono text-eyebrow font-medium text-white/60 uppercase">
            <span aria-hidden="true" className="h-4 w-0.5 shrink-0 bg-red" />
            Mobile auto locksmith
          </p>

          <h1 className="rise mt-5 text-display" style={{ "--rise-step": 1 } as React.CSSProperties}>
            {page.h1}
          </h1>

          <p
            className="rise mt-5 max-w-[36ch] text-lead text-white/70"
            style={{ "--rise-step": 2 } as React.CSSProperties}
          >
            Lost, broken or locked in? We come to you and cut a new key at the
            vehicle.
          </p>

          <div
            className="rise mt-8 flex flex-col gap-3 pb-12 sm:flex-row sm:items-center md:pb-0"
            style={{ "--rise-step": 3 } as React.CSSProperties}
          >
            <CallButton className="w-full sm:w-auto" pulse glow />
            <a
              href="#callback"
              className="inline-flex h-14 w-full items-center justify-center rounded-btn border border-white/35 px-5 text-[0.9375rem] font-medium text-white/85 transition-colors hover:border-white/60 hover:text-white sm:w-auto"
            >
              Request a callback
            </a>
          </div>
        </div>
      </div>

      {/* After the copy in the DOM so mobile reads text first; absolutely
          positioned from md up, where it takes the reserved grid column. */}
      <div className="hero-photo relative aspect-[5/4] w-full sm:aspect-[16/9] md:absolute md:inset-y-0 md:right-0 md:aspect-auto md:w-[52%]">
        {hasPhoto ? (
          <Image
            src={photo as Exclude<typeof photo, string | null>}
            alt="Two replacement Ford keys, cut and programmed on site, held in front of the car they were coded to"
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 768px) 52vw, 100vw"
            className="object-cover object-center"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex size-full items-center justify-center bg-steel"
          >
            <KeyRound strokeWidth={1} className="size-20 text-white/10" />
          </div>
        )}
        <div aria-hidden="true" className="hero-scrim absolute inset-0" />
      </div>
    </section>
  );
}
