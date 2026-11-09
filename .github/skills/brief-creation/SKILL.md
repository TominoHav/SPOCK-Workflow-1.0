---
name: brief-creation
description: >
  Elicit and assemble an initiative brief through conversation, in the run the person started and named, and mark
  what the user could not supply. Trigger phrases: start a discovery run, new initiative, initiative
  brief, begin discovery, stage 1, what are we exploring.
---
# brief-creation

**Stage 1.1** · Agent `product-manager` · Pattern `elicitation-dialogue` · Gates **Q1** then **G1**

## Contract

- **Inputs:** user dialogue · **any document the person supplies or attaches** *(read it; see step 0)* · `.github/know-how/method/method-canon.md` *(§4.1 is what this stage is for, §9 the ways an outcome is stated badly)* · `.github/know-how/method/evidence-standards.md` · `.github/know-how/product/brief-fields.md` · `.github/know-how/product/strategy-basis.md` *(for the key-result list only)*· `.github/know-how/writing/agent-interaction.md` · `.github/know-how/writing/input-elicitation.md` *(what to ask and how to tell a good answer from a thin one; `agent-interaction` owns the manner, this owns the substance)* · `.github/know-how/writing/output-voice.md` · `.github/know-how/writing/documentation-standards.md` · `.github/know-how/product/stage-1-shapes.md` *(open it when a gate refuses something you wrote: it gives the shape that passes, and it is why nobody needs to read `check.mjs`)*
- **Output:** `{runs_root}/{run_id}/1-brief/initiative-brief.md`
- **Record:** `{runs_root}/{run_id}/records/1-brief/` — **the output above is assembled from a record and does not stand alone.** Read [`.github/instructions/record-and-output.instructions.md`](../../instructions/record-and-output.instructions.md) before writing either: the fields a gate decides sit on the record, and an output carrying a production field is refused (C107, C108, C109). **Copy the content fields and their nesting for this artifact from [`.github/artifact-fields.yaml`](../../artifact-fields.yaml)** rather than composing them from the flat field list beside it — a list of names with no nesting reads as a set of top-level keys, and three artifacts of an earlier run arrived with every finding in body prose because of it. **The brief and its record start as frames, written when the run is started: fill each `[[fill: …]]` and nothing else, and never create either file.** **The envelope around them is not yours, and there is no task to run for it**: what is fixed comes with the frame, the checks read the rest as the workflow computes it, and the workflow writes that into the document when the person approves. On a run started before 1.16.1, `SPOCK: check what is written, then continue`, which you run after every document, fills it first.
- **Exclusions:** does not infer any field · does not read source systems · does not approve its own output

## Procedure

**This is a conversation, not a form.** Never present the field set and ask for it to be filled in.
One field at a time, or a small related group.

**Ask who they already know is in this market, and write the names down.** `known_competitors[]` takes a
name or a link, as many as they have, and **empty is an ordinary answer** that goes in `unknowns[]` like any
other. **Do not research it and do not fill it from the topic.** Stage 3 starts from this list and finds the
rest; a person who knows the six banks that matter should not have to watch the run rediscover them, and a
name they give is a starting point rather than a finding.

**1 — Ask the language first, then open with the problem or idea space; their name and role come from the run record.** Ask *what is
the problem or idea space we want to address* — not *what is the topic* and not *what product is this
about*. **A question naming a product invites a product**, and a run that begins with a solution has
already spent the three stages that were meant to find one. The field this fills is still `topic`; only
the question changed.

**Their name and role are on the run record under `person`**, recorded when they started the run with
`SPOCK: start a run`. The brief's accountable person is that name, because the brief has required a named person
accountable for the run since it was written. Where the record carries no `person`, the run started before this was
built: ask **who they are**, their name and their role, as before. A run whose accountable person is a role rather
than a name is a run nobody at the bank is answerable for.

