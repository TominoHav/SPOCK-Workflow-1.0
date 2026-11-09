# Repository map — what every folder is for

**Date:** 1 October 2026 · **Release:** 1.14

This repository runs product discovery as a guided workflow. A brief goes in at stage 1, a
delivery-ready initiative comes out at stage 7, and a person decides at the stage boundaries. Facts are
recorded once and every other copy is generated from them, with a check comparing the copies and failing
the build if they disagree. That arrangement is the reason the folders are laid out the way they are.

**Where the counts are.** `node .github/scripts/facts.mjs` prints every number this build can compute,
and `node .github/scripts/register.mjs --verify` prints the check coverage. This page is not registered in
`claims.yaml`, so no check compares the few counts it states with the build; where a number here and one
of those commands disagree, the command is right.

---

## The whole structure

`.github/` holds the working system: the rules, the agents, the procedures and the checks.
`specifications/` holds the design those files implement. `runs/` is where a live run lands and
`fixtures/` holds the completed runs kept as evidence. The remaining folders hold the governing
documents and the material the bank supplied.

**What ships.** A release updates the testers' folder in the lab repository in place, with a release note
saying what changed. The test suites follow separately.

| Path | What it is for |
|---|---|
| `.github/` | **The working system.** Everything an agent reads while a run is in progress, and everything that checks the result |
| `.github/agents/` | Agent files for Copilot. Identity, permitted tools, and which procedures to load |
| `.github/skills/` | Skill folders. Each holds one `SKILL.md`, the procedure an agent follows, plus test cases where the skill has them |
| `.github/know-how/` | Standing reference documents in five groups. Generated from `specifications/definitions/`. Skills read them and are instructed never to write to them; a changed copy fails `C41`, a repository check that runs at no stage gate |
| `.github/registry/` | YAML files. **Where the facts are recorded.** Every generated page derives from these |
| `.github/workflow-contracts/` | Stage order, what each stage needs before it can start, what it produces, which check accepts it |
| `.github/scripts/` | Node programs, no external dependencies. The checks, the generators, the test suite and shared code |
| `.github/hooks/` | `step-guards.json`: the step guards' command, which VS Code runs at moments of an agent's turn |
| `.github/instructions/` | Files that load automatically when an agent opens a file matching their path pattern |
| `.github/evals/` | Test cases for rules a program cannot judge by reading the finished document |
| `.github/store/` | Competitor research shared across runs, so a later run does not repeat work already done |
| `.github/copilot-instructions.md` | **The rules.** The one document every agent reads, unchanged |
| `.github/artifact-fields.yaml` | Generated. The exact field names every document an agent writes must use |
| `.github/OPERATING-A-RUN.md` | Generated. Every command a run needs, stage by stage and in order |
| `.github/COVERAGE-CHECKS.md` | Generated. Every run check and the stage checks that run it, and the repository checks, which run at no stage |
| `.github/runs-root` · `.github/surface` | One line each. The only two values that change from one recipient to the next |
| `.vscode/` | **What Copilot may do.** `settings.json` sets the limits; `tasks.json` lists the commands an agent is allowed to start |
| `specifications/` | **The design.** The contract the working system implements, and the original of everything generated |
| `specifications/definitions/` | The originals of the know-how documents, with the discovery area, the pattern catalogue and the cross-cutting pages such as run state and free roam |
| `specifications/stage-specs/` | One document per stage, detailed enough to build from |
| `specifications/regulatory-research/` | The legal reading behind the regulatory summary cards. No skill reads it, by design |
| `specifications/onboarding/` | The tester guide, the page naming who keeps each area of know-how, and `TASKS.md`, generated from `.vscode/tasks.json`, which says what every task does |
| `specifications/BUSINESS-LOGIC-OVERVIEW.md` | **How the workflow works, for everyone.** The document to read before any other |
| `specifications/DOCUMENTATION.md` | Generated. Every document a person can read, and which of them a script owns |
| `specifications/evidence/` | Measured evidence kept beside the build, including the variance proof a registry points at |
| `specifications/PILOT-BUSINESS-LOGIC.md` | **The contract.** Section 6 generates the field list; section 7.4 defines the full set of checks |
| `specifications/documents.yaml` | The register covering this folder. Every file is listed, governed elsewhere, or exempted with a reason |
| `governing-documents/` | **Takes precedence over everything else.** The Agent Blueprint, the Workflow Blueprint and the Pilot Definition, held as copies pinned at a stated version |
| `runs/` | **Where a live run lands, and never versioned.** Not present until the first run is created. The folder name comes from `.github/runs-root`, so a recipient can point it anywhere |
| `runs/{run_id}/1-brief` … `7-initiative/` | The seven stage folders. The documents a person reads before deciding |
| `runs/{run_id}/records/` | **One record per piece of work produced.** The fields a check reads are here, not in the document |
| `runs/{run_id}/read/` | Written only when a person runs `SPOCK: stage 7 — the reading copy`. No instruction names it, because the bank is handed the initiative itself |
| `runs/{run_id}/notes/` | What a person changed by hand, and why. `C17` compares the account of hand edits in `marked-edits.md` with what each document says about who wrote it, in both directions |
| `runs/{run_id}/RUN-STATE.md` | Where the run has got to: stage status, check results, who decided and when |
| `fixtures/` | **Committed runs, kept as evidence.** Same shape as a live run. One of them holds real ČS material, `2026-09-digital-onboarding-dropoff`; the material in the rest was invented |
| `README.md` | What the release contains, and what each claim is based on |
| `.gitignore` | Records which runs are committed and why. Real runs are excluded because they hold client content |

