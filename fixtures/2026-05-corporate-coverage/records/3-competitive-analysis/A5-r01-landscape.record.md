---
run_id: 2026-05-corporate-coverage
record_id: R-A5-01
artifact_id: A5
item_id: ""
produced_at: 2026-08-20
produced_by:
  agent: competitive-analysis
  skill: landscape-mapping
bounds_hit: []
topic: "Relationship intelligence for corporate and commercial banking coverage"
scope_field: "Corporate and commercial banking coverage, Czech Republic first with European peer banks in scope"
trends:
  - id: B1
    class: business
    name: "Coverage headcount flat while corporate books grow"
    impact: high
    horizon: short
    lifecycle: growing
    description: "Corporate lending books across the segment grew through 2024 and 2025 while coverage headcount did not, so the number of named clients per relationship manager rose from the mid-twenties toward the high fifties. The constraint on a bank's reach stopped being how many clients it has and became how many a person can attend to."
    evidence: "segment-benchmark-2026"
    implication: "Any answer that still costs a relationship manager time to produce makes the constraint worse rather than better, which is what the brief's third known constraint already says."
  - id: B2
    class: business
    name: "Cross-sell targets set against a book nobody can search"
    impact: high
    horizon: short
    lifecycle: growing
    description: "Product penetration targets are now set per segment and reported monthly at most banks in scope, while the underlying question a specialist has to answer, which names in this book fit this product and who can open the door, is answered from memory and from asking colleagues."
    evidence: "segment-benchmark-2026"
    implication: "Bears directly on H3: the target exists, the instrument to hit it does not, and the gap is absorbed by the specialist's week."
  - id: B3
    class: business
    name: "Relationship continuity treated as a retention risk rather than a data one"
    impact: high
    horizon: medium
    lifecycle: emerging
    description: "Banks in the segment have begun to report portfolio attrition following a relationship manager departure as a named risk in operational risk registers, having previously treated it as ordinary turnover. The framing has moved and the instrumentation has not."
    evidence: "risk-register-practice-2026"
    implication: "Bears on H4. A risk that is registered and not measured creates demand for exactly the record nothing currently holds."
  - id: B4
    class: business
    name: "Data vendors selling reach into companies a bank has no relationship with"
    impact: medium
    horizon: short
    lifecycle: mature
    description: "Company and contact data products are sold into coverage organisations on the promise of expanding the addressable set. They supply people the bank does not know, which is a different problem from reaching the people it does."
    evidence: "vendor-positioning-2026"
    implication: "Bears on none of the committed problems and is recorded because it is the category most often bought when this problem is named."
  - id: T1
    class: technology
    name: "Retrieval over a bank's own unstructured record"
    impact: high
    horizon: short
    lifecycle: growing
    description: "Retrieval systems over internal document estates moved from pilot to production in the segment during 2025, most commonly over policy and procedure rather than over client interaction records, because the second requires entity resolution the first does not."
    evidence: "platform-adoption-2026"
    implication: "Bears on H1 and H2. The technique is proven in the easier case and the harder case is where the client knowledge sits."
  - id: T2
    class: technology
    name: "Entity resolution across group structures as a precondition rather than a feature"
    impact: high
    horizon: short
    lifecycle: growing
    description: "Products that answer questions about a corporate client have begun to treat resolving a client group's several legal entities into one subject as the first step rather than as an enrichment, because a question asked of a group cannot be answered against six unlinked records."
    evidence: "platform-adoption-2026"
    implication: "Bears on H1 directly, and it is the thing the product specialist in the material was defeated by."
  - id: T3
    class: technology
    name: "Automatic relationship graphs built from calendar and mailbox signal"
    impact: medium
    horizon: short
    lifecycle: mature
    description: "Passive capture of who met whom, from calendars and mail headers, is a settled technique and is embedded in several products in scope. It produces a large graph quickly and carries no information about what any edge rests on."
    evidence: "vendor-positioning-2026"
    implication: "Bears on H1 in one direction and against H5 in the other: it supplies the name and nothing a person will act on, which is what the segment head described as ninety thousand nodes of noise."
  - id: T4
    class: technology
    name: "Interaction summarisation moving from meeting tools into the record"
    impact: medium
    horizon: medium
    lifecycle: emerging
    description: "Automatic summarisation of a meeting is now available in most of the collaboration suites the segment runs on. What is emerging, and is not settled, is whether the summary reaches the client record or stays in the meeting tool."
    evidence: "platform-adoption-2026"
    implication: "Bears on H2. The capture problem is close to solved and the routing problem is not."
  - id: R1
    class: regulatory
    name: "EU AI Act obligations on high-risk and limited-risk systems"
    impact: high
    horizon: medium
    lifecycle: growing
    description: "The EU AI Act's obligations phase in through 2026 and 2027. A system that suggests which person to approach is not a high-risk use in the Act's own list, and a system that scores a person is closer to one, so where the line falls depends on what the product outputs rather than on what it ingests."
    evidence: "eu-ai-act-timeline"
    implication: "Bears on H5. It pushes in the same direction as the material: named provenance and an examinable basis are what the users demanded and what the obligation is likely to require."
    instrument: "Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (the AI Act)"
    effective: "In force 1 August 2024; prohibitions from 2 February 2025; general-purpose model obligations from 2 August 2025; the high-risk regime from 2 August 2026 with a further year for systems embedded in regulated products"
  - id: R2
    class: regulatory
    name: "GDPR purpose limitation on internal relationship data"
    impact: high
    horizon: short
    lifecycle: mature
    description: "Personal data captured for one purpose, such as executing a payment instruction or servicing a facility, cannot be repurposed for relationship intelligence without a lawful basis and a purpose assessment. This applies to the bank's own employees' interaction data as much as to clients'."
    evidence: "gdpr-purpose-limitation"
    implication: "Bears on H1 and H2. It is the constraint that decides which sources can be ingested at all, and it arrives before any of the retrieval work."
    instrument: "Regulation (EU) 2016/679 (GDPR), Article 5(1)(b) purpose limitation and Article 6(4) on compatible further processing"
    effective: "In force since 25 May 2018; no change pending. It applies from the day a source is connected"
  - id: R3
    class: regulatory
    name: "Works council consent for employee interaction capture"
    impact: medium
    horizon: short
    lifecycle: mature
    description: "In several markets in scope, capturing an employee's calendar or mail metadata to build a relationship graph requires works council agreement, and agreements have been refused where the capture could support performance assessment."
    evidence: "works-council-practice"
    implication: "Bears on H4. The record of who holds a relationship is exactly the record a works council reads as performance data, and no product in scope publishes how it handles this."
    instrument: "National works constitution law transposing Directive 2002/14/EC, applied through works council agreements on employee monitoring; in Germany the Betriebsverfassungsgesetz §87(1)6"
    effective: "In force; no change pending. It bites at the point of capture rather than at the point of use"
  - id: R4
    class: regulatory
    name: "MiFID II and outsourcing rules on where client knowledge is processed"
    impact: medium
    horizon: medium
    lifecycle: mature
    description: "Processing client information outside the institution engages outsourcing and, for investment services, record-keeping obligations that constrain which vendors can hold what."
    evidence: "outsourcing-guidelines"
    implication: "Bears on none of the committed problems directly and shapes the deployment model, so it is recorded rather than carried forward."
    instrument: "EBA Guidelines on outsourcing arrangements (EBA/GL/2019/02), with MiFID II record-keeping under Directive 2014/65/EU where investment services are in scope"
    effective: "In force since 30 September 2019; applies at contract signature and at every material change to an arrangement"
