---
name: prioritisation
description: >
  Promote up to three primary and up to five secondary opportunities with the user, and park the rest,
  retained and visible. Trigger phrases: prioritise opportunities, promote opportunities,
  primary opportunities, which opportunities, park opportunities, stage 2 prioritisation.
---
# prioritisation

**Stage 2.4** · Agent `hypothesis-designer` · Pattern `elicitation-dialogue` · Gates **Q2** then **G2**

## Contract

- **Inputs:** `{runs_root}/{run_id}/2-problems/4-framed-opportunities.md` · user direction · `.github/know-how/method/opportunity-framing.md` · `.github/know-how/writing/agent-interaction.md` · `.github/know-how/writing/output-voice.md` · `.github/know-how/writing/documentation-standards.md` · `.github/know-how/method/method-canon.md` *(§4.2 is what this stage is for, §12 choosing what to work on)*
- **Output:** `{runs_root}/{run_id}/2-problems/5-prioritised-opportunities.md`
- **Record:** `{runs_root}/{run_id}/records/2-problems/` — **the output above is assembled from a record and does not stand alone.** Read [`.github/instructions/record-and-output.instructions.md`](../../instructions/record-and-output.instructions.md) before writing either: the fields a gate decides sit on the record, and an output carrying a production field is refused (C107, C108, C109). **The workflow writes the frame of the output and its record; fill each `[[fill: …]]`.** **The envelope around them is not yours, and there is no task to run for it**: what is fixed comes with the frame, the checks read the rest as the workflow computes it, and the workflow writes that into the document when the person approves. On a run started before 1.16.1, `SPOCK: check what is written, then continue`, which you run after every document, fills it first.
- **Exclusions:** does not promote on the user's behalf · does not empty `parked[]` · does not re-tag trust

## Procedure

**1 — Propose an ordering, marked as a proposal, and make it on the sizing.** Make the proposal on the
person's two rankings, `sizing.customers.rank` and `sizing.impact.rank`, with the company factor and the trust
tag as before, and say in `ordering_source` how you weighed them. **Where no opportunity carries a rank on
either, write the sentence below in the document, word for word, and in a Czech run the Czech one under it.**

```
The person could not rank these opportunities by how many customers they reach or by how much they hurt, so
this order rests on the weight of evidence alone.
```

<!-- cs:S2-UNRANKED -->
**In a Czech run:**

```
Příležitosti nešlo seřadit podle toho, kolika klientů se týkají, ani podle toho, jak moc klienty trápí, takže toto pořadí stojí jen na váze důkazů.
```
<!-- /cs:S2-UNRANKED -->

**An opportunity the person could not rank, where others are ranked, is placed among the ranked on the weight of
its evidence, as the ranking question told them it would be; parking it needs a reason of its own, which the body
gives.**

ČS's four factors are what set an opportunity's priority: how many customers are affected and how
often, what it means for the bank's position, its strategic impact, and how important it is to the customer. A3b carries all four with a basis
on each, and **market factors will read `deferred_to_stage_3` on most runs**, which is a real limit on the
ordering and is stated rather than worked around. Trust tag and fit to the brief's outcome still weigh;
they are no longer all there is. A blank list is a worse starting point than a marked draft.

**2 — The user decides.** Promotion is a human act, recorded at G2 — `C14`. Your proposal is not a
decision, and you never record one the user did not make.

> **Your proposal is not a refinement round either.** Steps 1 and 2 happen while the artifact is being
> authored, before anything reaches a gate, so an A4 written once carries `changed_during_refinement: none`
> and `refinements: []`. **A refinement round is a reviewer sending a produced artifact back.** Where your
> proposal differed from what the user chose, say so in the body and in the record's `note` — that difference
> is worth keeping and it is not a round. **Recording it as one misstates the run**, and on a stage gated from
> 14 September 2026 no bound in C40 catches it: the workflow counts rework at its gates, so C40 no longer
> bounds the rounds.

**3 — Place every opportunity in exactly one list.** None lost, none duplicated.

| List | Cardinality | Meaning |
|---|---|---|
| `primary[]` | **1..3** | The run is about these. **At least one is required** |
| `secondary[]` | `0..5` | Promoted, supporting |
| `parked[]` | `0..n` | Not promoted. **Retained and visible, never deleted** |

**Each entry is the id of an A3b opportunity, and nothing else** — `O1`, not the opportunity written out.
The opportunity stays in A3b unchanged: same outcome, same sizing, same trust tag, same risks. A4
does not restate it, and an agent that wrote them out as whole objects failed six checks.

**In the document, write each opportunity as a person reads it: `O1 (H1)`**, the hypothesis its `from` names in
brackets, and `O15 (yours)` for one a person brought (`O15 (vaše)` in a Czech run). The lists above keep the bare
`O1`. On a run started on build 1.16 or later the workflow writes the same form wherever it names an opportunity
itself: the prioritised lists a later stage's documents carry, the solution set's table and the selected solution.

**4 — Write the artifact, then stop.** State what you produced and anything you could not resolve.

> **You do not run the quality gate.** Blueprint §5.3 requires the checker to be independent of the producer — *"a verifier that cannot block is not a control"*, and one that the producer operates is not independent. You may trigger it with `SPOCK: check what is written, then continue`, and triggering it is not running it: you relay what it wrote. **Never report a gate result for your own output.**

