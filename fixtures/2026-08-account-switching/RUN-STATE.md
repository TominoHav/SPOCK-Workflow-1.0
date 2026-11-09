---
run_id: 2026-08-account-switching
artifact_id: S2
record: run-state
workflow: discovery
mode: discovery
created_at: 2026-08-26
updated_at: 2026-08-27
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
      run_at: 2026-08-26
      run_by: "check.mjs, run independently of the producer"
      judged_ran: 2
      judged_not_run: 1
      judged_reason: "no independent checker — every binding pins one model family (PD147, AB-24)"
    decision_gate:
      id: G1
      decided_by: Igor Tadic
      decided_at: 2026-08-26
      by_agent: false
    know_how: [brief-fields@0.4, strategy-basis@0.1, output-voice@0.2, documentation-standards@0.4]
  - id: 2
    name: Opportunities
    workflow: problems
    status: accepted
    artifacts: [A2b, A3, A3b, A4]
    quality_gate:
      id: Q2
      result: pass
      run_at: 2026-08-26
      run_by: "check.mjs, run independently of the producer"
      judged_ran: 12
      judged_not_run: 5
      judged_reason: "no independent checker — every binding pins one model family (PD147, AB-24)"
    decision_gate:
      id: G2
      decided_by: Igor Tadic
      decided_at: 2026-08-26
      by_agent: false
    know_how: [evidence-standards@0.7, output-voice@0.2, documentation-standards@0.4, opportunity-framing@0.1]
  - id: 3
    name: Competitive Analysis
    workflow: competitive-analysis
    status: accepted
    artifacts: [A5, A6, A7]
    quality_gate:
      id: Q3
      result: pass
      run_at: 2026-08-27
      run_by: "check.mjs, run independently of the producer"
      judged_ran: 6
      judged_not_run: 6
      judged_reason: "no independent checker — every binding pins one model family (PD147, AB-24)"
    know_how: [competitive-analysis-standards@0.13, output-voice@0.2, documentation-standards@0.5]
  - id: 4
    name: Solutions
    workflow: discovery
    status: accepted
    artifacts: [A8, A8b, A9]
    quality_gate:
      id: Q4
      result: pass
      run_at: 2026-08-27
      run_by: "check.mjs, run independently of the producer"
      judged_ran: 5
      judged_not_run: 1
      judged_reason: "no independent checker — every binding pins one model family (PD147, AB-24)"
    decision_gate:
      id: G4
      decided_by: Igor Tadic
      decided_at: 2026-08-27
      by_agent: false
    know_how: [documentation-standards@0.5, output-voice@0.2, strategy-basis@0.1]
  - id: 5
    name: MVP
    workflow: discovery
    status: accepted
    artifacts: [A10, A11]
    quality_gate:
      id: Q5
      result: pass
      run_at: 2026-08-27
      run_by: "check.mjs, run independently of the producer"
      judged_ran: 3
      judged_not_run: 3
      judged_reason: "no independent checker — every binding pins one model family (PD147, AB-24); and 1 of them needs only a check nobody has written"
    decision_gate:
      id: G5
      decided_by: Igor Tadic
      decided_at: 2026-08-27
      by_agent: false
    know_how: [documentation-standards@0.5, output-voice@0.2, strategy-basis@0.1]
  - id: 6
    name: PRD
    workflow: discovery
    status: accepted
    artifacts: [A12, A13]
    quality_gate:
      id: Q6
      result: pass
      run_at: 2026-08-27
      run_by: "check.mjs, run independently of the producer"
      judged_ran: 3
      judged_not_run: 0
      judged_reason: all quality rules decided by a check
    decision_gate:
      id: G6
      decided_by: Igor Tadic
      decided_at: 2026-08-27
      by_agent: false
    know_how: [prd-template@0.4, strategy-basis@0.1, output-voice@0.2, documentation-standards@0.5]
  - id: 7
    name: Initiative
    workflow: discovery
    status: accepted
    artifacts: [A14, A15]
    quality_gate:
      id: Q7
      result: pass
      run_at: 2026-08-27
      run_by: "check.mjs, run independently of the producer"
      judged_ran: 4
      judged_not_run: 2
      judged_reason: "no independent checker — every binding pins one model family (PD147, AB-24)"
    decision_gate:
      id: G7
      decided_by: Igor Tadic
      decided_at: 2026-08-27
      by_agent: false
    know_how: [initiative-template@0.4, output-voice@0.2, documentation-standards@0.5]
