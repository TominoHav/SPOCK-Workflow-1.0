# Run State — S2

**Version:** 0.2 · **Date:** 1 October 2026 · **Release:** 1.14
**Parent contract:** [PILOT-BUSINESS-LOGIC.md](../../PILOT-BUSINESS-LOGIC.md)
**Owner:** Igor Tadic

> **What this is.** The run's own record of where it is — which stages have run, what each produced,
> which gates passed, what each stage read, and what has gone stale. One record per run, at
> `{runs_root}/{run_id}/RUN-STATE.md`.
>
> **What this is not.** Not an artifact. It is a **store**, like the competitor store, and it is written
> by the workflow rather than produced by a stage. The build instructions are
> [run-state.instructions.md](../../../.github/instructions/run-state.instructions.md); the writer is
> `.github/scripts/run-state.mjs`; the check that reads it back is **`C38`**, on every quality gate and never
> signable.

---

## 1. Why this is the keystone

Without it the workflow has no memory. Nothing knows a run is in progress, preconditions cannot be
checked, staleness has nowhere to propagate, and the mode is unrecorded.

Four later mechanisms resolve behind it: the decision-record form has somewhere to live, the quality
gates have somewhere to record their result, staleness has a propagation path, and composition has a
place to say which workflow owned each stage.

---

## 2. No agent writes this

**An agent must not write the record of its own progress.** An agent that can mark its own stage
`accepted` can advance a run past a gate nobody ran, and nothing downstream would see the difference.

This is the same principle as Blueprint §5.3 — the checker is independent of the producer — applied to
the record rather than to the output. It is also why validation sits in the gate and no skill runs its own
quality gate.

**Rules**
- **The workflow writes the record.** The workflow is a script, run through the VS Code tasks: an agent is instructed to start a task and never to edit the record, and a decision is recorded by a task a person runs and types into.
- **Agents read it and are instructed never to write it.** An agent whose preconditions are not met is instructed to say what it is waiting for and stop, not to advance the record to make itself runnable. The step guard refuses an agent's write to it, and the checks read the record back.
- **The writer refuses what the gate would catch.** `run-state.mjs` will not write `accepted` without the gates that accept it on the record. Preventive at the point of writing, detective at **C38** — the same rule twice, because a script anyone can bypass is not a control.

---

## 3. Shape

The record carries the run, its stages, and what the run keeps beside them. **The writer emits a field only
where it holds something**, except the run's core fields, each stage's `id` to `artifacts[]` and `know_how[]`, and
four lists (`refinements[]`, `decisions[]`, `know_how_not_read[]`, `stale[]`), so a run written before a field
existed carries no empty block for it.

**At the run**

- **`run_id`** — inherited by every artifact (`C6`)
- **`workflow`** — `discovery` · `problems` · `competitive-analysis` · `free-roam`
- **`mode`** — `discovery` · `free-roam`. **Free roam is the absence of composition**, and the record is where that shows
- **`created_at`** · **`updated_at`**
- **`surface`** · **`surface_observed`** — the surface the person declared and the one the process could observe, kept as two facts
- **`build`** — the build the run was started on, read from `.github/build`; rules that apply only to runs started on a later build read it
- **`person`** — `{ name, role, recorded_at }`, who started the run, typed into `SPOCK: start a run`
- **`jira_key`** — `{ value, recorded_at }`, written by `SPOCK: record the Jira key`
- **`current_stage`** — the first stage neither accepted nor superseded, or `complete`. Derived on every save, never set by hand; a stopped run keeps pointing where it stopped
- **`status`** — `in_progress` · `complete` · `abandoned`. **A different vocabulary from an artifact's**, and `C38` checks it against this list rather than against the artifact statuses
- **`abandoned_by`** · **`abandoned_at`** · **`abandoned_reason`** · **`abandoned_note`** — a run stopped with `SPOCK: stop this run`, its reason one of the four in `ABANDON_REASONS` (`gates.mjs`)
- **`behaviours`** — the composed-behaviour floor in force ([composed-behaviours.md](composed-behaviours.md))

**At each stage**

- **`id`** `1..7` · **`name`**
- **`workflow`** — which workflow owns this stage. Composed stages say so, which is how stage 2 records `problems` while stage 1 records `discovery`
- **`status`** — the shared vocabulary in §4
- **`artifacts[]`** — every artifact this stage produces. **A2 is absent by design:** problem material is supplied by the user and is an input to stage 2, never its output (`C34`)
- **`quality_gate`** — `{ id, result, run_at, run_by, judged_ran, judged_not_run, judged_answered_by_person?, judged_reason, failed[]?, on_accepted[]?, contradictions[]?, regate? }`.
  **`run_by` is required and never names an agent or skill that produces work**: a quality gate is automated,
  so the producer never records its own gate result. The writer refuses one; `C51` catches one that arrives any
  other way. The three `judged_*` fields say which half of the gate actually ran. **`judged_not_run` counts the
  rules no check decides, not the rules nobody answered**: where a person answered the stage's `judged_half`,
  `judged_answered_by_person` follows it with the number of verdicts they gave, derived on every save and
  written nowhere else, so the two counts are not read as one. **`failed[]` names the checks the gate found
  failing and is written only by the checker, only on a clean fail**: it is what a signed exception is read
  against, so a gate result typed by hand carries no list and can never be advanced over. `on_accepted[]` pairs
  a failed check with the earlier accepted stage its finding is about, `contradictions[]` names the recorded
  contradictions `C193` failed on, and `regate` marks a gate the workflow ran again after the stage's decisions
