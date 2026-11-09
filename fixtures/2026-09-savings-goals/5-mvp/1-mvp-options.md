---
run_id: 2026-09-savings-goals
artifact_id: A10
ost_role: artifact
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "2..3 options, each a whole way to pilot the solution, never a subset or a phase of another"
    needs: judge
    reach: artifact
  - rule: "every constraint referenced resolves into the Banking Constraints"
    needs: check
produced_by:
  agent: product-owner
  skill: mvp-option-design
sources: [A9, A7]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A10-01]
decision:
  gate: G5a
  by_agent: false
  accepted_by:
    - name: Igor Tadić
      role: Product Lead
  accepted_at: 2026-08-28
  changed_during_refinement: none
  refinements: []
  selection: OPT-A
---

# Discovery | MVP options: automatic set-aside

Three ways to pilot the selected solution. **They are not phases of one path**, they are three different pilot scopes and exactly one gets run. [rec:R-A10-01]

None carries a recommendation marker. The decision is G5a and it belongs to a person.

## OPT-A: Round-ups only, into one named goal

The client names one goal with a target amount. Every card payment rounds up to the nearest fifty crowns and the difference moves into that goal. No other funding rule and no second goal.

**It differs by the narrowest funding rule and the narrowest scope.** It tests whether money the client never decided to move accumulates into something they chose.

## OPT-B: A fixed weekly amount into one named goal

The client names one goal with a target amount and sets a weekly amount. That amount moves every week unless the balance would fall below a floor the client sets. No round-ups.

**It differs by having the opposite funding rule at the same scope.** A weekly amount is a decision made once; a round-up is a decision never made at all.

## OPT-C: Round-ups into a goal the client chooses, with up to three goals

The client can hold up to three named goals and chooses which one the round-ups fund, changing that choice whenever they like. Round-ups are the only funding rule.

**It differs by giving the choice OPT-A withholds.** It tests whether choosing the destination is what makes the saving stick, which is the one thing separating Starling from Air Bank in the market read.

## How to choose between them

The three diverge in two different directions and each answers a different question.

**OPT-A against OPT-B is a question about the funding rule.** Running OPT-A finds out whether invisible accumulation works. Running OPT-B finds out whether a single deliberate decision works. The clients in this run's material described the second as the thing they never do, and the third described the first as the only saving that works for her.

**OPT-A against OPT-C is a question about the destination.** Running OPT-A means the money goes where the bank puts it. Running OPT-C means the client picks, and the pilot learns whether picking matters.

OPT-B and OPT-C do not rule each other out as future steps, but as a pilot they do: one changes the funding rule and the other changes the destination, and a pilot that changes both will not say which worked.

## What we could not establish

**No option states which banking constraint it satisfies.** The `banking-constraints` body does not exist, the stakeholder parked it on 21 August 2026, and the production carries `constraint_basis: none_stated`. Where it would say that an option respects a transfer-frequency limit or a minimum-balance rule, there is nothing.

Whether fifty crowns is the right rounding unit. Air Bank rounds to ten, the UK banks round to one pound. Fifty is a choice made in this document rather than a finding.

How many clients in the segment pay by card often enough for round-ups to accumulate anything. Nobody supplied the number.

## How this was produced

Step 5.1, `mvp-option-design`, agent `product-owner`. Reads the selected solution and the competitive synthesis.

No option is a subset of another and none is a phase of another. Three options, one gets run.

OPT-A is selected. Igor Tadić decided on 28 August 2026 by the rule he set at the start of the run: take the first option. The options carry no score to decide on otherwise, and OPT-A is the narrowest of the three.
