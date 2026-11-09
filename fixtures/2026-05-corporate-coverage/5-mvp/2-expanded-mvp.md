---
run_id: 2026-05-corporate-coverage
artifact_id: A11
ost_role: artifact
status: accepted
workflow: discovery
modified_by: human
revisions: 1
sources: [A10, A9]
external_sources: []
produced_by:
  agent: product-owner
  skill: mvp-expansion
could_not_verify:
  - rule: "every compliance touchpoint is addressed in functionality, not merely listed"
    needs: judge
    reach: artifact
decision:
  gate: G5b
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: product_owner
  accepted_at: 2026-08-20
  changed_during_refinement: none
  refinements: []
  note: "Accepted as it stood. The provenance position is carried into stage 6 as a requirement rather than a preference."
assembled_at: 2026-08-20
assembled_from: [R-A11-01]
---

# MVP | Expanded MVP: one question box across the whole institution

A banker asks who do we know for this in one place and the institution decides where to look. Three properties are what make this OPT-A rather than a search box: the question is resolved against the client group before anything is retrieved, every connected source is searched at once across business lines, and a source that could not be searched is named in the answer instead of quietly producing a shorter list. **What the pilot is meant to establish is not whether the retrieval works but whether anyone comes to it**, because a knowledge layer that already works and has no trigger is the thing this initiative exists to fix. [rec:R-A11-01]

The measure is the time from a question being asked to an actionable answer, and the share of questions answered without a colleague being interrupted.

---

## What it is

One surface, reached deliberately, where any senior person in coverage asks a question about people in the terms the question actually arrives in: someone who has done this, been through this, is right for this.

**Dropping any of the three properties makes it a different pilot.** Group resolution before retrieval is what stops a question about a client being answered against a sixth of it. Searching across business lines is what would have surfaced the private banking route the relationship manager lost a mandate to. And naming an unsearched source is what stops a partial answer looking like a complete one, which is the failure mode a confident interface makes worse rather than better.

**No score appears anywhere in it.** That is a decision carried from the competitive synthesis rather than a preference: four of ten profiled participants surface people with a computed strength and no evidence, and all three interviewed users independently rejected exactly that.

## How it works

1. The banker opens the surface and types the question as it arrived, naming a person, a company or a situation.
2. Any company named is resolved to its client group before retrieval, so a query naming a holding company reaches the operating company's history.
3. Every connected source is searched at once, across business lines rather than within the one the banker sits in.
4. The answer is a set of named people. Each carries the business line their relationship sits in, the colleague nearest to it, and the evidence that produced the match, with its author and its date.
5. Any source that could not be searched is named in the answer, with why, so the reader can see the shape of what is missing.

## What the pilot tests

**Whether a banker brings the question to a new place at the moment it arises.** This is the brief's own open question and it is unanswered by anything the initiative has built so far. The knowledge layer works; nobody asks it anything.

**Whether an institution-wide answer changes who gets approached.** The material says the same small group of names is recycled because recall is self-reinforcing. If the answers name people the asker would not have thought of, that is visible in the pilot without waiting for an outcome.

**Whether a question count rises once asking is cheap.** The relationship manager said the number she can report is what survived the friction. A pilot that removes the friction measures the suppressed remainder for the first time, and that is the only measurement of the problem's size anyone in this run could offer.

## What it means for the strategy

**SHD-4 moves down and the chain has one step in it.** The pilot's own measure is time from question to actionable answer, which is administration time in the key result's own terms.

**LVL-2 is reached indirectly and this pilot should not claim it.** ID-1 makes an approach possible and does not cause one, so a wallet movement inside a pilot window would not be attributable to it. That is stated here so stage 6 does not write it into a requirement.

**Its cost of failure is bounded**, which is unusual in this set. If bankers do not come to a destination, the result is a fact about the moment rather than a written-off build, and every later design decision changes on the strength of it.

## What has to be handled

**Purpose limitation, before a single source is connected.** Every source this reads was captured for another purpose, and repurposing it needs a lawful basis and a compatibility assessment. It applies to employees' data as much as to clients'. *Indicative: no Compliance Guidelines body exists for this run to band it.*

**Works council agreement, wherever the answer identifies which employee is nearest to a client.** A record of who is closest to a client reads as performance data, and agreements have been refused on that ground in markets in scope. *Indicative, same basis.*

**The provenance decision, even though H5 is not the problem being solved.** A retrieval surface returning names alone reproduces the market's failure with the bank's own logo on it. The position taken here is evidence beside every name, never a score, and stage 6 should treat that as a requirement rather than a preference.

## What the requirement stage needs

**Which sources are in scope.** This is a purpose-limitation answer rather than a technical one and it decides what the pilot can be.

**What is shown beside each name.** The position taken here is evidence with an author and a date, and never a computed score. The market gives the reason and the users gave it independently.

**What happens when a source cannot be searched.** The position taken here is that the answer says so, and that this is a functional requirement rather than an error message.

**Who the pilot opens to.** The material points at the product specialist as the most acute case and the brief's success signal names them, but ID-1 serves three roles with one surface and the pilot has to pick who is in it.

---

## What we could not establish

**What this costs to build.** No Banking Constraints body exists for this run, so nothing here is weighed for technical complexity or operational change.

**Whether the sources can be connected at all.** Purpose limitation decides it and it arrives before the pilot rather than during it.

**Whether the three roles want the same surface.** ID-1 serves the relationship manager, the product specialist and the credit officer with one surface on the argument that the question is the same and only the reason differs. Nothing in this run tests that, and OPT-B was the option that would have.

**What a sufficient piece of evidence looks like beside a name.** The users rejected scores and named provenance; nothing establishes how much evidence is enough to act on, and that is a question for the pilot rather than a gap in the research.

---

## How this was produced

**Run `2026-05-corporate-coverage`, stage 5.2 `mvp-expansion`, quality gate Q5 then decision gate G5b.** OPT-A was selected at G5a by the Product Owner under a standing instruction to take the first option. This document expands that selection to analyst-ready depth. It does not compare OPT-A with OPT-B or comment on the alternative; OPT-B is closed and remains in the options document unaltered.

**Assembled from one record**, which carries the option id, the expanded description, the strategic and compliance touchpoints and the analyst input as fields a check reads:

- **R-A11-01**: `records/5-mvp/A11-r01-expansion.record.md`

**Traceability.** OPT-A expands ID-1, which solves H1, which rests on three independent first-hand origins in the intake record.

**The run is fabricated end to end.** The problem material and the market material were both written on 20 August 2026 to exercise this workflow.

**Not agent output.** A person removed every long dash from this document on 21 August 2026, after `C110` was written and failed it. Nothing else changed. The findings, the numbers and the wording are as the stage produced them, apart from the punctuation carrying them. **What was replaced and why is in [notes/marked-edits.md](../notes/marked-edits.md)**, which no gate reads.
