---
run_id: 2026-09-digital-onboarding-dropoff
artifact_id: A8
ideas:
  - id: SOL1
    solves: [O1, O3]
    supported_by: [bankid-identity-verification, no-differentiation-at-opening-step]
    statement: "A persistent, semantically-accurate progress display that runs through identity verification and into account opening, showing the client exactly what is done, what remains, and that identity creation is not the same as an open account."
    compliance_touchpoints:
      - "TP-11 — client-facing screens change to add a persistent progress display naming each remaining step"
      - "TP-32 — the app/web view is changed wherever the display appears"
      - "TP-38 — the display's own engagement and any residual drop-off after it ships has to be monitored"
      - "LG-11 — showing a step count and a completion state functions as a statement of what remains, which the bank has to be able to stand behind"
      - "DP-01 — the client's current position in the journey is a new stored field tied to an identifiable applicant"
      - "DP-15 — that stored position becomes a data point a subject-access or deletion request would have to reach"
      - "IT-19 — a client-facing display that fails silently is a failure the client would notice"
      - "IT-20 — a persistent, cross-step display is a new way the journey can fail that did not exist as a single feature before"
      - "IT-22 — showing a computed state on screen means something new is being written to a log to compute it from"
  - id: SOL2
    solves: [O3, O4]
    supported_by: [no-differentiation-at-opening-step, no-visible-resume-capability]
    statement: "Proactive, bank-initiated outreach — push, SMS or email — triggered when a client completes identity but stalls before account opening, or abandons the journey outright, each message stating plainly what has and has not happened and offering a direct way back in."
    compliance_touchpoints:
      - "TP-11 — new client-facing message templates for two distinct moments in the journey"
      - "TP-38 — outreach effectiveness and complaint volume need their own post-launch monitoring"
      - "TP-39 — a record of which message was sent and when has to exist to answer a client who disputes being contacted"
      - "DP-01 — a new stored field marks that an applicant reached O3's or O4's trigger condition"
      - "DP-13 — the privacy notice has to describe this new purpose — contacting an applicant about an incomplete application — as service communication, distinct from the marketing purposes it already lists"
      - "DP-15 — the new trigger and outreach record is a store a subject-access or deletion request would have to reach"
      - "DP-17 — an applicant can still ask not to receive this contact, as a general objection to processing rather than a marketing opt-out, because it is not marketing"
      - "DP-29 — the trigger logic itself is a new interface reading and acting on personal data"
      - "DP-30 — a direct link back into the application plausibly carries an identifying token in its own URL"
      - "IT-16 — a new trigger and notification API is introduced to detect the stall or abandonment condition and fire the message"
      - "IT-19 — a client-facing message that fires wrongly or not at all is a visible failure"
      - "IT-20 — the trigger logic is a new way the journey can fail that did not exist before"
      - "IT-21 — a link inviting a client back into an unfinished application is a plausible phishing pattern fraud teams have to account for"
      - "IT-22 — firing, suppressing and recording each outreach message is new information a log has to carry"
  - id: SOL3
    solves: [O1, O4]
    supported_by: [no-visible-resume-capability, no-differentiation-at-opening-step]
    statement: "A durable session that survives the client leaving — surfaced during identity verification as a live estimate of what remains, and, if the client leaves entirely, as an exact point of return rather than a restart."
    compliance_touchpoints:
      - "TP-11 — the verification screens gain a live estimate and the resumption flow adds new client-facing screens, including the stated 30-day retention window"
      - "TP-15 — the stated time or step estimate, and the stated 30-day retention window, are disclosed limits the bank has to be able to stand behind"
      - "TP-32 — the app/web view changes for the estimate and for the resume entry point"
      - "TP-33 — returning to a saved session re-runs the applicant's original identity check in full"
      - "TP-38 — resumption and abandonment-after-resumption both need their own post-launch monitoring"
      - "TP-39 — a record of what state the session was saved at has to exist to resolve a disputed resumption"
      - "DP-01 — the session's saved state is a new field held against an identifiable applicant, for up to the stated 30 days"
      - "DP-07 — a half-finished application is kept for a stated 30 days from last activity, then deleted; the period is declared rather than open-ended"
      - "DP-15 — the saved session is a store a subject-access or deletion request would have to reach"
      - "DP-29 — the resumption endpoint is a new interface exposing the applicant's partially completed data, gated by the same identity check as the original application"
      - "LG-05 — the applicant re-runs the same identity check the original application used before any saved state is shown, never a link alone"
      - "LG-07 — the stated 30-day retention window is a new limit told to the client"
      - "LG-11 — the live step and time estimate, and the stated retention window, function as stated expectations the bank is held to"
      - "IT-01 — returning to a saved session is a changed form of login, gated by the same identity check as the original application rather than a link"
      - "IT-04 — this is, by design, the recovery-after-losing-a-session case"
      - "IT-06 — the session itself is what is being remembered, by design, across time and device, for up to the stated 30 days"
      - "IT-16 — a resumption endpoint is a new API the journey did not have before"
      - "IT-19 — a session that fails to restore correctly is a failure the client would notice directly"
      - "IT-20 — durable session state is a new way the journey can fail that a stateless journey did not have"
      - "IT-22 — restoring and expiring session state is new information a log has to carry"
  - id: SOL4
    solves: [O2, O3]
    supported_by: [no-differentiation-at-opening-step]
    statement: "An explicit confirmation, in the client's own terms, at the two points in the journey where the current design leaves an inference gap: immediately after a failed document scan, and immediately after identity is created."
    compliance_touchpoints:
      - "TP-11 — two new confirmation screens are added at the scan-failure and identity-completion moments"
      - "TP-32 — the app/web view changes at both points"
      - "TP-38 — whether the confirmations actually reduce abandonment at these two points has to be monitored after launch"
      - "TP-39 — a record of the confirmation the applicant was shown supports resolving a later dispute about what they were told"
      - "DP-01 — a flag marking that the applicant was shown each confirmation is a new stored field tied to the applicant"
      - "DP-15 — that flag is a store a subject-access request would have to reach"
      - "IT-19 — a confirmation that fails to display, or displays the wrong state, is a failure the client would notice directly"
      - "IT-20 — the two new confirmation points are new places the journey can fail that did not exist before"
      - "IT-22 — recording that each confirmation was shown is new information a log has to carry"
  - id: SOL5
    solves: [O2, O4]
    supported_by: [no-visible-resume-capability, no-differentiation-at-opening-step]
    statement: "One self-service recovery action, available to the client both immediately after a failed scan and, separately, after full abandonment, that returns them to exactly where their application stood."
    compliance_touchpoints:
      - "TP-11 — a new recovery entry point is added at the scan-failure moment and as a standalone return route"
      - "TP-15 — where a recovery window is time-limited, that limit has to be disclosed to the client"
      - "TP-32 — the app/web view changes for the recovery entry points"
      - "TP-33 — resuming re-runs an authentication or identification step"
      - "TP-38 — how often the recovery action is used, and by whom, has to be monitored after launch"
      - "TP-39 — a record of what state was recovered supports resolving a disputed resumption"
      - "DP-01 — the recoverable application state is a new field held against an identifiable applicant for longer than a single visit"
      - "DP-15 — that stored state is a store a subject-access or deletion request would have to reach"
      - "DP-29 — the recovery endpoint is a new interface exposing the applicant's partially completed data"
      - "DP-30 — the recovery route plausibly carries an identifying or session token in its own URL or code"
      - "LG-05 — the applicant is identified again, remotely, at the point of recovery"
      - "LG-22 — the recovery mechanism itself, if built on a third-party or open-source component, carries a licence to check"
      - "IT-01 — recovering into a saved application is a changed form of login"
      - "IT-03 — a one-time code or equivalent step-up is a plausible way to re-verify the returning applicant"
      - "IT-04 — this is, by design, the recovery-after-losing-access case, generalised to any exit point"
      - "IT-06 — the saved application state is what is being remembered, by design, across time and device"
      - "IT-16 — a recovery endpoint is a new API the journey did not have before"
      - "IT-19 — a recovery action that fails to restore the correct state is a failure the client would notice directly"
      - "IT-20 — the recovery action is a new way the journey can fail that a single-attempt journey did not have"
      - "IT-21 — a recovery route reachable outside the original session is a plausible account-recovery-style fraud vector"
      - "IT-22 — recovering and expiring saved state is new information a log has to carry"
  - id: SOL6
    solves: [O1, O2]
    supported_by: [no-visible-resume-capability]
    statement: "A live handoff to a banker — by branch or contact centre — who sees the applicant's own in-progress application exactly as it stands and finishes it with them, at the two moments a client is most likely to reach for a person without having abandoned outright: losing track mid-verification, and a failed scan they cannot resolve alone."
    compliance_touchpoints:
      - "TP-11 — staff scripts and any client-facing message about calling in or visiting a branch change to reflect that a live application can be continued rather than restarted"
      - "TP-36 — the support and contact-centre journey itself changes — staff now see and continue a digital application in progress rather than starting a fresh one"
      - "TP-38 — how often the handoff is used, and whether it improves completion, has to be monitored after launch"
      - "TP-39 — a record of what the banker saw and did has to exist to reconstruct a disputed handoff"
      - "DP-01 — the client's in-progress application remains a stored field tied to an identifiable applicant, now read by a second internal audience"
      - "DP-13 — the privacy notice has to describe that branch and contact-centre staff can see an in-progress digital application"
      - "DP-15 — the same stored application is a store a subject-access or deletion request would have to reach"
      - "DP-29 — staff tooling reading the applicant's live application state is a new interface exposing personal data"
      - "DP-31 — branch and contact-centre staff gain access to an applicant's in-progress data they could not see before"
      - "LG-05 — the applicant is identified again, by phone or in person, before the banker continues their application"
      - "IT-16 — a new integration is needed so staff tooling can read the same state the digital journey produces"
      - "IT-19 — a banker who cannot see the correct application state is a failure the client would notice directly"
      - "IT-20 — the staff-facing handoff is a new way the journey can fail that did not exist before"
      - "IT-21 — a handoff that identifies a caller by less than the full identity check is a plausible social-engineering vector"
      - "IT-22 — what a banker saw and changed on a live application is new information a log has to carry"
