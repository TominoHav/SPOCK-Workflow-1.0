<!-- GENERATED from specifications/definitions/know-how/product/prd-template.md. Do not edit this copy.
     Regenerate: node .github/scripts/know-how.mjs --write
     Know-how is read by skills, never written by them. It changes through a human-owned process,
     outside any run (PD90). -->

# PRD Template

**Version:** 0.8 · **Date:** 30 September 2026 · **Status:** For review
**Owner:** Česká spořitelna · **Written by:** Igor Tadić · **Read by:** `prd`

> **What this is.** The section set a PRD in this pilot carries, what each section must hold, and what
> separates a requirement a delivery team can act on from one it cannot. **The section set is closed** —
> C67 counts the artifact against it, which is what makes stage 6's structure claim checkable instead of
> asserted.
>
> **What this is not.** Not the skill, which is [prd](../../skills/prd/SKILL.md), and not the
> initiative form, which is a different body and a different document: **the PRD defines the work and the
> initiative hands it over.** Not a standard for how the PRD is written, only for what it must contain.
>
> **The base is an internal PRD quality checklist**, which is a template with a
> closed section set rather than a product narrative. §6 records what was taken, what was adapted and what
> was dropped, because three of the checklist's sections do not survive contact with this pilot's shape.

---

## 1. Why the section set is closed

**An open section set cannot be checked, and stage 6 has been claiming a structure nobody could verify.**
The artifact has carried `structure_basis: non_standard` since it was first authored, which was honest and
was a placeholder. A PRD that names its own sections can be short by the one that mattered and still read
as complete, which is the same failure the initiative form already guards against.

So the set below is fixed. **A section is `present` or it is `not_applicable` with a reason**, and there is
no third state. An absent section is a defect; a section declared not applicable is a decision somebody can
read and disagree with.

**The reason is the load-bearing half.** `not_applicable` with no reason is worse than a missing section,
because it looks decided. C67 refuses it.

---

## 2. The section set

**Eight sections, and the artifact carries every one.** The `id` is what the artifact records in
`sections[]`. **The heading is fixed too, in two languages, and you do not type it.** The workflow writes
every section heading in the language the run declared, and C67 reads the headings off the page. Write each
section under its id or either of its names.

| # | `id` | Heading, `en` | Heading, `cs` | Carries |
|---|---|---|---|---|
| 1 | `overview` | `## Overview` | `## Přehled` | What this document defines, in a paragraph a reader outside the run can follow, and which MVP option it is the definition of |
| 2 | `problem` | `## Problem` | `## Problém` | The opportunities this addresses, each traced to the prioritised opportunity set, with the trust tag each carries |
| 3 | `users` | `## Users` | `## Uživatelé` | Who this is for, from the brief and the opportunities. Their situation, not a persona invented here |
| 4 | `success_measures` | `## Success measures` | `## Měřítka úspěchu` | What changes if this works, measurably, with the baseline it is measured against — **and when it is read, who reads it, and what would make us stop** (§2.3) |
| 5 | `requirements` | `## Requirements` | `## Požadavky` | The functional requirements, each meeting §3 |
| 6 | `non_functional` | `## Non-functional requirements` | `## Nefunkční požadavky` | Performance, security, data handling, accessibility and availability, to the depth this pilot can state |
| 7 | `out_of_scope` | `## Out of scope` | `## Mimo rozsah` | What was considered and excluded, with the reason. Not everything the product is not |
| 8 | `dependencies` | `## Dependencies` | `## Závislosti` | What this needs that the run does not supply — systems, teams, decisions, data |

> A section a reader cannot locate in the document can only ever be checked by the artifact's own
> declaration, which is what C67 reads. **Nothing was reading the document.** The initiative form fixed its
> headings from the start and gets a diff against the finished text for free; this one did not and could
> not. `template-diff.mjs` reads these headings, so a PRD that declares eight sections and writes six is
> now visible to the person at the gate rather than only to its own front matter.
> From v0.5 C67 reads them too, on every PRD the envelope step has written.
>
> **The headings follow the run's language, like every document the run produces.** **The
> envelope step writes each heading from the table above**, so a producer never chooses between the two columns, and
> C67 refuses a page carrying a mixture. The Czech names are ours, not Česká spořitelna's.

**What the step writes, and what it leaves.** The eight headings above, and the two closing names Documentation
Standards §1 fixes, which close every PRD after its eight sections, in the run's language from §3.12 of that body. **A section it cannot
place is refused** and nothing is written: one missing, one written twice, or two out of order, and the refusal lists
the eight in order. A requirement's own heading, and any section of your own, is left as you wrote it.

