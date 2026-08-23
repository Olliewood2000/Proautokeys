"use client";

import { useId, useState } from "react";
import { CheckCircle2, Loader2, Phone } from "lucide-react";
import { PhoneTextLink } from "@/components/CallLink";
import { PHONE_DISPLAY, PHONE_TEL } from "@/data/towns";

type Fields = {
  name: string;
  phone: string;
  reg: string;
  detail: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", phone: "", reg: "", detail: "" };

/** No `outline-none` here. It would suppress the global focus ring as well as
 *  the browser default, leaving a border colour change as the only focus cue. */
const inputClass =
  "h-12 w-full rounded-btn border border-field bg-paper px-3.5 text-body text-ink transition-colors placeholder:text-slate focus:border-ink";

/** Deliberately loose: enough to catch a typo, never enough to reject a real
 *  number. A visitor turned away by validation is a lost job. */
function validate(fields: Fields): Errors {
  const errors: Errors = {};

  if (fields.name.trim() === "") {
    errors.name = "Enter your name so we know who we're calling.";
  }

  const digits = fields.phone.replace(/\D/g, "");
  if (digits === "") {
    errors.phone = "Enter a phone number so we can ring you back.";
  } else if (digits.length < 10) {
    errors.phone = "That looks too short for a UK number.";
  }

  return errors;
}

export function CallbackForm() {
  const id = useId();
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">(
    "idle",
  );
  // Held separately from `fields` so the confirmation keeps showing the number
  // we actually submitted, whatever happens to the inputs afterwards.
  const [sentTo, setSentTo] = useState("");

  const set = (key: keyof Fields) => (value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    // Clear a field's error the moment it is being corrected, rather than
    // making the visitor resubmit to find out whether they fixed it.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!response.ok) throw new Error(String(response.status));
      setSentTo(fields.phone.trim());
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <section id="callback" className="scroll-mt-6 bg-shell py-16 md:py-24">
      <div className="mx-auto max-w-[38rem] px-5">
        <div className="overflow-hidden rounded-card border border-line bg-paper shadow-lift">
          <div className="bg-ink px-6 py-5 text-white md:px-8">
            <h2 className="text-h3 font-bold">
              {status === "sent" ? "Callback requested" : "Prefer a callback?"}
            </h2>
            <p className="mt-1 text-sm text-white/60">
              {status === "sent"
                ? "We've got your details."
                : "Calling is fastest. If you can't talk, leave your details and we'll ring you."}
            </p>
          </div>

          <div className="p-6 md:p-8">
            {status === "sent" ? (
              <div className="text-center">
                <CheckCircle2
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="mx-auto size-10 text-red"
                />
                <p className="mt-4 text-body text-slate">
                  We&apos;ll ring you back on{" "}
                  <span className="font-semibold text-ink">{sentTo}</span>{" "}
                  as soon as we&apos;re free. If it turns urgent, calling us is
                  still the fastest way to get sorted.
                </p>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-btn border border-line px-5 font-semibold transition-colors hover:border-ink"
                >
                  <Phone aria-hidden="true" strokeWidth={2.25} className="size-4 text-red" />
                  {PHONE_DISPLAY}
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="grid gap-5">
                <Field
                  id={`${id}-name`}
                  label="Your name"
                  error={errors.name}
                >
                  <input
                    id={`${id}-name`}
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={fields.name}
                    onChange={(e) => set("name")(e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? `${id}-name-error` : undefined}
                    className={inputClass}
                  />
                </Field>

                <Field
                  id={`${id}-phone`}
                  label="Phone number"
                  error={errors.phone}
                >
                  <input
                    id={`${id}-phone`}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={fields.phone}
                    onChange={(e) => set("phone")(e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
                    className={inputClass}
                  />
                </Field>

                <Field
                  id={`${id}-reg`}
                  label="Vehicle registration"
                  hint="Optional, but it's the fastest way for us to price the job."
                >
                  <PlateInput
                    id={`${id}-reg`}
                    value={fields.reg}
                    onChange={set("reg")}
                  />
                </Field>

                <Field id={`${id}-detail`} label="What's happened?">
                  <input
                    id={`${id}-detail`}
                    name="detail"
                    type="text"
                    placeholder="Lost my only key, car's on the driveway"
                    value={fields.detail}
                    onChange={(e) => set("detail")(e.target.value)}
                    className={inputClass}
                  />
                </Field>

                {/* No `on-ink` here even though the button is graphite: the
                    ring is drawn outside it, on the white card. */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-btn bg-ink px-6 font-bold text-white transition-colors hover:bg-steel disabled:opacity-60"
                >
                  {status === "sending" && (
                    <Loader2
                      aria-hidden="true"
                      className="size-4 animate-spin"
                    />
                  )}
                  {status === "sending" ? "Sending" : "Request a callback"}
                </button>

                {status === "failed" && (
                  <p
                    role="alert"
                    className="rounded-btn border border-red/30 bg-red/5 px-4 py-3 text-sm text-ink"
                  >
                    That didn&apos;t send. Please call us on{" "}
                    <PhoneTextLink /> and we&apos;ll sort it on the phone.
                  </p>
                )}

                <p className="text-[0.8125rem] text-slate">
                  We&apos;ll only use your details to get in touch about your
                  enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * A real number plate rather than another grey box. It is the one field that
 * tells us what the job actually is, so it is worth making the one field
 * people want to fill in.
 */
function PlateInput({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    /* The ring goes on the wrapper, not the input: an outline on the input
       itself would draw inside the plate and read as a defect in it. Written
       longhand to match the global focus ring exactly. */
    <div className="flex h-14 overflow-hidden rounded-btn border-2 border-[#cfae12] focus-within:[outline:3px_solid_var(--color-red)] focus-within:outline-offset-2">
      <span
        aria-hidden="true"
        className="flex w-9 shrink-0 flex-col items-center justify-end bg-[#0b3d91] pb-2 font-mono text-[0.625rem] font-semibold tracking-widest text-white"
      >
        UK
      </span>
      <input
        id={id}
        name="reg"
        type="text"
        autoCapitalize="characters"
        autoCorrect="off"
        spellCheck={false}
        placeholder="AB12 CDE"
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        className="plate-field h-full w-full min-w-0 border-0 px-3 text-center font-mono text-xl font-semibold outline-none"
      />
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold">
        {label}
      </label>
      {hint && <p className="mt-0.5 mb-2 text-[0.8125rem] text-slate">{hint}</p>}
      <div className={hint ? "" : "mt-2"}>{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-dark">
          {error}
        </p>
      )}
    </div>
  );
}
