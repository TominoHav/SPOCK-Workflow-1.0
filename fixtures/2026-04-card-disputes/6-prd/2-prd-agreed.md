---
run_id: 2026-04-card-disputes
artifact_id: A13
ost_role: artifact
status: accepted
workflow: discovery
modified_by: human
revisions: 1
produced_by:
  agent: business-analyst
  skill: prd
sources:
  - A11
  - A4
  - A1
external_sources: []
could_not_verify: []
decision:
  gate: G6
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: Product Owner
  accepted_at: 2026-08-18
  reason: "Agreed as drafted, with the three success-measure fields supplied at the 6.2 refine loop and no other change requested. Fourteen requirements, of which seven exist because stages 4 and 5 identified obligations the idea itself never named: the enrollment notice before the first notification fires, the opt-out reachable from every notification and from settings, re-enrollment, the per-cardholder consent log, the notification content held to three fields, the compliance review and the data protection impact assessment. Each is a requirement with acceptance criteria rather than a note in a risks section. Agreed knowing four items handed over from stage 5 remain open and are named as dependencies rather than resolved by inference, and that the Banking Constraints and the Compliance Guidelines do not exist, so nothing here has been validated against the bank's operating frame."
  changed_during_refinement: none
  refinements: []
  note: "The agreement block was typed by the orchestrating assistant on the Product Owner's explicit instruction to sign, and not by the Product Owner himself. This differs from stage 6 of 2026-03-investor-onboarding, where the assistant declined to type it and supplied the command the Product Owner ran, so that no later reader could mistake an agent-produced mark for a human one. C14 refuses only a decision recording by_agent true and cannot see who typed a name, so the difference is recorded here rather than left to a check that cannot reach it. The decision itself is the Product Owner's; the keystrokes were not."
agreement_block:
  name: "Igor Tadic"
  date: "2026-08-18"
assembled_at: 2026-08-20
assembled_from: [R-A13-01]
---

# PRD | OPT-A: Universal real-time transaction notification with dispute action

Every card transaction fires a push notification within seconds of posting, to every retail cardholder, with no setup step and no opt-in, and the notification carries a one-tap route into a dispute. Fourteen requirements specify it, each with acceptance criteria and a trace back to the problem it answers. The problem it answers is that a cardholder finds an unauthorised charge weeks after it happened because nothing told them at the time, and the measure is the share of disputes raised from a notification rather than found in a statement. [rec:R-A13-01]

One thing this document cannot weigh: no Banking Constraints or Compliance Guidelines body exists for this run, so the non-functional requirements below carry no assessed regulatory or operational load.

---

## Overview

This document is the Product Requirements Document for OPT-A: Universal real-time transaction notification with dispute action. OPT-A is the MVP option selected at G5a on 18 August 2026 by Igor Tadic (Product Owner) from the two options produced at stage 5. This document defines what must be built, what it must do, what the pilot must measure, and what the two compliance obligations it carries require before deployment.

OPT-A fires a push notification on every card transaction within seconds of posting, to all retail cardholders of Česká Spořitelna, without any setup, opt-in, or configuration step from the cardholder. The notification identifies the charge — time, amount, and merchant name from the transaction record — and carries two inline actions: a confirmation action that dismisses the notification, and a dispute action that opens the CS app directly to a purpose-built pre-filled dispute screen. From receiving the notification to having a submitted dispute in front of the bank, the cardholder navigates nothing and re-enters nothing the bank's own transaction record already holds.

Default-on enrollment to every cardholder, paired with a one-tap dispute action on every transaction, is the combination no Czech competitor has built. OPT-A is the pilot of whether that combination changes dispute behaviour at scale, and whether universal notification frequency is experienced as a useful daily service or as volume that eventually produces opt-outs.

The agreement block is present and empty. The Product Owner's name and date in the agreement block formally agree this document.

---

## Problem

The run's prioritised problem set (A4) carries four hypotheses: three primary (H3, H2, H1 in that order) and one secondary (H4). OPT-A, as traced through A9 (ID-3) and expanded in A11, directly addresses H1 alone. The scope boundary is stated in A11 and inherited here without change.

