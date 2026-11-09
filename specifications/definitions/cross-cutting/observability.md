# Observability — records, traces, logs and metrics

**Version:** 0.2 · **Date:** 1 October 2026 · **Release:** 1.14 · **Status:** records built · traces built as a receiver: the client writes them, `trace.mjs` reduces them to the set `.github/registry/tracing.yaml` declares, and C92 resolves every trace an artifact names · metrics read on demand by `metrics.mjs` · logs deliberately absent
**Parent contract:** [PILOT-BUSINESS-LOGIC.md](../../PILOT-BUSINESS-LOGIC.md) · **Owner:** Igor Tadic
**Blueprint:** Agent Blueprint Specification v2.1 §7.1 (the record), §7.2 (tracing), §8.2 (operational observability)

> **What this is.** What this pilot can observe about its own work, what it cannot, and which of those
> absences are decisions and which are gaps. It exists because the four things usually filed together
> under observability answer four different questions, and only one of them is what a governed discovery
> workflow actually runs on.
>
> **The rules for tracing are the Agent Blueprint's** (§7.2, AB-46 to AB-48) and are cited here, never
> restated. What this document adds is the pilot's position against them.

---

## 1. Four kinds, and what each answers

| | Answers | Written by | Read when |
|---|---|---|---|
| **Record** | Is this output acceptable, and who said so | the step, as its product | at a gate, and in an audit afterwards |
| **Trace** | What did the step actually do | something other than the step | when the record is not enough to decide a rule |
| **Log** | What happened, in order | the runtime | after a failure, to reconstruct it |
| **Metric** | How often, how fast, how much | an aggregator over the other three | when you need the rate rather than the case |

**A record is a durable statement about a finished piece of work.** Every artifact in this pilot carries
one, in its front matter, and it is the surface a person decides on:

```yaml
run_id: 2026-01-mortgage-onboarding
artifact_id: A3
produced_by:
  agent: hypothesis-designer
  skill: hypothesis-authoring
could_not_verify:
  - rule: "never reads A2 raw material, only the A2b intake record"
    needs: judge
    reach: process
```

The run record is the second kind, one entry per stage, and it is what makes a run inspectable without
opening every artifact:

```yaml
quality_gate:
  id: Q1
  result: pass
  run_by: "check.mjs, run independently of the producer"
  judged_ran: 2
  judged_not_run: 1
decision_gates:
  - id: G1
    decided_by: Jana Novakova
    decided_at: 2026-08-10
    by_agent: false
```

**A trace follows one unit of work through its steps and records what each one touched.** Here the client
writes it, `trace.mjs` reduces it to the set `tracing.yaml` declares (the task `SPOCK: reduce a raw trace`), and no
committed run carries one.
Illustration only, and the line that matters is marked:

```
run 2026-01 · stage 2 Problems                                18.4s
├─ material-intake             A2 → A2b                        6.1s
│    read:  2-problems/1-problem-material.md (3 items) · evidence-standards@0.3
├─ hypothesis-authoring        A2b → A3                        9.0s
│    read:  2-problems/2-intake-record.md
│    not read: 2-problems/1-problem-material.md          ← the fact the rule above needs
└─ prioritisation              A3 → A4                         3.3s
```

**A log is one line per event, in time order.** Absent here by design, and this is an illustration:

```
2026-08-03T09:14:22Z  hypothesis-authoring  read   2-problems/2-intake-record.md (4 observations)
2026-08-03T09:14:31Z  hypothesis-authoring  write  2-problems/3-problem-hypotheses.md (3 hypotheses)
2026-08-03T09:14:31Z  gate Q2               pass   7 checks run, 3 rules not run
```

**A metric is a count or a rate over many units.** Here metrics are computed on demand rather than stored:
one reader counts the build, and one reads the run records for how the work went.

```
node .github/scripts/facts.mjs     how many gate-bound rules a check decides, a judge needs, or wait on an unwritten check
node .github/scripts/metrics.mjs   durations from gate dates, rework, superseded artifacts, per run
```

A person runs them as `SPOCK: what this build can say about itself` and `SPOCK: how the workflow performed`.

---

## 2. The records carry the weight, and that is the right shape

**A service that must stay up is observed with traces and metrics. A system judged on whether a document
is good and whether the right person checked it is observed with records.** This pilot is the second kind,
and the investment has gone where the decisions are taken.

