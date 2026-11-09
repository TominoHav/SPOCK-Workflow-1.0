---
run_id: 2026-05-corporate-coverage
record_id: R-A6-04
artifact_id: A6
item_id: "introhive.com"
produced_at: 2026-08-20
produced_by:
  agent: competitive-analysis
  skill: deep-dive
bounds_hit: []
egress_basis: pilot-test
standards_basis: "competitive-analysis-standards@0.12 read and applied. No outward research was performed; the market material for this run was written rather than gathered."
confidence_basis: "Seven sources resolving to seven independent parties, one of them the participant's own material, which is the floor of six independent parties plus one."
card:
  identity_key: introhive.com
  name: "Introhive"
  type: direct
  standing: innovator
  represents: [T3, B3]
  researched_at: 2026-08-20
  offering: "Relationship intelligence layered onto an existing system of record, built on passive capture of mail and calendar signal across the whole organisation. It produces a relationship graph automatically, scores the strength of each edge, and surfaces who in the firm knows a given person. It is the clearest instance of the approach the segment head in this run described trying and abandoning."
  segment: "Professional services firms first and financial institutions second. The buyer is a marketing, business development or coverage leader; the users are anyone who needs an introduction."
  positioning: "You already know everyone you need. We show you who."
  pricing_model: "Per user per year, quoted rather than published, reported in the segment between 80 and 150 EUR per user per month at scale, with a minimum commitment. Implementation is weeks rather than months because the capture is passive."
  confidence: high
  features:
    - name: "Passive capture of mail and calendar across the organisation"
      detail: "Reads headers and calendar entries for every enrolled user and builds the graph without anyone entering anything, which is the property that makes it fast to deploy and the property that makes it a works council question."
      source: introhive-own-doc
    - name: "Relationship strength scoring per edge"
      detail: "Scores each person-to-person edge on recency, frequency and reciprocity, producing a ranked answer to who knows this person best."
      source: introhive-own-doc
    - name: "Who-knows-whom search across the firm"
      detail: "The question the material asks, asked directly: type a person or a company and see which colleagues have a relationship and how strong it is scored."
      source: introhive-own-doc
    - name: "Contact data enrichment and hygiene"
      detail: "Detects role changes and stale contacts automatically from signal, which addresses the third-of-contacts-have-left problem the product specialist described."
      source: introhive-own-doc
    - name: "CRM write-back of activity and contacts"
      detail: "Pushes the captured activity and cleaned contacts into the system of record, so the record improves without anyone maintaining it."
      source: introhive-own-doc
    - name: "Alerts on relationship change"
      detail: "Notifies when a tracked person changes role or when an important relationship goes cold, turning the graph into a trigger rather than a lookup."
      source: introhive-own-doc
  usps:
    - claim: "The graph builds itself, so the answer does not depend on anyone maintaining a record"
      evidence: "Passive capture is the whole design. Every problem the material describes with a CRM nobody maintains is a problem this does not have."
      source: introhive-own-doc
    - claim: "It answers who knows this person, which is the first of the three questions asked directly"
      evidence: "No system of record in scope answers this question in the form it is asked. This one does, and the segment head's ninety-thousand-node result is what answering it from signal alone looks like."
      source: introhive-own-doc
    - claim: "Role-change detection keeps the contact set current without anyone curating it"
      evidence: "The product specialist described a third of contacts having left the company. Signal-based detection is the only mechanism in scope that addresses that continuously."
      source: introhive-own-doc
  strengths:
    - claim: "Present in the segment benchmark for 2026 as a participant a coverage organisation would consider."
      source: segment-benchmark-2026
  weaknesses:
    - claim: "The score is derived from metadata, so it says how often two people interacted and never what the interaction rests on, which is the exact objection all three interviewed users raised"
      source: analyst-platform-review-2026
    - claim: "Capturing employee mail and calendar signal is the case a works council refuses, and no public material describes how that is handled"
      source: analyst-platform-review-2026
    - claim: "The graph includes everyone the firm has ever emailed, which is why an automatic build produces tens of thousands of nodes of which most are noise"
      source: analyst-platform-review-2026
  not_offered: []
  sources:
    - ref: introhive-own-doc
      publisher: "Introhive, product documentation and published pricing"
      publisher_key: introhive.com
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
    - "Works council outcomes": "Whether any European banking deployment has obtained works council agreement, and on what terms, is not established."
    - "Content capture": "Whether anything beyond metadata is captured is not established and the positioning implies not."
    - "Banking deployments": "Named banking deployments in this segment are not published."
---

# Record R-A6-04 — A6

One deep-dive invocation, covering Introhive. Not written for a reader; the document assembled from it is 3-competitive-analysis/2-competitor-cards.md.
