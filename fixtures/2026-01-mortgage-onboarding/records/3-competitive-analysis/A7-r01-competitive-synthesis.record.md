---
run_id: 2026-01-mortgage-onboarding
record_id: R-A7-01
artifact_id: A7
item_id: ""
produced_by:
  agent: competitive-analysis
  skill: synthesis
produced_at: 2026-08-09
standards:
  - id: SY1
    statement: "Digital identity and income verification in-flow is the emerging table stake"
    traces_to:
      - hypobank.cz
      - mbank.cz
    addresses:
      - H1
  - id: SY2
    statement: "First-time buyers are reached through an intermediary before any bank onboarding begins"
    traces_to:
      - adjacent:broker-networks
      - hypobank.cz
    addresses:
      - H1
      - H2
patterns:
  - id: SY3
    statement: "The market splits into safe-but-slow incumbents and fast-but-narrow challengers"
    traces_to:
      - hypobank.cz
      - mbank.cz
    addresses:
      - H1
trends:
  - id: SY4
    statement: "Onboarding is moving in-flow, away from the branch and email attachments"
    traces_to:
      - mbank.cz
      - hypobank.cz
    addresses:
      - H1
absences:
  - problem: H2
    note: "No profiled participant offers a supported path for a first-time buyer who stalls mid-onboarding; the fast challenger drops them and the incumbent sends them to a branch"
---

# Record R-A7-01 — A7

One production. Not written for a reader; the document assembled from it is 3-competitive-analysis/3-competitive-synthesis.md.
