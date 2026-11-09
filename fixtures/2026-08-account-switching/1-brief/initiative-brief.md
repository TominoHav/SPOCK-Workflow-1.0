---
run_id: 2026-08-account-switching
artifact_id: A1
ost_role: outcome
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
sources: []
external_sources: []
produced_by:
  agent: product-owner
  skill: brief-creation
could_not_verify:
  - rule: "no field is inferred; an unsupplied field is marked unknown with a reason"
    needs: judge
    reach: process
decision:
  gate: G1
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: product_manager
  accepted_at: 2026-08-26
  changed_during_refinement: none
  refinements: []
  note: "Accepted as it stands, typed on Igor Tadic's standing instruction to run this run end to end. One field is unknown with a reason: the time horizon, which has not been decided. The outcome restatement was proposed and confirmed in the relay; a relayed conversation has no second pass, so read the confirmation as the operator's relay rather than as a separate exchange."
assembled_at: 2026-08-26
assembled_from: [R-A1-01]
---

# Discovery | Initiative Brief: Current-account switching

A person who decides to make Česká spořitelna their main bank gets an account on the first day and is
then left to do the move themselves, one instruction at a time and across three systems that answer to
nobody in common. The salary belongs to an employer, the standing orders and mandates travel on the
switching service's timetable, and the card payments travel with the card. What the bank counts today is
the account opening. What nobody counts is whether the account went on to become the person's main one,
and that gap is what opened this initiative. One field was not established at brief time: when the
outcome is expected to be observable. [rec:R-A1-01]

---

## The outcome we want

A person who has decided to bank with Česká spořitelna has their salary, their regular payments and their
everyday spending running through the new account, and nothing they still depend on left behind at the
old bank.

**Restatement.** The supplied outcome was: "A switcher can move everything across from their old bank in
one guided flow, without chasing it themselves." The phrase "in one guided flow" names a design element
rather than a change in the customer's situation, and a guided flow is one of several things that could
produce the change. The restatement drops it and states the end state instead, including the half most
often forgotten, which is what is left running at the old bank after the customer has stopped paying
attention. This is a relayed run; the restatement was confirmed in the relay and is the working outcome.

## Who this is for

Adults who hold their main current account at another Czech bank and have decided to make Česká
spořitelna their main bank. Not clients opening a second account alongside the one they already treat as
their main one, and not business clients.

The distinction matters more here than it reads. A second account has no move behind it and nothing to
leave behind, so a person opening one meets none of this.

## Why now

The initiative was opened after a quarterly retail review asked how many of last year's new current
accounts had become anybody's main account. The count of accounts opened was to hand. The count that went
on to receive a salary was not, and the question went unanswered in the room.

## What success looks like

**Product goal.** A person who opens a current account intending to switch ends up with their salary and
their regular payments running through it, rather than an account that is open and idle.

**Metric:** share of current accounts opened by switchers that receive a salary credit and at least two
recurring debits within thirty days of opening.

**Key result it feeds:** LVL-2, share of wallet (Level Up objective, Strategy Basis §2.4, direction:
increase, type: C).

**Link:** The account a salary lands in is the account the balance sits in and the everyday spending
leaves from, so an account that reaches that state carries the customer's day-to-day money and one that
does not carries almost none of it, and that difference is what share of wallet counts.

The link is the product owner's own statement, relayed without amendment. The product metric is not the
key result restated: share of wallet is measured across every product a customer holds with the bank and
across the whole retail book, while this metric counts one thing about one cohort of accounts in their
first month.

**Success signal.** A month after opening, the switcher's salary arrives in the new account and the old
account has either been closed or has nothing running through it.

**What we would hear differently.** Switchers stop saying they will finish the rest of it later. And
advisers stop hearing at the desk that someone has been paying maintenance on two accounts since the
spring because the move was never finished.

## What is in scope, and what is not

Moving a main banking relationship from one provider to another, for retail current-account holders. That
is the problem topic and it is not a border. How far the market search travels is the Competitive Analysis
Standards' search order to decide, and this field does not decide it.

**Known constraints.** Two shapes were supplied. Neither is a confirmed rule, and the Banking Constraints
know-how body does not exist for this run, so neither is weighed for feasibility. They are recorded as the
problem's shape.

- The interbank switching service moves standing orders and direct debit mandates on a set timetable. The
  salary is not part of it, because the instruction to pay it belongs to the employer and not to either
  bank.
- Card-on-file payments at merchants travel with the card and not with the account, so no switching
  arrangement covers them.

**Declared reduction.** The Banking Constraints and Compliance Guidelines bodies are absent from this run.
Nothing downstream is weighed for feasibility against either of them.

## What we could not establish

| Field | Reason | Note |
|---|---|---|
| `time_horizon` | not_yet_available | Not decided at brief time. The initiative has no place in a delivery plan yet. Optional field; its absence does not block the quality gate. Whether the brief is complete enough to proceed is the reviewer's decision. |

Nothing else about the subject was left open at brief time. The three context fields a brief most often
loses, the reason for opening the initiative now, the segment and the constraints, were all supplied.

## How this was produced

**Run 2026-08-account-switching, stage 1.1 brief-creation, decision gate G1.** No field was inferred:
the one field nobody supplied is marked in the table above.

**This is a relayed run.** The brief-creation skill elicits through dialogue. This surface runs as a
sub-agent with no channel to the user, so the answers were relayed by the operator on Igor Tadic's
standing instruction to proceed. No field was gathered through direct dialogue with the product owner.
The document is the agent's; the answers are the product owner's. `modified_by: agent`.

**Assembled from one record**, which carries the fields a gate decides:

- **R-A1-01**: records/1-brief/A1-r01-brief.record.md
