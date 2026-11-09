---
run_id: 2026-07-standing-orders
artifact_id: A3
ost_role: opportunity
status: accepted
workflow: problems
modified_by: agent
revisions: 1
sources: [A2b]
external_sources: []
produced_by:
  agent: hypothesis-designer
  skill: hypothesis-authoring
could_not_verify:
  - rule: "never reads A2 raw material, only the A2b intake record"
    needs: judge
    reach: process
  - rule: "no hypothesis names a thing to build; a solution-shaped candidate is reduced to the need beneath it or recorded as not a problem"
    needs: judge
    reach: content
assembled_at: 2026-08-24
assembled_from: [R-A3-01]
---

# Problems | Hypotheses

Ten problem hypotheses authored from thirty-two observations across six source types: interviews with a retail client, a contact centre agent, a branch adviser and a back-office mandates operator, a twelve-month operational report, and an undated note. Six carry a strong trust tag and four carry weak. The six strong hypotheses each have two or more distinct qualifying origins with at least one first-hand witness. The four weak hypotheses each rest on a single qualifying origin. One observation from the note has unestablished provenance and does not reach any qualifying set; it is reduced to H1 and H2, which already state the needs it implies. One data-limitation observation from the report was not restated as a problem hypothesis and is carried as an unresolved question. [rec:R-A3-01]

---

## H1: No unified view of recurring commitments

**We believe a retail client cannot see all three types of recurring commitment in one place; finding standing orders, direct debits, and card subscriptions requires navigating separate parts of the app, and card subscriptions have no dedicated recurring-payments view at all.**

Trust: strong. Themes: fragmented view, visibility, commitment types.

*What was said*

> She sat down in George to make a list of what was leaving her account regularly and found she could not account for the payments from memory. Direct debits appeared on a separate screen from standing orders. Card subscriptions were not gathered in any recurring-payments view; the only way to find them was to scroll through transaction history and recognise merchant names. When she asked whether a single list of everything recurring existed, she was told there was not one.

*Customer 1, retail client, first hand*

> There is no single screen showing all recurring payments against an account. He goes screen by screen and still cannot show card subscriptions.

*Tomáš Beneš, contact centre agent, first hand*

> She could show standing orders and direct debits on two separate screens but had no way to display card subscriptions. The client asked for a single view of everything recurring and could not be given one.

*J. Dvořáková, branch adviser, first hand on her own desk observations*

> No single register joins all three commitment types by client. Producing a complete list for one account requires three systems, and the card subscription list would still not be confirmed complete. She described this as a missing process, not a broken one.

*Martina Kučerová, mandates desk, first hand*

*Why the trust tag is strong*

Qualifying set: eight references across four independent origins, all complete. customer-1 (first_hand): A2-item-1-o1, A2-item-1-o3, A2-item-1-o4, A2-item-1-o8. cc-t-benes (first_hand): A2-item-2-o5. adviser-j-dvorakova (first_hand): A2-item-3-o4. bo-m-kucerova (first_hand): A2-item-4-o4, A2-item-4-o6. Four origins, all first_hand; both conditions met.

*What would show this is wrong*

An observation from any of the three interviewed roles describing a George feature that shows all three commitment types on one screen would directly contradict this. An observation that card subscriptions can be found in the recurring-payments view under a feature unknown to the interviewees would narrow it.

---

## H2: No mechanism to stop a card subscription; the only option makes things worse

**We believe the bank has no mechanism to stop a card-on-file subscription on behalf of a client; the only option it can offer is blocking the card, which also cancels all other card payments the client needs, making it an unusable remedy.**

Trust: strong. Themes: card subscriptions, no stop mechanism, card block.

*What was said*

> There was no stop control for a recurring card payment in George. The bank told her it cannot stop a card subscription; the options offered were to contact the merchant directly or to have the card blocked. She was told that blocking the card would stop all card payments, including subscriptions she wanted to keep and her transport pass. She declined.

*Customer 1, retail client, first hand*

> Card subscriptions he cannot stop. The only lever is blocking the card, which stops all card payments. This is the call type that goes worst; the sentence he says most often, that he can see a payment but cannot stop it, is the one clients believe least.

*Tomáš Beneš, contact centre agent, first hand*

> The branch confirmed at the desk that the 349-crown charge was a card-on-file payment the branch could not stop. A card block was offered and declined.

*J. Dvořáková, branch adviser, first hand on her own desk observations*

> Card subscription cancellation requests that reach the mandates desk have nothing to act on. The bank can block the card or in narrow cases lodge a stop with the card scheme, but cannot access the merchant arrangement. Such requests are sent back.

*Martina Kučerová, mandates desk, first hand*

9,270 calls in twelve months where the client asked to stop a card subscription and the agent recorded that no bank action was possible.

