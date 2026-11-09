---
run_id: 2026-03-investor-onboarding
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
  accepted_at: 2026-08-12
  changed_during_refinement: none
  refinements: []
  note: "Accepted as it stood. `goals` remains marked unknown rather than guessed; the brief's own note said the PO would amend before or at G1 and the PO chose to accept without it, which is a recorded choice rather than an omission"
assembled_at: 2026-08-20
assembled_from: [R-A1-01]
---

# Brief | Initiative Brief — Guided onboarding for first-time investors

The requester's first phrasing was *"a simplified flow that gets them into a first fund purchase"*. That is a solution — it names a thing to build rather than the change in the world. The restatement above was proposed by the agent and confirmed by the product owner. The outcome in the frontmatter is the user's.

`goals` is marked declined rather than unknown. The user asked the agent to fill in whatever a bank would normally measure; the no-inference rule does not admit delegation of that kind. Goals are normally drawn from the OKR record for the current period. The field stays open for the PO to amend before or at G1.

`success_signal` was not supplied. It is optional and is omitted rather than guessed.

`market_scope` was proposed by the agent — Czech Republic, retail banking, savings-to-investment products segment, adjacent fintech investment platforms excluded — and confirmed by the coordinator without amendment.



**Assembled from one record**, which carries the fields a gate decides: [rec:R-A1-01].
---

## Marked human edits — two, and the account is in `notes/`

**Not agent output.** Two edits were made to this artifact by a person: *the could_not_verify block* (12 August 2026) · *G1 recorded* (12 August 2026). **What changed and why is in [notes/marked-edits.md](../notes/marked-edits.md)**, which no gate reads.
