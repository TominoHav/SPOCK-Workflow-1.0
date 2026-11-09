---
run_id: 2026-05-corporate-coverage
artifact_id: A5
ost_role: none
status: accepted
workflow: competitive-analysis
modified_by: human
revisions: 1
sources: [A1, A4]
external_sources: []
produced_by:
  agent: competitive-analysis
  skill: landscape-mapping
store: S1
scope: shared
egress_basis: pilot-test
standards_basis: "competitive-analysis-standards@0.12 read and applied. No outward research was performed: the run is fabricated end to end and the market material was written rather than gathered."
could_not_verify:
  - rule: "authored only from the quarantine bridge's structured extract, never from raw external text"
    needs: judge
    reach: process
assembled_at: 2026-08-20
assembled_from: [R-A5-01]
---

# Competitive Analysis | Landscape Map: Relationship intelligence for corporate coverage

The market sells three different things under one name and none of them is what the interviews described needing. Relationship systems record that contact happened, automatic graphs supply who met whom without what it rests on, and data vendors supply people the bank has no relationship with at all. **Nothing in scope supplies a bank's own earned context**, which is the middle of the three questions this run committed to. Twelve participants were mapped against twelve trends and ten were taken forward for deep research. [rec:R-A5-01]

The four regulatory trends have no representative on this map, and that is a finding rather than a gap: no participant in scope positions on how it handles purpose limitation, works council agreement or the AI Act, and the material says those are what decide whether anything can be ingested.

---

## The market we looked at

**Corporate and commercial banking coverage, Czech Republic first, with European peer banks in scope.** The brief applies no country boundary within Europe and the United States because neither the problem nor the tooling is country-specific, and the participants below are bought in the same form across the segment.

**The scope is deliberately wider than the direct competitors.** Three of the ten profiled are substitutes rather than direct participants, and two are adjacent. That is because the material describes people solving this problem with things that were not sold to solve it: a banker who cannot get an answer internally opens a professional network or a company-data terminal, and those are the real alternatives whatever the category says.

---

## Where the market is moving

### Business trends

**B1: Coverage headcount flat while corporate books grow.** Corporate lending books across the segment grew through 2024 and 2025 while coverage headcount did not, so the number of named clients per relationship manager rose from the mid-twenties toward the high fifties. The constraint on a bank's reach stopped being how many clients it has and became how many a person can attend to.

Impact high · horizon short · growing · evidence: segment-benchmark-2026

*What it means for this initiative.* Any answer that still costs a relationship manager time to produce makes the constraint worse rather than better, which is what the brief's third known constraint already says.

**B2: Cross-sell targets set against a book nobody can search.** Product penetration targets are now set per segment and reported monthly at most banks in scope, while the underlying question a specialist has to answer, which names in this book fit this product and who can open the door, is answered from memory and from asking colleagues.

Impact high · horizon short · growing · evidence: segment-benchmark-2026

*What it means for this initiative.* Bears directly on H3: the target exists, the instrument to hit it does not, and the gap is absorbed by the specialist's week.

**B3: Relationship continuity treated as a retention risk rather than a data one.** Banks in the segment have begun to report portfolio attrition following a relationship manager departure as a named risk in operational risk registers, having previously treated it as ordinary turnover. The framing has moved and the instrumentation has not.

Impact high · horizon medium · emerging · evidence: risk-register-practice-2026

*What it means for this initiative.* Bears on H4. A risk that is registered and not measured creates demand for exactly the record nothing currently holds.

**B4: Data vendors selling reach into companies a bank has no relationship with.** Company and contact data products are sold into coverage organisations on the promise of expanding the addressable set. They supply people the bank does not know, which is a different problem from reaching the people it does.

Impact medium · horizon short · mature · evidence: vendor-positioning-2026

*What it means for this initiative.* Bears on none of the committed problems and is recorded because it is the category most often bought when this problem is named.

### Technology trends

**T1: Retrieval over a bank's own unstructured record.** Retrieval systems over internal document estates moved from pilot to production in the segment during 2025, most commonly over policy and procedure rather than over client interaction records, because the second requires entity resolution the first does not.

Impact high · horizon short · growing · evidence: platform-adoption-2026

*What it means for this initiative.* Bears on H1 and H2. The technique is proven in the easier case and the harder case is where the client knowledge sits.

**T2: Entity resolution across group structures as a precondition rather than a feature.** Products that answer questions about a corporate client have begun to treat resolving a client group's several legal entities into one subject as the first step rather than as an enrichment, because a question asked of a group cannot be answered against six unlinked records.

Impact high · horizon short · growing · evidence: platform-adoption-2026

*What it means for this initiative.* Bears on H1 directly, and it is the thing the product specialist in the material was defeated by.

