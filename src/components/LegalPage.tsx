import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyCallBar } from "@/components/StickyCallBar";
import { HOME_PAGE_DATA } from "@/data/towns";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="bg-paper py-12 md:py-20">
        <div className="mx-auto max-w-[800px] px-5">
          <h1 className="text-h1">{title}</h1>
          <div className="mt-6 space-y-4 text-body text-slate">{children}</div>
        </div>
      </main>
      <Footer coverage={HOME_PAGE_DATA.footerCoverage} />
      <StickyCallBar />
    </>
  );
}
