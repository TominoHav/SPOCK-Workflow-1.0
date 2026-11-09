---
name: synthesis
description: >
  Distil the competitor cards into a competitive synthesis — standards, patterns, trends — each element
  tracing to a card and bearing on the run's opportunities. Works on the cards, never the market; holds no
  tools. Trigger phrases: synthesise the market, competitive synthesis, stage 3 synthesis, distil the cards.
---
# synthesis

**Stage 3.3** · Agent `competitive-analysis` · Pattern `synthesis` · Gate **Q3** (no decision gate)

## Contract

- **Inputs:** `A6` deep-dive cards · `A4` opportunities · `A3b` framed opportunities *(the outcome each one states, which is what a market finding bears on)* · `S2` run state · `.github/know-how/market/competitive-analysis-standards.md` · `.github/know-how/writing/agent-interaction.md` · `.github/know-how/writing/output-voice.md` · `.github/know-how/writing/documentation-standards.md` · `.github/know-how/method/method-canon.md` *(§4.3 is what this stage is for)* · `.github/know-how/product/stage-3-shapes.md` *(open it when a gate refuses something you wrote: it gives the shape that passes, and it is why nobody needs to read `check.mjs`)*
- **Capability:** **`[]` — empty, and load-bearing.** Not S1 at large, not the market — the cards, and only the cards
- **Output:** `{runs_root}/{run_id}/3-competitive-analysis/3-competitive-synthesis.md` — **run-scoped, never written to S1**
- **Record:** `{runs_root}/{run_id}/records/3-competitive-analysis/` — **the output above is assembled from a record and does not stand alone.** Read [`.github/instructions/record-and-output.instructions.md`](../../instructions/record-and-output.instructions.md) before writing either: the fields a gate decides sit on the record, and an output carrying a production field is refused (C107, C108, C109). **The workflow writes the frame of the output and its record; fill each `[[fill: …]]`.** **The envelope around them is not yours, and there is no task to run for it**: what is fixed comes with the frame, the checks read the rest as the workflow computes it, and the workflow writes that into the document when the person approves. On a run started before 1.16.1, `SPOCK: check what is written, then continue`, which you run after every document, fills it first.
- **Exclusions:** never researches · never reaches the market · **A7 is never written to the store** — it is run-scoped by contract, and this binding holds no capability to write it there · recommends no action

## Why the empty list is the whole point

A7 is the one output of this stage that stage 4 reads directly, and **every solution in the run must bind to
one of its elements.** If this step could research, an element could enter A7 with no card behind it — and
`C3` (every element traces to a card or a named source) would still pass, because a named source is a
valid trace. **The empty capability list is what makes "every element traces to a card" mean the same as
"every element came from research that passed through a card and its bridge."** A rule telling it not to
go looking would not do that; the empty list does. Thin cards produce a thin synthesis, and the synthesis
**cannot compensate by going and looking** — it names the thinness instead.

## Procedure

**1 — Work facet by facet, not as one list.** Go through the cards six times, once per facet — **offering ·
segment · features · USPs · pricing · differentiation** — and ask what the market does in each. A single
undifferentiated pass produces a list of impressions; six narrow passes produce a baseline. **The features
facet is where standards actually emerge**, and it is the one to spend the most on.

**2 — Distil into three categories** — `standards[]`, `patterns[]`, `trends[]`, at most **7** elements
each. Each element is a `statement`.

**3 — Grade every standard by how much of the market exhibits it** (§4.1 of the Standards). The tier is
**counted, not judged**: carry how many of the profiled participants exhibit it and out of how many, and
the tier follows from that fraction.

| Tier | Condition | What it means |
|---|---|---|
| **`universal`** | above **80%** of profiled participants | Table stakes. Omitting it is a visible deficiency |
| **`common`** | a majority, at or below 80% | Expected. Omitting it needs a reason |
| **`emerging`** | a minority of **three or more**, **concentrated among participants marked `innovator`** | Where the market is going. The strongest input to stage 4 |
| **`rare`** | **exactly two**, no pattern | A choice, not a standard. Recorded so it is not mistaken for one |

**`emerging` is the tier that earns the trend pass its keep.** A minority standard is noise unless you
know that minority is the innovators, and A5's `standing` is what tells you. Where an emerging standard
lines up with a trend from A5, **name the trend id**.

