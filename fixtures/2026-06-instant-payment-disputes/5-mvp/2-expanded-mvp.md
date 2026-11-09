---
run_id: 2026-06-instant-payment-disputes
artifact_id: A11
ost_role: artifact
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
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
      role: product_owner
  accepted_at: 2026-08-22
  changed_during_refinement: none
  refinements: []
  note: "Accepted with the euro-only first release and the four compliance touchpoints carrying no basis. Both carry forward as work the requirement stage has to close, which is what the expansion's own closing section says. The CERTIS question for Czech koruna is not answered here."
assembled_at: 2026-08-22
assembled_from:
  - R-A11-01
---

# Expanded pilot: automated recall despatch with client notification

OPT-B attaches automated ISO 20022 recall despatch to claim registration through existing staff channels, and delivers a timestamped confirmation to both the attending agent and the client in the same session. The client holds their own digital record without depending on the agent to relay it. This document expands the selected option to the depth the PRD stage needs. [rec:R-A11-01]

---

## What it is

A backend process that fires at the moment a contact-centre or branch agent registers a recall claim. Registration triggers the ISO 20022 recall message to the receiving bank without routing through the recalls desk. The message network returns a timestamp and a case reference. Two confirmations are issued in the same event: one surfaced in the agent's active session before the call or visit ends, one delivered to the client through an outbound digital channel (SMS or push notification). Both carry the same timestamp and the same case reference.

The pilot covers EUR-denominated instant payments carried via the EBA CLEARING RT1 network. CZK-denominated payments are scoped out until the CERTIS recall message path is confirmed.

The client-facing registration surface is unchanged. The client calls or visits; the agent registers the claim through existing tooling; the automated process fires from that event. Two problems from this run are addressed. H2 is addressed by removing the handoff chain: the recall fires within seconds of registration rather than after the form has routed to and been worked by the recalls desk. H4 is addressed on both sides: agent and client hold the same fact before the session ends.

## How it works

The agent registers the recall claim through the existing contact-centre or branch system. The registration event fires a trigger to the recall despatch service. The service generates the ISO 20022 message (pacs.028 or camt.056 per the RT1 scheme rules, to be confirmed at PRD) and submits it to the RT1 network. On acceptance, the network returns a message identifier and an acceptance timestamp. The despatch service logs both and fires two events simultaneously: a staff confirmation pushed to the agent's session, and a client notification dispatched through the outbound digital channel.

The agent's confirmation appears before the call ends. The client's notification carries the same timestamp and case reference the agent sees.

Failure path: if the RT1 network returns a rejection, the despatch service logs the rejection code and surfaces it to the agent in session. The agent informs the client verbally. The failure is recorded as a non-despatched case, and the audit log carries the rejection reason. No silent failure is permitted.

## What the pilot tests

Three things, in order of certainty.

The operational question - does the automated despatch fire reliably within the session window and at real claim registration volume? - this is the baseline the pilot must answer before any behavioural finding can be trusted. A confirmation that arrives after the call ends is not an in-session confirmation.

The behavioural question - does a client who receives their own timestamped confirmation call back less, or escalate less, after filing? This is specific to OPT-B and cannot be answered from OPT-A data. The pilot needs a defined measure and a period before it can produce an answer; those are for the PRD stage to agree.

The staff trust question - do agents rely on the automated confirmation and relay it as a fact, or do they hedge when talking to the client? The confirmation has no value if agents do not trust it enough to say "the recall has been sent" rather than "I believe the recall will be processed." This is observable in the call recordings and in re-contact rates.

## What it means for the strategy

The automated despatch removes the manual recall-form routing step and the recalls-desk queue that agents handled between registration and despatch. Average daily administration time per agent attributable to recall registration falls to the registration itself. This serves SHD-4 (decrease average time a banker spends daily on administration): the step that existed before registration is complete does not exist in OPT-B.

Claim registration to outbound recall message is straight-through: no human handoff breaks the chain. This serves AI-2 (increase share of service processes that are fully straight-through). The path from client contact to bank action closes within the session, which is the condition the key result measures.

The client's direct timestamped confirmation changes the registration moment from a filing action to a confirmed action. A client who receives their own record in the same session holds a different impression of the bank's response than one who is told the desk will follow up. This serves LVL-4 (increase perceived value for money, measured by NPS methodology). The link is one step: an experience that feels immediately responsive at a high-stakes moment affects the NPS rating for that interaction.

## What has to be handled

Four compliance areas are identified. The Compliance Guidelines are absent from this run; each area names what OPT-B does about it and marks the regulatory basis as absent. The basis must be confirmed before the PRD can finalise requirements in these areas.

