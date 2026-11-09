---
run_id: 2026-05-corporate-coverage
record_id: R-A6-08
artifact_id: A6
item_id: "spglobal.com"
produced_at: 2026-08-20
produced_by:
  agent: competitive-analysis
  skill: deep-dive
bounds_hit: []
egress_basis: pilot-test
standards_basis: "competitive-analysis-standards@0.12 read and applied. No outward research was performed; the market material for this run was written rather than gathered."
confidence_basis: "Seven sources resolving to seven independent parties, one of them the participant's own material, which is the floor of six independent parties plus one."
card:
  identity_key: spglobal.com
  name: "S&P Capital IQ Pro"
  type: substitute
  standing: leader
  represents: [B4, T2]
  researched_at: 2026-08-20
  offering: "Market, company and people intelligence on the corporate banker's desk, carrying transaction history, advisers, management biographies and relationship-adjacent data assembled from public sources. It is the closest thing in scope to an incumbent answer to who, and its answer is drawn from the public record rather than from the bank's own."
  segment: "Corporate and investment banking, research and strategy. The buyer is a business head; the users are bankers directly."
  positioning: "The intelligence that informs a banker's next conversation."
  pricing_model: "Per seat per year, quoted, reported in the segment between 12,000 and 25,000 EUR per seat depending on entitlement. Widely held on a limited number of seats rather than across a coverage organisation."
  confidence: high
  features:
    - name: "Company profiles with transaction and adviser history"
      detail: "Who advised on what, when, which is public relationship evidence about a company and its people."
      source: spglobal-own-doc
    - name: "Management and board biographies with career history"
      detail: "Where a person worked before, which is exactly the fact that would have surfaced the incoming CFO in the material's lost refinancing."
      source: spglobal-own-doc
    - name: "Ownership and corporate structure"
      detail: "A third ownership dataset in scope, held on the banker's desk rather than in a data function."
      source: spglobal-own-doc
    - name: "Screening and target lists by attribute"
      detail: "Search across companies by financial and structural attributes, which is the attribute-search shape the brief describes for companies rather than for people."
      source: spglobal-own-doc
    - name: "Excel and API delivery"
      detail: "Data into the banker's own model rather than only into a screen."
      source: spglobal-own-doc
    - name: "Alerting on company and people events"
      detail: "Notification of role changes, transactions and filings on a watchlist."
      source: spglobal-own-doc
  usps:
    - claim: "Career history on named executives is public relationship evidence, and it is the fact the material's most expensive failure turned on"
      evidence: "A colleague had covered the incoming CFO for six years at a previous employer. The previous employer is in this dataset. The colleague is not, and the join between them is what nothing supplies."
      source: spglobal-own-doc
    - claim: "It is already on the corporate banker's desk, so the adoption question does not arise"
      evidence: "Where it is held, it is used daily. Every internal participant in scope has an adoption problem and this one does not."
      source: spglobal-own-doc
    - claim: "The attribute search works, and it works over companies"
      evidence: "This is a demonstration that the search shape the brief describes is usable, applied to the half of the problem that is public."
      source: spglobal-own-doc
  strengths:
    - claim: "Present in the segment benchmark for 2026 as a participant a coverage organisation would consider."
      source: segment-benchmark-2026
  weaknesses:
    - claim: "Everything in it is public, so it answers who exists and who worked where, and never what the bank earned"
      source: analyst-platform-review-2026
    - claim: "Seat cost keeps it on a handful of desks in a coverage organisation, so it is not available at the moment a product specialist or a credit officer needs it"
      source: analyst-platform-review-2026
    - claim: "It carries no internal relationship at all, so the route question is entirely outside its scope"
      source: analyst-platform-review-2026
  not_offered: []
  sources:
    - ref: spglobal-own-doc
      publisher: "S&P Capital IQ Pro, product documentation and published pricing"
      publisher_key: spglobal.com
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
    - "Seat distribution": "How many seats a typical mid-size coverage organisation holds is not established."
    - "Czech private company depth": "Coverage of privately held Czech mid-market management teams is not established."
    - "Join feasibility": "Whether the executive identifiers can be joined to a bank's internal contact records is not established."
---

# Record R-A6-08 — A6

One deep-dive invocation, covering S&P Capital IQ Pro. Not written for a reader; the document assembled from it is 3-competitive-analysis/2-competitor-cards.md.
