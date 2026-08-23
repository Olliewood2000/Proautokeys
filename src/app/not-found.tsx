import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyCallBar } from "@/components/StickyCallBar";
import { HOME_PAGE_DATA } from "@/data/towns";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-[40rem] px-5">
          <p className="font-mono text-eyebrow font-medium text-slate uppercase">
            404
          </p>
          <h1 className="mt-4 text-h1">That page is not here</h1>
          <p className="mt-4 text-body text-slate">
            The link may be old, or the address might be typed wrong. The
            homepage has the coverage area and the number to call.
          </p>
          <p className="mt-8">
            <Link
              href="/"
              className="text-cta font-bold text-red hover:underline"
            >
              Back to the homepage
            </Link>
          </p>
        </div>
      </main>
      <Footer coverage={HOME_PAGE_DATA.footerCoverage} />
      <StickyCallBar />
    </>
  );
}
