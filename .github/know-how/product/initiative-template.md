<!-- GENERATED from specifications/definitions/know-how/product/initiative-template.md. Do not edit this copy.
     Regenerate: node .github/scripts/know-how.mjs --write
     Know-how is read by skills, never written by them. It changes through a human-owned process,
     outside any run (PD90). -->

# Initiative Template

**Version:** 0.7 · **Date:** 16 September 2026 · **Status:** PoC draft — **ported, not authored**
**Owner:** Česká spořitelna · **Written by:** Igor Tadić · **Read by:** `initiative-authoring`
**Ported from:** ČS Analysis repository, `.github/templates/initiative-template.md`

> **This is ČS's own template, carried across rather than rewritten.** Their analysis repository already
> holds a working initiative toolchain — template, instruction file, completeness checklist and a
> deterministic validator. Authoring a second one would have produced something their engineers
> recognise less, for no gain.
>
> What changed in the port is stated in §5. **One thing in their pattern could not come across**, and
> that is §4.

---

## 1. The artifact

An initiative is a **business document for a non-technical stakeholder**, written in **the language the run declared** (`A1.language`, `cs` or `en`), carrying
measurable value and explicit scope boundaries. It is the run's final artifact and the run completes on
it — propagation to Jira is separate and may fail without failing the run.

**Rules**
- **Written in the run's declared language**, `cs` or `en`, read off `A1` and never inferred from the material or the topic (Output Voice §5). A body naming one language beside `output-voice` §5 has a producer reading both write a Czech initiative on a run declaring English. Free of implementation detail either way.
- **Section headings are fixed, and the workflow writes them.** They come from the template and are never renamed, reordered or dropped. The workflow writes every section heading in the language the run declared, so a producer names each section and never chooses its wording.
- Every factual statement comes from the agreed PRD. **Assumptions are marked as assumptions.**
- Unknown optional metadata is `-`, never omitted and never invented.
- **The Jira identifier is mandatory and is always asked for.** It is never invented, never auto-generated, and never derived from the slug.

---

## 2. Frontmatter

Fourteen keys, in this order. Values in angle brackets are chosen from the stated set.

- **`jiraLink`** — `[<ID>](https://csas.atlassian.net/browse/<ID>)`. **The host is an open question — see §5**
- **`id`** — the Jira identifier. **Must match the one in `jiraLink`.** Never left as `-`
- **`id_basis`** — `jira` · `fixture` · `none_yet`. Where the identifier came from — see the rule below; `none_yet` where `SPOCK: record the Jira key` recorded that the initiative has no key yet, and `id` and `jiraLink` then read none yet
- **`status`** — `New` · `In Planning` · `Execution` · `Done` · `On Hold`
- **`priority`** — `Highest` · `High` · `Medium` · `Low` · `Lowest`
- **`project`** · **`labels`** · **`assignee`** · **`owner`** · **`reporter`** — `-` where unknown
- **`created`** · **`updated`** — `YYYY-MM-DD`
- **`dueDate`** · **`parentLink`** — `-` where unknown

**Rules**
- **People fields are never invented.** They come from explicit user input, or from the repository's own defaults file where one exists. Otherwise `-`.
- **The Jira ID stays in metadata and links only.** It is never encoded into the slug, the folder name or the filename — so a renamed ticket does not orphan a document.
- **`id_basis` is `jira` and is not asked for.** **Every run is
  real.** A person asked whether their own run is a test is being asked to classify their work, and
  the answer was the same every time it mattered. `fixture` remains legal and is what the committed runs
  carry, because they were fixtures and the record says what happened. **A new run does not choose.**
  The Jira key itself is still asked for, every time, because only a person holds it.
