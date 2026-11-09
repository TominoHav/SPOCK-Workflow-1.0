# Pilot Workflow — Business Logic Specification

**Version:** 1.59.0 · **Date:** 9 October 2026 · **Release:** 1.16.1 · **Status:** Current. The parent contract for the build this release ships.

> **What this is.** The business logic of the SPOCK discovery pilot. It defines the stages, the agents
> and skills that execute them, every artifact produced or consumed, the human decision points, and the
> mechanisms that hold the sequence together.
>
> **What this is not.** Not an implementation specification. No storage formats, no code. Each
> artifact, skill and body of know-how is specified individually in its own document; this one keeps
> the set closed and the connections correct.

---

## 1. Purpose and scope

Discovery output quality currently depends on who happens to do the work. The reasoning behind a
decision is rarely recoverable afterwards, and teams spend more time producing documents than judging
them. This workflow brings standardization, quality enforcement and defined asset delivery to the
front half of discovery, so that the people running it spend their time on judgement rather than on
drafting.

It covers one journey: an initiative brief to a delivery-ready initiative. Seven stages, each with one
agent, declared inputs and a fixed output location. A person starts every stage, and a person decides at
the end of every stage but stage 3, whose quality gate is its acceptance.

| | |
|---|---|
| **Covers** | Initiative brief → delivery-ready initiative |
| **Environment** | GitHub Copilot / VS Code, single shared repository |
| **Handoffs** | File-based — every handoff is a saved artifact |
| **Method** | Opportunity Solution Tree (§3.4) |
| **Principle** | Agents prepare structured work; people judge and decide |
| **Constraint** | No agent approves, agrees, or selects |

### 1.1 Guarantees

Commitments, not scope boundaries. Each names what holds it in the build.

- **No agent output is presented as customer evidence.** The pilot generates no research — no simulated customers, no synthetic personas, no AI-produced interview responses. C34 refuses a problem-material record not marked as supplied by the user and modified by a person, or naming a producing agent or skill.
- **No agent approves, agrees, or selects.** Every such act is human, recorded, and attributable: it is taken through a task whose boxes the person fills, their name among them, and C14 and C51 refuse a decision marked as an agent's, and a gate or decision recorded in an agent's name.
- **No problem evidence is sourced outside the material the user supplied** (stage 2). C2 refuses evidence that points anywhere else.
- **Nothing is deleted.** Superseded and unpromoted work is retained and marked. No agent holds a tool that deletes, `SPOCK: take something back` moves a file into the run's `superseded/` with a reason, and C29 refuses a run where a document the record marks stale, or one of a stage it marks superseded, is gone, or where a parked opportunity is no longer in the framing.

### 1.2 Run prerequisites

What a team must have in hand before starting a run. Distinct from the **build** prerequisites in §11,
which are what must exist before the workflow can be built at all.

| | Prerequisite | Note |
|---|---|---|
| RP1 | A topic or product area worth exploring | |
| RP2 | The goals it serves (OKRs), or knowledge of where to find them | Stage 1 helps locate them, never invents them |
| RP3 | Problem material the team already holds | The workflow generates none |
| RP4 | A named Product Manager accountable for the run | |
| RP5 | Repository access for everyone who will run a stage | |
| RP6 | The bodies of know-how this run will touch | See §10 for which exist today |

### 1.3 Success criteria

| | Criterion | Measure |
|---|---|---|
| **S1** | Completion | A team takes one initiative from brief to delivery-ready initiative without leaving the environment |
| **S2** | Traceability | Every claim in the initiative resolves back to the material it came from |
| **S3** | Standardization | Two teams running the same stage produce artifacts of the same shape |
| **S4** | Speed | Time from brief to initiative is below the team's current baseline |
| **S5** | Quality | The initiative reaches delivery without rework the current process would not have caused |
| **S6** | Attention | Reviewers report spending their time deciding rather than drafting |

S1, S2 and S3 are observable inside the pilot. S6 is qualitative, collected from the people who ran it.
**S4 and S5 are comparative and require a baseline of the current process — how long it takes today and
how much rework it causes.** The record is `.github/registry/baseline.yaml`, it names both measures and
what each one asks, and **baseline state: absent** — no value has been supplied for either. The repository
check C64 refuses that record where its state and its values disagree or a value has no source and date, and
refuses this sentence and that record disagreeing about which state it is in. **S4 and S5 are unevaluable until the record moves off `absent`,
and the window closes the day a team runs discovery through the pilot instead of through its current
process**, because after that day there is no current process left to measure.

### 1.4 Notation

`1 … 7` stage · `1.1` step within a stage · `Q1 … Q7` automated quality gate ·
`G1` `G2` `G4` `G5b` `G6` `G7` human decision gate · `A1 … A15` artifact ·
`S1` `S2` shared store · `Brief Fields … Method Canon` know-how · `C`-numbers registered check, counted by the
task `SPOCK: what this build can say about itself` ·
`[derived]` computed by the system, never author-supplied. · **Discovery** — the workflow · **Problems**,
**Competitive Analysis** — the two workflows it composes · **free roam** — a skill run outside every
workflow (§4).

---

## 2. Actors

Three people run the workflow. The Product Manager is accountable for the run end to end, and the contract
names them at all six decision gates. G2 takes one approval, by the Researcher or the Product Manager, so
nothing has both decide. An approval signed under a role other than the gate's own is recorded with a heads-up
rather than refused; a role one or two characters from one the run records can be refused as a typo, with
nothing recorded. The Analyst authors two artifacts and approves
neither — authorship and approval are never the same act, which is the principle the Agent Blueprint
states as *the producer does not certify its own work*.

| Actor | Runs | Gates | Accountable for |
|---|---|---|---|
| **Product Manager** | 1 · 4 · 5 | G1 G2 G4 G5b G6 G7 | Brief completeness · which opportunities the run pursues · solution selection · MVP option choice (a recorded decision) · acceptance of the expanded MVP · PRD agreement (marks the draft agreed) · initiative approval |
| **Researcher** | 2 | G2: one approval, by the Researcher or the Product Manager | Opportunity list correctness · evidence discipline |
| **Analyst** | 6 · 7 | — | PRD accuracy against the expanded MVP · initiative correctness against the PRD. Authors both, approves neither |
| **Any actor** | — | — | May call the Methodology Coach at any point. No gate, no artifact, no effect on the run |

**Rules**
- The Product Manager is accountable for the run end to end.
- The Analyst authors A12 and A14; the Product Manager approves them.
- The contract divides G2: the Researcher's judgement governs the **evidence** — whether an opportunity is well formed and correctly evidenced — and the Product Manager's governs the **scope** — which opportunities the run pursues. The approval does not enforce the division; it records whoever signs.
- Roles may collapse onto one person. The accountability does not.
- No agent holds any accountability.

---

## 3. Architecture

Seven stages, seven quality gates and six decision gates. **Other counts are left to the task
`SPOCK: what this build can say about itself`**, which prints the skills, the agents, the know-how bodies and
the registered checks among them, because a count typed here goes stale. Two of the seven
stages are composed workflows in their own right (§4.2).

### 3.1 Stage flow

The run reads top to bottom. Each stage names who starts it, its agent, and its steps; below the box are the gates that stage must pass and the artifact it hands down. **No stage starts itself.** When a stage closes, the workflow names the next stage and the agent that carries it, and a person starts that stage by picking the agent, which then checks its preconditions (§7.2). **Stage 3 is the only stage with no decision gate.**

```
   ┌──────────────────────────────────────────────┐
   │ STAGE 1 · BRIEF                         user │
   │ Product Manager                              │
   │   1.1  brief-creation              → A1      │
   └─────────────────────┬────────────────────────┘
       Q1 · ◆G1 PO       │  A1   brief
                         ▼
   ┌──────────────────────────────────────────────┐
   │ STAGE 2 · PROBLEMS                      user │
   │ Opportunity Designer                         │
   │   2.1  material-intake      quarantine → A2b │
   │   2.2  hypothesis-authoring        → A3      │
   │   2.3  opportunity-framing         → A3b     │
   │   2.4  prioritisation              → A4      │
   └─────────────────────┬────────────────────────┘
       Q2 · ◆G2 1 signer │  A4   opportunities
                         ▼
   ┌──────────────────────────────────────────────┐
   │ STAGE 3 · MARKET                        user │
   │ Competitive Analysis                         │
   │   3.1  landscape-mapping           → A5      │
   │        market-content-extract, the bridge    │
   │   3.2  deep-dive                   → A6      │
   │   3.3  synthesis                   → A7      │
   │   A5, A6 reach S1 when a person keeps them   │
   └─────────────────────┬────────────────────────┘
       Q3 · no decision  │  A7   synthesis
                         ▼
   ┌──────────────────────────────────────────────┐
   │ STAGE 4 · SOLUTIONS                     user │
   │ Product Manager                              │
   │   4.1  ideation                    → A8      │
   └─────────────────────┬────────────────────────┘
       Q4 · ◆G4 PO       │  A9   selected solution
                         ▼
   ┌──────────────────────────────────────────────┐
   │ STAGE 5 · MVP                           user │
   │ Product Manager                              │
   │   5.1  mvp-option-design           → A10     │
   │        PO records the option chosen          │
   │   5.2  mvp-expansion               → A11     │
   └─────────────────────┬────────────────────────┘
       Q5 · ◆G5b PO      │  A11  expanded MVP
                         ▼
   ┌──────────────────────────────────────────────┐
   │ STAGE 6 · PRD                           user │
   │ Business Analyst authors · PO approves       │
   │   6.1  prd                         → A12     │
   │   6.2  PO marks the draft agreed; the        │
   │        workflow writes it verbatim  → A13    │
   └─────────────────────┬────────────────────────┘
       Q6 · ◆G6 PO       │  A13  agreed PRD
                         ▼
   ┌──────────────────────────────────────────────┐
   │ STAGE 7 · INITIATIVE                    user │
   │ Business Analyst authors · PO approves       │
   │   7.1  initiative-authoring        → A14     │
   │   7.2  initiative-propagation      → A15     │
   │        parked until the Jira host is named   │
   └─────────────────────┬────────────────────────┘
       Q7 · ◆G7 PO       │  A14  initiative
                         ▼
                  ┌────────────┐
                  │  COMPLETE  │
                  └────────────┘

   ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
     METHODOLOGY COACH · standalone
   │ callable from any stage, at any moment       │
     reads every artifact · writes nothing
   │ no quality gate · no decision gate           │
   └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

### 3.2 Run lifecycle

Every stage runs the same loop. The agent **produces**, a human **reviews**, the two **refine** until
it is right, and the human **accepts** at the gate. Acceptance is the end of a loop, not a verdict on a
take-it-or-leave-it draft — nobody rejects a solution set, they work on it until it is one.

A run moves forward only through accepted stages, and backward only through re-runs and send-backs. Neither
undoes the work that followed: each later stage holding a result is marked stale and retained, and the run
refuses to advance past it until it is redone or a person keeps it as it is.

```
                 ┌─────────────┐
                 │ pending     │   "SPOCK: continue" moves it to running once every stage
                 └──────┬──────┘   before it is accepted
                        ▼
                 ┌─────────────┐
                 │ running     │   the agent works · on a missing or stale input it
                 └──────┬──────┘   converses and does not advance
                        ▼
                 ┌─────────────┐
                 │ produced    │   artifact written · the quality gate runs, automated:
                 └──────┬──────┘   structure, format, volume, coverage
                        │
                        │  fails ⇒ q_failed: back to running with the agent, unless a
                        │  person signs every failed check, when the stage moves on to
                        │  review and its result stays "fail" beside the signature ·
                        │  some checks can never be signed
                        ▼
                 ┌─────────────┐   changed in review   ┌─────────────┐
                 │ in_review   │ ────────────────────► │ refined     │
                 └──────┬──────┘ ◄──────────────────── └──────┬──────┘
                        │             read again              │
                        │◄────────────────────────────────────┘
                        │  the accountable person reads it · a document or a decision
                        │  changed after the gate, in review or refined ⇒ back to
                        │  produced, and the gate runs again
                        │  (stage 3 has no review: Q3 passing, or a person signing every
                        │  check it failed, accepts it)
                        ▼
                 ┌─────────────┐
                 │ accepted    │   from in_review or refined · decision gate signed ·
                 └──────┬──────┘   decision recorded
                        │  an earlier stage is re-run or sent back
                        ▼
                 ┌─────────────┐
                 │ stale       │   marked, NOT deleted
                 └──────┬──────┘
                        │  redone, or kept as it is by a person once its gate passes
                        ▼
                 accepted again, or superseded by a later version

   The run itself:  in_progress ──► complete    G7 accepted
                               └──► abandoned   a person, a date and a reason · artifacts retained
```

The status words are the build's own, and §7.3 holds every edge between them.

**Rules**
- A stage is accepted only when its quality gate passed or a person signed every check it failed, and, where the stage has a decision gate, its decision is recorded. Stage 3 has none, so Q3 passing, or a signature over what it failed, accepts it.
- Refinement normally runs **through the agent**, so the artifact's stated author stays true.
- A person may change a document by hand while its stage is being written or reviewed, and records it with `SPOCK: record that I edited a document`, which **marks it human-modified** and records what changed and why, so the record does not say an agent wrote it. The task refuses a stage that is not being written or reviewed, a document the workflow writes whole, and the competitor cards or the solution set where a card or a solution no longer matches the file the join copies it from; C17 refuses a document made from 13 September 2026 and marked human-modified with no such record, other than supplied material and the selected solution.
- A blocked agent is instructed to say what it is waiting for and stop.
- Re-running or sending back stage N marks each later stage that holds an acceptance, a gate result or a recorded decision gate stale. A later stage still being written stays with its agent. A stale document stays on disk, and C29 refuses a run that has lost one.
- An abandoned run keeps its artifacts; S1 keeps whatever competitor research a person kept from it. **A stop names a person, a date and a reason** (§6.16, C78) — it is a recorded decision, not a run going quiet.

### 3.3 Artifact lineage

```
   A2 material ─┐
                ├─► A3 ─► A4 ─┬──────────────► A8 ─► A9 ─► A10 ─► A11 ─► A12 ─► A13 ─► A14 ─► A15
   A1 brief ────┴─────────────┤                ▲
        │                     └─► A5 ─► A6 ─► A7
        │                          │      │
        │                          └──────┴──► S1   kept by a person, survives the run
        │
        ├─► RUN_ID ──────────────────────────────────────────────► carried by every artifact
        │
        └─► S2 run state ◄──────── read and written by every stage
```

### 3.4 OST alignment

The Opportunity Solution Tree is the method underneath. It is also ČS's own discovery method, which is
why the workflow's structure and the method canon are the same shape.

| OST role | Artifact | Note |
|---|---|---|
| **Outcome** | A1 | The measurable change sought |
| **Opportunity** | A4 | A3 are candidates, promoted at G2 |
| **Solution** | A9 | A8 are candidates, selected at G4 |
| **Artifact** | A10 – A15 | Everything downstream |

Every artifact declares the OST role §6.1 gives it, and C28 refuses another. The intake record and the three
market documents (A2b, A5, A6, A7) declare `none`: they inform the tree and are not nodes in it.

---

## 4. Composition

A workflow adds governance to skills that already know their job. It states which agent runs which
skill, in what order, what evidence must exist between steps, and where a person decides — the Agent
Blueprint's definition, and the reason composition is a first-class construct here rather than an
implicit property of this document's ordering.

Three things are composed. **Discovery** is the workflow this specification defines. Two of its stages
are themselves workflows — **Problems** and **Competitive Analysis** — composed into Discovery rather
than written inside it. And any skill may be run **standalone**, outside every workflow, which is not a
lesser way to use it.

**Rules**
- Every workflow declares a name, a version and an owner, and is composed **by reference**, never by restatement.
- A composed workflow brings its own quality gate. Discovery does not reach inside it.
- Every artifact records the workflow that produced it, or records that it was produced standalone (C22).
- **Composition adds governance. It never adds competence.**

### 4.1 Discovery

Seven stages, seven quality gates and six decision gates, brief to delivery-ready initiative. The skill at each
stage is held to what that stage specifies: its preconditions, its gates, and its artifacts written into the run
under the run's identifier.

**Any agent is a valid front door, and starting always begins at the beginning.** An agent invoked with no run
in progress is instructed not to start at its own stage: the Product Manager agent invoked that way does not
start at solution ideation — it says where the process actually begins and points the person at what comes
first, the task `SPOCK: start a run`, whose boxes the person fills with the run's name, their own name and their
role. None of the agents is a shortcut past the stages before it.

Where a run is already in progress, the skill is instructed to pick up at that run's current position, subject
to its own precondition check. A skill whose inputs are not yet ready says what it is waiting for and does not
advance (§7.2).

### 4.2 The two composed workflows

Stages 2 and 3 are each a sequence of skills resolving to a single quality gate and specified as a workflow
in its own right, and Discovery composes them. Stage 5 also runs two skills into one quality gate, and stage 7
declares two, the second of them parked; both are steps of Discovery rather than composed workflows.

| Composed workflow | Stage | Skills | Quality gate | Human |
|---|---|---|---|---|
| **Problems** | 2 | `material-intake` → `hypothesis-authoring` → `opportunity-framing` → `prioritisation` | Q2 | G2 · one approval, by the Researcher or the Product Manager |
| **Competitive Analysis** | 3 | `landscape-mapping` → `deep-dive` → `synthesis`, with `market-content-extract` as the bridge | Q3 | **none** |

**Competitive Analysis is the one that nobody approves.** A person starts it and Q3 passing, or a person
signing what Q3 failed, is its whole acceptance, and what it finds outlives the run once a person keeps the
run's competitors in the store.
Nothing else in Discovery reaches acceptance without a human. That is the reason it is separated rather
than a stylistic preference: a unit nobody approves should be versioned, owned and reviewed as a unit, not as a passage inside a
larger document.

**Rules**
- Both are composed by reference. Their internal steps, bounds and know-how are specified in their own documents.
- Discovery declares only what it requires from each — Problems hands down A4, Competitive Analysis hands down A7. What happens inside is the composed workflow's business.
- Either may be composed into another workflow, or run alone. **Competitive Analysis is expected to be** — market analysis is wanted outside a discovery cycle, and that reuse is the practical return on separating it.
- **A composed workflow run alone is still governed.** It brings its own gate with it. That is what distinguishes it from standalone skill use below. Running either alone is designed and not built: `SPOCK: start a run` starts a Discovery run with all seven stages, and each composed workflow's contract declares it composed into Discovery.

### 4.3 Standalone skills — free roam

A skill run outside every workflow follows its own instructions only. The same agent, the same
knowledge, the same output shape, without the constraints a workflow places on it. This is how people
try the agents before trusting them with a run, and how the know-how gets used for work that is not a
full discovery cycle.

It is a first-class way to use a skill, and it is **not a peer of Discovery**. Discovery is a
composition; free roam is the absence of one. Output produced this way carries the **free-roam
designation** everywhere it goes.

**The mode is entered by the literal token `free-roam:` at the head of the request, and the agents are
instructed never to infer it from phrasing.** A request that sounds exploratory is a discovery run; only the token is the
token. The value recorded on what the invocation produces is the same string the person typed, because a
translation between the two is a place for them to disagree.

**Which agents carry the mode, and the two that do not, are on
[`definitions/cross-cutting/free-roam.md`](definitions/cross-cutting/free-roam.md)**, read off the registry
that decides it rather than restated here.

### 4.4 What composition adds, and what travels with the skill

Composition changes exactly one thing: which rules and limitations apply. What the skill *knows* and
what it *produces* are identical either way.

**Added by composition — inside a workflow only**

- Precondition checks. A skill is instructed not to advance without its declared inputs, accepted and fresh, and `SPOCK: continue` moves a stage to running only once every stage before it is accepted.
- Sequence. A stage runs where the flow puts it, after what precedes it.
- Gates. Quality gates on shape, decision gates on content.
- Coverage checks, and the conformance record they feed.
- A run identifier, a place in the run state, and staleness propagation.
- Fixed storage — each artifact to its defined location under the run.
- Decision records at every gate.
- A route into the competitor store, through a named person keeping the run's competitors.

**Travels with the skill — always**

- The know-how. What "good" means does not depend on how the skill was invoked.
- The output template. A free-roam competitive synthesis has the same shape as a governed one.
- The method, and the reasoning behind it.
- **The guarantees (§1.1).** No synthetic research, no agent approving, nothing deleted. These are what the thing *is*, not features of the workflow.
- **Effort bounds (§9.2).** An unbounded skill is one nothing can stop, and that is true however it was invoked.

> The asymmetry is deliberate. Composition adds **governance**; it does not add **competence**. A skill
> invoked standalone is the same skill with nothing checking it. That is why free-roam output carries
> its designation everywhere it goes: what changes is whether anything verified the quality, not the
> quality itself.

### 4.5 Storage and adoption

Free-roam output carries **the free-roam designation in its `workflow` field**, as `workflow: free-roam`.
The mark keeps it visible rather than hidden, and C23, C24 and C25 read it on the documents in a run so that
it is not taken for governed work.

**Adoption is designed and not built.** The design: when a run reaches a stage for which free-roam material
exists, the workflow **consumes the run's own artifacts by default** and tells the user that free-roam
material is present, offering three choices:

- use the run's artifacts only — the default
- use both
- use the free-roam material only

The choice is the user's, and it is recorded like any other decision. **Nothing in the build offers the
choice or writes that record today**: no task or script writes `adoptions[]`, and C25 is the only thing that
reads it, failing a run where free-roam material reached a governed artifact with no record.

**Rules**
- Every artifact records the workflow that produced it, or records that it was produced standalone.
- The designation travels. Adopted free-roam material stays marked free-roam for the life of the run, and anything derived from it says so.
- **The derivation is a field, and it is transitive** — `free_roam_derived: true` on every artifact downstream of free-roam material, not only the one that adopted it. C23 walks the lineage; an artifact built on an artifact built on free-roam output is still downstream of something nothing checked.
- **The three choices are a closed set** — `run_only` · `both` · `free_roam_only`. An adoption recording anything else is recording a choice the workflow never offered.
- **The adoption record lives on the run**, in `adoptions[]`, carrying the artifact, the choice, who decided and when, and `by_agent: false`. C25 checks it. Free-roam material that reaches a governed artifact with no such record is ungoverned output entering a governed run silently, which is the one thing this boundary exists to stop.
- **The guarantees (§1.1) hold either way.** Composition changes the governance binding, never the commitments.
- **Free Roam is instructed never to write to the competitor store.** The store is generated from the committed example runs and from the records a named person keeps from a run with `SPOCK: keep this run's competitors`, which does not read a record's `workflow`, and C24 refuses a document marked `workflow: free-roam` that itself declares `store: S1`.
- Adoption is a human decision with a decision record. Nothing is adopted silently.
- A skill run in free roam declares no gates and passes none. Its output has not been checked, and says so.
- **Adoption authorises entry; it does not substitute for the gate (WB-4).** Free-roam material adopted into a governed run — especially `free_roam_only` — must pass the stage quality gate it would have carried before it is consumed downstream. The adoption record (C25) records the human choice and preserves the free-roam mark; gate-passage is a separate property of the artifact's use (Blueprint R2-4), and the record does not stand in for it.

> The competitor store outlives every run, and beyond the example runs it is built from, what enters it is a
> run's own research, kept by a named person. If free roam could write to it, ungoverned research from a skill passing no gates at all would enter the organisation's
> durable memory. The free-roam designation is what keeps that boundary intact.

---

## 5. Stages

Each stage reads top to bottom: what starts it, who owns it, then its steps in order, then its gates.
An arrow marks what a step produces. A card's **Know-how** names the domain bodies its skills bind; the Method
Canon and the writing bodies they also bind are listed per skill in `.github/registry/skills.yaml`. A gate line
names what some of its checks hold, with their ids; every check a gate runs is in §7.4 with the harm it guards
against, and its card is in `.github/COVERAGE-CHECKS.md`. A decision gate's line names the role the contract
gives it; an approval signed under another role is recorded with a heads-up rather than refused, apart from a typo (§2).

### 5.1 Stage 1 · Brief

The Product Manager supplies a brief: the topic, the goals it serves, and the further fields the Brief Fields body defines.
The agent runs this as a conversation rather than a form — it knows which fields are required, asks for
the ones that are missing, and says where each is normally sourced. Most incomplete briefs are
incomplete because someone did not know where the number lived.

Everything downstream inherits the brief's quality. A blank field stays visible and can be filled later;
a guessed field cannot be told apart from a supplied one three stages downstream.

**Trigger** user, start of run · **Actor** Product Manager · **Agent** product-manager · **Know-how** Brief Fields, Strategy Basis (its key results), Evidence Standards, Stage 1 Shapes

**1.1 · `brief-creation`**
reads · user dialogue, any document the person supplies, **Brief Fields**, the key results in **Strategy Basis**
elicits each required field; states where a missing one is normally sourced; marks unsupplied fields
unknown rather than inferring them; carries the RUN_ID the person typed when starting the run
→ **A1** Initiative Brief

> **Stage 1 carries no compliance.** No compliance question is put to the user here and no screen is
> written here, because **a product manager cannot say whether an idea engages a regime before the idea
> exists**. The compliance section is written per solution at §5.4, out of the regulatory bodies, once there
> is a solution concrete enough to screen.

**Q1** · required fields present or marked unknown · every goal whole and linked to a key result · RUN_ID carried *(C6, C10, C77)*
**G1** · Product Manager — brief complete enough to proceed

**Rules**
- No field is inferred or guessed. Unsupplied fields are marked unknown.
- The RUN_ID is the run's name, which the person types when starting the run (`SPOCK: start a run`). It is never reassigned: the task refuses a name a run already has, the agent is instructed never to change it, and C6 refuses a document whose `run_id` differs from the run folder's name.

### 5.2 Stage 2 · Problems

> **A composed workflow (§4.2).** Discovery requires one thing of it — that it hands down A4. Its four
> skills, its bounds and its know-how are specified in the Problems workflow's own document.

The Researcher supplies whatever the team already holds — research notes, transcripts, tickets, a
strategy deck — as files in the run's `2-problems/supplied/` folder. A problem described in the person's own
words is typed into `SPOCK: add a problem in my own words`, which saves it there as a file. A longer text or an export the
person pasted in the chat is taken in with `SPOCK: take in what I pasted in the chat`, which saves exactly what they
copied there as a file, recorded as theirs. The agent restates it as a standardized list of
problem hypotheses and attaches the evidence behind each one.

Two disciplines govern the stage. Evidence comes only from what the user supplied: the agent does not
go looking for support and does not invent any. And every hypothesis carries a trust tag derived from
the evidence it cites — how many independent origins, how complete their provenance, and whether one of them
saw it first-hand. The agent writes the tag and Q2 recomputes it, so a tag the arithmetic does not give does
not pass.

A weak opportunity is still a usable opportunity. The tag exists so the reviewer can see how much weight each
opportunity is carrying before a stage is spent addressing it.

**Trigger** user · **Actor** Researcher · **Agent** hypothesis-designer (Opportunity Designer) · **Know-how** Evidence Standards, Opportunity Framing

**2.1 · `material-intake`** *(`quarantined-extract` — an empty capability list, fixed output schema)*
reads · **A1** brief, **A2** problem material — **required**: the skill is instructed to stop without it, and
Q2 refuses material with no items (C33)
reduces what the user supplied, and nothing else, to structured observations each carrying a reference
back into A2; asks clarifying questions where unclear — questioning is expected behaviour, not an
exception
→ **A2b** Intake Record

**2.2 · `hypothesis-authoring`**
reads · **A2b** intake record — **never the raw material**
restates observations as standardized hypotheses; attaches evidence by the references A2b carries, which
resolve into A2; writes per hypothesis the trust tag the evidence arithmetic derives, which Q2 recomputes (C52)
→ **A3** Problem Hypothesis Set

&nbsp;&nbsp;&nbsp;&nbsp;**`strong`** — two or more independent origins among the cited observations whose provenance is complete, and at least one of those observations first-hand
&nbsp;&nbsp;&nbsp;&nbsp;**`weak`** — evidence cited, short of `strong`
&nbsp;&nbsp;&nbsp;&nbsp;**`unrated`** — no evidence cited: a problem asserted with no supporting material

**2.3 · `opportunity-framing`**
reads · **A3** hypotheses, **A1** brief — **never the raw material**
frames each hypothesis as an opportunity in the user's own words: draws the framing out rather than
authoring it, and leaves an open field empty rather than filling it, because a filled field anchors the
reviewer and the next stage then generates against the anchor
→ **A3b** Framed Opportunities

**2.4 · `prioritisation`**
reads · **A3b**, user direction
promotes 1–3 primary and 0–5 secondary; parks the remainder, retained and visible
→ **A4** Prioritised Opportunities

**Q2** · material present and user-supplied · evidence present or `unrated` · no evidence outside the
supplied material or resting on material replaced or taken back · each opportunity placed once, within the
cardinalities *(C1, C2, C27, C33, C34)*
**G2** · one approval, by the Researcher or the Product Manager — opportunities confirmed, priorities set

**Rules**
- Problem material is **required** and supplied only by the user, as files in `2-problems/supplied/`, including a problem typed into `SPOCK: add a problem in my own words` and text pasted in the chat and taken in with `SPOCK: take in what I pasted in the chat`. A problem stated in the chat is not material until the person adds it. No agent produces it.
- Material added once stage 2 has been put in front of a person (in review, refined or accepted), or once it is stale, needs the stage sent back first: the three tasks that add material refuse it until then, so a person does not approve opportunities that rest on material they have not seen.
- **Intake is a quarantine boundary.** Problem material is the only content in the workflow that neither the user nor an agent authored — a ticket carries a customer's words, a transcript a participant's. Intake reduces it to structured observations, and the agent running it holds no search, fetch or terminal. **`hypothesis-authoring` is instructed never to read the raw text** and to cite evidence only through the intake record's references. One agent runs both steps, so what keeps an instruction embedded in third-party material from the step that derives trust is that instruction, not a separate tool grant.
- Evidence references resolve only into the supplied material. Nothing external, nothing invented.
- The trust tag is derived from the cited evidence against the thresholds in the **Evidence Standards**. The agent writes it, and C52 refuses a tag the arithmetic does not give.
- *Independent*, *complete* and *thin* are defined in the Evidence Standards, not here. Without them the tag cannot be computed consistently and the evidence discipline is nominal.
- No evidence means `unrated`, not exclusion — the problem is kept and labelled.
- At least one primary opportunity. A run with none has nothing for solutions to address.
- Unpromoted opportunities are parked on A4 and stay visible, so they can be reconsidered; C29 refuses a parked id that is no longer in the framing.

