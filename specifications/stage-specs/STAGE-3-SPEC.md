# Stage 3 — specification

**2 October 2026** · **Release:** 1.14

**This describes the stage that exists, not the stage that was designed.** Every rule in parts 1 to 11 is
read off the build — the workflow contract, the four skill files, the gate model, the Competitive Analysis
Standards or another bound body — and where the build does not yet do something the stage needs, the part it
belongs to says so, with the reason, and part 12 lists where.

**Parent contract:** [PILOT-BUSINESS-LOGIC.md](../PILOT-BUSINESS-LOGIC.md). **Both describe the latest
release, and where either disagrees with the build, that document is the defect.**

---

# Part 1 · Purpose and scope

## 1.1 What the stage is for

**Stage 3 establishes what the market already does about these opportunities, so that stage 4 generates
against something rather than against nothing.** It maps the market's trends, profiles the participants
worth understanding, and distils what follows **for this run's opportunities** rather than in general.

**It is the only stage that reaches outside the repository**, and every control in it follows from that.

## 1.2 Why it sits here and why nobody signs it off

**It runs after the opportunities are confirmed because its whole output is scoped to them.** A synthesis
written before `A4` would be a market survey, and a market survey is what this stage is designed not to
produce.

**Stage 3 has no human gate, by decision, and the empty list in the contract is the statement.** `Q3` is
its whole acceptance. **An absent key would read as an omission; an empty list reads as a choice somebody
made.**

**What follows from that is the one thing an operator must understand about this stage: nobody signs it
off when it passes.** The stage opens with a message the workflow prints for what the run's
`3-competitive-analysis/supplied/` holds at that moment. With the folder empty, it asks the person for a market list:
competitors and trends, as one file in that folder, or an empty folder, in which case it searches the market itself.
With a file there, it names each file, says only that list is researched, and asks the person to run
`SPOCK: what market material has been supplied`, which takes the list in; the agent is instructed to go on from that
task's result. **Searching needs VS Code's web search extension and a search key, installed
separately**; without them the agent cannot search, and is instructed to record on the map that discovery was
unavailable and to ask the person for addresses. After the two ways, it is instructed to wait for the person's word to begin, to look in
the folder again when it is given, and to say in its first sentence which of the two it is doing, and nothing is
recorded as a choice. **Once `Q3`
passes, the next human involvement is reading the result inside stage 4.** A stage nobody reviews is a stage
whose checks are the only reader it has.

## 1.3 What the stage does not do

| | |
|---|---|
| **It does not author from raw external text** | `authored_from_raw_external_text` is a hard stop. **The privileged step never sees the page** |
| **It does not fetch and write the store in one step** | A guardrail on 3.2, and the store outlives every run |
| **It does not reach an unnamed destination** | `egress_destination_unnamed` is a hard stop, and it applies only while no destination is named. **One is named**, the web search extension's provider, under a regime that is open by default: nothing restricts the agent to a list of hosts. The stop is an instruction to the agent, and the regime it researched under is on the record (`C76`) |
| **It does not assert confidence** | A card's confidence is recomputed from its own sources and fields, never read off what the producer wrote |
| **It does not decide anything** | No human gate, no selection, no ranking that leaves the stage |
| **It does not route at runtime** | `runtime_routing: forbidden` |

## 1.4 What good looks like

**Every element of the synthesis traces to where it came from, every card rests on independent sources with the
participant's own among them, confidence is derived rather than asserted, all three trend classes are covered,
and the market is covered widely enough** (`C3`, `C60`, `C66`, `C81`, `C75`).

## 1.5 What poor looks like, measured

**A card citing a vendor's own walkthrough and the same vendor's own product pages, reading as two
independent sources.** **Prose cannot decide identity**: one adviser described two ways counts as two
origins to anything comparing strings, which is why independence is decided on a publisher key and not on
similarity of wording.

**A map of three where the market holds twenty.** The coverage aim exists to stop that specific shape,
and the standards say so: ten is the aim of a searched market and there is no ceiling. **A list of three a
person supplied is not that shape**: its own count is the aim (`C75`, Standards v0.18), and it passes with
nothing signed.

