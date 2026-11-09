# Evidence Standards

**Version:** 0.8 · **Date:** 29 September 2026 · **Status:** For review
<!-- history -->
**v0.8 lets a period the person confirms date material that arrived anonymised** (§3.2). Anonymisation strips the
dates, so on 24 September every observation of two runs was incomplete and every hypothesis `weak`, whatever the
research held. The person who supplied the material says which year, quarter or month each file comes from, and
nothing counts as dated until they have.
**v0.7 closes the reading that collapsed §5.3's third row into its second**, found by re-measuring: reject
means the need has no observation at all, never that the need is already stated. What still varies is named
in §5.3 rather than left for the next measurement to rediscover.
**v0.6 adds §5.3 — the third outcome for a solution-shaped candidate whose need a hypothesis already states.**
Measured rather than supposed: three trials of one held-out input took both of the two outcomes the rule
allowed, and that was the only judgement that moved. The test is the reference set rather than the wording.
**v0.5 adds §5.2 — what a hypothesis carries besides its tag.** A required `disconfirming` line naming what
would contradict it, `themes[]`, and `kind: true | barrier`. The trust tag says how much the evidence is
worth and never what would change the answer, and a run that promotes only barrier problems removes
friction from something nobody cared about.
**Parent contract:** [PILOT-BUSINESS-LOGIC.md](../../../PILOT-BUSINESS-LOGIC.md) v1.3 · **Backlog:** PT-N2
<!-- /history -->
**Owner:** Česká spořitelna · **Written by:** Igor Tadić · **Read by:** `material-intake` · `hypothesis-authoring` · `brief-creation` · `methodology-guidance`

> **What this is.** The body of know-how read by `hypothesis-authoring` (2.2). It defines what makes two
> pieces of evidence *independent*, what makes provenance *complete*, what *thin* means, and the
> thresholds that separate `strong` from `weak` from `unrated`.
>
> **What this is not.** Not the artifact definition — the hypothesis set's shape is A3 (PT-A03) — and
> not the skill, which is PT-K03. This document holds only what *good* means for evidence.

---

## 1. Why this body blocks

The parent declares the trust tag **derived and non-negotiable**: computed from the evidence, never
asserted by an agent, and not something a user can argue up. That guarantee has no content until
*independent*, *complete* and *thin* are defined somewhere, and they are defined nowhere else. Without
this document stage 2 still produces hypotheses — it simply cannot tag them consistently, and the
evidence discipline the whole workflow rests on becomes nominal.

Consistency is the point. Two teams tagging the same material must reach the same tag, or S3
(standardization) fails at the first stage that has any content to standardize.

**Rules**
- The tag is **computed from the reference set**, never written by an agent and never negotiated with a user.
- The tag **labels, it does not filter**. A `weak` or `unrated` hypothesis is kept, prioritised on its merits, and visible. Nothing is dropped for its tag.
- Evidence resolves **only into the problem material** the user supplied (C2), which no agent produced (C34), and it reaches that material **through the intake record** — the quarantine boundary the parent added at v1.3, checked by C35. This body does not re-police those boundaries; it assumes them.
- Where a rule below needs judgement, **the judgement happens before the tag, not inside it.** See §6.

---

## 2. What counts as evidence

A reference is evidence for a hypothesis when it points at material that **reports something observed**,
and the observation is distinct from the hypothesis statement itself.

The distinction matters because problem material is obligatory, and one of its permitted forms is text
the user typed in conversation. Without a rule, a user could state a problem, have that statement
accepted as material, and then cite it as its own support — and `unrated` would become unreachable. The
parent reserves `unrated` for a claim *asserted by the user with no supporting material*, so that state
has to stay reachable.

**Rules**
- **A reference that only restates the hypothesis is not evidence for it.** It may still be perfectly good material for a different hypothesis.
- **The user's own assertion is not evidence for the user's own hypothesis.** It is the hypothesis.
- A reference that reports an observation *and* draws the same conclusion is evidence. The test is whether an observation is present, not whether a conclusion is absent.

---

## 3. Provenance

