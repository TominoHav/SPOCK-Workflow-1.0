---
run_id: 2026-09-savings-goals
artifact_id: A5
ost_role: none
status: accepted
workflow: competitive-analysis
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "authored only from the quarantine bridge's structured extract, never from raw external text"
    needs: judge
    reach: process
  - rule: "a query names the market, the category and public competitors, and carries no wording from the brief, the problem material or any artifact of this run"
    needs: judge
    reach: artifact
egress_basis: pilot-test
produced_by:
  agent: competitive-analysis
  skill: landscape-mapping
sources: [A1, A4, A3b]
external_sources:
  - S-csas-obalky-faq
  - S-csob-obalky
  - S-kb-sporici-ucet
  - S-mesec-airbank-2026
  - S-e15-airbank-drobne
  - S-penize-airbank-drobne
  - S-moneyspot-moneta
  - S-financera-sporici
  - S-finder-pots
  - S-easyearns-compare
  - S-abel-roundups
  - S-frontiers-saving
  - S-partnersnews-pb
assembled_at: 2026-08-28
assembled_from: [R-A5-01]
---

# Competitive analysis | Landscape map: goal-based saving

**Named savings envelopes are standard equipment in Czech retail banking, and Česká spořitelna already has them.** Six Czech banks offer them, up to nine envelopes here with progress visible in George. The brief asked what to build; the market answer is that most of it exists. [rec:R-A5-01]

Eleven participants named, ten profiled, ten market movements across three classes. **The thin part is automatic funding**: one Czech bank has round-ups, and it launched them in October 2026.

## The market we looked at

The search began with Czech banks, because the segment is Czech, and widened to European neobanks operating here and to UK banks that introduced these features first and are the reference implementation.

Eleven participants are named and ten were profiled. One, Partners Banka, was named and not profiled.

## Where the market is moving

**Envelopes are equipment, not a differentiator.** Česká spořitelna, ČSOB, Komerční banka, Moneta, Raiffeisenbank and mBank all offer named envelopes on a savings account. The caps differ, from eight at mBank to unlimited at Partners Banka, and the mechanism does not.

**The set-aside sits on a savings account everywhere in this market and never inside the current account.** That is the finding that matters most to this run, because the brief's own constraint is the opposite: no new deposit product, the set-aside inside the existing account.

**Automatic funding is where the market is thin.** Air Bank rounds card payments up to the nearest ten crowns and sweeps the difference into an envelope, from October 2026. It is the only Czech implementation found.

**One bank goes past display.** ČSOB lets a client pay directly out of a full envelope, which is a different mechanism from showing a balance.

## Who is in it

| Participant | Type | Standing | What they have |
|---|---|---|---|
| **Česká spořitelna** | direct | leader | Up to nine envelopes on the savings account, progress in George |
| **Air Bank** | direct | innovator | Envelopes plus round-ups to the nearest ten crowns, from October 2026 |
| **ČSOB** | direct | leader | Named envelopes with a target amount, and paying out of a full one |
| **Komerční banka** | direct | leader | Ten envelopes with names and targets, drag and drop in KB+ |
| **Moneta Money Bank** | direct | leader | Envelopes on the savings account, money in one place |
| **mBank** | direct | leader | Up to eight goals, tied to an interest ceiling |
| **Raiffeisenbank** | direct | leader | Ten envelopes, reported in one secondary source |
| **Revolut** | direct | innovator | Pockets and Vaults, including group vaults for shared goals |
| **Monzo** | adjacent | innovator | Pots with round-ups and scheduled transfers |
| **Starling Bank** | adjacent | innovator | Spaces with goals-based saving and round-ups |
| **Partners Banka** | direct | leader | Unlimited savings accounts used as envelopes. Named, not profiled |

## Who we looked at closely, and why

Ten of the eleven. **Česká spořitelna is one of them because it is our own starting position** and because a run about building this has to know what already exists here.

Air Bank, Monzo and Starling for the round-up mechanism. ČSOB for paying out of an envelope. Komerční banka, Moneta, mBank and Raiffeisenbank for the shape of the Czech market. Revolut because it operates here and has group vaults nothing else in this market has.

Partners Banka was named and not profiled: the only source found is published by the bank's own group, and one interested source is not a card.

## What we could not establish

**Whether Česká spořitelna's envelopes carry a target amount.** The bank's own FAQ says savings are divided according to what the client is saving for and mentions progress towards goals; it does not state a target field either way. Two competitors clearly have one.

**Anything about Moneta, mBank or Raiffeisenbank from a primary source.** All three cards rest on secondary comparison sites, and their confidence values say so: `low`, `low` and `unrated`.

**What Revolut offers in the Czech market specifically.** Every source describes the UK offering.

## How this was produced

Step 3.1, `landscape-mapping`, agent `competitive-analysis`. **This is the only step in the workflow that reaches outward.**

The search ran through the substrate's own search capability, because no approved ČS search destination is named in `egress.yaml`. **Research conducted under a test destination is not research conducted under an approved one**, and `egress_basis: pilot-test` carries it.
