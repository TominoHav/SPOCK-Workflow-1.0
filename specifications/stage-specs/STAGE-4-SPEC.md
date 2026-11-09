# Stage 4 — specification

**2 October 2026** · **Release:** 1.14

**This describes the stage that exists.** Where the build does not yet do something this stage needs, the
part it belongs to says so in the present tense, with the reason: `A5` as an input (`R2.1a`), the open
compliance items travelling to the PRD (`R5.11`), among
others. **A spec that describes an intended stage is how a reader comes to believe a thing runs.**

**Parent contract:** [PILOT-BUSINESS-LOGIC.md](../PILOT-BUSINESS-LOGIC.md). **Both describe the latest
release, and where either disagrees with the build, that document is the defect.**

**The reasoning behind it is not in this repository.** The evidence and the options considered, the worked
example and the live-run failures this answers were written up separately, from the raw session journals of
the live runs. **They are deliberately not copied here**: this repository ships, and a decision's working is
not part of what ships.

---

# Part 1 · Purpose and scope

**R1.1 — What the stage is for.** Generate several distinct ways to address the run's prioritised
opportunities, screen each against the compliance map, state how each serves the strategy, and put the set
in front of a person who selects one.

**R1.2 — Why here.** This is the first stage at which a solution is legitimate. Solutions are generated
**against** opportunities, **several per opportunity**, so the chosen one is chosen from alternatives
rather than defended afterwards (Method Canon §4.4).

**R1.3 — What the stage does not do.** It does not test anything, it makes no compliance judgement, it
does not rank, and it does not choose. **A person chooses at `G4`.**

**R1.4 — What good looks like.** Ideas that are genuinely different bets, each an answer to a problem the
run promoted, each screened against the same map, and a set a person can decide from in one reading.

**R1.5 — What poor looks like.** Several ideas that are each somebody's first idea, none explored in
depth (Canon §15.3). Four variations on one bet.

---

# Part 2 · Inputs

**R2.1 — Required.**

| | | what it gives |
|---|---|---|
| `A1` | the initiative brief | the outcome, the segment, the product goal and metric, the constraints |
| `A4` | prioritised opportunities | `primary[] 1..3`, `secondary[] 0..5`, **and each one's stated outcome, a change in behaviour** |
| `A7` | competitive synthesis | the standards, patterns and trends distilled against this run's opportunities. **The elements every idea binds evidence to** |
| `A3b` | framed opportunities | **the outcome and the segment each promoted opportunity states.** Read by `ideation`, and not named by the stage-level contract |
| `A5` | the landscape map | **Not read.** See `R2.1a` |

**Which source names what.** The contract's `ideas` step names `A1`, `A4` and `A7`; the registry's `ideation`
entry and the skill page name those and `A3b`. Nothing names `A5`.

**R2.1a — The stage does not yet read `A5`, because neither the contract step nor `ideation` names it.** What
reading it would give: `A7.trends[]` is `0..n` and can legally be empty, while `A5` carries nine to fifteen,
so a stage reading the synthesis alone can arrive at *why this bank* with no trends at all. And
`unrepresented_trends[]` exists on `A5` and on nothing else: a movement the market has not answered is the
closest thing this workflow produces to an unclaimed space, and stage 4 does not see it. **`supported_by[]`
cites synthesis elements only** (`C5`), so reading `A5` would widen what a producer reads and change no
binding and no check.

**R2.2 — Know-how the producers read.** The four area cards · `compliance-guidelines.md` ·
**`screening-inputs.md`**, which `R3.3.3` and `R5.4` resolve a *cannot tell yet* against ·
`strategy-basis.md` · `method-canon.md` · **`discovery-craft.md`** · **`stage-4-shapes.md`** ·
`output-voice.md` · `documentation-standards.md` · `agent-interaction.md`.

**R2.2a — The two bodies that carry the most of this stage.**

**`discovery-craft.md` is bound to `ideation`** (`bound: 2026-09-07`). Thirteen sections, and it is
knowledge rather than instruction: what a producer knows before it starts, so it can recognise a weak input and say why in a
sentence a person can check. Stage 4 leans on three of its sections — §2 a problem is a behaviour, §6
several options beat one and two options sharing a premise are one option, §8 a capability list washes out
and a comparison decides.

**`stage-4-shapes.md` is bound to `ideation`** (`bound: 2026-09-06`). It is keyed on gate messages rather
than on rules: each entry gives the refusal, the shape that produced it, and the shape that passes, because a
producer can declare every rule correctly, still write the wrong shape, and spend its budget reading
`check.mjs` for what would pass. **It documents the eight sections Part 4 sets.**

**R2.3 — If `A7` is absent.** Bind evidence to what the brief and the opportunities carry, and mark the
set `evidence_basis: pre_synthesis`.

---

# Part 3 · The steps

**Eight steps, numbered 1 to 8. Two need a person: the presentation at Step 7 and the decision at Step 8.**
No instruction puts the slate at Step 1 to a person. Step 5 is not a step of its own. It is §7 of the idea,
written inside Step 2, and it is listed separately because it is distinct work.

> **Stage 4 produces no score of any kind.** Strategic alignment is a statement rather than a number,
> and there is no regulatory complexity band. **The touchpoint list and a count take their place.** Part 6
> carries the reasoning.

### Step 1 — The slate

**R3.1.1** One invocation. It names the set and authors no idea.

**R3.1.2** It reads each primary opportunity's **stated outcome** first, and generates against it.
**The driver is idea quality and opportunity fit — how well the idea answers the problem.** Not coverage
arithmetic.

**R3.1.3** Each entry carries `id`, `solves[]` and `supported_by[]`, and nothing else. **The ids are `SOL1`,
`SOL2` and so on, in set order.** The name, the statement and the sections belong to the authoring invocation,
in the idea's own part file.

