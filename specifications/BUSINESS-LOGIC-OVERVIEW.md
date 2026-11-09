# Discovery Workflow

**For:** anyone who has to work with this workflow and did not build it — a tester, the business owner who
takes it on, and the engineer who inherits it · **Version:** 0.10 · **Date:** 1 October 2026 · **Release:** 1.14

**It is written for three readers at once**, and the tester guide is written on top of it, so that the two
give one account of the workflow rather than two.

**Every claim below carries the file or the command that proves it**, and where something is designed and
not built this document says so in the sentence that describes it. **No number here is typed beside the
thing it counts** unless the build fails when it stops being true: `.github/registry/claims.yaml` registers
the ones that appear in prose, and `C147`, a repository check, fails when one stops being true.

---

## 0. What is built, what is designed, and what nobody has proven

This section is first because without it the rest of the document reads as an account of a working system.

| | State |
|---|---|
| **Seven stages, end to end** | **Built and exercised.** There are 12 committed runs and **nine of them reached a delivery-ready initiative document** (`node .github/scripts/metrics.mjs`) |
| **121 registered checks across seven gates** | **Built.** Every registered check is implemented and every one has been observed both passing and failing, against a negative suite that prints its own size when it runs |
| **The judged half of every gate** | **No automated judge runs it; the person who signs may answer it.** 29 judged rules need a reader rather than a program, and no second model family is configured to be that reader. The person who signs a gate may answer its judged rules in an optional box of `SPOCK: approve what is in front of me`, and the run records who answered and what. Every gate result you will ever see in this pilot is a pass of its mechanical half, and the build says so on each |
| **Compliance screening** | **Built as a mechanism, and three of its four area cards are ours.** 4 regulatory areas, 128 touchpoints, one written screening body. **One card came from ČS and three were written here and are unreviewed.** A Czech run's compliance sections quote the pilot team's Czech of all four cards, ČS's included. See section 7 |
| **The competitor store** | **Built and never yet reused.** It is built from the committed example runs and from the runs a person keeps with `SPOCK: keep this run's competitors`; no run has been kept yet, so everything in it today comes from the example runs. Stage 3 reads `.github/store/S1-competitors.md` and writes what it finds into the run's own documents, never into the store. `node .github/scripts/store.mjs` prints the store with any runs on your own machine added, and the number of cards reused from one run to the next is zero |
| **The Jira initiative** | **Never produced.** The binding is parked pending a decision about which Jira instance is authoritative. A person records the initiative's Jira key, or that it has none yet, with `SPOCK: record the Jira key`, and the initiative document carries it |
| **Automatic stage triggering** | **Not built, and no stage starts itself.** When a stage closes, the workflow names the next stage and the agent that carries it; a person starts the stage by picking that agent, and the agent checks its preconditions then |
| **Real material** | **One of the 11 committed runs holds real ČS material**, `2026-09-digital-onboarding-dropoff`, and the others are fabricated. Real material is permitted by the owner's decision, under the conditions in `.github/registry/egress.yaml`. The real run is ČS's own research on its own products, and this repository is handed to ČS |
| **The target editor** | **GitHub Copilot in VS Code, where the workflow has run end to end.** A person picks the tool they use in `SPOCK: check my setup` (SETUP.md, step 4), which writes `.github/surface`; starting a run is refused while it reads `unset`, and a run records the surface it declared. A declared surface is a configuration value, not an observation: nothing in a run's record can show which editor produced it |

**Read the last three rows before backing anything.** They are what a pilot is for.

---

**I · THE WORKFLOW**

## 1. Scope

**Covers:** framing the problem, understanding the market, generating and choosing a direction, scoping it
to something pilotable, specifying it, and handing it to delivery.

**Does not cover:** testing the bet. No experiments, no prototypes, no customer validation. Those are
planned extensions.

**Ends at:** the initiative document. What delivery does next is governed elsewhere.

**Cannot start stage 2 without you.** The problem material is the one thing in a run that neither the
system nor a person on the project authors: research notes, transcripts, tickets, a deck. **The stage does
not start without it** and the agent stops rather than producing a partial artifact. A team with nothing
written down has nothing for this workflow to read.

**The language is the run's own, read off the brief and never inferred.** A document is written in the
language the run declared. The rule is carried in one place and mirrored rather than restated, and nothing
prevents an agent writing in another language: `C122`, on every quality gate, guards against a document
written in a language other than the one the brief declares.

**A person can also work outside a run.** The four agents that carry a stage can be invoked in free roam,
and material intake never can, because untrusted material handled outside a workflow has no gate behind it.
**Work done that way produces no run record and passes no gate**, and nothing written outside a run is
permitted to reach the durable competitor store.

