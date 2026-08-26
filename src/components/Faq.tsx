"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import type { Faq as FaqItem } from "@/data/faqs";

export function Faq({ items }: { items: FaqItem[] }) {
  const id = useId();
  // Pricing is the top objection, so it starts open.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-content px-5 md:grid md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:gap-16">
        <SectionHeading
          eyebrow="Common questions"
          title="The things people ask first"
          className="md:sticky md:top-[7.5rem] md:self-start"
        />

        <div className="mt-10 md:mt-0">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            const panelId = `${id}-panel-${i}`;
            const buttonId = `${id}-button-${i}`;

            return (
              <div
                key={item.question}
                className="border-t border-line last:border-b"
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-5 py-5 text-left text-h3 font-display font-semibold [font-stretch:106%]"
                  >
                    {item.question}
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line transition-colors group-hover:border-ink">
                      <Plus
                        aria-hidden="true"
                        strokeWidth={2}
                        className={`size-4 text-red transition-transform duration-200 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                  className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[62ch] pb-6 text-body text-slate">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
