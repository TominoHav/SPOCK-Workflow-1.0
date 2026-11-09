---
part_of: A8
item_id: IDEA-02
statement: "In-app case status tracking that updates the client at each stage of the recall process, from filing to outcome, without routing status queries through the contact centre."
description: "A persistent status view of the client's open recall case, surfaced in the Sporitelna app and updated at each event in the inter-bank process. The client sees when the recall message went out and what the receiving bank said, in the app, without calling."
solves:
  - H4
  - H7
supported_by:
  - A7-standard-contact-centre-primary
  - A7-standard-in-app-claim-submission
  - A7-trend-incentive-to-reduce-time
compliance_touchpoints:
  - "GDPR data display: surfacing transaction identifiers, counterparty account fragments and case status in a client-facing screen requires a compliant data handling basis. Indicative; Compliance Guidelines absent from this run."
  - "PSD2 and EBA dispute notification: CNB and EBA guidance may specify required formats or minimum timelines for communicating recall outcomes to the client. Indicative; Compliance Guidelines absent from this run."
---

## IDEA-02: Recall status in the app

### What it is

A persistent in-app case view that tracks the client's open recall from the moment it is filed to the moment an outcome arrives. The category is client-side case management. What makes it distinct is where it sits: the app the client already has, updated by the bank's own process events, rather than a phone call to an agent who has no status information to give. The synthesis confirmed that real-time recall status visibility was found at no participant across all eight profiled banks and substitutes; building it is the unclaimed position.

### What it does

H4 states that neither the contact centre agent nor the branch adviser can tell a client whether recovery is still possible or whether the recall has been sent, because neither is true at the moment they are speaking. This idea removes the question from the contact centre by surfacing the answer in the app. H7 states that a client filing a dispute receives no information during the median nine days before hearing the outcome. This idea replaces nine days of silence with a dated sequence of events: when the case was opened, when the recall message went to the receiving bank, when the receiving bank responded, and what they said.

The market evidence behind this idea addresses H4. The contact-centre-primary standard, the in-app claim submission standard and the reimbursement incentive trend all bear on the information gap H4 names. H7 has no market evidence. The synthesis confirmed that secondary problems H5 through H7 are outside what the competitive research for this run established. The idea addresses H7 from the run's own problem evidence: Customer 1's account, the branch complaint SD-71204 and the nine-day median from the twelve-month report.

For the customer, waiting becomes watching. For the contact centre, 7,410 follow-up status calls against 4,830 cases become requests the app answers before they are placed.

### How it works

The client, having filed a recall, opens the app and sees an active case card attached to the payment in question. The card shows three things: the date the case was opened; whether the recall message has been despatched to the receiving bank, with the date; and the receiving bank's response when it arrives.

Each change of state sends a push notification. The client does not need to check; the app tells them.

When the process closes, the app shows the final state: recovery succeeded, or the receiving bank declined, and when. The letter the client used to receive eleven days later becomes a confirmation of what the app already showed.

The contact centre agent and the branch adviser have no new role in this flow. Neither was the bearer of information they could have had in the first place.

### Who it is for

Retail clients who send instant payments from the mobile app - the segment the brief names. Specifically, those who have filed a recall and are in the wait period H7 describes: a form sent by email, nine days of silence, a letter at the end that did not say when the bank had asked.

### Why this bank

ČS runs 4,830 recall cases per year, and those cases generate 7,410 follow-up status calls. Each of those calls is a client asking the two questions H4 says no agent can answer. The bank already carries the cost of those calls; this idea redirects that demand to a channel the bank already operates.

No Czech Ring 1 bank has built this. The synthesis confirms status visibility is absent from all eight profiled participants, the most advanced UK neobanks included. The bank's nine-day median process creates exactly the wait H7 names, which means the bank's own case data defines what the status feed has to show.

The trend from the synthesis is relevant in a specific way. Mandatory reimbursement in the UK gives banks a financial incentive to reduce the time between incident and recall despatch. ČS has no equivalent liability today. The status feed is the infrastructure for when PSD3 changes that: the bank will already know its own case timeline and have the client-facing surface to communicate it, without building under regulatory pressure. The operational case does not wait for PSD3. The bank fields 7,410 status calls per year against 4,830 cases because the app does not yet carry the answer.
