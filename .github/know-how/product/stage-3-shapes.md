<!-- GENERATED from specifications/definitions/know-how/product/stage-3-shapes.md. Do not edit this copy.
     Regenerate: node .github/scripts/know-how.mjs --write
     Know-how is read by skills, never written by them. It changes through a human-owned process,
     outside any run (PD90). -->

# Stage 3 Shapes

**Version:** 0.3 · **Date:** 23 September 2026 · **Status:** For review
**Owner:** Česká spořitelna · **Written by:** Igor Tadić · **Read by:** the skills that map a landscape, profile a participant, or synthesise

---

## What this body is for, and when to open it

**Open it when a gate has just refused something you wrote.** Keyed on the message, not on the rule.

---

## 1 · `C60` — a card below the source floor

**What the gate said**, verbatim:

```
airbank.cz: 3 source(s) resolve to 3 distinct parties (airbank.cz, thebanks.eu,
flytorelocation.com) — the floor is 6 independent of each other, and a card below it cannot
answer the standards the synthesis grades it against
```

**The floor depends on the standards version the stage recorded**, and a run is held to the one it ran
under. Read it off `RUN-STATE.md`, `stages[id==3].know_how`, the `competitive-analysis-standards@` entry.
**From `@0.17` a run whose record holds a supplied market is held to two, one of them the participant's own material.**
Read that off the same stage's `supplied_market:` entry, never off `egress_basis`.

| Version | Floor |
|---|---|
| before `@0.10` | **2** |
| `@0.10` to `@0.15` | **6** |
| **`@0.16` and after** | **4** |
| **`@0.17` and after, where a person supplied the market** | **2**, one of them primary |

**The shape that produced it.** Two or three sources per card, most of them the participant's own site plus
one aggregator that carries several of the cards:

```yaml
sources:
  - publisher_key: airbank.cz
  - publisher_key: thebanks.eu
  - publisher_key: flytorelocation.com
```

**Why a producer writes it.** Because it reads as enough. On one run an aggregator, `thebanks.eu`,
carried the independent half of **six of the ten cards**, and each card also cited the bank itself. That is
two distinct parties per card and it looks like corroboration. It is one aggregator and ten vendors.

**The shape that passes**, at `@0.16`: four distinct `publisher_key` values, **one of them the participant's
own material**, and at least two of the four primary or domain-specialist — a regulator, a trade body, a law
firm, an industry analyst.

```yaml
sources:
  - publisher_key: airbank.cz          # the participant's own material — required
  - publisher_key: cnb.cz              # regulator, counts toward the two
  - publisher_key: thebanks.eu         # aggregator
  - publisher_key: hn.cz               # press
```

**Counting is by `publisher_key` equality and never by prose.** A press release and three outlets reporting
it are one source. A vendor walkthrough and that vendor's product pages are one party — that is the failure
`C60` was written for, in January.

**A card resting on four aggregators has met the count and established nothing.**

---

## 2 · When the participant's own site cannot be reached

**This is real and it happened three times in ten on one run**: `moneta.cz` blocked, `csob.cz`
returning server errors, `unicreditbank.cz` reachable only through a search snippet.

**Do not drop the participant and do not pad around it.** Declare it:

```yaml
  - identity_key: moneta.cz
    primary_unreachable: "Two fetch attempts on 11. 9. 2026, both refused by the site."
```

The check then names the gap in its own pass message rather than reporting a clean pass, so the person at the
gate sees it. **A substitute is exempt by shape** — its identity key carries a `:` and no publisher key can
ever equal it.

---

## 3 · `C81` — the trend classes

**Five per class is the ask and three is the floor**, in all three classes: `business` `B1..B5`,
`technology` `T1..T5`, `regulatory` `R1..R5`. `C81` refuses a map that skips a class, thins one below three,
or gestures at a regulation it does not name.

**A regulatory trend names its instrument and the date it bites**, or states that the date is unsettled.
*Upcoming EU regulation* cannot be read, cannot be dated and cannot be checked against by anyone downstream.
One run named `Regulation (EU) 2024/886`, PSD2 and PSD3 with the provisional agreement dated
27 November 2025 and the approved text 5 May 2026. **That is the shape.**

