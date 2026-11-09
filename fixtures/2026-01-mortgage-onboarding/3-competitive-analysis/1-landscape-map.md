---
run_id: 2026-01-mortgage-onboarding
artifact_id: A5
ost_role: none
status: accepted
workflow: competitive-analysis
modified_by: human
revisions: 0
store: S1
scope: shared
standards_basis: indicative
external_sources: [E1, E2]
sources:
  - A1
  - A4
produced_by:
  agent: competitive-analysis
  skill: landscape-mapping
# Competitive Analysis | Landscape Map — derived from the gate model and
# recomputed at the gate, never read as authored (C65, PD148/D7)
could_not_verify:
  - rule: "authored only from the quarantine bridge's structured extract, never from raw external text"
    needs: judge
    reach: process
egress_basis: fixture
assembled_at: 2026-08-20
assembled_from: [R-A5-01]
---

# Competitive Analysis | Landscape Map — Mortgage application onboarding

Nine trends were mapped across business, technology and regulation, and five participants were placed against them. Three were taken forward for deep research. The movement that matters for this initiative is not that mortgage applications are going digital, which every participant is doing, but that the broker networks are competing on removing the customer's need to choose a lender at all. [rec:R-A5-01]

---

## Where the market is moving

### Business trends

**B1 — Origination moves from branch appointment to self-service.** Lenders are shifting first contact for a mortgage from a branch appointment to an in-app application the buyer starts alone. The adviser becomes a fallback rather than the entry point.

Impact high · horizon short · growing · evidence: HypoBank product pages describe an end-to-end online application, accessed 2026-08-09 (fixture)

*What it means for this initiative.* The stall this run is about happens in a flow the buyer is alone in. A branch-first market would not have this problem to solve.

**B2 — Brokers keep the advisory relationship the banks are digitising away.** Independent brokers hold the first-time-buyer relationship in this market and compete on guidance rather than rate. A bank that removes human contact competes with them on their strongest ground.

Impact medium · horizon medium · mature · evidence: Broker comparison sites, accessed 2026-08-09 (fixture)

*What it means for this initiative.* A rescue that reaches a human is competing with the broker's whole value proposition, not adding a nicety.

**B3 — Rate comparison is commoditised, so drop-off is the differentiator.** Headline rates are within a narrow band across this market and are published on aggregators. Lenders increasingly compete on completion rate rather than on price.

Impact medium · horizon short · mature · evidence: Aggregator rate tables, accessed 2026-08-09 (fixture)

*What it means for this initiative.* Recovering a stalled application is worth more here than it would be in a market still competing on rate.

### Technology trends

**T1 — Application state is saved and resumable across sessions.** Saving a partially completed application and resuming it later is in production across this market rather than emerging. Deployed by three or more lenders in scope.

Impact high · horizon short · mature · evidence: HypoBank and two comparators document save-and-resume, accessed 2026-08-09 (fixture)

*What it means for this initiative.* Hand-off carrying saved state is a build on something the estate already does, not a new capability.

**T2 — In-flow co-browsing and adviser hand-off.** A small number of lenders let an adviser join the buyer's session in progress and see the same screen. In production, not a pilot, but not yet common.

Impact medium · horizon medium · emerging · evidence: One comparator's help centre documents adviser co-browse, accessed 2026-08-09 (fixture)

*What it means for this initiative.* The mechanism this run's idea needs exists in the market and is not yet a standard, which is where an innovator sits.

**T3 — Document capture by phone camera with instant validation.** Photographing identity and income documents in-app with immediate rejection of unreadable scans is standard across the market.

Impact low · horizon short · mature · evidence: Product pages of all three profiled participants, accessed 2026-08-09 (fixture)

*What it means for this initiative.* Not a differentiator, and a rescue flow that reintroduces document friction would be a visible regression.

### Regulatory trends

**R1 — Pre-contractual information must be given before the buyer is bound.** The lender must provide adequate explanations and the standardised information sheet so the buyer can assess whether the product suits them, before any binding step.

Impact high · horizon short · mature · evidence: Directive 2014/17/EU, Article 16, consolidated text (fixture)

*What it means for this initiative.* An adviser hand-off mid-application is a point where explanation is given, so what is said there falls inside the obligation rather than beside it.

**R2 — Data minimisation applies to behavioural signals, not only to form fields.** Personal data must be adequate, relevant and limited to what is necessary. Inactivity and error-rate signals derived from a session are personal data when tied to an identified applicant.

Impact medium · horizon short · mature · evidence: Regulation (EU) 2016/679, Article 5, consolidated text (fixture)

*What it means for this initiative.* Stall detection is built on session telemetry, so what is captured and how long it is kept is a design constraint on this run's central mechanism.

**R3 — Operational resilience requirements reach customer-facing origination.** Financial entities must manage ICT risk across critical functions, with incident reporting and third-party oversight. Origination journeys that depend on a live adviser channel come into scope.

Impact low · horizon medium · growing · evidence: Regulation (EU) 2022/2554, applicable from 17 January 2025 (fixture)

*What it means for this initiative.* A rescue route that depends on adviser availability adds a dependency the resilience regime will ask about.

---

## Who is in it

| Participant | Type | Standing | Represents | Deep dive |
|---|---|---|---|---|
| **HypoBank** (hypobank.cz) | direct | leader | B1, B3, T1, T3, R1 | yes |
| **mBank CZ** (mbank.cz) | direct | leader | B1, T1, T3, R2 | yes |
| **Raiffeisen CZ** (rb.cz) | direct | innovator | B1, T2, R3 | no |
| **Independent broker networks** (adjacent:broker-networks) | adjacent | leader | B2 | yes |
| **Long-term rental platforms** (substitute:long-term-rental) | substitute | — | — | no |

---

## Who we looked at closely, and why

**HypoBank — profiled.** Largest direct competitor on first-time-buyer mortgages; sets the onboarding benchmark

**mBank CZ — profiled.** Direct competitor with a fully digital origination flow

**Raiffeisen CZ — not profiled.** Direct competitor but branch-led; adds little to a digital-onboarding read

**Independent broker networks — profiled.** Adjacent channel that owns the first-time-buyer relationship before any bank does

**Long-term rental platforms — not profiled.** Substitute for buying at all; profiled shallow, its presence is the finding

---

## What we could not establish

**Every trend on this map has at least one representative.**

**The participant floor.** This map profiles 3 of 5 mapped participants. The floor of ten arrived at Competitive Analysis Standards v0.6, after this stage ran, and a stage is not held to a bar written after it ran.

---

## How this was produced

**Stage 3.1 landscape-mapping, quality gate Q3.** The map was built from the brief and the prioritised problems. **The research ran under Competitive Analysis Standards v0.4**, before the ten-participant floor and the three trend classes were fixed, and it carries what that version asked for. **Research regime pilot-test, and the run material is fabricated.**

**Assembled from one record**, which carries the trends, the participants and the selection reasons as fields a gate decides:

- **R-A5-01** — records/3-competitive-analysis/A5-r01-landscape-map.record.md

