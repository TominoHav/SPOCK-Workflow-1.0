# Stage 2 — specification

**2 October 2026** · **Release:** 1.14

**This describes the stage that exists, not the stage that was designed.** Every rule in parts 1 to 11 is
read off the build — the workflow contract, the four skill files, the gate model, the field spec or a bound
know-how body — and where the build does not yet do something the stage needs, the part it belongs to says
so, with the reason, and part 12 lists where. **A spec that describes an intended stage is how a reader comes
to believe a thing runs.**

**Parent contract:** [PILOT-BUSINESS-LOGIC.md](../PILOT-BUSINESS-LOGIC.md). **Both describe the latest
release, and where either disagrees with the build, that document is the defect.**

---

# Part 1 · Purpose and scope

## 1.1 What the stage is for

**Stage 2 turns material a team already holds into a short list of opportunities the run will pursue.**
It is the only stage that reads text nobody on the project wrote, and every control in it follows from that.

**It is four steps in one stage, carried by one agent.** Material intake reduces the supplied material to
observations. Hypothesis authoring restates the observations as standardised problems and derives a trust
tag for each. Opportunity framing turns each problem into something that can be acted on, and asks the person
to rank the whole set by how many customers each reaches and how much each hurts. Prioritisation proposes an
order on those rankings and the person sorts them into primary, secondary and parked.

## 1.2 Why it sits here

**It is the first stage that can fail for a reason outside the system.** `A2`, the problem material, is
required, has no default and no placeholder, and **`problem_material_missing` is a hard stop**. Material
arrives as files a person puts in the run's `2-problems/supplied/`, read in with
`SPOCK: read in the problem material`. **At least one file has to be read in first.** After that, a person can
also type a problem in their own words with `SPOCK: add a problem in my own words`, which saves it there as a
file and adds it; before that, the task refuses. Text a person pasted in the chat goes in with
`SPOCK: take in what I pasted in the chat`, which saves exactly what they copied there as a file, from the
conversation: once material has been read in it adds it, and before that the read-in takes it with the rest.
**With no file read in, the stage has nothing to read**, and it
says so rather than producing a partial artifact.

**Everything after it is downstream of the trust tag.** Stage 3 researches the market against these
opportunities, stage 4 binds every solution to them, and the tag travels with each one. **A problem
admitted here on weak evidence is a problem a solution gets built on four stages later.**

## 1.3 What the stage does not do

| | |
|---|---|
| **It does not produce material** | `problem_material_agent_produced` is a hard stop (`C34`) |
| **It does not read outward** | Material intake holds no search, no terminal, no outward reach and no delegation. The contract's `tools: []` is the quarantine boundary |
| **It does not assert a trust tag** | The tag is derived from the evidence behind a hypothesis. A producer never writes one and never drops a hypothesis for having a poor one |
| **It does not propose a solution** | Opportunity framing is explicitly excluded from it, and `alternatives` stays empty with the reason recorded |
| **It does not promote on the person's behalf** | Prioritisation does not move an opportunity into `primary[]` for them, and does not empty `parked[]` |
| **It does not route at runtime** | `runtime_routing: forbidden` in the contract |

## 1.4 What good looks like

**Every observation traces back to the supplied material, every hypothesis says what its evidence is or that it
has none, every hypothesis is framed once, and the person's order holds one to three primaries** (`C35`, `C2`,
`C1`, `C115`, `C27`).

**A set with four weak tags and a parked list is a good output.** The tag is information for the person at
`G2`, not a filter the stage applies.

## 1.5 What poor looks like

**A hypothesis that names a thing to build.** The shape test is one question: *could more than one thing
address this?* If only one could, the statement has already chosen, and what it chose is the thing it
names. *Advisers would use a self-service tool* is a solution wearing a problem's grammar.

**An evidence list written as objects rather than references.** **With evidence carried as objects nothing
matches an observation, the qualifying set is empty, and everything derives `weak`.** The check then reports
the artifact claiming a trust tag the arithmetic did not derive, **which reads as an agent inflating a tag and
is nothing of the kind.**

---