**R3.1.3a — `solves[]` is everything the idea actually addresses.** An idea names every opportunity it
genuinely changes something for, and **the secondaries are a fact about the idea rather than a target to
hit**. No check counts them.

**R3.1.4 — Five by default, floor three, and a person may take it to ten.** The slate generates five.
Once the set is presented, a person adds ideas of their own or asks for more, up to ten in the set. **The
ceiling is meant for a person to reach**, because every idea past the fifth is another seven sections and
another pass over the four cards, and that is a cost somebody should choose rather than inherit. The agent is
instructed never to generate past five; the set holds three to ten whoever wrote the ideas (`C4`).
An idea a person proposed carries `origin: person`, and the producer is instructed never to set it on its
own.

**R3.1.4a — The arithmetic decides how many distinct ideas a run can hold, and a short set says so.** With
three prioritised opportunities there are at most three combinations none of which sits inside another; with
four, six; with five, ten. Where the arithmetic will not carry five, the agent is told to say so and to write the
number it will carry. **With fewer than three prioritised opportunities it is told to form three solutions
anyway**, sharing the opportunities there are, and to open the solution set with one sentence saying which share
which and that stage 2 prioritised fewer than three. No check reads the sentence.

**R3.1.5 — The one coverage rule.** Where `A4.primary[]` holds two or more, the set's `solves[]` lists name
**at least two distinct primaries** (`C26`). Where it holds one, there is nothing to spread across. **The
slate does not yet record a primary no entry takes**, because neither the slate's fields nor the field spec
carry `unaddressed[]`.

> **This is a floor against a set that is really one bet, and it is not a distribution target.** Four
> strong ideas against `O1` and one against `O2` passes and should. **This stage is brainstorming**, and a
> rule forcing ideas evenly across opportunities would buy coverage with quality.

**R3.1.6 — Nothing in the build stops at the slate.** The skill lists the slate brief and the author briefs
as two tasks run in order, and no instruction puts the slate to a person between them, though the skill's
bounds still say a person may add to the set at the slate. A person who wants a different set adds or asks
once the set is presented (`R3.7.1`).

**Output:** `4-solutions/briefs/slate.md` · one brief per entry in `4-solutions/briefs/{id}.brief.md`

### Step 2 — Author each idea

**R3.2.1** One invocation per slate entry. **Each writes only its own files and opens no other idea's.**

**R3.2.2** It writes **sections 1 to 7** of Part 4, each to its own length and its own binding, and
nothing about compliance except the answers in Step 3. **§8 is generated and it never writes one** (`R4.4`).

**R3.2.3** **The area cards are held in context during generation**, so compliance shapes the idea rather
than being checked after it. *Compliant by construction.*

**R3.2.4** Effort is bounded **per instance**, not per step.

**R3.2.5** If it cannot author its idea, the agent is instructed to say so and stop, and at the join to list it
in `A8`'s `unproduced[]` with a reason a person could act on. **The assembly writes no such entry**: it builds
`A8`'s body from the parts on disk and keeps the front matter's other fields when it assembles again. A briefed
idea with neither a part nor an entry fails `Q4` (`C160`), and `C102` reads the entries.

**Output:** `4-solutions/parts/{id}.md`, and the idea's own record in `records/4-solutions/` carrying its answers

### Step 3 — The compliance sweep

**R3.3.1** The same invocation, immediately after writing the idea, onto the idea's own record (`R3.3.5`).
**Not a later pass** — a pass added afterwards reads the assembled set rather than the solution.

**R3.3.2** It answers **every question in all four cards** — 128 today — with `yes`, `no` or
`cannot_tell`.

**R3.3.3** A `cannot_tell` names the **input id** that would settle it, from `screening-inputs.md`.

**R3.3.4** It writes **no sub-domain states**. There is no 49-row table.

**R3.3.5 — Where the answers live, and where they do not.** All 128 go on **the idea's own record** in
`records/4-solutions/`, one record per authoring invocation keyed by `item_id`, which Step 4 reads and which
never reaches `A8` (`R7.2`). What reaches the reader is §8 of the idea: **the touchpoints that answered `yes`,
in full words**, the open items from the `cannot_tell` set with the input each one needs, and Step 4's
derived areas, flag and touchpoint count. **A hundred and twenty-eight rows is evidence the sweep ran, and the
audience is a product manager.**

**R3.3.6 — One line per answer, and the question is never restated.** `Q-id · verdict` and, on a
`cannot_tell`, the input id. Nothing else. **The producer holds the cards in context, so restating the
question buys a reader nothing and costs the answer block five times its size.**

**R3.3.7 — A fired touchpoint is printed as the card wrote it, and nothing is added.** §6 of every card
carries five columns: the id, the touchpoint, the question, the sub-domains it **engages**, and what it means
for the product. A `yes` prints **the id, the touchpoint sentence and the meaning sentence, word for word from
the card**, plus the engaged ids. **No producer paraphrase, no restatement against this idea, nothing
invented.**

> **Verbatim is what makes it checkable.** A copied sentence can be compared against the card by a
> script; a paraphrase cannot be compared against anything, and three of the four cards were written by
> this team rather than by ČS, so a producer rewording one is a second-hand claim with no original left
> to check it against.

**R3.3.8 — Grouped by area, in the card's own order, never by sub-domain.** `DP-01` engages `G1`, `G2`,
`G3` and `G11`, so a set grouped by sub-domain prints it four times. The area is the heading, the card's
own §6 groupings are the sub-headings, and each line carries the sub-domains it engages.

**Output:** the idea's record in `records/4-solutions/`

### Step 4 — Derive

**R3.4.1** A script, not a model. It writes **its own file beside the idea** (`R3.4.4`), before the
assembly runs.

