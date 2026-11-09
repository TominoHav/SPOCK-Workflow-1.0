---
name: initiative-authoring
description: >
  Produce a delivery-ready initiative document in the run's declared language from the agreed PRD, following the ČS initiative
  template. Verifies the PRD agreement block before starting. Trigger phrases: author initiative, create
  initiative, initiative document, iniciativa, stage 7, delivery-ready.
---
# initiative-authoring

**Stage 7.1** · Agent `business-analyst` · Pattern `single-shot` · Gates **Q7** then **G7**

## Contract

- **Inputs:** `{runs_root}/{run_id}/6-prd/2-prd-agreed.md` · `.github/know-how/product/initiative-template.md` · `.github/know-how/writing/agent-interaction.md` · `.github/know-how/writing/output-voice.md` · `.github/know-how/writing/documentation-standards.md` · `.github/know-how/method/method-canon.md` *(§4.7 is what this stage is for)*
- **Output:** `{runs_root}/{run_id}/7-initiative/initiative.md`
- **Record:** `{runs_root}/{run_id}/records/7-initiative/` — **the output above is assembled from a record and does not stand alone.** Read [`.github/instructions/record-and-output.instructions.md`](../../instructions/record-and-output.instructions.md) before writing either: the fields a gate decides sit on the record, and an output carrying a production field is refused (C107, C108, C109). **The workflow writes the frame of the output and its record; fill each `[[fill: …]]`.** **The envelope around them is not yours, and there is no task to run for it**: what is fixed comes with the frame, the checks read the rest as the workflow computes it, and the workflow writes that into the document when the person approves. On a run started before 1.16.1, `SPOCK: check what is written, then continue`, which you run after every document, fills it first.
- **Exclusions:** never writes the PRD agreement block · never invents a Jira identifier · does not decompose into epics — the pilot removed that extension

## Verify the agreement before you start

**A13 is A12 plus a human's block.** Read it first. If the agreement block is absent, empty, or undated,
**return `needs-user-input` and stop** — say which is missing and who has to supply it.

An initiative authored from an unagreed PRD is a document nobody has accepted, carrying the authority of
one that has been. That is the failure this check exists to prevent.

## Procedure

**1 — The Jira key is on the run record under `jira_key`.** It is mandatory. **Never invent it, never
auto-generate it, never derive it from the slug.** Where the record carries none, stop and name
`SPOCK: record the Jira key` to the person: one box, the key Jira shows on the initiative, or none yet. Write
`initiative.id` and `jiraLink` from it, with `id_basis: jira`; where it reads none yet, write `none yet` in both
and `id_basis: none_yet`. The title line follows the same key: `# [<KEY>] - <name>` with a key, and `# <name>`
where it reads none yet, the name alone, with no brackets and no dash.

**Do not ask what kind of key it is.** `id_basis` is `jira` and you write it without asking. **Every run
is real**, and a person asked whether their own run is
a test is being asked to classify their work rather than supply a value. `fixture` is what the committed
runs carry because they were fixtures; it is not a question a new run answers.

**And never write that answer into the body.** `C175` refuses an initiative that tells its reader the run
is not real — five committed initiatives do, in two languages, and the bank is the reader.

**2 — Author the document** to the template: thirteen frontmatter keys in order, every section in order under
a heading of its own, `id` matching `jiraLink`.

The initiative has no *What we could not establish* and no *How this was produced*: what the run could not
establish is an open question for the bank and goes in the open-questions section (`otevrene_otazky`), and how it
was produced stays in the PRD.

**Write each section under its id or either of its names, and the workflow writes the heading.**
The workflow writes every section heading in the language the run declared, from the table in
§3.1a of the Initiative Template, so you never choose between its columns and never have to type a name right.
The frame carries each heading, and one you write by its id or its other name is written as the template's when
the person approves, which the checks read until then; on a run started before 1.16.1 `SPOCK: check what is
written, then continue` writes it.
**A heading it cannot place is refused**, naming the line, the heading as you wrote it and all fifteen headings
in order, and nothing is written until every section is placed. A heading deeper than a section, such as one
criterion or one risk, is yours and is left as you wrote it. **Never infer the language** from the material,
the topic, or the language of the conversation; the workflow reads it off `A1`.

**3 — Draw every factual statement from the agreed PRD.** Where the PRD does not settle something, mark
it as an assumption rather than asserting it. **Do not reach back to earlier artifacts for facts the PRD
chose not to carry** — the PRD is the agreed statement of the work.

**4 — Fill the tables or say why they are empty.** `zavislosti` and `rizika_a_mitigace` ship with an
example row. **Shipping that row unchanged means nobody considered either**, and it reads as a finding,
not an omission.

**4b — The value narrative is ČS's Product Management Guild template, and it has three rules of its own.**
`outcome` states the change in customer **behaviour** and never the solution — how it is delivered belongs
in `rozsah_iniciativy`. `byznys_cil` names the Key Result the initiative feeds, **or says the run did not
supply one**; it is never inferred from the topic. And all three success metrics appear — behavioural,
business and perception — with any the run could not supply **stated as not supplied, with what is
missing**. A kind left silent and a kind with nothing to report read identically, and only one of them is
a claim somebody made.