### 5.3 Stage 3 · Market

> **A composed workflow (§4.2), and the one expected to be reused.** Discovery requires one thing of it
> — that it hands down A7. Nobody approves it: Q3 passing, or a person signing what Q3 failed, is its whole
> acceptance, and what it finds can outlive the run. That is why it is versioned and owned as a unit rather than as a passage here.

Once the opportunities are agreed, a person starts competitive analysis by picking its agent. The stage
opens with a message the workflow prints for what the run's `3-competitive-analysis/supplied/` folder holds at that
moment. With no file there, it sets out its two ways of working and waits for the word to begin. With a file there,
it names each file, says only that list is researched, and asks the person to run `SPOCK: what market material has
been supplied`, which takes the list in; the agent goes on once that task has run. It works at three
levels — who is in this market, a detailed card per competitor worth understanding, and a synthesis of
the standards, patterns and trends that follow for *these* opportunities.

The first two levels are durable across runs and the third is not. Competitor knowledge is expensive and
does not belong to one initiative, so it is kept where a later run can find it. **Reuse of it is suspended
from release 1.7, and stage 3 researches every participant it selects.** A card's body is written against
the question its own run was asking, where that run found the experience broke down and what it went looking
for and did not find, and the store records which run a card came from and not what that run was researching,
so nothing can tell a card fit for a later run's question from one that is not. The suspension rests on the
stage's instruction rather than on a check. **The aim that the tenth run costs a fraction of the
first still stands and is not met today**; it is met when a store row records the question its card answers. **The store is
built from the committed example runs and from the runs a person keeps**; no run has been kept yet, so
everything in it today comes from the example runs.

The agent produces in one of two ways, and the run's `3-competitive-analysis/supplied/` folder decides which.
**With a market list there**, one file naming the competitors and trends to look at, it is instructed to research only the
addresses the person wrote and to search for nothing else; where the search extension is installed it can still search, so this is not a guarantee. **With the folder empty**, it searches the market
itself — the Blueprint's `research-loop` pattern, which requires tool access and an iteration cap. **That route
needs VS Code's web search extension and a search key, installed separately from this repository**; without
them the agent cannot search and works from addresses a person supplies. **Conversing is designed and not
built** (§7.6): when the user later **converses** with it, it is to answer from the store (S1) and the run's research, go
outward again only on request, and write whatever it finds into the run's own A6, never into the store. **The
conversational shape has no registered pattern**; the Blueprint permits an area to extend the catalogue, and
this one must be registered rather than left unnamed.

**Trigger** user, after G2 · **Actor** none · **Agent** competitive-analysis ·
**Pattern** `research-loop` · **Know-how** Competitive Analysis Standards, Stage 3 Shapes

**3.1 · `landscape-mapping`**
reads · **A1** brief, **A4** opportunities, **A3b** framed opportunities, **S1** competitor store, the supplied
market list where there is one
identifies market participants for the topic, from the supplied list or by search; is instructed to read S1
first, say what it holds, and reuse none of it
→ **A5** Landscape Map

**bridge · `market-content-extract`** *(`quarantined-extract`, no step number)*
reads · the pages 3.1 and 3.2 retrieve
reduces fetched page content to a structured extract the steps around it consume, **so that text a competitor
wrote does not reach the step that writes a card**. The step declares no capabilities, but the agent running
it holds `fetch` and `websearch` for 3.1 and 3.2, so the empty list is a discipline the agent is instructed to
keep rather than a control the editor applies
→ consumed by 3.1 and 3.2. Never a run artifact

**3.2 · `deep-dive`**
reads · **A5**, **S1**
is instructed to research every participant A5 selected, whether or not S1 holds a card for it; profiles each
into a card
→ **A6** Competitor Deep-Dive

**3.3 · `synthesis`**
reads · **A6**, **A4**, **A3b**
distils standards, patterns and trends against this run's opportunities; binds the result to the RUN_ID
→ **A7** Competitive Synthesis *(run-scoped, never reused)*

**Q3** · every element traced · research dates present · no researched card past its freshness threshold ·
no free-roam output in the store *(C3, C8, C9, C24)*
**No decision gate.**

