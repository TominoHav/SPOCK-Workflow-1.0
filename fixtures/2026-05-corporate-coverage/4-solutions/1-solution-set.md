---
run_id: 2026-05-corporate-coverage
artifact_id: A8
ost_role: solution
status: accepted
workflow: discovery
modified_by: human
revisions: 1
sources: [A1, A4, A7]
external_sources: []
produced_by:
  agent: product-owner
  skill: ideation
could_not_verify:
  - rule: "3..7 ideas, each a distinct combination of problems, never a rephrasing"
    needs: judge
    reach: artifact
assembled_at: 2026-08-20
assembled_from: [R-A8-01]
---

# Ideas | Idea Set: Relationship intelligence for corporate coverage

Five ideas against the five problems this run committed to, and they are not five versions of one thing. One makes the bank searchable at all, one supplies what the bank knows about a person, one supplies the route to them, one records who holds a relationship so it survives a departure, and one points the whole answer at the person who owns no relationships and needs all of them. **No idea here is another idea with a problem taken off it**: every pair differs by at least one problem in both directions. [rec:R-A8-01]

**The market decides one design question before we build anything.** Four of ten profiled participants score a relationship and all four score from interaction metadata, which all three interviewed users independently rejected. Wherever these ideas surface a person, they show the evidence and never a number.

---

## ID-1: Ask once

### What it is

A single retrieval surface over the bank's own record, scoped to people and organisations, that answers an attribute question across the whole institution rather than within one system or one reporting line. It resolves a client group's several legal entities into one subject before it answers, so a question asked about a client is not answered against a sixth of it.

### What it does

It removes the step where a person has to know which building the answer might be in. The relationship manager in this run lost a mandate because the route sat in private banking, and said afterwards that even a search box across both would not have helped, because she would not have thought to type the name into it. **One question, asked once, with the institution deciding where to look** is the only shape that answers that.

The market supports the pieces and not the join. Four of ten profiled participants carry a stable entity identifier with group linkage (ST2), and the bank has usually already bought one for compliance; entity resolution has moved from an enrichment to a precondition across the segment (TR-T2). What no participant does is resolve the bank's own internal records across its own business lines.

### How it works

1. The banker types the question in the terms it arrives in: a person with an attribute, a company, or a situation.
2. The question is resolved against the client group rather than against the entity record it happens to name, so a query about a holding company reaches the operating company's history.
3. Every source the bank has connected is searched at once, across business lines rather than within one.
4. The answer is a set of named people, each with the business line the relationship sits in and the colleague nearest to it.
5. Where a source could not be searched, the answer says so rather than returning a shorter list.

### Who it is for

Any senior person in coverage. It is the only idea in this set that serves the relationship manager, the product specialist and the credit officer with the same surface, because the question they ask is the same and only the reason differs.

### Why this bank

H1 is the second-placed problem and the precondition for the two above it. **Solving H3 without H1 gives a product specialist faster access to the same partial picture**, which is worse than the current state because it arrives with the bank's authority behind it. The bank also already holds the entity resolution twice, in credit for exposure and in compliance for ownership, which makes this an assembly rather than a build.

**Compliance mode.** No Compliance Guidelines body exists for this run. The GDPR and works council touchpoints named above are identified from run material and are marked indicative. No band, severity or regulatory obligation has been assessed.

---

## ID-2: The dossier

### What it is

For any named person, the bank's earned context assembled into something readable: what was said in the last interactions, what came out of the credit process, what they were worried about and when, each item carrying its author and its date.

### What it does

It answers the second of the three questions, which is the one nothing in the market answers at all. **Zero of ten profiled participants carry the content of an interaction** rather than its metadata, and the relationship manager described exactly that gap as eleven interactions with no idea what happened in them.

The unsolved half is smaller than it looks. Interaction summarisation has already moved into the collaboration suites the segment runs on (TR-T4), so producing a summary of a meeting is close to solved; routing it to the client record is not, and that is the part this idea builds.

### How it works