Two folders hold the same subject from opposite ends. `specifications/` is the design and `.github/` is
the working system. Where both hold the same content, the design side is the original and the working
side is generated from it. That relationship explains most of the layout.

### How the folders relate

In words, reading downward:

1. `governing-documents/` wins every disagreement below it.
2. `specifications/` holds the design, including the material ČS supplied and the evidence behind it.
3. `.github/` is written from it by `node .github/scripts/<name>.mjs --write`, and a check compares the
   two in both directions.
4. Copilot in VS Code reads `.github/`, configured by `.vscode/` and by `.github/agents/`.
5. It writes into the run folder whose name `.github/runs-root` supplies.

---

## The seven stages, end to end

A run moves through seven stages, from a brief to a delivery-ready initiative. Each stage has one agent
that produces the work, a set of documents it must produce, an automated check that has to pass, and in
most cases a person who decides whether the run continues. A stage cannot start until the documents it
depends on exist, so the sequence cannot be skipped.

Every stage is the same five moves: the stage is marked as running, the agent writes the documents, what
it wrote is recorded, the automated check runs and its result is recorded, and a person accepts it or sends
it back. A stage reaches the person once its check has passed, or once a person has signed an exception
for every check it failed, in which case its result stays failed on the record. The check is run
separately from the agent that produced the work, so no agent passes its own stage.

| # | Stage | Who runs it | Produces | Check | Decision |
|---|---|---|---|---|---|
| 1 | Brief | Product Manager | Initiative brief | Q1 | G1 |
| 2 | Problems | Opportunity Designer | Intake record, problem hypotheses, framed opportunities, prioritised opportunities | Q2 | G2 |
| 3 | Market | Competitive Analysis | Landscape map, competitor cards, competitive synthesis | Q3 | none |
| 4 | Solutions | Product Manager | Solution set, selected solution | Q4 | G4 |
| 5 | MVP | Product Manager | MVP options, expanded MVP | Q5 | G5b (the option choice is a recorded decision) |
| 6 | PRD | Business Analyst | PRD draft, agreed PRD | Q6 | G6 |
| 7 | Initiative | Business Analyst | The delivery-ready initiative | Q7 | G7 |

Stage 3 is the only stage with no decision: Q3 is its whole acceptance. No stage starts itself; each waits
for the person's word. Where the person has said someone else will approve a stage, the agent is instructed
to tell them, before it starts, to record who is doing the work with `SPOCK: record who owns this stage`. The work changes hands four times, and the Product Manager comes back
for stages 4 and 5.

A stage does not only read the stage before it. Stage 4 reads the brief, the prioritised opportunities
and the market synthesis; stage 6 reads the expanded MVP, the brief and the opportunities again. Those
requirements are written into the contract as data, which is what stops a run starting a stage whose
inputs do not exist.

### Stage 1 — Brief

The person starts the run with `SPOCK: start a run`, typing the run's name and their own name and role,
which the run record keeps. The Product Manager then builds the brief through conversation rather than a
form, one field at a time. It also
asks which competitors the team already knows about, so stage 3 starts from that list instead of
rediscovering it.

The agent is instructed never to fill a field by inference, and no check can tell an inferred value from
a supplied one. Where the person cannot answer, the field is recorded as unknown with the reason, and a
required field left empty without that record fails the stage's check. This is the rule that keeps a
guessed number from becoming indistinguishable from a sourced one three stages later. The language of the run is fixed here and never changed, and every
document the run produces is written in it.

The one place the agent pushes back is the outcome. If the person describes a thing to build rather than
a change in customer behaviour, it proposes a restatement. If the person declines, their wording stands
and the record says the restatement was declined.

### Stage 2 — Problems

This stage turns raw problem material into a short, ordered list of opportunities. It runs as four steps,
each producing a document the next one reads.

| Step | What it does |
|---|---|
| `material-intake` | Reads the problem material the team supplied and converts it into numbered observations, each pointing back at its source |
| `hypothesis-authoring` | Turns observations into problem statements, each with a trust rating worked out by arithmetic rather than judgement |
| `opportunity-framing` | Turns each hypothesis into an opportunity, with the basis for every supplied answer recorded |
| `prioritisation` | Places them in order: one to three primary, up to five secondary. Nothing is discarded, and parked items are retained |

The stage will not start without material a person supplied, and it refuses material an agent produced.
Those are hard stops, not warnings. Trust is arithmetic: two quotes from the same person are one source,
not two, and a strong rating needs two independent origins among observations whose provenance is complete, plus
something somebody actually witnessed.

The step that reads raw client material is declared with no tools, and the agent that runs stage 2 can
only read and write files and run the workflow's tasks: it holds no search, no web access and no
terminal. The step that writes hypotheses is instructed to read the intake record rather than the
original material, so instructions hidden inside a customer document have no route to an agent that can
reach outside the repository.

G2 asks two questions about the same list: whether each opportunity is well formed and properly
evidenced, and which ones this run will pursue. The contract names a researcher and a product manager
for them, and the approval records one signer, so one person can answer both.

### Stage 3 — Market

The only stage that reaches outside the repository. It answers one question: what does the market mean
for the opportunities stage 2 selected.

| Step | What it does |
|---|---|
| `landscape-mapping` | Finds the market participants, types them, and records a reason for each one it does or does not examine further |
| `deep-dive` | Researches a bounded subset of them into competitor cards. Each card needs four independent sources, two where a person supplied the market, at least one of them primary |
| `synthesis` | Is instructed to work only on the cards, and its binding declares no tools. Every statement in it has to trace back to a specific card |

