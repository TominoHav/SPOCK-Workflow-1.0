---
name: ideation
description: >
  Generate five solutions, never fewer than three, from the brief, the prioritised opportunities and the market synthesis, each a
  distinct combination of opportunities bound to the evidence behind it. Writes solutions; never scores, ranks or
  selects. Trigger phrases: generate solutions, stage 4, ideation, what could we build, solution set.
---
# ideation

**Stage 4.1** · Agent `product-manager` · Pattern `single-shot` per invocation · **Composed as a fan-out** · Gates **Q4** then **G4**, and G4 is recorded on the selected-solution document the workflow writes, not on this one

## Contract

- **Inputs:** `{runs_root}/{run_id}/1-brief/initiative-brief.md` · `{runs_root}/{run_id}/2-problems/5-prioritised-opportunities.md` · `{runs_root}/{run_id}/2-problems/4-framed-opportunities.md` *(the outcome and the segment each promoted opportunity states)* · `{runs_root}/{run_id}/3-competitive-analysis/3-competitive-synthesis.md` · `.github/know-how/compliance/compliance-guidelines.md` · `.github/know-how/compliance/area-compliance.md` · `.github/know-how/compliance/area-gdpr.md` · `.github/know-how/compliance/area-legal.md` · `.github/know-how/compliance/area-ict-security.md` · `.github/know-how/compliance/screening-inputs.md` · `.github/know-how/writing/agent-interaction.md` · `.github/know-how/writing/output-voice.md` · `.github/know-how/writing/documentation-standards.md` · `.github/know-how/method/method-canon.md` *(§4.4 is what this stage is for, §13 solutions and the assumptions under them)* · `.github/know-how/product/stage-4-shapes.md` *(open it when a gate refuses something you wrote: it gives the shape that passes, and it is why nobody needs to read `check.mjs`)*
- **Output:** `{runs_root}/{run_id}/4-solutions/1-solution-set.md` — **the solution set as generated, and it carries no scores at all**
- **Record:** `{runs_root}/{run_id}/records/4-solutions/` — **the output above is assembled from a record and does not stand alone.** Read [`.github/instructions/record-and-output.instructions.md`](../../instructions/record-and-output.instructions.md) before writing either: the fields a gate decides sit on the record, and an output carrying a production field is refused (C107, C108, C109). **The workflow writes the frame of the output and its record; fill each `[[fill: …]]`.** **The envelope around them is not yours, and there is no task to run for it**: what is fixed comes with the frame, the checks read the rest as the workflow computes it, and the workflow writes that into the document when the person approves. On a run started before 1.16.1, `SPOCK: check what is written, then continue`, which you run after every document, fills it first.

**Before any of this, what you already know.** [`method/discovery-craft.md`](../../know-how/method/discovery-craft.md)
carries what is true about discovery work rather than what to put in a document: §2 that a problem is
something that happened to somebody, §6 that two options sharing a premise are one option, §8 that a
capability list washes out and a comparison decides. **It is knowledge, not instruction**, and where it and
a rule differ the rule wins.

**Strategic alignment is §7 of every idea and you write it.** Name at least one pillar
[`product/strategy-basis.md`](../../know-how/product/strategy-basis.md) declares and say how the idea
serves it, then the key result and the chain from the idea's own product metric, or the reason no key
result covers it and which ones you considered. **The pillars come from that body and never from the
brief**: the brief carries this run's own goal and metric, and a statement naming a goal the brief invented
is naming nothing. It is written, and no score is given for it. **Where the brief's goal serves Love Brand**,
its `key_result` is `unavailable`: name Love Brand, which the Strategy Basis lists in §2.1 outside its six
objectives, as the pillar the idea serves, give as the reason that it carries no key results by design, and
never cite the nearest key result in its place.

> **You cannot write a score here, and that is structural rather than a rule you are asked to follow.**
> No skill scores a solution and no `A8b` is written; **C70 refuses any
> scoring field on A8**, where one is now an intruder rather than an expected value. Before the split both
> skills wrote one file, so *no solution carries a score* was a claim about your output that nothing could
> check once scoring had touched it.
- **Exclusions:** does not score, rank, order or recommend · does not select (a person does, at G4) · **makes no compliance judgement and writes no complexity value** · holds no tool and reaches nothing outward

## Procedure