Provenance is what lets a reviewer go back to the source and check. It is **complete** when a reader who
was not in the room could locate the same material and see the same thing.

Every reference carries the same three things — an origin, a date, and a locator — expressed
differently by form.

### 3.1 What each form must carry

- **`document`** — a report, deck, study, analysis
  - **origin** — title, plus the author or the body that produced it
  - **date** — when it was produced
  - **locator** — page, section or heading
- **`transcript`** — an interview, session or call
  - **origin** — the session identity, **and the participant the claim came from**
  - **date** — when the session took place
  - **locator** — timestamp, line, or a quoted span
- **`ticket`** — a support or issue record
  - **origin** — the system, the identifier, and the reporter
  - **date** — when it was raised
  - **locator** — the identifier is sufficient where a ticket is short; a field or comment reference where it is long
- **`text`** — material the user typed in conversation
  - **origin** — **whose observation this is, and what it is a report of.** Not the user, unless the user observed it
  - **date** — when it was observed, not when it was typed
  - **locator** — not applicable; the text is its own locator

### 3.2 Sensitivity

Some of the material this workflow will meet is pseudonymised research about real people. Provenance
must not undo that.

**Rules**
- **A stable pseudonym satisfies participant identity.** It is sufficient for both independence and completeness, and it is the default — a real name is never required to reach `strong`.
- Provenance records *where to look*, not what was found. It carries no personal detail beyond what identifies the source.
- **Carry the naming the material carries. Never invent one and never strip one.** Where the material arrives pseudonymised, the pseudonym is what you record. Where it arrives with real names in it — a transcript of a workshop, a research session where every speaker is named — those names are what identifies the source, and you record them as given. **You do not pseudonymise on your own initiative**, because a name you replaced is a source the next reader cannot follow back, and you do not add a name the material does not carry.
- **Say so when you first meet named material.** One sentence to the person, at intake, naming how many individuals the material identifies and that those names will travel through every artifact to the initiative. It is their material and their decision; what is not acceptable is that it happens without anybody saying it.
- **Anonymised material often arrives without its dates.** Where it does, a period the person who supplied it
  confirms is the date: a year, a quarter or a month (`2026`, `2026-Q2`, `2026-04`). It is recorded on the item as
  their statement, with their name, the day they confirmed it and the period. A year the file names is only what the
  task suggests in its box; nothing counts as dated until the person confirms it.

### 3.3 The `text` form is the weak one by construction

A typed paragraph rarely carries an origin, a date of observation, and a stated subject. That is not a
defect in the form — it is what makes it fast — but it means material supplied only as text will
usually produce `weak`, and that is the correct outcome rather than a bug to engineer around.

The agent's response to a thin `text` item is to ask: *whose observation was this, and when?* Two
questions, asked at intake, routinely move a hypothesis from `weak` to `strong`.

---

## 4. Independence

Two references are independent when they come from **different origins**. The origin is the person or
body the claim ultimately comes from — **not the container it arrived in**.

This is the rule that stops volume from being mistaken for corroboration. Four quotes from one
interview are one origin. Six tickets filed by one support agent relaying one customer are one origin.
A deck that cites a survey, plus the survey, are one origin — the survey.

> **This section is the source of record for the independence rule across the whole area** (PD98).
> The [Competitive Analysis Standards](../market/competitive-analysis-standards.md) §3.2 apply it to *sources*
> rather than to observations, and say so — a marked derivation, not a second statement of the rule.
>
> **What is shared stops here.** The two derivations that consume it stay separate, because they are
> different jobs: `trust` counts origins and requires a witness; `confidence` counts sources and requires
> a primary one. Sharing the rule is what PD72 was reaching for; sharing the arithmetic would have forced
> one set of thresholds onto two questions that do not ask the same thing.

### 4.1 The origin key by form

| Form | Origin is | Example key | Not |
|---|---|---|---|
| `document` | The author or producing body — or the underlying source, where the document reproduces one and names it | `digital-channels-team` | The document |
| `transcript` | The **participant**, identified within the session | `participant-p1` | The session, and never the facilitator |
| `ticket` | The reporter — or the customer, where the reporter is relaying and names them | `adviser-m-dvorak` | The ticket, or the system |
| `text` | Whoever made the observation | `unestablished` where not recorded | The user who typed it, unless they observed it |

