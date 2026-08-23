import { Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/data/towns";

/**
 * Mobile only. Body has matching bottom padding in globals.css so the footer
 * is never hidden behind it. Nothing else on the page may overlap this.
 */
export function StickyCallBar() {
  return (
    <a
      href={`tel:${PHONE_TEL}`}
      className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-2.5 bg-red text-cta font-bold text-white shadow-bar transition-colors hover:bg-red-dark md:hidden"
      style={{
        height: "calc(var(--call-bar-height) + env(safe-area-inset-bottom, 0px))",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <Phone aria-hidden="true" strokeWidth={2.25} className="size-5 shrink-0" />
      Call now — {PHONE_DISPLAY}
    </a>
  );
}
