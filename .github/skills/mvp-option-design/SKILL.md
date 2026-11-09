---
name: mvp-option-design
description: >
  Derive three genuinely different ways to pilot the selected solution inside the frame the four compliance area cards set. Each
  is a whole alternative, not a phase; none is sequenced, none is preferred. Trigger phrases: mvp options,
  stage 5, ways to pilot, pilot alternatives, design the mvp options.
---
# mvp-option-design

**Stage 5.1** · Agent `product-manager` · Pattern `single-shot` · Gate **Q5**, and the person's recorded choice

## Contract

- **Inputs:** `{runs_root}/{run_id}/4-solutions/2-selected-solution.md` · **`{runs_root}/{run_id}/4-solutions/1-solution-set.md` — read the selected solution's own sections, not only the decision** · `{runs_root}/{run_id}/3-competitive-analysis/3-competitive-synthesis.md` · `{runs_root}/{run_id}/1-brief/initiative-brief.md` *(its `time_horizon`: when the outcome must be observable)* · `.github/know-how/compliance/compliance-guidelines.md` · `.github/know-how/compliance/area-compliance.md` · `.github/know-how/compliance/area-gdpr.md` · `.github/know-how/compliance/area-legal.md` · `.github/know-how/compliance/area-ict-security.md` · `.github/know-how/writing/agent-interaction.md` · `.github/know-how/writing/output-voice.md` · `.github/know-how/writing/documentation-standards.md` · `.github/know-how/method/method-canon.md` *(§4.5 is what this stage is for, §13 the assumptions an option tests)*
- **Output:** `{runs_root}/{run_id}/5-mvp/1-mvp-options.md`
- **Record:** `{runs_root}/{run_id}/records/5-mvp/A10-r01-mvp-options.record.md` — **the output above is assembled from a record and does not stand alone.** Read [`.github/instructions/record-and-output.instructions.md`](../../instructions/record-and-output.instructions.md) before writing either: the fields a gate decides sit on the record, and an output carrying a production field is refused (C107, C108, C109). **The workflow writes the frame of the output and its record; fill each `[[fill: …]]`.** **The envelope around them is not yours, and there is no task to run for it**: what is fixed comes with the frame, the checks read the rest as the workflow computes it, and the workflow writes that into the document when the person approves. On a run started before 1.16.1, `SPOCK: check what is written, then continue`, which you run after every document, fills it first.
- **The record is named `A10-r01-mvp-options.record.md`**, or with the next free number where an earlier record for A10 is
  there. A file in `records/5-mvp/` whose name does not end in `.record.md` is not a record, and nothing reads
  it: where A10 has no record, `SPOCK: check what is written, then continue` stops, names the file and the name to
  use, and
  writes nothing for A10, and where the options document is already on disk the gate names it too. You hold no
  rename: write the record again under its
  name, and tell the person the misnamed file stays until they take it back with `SPOCK: take something back`.
- **Exclusions:** presents no option as preferred · uses no sequencing language · no option is a subset or stage of another · holds no tool and reaches nothing outward

> **Read the solution, not the summary of it.** The decision record says which solution was chosen and why
> a person chose it, in their words. **The solution itself carries seven sections written to a length and a
> binding**, including how a client and the staff actually use it, concretely, and what it must not be is
> architecture. **Declaring only the decision record** is how three
> runs reached stage 5 with nothing describing the interaction and invented it here.

## Procedure

**This binding diverges — it widens the space and must not favour a candidate. A person selects one at the choice
immediately after, so anything read as a favourite pre-empts their choice.**

**1 — Read the selected solution and the frame.** `A9` is the solution chosen at G4; `A7` is the market synthesis.
**"Materially different" means different inside the frame the bank actually operates in**, not different in
the abstract. There is no Banking Constraints body to read for that frame and there will not be one, so the
frame you have is the four compliance area cards below, what the selected solution and the synthesis already say,
and the brief's time horizon.

**Hold the four compliance area cards in context too, and read their §6 touchpoint tables.** They are
[`area-compliance.md`](../../know-how/compliance/area-compliance.md),
[`area-gdpr.md`](../../know-how/compliance/area-gdpr.md),
[`area-legal.md`](../../know-how/compliance/area-legal.md) and
[`area-ict-security.md`](../../know-how/compliance/area-ict-security.md). **A10 carries no
`compliance_touchpoints[]`** (§6.11) and you write none — they land at 5.2 on A11. What the cards are for
here is shaping: an option that engages a product-specific regime, a mandatory client-facing document or a
new regulated product is a materially heavier pilot than one that does not, and that is a difference worth
drawing an option around.

**2 — Derive three whole ways to pilot A9.** Each option is a complete alternative, not a subset, a
stage, or a starting point of another (**C4**, cardinality 2..6 on the finished set). If one option is really "the first part
of" another, they are one option, not two.

