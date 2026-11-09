---
run_id: 2026-09-savings-goals
record_id: R-A8-01
artifact_id: A8
item_id: ""
produced_at: 2026-08-28
bounds_hit: []
trace_id: []
sources: [A1, A4, A7]
external_sources: []
ideas:
  - id: I1
    statement: "An automatic set-aside the client points at a goal they named."
    description: "The client names a goal and an amount, then switches on a rule that moves money towards it without deciding each time. The rule can be a round-up on card payments, a fixed weekly amount, or both. Round-ups compute at card authorisation and sweep to the goal the client chose. The fixed amount runs on a schedule. Both move money between the client's own accounts and neither creates a product."
    solves: [O1, O5]
    supported_by: [ST5, P3, TR1]
    compliance_touchpoints: [A1.S1, A1.S13, A2.G1, A2.G4]
  - id: I2
    statement: "A goal that lives in the current account rather than beside it."
    description: "A named goal with a target amount, held inside the current account, showing the client what is set aside and what is left as spare. The set-aside is a reservation against the current-account balance rather than a transfer to another account. The money never leaves and the available balance drops by what is reserved."
    solves: [O2, O3]
    supported_by: [ST1, ST3, P1]
    compliance_touchpoints: [A1.S1, A1.S2, A1.S13, A2.G1]
  - id: I3
    statement: "A target date on a goal, not just a target amount."
    description: "The client sets what they are saving for, how much, and by when. The bank shows whether they are on track and what the weekly amount would have to be. The weekly amount is arithmetic on the target, the date and what is already saved. Nothing is inferred about the client and no decision is made about them."
    solves: [O1, O4]
    supported_by: [ST4, P2]
    compliance_touchpoints: [A1.S1, A1.S2, A2.G1, A2.G4]
  - id: I4
    statement: "Spending straight out of a goal when it is reached."
    description: "When a goal reaches its target the client can pay from it directly, without moving the money back first. The goal becomes a payment source for a single transaction. Nothing about how payments work changes; the source is different."
    solves: [O3, O4]
    supported_by: [ST6, P2]
    compliance_touchpoints: [A1.S1, A1.S8, A1.S13, A2.G1]
  - id: I5
    statement: "Showing what is already committed, without moving it."
    description: "The balance is shown split into what is already spoken for and what is genuinely spare, based on the client's own recurring outgoings. The committed part is computed from the client's standing orders, direct debits and recurring card payments over the next period. Nothing moves and no rule runs."
    solves: [O1, O3]
    supported_by: [ST1, P1]
    compliance_touchpoints: [A1.S1, A1.S13, A2.G1, A2.G6]
unproduced: []
---

# Record R-A8-01 — A8

One production per idea, joined here. The document assembled from it is 4-solutions/1-solution-set.md.