## Why parked opportunities stay

They are the cheapest input the next run will have. An opportunity that did not make this run's cut is
already evidenced and already tagged. **`parked[]` is never emptied** — `C29`.

## Gates and obligations

- **Q2** — `C27` cardinalities · `C53` every entry is an A3b opportunity, carried unchanged · plus C1, C2, C33, C34, C35, C115, C116, C117, C118 across the stage
- **G2 has two reviewers judging different things:**

| Reviewer | Governs | Asks |
|---|---|---|
| **Researcher** | the **evidence** | Is each opportunity well formed and correctly evidenced? |
| **Product Manager** | the **scope** | Which opportunities does this run pursue? |

Neither overrules the other — they answer different questions about the same list.

- **Name each supplied file's `research` label in the review message**, `synthetic`, `human` or `not_stated` as
  intake wrote it, so the person can say where one is wrong. A label they correct is a refinement like any other:
  intake writes the corrected value on the item.
- **G2 is review-and-refine, not approve/reject.** Refinement runs back through the skill; a person's own change to the document is recorded with `SPOCK: record that I edited a document` — `C17`
- **At least one primary opportunity.** A run with none has nothing for solutions to address

## Bounds

The cardinalities are the bound: `primary 1..3`, `secondary 0..5`.

## Carry what you could not verify

**Your artifact carries a `could_not_verify` field and you do not write it.** The workflow computes it from the
quality rules bound to your skill, using the same function the check recomputes it with, so a copied list cannot
drift from the one it is compared against. The frame carries it where the workflow wrote one, the checks read it as
computed, and the approval writes it; on a run started before 1.16.1, `SPOCK: check what is written, then continue`
fills it.
[`.github/could-not-verify.yaml`](../../could-not-verify.yaml) is still the readable statement of what
yours holds, and reading it tells you what the person at the gate will see. **Copying it into the front
matter costs more than it saves**: a producer that got one line of it wrong spent
longer finding out than writing the document.

**It is not your assessment of your own output.** It is the list of quality rules bound to you that no
check decides, so the person at the decision gate sees them on the document they are deciding on rather
than on a record they would have to know to go and look for. **C65 recomputes it at the gate** and refuses
an artifact whose list disagrees with the gate model.

**Do not write this list from memory and do not edit the carrier.** It is derived: a rule moving from
*needs a check* to *decided by a check* changes it, and a copy kept by hand in sixteen files goes wrong
silently and in the direction that reads as complete. C72 refuses the carrier when it drifts.

## The field names of what you write

**Your artifact's field set is declared in §6 of the parent and generated into
[`.github/artifact-fields.yaml`](../../artifact-fields.yaml). Use those names and no others.**

**Do not invent a field name that reads reasonably.** The shapes an agent infers are reasonable, and that
is the failure: the first agent-driven hypothesis set wrote `evidence` as a list of objects copying the
upstream record rather than a list of refs, `trust_rationale` where §6 says `rationale`, and `original`
where the rejection schema says `statement`. **Four checks failed and the worst of them reported the
artifact claiming a trust tag the arithmetic did not derive** — which reads as an agent inflating a tag and
was nothing of the kind. With evidence carried as objects nothing matches an observation, so the qualifying
set is empty and everything derives `weak`. The reasoning had been right throughout.

**Every artifact carries the envelope as well as its own set.** Where §6 delegates a set to a body of
know-how, that body is the source. C73 refuses the carrier when it drifts from §6.

**The carrier's entry for your artifact has a `gate:` line. It tells you which gate reviews what you
wrote; it is not a field you write.** Where it names a `G` gate, your artifact carries the decision
record too — under `decision:` on the artifact itself, in §7.5's names. `accepted_by` and `accepted_at`, never
`decided_by` or `decided_at`. **You decide nothing:** `by_agent` is always `false` and you write only the
decision a named human actually made.

**Until that decision exists, you omit the block entirely.** An artifact you have just
produced has not been to its gate, so there is no decision to record — and a stub carrying only the gate
name is a decision record with nobody in it, which **C40 refuses**. Write `decision:` when the decision
has been taken and not one moment earlier.

**A field listed under `value_entries` carries single values, not objects.** Write the id the §6 line
names and stop. Copying the upstream object in there is what failed six checks on the first agent-written
A4 — `primary` filled with whole opportunities where it wanted `O2`.

## What comes next, and who carries it

**Once the opportunity set is approved at G2, stage 3 is Competitive Analysis's** — a different agent, with
different know-how and different permissions. Say so, by that name, and say what it does:

> It maps the market this initiative sits in, writes a card for each competitor it takes a deep dive on, and
> closes with a market summary. **It asks you for no decision.** It starts by explaining its two ways of
> working: from your own list of competitors, or by searching the market. **Your own list is one list** of the
> competitors and trends you want looked at, with a heading and web addresses for each, put in the run's
> `3-competitive-analysis/supplied/` folder or pasted in the chat. It does not read a report or a benchmark as it
> stands: take the competitors and addresses from it into that list.

**Send the hand-off the workflow prints once the stage is accepted**: it names the agent that carries stage 3,
read from the contract, never from what you remember. **Do not restate the stage.** Point at the run's
own front door, which is generated and current, and let the next agent say what it does. **This handoff is
given once the stage is accepted and not before.**