ost_role: solution
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
produced_by:
  agent: product-manager
  skill: ideation
sources: []
external_sources: []
assembled_at: 2026-09-08
assembled_from: [R-A8-01, R-A8-02, R-A8-03, R-A8-04, R-A8-05, R-A8-06]
could_not_verify:
  - rule: "3..10 solutions, each a distinct combination of opportunities, never a rephrasing"
    needs: judge
    reach: artifact
  - rule: "no complexity value and no score is written in a compliance section"
    needs: judge
    reach: artifact
  - rule: "each solution is screened against itself, and identical sections across the set are reported rather than differentiated"
    needs: judge
    reach: artifact
---

# Six ways to close the gap onboarding leaves open

Six solutions, each a distinct combination of this run's opportunities bound to the market evidence behind
it. Every primary opportunity — O1, O3 and O4 — is addressed by at least one solution, and no solution's
opportunity set sits inside another's. None is scored, ranked or recommended here; that choice is the
Product Manager's, at this stage's decision gate.

<!-- SOLUTIONS -->

| | Solution | Touchpoints | Areas in play |
|---|---|---|---|
| **SOL1** | One progress state, always visible and honest | 9 | A1, A2, A3, A4 |
| **SOL2** | The bank follows up when the moment passes | 14 | A1, A2, A4 |
| **SOL3** | A session that survives the client leaving | 20 | A1, A2, A3, A4 |
| **SOL4** | Say what just happened, at the two points that cause doubt | 9 | A1, A2, A4 |
| **SOL5** | Retry and return are the same button | 20 | A1, A2, A3, A4 |
| **SOL6** | A banker finishes it with you, on the same application | 15 | A1, A2, A3, A4 |

## SOL1 - One progress state, always visible and honest

### What it is

A single, persistent progress indicator that runs alongside the whole onboarding journey — from the start
of identity verification through to the account genuinely being open — and that names the current step,
what remains, and the two states applicants currently conflate: "your identity has been created" and "your
account is open." It is not a generic percentage bar; it is a small set of named, sequential milestones the
client can see at every point in the journey, including the moment identity creation completes and account
opening has not yet started.

### What it does

It removes the two specific failures O1 and O3 name by replacing an absence of state with a persistent one.
For O1, an applicant partway through identity verification stops guessing how much is left, because the
remaining steps are named on screen the whole time they are working through it. For O3, an applicant who
has just finished creating their identity sees, in the same place, that account opening is the next
distinct step rather than the end of the journey — closing the exact gap the requester described applicants
falling into.

### How it does it

The indicator is a fixed strip present on every screen from the start of identity verification onward,
holding a short, named sequence of milestones rather than a percentage. When identity creation completes,
the indicator visibly advances to a milestone reading something like "identity created — account opening
next" rather than disappearing or reading complete, so the applicant cannot mistake one for the other
without being told otherwise on the same screen they are looking at. Staff-facing support tooling shows the
same milestone state, so a contact-centre agent sees exactly what the applicant sees when a call comes in
mid-journey.

### The problem it solves, and for whom

New ČSAS retail clients opening their first current account currently reach identity verification with no
reliable read on how much is left, and reach the end of identity creation believing — reasonably, given what
the screen shows them — that the account itself is already open. Both are new retail clients narrowed to
the same segment the brief and A4 both name: those who have started the current onboarding journey and have
not yet abandoned it.

### Opportunities it is built on

- **O1** — Losing track of what is left in identity verification. Takes the desired change directly:
  applicants who know how much of verification remains and what happens next continue rather than abandon
  at that step.
- **O3** — Identity creation mistaken for an open account. Takes the desired change directly: applicants
  who see, at the moment identity creation completes, that account opening is still ahead of them, continue
  rather than believing they are finished.

### Against the market

**Standards it is built on.** Five of the nine market participants profiled verify identity through
federated infrastructure (BankID) rather than a proprietary flow (`bankid-identity-verification`), which is
the same category of step this solution instruments — ČS already holds this standard by virtue of BankID
membership, and this solution does not change how identity is verified, only how its state is shown back to
the applicant during and after it.

**Trends it rides.** The synthesis's clearest single finding is that no participant profiled differentiates
on the identity-verification or account-opening step at all (`no-differentiation-at-opening-step`) — every
stated market claim concerns what happens after an account is open. This solution moves directly into that
unclaimed ground: it is not matching a competitor's progress display, because this pass found none to match,
and it is not competing on anything the market has already settled either.

### Strategic alignment

This run's product goal is reducing avoidable abandonment in the current digital onboarding journey,
measured by end-to-end digital onboarding completion rate against key result AI-2 (AI First: share of sales
and service processes in primary digital channels that are fully straight-through). The chain is one step:
applicants who no longer abandon at O1's and O3's steps complete the journey straight through in the same
digital channel they started in, which is exactly what AI-2 measures, per the brief's own stated link
between this metric and that key result.

The full touchpoint sweep behind this section is at [rec:R-A8-01].

### Compliance

In play: Compliance, conduct and product regulation (S1, S12, S13, S2) · GDPR and privacy (G1, G11, G2, G3, G4) · Legal and contracts (L10, L11) · ICT and security (I1, I4, I5, I9). 5 escalation trigger(s) fired: G-E6 in GDPR and privacy, because G11 is unresolved; G-E12 in GDPR and privacy, because G1 is unresolved; I-E1 in ICT and security, because I3 is unresolved; I-E12 in ICT and security, because I5 is unresolved; I-E13 in ICT and security, because I4 is unresolved. **No card names the role a fired trigger routes to**, so where each one goes is an open ask to ČS. 12 question(s) could not be answered from the solution as written, each naming the input that would settle it.

**# of touchpoints: 9**

#### Compliance, conduct and product regulation

*What the client is told*

> **TP-11 · Any client-facing screen, document, email, SMS or script changes** · engages S1
>
> Product has to have the wording reviewed against the fair, clear and not misleading standard and make marketing identifiable as marketing, because that is a legal test rather than a tone preference

*Accessibility*

> **TP-32 · Any client-facing website, app or web view changes** · engages S13
>
> Product has to meet the accessibility bar of perceivable, operable, understandable and robust, because it has been in force in Czechia since June 2025 and consumer banking is expressly in scope

*Controls*

> **TP-38 · Something about the product has to be monitored after launch** · engages S12, S2
>
> Product has to make sure the data needed for post-launch monitoring exists, because monitoring is an obligation and cannot run on data nobody collected

#### GDPR and privacy

*Collecting and holding*

> **DP-01 · The product stores personal data — any field about an identifiable person** · engages G1, G2, G3, G11
>
> Product has to write down why it needs each stored field and cut the ones it cannot justify, because every field needs a purpose and a legal basis on record

*Telling the client and letting them act*

> **DP-15 · The client asks for their data, or asks for it to be deleted** · engages G4, G3
>
> Product has to register the new data store with the team that answers access and deletion requests, because a store nobody told them about makes the client's right fail silently

