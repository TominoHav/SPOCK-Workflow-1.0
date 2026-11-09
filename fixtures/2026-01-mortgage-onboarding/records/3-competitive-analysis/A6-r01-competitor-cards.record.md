---
run_id: 2026-01-mortgage-onboarding
record_id: R-A6-01
artifact_id: A6
item_id: ""
produced_by:
  agent: competitive-analysis
  skill: deep-dive
produced_at: 2026-08-09
confidence_basis: derived
cards:
  - identity_key: hypobank.cz
    name: HypoBank
    type: direct
    researched_at: 2026-08-09
    offering: "End-to-end mortgage with an assisted-digital onboarding"
    segment: "First-time buyers and movers"
    positioning: "The safe incumbent — trusted, thorough, slow"
    pricing_model: "Rate plus an origination fee, fee waived in branch campaigns"
    strengths:
      - "Brand trust with first-time buyers"
      - "Advisor network that can hand-hold a nervous first purchase"
    weaknesses:
      - "Onboarding still requires a branch visit to complete identity"
      - "Document upload is email, not in-flow"
    sources:
      - ref: E3
        publisher: "HypoBank"
        publisher_key: hypobank.cz
        accessed: 2026-08-09
      - ref: E1
        publisher: "HypoBank product pages"
        publisher_key: hypobank.cz
        accessed: 2026-08-09
      - ref: E6
        publisher: "Czech retail banking digital-onboarding review"
        publisher_key: pub:cz-onboarding-review
        accessed: 2026-08-10
    gaps:
      - "Actual time-to-approval not published"
    confidence: medium
  - identity_key: mbank.cz
    name: mBank CZ
    type: direct
    researched_at: 2026-08-09
    offering: "Fully digital mortgage origination"
    segment: "Digital-first buyers"
    positioning: "The fast challenger — self-service, no branch"
    pricing_model: "Rate-only, no origination fee, higher rate band"
    strengths:
      - "Identity and income verification fully in-flow"
      - "Instant indicative decision"
    weaknesses:
      - "No human advisor path for a first-time buyer who stalls"
      - "Narrow eligibility — declines complex incomes"
    sources:
      - ref: E4
        publisher: "mBank CZ"
        publisher_key: mbank.cz
        accessed: 2026-08-09
      - ref: E2
        publisher: "Fintech mortgage aggregator"
        publisher_key: pub:fintech-aggregator
        accessed: 2026-08-09
    gaps:
      - "Drop-off rate at income verification not disclosed"
    confidence: medium
  - identity_key: adjacent:broker-networks
    name: Independent broker networks
    type: adjacent
    researched_at: 2026-08-09
    offering: "Advice plus placement across multiple lenders"
    segment: "First-time buyers who want a guide"
    positioning: "The trusted intermediary — owns the relationship before the bank"
    pricing_model: "Commission from the lender, free to the buyer at point of use"
    strengths:
      - "Owns the first-time-buyer relationship early"
      - "Comparison across lenders the buyer trusts"
    weaknesses:
      - "No control of the downstream onboarding once a lender is chosen"
    sources:
      - ref: E5
        publisher: "Comparison portal"
        publisher_key: pub:comparison-portal
        accessed: 2026-08-09
      - ref: E2
        publisher: "Fintech mortgage aggregator"
        publisher_key: pub:fintech-aggregator
        accessed: 2026-08-09
    gaps:
      - "Share of first-time-buyer originations they intermediate not established"
    confidence: low
---

# Record R-A6-01 — A6

One production. Not written for a reader; the document assembled from it is 3-competitive-analysis/2-competitor-cards.md.