# Part 2 · Inputs

## 2.1 What the stage reads, and the boundary is the point

**The four steps read different things on purpose, and each is one step further from the raw text than the
last.**

| Step | Reads | Explicitly may not read |
|---|---|---|
| **material-intake** | `A1`, **`A2` the supplied material** | — |
| **hypothesis-authoring** | **`A2b` only** | `A2`, the raw material |
| **opportunity-framing** | `A3`, `A1`, user dialogue | `A2` **and `A2b`** |
| **prioritisation** | `A3b`, user direction | — |

**The boundary is declared, and the agent is told to keep it; nothing stops it crossing.** The contract's
steps and the registry name the same inputs for each step, and the skill pages the same artifacts with the
dialogue or the person's direction beside them: intake `A1` and `A2`, authoring `A2b` alone, framing `A3` and `A1`,
prioritisation `A3b`. The stage-level step in `discovery.workflow.yaml` names `A1`. **One agent carries all four
steps and holds `readFile`**, so nothing but its instructions keeps authoring off `A2` (`R3.1.2`). Framing is one
step further out again, and the skill says why: an opportunity is the last artifact before a person decides what
the run pursues, so the further the raw text is from it the better.

**Evidence references still resolve into `A2`**, through the `ref` each observation carries. The boundary
stops the text travelling, not the traceability.

## 2.2 Where the material goes, and the folder matters

**`{runs_root}/{run_id}/2-problems/supplied/` is where a person puts what they were handed.** The artifact
walk does not enter that folder, so material can sit in the run without being read as a document.

**Every supplied file is read in, and every item read from a file names it** in `source_path`, relative to
the stage-2 folder (`C159`).

**Material sitting loose in `2-problems/` is asked to be moved and never asked to be deleted** (`C159`). A
person's material is not the system's to remove.

**Material can be added or changed until stage 2 is put in front of a person**: before it starts, while it runs, once
it is written, or after it fails its check, with `SPOCK: add problem material` for files, whose one box takes in every
change the agent listed at once (*yes*) or nothing (*no*): a new file, a file edited, moved into the run's
`superseded/` folder or removed after it was read in, recording the new version beside the old and renumbering
nothing; `SPOCK: add a problem in my own words`, or `SPOCK: take in what I pasted in the chat` for text pasted in the
chat, which reads the person's clipboard so the agent never passes their words on.

**What is read, and how.** A PDF is read as it is: the convert task writes its text beside it, one section per
page, and a scanned, protected or unreadable PDF is reported with what to do instead. Word, PowerPoint and Excel
files, their macro-enabled forms included (their macros never read or run), convert as they are laid out, and
Teams and Zoom transcripts (`.vtt`, `.srt`) are read as they are. A file attached in the chat is not material: the
person puts it in the folder.

**Material that arrives without dates is dated by the person.** The read-in and the add list each file that
carries no date, with the year it names where it names one, and nothing from it counts as dated until the person
confirms its period (a year, a quarter or a month) with `SPOCK: date the material that arrived without dates`.
**One run of the task takes every listed file's period in its one box**: `as listed` takes the periods the
listing suggested, and a file is corrected or completed after a semicolon, as in `as listed; tickets.csv: 2026-Q2`;
each file's items then record the period once, as the person's statement. A file left without one stays undated (`C37`, on a run started on 1.11 or later).

**A competitor benchmark among the problem material is explained, not refused.** The agent is told to say what
the file looks like, that stage 3 does not read reports, and that its competitors and addresses can go into the
stage 3 list.

**From stage 3's gate on, every file in the supplied folder must have been read in and be unchanged** (`C190`,
which can never be signed off), so material added after `G2` goes in by sending stage 2 back first.
**Once stage 2 is in review or accepted, all three refuse**, because new material would change what the person is
deciding on underneath their decision, and the stage is sent back first.

## 2.3 The know-how its producers read

