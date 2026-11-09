# Stage 1 — specification

**2 October 2026** · **Release:** 1.14

**This describes the stage that exists, not the stage that was designed.** Every rule in parts 1 to 11 is
read off the build — the skill file, the workflow contract, the gate model, the field spec or a bound
know-how body — and where the build does not yet do something the stage needs, the part it belongs to says
so, with the reason, and part 12 lists where. **A spec that describes an intended stage is how a reader comes
to believe a thing runs.**

**Parent contract:** [PILOT-BUSINESS-LOGIC.md](../PILOT-BUSINESS-LOGIC.md). **Both describe the latest
release, and where either disagrees with the build, that document is the defect.**

**Written from the runs, not from the rules**, because a producer can carry the body that defines a shape
and still write another. The run record behind this document is a live run not included in this release. **The
findings and journals behind it are not copied here**, because a decision's working is not part of what
ships.

---

# Part 1 · Purpose and scope

## 1.1 What the stage is for

**Stage 1 commits the run to an outcome, and everything downstream reads that commitment rather than
re-deriving it.** The brief is the only artifact in the workflow with no upstream artifact behind it:
the contract's `requires:` is empty for this step and for no other.

**It is a conversation, not a form.** The skill's pattern is `elicitation-dialogue`. It works through a
requirement list, asks for what it does not have, and continues until the list is satisfied or the person
stops. **There is no fixed number of questions**, and the cap that exists is a stop rather than a target:
40 elicitation exchanges, because a lower cap is fewer exchanges than a real stage 1 takes to go well.

**What it commits to.** An outcome stated as a change in customer behaviour, who it is for, why now, what
success looks like, and what is in and out of scope. `method-canon` §4.1 owns what a brief is for and §9
carries the eight ways an outcome is stated badly.

## 1.2 Why it sits here

**Nothing else can start.** Stage 2 reads `A1` and the problem material together; stages 3, 4 and 7 all
read `A1` directly. A run with no brief has no outcome for a problem to stand in the way of, which is the
first relation the opportunity solution tree asserts.

**It is also where a guessed number first becomes indistinguishable from a sourced one**, which is why
`evidence-standards` is bound here and not only downstream. A north star figure the person half-remembered
and a north star figure off the strategy deck read identically on the page unless the stage marks the
difference at the moment it is given.

## 1.3 What the stage does not do

| | |
|---|---|
| **It does not infer a field** | An unsupplied field is marked `unknown` with a reason. This is the stage's single hardest rule and the one the workflow is most often judged on |
| **It does not read source systems** | It may say where a missing item is normally held. It does not fetch it |
| **It does not screen for regulation** | **The stage has no screening step.** A product manager cannot say whether an idea engages a regime before the idea exists, so the screen's honest answer to most of what it examined was `cannot determine`. The same work runs per solution at stage 4, where there is something concrete for an area's triggers to fire against. `A1b` is retired and two runs in the committed set keep theirs |
| **It does not approve its own output** | `Q1` is run by `check.mjs` independently of the producer, and `G1` is a person |
| **It does not start a second run** | Where one is in progress it reports its position and hands to the stage that is due |

## 1.4 What good looks like

**The brief carries the §3 section set under those exact names**, closes with `What we could not establish`
and `How this was produced`, states the outcome as a change in customer behaviour rather than as a thing to
build, links every goal to a key result the Strategy Basis declares, and marks each gap with both the reason
and a record that the person was asked.

**A brief with four fields marked unknown and a reason against each is a good brief.** The stage is not
graded on completeness: a field the person gives and a field marked unknown with its reason are both an
answer (`C10`), and the whole design intent is that a marked gap travels rather than being quietly filled.

## 1.5 What poor looks like, measured

**A brief written as flowing prose is the reference case, and it fails three checks at once.**

| | |
|---|---|
| `Q1` | **fail** |
| Failed on | `C98`, `C100`, `C163`: written as prose, the brief has none of the sections a brief carries and no record that the person was asked about its gaps |

