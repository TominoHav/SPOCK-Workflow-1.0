---
run_id: 2026-09-savings-goals
record_id: R-A12-01
artifact_id: A12
item_id: ""
produced_at: 2026-08-28
bounds_hit: []
trace_id: []
sources: [A11, A1, A4]
external_sources: []
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
  - id: R7
    traces_to: [A11]
  - id: R8
    traces_to: [A11]
  - id: R9
    traces_to: [A11]
  - id: R10
    traces_to: [A11]
  - id: R11
    traces_to: [A11]
alignment_validation: "Checked against LVL-2 (share of wallet, strategy-basis v0.1 §2.4, direction: increase, type C). The chain solution I1 scored Strong on at stage 4.3 survives the narrowing to OPT-A: a client whose card payments round up into a goal they named holds money here that would otherwise sit at another bank, and that movement is what LVL-2 counts. The chain is one step and the step holds. Narrowing from I1 to OPT-A drops the fixed weekly amount and the choice of destination, which reduces how much accumulates but does not break the link. SHD-1 is not claimed: the rule runs without the client returning, and O5 in the opportunity set says that is the point. Basis: strategy-basis v0.1, and the indicative_unverified_strategy marking from A11 still stands."
compliance_touchpoints:
  - area: A1
    sub_domain: S1
    trigger: T7
    resolution: requirement
    names: "R4 — the in-app text explaining what the rule does and what it has moved, approved by client communications"
    touchpoint: "Client protection and communications"
    basis: "The pilot tells the client something new in the app, and a rule that moves money silently has to be explicable"
  - area: A1
    sub_domain: S2
    trigger: T2
    resolution: requirement
    names: "R7 — the pilot group is defined as retail clients aged 25 to 45 with a current account, an active app and no funded savings product"
    touchpoint: "Product governance and target market"
    basis: "The pilot is a material change to an existing product for a defined segment, not a new product"
  - area: A1
    sub_domain: S13
    trigger: T12
    resolution: requirement
    names: "R8 — the goal screen, the rule screen and the progress display pass an EAA accessibility check before launch"
    touchpoint: "Accessibility"
    basis: "Three new client-facing screens, all used by the client without help"
  - area: A2
    sub_domain: G1
    trigger: P2
    resolution: requirement
    names: "R9 — the processing record names the purpose as funding and displaying a client-set savings goal, on performance of the account contract for the transfer and legitimate interest for the progress calculation"
    touchpoint: "Lawful basis and purpose"
    basis: "Existing account data is used for a new purpose"
  - area: A2
    sub_domain: G2
    trigger: P2
    resolution: requirement
    names: "R10 — the new purpose is described in the app and in the privacy notice before launch"
    touchpoint: "Transparency and client information"
    basis: "The client has to be told their payments are being read to compute a round-up"
  - area: A2
    sub_domain: G4
    trigger: P12
    resolution: requirement
    names: "R5 — the client can delete a goal at any time and the money returns to the current account"
    touchpoint: "Rights in the journey"
    basis: "The product itself is a rights route: deleting a goal is erasure of what the client typed"
  - area: A2
    sub_domain: G5
    trigger: P6
    resolution: open_item
    owner: "Data protection officer"
    decided_at: "before launch"
    touchpoint: "Special category data"
    basis: "The goal name is free text and a client can type health or other special-category data into it. What the pilot does about that is a decision, not a requirement this document can make"
  - area: A2
    sub_domain: G11
    trigger: P2
    resolution: open_item
    owner: "Data protection officer"
    decided_at: "before launch"
    touchpoint: "Accountability, DPIA and records"
    basis: "Whether the pilot needs an impact assessment is the officer's decision, and the special-category route makes it more likely than not"
  - area: A3
    sub_domain: L1
    trigger: N6
    resolution: requirement
    names: "R6 — switching the rule on records what the client agreed to, and the record is retrievable"
    touchpoint: "What the client agreed to"
    basis: "The client switches on a rule that moves their money, and what they switched on has to be locatable afterwards"
  - area: A3
    sub_domain: L4
    trigger: N6
    resolution: requirement
    names: "R5 — the client can switch the rule off or delete the goal at any time, with the money theirs throughout"
    touchpoint: "Withdrawal and termination"
    basis: "The client can end the arrangement inside the journey"unexamined_areas: []
agreement_block:
  name: ""
  date: ""
---

# Record R-A12-01 — A12

One production. The document assembled from it is 6-prd/1-prd-draft.md. The agreement block is empty and the agent does not write into it.
