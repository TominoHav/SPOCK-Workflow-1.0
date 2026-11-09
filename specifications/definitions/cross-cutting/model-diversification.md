# Model diversification — the independent checker

**Version:** 0.3 · **Date:** 1 October 2026 · **Release:** 1.14 · **Status:** §3 built and enforced by C47, C50 and C51; the checker itself is absent by declaration
**Parent contract:** [PILOT-BUSINESS-LOGIC.md](../../PILOT-BUSINESS-LOGIC.md) · **Owner:** Igor Tadic
**Blueprint:** Agent Blueprint Specification v2.1 §5.3 (R5.3-2, R5.3-3), §5.2, §7.4

> **What this is.** How a second model family is declared, bound to the checker, and enforced — and what
> the build does while none exists. It specifies the *mechanism*, not the choice: enabling a family,
> sampling a human, or accepting the gap are all satisfiable by the design below.

---

## 1. The problem, stated structurally

**The Blueprint requires two things this pilot does not have.** Subjective quality is judged by a different
model family than produced the output (**R5.3-2 / AB-24**), and the checker can stop the work
(**R5.3-3 / AB-25**).

**The model is declared and governed. A second family is not configured.**

| Where you would expect a model | What is there |
|---|---|
| `.github/registry/agents.yaml` | **no `model` field** |
| `.github/registry/skills.yaml` | **`execution: { family, model }` on every binding — the only place a binding's model is declared.** The models a pin may name are `MODEL_CATALOGUE` in `gates.mjs` |
| `.github/agents/*.agent.md` (6 wrappers) | **no `model` field**, because a pin no script reads governs nothing |

So the model is **part of the governed definition of every binding**. C47 validates `family` against the
closed vocabulary and requires the pin, and `area.md`'s area default names the same family and pin. **Every
binding declares the same family**, so a checker drawn from it would share the producer's lineage, and
`independent_checker` in `assurance.yaml` declares `state: absent` with the reason.

**Two consequences follow.**

1. **No run record carries the model that produced it.** The registry says what a binding runs on, and a
   finished run cannot show it.
2. **A Copilot model label is a menu entry, not a version.** The behaviour can change behind an
   unchanged label, which is why AB-53 requires re-derivation on a cadence against the declared pin.

---

## 2. What the diversification is actually worth

**Measured, not assumed.** Every gate-bound rule carries its `instrument:` in `gates.mjs`, and
`node .github/scripts/facts.mjs` prints the split: `rules_mechanical`, `rules_mechanisable` and
`rules_judged`, and within the judged rules `rules_judged_reader_decidable` against
`rules_judged_process_reach`.

| Kind of rule | Consequence for this spec |
|---|---|
| Decided by an implemented check (`mechanical`) | **Never needs a second family** |
| Needs no judge, only a check nobody has written (`mechanisable`) | Does not need a second family either |
| Judged, about **how the output was produced** (process reach) | **A second family cannot decide these.** No reader of the artifact can see them — they need capability enforcement or a transcript |
| Judged, about **artifact quality** (reader-decidable) | **This is what a second family buys** |

**Design consequence.** The judge is a **small, bounded component deciding the reader-decidable rules**, not
a parallel verification system. It is specified accordingly: one interface, one verdict shape, no
orchestration.

---

## 3. The design

### 3.1 The model becomes a governed field

**Declared per binding, in `skills.yaml`, with an area default.** The binding is the unit that runs, so it
is the unit that carries the model — the same argument that put capabilities on the binding (§4.3).

```yaml
    execution:
      family: anthropic-claude          # the FAMILY, closed vocabulary
      model:  claude-sonnet-5           # the pinned identifier within it
```

**`family` is the governed word and `model` is the pin.** They are kept apart because R5.3-2 constrains the
*family* and AB-53 re-derives against the *pin*.

**The area default** in `area.md` names the same family and pin, and every binding in `skills.yaml` still
declares both, because C47 validates the binding and not the default.

### 3.2 The checker declares its own, and it must differ

```yaml
independent_checker:
  execution:
    family: <a family that is NOT the producer's>
    model:  <pinned>
  authority: may_fail_a_step
  operated_by: harness                  # not an agent, not invocable from one
  state: configured | absent
  absent_reason: "<why, when state: absent>"
```

**`state: absent` is a first-class, legal value.** A pilot with no second family is not misconfigured; it
is a pilot whose judged half does not run, **and which says so at every gate**. This is the whole difference
between the design and a design that pretends.

