---
run_id: 2026-07-standing-orders
record_id: R-A10-01
artifact_id: A10
item_id: ""
produced_at: 2026-08-24
bounds_hit: []
trace_id: []
sources: []
external_sources: []
constraint_basis: none_stated
options:
  - id: M1
    statement: "Pilot the unified commitment view across all three recurring commitment types, without a card payment control mechanism; delivers H1 without depending on the card scheme question."
    approach: "Deploy a cross-type view of standing orders, direct debits, and card-on-file subscriptions in one section of the George app. The Tapix classification layer, already deployed at the Erste Group parent, identifies all three commitment types from transaction data. Clients see every recurring commitment leaving their account in one list, with type labels and next-due dates. Standing orders and direct debits remain manageable from the same view. Card subscription entries appear with their amount and merchant name but carry no bank-side stopping action; the app states that stopping a card subscription requires contacting the merchant. The pilot tests whether unified visibility alone reduces H1-driven contact-centre traffic and whether the Tapix integration path is deployable at the Ceska sporitelna consumer layer."
    differs_by: "Excludes the H2 card payment control entirely. The unanswered card scheme question has no effect on this option. The pilot delivers H1 in full without requiring any answer about which card mechanism the bank can use."
    constraints_met: []
  - id: M2
    statement: "Pilot the unified commitment view plus a per-merchant authorisation block as the H2 delivery mechanism, following the merchant-level blocking path used by Revolut and Lloyds."
    approach: "Same cross-type view as M1, presenting standing orders, direct debits, and card subscriptions in one list with type labels and next-due dates. When a client initiates a stop action on a card subscription entry, the bank places a per-merchant authorisation rule that prevents future charges from that merchant against the card without blocking the full card. The action is labelled as a payment block, not a subscription cancellation. George states explicitly that the block stops the merchant charging the card but leaves the subscription account with the merchant open. The pilot tests unified visibility and the merchant-level blocking mechanism together as a paired H1 and H2 resolution. This option requires the bank to hold card scheme permission to place a per-merchant authorisation rule without a whole-card block; that permission question is not resolvable without the Banking Constraints body."
    differs_by: "Includes H2 via a merchant-level authorisation block placed at stopping time. The scheme permission question is load-bearing for this option: if the bank cannot place a per-merchant authorisation rule under its Visa or Mastercard scheme agreements, this option cannot be built as described. The mechanism follows the Revolut and Lloyds approach."
    constraints_met: []
  - id: M3
    statement: "Pilot the unified commitment view plus per-subscription virtual card credentials as the H2 delivery mechanism, following the credential revocation path used by Monzo."
    approach: "Same cross-type view as M1 and M2, presenting standing orders, direct debits, and card subscriptions in one list with type labels and next-due dates. Each identified card subscription is assigned a distinct virtual card credential at detection. When a client initiates a stop action on a card subscription entry, the bank revokes the virtual credential assigned to that subscription. The merchant's next charge attempt fails because the card number it holds no longer exists; no authorisation block rule is required and the physical card is unaffected. George states that the subscription account with the merchant remains open. The pilot tests unified visibility and credential revocation together as a paired H1 and H2 resolution. This option requires the bank's card scheme agreements to permit per-subscription virtual card issuance; that permission question is not resolvable without the Banking Constraints body."
    differs_by: "Includes H2 via credential revocation rather than a merchant-level block. The bank revokes a credential it issued, which is a unilateral bank-side action that may carry different scheme permission requirements than a blocking rule. The mechanism follows the Monzo approach. The user-facing experience and data architecture both differ from M2: credentials must be issued at subscription detection rather than at stopping time, and the client terminates a credential rather than placing a block."
    constraints_met: []
---
