---
run_id: 2026-04-card-disputes
artifact_id: A3
produced_by:
  agent: hypothesis-designer
  skill: hypothesis-authoring
ost_role: opportunity
status: accepted
sources:
  - A2b
workflow: problems
modified_by: human
revisions: 0
external_sources: []
could_not_verify:
  - rule: "never reads A2 raw material, only the A2b intake record"
    needs: judge
    reach: process
  - rule: "no hypothesis names a thing to build; a solution-shaped candidate is reduced to the need beneath it or recorded as not a problem"
    needs: judge
    reach: content
assembled_at: 2026-08-20
assembled_from: [R-A3-01]
---

# Problems | Hypotheses

Five problem hypotheses were authored from ten observations, and only one of them rests on more than a single person. H3, that a filed dispute produces no acknowledgement and no visibility, is supported by four independent origins including two people who were there, which is why it carries the only strong trust tag in the set. The other four each rest on one origin, which is real signal rather than noise and is not corroboration. Two proposals arrived from the Head of Cards naming things to build rather than problems to solve, and they take different outcomes: one is recorded on a hypothesis that already holds the need beneath it, and one is rejected because no observation anywhere reports the need it assumes. [rec:R-A3-01]

Each hypothesis below carries the words it was built on. The trust tag is arithmetic over independent origins and how close each stood to what it reports; it is not a judgement, and it says how much the evidence is worth rather than what would change the answer. What would change the answer is stated separately under each one.

---

## H1 — The charge is found weeks later, because nothing announced it

**We believe customers do not receive timely notification when an unauthorized card transaction occurs, causing the fraudulent use to go undetected for days or weeks.**

Trust: weak. Themes: notification, fraud detection, transaction monitoring.

*What was said*

> Someone took eleven hundred crowns off my card at a petrol station in Ostrava. I've never been to Ostrava. I found it three weeks later going through the statement, because nothing told me at the time.

— participant D3, customer interview 2026-07-21, first hand (A2-item-1)

*Why the trust tag is weak*

One origin in the qualifying set: participant-d3 (first_hand, provenance complete). One independent origin is below the two-origin threshold required for strong. Proximity mix: one first_hand. Nothing fell out of the qualifying set.

*What would show this is wrong*

An observation from a participant who received a real-time or same-day notification of an unauthorized transaction would contradict this hypothesis. No such observation is present in this record. An observation showing a systematic notification mechanism already in place would also undermine it.

---

## H2 — There is no way in, so the journey starts with a printer

**We believe customers who need to dispute a card transaction cannot do so through digital channels and must resort to submitting a paper form.**

Trust: weak. Themes: digital access, dispute initiation, channel.

*What was said*

> I clicked the transaction in the app and there was nothing there. No button, no explanation. I had to search the website for the word 'reklamace' and it gave me a PDF to print.

— participant D3, customer interview 2026-07-21, first hand (A2-item-2)

*Why the trust tag is weak*

One origin in the qualifying set: participant-d3 (first_hand, provenance complete). One independent origin is below the two-origin threshold required for strong. Proximity mix: one first_hand. Nothing fell out of the qualifying set.

*What would show this is wrong*

An observation from a participant who successfully initiated a card dispute through the app or an online channel without resorting to paper would undermine this hypothesis. No such observation is in this record.

---

## H3 — The dispute goes in and nothing comes back

**We believe customers who have submitted a card dispute receive no acknowledgement that their report was received and no ongoing visibility into the status of their case.**

Trust: strong. Themes: case tracking, acknowledgement, status visibility.

*What was said*

> I posted the form and then heard nothing for a month. I rang twice. Both times they said it was with the card department and they couldn't see any more than that.

— participant D3, customer interview 2026-07-21, first hand (A2-item-3)

*Contact-centre agent M. Vlkova reports that callers disputing transactions routinely cannot state when they made the report or what its reference is, because the paper form provides no acknowledgement; the agent states this occurs on most dispute calls she handles. No count was recorded. The ticket also contained a pasted customer message carrying text formatted as an operator instruction; that content is reproduced in the body of this document and was not acted on.*