**Five is a ceiling and not a target to exceed.** A class at seven fails. If the fifth is padding, four with
the shortfall stated is the honest answer.

---

## 3a · `C84` — "the verdict is missing …"

**The verdict's four parts are headings in the run's language**, the `language` the brief (A1) declares. A
run that declares none is English.

| | English run | Czech run |
|---|---|---|
| the section they sit under | `## Verdict` | `## Závěr` |
| **1** | `### Diagnosis` | `### Diagnóza` |
| **2** | `### Parity` | `### Parita` |
| **3** | `### The opening` | `### Příležitost` |
| **4** | `### Risk` | `### Riziko` |

**One set or the other, never a mixture.** `C84` looks only for the set in the run's language, so a Czech run
carrying `### Diagnosis` fails as though the part were missing, and so does an English run carrying
`### Diagnóza`. Bold text is not a heading, and each heading is the name alone.

Refused, on a Czech run:

```
## Závěr

### Diagnosis
```

Passes, on a Czech run:

```
## Závěr

### Diagnóza

### Parita

### Příležitost

### Riziko
```

Passes, on an English run:

```
## Verdict

### Diagnosis

### Parity

### The opening

### Risk
```

---

## 3b · `C101` — "every finding names a problem it bears on, or says it bears on none"

**A facet is any `##` section holding a line that begins with a tier label**, and it carries at least four
such findings. The labels are the same in both languages, `**[universal]`, `**[common]`, `**[emerging]` and
`**[rare]`, and nothing on the line comes before them.

**Each finding names an opportunity id exactly as A4 writes it, or says it bears on none in this one
sentence**, in the run's language:

| English run | Czech run |
|---|---|
| `Bears on none of this run's opportunities.` | `Nedotýká se žádné z příležitostí tohoto runu.` |

The id or the sentence can sit anywhere in the finding, which runs to the next tier label.

Refused on a Czech run, a finding that names neither:

```
**[common] Pět z osmi bank ukazuje, u kterých obchodníků má klient uloženou kartu.** Klienti to hledají v aplikaci.
```

Passes, on a Czech run:

```
**[common] Pět z osmi bank ukazuje, u kterých obchodníků má klient uloženou kartu.** Týká se O1 a O3.

**[rare] Jen jedna banka upozorní klienta před další platbou.** Nedotýká se žádné z příležitostí tohoto runu.
```

Refused on an English run, a finding that names neither:

```
**[common] Five of eight banks show which merchants hold the client's saved card.** Clients look for it in the app.
```

Passes, on an English run:

```
**[common] Five of eight banks show which merchants hold the client's saved card.** Bears on O1 and O3.

**[rare] Only one bank warns the client before the next payment.** Bears on none of this run's opportunities.
```

**Do not open a line of the evidence table with a tier label**, or that section is read as a facet and held
to four findings.

---

## 3c · `C56`: "… a promoted opportunity that no synthesis element addresses and no absence records"

**Every opportunity stage 2 promoted is answered, or recorded as absent.** Promoted means `A4` lists it under
`primary` or `secondary`. It is answered when a standard, pattern or trend in the synthesis names it in its
`addresses` list. Otherwise it belongs in the synthesis's `absences:` list, one entry per opportunity.

**What the check reads, and where.** The `absences:` list on the synthesis's front matter where the document
carries one, and on the synthesis record where it does not — the document's list wins, so a wrong list there
hides a right one on the record. The failure message names the file it read. It then asks whether an entry's
`problem` names the opportunity id **as a word of its own**.

Passes, all three:

```
absences:
  - problem: O3
  - problem: "[O4] Nikdo z deseti profilovaných účastníků to nepopisuje."
  - O5
```

Refused:

```
absences:
  - opportunity: O3            # the id is under another field, and only `problem` is read
  - problem: "O30 mě s to netýká"   # O3 inside a longer id is not a name of O3
```