| Body | Which steps | What for |
|---|---|---|
| `method/method-canon.md` | all four | **§4.2 is what stage 2 is for**; §10 where opportunities come from; §11 structuring the space; §12 choosing what to work on |
| `method/evidence-standards.md` | intake, authoring | What counts as evidence, and how close a source was to the event |
| `method/opportunity-framing.md` | framing, prioritisation | The framing itself |
| `writing/agent-interaction.md` | all four | The manner of the conversation |
| `writing/input-elicitation.md` | framing | **The substance: what to ask and how to tell a good answer from a thin one** |
| `writing/output-voice.md` | all four | How the documents read |
| `writing/documentation-standards.md` | all four | §3, the section set |

## 2.4 What happens when an input is absent

| Absence | What the stage does |
|---|---|
| **`A2` the problem material** | **Hard stop.** No default, no placeholder, and the stage does not start |
| **A person gives a solution when asked for a root cause** | Record what they said as the assumption it is. **Do not promote it into `alternatives`**, and section 9 stays empty |
| **A field framing asked for and did not get** | The agent is instructed to mark it missing after three rounds across the whole set and stop rather than press |
| **Material beyond the bound** | The agent is instructed to report what was **not** read. **Never read selectively and stay silent** |

---

# Part 3 · The steps

### Step 1 — Material intake

**R3.1.1 — The step holds no tools at all.** `tools: []` in the contract, and the skill's exclusion is
*nothing beyond reading a file and writing one*. No search, no terminal, no outward reach, no delegation.

**R3.1.2 — The agent running this step holds more than the step does, and that is a decision.** One agent
runs stage 2, so intake's narrower capability list shares that agent's host unit, and the person picks one
agent for the whole stage. **The skill's own capability list stays empty.** What bounds the agent is that a
task takes no argument from the material, and that recording an acceptance needs a person to type a name.

**R3.1.3 — Each observation references its source and how close that source was to the event** (`C35`,
`C39`).

**R3.1.4 — It does not extend, does not summarise beyond the material, and does not fill gaps.** Where
something is unclear it asks, within the clarifying bound, and carries the remainder into `unresolved[]` as
recorded gaps.

### Step 2 — Hypothesis authoring

**R3.2.1 — Restate each observation as a hypothesis: one sentence, stating the problem.**

**R3.2.2 — Test the shape before anything else, and a problem never names a thing to build.** The test:
**could more than one thing address this?** If only one could, the statement has already chosen.

**R3.2.3 — The trust tag is derived and never asserted.**

| Tag | Requires |
|---|---|
| **strong** | Two or more distinct origins among the cited observations whose provenance is complete, **and at least one of those first-hand** |
| **weak** | Evidence cited, and that does not hold |
| **unrated** | No references at all |

**Only an observation with `provenance_complete: true` counts.** The cited observations whose provenance is
incomplete are left out before origins and first-hand ones are counted, so two cited origins of which one lacks
complete provenance derive `weak` (`trust.mjs`, `supportOf`). The count the approval prints is read from the
same qualifying set, so it cannot disagree with the tag.

**R3.2.4 — A hypothesis is never dropped for its tag.** A weak problem is a problem with weak evidence, and
the person at `G2` is told which. **`rejected[]` carries no trust tag**, because there is nothing to tag.

**R3.2.5 — The check recomputes the tag from the intake record rather than reading it off the claim.** An
agent cannot inflate a tag, and equally cannot be blamed for one the arithmetic produced from a malformed
evidence list. See §1.5.

**R3.2.6 — Where the evidence contradicts an earlier document of this stage, the producer records it.** A
`contradictions:` entry names the document, quotes the claim, says what the observations show, and starts
`resolution: open`. The producer tells the person, and **stage 2 waits on their decision**: the claim corrected
in that document, after which the gate confirms the quoted words are gone, or kept with their reason by
signing the check off. `C193` holds the gate until one or the other.

**R3.2.7 — Material added during the stage grows the set and renumbers nothing.** The agent is told to make a
new observation evidence on the hypothesis that already states its need, whose tag is then recomputed, or to
start a new hypothesis numbered on from the highest id, and never to renumber one.

### Step 3 — Opportunity framing

**R3.3.1 — One opportunity per hypothesis, exactly once.** `C115`. The set is the size the hypothesis set
is. **There is no floor and no ceiling of its own**: a run with four hypotheses frames four.