**A trend class landed at the bottom of its range.** Three per class is a floor and five a ceiling, and the
standards warn about the direction: **a floor becomes the target whenever nothing above it asks for more**,
which is the same thing the source floor did to the competitor cards.

---

# Part 2 · Inputs

## 2.1 What the stage reads

| | | |
|---|---|---|
| `A1` | the initiative brief | the market scope that bounds the search, and `known_competitors[]` |
| `A4` | prioritised opportunities | what the synthesis is distilled **against** |
| `A3b` | framed opportunities | read by landscape mapping and by synthesis |
| **The supplied folder** | `3-competitive-analysis/supplied/` | **decides the whole mode.** A file there is the person's market list, and the agent is instructed to work only from it and to search nothing, which is not a guarantee: where the web search extension is installed, it can still search. An empty folder means the agent searches the market, where the web search extension and its key are installed (§1.2). **A list changed after it was recorded**, or a new one put in after the old one was moved to the run's `superseded/` folder, is printed with its competitors and trends before and after and taken in by `SPOCK: what market material has been supplied` only on the person's confirmation in its box, with the fingerprint of the one before; once stage 3 is in review or accepted, stage 3 is sent back first. **A list with no competitor entry is not recorded**: the task says how it read each section and shows a four-line example. A list pasted in the chat goes in with `SPOCK: take in what I pasted in the chat`, which saves the clipboard as the person's market list. Before the stage runs, the task names each competitor whose addresses come from fewer than two publishers, whose card the gate would refuse |
| **The store, `S1`** | the durable competitor profiles | read before any branch starts. **Reuse is suspended from build 1.7, by instruction**: the agent is told to research every participant the map selects this run, whether or not the store holds a card for it, and to leave `reused[]` empty, because a stored card was written against its own run's question and the store does not record which. **No check refuses a non-empty `reused[]`**: `C75` still counts its entries toward the card aim, and `C184` still treats a card researched before the run as reused and does not read it |

**Which step reads what.** The contract's market step names `A1` and `A4`; inside stage 3 its landscape step
names `A1` and `A4`, the deep dive `A5` and the synthesis `A6` and `A4`. The registry and the skill pages add
`A3b` to the landscape and the synthesis, and the skill pages add the store (landscape, deep dive) and the run
record (all three). The landscape skill reads `A1` for its scope and starts from its `known_competitors[]`.

**`known_competitors[]` is why stage 1 asks for it.** The floor is met more cheaply when the run starts
from names rather than from a blank search, and a person who knows the six banks that matter should not
watch the run rediscover them.

## 2.2 The know-how its producers read

**`market/competitive-analysis-standards.md` is the body this stage is held to**, and it is the one body in
the build whose version decides a check's threshold. Alongside it:
`method/evidence-standards.md`, which owns the definition of independence and which §3.2 of the standards
derives from rather than restates, plus the writing bodies.

**§4 of Evidence Standards wins where the two disagree**, and §3.2 of the standards says so
itself.

## 2.3 What happens when an input is absent

| Absence | What the stage does |
|---|---|
| **No named destination** | **Hard stop, which applies only while no destination is named, and one is named.** The agent is instructed to reach nothing then (`C76`) |
| **A participant's own material unreachable** | Named and excused rather than passed over, because a participant's own site can be blocked, return server errors, or be reachable only through a search snippet |
| **Nothing fresh in the store** | Not an absence while reuse is suspended: the agent is told to research every participant. A market reaches the card aim in one production only if every branch succeeds, which is why a second round is ordinary rather than exotic |
| **No market list supplied** | Not an absence. The agent searches the market where the web search extension and its key are installed, and is instructed to say so in its first sentence. Without them it cannot search, and is instructed to record on the map that discovery was unavailable and to ask for addresses |
| **A supplied list shorter than ten** | The list's own count is the aim, never below three (`C75`, Standards v0.18) |

---

# Part 3 · The steps

**Four steps and only three have positions.** The bridge has none on purpose.

### Step 3.1 — Landscape mapping

**R3.1.1 — It authors only from the extract**, never from a fetched page. The guardrail is on the step and
**no check decides it**, which part 8 states rather than implies.

**R3.1.2 — Participants are typed and keyed** (`C54`). The key is the identity, and equality of a key
decides a party rather than similarity of prose.

