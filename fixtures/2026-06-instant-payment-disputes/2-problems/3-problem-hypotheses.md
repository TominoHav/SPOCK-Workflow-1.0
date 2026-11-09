---
run_id: 2026-06-instant-payment-disputes
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
assembled_at: 2026-08-22
assembled_from: [R-A3-01]
---

# Problems | Hypotheses

Seven problem hypotheses authored from twenty-eight observations across five source types: interviews with a retail client, a contact centre agent, a branch adviser and a back-office operator, and a twelve-month operational report. Five carry a strong trust tag; two carry weak. The five strong ones each have at least one first-hand witness in their qualifying set; the two weak ones each rest on a single origin. The seven divide into two groups: four concern what the client and the bank's own staff cannot do or learn in the current process, and three concern how the process adds delay that reduces the chance of recovery. [rec:R-A3-01]

---

## H1: No way to start a recovery attempt from the app

**We believe a client who has sent an instant payment to the wrong person has no way to start a recovery attempt from the app; the only path the app offers is a phone number.**

Trust: weak. Themes: app self-service, recovery initiation, channel.

*What was said*

> She opened the app, looked for something that said report this or cancel this, and there was nothing on the payment. She found a Help section and it offered her a phone number.

*Customer 1, retail client, first hand (A2-item-1)*

*Why the trust tag is weak*

Qualifying set: one qualifying reference, A2-item-1-o1, origin customer-1, first_hand, provenance complete. The second independent origin the bar requires is absent. A2-item-6-o1 is reduced to this hypothesis because it names the same need, but its origin is unestablished and it does not reach the qualifying set. One first_hand observation is genuine evidence; it does not reach strong.

*What would show this is wrong*

An observation from a client who found an in-app recovery path for an instant payment dispute would contradict this directly. An observation from a bank operations contact confirming a feature had been built but not yet surfaced in the tested flow would narrow it.

---

## H2: The path from a client's call to a recall being sent takes two hours at minimum on a weekday

**We believe the path from a client's first call to a recall being despatched passes through at least two handoffs and takes a minimum of two hours on a weekday, with a case raised on a Friday evening waiting until Monday.**

Trust: strong. Themes: process delay, handoff chain, recall despatch.

*What was said*

> He can raise a case. He cannot send the recall. He fills a form, it goes to the recalls desk, and the desk sends it.

*Ondrej Sykora, contact centre agent, payments queue, first hand (A2-item-2)*

> Asked what he thought the delay was between a client calling and the recall going out, he said on a weekday morning maybe two hours, and on a Friday evening it is Monday.

*Ondrej Sykora, contact centre agent, payments queue, first hand (A2-item-2)*

> He works them in the order they arrive. He said the form does not carry the time the client raised it, only the time it reached him.

*Zdenek Hruby, back-office payments operations, recalls desk, first hand (A2-item-4)*

> He said he has sent requests four days after the payment and knew while he was sending them that there was nothing to recover.

*Zdenek Hruby, back-office payments operations, recalls desk, first hand (A2-item-4)*

*Why the trust tag is strong*

Qualifying set: five observations across three independent origins, all complete. A2-item-2-o1 and A2-item-2-o4 (cc-o-sykora, first_hand): the agent fills a form that goes to the recalls desk, who sends the recall; the delay is two hours on a weekday morning and Monday if the case arrives on a Friday evening. A2-item-4-o1 and A2-item-4-o5 (bo-z-hruby, first_hand): the form carries only the time it reached the desk, not when the client called; he has sent requests four days after a payment knowing nothing remained. A2-item-5-o4 (cc-payments-report, aggregated): median nine days from case opening to outcome. Two origins are first_hand; both conditions are met.

*What would show this is wrong*

An observation from the recalls desk showing a recall going out within minutes of a client's call would contradict the handoff delay. A timestamp analysis showing the form does carry the client's contact time and the delay is shorter than the agent estimated would narrow this.

---

## H3: Fraud recall cases wait in the same queue as all other investigation types

**We believe fraud recall cases are worked in the same queue as all other investigation types in arrival order, so time-sensitive cases wait behind cases with no clock on them.**

Trust: weak. Themes: queue ordering, triage, time constraint.

*What was said*

> He said the desk handles fraud recalls alongside every other kind of investigation and the fraud ones are the ones with a clock on them, which is not how the queue is ordered.

*Zdenek Hruby, back-office payments operations, recalls desk, first hand (A2-item-4)*

> He said he has sent requests four days after the payment and knew while he was sending them that there was nothing to recover.

*Zdenek Hruby, back-office payments operations, recalls desk, first hand (A2-item-4)*

*Why the trust tag is weak*

Qualifying set: two observations, A2-item-4-o2 and A2-item-4-o5, from one origin, bo-z-hruby, first_hand, provenance complete. A2-item-4-o2: the desk handles fraud recalls alongside all other investigation types in arrival order. A2-item-4-o5: he has sent requests four days after a payment knowing nothing remained. Both rest on one origin; the two-origin threshold is not met. Tag: weak.