- **[SUPERSEDED]** `id_basis` says where the identifier came from, and it is mandatory. `jira` when the key was read from a Jira instance. `fixture` when a person supplied one for a run whose material is fabricated. **Both are legitimate and neither is invented by you** — §1's rule is that you ask for the key, and a key a person hands you satisfies it however they got it.
- **`fixture` is refused on a run that DECLARES its material real.** `C16` reads the run's own declaration of what it is made of. Where that says `real`, a fixture key is refused, because a fabricated ticket number on a real deliverable is the thing this stops. **Where the run declares nothing, the question is recorded as undecided and the stage is not blocked** — an undeclared run has not been shown to be either.

  > **The answer comes from what the run declares itself to be made of, not from its research regime.**
  > `C16` reads the declaration, because a regime that **permits** real material
  > does not say a run **has** any — and one run had invented problem material with genuine competitor
  > research, so the regime said real and the run was not. **A run is not one thing.**
  >
  > The superseded sentence is described here and deliberately not reproduced: a changelog that quotes an
  > old rule word for word is, to every reader who searches, the old rule still being stated.
  >
  > The check was corrected and this body was not, so the producer read the rule here, told the person the
  > final stage was blocked until a real Jira issue was raised, and stopped. It was not blocked and never
  > had been. **A producer reads know-how and acts; the checker only judges afterwards, so a rule corrected
  > in one and left standing in the other is worse than not corrected at all** — the two now disagree and
  > the agent obeys the stale one.
- **If you have no key, stop and ask.** Do not write `-`, do not guess a project prefix, and do not proceed to `id_basis` as though the question were answered. `C16` fails an absent identifier and the stage returns to you.

---

## 3. Sections

Fixed, in this order. **The canonical set is ČS's own, written exactly as §3.1a gives it, and it is not ours
to translate or tidy.** Several of its names are English loanwords — `Insight`, `Outcome` — and that is how
Česká spořitelna writes them, so a document reproducing them is following the template rather than mixing
two languages. **The skeleton below names each section by its id**, because the envelope step writes the
heading itself: nothing in it is a heading in one language to copy.

> **An English run uses the English set in §3.1a, and a Czech run uses the Czech set beside it.** The two
> say the same thing, each in its own language.
>
> **An instruction to reproduce the Czech headings verbatim is the only thing that produces Czech headings on
> an English run.** `SECTION_EN` in
> `doc-structure.mjs` already carried an English name for every heading, and from 14 September 2026 those
> names are the table in `gates.mjs`.
>
> **From 14 September 2026 the envelope step writes the headings and `C16` reads them off the page.** An
> instruction alone is not a mechanism: a run that declared English delivered eleven Czech headings copied
> from a skeleton, and every check passed it.

```text
# [<ID>] - <name of the initiative>
                                the title with a Jira key. Where the run record reads
                                none yet, it is the name alone, with no brackets and
                                no dash: # <name of the initiative>

## <insight>                    what we learned — the problem, need or untapped
                                opportunity, and where it came from. Data, feedback,
                                research, NPS, support. Qualitative and quantitative

## <byznys_cil>                 how this contributes to the bank's objectives, naming
                                the Key Result, and when the initiative is finished

## <outcome>                    the change in customer BEHAVIOUR. Never the solution

## <metriky_uspechu>
    ### <metriky_behavioralni>  what the customer starts doing differently, and how it
                                is counted
    ### <metriky_byznysove>     what the bank gets, and how the behaviour turns into it
    ### <metriky_vnimani>       how it feels to the customer — satisfaction, trust, NPS
      — each present, or explicit about what the run could not supply

## <rozsah_iniciativy>
    ### <in_scope>              at least one bullet
    ### <out_of_scope>          at least one bullet — the boundary is explicit

## <akceptacni_kriteria>        at least one bullet

## <zavislosti>                 a table; never left as the untouched placeholder

## <rizika_a_mitigace>          a table; never left as the untouched placeholder

## <otevrene_otazky>            at least one bullet, or an explicit "-"

## <odkazy>                     source documentation and related epics, as Markdown links
```

**`rozsah_iniciativy` → `in_scope` is where a reader learns what is being built, and it is the only place.**
`outcome` is behaviour and the template says *never the solution*, so the description cannot go there — the
shape is ČS's and is not ours to change. What that leaves is `in_scope`, and on one run it carried
bullets naming a solution whose name appeared once in the whole document, in the title. **Write `in_scope`
so somebody who has not read the PRD knows what the bank is building.** Plain words, from `A9`, not a summary
of the requirements.

