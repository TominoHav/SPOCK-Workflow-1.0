---
run_id: 2026-01-mortgage-onboarding
record_id: R-A13-01
artifact_id: A13
item_id: ""
produced_by:
  agent: business-analyst
  skill: prd
produced_at: 2026-08-10
structure_basis: prd_template@0.2
sections:
  - id: overview
    status: present
  - id: problem
    status: present
  - id: users
    status: present
  - id: success_measures
    status: not_applicable
    reason: "The current-process baseline is not yet supplied, so a measurable target cannot be set this run"
  - id: requirements
    status: present
  - id: non_functional
    status: not_applicable
    reason: "The run has no measured baseline and no Compliance Guidelines, so every candidate value would be invented. The one threshold the requirements depend on is named as unset inside PR1 rather than guessed here"
  - id: out_of_scope
    status: present
  - id: dependencies
    status: present
alignment_validation:
  statement: "The narrowed in-app rescue MVP still serves the digital-first onboarding direction the run set out on: the rescue never leaves the digital channel, and it closes the stalled-buyer gap the market synthesis flagged. The advisor-capacity strain is named as the one place it pulls against the strategy."
  objectives: []
  basis: indicative_unverified_strategy
compliance_touchpoints:
  - "Advisor access on hand-off is scoped to the assigned advisor, and the buyer consents to the hand-off before it happens (designed into the hand-off requirement, indicative until the Compliance Guidelines land)"
  - "The stall signal is derived from the buyer's own session; what is captured and how long it is kept are stated to the buyer (designed into the detection requirement, indicative)"
requirements:
  - id: PR1
    traces_to:
      - A11
  - id: PR2
    traces_to:
      - A11
  - id: PR3
    traces_to:
      - A11
---

# Record R-A13-01 — A13

One production. Not written for a reader; the document assembled from it is 6-prd/2-prd-agreed.md.
