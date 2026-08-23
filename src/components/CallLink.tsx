import { Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/towns";

type Size = "lg" | "sm";
type Tone = "solid" | "outline";

const sizes: Record<Size, string> = {
  lg: "h-14 gap-2.5 px-5 text-cta",
  sm: "h-11 gap-2 px-4 text-[0.9375rem]",
};

/**
 * Only one of these should be solid red on any given screen. The header sits
 * directly above the hero, so it runs as an outline to keep the hero's call
 * button the single loudest object on the page.
 */
const tones: Record<Tone, string> = {
  solid: "bg-red text-white hover:bg-red-dark",
  // /35 rather than a lighter hairline: WCAG wants 3:1 on the boundary of a
  // control, and the border is the only thing defining this button.
  outline:
    "border border-white/35 text-white hover:border-white/60 hover:bg-white/5",
};

export function CallButton({
  size = "lg",
  tone = "solid",
  className = "",
  pulse = false,
  glow = false,
  label,
}: {
  size?: Size;
  tone?: Tone;
  className?: string;
  pulse?: boolean;
  /** Adds a red cast beneath the button. Only worth it on the dark bands. */
  glow?: boolean;
  label?: string;
}) {
  return (
    <a
      href={PHONE_HREF}
      className={`inline-flex items-center justify-center rounded-btn font-bold whitespace-nowrap transition-[background-color,border-color,transform,box-shadow] duration-200 active:translate-y-px ${
        sizes[size]
      } ${tones[tone]} ${
        glow && tone === "solid" ? "shadow-cta hover:shadow-lift" : ""
      } ${className}`}
    >
      <Phone
        aria-hidden="true"
        strokeWidth={2.25}
        className={`${size === "lg" ? "size-5" : "size-4"} shrink-0 ${
          tone === "outline" ? "text-red" : ""
        } ${pulse ? "animate-call-pulse" : ""}`}
      />
      <span>{label ?? `Call now — ${PHONE_DISPLAY}`}</span>
    </a>
  );
}

export function PhoneTextLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={PHONE_HREF}
      className={`font-semibold text-red-dark underline decoration-red/40 underline-offset-4 transition-colors hover:decoration-red ${className}`}
    >
      {PHONE_DISPLAY}
    </a>
  );
}