---

## 2. The method

**Opportunity Solution Tree.** A brief commits to an outcome. Problems are what stands between the team and
that outcome, and they are found in material the team already holds rather than invented. Opportunities are
problems framed so that something could be done about them. Solutions are ideas bound to the opportunities
they serve, and everything downstream of a chosen solution is an artifact that narrows it.

**The order is the point.** Each stage may only read what the stages before it produced and declared, so a
solution cannot quietly rest on a problem nobody wrote down. That is what makes a run auditable two years
later, and it is why a stage refuses to start on missing inputs instead of filling the gap itself.

**The Methodology Coach answers questions about all of this and owns none of it.** It passes no gate,
writes no artifact, and a run completes without ever calling it. It answers only from a written method
canon and never from recollection, because two helpful sentences from memory are exactly what it exists to
refuse.

---

## 3. The seven stages

```
                    ┌────────────────────────────┐  A1  Initiative Brief
   Product Manager  │ 1  BRIEF                   │
                    └─────────────┬──────────────┘
                                  │   Q1 checks · G1 decides:  brief complete
                                  ▼
        you supply  ═══ A2  Problem material ═══▶ required; the stage does not start without it
                                  │
                    ┌─────────────┴──────────────┐  A2b Intake Record  [quarantined]
Opportunity Designer│ 2  PROBLEMS                │  A3  Hypotheses + trust tag
                    └─────────────┬──────────────┘  A3b Framed Opportunities
                                  │                  A4  Prioritised Opportunities
                                  │   Q2 checks · G2 decides:  opportunities confirmed
                                  ▼
                    ┌────────────────────────────┐  A5  Landscape Map
        nobody      │ 3  COMPETITIVE ANALYSIS    │  A6  Competitor Cards
                    └─────────────┬──────────────┘  A7  Competitive Synthesis
                                  │   Q3 checks · nobody decides. assets only
                                  ▼
                    ┌────────────────────────────┐  A8  Solution Set
   Product Manager  │ 4  SOLUTIONS               │
                    └─────────────┬──────────────┘  A9  Selected Solution
                                  │   Q4 checks · G4 decides:  one solution selected
                                  ▼
                    ┌────────────────────────────┐  A10 MVP Options
   Product Manager  │ 5  MVP                     │  A11 Expanded MVP
                    └─────────────┬──────────────┘
                                  │   Q5 checks · you record the option you choose,
                                  │      then G5b decides:  expansion accepted
                                  ▼
                    ┌────────────────────────────┐  A12 PRD draft
    Business Analyst│ 6  PRD                     │  A13 PRD agreed
                    └─────────────┬──────────────┘
                                  │   Q6 checks · G6 decides, Product Manager:  signed off
                                  ▼
                    ┌────────────────────────────┐  A14 Initiative document
    Business Analyst│ 7  INITIATIVE              │  A15 Jira  [parked, never produced]
                    └────────────────────────────┘
                                  │   Q7 checks · G7 decides, Product Manager:  approved for delivery


                    ┌────────────────────────────┐
any role, any time  │ METHODOLOGY COACH          │  answers method questions
                    └────────────────────────────┘  produces nothing, decides nothing
```

**This drawing is compared to the workflow contract.** `C158`, a repository check, guards against a drawing
that names an agent the contract does not bind to a stage, or leaves out an artifact a stage produces.
**The prose beside each gate is deliberately not compared**, because generating those summaries would
replace a sentence somebody wrote with one nobody did.

**Seven stages, seven quality gates and six decision gates.** Stage 3 has no human decision because it
produces assets only. Stage 5 carries two decisions: the option you choose, recorded while the stage runs,
and `G5b`, which accepts the expansion.

**No stage starts on its own.** When a stage closes, the workflow names the next stage and the agent that
carries it, and you start it by picking that agent. Stage 3 opens by setting out its two ways of working and
waits for your word to begin, or, where your market list is already in its supplied folder, by naming that list and
the task that takes it in.

**The Landscape Map and Competitor Cards reach a shared store only when a named person keeps them** with
`SPOCK: keep this run's competitors` and commits the result; an agent cannot run that task. Stage 3 writes what
it finds into the run's own documents and never into the store. The store is built from the committed example
runs and the kept runs, and no run has been kept yet, so everything in it today comes from the example runs.
**Nothing has been reused from it yet, and reuse is suspended**: stage 3's mapping skill is instructed to
research every participant it selects and to send no reuse list. Every landscape map that carries a reuse
list carries an empty one, and the runs say why: an identity key carries across runs while the research behind a card does not,
because market scope changes. The cost curve this store is built for, where the tenth initiative costs a
fraction of the first, has no observations behind it.