**`overview` carries the selected solution's description, copied from `A9` and not summarised.** The rule
above already says a reader outside the run must know what is being built; one PRD satisfied
every check while using the solution's name thirteen times without once saying what it was, and the reader
it was written for had no way to find out. **The description exists — `A9` carries it word for word** — so
this is a transfer and never authoring. Name the thing, say what it does, then use the name.

**A name is not a description, and repetition is not explanation.** If the document's own noun for the
solution appears before anything has said what it refers to, the overview is not finished.

**Three fields sit outside the section set and are mandatory in their own right** (parent §6.13):
`alignment_validation`, `compliance_touchpoints[]` and `agreement_block`. They are not sections because
they are checked individually and because the agreement block is the one part of the document an agent may
never write.

### 2.1 What each section is good and poor at

| `id` | Good | Poor |
|---|---|---|
| `overview` | A reader who was not in the run knows what is being built and for whom by the end of it | A restatement of the title, or a summary of the whole document |
| `problem` | Every opportunity named traces to the opportunity set, and its trust tag travels with it | Opportunities restated more confidently than their evidence supports |
| `users` | Recognisable — the people described would recognise themselves | A segment label standing in for a situation |
| `success_measures` | Measurable, with a baseline and a direction, and it names a horizon, an owner and a kill criterion | *Improve satisfaction*. No baseline, so no way to know afterwards — and no date, so nobody ever does |
| `requirements` | Each one meets §3 and traces upward | A feature list; requirements that restate the MVP description |
| `non_functional` | Named where the run has grounds, declared unstated where it does not | Invented numbers. A latency target nobody derived is worse than none |
| `out_of_scope` | Names what was genuinely considered and cut, with why | An open-ended list of everything the product is not |
| `dependencies` | Each one names who owns it and what happens without it | Dependencies listed as risks, so nobody owns them |

### 2.3 What `success_measures` must carry, and the three things it used to omit

**A measure with no date and no owner is never read.** This is ČS's own shape, taken from the solution
template their teams already fill in, and it closes the gap between *we will know if this worked* and
anybody actually finding out.

| Part | What it asks | Why it is not optional |
|---|---|---|
| **The measure** | What changes, in what direction, against what baseline | Without a baseline there is no afterwards |
| **The horizon** | When it is read. ČS uses **short term, one to three months** and **medium term, three to twelve** | A measure with no date is read when someone remembers, which is never |
| **The owner** | The named person who reads it and says what it showed | An unowned measure is everyone's and nobody's |
| **The kill criterion** | What result would mean stop rather than iterate | **The one most often missing.** A team that has not said what failure looks like will read any result as partial success |

**The kill criterion is the part to insist on.** ČS pairs it with the run-level stop the workflow now
carries: a run may be ended at any point for low value, small impact, high risk or because it belongs to
another team. **A PRD that cannot say what would trigger that has not finished thinking about it.**

**Where the run cannot supply one, say so rather than inventing it.** A horizon nobody agreed and an owner
nobody asked are worse than a stated gap, for the same reason an invented latency target is worse than
none.

### 2.2 When a section may be declared not applicable

**Rarely, and never for convenience.** Three cases are legitimate and each has a shape:

- **The input does not exist.** `success_measures` where the current-process baseline has not been
  supplied. The reason names the missing input, not the difficulty.
- **The scope genuinely excludes it.** `non_functional` on a run whose MVP is a process change with no
  system in it.
- **The upstream artifact records none.** `dependencies` where the expanded MVP names none, which is
  itself worth a reader seeing.

**Not legitimate:** a section skipped because the run was short of information it could have gathered, or
because the section was hard to write. **The reason is read at G6 by the person who signs.**

---

### 2.4 Worked examples — three sections, two versions of each

**The first version in each pair is real text from a real agreed PRD.** None of them is bad writing. Each is
correct, was accepted at a gate, and stops one step short. **The line under each pair says what the second
version does, not what the first got wrong.**

#### A success measure

**What usually gets written**

> Kill criterion: if neither active arm shows a completion-timing improvement over the holdback **that a
> person reviewing the cycle's data would call material**, stop the countdown design.

**Write it like this**

