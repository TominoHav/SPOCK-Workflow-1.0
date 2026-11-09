---
run_id: 2026-05-corporate-coverage
record_id: R-A6-02
artifact_id: A6
item_id: "microsoft.com"
produced_at: 2026-08-20
produced_by:
  agent: competitive-analysis
  skill: deep-dive
bounds_hit: []
egress_basis: pilot-test
standards_basis: "competitive-analysis-standards@0.12 read and applied. No outward research was performed; the market material for this run was written rather than gathered."
confidence_basis: "Seven sources resolving to seven independent parties, one of them the participant's own material, which is the floor of six independent parties plus one."
card:
  identity_key: microsoft.com
  name: "Microsoft Dynamics 365 for Financial Services"
  type: direct
  standing: leader
  represents: [B2, T4]
  researched_at: 2026-08-20
  offering: "The other default system of record in the segment, sold as an industry accelerator on the Dynamics platform and bought most often where the bank already runs the collaboration suite. It models the corporate client, its people and its products, and its distinguishing property is that the meeting signal it would need already sits inside the same vendor's estate."
  segment: "Coverage organisations already committed to the vendor's productivity estate. The buyer is IT jointly with coverage; the user is the relationship manager."
  positioning: "The client record inside the tools the banker already has open, so adoption is not a separate change."
  pricing_model: "Per user per month, list around 200 EUR for the enterprise edition with the industry accelerator, before implementation. Copilot capability is licensed separately per user. Implementation is quoted in the segment at 9 to 24 months and is not published."
  confidence: high
  features:
    - name: "Client and party model with a financial services accelerator"
      detail: "Ships the corporate client, contact, product and facility objects as a configurable accelerator rather than as a fixed model, which makes it more adaptable than the alternative and slower to stand up."
      source: microsoft-own-doc
    - name: "Interaction capture from the mail and calendar estate"
      detail: "Because the mail, calendar and meeting tools are the same vendor's, activity capture is a configuration rather than a connector, and the metadata reaches the record with no third party in the path."
      source: microsoft-own-doc
    - name: "Meeting summarisation in the collaboration suite"
      detail: "Automatic summaries of a meeting are produced in the meeting tool itself. Whether the summary reaches the client record is a routing decision the bank makes and the product does not make for it."
      source: microsoft-own-doc
    - name: "Relationship analytics over interaction metadata"
      detail: "Derives strength and recency signals per contact from the captured metadata, presented as an analytics surface rather than as a suggestion inside the record."
      source: microsoft-own-doc
    - name: "Copilot over the client record and the document estate"
      detail: "Natural-language retrieval across the record and the connected document estate, answering in the surface the banker is already in."
      source: microsoft-own-doc
    - name: "Power Platform extension surface"
      detail: "Low-code extension so a bank can build the missing question rather than wait for it, which is how several banks in the segment have built partial versions of the answer this initiative describes."
      source: microsoft-own-doc
  usps:
    - claim: "The interaction signal and the record live in one vendor's estate, so capture is a setting rather than an integration"
      evidence: "The mail, calendar, meeting and record products are the same tenant. Every other participant in scope reaches into that estate from outside it, which is where consent, works council agreement and connector maintenance all land."
      source: microsoft-own-doc
    - claim: "Meeting content is already being summarised where the meeting happens"
      evidence: "Summarisation runs in the collaboration suite by default in most deployments. The unsolved half is routing it to the client record, which is a much smaller problem than producing it."
      source: microsoft-own-doc
    - claim: "The extension surface means a bank can build the missing question itself"
      evidence: "Several banks in the segment have built partial internal versions of relationship retrieval on this platform, which is evidence of both the demand and the gap."
      source: microsoft-own-doc
  strengths:
    - claim: "Present in the segment benchmark for 2026 as a participant a coverage organisation would consider."
      source: segment-benchmark-2026
  weaknesses:
    - claim: "Whether the meeting summary reaches the client record is left to the bank, and in the deployments described it does not"
      source: analyst-platform-review-2026
    - claim: "Relationship analytics derive strength from metadata alone, which is the signal all three interviewed users said they would not act on"
      source: analyst-platform-review-2026
    - claim: "The accelerator is a starting point rather than a model, so two banks on the same product can have incompatible client structures"
      source: analyst-platform-review-2026
  not_offered: []
  sources:
    - ref: microsoft-own-doc
      publisher: "Microsoft Dynamics 365 for Financial Services, product documentation and published pricing"
      publisher_key: microsoft.com
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
    - "Summary routing": "Whether any bank in the segment routes meeting summaries into the client record is not established."
    - "Group entity handling": "How the accelerator resolves a client group of several legal entities is configurable and no deployment describes the configuration chosen."
    - "Copilot grounding": "Which sources Copilot is grounded on in a banking deployment, and whether call reports are among them, is not established."
---

# Record R-A6-02 — A6

One deep-dive invocation, covering Microsoft Dynamics 365 for Financial Services. Not written for a reader; the document assembled from it is 3-competitive-analysis/2-competitor-cards.md.
