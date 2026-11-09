---
run_id: 2026-07-standing-orders
record_id: R-A3-01
artifact_id: A3
item_id: ""
produced_at: 2026-08-24
created_at: 2026-08-24
bounds_hit: []
trace_id: []
sources:
  - A2b
external_sources: []
observations_read: 32
hypotheses:
  - id: H1
    statement: "We believe a retail client cannot see all three types of recurring commitment in one place; finding standing orders, direct debits, and card subscriptions requires navigating separate parts of the app, and card subscriptions have no dedicated recurring-payments view at all."
    evidence: [A2-item-1-o1, A2-item-1-o3, A2-item-1-o4, A2-item-1-o8, A2-item-2-o5, A2-item-3-o4, A2-item-4-o4, A2-item-4-o6]
    trust: strong
    rationale: "Qualifying set: eight references across four independent origins, all complete. A2-item-1-o1, A2-item-1-o3, A2-item-1-o4, A2-item-1-o8 (customer-1, first_hand): she could not distinguish her types of regular outgoing payments; direct debits appeared on a separate screen from standing orders; card subscriptions were not gathered in any recurring-payments view and could only be found by scrolling transaction history; the bank confirmed no single list exists. A2-item-2-o5 (cc-t-benes, first_hand): no single screen shows all recurring payments; he goes screen by screen and still cannot show card subscriptions. A2-item-3-o4 (adviser-j-dvorakova, first_hand): could show standing orders and direct debits on two separate screens but had no way to display card subscriptions; the client asked for a single view and could not be given one. A2-item-4-o4 and A2-item-4-o6 (bo-m-kucerova, first_hand): producing a complete list for one account requires three systems and the card subscription list would still not be confirmed complete; she described the absence of a combined view as a missing process, not a broken one. Four origins, all first_hand; both conditions met. Tag: strong."
    disconfirming: "An observation from any of the three interviewed roles describing a George feature that shows all three commitment types on one screen would directly contradict this. An observation that card subscriptions can be found in the recurring-payments view under a feature unknown to the interviewees would narrow it."
    themes: [fragmented view, visibility, commitment types]
    kind: true
    reduced_from:
      - ref: A2-item-6-o1
        statement: "A note states that two neobanks display standing orders, direct debits, and card subscriptions in one list; the need behind this market comparison is the absence of a unified view, which this hypothesis states. The note has unestablished provenance and does not reach the qualifying set."
  - id: H2
    statement: "We believe the bank has no mechanism to stop a card-on-file subscription on behalf of a client; the only option it can offer is blocking the card, which also cancels all other card payments the client needs, making it an unusable remedy."
    evidence: [A2-item-1-o5, A2-item-1-o6, A2-item-1-o7, A2-item-2-o4, A2-item-3-o3, A2-item-3-o4, A2-item-4-o3, A2-item-5-o3]
    trust: strong
    rationale: "Qualifying set: eight references across five independent origins, all complete. A2-item-1-o5, A2-item-1-o6, A2-item-1-o7 (customer-1, first_hand): there was no stop control for a recurring card payment in George; the bank told her it cannot stop a card subscription; the options were merchant contact or card block; she declined the card block because it would stop all card payments including subscriptions and her transport pass. A2-item-2-o4 (cc-t-benes, first_hand): card subscriptions he cannot stop; the only lever is blocking the card, which stops all card payments; this is the call type that goes worst. A2-item-3-o3 and A2-item-3-o4 (adviser-j-dvorakova, first_hand): confirmed the 349-crown charge was a card-on-file payment the branch could not stop; a card block was offered and declined. A2-item-4-o3 (bo-m-kucerova, first_hand): card subscription cancellation requests that reach the mandates desk have nothing to act on; the bank can block the card or in narrow cases lodge a stop with the card scheme, but cannot access the merchant arrangement. A2-item-5-o3 (cc-queue-report, aggregated): 9,270 calls in twelve months where the client asked to stop a card subscription and the agent recorded no bank action was possible. Four origins are first_hand; both conditions met. Tag: strong."
    disconfirming: "A2-item-4-o3 already notes that in narrow cases the bank can lodge a stop with the card scheme; if those narrow cases extend to standard consumer subscriptions, this hypothesis narrows to apply only to cases beyond scheme reach. An observation from a mandates operator or scheme contact confirming a mechanism that stops individual card subscriptions without blocking the card would contradict the core claim."
    themes: [card subscriptions, no stop mechanism, card block]
    kind: barrier
    reduced_from:
      - ref: A2-item-6-o1
        statement: "The note asks whether the inability to stop card subscriptions from the app is a scheme constraint or a build choice; the need behind this question is the absence of a stop mechanism, which this hypothesis states. The note has unestablished provenance and does not reach the qualifying set."
  - id: H3
    statement: "We believe a client who has attempted to cancel a card subscription continues to be charged; they receive no clear explanation of what their cancellation action achieved or failed to achieve, and no path from the bank to actually stop the payment."
    evidence: [A2-item-1-o5, A2-item-1-o9, A2-item-3-o1, A2-item-5-o4]
    trust: strong
    rationale: "Qualifying set: four references across three independent origins, all complete. A2-item-1-o5 and A2-item-1-o9 (customer-1, first_hand): she believed she had cancelled a streaming subscription months earlier but it continued to charge 199 crowns monthly; there was no stop control for a recurring card payment in George; she was still being charged 199 crowns at the time of the interview. A2-item-3-o1 (adviser-j-dvorakova, relayed): a client cancelled a card-on-file subscription in George two months earlier, believed it was stopped, and continued to be charged 349 crowns monthly by the merchant. A2-item-5-o4 (cc-queue-report, aggregated): 1,940 complaints coded to charged after I cancelled, the majority being card-on-file subscriptions the bank had been unable to stop. Three origins; customer-1 is first_hand; both conditions met. Tag: strong."
    disconfirming: "An observation of a client receiving a clear confirmation message at the time of a failed card subscription cancellation, explaining that the action did not stop the charge and why, would contradict the no clear explanation part. A2-item-3-o1 carries the clearest signal: the client quote states I turned it off in the app and it kept taking the money; a George flow that explicitly tells the client the subscription continues would change this."
    themes: [false cancellation, continued charge, no explanation]
    kind: true
  - id: H4
    statement: "We believe a client who contacts the bank to change a recurring commitment cannot get a consistent experience; the process, capability, and timeline differ by commitment type, and neither the bank's client-facing staff nor the client can reconcile the difference."
    evidence: [A2-item-1-o2, A2-item-2-o1, A2-item-2-o2, A2-item-2-o3, A2-item-4-o1]
    trust: strong
    rationale: "Qualifying set: five references across three independent origins, all complete. A2-item-1-o2 (customer-1, first_hand): standing orders were visible and actionable in George; she changed one immediately, establishing the baseline of what the easiest type allows. A2-item-2-o1, A2-item-2-o2, A2-item-2-o3 (cc-t-benes, first_hand): calls arrive in two shapes; whether he can stop a commitment depends on type; clients do not know there are three types; standing orders he can cancel on the line, direct debits sometimes need a form and a wait, card subscriptions he cannot stop at all; clients do not understand why the resolution time differs so sharply. A2-item-4-o1 (bo-m-kucerova, first_hand): the three types sit in three separate systems with different degrees of bank control — the bank owns a standing order, a direct debit is a revocable permission, and a card subscription the bank does not hold. Three origins, all first_hand; both conditions met. Tag: strong."
    disconfirming: "A client-facing document or staff script explaining the three commitment types and their different resolution paths, combined with an observation of a client who received and understood the explanation, would contradict this. An observation showing the difference in resolution times is routinely explained and accepted by clients would narrow it."
    themes: [inconsistent process, commitment type, client confusion]
    kind: true
  - id: H5
    statement: "We believe a client who cancels a direct debit mandate with the bank expects the underlying obligation and any charges already taken to be resolved; they are not told at the time of cancellation that the mandate cancellation stops only future collections and does not settle what has already been taken."
    evidence: [A2-item-4-o2]
    trust: weak
    rationale: "Qualifying set: one reference, A2-item-4-o2, origin bo-m-kucerova, first_hand, provenance complete. Cancelling a mandate stops future collections but does not undo a charge already taken or settle the underlying arrangement; clients expect both. One origin; the two-origin threshold is not met. Tag: weak."
    disconfirming: "An observation of a bank communication that explains at the point of mandate cancellation that the action covers only future collections, combined with an observation of a client who received and understood this, would directly contradict this."
    themes: [mandate cancellation, client expectation, past charges]
    kind: true
  - id: H6
    statement: "We believe a client who has cancelled a card subscription directly with the merchant but continues to be charged cannot get resolution from the bank; the case falls to a disputes team, and by the time it lands there the client has received contradictory information about whose problem it is."
    evidence: [A2-item-2-o6, A2-item-5-o5]
    trust: strong
    rationale: "Qualifying set: two references across two independent origins, both complete. A2-item-2-o6 (cc-t-benes, first_hand): the hardest case is a client who cancelled with the merchant, was charged again, and arrives as a card dispute with a different team; by then the client has been told contradictory things about whose problem it is. A2-item-5-o5 (cc-queue-report, aggregated): 6,110 repeat calls in twelve months where the same client had called about a recurring payment within the previous ninety days; the repeat-call rate is consistent with cases not resolved at first contact and requiring escalation across teams. Two origins; cc-t-benes is first_hand; both conditions met. Tag: strong."
    disconfirming: "An observation of a contact-centre agent resolving a post-merchant-cancellation recurring charge in a single contact, without handoff to a second team, would contradict this. An observation that the 6,110 repeat calls are predominantly about commitment types other than card subscriptions would narrow the scope."
    themes: [post-merchant-cancellation, team handoff, contradictory information]
    kind: barrier
  - id: H7
    statement: "We believe a client who wants to cancel a recurring commitment does not act because they cannot see all their commitments and fear accidentally stopping a payment they still need; they continue paying for a commitment they have decided to stop."
    evidence: [A2-item-1-o9]
    trust: weak
    rationale: "Qualifying set: one reference, A2-item-1-o9, origin customer-1, first_hand, provenance complete. She cancelled nothing that evening because she feared stopping a needed payment with no complete list to check against; she was still being charged 199 crowns at the time of the interview. One origin; the two-origin threshold is not met. Tag: weak."
    disconfirming: "An observation of a client who, despite lacking a complete view, successfully cancelled a commitment they wanted to stop without accidentally stopping another would narrow this. An observation that the primary reason clients do not cancel is lack of motivation rather than lack of confidence in the action would directly contradict the fear-driven framing."
    themes: [inaction, fear, incomplete view]
    kind: true
  - id: H8
    statement: "We believe a client who contacts the bank about one recurring commitment cannot receive help with any others at the same time; the bank's agent and adviser have no cross-commitment view during the interaction and cannot alert the client to related problems."
    evidence: [A2-item-2-o5, A2-item-4-o4, A2-item-4-o5]
    trust: strong
    rationale: "Qualifying set: three references across two independent origins, both complete. A2-item-2-o5 (cc-t-benes, first_hand): no single screen shows all recurring payments against an account; he goes screen by screen and still cannot show card subscriptions. A2-item-4-o4 and A2-item-4-o5 (bo-m-kucerova, first_hand): no single register joins all three commitment types by client; producing a complete list requires three systems; cancellation forms carry only the one mandate they are about with no field for the client's other commitments, so she cannot warn the client about the rest of the picture while processing the one case. Two origins, both first_hand; both conditions met. Tag: strong."
    disconfirming: "An observation of a branch adviser or agent describing a tool that shows a client's full commitment picture during a call or visit would directly contradict this. An observation from the mandates desk showing that forms include a view of related commitments or a prompt to review them would narrow the specific process claim."
    themes: [staff view, cross-commitment, single case]
    kind: barrier
  - id: H9
    statement: "We believe more than half of clients who contact the bank to change or cancel a recurring commitment cannot complete the action in the digital channel and require a form, branch visit, or callback; the call volume for this reason group is rising."
    evidence: [A2-item-5-o1, A2-item-5-o2]
    trust: weak
    rationale: "Qualifying set: two references from one origin, cc-queue-report, aggregated, provenance complete. A2-item-5-o1: 31,600 calls in twelve months coded to changing or cancelling a recurring commitment, rising from 2,180 in the first month to 3,040 in the last. A2-item-5-o2: 44% of those calls were resolved fully in the channel without a form, a branch visit, or a callback, meaning 56% required a further step. One origin; the two-origin threshold is not met. An aggregated origin cannot serve as the first_hand witness in any case. Tag: weak."
    disconfirming: "An analysis showing that the 56% not resolved in channel are predominantly cases where the client chose non-digital resolution rather than cases where digital capability was absent would narrow this to a preference finding. An observation confirming the rising volume is driven by a specific event or product launch rather than a structural trend would change the trajectory claim."
    themes: [channel resolution, call volume, digital capability]
    kind: barrier
  - id: H10
    statement: "We believe a client who is uncertain whether their card subscription cancellation has taken effect is vulnerable to phishing messages that exploit that uncertainty; the confusion about what the bank can and cannot do creates an attack surface for messages that impersonate the bank."
    evidence: [A2-item-3-o2, A2-item-3-o3]
    trust: weak
    rationale: "Qualifying set: two references from one origin, adviser-j-dvorakova, provenance complete. A2-item-3-o2 (proximity relayed): the client received a message purporting to be from the bank asking him to confirm his active subscriptions; he attended the branch unsure whether it was genuine and whether the continued charge was connected to it. A2-item-3-o3 (proximity first_hand): the branch adviser confirmed the message had not been sent by the bank. One origin; the two-origin threshold is not met. Tag: weak."
    disconfirming: "Evidence that the phishing message in complaint SD-83916 was a generic subscription scam unrelated to the client's specific cancellation attempt would narrow this to coincidence. An observation that such messages do not specifically target clients with recent recurring-payment activity with the bank would also narrow it."
    themes: [phishing, client uncertainty, subscription confusion]
    kind: true
