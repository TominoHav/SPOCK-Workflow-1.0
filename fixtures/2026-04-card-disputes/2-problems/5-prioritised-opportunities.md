---
run_id: 2026-04-card-disputes
artifact_id: A4
produced_by:
  agent: hypothesis-designer
  skill: prioritisation
ost_role: opportunity
status: accepted
sources:
  - A3
workflow: problems
modified_by: human
revisions: 0
external_sources: []
could_not_verify: []
decision:
  gate: G2
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: Product Owner
  accepted_at: 2026-08-17
  reason: "The proposal accepted unchanged. Primary H3, H2, H1. Secondary H4. Parked H5. The ordering weights the status-tracking gap first because the brief's success signal names it directly and it is the component the product goal counts."
  changed_during_refinement: none
  refinements: []
  note: "The decision matches the proposal in every placement, which is the case the two-step structure exists to make visible rather than to hide — a proposal accepted whole is still a person's decision and not an agent's. Two things were put to the gate and neither changed a placement. **The intake agent tagged an executive's solution proposal `first_hand`**: they witnessed themselves saying it and have not witnessed a customer failing to see their case status. The tag stands, because the hypothesis carries a genuine first-hand customer account and the tag does not rest on that origin. **H5 is parked with an empty qualifying set** and A2-item-4 runs against it; that is the prioritiser working and the parking was confirmed. **A2-item-7's provenance was not resolved before this gate** — it stays in `carried_unresolved[]` and H5's placement rests on the incomplete provenance rather than on the question having been answered."
assembled_at: 2026-08-20
assembled_from: [R-A4-01]
---
# Problems | Prioritised Problems

H3 is placed first because it is the only problem in the set that more than one person reported and the only one the brief success signal names outright: customers stop ringing to ask where their case is. H2 follows it because there is no journey for status to sit on until a customer can file without a printer, and H1 third because notification is what starts the journey at all. H4 is held behind them and H5 is parked, its single reference being a slide with no date, no author and no page. The order was decided by a person at the gate and the proposal it was decided from is set out below. [rec:R-A4-01]

Three of the five carry a weak trust tag, which is a statement about corroboration rather than about whether the problem is real. Only H3 rests on more than one origin.

---
## What we are solving first

**H3 — No acknowledgement and no status visibility** — trust: `strong`

Placed first. H3 is the only `strong` hypothesis in the set: four independent origins
(participant-d3, agent-m-vlkova, agent-t-blaha, head-of-cards), two first-hand observations, all
with complete provenance. The evidence spans a customer, two front-line agents, and the Head of
Cards. It directly addresses the success signal ("customers stop ringing to ask where their case
is") and the outcome's "know where it stands" language. The combination of the strongest trust tag
and the most direct fit to the run's stated success measure places it at position one.

**H2 — Forced to paper form; no digital dispute channel** — trust: `weak`

Placed second. The outcome names paper elimination explicitly ("without printing anything") and the
product goal restates it ("without a call or a paper form"). Without solving H2 there is no digital
journey on which status tracking can be built. One origin (participant-d3, first-hand, complete
provenance): real signal, single-origin corroboration not yet sought.

**H1 — No timely notification of an unauthorized transaction** — trust: `weak`

Placed third. Notification timing gates entry to the whole journey. The outcome begins with
customers "spotting" a transaction they did not make; where notification is delayed by days or weeks,
customers cannot act. H1 addresses that precondition. One origin (participant-d3, first-hand,
complete provenance): same corroboration caveat as H2.

---

---


## What comes after

**H4 — No closure information after resolution** — trust: `weak`

Placed secondary. A real gap evidenced by one participant's experience (participant-d9, first-hand,
complete provenance): no information about whether the perpetrator was identified or whether card
data remained exposed after resolution. The outcome speaks to active tracking during an open dispute
("know where it stands"), not post-closure debrief. H4 is at the downstream end of the journey and
does not anchor the run's primary focus. One origin. Worth addressing if scope allows, after the
primary problems are tested.

---

---


## What we are not solving now

**H5 — Resolution time above market benchmarks** — trust: `weak`

H5's sole reference (A2-item-7, cards-payments-team, aggregated) has incomplete provenance: no
production date, no page locator. The qualifying set is empty. The trust tag is `weak` because a
reference exists, but no first-hand observation is present and neither condition for `strong` is met.
The disconfirming evidence within the same dataset is notable: A2-item-4 (participant-d9, first-hand,
complete) reports a two-day resolution the participant described as fast, which moves directly against
the hypothesis as stated. The hypothesis may be too broad, or the slow-resolution experience may be
path-dependent rather than systemic.

Completing A2-item-7's provenance and obtaining customer-reported duration experiences would be
required before reconsidering placement.

Retained in full. `parked[]` is never emptied. Parked problems carry their evidence and trust tags
into any follow-on run at no additional cost.

---

---


## How we decided the order

The brief's outcome: *Customers who spot a transaction they did not make can report it and know
where it stands, without printing anything or ringing anyone.*

The success signal: *Customers stop ringing to ask where their case is.*

Two components structure the ordering:

1. **Know where it stands** — customers must be able to track a case in the channel, without ringing.
2. **Report it** — customers must be able to initiate a dispute digitally, without a paper form or a call.

The success signal names the status-tracking gap directly; that gap is the most immediate driver of
calls and maps to the product goal (share of cases closed with no inbound status call). The ordering
weights H3 first, H2 second, and H1 third on that basis.

---

---


## What we could not establish

**Whether the ordering survives corroboration of H1, H2 and H4.** Three of the four placed problems rest on a single origin each. If a second origin contradicted any of them the order would change, and nothing in this run has looked.

**Whether resolution time is a problem at all.** H5 is parked rather than rejected because its only reference is an internal slide with no date, no author and no locator, and the one first-hand observation about timing in the material reports a two-day refund the participant called fast. Completing that slide provenance and getting customer-reported durations is what would settle it.

**What the difficulty of any of these is.** No Banking Constraints or Compliance Guidelines body exists for this run, so nothing here is weighed for feasibility. The ordering is on evidence and outcome fit alone.

---

---


## How this was produced

**Run 2026-04-card-disputes, stage 2.3 prioritisation, quality gate Q2 then decision gate G2.** The placements were decided at G2 on 17 August 2026 by Igor Tadic, Product Owner, and the proposal the agent produced was accepted in every placement. The reasoning set out above is the proposal; the decision is the person, and the two agreeing does not make them one act.

**No Researcher is named on this run.** On 2026-03 the evidence half of G2 was governed by a Researcher and the scope half by the Product Owner. This run material names nobody in that role, so both halves were taken by the same person and the record says so rather than supplying a plausible name.

**Assembled from one record**, which carries the placements, the ordering source and the decision block as fields a check reads:

- **R-A4-01** — records/2-problems/A4-r01-prioritisation.record.md

**One edit was made by a person**: G2 recorded, 17 August 2026. What changed and why is in notes/marked-edits.md, which no gate reads.

**Parked is not rejected.** The parked list is never emptied, and a parked problem carries its evidence and its trust tag into any follow-on run at no additional cost.