**Each option states what it takes, not only what it teaches.** What has to be built, what population it
needs, and where a number it needs is not known, who holds it. **Three ways to pilot compared on learning
value alone ask the person at the gate to price three pilots from nothing**, which is half the decision they
came to make. This is not estimating: it is naming the build, the people and the elapsed time at whatever
precision the run supports, and saying so where that is coarse.

**Each option can be piloted within the brief's time horizon.** The brief's `time_horizon` says when the outcome
must be observable. A way to pilot whose build, data or population takes longer than that to run and read is not an
option: put it in `Later, beyond the brief's horizon`, after `How to choose between them`, one short paragraph each,
saying what it would pilot and what takes longer than the horizon. It has no `MVP` id and is not in `options[]`.
Where the brief marks the horizon as not known, every option stays in the set, and that section says the brief gives
no horizon to hold them to.

For a brief whose horizon is *end of Q1 2027*: *"**Real-time spending categories from the core ledger.** It would
pilot categorisation on live transactions. The ledger integration it needs is planned for 2028, so it cannot run and
be read before the horizon."*

**Each option pilots A9 with the people A9 is for.** An option may narrow the channel, the client group or the
scope, never who acts on the chosen solution: who sees it, uses it or decides with it. A way to pilot that hands A9
to someone else pilots a different solution, so it belongs at stage 4 as a solution of its own, not in this set.

For a selected solution that warns a client at the moment they pay: *the same warning in the app only, or only for
clients over 60, is an option*; *the same warning shown to call-centre and branch staff instead, for them to pass
on, is not*, because the client no longer sees it.

For a selected solution that lets an applicant save an application they have not finished and come back to it:
*resuming by a link sent to the applicant, or only for applications started on the web, is an option*; *an option
that builds nothing the applicant sees, with no new indicator, link or entry point for them, and has contact-centre
staff work a list of unfinished applications and call each applicant back, is not*, because the applicant no longer
uses the solution and staff act in their place. Staff calling applicants back is a solution of its own: it belongs at
stage 4, beside the others, however cheap it is to pilot, and it is not one of this set's options.

**And `How to choose between them` says what each one risks.** An option that withholds a known improvement
from a slice of clients on purpose belongs in the section where the choice is made, not only inside its own
entry, because that is where somebody decides whether to accept it.

**Each option's id is `MVP1`, `MVP2`, `MVP3`, in set order.** Runs have written `O1`, `OPT-1` and `OPT-A`,
and the payments run wrote slugs taken from the option's name. **The id is not a label**: the name beside it
is what a person reads, and the id is what the person's recorded choice resolves against. The same string goes in the
record, in the heading and anywhere the option is named.

**An option a person adds carries `origin: person` on its entry.** Absent is the ordinary case and means you
derived it. **You never set it on an option you derived**: it records that a person contributed the option,
which is a claim only their having done so makes true.

**3 — State what makes each materially distinct.** Every option carries `differs_by` — the specific thing
that sets it apart from the others. `approach` says how it pilots A9. **No Banking Constraints body exists, so
`constraints_met[]` stays empty** and the option set carries `constraint_basis: none_stated`.

> **Two options that build the same thing are one option, however differently you measure them.** The test
> is the build, not the measurement design: if the same team would write the same code for both, and the
> only difference is what you would watch afterwards, you have one option and two ways of learning from it.
> Say that plainly, put the measurement choice inside the single option, and hand the person two options
> rather than three. **This has happened**: a rework collapsed two of three into one
> capability with two measurement designs and every check passed, because `differs_by` was stated on both
> and nothing compares what they would actually build.
>
> **The rule is one stage older than this skill.** Discovery craft §6 says two options sharing a premise are
> one option, and stage 4 refuses a solution that is another with an opportunity taken off it. Neither was
> carried forward to here. **Two is a legal answer** and the floor, and a short set with a stated reason is
> worth more than a third option that is the second one wearing a different metric. **Do not solve this by
> scoring them.** A score on a false alternative makes it look decided.

**Regulatory reach is a legitimate `differs_by` and it is usually the one nobody writes.** §4.4 of
[`compliance/compliance-guidelines.md`](../../know-how/compliance/compliance-guidelines.md) is the reason:
where every option carries identical regulatory reach, the difficulty side of the comparison is the same
for all of them and contributes nothing to the choice it exists to serve. A payment-credential pilot and a
notification pilot do not carry the same reach, and only stating it lets a person see the trade.

**4 — Alternatives, never sequenced phases.** No option carries sequencing language — *first*, *then*,
*phase*, *followed by*. Sequencing quietly converts a choice into a roadmap, and the user ends up picking a
starting point rather than a direction.