**T3: Automatic relationship graphs built from calendar and mailbox signal.** Passive capture of who met whom, from calendars and mail headers, is a settled technique and is embedded in several products in scope. It produces a large graph quickly and carries no information about what any edge rests on.

Impact medium · horizon short · mature · evidence: vendor-positioning-2026

*What it means for this initiative.* Bears on H1 in one direction and against H5 in the other: it supplies the name and nothing a person will act on, which is what the segment head described as ninety thousand nodes of noise.

**T4: Interaction summarisation moving from meeting tools into the record.** Automatic summarisation of a meeting is now available in most of the collaboration suites the segment runs on. What is emerging, and is not settled, is whether the summary reaches the client record or stays in the meeting tool.

Impact medium · horizon medium · emerging · evidence: platform-adoption-2026

*What it means for this initiative.* Bears on H2. The capture problem is close to solved and the routing problem is not.

### Regulatory trends

**R1: EU AI Act obligations on high-risk and limited-risk systems.** The EU AI Act's obligations phase in through 2026 and 2027. A system that suggests which person to approach is not a high-risk use in the Act's own list, and a system that scores a person is closer to one, so where the line falls depends on what the product outputs rather than on what it ingests.

Impact high · horizon medium · growing · evidence: eu-ai-act-timeline

*The instrument.* Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (the AI Act). *When it bites.* In force 1 August 2024; prohibitions from 2 February 2025; general-purpose model obligations from 2 August 2025; the high-risk regime from 2 August 2026 with a further year for systems embedded in regulated products

*What it means for this initiative.* Bears on H5. It pushes in the same direction as the material: named provenance and an examinable basis are what the users demanded and what the obligation is likely to require.

**R2: GDPR purpose limitation on internal relationship data.** Personal data captured for one purpose, such as executing a payment instruction or servicing a facility, cannot be repurposed for relationship intelligence without a lawful basis and a purpose assessment. This applies to the bank's own employees' interaction data as much as to clients'.

Impact high · horizon short · mature · evidence: gdpr-purpose-limitation

*The instrument.* Regulation (EU) 2016/679 (GDPR), Article 5(1)(b) purpose limitation and Article 6(4) on compatible further processing. *When it bites.* In force since 25 May 2018; no change pending. It applies from the day a source is connected

*What it means for this initiative.* Bears on H1 and H2. It is the constraint that decides which sources can be ingested at all, and it arrives before any of the retrieval work.

**R3: Works council consent for employee interaction capture.** In several markets in scope, capturing an employee's calendar or mail metadata to build a relationship graph requires works council agreement, and agreements have been refused where the capture could support performance assessment.

Impact medium · horizon short · mature · evidence: works-council-practice

*The instrument.* National works constitution law transposing Directive 2002/14/EC, applied through works council agreements on employee monitoring; in Germany the Betriebsverfassungsgesetz §87(1)6. *When it bites.* In force; no change pending. It bites at the point of capture rather than at the point of use

*What it means for this initiative.* Bears on H4. The record of who holds a relationship is exactly the record a works council reads as performance data, and no product in scope publishes how it handles this.

**R4: MiFID II and outsourcing rules on where client knowledge is processed.** Processing client information outside the institution engages outsourcing and, for investment services, record-keeping obligations that constrain which vendors can hold what.

Impact medium · horizon medium · mature · evidence: outsourcing-guidelines

*The instrument.* EBA Guidelines on outsourcing arrangements (EBA/GL/2019/02), with MiFID II record-keeping under Directive 2014/65/EU where investment services are in scope. *When it bites.* In force since 30 September 2019; applies at contract signature and at every material change to an arrangement

*What it means for this initiative.* Bears on none of the committed problems directly and shapes the deployment model, so it is recorded rather than carried forward.

---

## Who is in it

| Participant | Type | Standing | Represents | Profiled |
|---|---|---|---|---|
| **Salesforce Financial Services Cloud** (salesforce.com) | direct | leader | B2, T3 | yes |
| **Microsoft Dynamics 365 for Financial Services** (microsoft.com) | direct | leader | B2, T4 | yes |
| **nCino** (ncino.com) | direct | leader | B1, B2 | yes |
| **Introhive** (introhive.com) | direct | innovator | T3, B3 | yes |
| **Affinity** (affinity.co) | direct | innovator | T3 | yes |
| **Moody's Orbis and Bureau van Dijk** (moodys.com) | adjacent | leader | B4, T2 | yes |
| **Dun & Bradstreet** (dnb.com) | substitute | leader | B4 | yes |
| **S&P Capital IQ Pro** (spglobal.com) | substitute | leader | B4, T2 | yes |
| **LinkedIn Sales Navigator** (linkedin.com) | substitute | innovator | T3, B4 | yes |
| **Backbase Engagement Banking** (backbase.com) | adjacent | innovator | T1, T4 | yes |
| **Attio** (attio.com) | direct | innovator | T3 | no |
| **Clari** (clari.com) | substitute | leader | B2 | no |

