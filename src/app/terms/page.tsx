import { LegalPage } from "@/components/LegalPage";
import { BRAND } from "@/data/towns";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `Terms of Service | ${BRAND}`,
  description: `The terms that apply when you book mobile auto locksmith work through ${BRAND}.`,
  path: "/terms",
  noIndex: true,
});

export default function Terms() {
  return (
    <LegalPage title="Terms of Service">
      {/* TODO: replace this stub with terms reviewed by the client. */}
      <p>
        This is a placeholder. It needs replacing with final wording before the
        site goes live.
      </p>
      <p>
        Prices quoted over the phone are based on the vehicle details you give
        us. If the vehicle or the work turns out to be different from what was
        described, we will tell you before continuing.
      </p>
      <p>
        Proof of ownership — normally the V5C logbook and photo ID — is required
        before any key is cut or programmed.
      </p>
    </LegalPage>
  );
}