### 1 · Brief

| | |
|---|---|
| **Agent · skill** | Product Manager · `brief-creation` |
| **Reads** | nothing produced by the workflow |
| **Produces** | **A1 Initiative Brief** · *output* — read by stages 2 to 6, and stage 7 writes in the language it declares |
| **What happens** | The run starts here. You bring a document, a written prompt, or nothing, in which case the system asks. It runs as a conversation rather than a form and continues until the requirement list is satisfied. There is no fixed number of questions |
| **What the system does** | Works through the requirement list · states where a missing item is normally held, without fetching it · **marks anything unsupplied as unknown, with a reason** · compiles the brief once the requirements are met |
| **Checks** | **Q1**: two checks of its own and the 45 every quality gate runs. `C10` guards against a required brief field that is neither filled nor marked unknown, and `C77` against a goal that is incomplete or whose metric restates a key result |
| **Decides** | **G1** — Product Manager: brief complete enough to proceed |

> **The brief is a conversation with you in the chat.** An agent run as a sub-agent has no channel to the
> person, so the brief cannot be elicited that way.

### 2 · Problems

| | |
|---|---|
| **Agent · skill** | Opportunity Designer · `material-intake`, `hypothesis-authoring`, `opportunity-framing`, `prioritisation` |
| **Reads** | **A1**, and **A2 problem material — required, and supplied only by you** |
| **Produces** | **A2b Intake Record** · *asset*, read by authoring and nothing else · **A3 Hypothesis Set** · *asset* · **A3b Framed Opportunities** · *asset* · **A4 Prioritised Opportunities** · *output* |
| **What happens** | You supply what the team already holds. The system converts it into a standardised, evidence-backed problem list and asks where the material is unclear. You confirm it. **This is the only stage that reads text the team did not write** |
| **What the system does** | Reduces the supplied material to observations, each referencing its source and how close that source was to the event · restates the observations as standardised problems, **instructed to read the observations only and never the raw text** · derives a trust tag per problem from the evidence behind it · frames each as something that can be acted on · sorts them with you into primary, secondary and parked |
| **Checks** | **Q2**: 21 checks of its own and the 45 every quality gate runs |
| **Decides** | **G2** — one person signs. The contract names two actors, the Researcher for the evidence and the Product Manager for the scope, and the approval records one signer, so it does not require both |

**The trust tag, derived and never asserted:**

| Tag | Requires |
|---|---|
| **strong** | Two or more independent origins among the cited observations whose provenance is complete, **and at least one of them first-hand** |
| **weak** | Evidence present, and either condition fails |
| **unrated** | No references at all |

> **The quarantine boundary is the one control here a bank should care about, and only half of it is
> enforced.** The agent that runs material intake holds no search, no fetch and no terminal, and its tool
> grant enforces that, so material you supply cannot leave through it. The other half is an instruction:
> the same agent can create and edit files and run tasks, and intake is instructed to treat an instruction
> it finds in the material as words its author wrote and never to act on it.

> **Material intake is a binding of the Opportunity Designer**, because one agent runs stage 2, so
> intake's narrower capability list shares that agent's host unit. **One agent therefore reads material a
> customer wrote and also triggers tasks**, which is
> weaker than an agent with nothing in it. What bounds it is that the task runner runs only the tasks the
> workspace declares and cannot take an argument from the material, and that recording an acceptance needs
> a person to type a name. Nothing in the material can produce a recorded decision.

### 3 · Competitive Analysis

| | |
|---|---|
| **Agent · skill** | Competitive Analysis · `landscape-mapping`, `market-content-extract`, `deep-dive`, `synthesis` |
| **Reads** | **A1**, **A4**, and its skills also read **A3b** |
| **Produces** | **A5 Landscape Map** · *asset* · **A6 Competitor Cards** · *asset* · **A7 Competitive Synthesis** · *asset* |
| **What happens** | You start the stage by picking its agent. It opens by setting out its two ways of working and waits for your word to begin; where your market list is already in the run's `3-competitive-analysis/supplied/` folder, it names that list instead and asks you to run `SPOCK: what market material has been supplied`, which takes it in. With a market list, one file in the run's `3-competitive-analysis/supplied/` folder, the agent is instructed to work only from the addresses you wrote and to search for nothing else, which is not a guarantee where the search extension is installed; with the folder empty, it searches the market itself, which needs VS Code's web search extension and a search key, installed separately; without them it cannot search and works from addresses you supply. Nobody signs it off, and the next human involvement is reading the result inside stage 4. It runs against a store that outlives the run |
| **What the system does** | Maps the market's trends in three classes, business, technology and regulatory · is instructed to research every participant it selects, since reuse from the store is suspended · profiles each participant worth understanding into a card · distils the standards, patterns and trends that follow **for these opportunities** · writes each card into the run's own Competitor Cards, stamped with its research date, and a card reaches the store only if a person keeps the run's competitors |
| **Checks** | **Q3**: 22 checks of its own and the 45 every quality gate runs; among them `C76` guards against research that does not name the regime it was done under |
| **Decides** | **Nobody.** It produces assets only, so nothing stops for a sign-off |

