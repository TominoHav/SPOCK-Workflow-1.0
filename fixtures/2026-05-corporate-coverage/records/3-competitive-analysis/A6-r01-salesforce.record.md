---
run_id: 2026-05-corporate-coverage
record_id: R-A6-01
artifact_id: A6
item_id: "salesforce.com"
produced_at: 2026-08-20
produced_by:
  agent: competitive-analysis
  skill: deep-dive
bounds_hit: []
egress_basis: pilot-test
standards_basis: "competitive-analysis-standards@0.12 read and applied. No outward research was performed; the market material for this run was written rather than gathered."
confidence_basis: "Seven sources resolving to seven independent parties, one of them the participant's own material, which is the floor of six independent parties plus one."
card:
  identity_key: salesforce.com
  name: "Salesforce Financial Services Cloud"
  type: direct
  standing: leader
  represents: [B2, T3]
  researched_at: 2026-08-20
  offering: "The relationship system of record for a coverage organisation, sold as an industry cloud on top of the general platform. It models a corporate client as an Account with related Contacts, Opportunities and Activities, adds banking objects for facilities and products, and surfaces an interaction timeline per Account. Deployment in the segment is near-universal at the largest banks and common below them, and it is the system every interview in this run either named or described the behaviour of."
  segment: "Coverage organisations of any size, sold per seat with a banking-specific edition. The buyer is the segment head or the COO of coverage; the user is the relationship manager and, increasingly, the product specialist."
  positioning: "The single view of the client, with the industry model already built so a bank configures rather than constructs."
  pricing_model: "Per user per month, published list around 300 EUR for the Financial Services Cloud edition with the enterprise platform underneath, before implementation. Implementation at a mid-size bank is quoted in the segment at 12 to 30 months of partner work and is not published. No usage or consumption component for the relationship objects; the AI features carry separate consumption pricing."
  confidence: high
  features:
    - name: "Account and contact model with a banking object layer"
      detail: "A corporate client is an Account, its people are Contacts, and banking objects for facilities, products and financial accounts hang off it. This is what makes the client record navigable at all, and it is also where the group problem starts: a legal entity is an Account, so a client group is several Accounts related to each other only if somebody related them."
      source: salesforce-own-doc
    - name: "Interaction timeline per account"
      detail: "Activities logged against an Account produce a chronological timeline: emails, calls, meetings and tasks, each with a date, a subject and an owner. What the timeline carries is the fact and the metadata of the interaction rather than its content, which is precisely the behaviour the relationship manager in this run described as eleven interactions and no idea what happened in them."
      source: salesforce-own-doc
    - name: "Einstein Activity Capture from mail and calendar"
      detail: "Connects a user's mailbox and calendar and writes matching activity onto the Account automatically, removing the manual logging step. It captures who met whom and when, and by design does not capture what was said."
      source: salesforce-own-doc
    - name: "Relationship groups and household or group modelling"
      detail: "Explicit modelling of a set of related parties as a group, so a corporate family or a household can be treated as one subject. It is a configuration rather than a default, and the relationships have to be asserted by somebody."
      source: salesforce-own-doc
    - name: "Referral object and routing between business lines"
      detail: "A structured referral from one banker to another, with an owner, a status and a reason, so a cross-line introduction is a record rather than an email. It routes the request and carries no context about the target beyond what the referrer types."
      source: salesforce-own-doc
    - name: "Einstein relationship and next-best-action surfacing"
      detail: "Model-generated suggestions on an Account, presented in the record page as a next best action, trained on activity and opportunity history within the tenant. The suggestion carries a rank and does not carry the evidence that produced it."
      source: salesforce-own-doc
    - name: "Data Cloud ingestion of external and unstructured sources"
      detail: "An ingestion layer that brings other systems into the same tenant and resolves them onto the Account, sold separately and licensed by consumption. It is where a bank would put call reports and meeting notes if it wanted them retrievable beside the record."
      source: salesforce-own-doc
  usps:
    - claim: "The industry model is already built, so a bank configures a banking data model rather than designing one"
      evidence: "The Financial Services Cloud edition ships the banking object layer described above, which is the difference between a twelve-month and a thirty-month implementation in this segment. Every other direct participant either assumes the model or sells a narrower one."
      source: salesforce-own-doc
    - claim: "Activity capture removes the manual logging step that every relationship system before it depended on"
      evidence: "Einstein Activity Capture writes mail and calendar activity onto the record automatically. The relationship manager interviewed for this run described a CRM nobody maintains; automatic capture is the direct answer to that and it is why the interaction counts in her system were accurate while their content was empty."
      source: salesforce-own-doc
    - claim: "One tenant for the record, the ingestion and the model, so a bank does not integrate three vendors to get one answer"
      evidence: "Data Cloud, the banking object layer and Einstein sit in the same tenant with the same identity and permission model. Introhive and Affinity both attach to a system of record rather than being one."
      source: salesforce-own-doc
  strengths:
    - claim: "Present in the segment benchmark for 2026 as a participant a coverage organisation would consider."
      source: segment-benchmark-2026
  weaknesses:
    - claim: "The interaction record holds metadata and not content, so a name arrives with a count and a date and nothing that decides how to approach"
      source: analyst-platform-review-2026
    - claim: "A client group is several Accounts unless somebody has related them, and nothing forces that, so the entity problem the material describes is reproduced rather than solved"
      source: analyst-platform-review-2026
    - claim: "Einstein suggestions carry a rank and not the evidence behind them, which is the shape all three interviewed users said they would not act on"
      source: analyst-platform-review-2026
  not_offered: []
  sources:
    - ref: salesforce-own-doc
      publisher: "Salesforce Financial Services Cloud, product documentation and published pricing"
      publisher_key: salesforce.com
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
    - "Content of interactions": "Whether any deployment in this segment routes meeting or call content into the Account record rather than metadata alone is not established. The capability exists through the ingestion layer and no deployment confirms using it for this."
    - "Group resolution in practice": "How many banks in the segment maintain the group relationships that make a client family one subject is not established, and the material suggests the answer is few."
    - "Implementation cost": "Partner implementation cost at a mid-size bank is quoted in ranges by practitioners and published by nobody."
---

# Record R-A6-01 — A6

One deep-dive invocation, covering Salesforce Financial Services Cloud. Not written for a reader; the document assembled from it is 3-competitive-analysis/2-competitor-cards.md.
