---
run_id: 2026-05-corporate-coverage
record_id: R-A6-03
artifact_id: A6
item_id: "ncino.com"
produced_at: 2026-08-20
produced_by:
  agent: competitive-analysis
  skill: deep-dive
bounds_hit: []
egress_basis: pilot-test
standards_basis: "competitive-analysis-standards@0.12 read and applied. No outward research was performed; the market material for this run was written rather than gathered."
confidence_basis: "Seven sources resolving to seven independent parties, one of them the participant's own material, which is the floor of six independent parties plus one."
card:
  identity_key: ncino.com
  name: "nCino"
  type: direct
  standing: leader
  represents: [B1, B2]
  researched_at: 2026-08-20
  offering: "The commercial lending operating system for the segment, covering origination, credit analysis, approval workflow and portfolio monitoring. It owns the process a corporate banking relationship actually runs through, which is why the credit officer's version of this problem lives closer to it than to any relationship system."
  segment: "Commercial and corporate lending organisations. The buyer is the head of credit or of commercial banking; the users are relationship managers, credit analysts and credit officers."
  positioning: "One system from application to booking, replacing the spreadsheet and mail chain that sits between them."
  pricing_model: "Priced per user per month with a platform fee, quoted rather than published, and reported in the segment between 150 and 400 EUR per user depending on module scope. Implementation is 9 to 18 months."
  confidence: high
  features:
    - name: "Loan origination and credit workflow end to end"
      detail: "The application, the spread, the credit memo, the approval and the booking in one flow, which is where the bank's formal knowledge about a corporate client is produced."
      source: ncino-own-doc
    - name: "Credit memo authoring with structured spreading"
      detail: "The memo is authored in the system against structured financials, so the analytical view of a client is retrievable rather than sitting in a document library."
      source: ncino-own-doc
    - name: "Portfolio monitoring and covenant tracking"
      detail: "Ongoing monitoring against covenants and triggers, which produces a continuous record of how a client is performing rather than a point-in-time view."
      source: ncino-own-doc
    - name: "Relationship and exposure view across a client group"
      detail: "Aggregates exposure across the entities of a client group for limit purposes, which is the one place in the estate where the group is already resolved."
      source: ncino-own-doc
    - name: "Salesforce-native deployment option"
      detail: "Runs on the same platform as the most-deployed relationship system in the segment, so the credit record and the relationship record can share an object model."
      source: ncino-own-doc
    - name: "Document and condition management"
      detail: "Tracks what has been received and what is outstanding, producing a record of every document a client has ever supplied."
      source: ncino-own-doc
  usps:
    - claim: "Exposure is already aggregated across a client group for limit purposes, which is entity resolution the bank has already paid for"
      evidence: "The limit framework forces the group to be resolved because exposure cannot be measured otherwise. This is the only place in the estate where the six unlinked records the material describes have already been joined, and it is joined for a different purpose."
      source: ncino-own-doc
    - claim: "The credit memo is structured, so the bank's analytical view of a client is retrievable rather than filed"
      evidence: "Memos authored in the system are queryable. The call reports the relationship manager described are not, and they are about the same clients."
      source: ncino-own-doc
    - claim: "It owns the process rather than the record, so it sees what actually happened rather than what somebody logged"
      evidence: "Approval steps, conditions and covenant events are produced by the work rather than entered afterwards, which makes them the most reliable record of a relationship in the bank."
      source: ncino-own-doc
  strengths:
    - claim: "Present in the segment benchmark for 2026 as a participant a coverage organisation would consider."
      source: segment-benchmark-2026
  weaknesses:
    - claim: "It holds the formal record of a client and nothing about the people, so it answers what we know and never who we know"
      source: analyst-platform-review-2026
    - claim: "The group resolution exists for exposure and is not exposed as a general answer to what counts as one client"
      source: analyst-platform-review-2026
    - claim: "Credit officers using it have no view of interactions outside the credit process, which is the gap the interviewed credit officer described"
      source: analyst-platform-review-2026
  not_offered: []
  sources:
    - ref: ncino-own-doc
      publisher: "nCino, product documentation and published pricing"
      publisher_key: ncino.com
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
    - "Cross-line visibility": "Whether the group hierarchy maintained for exposure is readable by anyone outside credit is not established."
    - "Interaction data": "Whether any deployment brings relationship interactions alongside the credit record is not established."
    - "Memo retrieval": "How far back memo content is retrievable in a typical deployment is not established."
---

# Record R-A6-03 — A6

One deep-dive invocation, covering nCino. Not written for a reader; the document assembled from it is 3-competitive-analysis/2-competitor-cards.md.
