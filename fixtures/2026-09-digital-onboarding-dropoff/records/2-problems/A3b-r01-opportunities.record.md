---
run_id: 2026-09-digital-onboarding-dropoff
record_id: R-A3b-01
artifact_id: A3b
item_id: ""
produced_at: 2026-09-08
bounds_hit: []
trace_id: []
sources: [A3]
external_sources: []
opportunities:
  - id: O1
    from: H1
    description: "Applicants lose track of how much of identity verification is left and what happens next. Themes: progress visibility; remaining steps."
    as_is: 'Applicants reach identity verification, do not know how many steps remain or how much time is left, and abandon at that point — "I did not know how many steps were still waiting."'
    outcome: "Applicants know how much of identity verification remains and what happens next, so they continue rather than abandon at that step."
    segment: "New ČSAS retail clients opening their first current account through the current digital onboarding journey, narrowed to those who reach identity verification before abandoning."
    sizing:
      customers:
        statement: "Identity verification is one of the two biggest drop-off points in the funnel (22.2%); the requester expects this to affect a large share of applicants, tied to that step's own drop-off rate."
        basis: supplied
      market:
        statement: ""
        basis: deferred_to_stage_3
      company:
        statement: "Removing this barrier at the highest-drop step directly reduces avoidable abandonment in the onboarding journey, which is what AI-2 measures per the brief's link."
        basis: derived
      impact:
        statement: "High — applicants have already handed over documents and completed the hardest part; losing them here means losing them after the greatest invested effort, which the requester judges worse than losing them early."
        basis: judgement
    validation:
      trust: weak
      insights: ["Two references: one participant observation and one aggregated funnel observation, corroborating the same step", "Neither reaches complete provenance — the participant observation carries no date, and the funnel observation carries no date and an unestablished origin", "The qualifying set is empty, so the tag is weak regardless of the two-reference count", "Would be contradicted by a participant who abandons at this step despite already seeing a progress indicator and a time estimate"]
    root_cause:
      statement: ""
      basis: unknown
    alternatives: "Empty — stage 4 produces solution directions; framing does not propose them."
    metrics:
      behavioural: "Not settled — the brief's success_signal is unknown"
      business: "End-to-end digital onboarding completion rate, targeted at 30% completion (key result AI-2)"
      qualitative: "Not settled — the brief's qualitative_signal is unknown"
      horizon: "Not settled — the brief's time_horizon is unknown"
    risks: ["No date on either reference behind this opportunity, so it cannot move past weak without further evidence", "The disconfirming case: a participant who abandons at this step despite already seeing a progress indicator and a time estimate"]
  - id: O2
    from: H2
    description: "Applicants who hit a failed document scan do not know whether their progress was saved or whether they must start again. Themes: error recovery; save state."
    as_is: 'Applicants whose document scan fails do not know whether their progress was saved, retry once, and then abandon rather than risk repeating the whole process — "After the scan failed, I was not sure whether I had to start again."'
    outcome: "Applicants who hit a failed document scan know whether their progress was saved and what to do next, so they continue rather than abandon."
    segment: "New ČSAS retail clients opening their first current account through the current digital onboarding journey, narrowed to those who reach the document scan step and fail it."
    sizing:
      customers:
        statement: "Expected smaller than O1 and O3; no measured figure is available."
        basis: supplied
      market:
        statement: ""
        basis: deferred_to_stage_3
      company:
        statement: "Removing this barrier reduces avoidable abandonment in the onboarding journey, which is what AI-2 measures per the brief's link."
        basis: derived
      impact:
        statement: "Medium — the scan failure itself is recoverable; what turns it into abandonment is not knowing whether the completed work still counts, so applicants retry once and then stop rather than risk repeating the whole process."
        basis: judgement
    validation:
      trust: weak
      insights: ["One reference, one origin (participant-4)", "No date recorded, so it does not reach complete provenance", "A single origin would only reach weak in any case, so the tag is not solely a consequence of the missing date", "Would be contradicted by a participant who fails the scan, sees an explicit save-state message, and still cannot tell whether to restart"]
    root_cause:
      statement: ""
      basis: unknown
    alternatives: "Empty — stage 4 produces solution directions; framing does not propose them."
    metrics:
      behavioural: "Not settled — the brief's success_signal is unknown"
      business: "End-to-end digital onboarding completion rate, targeted at 30% completion (key result AI-2)"
      qualitative: "Not settled — the brief's qualitative_signal is unknown"
      horizon: "Not settled — the brief's time_horizon is unknown"
    risks: ["No date recorded for the one reference behind this opportunity", "The disconfirming case: a participant who fails the scan, sees an explicit save-state message, and still cannot tell whether to restart"]
  - id: O3
    from: H3
    description: "Applicants conflate completing identity creation with having an open current account, around the account setup step. Themes: step vs account confusion."
    as_is: 'Applicants complete identity creation, believe the account is already open, and do not continue through account setup — "I thought creating the identity meant the account was finished."'
    outcome: "Applicants understand that completing identity creation does not mean the account is open, so they continue through account setup rather than believing they are finished."
    segment: "New ČSAS retail clients opening their first current account through the current digital onboarding journey, narrowed to those who complete identity creation and reach account setup."
    sizing:
      customers:
        statement: "Current account setup is the other of the two biggest drop-off points in the funnel (22.9%); the requester expects this to affect a large share of applicants, tied to that step's own drop-off rate."
        basis: supplied
      market:
        statement: ""
        basis: deferred_to_stage_3
      company:
        statement: "Removing this barrier at the other highest-drop step directly reduces avoidable abandonment in the onboarding journey, which is what AI-2 measures per the brief's link."
        basis: derived
      impact:
        statement: "Ranked second highest of the five, after O4, per the requester."
        basis: judgement
    validation:
      trust: weak
      insights: ["Two references: one participant observation and one aggregated funnel observation, corroborating the same step", "Neither reaches complete provenance — the participant observation carries no date, and the funnel observation carries no date and an unestablished origin", "The qualifying set is empty, so the tag is weak regardless of the two-reference count", "Would be contradicted by a participant who completes identity creation and states, unprompted, that the account is still pending"]
    root_cause:
      statement: ""
      basis: unknown
    alternatives: "Empty — stage 4 produces solution directions; framing does not propose them."
    metrics:
      behavioural: "Not settled — the brief's success_signal is unknown"
      business: "End-to-end digital onboarding completion rate, targeted at 30% completion (key result AI-2)"
      qualitative: "Not settled — the brief's qualitative_signal is unknown"
      horizon: "Not settled — the brief's time_horizon is unknown"
    risks: ["No date on either reference behind this opportunity, so it cannot move past weak without further evidence", "The disconfirming case: a participant who completes identity creation and states, unprompted, that the account is still pending"]
  - id: O4
    from: H4
    description: "Applicants who abandon onboarding partway cannot resume where they left off, and start a new application from scratch instead. Themes: no resume path; cross-device continuity."
    as_is: "Applicants who abandon onboarding partway cannot resume the same application; they start a new one from scratch. A contact-centre account describes an applicant who dropped a second application and started a third."
    outcome: "Applicants who abandon onboarding partway can pick up where they left off, so they complete one application rather than starting several."
    segment: "New ČSAS retail clients opening their first current account through the current digital onboarding journey, narrowed to those who abandon onboarding partway, across any step."
    sizing:
      customers:
        statement: "Expected smaller than O1 and O3; no measured figure is available."
        basis: supplied
      market:
        statement: ""
        basis: deferred_to_stage_3
      company:
        statement: "Removing this barrier reduces applicants starting duplicate applications, which is abandonment of the first attempt, directly reducing avoidable abandonment as AI-2's link states."
        basis: derived
      impact:
        statement: "Costs the most of the five: these applicants wanted the product and were made to start over, per the requester."
        basis: judgement
    validation:
      trust: weak
      insights: ["Two references: one participant observation (device switch) and one first-hand account from the requester (two contact-centre calls)", "The participant observation carries no date and does not qualify", "The requester's account carries a date (June 2026) and an established origin, so it is the qualifying set's one member", "One origin is not enough for strong, which needs two independent origins", "Would be contradicted by an applicant who abandons onboarding and later resumes the same application without starting a new one"]
    root_cause:
      statement: ""
      basis: unknown
    alternatives: "Empty — stage 4 produces solution directions; framing does not propose them."
    metrics:
      behavioural: "Not settled — the brief's success_signal is unknown"
      business: "End-to-end digital onboarding completion rate, targeted at 30% completion (key result AI-2)"
      qualitative: "Not settled — the brief's qualitative_signal is unknown"
      horizon: "Not settled — the brief's time_horizon is unknown"
    risks: ["The one dated reference is precise to the month (June 2026) rather than the day", "A second independent origin is needed to move this past weak", "The disconfirming case: an applicant who abandons onboarding and later resumes the same application without starting a new one"]
  - id: O5
    from: H5
    description: "Applicants who complete onboarding experience the number of confirmation steps as repetitive. Themes: confirmation fatigue."
    as_is: "Applicants complete onboarding despite finding the number of confirmation steps repetitive."
    outcome: "Applicants complete onboarding without experiencing the confirmation steps as repetitive."
    segment: "New ČSAS retail clients opening their first current account through the current digital onboarding journey, narrowed to those who complete the journey."
    sizing:
      customers:
        statement: "Affects everyone who completes the onboarding journey, per the requester."
        basis: supplied
      market:
        statement: ""
        basis: deferred_to_stage_3
      company:
        statement: "This opportunity concerns friction after completion rather than abandonment, so its contribution to AI-2's completion-rate mechanism is indirect at best — it would move satisfaction rather than the completion rate itself."
        basis: derived
      impact:
        statement: "An irritation, not a loss, per the requester."
        basis: judgement
    validation:
      trust: weak
      insights: ["One reference, one origin (participant-5)", "No date recorded, so it does not reach complete provenance", "A single origin would only reach weak in any case", "Would be contradicted by a completed session where the applicant, asked directly, says the number of confirmations felt appropriate"]
    root_cause:
      statement: ""
      basis: unknown
    alternatives: "Empty — stage 4 produces solution directions; framing does not propose them."
    metrics:
      behavioural: "Not settled — the brief's success_signal is unknown"
      business: "The brief's completion-rate metric measures drop-off; this opportunity concerns friction after completion, so it does not move that metric directly"
      qualitative: "Not settled — the brief's qualitative_signal is unknown"
      horizon: "Not settled — the brief's time_horizon is unknown"
    risks: ["No date recorded for the one reference behind this opportunity", "The disconfirming case: a completed session where the applicant, asked directly, says the number of confirmations felt appropriate"]
---

# Framed opportunities — record

Five opportunities, one per A3 hypothesis, none added and none dropped. Every root cause is unknown: the
requester confirmed directly that no RCA has been run on any of the five. Market factors is deferred to
stage 3 on every opportunity, never marked unknown, since stage 3 produces exactly that answer and runs
after G2. Customer counts and importance were supplied by the requester for all five, as a qualitative
judgement rather than a measured figure in most cases, and are marked `supplied` / `judgement`
accordingly — never as evidence, and never inheriting the opportunity's trust tag.
