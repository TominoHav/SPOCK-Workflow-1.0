---
run_id: 2026-08-account-switching
artifact_id: A11
ost_role: artifact
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "every compliance touchpoint is addressed in functionality, not merely listed"
    needs: judge
    reach: artifact
produced_by:
  agent: product-owner
  skill: mvp-expansion
sources: [A10, A9, A7]
external_sources: []
assembled_at: 2026-08-27
assembled_from: [A11-r01]
decision:
  gate: G5b
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: product_manager
  accepted_at: 2026-08-27
  changed_during_refinement: none
  refinements: []
  note: "Accepted under a standing instruction to run stages 4 to 7 of this run. The product manager did not review this document before acceptance and gave no rationale; none is reconstructed here. Accepting this expansion resolves none of the preconditions that travel into the requirement stage: whether Czech open banking implementations expose standing orders and direct debit mandates as distinct data rather than transaction history alone (if the answer is no, the mechanism does not operate and there is no list to display); whether the AISP consent token's maximum validity period covers the full Czech PAD switching window; and whether the data handling position in this document (mandate list data displayed to the account holder only, not retained beyond the session) holds against the bank's own rules, which the absent Compliance Guidelines body would address. All three are named in What has to be handled. The card-on-file exclusion is a designed scope boundary rather than a precondition: the mechanism operates on standing orders and direct debits whether or not the exclusion communication is resolved."
---

# OPT-A: Continuous mandate tracker

The continuous mandate tracker shows every standing order and direct debit still registered at the customer's old bank, from the moment they grant open banking consent until the switching window closes. Each item leaves the list as it transfers to the new ČS account. When the list is empty, the app confirms the old account holds no active payment instructions and the customer has a basis to close it. Card-on-file merchant credentials are outside what any PSD2 AISP feed reaches and are a stated exclusion in the design, not a gap deferred to a later stage.

[rec:A11-r01]

## What it is

A persistent, in-app list of the payment mandates still registered at the customer's old bank. The customer opens the switching section of the ČS app and sees the current standing orders and direct debits at the old account, updated each time they open that view during the switching window. The list depletes as each mandate transfers. When it reaches zero, the app shows a confirmed-empty state and the customer has a basis to close the old account.

OPT-A pilots I1. I1 addresses O1 (nobody can say what is still attached to the old account) and O6 (the old account stays open because nobody can prove it is empty). OPT-A tests that solution by running the mandate read continuously throughout the switching window, rather than at a single completion moment or on a customer-initiated trigger.

## How it works

At switch initiation, the customer authorises ČS to read their old bank account. They complete the old bank's own authentication flow, which issues a PSD2 AISP consent token. ČS stores the token and uses it to call the old bank's account information API.

The mandate list appears in the switching section of the app. It shows each standing order and direct debit by name, payment type and amount. The list retrieves on each session the customer opens the switching view, not on a background schedule. As the PAD transfer progresses, items leave the list when they are confirmed transferred.

When the list shows no active mandates, the app displays a confirmed-empty state and offers a prompt to close the old account.

The consent token must remain valid for the duration of the switch window. If it expires, the customer re-authorises before the next read. If the old bank's API is unavailable when the customer opens the view, the app shows the last retrieved state with a timestamp and a note that the data may not be current.

## What the pilot tests

Two questions frame what this pilot can answer. Do customers who can watch the mandate list deplete close the old account faster, or at a higher rate, than customers without that view? Does persistent visibility reduce the time a customer spends holding both accounts open simultaneously?

The brief carries the measure these questions are tested against: share of current accounts opened by switchers that receive a salary credit and at least two recurring debits within thirty days of opening. A customer who reaches that state has their salary and regular payments running through the new account, which is the end state the brief names. The pilot tests whether OPT-A raises that share.

P4 in the competitive analysis establishes what customers do today when they want the mandate visibility OPT-A provides: they choose the self-managed route, running both accounts simultaneously for up to 90 days and tracking every payment type by hand. OPT-A tests whether the open banking read substitutes for that cost in practice.

What this pilot cannot answer: whether a customer who saw an empty list and still did not close the old account delayed for a card-on-file reason, a maintained float, or inertia. The app does not ask. The pilot records the outcome, not the cause of a delayed closure.

## What it means for the strategy

OPT-A has a direct path to LVL-2, the key result the brief's own link names. The link states: the account a salary lands in is the account the balance sits in and the everyday spending leaves from. A customer whose old account stays open because they cannot confirm it is empty keeps a float there and keeps some spending routed there. OPT-A closes the information gap that keeps that float in place. When the list reaches zero and the customer closes the old account, the daily banking relationship moves fully to ČS, and that movement is what LVL-2 counts.

The path is one step: OPT-A resolves the visibility gap, the resolved gap gives the customer a basis to close the old account, and closing the account shifts the customer's day-to-day money to ČS. Each step holds without an assumption nobody has evidence for.

OPT-A also serves NOM-4. The feature runs entirely inside the ČS app. A customer who completes the switch through an in-app open banking flow is a client served in the digital channel, and NOM-4 measures the growth of that population.