**R3.3.2 — Stages accepted before 26 August 2026 are not asked for `A3b`**, which the stage did not then
produce.

**R3.3.3 — A supplied answer carries its basis** (`C116`). What the person said and what the producer
concluded are different things on the page.

**R3.3.4 — Market factors are deferred, not unknown** (`C117`). The market has not been researched yet;
stage 3 does that. **Recording a market factor as unknown at this point asserts that nobody knows it**,
which is a different and false claim.

**R3.3.5 — Alternatives stay empty and the field says why** (`C118`). Stage 4 produces solution directions.
An alternative written here is a solution written three stages early by the agent least equipped to write
one.

**R3.3.6 — What the material cannot answer is asked as a ranking over the whole set.** Two questions: which
opportunities reach the most customers, and which hurt customers most when they happen. An order is enough
and two may share a place. Each place is written as `sizing.customers.rank` and `sizing.impact.rank`; where the
person cannot rank, no rank is written and the factor is marked `unknown` with their reason (`C116`, on a run
started on 1.10 or later). The producer then
asks why each problem occurs, where the material does not say. **It is told never to supply one of these.**

**R3.3.7 — An opportunity a person brings needs no hypothesis under it** (`C115`). The agent is told to mark it
`origin: person`, with `validation.trust: unknown`, and to name it in the document as theirs. A hypothesis added
during the stage gets its own opportunity, numbered on, and is ranked again with the rest.

**R3.3.8 — An opportunity's id is `O` and a number, and its heading says what it rests on** (`C115`, on a run started
on build 1.16 or later). The id is `O1`, `O2` and on, not its hypothesis's `H` id, and the document heads each one
`## O1: <its name> (from H1)`, naming the hypothesis in `from`, or `## O1: <its name> (yours)` where a person brought
it; `(z H1)` and `(vaše)` are read too. **Wherever a person reads an opportunity, it shows as `O1 (H1)`**, or
`O15 (yours)` (`O15 (vaše)` in a Czech run): the prioritisation skill asks it of the prioritised document, and on a run
started on build 1.16 or later the workflow writes it in the prioritised lists later stages' documents carry, the
solution set's table and the selected solution. Records, the slate and every check's input keep the bare `O1`.

### Step 4 — Prioritisation

**R3.4.1 — Every opportunity is placed exactly once**, into `primary[]`, `secondary[]` or `parked[]` (`C27`).

**R3.4.2 — The cardinalities are the bound**: `primary 1..3`, `secondary 0..5` (`C27`). **At least one
primary is required and `no_primary_problem` is a hard stop.**

**R3.4.3 — `parked[]` is retained and never emptied**, by the agent's instruction (`C29`). A parked opportunity is a
decision the run made, and a later run reads it.

**R3.4.4 — The producer does not promote on the person's behalf and does not re-tag trust.** It is told to
propose an order, marked as a proposal, made on the person's two rankings with ČS's four factors and the trust
tag, and to say in `ordering_source` how it weighed them. Where the person could not rank the
opportunities, it writes the fixed sentence that the order rests on the weight of evidence alone, and only then
(`C116`, on a run started on 1.10 or later). **Promotion is the person's, at `G2`.**

**R3.4.5 — The review message is told to name each supplied file's `research` label**, `synthetic`, `human`
or `not_stated` as intake wrote it, so the person can correct one; the label itself is `C33`'s.

---

# Part 4 · The outputs and their sections

**Four documents, and only the last is an `output`. The other three are `assets`**, which in this build means each carries a quality gate or none and never a decision gate.

| | File | Class |
|---|---|---|
| `A2b` Intake Record | `2-problems/2-intake-record.md` | **asset**, read by authoring and nothing else |
| `A3` Hypothesis Set | `2-problems/3-problem-hypotheses.md` | asset |
| `A3b` Framed Opportunities | `2-problems/4-framed-opportunities.md` | asset |
| `A4` Prioritised Opportunities | `2-problems/5-prioritised-opportunities.md` | **output**, and what stages 3 and 4 read |