**R3.4.2** It derives, for **all four areas always**:
sub-domains in play, from the `Engages` column of every `yes` ·
areas in play · the escalation flag, running each card's §11 **fires on an unresolved** column against the
`cannot_tell` set · the open items · **the touchpoint count**.

> **Sub-domains are worked out and not printed.** They are how the script knows which areas are in play,
> and `R3.3.4` already refuses the 49-row table. **What lands on the page is areas, not sub-domains.**

**R3.4.3** An area with nothing in play is written as an area with nothing in play. **It is never absent**,
because the producer does not write areas.

**R3.4.4 — Three files per idea, one writer each, one destination each.** A part is not one file with
regions in it.

| file | written by | goes to |
|---|---|---|
| `parts/{id}.md` — **sections 1 to 7** | Step 2's invocation | **`A8`, verbatim** |
| the idea's record in `records/4-solutions/` — the 128 | Step 2's invocation | **stays on the record** |
| `parts/{id}.compliance.md` — touchpoints, count, areas, flag, open items | **Step 4's script** | **`A8`, verbatim** |

**The assembly concatenates the first and third in slate order and copies nothing else**, so it never
chooses what to carry and `C104` compares `A8` against those two files word for word.

> **This is the `A8` / `A8b` argument one level down.** Delimited regions inside one file are a rule a
> producer is asked to respect, and this repository's own record is that such rules are the ones that
> break. **Separate files make the boundary structural**: the script cannot overwrite a section it has no
> file for, and the assembly cannot leak the 128 answers into `A8` because they are not in a file it
> reads.

**R3.4.5 — Derive runs after every author, and `.compliance.md` names the idea it was derived from by
content hash.** The assembly refuses a part whose derived file names a hash the idea file no longer has.
A re-authored idea under `R3.7.2` with a stale derived file would publish last version's compliance
against this version's idea.

> **A hash and not a timestamp.** Every fixture in this repository has the mtimes of whoever checked it
> out last, so a freshness rule reading the clock would fail nine committed runs on a fresh clone and pass
> a stale file that happened to be touched.

**Output:** `4-solutions/parts/{id}.compliance.md`

### Step 5 — Strategic alignment

**R3.5.1** **A statement, not a score.** It is §7 of the idea, written by the authoring invocation in
Step 2, and it is listed here because it is a distinct piece of work.

**R3.5.2** It names the **pillars** the idea serves and how, the **key result** if one fits with the chain
from the idea's own product metric, or **the reason no key result covers it**.

**R3.5.3 — The pillars and key results come from the Strategy Basis, never from the brief.** The basis
carries ČS's seven pillars, six objectives and twenty-five key results. The brief carries **this run's own
product goal and metric**, and the chain runs from that metric to a key result. **A statement naming a
goal the brief invented is naming nothing**, which is what the basis exists to prevent.

### Step 6 — Assemble

**R3.6.1** A script. `A8` is generated from `parts/{id}.md` and `parts/{id}.compliance.md`, verbatim, in
slate order. **No model invocation.**

**R3.6.2** A correction goes to the part and the assembly runs again. **The assembled file is never
edited.**

**Output:** `4-solutions/1-solution-set.md` (`A8`) · the record

### Step 7 — Present, and discuss

**R3.7.1** The person reads the set. **They may accept it, change an idea, or ask for a new one**, up to
the ten of `R3.1.4`. The fixed message that presents it says they will choose one, and only that one is taken
forward.

**R3.7.2** A new or changed idea re-enters at Step 2 and runs through Step 6. **Only that idea is
re-authored**, and nothing about the others changes, because nothing in this stage is relative to anything
else.

**R3.7.3** A changed idea is presented back before the decision.

**R3.7.4** The handover carries `R5.12`'s paragraph per idea and **names where the answers live**. It never
asks a person to read them.

**Output:** nothing new. `A8` is what is presented, and it is **the one document a person reads at `G4`** (`R7.5`)

### Step 8 — Select and sign

**R3.8.1** **Two tasks, in order, and the workflow writes the document.** The person records which solution they choose and why with
`SPOCK: record a decision I made` (box 1 `choice`, box 2 the id, box 3 why, their name, their role), then
approves `G4`. The decision task ends by saying what the stage still waits on: `G4`, the solution chosen, and
the approval task. **Before anything is recorded** the approval checks that exactly one choice stands on the
stage, that the chosen solution's part is on disk and that the document can be written, and takes the solution
from the recorded choice, since its boxes ask no id; any miss exits 3 with nothing recorded and says what to run
first. A choice typed as `SOL 5` is recorded as `SOL5`, and an id that is not in the set is refused with the
list. Then `G4` is recorded, `A9` is written whole from the run record with *Why this one*
copied word for word from box 3, the acceptance writes its decision block into it, and the join carries the
solution into its region (`R9.2`, `R9.3`, `R9.6`). **They are two acts because in one the reason has no box
of its own**, and nothing but an agent's own initiative would write `A9`.

**Output:** `4-solutions/2-selected-solution.md` (`A9`) · `G4` on the run record · stage `accepted`

---

# Part 4 · The idea, and its eight sections

## 4.1 What every section carries

**Sections do not collapse into each other because of their names. They stay apart because each carries two
things.**

**A · A length.** The table in 4.2 gives each section's own.

**B · A binding.** Each section names the earlier findings it must cite, such as opportunity ids, the segment
and synthesis elements, and the section on how an idea works describes the experience rather than the
architecture.

## 4.2 The eight sections

**Eight sections, with the segment folded into §4.**