**You are invoked once per phase and once per solution. Which invocation you are is stated in your brief.**
Stage 4 is composed as a fan-out — one invocation names the set, one authors each solution, one assembles —
because a single pass asked for five solutions divides one budget of attention five ways and the last solution is
a sentence. **Nothing detects that**: the artifact is well formed, every field is present, and the
thinness is uniform enough to read as a house style (Workflow Blueprint R3.6-1).

**Read this before anything else. Your brief is a file, and it is at
`{runs_root}/{run_id}/4-solutions/briefs/`** — `slate.brief.md` when you name the set, `{id}.brief.md`
when you author one solution. **There is no brief for the last two steps**: the
compliance derivation and the join are scripts, not invocations, so nothing briefs them.

**If that directory is empty or your brief is not in it, the fan-out was not materialised. Say so and
stop.** **The four tasks are in the task picker, in the order they run**, and they are what this stage is
driven by:

| | task | what it does |
|---|---|---|
| 1 | `SPOCK: stage 4 — the slate brief` | names the set, authors none of it. You write the slate after it |
| 2 | `SPOCK: stage 4 — the author briefs` | one brief per slate entry. You write one solution per brief |
| 3 | `SPOCK: stage 4 — derive the compliance sections` | a script turns your answers into the section a person reads |
| 4 | `SPOCK: stage 4 — assemble the solution set` | a script builds `A8` from the parts, word for word |

Then open .github/last-task.md and read it to the end before you say anything about what the task did. The task tool hands you the output, and that file keeps all of it.

**Do not guess which step you are**: they write different things into one file, and two of them doing the
same job is the failure this composition exists to prevent. **The commands are not on the run's own page and no
operator types `fanout.mjs`**: a producer told so had to open `tasks.json` to find out what it could
actually run.

> **A stage 4 run as a single pass reads as a fan-out to every check but one**, and `C160` is what tells
> them apart.

### Phase 1 — the slate. One invocation, and it authors no solutions.

**1 — Read what the run has produced.** The brief (`A1`) for the outcome, segment and scope; the
prioritised opportunities (`A4`); the market synthesis (`A7`). Hold the Compliance Guidelines in context now,
before writing anything, so compliance shapes the solutions rather than being checked after.

**2 — Name five solutions, and never fewer than three.** Five is what this stage sets out to author and
`C102` reads `3..5` against it. **The ceiling on the finished set is ten and it is not yours** — a person may
add to the set at the gate, and `C4` reads `3..10` against what they leave behind. Two numbers, two
questions: what the machine produced, and what the person decided to keep. **A range here that matches neither
number is the one a producer follows**, because a producer follows its own page.

The unit of variation is **the combination of opportunities**,
not the wording of a solution. **Up to three solutions may share one identical `solves[]` list, and C103 refuses a
fourth**: they attack the same opportunities from different angles, and a fourth on the same list is one of the
three again. **C103 does not refuse a narrower list inside a wider one**, so the test below is yours to apply. Five
rephrasings of one solution is the failure
this rule exists to stop, and *each idea addresses a different subset* was the wording that let the other
one through: a strict subset is a different subset, so three of the card-disputes run's five solutions were a
fourth with an opportunity taken off it and the instruction had been obeyed. **The ladder reached the decision
gate on three committed runs before anything looked**, because the rule had been written for stage 5
options and the solution set was never read against it. A gate comparing a ladder is choosing how much of one
solution to do rather than between two, and the widest entry wins every time it is read. **The test is
comparative** — can either of these be described as the other plus or minus an opportunity — and where it can,
merge them or give the narrower one an opportunity the wider one does not have. **Three is a legal answer**
and so is five; the range is not a target to pad to.

**When a person asks for a base solution with variants, answer in these words, then carry on:** *"Variants of one
solution are what the next stage builds. Here I write solutions that each address a different combination of
opportunities, and the table at the top of the set shows which opportunities each one addresses and how many compliance
touchpoints it brings. Once you choose one at the end of this stage, stage 5 sets out several ways to pilot it, and you
compare those there."* In Czech: *"Varianty jednoho řešení vznikají v další fázi. Tady píšu řešení, z nichž každé řeší
jinou kombinaci příležitostí, a tabulka na začátku sady ukazuje, na které příležitosti každé odpovídá a kolik bodů dotyku
s compliance přináší. Až na konci této fáze jedno vyberete, fáze 5 navrhne několik způsobů, jak ho pilotovat, a ty
porovnáte tam."*

