---
run_id: 2026-01-mortgage-onboarding
record_id: R-A5-01
artifact_id: A5
item_id: ""
produced_by:
  agent: competitive-analysis
  skill: landscape-mapping
produced_at: 2026-08-09
topic: "Mortgage onboarding for first-time buyers"
scope_field: "Retail mortgage origination, Czech market"
trends:
  - id: B1
    class: business
    name: "Origination moves from branch appointment to self-service"
    impact: high
    horizon: short
    lifecycle: growing
    description: "Lenders are shifting first contact for a mortgage from a branch appointment to an in-app application the buyer starts alone. The adviser becomes a fallback rather than the entry point."
    evidence:
      - "HypoBank product pages describe an end-to-end online application, accessed 2026-08-09 (fixture)"
    implication: "The stall this run is about happens in a flow the buyer is alone in. A branch-first market would not have this problem to solve."
  - id: B2
    class: business
    name: "Brokers keep the advisory relationship the banks are digitising away"
    impact: medium
    horizon: medium
    lifecycle: mature
    description: "Independent brokers hold the first-time-buyer relationship in this market and compete on guidance rather than rate. A bank that removes human contact competes with them on their strongest ground."
    evidence:
      - "Broker comparison sites, accessed 2026-08-09 (fixture)"
    implication: "A rescue that reaches a human is competing with the broker's whole value proposition, not adding a nicety."
  - id: B3
    class: business
    name: "Rate comparison is commoditised, so drop-off is the differentiator"
    impact: medium
    horizon: short
    lifecycle: mature
    description: "Headline rates are within a narrow band across this market and are published on aggregators. Lenders increasingly compete on completion rate rather than on price."
    evidence:
      - "Aggregator rate tables, accessed 2026-08-09 (fixture)"
    implication: "Recovering a stalled application is worth more here than it would be in a market still competing on rate."
  - id: T1
    class: technology
    name: "Application state is saved and resumable across sessions"
    impact: high
    horizon: short
    lifecycle: mature
    description: "Saving a partially completed application and resuming it later is in production across this market rather than emerging. Deployed by three or more lenders in scope."
    evidence:
      - "HypoBank and two comparators document save-and-resume, accessed 2026-08-09 (fixture)"
    implication: "Hand-off carrying saved state is a build on something the estate already does, not a new capability."
  - id: T2
    class: technology
    name: "In-flow co-browsing and adviser hand-off"
    impact: medium
    horizon: medium
    lifecycle: emerging
    description: "A small number of lenders let an adviser join the buyer's session in progress and see the same screen. In production, not a pilot, but not yet common."
    evidence:
      - "One comparator's help centre documents adviser co-browse, accessed 2026-08-09 (fixture)"
    implication: "The mechanism this run's idea needs exists in the market and is not yet a standard, which is where an innovator sits."
  - id: T3
    class: technology
    name: "Document capture by phone camera with instant validation"
    impact: low
    horizon: short
    lifecycle: mature
    description: "Photographing identity and income documents in-app with immediate rejection of unreadable scans is standard across the market."
    evidence:
      - "Product pages of all three profiled participants, accessed 2026-08-09 (fixture)"
    implication: "Not a differentiator, and a rescue flow that reintroduces document friction would be a visible regression."
  - id: R1
    class: regulatory
    instrument: "Directive 2014/17/EU (Mortgage Credit Directive), Article 16"
    effective: "in force"
    name: "Pre-contractual information must be given before the buyer is bound"
    impact: high
    horizon: short
    lifecycle: mature
    description: "The lender must provide adequate explanations and the standardised information sheet so the buyer can assess whether the product suits them, before any binding step."
    evidence:
      - "Directive 2014/17/EU, Article 16, consolidated text (fixture)"
    implication: "An adviser hand-off mid-application is a point where explanation is given, so what is said there falls inside the obligation rather than beside it."
  - id: R2
    class: regulatory
    instrument: "Regulation (EU) 2016/679 (GDPR), Article 5(1)(c)"
    effective: "in force"
    name: "Data minimisation applies to behavioural signals, not only to form fields"
    impact: medium
    horizon: short
    lifecycle: mature
    description: "Personal data must be adequate, relevant and limited to what is necessary. Inactivity and error-rate signals derived from a session are personal data when tied to an identified applicant."
    evidence:
      - "Regulation (EU) 2016/679, Article 5, consolidated text (fixture)"
    implication: "Stall detection is built on session telemetry, so what is captured and how long it is kept is a design constraint on this run's central mechanism."
  - id: R3
    class: regulatory
    instrument: "Regulation (EU) 2022/2554 (DORA)"
    effective: "2025-01-17"
    name: "Operational resilience requirements reach customer-facing origination"
    impact: low
    horizon: medium
    lifecycle: growing
    description: "Financial entities must manage ICT risk across critical functions, with incident reporting and third-party oversight. Origination journeys that depend on a live adviser channel come into scope."
    evidence:
      - "Regulation (EU) 2022/2554, applicable from 17 January 2025 (fixture)"
    implication: "A rescue route that depends on adviser availability adds a dependency the resilience regime will ask about."
participants:
  - identity_key: hypobank.cz
    name: HypoBank
    type: direct
    represents: [B1, B3, T1, T3, R1]
    standing: leader
    first_seen: 2026-08-09
    deep_dive: true
    reason: "Largest direct competitor on first-time-buyer mortgages; sets the onboarding benchmark"
  - identity_key: mbank.cz
    name: mBank CZ
    type: direct
    represents: [B1, T1, T3, R2]
    standing: leader
    first_seen: 2026-08-09
    deep_dive: true
    reason: "Direct competitor with a fully digital origination flow"
  - identity_key: rb.cz
    name: Raiffeisen CZ
    type: direct
    represents: [B1, T2, R3]
    standing: innovator
    first_seen: 2026-08-09
    deep_dive: false
    reason: "Direct competitor but branch-led; adds little to a digital-onboarding read"
  - identity_key: adjacent:broker-networks
    name: Independent broker networks
    type: adjacent
    represents: [B2]
    standing: leader
    first_seen: 2026-08-09
    deep_dive: true
    reason: "Adjacent channel that owns the first-time-buyer relationship before any bank does"
  - identity_key: substitute:long-term-rental
    name: Long-term rental platforms
    type: substitute
    first_seen: 2026-08-09
    deep_dive: false
    reason: "Substitute for buying at all; profiled shallow, its presence is the finding"
reused: []
unprofiled: []
---

# Record R-A5-01 — A5

One production. Not written for a reader; the document assembled from it is 3-competitive-analysis/1-landscape-map.md.