*Contact centre accounts and payments queue report, twelve months to July 2026, aggregated*

*Why the trust tag is strong*

Qualifying set: eight references across five independent origins, all complete. customer-1 (first_hand): A2-item-1-o5, A2-item-1-o6, A2-item-1-o7. cc-t-benes (first_hand): A2-item-2-o4. adviser-j-dvorakova (first_hand): A2-item-3-o3, A2-item-3-o4. bo-m-kucerova (first_hand): A2-item-4-o3. cc-queue-report (aggregated): A2-item-5-o3. Four origins are first_hand; both conditions met.

*What would show this is wrong*

A2-item-4-o3 already notes that in narrow cases the bank can lodge a stop with the card scheme; if those narrow cases extend to standard consumer subscriptions, this hypothesis narrows to apply only to cases beyond scheme reach. An observation from a mandates operator or scheme contact confirming a mechanism that stops individual card subscriptions without blocking the card would contradict the core claim.

---

## H3: Client believes they cancelled but continues to be charged

**We believe a client who has attempted to cancel a card subscription continues to be charged; they receive no clear explanation of what their cancellation action achieved or failed to achieve, and no path from the bank to actually stop the payment.**

Trust: strong. Themes: false cancellation, continued charge, no explanation.

*What was said*

> She believed she had cancelled a streaming service months earlier but it was still charging 199 crowns monthly. She was still being charged at the time of the interview, and she had cancelled nothing that evening because she feared stopping a needed payment with no complete list to check against.

*Customer 1, retail client, first hand*

> I turned it off in the app. I found the subscription and I turned it off, and it kept taking the money. I do not understand how I can cancel something in your bank's app and it still charges me. If it is not the bank's, why is it in my bank's app at all.

*Unnamed client relayed by J. Dvořáková, branch adviser. Client cancelled in George two months earlier, believed it was stopped, and continued to be charged 349 crowns monthly.*

1,940 complaints in twelve months coded to "charged after I cancelled," the majority being card-on-file subscriptions the bank had been unable to stop.

*Contact centre accounts and payments queue report, twelve months to July 2026, aggregated*

*Why the trust tag is strong*

Qualifying set: four references across three independent origins, all complete. customer-1 (first_hand): A2-item-1-o5, A2-item-1-o9. adviser-j-dvorakova (relayed): A2-item-3-o1. cc-queue-report (aggregated): A2-item-5-o4. Three origins; customer-1 is first_hand; both conditions met.

*What would show this is wrong*

An observation of a client receiving a clear confirmation message at the time of a failed card subscription cancellation, explaining that the action did not stop the charge and why, would contradict the no clear explanation part. A George flow that explicitly tells the client the subscription continues, with a reason, would change this.

---

## H4: No consistent experience when changing a commitment; type determines what the bank can do and clients are not told this

**We believe a client who contacts the bank to change a recurring commitment cannot get a consistent experience; the process, capability, and timeline differ by commitment type, and neither the bank's client-facing staff nor the client can reconcile the difference.**

Trust: strong. Themes: inconsistent process, commitment type, client confusion.

*What was said*

> Standing orders she could see and act on in George; she changed a savings order immediately on the same session. Direct debits appeared separately. Card subscriptions had no path at all.

*Customer 1, retail client, first hand (establishing the contrast a client experiences)*

> Recurring payment calls arrive in two shapes: a client cannot identify a charge, or knows what it is and wants it stopped. Whether he can stop it depends on which of three types it is, and clients do not know there are three types. Standing orders he can see, change, or cancel while the client is on the line. Direct debits he can cancel or limit, but some changes require a form to the mandates desk. Clients do not understand why one recurring payment stops in thirty seconds and the next needs a form and a wait.

*Tomáš Beneš, contact centre agent, first hand*

> The three commitment types sit in three systems with different degrees of bank control. The bank owns a standing order and can stop it outright. A direct debit is a permission the client gave a creditor, revocable but with the underlying arrangement persisting. A card subscription the bank does not hold and sees only as it arrives.

*Martina Kučerová, mandates desk, first hand*

*Why the trust tag is strong*

Qualifying set: five references across three independent origins, all complete. customer-1 (first_hand): A2-item-1-o2. cc-t-benes (first_hand): A2-item-2-o1, A2-item-2-o2, A2-item-2-o3. bo-m-kucerova (first_hand): A2-item-4-o1. Three origins, all first_hand; both conditions met.

*What would show this is wrong*

A client-facing document or staff script that explains the three commitment types and their different resolution paths, combined with an observation of a client who received and understood the explanation, would contradict this. An observation showing the difference in resolution times is routinely acknowledged and accepted by clients would narrow it.

---