**How many distinct combinations the run can actually hold, which is arithmetic and not a preference.** With
three prioritised opportunities there are **at most three** combinations none of which sits inside another.
With four there are **six**, with five there are ten. **So a run that promoted three opportunities cannot
reach five genuinely distinct solutions**, and asking for five anyway is asking for two of them to repeat a
list. Count the opportunities before you name the set: where the arithmetic will not carry five, say so and
write the number it will carry. A short set with a stated reason is a finding; a padded one is the failure
this whole rule exists to catch, wearing the right number.

**With fewer than three prioritised opportunities, form three solutions anyway, sharing the opportunities there
are.** With one, all three solve it and differ in approach. With two, two solve one opportunity each and the third
shares a list with one of them. Open the solution set with one sentence saying so: which solutions share which
opportunities, and that stage 2 prioritised fewer than three. The person was told this at stage 2's approval.

**A solution somebody in the room proposed carries `origin: person`, and it is exempt from the ladder
above.** Absent is the ordinary case and means you wrote it. **You never set it on your own output** — it
records that a person contributed the solution, which is a claim only their having done so makes true. The
exemption is there because a person narrowing an idea already on the slate is making a point about scope,
and a check refusing that is telling them their own idea is invalid.

**3 — Cover the top-priority opportunities.** Across the whole set, at least two distinct top-priority `A4`
opportunities are addressed where two exist (**C26**), and every one no solution takes is recorded with a reason.
A single solution need not touch them all — the coverage is a property of the set,
and this is the only phase that can see the set.

**4 — Write the envelope and one entry per solution carrying `id`, `solves[]` and `supported_by[]`, and
nothing else.** **The ids are `SOL1`, `SOL2`, `SOL3` and so on, in set order, and nothing else is an id
here.** Twelve runs have written this seven ways — `I1`, `ID-1`, `IDEA-01`, `SOL1`, `Idea` and then `I1`
inside one run, no id at all, and one run invented `sol-adviser-parity` from the solution's
name. **The id is not a label and it does not have to mean anything**: what carries the meaning is the name
beside it in your H2 and the first line inside your file. A solution's id is the same string in the record,
in the heading and in the part filename, because the checks find your section by searching the body for a
heading containing the id the record gave it — **two strings for one solution and it finds nothing at all**. No `statement`, no `description`, no body sections. **An entry you write up here is a
solution the fan-out cannot then author**, and the composition is back to one generation.
- `solves[]` — at least one `A4` opportunity id. Empty makes the solution invalid (**C5**)
- `supported_by[]` — at least one `A7` synthesis element. Empty makes the solution invalid (**C5**)

A solution bound to no opportunity is a solution looking for a problem; a solution with no evidence is a hunch.

### Phase 2 — one solution. One invocation per slate entry, and you see one.

**Your brief names one id from the slate**, and it is the file
`{runs_root}/{run_id}/4-solutions/briefs/{your id}.brief.md`. It carries your `item_id`, the part path you
write, and that entry's `solves[]` and `supported_by[]`. Read `A1`, `A4`, `A7` and those bindings, and write
**that solution and no other**. If the file is not there, say so and stop rather than choosing an id.

**1 — Write your own file, and write nothing into the artifact.**
`{runs_root}/{run_id}/4-solutions/parts/{your id}.md`, carrying `part_of: A8` and `item_id: {your id}` in its front
matter along with your `statement` and your `compliance_touchpoints[]`. **You do not open the artifact and
you do not edit another instance's file.**

> **Writing your sections into the artifact body works only if the instances run one after another.**
> **Five of them running at once write over each other**, and the artifact is one file. Writing your own
> part also leaves an independent record of what you produced, which is the only thing an assertion that
> the join did not re-author you can be checked against (**C104**).

**2 — In your file, one H2 heading naming your solution, then seven sections in the order §6.9 fixes.**
**C83 reads these as headings**, not as bold labels, and your H2 carries your id and the name you gave the
solution (**C106**), because a join cannot restore a name you did not write and no field on the record
holds one.

**The headings are in the run's language**, the `language` A1 declares (English where it declares none): an
English run writes the `heading` column, a Czech run the `in a Czech run` column, never a mixture. `C83` looks
only for the set in the run's language, so a Czech run carrying `What it is` fails as though the section were
missing.