**No human approves competitive analysis.** It passes Q3, or a person signs every check Q3 failed, and that
is the whole of its acceptance. This is deliberate: the market is not a matter of opinion, and a reviewer
asked to accept a hundred sourced facts will accept them all. **A5 and A6 reach the shared store only when a named person runs `SPOCK: keep this
run's competitors` and commits the result.** The task's box asks the keeper's name, which the person types, and
the task refuses a name that names one of the workflow's agents or skills. The task writes under `.github/`, so it is for whoever maintains the workflow rather than a
step in a run. Keeping copies the run's landscape and card records and nothing else, because a run
folder holds customer material, and **a card marked `confidential`, or resting on supplied material nobody said is
public, stays in its run with its participant** (A6's `confidential`). The store is generated from what is committed: the example runs and the
kept records. It does mean **Q3 is the only gate a card passes before a person keeps it for every future run** —
the one quality gate with no human behind it.

```
   PRODUCING                            CONVERSING
   ┌──────────────┐                     ┌──────────────┐
   │      CA      │── the market list,  │      CA      │  ✗ outward
   │              │   or a search       │              │
   │              │                     │  reads S1    │
   └──────┬───────┘                     └──────┬───────┘
          │ writes A5, A6                      │
          ▼                              on explicit request
    ┌───────────┐                              │
    │  the run  │◄─────── write-back ──────────┘
    └─────┬─────┘         at the matching level
          │ a named person keeps the run's competitors, and commits
          ▼
    ┌───────────┐
    │ S1 store  │   generated from the example runs and the kept records
    └───────────┘
```

**Rules**
- The agent is instructed to read S1 before any research and to research every participant it selects, reusing none. C9 fails a card in A6 researched longer before the cards were produced than its freshness threshold; no check refuses an entry in A5's `reused[]` for being there, so the suspension of reuse rests on the instruction.
- The agent is instructed to send no list of cards to reuse: it says in one sentence that it is researching the whole market itself, and carries on.
- C8 refuses a card, or an entry in A5's `reused[]`, without its `researched_at`.
- The synthesis is never reused across runs. It carries the run's RUN_ID.
- Every synthesis element traces to a card or a named source.
- A run's competitor research reaches S1 only when a named person keeps it. The task refuses a keeper's name that names one of the workflow's agents or skills.

### 5.4 Stage 4 · Solutions

The Product Manager agent reads the brief, the prioritised and framed opportunities and the market synthesis,
and sets out to generate five solutions, never fewer than three. Two or three may share one list of
opportunities, each attacking it from a different angle; they are not five versions of one solution, and each
is stored with what it is answerable to: the opportunities it solves
and the market evidence supporting it. A solution that cannot name both does not pass the stage's gate.

**The stage is a fan-out** (R3.6-1). One invocation names the set and authors none of it, one invocation
authors each solution, a script derives each solution's compliance section from its answers, and a script
assembles them. That is why a solution the stage set out to write and
did not is stated on the artifact rather than silently absent: four solutions where five were intended sits
inside the bound and nothing else on the page would say one is missing.

**Who does the work is recorded when it is not the person who will accept it.** A product trio runs this
workflow and the owner changes from stage to stage, so where someone other than the approver does the work,
the stage opens by asking them to record themselves as its owner with `SPOCK: record who owns this stage`, a
name and a role. Otherwise the acceptance attributes the stage to whoever signs it.

**Nothing here is scored.** Strategic alignment is a statement in the solution's own words naming a pillar
the Strategy Basis declares; regulatory reach is the list of touchpoints the solution fired, in the card's
own sentences, with a count. **No band compresses those facts into one of four words**, because the list
already carries what would place one and a second summary of the same evidence is complication rather than
signal. §8 carries what that costs.

Compliance is applied while the solutions are written rather than afterwards. The four area cards are held
in context during generation, so that a solution touching personal data is written with consent and retention
in it. **Each solution then answers every question all four cards carry** — the count `SPOCK: what this build
can say about itself` prints as the regulatory touchpoints — with `yes`, `no` or *cannot tell yet*, and a
*cannot tell yet* names the input that would settle it.

**Known gap (AB-58).** The set examined is the card's rather than the producer's, which is what the
question column closed. What it does not close is `compliance_touchpoints[]` beside it: **the producer writes
that list to one rule, every touchpoint it answered yes and any it could not settle, never one it answered no,
and no check compares the list with the answers; C7 refuses only an entry that is empty or blank.** On record as indicative
rather than an independent control, and it must not be described as one.

**Trigger** user, after stage 3 is accepted · **Actor** Product Manager · **Agent** product-manager ·
**Know-how** Strategy Basis, Discovery Craft, Compliance Guidelines, the four area bodies, Screening Inputs, Stage 4 Shapes

**4.0 · who does the work**
only where someone other than the approver does it: that person records a name and a role with `SPOCK: record
who owns this stage` · otherwise the acceptance attributes the stage to whoever signs it
→ the stage owner on the run

**4.1 · `ideation`, the slate**
reads · **A1** brief, **A4** opportunities, **A3b** framed opportunities, **A7** synthesis
names five solutions, never fewer than three, and authors none of them, each entry carrying an id, the
opportunities it solves and the synthesis elements supporting it · a person may add to the
set at the gate
→ the slate, and one brief per entry

**4.2 · `ideation`, one invocation per solution**
reads · the brief for its own entry, **Compliance Guidelines**, the four regulatory area bodies, **Strategy
Basis**
writes sections 1 to 7 of the solution, binds it to the opportunities it solves and the synthesis elements
supporting it, states its strategic alignment in words, and **answers every question all four cards carry**
→ one file per solution, and its answers beside it

**4.3 · derive**, a script and not a model
reads the answers · writes the fired touchpoints in the card's own words, the count, the areas in play, the
open items and how many escalation triggers fired · **all four areas always**, including the ones with nothing
in them · a trigger fires only where its card's §11 names a sub-domain that a *cannot tell yet* answer left
unresolved; the card's other triggers are not evaluated
→ the compliance section of each solution

**4.4 · assemble**, a script and not a model
→ **A8** Solution Set, the parts transferred verbatim behind one table with a row per solution

**Q4** · cardinalities · both bindings · **two distinct primary opportunities covered where two exist** ·
every question answered, and each compliance section the one its answers derive · **an unauthored solution
stated with a reason** · no solution ranked, preferred or scored
*(C4, C5, C26, C59, C70, C102, C125)*
**G4** · Product Manager — records which solution and why, then approves; the approval writes the selected solution from that record
→ **A9** Selected Solution

**Nothing sorts, and that is structural rather than a rule.** No solution is filtered, ranked or
recommended, and with no band there is nothing to scan a column of. The Product Manager reads the solutions
and selects.

**Rules**
- Generation and assembly are separate, and the assembly is a script that cannot mistranscribe.
- Every solution binds at least one opportunity and at least one synthesis element, or it is invalid.
- Where two or more primary opportunities exist, the set covers at least two distinct ones. **Nothing
  requires an even spread**: four solutions may address one opportunity, as long as no four share one
  identical list.
- Two or three solutions may share one identical list of opportunities, each attacking it from a different
  angle; a fourth on the same list is refused (C103, on a set dated from 7 September 2026). A narrower list
  inside a wider one is not refused on those sets: the agent is instructed to merge the two or give the
  narrower one an opportunity the wider one lacks.
- The compliance answers are written by the invocation holding the solution; the section a person reads is derived from them by a script, not by a later model pass.
- Solutions are presented in their generated order. Nothing is ranked or filtered.

### 5.5 Stage 5 · MVP

Two jobs with a human decision between them.

First, alternatives: the agent derives two or three genuinely different ways to pilot the chosen solution,
with the compliance guidelines in context, and a person may add their own. These are alternatives to choose between, not phases to sequence —
sequencing logic here would quietly convert a choice into a roadmap, and the user would be picking a
starting point rather than a direction. **An option may narrow the channel, the client group or the scope of the
chosen solution, never who acts on it**: who sees it, uses it or decides with it. A way to pilot that hands the
solution to someone else pilots a different solution, which belongs at stage 4 as a solution of its own. The agent is
instructed so, with a worked example; no check reads it.

Then, expansion: the selected option is expanded to the depth the analyst needs, with its strategic and
compliance touchpoints.

They are two skills rather than one invoked twice because a gate sits between them and the jobs pull in
opposite directions. Option design **diverges** — it widens the space and must not favour a candidate.
Expansion **converges** — it commits to one and adds depth. A single skill spanning the gate would be
reading its own prior output across a decision it did not make, carrying the incentive to expand
whichever option it had written most persuasively.

Throughout, the agents work from what the workflow has already produced. If a question genuinely
requires going outside, the agent says so first — an answer sourced from outside the run has different
standing from one traceable to the brief.

**Trigger** user, after G4 · **Actor** Product Manager · **Agent** product-manager · **Know-how** Compliance Guidelines and the four area bodies, Strategy Basis

**5.1 · `mvp-option-design`** — *diverges*
reads · **A9** selected solution, **A8** solution set, **A7** synthesis, **A1** brief (its time horizon), **Compliance Guidelines** and the four area bodies
derives 2–3 materially different ways to pilot A9; states for each what makes it distinct; presents
none as preferred
→ **A10** MVP Options

**The choice** · Product Manager: one option chosen while the stage is running, recorded with `SPOCK: record a decision I made`. It is not a gate, and runs before 10 September 2026 carry it as `G5a` on A10

**5.2 · `mvp-expansion`** — *converges*
reads · **A10** selected option, **A9**, **A3b**, **Strategy Basis**, **Compliance Guidelines** and the four area bodies
expands the selected option only: full description, strategic touchpoints, compliance touchpoints,
analyst-ready detail; does not revisit or re-rank the alternatives
→ **A11** Expanded MVP

**Q5** · option count · traceability · selected option only *(C4, C6, C7, C11, C12, C15)*
**G5b** · Product Manager — expansion accepted before the PRD is built on it, with the plain `SPOCK: approve what is in front of me`

**Rules**
- Options are alternatives, never sequenced phases.
- An option keeps who acts on the chosen solution; it may narrow the channel, the client group or the scope.
- No option is presented as preferred.
- Expansion operates only on the selected option and does not re-rank the alternatives.
- Non-selected options remain in A10, unaltered.

### 5.6 Stage 6 · PRD

The Analyst writes the PRD from the expanded MVP, with the compliance guidelines again in context.
Strategic alignment is validated here for the second time: at stage 4 it was an assessment used to
choose between directions, and here it is a confirmation that the thing actually being built still
serves the strategy. Narrowing a solution into a pilotable MVP is where strategic value is most often lost,
and this is the last point at which that can be corrected.

The Product Manager then marks the draft agreed, and the workflow writes the agreed PRD from it word for word, with their name and the date in its agreement block. That mark is not ceremony: it is what makes a draft a decision. Stage 7 starts only once stage 6 is accepted, and its skill is instructed to verify the mark before it writes anything.

**Trigger** user, after G5b · **Actor** Analyst authors, Product Manager approves · **Agent** business-analyst ·
**Know-how** Strategy Basis, Compliance Guidelines and the four area bodies, PRD Template

**6.1 · `prd`**
reads · **A11** expanded MVP, **A1** brief, **A4** opportunities, **A3b** framed opportunities, **Strategy Basis**, **Compliance Guidelines** and the four area bodies, **PRD Template**
authors the PRD against the PRD Template; holds the Compliance Guidelines in context; validates strategic alignment — confirms the narrowed
scope still serves the Strategy Basis; leaves the agreement block present and empty
→ **A12** PRD (draft)

**6.2 · the agreement mark**
the Product Manager and Analyst refine the draft; the Product Manager marks it agreed with `SPOCK: mark the PRD
agreed`, which records their name and the date, and the workflow writes the agreed PRD from the draft word for
word. It refuses a draft whose agreement block already carries a name or a date, or, on a draft assembled from
17 September 2026, a line naming its agreement block or a section headed Agreement or Souhlas, which C13
refuses too, and names the change.
The agent is instructed never to write the agreement mark
→ **A13** PRD (agreed)

**Q6** · the agreed PRD present, with the name and date the record holds · no compliance touchpoint blank,
and each bound one resolved · alignment validation present
*(C7, C13, C31, C130)*
**G6** · Product Manager — PRD agreed

**Rules**
- The agent never writes into the agreement block.
- An alignment validation statement is mandatory in A12.
- A PRD without a completed agreement block is not A13.
- The agreed PRD is written by the workflow from the draft, word for word, when a person marks it agreed.

### 5.7 Stage 7 · Initiative

From the agreed PRD the Analyst's agent produces an initiative document against the template. The document
is the deliverable and Jira is propagation, which is parked until the authoritative Jira host is named: the
run completes on the document.

**Trigger** user, after G6 · **Actor** Analyst authors, Product Manager approves · **Agent** business-analyst ·
**Know-how** Initiative Template

**7.1 · `initiative-authoring`**
reads · **A13** agreed PRD, **Initiative Template**
verifies the agreement block *before* starting; produces the initiative document against the Initiative Template
→ **A14** Initiative document — **the run completes here**

**7.2 · `initiative-propagation`** *(parked)*
reads · **A14**
would push to Jira; parked until the Jira host is named: with no host it is instructed not to run, and the
agent holds no tool that reaches Jira · the identifier is never invented
→ **A15** Jira initiative *(parked; absence does not fail the run)*

**Q7** · traceability · agreement verified · A14 independent of A15 *(C6, C12, C13, C16)*
**G7** · Product Manager — approved as a delivery item

**Rules**
- The agreement block is verified before any work starts.
- A14 is complete independently of A15.
- The Jira identifier is never invented.

### 5.8 Methodology Coach

Not a stage. Any user calls it directly, at any moment, when a question about the method comes up —
what a stage is for, why the order is what it is, what separates a good output from a poor one, or how
to read what an agent has produced. It can see everything the run has produced, so the question can be
about this work rather than about the method in the abstract.

It advises on method, not content. An agent that advises on method must not also be accountable for
content, or it begins standing in for the reviewer.

**Trigger** user, any actor, any time · **Agent** methodology-coach · **Know-how** Method Canon, Discovery Craft, Evidence Standards, Opportunity Framing

**· `methodology-guidance`**
reads · the user's question, every artifact the run has produced, **Method Canon**, **Discovery Craft**, **Evidence Standards**, **Opportunity Framing**
→ *nothing. It writes no workflow artifact.*

**No quality gate. No decision gate.**

**Rules**
- It does not judge whether an output is correct, and approves nothing.
- Invoking it does not interrupt, advance, or alter the run.
- It produces no workflow artifact.
- A run may complete without ever calling it.
- **Its unlimited read scope is deliberate.** Every other skill declares the artifacts it reads (B1); the Coach declares all of them. This is safe only because of what it cannot do: it writes nothing, produces no artifact, passes no gate, and cannot advance a run. A skill that reads everything and can change nothing carries no risk the reader does not already carry — the artifacts are the run's own, visible to the actors anyway.
- It shows a user only what that user could already see. It is instructed to read the run's own documents and not the raw problem material, and its tools read the repository the user already holds and write nothing.

---

## 6. Artifacts

Every artifact carries a common envelope. It is what makes a run traceable and what lets the run state
reason about staleness.

**Envelope** — carried by A1 … A15
- **`run_id`** — inherited from A1; binds the artifact to its run
- **`artifact_id`** — A1 … A15
- **`produced_by`** — agent and skill
- **`produced_at`** — timestamp
- **`ost_role`** — `outcome | opportunity | solution | artifact | none`
- **`status`** — the shared lifecycle vocabulary (§7.3): `pending | running | produced | q_failed | in_review | refined | accepted | stale | superseded`
- **`sources[]`** — what this artifact derives from
- **`workflow`** — the workflow that produced it — `discovery`, `problems`, `competitive-analysis` — or `free-roam` where none governed it. Travels with the artifact and with anything derived from it
- **`modified_by`** — `agent` by default; `human` when a person edits the artifact directly
- **`revisions`** — how many revisions the artifact went through before acceptance, at a gate or while being authored. **Not the same as the number of refinement rounds**, which the decision record carries in `refinements[]`. **Kept as assembly writes it and not maintained**: the build counts rework itself at every gate, on the run record (§7.5), and the count bounds `refinements[]` only on a stage whose quality gate ran before 14 September 2026 or carries no date (C40)
- **`external_sources[]`** — anything drawn from outside the run, tagged at the point it entered
  - **`ref`** — the identifier the artifact cites this source by
  - **`source`** — what it is, in terms a reviewer can resolve
  - **`accessed`** — when it was read
- **`bounds_hit[]`** — the effort bounds the producing skill reached, empty where it reached none. A skill that stopped because it ran out of room says so on the artifact rather than in a log nobody reads
- **`trace_id[]`** `0..n` — the client traces of the agent invocations that wrote this artifact, each resolving to a reduced record in `{runs_root}/{run_id}/traces/` (C92). **A list, because a trace is one agent invocation** and an artifact written across two turns has two (observability §8.1). **Empty is the ordinary state and is not a fault**: VS Code reads Copilot's trace settings only from a person's own user settings, so the workspace cannot switch capture on; an artifact names a trace only where one was reduced into its run, and an artifact written before tracing existed carries none. C92, at every quality gate, refuses an identifier that resolves to no trace the run keeps, which is a claim of evidence with no evidence behind it
- **`could_not_verify[]`** — the quality rules bound to this artifact's producing skill that no check decided, carried on the artifact a reviewer actually opens rather than only in the run record. **Derived, never author-supplied:** C65 recomputes it from the gate model at the gate, and a stored list that disagrees fails, for the reason C52 recomputes a trust tag. An artifact whose skill has every rule decided by a check carries an explicit empty list, because silence and "nothing to report" are not the same statement. An artifact with no producing skill — A2, supplied by a person, and A9, written by the workflow from a person's choice — carries none; C65 refuses one on an A9 written from 4 September 2026, which the contract declares a person's
  - **`rule`** — the rule as the registry states it
  - **`needs`** — `judge` where no check can decide it, `check` where one could be written and has not been
  - **`reach`** — `process` or `artifact`, on a judged rule only. **`process` means the answer is not in the document**: whether a field was supplied or invented cannot be seen in the finished brief, so a reviewer who sees this reads it as a limit rather than as something to go and look for

`produced_by` carries two parts, and both are checked (C36):

- **`agent`** — a registered design agent
- **`skill`** — one of that agent's bindings

**Shared-scope artifacts carry two more.** A5 and A6 survive the run that made them, and a reader who
opens one needs to know whether editing it affects other runs. The register's Scope column is the source
of record for which artifacts these apply to; the artifact restates it for the reader.

- **`store`** — the shared store it belongs to, `S1`
- **`scope`** — `shared` or `run`

**The reduction markers are a family, and they are how a degraded run stays honest** (§10). A skill
that ran without a body of know-how it was supposed to read names the value it could not derive rather
than inventing one. Each reads `indicative` or names the specific obstacle, and **a run carrying none of
them is claiming every body was available** — a claim worth making explicitly rather than by silence.

- **`scores_basis`** (A8) · **`constraint_basis`** (A10) · **`standards_basis`** (A5, A7) · **`confidence_basis`** (A6) · **`structure_basis`** (A12, A13) · **`strategy_basis`** (A1)
- **`egress_basis`** (A5, A6, A7) — which egress regime the research was done under, `approved`, `pilot-test`,
  `fixture` or `supplied`, the regimes [`.github/registry/egress.yaml`](../.github/registry/egress.yaml) declares;
  C76, at Q3, refuses a stage 3 document that cites an outside source and names none of them. **It is the one marker that outlives its run**: A5 and A6 enter S1 when a person keeps the run's competitors, so a card researched through a
  test destination carrying no mark would be inherited by the tenth run as governed research. The others say
  a body was missing; this one says which regime was in force, and an artifact with no outward source at all
  carries none

### 6.0 Records and outputs

**A run produces two kinds of file and they are for different readers.** A **record** is what one
invocation produced. An **output** is the document a person reads. They are separate files, because in one file the substance
a reviewer needs sits behind the half written for a machine.

**A record is one production, never a stage.** A step that runs once writes one; a step composed as a
fan-out writes one per instance; a step that needs three rounds writes three. This is what `parts/` is
(§6.1a), generalised to every step, and it keeps the property that makes `parts/` worth
having: **the record is the only thing an assertion that the assembling step did not re-author can be
checked against** (R3.6-2, C104).

- **Records are never edited and are not written for a reader.** They carry the envelope, the fields a
  gate decides, and the content the step produced.
- **Every record names the output it feeds** in `artifact_id`, and carries its own **`record_id`** in the
  form `R-{artifact}-{nn}`, numbered in the order the step produced them.
- **Records live in `records/`**, one folder per stage, mirroring the stage folders (§6.1a).
- **The workflow writes the frame first.** When a document becomes owed, `SPOCK: continue` and `SPOCK: check what
  is written, then continue` write its record, with its identity, number and sources filled and its content fields
  in their nesting, and the document, with its title, its opening block where it carries one, its headings in the
  run's language and, on every document but the initiative, its closing pair. Each place that is the agent's holds
  a `[[fill: …]]` marker, and a file holding one is a frame, which the run's readers leave out until the last place
  is filled. The frame writer writes no answer: the values it writes are ones the workflow already holds. It leaves
  a file on disk as it is, except a frame of the hypotheses, which gains a section for each hypothesis its record
  names. It does not frame the brief, the problem material, the solution set, the selected solution or the agreed
  PRD; stage 4's author phase frames the solution set's parts and their records, one per solution the slate names

**An output carries what it is and what was decided about it, and nothing about how it was made.** The
line falls between the document and the productions behind it:

| On the output | Why it stays |
|---|---|
| **`run_id`** · **`artifact_id`** | **An id lives inside the file and is never derived from a path** (§6.1a), so the document has to say which artifact it is |
| **`assembled_at`** · **`assembled_from[]`** | When the assembling step ran, and the `record_id` of every record it was built from. `assembled_from[]` is the machine-readable half of what `## How this was produced` states in prose |
| **`status`** · **`ost_role`** | The lifecycle and the tree position belong to the document, not to any one production behind it (§7.3) |
| **`decision`** | **The decision gate reads the output**, so the record of who accepted it, when, and what changed in refinement sits on the thing they read |

**The two fields the assembly adds**, declared here because a field nothing declares is a field nothing can
check (C42):

- **`assembled_at`** — when the assembling step ran, which is not when any of the records were produced
- **`assembled_from[]`** — the **`record_id`** of every record the document was built from, in the order
  they were produced. **The machine-readable half of `## How this was produced`**, and what C107 and C108
  read

**A record carries two of its own**, and they are checked where the records are read rather than by C42,
which walks artifacts:

- **`record_id`** — `R-{artifact}-{nn}`, unique inside the run
- **`item_id`** — what this record carries where the step ran once per item, the identity key of a
  participant or the id of a solution. **Empty where the step ran once for the whole output**
- **A list field on the output is the singular field on its records.** Ten deep-dive invocations each write
  one **`card`**, and the document they are assembled into carries `cards[]`. The singular form is what a
  fan-out instance can write without one instance overwriting another, and it is the only shape the fold
  can put back together

**A record may carry one more field, written only where there is one:**

- **`read_undeclared[]`** `0..n` — `{ document, why }`. A document the producing step read that nothing declared:
  `document` is its path as the agent opened it, and `why` names the declared body that should have answered and
  what it did not settle. `SPOCK: record what I had to read` copies each entry into the run record's
  `read_undeclared[]` (§6.16), under the stage whose artifacts name the record's `artifact_id`. **It is about the run,
  not the document**, so the fold never carries it onto the output, and two instance records that each list a read
  are not a dropped claim

**A field that can differ between two records of the same output belongs to the record. Everything else
stays on the output.** That is the line. `workflow`, `modified_by` and `revisions` stay on the output because they are the same
value for every record behind an output, and two of them are about what a *person* did to the document after
it was assembled.

- **On the record only**, because ten deep-dives can each answer differently: **`produced_at`** ·
  **`bounds_hit[]`** · **`trace_id[]`** · and every field a gate decides about the content. The
  per-production reduction markers are here too, each by name:
  **`confidence_basis`** · **`strategy_basis`** · **`structure_basis`** · **`evidence_basis`** ·
  **`scores_basis`** · **`constraint_basis`**. They are named because the generated carrier takes its field
  list from §6, and a field a gate reads is declared here or the carrier cannot carry it
- **On the output only**, because they are one value for the whole document: **`produced_by`** ·
  **`workflow`** · **`modified_by`** · **`revisions`** · **`could_not_verify[]`** ·
  **`standards_basis`** · **`egress_basis`**. `could_not_verify[]` is there deliberately: it belongs
  *on the artifact a reviewer actually opens*, and the output is that artifact. `egress_basis` is there
  because **it is the one marker that outlives its run** — A5 and A6 enter S1 when a person keeps them, and the file a later run
  inherits is the document. `revisions` stays there as assembly writes it, and nobody
  maintains it, because the build counts rework at the gates
- **On both, and it is not duplication**: **`sources[]`** and **`external_sources[]`**. A record's list is
  what that one invocation fetched. The output's is everything the document rests on, which is the claim
  C18 and C80 have always read off an artifact, and **the union is a different fact from any of its
  parts**: no single record says what the whole document rests on, and the document has to

**An output carrying a per-production field holds one fact in two places**, on the record that made it and
on the document assembled from it, and the copy nobody reads goes stale. C109 refuses it.

Below the block it is prose, it obeys the three rules that hold for every document
([Documentation Standards](../specifications/definitions/know-how/writing/documentation-standards.md) §1), and it is the
only file a reviewer, a gate signature or ČS ever sees.

- **Each section carries the record it was assembled from**, cited once at the head of the section as
  `[rec:R-A6-03]`. **Once per section and never per sentence** — a document that cites every claim reads
  like a footnoted schema and stops being the thing this change exists to produce.
- **`## How this was produced` names every record the document was assembled from**, alongside what it
  already carries. That section is where the run identifier, the stage number and the gate names appear for
  the first time (Documentation Standards §1 rule 2), and it is the reference back to what the content was
  made of.

**Where the gates land, and why they land differently.** The **decision gate reads the output**, because a
person cannot sign a document they did not read and the output is the document. The **quality gate's checks
read the records the output cites**, because counting independent origins behind a trust tag, or ten
profiled participants, cannot be done against prose without a check that parses prose. **The citation is
what joins the two halves**: without it a gate on the output could only be judged, and no checker judges here:
the independent checker is declared absent (C50), and a person answers a gate's judged questions in the approval only
where they choose to (§6.16).

**Three checks hold the join, and each one refuses a different silence.**

- **Every `[rec:…]` in an output resolves to a record in this run** (C107). A document citing a record that
  does not exist is a claim of evidence with no evidence behind it, which is C80's shape and C92's.
- **Every record naming an output is cited by it** (C108), **except A14, which cites in `assembled_from`
  and nowhere in its body.** Documentation Standards §3.11 forbids a run identifier, a stage number, a gate
  name or an artifact code anywhere in the initiative in any language, because it is read by people at ČS
  who have never heard of one, and a record citation is exactly such a code. **The record half of the rule
  still holds**, so a dropped record still fails. **This is the one that matters.** A generated
  copy could not drift from its source; an assembled document can drop a record and read perfectly, and
  C108 is what sees it. Ten competitors researched and nine written up is a document
  that is wrong in the only way this design makes possible.
- **No output carries a per-production field.** C109, at every quality gate, refuses a document assembled from
  records that carries production fields of its own (its card in `.github/COVERAGE-CHECKS.md` names them).
  Records hold everything a gate decides, and an output carrying one of
  those has two places for one fact — the day they disagree the copy nobody reads is the one that stays
  wrong, which is C80's lesson at §6.13 one file over. **`produced_by`, `could_not_verify[]`, `sources[]`,
  `standards_basis` and `egress_basis` are not in that set**, however much they look like it: the bullets
  above put them on the output deliberately and C109 does not refuse them.

**A run with no records tree is read in the old shape**, where each artifact is one file, which is the
treatment the moved bars in this specification carry (C60, C75, C86). **A run is not
re-written because a layout moved.**

### 6.1 Register

<!-- REGISTER-TABLE -->
| | Artifact | Produced | Consumed | OST | Scope | Class | Gate |
|---|---|---|---|---|---|---|---|
| A1 | Initiative Brief | 1.1 | 2 3 4 5 6 7 | outcome | run | output | G1 |
| A1b | Initiative Screen | retired | — | — | run | asset | — |
| A2 | Problem material | human | 2.1 | — | run | — | — |
| A2b | Intake Record | 2.1 | 2.2 | — | run | asset | quarantine boundary |
| A3 | Problem Hypothesis Set | 2.2 | 2.3 | opportunity* | run | asset | — |
| A3b | Framed Opportunities | 2.3 | 2.4 3 4 5 6 | **opportunity** | run | asset | — |
| A4 | Prioritised Opportunities | 2.4 + human | 3 4 6 | **opportunity** | run | output | G2 |
| A5 | Landscape Map | 3.1 | 3.2 | — | shared | asset | Q3 |
| A6 | Competitor Deep-Dive | 3.2 | 3.3 | — | shared | asset | Q3 |
| A7 | Competitive Synthesis | 3.3 | 4 5 | — | run | asset | Q3 |
| A8 | Solution Set | 4.1 | G4 5.1 | solution* | run | asset | Q4 |
| A8c | Option Screens | retired | — | solution* | run | asset | — |
| A8b | Solution Scores | retired | — | solution* | run | asset | — |
| A9 | Selected Solution | G4 human | 5 | **solution** | run | output | G4 |
| A10 | MVP Options | 5.1 | 5.2 | artifact | run | asset | — |
| A11 | Expanded MVP | 5.2 | 6.1 | artifact | run | output | **G5b** |
| A12 | PRD (draft) | 6.1 | 6.2 | artifact | run | asset | — |
| A13 | PRD (agreed) | 6.2 + human | 7.1 | artifact | run | output | G6 |
| A14 | Initiative document | 7.1 | 7.2 delivery | artifact | run | output | G7 |
| A15 | Jira initiative | 7.2 | delivery | artifact | run | asset | — |
<!-- /REGISTER-TABLE -->

`*` candidate — promoted to the OST role at the gate. Stage 7's producer reads A1 for its language alone; the stop at stage 7's review
prints the brief's facts the contract carries to that stage.

**`retired` in the Produced column means no step produces it any more, and the rows stay.** `A1b` and
`A8c` were produced until 1 September 2026 and `A8b` until 7 September 2026, and example runs hold all
three. **A row removed here is an artifact `C42` finds on disk and can no longer resolve**, so the register
keeps them, §6.2b, §6.9b and §6.9c keep their fields, and nothing writes any of them again. The compliance
section on every solution at §6.9 replaced the two screens; nothing replaced the scores. **Keeping a row is
not keeping a step.**


**Class is declared here, and the gate derives from it** (Workflow Blueprint §3.5, R3.5-2): an `output` is
front-facing and carries a **decision gate** (G1, G2, G4, G5b, G6, G7); an `asset` is a work product on
the way to an output (or a post-output propagation, like A15) and carries a quality gate or none; `—` marks the one artifact no step produces (A2,
supplied by the user). **C44 checks the two columns agree**, so the gate a step carries is a property of what
it makes, not a hand-assertion. The PRD is one document in two states with two classes: the draft **A12** is
an `asset` on the way to the output, and the agreed **A13** is the `output` that carries G6 (§10.1, §6.13).

### 6.1a Where a run keeps these, and what they are called

**A run is a tree, one folder per stage, and the folder is named for the work.** `1-brief/`,
`2-problems/`, `3-competitive-analysis/`, `4-solutions/`, `5-mvp/`, `6-prd/`, `7-initiative/`, plus
`superseded/` and `notes/`, which no gate reads as an artifact. **A stage composed as a fan-out also holds `parts/`**,
one file per instance, which no gate reads as an artifact either — it is what the join assembled the
artifact from, kept because **it is the only thing an assertion that the join did not re-author can be
checked against** (R3.6-2, C104). Each part names the artifact it belongs to in `part_of` and the item it
carries in `item_id`. **It also holds `briefs/`**, one file per invocation, written by `fanout.mjs` from
the contract's own `invocations:` and read by no gate as an artifact: a brief is what a producer is told to
do, and C160 reads the briefs against the slate to decide that the fan-out was materialised at all.
Two of the seven are workflows in their own right (§4.2)
and the names say so. The leading digit is there because a stage sequence is real information a reader
needs, and nothing else in the layout is numbered for decoration.

**A run holds `records/` beside the stage folders**, one folder per stage under the
same names. `records/3-competitive-analysis/A6-r03-komercni-banka.record.md` is the record; the output it
feeds is `3-competitive-analysis/2-competitor-cards.md`. **The stage folders hold the outputs**, because the output is what those names
describe — a reader opening
`3-competitive-analysis/` finds documents, not a data store.

**A run that carries A8b may also hold `4-solutions/solutions-with-scores.md`, a view the build no longer
writes, and it is not an artifact.** It put each solution from A8 beside its own scores from A8b; nothing generates
or checks it now. **No `artifact_id`, no row in §6.1, no gate, and no place in any run's artifact list**:
`run-files.mjs` skips the file by name, so a run that holds one reads as it did.

**`read/` holds one file per run, the initiative's reading copy.** A reading copy of any other output would
cost a generator and a check for no reader.

**A14 survives because it is the only artifact with a reader outside this workflow.** The initiative goes
to people at a bank who did not commission the machinery and should never have to see it, and stripping the
record for that reader is worth a generator.

> **The banner above the reading copy follows the run's language and carries no identifier and no
> command**, because a bank reader does not know who wrote the line above the title. **`C111` reads the
> copy as well as the document.**

**A filename is the artifact's name, and the id lives inside the file.** `3-competitive-analysis/1-landscape-map.md`
carries `artifact_id: A5`. The name is what the register's *Artifact* column has always called it, so the
file, this specification and the conversation use one word for one thing; the code is what a check reads.
**Nothing derives an id from a path** — `.github/scripts/run-files.mjs` is the one place that knows the
layout, and every consumer asks it.

- **Hyphens, never spaces, in any path.** The display name carries the spaces. A path with spaces or
  diacritics can make a script's main-module check silently run nothing and exit zero.
- **The Jira identifier is never in a path** (Initiative Template §2), so a renamed ticket cannot orphan a
  document.
- **A document the workflow frames opens `Workflow | Artifact`**: `frame.mjs` writes that title on the eleven
  documents it frames (§6.0), from the intake record to the PRD draft and the initiative, so a document lifted out
  of its folder still says where it came from. The documents it does not frame open as their writers write them:
  the brief with the title its producer gives it; the problem material, the solution set and the selected solution
  with titles the workflow writes; and the agreed PRD with its draft's title, the draft marker taken off. The
  initiative's frame opens `Discovery | Initiative` like the others; the frame does not write the Initiative
  Template's own title line, `# [<ID>] - <name>`.
- **A superseded artifact keeps its id and moves to `superseded/`.** Retention is C29's; keeping it out of
  the reader's path is this section's. It also removes the collision that let a superseded file overwrite
  a fresh one in the artifact map.

### 6.2 A1 · Initiative Brief

The run's root. It carries the outcome the run is about and assigns the identifier every later artifact
inherits.

*outcome · run scope · produced by 1.1 `brief-creation` · gate G1*

- **`run_id`** — the run's name, typed by the person when starting the run. Authoritative for the run, never reassigned
- **`language`** — `cs | en`, and nothing else. The language every document this run produces is
  written in. **Assigned here and never reassigned**, as `run_id` is never reassigned: a run that changed language
  half way through would hand a reader two documents that cannot be read together, and the artifacts
  before the change could not be corrected without editing accepted work.

  > **It is the one required field with a legitimate default, and the default is `cs`.** Česká spořitelna
  > is the customer, the initiative is the document it receives, and a run that never states a language is
  > a Czech run. **That is a declared default and not an inferred value** — `brief-creation` says what it
  > used and the brief records it, which is the difference §7.5 draws everywhere else between a value
  > nobody supplied and a value nobody thought about. **The `cs` default is written onto the brief by
  > `brief-creation` and never supplied by a script that reads a run**: a brief that declares no language
  > belongs to a run that predates the field, as the note below says.

  > **The documents and the conversation follow it.** Field names, artifact ids, record values, gate
  > reports and every check message stay English, and an agent explains them in the run's language rather
  > than pasting them. **The language is what a person reads, not what a
  > machine reads**, and a run whose `status` translated would be a run no check could parse.

  > **A run declaring no language predates the field**, and the scripts read it as English, never as the `cs`
  > default (`run-files.mjs`).
- **`topic`** — the product or subject area
- **`goals[]`** `1..n` — the product goals this run serves, each carrying the link that makes it a goal
  rather than a wish. **A goal is one level below a bank key result and never the key result itself**
  (Strategy Basis §3), so each entry carries:
  - **`product_goal`** — what this run is accountable for, owned here rather than inherited. **It is the
    product's North Star**: one level, asked once
  - **`north_star`** — declared so that older briefs still read: those written from 31 August 2026 carry it
    as a separate level, the outcome above the product goal. The product goal is now the North Star, one
    level, and C77 accepts either field or both, so those runs still read; a brief written now uses
    `product_goal`
  - **`metric`** — the product-level measure that tracks it. **Never a key result restated**
  - **`key_result`** — the identifier from the Strategy Basis §2 this goal feeds, or **`unavailable`**
    where no basis applies. **The second case is real**: the Strategy Basis
    holds Česká spořitelna's objectives, and an initiative that is not the bank's has no key result to
    name, **and a goal serving Love Brand has none by design** (Strategy Basis §2.1). Mapping either to an
    unrelated objective would produce a scored alignment that means nothing, which is the failure §8.4
    exists to prevent one stage later. **`unavailable` is only accepted where `strategy_basis` says why**,
    on the brief or on that goal (C77). For a goal serving Love Brand that sentence is a recorded fact about
    the goal and not a missing body; elsewhere it is the treatment every other missing body already has
  - **`link`** — the written statement of how progress on the goal moves that key result. **Never
    assumed, and never a restatement of either end** — it is what stage 4 bands the alignment score on
- **`known_competitors[]`** `0..n` — **participants the person already knows are in this market**, each a
  name or a link. Optional, and absent is the ordinary case. **Stage 3 starts from these and researches the
  rest**; it never treats the list as the market, and a participant the person named that the research
  cannot substantiate is recorded as unsubstantiated rather than dropped.

  > **A person who already knows the participants that matter says so here**, so the run does not spend its
  > research budget rediscovering them. **A name here is a starting point and not a finding**: it enters the map the same way anything else does, through the same fetch and
  > the same extract, and it earns its place by what the research shows.

- **`…Brief Fields set`** — defined separately in Brief Fields
- **`unknowns[]`** `0..n` — every required field the user could not supply, each with the **`field`**, a
  **`reason`** and, from 3 September 2026, **`asked`**. This is what makes "no field is inferred" a record
  rather than an intention (C10)
  - **`asked`** — `true` where the person was put the question and could not or would not answer it.
    **Required on `not_known` and `declined`, which are claims about what a person said**, and absent on
    `not_applicable` and `not_yet_available`, which are claims about the world. `C163` refuses a gap
    recorded as a person's silence when nothing says the person was asked. An agent that cannot establish
    something works it out with the person first, and only then writes it down
- **`screening_inputs[]`** `0..n` — **the facts a compliance screen has to be able to resolve, written by no
  producer from 1 September 2026**, when stage 1 stopped screening. No stage asks for them, and the field stays
  declared because example briefs carry it. Forty-seven of them, joined once across the four regulatory areas by
  `.github/registry/screening-inputs.yaml` and asked in the seven groups the Screening Inputs body sets
  out. Each entry carries:
  - **`input`** — the identifier from the registry. Nothing else is a legal value
  - **`value`** — what the person said. Omitted where they could not say
  - **`reason`** — why there is no value, from the same four `unknowns[]` uses: `not_known`,
    `not_yet_available`, `not_applicable`, `declined`. **Present exactly where `value` is absent**, which
    is the shape `unknowns[]` already has
  - **`note`** — *optional.* One line, and written on the two declared defaults so the record says which
    one produced the entry rather than a person

  > **This is `CR-B7`.** A screen cannot run against a description that does not hold what it screens, and
  > without these inputs it returns *cannot determine* on most of what it examines.

  > **Most of these are unknown at framing and that is the working state, not a failure.** What the
  > mechanism buys is that the gap is visible and costed: an absent input forces *cannot determine* on
  > every sub-domain that depends on it, and that entry names this input by its id. **Product type alone
  > gates five of the Compliance area's thirteen sub-domains** and four of those five open a separate
  > approval track.

  > **Two entries are written rather than asked, and both are declared** (Screening Inputs §4). The twelve
  > inputs the registry marks `M2` are not knowable before options exist and are written
  > `not_yet_available` with the body named in the note. Where `personal_data_processed` is answered *no*,
  > the eleven other inputs in its group resolve to `not_applicable` naming that answer. **A declared
  > default is not an inferred value** — the same distinction §6.2 already draws on `language`.

  > **A brief carrying no screening inputs was not asked for them.** Its `channels` entry is one of the facts the
  > contract carries to the stages after it, which their review stop prints and a document's opening block repeats
  > (C206 holds the block to the record).
- **`outcome_restatement`** — *optional.* The outcome put back in the agent's own words, for the user to correct
- **`restatement_proposed`** — *optional.* Whether the restatement was offered. Elicitation is a conversation, and
  the brief records that the loop ran rather than assuming it
- **`entered_at`** and **`via`** — *optional.* When the brief was taken and through which surface

Every Brief Fields required field is present or explicitly marked unknown. No field is inferred.

**A goal that is present is complete or it is not a goal (C77).** The four parts stand or fall together:
a product goal with no metric cannot be banded, a metric with no key result resolves to nothing in the
basis, and a link that restates one end is not a mechanism. **Marking `goals` unknown remains legitimate**,
and what C77 refuses is a goal that is present and partial,
because a half-written goal reads at stage 4 as a supplied one.

### 6.2b A1b · Initiative Screen · **retired 1 September 2026**

Which regulatory sub-domains this initiative puts in play, across all four areas, with a stated reason for
each. **It examines the description; it makes no compliance judgement**, and the difference is the whole
design.

> **Nothing produces this any more, and the fields below stay declared.** Stage 1 stopped screening on
> 1 September 2026: **a product manager cannot say whether an idea engages a regime before the idea
> exists**, so the honest answer to most of what this artifact examined was *cannot determine*, and a
> screen mostly made of them was named a defect at §6.2b's own last note rather than a clean run. **The
> shape below is not retired — it moved**, whole, onto every solution at §6.9, where there is something
> concrete to run an area's triggers against.
>
> **Two example runs hold one**, `2026-09-savings-goals` and `2026-09-spending-insights`. `C42` reads every
> example run against §6, so a field this section stopped declaring is a field those two would carry
> illegally. **Declaring a field is not endorsing it**, and this section is whole rather than partial
> because half a schema fails a run as surely as none.

*run scope · produced by nothing since 1 September 2026 · no gate · was 1.2 `compliance-screening`, gate Q1, accepted with A1 at G1*

- **`areas[]`** — one entry per area the RegMap declares, **all four, always** (C126). Each carries:
  - **`area`** — the identifier from `.github/registry/regmap.yaml`
  - **`filled`** — whether the area has a card, and **all four do**: ČS supplied the Compliance card, and the
    other three were written from public law, as the RegMap's `source` records. No script writes the field: the build works out the value it expects from whether the area's card
    is on disk, and C126 refuses a record that says otherwise, so a team-written card counts as filled and
    `source` is what tells it apart. **An unfilled area returns `no_map` for the whole area and never returns
    clean** (`CR-B5`), because silence and clearance look identical on a page and only one of them is a
    claim anybody made
  - **`source`** — `cs_card` or `authored_here`, copied from the RegMap, so the record says which card the
    screen read. It stays on the record and no section prints it
  - **`triggers_fired[]`** `0..n` — the applicability triggers the description fired. Each entry carries:
    - **`trigger`** — the card's own id, `T7`, `P4`, and so on
    - **`puts_in_play`** — the sub-domains it put in play, and it names at least one (`C126`)
  - **`sub_domains[]`** — one entry per sub-domain the card declares, **none omitted and none blank**:
    - **`sub_domain`** — the card's id, `S1`, `G4`, and so on
    - **`state`** — `in_play`, `not_triggered` or `cannot_determine`. **There is no fourth state** (C125)
    - **`because`** — the reason, in the words §4.2 of the mechanism body requires. An `in_play` entry
      names the trigger that fired; a `not_triggered` entry says what the description did not contain; a
      `cannot_determine` entry names the input
    - **`missing_input`** — *required on `cannot_determine` and refused elsewhere.* The identifier from
      `.github/registry/screening-inputs.yaml` that would settle it (C126)
- **`escalation`** — **the flag, and it is carried beside the screen and never inside it** (`CR-D`). It
  contributes no points to anything and appears wherever the screen appears:
  - **`flag`** — `true` where any escalation trigger fired, `false` where none did. Never absent. This is the
    retired screen's shape: a solution set from 7 September 2026 carries no flag, and §6.9 says which triggers its
    derived section evaluates
  - **`fired[]`** `0..n` — each with the **`area`**, the **`trigger`** by its §11 id, a **`because`**, and
    **`routes_to`**. **`routes_to` is `unstated` on every trigger today and that is a fact about the cards**
    — the ČS transcript lists fourteen triggers and no roles, and the three cards written here inherited
    the claim without the content. `CR-D4` is owed to ČS in the same way `CR-E7` is
  - **`note`** — *required on a trigger the card marks as routing outside the four areas*, saying so.
    An AI-driven recommendation fires a flag and goes to a specialist, and **routing is the whole of what
    this workflow does about it** (`CR-D6`)

  > **Two or three triggers per area fire on an unresolved sub-domain and are not silenced by it**
  > (`CR-D5`). An unresolved `S13` fires *EAA applicability uncertainty*; an unresolved `S12` fires
  > *inability to define adequate controls*. **A trigger that exists to catch uncertainty must not be
  > suppressed by the uncertainty it exists to catch**, which is the one way a screen full of *cannot
  > determine* entries could still have reported nothing to escalate.

  > **A single trigger firing is a fact a person needs and a weighted average would erase it** (`CR-D2`).
  > An option can be structurally simple and carry one high-severity trigger — one sustainability claim,
  > for instance. **`CR-D3`'s floor of level 3 is declared and inert**: no complexity value is produced at
  > all while `CR-C6` holds, so there is nothing yet for the floor to raise.
- **`uncovered[]`** — the areas the map does not cover, from the RegMap's own `out_of_scope`. Each entry
  carries the **`area`** and its **`disposition`**. **A reader who cannot see the edge of the work assumes
  there is no edge**

> **The two words this artifact may never carry.** *Not applicable* is a compliance judgement and this
> workflow does not make them, so the middle state says what the description did not contain instead
> (`CR-B3`, C125). And *cannot determine* never collapses into *not triggered*: one says the description
> was examined and nothing fired, the other says it could not be examined. **They look alike on a page and
> they are opposite facts.**

> **A screen that resolved everything is a defect rather than a clean run** (`CR-B4`). Every
> `cannot_determine` names the input that was missing, so a reader knows what to go and get; a screen with
> none has to be one where every input each sub-domain depends on was supplied or evaluated as irrelevant.

> **The screen runs the area's own triggers against the description, so the set examined is the card's
> rather than the producer's**, and an agent that under-identifies cannot pass on a set it named
> itself.

### 6.3 A2 · Problem material

**Obligatory, and supplied only by the user.** Stage 2 cannot start without it: there is no default, no
placeholder, and no path by which an agent produces it. It arrives only as files in the run's `2-problems/supplied/`,
including a problem a person types through "SPOCK: add a problem in my own words", which saves their words
there as a file, and text they pasted in the chat and take in through "SPOCK: take in what I pasted in the chat",
which saves exactly what they copied there as a file. Material is added until stage 2 is put in front of a person; after that, stage 2 is sent
back first, because new material would change what the person is deciding on.

This is the one artifact in the workflow with **no producing skill**, and that is what makes the
evidence guarantee hold. Because the only route in is the user, no agent output can become problem
material — the fabrication path closes by construction rather than by a check.

It is also the only permitted evidence source for the hypotheses.

*source material · run scope · supplied by the user · **required***

- **`items[]`** `1..n`
  - **`ref`** — stable reference, citable by A3
  - **`form`** — `document | transcript | ticket | text`
  - **`arrival`** — `file`, or `conversation` for a problem a person typed in the task's box or pasted in the
    chat, which the workflow saved as a file all the same. How this item reached the run: `problem-material.mjs`,
    the script that writes A2, writes one of the two, and C33, at Q2, refuses any other
  - **`source_path`** — **required when `arrival: file`**, and written by the workflow on every item it takes
    in, one that arrived from the conversation included. The supplied file's path relative to the stage-2 folder,
    normally `supplied/<name>` (C159, at Q2, which on a run started on build 1.9 or later holds a conversation item
    naming a file to it too). **This is the
    join key and `provenance` is deliberately not one**: prose describing a source cannot be opened, and a
    check that cannot open the file reads only what the producer wrote. A person's material lives in `2-problems/supplied/`, which the artifact walk does not
    enter, so it can sit in the run without being read as a document
  - **`bytes`** / **`sha256`** — *optional, written by the workflow and never by a producer.* What arrived,
    measured at intake. **Present on runs from 11 September 2026 and absent before**, so a check reading
    them holds only runs that could have carried them.

    > **The measurement lets a person compare the file with their original.** Without it a file rebuilt by
    > hand cannot be told apart from the one supplied. The workflow measures each supplied file and writes
    > both figures onto every item citing it, and the intake message prints them, because the person holds
    > the original and is the only one who can say the two agree.
  - **`provenance`** — *optional.* What the material says about where it came from, in its own terms
  - **`added_at`** / **`replaces`** / **`replaced_by`** / **`superseded_at`** / **`removed_at`** / **`kept_as`** /
    **`kept_sha256`** — *optional, written by the take-in (`SPOCK: add problem material`) on the person's confirmation,
    each on one line, never by a producer.* `added_at`: the day an item was taken in after the read-in. A file edited
    after it was read in is taken in as a new item whose `replaces` names the items citing the old version, and each
    of those gains `superseded_at` and `replaced_by`. An item whose file the person moved into the run's
    `superseded/` folder gains `superseded_at` and `kept_as`, the path it is kept at; a text copy the workflow moved
    there also carries `kept_sha256`, the fingerprint of the copy as it was stamped and kept. An item whose file was
    removed gains `removed_at`. **An item carrying `superseded_at` or `removed_at` is no longer in use**; every
    other item is. Nothing is renumbered, reordered or deleted, and a retired item keeps its own `bytes` and `sha256`
    (C35, C2, C159, C172, C190)
  - **`research`** — *optional.* `synthetic | human | not_stated`: whether the material says it is synthetic research
    or research with people. Intake writes it beside `provenance`, from what the file says about itself, and the
    skill is instructed to name each file's value when stage 2 is put to the person, so they can correct it. **Never human by default**: a file that
    says nothing about itself is not_stated. It changes no trust tag, and the guarantee in §1.1 is unchanged,
    because that concerns research an agent produces. Any other value is refused (C33)
  - **`period_confirmed`** `0..1` — the person's statement of the period this item's material comes from, for
    material that arrived without dates: their name, the date they confirmed it, and the period, written
    `"{name}, {date}: {period}"`. Written by the task from the person's confirmed box, never from the agent's own
    reading or the file's. Absent is the ordinary case. **The read-in and the add list each file that carries no
    date with the year it names as a suggestion, and the person confirms the period of every such file once, in the
    box of "SPOCK: date the material that arrived without dates"**, which writes it on every item citing the file
    (Evidence Standards §3.2, C37)
- **`supplied_by`** — always `user`. **An item marked otherwise is an agent producing its own evidence**,
  which is the one path this artifact exists to close (C34)

### 6.3b A2b · Intake Record

**The quarantine boundary.** The structured reduction of the problem material, and the only thing
`hypothesis-authoring` reads. Its existence is what keeps raw third-party text away from the step that
derives trust.

*source material, reduced · run scope · produced by 2.1 `material-intake` · pattern `quarantined-extract`*

- **`observations[]`** `1..n`
  - **`id`** — the observation's own identifier, unique within the run, written `{ref}-o{n}`. Without it a
    hypothesis can cite only the item an observation came from, so several observations drawn from one
    interview read as one reference to C69 and C52. **It matters only where an item yields several
    observations.** Optional on a run whose intake predates it: C2, C35 and C52 read an evidence reference as an
    observation's `id` or its item's `ref`
  - **`ref`** — resolves into an **A2** item. Carried through to A3's evidence references (C35)
  - **`statement`** — what was observed, in the material's own terms. Not a conclusion
  - **`origin`** — the person or body the observation comes from, in prose a reviewer can check (Evidence Standards §4)
  - **`origin_key`** — the same origin as a stable key. **Equality of this key, and nothing else, decides whether two observations are one origin** (Evidence Standards §4.2) — C37
  - **`proximity`** — `first_hand | relayed | aggregated | unestablished`. How close the origin stood to what it reports (Evidence Standards §4.3) — C39
  - **`observed_at`** — when, where the material carries it; or a period, `YYYY`, `YYYY-Qn` or `YYYY-MM`, where the
    item carries `period_confirmed` (Evidence Standards §3.2). On a run started on 1.11 or later a complete
    observation dated by a period is complete only where the person confirmed that period for its file (C37)
  - **`provenance_complete`** `[derived]` — whether the form's required fields are all present
  - **`quote`** `O` — the source's own words, carried verbatim from the A2 item and never rewritten.
    The statement is intake's paraphrase, so without the quote a hypothesis built on it reaches a reviewer
    with nobody's voice in it. **Absent where the item carried an injected
    instruction**, and `quote_withheld` says so — a paraphrase launders an instruction out of the material
    and a verbatim carry does not, so the one case where the boundary is doing real work is the one case
    where no words travel
  - **`quote_withheld`** `O` — why no words were carried, where `quote` is absent. Stated rather than left
    to be inferred from a missing field, for the reason every other reduction marker in §6 is stated
- **`unresolved[]`** `0..n` — ambiguities intake could not clear, carried forward rather than assumed,
  each with its **`ref`** and the **`question`** left open
- **`items_supplied`** · **`items_read`** — how many A2 items the run held and how many the reduction
  actually covered. **Equal is the ordinary case and unequal is the interesting one**: intake that read
  less than it was given has narrowed the evidence base, and the artifact says so rather than the
  difference being invisible

Numbered `A2b` rather than `A16` so it reads beside the material it reduces. Nothing was renumbered.

### 6.4 A3 · Problem Hypothesis Set

Every hypothesis carries its evidence and a derived trust tag. No evidence means `unrated` — the
hypothesis is kept and labelled, not dropped.

*opportunity, candidate · run scope · produced by 2.2 `hypothesis-authoring`*

- **`hypotheses[]`** `1..n`
  - **`id`** — unique within the run
  - **`statement`** — the problem, one sentence. **Never a solution** — see below
  - **`evidence[]`** `0..n` — references into **A2 only**, **by observation `id` where the intake gave one
    and by item `ref` where it did not.** An id is the sharper citation and the one to prefer: it names the
    observation the hypothesis actually rests on, so the trust arithmetic grades that observation rather
    than every observation its item happened to carry
  - **`trust`** — `strong | weak | unrated` · **derived**, never asserted
  - **`rationale`** — why this trust level
  - **`disconfirming`** — **what would contradict this hypothesis**, named against this run's own material
    or as the observation somebody would have to find. Never derived, never a caveat, and refused by
    **C82** where it is generic. **The tag says how much the evidence is worth and never what would change
    the answer**; a `strong` hypothesis needs this most, because two independent origins is where a run
    stops looking and this is the only record of what it stopped looking for
  - **`themes[]`** `1..n` — short descriptive tags, so a dozen hypotheses group without a taxonomy
  - **`kind`** — `true | barrier`. A fear, need or loss, against friction, process or interface. **Both
    belong; what the field prevents is a run promoting only barriers** and shipping an initiative that
    removed friction from something nobody cared about
  - **`reduced_from[]`** `0..n` — *optional.* The solution-shaped candidates this hypothesis absorbed.
    **A list, because one hypothesis can absorb more than one candidate**, and it mirrors `rejected[]`
    below, which records the same kind of candidate taking the other outcome
    - **`ref`** — the A2b observation the candidate arrived on
    - **`statement`** — the candidate as it arrived, so the move is visible rather than silent

**A problem statement never names a thing to build.** A candidate
that does is **solution-shaped**, and it gets one of three outcomes:

- **Reduced**, where the intake record reports the need beneath it and no hypothesis in the set states
  that need yet. The hypothesis states the need and carries the candidate in `reduced_from`.
- **Record on the hypothesis that already states it**, where the need is real and a hypothesis in the set
  already carries it. No second hypothesis is created and the candidate joins that hypothesis's
  `reduced_from`. **Owned by Evidence Standards §5.3**, and C94 compares this
  document and the skill with the body.
- **Rejected**, where no observation supports a need underneath it. **Then it is not a problem**, and it
  does not enter `hypotheses[]` at all.

- **`rejected[]`** `0..n` — candidates that are not problems, **retained and never deleted**
  - **`statement`** — the candidate as it arrived
  - **`reason`** — why no need could be extracted from what the observations say
  - **`from[]`** `0..n` — the observation refs it came from, empty where it was asserted with none

> **Shape and evidence are different questions and must not be conflated.** A statement with no evidence
> that is genuinely problem-shaped is a problem, and rates `unrated`. A solution-shaped statement with
> excellent evidence is still not a problem. **Rejection is about shape alone**, which is why `unrated`
> stays reachable and why `rejected[]` carries no trust tag.

The skill also records what it read and what it deliberately did not use, so a reviewer can see the
shape of the reduction rather than only its output:

- **`observations_read`** — how many A2b observations the authoring pass considered
- **`not_evidence[]`** `0..n` — observations examined and rejected as evidence, each with its **`ref`** and
  the reason. §2 of the Evidence Standards makes this a judgement, and a judgement nobody records is one
  nobody can review
- **`not_restated`** — observations that only restated a hypothesis, counted separately because that is the
  specific failure `unrated` exists to keep reachable
- **`carried_unresolved[]`** `0..n` — A2b's unresolved ambiguities carried forward rather than assumed
  away, each with its **`ref`** and the **`question`** still open
- **`contradictions[]`** `0..n` — *optional.* A claim in an earlier document of stage 2 that this step's evidence
  contradicts, kept until the person decides
  - **`id`** — `K1`, `K2`, in the order found
  - **`document`** — the stage 2 artifact holding the claim, by id
  - **`claim`** — the claim, quoted word for word from that document
  - **`evidence`** — the observation ids that show otherwise, and what they show, in one sentence
  - **`resolution`** — `open` or `corrected`. Absent reads as `open`

### 6.4b A3b · Framed Opportunities

**Every A3 hypothesis is framed, including the ones that will be parked.** The sizing is what decides the
ordering at 2.4, so it has to exist before the ordering runs, and a framed opportunity that is parked is a
better input to the next run than a parked hypothesis. The eleven sections are ČS's own Opportunity
template, which numbers 1 to 12 and carries no section 6; this schema carries eleven and invents no
twelfth.

*opportunity · run scope · produced by 2.3 `opportunity-framing`*

- **`opportunities[]`** `1..n` — **exactly one per A3 hypothesis**, none dropped, and any a person brings, each marked origin person
  - **`id`** — `O1` … unique within the run
  - **`from`** — the A3 hypothesis id this frames. One hypothesis, one opportunity. Absent only on an opportunity
    a person brought that no hypothesis covers
  - **`origin`** `0..1` — **the word person, where somebody in the room brought this opportunity. Absent means
    the agent framed it from a hypothesis**, and absent is the ordinary case. Optional, so no older run is short of
    it. The one permitted value is deliberately not in backticks on this bullet, because the carrier reads a
    backticked token here as another field.
  - **`description`** — §1. The problem the client experiences, in the client's terms
  - **`as_is`** — §3. What the client does or experiences today, drawn from the hypothesis's own evidence
  - **`outcome`** — §4. **The change in behaviour this is meant to produce, and never a thing to build.**
    Narrowed from the brief's `outcome` to this one opportunity. This is the field the whole section
    exists for: nothing before it required a problem to connect to what the run is for
  - **`segment`** — §5. Who this is for, narrowed from the brief's `customer_segment`
  - **`sizing`** — §2. Four factors, and **the ordering at 2.4 is made on these**. Each carries the answer
    and the standing of that answer as two fields, because one key cannot hold both and a figure with no
    standing beside it is the thing this whole stage exists to stop
    - **`customers`** — how many are affected and how often
      - **`statement`** — the answer, or what is missing and where that number normally lives
      - **`basis`** — `supplied | unknown`
      - **`rank`** `0..1` — this opportunity's place when the person ordered the set by how many customers each reaches,
        1 for the most; places may be shared. Absent where the person could not rank. Optional, so no older run is
        short of it.
    - **`market`** — what this means for the bank's position
      - **`statement`** — the answer, or the reason it is not here yet
      - **`basis`** — `deferred_to_stage_3 | supplied`. **The ordinary state here is deferred_to_stage_3,
        and it is not a gap**: stage 3 produces exactly this and runs after G2. Writing unknown would say
        nobody knows, which is untrue and hides that the answer is coming
    - **`company`** — the strategic impact
      - **`statement`** — the mechanism, **naming the key result the brief names**
      - **`basis`** — `derived | unknown`
    - **`impact`** — how important this is to the customer
      - **`statement`** — the answer as it was given
      - **`basis`** — `judgement | unknown`. **A basis of judgement means a person said so**, and a
        person's assertion is not evidence for it
      - **`rank`** `0..1` — this opportunity's place when the person ordered the set by how much each hurts customers,
        1 for the worst; places may be shared. Absent where the person could not rank.
  - **`validation`** — §7
    - **`trust`** — carried from the A3 hypothesis, **never recomputed here**. Framing adds no evidence. On an
      opportunity a person brought with no hypothesis under it, the word unknown
    - **`insights[]`** `1..7` — what the validation actually established
  - **`root_cause`** — §8
    - **`statement`** — why the problem occurs
    - **`basis`** — `analysis | assumption | unknown`. **Carried as an assumption where a person supplied it**, which
      is the ordinary case and does not inherit the opportunity's trust tag
  - **`alternatives`** — §9. **Empty at this stage, and the field says why rather than being absent.**
    A framing step that proposed solutions would pre-empt stage 4, which is the defect the order of this
    workflow exists to prevent. Stage 4 produces them and stage 7 links them back
  - **`metrics`** — §10
    - **`behavioural`** — the primary measure, from the brief's `success_signal` narrowed to this opportunity
    - **`business`** — from the brief's `goals[].metric` and the key result it feeds
    - **`qualitative`** — from the brief's `qualitative_signal`, `unknown` where it was not supplied
    - **`horizon`** — from the brief's `time_horizon`
  - **`risks[]`** `1..n` — §11. What may not be true, drawn from the hypothesis's `disconfirming` and from
    what the run could not establish

**ČS's twelfth section, the recommended next step, is not on this artifact and the reason is the order of
the stages.** It is a disposition a person takes, G2 is where a person decides, and G2 sits after 2.4. An
artifact produced at 2.3 that carried it would either be guessing or be edited after its own gate. It
lives on A4 instead, beside the decision that sets it, as `dispositions[]` in §6.5.

> **Required means present or marked, never filled.** The same bar C10 sets for brief fields. ČS's own
> template opens by saying these are not strict rules and that content is expected to be added over time
> by the assigned person, so a stricter bar would be this pilot being harder on the material than the bank
> is. **An unanswerable field is marked with its reason and with where the answer normally lives**, and
> the agent never supplies it.

> **Three of the eleven will commonly be unanswered on a material-only run**, and that is the
> no-inference rule working rather than the step failing: how many customers and how often, how important
> this is to them, and why the problem occurs. **`2026-05-corporate-coverage` is the case worth reading**:
> all four origins are bank staff and no customer was ever asked, so `impact` has nothing behind it at
> all. Nothing in A3 or A4 says that today, and §2 is what makes it visible.

### 6.5 A4 · Prioritised Opportunities

The run's opportunities. Every A3b framed opportunity appears in exactly one of the three lists; promotion
is a human act recorded at G2; `parked` is never emptied.

*opportunity · run scope · produced by 2.4 `prioritisation` + human · gate G2*

- **`primary[]`** `1..3` — promoted. The run is about these. **At least one is required**
- **`secondary[]`** `0..5` — promoted, supporting
- **`parked[]`** `0..n` — not promoted. Retained and visible, never deleted
- **`ordering_source`** — what the ordering within `primary[]` rests on, or that it carries no ordering.
  **A list has an order whatever anyone intended**, and this says whether that order means anything. Where
  neither measure, reach or how much it hurts, gives the opportunities two or more different places, the document
  carries the fixed sentence the prioritisation step gives, and only then: C116, at Q2, refuses an order that claims a
  ranking nobody made, on a run started on build 1.10 or later with two or more opportunities.
- **`carried_unresolved[]`** `0..n` — as A3, carried forward again rather than dropped at the gate, each with its **`ref`** and **`question`**
- **`dispositions[]`** `0..n` — **ČS's recommended next step, one per promoted opportunity, which A4 may carry.**
  The record frame the workflow writes for A4 asks the agent to fill one entry, and no check reads it; where A4
  carries it, the person approves it with the rest of A4 at G2, and it says more at the gate than which
  opportunities were promoted
  - **`opportunity`** — the A3b id it is about
  - **`next_step`** — `continue | complete_validation | stop | hand_over`. ČS's four, and no fifth
  - **`note`** — what has to be completed, or where it is going. **Required on `complete_validation` and
    on `hand_over`**, because a disposition nobody can act on is a decision that has not been taken

**Each entry is the id of an A3b opportunity, and nothing else.** The opportunity itself stays in A3b,
unchanged — same outcome, same sizing, same trust tag, same risks — and A4 does not restate it, because a copy
here would be a second place for one fact.

### 6.6 A5 · Landscape Map

*shared scope — written to S1, survives the run · produced by 3.1 `landscape-mapping` · gate Q3*

- **`topic`** — what this map covers
- **`queries[]`** `0..n` — **every query landscape mapping issued, written exactly as it was issued.** The agent is instructed to record them, the searches that write the cards are not recorded here, and no check reads this field. Entries
  are values, not objects. Empty where the stage reached nothing or researched only supplied addresses,
  which is a real state and not a gap

  > **A run may carry real ČS material, so what a query may contain is a rule**: `landscape-mapping` has a
  > query name the market, the category and public competitors and carry no wording from the brief, the
  > problem material or any artifact of the run. **That rule is the only thing standing between a bank's
  > own brief and a public search engine**, and this field is what lets a person reviewing the finished map
  > see the queries landscape mapping recorded. A map produced from 28 August 2026 owes the rule.
  >
  > **Verbatim is the whole point.** A paraphrase of a query is a second account of what left, written by
  > the party that wrote the first, and it is exactly what a reviewer cannot use.
- **`trends[]`** `9..15` — the movements the participants are representatives *of*, produced first (§2.1 of
  the Competitive Analysis Standards, which defines the entry in full). **Three classes and no others,
  3 to 5 each.** **C81** checks the classes and the regulatory pair
  - **A flat list, never grouped by class.** The class is a field on each entry, not a key above it
  - **`id`** — B1 to B5 business, T1 to T5 technology, R1 to R5 regulatory, unbackticked here because
    the generator reads a backticked token as a field name and these are values. **The join to a
    participant's `represents[]`**
  - **`class`** — which of the three this movement belongs to, in the vocabulary §2.1 sets
  - **`name`**
  - **`instrument`** — regulatory entries only. The regulation by name, never an unnamed one
  - **`effective`** — regulatory entries only. The date it bites, or that the date is unsettled
  - The rest of the entry is §2.1's and is not restated here

  > **The class names are written unbackticked because the generator reads a backticked word as a field
  > name.** Backticked, they would reach every producer as three fields of A5, and `class`, which is the
  > field C81 reads, would go unmentioned. **A value in backticks and a field in backticks are the same
  > token to the generator**, and only this document can tell them apart.
- **`participants[]`** `1..n` — *participants*, not *competitors*: the map carries direct, adjacent and
  substitute players, and a substitute is not a competitor in any ordinary sense
  - **Ten carry a card (C75), or where a person supplied the market the list's own count, never above ten and never below three (Standards v0.18)**, and the search that finds them runs banking before fintech and outward by
    ring — local, CEE, European, global where something is genuinely relevant (§2.2a). **The aim applies
    from Standards v0.6**, because a stage cannot be held to a bar written after it ran
  - **`identity_key`** — identity key, stable across runs. **The join to A6**
  - **`name`**
  - **`type`** — `direct | adjacent | substitute`. Sets the freshness threshold: **180 days direct,
    365 adjacent and substitute**
  - **`first_seen`** — when added to S1
  - **`represents[]`** `1..n` — the trend keys this participant is on the map as a representative *of*.
    A participant is here because it represents a movement, never as a name someone recognised
  - **`standing`** — `leader | innovator`, and **both must appear across the map**: a map of only leaders
    is the incumbent view and a map of only innovators is the trade press (Standards §2.2, C88)
  - **`deep_dive`** — whether this participant was selected for a card, and **`reason`** — why, either way.
    **Choosing what not to research is the judgement this stage makes**, and stage 3 has no human gate
    behind it to catch an unexplained omission (C55)

  > **Both fields are declared here although the Standards define them**, because C88 reads them and the
  > generated carrier takes its field list from §6: a body of know-how declaring a field is legitimate for
  > content and wrong for a field a gate reads.
- **`scope_field`** — the market boundary the map was drawn against, in the market's own terms
- **`reused[]`** `0..n` — participants carried from a previous run's store, each naming the participant by
  its **`identity_key`** and displaying its **`researched_at`** so inherited research is never silent. **Empty from release 1.7**:
  reuse is suspended and the map's participants are researched this run (§5.3), which the skills instruct and no check
  holds. At Q3, C55 refuses an entry that is a bare name or shows no research date, so reused research is not read as
  new, and C75 counts an entry toward the participants carrying a card
- **`unprofiled[]`** `0..n` — participants a deep dive was attempted on and failed, each naming the
  participant by its **`identity_key`** and the **`reason`** the branch could not complete.
  **A failed branch is recorded, not dropped**
- **`unrepresented_trends[]`** `0..n` — the trend ids no participant on this map represents, written as
  bare ids and nothing else. **A movement nobody in scope has answered is a finding, not an omission**,
  and this is where it is stated. Every trend is either named in some participant's representative list
  or listed here, and check C88 refuses a map where one is in neither

  > **Every cross-reference in this bullet is deliberately unbackticked.** The generator counts a
  > backticked token on a list's own bullet as a declaration of that list's entry fields, so naming the
  > representative field or the check in backticks here would have marked these entries as objects when
  > they are bare ids.

### 6.7 A6 · Competitor Deep-Dive

The durable half of competitive analysis. `researched_at` dates each card's research and is what reuse would
read; reuse is suspended from release 1.7 (§5.3).

*shared scope · produced by 3.2 `deep-dive` · gate Q3*

- **`cards[]`** `0..n` — one per deep-dive selection, and **`card`** singular on the record one invocation
  wrote (§6.0). A fan-out instance writes the singular; the document assembled from ten of them carries the
  list. Each card carries:
  - **`identity_key`** — matches `A5.participants[].identity_key`
  - **`name`** — the participant's own name, as `A5` carries it. **Two checks find a card's body section by
    it** — `C86` locates the per-participant profile section and `C100` reads the section set against it —
    so it is declared here as well as in the delegated set below: a body of know-how declaring a field is
    legitimate for content and wrong for a field a gate reads, because the carrier takes its field list
    from §6
  - **`researched_at`** — date of research. **Freshness basis; displayed on every reuse**
  - **`sources[]`** `4..n` — named, resolvable and **independent of each other**, and **at least one of them
    primary**, meaning a `publisher_key` equal to the card's `identity_key`. **Four distinct publisher keys,
    or two where a person supplied the market**, because a card resting on fewer parties cannot answer the
    standards the synthesis grades it against. **It is scoped on the Standards version stage 3 recorded**,
    exactly as the participant floor is, so no run is failed for a bar written after it ran: two before
    `0.10`, six from `0.10`, four from `0.16`, and two on a supplied market from `0.17` (C60). Each
    carries its **`ref`**, the **`publisher`** in prose, a **`publisher_key`**, when it was **`accessed`**, and
    its **`address`**, the page that was read. **On a supplied market the address is what holds the card to the
    list**: on a run started on build 1.3 or later, each source of a card the run researched itself carries one,
    and it is a listed address or a page under one (C184). **On every market, searched or supplied, the address is
    the page that was opened**: on a run started on build 1.16 or later, an address on a card the run researched that is
    a site's front page, its path `/` or empty with no query, is refused, and so is a source recording no address,
    since a search result is not a source
    (C184). **The key is what decides independence**, exactly as `origin_key` does for an observation (§4.2 of the
    Evidence Standards): prose cannot settle whether a vendor's walkthrough and the same vendor's product
    pages are one party or two (C60)
  - **`origin_key`** — **carried by `2026-03-investor-onboarding`'s cards and written by no producer from
    the current build.** It is the intake record's field (§6.3b), it identifies an observation's origin and not
    a participant, and a card that carries it is a producer that copied a neighbouring shape. It is declared
    here because the run is on disk and **a field nothing declares is a field nothing can check** (C42), on
    the same reasoning §3.1a of the Competitive Analysis Standards gives for the fields v0.12 retired. A
    card's own key is `identity_key`
  - **`primary_unreachable`** `O` — where the participant's own material could not be retrieved, why, naming
    what was attempted and what it returned. §3.2 puts primary material first and C60
    enforces it, and a participant's own site can be unreachable or, for a substitute, not exist at all:
    **declare the reduction rather than produce less.** The field is stated and read, never
    inferred from a card being thin, and C60 names it in its own message so a reader sees the gap rather
    than a pass.
  - **`confidential`** `0..1` — *yes* where the card rests on material internal to Česká spořitelna or not public: a
    page marked internal, a prototype or document that has not been published, or anything the person said is
    internal. *no* where the card rests on material the person supplied and said is public. Absent means the card
    rests only on public research the agent found. **A card marked *yes*, and a card resting on supplied material
    that is not marked *no*, stays in its run and never enters the shared competitor store.** Optional, so no older
    run is short of it.
  - **`…card field set`** — defined in the Competitive Analysis Standards

- **`unprofiled[]`** `0..n` — a participant `A5` marked for deep dive that this stage did not profile, each
  with its **`identity_key`**, its **`name`** and the **`reason`**. **The argument is C102's one artifact
  over**: a fan-out that loses an instance and says nothing produces a set that passes every check it
  faces, so **a failed branch is recorded, not dropped**.

While reuse is suspended the agent is instructed to research every participant selected this run; C9, at Q3, still refuses a card researched longer before the cards' produced date than its threshold. Extending a card mid-run by write-back during a
conversation is proposed and not built (§7.6).

### 6.8 A7 · Competitive Synthesis

The disposable half. Written against this run's opportunities, bound to this run's identifier, never reused.

*run scope, never reused · produced by 3.3 `synthesis` · gate Q3, no human approval*

- **`run_id`** — binds the synthesis to this run's opportunities
- **`standards[]`** `0..n` — the market norm. Entries carry **`key`**, **`statement`**, **`traces_to[]`**, **`addresses[]`**, and the two that grade it:
  - **`tier`** — `universal | common | emerging | rare`. **Counted, never judged** (§4.1 of the Standards)
  - **`source_count`** — `"N of M"`: how many profiled participants exhibit it, out of how many. **The tier follows from this fraction**, so two runs over the same cards land on the same value — the third piece of gradable arithmetic in this build after the trust tag and the confidence band. **C87** derives it and compares
- **`patterns[]`** `0..n` — recurring approaches. Entries carry **`key`**, **`statement`**, **`traces_to[]`** and **`addresses[]`**
- **`trends[]`** `0..n` — direction of travel. Entries carry the same four:
  - **`key`**
  - **`statement`**
  - **`traces_to[]`** `1..n` — an A6 `key`, or a named source
  - **`addresses[]`** `1..n` — the A4 opportunities this element bears on. An element addressing none is market
    research the run did not need
**On the element's own identifier.** Each of the three lists above declares `key` on its entries, which is
where it lives: it is the element's own name and never the synthesis's. Example runs write them in the
form `ST1`, `P3`, `TR-B3`, and their solution sets cite exactly those strings in `supported_by[]`. **Naming
itself is the point**: §6.9 requires every solution to bind at least one synthesis element, and `C5` reads
`key` to resolve each binding and refuses a synthesis whose elements carry none.
- **`absences[]`** `0..n` — promoted opportunities that meet **no** market response, each naming the
  **`problem`** and what was looked for. **The silence is the finding** (C56), and a synthesis reports what
  it found, so nothing would record it unless something required it

### 6.9 A8 · Solution Set

**Every solution is written up in the body in the same eight sections** (C83), and the set is fixed the way
the initiative's thirteen and the PRD's eight are fixed. **The producer writes seven; the eighth is
generated and no producer writes one.**

| # | Heading | Length | Carries, and what it must not |
|---|---|---|---|
| **1** | **What it is** | crisp definition + 1–2 paragraphs | A definition sentence, then the category and what makes it distinct. **A reader knows what the solution IS by the end of the first sentence** — no buildup, no context-setting |
| **2** | **What it does** | 1–2 paragraphs | **The change in client behaviour**, citing the opportunity ids it produces that change for. **Not how it works** — no mechanism, no screens, no steps |
| **3** | **How it does it** | 2–3 paragraphs | **Concrete client and staff experience, not architecture.** The interactions, the inputs, the outputs |
| **4** | **The problem it solves, and for whom** | 1–2 paragraphs | The problem in the client's terms and the segment the brief declares. **Not the solution** — the client's situation as it stands today, before this exists |
| **5** | **Opportunities it is built on** | one line each | The primary opportunity and every id in `solves[]`, each with what the solution takes from it. **Not a restatement of the opportunity text** |
| **6** | **Against the market** | 2–3 paragraphs, **two named parts** | *Standards it is built on* and *trends it rides*, including the patterns where it matches or breaks a shared one, **each named by the id `A7` gave it and never by an assumed prefix** — runs have written `ST1`, `TR-B3`, `S3` and `T1` for the same kinds of element and nothing pins one. **Every id in `supported_by[]` appears in one of the two** (C164, which resolves `key` or `id`). Nothing is a bare difference claim: *unlike existing solutions* asserts a difference against nobody |
| **7** | **Strategic alignment** | 1–2 paragraphs | At least one pillar the **Strategy Basis** declares and how the solution serves it, then the key result and the chain from the solution's own product metric, or the reason none fits and which were considered. **The pillars come from the basis and never from the brief** |
| **8** | **Compliance** | generated | The plain paragraph, `# of touchpoints: X`, and the touchpoints that answered `yes` printed as the card wrote them. **No producer writes this section** |

> **How it does it points back at what it does**, and the pairing is what stops one drifting into the
> other. **Who the solution is for is a clause of the problem it solves, and for whom**, not a section of
> its own, because on a single-segment run every solution would repeat one sentence. **Against the market
> carries its citation rules written down.**
>
> **§6 carries two parts and not three.** There is no part for *the gap it exploits*: stage 3 files an absence under the opportunity it bears on and gives it no id of its own,
> so the part could be written and never cited, and `C164` could not see it. **The opportunity is already
> named in §4 and listed in §5**, which is where the gap was going to be visible anyway.

> **Every section carries a length and a binding, and the three that point at the opportunities carry what
> they must not contain.** That is what produces depth, and it is independent of how many sections
> there are. *Not architecture* on §3 is what stops two sections saying the same thing
> twice, and §2, §4 and §5 carry the same kind of line because all three point at the opportunities.

> **The first-sentence rule is the one kept verbatim**, because solutions that open with context are the ones a
> decision gate cannot compare — the comparison starts three sentences into each. **A solution that never
> says how a customer would use the thing** leaves stage 5 to invent the interaction.

> **C83 reads the document, not a self-report.** C16 reads the initiative's declaration of its sections and,
> for an initiative assembled from 14 September 2026, its headings as well. **C83 reads the sections in force
> when the artifact was written**, so the six-section runs are asked for six and nothing written since
> 7 September is asked for a heading that moved.

**Each solution's heading carries its id and the name its author gave it** (C106). The record holds `id`,
`statement`, `description`, `solves[]` and `supported_by[]` and **no field on it holds what the solution is
called**, so the heading is the only place the name lives and dropping it there removes it from the run.
C83 asks that an id resolve to a heading and C99 exempts a solution id from the machinery rule for that
reason, so `## ID-1` would satisfy both, and C106 is what refuses it.

Each solution is bound in two directions — to the opportunities it solves and to the market evidence supporting
it.

*solution, candidate · run scope · assembled by a script from the parts · gate Q4*

**A8 is what the parts hold, transferred verbatim.** It is not written by a model at
all: an authoring invocation writes one solution to its own file, a script derives that solution's
compliance section into a second file beside it, and the assembly concatenates the two in slate order
behind one table.

**Three files per solution, one writer each and one destination each.** `parts/{id}.md` carries sections 1
to 7 and goes into `A8` verbatim; the answers to every question the four area cards ask are the stage's
record under `records/4-solutions/`, one per solution keyed by `item_id`, and never go into `A8`;
`parts/{id}.compliance.md` carries §8, derived from those answers, and goes into `A8` verbatim. **The assembly copies the
first and third and chooses nothing**, which is what makes `C104`'s word-for-word comparison a comparison
rather than a judgement. **A part is not one file with regions in it**, because a delimited region is a
rule a producer is asked to respect, and a separate file is a boundary rather than a rule.

**The derived file names the solution it was derived from by content hash**, and the assembly refuses one
whose hash the solution file no longer has. **A hash and not a timestamp**: a checkout stamps every file with
the time it was cloned, so a freshness rule reading the clock fails example runs on a fresh checkout and
passes a stale file somebody touched.

**A8 opens with one table, then the solutions in the same order.** One row each: the id, the name its author
gave it, the opportunities it addresses on a run started on build 1.12 or later, the touchpoint count, and the areas
in play, written by the join (`solution-join.mjs`); there is no premise column. **It is an index and never a
ranking** — slate order, no sorting, no column implying better or worse. The opportunities show what each solution
reaches and the touchpoint count shows the compliance work it brings; the two are never combined. The count is there
because a reader would otherwise gather it by hand across fifteen pages. The table has a row for each solution whose
part is written: a solution the stage set out to write and did not is not on it, and the producer lists it with its
reason in `unproduced[]` (below), which is where a person sees a partial set.

- **`ideas[]`** `3..10` — **five by default, floor three, and only a person reaches the ceiling** by adding
  at the slate or after the set is presented. Every solution past the fifth is another seven sections and
  another pass over all four cards, which is a cost somebody should choose rather than inherit
  - **`id`**
  - **`statement`** — one sentence
  - **`description`**
  - **`solves[]`** `1..n` — A4 opportunity ids. **Empty makes the solution invalid**
  - **`supported_by[]`** `1..n` — A7 elements. **Empty makes the solution invalid**
  - **`origin`** `0..1` — **the word person, where somebody in the room proposed this solution. Absent means
    the machine wrote it**, and absent is the ordinary case. Optional, so no older run is short of it.
    The one permitted value is deliberately not in backticks on this bullet, because the carrier reads a
    backticked token here as another field.

    > **The ceiling is a person's, and this says which solutions are theirs.** On a set produced before
    > 7 September 2026, C103 exempted a solution carrying `origin: person` from the rule that no solution's
    > `solves[]` may sit inside another's: a machine producing a narrower version of an idea already on the slate
    > is repeating itself, and a person doing it is making a point about scope. **On a set from 7 September 2026
    > C103, at Q4, refuses only more than three solutions sharing one identical list**, because four solutions
    > on one list are one bet; the subset rule does not run there, and the field says which solutions are a
    > person's and exempts nothing.
  - **`compliance_touchpoints[]`** `0..n` — **the ids of the touchpoints the solution fired, and any it could
    not settle**, from the four area cards: DP-01, TP-19, IT-07. Every touchpoint its answers say yes to and
    every one they leave as cannot tell yet, never one they say no to: a touchpoint the solution could not
    settle travels into the MVP, where stage 5 writes it in or narrows it out with a reason. Written by the
    authoring invocation beside the answers it gave, and carried onto A8 by the join word for word. Free
    prose on a set produced before 7 September 2026.

    > **The word for an affirmative answer is deliberately not in backticks anywhere on this bullet**,
    > because the carrier's generator reads a backticked token on a list's own bullet as a declaration of
    > that list's entry fields. **The compliance section is derived from the answers, and this list is
    > written by the producer to the rule above**: no check compares the two, which is the known gap below.
    > A stage-5 entry's
    > `sub_domain` values are the ones each fired touchpoint's `Engages` column declares

    > **The compliance section is evaluated against each solution, because a solution can fire a touchpoint
    > another does not**, so the sections differ from each other and that is the comparison. If every
    > solution's section comes out identical, that is a finding about the solution set, and the skill
    > instructs the producer to say so rather than manufacture a difference.

    > **The two words the section may never carry.** *Not applicable* is a compliance judgement and this
    > workflow does not make them (`CR-B3`, C125). And *cannot determine* never collapses into *not
    > triggered*: one says the solution was examined and nothing fired, the other says it could not be
    > examined. **They look alike on a page and they are opposite facts.**

    > **A section that resolved everything is a defect rather than a clean run** (`CR-B4`). Every
    > unresolved answer names the input that was missing (C126), so a reader knows what to go and get.

    > **The known gap, and it is the reason the section is a starting point for a person rather than a
    > clearance.** The producer answers every question the four area cards carry and a script derives the
    > section, so the set examined is the cards' rather than the producer's. What that does not close is
    > the list on this bullet: **the producer is instructed to write it to the rule above, every touchpoint answered yes and
    > any it could not settle, never one answered no, and no check compares it with the answers; C7 refuses
    > only an entry that is empty or blank.** On record as indicative rather than a control, and it must not be described
    > as one.
  - **`compliance`** — **written by no producer from 7 September 2026.** The screen, run against the
    solution and written on it, which a solution set produced from 1 to 6 September 2026 carries on every
    solution; no example run holds one. On such a set C125, C126 and C129 read it. **A set from 7 September
    carries none**: each solution's answers are on its record and a script derives the section a person
    reads. There three checks run at Q4: C125 refuses a section that does not follow from its answers, C126 an
    area missing from it or an open question naming no input that would settle it, and C129 counts the triggers
    the section names and cannot fail. **The derived section names an escalation trigger only where the area
    card's §11 ties it to a sub-domain one of the solution's cannot-tell answers engages**, so the uncertainty a
    trigger exists to catch does not silence it. Nine of the 53 triggers across the four cards carry such a tie,
    two of the Compliance card's fourteen; the other 44, the AI trigger C-E9 among them, are not evaluated on a
    set from 7 September 2026, and no section names them.
    The object examines the solution and **makes no compliance judgement**, which is the reason the middle
    state says what the solution did not contain rather than that a regime does not apply. It carries:
    - **`areas[]`** — one entry per area the RegMap declares, **all four, always** (C126). Written out
      here rather than referred to, because **a field named only by pointing at another section is a field
      the carrier declares as a plain value**. Each entry carries an **`area`**, its identifier from
      `.github/registry/regmap.yaml`; a **`filled`**, whether the area has a card, which all four do, one
      supplied by ČS and three written from public law, as the RegMap's `source` records, and
      **an unfilled area returns *no map* for the whole area and never returns clean** (`CR-B5`); a
      **`source`**, `cs_card` or
      `authored_here`, copied from the RegMap, so the record says which card the screen read. It stays on the
      record and no section prints it; a **`triggers_fired[]`** whose entries carry a **`trigger`**, the card's own id, and a
      **`puts_in_play`**, the sub-domains it put in play, naming at least one (C126); and a
      **`sub_domains[]`**, one entry per sub-domain the card declares with none omitted and none blank,
      whose entries carry a **`sub_domain`**, the card's id; a **`state`**, `in_play`, `not_triggered` or
      *cannot determine* and **there is no fourth state** (C125); a **`because`**, the reason in the words
      §4.2 of the mechanism body requires; and, **required on a** *cannot determine* **and refused elsewhere**, a
      **`missing_input`**, the identifier from `.github/registry/screening-inputs.yaml` that would settle
      it (C126)
    - **`escalation`** — **the flag, and it is carried beside the screen and never inside it** (`CR-D`).
      It contributes no points to anything, and it is the shape of a set from 1 to 6 September 2026. It
      carries a **`flag`**, `true` where any escalation trigger fired and `false` where none did, never absent; and a **`fired[]`** `0..n` whose entries carry an
      **`area`**, a **`trigger`** by its §11 id, a **`because`**, a **`routes_to`**, and, **required on a
      trigger the card marks as routing outside the four areas**, a **`note`** saying so (`CR-D6`).
      **`routes_to` reads** *unstated* **on every trigger today and that is a fact about the cards** — the ČS
      transcript lists fourteen triggers and no roles, and the three cards written here inherited the
      claim without the content
    - **`uncovered[]`** — the areas the map does not cover, from the RegMap's own `out_of_scope`, each
      entry carrying an **`area`** and its **`disposition`**. **A reader who cannot see the edge of the
      work assumes there is no edge**
    - **`summary`** — *from 4 September 2026.* **The three things a person choosing between five solutions
      has to know**, and the only part of this section written for them. It carries an **`in_play[]`**,
      the areas holding at least one sub-domain in play, named in words; an **`escalation`**, one sentence
      saying what escalates and where it routes, or that nothing does; and an **`open[]`**, one entry per
      unresolved sub-domain, each saying what somebody has to go and get. `C166` derives all three from
      the structure above and refuses a summary that says less or more than the screen found. **It reads
      a set produced from 4 to 6 September 2026 and nothing on a set from 7 September**, where the summary
      opens the derived section and `C125` compares that whole section with its generator.

      > **Everything else in this section is evidence that the screen ran**, and together it is a data
      > structure, while the person reading it at the gate is a product manager. The summary is what is
      > written for them.
      >
      > **This is not the states summarised away.** They stay, they are still what makes the screen
      > honest, and the summary is checked against them rather than written beside them

- **`unproduced[]`** `0..n` — a solution the stage set out to author and did not, each carrying its **`id`**
  and a **`reason`**. **The field exists because stage 4 is a fan-out** (R3.6-1): one invocation names
  the set, one invocation authors each solution, and a join assembles them. **An instance that fails and is
  simply left out produces a shorter set that passes every check** — four solutions where five were intended
  is inside the 3..10 bound and nothing on the artifact says one is missing. R3.6-3 requires a partial set
  to be a stated result, and this is where it is stated. An id here appears nowhere in `ideas[]`, and the
  two together are what the cardinality is read against (C102)

- **`evidence_basis`** `0..1` — the value *pre_synthesis* on a set authored while A7 does not exist, and absent
  otherwise. The ideation skill tells a producer to write it, so it is declared here, or C42 would refuse the set.
  It is only reachable when stage 3 has not run, which is the ordinary state of a free-roam invocation

**A8 carries no score, no rank, no ordering and no recommendation.** Not as a rule the skill is asked to
follow alone: the artifact has no field for one, and C70, at Q4, refuses the score fields it names on a solution or
on the set, because a score on the solutions a person chooses between steers the choice with a number.

### 6.9c A8c · Option Screens · **retired 1 September 2026**

The same screen, run again against each solution separately. **It is what makes the difficulty side of the
comparison discriminating**: a payment-credential product and a notification change carry different
regulatory reach, and only the option-level screen sees it.

> **Each solution is still screened on its own, and not in a document of its own.** Screening each solution
> is what makes the regulatory side of the comparison discriminating, and it is a **section on the solution
> itself** (§6.9): the authoring invocation answers every question the four area cards carry, and a script
> derives the section from those answers. No producer writes it.
>
> **`inherited_from` and `removed[]` went with the initiative screen**, and they had to. Both are claims
> about a set this option started from, and with no A1b there is no set to start from — an `inherited_from`
> naming a retired artifact and a `removed[]` measured against nothing are two fields that would read as
> controls and be neither. What the pair was for, **making the difference between options visible on the
> page**, is now carried by the sections differing from each other, which is the comparison the fields
> were a proxy for.
>
> **Declared for the same reason §6.2b is**: two example runs hold one, and `C42` refuses a field
> nothing declares. C127, which held the fields below, is no longer in the build; where a line names it, it
> names the rule a run was held to then.

*solution, candidate · run scope · produced by nothing since 1 September 2026 · no gate · was 4.2 `option-screening`, gate Q4*

- **`screens[]`** — one entry per A8 solution, **exactly one, and none for a solution A8 does not carry**
  (C127). Each carries:
  - **`idea`** — the A8 solution id. The only thing this artifact copies from A8
  - **`areas[]`** — §6.2b's shape, written out here rather than referred to. Each entry carries an
    **`area`**, a **`filled`**, a **`source`**, a **`triggers_fired[]`** whose entries carry a
    **`trigger`** and a **`puts_in_play`**, and a **`sub_domains[]`** whose entries carry a
    **`sub_domain`**, a **`state`**, a **`because`** and, only on a `cannot_determine`, a
    **`missing_input`**. **A field named only by pointing at another section is a field the carrier
    declares as a plain value**
  - **`inherited_from`** — `A1b`. The initiative screen this one starts from
  - **`removed[]`** `0..n` — every sub-domain in play at M1 that this option does **not** put in play, each
    with a **`sub_domain`** and a **`reason`**. **Removing one requires a stated reason and adding one does
    not** (`CR-B9`, C127)
  - **`escalation`** — §6.2b's shape again, written out: a **`flag`**, and a **`fired[]`** whose entries
    carry an **`area`**, a **`trigger`**, a **`because`**, a **`routes_to`** and, where the card routes
    outside the four areas, a **`note`**. Evaluated against this option, because **an option can fire a
    trigger the initiative did not**, which is the same reason the per-option screen exists at all
  - **`uncovered[]`** — §6.2b's shape, each entry an **`area`** and a **`disposition`**

> **If every option inherits an identical set, this artifact contributes nothing to the comparison it
> exists to serve.** The complexity value would be the same for all of them, and the difficulty axis would
> stop separating anything. That is not a rule a producer is asked to follow — it is what the artifact is
> for, and `removed[]` is the field that makes the difference visible on the page.

> **It carries no value and no score.** No complexity value is produced (`CR-C6`), and stage 4 gives no
> score of any kind (§6.9b). **A screen is worth having without a value**: it is the output that changes
> what a person sees at a decision point, and it works on every area that has a card.

### 6.9b A8b · Solution Scores · **retired 7 September 2026**

> **Nothing produces this any more, and the fields below stay declared.** Stage 4 stopped scoring on
> 7 September 2026: no score of any kind is given, and what a person compares at G4 is the touchpoint list
> and the count on A8 itself (§6.9). Nine example runs hold one, and `C42` reads every example run against
> §6, so the fields and the scoring registry stay and those runs remain readable. **Declaring a field is not
> endorsing it.**

> **No check grades these fields any more.** `C20`, `C21`, `C71`, `C133` and `C165` graded A8b while scores
> were produced and are no longer in the build; where a line below names one, it names the rule a run was graded
> on then.

*solution, candidate · run scope · produced by nothing since 7 September 2026 · no gate · was 4.3 `idea-scoring`, gate Q4*

- **`scores[]`** — one entry per A8 solution, **exactly one, and none for a solution A8 does not carry** (C71)
  - **`idea`** — the A8 solution id. **The only thing A8b copies from A8**
  - **`given[]`** `0..n` — one entry per score the model declares. All mandatory:
    - **`score`** — which score this is, from [`scoring.yaml`](../.github/registry/scoring.yaml). The registry
      holds the model older runs were scored under, `strategic-alignment` and `regulatory-complexity`, and **a score the model does not declare was
      refused** (C133)
    - **`band`** — the named band it fell in, from the body that anchors it. **A bare number is meaningless
      across runs**; the band is what makes a claim here and a claim there the same claim
    - **`rationale`** — why it fell in that band
    - **`placed_by`** — *from 4 September 2026.* The facts that placed it, one key per entry the score's
      own `separates:` list declares in [`scoring.yaml`](../.github/registry/scoring.yaml). **A band is a
      summary of reasoning the producer already did, and the reasoning is more discriminating than its
      summary**. It is not a finer scale, because no body anchors a finer one. It is the evidence the band was cut on, carried beside it,
      so four solutions at *Heavy* are four different rows (C165)
  - **`unscored[]`** `0..n` — a score the model declares that this run could not give
    - **`dimension`** — which one
    - **`reason`** — why it could not be given

  > **There is no denominator and no axis on an entry scored from 1 September 2026.** An entry scored
  > before then carried a `potential` and a `difficulty` block, each with a `denominator` and
  > `sub_scores[]` against weighted sub-dimensions, and §8.3 carries that model.
  >
  - **Carried before 1 September 2026 and still declared, so example runs remain readable:**
    - **`potential`** — the former potential axis block
    - **`difficulty`** — the former difficulty axis block
    - **`denominator`** — what an axis was scored out of
    - **`sub_scores`** — the per-sub-dimension entries beneath an axis

  > **These four are declared and refused at the same time, deliberately.** `C42` reads every example run
  > against §6, so they stay declared, and `C133` refused them on anything written after the
  > boundary, which is where a rule about the model belongs. **Declaring a field is not endorsing it.**

  > **The inner list is `given[]` and not `scores[]`, because `scores[]` is the outer one.** A8b's entries live under `scores[]`, and nesting a second `scores` inside each entry collided with `C71`, which refused a solution field on this artifact and read the inner key as one.

  > **A dimension out of the model is not `unscored[]`.** Unscored is a fact about one run: the bands exist
  > and this run could not apply them. Out of the model is a fact about the build, stated once in the
  > registry rather than five times per solution, and C133 refused an entry naming one.

On a run that carries A8b the two scores are never combined into one number, and A8b carries an id and the
scores and nothing of the solution, so the step that scored could not edit a solution and nothing was
copied.

### 6.10 A9 · Selected Solution

*solution · run scope · written at G4 by the workflow, from a person's recorded choice · gate G4*

- **the selection is on the G4 decision record**, `decision.selection` — `A8.ideas[].id`, **exactly one per
  run**, and **not repeated as a top-level field**, because a copy and the record could disagree behind a green
  gate (C11, C12)
- **`selected_by`** — a human. Never an agent. The build records who chose as `decision.accepted_by` and writes
  no `selected_by`; the example runs' A9 records carry it
- **`selected_at`** — the day of the choice. The build records it as `decision.accepted_at`; the example runs' A9
  records carry it
- **`rationale`** — why this one. **Required, and the approval does not complete without it.** It is box 3 of
  `SPOCK: record a decision I made`, which asks why, and the approval copies it word for word under *Why this
  one* in the document's body, which is where the build records it; the example runs' A9 records carry it as
  `rationale`. A decision with no reason recorded is the one thing this stage cannot afford to lose, because every
  stage after it is built on the choice and none of them can see what it rested on
- **`selected_by`, `selected_at` and the `G4` record come from one person's two acts**: they record the choice
  and its reason, then approve, and **the approval writes the whole document from that
  record**, so the artifact and the run record cannot disagree and no agent writes any of it. The person is the
  stage owner named at the start of the stage, and **the gate does not ask a second time**

> **A reason recorded here rests on what the solutions say, not on a score**, because a solution set from
> 7 September 2026 carries none.

> **There is no *none of these*, and the design is why.** A person who likes none of the set does not refuse
> it: they change one or add their own, at the slate or when the set is presented, up to the ten of §6.9.
> **The set is theirs to alter until it holds something they will pick**, so a run always ends this stage
> with one solution selected.

Non-selected solutions remain in A8, unaltered.

### 6.11 A10 · MVP Options

Alternatives to choose between, not phases to sequence. No option carries a preference marker.

*artifact · run scope · produced by 5.1 `mvp-option-design` · no gate of its own: the option is chosen as a recorded decision while stage 5 runs, and stage 5 is decided at G5b. A run before 10 September 2026 carries a G5a record here*

- **`options[]`** `2..6` — **alternatives**, not sequenced phases
  - **`id`**
  - **`statement`**
  - **`approach`** — how this pilots A9
  - **`differs_by`** — what makes it materially distinct from the others
  - **`constraints_met[]`** `0..n` — references into Banking Constraints. **The skill instructs the producer
    to leave it empty**, because that body is retired, and to write constraint_basis none_stated on the
    option set instead. No script reads it, and an example run carries values in it
  - **`origin`** `0..1` — **the word person, where a person added this option. Absent means the
    machine wrote it**, and absent is the ordinary case. Optional, so no older run is short of it. The
    one permitted value is deliberately not in backticks on this bullet, for the reason §6.9 gives on the
    same field.

    > **A person may add up to three options of their own, and this is what lets the record count them.** A
    > numeric allowance nobody can count is not an allowance.
    >
    > **Like A8's on a set from 7 September 2026, this one earns no exemption.** A10 has no ladder rule.

### 6.12 A11 · Expanded MVP

*artifact · run scope · produced by 5.2 `mvp-expansion` · gate G5b*

- **`option_id`** — `A10.options[].id`. **The selected one only**
- **`description`** — full
- **`strategic_touchpoints[]`** `0..n` — each naming the **`touchpoint`** and the **`basis`** it rests on
- **`compliance_touchpoints[]`** `0..n` — **the sub-domains the selected solution's fired touchpoints engage, each bound to
  something concrete in this document** (`CR-E`). **Inherited from the compliance section of the selected
  solution on `A8`**, never re-derived. Each entry carries:
  - **`area`** — the RegMap area id
  - **`sub_domain`** — that area's card id, `S1`, `G4`, and so on. **Not free text** (`CR-E2`)
  - **`trigger`** — the §3 applicability trigger that put it in play, by its card id
  - **`resolution`** — exactly one of `requirement`, `open_item` or `narrowed_out`, **and there is no
    fourth** (`CR-E1`)
  - **`names`** — *required on `requirement`.* The functionality that addresses it, locatable in this
    document
  - **`owner`** and **`decided_at`** — *required on `open_item`.* Who holds it and the point at which it
    will be decided
  - **`reason`** — *required on `narrowed_out`.* Why the scope narrowing past the screen means it no longer
    applies
  - **`touchpoint`** and **`basis`** — the prose name and what it rests on, kept because they are what a
    reader reads
- **`unexamined_areas[]`** `0..n` — every area with no card, named here as unexamined (`CR-E3`). **An area
  that examined nothing must say so in the document, not only on the screen**, because the document is what
  a person outside this workflow reads

> **What makes a consideration real is that something in the document changes because of it.** Whether it
> is *adequately* addressed needs a person. **Whether it is addressed at all does not** — a sub-domain
> naming no functionality, no owned open item and no reason has been listed rather than addressed, and that
> half is settled without a reader (`C130`).

> **Naming the sub-domain is what makes coverage countable**, and it is possible because the selected
> solution carries an accepted compliance section to inherit from. A producer naming its own set from
> scratch is the drift `C130` and `C131` exist to stop.

> **The entry fields are written out rather than called the same shape as another list**, because the
> carrier reads structure and not prose, and **a carrier stating the wrong shape is worse than one stating
> none, because the producer follows it** (Workflow Blueprint R7-13).
- **`analyst_input`** — what stage 6 needs

Traces to A9, and through it to A4.

### 6.13 A12 · PRD (draft) → A13 · PRD (agreed)

The same document in two states. `prd` writes the draft. The Product Manager then marks the draft agreed,
and the workflow writes the agreed PRD from it word for word, with their name and the date in its agreement
block. A PRD without a completed agreement block is not A13.

*artifact · run scope · content produced by 6.1 / 6.2 `prd`; A13 written by the workflow from A12 at the agreement mark · gate G6*

**A12**
- **`…PRD Template section set`** — defined separately in PRD Template and carried as **`sections[]`**, one
  entry per template section:
  - **`id`** — the template's own section id, and **the field that decides whether a section was addressed
    at all**. `sectionCoverage` matches the declared ids against the fixed set and `C67` reads the result.
    On a PRD assembled from 16 September 2026 **it reads the section headings off the page as well**, which
    the envelope step writes from the PRD Template in the language `A1` declares
  - **`status`** — `present | not_applicable`, and nothing else. A third value reads as a fourth state
  - **`reason`** — required where the status is `not_applicable`. **Without it a skipped section looks
    decided rather than skipped**, which is the difference a person is at G6 to judge
- **`requirements[]`** `1..n` — each carrying:
  - **`id`** — and **it resolves to its own heading in the body** (`C67`), so a requirement cannot be
    declared and left unwritten, and the body cannot quietly lose one the record still traces from
  - **`traces_to[]`** — what `C12` walks from the initiative back to the opportunities
- **`statement`** — **written by no producer from the current build as a field of its own.** It is the sentence
  the second alignment pass writes, inside `alignment_validation` beside its objectives and basis. A requirement carries none on the
  record: the record carries a requirement's id and lineage, its statement is prose that lives in the body once,
  and C67, at Q6, refuses a requirement written in both.
- **`alignment_validation`** — **mandatory**. The second alignment pass (§8.4), naming the
  **`objectives`** it was checked against and the **`basis`** for them. C31, at Q6, refuses a draft or an agreed
  PRD whose pass carries no statement, because a PRD without it reaches agreement with the check unrecorded
- **`compliance_touchpoints[]`** — carried forward from A11 and **resolved, not merely listed**: by a
  requirement, an open item or a narrowing (C130, at Q5 and Q6, on an entry that names an area). Each entry carries the **`area`**, the **`sub_domain`**, the **`trigger`**, the
  **`resolution`**, and the field that resolution requires — **`names`**, or **`owner`** and
  **`decided_at`**, or **`reason`** — plus the **`touchpoint`** and its **`basis`**.

  > **Written out rather than called *the same shape as A11*, for the reason §6.12 gives.**

  **The PRD inherits the set and does not re-derive it** (`CR-E4`): a sub-domain in play at A11 appears
  here in one of the three bound forms.
  **Adding one requires the trigger that fired it and a re-accepted screen** (`CR-E5`); **dropping one
  requires a written reason and a named person** (`CR-E6`), and `C131` refuses a silent disappearance
- **`unexamined_areas[]`** — carried forward from A11 unchanged, for `CR-E3`'s reason
- **`dropped_touchpoints[]`** `0..n` — every sub-domain bound at A11 and not bound here, each with the
  **`area`**, the **`sub_domain`**, a written **`reason`**, and **`dropped_by`**, the person who decided it
  (`CR-E6`). **A silent disappearance between two documents is the defect** and this is where it stops
  being silent
- **`agreement_block`** — present and **empty**. The agent never writes here

**A13**
- **`agreement_block.name`** — the Product Manager. Written by the workflow from the name the person gives
  when they mark the draft agreed, and never a producer's name
- **`agreement_block.date`** — the day they mark it

### 6.14 A14 · Initiative document → A15 · Jira initiative

The deliverable and its propagation. The ordering is deliberate: the run completes on A14.

*artifact · run scope · produced by 7.1 `initiative-authoring` / 7.2 `initiative-propagation` · gate G7*

**A14** — the deliverable
- **`…Initiative Template template`** — defined separately in Initiative Template
- **`initiative`** — the template's thirteen frontmatter keys, carried in their own block so the ČS
  template's `status` (New · In Planning · …) cannot collide with the artifact envelope's own `status`
  - **`…initiative frontmatter keys`** — defined separately in Initiative Template, and **thirteen of the
    fourteen keys in this block come from there.** The marker is here rather than only at the section's
    head because the generated skeleton renders a block's keys under the block, and without it the block
    would read as holding its one other key and nothing else
- **`initiative.id_basis`** — where the identifier came from, one of the three bases named below. **The one
  key in this block that is ours** rather than the Guild's
- **`sections[]`** — one entry per fixed template section, each carrying its **`id`** and its **`status`**.
  **The word addressed is the value of `status`, never a field of its own**: C16 reads `status: addressed`
  and treats an entry keyed addressed as a section not addressed. The section set is fixed, so
  **C16 checks the artifact against the set rather than against this list** — a self-reported list can be
  short by a section and still read as complete
  - **Thirteen sections, from ČS's Product Management Guild template**, which is authoritative over the
    analysis repository's. **Insight**, **Byznys cíl**, **Outcome** and the three success metrics are the
    Guild's, and **the sections the Guild says nothing about are the analysis repository's** — silence is
    not disagreement
  - **The Outcome section carries a change in customer behaviour and never a solution**, and the three
    metrics — behavioural, business, perception — each appear or say what the run could not supply
  - **Heading names here are bold and never backticked**, because the skeleton generator reads every
    backticked identifier on a bullet as a field of the entry above it, and a producer copying the
    skeleton would write a heading as a key
- **`traces_to`** — A13 → A11 → A9 → A4 → A2

**The three bases are "jira", "fixture" and "none_yet"** — read from a Jira instance, supplied by a person for
a run whose material is fabricated, or none yet, where the person recorded with `SPOCK: record the Jira key` that
the initiative has no key yet; the initiative's id and link then read none yet, the run can complete, and the key
is added later with the same task. **Where the run record carries `jira_key`, the initiative's id is that key**
(C16, on a run started on 1.10 or later). The template's rule has always been that the identifier is *asked for and
never invented by the agent*, so a key a person supplies for a fixture run satisfies it. **`id_basis` is what
lets the artifact tell the two apart**, where prose in the body cannot be read by a check, the same way the
research regime marker tells a retrieved source from a fabricated one.

**A fixture basis is refused on a run declared to hold real material** (C16). The check reads the
declaration, `material: real` on the run record or on the run's entry in the example-run register, and
**decides nothing where nothing declares it**: C16 still passes, and its message names this clause as not
decided. The run-state writer does not write `material`, so on a run nobody declared, this arm decides
nothing.

**A15** — propagation, not deliverable, and parked: the workflow contract lists it among stage 7's products, and
its producer, `initiative-propagation`, is parked in the skills registry, so stage 7 is owed A14 alone
- **`issue_key`** — from Jira. **Never invented**
- **`host`** — the authoritative host
- **`source`** — A14

A14 is produced only from an agreed A13 and is complete independently of A15. A15's absence does not
fail the run.

### 6.14b S3 · Sources

**Every source any artifact in a run cites, once, at `{runs_root}/{run_id}/sources.md`.** An artifact carries
`external_sources` as a list of refs; the citation — what it is, and when it was reached — lives here.

*record · run scope · authored as research happens · no gate*

- **`ref`** — the key an artifact cites. Unique within the run
- **`source`** — the citation a reader follows
- **`accessed`** — `YYYY-MM-DD`

**It is authored rather than generated, and that is the difference from S1.** The competitor store is
derived because its facts exist in the artifacts it indexes; a citation exists here and nowhere else, so
there is nothing to derive it from. A generator would need a second copy to read, which is the duplication
this replaced.

> **Why it is not in the artifacts.** Written out in full, citations stand between a person and what they
> came to read. **The gain is a reader's, not a deduplication**: a run has one bibliography instead of a set
> scattered across three documents.
>
> **C80 is what makes it safe.** A citation is the one part of an artifact a reader cannot verify by
> reading further, so a ref resolving nowhere looks like provenance and carries none. C80 refuses it, and
> reports a citation no artifact uses.

### 6.15 S1 · Competitor Store

The cross-run memory, meant to make the tenth run cheaper than the first and reuse visible rather than
silent. Reuse is suspended from release 1.7 (§5.3): the stage 3 skills instruct their producers to read the
store and say what it holds, and to research every participant the map selects.

**The built record is `.github/store/S1-competitors.md`, GENERATED by `store.mjs` from the committed A5 and A6
records, and checked by C74.** Those are the example runs' records and the records of every run a person kept
with "SPOCK: keep this run's competitors", which copies the run's landscape record and each card §6.7 lets
leave its run into `.github/store/corpus/`. **No run has been kept yet, so the shipped store holds the example
runs' competitors only.** The keep task copies the records, notes who kept them, and then regenerates the
store. **It is derived rather than kept** because an index
maintained beside the artifacts it
indexes disagrees with them the moment a run is committed and the index is not. *Written to S1* therefore
means a stage's own artifact is the source the store is built from, not a second file the stage edits:
**stage 3 writes what it finds into the run's own A5 and A6, never into the store.** Extending a card by
write-back during a conversation is proposed and not built (§7.6).

**Governance.** As a durable store read by every future run, S1 carries the registration every
governed artifact must:
- **`owner`** — a named accountable person. Until ČS names one, the store reads *to be named by ČS* and names
  nobody from the pilot team. Whoever runs `SPOCK: keep this run's competitors` decides what enters S1, and the
  owner answers for what accumulates.
- **`version`** — the store's schema version.
- **`retention`** — the retention class for competitor records, and **`retention_unknown_reason`** beside it
  while no class is declared, carried as `unknown` rather than invented.
- **`generated_from`** — what the store was generated from.

*cross-run scope*

- **`artifact_id`** — always `S1` · **`record`** — always `competitor-store` · **`scope`** — always `shared`
- **`participants[]`** `0..n` — the same naming as A5
  - **`identity_key`** — identity key, stable. The join
  - **`name`** · **`type`** — as A5 carries them
  - **`landscape_entry`** — an A5 fragment, from the same run as `card`; where the row carries no card, from
    the last run that saw the participant
  - **`card`** `0..1` — an A6, the most recently researched one. **The research date is the whole ranking**
  - **`researched_at`** — **surfaced to the user on every reuse**
  - **`seen_in_runs[]`** `0..n` — which runs used it
  - **`material`** — always `research`. It is not the run's `material:` marking in
    `.github/registry/fixtures.yaml`. **That marking is about the customer material a run carries and not about
    the competitor research it did**, which was searched from public sources about real institutions
  - **`disagreements[]`** `0..n` — written only where two runs name the participant or its type
    differently, each saying which field and what the two runs said. **Recorded rather than resolved**

### 6.16 S2 · Run State

What the precondition check reads, and what carries the handoff between people. Without it the sequence
is documented rather than governed.

*run scope* — the fields below describe the record as it is written (`{runs_root}/{run_id}/RUN-STATE.md`,
written by `run-state.mjs` and never by an agent, read by `check.mjs`).

- **`run_id`** · **`artifact_id`** — always `S2` · **`record`** — always `run-state` · **`workflow`** ·
  **`mode`** — `discovery` or `free-roam`
- **`created_at`** · **`updated_at`**
- **`surface`** · **`surface_observed`** — the surface a person declared the run was driven on, and the one
  the process could observe, which reads `unknown` where nothing can be observed. Two fields, because a
  declaration and an observation are different facts (C162)
- **`build`** `0..1` — the release the run was started on, read from `.github/build` when the run is created.
  Written only where that file exists, so a run started before 1.2 carries no field
- **`person`** `0..1` — the person running the run, recorded once by `SPOCK: start a run`: their **`name`**, the
  **`role`** they decide in and when it was **`recorded_at`**. A task's role box left empty takes this role for
  this name, so the person types their role once. Optional, so no older run is short of it
- **`jira_key`** `0..1` — the initiative's Jira key as a person typed it with `SPOCK: record the Jira key`: its
  **`value`**, upper-cased, or `none yet`, and when it was **`recorded_at`**. The initiative's id is taken from it
  (C16). Optional, so no older run is short of it
- **`current_stage`** · **`status`** — the run lifecycle, `in_progress · complete · abandoned`, both derived by the writer (C38 recomputes and checks them). **`abandoned` is the one status not derived** — a stop is a person's decision and derivation must not overwrite it
- **`abandoned_by`** · **`abandoned_at`** · **`abandoned_reason`** · **`abandoned_note`** `0..1` — present together or not at all (**C78**). The reason is one of `low_value · small_impact · high_risk · out_of_boundary`, which are ČS's own stop outcomes. **`current_stage` keeps pointing at where the run stopped**, because an abandoned run reading `complete` would look finished
  - **A run may be stopped at any point**, which is ČS's position: better to reject an initiative than to do something that does not make sense, and it may be closed at any phase. **Artifacts are retained** — the stop is recorded, nothing is deleted
  - **ČS's `Waiting` is not modelled.** Waiting is *not now* — low priority, no capacity, a technical or business blocker — and abandoning is *no*. **The pilot has one exit rather than two**, and the reasons above are the *no* half only
- **`behaviours`** — the composed-behaviour floor in force, `composed-floor@<version>` (§9.3)
- **`stages[]`** `7`
  - **`id`** — 1–7 · **`name`** · **`workflow`** — which workflow owns the stage
  - **`status`** — the same nine-word vocabulary the artifact carries (§7.3). `blocked` is a transient runtime condition, not a persisted status (§7.3)
  - **`artifacts[]`** — the artifacts this stage produces
  - **`quality_gate`** `0..1` — `{ id, result, run_at, run_by }`. `run_at` is `YYYY-MM-DD` and **required whenever the gate is recorded**.
    It also carries **`judged_ran`**, **`judged_not_run`** and **`judged_reason`**, which half of the gate
    ran; **`judged_answered_by_person`**, how many judged rules a person answered, written only where one
    did; and **`failed[]`**, the checks the gate found failing, written only where there are any, so a
    signature can name what it covers. Beside it, **`on_accepted[]`**: one `C98:4` entry for each failed check
    whose finding is wholly about accepted earlier stages, with the highest of them, written only where there
    is one. A standing sign-off naming that check carries to this gate where it sits on an accepted stage from
    that stage up to the one before this and was made over the same finding: on that stage itself, where its own
    gate did not record the check as about another stage, or on a later stage whose own gate holds the same
    entry. A gate recorded without the field carries nothing, so a gate recorded before 1.2 asks for a sign-off
    of its own. Withdrawing a sign-off runs again the gate of every later stage, accepted or in review, that
    carried it
  - **`supplied_market`** `0..1` — `{ file, bytes, sha256, competitors, trends, recorded_at }`, and where the person
    took in a changed list, `previous_sha256`, `previous_file` where its name changed, and `changed_at`, written where
    a person supplied the market at stage 3, by the task that enumerates the file without reading a word of
    it. The hash catches the file changing after the stage read it, and the counts catch a supplied
    competitor dropped (C181, C182). The addresses in the file are the one part of it a check reads: a card the
    run researched itself cites only listed pages or pages under them (C184)
  - **`judged_half`** `0..1` — `{ by, role, at, as_of, asked, verdicts[] }`, a person's answers to the gate's
    questions, given in the approval's optional box: one entry per question asked, `yes`, `no`, `cannot_tell`, or
    `skipped` where the person left it out. Written beside the gate record and never inside it, because an answer
    is not an override (C32, C180)
  - **`owner`** `0..1` — `{ name, role, recorded_at }`, where someone was recorded as owning the stage with
    "SPOCK: record who owns this stage"
  - **`agreement`** `0..1` — `{ by, at, recorded_at }`, on stage 6 only: who marked the draft PRD agreed, and
    the day, which `C13` holds the agreement block against. The mark is taken while the stage is `running`,
    `produced`, `q_failed` or `refined`: after `Q6` fails and the draft is corrected, marking it again writes the
    agreed PRD from the corrected draft
  - **`decision_gates[]`** `0..n` — **one entry per decision the stage takes**, in the order a person signs
    them. Each is `{ id, decided_by, decided_at, by_agent }`, always `by_agent: false` (C14). `decided_at`
    is `YYYY-MM-DD` and required, and **must not fall before the stage's `run_at`** (WB-24). An earlier
    decision may not be dated after a later one, because a record saying otherwise describes a sequence that
    did not happen. Every stage takes at most one decision gate and stage 3 takes none, and the list form
    reads a record holding more than one the same way
  - **`decision_gate`** `0..1` — **carried before 1 September 2026 and still declared, so example runs
    remain readable.** One slot per stage, holding one decision
  - **`corrections[]`** `0..n` — `{ from, to, by, at, reason, places }`, one entry each time a person corrected
    how a name is spelled on this stage, written only by `SPOCK: correct a name on the record` and by nothing
    else. `from` is the spelling the record carried, `to` the spelling it carries now, `by` the person who
    corrected it, `at` the day and `reason` their own words; `places` is a plain sentence naming where it was
    rewritten, such as `owner, G7, 1 decision`. **Both spellings stay on the record**: the task corrects a
    spelling and never who decided, no stage moves and no gate runs again. Written only where there is a
    correction, so a record that has never been corrected reads exactly as before

  > **A record from before 1 September 2026 carries the single slot**, and its stage 5 is recorded under
  > `G5`, which the workflow contract does not declare. **`G5` is retired and stays legal where it was
  > written**: those runs are read against it and nothing writes it again, which is the disposition `A1b`,
  > `A8c` and the withdrawn quality rules already carry. **Declaring a field is not endorsing it.**

  > **The dates are compared, not merely required, and the shape is checked first** (C38, at every quality
  > gate). A decision on the list is compared with its quality gate on a run started on build 1.10 or later, and
  > not where that gate is one the workflow ran again. A comparison is
  > only as good as its operands: an absent date, an empty one, or an unpadded one all defeat an ordering
  > test — `2026-8-4` sorts *after* `2026-08-10` — so an inverted pair would read as ordered.
  >
  > **Same day passes, and that is a decision, not an oversight.** The Workflow Blueprint's WB-24 says the
  > quality gate *precedes* the decision. These are dates, not clock times, and a check and a decision on
  > one day is the ordinary case. **The pilot therefore
  > reads WB-24 as *the decision does not precede the check*.** A stricter reading would need a timestamp
  > the record does not carry. Declared here rather than left in a code comment, because a relaxation
  > argued only where the code is written is a relaxation nobody agreed to.
  - **`content_seen`** `0..1` — what the build saw of the stage's documents at its last reading: the
    **`gate`**, its **`result`** and the day **`at`**, then one fingerprint per document the stage lists and,
    on a reading from 17 September 2026, a fingerprint of the stage's recorded **`decisions`**. On a run started on
    build 1.12 or later it also carries **`records`**, one fingerprint of every record behind the stage's
    documents, read the way a document is, and on stage 4 **`ideas`**, a fingerprint of A8's `ideas:` block
    where a person made it other than what the join writes from the slate, empty where it is the join's: a
    person's version the gate did not see is a change to A8, and the join's own write never is. Written by
    the build at every quality gate and decision gate, and for the draft PRD also when it is first put to
    the person for agreement, if nothing has read the stage yet, and when they mark it agreed, while the
    stage is still `running` (§7.5). **The approval compares it**: a document, a decision or, where the
    fingerprint carries them, a record changed after the gate has the gate run again first. **Once a stage is
    accepted it is not taken again**, so on a run started on build 1.12 or later a document of an accepted stage
    that differs from it was edited after the acceptance with no edit recorded: the front page and the whole-run
    check report it, naming `SPOCK: send a stage back to be redone` and `SPOCK: record that I edited a document`,
    and it fails nothing
  - **`rework[]`** `0..n` — `{ after, result, seen_at, at, changed }`, one entry each time the build found the
    stage's documents changed since its previous reading: the reading it followed, that reading's result and
    day, the day the change was seen, and which documents changed. **Nothing about it reaches a person**, and
    the metrics reader counts it
  - **`know_how[]`** — `body@version`, as read by this stage. **One entry per body.** A stage that re-runs against a newer body replaces its entry; two versions of one body is the record disagreeing with itself
- **`refinements[]`** — `{ stage, what, reason, changed, by, role, at }`, plus **`amended_after`** on a round
  recorded after the stage was accepted. The run's mirror of the rounds on the decision records (§7.5),
  at the top level for the reason `read_undeclared[]` gives below. **No task records a round**, so on a run
  driven by tasks it reads `[]`
- **`decisions[]`** — the decisions a person recorded that are not a gate signature, each
  `{ stage, kind, what, by, role, at }` and `by_agent: false` (C14, C167). `kind` is `choice`, `direction` or
  `exception`; an exception names the **`check`** it signs, and an entry may carry what it **`affects`**, a
  **`selection`**, a **`reason`**, and **`superseded_by`** and **`superseded_reason`** where a later decision
  replaced it. An entry a correction rewrote carries **`by_as_typed`**, the spelling the gate saw, written once and
  never overwritten, so the decisions fingerprint reads a corrected name back to the spelling it recorded and the
  approval does not run its gate again for a spelling. An exception may carry its **`cause`**: `workflow` where the person signing says the workflow
  looks wrong, `material` where the material cannot meet the check, and no field where none was given, as on
  every sign-off recorded before 1.2. **A send-back withdraws every decision standing on that stage and keeps it on the record**,
  because they were about the documents being replaced: each gains `superseded_by`, the day of the send-back,
  and `superseded_reason`, "stage N was sent back: " and the reason the person gave, and no reader of the
  standing decisions counts it again. It then records one of its own: a `direction` whose `what` says the
  stage's acceptance was ended and carries the reason the person gave. The reason is inside `what`, not in a
  `reason` field
- **`know_how_not_read[]`** `0..n` — `{ stage, reason, body }`. A body that was on disk and declared by that stage's own skills, and that the stage did not read, with why.
  `SPOCK: record a body this stage could not read` takes nothing: it records each body that first appeared, or was
  bound to the stage's skill, the day the stage ran, with the reason the dates give, and refuses any other
- **`read_undeclared[]`** `0..n` — `{ stage, document, why }`. **The other direction.** A document the stage actually read that nothing declared, with
  which given body should have answered the question and did not. Written only where there is one, so a run
  whose producers worked from their declared bodies carries no key at all. Its entries are copied from the
  production records that carry them (§6.0)

  > **Recording it is not permission.** A producer works from its declared bodies; one that needed
  > something else has found a gap in what it was given, and a record listing only the declared bodies
  > would read as complete when it is not. Going looking is the symptom; the body is the fault.

  > **It sits at the top level, beside `refinements[]`** — `run-state.mjs` reads indent 6 as a `key: value`
  > pair inside a sub-block, so a list nested under a stage parses as a key named `- body`, and the writer
  > drops it silently on the next unrelated command.
  >
  > **A body can land after a stage runs and on the same day, and a date cannot separate those.** C62's
  > date clause excuses a body written strictly after the stage ran, which is the clean case. The awkward
  > one is same-day, and nothing in the record can prove the ordering.
  >
  > **The answer is to record the debt, not to widen the date rule.** Reading same-day as excused would
  > reverse C62's deliberate bias, in which every way of not knowing makes the check stricter, and it would
  > leave the reader of that run seeing nothing at all. A named entry here says which body the stage did
  > not read and why, C62 accepts it, and **the pass line reports the count** — the same shape as
  > `judged_not_run` and its reason, which is how this pilot has always carried a gap it decided to keep.
  >
  > **Re-running the stages was the alternative and it is worse.** Re-deriving an artifact silently empties
  > the human decisions recorded against it (R6.6-2/WB-38): a selection naming a solution would go on
  > parsing and resolving while meaning nothing, with every gate green.
- **`judged_withdrawn[]`** `0..n` — `{ stage, by, role, at, as_of, asked, verdicts[], withdrawn_at, withdrawn_reason }`.
  The answers a person gave to a stage's gate questions, kept when the stage was sent back: the six keys of the stage's
  `judged_half`, the stage, the day it was sent back and "stage N was sent back: " with the reason the person gave.
  Written only where there is one. At the top level for the reason `read_undeclared[]` gives. The gate, the answer task
  and the keep read only the live `judged_half`, so the redone stage is answered afresh; the improvement figures count
  both, the withdrawn ones marked
- **`stale[]`** — `{ artifact, reason, accepted_by, accepted_at }`, or `{ artifact, reason, rebuilt }`; the acceptance fields are filled by `accept-stale` when a stale input is advanced past (C30)

  > **A staleness ends in one of two ways and only one of them needs a person.** Either someone accepts
  > advancing past the stale input, or the artifact is re-produced and `rebuilt` says there is nothing
  > left to accept (C30).
  >
  > **Both acceptance fields must carry something, and an empty string is not something**: the writer
  > stamps `accepted_by: ""` on every unaccepted entry, so a blank is what marks an entry unaccepted.

**Rework is counted here, per stage, in `content_seen` and `rework[]`, and not on the artifact.** The
envelope's `revisions` is kept as assembly writes it and not maintained (§7.5). The transitions between
these states are §7.3.

---

## 7. Control

**What this pilot can observe about its own work, and what it cannot, is one document:**
[observability.md](./definitions/cross-cutting/observability.md). **The records specified below are
built; traces are built as a receiver**, with the client writing them, `trace.mjs` reducing them and C92
resolving every trace an artifact names; logs are absent; and the metrics reader reads the records. It
matters here because **a check can only refuse what the record shows**, so what the record retains sets the
ceiling on what any gate can ever decide.

### 7.1 Contracts

Every skill declares what it reads, what it writes, and where both live. This is what allows a stage to
be re-run, corrected, or audited in isolation.

**Rules**
- No stage depends on anything passed silently.
- A skill may not read an artifact it does not declare.

**The read rule is an instruction, and a read outside it is recorded rather than refused, apart from the workflow's
own code.** The shared instructions tell an agent to work from what its stage declares and to stop where that does
not answer its question. A read the agent lists under `read_undeclared:` in its record is copied onto the run
record by `SPOCK: record what I had to read`; no check fails it. The step guard refuses an agent's read of a file
under `.github/scripts/` while the run the tasks act on was started on 1.11 or later.

### 7.2 Precondition check

An agent is instructed to verify its declared inputs before it advances the run. If they are missing,
ungated or stale, it says what it is waiting for and stops — it still converses, answers questions and
explains what it needs — and it does not produce a partial artifact to fill the gap.

This is what makes the sequence governed rather than merely documented, and it carries the handoff
between people: the Researcher, Product Manager and Analyst are not watching each other work — S2 is what
tells the next person their stage is ready.

```
   agent invoked
        │
        ▼
   ┌────────────────────────────────┐
   │ read S2                        │
   │ inputs present, gated, fresh?  │─── no ──► converses freely
   └────────────┬───────────────────┘           states what it awaits
                │ yes                           DOES NOT ADVANCE
                ▼
        execute · write · update S2
```

**Rules**
- Every agent is instructed to read S2 before acting.
- A missing, ungated or stale input blocks advancement.
- A blocked agent is instructed never to produce a partial or placeholder artifact.

**The agent's half is an instruction; the record's half is enforced.** The run-state writer refuses to
accept a stage over an upstream stage nobody accepted, and C143 catches a record written any other way.
C30 refuses a stale input the record marks neither rebuilt nor accepted by a named person, at every gate.

### 7.3 State

One vocabulary, used by both the artifact envelope and the run state, so a stage and the artifact it
produced never describe themselves differently. §3.2 is the definition; this is the reference.

| State | Meaning |
|---|---|
| `pending` | Not started |
| `running` | The skill is executing |
| `produced` | The artifact exists, not yet checked — **or checked, failed, and every check it failed is signed** |
| `q_failed` | The **quality gate** failed and nobody signed it — returned to the skill, no human involved |
| `in_review` | With the accountable human |
| `refined` | Changed during review with a refinement round recorded, awaiting acceptance. **No task records a round**, so a stage driven by tasks does not reach it |
| `accepted` | Decision gate passed, decision record written. **A stage may reach this over a failing gate only where a person signed every check it failed**, and the gate result still reads `fail` |
| `stale` | An upstream stage was re-run. **Retained, not deleted** |
| `superseded` | Replaced by a later version |

**A failing gate does not always end the stage.** The workflow must
not stop on a standard a run cannot meet, so a person may sign off a check their run cannot satisfy, one
stage at a time, in their own words, with their name on it. One sign-off may name several checks, and once the
stage's gate has recorded a failing list it may name only checks on that list.
**Where every check a gate recorded as failing carries such a signature, the stage is not returned to its
skill**. A stage whose failures were already signed when its gate ran stays `produced` and moves
`produced → in_review` or, at stage 3, `produced → accepted`. A stage the gate parked at `q_failed` and a
person signed afterwards moves `q_failed → in_review`, the edge that exists for this case, and at stage 3 on
to `accepted`, because a stage with no decision gate has nothing left to wait for. **Both moves into review are
the workflow's**: the person's act is the signature before them, which the move requires (`coveredBySignature`).
**No status is added**: a signed stage is always in one of the nine.

**The instrument never lies about it.** The gate result stays `fail`, the record names which checks failed,
and the run's front page says which stage advanced over what and who signed it. **`C32` holds**
because there is no override — the gate reports what it found and a person accepted it. **`C168`
holds** because the signature names a check the run still fails. And **eight checks cannot be signed at
all** — `C14`, `C32`, `C38`, `C51`, `C143`, `C168`, `C189`, `C190` — because they are what makes the record evidence rather
than what grades its quality; `C38` in particular is the detective half of this very advance, and `C189` and `C190`
hold the workflow's own files and the supplied material to what the release and intake put there.

**`blocked` is not one of the nine.** A precondition failure is a *transient runtime condition*, not a
persisted status: the agent converses, says what it is waiting for, and does not advance the record,
which stays `pending` or `running` (§7.2). The run state never carries it. The distinction it drew is still
real and still worth stating: **`blocked` is about what a stage was *given*; `q_failed` is about what it
*produced*.** A blocked agent waits for someone else; a failed stage returns to its own skill. Conflating
them would hide which of the two actually happened — but only one of them is a state the record holds.

**Staleness.** Re-running or sending back stage N marks each later stage that holds an acceptance or a gate
result `stale` and retains its artifacts; a later stage still being written stays with its agent, and its own
gate runs on it once it is written. A stale stage a person signed is redone by sending it back, not by moving
it to `running`. The run will not advance past a stale input until it is rebuilt or a human explicitly
accepts it (recorded, C30).
Nothing is lost and nothing silently rots.

**Transitions.** The vocabulary above is the set of states; this is the set of legal moves between them.
This table is the source of record for legal moves.
`legalStageMove` in `gates.mjs` consumes it, the `stage` command refuses any move not listed, and **C46**
fails the build if the table below and the `TRANSITIONS` data disagree, or if the writer holds a rival
list. Two families of edge are **driven, not requested**: `produced → q_failed` is set by the `gate … fail`
command (which requires the stage be `produced`), and every `… → stale` is set by the `stale` cascade. The
`stage` command may not forge either. `superseded` is
the sole terminal. A move is **human** when a person must authorise it; every move
*into* `accepted` is human except the stage-3-only `produced → accepted`, because stage 3 has no decision
gate: Q3 passing accepts it, and so does a person's signature over every check Q3 failed. **Moving a stage into
review is the workflow's act** (D4 of H2): the driver puts a stage that passed its gate in front of the person, and
a person's act at `q_failed` is the signature before the move. **Every move still marked human names what refuses
it without a person** in `enforced_by`: on the `TRANSITIONS` data, `in_review → refined`, `personOnly`; the moves
into `accepted` after review, the name check on the gate (`namesProducer`), `C14` and `C38`; `stale → accepted`,
`personOnly` and `C30`; and on `RUN_TRANSITIONS`, the run's stop, `personOnly` and `C78`. **C46** reads both graphs
and fails the build where a move marked human names nothing in `enforced_by`, or names anything that is neither a
registered check nor a guard `gates.mjs` exports. The `→ stale` moves are the downstream cascade of an
earlier stage being re-run, and the run lifecycle (`in_progress · complete · abandoned`) is a separate
three-word vocabulary the record derives, not one of the nine.

<!-- TRANSITIONS-TABLE -->

| From | To | Actor | Human |
|---|---|---|---|
| `pending` | `running` | workflow | no |
| `running` | `produced` | workflow | no |
| `running` | `stale` | workflow | no |
| `produced` | `q_failed` | gate | no |
| `produced` | `in_review` | workflow | no |
| `produced` | `accepted` | workflow | no |
| `produced` | `stale` | workflow | no |
| `q_failed` | `running` | workflow | no |
| `q_failed` | `in_review` | workflow | no |
| `q_failed` | `stale` | workflow | no |
| `in_review` | `refined` | human | yes |
| `in_review` | `accepted` | human | yes |
| `in_review` | `stale` | workflow | no |
| `in_review` | `produced` | workflow | no |
| `refined` | `in_review` | workflow | no |
| `refined` | `accepted` | human | yes |
| `refined` | `stale` | workflow | no |
| `refined` | `produced` | workflow | no |
| `accepted` | `running` | workflow | no |
| `accepted` | `stale` | workflow | no |
| `accepted` | `superseded` | workflow | no |
| `stale` | `running` | workflow | no |
| `stale` | `accepted` | human | yes |
| `stale` | `superseded` | workflow | no |

<!-- /TRANSITIONS-TABLE -->

The one edge with no `human` mark into `accepted` is `produced → accepted`, and it is stage 3 only.
`in_review → refined` is taken only by recording a refinement round, which no task does; a person who finds
a stage not good enough sends it back instead (§7.5).

**A stage in review or being refined goes back to `produced` when one of its documents, one of its decisions or one of
its records changed after its gate ran, and the gate runs again.** A changed decision counts where the gate ran on or
after 17 September 2026, and a changed record on a run started on 1.12 or later. The approval does this before it records anything the person typed, so
a person approves what the gate checked and not something that changed after it.

### 7.4 Coverage checks

Mechanical checks at stage boundaries. None requires model judgement; each passes or fails. They are what
makes a control performed rather than described, at the lowest cost of any option available.

**This table is the closed set of run checks**: each row names a check, the harm it guards against and the
stage whose quality gate runs it (`all` for every gate). The harm line is the `why` of the check's card in
`.github/registry/checks.yaml`, which `node .github/scripts/register.mjs --write` copies here; the whole card,
with what the check reads, where it runs, what passes and what to do when it fails, is in
`.github/COVERAGE-CHECKS.md`. `register.mjs --verify` refuses a check with no harm line and a line that is not
its card's why.

| | Guards against | Stage |
|---|---|---|
| C1 | A hypothesis with no evidence that is not marked unrated reads as grounded in research when nothing supports it. | 2 |
| C2 | Evidence pointing outside the problem material, or at material replaced or taken back, makes a hypothesis look grounded in what the run never held or no longer holds. | 2 |
| C3 | A synthesis element with no trace, or citing a card that does not exist, enters the synthesis from research the run cannot show, and stage 4 builds solutions on it. | 3 |
| C4 | Fewer than three solutions or two options leaves nothing to compare, and more than the ceiling is a list a person cannot weigh at the choice. | 4 · 5 |
| C5 | A solution bound to no opportunity or no market finding answers nothing stage 2 or 3 found, and unnamed synthesis elements let every binding pass unread. | 4 |
| C6 | A document that does not carry its run's id cannot be tied to that run, so material from another run could be read as this one's. | all |
| C7 | A blank touchpoint reads as a compliance concern identified and addressed when nothing is written for it. | 4 · 5 · 6 |
| C8 | A card that does not show when it was researched cannot be told fresh from stale. | 3 |
| C9 | A card past its threshold carries research the market may have moved past, read as current. | 3 |
| C10 | A brief missing a required field with nothing saying it is unknown reads as complete, and every later stage builds on what it leaves out. | 1 |
| C11 | Stage 5 builds on the selected solution, so a selection that is missing, doubled, or written without the person's reason and sections leaves it nothing sound to build on. | 4 · 5 |
| C12 | A break anywhere in the chain leaves delivered work that cannot be shown to answer a problem the run started from. | 5 · 6 · 7 |
| C13 | The agreed PRD is the draft copied word for word, so anything the draft says about its own agreement contradicts the agreed copy, and an agreement that differs from the record, or a title still marked draft, misleads its reader. | 6 · 7 |
| C14 | A decision record marked as an agent's records an approval, agreement or selection that no person made. | all |
| C15 | Expanding anything but the chosen option reopens a decision a person already made. | 5 |
| C16 | An initiative missing a part, carrying an invented key, depending on a propagation that may never run, or with a reading copy that says something else hands over a deliverable that is not what it reads as. | 7 |
| C17 | A document marked as a person's edit with nothing accounting for it, or edited by a person and marked an agent's, misstates who wrote what a reader is asked to trust. | all |
| C18 | A document with no external-sources field has no place that says which of its claims came from outside the run, so a reader cannot tell them from the run's own evidence. | all |
| C19 | A status outside the shared words cannot be compared with its stage's, so the document's state on the record means nothing. | all |
| C22 | A document recorded under a workflow that did not produce it misstates which gates its content passed through. | all |
| C23 | A document derived from material that passed no gate, carrying no mark of it, passes unchecked material off as governed. | all |
| C24 | The competitor store outlives every run and nobody approves what enters it, so unchecked research written there would be inherited as governed. | 3 |
| C25 | Adopting free-roam material is a person's decision, and one with no record cannot be read or questioned afterwards. | all |
| C26 | A set where every solution addresses the same opportunity is one bet rather than a comparison of ways forward. | 4 |
| C27 | An opportunity placed twice or nowhere, or a primary list too long to act on, gives stage 4 a priority order that misstates what stage 2 found. | 2 |
| C28 | A document carrying the wrong place in the opportunity tree misplaces it in the chain a reader traces from outcome to solution. | all |
| C29 | Material deleted rather than retained cannot be audited later, and a parked opportunity that disappears cannot be reconsidered. | all |
| C30 | Advancing past stale material is a person's decision, and one nobody recorded reads as nothing being stale. | all |
| C31 | The second alignment pass is the last point the narrowed MVP is checked against the strategy, and a PRD without it reaches agreement with the check unrecorded. | 6 |
| C32 | A quality gate that a person or an agent can wave through is not a control. | all |
| C33 | Material with no items, or items whose arrival or kind of research is unstated or asserted without its source, lets a reader take invented or unclear material for customer research. | 2 |
| C34 | Problem material an agent wrote is not evidence of a customer's problem, and an agent writing it would be producing its own evidence. | 2 |
| C35 | Evidence that skips the intake record, or an observation pointing at missing, replaced or unread material, breaks the line from a hypothesis back to what a customer said. | 2 |
| C36 | Work attributed to an agent or skill that does not produce it cannot be traced to the instructions and rules it ran under. | all |
| C37 | Without an origin key two descriptions of one source count as two and a weak hypothesis rates strong; a period nobody confirmed dates research the run cannot date. | 2 |
| C38 | A run record that disagrees with the documents or with its own dates is no evidence that a stage passed the gates that admit it. | all |
| C39 | With no proximity nothing counts as first-hand, so every hypothesis grades weak in a run that looks graded and is not. | 2 |
| C40 | A decision record that lacks a field, disagrees with the run record, or narrates a change the documents do not show leaves no trustworthy account of what a person decided and changed. | all |
| C51 | A gate or decision recorded in the name of an agent that produces work would let the producer approve its own output. | all |
| C52 | A trust tag written rather than derived can rate a hypothesis strong on references that share one origin, however confident its rationale. | 2 |
| C53 | A placed id that names nothing in the run prioritises something with no evidence behind it, and every later binding resolves against it. | 2 |
| C54 | An untyped participant has no freshness threshold, a malformed key can never match a publisher, and a card no participant claims is research the map does not account for. | 3 |
| C55 | A participant passed over in silence cannot be told from an oversight, and reused research with no date is read as new. | 3 |
| C56 | One participant doing something is that participant and not the market, and an opportunity the market does not answer vanishes unless the synthesis records the silence. | 3 |
| C76 | Research reached through a test destination with nothing marking it enters the competitor store and is inherited by later runs as governed research. | 3 |
| C75 | A map that stops short reads as a market with that many players in it, and below three the synthesis cannot see where the market is heading. | 3 |
| C81 | A market pass with no regulatory movement, or a regulation named without its instrument or date, leaves later stages unable to see what will bind the solution. | 3 |
| C57 | A parked skill has no list of approved destinations, so a document it produced would mean it ran, and reached outward, with nowhere approved to send to. | 7 |
| C58 | An option set that arrives with a preference has made the choice and asks the person only to ratify it. | 5 |
| C59 | A ranked or pre-selected solution set has made the person's choice before they arrive, with nobody's name on it. | 4 |
| C172 | A supplied file changed after intake read it leaves the run's findings resting on material nobody can now read, and with no measurement nothing can show it changed. | 2 |
| C60 | A card resting on one party, or on accounts that never consulted the participant, presents an assertion as corroborated research. | 3 |
| C62 | A stage that records a body it never read, omits one it should have read, or claims a version that never existed misstates what its work was based on. | all |
| C78 | A stop recorded in part, or stop fields on a run still going, leave nobody able to say whether, when or why the run was stopped. | all |
| C80 | A citation that resolves nowhere looks like provenance and carries none, since a source can only be checked against what it points at. | all |
| C92 | A trace id claims that evidence exists elsewhere, and one that resolves to nothing cannot be checked. | all |
| C77 | A goal that copies the company's measure, or names a key result the Strategy Basis does not hold, gives stage 4 an alignment to score that means nothing. | 1 |
| C66 | A confidence chosen rather than derived can rate thin research high, and a reader weighs the card by it. | 3 |
| C70 | A score on the solutions a person chooses between steers the choice with a number, where the choice is theirs to make. | 4 |
| C69 | A rewrite with no original, a rejection with no reason, or a statement kept in both lists lets a thing to build pass as a customer problem with no record a reviewer can read. | 2 |
| C82 | A hypothesis that does not say what would overturn it cannot be tested, and a set whose kinds are unstated can promote only barriers unseen. | 2 |
| C83 | Solutions written up in different shapes cannot be compared at the choice, and one with no account of how a customer uses it leaves stage 5 to invent it. | 4 |
| C84 | A synthesis that stops at its findings leaves stage 4 to work out what the market means for the initiative, differently each time. | 3 |
| C86 | A card with two features and no pricing passes as a profile while it cannot support the standards the synthesis grades the market against. | 3 |
| C87 | A tier chosen rather than counted lets a minority practice reach stage 4 as table stakes. | 3 |
| C88 | A map of leaders only or innovators only describes half a market, and a trend nobody represents disappears unless it is recorded as unanswered. | 3 |
| C67 | A section skipped without a reason looks decided rather than missing, and a requirement declared and not written up, or written twice, leaves a person signing a PRD that is not whole. | 6 |
| C65 | A reviewer decides on one document, and one that omits or misstates the rules nobody checked reads as more fully checked than it was. | all |
| C97 | A reader who stops after the title should have the answer, and a document that opens on a heading or on how it was made buries what its approver is asked to judge. | all |
| C98 | Closing sections under other names cannot be read across runs, and prose after the closing pair is prose nobody reads. | all |
| C99 | A heading made of numbers and internal codes tells a reader nothing about its subject, and a number is a second ordering nobody keeps. | all |
| C100 | A document missing a section its type fixes, or carrying them out of order, leaves its approver to find what is absent, and an entry with no section of its own cannot be read or judged. | all |
| C106 | A solution known only by its id loses the name its author gave it, since no field on the record carries one. | 4 |
| C107 | A citation to a record that does not exist, or to an identity two records share, reports success against whichever record it reaches, so research appears supported when it is not. | all |
| C108 | A record the document does not carry is research that was done and thrown away in silence. | all |
| C109 | A production field on an assembled document separates the claim from the record that made it, so no check can tie it to the work behind it. | all |
| C104 | A document that summarises, re-titles or re-authors what each instance produced no longer carries the work that was checked, and a part assembled over twice reads as two. | all |
| C103 | More than three solutions on one opportunity list are variants of one solution, and a person choosing between them is choosing how much of one solution to do. | 4 |
| C102 | An instance lost without a reason is a silence a re-run cannot act on, and a set counted without what it lost hides how far the stage fell short of what it set out to author. | 4 |
| C101 | A facet with one or two findings is an inventory rather than a reading of the market, and a finding tied to no problem is an observation about a market nobody asked about. | 3 |
| C111 | A reader at the bank has never seen the workflow's internal handles and cannot follow a document addressed to them that uses them. | 7 |
| C112 | A stage that claims to have run while missing a document passes its gate on the checks that skip the absent document, so part of a stage is accepted as the whole of it. | all |
| C115 | A hypothesis left unframed drops out of discovery unseen, an opportunity with no hypothesis under it has no problem anyone can trace it back to, and one carrying its hypothesis's id or a heading that names neither leaves a reader unable to tell the two apart. | 2 |
| C116 | A cause or impact with no basis cannot be told apart from somebody's view and inherits the opportunity's trust tag, and an order that claims a ranking nobody made misleads the person prioritising. | 2 |
| C117 | Market factors come from stage 3, which runs after the opportunities are prioritised, so calling them unknown hides that they are still to come. | 2 |
| C118 | A solution direction proposed while framing a problem pre-empts stage 4, and an absent field cannot be told apart from one left empty on purpose. | 2 |
| C122 | A document in a language other than the one its run declared cannot be read by the people the run was written for, and an undeclared or unknown language leaves every producer to guess. | all |
| C125 | A compliance screen with unanswered questions, blank sub-domains or a section that does not follow from its answers lets an under-identified obligation pass, and not applicable is a compliance judgement this workflow does not make. | 4 |
| C126 | An area missing from the screen reads as one nobody looked at, and an open question without the input that would settle it leaves the reader nothing to go and get. | 4 |
| C129 | A fired escalation trigger is a fact a person must see at the decision, and an unresolved sub-domain must not silence the trigger meant to catch that uncertainty. | 4 |
| C130 | A touchpoint written as free text or left with no resolution has been listed rather than addressed, and no two runs can be compared on it. | 5 · 6 |
| C131 | An obligation that silently disappears between two documents is lost without anyone deciding to drop it. | 6 |
| C137 | An item the record asserts and the body never mentions passes the gate on the record while a person reading the document cannot find it. | 2 · 3 · 4 |
| C138 | Items in a second record's list sit on disk and in the body while every content check reads only the first record's list, so they are invisible to the gate. | all |
| C139 | Stock vocabulary, filler phrases and hedging make a document read as generated and blur what it actually claims. | all |
| C143 | A stage accepted over an upstream stage nobody accepted is a run that moved past a gate nobody ran. | all |
| C151 | An instruction that arrived in supplied or fetched material and survived into a document is the quarantine failing, and every later stage that reads the document carries it forward. | all |
| C171 | A touchpoint that disappears between the chosen solution and its MVP takes its obligation with it, and nobody decided to drop it. | 5 · 6 |
| C177 | A trust roll-up written once and not recomputed after the set changed tells the person deciding the evidence is stronger or weaker than it is. | 2 |
| C181 | Competitor cards drawn from a list that changed after it was recorded come from a list nobody can now read, and a claim of a supplied list with no recorded file has nothing to hold it to. | 3 |
| C182 | A supplied competitor with neither a card nor a reason is dropped evidence, and a document claiming a search the run never made is untrue. | 3 |
| C184 | A card citing a site's front page, a page outside the list it was handed, or no page at all, cannot be traced to the page its claims were read on. | 3 |
| C185 | A later document naming fewer touchpoints than the screen fired, with nothing accounting for the rest, reads as a recount or a dropped obligation and its reader cannot tell which. | 5 · 6 |
| C187 | When parts are taken back, a document assembled from them can keep entries with nothing behind them, while a check that compares only the parts still on disk passes by comparing fewer. | all |
| C189 | An edit to the workflow's own files on one computer changes how the workflow behaves there without anyone knowing, and the next update would undo it without a word. | all |
| C190 | A supplied file nobody took in, or one changed after intake read it, leaves the run working from material no one checked. | 3 · 4 · 5 · 6 · 7 |
| C193 | A claim in stage 2's own documents that the evidence contradicts would carry into every later stage as if it were sound, unless someone corrects it or knowingly keeps it. | 2 |
| C206 | An opening block that disagrees with the record tells the approver something other than what was decided, in the first lines they read. | all |
| C180 | A gate passed with its judged rules partly answered, or answered by nobody named, claims a person looked when the record cannot say who or at what. | all |
| C175 | A statement in the document the bank opens that the run is a fixture or a test tells its reader the work is not real. | 7 |
| C153 | A screen claiming an obligation its area card does not create is a requirement with nothing behind it, and a wrong pairing made early is carried forward into the PRD. | 4 · 5 · 6 |
| C159 | An item citing a file that is not there, or a supplied file nothing cites, is material nobody checked, and material loose in a stage folder is read as a document. | 2 |
| C160 | A stage composed as a fan-out that ran as one pass, or an invocation that left no trace, cannot be told from one that ran as designed. | 4 |
| C162 | A finished run that cannot say, or says wrongly, which tool produced it gives no basis for comparing runs driven on different tools. | all |
| C163 | Not known and declined are claims about what a person said, and both are false when nobody asked. | all |
| C164 | A solution resting on market evidence its reader cannot see, or citing an element that does not exist, gives the person choosing between solutions a reason that is not there. | 4 |
| C166 | A full compliance section is too detailed to act on at a decision, and a summary that says less or more than the detail behind it hides or invents exposure. | 4 |
| C167 | A decision without words, a person, a role or a date is a tick box that cannot say what was decided or who was accountable for it. | all |
| C168 | A sign-off outliving its failure is a switch left on, one answering another stage's failure covers nothing, and a document newer than the choice about it is not what the person chose. | all |
| C169 | An acceptance written on a document that the run does not record is a signature nobody gave, and a recorded decision no document shows is one nobody can see. | all |
| C170 | A document a gate reads that was assembled from no record shows nothing of the work behind it, and a misnamed record file is never joined to its document. | all |

Run-scoped and repository-scoped checks share one sequence of ids. **The register derives both the total
and the next free number, so this prose asserts neither**; `node .github/scripts/register.mjs --verify` is
the count.

**C51 is the independence control.** Every recorded quality gate says who ran it. A quality gate is automated (§7.5), so **no registered
agent or skill belongs in `run_by` at all**, and the stage's own producer least of all: a skill grading the
output it just produced is the producer agreeing with itself, which is the exact thing an independent
checker exists to prevent (AB-24). The runner is required and non-empty for the same reason the gate dates
are — deleting the line a check compares is the cheapest way to defeat it.

**It is enforced from both sides.** `run-state.mjs` refuses to write a gate record naming a producer, and
C51 catches one that arrives any other way — a hand edit, a backfill, or a record written before the rule
existed. Both read the same list, for the reason the transition graph lives in one place: a rule encoded
twice is a rule that can disagree with itself. **What it catches is the id as written**; a hand edit that
spells the producer some other way is not caught, and no string test would catch every such form.

C7 does not judge whether a touchpoint was addressed *well* — only that *identified* never quietly
became *ignored*.

**The register is derived from the gate, never asserted alongside it**, because a check that runs and is
not registered is the same defect as a check that is registered and does not run.

**Repository-scoped checks are deliberately absent from this table.** They are not about a run: whether the
two know-how trees agree (C41), whether a schema a design document declares matches what the gate enforces
(C42), whether every workflow contract agrees with the gate model, the bindings and the build (C44), whether
the transition graph matches its §7.3 prose source of record (C46), **whether every agent, skill binding and
registry entry conforms to the definition schema (C47, AB-1)**, and many more. A stage boundary is the wrong
place to ask any of them. They run in `repo-check.mjs`, they never appear in a quality gate, and the
generated register lists them in a section of their own, each card saying it reads the workflow's own files and that
no stage's gate runs it. **They run on the product repository before each release, and not on the release copy**,
which leaves out `repo-check.mjs` and `register.mjs`; what holds on ČS's copy is what the run checks refuse at
each gate.

The whole set, generated:

```bash
node .github/scripts/register.mjs --write   # .github/COVERAGE-CHECKS.md, the run-scoped set plus the repository-scoped ones
node .github/scripts/repo-check.mjs         # the repository-scoped ones
```

Both commands are the product repository's; neither script ships in the release copy.

### 7.5 Gates

A stage passes up to two gates, and they do different jobs. The **quality gate** is automated and asks
*is this well formed?* — structure, format, volume of content, and the coverage checks. The **decision
gate** is human and asks *is this right?* The quality gate always runs first: nobody should be asked to
review a malformed artifact.

Not every stage has a decision gate. **Stage 3 has none** — competitive analysis is not approved by a
person. It is accepted when its quality gate passes, or when a person has signed every check the gate
failed (§7.3). Either way the writer refuses the acceptance over an upstream stage nobody accepted (§7.2),
and the signed route stops where the checker cannot read the run.

#### Quality gates — automated

| | Stage | What the gate asks |
|---|---|---|
| Q1 | 1 Brief | Is the brief complete — every required field present or marked unknown, every goal whole and measured by its own metric? |
| Q2 | 2 Problems | Is every hypothesis evidenced from the supplied material, tagged with the trust the arithmetic derives, and traceable back through intake? |
| Q3 | 3 Market | Is every element traced to a dated source, every card on the source floor its market sets, and nothing free-roam in the store? |
| Q4 | 4 Solutions | Do the solutions address two top-priority opportunities where two exist, and reach the gate unranked and unscored? |
| Q5 | 5 MVP | Are the options whole alternatives rather than phases of each other, traced, and is only the selected one carried forward? |
| Q6 | 6 PRD | Does the PRD address every section of the template's closed set and carry an agreed alignment? |
| Q7 | 7 Initiative | Is the initiative traceable, agreed, independent of A15, and free of internal identifiers in the body the bank receives? |

**The right-hand column is the question the gate asks, not the checks it runs, and that is deliberate.**
A quality gate runs **every check §7.4 scopes to its stage, plus every check §7.4 marks `all`** — nothing
else, and no universal check is repeated per row. The set is therefore already in this document one
section up, and the generated register prints it per check in the Gates column of
`.github/COVERAGE-CHECKS.md`.

**The derivation is compared rather than asserted**, on the product repository before each release. `register.mjs --verify` fails when a check §7.4
scopes to a stage is run by anything other than that stage's gate, when a check marked `all` is missing
from what every gate runs, and when a check every gate runs is scoped to one stage.

**The table states the question and not the checks**, because a restated list drifts from the gate while
every verification command stays green.

A stage that fails its quality gate does not reach a human. It returns to the skill, **unless a person
signed every check it failed** (§7.3). A failure about a stage already accepted asks for that signature
rather than sending the stage back, unless a sign-off made over the same finding on an earlier accepted stage
already carries to it (`on_accepted[]`, §6.16).

**A gate has three outcomes, not two.** `pass` · `fail` · **`incomplete`** — the gate names a check the
build has not written, or the stage holds none of the documents its contract says it produces, so nothing failed
and that is not the same as the stage being well formed. §12
already holds this rule for conformance: an item that could not be evaluated is declared with its
reason, never recorded as passed. A gate reporting `pass` on a stage where five of its seven checks do
not exist would be the exact failure this workflow was built to stop.

```bash
node .github/scripts/check.mjs {runs_root}/<run_id> --gate Q2     # one named gate
node .github/scripts/check.mjs {runs_root}/<run_id> --gates       # which gates the build can run in full
```

**Every gate can be run in full: every registered check is written**, and the build reports that rather
than this document asserting it. **That is the mechanical half only.** Which half of each gate actually ran is a
separate axis the build reports beside the verdict: no automated judge runs a judged half today, and the
person who signs a gate may answer it.

The whole register, generated from the gate rather than written beside it:

```bash
node .github/scripts/register.mjs --write     # .github/COVERAGE-CHECKS.md
node .github/scripts/register.mjs --verify    # fails when §7.4, the gate model, the two checkers, the shapes and the cards disagree
```

#### Decision gates — human

| | Stage | Artifact reviewed | Reviewer | Decision |
|---|---|---|---|---|
| G1 | 1 | A1 Initiative Brief | Product Manager | Brief complete enough to proceed |
| G2 | 2 | A3 → A4 | Researcher or Product Manager, one approval | Opportunities confirmed; primary and secondary set |
| — | **3** | — | **none** | **No human content approval** |
| G4 | 4 | A8 Solution Set | Product Manager | One solution selected → A9 |
| G5a | 5.1 | A10 MVP Options | Product Manager | One option selected. **Retired on 10 September 2026**: the option is chosen as a recorded decision while stage 5 runs, and runs before then carry this gate |
| G5b | 5.2 | A11 Expanded MVP | Product Manager | Expansion accepted before the PRD is built on it |
| G6 | 6 | A12 → A13 | Product Manager | PRD agreed — name and date written |
| G7 | 7 | A14 Initiative document | Product Manager | Approved as a delivery item |

There is no G3. The numbering follows the stage rather than the sequence, so a gate's name always says
where it sits. **The reviewer is the role the workflow contract names**; the approval records the person's name
and the role they typed, and prints a heads-up where that role is not one `GATE_ROLES` in `decision-block.mjs`
gives the gate.

#### Decision records

One per decision gate, recording **gate · accepted by · accepted at · what changed during refinement**
(including "nothing") · **what the person asked to be changed before approving**, where they said · **the refinement rounds themselves** · **selection** (G4, and G5a on a run before
10 September 2026) · **note**.

**One shape at every decision gate, enforced by C40.** The record lives on the document the gate accepts (A1, A4,
A9, A11, A13, A14, and A10 for the retired G5a: `DECISION_CARRIER` in `gates.mjs`), which at G4 and G6 is the one written from the document
reviewed, and **the run state's entry for that gate must agree with it** — its own entry in the stage's list of
decisions (§6.16).

- `gate` — the gate that accepted, and it must be the gate that accepts that stage
- `by_agent` — always `false`. An agent never records a human decision
- `decision` — the block itself, carried on the document the gate accepts
- `accepted_by` — one or more, **each carrying a `name` and the `role` they judged in** (C40). The approval writes one entry, the person who approved. The workflow contract names two actors at G2, a researcher and a product manager, and nothing enforces a second signer
- `accepted_at` — the day the decision was **taken**, not the day it was written down
- `changed_during_refinement` — required. **`none` is a legal value and absence is not**, because what carries signal is what the human changed to get there
- `asked_before_approval` — optional, `0..1`: what the person approving said they had asked to be changed during the stage, in their own words, from the approval's optional box. Absent means the box was left empty. It is not `changed_during_refinement`, which C40 holds to the refinement rounds the run records
- `refinements[]` — required, **an empty list is legal and absence is not**. One entry per round recorded on the run at this gate, each carrying **`what`** (the element found wanting, by its id), **`reason`** (in the reviewer's own words), **`changed`** (what the accepted version does differently), **`by`** (name and role) and **`at`**. **No task records a round**, so on a run driven by tasks the list is empty
- `selection` — required at the gates that choose one of many
- `note` — optional

**Rework is counted by the build, and a reason exists only on a send-back.** A person who finds a stage
that carries a gate result not good enough yet sends it back with "SPOCK: send a stage back to be redone",
which asks for their name, the reason and the role they decided in. With the role box left empty the record takes
the role this person already recorded on this run, and nothing is sent back where they recorded none. The reason goes on the run's `decisions[]`, and the stage's earlier decisions
are withdrawn and kept on the record, each marked with the day and the reason (§6.16). The answers to the gate's
questions are withdrawn and kept too, in `judged_withdrawn[]` with the same day and reason, and counted in the
improvement figures as withdrawn. A reason in the reviewer's own words is the raw material for turning a person's
judgement into a rule that runs without them.
`changed_during_refinement` reads `none` wherever no round is recorded.

**`revisions` is not asserted on the record, and it bounds only a stage gated before 14 September 2026.** The
artifact already carries a revision count, and a count asserted twice is a count that can disagree with
itself, so the record does not repeat it. **On such a stage, C40 requires `refinements[]`
to be no longer than `revisions`.** The two are not equal by design: **`revisions` counts every revision
the artifact went through, including those made while it was being authored**, and only some of those are
rounds at a gate. A brief revised twice with the user before it ever reached G1 is `revisions: 2` with no
refinement rounds at all, and that is a true record.

**Nothing keeps that count, so the build counts rework itself.** `assemble.mjs`, `problem-material.mjs` and
`solution-join.mjs` seed `revisions: 0`, and no script moves it. At every quality gate and every decision gate the build reads each document the
stage lists, leaving out what a script writes between two gates, and notes a round of rework on the stage
(`rework[]`, §6.16) whenever one of them changed since its previous gate, including a stage sent back and
written again. **The PRD draft is read at two more moments**, because no
gate runs on stage 6 before the person agrees it: when it is first put to the person for agreement, only if nothing
has read the stage yet, and when they mark it agreed, only while the stage is still `running`. So a draft sent back
and rewritten in between leaves a round too, and past the stage's gate the mark reads nothing and the gate that runs
again counts the change. **Nothing about it reaches a person** — no box, no
message, no line on the front page — and the metrics reader counts it. **A stage gated on or after 14 September 2026
is asked for no revision count and given no bound on its rounds**, because the build sees fewer changes than
a person makes rounds: two rounds between one pair of gates are one change, and a floor taken from what it
saw would refuse an honest record.

**The clause that carries the weight is the agreement between the two fields**: `changed_during_refinement`
reads `none` **if and only if** `refinements[]` is empty. It needs no denominator, and it refuses the one
failure this pair has already produced — a record narrating a refinement that left no trace in the
artifact.

There is no reject disposition at a gate. A person sends a stage back to be redone or stops the run
(§6.16); what carries signal is *what the human changed to get there*. That record is also the most
interesting evidence the pilot can produce about where the agents fall short.

**Rules**
- A decision gate without a record has not been passed.
- No agent writes a decision record.
- A quality gate is never passed by a human overriding it.

### 7.6 External access

An answer sourced from outside the run has different standing from one traceable to the brief, and the
reviewer is entitled to know which they are reading. Competitive Analysis is the exception: outward
research is its job when producing, so a warning there would be noise.

| Agent | Shape | Outward | Warns |
|---|---|---|---|
| competitive-analysis | produce | Normal — the `landscape-mapping` and `deep-dive` bindings. Searching needs VS Code's web search extension and a search key, installed separately; without them the agent works from addresses a person supplies | No |
| competitive-analysis | converse | On request only; proposed and not built (below) | Yes |
| product-manager | — | **`none`** | — |
| hypothesis-designer | — | **`none`** | — |
| business-analyst | — | **`none`** for research; `jira_write` on the parked `initiative-propagation` binding | — |
| methodology-coach | — | **`none`** | — |
| workflow-support | — | **`none`** | — |

**No agent but Competitive Analysis reaches outward for research**, because Blueprint §6.1 requires a closed
capability list and **a capability that appears on request is not a closed list**. No binding of the other
agents declares an outward capability except the Business Analyst's parked `jira_write`, which propagates the
initiative to Jira and does not run. "Go and look" routes to the two bindings that hold `search`, and
nothing else in the workflow reaches outward for research.

This is also what keeps the Methodology Coach's unlimited read scope sound. That exception rests entirely
on the Coach being unable to *act* — an agent that reads every artifact in a run and can also reach
outward is the one shape the argument does not survive.

**The converse row is the one row no registered binding implements.** Going outward on
request is Competitive Analysis's own behaviour, and that agent does hold `search` and `retrieve` — but on
`landscape-mapping` and `deep-dive`, both of which produce. The `synthesis` binding, which is what runs
today when the agent converses, declares `[]` deliberately. The conversational binding this row describes
is proposed and unregistered. Until it exists, the row describes an intent rather than
a capability anything can exercise.

**Marking, not just warning.** Warning the user is a courtesy that nothing can verify. What is
verifiable is the artifact: anything drawn from outside the run is tagged in `external_sources[]` at
the point it enters, and **C18** checks the tag is present. The reviewer then sees which claims are
traceable to the brief and which arrived from outside — which was the point of the warning, made
durable.

---

## 8. Scoring

### 8.1 Nothing is scored

**Nothing in this workflow gives a solution a number.** Strategic alignment is a statement in the solution's
own words; regulatory reach is the list of touchpoints the solution fired, in the card's own sentences, with
a count. **There is no axis, no band and no total to combine, rank or sort by**, and `C70` refuses a score field
on a solution.

**What a band would add, and why the list does it better.** A band would compress *how much regulatory work
does this drag along* into one of four words, placed by three facts. The touchpoint list already carries
those facts and says them in sentences the area cards wrote, so a band would be a summary sitting on top of
something more discriminating than itself. **A second summary of the same evidence is complication rather
than signal**, which is also why there is no weighted model.

**The count is a count.** How many of the 128 questions a solution answered `yes`. Not banded, not
weighted, not placed against a scale, and twenty touchpoints is twenty touchpoints — whether that is a lot
is the reader's judgement rather than the workflow's.

**Unanswered questions never move it, and that is deliberate.** Two solutions touching the same areas, one
having answered everything and one leaving eighteen open because the idea never says where data would be
hosted, come out with the same count. **The second is not more complex, it is less known**, and merging
the two would report uncertainty as size — the confusion the trust tag exists to prevent two stages
earlier.

### 8.2 Nothing sorts, and it is structural

**With no band there is nothing to scan and nothing to sort by**, so a reader cannot take the cheapest
solution for the best one. A person reads seven sections and a compliance paragraph per solution
and decides, which is what G4 is for. `C59` refuses a solution, or the solution set, carrying a field that
ranks, orders, prefers or selects (such as `rank`, `priority` or `selected`); a ranking written in a solution's prose is
not checked.

### 8.3 The scoring model, kept declared

**The retired model is declared in [`.github/registry/scoring.yaml`](../.github/registry/scoring.yaml) and this
table is checked against it** (`C132`, a repository check). **No stage applies it and no check grades a score**:
no step of the workflow contract produces an `A8b`, and the checks that graded one have left the build. **The
build keeps the model declared** because committed runs carry an `A8b` scored under it, and a finished run must
stay readable against the model it was scored under. Where its stage recorded the documentation standards, `C100`
still holds such an `A8b` to a section for each solution scored and a section headed The comparison, without checking
their order.
`C70` refuses a score on a solution.

<!-- SCORING-TABLE -->
| Score or sub-dimension | In the model | Anchored to, or what it would have measured |
|---|---|---|
| **Strategic alignment** | scored | The Strategy Basis |
| **Regulatory complexity** | scored | The compliance guidelines |
| Opportunity-solution fit | left out | How squarely the solution answers the problem it binds to |
| Market differentiation | left out | Whether it does something the market's participants do not |
| Innovation opportunity | left out | Whether it opens something the bank could build on afterwards |
| Technical complexity | left out | What the build costs in engineering terms |
| Operational change | left out | What the bank's own people would have to do differently |
<!-- /SCORING-TABLE -->

**Neither of the two scored rows is applied**, for the reason §8.1 gives. **The five left out are not in the
model.** Each is recorded in the registry with what it would have measured, the weight it held, who left it
out and when, and when it is to be reconsidered.

> **What this costs, stated rather than discovered.** Nothing says how hard a solution is to build. **A
> three-year build and a three-week build are indistinguishable on the page**, and with operational change
> out, one that is cheap to build and expensive to run reads the same as one that is cheap. The person
> selecting at G4 is the only thing standing between those pairs, and no number tells them so.

> **Nothing compresses regulatory reach into something scannable.** A person comparing five solutions gets
> five paragraphs and five counts, which is more honest and slower to read, and a set of ten, which a person
> may reach by adding, is slower still.

### 8.4 Strategic alignment

Assessed once and validated once. The assessment names the pillars a solution serves while the choice is
still open; the validation confirms that the thing being built still serves the strategy after the solution
has been narrowed into an MVP, which is where strategic value is most often lost.

| Pass | Stage | Type | Output |
|---|---|---|---|
| **Assessment** | 4.2 | **A statement, not a score** | §7 of the solution |
| **Validation** | 6.1 | Confirmatory | A statement in A12 |

**The ideation step is instructed to name in §7 at least one pillar the Strategy Basis declares and say how
the solution serves it**, then the key result and the chain from the solution's own product metric, or the reason
none fits and which candidates were considered. On a solution set produced from 7 September 2026 `C83` holds that the section is there; no check reads which
pillar it names. **A band would add only chain length, which the statement already
carries**, and a number restating a sentence adds nothing to it.

**The skill is told to take the pillars from the Strategy Basis and never from the brief.** The basis carries ČS's seven
pillars, six objectives and twenty-five key results; the brief carries this run's own goal and metric. A
statement naming a goal the brief invented is naming nothing.

### 8.5 Compliance

Compliance shapes what is produced rather than judging what was produced. The producing skills of stages 4
to 6 declare the compliance bodies (B5, declared, §9.3), so a solution touching personal data is meant to arrive
with consent and retention already designed in rather than corrected later. **Then the agent answers every
question all four cards carry against that solution**, and the answers that came back `yes` are the touchpoints,
printed as the card wrote them. On a solution set produced from 7 September 2026 `C125` refuses a question left
unanswered.

```
   the four area cards ──────────► held in context DURING production
                          │
                           ▼
                 compliant BY CONSTRUCTION
                          │
                           ▼
        every question on all four cards answered, per solution
                          │
                           ▼
     the yes answers are the touchpoints · a cannot-tell names its missing input
```

**A run with no *cannot tell yet* anywhere is worth a second look and is not a failure**, because **the
questions ask about the product**, and a well-written solution can honestly answer all 128.

---

## 9. Agents and skills

The agent holds the role; the skill holds the job and the know-how. Thin agents, rich skills.

**Thin is measured by what the agent carries, not by how many skills it holds.** An agent declares a
role, a roster of skills, and the artifacts it may reach. It carries no method text, no area logic,
no know-how of its own. An agent with five skills and no embedded method is thin; an agent with one
skill and a page of case topology inside it is thick. The Product Manager holding four skills across
three stages is therefore not a violation of this rule — what would violate it is the Product Manager
agent containing the ideation method rather than pointing at the skill that holds it.

**Rules**
- An agent declares: its role, its skill roster, the artifacts it may read and write.
- An agent carries no method, no know-how, and no quality standard of its own. All three live in skills.
- A skill is never copied into an agent. It is referenced.
- Two agents may hold the same skill. Neither owns it.

| Agent | Skills | Stages |
|---|---|---|
| **Product Manager** | `brief-creation` · `ideation` · `mvp-option-design` · `mvp-expansion` | 1.1 · 4.1 · 5.1 · 5.2 |
| **Opportunity Designer** | `material-intake` · `hypothesis-authoring` · `opportunity-framing` · `prioritisation` | 2.1 · 2.2 · 2.3 · 2.4 |
| **Competitive Analysis** | `landscape-mapping` · `market-content-extract` · `deep-dive` · `synthesis` | 3.1 · bridge · 3.2 · 3.3 |
| **Business Analyst** | `prd` · `initiative-authoring` · `initiative-propagation` | 6.1 · 7.1 · 7.2 |
| **Methodology Coach** | `methodology-guidance` | — standalone |
| **Workflow Support** | `workflow-support` | — standalone |

### 9.1 Skill contracts

| Skill | Agent | Stage | Reads | Writes | Know-how |
|---|---|---|---|---|---|
| `brief-creation` | Product Manager | 1.1 | user dialogue | A1 | Brief Fields, Strategy Basis (its key results), Evidence Standards, Stage 1 Shapes |
| `material-intake` | Opportunity Designer | 2.1 | A1, A2 | **A2b** | Evidence Standards |
| `hypothesis-authoring` | Opportunity Designer | 2.2 | **A2b** | A3 | Evidence Standards |
| `opportunity-framing` | Opportunity Designer | 2.3 | A3, A1 | A3b | Opportunity Framing |
| `prioritisation` | Opportunity Designer | 2.4 | A3b, user direction | A4 | Opportunity Framing |
| `landscape-mapping` | Competitive Analysis | 3.1 | A1, A4, A3b, S1, the supplied market list | A5 | Competitive Analysis Standards, Stage 3 Shapes |
| `market-content-extract` | Competitive Analysis | bridge | fetched page text | a structured extract, never a run artifact | — |
| `deep-dive` | Competitive Analysis | 3.2 | A5, S1 | A6 | Competitive Analysis Standards, Stage 3 Shapes |
| `synthesis` | Competitive Analysis | 3.3 | A6, A4, A3b | A7 | Competitive Analysis Standards, Stage 3 Shapes |
| `ideation` | Product Manager | 4.1 | A1, A4, A3b, A7 | A8 | Strategy Basis, Discovery Craft, Compliance Guidelines, the four area bodies, Screening Inputs, Stage 4 Shapes |
| `mvp-option-design` | Product Manager | 5.1 | A9, A8, A7, A1 | A10 | Compliance Guidelines, the four area bodies |
| `mvp-expansion` | Product Manager | 5.2 | A10 selected, A9, A3b | A11 | Strategy Basis, Compliance Guidelines, the four area bodies |
| `prd` | Business Analyst | 6.1 | A11, A1, A4, A3b | A12 · *revises toward* A13 | Strategy Basis, Compliance Guidelines, the four area bodies, PRD Template |
| `initiative-authoring` | Business Analyst | 7.1 | A13 | A14 | Initiative Template |
| `initiative-propagation` | Business Analyst | 7.2 | A14 | A15 | — |
| `methodology-guidance` | Methodology Coach | — | user question, all run artifacts | *nothing* | Method Canon, Discovery Craft, Evidence Standards, Opportunity Framing |
| `workflow-support` | Workflow Support | — | the run record, the gate result, the failing task's output | *nothing* | — |

Every skill but `workflow-support` also declares the Method Canon, every skill declares the writing body on agent
interaction, most declare output voice and documentation standards, and `brief-creation` and
`opportunity-framing` declare input elicitation. The generated
[CONTENT-REGISTER.md](./CONTENT-REGISTER.md) lists every body with the skills that read it.

**Job and quality standard**

| Skill | Job | Quality standard |
|---|---|---|
| `brief-creation` | Elicit and assemble a complete initiative brief | Never infers a field; marks unknowns explicitly |
| `material-intake` | Reduce the user's material to structured observations | **Quarantine boundary** — declares no tools, and the agent running it holds no search, fetch or terminal. Refuses to proceed with no material; clarifying questions are expected, not exceptional |
| `hypothesis-authoring` | Restate observations as standardized hypotheses with evidence | **Instructed never to read raw material.** Evidence only by A2b's references; trust derived, never asserted |
| `opportunity-framing` | Frame each hypothesis as an opportunity in the user's own words | Draws the framing out rather than authoring it; leaves an open field empty rather than filling it |
| `prioritisation` | Promote ≤3 primary and ≤5 secondary; park the rest | Parked entries retained and visible |
| `landscape-mapping` | Identify market participants for the topic, from a supplied market list or by search | Instructed to consult S1 before researching |
| `market-content-extract` | Reduce fetched page content to a structured extract | **Declares no tools and no authority**; the agent running it holds `fetch` and `websearch`, so it is instructed to fetch and search nothing while it runs. Facts only, so that text a competitor wrote does not reach the step that writes a card |
| `deep-dive` | Profile each participant the landscape map selected | Instructed to research every participant A5 selected, since reuse of stored cards is suspended. C9 fails a card in A6 past its freshness threshold |
| `synthesis` | Distil standards, patterns and trends for this run | Run-scoped, never reused; every element traced |
| `ideation` | Generate five solutions bound to opportunities and evidence; the finished set holds three to ten | Every solution bound in both directions; does not score its own output |
| `mvp-option-design` | Derive 2–3 materially different ways to pilot the solution | **Diverges** — alternatives not phases; no option presented as preferred |
| `mvp-expansion` | Expand the human-selected option to analyst-ready depth | **Converges** — selected option only; does not re-rank the alternatives |
| `prd` | Author the PRD, validate alignment, revise toward agreement | Never writes the agreement mark. A13 is written by the workflow from A12 when a person marks it agreed; the skill never writes it |
| `initiative-authoring` | Produce the initiative document from the agreed PRD | Verifies the agreement block **before** starting; the run completes on this artifact |
| `initiative-propagation` | Push the initiative to Jira | **Parked until the Jira host is named.** Never invents an identifier; **may fail without failing the run** |
| `methodology-guidance` | Explain the method to the people running it | Method not content; approves nothing, alters nothing |
| `workflow-support` | Say what state a run is in and the one task that moves it | Reads the record, never infers; says plainly when nothing fits; changes nothing |

### 9.2 Effort bounds

Every skill declares what bounds it. An unbounded skill is one nothing can stop — `deep-dive` in
particular could research indefinitely, and nobody approves stage 3.

The values are declared per skill as `bounds:` in `.github/registry/skills.yaml`; the refine cycles of `prd`
and `initiative-authoring` are declared only in their skills, as instructions. The obligation to declare them is
stated here.

| Skill | Bounded by |
|---|---|
| `brief-creation` | Max elicitation turns before it hands back what it has, with the gaps named |
| `material-intake` | Max input volume · max clarifying rounds |
| `hypothesis-authoring` | Max hypotheses emitted |
| `opportunity-framing` | — one opportunity per hypothesis |
| `prioritisation` | — cardinalities are the bound (1..3, 0..5) |
| `landscape-mapping` | Max competitors identified · max search iterations |
| `market-content-extract` | — no capabilities; the empty list is the bound |
| `deep-dive` | **Max competitors researched per run · max sources per card · wall-clock ceiling** |
| `synthesis` | Max elements per category |
| `ideation` | — cardinality is the bound: **`ideas: 3..10` in the registry, the finished set C4 reads.** The skill is instructed to name five and never fewer than three; C102 reads solutions plus unproduced ones against 3..5, and only where A8 records a solution unproduced |
| `mvp-option-design` | — cardinality is the bound: **2..3 derived, 2..6 in the finished set (C4)** |
| `mvp-expansion` | — one option expanded |
| `prd` | Max refine cycles · max quality-gate remediation cycles |
| `initiative-authoring` | Max refine cycles |
| `initiative-propagation` | **Max propagation retries** — the one skill allowed to give up |
| `methodology-guidance` | Max turns, attempts per question and steps |
| `workflow-support` | Max turns, attempts per question and steps |

**Rules**
- Every skill declares at least one bound. A skill with none is not specified.
- A bound is a stop, not a target. The substrate does not stop an agent at one: the skill is instructed to stop there and return what exists with the shortfall named.
- Reaching a bound is to be recorded in `bounds_hit` on the production record, which is what prevents silent truncation. No check reads what that field says; `metrics.mjs` counts the artifacts whose records list one.
- `deep-dive` is the one to watch: it runs inside the one stage nobody approves.

### 9.3 Cross-cutting behaviours

Standing rules written into every skill would be one copy per skill, diverging over time, each editable
by whoever edits the skill it sits in, which puts the rule under the control of the thing it constrains.

**The design composes them into every skill invocation**, ahead of the skill's own method and unable
to be modified by it. This is the Agent Blueprint's composed-floor pattern: one named artifact that no
skill can decline, with the version in force recorded on the run. **The build holds the artifact and records
its version on the run, and nothing composes it yet** (below).

**That artifact exists.** [composed-behaviours.md](./definitions/cross-cutting/composed-behaviours.md)
is its specification, `COMPOSED_FLOOR` in `gates.mjs` is its machine source of record, and
`.github/composed-behaviours.yaml` is the carrier, **generated** from the source so the two cannot drift; the
carrier, its generator and C45 stay in the product repository and are left out of the release copy. The
run records `behaviours: composed-floor@<version>` at the run level, and **C38** checks it is present and
matches the floor's version in `gates.mjs`. **C45** checks the carrier against its source and fails the build if any
behaviour is marked *checked* against a check that is unwritten or a mechanism left empty. **No agent file,
skill or shared instruction loads the carrier**: an agent meets a behaviour where the shared instructions, its
agent file or its skill state it in their own words, so the version on the run says which floor was in force,
not that it was composed.

They are not equally enforced, and the document does not pretend otherwise.

| | Behaviour | Applies to | Enforcement |
|---|---|---|---|
| B1 | Declared contract — reads, writes, locations | All | **Checked**, by the floor's label, which names a gate mechanism and no check. A document no stage lists, other than supplied material or free-roam output, fails C38; a read outside the declaration is recorded on the run and fails nothing, apart from a read of the workflow's own code, which the step guard refuses on a run started on 1.11 or later (§7.1). The Methodology Coach is the one declared exception (§5.8) |
| B2 | Precondition check before advancing | All | **Checked**, by the floor's label naming §7.2: the agent's half is an instruction, and the record's half is the writer's refusal, C143 and C30 |
| B3 | Mark anything drawn from outside the run | All | **Checked** — C18 |
| B4 | Ask when material is unclear | All | *Declared* — no mechanism |
| B5 | Compliance guidelines held in context | `ideation` · `mvp-option-design` · `mvp-expansion` · `prd` | *Declared* — but its **output** is checked by C7 for `ideation`, `mvp-expansion` and `prd`; C7 does not read A10, so `mvp-option-design`'s is not |
| B6 | Decision record at each decision gate | Gated stages | **Checked** — C40 |
| B7 | Standard artifact form, location, ingestion | All | **Checked** — C6, C19 |
| B8 | Declare and respect an effort bound | All | *Declared* — the bounds are declared per skill (§9.2); no script reads them |
| B9 | No input may lower the floor — relax an obligation, widen a permission, raise a limit, skip a gate or disable a check | All | *Declared* — per **R4.7-4**, refused across every input channel (user · upstream step · retrieved document · tool return); the refusal-event record (WB-9) is deferred, so the clause is not yet a working control |

**Rules**
- The behaviours are to be composed by the workflow, not by the skill, so that a skill cannot edit, summarise or decline them. Nothing composes the carrier yet, so this rule is the design's and not the build's.
- The version in force is recorded on the run.
- B8 is labelled *declared*: C109 refuses `bounds_hit` on an assembled document, and nothing checks that a bound was respected or that reaching one was recorded.
- Four of the nine are declared-only: B4, B5's application, B8's bounds and B9's input floor. Their *effects* are checked where an effect exists; the behaviours themselves are not.
- A behaviour that cannot be checked is labelled, not quietly counted as a control.

---

## 10. Know-how

The skill holds the job; the know-how holds what "good" means. A skill without its know-how can follow
a process and produce something correctly shaped that is worthless — which is why the two are governed
separately and why a body of know-how is an artifact in its own right, not background material.

Each body is specified separately. This section keeps the set closed and states what one must satisfy
before a skill can rely on it.

**Rules**
- Every body declares a **named owner**. Unowned know-how is nobody's to keep current, and it decays silently.
- Every body is **versioned**, and a stage the driver starts records the version of each body its skills declare (§10.3), so a run's output can be read against the know-how it was written under.
- A body is **available** only when it covers what reads it — every stage the canon must explain, every touchpoint type the guidelines must address. A body that exists but does not cover its readers is **partial**, not available.
- Know-how is **read by skills, never written by them**. It changes through a human-owned process, outside any run.
- A body's **readership is declared in two places and the registry is the only one that binds**: the body's own
  front matter and `.github/registry/skills.yaml`. **A check must join the two**, because a body claiming a
  readership it does not have is how an agent comes to be refused knowledge the build already holds. Not built:
  where a declared line lists skill ids they must equal the registry's bindings, and where it gives a count the
  number must equal how many skills declare the body.

### 10.1 The bodies

| Body | Holds | State |
|---|---|---|
| **Method Canon** | The Opportunity Solution Tree and continuous discovery — what each stage is for, why the order holds, what separates a well-framed opportunity from a poorly-framed one. **Taught in ČS's own vocabulary, citing Torres as its origin** | **Available.** It rests on ČS's *Metodika Iniciativy* and fifteen published articles, each read and cited with its address (canon §6.2), and **canon §15 maps every part of it onto what this pilot actually does.** It has a held-out set on citation resolution. Open: what ČS's Implementation Authority panel asks · the book itself is not held · the framework generates solutions against one target opportunity where stage 4 uses a prioritised set |
| **Brief Fields** | The fields a brief must carry, and where each is normally sourced | **Available.** Its coverage bar is met; three ČS-specific sourcing entries are unconfirmed and weaken the elicitation help without blocking it |
| **Evidence Standards** | What makes two references *independent*, what makes provenance *complete*, and the thresholds that separate strong from weak from unrated | **Available.** The trust arithmetic it defines is built, gated by C37, C39 and C52, and covered by a held-out set |
| **Competitive Analysis Standards** | What a sound landscape, a sound competitor card and a sound synthesis look like; the card field set | **Available.** It sets the freshness threshold, 180 days for direct participants and 365 for adjacent and substitute ones, which C9 applies to the cards a run researches. Its confidence bands are disjoint and total, and have a held-out set |
| **Strategy Basis** | ČS's pillars, objectives and key results that a solution's alignment statement names, and what a product may use as its own measure | **Available.** Encoded from *Strategie Spořitelna 2030* and *Naše OKRs* |
| **Compliance Guidelines** | The mechanism the four areas are read through — the six moments, the screen, the value, the flag — and beneath it four area bodies, one per regulatory area | **Assembled, and not assessed.** It has no coverage-bar section, so it does not state whether it covers its readers. **Three of the four area bodies were written by this project** and are unreviewed by ČS |
| **Screening Inputs** | What a compliance screen has to be able to resolve, joined once across the four areas, with the question a person is asked for each | **Available.** Forty-seven inputs covering the cards' sixty-one rows, and `C123` fails the build when the join stops holding. **Three of the four cards behind it were written here**, so thirty of the forty-seven rest on our reading rather than ČS's |
| **PRD Template** | The section set a PRD must carry, what each section holds, and what makes a requirement usable | **Available.** **Eight sections, closed**, so C67 can count an artifact against it. Requirement bar, refused-language table and acceptance-criteria form adapted from an internal PRD quality checklist. It has a held-out set |
| **Initiative Template** | The structure of a delivery-ready initiative | **Available** — ported, not authored. The Jira host in §2 is unresolved and marked; that is the §11.2 decision |

Stage 5 works from the Compliance Guidelines and the four area bodies; no separate banking constraints body
exists. The held-out sets named above are in the product repository (`.github/evals/`) and are left out of the
release copy.

Three states only. **Available** — owned, versioned, and covering what reads it. **Partial** — exists
but does not yet cover its readers. **Absent** — does not exist.

**The table carries the bodies the stages' producing steps are built around.** Every body on disk, with the
skills that read it, is listed in the generated [CONTENT-REGISTER.md](./CONTENT-REGISTER.md), and each body
carries its own version in its header, so neither is typed here. Each available body states its own coverage
assessment in its final section, and that assessment is the basis for the state recorded here. The
source of record is `specifications/definitions/know-how/`; `.github/know-how/` is generated from it and never
edited directly. **C41 enforces that generation from both directions** — a design-side change that
was not regenerated fails, and so does a hand-edit of the generated copy.

**What the state column does not tell you.** Availability is a property of the body. **Whether the skills
that read it actually use it is a separate question, and nothing here checks it.** A body can read
`Available` while a reader behaves as if it were absent. **A body's state and its readers' behaviour are
two claims, and only the first one is written down.**

### 10.2 The Method Canon

The Coach teaches **Teresa Torres's framework**: the opportunity solution tree, continuous discovery,
and the discipline of separating an opportunity from a solution. This is the same method the workflow
is built on — the brief carries an outcome, stage 2 frames the opportunities, stage 4 the solutions —
so the Coach explains the method the team is actually executing rather than a parallel one.

Two consequences worth stating.

**It is knowable.** The framework is published. The canon is encoded from and checked against a real
source, rather than invented.

**Cite the framework; do not reproduce it.** A method is not owned, but its expression is. The canon
encodes the practice and points at the source. It does not carry the author's text.

**Coverage bar.** The canon is available when it can answer, for all seven stages: what this stage is
for, why it sits where it does, and what separates a good output here from a poor one.

**Every citation resolves to something held.** The canon rests on ČS's *Metodika Iniciativy* and on
**fifteen published articles, each read and each listed with its address** (canon §6.2). The book is not
held, so a claim that exists only in the book is absent by rule rather than by oversight, because a
citation to a source nobody has read is the failure this body exists to prevent.

**The bar is practical rather than definitional.** The Coach can answer what kind of
measure an outcome should be, where opportunities come from, how an opportunity space is structured,
how one opportunity is chosen over another, how many solutions to hold and why, which assumptions
underlie a solution, and at what rhythm the practice runs. **And it can map every one of those onto
what this pilot actually does** (canon §15), which is the half a person mid-run needs and the half a
pure framework summary cannot supply.

**The pilot's departures from the framework are written down** (canon §15). One of them: the framework
generates solutions against **one** target opportunity, and stage 4 generates them against a prioritised
**set**. Both are coherent and they are not the same practice. It is a contract question rather than a
canon question, and the Coach names the difference and proposes no change.

### 10.3 What each run records

Know-how changes; runs must remain explainable after it does. When the driver starts a stage, and again when it
marks the stage produced, the run state records the version of each body the stage's skills declare, so an output
written under one version of a body is not silently read against another. A stage moved with `SPOCK: move a stage`
records none on that move, and `C62` refuses at its gate a declared body the stage neither records nor lists as not
read. The record says what the stage was given, not what an agent was observed to read, and `C62` also refuses a
recorded body missing from disk or ahead of the version on disk.

---

## 11. Build prerequisites

What must exist before the affected part can be built. Distinct from the run prerequisites in §1.2,
which are what a team needs before starting a run.

They are not equal in kind or in effort. Some are **environment capabilities** the substrate either has
or does not. Some are **decisions** — a choice, then minutes of recording. Some are **documents** that
have to be authored. The rest are **verifications or measurements**. Reading them as one flat list of
blockers overstates the work by a wide margin.

**Every prerequisite declares what happens without it.** Most degrade rather than block: the affected
behaviour runs in a reduced, explicitly-stated form. A pilot that waits for all of them starts later
than it needs to, and the ones that genuinely block are few.

**Rules**
- Every prerequisite names an owner. An unowned prerequisite is nobody's to clear.
- Every prerequisite states its failure mode: **blocks**, or **degrades to** a named reduced behaviour.
- Every prerequisite carries a **state** — `met`, `part met` or `open`. The *Without it* column states what a prerequisite costs while it is open; it does not say whether it still is. Those are two different claims.
- A degraded behaviour is always visible in the artifact. It is never silently reduced.
- Degradation is not a workaround. A run that degraded says so in the artifact.

### 11.1 Environment — what the substrate must permit

These are not documents or decisions. They are capabilities the environment either has or does not, and
no amount of design work substitutes for them.

| Needs | Owner | State | Without it |
|---|---|---|---|
| **Outward research access for the competitive-analysis agent** — search or web tooling, any credentials or licensed sources, and a bank policy that permits an agent to reach them | ČS | **part met** — access is granted and egress is open by default, to be narrowed later: the approved regime in `.github/registry/egress.yaml` names the web search the agent uses, and nothing restricts fetch to a list of hosts. **Searching needs VS Code's web search extension and a search key, installed separately from this repository.** Which search provider ČS will accept, and whether a managed policy at the bank overrides it, are open | **With no outward access, blocks stage 3.** The market stage cannot produce on either route: a supplied market list still has to be fetched. Everything downstream loses its market evidence, and no solution can satisfy its binding rule. **Without the search extension and its key**, the agent cannot search and works from addresses a person supplies |
| **Automatic stage triggering** — the environment must chain the next stage when a stage closes | *unnamed* | open | **Degrades to manual invocation.** Each stage is started by a person, who picks the agent the workflow names; the precondition checks still stop the run advancing on missing input, so nothing breaks — the workflow is simply a documented sequence rather than a connected one |

### 11.2 Decisions — a choice, then minutes

| Needs | Owner | State | Without it |
|---|---|---|---|
| **Jira identifier source and authoritative host** — `csas.atlassian.net` or `jira.csin.cz` | ČS | open | **Degrades.** The initiative document completes and the run finishes; propagation is parked and does not run |
| **Competitor freshness threshold** — the age past which a card is re-researched | ČS | **met** — 180 days for direct participants and 365 for adjacent and substitute ones, in the Competitive Analysis Standards, which C9 applies to the cards a run researches. The landscape-mapping and deep-dive skills tell the agent that reuse of stored cards is suspended and to research every participant selected; no check refuses an entry in `A5.reused[]` | **Degrades to always-refresh.** Correct but expensive: every run re-researches every competitor, and the cross-run saving is lost |
| **Language policy across artifacts** | ČS | open | **Degrades.** Artifacts follow the language the run declares on its brief; a policy across artifacts is not set |
| **`elicitation-dialogue` registered** in the area pattern catalogue | ČS | **met** — registered in the [pattern catalogue](./definitions/PATTERN-CATALOGUE.md) and in the build's own pattern register | **Blocks conformance, not behaviour.** Person-facing skills cannot declare a valid pattern, and the Blueprint treats an unrecognised pattern as a validation error. The skills run; they cannot be validated |

### 11.3 Documents — authoring work

| Needs | Owner | State | Without it |
|---|---|---|---|
| **Brief Fields** — the field set, and where each is sourced | ČS | **met** | **Degrades, with wide effect.** The brief captures topic and goals only; completeness cannot be asserted and the required-field check cannot run. **Every run starts here** |
| **Evidence Standards** — what makes references independent, provenance complete, and the trust thresholds | ČS | **met** | **Blocks the trust tag.** The tag is declared derived and non-negotiable, and without this body *multiple*, *independent*, *thin* and *complete* would be defined nowhere. Stage 2 could still produce hypotheses; it could not tag them consistently, and the evidence discipline the whole workflow rests on would become nominal |
| **Competitive Analysis Standards** — what a sound landscape, card and synthesis look like, and the card field set | ČS | **met** | **Degrades badly.** Stage 3 is the only stage with **no human gate**. Without a standard, its quality gate has no bar to check against, and a weak card can be kept into the shared store and reused by later runs |
| **Compliance Guidelines** and the four area bodies | ČS | **met** — assembled and not assessed, and three of the four area bodies are ours and unreviewed by ČS (§10.1) | **Degrades.** Solutions, MVPs and PRDs are produced without compliance shaping, and every affected artifact is marked as such. The touchpoint check has nothing to verify. *Whether this is acceptable in a bank is a judgement for the stakeholder, not a design call* |
| **Method Canon** — Teresa Torres's framework, encoded across all seven stages | ČS | **met** — on ČS's *Metodika Iniciativy* and fifteen published articles | **Blocks the Methodology Coach.** The Coach teaches from a named section or returns the question unanswered |
| **PRD Template** | ČS | **met** | **Degrades.** The PRD is authored in a default structure and marked non-standard, and C67 has nothing to count it against |
| **Initiative Template** | ČS | **met** — ported, not authored | **Degrades.** As above, for the initiative document |

### 11.4 Verification and measurement

| Needs | Owner | State | Without it |
|---|---|---|---|
| **Strategy Basis verified** — *Spořitelna 2030* and the bank-wide OKRs | ČS | **met** — encoded as the Strategy Basis | **Degrades.** Alignment cannot name a pillar the basis declares, and the PRD's alignment validation cannot run |
| **Current-process baseline** — cycle time from brief to initiative, and rework incidence, for the team's existing process | *unnamed* | open | **Degrades.** The speed and quality criteria are declared unevaluable with their reason; the pilot is judged on completion, traceability, standardization and attention only. **Must be captured before or alongside the first run — once the pilot replaces the old process for that team, the comparison window is gone** |
| **A collection instrument for the attention criterion** — a post-run debrief or survey, and someone to run it | *unnamed* | open | **Degrades.** The criterion is declared uncollected. It measures the reviewers' experience during the run and cannot be reconstructed afterwards |
| **Two teams running the same stage** | *unnamed* | open | **Degrades.** The standardization criterion cannot be observed and is declared unmeasured |
| **A named owner for the competitor store** | *unnamed* | open | **Degrades.** The store outlives every run and nobody is accountable for what accumulates there. Beyond the example runs it is built from, a run's competitors enter only when a named person keeps them, so what enters is attributable without being owned |

### 11.5 What actually blocks

**Nothing still open blocks the pilot outright.** Stage 3's outward access is granted under the approved
regime, and what remains open about it is which provider ČS accepts. **This is a bank policy question before
it is a technical one**, and it is the one to settle first, because every solution must bind to a synthesis
element and a run with no market evidence cannot satisfy its own validity rule. Searching also needs VS Code's
web search extension and a search key on the person's machine; without them the agent works from addresses a
person supplies.

Everything else still open degrades to a stated reduced behaviour, and the pilot runs in that state — no
Jira propagation, no language policy across artifacts, stages started by hand rather than chained, no
cross-run competitor saving while reuse of stored research is suspended, and four of the six success criteria
unevaluable. Every reduction is stated in the artifact, which is what declaring failure modes rather than
blockers is for.

**Five prerequisites have no named owner**, and all five are operational rather than authorial: automatic
stage triggering, the current-process baseline, a collection instrument for the attention criterion, a
second team to observe standardization against, and an owner for the competitor store.

**The competitor store carries the largest unowned risk.** It outlives every run, and nobody is accountable
for what accumulates there. It is built from the committed example runs and from the runs a person keeps; no
run has been kept yet, so everything in it today comes from the example runs.

---

## 12. Conformance

Conformance is what a run is judged against after it finishes. It is not the same as passing the
quality gates — those fire per stage, on shape. This is the whole run, read once, including the parts
no program can decide. **No script reads a finished run against this list or returns one of the verdicts
below**: the items in §12.1 are what the quality gates refuse, check by check, at the stages that run them,
and the items in §12.2 are a reader's.

**Rules**
- A run either conforms, conforms with declared exceptions, or does not conform. There is no partial pass.
- An item that could not be evaluated is **declared unevaluable with its reason** — never recorded as passed.
- Every item names whether a program or a person decides it. Half of this list costs someone's attention, and pretending otherwise is how the judgement half quietly stops happening.

### 12.1 Decided by the system

These follow from the coverage checks and the artifact record. No reading required. Some of these checks hold a
document only from a date or a run only from a build; each check's card in `.github/COVERAGE-CHECKS.md` says from
when.

- Every artifact carries the run's identifier, declares its place in the tree, and records the workflow that produced it — or that none did (C6, C28, C22).
- Every hypothesis carries evidence from the supplied material, or is tagged unrated (C1).
- No evidence reference resolves outside the material the user supplied (C2).
- Every framed opportunity (or, with no framing, every hypothesis) appears in exactly one of primary, secondary or parked, and the counts hold — one to three primary, at most five secondary (C27).
- **Where two or more primary opportunities exist, the solutions address at least two distinct ones** (C26).
- Every solution binds at least one opportunity and at least one market element, and the set holds three to ten (C5, C4).
- Each solution carries its strategic alignment section and the compliance section derived from its own answers (C83, C125).
- The finished option set holds two to six MVP options, and exactly one solution and one option were selected (C4, C11, C15).
- Every competitor card shows its research date, and no card a run researched is past its freshness threshold (C8, C9).
- The PRD carries an alignment validation statement, and its agreement block is non-empty and dated (C31, C13).
- The initiative is complete independently of its Jira propagation (C16).
- Every decision gate has a decision record; every stage passed its quality gate or carries a failure a person signed; no quality gate was passed by override (C40, C38, C32).
- Every stale input is rebuilt or carries a recorded human acceptance (C30).
- Nothing was removed: stale and superseded documents are still in the run, and every parked opportunity is still in the framing (C29).
- Adopted free-roam material still carries its mark, everything derived from it says so, and none of it reached the competitor store (C25, C23, C24).
- The initiative traces back through the PRD, the MVP, the solution, the opportunities, to the source material (C12).

### 12.2 Decided by a person

These require someone to read the output. A check can confirm the shape; only a reader can confirm the substance.

- **No agent output is presented as customer evidence.** Nothing mechanical establishes that the supplied material is human-authored — see §12.4.
- **Every identified compliance touchpoint is addressed, not merely mentioned.** The check confirms it appears; whether it was handled well is judgement.
- **The solutions are genuinely different combinations of opportunities**, not variants of one solution. The binding check cannot see this.
- **The MVP options are materially different from each other**, and none was presented as preferred.
- **The expansion did not re-litigate the options the human rejected.** Only the option identifier is mechanical.
- **Every participant was researched in the run.** The landscape-mapping and deep-dive skills tell the agent that reuse of stored cards is suspended, and no check refuses an entry in `A5.reused[]`; a reader finds any reuse in that list.
- **The trust tags were derived, not asserted.** C52 refuses a tag that differs from the arithmetic over the observations it cites; nothing observes how the agent arrived at it.
- **No solution was ranked, filtered or recommended.** C59 refuses a rank, an order or a preference written as a field on a solution; one made in the prose, or a solution left out before the set was written, is a reader's to find.
- **The PRD was marked agreed by the accountable person**, with `SPOCK: mark the PRD agreed`, before the initiative stage started. The mark is recorded from a task box no agent fills, the record refuses a name that is a producer's id, and C13 holds the agreed PRD's agreement block to the record; whether the person who typed the name is the accountable one is a reader's call.

### 12.3 Conformance under degradation

Most prerequisites degrade rather than block (§11), and a degraded run must be able to report honestly.
Without this, a run whose know-how was never written conforms *better* than a healthy one — because
unwritten standards produce nothing to fail against.

A run with no Compliance Guidelines identifies no touchpoints, so *"every identified touchpoint is
addressed"* passes, having checked nothing. That is the most dangerous kind of green.

**Rules**
- A run records which bodies of know-how were absent when it ran.
- Every conformance item that depends on an absent body is **declared unevaluable, with the reason** — not passed and not failed.
- A run that conforms with declared exceptions says so in that form. "Conformed" alone means everything was evaluated.
- The exception list is part of the run's record, not a footnote to it.

**What the build holds of these rules:** a stage the driver starts records the version of each body its skills declare (§10.3), and `C62`
refuses one missing from disk; `SPOCK: record a body this stage could not read` records, in `know_how_not_read`,
a body that landed, or was bound to the stage's skill, on the day the stage ran. No item is declared unevaluable and no exception list is written,
because no script returns a conformance verdict.

### 12.4 Where the guarantee finally rests

The no-synthetic-research guarantee is held by **construction, not by inspection**.

Problem material is required, and the only route in is the user — as files in the run's supplied folder,
including a problem typed into `SPOCK: add a problem in my own words` and text pasted in the chat and taken in with
`SPOCK: take in what I pasted in the chat`. No
agent produces it; it is the one artifact in the workflow with no producing skill. So there is no path
by which agent output becomes problem material inside the workflow, and the checks confirm that every
item records how it arrived (C33) and that the material names no agent or skill as its producer (C34).

What remains is not a system gap. **A user can supply material they did not write** — including
something an agent generated in another context. Nothing detects that, and nothing could without a
provenance chain the pilot does not have.

That residue is human accountability, and it sits with the person who supplies the material and
with whoever signs the problems gate. It is worth stating plainly: the guarantee holds against the
workflow, not against the person using it.