What the records already answer, per stage, with no new capture: what ran, what it produced, what it
derived from, which gate passed it and on what date, who decided, how many times it was reworked, which
know-how it read, which effort bounds it hit, which reductions it ran under, and which of its quality rules
nobody was able to check.

**The one thing they cannot answer is what a step did that left no artifact.** A refusal, a retry, an
abandoned attempt, a fetch that failed, a stage entered and reversed. The run state is a snapshot and not
a history: nothing can prove the path a run took, only that where it stands now is legal. **One exception
was built deliberately** — the build counts rework at every gate, and a stage sent back is recorded with the
person's reason, because those rejections are the signal an improvement review reads.

---

## 3. Why this is a verification question and not a monitoring one

**The ceiling on what can be verified is set by what the record retains.** A check can only refuse
what the record shows, so a rule whose answer was never written down is a rule no instrument can decide.

Of the pilot's quality rules that genuinely need judgement, **many concern how the output was produced
rather than what it says** — whether a field was supplied or invented, whether a step read only what it
was permitted to read. Those are marked `reach: process` on the artifact itself, and the mark exists so a
reviewer stops looking rather than searching a document for an answer it cannot hold.

**This is what makes tracing the highest-value item on the verification list.** A second model family
reads the same finished artifact and settles none of the process-reach rules. A trace written by something
the agent cannot edit settles several of them outright, starting with *never reads A2 raw material*.

---

## 4. What is built, and what each part does

| | Part | What it does |
|---|---|---|
| **O1** | **The artifact record** | Carries what the output is, what it came from, and who produced it. The decision surface at every gate, and the audit surface afterwards. ✅ built |
| **O2** | **The run record** | Carries where the run stands and what each stage's gates returned. The precondition surface, and the only place a run's shape is inspectable at once. ✅ built |
| **O3** | **The could-not-verify list** | Puts each artifact's unchecked rules on the artifact, so the reviewer is told what nobody confirmed without leaving the document. ✅ built; **`C65`**, on every quality gate, guards against a list that disagrees with what the gate model leaves unchecked for that skill |
| **O4** | **The judged tally per gate** | States which half of each gate ran, so a pass never implies more than it is. ✅ built |

---

## 5. What is built for tracing, and what each part does

**Four parts of tracing can be built here and the fifth cannot, and the four are built.** The artifact
envelope carries `trace_id[]` (O5), `.github/registry/tracing.yaml` declares the attribute set, the
destination and the tolerance (O6, O7), and **`C92`**, on every quality gate, guards against an artifact naming a trace no
retained trace resolves (O8); where nothing names a trace it does not apply. **O9 is the client's**: VS Code writes the spans and `trace.mjs` reduces them into the
run. O10 is unconditional and unrelated.

| | Part | What it does | Buildable here |
|---|---|---|---|
| **O5** | **`trace_id[]` on each production record**, and on the document of a run written before records were split from documents | The join. Without it a trace cannot be found from an artifact, or an artifact from a trace, and a trace nobody can join to a decision is an orphan | yes |
| **O6** | **A registered trace attribute set** | A closed list of what a trace may carry, each attribute declaring a value type and a data classification, with anything unclassifiable refused at emission rather than truncated (AB-47). **It decides in advance what may be recorded**, rather than leaving that to whoever writes the emitter | yes |
| **O7** | **A declared destination and export tolerance** | Makes a collector a destination governed like any other, and makes an outage degrade the export instead of halting the work (AB-48). **Recording is fail-closed and exporting is best-effort**, and collapsing the two turns a monitoring outage into a work stoppage | yes |
| **O8** | **A gate check refusing an artifact whose named trace does not resolve** | The fail-closed half of AB-46, for the traces an artifact claims. **An artifact that names no trace is not refused**, because capture is off unless a session enrols, and a gate that failed because somebody's telemetry was off would teach people to work around gates. The check says so rather than reading as protection, the state this build already uses for the absent checker | yes |
| **O9** | **The emitter** | Records what actually ran: skill and version, model and floor version, duration, capabilities used, what each check returned. **This is the part that makes a trace evidence rather than a claim** | **no** |
| **O10** | **A metrics reader over the run records** | Calendar days per stage from the gate dates, refinement rounds, rework at the gates, superseded artifacts, and how many runs carry a declared gap. **Needs no tracing at all**, because every input is already in the run record. ✅ built (`metrics.mjs`) | yes |

---

