import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";
import { HOME_PAGE_DATA } from "@/data/towns";

export const metadata: Metadata = {
  title: "Car Key Replacement Kent | Mobile Auto Locksmith",
  description:
    "Lost, broken or locked in? Mobile auto locksmith covering Kent and surrounding areas. Car keys cut and programmed at your vehicle. Call now for a quote.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <LandingPage page={HOME_PAGE_DATA} path="/" />;
}