participants:
  - identity_key: salesforce.com
    name: "Salesforce Financial Services Cloud"
    type: direct
    standing: leader
    represents: [B2, T3]
    first_seen: 2026-08-20
    deep_dive: true
    reason: "The most widely deployed relationship system in the segment and the one every interview named or implied. Profiled because it defines what a coverage organisation currently expects a client record to be."
  - identity_key: microsoft.com
    name: "Microsoft Dynamics 365 for Financial Services"
    type: direct
    standing: leader
    represents: [B2, T4]
    first_seen: 2026-08-20
    deep_dive: true
    reason: "The other default, and the one whose collaboration suite already captures the meeting signal that T4 is about. Profiled because the routing question sits inside one vendor's own estate."
  - identity_key: ncino.com
    name: "nCino"
    type: direct
    standing: leader
    represents: [B1, B2]
    first_seen: 2026-08-20
    deep_dive: true
    reason: "Owns the commercial lending workflow at a large share of the segment and therefore sits closest to the credit officer's version of the problem."
  - identity_key: introhive.com
    name: "Introhive"
    type: direct
    standing: innovator
    represents: [T3, B3]
    first_seen: 2026-08-20
    deep_dive: true
    reason: "The clearest example of the automatic relationship graph, and the participant whose approach the segment head described trying and abandoning."
  - identity_key: affinity.co
    name: "Affinity"
    type: direct
    standing: innovator
    represents: [T3]
    first_seen: 2026-08-20
    deep_dive: true
    reason: "Relationship intelligence built for private capital rather than banking, and the reference the adjacent market is measured against. Profiled as the design baseline the segment has not adopted."
  - identity_key: moodys.com
    name: "Moody's Orbis and Bureau van Dijk"
    type: adjacent
    standing: leader
    represents: [B4, T2]
    first_seen: 2026-08-20
    deep_dive: true
    reason: "Holds the group-structure data that entity resolution needs and sells it as company intelligence rather than as a precondition for anything internal."
  - identity_key: dnb.com
    name: "Dun & Bradstreet"
    type: substitute
    standing: leader
    represents: [B4]
    first_seen: 2026-08-20
    deep_dive: true
    reason: "The substitute a coverage organisation buys when the problem is named as a data problem, and profiled to establish what that purchase does and does not answer."
  - identity_key: spglobal.com
    name: "S&P Capital IQ Pro"
    type: substitute
    standing: leader
    represents: [B4, T2]
    first_seen: 2026-08-20
    deep_dive: true
    reason: "Carries people data attached to companies and is already on most corporate bankers' desks, so it is the closest thing to an incumbent answer to who."
  - identity_key: linkedin.com
    name: "LinkedIn Sales Navigator"
    type: substitute
    standing: innovator
    represents: [T3, B4]
    first_seen: 2026-08-20
    deep_dive: true
    reason: "The tool bankers actually reach for when the internal answer fails, and the only participant in scope whose graph is the individual's rather than the institution's."
  - identity_key: backbase.com
    name: "Backbase Engagement Banking"
    type: adjacent
    standing: innovator
    represents: [T1, T4]
    first_seen: 2026-08-20
    deep_dive: true
    reason: "Builds the banker-facing surface rather than the record, and is profiled because the moment question in the brief is a surface question before it is a retrieval one."
  - identity_key: attio.com
    name: "Attio"
    type: direct
    standing: innovator
    represents: [T3]
    first_seen: 2026-08-20
    deep_dive: false
    reason: "Mapped and not profiled. It is a general-purpose relationship CRM with no banking deployment in the segment and no group-entity handling, so a card would restate Affinity's without the private-capital depth that makes Affinity worth reading."
  - identity_key: clari.com
    name: "Clari"
    type: substitute
    standing: leader
    represents: [B2]
    first_seen: 2026-08-20
    deep_dive: false
    reason: "Mapped and not profiled. Revenue execution rather than relationship retrieval: it answers whether a pipeline will close and never who to approach, so it bears on none of the committed problems."
reused: []
unprofiled: []
unrepresented_trends: [R1, R2, R3, R4]
---

# Record R-A5-01 — A5

One landscape-mapping invocation. Not written for a reader; the document assembled from it is 3-competitive-analysis/1-landscape-map.md.
