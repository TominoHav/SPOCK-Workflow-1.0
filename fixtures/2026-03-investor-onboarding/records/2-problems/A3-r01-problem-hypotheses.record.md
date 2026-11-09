---
run_id: 2026-03-investor-onboarding
record_id: R-A3-01
artifact_id: A3
item_id: ""
produced_by:
  agent: hypothesis-designer
  skill: hypothesis-authoring
produced_at: 2026-08-12
bounds_hit: []
observations_read: 8
hypotheses:
  - id: H1
    statement: "A first-time investor who reaches the in-app fund selection encounters more options than they can evaluate and exits without making a selection."
    evidence:
      - A2-item-1
      - A2-item-3
    trust: weak
    rationale: "Qualifying set: A2-item-1 (participant-p7, first_hand, complete) and A2-item-3 (participant-p7, first_hand, complete). One independent origin (participant-p7). Two observations, one origin — volume is not corroboration. Below the threshold of two independent origins required for strong."
  - id: H2
    statement: "A first-time investor cannot complete the suitability questionnaire because its questions presuppose investment experience they do not have, causing them to stop before completing a purchase."
    evidence:
      - A2-item-2
      - A2-item-5
    trust: strong
    rationale: "Qualifying set: A2-item-2 (participant-p7, first_hand, complete) and A2-item-5 (adviser-k-sedlackova, relayed, complete). Two independent origins. At least one first_hand observation present (participant-p7, A2-item-2). Both conditions for strong are satisfied."
  - id: H3
    statement: "A customer who reaches the investment order confirmation screen cannot determine when money will leave their account and cancels the order rather than proceeding under uncertainty about the settlement timeline."
    evidence:
      - A2-item-4
    trust: weak
    rationale: "Qualifying set: A2-item-4 (participant-p11, first_hand, complete). One independent origin (participant-p11). First_hand and complete, but a single origin is below the threshold for strong."
rejected:
  - statement: "Customers would use a guided robo-advisor to make their investment decisions."
    reason: "Names a thing to build rather than stating a customer problem. Derived from A2-item-7 (Product Owner statement). The intake record records no observational basis for the claim. Under evidence-standards §2, the Product Owner's prediction of customer behavior is not an observation of customer behavior — it is the hypothesis. No intake observation supports a distinct need beneath this candidate that is not already captured in H1, H2, or H3."
not_evidence:
  - ref: A2-item-7
    reason: "The observation reports the Product Owner's prediction that customers would use a robo-advisor. It does not report something the origin observed about customer behavior. Under evidence-standards §2, an assertion about what customers would do is not evidence for any hypothesis. Provenance is also incomplete: no session date and no observational basis were stated."
not_restated:
  - ref: A2-item-6
    reason: "States that conversion from current-account balances to a first investment product remains in single digits. This is a population-level aggregated indicator, not an observation of a specific barrier encountered by a named customer. Provenance is incomplete (no deck date, no underlying figures cited) so this reference does not reach the qualifying set for any hypothesis. The specific barriers to conversion are captured in H1, H2, and H3."
carried_unresolved:
  - ref: A2-item-6
    question: "No date is recorded on the retail savings migration deck. When was it produced?"
  - ref: A2-item-6
    question: "No underlying figures or methodology are cited for the single-digit conversion claim. What is the source data?"
  - ref: A2-item-7
    question: "No session date is recorded for the Product Owner's statement. When was it made?"
  - ref: A2-item-7
    question: "No observational basis is cited for the claim that customers would use a guided robo-advisor. What customer behavior or data does this rest on?"
---

# Record R-A3-01 — A3

One production. Not written for a reader; the document assembled from it is 2-problems/3-problem-hypotheses.md.
