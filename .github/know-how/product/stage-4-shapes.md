<!-- GENERATED from specifications/definitions/know-how/product/stage-4-shapes.md. Do not edit this copy.
     Regenerate: node .github/scripts/know-how.mjs --write
     Know-how is read by skills, never written by them. It changes through a human-owned process,
     outside any run (PD90). -->

# Stage 4 Shapes

**Version:** 0.6 · **Date:** 29 September 2026 · **First version:** 6 September 2026 · **Status:** For review
**Owner:** Česká spořitelna · **Written by:** Igor Tadić · **Read by:** `ideation` — the skill that writes a solution and joins the fan-out

---

## What this body is for, and when to open it

**Open it when a gate has just refused something you wrote.** It is keyed on the message, not on the
rule. Each entry gives the message, the shape that produced it, and the shape that passes.

**It exists because the alternative was worse.** A producer without it read `check.mjs` six times,
`fanout.mjs`, `assemble.mjs`, `run-files.mjs` and `gates.mjs` looking for what would pass, and the turn
died on a request-size limit at 707 credits with the work half applied. **The checker's source is not
documentation. This is.**

**Nothing here overrides a rule.** Where this and a rule differ, the rule wins and this is wrong and
should be corrected.

---

## 1 · `C83` — "SOL1 is missing …"

**The eight parts are headings. Bold text is not a heading.**

**The headings are in the run's language**, the `language` the brief (A1) declares, and a run that declares
none is English. One set or the other, never a mixture: `C83` looks only for the set in the run's language,
so a Czech run carrying `### What it is` fails as though the section were missing. The headings the message
lists are in the run's language too.

**And the id in the heading is the id on the record, character for character.** `C83` finds your section by
searching the body for a heading containing the id the record gave your solution, so a record saying `SOL1`
and a heading saying `sol-adviser-parity` means it finds no section at all and refuses every solution in the
set. `C106` skips on the same miss and reports nothing, so the message you get names the eight sections
rather than the id, which is what makes this worth stating here. **The ids are `SOL1`, `SOL2`, `SOL3` in set
order** — not a slug, not a name, and the same string in the record, in this heading and in `parts/SOL1.md`.

Refused:

```
**What it is.** A scheduled sequence of reminders, delivered through the channels the bank already uses.
**What it does.** Starting at the beginning of the re-verification window, the client receives ...
```

Passes, on an English run:

```
## SOL1 - Proactive restriction warning

### What it is

A scheduled sequence of reminders, delivered through the channels the bank already uses.

### What it does

Starting at the beginning of the re-verification window, the client receives ...
```

Passes, on a Czech run:

```
## SOL1 - Včasné upozornění na omezení účtu

### Co to je

Naplánovaná řada upozornění v kanálech, které banka už používá.

### Co to dělá

Od začátku období pro obnovení údajů klient dostává ...
```

**Seven of the eight, in this order, as `###`.** The solution's own `##` heading carries its id and the
name its author gave it, which is `C106`.

| # | English run | Czech run | who writes it |
|---|---|---|---|
| **1** | `### What it is` | `### Co to je` | you |
| **2** | `### What it does` | `### Co to dělá` | you |
| **3** | `### How it does it` | `### Jak to dělá` | you |
| **4** | `### The problem it solves, and for whom` | `### Jaký problém řeší a komu` | you |
| **5** | `### Opportunities it is built on` | `### Příležitosti, na kterých staví` | you |
| **6** | `### Against the market` | `### Vůči trhu` | you |
| **7** | `### Strategic alignment` | `### Soulad se strategií` | you |
| **8** | `### Compliance` | `### Compliance` | **a script.** You write the answers; `derive.mjs` writes this section |

**Two of them changed name on 7 September 2026 and it is not a rename you can ignore.** *How it works*
became **how it does it**, which points back at *what it does*; *who it is for* was absorbed by **the
problem it solves, and for whom**. A solution written after that date carrying the old headings is missing
the new ones, and one written before is not asked for them.

On a Czech run the old names are `Jak to funguje` and `Komu to je`, and the Czech example run,
`2026-09-spending-insights` in `fixtures`, still carries them because it was written before the change: take
the headings from the table, never from that run.

**You do not write §8.** It is derived from the answers you gave, and writing one by hand produces a
section that disagrees with the file the check compares it against.

## 1a · Worked example — what a solution says about itself

**The first version is real text from a committed run.** It is correct and it stops one step short.

**What usually gets written**

> **I1: An automatic set-aside the client points at a goal they named.** The client names a goal and an
> amount, then switches on a rule that moves money towards it without deciding each time. The rule can be a
> round-up on card payments, a fixed weekly amount, or both.

**Write it like this**