**Audit trail.** Every automated recall must generate a record carrying the registration timestamp, the outbound message identifier, the RT1 acceptance timestamp, the agent identifier, the client identifier, the case reference, and the notification delivery status for both confirmations. The automated log is the equivalent of the manual form the process replaces. Basis: absent; retention period, required fields, storage location and log integrity standard require confirmation against the Compliance Guidelines.

**ISO 20022 message format.** The outbound recall message must conform to the EBA CLEARING RT1 scheme rules for SEPA Instant Credit Transfer recall. The pilot scopes to EUR payments via RT1. CZK-denominated payments are excluded until the CERTIS message format and path are confirmed with a technical stakeholder. Basis: absent; pacs.028 or camt.056 applicability must be confirmed at the PRD stage against EBA CLEARING scheme documentation.

**Client notification content.** The notification must state that despatch is a request to the receiving bank and not a guarantee of return, and that the receiving bank's cooperation is required. It must not state or imply that recovery is certain. The notification template must be reviewed against any regulatory requirement on what outbound recall notifications must and must not say. Basis: absent; the Compliance Guidelines must be consulted before the template is finalised.

**Agent authorisation.** The trigger from claim registration to recall despatch runs within an authenticated agent session. OPT-B relies on the existing agent authentication stack and introduces no new authentication path. The assumption that existing authentication is sufficient authorisation for automated recall initiation must be confirmed against the Compliance Guidelines.

## What the requirement stage needs

Four open items the PRD stage must close before requirements can be written.

The outbound notification channel must be specified: the channel (SMS, push or both), the gateway, the content template including the compliance-required statements about certainty, the failure-handling path when delivery fails, and whether there is a retry or the agent assumes responsibility for relay on failure.

The audit log must be defined: the required fields listed above, the retention period, the storage location, and whether the log must be independently verifiable against the RT1 network's own records.

The payment scope must be stated as EUR-only in the first release, with the CERTIS question named as an open dependency for CZK. The PRD must specify what confirmation a technical stakeholder must provide before CZK payments can be added.

The success measures must be agreed before the pilot runs. Time from claim registration to message despatch has never been measured. Client re-contact rate after filing a recall has never been measured. Agent handling time on a recall registration has never been measured. The PRD must agree a proxy measure and a direction for each, name the horizon, the owner and the kill criterion, or record explicitly that these could not be agreed. A pilot without a declared success threshold produces data but not a decision.

Traceability: A11 traces to A9 (the selected idea) and through it to A4 (H2 and H4 in the primary problem set).

## What we could not establish

The CERTIS path for CZK-denominated payments is unconfirmed. EUR payments via RT1 are in scope. CZK payments wait on a technical stakeholder confirming that CERTIS carries an equivalent ISO 20022 recall message. Until that is confirmed the pilot scope cannot include CZK instant payments.

The compliance basis for every touchpoint above is absent. The Compliance Guidelines body does not exist for this run. Each touchpoint identifies what OPT-B does in functionality; whether that handling is sufficient under the applicable regulation is unknown. Four decisions for the PRD stage depend on this: the notification content template, the audit log specification, the message format confirmation, and the authentication sufficiency assessment.

Whether any of the three strategic touchpoints carries a secondary effect that strains a different key result is not assessed. The touchpoints above name where OPT-B serves three key results; a fuller alignment review at the PRD stage may find a strain the expansion does not surface.

Baselines for all three pilot success measures are absent. H6 from the problem set identifies the measurement gap directly: time from first contact to recall sent has never been measured. Without a baseline, the pilot can report what it measured but cannot say whether it improved on anything.

## How this was produced

Run 2026-06-instant-payment-disputes, stage 5.2, skill mvp-expansion, agent product-owner. Inputs read: A10 (MVP options, `5-mvp/1-mvp-options.md`, option OPT-B selected at G5a by Igor Tadic on 2026-08-22) and A9 (selected idea, `4-solutions/3-selected-solution.md`). Strategy Basis v0.1 read and applied; strategic touchpoints name key results from §2.

Compliance Guidelines are absent from this run. Each compliance touchpoint identifies what OPT-B does in functionality and marks the regulatory basis absent. The convergence discipline ran unchanged: one option only, alternatives untouched, traceability to A9 and A4 held throughout.

Banking Constraints are absent. No constraint validation was possible on any touchpoint.

No gate has run. Q5 and G5b follow this document.

Assembled from one record: R-A11-01 (`records/5-mvp/A11-r01-expanded.record.md`).
