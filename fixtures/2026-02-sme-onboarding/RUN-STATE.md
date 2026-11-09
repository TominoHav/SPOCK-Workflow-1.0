---
run_id: 2026-02-sme-onboarding
artifact_id: S2
record: run-state
workflow: discovery
mode: discovery
created_at: 2026-08-04
updated_at: 2026-08-21
current_stage: 1
status: in_progress
behaviours: composed-floor@0.1
stages:
  - id: 1
    name: Brief
    workflow: discovery
    status: produced
    artifacts: [A1]
    know_how: [brief-fields@0.1]
  - id: 2
    name: Problems
    workflow: problems
    status: accepted
    artifacts: [A2b, A3, A4]
    quality_gate:
      id: Q2
      result: pass
      run_at: 2026-08-03
      run_by: "check.mjs, run independently of the producer"
      judged_ran: 8
      judged_not_run: 4
      judged_reason: "no independent checker — every binding pins one model family (PD147, AB-24)"
    decision_gate:
      id: G2
      decided_by: "Petr Havel (evidence) and Martina Kolarova (scope)"
      decided_at: 2026-08-03
      by_agent: false
    know_how: [evidence-standards@0.2]
  - id: 3
    name: Competitive Analysis
    workflow: competitive-analysis
    status: pending
    artifacts: [A5, A6, A7]
    know_how: []
  - id: 4
    name: Ideas
    workflow: discovery
    status: pending
    artifacts: [A8, A9, A8b]
    know_how: []
  - id: 5
    name: MVP
    workflow: discovery
    status: pending
    artifacts: [A10, A11]
    know_how: []
  - id: 6
    name: PRD
    workflow: discovery
    status: pending
    artifacts: [A12, A13]
    know_how: []
  - id: 7
    name: Initiative
    workflow: discovery
    status: pending
    artifacts: [A14, A15]
    know_how: []
refinements: []
know_how_not_read:
  - stage: 1
    body: documentation-standards
    reason: "Documentation Standards reached v0.2 on 19 August, after this stage ran. The body did not exist in any version when the stage was written, and C62 requires the record to say so rather than inferring it from a date: the header carries the current version's date, so a revised body cannot prove it was absent earlier. Recorded forward-only rather than back-filled — re-running the stage would replace an artifact a person has already decided on (PD157, Finding 30). C97 to C100 read this body and report not applicable here for the same reason."
  - stage: 2
    body: documentation-standards
    reason: "Documentation Standards reached v0.2 on 19 August, after this stage ran. The body did not exist in any version when the stage was written, and C62 requires the record to say so rather than inferring it from a date: the header carries the current version's date, so a revised body cannot prove it was absent earlier. Recorded forward-only rather than back-filled — re-running the stage would replace an artifact a person has already decided on (PD157, Finding 30). C97 to C100 read this body and report not applicable here for the same reason."
stale: []
---

# Run state

> **Written by the workflow, never by an agent.** An agent that can mark its own stage `accepted`
> can advance a run past a gate nobody ran. Agents read this file and stop when their preconditions
> are not met; they do not edit it to make themselves runnable.

Maintained by `.github/scripts/run-state.mjs`. `C38` checks that it exists, that every stage status
agrees with the artifacts that stage produced, that nothing is `accepted` without the gates that
accept it, and that the composed-behaviour floor in force (§9.3) is recorded and matches the carrier.
