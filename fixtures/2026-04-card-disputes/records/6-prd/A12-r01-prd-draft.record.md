---
run_id: 2026-04-card-disputes
record_id: R-A12-01
artifact_id: A12
item_id: ""
produced_at: 2026-08-18
produced_by:
  agent: business-analyst
  skill: prd-authoring
bounds_hit: []
constraint_basis: none_stated
structure_basis: prd_template@0.4
sections:
  - id: overview
    status: present
  - id: problem
    status: present
  - id: users
    status: present
  - id: success_measures
    status: present
  - id: requirements
    status: present
  - id: non_functional
    status: present
  - id: out_of_scope
    status: present
  - id: dependencies
    status: present
compliance_touchpoints:
  - CT.a
  - CT.b
alignment_validation:
  statement: "OPT-A was scored Moderate on AI-2 at A8b: the intermediate step is that the notification must reach the cardholder through a primary digital channel and produce a dispute filing in that same channel. The narrowing from ID-3 to OPT-A — universal trigger on every transaction, default-on enrollment of all cardholders — does not break either step in that chain; it widens the pool the mechanism acts on without removing any step. AI-2 confirmed at Moderate: the chain holds, the intermediate step remains. NOM-4 is served: default-on enrollment reaches cardholders who would never have self-enrolled, including those who would otherwise have used the phone or the paper form; OPT-A removes the activation barrier that keeps the disengaged segment in the original channel. NOM-3 is served: every dispute submitted through the notification path is a dispute resolved entirely in the digital channel; the contribution is bounded by the share of cardholders who act on the dispute action over the observation period, which the pilot measures. SHD-1 carries forward as serves or strains, as A11 records it, and the narrowing to a universal transaction trigger makes this the more acute question rather than the less: a cardholder making ten transactions a day receives ten notifications. Whether that frequency is experienced as relevant service or as volume that produces opt-outs and dismissal without engagement is what the pilot's second test question measures empirically. SHD-1 is not resolved to a pass here."
  objectives:
    - "AI-2 — Share of sales and service processes in primary digital channels that are fully straight-through (Strategy Basis §2.7, AI First) — Moderate at A8b, confirmed: chain intact at OPT-A narrowing; universal trigger expands the numerator pool without breaking either chain step"
    - "NOM-4 — Clients migrated from the original channel to the new digital channel (Strategy Basis §2.2, New service model) — serves: default-on enrollment removes the activation barrier for the disengaged segment who would otherwise have remained on the phone or the paper form"
    - "NOM-3 — Clients served digitally (Strategy Basis §2.2, New service model) — serves: every notification-path dispute submission is a digitally served client; contribution bounded by the share of cardholders who act on the dispute action over the observation period"
    - "SHD-1 — Clients having a regular relevant interaction (Strategy Basis §2.3, Super Human Super Digital) — serves or strains; not resolved to a pass; the pilot's second test question is the empirical determination of which direction this key result moves and at what transaction frequency band the boundary falls"
  basis: "strategy-basis@0.1"
requirements:
  - id: R1
    traces_to:
      - A11
      - A4
  - id: R2
    traces_to:
      - A11
      - A4
  - id: R3
    traces_to:
      - A11
      - A4
  - id: R4
    traces_to:
      - A11
      - A4
  - id: R5
    traces_to:
      - A11
      - A4
  - id: R6
    traces_to:
      - A11
      - A4
  - id: R7
    traces_to:
      - A11
  - id: R8
    traces_to:
      - A11
  - id: R9
    traces_to:
      - A11
  - id: R10
    traces_to:
      - A11
  - id: R11
    traces_to:
      - A11
  - id: R12
    traces_to:
      - A11
  - id: R13
    traces_to:
      - A11
  - id: R14
    traces_to:
      - A11
---

# Record R-A12-01 — A12

One production. Not written for a reader; the document assembled from it is 6-prd/1-prd-draft.md.