**Rules**
- **Where an origin is unclear, it is not independent.** Independence is asserted, not assumed; an unresolvable origin collapses into the reference it arrived with.
- The same origin appearing in two different forms — a participant who also filed a ticket — is still one origin.

### 4.2 The origin key

**Origin is recorded twice: as prose, and as a key.** The prose says who this is in terms a reviewer can
check. The key says which origins are the *same* origin, and it is the only part the arithmetic reads.

The prose alone cannot carry that weight. A real intake produced these two lines for one person:

- *"Adviser M. Dvorak relaying an unnamed client, Servicedesk SD-51882"*
- *"Adviser M. Dvorak, Servicedesk SD-51882"*

One human, described twice. Anything comparing the strings counts two origins and rates the hypothesis
`strong` when it is `weak`. **That is not a near-miss — it is the difference between a problem a team
will spend a stage solving and one they will not.**

**Rules**
- **Every observation carries an `origin_key`**: lower-case, ASCII, hyphenated, stable for the whole run.
- **The same party always takes the same key**, however differently the prose describes them. `participant-p1` · `adviser-m-dvorak` · `digital-channels-team`.
- The key names **the party the claim comes from, not the container** — the same rule as §4, now made checkable.
- Where the origin cannot be established, the key is **`unestablished`**, and the observation's provenance is **never** complete. An unidentifiable origin cannot corroborate anything, so it must not be able to count.
- **Two observations sharing a key are one origin. Two observations with different keys are two.** No similarity judgement, no string comparison.
- Two references share an origin when their `origin_key` values are equal. **Equality, not similarity.**
- Assigning keys is the intake step's judgement, made once, in the open, where a reviewer can see it — rather than re-made implicitly by every consumer downstream.

### 4.3 Source proximity

Independence asks whether two observations come from *different* origins. Proximity asks a different
question: **how close the origin stood to the thing observed.** Two origins can be genuinely independent
and both still be at second hand.

The distinction matters because this workflow's material is uneven in a way the origin count cannot see.
A participant describing their own abandoned application watched it happen. An adviser writing a ticket
about a client's call did not — they are reporting what they were told. A deck reporting a funnel figure
is further out again: it summarises many events nobody in the room witnessed, and usually names no
underlying source.

Counting those three as equal corroboration is how a workflow talks itself into confidence. Two advisers
independently relaying two different clients is real signal, and it is kept — but it is not the same
thing as two people describing what happened to them, and `strong` is the tag that sends a team off to
spend a stage solving something.

**Rules**
- **Every observation carries a `proximity`**: `first_hand` · `relayed` · `aggregated` · `unestablished`.
- **`first_hand`** — the origin observed it themselves. A participant on their own experience; an adviser on what they themselves did.
- **`relayed`** — the origin is reporting what someone else observed, and that someone is not separately established as an origin. An adviser recounting a client's call.
- **`aggregated`** — the observation is a summary over many events rather than a report of one. Funnel figures, survey percentages, incident counts.
- **`unestablished`** — mirrors the origin key. **Where the origin cannot be established its proximity cannot be either**, and such an observation never has complete provenance, so it never reaches the qualifying set.
- **Proximity measures the distance between the recorded origin and the event — not the route the observation travelled to reach us.** Where a named customer is the origin, that customer is `first_hand` even though the ticket arrived through an adviser. Where the customer is unnamed and the adviser is therefore the origin (§4.1), the adviser is `relayed`. Who the origin *is* is settled first, by §4; proximity is then measured from them.
- **Proximity is a property of the observation, not of the origin.** The same adviser is `relayed` on what a client told them and `first_hand` on what they did about it. Recording it per origin would lose that, and the ticket in run `2026-02` is exactly that shape.
- Proximity is the intake step's judgement, recorded once where a reviewer can see it — the same discipline as the origin key.

---

## 5. The thresholds

