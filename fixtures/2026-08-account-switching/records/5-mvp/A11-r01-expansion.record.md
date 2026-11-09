---
run_id: 2026-08-account-switching
record_id: A11-r01
artifact_id: A11
item_id: ""
produced_at: 2026-08-27
bounds_hit: []
trace_id: []
sources: [A10, A9, A8, A7, A4, A1]
external_sources: []
constraint_basis: none_stated
option_id: OPT-A
description: "From the moment the customer grants AISP consent until the switch window closes, the app maintains a live list of standing orders and direct debits still registered at the old bank. Each item leaves the list as it transfers. When the list is empty the customer has a basis to close the old account. Card-on-file merchant credentials are excluded by payment scheme architecture and are outside the scope of any PSD2 AISP feed."
strategic_touchpoints:
  - touchpoint: "Serves LVL-2 (share of wallet, Level Up). When the mandate list reaches zero and the customer closes the old account, salary and daily spending move fully to CS. The path is one step: OPT-A resolves the visibility gap that keeps the old account open, and closing it shifts the customer's day-to-day money to CS."
    basis: "LVL-2, Strategy Basis §2.4, direction: increase, type: C"
  - touchpoint: "Serves NOM-4 (clients migrated from original channel to new digital channel). OPT-A runs entirely inside the CS app. A customer who completes the switch through the app is a client served in the digital channel, and NOM-4 measures the growth of that population."
    basis: "NOM-4, Strategy Basis §2.2, direction: increase, type: C"
  - touchpoint: "Strains AI-2 (share of sales and service processes in primary digital channels that are fully straight-through). The AISP authorisation runs inside the old bank's authentication interface, outside CS's control. That step is not straight-through in CS's own channel."
    basis: "AI-2, Strategy Basis §2.7, direction: increase, type: C"
compliance_touchpoints:
  - touchpoint: "PSD2 AISP consent requirements. Consent is the legal basis for reading the old bank's account data. Addressed in functionality by: consent is collected at switch initiation through a defined authorisation flow, the scope is limited to account information for standing orders and direct debits, and revocation removes the mandate list view with no further reads made. The Compliance Guidelines body is absent; this is indicative."
    basis: "indicative - Compliance Guidelines absent"
  - touchpoint: "Data protection for third-party account data. The mandate list contains personal financial data from another institution. Addressed in functionality by: mandate list data is displayed only to the account holder whose consent was granted, and the feature is scoped to that customer's own old-account data. The Compliance Guidelines body is absent; this is indicative."
    basis: "indicative - Compliance Guidelines absent"
analyst_input: "Four areas need specification at the requirement stage. First, the AISP consent flow: what the customer sees at initiation, what data access is requested, and what happens if consent is declined or expires before the switch window closes. Second, the mandate list data model: the fields per item, their source in the old bank's API response, and the rule for removing an item when the mandate is confirmed transferred. Third, the empty-list state and the account-closure prompt: what the app displays, what action it offers, and whether that action connects to a CS-side closure flow or directs the customer to the old bank. Fourth, the card-on-file exclusion disclosure: where and how the app states the limitation, and at which point in the consent or list view the customer sees it."
---
