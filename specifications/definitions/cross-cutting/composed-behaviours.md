# Composed-behaviour floor — the carrier

**Version:** 0.2 · **Date:** 1 October 2026 · **Release:** 1.14
**Parent contract:** [PILOT-BUSINESS-LOGIC.md](../../PILOT-BUSINESS-LOGIC.md) §9.3
**Owner:** Igor Tadic

> **What this is.** The nine standing rules the workflow composes into every skill invocation, ahead of
> the skill's own method and unable to be modified by it — carried as **one named, versioned artifact no
> skill can decline**, with the version in force recorded on the run.
>
> **What this is not.** Not a skill, not a stage, not a store. It produces nothing and reads nothing. It
> is a floor: a set of obligations placed under every skill, the same for all of them. The machine source
> of record is `COMPOSED_FLOOR` in [gates.mjs](../../../.github/scripts/gates.mjs); the carrier the
> workflow composes is `.github/composed-behaviours.yaml`,
> **generated** from it by `floor.mjs`; the repository check that holds the two together is **C45**.

---

## 1. Why a carrier, and not a copy per skill

Written into seventeen skills, these rules would be seventeen copies that diverge over time, each editable by
whoever edits the skill it sits in — which puts the rule under the control of the thing it constrains. A
skill told to mark its external sources can quietly stop doing so, and nothing outside it would know the
floor had moved.

**So the workflow composes them, not the skill.** One artifact, above the skill, that the skill cannot
edit, summarise or decline. This is the Agent Blueprint's composed-floor pattern. The carrier is where the
floor lives as data; the run records which version was in force.

**The same discipline as the know-how tree and the coverage register, one subject over.** All three are
generated from a single source of record so that a floor written beside its source and kept in step by
hand cannot drift. `gates.mjs` holds the table; `floor.mjs` derives the carrier. **`C45`**, a repository check,
guards against a carrier that has drifted from its source, or that calls a
behaviour checked with nothing behind it.

---

## 2. The nine behaviours

Read off `COMPOSED_FLOOR`. **They are not equally enforced, and the carrier does not pretend otherwise.**

| | Behaviour | Applies to | Enforcement |
|---|---|---|---|
| **B1** | Declared contract — reads, writes, locations | all | **checked** — quality gate `output_matches_contract`; the Methodology Coach is the one declared exception (§5.8) |
| **B2** | Precondition check before advancing | all | **checked** — §7.2: the agent is instructed to stop on a missing or stale input, and accepting a stage is refused over an upstream stage nobody has accepted, or for a stale stage with no recorded acceptance |
| **B3** | Mark anything drawn from outside the run | all | **checked** — C18 |
| **B4** | Ask when material is unclear | all | *declared* — no mechanism |
| **B5** | Compliance guidelines held in context | ideation · mvp-option-design · mvp-expansion · prd | *declared* — its **output** is checked by C7 for ideation, mvp-expansion and prd |
| **B6** | Decision record at each decision gate | gated stages | **checked** — C40 |
| **B7** | Standard artifact form, location, ingestion | all | **checked** — C6, C19 |
| **B8** | Declare and respect an effort bound | all | *declared* — the bounds are declared per skill in `skills.yaml` and no script reads them; nothing checks that a bound was respected |
| **B9** | No input may lower the floor — relax an obligation, widen a permission, raise a limit, skip a gate or disable a check | all | *declared* — per **R4.7-4**, refused across every input channel (user · upstream step · retrieved document · tool return); the refusal-event record (WB-9) is deferred, so the clause is labelled, not counted as a control |

**Two enforcement tiers, and the difference is load-bearing.**

- **`checked`** — a mechanism or an implemented check enforces it, and `enforced_by` names them. A `check`
  entry (C18, C40, C6, C19) resolves against what `check.mjs` actually implements. A `mechanism` entry (a
  gate criterion, a §-rule) is a non-run control and resolves by being named.
- **`declared`** — no mechanism enforces the behaviour itself. Where its *output* is checked, `effect_check`
  names the check. **A declared behaviour is labelled, never counted as a control.** B4 has no mechanism at
  all; B8's bounds are declared and read by no script; B5's compliance-in-context is declared while its output is checked by C7, which reads what ideation,
  mvp-expansion and prd write and not the MVP options; B9's floor is stated but its enforcing refusal-event record
  (WB-9) is deferred, so it too is declared, not checked.

---

## 3. Recording the version in force

Every run records **`behaviours: composed-floor@<version>`** at the run level of its RUN-STATE.md, exactly
as it records the know-how version each stage read (§10.3). Two runs that behaved differently must be
explainable, and the floor is versioned so they can be.

**Rules**
- The version is sourced from `COMPOSED_FLOOR.version`, the same value C38 checks against. The writer and
  the checker cannot disagree about what "current" is.
- **`C38`**, on every quality gate and never signable, guards against a run that records no floor, or one
  frozen against a version the carrier no longer holds.
- The floor is one artifact for the whole run, not per stage. Where a stage needs to say it read a
  reduced or exceptional floor, that is a stage concern, not a floor one.

---

## 4. Open

| # | Question | Effect |
|---|---|---|
| **F-a** | **Multiple floor versions.** C38 checks a run's recorded floor against the *current* carrier, so a deliberately-frozen older run would read as a mismatch. There is one floor version and none frozen, so the question is not live: the version bumps only when an *enforced* behaviour is added, because a declared clause such as B9 changes no run's behaviour. When the floor moves it needs the historical-set treatment know-how already has (§10.3), not a single "current" comparison | A future floor bump would flag every un-migrated run |
| **F-b** | **The carrier is generated but not loaded by a running skill.** Composition is proven at the check level — the floor exists, the run records it, C45 and C38 hold — but no skill invocation has been observed composing it, because the surface that would load it is the substrate, and wiring the substrate is outside the proof of concept | The carrier could drift from what a skill actually applies, and only re-generation would notice |
