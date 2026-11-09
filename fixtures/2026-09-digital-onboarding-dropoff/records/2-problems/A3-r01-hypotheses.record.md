---
run_id: 2026-09-digital-onboarding-dropoff
record_id: R-A3-01
artifact_id: A3
item_id: ""
produced_at: 2026-09-08
bounds_hit: []
trace_id: []
sources: [A2b]
external_sources: []
hypotheses:
  - id: H1
    statement: "Applicants lose track of how much of identity verification is left and what happens next."
    evidence: [A2-item-1-o1, A2-item-2-o1]
    trust: weak
    rationale: "Two references, but neither reaches complete provenance: A2-item-1-o1 carries no date, and A2-item-2-o1 carries no date and an unestablished origin. The qualifying set is empty, so the tag is weak regardless of the two-reference count (evidence-standards §5.1). Had A2-item-1-o1 carried a date it would still be one qualifying origin on its own, since a funnel reference with no named producing system can never corroborate independently."
    disconfirming: "A participant who abandons at identity verification despite a visible progress indicator and a time estimate already on screen would contradict this. No such session is in this run's material; the observation to get is a recording of a participant at that step who has already been shown a progress indicator."
    themes: [progress visibility, remaining steps]
    kind: barrier
  - id: H2
    statement: "Applicants who hit a failed document scan do not know whether their progress was saved or whether they must start again."
    evidence: [A2-item-1-o2]
    trust: weak
    rationale: "One reference, one origin (participant-2), no date recorded, so provenance is incomplete and the qualifying set is empty. A single origin would still only reach weak even with a date, since strong needs two independent origins."
    disconfirming: "A participant who fails the document scan, sees an explicit save-state message, and still cannot tell whether to restart would contradict this. No such session is in this run's material; the observation to get is a session where a save-state message was shown at the point of failure."
    themes: [error recovery, save state]
    kind: barrier
  - id: H3
    statement: "Applicants conflate completing identity creation with having an open current account, around account setup."
    evidence: [A2-item-1-o3, A2-item-2-o1]
    trust: weak
    rationale: "Two references, neither with complete provenance: A2-item-1-o3 carries no date, and A2-item-2-o1 carries no date and an unestablished origin. The qualifying set is empty, so the tag is weak (evidence-standards §5.1)."
    disconfirming: "A participant who completes identity creation and states, unprompted, that the current account is still pending would contradict this. No such observation is in this run's material; the observation to get is a session where the applicant is shown a screen that explicitly distinguishes identity status from account status."
    themes: [step vs account confusion]
    kind: barrier
  - id: H4
    statement: "Applicants who abandon onboarding partway cannot resume where they left off, and start a new application from scratch instead."
    evidence: [A2-item-1-o4, A2-item-3-o1]
    trust: weak
    rationale: "Two references. A2-item-1-o4 (participant-4) carries no date, so it does not qualify. A2-item-3-o1 (igor-tadic) carries a date and an established origin, so it is the qualifying set's one member. One origin is not enough for strong — the tag stays weak, but now on a qualifying set that actually holds something, rather than on one that is empty (evidence-standards §5.1)."
    disconfirming: "An applicant who abandons onboarding and later resumes the same application without starting a new one would contradict this. No such observation is in this run's material; the observation to get is a session log showing a resumed application rather than a fresh one."
    themes: [no resume path, cross-device continuity]
    kind: barrier
  - id: H5
    statement: "Applicants who complete onboarding experience the number of confirmation steps as repetitive."
    evidence: [A2-item-1-o5]
    trust: weak
    rationale: "One reference, one origin (participant-5), no date recorded, so provenance is incomplete and the qualifying set is empty. A single origin caps this at weak regardless."
    disconfirming: "A participant who completes onboarding and, asked directly, says the number of confirmations felt appropriate rather than repetitive would contradict this. No such observation is in this run's material; the observation to get is a completed session where the applicant is asked directly about the confirmation count."
    themes: [confirmation fatigue]
    kind: barrier
rejected: []
observations_read: [A2-item-1-o1, A2-item-1-o2, A2-item-1-o3, A2-item-1-o4, A2-item-1-o5, A2-item-2-o1, A2-item-3-o1]
not_evidence: []
not_restated: "none — all seven observations from the intake record were restated"
carried_unresolved:
  - ref: A2-item-1
    question: "no date is recorded for any participant observation; the user confirmed on 2026-09-08 that none is known"
  - ref: A2-item-2
    question: "the funnel table names no producing team or system; its origin is unestablished"
  - ref: A2-item-1
    question: "whether the participant observations came from a moderated test or self-report is not stated, and was left unresolved at the user's request"
  - ref: A2-item-1-o1
    question: "the quote attached to this observation is matched by content, not by a stated attribution"
  - ref: A2-item-1-o2
    question: "the quote attached to this observation is matched by content, not by a stated attribution"
  - ref: A2-item-1-o3
    question: "the quote attached to this observation is matched by content, not by a stated attribution"
  - ref: A2-item-3
    question: "the observed date is precise to the month (June 2026); no exact day was given or asked for, since month-level precision already gives complete provenance"
---

# Problem hypotheses — record

Five hypotheses were restated from the seven observations in the intake record. None was solution-shaped,
so nothing was reduced or rejected. Every hypothesis carries at least one reference; six of the seven
observations still carry no date, and one — Igor Tadic's own account — does, so every tag is `weak` on
either an empty qualifying set or a one-origin one, and never on an asserted judgement.
