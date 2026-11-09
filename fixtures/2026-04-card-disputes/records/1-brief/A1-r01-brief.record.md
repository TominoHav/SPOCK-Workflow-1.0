---
run_id: 2026-04-card-disputes
record_id: R-A1-01
artifact_id: A1
item_id: ""
produced_at: 2026-08-14
produced_by:
  agent: product-owner
  skill: brief-elicitation
bounds_hit: []
created_at: 2026-08-14
title: Card dispute resolution in the digital channel
product_owner: Igor Tadic
topic: How retail customers report a disputed or fraudulent card transaction and follow it to resolution
outcome: "Customers who spot a transaction they did not make can report it and know where it stands, without printing anything or ringing anyone."
outcome_restatement: not_proposed

goals:
  - product_goal: Card dispute cases raised and followed to resolution in the digital channel without a call or a paper form
    metric: Share of card dispute cases raised digitally and closed with no inbound status call
    key_result: AI-2
    link: "A dispute raised on the paper form enters as a non-straight-through service process. It needs manual keying by card operations, and it generates at least one status call that the contact-centre agent cannot answer because they have no view of the case. Moving both the raise and the status view into the app removes the keying step and the status call from the same case. Each case moved is one service process converted from manual to straight-through, which is what AI-2 counts."

success_signal: Customers stop ringing to ask where their case is.
customer_segment: "Retail debit and credit card holders in the Czech Republic, all ages. Weight toward customers who have had at least one disputed transaction."
market_scope: Card dispute and chargeback handling for retail cardholders.
known_constraints:
  - Chargeback timings are set by the card schemes and cannot be changed.
background: Card operations flagged rising dispute volumes and the paper form is the oldest journey still live in the retail estate.
related_runs: []

unknowns:
  - field: time_horizon
    reason: not_yet_available
    note: Not decided at brief time.

---

# Record R-A1-01 — A1

One production. Not written for a reader; the document assembled from it is 1-brief/initiative-brief.md.