#### Legal and contracts

*What the client is committed to*

> **LG-11 · The bank promises a time, a rate or an outcome** · engages L10, L11
>
> Product has to treat a promise made in the journey as a contractual term, because it binds whether or not it appears in the contract document

#### ICT and security

*When something goes wrong*

> **IT-19 · The service could fail in a way clients notice** · engages I4, I5, I1
>
> Product has to make the failure classifiable quickly, because major incidents run on a reporting clock that starts before anyone has diagnosed the cause

> **IT-20 · A new failure mode is introduced** · engages I5, I4
>
> Product has to state recovery time and data loss objectives, because they cannot be assumed after the fact

> **IT-22 · The initiative changes what is logged** · engages I9, I4
>
> Product has to log enough for someone who was not there to reconstruct what happened, because that is the bar the logs are judged against

#### Open items

- **DP-12**, GDPR and privacy — Production data is copied to a test, demo or analytics environment. **Settled by `release_and_environment`**
- **DP-26**, GDPR and privacy — **Data is stored or accessed outside the EEA**. **Settled by `hosting_and_data_location`**
- **DP-32**, GDPR and privacy — Something could go wrong in a way that exposes client data. **Settled by `security_measures`**
- **LG-22**, Legal and contracts — Open-source or third-party software is embedded. **Settled by `components_and_libraries`**
- **IT-12**, ICT and security — An open-source or third-party component is added. **Settled by `components_and_libraries`**
- **IT-13**, ICT and security — Data is stored in a new location or a new cloud region. **Settled by `hosting_and_data_location`**
- **IT-14**, ICT and security — Support or administration happens from outside the EEA. **Settled by `hosting_and_data_location`**
- **IT-15**, ICT and security — A new environment is created. **Settled by `release_and_environment`**
- **IT-23**, ICT and security — A vulnerability is found in something the product uses. **Settled by `components_and_libraries`**
- **IT-24**, ICT and security — Release cadence or deployment approach changes. **Settled by `release_and_environment`**
- **IT-25**, ICT and security — Testing scope changes. **Settled by `release_and_environment`**
- **IT-27**, ICT and security — The affected service is one the bank registered under the cyber regime. **Settled by `registered_under_cyber_regime`**

## SOL2 - The bank follows up when the moment passes

### What it is

A rule-based, bank-initiated outreach capability: when an applicant reaches one of two specific states —
has completed identity creation but has not continued into account opening (O3), or has abandoned the
onboarding journey outright at any step (O4) — the bank sends a message through an existing channel (push,
SMS or email) stating plainly what has and has not happened, and offering one direct link back into the
application.

### What it does

For O3, it catches the applicant who believed identity creation was the finish line and tells them, outside
the session they have already closed, that one step remains. For O4, it catches every abandonment regardless
of where it happened and offers a way back rather than leaving the applicant to start over on their own
initiative or not at all. Both moments are treated as the bank's initiative rather than the client's;
behaviourally, an applicant who would not have returned on their own now receives a specific, worded
invitation to.

### How it does it

A trigger watches for the two states — no continuation into account opening within a set window after
identity completes, and no journey activity within a set window at any earlier step — and fires exactly one
message per trigger, worded to the state it fired on rather than a generic reminder. The message states what
is done and what is left in one sentence and carries a single link that returns the applicant to precisely
where they stopped. No further messages are sent once the applicant returns or the application is completed
or formally abandoned.

**This is service communication about an application the applicant already started, not marketing about a
product they have not chosen, and the two are kept distinct by construction rather than by a label attached
afterwards.** The message concerns only the status of an application already in progress, carries no
promotional content, no offer, no rate and no comparison, and is sent under the same basis that lets the
bank tell an applicant their own application needs attention — not under marketing consent, and not opted
out of by a marketing preference. **What makes it one and not the other is the content and the trigger**: it
fires only because this specific applicant started this specific application, and it says only what has and
has not happened to it. A message promoting a different product, a better rate, or an unrelated offer would
be marketing and would need marketing consent under a different basis entirely; this message never carries
either, so it is never that.

### The problem it solves, and for whom

New ČSAS retail clients who leave the current onboarding journey — whether believing, wrongly, that they are
finished (O3), or abandoning it entirely partway through (O4) — currently have no route back other than
remembering to return and, for those who abandon outright, starting an entirely new application from
scratch.

### Opportunities it is built on

- **O3** — Identity creation mistaken for an open account. Takes the desired change by reaching the
  applicant after the session has already closed, when the in-journey UI can no longer reach them.
- **O4** — No way back into a dropped application. Takes the desired change directly: applicants who
  abandoned partway are invited to pick up where they left off rather than starting over.

### Against the market

**Standards it is built on.** None directly — outreach of this kind is not one of the seven standards this
pass found, so this solution is not matching a settled market pattern.

**Trends it rides.** The synthesis's strongest single finding is that no participant profiled shows any
save-and-resume capability for a dropped application (`no-visible-resume-capability`) — this is precisely
O4, and the market this pass reached has not visibly solved it at all, proactively or otherwise. The
universal absence of differentiation at the opening step (`no-differentiation-at-opening-step`) also covers
O3 directly: nobody competes on catching a client who mistakenly believes they are finished.

### Strategic alignment

Applicants recovered by this outreach convert an abandoned or stalled application into a completed one,
which is exactly what the run's metric — end-to-end digital onboarding completion rate — counts, and that
metric's link to key result AI-2 (AI First) is the one step the brief already states. The chain does not
require a second link: a recovered application is a straight-through completion in the same digital channel.

The full touchpoint sweep behind this section is at [rec:R-A8-02].

### Compliance

In play: Compliance, conduct and product regulation (S1, S12, S2, S3) · GDPR and privacy (G1, G10, G11, G2, G3, G4, G7) · ICT and security (I1, I10, I11, I2, I4, I5, I7, I9). 5 escalation trigger(s) fired: G-E6 in GDPR and privacy, because G11 is unresolved; G-E12 in GDPR and privacy, because G1 is unresolved; I-E1 in ICT and security, because I3 is unresolved; I-E12 in ICT and security, because I5 is unresolved; I-E13 in ICT and security, because I4 is unresolved. **No card names the role a fired trigger routes to**, so where each one goes is an open ask to ČS. 22 question(s) could not be answered from the solution as written, each naming the input that would settle it.

**# of touchpoints: 14**

#### Compliance, conduct and product regulation

*What the client is told*

> **TP-11 · Any client-facing screen, document, email, SMS or script changes** · engages S1
>
> Product has to have the wording reviewed against the fair, clear and not misleading standard and make marketing identifiable as marketing, because that is a legal test rather than a tone preference

*Controls*

> **TP-38 · Something about the product has to be monitored after launch** · engages S12, S2
>
> Product has to make sure the data needed for post-launch monitoring exists, because monitoring is an obligation and cannot run on data nobody collected

> **TP-39 · A record has to be kept to prove what a client was told or agreed** · engages S12, S1, S3
>
> Product has to keep records that can reconstruct what a client was told, because retention periods differ by product type

#### GDPR and privacy

*Collecting and holding*

> **DP-01 · The product stores personal data — any field about an identifiable person** · engages G1, G2, G3, G11
>
> Product has to write down why it needs each stored field and cut the ones it cannot justify, because every field needs a purpose and a legal basis on record

*Telling the client and letting them act*

> **DP-13 · The privacy notice needs to change** · engages G2
>
> Product has to update the privacy notice before launch, because a product doing something the notice does not describe is running without the transparency the law requires

> **DP-15 · The client asks for their data, or asks for it to be deleted** · engages G4, G3
>
> Product has to register the new data store with the team that answers access and deletion requests, because a store nobody told them about makes the client's right fail silently

> **DP-17 · The client objects to processing or to marketing** · engages G4, G7
>
> Product has to stop marketing to anyone who objects, with no exception path, because objection to direct marketing is absolute

*Keeping it safe*

> **DP-29 · A new interface exposes personal data** · engages G10
>
> Product has to define access control and logging for the new interface as part of the design, because both are design decisions with a legal consequence

> **DP-30 · An identifier is displayed, logged or put in a URL** · engages G10, G3
>
> Product has to keep identifiers out of URLs, because a URL leaks through browser referrers, server logs and screenshots

#### Legal and contracts

Nothing in this area was engaged. **It was examined and found nothing**, which is not the same as not being looked at.

#### ICT and security

*Exposing an interface*

