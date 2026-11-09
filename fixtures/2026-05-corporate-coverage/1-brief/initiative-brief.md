---
run_id: 2026-05-corporate-coverage
artifact_id: A1
ost_role: outcome
status: accepted
workflow: discovery
modified_by: human
revisions: 1
sources: []
external_sources: []
produced_by:
  agent: product-owner
  skill: brief-creation
could_not_verify:
  - rule: "no field is inferred; an unsupplied field is marked unknown with a reason"
    needs: judge
    reach: process
decision:
  gate: G1
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: product_owner
  accepted_at: 2026-08-20
  changed_during_refinement: none
  refinements: []
  note: "Accepted as it stood. The time horizon stays marked unknown rather than guessed."
assembled_at: 2026-08-20
assembled_from: [R-A1-01]
---

# Discovery | Initiative Brief: Relationship intelligence for corporate coverage

The bank can see and use only a fraction of what it knows about its own corporate clients, and nobody can say how large that fraction is. The outcome is that anyone in coverage can ask who do we know for this and get an answer drawn from everything the bank has ever recorded, alongside what the bank already knows about that person and which of our people is the real route in. Success is measured two ways: the time a banker spends assembling context the institution already holds, which should fall, and the share of covered names a product specialist actually works, which should rise. The signal that it is working is that a product specialist stops asking a relationship manager who we know and starts asking whether to approach. [rec:R-A1-01]

One field could not be supplied and is marked rather than filled in: how long this is meant to take.

---

## The outcome we want

Anyone in corporate coverage can ask who do we know for this, get an answer drawn from everything the bank has ever recorded rather than from what one colleague remembers, see what the bank already knows about that person, and see which of our people is the real route in.

**The need arrives as three questions in a fixed order.** Who do we actually have a relationship with at or around this company, and who inside our own bank holds it. What do we know about them, meaning not the public filing but what they said in the last review, what came out of the last credit committee, what they told us they were worried about. And how do I approach them, which is first the path and then what to read before walking in. A fourth question, when, is about timing rather than retrieval and is out of scope.

## Who this is for

**Relationship managers and their team leads**, each carrying 25 to 60 named clients. The relationship is theirs, the bank reaches the client through them, and they decide where their week goes.

**Then the senior people who need the same relationships and own none of them.** Product specialists in trade finance, cash management, FX and leasing, who cannot reach a client except through the relationship manager. Credit officers deciding on names they have never met, whose only qualitative source is the person advocating the deal. Segment heads accountable for cross-sell and for what happens when a relationship manager leaves.

## Why now

A structured knowledge layer over the corporate book already exists and already works. A quarterly portfolio review that took a team a week took an afternoon. A search for supplier concentration across the book returned eleven names a sector head had not connected.

**And it is not a pain point anyone can name.** It has no trigger, and people in front of an open interface with access to everything do not know what to ask. The thing that works has no moment attached to it, and that is the gap this initiative exists to close.

## What success looks like

**First product goal.** A banker assembling what the bank knows about a client or a person does it by asking once, rather than by searching several systems and asking colleagues.

*Metric:* median time from a who-do-we-know question being asked to an actionable answer, and the share of those questions answered without a colleague being interrupted.

*Key result it feeds:* **SHD-4**, the average time a banker spends daily on administration, which moves down. The link is direct and has no intermediate step. Bankers put half a day per client into assembling context the institution already holds, and stop after twenty minutes when the day is busy. Remove the assembly and the administration time goes with it.

**Second product goal.** A product specialist can reach a client in a covered portfolio with the bank's own context already assembled, rather than spending a relationship manager's attention to find out whether it is worth spending.

*Metric:* share of covered names actively worked by a product specialist in a year, against the names in scope for that product.

*Key result it feeds:* **LVL-2**, share of wallet, which moves up. One step: reduce the preparation cost of an approach, more in-scope names get approached, more products land on clients the bank already has.

**Success signal.** A product specialist stops asking a relationship manager who we know, and starts asking whether to approach.

## What is in scope, and what is not

Corporate and commercial banking coverage. The Czech Republic first, with European peer banks in scope for comparison, because neither the problem nor the tooling is country-specific.

**In scope:** the three questions above, in that order, and what has to be attached to a name before a banker will act on it without checking.

**Out of scope:** the fourth question, when. It belongs to workflow and timing rather than retrieval.

**Known constraints.**

- **The earned context only exists after ingesting the bank's own history.** Nothing works on a book whose sources are not connected.
- **A relationship manager owns the client relationship and a product specialist cannot approach a client without them.** An answer that still requires the relationship manager's time to produce has reproduced the constraint rather than removed it.
- **A corporate client exists as several unlinked entity records** across the bank's systems, so any answer has to resolve a group before it can answer a question about it.

## What we could not establish

**How long this is meant to take.** No time horizon was decided at brief time. The field is optional and its absence does not block the gate.

**Whether the three questions are the right decomposition.** They come from the product hypothesis rather than from the problem material, and the next stage reads the material without them.

**What any of this costs to build.** No Banking Constraints body exists for this run, so nothing here is weighed for technical or operational load.

## How this was produced

**Run `2026-05-corporate-coverage`, stage 1.1 `brief-creation`, decision gate G1.** The brief was supplied in full by the Product Owner in one document and reduced to the brief's fields. No field was inferred: the one that could not be supplied is marked with a reason.

**Assembled from one record**, which carries the fields a gate decides:

- **R-A1-01**: `records/1-brief/A1-r01-brief.record.md`

**The material for this run is fabricated.** The supplied brief and the four interviews behind stage 2 were written on 20 August 2026 to exercise this workflow on a banking subject, and `fixtures/README.md` records it. No bank, person, client or figure named anywhere in this run exists, and none of it may be cited as evidence for anything.

**Not agent output.** A person removed every long dash from this document on 21 August 2026, after `C110` was written and failed it. Nothing else changed. The findings, the numbers and the wording are as the stage produced them, apart from the punctuation carrying them. **What was replaced and why is in [notes/marked-edits.md](../notes/marked-edits.md)**, which no gate reads.
