---
run_id: 2026-07-standing-orders
artifact_id: A8b
ost_role: solution
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
could_not_verify: []
produced_by:
  agent: product-owner
  skill: idea-scoring
sources: [A1, A4, A7, A8]
external_sources: []
assembled_at: 2026-08-24
assembled_from: [R-A8b-01]
---

# Ideas | Idea scores

Five ideas scored on two independent axes. Strategic alignment is the only sub-dimension that can be scored on potential in this run; the Strategy Basis (v0.1) is present and defines its bands. What the denominators reflect and what the six remaining sub-dimensions could not establish are in `What we could not establish` below.

[rec:R-A8b-01]

---

## The comparison

| Idea | Potential | Difficulty |
|---|---|---|
| I1 | 30 of 30 | 0 of 0 |
| I2 | 20 of 30 | 0 of 0 |
| I3 | 30 of 30 | 0 of 0 |
| I4 | 20 of 30 | 0 of 0 |
| I5 | 30 of 30 | 0 of 0 |

Strategic alignment is the scored sub-dimension on potential; the denominator is 30 in all five cases because it is the only sub-dimension whose band can be read. Difficulty is unscored in all five; the denominator is 0.

Three ideas score Strong (30 of 30 potential): I1, I3 and I5. Two score Moderate (20 of 30): I2 and I4. The difference is the path from each idea to the key result.

I1, I3 and I5 each directly enable clients to complete standing-order or direct-debit changes in the app without contacting the bank, which is what the product metric measures. The product metric is one stated step from AI-2. Strong requires one step from idea to metric and one from metric to key result, with no assumption in either.

I2 and I4 reach AI-2 but not through the stated product metric. I2's primary mechanism is card subscription payment blocking; the brief's explicit link covers that (every change completed in app is a straight-through service process), but card subscription blocking is not what the product metric measures. I4's primary mechanism is a virtual card vault; the element that moves the product metric is only the H4 transparency component within I4, not the vault itself. In both cases there is one named thing in between the primary mechanism and the stated metric.

---

## I1: Unified Commitment Hub

**Potential: 30 of 30** | **Difficulty: 0 of 0**

Strategic alignment: **Strong, 30.** The hub creates a unified view of standing orders, direct debits and card subscriptions, adding a mechanism to stop any card subscription individually. The H1 component directly enables clients to complete SO/DD changes in the George app without calling the bank -- which is what the product metric measures. The product metric is one stated step from AI-2 (AI First, §2.7): every digital service process completed without a person is what AI-2 counts, and the brief makes this explicit. Both steps hold without assumptions.

Six sub-dimensions unscored: problem-solution fit, market differentiation and innovation opportunity (Banking Constraints absent); regulatory and compliance risk (Compliance Guidelines absent); technical complexity and operational change (Banking Constraints absent). All six carry the same reason: the defining body is absent from this run by decision of 24 August (PD164).

---

## I2: Honest Subscription Block

**Potential: 20 of 30** | **Difficulty: 0 of 0**

Strategic alignment: **Moderate, 20.** I2's primary mechanism is targeted merchant-level card payment blocking (H2) paired with honest UX that states what the bank's action achieves and what it does not (H3). Neither component directly moves the stated product metric, which covers standing-order and direct-debit changes. The path to AI-2 reaches the key result through one named intermediate: the brief explicitly states that every change completed in the app is a service process that did not need a person, and AI-2 counts those. Card subscription blocks completed in-app fall within that scope. Both steps hold -- I2 enables card subscription blocks in the digital channel, and AI-2 captures those completions -- but the primary mechanism bypasses the product metric rather than moving through it.

Same six sub-dimensions unscored as I1; same reason.

---

## I3: Type-honest commitment management

**Potential: 30 of 30** | **Difficulty: 0 of 0**

