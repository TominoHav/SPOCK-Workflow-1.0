---
name: prd
description: >
  Author the PRD from the expanded MVP against the PRD Template, validate strategic alignment a second
  time, and leave the agreement block present and empty for a person to sign. Never writes the agreement
  mark. Trigger phrases: write the prd, stage 6, author the prd, product requirements, prd draft.
---
# prd

**Stage 6.1** · Agent `business-analyst` · Pattern `synthesis` · Gates **Q6** then **G6**, and G6 is recorded on the agreed PRD, not on the draft this step writes

## Contract

- **Inputs:** `{runs_root}/{run_id}/5-mvp/2-expanded-mvp.md` · `{runs_root}/{run_id}/1-brief/initiative-brief.md` · `{runs_root}/{run_id}/2-problems/5-prioritised-opportunities.md` · `{runs_root}/{run_id}/2-problems/4-framed-opportunities.md` *(the outcome and the success metrics, carried forward rather than re-derived)* · `.github/know-how/product/strategy-basis.md` · `.github/know-how/compliance/compliance-guidelines.md` · `.github/know-how/compliance/area-compliance.md` · `.github/know-how/compliance/area-gdpr.md` · `.github/know-how/compliance/area-legal.md` · `.github/know-how/compliance/area-ict-security.md` · `.github/know-how/product/prd-template.md` · `.github/know-how/writing/agent-interaction.md` · `.github/know-how/writing/output-voice.md` · `.github/know-how/writing/documentation-standards.md` · `.github/know-how/method/method-canon.md` *(§4.6 is what this stage is for)*
- **Output:** `{runs_root}/{run_id}/6-prd/1-prd-draft.md`. **The agreed PRD, `{runs_root}/{run_id}/6-prd/2-prd-agreed.md`, is written by the workflow from the draft when the person marks it agreed**, and you never write it
- **Record:** `{runs_root}/{run_id}/records/6-prd/` — **the output above is assembled from a record and does not stand alone.** Read [`.github/instructions/record-and-output.instructions.md`](../../instructions/record-and-output.instructions.md) before writing either: the fields a gate decides sit on the record, and an output carrying a production field is refused (C107, C108, C109). **The workflow writes the frame of the output and its record; fill each `[[fill: …]]`.** **The envelope around them is not yours, and there is no task to run for it**: what is fixed comes with the frame, the checks read the rest as the workflow computes it, and the workflow writes that into the document when the person approves. On a run started before 1.16.1, `SPOCK: check what is written, then continue`, which you run after every document, fills it first.
- **Exclusions:** never writes into the agreement block · never writes the agreed PRD or its record · reaches nothing outward (no tool) · a PRD without a completed agreement block is not A13

## Procedure

**Author the draft (6.1), then refine it with the Product Manager (6.2). You write the draft; a person agrees it, and the workflow writes the agreed PRD from it.**

**1 — Author A12 against the PRD Template.** Every template section is present, or declared **not
applicable with a reason** — never an untouched placeholder. Hold the Compliance Guidelines in context so
the PRD is compliant by construction, not corrected after.

**1b — The Overview describes the thing being specified, in words transferred rather than re-authored.**
The selected solution's own description exists verbatim in `A9` one stage earlier; carry it. **An agreed
PRD used one solution's name thirteen times and never once explained it**, and a PRD that
names a solution it does not describe cannot be built from alone.

**1c — A success measure carries a threshold, or an owner and a moment.** *An improvement a person reviewing
the data would call material* is neither, and it is the line a delivery team is judged against. Where the
threshold cannot be set yet, **name who sets it, by when, and what they need in order to**. Split the measure
into what is already decided and what is not, rather than writing one sentence that sounds decided.

**1d — `Users` describes the segment even where it declines to divide it.** Refusing to sub-segment is a
decision and is often right. **Refusing to describe is not the same decision.** What is known about the
population, what they do today, what they try first, what stops them, and who cannot be reached — all of it
traceable to material already in the run.

