---
run_id: 2026-04-card-disputes
artifact_id: A11
ost_role: artifact
status: accepted
workflow: discovery
modified_by: human
revisions: 0
produced_by:
  agent: product-owner
  skill: mvp-expansion
sources:
  - A10
  - A9
external_sources: []
could_not_verify:
  - rule: "every compliance touchpoint is addressed in functionality, not merely listed"
    needs: judge
    reach: artifact
decision:
  gate: G5b
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: Product Owner
  accepted_at: 2026-08-18
  reason: "Accepted as it stood, with no refinement round. Three things were put to the Product Owner before acceptance and none was sent back: the notification's confirmation action, which the expansion carries from ID-3's own steps in A8 although the option statement selected at G5a named the dispute action alone; the three PRD success-measure fields left deliberately empty, being the observation horizon, the owner and the kill criterion; and the two pre-deployment requirements the expansion states, a compliance review of the consent notice and mechanism and a data protection impact assessment covering all cardholders and all transactions. Accepting with the three fields empty is a recorded choice rather than an omission, the same shape as time_horizon on A1 at G1: the expansion declined to state a horizon it had not been given, and stage 6 receives the gap rather than an invented date and owner."
  changed_during_refinement: none
  refinements: []
  note: "Compliance Guidelines are absent, so both compliance touchpoints are identified from regulatory knowledge and carry a basis saying so; neither has an assessed band, severity or obligation, and the expansion states compliance validation as required before implementation. Banking Constraints are absent, so nothing in A10 or this expansion has been validated against the bank's operating frame. Accepted on that basis, which is recorded here rather than left to be inferred at stage 6."
assembled_at: 2026-08-20
assembled_from: [R-A11-01]
---

# MVP | Expanded MVP — universal real-time transaction notification with dispute action

Every card transaction fires a notification, the notification is on by default for every cardholder, and the notification carries a one-tap dispute action. Those three properties are what OPT-A is; dropping any one of them makes it a different pilot. What it is meant to establish is whether a cardholder who is told at the moment of the transaction acts sooner and calls less, and the measure is the share of disputes raised from a notification rather than found later. [rec:R-A11-01]

---

## What it is
#### What it does

OPT-A fires a push notification on every card transaction within seconds of the transaction posting, to
all retail cardholders, without any setup, opt-in, or configuration step required from the cardholder.

The notification appears on the cardholder's lock screen. It identifies the charge — time, amount, and
merchant name drawn from the transaction record — and carries two inline actions. A cardholder who
recognises the charge selects the confirmation action; the notification is dismissed quietly with no
further step required. A cardholder who does not recognise the charge selects the dispute action.

The dispute action opens the CS app directly to a purpose-built dispute screen, pre-filled with the
transaction's date, amount, and merchant from the transaction record, and with the reason pre-selected
as the unauthorised charge variant. The cardholder adds any additional context and submits. The path
from receiving the notification to having a submitted dispute in front of the bank requires no
navigation and no re-entry of the fields the bank's own transaction record already holds.

A cardholder who dismisses the notification without acting, or who does not see it, can find the
transaction in the CS app's transaction list and initiate a dispute from the transaction detail screen
using the standard path. The notification path and the standard path reach the same dispute screen.
OPT-A adds a path; it does not replace the one that exists.

---

## How it works
#### Notification frequency

Notification frequency tracks the cardholder's card activity directly: ten transactions in a day
produce ten notifications. This is OPT-A's defining distinction from OPT-B — the notification arrives
on routine daily spending as much as on unusual charges, making it a real-time receipt for every
transaction rather than an alert that fires only when a transaction warrants attention.

The pilot's second test question is about this frequency: whether it produces engagement with the
dispute action over the observation period, or produces diminishing attention at the activity levels
of the enrolled cardholder population. The answer is measured through opt-out rate, notification
interaction rate, and dispute submission rate stratified by cardholder transaction frequency.

#### Default-on enrollment and opt-out

All cardholders are enrolled by default. No activation step is required. This is the design decision
that distinguishes OPT-A from KB's Oznámení o platbách (manual activation) and CSOB's enableable
notification (ST2). The three innovators — Revolut, N26, Monzo — deliver to all cardholders without
setup (ST2, common, 6/10); OPT-A applies that design at CS and is the first to pair it with a dispute
action (TR-B4 records no Czech bank has made that connection).