### 3.3 The judge is an interface, not a judgment

`.github/scripts/judge.mjs`, and **it produces no verdict itself.** It resolves the rules bound
to a gate, resolves the checker declaration, and does exactly one of:

| Checker state | Behaviour |
|---|---|
| `absent` | **Exit 4**, naming every rule it did not run and the declared reason. Never exit 0 |
| `configured` | **Exit 4.** Dispatch to a second family is not built, so a configured checker is refused with the same instruction to supply verdicts through `--verdict-file`; a checker on the producers' own family is refused as well |
| `--verdict-file <path>` | Ingest verdicts produced **outside** — a sampled human check, or a family reached by other means — through the same door. Each verdict names its `rule`, `verdict`, `source` and `decided_by`, and a `source` of `same_family` is refused. Each verdict reads `verdict: pass` or `verdict: fail`, lower case and nothing else; any other value is refused, because a value read as a pass by default is a failing verdict that never reaches §3.4. Each verdict must name a judged rule the gate carries, and **every one of those rules must appear in the file** — a file covering some of them, or none, is refused with **exit 4** naming the rest, because a gate whose rules nobody judged is not a gate whose judged half passed. A file holding a failing verdict exits 1 and prints the command that records the gate as failed |

**The `--verdict-file` door is why the three options are one design.** Enabling a family, sampling a human,
and accepting the gap differ only in what arrives at this interface.

### 3.4 A judged verdict blocks through machinery that already exists

**No new blocking mechanism is built.** A failing judged rule is recorded exactly as a failing mechanical
one:

```
judge.mjs → verdict: fail
          → run-state.mjs gate <run_id> <n> Q<n> fail --by "judge.mjs, <family>"
          → produced → q_failed   (the graph's sole auto edge)
          → back to the skill; no signature can cover it
```

`run-state.mjs` already refuses `in_review`, `refined` and `accepted` unless the quality gate passed or a
person signed every check it failed, and `legalStageMove` already refuses the forged edges. **A judged fail
names no failed check**, so there is nothing a person can sign and the stage always goes back to its skill. **AB-25 is satisfied for the mechanical checker today;
this extends the same path to the judged one rather than inventing a second.**

### 3.5 What enforces the design

| Check | Where it runs | What it guards against |
|---|---|---|
| **C47** | Repository check | A binding with no model family, a family outside the closed vocabulary, or no pin |
| **C63** | Repository check | A pin naming a model the catalogue does not hold, or one it marks retired |
| **C50** | Repository check | **A checker sharing the producers' family**, or one absent without a stated reason |
| **C49** | Repository check | Assurance recorded as current after what it proves has changed or its interval has passed (AB-53) |
| **C51** | Every quality gate, never signable | A gate result recorded by an agent or skill that produces work |

Each check's full rule is in the check register, `.github/COVERAGE-CHECKS.md`.

### 3.6 What the run records

Each quality gate record carries `judged_ran`, `judged_not_run` and `judged_reason`: how many of the gate's
quality rules a check decides, how many no check decides, and why those did not run. It names no checker
family, because none is configured. **The run is then answerable to the question "who checked this, and with
what" without reading the build.**

---

## 4. What this does NOT solve

**The process-reach judged rules are about how the output was produced** — that a landscape was
authored only from the quarantine bridge's extract, that no instruction inside fetched content was followed,
that an initiative reached no fact the PRD did not carry. **A second family reading the finished artifact
cannot see any of them.** They need capability enforcement at runtime or a retained transcript, and both are
out of scope here and should not be claimed by this work.

**Stating that is part of the specification.** A diversification programme that implies it closed every
judged rule when it closed only the reader-decidable ones is the overclaim this repository exists to refuse.

---

## 5. What exists, and what waits on the decision

1. **The rules are classified.** Every gate-bound rule carries its `instrument:` in `gates.mjs`, which is
   the column everything else needs.
2. **Every gate states which half of itself ran**, and the run record carries the judged tally, whatever
   the model decision turns out to be.
3. **The model is a declared field** (§3.1), and C47 validates the family and requires the pin.
4. **C50 and C51 are built.** The checker's family must differ from every producer family it judges, and no
   quality gate is run by the stage's own producer.
5. **`judge.mjs` refuses while the checker is absent** (§3.3): it exits 4, names every rule it did not run,
   and takes verdicts from outside through `--verdict-file`.
6. **Wiring a family, or a `--verdict-file` from a sampled human, is what waits on the decision.**

**None of steps 1 to 5 needed a second family to exist.**
