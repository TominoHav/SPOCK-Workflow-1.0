<!-- GENERATED from specifications/definitions/know-how/method/opportunity-framing.md. Do not edit this copy.
     Regenerate: node .github/scripts/know-how.mjs --write
     Know-how is read by skills, never written by them. It changes through a human-owned process,
     outside any run (PD90). -->

# Opportunity Framing

**Version:** 0.4 · **Date:** 21 September 2026 · **First version:** 26 August 2026 · **Status:** For review
**Owner:** Česká spořitelna · **Written by:** Igor Tadić · **Read by:** `opportunity-framing` · `prioritisation` · `methodology-guidance`

> **What this is.** The body of know-how read by `opportunity-framing` (2.3). It defines the eleven
> sections a framed opportunity carries, where each one comes from, which of them are asked of a person
> and what that person's answer is worth, and what it means to mark one unanswered.
>
> **What this is not.** Not the artifact definition, which is **A3b** in §6.4b of the parent, and not the
> skill. Prose style lives in [Output Voice](../../../specifications/definitions/know-how/writing/output-voice.md) and document shape in
> [Documentation Standards](../../../specifications/definitions/know-how/writing/documentation-standards.md); neither is repeated here. This document holds
> only what *good* means for a framed opportunity.

---

## 1. Why a framing step sits between the hypotheses and the ordering

A problem hypothesis says what is wrong and how much the evidence for it is worth. It does not say how
many people it happens to, what it is worth to the bank, or what would have to change for it to stop
being true. **Nothing before 2.3 required a problem to connect to what the run is for**, and nothing
before 2.3 asked how big it is.

The ordering at 2.4 needs that answer. A list of hypotheses ordered by trust tag orders on how well the
evidence was gathered, which is a fact about the research and not about the problem. **The sizing this
step captures is what the ordering is actually made on**, so it has to exist before the ordering runs.

**Every hypothesis is framed, including the ones that will be parked.** One hypothesis, one opportunity,
none added and none dropped. A parked opportunity is a far better input to the next run than a parked
hypothesis, because the next run inherits the sizing and the reasoning as well as the evidence, and
`parked[]` is never emptied.

**Framing adds no evidence.** It restates, narrows and sizes what stage 2.2 already established. The
trust tag is carried across and is **never recomputed here**: a framing step that re-derived the tag from
the quotes it happened to copy into the as-is section would compute it over a subset and could only ever
lower it, and a tag that changes between two artifacts citing the same observations cannot be read by
anybody.

---

## 2. The eleven sections, and where each one comes from

**ČS's own Opportunity template numbers its sections 1 to 12 and has no section 6.** That is eleven
sections. The numbering is the bank's, it is what a reader who knows the Jira template navigates by, and
it is kept exactly as it is. **Nothing invents a sixth section and nothing renumbers to close the gap.**

**The numbering lives in the record's field mapping and never in a heading.** The first execution of this
stage found the collision: this section said the numbering is kept as it is, and the Documentation
Standards forbid a heading that carries a number, which C99 enforces on every artifact. Both are right
about their own half. A ČS reader navigating by section 4 finds it through the mapping the record carries;
a person reading the document finds it under a heading that names its subject. **Where the two bodies
disagree, the heading rule wins**, because it is the one a check decides and the one that governs every
other artifact in the run.

The right-hand column is the discipline of this whole body. Of the fourteen rows below, three are asked of a
person, one is deferred to a stage that has not run yet, one is deliberately empty, one says the decision is
taken later, at G2, and the remaining eight are derived from artifacts already on disk.
**A section's source decides what its content is worth**, which is why the column exists at all.

