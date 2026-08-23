/**
 * Every section opens the same way: a mono label with a red tick beside it,
 * then the heading, then an optional line of context. Keeping it in one place
 * is what stops the page drifting back into six slightly different headers.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "start",
  className = "",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "light" | "dark";
  align?: "start" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={`reveal ${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      <p
        className={`flex items-center gap-3 font-mono text-eyebrow font-medium uppercase ${
          centered ? "justify-center" : ""
        } ${tone === "dark" ? "text-white/55" : "text-slate"}`}
      >
        <span aria-hidden="true" className="h-3.5 w-0.5 shrink-0 bg-red" />
        {eyebrow}
      </p>

      <h2 className={`mt-4 text-h2 ${tone === "dark" ? "text-white" : ""}`}>
        {title}
      </h2>

      {lead && (
        <p
          className={`mt-4 text-lead ${
            tone === "dark" ? "text-white/65" : "text-slate"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
