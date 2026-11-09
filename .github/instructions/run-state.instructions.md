---
applyTo: "**/RUN-STATE.md"
description: "The run's own record of where it is. Written by the workflow, never by an agent. Read before starting any stage."
---
# Run State — S2

**One record per run, at `{runs_root}/{run_id}/RUN-STATE.md`.** It is how the workflow knows where a run is:
which stages have run, what each produced, which gates passed, what each stage read, and what has gone
stale.

## No agent writes this

**An agent must not write the record of its own progress.** An agent that can mark its own stage
`accepted` can advance a run past a gate nobody ran, and nothing downstream would see the difference.

The record is written by the **workflow** — in this Proof of Concept, by a script a person or CI runs. **It is a store (S2), not an artifact**, so `check.mjs` holds it out of the artifact sweep and checks it at `C38` instead:

```bash
node .github/scripts/run-state.mjs init     <run_id>
node .github/scripts/run-state.mjs stage    <run_id> <stage> <status> [--artifact A1] [--know-how brief-fields@0.1]
node .github/scripts/run-state.mjs gate     <run_id> <stage> <Q|G> <pass|fail> --by "<name>"
node .github/scripts/run-state.mjs stale    <run_id> <artifact> --reason "<why>"
```

**Agents read it and never write it.** An agent whose preconditions are not met says what it is waiting
for and stops; it does not advance the record to make itself runnable.

## Shape

```text
run_id            inherited by every artifact — C6
workflow          discovery | problems | competitive-analysis | free-roam
mode              discovery | free-roam
adoptions[]       one per piece of free-roam material a governed artifact consumed:
                    artifact · choice · decided_by · decided_at · by_agent: false
                  choice is run_only | both | free_roam_only — the three §4.5 offers and no others.
                  C25 fails when free-roam material reaches a governed artifact with no record here.
                  THE WORKFLOW WRITES THIS. Adoption is a human decision; an agent never records one.
created_at        updated_at
current_stage     the stage due next, or 'complete'
status            in_progress | complete | abandoned
stages[]
  id              1 … 7
  name
  workflow        which workflow owns this stage — composed stages say so
  status          the shared vocabulary below
  artifacts[]     the artifact ids this stage produces. A2 is absent by design — problem
                  material is the user's input to stage 2, never its output (C34)
  quality_gate    { id, result, run_at, run_by } — run_by is required and names what ran the
                  check. Never an agent or a skill: a quality gate is automated, and the
                  producer never records its own gate result (C51)
  decision_gate   { id, decided_by, decided_at, by_agent: false }
  know_how[]      body@version, as read by this stage
stale[]           { artifact, reason, accepted_by, accepted_at }
```

## The shared status vocabulary

The same words for a stage and for the artifact it produces. **They must agree** — `C38`.

`pending` · `running` · `produced` · `q_failed` · `in_review` · `refined` · `accepted` · `stale` ·
`superseded`

**Rules**
- A stage is `accepted` only once its **quality gate passed and its decision gate was recorded** — where it has one. Stage 3 has no decision gate, so Q3 alone accepts it. **`run-state.mjs` refuses to write it otherwise, and `C38` catches it if the script is bypassed.**
- **An artifact produced inside a stage takes that stage's status once the stage is accepted.** The two existing runs disagreed on this and nothing said which was right; settled in [run-state.md §4](../../specifications/definitions/cross-cutting/run-state.md).
- `q_failed` returns to the skill, **unless a person signs every check the gate recorded as failing** — then it moves to `in_review` carrying the failure, and the gate result stays `fail`. The signature works after the stage has parked as well as before; sending it back to `running` first withdraws it.
- **Nothing is deleted.** A superseded stage keeps its record and is marked.

## Staleness

**Re-running a stage marks everything downstream `stale`, never deletes it.** Amending a *bounding*
field of the brief does the same — `outcome`, `market_scope`, `customer_segment`, `topic`.

**A run does not advance past a stale input unless a person accepts it, and that acceptance is
recorded** — `C30`. The acceptance names who made it and when, so a tolerated shortfall stays visible
afterwards as a tolerated shortfall rather than as a pass.

## Know-how versions

Every stage records which body at which version it read. **Two runs that score differently must be
explainable**, and a score produced under one set of bands is never silently compared with one produced
under another.

## Why this is the keystone

Without it: nothing knows a run is in progress, preconditions cannot be checked, staleness cannot
propagate, and the mode is unrecorded. The first real run exposed exactly this — the brief agent had to
**ask the user** whether another run existed, because it had no way to know and correctly refused to
assume.
