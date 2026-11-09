---
run_id: 2026-01-mortgage-onboarding
artifact_id: S2
record: run-state
workflow: discovery
mode: discovery
created_at: 2026-08-04
updated_at: 2026-08-10
current_stage: complete
status: complete
behaviours: composed-floor@0.1
stages:
  - id: 1
    name: Brief
    workflow: discovery
    status: accepted
    artifacts: [A1]
    quality_gate:
      id: Q1
      result: pass
      run_at: 2026-08-10
      run_by: "check.mjs, run independently of the producer"
      judged_ran: 2
      judged_not_run: 1
      judged_reason: "no independent checker — every binding pins one model family (PD147, AB-24)"
    decision_gate:
      id: G1
      decided_by: Jana Novakova
      decided_at: 2026-08-10
      by_agent: false
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
      decided_by: "Petr Havel (evidence) and Jana Novakova (scope)"
      decided_at: 2026-08-03
      by_agent: false
    know_how: [evidence-standards@0.5]
  - id: 3
    name: Competitive Analysis
    workflow: competitive-analysis
    status: accepted
    artifacts: [A5, A6, A7]
    quality_gate:
      id: Q3
      result: pass
      run_at: 2026-08-09
      run_by: "check.mjs, run independently of the producer"
      judged_ran: 6
      judged_not_run: 6
      judged_reason: "no independent checker — every binding pins one model family (PD147, AB-24). Every Q3 rule a check can decide is now decided: C66 closed the last one (N3-d, 12 August)"
    know_how: [competitive-analysis-standards@0.4]
  - id: 4
    name: Ideas
    workflow: discovery
    status: accepted
    artifacts: [A8, A8b, A9]
    quality_gate:
      id: Q4
      result: pass
      run_at: 2026-08-09
      run_by: "check.mjs, run independently of the producer"
      judged_ran: 5
      judged_not_run: 1
      judged_reason: "no independent checker — every binding pins one model family (PD147, AB-24). Both rules that needed a check nobody had written closed on 12 August (T9): splitting A8 from A8b gave each of them an artifact to be true about"
    decision_gate:
      id: G4
      decided_by: Jana Novakova
      decided_at: 2026-08-09
      by_agent: false
    know_how: []
  - id: 5
    name: MVP
    workflow: discovery
    status: accepted
    artifacts: [A10, A11]
    quality_gate:
      id: Q5
      result: pass
      run_at: 2026-08-10
      run_by: "check.mjs, run independently of the producer"
      judged_ran: 3
      judged_not_run: 3
      judged_reason: "no independent checker — every binding pins one model family (PD147, AB-24); and 1 of them needs only a check nobody has written"
    decision_gate:
      id: G5
      decided_by: Jana Novakova
      decided_at: 2026-08-10
      by_agent: false
    know_how: []
  - id: 6
    name: PRD
    workflow: discovery
    status: accepted
    artifacts: [A12, A13]
    quality_gate:
      id: Q6
      result: pass
      run_at: 2026-08-10
      run_by: "check.mjs, run independently of the producer"
      judged_ran: 3
      judged_not_run: 0
      judged_reason: "none — every Q6 rule is decided by a check. C67 closed the last one when the PRD Template named a section set to count against (12 August)"
    decision_gate:
      id: G6
      decided_by: Jana Novakova
      decided_at: 2026-08-10
      by_agent: false
    know_how: [prd-template@0.1]
  - id: 7
    name: Initiative
    workflow: discovery
    status: accepted
    artifacts: [A14, A15]
    quality_gate:
      id: Q7
      result: pass
      run_at: 2026-08-10
      run_by: "check.mjs, run independently of the producer"
      judged_ran: 4
      judged_not_run: 2
      judged_reason: "no independent checker — every binding pins one model family (PD147, AB-24)"
    decision_gate:
      id: G7
      decided_by: Jana Novakova
      decided_at: 2026-08-10
      by_agent: false
    know_how: [initiative-template@0.1]
refinements: []
know_how_not_read:
  - stage: 1
    body: documentation-standards
    reason: "Documentation Standards reached v0.2 on 19 August, after this stage ran. The body did not exist in any version when the stage was written, and C62 requires the record to say so rather than inferring it from a date: the header carries the current version's date, so a revised body cannot prove it was absent earlier. Recorded forward-only rather than back-filled — re-running the stage would replace an artifact a person has already decided on (PD157, Finding 30). C97 to C100 read this body and report not applicable here for the same reason."
  - stage: 2
    body: documentation-standards
    reason: "Documentation Standards reached v0.2 on 19 August, after this stage ran. The body did not exist in any version when the stage was written, and C62 requires the record to say so rather than inferring it from a date: the header carries the current version's date, so a revised body cannot prove it was absent earlier. Recorded forward-only rather than back-filled — re-running the stage would replace an artifact a person has already decided on (PD157, Finding 30). C97 to C100 read this body and report not applicable here for the same reason."
  - stage: 3
    body: documentation-standards
    reason: "Documentation Standards reached v0.2 on 19 August, after this stage ran. The body did not exist in any version when the stage was written, and C62 requires the record to say so rather than inferring it from a date: the header carries the current version's date, so a revised body cannot prove it was absent earlier. Recorded forward-only rather than back-filled — re-running the stage would replace an artifact a person has already decided on (PD157, Finding 30). C97 to C100 read this body and report not applicable here for the same reason."
  - stage: 4
    body: documentation-standards
    reason: "Documentation Standards reached v0.2 on 19 August, after this stage ran. The body did not exist in any version when the stage was written, and C62 requires the record to say so rather than inferring it from a date: the header carries the current version's date, so a revised body cannot prove it was absent earlier. Recorded forward-only rather than back-filled — re-running the stage would replace an artifact a person has already decided on (PD157, Finding 30). C97 to C100 read this body and report not applicable here for the same reason."
  - stage: 5
    body: documentation-standards
    reason: "Documentation Standards reached v0.2 on 19 August, after this stage ran. The body did not exist in any version when the stage was written, and C62 requires the record to say so rather than inferring it from a date: the header carries the current version's date, so a revised body cannot prove it was absent earlier. Recorded forward-only rather than back-filled — re-running the stage would replace an artifact a person has already decided on (PD157, Finding 30). C97 to C100 read this body and report not applicable here for the same reason."
  - stage: 6
    body: documentation-standards
    reason: "Documentation Standards reached v0.2 on 19 August, after this stage ran. The body did not exist in any version when the stage was written, and C62 requires the record to say so rather than inferring it from a date: the header carries the current version's date, so a revised body cannot prove it was absent earlier. Recorded forward-only rather than back-filled — re-running the stage would replace an artifact a person has already decided on (PD157, Finding 30). C97 to C100 read this body and report not applicable here for the same reason."
  - stage: 7
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
