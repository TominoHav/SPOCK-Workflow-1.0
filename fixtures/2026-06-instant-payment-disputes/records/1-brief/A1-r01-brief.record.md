---
run_id: 2026-06-instant-payment-disputes
record_id: R-A1-01
artifact_id: A1
item_id: ""
produced_at: 2026-08-21
produced_by:
  agent: product-owner
  skill: brief-creation
bounds_hit: []
created_at: 2026-08-21
title: "Recall and dispute for outgoing instant payments"
product_owner: "Igor Tadic"
topic: "disputes on outgoing instant payments, raised by retail clients of Česká spořitelna"
outcome: "A retail client who has just sent an instant payment to the wrong person, or been talked into sending one, gets a real attempt at recovery inside the window where recovery is still possible, and knows in that same session whether the money is coming back or is gone."
outcome_restatement: "as supplied"
success_signal: "A client who has sent money to the wrong place opens the app rather than reaching for the phone, and the contact centre stops being the place where recovery starts."
customer_segment: "Retail clients who send instant payments from the mobile app. Not all retail clients."
market_scope: "Consumer payment fraud and the recovery of misdirected credit transfers, in retail banking. Czech Republic first, with European retail banks and payment providers in scope for comparison, because irrevocable instant transfer is a European problem rather than a Czech one. Card scheme chargeback tooling is out of scope; run 2026-04-card-disputes already covers it and the recovery mechanism is different - a card chargeback has a scheme-backed right of recovery, an instant payment recall has a request to the receiving bank and nothing else."
related_runs:
  - 2026-04-card-disputes
goals:
  - product_goal: "a client can start a recall attempt in the app in the minutes after sending, and the bank's recall to the receiving bank goes out without a person picking the case up first"
    metric: "median minutes from the client raising the case to the recall being despatched"
    key_result: AI-2
    link: "today the only path from a client to a despatched recall is a call into the contact centre and a manual instruction typed by a back-office operator, and the delay that path adds is the same delay that decides whether the money is still there to recover. Removing the person from the raise-and-despatch path converts a manual service process into a straight-through one, which is the thing AI-2 counts, and it is one lever moving two things because the delay it removes is also what makes recovery possible."
known_constraints:
  - "A recall is a request to the receiving bank, not a right. The receiving bank's cooperation determines whether recovery happens."
  - "Where the client was deceived into authorising the payment themselves, who carries the loss is governed by rules not examined in this brief."
  - "The window in which recovery is possible is short and is not controlled by the initiating bank."
unknowns:
  - field: background
    reason: not_known
    note: "General context available but no specific internal ČS trigger is known to the operator. Inventing one would be inventing a bank-internal fact."
  - field: time_horizon
    reason: not_yet_available
    note: "Not decided at brief time."
---

# Record R-A1-01 - A1

One brief-creation invocation. Not written for a reader; the document assembled from it is 1-brief/initiative-brief.md.