| # | section | length | **binding — what it must cite** |
|---|---|---|---|
| **1** | **What it is** | crisp definition + 1–2 paragraphs | — |
| **2** | **What it does** | 1–2 paragraphs | **the change in client behaviour**, citing the opportunity ids it produces that change for. **Not how it works** — no mechanism, no screens, no steps |
| **3** | **How it does it** | 2–3 paragraphs | **concrete client and staff experience, not architecture** |
| **4** | **The problem it solves, and for whom** | 1–2 paragraphs | the problem in the client's terms, and **the segment the brief declares**. **Not the solution** — the client's situation as it stands today, before this exists |
| **5** | **Opportunities it is built on** | one line each | **every `solves[]` id**, each with what the idea takes from it. **Not a restatement of the opportunity text** |
| **6** | **Against the market** | 2–3 paragraphs, **two named parts** | **every `A7` synthesis element in `supported_by[]`, by id** — see 4.5 |
| **7** | **Strategic alignment** | 1–2 paragraphs | **a pillar the Strategy Basis declares**, and the key result with its chain or the reason none fits |
| **8** | **Compliance** | generated | `R5.12`'s paragraph, the fired touchpoints in full words, and **the touchpoint count** |

**R4.1** These eight, as headings, in this order (`C83`); the order is the skill's instruction.

**R4.2** The heading carries the id and the name the author gave it.

**R4.3 — Every section carries its length and its binding in the procedure**, per 4.1 A and B. **This is
the change that produces depth**, and it is independent of how many sections there are.

**R4.3a — And every section that could be mistaken for its neighbour carries what it must not contain.**
§3's *not architecture* keeps it from saying what §2 says in other words. **§2, §4 and §5 all point at the
opportunities**, so each carries one.

**R4.4 — §8 is generated and no producer writes it.**

**R4.5 — Front matter is short:** `part_of`, `item_id`, `statement` and `compliance_touchpoints[]`. **The 128
answers are not in this file at all** (`R3.3.5`), and §8 is the derived block, copied in by the assembly from
`parts/{id}.compliance.md`.

## 4.3 Why these eight

**§6 Against the market is not a style call.**

- **`C164` requires it**, and it is the section the market read reaches the decision through.
- **Stage 3 has no other consumer.** **Drop this section and the competitive synthesis reaches the decision
  gate through nothing a person reads.**

**The segment is a clause of §4 rather than a section.** **A run's brief declares one segment**, so a section
of its own would repeat one sentence in every idea.

**§2 is anchored to the change in client behaviour, and §3 answers how the idea does that.** The name *how it
does it* points back at §2.

## 4.4 What an idea does not carry

| not carried | consequence |
|---|---|
| **A separate bet** | **Two ideas betting on the same thing are harder to tell apart.** §6's standards part says what the idea deliberately matches |
| **What has to be true** | **The idea carries no assumptions, so the run hands none to Execution**, where testing them is the first thing ČS does |
| **A standalone segment or inspiration section** | The segment is in §4 and the synthesis element ids in §6, which satisfies `C164` in one place |

## 4.5 §6 Against the market — two parts, bound to stage 3's own categories

**Two parts: the standards it is built on and the trends it rides.** The competitive
synthesis already sorts its elements into exactly these, and each carries its own id space.

**Two parts, not three. The gap the idea exploits is not a part.** Stage 3
writes an absence under the opportunity it bears on and gives it no id of its own, so the part could be
written and never cited, and `C164` could not see it. **The opportunity is already named in §4 and listed in
§5**, which is where the gap was going to be visible anyway.

| part | what it says | cites | synthesis section it comes from |
|---|---|---|---|
| **Standards it is built on** | What the idea deliberately matches because the market has settled it. **This is the section that stops an idea being novel in the wrong places** | **the standards it rests on, by the id `A7` gave them** | *What this market treats as table stakes* |
| **Trends it rides** | The direction the idea is moving with, and whether it is ahead of the market or at parity | **the trends, and the patterns where it matches or breaks a shared one**, by the ids `A7` gave them | *Where this market is heading* · *What several participants do the same way* |

**R4.6 — Every id in `supported_by[]` appears in one of the two parts** (`C164`).

**R4.6a — Cite the id `A7` gave the element, whatever it looks like. There is no fixed prefix.** The
committed runs use `ST`/`P`/`TR`, `ST`/`P` with `TR-B`, `TR-T` and `TR-R`, `S`/`P`/`T`, and `SY` under `id`
rather than `key`, and some carry no element keys at all. **No prefix is enforced** (`C164`), and pinning one
would be a rule for stage 3.

**R4.6b — Only synthesis codes are citable**, because they are the only ones bound to this run's
opportunities and the only ones `C164` can resolve. The landscape map is not read (`R2.1a`).

**R4.7 — Nothing here is a bare difference claim.** *Unlike existing solutions* asserts a difference
against nobody. **Different from whom, doing what** (Discovery Craft §8).

**R4.7a — An absence the market read found is a gap in the research, never a gap in the market.** It is
said with what was read: which participants the market read covered, and what it says about its own
sources. **Only a confirmed negative, a participant shown to have chosen not to do something, is a gap to
fill** (Competitive Analysis Standards §3.1). A solution set that says its synthesis found a need *nobody
else has named*, over a market read whose source floor was unmet, has read an absence as a gap. The skill
states the rule in its own words, and `C94` holds that sentence to the standards' clause.

**Worked example.** Standards: the delivery rail — Bank iD, an in-app
questionnaire — is `ST`-level table stakes and the idea matches it deliberately, adding no new channel and
no new capture. Trends: **`T1`**, N26 prompts before a document expires rather than reacting to a failed
check, emerging but not yet standard, and ahead of the market; this idea extends that from document expiry
to the periodic cycle. **`T1` and not `TR1`**: that is the id this run's own synthesis gave it.

**This is why the section cannot be dropped.** §6 is the only place stage 3's output reaches the decision
gate through something a person reads.