**The cause is usually not stage 1's.** A producer follows a worked example over the rule above it. Where the
two disagree the example wins, and the stage inherits it.

## 1.6 The producer's exit from a refusal

**The gate says what passes after every failure.** Each check's passing shape is declared in
`.github/registry/shapes.yaml`, and the checker prints it under the failure, with what to do: the producer's own
next step, or, where only a person can clear it, the one task to run. **`stage-1-shapes.md` is still bound**,
keyed on the gate message, giving the message, the shape that produced it and the shape that passes, and
`.github/COVERAGE-CHECKS.md` carries one card per check saying what it checks, so the producer does not read
`check.mjs` to learn what a check wants. `SPOCK: explain what the gate failed` gives a person the same, check by
check, and records nothing. The producer holds no search tool.

---

# Part 2 · Inputs

## 2.1 What it reads

**No artifact the workflow produced.** The contract's step says `requires: []`, alone among the seven steps,
and the skill's registry entry declares no input either. The skill page names the dialogue, any document the
person supplies, and its know-how bodies; its text adds the run record's `person` (`R3.1.2`) and
`.github/runs-root`, read for the runs directory before anything is written.

| Input | Required | Where it comes from |
|---|---|---|
| **User dialogue** | yes | The conversation itself. It is the stage's primary input and not a fallback |
| **The run record's `person`** | yes, on a run started with the task | The name and role the person typed into `SPOCK: start a run`. The brief's accountable person is that name; where the record carries none, the run started before the task recorded one, and the producer asks |
| **A document the person supplies or attaches** | no | Read at step 0 where one is given, attached or named inside the project. A document named outside the project is never opened: the producer asks for it to be attached or put in the project. A run may open with a deck, a prompt or nothing |

**Where nothing at all is supplied, the stage writes no brief.** There is
nothing to record, and a brief written from nothing would be the inference this stage exists to refuse.

**Where the person wants to skip, it is written with everything `declined`** and the stage says plainly
what that costs downstream. It does not refuse. A refusal and a fully-declined brief are different records
and a reader can act on the second.

## 2.2 The know-how its producer holds

**Nine bodies, and the binding dates are part of the specification**, because the know-how a stage records is
read against them (`C62`).

| Body | What it is for here | Bound |
|---|---|---|
| `product/brief-fields.md` | The field set itself | from the start |
| `method/method-canon.md` | **§4.1 what a brief is for; §9 the eight ways an outcome is stated badly** | 2026-08-31 |
| `method/evidence-standards.md` | What counts as evidence, so a guessed number is marked as one | 2026-08-31 |
| `product/strategy-basis.md` | The key-result list only, which a goal's key result comes from (`C77`) | from the start |
| `writing/agent-interaction.md` | The manner of the conversation | 2026-08-31 |
| `writing/input-elicitation.md` | **The substance: what to ask, and how to tell a good answer from a thin one** | 2026-09-09 |
| `writing/output-voice.md` | How the finished brief reads | from the start |
| `writing/documentation-standards.md` | §3, the section set the document must carry | from the start |
| `product/stage-1-shapes.md` | **Opened when a gate refuses something written: the message, the shape that caused it, the shape that passes** | 2026-09-11 |

**The method bindings are the ones worth understanding.** A method declared only by `methodology-guidance`,
which owns no stage and which a run completes without ever calling, reaches no producer: **the agent that
holds the method produces nothing, and the agents that produce would hold a field set and a style guide.**
That is why `brief-creation` binds the method itself.

## 2.3 What happens when an input is absent

| Absence | What the stage does |
|---|---|
| **A field the person does not have** | Marked `unknown` with a reason, and the stage states where such an item is normally held without fetching it |
| **A field the person declines** | Marked `declined`. Distinct from unknown, because one is a gap and the other is a decision |
| **The whole brief** | No brief, and nothing to record |
| **An elicitation bound reached** | The agent is instructed to write what exists, mark the rest unknown, name the gaps, and record the bound in `bounds_hit[]`. **Silent truncation is the failure the bound prevents**, and no check reads whether a bound reached was recorded |

