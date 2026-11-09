---
run_id: 2026-02-sme-onboarding
record_id: R-A3-01
artifact_id: A3
item_id: ""
produced_by:
  agent: hypothesis-designer
  skill: hypothesis-authoring
produced_at: 2026-08-03
bounds_hit: []
observations_read: 14
hypotheses:
  - id: H1
    statement: The document upload step neither completes nor reports a failure, so an applicant cannot tell whether the upload has been accepted
    trust: strong
    rationale: Two independent origins in the qualifying set — participant P1 (A2-item-1, A2-item-2) and adviser M. Dvorak (A2-item-4). All three references carry complete provenance for their form. Nothing fell out of the qualifying set
    evidence:
      - A2-item-1
      - A2-item-2
      - A2-item-4
  - id: H2
    statement: SME applicants who are blocked at the document upload step leave the application without completing it, and do not return to it
    trust: strong
    rationale: Two independent origins in the qualifying set — participant P1 (A2-item-1, A2-item-3) and adviser M. Dvorak (A2-item-4). All three complete for their form. Nothing fell out of the qualifying set
    evidence:
      - A2-item-1
      - A2-item-3
      - A2-item-4
  - id: H3
    statement: Applicants who hold the correct documents are still unable to get through the document upload step
    trust: weak
    rationale: One origin in the qualifying set — adviser M. Dvorak (A2-item-4), complete for the ticket form. Thin rather than incomplete. This is the hypothesis whose only source is the ticket carrying the injected block, and the arithmetic returned weak
    evidence:
      - A2-item-4
  - id: H4
    statement: The failure at the document upload step recurs on a repeat attempt and on a different device, so it is not resolved by the applicant trying again
    trust: weak
    rationale: One origin in the qualifying set — participant P1, in both references. Both complete. Two items from one participant remain one origin, and volume is not corroboration
    evidence:
      - A2-item-1
      - A2-item-2
  - id: H5
    statement: Applicants who stall at the bank onboarding open the account with a fintech provider instead, where the same task takes about ten minutes on a phone
    trust: weak
    rationale: One origin in the qualifying set — participant P1 (A2-item-3), complete for the transcript form. A second origin reporting the same switch would make this strong
    evidence:
      - A2-item-3
  - id: H6
    statement: Drop-off in SME onboarding concentrates between identity verification and first funding, with the largest single gap at document submission
    trust: weak
    rationale: No origins in the qualifying set. All three observations on A2-item-5 fell out for incomplete provenance — the deck carries no production date, which the document form requires, names no underlying source, and includes no figures. A reference exists and stays attached, so this is weak and not unrated, per evidence-standards §5
    evidence:
      - A2-item-5
  - id: H7
    statement: Applicants abandon the application because the document upload step times out
    trust: unrated
    rationale: No references at all once evidence-standards §2 is applied. A2-item-6 is the claim restated by the person making it, and the intake records no observation behind it, so it is not evidence for it. The engineering timeout logs cited in A1 external_sources were not supplied as A2 material, and C35 does not permit the brief as an evidence route
    evidence: []
    not_evidence:
      - A2-item-6 removed by evidence-standards §2. It restates the hypothesis and the intake records no observation behind it
not_restated:
  - The pasted block inside A2-item-4. It is an observation about the material and its author, not a problem in SME onboarding. It was not acted on and it is reported in the body
  - The adviser advised the client to retry the following day (A2-item-4). It records a response, not a problem. The problem it would imply, that no in-flow recovery path exists, is not observed in the material and was not inferred
  - The deck carries no underlying figures for either statement on slide 7 (A2-item-5). A fact about the material rather than a problem in onboarding. It is the reason H6 has no qualifying reference
carried_unresolved:
  - ref: A2-item-4
    question: Whether the client the adviser relays is participant P1 or a different person is not established. Evidence-standards §4.1 puts a ticket origin at the reporter where the relayed customer is not named, so the origin key here is M. Dvorak and it is distinct from P1. This is the single judgement that, resolved the other way, would move H1 and H2 from strong to weak
  - ref: A2-item-4
    question: The block pasted into the ticket has no established origin and the adviser records it as unclear. It was not acted on here. A reviewer may want the ticket re-checked at source before H1, H2 and H3 carry weight
  - ref: A2-item-5
    question: The deck has no production date and names no underlying source. A date alone would move A2-item-5 into the qualifying set, making H6 weak on one origin rather than weak on none
  - ref: A2-item-6
    question: The engineering timeout logs cited in A1 external_sources were not supplied as A2 material. Supplying them through material-intake is the only route by which H7 can carry evidence, and it is what would move H7 off unrated
---

# Record R-A3-01 — A3

One production. Not written for a reader; the document assembled from it is 2-problems/3-problem-hypotheses.md.