**4 — Carry an evidence table**, and treat it as the part a reader checks:

| Standard | Exhibited by | Tier | Confidence | What it means for this run |
|---|---|---|---|---|

**Every profiled participant appears somewhere** — in a standard, in a pattern, or in the table's counts. A
participant that was researched and then appears nowhere is either research the run did not need, or an
omission. Both are worth seeing and neither is visible if the table is partial.

**4b — Every row of the evidence table is the same kind of thing, and the coverage claim is read off the
prose.** On one run the table's last three rows carried participant names in the Standard column
with tier `n/a`, so the closing line could say every participant appears. **That is a claim manufactured as
table rows rather than found.** The coverage sentence names where each participant actually appears: in a
standard, in a pattern, in a trend, or in an absence.

**5 — Trace every element** to an `A6` card key or a named source (**C3**), and name **at least one `A4`
opportunity** it bears on (`addresses[]`).

**6 — A standard names at least two participants exhibiting it.** One participant doing something is a
choice, not a market standard.

**7 — Record what the read did not find.** A run opportunity meeting **no** response in any participant this
stage read goes in `absences[]`. **An absence is a finding about the read, not about the market.** Word it
with what the read covered: *none of the {n} participants this stage read {does the thing}*, and what the
read's sources were. Never call it a gap in the market or say *the market has not*: **only a participant
shown to have chosen not to do something is stated as a fact about that participant.** It is still often the
most useful thing stage 4 receives, because it tells stage 4 where the read found nothing.

**8 — Recommend nothing.** No element proposes an action; solutions are stage 4's job. Describe what the market
does; stop there.

**8b — The verdict's opening weighs its parts by what the cards show, and never prices or picks one.** It
says which part has the least proven ground beneath it and which is the most complete, naming the
participants behind each. **Never say what a part would cost the bank, how hard it would be, what the bank
can already do or where stage 4 should start, unless a card or the brief establishes it**: a card says what a
competitor does and nothing about this bank's systems, so such a claim traces to nothing, and step 5 holds
for it as for any element. Where it matters and nothing establishes it, say it is not established. The same
goes for every finding, for the evidence table's last column and for the message that closes the stage. The
four verdict headings do not move — `C84` counts them — and this is the paragraph beneath the first.

> **Worked example, §4.2a of the Standards.** A verdict opening that diagnoses the market correctly and
> weighs nothing, beside one that says who shows each part and how much proven ground is under it, and
> prices none of them. **The weighing is the part the next stage cannot do for itself, and the price is not
> the cards' to give.**

**9 — Write A7 with the run identifier, and never to S1.** Reaching the 7-per-category bound is recorded.

> **Coverage beats length (§4.3), and this is where it breaks most often** because the material is
> largest here. Every facet is produced and every profiled participant is accounted for. Near a bound,
> **compress**: shorten sentences, cut restatement, merge two findings describing the same thing. **Never
> drop a participant, never drop a facet, never truncate the evidence table.**

> **You cannot compensate for thin cards by going and looking.** If the cards will not support a facet,
> **say which facet and why** rather than filling it from general knowledge. That sentence is a finding
> about this run's research and it is worth more than a plausible paragraph.

> **You do not run the quality gate, and it is the only control on this stage** — there is no human gate
> behind Q3 (§2.1). Never report a gate result for your own output. You may trigger it with
> `SPOCK: check what is written, then continue`, and triggering it is not running it: you relay what it wrote.

## Quality rules — the evals derive from these

- Every element traces to an A6 card or a named source (C3)
- Every element names at least one A4 opportunity it bears on
- Every standard names at least two participants exhibiting it
- Opportunities meeting no market response appear in `absences[]` — absence is a finding
- No element recommends an action *(judged rubric — the line between observation and recommendation is read, not parsed — §3.4)*
- At most seven elements per category, and reaching the bound is recorded
- A7 carries the run identifier and is never written to S1 — run-scoped by contract, enforced by the empty capability list

**No check decides any of them** (§6.1 of the Standards says so in full):

- The cards were worked facet by facet across all six, not as one undifferentiated pass
- Every standard carries a `tier` of `universal`, `common`, `emerging` or `rare`
- Every standard carries how many profiled participants exhibit it, and out of how many
- The tier follows from that fraction rather than from judgement, and `universal` means above 80%
- `emerging` standards are cross-checked against participants marked `innovator`, and name the A5 trend where one lines up
- The evidence table is present and every profiled participant is accounted for in it
- A facet the cards could not support is named as such rather than filled from general knowledge
- The coverage floor held: no participant, facet or table row dropped to fit a length bound