**R3.1.3 — Which participants warrant a deep dive is recorded with a reason** (`C55`). A landscape that
names twenty and profiles six must say why those six.

**R3.1.4 — All three trend classes are present and none is thin** (`C81`): business, technology and
regulatory, **three to five each**. Five is a ceiling and not a target to exceed: a class already at five
that is asked for two more goes to seven and the map is refused.

**R3.1.5 — A regulatory trend names its instrument and the date it bites**, or says the date is unsettled.
A regulation that reaches the run only at stage 5 reaches it two stages after knowing would have shaped the
solutions.

**R3.1.6 — The egress regime is named** (`C76`).

**R3.1.7 — Nothing is written to the store outside a run** (`C24`).

### Step — Market content extract, the bridge

**R3.2.1 — It declares no tools, and the agent running it holds fetch and search, so it is instructed to fetch and search nothing while it runs.** `tools: []` in the contract.

**R3.2.2 — It carries no position and owns no stage number, deliberately.** It sits between fetch and
authoring for **both** researching steps. **Reading it as step two of four would say the landscape is
mapped before anything is extracted**, and the guardrail on 3.1 says the opposite.

**R3.2.3 — Facts only, no confidence.** The bridge reduces a fetched page to structured facts. Confidence
is derived later, from the source set.

**R3.2.4 — No input lowers the floor.** Declared, and **decided by no check**.

### Step 3.2 — Deep dive

**R3.3.1 — One record per participant, and the singular `card:` on each.** The identity key is the
`item_id`.

**R3.3.2 — The single-record shape cannot be added to.** The checker folds a production record onto its
artifact first-wins: a record carrying `cards:` sets the list once and a second is dropped with no message,
and **only the singular `card:` appends.** A second round written as `cards:` sits on disk, cited and
joined, while every content check reads only the first, **and the gate fails on it** (`C138`, at every gate).

**R3.3.3 — A second round is ordinary rather than an exception.** The card aim is ten and the research
bound is ten per production, so a market reaches the aim in one pass only if every branch succeeds, and the
per-participant record is what lets a second round deliver anything at all.

**R3.3.4 — The source floor is four independent sources per card, two where a person supplied the market, with at least one primary**, primary
meaning material the participant published about itself, where the publisher key equals the card's identity
key. **A press release and three outlets reporting it are one source.**

**R3.3.5 — The floor is carried by the standards and moves with their version, and this spec names the rule
rather than the number.** **The floor is set where a run can meet it**, because a check that is always
signed off stops being read. A stage is held to the floor of the Standards version it recorded (`C60`); on a
supplied market nothing is searched, so the list is every address the stage reads.

**R3.3.6 — Every card shows when it was researched, and a card past its freshness threshold is re-researched,
never edited**: 180 days for a `direct` participant, 365 for `adjacent` and `substitute` (`C8`, `C9`). Re-researching
rather than editing is the agent's instruction. Both stay in `Q3` while reuse is suspended; researching a participant again writes a new
card and the prior version is retained.

**R3.3.7 — Confidence is recomputed, not read** (`C66`). This is the stage 2 trust rule applied here: **a
derived value that nothing recomputes is an asserted value with a better name.**

**R3.3.8 — Fetching and writing the durable store are separate steps with a reduction between them.** A
fetched page reaches the store as structured facts or not at all. Stage 3 itself writes nothing to the store,
which is built from committed runs (§7.1). The guardrail is decided by no check.

**R3.3.9 — Where the supplied folder holds anything, the person is asked once, before any card, whether any of
it is internal to the bank or not public.** The question is fixed, in English and in Czech, and names each item
the task listed, a list pasted in the chat included. The agent is told to write `confidential: yes` on every card
resting on an item the person names, `confidential: no` on every other card resting on supplied material, and
`yes` on a card resting on a page that says it is internal, whatever the answer. **No gate check reads the field;
the keep task does**: a card marked `yes`, or resting on supplied material with no answer, stays in the run when
its competitors are kept.

**R3.3.10 — On a supplied market, every source of a card the run researched itself names the page it read**,
on the list or under a listed page (`C184`). **On a run started on build 1.16 or later, every card source's address
is the page that was opened, searched or supplied**: an address that is a site's front page, its path `/` or empty
with no query, is refused (`C184`), and so is a source recording no address, since a search result is not a source.

