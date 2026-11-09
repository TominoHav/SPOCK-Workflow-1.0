---
run_id: 2026-01-mortgage-onboarding
artifact_id: A11
ost_role: artifact
status: accepted
workflow: discovery
modified_by: human
revisions: 0
external_sources: []
sources:
  - A10
  - A9
produced_by:
  agent: product-owner
  skill: mvp-expansion
# MVP | Expanded MVP — derived from the gate model and
# recomputed at the gate, never read as authored (C65, PD148/D7)
could_not_verify:
  - rule: "every compliance touchpoint is addressed in functionality, not merely listed"
    needs: judge
    reach: artifact
decision:
  gate: G5b
  by_agent: false
  accepted_by:
    - name: Jana Novakova
      role: product_owner
  accepted_at: 2026-08-10
  changed_during_refinement: none
  refinements: []
  note: Expansion stays within the selected option; the advisor-capacity strain is noted for the PRD, not resolved here
assembled_at: 2026-08-20
assembled_from: [R-A11-01]
---

# Expanded MVP

> **Fictional.** Invented to exercise the stage-5 gate. See [fixtures/README.md](../README.md).
>
> **Reduced run.** The Strategy Basis and Compliance Guidelines are both absent this run. The convergence
> discipline is unchanged: exactly the one option selected at G5a is expanded, the alternatives in A10 are
> left untouched, and traceability holds back to A9 and A4. What degrades is standing: `strategic_touchpoints[]`
> are marked `indicative_unverified_strategy`, and compliance shaping rests on judgement until the
> guidelines land.

This expands **only O1**, the option the G5a decision record in [A10](./1-mvp-options.md) names as selected,
to the depth the PRD will consume. The two options not selected stay in A10, unaltered and un-ranked.

**What it is.** The digital onboarding flow detects a stall and offers, in the app, a route to a mortgage
advisor by chat or a scheduled call, with the application preserved so the buyer resumes where they
stopped. It answers **I2**, the stalled-buyer problem the market synthesis flagged as unanswered, and
carries the primary problem **H1** with it.

**Traceability.** A11 → A9 (the selected idea I2) → A4 (H1 primary, H2 secondary). What stage 6 receives
is still answerable to the problems the run started from.


**Assembled from one record**, which carries the fields a gate decides: [rec:R-A11-01].