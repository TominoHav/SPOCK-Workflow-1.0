---
run_id: 2026-06-instant-payment-disputes
record_id: R-A3-01
artifact_id: A3
item_id: ""
produced_at: 2026-08-22
produced_by:
  agent: hypothesis-designer
  skill: hypothesis-authoring
bounds_hit: []
observations_read: 28
hypotheses:
  - id: H1
    statement: "We believe a client who has sent an instant payment to the wrong person has no way to start a recovery attempt from the app; the only path the app offers is a phone number."
    evidence: [A2-item-1-o1]
    reduced_from: [A2-item-6-o1]
    trust: weak
    rationale: "Qualifying set: one qualifying reference, A2-item-1-o1, origin customer-1, first_hand, provenance complete. The second independent origin the bar requires is absent. A2-item-6-o1 is reduced to this hypothesis: it references competitor banks allowing app-initiated recall and names the same need, but its origin is unestablished and it does not reach the qualifying set. One first_hand observation is genuine evidence; it does not reach strong. Tag: weak."
    disconfirming: "An observation from a client who found an in-app recovery path for an instant payment dispute would contradict this directly. An observation from a bank operations contact confirming a feature had been built but not yet surfaced in the tested flow would narrow it."
    themes: [app self-service, recovery initiation, channel]
    kind: barrier
  - id: H2
    statement: "We believe the path from a client's first call to a recall being despatched passes through at least two handoffs and takes a minimum of two hours on a weekday, with a case raised on a Friday evening waiting until Monday."
    evidence: [A2-item-2-o1, A2-item-2-o4, A2-item-4-o1, A2-item-4-o5, A2-item-5-o4]
    trust: strong
    rationale: "Qualifying set: five qualifying references across three independent origins, all complete. A2-item-2-o1 and A2-item-2-o4 (cc-o-sykora, first_hand): the agent fills a form that goes to the recalls desk, who sends the recall; the delay is two hours on a weekday morning and Monday if the case arrives on a Friday evening. A2-item-4-o1 and A2-item-4-o5 (bo-z-hruby, first_hand): the form carries only the time it reached the desk, not when the client called; he has sent requests four days after a payment knowing nothing remained. A2-item-5-o4 (cc-payments-report, aggregated): median nine days from case opening to outcome. Two origins are first_hand; both conditions met. Tag: strong."
    disconfirming: "An observation from the recalls desk showing a recall going out within minutes of a client's call would contradict the handoff delay. A timestamp analysis showing the form does carry the client's contact time and the delay is shorter than the agent estimated would narrow this."
    themes: [process delay, handoff chain, recall despatch]
    kind: barrier
  - id: H3
    statement: "We believe fraud recall cases are worked in the same queue as all other investigation types in arrival order, so time-sensitive cases wait behind cases with no clock on them."
    evidence: [A2-item-4-o2, A2-item-4-o5]
    trust: weak
    rationale: "Qualifying set: two qualifying references from one origin, bo-z-hruby, first_hand, provenance complete. A2-item-4-o2: the desk handles fraud recalls alongside all other investigation types and the queue is ordered by arrival, not by urgency. A2-item-4-o5: he has sent requests four days after a payment knowing nothing remained to recover. Both observations from one origin; the two-origin threshold is not met. Tag: weak."
    disconfirming: "An observation from the recalls desk showing a triage rule or a separate queue for time-sensitive fraud cases would directly contradict this. A policy document describing fraud recall priority handling would narrow it."
    themes: [queue ordering, triage, time constraint]
    kind: barrier
  - id: H4
    statement: "We believe neither the contact centre agent nor the branch adviser can tell a client whether recovery is still possible or whether the recall has been sent, because neither is true at the moment they are speaking."
    evidence: [A2-item-1-o4, A2-item-1-o5, A2-item-2-o2, A2-item-2-o5, A2-item-3-o3, A2-item-5-o5]
    trust: strong
    rationale: "Qualifying set: six qualifying references across four independent origins, all complete. A2-item-1-o4 and A2-item-1-o5 (customer-1, first_hand): nobody would confirm whether the money was still in the receiving account; she had been quick and could not establish whether the bank had been. A2-item-2-o2 and A2-item-2-o5 (cc-o-sykora, first_hand): the recall has not gone out at the moment of the call; clients always ask the same two questions and he cannot answer either. A2-item-3-o3 (adviser-l-maresova, first_hand): she could not determine at the desk whether recovery was possible and had no route to find out. A2-item-5-o5 (cc-payments-report, aggregated): 7,410 status calls against 4,830 cases. Four origins, three first_hand; well above both conditions. Tag: strong."
    disconfirming: "An observation of an agent telling a client the recall had gone out and the money was still in the receiving account, confirmed as accurate, would directly contradict this. A system description showing real-time recovery status available to front-line staff would contradict the structural claim."
    themes: [information gap, client uncertainty, front-line capability]
    kind: true
  - id: H5
    statement: "We believe the contact centre is unreachable outside weekday hours, so cases that arrive on evenings and weekends wait for the first working moment before anyone can act."
    evidence: [A2-item-1-o2, A2-item-5-o2]
    trust: strong
    rationale: "Qualifying set: two qualifying references across two independent origins, both complete. A2-item-1-o2 (customer-1, first_hand): she called at 19:40 on a Friday and reached a recorded message saying the payments team operates weekdays only. A2-item-5-o2 (cc-payments-report, aggregated): 38 per cent of cases were opened outside weekday business hours. Two origins, one first_hand; both conditions met. Tag: strong."
    disconfirming: "An observation confirming a 24-hour handling route for instant payment disputes would contradict this. A report showing the 38 per cent figure includes cases opened by bank staff rather than by clients would narrow it."
    themes: [opening hours, out-of-hours, access]
    kind: barrier
  - id: H6
    statement: "We believe the bank has never measured the time from a client's first contact to a recall being despatched, so it cannot know whether the delay is long enough to cost recovery."
    evidence: [A2-item-2-o6, A2-item-4-o6, A2-item-5-o6]
    trust: strong
    rationale: "Qualifying set: three qualifying references across three independent origins, all complete. A2-item-2-o6 (cc-o-sykora, first_hand): no system tracks outcomes at the case level; he keeps a personal notebook of the cases where funds came back. A2-item-4-o6 (bo-z-hruby, first_hand): the form carries no timestamp for when the client first contacted; the metric has never been measured and cannot be reconstructed from existing records. A2-item-5-o6 (cc-payments-report, aggregated): the fields for client first contact and recall sent do not exist in the source system; both were requested. Two origins are first_hand; both conditions met. Tag: strong."
    disconfirming: "A report or system log showing the time from client contact to recall despatch for any period would contradict the claim that the metric has never been measured. An observation that the source system holds the timestamps and the requested fields were simply not exposed in the report would narrow it."
    themes: [measurement, outcome tracking, data gap]
    kind: true
  - id: H7
    statement: "We believe a client who has filed a dispute receives no information about what is happening during the median nine days between filing and hearing the outcome."
    evidence: [A2-item-1-o3, A2-item-1-o6, A2-item-3-o2, A2-item-5-o4]
    trust: strong
    rationale: "Qualifying set: four qualifying references across three independent origins, all complete. A2-item-1-o3 and A2-item-1-o6 (customer-1, first_hand): told only that a form would be sent and the bank would try; eleven days later a letter said the receiving bank had not agreed and did not state when the recall had been sent. A2-item-3-o2 (adviser-l-maresova, relayed): the client was passed between two teams and not told what would happen next; proximity is relayed. A2-item-5-o4 (cc-payments-report, aggregated): median nine days from case opening to outcome. Three origins, one first_hand (customer-1); both conditions met. Tag: strong."
    disconfirming: "An observation of a client receiving a status update during the wait period - by message, letter or call - would contradict this. A process document describing an interim communication step between case opening and outcome letter would narrow it."
    themes: [client communication, wait period, outcome notification]
    kind: true
