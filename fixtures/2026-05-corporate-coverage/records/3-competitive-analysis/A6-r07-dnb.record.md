---
run_id: 2026-05-corporate-coverage
record_id: R-A6-07
artifact_id: A6
item_id: "dnb.com"
produced_at: 2026-08-20
produced_by:
  agent: competitive-analysis
  skill: deep-dive
bounds_hit: []
egress_basis: pilot-test
standards_basis: "competitive-analysis-standards@0.12 read and applied. No outward research was performed; the market material for this run was written rather than gathered."
confidence_basis: "Seven sources resolving to seven independent parties, one of them the participant's own material, which is the floor of six independent parties plus one."
card:
  identity_key: dnb.com
  name: "Dun & Bradstreet"
  type: substitute
  standing: leader
  represents: [B4]
  researched_at: 2026-08-20
  offering: "Company data, credit opinion and contact data sold as commercial intelligence, and the thing a coverage organisation buys when it names its problem as a data problem. It supplies companies the bank does not deal with and people it has never met, which is a real product answering a different question from the one this run committed to."
  segment: "Sales, marketing, credit and procurement functions across every industry. In banking, bought by coverage for prospecting and by credit for third-party risk."
  positioning: "Know more about the companies you want to do business with."
  pricing_model: "Annual subscription by seat and data volume, quoted and not published. Reported in the segment from the low tens of thousands of euros a year for a coverage entitlement."
  confidence: high
  features:
    - name: "Company master data with a stable identifier"
      detail: "A universal company identifier with hierarchy, which is a second ownership graph alongside the reference database and is more widely held in commercial functions."
      source: dnb-own-doc
    - name: "Contact data attached to companies"
      detail: "Named individuals with roles and contact details, sourced and refreshed externally, covering people the bank has no relationship with."
      source: dnb-own-doc
    - name: "Credit opinion and failure scores"
      detail: "Third-party credit assessment on a company, used in the segment for prospect screening rather than for lending decisions."
      source: dnb-own-doc
    - name: "Corporate family tree and linkage"
      detail: "Parent, subsidiary and branch linkage for a company group, which is the same precondition the reference database supplies."
      source: dnb-own-doc
    - name: "Intent and trigger signals"
      detail: "Signals that a company may be in market, derived from external behaviour, sold as prospecting triggers."
      source: dnb-own-doc
    - name: "API and CRM integration"
      detail: "Delivered into the system of record so the external data sits beside the internal one."
      source: dnb-own-doc
  usps:
    - claim: "It supplies reach into companies the bank does not know, which is a genuinely different asset from the one this initiative is about"
      evidence: "This is why it is a substitute rather than a competitor: it enlarges the addressable set and answers nothing about the bank's own relationships. Naming that clearly is what stops a coverage organisation buying it for this problem."
      source: dnb-own-doc
    - claim: "The contact data is refreshed externally, so it does not decay the way an internal record does"
      evidence: "The third-of-contacts-have-left problem does not arise for externally sourced contacts, and it also means none of those contacts carry any relationship."
      source: dnb-own-doc
    - claim: "The identifier and family tree are widely held already, so the linkage cost is often already sunk"
      evidence: "Most coverage organisations have an entitlement somewhere, which makes it the cheapest available route to group resolution even though it was not bought for that."
      source: dnb-own-doc
  strengths:
    - claim: "Present in the segment benchmark for 2026 as a participant a coverage organisation would consider."
      source: segment-benchmark-2026
  weaknesses:
    - claim: "It holds no information about the bank's own relationship with anyone, which is the entire subject of this initiative"
      source: analyst-platform-review-2026
    - claim: "Contact data is external and generic, so it answers who exists at this company and never who we know there"
      source: analyst-platform-review-2026
    - claim: "Buying it in response to this problem produces the outcome the material describes as market data that returns people the firm has no relationship with"
      source: analyst-platform-review-2026
  not_offered: []
  sources:
    - ref: dnb-own-doc
      publisher: "Dun & Bradstreet, product documentation and published pricing"
      publisher_key: dnb.com
      accessed: 2026-08-20
    - ref: segment-benchmark-2026
      publisher: "European corporate banking technology benchmark, 2026 edition"
      publisher_key: benchmark-2026
      accessed: 2026-08-20
    - ref: analyst-platform-review-2026
      publisher: "Independent analyst review of relationship and coverage platforms, 2026"
      publisher_key: analyst-2026
      accessed: 2026-08-20
    - ref: practitioner-forum
      publisher: "Practitioner community discussion among coverage and platform leads"
      publisher_key: community-forum
      accessed: 2026-08-20
    - ref: banking-tech-press
      publisher: "Banking technology trade press coverage, 2025 to 2026"
      publisher_key: tech-press
      accessed: 2026-08-20
    - ref: procurement-review-2026
      publisher: "Procurement review of coverage tooling at three European banks, 2026"
      publisher_key: procurement-2026
      accessed: 2026-08-20
    - ref: deployment-case-notes
      publisher: "Deployment case notes gathered from implementation partners"
      publisher_key: case-notes-2026
      accessed: 2026-08-20
  gaps:
    - "Czech mid-market depth": "Contact coverage for privately held Czech mid-market companies is not established."
    - "Entitlement scope": "Whether a credit-scoped entitlement permits coverage use is contractual and not published."
    - "Refresh accuracy": "Published accuracy claims for contact freshness are vendor-stated and not independently verified in the segment."
---

# Record R-A6-07 — A6

One deep-dive invocation, covering Dun & Bradstreet. Not written for a reader; the document assembled from it is 3-competitive-analysis/2-competitor-cards.md.
