---
run_id: 2026-06-instant-payment-disputes
record_id: R-A13-01
artifact_id: A13
item_id: ""
produced_at: 2026-08-23
created_at: 2026-08-23
produced_by:
  agent: business-analyst
  skill: prd
bounds_hit: []
sources: []
structure_basis: prd_template@0.4
sections:
  - id: overview
    status: present
  - id: problem
    status: present
  - id: users
    status: present
  - id: success_measures
    status: present
  - id: requirements
    status: present
  - id: non_functional
    status: present
  - id: out_of_scope
    status: present
  - id: dependencies
    status: present
requirements:
  - id: R1
    traces_to:
      - A11
      - H2
  - id: R2
    traces_to:
      - A11
      - H2
  - id: R3
    traces_to:
      - A11
      - H4
  - id: R4
    traces_to:
      - A11
      - H4
  - id: R5
    traces_to:
      - A11
      - H2
      - H4
  - id: R6
    traces_to:
      - A11
      - H2
  - id: R7
    traces_to:
      - A11
      - H4
  - id: R8
    traces_to:
      - A11
alignment_validation:
  objectives:
    - AI-2
    - SHD-4
    - LVL-4
  basis: strategy-basis@0.1
  statement: "The narrowed MVP retains all three chains scored at stage 4. AI-2: claim registration to recall despatch is straight-through within the session and no human handoff breaks the chain; this is the mechanism the brief named for AI-2. SHD-4: the manual recall-form routing step between registration and despatch is removed and the administration a banker carries in a recall session falls to the registration itself. LVL-4: the client receives a timestamped confirmation in the same session, turning the filing moment into a confirmed action the client holds. The EUR-only first release does not break any chain; all three turn on the registration-to-despatch path and the confirmation event, both of which EUR payments exercise. CZK scope is not in the first release and no chain depends on payment currency."
compliance_touchpoints:
  - "audit trail (R5)"
  - "ISO 20022 message format (R2)"
  - "client notification content (R7)"
  - "agent authorisation (R8)"
agreement_block:
  name: "Igor Tadic"
  date: "2026-08-23"
---
