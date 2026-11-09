---
run_id: 2026-09-savings-goals
record_id: R-A1-01
artifact_id: A1
item_id: ""
produced_at: 2026-08-28
bounds_hit: []
trace_id: []
sources: []
external_sources: []
language: en
title: "Goal-based saving"
product_manager: "Igor Tadic"
topic: "Saving towards a named goal from a current account"
outcome: "A current-account client who wants to save for something specific puts money aside for it and can see how close they are"
customer_segment: "Retail clients aged 25 to 45 with a current account and an active mobile app, who hold no separate savings product"
market_scope: "Goal-based saving and automated set-aside for retail clients. Czech retail banking"
known_constraints: "No new deposit product may be created for the pilot. The set-aside has to sit inside the existing current account"
background: "The savings team reports that clients open a savings account and then leave it empty. Nobody holds the number behind that"
time_horizon: "Readable three months after launch"
goals:
  - product_goal: "A client who names a goal puts money towards it and keeps doing so"
    metric: "Share of clients who set a goal and make at least three set-asides within ninety days"
    key_result: LVL-2
    link: "A client saving towards a goal inside their current account holds more of their money with this bank rather than moving it elsewhere. Share of wallet rises because the account stops being purely a through-account"
unknowns:
  - field: success_signal
    reason: not_known
  - field: qualitative_signal
    reason: not_known
screening_inputs:
  - input: product_description
    value: "A named savings goal inside the mobile app, funded by manual transfers and by an optional automatic set-aside, shown as progress towards an amount the client chooses"
  - input: product_type
    value: "Not an investment, insurance or credit product. It is a feature over a payment account"
  - input: bank_role
    value: "The bank is both manufacturer and distributor; the feature runs in its own app"
  - input: target_users
    value: "Retail clients aged 25 to 45 with a current account and an active mobile app"
  - input: target_market
    value: "Czech retail banking. Not offered to business clients"
  - input: distribution_model
    value: "The bank's own channels, no intermediary"
  - input: channels
    value: "Mobile app, secondarily internet banking"
  - input: client_journey
    value: "The client names a goal and an amount, chooses whether to set money aside automatically, and returns to see progress. Money can be taken back at any time"
  - input: digital_interfaces
    value: "A goal creation screen, a progress screen, a set-aside settings screen. Existing sign-in, no new authentication"
  - input: client_communication
    value: "In-app text and a push message when a goal is reached. No new contractual documentation"
  - input: pricing_and_fees
    value: "No fee. Pricing and remuneration do not change"
  - input: advice_involvement
    value: "Nothing is recommended and the client is steered nowhere. The goal and the amount are the client's own"
  - input: suitability_implications
    value: "None. It is not a product whose suitability for a client is assessed"
  - input: sustainability_claims
    value: "None"
  - input: personal_data_processed
    value: "Current-account balance and transaction history, plus the goal name and amount the client types"
  - input: data_subject_categories
    value: "Bank clients only. No third parties and no non-clients"
  - input: personal_data_categories
    value: "Financial data, account identifiers, and free text the client writes as a goal name"
  - input: special_category_data
    value: "None is asked for. A client could type one into a goal name, which is why the name is never used for anything but display"
  - input: processing_purposes
    value: "Calculating and displaying progress towards a goal, and executing the automatic set-aside the client switched on"
  - input: lawful_basis
    value: "Performance of the account contract for the set-aside itself; legitimate interest for the progress calculation"
  - input: data_source
    value: "The bank's own account records and what the client types"
  - input: data_recipients
    value: "Nobody outside the bank. No supplier is involved"
  - input: profiling_or_automated_decisions
    value: "The automatic set-aside runs on a rule the client sets. Nothing is inferred about the client and no decision is made about them"
  - input: marketing_and_tracking
    value: "None in the pilot"
  - input: dpia_status
    value: "Not started"
  - input: rights_route
    value: "The bank's existing route for data subject requests. The pilot adds none"
  - input: agreement_capture
    value: "The client switches the automatic set-aside on inside the app. No signature and no new agreement"
  - input: contract_terms_affected
    value: "None. The set-aside is a transfer between the client's own money within one account"
  - input: precontractual_documents
    value: "None"
  - input: withdrawal_and_termination
    value: "The client can delete a goal or switch off the set-aside at any time, and the money is theirs throughout"
  - input: countries_offered
    value: "Czech Republic only"
  - input: third_parties
    value: "None"
  - input: complaints_and_disputes
    value: "The bank's existing complaints route"
  - input: fraud_exposure
    value: "No new payment leaves the bank, so no new fraud surface is created"
  - input: registered_under_cyber_regime
    value: "The bank is a regulated financial entity under DORA. The pilot adds no new external dependency"
  - input: systems_affected
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — declared knowable only once solution options exist. Not asked at framing."
  - input: critical_or_important_function
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — declared knowable only once solution options exist. Not asked at framing."
  - input: hosting_and_data_location
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — declared knowable only once solution options exist. Not asked at framing."
  - input: processors_and_subprocessors
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — declared knowable only once solution options exist. Not asked at framing."
  - input: retention_periods
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — declared knowable only once solution options exist. Not asked at framing."
  - input: security_measures
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — declared knowable only once solution options exist. Not asked at framing."
  - input: data_at_rest_and_in_transit
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — declared knowable only once solution options exist. Not asked at framing."
  - input: components_and_libraries
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — declared knowable only once solution options exist. Not asked at framing."
  - input: release_and_environment
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — declared knowable only once solution options exist. Not asked at framing."
  - input: recovery_expectations
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — declared knowable only once solution options exist. Not asked at framing."
  - input: controls_and_monitoring
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — declared knowable only once solution options exist. Not asked at framing."
  - input: content_brand_and_software
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — declared knowable only once solution options exist. Not asked at framing."
---

# Record R-A1-01 — A1

One production. The document assembled from it is 1-brief/1-initiative-brief.md.
