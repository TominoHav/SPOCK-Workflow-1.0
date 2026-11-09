---
run_id: 2026-08-account-switching
artifact_id: A12
ost_role: artifact
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
could_not_verify: []
produced_by:
  agent: business-analyst
  skill: prd
sources: [A11, A1, A4]
external_sources: []
assembled_at: 2026-08-27
assembled_from: [A12-r01]
sections:
  - id: overview
    status: present
  - id: problem
    status: present
  - id: users
    status: present
  - id: success_measures
    status: present
  - id: requirements
    status: present
  - id: non_functional
    status: present
  - id: out_of_scope
    status: present
  - id: dependencies
    status: present
alignment_validation: "Checked against LVL-2 (share of wallet, Level Up, strategy-basis v0.1 §2.4, direction: increase, type: C) and NOM-4 (clients migrated from the original channel to the new digital channel, strategy-basis v0.1 §2.2, direction: increase, type: C). The chain the solution scored Strong on at stage 4.1 survived the narrowing to OPT-A: OPT-A resolves the visibility gap that keeps a mandate float at the old bank; when the list clears and the customer closes the old account, daily banking moves fully to CS; that movement is what LVL-2 counts. The chain is one step and each step holds. Narrowing from I1 to OPT-A (continuous tracking throughout the window rather than point-in-time) does not break the chain. NOM-4 is reinforced: the full switching flow runs inside the CS app. The AI-2 strain named in A11 is unchanged: the AISP consent step runs inside the old bank's authentication interface outside CS's control. Basis: strategy-basis v0.1."
compliance_touchpoints:
  - aisp_consent_data_scope
  - mandate_data_handling
agreement_block:
  name:
  date:
---

# Product requirements: Continuous mandate tracker for current account switching (OPT-A)

This document defines the functional and non-functional requirements for OPT-A, the pilot implementation of solution I1. A customer switching to CS receives, through PSD2 AISP consent, a persistent view of the standing orders and direct debit mandates still registered at their old bank, updated throughout the switching window. The pilot tests whether that continuous visibility increases the proportion of switchers who close their old account and complete the move of their daily banking to CS. The central dependency - whether Czech PSD2 AISP implementations expose mandate data as distinct from transaction history - is unconfirmed by any source in this run and is the most important open question in this document.

[rec:A12-r01]

## Overview

OPT-A runs a persistent list of standing orders and direct debit mandates still registered at the customer's old bank, inside the CS app's switching section. The customer grants PSD2 AISP consent at switch initiation; the list retrieves on each session they open that section during the switching window. Items leave the list when their transfer is confirmed. When the list is empty, the app displays a confirmed-empty state and offers a prompt to close the old account. Card-on-file merchant credentials are outside what any PSD2 AISP feed reaches and are a stated exclusion in the design, not a deferred gap.

This document defines OPT-A, the pilot option that was selected from three candidates and then expanded into this specification. It defines six functional requirements and a set of non-functional requirements covering data handling, security and availability.

## Problem

Two of the run's committed opportunities from the prioritised set (A4) sit behind this pilot.

**O1: Nobody can say what is still attached to the old account.** Trust: `strong`. A switching customer has no way to find out which payments are still running from the old account, so they learn what they missed when a payment fails or an unexpected charge arrives. They work from memory or a year of statements and cannot distinguish an annual fee from a cancelled contract. The adviser cannot open the leaving account. The switching desk works the list it is handed, and nothing in the process goes looking for what the customer forgot. Four independent sources - two customers, a branch adviser and the payments desk - describe the same absence from four positions. None of them provides a count of affected customers.

**O6: The old account stays open because nobody can prove it is empty.** Trust: `strong`. A customer who cannot confirm the old account is empty keeps it open and pays fees on both. One keeps about two thousand crowns at the old bank in case something is hiding there, and says in the same breath that she knows it makes no sense. Another pays two account fees for the same reason and calls it paying two banks to be confused. Both know what it costs them. Both carry on. Two independent sources - both customers - describe this behaviour about their own accounts.

Both opportunities share a mechanism: the old bank does not expose outgoing payment mandate data in any feed accessible to CS. OPT-A addresses this by reading directly via PSD2 AISP. The evidence base does not support a stronger claim: both opportunities carry the trust tag they earned in the prioritised opportunity set, where both are rated `strong`.

## Users

