---
run_id: 2026-05-corporate-coverage
record_id: R-A6-05
artifact_id: A6
item_id: "affinity.co"
produced_at: 2026-08-20
produced_by:
  agent: competitive-analysis
  skill: deep-dive
bounds_hit: []
egress_basis: pilot-test
standards_basis: "competitive-analysis-standards@0.12 read and applied. No outward research was performed; the market material for this run was written rather than gathered."
confidence_basis: "Seven sources resolving to seven independent parties, one of them the participant's own material, which is the floor of six independent parties plus one."
card:
  identity_key: affinity.co
  name: "Affinity"
  type: direct
  standing: innovator
  represents: [T3]
  researched_at: 2026-08-20
  offering: "Relationship intelligence built for private capital rather than banking, combining passive capture with a deal-oriented pipeline. It is the reference the adjacent market is measured against, it is what the venture funds in the parallel research were all using, and it is profiled here as the design baseline corporate banking has not adopted."
  segment: "Venture capital, private equity and investment banking teams. The buyer is a partner or a head of platform; the users are everyone in a small firm."
  positioning: "The relationship intelligence CRM that populates itself."
  pricing_model: "Per seat per year, reported around 2,000 USD per seat with a floor for small teams, quoted rather than published for larger ones. No implementation project in the banking sense."
  confidence: high
  features:
    - name: "Automatic capture and contact creation from mail and calendar"
      detail: "The record is created from the signal rather than entered, and a person who has been emailed exists in the system without anyone adding them."
      source: affinity-own-doc
    - name: "Relationship strength scoring with an introduction path"
      detail: "Scores who in the firm has the strongest link to a target and presents the path, which is the third question in this run asked directly."
      source: affinity-own-doc
    - name: "Deal pipeline tied to the relationship graph"
      detail: "Opportunities and the people around them are one object rather than two, so the pipeline view and the relationship view do not diverge."
      source: affinity-own-doc
    - name: "Notes and interaction history in one timeline"
      detail: "Manual notes sit beside captured activity on one timeline, so the earned context and the metadata are read together where the notes exist."
      source: affinity-own-doc
    - name: "Alerts on network changes and stale relationships"
      detail: "Surfaces when a tracked relationship goes quiet or a person moves, which drives the follow-up behaviour the product is designed around."
      source: affinity-own-doc
    - name: "Enrichment from third-party people and company data"
      detail: "Attaches external profile data to captured contacts, filling out the record without manual research."
      source: affinity-own-doc
  usps:
    - claim: "It answers all three questions in one object, which no banking participant in scope does"
      evidence: "The name, the path and the notes sit together. Every direct banking participant splits at least one of the three into a different system or leaves it out."
      source: affinity-own-doc
    - claim: "The record populates itself, so the maintenance problem that defeats banking CRMs does not arise"
      evidence: "This is the same claim the automatic-graph participant makes, and here it is coupled to a notes surface, which is the difference between a graph and an answer."
      source: affinity-own-doc
    - claim: "Built for a firm of twenty rather than a coverage organisation of two hundred, which shows in how little configuration it needs"
      evidence: "Time to value is days. The banking participants in scope are quoted in months or years, and that difference is a positioning fact rather than an implementation detail."
      source: affinity-own-doc
  strengths:
    - claim: "Present in the segment benchmark for 2026 as a participant a coverage organisation would consider."
      source: segment-benchmark-2026
  weaknesses:
    - claim: "It has no banking model at all: no facility, no exposure, no credit process, and no group entity structure for a corporate client"
      source: analyst-platform-review-2026
    - claim: "The notes are whatever a user typed, so the earned context exists only where somebody wrote it down, which the parallel research describes as roughly eighty entries against a network of thousands"
      source: analyst-platform-review-2026
    - claim: "Nothing in it addresses works council agreement, purpose limitation or the outsourcing constraints a bank faces before it can ingest anything"
      source: analyst-platform-review-2026
  not_offered: []
  sources:
    - ref: affinity-own-doc
      publisher: "Affinity, product documentation and published pricing"
      publisher_key: affinity.co
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
    - "Banking suitability": "Whether any regulated bank in Europe runs it for corporate coverage is not established and the segment benchmark does not list it."
    - "Note coverage": "What proportion of contacts carry a substantive note in a typical deployment is not published."
    - "Data residency": "Where tenant data is processed, and whether that satisfies outsourcing guidelines, is not established."
---

# Record R-A6-05 — A6

One deep-dive invocation, covering Affinity. Not written for a reader; the document assembled from it is 3-competitive-analysis/2-competitor-cards.md.
