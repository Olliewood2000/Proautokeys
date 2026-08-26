import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import type { PageData } from "@/data/towns";

/**
 * "Where keys go missing in {town}" — town-only, sits high on the page so
 * unique local content is the first thing after the hero. Renders nothing on
 * the homepage, which has no single town's worth of scenarios to list.
 *
 * Cards reuse the exact styling from the services grid rather than
 * introducing a second card pattern.
 */
export function LocalScenarios({ page }: { page: PageData }) {
  if (!page.localScenarios) return null;

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-content px-5">
        <SectionHeading
          eyebrow="Local knowledge"
          title={`Where keys go missing in ${page.town}`}
        />

        <Reveal
          as="ul"
          className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5"
        >
          {page.localScenarios.map(({ title, line }) => (
            <li
              key={title}
              className="group relative overflow-hidden rounded-card border border-line bg-paper p-5 shadow-card transition-[border-color,box-shadow,transform] duration-200 md:p-7 md:hover:-translate-y-1 md:hover:border-red/30 md:hover:shadow-lift"
            >
              <h3 className="text-h3">{title}</h3>
              <p className="mt-2 text-body text-slate">{line}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