Stage 3 writes the competitor cards it researches into the run's own A6, never into the shared store.
Fetching a page and writing a card are separate steps: an extraction step declared with no tools turns
fetched page text into plain structured facts, and the step that writes the card is instructed to work
from those facts and never from the page. All of stage 3 runs in one agent that holds fetch and web
search, so this separation is declared per step and instructed, not withheld by the tool grant. It is
the idea stage 2 applies to client material, applied to the open internet.

The shared store is built from the committed example runs and from any run a person keeps with
`SPOCK: keep this run's competitors`, and no run has been kept yet. Reuse is suspended: the mapping skill
is instructed to research every participant it selects and to send no reuse list, so no run reuses a card
from the store yet.

Searching the market needs VS Code's web search extension and a search key, both installed separately.
Without them the agent cannot search, and it works from addresses a person supplies.

A person can also hand the stage the market instead of it searching for one: a markdown file of
competitors and trends in the run's `3-competitive-analysis/supplied/` folder. A task records the file on
the run record, its hash and how many entries each section holds but never what they say, and the stage
works from that list. A supplied address is fetched directly and needs no search.

### Stage 4 — Solutions

A bounded set of solutions is generated against the prioritised problems. The work is split rather than
written in one pass: one step names the set, then a separate instance authors each solution into its own
file, then two scripts derive each solution's regulatory section and assemble the parts into a single
document.

The assembled document is compared against the parts word for word, so nothing is lost or quietly added
during assembly. If an instance does not come back, the document says so rather than silently holding
fewer solutions.

Each solution carries its own regulatory screening section. The instance that wrote the solution answers
every question on the regulatory area cards into a file of its own, which stays on the record, and a
script writes the section from those answers. Screening happens here and not at stage 1, because a product
manager cannot say whether an idea engages a regulation before the idea exists. The person selects one
solution at G4.

### Stage 5 — MVP

Two steps and two decisions. Option design produces MVP options for the selected solution, and the person
records which one they chose as a decision while the stage is still running. Expansion then works that
option out in full, and the person accepts it at G5b. Splitting the stage this way means the expensive step
only runs against an option somebody has already chosen.

### Stage 6 — PRD

The Business Analyst drafts the product requirements document from the expanded MVP, the brief and the
prioritised problems. When the person marks their agreement, the workflow writes the agreed version from
the draft word for word, never before. If a stage 6 is withdrawn, the agreement goes with it rather than
staying attached to a document being pulled back.

### Stage 7 — Initiative

The final document, written in the language the run declared and following the ČS initiative template.
The stage cannot start without the agreed PRD. The agent is instructed never to invent a Jira identifier,
and the initiative records whether its identifier came from Jira or is a fixture key.

Pushing the initiative into Jira is designed and currently parked. The stage completes without it, and a
check confirms that completing without it is correct rather than a gap nobody noticed.

### What a check result means

A check returns pass, fail, or incomplete, and reports which half of itself ran. Incomplete means the
check names a rule nobody has written yet, so nothing failed but the stage is still not known to be
sound. An incomplete must never be read as a pass.

Every registered check is written, so every stage check runs its mechanical half in full. No program
or second model decides the judged half, the rules a program cannot settle. The person who signs the gate
can answer those rules yes, no or cannot tell in an optional box of `SPOCK: approve what is in front of
me`, and `metrics.mjs` counts the answers across runs. Skipping it blocks nothing, and the gate goes on reporting its judged half as not run.

A failed check stops the stage where it stands. A person can sign an exception for a check the run
genuinely cannot meet: one reason, for one stage; once the gate has recorded a failure, only the checks it recorded can be signed.
The stage then moves on to the person, and the record keeps its gate result as failed with the signed
exception recorded beside it. Some checks can never be signed away, among them the ones that establish
that no agent recorded a decision (`C14`) and that a stage marked accepted really passed (`C38`).

---

## How a fact stays true

The same arrangement repeats across the whole repository. A fact is written in one place. A script
generates every other copy of it. A check compares the two and fails the build if they differ. This
covers the know-how documents, the field names an agent must use, the operator page, the task page and
the register of checks. It is the reason there is a registry folder at all, and the reason so many files carry a banner
saying they were generated.

There is a reason for the strictness. A number written in prose goes out of date on its own, and a copy
kept in step by hand can fall behind while still describing itself as the original. People keeping copies
in step by hand will eventually miss one, and the generator removes that possibility.

Confidence is stated in three grades and they are kept separate. **Specified** means a design document
exists. **Built** means the files exist. **Proven** means an agent ran it and an independently run check
passed the output.

---

## `.github/` — the root files

`.github/` holds everything an agent reads while a run is in progress, and everything that checks the
result. The files at its top level are the rules plus the generated pages.

**`copilot-instructions.md`** is the rules: the checks, the boundary around client material, the rule
against inferring a value, and the standing rules that hold everywhere.

**`artifact-fields.yaml`** is generated from section 6 of the contract and guarded by `C73`. An agent
asked to write a document will invent field names that look sensible and are still wrong, and a check
reading the right name then fails. This file removes the guesswork.

**`OPERATING-A-RUN.md`** is generated by `operator.mjs` from the workflow contracts, the check model and
the scripts register, and guarded by `C144`. It is written for whoever operates a run by hand from a
terminal. In Copilot the producing agents reach the same scripts through the named commands in
`.vscode/tasks.json`, and `specifications/onboarding/TASKS.md` says what each of those does.