Adults who hold their main current account at another Czech bank and have decided to make CS their main provider. Specifically, the part of that segment who has regular payments running from the old account - standing orders or direct debit mandates. A customer who opens a second account at CS without intending to leave their original bank meets none of the described opportunities.

The situation the customer is in: they have started the switch and are waiting. They do not know what is still attached to the old account. They do not know whether the switch is complete. And they will not close the old account until they are certain nothing is left there - because they have no way of finding out what is left. Both customers in A3b describe this not as a misunderstanding but as a deliberate choice: they carry the cost - time, double fees - because the information is missing.

The segment is not bounded by age group, channel or location. Both branch-assisted and app-only customers can find themselves in this situation.

## Success measures

The measure: share of current accounts opened by switchers that receive a salary credit and at least two recurring debits within thirty days of opening. The initiative brief (A1) names this metric. A customer who reaches that state has their salary and regular payments running through the new account, which is the end state the brief defines.

Baseline: currently unmeasurable. Opportunity O5, recorded in A4, documents that the bank does not track this cohort today and that the metric cannot be computed from available systems. The quarterly review that opened this initiative asked the question and left without an answer. The missing baseline is a declared gap, not an omitted measurement.

Direction: increase.

Horizon: short term (one to three months post-launch); medium term (three to twelve months).

Owner: not established in this run. Ownership of the measurement must be assigned before the pilot starts. An unowned measure is everyone's and nobody's.

Kill criteria: two. The first is pre-launch: if dependency 1 (see Dependencies) confirms that Czech PSD2 AISP implementations do not expose mandate data distinct from transaction history, the pilot does not launch because the mechanism does not operate. The second is outcome-based: if the share does not exceed the result of a switcher group without mandate tracking within the medium-term horizon, the pilot stops and the results are assessed.

## Requirements

Six functional requirements cover the four topic areas named in A11: the AISP consent flow, the mandate list data model and retrieval, the confirmed-empty state and closure prompt, and the card-on-file exclusion disclosure. Consent token expiry is a separate requirement because its handling must be specified before R2 and R6 can be finalised.

Each requirement traces to A11, which named these areas in its sections "What has to be handled" and "What the requirement stage needs". The base traceability chain: OPT-A (A11) -> I1 (A9) -> O1 and O6 (A4).

### R1 - AISP consent initiation

Traces to: A11.

At switch initiation, the app must present the customer with a consent screen that names the precise scope of data CS is requesting access to: the standing orders and direct debit mandates held on the customer's account at the old bank. The customer must be able to grant or refuse consent. Granted consent issues a PSD2 AISP token that the app stores for subsequent reads. If the customer refuses, the app must explain that mandate tracking is not possible without consent and must allow them to continue with the switch without the tracking feature. A customer who refuses must not be blocked from initiating the switch.

This requirement addresses the `aisp_consent_data_scope` compliance touchpoint: the consent screen must name the data scope at the level of payment type (standing orders, direct debits), not abstractly as "account information."

Acceptance criteria:

- The customer sees a consent screen that explicitly names standing orders and direct debit mandates as the data scope.
- The customer can confirm or refuse consent.
- On confirmation, the AISP token is stored and the app shows the mandate list.
- On refusal, the app shows an explanation without displaying the mandate list; the switch initiation flow continues.
- Error path: if the old bank's authentication flow fails, the app shows an error message and allows the customer to retry without restarting the full switch process.

### R2 - Mandate list retrieval and display

Traces to: A11.

On each session where the customer opens the switching section, the app must retrieve the current list of active standing orders and direct debit mandates from the old bank via the PSD2 AISP feed using the stored token. Each item must display its name, payment type and amount. The app must retrieve data on session open, not on a background schedule. If the old bank's API is unavailable when the customer opens the view, the app must display the last successfully retrieved state with a timestamp and a notice that the data may not be current.

Acceptance criteria:

- The list displays each active item with name, payment type and amount.
- Data is retrieved when the customer opens the section, not before.
- If the API is unavailable: the last retrieved state is shown, together with a timestamp of the last successful retrieval and a notice about potential staleness.
- Error path: if the AISP token has expired, the app does not retrieve and does not show an empty list without context; it shows the re-authorisation prompt defined in R6.

### R3 - Mandate item removal rule

Traces to: A11.

An item leaves the mandate list when a defined event confirms that the mandate has been transferred to the CS account. The triggering event - either a signal from the old bank's API confirming the mandate has departed, or an internal CS confirmation that the transfer is complete - must be specified before implementation begins. The removal rule must produce no false positives: an item still active at the old bank must not disappear from the list.