There is one strain. The AISP authorisation step runs inside the old bank's authentication interface, outside ČS's control. That handoff is not straight-through in ČS's own channel. AI-2, which measures the share of service processes in primary digital channels that are fully straight-through, is strained by the design. The AISP consent step is the cost of reading another bank's account data, and no version of OPT-A avoids it.

## What has to be handled

**The open banking consent.** The consent authorises ČS to read an account held at another Czech bank. Whether Czech banks' PSD2 AISP implementations expose standing orders and direct debit mandates as distinct data, as opposed to transaction history alone, is not confirmed by any source this run holds. Transaction history shows where a payment came from; it does not show what mandate authorisation is still active at the old bank. This dependency sits under the whole mechanism. If Czech AISP feeds do not surface mandate data in that form, there is no list to display. The next stage inherits this as an open question that requires a source.

**The card-on-file exclusion.** The list covers standing orders and direct debits and does not cover card-linked subscriptions. ST2 in the competitive analysis confirms this as structural: card credentials are held by merchants, and no PSD2 AISP feed reaches them. The exclusion belongs in the design as a stated scope boundary with explicit customer communication, not as a footnote. The requirement stage needs to specify where and when the customer is told what the list does not cover.

**Consent duration.** A PSD2 AISP consent token has a defined maximum validity period. Whether that period covers a typical Czech PAD switching window is a question the next stage needs to answer with a source. If the consent expires during the window, the customer faces a re-authorisation step. The design needs to specify whether the app prompts proactively or triggers re-authorisation when the customer opens the switching view.

**Data handling.** The mandate list contains personal financial data from another institution. What ČS holds, for how long, and on what legal basis is a question the Compliance Guidelines body would address; that body is absent from this run. The position stated in the record is that the data is displayed to the account holder only and is not retained beyond the session. That position has not been reviewed against ČS's data handling rules, and the requirement stage inherits the question.

## What the requirement stage needs

Four things need to be specified before requirements can be written.

The AISP consent flow: what the customer sees at switch initiation, what ČS is asking permission to read, what happens if the customer declines, and what the app does if consent expires before the switch window closes. The consent screen must name the data scope precisely, because the customer is authorising access to a third-party account.

The mandate list data model: which fields each item carries (name, payment type, amount, transfer status), where each field comes from in the old bank's API response, and the rule that removes an item from the list. Removal must be defined against a specific event, either a signal from the old bank's API or a ČS internal confirmation that the transfer is complete. That choice determines how the list stays accurate throughout the window.

The confirmed-empty state and the account-closure prompt: what the app displays, what action it offers, and whether that action connects to a ČS-side account-closure flow or directs the customer to the old bank's own process. If it redirects to the old bank, the design needs to account for the handoff.

The card-on-file exclusion disclosure: where in the flow the customer is told what the list does not cover, and what form that statement takes. This is a design decision with a compliance dimension and belongs in the requirements.

## What we could not establish

Whether Czech banks' PSD2 AISP implementations expose active payment mandate data as distinct from transaction history. Both the solution set and the selected solution carry this as unconfirmed. It is the dependency that removes the mechanism entirely if it is absent.

Whether the PSD2 AISP consent maximum validity period covers the full PAD switching window for a typical Czech switch. The period is set by regulation; whether it aligns with the switching window is a question for the next stage.

Difficulty was not scored for I1 at the solution stage, and OPT-A inherits that gap. Cost, technical complexity, regulatory exposure and operational change are all unknown for this design. The Banking Constraints and Compliance Guidelines bodies are both absent from this run. Nothing in this document is a cost estimate, a complexity claim or a delivery horizon.

Whether any Czech bank has a product roadmap item for old-account mandate visibility through open banking. No source in this run confirmed or denied it. If a competitor deploys this mechanism before or during the pilot, the findings change.

## How this was produced

This is artifact A11 in run `2026-08-account-switching`, stage 5.2, produced under the `mvp-expansion` skill by the `product-owner` agent. It expands OPT-A, the option recorded as selected at gate G5a. The artifact is assembled from one record, A11-r01, held at `fixtures/2026-08-account-switching/records/5-mvp/A11-r01-expansion.record.md`.

Inputs read were A10 (the options document, OPT-A body), A9 (the selected solution), A8 (the solution set, I1's five sections), A7 (the competitive synthesis, TR-T3, ST2, P6 and P4), A4 (the prioritised opportunities, O1 and O6), and A1 (the brief, the outcome and the metric). No external sources were consulted.

The Strategy Basis landed on 13 August 2026 and is in effect. Strategic touchpoints in the record name key results from Strategy Basis §2 as the skill requires. The reduction `basis: indicative_unverified_strategy` is not declared.

The Banking Constraints body is absent. Difficulty was not scored for I1 in the solution set, and that gap carries forward here. `constraint_basis: none_stated` is on the record. No cost, complexity or delivery estimate is stated anywhere in this document.

The Compliance Guidelines body is absent. Compliance touchpoints in the record are marked indicative, as the skill's reduction requires. The rule this skill could not verify is in `could_not_verify` above.

Gate Q5 is run independently of this document. Gate G5b, at which the product manager accepts or returns this expansion, has not occurred.