### 3.1a What the envelope step writes

**You do not choose between these columns.** Write each section under a heading naming its id or either of its
names, in the order above. The workflow writes every section heading in the language the run declared, reading it
off `A1`, and writes the whole heading line: `## ` or `### ` and the name in that column. The frame carries each heading, and one you write by its id or its other name is written as the template's when
the person approves, which the checks read until then; on a run started before 1.16.1 `SPOCK: check what is
written, then continue` writes it.
**A heading it cannot place is refused and nothing is written**: one that names no section, a section written
twice, out of order or at the wrong level, or a section missing. The refusal names the line, the heading as you
wrote it, and all fifteen headings in order. **A heading deeper than a section**, a level 3 under a section that
is not a container or anything below that, **is yours** and is left as you wrote it. `C16` reads the headings off
the page of every initiative the step has written.

**A heading is placed by its folded form**, ignoring case, diacritics and punctuation: the id, the Czech name,
the English name, or an older wording in the last column. Nothing else is recognised, and no two sections share a
form, so a near-miss wording is refused rather than taken for the nearest section.

**The English column is title case.** Seven of the names were sentence case beside
four that were not, which put both conventions on one page. Short function words stay lowercase, which is
why it is `Out of Scope` and `Risks and Mitigations`.

| `id` | Level | Czech (`language: cs`) | English (`language: en`) | Also recognised |
|---|---|---|---|---|
| `insight` | 2 | Insight | Insight | |
| `byznys_cil` | 2 | Byznys cíl | Business Goal | Business objective |
| `outcome` | 2 | Outcome | Outcome | |
| `metriky_uspechu`, a container | 2 | Metriky úspěchu | Success Metrics | Success metrics |
| `metriky_behavioralni` | 3 | Behaviorální | Behavioural | |
| `metriky_byznysove` | 3 | Byznysové | Business | |
| `metriky_vnimani` | 3 | Vnímání klientem | Customer Perception | Client perception |
| `rozsah_iniciativy`, a container | 2 | Rozsah iniciativy | Initiative Scope | |
| `in_scope` | 3 | In Scope | In Scope | In scope |
| `out_of_scope` | 3 | Out of Scope | Out of Scope | Out of scope |
| `akceptacni_kriteria` | 2 | High-Level akceptační kritéria | High-Level Acceptance Criteria | High-level acceptance criteria |
| `zavislosti` | 2 | Závislosti | Dependencies | |
| `rizika_a_mitigace` | 2 | Rizika a mitigace | Risks and Mitigations | Risks and mitigations |
| `otevrene_otazky` | 2 | Otevřené otázky | Open Questions | Open questions |
| `odkazy` | 2 | Odkazy | Links | References |

**Four names are identical in both columns** — `Insight`, `Outcome`, `In Scope` and `Out of Scope` — because
ČS's own set already uses them. **The set was never all Czech**, which is why translating it was a smaller
act than it first looked and why the English column is a transfer rather than an invention.

**The two containers carry subsections** and are not declared in `A14.sections[]`; the section ids in §3.1
do not change with language. **The Czech names carry their diacritics**, as `gates.mjs` writes them.

**The English column is the pilot owner's own**, taken from fourteen headings written by hand on an English
initiative. It is not our translation of a customer's document, which is the act the paragraph above was
written to prevent.

### 3.1 The section ids you declare, which are not the headings

**`A14.sections[]` carries an `id` and a `status`, and the ids are the first column of §3.1a.** Two of those
rows hold subsections and are not declared at all. **Declare exactly these thirteen, each with
`status: addressed`:** `insight`, `byznys_cil`, `outcome`, `metriky_behavioralni`, `metriky_byznysove`,
`metriky_vnimani`, `in_scope`, `out_of_scope`, `akceptacni_kriteria`, `zavislosti`, `rizika_a_mitigace`,
`otevrene_otazky`, `odkazy`.