1. Every connected source that carries what somebody said is read: call reports, meeting summaries, credit memos, and mail where the bank permits it.
2. Each item is attached to the person it is about rather than to the document it came from.
3. Each item keeps its author and its date, because an unattributed note is the thing the credit officer said is worse than silence.
4. The dossier assembles on request and again before a scheduled meeting with that person.
5. Anything the bank recorded and could not attribute is shown separately rather than merged in.

### Who it is for

Anyone about to meet somebody: the relationship manager preparing a review, the product specialist preparing a first approach, the credit officer preparing a committee. The credit officer is the most acute case, because her only qualitative source today is the person advocating the deal.

### Why this bank

H2 is the problem with no market answer and the one that makes every other answer usable. A name without it is what the material calls a hollow record. It also carries the largest build risk in the set, which is why it is presented as its own idea rather than folded into the others.

**Compliance mode.** No Compliance Guidelines body exists for this run. The GDPR and works council touchpoints named above are identified from run material and are marked indicative. No band, severity or regulatory obligation has been assessed.

---

## ID-3: Who opens this door

### What it is

Given a target person, the colleague with the strongest genuine link, presented with the evidence that produced it rather than with a score, and including anything awkward in the history.

### What it does

It answers the third question, and the way it answers it is the whole idea. Three of ten participants present a named route (ST4) and four score a relationship (ST5), and **every one of the four scores from metadata alone**, which all three interviewed users independently rejected. The credit officer put it hardest: an unattributed strength is worse than silence.

So the differentiating decision is to show the evidence and never the number. That also happens to be where regulation points: under the AI Act the treatment of a system that suggests a person with its reasoning differs from one that scores a person (TR-R1), and the users asked for the first before anyone mentioned the second.

### How it works

1. The banker names a target person or a company.
2. The bank's own record produces the colleagues with a genuine link, ranked by what the link rests on rather than by a computed strength.
3. Each candidate route shows what produced it: the last real interaction, its date, and the colleague who had it.
4. Anything that would embarrass an approach is shown in the same place: a declined application, a complaint, a noted difficulty.
5. No score is shown anywhere. Where the evidence is thin, the answer says the link is thin and shows what there is.

### Who it is for

The product specialist first, because the route is the thing they cannot get and the thing they burn a relationship manager's goodwill discovering. Then the relationship manager reaching outside her own portfolio, and the credit officer looking for a second view on a management team.

### Why this bank

H3 is the first-placed problem and the brief's success signal is a sentence about it. **This is also the idea the market is closest to and gets wrong in a way we can see before building**: four participants score, the users reject scores, and the fix is a presentation decision rather than a technical one.

**Compliance mode.** No Compliance Guidelines body exists for this run. The GDPR and works council touchpoints named above are identified from run material and are marked indicative. No band, severity or regulatory obligation has been assessed.

---

## ID-4: Relationship of record

### What it is

Relationship ownership recorded as a first-class fact with a holder, a basis and a date, so it can be handed over, reported on and challenged, and so it survives a departure.

### What it does

It is the only idea here that addresses continuity, and continuity carries the largest number anyone in the material gave: a fifth to a third of a portfolio's wallet inside eighteen months of a departure, observed four times.

It is also the only idea whose main obstacle is not technical. Three participants present a route and all three derive it from signal belonging to the person generating it, so the route leaves with them. An institutional record of who holds a relationship is unbuilt across the entire map, and **it is unbuilt because it is exactly the record a works council reads as performance data** (TR-R3).

### How it works

1. A relationship is recorded as held by a named person, with what the holding rests on and when it was last confirmed.
2. The record is asserted and reviewed by people rather than derived from message counts, which is what makes it defensible to a works council and useful to a successor.
3. On a departure, the record is what transfers, alongside the file.
4. A segment head can read the aggregate: which relationships are held by an individual, which by the institution, and where the concentration is.
5. A relationship nobody claims shows as unheld rather than being attributed to whoever emailed last.

### Who it is for

