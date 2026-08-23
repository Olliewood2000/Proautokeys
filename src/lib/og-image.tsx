import { ImageResponse } from "next/og";
import { BRAND, PHONE_DISPLAY } from "@/data/towns";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Shared Open Graph / Twitter card. Kept to flexbox and inline styles —
 * ImageResponse only supports a subset of CSS.
 */
export function ogImage({
  title,
  kicker = "Mobile auto locksmith",
}: {
  title: string;
  kicker?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px 80px",
          background: "#14181c",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <div
            style={{
              width: 10,
              height: 22,
              marginRight: 16,
              background: "#c8102e",
            }}
          />
          {kicker}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: 980,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
          }}
        >
          <div style={{ display: "flex", fontWeight: 700 }}>{BRAND}</div>
          <div style={{ display: "flex", color: "rgba(255,255,255,0.7)" }}>
            {PHONE_DISPLAY}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
