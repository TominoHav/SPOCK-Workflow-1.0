---
run_id: 2026-04-card-disputes
record_id: R-A3-01
artifact_id: A3
item_id: ""
produced_at: 2026-08-15
produced_by:
  agent: hypothesis-designer
  skill: hypothesis-authoring
bounds_hit: []
observations_read: 10
carried_unresolved:
  - ref: A2-item-7
    question: "Date of production not recorded; provenance is incomplete without it. No locator (page, section, or heading) is provided for the cited slide. Both gaps should be put to the Cards and Payments team before this item is drawn on."
not_restated:
  - ref: A2-item-4
    statement: "Participant D9 received a refund two days after reporting a dispute, which they described as a fast outcome."
    reason: "Positive outcome; reports a satisfactory resolution experience, not a problem. No hypothesis is derived. Cited as partial disconfirming evidence in H5."
hypotheses:
  - id: H1
    statement: "We believe customers do not receive timely notification when an unauthorized card transaction occurs, causing the fraudulent use to go undetected for days or weeks."
    evidence:
      - A2-item-1
    trust: weak
    rationale: "One origin in the qualifying set: participant-d3 (first_hand, provenance complete). One independent origin is below the two-origin threshold required for strong. Proximity mix: one first_hand. Nothing fell out of the qualifying set."
    disconfirming: "An observation from a participant who received a real-time or same-day notification of an unauthorized transaction would contradict this hypothesis. No such observation is present in this record. An observation showing a systematic notification mechanism already in place would also undermine it."
    themes:
      - notification
      - fraud detection
      - transaction monitoring
    kind: true

  - id: H2
    statement: "We believe customers who need to dispute a card transaction cannot do so through digital channels and must resort to submitting a paper form."
    evidence:
      - A2-item-2
    trust: weak
    rationale: "One origin in the qualifying set: participant-d3 (first_hand, provenance complete). One independent origin is below the two-origin threshold required for strong. Proximity mix: one first_hand. Nothing fell out of the qualifying set."
    disconfirming: "An observation from a participant who successfully initiated a card dispute through the app or an online channel without resorting to paper would undermine this hypothesis. No such observation is in this record."
    themes:
      - digital access
      - dispute initiation
      - channel
    kind: barrier

  - id: H3
    statement: "We believe customers who have submitted a card dispute receive no acknowledgement that their report was received and no ongoing visibility into the status of their case."
    evidence:
      - A2-item-3
      - A2-item-5
      - A2-item-6
      - A2-item-8
    reduced_from:
      - ref: A2-item-8
        statement: "The Head of Cards stated in session that a dispute tracker should be built in the app so that customers can see where their case is."
    trust: strong
    rationale: "Four origins in the qualifying set, all with complete provenance: participant-d3 (first_hand), agent-m-vlkova (relayed), agent-t-blaha (relayed), head-of-cards (first_hand). Four independent origins exceed the two-origin threshold; two first_hand observations are present in the qualifying set. Proximity mix: two first_hand, two relayed. A2-item-8 is a solution-shaped statement from the Head of Cards; its 'so that' clause explicitly states the observed need ('so that customers can see where their case is') and is counted as evidence on this hypothesis under §5.3 row 2 — the need is already stated here and every observation that would support a separate hypothesis on this need is already attached. The candidate is recorded in reduced_from; no second hypothesis is created. Nothing fell out of the qualifying set."
    disconfirming: "A2-item-4 shows participant-d9 received a refund in two days; their case resolved quickly and their account of it does not describe an extended period of silence — which suggests the status gap is not universal across all dispute paths. An observation from a participant who received systematic acknowledgement and status updates throughout their dispute would more directly contradict this hypothesis."
    themes:
      - case tracking
      - acknowledgement
      - status visibility
    kind: barrier

  - id: H4
    statement: "We believe customers whose dispute is resolved receive no information about the security implications or investigative outcome of the fraud, leaving them uncertain whether their card or account data remains compromised."
    evidence:
      - A2-item-4
    trust: weak
    rationale: "One origin in the qualifying set: participant-d9 (first_hand, provenance complete). Note: A2-item-4 yielded two distinct observations in the intake record; only the second (no closure information about the perpetrator or card compromise status) is evidence for this hypothesis. The first observation from A2-item-4 (fast refund received, a positive signal) is captured in not_restated and is not counted here. One independent origin is below the two-origin threshold for strong. Proximity mix: one first_hand. Nothing fell out of the qualifying set."
    disconfirming: "An observation from a participant who received a post-resolution debrief — whether the perpetrator was identified, whether their card data remained exposed — would contradict this hypothesis. No such observation is in this record. Participant-d9 cancelled their card proactively in the absence of this information, which is consistent with, rather than challenging, the hypothesis."
    themes:
      - security closure
      - fraud outcome
      - post-resolution communication
    kind: true

  - id: H5
    statement: "We believe card dispute resolution takes longer than market benchmarks consider acceptable, pointing to systemic delays in the dispute-handling process."
    evidence:
      - A2-item-7
    trust: weak
    rationale: "One reference exists (A2-item-7, cards-payments-team, aggregated). Qualifying set is empty: A2-item-7 has incomplete provenance (no production date, no locator). Per §5.1: at least one reference exists and the qualifying set fails both conditions — two independent origins and one first_hand observation — so the tag is weak rather than unrated. Proximity mix in the full reference set: one aggregated, no first_hand. A2-item-7 is also listed in carried_unresolved. A2-item-4 (participant-d9, first_hand, complete) partially disconfirms: a two-day resolution described as fast is in the complete evidence record."
    disconfirming: "A2-item-4 directly contradicts universal slow resolution: participant-d9 received a refund in two days and described it as fast. If cases reaching certain resolution paths are typically resolved this quickly, the hypothesis as stated is too broad. Completing provenance on A2-item-7 and obtaining customer-reported experiences of resolution duration would be necessary to move this hypothesis in either direction."
    themes:
      - resolution time
      - benchmarking
      - process efficiency
    kind: true

rejected:
  - statement: "A fraud-scoring model should be placed on the merchant side to enable automatic pre-approval of refunds."
    from: A2-item-9
    reason: "No observation in the record reports the need beneath this candidate. The specific need would be that customers experience excessive delays in receiving a refund because disputes require manual approval. A2-item-4 (participant-d9, first_hand, complete) reports a two-day resolution the participant described as fast — the opposite of the assumed need. A2-item-7 mentions above-benchmark resolution time but has incomplete provenance, is an aggregate operational metric, and does not describe a customer-reported experience of waiting too long for a refund. No other observation addresses refund-approval delay as a customer pain. Rejecting under §5.3 row 3: no observation anywhere in the record reports the need beneath this candidate."
---

# Record R-A3-01 — A3

One hypothesis-authoring invocation. Not written for a reader; the document assembled from it is 2-problems/3-problem-hypotheses.md.
