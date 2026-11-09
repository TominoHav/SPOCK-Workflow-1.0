---
part_of: A8
item_id: IDEA-01
statement: "A client-facing interface in the bank's mobile app that sends an inter-bank recall message to the receiving bank the moment the client acts, removing the contact centre handoff from the raise-to-despatch chain."
description: "The client identifies the instant payment in the app, selects a recall reason, and confirms. The bank's system sends the recall message through the inter-bank network without a human step. The client sees confirmation that the recall has been sent in the same session."
solves:
  - H1
  - H2
supported_by:
  - A7-standard-post-settlement-request
  - A7-pattern-rro-no-client-trigger
  - A7-absence-H1
compliance_touchpoints:
  - "EPC SCT Inst Rulebook and CERTIS scheme rules govern the RRO message format, the one-per-transaction limit and the 15-business-day receiving-bank response window. Indicative: Compliance Guidelines absent from this run."
  - "PSD2 liability framework for authorised push payments: where the client authorised the payment under deception, who bears the loss shapes what the bank can and cannot represent when confirming the recall has been sent. Indicative: Compliance Guidelines absent from this run."
  - "AML controls on the recall path: a client-initiated recall reverses a payment the client authorised and needs controls that prevent the mechanism from being used to reverse a legitimate payment for non-recovery purposes. Indicative: Compliance Guidelines absent from this run."
---

## IDEA-01: Client-initiated instant recall

### What it is

A client-initiated instant recall is a self-service recovery interface in the bank's mobile app that sends an inter-bank recall message when the client acts, not when a desk operator reaches the case. The category is self-service recovery, and what makes it distinct is the removal of every human step between the client's action and the outbound recall message.

The mechanism is the ISO 20022 RRO message, which already travels the inter-bank network in under 1.5 seconds. The network exists; the client-facing trigger does not. This idea builds the trigger.

One constraint carries through from the brief's own known boundaries: the recall is a request to the receiving bank, not a reversal. What this idea changes is how fast that request goes out and whether the client can send it from the app.

### What it does

H1 describes the current state: a client who has sent an instant payment to the wrong account or under deception opens the app and finds a phone number. There is no in-app recovery path. This idea replaces that phone number with an action the client can take in the minutes after sending, at any hour, without calling anyone.

H2 describes why the current path is slow: the contact centre agent fills a form, the form travels to the recalls desk, and the desk operator works cases in arrival order. The minimum delay on a weekday is two hours; a case raised on a Friday evening waits until Monday. Both handoffs are removed. The client confirms and the recall message goes out.

For the client, the time from discovering the error to the recall being despatched is their own decision time, not the processing queue.

### How it works

The client opens the app and finds the instant payment in their transaction history. The recall option is on the payment detail screen; it is shown only for outgoing instant payments.

The client taps the recall option and selects a reason: wrong recipient, or fraud (the client was deceived into authorising the payment).

The app presents a confirmation screen that states what will happen and what will not. The recall message goes to the receiving bank immediately. The receiving bank has up to 15 business days to respond. The funds are not guaranteed to return.

The client confirms. The bank's system sends the ISO 20022 RRO message through RT1 for euro-denominated payments, or through CERTIS for CZK payments. No person is involved between the client's confirmation and the message going out.

The client sees an in-app acknowledgment that the recall has been sent, with a reference number and the despatch timestamp. Status updates follow as the receiving bank responds within the scheme window.

### Who it is for

The segment is retail clients who send instant payments from the bank's mobile app, as established in the initiative brief.

Within that segment, two groups arrive at this interface. The first sent money to the wrong account and noticed quickly - the brief's client profile acted within minutes of recognising fraud on a Friday evening and found only a phone number. The second group was deceived into authorising the payment and may act later in the recovery window, still before a desk operator would have reached their case under the current process.

Both groups currently end at a phone number when they open the app.

### Why this bank

The A7 synthesis confirmed that no bank in Czech Ring 1 and no bank among the eight profiled participants has built a client-facing trigger for the inter-bank recall message. The gap is confirmed, not inferred. The bank moving first occupies a position no Czech competitor has claimed.

The bank is a CERTIS direct participant. The inter-bank network that would carry the recall message for CZK payments already exists. The cost of this idea is the client-facing interface and the back-end integration to generate the RRO message, not the network infrastructure.

Czech Ring 1 banks do not yet face a mandatory reimbursement obligation equivalent to the UK's. The A7 synthesis makes the mechanism explicit: UK banks built the in-app recall path because mandatory liability made the processing delay a quantified financial cost for the bank. Czech banks face no equivalent cost yet. A bank that builds this interface before that obligation arrives has the infrastructure in place when PSD3 ratification comes and its competitors begin their builds.

The brief's product metric is median minutes from the client raising the case to the recall being despatched. This idea moves that metric directly. Nothing in the raise-to-despatch chain remains to address after the in-app trigger is built.
