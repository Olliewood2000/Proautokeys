import Link from "next/link";
import { CallButton } from "@/components/CallLink";
import { Logo } from "@/components/Logo";
import { BRANDS } from "@/data/brands";
import { PROOF } from "@/data/proof";
import { BRAND, PHONE_DISPLAY, PHONE_TEL, TOWNS } from "@/data/towns";

const SERVICES = [
  "Lost car keys",
  "All keys lost",
  "Spare keys",
  "Broken or snapped keys",
  "Key fob repair",
  "Locked out",
];

/**
 * The close. Previously a flat red slab stacked on a black footer, which was
 * two heavy bands back to back; now one dark band where the call to action
 * sits on top of the footer and red survives only in the button.
 */
export function Footer({ coverage }: { coverage: string }) {
  const year = new Date().getFullYear();
  const topMakes = BRANDS.slice(0, 8);

  return (
    <footer className="on-ink bg-ink text-white">
      <div className="mx-auto max-w-content px-5">
        <div className="border-b border-white/10 py-16 text-center md:py-20">
          <h2 className="text-h2">Locked out or lost your keys?</h2>
          <p className="mx-auto mt-4 max-w-md text-lead text-white/65">
            One call gets you a straight answer and a price before anyone
            travels.
          </p>
          <CallButton className="mx-auto mt-8" glow />
        </div>

        {/* Two-up at phone width. Three stacked single-file lists made the
            footer taller than the section above it. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo variant="light" height={40} />
            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-5 block text-cta font-bold hover:underline"
            >
              {PHONE_DISPLAY}
            </a>
            <p className="mt-3 max-w-xs text-body text-white/60">{coverage}</p>
            <address className="mt-4 text-sm text-white/55 not-italic">
              Mobile service — Kent, United Kingdom
              {PROOF.tradingSince && <> · Trading since {PROOF.tradingSince}</>}
            </address>
          </div>

          <FooterColumn title="What we do" items={SERVICES} />

          <FooterColumn
            title="Makes we cover"
            items={[...topMakes.map((b) => b.name), "…and more"]}
          />

          <div>
            <FooterHeading>Areas</FooterHeading>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              {TOWNS.map((town) => (
                <li key={town.slug}>
                  <Link
                    href={`/${town.slug}`}
                    className="transition-colors hover:text-white"
                  >
                    {town.town}
                  </Link>
                </li>
              ))}
              <li>Across the rest of Kent on request</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 py-6 text-sm text-white/50">
          <Link href="/privacy" className="transition-colors hover:text-white">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-white">
            Terms
          </Link>
          <span className="ml-auto">
            © {year} {BRAND}
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <FooterHeading>{title}</FooterHeading>
      <ul className="mt-4 space-y-2.5 text-sm text-white/60">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-eyebrow font-medium text-white/55 uppercase">
      {children}
    </p>
  );
}