| ČS section | Field | Where it comes from |
|---|---|---|
| **1.** Problem / opportunity description | `description` | Derived from the A3 hypothesis `statement` and its `themes[]` |
| **2a.** Sizing: how many customers, how often | `sizing.customers` | **Asked of the person at this step** |
| **2b.** Sizing: market factors | `sizing.market` | **Deferred to stage 3**, which produces exactly this and runs after G2 |
| **2c.** Sizing: company factors | `sizing.company` | Derived from the brief's `goals[].key_result` and its written `link` |
| **2d.** Sizing: customer impact | `sizing.impact` | **Asked of the person**, and marked as their judgement |
| **3.** Current behaviour, as-is | `as_is` | Derived from the A3 hypothesis's own evidence quotes |
| **4.** Desired change, the Opportunity Outcome | `outcome` | Derived from the brief's `outcome`, narrowed to this one opportunity |
| **5.** Segment / persona | `segment` | Derived from the brief's `customer_segment`, narrowed |
| **7.** Opportunity validation | `validation` | The A3 trust tag, its origin count, its proximity mix and its disconfirming condition, carried across |
| **8.** Root cause | `root_cause` | **Asked of the person**, and carried as a marked assumption |
| **9.** Alternative solution directions | `alternatives` | **Deliberately empty at this stage, with the reason stated.** Stage 4 produces these |
| **10.** Success metrics | `metrics` | Behavioural from `success_signal` · business from `goals[].metric` and its key result · horizon from `time_horizon` · qualitative from `qualitative_signal` |
| **11.** Risks and uncertainties | `risks[]` | Derived from the A3 `disconfirming` conditions and from what the run could not establish |
| **12.** Recommended next step | none | **The step itself is not on A3b**: the section says it is decided at G2, in A4's `dispositions[]` |

**On section 7.** The tag arrives with the reasoning that produced it. On
`2026-05-corporate-coverage`, H1 reads *three independent origins in the qualifying set, each first_hand
on their own case*, and that sentence is what the validation section carries. **A validation section that
carried the tag without the origin count and the proximity mix would tell a reader how confident to be
and not why**, which is the failure the rationale field was written to prevent one stage earlier.

**On section 12.** ČS gives four dispositions and there are no others: continue into solution discovery ·
complete a named validation first · stop · hand over to another team. **A3b is produced at 2.3 and G2
decides at 2.4**, so at production time there is no decision to read and the section says so. The step
itself is not written into this document: it goes on A4 as `dispositions[]`, which the person approves at G2,
because an accepted document stays as it was approved. **Writing it into this document before the gate would be authoring the gate's decision
and calling it a recommendation**; on A4 it is a proposal the person approves or changes at G2.

---

## 3. The sizing block, because the ordering is made on it

Four factors. They do not average into a score and this step computes nothing from them. They exist so
that a person at 2.4 orders on how big each opportunity is rather than on how well its evidence was
gathered.

**Each factor carries a `basis` beside its content, and the basis is not decoration.** It says whether
what is written above it was supplied, derived, deferred or judged, and those four are worth different
amounts to the person reading them.

| Factor | Basis values | What the basis is saying |
|---|---|---|
| `customers` | `supplied` · `unknown` | A person gave a figure, or nobody could |
| `market` | `deferred_to_stage_3` | The answer is coming from a stage that has not run. A market list a person supplies is stage 3's input, and stage 3 runs after G2 |
| `company` | `derived` · `unknown` | Read off the brief's own goal and key result, or the brief marked its goals unknown |
| `impact` | `judgement` · `unknown` | A person said so. It is not evidence and does not become evidence |

**Company factors name the key result the brief names, and never a different one.** On
`2026-05-corporate-coverage` the brief carries two product goals feeding **SHD-4**, the time a banker
spends daily on administration, and **LVL-2**, share of wallet, each with the written link that says how
the goal moves it. The company factor is that link narrowed to this one opportunity. **Where the brief
marked `goals` unknown, the company factor is `unknown` too**, and the framing step does not go and find
a key result the brief declined to name. That is stage 1's elicitation happening three stages late and
without the person who was accountable for it.

---

## 4. An answer the person supplies is an assumption, not evidence

Two of the eleven sections are assertions: **root cause** and **customer impact**. They come out of a
person's head in the room at 2.3, and this repository already has a rule about what that is worth.

**The rule is that a person's assertion is the hypothesis rather than evidence for it.** At 2.2 a
reference that only restates the hypothesis is not evidence for it, and a solution-shaped candidate the
product owner asserted with no observation beneath it goes to `rejected[]` however senior the person
asserting it was. **Nothing about the same person answering a question at 2.3 changes that arithmetic.**

**Rules**

- **Neither inherits the opportunity's trust tag.** `root_cause.basis` is `assumption` where a person
  supplied it and `analysis` only where an RCA, a Five Whys or a Fishbone was actually run and can be
  pointed at. `sizing.impact.basis` is `judgement`. A framed opportunity tagged `strong` whose root cause
  is one manager's theory is **the single most expensive thing this step can produce**, because the tag
  is read as covering the document it sits on.
