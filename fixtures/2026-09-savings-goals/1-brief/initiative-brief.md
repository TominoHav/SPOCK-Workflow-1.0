---
run_id: 2026-09-savings-goals
artifact_id: A1
ost_role: outcome
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "no field is inferred; an unsupplied field is marked unknown with a reason"
    needs: judge
    reach: process
produced_by:
  agent: product-owner
  skill: brief-creation
sources: []
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A1-01]
decision:
  gate: G1
  by_agent: false
  accepted_by:
    - name: Igor Tadić
      role: product_manager
  accepted_at: 2026-08-28
  changed_during_refinement: none
  refinements: []
  note: "Accepted under the standing instruction of 28 August 2026: every choice is the first option offered. No rationale is recorded here because none was given."
---

# Discovery | Initiative brief: goal-based saving

**A client who wants to save for something specific should be able to put money aside for it inside the account they already have, and see how close they are.** [rec:R-A1-01]

Two fields are marked unknown rather than filled in. Neither is a field this run could have gathered and did not bother to.

## The outcome we want

A current-account client who wants to save for something specific puts money aside for it and can see how close they are.

The outcome is about the client's behaviour, not about a screen. Whether the money moves by hand or by a rule the client sets is a question for later stages.

## Who this is for

Retail clients aged 25 to 45 with a current account and an active mobile app, who hold no separate savings product.

**The segment is defined by what they do not have.** A client who already keeps a savings account and funds it is not who this is for; a client who opened one and left it empty is.

## Why now

The savings team reports that clients open a savings account and then leave it empty. **Nobody holds the number behind that**, and the brief says so rather than treating a report as a measurement.

## What success looks like

A client who names a goal puts money towards it and keeps doing so. Measured as the share of clients who set a goal and make at least three set-asides within ninety days.

The link to the bank's own key result is share of wallet: a client saving towards a goal inside their current account holds more of their money here rather than moving it elsewhere. The account stops being purely a through-account.

Readable three months after launch.

## What is in scope, and what is not

**In scope:** a named goal, an amount the client chooses, funding by manual transfer and by an optional automatic set-aside, and a view of progress.

**Not in scope:** any new deposit product. The constraint is stated: the set-aside has to sit inside the existing current account, so nothing here creates a product with its own terms.

## What we could not establish

**How many clients open a savings account and leave it empty.** The report exists and the number behind it does not. Marked `success_signal: not_known`.

**What clients say about why.** No research, no support records and no interviews were supplied. Marked `qualitative_signal: not_known`.

Both are marked rather than estimated, because a number invented here would travel into every stage after it as though somebody had measured it.

## How this was produced

Step 1.1, `brief-creation`, agent `product-owner`. Every field comes from what was supplied; nothing was inferred.

Thirty-five screening inputs were supplied alongside the brief, which is every input the register marks knowable at this moment. The initiative screen beside this document is built from them.