**A gap is not free.** The agent records that it asked the person before it records their silence (`C163`).
Without that, *unknown* and *never raised* are
the same word on the page, and the second is the stage failing rather than the person.

## 2.4 What a stale input does to this stage

**Nothing upstream can go stale, because nothing is upstream.** The staleness runs the other way: sending
stage 1 back, or re-running it, marks every later stage that holds a gate result or an acceptance **stale**,
whatever changed, and that is the only route by which a stage 1 change reaches a finished stage 6. A later
stage still being written is left with its agent.

---

# Part 3 · The steps

**Eight steps, numbered 0 to 6 and 8, and the numbering is the skill's own.** Step 0 runs first despite its
number, because a person who handed over a document should not be asked what is in it. **One question comes
before both: the language** (`R3.1.3`).

**The run exists before the conversation starts.** The person runs `SPOCK: start a run` with three boxes: the
run id, their name and the role they decide in. It creates the run's tree, its record and its front page, and
records the person once, so every later role box left empty takes that role for that name.

### Step 0 — Read what they gave you, before asking anything

**People arrive one of three ways: they tell you, they hand over documents, or both, and the third is the
most common.**

**R3.0.1 — A document is interrogated, not transcribed.** Extracting values into fields is what a form
does. The reading is a product reading: is the outcome an outcome or a thing to build, does the metric
move with the goal, is the segment specific enough to search a market against, does the link name a
mechanism or assert one.

**R3.0.2 — Open by naming what is weak or missing, never by confirming receipt.** They wrote it and they
know what is in it. *I have the segment, the outcome and two of the four goal parts. The outcome reads as
a feature rather than a change in behaviour, and there is no measure* is the shape.

**R3.0.3 — What the document says is theirs; what the producer concludes from it is not.** A value written
in their document is user-supplied. A value derived because the document implied it is an inference and is
forbidden. It goes to them as a proposal.

**R3.0.4 — Say where each field came from.** Their document, the conversation, or still missing. **A person
cannot correct what they cannot see was assumed.**

### Step 1 — Ask the language first, then open on the problem space

**R3.1.1 — Ask what problem or idea space to address.** Not *what is the topic* and not *what product is
this about*. **A question naming a product invites a product**, and a run that opens with a solution has
spent the three stages meant to find one.

**R3.1.2 — The accountable person is the one the run record names.** Their name and role are on the record
under `person`, typed into `SPOCK: start a run`. **Only where the record carries no `person`**, a run started
before the task recorded one, does the producer ask who they are, by name and role. **A run whose accountable
person is a role rather than a name is a run nobody at the bank is answerable for.**

**R3.1.3 — `language` is `cs` or `en`, assigned here, never reassigned, and it is the first question.** It
is asked as a closed choice, in the language the person is writing in, in fixed words the skill gives in Czech
and in English, saying that the documents and the conversation both follow it. Every document the run produces
is written in it, and every agent speaks it from the answer on, at every later stage. Where the person does not
say, **write `cs` and tell them you did**. That is a declared
default and not an inference: the value is stated, the defaulting is stated, and they can change it in the
same reply. **It never enters `unknowns[]`**, because a run with no language cannot be produced and
*unknown* is not a state it has.

**R3.1.4 — Only the document body follows the language.** Field names, ids and record values stay English
on every run, which is what lets a Czech run and an English run pass the same gates.

**R3.1.5 — Ask who they already know is in this market and write the names down.** `known_competitors[]`
takes names or links. **Empty is an ordinary answer** and goes to `unknowns[]` like any other. Do not
research it and do not fill it from the topic. Stage 3 starts from this list and, where it searches the
market, finds the rest.

### Step 2 — Work the outcome

**The hardest field and the most consequential: it is the root of the tree.** Most first answers are
solutions.

