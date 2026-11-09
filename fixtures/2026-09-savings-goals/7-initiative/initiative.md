---
run_id: 2026-09-savings-goals
artifact_id: A14
ost_role: artifact
status: accepted
workflow: discovery
modified_by: human
revisions: 0
could_not_verify:
  - rule: "written in Czech, free of implementation detail; every fact drawn from the agreed PRD or marked an assumption"
    needs: judge
    reach: artifact
produced_by:
  agent: business-analyst
  skill: initiative-authoring
sources: [A13, A11, A4, A1]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A14-01]
decision:
  gate: G7
  by_agent: false
  accepted_by:
    - name: Igor Tadić
      role: Product Lead
  accepted_at: 2026-08-28
  changed_during_refinement: none
  refinements: []
---

# [SPOCK-202] - Automatic set-aside into a goal the client names

**A client who wants to save has no moment at which the decision gets made, so the money stays in the current account.**
This initiative removes the decision: the client names a goal and money moves towards it on its own, from rounding up
card payments.

The key `SPOCK-202` was supplied by the requester as a fixture (`id_basis: fixture`). No agent generated it and it does
not exist in Jira. **The material behind this run is real**: stage 3 reached live sources and the market findings are
the market's. The fixture basis describes where the key came from and not what the research is worth.

## Insight

**What we learned.** Three clients described the same absence in three different ways. One opened a savings account
during a mortgage quote, deposited once and never returned; she named the obstacle as never deciding rather than not
wanting to. Another holds everything in one balance and says money he has already committed does not feel committed.
A third saves by round-ups at another bank and says it works precisely because she does not do it.

**Who it affects.** Retail clients aged 25 to 45 with a current account and an active app, who hold no funded savings
product.

**Where it came from.** The prioritised opportunities of this run and the interviews behind them. The savings team
also reports that a large share of savings accounts opened in the last two years hold under a thousand crowns, and
states in the same note that nobody pulled the number.

**The market answers only half of it.** All ten banks studied offer named savings envelopes, including this one. Only
four move money in without the client deciding, and we are not among them.

## Business Goal

**The strategy link.** LVL-2, share of wallet. Money accumulating in a goal here is money that would otherwise sit at
another bank.

The link carries `indicative_unverified_strategy`. Bands for scoring it exist, but nobody outside this run has
confirmed this pilot's connection to the key result.

**When the initiative is finished.** When the pilot shows how many clients still have the rule switched on after
ninety days, and the result is read against the kill criterion.

## Outcome

**The change in client behaviour.** A client who wants to put something aside **does so without deciding each time**,
rather than waiting for a moment that does not come.

It describes behaviour, not a solution. Which rule moves the money belongs in the scope below.

## Success Metrics

### Behavioural

- Share of the pilot group who set a goal and switch the rule on. Kill criterion: under 5%.
- Share of those who still have the rule on after ninety days. Kill criterion: under 50%.
- Median amount accumulated per client at ninety days. Kill criterion: under 500 CZK.

**The second metric decides.** The first says the offer landed; only the second says the habit held.

No baseline was supplied for the second or third.

### Business

**This run supplied no business metric.** What the pilot measures is money accumulating in a goal, and how that turns
into balances, share of wallet or cost was not calculated for this pilot by anyone.

The nearest available link is the money that would otherwise have gone elsewhere. This run does not know that figure.

### Customer Perception

**This run supplied no perception metric.** One of the opportunities says the client does not watch her automatic
saving and that the surprise is the pleasant part. Whether that shows up in satisfaction was not measured here.

## Initiative Scope

### In Scope

- One named goal with a target amount
- Rounding card payments up to the nearest fifty crowns and moving the difference to the goal
- Skipping any round-up that would take the balance below zero
- A display of progress towards the goal
- Adding and withdrawing money by hand, independently of the rule
- Switching the rule off or deleting the goal at any time, with the money returned
- A defined pilot group: retail, aged 25 to 45, a current account, an active app, no funded savings product

### Out of Scope

- A fixed weekly amount. Considered and excluded when the pilot scope was chosen
- Choosing which goal the round-ups fund. Considered and excluded at the same point
- A goal inside the current account. It scored the same as the selected solution; the money still sits on a savings account
- Paying out of a completed goal
- Any change to how a payment works. The round-up is a separate transfer after settlement

## High-Level Acceptance Criteria

- Only card payments that are not already a multiple of fifty round up; ATM withdrawals do not
- Every transfer can be matched to the payment that caused it
- A round-up that would take the balance below zero is skipped and not retried
- After the rule is switched off, no further transfer occurs
- After a goal is deleted, the money returns in full to the current account
- For every active rule there is a record of what the client agreed to
- The three new screens pass an EAA accessibility check before launch
- The new processing purpose is described in the app and in the privacy notice before launch

## Dependencies

| Dependency | Who holds it | When |
|---|---|---|
| A decision on the goal name as free text | Data protection officer | before launch |
| A decision on whether an impact assessment is needed | Data protection officer | before launch |
| Approved wording for the rule screen and the progress display | Client communications | before launch |
| The size of the pilot group | Data | before launch |
| Card-payment frequency in the pilot group | Data | before development starts |

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| A client types sensitive information into a goal name | Health or belief data nobody asked for ends up in account records | The officer decides before launch. Constraining the field is a requirement; accepting the risk is an acceptance, and they are two different builds |
| Fifty crowns is the wrong unit | Too little accumulates for the client to care | The kill criterion on the median at 500 CZK. Air Bank rounds to ten and the UK banks to one pound |
| Clients switch the rule off in the first weeks | The pilot loses the group it measures and answers nothing | The second metric measures exactly this and has a kill criterion at 50% |
| The market closes the gap meanwhile | Two banks already move money in on their own and others may add it | Not mitigable by a pilot. It is the reason the pilot runs now rather than in a year |
| The feature is mistaken for the savings envelopes the bank already has | The initiative reads as something already delivered | All ten banks studied have envelopes. What this initiative is about is how money gets into one |

## Open Questions

- What to do about the goal name as free text. It is both a risk and a dependency, and the officer decides.
- How many clients are in the pilot group and how often they pay by card. Without the second figure nothing can be estimated about how much accumulates.
- Which business metric and which perception metric attach to this pilot. This run supplied neither.

## Links

- [PRD, agreed](../6-prd/2-prd-agreed.md)
- [Expanded MVP](../5-mvp/2-expanded-mvp.md)
- [MVP options](../5-mvp/1-mvp-options.md)
- [Selected solution](../4-solutions/3-selected-solution.md)
- [Solution scores](../4-solutions/2-solution-scores.md)
- [Option screens](../4-solutions/1b-option-screens.md)
- [Prioritised opportunities](../2-problems/5-prioritised-opportunities.md)
- [Competitive synthesis](../3-competitive-analysis/3-competitive-synthesis.md)
