---
run_id: 2026-09-savings-goals
artifact_id: A8
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
sources: [A1, A4, A3b, A7]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A8-01]
---

# Discovery | Solution set: goal-based saving

Five solutions. **None of them is an envelope**, because the bank already has envelopes and the synthesis says every profiled participant does. [rec:R-A8-01]

Each is a different combination of the five prioritised opportunities. Two answer things the market does not answer at all.

## I1: An automatic set-aside the client points at a goal they named

### What it is

The client names a goal and an amount, then switches on a rule that moves money towards it without deciding each time. The rule can be a round-up on card payments, a fixed weekly amount, or both.

### What it does

Bears on O1 and O5. This is the standard four of ten participants hold and we do not: money swept in without a decision. It also answers the client who saves only where she does not have to look, which is what O5 records.

### How it works

Round-ups compute at card authorisation and sweep to the goal the client chose. The fixed amount runs on a schedule. Both move money between the client's own accounts and neither creates a product.

### Who it is for

Retail clients aged 25 to 45 with a current account and an active app, who hold no funded savings product.

### Why this bank

The bank already has the envelopes and already has the transaction stream the round-up computes on. Nobody else can sweep from this account.

Compliance touchpoints carried from the accepted screen: A1.S1, A1.S13, A2.G1, A2.G4.
## I2: A goal that lives in the current account rather than beside it

### What it is

A named goal with a target amount, held inside the current account, showing the client what is set aside and what is left as spare.

### What it does

Bears on O2 and O3. It is the one shape absent from the whole market: every Czech participant puts the set-aside on a savings account and every UK one has a savings product underneath.

### How it works

The set-aside is a reservation against the current-account balance rather than a transfer to another account. The money never leaves and the available balance drops by what is reserved.

### Who it is for

Retail clients who keep most of their money in one current account and hold no savings product.

### Why this bank

It is the brief's own constraint made into a product, and the constraint exists because a second account is what the clients in this run's material refused.

Compliance touchpoints carried from the accepted screen: A1.S1, A1.S2, A1.S13, A2.G1.
## I3: A target date on a goal, not just a target amount

### What it is

The client sets what they are saving for, how much, and by when. The bank shows whether they are on track and what the weekly amount would have to be.

### What it does

Bears on O1 and O4. Raiffeisenbank is the only participant found that carries a date. A deadline is what turns a thought into a plan, and it is also what stops a goal sitting at one deposit forever.

### How it works

The weekly amount is arithmetic on the target, the date and what is already saved. Nothing is inferred about the client and no decision is made about them.

### Who it is for

Retail clients who already know what they are saving for and have not started.

### Why this bank

The bank holds the balance and the history the on-track calculation needs, and the goal is set by the client rather than assumed.

Compliance touchpoints carried from the accepted screen: A1.S1, A1.S2, A2.G1, A2.G4.
## I4: Spending straight out of a goal when it is reached

### What it is

When a goal reaches its target the client can pay from it directly, without moving the money back first.

### What it does

Bears on O3 and O4. Three of ten participants allow it, and Česká spořitelna states the opposite outright. A goal you can spend from is a goal that ends, rather than one that receives a deposit and nothing after.

### How it works

The goal becomes a payment source for a single transaction. Nothing about how payments work changes; the source is different.

### Who it is for

Retail clients saving towards a specific purchase rather than a general reserve.

### Why this bank

The reservation and the payment rail are both the bank's. Nobody outside it can pay from a balance held here.

Compliance touchpoints carried from the accepted screen: A1.S1, A1.S8, A1.S13, A2.G1.
## I5: Showing what is already committed, without moving it

### What it is

The balance is shown split into what is already spoken for and what is genuinely spare, based on the client's own recurring outgoings.

### What it does

Bears on O1 and O3, and the synthesis records the second as an absence: no participant found addresses money already committed while it stays where it is. Seeing what is genuinely spare is also where the decision to save could happen.

### How it works

The committed part is computed from the client's standing orders, direct debits and recurring card payments over the next period. Nothing moves and no rule runs.

### Who it is for

Retail clients who hold one balance and cannot tell committed money from spare money.

### Why this bank

The bank sees every outgoing from this account. A third party seeing only part of it would compute the wrong number.

Compliance touchpoints carried from the accepted screen: A1.S1, A1.S13, A2.G1, A2.G6.

## What we could not establish

Whether I2 is buildable at all. **A reservation inside a current account is the one shape nothing in the market has**, and the reason may be that it is hard rather than that nobody thought of it. Stage 5 would find out; stage 4 cannot.

Whether I5's committed-money calculation is accurate enough to show a client. It rests on predicting recurring outgoings, and this run holds no data on how predictable they are.

## How this was produced

Step 4.1, `ideation`, agent `product-owner`. Five ideas conceived as a set, then each written on its own, then joined here without summarising.

**The market read shaped what was not proposed.** Envelopes, progress display and management in the app are all universal, so none of them is a solution here. What the bank lacks is automatic funding, a target date, spending from a goal, and any answer to committed money.