**`language` is `cs` or `en`, it is assigned here, and it is never reassigned.** Every document this run
produces is written in it, and every agent speaks in it, you included. **It is the first question you ask**,
as a closed choice, in the language the person is writing in, and it says that the documents and the
conversation both follow it. In Czech, in these words: *V jakém jazyce budeme pracovat, česky, nebo anglicky?
V tomto jazyce napíšu všechny dokumenty tohoto běhu a budu v něm s vámi mluvit, tady i ve všech dalších
fázích. Když si nevyberete, bude to čeština.* In English: *Which language shall we work in, Czech or English?
I will write every document of this run in it and speak with you in it, here and at every later stage. If you
do not choose, it will be Czech.* From the answer on, you speak the run's language.
**Where the person does not say, write `cs` and tell them you did** — Česká
spořitelna is the customer and the initiative is the document it receives, so where the person names no
language the run is Czech. **The checks read English only on a brief that carries no `language` at all**, a
run from before the field existed; you always write one, so the two are one rule. **That is a declared default and not an inference**: you state the value, you state that
you defaulted it, and the person can change it in the same reply. **It never goes in `unknowns[]`**, because
a run with no language cannot be produced and *unknown* is not a state it has.

**The documents and the conversation follow it.** Field names, ids and record values stay English on every
run, which is what lets a Czech run and an English run pass the same gates.

**0 — Read what the person gave you, before you ask them anything.** People arrive one of three ways:
they tell you, they hand you documents, or both. **All three are normal and the third is the most
common.** Take whatever is attached, or named inside the project, read it, and work from it; **a document
named outside the project you never open**, and you ask them to attach it in the chat or put it in the project.

- **A document is the thing you interrogate, not the thing you transcribe.** Extracting values and
  filling fields is what a form does. Read it as a product person would: is the outcome an outcome or a
  thing to build, does the metric actually move with the goal, is the segment specific enough to search a
  market against, does the link between the goal and the key result name a mechanism or assert one.
- **Open by naming what is weak or missing, never by confirming receipt.** *I have the segment, the
  outcome and two of the four goal parts. The outcome reads as a feature rather than a change in
  behaviour, and there is no measure. Those two are what I need from you* is the shape. **Do not open
  with a summary of what you read.** They wrote it; they know what is in it.
- **What the document says is theirs, and what you conclude from it is not.** A value written in their
  document is user-supplied. A value you derived because the document implied it is an inference and is
  forbidden — put it to them as a proposal and let them confirm, exactly as with a restated outcome.
- **Say where each field came from.** From their document, from the conversation, or still missing.
  A person cannot correct what they cannot see you assumed.
- **Where they gave you nothing, this step is empty and you open on the topic.** That is step 1.

**2 — Work the outcome.** The hardest field and the most consequential: it is the root of the tree.
Most first answers are solutions. If so, **propose** an outcome phrasing and ask for confirmation.

- Confirmed → store it, `outcome_restatement: confirmed`
- Declined → **keep the user's wording**, `outcome_restatement: declined`, retain your proposal in `restatement_proposed`
- At most two attempts at **proposing a rewrite of their words**. A third is arguing, and an agent that
  rewrites a user's outcome has inferred the most important field in the run — Q1 cannot detect it,
  because the field is present and well formed.
- **Helping them phrase it when they ask is not an attempt and is not capped.** Those are two different
  acts at two different moments: pressing your wording on someone who has answered, and composing with
  someone who has asked you to. `agent-interaction` §3b is the second one

**3 — Bounding fields.** `customer_segment`, then `market_scope`. These stop later stages running wide,
and `market_scope` bounds a stage that no person reviews.

**4 — Goals, and this is the field that changed.** A goal is **four things or it is not a goal** (C77):
the **product goal**, which is the product's **North Star** and what this run is accountable for, the
**metric** that tracks it, the **key result** from the Strategy Basis §2 it feeds, and the **written link**
saying how one moves the other.

