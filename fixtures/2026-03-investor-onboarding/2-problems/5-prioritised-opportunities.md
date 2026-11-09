---
run_id: 2026-03-investor-onboarding
artifact_id: A4
ost_role: opportunity
status: accepted
workflow: problems
modified_by: agent
revisions: 0
sources:
  - A3
external_sources: []
produced_by:
  agent: hypothesis-designer
  skill: prioritisation
could_not_verify: []
decision:
  gate: G2
  by_agent: false
  accepted_by:
    - name: Petr Havel
      role: Researcher
    - name: Igor Tadic
      role: Product Owner
  accepted_at: 2026-08-12
  reason: "Primary H2 alone. Secondary H1. Parked H3. Not carrying two primaries into a run whose outcome is about a first purchase completing. H2 blocks everyone, H1 is the one to test second, H3 is downstream of both and is retained rather than worked this run."
  changed_during_refinement: none
  refinements: []
  note: "The proposal below (step 1) differed: it would have promoted H3 to secondary alongside H1, on trust-tag and evidence-breadth grounds alone. The decision parked H3 instead, on a scope ground the proposal does not weigh — H3 is downstream of both H1 and H2 for a run whose outcome is a first purchase completing. That is the Product Owner's call to make, not the agent's, and the artifact records what was decided."
assembled_at: 2026-08-20
assembled_from: [R-A4-01]
---

# Problems | Prioritised Problem Set — Guided onboarding for first-time investors

**Run:** `2026-03-investor-onboarding` · **Source:** `2-problems/3-problem-hypotheses.md` · **Hypotheses placed:** 3 of 3

This artifact places every A3 hypothesis in exactly one list. The hypothesis itself — statement,
evidence, trust tag, rationale — stays in A3, unchanged. Only the id moves here.



**Assembled from one record**, which carries the fields a gate decides: [rec:R-A4-01].
---

## Step 1 — Proposal (marked as a proposal, not a decision)

Before the decision below was recorded, the ordering that trust tag, breadth of evidence and fit to the
outcome alone would suggest is:

| Hypothesis | Trust | Basis |
|---|---|---|
| **Primary: H2** | `strong` | The only hypothesis with two independent origins and a first-hand observation among them. It sits at the suitability questionnaire, a hard stop before purchase. |
| **Secondary: H1** | `weak` | Single origin (participant-p7), first-hand, complete. Earlier in the funnel than H2 — fund selection precedes the questionnaire. |
| **Secondary: H3** | `weak` | Single origin (participant-p11), first-hand, complete. Later in the funnel than H2 — settlement uncertainty at order confirmation. Evidence quality is equal to H1's; the `secondary` list has room (0..5) for both. |
| **Parked:** *(none, under this proposal)* | — | — |

This proposal would have kept nothing parked, because both weak hypotheses are still real, evidenced
problems and the cardinality bounds had room. **It is not the decision.** It is offered so the reader can
see where the human call added something the arithmetic and the funnel-order heuristic do not carry:
scope.

## Step 2 — The decision (recorded, not proposed)

**The promotion decision was already taken**, at G2 on 2026-08-12, by Petr Havel (Researcher, who governs
the evidence) and Igor Tadic (Product Owner, who governs the scope). It is carried in this artifact's own
decision record above and in the run record, and reproduced here rather than re-derived:

> Primary `H2` alone · Secondary `H1` · Parked `H3`. Reason: not carrying two primaries into a run whose
> outcome is about a first purchase completing. H2 blocks everyone, H1 is the one to test second, H3 is
> downstream of both and is retained rather than worked this run.

This artifact records that decision. It does not substitute the proposal above for it.

## Placement

| List | Hypothesis | Trust (from A3, unchanged) |
|---|---|---|
| **Primary** | `H2` — suitability questionnaire inaccessible to first-time investors | `strong` |
| **Secondary** | `H1` — choice at fund selection | `weak` |
| **Parked** | `H3` — settlement mechanics uncertainty causes order cancellation | `weak` |

Every A3 hypothesis (H1, H2, H3) lands in exactly one list. None lost, none duplicated, none rewritten.

## Where the proposal and the decision differ, and why it matters

The proposal (step 1) would have put H3 in `secondary`, on the same footing as H1 — both `weak`, both
first-hand, both complete, and the cardinality bound (`secondary` 0..5) had room for both. The decision
parked H3 instead, for a reason the trust arithmetic and a funnel-position heuristic cannot see on their
own: **scope fit to this run's outcome.** H3 sits downstream of both H1 and H2 in the purchase funnel — a
customer who never gets past fund selection (H1) or the questionnaire (H2) never reaches the point where
H3's settlement-timeline confusion would matter. Retaining H3 in `parked[]` keeps it visible and evidenced
for a run where it is load-bearing, rather than working it now.

This is exactly the distinction the skill exists to protect: prioritisation is the user's act. The
arithmetic tags evidence; it does not weigh scope. Where the two calls diverge, this section says so and
the artifact carries what was decided, not what was proposed.

## `parked[]` is retained, not emptied

`H3` stays here, fully evidenced (`weak`, one origin, first-hand, complete — see A3), visible for the next
run rather than dropped. This is the cheapest input a future run on settlement-timeline clarity will have.

## What could not be resolved

Nothing in the prioritisation step itself is unresolved. The cardinalities check out (`primary`: 1,
within 1..3; `secondary`: 1, within 0..5; at least one primary present), every A3 hypothesis is placed
exactly once, and the decision to record was supplied complete — gate, both accepting parties and their
roles, the date, and the reasoning — so nothing here was inferred.

Two items remain open from A3 and are not restated in this artifact's `carried_unresolved`, since they
concern observations (A2-item-6, A2-item-7) that were never attached to H1, H2 or H3 and so are outside
this artifact's scope. They are still live in `2-problems/3-problem-hypotheses.md`'s own `carried_unresolved` block and are
not resolved by this artifact placing hypotheses in lists.

## The weak spot this artifact does not close

The trust tag on H2, H1 and H3 is arithmetic over the reference set attached to each in A3 — but the
arithmetic cannot verify that the attachment decisions were correct. An agent that attaches references
generously inflates trust, and the only control on that is the Researcher at G2, who has already reviewed
this evidence as part of the decision recorded above. That review governs the evidence; it does not
change what this artifact does, which is to place ids in lists.

## What this artifact does not do

This artifact does not run Q2 and does not report a result for it. It does not re-tag trust — H1, H2 and
H3 carry the same tags A3 derived. It does not edit A3. It does not empty `parked[]`. It records a
promotion decision the user made; it does not make one itself. The gate runs independently.
