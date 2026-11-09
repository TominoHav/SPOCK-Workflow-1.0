---
part_of: A8
item_id: IDEA-05
statement: "A claim registered through any channel triggers an automated recall message to the receiving bank within seconds, and the despatch confirmation is visible to the client and to any front-line staff they contact in the same session."
description: "The recall goes out automatically when the claim is registered. The two-hour minimum from client contact to recall being sent becomes seconds. Both the client and the contact centre agent see the despatch confirmation before the call ends, answering the two questions clients always ask in the moment rather than leaving them open for days."
solves:
  - H2
  - H4
supported_by:
  - A7-standard-in-app-claim-submission
  - A7-trend-incentive-to-reduce-time
  - A7-absence-H4
compliance_touchpoints:
  - "PSD3 mandatory reimbursement liability. If PSD3 extends mandatory APP fraud liability to Czech banks, the time between a client's report and the recall message going out becomes a quantified bank liability. This idea cuts that time directly. The specific timeline obligation will depend on how PSD3 is transposed and implemented. Indicative only: Banking Constraints and Compliance Guidelines are absent from this run."
  - "CERTIS CZK recall message capability. The synthesis confirmed RT1 carries the ISO 20022 RRO for euro-area payments. Whether CERTIS supports an equivalent for CZK-denominated instant payments is unconfirmed in this run's material. An automated despatch targeting Czech Ring 1 banks depends on that capability existing under CNB scheme rules not examined here. Indicative only: Banking Constraints and Compliance Guidelines are absent from this run."
  - "Accuracy of the despatch confirmation. The status visible to the client and the agent states that a recall message has been sent. If the message fails to deliver or the receiving bank declines it, the standing of that statement under consumer protection rules requires examination. Indicative only: Banking Constraints and Compliance Guidelines are absent from this run."
---

## IDEA-05: Automated recall despatch and real-time status feed

### What it is

Automated recall despatch is a backend process that generates and sends the ISO 20022 recall message to the receiving bank the moment a claim is registered, without routing through a human handoff chain, and returns a time-stamped confirmation to the client and to any front-line staff in the same session. The category is process automation with a real-time status interface. The automated trigger attaches to claim registration, so the despatch happens regardless of which channel the client used to report the payment - a contact centre call, a branch visit, or a digital submission all reach the same automated backend.

### What it does

This idea addresses H2 and H4.

For H2: The minimum two-hour delay from a client's call to the recall being sent comes from the handoff chain between the contact centre agent and the recalls desk. The agent fills a form, the form goes to the desk, the desk works cases in arrival order with no timestamp showing when the client first called. This idea replaces that chain with an automated process. The recall message goes out within seconds of the claim being registered, and the queue does not exist.

For H4: At the moment of a call, the contact centre agent cannot tell a client that the recall has been sent because it has not. This idea changes that fact. The automated despatch completes before the agent has finished taking the client's details. The agent can say when the recall was sent. The client sees the same confirmation. Both questions H4 documents - whether recovery is still possible and when the client will know - get a concrete answer in the session rather than remaining open for days.

### How it works

The client contacts the bank through any channel. A contact centre agent, branch adviser, or the client through a digital interface registers the claim with the payment details: the amount, the recipient account, and the date of transfer.

The bank's system validates that the payment is a settled instant transfer eligible for a recall request. It generates an ISO 20022 RRO recall message addressed to the receiving bank.

The system sends the message through CERTIS or RT1 to the receiving bank. This step replaces the manual instruction that the recalls desk currently types.

The client receives a confirmation in the same session. The confirmation states the time the recall was sent and the receiving bank's response window under scheme rules, which is up to 15 business days. The contact centre system displays the same confirmation to the agent at the moment of despatch, so both are looking at the same facts.

When the receiving bank responds, the client receives a notification through a digital channel. The response is the receiving bank's decision; the recall message does not guarantee it.

### Who it is for

Retail clients who have sent instant payments from the mobile app. The brief names this segment. Within that group, the idea applies to clients who report through any channel. They may call the contact centre or visit a branch rather than submitting through the app, and the automated despatch works regardless of how the claim arrived. The 38 per cent of cases that arrive outside weekday hours benefit where digital registration is available around the clock; cases requiring a contact centre call still wait for opening hours.

### Why this bank

ČS is a CERTIS direct participant, as confirmed by this run's competitive analysis for all three Czech Ring 1 banks. The infrastructure to send a recall message between banks is in place. The gap is the automated trigger that uses it without a human in the chain.

The competitive synthesis found real-time recall status visibility at none of the eight profiled participants. The evidence table records it as a confirmed market absence and calls it a differentiator an initiative could claim without matching any incumbent. No other Czech Ring 1 bank is positioned to close that gap first.

The regulatory direction sets the investment timing. The synthesis identifies a trend: mandatory reimbursement in the UK, where it already exists, has created a quantified financial incentive to reduce the time between a client's report and the recall message going out. Czech banks carry no equivalent liability today. PSD3 would change that. A bank that has already automated despatch and built the measurement capability before that obligation arrives manages a capability cost rather than a compliance emergency.
