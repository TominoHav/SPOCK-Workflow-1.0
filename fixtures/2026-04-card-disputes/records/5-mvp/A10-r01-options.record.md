---
run_id: 2026-04-card-disputes
record_id: R-A10-01
artifact_id: A10
item_id: ""
produced_at: 2026-08-18
produced_by:
  agent: product-owner
  skill: mvp-options
bounds_hit: []
constraint_basis: "none_stated"
options:
  - id: OPT-A
    statement: "A real-time push notification on every card transaction, default-on for all cardholders with an ePrivacy-compliant opt-out mechanism, with a one-tap dispute action opening a purpose-built pre-filled dispute screen in the CS app."
    approach: "Pilots ID-3 with the notification firing on every card transaction within seconds. All cardholders receive a notification on every purchase — routine daily spending as well as unusual charges. The notification identifies the charge (time, amount, merchant) and carries a dispute action for any charge the cardholder did not authorise. The one-tap dispute action opens the pre-filled dispute screen with date, amount, and merchant from the transaction record. A cardholder who makes ten transactions in a day receives ten notifications."
    differs_by: "The notification fires on every card transaction, making it a real-time receipt present on every charge. A cardholder receives it on routine daily purchases as often as on suspicious ones. OPT-B fires the notification only on transactions matching a bank-defined risk profile, so the cardholder receives it specifically when a charge warrants attention, not as a receipt for every purchase."
    constraints_met: []
  - id: OPT-B
    statement: "A real-time push notification on transactions matching a bank-defined risk profile, default-on for all cardholders with an ePrivacy-compliant opt-out mechanism, with a one-tap dispute action opening a purpose-built pre-filled dispute screen in the CS app."
    approach: "Pilots ID-3's notification-to-dispute link on the transactions most likely to involve unauthorized use. The notification fires within seconds when a transaction matches a defined risk profile; transactions outside that profile post silently. All cardholders are enrolled by default with the same ePrivacy-compliant opt-out as OPT-A. The notification carries the transaction details and a dispute action; it arrives specifically when a charge warrants the cardholder's attention. The one-tap dispute action opens the same pre-filled dispute screen as OPT-A."
    differs_by: "The notification fires only on transactions matching a risk profile, so the cardholder receives it when a charge is more likely to be unauthorized — not as a receipt on every routine purchase. OPT-A fires on every card transaction. Where OPT-A tests whether universal real-time transaction awareness drives dispute behavior, OPT-B tests whether targeted alerting — arriving only when a transaction warrants attention — drives dispute conversion, and whether the implicit signal of receiving a notification changes the cardholder's response."
    constraints_met: []
---

# Record R-A10-01 — A10

One production. Not written for a reader; the document assembled from it is 5-mvp/1-mvp-options.md.
