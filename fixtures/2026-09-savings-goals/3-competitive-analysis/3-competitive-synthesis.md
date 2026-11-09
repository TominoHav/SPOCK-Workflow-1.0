---
run_id: 2026-09-savings-goals
artifact_id: A7
ost_role: none
status: accepted
workflow: competitive-analysis
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "recommends no action; A7 carries the run id and is never written to S1 (run-scoped contract + empty capability list, not C24)"
    needs: judge
    reach: artifact
standards_basis: current
egress_basis: pilot-test
produced_by:
  agent: competitive-analysis
  skill: synthesis
sources: [A6, A4, A3b]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A7-01]
---

# Competitive analysis | Synthesis: goal-based saving

**Named savings parts are universal and Česká spořitelna already has them.** All ten participants offer them, so the question is not whether to build envelopes but what to do around them. [rec:R-A7-01]

**The market does not answer two of the five opportunities**, and the constraint this initiative was given rules out the shape every Czech participant has chosen.

## Evidence table

**[universal] ST1 The bank lets a client divide one savings balance into named parts, at 10 of 10.** Bears on O1 and O3. Not one participant lacks it, which is why this run's question is not whether to build envelopes.

**[universal] ST2 The division is managed in the mobile app rather than only in internet banking, at 10 of 10.** Bears on O1 and O2. No participant keeps it web-only.

**[common] ST3 Dividing the money does not change what it earns, at 6 of 10.** Bears on O2. Every Czech implementation states it; the UK ones run interest through a savings product instead.

**[common] ST4 The client sets a target amount on each part, at 6 of 10.** Bears on O1 and O4. ČSOB says the target is only indicative; Raiffeisenbank adds a target date, which nobody else does.

**[emerging] ST5 Money is swept in automatically, without the client deciding each time, at 4 of 10.** Bears on O1. **This is the standard that speaks to the primary opportunity**, and Česká spořitelna is not one of the four.

**[emerging] ST6 The client can spend from a named part without unwinding it first, at 3 of 10.** Bears on O3. ČSOB pays from a full envelope, Monzo pays bills from a Pot, Starling links a virtual card to a Space. Česká spořitelna states the opposite: money must go back first.

**[common] P1 The set-aside sits on a savings account in every Czech implementation and inside the everyday account at every UK one.** Bears on O2 and O3. It is the pattern this initiative's own constraint runs against.

**[common] P2 Named parts are equipment rather than a differentiator.** Bears on O2. Every participant has them, so what separates the market is what happens around them.

**[emerging] P3 Where automatic sweeping exists, the two Czech implementations differ in whether the client picks the destination.** Bears on O1. Starling sweeps to a Space the client chose; Air Bank sweeps into an envelope it creates.

**[emerging] P4 The banks that publish usage figures are the ones with automatic sweeping.** Bears on O4. Raiffeisenbank publishes both; mBank publishes take-up of its goals.

**[emerging] TR1 Round-ups arrived in the Czech market in the last two years and are held by two banks of seven profiled.** Bears on O1. Raiffeisenbank first, Air Bank from October 2026.

**[emerging] TR2 Published rates on comparison sites run ahead of the banks' own pages.** Bears on O4. Checked in one case and wrong by a full percentage point, which is a caution about the rest of this page.

## Where the market does not answer

**O3, telling committed money from spare money.** Every implementation found is about money moved aside. Nothing found is about money already spoken for while it stays where it is, which is what the client actually described.

**O5, whether a saver wants progress shown or available.** Two banks publish how many clients use these features. None publishes anything about how the saving is watched afterwards.

## Verdict

### Diagnosis

Česká spořitelna has envelopes on the savings account, up to nine, with progress in George. **What it does not have is any way to fund one without the client deciding each time**, and that decision is exactly what the clients in this run's material described as the obstacle.

Two Czech banks have removed it. Raiffeisenbank has passed 100 million crowns swept through round-ups and more than 100,000 goals set; Air Bank launched round-ups in October 2026.

### Parity

Nine envelopes against ten at three competitors and eight at mBank. Progress display, money moving both ways, management in the app: all present here and all present everywhere.

**One thing is behind.** Our own FAQ does not state that an envelope carries a target amount, and six of ten participants clearly do.

### The opening

**Automatic funding, and the destination the client picks.** Four of ten participants sweep money in automatically, and only Starling lets the client choose which part it lands in. Air Bank sweeps into an envelope it creates.

That combination is unoccupied in the Czech market: sweep automatically, into an envelope the client named for something they want.

### Risk

**The constraint this initiative was given rules out what every Czech participant does.** The brief says no new deposit product and the set-aside inside the existing current account. All seven Czech implementations put it on a savings account, and both UK ones that put it in the everyday account do so with a savings product underneath.

**Nobody publishes whether any of this works.** Take-up is published by two banks. Effect on how much clients save is published by none, so a pilot here would be measuring something the market has not measured either.

## What we could not establish

Whether Česká spořitelna's envelopes carry a target amount. Our own page does not say, and it is the one parity question that matters.

What Revolut offers in the Czech market. It is the one non-Czech participant operating here and every source describes its UK offering.

Whether the rate figures on this page are right for anyone but Monzo. **The one card checked against a primary source disagreed with the comparison sites by a full percentage point**, and the same sites supply rates on other cards.

## How this was produced

Step 3.3, `synthesis`, agent `competitive-analysis`. Reads the ten cards and the prioritised opportunities, and writes nothing outward.

Every standard, pattern, trend and absence names which participants stand behind it and which opportunity it speaks to. **Two opportunities have an absence rather than a standard**, which is a finding about the market and not a gap in the research.
