---
run_id: 2026-07-standing-orders
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
      role: product_owner
  accepted_at: 2026-08-23
  changed_during_refinement: none
  refinements: []
  note: "Accepted as it stands, typed on Igor Tadic's standing instruction to run the seventh run end to end. Two things carry forward rather than being closed by acceptance. The outcome restatement was proposed and nobody answered it: a relayed conversation has no second pass, the skill offers only confirmed or declined, and the producer recorded confirmed while flagging that nothing confirmed it. Read it as proposed and unanswered. And three fields are unknown with reasons: the internal trigger for opening the initiative now, the time horizon, and the metric's current baseline."
assembled_at: 2026-08-23
assembled_from: [R-A1-01]
---

# Discovery | Initiative Brief: Recurring commitment management

Retail clients of Česká spořitelna have standing orders, direct debit mandates, and card-on-file subscriptions leaving their accounts with no single view across all three, and with change and cancellation paths that differ by type and are partly unavailable in the app. Three fields were not established at brief time: the internal trigger for opening this initiative now, the time horizon, and the current baseline for the metric. The constraints on record are shapes of the problem; the Banking Constraints body that would weigh them for feasibility does not exist for this run. [rec:R-A1-01]

---

## The outcome we want

A retail client knows what recurring commitments are leaving their account and can change or stop any of them without calling the bank.

**Restatement.** The supplied outcome was: "A client can see every recurring commitment against their account in one place and change or stop any of it themselves." The phrase "in one place" prescribes a design element rather than describing a change in the client's situation. The restatement removes that constraint and adds the contrast with the current state - that today the client must call the bank to do what the initiative would let them do themselves. This is a relay run; the proposed restatement was not declined and stands as the working outcome. It will be reviewed at G1.

## Who this is for

Retail clients with an active current account. Not business clients, not private banking.

## Why now

**Background is marked unknown.** The general shape of the problem is clear: clients who set up recurring commitments at different points in time have no single place to review them all, and the bank's paths for changing or cancelling them split by commitment type, with some requiring a call or branch visit. The specific internal trigger at Česká spořitelna for opening this initiative now is not known to the operator and has not been invented here.

## What success looks like

**Product goal.** A client manages a recurring commitment end to end in the app without a contact-centre touch.

**Metric:** share of standing-order and direct-debit changes completed digitally with no contact-centre contact within 48 hours.

The current baseline for this metric was explicitly flagged as unavailable. No figure has been invented to stand in for it.

**Key result it feeds:** AI-2, the share of sales and service processes in primary digital channels that are fully straight-through (AI First objective, Strategy Basis §2.7, direction: increase, type: C).

**Link:** Every change completed in the app is a service process that did not need a person, which is what AI-2 counts.

The link is the product owner's own statement, relayed without amendment. Each completed digital change moves the product metric directly. The product metric moves AI-2 because the changes this initiative handles are service processes, and those completed without contact-centre contact are precisely the ones AI-2 measures as straight-through. The product metric is not AI-2 restated: it covers standing-order and direct-debit changes only, while AI-2 covers the bank's full service process portfolio.

## What is in scope, and what is not

Recurring commitment management for retail bank clients, covering standing orders, direct debit mandates, and card-on-file subscriptions. Czech retail banking, with European neobanks as comparators. The Competitive Analysis Standards' search sequence applies within this problem topic.

**Known constraints.** Two shapes were supplied. Neither is a confirmed bank rule. The Banking Constraints know-how body does not exist for this run, so neither is weighed for feasibility. They are recorded as the problem's shape.

- Standing orders, direct debit mandates, and card-on-file subscriptions follow different change and cancellation paths. Managing them is three operationally distinct problems with one visible surface from the client's side.
- Some commitment changes cannot currently be completed in the app at all. The contact centre or a branch visit handles them. This is the most direct statement of the gap the initiative addresses.

**Declared reduction.** The Banking Constraints and Compliance Guidelines bodies are absent from this run. Nothing downstream is weighed for feasibility against those bodies.

## What we could not establish

| Field | Reason | Note |
|---|---|---|
| `background` | not_known | The internal trigger for opening this initiative now was not supplied and is not known to the operator. It has not been invented. |
| `time_horizon` | not_yet_available | Not decided at brief time. Optional field; its absence does not block the quality gate. Whether the brief is complete enough to proceed is a decision for the reviewer. |
| `metric_baseline` | not_known | The current baseline for the share of digital changes completed without contact-centre contact was explicitly flagged as unavailable. No figure has been invented. |

## How this was produced

**Run 2026-07-standing-orders, stage 1.1 brief-creation, decision gate G1.** No field was inferred: anything not supplied is marked in the table above.

**This is a relayed run.** The brief-creation skill elicits through dialogue. This surface runs as a sub-agent with no channel to the user, so the answers below were relayed by the operator on Igor Tadic's standing instruction to proceed. No field was gathered through direct dialogue with the product owner. The document is the agent's; the answers are the product owner's. `modified_by: agent`.

**Assembled from one record**, which carries the fields a gate decides:

- **R-A1-01**: records/1-brief/A1-r01-brief.record.md