> **IT-16 · A new API or integration is exposed** · engages I2, I7, I9, I10
>
> Product has to define who may call the interface, how it gets security tested, what it logs and where it runs, because the bank must evidence each one separately

*When something goes wrong*

> **IT-19 · The service could fail in a way clients notice** · engages I4, I5, I1
>
> Product has to make the failure classifiable quickly, because major incidents run on a reporting clock that starts before anyone has diagnosed the cause

> **IT-20 · A new failure mode is introduced** · engages I5, I4
>
> Product has to state recovery time and data loss objectives, because they cannot be assumed after the fact

> **IT-21 · Fraud exposure changes** · engages I11, I4, I2
>
> Product has to update fraud detection alongside the product and confirm the reporting route, because detection tuned to the old journey misses the new one

> **IT-22 · The initiative changes what is logged** · engages I9, I4
>
> Product has to log enough for someone who was not there to reconstruct what happened, because that is the bar the logs are judged against

#### Open items

- **DP-07**, GDPR and privacy — Data is kept after the client relationship ends. **Settled by `retention_periods`**
- **DP-12**, GDPR and privacy — Production data is copied to a test, demo or analytics environment. **Settled by `release_and_environment`**
- **DP-23**, GDPR and privacy — A vendor, SaaS tool or partner processes client data. **Settled by `third_parties`**
- **DP-26**, GDPR and privacy — **Data is stored or accessed outside the EEA**. **Settled by `hosting_and_data_location`**
- **DP-32**, GDPR and privacy — Something could go wrong in a way that exposes client data. **Settled by `security_measures`**
- **LG-22**, Legal and contracts — Open-source or third-party software is embedded. **Settled by `components_and_libraries`**
- **LG-24**, Legal and contracts — A supplier processes something the product depends on. **Settled by `third_parties`**
- **IT-07**, ICT and security — **A vendor, SaaS product or cloud service is introduced**. **Settled by `third_parties`**
- **IT-08**, ICT and security — The dependency supports something clients rely on. **Settled by `critical_or_important_function`**
- **IT-09**, ICT and security — The provider is one the bank already depends on heavily. **Settled by `third_parties`**
- **IT-10**, ICT and security — The provider subcontracts part of the service. **Settled by `third_parties`**
- **IT-11**, ICT and security — Leaving the provider would be hard. **Settled by `recovery_expectations`**
- **IT-12**, ICT and security — An open-source or third-party component is added. **Settled by `components_and_libraries`**
- **IT-13**, ICT and security — Data is stored in a new location or a new cloud region. **Settled by `hosting_and_data_location`**
- **IT-14**, ICT and security — Support or administration happens from outside the EEA. **Settled by `hosting_and_data_location`**
- **IT-15**, ICT and security — A new environment is created. **Settled by `release_and_environment`**
- **IT-18**, ICT and security — A webhook, callback or partner push is accepted. **Settled by `third_parties`**
- **IT-23**, ICT and security — A vulnerability is found in something the product uses. **Settled by `components_and_libraries`**
- **IT-24**, ICT and security — Release cadence or deployment approach changes. **Settled by `release_and_environment`**
- **IT-25**, ICT and security — Testing scope changes. **Settled by `release_and_environment`**
- **IT-26**, ICT and security — Secrets, keys or certificates are introduced. **Settled by `security_measures`**
- **IT-27**, ICT and security — The affected service is one the bank registered under the cyber regime. **Settled by `registered_under_cyber_regime`**

## SOL3 - A session that survives the client leaving

### What it is

A single underlying capability — durable session state that outlives the browser tab or app session that
created it — surfaced to the applicant two ways: as a live, updating estimate of what remains during
identity verification, and, where the applicant leaves entirely, as an exact point of return rather than a
blank new application.

### What it does

For O1, the applicant sees not just which step they are on but a live estimate of what is left, because the
state behind that estimate persists rather than resetting with every screen. For O4, the same persisted
state is what lets an applicant who genuinely leaves — closes the app, changes device, comes back days later
— resume exactly where they stopped, rather than being told, in effect, that nothing they did was kept.

### How it does it

The applicant's progress is written to durable session storage as they move through identity verification,
not held only in the current screen or device. While they are actively in the journey, that state powers a
live estimate of remaining steps and time. **A half-finished application is kept for up to 30 days from the
applicant's last activity, and this window is stated to the applicant, not left implicit.** Past it, the
saved state is deleted and a returning applicant starts over; the 30 days is this solution's own declared
boundary, chosen so the bank can state a retention period rather than hold one open-endedly.

**Getting back in is never a matter of holding a link.** If the applicant leaves and returns — closes the
app, changes device, comes back days later — they re-run the same identity check the original application
used, in full, before their saved state is shown to them at all. A link, an email or an SMS may tell the
applicant that a saved application exists and invite them back, but **the link itself carries no authority
to resume**: it points them at the identity check, and the check is what decides whether their session is
rebuilt, never a token in a URL. The same check, not a lighter one, because a shortcut around it is exactly
what would make a found or forwarded link into someone else's way into another person's application.

### The problem it solves, and for whom

New ČSAS retail clients partway through identity verification currently have no reliable sense of how much
remains (O1), and those who leave the journey partway, for any reason, currently cannot resume the same
application and must start a new one from scratch (O4).

### Opportunities it is built on

- **O1** — Losing track of what is left in identity verification. Takes the desired change directly: a
  live, persisted estimate replaces the absence of any read on remaining effort.
- **O4** — No way back into a dropped application. Takes the desired change directly: applicants who abandon
  partway can pick up where they left off instead of starting several applications.

### Against the market

**Standards it is built on.** Re-verifying an applicant on return sits downstream of the same federated
identity infrastructure (BankID) five of nine participants already use (`bankid-identity-verification`) —
this solution does not change how identity is verified, only that a returning applicant is asked to prove it
again before their saved state is restored.

**Trends it rides.** This is the synthesis's clearest opening: no participant profiled shows any
save-and-resume capability at all (`no-visible-resume-capability`). The universal absence of differentiation
at the opening step (`no-differentiation-at-opening-step`) also applies to O1 directly — no competitor is
instrumenting the verification step with a live estimate either.

### Strategic alignment

Both the estimate and the resumption reduce abandonment at the exact steps the run's metric — end-to-end
digital onboarding completion rate — measures, and that metric's stated one-step link to key result AI-2
(AI First) is the brief's own. An applicant who resumes and completes, rather than starting a duplicate
application or not returning at all, is a straight-through completion in the same digital channel.

The full touchpoint sweep behind this section is at [rec:R-A8-03].

### Compliance

In play: Compliance, conduct and product regulation (S1, S12, S13, S2, S3, S6, S7, S8) · GDPR and privacy (G1, G10, G11, G12, G2, G3, G4) · Legal and contracts (L1, L10, L11, L2, L3, L5) · ICT and security (I1, I10, I11, I2, I4, I5, I7, I8, I9). 5 escalation trigger(s) fired: G-E6 in GDPR and privacy, because G11 is unresolved; G-E12 in GDPR and privacy, because G1 is unresolved; I-E1 in ICT and security, because I3 is unresolved; I-E12 in ICT and security, because I5 is unresolved; I-E13 in ICT and security, because I4 is unresolved. **No card names the role a fired trigger routes to**, so where each one goes is an open ask to ČS. 20 question(s) could not be answered from the solution as written, each naming the input that would settle it.

**# of touchpoints: 20**

#### Compliance, conduct and product regulation

*What the client is told*

> **TP-11 · Any client-facing screen, document, email, SMS or script changes** · engages S1
>
> Product has to have the wording reviewed against the fair, clear and not misleading standard and make marketing identifiable as marketing, because that is a legal test rather than a tone preference

> **TP-15 · A risk, limit or exclusion is described to the client** · engages S1, S6, S7
>
> Product has to give limits and exclusions the same visual weight as the benefits, because the test is whether the two are balanced

*Accessibility*

> **TP-32 · Any client-facing website, app or web view changes** · engages S13
>
> Product has to meet the accessibility bar of perceivable, operable, understandable and robust, because it has been in force in Czechia since June 2025 and consumer banking is expressly in scope

> **TP-33 · Authentication, identification or a payment step changes** · engages S13, S8
>
> Product has to check the authentication, identification and payment steps individually for accessibility, because a CAPTCHA, an SMS-code timeout or a signature pad each fail on their own

*Controls*

> **TP-38 · Something about the product has to be monitored after launch** · engages S12, S2
>
> Product has to make sure the data needed for post-launch monitoring exists, because monitoring is an obligation and cannot run on data nobody collected

