import {
  DoorOpen,
  KeyRound,
  KeySquare,
  RadioTower,
  SearchX,
  Unplug,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

/**
 * `wide` marks the two jobs people ring about in a panic. They get double the
 * width on desktop so the grid reflects what the business actually gets called
 * for, instead of presenting six equally weighted options to someone who is
 * already stressed.
 */
const SERVICES = [
  {
    icon: SearchX,
    title: "Lost car keys",
    body: "No spare? We can cut and program a new key from scratch, on site.",
    wide: true,
  },
  {
    icon: KeyRound,
    title: "All keys lost",
    body: "Every key gone, no spare anywhere? We can still get you back on the road.",
    wide: true,
  },
  {
    icon: KeySquare,
    title: "Spare keys",
    body: "Get a second key cut and programmed before you need it.",
  },
  {
    icon: Unplug,
    title: "Broken or snapped keys",
    body: "Key snapped in the lock or ignition? We extract it and cut a replacement.",
  },
  {
    icon: RadioTower,
    title: "Key fob repair",
    body: "Buttons not working, fob unresponsive, central locking playing up.",
  },
  {
    icon: DoorOpen,
    title: "Locked out",
    body: "Keys locked inside, or the door won't open. Non-destructive entry.",
  },
];

const ALSO_COVERED = [
  "Key stuck in ignition",
  "Ignition barrel replacement",
  "Transponder & smart key programming",
  "Stolen key replacement",
  "Van, motorbike and caravan keys",
];

export function Services() {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-content px-5">
        <SectionHeading
          eyebrow="What we cover"
          title="Every way a car key goes wrong"
          lead="Car, van and motorbike keys — cut, programmed and tested at your vehicle."
        />

        {/* Single column until 640px: two-up at phone width squeezed the copy
            into three-word lines. */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
          {SERVICES.map(({ icon: Icon, title, body, wide }) => (
            <li
              key={title}
              className={`group rounded-card border border-line bg-paper p-5 shadow-card transition-[border-color,box-shadow,transform] duration-200 md:p-7 md:hover:-translate-y-1 md:hover:border-transparent md:hover:shadow-lift ${
                wide ? "sm:col-span-2" : ""
              }`}
            >
              <span className="flex size-11 items-center justify-center rounded-card bg-ink transition-colors duration-200 group-hover:bg-red">
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="size-5 text-white"
                />
              </span>
              <h3 className="mt-5 text-h3">{title}</h3>
              <p className="mt-2 text-body text-slate">{body}</p>
            </li>
          ))}
        </ul>

        {/* The slash only separates when the items sit inline, so it waits for
            md. At phone width each is its own line, where a trailing slash is
            litter. */}
        <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-6 font-mono text-[0.75rem] font-medium tracking-wide text-slate uppercase">
          {ALSO_COVERED.map((item) => (
            <li
              key={item}
              className="after:hidden after:ml-3 after:text-line last:after:hidden md:after:inline md:after:content-['/']"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