The tag is computed over the **qualifying set**: those references whose provenance is complete. A
reference with incomplete provenance stays attached and visible; it simply does not count toward the
tag. *(Decided — PD60. The alternative, capping the whole hypothesis at `weak`, was rejected because it
penalises attaching extra material and so teaches authors to attach less.)*

| Tag | Condition |
|---|---|
| **`strong`** | The qualifying set contains **two or more independent origins**, **and at least one of its observations is `first_hand`** |
| **`weak`** | At least one reference exists, and the qualifying set **fails either condition** |
| **`unrated`** | **No references at all**, once §2 has been applied |

**Thin** means exactly this: a qualifying set with one origin, or one that nobody in it witnessed. The
parent's two routes to `weak` — *evidence present but thin* and *provenance incomplete* — are both
expressed here, because incomplete provenance is what shrinks the qualifying set below the bar.

**Rules**
- Every tag carries its `rationale`: the origin count, **the proximity mix**, and what fell out of the qualifying set and why.
- A hypothesis with no qualifying reference but several incomplete ones is `weak`, not `unrated`. Material was supplied; it was not checkable.
- **Two independent origins that are all `relayed` or all `aggregated` are `weak`, and the rationale must say so.** The evidence is kept, visible and prioritised on its merits — the tag records that nobody in the set saw it.
- The `first_hand` requirement reads the **observations** in the qualifying set, not its origins. One first-hand observation is enough, and it need not come from the origin that supplied the others.
- Nothing above involves a number a user can move. The thresholds are two, one, and one.

### 5.1 Boundary cases

| Situation | Tag | Because |
|---|---|---|
| Four quotes, one interview participant, all complete | `weak` | One origin. Volume is not corroboration |
| Two participants, same session, both complete | `strong` | The participant is the origin, not the session — and each is `first_hand` on their own experience |
| Three references, three origins, one missing its date | `strong` | The qualifying set still holds two independent origins, and at least one saw it |
| Two references, two origins, both missing dates | `weak` | The qualifying set is empty; references exist |
| A deck citing a survey, plus that survey | `weak` | One origin — the survey |
| The user types the problem and cites nothing else | `unrated` | §2 — a restatement is not evidence for itself |
| The user types an observation from a customer call, with who and when | `weak` | One origin, provenance complete. A second origin makes it `strong` |
| Two tickets, same reporter, different customers named | `strong` | The named customers are the origins, and each is `first_hand` on their own case |
| **Two advisers, two unnamed clients, both complete** | **`weak`** | **Two independent origins, but both `relayed` — nobody in the set saw it.** The evidence is kept and the rationale says why |
| **A funnel deck and a survey summary, both complete, different bodies** | **`weak`** | Two independent origins, both `aggregated`. A count of events is not a witness to one |
| **One participant on their own case, plus one adviser relaying a client** | **`strong`** | Two origins, and the participant is `first_hand`. One witness in the set is the bar |
| **An observation whose origin could not be established** | — | Proximity is `unestablished`, provenance is never complete, and it never reaches the qualifying set at all |
| **Two relayed origins complete, plus an undated `first_hand` observation** | **`weak`** | **The witness test reads the qualifying set.** An incomplete reference supplies neither an origin nor a witness, so two relayed origins are what remain |

### 5.1b The tag says which route it took, and `weak` does three different jobs

**The tag is computed and stays computed. What changes is the clause written beside it**, because on one
run `weak` appeared against three situations a reader cannot tell apart:

| Written today | Written instead |
|---|---|
| `weak`. One origin. | **`weak` · one origin, first-hand.** Then who it was, and that nothing repeats it |
| `weak`. One origin, the operations note, aggregated throughout. | **`weak` · one origin, aggregated.** Then that it is the widest claim in the set and the least witnessed |
| `weak`. The one reference carries an origin that could not be established. | **`weak` · nothing qualified.** Then that the qualifying set is empty rather than small |

**The third is not a thinner version of the first, it is a different fact.** One says a person said this
once; the other says nobody who counts said it at all, and a reader deciding where to spend a week needs
that difference.

