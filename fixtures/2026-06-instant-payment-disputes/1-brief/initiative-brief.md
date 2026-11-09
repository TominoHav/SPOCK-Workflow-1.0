---
run_id: 2026-06-instant-payment-disputes
artifact_id: A1
ost_role: outcome
status: accepted
workflow: discovery
modified_by: agent
revisions: 1
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
  accepted_at: 2026-08-21
  changed_during_refinement: "The goal carried a compound metric and now carries one. Median minutes from the client raising the case to the recall being despatched is kept; the share of cases handled with no contact-centre call is dropped."
  refinements:
    - what: A1
      reason: "The share of cases handled with no contact-centre call is AI-2 at product scale, and a product metric that restates its own key result is what CS's rule forbids."
      changed: "The metric field carries one measure, median minutes from the client raising the case to the recall being despatched. The document states that the metric was compound, which measure was dropped and why."
      by:
        name: Igor Tadic
        role: product_owner
      at: 2026-08-21
  note: "Sent back once at G1 and accepted on the revision. The first refinement round recorded in this repository."
assembled_at: 2026-08-21
assembled_from: [R-A1-01]
---

# Discovery | Initiative Brief: Recall and dispute for outgoing instant payments

A retail client who sends an instant payment to the wrong person, or is deceived into sending one, gets a real attempt at recovery inside the window where recovery is still possible and knows in the same session whether the money is coming back. The bank's recall to the receiving bank goes out without a person picking the case up first; the measure is how long that despatch takes. Two fields were not established at brief time: why this is being explored inside the bank now, and when the outcome is expected. The constraints on record are shapes of the problem; the Banking Constraints body that would weigh them for feasibility does not exist for this run. [rec:R-A1-01]

---

## The outcome we want

A retail client who has just sent an instant payment to the wrong person, or been talked into sending one, gets a real attempt at recovery inside the window where recovery is still possible, and knows in that same session whether the money is coming back or is gone.

**Restatement assessment.** The supplied outcome is already outcome-shaped: it names what the client gains (a real attempt at recovery, certainty about the result within the same session) and the condition under which this applies (inside the window where recovery is still possible). It does not prescribe a thing to build. No restatement was proposed.

## Who this is for

The segment is retail clients who send instant payments from the mobile app.

## Why now

**Background is marked unknown.** Instant transfer is becoming the default payment rail, and the irrevocability that makes it fast is what makes a loss permanent. That context is available. The specific internal trigger at Česká spořitelna for opening this initiative now is not known to the operator and has not been invented here.

## What success looks like

**Product goal.** A client can start a recall attempt in the app in the minutes after sending, and the bank's recall to the receiving bank goes out without a person picking the case up first.

**Metric:** median minutes from the client raising the case to the recall being despatched.

The metric was compound when first produced: median minutes to despatch and the share of cases handled without a contact-centre call were supplied as one entry. The product owner separated them at review. The second measure was dropped because the share of cases handled without contact-centre intervention is the share of service processes converted to straight-through at product scale, and a product metric that is the key result at product scale is what the rule forbids. Median minutes to despatch is this initiative's own measure.

**Key result it feeds:** AI-2, the share of sales and service processes in primary digital channels that are fully straight-through (AI First objective, Strategy Basis §2.7, direction: increase, type: C).

**Link:** Today the only path from a client to a despatched recall is a call into the contact centre and a manual instruction typed by a back-office operator, and the delay that path adds is the same delay that decides whether the money is still there to recover. Removing the person from the raise-and-despatch path converts a manual service process into a straight-through one, which is the thing AI-2 counts, and it is one lever moving two things because the delay it removes is also what makes recovery possible.

The link is the product owner's own statement, relayed without amendment. The mechanism is that removing the person from raise-and-despatch shortens the delay the product metric tracks, and the same removal is what converts the process from manual to straight-through, which is what AI-2 counts. The product metric moves for reasons this initiative controls; it is not AI-2 restated.

**Success signal.** A client who has sent money to the wrong place opens the app rather than reaching for the phone, and the contact centre stops being the place where recovery starts.

## What is in scope, and what is not

Consumer payment fraud and the recovery of misdirected credit transfers, in retail banking. Czech Republic first, with European retail banks and payment providers in scope for comparison, because irrevocable instant transfer is a European problem rather than a Czech one. The Competitive Analysis Standards' own search sequence applies within this framing.

**One exclusion, with a reason a reviewer may disagree with.** Card scheme chargeback tooling is out of scope. The reason: run 2026-04-card-disputes already covers it, and the recovery mechanism is different. A card chargeback has a scheme-backed right of recovery; an instant payment recall has a request to the receiving bank and nothing else. The exclusion rests on a prior run boundary, not on a legal or technical constraint. Run 2026-04-card-disputes is the related run; a later stage that does not know this boundary may rediscover the same ideas.

**Known constraints.** Three shapes were supplied. None is a confirmed bank rule. The Banking Constraints know-how body does not exist for this run, so none of these is weighed for feasibility. They are recorded as the problem's shape.

- A recall is a request to the receiving bank, not a right. The receiving bank's cooperation determines whether recovery happens.
- Where the client was deceived into authorising the payment themselves, who carries the loss is governed by rules not examined in this brief.
- The window in which recovery is possible is short and is not controlled by the initiating bank.

**Declared reduction.** The Banking Constraints and Compliance Guidelines bodies are absent from this run. Nothing downstream is weighed for feasibility against those bodies.

## What we could not establish

| Field | Reason | Note |
|---|---|---|
| `background` | not_known | General context available (instant transfer becoming default, irrevocability creates permanent loss) but no specific internal ČS trigger is known to the operator. Inventing one would be inventing a bank-internal fact. |
| `time_horizon` | not_yet_available | Not decided at brief time. Optional field; its absence does not block the quality gate. Whether the brief is complete enough to proceed is a decision for the reviewer. |

## How this was produced

**Run 2026-06-instant-payment-disputes, stage 1.1 brief-creation, decision gate G1.** No field was inferred: anything not supplied is marked in the table above.

**One refinement was recorded at G1.** The metric was compound at first production; the product owner separated the two measures and dropped the second. The reason and what was dropped are in the metric note in "What success looks like."

**Assembled from one record**, which carries the fields a gate decides:

- **R-A1-01**: records/1-brief/A1-r01-brief.record.md

**The material for this run is fabricated.** Elicitation questions were composed by the brief-creation skill and relayed by the operator. Answers were composed by the operator on instruction from Igor Tadic (product owner) and returned via relay; no field was gathered through direct dialogue with the product owner. The pattern is the same as all pilot runs in this repository, and fixtures/README.md records it.

**No decision record.** The artifact was returned from G1 for refinement; the decision has not yet been recorded. The workflow writes the decision record, not the agent.
