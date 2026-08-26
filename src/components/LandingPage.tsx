import { Brands } from "@/components/Brands";
import { CallbackForm } from "@/components/CallbackForm";
import { Coverage } from "@/components/Coverage";
import { CredentialStrip } from "@/components/CredentialStrip";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { BreadcrumbJsonLd, FaqJsonLd, LocalBusinessJsonLd } from "@/components/JsonLd";
import { KeyEdge } from "@/components/KeyEdge";
import { LocalScenarios } from "@/components/LocalScenarios";
import { OnSite } from "@/components/OnSite";
import { Services } from "@/components/Services";
import { StickyCallBar } from "@/components/StickyCallBar";
import { getFaqs } from "@/data/faqs";
import type { PageData } from "@/data/towns";

export function LandingPage({ page, path }: { page: PageData; path: string }) {
  const faqs = page.localFaqs
    ? [
        ...getFaqs(page.town),
        ...page.localFaqs.map(({ q, a }) => ({ question: q, answer: a })),
      ]
    : getFaqs(page.town);

  return (
    <>
      <LocalBusinessJsonLd town={page.town} path={path} geo={page.geo} />
      <FaqJsonLd items={faqs} />
      {path !== "/" && <BreadcrumbJsonLd town={page.town} path={path} />}

      <Header />
      <main>
        <Hero page={page} path={path} />
        <CredentialStrip />
        <KeyEdge />
        <LocalScenarios page={page} />
        <Services />
        <OnSite />
        <HowItWorks />
        <Brands />
        <Coverage page={page} />
        <CallbackForm town={page.town} />
        <Faq items={faqs} />
      </main>
      <Footer coverage={page.footerCoverage} />
      <StickyCallBar />
    </>
  );
}