rejected: []
not_evidence: []
not_restated:
  - ref: A2-item-5-o6
    statement: "The reason group codes all three commitment types together; the split between standing orders, direct debits, and card subscriptions cannot be produced from this report; the field for whether a call was resolved digitally was requested and does not exist in the source system."
    reason: "This observation documents a limitation of the available data rather than a problem a client experiences. It is carried as an unresolved question about the volume breakdown, not restated as a problem hypothesis."
carried_unresolved:
  - ref: A2-item-5
    question: "The volume data codes all three commitment types together and cannot be disaggregated by type. It is unknown what proportion of the 31,600 calls per year relate to standing orders, direct debits, and card subscriptions respectively. The three interviews consistently identify card subscriptions as the commitment type driving the worst call outcomes but this cannot be confirmed from the available report."
  - ref: A2-item-6
    question: "The undated note asks whether the bank's inability to stop card subscriptions from the app is a card-scheme limitation or a build choice. The note has no provenance and cannot be attributed. The question is material to H2: if the stop capability exists at the scheme level and has simply not been built, the bank's path forward differs from a case where the scheme prevents it."
---

# Record R-A3-01 - A3

One hypothesis-authoring invocation. Not written for a reader; the document assembled from it is 2-problems/3-problem-hypotheses.md.
