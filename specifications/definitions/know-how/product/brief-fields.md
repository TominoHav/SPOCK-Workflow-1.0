# Brief Fields

**Version:** 0.7 · **Date:** 22 September 2026 · **Status:** For review
<!-- history -->
**v0.7 says what SPOCK 1.3 changed**, from 22 September 2026: an initiative that serves Love Brand still carries a whole goal, with `key_result` recorded as `unavailable` and the reason in `strategy_basis`.
**v0.6 says what SPOCK 1.2 changed**, from 21 September 2026: §4 no longer tells a later stage to fill an open field as a marked edit; the brief is sent back, and a person's own change is recorded by its task.
**v0.5 says what SPOCK 1.2 changed**, from 21 September 2026: the product goal is the North Star, one level asked once, and the run's language covers the conversation as well as the documents.
**Parent contract:** [PILOT-BUSINESS-LOGIC.md](../../../PILOT-BUSINESS-LOGIC.md) v1.15 · **Backlog:** PT-N1
**v0.3 rewrites `market_scope` from a border into a topic.** The geography belongs to the Competitive
Analysis Standards search order, not to this field: a scope naming one country decides the depth of the
whole market stage in a sentence nobody reviews, which is what happened on the investor run.
**v0.2** restructures `goals[]` into a product goal, its metric, the key result it feeds and the written
link between them, on ČS's rule that a product's own measure is never the company measure. C77 enforces it.
<!-- /history -->
**Owner:** Česká spořitelna · **Written by:** Igor Tadić · **Read by:** `brief-creation`

> **What this is.** The body of know-how read by `brief-creation` (1.1). It defines the fields an
> initiative brief must carry, what each one is for, where each is normally sourced, and what it means
> to mark one unknown.
>
> **What this is not.** Not the artifact definition — the brief's shape as an artifact is A1 (PT-A01),
> and not the skill — that is PT-K01. This document holds only what *good* means for the field set.

---

## 1. Why the field set is the substance

Everything downstream inherits the brief's quality. Three stages later a guessed number is
indistinguishable from a sourced one, and by then it has been scored, prioritised and written into a
PRD. The brief is the only point in the run where the cost of getting a field wrong is still one
question.

Most incomplete briefs are incomplete because someone did not know where the number lived, not because
they were unwilling to supply it. So the field set carries a second column that matters as much as the
first: **where this is normally sourced**. The agent's job at stage 1 is to ask for what is missing and
say where it usually lives — never to supply it.

**Rules**
- **No field is inferred.** A field the user did not supply is marked `unknown`, never filled from context, from the topic, or from a plausible default.
- **Sourcing guidance is help, not authority.** The agent may say where a field normally lives. It may not read that location and fill the field on the user's behalf.
- **Marking a field unknown is a legitimate outcome**, not a failure. It is visible for the rest of the run and it is what the human gate at G1 weighs.
- **Every field is required or optional; none is obligatory.** The mechanical check C10 asks only that required fields are present or marked unknown. Whether the brief is complete *enough* is G1's judgement, and it is a human's to make.

---

## 2. The field set

Four groups. Identity is assigned or captured, framing carries what the run is about, bounding tells
later stages where to stop, and context is what a reviewer needs to weigh the brief.

`R` required — must appear, with a value or marked `unknown` · `O` optional — included when known ·
`[derived]` computed by the system, never author-supplied

### 2.1 Identity

- **`run_id`** `[derived]` — assigned by `brief-creation`, authoritative for the run, never reassigned. Not elicited.
- **`language`** `R` — `cs | en`. **The language every document this run produces is written in, and the
  language every agent speaks in**, assigned here and never reassigned. **Ask it first**, as a closed choice
  between Czech and English that says the documents and the conversation both follow it: it is one word, the
  person always knows the answer, and every later stage writes and speaks in it.
  - **It is the one required field with a default, and the default is `cs`.** Where the person does not
    say, write `cs` and tell them you did. **The checks read English only on a brief that carries no
    `language` at all**, a run from before the field existed; stage 1 always writes one, so the two are one
    rule. **A declared default is not an inferred value** — the whole
    point of §4 is that nothing is guessed silently, and this is the opposite: the value is stated, the
    reason is stated, and the person can change it in the same breath.
  - **It never goes in `unknowns[]`.** A run with no language cannot be produced at all, so *unknown* is
    not a state it has. Every other required field can be missing and marked; this one resolves.
  - **The documents and the conversation follow it.** Field names, ids and record values stay English, which
    is what lets a Czech run and an English run be checked by the same gates.
- **`title`** `R` — a short name for the initiative, used in every later artifact's header
- **`product_manager`** `R` — the named person accountable for the run (RP4). A role name is not sufficient
  - **The run record's `person`, its name and role**, recorded when the person started the run with
    `SPOCK: start a run`. **Asked, by name and role, in the opening exchange only where the record carries
    no `person`.** A required field no step of the elicitation fills can be filled
    only by an agent supplying a value nobody gave it or by the brief failing its own gate. **That is the
    no-inference rule breaking at the one field that says who is answerable**, and the check that reads
    the field cannot see whether an answer was given or invented