Strategic alignment: **Strong, 30.** I3 redesigns the George recurring-commitment flows to show each commitment type's capability boundary before the client acts and confirm the outcome afterward. The H4 component makes explicit that standing orders and direct debits can be cancelled or modified outright in the app, which directly enables clients to complete those changes digitally rather than calling the bank. That is one step to the product metric. The product metric is one step from AI-2 per the brief's stated link. Both steps hold without assumptions.

Same six sub-dimensions unscored (I3); same reason as I1.

---

## I4: Subscription Card Vault

**Potential: 20 of 30** | **Difficulty: 0 of 0**

Strategic alignment: **Moderate, 20.** I4's primary innovation is a per-subscription virtual card credential that clients can delete to stop card charges without merchant contact or a full card block (H2). The H4 component adds type-specific capability declarations across all commitment types, showing clients that SO/DD changes can be completed outright in the app -- which would move the product metric. The metric-moving element is the H4 transparency feature within I4, not the primary credential vault mechanism. That is one named thing in between the idea and the metric. Both steps hold: the H4 component within I4 enables SO/DD digital completions (metric), and the metric is one step from AI-2. Moderate rather than Strong because the idea's primary mechanism is the card vault, not the SO/DD transparency component.

Same six sub-dimensions unscored (I4); same reason.

---

## I5: Unified commitment register

**Potential: 30 of 30** | **Difficulty: 0 of 0**

Strategic alignment: **Strong, 30.** I5 builds a data layer covering all three commitment types and delivers two surfaces: a client-facing unified view and a staff-facing case panel. Standing orders and direct debits are first-class items in the register. The client surface enables clients to view and manage SO/DD commitments in one place (H1) with a capability indicator per type stating that SO/DD changes can be completed outright in the app (H4). Both components directly enable clients to complete SO/DD changes digitally without contacting the bank, which is what the product metric measures. The metric is one step from AI-2 per the brief's stated link. Both steps hold without assumptions.

Same six sub-dimensions unscored (I5); same reason as I1.

---

## What we could not establish

**Six of seven sub-dimensions, across all five ideas.** The Banking Constraints body defines the bands for problem-solution fit (weight 35 of potential), market differentiation (20), innovation opportunity (15), technical complexity (35 of difficulty) and operational change (25). The Compliance Guidelines body defines the band for regulatory and compliance risk (40 of difficulty). Both bodies are absent from this run by a stakeholder decision recorded on 13 August and confirmed on 24 August (PD164). Until those bodies land, potential is assessable over a maximum of 30 and difficulty is not assessable at all.

**What a potential score of 30 means in this context.** It means the idea aligns strongly to the one key result the Strategy Basis covers and the brief names. It does not mean the idea is strong across the full potential axis. A score of 20 means it aligns through one named intermediate. Neither number says anything about whether the idea would actually work, what it would cost, or how difficult it would be to build -- those are what the unscored sub-dimensions would have covered.

**The difficulty axis says nothing for any idea in this run.** Six committed runs before this one scored difficulty as 0 of 0. The number is the same here. It is not a finding about difficulty; it is a statement that the run could not assess it.

---

## How this was produced

**Run 2026-07-standing-orders, stage 4.2 idea-scoring.** This invocation scored the five ideas in A8 (R-A8-01), which it did not produce. The brief (A1) was read for the product metric and its stated link to AI-2. The prioritised problems (A4) were read for problem context. The competitive synthesis (A7) was read for market context. The Strategy Basis (v0.1) was read for key results and scoring bands. The Banking Constraints and Compliance Guidelines bodies were not found on disk; their sub-dimensions are unscored throughout.

Strategic alignment was scored against AI-2 (AI First objective, §2.7 of Strategy Basis) using the bands in §4: Strong 30, Moderate 20, Weak 10, None 0. Ideas were assessed on whether they move the stated product metric in one step (Strong), through one named intermediate (Moderate), through an assumption (Weak), or not at all (None). The brief's link from metric to AI-2 is one stated step for all five ideas.

No ranking, no reordering, no selection. The scores inform the decision at G4; the person makes it.

Assembled from one record: **R-A8b-01** (records/4-solutions/A8b-r01-scores.record.md).