**`metriky_uspechu` and `rozsah_iniciativy` are containers and are not declared.** Neither carries content
of its own, so `C16` does not ask for them and refuses them as sections the template does not have. Both
headings still belong in the document, and the reviewer's diff expects them.

> **ČS's Product Management Guild template is authoritative (§7)**, and an initiative authored against an
> older set of ids, such as `kontext_a_byznys_hodnota` and `cile_business_value`, **is not repaired by adding
> rows** — the value
> narrative is differently divided, so it is re-authored rather than patched.

**The field is `status`, not `addressed`.** `C16` reads `status: addressed` and treats anything else,
including `addressed: true`, as a section not addressed.

> **These ids are published here because `.github/scripts/gates.mjs` is a build script no
> producer reads.** An agent that inferred ids from the headings — the
> one thing the script's own comment says cannot be done — had `C16` refuse three as missing, six as
> unaddressed and two as unknown. `gates.mjs` remains the single source and this table is generated understanding of it,
> so if the two ever disagree, `gates.mjs` governs and this section is the defect.

**Rules**
- **A placeholder left untouched is a finding**, not an empty section. `zavislosti` and `rizika_a_mitigace` ship as example rows; shipping them unchanged means nobody considered either.
- **`out_of_scope` is not optional.** An initiative that says only what it includes has not been scoped.
- **`outcome` never describes the solution.** How the change is delivered belongs in `rozsah_iniciativy`. An outcome that names a screen, a flow or a system has become a solution wearing an outcome's heading.
- **`byznys_cil` names a Key Result or says it was not supplied.** It is never inferred, and a run whose brief marked `goals` unknown says so here rather than reaching for a plausible objective.
- **All three metrics appear.** A kind the run could not supply is stated as not supplied, with what is missing. **Silence and nothing-to-report are indistinguishable to a reader and only one of them is a claim somebody made.**
- **Declare all thirteen section ids from §3.1 with `status: addressed`.** The two containers are not among them.
- Links are Markdown, and relative paths are stable.

---

## 3b. Worked example — what the bank actually opens

**This is the document ČS receives.** The first version below is written to the standard rather than lifted,
because it is the shape the defect took on two earlier runs: the initiative named the solution it was
proposing and never described it, exactly as the PRD did one stage earlier.

**What usually gets written**

> **What we propose.** The proactive re-verification countdown, as expanded at stage 5 and agreed in the
> requirements document.

**Write it like this**

> **What we want to do.** Show a client a countdown in the app while their check is due: a notice when it
> opens, a second saying what will stop working and when, and a third giving the date. **They see the date
> and the consequence before either arrives.**
>
> **Why this and not something else.** Three banks here each solved one piece — warning early, keeping some
> things working, giving a deadline — **and none of them put the pieces together.** We are combining warning
> early with giving a deadline.
>
> **What we are not claiming.** Nothing here is measured. The completion figures come from an operations
> note with no author on it, and nobody could tell us how many clients come up for a check each quarter.
> **Nine problems, from six pieces of material, two of them from a single person.**

**The difference:** a reader at the bank can act on the second and cannot on the first. **The last paragraph
is the one to write first.** A bank that receives a confident document with no honesty section has no way to
tell what it can lean on, and everything in it then has to be taken on trust or checked from scratch.

## 4. What could not be ported — and why it matters

The ČS pattern pairs **every authoring skill with a validate skill**, and requires the agent to run the
validation *"immediately after each authoring pass before returning `success`."*

**The shape is right and we take it. The wiring is not, and we do not.**

Blueprint conformance criterion 9: *"A verifying step names a different agent than the producing step."*
And §5.3: verification is *"performed by a defined component that is independent of the producer."* In
their repository the same agent authors and validates — a different prompt, the same actor. **That is
self-assessment with a second opinion from itself.**

**So the checklist and the deterministic validator come across; the self-invocation does not.** Both move
into the automated gate, which runs independently of the agent that wrote the artifact. The authoring
skill writes and stops.