**A claim names the item it rests on, in the sentence a person reads.** Not the production record. Every
supplied item carries a reference and a provenance line, and the internal item ids appear **zero times**
anywhere downstream, which is right — they are the machine's handle. Name the thing the way a reader could
go and find it: *Ticket CC-51204 of 3 August*, *interview K-07 of 11 August*, *branch adviser
H. Dvořáková, 19 August*.

**A missing number is a named ask in the same sentence, and the rule was never the problem.** Output Voice
already requires this and gives the model sentence; four producers wrote the empty form anyway, so the
example is what was missing.

> **Write:** No count was recorded. The reporting job behind the July operations note holds the quarterly
> refresh population and its thirty-day completion rate.
>
> **Not:** No exact count available.

**State the ceiling once per document, in the opening.** Where a whole set rests on a bounded amount of
supplied material, say so and say what the top tag means in those terms: *`strong` means two of those six
agreed, independently and first-hand. It does not mean a problem is quantified.* A reader who meets
`strong` with no ceiling stated will read it as measured.


### 5.1c Worked examples — what a claim rests on, and what "thin" means

**The first pair is real text from a real accepted document. The second pair is written to the standard**,
because no run has yet written a tag that says which route it took.

#### What a claim rests on

**What usually gets written**

> A client learns their identity is restricted only at the point a payment is declined **[rec:R-A3-01]**. A
> second client had the same sequence: an in-app request deferred while travelling, no further prompt for
> weeks, then a card decline mid-payment **[rec:R-A3-01]**.

**All eighteen references in that document were the same string, and it is the document's own production
record. It tells a reader that A3 wrote A3.**

**Write it like this**

> A client only found out they were restricted when a payment was declined in a shop, after eleven years
> with the bank (`A2-item-1`, K-07, retail client, 11 August). Another put off a request in the app while
> travelling, heard nothing for weeks, then had a card declined mid-purchase (`A2-item-2`, ticket CC-51204,
> 3 August).
>
> **Both reached us as complaints afterwards, not as questions beforehand.** That is the problem itself, not
> just evidence for it.

**The difference:** a reader can go and look. **And the first is not only uncheckable, it is untrue** — it
says the source is a record when the source is a person. The identifiers already existed and appeared
nowhere in the run.

#### What "thin evidence" actually means

**What usually gets written**

> **H7. Trust: weak.** Contact-centre calls run long with no script and end in a redirect.

**Write it like this**

> **H7. Thin evidence — one person, who was there.** A contact-centre team leader described it directly
> (`A2-item-6`, M. Prochazka, 20 August). **One person, first hand.** One more independent source would make
> it solid, and nothing contradicts it.
>
> **H12. Thin evidence — nobody we could identify.** The only thing behind it is an operations note with no
> author and no team on it, so we cannot say who told us.

**The difference:** one word was doing three jobs. **H7 needs one more person. H12 needs its first, and it
is not a thinner version of H7.** Anyone deciding where to spend a week has to be able to tell them apart.

### 5.2 What a hypothesis carries besides its tag

**The tag says how much the evidence is worth. It does not say what would change the answer.** A `weak`
hypothesis tells a reader the evidence is thin; it does not tell them what to go and look for, and the
rationale beside it explains the arithmetic rather than the doubt. Three fields close that, and the first
is the one that matters.

- **`disconfirming`** `R` — **the specific observation in this run's own material that would contradict
  this hypothesis, or the observation somebody could go and get that would.** Not a caveat, not a
  confidence statement, and not a restatement of the trust tag.
- **`themes[]`** `1..n` — short descriptive tags, one to four words each. Not categories, and not a
  taxonomy anybody has to agree in advance. They exist so a set of a dozen hypotheses can be grouped by a
  reader without renaming anything.
- **`kind`** — `true | barrier`.

**On `kind`, because the distinction earns its place.** A **true problem** is a fear, a need or a loss —
the thing that makes somebody care. A **barrier problem** is friction, process or interface — what stops
them acting on it. Both belong in the set and neither outranks the other. **What the field prevents is a
run that promotes only barrier problems and ships an initiative that removed friction from something
nobody cared about**, which is invisible when every hypothesis reads alike.

**Rules**

