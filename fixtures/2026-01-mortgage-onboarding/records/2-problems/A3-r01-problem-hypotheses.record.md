---
run_id: 2026-01-mortgage-onboarding
record_id: R-A3-01
artifact_id: A3
item_id: ""
produced_by:
  agent: hypothesis-designer
  skill: hypothesis-authoring
produced_at: 2026-08-03
bounds_hit: []
hypotheses:
  - id: H1
    statement: SME applicants cannot get an affordability figure without committing to a full submission
    trust: strong
    rationale: Two independent origins in the qualifying set — participant P4 and adviser M. Dvorak. Both complete
    kind: barrier
    themes: [affordability, commitment threshold]
    disconfirming: "A2-item-2 has M. Dvorak describing applicants who want the figure before committing. If further intake showed applicants who had the figure and still did not submit, the barrier is not the figure and this hypothesis is answering the wrong question"
    evidence:
      - A2-item-1
      - A2-item-2
  - id: H2
    statement: SME applicants shop the market mid-application because they have no figure to compare
    trust: weak
    rationale: One origin in the qualifying set — branch staff, Ostrava. Thin, not incomplete
    kind: true
    themes: [comparison, switching]
    disconfirming: "A2-item-3 is branch staff inferring the reason from behaviour rather than an applicant stating it. An applicant saying they left for a rate rather than for a figure would put this down to price and not to comparison"
    evidence:
      - A2-item-3
rejected:
  - statement: Advisers would use a self-service tool if one existed
    reason: "Solution-shaped — it names the tool. The need beneath it might be that an adviser cannot answer a client without leaving the conversation, and no observation in the intake record reports that. There is nothing to reduce it to, so it is not a problem. Rejected on shape, not on evidence"
    from: []
---

# Record R-A3-01 — A3

One production. Not written for a reader; the document assembled from it is 2-problems/3-problem-hypotheses.md.