**2 — Validate strategic alignment, the second pass.** At stage 4 alignment was an assessment used to
choose a direction; here it is a confirmation that the narrowed MVP still serves the strategy — the last
point that can be corrected. The `alignment_validation` statement is **mandatory in A12** (**C31**) and
**names the Strategy Basis objectives it was checked against**.

**3 — Address every compliance touchpoint carried from A11 in the PRD, not merely listed** (**C7**).
Designing the control into the requirement is the job; a bare list is not addressing it.

**3a — The inherited total is the expanded MVP's, carried word for word, and you never recount it.** State
the number the expanded MVP states, name every touchpoint whose status this PRD changes, and say why. Never
write *all* over a number smaller than the one you inherited. **Every touchpoint you inherit is written down here by its identifier**, the carried ones where they are designed in and the changed ones where you say what changed: a count is checked by counting identifiers, so one that is nowhere in this document reads as dropped.

**4 — Trace every requirement back.** Each resolves to the Expanded MVP (`A11`), and through it to the
Selected Solution and the Prioritised Opportunities. **No opportunity appears that `A4` did not carry.**

**5 — Leave the agreement block present and empty.** No name, no date, and no placeholder that could be
read as either. You never write here — the mark is a person's, at G6.

**5b — Say nothing in the draft about which version it is, beyond the title.** Mark the title one way only: end it
with (draft), or (návrh) on a run in Czech, and call the document a draft nowhere else in the title, because the mark
takes that marker off to title the agreed PRD. Write no sentence about the agreement block or about the draft being a
draft, and give the agreement no section of its own, in either language. The agreed PRD is this draft word for word,
so any such sentence or section would be carried into it and contradict it.

> **Worked examples, §2.4 of the PRD Template.** Three pairs: a success measure that cannot be applied by
> anybody and reads as though it can, an Overview that names a solution thirteen times without describing
> it, and a `Users` section that declines to describe the people it declines to split. **Read all three
> before you write, and the line under each saying what the second version does.**

**6 — Write A12, then stop and hand to review. Do not write A13.** State what you produced and anything
unresolved, and in the review ask **name the person's two tasks in order**: `SPOCK: mark the PRD agreed`
first, with its one box, and then, once the agreed PRD has passed its checks,
`SPOCK: approve what is in front of me`, with its four boxes. The workflow prints each step in its turn: the mark in the stop while the draft waits on
it, and the approval once the agreed PRD has passed its checks. End your turn.

**7 — Refine the draft, then wait for the mark.** Every change the Product Manager asks for is made on the
draft, in its document and its record, and never on the agreed PRD. **You do not write the agreed PRD.** When
the person marks the draft agreed, the workflow writes it from the draft word for word, with their name and the
date, because anything retyped can differ from what they agreed. While the mark is owed, every turn starts by
reading the run record, whatever the person wrote, as the shared rules say. Once it carries the mark, run
`SPOCK: check what is written, then continue`, and stop with the PRD stage's last approval as that task prints it,
between *Message to send* and *End of message*: it names `SPOCK: approve what is in front of me` and its four boxes, never
*waiting on your decision* alone. Send that block whole and unchanged, every line in its order, with your own words
only before it or after it. **If the draft has to change after it is agreed**, change the draft and ask
the person to mark it agreed again: the agreed PRD is written afresh from the draft as it now stands, and the
checks refuse an agreed PRD that no longer matches its draft. That holds after Q6 has failed too: `SPOCK: mark the
PRD agreed` is taken on a stage whose gate failed, and the next `SPOCK: check what is written, then continue` runs
Q6 again. **Before the person is asked for the mark**, that task also runs stage 6's gate without recording it and
lists under A12 what it finds in the draft, including the checks that compare the draft with other documents,
such as the chain from A11 (`C131`). The person is not asked while one is listed: change the draft first.

> **You do not run the quality gate, and you never sign the PRD.** Only the person's mark makes the draft an
> agreed PRD, and stage 7 checks that the agreed PRD carries it before starting. Never write into the agreement
> block, and never report a gate result for your own output. You may trigger the gate with `SPOCK: check what is
> written, then continue`, and triggering it is not running it: you relay what it wrote.

