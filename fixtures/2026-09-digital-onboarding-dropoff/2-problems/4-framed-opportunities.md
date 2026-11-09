---
run_id: 2026-09-digital-onboarding-dropoff
artifact_id: A3b
ost_role: opportunity
status: accepted
workflow: problems
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "the opportunity outcome states a change in behaviour and never a thing to build"
    needs: judge
    reach: artifact
produced_by:
  agent: hypothesis-designer
  skill: opportunity-framing
sources: [A3]
external_sources: []
assembled_at: 2026-09-08
assembled_from: [R-A3b-01]
---

# Framed opportunities

Five opportunities, one per problem hypothesis, sized on ČS's template [rec:R-A3b-01]. Root cause is
unknown on all five — no RCA has been run on any of them. Customer counts and importance came from the
requester as judgement rather than measured figures for four of the five; market factors defers to stage
3 on every one.

## O1 — Losing track of what is left in identity verification

**1. Problem / opportunity description.** Applicants lose track of how much of identity verification is
left and what happens next.

**2a. Sizing — customers.** Identity verification is one of the two biggest drop-off points in the funnel
(22.2%); the requester expects this to affect a large share of applicants, tied to that step's own
drop-off rate. _(supplied)_

**2b. Sizing — market factors.** Deferred to stage 3, which produces this and runs after G2.

**2c. Sizing — company factors.** Removing this barrier at the highest-drop step directly reduces
avoidable abandonment in the onboarding journey, which is what AI-2 measures per the brief's link.
_(derived)_

**2d. Sizing — customer impact.** High — applicants have already handed over documents and completed the
hardest part; losing them here means losing them after the greatest invested effort, which the requester
judges worse than losing them early. _(judgement)_

**3. Current behaviour, as-is.** Applicants reach identity verification, do not know how many steps
remain or how much time is left, and abandon at that point — _"I did not know how many steps were still
waiting."_

**4. Desired change.** Applicants know how much of identity verification remains and what happens next,
so they continue rather than abandon at that step.

**5. Segment.** New ČSAS retail clients opening their first current account through the current digital
onboarding journey, narrowed to those who reach identity verification before abandoning.

**7. Validation.** `weak`. Two references corroborate the same step, and neither reaches complete
provenance — the participant observation carries no date, and the funnel observation carries no date and
an unestablished origin. The qualifying set is empty. Would be contradicted by a participant who abandons
at this step despite already seeing a progress indicator and a time estimate.

**8. Root cause.** Unknown — no RCA has been run.

**9. Alternative solution directions.** Empty. Stage 4 produces these.

**10. Success metrics.** Behavioural: not settled, the brief's success signal is unknown. Business:
end-to-end digital onboarding completion rate, targeted at 30% (key result AI-2). Qualitative: not
settled. Horizon: not settled.

**11. Risks and uncertainties.** No date on either reference, so this cannot move past weak without
further evidence. Disconfirming case above.

## O2 — Not knowing whether progress was saved after a failed scan

**1. Problem / opportunity description.** Applicants who hit a failed document scan do not know whether
their progress was saved or whether they must start again.

**2a. Sizing — customers.** Expected smaller than O1 and O3; no measured figure is available. _(supplied)_

**2b. Sizing — market factors.** Deferred to stage 3.

**2c. Sizing — company factors.** Removing this barrier reduces avoidable abandonment in the onboarding
journey, which is what AI-2 measures per the brief's link. _(derived)_

**2d. Sizing — customer impact.** Medium — the scan failure itself is recoverable; what turns it into
abandonment is not knowing whether the completed work still counts, so applicants retry once and then
stop rather than risk repeating the whole process. _(judgement)_

**3. Current behaviour, as-is.** Applicants whose document scan fails do not know whether their progress
was saved, retry once, and then abandon rather than risk repeating the whole process — _"After the scan
failed, I was not sure whether I had to start again."_

**4. Desired change.** Applicants who hit a failed document scan know whether their progress was saved
and what to do next, so they continue rather than abandon.

