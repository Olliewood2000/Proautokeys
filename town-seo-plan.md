# ProAutoKeys — Town Page SEO Plan

**The problem:** every town page is ~90% identical to the homepage and to every other town page. Unique content per page is currently around 70 words. That's the doorway-page pattern, and it caps how well any of them can rank.

**The fix:** add genuinely unique local content to each town page, without touching what's already working. Nothing gets removed. Two new sections slot in, built from components that already exist.

**Target:** 400-600 unique words per town page.

---

## LAYOUT — WHERE THE NEW CONTENT GOES

Two additions per town page, both using existing styling patterns:

### Addition 1 — Expanded local section (replaces the short intro inside the existing "Where we work" block)

The "Where we work" section already exists with a short paragraph, a map graphic and the village pills. Keep all of that. The change is that the single 70-word paragraph becomes 3-4 paragraphs of genuinely local content, and gains a small sub-heading structure.

**No new component needed.** Same section wrapper, same map, same pills — just more prose above them.

### Addition 2 — "Where keys go missing in {town}" (new block, sits directly after the hero)

A short scannable block of 4 local scenarios, each one line. Sits high on the page so unique content is the first thing after the hero, which matters for both users and crawlers.

**Reuse the existing services card grid styling** — same card, same border, same padding, 2 columns mobile / 4 columns desktop. No new design work, it just uses a different data shape.

### Addition 3 — Two town-specific FAQs appended to the existing FAQ accordion

The six existing FAQs stay exactly as they are. Two extra town-specific ones get added to the end of the array per town. Same accordion, same styling.

**Running total of unique content per page:** ~450-550 words. Ratio of unique-to-shared moves from roughly 1:9 to roughly 1:3.

---

## DATA STRUCTURE CHANGE

`towns.ts` needs three new fields per town:

```ts
export type Town = {
  slug: string;
  town: string;
  county: string;
  nearbyAreas: string[];
  localIntro: string;           // EXISTING — now much longer, 3-4 paragraphs
  localScenarios: {             // NEW — "where keys go missing" block
    title: string;
    line: string;
  }[];
  localFaqs: {                  // NEW — appended to shared FAQ array
    q: string;
    a: string;
  }[];
};
```

`localIntro` should be typed as an array of strings (one per paragraph) rather than one long string, so it renders as proper paragraphs.

---

# CONTENT — MAIDSTONE

**Slug:** `car-key-replacement-maidstone`

## Local intro (replaces current short paragraph)

**Paragraph 1**
Maidstone is a town built around its car parks. Between Fremlin Walk, King Street and the retail parks strung along the A229, there's a good chance that if you've lost a key in Maidstone, you've lost it somewhere with a barrier and a pay machine. We come to the vehicle wherever it's sitting — multi-storey, surface car park, roadside or driveway — and cut and code the new key there.

**Paragraph 2**
The two stations catch people out more than anywhere else. Maidstone East and Maidstone West both fill up with commuters leaving cars all day, and a key that goes missing in London at four in the afternoon becomes a problem in a Kent station car park at seven in the evening. We can meet you at the car rather than you arranging recovery to get it home.

**Paragraph 3**
Away from the centre, most of our Maidstone work is on driveways in the villages — Bearsted, Loose, Coxheath, Barming — and at workplaces along the M20 corridor. The town's mix of newer company cars and older runarounds means we carry both ends of the range, from basic transponder blades through to smart proximity keys that have to be coded to the vehicle.

**Paragraph 4**
Wherever you are in Maidstone, the process is the same: tell us the registration on the phone, get a price before anyone travels, and we'll come to the car.

## Where keys go missing in Maidstone (4 scenario cards)

**Fremlin Walk & King Street**
Keys lost mid-shop, or locked in the boot with the shopping.

**Maidstone East & West**
Back from London to a station car park and no key in your pocket.

**Mote Park & the retail parks**
Dog walks, football, the school run — keys that don't make it back to the car.

**The villages & M20 corridor**
Driveway jobs in Bearsted, Loose and Coxheath, and workplace call-outs along the motorway.

## Town-specific FAQs

**Q: Do you cover the Maidstone villages as well as the town centre?**
A: Yes. Bearsted, Loose, Coxheath, Barming, Boughton Monchelsea, Harrietsham, Hollingbourne, Detling, Yalding, Marden, Staplehurst and Lenham are all regular call-outs for us, and a driveway job in a village is no different to one in a town centre car park. If you're not sure whether you're in range, ring and ask — we'll tell you straight away.