> **This is the only stage that reaches outside, and today it is open by default, to be narrowed later.** The
> destination in force is the web search extension's provider, fetch can open any public page, and nothing
> restricts the agent to a list of hosts. A stage-3 artifact has to name the regime it researched under, and a claim
> of *approved* is refused while no endpoint is named. Fetching a page and writing a card are separate steps
> with a reduction between them, and the agent is instructed to write a card only from the reduced facts. The
> reduction step declares no tools, but the agent running it holds fetch and search, so that is a discipline
> the agent keeps rather than a control the editor applies.

> **A card is a document about a participant and not a data structure with prose attached.** The record
> keeps only the fields a gate reads and everything a person reads is a section of the body. The source
> floor a card must clear is carried by the market standards body and moves with its version, which is why
> this document names the rule and not the number.

### 4 · Solutions

| | |
|---|---|
| **Agent · skill** | Product Manager · `ideation` |
| **Reads** | **A1**, **A4**, **A7**, and the skill also reads **A3b** |
| **Produces** | **A8 Solution Set** · *asset* · **A9 Selected Solution** · *output* |
| **What happens** | Two steps need you: reading the set when it is presented, and selecting one solution with the reason for your choice, recorded as a decision before you approve. You may add a solution of your own to the set. Where someone other than you does the work, they record themselves as the stage's owner at the start |
| **What the system does** | Generates solutions, **each a different combination of opportunities rather than variants of one** · writes one file per solution and assembles them, so what each instance produced can be compared against the assembled document · binds every solution to the opportunities it solves and the market evidence behind it · answers, for each solution, every question the four regulatory area cards carry, and a script derives the touchpoints that fired |
| **Checks** | **Q4**: 20 checks of its own and the 45 every quality gate runs; among them `C103` guards against more than three solutions sharing one identical list of opportunities, and `C125` and `C126` against a compliance section that is not what its answers derive or that leaves an area out |
| **Decides** | **G4** — Product Manager: one solution selected, and it becomes the selected solution |

> **Stage 4 produces no score of any kind.** Not an axis, not a band, not a number. A weighted model would
> rest on bodies that will not be written, presenting a third of a claim as a whole one, and a band would
> compress facts the touchpoint list already carries: a second summary of the same evidence is complication
> rather than signal.

> **What that costs is stated here rather than discovered later.** With nothing scoring technical
> complexity, **a three-year build and a three-week build look the same to the workflow.** The person
> selecting at G4 is the only thing standing between those two and the numbers do not warn them. What they
> compare instead is the touchpoint list and the count on the solution itself.

> **Nine runs in the committed set keep an `A8b` Solution Scores document** and two keep an `A8c` compliance screen.
> Both artifacts are retired. They stay declared so the checks that always graded them still can, because a
> demand removed must not be able to fail a run that met it.

### 5 · MVP

| | |
|---|---|
| **Agent · skill** | Product Manager · `mvp-option-design`, `mvp-expansion` |
| **Reads** | **A9**, **A8**, **A7** and **A1**, for its time horizon, and the expansion reads **A10**, **A9** and **A3b** |
| **Produces** | **A10 MVP Options** · *asset* · **A11 Expanded MVP** · *output* |
| **What happens** | One stage with two halves and two decisions. The first half offers options that scope the selected solution to something pilotable; the second expands the one you chose into a defined MVP |
| **What the system does** | Offers options that differ on how the solution is built rather than on which solution it is, **each stating how it differs from the others** · after you choose, expands the selected option into scope, boundaries and what is deliberately out |
| **Checks** | **Q5**: 11 checks of its own and the 45 every quality gate runs; among them `C58` guards against an option set that does not say how each option differs, or that arrives with one already preferred |
| **Decides** | **Your choice, then G5b.** You record the option you choose as a decision while the stage runs, and **G5b** accepts the expansion before the PRD is built on it |

> **Two options that overlap heavily are the honest shape of this choice.** Stage 4 picks between solutions
> and discards the rest; stage 5 picks how to build one solution, so the distinctness rule that governs the
> solution set deliberately does not apply here.

### 6 · PRD

