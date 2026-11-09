---
run_id: 2026-05-corporate-coverage
record_id: R-A6-06
artifact_id: A6
item_id: "moodys.com"
produced_at: 2026-08-20
produced_by:
  agent: competitive-analysis
  skill: deep-dive
bounds_hit: []
egress_basis: pilot-test
standards_basis: "competitive-analysis-standards@0.12 read and applied. No outward research was performed; the market material for this run was written rather than gathered."
confidence_basis: "Seven sources resolving to seven independent parties, one of them the participant's own material, which is the floor of six independent parties plus one."
card:
  identity_key: moodys.com
  name: "Moody's Orbis and Bureau van Dijk"
  type: adjacent
  standing: leader
  represents: [B4, T2]
  researched_at: 2026-08-20
  offering: "The reference database of company information and, more importantly for this initiative, of corporate ownership and group structure. It holds the linkages that say which legal entities belong to one economic group, which is the precondition for answering any question about a client rather than about a record."
  segment: "Credit, compliance, KYC and research functions across banking. The buyer is a data or risk function; the users are analysts rather than coverage."
  positioning: "The most comprehensive picture of who owns whom, worldwide."
  pricing_model: "Annual subscription by seat band and data scope, quoted and not published. Reported in the segment in the tens of thousands of euros a year for a coverage-sized entitlement, with API access priced separately."
  confidence: high
  features:
    - name: "Corporate ownership and group structure data"
      detail: "Ultimate and direct ownership linkages across jurisdictions, which is the data that turns six unlinked records into one client group."
      source: moodys-own-doc
    - name: "Entity identifiers and cross-reference to other schemes"
      detail: "Stable identifiers with mappings to national registers and to the legal entity identifier, so a bank can join its own records to something outside them."
      source: moodys-own-doc
    - name: "Company financials and standardised accounts"
      detail: "Standardised financial data across jurisdictions, which is what the credit process consumes."
      source: moodys-own-doc
    - name: "Director and officer records per entity"
      detail: "Named individuals attached to entities with roles and dates, which is a people dataset attached to companies rather than to the bank's relationships."
      source: moodys-own-doc
    - name: "API and bulk delivery for internal joining"
      detail: "Programmatic access so a bank can resolve its own client records against the ownership graph inside its own estate."
      source: moodys-own-doc
    - name: "Screening and adverse media adjacency"
      detail: "Related products cover sanctions and adverse media on the same entity model, which is how most banks already have the entitlement."
      source: moodys-own-doc
  usps:
    - claim: "It holds the ownership graph, which is the one dataset that makes a group answerable as one subject"
      evidence: "Every participant in scope that needs to resolve a client group either buys this or builds a worse version of it. The material's six-unlinked-records problem is solved by this data and by nothing else in the landscape."
      source: moodys-own-doc
    - claim: "The identifiers are stable and cross-referenced, so a bank can join its own record to the outside world once rather than per system"
      evidence: "This is what makes the resolution reusable across the estate rather than per application."
      source: moodys-own-doc
    - claim: "Most banks in the segment already hold an entitlement for compliance purposes"
      evidence: "The data is often already in the building, bought for KYC, and not exposed to coverage. That is a licensing and plumbing question rather than a procurement one."
      source: moodys-own-doc
  strengths:
    - claim: "Present in the segment benchmark for 2026 as a participant a coverage organisation would consider."
      source: segment-benchmark-2026
  weaknesses:
    - claim: "It knows nothing about a bank's relationships and never claims to: it supplies the structure of the world and not the bank's position in it"
      source: analyst-platform-review-2026
    - claim: "The people it carries are directors and officers on a register, which is a different set from the people a bank actually deals with"
      source: analyst-platform-review-2026
    - claim: "Entitlements are usually held by compliance and scoped to compliance use, so coverage cannot use the data the bank has already bought without a purpose assessment"
      source: analyst-platform-review-2026
  not_offered: []
  sources:
    - ref: moodys-own-doc
      publisher: "Moody's Orbis and Bureau van Dijk, product documentation and published pricing"
      publisher_key: moodys.com
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
    - "Entitlement reuse": "Whether a compliance entitlement can be extended to a coverage use case without a new licence is not established and is likely to be contractual."
    - "Czech coverage depth": "How completely the ownership graph covers privately held Czech mid-market groups is not established."
    - "Refresh cadence": "How quickly an ownership change is reflected is not published per market."
---

# Record R-A6-06 — A6

One deep-dive invocation, covering Moody's Orbis and Bureau van Dijk. Not written for a reader; the document assembled from it is 3-competitive-analysis/2-competitor-cards.md.