**H1 — No timely notification of an unauthorised transaction** — trust: **weak** (A4, primary position three)

A cardholder who does not receive timely notice of a card transaction they did not authorise cannot act on it. The notification, where it arrives at all, arrives days or weeks after the event. By the time the cardholder discovers the charge, the transaction context has faded and the initial moment of awareness — the natural moment to act — has passed. This precondition gates the entire dispute journey: a cardholder who does not know cannot dispute. H1 is placed third in A4's primary list because it is a precondition for the rest of the journey rather than the journey itself. It carries trust tag `weak`: one origin (participant-d3, first-hand, complete provenance); corroboration from a second independent origin has not been sought. OPT-A is the mechanism that closes this gap — the notification fires within seconds of every transaction posting, creating a first moment of awareness at the event itself.

**H3 — No acknowledgement and no status visibility** — trust: **strong** (A4, primary position one)

H3 is the problem at the head of A4 and is the direct driver of the run's success signal (customers stop ringing to ask where their case is). It is not addressed by OPT-A. The pre-filled dispute screen that the dispute action opens is the ID-2 flow reached through a new notification entry path; nothing in OPT-A's design tells the cardholder where a filed case stands after submission. A11 states this boundary explicitly. H3 remains unaddressed by this pilot unless a scope extension is recorded as a human decision at this stage.

**H2 — Forced to paper form; no digital dispute channel** — trust: **weak** (A4, primary position two)

H2 is the second primary problem. The outcome names paper elimination explicitly ("without printing anything") and the product goal restates it ("without a call or a paper form"). OPT-A's dispute action opens a dispute screen; the screen itself is specified in A11 as a dependency, not a deliverable of OPT-A. Whether the dependency screen eliminates the paper form for the cardholder is outside OPT-A's stated scope. H2 is not addressed by this pilot.

**H4 — No closure information after resolution** — trust: **weak** (A4, secondary)

H4 covers the period after a dispute is resolved: no information about whether the perpetrator was identified or whether card data remained exposed. OPT-A covers the path from notification to submission; nothing in its design addresses the post-resolution state. H4 is outside OPT-A's scope and secondary in A4's ordering.

H5 (parked in A4) is not named here. Its qualifying set is empty and A4's decision to park it stands.

---

## Users

**Segment (A1):** Retail debit and credit card holders in the Czech Republic, all ages. Weight toward customers who have had at least one disputed transaction.

**Their situation, drawn from A4 and A1:**

A cardholder uses their card regularly — for daily purchases, transport, online services. When a transaction appears that they did not authorise, they are not notified at the moment it posts. They discover it days or weeks later, through a statement review, a balance check, or — in the cases A4's evidence records — someone else drawing their attention to it. At that point, to report the charge, they must locate and complete a paper form or ring the contact centre. Neither path tells them where the case stands after they file. They ring again to ask. The run's success signal names this second call directly: customers stop ringing to ask where their case is.

OPT-A is designed for this cardholder at the moment of the transaction itself, before the gap between event and awareness opens. By firing a notification on every transaction, OPT-A gives the cardholder a first moment of awareness at the event — the moment when a charge they did not make is most recognisable and most actionable.

The pilot population is the whole enrolled cardholder base, not a self-selected group. Default-on enrollment means cardholders who have never activated a notification feature, who do not know the digital dispute path exists, and who would previously have rung or printed a form are enrolled at launch without any step on their part. The pilot tests whether that broad reach changes dispute behaviour at scale, and whether notification frequency at cardholder activity levels is experienced as service or as noise.

---

## Success measures

OPT-A's pilot tests two questions, both stated in A11. The measures below name what is being observed and what the comparison baseline is. The three fields required by the PRD Template — the observation horizon, the owner of each measure, and the kill criterion — were left as stated gaps in the draft (A12) and were supplied by the Product Owner at the 6.2 refine loop on 2026-08-18.

