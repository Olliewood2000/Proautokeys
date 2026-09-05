import { LegalPage } from "@/components/LegalPage";
import { BRAND, PHONE_DISPLAY } from "@/data/towns";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `Privacy Policy | ${BRAND}`,
  description: `How ${BRAND} handles the details you give us when you call or request a callback.`,
  path: "/privacy",
  noIndex: true,
});

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="pt-4 text-h3 text-ink">{children}</h2>;
}

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <p className="text-sm text-slate">Last updated: 5 September 2026</p>

      <p>
        {BRAND} is a mobile auto locksmith service covering Kent. This policy
        explains what information we collect when you contact us, why we
        collect it, and what you can do if you want it changed or removed. If
        anything here isn&rsquo;t clear, the quickest way to ask is to call us
        on {PHONE_DISPLAY}.
      </p>

      <H2>Information we collect</H2>
      <p>
        We only collect what you give us directly, either over the phone or
        through the callback form on this website. Depending on how you get
        in touch, that can include your name, phone number, vehicle
        registration, a short description of the problem, and, if you leave
        it, an email address. If you use the callback form, we also note
        which page you submitted it from, so we know what job you&rsquo;re
        calling about.
      </p>
      <p>
        We don&rsquo;t ask for payment details through the website, and the
        site doesn&rsquo;t run any sign-up or account system, so there&rsquo;s
        no password or profile data to worry about.
      </p>

      <H2>How we use it</H2>
      <p>
        Your details are used to call you back, agree a price, arrange a
        time, and carry out the work you&rsquo;ve asked for. Where we cut and
        program a key, we may also keep a basic record of the job, such as
        the vehicle and the work done, for our own accounts and in case a
        query comes up afterwards.
      </p>
      <p>
        We don&rsquo;t use your details for marketing, and we don&rsquo;t
        build up a profile of you for advertising purposes. Nothing you
        submit is used for any purpose beyond responding to your enquiry and
        completing the job.
      </p>

      <H2>Who sees it</H2>
      <p>
        Your enquiry isn&rsquo;t sold or passed on for anyone else&rsquo;s
        marketing. A small number of third parties help us run the site and
        respond to you, and they only see what&rsquo;s needed to do that:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          Callback form submissions are sent to our inbox through Resend, an
          email delivery service, so we can see and reply to your enquiry.
        </li>
        <li>
          The website itself is hosted on Vercel, who process the technical
          request to load the page in the same way any web host does.
        </li>
        <li>
          Google&rsquo;s advertising tag runs on the site so we can tell
          whether a visit came from a Google Ad. Google may set cookies or
          similar storage in your browser to do that.
        </li>
      </ul>
      <p>
        If your job is carried out by a locksmith working under the {BRAND}{" "}
        name, they&rsquo;ll see what they need to attend the job and nothing
        more.
      </p>

      <H2>Cookies and analytics</H2>
      <p>
        We use Vercel&rsquo;s privacy-focused analytics to see roughly how
        many people visit and which pages they land on. It doesn&rsquo;t
        use cookies or store anything that identifies you personally, and
        we can&rsquo;t use it to single out an individual visitor.
      </p>
      <p>
        We also load Google&rsquo;s advertising tag (gtag.js) so we can
        measure whether our Google Ads led to a visit. That tag may set
        cookies or similar storage. We use it to understand if the ads are
        working, not to build a profile from the details you give us over
        the phone or through the callback form.
      </p>

      <H2>How long we keep it</H2>
      <p>
        We keep enquiry and job details for as long as they&rsquo;re useful,
        then delete them. In practice that means we hold on to records long
        enough to cover any follow-up questions about a job and to meet
        basic bookkeeping requirements, and no longer than that.
      </p>

      <H2>Your rights</H2>
      <p>
        Under UK data protection law, you can ask us what personal
        information we hold about you, ask us to correct anything that&rsquo;s
        wrong, or ask us to delete it. To do any of this, call{" "}
        {PHONE_DISPLAY} or use the callback form and mention that it&rsquo;s a
        data request. We&rsquo;ll deal with it as quickly as we can.
      </p>
      <p>
        If you think we&rsquo;ve handled your information incorrectly, you
        also have the right to complain to the Information Commissioner&rsquo;s
        Office (ICO) at ico.org.uk.
      </p>

      <H2>Keeping it secure</H2>
      <p>
        We take reasonable steps to keep the information you give us secure,
        including relying on established, reputable providers for email
        delivery and hosting rather than running our own servers. No system
        connected to the internet can be guaranteed completely secure, but we
        don&rsquo;t hold more data than we need, which limits what there is to
        protect in the first place.
      </p>

      <H2>Changes to this policy</H2>
      <p>
        If we change how we handle your information, we&rsquo;ll update this
        page and change the date at the top. We&rsquo;d encourage checking
        back occasionally if you want to stay informed, though the short
        version is unlikely to change: we collect what you give us to do the
        job you asked for, and nothing else.
      </p>

      <H2>Contact us</H2>
      <p>
        For anything covered in this policy, call {PHONE_DISPLAY} or use the
        callback form on the site.
      </p>
    </LegalPage>
  );
}
