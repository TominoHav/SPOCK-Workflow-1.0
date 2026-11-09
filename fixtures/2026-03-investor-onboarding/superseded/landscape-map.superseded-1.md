---
run_id: 2026-03-investor-onboarding
artifact_id: A5
produced_at: 2026-08-12
ost_role: none
status: produced
workflow: competitive-analysis
modified_by: agent
revisions: 0
sources:
  - A1
  - A4
external_sources: []
produced_by:
  agent: competitive-analysis
  skill: landscape-mapping
store: S1
scope: shared
bounds_hit:
  - "egress: approved-search-provider (CA-a) names no destination that resolves this run; web_search reached nothing. This is a capability bound, not the 25-participant or 8-iteration bound in the skill's Bounds table — it was reached before either of those could be approached, at 0 search iterations"
could_not_verify:
    - rule: "authored only from the quarantine bridge's structured extract, never from raw external text"
      needs: judge
      reach: process
topic: "Guided investment onboarding for first-time retail investors"
scope_field: "Czech Republic; retail banking; savings-to-investment products segment; adjacent fintech investment platforms excluded"
participants: []
reused: []
unprofiled: []
---

# Landscape Map — Guided onboarding for first-time investors

**Run:** `2026-03-investor-onboarding` · **Stage:** 3.1 `landscape-mapping` · **Sources read:** `1-brief/initiative-brief.md`,
`2-problems/5-prioritised-opportunities.md`, `store/S1-competitors.md`, `.github/know-how/competitive-analysis-standards.md`

**This is the first run to reach stage 3, and this artifact carries zero participants.** That is the
substantive finding of this run, not a placeholder pending a re-run — the reasons are structural and are
recorded below rather than worked around. `participants[]` is specified `1..n` in
`specifications/PILOT-BUSINESS-LOGIC.md` §6.6; this artifact carries `0`. That gap is stated here in the open
rather than closed by inventing an entry, for the same reason `A1.goals` was left `unknowns: [declined]`
rather than filled from general banking knowledge — no field is inferred, cardinality pressure included.

## 1 — Scope, restated from A1

**`market_scope`:** *Czech Republic; retail banking; savings-to-investment products segment; adjacent
fintech investment platforms excluded.*

**`topic`:** *guided investment onboarding for retail customers who have never purchased an investment
product.*