# Part 5 · Compliance

**R5.1 — The card carries a question column.** Every touchpoint carries: an **id** · a **title** · a
**paragraph** saying what it is · **a closed question the solution answers** · the **`Engages`** column it
already has.

**R5.1a — Where the questions are written.** They are a column on each card's §6 table, **in the same row as
the touchpoint they belong to**, so the two cannot drift apart. They are written in the know-how definitions
and regenerated into the cards, never edited in the generated copy.

**A question is its touchpoint restated as a closed product question**: *the product stores personal data,
any field about an identifiable person* becomes *Does the solution store any field about an identifiable
person?*

**R5.1b — Written here and reviewed here, and that is a marked gap rather than a control.** The questions
are both drafted and reviewed in this repository. **The same hand doing both is what this workflow separates
everywhere else**, so **the product-not-bank rule is self-certified, and it is on record as indicative rather than
an independent check.** What would close it is somebody who did not write the questions reading a sample of
the 128 across the four cards.

> **The review is where the judgement is, and it is `R5.2`.** A question that asks about the bank instead
> of the product produces a wrong answer on every run from then on, and nothing downstream can catch it.
> **Each card's questions read as a block**, by somebody who can say *that one asks whether the bank
> is compliant, not whether the product does the thing.*

**R5.2 — The question is about the product, never about the bank.** *Will the product store personal
customer information of any kind?* is in scope. *Is the retention schedule adequate?* is not.

> **This is the most important rule in Part 5 and no check enforces it.** Whether a question asks about
> the product or about the bank is a judgement made once, when the 128 are written, and `R5.9` checks
> reachability rather than scope. **It is held by whoever writes them and by review**, and it is recorded
> as such so nobody assumes a check is watching.

**R5.3 — Three answers.** `yes` · `no` · `cannot_tell`. **`cannot_tell` never collapses into `no`** — one
says the solution was examined and does not do this, the other says it could not be examined.

**R5.4 — Every `cannot_tell` names its input id**, from the first column of `screening-inputs.md` §3.

**R5.5 — Every question is answered.** An unanswered question is a refusal, not a `no`.

**R5.6 — The `yes` answers are the touchpoints.** They render in the artifact **with their full title and
the card's own description.** The `no` answers are recorded and not rendered.

**R5.7 — Everything else is derived** (R3.4.2) and no producer writes it.

**R5.8 — The questions are ours, including on the ČS card.** `A1` came from ČS; the question text is
written here, and the ČS card says which of its sections are this project's, §6 among them.

**R5.8a — Which card each area comes from is recorded once, as its `source` in the RegMap**: one is `cs_card`
and three are `authored_here`. The producer writes no `area`, `filled` or `source` field.

**R5.9 — A card-quality property, not a per-run check.** Every sub-domain a §3 trigger names is reachable
from at least one §6 touchpoint, and it is what makes the sweep complete.

**R5.10 — A run with no `cannot_tell` anywhere is worth a second look, and it is not a failure.** The
questions ask about the product, and a well-written idea can honestly answer all 128, so this is an
observation put in front of the person at `G4`, not a rule.

**R5.11 — The open compliance items of the selected solution do not yet travel to the PRD**, because no field
on `A11` or on the PRD template carries them: `carried_unresolved` sits on `A3` and `A4` only. **So an open
compliance item answered nowhere at stage 4 reaches the handover with no owner.** Each open item names the
input that would settle it (`R5.4`). The touchpoints themselves do travel, into the expanded MVP and on to
the PRD (`C171`, `C131`).

> **This stage does not answer them and should not.** A `cannot_tell` at stage 4 says the idea was
> examined and the information was not there yet. **By the PRD there is a product to ask about**, and the
> answer belongs to whoever owns that input, outside this workflow. Only the selected solution's open
> items would travel; the others describe ideas nobody is building.

**R5.12 — §8 opens with one paragraph in plain words, and nobody reviews the answers.** The paragraph says
**what is in play, what escalates and where, and what is unresolved and what would settle it**. Then
**`# of touchpoints: X`**, the total across all four areas. Then the fired touchpoints as `R5.6` renders
them, grouped by area. Then **one line naming the record** holding all 128 answers for that idea.

> **The count is one number and it is not a score.** It says how many things this solution touches, and a
> reader can compare five of them at a glance. **It is not banded, not weighted and not placed against
> anything** — twenty touchpoints is twenty touchpoints, and whether that is a lot is the reader's
> judgement rather than the workflow's.

**R5.12a — And the agent is instructed to say the same thing when it hands the set over.** At Step 7 it
gives the paragraph per idea and points at `records/4-solutions/`, so a person who wants the line behind a
claim knows where it is without being handed it.

> **This is the design deciding what a person is asked to do.** Five ideas at 128 questions is 640 answers
> a run, and **a review of those was never going to happen** — the questions are reviewed once when they
> are written, and the answers are evidence a reader goes to rather than reading. **The paragraph is what
> gets read. The touchpoints are what gets scanned. The record is what gets opened when something looks
> wrong.**

---

# Part 6 · What replaces scoring, and strategic alignment

**R6.1 — Stage 4 produces no score.** Not an axis, not a band, not a number. **There is no regulatory
complexity band** and strategic alignment is a statement rather than a score, so there is nothing to
combine, rank or sort by.

> **What the band was for and why the touchpoints do it better.** It compressed *how much regulatory work
> does this drag along* into one of four words, placed by three facts. **The touchpoint list already
> carries those facts and says them in the card's own sentences**, so the band was a summary sitting on
> top of something more discriminating than itself, which is the same objection that rules out a weighted
> model. **A second summary of the same evidence is complication, not signal.**

