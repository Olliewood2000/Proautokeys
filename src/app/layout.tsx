import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { BRAND } from "@/data/towns";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const GOOGLE_ADS_ID = "AW-18411796433";

/**
 * One variable superfamily carries both roles. Pulling in the width axis costs
 * a single file and gives headings an expanded cut that body text does not
 * have, which is the whole display voice — no second family needed.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  preload: true,
});

/**
 * Technical data only: step numbers, key-system codes, the plate field.
 * Not preloaded — small text, never the largest element on any page, so
 * giving it a `<link rel="preload">` only pulls bandwidth away from the
 * hero photo and the Archivo file on a first load. `display: "swap"` means
 * there is no invisible-text wait either way, preload or not.
 */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Car Key Replacement Kent | Mobile Auto Locksmith",
  description:
    "Lost, broken or locked in? Mobile auto locksmith covering Kent. Car keys cut and programmed at your vehicle. Call now for a quote.",
  applicationName: BRAND,
  category: "automotive",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: BRAND,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
  formatDetection: {
    email: false,
    address: false,
  },
};

export const viewport = {
  // Matches the header and hero, so the browser chrome joins the dark band.
  themeColor: "#14181c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="beforeInteractive"
        />
        <Script id="google-ads-gtag" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
