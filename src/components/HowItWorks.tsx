import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const STEPS = [
  {
    title: "Call us",
    body: "Tell us your registration and what's happened. You'll get a price before anyone sets off.",
  },
  {
    title: "We come to you",
    body: "Roadside, driveway, car park or work. No recovery truck, no garage visit.",
  },
  {
    title: "Cut, programmed and tested",
    body: "Your new key is cut and coded to your vehicle on the spot, then tested before we leave.",
  },
];

/**
 * The numbering earns its place here because this genuinely is a sequence —
 * the reader needs to know what happens in what order. The rule threading
 * between the numerals says the same thing again in the layout, and runs
 * horizontally on desktop as well as vertically on mobile.
 */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-shell py-16 md:py-24">
      <div className="mx-auto max-w-content px-5">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps, one visit"
          lead="Most jobs are done in a single trip, wherever the car happens to be."
        />

        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-5">
          {STEPS.map(({ title, body }, i) => (
            <Reveal
              key={title}
              as="li"
              delay={i}
              className="relative h-full pl-16 md:pl-0"
            >
              <span
                aria-hidden="true"
                className="absolute top-1 left-0 flex size-11 items-center justify-center rounded-full border border-red/30 bg-red/10 font-mono text-sm font-semibold text-red md:hidden"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Mobile runs the thread down the gutter so card fills don't
                  cover it. Desktop draws the same rule inside each card. */}
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-14 bottom-[-2.5rem] left-[1.35rem] w-px bg-red/35 md:hidden"
                />
              )}

              <div className="h-full rounded-card border border-line bg-paper p-5 shadow-card md:p-7">
                <div className="hidden md:flex md:items-center md:gap-5">
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-mono text-num font-semibold text-red"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-red/35"
                  />
                </div>

                <h3 className="text-h3 md:mt-6">{title}</h3>
                <p className="mt-2 text-body text-slate">{body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