What this requirement does not determine: the order in which items leave the list is the outcome of the actual transfer sequence, not a design decision.

Acceptance criteria:

- An item is removed from the list only when the specified confirming event has occurred.
- The triggering event is documented before implementation.
- Test case: a standing order still active at the old bank remains displayed in the list.
- Error path: if the confirming event cannot be verified, the item remains on the list; the app does not reduce the item count without confirmation.

### R4 - Confirmed-empty state and closure prompt

Traces to: A11.

When the mandate list shows no active items, the app must display a confirmed-empty state and present the customer with a prompt to close the old account. The action assigned to that prompt must be specified before implementation: either it connects to a CS internal account-closure flow (if one exists), or it redirects the customer to the old bank's own account-closure process. If it redirects to the old bank, the design must specify the handoff. A customer must not be redirected without instruction on what to do next.

Acceptance criteria:

- The confirmed-empty state is displayed as soon as the list contains zero active items.
- The customer sees a prompt to close the old account.
- The action assigned to the prompt is specified before implementation.
- Error path: if the CS internal account-closure flow fails, the customer is informed of the failure and given an alternative instruction to close the account at the old bank.

### R5 - Card-on-file exclusion disclosure

Traces to: A11.

At a specified point in the switching flow, the app must tell the customer that the mandate list covers standing orders and direct debit mandates but does not cover payments linked to a card at a merchant. The customer must be informed that card-linked subscriptions and recurring card payments are held by merchants and are outside what the bank can read via PSD2 AISP. The placement and form of this disclosure must be specified in the design. The disclosure must not appear only in contractual documentation.

This requirement addresses the structural exclusion confirmed in ST2 (A7): card credentials are held by merchants and no PSD2 AISP feed reaches them. The disclosure is a design decision with a compliance dimension.

Acceptance criteria:

- The customer sees the card-on-file exclusion disclosure at a defined point in the flow.
- The disclosure explicitly names what the list does not cover (card-linked subscriptions, recurring card payments at merchants).
- The disclosure explains why the exclusion applies (data is held by merchants, not by the bank).
- Error path: if the customer opens the switching section without having previously seen the disclosure, the app shows it on first opening.

### R6 - Consent token expiry handling

Traces to: A11.

If the AISP consent token expires during the switching window, the app must allow the customer to re-authorise before the next mandate list retrieval. The design must specify whether the app notifies the customer proactively (before token expiry) or reactively (when the customer opens the switching section after expiry). Re-authorisation must not require the customer to restart the full switch process from the beginning.

Acceptance criteria:

- The app detects an expired token before attempting to retrieve mandates.
- The customer sees a re-authorisation prompt with an explanation of what is needed and why.
- After successful re-authorisation, the mandate list is retrieved and displayed.
- Error path: if the customer declines re-authorisation, the app shows the last successfully retrieved state with a timestamp and a staleness notice.

## Non-functional requirements

**Data handling (touchpoint `mandate_data_handling`).** The mandate list contains personal financial data from another institution. The app must display that data only to the account holder whose account is being read, and must not retain it beyond the session. This position - display to account holder only, no retention after session end - has not been reviewed against CS's data handling rules. The Compliance Guidelines body is absent from this run. Compliance review of this position is a dependency before implementation begins (see Dependencies, item 3).

**Security - token storage.** The AISP token is an access credential for a third-party account. It must be stored with at least the same security controls CS applies to its own customer authentication tokens. The specific security standard for token storage is not defined in this run; it will be determined by CS's security framework in the implementation phase.

**Performance - response time.** The response time for mandate retrieval from the old bank's API is not established. No measured baseline exists. A response time target derived from nothing would be worse than none.

**Accessibility.** No accessibility standard for this feature is defined in this run.

**Availability on API outage.** Behaviour when the old bank's API is unavailable is defined in R2: display the last retrieved state with a timestamp and a notice.

## Out of scope

**Card-on-file merchant payments.** Considered as part of switching visibility. Excluded structurally: the PSD2 AISP feed has no access to credentials held by merchants. This exclusion is confirmed as universal across the market set in ST2 (A7) - no participant crossed it. The customer must be informed of this exclusion (see R5).

**Customer management of mandates.** The customer can view mandates through this feature but cannot edit, cancel or initiate them. Visibility is the full scope of the feature.