| | |
|---|---|
| **Agent · skill** | Business Analyst · `prd` |
| **Reads** | **A11**, **A1**, **A4**, and the skill also reads **A3b** |
| **Produces** | **A12 PRD draft** · *asset* · **A13 PRD agreed** · *output* |
| **What happens** | The draft is written against a fixed eight-section template. **The agreed PRD is a different artifact, not a status on the same one**: it carries an agreement block naming who agreed and when, and the gates of stages 6 and 7 hold that block to the agreement the run record holds (`C13`) |
| **What the system does** | Writes each section against the template · states which measure each requirement serves · **carries an alignment validation statement**, so a requirement that serves no stated measure is visible rather than assumed · assembles the agreed version from the mark a person made, rather than before it |
| **Checks** | **Q6**: 11 checks of its own and the 45 every quality gate runs; among them `C31` guards against a PRD with no alignment statement, and `C13` against an agreement block the run record does not corroborate |
| **Decides** | **G6** — Product Manager: PRD agreed, and the name and date are written |

### 7 · Initiative

| | |
|---|---|
| **Agent · skill** | Business Analyst · `initiative-authoring`, `initiative-propagation` |
| **Reads** | **A13**, the language **A1** declares, and the Jira key a person recorded on the run |
| **Produces** | **A14 Initiative document** · *output* · **A15 Jira initiative** · *asset* — **parked, and no run has produced one** |
| **What happens** | The initiative is written against a thirteen-section template owned by Česká spořitelna's Product Management Guild, not by this project. It is the document ČS actually receives |
| **What the system does** | Writes the thirteen sections from the agreed PRD **in the language the run declared** · **invents no identifier**: where a Jira key is recorded with `SPOCK: record the Jira key` it takes the key, and where the record reads none yet it says so |
| **Checks** | **Q7**: seven checks of its own and the 45 every quality gate runs; among them `C16` guards against an initiative that leaves a template section unaddressed, or, on a run started on 1.10 or later, carries an id that is not the recorded Jira key |
| **Decides** | **G7** — Product Manager: initiative approved as a delivery item |

> **A15 has never run and is not best-effort.** The propagation binding is parked because the authoritative
> Jira instance for ČS has not been decided. *Best effort* would mean attempted and possibly failing; the
> state is not attempted and not connected, and every complete run is excused from producing it by name.

---

## 4. Who decides, and what they are deciding

**Six decision gates, and the contract carries all six by name.** Stage 5's option is chosen as a recorded
decision rather than at a gate, because a gate needs the stage in review and the expansion cannot be written
until the option is chosen.

| Gate | Stage | Who | What they decide |
|---|---|---|---|
| **G1** | 1 | Product Manager | brief complete enough to proceed |
| **G2** | 2 | **one signer**; the contract names the Researcher and the Product Manager | is each opportunity well formed and correctly evidenced · which opportunities does this run pursue |
| — | 3 | nobody | assets only, nothing stops for a sign-off |
| **G4** | 4 | Product Manager | one solution selected, and it becomes the selected solution |
| — | 5 | Product Manager | one MVP option chosen, recorded as a decision while the stage runs |
| **G5b** | 5 | Product Manager | expansion accepted before the PRD is built on it |
| **G6** | 6 | Product Manager | PRD agreed, and the name and date are written |
| **G7** | 7 | Product Manager | initiative approved as a delivery item |

**A decision is a person writing who decided, when, and what they chose. No agent records a human
decision**, and the record carries `by_agent: false` on
every entry to make that checkable rather than assumed.

**A name without a role cannot say what somebody was accountable for.** Both are required on every approval,
because accountability needs both the person and the role. **A stage is attributed to whoever signs it off,
unless someone else was recorded as its owner first** with `SPOCK: record who owns this stage`, since a gate
signature and the ownership of the stage can be claims about different people.

**A person can sign off a check the run cannot meet.** Once every check the gate failed is signed, the stage
moves on to review, where its decision gate is still signed as usual, and the record keeps the gate result as
failed with the signed exception beside it; stage 3, which has no decision gate, is accepted. That combination
is deliberate: an exception that made a gate go green would erase the thing it was granted against. **Some
checks can never be signed**, the ones that keep the record itself honest, and `NEVER_SIGNABLE` in
`.github/scripts/gates.mjs` lists them.

**Taking something back is a workflow act.** A stage can be withdrawn, and a retracted stage carries no
agreement for a document being withdrawn, because otherwise a run that changed its mind has no exit and the
next one inherits a decision nobody still holds.

**Rework is counted by the build at every gate.** When a stage's documents changed since its previous gate,
the run records a round of rework, whoever changed them. A reason exists only where a person sent a stage
back, because that task asks for one. `node .github/scripts/metrics.mjs` reads both.

---

**II · WHAT IT PRODUCES**

