---
run_id: 2026-07-standing-orders
record_id: R-A8-01
artifact_id: A8
item_id: ""
produced_at: 2026-08-24
bounds_hit: []
trace_id: []
sources: [A1, A4, A7]
external_sources: []
# `produced_by` is NOT here. It belongs on the output only.
# Phase 1 - the slate. This record names the set; it does not author any idea.
ideas:
  - id: I1
    statement: "A dedicated hub in the George app surfaces standing orders, direct debits, and card-on-file subscriptions together and gives the client a mechanism to stop any individual card subscription without triggering a full card block."
    solves: [H1, H2]
    supported_by: [ST2, ST3, P1, P6, TR1]
    compliance_touchpoints: []
  - id: I2
    statement: "Replace the absent card-subscription stopping mechanism with a targeted merchant-level payment block that is honest about what it achieves and proactively monitors for any charge that slips through."
    solves: [H2, H3]
    supported_by: [ST4, P4, TR2, TR6]
    compliance_touchpoints:
      - "Card scheme permission: whether targeted merchant-level payment blocking is permissible under Visa and Mastercard scheme rules without blocking the whole card is not established in the available material; the brief records this as an open question and the Banking Constraints body that would address it is absent for this run. [indicative - Banking Constraints absent]"
      - "Client communication standard: presenting a payment block as distinct from subscription cancellation and explaining the client's continuing contractual obligation with the merchant requires language meeting PSD2 and consumer protection disclosure standards; the Compliance Guidelines body that would govern this wording is absent for this run. [indicative - Compliance Guidelines absent]"
  - id: I3
    statement: "A commitment management experience in George where the bank's actual capability per commitment type is visible before each action and confirmed after, replacing the current flow in which a card subscription cancellation returns a success screen for an action the bank cannot effect."
    solves: [H3, H4]
    supported_by: [ST1, ST6, P3, P7, TR3]
    compliance_touchpoints:
      - "Payment action disclosure: informing clients that blocking a card-on-file payment does not cancel the underlying merchant contract may engage PSD2/PSD3 disclosure obligations covering the limits of payment services. Indicative -- the Compliance Guidelines are absent from this run and the specific obligation requires review when that body is available."
      - "Proactive notification consent: sending clients in-app alerts when a charge reappears from a blocked merchant engages GDPR and Czech financial communications rules on the legal basis for processing transaction data for notification purposes. Indicative -- the Compliance Guidelines are absent from this run."
  - id: I4
    statement: "Give each card subscription its own virtual card credential so the client can revoke it without blocking their card, and surface all three commitment types with type-specific controls that tell the client what the bank can and cannot do before they act."
    solves: [H2, H4]
    supported_by: [ST4, TR4, TR5, P3]
    compliance_touchpoints:
      - "Indicative (Compliance Guidelines absent): per-subscription virtual card issuance under card scheme rules -- TR4 establishes virtual card credential isolation as a market practice at Revolut and Monzo, but whether the bank's card scheme agreements permit issuing one virtual card per merchant subscription is not assessable from this run."
      - "Indicative (Compliance Guidelines absent): PSD3 regulatory alignment -- TR5 identifies that protections for merchant-initiated transactions are being aligned with SEPA direct debit consumer rights, expected in force 2027-2028. A credential isolation product built now should be checked for compatibility with the incoming protections before the regulatory floor arrives."
  - id: I5
    statement: "A unified register of all three commitment types, built on the B2B enrichment layer already operating at the Erste Group parent, delivers one view to the client with type-aware capability guidance at each entry, and a cross-commitment context panel to staff when any commitment case is opened."
    solves: [H1, H4, H8]
    supported_by: [ST2, ST7, P3, P6, TR1]
    compliance_touchpoints: []
unproduced: []
evidence_basis:
---

# Record R-A8-01 -- A8

Phase 1 slate. Five ideas named; no idea authored here. Not written for a reader; the document assembled from this record is 4-solutions/1-solution-set.md.