| # | heading | in a Czech run | length | what it must cite, and what it must not be |
|---|---|---|---|---|
| **1** | `What it is` | `Co to je` | a definition sentence + 1–2 paragraphs | The category and what makes it distinct. **A reader knows what the solution IS by the end of the first sentence** — no buildup, no context-setting |
| **2** | `What it does` | `Co to dělá` | 1–2 paragraphs | **The change in client behaviour**, citing the opportunity ids it produces that change for. **Not how it works** — no mechanism, no screens, no steps |
| **3** | `How it does it` | `Jak to dělá` | 2–3 paragraphs | **Concrete client and staff experience, not architecture.** The interactions, the inputs, the outputs |
| **4** | `The problem it solves, and for whom` | `Jaký problém řeší a komu` | 1–2 paragraphs | The problem in the client's terms and the segment the brief declares. **Not the solution** — the client's situation as it stands today, before this exists |
| **5** | `Opportunities it is built on` | `Příležitosti, na kterých staví` | one line each | Every id in `solves[]`, each with what your solution takes from it. **Not a restatement of the opportunity text** |
| **6** | `Against the market` | `Vůči trhu` | 2–3 paragraphs, two named parts | See below |
| **7** | `Strategic alignment` | `Soulad se strategií` | 1–2 paragraphs | See below |

**There is an eighth section and you do not write it.** `Compliance`, the same word in both languages, is
derived by a script from the answers you write on your record (step 2 of *The compliance section on every
solution*), and a hand-written one disagrees with the file the gate compares it against.

> **Two of these have older names a run may still carry.** `How it works` became `How it does it`, which points
> back at `What it does` and is the pairing that stops one drifting into the other. `Who it is for` was
> absorbed by `The problem it solves, and for whom`. **Writing the old names produces a solution missing
> every new one**, which is what `C83` will say.
> On a Czech run the old names are `Jak to funguje` and `Komu to je`, and the Czech example run,
> `2026-09-spending-insights` in `fixtures`, still carries them because it was written before the change: take
> the headings from the table, never from that run.

**`Against the market` is what the market read contributed to THIS solution**, and it is the one section
that exists because a person could not find something. **Two named parts and not three**: *standards it is
built on*, what you deliberately match because the market has settled it, and *trends it rides*, the
direction you move with and whether you are ahead of the market or at parity.

**Name each synthesis element by the id `A7` gave it, whatever that id looks like.** Runs have used `ST1`,
`TR-B3`, `S3` and `T1` for the same kinds of element; there is no fixed prefix and nothing pins one. **Use
the ids in your own `supported_by[]`** and say in a sentence what each one told you. **Every element you
put in `supported_by[]` appears here** — the field is on a record nobody opens at a decision gate, and ids
scattered inline through your other sections are not a place a reader can compare five solutions from.
`C164` reads the two against each other and refuses an id that resolves to no element.

**Nothing here is a bare difference claim.** *Unlike existing solutions* asserts a difference against
nobody. Different from whom, doing what.

**An absence the market read found is a gap in the research, never a gap in the market.** Finding nobody
doing something is not finding that nobody does it. Where you rest on one, say it with what was read: which
participants the market read covered, and what it says about its own sources. **Only a confirmed negative
is a gap to fill**, a participant shown to have chosen not to do something. *Nobody else has named this* is
an absence stated as a fact about every participant. **And never carry an absence forward as a gap to close.** *The one genuine gap*, *the cheapest open gap in the market* and *the market has moved* are what one stage 4 wrote over a market read that covered only the competitors a person supplied; the true sentence is *none of the participants read combines the two*. Where the synthesis you are given words an absence as a gap in the market, restate it as what the read covered rather than quoting it.

**3 — Your effort bound is yours.** It is set per instance rather than per step, because a bound set per
step is spent by whichever instances happen to run first (**R3.6-4**). Reaching it is recorded in
`bounds_hit[]`.

**4 — If you cannot author your solution, say so and stop.** Do not write a thin one to fill the slot. The
join does not record it: it goes in the solution set's `unproduced[]` with your reason at phase 3, and **a partial
set is a stated result** (**R3.6-3**).

### Phase 3 — the join. A script, and it transfers rather than writes.

**1 — `SPOCK: stage 4 — assemble the solution set` reads every part in `{runs_root}/{run_id}/4-solutions/parts/` and
assembles the artifact from them.** Read the artifact back and confirm every slate entry has its section under a heading carrying **both its id and
the name its author gave it** (**C106**).

**2 — Record every entry that did not come back in `unproduced[]`** in the solution set's front matter, each
with its `id` and a reason a person could act on. **The join writes no such entry** and keeps the one you write
when it assembles again; **C160** refuses a briefed solution with neither a part nor an entry here. **"It failed" is not a reason** — say what a re-run would do differently. **C102**
refuses a generic one, refuses an id that is also a solution, and reads the 3..5 bound against the solutions and
the losses together, so a fan-out that quietly dropped one cannot pass by being short.