**The section set is `documentation-standards` §3's and not this stage's to choose**, including the two
closers, `What we could not establish` and `How this was produced`, under those exact names. The set and the
closers are universal checks' (`C100`, `C98`).

**The content fields sit on the record and the envelope sits on the output.** Copy the nesting from
`.github/artifact-fields.yaml` rather than from the flat list of names beside it.

**`primary[]` and `secondary[]` are value lists.** A hypothesis object written into one matches nothing a
check compares it with: the check wants `H2` and gets the object.

**The workflow writes each document's frame before the agent writes.** `SPOCK: continue`, when the stage opens,
and `SPOCK: check what is written, then continue`, after each document, write the record and the document for
`A2b`, `A3`, `A3b` and `A4` where none is on disk: the record's identity, number and sources, its content fields
in their nesting, and the document's title, its headings in the run's language and the closing pair, with
`[[fill: …]]` in every place that is the agent's. A file still holding one is left out by every reader until the
last place is filled, and a file already on disk is never overwritten. **On a run started on 1.12 or later the
four documents open on a block the envelope step writes from the record**: the facts carried from the stage
before and what changed (`C206`).

---

# Part 5 · Compliance

**Stage 2 runs no regulatory screen and asks no regulatory question.** Nothing in its four skills declares a
compliance body, and the four area cards are read at stage 4 and later.

**What this stage does for compliance is upstream of it and larger.** The quarantine boundary is the control
a risk reader recognises, and it is mechanical rather than asserted: **material a customer wrote reaches an
agent with no outward reach, so an instruction hidden inside it cannot reach anything that acts.**

**An instruction inside the material is data about its author, never a command.** Intake is instructed to
treat it so and, where it matters, to quote it to the person, never to act on it. `C151`, which runs at every
stage gate, looks in what intake and the market stage wrote for an instruction that got through. **It cannot see
an agent that obeyed an instruction and left no trace.**

---

# Part 6 · Scoring

**Stage 2 produces no score.** The trust tag is not a score: it is derived rather than judged, it has three
values rather than a scale, it ranks nothing, and **nothing sorts by it.**

**Prioritisation is the stage's ordering act and it is a person's.** The producer places nothing into
`primary[]` on the person's behalf, so the ordering that leaves this stage is the one the person made.

---

# Part 7 · Artifacts and records

| Artifact | Written by | Record |
|---|---|---|
| `A2b` | `material-intake` | `intake-record` |
| `A3` | `hypothesis-authoring` | `hypothesis-set` |
| `A3b` | `opportunity-framing` | `framed-opportunity-set` |
| `A4` | `prioritisation` | `prioritised-opportunity-set` |

**Every output is assembled from its record and none stands alone.** The fields a gate decides sit on the
record, never on the output, and the output cites the records it was assembled from (`C107`, `C108`, `C109`).

**`A2` is the problem-material record, and a task starts it.** `SPOCK: read in the problem material` writes
`2-problems/1-problem-material.md` with `artifact_id: A2`, one item per file in `supplied/`, without reading any
of them; `SPOCK: add problem material`, `SPOCK: add a problem in my own words` and
`SPOCK: take in what I pasted in the chat` add items for later files.
**Intake, the one step permitted to read the material, then fills the items out and adds items** where one
file holds several sources. **The material itself stays in `supplied/`, outside the artifact walk.**

**The run record gains the stage block**: `Q2`'s result with which half ran, the know-how each of the four
steps loaded and at which version, the stage owner with name and role, and `G2`'s decision with
`by_agent: false`. **The owner is whoever signs `G2`**, unless `SPOCK: record who owns this stage` named
somebody else at the start of the stage.

---

# Part 8 · Gates and checks

## 8.1 What `Q2` is

**Twenty-one checks of its own and forty-five universal.** The own set: `C1`, `C2`, `C27`, `C33`, `C34`,
`C35`, `C37`, `C39`, `C52`, `C53`, `C69`, `C82`, `C115`, `C116`, `C117`, `C118`, `C137`, `C159`, `C172`, `C177`,
`C193`.

