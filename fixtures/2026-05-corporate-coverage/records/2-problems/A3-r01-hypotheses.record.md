---
run_id: 2026-05-corporate-coverage
record_id: R-A3-01
artifact_id: A3
item_id: ""
produced_at: 2026-08-20
produced_by:
  agent: hypothesis-designer
  skill: hypothesis-authoring
bounds_hit: []
observations_read: 22
hypotheses:
  - id: H1
    statement: "We believe the bank's knowledge of a person is split across business lines, systems and entity records that nobody searches across, so a route that exists inside the institution is invisible to the person who needs it."
    evidence: [A2-item-1, A2-item-2, A2-item-3]
    trust: strong
    rationale: "Three independent origins in the qualifying set: rm-p-halasova, ts-m-dolezal and co-i-salomonsen, each first_hand on their own case and each with complete provenance. Three separate boundaries are named and they are different kinds: a business line with its own reporting line, an entity structure inside one client group, and a sister business line's system that credit cannot read. Well above the two-origin threshold, and at least one witness in the set."
    disconfirming: "An observation from someone who searched across a boundary and found what they needed would narrow this to the boundaries named. An observation showing that a bank in this segment operates one joined record across business lines would move it against the segment rather than against the institution."
    themes: [organisational boundaries, entity resolution, retrieval]
    kind: true
  - id: H2
    statement: "We believe the bank records that an interaction happened and not what was said in it, so a name reaches the person who needs it without the history that decides how to use it."
    evidence: [A2-item-1, A2-item-3]
    trust: strong
    rationale: "Two independent origins in the qualifying set: rm-p-halasova and co-i-salomonsen, both first_hand with complete provenance. The relationship manager describes a system that gives eleven interactions and their dates and no content, and call reports written for a credit file rather than for a reader. The credit officer describes having numbers and no view of the people. Two origins with a witness is the bar."
    disconfirming: "An observation describing a call report or a note that a colleague later used to prepare an approach would contradict this. An observation from a bank where the interaction record carries substance would narrow it to this institution."
    themes: [interaction records, earned context, documentation]
    kind: true
  - id: H3
    statement: "We believe a person who does not own a client relationship cannot act on it without spending the owner's time, so opportunities are decided by the cost of asking rather than by their merit."
    evidence: [A2-item-1, A2-item-2, A2-item-4]
    trust: strong
    rationale: "Three independent origins in the qualifying set: rm-p-halasova, ts-m-dolezal and sh-t-reuter, each first_hand and complete. The relationship manager describes rationing access and doing the preparation herself; the product specialist describes queueing behind three colleagues for the same door and working sixty of three hundred names; the segment head names cross-portfolio roles as carrying the worst version. The three describe the same mechanism from three positions."
    disconfirming: "An observation showing a product approach made without the relationship manager's involvement and welcomed by the client would contradict the mechanism. An observation showing that the unreached names are unreached because they are unsuitable rather than because the route is expensive would move against it."
    themes: [access, cross-sell, relationship ownership]
    kind: true
  - id: H4
    statement: "We believe nothing records which of the bank's people actually holds a relationship, so the route to a person is unknown while they are there and lost when they leave."
    evidence: [A2-item-1, A2-item-4]
    trust: strong
    rationale: "Two independent origins in the qualifying set: rm-p-halasova and sh-t-reuter, both first_hand with complete provenance. The relationship manager describes a colleague two floors up who had covered an incoming CFO for six years, connected by a third colleague's memory four months late, and a handover that took her a year to recover from. The segment head describes a consistent wallet loss after a departure and no way to identify which clients are at risk, because nothing records whether the relationship is the institution's or the individual's."
    disconfirming: "An observation describing a handover where the relationship transferred intact, or a record that says who holds a relationship rather than who last contacted it, would contradict this."
    themes: [relationship ownership, continuity, routes]
    kind: true
  - id: H5
    statement: "We believe a suggested person is not actionable without named provenance and the awkward history, so an answer without them is not used even when it is right."
    evidence: [A2-item-1, A2-item-2, A2-item-3]
    trust: strong
    rationale: "Three independent origins in the qualifying set: rm-p-halasova, ts-m-dolezal and co-i-salomonsen, each first_hand and complete, and they agree on the shape rather than only on the direction. All three reject an unattributed strength signal and all three name the same missing category: what would embarrass the person approaching. The credit officer states that an unattributed strength is worse than silence."
    disconfirming: "An observation of somebody acting on a scored suggestion without checking it would contradict this directly. An observation showing that provenance is wanted but not required before acting would weaken it to a preference."
    themes: [provenance, trust in a suggestion, negative history]
    kind: true
  - id: H6
    statement: "We believe the cost of reaching a worse answer is recorded nowhere, so nobody knows the size of the problem and it is attributed to chance when it surfaces."
    evidence: [A2-item-1, A2-item-4]
    trust: strong
    rationale: "Two independent origins in the qualifying set: rm-p-halasova and sh-t-reuter, both first_hand with complete provenance. The relationship manager describes stopping after twenty minutes depending on the day, with nobody ever finding out which happened, and a query count that is what survived the friction rather than what was needed. The segment head states there is no line in any report for the introductions that were not made, so the gap is read as bad luck."
    disconfirming: "An observation of a measurement of relationship reach or of unrealised introductions would contradict this. An observation that a bank in this segment tracks the outcome of who-do-we-know requests would narrow it."
    themes: [invisible cost, measurement, attribution]
    kind: true
not_restated:
  - ref: A2-item-4
    statement: "The segment head would not accept usage figures as evidence that a solution was working, and named cross-sell into previously unworked names and a flattening retention curve after a departure as what he would accept."
    reason: "This is a statement about what would count as evidence rather than a problem anybody has. It belongs to how this initiative is measured and is carried forward to stage 5 rather than restated as a hypothesis."
rejected: []
carried_unresolved:
  - ref: A2-item-4
    question: "The wallet loss of a fifth to a third within eighteen months is reported without a measurement basis, a definition of wallet or a period. Carried as reported and not usable as a quantity until the basis is supplied."
---

# Record R-A3-01 — A3

One hypothesis-authoring invocation. Not written for a reader; the document assembled from it is 2-problems/3-problem-hypotheses.md.