**Measure A — Dispute behaviour change (OPT-A question a)**

What changes: The rate at which enrolled cardholders dispute unauthorised transactions, relative to the pre-notification baseline measured in the period immediately before the pilot begins.

Direction and baseline: Whether real-time awareness of every transaction increases the dispute rate — and by how much, compared to the period before the notification exists — is what this pilot measures for H1. The pre-notification dispute rate is the comparison point. The baseline period and the method for establishing it are specified in the pilot measurement plan, which A11 flags as an open requirement for the PRD.

*Observation horizon:* 90 days. Agreed by the Product Owner at the 6.2 refine loop on 2026-08-18.

*Owner:* Igor Tadic, Product Owner (temporary). The designation is temporary; the owner is to be confirmed before measurement begins.

*Kill criterion:* If, after the 90-day observation period, the dispute rate in the pilot population has not increased beyond the natural variation of the pre-pilot baseline — where "natural variation" is defined at the time the baseline is established from historical card dispute records — the pilot is concluded. The numeric threshold is set by Igor Tadic (Product Owner, temporary) when the baseline is established, before any pilot notification fires. The stopping condition is agreed before anyone is invested in the outcome; it is not negotiated once results are visible.

**Measure B — Notification frequency engagement (OPT-A question b)**

What changes: Opt-out rate, notification interaction rate, and dispute submission rate, each stratified by cardholder transaction frequency, over the observation period.

Direction and baseline: Whether notification frequency at cardholder activity levels produces engagement with the dispute action or produces diminishing attention — manifesting as opt-outs or dismissal without interaction at higher transaction-frequency bands — is the question the universal design cannot answer without a pilot. The stratified rates over the observation period are the observation. Cardholders in higher transaction-frequency bands who opt out at disproportionately higher rates signal a frequency threshold the design must address.

*Observation horizon:* 90 days. Agreed by the Product Owner at the 6.2 refine loop on 2026-08-18. Applies equally to Measure B.

*Owner:* Igor Tadic, Product Owner (temporary). The designation is temporary; the owner is to be confirmed before measurement begins. Applies equally to Measure B.

*Kill criterion:* If, at any point during the 90-day observation period, the opt-out rate across the enrolled cardholder population — or within any transaction-frequency band identified during baseline analysis — exceeds a threshold indicating that the notification is experienced as noise rather than signal at that activity level, the universal design has failed its stated question for question (b). The numeric threshold is set by Igor Tadic (Product Owner, temporary) when the baseline is established from historical card dispute and cardholder activity records, before any pilot notification fires. The stopping condition is agreed before anyone is invested in the outcome; it is not negotiated once opt-out patterns are visible.

---

## Requirements

**CT.a — ePrivacy Directive consent on default-on push notifications.** The Czech implementation of the ePrivacy Directive requires valid consent for push notifications delivering service communications. Default-on enrollment means the cardholder is enrolled without an explicit prior opt-in — the design decision that creates the consent obligation addressed by R7, R8, R9, R10, and R12. Identified from ePrivacy Directive and Czech Electronic Communications Act regulatory knowledge; the Compliance Guidelines are absent and this touchpoint carries no assessed band, severity or obligation.

**CT.b — GDPR on transaction-level push notification content as personal financial data.** The notification content — time, amount, and merchant name from the transaction record — is personal financial data under the GDPR. The processing basis for sending notifications and pre-populating the dispute screen must be documented before deployment, and a data protection impact assessment is required given the volume of personal financial data involved (all cardholders, all transactions). Addressed by R2, R13, and R14. Identified from GDPR (EU) 2016/679 regulatory knowledge; the Compliance Guidelines are absent and this touchpoint carries no assessed band, severity or obligation.

---

Requirements R1 through R6 trace to A11 and A4 (H1): they implement OPT-A's core notification mechanism, which is the selected solution to H1. R7 through R14 trace to A11 only: they address compliance obligations and operational requirements that A11 identifies as open for the PRD, and they connect to A4 through OPT-A's chain in A11. The two compliance touchpoints from the front matter are addressed by functional requirements, not restated as notes: CT.a by R7, R8, R9, R10, and R12; CT.b by R2, R13, and R14.