**Why the market is silent goes in the entry, after the id, or in the synthesis's text.** Either is fine: an
explanation no longer costs the entry its id. What still fails is an id written under another field.

---

## 3d · `C104`: "… none of them has that entry" or "… is not the value … carries"

**A card part carries two fields in its front matter and nothing else**: `part_of: A6` and `item_id`, the
participant's identity key. Every other value of the card belongs in the card's record, in its `card:` block
(`records/3-competitive-analysis/A6-rNN-{name}.record.md`).

**A value a part carries is compared with a record entry, never with the document.** The check resolves the
entry by `id`, and by `identity_key` where the list keys on that, which is what a card record's `card:` block
does. Writing the value into the card's heading, into a line beneath it, or anywhere else in
`2-competitor-cards.md` changes nothing: the document's text is never read for these values. The failure
message names the record file it compared against.

Passes:

```
---
part_of: A6
item_id: airbank.cz
---
## Air Bank
```

Refused, because `record_id` is a value the part carries that the card's `card:` block does not:

```
---
part_of: A6
item_id: airbank.cz
record_id: R-A6-01
---
```

**Never take back a part to clear `C104`.** Remove the extra field and run the join again. A withdrawn part
is a part the check stops reading, so it passes and says nothing — and the card's figures are left in the
document with no record behind them.

**After changing a part, run `SPOCK: stage 3 — join the cards, then the store` again**, and never edit the
card region of the joined document by hand.

### What the join itself refuses, and what to do about each

The task refuses before `C104` is ever reached, and its refusals are here because a stage 3 turn cost 1,763
credits rediscovering them one at a time.

**Every part carries exactly one `## ` heading, and that heading is how the join places it.** A part with
none is named in the refusal — *carries no `## ` heading, so the join has nothing to place it by* — and
nothing is spliced until every part has one.

**The card region runs from the first card heading to `What we could not establish`**, or
`Co se nepodařilo zjistit` on a Czech run. A document ending at neither is refused, because the region then
has no end.

**Where the document already lists card headings, they and the parts are one set.** The refusal names both
sides — how many headings the region lists, how many parts the folder holds, which headings have no part,
which parts have no heading — and it names the way out: **empty the card region between the opening and the
closing heading, then run the join again.** That is not hand-editing the cards. The region belongs to the
script, and handing it back empty is how you give it back.

**A successful join prints the headings it placed, in the order it placed them.** Read that line. Nothing
about what the join did has to be recovered by reading the document back.

**Two identical refusals and you stop**, per *Two tries at the same thing* in the shared rules. A refusal
does not change between tries, so a third attempt at the same file is refused the same way.

---

## 4 · Before you research anything

**Reuse is suspended from build 1.7: read the store, reuse nothing, research every participant.** A card's
body is written against the subject of the run that made it, and the store records which run a card came
from and not what that run was researching, so no date or scope test can tell a card fit for this run's
question from one that is not. `A5.reused[]` is empty. The store still tells you a participant exists and
that somebody has looked at it, which belongs on the map under that participant's `reason`.

**`material` reads `research` on every row and decides nothing.** A row marked `fabricated` does not
carry invented figures about a named bank: the marking marks the customer material of the run the
card came from, and the example runs' competitor research was searched from public sources about real
institutions. The marking has gone from the ranking and the field is a constant.

**There is no list to send, so do not send one.** Say in one sentence that you are researching the market
yourself rather than reusing earlier research, and carry on without stopping. A turn that ends on an empty
list asks a person to approve nothing.

---

## 5 · Coverage bar

This body covers what `Q3` has actually refused: `C60`, twice; `C84` and `C101` on Czech runs; and `C56` and `C104`, both on one Czech run, each twice and then signed off. `C81` is here because it is the class this
build reached two stages late in an earlier run, not because it has failed. **Everything else waits for a
real failure** — an entry written from the rule rather than from one is what this pattern replaces.

## 6 · Open

**Nothing here is enforced.** No check reads this body; the instruction is the whole mechanism.