> **TP-39 · A record has to be kept to prove what a client was told or agreed** · engages S12, S1, S3
>
> Product has to keep records that can reconstruct what a client was told, because retention periods differ by product type

#### GDPR and privacy

*Collecting and holding*

> **DP-01 · The product stores personal data — any field about an identifiable person** · engages G1, G2, G3, G11
>
> Product has to write down why it needs each stored field and cut the ones it cannot justify, because every field needs a purpose and a legal basis on record

> **DP-07 · Data is kept after the client relationship ends** · engages G3, G11, G12
>
> Product has to set a retention period per purpose and say how deletion and legal holds interact, because banking and anti-money-laundering rules require keeping data clients can otherwise ask to erase

*Telling the client and letting them act*

> **DP-15 · The client asks for their data, or asks for it to be deleted** · engages G4, G3
>
> Product has to register the new data store with the team that answers access and deletion requests, because a store nobody told them about makes the client's right fail silently

*Keeping it safe*

> **DP-29 · A new interface exposes personal data** · engages G10
>
> Product has to define access control and logging for the new interface as part of the design, because both are design decisions with a legal consequence

#### Legal and contracts

*Forming the agreement*

> **LG-05 · The client is identified remotely** · engages L5, L1
>
> Product has to keep identification, signature and authentication as three separate steps, because a journey that conflates them leaves a gap in each

*What the client is committed to*

> **LG-07 · A new term, limit, exclusion or obligation is introduced** · engages L2, L3
>
> Product has to state the new term, limit or obligation plainly and where the client will see it, because a term that surprises a consumer is the classic unfair term

> **LG-11 · The bank promises a time, a rate or an outcome** · engages L10, L11
>
> Product has to treat a promise made in the journey as a contractual term, because it binds whether or not it appears in the contract document

#### ICT and security

*Getting in*

> **IT-01 · The client logs in, or the login changes** · engages I2, I8
>
> Product has to specify how strong the login is, how sessions end and how recovery works, because payment services regulate authentication and the same bar is expected elsewhere

> **IT-04 · The client recovers access after losing a factor** · engages I2, I11
>
> Product has to design the recovery path to the same standard as the login, because recovery is where authentication is usually weakest and where account takeover happens

> **IT-06 · A device or session is remembered** · engages I2, I8
>
> Product has to record remembering a device as an exemption decision, because it lowers the authentication bar rather than just improving convenience

*Exposing an interface*

> **IT-16 · A new API or integration is exposed** · engages I2, I7, I9, I10
>
> Product has to define who may call the interface, how it gets security tested, what it logs and where it runs, because the bank must evidence each one separately

*When something goes wrong*

> **IT-19 · The service could fail in a way clients notice** · engages I4, I5, I1
>
> Product has to make the failure classifiable quickly, because major incidents run on a reporting clock that starts before anyone has diagnosed the cause

> **IT-20 · A new failure mode is introduced** · engages I5, I4
>
> Product has to state recovery time and data loss objectives, because they cannot be assumed after the fact

> **IT-22 · The initiative changes what is logged** · engages I9, I4
>
> Product has to log enough for someone who was not there to reconstruct what happened, because that is the bar the logs are judged against

#### Open items

- **DP-12**, GDPR and privacy — Production data is copied to a test, demo or analytics environment. **Settled by `release_and_environment`**
- **DP-23**, GDPR and privacy — A vendor, SaaS tool or partner processes client data. **Settled by `third_parties`**
- **DP-26**, GDPR and privacy — **Data is stored or accessed outside the EEA**. **Settled by `hosting_and_data_location`**
- **DP-32**, GDPR and privacy — Something could go wrong in a way that exposes client data. **Settled by `security_measures`**
- **LG-22**, Legal and contracts — Open-source or third-party software is embedded. **Settled by `components_and_libraries`**
- **LG-24**, Legal and contracts — A supplier processes something the product depends on. **Settled by `third_parties`**
- **IT-07**, ICT and security — **A vendor, SaaS product or cloud service is introduced**. **Settled by `third_parties`**
- **IT-08**, ICT and security — The dependency supports something clients rely on. **Settled by `critical_or_important_function`**
- **IT-09**, ICT and security — The provider is one the bank already depends on heavily. **Settled by `third_parties`**
- **IT-10**, ICT and security — The provider subcontracts part of the service. **Settled by `third_parties`**
- **IT-11**, ICT and security — Leaving the provider would be hard. **Settled by `recovery_expectations`**
- **IT-12**, ICT and security — An open-source or third-party component is added. **Settled by `components_and_libraries`**
- **IT-13**, ICT and security — Data is stored in a new location or a new cloud region. **Settled by `hosting_and_data_location`**
- **IT-14**, ICT and security — Support or administration happens from outside the EEA. **Settled by `hosting_and_data_location`**
- **IT-15**, ICT and security — A new environment is created. **Settled by `release_and_environment`**
- **IT-23**, ICT and security — A vulnerability is found in something the product uses. **Settled by `components_and_libraries`**
- **IT-24**, ICT and security — Release cadence or deployment approach changes. **Settled by `release_and_environment`**
- **IT-25**, ICT and security — Testing scope changes. **Settled by `release_and_environment`**
- **IT-26**, ICT and security — Secrets, keys or certificates are introduced. **Settled by `security_measures`**
- **IT-27**, ICT and security — The affected service is one the bank registered under the cyber regime. **Settled by `registered_under_cyber_regime`**

## SOL4 - Say what just happened, at the two points that cause doubt

### What it is

Two short, explicit confirmation screens placed exactly where the current design currently leaves the
applicant to guess: immediately after a document scan fails, stating plainly whether their progress was
kept, and immediately after identity creation completes, stating plainly that the account itself is a
separate step still ahead.

### What it does

For O2, the applicant who hits a failed scan is told, in one sentence, whether the work they have already
done still counts — removing the guess that currently ends in a retry-then-abandon pattern. For O3, the
applicant who finishes identity creation is told, at that exact moment, that the account is not yet open —
removing the same conflation the desired change names, at the moment it happens rather than afterwards.

### How it does it

Both are interstitial confirmation screens the applicant must see and acknowledge before continuing, not a
passive banner. After a failed scan, the screen states plainly what was and was not retained and gives one
explicit next action. After identity creation completes, the screen states plainly that identity is created
and the account is a distinct next step, before the applicant is moved anywhere else. Neither screen changes
what the underlying identity or scanning process does — only what the applicant is told about it, at the
moment it matters.

### The problem it solves, and for whom

New ČSAS retail clients who fail a document scan currently do not know whether to retry or restart (O2), and
those who complete identity creation currently believe, reasonably, that the account is already open (O3) —
both are gaps in what the client is told at one specific moment, rather than gaps in what the underlying
process does.

### Opportunities it is built on

- **O2** — Not knowing whether progress was saved after a failed scan. Takes the desired change directly: an
  explicit statement of what was saved replaces the current silence.
- **O3** — Identity creation mistaken for an open account. Takes the desired change directly: an explicit
  statement at the moment identity completes replaces the current absence of any distinction.

### Against the market

**Standards it is built on.** Document scanning and identity creation sit on the same federated
infrastructure five of nine participants already use (`bankid-identity-verification`) — this solution
changes nothing about how the scan or the identity check itself works, only what the applicant is told
immediately after each one.

**Trends it rides.** The universal absence of differentiation at the identity-verification and
account-opening step (`no-differentiation-at-opening-step`) explicitly names O2 and O3 among the
opportunities no participant profiled competes on — this solution moves directly into that space, at the two
narrowest points in it. What either would cost the bank to build is not established by anything this run
holds.

### Strategic alignment

Both confirmations reduce abandonment at the exact steps the run's metric — end-to-end digital onboarding
completion rate — measures. That metric's one-step link to key result AI-2 (AI First) is stated in the
brief; an applicant who continues past a failed scan or past identity creation, rather than abandoning at
either, is a straight-through completion the same key result counts.

The full touchpoint sweep behind this section is at [rec:R-A8-04].

### Compliance

In play: Compliance, conduct and product regulation (S1, S12, S13, S2, S3) · GDPR and privacy (G1, G11, G2, G3, G4) · ICT and security (I1, I4, I5, I9). 5 escalation trigger(s) fired: G-E6 in GDPR and privacy, because G11 is unresolved; G-E12 in GDPR and privacy, because G1 is unresolved; I-E1 in ICT and security, because I3 is unresolved; I-E12 in ICT and security, because I5 is unresolved; I-E13 in ICT and security, because I4 is unresolved. **No card names the role a fired trigger routes to**, so where each one goes is an open ask to ČS. 9 question(s) could not be answered from the solution as written, each naming the input that would settle it.