*What would show this is wrong*

An observation from the recalls desk showing a triage rule or a separate queue for time-sensitive fraud cases would directly contradict this. A policy document describing fraud recall priority handling would narrow it.

---

## H4: Neither the contact centre nor the branch can answer the two questions clients always ask

**We believe neither the contact centre agent nor the branch adviser can tell a client whether recovery is still possible or whether the recall has been sent, because neither is true at the moment they are speaking.**

Trust: strong. Themes: information gap, client uncertainty, front-line capability.

*What was said*

> She asked whether the money was still there. She said nobody would answer that question, on the phone or afterwards.

*Customer 1, retail client, first hand (A2-item-1)*

> Two questions, always the same two. Is the money still there, and when will I know. He said he cannot answer either and that this is the hardest part of the queue to work.

*Ondrej Sykora, contact centre agent, payments queue, first hand (A2-item-2)*

> He said he has never been able to tell a client that the request has gone out, because at the moment he is speaking to them it has not.

*Ondrej Sykora, contact centre agent, payments queue, first hand (A2-item-2)*

> Client asked whether the money could still be recovered. Adviser did not know and could not find out at the desk. Case raised to the payments team the same day.

*L. Maresova, branch adviser, complaint SD-71204, first hand (A2-item-3)*

*Why the trust tag is strong*

Qualifying set: six observations across four independent origins, all complete. A2-item-1-o4 and A2-item-1-o5 (customer-1, first_hand): nobody would confirm whether the money was still in the receiving account; she had been quick and could not establish whether the bank had been. A2-item-2-o2 and A2-item-2-o5 (cc-o-sykora, first_hand): the recall is not out at the moment of the call; clients always ask the same two questions and he cannot answer either. A2-item-3-o3 (adviser-l-maresova, first_hand): she could not determine at the desk whether recovery was possible and had no route to find out. A2-item-5-o5 (cc-payments-report, aggregated): 7,410 status calls against 4,830 cases. Four origins, three first_hand; well above both conditions.

*What would show this is wrong*

An observation of an agent telling a client the recall had gone out and the money was still in the receiving account, confirmed as accurate, would directly contradict this. A system showing real-time recovery status accessible to front-line staff would contradict the structural claim.

---

## H5: The contact centre is unreachable for the thirty-eight per cent of cases that arrive outside weekday hours

**We believe the contact centre is unreachable outside weekday hours, so cases that arrive on evenings and weekends wait for the first working moment before anyone can act.**

Trust: strong. Themes: opening hours, out-of-hours, access.

*What was said*

> She rang at 19:40 on a Friday. The line said the payments team was open on weekdays.

*Customer 1, retail client, first hand (A2-item-1)*

Thirty-eight per cent of the 4,830 cases opened in the twelve months to July 2026 were opened outside weekday business hours.

*Contact centre payments queue report, twelve months to July 2026, aggregated (A2-item-5)*

*Why the trust tag is strong*

Qualifying set: two observations across two independent origins, both complete. A2-item-1-o2 (customer-1, first_hand): she called at 19:40 on a Friday and reached a recorded message saying the payments team operates weekdays only. A2-item-5-o2 (cc-payments-report, aggregated): 38 per cent of cases were opened outside weekday business hours. Two origins, one first_hand; both conditions are met.

*What would show this is wrong*

An observation confirming a 24-hour handling route for instant payment disputes would contradict this. A report showing the 38 per cent figure includes cases opened by bank staff rather than by clients would narrow it.

---

## H6: The time from a client's first contact to a recall being sent has never been measured

**We believe the bank has never measured the time from a client's first contact to a recall being despatched, so it cannot know whether the delay is long enough to cost recovery.**

Trust: strong. Themes: measurement, outcome tracking, data gap.

*What was said*

> He said he had started writing down the ones that came back so he would have something to tell people. He said that is not a system, it is a notebook.

*Ondrej Sykora, contact centre agent, payments queue, first hand (A2-item-2)*

> Asked how long the average case takes from the client's call to his message going out, he said nobody has ever asked him that and he could not produce it from the form because the first timestamp is not on it.

*Zdenek Hruby, back-office payments operations, recalls desk, first hand (A2-item-4)*

The report carries no field for when the client first contacted the bank and no field for when the recall was sent; both were requested and neither exists in the source system.

*Contact centre payments queue report, twelve months to July 2026, aggregated (A2-item-5)*

*Why the trust tag is strong*

Qualifying set: three observations across three independent origins, all complete. A2-item-2-o6 (cc-o-sykora, first_hand): no system tracks outcomes at the case level; he keeps a personal notebook of the cases where funds came back. A2-item-4-o6 (bo-z-hruby, first_hand): the form carries no timestamp for when the client first contacted; the metric has never been measured and cannot be reconstructed. A2-item-5-o6 (cc-payments-report, aggregated): the fields for client first contact and recall sent do not exist in the source system; both were requested. Two origins are first_hand; both conditions are met.

