---
run_id: 2026-09-savings-goals
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
sources: [A8, A8c, A2b]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A8b-01]
---

# Discovery | Solution scores: goal-based saving

**Two solutions carry a strong link to strategy, two moderate and one weak.** One sub-dimension of seven is scored on the potential side and none on the difficulty side. [rec:R-A8b-01]

The axes are never added together. Potential and difficulty answer two different questions and one number from them would answer neither.

## The comparison

| Solution | Potential | Band | Key result | Difficulty |
|---|---|---|---|---|
| **I1** Automatic set-aside to a chosen goal | **30 / 30** | Strong | LVL-2 | unscored / 40 |
| **I2** A goal inside the current account | **30 / 30** | Strong | LVL-2 | unscored / 40 |
| **I3** A target date on a goal | **20 / 30** | Moderate | LVL-2 | unscored / 40 |
| **I5** Showing what is already committed | **20 / 30** | Moderate | SHD-1 | unscored / 40 |
| **I4** Spending from a completed goal | **10 / 30** | Weak | LVL-2 | unscored / 40 |

**What is scored is the strength of the chain, not the size of the movement.** A solution with a target attached does not score higher than one without. The band asks how many named steps sit between the product metric and the key result, and whether any of them rests on an assumption.

**Two solutions tie at thirty and that is a result rather than a tie to break.** They reach share of wallet by different routes, and the band measures how good the connection is.

The difficulty side is held by `CR-C6`. What is known about it is one document earlier and it is an order without a number: I5 lightest, I4 heaviest, I3 between them.

## I1: Automatic set-aside to a chosen goal

**30 / 30, strong.** The product metric is the share of clients who set a goal and make at least three set-asides in ninety days. A client saving automatically towards a goal in their own account holds more of their money here, which is LVL-2 in one step.

Difficulty unscored, denominator 40.

## I2: A goal inside the current account

**30 / 30, strong.** The product metric is the share of current-account clients holding a funded goal. A goal inside the current account is money that would otherwise sit at another bank.

Difficulty unscored, denominator 40. The market read says nothing in the Czech market does this, which is an argument about difficulty that the axis cannot carry today.

## I3: A target date on a goal

**20 / 30, moderate.** The product metric is the share of dated goals that reach their target. The chain runs through one named step: a goal that completes is a goal that got funded, and a funded goal is money held here. Both steps hold and there are two of them.

Difficulty unscored, denominator 40. It carries one escalation trigger the framing did not.

## I4: Spending from a completed goal

**10 / 30, weak.** The product metric is the share of completed goals spent from directly. The path exists and one step rests on an assumption nobody has evidence for: that being able to spend from a goal makes clients fund goals more, rather than empty them sooner.

Difficulty unscored, denominator 40. From the option screens it is also the solution carrying the most regulatory reach.

## I5: Showing what is already committed

**20 / 30, moderate.** The product metric is the share of clients who open the committed-money view more than once a month. A client who returns to look is a client having a regular relevant interaction, which is SHD-1 through one named step.

Difficulty unscored, denominator 40. From the option screens it is the solution carrying the least.

## What we could not establish

**Five of the seven sub-dimensions are parked** and do not appear here even as an empty row: opportunity-solution fit, market differentiation, innovation opportunity, technical complexity and operational change. Igor Tadić parked them on 21 August 2026 because no band exists for them, which is why the denominators are 30 and 40 rather than 100 and 100.

Parked is not the same as unscored. Parked is a fact about the build, stated once; unscored is a fact about this run, stated on the solution it applies to.

A number computed across one covered regulatory area and three uncovered ones would be an answer to a quarter of the question presented as an answer to the whole. Producing nothing is recoverable; producing a confident quarter is not.

## How this was produced

Step 4.3, `idea-scoring`, agent `product-owner`. The potential bands are held by `strategy-basis` and the difficulty bands by `compliance-guidelines`.

No denominator was typed by hand. Both are the sum of the weights in the model.