- **Ask the product goal first, and ask it once.** It is the product's North Star, the outcome the product
  is steering by, and one level: never ask a North Star and then a product goal as two questions. Write it
  as `product_goal`; `north_star` is the same level under its other name (`brief-fields` §2.2). Where the
  person has none, that is an answer — record `goals` unknown with the reason and say who would normally
  hold it. **Never write one for them**: an outcome you compose is an anchor, and every later stage
  generates against it.

- **Read the Strategy Basis for the key result.** It carries twenty-five, each with an identifier. **This
  is the only part you look up**; **show all twenty-five, grouped by their objective, with the identifier, the
  words, the direction and the type as the Strategy Basis writes them.** Say which two or three you would look
  at first and why, and say plainly that the rest are there because the nearest by topic is often not the one a
  person picks. **Never narrow the list to your own shortlist**: a run about cyberfraud was
  offered two, told the bank had nothing closer, and the person found SHD-1 three turns later. **Lead with the
  reasoning rather than waiting to be asked for it** — `input-elicitation` §7a: the plausible key results
  with the case for and against each, two or three shapes the product goal could take, and a failing measure
  shown before a passing one. **This is the one step where the elaboration is the default**, because a
  person meeting this workflow for the first time does not know that asking would produce any of it.
  Everywhere else §7 stands unchanged and you help when asked. Then let them choose — a view is not an
  inference, and `agent-interaction` §3b is the rule.
- **When a person names a key result themselves, read its row back before you record it.** Open the Strategy
  Basis, find the identifier, and say the row in their language: the identifier, the words, the direction, the
  type and the section it sits in. Where the identifier is not in the basis, say so and ask. Where the direction
  or the type they wrote differs from the row, say both and let them decide. **You never correct it silently and
  you never record a row you did not read.** Where they cite a direction, a type or a section beside the
  identifier, write it into `key_result` after the identifier, in the Strategy Basis's own English words —
  `key_result: "SHD-1 — increase, type C, §2.3"` — because a record's values stay English on every run, and C77
  compares each of the three with the row. A bare identifier is still a whole answer.
- **Every offer here names more than one, and none of them contradicts an answer already given.** In
  one run the first ask named one identifier and invited another, to a person who had not seen the
  twenty-five, and a later one proposed a result under the business-clients objective a turn after the
  segment was set to retail. **Check a candidate against the record before offering it.** A rule against picking one produced
  the answer *"SHD-3 is the closest ... but this is your call, not mine"*: a view, disclaimed in the
  same breath, to a person who had asked for exactly that. **What you never do is record a choice they
  did not make.**
- **The other two are elicited.** Ask how they would measure the product goal, and how that moves the key
  result they chose.
- **Ask what a person would see change when the product goal moves.** A metric nobody can observe is not a
  metric: say so, and ask once more. If there is still none, mark `goals` unknown with that reason.
- **Where the person says the initiative serves Love Brand, it has a goal and no key result to name.** Love
  Brand carries no objective and no key results by design (Strategy Basis §2.1). Ask the product goal, the
  metric and the link as usual, the link saying how the goal serves Love Brand. Write `key_result: unavailable`
  on the goal, and `strategy_basis: Love Brand carries no key results by design (Strategy Basis §2.1)` at the top
  level of the brief's record and not inside the goal, which is where C77 reads it. That is a recorded fact, not
  a missing answer: never mark `goals` unknown for it.
- **Where the person names a key result the Strategy Basis does not hold**, say so and cite the basis: its version,
  and the key results it holds under their objective. Then read §2.1. Where their words name one of the vision
  metrics or KPIs left out there, say which and quote §2.1's reason. Where their words only might mean one, ask:
  *"The basis leaves out the vision metric financial health on purpose (§2.1). Is that the one you mean, or a key
  result of your own?"* Where it is their own, record it as they said it:
  `strategy_basis: "Not in the Strategy Basis v0.3: the person's own key result, in their words: Klienti porážejí inflaci ({their name}, {the date})"`
  at the top level of the brief's record, and `key_result: unavailable` on the goal, then ask the product goal, the
  metric and the link as usual. The brief names it as their key result, not in the basis. Two
  investment runs recorded INV-1 as a stand-in for a key result the person did not choose, and one named a vision
  metric with nothing cited.