## 5. Every artifact and record

### An artifact is two files

**An artifact is a record and a document, not one file.** One or more **records** under
`records/`, each being what a single invocation produced and carrying every field a check decides. One
**document** assembled from them, which is what a person reads and what carries the decision.

**Why it matters to you:** a machine record on top of every document stands between a reader and the
finding, and a person at a decision gate would meet a coverage table before they met a finding. Splitting the
two means the document can be written for a reader without losing anything a check needs. **It also means
the assembly step can be checked**: what each instance produced is on disk beside what was assembled from it,
so a join that quietly rewrote its inputs is visible.

### Documents

| # | Artifact | Class | From | Used by |
|---|---|---|---|---|
| A1 | Initiative Brief | **output** | Stage 1 | Stages 2, 3, 4, 6 |
| A2 | *Problem material* | *supplied, not produced* | **You** | Stage 2 |
| A2b | Intake Record | asset | Stage 2 | Authoring only. Nothing else may read it |
| A3 | Hypothesis Set | asset | Stage 2 | Framing |
| A3b | Framed Opportunities | asset | Stage 2 | Prioritisation · stages 3, 4, 5, 6 |
| A4 | Prioritised Opportunities | **output** | Stage 2 | Stages 3, 4, 6 |
| A5 | Landscape Map | asset | Stage 3 | Deep dive · the store, once a person keeps it |
| A6 | Competitor Cards | asset | Stage 3 | Synthesis · the store, once a person keeps it |
| A7 | Competitive Synthesis | asset | Stage 3 | Stages 4, 5 |
| A8 | Solution Set | asset | Stage 4 | The selection decision, and stage 5 |
| A9 | Selected Solution | **output** | Stage 4 | Stage 5 |
| A10 | MVP Options | asset | Stage 5 | Your choice of option, and the expansion |
| A11 | Expanded MVP | **output** | Stage 5 | Stage 6 |
| A12 | PRD draft | asset | Stage 6 | The agreement mark, which writes the agreed PRD from it |
| A13 | PRD agreed | **output** | Stage 6 | Stage 7 |
| A14 | Initiative document | **output** | Stage 7 | Delivery |
| A15 | Jira initiative | asset | Stage 7 | **Parked. Never produced** |
| — | Competitor Store | asset, **outlives the run** | The example runs, and runs a person keeps | Stage 3 of every later run |

**Three more codes are declared and none is produced by a current stage.** `A1b` and `A8c` are the retired
compliance screens and `A8b` the retired solution scores, and they survive only on the runs that produced
them. The
authoritative list is the build's own: `node .github/scripts/facts.mjs` and
[CONTENT-REGISTER.md](./CONTENT-REGISTER.md).

**There are two classes and the gate derives from the class**, which is the contract's own rule and a
check enforces it. **An `output` is front-facing and carries a decision gate**, one of `G1` to `G7`. **An
`asset` is a work product on the way to an output**, or a propagation after one, and carries a quality gate
or none. A third value, `—`, marks the one artifact no step produces.

| Class | Carries | Must a person engage |
|---|---|---|
| **Output** | **a decision gate** | **Yes**, review and approve |
| **Asset** | a quality gate, or none | No |

**The derivation runs one way and it is checked.** Declare an artifact an output and it must carry a
decision gate; declare it an asset and it must not. **That is why stage 3 has no sign-off**: all three of
its artifacts are assets, and giving one a decision gate means changing its class in the register first.

**Every artifact is governed, including the ones nobody has to read.** Both classes carry what produced
them, under which version of which body, what they could not establish, and what they are assembled
from.

### Records

Separate from documents, and written as the work happens.

| Record | Written | What it is for |
|---|---|---|
| **Run record** | Once per run, updated at every stage | Which stage the run is on, which know-how each stage read and at which version, who owned each stage, what it declared it could not read, every gate result, and the rounds of rework the build saw between gates |
| **Production record** | Every time a skill runs | What that invocation read, produced and could not establish, and which bounds it hit |
| **Decision record** | Every sign-off | Who decided, in which role, when, and what they chose |
| **Refusal record** *(specified, not built)* | Every time the system refuses | A blocked step, stale evidence it declined to pass, an instruction it rejected |

**The refusal record is designed and not built.** Without it a run that stopped looks the same as one
nobody started, and a control that blocked something looks the same as one that was never tested. A blocked
precondition is deliberately not persisted today, so this is a known gap rather than a working control, and
the composed-behaviour floor marks the rule it belongs to, `B9`, as declared rather than checked.

### Why the assets exist

They look like internal bookkeeping. They are what lets the system improve, survive a change of staff, and
still be defensible in two years.

