---
run_id: 2026-05-corporate-coverage
artifact_id: A13
ost_role: artifact
status: accepted
workflow: discovery
modified_by: human
revisions: 1
sources: [A12, A11, A4]
external_sources: []
produced_by:
  agent: business-analyst
  skill: prd
agreement_block:
  name: "Igor Tadic"
  date: "2026-08-20"
decision:
  gate: G6
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: product_owner
  accepted_at: 2026-08-20
  changed_during_refinement: none
  refinements: []
  note: "Agreed as drafted. The two requirements that exist because of what the users said, R5 and R7, were the ones read most closely and neither was changed."
could_not_verify: []
assembled_at: 2026-08-20
assembled_from: [R-A13-01]
---

# PRD | ID-1 OPT-A: One question box across the whole institution

A banker asks who do we know for this in one place, the institution decides where to look, and the answer is a set of named people each carrying the evidence that produced it. Fourteen requirements specify it, each with acceptance criteria and a trace back to the problem it answers. The problem is that the bank's knowledge of a person is split across business lines, systems and entity records that nobody searches across, and the measure is the time from a question being asked to an actionable answer. [rec:R-A13-01]

**Two requirements exist because of what the users said rather than because of what the product needs.** R5 forbids a score anywhere in any answer, and R7 requires the awkward history to arrive with the name. Both are the difference between an answer people act on and one they check.

---

## Overview

This document specifies OPT-A of ID-1 for the pilot: one surface where any senior person in corporate coverage asks a question about people, and the institution answers it across every source it has connected.

**Three properties define it and dropping any one makes it a different pilot.** The question is resolved against the client group before anything is retrieved. Every connected source is searched at once, across business lines rather than within one. And a source that could not be searched is named in the answer instead of quietly producing a shorter list.

## Problem

**H1: the bank's knowledge of a person is split across business lines, systems and entity records that nobody searches across, so a route that exists inside the institution is invisible to the person who needs it.** Three independent first-hand origins in the intake record name three different kinds of wall: a business line with its own reporting line, six unlinked entity records inside one client group, and a sister system credit cannot read.

The problem is not that the answer is missing. It is that the person who needs it has to know which building it is in, and the material says plainly that even a search across both would not have been used, because the boundary is reproduced in the asker's own model of where knowledge lives.

## Users

**The relationship manager**, asking about people around a client she covers and about routes she does not own.

**The product specialist**, who owns no relationship and needs all of them, and who the segment head named as carrying the most acute version of the problem.

**The credit officer**, whose only qualitative source on a management team today is the person advocating the deal.

One surface serves all three on the argument that the question is the same and only the reason differs. **Nothing in this run tests that argument**, and the option that would have was not selected.

## Success measures

**Median time from a question being asked to an actionable answer.** Reportable from R10 and bounded by R12.

**Share of questions answered without a colleague being interrupted.** Reportable from R10.

**Volume of questions asked.** The material says the count anyone can report today is what survived the friction of asking. This is the first measurement of the suppressed remainder and it is a finding whichever way it goes.

**Not measured, deliberately: share of wallet.** ID-1 makes an approach possible and does not cause one, so no requirement here is written against LVL-2 and no claim on it should be made from this pilot.

## Requirements

Requirements R1 through R7 trace to A11 and A4 (H1): they are the retrieval and the answer. R8 through R14 trace to the same sources and specify what has to hold around it for the pilot to be permitted to run at all.

### R1: Question intake in the banker's own terms

The system must accept a question about people expressed as an attribute, a company or a situation, in free text, without requiring the banker to choose a system, a business line or an entity beforehand.

*Acceptance criteria.*

- A question naming only an attribute returns candidate people without the banker specifying a source.
- A question naming a company reaches the client group rather than the named entity alone.
- No field in the intake requires the banker to know which system holds the answer.

*Traces to.* A11 (expanded MVP) → A9 (ID-1) → A4 (H1, primary problem, trust: strong)

### R2: Client group resolution before retrieval

The system must resolve any organisation named in a question to its client group before retrieving anything, so that a question about a holding company reaches the history of every entity in that group the bank deals with.

*Acceptance criteria.*

- A question naming a holding company returns material recorded against its operating subsidiaries.
- The answer states which entities were treated as one group.
- Where the group could not be resolved, the answer says so rather than answering against the named entity alone.

*Traces to.* A11 (expanded MVP) → A9 (ID-1) → A4 (H1, primary problem, trust: strong)