*What would show this is wrong*

A report or system log showing the time from client contact to recall despatch for any period would contradict the claim that the metric has never been measured. An observation that the source system holds the timestamps and the requested fields were simply not exposed in the report would narrow it.

---

## H7: A client receives no information during the nine days between filing and hearing the outcome

**We believe a client who has filed a dispute receives no information about what is happening during the median nine days between filing and hearing the outcome.**

Trust: strong. Themes: client communication, wait period, outcome notification.

*What was said*

> She rang again at 08:05 on Monday, waited twenty-two minutes, and was told a form would be sent to her by email and that the bank would try to contact the other bank.

*Customer 1, retail client, first hand (A2-item-1)*

> Eleven days later she had a letter saying the receiving bank had not agreed to return the funds. She said the letter did not say when the bank had asked, and that this was the part she could not get past.

*Customer 1, retail client, first hand (A2-item-1)*

> When I rang you the next day the first person told me it was a matter for the police and the second told me it was a matter for the bank.

*L. Maresova, branch adviser, complaint SD-71204, relaying an unnamed client (A2-item-3)*

The median time from case opening to the client being told the outcome was nine days across 4,830 cases.

*Contact centre payments queue report, twelve months to July 2026, aggregated (A2-item-5)*

*Why the trust tag is strong*

Qualifying set: four observations across three independent origins, all complete. A2-item-1-o3 and A2-item-1-o6 (customer-1, first_hand): told only that a form would be sent and the bank would try; eleven days later a letter said the receiving bank had not agreed and did not state when the recall had been sent. A2-item-3-o2 (adviser-l-maresova, relayed): the client was passed between two teams and not told what would happen next. A2-item-5-o4 (cc-payments-report, aggregated): median nine days from case opening to outcome. Three origins, one first_hand (customer-1); both conditions are met.

*What would show this is wrong*

An observation of a client receiving a status update during the wait period, by message, letter or call, would contradict this. A process document describing an interim communication step between case opening and outcome letter would narrow it.

---

## Two observations that produced no hypothesis

**The deception mechanism.** One observation describes the social engineering by which the fraud occurred: the caller referenced a real card payment, directed the client to move funds to a protected account, and provided a phone number that matched the back of the card. This is the background for how the client came to need a recall. It is not a problem the recall process created or can address, and the brief is scoped to recovery. It is carried as context, not restated as a hypothesis.

**The receiving bank's decision right.** One observation states that a recall is a request to the receiving bank, not a right, and that some banks respond only when chased. This is a structural constraint already recorded in the initiative brief as a known boundary of the problem. Naming it as a hypothesis would ask the initiative to solve something outside the initiating bank's control.

---

## What we could not establish

**Whether the delay costs recovery.** The contact centre agent's observation that cases where funds come back are the ones raised in the same hour is the clearest signal in the material that time-to-recall matters for outcome. He stated it without a number and confirmed the team has never been shown one. The report's eleven per cent recovery rate carries no breakdown by time elapsed before the recall was sent. The hypothesis that delay costs recovery is the premise of the whole initiative, and the material that would confirm it does not exist in the record.

**Whether the observations from one bank generalise.** Every human source in this material is inside the bank's own operations or customer base. No observation comes from another institution. H2, H3 and H6 describe a process this bank runs; whether other banks run the same process is not established.

**Whether any of the delay is regulatory.** The material describes a process where a contact centre agent fills a form and a separate desk sends the recall. Whether any step in that handoff is required by scheme rules or is a build choice is the question the unattributed note in A2-item-6 raised. That note has no provenance and can establish nothing.

---

## How this was produced

Twenty-eight observations were read from the intake record assembled at stage 2.1. This step never reads the raw material: the intake record is the only input, and that boundary keeps third-party text away from the step that derives trust.

Of the twenty-eight observations: twenty-seven carry complete provenance and nineteen are first_hand. One observation (A2-item-6) has unestablished origin and proximity, provenance_complete: false; it does not reach the qualifying set of any hypothesis but is reduced to H1, which states the same need with a direct witness.

Two observations were not restated as hypotheses: the social engineering deception mechanism (A2-item-3, background context) and the receiving bank's decision right (A2-item-4, a constraint recorded in the brief). No hypothesis was rejected: every candidate for rejection was either reduced to a hypothesis already in the set or was not a problem but a constraint.

Trust is derived, not asserted. Each tag follows the arithmetic over the qualifying set (provenance_complete: true references), counting distinct origin_key values and checking for at least one first_hand observation. The rationale for each tag is in the record and in the section above the hypothesis.

The material is fabricated. Every person, figure and quotation in A2 was written on 22 August 2026 to exercise this workflow. These tags measure agreement between written characters, not between real people.

Assembled from one record, which carries the hypotheses, their evidence references, the derived trust tags and the disconfirming conditions as fields a check reads:

- **R-A3-01**: records/2-problems/A3-r01-hypotheses.record.md
