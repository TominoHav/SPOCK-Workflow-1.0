---
run_id: 2026-08-account-switching
artifact_id: A9
ost_role: solution
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "3..7 solutions, each a distinct combination of opportunities, never a rephrasing"
    needs: judge
    reach: artifact
produced_by:
  agent: product-owner
  skill: ideation
sources: [A8, A8b, A4, A7]
external_sources: []
assembled_at: 2026-08-27
assembled_from: [A9-r01]
decision:
  gate: G4
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: product_manager
  accepted_at: 2026-08-27
  changed_during_refinement: none
  refinements: []
  selection: I1
---

# Old-account visibility through open banking

The product manager selected I1 from a set of five solutions. The selection was made against a five-way tie: all five scored 30 of 30 on strategic alignment, the only dimension this run could score, and the difficulty axis went entirely unmeasured. No reasoning was given for the choice within the tie.

[rec:A9-r01]

## What was selected

I1 connects to the customer's old bank account via PSD2 AISP consent and reads the active mandates, direct debits and standing orders still pointing there. The customer sees this list inside the Ceska sporitelna app throughout the switch window and can confirm when it reaches zero. When the list clears, the app confirms the old account holds no active mandates and the customer has a basis for closing it.

## What it solves

I1 addresses two of the run's committed opportunities.

**O1 - Nobody can say what is still attached to the old account.** A switching customer cannot confirm what is still running from the old account. I1 reads the list from the source - the old bank's account information API under PSD2 AISP consent - rather than asking the customer to reconstruct it from memory or a year of statements. The customer does not learn what they missed when a payment fails. They see the list before any payment fails.

**O6 - The old account stays open because nobody can prove it is empty.** A customer keeps the old account open and pays for two because they cannot confirm it is empty. I1 gives them that confirmation. When the live list shows nothing active, the customer has a basis for closing the account rather than an assumption they cannot test.

## Why this one

All five solutions scored 30 of 30 on strategic alignment, the one sub-dimension this run could score. Six of the seven sub-dimensions across the potential and difficulty axes had no defined bands. The Banking Constraints body, which would have defined opportunity-solution fit, market differentiation, innovation opportunity, technical complexity and operational change, is absent from this run. The Compliance Guidelines body, which would have defined regulatory and compliance risk, is also absent. The difficulty axis produced 0 of 0. The whole difficulty axis was unscored.

The product manager was shown the five solutions and the scoring, told the five were tied and that difficulty could not be read, and selected I1. No reasoning was given.

The evidence this run holds about I1 is set out below. It is drawn from A7 and A8 and does not represent the product manager's reasoning.

TR-T3 in the competitive synthesis records that no participant in the market set has deployed a product that reads a switching customer's old-account payment data via open banking APIs. The technology is available under current open banking rules. No participant has a confirmed roadmap response to PSD3 and PSR, which will extend the open banking obligation when they come into force.

ST2 in A7 explains why the gap has persisted structurally. Card-on-file payments are excluded from every switching scheme by payment architecture, not by bank choice. No participant has deployed external tooling to address this.

P6 in A7 documents the adjacent tooling. Galileo Payment Switch and Visa Enhanced Subscription Manager are commercially available and confirmed undeployed by every participant in the market set. P6 concerns the migration of card credentials; I1 reads the list of what is still active. Both sit in the same confirmed gap.

P4 in A7 documents the alternative customers use today. The self-managed switch keeps both accounts running simultaneously. Which?, MoneySavingExpert and GoCompare all confirm that maintaining this visibility is the primary reason customers choose the manual approach over a guided one. The cost is two to four hours of manual work and up to 90 days of dual-account management.

## What it does not address

I1 solves O1 and O6. The run's three primary opportunities are O1, O3 and O4.

**O3 - The request goes quiet the moment it is sent** is a primary opportunity I1 does not address. O3 concerns a switching customer's inability to see where the request stands during the switching window. I1 gives visibility of what is still attached to the old account; it does not give visibility of the transfer process itself.

**O4 - Complete means the form was worked, and the customer is still half moved** is a primary opportunity I1 does not address. O4 concerns the bank's completion count, which records the form processed rather than the money moved. I1 addresses the information gap that keeps old mandates running; it does not redefine what the bank counts as complete.

**O2 - The salary belongs to an employer, and nobody says when it will move** is a secondary opportunity that I1 also does not address. O2 concerns the switching customer's inability to know when their first salary will land in the new account. I1's mechanism reads active mandates from the old account; it has no view of payroll timing.

The difficulty axis was not scored for any solution in this set. Nothing here is a claim about I1's cost, regulatory exposure, technical complexity or operational burden relative to the other four.

## What this carries into the next stage

The next stage inherits several unmeasured things alongside the selected approach.

**Unmeasured difficulty.** Cost, regulatory exposure, technical complexity and operational change are unknown for I1 and for every other solution in this set. The Banking Constraints and Compliance Guidelines bodies are both absent from this run. The next stage designs with no constraint baseline on any of the five solutions.

**The open banking dependency.** I1 depends on Czech banks' PSD2 implementations exposing active payment mandate data through their account information APIs, as distinct from transaction history alone. The solution set (A8) names this as unconfirmed. A feed that returns transaction history can show where salary went; it cannot show what is still authorised at the old bank. Whether Czech AISP implementations expose mandate data is unsettled. If they do not, the central mechanism of I1 does not operate.

**The card-on-file structural limit.** ST2 confirms that card-on-file merchant credentials are outside what any PSD2 AISP feed can reach. I1's list will cover direct debits and standing orders. It will not cover card-linked subscriptions. This is a structural exclusion under payment scheme architecture. The next stage inherits it.

**Two primary opportunities the selection leaves open.** O3 and O4 are primary opportunities this run committed to. I1 addresses neither. They do not disappear from the scope; the next stage must work with that constraint in hand.

## What we could not establish

**Whether I1 is preferable to the other four.** The scoring produced a five-way tie and no reasoning was given. There is no basis in this record for saying I1 is better than I2, I3, I4 or I5. The tie is recorded; it was not resolved by the scoring.

**Whether Czech banks' PSD2 implementations expose active mandate data.** Both I1 and I5 depend on this. No source in this run settles it.

**The relative difficulty of the five solutions.** Regulatory and compliance risk, technical complexity and operational change are unscored for every solution. A solution that ties on potential may differ substantially on cost. Nothing in this run measures that.

## How this was produced

This document records the selection made at gate G4 in run `2026-08-account-switching`, stage 4, produced under the `ideation` skill by the `product-owner` agent. It is artifact A9, assembled from one record, A9-r01, held at `fixtures/2026-08-account-switching/records/4-solutions/A9-r01-selected.record.md`.

Sources were A8 (the solution set), A8b (the solution scores), A4 (the prioritised opportunities) and A7 (the competitive synthesis). No external sources were consulted at this step.

The Compliance Guidelines and Banking Constraints bodies are both absent from this run. Six of seven scoring sub-dimensions had no defined bands as a result. The selection was made against a five-way tie on the one scorable dimension, and no quality rule could distinguish the five solutions on anything beyond strategic alignment.

The `could_not_verify` field carries one rule from the `ideation` skill that no check can decide: whether three to seven solutions are each a distinct combination of opportunities and never a rephrasing. That rule applies to the solution set from which this selection is drawn and is carried here because this artifact is produced under the same skill.

Gate Q4 ran independently before this selection was recorded. Gate G4 was the human decision gate at which the selection was made on 2026-08-27.
