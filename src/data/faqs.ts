export type Faq = { question: string; answer: string };

export function getFaqs(town: string): Faq[] {
  return [
    {
      question: "How much does a replacement car key cost?",
      // TODO: confirm this price range with the partner locksmith and update.
      answer:
        "It depends on your vehicle. Older non-transponder keys are at the cheaper end, while smart and proximity keys for newer cars cost more because of the programming involved. Most standard replacements fall somewhere between £120 and £300. Give us your registration on the phone and you'll get a firm price before anyone comes out.",
    },
    {
      question: "How quickly can you get to me?",
      answer: `We aim to get to ${town} jobs as fast as possible, and we'll give you a realistic arrival time when you call rather than a number that sounds good on a website. If we can't reach you quickly, we'll say so.`,
    },
    {
      question: "Do you cover my make and model?",
      answer:
        "We cover the vast majority of cars, vans and motorbikes on UK roads, including most modern smart and transponder systems. Tell us the registration when you call and we'll confirm before booking anything in.",
    },
    {
      question: "I've lost every key — is that still fixable?",
      answer:
        "Yes. All keys lost is a normal job for an auto locksmith. It takes a bit longer than cutting a spare because the vehicle has to be accessed and the new key coded from scratch, but it can usually be done where the car sits.",
    },
    {
      question: "Do I need to be with the vehicle?",
      answer:
        "Yes. We'll need proof that the vehicle is yours — usually the V5C logbook and photo ID — before any key is cut or programmed. It protects you as much as us.",
    },
    {
      question: "Do you charge a call-out fee?",
      answer:
        "You'll be quoted a total price on the phone before anyone travels. No surprise fees added on when we arrive.",
    },
  ];
}