The segment head owns the outcome and the relationship manager maintains the record. The successor inheriting a portfolio is the person it exists for.

### Why this bank

H4 is second-placed and this is the only idea that touches it. It is also the idea that turns a risk already on the operational risk register into something measurable (TR-B3), which is the shortest path in this set from a product to a number a bank already reports.

**Compliance mode.** No Compliance Guidelines body exists for this run. The GDPR and works council touchpoints named above are identified from run material and are marked indicative. No band, severity or regulatory obligation has been assessed.

---

## ID-5: The specialist's brief

### What it is

Self-service access, for a product specialist, to everything the bank knows about a covered client and its people, so the approach to the relationship manager is a decision rather than a request for research.

### What it does

It is the same underlying answer as the first three, pointed at the person the segment head named as carrying the worst version of the problem: whoever works across portfolios and owns none of them.

The economics are the argument. A specialist spends half a day per client assembling a case, most of it looking for things the bank already holds, and works sixty of three hundred in-scope names a year. **The two hundred and forty are unreached rather than rejected.** Attribute search over people exists at three participants (ST3) and a named route at three (ST4), and none of them is available to a specialist inside a bank looking at the bank's own book.

### How it works

1. The specialist opens a covered client without asking anyone.
2. They see the client group resolved, the people the bank deals with, and what the bank knows about each of them.
3. They see who holds the relationship and what the last real interaction was.
4. They assemble the case and take a decision: approach, or not this quarter.
5. The relationship manager sees that the client was opened and by whom, so self-service is visible rather than silent.

### Who it is for

Product specialists in trade finance, cash management, FX and leasing. Secondarily the sector and origination roles that have to find a company with a characteristic across the whole book and have no way to ask.

### Why this bank

It attacks H3 from the other side. **ID-3 makes the route findable and this makes the request unnecessary**, and the difference matters because the constraint the material describes is not that the route is hidden but that finding it costs the least available person's time. It also has the clearest measurement: names worked against names in scope, which is the second product goal in the brief.

**Compliance mode.** No Compliance Guidelines body exists for this run. The GDPR and works council touchpoints named above are identified from run material and are marked indicative. No band, severity or regulatory obligation has been assessed.

---

## What we could not establish

**How difficult any of these are.** No Banking Constraints body and no Compliance Guidelines body exist for this run, so nothing here is weighed for cost, technical complexity or regulatory load. The scoring that follows carries a denominator of zero on the whole difficulty axis, and five ideas reach the decision gate on value alone.

**Whether the sources these ideas assume can be ingested at all.** Purpose limitation decides which of the bank's own systems can be repurposed for this, and works council agreement decides whether employee signal can be captured. Both arrive before any of the retrieval work and neither is settled here.

**Whether the market absences hold.** Every claim above that a capability is absent rests on the ten participants profiled at stage 3, and that stage performed no outward research: the market material for this run was written rather than gathered.

---

## How this was produced

**Run 2026-05-corporate-coverage, stage 4.1 ideation, quality gate Q4 then decision gate G4.** The set was generated from the brief, the prioritised problems and the competitive synthesis.

**Assembled from one record**, which carries each idea's id, the problems it solves and the market elements it rests on as fields a check reads:

- **R-A8-01**: records/4-solutions/A8-r01-ideas.record.md

**Problem coverage.** H1, H2, H3, H4 and H5 are each solved by at least one idea. H6 is parked and no idea addresses it, which is deliberate: it is a measurement problem and the prioritisation says so.

**This set carries no score, no rank and no recommendation.** Scoring is a separate step and reads this document without editing it.

**The run is fabricated end to end.** The problem material and the market material were both written on 20 August 2026 to exercise this workflow.

**Not agent output.** A person removed every long dash from this document on 21 August 2026, after `C110` was written and failed it. Nothing else changed. The findings, the numbers and the wording are as the stage produced them, apart from the punctuation carrying them. **What was replaced and why is in [notes/marked-edits.md](../notes/marked-edits.md)**, which no gate reads.