> **I1 — Whole-Portfolio Radar.** A score that ranks every client in a banker's book against one shared
> answer to *who is worth calling today*, sitting in the screen a banker already opens rather than a report
> they have to ask for.
>
> **What it replaces.** Two things at once: the handful of clients a banker happens to remember, and the
> fact that three colleagues use three different personal ideas of who is worth calling (O2). **Same rule,
> every banker, every client, all the time.**
>
> **What it does not do.** It does not decide what to say, and it does not learn. **A client it gets wrong
> stays wrong until someone changes the rule** — which is why I4 exists, and why this is weaker on its own
> than the set makes it look.

**The difference:** the first says what the thing is. The second says what it replaces and what it does not
do. **A solution that names its own dependency is one a person can weigh against the others**, and the
person at the gate is choosing between five of them.

## 2 · `C153` — "names area compliance, which the regulatory map does not register"

**An area is named by the identifier the registry knows, and the screen's record carries each area's `source`, copied from the RegMap.**

Refused:

```
**Compliance:** client protection and communications is in play because the message content changes.
**GDPR:** nothing is in play. **Legal:** nothing is in play. **ICT and security:** ...
```

Passes:

```
#### Compliance, conduct and product regulation
#### GDPR and privacy
#### Legal and contracts
#### ICT and security
```

**The four areas the map registers are `A1` Compliance conduct and product regulation, `A2` GDPR and
privacy, `A3` Legal and contracts, `A4` ICT and security.** They are listed in
[`compliance-guidelines.md`](../../../specifications/definitions/know-how/compliance/compliance-guidelines.md). **A friendly name alone is not the
area.**

---

## 3 · `C126` — "area A1 is not on the screen at all"

**Every registered area gets its own section, including the ones where nothing fires.** An area that
found nothing is written as an area that found nothing, not left out.

Passes, for an area with nothing in play:

```
#### Legal and contracts

**Fired:** none. No contract, no terms change, no new counterparty.

| Sub-domain | State | Note |
|---|---|---|
| L1 Contract and terms | not_triggered | The account terms are unchanged; only the notice ahead of an existing right |
| L2 ... | not_triggered | ... |
```

**A sub-domain table with a state and a note on every row**, for every area. `C125` reads them and refuses
a blank.

---

## 4 · `C129` — "carries no escalation flag"

**The flag is a value, not a paragraph.** A section discussing escalation is not a flag.

Refused:

```
**Escalation.** Two triggers fire, both on unresolved sub-domains rather than on a confirmed risk.
```

Passes:

```
**Escalation:** flag **false**. None of C-E1 to C-E14 fire: no new product, no target-market change,
no advice model, no pricing change, no incentive change, no unclear classification, no new partner,
no AI involvement, no sustainability claim, no identified accessibility barrier and no regulatory finding.
```

**One flag per area, with the value written out, and the triggers that did not fire named.**
[`compliance-guidelines.md`](../../../specifications/definitions/know-how/compliance/compliance-guidelines.md) §7 is the rule.

---

## 5 · `C166` — "the screen puts ict-security in play and the summary does not say so"

**The screen and its summary are two things and they have to agree.** The summary is its own section and
it is derived from the tables above it, never written independently.

Passes:

```
#### Summary

**in_play:** [compliance, ict-security]

**escalation:** Two triggers fire, both because a build-level fact could not yet be established rather
than because a risk was found: the compliance card's control-adequacy trigger (S12) and the ICT card's
recovery-objective trigger (I5). Neither routes anywhere named, because no card names a role.

**open:** Whether the existing notification pipeline gives an adequate, reportable record of who was
warned and when (`controls_and_monitoring`) ...
```

**Three parts: what is in play, what escalates, what nobody could settle.** Each one has to be readable
against the tables, because that is what the check compares.

**And an `#### Uncovered` section for what was routed rather than screened**, naming the areas by id and
saying why each is out.

---

## 6 · `C104` — "what parts/SOL1.md wrote is not in 1-solution-set.md word for word"

**Never edit the joined artifact. Edit the part and run the join again.**

The joined document is generated. A change made in it is discarded by the next join, and while the two
disagree the join refuses to run at all, which leaves the only route looking like hand-editing. **A
producer spent about 626 credits editing a generated file whose sources were already
correct.**

The join is a task and takes no input:

```
SPOCK: stage 4 — assemble the solution set
```

**If the join says it cannot assemble**, the artifact and the parts have diverged. **Say so and stop.**
Do not repair the artifact by hand.

---

## 6a · The answers, and where they go

**They are a record, not a part.** One authoring invocation, one record, at
`records/4-solutions/A8-r0N-idea-set.record.md`, with `item_id` naming the solution it answers for. A
record is evidence that a production happened; a person reads none of these 128 lines and no gate opens
them. **Records kept in `parts/` beside the outputs are records no check sees**: the contract declares
`records: [idea-set]`, and a whole stage with no records looks to every check exactly like a stage that
legitimately has none.