- **`disconfirming` is specific to this corpus or names what would have to be found.** *"Could be wrong"*,
  *"needs validation"*, *"if users disagree"* and *"further research required"* are refused by C82. They
  are the sentence a producer writes when it has not done the thinking.
- **It points at an observation, not at a feeling.** Good: *A2-item-5 has the adviser saying customers ask
  for help after finishing the questionnaire, not during — more intake of that shape moves the barrier to
  fund choice.* Bad: *this may not generalise.*
- **A `strong` hypothesis needs it more than a weak one.** Two independent origins is where a run stops
  looking, and the disconfirming line is the only thing on the record that says what it stopped looking
  for.
- **It is never derived.** Unlike the trust tag, this is a judgement, and a producer that cannot name one
  says so in the field rather than filling it — an absent disconfirming line is a finding about the
  hypothesis, and a fabricated one is worse than no field at all.


### 5.3 A solution-shaped candidate whose need is already stated

**The parent gives a solution-shaped candidate two outcomes — reduced, or not a problem — and says nothing
about the case where both are defensible.** That case is common and it is where two authors of the same
material diverge: the candidate names a thing to build, an observation does report a need beneath it, **and
a hypothesis in the set already states that need.**

**Measured, not supposed.** Three trials of `hypothesis-authoring` on one held-out input took
both answers from the sentence above: two reduced the candidate into a new hypothesis and one rejected it
as adding no independent observation. Each argued correctly from the rule as it stood. The trust arithmetic
was identical in all three; **this was the only judgement that moved**, and it moved the shape of the
problem set a reviewer receives.

**So the third outcome is named rather than left to be inferred.**

| | When | What you write |
|---|---|---|
| **Reduce into a new hypothesis** | An observation reports the need, and **no hypothesis in the set already states it** | The new hypothesis states the need and carries the original in `reduced_from` |
| **Record on the hypothesis that already states it** | An observation reports the need and **a hypothesis in the set already states it** | `reduced_from` goes on **that** hypothesis. No second hypothesis is created |
| **Reject** | **No observation anywhere in the record reports a need beneath it** | `rejected[]`, with the reason. It is not a problem |

**The test for *already states it* is the reference set, not the wording.** If every observation that
would support the reduced hypothesis is already attached to another hypothesis, the need is already in the
set and the candidate does not become a second entry. **A new hypothesis earns its place by bringing at
least one observation the set does not already rest on.** Wording is not the test: two sentences describing
one need from different angles are one hypothesis written twice, which is the same rule stage 4 applies to
solutions that share a `solves[]` set.

> **Reject means the need has no observation at all. It never means the need is already stated.** That
> reading collapses row 2 into row 3 and it is not hypothetical: **the second measurement had a trial take
> it**, arguing that no observation reported a need *distinct from* those already captured, and rejecting
> a candidate whose need two hypotheses were resting on. Rows 2 and 3 divide on whether an observation
> reports the need, and on nothing else.

**Why this and not the other way round.** Rejecting a candidate whose need is real and evidenced loses the
fact that somebody proposed a solution for it, which is exactly what `reduced_from` exists to retain.
Creating a second hypothesis for a need already stated inflates the set and splits its evidence, and a
reviewer at G2 then weighs one problem twice. **Recording the reduction on the hypothesis that already
holds the need keeps both facts and adds nothing.**

**What still varies, measured and named rather than left to be discovered.** With §5.3 in force, three
trials on the same input agreed on both substantive hypotheses and their tags, and still differed on two
things: **whether an observation whose provenance is incomplete becomes a weak hypothesis of its own**
(§5.1 permits it — the qualifying set is empty and the references exist), and **where the reduction is
recorded** when more than one hypothesis could hold it. The first is a real authorial choice this body
deliberately leaves open. The second is not decided here and is the next thing to decide if the variance
matters more than the freedom.

**What checks this and what does not.** C69 refuses a hypothesis that carries `reduced_from` and brings no
evidence reference of its own that the rest of the set does not already carry. **That reaches the second
row above and not the first**: whether an observation reports the need beneath a sentence is a reading of
the sentence, and it stays with the author and the Researcher at G2. The check is stated here as partial
rather than described as closing the question.


