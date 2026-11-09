---
run_id: 2026-09-savings-goals
record_id: R-A11-01
artifact_id: A11
item_id: OPT-A
produced_at: 2026-08-28
bounds_hit: []
trace_id: []
strategy_basis: none_stated
sources: [A10, A9, A8c, A1b]
external_sources: []
option_id: OPT-A
description: "A client in the pilot group names one savings goal and a target amount. Once the rule is on, every card payment rounds up to the nearest fifty crowns and the difference moves from the current account into that goal, which sits as an envelope on the client's savings account. The client can see progress, add money by hand, take money back, switch the rule off, or delete the goal, at any time. No second goal, no other funding rule, and no change to how any payment works."
strategic_touchpoints:
  - touchpoint: "Money held here rather than moved to another bank"
    basis: indicative_unverified_strategy
  - touchpoint: "A saving habit that needs no decision from the client"
    basis: indicative_unverified_strategy
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
    basis: "The client can end the arrangement inside the journey"
unexamined_areas: []
analyst_input: "Stage 6 needs: the in-app text for the rule and the progress display in final wording, the pilot group defined so it can be queried in the data, the behaviour when a round-up would take the balance below zero, what happens to the money when a goal is deleted, and a decision on the two open items below. The goal-name question in particular changes what the requirement stage can write, because constraining free text is a requirement and accepting it is a risk acceptance."
---

# Record R-A11-01 — A11

One production. The document assembled from it is 5-mvp/2-expanded-mvp.md.
