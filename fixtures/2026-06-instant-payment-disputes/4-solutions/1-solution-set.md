---
run_id: 2026-06-instant-payment-disputes
artifact_id: A8
ost_role: solution
status: accepted
workflow: discovery
assembled_at: 2026-08-22
assembled_from:
  - R-A8-01
modified_by: agent
revisions: 0
external_sources: []
could_not_verify:
  - rule: "3..7 ideas, each a distinct combination of problems, never a rephrasing"
    needs: judge
    reach: artifact
---

# Instant payment recall: five ideas

The five ideas each address a different failure in the bank's current instant payment recall process. Three remove the manual handoffs that separate a client's action from the outbound recall message; one adds the timestamps needed to measure how long that separation takes; one shows the client what the bank is doing while the recall runs through the inter-bank network. Every primary problem is covered across the set.

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

## IDEA-03: Contact-to-despatch instrument

### What it is

A measurement layer added to the back-office recall form, capturing two timestamps that do not currently exist: when the client first contacted the bank, and when the recall message was sent. The category is internal instrumentation. It produces no client-facing change and occupies no channel. Two other ideas on this slate address the client-facing path; this one makes the delay visible so it can be shortened.

### What it does

The bank cannot compute the time-to-despatch metric for any completed case, because neither timestamp exists. H6 names this absence; the desk operator confirmed it from both sides: the form carries no field for when the client called, and the source system has no field for when the recall went out. This idea adds the two fields and makes the metric computable. For H2, the instrument does not shorten the delay. It establishes the baseline against which any shortening can be verified, and against which any regression can be detected.

### How it works

A client contacts the bank about a payment they want recalled. The contact centre agent opens a recall case. The form now contains one additional field: the client's first contact time. The agent records it at the start of the call, or the telephony system supplies it from the call log if the integration exists. The case moves to the recalls desk. When the desk operator sends the recall message, the despatch timestamp is written from the outbound message confirmation, with no manual entry required.

A reporting layer joins the two timestamps at the case level. A nightly extract calculates elapsed time for every case closed in the period. Operations can read median time-to-despatch and its distribution by day, by hour and by case type. The Friday-evening-to-Monday cluster H2 names will appear as a visible band in the distribution rather than as an estimate.

The inputs are two fields. The output is one duration per case, and a rolling distribution across cases.

### Who it is for

The direct users are bank staff: the contact centre agents who fill the recall form, the desk operators who send recalls, and the operations managers who need to know whether process changes are working. The retail clients named in the brief are the people a shorter despatch time eventually benefits. This idea produces no client-facing interaction for them.

### Why this bank

ČS runs the two-step recall process this instrument was built to measure. The contact centre fills a form; a separate desk sends the recall. Neither step was instrumented when the process was built. The telephony system records when the client called. The outbound message system records when the recall went out. At the case level, nothing connects them.

The UK mandatory reimbursement standard shows the consequence of that gap closing. Under PSR PS24/7, UK banks absorb 50 per cent of APP fraud losses, which turns every additional hour between the client's call and the outbound message into a quantified bank cost. Czech banks are not yet under that obligation. PSD3 would change that direction, and the timing is not confirmed. A bank that has the measurement in place before the obligation arrives can answer the question of where it stands on the day it applies. A bank without it cannot.

The instrument operates entirely within the bank's own data. The telephony log and the outbound message confirmation already exist. The build is the join between them, at the case level, with a reporting surface on top.

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

## What we could not establish

The compliance touchpoints each idea carries are marked indicative. The Compliance Guidelines body was named as an input to this skill and is absent from this run. No idea was reviewed against its specific regulatory obligations. The Banking Constraints body was similarly absent; no idea was tested against the bank's internal feasibility rules.

The secondary problems H5, H6 and H7 have no competitive evidence. Three ideas address one of these alongside a primary problem, drawing on the A7 synthesis elements that address the co-solved primary. Whether those elements support the secondary problem is each idea's own assessment.

Whether CERTIS carries an RRO-equivalent for CZK-denominated instant payments is unconfirmed. Two ideas depend on it at full scope and note the uncertainty. The synthesis established the euro-area RT1 path; the CZK path was not found in the competitive research for this run.

## How this was produced

Stage 4.1, run `2026-06-instant-payment-disputes`. Binding `ideation` of the `product-owner` design agent, composed as a fan-out. Phase 1 named the five slate entries; five phase 2 invocations each authored one part file; this phase 3 invocation assembled from those parts without authoring. [rec:R-A8-01]

Inputs: `fixtures/2026-06-instant-payment-disputes/1-brief/initiative-brief.md`, `2-problems/5-prioritised-opportunities.md`, `3-competitive-analysis/3-competitive-synthesis.md`. The Compliance Guidelines and the Banking Constraints were declared inputs and are absent from this run; the reduction is that compliance touchpoints are marked indicative in each idea, naming the absent body.

Gates: Q4 (quality) then G4 (human decision). Neither has run.