---

### R1 — Notification dispatch on every transaction

On every card transaction posting on a cardholder's account, the system must dispatch a push notification to that cardholder's enrolled device. No trigger threshold, risk score, or cardholder activation must gate the dispatch.

*Given* a retail cardholder is enrolled and a card transaction posts, *when* the transaction is processed, *then* a push notification must be dispatched to the cardholder's enrolled device. A dispatch failure must be logged as a failed delivery attempt and must not alter the cardholder's enrollment state or be recorded as an opt-out event.

---

### R2 — Notification content scope — *addresses CT.b*

The notification must contain exactly three fields from the transaction record: time, amount, and merchant name. No other fields — including partial card numbers, account identifiers, location data, or additional transaction metadata — must appear in the notification payload at any point in the dispatch pipeline or on the cardholder's device.

*Given* a notification is dispatched for any card transaction, *when* it appears on the cardholder's device, *then* it must show time, amount, and merchant name and no other transaction data. Where the merchant name is absent or ambiguous in the transaction record, the notification must display a specified fallback string rather than suppressing the notification or displaying a blank field; the fallback string must be defined in the implementation specification before deployment.

---

### R3 — Dispute action: pre-filled dispute screen

The notification must carry a dispute action. Selecting the dispute action must open the CS app directly to a dispute screen pre-filled with the transaction's date, amount, and merchant from the transaction record and with the dispute reason pre-selected as the unauthorised charge variant. The cardholder must be able to submit the dispute without re-entering any of the pre-filled fields and without any navigation step.

The type of dispute screen — whether a new screen built for the pilot, an adapted version of the existing transaction detail screen, or the ID-2 dispute flow reached through a new notification entry point — is an open specification item that must be resolved before implementation begins. A9 states that ID-3 opens a dispute screen it does not itself build; this PRD is where that dependency becomes a specified component.

*Given* a cardholder receives a notification and selects the dispute action, *when* the CS app opens, *then* the dispute screen must show date, amount, merchant, and reason pre-filled, and the cardholder must be able to submit without editing those fields. Where the CS app is not installed on the device, the fallback path must be defined in the implementation specification before deployment.

---

### R4 — Confirmation action: quiet dismissal

The notification must carry a confirmation action. Selecting the confirmation action must dismiss the notification without opening any screen and without requiring any further action from the cardholder.

*Given* a cardholder selects the confirmation action on any transaction notification, *when* the action is triggered, *then* the notification must be dismissed and no screen must open on any application currently in use on the device.

---

### R5 — Standard dispute path preserved

A cardholder who dismisses the notification without acting, or who does not receive the notification, must be able to find the same transaction in the CS app's transaction list and initiate a dispute from the transaction detail screen using the existing path. The standard path and the notification path must reach the same dispute screen.

*Given* a cardholder navigates to any card transaction in the CS app's transaction list, *when* they select the dispute option from the transaction detail screen, *then* they must reach the same dispute screen that the notification path opens. The standard path must remain fully operational during and after the pilot period, regardless of notification delivery status.

---

### R6 — Default-on enrollment at launch

On launch, the system must enroll all retail debit and credit cardholders in the transaction notification service without any activation step from any cardholder.

*Given* the service is enabled in production, *when* any retail cardholder who has never activated a notification feature makes a card transaction, *then* a push notification must be dispatched to their enrolled device. A cardholder whose device does not support push notifications, or whose OS-level notification permissions are disabled, must still be recorded in the system's enrollment state as enrolled; the system must distinguish this state from a cardholder who has actively opted out.

---

### R7 — Enrollment notice before first notification — *addresses CT.a*

Before the first transaction notification is dispatched to any cardholder, that cardholder must have received an enrollment notice. The notice must state: that the cardholder will receive a push notification on every card transaction; what the notification will contain (time, amount, and merchant name); and how to opt out immediately. The notice must be delivered as an in-app message or onboarding screen, sequenced before the first transaction notification for each cardholder individually.