## Gate

**Q3 runs twenty-two checks and five of them read A7.** These five are yours, with what each one actually
matches, because a rule you cannot see the shape of is a rule you meet at the gate:

| | What it reads on your output |
|---|---|
| **`C3`** | every element traces to an A6 card key or a named source |
| **`C56`** | every standard's `traces_to` names **at least two** participants, and **every promoted opportunity is either addressed by an element or listed in `absences[]`** |
| **`C84`** | the verdict carries four sub-headings with these exact words, in the run's language, the `language` A1 declares (English where it declares none): English `Diagnosis`, `Parity`, `The opening`, `Risk`; Czech `Diagnóza`, `Parita`, `Příležitost`, `Riziko`. **One set or the other**: a Czech run carrying the English words fails as though the parts were missing |
| **`C87`** | every standard carries a `tier` and a `source_count` in the form **`N of M`**, `M` equals the number of cards the stage carries, and **the tier is recomputed from the fraction**: above 80% `universal`, above 50% `common`, otherwise two or more `emerging`, one `rare`. A tier that does not follow from your own count is refused |
| **`C101`** | **each facet carries at least four findings**, a finding is a line **beginning** `**[universal]`, `**[common]`, `**[emerging]` or `**[rare]`, and each one names an A4 opportunity it bears on or says it bears on none in exactly this sentence, in the run's language: English `Bears on none of this run's opportunities.`, Czech `Nedotýká se žádné z příležitostí tohoto runu.` The tier labels are the same in both languages. Any `##` section containing such a line is read as a facet |

**`C101` reads the start of the line**, so the tier label opens the paragraph and nothing precedes it. Do
not start a line in the evidence table with a tier label, or that section becomes a facet and is held to
the four-finding floor.

The other seventeen checks at Q3 read the landscape map, the competitor cards, the supplied list and the supplied folders. `C24` covers the store,
which you never write to. **No decision gate** — Q3 is the whole acceptance of stage 3.
- **That A7 never reaches S1 is a separate guarantee, and C24 is not its control** — A7 is governed output, not free-roam. It is kept out of the store by the empty capability list and A7's run-scoped contract, not by a coverage check.

## The one reduction that is real, and two that were false

- **Most of Standards v0.5 is checked.** `C87`
  decides the tiers and their arithmetic, `C101` decides the facet floor and the opportunity naming, `C56`
  decides the two-participant bar and the absences, and `C84` decides the verdict's shape. **An untiered
  list fails.** **What survives is the
  evidence table**, which §6.1 of the Standards still records as followed rather than checked, and the
  compress-rather-than-drop rule, which is a judgement about what was cut. **Where the cards could not
  support a facet, name it**, and that one is still on your word.

### Both of the ones recorded here before were false

> **`standards_basis: indicative` is a false mark on A7.** **The body exists** and §4 carries the category definitions and
> the two-participant bar this skill authors against, so the mark was wrong and the body was there to
> read.
>
> **The pattern is what matters, not the two sentences.** A reduction is how this workflow stays honest
> about what it could not do, and one that is untrue spends the credibility the real ones live on.

**Author against [§4 of the Competitive Analysis Standards](../../know-how/market/competitive-analysis-standards.md).**
A standard needs two participants exhibiting it, every element traces to a card or a named source (C3),
absence is a finding rather than an empty section, and the synthesis does not recommend.

## Bounds

| Bound | Value | On reaching it |
|---|---|---|
| Elements per category | **7** (`max_elements_per_category`) | Record it; do not overflow the category |
| Effort | `synthesis`, `effort: high` | The area permits a synthesis-tier override; reaching a step bound is recorded |

## Edges

| Situation | Do |
|---|---|
| A pattern you can see is not in any card | You cannot add it — you hold no tool to research it. Name the gap; a thin card set makes a thin synthesis |
| A run opportunity meets no market response | Record it in `absences[]`. That is a finding stage 4 needs, not an omission |
| Tempted to recommend what the bank should build | Stop. That is stage 4. Describe the market and hand it on |
| An element rests on one participant | It is a choice, not a standard. Move it to `patterns[]` or drop it |

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