- **`decision_gates[]`** — `{ id, decided_by, decided_at, by_agent: false }` per gate a stage takes; older committed runs carry the singular `decision_gate`, read as the same list and written as the list the next time the writer saves the record. **`C14`** — an agent never records a human decision
- **`owner`** — `{ name, role, recorded_at }`, written by `SPOCK: record who owns this stage`
- **`agreement`** — `{ by, at, recorded_at }`, the PRD's agreement mark, written by `SPOCK: mark the PRD agreed`
- **`supplied_market`** — what a person supplied at stage 3 instead of a market search: the files' hash and counts, written by `market-material.mjs` without reading a word of them
- **`judged_half`** — `{ by, role, at, as_of, asked, verdicts[] }`, a person's answers to the stage's judged rules, kept beside the gate record and never inside it
- **`corrections[]`** — `{ from, to, by, at, reason, places }`, written only by `SPOCK: correct a name on the record`
- **`content_seen`** · **`rework[]`** — what the build saw of the stage's documents at its last gate, and each gate that found them changed
- **`know_how[]`** — `body@version`, as read by this stage

**At the run, after the stages**

- **`refinements[]`** — `{ stage, what, reason, changed, by, role, at, amended_after? }`, one per refinement round. The decision block on the stage's document is the durable copy, and `C40` compares the two
- **`decisions[]`** — `{ stage, kind, what, by, role, at, check?, entries?, affects?, selection?, reason?, cause?,
  by_as_typed?, narrowed_from?, narrowed_by?, superseded_by?, superseded_reason?, by_agent: false }`. `kind` is
  `choice`, `direction` or `exception`. **An `exception` is a person signing a check the run cannot satisfy**:
  it names the check and the reason, it never suppresses the check, and where every check a gate recorded as
  failing carries one the stage advances rather than returning to its skill. The eight checks in
  `NEVER_SIGNABLE` (`gates.mjs`) can never be signed: `C14`, `C32`, `C38`, `C51`, `C143`, `C168`, `C189`
  and `C190`
- **`know_how_not_read[]`** — `{ stage, body, reason }`, a present body a stage did not read, recorded by a person
- **`read_undeclared[]`** — `{ stage, document, why }`, a document a stage read that nothing declared
- **`judged_withdrawn[]`** — a person's answers at a gate, kept when the stage was sent back
- **`stale[]`** — `{ artifact, reason, accepted_by, accepted_at }`, or `rebuilt: true` where the artifact was produced again rather than accepted past

---

## 4. The shared status vocabulary

The same words for a stage and for the artifacts it produces. **They must agree — C38.**

`pending` · `running` · `produced` · `q_failed` · `in_review` · `refined` · `accepted` · `stale` ·
`superseded`

**The vocabulary and the legal moves between these states are the `STATUSES` and `TRANSITIONS` exports of
`gates.mjs`, one definition shared by the writer and the gate**. Which status may follow which, on
what event, and who authorises it is written down in the **§7.3 transition table** of the parent
contract; `legalStageMove` enforces it at write time and **C46** keeps the table, the data and the writer
in step. `blocked` is not one of the nine — it is a transient runtime condition, not a persisted status.

**Rules**
- **A stage is `accepted` only once its quality gate passed, or a person signed every check it failed, and its decision gate was recorded**, where it has one. A signed stage is accepted with its gate result still `fail`. Stage 3 has no decision gate — Q3 is its whole acceptance.
- **An artifact produced inside a stage takes that stage's status once the stage is accepted.** G2's remit is evidence discipline, which is what the intake record and the hypothesis set carry, so accepting stage 2 accepts all four of its artifacts: the intake record, the hypothesis set, the framed opportunities and the prioritised opportunities.
- **`q_failed` returns to the skill, unless a person signs every check the gate recorded as failing** — then it moves to `in_review` carrying the failure, and the record keeps the gate result as `fail` with the signed exception recorded. The signature is the same one and the same act whether it is given before the gate runs or after the stage has parked. **`q_failed → running` withdraws standing signatures**, because that edge is for work about to be rewritten, so a signed stage takes the review edge rather than going back.
- **Nothing is deleted.** A superseded stage keeps its record and is marked, and it is a terminal state — the stale cascade skips it.
- **Advancing past a stale input needs a recorded human acceptance** (C30). `SPOCK: keep a later stage as it is` writes it, through `run-state.mjs accept-stale`; the `stage … accepted` guard refuses a stale stage whose upstream stale inputs are unaccepted.

---

## 5. Staleness

**Re-running a stage marks every later stage that holds an acceptance or a gate result `stale`, and never
deletes it.** Sending a stage back to be redone does the same, whatever changed in it. A later stage still
being written holds no result yet, so it stays with its agent, and its own gate runs on it before anything
accepts it.

**A run does not advance past a stale input unless a person accepts it, and that acceptance is
recorded** — C30. The acceptance names who made it and when, so a tolerated shortfall stays visible
afterwards as a tolerated shortfall rather than as a pass.

---

## 6. Know-how versions

Every stage records which body at which version it read.

**Two runs that behaved differently must be explainable.** A stage that read one version of a body is
never silently compared with one that read another, and bodies change, so the version read is recorded.
