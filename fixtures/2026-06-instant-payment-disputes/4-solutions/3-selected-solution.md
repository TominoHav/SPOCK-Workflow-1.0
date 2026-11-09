---
run_id: 2026-06-instant-payment-disputes
artifact_id: A9
ost_role: solution
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
sources: []
external_sources: []
assembled_at: 2026-08-22
assembled_from:
  - R-A9-01
decision:
  gate: G4
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: product_owner
  accepted_at: 2026-08-22
  selection: IDEA-05
  changed_during_refinement: none
  refinements: []
  note: "IDEA-05 is the only top-band idea whose despatch fires from claim registration regardless of channel. IDEA-01 and IDEA-04 both scored Strong and both build a client-facing trigger in the mobile app; IDEA-05 does not depend on the client using the app. The client who telephones at 19:40 on a Friday is covered as well as the one who taps. It also answers H4 directly: the automated despatch completes before the agent finishes taking the client's details, so the agent can confirm the recall has gone out in the same session. The selection was made on strategic alignment and channel coverage alone. Feasibility, regulatory exposure and operational cost were not scored; Banking Constraints and Compliance Guidelines are absent from this run."
---

# Selected idea: Automated recall despatch and real-time status feed

Igor Tadic selected IDEA-05, automated recall despatch and real-time status feed, at G4 on 2026-08-22. The selection addresses H2 and H4. H1, H5, H6 and H7 are not addressed by this choice, and the four ideas that covered those problems are not being built. [rec:R-A9-01]

## What was selected

IDEA-05: Automated recall despatch and real-time status feed. A backend process that generates and sends the ISO 20022 recall message to the receiving bank the moment a claim is registered, without routing through a human handoff chain, and returns a timestamped confirmation to the client and to any front-line staff in the same session. Claim registration triggers the despatch regardless of which channel the client used to report the payment.

## What it solves

**H2: The path from a client's call to a recall being sent takes two hours at minimum on a weekday.**

The delay comes from the handoff chain between the contact centre agent and the recalls desk. The agent fills a form, the form goes to the desk, the desk works cases in arrival order. IDEA-05 replaces that chain with an automated process. The recall message goes out within seconds of the claim being registered, and the processing queue does not exist.

**H4: Neither the contact centre nor the branch can answer the two questions clients always ask.**

The two questions are whether the recall has been sent and whether recovery is still possible. IDEA-05 changes both. The automated despatch completes before the agent has finished taking the client's details. The agent can confirm that the recall has gone out, with a timestamp, in the same session. The client sees the same confirmation through a digital channel. Both parties in the call are looking at the same facts before the call ends.

## Why this one

Three ideas scored Strong on strategic alignment: IDEA-01, IDEA-04 and IDEA-05. All three scored 30 of 30 on that dimension and reached it by the same mechanism: a service process with no human in the recall despatch chain, in the primary digital channel.

IDEA-01 and IDEA-04 both require the client to be in the mobile app. They build a client-facing trigger on the payment record; the client must open the app and initiate the recall. IDEA-05 fires from claim registration regardless of channel. A client who telephones, visits a branch, or submits through a digital interface receives the same automated despatch. The client who cannot or does not use the mobile app is not excluded.

IDEA-05 also answers H4 in a way IDEA-01 and IDEA-04 do not. Those two ideas move the action to the client and remove the agent from the path; neither addresses the case where the client is already speaking to an agent. Because IDEA-05 attaches despatch to claim registration, the agent on the call can confirm in the same session that the recall has gone out.

The selection was made without any feasibility read. Three ideas shared the top band and the only sub-dimension scored was strategic alignment at 30 of 100 points. The difficulty axis scored zero of zero because Banking Constraints and Compliance Guidelines do not exist for this run; regulatory exposure, technical complexity and operational change were not assessed for any of the five ideas. The choice between the three Strong ideas rested on channel coverage and H4 fit. Whether IDEA-05 is buildable inside the bank's constraints, what it costs to operate, or whether it faces a compliance obstacle that IDEA-01 or IDEA-04 does not is not established.

## What it does not address

**H1: No way to start a recovery attempt from the app.** A client who has sent a misdirected payment and opens the mobile app finds no self-service recall trigger after this selection. IDEA-01 and IDEA-04 each addressed H1 directly and are not being built. IDEA-05 has a digital registration path, but a self-service trigger on the payment record in the app is not part of what was selected.

**H5: The contact centre is unreachable for the 38 per cent of cases that arrive outside weekday hours.** IDEA-04 was designed for this case: a recall trigger in the app available at every hour of the day and week. It is not being built. The automated despatch in IDEA-05 runs around the clock, but the registration step requires a channel to be open. A client calling at 19:40 on a Friday who cannot reach the contact centre has no path unless a digital registration surface is available round the clock; IDEA-05 does not build one.

**H6: The time from a client's first contact to a recall being sent has never been measured.** IDEA-03 was the instrumentation idea: two timestamps added to the recall form, a reporting layer that joins them, and a rolling distribution of time-to-despatch across cases. It is not being built. The metric the brief names will remain unmeasurable unless this is addressed separately.

**H7: A client receives no information during the nine days between filing and hearing the outcome.** IDEA-02 proposed a persistent in-app case view that tracks each state change from filing to outcome, with a push notification on every update. It is not being built. IDEA-05 provides a despatch confirmation in the same session and a notification when the receiving bank responds, but ongoing tracking from despatch to outcome is not in scope.

## What this carries into the next stage

The MVP stage builds from IDEA-05. Two open questions carry forward and will need to be resolved before the pilot scope is fixed.

The channel question is the primary one. IDEA-05 fires from any claim registration channel, but the idea's own write-up records that the 38 per cent of out-of-hours cases benefit only where digital registration is available around the clock. A client who can register only by calling the contact centre on a Friday evening still waits until Monday. The MVP stage will need to declare which registration channels the pilot covers and whether an out-of-hours digital registration path is in scope.

The CERTIS path for CZK-denominated payments is unconfirmed. The A8 idea set records this uncertainty. The competitive synthesis established the euro-area RT1 path for euro-denominated payments and did not find confirmation that CERTIS carries an RRO-equivalent message for CZK payments. The Banking Constraints body that would answer this does not exist for this run. The question should be surfaced to a technical stakeholder before the pilot scope is fixed, because the Czech market is the brief's primary scope.

## What we could not establish

No feasibility read was possible for any of the three top-band ideas before the selection was made. The difficulty axis scored zero of zero for all five ideas. Banking Constraints and Compliance Guidelines are absent from this run. Whether IDEA-05 is technically buildable, what it costs, and whether it carries a regulatory constraint that another Strong idea does not are all unknown. The selection rested on two things: strategic alignment scored from one sub-dimension at 30 points, and the channel coverage argument above. Those were the basis and they were not the full picture.

Whether the automated despatch mechanism requires a CERTIS extension for CZK-denominated payments is unconfirmed from the competitive research for this run.

## How this was produced

Run 2026-06-instant-payment-disputes, stage 4, gate G4. A9 is a human selection recorded at the gate; no skill produced it. The decision was taken by Igor Tadic, product owner, on 2026-08-22.

Assembled from one record: R-A9-01 (`records/4-solutions/A9-r01-selected.record.md`).

Inputs read: A8 (`4-solutions/1-solution-set.md`), A8b (`4-solutions/2-solution-scores.md`), A4 (`2-problems/5-prioritised-opportunities.md`), A1 (`1-brief/initiative-brief.md`).

A9 is a human selection and carries no rules to forward: no producing skill means no `could_not_verify[]`.