**R6.2 — What §8 carries instead.** `R5.12`'s paragraph · **`# of touchpoints: X`** · the fired
touchpoints in full words, grouped by area · the line naming the record.

**R6.3 — The count is a count.** The total of `yes` answers across all four areas. **Not banded, not
weighted, not placed against a scale.** Per-area totals come free from the grouping and no rule asks for
them separately.

**R6.4 — Unanswered questions never move anything, and this is deliberate.** Two solutions touching the
same areas, one having answered everything and one leaving eighteen questions open because the idea never
says where data would be hosted, **come out with the same touchpoint count**. The second is not more
complex, it is **less known**, and those are different facts. The count says how much the solution touches
and `R5.12`'s paragraph says what nobody can tell yet. **Merging them would report uncertainty as size**,
which is the confusion the trust tag exists to prevent two stages earlier.

**R6.5 — Strategic alignment is not a score either.** It is §7 of the idea, in words. **The band's whole
content was chain length, which the statement already carries**, and a number restating a sentence is what
the weighted model was rebuilt to remove.

**R6.6 — What §7 must contain.** At least one pillar the Strategy Basis declares, with how the idea serves
it · the key result and the chain if one fits · **or the reason none does, naming the candidates
considered.**

**R6.7 — Nothing in stage 4 sorts, and that is structural rather than a rule.** With no band there is nothing
to scan and nothing to sort by. The person reads seven sections and a compliance paragraph per idea and
decides, which is what `G4` is for.

---

# Part 7 · Artifacts and records

| id | file | produced by | carries |
|---|---|---|---|
| — | `4-solutions/briefs/slate.md` | the slate invocation | the set: `id`, `solves[]` and `supported_by[]` per entry · **an instruction, not an artifact** |
| — | `4-solutions/briefs/{id}.brief.md` | `fanout.mjs` | one brief per entry · **an instruction, not an artifact** |
| — | `4-solutions/parts/{id}.md` | one authoring invocation each | **sections 1 to 7** |
| — | `records/4-solutions/A8-r0N-idea-set.record.md` | the same invocation | the 128 answers, one record per idea keyed by `item_id` · **never in `A8`** |
| — | `4-solutions/parts/{id}.compliance.md` | **`derive.mjs`** | the paragraph, the count, the fired touchpoints, areas, flag, open items · **§8** |
| `A8` | `4-solutions/1-solution-set.md` | **a script** | the front table, then the set assembled verbatim · **no score** · **the document a person reads at `G4`** |
| `A9` | `4-solutions/2-selected-solution.md` | **the workflow, at the approval, from the person's recorded choice** | every section written from the choice on the run record, *Why this one* copied word for word from it, the `G4` decision block, and the chosen solution carried word for word by `solution-join.mjs` |

**R7.1** Production records live in `records/4-solutions/`: one per authoring invocation for `A8`. **`A9` has no
production record**: the approval writes it whole from the choice on the run record, stamped `assembled_at`,
and only older committed runs carry an `A9` production record.

**R7.2** The 128 answers live on the record. **The artifact carries `R5.12`'s paragraph, the touchpoint
count, and the fired touchpoints in full words**, plus the line naming the record they came from.

**R7.3** `A8` carries no score, no rank, no ordering and no recommendation.

**R7.1a — Briefs are instructions to a producer and never artifacts.** No id, outside `records/` and
`read/`, and **no gate reads one**. They are in the table above because they are files stage 4 writes, not
because anything checks them.

**R7.2a — The answers are one record per authoring invocation, keyed by `item_id`.** Without the key a reader
cannot tell whose answer is whose, and the record is the place `R5.12` sends somebody who wants the line
behind a claim. Where no record holds an idea's answers, `derive.mjs` falls back to `parts/{id}.answers.md`,
the older place they were kept; no committed run carries one.

**R7.4 — `A8b` is retired and stage 4 has one artifact plus the selection.** It existed to carry
`scores[]`, `R6.1` leaves it nothing to carry, and **nothing downstream reads it** — checked against the
parent contract and the workflow file, where the only references are stage 4's own and the view's. Nine
committed runs keep theirs and the parent contract keeps declaring it, for the reason it already keeps
declaring `A1b` and `A8c`.

**R7.5 — `A8` is the gate document.** It is the one document a person reads at `G4`, and nothing is put
beside it.

**R7.6 — `A8` opens with one table, then the full write-ups in the same order.** One row per idea: **the id ·
the name its author gave it · the touchpoint count · the areas in play**, and **on a run started on 1.12 or
later a fifth column, `Opportunities`**, between the name and the count, listing the opportunities the idea
addresses in the order its slate entry gives them. The header is written in the run's language. A run started
earlier keeps its four columns to the end. The body follows in slate order and the table repeats nothing the
body does not say.

**R7.6a — The frames and the opening block.** The workflow writes each idea's part file as a frame before its
author writes (`fanout.mjs --phase author --write`), with `[[fill: …]]` in every place that is the author's, and
never overwrites a file on disk. **On a run started on 1.12 or later `A8` opens on a block the envelope step
writes from the record**, the facts carried from stage 2 and what changed (`C206`).

**R7.7 — The table is an index and never a ranking.** Slate order, the same order as the body, **no
sorting and no column that implies better or worse**. The count is on it because it is a fact a reader
would otherwise gather by hand across fifteen pages, not because a smaller one is preferable. `R7.3`
already refuses an ordering on this artifact and the table is inside that rule, not an exception to it.

**R7.8 — An idea that was not authored does not yet appear on the table**, because the assembly builds a row
only from a part on disk. It is in `A8`'s `unproduced[]` where the agent listed it there (`R3.2.5`), and a briefed
idea with neither fails `C160`. **Four rows where the slate named five is a fact that belongs on the first page**,
not in a field somebody has to go looking for.

---

# Part 8 · Gates and checks