**`COVERAGE-CHECKS.md`** is one card per check, derived from sources that have to agree: section 7.4 of the
contract defines the full set of run checks, `gates.mjs` says which stage runs each one, `check.mjs` and
`repo-check.mjs` say which are written, `.github/registry/shapes.yaml` says what passes each one, and
`.github/registry/checks.yaml` holds each card's title, what it checks, why and who it applies to.
`register.mjs --verify` fails the build when they disagree.

**`could-not-verify.yaml`** records what each skill could not verify about its own output. Each skill
copies its own block into the document it writes, which tells a reviewer what the check did not examine
instead of leaving them to search a document for an answer it cannot contain. `C65` recalculates the list
at the check and rejects a document whose copy disagrees. **`composed-behaviours.yaml`** records the
behaviour every skill inherits.

**`runs-root`** and **`surface`** hold one line each. Every procedure writes `{runs_root}/{run_id}/…`
rather than a fixed path, because the value differs per recipient. `last-task.md` beside them is where a
task's output lands: the task tool hands an agent that output, and the file keeps all of it.

---

## `.github/agents/`

One file for each agent. Each carries the agent's identity, the tools it is allowed to use, and the list
of procedures it loads. It carries no method, because the method lives in the skills it loads. Product
Manager runs stages 1, 4 and 5. Opportunity Designer runs stage 2. Competitive Analysis runs stage 3.
Business Analyst runs stages 6 and 7. The Methodology Coach runs no stage and answers questions about the
method. Workflow Support runs no stage either: it reads the run record, says what state a run is in and
what will move it, and can only read.

Registered in `.github/registry/agents.yaml` and checked by `C85`, `C47`, `C93` and `C178`. Which agents
can also be used outside a run, in free roam, is on its own page,
`specifications/definitions/cross-cutting/free-roam.md`, and `C178` holds that page to the registry.

An agent file is markdown with a YAML header. The header is the part a program reads, and `tools` is the
real permission list:

```yaml
---
name: "Product Manager"
description: "Elicits an initiative brief through conversation, in the run the person started
  and named, and marks what the user could not supply. Never infers a field. At stage 4 it writes
  the solution set a person chooses one solution from, … Works from the brief, the framed opportunities, …"
tools: ['readFile', 'listDirectory', 'createFile', 'editFiles', 'runTask', 'getTaskOutput']
user-invocable: true
---
```

`C85` fails the build if that list differs from the register. There is no search tool and no shell, by
design, so the agent has no way to look up a number on the person's behalf and present it as sourced.

---

## `.github/skills/`

A skill is the procedure an agent follows. One folder each. Every `SKILL.md` opens with a contract
stating what the skill may read, the single file it writes, the record it writes beside it, and what it
must not do. The rest of the file is the procedure itself. Most folders also hold test cases, because a
skill is not accepted until its cases pass. A skill without them says why in its registry entry, and `C105`
fails a skill whose declared cases are not on disk and carry no such reason.

Registered in `.github/registry/skills.yaml` and checked by `C47`, `C63` and `C68`.

The contract block is the part a program reads:

```markdown
## Contract

- **Inputs:** user dialogue · know-how/method/method-canon.md
              · know-how/product/brief-fields.md …
- **Output:** `{runs_root}/{run_id}/1-brief/initiative-brief.md`
- **Record:** `{runs_root}/{run_id}/records/1-brief/`
- **Exclusions:** does not infer any field · does not read source systems
                  · does not approve its own output
```

The procedure below it is written as instruction rather than description, because a producer follows a
worked example more closely than an abstract rule.

A test case under `evals/` is a realistic document plus the result it should get. The header names the
skill, the document type and what the checks should report; the body is the document.
`node .github/scripts/eval.mjs` runs every case against the real checks.

---

## `.github/know-how/`

Know-how is the standing reference material a skill reads. Five groups: the discovery method, the product
templates and field sets, the market research standards, the regulatory summary cards, and the writing
rules. A skill can only read the documents the register lists for it, so adding a document to the folder
does not by itself put it in front of anyone.

Generated from `specifications/definitions/know-how/` by `know-how.mjs` and compared in both directions
by `C41`.

| Group | Holds | Read by |
|---|---|---|
| `method/` | Method Canon, Evidence Standards, Discovery Craft, Opportunity Framing | every producing skill |
| `product/` | brief fields, PRD template, initiative template, stage shapes, strategy basis | stages 1, 3, 4, 5, 6, 7 |
| `market/` | Competitive Analysis Standards | stage 3 |
| `compliance/` | the regulatory area cards, guidelines, screening inputs | stages 4 to 6 (screening at 4, bindings at 5 and 6) |
| `writing/` | agent interaction, input elicitation, output voice, documentation standards | every skill |

Every file here opens with a banner naming its source:

```markdown
<!-- GENERATED from specifications/definitions/know-how/method/method-canon.md.
     Do not edit this copy.
     Regenerate: node .github/scripts/know-how.mjs --write
     Know-how is read by skills, never written by them. -->
```

The transform from original to copy is deliberately small: add the banner, and rewrite every relative
link for the new location. Nothing is dropped, because a copy missing its version cannot tell a skill
which version of the rules it is following. Section numbers stay fixed so a citation recorded in a
finished run still resolves.

---

## `.github/registry/`

The registers are where the facts are recorded. Everything generated in this repository derives from
these files, so a change made here reaches every copy of it.

