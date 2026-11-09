# Stage 5 — specification

**2 October 2026** · **Release:** 1.14

**This describes the stage that exists, not the stage that was designed.** Every rule in parts 1 to 11 is
read off the build — the workflow contract, the two skill files, the gate model, the field spec or a bound
know-how body — and where the build does not yet do something the stage needs, the part it belongs to says
so, with the reason, and part 12 lists where.

**Parent contract:** [PILOT-BUSINESS-LOGIC.md](../PILOT-BUSINESS-LOGIC.md). **Both describe the latest
release, and where either disagrees with the build, that document is the defect.**

---

# Part 1 · Purpose and scope

## 1.1 What the stage is for

**Stage 5 scopes one chosen solution down to something a team could actually pilot, and then defines it.**
It is one stage with two halves and **two decisions**: a recorded choice of option, which the expansion waits
on, and `G5b` on the expansion. Stage 4 also records a choice beside its gate; here the choice falls between
the two halves.

The first half offers options that differ on **how the solution is built**, not on which solution it is.
The second expands the chosen option into scope, boundaries, and what is deliberately out.

## 1.2 Why the distinctness rule from stage 4 deliberately does not apply

**Stage 4 picks between solutions and discards the rest. Stage 5 picks how to build one solution.**

**Two options that overlap heavily are the honest shape of this choice**, and forcing them apart would
produce a difference that is not there. What the stage requires instead is that **each option states how it
differs from the others** (`C58`), which is a weaker and truer demand.

## 1.3 What the stage does not do

| | |
|---|---|
| **It presents no option as preferred** | An explicit exclusion on `mvp-option-design` |
| **It uses no sequencing language** | *First this, then that* turns a choice set into a plan |
| **No option is a subset or a stage of another** | An option that is another option's phase one is not an alternative to it |
| **It expands exactly one** | Expanding a second is re-opening a closed decision |
| **It never compares or re-ranks the alternatives** | The expansion leaves the non-selected options unaltered and does not comment on them |
| **It reaches nothing outward** | Neither skill holds a tool |

## 1.4 What good looks like

**The option set arrives unchosen**, every option states its difference, and the expansion matches the
option that was selected and **adds nothing the selection did not carry**.

## 1.5 What poor looks like

**A stage whose expansion waits on the gate that accepts the expansion cannot be driven at all.** `G5b`
accepts the expansion, so the expansion cannot be gated on `G5b`. **That is why the choice of an option is a
recorded decision rather than a gate**: it can be taken while the stage runs, so the expansion can be written.

**A stage 5 reading only the decision record invents its interaction from nothing.** The selection is an id;
the thing it points at is the solution's own sections in `A8`, and the decision record alone **is a person's
restatement written at the gate**, so every section stage 4 produces would be read by nobody after it.

---

# Part 2 · Inputs

| | | what it gives |
|---|---|---|
| `A9` | selected solution | **which** solution, as an id and a decision record |
| `A8` | the solution set | **the selected solution's own sections.** Without it, stage 5 has §1.5's third failure |
| `A7` | competitive synthesis | what the market already does, so an option is not a reinvention |
| `A3b` | framed opportunities | **read by the expansion only**, for the success metrics of the opportunities this pilots against, **so the MVP's measures are not invented here** |
| `A1` | the initiative brief | **read by option design only**, for its `time_horizon`: when the outcome must be observable |
| `A10` | the MVP options | **read by the expansion**, for the option the run records as chosen |

**Which source names what.** The contract's `mvp` step names `A9`, `A8` and `A7`. The registry and the skill page
name `A9`, `A8`, `A7` and `A1` for option design, and `A10`, `A9` and `A3b` for the expansion. The choice itself is
read off the run record.

**R2.1 — Read the solution, not the summary of it.** The decision record says which solution was chosen and
why. It is not the solution.

**R2.2 — Know-how.** Both halves read the **four area cards** and `compliance-guidelines.md`, plus
`method-canon.md` (§4.5 is what this stage is for, §13 the assumptions an option tests) and the writing
bodies. The expansion additionally reads `strategy-basis.md`.

