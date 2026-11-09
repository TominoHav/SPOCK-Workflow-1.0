---
part_of: A8
item_id: IDEA-04
statement: "A recall request trigger in the ČS mobile app, operating at every hour, so a client who discovers a misdirected instant payment on a Friday evening can act immediately rather than waiting until Monday."
description: "An in-app recall trigger on the instant payment record lets a retail client initiate a post-settlement recall without calling the contact centre. The app passes the request to the bank's backend, which sends the RRO message to the receiving bank directly. The path operates at every hour of the day and week, serving the 38 per cent of cases that arrive outside weekday business hours."
solves:
  - H1
  - H5
supported_by:
  - A7-standard-contact-centre-primary
  - A7-absence-H1
compliance_touchpoints:
  - "Client recall obligation under Czech payment law: Indicative - Whether an in-app recall request carries the same legal standing as one routed through the contact centre requires review against Czech payment law and the bank's own terms of service. Banking Constraints and Compliance Guidelines are absent from this run."
  - "RRO message obligations under the EPC SCT Inst Rulebook: Indicative - The EPC SCT Inst Rulebook governs how a sending bank initiates an RRO message and the 15-day response window. Whether CERTIS carries an RRO-equivalent for CZK instant payments is unconfirmed in this run's synthesis; the euro-area path via RT1 is confirmed. Banking Constraints and Compliance Guidelines are absent from this run."
  - "APP fraud liability and loss allocation: Indicative - Where the client authorised the payment under deception, who carries the loss is governed by rules the brief records as out of scope. Sending the recall does not settle the liability question. Banking Constraints and Compliance Guidelines are absent from this run."
  - "GDPR and data governance for in-app fraud reports: Indicative - The client submits a description of a fraud event through the app. Retention, handling and transmission of that description to the receiving bank need a data protection review under GDPR and ČS-specific data governance rules. Banking Constraints and Compliance Guidelines are absent from this run."
---

## IDEA-04 - In-app recall available at any hour

### What it is

An instant payment recall trigger sits directly on the payment record in the ČS mobile app and operates at every hour of the day and week. The category is digital self-service with asynchronous bank action: the client submits the recall request from the app; the bank's backend sends the RRO message to the receiving bank without a contact centre agent handling the case first. Every recovery path in Czech Ring 1 today routes through a human step that closes at the end of the working day. This path stays open.

### What it does

H1: the client gains a direct recovery path from the app. Today the app shows a phone number when a client looks for a way to act on a misdirected payment; this idea places a recall request option on the payment record itself, so the path starts where the client already is. H5: the path operates at every hour. The 38 per cent of cases that arrive on evenings and weekends do not wait for the first staffed moment on Monday. The client who rang at 19:40 on a Friday and was told to call back on Monday can submit a recall request from the app within minutes of discovering the problem. The idea addresses both problems through one design decision: a recovery path that does not depend on the contact centre being staffed.

### How it works

1. The client opens the ČS app and finds the instant payment in their transaction history.
2. On the payment record, a recall option appears. The client taps it.
3. A short form asks what went wrong: wrong account, or fraud. The client selects one and confirms.
4. The app passes the request to the bank's backend. No contact centre agent is involved at this step.
5. The backend sends an RRO message to the receiving bank. The euro-area path runs through RT1. The CZK path requires CERTIS to carry an RRO-equivalent, which this run's synthesis records as unconfirmed.
6. The app shows a confirmation immediately: the recall request has gone out. The client sees the status update when the receiving bank responds.

Inputs: the payment record and the client's account of what went wrong. Output: a sent recall request and a status record visible inside the app.

### Who it is for

Retail clients who send instant payments from the ČS mobile app, as defined in the initiative brief. The sub-group this idea addresses first are clients who discover the problem outside weekday business hours. The twelve-month contact centre report shows they account for 38 per cent of all cases. The client who rang at 19:40 on a Friday is the stated example in this run's own material. The brief's success signal is that a client who has sent money to the wrong place opens the app rather than reaching for the phone; this idea provides that path at the hour when no other path is open.

### Why this bank

ČS is a CERTIS direct participant. The inter-bank recall infrastructure is connected at the network level, and the synthesis confirms the RRO message travels in under 1.5 seconds. The network functions. The client-facing trigger that would use it is the piece the market has not built, and building it is a design decision, not an infrastructure problem.

The competitive picture confirms the position is open. No bank in Czech Ring 1 has built an in-app instant payment recall path. The synthesis states the parity bar: any recall mechanism must be available when the contact centre is not, because evenings and weekends account for 38 per cent of cases. A mechanism available only during weekday business hours replaces the contact centre at equal availability with no gain for the clients H5 identifies. ČS can build the recall trigger using infrastructure it already reaches, in a Czech Ring 1 market where no incumbent occupies the in-app recall position.
