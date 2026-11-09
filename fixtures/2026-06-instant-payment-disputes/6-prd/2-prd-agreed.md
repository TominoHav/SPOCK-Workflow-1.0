---
run_id: 2026-06-instant-payment-disputes
artifact_id: A13
ost_role: artifact
status: accepted
workflow: discovery
modified_by: agent
revisions: 1
sources:
  - A12
  - A11
  - A4
external_sources: []
could_not_verify: []
decision:
  gate: G6
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: product_owner
  accepted_at: 2026-08-23
  changed_during_refinement: none
  refinements: []
  note: "Agreed as it stands, with three items carried forward as named gaps rather than closed by the signature: the success measures carry no horizon, owner or kill criterion; all four compliance touchpoints rest on a basis that does not exist for this run; and the first release is euro payments only, with the Czech koruna path unconfirmed."
assembled_at: 2026-08-23
assembled_from:
  - R-A13-01
---

# Discovery | PRD agreed - Automated recall despatch and client notification

This document defines the requirements for an automated recall despatch service attached to claim registration in existing contact-centre and branch systems. The first release covers EUR-denominated instant payments only. Two primary problems from this run drive the requirements: H2 (the path from a client's call to a recall being sent takes two hours at minimum on a weekday, trust: strong) and H4 (neither the contact centre nor the branch can confirm whether the recall has gone out or whether recovery is still possible, trust: strong). Four compliance areas carry no regulatory basis in this run; each is addressed in a requirement that names what is assumed and what must be confirmed before the PRD can be finalised. [rec:R-A13-01]

---

## Overview

The system attaches an automated recall despatch to the moment a contact-centre or branch agent registers a claim in existing tooling. When the agent registers the claim, the recall service generates and sends an ISO 20022 message to the receiving bank via the EBA CLEARING RT1 network without routing through a human handoff chain. On acceptance, the network returns a timestamp and a case reference. Two confirmations are issued in the same event: one displayed in the agent's active session before the call or visit ends, one delivered to the client through an outbound digital channel. Both carry the same timestamp and case reference.

This document defines OPT-B, the MVP option selected at stage 5: staff register the claim through existing contact-centre and branch systems, the recall despatch fires automatically at registration, and a timestamped confirmation reaches the agent and the client at the same time through separate channels. The first release covers EUR-denominated instant payments carried via RT1. CZK-denominated payments are out of scope until a technical stakeholder confirms that CERTIS carries an equivalent ISO 20022 recall message.

---

## Problem

Two problems from the prioritised problem set drive this document.

H2 - The path from a client's call to a recall being sent takes two hours at minimum on a weekday. Trust: strong. Two first-hand witnesses described the handoff chain from both sides: the contact-centre agent who fills the recall form and cannot send the recall, and the recalls-desk operator who works cases in arrival order and has sent requests four days after payment. The aggregated twelve-month report is the third independent origin. This document removes the handoff chain and the recalls-desk queue entirely.

H4 - Neither the contact centre nor the branch can answer the two questions clients always ask. Trust: strong. The questions are whether the recall has been sent and whether recovery is still possible. Four independent origins support this, three of them first-hand. This document addresses H4 by giving the agent a timestamped in-session confirmation and giving the client the same confirmation through a separate digital channel, so both parties in the session share the same fact before the call or visit ends.

---

## Users

Two user groups.

Retail clients who have sent an instant payment to the wrong recipient or have been deceived into sending one. They contact the bank through an existing channel (phone, branch visit, or digital intake) in the period when recall is still possible. They currently leave the session with no written confirmation that a recall has been filed or sent and no way to know whether recovery is possible before the receiving bank responds.

Contact-centre agents and branch advisers who register the recall claim. They currently fill a recall form that routes to a separate team, and they cannot tell the client whether the recall has been sent or whether the claim has been picked up. This document changes that: the agent holds a timestamped confirmation before the call ends.

---

## Success measures

Three measures, no baselines. The pilot cannot report progress without a baseline and A11 states this gap; the PRD records it rather than inventing values. A reviewer at G6 must decide whether to accept the absence of horizons, owners and kill criteria or name them before signing.

1. Time from claim registration to recall message despatch. Direction: decrease. Baseline: not measured; no system currently records when a client first contacts the bank about a recall. A proxy measure (time from registration event to RT1 acceptance timestamp) is available from the despatch service log. Horizon, owner and kill criterion: not agreed at this stage; must be established before the pilot runs.

2. Client re-contact rate after filing a recall. Direction: decrease. Baseline: not measured. A client who holds their own timestamped confirmation is expected to call back less. Horizon, owner and kill criterion: not agreed at this stage.

3. Agent handling time on a recall registration. Direction: decrease, holding total registration time near current levels by removing the routing and follow-up steps that existed between registration and despatch. Baseline: not measured. Horizon, owner and kill criterion: not agreed at this stage.

The pilot produces data on these three measures. Without agreed horizons, owners and kill criteria it produces data and no decision.

---

## Requirements

### R1 - Automated despatch at registration

When a contact-centre or branch agent registers a recall claim through an existing system, the despatch service must send an ISO 20022 recall message to the receiving bank via the EBA CLEARING RT1 network. Despatch must complete without any manual action between registration and submission to RT1. The recall message must be submitted to RT1 before the agent session ends.

Traces to: A11, H2.

Acceptance criteria:

- Given a claim is registered in the existing contact-centre or branch system, when the registration event fires, the despatch service submits the recall message to RT1.
- Given the despatch service cannot reach RT1, the agent sees an in-session error identifying the failure and the case is logged as non-despatched.
- Given RT1 returns a technical rejection, the system records the rejection and surfaces the reason to the agent in session.

### R2 - EUR scope and message format

The first release covers EUR-denominated instant payments carried via the EBA CLEARING RT1 network. The outbound recall message must conform to EBA CLEARING RT1 scheme rules for SEPA Instant Credit Transfer recall. The applicable message type (pacs.028 or camt.056) must be confirmed against EBA CLEARING scheme documentation by a technical stakeholder before requirements in this area are treated as final. CZK-denominated payments must not be included in the first release; a CZK capability requires a technical stakeholder to confirm that CERTIS carries an equivalent ISO 20022 recall message. This requirement assumes that pacs.028 or camt.056 is the correct format and records that the specific choice is outstanding. Basis: absent.

Traces to: A11, H2.

Acceptance criteria:

- Given a EUR instant payment recall claim, the recall message uses the scheme-confirmed RT1 message type.
- Given a CZK instant payment recall claim, the system surfaces an in-scope limitation to the agent and does not attempt despatch.
- The recall message passes RT1 scheme validation on submission.

### R3 - In-session agent confirmation

When the RT1 network accepts a recall message, the despatch service must display a confirmation in the attending agent's active session. The confirmation must appear before the session ends. The confirmation must carry the RT1 acceptance timestamp and the case reference returned by the network.

Traces to: A11, H4.

Acceptance criteria:

- Given RT1 acceptance, the agent's active session displays the acceptance timestamp and case reference without the agent taking any additional action.
- The confirmation must appear within the session that registered the claim.
- Given RT1 rejection, the agent sees the rejection reason and not the acceptance confirmation.

### R4 - Client digital confirmation

At the same event that delivers the agent confirmation, the despatch service must deliver a notification to the client through an outbound digital channel. The channel (SMS, push notification, or both), the gateway, and the failure-handling path must be specified before the PRD is finalised. The client notification must carry the same RT1 acceptance timestamp and case reference as the agent confirmation.

Traces to: A11, H4.

Acceptance criteria:

- Given RT1 acceptance, the client receives a notification on the specified channel within the current session window.
- The notification carries the same timestamp and case reference as the agent confirmation.
- Given notification delivery fails, the agent is informed in session and the recovery path (agent relay or retry) is followed as defined in the finalised channel specification.
- Given RT1 rejection, the client notification is not issued.

### R5 - Audit log per recall

Every automated recall attempt, whether accepted or rejected by RT1, must generate a log entry before the session ends. The log entry must carry at minimum: the registration timestamp, the outbound ISO 20022 message identifier, the RT1 acceptance or rejection timestamp, the attending agent's identifier, the client identifier, the case reference, and the delivery status of both confirmations. No recall attempt may complete without a log entry. The required fields, retention period, storage location, and log integrity standard must be confirmed against the Compliance Guidelines before the PRD is finalised. This requirement assumes the listed fields are necessary and records that the regulatory basis is outstanding. Basis: absent.

Traces to: A11, H2, H4.

Acceptance criteria:

- Given any recall despatch attempt, a log entry exists before the session ends.
- The log entry carries all listed fields, with values populated or an explicit error state for any field that could not be written.
- A recall with no log entry is an unrecoverable error and triggers an alert.

### R6 - Failure handling

If the RT1 network returns a rejection, the despatch service must log the rejection code, surface the rejection reason to the attending agent in session, and record the case as non-despatched. The client notification must not be issued for a rejected despatch. No recall attempt may result in a state where neither the agent nor the log records the outcome.

Traces to: A11, H2.

Acceptance criteria:

- Given RT1 rejection, the agent's session displays the rejection reason.
- Given RT1 rejection, the case is recorded as non-despatched in the audit log with the rejection code.
- Given RT1 rejection, the client notification channel is not triggered.
- No silent failure state is reachable: every recall attempt ends in a logged accepted state or a logged rejection.

### R7 - Notification content

The client notification must state that despatch is a request to the receiving bank and not a guarantee of return, and that the receiving bank's cooperation is required before recovery can happen. The notification must not state or imply that recovery is certain. The notification content template must be reviewed against any regulatory requirement on outbound recall notifications before the template is deployed. This requirement assumes these statements are necessary and records that the regulatory basis for mandatory content is outstanding. Basis: absent.

Traces to: A11, H4.

Acceptance criteria:

- The notification contains an explicit statement that despatch is a request and not a guarantee.
- The notification contains no statement that implies recovery is certain or probable.
- The content template has been reviewed against the applicable regulatory requirement and that review is documented before the template goes live.

### R8 - Agent authentication

The trigger from claim registration to recall despatch must run within an authenticated agent session using the existing contact-centre or branch authentication stack. No new authentication path is introduced by this release. The assumption that existing agent authentication provides sufficient authorisation for automated recall initiation must be confirmed against the Compliance Guidelines before the PRD is finalised. Basis: absent.

Traces to: A11.

Acceptance criteria:

- The despatch service accepts a trigger only from an active, authenticated agent session.
- A recall trigger from an unauthenticated session is rejected and logged.
- No new credential type or authentication mechanism is introduced.
- The sufficiency of existing authentication for automated recall authorisation is confirmed in writing by the compliance function before deployment.

---

## Non-functional requirements

Performance: the session window is the operational constraint. The recall message must be submitted to RT1 and both confirmations issued before the agent session ends. A numeric target for time from registration event to confirmation display is not established; the current process has no equivalent to measure against and a derived number would be speculation. The target must be agreed with the infrastructure team using RT1 SLA data before deployment.

Security: the despatch service must verify that each incoming trigger originates from an authenticated agent session (R8). No new authentication surface is introduced. The audit log must be protected against modification after a log entry is written; the integrity standard requires confirmation against the Compliance Guidelines, which are absent from this run.

Data handling: the log retention period is not established. The Compliance Guidelines are the source of the applicable retention requirement. The PRD must be updated with the confirmed retention period before it is finalised.

Accessibility: not applicable to this release. The contact-centre and branch staff interfaces are unchanged. The client notification uses an outbound digital channel with no new interactive surface on the client side.

Availability: the automated despatch is a time-sensitive operation. RT1 network availability depends on EBA CLEARING SLA and is outside the bank's control. The despatch service must handle RT1 downtime by failing the attempt, logging the failure, and surfacing an error to the agent in session. A target for despatch service own availability is not established and must be agreed with the infrastructure team before deployment.

---

## Out of scope

CZK-denominated instant payments. The CERTIS recall message path is unconfirmed. A technical stakeholder must confirm that CERTIS carries an equivalent ISO 20022 recall message before CZK payments can be included. The exclusion is a dependency, not a design decision; when the dependency is resolved, CZK scope can be added without changing the architecture of the first release.

Self-service recall trigger in the mobile app. H1 (no way to start a recovery attempt from the app) was in the primary problem set but was not addressed by IDEA-05. A client who has sent a misdirected payment and opens the mobile app finds no self-service recall trigger under this release. H1 remains open for a future run.

Out-of-hours digital registration. Thirty-eight per cent of cases (H5, trust: strong) arrive outside contact-centre hours. This release does not change registration channel availability. A client who cannot reach the contact centre or a branch outside business hours has no path to registering a recall claim.

Fraud case queue prioritisation. H3 (fraud recall cases wait in the same queue as all other investigation types) is parked. This release removes the queue entirely for the automated despatch path; H3 dissolves if this release succeeds.

Ongoing case status tracking. H7 (a client receives no information during the nine days between filing and hearing the outcome) was not addressed by IDEA-05. This release provides a despatch confirmation at registration; it does not provide ongoing tracking from despatch to outcome.

---

## Dependencies

EBA CLEARING RT1 network. The despatch service submits recall messages to RT1. The applicable message type (pacs.028 or camt.056) must be confirmed against EBA CLEARING scheme documentation before R2 is treated as final. Owner: EBA CLEARING. Risk if absent: no EUR recall despatch is possible.

Technical stakeholder for message format. The choice between pacs.028 and camt.056 under RT1 scheme rules must be confirmed by a technical stakeholder with access to EBA CLEARING scheme documentation. Required before R2 is finalised. Owner: to be named. Risk if absent: recall messages may be submitted in the wrong format and rejected.

Outbound digital notification channel. The client notification in R4 requires a channel (SMS, push, or both), a gateway, and a defined failure-handling path. None of these is specified in this document. Owner: to be named. Risk if absent: R4 cannot be built.

Compliance Guidelines. Four requirements (R2, R5, R7, R8) each carry a compliance assumption that must be confirmed against the Compliance Guidelines before the PRD is finalised. The Compliance Guidelines are absent from this run. Risk if absent: the audit log specification, notification content template, message format choice, and authentication sufficiency assessment cannot be completed.

CERTIS technical stakeholder. CZK expansion requires confirmation that CERTIS carries an equivalent ISO 20022 recall message. Not required for the first release. Owner: to be named.

Existing contact-centre and branch registration systems. The despatch service fires from a registration event in these systems. The event format and the integration point must be specified by the systems team. Owner: to be named. Risk if absent: the automated trigger cannot be built.
