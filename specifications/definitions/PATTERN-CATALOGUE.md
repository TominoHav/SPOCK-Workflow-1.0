# SPOCK Area Pattern Catalogue

**Version:** 0.2 · **Date:** 1 October 2026 · **Release:** 1.14 · **Status:** Registered
**Parent:** Agent Blueprint Specification v2.1 §4.6 · **Owner:** Igor Tadic

> **What this is.** The SPOCK area's extension to the Blueprint's registered pattern catalogue. It
> adds patterns the central catalogue does not carry. It **does not redefine** any central pattern —
> the Blueprint forbids that, and nothing here attempts it.

---

## 1. Why an extension exists

The Blueprint requires every skill and every workflow to declare a pattern from the registered
catalogue, and states that **an unrecognised pattern is a validation error, not a warning.**

The central catalogue's five skill patterns are `single-shot`, `research-loop`, `critique`,
`quarantined-extract` and `synthesis`. **None of them describes a multi-turn conversation with a
person.** `single-shot` is explicitly *"one pass, no tools"*; `research-loop` requires retrieval.

Five of the pilot's seventeen skills are exactly that: person-facing, multi-turn, gathering or explaining
rather than retrieving. Without a pattern they cannot declare one, and cannot be validated.

The Blueprint permits this: *"a area may extend the catalogue but may not redefine an existing
pattern."* So this is a registration, not a change to the canonical document.

**Rules**
- This catalogue is registered and versioned like any other governed artifact.
- It adds only. Where a central pattern fits, the central pattern is used.
- Only catalogue membership is machine-checked: **`C47`**, a repository check, guards against a binding or
  registry entry declaring a pattern outside the `PATTERNS` list in `gates.mjs`, which is kept by hand beside
  this page rather than read from it. Whether a
  skill declares what its pattern requires is read by a person reviewing the registry.

---

## 2. Registered skill patterns

| Skill pattern | Executes as | Required by the pattern | Characteristic failure |
|---|---|---|---|
| `elicitation-dialogue` | a multi-turn conversation with a person, gathering or resolving a declared set of fields | a declared field set · a turn bound · a per-field attempt bound, optional · an explicit not-supplied record | **filling a field the person did not supply** |
| `best-effort-propagation` | a single bounded attempt to push a completed, human-agreed record into an external system of record, whose failure does not fail the run | a bounded retry ceiling · a terminal `stop_and_record` · a declared target host · the record it propagates, complete independently · `by_agent: false` | **a failed push silently failing the run, or retrying without bound** |

### 2.1 `elicitation-dialogue`

The pattern covers any skill whose work is a conversation with a person rather than retrieval or a
single pass — gathering fields, resolving ambiguity in material, taking direction, or explaining.

**What the pattern requires, and why each requirement exists**

- **A declared field set.** What the conversation is trying to establish. Without it the skill converses without terminating.
- **A turn bound.** A conversation with no ceiling is a skill nothing can stop.
- **A per-field attempt bound, where the skill wants one.** The global bound does not catch grinding on one hard field while the rest go unasked. It is optional, because a cap on one field can end a conversation the person is still willing to have: `brief-creation` declares a turn bound and no per-field cap, so a field is recorded as not supplied only when the person does not supply it.
- **An explicit not-supplied record.** Every field the conversation failed to establish is recorded as not supplied, with a reason. This is what makes the characteristic failure detectable.

**The characteristic failure is inference.** A skill in this pattern that fills a gap from context has
produced a field indistinguishable from one the person gave it — well formed, correctly typed, and
wrong. **No downstream check can catch it**, because there is nothing structurally different about an
invented value. The pattern's requirements exist so that "not supplied" is always a recordable outcome,
which is what makes not inferring possible.

**Rules**
- A skill declaring this pattern **may not infer, default, or derive** any field in its declared set.
- Reaching a declared bound is recorded, in `bounds_hit` on the production record. Silent truncation is the failure the bounds prevent.
- The pattern implies no tool access. A skill in this pattern that also retrieves declares `research-loop` instead, and its conversational half is bounded separately.

### 2.2 `best-effort-propagation`

The pattern covers a skill whose job is to push an already-completed, human-agreed record into an external
system of record — a Jira issue, a tracker — where the push is **best-effort**: the run has already
completed on the deliverable, and a failed or absent push does not fail it. Registered because
`single-shot` (*"one pass, no tools"*) does not fit a step that holds a write capability and retries.

**What the pattern requires, and why**

- **A bounded retry ceiling and a terminal `stop_and_record`.** An unbounded retry is not a disposition, and a write capability that keeps trying is not safe.
- **A declared target host**, governed by egress (§6.4) under deny-by-default. The one binding on this pattern, `initiative-propagation`, is parked until its Jira host is named.
- **The record it propagates, complete independently** of the push — its consumer checks the deliverable without reference to the propagation record.
- **`by_agent: false`** — the external identifier is read back from the target, never invented.

**The characteristic failure** is a failed push either failing the run (it must not) or retrying without
bound. The pattern makes the push's success optional and its extent bounded.

**Rules**
- The deliverable is complete and checked independently of the propagation record.
- The push is bounded and terminates in `stop_and_record`.
- The external identifier is never invented; it is read back from the target, or the field is recorded as absent.

**Declared by** `initiative-propagation` (Business Analyst, stage 7.2), because a push that holds a write
capability and retries is not a single pass.

---

## 3. Which skills declare it

`skills.yaml` and `agents.yaml` give `elicitation-dialogue` to these five skills and to no other.

| Skill | Agent | Declared set | Note |
|---|---|---|---|
| `brief-creation` | Product Manager | The Brief Fields set | The acute case — its output is the OST root |
| `opportunity-framing` | Opportunity Designer | The three asked fields of each stage-2 hypothesis | One opportunity per hypothesis; a supplied root cause or customer impact is marked as judgement |
| `prioritisation` | Opportunity Designer | Which opportunities are promoted | The decision is the person's; the skill records it |
| `methodology-guidance` | Methodology Coach | The person's question about the method | Writes no artifact; the bound still applies |
| `workflow-support` | Workflow Support | The person's question about a run's state | Writes no artifact and changes nothing; the bound still applies |

**Each of the seventeen bindings declares one pattern, and no skill is bound twice**, so no skill in the
registry changes pattern by shape. **A second execution shape is a second skill, never a second pattern on
one skill**: Competitive Analysis runs its shapes as `landscape-mapping`, `market-content-extract`,
`deep-dive` and `synthesis`, each declaring one pattern at its own binding.

---

## 4. Open

| # | Question | Effect |
|---|---|---|
| **PC-b** | Whether this catalogue belongs in the pilot's folder or in the Ecosystem Builder documents beside the Blueprint. **Recommendation: move it beside the Blueprint once a second area needs it** — it is an area artifact, not a pilot artifact, and the pilot is only its first consumer | Filing, not substance |
