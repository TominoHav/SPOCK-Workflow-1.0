---
name: mvp-expansion
description: >
  Expand the one option the run records as chosen to analyst-ready depth, with its strategic touchpoints named and its
  compliance touchpoints addressed in functionality. Touches only the selected option; never re-ranks the
  alternatives. Trigger phrases: expand the mvp, stage 5 expansion, flesh out the option, expanded mvp.
---
# mvp-expansion

**Stage 5.2** · Agent `product-manager` · Pattern `single-shot` · Gates **Q5** then **G5b**

## Contract

- **Inputs:** `{runs_root}/{run_id}/5-mvp/1-mvp-options.md` *(the option the run records as chosen)* · `{runs_root}/{run_id}/4-solutions/2-selected-solution.md` · `{runs_root}/{run_id}/2-problems/4-framed-opportunities.md` *(the success metrics of the opportunities this pilots against, so the MVP's measures are not invented here)* · `.github/know-how/product/strategy-basis.md` · `.github/know-how/compliance/compliance-guidelines.md` · `.github/know-how/compliance/area-compliance.md` · `.github/know-how/compliance/area-gdpr.md` · `.github/know-how/compliance/area-legal.md` · `.github/know-how/compliance/area-ict-security.md` · `.github/know-how/writing/agent-interaction.md` · `.github/know-how/writing/output-voice.md` · `.github/know-how/writing/documentation-standards.md` · `.github/know-how/method/method-canon.md` *(§4.5 is what this stage is for)*
- **Output:** `{runs_root}/{run_id}/5-mvp/2-expanded-mvp.md`
- **Record:** `{runs_root}/{run_id}/records/5-mvp/A11-r01-expanded-mvp.record.md` — **the output above is assembled from a record and does not stand alone.** Read [`.github/instructions/record-and-output.instructions.md`](../../instructions/record-and-output.instructions.md) before writing either: the fields a gate decides sit on the record, and an output carrying a production field is refused (C107, C108, C109). **The workflow writes the frame of the output and its record; fill each `[[fill: …]]`.** **The envelope around them is not yours, and there is no task to run for it**: what is fixed comes with the frame, the checks read the rest as the workflow computes it, and the workflow writes that into the document when the person approves. On a run started before 1.16.1, `SPOCK: check what is written, then continue`, which you run after every document, fills it first.
- **The record is named `A11-r01-expanded-mvp.record.md`**, or with the next free number where an earlier record for A11 is
  there. A file in `records/5-mvp/` whose name does not end in `.record.md` is not a record, and nothing reads
  it: where A11 has no record, `SPOCK: check what is written, then continue` stops, names the file and the name to
  use, and
  writes nothing for A11. You hold no rename: write the record again under its
  name, and tell the person the misnamed file stays until they take it back with `SPOCK: take something back`.
- **Exclusions:** expands only the selected option · leaves the non-selected options unaltered · never compares, re-ranks or comments on the alternatives · holds no tool and reaches nothing outward

## Procedure

**This binding converges — it commits to one option and adds depth. It is a separate skill from option
design on purpose: a single skill spanning the choice would read its own prior output across a decision it did not
make, carrying the incentive to expand whichever option it had written most persuasively.**

> **Where the choice lives, since 10 September 2026.** It is a `choice` decision on stage 5, recorded by the
> person while the stage is still **running**, and it is not a gate: a gate is recorded on a stage in review,
> which stage 5 could never reach, because review needs the stage produced, produced needs this document, and
> this document needs the choice. **If no choice is recorded, this skill has nothing to expand and must not
> guess.** Say so, name `SPOCK: record a decision I made` and its boxes, and stop. Runs committed before that
> date carry an older decision block on the options document and are read in it.

**1 — Read the selected option and only expand that one.** The option the run records as chosen — a `choice` decision on stage 5, taken while the stage was running, from
`A10`; the selected solution `A9` behind it. Expand exactly that option (**C15**) — no other.

> **Where to find the selection, and what to do when it is not there.** It is the `choice` decision on stage 5
> in the run record, which the person records with `SPOCK: record a decision I made` while the stage is
> running, and it is not there before that. **If you cannot find it, the run is waiting on a person rather
> than on you**: say so, name that task and its boxes, and stop. Do not write a decision block yourself. A
> decision block that appears before the gate is an incomplete one and `C40` and `C169` refuse it on sight, so
> guessing here costs a round rather than saving one. **This stalled stage 5 in two
> runs**, because step 1 read as though the artifact you are about to write is what carries the decision.

> **`What has to be handled` is three labelled blocks and the open one goes last.** Addressed, narrowed
> out, open — as run-in bold labels inside the existing section, **never as new headings**, because the six
> section names are fixed. On one run this section carried the best content in the document as
> one two-hundred-word block, so the person at the gate had to parse the whole of it to find the single item
> that needed their decision. **Put the item needing a decision last and label it**, and the section becomes
> readable without losing a word.
>
> **A number the pilot's own result depends on is named as an ask.** That run called its holdback *small*
> and never sized it, and the split is what decides whether the pilot can answer its own question. Where the
> number is not known, say who holds it, the way every other unanswered number in this workflow is written.

**2 — Leave the alternatives untouched.** The non-selected options remain in `A10` **unaltered**.
Expansion writes `A11`; it does not rewrite `A10`. No comparison to, re-ranking of, or commentary on the
options you did not expand. **This rests on the skill's data scope — you may read the alternatives but not
rewrite them — not on a gate. No check diffs A10's options before and after; `C29` retains staled and
parked material and does not reach A10's options at all.**

**3 — Take it to the depth the analyst needs.** A full `description`, and `analyst_input` — what stage 6
(the PRD) will consume.

**4 — Address touchpoints in functionality, not as notes.** Every compliance touchpoint you identify is
designed into the described functionality (**C7**), not merely listed. `strategic_touchpoints[]` name where
the expanded option serves — or strains — the strategy.

**4a — The opening's counts are read off this document, never remembered.** Count the touchpoints you
carried into functionality and the ones you named as lapsing, in the sections below, and state those two
numbers. The total is the selected solution's own screen,
`{runs_root}/{run_id}/4-solutions/parts/{selected}.compliance.md`. An opening said one
touchpoint lapses where its own section named two. **Every touchpoint you inherit is written down here by its identifier**, the carried ones where they are designed in and the changed ones where you say what changed: a count is checked by counting identifiers, so one that is nowhere in this document reads as dropped.

**4b — Carry what stage 6 will have to state.** The PRD's success measures now name a **horizon**, an
**owner** and a **kill criterion** (PRD Template §2.3), which is ČS's own shape for a solution. **You do
not author them** — but where the expansion makes one of them obvious, say so, because the alternative is
stage 6 inventing a date and an owner nobody agreed. Where it does not, leave it; a stated gap is the
correct output.

**5 — Hold traceability all the way back.** The expansion resolves to `A9` and through it to `A4` (**C12**),
so what stage 6 receives is still answerable to the opportunities the run started from.

**6 — Write the artifact, then stop.** State what you produced.

> **You do not run the quality gate, and you do not accept your own output.** G5b is a person's decision.
> Never report a gate result for your own output. You may trigger the gate with `SPOCK: check what is
> written, then continue`, and triggering it is not running it: you relay what it wrote.

## The reductions that have ended, and what returned with them

**The Strategy Basis exists, so the strategic half of this reduction has ended.** Every
`strategic_touchpoints[]` entry now **names a key result from its §2** and says whether the expanded option
serves or strains it. **`basis: indicative_unverified_strategy` is no longer correct** — an entry still
carrying it is claiming a reduction it is not taking, which is the same defect the PRD skill records
against `structure_basis: non_standard`.

**You still do not re-score.** The alignment assessment happened at 4.1 and this is not a second one. A
touchpoint names where the narrowed option meets a key result; it carries no band and no number.

**The Compliance Guidelines exist, so the compliance half of this reduction has ended.** The convergence discipline is unchanged — one option only, alternatives untouched, no re-ranking,
traceability to A9/A4, touchpoints addressed in functionality — because that is method and holds whatever
the body says. **What returns is the shaping.** A touchpoint marked indicative, or naming the body as
absent, is now claiming a reduction it is not taking.

**The set comes from the accepted solution's own compliance section, not from you.** **`A8c` is
retired** and the screen it carried is now a section on `A8`, one per solution; the selected
solution's section is yours. **Inherit it; do not re-derive it.** Each entry names its `area`, its
`sub_domain` and the `trigger` that put it in play, all three by their card ids — **not free text**. Across
seven runs the touchpoints were written as prose and no two runs were comparable, and naming the sub-domain
is what makes coverage countable (`C130`).

**Name every unfilled area in `unexamined_areas[]`.** An area that examined nothing must say so in the
document a person outside this workflow reads, not only on a screen they will never open.

**Every in-play touchpoint carried from the screen is bound to one of three things in the expanded MVP**, per §8.1
of [`compliance/compliance-guidelines.md`](../../know-how/compliance/compliance-guidelines.md):
functionality that addresses it, an accepted open item with a named owner and the point it will be decided,
or a stated reason the narrowing means it no longer applies. **A touchpoint carrying none of the three has
been listed and not addressed**, and that half is settled without a reader.

**`compliance_touchpoints[]` on A11 carries a `touchpoint` and a `basis`** (§6.13), unlike A8's plain
values. The `touchpoint` names the identifier and what the MVP does that engages it — `TP-` for Compliance,
`DP-` for GDPR, `LG-` for Legal, `IT-` for ICT and security. **The `basis` cites the body and its version,
the area and the sub-domain**, in the form `compliance-guidelines@0.1 · A1/S13`. Free prose in the basis is
why no two of the eight committed runs are comparable.

## Gates and obligations

- **Q5** — `C15` exactly the selected option is expanded · `C7` every compliance touchpoint addressed in functionality · `C12` traceability resolves to A9 and A4 · `C6` run identifier present. Plus the universal checks (`C29` retains every artifact the run has produced — a property of retention, not a before/after comparison of A10's options)
- **G5b**: the Product Manager accepts the expansion before the PRD is built on it, **with the plain `SPOCK: approve what is in front of me`**, because the choice is already on the record. You do not decide or record it
- **The sharpest data scope in the role.** The alternatives are visible to you but not expandable; that scope line is what makes `C15` enforceable rather than aspirational. The alternatives staying unaltered is a discipline of that scope, not a gate — no check diffs A10 before and after

## Bounds

| Bound | Value | On reaching it |
|---|---|---|
| Options expanded | **exactly 1** | The one the run records as chosen. Expanding a second is re-opening a closed decision |
| Effort | `single-shot`, `effort: medium` | One pass; reaching the step bound is recorded in `bounds_hit[]` |

## Edges

| Situation | Do |
|---|---|
| No option is recorded as the run records as chosen | Do not expand. There is nothing to converge on until a person has chosen |
| Tempted to note why the others were weaker | Do not. The decision is made; commentary on the rejected options is out of scope — a discipline of this skill's data scope, not a gate |
| The expansion outgrows the selected option | You are redesigning, not expanding. Stop, and flag that the option needs re-selection at the choice |
| Amending after G5b | Send the stage back first with `SPOCK: send a stage back to be redone`, because an accepted document stays as it was approved. A person's own change is then recorded with `SPOCK: record that I edited a document`, and leave `revisions` as it is: rework is counted by the workflow at its gates. A changed expansion marks the PRD and everything downstream **stale** |

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
A4 — `primary` filled with whole hypotheses where it wanted `H2`.