Before the first notification fires to any cardholder, an enrollment notice is delivered. It describes
what the cardholder will receive, what the notification will contain, and how to opt out immediately.
This disclosure step — designed as an in-app message or onboarding screen, delivered ahead of the
first transaction notification — is the mechanism through which the default-on design addresses the
ePrivacy consent requirement. The opt-out is always accessible: from within every notification and
from the CS app's notification settings. Opt-out stops all transaction notifications immediately;
re-enrollment from settings is available at any time. Opt-out and re-enrollment events are logged per
cardholder with timestamps, creating an auditable consent record.

#### Notification content scope

The notification carries three fields from the transaction record: time, amount, and merchant name. No
partial card numbers, account identifiers, location data, or additional transaction metadata appear in
the notification. This content scope is a design specification requirement, not a later UI decision:
the three fields are the minimum for the cardholder to identify the transaction and exercise the
dispute action, and restricting content to this minimum is the design choice that addresses the GDPR
data-minimisation requirement for transaction-level personal financial data in a push notification.

---

## What the pilot tests
OPT-A's test, stated in A10, is two-part:

1. **Whether real-time awareness of every transaction changes dispute behaviour.** The notification
   arrives at the cardholder's first moment of awareness of each transaction. Whether this changes
   dispute rates — relative to a pre-notification baseline — is what this pilot measures for H1:
   cardholders who do not know cannot act, and the notification is the mechanism that closes that gap.

2. **Whether notification frequency at cardholder activity levels produces engagement or diminishing
   attention.** A cardholder who makes five purchases a day receives five notifications. Whether that
   frequency is experienced as a useful daily service or as volume that eventually produces opt-outs
   or dismissal without interaction is the question the universal design cannot answer without a pilot.

---

## What it means for the strategy
The Strategy Basis landed on 13 August 2026. Each touchpoint below names a key result from its §2
and states whether OPT-A serves or strains it. This is not a re-scoring — the alignment assessment
ran at A8b against AI-2 and that result stands. These touchpoints name where the narrowed option, now
committed to universal notification on every transaction, meets the strategy.

**ST.a — AI-2: straight-through digital dispute path**