> **Measure A — do bankers actually fill it in.** How often the outcome tag gets completed, against how many
> contacts a banker logs, over the pilot.
>
> **This tells us whether the habit sticks. It does not tell us whether clients are better off.** This pilot
> ranks nobody and alerts nobody, so it cannot move the initiative's headline number and should not be read
> as if it could.
>
> **Three things are missing and someone has to supply each one.** *No starting point* — nothing in this run
> says how often a tag like this gets filled in, or how many contacts a banker makes. **The pilot has to
> find that out before the number means anything.** *No deadline* — the initiative reads its own metric at
> one quarter and again at two, but that was agreed for something else. **Retail distribution sets the one
> for this.** *No cut-off* — no number below which we would say the habit has not taken. **We cannot set one
> until we have a starting point**, which is the same missing thing.
>
> **And this number on its own can mislead.** A team that tags every contact the same way would score
> perfectly and tell us nothing. That is why Measure B looks at whether the answers vary at all.

**The difference:** the first cannot be applied by anybody and reads as though it can.

#### The Overview

**What usually gets written**

> This document defines the requirements for the proactive re-verification countdown, the option expanded at
> stage 5 from the solution selected at stage 4.

**The word *countdown* appears thirteen times in that document and is never explained.** A team reading it
alone learns there are three arms, three stages of message and a link, and never learns what the thing is.

**Write it like this**

> **What this is for.** A countdown shown in the app while a client's check is due: a notice when it opens,
> a second saying what will stop working and when, and a third giving the date. **The client sees the date
> and the consequence before either arrives, which is what does not happen today.**
>
> That description comes straight from the solution picked at stage 4. **We have not rewritten it**, so a
> team reading only this document can build from it.
>
> **What this document adds** is what each message has to say, what we measure, and the compliance points
> the chosen solution brings with it.

**The difference:** a team reading this document alone can build from the second and cannot from the first.

#### `Users`

**What usually gets written**

> Retail clients due for periodic re-verification. No sub-segment, carried unchanged from the brief.

**Write it like this**

> Retail clients whose identity check is due. **We are not splitting them into smaller groups, on purpose** —
> narrowing now would leave out the people the problem is about.
>
> **What we know about them.** Fewer than half finish in the first month. Some only finish after something
> has already stopped working. Others go into a branch, either because the app failed them or because they
> do not trust taking a photo of themselves; the queue is longer than the check, which takes about four
> minutes once you reach it. People who do it in the app do it quickly, in a spare moment.
>
> **Some we cannot reach at all.** Their contact details are out of date or were never confirmed, and we do
> not know how many. **That is a problem for the only way this pilot talks to people**, and it means a plain
> completion rate will make the idea look worse than it is, by an amount nobody can currently work out.
>
> **Nobody has told us how many clients come up each quarter.** Whoever produces the reporting behind the
> July operations note has that number.

**The difference:** refusing to split the group is a decision and is right. **Refusing to describe it is a
different decision**, and the team writing the messages has nothing to write from.

## 3. What makes a requirement usable

**Each requirement carries an `id`, a `statement`, and `traces_to[]`.** The statement is one requirement,
not three joined by *and*.

**Five properties, and they are the ones that survive this pilot's shape.**

| | |
|---|---|
| **Independent** | Can be understood and estimated without reading the others |
| **Valuable** | A reader can say what the user or the bank gets. A requirement whose value nobody can state is a design decision that has escaped upstream |
| **Estimable** | Enough detail that a delivery team can size it. Not enough that it dictates the solution |
| **Testable** | There is an observable outcome that says whether it was met |
| **Traceable** | `traces_to[]` resolves to an artifact this run produced. **This is the pilot's addition**, and it is what C12 walks from the initiative back to the opportunities |

**Two properties of the source checklist do not transfer, and saying why is the point.** *Negotiable*
assumes a team that will refine the requirement in conversation with the author; this document is handed
over at the Definition of Ready and the author is gone. *Small enough for one sprint* is a delivery
property, and the pilot ends before delivery is planned, so sizing here would be a guess dressed as a
constraint.

### 3.0b Three things this document owes its reader

**The fourth, the Overview describing what is being specified, is §2 above and is not repeated here.**

**A success measure carries a threshold, or an owner and a moment.** *An improvement a person reviewing the
data would call material* is neither, and it is the line a delivery team is judged against. Where the
threshold cannot be set yet, name who sets it, by when, and what they need in order to. **Split what is
already decided from what is not**, rather than writing one sentence that sounds decided.

**`Users` describes the segment even where it declines to divide it.** Refusing to sub-segment is a decision
and is often the right one. **Refusing to describe is a different decision and is rarely right.** What is
known about the population, what they do today, what they try first, what stops them, and who cannot be
reached — all of it traceable to material already in the run.

**The draft says nothing about its own state beyond its title, and the agreed version's closing paragraph is
written by the workflow.** A reader can tell which one they hold, and neither can describe the other.

### 3.1 Language

