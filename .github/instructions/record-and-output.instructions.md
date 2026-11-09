---
applyTo: "**/{1-brief,2-problems,3-competitive-analysis,4-solutions,5-mvp,6-prd,7-initiative}/**/*.md"
description: "A run holds records and the documents assembled from them. Read before writing any run artifact."
---
# Records and outputs — §6.0

**A stage does not write one file per artifact. It writes a record, and a document assembled from it.**

This is the shape every check reads. It is written here and not only in
[`specifications/PILOT-BUSINESS-LOGIC.md`](../../specifications/PILOT-BUSINESS-LOGIC.md) §6.0, where no agent is sent, because
**a producer following its own skill exactly could not pass stage 1** without it: a dry run wrote the document its
skill named, put the fields in body sections, and Q1 failed it on five checks, none of them its fault.

## The two files

| | Record | Assembled output |
|---|---|---|
| Path | `{runs_root}/{run_id}/records/{stage}/{ID}-r{nn}-{slug}.record.md` | `{runs_root}/{run_id}/{stage}/{name}.md` |
| Is | **one production.** What a single invocation of a skill produced | **what a person reads.** Assembled from one or more records and citing each once |
| Carries | every field a gate decides about the content, plus `record_id`, `item_id`, `produced_at`, `bounds_hit`, `trace_id[]`, `created_at` | `assembled_at`, `assembled_from[]`, `produced_by`, and the envelope's identity and acceptance fields |
| Never carries | the assembly fields | **any per-production field.** Not `produced_at`, not `bounds_hit`, not `trace_id[]`, not a per-production reduction marker |

**`could_not_verify[]`, `produced_by` and `sources[]` sit on the output**, not the record, and all three
are worth stating because each looks like a production field. PD148/D7 put `could_not_verify[]` on the
artifact a reviewer actually opens. `produced_by` is one value for the whole document however many
productions stand behind it, which is why the generated skeleton writes it under the output half and says
in a comment that it is deliberately absent from the record. A record's `sources[]` is what that one
invocation fetched and the output's is everything the document rests on, which is the claim C18 and C80
have always read off an artifact. **A table that puts `produced_by` on the record splits one run into two
conventions**, ten documents written without it while five carried it, and no check could tell them apart.

## What reads this

- **C10** looks for the content fields **on the record.** A field written into a body section is a field
  the gate cannot find, whatever the document says.
- **C107** refuses a citation resolving to no record. **C108** refuses a record nothing cites, which is
  the one that matters: an assembled document can drop a record, read perfectly and pass everything else.
- **C109** refuses a production field on an output.

## The citation

The output names its records in `assembled_from[]` and cites each once in the body as `[rec:R-A1-01]`.
One record, one citation. **The body is prose a reviewer reads and the record is what a gate decides on**,
so a statement written into both is a statement that can go stale in the copy nobody reads — which is
§6.13, found on ten PRD requirements before the split existed.

## Why it is not simply one file

`2026-04-card-disputes` produced a competitor deep-dive of **155,638 characters of record behind 8,839
characters of reading.** The record was the front matter, the body summarised it, and a generated copy
stripped the front matter off again. A record is now one production and an output is assembled from as
many as it took.

## The template, and the half of it you no longer type

[`.github/artifact-fields.yaml`](../artifact-fields.yaml) carries a `skeleton:` for every artifact: the
record with its envelope and its content fields nested as §6 declares them, then the output with its own
half of the envelope and, where the artifact carries a decision gate, the decision block. It is
**generated from §6**, so it cannot disagree with the specification without the specification having
moved. The flat `fields:` list beside it is the same set with the nesting removed, and it is there for the
checks rather than for you.

### The record's filename is its identity

`{ArtifactId}-r{nn}-{what-it-is}.record.md` — `A8-r01-idea-set.record.md`, `A6-r03-lloyds.record.md`.