- **The mark is written even when the person is right.** The basis records where the sentence came from,
  not how plausible it is. A correct assumption and a wrong one are indistinguishable to the reader at
  the gate, and the basis is the only thing that tells them which question to ask.
- **The agent never proposes the answer and then asks for confirmation.** It asks the question and
  records what comes back. A proposed root cause that a busy person waves through is the agent's
  assumption wearing the person's name, and the record will say the person supplied it.
- **An assumption is not a defect.** ČS's template expects a root cause to be stated before it has been
  proved, and marking it is what lets stage 4 test it rather than build on it.

---

## 5. Deferred to stage 3 is not unknown, and the distinction is the point

**Market factors is written `deferred_to_stage_3`. It is never written `unknown`.**

`unknown` says nobody knows. That would be untrue: the competitive analysis stage produces exactly this
question's answer, it runs immediately after G2, and it is already in the workflow. **Writing `unknown`
hides the fact that the answer is on its way**, and it costs something specific at the gate: a reviewer
meeting `unknown` on market factors reads it as a gap somebody should have closed, and does one of two
things. They send the artifact back to be filled, which cannot be done because the stage that fills it
has not run. Or they fill it themselves from general knowledge of the market, which is stage 3's work
done badly and three weeks early, by a person whose sentence nothing downstream will ever check.

**Deferred says the answer is coming and names who produces it.** That is a different statement, a
reviewer can act on it, and it is the honest one.

This is the same distinction the brief field set draws between `not_known` and `not_yet_available`, and
it matters more here because only one section in the eleven is in this position and it is the one a
reviewer is most tempted to answer off the top of their head.

---

## 6. The outcome states a change in behaviour and never a thing to build

**This is the same rule stage 2.2 applies to a hypothesis, applied one stage later to the field the whole
section exists for.** ČS's own template says it in its own words: formulated as an outcome, not a
solution.

The test is unchanged. **Could more than one thing produce this change?** If only one could, the sentence
has already chosen, and what it chose is the thing it names.

On `2026-05-corporate-coverage`, framing H1, *the answer is inside the bank and behind a wall nobody
searches past*:

- **Names a thing to build.** *Relationship managers have a search that spans business lines and entity
  records.* One thing produces that, and it is the thing in the sentence.
- **States a change in behaviour.** *A banker asking who do we know for this gets an answer without
  having to know which business line holds it.* A joined search produces that. So does a routing desk, a
  changed reporting line, an entity resolution that runs before anybody asks, or a person whose job it is
  to know. **Stage 4 chooses between them, and it cannot choose if the framing already has.**

That run makes the trap concrete in a second way. The brief carries a known constraint that **an answer
still requiring the relationship manager's time has reproduced the constraint rather than removed it**,
and the second interview says outright *I do not want a better search, I want to stop having to guess
where to look*. **A framed outcome naming a search would have contradicted the material it was framed
from**, on a run where the evidence was as strong as it gets.

> **This rule is judged, not checked, and for the same reason the 2.2 rule is.** Whether a sentence names
> a thing to build is a reading of the sentence, and no program performs it. Naming a check here would be
> the mistake this repository exists to prevent: an `incomplete` reported as a pass. The obligation is
> carried on the artifact's `could_not_verify` list so the person at G2 meets it on the document they are
> deciding on.

---

## 7. The alternatives section stays empty here, on purpose

**Section 9 is written as empty with the reason stated. It is not omitted and it is not filled.**

A framing step that proposed solution directions would pre-empt stage 4, **which is the defect the order
of this whole workflow is shaped to prevent**. The cost is not that the suggestions would be bad. It is
that a framed opportunity carrying three solution directions is read at G2 alongside the problem, the
directions anchor the reviewer, and stage 4 then generates against an anchor rather than against the
problem. Ideation that starts from someone else's answer produces variations on it, and the run has
quietly become a solution the framing step chose.

**ČS's template agrees.** It asks for alternatives at high level only, without selection, and says they
do not need to be elaborated. Their purpose is to show the team thinks in alternatives. Leaving them to
the stage that generates them is the template's intent honoured, not a deviation from it.