| Purpose | Example | Why it matters |
|---|---|---|
| **Continuity** | Run state: where an initiative has got to | Work survives a three-week pause and a change of person, without anyone needing to remember it |
| **Improvement** | Records read back as measurements | The pilot's own performance is read off the run records rather than counted by hand |
| **Maintenance** | A record of what produced each output, under which version of which body | Answers "what produced this, and does it still hold?" two years later |

**Stopping a run in progress is recorded, not implied.** `SPOCK: stop this run` writes who stopped it, when, and
which of four reasons. A stopped run keeps its artifacts and is no longer counted among
the open runs.

**Effort bounds are declared on each skill, as `bounds:` in `.github/registry/skills.yaml`, and this substrate
does not stop an agent at one.** The skill is instructed to stop at its bound and list what it reached in
`bounds_hit` on its record; where a bound is a count on the artifact, such as how many solutions stage 4
generates, a check reads it.

---

**III · HOW IT IS GOVERNED**

## 6. What the checks do, and what they do not

**Every gate runs its mechanical half in full**: its own checks and the ones every gate runs, out of 121
registered checks, every one of which has been observed both passing and failing against a suite of
deliberately broken cases. That is a real control and it is what a green gate means. Checks on the
repository rather than on a run are separate: `node .github/scripts/repo-check.mjs` runs them, at no gate.

**No automated judge runs the judged half of any gate; the person who signs a gate may answer it.** 29 judged
rules across the workflow need a reader rather than a program, and no independent checker is configured,
because every binding in this pilot pins one model family and a checker from the same family is the producer
agreeing with itself. The person who signs may answer each rule yes, no or cannot tell, and skipping it holds
nothing up. **The build reports this on every gate rather than leaving it implied.** A pass is a pass of the
mechanical half.

**A gate returns `pass`, `fail` or `incomplete`, and it reports which half of itself ran.** `incomplete`
means the gate names a check nobody has written yet, so nothing failed and the stage is still not known to
be well formed. **Treating an `incomplete` as a pass is the mistake this repository exists to prevent.**
Every registered check is written, so no gate returns `incomplete` on its mechanical half today.

**A check reports the size of what it examined alongside its verdict**, because a check that examined
nothing would otherwise report the same word as one that examined everything.

**The finished initiative is checked as well as each step.** A stage can pass its own gate and still produce
something the next stage cannot use, so `C12`, on the gates of stages 5 to 7, guards against an expanded MVP or
an initiative whose chain back through the agreed PRD and the selected solution to the opportunities does not
resolve.

**Every artifact is a file in the repository, and every generated surface is checked against its source.** A
run's front door, its reading copies, the field carrier every producer copies from, the check register, this
document's stage diagram and the know-how bodies are all generated or compared, and each has a check that
fails the build when the copy and the source disagree. **A count typed beside the thing it counts is a copy
that ages on its own clock.**

**What this does not give you.** Version history of a document's content is git's, not the workflow's, and
there is no approval workflow beyond a few tasks. The person types their name and role into
`SPOCK: approve what is in front of me`, and the workflow runs the gate again where a document changed,
writes the decision block and accepts the stage. Some stages need a person's act first: at stage 4 the
choice is recorded with `SPOCK: record a decision I made` before approval, as stage 5's option is, and at
stage 6 the draft is marked agreed with `SPOCK: mark the PRD agreed`. Approving takes no command.

---

## 7. Compliance

**Four area cards exist, and three of them were written by this project rather than by the bank.** That
marking is the most important sentence in this section.

### What exists

**Four regulatory areas, one knowledge body each, and one mechanism that reads them.** The areas are
Compliance and conduct and product regulation, GDPR and privacy, Legal and contracts, and ICT and security.
Between them they carry 49 sub-domains, 55 triggers and 128 touchpoints. The signpost is
[REGMAP.md](./REGMAP.md), generated from a registry, and `C119`, a repository check, guards against a
hand-edited copy and against registry joins that have quietly broken.

**One screening mechanism, read by four skills.** The Compliance Guidelines body says how a
description is screened against the four areas, what the screen may and may not say, when an escalation flag
fires, and what a producer must do with the result. **It carries no area's content.** `ideation`,
`mvp-option-design`, `mvp-expansion` and `prd` read it.

**For every solution, the producer answers the closed question on every touchpoint of the four cards, and a
script derives what fired.** The derive task refuses an unanswered question and writes the fired touchpoints in
the card's own words with their count, the escalation triggers that fired, and the questions nobody could
settle, each naming the input that would settle it. `C125` and `C126`, on stage 4's gate, guard against a
section that is not what its answers derive or that leaves an area out. **An escalation trigger fires only
where its card names a sub-domain the answers left unresolved**; the others are not evaluated
([COMPLIANCE-REQUIREMENTS.md](./COMPLIANCE-REQUIREMENTS.md) §12). Whether an answer
is right is a judged question: no automated judge runs it, and the person who signs the gate may answer it.