**R8.1 — One gate.** `Q4`, on the solution set once it is assembled.

**R8.2 — A person does not run it.** The gate fires on its trigger and the person is told the result.

**R8.3 — A refusal says what passes.** After each failure the gate prints the check's passing shape from
`.github/registry/shapes.yaml` and what to do, and where a shape names `stage-4-shapes.md` it points there.
`SPOCK: explain what the gate failed` lists the same for a person, under the document each failure is about,
and records nothing.

### What the checks verify — floors, not craft

**Each check's full rule is in the check register** (see the README); the table says what each floor guards
against.

| | check | gate | what it guards against |
|---|---|---|---|
| **K0** | `C4` | `Q4`, `Q5` | A set too small to compare, or too large to read |
| **K1** | `C5` | `Q4` | An idea that answers no problem the run promoted, or rests on no market finding |
| **K3** | `C26` | `Q4` | A set that is really one bet on one problem |
| **K4** | **none yet** (`R8.3a`) | — | A promoted opportunity vanishing at stage 4 with no page saying so |
| **K5** | `C103` | `Q4` | The same bet entered several times in different words |
| **K6** | `C83` | `Q4` | An idea missing a section its reader needs |
| **K7** | `C106` | `Q4` | An idea a reader can find only by its code |
| **K8** | **none yet** (`R8.3a`) | — | An idea with no stated tie to the bank's strategy |
| **K9** | `C125` | `Q4` | A compliance question left unanswered for an idea |
| **K10** | `C126` | `Q4` | An open compliance question that names nothing anyone could find out |
| **K11** | `C153` | `Q4`, `Q5`, `Q6` | A touchpoint or trigger the area's own card does not declare |
| **K12** | `C125` | `Q4` | A compliance section saying something its answers do not |
| **K13** | `C126` | `Q4` | An area left off the page because nothing in it fired |
| **K14** | `C129`, `C166` | `Q4` | An escalation or a summary disagreeing with the answers behind it |
| **K15** | `C59`, `C70` | `Q4` | The set arriving at the decision already ranked, scored or chosen |
| **K16** | `C102` | `Q4` | An idea lost from the set with nobody saying why |
| **K17** | `C160` | `Q4` | Work the fan-out was meant to do and silently did not |
| **K18** | `C164` | `Q4` | The market read reaching the decision through nothing a person reads |
| **K19** | `C104` | every gate | An assembled set saying something its authors did not write |
| **K21** | `C11` | `Q4`, `Q5` | The run going on with no choice, two choices, or a choice whose reason is lost |
| **K22** | `C7` | `Q4`, `Q5`, `Q6` | A compliance entry with nothing in it |
| **K23** | `C137` | `Q2`, `Q3`, `Q4` | An item the record holds that a person reading the document never meets |
| **K24** | `C190` | `Q3` to `Q7`, never signable | Material in the run that never came in through intake, or changed after it did |

**R8.3a — Two rules are not yet checked.** `K4`, because nothing on the slate or in the field spec carries
`unaddressed[]`, and `C26` holds only the floor of `R3.1.5`: **so an opportunity stage 2
promoted can legitimately get nothing at stage 4 and vanish with no page saying so.** `K8`, because no `Q4`
check reads §7.

**R8.3b — Nothing checks `A8`'s front table and nothing should.** The assembly builds it from the same
material as the body, so it cannot disagree with it. **A check there could only fail if the assembly were
broken**, which is `K19`'s job already.

**R8.4 — What no program can decide**, recorded rather than pretended: whether an idea answers the
opportunity it claims · whether two ideas are secretly the same bet · whether the depth is real or padding · whether something in a description
should have escalated.

---

# Part 9 · The decision

**R9.1** Two tasks, in order: the person records which solution they choose and why, then approves `G4`. **The
approval refuses with nothing recorded when no choice stands on the stage, or when two do.** They are two tasks
so that box 3 of the decision task asks why, rather than asking again what box 2 already holds.

**R9.2** The approval records `G4`, then writes `A9` whole from the run record, then the acceptance writes the
decision block into it and the join carries the chosen solution into its region. **No agent writes any part of
`A9`.** A document written before the approval is replaced by one written from the run record and kept in
`superseded/`, and `SPOCK: stage 4 — assemble the solution set` writes it again from the run record once the
stage is accepted.

**R9.3 — The reason is required and the approval does not complete without it.** Who selected, when, and
**why this one**: box 3 of `SPOCK: record a decision I made`, copied word for word under *Why this one*. **A
decision with no reason recorded is the one thing this stage cannot afford to lose**, because every stage after
it is built on the choice and none of them can see what it rested on. From 16 September 2026 the gate holds it
(`C11`).

**R9.4** No agent selects, and no agent signs.

**R9.5** Until the decision exists, `A9` does not exist. **A stub carrying only the gate name is a decision
record with nobody in it.**

**R9.6 — The approval has four boxes and attributes the stage to the signer**: their name, the role they
decide in (left empty to keep the role the run records for them), their answers to the gate's questions, and
what they asked to be changed before approving, the last two optional. Where `SPOCK: record who owns this
stage` named somebody else at the start of the stage, that person stays the owner and the signer is recorded as
accepting it. **One identity per signature, asked once.** An approval under a role other than the Product
Manager's is recorded as typed, with a heads-up that the Pilot Definition gives `G4` to the Product Manager,
unless the role reads as a slip (stage 1, part 9).

**R9.7 — There is no *none of these*, and the design is why.** A person who likes none of the five does not
refuse the set: they **change one, or add their own idea**, once the set is presented, up to
the ten of `R3.1.4`. **The set is theirs to alter until it holds something they will pick.** So a run always
ends this stage with one solution selected, and the *none of these* case never arises.

---

# Part 10 · Loops and re-entry