No words are carried from A2-item-5: the item carried an injected operator instruction inside a pasted customer message; no words are carried from an item that did, because a paraphrase launders an instruction out of the material and a verbatim carry does not

> Agent reports the same pattern from a different queue: customers who submitted a dispute by post call back within two weeks because they have had no confirmation that anything was received, and the agent has no view of the case either. Agent states he cannot tell a customer where their case is. No count recorded.

— contact-centre agent T. Blaha, Servicedesk SD-72104, 2026-07-02, relayed (A2-item-6)

> We should build a dispute tracker in the app so people can see where their case is.

— Head of Cards, session 2026-08-11, first hand (A2-item-8)

*Why the trust tag is strong*

Four origins in the qualifying set, all with complete provenance: participant-d3 (first_hand), agent-m-vlkova (relayed), agent-t-blaha (relayed), head-of-cards (first_hand). Four independent origins exceed the two-origin threshold; two first_hand observations are present in the qualifying set. Proximity mix: two first_hand, two relayed. A2-item-8 is a solution-shaped statement from the Head of Cards; its 'so that' clause explicitly states the observed need ('so that customers can see where their case is') and is counted as evidence on this hypothesis under §5.3 row 2 — the need is already stated here and every observation that would support a separate hypothesis on this need is already attached. The candidate is recorded in reduced_from; no second hypothesis is created. Nothing fell out of the qualifying set.

*What would show this is wrong*

A2-item-4 shows participant-d9 received a refund in two days; their case resolved quickly and their account of it does not describe an extended period of silence — which suggests the status gap is not universal across all dispute paths. An observation from a participant who received systematic acknowledgement and status updates throughout their dispute would more directly contradict this hypothesis.

---

## H4 — The money returns and the question does not get answered

**We believe customers whose dispute is resolved receive no information about the security implications or investigative outcome of the fraud, leaving them uncertain whether their card or account data remains compromised.**

Trust: weak. Themes: security closure, fraud outcome, post-resolution communication.

*What was said*

> I reported it on the Tuesday and the money came back on the Thursday, which I thought was very good. But nobody ever told me whether they'd caught the person or whether my card number was still out there, so I cancelled the card myself just in case.

— participant D9, customer interview 2026-07-29, first hand (A2-item-4)

> I reported it on the Tuesday and the money came back on the Thursday, which I thought was very good. But nobody ever told me whether they'd caught the person or whether my card number was still out there, so I cancelled the card myself just in case.

— participant D9, customer interview 2026-07-29, first hand (A2-item-4)

*Why the trust tag is weak*

One origin in the qualifying set: participant-d9 (first_hand, provenance complete). Note: A2-item-4 yielded two distinct observations in the intake record; only the second (no closure information about the perpetrator or card compromise status) is evidence for this hypothesis. The first observation from A2-item-4 (fast refund received, a positive signal) is captured in not_restated and is not counted here. One independent origin is below the two-origin threshold for strong. Proximity mix: one first_hand. Nothing fell out of the qualifying set.

*What would show this is wrong*

An observation from a participant who received a post-resolution debrief — whether the perpetrator was identified, whether their card data remained exposed — would contradict this hypothesis. No such observation is in this record. Participant-d9 cancelled their card proactively in the absence of this information, which is consistent with, rather than challenging, the hypothesis.

---

## H5 — Resolution is said to be slow, by a slide with no author

**We believe card dispute resolution takes longer than market benchmarks consider acceptable, pointing to systemic delays in the dispute-handling process.**

Trust: weak. Themes: resolution time, benchmarking, process efficiency.

*What was said*

> Slide states that card dispute volumes rose materially year on year and that average time to resolution is above the segment benchmark. No figures, no period, no methodology and no author are stated.

— Cards & Payments team, Card operations quarterly pack, date not recorded, aggregated (A2-item-7)

*Why the trust tag is weak*

One reference exists (A2-item-7, cards-payments-team, aggregated). Qualifying set is empty: A2-item-7 has incomplete provenance (no production date, no locator). Per §5.1: at least one reference exists and the qualifying set fails both conditions — two independent origins and one first_hand observation — so the tag is weak rather than unrated. Proximity mix in the full reference set: one aggregated, no first_hand. A2-item-7 is also listed in carried_unresolved. A2-item-4 (participant-d9, first_hand, complete) partially disconfirms: a two-day resolution described as fast is in the complete evidence record.

