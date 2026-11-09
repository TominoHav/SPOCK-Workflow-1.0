# Stage 6 — specification

**2 October 2026** · **Release:** 1.14

**This describes the stage that exists, not the stage that was designed.** Every rule in parts 1 to 11 is
read off the build — the workflow contract, the skill file, the gate model, the PRD template or another
bound body — and where the build does not yet do something the stage needs, the part it belongs to says so,
with the reason, and part 12 lists where.

**Parent contract:** [PILOT-BUSINESS-LOGIC.md](../PILOT-BUSINESS-LOGIC.md). **Both describe the latest
release, and where either disagrees with the build, that document is the defect.**

---

# Part 1 · Purpose and scope

## 1.1 What the stage is for

**Stage 6 turns the expanded MVP into a requirement a delivery team can build against, and gets a person to
agree to it.** It is the run's largest synthesis: **six inputs into one document**, and the skill declares
`effort: high` for that reason.

**It produces two artifacts and the second is not a status on the first.** `A12` is the draft. `A13` is the
agreed PRD, **a different document carrying an agreement block naming who agreed and when**, and stage 7
checks for that block before it starts.

## 1.2 Why the agreement is an artifact rather than a field

**A PRD without a completed agreement block is not `A13`.** The skill's exclusion says so directly.

**The agreement is assembled from the mark, not before it.** `SPOCK: mark the PRD agreed` records the
agreement in the person's name and, in the same act, **writes `A13` from the draft word for word**, with their
name and the date in its agreement block. So the document a person agreed and the document stage 7 reads are
the same text. A draft promoted to agreed before the mark existed would be a document claiming an agreement
nobody made.

## 1.3 What the stage does not do

| | |
|---|---|
| **It never writes into the agreement block or the agreed PRD** | An explicit exclusion. The mark writes both; the producer never does |
| **It reaches nothing outward** | The skill holds no tool |
| **It does not re-derive the outcome or the measures** | They are carried forward from `A3b` and `A1` |
| **It does not invent a requirement the MVP did not carry** | The expansion bounds it |

## 1.4 What good looks like

**Every template section present and reasoned**, the alignment validation statement present, **each
requirement stating which measure it serves**, and the agreed PRD the draft word for word, with the
agreement.

## 1.5 What poor looks like

**A requirement that serves no stated measure.** The alignment validation statement exists so that such a
requirement is **visible rather than assumed**: without it, a reader has to hold eight sections in their
head to notice that one requirement leads nowhere.

**An agreed PRD that no longer carries the draft's content** fails the gate (`C40`), and marking the draft
agreed again writes the agreed PRD afresh from the draft as it now stands.

---

# Part 2 · Inputs

**Six, and the number is the reason this stage carries the highest effort declaration in the workflow.**

| | | what it gives |
|---|---|---|
| `A11` | expanded MVP | the scope the requirement is written against |
| `A1` | the initiative brief | the outcome and the goals |
| `A4` | prioritised opportunities | what the run committed to pursue |
| `A3b` | framed opportunities | **the outcome and the success metrics, carried forward rather than re-derived** |
| `A9` | selected solution | *(read through `A11`)* |
| The compliance bodies | the four area cards and the Compliance Guidelines | what each inherited touchpoint rests on |

**Which source names what.** The contract's `prd` step names `A11`, `A1` and `A4`; the registry and the skill page
name those and `A3b`. `A9` is not named by any of them: the selected solution reaches the PRD through the expanded
MVP.

**R2.1 — The measures are carried, not re-derived.** `A3b` is read for exactly this. A measure invented at
stage 6 is a measure nobody at `G2` or `G5b` ever saw.

**R2.2 — Know-how.** `product/prd-template.md` fixes the section set · `product/strategy-basis.md` ·
`compliance-guidelines.md` and the **four area cards** · `method-canon.md` (§4.6 is what this stage is for)
· the writing bodies.

**R2.3 — If the agreement is absent.** The stage writes `A12` and stops. `A13` is not written, and stage 7
will not start.

---

# Part 3 · The steps

**`prd` writes `A12`. The workflow writes `A13` at the mark.**

### Step 1 — The draft

**R3.1.1 — Each section is written against the fixed template**, which owns the section set and the
frontmatter keys.

**R3.1.2 — Each requirement states which measure it serves.**

**R3.1.3 — The alignment validation statement is carried**, so a requirement serving no stated measure is
visible on the page rather than left for a reader to notice.

**R3.1.4 — The touchpoints are inherited from `A11`, not re-derived.** The agent is instructed to address each
inside a named requirement, as an accepted open item with a named owner and the point it will be decided, or
with a stated reason the scope narrowed past it (`C130`). Adding one names the trigger that fired it; dropping
one needs a written reason and the person who decided it (`C131`).