**Three layers, and the split is what the synthesis runs on.** Five direct participants sell into a coverage organisation as the system of record or as relationship intelligence over it. Two adjacent participants hold something the answer needs, the group structure and the banker-facing surface, without selling the answer. Three substitutes are what a banker reaches for when the internal answer fails, and one of them is not the bank's tool at all.

---

## Who we looked at closely, and why

**Salesforce Financial Services Cloud: profiled.** The most widely deployed relationship system in the segment and the one every interview named or implied. Profiled because it defines what a coverage organisation currently expects a client record to be.

**Microsoft Dynamics 365 for Financial Services: profiled.** The other default, and the one whose collaboration suite already captures the meeting signal that T4 is about. Profiled because the routing question sits inside one vendor's own estate.

**nCino: profiled.** Owns the commercial lending workflow at a large share of the segment and therefore sits closest to the credit officer's version of the problem.

**Introhive: profiled.** The clearest example of the automatic relationship graph, and the participant whose approach the segment head described trying and abandoning.

**Affinity: profiled.** Relationship intelligence built for private capital rather than banking, and the reference the adjacent market is measured against. Profiled as the design baseline the segment has not adopted.

**Moody's Orbis and Bureau van Dijk: profiled.** Holds the group-structure data that entity resolution needs and sells it as company intelligence rather than as a precondition for anything internal.

**Dun & Bradstreet: profiled.** The substitute a coverage organisation buys when the problem is named as a data problem, and profiled to establish what that purchase does and does not answer.

**S&P Capital IQ Pro: profiled.** Carries people data attached to companies and is already on most corporate bankers' desks, so it is the closest thing to an incumbent answer to who.

**LinkedIn Sales Navigator: profiled.** The tool bankers actually reach for when the internal answer fails, and the only participant in scope whose graph is the individual's rather than the institution's.

**Backbase Engagement Banking: profiled.** Builds the banker-facing surface rather than the record, and is profiled because the moment question in the brief is a surface question before it is a retrieval one.

**Attio: mapped, not profiled.** Mapped and not profiled. It is a general-purpose relationship CRM with no banking deployment in the segment and no group-entity handling, so a card would restate Affinity's without the private-capital depth that makes Affinity worth reading.

**Clari: mapped, not profiled.** Mapped and not profiled. Revenue execution rather than relationship retrieval: it answers whether a pipeline will close and never who to approach, so it bears on none of the committed problems.

---

## What we could not establish

**Four trends have no representative on this map: R1, R2, R3 and R4.** Every one of them is regulatory. No participant in scope publishes how it handles GDPR purpose limitation on repurposed interaction data, works council agreement for capturing employee calendar and mail signal, the AI Act's obligations on a system that suggests or scores a person, or the outsourcing constraints on where client knowledge is processed. **A trend nobody answers is a finding**: it says the constraint that decides whether any of this can be built is one the market is silent on, and it is the constraint the material puts first.

**Whether any participant has a banking deployment at the depth this initiative needs.** Deployment claims in this segment are made at the category level and rarely name a bank, so the map records what each participant sells and not how far any of them has got inside a coverage organisation.

**Two participants were mapped and not profiled**, and both are recorded above with a reason rather than dropped. Neither omission is a coverage gap: one would restate another card and the other bears on none of the committed problems.

---

## How this was produced

**Run 2026-05-corporate-coverage, stage 3.1 landscape-mapping, quality gate Q3.** The map was built from the brief and the prioritised problems. Twelve participants mapped, ten profiled, against a floor of ten.

**Assembled from one record**, which carries the trends, the participants and the selection reasons as fields a gate decides:

- **R-A5-01**: records/3-competitive-analysis/A5-r01-landscape.record.md

**The market material for this run is fabricated, exactly as its problem material is.** The participants named are real companies and **everything recorded about them here was invented on 20 August 2026** to exercise this workflow. No outward research was performed. **A run whose problems are invented and whose market is researched for real would be labelled invented and be half true**, which is a worse state than either, so the whole run is consistently fabricated and the research regime is `pilot-test` on that basis.

**Not agent output.** A person removed every long dash from this document on 21 August 2026, after `C110` was written and failed it. Nothing else changed. The findings, the numbers and the wording are as the stage produced them, apart from the punctuation carrying them. **What was replaced and why is in [notes/marked-edits.md](../notes/marked-edits.md)**, which no gate reads.
