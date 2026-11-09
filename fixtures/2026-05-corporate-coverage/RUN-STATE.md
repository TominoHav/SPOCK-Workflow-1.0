---
run_id: 2026-05-corporate-coverage
artifact_id: S2
record: run-state
workflow: discovery
mode: discovery
created_at: 2026-08-20
updated_at: 2026-08-21
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
      run_at: 2026-08-20
      run_by: check.mjs
      judged_ran: 2
      judged_not_run: 1
      judged_reason: "no independent checker — every binding pins one model family (PD147, AB-24)"
    decision_gate:
      id: G1
      decided_by: Igor Tadic
      decided_at: 2026-08-20
      by_agent: false
    know_how: [brief-fields@0.3, strategy-basis@0.1, output-voice@0.1, documentation-standards@0.4]
  - id: 2
    name: Problems
    workflow: problems
    status: accepted
    artifacts: [A2b, A3, A4]
    quality_gate:
      id: Q2
      result: pass
      run_at: 2026-08-20
      run_by: check.mjs
      judged_ran: 8
      judged_not_run: 4
      judged_reason: "no independent checker — every binding pins one model family (PD147, AB-24)"
    decision_gate:
      id: G2
      decided_by: Igor Tadic
      decided_at: 2026-08-20
      by_agent: false
    know_how: [evidence-standards@0.7, output-voice@0.1, documentation-standards@0.4]
  - id: 3
    name: Competitive Analysis
    workflow: competitive-analysis
    status: accepted
    artifacts: [A5, A6, A7]
    quality_gate:
      id: Q3
      result: pass
      run_at: 2026-08-20
      run_by: check.mjs
      judged_ran: 6
      judged_not_run: 6
      judged_reason: "no independent checker — every binding pins one model family (PD147, AB-24)"
    know_how: [competitive-analysis-standards@0.12, output-voice@0.1, documentation-standards@0.4]
  - id: 4
    name: Ideas
    workflow: discovery
    status: accepted
    artifacts: [A8, A9, A8b]
    quality_gate:
      id: Q4
      result: pass
      run_at: 2026-08-20
      run_by: check.mjs
      judged_ran: 5
      judged_not_run: 1
      judged_reason: "no independent checker — every binding pins one model family (PD147, AB-24)"
    decision_gate:
      id: G4
      decided_by: Igor Tadic
      decided_at: 2026-08-20
      by_agent: false
    know_how: [strategy-basis@0.1, output-voice@0.1, documentation-standards@0.4]
  - id: 5
    name: MVP
    workflow: discovery
    status: accepted
    artifacts: [A10, A11]
    quality_gate:
      id: Q5
      result: pass
      run_at: 2026-08-20
      run_by: check.mjs
      judged_ran: 3
      judged_not_run: 3
      judged_reason: "no independent checker — every binding pins one model family (PD147, AB-24); and 1 of them needs only a check nobody has written"
    decision_gate:
      id: G5
      decided_by: Igor Tadic
      decided_at: 2026-08-20
      by_agent: false
    know_how: [strategy-basis@0.1, output-voice@0.1, documentation-standards@0.4]
  - id: 6
    name: PRD
    workflow: discovery
    status: accepted
    artifacts: [A12, A13]
    quality_gate:
      id: Q6
      result: pass
      run_at: 2026-08-20
      run_by: check.mjs
      judged_ran: 3
      judged_not_run: 0
      judged_reason: all quality rules decided by a check
    decision_gate:
      id: G6
      decided_by: Igor Tadic
      decided_at: 2026-08-20
      by_agent: false
    know_how: [prd-template@0.4, strategy-basis@0.1, output-voice@0.1, documentation-standards@0.4]
  - id: 7
    name: Initiative
    workflow: discovery
    status: accepted
    artifacts: [A14, A15]
    quality_gate:
      id: Q7
      result: pass
      run_at: 2026-08-20
      run_by: check.mjs
      judged_ran: 4
      judged_not_run: 2
      judged_reason: "no independent checker — every binding pins one model family (PD147, AB-24)"
    decision_gate:
      id: G7
      decided_by: Igor Tadic
      decided_at: 2026-08-20
      by_agent: false
    know_how: [initiative-template@0.4, output-voice@0.1, documentation-standards@0.4]
refinements: []
know_how_not_read: []
stale: []
---

# Run state

> **Written by the workflow, never by an agent.** An agent that can mark its own stage `accepted`
> can advance a run past a gate nobody ran. Agents read this file and stop when their preconditions
> are not met; they do not edit it to make themselves runnable.

Maintained by `.github/scripts/run-state.mjs`. `C38` checks that it exists, that every stage status
agrees with the artifacts that stage produced, that nothing is `accepted` without the gates that
accept it, and that the composed-behaviour floor in force (§9.3) is recorded and matches the carrier.
