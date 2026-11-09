---
run_id: 2026-08-account-switching
record_id: A12-r01
artifact_id: A12
item_id: ""
produced_at: 2026-08-27
bounds_hit: []
trace_id: []
sources: []
external_sources: []
sections:
  - id: overview
  - id: problem
  - id: users
  - id: success_measures
  - id: requirements
  - id: non_functional
  - id: out_of_scope
  - id: dependencies
requirements:
  - id: R1
    traces_to: [A11]
  - id: R2
    traces_to: [A11]
  - id: R3
    traces_to: [A11]
  - id: R4
    traces_to: [A11]
  - id: R5
    traces_to: [A11]
  - id: R6
    traces_to: [A11]
structure_basis: prd_template@0.4
alignment_validation: "Checked against LVL-2 (share of wallet, Level Up, strategy-basis v0.1 §2.4, direction: increase, type: C) and NOM-4 (clients migrated from the original channel to the new digital channel, strategy-basis v0.1 §2.2, direction: increase, type: C). The chain the solution scored Strong on at stage 4.1 survived the narrowing to OPT-A: OPT-A resolves the visibility gap that keeps a mandate float at the old bank; when the list clears and the customer closes the old account, daily banking moves fully to CS; that movement is what LVL-2 counts. The chain is one step and each step holds. Narrowing from I1 to OPT-A (continuous tracking throughout the window rather than point-in-time) does not break the chain. NOM-4 is reinforced: the full switching flow runs inside the CS app. The AI-2 strain named in A11 is unchanged: the AISP consent step runs inside the old bank's authentication interface outside CS's control. Basis: strategy-basis v0.1."
compliance_touchpoints:
  - aisp_consent_data_scope
  - mandate_data_handling
agreement_block:
  name:
  date:
---
