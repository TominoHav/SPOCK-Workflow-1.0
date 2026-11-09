---
run_id: 2026-05-corporate-coverage
artifact_id: A4
ost_role: opportunity
status: accepted
workflow: problems
modified_by: human
revisions: 1
sources: [A3]
external_sources: []
produced_by:
  agent: hypothesis-designer
  skill: prioritisation
could_not_verify: []
decision:
  gate: G2
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: product_owner
  accepted_at: 2026-08-20
  changed_during_refinement: none
  refinements: []
  selection: [H3, H1, H5]
  note: "Accepted in every placement. All six carry a strong tag, so the ordering is a scope decision and the record says so."
assembled_at: 2026-08-20
assembled_from: [R-A4-01]
---

# Problems | Prioritised Problems

H3 is placed first because the brief's success signal names it outright: a product specialist stops asking a relationship manager who we know. H1 follows it, because there is nothing for a specialist to be given until the bank can see across its own boundaries, and H5 third, because an answer nobody will act on is not an answer. H2 and H4 sit behind them as the substance and the route, both real and neither the thing that has to work first. H6 is parked, and it is the only one parked for a reason that is not about evidence. [rec:R-A4-01]

All six carry a strong trust tag. The ordering therefore turns entirely on fit to the stated outcome, because the evidence does not separate them.

---

## What we are solving first

**H3: Anyone who does not own the relationship has to buy their way in.** Trust: `strong`

Placed first. The brief's success signal is a sentence about this problem and no other: *a product specialist stops asking a relationship manager who we know, and starts asking whether to approach.* Three independent origins describe the same mechanism from three positions, and one of them puts a number on it: sixty of three hundred in-scope names worked in a year, with the rest unreached rather than rejected. It is also the problem whose solution is visible in the second product goal, share of wallet, without an intermediate step.

**H1: The answer is inside the bank and behind a wall nobody searches past.** Trust: `strong`

Placed second, and it is second rather than first only because it is the precondition rather than the outcome. Three origins name three different kinds of wall: a business line with its own reporting line, six unlinked entity records inside one client group, and a sister system credit cannot read. **Solving H3 without H1 hands a product specialist faster access to the same partial picture**, which is a worse failure than the current one because it arrives with the bank's authority behind it.

**H5: A name without provenance is not used, even when it is right.** Trust: `strong`

Placed third. Three origins agree on the shape rather than only the direction: all three reject an unattributed strength signal, all three name the same missing category, and the credit officer states that an unattributed strength is worse than silence. This is the problem that decides whether anything built for H1 and H3 gets used at all, and it is third because it is a property of the answer rather than of the retrieval.

---

## What comes after

**H2: The record says a meeting happened and not what was said in it.** Trust: `strong`

Two origins, both first hand. This is the substance behind a name, and it is second-order for a reason worth stating: **it is the hardest of the six to solve and the easiest to solve badly.** Extracting what was said from call reports, email and meeting notes is where the effort goes, and a partial answer here degrades quietly rather than visibly. It sits behind the three above so that the shape of a usable answer is settled before the expensive part is built.

**H4: Nothing says who actually holds a relationship, so it cannot be handed over.** Trust: `strong`

Two origins, both first hand, and it carries the largest number anyone gave: a fifth to a third of a portfolio's wallet within eighteen months of a departure. It is behind the first three because continuity is a consequence of the route being recorded, and the route is what H1 and H5 together produce. **If the first three work, this improves without being worked on directly.** If they do not, this cannot be solved on its own.

---

## What we are not solving now

**H6: Nobody can see what the worse answer cost, so it reads as bad luck.** Trust: `strong`

Parked, and the reason is not the evidence. Two independent first-hand origins support it and the trust tag is the same as every other hypothesis here. **It is parked because it is a measurement problem rather than a retrieval one**, and because solving it would tell the bank the size of a gap the other five are already closing.

It is also the hypothesis that explains why the other five have survived. There is no line in any report for the introductions that were not made, so the cost surfaces only in the post-mortem of a single lost mandate and is read as chance. **A reader deciding to fund this initiative should read H6 as the reason the business case is hard to write**, not as a problem to solve inside it.

Retained in full. The parked list is never emptied, and a parked problem carries its evidence and its trust tag into any follow-on run at no additional cost.

---

## How we decided the order

**The outcome the brief states.** Anyone in corporate coverage can ask who do we know for this, get an answer drawn from everything the bank has recorded, see what the bank knows about that person, and see which of our people is the real route in.

**The success signal.** A product specialist stops asking a relationship manager who we know, and starts asking whether to approach.

Two things structure the ordering. The signal names one problem, H3, and the outcome names a sequence: retrieve, then know, then route. **The evidence separates none of them**, because all six carry a strong tag from four first-hand origins, so fit to the stated outcome is doing all the work here and the ordering should be read as a scope decision rather than as an evidential one.

---

## What we could not establish

**The wallet figure behind H4.** A fifth to a third within eighteen months is reported without a measurement basis, a definition of wallet or a period. It is carried as reported and is not usable as a quantity until the basis is supplied.

**Whether H1 through H4 are four problems or one.** They could be read as four faces of a single failure. They are kept separate because they break at different points and would be solved by different things, and if they collapse it should happen at the next gate with ideas in front of it rather than here.

**What any of this costs.** No Banking Constraints body exists for this run, so nothing here is weighed for feasibility, and the ordering rests on evidence and outcome fit alone.

---

## How this was produced

**Run `2026-05-corporate-coverage`, stage 2.3 `prioritisation`, quality gate Q2 then decision gate G2.** The placements were decided at G2 on 20 August 2026 by Igor Tadic, Product Owner, and the proposal the agent produced was accepted in every placement. The reasoning above is the proposal's; the decision is the person's, and the two agreeing does not make them one act.

**No Researcher is named on this run**, so both halves of the gate were taken by the same person and the record says so rather than supplying a plausible name.

**Assembled from one record**, which carries the placements, the ordering source and the decision block as fields a check reads:

- **R-A4-01**: `records/2-problems/A4-r01-prioritisation.record.md`

**The material is generated.** The four interviews behind every hypothesis here were written on 20 August 2026 to exercise this workflow, and the trust tags measure agreement between four written characters rather than between four bankers.

**Not agent output.** A person removed every long dash from this document on 21 August 2026, after `C110` was written and failed it. Nothing else changed. The findings, the numbers and the wording are as the stage produced them, apart from the punctuation carrying them. **What was replaced and why is in [notes/marked-edits.md](../notes/marked-edits.md)**, which no gate reads.