**Each check's full rule is in the check register** (see the README); the table says what each guards against.

| Check | Gate | What it guards against |
|---|---|---|
| `C1` | `Q2` | A problem presented with no evidence and nothing saying it has none |
| `C2` | `Q2` | Evidence cited from somewhere other than the material the team supplied |
| `C27` | `Q2` | A run pursuing no problem, or more than it can work on, or an opportunity lost or counted twice |
| `C29` | every gate | Work the run did, or chose to set aside, disappearing from it |
| `C34` | `Q2` | Problem material written by an agent and passed off as the team's |
| `C35` | `Q2` | A finding that cannot be traced back to the material it came from |
| `C115` | `Q2` | A problem dropped, framed twice, or invented on the way to an opportunity, and from build 1.16 an opportunity carrying a hypothesis's id or a heading that does not say what it rests on |
| `C37` | `Q2` | Evidence counted as dated and complete when nobody knows where or when it came from |
| `C116` | `Q2` | A guess about cause or impact presented as a finding, or a ranking that is not a ranking |
| `C117` | `Q2` | Stage 2 claiming nobody knows the market before the market has been researched |
| `C118` | `Q2` | Solutions written into the problem stage, three stages early |
| `C159` | `Q2` | Supplied material read in part, or files sitting in the run that nothing accounts for |
| `C177` | `Q2` | A count in the text that does not match the record it summarises |
| `C193` | `Q2` | A stage 2 document left contradicting its own evidence with nobody deciding about it |

## 8.2 The five hard stops

**A hard stop is not a failed check. It is the stage refusing to run.**

`problem_material_missing` · `problem_material_agent_produced` · `no_primary_problem` · `trace_missing` ·
`required_human_signoff_missing`.

**A hard stop does not yet write a record**, because nothing in the build writes one: a run stopped by
`problem_material_missing` looks on disk the same as one nobody started.

## 8.3 What the gate cannot decide

**Nothing here decides whether a problem is worth solving.** The gate decides that a hypothesis is well
formed, evidenced or honestly unrated, framed once and placed once. **Whether the run is pursuing the right
three is `G2`'s judgement and no check touches it.**

**No automated judge runs a judged rule at this gate; the person who signs `G2` answers them in the
approval's third box**, and a question left out is recorded as skipped (`C180`). No second model family is
configured.

---

# Part 9 · The decision

**`G2` is the only gate whose contract names two actors, and it is `review-and-refine` rather than
approve-or-reject.**

| Actor | Governs | Decides |
|---|---|---|
| **Researcher** | evidence | Is each opportunity well formed and correctly evidenced |
| **Product Manager** | scope | Which opportunities does this run pursue |

**Neither reviewer overrules the other.** They answer different questions about one list, and the contract
says so in the file.

**The Researcher is a human role and not an agent.** The agent carrying the stage is the Opportunity
Designer. Conflating the two names the wrong agent for the stage, which is why the overview's stage drawing is
compared to the contract.

**The approval does not yet record the two actors separately**, because it takes one name and one role: the
two questions are signed as one decision by whoever approves. An approval under a role that is neither prints
a heads-up naming the Researcher and the Product Manager, and is recorded as typed, unless the role reads as a
slip (stage 1, part 9).

**What the person sees when stage 2 waits on them.** The approval lists each hypothesis with how many
observations support it, from how many origins, and how many of them are first-hand, beside the tag the
arithmetic derives, then each contradiction the agent recorded and how it was settled. The approval's four
boxes are the same as at every gate: name, role, answers to the gate's questions, and the changes asked for.

**`by_agent: false`, always.** The approval attributes the stage to whoever signs it, unless
`SPOCK: record who owns this stage` named somebody else at the start.

---

# Part 10 · Loops and re-entry

