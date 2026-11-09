---
run_id: 2026-03-investor-onboarding
artifact_id: A3
ost_role: opportunity
status: accepted
workflow: problems
modified_by: human
revisions: 0
sources:
  - A2b
external_sources: []
produced_by:
  agent: hypothesis-designer
  skill: hypothesis-authoring
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

# Problems | Problem Hypothesis Set — Guided onboarding for first-time investors

**Run:** `2026-03-investor-onboarding` · **Source:** `2-problems/2-intake-record.md` · **Observations read:** 8
**Hypotheses authored:** 3 · **Rejected candidates:** 1 · **Not evidence:** 1 · **Not restated:** 1



**Assembled from one record**, which carries the fields a gate decides: [rec:R-A3-01].
---

## How trust tags were computed

Each tag is arithmetic over the qualifying set — those observations whose `provenance_complete` is
`true` in A2b — counting distinct `origin_key` values. A tag is derived from that count, not asserted.

The bar for `strong` (evidence-standards v0.4 §5): two or more independent origins in the qualifying
set, and at least one `first_hand` observation among them. Two conditions, both required.

Six of the eight observations have complete provenance. Two do not:

- **A2-item-6** (Wealth Products team deck): no date of production recorded — provenance incomplete.
- **A2-item-7** (Product Owner statement): no session date recorded — provenance incomplete.
  Additionally, intake flagged that the assigned proximity (`relayed`) was the closest available fit;
  the category for an ungrounded prediction does not exist in the standard.

Both are excluded from every qualifying set. Both appear below, accounted for.

The weak spot this arithmetic cannot see: a skill that attaches references generously inflates trust,
and the only control on that is the Researcher at G2. The computation is correct given the references
attached; it cannot verify that the attachment decisions were correct. The `could_not_verify` block
above names this as a judged rule that no check decides.

---

## H1 — Choice at fund selection

**Trust: weak**

> A first-time investor who reaches the in-app fund selection encounters more options than they can
> evaluate and exits without making a selection.

**Evidence**

| Ref | Origin key | Proximity | Complete |
|---|---|---|---|
| A2-item-1 | participant-p7 | first_hand | yes |
| A2-item-3 | participant-p7 | first_hand | yes |

**Rationale**

A2-item-1 records P7 opening the investments tab, encountering eleven listed funds, and exiting without
selecting. A2-item-3 records P7 resolving the fund selection by consulting a family member rather than
deciding through the app, and expressing uncertainty about whether the recommendation was correct. Both
observations are first_hand and complete.

Both references come from participant-p7. One independent origin. Two observations, one origin — volume
is not corroboration. Below the threshold of two independent origins required for `strong`. Tag: `weak`.

Note on the idle-savings observation (also under A2-item-1): P7's report of holding CZK 400,000 idle
for two years establishes that P7 was motivated to act. It is context, not a barrier observation. The
second observation under A2-item-1 — fund-tab abandonment — is the evidence for H1. Both observations
share the ref and so the ref appears once in the evidence list.

---

## H2 — Suitability questionnaire inaccessible to first-time investors

**Trust: strong**

> A first-time investor cannot complete the suitability questionnaire because its questions presuppose
> investment experience they do not have, causing them to stop before completing a purchase.

**Evidence**

| Ref | Origin key | Proximity | Complete |
|---|---|---|---|
| A2-item-2 | participant-p7 | first_hand | yes |
| A2-item-5 | adviser-k-sedlackova | relayed | yes |

**Rationale**

A2-item-2 records P7 reporting they could not answer the risk questionnaire honestly because the
hypothetical questions assumed prior investment experience they did not have — first_hand, complete.
A2-item-5 records Adviser K. Sedlackova reporting an estimated several calls per week from customers
who stated they had begun an in-app investment purchase and stopped at the suitability questionnaire —
relayed, complete.

Two independent origins: participant-p7 and adviser-k-sedlackova. At least one first_hand observation
present: A2-item-2 (participant-p7). Both conditions for `strong` are satisfied. Tag: `strong`.

Note on A2-item-5 proximity: K. Sedlackova is relaying what callers told her. The callers are unnamed,
so per evidence-standards §4.1 the adviser is the origin and the proximity is `relayed`. The `strong`
tag does not rest on the adviser being a witness — it rests on two independent origins being present
and one of them (participant-p7) being first_hand.

---

## H3 — Settlement mechanics uncertainty causes order cancellation

**Trust: weak**

> A customer who reaches the investment order confirmation screen cannot determine when money will
> leave their account and cancels the order rather than proceeding under uncertainty about the
> settlement timeline.

**Evidence**

| Ref | Origin key | Proximity | Complete |
|---|---|---|---|
| A2-item-4 | participant-p11 | first_hand | yes |

**Rationale**

A2-item-4 records P11 reaching the investment confirmation screen, reading that the order would settle
in two working days, cancelling because they were uncertain whether money would leave the account
immediately or at settlement, and then calling a branch for clarification — first_hand, complete.

One independent origin (participant-p11). Below the threshold of two required for `strong`. Tag: `weak`.

---

## Rejected candidates

**Candidate:** "Customers would use a guided robo-advisor to make their investment decisions."

**Source ref:** A2-item-7 (Product Owner statement, session date not recorded).

**Outcome:** Rejected. Names a thing to build rather than stating a customer problem. The intake record
records no observational basis for the claim. Under evidence-standards §2, the Product Owner's
prediction of what customers would do is not an observation of what customers have done — the assertion
is itself the hypothesis. No intake observation supports a distinct need beneath this candidate that is
not already captured in H1, H2, or H3.

A person may disagree with this at G2.

---

## Not evidence

**A2-item-7** — The observation reports the Product Owner's prediction that customers would use a
robo-advisor if one were built. It does not report something the origin observed about customer
behavior. Under evidence-standards §2, an assertion about what customers would do is not evidence for
any hypothesis — the test is whether an observation is present, not whether a conclusion is absent.
Provenance is also incomplete (no session date, no stated observational basis). This reference was not
attached to any hypothesis.

---

## Not restated

**A2-item-6** — The Wealth Products team retail savings migration deck states that conversion from
current-account balances to a first investment product remains in single digits. This is a
population-level aggregated indicator showing that conversion is low; it does not report a specific
barrier encountered by a named customer. Provenance is incomplete (no deck date, no underlying figures
or methodology cited), so this reference would not reach the qualifying set for any hypothesis it might
be attached to. The specific barriers to conversion are captured in H1, H2, and H3.

---

## What this artifact does not do

This artifact does not run Q2 and does not report a result for it. It restates observations as problem
hypotheses, computes trust tags by arithmetic over the qualifying set, records one rejected candidate,
and carries forward what could not be resolved. The gate runs independently.

---

## Marked human edit — one, and the account is in `notes/`

**Not agent output.** One edit was made to this artifact by a person: *the OST role brought to the register* (12 August 2026). **What changed and why is in [notes/marked-edits.md](../notes/marked-edits.md)**, which no gate reads.