**Q: Can you get to me in a multi-storey car park?**
A: Yes, and it's one of the more common jobs in Maidstone. Fremlin Walk, King Street and the station car parks are all fine — we work at the vehicle wherever it's parked. It's worth telling us the level and bay number when you call so we're not walking the whole car park looking for you.

---

# CONTENT — ROCHESTER

**Slug:** `car-key-replacement-rochester`

**Nearby areas:** Strood, Chatham, Frindsbury, Borstal, Wainscott, Cuxton, Halling, Cliffe, Higham, Hoo St Werburgh

## Local intro

**Paragraph 1**
A lot of our Rochester work happens on the Medway City Estate. It's a working estate — units, yards, delivery drivers, people on shift — and a lost or snapped key there isn't just an inconvenience, it's a van that can't go out. We come to the unit or the yard, cut and code the key on site, and you're moving again without a recovery truck getting involved.

**Paragraph 2**
Rochester station is the other one that catches people. It's a commuter station, so cars sit there all day and sometimes all weekend, and there's a particular kind of bad evening that involves getting off a train after a few days away and finding the car key isn't where you thought it was. We'll meet you at the station car park and sort it there.

**Paragraph 3**
Around the high street, the castle and the Esplanade, it's mostly visitor parking and short stays — keys locked in boots, fobs that have stopped working, keys dropped somewhere between the car and the cathedral. Across the river in Strood and up towards Wainscott and Frindsbury, it's driveway work: spare keys, all keys lost, and the occasional key snapped off in an older ignition.

**Paragraph 4**
Rochester's vehicle mix runs the full range, from work vans and older diesels through to newer cars with proximity keys, so we carry blades and programming kit for both.

## Where keys go missing in Rochester (4 scenario cards)

**Medway City Estate**
Van keys lost on shift, or snapped in the ignition mid-round.

**Rochester station**
Home from a few days away to a car you can't get into.

**The high street & castle**
Visitor parking, locked boots and fobs that stop working.

**Strood & Wainscott**
Driveway jobs — spare keys, all keys lost, worn-out ignitions.

## Town-specific FAQs

**Q: Can you come out to the Medway City Estate during working hours?**
A: Yes, and it's one of our more common Rochester call-outs. We'll come to the unit or the yard and work at the vehicle, so a van that's lost its key doesn't need recovering off the estate. Tell us the unit or road when you call and we'll find you.

**Q: Do you cover Strood and Chatham as well as Rochester itself?**
A: Yes. The Medway towns run into each other, so Strood, Chatham, Frindsbury, Wainscott, Borstal and the villages out towards Hoo and Cliffe are all within range. It's the same service wherever the car is — we come to it rather than the other way round.

---

# CONTENT — SITTINGBOURNE

**Slug:** `car-key-replacement-sittingbourne`

**Nearby areas:** Milton Regis, Kemsley, Bobbing, Borden, Newington, Iwade, Bapchild, Teynham, Tunstall, Rodmersham

## Local intro

**Paragraph 1**
Sittingbourne has an unusual number of car parks for its size, and we end up in most of them. Sittingbourne Shopping Park is the big one — Currys, Halfords, The Range, PureGym — and between the gym bags, the trolleys and the boot loads of shopping, it's a reliable source of keys that end up locked in, dropped, or simply not where they should be. The Forum car park in the town centre is much the same.

**Paragraph 2**
Then there are the supermarkets. Aldi, Lidl, Morrisons, Asda and Sainsbury's all have their own car parks in and around Sittingbourne, and a fair share of our local work is someone standing next to a full boot with the key sitting on the passenger seat. We come out, get you in without damaging anything, and if the key's genuinely gone we can cut and code a new one there and then.

**Paragraph 3**
The stations spread the work out further than people expect. Sittingbourne, Kemsley and Newington all serve commuters leaving cars for the day, and Kemsley in particular is quiet enough that a car sitting there with no way into it is a long evening. We'll come to the station car park rather than you arranging recovery.

**Paragraph 4**
Out towards Milton Regis, Bobbing, Borden and the villages along the A2, it's mostly driveway work — spare keys cut before they're needed, and all-keys-lost jobs on cars that have been sitting a while. The A249 down to the M2 means we're rarely far away.