**5 — Scope both ways.** `out_of_scope` is not optional. An initiative that says only what it includes
has not been scoped.

> **Worked example, §3b of the Initiative Template.** An opening that names the solution and never
> describes it, beside one that describes it, says why it beats the alternatives, and closes on what the
> document is not claiming. **That last paragraph is the one to write first**: a bank receiving a confident
> document with no honesty section has no way to tell what it can lean on.

**6 — Write the artifact, then stop.** State what you produced and anything you could not resolve.

> **Every section of the template is present, in its order, under its own name, and none of them is a
> template section you left as you found it.** The section set is ČS's and it is closed: you do not add a
> section, you do not drop one, and you do not rename one into something that reads better in English.
>
> **Where the run gives a section nothing, the template's own convention answers it and it is not the PRD's.**
> The PRD lets a section be declared not applicable with a reason. This document does not. `otevrene_otazky`
> takes an explicit `-`, unknown optional metadata takes `-`, and the two table sections — `zavislosti` and
> `rizika_a_mitigace` — ship carrying example rows. **Leaving either as it arrived says nobody considered
> it**, which is a worse claim than an empty table, and it is the one failure in this document a ČS reader
> spots immediately because they have seen the template before.
>
> **A section is never filled by invention.** If the run does not support it, say what is missing in the
> words of the work and stop, rather than writing something that will read as decided. Once stage 6 had a
> template, the defect it had carried for two runs — a document naming its subject
> thirteen times and never describing it — was gone in the first paragraph of the next one. **This paragraph
> is that template's discipline, written for the document ČS actually receives.**

> **You do not run the quality gate.** The ČS toolchain this is ported from has the authoring agent run
> its own validation. **That could not come across** — Blueprint criterion 9 requires a verifying step to
> name a different agent than the producing step. The checklist and the validator moved into the gate,
> which runs independently. See `.github/know-how/product/initiative-template.md` §4. You may trigger it
> with `SPOCK: check what is written, then continue`, and triggering it is not running it: you relay what
> it wrote.

## Never invented

| | |
|---|---|
| The Jira identifier | Asked for, every time. **Its `id_basis` is not asked: it is `jira`** |
| People fields | Explicit user input, or the repository defaults, or `-` |
| Any fact not in the PRD | Marked as an assumption, or left out |

## Gate

**Q7 runs seven checks and five of them read A14.** These are yours, with what each one matches:

| | What it reads on your output |
|---|---|
| **`C12`** | **traceability holds end to end**, from the initiative back through the PRD, the MVP, the solution, the synthesis and the opportunities to the intake record. Two arms, both required wherever their artifact exists |
| **`C13`** | **the PRD agreement block is non-empty and dated.** A12 is the draft and leaves the block empty; A13 is the agreed version and carries it. You author against the agreed one |
| **`C16`** | **A14 is complete on its own**, independently of whether the Jira item exists. The run completes on the initiative document. The Jira key is asked for and never invented, and `id_basis` says whether it was read from Jira or supplied for a fabricated run. **It also reads every section heading off the page**, against the names the envelope step writes, on each initiative that step has written |
| **`C111`** | **no internal identifier appears anywhere in the body**, in any language. No run id, no stage number, no gate name, no artifact code, no opportunity id. This document is read by people at the bank who have never heard of one, and the worst instance on record put an artifact code in a title line |
| **`C175`** | **the body says nothing to its reader about the run being a test, a fixture or not real**, in either language. `id_basis` records where the key came from; the body is read at the bank (step 1) |

`C57` is the sixth and reads the absence of A15: **a parked binding produced nothing and the run says so by
the artifact not being there.** You do not produce A15 and its absence is not your failure.

`C190` is the seventh and reads the supplied folders of stages 2 and 3: every file in them came in through intake,
unchanged. Only the person puts files there, so it asks nothing of your document.

**Plus the universal checks and the run-wide artifact checks.** `C111` is the one that catches people
here: **no internal identifier reaches the initiative's body.** Search for it rather than reading for it.

## Bounds

Max 3 refine cycles before escalating to the Product Manager. The template is otherwise the bound — it
fixes the section set and the frontmatter keys.

## Language

**The language `A1` declared** — `cs` or `en` — and free of implementation detail. Read it off the brief;
**never infer it from the material, from the topic, or from the language of the conversation** (Output
Voice §5).

**A language named on this page contradicts `output-voice` §5, which is declared as an
input to this same skill.** A producer whose contract carried both rules, with the gate enforcing only
one, wrote a whole initiative in Czech on a run declaring `en`, and `C122`
caught it: 626 Czech function words against 9 English. It was obeying its instructions.

**The workflow writes one set, never a mixture**: the Czech names in the template are the canonical set
and the English names their fixed translations, and which one a page carries is the language `A1` declared.
Field names, artifact ids, record values and enum values stay English on every run.

The reader is a non-technical stakeholder deciding whether this initiative proceeds.

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
