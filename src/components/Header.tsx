import Link from "next/link";
import { Phone } from "lucide-react";
import { CallButton } from "@/components/CallLink";
import { Logo } from "@/components/Logo";
import { BRAND, PHONE_DISPLAY, PHONE_TEL } from "@/data/towns";

/**
 * Dark on every page, so it reads as one band with the hero below it on the
 * landing pages and bookends the footer on the legal pages.
 */
export function Header() {
  return (
    <header className="on-ink relative z-20 h-[4.5rem] bg-ink text-white md:h-[5.5rem]">
      <div className="mx-auto flex h-full max-w-content items-center justify-between px-5">
        <Link href="/" className="flex items-center">
          <Logo
            variant="light"
            height={64}
            className="h-14 w-auto md:h-16"
            priority
          />
        </Link>

        {/* Wrapped rather than given `hidden md:inline-flex` directly: the
            button sets its own display, and two display utilities on one
            element resolve by stylesheet order, not by class order. */}
        <div className="hidden md:block">
          <CallButton size="sm" tone="outline" />
        </div>

        <a
          href={`tel:${PHONE_TEL}`}
          aria-label={`Call ${BRAND} on ${PHONE_DISPLAY}`}
          className="flex size-12 items-center justify-center rounded-full md:hidden"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-red text-white transition-colors hover:bg-red-dark">
            <Phone aria-hidden="true" strokeWidth={2.25} className="size-5" />
          </span>
        </a>
      </div>
    </header>
  );
}