### R3: Cross-business-line retrieval in one pass

The system must search every connected source in one pass, across business lines and reporting lines rather than within the one the asking banker belongs to.

*Acceptance criteria.*

- A banker in corporate coverage receives results drawn from sources outside corporate coverage.
- No result is withheld on the basis of the asker's business line, subject to R11.
- The set of sources searched is the same for every asker except where entitlement differs, and where it differs the answer says so.

*Traces to.* A11 (expanded MVP) → A9 (ID-1) → A4 (H1, primary problem, trust: strong)

### R4: Named people as the answer

The answer must be a set of named people rather than documents, records or companies, each carrying the business line their relationship sits in and the colleague nearest to it.

*Acceptance criteria.*

- Every result names a person.
- Every result names the business line the relationship sits in.
- Every result names the colleague nearest to that person, or states that none was found.

*Traces to.* A11 (expanded MVP) → A9 (ID-1) → A4 (H1, primary problem, trust: strong)

### R5: Evidence beside every name, and never a score

Each result must carry the evidence that produced it, with the author and the date of the underlying record. The system must not display a computed relationship strength, a rank or a confidence number anywhere in the answer.

*Acceptance criteria.*

- Each result shows at least one underlying item with its author and its date.
- No numeric strength, score or confidence value appears in any answer surface.
- Where the evidence for a result is a single item, the answer says so rather than presenting it as equivalent to a result with several.

*Traces to.* A11 (expanded MVP) → A9 (ID-1) → A4 (H1, primary problem, trust: strong)

### R6: Named gaps where a source could not be searched

Where any source in scope could not be searched, the answer must name it and say why, rather than returning a shorter list.

*Acceptance criteria.*

- An answer produced while a source was unavailable names that source.
- The reason is stated in terms a banker can act on.
- An answer with no unavailable sources states that explicitly rather than being silent.

*Traces to.* A11 (expanded MVP) → A9 (ID-1) → A4 (H1, primary problem, trust: strong)

### R7: Adverse history surfaced with the result

Where the bank's record contains a declined application, a complaint, a recorded difficulty or a closed relationship involving a returned person, the system must surface it alongside that person rather than requiring a separate search.

*Acceptance criteria.*

- A person with a recorded decline is returned with that fact attached.
- The adverse item carries its author and date like any other evidence.
- Absence of adverse history is not asserted; the answer says nothing rather than saying nothing was found.

*Traces to.* A11 (expanded MVP) → A9 (ID-1) → A4 (H1, primary problem, trust: strong)

### R8: Source scope declared and enforced

The set of sources the system may read must be declared explicitly, enforced at retrieval, and readable by a reviewer. No source outside the declared set may be read.

*Acceptance criteria.*

- The declared set is visible to an authorised reviewer without reading code.
- A retrieval attempt against an undeclared source fails and is recorded.
- A change to the declared set is recorded with who made it and when.

*Traces to.* A11 (expanded MVP) → A9 (ID-1) → A4 (H1, primary problem, trust: strong)

### R9: Entitlement respected per asker

The system must apply the asking banker's existing entitlements to every source, so that the answer never exposes material the asker could not open directly.

*Acceptance criteria.*

- A banker without entitlement to a source receives no material from it.
- Where entitlement reduces the answer, the answer says so under R6.
- Entitlement is evaluated per source and per asker at the time of the question.

*Traces to.* A11 (expanded MVP) → A9 (ID-1) → A4 (H1, primary problem, trust: strong)

### R10: Query record for measurement

Every question asked and every answer returned must be recorded, so the volume of relationship queries can be measured for the first time and the time from question to answer can be reported.

*Acceptance criteria.*

- Each question is recorded with its asker, its timestamp and whether an answer was returned.
- Time from question to first answer is reportable per question.
- The record is available in aggregate without exposing the content of a question to anyone outside the pilot team.

*Traces to.* A11 (expanded MVP) → A9 (ID-1) → A4 (H1, primary problem, trust: strong)

### R11: No employee performance derivation

The system must not produce, display or export any measure that ranks or compares employees, and the nearest-colleague result must be presented as a route rather than as a standing.

*Acceptance criteria.*

- No surface displays a per-employee count, ranking or league table.
- No export contains a per-employee aggregate.
- The nearest-colleague result is presented with its evidence and without comparison to other colleagues.

*Traces to.* A11 (expanded MVP) → A9 (ID-1) → A4 (H1, primary problem, trust: strong)

### R12: Answer within an interactive window