| when | what a person may do | what it costs |
|---|---|---|
| **After the ideas are written and the set has passed its check, before the decision** | Add an idea, change one, or ask for one against an opportunity nobody took | The idea gets written, its compliance questions answered, its summary rebuilt and the set reassembled. **`Q4` runs again at the approval**, because it passed over a set that no longer exists |
| **After the decision is signed** | Change or add to any idea | **The stage is sent back first** with `SPOCK: send a stage back to be redone`, because an accepted document stays as it was approved. `G4` and its decision end, and every later stage holding a gate result or an acceptance is marked stale. **Where the chosen idea itself changed, the reason recorded at sign-off was a reason for a different idea** |

**R10.1 — Changing an idea costs one thing more than adding one, and it is easy to miss.** An added idea
needs a slate entry it never had. **A changed idea needs its compliance answers redone**, because they
were about the version that no longer exists. The freshness rule refuses a summary built from an older
version of an idea, so a stale one cannot reach the set quietly.

**R10.2 — Adding or changing an idea after the check has passed leaves the result recorded, and the approval
runs the check again.** When the person approves, the approval sees the documents that changed since `Q4` ran
and runs `Q4` again before recording anything, because the verdict was recorded over a set that no longer
exists.

**R10.3 — The ceiling holds through every loop.** Ten ideas, `R3.1.4`, however many times a person
comes back.

**R10.4 — Nothing in this stage is relative, so a change to one idea changes nothing about the others.**
No count moves, no section is rewritten, and no idea is re-examined because its neighbour changed.

**R10.4a — A choice can be replaced after approval without sending the stage back.** `SPOCK: replace a
decision that no longer stands`, with kind `choice`, the new id, why, the person's name and role, the date of the
choice it replaces and why that one no longer stands, replaces every choice standing on the stage. The selected
solution is written again from the new choice, its decision block cleared and written again, and stages 5
onward are marked out of date and redone from it with `SPOCK: continue`. Both choices stay on the record.

**R10.5 — A later stage can send the run back here, with `SPOCK: send a stage back to be redone`.** If stage 5
or 6 finds the chosen solution unworkable, the send-back ends `G4` and its decisions and marks every later
stage that holds a gate result or an acceptance stale. **The ideas stay on disk, still written and still
screened.** A different choice is recorded with `SPOCK: record a decision I made`, and the next approval writes
`A9` afresh from the run record, moving the earlier text into `superseded/`. **A person picking a different one from
a set that already exists is cheap; starting a new run to change a choice would throw away three stages of
work.**

> **What re-entry does not do.** It does not re-run the stage. The ideas are not regenerated, the questions
> are not re-answered, and the slate is not rebuilt. **A different idea is selected and signed for, with its
> own reason** (`R9.3`), and the send-back is recorded as a person's act.

---

# Part 11 · Bounds

| | | |
|---|---|---|
| **Ideas the stage generates** | **5** | The default, declared in the skill |
| **Floor** | **3** | Below three there is nothing to compare. `ideas: "3..10"` in `skills.yaml`, read by `C4` |
| **Ceiling** | **10** | **Meant for a person to reach**, by adding once the set is presented. The agent is instructed never to generate past five; the set holds three to ten whoever wrote the ideas (`C4`) |
| **Opportunities one idea may name** | **no limit** | It names every one it genuinely addresses |
| **Ideas sharing an identical opportunity list** | **at most 3** | Four ideas on exactly the same opportunities is one bet in four costumes |
| **Compliance questions per idea** | **128** | 39 compliance · 32 GDPR · 27 ICT security · 30 legal. **All answered, every idea** |
| **Touchpoints an idea may fire** | **no limit** | It is a count of facts, not a budget. **A solution that touches thirty things touches thirty things** |
| **Assumptions per idea** | **none** | The idea says what it is and not what it is betting on |
| **Effort** | **per instance** | A bound set per step is spent by whoever runs first |
| **Emit** | **one item per write** | An over-ceiling emit produces nothing at all |

> **Why the default is five, and why one idea may name any number of opportunities.** Every idea past the
> fifth is another seven sections and another pass over all four cards, **and that is a cost somebody should
> choose rather than inherit.** A cap on how many opportunities one idea may name refuses an idea for honestly
> naming a fifth.

---

# Part 12 · What the build does not yet do

| Where | The gap |
|---|---|
| `R2.1a` | The stage does not yet read `A5` |
| `R3.1.5` | The slate does not yet record a primary opportunity no entry takes |
| `R5.11` | The open compliance items of the selected solution do not yet travel to the PRD |
| `R7.8` | An idea that was not authored does not yet appear on `A8`'s front table |
| `R8.3a` | `K4` and `K8` are not yet checked |

---

# Part 13 · Open questions

- **Should an idea whose reason for existing is an unanswered trend be able to cite it?** The only citable
  names are `A7`'s, and a movement the market has not answered is recorded on `A5` alone.

---

# What this spec does not fix

- **No automated judge runs the judged half of any gate.** No second model family is configured; the person
  who signs a gate answers its questions in the approval, and a question left out is recorded as skipped.
- **Nothing says how hard a solution is to build.** Technical complexity and operational change are not
  scored, and there is no scoring model, so **a three-year build and a three-week build are
  indistinguishable on the page.** The person at the gate is the only thing between them, and nothing tells
  them so.
- **Nothing compresses regulatory reach into something scannable, and that is deliberate.** A complexity
  label would, and there is none. **A person comparing five ideas gets five paragraphs and
  five counts**, which is more honest and slower to read. If a set of ten ever makes that unworkable, this is
  the trade.
- **The Strategy Basis coverage gap is ČS's.** No key result covers an access-restriction outcome, and §7 of
  an idea serving one states that none fits.
