---
applyTo: "**/{1-brief,2-problems,3-competitive-analysis,4-solutions,5-mvp,6-prd,7-initiative}/**/*.md"
description: "The envelope every run artifact carries, and the storage rules. Read before writing any artifact."
---
# Artifact envelope

Every artifact is **markdown with YAML frontmatter**. The frontmatter is the artifact; the body is the
reasoning a reviewer reads. Both matter — a person judges at the decision gate, and a script judges at
the quality gate.

## Storage

```text
{runs_root}/{run_id}/1-brief/initiative-brief.md
              2-problems/1-problem-material.md
              2-problems/2-intake-record.md
              2-problems/3-problem-hypotheses.md
              2-problems/5-prioritised-opportunities.md
```

One directory per run, named by the run identifier. **Nothing is deleted** — superseded artifacts are
renamed `*.superseded-{n}.md` and stay in place (`C29`).

## The envelope is filled for you. There is nothing to run

**You write the body and the content fields a gate decides on. The rest of the front matter is computed
from the registers by `.github/scripts/envelope.mjs`, and getting it right is not your job.**

Each document starts as a frame that carries the envelope. `SPOCK: check what is written, then continue` reads the
rest as the workflow computes it from what you wrote, and the workflow writes the rest, with `status: accepted` and
the decision, when the person approves. **On a run started on 1.16.1 or later nothing you run writes into a document
you are writing**; on an earlier run the check task fills the envelope into the document before it checks. The
workflow never touches your body, with two exceptions: on the initiative and on the PRD it writes each section
heading in the language the run declared. It never touches the content fields, and writes a decision only once the person has taken it.

> **Typing the front matter by hand costs more than everything else on this page.** A producer that wrote a
> correct brief and read this file, `artifact-fields.yaml` and §6.0 before writing still failed four checks
> about its front matter, then spent eighty per cent of the session reading `check.mjs` twenty-five times to
> find out what they wanted. **Not one of those fields needed a language model to decide it.** They are in
> the contract, the registry and the field spec, so they are read from there.

**`artifact_id` is written into the frame, with every other field of the identity.**

| Filled for you | From |
|---|---|
| `run_id` `C6` | the run directory's own name, so it cannot disagree with where the file sits |
| `artifact_id` | **you write this one, and it is the only one.** See below |
| `produced_by` `C36` | the contract step that scheduled the work. **`agent` is the DESIGN agent**, never the substrate agent file, and `skill` is the binding |
| `workflow` `C22` | the workflow that owns the producing skill, from the registry; in free roam no task runs, so you write `free-roam` yourself |
| `ost_role` `C28` | the §6.1 register |
| `produced_at` · `assembled_at` | the frame, dated the day it is written; on a run started before 1.16.1, the clock |
| `assembled_from` | the records present, so a record cannot be dropped silently `C108` |
| `could_not_verify` | recomputed from the rules bound to your skill, by the function the check uses `C65` |
| `sources` · `external_sources` `C18` | `[]` unless you wrote them. **Write them when the artifact draws on something** |
| `status` | the workflow's: `produced` while the stage is written, `accepted` once approved; the run record holds every move between |
| `modified_by` | `agent`, or `human` where a person recorded an edit (below) |
| `revisions` | `0` unless you wrote a value. **Rework is counted by the workflow at its gates, not from this field**, so nothing asks you to keep it |

## What is still yours

- **`sources`** — the artifacts this derives from, where it derives from any
- **`external_sources`** — anything drawn from outside the run, tagged where it entered — `C18`. Each entry is the
  source's `ref` alone, exactly as its row in the run's `sources.md` begins: `external_sources: [S-airbank-predplatna,
  S-e15-airbank]`. What the source is and its address belong in that row — `C80`
