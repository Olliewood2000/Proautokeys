"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { CallButton } from "@/components/CallLink";
import { Logo } from "@/components/Logo";
import { BRAND, PHONE_DISPLAY, PHONE_HREF } from "@/data/towns";

/**
 * Dark on every page, so it reads as one band with the hero below it on the
 * landing pages and bookends the footer on the legal pages.
 *
 * Sticky, with a shadow that only appears once the page has actually
 * scrolled — rAF-throttled so the listener never runs more than once per
 * frame. Kept local to this component rather than a shared scroll hook,
 * since nothing else on the page needs scroll position.
 */
export function Header() {
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    let ticking = false;

    const measure = () => {
      setElevated(window.scrollY > 24);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`on-ink sticky top-0 z-20 h-[4.5rem] bg-ink text-white transition-shadow duration-300 md:h-[5.5rem] ${
        elevated ? "shadow-[0_12px_28px_-16px_rgb(20_24_28/0.65)]" : ""
      }`}
    >
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
          href={PHONE_HREF}
          aria-label={`Call ${BRAND} on ${PHONE_DISPLAY}`}
          className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full md:hidden"
        >
          <span className="pointer-events-none flex size-10 items-center justify-center rounded-full bg-red text-white transition-colors hover:bg-red-dark">
            <Phone aria-hidden="true" strokeWidth={2.25} className="size-5" />
          </span>
        </a>
      </div>
    </header>
  );
}