**This is not a criticism of their design being sloppy.** It is stricter here because the Blueprint we are
building to makes independence a mechanism rather than a habit — and because an agent that can decide it
has finished is an agent that will.

---

## 5. Changed in the port

| | Their version | Here | Why |
|---|---|---|---|
| Validation | The authoring agent runs it | The automated gate runs it | Criterion 9 — a verifier must not be the producer |
| Source of content | `source-documentation/` | The **agreed PRD** (A13) | Our workflow produces its own upstream |
| Jira host | `csas.atlassian.net` | **Unresolved** — see below | Their instruction file says one host; a real artifact in the other extract uses `jira.csin.cz` |
| Epics | Initiative decomposes into epics | **Out of scope** | The pilot definition removed the epic and user-story extension |

**The Jira host is an open decision (D11), and it now blocks more than propagation.** Under a
deny-by-default egress rule the propagation binding cannot declare an allow list until the host is named,
so **it cannot run at all** rather than merely failing. Ask the developer; do not infer from either
extract.

---

## 7. Two templates, and which one won

**ČS has two templates for one Jira object.** The Product Management Guild publishes one; the analysis
repository this document was ported from carries another. They are not variants — they describe the same
issue with different sections.

**The stakeholder made the Guild's authoritative.** Where the two disagree, the Guild wins.
**Where the Guild is silent, the ported sections stand**, because a template having no opinion about
dependencies is not the same as a template excluding them.

| Guild section | What it asks | Replaced |
|---|---|---|
| **Insight** | What we learned — the problem, need or untapped opportunity, from data, feedback, research, NPS or support | `Kontext a byznys hodnota` |
| **Byznys cíl** | How this contributes to the bank's objectives, naming the Key Result, and when it is finished | `Kontext a byznys hodnota`, `Cíle / Business Value` |
| **Outcome** | The change in customer behaviour. **Never the solution** | — new. Neither replaced section asked for this |
| **Metriky úspěchu** | Success stated three ways | `Cíle / Business Value` |

**Retained because the Guild is silent:** `Rozsah iniciativy` with its two scope subsections,
`High-Level akceptační kritéria`, `Závislosti`, `Rizika a mitigace`, `Otevřené otázky`, `Odkazy`.

**Thirteen checked sections, up from nine.** C16 reads the register in `gates.mjs` and the reviewer's diff
reads the headings, so both moved together.

### 7.1 The three kinds of success metric

**This is the part that does the most work, and neither replaced section had a shape for it.** A change
can move one of these and not the others, which is exactly what the split exposes.

| Kind | The question | The failure it exposes |
|---|---|---|
| **Behavioural** | What does the customer start doing differently, and how is it counted — conversion, frequency, completion, adoption, fewer errors? | An initiative that shipped and changed nobody's behaviour |
| **Business** | What does the bank get — revenue, retention, cost, penetration, speed — and how does the behaviour turn into it? | A behaviour change nobody can price |
| **Perception** | How does it feel to the customer — satisfaction, trust, NPS? | A change that works and annoys people |

**State all three or say which the run could not, and why.** A run supplying only the business metric is
describing a hope; a run supplying only the behavioural one has not said what it buys.

**Do not invent them.** Every one comes from the agreed PRD's success measures, which since PRD Template
v0.3 carry a horizon, an owner and a kill criterion. **An initiative metric with no counterpart in the PRD
is a fact appearing at stage 7 that appears nowhere upstream**, which §1 already forbids.

### 7.2 What the change cost, and what it did not

**One run artifact was rewritten.** Run `2026-01`'s initiative was authored against the old nine sections
and now carries the thirteen. **Its gaps were kept rather than filled**: the run's brief marked `goals`
unknown, so `Byznys cíl` says the strategy link was not supplied instead of naming a plausible Key Result,
and the perception metric says the run did not gather one. **A migration that had quietly completed those
would have made the fixture claim more than the run ever produced.**

**Nothing else moved.** The frontmatter, the language rule, the Jira identifier discipline and the
authoring-does-not-validate separation in §4 are untouched by this.

