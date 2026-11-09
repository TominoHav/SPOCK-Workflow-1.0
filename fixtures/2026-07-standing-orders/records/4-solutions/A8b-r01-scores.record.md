---
run_id: 2026-07-standing-orders
record_id: R-A8b-01
artifact_id: A8b
item_id: ""
produced_at: 2026-08-24
bounds_hit: []
trace_id: []
sources: [A1, A4, A7, A8]
external_sources: []
scores:
  - idea: I1
    potential:
      denominator: 30
      sub_scores:
        - dimension: strategic_alignment
          score: 30
          band: Strong
          rationale: "I1 creates a unified hub that includes standing order and direct debit management alongside card subscription visibility, directly enabling clients to complete SO/DD changes in George without calling the bank. That is what the product metric measures. The metric is one step from AI-2: the brief states every change completed in the app is a service process completed straight-through, which is what AI-2 counts. Both steps hold without assumptions."
      rationale: "Strategic alignment scored Strong (30 of 30) against AI-2, AI First objective, §2.7 of Strategy Basis. Five sub-dimensions unscored; see unscored[] below. Potential denominator is 30, not 100."
    difficulty:
      denominator: 0
      sub_scores: []
      rationale: "No difficulty sub-dimension scored. Both defining bodies are absent: Compliance Guidelines (regulatory and compliance risk, 40 weight) and Banking Constraints (technical complexity 35, operational change 25). All three are in unscored[] below. Difficulty denominator is 0."
    unscored:
      - dimension: problem_solution_fit
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 35, reduces potential denominator from 100 to 30 when combined with other Banking Constraints sub-dimensions below."
      - dimension: market_differentiation
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 20."
      - dimension: innovation_opportunity
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 15."
      - dimension: regulatory_and_compliance_risk
        reason: "Band defined in Compliance Guidelines. That body is absent from this run by decision of 24 August (PD164). Weight 40, accounts for the entire difficulty denominator gap."
      - dimension: technical_complexity
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 35."
      - dimension: operational_change
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 25."
  - idea: I2
    potential:
      denominator: 30
      sub_scores:
        - dimension: strategic_alignment
          score: 20
          band: Moderate
          rationale: "I2's primary mechanism is targeted card subscription payment blocking (H2) and honest UX about what that block achieves versus what it does not (H3). Neither directly moves the stated product metric, which covers standing-order and direct-debit changes. The path to AI-2 passes through one named intermediate: the brief explicitly states every change completed in the app is a service process that did not need a person, which AI-2 counts, and card subscription blocks completed in-app are covered by that statement. Both steps hold without assumptions. Moderate rather than Strong because the primary mechanism bypasses the stated product metric."
      rationale: "Strategic alignment scored Moderate (20 of 30) against AI-2, AI First objective, §2.7 of Strategy Basis. Five sub-dimensions unscored; see unscored[] below. Potential denominator is 30, not 100."
    difficulty:
      denominator: 0
      sub_scores: []
      rationale: "No difficulty sub-dimension scored. Both defining bodies absent; see I1's difficulty rationale. Difficulty denominator is 0."
    unscored:
      - dimension: problem_solution_fit
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 35."
      - dimension: market_differentiation
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 20."
      - dimension: innovation_opportunity
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 15."
      - dimension: regulatory_and_compliance_risk
        reason: "Band defined in Compliance Guidelines. That body is absent from this run by decision of 24 August (PD164). Weight 40."
      - dimension: technical_complexity
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 35."
      - dimension: operational_change
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 25."
  - idea: I3
    potential:
      denominator: 30
      sub_scores:
        - dimension: strategic_alignment
          score: 30
          band: Strong
          rationale: "I3's H4 component makes the bank's actual capability per commitment type visible before any action. For standing orders and direct debits, clients see they can cancel or modify those outright in the app without calling the bank. That transparency directly enables clients to complete SO/DD changes digitally, which is what the product metric measures. The metric is one step from AI-2 per the brief's stated link. Both steps hold without assumptions."
      rationale: "Strategic alignment scored Strong (30 of 30) against AI-2, AI First objective, §2.7 of Strategy Basis. Five sub-dimensions unscored; see unscored[] below. Potential denominator is 30, not 100."
    difficulty:
      denominator: 0
      sub_scores: []
      rationale: "No difficulty sub-dimension scored. Both defining bodies absent. Difficulty denominator is 0."
    unscored:
      - dimension: problem_solution_fit
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 35."
      - dimension: market_differentiation
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 20."
      - dimension: innovation_opportunity
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 15."
      - dimension: regulatory_and_compliance_risk
        reason: "Band defined in Compliance Guidelines. That body is absent from this run by decision of 24 August (PD164). Weight 40."
      - dimension: technical_complexity
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 35."
      - dimension: operational_change
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 25."
  - idea: I4
    potential:
      denominator: 30
      sub_scores:
        - dimension: strategic_alignment
          score: 20
          band: Moderate
          rationale: "I4's primary innovation is a virtual card vault assigning a per-subscription credential so clients can delete a card number to stop charges (H2). The H4 component adds type-specific capability declarations across all commitment types, which includes showing that SO/DD changes can be completed outright in the app, enabling digital completions the product metric measures. The metric-moving element is the H4 transparency feature within I4, not the primary card vault mechanism. That is one named thing in between the idea and the metric. Both steps hold: H4 transparency in I4 enables SO/DD digital completions (metric), and the metric is one step from AI-2."
      rationale: "Strategic alignment scored Moderate (20 of 30) against AI-2, AI First objective, §2.7 of Strategy Basis. Five sub-dimensions unscored; see unscored[] below. Potential denominator is 30, not 100."
    difficulty:
      denominator: 0
      sub_scores: []
      rationale: "No difficulty sub-dimension scored. Both defining bodies absent. Difficulty denominator is 0."
    unscored:
      - dimension: problem_solution_fit
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 35."
      - dimension: market_differentiation
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 20."
      - dimension: innovation_opportunity
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 15."
      - dimension: regulatory_and_compliance_risk
        reason: "Band defined in Compliance Guidelines. That body is absent from this run by decision of 24 August (PD164). Weight 40."
      - dimension: technical_complexity
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 35."
      - dimension: operational_change
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 25."
  - idea: I5
    potential:
      denominator: 30
      sub_scores:
        - dimension: strategic_alignment
          score: 30
          band: Strong
          rationale: "I5 creates a data layer covering all three commitment types, including standing orders and direct debits as first-class items. The client-facing surface enables clients to view and act on SO/DD commitments in one place (H1), and each entry carries a capability indicator stating the bank's actual ability per type, including that SO/DD can be cancelled outright (H4). Both components directly enable clients to complete SO/DD changes in the app without contacting the bank, which is what the product metric measures. The metric is one step from AI-2 per the brief's stated link. Both steps hold without assumptions."
      rationale: "Strategic alignment scored Strong (30 of 30) against AI-2, AI First objective, §2.7 of Strategy Basis. Five sub-dimensions unscored; see unscored[] below. Potential denominator is 30, not 100."
    difficulty:
      denominator: 0
      sub_scores: []
      rationale: "No difficulty sub-dimension scored. Both defining bodies absent. Difficulty denominator is 0."
    unscored:
      - dimension: problem_solution_fit
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 35."
      - dimension: market_differentiation
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 20."
      - dimension: innovation_opportunity
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 15."
      - dimension: regulatory_and_compliance_risk
        reason: "Band defined in Compliance Guidelines. That body is absent from this run by decision of 24 August (PD164). Weight 40."
      - dimension: technical_complexity
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 35."
      - dimension: operational_change
        reason: "Band defined in Banking Constraints. That body is absent from this run by decision of 24 August (PD164). Weight 25."
---

Run `2026-07-standing-orders`, record `R-A8b-01`. Five ideas scored on two axes; see the assembled output at `4-solutions/2-solution-scores.md`.
