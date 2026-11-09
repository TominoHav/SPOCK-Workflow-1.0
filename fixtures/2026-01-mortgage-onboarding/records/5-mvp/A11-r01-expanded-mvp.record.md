---
run_id: 2026-01-mortgage-onboarding
record_id: R-A11-01
artifact_id: A11
item_id: ""
produced_by:
  agent: product-owner
  skill: mvp-expansion
produced_at: 2026-08-10
option_id: O1
description: "In-app rescue for the stalled first-time buyer: the digital onboarding flow watches for a stall, then offers, in place, a way to reach a mortgage advisor without restarting or re-entering anything"
strategic_touchpoints:
  - touchpoint: "Serves the digital-first onboarding bet directly, because the rescue never leaves the channel the strategy is investing in"
    basis: indicative_unverified_strategy
  - touchpoint: "Strains the advisor-capacity model if stalls are frequent, since in-app requests still land on a human advisor queue"
    basis: indicative_unverified_strategy
compliance_touchpoints:
  - "The advisor sees the in-progress application on hand-off, so access is scoped to the assigned advisor and the buyer consents to the hand-off before it happens (indicative, Compliance Guidelines absent)"
  - "The stall signal is derived from the buyer's own session, so what is captured and how long it is kept are stated to the buyer (indicative)"
analyst_input:
  - "Stall signal: inactivity beyond a set threshold on a step, or a repeated validation error on the same field, triggers the in-app offer"
  - "Hand-off carries the saved application state to the advisor, so the buyer resumes rather than restarts"
  - "The offer is dismissible and does not block the buyer from continuing on their own"
  - "Advisor reach is chat first, with a scheduled call as the fallback when chat cannot resolve it"
---

# Record R-A11-01 — A11

One production. Not written for a reader; the document assembled from it is 5-mvp/2-expanded-mvp.md.