- **`product_owner`** — **the same field under its old name, and written by no producer from 27 August
  2026.** It is declared here because nine committed briefs carry it and **a field nothing declares is a
  field nothing can check** (`C42`), which is the treatment §6.7 gives `origin_key` and §6.13 gives the
  PRD's retired `statement`. `C10` reads the new name and accepts the old one on a brief produced before
  the change, in `C97`'s direction: absent means the run predates the rename and passes
- **`created_at`** `[derived]`

### 2.2 Framing — what the run is about

- **`topic`** `R` — **the problem or idea space this run explores.** Ask for it in those words
  - **The key does not move and that is deliberate.** `topic` is written into every committed brief, read
    by the run-identifier derivation and by the market scope, and renaming it would rewrite finished runs
    for a change nobody using the workflow would see. **What was wrong was the question**: *the product or
    subject area* invites a product name, and a run that begins with a product has already chosen its
    solution
- **`outcome`** `R` — the change this initiative is meant to produce, stated as a change in the world rather than a thing to build
  - This is the root of the run's Opportunity Solution Tree (§3.4 of the parent). Every problem, idea and MVP option ultimately hangs from it
  - An outcome phrased as a solution ("build a mortgage calculator") is the single most common defect in a brief, and it pre-empts three stages of work. The agent restates it as an outcome and asks the user to confirm the restatement
- **`goals[]`** `1..n` `R` — the **product goals** this run serves. Not the bank's key results, and this
  is the field's whole difficulty
  - **ČS's rule: a product's own measure can never be a company key result or KPI** (Strategy Basis §3).
    The hierarchy is company key result, then product goal one level down that the team can actually
    influence, then the product-level measure that tracks it
  - **The product goal is the product's North Star: one level, not two, and asked once.** The levels, top
    down, are the company key result, the product goal, which is the product's North Star, and the metric that
    tracks it (Strategy Basis §3). Write it as `product_goal`. Older briefs carry `north_star` as a separate level above the
    product goal; the product goal is now the North Star, one level, and C77 accepts either field, or both, so
    those runs still read (**C77**)
  - Four parts per entry, and they stand or fall together (**C77**):

    | Part | What it is | The failure it prevents |
    |---|---|---|
    | **`product_goal`** (or **`north_star`**) | The product goal, which is the product's North Star: what this run is accountable for | A run accountable for a number it cannot move |
    | **`metric`** | The product-level measure that tracks it | A goal nobody can tell they reached |
    | **`key_result`** | The identifier from Strategy Basis §2 this goal feeds | A goal aligned to nothing |
    | **`link`** | How progress on the goal moves that key result, written out | An alignment claim with no mechanism, which stage 4 cannot band |

  - **The agent never writes the link on the user's behalf.** It is the one field where a plausible
    sentence is indistinguishable from a real mechanism, and stage 4's strategic alignment rests on it. If the user cannot state it, the goal is incomplete and `goals` is marked unknown
  - **An initiative that serves Love Brand still carries a whole goal.** Love Brand is a pillar with no
    objective and no key results (Strategy Basis §2.1), so the product goal, the metric and the link are asked
    as usual, `key_result` is `unavailable`, and the brief's `strategy_basis`, at the top level of its record and
    not inside the goal, where C77 reads it, says why: *Love Brand carries no key results by design (Strategy
    Basis §2.1)*. That is a recorded fact, not an unknown, and C77 accepts it
  - **Marking `goals` unknown is legitimate and common.** All three committed runs do it, each with a
    reason. What is not legitimate is a goal that is present and partial
- **`success_signal`** `O` — how the team would know the outcome had happened. Free text
- **`qualitative_signal`** `O` — what a customer would say differently, or what a colleague would stop
  hearing. **The one measure of the four an opportunity carries that nothing else in the brief supplies**:
  the behavioural measure comes from `success_signal`, the business one from `goals[].metric`, the horizon
  from `time_horizon`, and this one from nowhere until it was asked for. Free text, and marking it unknown
  is the ordinary outcome
- **`time_horizon`** `O` — when the outcome is expected to be observable

### 2.3 Bounding — where later stages stop

These exist because two stages run wide by default. Without them, the market stage searches an
unbounded field and ideation generates against an unbounded population.

- **`customer_segment`** `R` — who the outcome is for. Read by ideation and by the PRD
- **`market_scope`** `R` — **the problem topic the market is searched against**, and the segment it belongs to
  - Read by `landscape-mapping` (3.1), which has **no human decision gate behind it**. Nothing downstream can widen it and nobody reviews it before the map is drawn
  - **It is not a border, and writing it as one is the failure this field has already had.** The geography is not yours to set: the Competitive Analysis Standards §2.2a search banking before fintech and then outward — local, CEE, European, global where something is genuinely relevant — until ten participants are profiled. **A scope naming one country has pre-empted that and decided the depth of stage 3 in a sentence.**
  - **Excluding a sector needs a reason a reader can disagree with.** *Adjacent fintech excluded* is not one; *the segment cannot legally hold a non-bank product* is

  > **Both failure directions are real.** An **unbounded** scope is not caught by a person later, and
  > **neither is an over-narrow one**: one run's read *Czech Republic; retail banking; savings-to-investment products
  > segment; adjacent fintech investment platforms excluded* — one ring, fintech struck out — and produced
  > five participants named and three profiled. The agent proposed it and a person confirmed it without
  > amendment. **An over-narrow scope is invisible in exactly the same way, and it is the cheaper mistake
  > to make.**