### Step 3.3 — Synthesis

**R3.4.1 — It declares no tools, and the agent running it holds fetch and search, so it is instructed to work on the cards and reach nothing.**

**R3.4.2 — Every element traces to a card or a named source** (`C3`).

**R3.4.3 — A standard rests on two participants, and every promoted opportunity is either answered by the
market or named as an absence** (`C56`); **a standard's tier follows from its count** (`C87`).

**R3.4.4 — A verdict is four parts** (`C84`).

**R3.4.5 — `A7` is never written to the store.** The contract is run-scoped and the tool list is empty, so
it holds twice.

---

# Part 4 · The outputs and their sections

| | File | Class | Goes to |
|---|---|---|---|
| `A5` Landscape Map | `3-competitive-analysis/1-landscape-map.md` | **asset** | Deep dive · the store, where the run is a committed example run or one a person keeps |
| `A6` Competitor Cards | `3-competitive-analysis/2-competitor-cards.md` | **asset** | Synthesis · the store, where the run is a committed example run or one a person keeps |
| `A7` Competitive Synthesis | `3-competitive-analysis/3-competitive-synthesis.md` | **asset** | Stages 4 and 5 |

**All three are assets and none is an output**, which is the whole reason the stage has no sign-off. An
asset is there for depth and is not required reading.

**A card is a document about a participant and not a data structure with prose attached.** The record keeps
only the fields a gate reads; everything a person reads is a section of the body, so a person meets a finding
before a coverage table.

**A trend carries impact, horizon, lifecycle, description, evidence and what it implies for this
initiative**, with ids by class: `B1..B5`, `T1..T5`, `R1..R5`.

---

# Part 5 · Compliance

**Stage 3 runs no regulatory screen, and the regulatory work it does is research rather than compliance.**

**The regulatory trend class is the stage's compliance-adjacent output and it is not a screen.** It records
what the market is moving under, with the instrument named and the date it bites. **Nothing here decides
whether this run's ideas engage a regime**, because there are no ideas yet. That is stage 4's screen.

**The egress control is the compliance-relevant mechanism, and what is checked is the record the run keeps.**
A stage-3 artifact that reached outward names the regime it researched under, and a run handed its market list
records that it worked from it (`C76`, `C182`). **Both run at `Q3` on every run, and both read what the agent
recorded.**
**Where the agent reaches, and whether it searches, are instructions**: it holds fetch, and web search wherever
the extension is installed, in both ways of working, and nothing detects or blocks a search.

**Whether material may leave at all is a decision recorded outside the stage**, in the egress registry, and
the stage reads it rather than asking.

---

# Part 6 · Scoring and confidence

**Stage 3 produces no score. It produces a confidence band per card, and a band is not a score.**

**The band is recomputed from the card's own sources and fields at the gate** (`C66`), so a producer cannot
write one. It ranks nothing, nothing sorts by it, and it does not travel into a comparison.

**A derived value is only as good as the fields it derives from still existing.** A band reading a field the
standards have retired can never reach its top value.

---

# Part 7 · Artifacts, records and the store

## 7.1 The store is the only thing in this workflow that outlives a run

**`S1` holds the reusable half of the landscape and the cards, stamped with its research date.** The shipped
store is built from the committed example runs and from any run a person keeps with `SPOCK: keep this run's
competitors`, which copies that run's landscape and card records into the committed corpus, from which the
store is regenerated. An agent cannot run the task. **The task copies only the cards that may leave the
run**: a card marked `confidential: yes`, or resting on supplied material nobody said was public, stays in its
run, and the task says how many stayed. The shared store never shows a confidential card, and names no person as
its owner: it reads *to be named by ČS*. **Stage 3 writes what it finds into the run's own `A5` and `A6`, never
into the store.**

**Nothing is meant to be reused from it: reuse is suspended from build 1.7, by instruction to the agent.**
**An identity key carries across runs while the research behind a card does not**, because a card is written
against its run's question and the store does not record which question that was. Until a stored card records
it, the agent is told to research every participant; no check refuses a reuse entry (§2.1). The cost curve the store exists for, where the tenth initiative costs a fraction of the first,
has no observations behind it.

