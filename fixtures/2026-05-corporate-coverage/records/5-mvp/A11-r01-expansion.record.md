---
run_id: 2026-05-corporate-coverage
record_id: R-A11-01
artifact_id: A11
item_id: ""
produced_at: 2026-08-20
produced_by:
  agent: product-owner
  skill: mvp-expansion
bounds_hit: []
constraint_basis: "indicative — no Banking Constraints body exists for this run, so nothing below is weighed for technical complexity, operational change or cost."
option_id: OPT-A
description: "One surface where a banker asks who do we know for this, and the institution decides where to look. Three properties define it and dropping any of them makes it a different pilot: the question is resolved against the client group before anything is retrieved, every connected source is searched at once across business lines rather than within one, and a source that could not be searched is named in the answer rather than silently producing a shorter list. The answer is a set of named people, each carrying the business line their relationship sits in, the colleague nearest to it, and the evidence that produced the match. No score appears anywhere."
strategic_touchpoints:
  - touchpoint: "SHD-4, the average time a banker spends daily on administration, moves down. The pilot's own measure is the time from a who-do-we-know question being asked to an actionable answer, which is administration in the key result's own terms and one step from it."
    basis: "strategy-basis@0.1 §2"
  - touchpoint: "LVL-2, share of wallet, is reached indirectly and should not be claimed by this pilot. ID-1 makes an approach possible and does not cause one, so a wallet movement inside a pilot window would not be attributable."
    basis: "strategy-basis@0.1 §2"
  - touchpoint: "The initiative sits against the bank's own stated intent to serve clients through fewer administrative steps rather than through more staff, which is the direction B1 on the landscape map describes the whole segment moving in."
    basis: "A5 trend B1"
  - touchpoint: "It is the only initiative in this run's set whose cost of failure is bounded: if bankers do not use a destination, the answer is a fact about the moment rather than a written-off build."
    basis: "A10 OPT-A"
compliance_touchpoints:
  - touchpoint: "GDPR purpose limitation. Every source this pilot reads was captured for another purpose, and repurposing it for relationship retrieval needs a lawful basis and a compatibility assessment before a single source is connected. This is the constraint that arrives first and it applies to the bank's own employees' data as much as to clients'."
    basis: "indicative — identified from A5 trend R2; no Compliance Guidelines body exists to band it"
  - touchpoint: "Works council agreement, where the pilot reads anything that identifies which employee holds a relationship. A record of who is closest to a client is readable as performance data, and agreements have been refused on exactly that ground."
    basis: "indicative — identified from A5 trend R3; no Compliance Guidelines body exists to band it"
analyst_input: "The requirement stage needs four things settled that this expansion states and does not decide. Which sources are in the pilot's scope, which is a purpose-limitation answer rather than a technical one. What the answer shows beside each name, where the position taken here is evidence and never a score, and the market gives a reason: four of ten profiled participants score and all three interviewed users reject scores. What happens when a source cannot be searched, where the position taken here is that the answer says so. And who the pilot is opened to, where the material points at the product specialist as the most acute case and the brief's success signal names them."
---

# Record R-A11-01 — A11

One mvp-expansion invocation. Not written for a reader; the document assembled from it is 5-mvp/2-expanded-mvp.md.
