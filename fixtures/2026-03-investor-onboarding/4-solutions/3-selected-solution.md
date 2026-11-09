---
run_id: 2026-03-investor-onboarding
artifact_id: A9
ost_role: solution
status: accepted
workflow: discovery
modified_by: human
revisions: 0
sources:
  - A8
  - A8b
external_sources: []
could_not_verify: []
decision:
  gate: G4
  by_agent: false
  selection: ID-2
  accepted_by:
    - name: Igor Tadic
      role: Product Owner
  accepted_at: 2026-08-13
  reason: "Selected on the reasoning recorded above. The scored set carried no numbers to weigh — all seven sub-dimensions are declared unscored and both axes report denominator 0, because the Strategy Basis, the Compliance Guidelines and the Banking Constraints are absent. The per-axis rationales and the market findings were the whole basis for the choice."
  changed_during_refinement: none
  refinements: []
  note: "The alternatives reached this decision undecided. A8 carries no score, rank or ordering claim (C70), and C59 confirmed at Q4 that no idea was recommended or selected before a person read the set. A side-by-side comparison was prepared for this decision and deliberately carried no ranking; a recommendation was offered separately in conversation, stated as the assistant's own view and outside the artifact record, and the Product Owner took it. Recording that here rather than leaving the record to imply an unaided choice."
assembled_at: 2026-08-20
assembled_from: [R-A9-01]
---

# Ideas | Selected Idea — ID-2

**Run:** `2026-03-investor-onboarding` · **Stage:** 4, decision gate **G4**
**Selected by:** Igor Tadic, Product Owner · **13 August 2026**



**Assembled from one record**, which carries the fields a gate decides: [rec:R-A9-01].
---

## What was selected

**ID-2 — teaching built into the flow, with the questionnaire's questions unchanged.**

Short contextual explanations at each stage of the suitability questionnaire and the fund-selection flow:
what a term means, what the bank is legally required to ask, and what an answer implies for the customer's
investment profile. The questionnaire's structure and wording are untouched. The same support extends to
fund selection, where product labels — dynamic, conservative, balanced — presuppose the literacy the
customer does not have.

The full statement, description, problem bindings and market evidence are in
[`4-solutions/1-solution-set.md`](./1-solution-set.md) and are not restated here.

## What it solves

**H2, the run's only primary problem** — the suitability questionnaire is inaccessible to a first-time
investor. H1 (abandonment at fund selection) is secondary and this idea does not target it. H3 is parked.

## Why this one

Three grounds, in the order they carried weight.

**It covers the primary problem without touching the regulated instrument.** ID-1 and ID-5 also cover H2
and both modify the suitability questionnaire itself, which carries a MiFID II surface: adapted question
wording must still produce a legally valid risk profile. ID-2 adds a layer alongside the questionnaire and
names no compliance touchpoint at all.

**The behaviour is already proven in another channel.** The market synthesis records that the in-branch
adviser performs exactly this educational role today, in person, and that no profiled bank has moved it
into the digital channel. That is a smaller bet than introducing behaviour nobody has tested on this
segment.

**The wider answer was deferred, not rejected.** ID-5 solves both problems in one journey and carries the
widest compliance surface in the set — MiFID II and personal financial data together. Committing to that
while the Compliance Guidelines do not exist is the move worth waiting on. Under PD12 a second idea starts
a new run from the same problem set, so ID-5 remains available without re-deciding anything here.

## What was not selected, and what happens to it

**ID-1, ID-3, ID-4 and ID-5 remain in `4-solutions/1-solution-set.md`, unaltered.** Nothing is discarded at this gate. Each
stays available as the starting point of a separate run against the same prioritised problems.

**One idea and one MVP option per run (PD12).** Stages 5 through 7 build on ID-2 and on nothing else.

## What this decision could not rest on

**There were no scores.** Both axes report `denominator: 0` for every idea, and all seven sub-dimensions
are declared unscored. The Strategy Basis, the Compliance Guidelines and the Banking Constraints each
define bands and none has been supplied. Under PD35 an unscorable dimension is declared unscored rather
than set to zero, so the artifact is honest and the arithmetic is simply absent.

**The consequence is that this selection rests on reasoning and market evidence alone.** That is stated
here so a later reader does not infer a quantitative basis that never existed, and so the same decision
taken after those three bodies land can be compared against this one.
