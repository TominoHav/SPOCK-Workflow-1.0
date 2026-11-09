---
run_id: 2026-09-digital-onboarding-dropoff
artifact_id: A3
ost_role: opportunity
status: accepted
workflow: problems
modified_by: agent
revisions: 1
could_not_verify:
  - rule: "never reads A2 raw material, only the A2b intake record"
    needs: judge
    reach: process
  - rule: "no hypothesis names a thing to build; a solution-shaped candidate is reduced to the need beneath it or recorded as not a problem"
    needs: judge
    reach: content
produced_by:
  agent: hypothesis-designer
  skill: hypothesis-authoring
sources: [A2b]
external_sources: []
assembled_at: 2026-09-08
assembled_from: [R-A3-01]
---

# Problem hypotheses

Five problems were restated from the seven intake observations [rec:R-A3-01]. All five are barrier
problems — friction in the process rather than a fear or a need beneath it — and all five carry the
`weak` tag: six of the seven observations behind them carry no date, and the one that does — Igor Tadic's
own account of two contact-centre calls — is a single origin, one short of what `strong` needs.

## H1 — Losing track of what is left in identity verification

**What is happening.** Applicants lose track of how much of identity verification is left and what
happens next.

**Who it affects.** At least one applicant abandoned at this step for this reason; the funnel table shows
identity verification as one of only two steps with both a high drop-off rate (22.2%) and a high support
signal.

**Evidence.** [A2-item-1-o1] — _"I did not know how many steps were still waiting."_ Corroborated by
[A2-item-2-o1], the aggregated funnel observation for the same step.

**Trust: weak.** Two references, neither with complete provenance — one has no date, the other has no
date and an unestablished origin. The qualifying set is empty, so the tag is weak regardless of the
two-reference count.

**What would change our mind.** A participant who abandons at this step despite already seeing a progress
indicator and a time estimate. No such session is in this run's material.

## H2 — Not knowing whether progress was saved after a failed scan

**What is happening.** Applicants who hit a failed document scan do not know whether their progress was
saved or whether they must start again.

**Who it affects.** At least one applicant, who stopped at that point.

**Evidence.** [A2-item-1-o2] — _"After the scan failed, I was not sure whether I had to start again."_

**Trust: weak.** One reference, one origin, no date recorded. The qualifying set is empty; a single
origin would only reach weak in any case.

**What would change our mind.** A participant who fails the scan, sees an explicit save-state message,
and still cannot tell whether to restart. No such session is in this run's material.

## H3 — Identity creation mistaken for an open account

**What is happening.** Applicants conflate completing identity creation with having an open current
account, around the account setup step.

**Who it affects.** At least one applicant who completed identity creation; the funnel table shows current
account setup as the other step with both a high drop-off rate (22.9%) and a high support signal.

**Evidence.** [A2-item-1-o3] — _"I thought creating the identity meant the account was finished."_
Corroborated by [A2-item-2-o1], the same aggregated funnel observation cited above.

**Trust: weak.** Two references, neither with complete provenance, for the same reasons as the first
hypothesis. The qualifying set is empty.

**What would change our mind.** A participant who completes identity creation and states, unprompted,
that the account is still pending. No such observation is in this run's material.

## H4 — No way back into a dropped application

**What is happening.** Applicants who abandon onboarding partway cannot resume where they left off, and
start a new application from scratch instead.

**Who it affects.** At least one applicant who moved from mobile to desktop after an error and restarted;
and, separately, two contact-centre callers in June 2026 who had dropped an onboarding application and
could not get back into it — one of whom started a third application after the second also stalled.

**Evidence.** [A2-item-1-o4] — the participant who switched device after an error. Corroborated by
[A2-item-3-o1], Igor Tadic's own first-hand account of shadowing the contact centre in June 2026.

**Trust: weak.** Two references. The participant observation carries no date and does not qualify. Igor
Tadic's account carries a date and an established origin, so it is the qualifying set's one member —
enough to move this off an empty qualifying set, not enough on its own to reach `strong`, which needs two
independent origins.

**What would change our mind.** An applicant who abandons onboarding and later resumes the same
application without starting a new one. No such observation is in this run's material.

## H5 — Confirmation steps feel repetitive on a completed journey

**What is happening.** Applicants who complete onboarding experience the number of confirmation steps as
repetitive.

**Who it affects.** At least one applicant, who completed the journey despite the friction.

**Evidence.** [A2-item-1-o5].

**Trust: weak.** One reference, one origin, no date recorded. The qualifying set is empty.

**What would change our mind.** A completed session where the applicant, asked directly, says the number
of confirmations felt appropriate. No such observation is in this run's material.

## What we could not establish

- No date is recorded for six of the seven observations behind these five hypotheses. Igor Tadic's own
  account is the one exception, and it is precise to the month (June 2026) rather than the day.
- The funnel observation's producing team or system is not named, so its origin is `unestablished` and it
  can never count as an independent origin, dated or not.
- Whether the participant observations came from a moderated test or self-report is not stated, and stays
  unresolved at the user's request.
- The quotes attached to three observations are matched by content, not by a stated attribution in the
  source material.

## How this was produced

Stage 2 (Opportunities), `hypothesis-authoring@0.1`, agent `hypothesis-designer`, reading only the intake
record [A2b] — never the raw supplied material.

**Coverage.** All seven observations in the intake record were restated; none was left unattached. Every
reference is cited by its observation id, never by the item it came from, so no hypothesis is graded on
observations it does not rest on.

**Dispositions.** None of the seven observations described a solution-shaped candidate, so nothing was
reduced and nothing was rejected. `rejected[]` is empty.

H4 was revised after the intake record gained its seventh observation — Igor Tadic's own account,
supplied in conversation. Its statement was broadened from a device-switch-specific claim to the general
problem both observations describe, since the new observation reports the same need without naming a
device switch at all. The trust tag on every hypothesis is computed, not asserted: four of the five draw
on an empty qualifying set, because no observation supporting them carries a date; H4 draws on a
qualifying set of exactly one origin, which is enough to leave `unrated` territory but not enough to reach
`strong` (evidence-standards §5.1).