**3 — The script transfers, and changes no word** (**R3.6-2**). It copies each part, and the compliance section
derived from it, into the solution set in slate order behind an index table, and carries the slate's ideas into
the front matter. **What it leaves to you** is each `[[fill: …]]`, the finding and the two closing sections among
them, and the `unproduced[]` entries of step 2. Write nothing between `<!-- SOLUTIONS -->` and
`<!-- /SOLUTIONS -->`: a change there is a second producer's, and the next assembly writes over it.

**4 — If a part and the joined document are reported as disagreeing, regenerate the document. Never read
both.** The part is the source and the document is derived from it, so the fix is always to rebuild, and
comparing them by eye is neither necessary nor reliable. **A producer tried it**: it
compared the two section by section, concluded they read identically, said it could not get closer without
a tool it did not have, and asked the person to look. The difference was one area and two triggers, in
plain prose, in a block it had listed as one it had checked. **It had probed by replacing passages with
themselves and being told they matched — having chosen passages that matched.** A negative result from a
probe that only samples where you are already looking is not a negative result.

**And a correction goes to the part, never to the joined document.** An edit to the assembled file is
invisible to the next fan-out and is silently overwritten by it. Two minutes after writing five parts, a
producer fixed a gate failure by editing the joined document; one part still carried the old text, and the
only reason anyone knew is that a check compares them.

> **The first join under this composition carried all twenty-five sections word for word and replaced
> every solution's heading with its bare id**, dropping the name each author gave it. The prose survived and
> the naming did not. **C104 compares the artifact against the parts** and refuses any difference beyond
> whitespace, so re-wrapping a line is allowed and changing a word is not. **C106 is the half that does not
> need parts**: it reads the artifact's own headings, so the same loss is caught in a set written in one
> pass, where there is nothing to compare against.

**5 — Write the fills and the `unproduced[]` entries one item per write** (**R3.6-5**). The script writes the
region whole, and a script has no output ceiling; an emit of yours over the ceiling produces nothing at all and
reads as work in progress, because its inputs are intact on disk.

**6 — Report the artifact, not the work** (**R3.6-6**). Say what the file contains after you have read it
back. A report describing what you ran is a claim about you; the gate's subject is the file.

> **No scores, no ranking, no ordering claim, no recommendation, in any phase.**
>
> **No superlative either, and no price without a source.** *Cheapest*, *lowest cost of the three* and
> *quickest to ship* name a favourite as surely as a score does. **Never say what a solution would cost the
> bank, how hard it would be or what the bank can already do, unless the brief, the problem material or the
> synthesis establishes it**: a market card says what a competitor does and nothing about this bank's systems.
> Compare two solutions on cost, effort or speed only where the run establishes both sides, and otherwise say
> it is not established (§3.8 of the Documentation Standards). This holds in the document and in the message
> that puts the solutions to the person.


> **You do not run the quality gate, and you do not score.** Scoring is a separate binding (`idea-scoring`)
> by design — the skill that writes a solution does not rate it. Never report a gate result for your own output.
> You may trigger it with `SPOCK: check what is written, then continue`, and triggering it is not running
> it: you relay what it wrote.

## Compliance shaping, which the guidelines now carry

**The Compliance Guidelines exist, so this reduction has ended.** *Compliant by
construction* operates. **A touchpoint marked indicative, or naming the body as absent, is now claiming a
reduction it is not taking** — the same defect the PRD skill records against `structure_basis:
non_standard`.

**Hold the four area cards in context before generating, and let them shape the solutions.** They are
[`compliance/area-compliance.md`](../../know-how/compliance/area-compliance.md),
[`area-gdpr.md`](../../know-how/compliance/area-gdpr.md),
[`area-legal.md`](../../know-how/compliance/area-legal.md) and
[`area-ict-security.md`](../../know-how/compliance/area-ict-security.md). **Read the touchpoint tables in
§6 of each, not the sub-domain lists.** A touchpoint names a thing a product does — storing an identity
document, deciding without a person in the loop, charging a fee that was not charged before — and you can
answer whether your solution does it. A sub-domain names a control and you cannot.

**Name each touchpoint by its identifier and say what the solution does that engages it.** The identifiers
are `TP-01` to `TP-39` for Compliance, `DP-01` to `DP-32` for GDPR, `LG-01` to `LG-30` for Legal, and
`IT-01` to `IT-27` for ICT and security. A named identifier is what makes coverage countable across runs;
free prose is why no two of the eight committed runs are comparable. C7 still checks each named touchpoint
is addressed.

