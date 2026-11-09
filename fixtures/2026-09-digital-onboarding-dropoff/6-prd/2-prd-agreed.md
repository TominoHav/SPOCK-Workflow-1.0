---
run_id: 2026-09-digital-onboarding-dropoff
artifact_id: A13
ost_role: artifact
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
sources: [A11, A9, A4, A3b, A1]
external_sources: []
assembled_at: 2026-09-08
assembled_from: [R-A13-01]
produced_by:
  agent: business-analyst
  skill: prd
could_not_verify: []
agreement_block:
  name: Igor Tadic
  date: 2026-09-08
decision:
  gate: G6
  by_agent: false
  selection: G6
  accepted_by:
    - name: Igor Tadic
      role: Product manager
  accepted_at: 2026-09-08
  changed_during_refinement: none
  refinements: []
---

# Durable session for identity verification and resumption — PRD

This document defines eight requirements for OPT1, the durable-session capability selected at G5a:
nineteen compliance touchpoints are designed into those requirements and one — registering the new store
against ČS's access-and-deletion process — remains an open item with no named owner. The alignment to
AI-2 survives the narrowing from two MVP options to one, and TL-1 is named as a strain the requirements
below are built to hold rather than to ignore. [rec:R-A13-01]

## Overview

This document defines the requirements for the durable-session capability expanded at A11 — OPT1, the
option selected at G5a: applicant progress during identity verification is written to durable session
storage rather than held only in the current screen or device. That stored state powers two things. While
the applicant is still in the journey, it drives a live, updating estimate of what remains. If the
applicant leaves entirely — closes the app, changes device, comes back days later — the same stored state
is what a returning applicant can be restored into, once they have re-run the original identity check in
full, rather than a blank new application. The capability is built on both the app and the web channel
together from the first release, and the stored state is kept for up to 30 days from the applicant's last
activity before automatic deletion. [rec:R-A13-01]

## Problem

**O1 — Losing track of what is left in identity verification** (`weak` trust tag, A3b/A4 primary).
Applicants lose track of how much of identity verification is left and what happens next, and abandon at
the step carrying the largest single drop-off in the funnel (22.2%). This capability's live estimate takes
the desired change directly: applicants know how much remains and continue rather than abandon.