A1 carries both fields, distinctly. The procedure's step 1 flags this as unsettled under code **CA-k**
("the parent scopes from `topic`; whether `market_scope` is a distinct field is unsettled — bind to
whichever A1 actually carries"). It is not unsettled on this A1: `market_scope` is present and reads as
the market boundary, `topic` as the subject area. This artifact's `scope_field` carries `market_scope`
verbatim; `topic` above carries A1's `topic`. See **Open items**, below — this same code `CA-k` is used
elsewhere in the skill for a different, already-resolved question, and the two should not be conflated.

**No participant falls outside this scope.** With zero participants, that constraint is satisfied
vacuously; it binds the next run that adds any.

Worth surfacing rather than silently inheriting: `market_scope` explicitly **excludes** adjacent fintech
investment platforms — the category (robo-advisors, DIY investing apps) that would ordinarily be the most
plausible adjacent or substitute competition for "moving idle savings into a first fund purchase." That
exclusion is the Product Owner's recorded scope decision on A1, not this artifact's to revisit — it is
named here so a reader of an unusually thin landscape does not mistake a deliberate scope boundary for a
research gap.

## 2 — Store checked first (S1)

`store/S1-competitors.md` was read before any research was attempted, per the skill's step 2. It holds
five participants, all from `2026-01-mortgage-onboarding`:

| `identity_key` | Name | Type | Researched at |
|---|---|---|---|
| `adjacent:broker-networks` | Independent broker networks | adjacent | 2026-08-09 |
| `hypobank.cz` | HypoBank | direct | 2026-08-09 |
| `mbank.cz` | mBank CZ | direct | 2026-08-09 |
| `rb.cz` | Raiffeisen CZ | direct | 2026-08-09 |
| `substitute:long-term-rental` | Long-term rental platforms | substitute | 2026-08-09 |

**None are reused.** Every entry was researched against the `2026-01-mortgage-onboarding` market (mortgage
lending and its substitutes) — a different `market_scope` from this run's savings-to-investment segment.
This is a scope-relevance exclusion, decided before freshness is even considered (all five are within the
180/365-day thresholds and would otherwise be candidates for reuse). Reusing `mBank CZ` or `Raiffeisen CZ`
here under their existing card content would misrepresent mortgage-market research as investment-onboarding
research — the identity persists across runs but the researched offering does not transfer with it.
Whether either bank is also a direct participant in guided investment onboarding is a real, answerable
question; answering it needs fresh research into their investment offering, which stage 3.2 would perform
on a fresh `deep_dive` selection, not something this stage can establish by reusing a card written about a
different product line. `reused: []` is the honest count, not an oversight.

## 3 — Research attempted: the egress finding

**Zero search iterations were run.** `landscape-mapping`'s only allow-listed destination is
`approved-search-provider`, provisional pending a named ČS endpoint (CA-a). Both this skill and the agent
file are explicit that an un-named real endpoint means **the capability reaches nothing**, and that this is
`deny-by-default`'s correct, designed failure — not a gap to route around. Nothing in this repository
resolves `approved-search-provider` to an actual destination.

**On the stakeholder note in the task:** the Product Owner's decision that this run proceeds against the
provisional destination rather than waiting is recorded and understood as a decision to not stall the pilot
exercise on ČS naming a real endpoint — not as a technical grant of reach where none is configured. The
task message says this explicitly, and it matches the skill's own text: what the decision means for what
this agent may do is governed by the egress rule, not by the message carrying the decision. Calling a
general-purpose web-search tool here would reach a real backend that has never been named as
`approved-search-provider` or as the ČS endpoint — that would be improvising a route around a deny-by-default
control, which both the agent file and the skill say explicitly not to do. So this run performed **no
fetch calls of any kind** — not one, including as a test. Raw fetched text is exactly what the quarantine
bridge exists to keep away from this authoring step, and an attempted-then-discarded fetch would still have
put untrusted page text in front of the step that decides what enters the shared store.

**No participant is named from general knowledge, either.** This market plausibly has real, identifiable
participants (Czech banks running comparable onboarding flows into investment funds; robo-advisors, though
this run's scope excludes them). Naming any of them without a fetched, bridged, dated source would be
exactly the inference `A1.goals` already refused once in this run — asserting market knowledge with no
evidence behind it, in an artifact whose whole purpose is evidenced reuse.

## 4 — Participants

**Empty: `direct: 0` · `adjacent: 0` · `substitute: 0`.** Nothing was reused (§2) and nothing was
researched (§3), so there is nothing to type, key, or select for a deep dive. Every per-participant
quality rule in the skill (typed, keyed, deep-dive reason recorded) is vacuously satisfied by an empty set
— which is a true statement about this run's inputs and constraints, not a claim that this market has no
participants.

## 5 — Substitute requirement

Standards §2 requires at least one substitute or an explicit finding of its absence. **This is not stated
as a market finding** — this artifact makes no claim that first-time investors in this segment lack an
alternative to a guided fund purchase (a spreadsheet, a branch conversation, or simply not investing are
all plausible substitutes a real search would very likely surface). The explicit finding is narrower and
process-shaped: **substitute presence could not be established this run**, because the capability to
research it was not available (§3), not because none was looked for and none found. Conflating the two
would misrepresent a capability gap as a market conclusion.

## 6 — Deep-dive selections

None. `deep_dive` and its `reason` are per-participant fields; with zero participants there is nothing to
select or decline, and nothing to record beyond that fact. `unprofiled[]` is also empty — and empty for a
different reason than it would be if research had run and found nothing worth carrying: nothing was
*attempted*, so nothing failed partway. Both are true and are not the same statement.

## `standards_basis` — omitted, deliberately

The task brief for this run states the Competitive Analysis Standards are "drafted (v0.1)" and instructs
marking values `indicative` where the Standards leave them unfixed. **The actual file on disk,
`.github/know-how/competitive-analysis-standards.md`, is v0.4, dated 12 August 2026, and its own §6
records "Assessment: met"** — freshness thresholds and confidence bands are both closed (N3-a, N3-d), and
§2 (what a sound landscape requires) is complete and checkable as written. Nothing this artifact needed
from the Standards was unavailable, so `standards_basis` is omitted rather than written as `indicative` —
per the reduction-markers rule in §6 of the business logic doc, omission is itself the (accurate) claim
that the relevant know-how body was available. See **Open items** below: this is a live discrepancy between
what this run was told and what is actually on disk, not a judgement call this artifact is making quietly.

## What this artifact does not do

This artifact does not write A6 or A7. It does not run Q3 or report a result for it — Q3 is checked
independently, and this stage has no human decision gate behind it (PD27), which makes the independent
gate the only check this output gets. It does not edit `store/S1-competitors.md`, which is generated from
committed runs' A5/A6 and never hand-edited. It does not touch `RUN-STATE.md`. It does not read or write
any other run's directory, and does not read this run's `notes/`. It recommends nothing — that is stage
4's job, built on whatever this stage and the next two produce.

## Open items — for whoever reads this next

- **The `participants[] 1..n` cardinality is not met, and this artifact does not resolve that tension —
  it names it.** The business logic specifies at least one participant; this run's constraints (zero
  in-scope store entries, zero egress) produce zero. This is presented as a fact for Q3 and, if it
  survives Q3, for a human, to weigh — not pre-decided by this agent inventing a participant to clear the
  count. There is a direct precedent for this stance already in this run: `A1.goals` was left short of its
  own required minimum rather than inferred, and the Product Owner accepted the brief with that gap open
  and visible.
- **Code `CA-k` is used for two different things in `landscape-mapping/SKILL.md`, and only one of them is
  live.** Step 1 cites `CA-k` for whether `market_scope` is a distinct field from `topic`. Further down the
  same file, the "reductions removed" note describes `CA-k` as the **already-resolved** question of whether
  the parent register names the array `competitors[]`/`key` or `participants[]`/`identity_key` — closed 10
  August, in favour of `participants[]`/`identity_key`, which §6.6 of the business logic doc confirms.
  Either this is one code carrying two unrelated open questions (one resolved, one not), or step 1's
  parenthetical is a stale reference to a question that no longer needs asking on this A1 (which does carry
  a distinct `market_scope`). Worth a fix at the source rather than a second agent re-deriving the same
  read independently.
- **This run's task brief and the live `.github/agents/competitive-analysis.agent.md` both currently
  describe the Competitive Analysis Standards as "drafted (v0.1)."** The file is v0.4 and materially more
  resolved (confidence bands closed, freshness thresholds closed, coverage assessed "met"). Nothing in this
  artifact depended on the gap the v0.1 framing implies, but the framing itself is stale and worth
  correcting where it is written, not just noted here.
- **`artifact-fields.yaml`'s generated field list for A5 includes `direct`, `adjacent` and `substitute` as
  if they were field names**, alongside `participants` and `type`. They are not — §6.6 of
  `specifications/PILOT-BUSINESS-LOGIC.md` defines one `participants[]` list with a per-entry `type` field taking
  those three values; there is no separate `direct[]`/`adjacent[]`/`substitute[]` array. The generator
  appears to have lifted the enum's bolded-code values out of the `type` field's own description as though
  they were sibling fields. This artifact follows §6.6, the primary source, not the generated list where
  the two disagree — flagged here because a producer that trusted the generated list alone would have
  built three arrays that do not exist in the artifact's actual contract.
