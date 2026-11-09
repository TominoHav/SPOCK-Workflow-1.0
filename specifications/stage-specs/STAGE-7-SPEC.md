# Stage 7 — specification

**2 October 2026** · **Release:** 1.14

**This describes the stage that exists, not the stage that was designed.** Every rule in parts 1 to 11 is
read off the build — the workflow contract, the two skill files, the gate model, the initiative template or
another bound body — and where the build does not yet do something the stage needs, the part it belongs to
says so, with the reason, and part 12 lists where. **One of this stage's two artifacts has never been
produced**, and part 1 says so before anything else.

**Parent contract:** [PILOT-BUSINESS-LOGIC.md](../PILOT-BUSINESS-LOGIC.md). **Both describe the latest
release, and where either disagrees with the build, that document is the defect.**

---

# Part 1 · Purpose and scope

## 1.1 What the stage is for

**Stage 7 writes the document Česká spořitelna actually receives.** Everything before it is the workflow's
own shape; this one is written against **a thirteen-section template owned by ČS's Product Management
Guild**, not by this project.

**It is the only stage whose output format belongs to the customer**, and that single fact governs most of
what follows.

## 1.2 The second artifact has never been produced

**`A15`, the Jira initiative, is parked and no run has produced one.** The propagation binding waits on a
decision about which Jira instance is authoritative.

**It is not best-effort.** *Best effort* would mean attempted and possibly failing. **The state is not
attempted and not connected**, and every complete run is excused from producing it by name rather than
silently.

## 1.3 What the stage does not do

| | |
|---|---|
| **It never invents a Jira identifier** | The key is the person's, recorded on the run record with `SPOCK: record the Jira key`, and the initiative is written from it. Where it reads *none yet*, the initiative says so |
| **It never writes the PRD agreement block** | That is stage 6's, and `SPOCK: mark the PRD agreed` writes it rather than any producer |
| **It does not decompose into epics** | **The pilot removed that extension.** A decomposition written here is a delivery act performed by discovery |
| **Propagation never blocks the run** | The skill's own heading is *You are allowed to give up* |

## 1.4 What good looks like

**Thirteen sections present**, every claim drawn from the agreed PRD or marked an assumption, no invented
identifier, and **the document written in the language the run declared.**

## 1.5 What poor looks like

**An initiative in a language the run did not declare.** The template, the voice body and the skill all say
the language comes off the run's own brief and is never inferred, and **no instruction states a language
unconditionally**, because one that does overrides every body saying the language comes off the brief.

**The system writes the headings**, because a producer copying the template's skeleton delivers them in the
template's language while every check passes. **The envelope step writes every section heading of `A14` from
`gates.mjs` in the language `A1` declares** (`C16`).

---

# Part 2 · Inputs

**One document, and it is the narrowest input set in the workflow.** The contract's `initiative` step and the
registry name `A13` alone, and so does the skill page; the skill's text also reads the language `A1` declares
(`R3.1.4`) and the Jira key on the run record (`R3.1.5`).

| | | what it gives |
|---|---|---|
| `A13` | **the agreed PRD** | everything the initiative says. No other document of the run is read for content |
| `A1`'s `language` | the run's language | the language the initiative is written in, read off the brief and never inferred |
| The run record's `jira_key` | **the Jira key**, typed by the person | the initiative's id and Jira link. **Mandatory**, and `none yet` is an answer |

**R2.1 — The agreement is verified before the stage starts.** The skill's own section is *Verify the
agreement before you start*. **A PRD without a completed agreement block is not `A13`**, and a stage that
began on a draft would be writing the bank's document from something nobody signed.

**R2.2 — Know-how.** `product/initiative-template.md` fixes the thirteen sections and the frontmatter keys
· `method-canon.md` (§4.7 is what this stage is for) · the writing bodies.

**R2.3 — There is no compliance binding.** The four area cards are not read here. What reaches the
initiative is what the PRD carried.

---

# Part 3 · The steps

### Step 1 — Authoring

**R3.1.1 — Verify the agreement first.** Before anything is written.

**R3.1.2 — The thirteen sections come from ČS's template and the set is not this project's to change.**

**R3.1.3 — Every claim is drawn from the agreed PRD or marked an assumption.** The stage synthesises
nothing new: it re-expresses one document in the shape the bank reads.

**R3.1.4 — The document is written in the language the run declared**, read off the brief and never
inferred. **Field names, ids and record values stay English on every run**, which is what lets a Czech run
and an English run pass the same gates.