*Given* the service is enabled in production, *when* a retail cardholder opens the CS app for the first time, *then* the enrollment notice must be displayed before any transaction notification is dispatched to that cardholder. No transaction notification must be dispatched to any cardholder before that cardholder's enrollment notice has been delivered.

---

### R8 — Opt-out: accessibility and immediate effect — *addresses CT.a*

The option to opt out of all transaction notifications must be accessible from within every individual transaction notification and from the CS app's notification settings. Selecting opt-out must stop all further transaction notifications for that cardholder immediately, without any additional confirmation step.

*Given* an enrolled cardholder selects opt-out from within a transaction notification, *when* the action is processed, *then* no further transaction notifications must be dispatched to that cardholder from that moment. *Given* a cardholder navigates to the CS app's notification settings and selects opt-out, *when* the action is processed, *then* no further transaction notifications must be dispatched from that moment. A notification already in the dispatch queue at the moment opt-out is registered must not be delivered.

---

### R9 — Re-enrollment from settings — *addresses CT.a*

A cardholder who has opted out must be able to re-enroll in transaction notifications from the CS app's notification settings at any time, without contacting the contact centre and without any action outside the CS app. Re-enrollment must resume notifications from the first card transaction after the re-enrollment event is logged.

*Given* a cardholder who has opted out navigates to the CS app's notification settings and selects re-enrollment, *when* the action is processed, *then* transaction notifications must resume and the next card transaction must generate a notification dispatched to the cardholder's enrolled device.

---

### R10 — Per-cardholder consent event log — *addresses CT.a*

