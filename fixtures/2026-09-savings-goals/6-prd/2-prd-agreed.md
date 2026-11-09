---
run_id: 2026-09-savings-goals
artifact_id: A13
ost_role: artifact
status: accepted
workflow: discovery
modified_by: human
revisions: 0
could_not_verify: []
produced_by:
  agent: business-analyst
  skill: prd
sources: [A12, A11, A4]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A13-01]
decision:
  gate: G6
  by_agent: false
  accepted_by:
    - name: Igor Tadić
      role: Product Lead
  accepted_at: 2026-08-28
  changed_during_refinement: none
  refinements: []
---

# Discovery | PRD, agreed: round-ups into one named savings goal

**A client in the pilot group names one savings goal, and every card payment rounds up to the nearest fifty crowns with the difference moving into it.** Eleven requirements, three success measures, and ten regulatory sub-domains carried from the expanded MVP. [rec:R-A13-01]

This is not a definition of the whole solution. It defines one MVP option and does not cover a fixed weekly amount or a choice of destination.

## Overview

This document defines **OPT-A from A11**: round-ups into one named goal, for retail clients aged 25 to 45 with a current account, an active app and no funded savings product.

A reader from outside the run needs three things. Every profiled bank in this market already offers named savings envelopes, including this one. What this bank does not have is any way to fund one without the client deciding each time. That decision is what three interviewed clients named as the obstacle.

## Problem

Two prioritised opportunities from A4, each with its own trust tag.

**There is no moment at which the client decides to save** (`O1`, tag `strong`). Two independent origins, three first-hand references. One client opened a savings account, deposited once and never returned, and named the obstacle as never deciding rather than not wanting to.

**Automatic saving works by not being watched** (`O5`, tag `weak`). One origin, first-hand. A client who saves by round-ups at another bank described it as the only saving that works for her, and said it works because she does not do it.

## Users

Retail clients aged 25 to 45 with a current account and an active mobile app, who hold no funded savings product.

Their situation, not a persona: they hold most of their money in one balance, they have something they would like to save for, and either they never opened a savings product or they opened one and left it empty. The description comes from the brief and the prioritised opportunities.

## Success measures

| Measure | Baseline | Horizon | Owner | Kill criterion |
|---|---|---|---|---|
| Share of the pilot group who set a goal and switch the rule on | 0%, the feature does not exist | short term, 1 to 3 months | Igor Tadić | under 5% means the offer does not land |
| Share of those who still have the rule on after ninety days | not known | short term, 1 to 3 months | Igor Tadić | under 50% means the saving does not stick, and neither of the other two options would fix that |
| Median amount accumulated per client at ninety days | not known | short term, 1 to 3 months | Igor Tadić | under 500 CZK means fifty-crown rounding accumulates too little to matter |

**The second measure decides.** The first says the offer landed; only the second says the habit held.

No baseline was supplied for the second or third measure, and it is recorded rather than estimated.

## Requirements

### R1: Detecting a card payment eligible for rounding

The system identifies settled card payments on the client's current account that are not already a multiple of fifty crowns. Cash withdrawals are excluded.

Testable: for a sample of one hundred payments the eligible set can be compared against a manual determination.

### R2: Computing and moving the round-up

For each eligible payment the system computes the difference to the next multiple of fifty crowns and transfers it from the current account to the client's chosen goal.

Testable: every transfer can be matched to the payment that caused it and the arithmetic checked.

### R3: The balance floor

No round-up executes if it would take the current-account balance below zero. The round-up is skipped, not queued.

Testable: for these cases no transfer exists and no retry exists.

### R4: The in-app explanation

The rule screen and the progress display carry text explaining what the rule does and what it has moved. The wording is approved by client communications before launch.

Testable: the wording is one thing and can be compared against what was approved.

### R5: Switching off and deleting

The client can switch the rule off or delete the goal at any time. Deleting a goal returns the accumulated money to the current account.

Testable: after switching off, no further transfer occurs; after deletion, the balance returns in full.

### R6: Recording what the client agreed to

Switching the rule on records what the client was shown and what they enabled, retrievable afterwards.

Testable: for every active rule such a record exists.

### R7: The pilot group

The rule is offered only to clients in the pilot group: retail, aged 25 to 45, a current account, an active app, and no funded savings product.

Testable: the group can be queried in the data and its size established.

### R8: Accessibility

The goal screen, the rule screen and the progress display pass an EAA accessibility check before launch.

Testable: the check has an output and it either exists or it does not.

### R9: The processing record

Before launch the processing record names the purpose as funding and displaying a client-set savings goal, on performance of the account contract for the transfer and legitimate interest for the progress calculation.

Testable: the entry exists and names both.

### R10: Telling the client about the new purpose

Before launch the new purpose is described in the app and in the privacy notice.

Testable: the text exists and is reachable from the app.

### R11: Adding and withdrawing by hand

The client can add money to the goal by hand and take money back at any time, independently of the rule.

Testable: both actions exist and neither requires the rule to be on.

## Non-functional requirements

**Timing.** The round-up executes after the payment settles, not at authorisation. A payment that is later reversed does not reverse its round-up; the money stays in the goal.

**Data handling.** No data leaves the bank. No supplier is involved and none is needed, because both the payment stream and the goal are the bank's own.

**Accessibility.** Three new screens meet EAA. The depth this pilot reaches is a check before launch, not continuous measurement.

**Availability.** If the round-up cannot execute it is skipped and the client is not told. A missed round-up is a smaller harm than a wrong one.

## Out of scope

**A fixed weekly amount.** Considered as OPT-B and excluded at G5a. It answers a different question and running both would say which of them worked for nobody.

**Choosing which goal the round-ups fund.** Considered as OPT-C and excluded at the same gate. Starling allows it and Air Bank does not, and finding out whether it matters is a separate pilot.

**A goal inside the current account.** This was solution I2, which scored the same as the one selected. The money still lands in an envelope on a savings account, which is where every Czech bank puts it.

**Spending from a completed goal.** This was I4 and it scored lowest.

This is not a list of everything the product is not. It is four things that were decided.

## Dependencies

**A decision on the goal name.** The field is free text and a client can type health or other special-category information into it. Held by the data protection officer, before launch. **Constraining the field is a requirement; accepting the risk is an acceptance, and the two produce different builds.**

**A decision on whether an impact assessment is needed.** Held by the data protection officer, before launch.

**Approved wording for the rule screen and the progress display.** Held by client communications, before launch.

**The size of the pilot group.** The definition exists; the number does not, and data can supply it.

**Card-payment frequency in the pilot group.** Whether fifty-crown rounding accumulates anything depends on it, and nobody has the figure.

## What we could not establish

Baselines for two of the three success measures. Nobody supplied how many clients currently save regularly or how much they accumulate, and an estimate would be an invented number travelling forward as though measured.

Whether fifty crowns is the right unit. Air Bank rounds to ten and the UK banks to one pound. Fifty is a choice made in this document and the pilot does not test it.

**Whether any of this changes how much clients save.** Two banks in the market publish take-up of these features. None publishes effect, so this pilot would be measuring something the market has not measured either.

## How this was produced

Step 6.1, `prd`, agent `business-analyst`. Reads the draft, the expanded MVP and the prioritised opportunities.

Eight template sections, all present, none declared not applicable. Eleven requirements, each with its own section and each stating what it traces back to.

Ten regulatory sub-domains are carried from A11 unchanged and eight are bound to a named requirement. No requirement and no measure changed against the draft. Igor Tadić filled the agreement block on 28 August 2026, and it is the one part of this document the agent did not write.