**The legal reading behind the cards is separate and no skill declares it.** The area bodies carry
obligations in operational terms and cite the instrument; the dossiers under
[regulatory-research/](./regulatory-research/) carry the statutory reading. A regime summary written by us
and read by a producer as authority is what that split exists to prevent.

### What this is not

**Three of the four area cards are ours and unreviewed.** One was transcribed from a card ČS supplied, and
even that one is marked unconfirmed because no named person at the bank has signed it.
**A Czech run's compliance sections quote the pilot team's Czech of all four cards**, ČS's own
Compliance card included.

**The producer answers the questions and no check verifies the answers.** A producer that answers *no*
where the honest answer is *yes* passes, and nothing catches it, so the screen must not be read as an
independent control.

**Nothing in a score reflects compliance, because there is no score.** Stage 4 has no regulatory band. What
a person compares at G4 is the touchpoint list itself and the count on the solution, which is more
discriminating than a band and is also not a number they can sort by.

### The boundary, which the build does honour

**The system does not make the compliance judgement.** That stays with the compliance teams. What the system
is responsible for is that every question is answered, that what fired is derived from the answers, and that
the material arrives in a reviewable state. It is not responsible for the answers being right, and nothing in
the build establishes that they are.

### The controls a risk reader would actually recognise

**They are at stages 2 and 3.** At the stage 2 quarantine boundary, customer material you supply reaches an
agent that holds no search, no fetch and no terminal, so it cannot leave through that agent; that an
instruction inside it is never acted on is the agent's instruction, because the agent can edit files and run
tasks. Stage 3 egress is open by default today and nothing restricts the agent to a list of hosts, and an
artifact that reached outward has to name the regime it did so under, which `C76` checks.
**The mechanical half of each runs on every run, and neither is part of the touchpoint mechanism.**

---

## 8. The words this build uses

| Word | What it means here |
|---|---|
| **Run** | One initiative moving through the seven stages. Everything it produces lives under one folder named for it |
| **Stage** | One of the seven. It has an agent, skills, inputs it declares, artifacts it produces, a quality gate and usually a human decision |
| **Artifact** | A document a stage produces, plus the records behind it. Every one is classed output or asset |
| **Output** | An artifact a person must review and approve, and it carries a decision gate. An asset needs no sign-off |
| **Agent** | The identity a person talks to. Six of them: four carry the stages, and the Methodology Coach and Workflow Support carry none. Each has an agent file that grants it only the tools it is registered for |
| **Skill** | A written procedure an agent runs. A stage runs one or several |
| **Know-how** | A body of knowledge a skill reads and never writes. It changes through a human-owned process outside any run |
| **Quality gate** | `Q1` to `Q7`. The automated checks on a stage's output, run independently of the producer |
| **Decision gate** | `G1`, `G2`, `G4`, `G5b`, `G6` and `G7`. A person deciding, with their name and the date |
| **Check** | One registered rule a program can decide. There are 121 registered checks |
| **Judged rule** | A rule no program can decide, needing a reader. There are 29 judged rules; no automated judge runs them, and the person who signs a gate may answer them |
| **Trust tag** | strong, weak or unrated, derived from the evidence behind a problem and never asserted by the producer |
| **Quarantine** | The boundary at stage 2. Material you supply reaches an agent with no search, fetch or terminal, so it cannot leave through that agent; that an instruction inside it is not acted on is an instruction to the agent |
| **Touchpoint** | One place where a described solution meets a regulatory obligation. 128 of them across four areas |
| **The store** | The competitor profiles built from the example runs and the runs a person keeps, meant to be reused by later runs; stage 3's reuse from it is suspended |

---

## What this document is not

**It is not the specification.** [PILOT-BUSINESS-LOGIC.md](./PILOT-BUSINESS-LOGIC.md) is the contract. This is
the same design in readable form. Both describe the build, and where either disagrees with the build, that
document is the defect.

**It is not the onboarding.** The [tester guide](./onboarding/TESTER-GUIDE.md) is written on top of this
document. This page is the account of the workflow the guide shares, so that the two cannot come to describe
seven stages two different ways.

**It is not enough to build a stage from.** [stage-specs/](./stage-specs/) holds one document per stage in
the detail a builder needs.

**It is not evidence that the workflow does what a bank needs.** There are 12 committed runs, two of them on
real ČS material, and no automated judge has read any of them. **What a pilot is for is finding that out**,
and the rows in section 0 are the list of what it has not yet found out.