**R3.2.1 — Where the answer is a solution, propose an outcome phrasing and ask for confirmation.**
Confirmed stores it with `outcome_restatement: confirmed`. Declined **keeps the user's wording**, marks
`declined`, and retains the proposal in `restatement_proposed`.

**R3.2.2 — At most two attempts at proposing a rewrite of their words.** A third is arguing. **An agent
that rewrites a user's outcome has inferred the most important field in the run, and `Q1` cannot detect
it**, because the field is present and well formed.

**R3.2.3 — Helping them phrase it when they ask is neither an attempt nor capped.** Pressing a wording on
someone who has answered and composing with someone who asked are two different acts at two different
moments.

### Step 3 — Bounding fields

`customer_segment`, then `market_scope`. These stop later stages running wide, and **`market_scope` bounds
a stage no person reviews**, which is stage 3.

### Step 4 — Goals, and this is the field the stage is judged on

**R3.4.1 — A goal is four things or it is not a goal** (`C77`): the **product goal**, which is the
product's **North Star** and what this run is accountable for, the **metric** that tracks it, the **key
result** from Strategy Basis §2 it feeds, and the **written link** saying how one moves the other. The field
set still declares `north_star` beside `product_goal`: older briefs carry it as a level above the product
goal, and a brief written now leaves it out.

**R3.4.2 — Ask the product goal first and ask it once.** It is one level: the producer never asks a North
Star and then a product goal as two questions. Where the person has none, that is an answer: recorded unknown
with the reason and who would normally hold it. **Never write one for them.** An outcome composed by the
producer is an anchor, and every later stage generates against it.

**R3.4.3 — The key result is looked up and never chosen.** Strategy Basis §2 carries twenty-five, each with
an identifier. **This is the only lookup in the stage.** The producer **shows all twenty-five, grouped by
their objective**, with the identifier, the words, the direction and the type as the Strategy Basis writes
them, says which two or three it would look at first and why, and never narrows the list to its own
shortlist, because the nearest by topic is often not the one a person picks. Then the person picks.

**R3.4.4 — This is the one step where elaboration is the default.** Everywhere else the producer helps when
asked. Here it leads with the reasoning unasked, because **a person meeting this workflow for the first
time does not know that asking would produce any of it.**

**R3.4.5 — Every offer names more than one, and none contradicts an answer already given.** A person who has
not seen the list cannot supply a second option, and an offer that contradicts an earlier answer asks them to
decide it again. **Check a candidate against the record before offering it.**

**R3.4.6 — A view is not an inference, and recording a choice they did not make is.** A person who asks
which option is closest is owed a view, stated plainly rather than disclaimed in the same breath.

**R3.4.7 — Never write the link.** It is the one field where a plausible sentence is indistinguishable from
a real mechanism. **If the person cannot state the link, the goal is incomplete** and `goals` is marked
unknown with a reason rather than shipping three of four parts. **A partial goal reads downstream as a
supplied one.**

**R3.4.8 — A product's own metric can never be a company key result.** ČS's rule. *More clients served
digitally* is the bank's measure, not this run's. Ask what **this** run would move that leads to it.

**R3.4.9 — A key result the person names is read back before it is recorded.** The agent is told to find the
identifier in the Strategy Basis and say its row in the run's language: the identifier, the words, the
direction, the type and the section; where the direction or the type they gave differs from the row, to say
both and let them decide. A direction, type or section they cite is written into `key_result` after the
identifier in the basis's own English words (`C77`).

**R3.4.10 — Love Brand has a goal and no key result to name.** It carries no objective and no key results by
design (Strategy Basis §2.1). The agent is told to record `key_result: unavailable` on the goal and
`strategy_basis:` saying so at the top level of the brief's record (`C77`), and never to mark
`goals` unknown for it.

**R3.4.11 — A key result the basis does not hold is recorded in the person's own words.** The agent is told to
say the basis does not hold it, cite the basis's version and the key results under their objective, and, where
their words may mean a vision metric or KPI §2.1 leaves out on purpose, ask which; where it is their own, to
write `strategy_basis:` naming it as the person's own key result, in their words, with their name and the date,
and `key_result: unavailable` on the goal. **It is told never to record a stand-in the person did not choose**;
no check can tell a stand-in from a choice.