**5 — Present none as preferred.** No preference marker, recommended flag, or ordering claim. Options
appear in written order, which carries no ranking. **No superlative either**: *cheapest*, *lowest cost of the
three* and *quickest to ship* name a favourite as surely as a flag does. Say what each option takes in its own
terms, compare two on cost, effort or speed only where the run establishes both sides, and otherwise say the
comparison is not established (§3.9 of the Documentation Standards). This holds in the document and in the
message that puts the options to the person.

> **Worked example, §3b of the Documentation Standards.** An option that says what sets it apart and
> nothing about what it needs, how long it runs or what it costs, beside one that says what it needs, what
> we learn and what could go wrong. **The person at the gate is otherwise asked to price three pilots from
> nothing.**

**6 — Write the artifact, then stop.** State what you produced.

> **You do not run the quality gate, and you do not select.** The choice is a person's decision, recorded
> while this stage is still running, and the expansion cannot be written until they have made it. Never report a
> gate result for your own output, and never mark an option as the one to pick. You may trigger the gate
> with `SPOCK: check what is written, then continue`, and triggering it is not running it: you relay what
> it wrote.

## The reduction, which is permanent

**No Banking Constraints body exists, and none is being written: the option set carries
`constraint_basis: none_stated`.** This is not a temporary state somebody is coming back to.
`.github/registry/skills.yaml` carries the decision and the condition that would reverse it, which is a body
being commissioned rather than a date.

**The divergence discipline runs unchanged** — three whole alternatives, each with a stated
`differs_by`, none sequenced, none preferred — because that is method and does not depend on the
constraints' content.

**What is permanently missing is the validation that a difference is bank-material.** `constraints_met[]`
has no set to resolve against, so it stays empty and the option set is marked `constraint_basis:
none_stated`. Each option still carries its `differs_by`, so the alternatives do not collapse into
rewordings — but nothing here confirms a difference matters to this bank, and **an option set that passes
its gate has not been checked against the bank's own frame.** Say so on the artifact rather than leaving a
reader to infer it from an empty list.

## Gates and obligations

- **Q5** — `C4` cardinality 2..6 · `C6` run identifier present · `C12` traceability holds once the expansion exists · `C58` every option states its `differs_by`, and none is preferred or sequenced. Plus the universal checks. Compliance is addressed in the expansion (A11, `C7`), not in the option set — A10 carries no compliance touchpoints (§6.11)
- **The choice** — the Product Manager selects one option and records it with `SPOCK: record a decision I made`, on stage 5, kind `choice`, while this stage is still `running`. **It is not a gate**: a gate needs the stage in review, and review needs the expansion that the choice is what unblocks. You neither make it nor record it, and until it exists the expansion has nothing to expand
- **Q5 cannot detect a false alternative.** It counts options and checks the bindings, not whether two options are genuinely different. `differs_by` exists so the difference is stated and a person can judge it

## Bounds

| Bound | Value | On reaching it |
|---|---|---|
| Options you derive | **3** | One option is not a choice, and three is what this stage sets out to produce |
| Options in the finished set | **2..6** (`C4`) | A person may add up to three of their own at the gate. **Four or more is a list to wade through when somebody meets them cold, and not when they wrote them**, which is why the ceiling is theirs and the three is yours |
| Effort | `single-shot`, `effort: medium` | One pass; reaching the step bound is recorded in `bounds_hit[]` |

## Edges

| Situation | Do |
|---|---|
| Only one genuinely distinct way seems to exist | The floor is two (**C4**), and no input lowers it (B9). Find a materially different second — vary the scope, channel, segment or build approach — not a reword. If the solution truly admits a single pilot it is too narrow to choose between: say so and raise it at the choice, and still do not emit a single-option set |
| Options start to read as phases | Collapse them. A pilot and its later expansion are one option, not two alternatives |
| Fewer than two ways to pilot fit the horizon | The later list does not count toward the floor of two (**C4**). Find ways that fit: a smaller population, a manual step in place of the integration, a narrower channel. If fewer than two still fit, keep the closest ways as options, each saying what takes longer than the horizon, and say so at the choice as a heads-up: which option fits, or, where none does, that the solution cannot be piloted within the brief's horizon. It is never a refusal, and the person still chooses |
| The synthesis (A7) is absent | Derive from A9 alone and mark the set `evidence_basis: pre_synthesis`. Read the brief for its `time_horizon` only. |
| Amending after the choice | A person's own change is recorded with `SPOCK: record that I edited a document`, and leave `revisions` as it is: rework is counted by the workflow at its gates. Once the stage is accepted, it is sent back first with `SPOCK: send a stage back to be redone`, because an accepted document stays as it was approved. A changed option set marks the expansion and everything downstream **stale** |

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