**5. Segment.** New ČSAS retail clients opening their first current account through the current digital
onboarding journey, narrowed to those who reach the document scan step and fail it.

**7. Validation.** `weak`. One reference, one origin (participant-4), no date recorded, so provenance is
incomplete; a single origin would only reach weak in any case. Would be contradicted by a participant who
fails the scan, sees an explicit save-state message, and still cannot tell whether to restart.

**8. Root cause.** Unknown — no RCA has been run.

**9. Alternative solution directions.** Empty. Stage 4 produces these.

**10. Success metrics.** Behavioural: not settled. Business: end-to-end digital onboarding completion
rate, targeted at 30% (key result AI-2). Qualitative: not settled. Horizon: not settled.

**11. Risks and uncertainties.** No date recorded for the one reference. Disconfirming case above.

## O3 — Identity creation mistaken for an open account

**1. Problem / opportunity description.** Applicants conflate completing identity creation with having an
open current account, around the account setup step.

**2a. Sizing — customers.** Current account setup is the other of the two biggest drop-off points in the
funnel (22.9%); the requester expects this to affect a large share of applicants, tied to that step's own
drop-off rate. _(supplied)_

**2b. Sizing — market factors.** Deferred to stage 3.

**2c. Sizing — company factors.** Removing this barrier at the other highest-drop step directly reduces
avoidable abandonment in the onboarding journey, which is what AI-2 measures per the brief's link.
_(derived)_

**2d. Sizing — customer impact.** Ranked second highest of the five, after O4, per the requester.
_(judgement)_

**3. Current behaviour, as-is.** Applicants complete identity creation, believe the account is already
open, and do not continue through account setup — _"I thought creating the identity meant the account was
finished."_

**4. Desired change.** Applicants understand that completing identity creation does not mean the account
is open, so they continue through account setup rather than believing they are finished.

**5. Segment.** New ČSAS retail clients opening their first current account through the current digital
onboarding journey, narrowed to those who complete identity creation and reach account setup.

**7. Validation.** `weak`. Two references corroborate the same step, and neither reaches complete
provenance, for the same reasons as O1. The qualifying set is empty. Would be contradicted by a
participant who completes identity creation and states, unprompted, that the account is still pending.

**8. Root cause.** Unknown — no RCA has been run.

**9. Alternative solution directions.** Empty. Stage 4 produces these.

**10. Success metrics.** Behavioural: not settled. Business: end-to-end digital onboarding completion
rate, targeted at 30% (key result AI-2). Qualitative: not settled. Horizon: not settled.

**11. Risks and uncertainties.** No date on either reference. Disconfirming case above.

## O4 — No way back into a dropped application

**1. Problem / opportunity description.** Applicants who abandon onboarding partway cannot resume where
they left off, and start a new application from scratch instead.

**2a. Sizing — customers.** Expected smaller than O1 and O3; no measured figure is available. _(supplied)_

**2b. Sizing — market factors.** Deferred to stage 3.

**2c. Sizing — company factors.** Removing this barrier reduces applicants starting duplicate
applications, which is abandonment of the first attempt, directly reducing avoidable abandonment as
AI-2's link states. _(derived)_

**2d. Sizing — customer impact.** Costs the most of the five: these applicants wanted the product and
were made to start over, per the requester. _(judgement)_

**3. Current behaviour, as-is.** Applicants who abandon onboarding partway cannot resume the same
application; they start a new one from scratch. A contact-centre account describes an applicant who
dropped a second application and started a third.

**4. Desired change.** Applicants who abandon onboarding partway can pick up where they left off, so they
complete one application rather than starting several.

**5. Segment.** New ČSAS retail clients opening their first current account through the current digital
onboarding journey, narrowed to those who abandon onboarding partway, across any step.

**7. Validation.** `weak`. Two references: one participant observation of a device switch, and one
first-hand account from the requester of two contact-centre calls. The participant observation carries no
date and does not qualify; the requester's account carries a date (June 2026) and an established origin,
so it is the qualifying set's one member. One origin is not enough for `strong`, which needs two
independent origins. Would be contradicted by an applicant who abandons onboarding and later resumes the
same application without starting a new one.