| File | Records |
|---|---|
| `agents.yaml` | the agents, the skills bound to each, their permissions, and the decision points they hold |
| `skills.yaml` | every skill: path, agent, stage, know-how read, what it produces, triggers, limits, guardrails |
| `scripts.yaml` | every script: what it is for, who runs it, its command, what it reads and what it writes |
| `checks.yaml` | one card per registered check: its title, what it checks, why and which runs it applies to |
| `assurance.yaml` | what is re-proven, how often, by whom, and what happens when it is not |
| `claims.yaml` | every number a document a reader trusts states that the build can compute, bound to where it comes from |
| `fixtures.yaml` | the committed runs, their material, what each is for, and every check each one is allowed to fail |
| `regmap.yaml` | the regulatory areas, the named regimes, and which document covers each |
| `egress.yaml` | the one approved search destination, and the research regimes a run can work under |
| `screening-inputs.yaml` | the inputs a regulatory screen asks for, per area |
| `scoring.yaml` | the scoring model, retained for the runs graded under it |
| `rule-echoes.yaml` | where each rule is repeated, so a correction reaches every copy |
| `tracing.yaml` | what is kept out of a client trace, where it goes, and what happens when that fails |
| `baseline.yaml` | the current-process baseline two success criteria are measured against, and whether it exists yet |
| `field-walk.yaml` | the field names `C120` accepts without §6 of the contract declaring them, each with why that is correct |
| `shapes.yaml` | what passes, per check: the line a check prints after a failure, so the agent is told what to write rather than sent to read the checker |
| `rule-sentences.yaml` | every sentence carrying never, do not, must not or always on the four surfaces an agent reads, each sorted by what backs it, kept true by `C192` |

An entry carries the value and, in its comments, the reasoning beside it. Here is the start of
`brief-creation`, with every line left out marked `…`:

```yaml
  - id: brief-creation
    name: Brief creation
    path: .github/skills/brief-creation/SKILL.md
    agent: product-manager
    stage: "1.1"
    pattern: elicitation-dialogue
    …
    know_how:
      …
      - .github/know-how/method/method-canon.md          # bound: 2026-08-31
      …
      - .github/know-how/product/brief-fields.md
      …
    produces: [A1]
    …
    bounds:
      …
      elicitation_exchanges: 40
    guardrails: [no_inference, human_decides_at_G1, run_id_assigned_once]
    …
```

Two things are worth noticing. `know_how` is what the skill is given to read, so a document not listed is
not given to it, although the agent running the skill can open any file. And the comments carry the reasoning: why the value is what it is, and in many
entries when it was bound or changed and what went wrong before it was. A register that holds only the
current value tells you nothing about whether to change it back.

---

## `.github/workflow-contracts/`

The files describing the shape of the work. Each step names its stage, its agent, the skill that
produces, what must already exist before it can start, what it produces, and which check accepts it.
Because the requirements are written as data rather than as instructions, a run cannot skip a stage.
`discovery.workflow.yaml` is the seven-stage sequence, and the other two describe stages 2 and 3 in their
own detail.

```yaml
steps:
  - id: brief
    stage: 1
    agent: product-manager
    skill: brief-creation
    requires: []
    produces:
      - A1
    records:
      - initiative-brief
    gate:
      checker: independent
      criteria:
        - run_id_assigned                     # C6
        - required_fields_present_or_unknown  # C10
        - goals_whole_and_linked              # C77
    built: true

  - id: problems
    stage: 2
    composes: problems      # described by its own contract
    contract: .github/workflow-contracts/problems.workflow.yaml
    requires: [A1]
    produces: [A4]
```

`requires` is what stops a run jumping ahead. Stage 3 requires the brief and the prioritised
opportunities, so a run without them cannot start it. `checker: independent` means the producer does not
run its own check: `check.mjs` runs separately, and `C51` confirms the run record says so honestly.

---

## `.github/scripts/`

Node programs with no external dependencies, in five groups. Operator scripts are what running a
discovery needs, and each appears on the operator page with its command. Generators write the pages
derived from the registers. Harness scripts prove the build works and are for whoever maintains it rather
than whoever runs a discovery, so they never appear on that page. Libraries are shared code that is never
run on its own. A hook is run by VS Code at a moment of an agent's turn; the one hook script is the step
guards' entry, which VS Code runs from `.github/hooks/step-guards.json`.

Registered in `.github/registry/scripts.yaml` and checked by `C144`.

| Group | What it means | Examples |
|---|---|---|
| operator | running a discovery needs it | `check.mjs`, `run-state.mjs`, `advance.mjs` |
| generator | writes a page derived from a register | `know-how.mjs`, `operator.mjs`, `regmap.mjs` |
| harness | proves the build works. Never on the operator page | `check.test.mjs`, `eval.mjs`, `repo-check.mjs` |
| library | shared code, never run on its own | `gates.mjs`, `yaml.mjs`, `trust.mjs` |
| hook | run by VS Code during an agent's turn, by no person and no agent | `step-guard.mjs` |

`gates.mjs` holds the tables saying which checks belong to which stage:

```javascript
export const UNIVERSAL = ['C6', 'C14', 'C17', 'C18', 'C19', 'C22', ...];

export const QUALITY_GATES = {
  Q1: { stage: 1, name: 'Brief',         checks: ['C10', 'C77'] },
  Q2: { stage: 2, name: 'Opportunities', checks: ['C1', 'C2', 'C27', ...] },
  Q3: { stage: 3, name: 'Competitive Analysis', checks: ['C3', 'C8', 'C9', ...] },
};
```