**R3.1.5 — No identifier is invented.** The Jira key is on the run record under `jira_key`, typed by the
person into `SPOCK: record the Jira key`: one box, the key Jira shows on the initiative, as in `PROJ-1234`, or
`none yet`. Run again, it replaces the key on the record and says what it replaced. Where the record carries
none, the agent is told to name the task to the person and end its turn, and to write the initiative's
`initiative.id` and `jiraLink` from the key with `id_basis: jira`, or `none yet` in both. **On a run started on
1.10 or later the gate holds the initiative's id to the recorded key** (`C16`).

**R3.1.6 — No decomposition into epics.** Removed by the pilot.

**R3.1.7 — The reading copy is written by a task and must say what the initiative says.**
`SPOCK: stage 7 — the reading copy` writes `read/7-initiative/initiative.md` from `A14` with its machine record
stripped. On a run started on 1.10 or later, an initiative edited after its reading copy was written fails the
gate (`C16`), naming the copy and the task that writes it again.

### Step 2 — Propagation

**R3.2.1 — It is parked and has never run.**

**R3.2.2 — It never edits `A14` and never blocks the run.**

**R3.2.3 — Two retries, then stop and record.** **An unreachable host does not become reachable by asking a
third time.**

**R3.2.4 — The output is a propagation record rather than an initiative.** `7-initiative/jira-initiative.md`
records what was attempted and what came back.

---

# Part 4 · The output and its sections

| | File | Class |
|---|---|---|
| `A14` Initiative document | `7-initiative/initiative.md` | **output** |
| `A15` Jira initiative | `7-initiative/jira-initiative.md` | asset, **parked and never produced** |

**Thirteen sections, owned by ČS's Product Management Guild.** The template fixes both the section set and
the frontmatter keys, and the workflow's own `documentation-standards` §3 set does not apply here: **this is
the one document in the run written to somebody else's shape.**

**The headings follow the run's language and the keys do not.** That split is the whole reason a Czech run
and an English run can be graded by one set of checks.

**The workflow writes the initiative's frame before the agent writes**: the record's identity and sources, the
title and the template's sections in the run's language, with `[[fill: …]]` in every place that is the agent's,
never over a file on disk. The initiative carries no opening block and no closing pair.

**The envelope step writes the headings.** `SPOCK: fill in the envelope` replaces each section heading of `A14`
with the name `gates.mjs` gives that section in the language `A1` declares, so a producer's wording matters
only for placing a section: its id or either of its names, in order. **A heading it cannot place is refused and
nothing is written.** A heading deeper than a section is the producer's and stays as written, and the title
line is never touched.

---

# Part 5 · Compliance

**Stage 7 runs no screen and reads no area card.** It declares none, and the contract binds none.

**What reaches the bank on compliance is whatever the agreed PRD carried.** **The open compliance items do not
yet travel to the PRD**, because no field on `A11` or on the PRD template carries them, so an item answered
nowhere upstream arrives here as whatever the PRD said about it, which may be nothing with nobody named
against it.

**Nothing in this stage would notice.** There is no check here that reads a compliance field, because this
stage's checks are about the template and the provenance of claims.

---

# Part 6 · Scoring

**Stage 7 produces no score and carries none.** Nothing in the initiative ranks, weighs or sorts.

---

# Part 7 · Artifacts and records

| Artifact | Written by | Record |
|---|---|---|
| `A14` | `initiative-authoring` | `initiative` |
| `A15` | `initiative-propagation` | — **never produced** |

**The output is assembled from its record and does not stand alone.**

**The run record's stage 7 block is the last one written**, and `G7` is what marks a run complete.

---

# Part 8 · Gates and checks

## 8.1 What `Q7` is

**Seven checks of its own and forty-five universal**: `C12`, `C13`, `C16`, `C57`, `C111`, `C175`, `C190`.

**It is the smallest own-set of any gate after `Q1`'s**, which follows from the stage synthesising nothing:
most of what could go wrong here went wrong earlier.

**Each check's full rule is in the check register** (see the README); the table says what each guards against.

| Check | Gate | What it guards against |
|---|---|---|
| `C12` | `Q5`, `Q6`, `Q7` | An initiative that cannot be traced back through the agreed PRD to the problems the run found |
| `C13` | `Q6`, `Q7` | Stage 7 writing the bank's document from a PRD nobody is recorded as agreeing |
| `C16` | `Q7` | An initiative that is incomplete, carries a Jira key nobody recorded, or says something its reading copy does not |
| `C57` | `Q7` | A document produced by a step that is parked |
| `C111` | `Q7` | The workflow's internal codes reaching the bank's reader |
| `C175` | `Q7` | The bank's reader being told the run was a test or not real |
| `C190` | `Q3` to `Q7`, never signable | Material in the run that never came in through intake, or changed after it did |
| `C122` | every gate | A document written in a language the run did not declare |

