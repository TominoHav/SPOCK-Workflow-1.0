---
run_id: 2026-05-corporate-coverage
artifact_id: A10
ost_role: artifact
status: accepted
workflow: discovery
modified_by: human
revisions: 1
sources: [A9, A4, A7]
external_sources: []
produced_by:
  agent: product-owner
  skill: mvp-option-design
could_not_verify:
  - rule: "2..3 options, each a whole way to pilot the idea, never a subset or a phase of another"
    needs: judge
    reach: artifact
  - rule: "every constraint referenced resolves into the Banking Constraints"
    needs: check
decision:
  gate: G5a
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: product_owner
  accepted_at: 2026-08-20
  changed_during_refinement: none
  refinements: []
  selection: OPT-A
  note: "Taken under a standing instruction that every decision in this run takes the first option. No reason was stated for OPT-A over OPT-B and none is reconstructed."
assembled_at: 2026-08-20
assembled_from: [R-A10-01]
---

# MVP | MVP Options: where the answer arrives

Two pilot options for ID-1 and they differ on one decision: whether the answer has a place of its own that a banker goes to, or arrives inside the systems they already have open. Neither is a subset of the other and neither is a staged version of the other, so the choice is a real one. **The brief says outright that it has opinions and no conviction on this**, and it is the question the whole initiative turns on, because the existing knowledge layer already works and nobody knows what to ask it. [rec:R-A10-01]

What each would teach is different, and that is what the choice should turn on rather than which is easier.

---

## OPT-A: A question box of its own

**What it is.** One new surface where a banker asks who do we know for this. The question is resolved against the client group rather than the entity record it names, every connected source is searched at once across business lines, and the answer is a set of named people each carrying the business line the relationship sits in and the colleague nearest to it. Where a source could not be searched, the answer says so.

**What it tests.** Whether a banker will bring the question to a new place at the moment it arises. That is the open question in the brief stated precisely: the knowledge layer already works, it has no trigger, and people in front of an open interface do not know what to ask. A destination of its own tests whether the problem is retrieval or whether it is the moment.

**How it differs from OPT-B.** The answer has a destination and a banker has to decide to go to it. OPT-B has no destination at all and arrives inside a system already open, so this option tests whether people will seek the answer out and OPT-B cannot.

**What it excludes.** Embedding the answer in any existing system. A banker who wants it has to go to it, and if they do not go, that is the result rather than a deployment failure.

**What it would tell us either way.** If it is used, the constraint was retrieval and the moment takes care of itself. If it is not used, the answer being good is not sufficient, and every subsequent design decision changes.

## OPT-B: The answer where the work already is

**What it is.** The same answer, delivered inside the systems people already have open: on the client record in the relationship system for coverage, and beside the credit file in the lending system for the credit officer. No new destination, no navigation, and two surfaces over one answer.

**What it tests.** Whether an answer placed where the work happens gets used without anyone deciding to use it. It also tests something the material implies and nobody has established: the three questions break differently by role, so a credit officer and a product specialist may need different surfaces over the same retrieval, and this is the option that finds out.

**How it differs from OPT-A.** The answer arrives where the work already happens and is never sought. OPT-A is a destination, so this option tests whether proximity alone produces use and OPT-A cannot.

**What it excludes.** A place of its own. There is nothing to navigate to and nothing to remember exists, so it cannot answer whether a banker would seek this out.

**What it would tell us either way.** If it is used, delivery was the constraint and the retrieval was always adequate. If it is not used inside the tools people live in, the problem is not where the answer sits, and that is a much harder result to act on.

---

## How to choose between them

**They teach opposite things and both are worth knowing.** OPT-A finds out whether people will come to an answer; OPT-B finds out whether an answer that comes to them gets used. The brief's own uncertainty is stated on exactly this axis, so whichever runs, the other question stays open and should be named as still open rather than treated as settled by inference.

**OPT-A is the sharper test and OPT-B is the safer product.** A destination of its own can fail cleanly and tell you why, and that is what the existing knowledge layer never did: it works and nobody uses it, and nobody knows whether that is the retrieval, the moment or the surface. OPT-B is more likely to be used and less likely to explain anything, because usage inside a system people already open does not separate the answer being good from the answer being nearby.

**Neither option addresses provenance**, and that is a deliberate omission carried from the selected idea rather than an oversight. H5 was not the problem ID-1 solves, and the competitive synthesis says four of ten participants surface people with a score and no evidence while all three interviewed users reject exactly that. **Whichever option runs, returning names without provenance reproduces the market's failure with the bank's own logo on it**, so the provenance decision belongs in the pilot design even though it belongs to a different problem.

**Both options meet the constraints the brief states.** Neither requires a relationship manager's time to produce an answer, which is the third known constraint, and both resolve the client group before retrieval, which the material's six-unlinked-records observation requires.

---

## What we could not establish

**What either option costs.** No Banking Constraints body exists for this run, so neither is weighed for technical complexity, operational change or cost. What each would teach is stated; what either would take to build is not.

**What the regulatory load is.** No Compliance Guidelines body exists, so the purpose-limitation and works-council touchpoints each option carries are identified from run material and marked indicative. No band, severity or obligation has been assessed.

**Whether the sources can be connected at all.** Both options assume the bank's systems can be read together. Purpose limitation decides that and it applies from the day a source is connected, which is before either pilot starts.

---

## How this was produced

**Run `2026-05-corporate-coverage`, stage 5.1 `mvp-option-design`, quality gate Q5 then decision gate G5a.** The options were derived from the selected idea and the problems it traces to. **OPT-A was selected at G5a on 20 August 2026 by Igor Tadic, Product Owner**, under a standing instruction that every decision in this run takes the first option. No reason was stated for OPT-A over OPT-B and none is reconstructed.

**Assembled from one record**, which carries each option, how it differs, what it tests and what it excludes as fields a check reads:

- **R-A10-01**: `records/5-mvp/A10-r01-options.record.md`

**Two options rather than three, and that is a floor rather than a shortfall.** The set is closed at two because the decision is binary: the answer has a destination or it does not. A third option would be one of these two with something removed.

**The run is fabricated end to end.** The problem material and the market material were both written on 20 August 2026 to exercise this workflow.

**Not agent output.** A person removed every long dash from this document on 21 August 2026, after `C110` was written and failed it. Nothing else changed. The findings, the numbers and the wording are as the stage produced them, apart from the punctuation carrying them. **What was replaced and why is in [notes/marked-edits.md](../notes/marked-edits.md)**, which no gate reads.