## 6. What is deliberately not built, and what its absence costs

| | Not built | What it would do | Why not, and what it costs |
|---|---|---|---|
| **N1** | **An agent-written trace** | Look exactly like O9 | **Refused, not deferred.** A step's own account of what it read is self-reported, so it settles none of the process-reach rules — and it would read as evidence, which is worse than the gap. This is the same refusal as a same-family judge and a producer recording its own gate |
| **N2** | **The emitter (O9)** | See above | Nothing in this repository owns the execution. The agent runs inside a substrate the pilot does not control, so only that substrate can see what a step touched, and VS Code emits the spans when a session enrols (§8). **Cost: the process-reach rules stay undecidable for every session that does not enrol**, and no committed run did |
| **N3** | **Session logs, retained** | A full event history, including model content | **The useful log already exists** and is held by the platform. Copying, retaining or exporting it means holding the material the intake step read, which with real research is personal data — precisely what §7.2 keeps out of traces, because these things are exported to systems held to a lower standard than the record store. **This is a retention and classification decision, not a build** |
| **N4** | **Real-time monitoring and alerting** | Watch service health, retrieval health and output-quality drift against declared targets, raise an incident on breach | Must be computed from the same records and traces as the audit view (AB-56), so it is downstream of O9. It also carries an obligation that attaches before production, which the pilot does not reach |

---

## 7. What changes when four teams run it

**The reasoning above does not survive four teams running real discovery on the target substrate**, and
the ratings move with it.

- **AB-46 (tracing) stops being a deferred Medium.** Four teams produce runs whose paths nobody can
  reconstruct, and the process-reach rules are unverifiable across all of them at once.
- **N3 becomes urgent as a decision rather than as a build.** Stage 2 will hold real customer material, so
  what the platform retains, for how long, who may read it and whether any of it may leave has to be
  answered before the first team starts, not after.
- **O10 becomes worth reading.** With four teams there are finally rates worth reading, and an
  improvement review has nothing to read until rejections exist.
- **Repeated-trial variance becomes measurable**, because runs will be generated rather than authored.

---

## 8. What the environment exposes

**It exposes it. VS Code Copilot Chat emits OpenTelemetry traces for agent sessions**, off by default and
enabled by a setting, an environment variable, or the presence of an OTLP endpoint. **There is also a
`file` exporter that writes JSON lines to a local path**, so a first trace needs no collector, no network
destination and no platform change.

**What a span tree carries with content capture off, which is the default and the conforming posture:**

| Span | Attributes |
|---|---|
| `invoke_agent` (root) | the whole interaction, identified by `gen_ai.conversation.id`; sub-agent invocations nest inside it |
| `chat` (each model call) | request and response model, input and output tokens, cache-read and cache-creation tokens, temperature, server address |
| `execute_tool` (each tool call) | `gen_ai.tool.name` (for example `readFile`), tool type, call id, a few typed parameters — edit type, skill name, a **hashed** MCP server name — and `error.type` on failure |

Durations and the hierarchy come with the spans. **This is a real trace in the §7.2 sense: execution
metadata, no model content, emitted by the client rather than by the agent.**

**And there is a catch that decides the value of the whole thing.** With content capture off, **a tool span
carries the tool name and not its arguments** — `readFile` appears, the path does not. Turning the paths on
is the same single switch that turns on full prompts, response messages, system prompts, tool schemas, tool
arguments and tool results. **One switch, not two.**

So under the default posture a trace settles which tools ran, how many times, on which model, for how long,
and with what token cost. **It does not settle the rule that matters most** — *never reads A2 raw material,
only the A2b intake record* — because the identity of the file read is behind the content flag.

**What a capture holds, read off two real ones.** The vendor's issue `microsoft/vscode#326254`, reported against
Copilot Chat 0.57.0, says `captureContent: false` is not honoured on span attributes and that spans carry the
complete prompt. **Neither real capture bears that out.** A capture of 12,076 records written by Copilot Chat 0.66.0
holds log records and no span, and no record carries `copilot_chat.user_request`, messages,
system instructions or tool definitions; its longest value is a 107-character file path. It holds tool names, file
paths, models, token counts, durations, and the repository's address, branch and commit.

**It is still handled as client material.** Its file paths name the run and the documents in it, and a later
version, a vendor fix to that issue or an enterprise policy (below) can change what is captured. So the file stays
gitignored and on the machine, and it is reduced before anything is retained.