**The reason is written into the field rather than left to an empty value.** An absent section and a
deliberately empty one read identically to a person, and only one of them is a statement somebody made.
The same reasoning governs `could_not_verify: []`, which is written rather than omitted.

---

## 8. Required means present or marked, never filled

**This is the bar C10 already sets for brief fields, and it holds here unchanged.** A required section is
present with content or present with a mark. It is never absent, and it is never filled to make it look
answered.

**ČS's own template opens by saying these are not strict rules**, and that the content is expected to be
supplemented gradually over time by the assigned person. That is the bank's stated position on its own
artifact. **A pilot that refused an opportunity for an unanswered section would be harder on this
material than the bank that owns the template is**, and it would buy nothing: the refusal is not a
finding, and the thing it would push a producer towards is inventing content, which is the failure that
costs the most and shows the least.

**A constant is stated once, in the opening, and never repeated per opportunity.** On one run
**thirty-one of ninety-nine field-fills were the same words on every opportunity**: market factors deferred
to the market stage nine times, company factors unknown nine times, root cause the same assumption as above
seven times, success metrics as above six times. **Eleven fields carrying four answers that never change is
a template satisfied and a reader given nothing**, and it is worse in a template the client supplied,
because the sameness reads as a considered answer rather than as an absence.

So: where a field's answer is the same across the whole set, say it once at the top of the document, and let
each opportunity carry only what differs about its own. **Where an opportunity has nothing different to say
about a field, say that** rather than restating the constant.

**The record keeps all eleven fields on every opportunity.** The checks read the front matter and none of
this touches them. It governs the prose a person reads.

**Rules**

- **Nothing is inferred.** A section the person did not answer is marked, never filled from the topic,
  from the hypothesis, from a plausible default or from what a comparable opportunity said.
- **An unanswerable section is marked with a reason and with where that answer normally lives.** The
  mark's job is to make the gap actionable, not merely visible.
- **Marking a section is a legitimate outcome**, and on some runs it is the correct one for three of the
  eleven. It is visible for the rest of the run and it is what a person weighs at G2.
- **Sourcing guidance is help, not authority.** The agent may say where an answer usually lives. It may
  not go to that location and answer on the person's behalf.

**Where an unanswered section normally lives.** These are generic, and anything ČS-specific is confirmed
before it is written into this table rather than asserted from plausibility.

| Section | Normally sourced from | ČS specific |
|---|---|---|
| `sizing.customers` | The product's own analytics, or the size of the book the segment covers | **Confirm which system** |
| `sizing.impact` | The customer, asked directly. A research study, NPS or complaints record where one exists | **Confirm** |
| `sizing.company` | The brief's `goals[].key_result`, which resolves into [Strategy Basis](../../../specifications/definitions/know-how/product/strategy-basis.md) §2 | **Settled** |
| `root_cause` | An RCA the team actually ran. ČS's template names Five Whys and Fishbone | **Confirm who runs one** |
| `metrics.qualitative` | The brief's `qualitative_signal`, or the research record behind the run | **Confirm** |

---

## 8b. Worked examples — the repeated answers, and what the set adds up to

**Both first versions are real text from a real accepted document.** Neither is bad writing. Each is correct
and stops one step short.

### The answers that are the same every time

**What usually gets written**

> **Sizing.** How many customers: one of the four highest-volume hypotheses, no exact count available,
> supplied. Market factors: deferred to stage 3. Company factors: unknown. **Success metrics. As above.**

**Repeated on nine of nine opportunities. Thirty-one of the ninety-nine field answers were the same words
every time**, and a ČS product owner reading one opportunity on its own gets a filled field with nothing in
it. **The emptiness reads as a considered answer, because the template is theirs.**

**Write it like this**, in the document's opening:

> **Two of the four sizing questions have the same answer for every opportunity below, so they are answered
> once here instead of nine times.** Market factors wait for stage 3, which is where we do the market
> research. Company factors are unknown throughout, because the brief's goals were never established.
>
> **That second one is worth stopping on.** We have sized nine opportunities against a strategy nobody could
> tell us. **So every severity below is a judgement about the customer, and not one of them is a judgement
> about what the bank cares about most.**
>
> Where an opportunity's measures or root cause are the shared ones, it says so **and says what is different
> about its own.**

**The difference:** the constant goes in the opening and each entry carries only what differs. **And the
second version says out loud something the first was carrying silently in nine "unknown" fields.**