## H5: Client expects mandate cancellation to settle past charges and the underlying obligation; it does neither

**We believe a client who cancels a direct debit mandate with the bank expects the underlying obligation and any charges already taken to be resolved; they are not told at the time of cancellation that the mandate cancellation stops only future collections and does not settle what has already been taken.**

Trust: weak. Themes: mandate cancellation, client expectation, past charges.

*What was said*

> Cancelling a mandate stops future collections but does not undo a charge already taken or settle the underlying arrangement. Clients expect both.

*Martina Kučerová, mandates desk, first hand*

*Why the trust tag is weak*

Qualifying set: one reference, A2-item-4-o2, origin bo-m-kucerova, first_hand, provenance complete. One origin; the two-origin threshold is not met. Tag: weak.

*What would show this is wrong*

An observation of a bank communication that explains at the point of mandate cancellation that the action covers only future collections, combined with an observation of a client who received and understood this, would directly contradict this.

---

## H6: Post-merchant-cancellation disputes fall between teams; the client receives contradictory information

**We believe a client who has cancelled a card subscription directly with the merchant but continues to be charged cannot get resolution from the bank; the case falls to a disputes team, and by the time it lands there the client has received contradictory information about whose problem it is.**

Trust: strong. Themes: post-merchant-cancellation, team handoff, contradictory information.

*What was said*

> The hardest case is a client who cancelled with the merchant, was charged again, and arrives as a card dispute with a different team. By then the client has been told contradictory things about whose problem it is.

*Tomáš Beneš, contact centre agent, first hand*

6,110 calls in twelve months where the same client had called about a recurring payment within the previous ninety days.

*Contact centre accounts and payments queue report, twelve months to July 2026, aggregated*

*Why the trust tag is strong*

Qualifying set: two references across two independent origins, both complete. cc-t-benes (first_hand): A2-item-2-o6. cc-queue-report (aggregated): A2-item-5-o5. Two origins; cc-t-benes is first_hand; both conditions met.

*What would show this is wrong*

An observation of a contact-centre agent resolving a post-merchant-cancellation recurring charge in a single contact, without handoff to a second team, would contradict this. An observation that the 6,110 repeat calls are predominantly about commitment types other than card subscriptions would narrow the scope.

---

## H7: Fear of cancelling the wrong thing stops clients from acting; they continue paying for what they want to stop

**We believe a client who wants to cancel a recurring commitment does not act because they cannot see all their commitments and fear accidentally stopping a payment they still need; they continue paying for a commitment they have decided to stop.**

Trust: weak. Themes: inaction, fear, incomplete view.

*What was said*

> She cancelled nothing that evening, afraid of stopping a needed payment with no complete list to check against. She was still being charged 199 crowns at the time of the interview.

*Customer 1, retail client, first hand*

*Why the trust tag is weak*

Qualifying set: one reference, A2-item-1-o9, origin customer-1, first_hand, provenance complete. One origin; the two-origin threshold is not met. Tag: weak.

*What would show this is wrong*

An observation of a client who, despite lacking a complete view, successfully cancelled a commitment they wanted to stop without accidentally stopping another would narrow this. An observation that the primary reason clients do not cancel is lack of motivation rather than lack of confidence in the action would directly contradict the fear-driven framing.

---

## H8: Bank staff handling one commitment case cannot see the client's others; related problems go unnoticed

**We believe a client who contacts the bank about one recurring commitment cannot receive help with any others at the same time; the bank's agent and adviser have no cross-commitment view during the interaction and cannot alert the client to related problems.**

Trust: strong. Themes: staff view, cross-commitment, single case.

*What was said*

> There is no single screen showing all recurring payments against an account. He goes screen by screen and still cannot show card subscriptions.

*Tomáš Beneš, contact centre agent, first hand*

> No single register joins all three commitment types by client. Producing a complete list for one account requires three systems and the card subscription list would still not be confirmed complete. Cancellation forms carry only the one mandate they are about; there is no field for the client's other commitments, so she cannot warn the client about the rest of the picture while processing the one case.

*Martina Kučerová, mandates desk, first hand*

*Why the trust tag is strong*

Qualifying set: three references across two independent origins, both complete. cc-t-benes (first_hand): A2-item-2-o5. bo-m-kucerova (first_hand): A2-item-4-o4, A2-item-4-o5. Two origins, both first_hand; both conditions met.

*What would show this is wrong*

An observation of a branch adviser or agent describing a tool that shows a client's full commitment picture during a call or visit would directly contradict this. An observation from the mandates desk showing that forms include a view of related commitments or a prompt to review them would narrow the specific process claim.

---

## H9: More than half of recurring commitment contacts require bank intervention beyond the digital channel; volume is rising

