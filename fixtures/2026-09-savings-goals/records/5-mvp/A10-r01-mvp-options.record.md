---
run_id: 2026-09-savings-goals
record_id: R-A10-01
artifact_id: A10
item_id: ""
produced_at: 2026-08-28
bounds_hit: []
trace_id: []
constraint_basis: none_stated
sources: [A9, A7]
external_sources: []
options:
  - id: OPT-A
    statement: "Round-ups only, into one goal the client names"
    approach: "The client names one goal with a target amount. Every card payment rounds up to the nearest fifty crowns and the difference moves into that goal. There is no other funding rule and no second goal."
    differs_by: "The narrowest funding rule and the narrowest scope. It tests whether money the client never decided to move accumulates into something they chose."
    constraints_met: []
  - id: OPT-B
    statement: "A fixed weekly amount into one goal the client names"
    approach: "The client names one goal with a target amount and sets a weekly amount. That amount moves every week unless the balance would fall below a floor the client sets. No round-ups."
    differs_by: "The same scope with the opposite funding rule. A weekly amount is a decision made once, where a round-up is a decision never made at all."
    constraints_met: []
  - id: OPT-C
    statement: "Round-ups into a goal chosen at the moment the client sets up the rule, with up to three goals"
    approach: "The client can hold up to three named goals and choose which one the round-ups fund, changing that choice at any time. Round-ups are the only funding rule."
    differs_by: "The same funding rule as OPT-A with the choice OPT-A withholds. It tests whether choosing the destination is what makes the saving stick, which is the one thing separating Starling from Air Bank."
    constraints_met: []
---

# Record R-A10-01 — A10

One production. The document assembled from it is 5-mvp/1-mvp-options.md.