## Two loops, not one

| Loop | Answers to | Bound | Reaches a person? |
|---|---|---|---|
| **Q6 remediation** | the quality gate's shape check | **3 cycles** (`max_q_remediation_cycles`), or sooner where one check still fails after two changes or a task refuses twice for the same reason (shared rules, *Two tries at the same thing*) | **On reaching the bound**: the shape failures go to a person |
| **G6 refine** | the Product Manager's review | **5 cycles** (`max_refine_cycles`) | Yes |

Declaring one bound for both would let a run grind through five human reviews of a document that failed
its shape check three times. The remediation loop settles the shape before a person is asked to read it.

> **Pattern note.** `synthesis` covers the authoring pass (6.1) — typed inputs from each upstream
> step. The refine loop (6.2) is a multi-turn conversation, the shape the catalogue registers as
> `elicitation-dialogue`. Whether one skill may declare two patterns is unsettled, so 6.2 runs
> without a declared checklist today. Recorded, not assumed settled.

## The section set is closed, and C67 counts against it

**Author against [the PRD Template](../../know-how/product/prd-template.md), at the version the template's own
header declares — not at a version restated here.** Eight sections, and the artifact carries every one
with `structure_basis: prd_template@<that version>`.

> **A version stamped here goes stale**, and nothing in the build compares a stamped version against the
> body it names, so a stale stamp passes silently while the older rules it points at fail Q6 on C67.
> **A version written in two places ages in one of them**, so it is written in the template only and
> the producer reads it there.

`overview` · `problem` · `users` · `success_measures` · `requirements` · `non_functional` ·
`out_of_scope` · `dependencies`

**Write each section under its id or either of its names, and the workflow writes the heading.**
The workflow writes every section heading in the language the run declared, from the table in §2
of the PRD Template, so you never choose between its columns and never have to type a name right.
The frame carries each heading, and one you write by its id or its other name is written as the template's when
the person approves, which the checks read until then; on a run started before 1.16.1 `SPOCK: check what is
written, then continue` writes it. **A section it
cannot place is refused**, naming what is missing and all eight headings in order, and nothing is written until
every section is placed. A requirement's own heading and a section of your own beside the eight are yours and are
left as you wrote them; the closing pair's two names are written in the run's language as well.
**Never infer the language** from the material, the topic, or the language of the conversation; the workflow reads it
off `A1`. `C67` reads the headings off the page on every PRD whose headings the workflow has written.

**Two states and no third.** A section is `present`, or `not_applicable` **with a reason**. C67 refuses a
reason-less `not_applicable`, and the refusal is the point: a missing section looks missing and gets
fixed, and one declared not applicable with no reason **looks decided**, which nobody re-opens. The reason
names the missing input, never the difficulty (§2.2).

**`success_measures` names a horizon, an owner and a kill criterion** (§2.3), or says which of the three
the run could not supply. The kill criterion is the one most often missing, and a team that has not said
what failure looks like reads any result as partial success.

**A requirement carries an `id` and a `traces_to[]` that resolves. Its statement is prose: written once in
the body under its own `### R1 — short title` heading, and never in the record (§4).** Independent,
valuable, estimable, testable, traceable (§3). Two of the source checklist's properties do not apply here and §3
says why. **Refuse the words in §3.1** — *should*, *fast*, *user-friendly*, *as needed*, *etc.* Where a
number is not known, write that it is not known rather than a vague adjective standing in for it.

> **`statement:` in the record fails C67, and so does an `id` with no heading in the body.** A
> requirement's statement written twice in one file, word for word, with nothing reading the record's copy,
> lets the two halves age apart with no reader to notice the drift. C67 holds both directions: the words cannot be duplicated and cannot go missing.

## What the landed bodies now require, and the one reduction still real

**The Compliance Guidelines exist, so the compliance half of this reduction has ended.** The authoring method is unchanged — the section set, the mandatory alignment statement, compliance
addressed inside the requirement, traceability, the empty agreement block. **What returns is the shaping**,
and a touchpoint still marked indicative or naming the body as absent is claiming a reduction it is not
taking, exactly as `structure_basis: non_standard` would be.