A stage check is a named set of checks, not whatever the script happens to implement. Running everything
and calling the result a stage check is how a stage with unwritten checks reports green. This file holds
these tables among the rest of the shared gate model, so the coverage register is derived from the same
data the check runs on. Every registered run check belongs to at least one stage check, and the ones in
`UNIVERSAL` run at all of them. The repository checks, `REPOSITORY_CHECKS` in the same file, are a separate
set: `repo-check.mjs` runs them over the whole repository, and no stage check does.

Every check in `check.mjs` takes the same four arguments: its identifier, whether it applies to this run,
whether it passed, and a message that names the answer either way.

```javascript
add('C6', true,
  all.every(a => a.run_id === runId),
  all.filter(a => a.run_id !== runId)
     .map(a => `${a.__file}: run_id="${a.run_id}"`).join('; ')
    || `all ${all.length} artifacts carry ${runId}`);
```

The pass message is as specific as the failure message on purpose, because a check that reports only "ok"
cannot tell you whether it examined anything. Keeping "applies" separate from "passed" is what produces
the third result, *not applicable*.

Every generator works the same way. Run it with no flag and it reports what has drifted; run it with
`--write` and it corrects the drift. That is what makes the matching check cheap: the check runs the
generator in report mode and fails if it has anything to say. In outline, not quoted from any one generator:

```javascript
for (const name of bodies) {
  const want = generate(name);
  let have = '';
  try { have = readFileSync(join(OUT_DIR, name), 'utf8'); } catch {}
  if (want !== have) {
    if (WRITE) writeFileSync(join(OUT_DIR, name), want);
    else       report(name);
  }
}
```

---

## `.github/instructions/`

Files that load automatically when an agent opens a file matching their path pattern. An agent writing
into a stage folder receives the rules for documents without having to remember them, and an agent
editing a register does not. They cover the header every document carries, the relationship between a
record and the document assembled from it, and how run state is written.

```markdown
---
applyTo: "**/{1-brief,2-problems,3-competitive-analysis,4-solutions,5-mvp,6-prd,7-initiative}/**/*.md"
description: "The header every run document carries, and the storage rules."
---
```

`applyTo` is a path pattern, and the editor loads the file when the agent touches a matching path. The
rule arrives with the file, rather than depending on the agent having read it earlier and kept it in
mind.

---

## `.github/evals/`

Test cases for rules a program cannot judge by reading the finished document: the evidence arithmetic,
the confidence bands, the PRD sections, the citation rules and the scoring rubric. Each case is a small
input plus the answer the rules require.

```javascript
export const cases = [
  {
    id: 'two-independent-origins',
    why: 'Evidence Standards section 5: two independent origins, and the participant witnessed it',
    observations: [
      { ref: 'i1', origin_key: 'participant-p1', proximity: 'first_hand' },
      { ref: 'i2', origin_key: 'adviser-dvorak', proximity: 'relayed' },
    ],
    evidence: ['i1', 'i2'],
    expect: 'strong',
  },
  {
    id: 'one-origin-many-quotes',
    why: 'observed in a real run: three quotes from one participant. Volume is not corroboration',
    expect: 'weak',
  },
];
```

The cases come from behaviour observed in committed runs rather than invented examples. The second one is
drawn from run `2026-02-sme-onboarding` and holds the one-origin rule: three quotes from one person are one
source, not corroboration. Graded by program rather than by a model,
because this rule is arithmetic and a model would be the wrong instrument and a more expensive one.

---

## `.github/store/`

Competitor research that outlives the run that produced it. It records every market participant profiled
by a committed example run or by a run a person keeps, with a pointer back to the document that produced
it, so a later run can reuse the work instead of repeating it. Reuse is suspended, and no run has been kept
yet.

```yaml
artifact_id: S1
scope: shared
retention: unknown
retention_unknown_reason: "no retention class is declared for competitor records
  anywhere in the design (section 6.15 requires the field, nothing supplies the
  value), carried as unknown rather than invented"
participants:
  - identity_key: airbank.cz
    name: "Air Bank"
    type: direct
    researched_at: 2026-08-20
    material: fabricated
```

A field the design requires and nobody can supply is recorded as unknown with the reason, never guessed.
And `material: fabricated` travels with the data, so nothing downstream can cite invented research as
real.

---

## `.vscode/`

Two files that control what Copilot is allowed to do. `settings.json` stops Copilot loading other agent
tools' files, switches off features this workflow does not want and switches on agent hooks. `tasks.json`
lists the named commands and is the only way an agent can run anything at all.
`specifications/onboarding/TASKS.md` is generated from `tasks.json` and says what each task does, and
`C179` fails the build when the two disagree.

```json
{
  "chat.agentFilesLocations": { ".github/agents": true, ".claude/agents": false },
  "chat.useClaudeMdFile": false,
  "chat.useAgentsMdFile": false,
  "github.copilot.chat.executionSubagent.enabled": false,
  "github.copilot.chat.searchSubagent.enabled": false
}
```

The first three lines stop Copilot reading other agent tools' files: a `.claude/agents` folder inside the
repository, and the `CLAUDE.md` and `AGENTS.md` instruction files it would otherwise append to every
agent's instructions, from the workspace and from the developer's home. **Agent folders in the developer's
home directory, such as `~/.copilot/agents`, are beyond what a project setting can reach.** `C121` refuses
the repository if either appended-file setting is removed, and requires the `.claude/agents` exclusion
wherever that folder exists. Copilot's trace settings are not in this file: VS Code reads them only from a
person's user settings. A trace is excluded from version control and stays on the machine. It holds tool names,
file paths, models and token counts, its paths name the run, and no prompt text was in the captures read
(Copilot Chat 0.66).

Every value a command needs is typed in by the person, never supplied by the agent:

```json
{
  "label": "SPOCK: approve what is in front of me",
  "type": "shell",
  "command": "node .github/scripts/task.mjs advance.mjs --approve --by box:approver --role box:role --answers box:judgedVerdicts --asked box:askedBefore",
  "options": {
    "env": {
      "SPOCK_TASK": "SPOCK: approve what is in front of me",
      "SPOCK_BOX_approver": "${input:approver}",
      "SPOCK_BOX_role": "${input:role}",
      "SPOCK_BOX_judgedVerdicts": "${input:judgedVerdicts}",
      "SPOCK_BOX_askedBefore": "${input:askedBefore}"
    }
  }
}
```

**What the person types reaches the script through the environment, never through the command line.** A
shell reads a command line first and would remove a quote, expand a `$` or run a pair of backticks. VS Code
puts each `options.env` value into the task's environment as typed, and `task.mjs` hands it to the script
where the command says `box:`.

That is why an agent can hold the ability to start commands while also reading material a client wrote:
the task that records a decision opens a box only a person can fill. The record itself is a file, so the agent
is instructed never to edit it, the step guard refuses an agent's write to it, and the checks read the record back.

---

## `specifications/`

The design the working system implements. `PILOT-BUSINESS-LOGIC.md` is the contract: the artifact field
list and the full set of checks are both generated from its sections. `definitions/` holds the originals
of the know-how documents. Alongside them sit the stage specifications, the
regulatory research, the tester guide, the know-how owners page and the measured evidence a registry
points at.

A register, `documents.yaml`, covers the folder and `C135` enforces it: a file is either listed in it, or
in a subfolder another register owns, or exempted with a stated reason.

```yaml
# folders another register owns.
# The register named is the authority; the checks named enforce it.
# A file in one of these is NOT listed below.

governed:
  - path: specifications/definitions/know-how/
    by: .github/registry/skills.yaml, specifications/definitions/area.md
    checks: [C41, C68, C90, C94]
    note: "The source of record for the generated tree at .github/know-how/.
           C41 compares the two in both directions."
```

The register names who owns a folder instead of re-listing its files. Copying every path into a second
file is the duplication this register exists to avoid, and the second copy is always the one that goes
out of date.

The regulatory split is deliberate. The summary cards in `know-how/compliance/` state obligations in
operational terms and cite the law. The research documents in `regulatory-research/` hold the legal
reading, and no skill reads them. This keeps a summary written here from being read by a producing agent
as authority. One of the summary cards came from ČS and the rest were written here, which the cards' own
headers say and the RegMap records as each area's `source`; no output prints it.

---

## `governing-documents/`

Three documents that take precedence over everything else in the repository. The Agent Blueprint covers
how agents, skills, workflows and quality are built. The Workflow Blueprint covers how work is composed,
staged and permitted to advance. The Pilot Definition covers what the pilot is and what is in scope.

None is the living original: the masters are kept outside this repository, and these are copies,
because the repository is handed to ČS Engineering and cannot depend on files outside itself. The version
is in the filename, so it is obvious when a copy has fallen behind.

Never edit a file in this folder. Edit the original, then re-pin the copy, and record the re-pin as a
deliberate act. Where a governing document is superseded, the old copy is kept and marked rather than
overwritten.

One exception runs the other way. This repository owns the Workflow Blueprint, because how work is
composed and advanced is what the pilot is proving. Changes to it are made in the master outside this
repository, the copy here is re-pinned after each one, and `C174` fails the build when a pinned document
does not state the version its filename claims.

---

## The material ČS supplied

`specifications/regulatory-research/regulatory-map-compliance.md`, a document ČS supplied, transcribed field for field with nothing added. **It is filed with the four dossiers that hold the statutory reading behind each area's card**, and the registry names it as the transcript behind the one area card the bank supplied. It exists so the content can be
read, linked to and compared without opening a PDF. The header records where it came from, when it
arrived, who transcribed it, and whether its status has been confirmed. That record is what lets a later
reader tell the bank's own document apart from any interpretation of it.

```markdown
**Source:** *Regulatory map, Compliance*, supplied by ČS as a two-page PDF exported
from a Google Sheet titled "Regulatory map", received 26 August 2026
**Transcribed:** 27 August 2026 · **Transcribed by:** Igor Tadic
**Status of the source:** unconfirmed.

> **What this transcription is not.** Not an interpretation, not a summary, not a
> reading. **Nothing below is ours.**
```

---

## `runs/` and `fixtures/`

Two folders with the same internal shape and opposite purposes. `runs/` is where a live run lands, and it
is never committed, because a real run carries an initiative's brief and the names of the people who
supplied material. It does not exist until the first run is created. `fixtures/` holds the completed runs
kept as evidence, and `fixtures.yaml` declares every check each of them fails on purpose. One of them holds
real ČS material, `2026-09-digital-onboarding-dropoff`, and the material in
the rest was invented.

Registered in `.github/registry/fixtures.yaml` and checked by `C149`, `C95` and `C141`.

A run is created with one task, `SPOCK: start a run`, which builds the whole tree: the seven stage folders, the records and
reading folders, the run record and a generated front page. Nobody is ever asked to create a folder, so a
folder you were told to write into and cannot find means the run was never created.

```bash
node .github/scripts/run-state.mjs init <run_id> --person "<name>" --role "<role>"
```

That is the command the task runs, with the three values the person types into its boxes.

Where that tree lands is whatever `.github/runs-root` says, which is why every procedure in the
repository writes `{runs_root}/{run_id}/…` rather than a fixed path.