**R2.3 — This is the first stage after stage 4 to hold the compliance bodies**, and it holds all five.

---

# Part 3 · The steps

### Step 1 — Option design

**R3.1.1 — Three options are derived, by the skill's instruction.** One option is not a choice, and three is
what the skill tells the step to produce; the registry entry declares `options: "2..3"` for the step, and the
finished set holds two to six (`C4`).

**R3.1.2 — Options differ on how the solution is built, never on which solution it is.**

**R3.1.3 — Every option states its `differs_by`** (`C58`). **Whether the difference is real is the person's
judgement** (§8.3).

**R3.1.4 — No option is preferred, sequenced, or a subset of another.** Three separate exclusions and they
fail in different ways: preference removes the choice, sequencing converts it to a plan, and subsetting
makes one option a phase of another rather than an alternative to it.

**R3.1.4a — Each option can be piloted within the brief's time horizon.** The agent is told to put a way to pilot
that takes longer than the brief's `time_horizon` to run and read under `Later, beyond the brief's horizon`, one
short paragraph each, with no `MVP` id and outside `options[]`, so it does not count toward the floor of two. Where
the brief marks the horizon unknown, every option stays in the set and that section says so.

**R3.1.4b — Each option keeps who acts on the selected solution.** An option may narrow the channel, the client
group or the scope, never who sees, uses or decides with `A9`. The agent is told that a way to pilot that hands `A9`
to someone else pilots a different solution, which belongs at stage 4 as a solution of its own and not in `A10`, with
one worked example: a client's warning moved to a staff screen is not an option, the same warning in the app only or
for one client group is. No check reads it.

**R3.1.5 — The set arrives unchosen.** A producer that arrives with a recommendation has made the choice
the person records.

### Step 2 — Expansion

**R3.2.1 — Exactly one option is expanded: the one the run records as chosen.**

**R3.2.2 — The expansion adds nothing the selection did not carry.** Scope, boundaries and what is
deliberately out, derived from the option rather than from fresh thinking.

**R3.2.3 — The measures come from `A3b` and are not invented here.** The MVP pilots against opportunities
that already carry success metrics.

**R3.2.4 — The non-selected options are left unaltered and are never compared, re-ranked or commented on.**

**R3.2.5 — The opening's counts are read off the document, never remembered.** The agent is told to count the
touchpoints it carried into functionality and the ones it names as lapsing, in its own sections, and to state
those two numbers against the selected solution's screen. Every inherited touchpoint is named in the document by
its identifier, so a count can be checked by counting them (`C185`). The agent is told to write *What has to be handled* as three labelled blocks, addressed, narrowed out
and open, with the item needing a decision last.

---

# Part 4 · The outputs and their sections

| | File | Class | Decided at |
|---|---|---|---|
| `A10` MVP Options | `5-mvp/1-mvp-options.md` | **asset** | — the choice is a recorded decision on the run |
| `A11` Expanded MVP | `5-mvp/2-expanded-mvp.md` | **output** | `G5b` |

**The choice is recorded on the run record and `G5b` on the expanded MVP**, which is what makes a one-gate
stage carry two decisions.

The section set is `documentation-standards` §3's, including the two closers (`C100`, `C98`).

**The workflow writes each document's frame before the agent writes**, `A10` and `A11` alike: the record's
identity and sources, the title, the headings in the run's language and the closing pair, with `[[fill: …]]` in
every place that is the agent's, never over a file already on disk. **On a run started on 1.12 or later both open
on a block the envelope step writes from the record**, the facts carried from stage 4 and what changed; `C206`
holds an accepted document's block to the record.

---

# Part 5 · Compliance

**Stage 5 runs no screen of its own.** The only screen is stage 4's, per solution.

**Option design holds the four area cards to shape the options and writes no touchpoints**: `A10` carries
none. An option whose build route engages a heavier regime is a materially different pilot, and the cards are
what let the producer draw an option around that.

**The expansion inherits the selected solution's compliance section and is instructed not to re-derive it.**
It is instructed to name each touchpoint's area, sub-domain and trigger by the card's ids, and to bind each to
functionality that addresses it, an accepted open item with a named owner and the point it will be decided, or
a stated reason the narrowing means it no longer applies. Each entry's `basis` cites the body and its version,
the area and the sub-domain, in the form `compliance-guidelines@0.1 · A1/S13`. Each is bound to what
addresses it, an owned open item or a reason (`C130`), and the touchpoints the selected solution fired are carried
into the expanded MVP (`C171`, `C185`).

**The questions stage 4 could not answer for the selected solution do not yet travel onward**, because no field
on `A11` or on the PRD template carries them: `carried_unresolved` sits on `A3` and `A4` only, so such an item
reaches the handover with no owner.

**The agent is told not to say in the expanded MVP who wrote the compliance cards**, and no check reads it. One
area card is the bank's and three were written by this project; that is recorded once, in the RegMap, as each
area's `source`.

---

# Part 6 · Scoring

**Stage 5 produces no score.** No band, no rank, no number.

**The ordering question is the person's choice, and it belongs to them.** Each option says how it differs
(`C58`), which is the material a person ranks with, and **the stage deliberately supplies no ranking of its
own** because `R3.1.4` forbids preference.

---

# Part 7 · Artifacts and records

| Artifact | Written by | Record |
|---|---|---|
| `A10` | `mvp-option-design` | `mvp-options` |
| `A11` | `mvp-expansion` | `expanded-mvp` |

**Both documents are assembled from records and neither stands alone.** The fields a gate decides sit on the
records, never on the documents, and each document cites the records it was assembled from (`C107`, `C108`,
`C109`).

**The run record carries the choice as a `choice` decision on stage 5, and `G5b` is the gate**, since
10 September 2026. Nine committed runs carry the stage-level `G5` on the run record and `G5a` and `G5b` on the
artifacts, where reading only the run record shows one decision where two were made.
`2026-09-digital-onboarding-dropoff` carries `G5a` and `G5b` on both.

---

# Part 8 · Gates and checks

## 8.1 What `Q5` is

**Eleven checks of its own and forty-five universal**: `C4`, `C7`, `C11`, `C12`, `C15`, `C58`, `C130`, `C153`,
`C171`, `C185`, `C190`.

**Each check's full rule is in the check register** (see the README); the table says what each guards against.

| Check | Gate | What it guards against |
|---|---|---|
| `C4` | `Q4`, `Q5` | An option set too small to be a choice, or too large to read |
| `C58` | `Q5` | Options that do not say how they differ, or arrive with one already preferred or put in order |
| `C153` | `Q4`, `Q5`, `Q6` | A touchpoint or trigger the area's own card does not declare |
| `C171` | `Q5`, `Q6` | A compliance touchpoint of the chosen solution lost on the way into the MVP |
| `C185` | `Q5`, `Q6` | A count of touchpoints nobody can check against the screen it came from |
| `C190` | `Q3` to `Q7`, never signable | Material in the run that never came in through intake, or changed after it did |

## 8.2 One quality gate, two decisions

**`Q5` runs once over the stage.** The stage carries two human decisions: the choice, recorded on the run
record while the stage is running, and `G5b`, recorded on the expanded MVP when the person approves it. Stage 4
carries the same pair, a recorded choice and `G4`.

## 8.3 What the gate cannot decide

**Nothing decides whether three options are genuinely different ways to build the same thing.** **Whether the
difference is real is the person's judgement when they choose**, and two options that differ only in degree will
pass the gate and fail the person.

**No automated judge runs a judged rule at this gate; the person who signs it answers them in the
approval**, and a question left out is recorded as skipped.

---

# Part 9 · The two decisions

| Decision | Actor | Decides, and the task a person runs |
|---|---|---|
| **The choice** | Product Manager | one MVP option chosen while the stage is running, with `SPOCK: record a decision I made`: kind `choice`, the option's id, why, the person's name and role. **Not a gate**, so `G5b` is the stage's one gate. The task ends by saying what the stage still waits on |
| **`G5b`** | Product Manager | **expansion accepted before the PRD is built on it**, with the plain `SPOCK: approve what is in front of me` and its four boxes (name, role, answers to the gate's questions, changes asked for), because the choice is already on the record. Under another role it is recorded as typed, with a heads-up that the Pilot Definition gives `G5b` to the Product Manager, unless the role reads as a slip (stage 1, part 9) |

**`G5b`'s wording carries its reason.** The PRD is the run's largest synthesis and it is built on the
expansion. An expansion accepted after the PRD exists is an acceptance of something already depended on.

**A person may add up to three options of their own before they choose.** Three from the producer plus two added is
five, inside the ceiling of six. **The ceiling is meant for the person and the three is what the agent is
instructed to derive**: four or more is a list to wade through when somebody meets them cold, and not when they
wrote them. The gate holds the size whoever wrote the options (`C4`).

**An option a person adds carries `origin: person`**, and the producer is instructed never to set it on an
option it derived.

**What the person reads when the options are written.** The choice is asked while the stage runs, so the stage
waits on it, and the agent closes with the fixed waiting message: what it wrote and where, that the run waits on
the person's decision on this stage, that only the option they choose goes forward, expanded and the PRD written
from it, while the others stop there, the task to run and each of its boxes in order, that Escape records
nothing, that the agent does not run it, and where the run's front page is. **That message has no "you will choose one"
row.** The row belongs to the review message, printed when the next step includes a choice: at stage 4, where the
choice is asked at review, and at stage 5 only where a send-back withdrew a recorded choice.

---

# Part 10 · Loops and re-entry

| Move | What it costs |
|---|---|
| **Adding options before the choice** | Up to three of the person's own. Designed in |
| **Changing the selected solution** | Stage 4 is sent back with `SPOCK: send a stage back to be redone`, which marks this stage stale where it holds a gate result or an acceptance. Or the stage 4 choice is replaced with `SPOCK: replace a decision that no longer stands`, which writes the selected solution again from the new choice and marks this stage and the later ones out of date, to be redone with `SPOCK: continue`. **Changing your mind about a solution changes the document** |
| **Changing the chosen option** | `SPOCK: replace a decision that no longer stands`, kind `choice`, on stage 5. Both choices stay on the record |
| **Re-expanding** | Expanding a second option is re-opening a closed decision and the skill refuses it |
| **Rework** | Counted by the workflow at each gate from the documents that changed since the last one, and on a run started on 1.12 or later from the stage's records too. Nothing is recorded by hand |
| **Withdrawing the stage** | A workflow act, and a retracted stage carries no agreement for a document being withdrawn |

---

# Part 11 · Bounds

| Bound | Value | Whose | On reaching it |
|---|---|---|---|
| Options derived | **3** in the skill; **`"2..3"`** in `skills.yaml` | the agent's, as an instruction | One option is not a choice. The skill aims at three; the registry allows two |
| Options in the finished set | **2..6** (`C4`) | the person's above three | |
| Options a person may add | **3** | the person's | |
| Options expanded | **exactly 1** | declared in `skills.yaml`, read by `C15` | Expanding a second re-opens a closed decision |
| Effort, both halves | `single-shot`, `effort: medium` | | The agent is instructed to record it in `bounds_hit[]` |

**The size of the set and the one expansion are held by checks (`C4`, `C15`); the other bounds are
instructions to the agent.**

---

# Part 12 · What the build does not yet do

| Where | The gap |
|---|---|
| §5 | The open compliance items do not yet travel onward to the PRD |

---

# Part 13 · Open questions

- **Is a ceiling of six right when three of them may be the person's?** The reason given for the ceiling is
  that four or more is a list to wade through for somebody meeting them cold, which is an argument about the
  reader and not about the author.
- **Should `G5b` be a gate at all, or an acceptance folded into `G6`?**

---

# What this spec does not fix

- **No automated judge runs the judged half of `Q5`**; the person who signs the gate answers it in the
  approval.
- **Nothing measures whether the options are genuinely alternatives.** **Three options that are one option
  described three ways pass every check at this gate.**
- **Nothing says what the MVP costs to build**, here or anywhere. Stage 4 stopped scoring technical
  complexity and stage 5 never scored it, so the run reaches the PRD with no estimate of effort at all.