Every opt-out event and every re-enrollment event must be logged per cardholder with a timestamp, the cardholder identifier, and the channel through which the change was made (from within a notification, or from the CS app's notification settings). The log must constitute an auditable record of each cardholder's enrollment state and every change to that state over the full pilot period.

*Given* a cardholder opts out or re-enrolls through any available channel, *when* the action is processed, *then* an event record must be written containing the cardholder identifier, the timestamp, and the source channel. A failure to write the record must not prevent the opt-out or re-enrollment from taking effect; the failure must be flagged for manual resolution.

---

### R11 — Pilot measurement event log

The system must log the following events per cardholder per notification: notification dispatched, notification delivered (device confirmation received), notification interaction (dispute action or confirmation action selected), dispute submitted through the notification path, opt-out event, and re-enrollment event. Each log entry must include the cardholder identifier, a timestamp, and a transaction frequency band for the cardholder, to support stratification for pilot question (b).

*Given* a cardholder receives a notification and selects the dispute action and submits the dispute, *when* those events occur, *then* the log must contain entries for: notification dispatched, notification delivered, dispute action selected, and dispute submitted — each with cardholder identifier and timestamp. Delivery not confirmed by the device must be logged as unconfirmed, not as delivered.

---

### R12 — Compliance review of enrollment notice and opt-out mechanism before deployment — *open requirement, addresses CT.a*

A compliance review confirming that the enrollment notice and the opt-out mechanism satisfy the Czech transposition of the ePrivacy Directive must be completed and documented before any transaction notification is dispatched in production. The review must cover: the enrollment notice content, opt-out accessibility from the notification and from settings (R8), the immediate effect of opt-out (R8), and the consent record produced by R10. Deployment is blocked until this review is signed off.

*Given* the enrollment notice and opt-out mechanism are fully specified, *when* the compliance review is conducted, *then* a documented sign-off from the legal or compliance function must confirm that the mechanism satisfies the directive before production deployment proceeds. Where the review identifies deficiencies, the mechanism must be revised and re-reviewed; no deployment may proceed on a provisional basis.

---

### R13 — Processing basis documentation before deployment — *open requirement, addresses CT.b*

The processing basis for dispatching transaction notifications and for pre-populating the dispute screen with personal transaction data must be determined, documented, and legally reviewed before deployment. The documentation must address each activity separately and name the applicable GDPR basis — whether contractual performance, legitimate interest, or another basis under the card agreement. Deployment is blocked until this documentation is complete.

*Given* the notification and dispute screen functionality are fully specified, *when* the legal review of the processing basis is conducted, *then* a documented determination of the basis for each of the two processing activities must be present and approved before production deployment. Where a basis cannot be established for either activity, that activity must be redesigned before deployment.

---

### R14 — Data protection impact assessment before deployment — *open requirement, addresses CT.b*

A data protection impact assessment must be completed before deployment. The DPIA must cover: the volume of personal financial data processed (all enrolled cardholders, all card transactions); the notification content scope (R2); the consent record mechanism (R10); the event logs (R10 and R11); and the processing basis established in R13. Any required mitigations identified in the DPIA must be implemented before deployment. Deployment is blocked until the DPIA is complete and signed off by the data protection function.

*Given* the full system specification is complete and R12 and R13 are satisfied, *when* the DPIA is conducted, *then* a completed DPIA with sign-off from the data protection function must be present, confirming all required mitigations are in place before production deployment. Where the DPIA identifies a high residual risk that cannot be mitigated, the supervisory authority must be consulted before deployment in accordance with GDPR Article 36.

---

## Non-functional requirements

**Performance — notification dispatch latency**

A11 specifies that the notification must fire "within seconds" of a card transaction posting. A specific latency ceiling — for example, delivery within a measured number of seconds of the transaction authorisation event at the card scheme — is not established in A11 and has no measured baseline in the current process. The latency target must be established by the delivery team against the transaction processing pipeline before implementation begins, as A11's note on notification delivery architecture records. The implementation must not proceed to the Definition of Ready for the notification dispatch component without a stated and agreed latency figure.

**Performance — notification delivery failure**

When a push notification cannot be delivered to a cardholder's device — because the device is offline, because OS-level notification permissions have been revoked, or because the push token is invalid — the cardholder's enrollment state must not change as a result. The failed delivery must be logged as a delivery failure, distinguishable from an opt-out event in all system records. Whether delivery failures are additionally logged against the cardholder's enrollment record is recorded in A11 as an open item for the PRD; the minimum requirement is that failures are captured and do not silently alter enrollment state or consent records.

**Security**

Notification content — time, amount, and merchant name — is personal financial data in transit. It must be transmitted through the OS-provided push notification channel without additional fields in the payload at any stage of the dispatch pipeline. The pre-population of the dispute screen draws on the transaction record; the access controls governing that draw are set by the bank's information security standards, which are not stated in A11 and must be applied before deployment.

**Data handling**

The event logs produced under R10 and R11 contain personal financial data. Their retention period must be set by the processing basis documentation (R13) and the DPIA (R14) and must be sufficient to cover the full pilot observation period plus any required post-pilot review period. The logs must not be deleted before R12, R13, and R14 are complete and signed off. No transaction metadata beyond the fields specified in R10 and R11 may be included in the logs.

**Accessibility**

The transaction notification and its inline actions must comply with the accessibility requirements of the iOS and Android platforms for push notification content. The bank's digital accessibility standards apply and are not stated in A11; conformance must be confirmed by the delivery team before production deployment.

**Availability**

The notification dispatch service must be available whenever the CS app's card transaction processing is active. Specific availability targets — uptime percentage, recovery time objective, recovery point objective — are not established in A11 and are normally sourced from the bank's platform service level agreements. These targets must be established and agreed before implementation begins.

---

## Out of scope

What follows is what was weighed in this run and excluded, with the reason. It is not a list of everything this product is not.

**H3 — Status tracking and acknowledgement after dispute submission**

H3 is placed first in A4's primary set and is the direct driver of the run's success signal (customers stop ringing to ask where their case is). OPT-A does not address it. The notification-path dispute submission ends at submission; nothing in OPT-A's design tells the cardholder where a filed case stands afterwards. A9 notes this boundary explicitly. Addressing H3 within this pilot would require a case-tracking view — a different component, not a narrowing of OPT-A. No scope extension was recorded at this stage.

**H2 — Paper form elimination as the primary dispute channel**

H2 is placed second in A4's primary set. The outcome names paper elimination explicitly. OPT-A opens the CS app's dispute screen through the notification entry path; the dispute screen is a design dependency (R3) rather than something OPT-A builds. Whether the dependency screen eliminates the paper form for the cardholder is outside OPT-A's stated scope. The screen specification (R3 open item) will determine how much of H2 is incidentally addressed by the dependency, but no requirement in this PRD constrains it to that end.

**H4 — Post-resolution closure information**

H4 is secondary in A4. It addresses what the cardholder is told after a dispute is resolved — whether the perpetrator was identified, whether card data remained exposed. OPT-A covers the path from notification to submission; it does not extend to the post-resolution state. H4 is outside OPT-A's scope.

**OPT-B — Risk-filtered transaction notification**

The alternative pilot option, OPT-B, fired a notification only on transactions meeting a risk or novelty threshold, rather than on every transaction. OPT-B represents the selective-alerting model seen in the competitive analysis. The Product Owner selected OPT-A at G5a. OPT-B remains in A10, closed and unaltered.

**Ideas assessed at stage 4 and not selected**

Five ideas were assessed at stage 4 and idea scoring was recorded in A8. One was selected (ID-3, which became the basis for OPT-A through the option design in A10). The four ideas not selected were weighed and not taken forward; their reasoning and scoring are in A8 and A9 and are not repeated here.

---

## Dependencies

What OPT-A needs that this run does not supply, meaning the systems, teams, decisions and data whose absence would prevent implementation or deployment.

**Dispute screen — design dependency**

OPT-A's dispute action must have a screen to open. A11 identifies this explicitly: whether the screen is a new screen built for the pilot, an adapted version of the existing transaction detail screen, or the ID-2 dispute flow reached through a new notification entry point must be specified before implementation begins. This is an open specification item in R3. The screen cannot be built from the requirements in this document alone; it requires a separate design decision, recorded as a human choice before the Definition of Ready.

**Transaction event feed — technical dependency**

The within-seconds notification latency requires a real-time feed from the card processing infrastructure delivering the transaction record to the notification dispatch service at the moment the transaction posts at the card scheme. What backend integration receives the event and dispatches the push notification within the latency window is not specified in this run. It must be specified before implementation begins, as A11's note on notification delivery architecture records (non-functional performance).

**Enrollment notice content and delivery specification — design dependency**

R7 requires that the enrollment notice is delivered before the first notification fires. The specific notice text, its delivery mechanism (in-app message or onboarding screen), and its sequencing relative to the first transaction notification must be specified before implementation. The content must also satisfy the compliance review (R12) before deployment.

**Compliance review of enrollment notice and opt-out mechanism — owned outside this run**

R12 blocks deployment. The legal or compliance function must review and sign off the enrollment notice and opt-out mechanism against the Czech transposition of the ePrivacy Directive. This review cannot be completed within this run.

**Processing basis documentation — owned outside this run**

R13 blocks deployment. The legal function must determine and document the GDPR processing basis for dispatching transaction notifications and for pre-populating the dispute screen with personal transaction data. This determination cannot be completed within this run.

**Data protection impact assessment — owned outside this run**

R14 blocks deployment. The data protection function must complete a DPIA covering all enrolled cardholders and all card transactions, and any required mitigations must be implemented before deployment. This cannot be completed within this run.

**Pre-pilot dispute baseline — data dependency**

Pilot question (a) measures dispute behaviour change relative to the pre-notification dispute rate. That baseline must be established from historical card dispute records before the pilot begins. Access to those records is owned by card operations and is not supplied by this run.

**Bank platform service level agreements — operational dependency**

Availability targets for the notification dispatch service are not established in A11 and are normally sourced from the bank's existing platform SLAs. These must be obtained and agreed before implementation begins.