## 7.2 What protects it

| | |
|---|---|
| `C24` | Guards against work done outside a run reaching the store |
| The two-step rule | Fetching and writing are separate, with a reduction between them |
| `C8` | Guards against a card whose age nobody can see |
| `C9` | Guards against a stale card passing as current. Editing a stale card would produce a fresh-looking card resting on old research, so the agent is told to research it again |

## 7.3 Records

`landscape-map` · `market-content-extract` · `deep-dive-cards`, **one record per participant** ·
`competitive-synthesis`. **The cards are written as one part file per participant**, in
`3-competitive-analysis/parts/`, and the agent writes only three regions of `A6` itself: the opening prose about
the set, `What we could not establish` and `How this was produced`. `SPOCK: stage 3 — join the cards, then the
store` splices `A6`'s card region from the part files word for word (`card-join.mjs`), then regenerates the store
(`store.mjs`). The workflow writes the frames of `A5`, `A6` and `A7` before the agent writes, with `[[fill: …]]` in
every place that is the agent's; stage 3's documents carry no opening block. The person's market list, where there is one, is the one
file in `3-competitive-analysis/supplied/`, recorded on the run record with its fingerprint.

---

# Part 8 · Gates and checks

## 8.1 What `Q3` is

**Twenty-two checks of its own and forty-five universal.** The own set: `C3`, `C8`, `C9`, `C24`, `C54`,
`C55`, `C56`, `C60`, `C66`, `C75`, `C76`, `C81`, `C84`, `C86`, `C87`, `C88`, `C101`, `C137`, `C181`, `C182`,
`C184`, `C190`.

**Each check's full rule is in the check register** (see the README). The four that read the supplied route,
and what each guards against:

| Check | Gate | What it guards against |
|---|---|---|
| `C181` | `Q3` | The market list a run worked from changing or vanishing after it was recorded |
| `C182` | `Q3` | A run handed its market quietly working from something else, or dropping a competitor it was given |
| `C184` | `Q3` | A card on a supplied market resting on pages the person did not give, and from build 1.16 a card source citing a site's front page rather than the page read |
| `C190` | `Q3` to `Q7`, never signable | Material in a run's supplied folders that never came in through intake, or changed after it did |

**`Q3` is the whole of this stage's acceptance**, because there is no human gate. **That makes it the one
gate in the workflow where a missed check is not caught by anybody reading afterwards.** A failure the run
cannot meet can still be signed by a person, as at every gate (stage 1, `R3.8.2`), and the stage is then
accepted carrying the failure.

## 8.2 The three guardrails no check decides

**Stated here rather than implied, because a stage nobody reviews cannot afford an implied control.**

| Guardrail | On |
|---|---|
| **Authors only from the bridge extract** | 3.1 |
| **Never fetch and write the store in one step** | 3.2 |
| **No input lowers the floor** | the bridge |

**All three are hard stops or contract rules and none is a check.** A run that broke one would pass `Q3`.
**No check yet decides any of them**, because no reading of the artifacts can establish how the research was
done.

## 8.3 The four hard stops

`authored_from_raw_external_text` · `egress_destination_unnamed` · `free_roam_write_to_the_store` ·
`trace_missing`.

## 8.4 What the gate cannot decide

**Nothing decides whether the market was read correctly.** The gate decides that every claim traces, that
sources are independent by key, that floors hold and that confidence was derived. **Whether the ten
participants are the right ten, and whether the five trends are the five that matter, is a judgement this
stage has nobody to make.**

**No automated judge runs a judged rule at this gate, and no person is asked.** A gate's questions are asked
in the approval, and stage 3 takes none, so its question stays on the record as one no person judged.

---

# Part 9 · The decision, and there is none

**Stage 3 carries no human decision, by decision.** The contract's `human_gates: []` is the statement, and the
reason is that its output is read inside stage 4, where the solutions are bound to it. The one thing a person
can sign here is a failure the run cannot meet (stage 1, `R3.8.2`).

**What a person does instead is read `A7` inside stage 4.** The agent is instructed to open by asking for the
market list and to wait for the word to begin (§1.2), and nothing is recorded as a choice.

