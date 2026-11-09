---
run_id: 2026-09-savings-goals
artifact_id: A3b
ost_role: opportunity
status: accepted
workflow: problems
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "the opportunity outcome states a change in behaviour and never a thing to build"
    needs: judge
    reach: artifact
produced_by:
  agent: hypothesis-designer
  skill: opportunity-framing
sources: [A3, A1]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A3b-01]
---

# Problems | Framed opportunities

Five opportunities from five hypotheses. **Two carry `strong` and three carry `weak`**, and the tag came from the evidence rather than from how the sentence reads. [rec:R-A3b-01]

Not one of them carries a market size. That question belongs to the competitive analysis stage, which runs after this stage's decision gate and produces exactly that material.

## What the material says

**Two clients argued against the bank's existing answer.** A savings account is the product meant to help, and both described it as a cost rather than a help. That opportunity has two independent origins behind it.

**One opportunity cuts against the others.** A client saving automatically does not watch the balance and likes being surprised by it. Carried rather than dropped, because it argues against a progress display the other four would suggest.

## Where it came from

Eleven observations from four origins, reduced to five hypotheses and framed here. Nine observations are first-hand; two come from a note that carries no number and says so.

## O1: No moment at which the client decides to save

**As it is today.** Saving requires the client to decide, then act, then repeat. Nothing in the account prompts either. One client opened a savings account during a mortgage quote, deposited once and never returned; she named the obstacle as never deciding rather than not wanting to. Another saves successfully only at a bank where the deciding was taken out of her hands.

**The outcome wanted.** A client who wants to save puts money aside without having to decide each time, and keeps doing so.

**Who for.** Retail clients aged 25 to 45 with a current account and an active mobile app, who hold no funded savings product.

**Trust `strong`.** Saving is built as a separate product with its own account, so every deposit is a decision plus a transfer. Stated by the product manager at framing. No root cause analysis against the systems was run, so it is carried as an assumption.

**How many clients.** Not established for this opportunity. Nobody measures how many clients this affects. The savings team reports a pattern and says in the same note that nobody pulled the number.

## O2: The second account is itself the reason not to

**As it is today.** The bank's answer to saving is a savings account. One client described that as another account, another statement and money moving back and forth. Another keeps salary, mortgage and daily banking here and saves at a different bank, where the saving needs no second account of its own.

**The outcome wanted.** A client saves without taking on a second account, and the saving sits where their money already is.

**Who for.** Retail clients with a current account here who hold no savings product, or hold one they do not fund.

**Trust `strong`.** The bank has no way to hold money aside inside a current account, so a second account is the only mechanism available. Stated by the product manager at framing and carried as an assumption.

**How many clients.** Not established. The number of clients who hold a current account here and save elsewhere is not measured, and the brief marks the signal unknown.

## O3: Committed money and spare money look the same

**As it is today.** The client sees one number. Part of it is already committed to rent, to bills, to things he has decided; none of that is visible in the number. He described what would change it as labelling rather than locking.

**The outcome wanted.** A client looking at their balance can tell what is already spoken for without moving it anywhere.

**Who for.** Retail clients who hold most of their money in one current account.

**Trust `weak`.** Not established. Nobody has said why the balance carries no structure, and inventing a cause here would be worse than leaving it open.

**How many clients.** Not established, and this opportunity has one origin behind it, so the count question is not the first gap.

## O4: An account opened at a prompt gets one deposit

**As it is today.** The bank opens savings accounts alongside other products. One client's was opened during a mortgage quote and holds 800 CZK. The savings team reports the pattern is visible in product reporting and that nobody has queried it.

**The outcome wanted.** A client opens a savings arrangement at a moment they chose, and funds it more than once.

**Who for.** Retail clients who opened a savings account in the last two years and hold under 1,000 CZK in it.

**Trust `weak`.** Not established. Whether the prompting causes the emptiness or merely accompanies it is exactly what the unpulled number would help decide.

**How many clients.** Not established, and it is the one opportunity where a number exists to be pulled. The savings team's own note says nobody pulled it.

## O5: Automatic saving works by not being watched

**As it is today.** The client checks her automated saving every few months and describes finding more than expected as the pleasant part. She does not know the balance and does not want to.

**The outcome wanted.** A client saving automatically can find the balance when they want it without being shown it constantly.

**Who for.** Retail clients who use or would use an automatic set-aside.

**Trust `weak`.** Not established.

**How many clients.** Not established. One origin, and no count anywhere in the material.

## What we could not establish

**No opportunity carries a client count.** Nobody measures how many clients this affects, and the one place a number exists is the savings team's reporting, which the note says nobody has queried.

**Two opportunities carry no root cause at all.** For O3, O4 and O5 nobody has said why, and an invented cause would travel into every stage after this one as though somebody had established it.

Whether O1 and O3 are the same opportunity. One is about starting to save and the other about seeing what is already committed; they are kept apart because one client raised each and neither raised the other.

## How this was produced

Step 2.3, `opportunity-framing`, agent `hypothesis-designer`. Reads the hypotheses and the brief.

**No opportunity names a thing to build.** Each outcome states a change in what the client does, and the alternatives field is deliberately empty on all five: stage 4 is the step that produces solutions, and one written here would anchor the reader at the gate.