**No check reads a claim against the agreed PRD.** *Every claim drawn from the agreed PRD or marked an
assumption* is the skill's rule, and `C12` reads the declared lineage rather than the sentences.

## 8.2 The gate that reads across a stage boundary

**The gate reads across the boundary through lineage and the agreement, not through content** (`C12`, `C13`). **Nothing compares what the initiative says with what the agreed
PRD says**, so an initiative can pass `Q7` carrying a claim the PRD does not support.

**`C122` and `C175` decide a property of prose rather than of structure**, and neither reads meaning.

## 8.3 What the gate cannot decide

**Nothing decides whether the bank would fund this.** Thirteen sections present, the lineage declared, no
invented key: **a well-formed initiative for a bad idea passes `Q7`.**

**No automated judge runs a judged rule at this gate; the person who signs `G7` answers them in the
approval**, and a question left out is recorded as skipped.

---

# Part 9 · The decision

**`G7`, Product Manager: initiative approved as a delivery item.**

**It is the run's last decision and the one that marks it complete.** It is taken with
`SPOCK: approve what is in front of me` and its four boxes: name, role, answers to the gate's questions, and the
changes asked for. Under another role it is recorded as typed, with a heads-up that the Pilot Definition gives
`G7` to the Product Manager, unless the role reads as a slip (stage 1, part 9).

**A person signing at `G7` is signing work whose shape they may not be able to see**, which is why every
decision a person made earlier in the run is required on the record with the role they made it in.

---

# Part 10 · Loops and re-entry

| Move | What it costs |
|---|---|
| **A refine cycle** | The agent is instructed to escalate to the Product Manager after three. Nothing records or counts a cycle |
| **A propagation retry** | The skill instructs two, then stop and record. Propagation is parked and has never run |
| **Changing the PRD** | Stage 6 is sent back with `SPOCK: send a stage back to be redone`, which marks this stage stale where it holds a gate result or an acceptance |
| **Changing the Jira key** | `SPOCK: record the Jira key` again, which records the new key on the run record, replacing the old, and says what it replaced. **It changes nothing in the initiative**: the producer writes `initiative.id` and `jiraLink` again from the new key, and on a run started on 1.10 or later the gate holds it to the key recorded (`C16`) |
| **Changing the initiative after its reading copy** | `SPOCK: stage 7 — the reading copy` writes the copy again from the initiative; until it does, the gate fails on a run started on 1.10 or later |
| **Withdrawing the stage** | A workflow act, recorded |

**There is nothing downstream to send the run back from.** Stage 7 is the end of the workflow, and what
delivery does next is governed elsewhere.

---

# Part 11 · Bounds

| Bound | Value | Whose | On reaching it |
|---|---|---|---|
| Refine cycles | **3** | the agent's, as an instruction, declared only in the skill | Escalate to the Product Manager |
| Propagation retries | **2**: `attempts: "3"` in `skills.yaml`, two retries in the skill | the agent's, as an instruction | Stop and record. **An unreachable host does not become reachable by asking a third time** |
| The template | **13 sections and the frontmatter keys** | **ČS's** | It is otherwise the bound |

---

# Part 12 · What the build does not yet do

| Where | The gap |
|---|---|
| §1.2 | `A15` propagation is parked and has never run |
| §5 | The open compliance items do not yet travel to the PRD, so nothing reaches this gate to refuse |

---

# Part 13 · Open questions

- **Which Jira instance is authoritative?** It is the only thing between `A15` being parked and being built,
  and it is ČS's answer rather than this project's.
- **Does the Czech read as Czech to a native speaker at the bank?** `C122` counts function words, which
  checks that the language is Czech and not that the Czech is good.
- **Is the thirteen-section template still current?** It is ČS's document, the template here is a copy, and
  nothing in the build notices if the Guild changes it.

---

# What this spec does not fix

- **No automated judge runs the judged half of `Q7`**, and this is the gate whose output a bank reads. The
  person who signs the gate answers it in the approval.
- **Nothing establishes that the initiative is one the bank would fund.** Every check here is structural.
- **Nothing notices if ČS changes its own template.** The build holds a copy and compares it to nothing.
- **`A15` has never run**, so the claim that this workflow ends in a delivery system is untested end to end.