- **`bounds_hit[]`** — any effort bound you reached. **The workflow cannot know this and will not invent it.** Silent truncation is what the bounds exist to prevent
- **`free_roam_derived`** — `true` on any artifact downstream of free-roam material — **`C23`**
  - **It is transitive.** An artifact built on an artifact built on free-roam output still carries it. C23 walks the whole lineage.
  - It fails both ways: a missing mark anywhere downstream, and a mark claimed with nothing free-roam behind it.
  - **Omit the field entirely** when nothing in the lineage is free-roam. Do not write `false`.
  - Adoption itself is recorded on the run, in `adoptions[]`, and it is a human decision — `C25`

**Where you write one of these, the workflow leaves it alone.** It fills a field that is absent and never
overwrites a value you supplied, so a bound you recorded survives.

**`modified_by: human` is not yours to write.** A person who changes a document by hand records it with `SPOCK: record that I edited a document`, which writes the account of what they changed, because only they can say what and why; the mark is written into the document when the stage is approved, and the checks read it from the account until then (on a run started before 1.16.1 the task writes the mark at once). A document that carries the mark keeps it when you write it again — `C17`

## Rules

- **A decision record carries `by_agent: false`.** An agent never records an approval, agreement or selection — `C14`
- **A `decision:` block is written when the decision has been taken, and omitted until then** — `C40`
  - Every artifact spends time in `produced` before its gate, and in that state there is no decision to record. **A block carrying only `gate: G1` is a decision record with nobody in it**, which reads as a decision far more than an absent block does
  - This was missing from all sixteen skills and from here, and cost the first quality-gate rejection this repository has ever recorded — stage 1 of `2026-04-card-disputes`, where the producer wrote the stub because it had been told to carry the record and never told when
- **A refinement round is a reviewer sending a *produced* artifact back.** `refinements[]` carries one entry per round at the gate and nothing else — `C40`
  - **Your own proposal is not a round.** Several skills propose first and record what the human chose; that whole exchange happens while the artifact is being authored, before anything reached a gate. An artifact written once, carrying a decision already taken, went through **no** rounds.
  - So the record is `changed_during_refinement: none` with `refinements: []`. **`none` is a statement, not an absence**, and the two agree in both directions: `none` if and only if the list is empty.
  - **Where your proposal differed from the decision, that belongs in the body**, in prose a reviewer reads, and in the record's `note`. It is worth keeping. It is not a refinement round.
  - **`revisions` is not how rounds are counted.** Rework is counted by the workflow at its gates, so `refinements[]` answers to the rounds a reviewer took and never to a revision count.
- **Every intake observation carries `origin_key`** — lower-case, hyphenated, stable within the run — and equality of that key is what decides whether two observations are one origin. Prose origins are for the reviewer; the key is for the arithmetic — `C37`
- **Every intake observation carries `proximity`** — `first_hand | relayed | aggregated | unestablished`, measured from the origin rather than from the route the material travelled. **`strong` needs two independent origins *and* one observation somebody actually witnessed** — `C39`
- **`bounds_hit[]`** records any effort bound reached. Silent truncation is what the bounds exist to prevent
- **A field the user did not supply goes in `unknowns[]`** with a reason. Never an empty value, never a guess
- **Amending a *bounding* field of the brief** — `outcome`, `market_scope`, `customer_segment`, `topic` — marks downstream artifacts `stale`. Context fields do not
- **Advancing past a stale input needs a recorded human acceptance**

## YAML the checker accepts

The reader in `scripts/check.mjs` is a deliberately small subset, and it **refuses** what it cannot
parse rather than guessing. Stay inside it:

- `key: value` · `key:` followed by an indented block · `- item` lists · `- key: value` lists of maps
- **Two-space indentation.** Quoted or bare scalars. `[]` for an empty list
- **No block scalars** (`>` or `|`), no anchors, no flow maps. **The registries and
  `.github/artifact-fields.yaml` carry them and are read by a different, tolerant reader
  (`registry-schema.mjs`), so a `|` seen in a skeleton there is the carrier's packaging and not a form a
  run file may use.** A producer that met the split only in a source comment
  copied the packaging into a record

If a run fails to parse, the checker exits without reporting gate results at all. That is deliberate: a
mis-parse that silently passes a gate is worse than a loud refusal.