refinements: []
know_how_not_read:
  - stage: 4
    body: compliance-guidelines
    reason: "The compliance tree landed on main on 27 August, after this stage had run and been accepted. It did not exist at any point while the stage was executing: the run's own scores artifact records that six of seven scoring dimensions had no band precisely because this body was parked, and G4 was decided on 30 points of a possible 200 for that reason. Recorded forward-only rather than back-filled. Re-running stage 4 against it would replace artifacts a person has already decided on at G4, and the decision would then name a solution set that no longer exists (PD157, Finding 30). The next run reads it from stage 1."
  - stage: 4
    body: area-compliance
    reason: "Landed with the compliance tree on 27 August, after this stage ran. Same disposition as compliance-guidelines above."
  - stage: 4
    body: area-gdpr
    reason: "Landed with the compliance tree on 27 August, after this stage ran. Same disposition as compliance-guidelines above."
  - stage: 4
    body: area-ict-security
    reason: "Landed with the compliance tree on 27 August, after this stage ran. Same disposition as compliance-guidelines above."
  - stage: 4
    body: area-legal
    reason: "Landed with the compliance tree on 27 August, after this stage ran. Same disposition as compliance-guidelines above."
  - stage: 5
    body: compliance-guidelines
    reason: "The compliance tree landed on main on 27 August, after this stage had run and been accepted. The expanded pilot names the absent body by name where it records that its data handling position has not been reviewed against the bank's own rules. Recorded forward-only: re-running would replace artifacts decided at G5a and G5b."
  - stage: 5
    body: area-compliance
    reason: "Landed with the compliance tree on 27 August, after this stage ran. Same disposition as compliance-guidelines above."
  - stage: 5
    body: area-gdpr
    reason: "Landed with the compliance tree on 27 August, after this stage ran. Same disposition as compliance-guidelines above."
  - stage: 5
    body: area-ict-security
    reason: "Landed with the compliance tree on 27 August, after this stage ran. Same disposition as compliance-guidelines above."
  - stage: 5
    body: area-legal
    reason: "Landed with the compliance tree on 27 August, after this stage ran. Same disposition as compliance-guidelines above."
  - stage: 6
    body: compliance-guidelines
    reason: "The compliance tree landed on main on 27 August, after this stage had run and been accepted at G6. The PRD's compliance touchpoints are marked indicative and name this body as the one that would have governed them. Recorded forward-only: the agreed PRD carries a human signature and re-deriving it would empty that decision of its subject (R6.6-2)."
  - stage: 6
    body: area-compliance
    reason: "Landed with the compliance tree on 27 August, after this stage ran. Same disposition as compliance-guidelines above."
  - stage: 6
    body: area-gdpr
    reason: "Landed with the compliance tree on 27 August, after this stage ran. Same disposition as compliance-guidelines above."
  - stage: 6
    body: area-ict-security
    reason: "Landed with the compliance tree on 27 August, after this stage ran. Same disposition as compliance-guidelines above."
  - stage: 6
    body: area-legal
    reason: "Landed with the compliance tree on 27 August, after this stage ran. Same disposition as compliance-guidelines above."
stale: []
---

# Run state

> **Written by the workflow, never by an agent.** An agent that can mark its own stage `accepted`
> can advance a run past a gate nobody ran. Agents read this file and stop when their preconditions
> are not met; they do not edit it to make themselves runnable.

Maintained by `.github/scripts/run-state.mjs`. `C38` checks that it exists, that every stage status
agrees with the artifacts that stage produced, that nothing is `accepted` without the gates that
accept it, and that the composed-behaviour floor in force (§9.3) is recorded and matches the carrier.