**A8's `compliance_touchpoints[]` holds plain values and no sub-fields** (§6.9), so the identifier and the
sentence go in the touchpoint's own text. **Write no marker field for it.**

> **This paragraph has now named two wrong fields in a row and both were followed.** It first instructed
> `compliance_basis`, which appears in no schema and no marker family — an instruction to write a field
> the build does not declare either fails at `C42` or is quietly ignored, and it was the second. It was
> then corrected to `scores_basis`, which is a real marker belonging to **A8b**, the scoring artifact.
> **`C70` refuses any scoring field on A8**, so the correction traded a field nothing noticed for a field
> that fails the gate. The first agent to run this stage wrote it, faithfully, and Q4
> refused the artifact. **The lesson is not about either field name**: a skill telling a producer to write
> a marker is doing the field carrier's job, and the carrier is generated while this sentence is typed.

## The compliance section on every solution

**This replaces two retired skills**, `compliance-screening` at stage 1 and `option-screening`
at stage 4.2. **A product manager cannot say whether an idea engages a regime
before the idea exists**, so the stage-1 screen answered *cannot determine* on most of what it examined.
You have the solution in front of you, which is what makes the screen answerable.

**It is a section on the solution, in the same part file, written by the instance that wrote the
solution.** Never a document of its own, and never a later pass: a pass added afterwards would be reading
the join rather than the solution.

**It examines the solution. It makes no compliance judgement**, and that difference is the whole design.

**1 — All four areas, always, on every solution.** The section `derive.mjs` writes carries a heading for each
area the RegMap gives a card, and an area that engaged nothing says it was examined and found nothing: silence
and clearance look identical on a page and only one of them is a claim anybody made. **You write no `area`,
`filled` or `source` field.** Which card each area comes from is recorded once, in the RegMap.

**2 — You answer the questions; a script runs the triggers.** `derive.mjs` reads
your answers, works out which triggers fired, and writes the section a person reads with every fired
touchpoint printed as its card wrote it. **You write no trigger analysis and no prose about compliance.**
What you write is one line per touchpoint, all of them, **on your own record** at
`{runs_root}/{run_id}/records/4-solutions/A8-r0N-idea-set.record.md`, with `item_id` naming your solution.
The whole file is shown in `stage-4-shapes.md §6a`.

**Your record is the stage's record and it was never being written.** Stage 4's contract declares
`records: [idea-set]`; a run reached an accepted `G4` having written none, because nothing
in the build reads that line. **Cite your record in your own part** as `[rec:R-A8-0N]`, the way stage 3's
cards cite theirs — `C108` refuses a record the document it feeds never names.

**3 — Three states and there is no fourth.** `in_play`, `not_triggered`, `cannot_determine`.

- **`not_triggered` is a statement about the solution, never about the regulation.** Say what the solution
  does not contain. **The phrase *not applicable* is refused** — it is a compliance judgement and this
  workflow does not make them.
- **`cannot_determine` never collapses into `not_triggered`.** One says the solution was examined and
  nothing fired; the other says it could not be examined. They look alike on a page and they are opposite
  facts.
- **Every `cannot_determine` names the input that would settle it**, by its **canonical input id** — the
  bolded id in the **Input id** column, the first column of §3 of
  [`screening-inputs.md`](../../know-how/compliance/screening-inputs.md), such as `third_parties` or
  `security_measures`. **The *Card rows* column is not an id space**: `S-I4` and `C-I9` are pointers into
  one area card's own §4 table and a screen citing one is refused. `missing_input` goes on that state and
  on no other.

**4 — A section that resolved everything is a defect rather than a clean run.** Every unresolved entry
names what a reader has to go and get.

**4a — Write the summary, and write it for the person choosing.** Everything above is evidence that the
screen ran. The summary is the only part of this section a product manager reads, and it carries exactly
three things: **`in_play[]`**, the areas holding at least one sub-domain in play, named in words; an
**`escalation`**, one sentence saying what escalates and where it routes, or plainly that nothing does; and
an **`open[]`**, one entry per unresolved sub-domain saying what somebody has to go and get, naming the
input by its id.

