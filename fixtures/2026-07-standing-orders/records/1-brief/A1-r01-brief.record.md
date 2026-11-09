---
run_id: 2026-07-standing-orders
record_id: R-A1-01
artifact_id: A1
item_id: ""
produced_at: 2026-08-23
produced_by:
  agent: product-owner
  skill: brief-creation
bounds_hit: []
trace_id: []
sources: []
external_sources: []
created_at: 2026-08-23
title: "Recurring commitment management"
product_owner: "Igor Tadic"
topic: "Retail clients of Česká spořitelna have recurring commitments leaving their account - standing orders, direct debit mandates, and card-on-file subscriptions - with no single place to view all of them. Changing or stopping a commitment differs by type, and some changes cannot be completed in the app at all."
outcome: "A retail client knows what recurring commitments are leaving their account and can change or stop any of them without calling the bank."
outcome_restatement: confirmed
restatement_proposed: "A retail client knows what recurring commitments are leaving their account and can change or stop any of them without calling the bank."
customer_segment: "Retail clients with an active current account. Not business clients, not private banking."
market_scope: "Recurring commitment management for retail bank clients, covering standing orders, direct debit mandates, and card-on-file subscriptions. Czech retail banking, with European neobanks as comparators."
goals:
  - product_goal: "a client manages a recurring commitment end to end in the app without a contact-centre touch"
    metric: "share of standing-order and direct-debit changes completed digitally with no contact-centre contact within 48 hours"
    key_result: AI-2
    strategy_basis: "Share of sales and service processes in primary digital channels that are fully straight-through (AI First, Strategy Basis §2.7, direction: increase, type: C)"
    link: "every change completed in the app is a service process that did not need a person, which is what AI-2 counts"
known_constraints:
  - "Standing orders, direct debit mandates, and card-on-file subscriptions follow different change and cancellation paths. This is a shape of the problem, not a verified bank rule."
  - "Some commitment changes cannot currently be completed in the app at all. This is stated as a problem shape and has not been confirmed against system records."
unknowns:
  - field: background
    reason: not_known
    note: "The internal trigger for opening this initiative now was not supplied and is not known to the operator. It has not been invented."
  - field: time_horizon
    reason: not_yet_available
    note: "Not decided at brief time."
  - field: metric_baseline
    reason: not_known
    note: "The current baseline for the share of digital changes completed without contact-centre contact was explicitly flagged as unavailable. No figure has been invented."
entered_at: 2026-08-23
---

# Record R-A1-01 - A1

One brief-creation invocation. Not written for a reader; the document assembled from it is 1-brief/initiative-brief.md.