**# of touchpoints: 9**

#### Compliance, conduct and product regulation

*What the client is told*

> **TP-11 · Any client-facing screen, document, email, SMS or script changes** · engages S1
>
> Product has to have the wording reviewed against the fair, clear and not misleading standard and make marketing identifiable as marketing, because that is a legal test rather than a tone preference

*Accessibility*

> **TP-32 · Any client-facing website, app or web view changes** · engages S13
>
> Product has to meet the accessibility bar of perceivable, operable, understandable and robust, because it has been in force in Czechia since June 2025 and consumer banking is expressly in scope

*Controls*

> **TP-38 · Something about the product has to be monitored after launch** · engages S12, S2
>
> Product has to make sure the data needed for post-launch monitoring exists, because monitoring is an obligation and cannot run on data nobody collected

> **TP-39 · A record has to be kept to prove what a client was told or agreed** · engages S12, S1, S3
>
> Product has to keep records that can reconstruct what a client was told, because retention periods differ by product type

#### GDPR and privacy

*Collecting and holding*

> **DP-01 · The product stores personal data — any field about an identifiable person** · engages G1, G2, G3, G11
>
> Product has to write down why it needs each stored field and cut the ones it cannot justify, because every field needs a purpose and a legal basis on record

*Telling the client and letting them act*

> **DP-15 · The client asks for their data, or asks for it to be deleted** · engages G4, G3
>
> Product has to register the new data store with the team that answers access and deletion requests, because a store nobody told them about makes the client's right fail silently

#### Legal and contracts

Nothing in this area was engaged. **It was examined and found nothing**, which is not the same as not being looked at.

#### ICT and security

*When something goes wrong*

> **IT-19 · The service could fail in a way clients notice** · engages I4, I5, I1
>
> Product has to make the failure classifiable quickly, because major incidents run on a reporting clock that starts before anyone has diagnosed the cause

> **IT-20 · A new failure mode is introduced** · engages I5, I4
>
> Product has to state recovery time and data loss objectives, because they cannot be assumed after the fact

> **IT-22 · The initiative changes what is logged** · engages I9, I4
>
> Product has to log enough for someone who was not there to reconstruct what happened, because that is the bar the logs are judged against

#### Open items

- **DP-12**, GDPR and privacy — Production data is copied to a test, demo or analytics environment. **Settled by `release_and_environment`**
- **DP-32**, GDPR and privacy — Something could go wrong in a way that exposes client data. **Settled by `security_measures`**
- **LG-22**, Legal and contracts — Open-source or third-party software is embedded. **Settled by `components_and_libraries`**
- **IT-12**, ICT and security — An open-source or third-party component is added. **Settled by `components_and_libraries`**
- **IT-15**, ICT and security — A new environment is created. **Settled by `release_and_environment`**
- **IT-23**, ICT and security — A vulnerability is found in something the product uses. **Settled by `components_and_libraries`**
- **IT-24**, ICT and security — Release cadence or deployment approach changes. **Settled by `release_and_environment`**
- **IT-25**, ICT and security — Testing scope changes. **Settled by `release_and_environment`**
- **IT-27**, ICT and security — The affected service is one the bank registered under the cyber regime. **Settled by `registered_under_cyber_regime`**

## SOL5 - Retry and return are the same button

### What it is

One recovery action, available to the client wherever they might need it — immediately after a failed
document scan, or later, after abandoning the journey outright — that returns them to exactly the state
their application was in, rather than a blank form.

### What it does

For O2, the applicant who hits a failed scan is given the same action, immediately, that lets them either
retry the specific step or confirm their prior progress is intact, instead of being left to guess. For O4,
an applicant who abandons entirely, at any step, uses the identical action later to pick their application
back up exactly where they left it, rather than starting a new one.

### How it does it

The action is a single, consistently placed control — a button or link — that, wherever it appears, checks
what state the applicant's application was last in and restores it after a short re-verification step.
Immediately after a failed scan it appears as part of the failure screen itself. As a standalone route (a
saved link, or logging back in and being offered it directly), it serves the applicant who left entirely, at
whatever step they left at. One mechanism, reached two ways, rather than two separate features.

### The problem it solves, and for whom

New ČSAS retail clients who fail a document scan currently retry once and then abandon rather than risk
repeating the whole process (O2), and those who abandon onboarding partway, for any reason, currently start
an entirely new application rather than resuming the one they already invested in (O4).

### Opportunities it is built on

- **O2** — Not knowing whether progress was saved after a failed scan. Takes the desired change directly:
  the same recovery action removes the uncertainty by letting the applicant act on their actual saved state
  rather than guess at it.
- **O4** — No way back into a dropped application. Takes the desired change directly: applicants who abandon
  partway resume the same application rather than starting several.

### Against the market

**Standards it is built on.** Re-verifying an applicant at the point of recovery sits downstream of the same
federated identity infrastructure five of nine participants already use (`bankid-identity-verification`) —
nothing about how identity itself is verified changes here.

**Trends it rides.** This is the same opening as the synthesis's clearest finding: no participant profiled
shows any save-and-resume capability at all (`no-visible-resume-capability`), which is precisely O4. The
universal absence of differentiation at the identity-verification and account-opening step
(`no-differentiation-at-opening-step`) covers O2 the same way: no competitor profiled offers a recovery
action at a failed scan either. This solution differs from a proactive-outreach approach in being entirely
client-initiated: the applicant reaches for the action rather than the bank reaching out to them.

### Strategic alignment

Applicants who recover and complete, rather than abandoning at a failed scan or starting a duplicate
application, are straight-through completions in the same digital channel — which is exactly what the run's
metric, end-to-end digital onboarding completion rate, counts, through the one-step link to key result AI-2
(AI First) the brief already states.

The full touchpoint sweep behind this section is at [rec:R-A8-05].

### Compliance

In play: Compliance, conduct and product regulation (S1, S12, S13, S2, S3, S6, S7, S8) · GDPR and privacy (G1, G10, G11, G2, G3, G4) · Legal and contracts (L1, L5) · ICT and security (I1, I10, I11, I2, I4, I5, I7, I8, I9). 5 escalation trigger(s) fired: G-E6 in GDPR and privacy, because G11 is unresolved; G-E12 in GDPR and privacy, because G1 is unresolved; I-E1 in ICT and security, because I3 is unresolved; I-E12 in ICT and security, because I5 is unresolved; I-E13 in ICT and security, because I4 is unresolved. **No card names the role a fired trigger routes to**, so where each one goes is an open ask to ČS. 21 question(s) could not be answered from the solution as written, each naming the input that would settle it.

**# of touchpoints: 20**

#### Compliance, conduct and product regulation

*What the client is told*

> **TP-11 · Any client-facing screen, document, email, SMS or script changes** · engages S1
>
> Product has to have the wording reviewed against the fair, clear and not misleading standard and make marketing identifiable as marketing, because that is a legal test rather than a tone preference

> **TP-15 · A risk, limit or exclusion is described to the client** · engages S1, S6, S7
>
> Product has to give limits and exclusions the same visual weight as the benefits, because the test is whether the two are balanced

*Accessibility*

> **TP-32 · Any client-facing website, app or web view changes** · engages S13
>
> Product has to meet the accessibility bar of perceivable, operable, understandable and robust, because it has been in force in Czechia since June 2025 and consumer banking is expressly in scope

> **TP-33 · Authentication, identification or a payment step changes** · engages S13, S8
>
> Product has to check the authentication, identification and payment steps individually for accessibility, because a CAPTCHA, an SMS-code timeout or a signature pad each fail on their own

*Controls*

> **TP-38 · Something about the product has to be monitored after launch** · engages S12, S2
>
> Product has to make sure the data needed for post-launch monitoring exists, because monitoring is an obligation and cannot run on data nobody collected

> **TP-39 · A record has to be kept to prove what a client was told or agreed** · engages S12, S1, S3
>
> Product has to keep records that can reconstruct what a client was told, because retention periods differ by product type

#### GDPR and privacy

*Collecting and holding*

> **DP-01 · The product stores personal data — any field about an identifiable person** · engages G1, G2, G3, G11
>
> Product has to write down why it needs each stored field and cut the ones it cannot justify, because every field needs a purpose and a legal basis on record

*Telling the client and letting them act*

> **DP-15 · The client asks for their data, or asks for it to be deleted** · engages G4, G3
>
> Product has to register the new data store with the team that answers access and deletion requests, because a store nobody told them about makes the client's right fail silently

*Keeping it safe*