**R3.1.5 — Every touchpoint the selected solution's screen fired is named by its identifier in the PRD**
(`C185`), on the draft before the person is asked to agree, so they agree once. The agent is told not to say who wrote the compliance cards; no check reads
it.

**R3.1.6 — The section headings are the template's, in the run's language.** `SPOCK: fill in the envelope`
writes the PRD's section headings in the language `A1` declares, and touches nothing else in the body.

### Step 2 — Remediation

**R3.2.1 — The agent is instructed to remediate `Q6` shape failures for up to three cycles**, or sooner
where one check still fails after two changes or a task refuses twice for the same reason, and then to **stop
remediating and return the shape failures to a person.** Each gate that finds the stage's documents changed records a round of rework on the run record, and nothing enforces the cap of three. A producer
looping on its own gate is a producer with no exit, and the person's routes are those of every gate (stage 1,
`R3.8.2`). **A failure on a missing or unsigned agreement mark is not the producer's to remediate**: the driver
sends it to the person, who runs `SPOCK: mark the PRD agreed`.

### Step 3 — The agreed PRD

**R3.3.1 — `A13` is written by `SPOCK: mark the PRD agreed`, and only by it.** Not before the mark, and never
by the producer.

**R3.3.2 — The producer never writes into the agreement block.** A person marks the draft agreed, and the mark
records the agreement on the run record and writes the block in the same act.

**R3.3.3 — The agreed PRD is the draft word for word, with the agreement** (`C40`). A draft that changes after
it is agreed is marked agreed again, and the agreed PRD is written afresh.

---

# Part 4 · The outputs and their sections

| | File | Class | Decided at |
|---|---|---|---|
| `A12` PRD draft | `6-prd/1-prd-draft.md` | **asset** | — |
| `A13` PRD agreed | `6-prd/2-prd-agreed.md` | **output** | `G6` |

**The template is the section set and it is fixed.** Eight sections, plus the two closers, which the draft's
frame writes and the agent is told to keep.

**The alignment validation statement is the section that does the most work for a reader** and it is the one
nothing downstream reproduces: stage 7's template is ČS's and has no equivalent.

**The workflow writes the draft's frame before the agent writes**: the record's identity and sources, the title,
the template's headings in the run's language and the closing pair, with `[[fill: …]]` in every place that is the
agent's, never over a file on disk. The agreed PRD is the mark's, not framed. **On a run started on 1.12 or later
both open on a block the envelope step writes from the record**, the facts carried from stage 5 and what changed,
the agreed PRD carrying its draft's word for word (`C206`).

---

# Part 5 · Compliance

**Stage 6 runs no screen of its own.** `prd` inherits the touchpoint set from `A11` and is instructed not to
re-derive it, so an item cannot be quietly answered by a later producer screening again with different words.

**The touchpoints are inherited and checked.** The expanded MVP's touchpoints pass into the PRD draft and the
agreed PRD; one dropped on the way carries a reason and who dropped it, and one added names the trigger that fired
it (`C131`). Each is bound to a requirement, an owned open item or a reason (`C130`).

**The questions stage 4 could not answer for the selected solution do not yet travel**, because no field on
`A11` or on the PRD template carries them: `carried_unresolved` sits on `A3` and `A4` only, **so such an item
can reach the handover with no owner.**


---

# Part 6 · Scoring

**Stage 6 produces no score.**

**What it produces instead is the alignment statement**, which is the closest thing in the workflow to a
measure of fit and is deliberately prose rather than a number. A requirement either names the measure it
serves or is visibly a requirement that names none.

---

# Part 7 · Artifacts and records

| Artifact | Written by | Record |
|---|---|---|
| `A12` | `prd` | `prd` |
| `A13` | **the workflow, at `SPOCK: mark the PRD agreed`**, from the draft | `prd` |

**Both documents are assembled from records and neither stands alone.**

**`A13` is the run's handover document in everything but name.** It is the one document stage 7's contract
names; stage 7 also reads the language `A1` declares and the Jira key on the run record.

---

# Part 8 · Gates and checks

## 8.1 What `Q6` is

**Eleven checks of its own and forty-five universal**: `C7`, `C12`, `C13`, `C31`, `C67`, `C130`, `C131`,
`C153`, `C171`, `C185`, `C190`.

**Each check's full rule is in the check register** (see the README); the table says what each guards against.

