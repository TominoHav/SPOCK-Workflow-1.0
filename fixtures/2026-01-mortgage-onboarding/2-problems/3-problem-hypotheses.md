---
run_id: 2026-01-mortgage-onboarding
artifact_id: A3
ost_role: opportunity
status: accepted
workflow: problems
modified_by: human
revisions: 0
external_sources: []
sources:
  - A2b
produced_by:
  agent: hypothesis-designer
  skill: hypothesis-authoring
# Problems | Problem Hypothesis Set — derived from the gate model and
# recomputed at the gate, never read as authored (C65, PD148/D7)
could_not_verify:
  - rule: "never reads A2 raw material, only the A2b intake record"
    needs: judge
    reach: process
  - rule: "no hypothesis names a thing to build; a solution-shaped candidate is reduced to the need beneath it or recorded as not a problem"
    needs: judge
    reach: content
assembled_at: 2026-08-20
assembled_from: [R-A3-01]
---

# Problem hypothesis set

> **Fictional.** Every name, quote, branch, ticket and date below was invented to exercise the
> quality gates. See [fixtures/README.md](../README.md). Nothing here is research about a real person.

Trust is **computed** from the qualifying set, never asserted. H1's two references come from one
transcript and one ticket — **two origins**, so `strong`. Had both come from participant P4, it would be
`weak` regardless of how many quotes supported it.

**One candidate is recorded as not a problem, and the reason is its shape rather than its evidence.**
*Advisers would use a self-service tool if one existed* names the thing to build. The need beneath it
might be that an adviser cannot answer a client without leaving the conversation, and **no observation
in the intake record says that** — so there is nothing to reduce it to, and inventing the need would be
the exact failure this workflow exists to stop.

**Two questions, kept apart.** An unevidenced statement that is genuinely problem-shaped is still a
problem and rates `unrated`. A solution-shaped statement with excellent evidence is still not one.
`rejected[]` carries no trust tag because there is nothing to tag.


**Assembled from one record**, which carries the fields a gate decides: [rec:R-A3-01].
---

## Marked human edit — one, and the account is in `notes/`

**Not agent output.** One edit was made to this artifact by a person: *H3 is not a problem* (12 August 2026). **What changed and why is in [notes/marked-edits.md](../notes/marked-edits.md)**, which no gate reads.