---

## 6. Where the judgement sits

The parent requires the tag to be derived. Three of the rules above need judgement — whether a reference
reports an observation (§2), who the origin is (§4), and how close that origin stood to the event
(§4.3). None can be mechanical, so all three are placed **before** the tag rather than inside it.

The sequence, top-down:

**Intake** — `material-intake` reduces the material to observations, recording for each an origin in
prose, an origin key, a proximity and a provenance record
&nbsp;&nbsp;&nbsp;&nbsp;→ the intake record, which is the only thing the next step reads

**Authoring** — `hypothesis-authoring` decides which observations support which hypothesis
&nbsp;&nbsp;&nbsp;&nbsp;→ a reference set per hypothesis

**Tagging** — arithmetic over that set: count qualifying references, count distinct origins, look for a
`first_hand` observation, apply §5
&nbsp;&nbsp;&nbsp;&nbsp;→ the tag, with its rationale

**G2** — the Researcher reviews, and evidence discipline is explicitly their remit

The tag stays derived because by the time it is computed, every judgement is already recorded and
visible. It also means the honest weak spot is named rather than hidden: **a skill that attaches
references generously inflates trust**, and the only control on that is the Researcher at G2. That is
the parent's design — G2 is where evidence judgement lives — but it is worth stating plainly rather
than implying the arithmetic protects against it.

---

<!-- history -->
## 7. Coverage bar

Its only reader is `hypothesis-authoring`. This body is available when the skill can, for any reference
set drawn from any of the four forms, reach exactly one tag and state why:

- Decide whether a reference is evidence at all — §2
- Decide whether its provenance is complete, for its form — §3
- Decide whether two references are independent — §4
- Decide how close each origin stood to what it reports — §4.3
- Compute the tag and its rationale — §5

**Assessment: met.** The four forms are the closed set the parent defines for A2, each has a stated
provenance field set, an origin key and a proximity, and §5.1 works the boundary cases the rules would
otherwise leave arguable — including the two shapes the proximity rule exists to catch.

---

<!-- /history -->
## 8. Open

> **Placeholder, set by the stakeholder — N2-e below.** The strength of a problem statement
> is to gain a second parameter: **its alignment with the overall strategy and the opportunities named
> there.** Nothing is built for this and nothing should be until the Strategy Basis lands (T6). It is
> recorded here rather than in a note because **this body owns the word "strength"**, and today that word
> means evidence and nothing else. Anyone reading §5 needs to know a second dimension is coming.

| # | Question | Effect |
|---|---|---|
| **N2-e** | **Strength gains an alignment parameter.** Today `trust` is one dimension, derived from evidence alone (§5), and alignment is scored at the solutions and confirmed at the PRD (PD7). The stakeholder's direction is that a problem's strength also reflects **how well it aligns with the overall strategy and the opportunities defined there**. **Not designed and not built.** Four things it collides with, so that whoever picks it up meets them at the start rather than halfway: **(1)** `trust` is derived and non-negotiable, and C52 recomputes it and compares — a second dimension needs its own name and its own arithmetic, or C52 stops meaning what it says. **(2)** PD7 puts alignment assessment at stage 4; this moves a form of it to stage 2. **(3)** It needs the Strategy Basis, which is absent until T6, and PD35 requires an unscorable dimension to declare itself unscored rather than take a zero. **(4)** A problem that is real and poorly aligned is still real; **evidence strength and strategic fit must not collapse into one number that hides which one is low.** **Recommendation: two named values, never a blend** | Until it is designed, `trust` means evidence and only evidence, and every document saying so is correct |
| **N2-c** | Whether a **freshness bound** applies to problem material — a five-year-old transcript and last month's tickets currently weigh the same. Not raised in the parent. **Recommendation: leave it out of v1** and let the Researcher weigh age at G2; revisit if runs show stale material carrying decisions | Would add a fourth condition to §5 |
| **N2-d** | Whether `strong` should require **two origins of different form** rather than two origins. **Recommendation: no** — two customers in one study are genuine corroboration, and a form requirement would make the tag a proxy for research budget | Would materially raise the bar for `strong` |