| Check | Gate | What it guards against |
|---|---|---|
| `C13` | `Q6`, `Q7` | A draft that claims an agreement, or an agreed PRD nobody is recorded as agreeing |
| `C31` | `Q6` | A PRD that never says whether its requirements serve the measures it was meant to |
| `C67` | `Q6` | A PRD missing a section of the template, or with sections the template does not have |
| `C131` | `Q6` | A compliance touchpoint dropped between the expanded MVP and the PRD with nobody saying why |
| `C153` | `Q4`, `Q5`, `Q6` | A touchpoint or trigger the area's own card does not declare |
| `C12` | `Q5`, `Q6`, `Q7` | A requirement that cannot be traced back to the MVP and the problems it serves |
| `C171` | `Q5`, `Q6` | A compliance touchpoint of the chosen solution lost on the way into the MVP |
| `C185` | `Q5`, `Q6` | A count of touchpoints nobody can check against the screen it came from |
| `C190` | `Q3` to `Q7`, never signable | Material in the run that never came in through intake, or changed after it did |
| `C40` | every gate | An agreed PRD that is not the text the person agreed |

## 8.2 What the gate cannot decide

**Nothing decides whether the requirement is buildable.** The gate reads sections, measures and the
agreement block. **Whether a delivery team could estimate this document is `G6`'s judgement**, and nothing
in the run carries an effort estimate for them to judge against.

**This gate carries no judged rule**: every quality rule at `Q6` is decided by a check.

---

# Part 9 · The decision

**`G6`, and the Product Manager decides it, in two acts.** `SPOCK: mark the PRD agreed`, with one box, their
name, records the agreement in their name and writes the agreed PRD with the name and the date; it refuses an
agent's name. Once the agreed PRD passes its checks, `SPOCK: approve what is in front of me` records `G6`, with
its four boxes: name, role, answers to the gate's questions, and the changes asked for. Under another role it is
recorded as typed, with a heads-up that the Pilot Definition gives `G6` to the Product Manager, unless the role
reads as a slip (stage 1, part 9).

**The Business Analyst carries the stage and does not decide it.** The workflow's general rule holds here:
an agent never records a human decision, and `by_agent` is `false`.

**A retracted stage 6 carries no agreement for a document being withdrawn**, because an agreement left
standing would stand against a document nobody is going to deliver.

---

# Part 10 · Loops and re-entry

| Move | What it costs |
|---|---|
| **A `Q6` remediation cycle** | The agent is instructed to stop at three and return the shape failures to a person. Each gate that finds the documents changed records a round of rework; nothing enforces the cap of three. A missing or unsigned agreement mark is never the agent's: the driver sends it to the person |
| **A `G6` refine cycle** | The agent is instructed to make each change the Product Manager asks for on the draft and, after five, to **escalate to the Product Manager rather than loop silently**. Nothing records or counts a cycle |
| **Rework** | Counted by the workflow at each gate, and at the mark: a draft that changed between being put to the person and being marked agreed leaves a round of rework. On a run started on 1.12 or later the stage's records are fingerprinted too, and a round names them where they changed. Nothing is recorded by hand |
| **A draft changed after the mark** | Marking it agreed again writes the agreed PRD afresh from the draft, and the gate runs again before `G6` is recorded |
| **Changing the MVP** | Stage 5 is sent back with `SPOCK: send a stage back to be redone`, which marks this stage stale where it holds a gate result or an acceptance. A stage 4 choice replaced after approval marks this stage out of date too |
| **Withdrawing the stage** | The agreement goes with it |

**The two loop bounds are different in kind.** Remediation is the producer fixing shape against a check.
Refinement is a person asking for something different. **Three and five, and both are instructions to the
agent**: nothing records or counts either.

---

# Part 11 · Bounds

| Bound | Value | Whose | On reaching it |
|---|---|---|---|
| `Q6` remediation cycles | **3**, or sooner after two changes that leave one check failing or two refusals for the same reason | the agent's, as an instruction: `q_remediation_cycles: "3"` in `skills.yaml`, and the skill; the sooner stop is the shared rules' | Stop remediating; return the shape failures to a person |
| `G6` refine cycles | **5** | the agent's, as an instruction, declared only in the skill | Escalate to the Product Manager; do not loop silently |
| Effort | `synthesis`, **`effort: high`** | — | **The run's largest synthesis: six inputs into one document** |

---

# Part 12 · What the build does not yet do

| Where | The gap |
|---|---|
| §5 | The open compliance items do not yet travel to the PRD |
| §8.2 | Nothing in the run carries an effort estimate |

---

# Part 13 · Open questions

- **Should `A12` and `A13` be two documents?** The agreed PRD is the draft word for word with the agreement.
  A single document with a signed block is the alternative.
- **What happens to a requirement whose measure was never agreed?** The alignment statement makes it visible.
  Nothing refuses it, and `G6` may sign a PRD that says plainly one requirement serves nothing.
- **Does a delivery team receive enough to estimate?** Nothing in the workflow carries effort, and it is the
  question ČS will ask first.

---

# What this spec does not fix

- **`Q6` has no judged half**: every one of its quality rules is decided by a check.
- **Nothing establishes that the requirement is buildable or affordable.** The gate reads structure. **The
  one question a delivery team asks on receiving a PRD is one nothing in the run has an answer to.**
- **An open compliance item can still reach the handover with no owner.**