**Here is the file, whole.** Not an excerpt: the shape of the frame is the part that cost a producer six
tool calls and two reads of `derive.mjs` to work out.

```
---
run_id: 2026-09-periodic-client-re-verification
record_id: R-A8-01
artifact_id: A8
item_id: I1
produced_at: 2026-09-07
bounds_hit: []
trace_id: []
sources: [A1, A4, A5, A7]
external_sources: []
---

# The compliance sweep for I1

All 128 touchpoints, answered against I1.

TP-01 · no
TP-02 · yes
DP-26 · cannot_tell · hosting_and_data_location
```

**One line per answer, and the question is never restated.** This is refused:

```
DP-01 — Does the solution store any field about an identifiable person? — yes
```

**All 128, every one of them, on that record and nowhere else.** Not in the solution file, not in `A8`.
The join does not carry them and `C104` does not look for them there. **A `cannot_tell` names an input id
the screening registry declares** — invent one and the derivation refuses it by name.

**Cite your record in your own part**, as `[rec:R-A8-0N]`, the way stage 3's cards cite theirs. `C108`
refuses a record that feeds a document the document never names, and `assemble.mjs` fills `assembled_from`
from what is on disk.

**Restating the question costs the block five times its size** on the one axis that has already killed two
stage 4 turns, and buys a reader nothing: you hold the cards while you answer.

## 6b · `derive.mjs` refuses a section derived from a different version of the solution

**If you re-author a solution, derive it again before the join.**

The derived file names the version of the solution it read, by content hash. Change the solution and leave
the section, and the join stops with *its compliance section was derived from a different version of the
solution*. **Run `SPOCK: stage 4 — derive the compliance sections`, then `SPOCK: stage 4 — assemble the solution set`.**

Nothing here is a timestamp, so touching the file does not settle it.

## 7 · The record carries identity; the prose carries the screen

**A part's front matter is short.** The compliance screen belongs in the body a person reads, not
duplicated into the front matter as structured data.

Passes, in full:

```
---
part_of: A8
item_id: SOL1
statement: "Proactive restriction warning: tell the client, before the deadline, exactly what happens"
compliance_touchpoints:
  - "TP-11: the app message and the letter are rewritten to state the consequence plainly"
  - "TP-39: a record has to exist proving the client was warned and when"
---
```

**Ten lines, not two hundred.** A producer wrote the whole screen into `compliance:` in the
front matter as well as into the body: parts at 80 to 83% front matter against 5% on the run that passed,
and about 2,090 lines of the same compliance data held twice on disk.

---

## 8 · Two tasks, and which is which

**`SPOCK: check what is written, then continue` takes no input and is the one to run.** It reports the
same result and advances the stage when the gate passes.

**`SPOCK: run one gate` takes nothing.** The run was already the one that is
unfinished and the gate is the one belonging to the stage the run is on, so both values the box asked for
were things the build already held. **A task with a box still cannot be completed by an agent**: the box
goes to the person, the turn ends there, and the output is unrecoverable — three attempts
each returned a dead terminal, and a producer that wanted a gate verdict had to ask the
person for it. **That is why the box went rather than why the rule changed.** **You may run it to read the
verdict, and you relay what it wrote**: the check is code independent of you, and a verdict is never yours
to state.

**Nobody writes the selected-solution document.** The workflow writes it when the person approves stage 4,
from the choice they recorded with `SPOCK: record a decision I made`, and the check task says so rather than
listing it as owed. This stage's own work ends at the solution set.

---

## 9 · Coverage bar

| What this body holds | Where |
|---|---|
| The eight solution sections, as headings, in both languages | §1 |
| Area identity and the area headings | §2 |
| An area with nothing in play, written out | §3 |
| The escalation flag as a value | §4 |
| The summary, and what it must agree with | §5 |
| Why a joined artifact is never edited | §6 |
| How short a part's front matter is | §7 |
| Which task an agent can run | §8 |

**What it deliberately does not hold:** whether a solution is any good, whether a screen's judgement is
right, and what a sub-domain means. Those are
[`compliance-guidelines.md`](../../../specifications/definitions/know-how/compliance/compliance-guidelines.md), the four area bodies and
[`method-canon.md`](../../../specifications/definitions/know-how/method/method-canon.md), and this body defers to all of them.

---

## 10 · Open

**Whether this works at all is a live question.** Every rule it illustrates was already written, and it
was written because two producers ignored the writing. **If the next stage 4 fails at the same points,
the lever is not more prose**, and this body should be read as evidence of that rather than extended.