**And a second finding of the same class, from the same check.** GitHub shipped **enterprise-managed
OpenTelemetry export** on 8 July 2026: an administrator sets a `telemetry` block through MDM,
server-managed settings or a managed settings file, controlling the endpoint, transport, headers, **whether
content is captured, and whether developers may change it — and a managed value overrides environment
variables and user settings.** So the environment may already decide this in either direction, and nothing
a project repository sets would override it. **That question now comes first**, ahead of anything the pilot
would configure.

**The middle path, which the shipped settings do not take (§9).** Export to the local `file` exporter with content
capture on, **reduce the raw file to the declared attribute set at once** — keep tool name and path, drop
prompts, responses, system prompts, tool schemas and tool results — and never let the raw leave the machine.
**What §7.2 governs is what a trace carries, not what a client is capable of emitting**, so the retained
trace conforms while the rule about reading becomes mechanically decidable. The cost is real and must be
stated: **the raw file holds everything the session held**, so it inherits the handling the source material
has, exactly as the corpus extraction did when it was written to a gitignored path.

**At the enterprise level there is a second channel, and it is not usable as a trace.** Copilot usage
records are forwarded from clients including VS Code and carry a `body` field with request and response
payloads. That is model content, which §7.2 keeps out of traces, and it is enterprise-admin scoped. **The
ordinary audit log is not the instrument either** — it covers plan changes and agent activity on the GitHub
website, and it explicitly excludes client session data such as the prompts a user sends locally.

### 8.1 What one trace covers, and what O9 actually is

**A trace is one agent invocation**, not a run and not a stage. The root `invoke_agent` span wraps a single
interaction; every model call and tool call inside it hangs off that root, and a sub-agent nests underneath.
The working sitting above it is grouped by `gen_ai.conversation.id`.

| Pilot unit | Traced by |
|---|---|
| **Run** | nothing. A run lasts weeks and changes hands. It has a record (S2), and that is the right instrument for it |
| **Stage** | nothing directly. Stages 2 and 3 are four skills each, so a stage is several traces |
| **Skill invocation** | **one trace.** This is the unit, and it is normally the thing that produces one artifact |
| **Artifact** | the invocation or invocations that wrote it — so the join field is a **list**, not a single value. An artifact written across two turns has two |

**O9 is therefore not an emitter we write.** The client is the emitter. What is ours is the receiver, and it
is three small pieces: **turn the setting on**, point the exporter at a local file so nothing crosses a
network, and **reduce the JSON lines to the declared attribute set** while writing the trace identifier onto
the artifact. No runner, no platform change, no collector needed to start.

It is a small build against a documented client feature, and it is built: a person's own user settings
switch capture on (VS Code reads Copilot's trace settings nowhere else), the exporter writes a local file, and
`trace.mjs` reduces it to the declared set.

**Two things still to confirm inside ČS rather than in the documentation:** whether the setting is
permitted under their endpoint-management policy, and whether their enterprise has the usage-records API
turned on. Neither changes the design; both change who has to agree to it.

---

## 9. Where it stands

1. **Capture is a person's own setting, not this repository's.** VS Code reads Copilot's trace settings
   (`github.copilot.chat.otel.*`) only from a person's user settings, so `.vscode/settings.json` sets none. The
   pilot team's capture writes to a local file, and the captures read (Copilot Chat 0.66) hold no prompt text
   (§8). `.copilot-traces/` is still ignored and never leaves the machine, and `trace.mjs` reduces the raw file
   to the declared attribute set before anything is retained. An enterprise-managed setting can still override
   it (§8).
2. **O10** — built as `metrics.mjs`. No dependency on tracing.
3. **N3** — session-transcript retention, a decision before the first team, not a build.
4. **O5 to O8** — built. The client emits, and the four parts that are ours are the shape the reducer
   writes into.
5. **Confirm the two ČS-side facts** in §8: whether the setting is permitted under endpoint policy, and
   whether the usage-records API is on. Neither changes the design.

**Three states, kept apart because they are routinely collapsed.** *Ready* is the field, the vocabulary
and the destination declared, with nothing emitting. *Enabled* is traces existing and joining to runs,
with the check still reporting while coverage is proven. *Enforced* is no artifact accepted without a
resolvable trace, which is the only one that satisfies AB-46. **The pilot is ready**: the field, the
vocabulary, the destination and the reducer exist, and no committed run carries a trace.