- **ČS's rule, and say it plainly if the user reaches for it:** a product's own metric can never be a
  company key result. *More clients served digitally* is the bank's measure, not this run's. Ask what
  **this** run would move that leads to it.
- **Never write the link yourself.** It is the one field where a plausible sentence is indistinguishable
  from a real mechanism, and stage 4's strategic alignment rests on it. **If the user cannot state
  the link, the goal is incomplete** — mark `goals` unknown with a reason rather than shipping three of
  four parts. A partial goal reads at stage 4 as a supplied one.
- If goals are not to hand at all, say where they normally live. Do not move on silently.

**5 — Context.** Background, related runs, constraints, timing. All optional, all cheap to skip.

> **Compliance is not asked here.** The compliance screen runs at stage 4, against each proposed solution,
> because **a product manager cannot say whether an idea engages a regime before the idea exists.** Nothing regulatory is
> asked of the person at this stage, here or anywhere.

**6 — The run's name is the person's: they type it when they start the run, and you never assign or change it.**
`SPOCK: start a run` takes it in its first box, the year, the month and a short name in lower case, creates the
run's folder under it, refuses a name a run already has, and records them as the person running it, which is where
step 1 reads their name and role. **Where no run has been started, name that task and its three boxes, leave
every box to them, and write nothing until the run is started; its start writes the brief's frame.** The frame
carries the run's name as `run_id`, from the run's folder, and so does the frame of every later document. **Never
reassign it.**

**Read `.github/runs-root` for the directory** before you write anything. Its one line is the answer.

**The `{year}-{month}-` prefix is not cosmetic.** Every script that
enumerates committed runs filters on it — the front-door generator, the metrics reader —
so a run named outside the shape is refused by nothing and skipped by everything, and no count the pilot
reports about itself includes it. `C95` fails the repository on such a run, so it is renamed rather than
lost.

**8 — Write the artifact, then check it, then move the run, and only then ask anybody anything.** State
what you produced and anything you could not resolve, then run `SPOCK: check what is written, then
continue` and read the result back in the same turn. Then open .github/last-task.md and read it to the end before you say anything about what the task did. The task tool hands you the output, and that file keeps all of it. Fix what it finds before anyone is asked to look.

**The person is asked after the quality gate has run, never before it.** Asking first inverts the order: a
producer that did wrote the brief, ran the check twice, and asked for an acceptance while `Q1` had never run. A stage that fails its quality gate does not reach a person at
all, so an acceptance requested before the gate is a question with nothing behind it. That is why the two
steps are one task rather than an ordering anybody has to remember.

**Stopping after the artifact is where a run stalls.** The person has a brief, no idea what comes next, and
an agent that has been told its job is over. **The run does not move unless you move it.**

> **You still do not run the quality gate, and triggering is not running it.** Blueprint §5.3 requires the
> checker to be independent of the producer — *"a verifier that cannot block is not a control"*, and one
> the producer operates is not independent. What you trigger is a command that runs the checker as a
> separate process and records what it computed, which is the same independence a person typing that
> command provides. **What would break the rule is you writing the verdict**, and the writer refuses a gate
> record naming a registered agent, so it holds twice. **Never say a stage passed on your own account** —
> say what came back.

## Marking a field unknown

An `unknown` is a record, not an empty string:

```text
unknowns:
  - field: goals
    reason: not_yet_available     # not_known | not_yet_available | not_applicable | declined
    note: OKRs for H2 not published yet
  - field: success_signal
    reason: not_known
    asked: true                   # not_known and declined say what the person told you, so the gap says you asked
    said: "<their words>"         # optional: the person's own words, quoted as they gave them
```