> **This is not the states summarised away.** `C166` derives all three from the structure and refuses a
> summary that says less than the screen found or more. Write the structure first and the summary from it.
>
> **Why it exists.** On the first live run one solution carried thirteen sub-domains in play, twenty-two
> not triggered and three undetermined, each with its own reason, and a person had five of those to choose
> between at a decision gate. Every rule that produced it is right and the sum of them is a worksheet.

**5 — The escalation flag sits beside the section and never inside it.** `flag` is `true` where any
escalation trigger fired and `false` where none did, and it is never absent. Each fired trigger names its
`area`, its `trigger`, a `because` and a `routes_to`. **`routes_to` is `unstated` on every trigger and
that is a fact about the cards** — no card names a routing role. Where a card marks a trigger as routing
outside the four areas, add the `note` saying so.

**Two or three triggers per area fire on an unresolved sub-domain and are not silenced by it.** An
unresolved `S13` fires *EAA applicability uncertainty*; an unresolved `S12` fires *inability to define
adequate controls*. **A trigger that exists to catch uncertainty must not be suppressed by the uncertainty
it exists to catch.**

**6 — `uncovered[]` names the areas the map does not cover**, from the RegMap's own `out_of_scope`, each
with its `disposition`. **A reader who cannot see the edge of the work assumes there is no edge.**

> **Worked example, §1a of the stage-4 shapes body.** A solution that says what it is, beside one that says
> what it replaces and what it does not do. **A solution naming its own dependency is one a person can weigh
> against the other four.**

**7 — Screen each solution against itself.** A solution is narrower and more specific than the brief was
and will legitimately find what the framing could not. **If the sections come out identical across the
set, say so** — that is a finding about the solution set, and manufacturing a difference is worse than
reporting the sameness.

> **You write no number here.** The complexity value is `A8b`'s and it is held under `CR-C6` until all
> four areas have a card. A section that reasons its way toward a value it does not name is the thing no
> check can catch, which is why it is a judged rule and not a field.

> **What this closes and what it does not.** The trigger set is the card's rather than yours, so a solution
> that under-identifies is caught — that is AB-58, and it is why the section exists. **What it does not
> close is `compliance_touchpoints[]` beside it**: you write that list, to one rule. **List every touchpoint
> you answered yes and every one you could not settle, never one you answered no**: a touchpoint you could
> not settle travels into the MVP, where stage 5 writes it in or narrows it out with a reason. No check
> compares the list with your answers, and `C7` confirms only the set you named. **The section is a starting
> point for a person, not a clearance.**

## Gates and obligations

- **Q4** — `C4` cardinality 3..10 · `C5` every solution binds an opportunity and an element · `C59` the set reaches the gate unranked, unordered and with no favourite named · `C26` every primary opportunity addressed · `C7` every named touchpoint addressed · `C83` the seven authored sections read as headings, in order, with the eighth derived by a script · `C102` a lost instance is stated rather than silent · `C103` no more than three solutions on one identical opportunity list · `C106` each solution's heading carries its id and the name you gave it · `C125` three states, none blank, and the refused phrase nowhere · `C126` every fired trigger put something in play, everything in play has a trigger behind it, every *cannot determine* names a declared input, and every area is on the page · `C129` the escalation flag beside the section, binary, every fired trigger named · `C153` every trigger you fire puts in play the sub-domains its own area body says it does. Plus the universal checks
- **G4** — the Product Manager reads the set and selects one solution. **There is no score**, and what a person compares is the solutions themselves, their touchpoint counts and the areas each puts in play. You do not select and do not record it. **Nobody writes the selected-solution document, you included**: the workflow writes it when the person approves stage 4, from the choice they recorded with `SPOCK: record a decision I made`. At review, name the person's tasks in the order the table after message 3 of the shared rules gives them
- **Q4 cannot detect a shallow solution.** It checks the bindings are present and the set covers the primary opportunities, not that a solution is good. That is the human's call at G4

## Bounds

| Bound | Value | On reaching it |
|---|---|---|
| Solutions, what you generate | **exactly 5**, floor 3 | Below 3 the set is too thin to choose from. **The floor is a legal answer** (R3.7-3) and a short set is declared, never silent. `C102` reads this against the set you set out to author |
| Solutions, what the set may hold | **3..10** | The difference is a person adding one after the set is presented. **You never reach above five yourself.** `C4` reads this against the finished artifact |
| Effort | `effort: medium`, **per instance** | One pass per invocation. A bound set per step is spent by whoever runs first (R3.6-4); reaching yours is recorded in `bounds_hit[]` |
| Writes | **one item per write**, in every phase | An over-ceiling emit produces nothing at all and reads as work in progress (R3.6-5) |

