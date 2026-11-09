---
run_id: 2026-05-corporate-coverage
record_id: R-A7-01
artifact_id: A7
item_id: ""
produced_at: 2026-08-20
produced_by:
  agent: competitive-analysis
  skill: synthesis
bounds_hit: []
standards:
  - key: ST1
    statement: "Four of ten participants capture mail and calendar signal passively and write it onto a record without anyone entering it: Salesforce, Microsoft, Introhive and Affinity. Capture is settled technology and none of the four captures what was said."
    tier: emerging
    source_count: "4 of 10"
    traces_to: [salesforce.com, microsoft.com, introhive.com, affinity.co]
    addresses: [H1, H2]
  - key: ST2
    statement: "Four of ten carry a stable entity identifier with group linkage: Moody's and Dun & Bradstreet as reference data, S&P on the banker's desk, and nCino inside the exposure framework. Group resolution is available in the segment and is bought for compliance, credit and prospecting rather than for coverage."
    tier: emerging
    source_count: "4 of 10"
    traces_to: [moodys.com, dnb.com, spglobal.com, ncino.com]
    addresses: [H1]
  - key: ST3
    statement: "Three of ten support attribute search over people rather than over companies: LinkedIn on the professional graph, S&P on management biographies, Dun & Bradstreet on sourced contact data. All three search people the bank has no relationship with."
    tier: emerging
    source_count: "3 of 10"
    traces_to: [linkedin.com, spglobal.com, dnb.com]
    addresses: [H3]
  - key: ST4
    statement: "Three of ten present a named route to a person through a colleague: Introhive and Affinity from captured signal, LinkedIn from the individual's own connections. Two of the three build the route from the institution's signal and one builds it from the user's."
    tier: emerging
    source_count: "3 of 10"
    traces_to: [introhive.com, affinity.co, linkedin.com]
    addresses: [H3, H4]
  - key: ST5
    statement: "Four of ten score the strength of a relationship: Introhive and Affinity as the product, Salesforce and Microsoft as an analytics or suggestion layer. Every one of the four derives the score from interaction metadata and none exposes what the score rests on."
    tier: emerging
    source_count: "4 of 10"
    traces_to: [introhive.com, affinity.co, salesforce.com, microsoft.com]
    addresses: [H5]
  - key: ST6
    statement: "Four of ten detect that a person has changed role and update the record without anyone curating it: Introhive, Affinity, LinkedIn and Dun & Bradstreet. Contact decay is a solved problem in the segment and is solved by four participants none of which holds the bank's earned context."
    tier: emerging
    source_count: "4 of 10"
    traces_to: [introhive.com, affinity.co, linkedin.com, dnb.com]
    addresses: [H2]
patterns:
  - key: P1
    statement: "The two participants that hold the pieces the answer needs are the two that do not sell the answer. Moody's holds the ownership graph that turns six unlinked records into one client, and sells it as company intelligence to compliance. Backbase holds the banker-facing surface where an answer would have to arrive, and sells it as an engagement layer with no content of its own. Both are adjacent by classification and central by function."
    traces_to: [moodys.com, backbase.com]
    addresses: [H1]
  - key: P2
    statement: "The three substitutes are what a banker actually reaches for, and the one they reach for most is not the bank's tool at all. LinkedIn answers the attribute question over people, presents a named route, needs no implementation and belongs to the individual. It is the only participant in scope that answers the first and third questions together, and everything it answers leaves the building when the banker does."
    traces_to: [linkedin.com, spglobal.com, dnb.com]
    addresses: [H3, H4]
  - key: P3
    statement: "Every participant that scores a relationship scores it from metadata, and all three interviewed users independently rejected exactly that. The score says how often two people interacted and never what the interaction rests on. This is not a maturity gap that will close: the input the four scorers have access to does not contain the thing the users asked for."
    traces_to: [introhive.com, affinity.co, salesforce.com, microsoft.com]
    addresses: [H5]
  - key: P4
    statement: "The bank has already paid for entity resolution and has it in the wrong place. nCino resolves a client group because exposure cannot be aggregated otherwise, and Moody's or Dun & Bradstreet ownership data is usually already entitled for compliance. The resolution exists inside the institution, scoped to a purpose that excludes coverage, which makes this a licensing and plumbing question rather than a build."
    traces_to: [ncino.com, moodys.com, dnb.com]
    addresses: [H1]
trends:
  - key: TR-T2
    statement: "Entity resolution across group structures has moved from an enrichment to a precondition in the products that answer questions about a corporate client, and the bank already holds the data twice. The movement is in the market and the constraint is internal: the entitlement is scoped to compliance and the resolution is scoped to exposure."
    traces_to: [A5]
    addresses: [H1]
  - key: TR-T4
    statement: "Interaction summarisation has moved into the collaboration suites the segment already runs on, so producing a summary of a meeting is close to solved and routing it to the client record is not. The unsolved half is much smaller than the solved one, and it is the half that decides whether H2 is answerable."
    traces_to: [A5]
    addresses: [H2]
  - key: TR-R1
    statement: "The AI Act's high-risk regime applies from 2 August 2026 and where a relationship product falls depends on what it outputs rather than on what it ingests. A system that surfaces a named person with the evidence behind it is a different object under the Act from one that scores a person, and the users interviewed asked for the first and rejected the second."
    traces_to: [A5]
    addresses: [H5]
  - key: TR-R3
    statement: "Works council agreement is required in several markets in scope before employee calendar and mail signal can be captured, and agreements have been refused where the capture could support performance assessment. A record of who holds a relationship is exactly the record a works council reads as performance data."
    traces_to: [A5]
    addresses: [H4]
absences:
  - problem: H2
    statement: "No participant on this map carries what was said in an interaction. Zero of ten. Four capture the metadata automatically, one summarises the meeting where the meeting happens and leaves it there, and none routes content to the client record. What was looked for: interaction content attached to a person or a client record, call report text made retrievable, or meeting summaries reaching the system of record. This is the absence the whole landscape is organised around, and it is the second of the three questions this run committed to."
  - problem: H5
    statement: "No participant supplies the awkward history behind a suggested person, and none exposes what a relationship score rests on. Four participants score, all four score from metadata, and none presents a named author and a date. What was looked for: a declined application, a complaint, a noted difficulty, or any provenance attached to a suggested contact. All three interviewed users named this as the thing that decides whether they act, and the market does not supply it."
  - problem: H4
    statement: "No participant records who holds a relationship as an institutional fact that survives a departure. The three that present a route derive it from signal that belongs to the person generating it, so the route disappears with them. What was looked for: an explicit record of relationship ownership, a handover mechanism that transfers a relationship rather than a file, or any continuity guarantee. Nothing in scope offers one."
---

# Record R-A7-01 — A7

One synthesis invocation. Not written for a reader; the document assembled from it is 3-competitive-analysis/3-competitive-synthesis.md.
