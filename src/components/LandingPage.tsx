import { Brands } from "@/components/Brands";
import { CallbackForm } from "@/components/CallbackForm";
import { Coverage } from "@/components/Coverage";
import { CredentialStrip } from "@/components/CredentialStrip";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { FaqJsonLd, LocalBusinessJsonLd } from "@/components/JsonLd";
import { KeyEdge } from "@/components/KeyEdge";
import { Services } from "@/components/Services";
import { StickyCallBar } from "@/components/StickyCallBar";
import { getFaqs } from "@/data/faqs";
import type { PageData } from "@/data/towns";

export function LandingPage({ page, path }: { page: PageData; path: string }) {
  const faqs = getFaqs(page.town);

  return (
    <>
      <LocalBusinessJsonLd town={page.town} path={path} />
      <FaqJsonLd items={faqs} />

      <Header />
      <main>
        <Hero page={page} />
        <CredentialStrip />
        <KeyEdge />
        <Services />
        <HowItWorks />
        <Brands />
        <Coverage page={page} />
        <CallbackForm />
        <Faq items={faqs} />
      </main>
      <Footer coverage={page.footerCoverage} />
      <StickyCallBar />
    </>
  );
}
