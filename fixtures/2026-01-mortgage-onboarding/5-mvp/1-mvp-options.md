---
run_id: 2026-01-mortgage-onboarding
artifact_id: A10
ost_role: artifact
status: accepted
workflow: discovery
modified_by: human
revisions: 0
external_sources: []
sources:
  - A9
  - A7
produced_by:
  agent: product-owner
  skill: mvp-option-design
# MVP | MVP Options — derived from the gate model and
# recomputed at the gate, never read as authored (C65, PD148/D7)
could_not_verify:
  - rule: "2..3 options, each a whole way to pilot the idea, never a subset or a phase of another"
    needs: judge
    reach: artifact
  - rule: "every constraint referenced resolves into the Banking Constraints"
    needs: check
decision:
  gate: G5a
  by_agent: false
  selection: O1
  accepted_by:
    - name: Jana Novakova
      role: product_owner
  accepted_at: 2026-08-10
  changed_during_refinement: none
  refinements: []
  note: In-app rescue keeps the pilot inside the digital channel under test and needs no new outbound-contact consent, so it is the tightest first pilot of the stalled-buyer path
assembled_at: 2026-08-20
assembled_from: [R-A10-01]
---

# MVP options

> **Fictional.** Invented to exercise the stage-5 gate. See [fixtures/README.md](../README.md).
>
> **Reduced run.** The Banking Constraints do not exist this run, so `constraints_met[]` cannot resolve to
> a real set. The option set is marked `constraint_basis: none_stated` and every `constraints_met[]` is
> left empty. The divergence discipline is unchanged: each option is a whole alternative with its own
> stated `differs_by`, none is sequenced, and none is presented as preferred.

Three whole ways to pilot the selected idea **I2 — a supported path for the buyer who stalls
mid-onboarding**. Each is a complete alternative, not a phase or a subset of another: **O1** keeps the
rescue inside the digital channel, **O2** answers a stall with an outbound human call, **O3** resolves it
in a scheduled session with an advisor. They appear in written order, which carries no ranking.

The Product Owner selected **O1** at G5a. The other two options remain here, unaltered, and the selection
is a human act recorded in the decision block above. That decision record is the single account of which
option was chosen; the expansion in A11 reads it, not a separate copy.


**Assembled from one record**, which carries the fields a gate decides: [rec:R-A10-01].