### Step 5 — Context

Background, related runs, constraints, timing. All optional and all cheap to skip. **`related_runs[]` is
offered, never searched**, and the producer may say earlier runs on the topic exist without deciding that
they are related.

### Step 6 — The run identifier

**R3.6.1 — `{year}-{month}-{slug}`**: the year, the month and a short name, in lower case, as the task's first
box asks. Never reassigned.

**R3.6.2 — The person types it, and the producer never assigns or changes it.** `SPOCK: start a run`
asks for the run id in its first box (*the year, the month and a short name, in lower case*) and creates the
run under it. Where no run has been started, the producer is told to name that task and its three boxes and to
leave every box to the person.

**R3.6.3 — A name a run already has is refused.** `run-state.mjs` refuses a run id whose folder exists rather
than writing into the run it finds.

**R3.6.4 — The `{year}-{month}-` prefix is not cosmetic.** Every script enumerating committed runs filters
on it, so a run named outside the shape is refused by nothing and skipped by everything. The repository check
names such a run (`C95`), so it is renamed rather than lost.

### Step 8 — Write, check, move the run, and only then ask anybody anything

**R3.8.1 — The order is write, check, move, ask.** State what was produced and what could not be resolved,
run `SPOCK: check what is written, then continue`, read the result back in the same turn from
`.github/last-task.md`, to the end, and fix what it finds **before anyone is asked to look**.

**R3.8.2 — The person is asked after the quality gate has run, never before it.** **A stage that fails its
quality gate is not put to a person for a decision**, so an acceptance requested before the gate is a question
with nothing behind it. Where a failure goes is the same at every gate, and depends on what failed:

| What failed | Where the driver sends it |
|---|---|
| **Anything the producer can change** | Back to the producer, and the person is asked nothing until the gate passes |
| **Only checks about stages already accepted** | Not to the producer, because nothing written at the current stage changes a signed document. The driver names the sign-off below, or, where one of those checks can never be signed, says that nothing on the run gets past it |
| **Both kinds** | Back to the producer, and the driver names which failures about accepted stages can be signed once the rest passes |
| **At stage 6, a missing or unsigned agreement mark** | To the person, who runs `SPOCK: mark the PRD agreed`, because no producer may supply the mark |