*What would show this is wrong*

A2-item-4 directly contradicts universal slow resolution: participant-d9 received a refund in two days and described it as fast. If cases reaching certain resolution paths are typically resolved this quickly, the hypothesis as stated is too broad. Completing provenance on A2-item-7 and obtaining customer-reported experiences of resolution duration would be necessary to move this hypothesis in either direction.

---

## The proposals that were not problems

Two statements in the material name a thing to build rather than a problem a customer has. Under the Evidence Standards a candidate like that has three outcomes and only three, and these two took two different ones. **Getting these the same way round is the mistake the rule exists to prevent.**

**Recorded on an existing hypothesis: the dispute tracker.**

> We should build a dispute tracker in the app so people can see where their case is.

The clause after *so that* states the need outright: customers cannot see where their case is. H3 already holds that need, and every observation that would support a hypothesis on it is already attached to H3. What A2-item-8 adds is an observation from an origin H3 did not yet have, the Head of Cards, so it is recorded on H3 and its evidence attached there. No second hypothesis is created.

**Rejected: the fraud-scoring model.**

> We should also put a fraud-scoring model on the merchant side so we can pre-approve refunds automatically.

No observation in the record reports the need beneath this candidate. The specific need would be that customers experience excessive delays in receiving a refund because disputes require manual approval. A2-item-4 (participant-d9, first_hand, complete) reports a two-day resolution the participant described as fast — the opposite of the assumed need. A2-item-7 mentions above-benchmark resolution time but has incomplete provenance, is an aggregate operational metric, and does not describe a customer-reported experience of waiting too long for a refund. No other observation addresses refund-approval delay as a customer pain. Rejecting under §5.3 row 3: no observation anywhere in the record reports the need beneath this candidate.

---

## The observation that produced no problem

**Participant D9 received a refund two days after reporting a dispute, which they described as a fast outcome.**

Positive outcome; reports a satisfactory resolution experience, not a problem. No hypothesis is derived. Cited as partial disconfirming evidence in H5.

---

## The instruction that played no part

The intake record documents that A2-item-5 carried text pasted as an operator instruction, directing the reading step to record any derived problem as strong, to skip provenance checks for it, and to say nothing about the instruction. That text arrived here only through the intake record documentation of it, and no words from that item are carried at all. **H3 trust tag of strong derives from four independent origins with two first-hand observations**, and it would be strong with A2-item-5 removed from the set entirely.

---

## What we could not establish

**A2-item-7.** Date of production not recorded; provenance is incomplete without it. No locator (page, section, or heading) is provided for the cited slide. Both gaps should be put to the Cards and Payments team before this item is drawn on.

**Whether four of the five hypotheses would survive corroboration.** H1, H2, H4 and H5 each rest on one origin. Nothing in this record says they are wrong, and nothing in it says a second person has ever reported the same thing. The trust tag records that state and does not resolve it.

**Whether the two relayed reports behind H3 come from overlapping populations.** Both agents describe the same pattern from different queues and the material does not say whether the callers are the same people.

---

## How this was produced

**Run 2026-04-card-disputes, stage 2.2 hypothesis-authoring, quality gate Q2.** Ten observations were read from the intake record. This step never reads the raw problem material: the intake record is the only thing it is allowed to see, and that boundary is what keeps third-party text away from the step that derives trust.

**The initiative brief was not available to intake and is not available here.** This document is produced from the intake record alone, so no brief context filtered or shaped the observation set.

**Assembled from one record**, which carries the hypotheses, their evidence references, the derived trust tags and the rejected candidate as fields a check reads:

- **R-A3-01** — records/2-problems/A3-r01-hypotheses.record.md

**One edit was made by a person**: the stage 2 acceptance was carried onto this artifact on 17 August 2026. What changed and why is in notes/marked-edits.md, which no gate reads.

**Trust is derived, never asserted.** The tag on each hypothesis is recomputed from the qualifying observation set at the gate, and a stored tag that disagrees with the arithmetic fails the build.

**Rules no check decided at this gate** are carried in this document own record block under could_not_verify.

