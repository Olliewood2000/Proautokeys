import { LegalPage } from "@/components/LegalPage";
import { BRAND, PHONE_DISPLAY } from "@/data/towns";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `Privacy Policy | ${BRAND}`,
  description: `How ${BRAND} handles the details you give us when you call or request a callback.`,
  path: "/privacy",
  noIndex: true,
});

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      {/* TODO: replace this stub with policy text reviewed by the client. */}
      <p>
        This is a placeholder policy. It needs replacing with final wording
        before the site goes live.
      </p>
      <p>
        When you call us or submit the callback form we collect your name,
        phone number, vehicle registration and a short description of the
        problem. We use those details only to contact you about your enquiry
        and to carry out the work.
      </p>
      <p>
        We do not sell your details or pass them to third parties for
        marketing. To ask what we hold or to have it deleted, call{" "}
        {PHONE_DISPLAY}.
      </p>
    </LegalPage>
  );
}