**The one way past a failure the run cannot meet is a person's signature.** The person runs `SPOCK: sign off a
check this run cannot meet` with six boxes: the checks, one reason why they cannot be met, what was decided,
their name, their role, and whether the failure points to the workflow or to the material. **Once the gate has
recorded a failing list, it takes only checks on that list**, and its refusal names the checks the gate
recorded. **Before the
gate has run, it takes any check that can be signed at all**: signing first is a legal route, the stage stays
`produced` and moves on from there, and the signature carries the stage past the gate only if it names every
check the gate then records as failing. The stage moves on: to
its decision where it has one, or to accepted where `Q3` is its whole acceptance. **The gate result stays
`fail` on the record**, with the signed exception recorded beside it, the run's front page shows the gate as
failed and signed off, and the check goes on reporting as failed. A sign-off on a failure about a stage already
accepted carries to the later stages' gates. An answer that the workflow looks wrong is marked on the front page
and listed by `SPOCK: how the workflow performed`. **Eight checks can never be signed** — `C14`, `C32`, `C38`,
`C51`, `C143`, `C168`, `C189` and `C190`, the ones that keep the record and the workflow's own files honest. The
producer is instructed to name this route and stop, and never to run the task itself.

**R3.8.3 — The run does not move unless the producer moves it.** A producer that writes and stops leaves a
person holding a brief with no idea what comes next.

**R3.8.4 — Triggering the gate is not running it.** Blueprint §5.3 requires the checker to be independent
of the producer. What the producer triggers is a command running the checker as a separate process.
**What would break the rule is the producer writing the verdict**, and the writer refuses a gate record
naming a registered agent, so it holds twice. **Never say a stage passed on your own account. Say what came
back.**

---

# Part 4 · The output and its sections

## 4.1 The section set, and it is not this stage's to choose

**`documentation-standards` §3.1 owns it**, and the set is the same for every document the workflow
produces: `The outcome we want` · `Who this is for` · `Why now` · `What success looks like` · `What is in
scope, and what is not`, then the two closing sections **every** artifact carries, `What we could not
establish` and `How this was produced`, under those exact names.

**§3's own opening is the rule: a producer that deviates has produced a regression, not a style.**

**This is the section a brief written as prose fails.** See §1.5.
`C100` decides the set and `C98` decides the two closers, and both are universal rather than stage 1's own.

## 4.2 What the fields carry, and where they live

**The content fields sit on the record and the envelope sits on the output.** `A1`'s set is declared in §6
of the parent and generated into `.github/artifact-fields.yaml`, and **that file is what a producer copies
from**, not the flat list of names beside it. A list of names with no nesting reads as a set of top-level
keys, and the findings end up in body prose where no check reads them.

**Three fields carry nested entries** and the nesting is declared: `goals` takes north star, product goal,
metric, key result, strategy basis, unavailable and link; `unknowns` takes field, reason, asked, not known
and declined; `screening_inputs` takes input, value, reason and note.

**`known_competitors` is a value list and not an object list.** An object written into a value list matches
nothing a check compares it with.

## 4.3 An unknown is a record

```text
unknowns:
  - field: goals
    reason: not_yet_available     # not_known | not_yet_available | not_applicable | declined
    note: OKRs for H2 not published yet