**The number in the filename IS the record's `record_id`.** The workflow derives `R-{artifact}-{nn}` from
the name; the frame is written with it, and what the checks read takes it from the name over whatever the file
declares, so a filename that is wrong renames the record and every citation to it resolves somewhere else. **Two records deriving the same
number is refused** and the message names both files and the repair, which is a rename and never a delete.

A name with no `-r{nn}` is refused outright and the message tells you the next free number for that
artifact in that run.

### One record, or one per item — the contract decides, not you

**A stage that declares one record kind gets one record.** Its fan-out writes one file per instance under
`parts/` and the join produces a single record from them; that part file is the per-item unit, not the
record. Stage 4 is this shape.

> **`parts/` means two different things and this paragraph is about only one of them.** Here it is about
> RECORDS: stage 4's part files fold into one record. **Stage 3 also writes `parts/`, and there it is about
> the DOCUMENT** — one part file per participant, which `card-join.mjs` splices verbatim into
> `2-competitor-cards.md`, so that everything between the first card heading and *What we could not
> establish* is a copy of files already on disk rather than something you re-author. That is specified in
> `deep-dive/SKILL.md`, and a stage-3 producer that never opened it wrote the joined file directly.
 **Splitting the list into five records puts them into a composition the
transfer-fidelity check was not built for**, and the fold keeps only the first, so four of them go
silently.

**A stage whose artifact declares a SINGULAR field is the other shape.** Stage 3.2 says
`record_shape: one_per_participant`, `A6` declares `card:` as the singular of `cards:`, and there you do
write one record per item — the singular appends rather than replacing. `C138` names which shape you are
in when it fires, and the remedy it prints is the one that is true for that field.

### Reading what the checks say about YOUR document

Run `SPOCK: check what is written, then continue` and read `.github/last-task.md`. **It lists every document
this stage owes and what the checks say about each, yours included**, so the findings that are yours are the
ones under your document's name. Never run the whole run's gate to repair one document: a producer who did
read findings belonging to five other documents.

### Every value is one line

**One line per value**, quoted if it carries a colon or a hash: `note: "a: b"`. Or a `- item` list under
the key. Nothing else.

Inside double quotes, write a quote as `\"` and a backslash as `\\`. Every script reads a backslash inside
quotes as the start of an escape, so `"C:\new"` reads as `C:`, a line break and `ew`.

**`|` and `>` are refused outright rather than half-read.** The reader stops and the gate reports nothing
at all, for any document in the run, until the file is repaired. `SPOCK: check what is written, then continue`
refuses the same shape as soon as you run it after the write, which is earlier and the same repair.

**The workflow writes the frame of every document and its record before you write**, with everything
it already holds filled and every place that is yours marked `[[fill: …]]`. Fill those places, one section per
write; a file still holding one is not written yet, and the report after each task says how many are left.

**Never write the `decision:` block.** It is a person's, `by_agent` is always `false`, and it is written
when the decision has been taken rather than stubbed out beforehand — a block carrying only `gate: G1` is
a decision record with nobody in it. The workflow does not write it either, deliberately: a script that
could fill it is a script that could accept a stage.

## Write it in pieces

**A document with repeated sections is created with its opening and then extended one section per write.**
Create the file with its front matter, its title and its first section, then add each further section with
its own edit. **Never emit a whole long document in a single response.**

**This is not a style preference. A response that exceeds the surface's output limit is refused, and a
refused write delivers nothing at all.** A stage 3 synthesis was attempted twice in one
pass, by a producer that had read every card correctly, and both attempts were cut off mid-response. **Two
hours of work reached disk as zero bytes**, because everything a producer holds is in the response it was
writing when it was cut.

The limit belongs to the surface and not to any one stage, so this applies wherever a document is long:
the competitor cards, the synthesis, the solution set, the requirement document.

**Small and certain beats whole and lost.** A thin first pass is on disk and can be extended. A complete
one that was refused is not anywhere.

**Two mechanics that cost a round each when they were learned.** An edit that appends must anchor on text
already in the file, so anchor on the last line you wrote. And **a write that opens the file it is reading
truncates it**: read, close, then write.
