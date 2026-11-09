---
run_id: 2026-01-mortgage-onboarding
artifact_id: A4
ost_role: opportunity
status: accepted
workflow: problems
modified_by: human
revisions: 0
external_sources: []
sources:
  - A3
produced_by:
  agent: hypothesis-designer
  skill: prioritisation
# Problems | Prioritised Problem Set
could_not_verify: []
decision:
  gate: G2
  by_agent: false
  accepted_by:
    - name: Petr Havel
      role: researcher
    - name: Jana Novakova
      role: product_owner
  accepted_at: 2026-08-03
  changed_during_refinement: none
  refinements: []
  note: Researcher confirmed the evidence; PO set the scope. The third candidate is recorded in A3 as not a problem, on shape
assembled_at: 2026-08-20
assembled_from: [R-A4-01]
---

# Prioritised problem set

> **Fictional.** Every name, quote, branch, ticket and date below was invented to exercise the
> quality gates. See [fixtures/README.md](../README.md). Nothing here is research about a real person.

**H1 primary.** Two independent origins, and it is the problem the outcome is about.

**H2 secondary.** Real, and thinly evidenced. Kept visible at its true weight rather than promoted on
the strength of a good story.

**Nothing is parked this run, and that is a change rather than an omission.** The third candidate —
*"advisers would use a tool"* — was a solution wearing a problem's clothes, and until 12 August it was
parked here as a problem. **It is now recorded in [A3](./3-problem-hypotheses.md) as not a problem at all**, on
shape rather than on evidence, with its wording and a reason. Parking is for real problems this run did
not pursue; it is not where solution-shaped statements go to be tidy.

The decision record carries two names because **G2 has two reviewers judging different things**: the
Researcher governs the evidence, the Product Owner governs the scope. `by_agent: false` is what C14
checks — no agent recorded this.


**Assembled from one record**, which carries the fields a gate decides: [rec:R-A4-01].
---

## Marked human edits — two, and the account is in `notes/`

**Not agent output.** Two edits were made to this artifact by a person: *decision record brought to the one form* (6 August 2026) · *the quality gate's date corrected* (10 August 2026). **What changed and why is in [notes/marked-edits.md](../notes/marked-edits.md)**, which no gate reads.