```

**The reason is proposed from the conversation and the person confirms it. Never assume a reason from
silence**: the record says the person was asked (`C163`).

## 4.4 What the producer does not write

| Field | Written by |
|---|---|
| `could_not_verify` | The envelope task, from the quality rules bound to the skill, using the same function the check recomputes it with |
| `decision` | The acceptance. **Omitted entirely until the decision exists** — a stub carrying only the gate name is a decision record with nobody in it (`C40`) |
| The envelope generally | `SPOCK: fill in the envelope`, from the contract, the registry and the field spec |

**`could_not_verify` is not the producer's assessment of its own output.** It is the list of quality rules
bound to it that no check decides, put on the document the person is deciding on rather than on a record
they would have to know to go and find. **The envelope task writes it rather than the producer**, because a
producer that copies one line wrong spends longer finding out than writing the document.

---

# Part 5 · Compliance

**Stage 1 asks nothing regulatory, here or anywhere, and that is a decision rather than an omission.**

**A screen here would ask a person for answers that cannot exist yet.** Of the forty-seven regulatory inputs
it would collect, the body it reads declares **twelve knowable only once options exist**.

**A product manager cannot say whether an idea engages a regime before the idea exists.** The screen runs
per solution at stage 4 instead, against each proposed solution, where an area's own triggers have something
concrete to fire against.

**`A1b` is retired and the step is gone rather than emptied.** Two runs in the committed set keep theirs and
are read against the model they were produced under.

**What survives here is one field and no question.** `screening_inputs` remains in `A1`'s declared set for
those two runs. Nothing populates it on a current run and nobody is asked to.

---

# Part 6 · Scoring

**Stage 1 produces no score and carries none.** No band, no axis, no number.

**What it does carry is the basis a later stage reads**: the goal's key result and the written link between
metric and key result. **Stage 4 produces no score**, so the link is read by a person at `G4` rather than
scored.

**The link is still the highest-consequence sentence in the brief** and `R3.4.7` is unchanged by the
scoring going away. A producer-authored link is one the Product Manager reviews as though someone else had
written it.

---

# Part 7 · Artifacts and records

| | | |
|---|---|---|
| **A1 Initiative Brief** | *output* | `{runs_root}/{run_id}/1-brief/initiative-brief.md` |
| **The record** | one per production | `{runs_root}/{run_id}/records/1-brief/` |
| **A1b Compliance screen** | *retired* | Two runs in the committed set keep theirs |

**The output is assembled from the record and does not stand alone.** The fields a gate decides sit on the
record, never on the output, and the output cites the records it was assembled from (`C107`, `C108`, `C109`).

**Stage 1 is the only stage that creates the run.** `init` writes the seven stage folders, `records/`,
`read/`, the run record and a generated front page before the brief exists.

**The run record gains this stage's block**: the gate result with which half ran, the know-how each step
loaded and at which version, the stage owner with name and role, and the `G1` decision with
`by_agent: false`. **The owner is whoever signs `G1`**, unless `SPOCK: record who owns this stage` named
somebody else at the start of the stage.

---

# Part 8 · Gates and checks

## 8.1 What `Q1` is

**Two checks of its own and forty-five universal ones.** `Q1`'s own set is `C10` and `C77`. The universal
set runs at every stage gate, and **it is where stage 1 actually fails**: `C98`, `C100` and `C163` are
all universal, and all three refuse a brief written as prose.

**A stage card naming its own two checks describes a small part of what its gate does.** That is the reading
error this part exists to prevent.

**Each check's full rule is in the check register** (see the README); the table says what each guards against.

| Check | Gate | What it guards against |
|---|---|---|
| `C10` | `Q1` | A brief that leaves a required field empty with nothing saying why, so a gap reads like an answer |
| `C77` | `Q1` | A goal that does not lead to a company key result, or whose measure is the key result itself |
| `C6` | every gate | A document that cannot be tied to the run it belongs to |
| `C51` | every gate | An agent standing in for the checker or for a person on the run record |
| `C98` | every gate | A document that hides what it could not establish or how it was made |
| `C100` | every gate | A document missing the sections its reader expects to find |
| `C163` | every gate | A gap blamed on the person's silence when nobody asked them |
| `C40` | every gate | A decision on the record with nobody, or something other than a decision, behind it |
| `C65` | every gate | A reader not shown the quality rules no check could decide |
| `C180` | every gate | A gate's questions reading as answered when nobody answered them |
| `C206` | every gate | A document opening on facts the run record does not hold |

## 8.2 What the gate cannot decide, stated as floors

**`Q1` cannot detect a guessed field.** It checks that fields are accounted for, not that they are true.
**That is why inference is forbidden rather than discouraged**: nothing downstream will catch it.

**`C77` cannot detect a plausible link.** **Whether the mechanism is real is `G1`'s judgement**, and it is the whole reason the
producer must not author the sentence.

**No automated judge runs a judged rule at this gate; the person who signs `G1` answers them in the
approval.** No second model family is configured, and the gate reports which half of itself ran on every
result. The agent lists the gate's questions; the person answers them in the approval's third box, `y`, `n` or
`?`, numbered, and a question left out is recorded as skipped (`C180`).

---

# Part 9 · The decision

**`G1`, and the Product Manager decides it alone.** The question is *complete enough to proceed*.

| | |
|---|---|
| **Asked** | Is this brief complete enough to proceed, given what it says it could not establish |
| **The boxes** | `SPOCK: approve what is in front of me`: the person's name; the role they decide in, left empty to keep the role the run records for them; their answers to the gate's questions, optional; and what they asked to be changed before approving, in their own words, correcting the agent's list or left empty |
| **Recorded** | Who decided, in which role, and when; the answers, with any skipped; and the changes asked for, in the document's decision block. Rework before the decision is counted by the workflow at each gate, on the stage's own record |
| **`by_agent`** | `false`, always. An agent never records a human decision, and the approval refuses an agent's name |
| **Written by** | The acceptance task. The producer writes no part of it, and is instructed to name the task and end its turn, never to start it |

**A brief with four fields marked unknown can pass `G1`.** Completeness is not the test. The test is
whether what is missing is survivable for the stages that read it, which is a judgement about this
initiative and not a property of the document.

**The approval attributes the stage to whoever signs it.** A gate signature and the ownership of a stage are
different claims, so where somebody else did the work, `SPOCK: record who owns this stage` records them at
the start of the stage, and only then.

**A heads-up, not a refusal, where the role is not the one the gate is given.** The Pilot Definition gives
`G1` to the Product Manager, and an approval recorded under another role prints *"Heads-up: the Pilot
Definition gives G1 to the Product Manager, and this is recorded under the role …, as typed."* The approval is
recorded as typed. A name close to one the run already records gets its own heads-up, naming
`SPOCK: correct a name on the record`. **A role that reads as a slip is refused**: on a stage nobody owns yet, a
role typed without accents one or two characters from one the run already records, and nothing is recorded.

---

# Part 10 · Loops and re-entry

| Move | What it costs |
|---|---|
| **Amending an accepted brief** | The stage is sent back first with `SPOCK: send a stage back to be redone`, because an accepted brief stays as it was approved. A person's own change is then recorded with the task that marks it `modified_by: human` and writes the account of what they changed and why. The build counts the rework at the stage's next gate, so nothing depends on `revisions` being incremented. **The send-back marks every later stage that holds a gate result or an acceptance stale**, whatever field changed |
| **Rework** | Counted by the workflow at each gate from the documents that changed since the last one, and on a run started on 1.12 or later from the stage's records too. Nothing is recorded by hand |
| **A later stage sending the run back** | Stage 1 has no upstream, so the only way in is a person deciding the brief was wrong |
| **Withdrawing the stage** | A workflow act. A retracted stage no longer carries an agreement for a document being withdrawn |
| **Taking the work back** | `SPOCK: take something back` moves a file, or the whole stage folder once the listing is confirmed, into the run's `superseded/` with a reason. Nothing is deleted |
| **Stopping the run** | `SPOCK: stop this run`, with the person's name and one of four reasons. The run stops for good and nothing is moved or deleted |

**Nothing upstream can go stale, because nothing is upstream.** Staleness only runs outward from here.

---

# Part 11 · Bounds

| Bound | Value | Whose | On reaching it |
|---|---|---|---|
| Elicitation exchanges | **40** | the agent's, as an instruction, declared in `skills.yaml` | Write what exists, mark the rest unknown, name the gaps |
| Attempts per field | **none** | — | No cap on helping with one field |
| Attempts at rewriting the person's outcome | **2** | the agent's, as an instruction, declared in the skill (the registry entry names it in a comment only) | A third is arguing |

**The outer bound is a stop and not a budget to spend down**, and no field has a cap of its own, because a
field abandoned at a third attempt with the person still willing lands in `unknowns[]` reading exactly like
one they refused.

**No script counts these bounds; they are instructions to the agent.** It is instructed to record reaching
one in `bounds_hit[]`, and no check reads that it did. Silent truncation is the failure they prevent.

---

# Part 12 · What the build does not yet do

**No gap is stated in parts 1 to 11.** What the stage cannot decide is in *What this spec does not fix*, below.

---

# Part 13 · Open questions

- **Is `cs` the right default language?** It is declared rather than inferred, and the person can change it in
  the same reply.
- **Should `G1` be able to accept a brief whose `goals` are unknown?** Today it can, and `R3.4.7` prefers an
  unknown goal to a partial one.
---

# What this spec does not fix

- **No automated judge runs the judged half of `Q1`.** No second model family is configured; the person who
  signs the gate may answer it.
- **Nothing verifies that a supplied field is true.** `Q1` checks that fields are accounted for. A person
  who gives a half-remembered number and a person who reads one off the strategy deck produce the same
  document, and only `evidence-standards` being read stands between them.
- **Nothing catches a producer-authored link.** `C77` sees a link and cannot see who thought of it. **This
  is the single largest unguarded inference in the workflow** and the only control is `G1` reading it.