> **DP-29 · A new interface exposes personal data** · engages G10
>
> Product has to define access control and logging for the new interface as part of the design, because both are design decisions with a legal consequence

> **DP-30 · An identifier is displayed, logged or put in a URL** · engages G10, G3
>
> Product has to keep identifiers out of URLs, because a URL leaks through browser referrers, server logs and screenshots

#### Legal and contracts

*Forming the agreement*

> **LG-05 · The client is identified remotely** · engages L5, L1
>
> Product has to keep identification, signature and authentication as three separate steps, because a journey that conflates them leaves a gap in each

#### ICT and security

*Getting in*

> **IT-01 · The client logs in, or the login changes** · engages I2, I8
>
> Product has to specify how strong the login is, how sessions end and how recovery works, because payment services regulate authentication and the same bar is expected elsewhere

> **IT-03 · A one-time code, push approval or biometric is used** · engages I2, I8
>
> Product has to check the two factors are genuinely independent and say whether biometrics are used, because biometrics move the data into a stricter regime

> **IT-04 · The client recovers access after losing a factor** · engages I2, I11
>
> Product has to design the recovery path to the same standard as the login, because recovery is where authentication is usually weakest and where account takeover happens

> **IT-06 · A device or session is remembered** · engages I2, I8
>
> Product has to record remembering a device as an exemption decision, because it lowers the authentication bar rather than just improving convenience

*Exposing an interface*

> **IT-16 · A new API or integration is exposed** · engages I2, I7, I9, I10
>
> Product has to define who may call the interface, how it gets security tested, what it logs and where it runs, because the bank must evidence each one separately

*When something goes wrong*

> **IT-19 · The service could fail in a way clients notice** · engages I4, I5, I1
>
> Product has to make the failure classifiable quickly, because major incidents run on a reporting clock that starts before anyone has diagnosed the cause

> **IT-20 · A new failure mode is introduced** · engages I5, I4
>
> Product has to state recovery time and data loss objectives, because they cannot be assumed after the fact

> **IT-21 · Fraud exposure changes** · engages I11, I4, I2
>
> Product has to update fraud detection alongside the product and confirm the reporting route, because detection tuned to the old journey misses the new one

> **IT-22 · The initiative changes what is logged** · engages I9, I4
>
> Product has to log enough for someone who was not there to reconstruct what happened, because that is the bar the logs are judged against

#### Open items

- **DP-07**, GDPR and privacy — Data is kept after the client relationship ends. **Settled by `retention_periods`**
- **DP-12**, GDPR and privacy — Production data is copied to a test, demo or analytics environment. **Settled by `release_and_environment`**
- **DP-23**, GDPR and privacy — A vendor, SaaS tool or partner processes client data. **Settled by `third_parties`**
- **DP-26**, GDPR and privacy — **Data is stored or accessed outside the EEA**. **Settled by `hosting_and_data_location`**
- **DP-32**, GDPR and privacy — Something could go wrong in a way that exposes client data. **Settled by `security_measures`**
- **LG-22**, Legal and contracts — Open-source or third-party software is embedded. **Settled by `components_and_libraries`**
- **LG-24**, Legal and contracts — A supplier processes something the product depends on. **Settled by `third_parties`**
- **IT-07**, ICT and security — **A vendor, SaaS product or cloud service is introduced**. **Settled by `third_parties`**
- **IT-08**, ICT and security — The dependency supports something clients rely on. **Settled by `critical_or_important_function`**
- **IT-09**, ICT and security — The provider is one the bank already depends on heavily. **Settled by `third_parties`**
- **IT-10**, ICT and security — The provider subcontracts part of the service. **Settled by `third_parties`**
- **IT-11**, ICT and security — Leaving the provider would be hard. **Settled by `recovery_expectations`**
- **IT-12**, ICT and security — An open-source or third-party component is added. **Settled by `components_and_libraries`**
- **IT-13**, ICT and security — Data is stored in a new location or a new cloud region. **Settled by `hosting_and_data_location`**
- **IT-14**, ICT and security — Support or administration happens from outside the EEA. **Settled by `hosting_and_data_location`**
- **IT-15**, ICT and security — A new environment is created. **Settled by `release_and_environment`**
- **IT-23**, ICT and security — A vulnerability is found in something the product uses. **Settled by `components_and_libraries`**
- **IT-24**, ICT and security — Release cadence or deployment approach changes. **Settled by `release_and_environment`**
- **IT-25**, ICT and security — Testing scope changes. **Settled by `release_and_environment`**
- **IT-26**, ICT and security — Secrets, keys or certificates are introduced. **Settled by `security_measures`**
- **IT-27**, ICT and security — The affected service is one the bank registered under the cyber regime. **Settled by `registered_under_cyber_regime`**

## SOL6 - A banker finishes it with you, on the same application

### What it is

A live handoff capability between the digital onboarding journey and the branch or contact-centre channel
that already exists: when an applicant reaches out — by phone or in person — at one of two specific
moments, the banker who takes the call or greets them at the branch opens the applicant's own application
exactly where it stands and finishes it with them, on the spot. Not a fresh start on a separate track, and
not a parallel process — the human channel continues the one digital application already begun, rather
than beginning a second one.

### What it does

For O1, an applicant who has lost track of how much of identity verification remains, and calls or visits
rather than guessing further, is told exactly where they stand by a banker looking at their own record —
and the banker completes the remaining steps with them live, on that record, rather than sending them back
to the app to try again alone. For O2, an applicant whose document scan failed and who cannot tell whether
to retry or restart gets the actual state of that scan resolved by a person looking at exactly what
happened, on the same application, rather than retrying blind and then giving up.

### How it does it

Branch and contact-centre staff tooling is given a read into the same milestone state the digital journey
itself tracks, so a banker sees precisely where an applicant's own application stands without asking them
to explain it from scratch. Before any of that state is shown, the applicant is identified — over the
phone or in person — through the same identity check the digital journey itself uses, never a lighter one,
so a caller cannot reach another person's in-progress application by claiming to be them. Once identified,
the banker resumes at the exact step the digital session stopped: working through the remaining
identity-verification questions live, or resolving the specific reason a scan failed and re-capturing the
document there and then if needed. This is not a new channel offering a redesigned experience — it is the
branch and contact-centre channel the market already relies on for exactly this, given visibility into
where a specific digital application actually stands.

### The problem it solves, and for whom

New ČSAS retail clients who reach identity verification and lose track of where they stand (O1), or whose
document scan fails and who cannot tell whether their progress survived (O2), and who reach for a person
rather than push through alone or quietly abandon. This run's own market work found this is already how
people cope with exactly this kind of friction: the branch visit or the contact-centre call is what an
applicant already falls back to when a digital path breaks down. The gap is not that people never ask for
help — it is that today's fallback restarts them rather than resuming what they had already done.

### Opportunities it is built on

- **O1** — Losing track of what is left in identity verification. Takes the desired change by letting a
  banker state exactly what remains, read from the applicant's own record, rather than the applicant
  discovering it alone or not at all.
- **O2** — Not knowing whether progress was saved after a failed scan. Takes the desired change by having a
  person resolve, on the same application, exactly what happened to the scan and what — if anything —
  needs to be redone.

### Against the market

**Standards it is built on.** None of the nine organisations this pass profiled shows a handoff that
carries a digital application's own state into its branch or contact-centre channel — this is not a
settled market pattern to match, and the market's own substitute, the branch visit or contact-centre call,
is the fallback this run's own applicants already use.

**Trends it rides.** No participant profiled shows any save-and-resume capability at all
(`no-visible-resume-capability`), and this run's own competitive work found that gap extends into the human
channel too: the branch visit or contact-centre call this market already falls back to does not, today,
carry a digital application's state forward either — an applicant who reaches a branch or a call centre
typically starts data collection over rather than resuming it. This solution is aimed exactly at that gap,
in the one channel this market's own applicants already reach for.

### Strategic alignment

This is a different chain than the other five solutions carry, and it is worth stating plainly rather than
folding it into the same claim. This run's metric — end-to-end digital onboarding completion rate — still
counts an application this solution helps complete: fewer applicants abandon at O1's and O2's moments, and
more accounts open. But key result AI-2 (AI First) measures the share of sales and service processes in
primary digital channels that are fully straight-through, and a completion reached through a banker on the
phone or at a branch is not a straight-through digital completion in the sense AI-2 counts. This solution
serves the run's own completion-rate metric directly and serves AI-2's own mechanism only partially, and
that difference is the honest account of its strategic alignment rather than a claim to match the other
five.

