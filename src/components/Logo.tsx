import Image from "next/image";
import { ASSETS } from "@/data/assets";
import { BRAND } from "@/data/towns";

/**
 * The logo renders at a fixed pixel height, so it gets explicit dimensions
 * rather than a `sizes` hint. That keeps the generated srcset to a 1x and a 2x
 * candidate instead of the full device-width ladder, and reserves exact space
 * so the header can't shift as it loads.
 *
 * Falls back to a plain wordmark if a logo file is ever missing, so a dropped
 * asset never shows as a broken image.
 */
export function Logo({
  variant = "dark",
  height = 36,
  className,
  priority = false,
}: {
  variant?: "dark" | "light";
  height?: number;
  /** Display-size override. Intrinsic `height` stays the largest render. */
  className?: string;
  /** Set on the header instance, which is above the fold. */
  priority?: boolean;
}) {
  const src = variant === "light" ? ASSETS.logoWhite : ASSETS.logo;

  if (src && typeof src !== "string") {
    return (
      <Image
        src={src}
        alt={`${BRAND} — mobile auto locksmith`}
        height={height}
        width={Math.round(height * (src.width / src.height))}
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <span
      className={`font-display text-xl leading-none font-bold tracking-tight [font-stretch:112%] ${
        variant === "light" ? "text-white" : "text-ink"
      }`}
    >
      <span className={variant === "light" ? "text-white" : "text-red"}>
        PRO
      </span>
      autokeys
    </span>
  );
}