## Edges

| Situation | Do |
|---|---|
| A primary opportunity no solution can address | Write the slate, and name the uncovered opportunity plainly. Do not invent a solution to cover it |
| Two slate entries where one `solves[]` set contains the other | Merge or differentiate at phase 1. A narrower set inside a wider one is a scope ladder that reached the decision gate on three committed runs; **C103** does not refuse it, so give the narrower entry an opportunity the wider one does not have, or drop it. Identical sets are allowed on up to three entries that differ in approach, and **C103** refuses a fourth |
| You are phase 2 and the slate entry you were given is not in the file | Stop and say so. Do not add it — the slate is the set, and a solution nobody bounded is the single pass coming back |
| An instance did not come back | The join does not record it: list it in the solution set's `unproduced[]` with an actionable reason, which `C160` reads. **Never leave the set short and silent** (R3.6-3, C102) |
| The synthesis (A7) is absent (stage 3 not run) | Bind `supported_by[]` to what evidence the brief and opportunities carry, and mark the set `evidence_basis: pre_synthesis` |
| Amending after G4 | Send the stage back first with `SPOCK: send a stage back to be redone`, because an accepted document stays as it was approved. A person's own change is then recorded with `SPOCK: record that I edited a document`, and leave `revisions` as it is: rework is counted by the workflow at its gates. A changed solution set marks the scores and everything downstream **stale** |

## Carry what you could not verify

**Your artifact carries a `could_not_verify` field and you do not write it.** The workflow computes it from the
quality rules bound to your skill, using the same function the check recomputes it with, so a copied list cannot
drift from the one it is compared against. The frame carries it where the workflow wrote one, the checks read it as
computed, and the approval writes it; on a run started before 1.16.1, `SPOCK: check what is written, then continue`
fills it.
[`.github/could-not-verify.yaml`](../../could-not-verify.yaml) is still the readable statement of what
yours holds, and reading it tells you what the person at the gate will see. **Copying it into the front
matter costs more than it saves**: a producer that got one line of it wrong spent
longer finding out than writing the document.

**It is not your assessment of your own output.** It is the list of quality rules bound to you that no
check decides, so the person at the decision gate sees them on the document they are deciding on rather
than on a record they would have to know to go and look for. **C65 recomputes it at the gate** and refuses
an artifact whose list disagrees with the gate model.

**Do not write this list from memory and do not edit the carrier.** It is derived: a rule moving from
*needs a check* to *decided by a check* changes it, and a copy kept by hand in sixteen files goes wrong
silently and in the direction that reads as complete. C72 refuses the carrier when it drifts.

## The field names of what you write

**Your artifact's field set is declared in §6 of the parent and generated into
[`.github/artifact-fields.yaml`](../../artifact-fields.yaml). Use those names and no others.**

**Do not invent a field name that reads reasonably.** The shapes an agent infers are reasonable, and that
is the failure: the first agent-driven hypothesis set wrote `evidence` as a list of objects copying the
upstream record rather than a list of refs, `trust_rationale` where §6 says `rationale`, and `original`
where the rejection schema says `statement`. **Four checks failed and the worst of them reported the
artifact claiming a trust tag the arithmetic did not derive** — which reads as an agent inflating a tag and
was nothing of the kind. With evidence carried as objects nothing matches an observation, so the qualifying
set is empty and everything derives `weak`. The reasoning had been right throughout.

**Every artifact carries the envelope as well as its own set.** Where §6 delegates a set to a body of
know-how, that body is the source. C73 refuses the carrier when it drifts from §6.

**The carrier's entry for your artifact has a `gate:` line. It tells you which gate reviews what you
wrote; it is not a field you write.** Where it names a `G` gate, your artifact carries the decision
record too — under `decision:` on the artifact itself, in §7.5's names. `accepted_by` and `accepted_at`, never
`decided_by` or `decided_at`. **You decide nothing:** `by_agent` is always `false` and you write only the
decision a named human actually made.

**Until that decision exists, you omit the block entirely.** An artifact you have just
produced has not been to its gate, so there is no decision to record — and a stub carrying only the gate
name is a decision record with nobody in it, which **C40 refuses**. Write `decision:` when the decision
has been taken and not one moment earlier.

**A field listed under `value_entries` carries single values, not objects.** Write the id the §6 line
names and stop. Copying the upstream object in there is what failed six checks on the first agent-written
A4 — `primary` filled with whole hypotheses where it wanted `H2`.