### What the set adds up to

**What usually gets written**

> ## What we could not establish
> — Which agent handled ticket CC-51204's resolution… — The operations note gives no date narrower than…
> ## How this was produced
> Run `2026-09-…`, stage 2, skill `hypothesis-authoring`…

**Both correct, and neither is a conclusion.** Nine problems are listed and nothing says how they relate,
which carries the most weight, or what would make the set better.

**Write it like this**, in a section ahead of the closing pair:

> ## What this set says
>
> **Seven of the nine are the same problem seen from different chairs: nobody can see what is happening to a
> client's check except the system that started it.** The client cannot (H1), branch staff cannot (H3), the
> contact centre cannot (H7, H9), and we cannot report on it (H6). **That is one missing thing, not five
> problems.** Anything that makes the status visible fixes all of them at once.
>
> **The two that are not that** are H4, where clients do not trust the photo step, and H8, where branches
> pick up what the app turned away. **H8 happens because of H4** rather than being its own finding.
>
> **The biggest is H5** — most people do nothing in the first month — because it is how every other problem
> eventually shows up.
>
> **What would make this better:** one number for how many clients come up for a check each quarter. Nobody
> could give it to us, and every size judgement here rests on it.

**The difference:** the next stage and the person at the gate both work this out for themselves today, **and
the next document does it again from scratch with less to go on.**

## 9. What a material-only run will leave unanswered, and why that is the rule working

**On a run framed from supplied material with no person available to answer, three of the eleven sections
will commonly be unanswered:** how many customers and how often, how important this is to the customer,
and why the problem occurs. **That is the no-inference rule working rather than the step failing**, and
it should be said in those words rather than apologised for.

**`2026-05-corporate-coverage` is the case worth reading, because it is the strongest run in the
repository and it fails this test.** Twenty-two observations, four interviews, six hypotheses, and every
one of the six tagged `strong`. **All four origins are bank staff**: a relationship manager, a head of
trade finance sales, a senior credit officer and a segment head. Each is first hand about their own
working week and the tag is correctly derived.

**No customer was ever asked.** So `sizing.impact`, which asks how important this opportunity is to the
customer, has nothing behind it at all. Not weak evidence. None.

**Nothing in A3 or A4 says that today.** The trust tag is about origins and proximity and it is silent on
who the origins were; the hypothesis set says four people were interviewed and all four were first hand,
which is true and reads as reassurance. **Section 2 is the first place in the workflow where a run can
say out loud that it sized a customer problem without a customer**, and it is the reason the sizing block
carries a basis per factor rather than one basis for the block.

The same run shows the cheaper case as well. Its brief marks `time_horizon` unknown with a reason, so
`metrics.horizon` is unknown too. **That gap is inherited, not new**, and the framing says so rather than
recording it as something this step could not establish.

---

## 11. Open

| # | Question | Effect |
|---|---|---|
| **F-a** | **`qualitative_signal` is read by §10 and is not defined in the brief field set.** §6.4b of the parent names it as a brief field; [Brief Fields](../../../specifications/definitions/know-how/product/brief-fields.md) §2 does not carry it. **Recommendation: add it to §2.4 as optional**, sourced from the research record, so stage 1 elicits it rather than stage 2.3 discovering it is absent | Every run marks `metrics.qualitative` unknown for a reason that is a gap in the field set rather than in the run |
| **F-c** | **`insights[]` is `1..7` in the parent and `3 to 7` in ČS's template.** An `unrated` hypothesis may support no insight at all. **Recommendation: keep the parent's floor of one** and let the insight say the evidence establishes nothing, rather than refusing a framed opportunity for the state of its evidence | Framing would refuse the opportunities that most need to stay visible |
| **F-d** | The three ČS-specific sourcing entries in §8, which mirror the three still open on the brief field set. None blocks | Weaker elicitation help when a section cannot be answered |
| **F-e** | **Whether two hypotheses that frame into the same outcome should stay two opportunities.** `2026-05-corporate-coverage` already flags that H1 to H4 may be four faces of one failure, and framing is the first step that would make that visible in the outcome wording. **Recommendation: keep them separate here** and let it collapse at G2, which is where that run already said it belongs | Framing would quietly merge problems that stage 3 and stage 4 read separately |