**8. Root cause.** Unknown — no RCA has been run.

**9. Alternative solution directions.** Empty. Stage 4 produces these.

**10. Success metrics.** Behavioural: not settled. Business: end-to-end digital onboarding completion
rate, targeted at 30% (key result AI-2). Qualitative: not settled. Horizon: not settled.

**11. Risks and uncertainties.** The one dated reference is precise to the month rather than the day. A
second independent origin is needed to move this past weak. Disconfirming case above.

## O5 — Confirmation steps feel repetitive on a completed journey

**1. Problem / opportunity description.** Applicants who complete onboarding experience the number of
confirmation steps as repetitive.

**2a. Sizing — customers.** Affects everyone who completes the onboarding journey, per the requester.
_(supplied)_

**2b. Sizing — market factors.** Deferred to stage 3.

**2c. Sizing — company factors.** This opportunity concerns friction after completion rather than
abandonment, so its contribution to AI-2's completion-rate mechanism is indirect at best — it would move
satisfaction rather than the completion rate itself. _(derived)_

**2d. Sizing — customer impact.** An irritation, not a loss, per the requester. _(judgement)_

**3. Current behaviour, as-is.** Applicants complete onboarding despite finding the number of confirmation
steps repetitive.

**4. Desired change.** Applicants complete onboarding without experiencing the confirmation steps as
repetitive.

**5. Segment.** New ČSAS retail clients opening their first current account through the current digital
onboarding journey, narrowed to those who complete the journey.

**7. Validation.** `weak`. One reference, one origin (participant-5), no date recorded, so provenance is
incomplete; a single origin would only reach weak in any case. Would be contradicted by a completed
session where the applicant, asked directly, says the number of confirmations felt appropriate.

**8. Root cause.** Unknown — no RCA has been run.

**9. Alternative solution directions.** Empty. Stage 4 produces these.

**10. Success metrics.** Behavioural: not settled. Business: the brief's completion-rate metric measures
drop-off; this opportunity concerns friction after completion, so it does not move that metric directly.
Qualitative: not settled. Horizon: not settled.

**11. Risks and uncertainties.** No date recorded for the one reference. Disconfirming case above.

## What we could not establish

- Root cause is unknown on all five opportunities. The requester confirmed directly that no RCA — Five
  Whys, Fishbone or otherwise — has been run on any of them.
- Customer counts (2a) are the requester's own expectation rather than a measured figure for O2 and O4;
  O1, O3 and O5 tie to a stated signal (the funnel rate, or "everyone who completes") but are still not a
  precise count.
- Market factors (2b) is deferred to stage 3 on every opportunity, which has not run yet.
- Success signal, qualitative signal and time horizon are unsettled on every opportunity because the
  brief itself does not settle them.

## How this was produced

Stage 2.3 (Opportunity framing), `opportunity-framing@0.1`, agent `hypothesis-designer`, reading only A3
and the brief — never the intake record or the raw supplied material.

Every hypothesis in A3 was framed exactly once; none was added and none dropped. The trust tag, its
origin count, its proximity mix and its disconfirming condition were carried across from A3 unchanged —
framing added no evidence and recomputed nothing.

Three of the eleven sections needed the requester: customer counts and importance were asked and
answered, across three short rounds rather than one long one, at the requester's own request after the
first round tried to ask all fifteen questions at once. Root cause was asked and came back unknown for
all five, in one answer. Alternatives (9) stays empty by design — stage 4 produces solution directions,
and a framing step that proposed one would pre-empt it. Section 12, the recommended next step, is not
produced here: it is read off the G2 decision, which has not happened yet.

Whether each opportunity's outcome (4) states a change in behaviour rather than a thing to build is a
judgement, not a check; it is carried in this artifact's `could_not_verify` so the person at G2 meets it
on the document rather than having to know to look elsewhere.