The full touchpoint sweep behind this section is at [rec:R-A8-06].

### Compliance

In play: Compliance, conduct and product regulation (S1, S12, S13, S2, S3) · GDPR and privacy (G1, G10, G11, G12, G2, G3, G4) · Legal and contracts (L1, L5) · ICT and security (I1, I10, I11, I2, I4, I5, I7, I9). 5 escalation trigger(s) fired: G-E6 in GDPR and privacy, because G11 is unresolved; G-E12 in GDPR and privacy, because G1 is unresolved; I-E1 in ICT and security, because I3 is unresolved; I-E12 in ICT and security, because I5 is unresolved; I-E13 in ICT and security, because I4 is unresolved. **No card names the role a fired trigger routes to**, so where each one goes is an open ask to ČS. 20 question(s) could not be answered from the solution as written, each naming the input that would settle it.

**# of touchpoints: 15**

#### Compliance, conduct and product regulation

*What the client is told*

> **TP-11 · Any client-facing screen, document, email, SMS or script changes** · engages S1
>
> Product has to have the wording reviewed against the fair, clear and not misleading standard and make marketing identifiable as marketing, because that is a legal test rather than a tone preference

*Accessibility*

> **TP-36 · A support journey, chat, callback or complaint route changes** · engages S13, S12
>
> Product has to hold support, chat and complaint routes to the same accessibility bar, because support is part of the service

*Controls*

> **TP-38 · Something about the product has to be monitored after launch** · engages S12, S2
>
> Product has to make sure the data needed for post-launch monitoring exists, because monitoring is an obligation and cannot run on data nobody collected

> **TP-39 · A record has to be kept to prove what a client was told or agreed** · engages S12, S1, S3
>
> Product has to keep records that can reconstruct what a client was told, because retention periods differ by product type

#### GDPR and privacy

*Collecting and holding*

> **DP-01 · The product stores personal data — any field about an identifiable person** · engages G1, G2, G3, G11
>
> Product has to write down why it needs each stored field and cut the ones it cannot justify, because every field needs a purpose and a legal basis on record

*Telling the client and letting them act*

> **DP-13 · The privacy notice needs to change** · engages G2
>
> Product has to update the privacy notice before launch, because a product doing something the notice does not describe is running without the transparency the law requires

> **DP-15 · The client asks for their data, or asks for it to be deleted** · engages G4, G3
>
> Product has to register the new data store with the team that answers access and deletion requests, because a store nobody told them about makes the client's right fail silently

*Keeping it safe*

> **DP-29 · A new interface exposes personal data** · engages G10
>
> Product has to define access control and logging for the new interface as part of the design, because both are design decisions with a legal consequence

> **DP-31 · Staff gain access to data they could not see before** · engages G10, G3, G12
>
> Product has to scope staff access to what each role needs, because access scope is data minimisation in practice and banking secrecy limits it internally too

#### Legal and contracts

*Forming the agreement*

> **LG-05 · The client is identified remotely** · engages L5, L1
>
> Product has to keep identification, signature and authentication as three separate steps, because a journey that conflates them leaves a gap in each

#### ICT and security

*Exposing an interface*

> **IT-16 · A new API or integration is exposed** · engages I2, I7, I9, I10
>
> Product has to define who may call the interface, how it gets security tested, what it logs and where it runs, because the bank must evidence each one separately

*When something goes wrong*

> **IT-19 · The service could fail in a way clients notice** · engages I4, I5, I1
>
> Product has to make the failure classifiable quickly, because major incidents run on a reporting clock that starts before anyone has diagnosed the cause

> **IT-20 · A new failure mode is introduced** · engages I5, I4
>
> Product has to state recovery time and data loss objectives, because they cannot be assumed after the fact

> **IT-21 · Fraud exposure changes** · engages I11, I4, I2
>
> Product has to update fraud detection alongside the product and confirm the reporting route, because detection tuned to the old journey misses the new one

> **IT-22 · The initiative changes what is logged** · engages I9, I4
>
> Product has to log enough for someone who was not there to reconstruct what happened, because that is the bar the logs are judged against

#### Open items

- **DP-12**, GDPR and privacy — Production data is copied to a test, demo or analytics environment. **Settled by `release_and_environment`**
- **DP-23**, GDPR and privacy — A vendor, SaaS tool or partner processes client data. **Settled by `third_parties`**
- **DP-26**, GDPR and privacy — **Data is stored or accessed outside the EEA**. **Settled by `hosting_and_data_location`**
- **DP-32**, GDPR and privacy — Something could go wrong in a way that exposes client data. **Settled by `security_measures`**
- **LG-22**, Legal and contracts — Open-source or third-party software is embedded. **Settled by `components_and_libraries`**
- **LG-24**, Legal and contracts — A supplier processes something the product depends on. **Settled by `third_parties`**
- **IT-07**, ICT and security — **A vendor, SaaS product or cloud service is introduced**. **Settled by `third_parties`**
- **IT-08**, ICT and security — The dependency supports something clients rely on. **Settled by `critical_or_important_function`**
- **IT-09**, ICT and security — The provider is one the bank already depends on heavily. **Settled by `third_parties`**
- **IT-10**, ICT and security — The provider subcontracts part of the service. **Settled by `third_parties`**
- **IT-11**, ICT and security — Leaving the provider would be hard. **Settled by `recovery_expectations`**
- **IT-12**, ICT and security — An open-source or third-party component is added. **Settled by `components_and_libraries`**
- **IT-13**, ICT and security — Data is stored in a new location or a new cloud region. **Settled by `hosting_and_data_location`**
- **IT-14**, ICT and security — Support or administration happens from outside the EEA. **Settled by `hosting_and_data_location`**
- **IT-15**, ICT and security — A new environment is created. **Settled by `release_and_environment`**
- **IT-23**, ICT and security — A vulnerability is found in something the product uses. **Settled by `components_and_libraries`**
- **IT-24**, ICT and security — Release cadence or deployment approach changes. **Settled by `release_and_environment`**
- **IT-25**, ICT and security — Testing scope changes. **Settled by `release_and_environment`**
- **IT-26**, ICT and security — Secrets, keys or certificates are introduced. **Settled by `security_measures`**
- **IT-27**, ICT and security — The affected service is one the bank registered under the cyber regime. **Settled by `registered_under_cyber_regime`**

<!-- /SOLUTIONS -->

## What we could not establish

- **Whether a CEE comparator already answers O4.** A7 names this as its own open question — no ring-2
  participant was profiled, so "no visible resumption capability" is bounded by what that pass reached
  rather than a claim about the whole market, and it is inherited here unchanged.
- **Every compliance area's screen carries its own open items**, each naming the build-level input
  (hosting, components, release approach, third parties, recovery objectives, and the rest) that would
  settle it. None of the six solutions is compliant by construction; each states what could not be
  resolved from the solution as written rather than assuming it clean.
- **No card names the role an escalation trigger routes to.** All six solutions fire the same five
  triggers (two in GDPR, three in ICT and security) for the same reason: the underlying sub-domain is
  unresolved rather than a confirmed risk having been found. Where each of those routes is an open ask to
  ČS, not something this workflow can answer.
- **Whether six solutions this close in mechanism (progress display, outreach, session persistence,
  confirmation messaging, self-service recovery, a human handoff) read as genuinely distinct choices to a
  person comparing them**, or as one idea sliced six ways, is for the Product Manager to judge at the
  decision gate rather than for this step to assert.
- **SOL6's own alignment to key result AI-2 is weaker than the other five's, and stated as such rather than
  matched to them.** It serves the run's completion-rate metric directly; whether a human-assisted
  completion counts toward AI-2's own "fully straight-through in the primary digital channel" clause is a
  question for whoever owns that key result, not one this step can settle.

## How this was produced

Stage 4.1 (Solutions), `ideation@0.1`, agent `product-manager`, composed as a fan-out: one invocation named
the slate, six authored one solution each against their own brief, a script derived each solution's
compliance section from its answers on its own record, and a script joined the six parts into this
document word for word. SOL6 was added, and SOL2 and SOL3 were revised, after a second round of review
before the decision gate; every part and record was re-derived and rejoined rather than hand-edited into
the assembled document. Every solution binds at least one A4 opportunity and at least one A7 synthesis
element; every primary opportunity (O1, O3, O4) is addressed by at least one solution across the set; and
no solution's opportunity set sits inside another's — the six solve sets are the six distinct two-element
subsets of {O1, O2, O3, O4}. No solution is scored, ranked, ordered, or marked as a favourite — that is the
decision this stage's gate holds open for the Product Manager.