Propose the reason from the conversation; the user confirms it. **Never assume a reason from silence.**
**`not_known` and `declined` are claims about what the person said, so the gap carries `asked: true`** (`C163`).
Put nothing else in the note unless you quote the person's own words in `said:`: a reason they did not give is not
theirs to carry.

## Context retrieval

- **Sources:** the user · `.github/know-how/product/brief-fields.md` · `.github/runs-root` for where runs are written
- **`related_runs[]` is offered, not searched.** You may say earlier runs on this topic exist and ask whether they are related. You do not decide that they are
- **Outward:** **none**, and this binding holds no tool with which to attempt it. A capability that widens on request is not a closed list (PD71). Outside material enters only when a person hands it in, and it is tagged in `external_sources[]` — **C18**

## Gates and obligations

- **Q1** — `C6` run identifier present · `C10` every required field present or in `unknowns[]` · `C77` every goal whole, its key result in the Strategy Basis, its metric not a key result restated. `C51` the gate result is recorded by the checker and never by you. Plus C14, C17, C18, C19, C22, C28
- **G1** — the Product Manager decides *complete enough to proceed?* You do not decide it and do not record it
- **Q1 cannot detect a guessed field.** It checks that fields are accounted for, not that they are true. That is why inference is forbidden rather than discouraged
- **C77 cannot detect a plausible link.** It confirms a link is there and that the metric is not the key result copied down. **Whether the mechanism is real is G1's judgement**, and it is the reason you must not write the sentence yourself — a link you authored is one the Product Manager reviews as though someone else had

## Bounds

| Bound | Value | On reaching it |
|---|---|---|
| Elicitation exchanges | **40** | Write what you have, mark the rest unknown, name the gaps |
| Attempts per field | **none** | There is no cap on helping with one field. A person who asks what a north star is, then asks for examples, then asks which you would pick, has used three exchanges well |

**The outer bound is there so nothing here is unstoppable, and it is not a budget to spend down.** Fifteen
exchanges and 3 per field is fewer exchanges than a real stage 1 takes to go well — a field abandoned at the third attempt with the person still willing lands in
`unknowns[]` reading exactly like one they refused.

**Reaching a bound is recorded** in the artifact's `bounds_hit[]`. Silent truncation is the failure
these prevent.

## Edges

| Situation | Do |
|---|---|
| Nothing supplied | Write no brief. There is nothing to record |
| User wants to skip | Write it with everything `declined`, and say plainly what it costs downstream. Do not refuse |
| A run is in progress | Do not start a second. Report its position and hand to the stage that is due |
| Amending an accepted brief | Send the stage back first with `SPOCK: send a stage back to be redone`, because an accepted brief stays as it was approved. A person's own change is then recorded with `SPOCK: record that I edited a document`, and leave `revisions` as it is: rework is counted by the workflow at its gates. Amending `outcome`, `market_scope`, `customer_segment` or `topic` marks downstream **stale** |

## What comes next, and who carries it

**Once the brief is accepted at G1, stage 2 is the Opportunity Designer's** — one agent for the whole
stage. Say so, by that name, and say what to bring:

> The problems this initiative is meant to solve. **Documents are not required.** Hand over research
> notes, transcripts or tickets, write the problems in your own words, or both. What the stage needs is
> something to reduce, not a document.

**Do not restate the stage.** Point at the run's own front door, which is generated and current, and let
the next agent say what it does. **This handoff is given once the stage is accepted and not before** — a
brief that has not passed G1 has nothing to hand on.

## Carry what you could not verify

**Your artifact carries a `could_not_verify` field and you do not write it.** The frame carries it,
computed from the quality rules bound to your skill, using the same function the check recomputes it
with, so a copied list cannot drift from the one it is compared against. On a run started before 1.16.1,
`SPOCK: check what is written, then continue` fills it.
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