**Ambiguity in a requirement is deferred disagreement.** It reads as agreement at G6 and surfaces as
rework in Execution.

| Do not write | Write |
|---|---|
| *should*, *might*, *could*, *where possible* | *must*, or move it to `out_of_scope` |
| *fast*, *quick*, *responsive* | The number, and where it came from |
| *user-friendly*, *intuitive*, *seamless* | The behaviour that would make it so |
| *as needed*, *as appropriate* | The condition |
| *etc.*, *and so on* | The rest of the list, or the rule that generates it |

**Where the number is not known, say it is not known.** *Response time target not established; the current
process has no measured baseline* is a usable sentence. *Fast* is not.

**Two kinds of identifier, and only one of them belongs in this document.**

| Belongs, and dropping it fails the coverage bar | Never appears, in prose or in a heading |
|---|---|
| Hypothesis, opportunity, option and requirement ids | Artifact codes: `A11`, `A12`, `A13` |
| The chain a reader follows from a requirement back to the problem it answers | Gate names: `G5a`, `G5b`, `Q6` |
| | Stage numbers, skill names, check numbers |

**The first is the traceability this document exists to carry.** A requirement that cannot be walked back
to the opportunity it serves is a requirement nobody can price, and the reference bar this project measures
itself against fails an output that drops the chain.

**The second is the machinery, and a ČS reader has never seen any of it.** Say *the option you selected*
rather than naming the gate where you selected it. **One run named the wrong gate twice**, which
is the failure mode this rule removes rather than polices: an error is impossible in a sentence that does
not name a gate at all.

### 3.2 Acceptance criteria

**Every requirement carries at least one observable outcome.** The form that travels best is a condition, an
action and the result: given the buyer has a saved application and has stalled, when they accept the offered
hand-off, then the advisor opens their saved state rather than a blank form.

**Cover the error path, not only the happy one.** A requirement whose criteria describe only success is a
requirement nobody has thought about failing.

---

## 4. The three fields outside the section set

**`alignment_validation` is mandatory and is the second alignment pass.** The first was comparative, at the
solutions; this one is confirmatory, against the narrowed thing actually being defined. It names the objectives
it was checked against and the `basis` for them. **Where the strategy basis is unverified, the basis field
says so** rather than the statement implying a check that did not happen. C31 requires the statement and
the objectives it names.

**`compliance_touchpoints[]` are addressed in the requirements, not listed beside them.** A touchpoint that
appears only in this array is a note; a touchpoint designed into a requirement is a control. C7 checks that
each one is addressed.

**The inherited total is the expanded MVP's, carried word for word, and you never recount it.** State the
number the expanded MVP states, name every touchpoint whose status this PRD changes, and say why. Never
write *all* over a number smaller than the one you inherited: one PRD wrote *all
twenty-one* over an expansion that stated twenty-three and a screen that had fired twenty-four, and a reader
could not tell whether touchpoints had been dropped or recounted. **Every touchpoint you inherit is written down here by its identifier**, the carried ones where they are designed in and the changed ones where you say what changed: a count is checked by counting identifiers, so one that is nowhere in this document reads as dropped.

**`requirements[]` carries the id and the trace. The statement is prose and it is written once, in the
body, under its own heading.** Give each requirement a `### R1 — short title` section carrying the
statement, what it traces to, and its acceptance criteria. **Do not put `statement:` in the front matter.**

> **The defect this fixes is invisible.** A requirement's
> statement written **twice in the same file, word for word** — once in the record and again in the
> body — has **nothing reading the record's copy**: the build only asks that
> requirements exist and what they trace to. So correcting the prose and leaving the record costs nothing,
> breaks nothing, and leaves a later reader taking whichever half they happen to open. **A copy that ages
> on its own clock is the failure this repository exists to refuse**, and this one was inside a single
> document.
>
> The mortgage fixture had the opposite shape and it is the same defect from the other side: its
> statements were in the record only, and its Requirements section said *the full set is in the front
> matter*. A PRD that tells a reader the requirements are somewhere else is not a PRD.

**C67 holds both directions.** A statement in the record fails it, and a requirement declared in the record
with no matching heading in the body fails it too — so the words cannot be duplicated and cannot go
missing.

**`agreement_block` is present, empty, and never written by an agent.** Authorship and approval are not the
same act. A PRD with a completed block is A13 and a PRD without one is A12, and the workflow writes A13 from A12
word for word when a person marks it agreed: it completes the block, takes the draft marker off the title, points
the citations at the agreed record and adds a closing paragraph saying who agreed it. C13 refuses a pre-signed
block, which is an agent forging the human mark.