**We believe more than half of clients who contact the bank to change or cancel a recurring commitment cannot complete the action in the digital channel and require a form, branch visit, or callback; the call volume for this reason group is rising.**

Trust: weak. Themes: channel resolution, call volume, digital capability.

*What the data shows*

31,600 calls coded to changing or cancelling a recurring commitment in the twelve months to July 2026, rising from 2,180 in the first month to 3,040 in the last. 44% of those calls were resolved fully in the channel without a form, a branch visit, or a callback.

*Contact centre accounts and payments queue report, twelve months to July 2026, aggregated*

*Why the trust tag is weak*

Qualifying set: two references from one origin, cc-queue-report, aggregated, provenance complete. One origin; the two-origin threshold is not met. An aggregated origin cannot serve as the first_hand witness in any case. Tag: weak.

*What would show this is wrong*

An analysis showing that the 56% not resolved in channel are predominantly cases where the client chose non-digital resolution rather than cases where digital capability was absent would narrow this to a preference finding. An observation confirming the rising volume is driven by a specific event or product launch rather than a structural trend would change the trajectory claim.

---

## H10: Subscription confusion creates an opening for phishing; clients cannot tell legitimate bank communications from fraudulent ones

**We believe a client who is uncertain whether their card subscription cancellation has taken effect is vulnerable to phishing messages that exploit that uncertainty; the confusion about what the bank can and cannot do creates an attack surface for messages that impersonate the bank.**

Trust: weak. Themes: phishing, client uncertainty, subscription confusion.

*What was said*

> When I got the message asking me to confirm my subscriptions I thought that must be why, that I had to confirm the cancellation, so I nearly did it.

*Unnamed client relayed by J. Dvořáková, branch adviser. Client had cancelled in George two months earlier and was still being charged when the phishing message arrived.*

The branch adviser confirmed at the desk that the message had not been sent by the bank.

*J. Dvořáková, branch adviser, first hand on the message's origin*

*Why the trust tag is weak*

Qualifying set: two references from one origin, adviser-j-dvorakova, provenance complete. A2-item-3-o2 (proximity relayed): the client received a message purporting to be from the bank and nearly acted on it. A2-item-3-o3 (proximity first_hand): the adviser confirmed the message had not been sent by the bank. One origin; the two-origin threshold is not met. Tag: weak.

*What would show this is wrong*

Evidence that the phishing message in complaint SD-83916 was a generic subscription scam unrelated to the client's specific cancellation attempt would narrow this to coincidence. An observation that such messages do not specifically target clients with recent recurring-payment activity with the bank would also narrow it.

---

## One observation not restated as a hypothesis

**Volume data limitation.** The monthly report records all recurring-commitment calls in a single reason group that does not distinguish commitment types. The split between calls about standing orders, direct debits, and card subscriptions cannot be produced from the available data. This is a gap in what the evidence can show: a data limitation, not a problem a client experiences. It is carried as an unresolved question: whether the 31,600 annual calls are dominated by card subscription cases (as the three interviews suggest) cannot be confirmed from this source.

---

## What we could not establish

**Volume by commitment type.** The monthly report codes all three commitment types together. Three interviews consistently identify card subscriptions as the type driving the worst call outcomes, but the share of total call volume they represent is unknown.

**Whether the scheme stops card subscriptions.** The undated note asks whether the bank's inability to stop card subscriptions from the app is a card-scheme limitation or a build choice. The note has no provenance and cannot be attributed. The question is material to H2: the bank's path forward differs depending on the answer.

---

## How this was produced

Thirty-two observations were read from the intake record assembled at stage 2.1. This step never reads the raw material: the intake record is the only input, and that boundary keeps third-party text away from the step that derives trust.

Of the thirty-two observations: thirty-one carry complete provenance. One, A2-item-6-o1 (the undated note), has unestablished origin and proximity (provenance_complete: false) and does not reach the qualifying set of any hypothesis. It is reduced to H1 and H2, which already state the needs it implies.

One observation, A2-item-5-o6, was not restated as a hypothesis. It documents a data limitation (the volume figures cannot be disaggregated by commitment type) rather than a problem a client experiences.

Trust is derived, not asserted. Each tag follows the arithmetic over the qualifying set (provenance_complete: true references), counting distinct origin_key values and checking for at least one first_hand observation. The rationale for each tag is in the record and in the section above the hypothesis.

The material is fabricated. Every person, figure, and quotation in A2 was written on 24 August 2026 to exercise this workflow. These tags measure agreement between written characters, not between real people.

Assembled from one record, which carries the hypotheses, their evidence references, the derived trust tags, and the disconfirming conditions as fields a check reads:

- **R-A3-01**: records/2-problems/A3-r01-hypotheses.record.md