AI-2 measures the share of sales and service processes in primary digital channels that are fully
straight-through. OPT-A creates that path for dispute initiation: notification fires in the digital
channel, cardholder selects the dispute action, pre-filled dispute screen opens in the CS app,
cardholder submits — no channel switch, no navigation, no re-entry of transaction data the bank
holds. ID-3 was scored Moderate on AI-2 at A8b, with the intermediate step that the notification must
reach the cardholder through a primary digital channel and produce a dispute filing in that same
channel. OPT-A is that mechanism; the universal trigger (rather than OPT-B's risk-profile trigger)
does not change the chain — the path from notification to submission is structurally identical.

**ST.b — NOM-4: channel migration from phone and paper to digital**

NOM-4 measures clients migrated from the original channel to the new digital channel. A cardholder
who would previously have called the contact centre or submitted a paper form to dispute an
unrecognised transaction has, through OPT-A, a zero-navigation path from a notification they receive
automatically, with no prior enrollment step. Default-on reach to every cardholder is what makes this
migration reach the broadest pool: cardholders who had never activated a notification feature and did
not know the digital dispute path existed are enrolled at launch without any action on their part.
OPT-A removes the activation barrier that keeps the disengaged segment on the phone or the paper form.

**ST.c — SHD-1: regular relevant interaction (serves or strains; OPT-A's frequency test determines which)**

SHD-1 measures clients having a regular relevant interaction. Every card transaction produces a
notification at the moment the financial event occurs — the moment the cardholder's attention is
already on that event. Default-on reach means the interaction frequency tracks each cardholder's own
spending pattern. OPT-A serves this key result if the notification is experienced as relevant at the
frequency the cardholder's activity produces. OPT-A strains it if frequency produces diminishing
attention — manifesting as opt-outs or notification dismissal without engagement — at the activity
levels where fatigue occurs. The pilot's second test question is the empirical test of which direction
this key result moves, and at what transaction-frequency level the boundary falls.

**ST.d — NOM-3: clients served digitally**

NOM-3 measures clients served digitally. Every dispute submitted through OPT-A's notification path
is a dispute resolved entirely in the digital channel — no call, no form, no branch visit. OPT-A's
contribution to this key result is bounded by the share of cardholders who act on the dispute action
in the notification over the observation period, which the pilot measures directly.

---

## What has to be handled
The Compliance Guidelines are absent. Both touchpoints below are identified from the run's own
material (ID-3's stated touchpoints in A8) and from regulatory knowledge, and both are marked
indicative. No band, severity, or obligation has been assessed. What the Compliance Guidelines would
add is the shaping and assessment of each touchpoint; what is stated here is the identification and
the design choices that address each touchpoint in OPT-A's described functionality.

**CT.a — ePrivacy Directive consent on default-on push notifications**

The Czech implementation of the ePrivacy Directive requires valid consent for push notifications
delivering service communications. Default-on enrollment means the cardholder is enrolled without an
explicit prior opt-in — the design decision that distinguishes OPT-A from KB and CSOB (ST2) but
creates the consent obligation that must be satisfied before deployment.

Addressed in OPT-A functionality: before any transaction notification fires, an enrollment notice is
delivered (in-app message or onboarding screen) describing what the cardholder will receive, what the
notification will contain, and how to opt out; the opt-out is accessible from within every notification
and from the CS app's notification settings; opt-out stops notifications immediately in the current
session and re-enrollment from settings is available at any time; opt-out and re-enrollment events are
logged per cardholder with timestamps, creating an auditable consent record for each cardholder's
enrollment state.

A compliance review confirming that the enrollment notice and opt-out mechanism satisfy the Czech
transposition of the directive is required before deployment. This review process is an open
requirement for the PRD.

**CT.b — GDPR on transaction-level notification content as personal financial data**

The notification content — time, amount, and merchant name from the transaction record — is personal
financial data under the GDPR. The cardholder's exercise of the dispute action initiates a further
processing activity on that data, pre-populating the dispute screen.

Addressed in OPT-A functionality: notification content is scoped to the three minimum fields required
for the cardholder to identify the transaction and exercise the dispute action — time, amount, and
merchant name, and nothing beyond those three fields; no partial card numbers, account identifiers,
location data, or additional transaction metadata appear in the notification; this data-minimisation
scoping is a design specification requirement, not a post-specification UI choice. The processing
basis for sending transaction notifications — whether contractual performance, legitimate interest, or
another basis under the card agreement — must be documented before deployment and must cover both the
notification sending activity and the pre-population of the dispute screen with personal transaction
data. A data protection impact assessment is required before deployment given the volume of personal
financial data involved (all cardholders, all transactions); both the DPIA and the processing basis
documentation are open requirements for the PRD.

---

## What the requirement stage needs
Stage 6 receives OPT-A expanded to analyst-ready depth. The following items are left open by this
expansion and must be resolved in the PRD:

1. **Dispute screen specification.** OPT-A opens a purpose-built pre-filled dispute screen. The PRD
   must specify whether this is a new screen built for the pilot, an adaptation of the existing
   transaction detail screen, or the ID-2 dispute flow reached through a new notification entry path.
   A9 states that ID-3 opens a dispute screen it does not itself build; the PRD is where that
   dependency becomes a specified component with its own requirements.

2. **Notification delivery architecture.** The latency requirement — notifications fire within seconds
   of a card transaction posting (A8 step 1) — has engineering implications the PRD must constrain.
   What backend integration is required to receive the transaction event and dispatch the notification
   within that window must be specified before implementation begins.

3. **Enrollment notice design.** The ePrivacy compliance design requires a disclosure step before the
   first notification fires. The PRD must specify the notice content, its delivery mechanism, and its
   sequencing relative to the first transaction notification.

4. **Pilot measurement plan.** OPT-A tests two questions. The PRD must define the events logged
   (notification received, notification interaction, dispute action selected, dispute submitted,
   opt-out event, re-enrollment event), the comparison baseline for question (a), the stratification
   approach by transaction frequency for question (b), and the observation period.

5. **Success measures — horizon, owner and kill criterion.** The PRD Template requires all three for
   each success measure. For question (a), a 60 to 90 day observation period is implied by the design's
   need to compare pre- and post-notification dispute behaviour, but is not stated here and must be
   agreed before the PRD is finalised. The kill criterion for question (a) — at what absence of change
   the pilot is concluded — is not obvious from OPT-A's design and must be set by the Product Owner.
   For question (b), the kill criterion is structurally implied by OPT-A's own test: if opt-out rate
   reaches a level indicating the notification is experienced as noise rather than signal, the universal
   design has failed its stated question. The threshold is not stated here and must be set before the
   PRD is agreed. The owner for both success measures is unknown from this artifact.

6. **Notification content specification.** Character limits for merchant name truncation when the
   merchant name exceeds the notification display limit, handling of merchant names that are blank or
   ambiguous in the transaction record, and whether notification format and inline action layout differ
   between iOS and Android.

7. **Confirmation action logging.** A8 step 1 specifies that the confirmation action dismisses the
   notification quietly with no further action. The PRD must specify whether this event is logged and
   under what processing basis, given that a cardholder-confirmed authorisation is a potentially useful
   fraud-detection signal.

8. **Notification delivery failure handling.** What the cardholder state is when a push notification
   cannot be delivered to a specific device (device offline, OS-level notification permissions revoked),
   and whether delivery failures are logged against the cardholder's enrollment record.

The compliance touchpoints above name obligations identified without the Compliance Guidelines. The
PRD is the point at which those guidelines would normally be applied; the review processes CT.a and
CT.b require carry the compliance responsibility the guidelines would otherwise supply.

---

## What we could not establish
**What this costs to build.** No Banking Constraints body exists for this run, so nothing here is weighed for technical complexity or operational change.

**What the regulatory weight of each touchpoint is.** The compliance touchpoints above are identified from run material and marked indicative. No Compliance Guidelines body exists to band them, so a reader sees what to look at and not how heavy any of it is.

**Whether a notification at authorisation is technically available.** The market research could not establish for any Czech participant whether notifications fire at authorisation or at settlement, and this pilot's value depends on the first.

---

## How this was produced
**Run 2026-04-card-disputes, stage 5.2 mvp-expansion, quality gate Q5 then decision gate G5b.** OPT-A was selected at G5a by the Product Owner. The decision is recorded in `5-mvp/1-mvp-options.md`.
This document expands that selection to analyst-ready depth. It does not compare OPT-A with OPT-B or
comment on the alternative. OPT-B is closed and remains in A10 unaltered.

OPT-A's three defining properties are stated in A10 and are preserved in this expansion: every card
transaction fires a notification (not a subset filtered by a risk profile); the notification is
default-on for all cardholders (not opt-in); and the notification carries a one-tap dispute action
(not only a balance alert). Dropping any of the three would be piloting something other than OPT-A.


**Assembled from one record**, which carries the option id, the expanded description, the touchpoints and the analyst input as fields a check reads:

- **R-A11-01** — records/5-mvp/A11-r01-expansion.record.md

This artifact traces to A9 (ID-3, the selected idea) and through it to A4 (H1 — no timely
notification of an unauthorised transaction — primary problem). H1 carries trust `weak`: one origin
(participant-d3, first-hand, complete provenance) with the corroboration caveat A4 records against
H2. H1 is placed third in A4's primary list because it is the precondition for the rest of the
dispute journey — a cardholder who does not know cannot act — rather than the journey itself.

A9 notes that OPT-A does not address H2 (forced to the paper form) or H3 (no status visibility).
The pre-filled dispute screen OPT-A opens is the ID-2 flow reached by a different door; nothing
in OPT-A itself tells the cardholder where a filed case stands after submission. Stage 6 inherits
this scope boundary: the dispute screen is a dependency, and H2 and H3 remain unaddressed by this
pilot unless stage 6 widens the scope with a recorded human decision.


Does not re-open the selection of OPT-A or comment on OPT-B. Does not alter A10, A9, A8, A8b, A7,
or A4. Does not run Q5 or report a gate result for its own output. Does not write a decision record
for G5b — a person takes that decision. Does not touch RUN-STATE.md.