**A person's route into the market read is the supplied list.** Before the stage starts, a person can hand
over the competitors and the trends themselves, three to five per class, and the agent is instructed to work only from them.
Stage 4 marks a solution a person proposed as `origin: person`, and stage 5 lets a person add up to three
options of their own. **Once stage 3 has begun, a trend the person knows about goes in only by asking the
producer**, and nothing records that it came from a person, because no stage 3 artifact carries an `origin`.

---

# Part 10 · Loops and re-entry

| Move | What it costs |
|---|---|
| **A second deep-dive round** | **Ordinary rather than exceptional.** The card aim is reached in one round only if every branch succeeds (`R3.3.3`) |
| **Asking for more participants** | Free. Ten cards is the aim with room above it; a supplied list is aimed at its own count, never below three and never above ten |
| **Asking for more trends** | **Only where that class came back at three or four.** A class at five that is asked for more goes to seven and the map is refused. **Name the candidate and ask whether it displaces one**, which forces the ranking the step exists to produce |
| **Deeper evidence on one trend** | Always legal, and touches no cardinality check |
| **Rework** | Counted by the workflow at each gate from the documents that changed since the last one, and on a run started on 1.12 or later from the stage's records too. Nothing is recorded by hand |
| **An earlier stage sent back or re-run** | Marks this stage stale where it holds a gate result, whatever changed |
| **A market list changed after it was recorded** | Printed before and after with both fingerprints and taken in by `SPOCK: what market material has been supplied` on the person's *yes*; once stage 3 is in review or accepted, the stage is sent back first |

---

# Part 11 · Bounds

| Bound | Value | Step | On reaching it |
|---|---|---|---|
| Participants mapped | **25** | 3.1 | Declared in `skills.yaml` and the contract |
| Search iterations | **8** | 3.1 | Declared in `skills.yaml` and the contract |
| Participants researched | **10** | 3.2 | **Per production**, declared in the stage's workflow contract. The aim of ten is reached in one round only if every branch succeeds |
| Sources per card | **10** | 3.2 | A ceiling, against a floor of four, or two where a person supplied the market. Declared in `skills.yaml` and the contract |
| Wall clock | **90 minutes** | 3.2 | Declared in `skills.yaml` and the contract |
| Elements per category | **7** | 3.3 | Declared in `skills.yaml` |
| Participants carrying a card | **Aim 10; on a supplied market, the list's own count held between 3 and 10** | — | Held by `C75`. A shortfall below the aim passes where it is stated. No ceiling on cards |
| Trends per class | **3 to 5** | 3.1 | **Five is a ceiling, not a target**. Declared in the Standards and read by `C81` |
| Representatives per trend | **2 to 3, floor 2** | 3.1 | Declared in the Standards (§2.2); a trend nobody represents is recorded as a finding |

**The source floor, the card aim and the trend counts are held by checks (`C60`, `C75`, `C81`); the other
bounds are instructions to the agent.** It is instructed to record reaching one in `bounds_hit[]`, and no check reads
that it did.

---

# Part 12 · What the build does not yet do

| Where | The gap |
|---|---|
| §8.2 | No check decides the three guardrails |
| §9 | Nothing records a trend a person asked for once the stage has begun |
| §7.1 | The store reuses nothing: reuse is suspended until a stored card records the question it was researched for |

---

# Part 13 · Open questions

- **Should the three guardrails stay unchecked?** Each is a hard stop or a contract rule, and at a gate with
  no human reader an unchecked rule is a rule nothing observes.
- **Is the store worth keeping while nothing reuses it?** Reuse is suspended because a card answers its own
  run's question. Either a card comes to record that question or the store's purpose is narrower than its
  name.
- **Does a stage with no human gate belong in a governed workflow?** The empty list says it is deliberate,
  and it means `Q3` is the only reader stage 3 ever has.

---

# What this spec does not fix

- **No automated judge runs the judged half of `Q3`**, and this is the gate where that matters most, because
  there is no person after it. No person is asked either: with no approval at stage 3, its question stays on
  the record unjudged.
- **Nothing establishes that the market was read correctly.** Every check here is about traceability,
  independence and floors. **A confident, well-sourced, wrong picture of the market passes `Q3`.**
- **The store's premise is unobserved.** Every claim about the cost of the tenth initiative rests on a
  reuse that has never happened.