The exclusion rule follows the setting. An ignore rule tied to a folder name would stop protecting the
moment a recipient pointed the runs root at their own directory, and the next commit would sweep up a whole
run, including stage 2 material with named customers, quotes and ticket numbers. So the rule reads
`.github/runs-root`, and `C141` fails the build if the two stop agreeing.

### Records and documents

An agent writes a record. The document a person reads is assembled from records. The fields a check reads
live on the record, and a document carrying one of them is rejected. This is what lets a document be
rebuilt, or a single record replaced, without losing the history of what produced it.

```yaml
# records/1-brief/A1-r01-initiative-brief.record.md
record_id: R-A1-01
artifact_id: A1
produced_by: { agent: product-manager, skill: brief-creation }
outcome: Small business owners can size a mortgage before speaking to an adviser
unknowns:
  - field: goals
    reason: not_yet_available
    note: H2 OKRs not published; the product manager will amend the brief once they are

# 1-brief/initiative-brief.md
artifact_id: A1
status: accepted
assembled_from: [R-A1-01]
decision:
  gate: G1
  by_agent: false
  accepted_by: [{ name: Jana Novakova, role: product manager }]
  accepted_at: 2026-08-10
```

`by_agent: false` is never anything else: `C14` fails a decision recorded `by_agent: true`, and `C40` fails
any other value that is not `false`. No agent records a human decision. The fields are `accepted_by`
and `accepted_at`, never `decided_by`, which means something different. The header around the content is
calculated by `assemble.mjs` from the registers, so getting it right is not the producer's job.

`RUN-STATE.md` is the run's own account of itself, and `C38` checks that the account is accurate: that a
stage marked accepted really did pass the checks that accept it. A stage marked accepted past a check
nobody ran is the failure this record exists to prevent. `judged_not_run` is the build stating what it did
not examine.

One committed run holds real ČS material,
`2026-09-digital-onboarding-dropoff`. In every other run, every name, quote, ticket and date was invented for
it, written to exercise the checks, including the awkward cases such as one source versus two, a hypothesis
with no evidence at all, and an unknown field left unguessed. The invented runs prove the checking works.
The real runs show the workflow on the bank's own material, driven by the people who built it, which is not
the same as a person new to it driving one.

---

## The root files

`README.md` says what the release contains and what each claim rests on. Every number in it is registered
in `claims.yaml`, and `C147` fails the build the day one stops being true.

`.gitignore` records which runs are committed and why:

```gitignore
# Runs are working artifacts. The worked example is committed deliberately (see fixtures/README.md);
# real runs are not, because they carry initiative content that is not ours to version here.
fixtures/*
!fixtures/README.md
…
# The worked example the whole build is checked against — fabricated material, committed deliberately.
!fixtures/2026-01-mortgage-onboarding/
# the first agent-produced run, stages 1-2 only — evidence. …
!fixtures/2026-02-sme-onboarding/
```

Exclude everything, then name each exception with the reason that run is kept. Which checks each
committed run fails on purpose, and why, is declared in `.github/registry/fixtures.yaml`, and `C149` fails
the build when the committed runs and those declarations disagree.

---

## File types at a glance

Markdown carries both instructions and run documents; in both cases the YAML header is the part a program
reads and the body is the part a person reads. YAML carries the facts and is never duplicated. Node
programs do the mechanical work. JSON configures VS Code. Two files with no extension hold the only two
values that change from one recipient to the next.

| Type | Where | What makes it work |
|---|---|---|
| `*.agent.md` | `.github/agents/` | The YAML header carries the permission list the editor enforces, and the body points at the shared instruction rather than repeating it. `C85` compares the list to the register |
| `SKILL.md` | `.github/skills/*/` | A contract block (declared inputs, one output path, one record path, explicit exclusions) followed by the procedure, written as instruction |
| `*.instructions.md` | `.github/instructions/` | An `applyTo` path pattern in the header. The editor loads the file when the agent touches a matching path |
| `*.yaml` | `.github/registry/`, `.github/workflow-contracts/` | The fact is recorded once, and the comments carry why the value is what it is. Everything else is generated from it |
| `*.mjs` | `.github/scripts/`, `.github/evals/` | Plain Node, no dependencies. Generators report drift with no flag and correct it with `--write`. Checks return applies, passed, and a message |
| `*.json` | `.vscode/` | Settings set the limits. Commands are the only route from an agent to a shell, and every value comes from a box the person types into |
| `*.md` (run documents) | `{runs_root}/{run_id}/` | Markdown with a YAML header. The header is what the check reads; the body is the reasoning a person reads before deciding |
| no extension | `.github/runs-root`, `.github/surface` | One line each. Every path in every procedure is written against the placeholder |

### The commands worth knowing

```bash
# run every check that applies to a run
node .github/scripts/check.mjs {runs_root}/<run_id>

# one stage, and what the build can actually run
node .github/scripts/check.mjs {runs_root}/<run_id> --gate Q2
node .github/scripts/check.mjs {runs_root}/<run_id> --gates

# the whole picture, generated rather than asserted
node .github/scripts/register.mjs --verify   # the five sources agree
node .github/scripts/repo-check.mjs          # the repository's own rules
node .github/scripts/eval.mjs                # test cases, one set per skill
node .github/scripts/facts.mjs               # every number and its source
node .github/scripts/metrics.mjs             # how the runs performed
```

`metrics.mjs` writes nothing, so there is no copy of its output to go out of date. It also states on
every run whether the material was invented, because a duration measured across invented dates describes
the writing of a test fixture rather than the doing of discovery.