**Every touchpoint carried from A11 is addressed inside a requirement, and the requirement is named** — C7
checks it is addressed rather than listed. §8.1 of
[`compliance/compliance-guidelines.md`](../../know-how/compliance/compliance-guidelines.md) allows three
resolutions and no fourth: a requirement that addresses it, an accepted open item with a named owner and
the point it will be decided, or a stated reason the scope narrowed past it. **You inherit the set from
A11 and do not re-derive it** (§8.3), and each entry keeps its `area`, `sub_domain` and `trigger` — the
card's ids, not prose. Adding one requires naming the trigger that fired it. **Dropping one goes in
`dropped_touchpoints[]` with a written reason and the person who decided it**, because a silent
disappearance between two documents is the defect the chain exists to catch and `C131` refuses it.

**Nothing here fakes an agreement or a validated alignment.**

> **The PRD Template half of this reduction has ended**, and **so has the Strategy Basis
> half.** `structure_basis: non_standard` was correct for as long as no template existed, and
> `alignment_validation` marked *indicative against an unverified strategy* was correct for as long as no
> basis existed. **Neither is correct now**, and a run still writing either is claiming a reduction it is
> not taking.

**What `alignment_validation` carries now.** It names the **key results** from the Strategy Basis §2 that
the narrowed MVP was checked against, cites `strategy-basis` and its version as the `basis`, and states
whether the chain the solution was banded on at 4.1 survived the narrowing. **If a step in that chain broke,
that is the finding** — this is the last point in the run where it can be corrected, and a validation that
records the break is doing its job rather than failing.

## Gates and obligations

- **Q6** — `C13` the agreement block is non-empty and dated *(passes only once a person has signed — A12 leaves it empty by design; C13 is what makes A13 an agreement)* · `C40` the agreed PRD carries exactly the draft's content · `C7` every compliance touchpoint addressed · `C31` the alignment validation statement is present · `C12` every requirement traces to the expanded MVP (A11). Plus the universal checks
- **G6** — the Product Manager approves the agreed PRD, after marking the draft agreed with `SPOCK: mark the PRD agreed`, which records their name and the date. `C14` refuses an agreement block an agent wrote, and `C130` refuses a compliance touchpoint that resolves to nothing. You neither write nor record the agreement
- **Q6 cannot judge whether alignment is *sound* or a touchpoint is *well* addressed.** It checks the statement is present and the block is signed, not that the content is right. That is the human's call at G6, and the eval case is a judged rubric, not a control

## Bounds

| Bound | Value | On reaching it |
|---|---|---|
| Q6 remediation cycles | **3**, or sooner where one check still fails after two changes or a task refuses twice for the same reason (shared rules, *Two tries at the same thing*) | Stop remediating; return the shape failures to a person |
| G6 refine cycles | **5** | Escalate to the Product Manager; do not loop silently |
| Effort | `synthesis`, `effort: high` — the run's largest synthesis, six inputs into one document | Reaching a bound is recorded in `bounds_hit[]` |

## Edges

| Situation | Do |
|---|---|
| A11 is not accepted at G5b | Do not author. There is no agreed MVP to write a PRD from |
| A required template section has no basis in the run | Mark it **not applicable with a reason**. Do not invent content, and do not leave a blank placeholder |
| A requirement traces to no A11 element | Drop it or mark it an assumption. A requirement with no lineage is one nobody agreed to |
| Tempted to write the agreement mark to "unblock" | Never. Return the draft and say the Product Manager marks it agreed with `SPOCK: mark the PRD agreed` |
| The agreed PRD has to change after the stage is accepted | The stage is sent back with `SPOCK: send a stage back to be redone`. Change the draft, and leave `revisions` as it is: rework is counted by the workflow at its gates. A change the person makes to the draft by hand is recorded with `SPOCK: record that I edited a document`. The person then marks the draft agreed again, which writes the agreed PRD afresh. A changed PRD marks the initiative stale |

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