| Move | What it costs |
|---|---|
| **Changing the list before `G2` is signed** | The contract names `G2` `review-and-refine`, and no task records a refinement round. A person who wants the list changed asks the agent; when they approve, the approval sees the documents that changed since `Q2` ran and runs `Q2` again before recording anything. **Once `G2` is signed, the way back is `SPOCK: send a stage back to be redone`** |
| **A later stage sending the run back** | Stage 4 reads `A4`; an opportunity nobody can build against comes back here |
| **Redoing one step** | No task re-runs one step. The way back is the stage-level send-back, which ends the stage's gate result and its signature, withdraws the answers to its questions and its decisions and keeps them on the record, prints what it dropped, and records the send-back as a `direction` decision in the person's name |
| **Rework** | Counted by the workflow at each gate from the documents that changed since the last one, and on a run started on 1.12 or later from the stage's records too. Nothing is recorded by hand |
| **Stage 1 sent back or re-run** | Marks this stage stale where it holds a gate result or an acceptance, whatever changed. A stage 2 still being written is left with its agent |
| **Adding material once stage 2 is in review** | Stage 2 is sent back first with `SPOCK: send a stage back to be redone`, then the material is added and the stage is written again with it. The agent redoes what rested on a file that was replaced or removed |
| **Taking the stage's work back** | After a send-back, the output names the line to type in `SPOCK: take something back`, as in `2-problems (12 files)`; the folder alone lists what would move, and nothing is deleted. Supplied material is refused |
| **Withdrawing the stage** | A retracted stage no longer carries an agreement for a document being withdrawn |

---

# Part 11 · Bounds

| Bound | Value | Whose | On reaching it |
|---|---|---|---|
| Input volume | **50 items or 500 pages** | the agent's, as an instruction, declared in `skills.yaml` and the skill | Report what was **not** read. Never read selectively and stay silent |
| Clarifying rounds, intake | **5** | the agent's, as an instruction, declared in `skills.yaml` and the skill | Carry the remainder into `unresolved[]` as recorded gaps |
| Hypotheses emitted | **20** | the agent's, as an instruction, declared in `skills.yaml` and the skill | Say what was not restated. **Beyond 20 the set stops being reviewable** |
| Framing elicitation rounds | **3 across the whole set** | the agent's, as an instruction, declared in the skill only | Mark what is missing and stop rather than pressing |
| Opportunities framed | **one per hypothesis, and any a person brings** | — | No floor and no ceiling of its own |
| Ranks on reach and on hurt | **1 to the number of opportunities** | a person's | `C116` reads it on a run started on 1.10 or later |
| `primary[]` | **1..3** | a person's, declared in `skills.yaml` and read by `C27` | The person chooses inside it |
| `secondary[]` | **0..5** | a person's | |

**Three of these bounds are held by checks (`C115`, `C27`, `C116`); the others are instructions to the
agent.** It is instructed to record reaching one in `bounds_hit[]`, and no check reads that it did.
Silent truncation is the failure they prevent.

---

# Part 12 · What the build does not yet do

| Where | The gap |
|---|---|
| §9 | The approval does not yet record the Researcher and the Product Manager separately |
| §8.2 | A hard stop does not yet write a record |

---

# Part 13 · Open questions

- **Is `C151` enough to treat the quarantine as a control?** It reads what intake wrote, not what the agent
  did with the material.
- **Should a hard stop write a record?** Nothing writes one, so a blocked precondition and an unstarted run
  are the same absence on disk.
- **Is 20 hypotheses the right ceiling?** The reason given is reviewability rather than capacity.
- **Does `G2`'s two-actor shape hold at ČS?** The contract says neither reviewer overrules the other, and
  no run has had two different people at this gate.
- **Do `A2b`, `A3` and `A3b` earn their place as separate documents?** Three assets, each gated, feed one
  output, and nothing has measured whether a reader at `G2` opens any of them.

---

# What this spec does not fix

- **No automated judge runs the judged half of `Q2`.** No second model family is configured; the person who
  signs the gate may answer it.
- **Nothing decides whether the right problems were found.** The gate decides that what was written is
  well formed and traceable. **A team that hands over the wrong material gets a well-formed set of the
  wrong problems**, and no control in this stage or any other would say so.
- **The trust tag measures the evidence and not the problem.** Two independent origins, one first-hand,
  makes a `strong` tag out of two people agreeing about something neither measured.