- **`known_constraints`** `O` — regulatory, technical, commercial or timing bounds already known at the start
  - Not a substitute for the Banking Constraints know-how. This field carries what is specific to *this* initiative; the standing bounds live in the know-how

### 2.4 Context

- **`background`** `O` — why this is being explored now. Free text
- **`related_runs[]`** `0..n` `O` — earlier runs on the same topic. Their parked problems are the cheapest input this run will have

---

## 3. Where each field is normally sourced

The agent states these when a field is missing. They are **generic sourcing guidance** — the kind of
place a field usually lives — and they are deliberately not ČS-specific.

**Anything ČS-specific must be confirmed before it is written into this table.** Naming a system of
record we have not seen would be the same error this project has already made once: writing a canon
while claiming to cite it. The right-hand column below is the honest state.

| Field | Normally sourced from | ČS specific |
|---|---|---|
| `product_manager` | The run record's `person`, its name and role, recorded when they started the run; asked by name and role in the opening exchange only where the record carries none | — |
| `topic` | The requester, asked as *the problem or idea space* | — |
| `outcome` | The requester, restated by the agent and confirmed | — |
| `goals[]` | The run's own product goal, stated by the requester. The **key result** it links to comes from the Strategy Basis §2 | **Settled** — the basis is the 25 key results |
| `success_signal` | The OKR record, or the requester | **Confirm** |
| `customer_segment` | The team's segmentation model | **Confirm** |
| `market_scope` | The requester, bounded by the segment | — |
| `known_constraints` | Compliance or risk contact for the area | **Confirm who** |
| `related_runs[]` | The repository — earlier runs are files in it | — |

**One of these is settled.** The strategy basis is the twenty-five key results in
[strategy-basis.md](./strategy-basis.md) §2, and the four vision metrics and seven KPIs are deliberately
outside it. The remaining three confirmations are unaffected.

**And the sourcing guidance for `goals[]` follows it.** The agent points at the Strategy Basis for the key result and asks the user for the product goal, the
metric and the link. **The key result is lookup, the other three are elicitation**, and the agent supplies
neither.

---

## 4. Marking a field unknown

An `unknown` mark is a small structured record, not an empty string. It is what G1 reads.

- **`field`** — which one
- **`reason`** — one of `not_known` · `not_yet_available` · `not_applicable` · `declined`
- **`note`** `O` — free text, one line

**Rules**
- The agent proposes the reason from the conversation; the user confirms it. A reason is never assumed from silence.
- `not_applicable` is the only reason that closes a field. The other three leave it open, and it can be filled later by sending the brief back. A person's own change is then recorded with `SPOCK: record that I edited a document`, because an accepted brief stays as it was approved (C17).
- An unknown field never blocks the quality gate. It is weighed at G1 by a person, and the parent's failure-mode table already states what a thin brief costs.

---

<!-- history -->
## 5. Coverage bar

The parent's rule is that a body of know-how is **available** only when it covers what reads it. Its
only reader is `brief-creation`.

This body is available when, for any brief, the skill can answer all four:

- Which fields must appear — §2
- What each field is for, and what a well-formed value looks like — §2
- Where a missing field is normally sourced — §3
- What to record when the user cannot supply one — §4

**Assessment: met.** §2 answers what a goal is and what makes one whole, §3 says which part is looked up
and which is elicited, and §4 says what to record when the user cannot supply it.

**Three sourcing entries still need ČS confirmation** and none of them blocks: the skill says "the team's
segmentation model" rather than naming a system. **The `goals[]` entry is no longer among them** — the
Strategy Basis is the record, and it is on disk.

---

<!-- /history -->
## 6. Open

| # | Question | Effect |
|---|---|---|
| **N1-b** | The three remaining ČS-specific sourcing entries in §3 — `success_signal`, `customer_segment`, `known_constraints`. **`goals[]` is settled by the Strategy Basis** | Weaker elicitation help. Does not block |
| **N1-e** | **What `brief-creation` does when the user names a key result that is not in the Strategy Basis §2.** C77 refuses it and the skill should say so during elicitation rather than at the gate. **Recommendation: the agent reads the basis and offers the nearest identifiers, and never picks one** | A brief reaches G1 with a goal that cannot be banded |
| **N1-c** | Whether any field should hard-fail the quality gate rather than be markable unknown. **Recommendation: no.** Adding one would extend C10, which is a parent-contract check — the parent deliberately puts sufficiency in a human's hands at G1 | Changing this requires changing C10 first |
| **N1-d** | The elicitation bound — the maximum number of turns `brief-creation` spends before handing back what it has with the gaps named | Belongs to PT-K01 and PT-X6, not here |