not_restated:
  - ref: A2-item-3
    statement: "A client was deceived on 2026-08-18 by a message appearing to come from the bank's fraud team; the caller referenced a card payment made that morning and directed the client to move his balance to a protected account, resulting in two transfers of 61,000 crowns and 38,500 crowns eleven minutes apart."
    reason: "This observation describes the social engineering mechanism by which the fraud occurred. It is context for how the client came to need a recall, not a problem the bank's recall process created or can address. The brief is scoped to recovery; the deception event is background."
  - ref: A2-item-4
    statement: "A recall is a request to the receiving bank, not a right; the receiving bank decides, with response times ranging from the same day to a fortnight, and two banks that respond only when chased."
    reason: "This describes a structural constraint on what the recall process can achieve: the receiving bank's cooperation determines the outcome and cannot be compelled. The initiative brief records this explicitly as a known constraint. It defines the boundary of the problem rather than a problem to be solved."
rejected: []
carried_unresolved:
  - ref: A2-item-2
    question: "The contact centre agent stated that cases where funds come back are the ones raised in the same hour, and confirmed the team has never been shown a number for this. The claim is carried as reported in H2 and H3 as supporting context, but no measured relationship between time-to-recall and recovery rate exists in any of the material. The recovery rate in the report (eleven per cent of cases) carries no breakdown by time elapsed before the recall was sent."
---

# Record R-A3-01 - A3

One hypothesis-authoring invocation. Not written for a reader; the document assembled from it is 2-problems/3-problem-hypotheses.md.