---

## 5. Bar for Q6

- Every section in §2 is `present`, or `not_applicable` **with a reason** (C67)
- Every section heading on the page is the table's, in the run's language, on a PRD the envelope step has written from v0.5 (C67)
- `success_measures` names a horizon, an owner and a kill criterion, or says which it could not supply (§2.3)
- Every requirement carries an `id`, a `statement` and a `traces_to[]` that resolves
- `alignment_validation` present, naming its objectives and its basis (C31)
- Every compliance touchpoint addressed inside a requirement (C7)
- `agreement_block` present and empty in A12; completed by a named human in A13 (C13, C14)

---

## 5b. The product review lens — ČS's own, and no check can run it

**This is the bank's Product Manager Checklist, and it belongs to the person at G6, not to a gate.** Every
question below is a judgement about whether the thing is *good*, and the gates in this pilot decide only
whether a document is *well formed*. **A check that tried to answer these would be inventing a verdict**,
which is the failure the whole build exists to prevent — so it is written down as a lens and never as a
criterion.

**Use it once, at G6, before signing.** Ten questions, and a PRD that cannot answer four of them is not
malformed; it is thin, and that is the thing this lens exists to make visible.

| # | The question | What a poor answer looks like |
|---|---|---|
| 1 | Does it solve a real need validated by research or data, with a benefit somebody can quantify? | The need is asserted in the overview and traces to nothing |
| 2 | Is there a visible differentiator, and can the benefit be said in ten words? | The benefit needs a paragraph and a diagram |
| 3 | Can it be understood in five seconds, without instructions? | The requirements explain the mechanism, not the outcome |
| 4 | Does it work on mobile first, and hold up in a branch or contact centre? | One channel is described and the others are assumed |
| 5 | Is it built from parts that can be extended, rather than one shape? | The whole thing has to ship or none of it does |
| 6 | Does it ask the customer for the minimum, using data already held? | The customer re-enters what the bank already knows |
| 7 | Is the language understandable to a twelve-year-old, free of asterisks and hidden conditions? | Reads like a product disclosure |
| 8 | Is the number of steps the minimum, with a clear next action at the end? | The flow is described without a count |
| 9 | Is this a proposition rather than a feature — is how it is explained part of the design? | Pricing and communication are somebody else's problem |
| 10 | Is there a plan for after launch: activation, tracking, and a way to retire it? | The document ends at delivery |

**Question 10 is the one this pilot is structurally weakest on**, and it is worth saying so rather than
letting the lens imply otherwise. The run ends at a handover, so what happens after launch is defined here
and observed elsewhere. §2.3's horizon, owner and kill criterion are the part of it the PRD can actually
carry.

---

## 6. Source, and what did not survive it

**The base is an internal quality checklist for product requirement
documents**, taken as the section set and the requirement bar. **It is a checklist for a document that
precedes a design phase**, and this pilot's PRD precedes a handover to a bank backlog, so the fit is close
and not exact.

| Taken | Adapted | Dropped |
|---|---|---|
| The seven-section spine, the requirement quality bar, the ambiguous-language table, the acceptance-criteria form, traceability as a requirement rather than a nicety | *Target users* becomes `users` sourced from the run's own brief and opportunities rather than from personas, which this pilot does not produce · the requirement properties lose two that assume a delivery context · non-functional requirements are stated to the depth the run can support and declared unstated otherwise | **The sign-off matrix.** The checklist signs a PRD off with four roles before design begins. This pilot has one agreement, by one named person, and authorship and approval are never the same act. **The review template.** The gate record is the review here. **The phase-transition framing**, because the next thing after this document is a bank's Implementation Authority, not a design phase |

**`dependencies` is not from the source.** It is there because the initiative form asks for dependencies
downstream (`zavislosti`), and a PRD that never gathered them makes stage 7 invent or omit them.

---

## 8. Open

| # | Question | Effect |
|---|---|---|
| **N5-b** | Whether `success_measures` should be **blocking** rather than declarable not applicable. Today a run with no baseline declares the section not applicable and proceeds. **Recommendation: leave it declarable.** The baseline is open decision 1 and is the stakeholder's to supply; blocking here would stop runs on a gap the run cannot close | A PRD can reach G6 with no measurable target, stated |
| **N5-c** | Whether `non_functional` needs a **closed sub-list** the way §2 closes the section set. Today it names six areas in prose and a run can address four without anything noticing. **Recommendation: close it once the Compliance Guidelines land**, because three of the six are theirs to specify | A run can be thin on non-functional requirements without a check seeing it |