**O4 — No way back into a dropped application** (`weak` trust tag, A4 primary, placed third on measured
volume rather than on the requester's own account of the worst single experience). Applicants who abandon
onboarding partway currently cannot resume the same application and start a new one from scratch. This
capability's cross-device resumption, gated by the original identity check, takes the desired change
directly: applicants who abandon partway pick up where they left off instead of starting several
applications.

Both trace to A4's prioritised set, both carry `weak` because neither reaches the two independent origins
`strong` requires, and neither disposes of that weakness here — it is A3b's and A4's finding, carried
forward rather than restated more confidently. [rec:R-A13-01]

## Users

New ČSAS retail clients opening their first current account through the current digital onboarding
journey (A1's segment), narrowed two ways for this capability: those who reach identity verification
before abandoning (O1's segment), and those who abandon onboarding partway, across any step (O4's
segment). They are people who have already started the harder part of opening an account — handed over
documents, begun identity verification — and either lose track of what remains while they are still in it,
or leave and have no way back once they do. [rec:R-A13-01]

## Success measures

**The measure.** End-to-end digital onboarding completion rate, the brief's own business measure,
targeted at 30% completion (A1). This capability is not a separate metric from the run's own — it is one
of the mechanisms the run tests for moving it, alongside the share of resumed sessions that go on to
complete, read alongside the completion rate (A11's product-level metric).

**The baseline.** 30% completion is the target, not the current baseline. The current process's own
completion rate is not stated in the material this run reads. **Open item, owned by Igor Tadić** — he
will have the figure before the pilot starts. The kill criterion below does not depend on it.

**The horizon.** Medium term, three to twelve months. The funnel runs at roughly a thousand starts a
month, and that window is what it takes to accumulate enough completed journeys on both sides of the
change to read a difference rather than two weeks of noise.

**The owner.** Igor Tadić, product manager. He reads the result and says what it showed.

**The kill criterion.** If fewer than one in twenty applicants who abandon come back through the resume
path, the pilot stops. That result would mean those applicants left for reasons the session never
touched, and building more of this capability would be building the wrong thing better. [rec:R-A13-01]

## Requirements

### R1 — Live progress estimate during identity verification

While an applicant is in identity verification, a live, updating estimate of what remains is shown,
reading from the same session state that is written continuously as the applicant moves through the
step, so the estimate is never stale relative to what the applicant has actually done. This addresses O1.

**Acceptance criteria.** Given an applicant is in identity verification and completes a sub-step, when the
next screen loads, then the estimate of what remains reflects that completed sub-step rather than the
estimate shown before it. Given the session write fails or is delayed, when the estimate would be shown,
then the applicant is not shown an estimate known to be stale — the specific fallback behaviour is not
established and is named as an open question for delivery rather than assumed.

*Traces to:* A11, A4 (O1).

### R2 — Cross-device resumption gated by full identity re-verification

An applicant who left onboarding partway, on either channel, can return on either channel and be restored
into their saved application, but only after re-running the original identity check in full — the same
check, not a lighter one. A link, an email or an SMS may invite the applicant back, but carries no
authority to resume on its own; it points at the identity check, and the check decides whether the session
is rebuilt. Remembering an applicant's progress across a device or session is recorded as a deliberate
exemption decision at design time (IT-06), and the resumption path is specified to the same authentication
strength, session-ending behaviour and recovery standard as login elsewhere in the journey (IT-01, IT-04).
Identification (the re-run check), authentication and any signature step stay three separate steps at
resumption, exactly as the original application (LG-05). This addresses O4.

**Acceptance criteria.** Given an applicant abandoned on the app and returns on the web, when they accept
a resumption invitation, then they are taken to the same identity check the original application used, in
full, before any saved state is shown. Given the identity check at resumption fails, when it fails, then no
saved state is shown and the applicant is treated as starting a new application. Given an applicant returns
after the retention window has expired, when they attempt resumption, then they are told the saved
application is no longer available rather than shown a failed or partial restore.

*Traces to:* A11, A4 (O4).

### R3 — Durable session retention, disclosed to the applicant

Session state is kept for up to 30 days from the applicant's last activity, and is deleted automatically
at expiry (DP-07). The session-state field is documented with its purpose — resuming an incomplete
application — and its legal basis, before it is built (DP-01). The 30-day window and the requirement to
re-verify identity at resumption are disclosed at the point the applicant would first notice them —
leaving the journey — with the same visual weight as the resumption capability itself, not only in a terms
document (TP-15, LG-07). The live estimate and the 30-day window are treated as commitments the bank has
to be able to stand behind, reviewed as contractual terms rather than as UI copy (LG-11).

**Acceptance criteria.** Given an applicant leaves the journey partway, when they leave, then they are
shown the 30-day retention window and the re-verification requirement, at the same visual weight as the
resumption offer. Given 30 days pass with no activity on a session, when the retention period expires,
then the session state is deleted and a returning applicant is treated as starting over.

*Traces to:* A11.

### R4 — Resumption endpoint access control and audit logging

Access control and audit logging for the resumption endpoint are specified at design time: who may call
it, under what session, and what is logged (DP-29). The endpoint's callers, its security testing, its
logging and its hosting are each specified before build, on both channels (IT-16). Session writes,
resumption attempts and expiries are logged at a level that lets someone reconstruct what happened to one
applicant's session afterward (IT-22).

**Acceptance criteria.** Given a call is made to the resumption endpoint, when it is made, then the
caller's identity, the session it acted on, and the outcome are logged. Given an unauthorised caller
attempts to invoke the endpoint, when the attempt is made, then it is rejected and logged as a security
event.

*Traces to:* A11.

### R5 — Client-facing wording reviewed against the fair, clear, not-misleading standard

The progress display, the retention-window disclosure and the resumption screens are new client-facing
wording, reviewed against the fair, clear and not-misleading standard before release, with any promotional
framing marked as such (TP-11).

**Acceptance criteria.** Given any of the three new surfaces is drafted, when it is reviewed before
release, then the review records that it meets the fair, clear, not-misleading standard or names what
changed to meet it.

*Traces to:* A11.

### R6 — Accessibility of new screens and the re-verification step

The progress display and resumption screens, on both channels, are built and tested to the same
accessibility bar as the rest of the journey before release (TP-32). The re-run identity check invoked at
resumption is accessibility-tested as its own step rather than assumed covered by the original journey's
check (TP-33).

**Acceptance criteria.** Given the progress display, the resumption screens, or the re-verification step
is built, when it is tested, then it is tested against the same accessibility bar as the rest of the
onboarding journey, and the result is recorded per surface rather than as one pass for all three.

*Traces to:* A11.

### R7 — Instrumentation and an audit trail of what was shown

Completion, resumption and drop-off after each new screen are instrumented on both channels from first
release, so the data this pilot is read against exists before launch (TP-38). The retention-window
disclosure and the resumption invitation shown to an applicant are logged with what was shown and when
(TP-39).

**Acceptance criteria.** Given an applicant reaches, completes, resumes or drops off at any new screen,
when the event occurs, then it is recorded on both channels from the point of first release. Given an
applicant is shown the retention-window disclosure or a resumption invitation, when it is shown, then the
content shown and the time it was shown are logged.

*Traces to:* A11.

### R8 — Incident classification and recovery objectives for the new failure surface

A failed resumption or a failed live estimate is classified as an incident type before launch, so it can
be triaged on the reporting clock (IT-19). Recovery time and data-loss objectives for the new session store
are stated before launch rather than assumed (IT-20). This requirement is what keeps the strategic strain
on TL-1 (clients affected by outages of key digital channels) from moving the wrong way, rather than
assuming the new store and endpoint are neutral to it.

**Acceptance criteria.** Given the resumption path or the live estimate fails in production, when it
fails, then it is classified against a named incident type rather than triaged ad hoc. Given the session
store is designed, when its recovery objectives are set, then a recovery time objective and a data-loss
objective are stated and recorded before launch.

*Traces to:* A11.

## Non-functional requirements

**Performance.** No update-cadence or latency target for the live estimate is established; the current
process has no measured baseline for this, and none is invented here. It is named as an open build-time
question in Dependencies below.

**Security.** The resumption endpoint is specified to the same authentication strength and session-ending
behaviour as login elsewhere in the journey (R2, IT-01), with access control and audit logging specified
at design time (R4, DP-29, IT-16). Session writes, resumption attempts and expiries are logged to a level
that supports reconstructing what happened to one applicant's session (R4, IT-22).

**Data handling.** Session state is retained for up to 30 days from last activity and deleted automatically
at expiry (R3, DP-07); the field is documented with its purpose and legal basis before build (R3, DP-01).
Whether this new store is registered against ČS's access-and-deletion process has no named owner yet
(DP-15, open — see Dependencies).

**Accessibility.** The progress display, the resumption screens and the re-verification step are each
tested to the accessibility bar in force since June 2025, individually rather than as one pass (R6,
TP-32, TP-33).

**Availability.** Recovery time and data-loss objectives for the new session store are required before
launch (R8, IT-20), but the specific numbers are not stated here — they are a design-time output this
document requires rather than a target this stage can state. [rec:R-A13-01]

## Out of scope

**O2 — not knowing whether progress was saved after a failed scan**, and **O3 — identity creation mistaken
for an open account.** Both are opportunities this run carries (A4) that this capability does not address;
A9 recorded that gap at selection and it is not picked up here.

**OPT2 — short-lived, same-device recovery.** The alternative way to pilot the selected solution (A10) was
not selected at G5a; this document defines OPT1 only.

**A future EU Identity Wallet route, and existing-client access recovery.** Both are excluded at the
brief's own scope (A1) and nothing in this capability touches either.

**Children, entrepreneurs, corporate clients, and sanctioned clients.** Excluded at the brief's own scope
(A1); this capability is scoped to new ČSAS retail clients only.

**Redesign of AML or KYC policy, product pricing, parameters or eligibility rules, and product acquisition
strategy.** All excluded at the brief's own scope (A1); this capability changes neither the identity check
itself nor the account's terms. [rec:R-A13-01]

## Dependencies

**Which specialist five fired escalation triggers route to.** G-E6 and G-E12 (GDPR and privacy, because
G11 and G1 could not be resolved from the description) and I-E1, I-E12 and I-E13 (ICT and security,
because I3, I5 and I4 could not be resolved). No card carried by this run names the role any of the five
routes to; this is an ask to ČS, not a gap this document can close.

**Who owns registering the new session store against ČS's access-and-deletion process.** DP-15, carried
unresolved from A11 — no team has yet been named.

**Eight build-time questions this pilot's technical build has to settle**, carried unresolved from A11:
which vendor, SaaS tool or partner would process client data for it; where the new store and endpoint
would be hosted, and whether outside the EEA; what security controls protect them; the deployment
approach, testing scope and whether a new environment is created; whether open-source or third-party
components are used to build it; whether the new dependency supports something clients rely on in the
DORA sense; how hard it would be to leave a chosen provider; and whether this service would be registered
under the cyber regime.

**A performance target for the live estimate.** No update-cadence or latency baseline exists in the
material this run reads; a delivery team sizing R1 needs one and this document does not supply it.

**The current end-to-end completion rate.** Open item, owned by Igor Tadić — today's number against
which the 30% target is read. Due before the pilot starts; the kill criterion does not depend on it.
[rec:R-A13-01]

## What we could not establish

Whether any of the eight build-time questions above changes what this pilot can ethically or legally do,
rather than only how it is hosted or built, could not be established — each depends on a vendor or
infrastructure choice nobody has made yet, carried forward from A11 unchanged. Which specialist the five
open escalations and DP-15's registration route to could not be established either; no card this run
carries names one. [rec:R-A13-01]

## Agreement

**Name:** _________________________ **Date:** _________________________

*This block is completed by the Product Manager at G6. It is left empty here — a completed block is what
turns this document into the agreed PRD.*

## How this was produced

Stage 6.2 of the discovery workflow, the `prd` skill, run by the Business Analyst. This document is the
draft (A12) carried forward unchanged: no refinement round was recorded between the two, so its content is
identical to A12's, section for section, and the agreement block below is the only difference the person's
signature is meant to make. Read the expanded MVP (A11, its own sections rather than only the decision),
the selected solution (A9), the prioritised opportunities (A4), the framed opportunities (A3b), the
initiative brief (A1), the Strategy Basis and the Compliance Guidelines together with its four area cards,
and the PRD Template at the version its own header declares. Every compliance touchpoint carried from A11
is bound here: nineteen inside a requirement, and one — DP-15 — as an open item with no named owner. None
was dropped. This document exists so the agreement task has somewhere to write the mark; nothing above is
a person's agreement, and it carries no `decision:` block until one exists. [rec:R-A13-01]