**Opportunity O3 (The request goes quiet the moment it is sent).** O3 concerns the inability of the customer or adviser to locate a switching request in progress. OPT-A does not provide that process visibility - it would require a different mechanism (stateful tracking of the switching request). O3 remains a committed opportunity and will be addressed by a different solution.

**Opportunity O4 (Complete means the form was worked).** O4 concerns the bank's definition of switch completion, which counts the processed form rather than the movement of money. OPT-A does not change that definition. O4 remains a committed opportunity.

## Dependencies

**1. Mandate data availability through PSD2 AISP at Czech banks.** Whether Czech PSD2 AISP implementations expose active payment mandates - standing orders and direct debit mandates - as data distinct from transaction history has not been confirmed by any source in this run. This is the most important dependency in this document. A transaction record shows where a payment came from; it does not show what is still authorised at the old bank. If Czech AISP implementations do not expose mandate data in this form, the mechanism does not operate and there is no list to display. This dependency removes OPT-A entirely, not just one feature. Owner: not named in this run; a source is required before implementation begins.

**2. AISP token validity against the PAD switching window.** The maximum validity period of a PSD2 AISP consent token is set by regulation. Whether that period covers a typical Czech switching window under PAD regulation is an open question. If the token expires during the window, R6 requires that the re-authorisation approach be specified. Owner: CS legal or compliance team; an answer is required before R6 can be finalised.

**3. CS rules for handling third-party data.** The position stated in the non-functional requirements (data displayed to account holder only, not retained beyond session) has not been reviewed against CS's internal data handling rules. The Compliance Guidelines body is absent from this run. A compliance review is required before implementation begins. Owner: CS compliance team.

**4. Old account closure mechanism.** R4 defines a closure prompt but the specific action depends on whether CS has or can have an internal account-closure flow for an account at another bank, or whether the customer must be redirected to the old bank's own process. This must be specified during the design phase. Owner: CS product team.

## What we could not establish

Whether Czech PSD2 AISP implementations expose active payment mandates as data distinct from transaction history. A8 and A9 both carry this as an unconfirmed dependency. It is also the subject of dependency 1 in this document. Without a positive answer there is nothing to implement.

Whether the maximum validity period of a PSD2 AISP consent token covers a typical Czech PAD switching window. This affects the specification of R6 and the re-authorisation notification design.

The baseline for the success measure. The bank does not track this cohort today. Without a baseline, the medium-term assessment cannot determine whether OPT-A improves the switching completion rate or merely documents existing behaviour. This is a dependency on the measurability of the result, not on the pilot itself.

The cost, technical complexity, regulatory exposure and operational change for OPT-A. The Banking Constraints body and the Compliance Guidelines body are both absent from this run. Difficulty was not scored for any solution in the set, and OPT-A inherits that gap. No figure in this document is an estimated cost, complexity or delivery timeline.

Who at CS owns the measurement. The owner of the success measure was not named in this run. Without a named person, the measure belongs to everyone and to no one.

## How this was produced

This is artifact A12 in run `2026-08-account-switching`, stage 6.1, produced under the `prd` skill by the `business-analyst` agent. It is assembled from one record, A12-r01, held at `fixtures/2026-08-account-switching/records/6-prd/A12-r01-prd-draft.record.md`.

Inputs read: A11 (the expanded pilot, OPT-A, accepted at G5b), A1 (the initiative brief, product goal and metric), A4 (the prioritised opportunities, O1 and O6 with their trust tags), A9 (the selected solution, I1), A10 (the pilot options, OPT-A), A3b (the framed opportunities, customer situation descriptions for O1 and O6). No external sources were consulted.

The Strategy Basis is in effect. Strategy Basis v0.1 has been available since 13 August 2026. The `alignment_validation` field names key results from Strategy Basis §2 and cites that document as the basis. The reduction marker `basis: indicative_unverified_strategy` is not used.

The Compliance Guidelines body is absent from this run. The two compliance touchpoints (`aisp_consent_data_scope` and `mandate_data_handling`) are named as indicative: they are designed into requirements (R1 and the non-functional requirements section) but cannot be confirmed as correctly addressed without the Guidelines. This is a reduction for this stage.

Difficulty was not scored. The Banking Constraints body is absent from this run. No estimates of cost, technical complexity, regulatory exposure or operational change appear in this document.

`agreement_block` is present and empty. This document is the draft (A12). The product manager's agreement converts it to A13, and that mark alone is the deciding difference.

Gate Q6 is run independently of this document.