## Where keys go missing in Sittingbourne (4 scenario cards)

**Sittingbourne Shopping Park**
Gym bags, trolleys and keys that end up locked in the boot.

**The Forum & town centre**
Short stays, dropped fobs and keys that don't make it back.

**The supermarket car parks**
Aldi, Lidl, Morrisons, Asda, Sainsbury's — a full boot and no key.

**Sittingbourne, Kemsley & Newington stations**
Commuter cars left all day, and no way in at the end of it.

## Town-specific FAQs

**Q: Do you cover Milton Regis, Kemsley and the surrounding villages?**
A: Yes. Milton Regis, Kemsley, Bobbing, Borden, Newington, Iwade, Bapchild, Teynham, Tunstall and Rodmersham are all within our usual range, along with Sittingbourne itself. A driveway job in a village works exactly the same as one in a town centre car park — we come to the vehicle.

**Q: I'm at Sittingbourne Shopping Park with my keys locked in the car. Can you help?**
A: That's one of the most common calls we get locally. We use non-destructive entry, so there's no damage to the door or the lock, and in most cases we're in without any drama. If the key itself has gone missing rather than being locked inside, we can cut and code a replacement at the vehicle.

---

# CURSOR PROMPT

*Paste everything below into Cursor.*

---

Add unique local content to the town pages to fix a content-duplication problem. Every town page is currently ~90% identical to the homepage, which limits SEO performance. This change is **additive only** — do not remove, restructure or restyle anything that already exists. Reuse existing components and styling throughout.

## 1. Extend the Town type in `towns.ts`

Change `localIntro` from a single string to `string[]` (one entry per paragraph), and add two new fields:

```ts
localScenarios: { title: string; line: string }[];   // exactly 4 per town
localFaqs: { q: string; a: string }[];               // exactly 2 per town
```

## 2. Update the "Where we work" section

It currently renders a single short `localIntro` paragraph above the map and area pills. Change it to render each entry of the `localIntro` array as its own `<p>`, with normal paragraph spacing. Keep the map graphic, the area pills, the heading and the "not sure if we reach you" line exactly as they are.

## 3. Add a new "Where keys go missing" section

Place it **directly after the hero section**, before "Every way a car key goes wrong".

- Heading: `Where keys go missing in {town}`
- Small eyebrow label above it, matching the existing pattern used by "What we cover" / "How it works"
- Renders `localScenarios` as cards: **reuse the exact card styling from the services grid** (same border, radius, padding, hover behaviour)
- Layout: 2 columns on mobile, 4 columns on desktop
- Each card shows `title` as an H3 and `line` as body text
- No icons needed
- This section only appears on town pages, not the homepage

## 4. Append town FAQs

Add the two `localFaqs` entries to the **end** of the existing FAQ accordion array on town pages. Same accordion component, same styling. The six shared FAQs stay exactly as they are, in their current order. Make sure the FAQPage JSON-LD schema includes the town-specific questions too.

## 5. Add two new towns

Create `car-key-replacement-rochester` and `car-key-replacement-sittingbourne` as new entries in the towns data. They should generate automatically via the existing dynamic route and appear in the sitemap.

## 6. Internal linking

In the footer "Areas" list and the homepage "Towns we cover" list, link Maidstone, Rochester and Sittingbourne to their pages. Leave the remaining town names as plain text until those pages exist.

## Data to add

[PASTE THE THREE TOWN CONTENT BLOCKS FROM ABOVE — localIntro paragraphs, localScenarios, localFaqs, and nearbyAreas for Rochester and Sittingbourne]

---

## AFTER BUILD — CHECK THESE

1. Each town page has 400+ words of content that appears on no other page
2. The new section reuses existing card styling and doesn't look bolted on
3. Mobile layout still puts the call button above the fold — the new section sits *after* the hero, so it shouldn't affect this, but verify at 375px
4. All three pages are in the sitemap
5. FAQ schema includes the town-specific questions
6. Nothing that previously existed has been removed or restyled

## STILL OUTSTANDING (unrelated to this change)

- **www → non-www redirect** in Vercel Settings → Domains. Still not done, still splitting your ranking signals. This actively undermines the SEO work above.
- Confirm the £120-300 pricing range with the partner locksmith
- Cookie consent banner before Google Ads goes live
