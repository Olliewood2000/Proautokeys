import { LegalPage } from "@/components/LegalPage";
import { BRAND, PHONE_DISPLAY } from "@/data/towns";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `Terms of Service | ${BRAND}`,
  description: `The terms that apply when you book mobile auto locksmith work through ${BRAND}.`,
  path: "/terms",
  noIndex: true,
});

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="pt-4 text-h3 text-ink">{children}</h2>;
}

export default function Terms() {
  return (
    <LegalPage title="Terms of Service">
      <p className="text-sm text-slate">Last updated: 26 August 2026</p>

      <p>
        These terms apply whenever you book work with {BRAND}, whether
        that&rsquo;s by phone or through the callback form on this website.
        By asking us to attend a job, you&rsquo;re agreeing to them.
        They&rsquo;re written in plain English on purpose, so if anything is
        unclear, ask us before we set off.
      </p>

      <H2>What we do</H2>
      <p>
        {BRAND} is a mobile auto locksmith service. We attend cars, vans and
        motorbikes at the roadside, at home, at work or wherever the vehicle
        happens to be, and cut, program or repair keys on site. We
        don&rsquo;t offer a recovery service, and we&rsquo;re not a garage;
        the work is done at the vehicle, not on a ramp.
      </p>

      <H2>Quotes and pricing</H2>
      <p>
        Any price we give you over the phone is based on the make, model and
        problem you describe to us. If, once we arrive, the vehicle or the
        fault turns out to be different from what was described, this can
        change the price or the parts needed. If that happens, we&rsquo;ll
        tell you before doing any further work, so you&rsquo;re never charged
        for something you weren&rsquo;t told about first.
      </p>

      <H2>Attending your vehicle</H2>
      <p>
        We&rsquo;ll give you a realistic arrival window when you call rather
        than a time that sounds good but doesn&rsquo;t hold up. Traffic and
        the nature of callout work mean times can shift; if we&rsquo;re going
        to be later than agreed, we&rsquo;ll let you know.
      </p>

      <H2>Proof of ownership</H2>
      <p>
        Before cutting or programming any key, we need proof that the
        vehicle is yours, or that you&rsquo;re authorised to have work done
        on it. In practice this means the V5C logbook and photo ID. We ask
        for this every time, without exception, because it protects you as
        much as it protects us. If you can&rsquo;t provide it on the day, we
        may not be able to complete the job.
      </p>

      <H2>Payment</H2>
      <p>
        Payment is due on completion of the work, once you&rsquo;ve
        confirmed the key or fob is working as it should. We won&rsquo;t
        leave before testing what we&rsquo;ve done, and you won&rsquo;t be
        asked to pay for anything that doesn&rsquo;t work.
      </p>

      <H2>Changing or cancelling a booking</H2>
      <p>
        Plans change, and that&rsquo;s fine, just let us know as soon as you
        can. If you cancel before we&rsquo;ve set off, there&rsquo;s no
        charge. If we&rsquo;re already on our way or have arrived, a
        reasonable call-out charge may apply to cover the time and travel,
        and we&rsquo;ll always tell you this applies before ending the call.
      </p>

      <H2>Workmanship</H2>
      <p>
        Every key and fob is tested at the vehicle before we leave, so you
        can check it works before we go. If a fault appears afterwards
        that&rsquo;s connected to the work we carried out, get in touch and
        we&rsquo;ll look into it. This doesn&rsquo;t cover unrelated faults,
        misuse, or damage caused after we&rsquo;ve left.
      </p>

      <H2>Liability</H2>
      <p>
        We take reasonable care with every vehicle we work on. Nothing in
        these terms limits our liability for death or personal injury caused
        by our negligence, or for anything else that can&rsquo;t legally be
        limited or excluded. Outside of that, our liability is limited to the
        cost of the work carried out.
      </p>

      <H2>This website</H2>
      <p>
        The text, images and design on this site belong to {BRAND} or are
        used with permission, and are here to describe our services, not for
        reuse elsewhere. Manufacturer names and logos shown on the site are
        used to indicate the vehicles we work on and don&rsquo;t imply any
        partnership with those manufacturers.
      </p>

      <H2>Governing law</H2>
      <p>
        These terms are governed by the law of England and Wales, and any
        dispute will be dealt with by the courts of England and Wales.
      </p>

      <H2>Changes to these terms</H2>
      <p>
        We may update these terms from time to time, and the date at the top
        of this page will reflect the latest version. The terms that apply
        to your booking are the ones in place when you asked us to attend.
      </p>

      <H2>Contact us</H2>
      <p>
        Questions about these terms, or about a job you&rsquo;ve booked, can
        be directed to us on {PHONE_DISPLAY}.
      </p>
    </LegalPage>
  );
}