An answer must return within a window that allows the question to be asked inside a meeting rather than after it.

*Acceptance criteria.*

- Median time to first answer is under five seconds for a question against the declared source set.
- A question that will take longer returns partial results with the outstanding sources named under R6.
- No question is left with no response.

*Traces to.* A11 (expanded MVP) → A9 (ID-1) → A4 (H1, primary problem, trust: strong)

### R13: Recorded basis for every processed source

Before a source is connected, the lawful basis for processing its contents for this purpose must be recorded against that source, and the system must not read a source with no recorded basis.

*Acceptance criteria.*

- Each declared source carries a recorded basis, its author and its date.
- A source with no recorded basis cannot be added to the declared set.
- The record is readable by a reviewer without reading code.

*Traces to.* A11 (expanded MVP) → A9 (ID-1) → A4 (H1, primary problem, trust: strong)

### R14: Withdrawal of a source without rebuild

A source must be removable from the declared set without rebuilding the system, and its material must stop appearing in answers from that point.

*Acceptance criteria.*

- Removing a source takes effect for questions asked after the removal.
- Answers already returned are not retrospectively altered.
- Removal is recorded with who made it and when.

*Traces to.* A11 (expanded MVP) → A9 (ID-1) → A4 (H1, primary problem, trust: strong)

## Non-functional requirements

**Availability.** The surface must be available whenever the bank's client-facing systems are, because a question asked in a meeting cannot wait for a maintenance window.

**Auditability.** Every question, every answer and every change to the declared source set must be reconstructable after the fact, which is what R8, R10, R13 and R14 produce between them.

**No new client-facing surface.** The pilot is internal. Nothing in it is exposed to a client, which keeps it outside the client-facing change process.

**Regulatory posture.** Under the AI Act the treatment of a system that suggests a person with its reasoning differs from one that scores a person. R5 puts this system in the first category by construction, and that is a design decision rather than a consequence.

## Out of scope

**The substance behind a name (H2).** ID-2 carried it and was not selected. This pilot returns what the bank recorded as evidence for a match; it does not assemble a dossier.

**The route as a product (H3).** R4 names the nearest colleague, which is a retrieval result rather than the evidenced route ID-3 described.

**Relationship ownership (H4) and measurement of the cost of a poor answer (H6).**

**Any client-facing capability, any writing back to a source, and any automated outreach.**

## Dependencies

**A recorded lawful basis per source, before connection.** R13 makes this a requirement rather than a project step, because a source without one cannot be read.

**Works council agreement in any market where the answer identifies which employee is nearest to a client.** R11 is written to make that agreement obtainable rather than to assume it.

**Group resolution data.** The bank already holds it twice, in credit for exposure and in compliance for ownership, and R2 depends on one of the two being usable for this purpose. That is a contractual question rather than a technical one.

**Entitlement data per banker per source**, which R9 depends on.

---

## What we could not establish

**What this costs to build.** No Banking Constraints body exists for this run, so no requirement above is weighed for technical complexity or operational change.

**Whether the sources may be read.** R13 makes the basis a precondition and nothing in this run establishes that any particular source has one.

**Whether one surface serves three roles.** Stated as an assumption in Users, untested by this run, and the option that would have tested it was not selected.

**What a sufficient piece of evidence looks like beside a name.** R5 requires evidence and does not say how much is enough, because nothing in the research establishes it.

---

## How this was produced

**Run 2026-05-corporate-coverage, stage 6.2 prd-agreement, quality gate Q6 then decision gate G6.** Authored from the expanded MVP and the prioritised problems, against the eight sections the PRD template closes.

**Assembled from one record**, which carries the section set, the requirement ids with their traces, the compliance touchpoints and the alignment validation as fields a check reads:

- **R-A13-01**: records/6-prd/A13-r01-prd-agreed.record.md

**This is the agreed state, and the draft it was agreed from is unaltered beside it.** Igor Tadic agreed it on 20 August 2026 with nothing changed in refinement, which the decision record says and which a comparison against the draft can be held to.

**The run is fabricated end to end.** The problem material and the market material were both written on 20 August 2026 to exercise this workflow.

**Not agent output.** A person removed every long dash from this document on 21 August 2026, after `C110` was written and failed it. Nothing else changed. The findings, the numbers and the wording are as the stage produced them, apart from the punctuation carrying them. **What was replaced and why is in [notes/marked-edits.md](../notes/marked-edits.md)**, which no gate reads.
