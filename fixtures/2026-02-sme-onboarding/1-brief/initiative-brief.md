---
run_id: 2026-02-sme-onboarding
artifact_id: A1
ost_role: outcome
status: produced
workflow: discovery
modified_by: agent
revisions: 0
sources: []
external_sources:
  - source: Engineering timeout logs for the document upload step
    entered_at: A1
    via: cited by the product owner during elicitation
    note: Not seen or verified in this run. To serve as evidence it must enter as A2 material through material-intake
produced_by:
  agent: product-owner
  skill: brief-creation
# Brief | Initiative Brief — derived from the gate model and
# recomputed at the gate, never read as authored (C65, PD148/D7)
could_not_verify:
  - rule: "no field is inferred; an unsupplied field is marked unknown with a reason"
    needs: judge
    reach: process
assembled_at: 2026-08-20
assembled_from: [R-A1-01]
---

# Brief — SME Onboarding Fix


**Assembled from one record**, which carries the fields a gate decides: [rec:R-A1-01].
## The outcome is the product owner's wording, and the restatement was declined

The stated outcome — *"Redesign the document upload step so it stops timing out"* — was put to the
product owner as a solution rather than a change in the world. One restatement was proposed:

> Small business owners who start opening a current account can complete it without dropping out.

It was declined. The product owner's wording is therefore recorded verbatim as `outcome`, the proposal
is retained in `restatement_proposed`, and `outcome_restatement` is `declined`. The agent does not
overwrite an outcome. **G1 weighs this; the agent does not.**

**What a reviewer should weigh.** This outcome is the root of the run's Opportunity Solution Tree. It
names a solution and it embeds a cause. Every problem hypothesis in stage 2, and everything after,
hangs from it — so the run is bounded to the document upload step by construction. If applicants are
also lost elsewhere in the flow, this run will not surface it. The product owner has stated this is
deliberate: *"I don't want the run wandering off across the whole flow."* That is a legitimate call and
it is recorded as one, not as an oversight.

## The timeout logs are cited but are not in this run

The product owner reports that Engineering has shown her timeout logs for the document upload step, and
that they establish the cause. **No agent in this run has seen them.** They are tagged in
`external_sources[]`, marked at the point they entered, and they carry no evidential weight from being
named here.

If those logs are to support a problem hypothesis in stage 2, they must be supplied as problem material
and pass through `material-intake` — C35 requires every evidence reference to resolve through an intake
observation. **The brief is not an evidence route.** Supplying the logs as A2 material at stage 2 is the
cheapest way to make this belief testable rather than assumed.

## goals is unknown, and was not guessed

The product owner asked for "something sensible about improving conversion" to be written in. It was
not. No field in a brief is inferred, including from a plausible default: three stages on, an invented
objective is indistinguishable from a sourced one, and by then it will have been used to score and
prioritise problems.

`goals` is marked `not_yet_available` — the reason was proposed and the product owner confirmed it. The
H2 OKRs are unpublished. An unknown field does not fail the quality gate; it is visible for the rest of
the run and it is weighed at G1. Filling it later is a visible edit carrying `modified_by: human`, and
`goals` is not a bounding field, so a later amendment does not make downstream artifacts stale.

## What was not reached

`success_signal` and `time_horizon` are optional and were not discussed — elicitation was closed at the
product owner's instruction to write the brief, at exchange 3 of a 15-exchange bound. No bound was hit.

They are **absent rather than marked unknown**, because an unknown carries a reason, a reason is
confirmed by the person and never assumed from silence, and neither field was put to her. Either can be
added as an amendment.

`background` is assembled from the product owner's own statements during elicitation and is hers to
correct.
