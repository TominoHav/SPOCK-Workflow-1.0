# Output Voice

**Version:** 0.9 · **Date:** 1 October 2026 · **First version:** 18 August 2026 · **Status:** For review
<!-- history -->
**v0.9 says how a date is written (§5)**: day first in a sentence or a table cell, and `YYYY-MM-DD` in a field the workflow reads.
**v0.8 adds the terms Česká spořitelna settled on 23 September (§5.1)**, from 29 September 2026: *běh*, *profil konkurenta*, *varianta MVP*, *fáze analýzy konkurence*, *compliance*, *workflow*, the role names and *paleta příkazů*; and §5 says a task prints a gate's questions in the run's language, since the agent no longer translates them (Z53).
**v0.7 gives two Czech words of this workflow's own (§5.1)**, from 29 September 2026: a Czech run wrote "osoba" for the person it works with, where Česká spořitelna says "člověk", and "doménový vedoucí" for Domain Lead, which stays in English.
**v0.6 names the terms that stay as ČS writes them (§5.1)**, from 21 September 2026: Membership was written "Partnerství" in a Czech run.
**v0.5 says what SPOCK 1.2 changed**, from 21 September 2026: the run's language is the language of the conversation and of every document.
**v0.4 withdraws the long dash ban (§2.6), on the first live run's own numbers.** The rule was one
character with no judgement in it, and it cost about 787 credits and 24.9 million prompt tokens on that
run, roughly half of everything it spent, every credit of it after a gate had already refused a document
rather than while one was being written. `C110` was retired with it. **Stages 1 to 3 of
`2026-09-periodic-client-re-verification` recorded `output-voice@0.3` and ran under the ban; anything
recording `@0.4` did not.**

**v0.3 makes the language a property of the run rather than of the artifact (§5).** A1 carries `language`,
`cs` or `en`, assigned at stage 1 and never reassigned, and **every document a run produces is written in
it.** Until now A14 was Czech by construction and everything else was English, so the two rules could not
both be stated in one place; now they are one rule with a value behind it. Field names, ids and record
values stay English on every run, which is what lets both kinds of run pass the same gates.
**Parent contract:** [PILOT-BUSINESS-LOGIC.md](../../../PILOT-BUSINESS-LOGIC.md) v1.23 · **Backlog:** PT-N6
<!-- /history -->
**Owner:** Česká spořitelna · **Written by:** Igor Tadić · **Read by:** 13 skills — every skill that writes prose into an artifact

> **What this is.** How an artifact is written, as distinct from what it must contain. Every other body
> here sets content: the fields a card carries, the bands a score uses, the sections a PRD holds. This one
> sets the prose, because an artifact that carries every required field and reads as machine output has
> failed the only bar this repository has ever stated, which is whether a person at a gate can read it.

> **Scope: run artifacts only.** The specification, the decision log, the skills and this body itself are
> written for engineers and follow the repository's own conventions. **What follows governs what an agent
> writes into `{runs_root}/`**, in English and in Czech, read by senior business people at a bank who did not
> commission the machinery and should never have to see it.

---

## 1. Why prose is a governed field

**The reader cannot check the record and will not try.** They read the sentences. A finding stated in
prose that reads as generated carries less weight than the same finding stated plainly, whatever the
evidence behind it, because the reader discounts the source before reaching the claim.

**This is measurable and it is measured against the wrong thing today.** Every gate in this repository
counts fields, resolves references and recomputes arithmetic. None of them reads a sentence. So an
artifact can pass its gate in full while reading like an assistant explaining itself, and four of the
seven stages currently do.

**The failure is not vocabulary alone.** It is a set of habits that arrive together: the same three
constructions, the same paragraph shape repeated, a hedge before every claim, and headings that comment on
the document rather than name its contents. Any one is a slip. Together they are a signature.

---

## 2. Banned, with what replaces each

**Hard ban. Search the artifact and remove every occurrence before reporting it complete.**

### 2.1 Vocabulary

| Banned | Write instead |
|---|---|
| leverage, utilise, harness | use |
| foster, drive (as a verb of causation) | build, grow, cause |
| robust | strong, reliable, or the specific property |
| seamless | smooth, or say what has no steps in it |
| comprehensive | full, detailed, or give the count |
| navigate (as a verb for handling) | deal with, handle |
| delve, dive into | look at, examine |
| realm, landscape (as metaphor) | area, market, field |
| pivotal, crucial, critical (as intensifiers) | key, or state the consequence instead |
| myriad, plethora | many, or the number |
| unlock, empower, enable (as marketing verbs) | let, allow, or the specific mechanism |
| transformative, game-changing | cut, and state what changes |
| underscore, highlight (as verbs of emphasis) | show, prove |
| testament to | proof of |
| meticulous, intricate | careful, complex |

**Status verbs revert to plain ones.** *Serves as* is *is*. *Stands as* is *is*. *Features* is *has*.
*Represents* is *is*. *Aims to* is cut or becomes *tries to*.

### 2.2 Phrases

Cut on sight, without a replacement, because each one is filler that survived a draft.

*It is important to note that* · *It is worth mentioning* · *It should be noted* · *In today's rapidly
changing market* · *As the industry continues to evolve* · *Imagine a scenario where* · *Let us look at*
· *By understanding X, you can Y* · *In conclusion* · *Ultimately* · *Now more than ever* ·
*stay ahead of the curve* · *future-proof*

**If a thing is important, state it. The sentence announcing that you are about to state it is the one
to delete.**

### 2.3 Structures

**Negative parallelism. Hard ban.** *Not just X, but Y.* *It is not X, it is Y.* *No fluff, no filler.*
This construction more than quadrupled in corporate filings between 2023 and 2025 and is the single most
recognisable tell in business prose. **If a claim needs the contrast to land, the claim is not ready.**

**The forced triplet.** Three of anything where two are true and the third was invented to complete the
rhythm. Audit every list of three in the artifact. Two is a legitimate answer, and so is four.

**The participle tail.** A sentence ending in an *-ing* clause that adds significance the sentence has not
earned: *...cementing its position*, *...reflecting a broader shift*, *...highlighting the trend*. End the
sentence at the fact.

**The uniform paragraph.** Claim, two supporting clauses, claim restated, repeated for the length of a
section. It is the most consistent shape machine prose takes. **Vary deliberately**: at least one
paragraph of a single line, at least one that runs long because the idea deserves it.

**Bullets where prose belongs.** A list is for things that are genuinely enumerable, such as the features
on a card or the sections a template names. An argument is prose. A finding is prose. The reasoning behind
a score is prose.

### 2.4 Transitions

**Banned at the start of a sentence:** *Furthermore*, *Moreover*, *Additionally*, *Consequently*,
*Importantly*, *Notably*.

Use no transition, or a concrete one that says what the relation is. *That is why*, *The problem is*,
*What this means for us*. White space and order carry more than a glue word does.

### 2.5 Hedging

**Banned:** *arguably*, *it could be argued*, *perhaps*, *it may be the case that*, *relatively*,
*fairly*, *quite*, *somewhat*, *in our view*.

**A degree of confidence is a field, not an adverb.** This workflow derives trust from evidence and
confidence from source counts, and both are recorded where a check can read them. A sentence hedged in
prose is a second, unchecked claim about certainty sitting next to the first.

Where something genuinely is not known, the sentence says so and says who would know. *No count was
recorded, and the contact centre holds the data* is not hedging. *This may possibly indicate a trend* is.

### 2.6 Typography

**The long dash is not banned in a document.** Banning it cost about half of a run
with real outward research, all of it after a gate had already refused a document.

**Straight quotation marks, not curly.** **Sentence case in headings, not title case.**

---

## 3. Headings name their contents

**A heading is a label, not a comment on the document.** *Where the market has settled* names what is
under it. *What this artifact does not do* comments on the artifact. *The correction that paid for
itself* is editorialising.

**No heading is numbered** unless the number is real information the reader needs, which for a stage
sequence it is and for a section list it is not.

**No heading contains an internal identifier.** Not an artifact code, not a stage number, not a gate
name, not a skill name.

---

## 4. Positive patterns

These are what make prose read as authored, and they are harder than the bans.

**Take a position in the first sentence of every section.** *The Czech market has split into banks with
digital intake and banks without, and neither group tells a customer anything after they file* is a
position. *This section describes the market* is a label with a paragraph attached.

**One idea per sentence, and split rather than compound.** If a sentence can be cut in two without losing
meaning, cut it.

**Specific numbers, never vague quantities.** *Six of ten* rather than *most*. *Twenty-nine per cent*
rather than *a significant rise*. The workflow already holds the counts.

**State the inverse after the principle.** *The scheme rules cap how fast a case can close. They say
nothing about telling the customer while it runs.* The second sentence is what makes the first useful.

**Name the consequence for the reader.** Every finding ends by saying what it means for this initiative,
or says plainly that it means nothing for it, which is also a result.

**Let the strongest sentence be short.** Machine prose distributes emphasis evenly. A person writes one
line that carries the paragraph.

---

## 5. The run's language

**A1 carries `language`, and every document this run produces is written in it.** It is `cs` or `en`,
assigned at stage 1, never reassigned. **Read it from the brief. Do not infer it from the material**, from
the topic, or from the language the person happens to write to you in: a person writing in Czech on an
English run still gets English documents and English replies, and the brief is what settles it.

**What follows the language, and what does not.**

| Follows the run's language | Stays English on every run |
|---|---|
| Every heading and every sentence of the body | Field names, artifact ids, record values, enum values |
| The section names a template fixes, where the template gives both | Gate reports, check messages, run-state records |
| Anything a person reads to make a decision | Anything a script parses to make a comparison |

**The line is what a person reads against what a machine reads**, and it is not a style preference. A run
whose `status` or `ost_role` translated would be a run no gate could parse, and a document whose headings
did not would be one no Czech reader could use.

**A date draws the same line, in one form for both languages.** A date in a sentence or a table cell is
written day first, `1. 10. 2026`, on a Czech run and an English run alike, and so is a date inside a field's
words, as in `origin: participant P4, session 12. 6. 2026`. **A field whose value is a date keeps
`YYYY-MM-DD`**, as `researched_at`, `observed_at` and the initiative's `created` and `updated` do, and so
does the `accessed` column of `sources.md`. The workflow compares `researched_at` as text, where
`1. 10. 2026` comes before `7. 9. 2026`, and Česká spořitelna's initiative template asks for `created` and
`updated` in that form.

**The conversation follows the run's language too.** Every agent speaks to the person in it, at every stage,
from the moment it has read the brief. A gate report, a check message or a task's output stays English, as the
table says, apart from the one line a task prints to say the run's language and a gate's questions, which it prints in the run's language, and the agent explains it in the run's language in its own words rather than pasting it. Task
names, file paths and values the person types stay as printed, and **what the person typed is quoted exactly
as they typed it.**

**Where you cannot write the language well, say so and stop.** A document written in degraded Czech passed
Q6 twice on one run and was caught by a person, not a gate. **Producing bad Czech is worse than
declaring you could not produce good Czech**, because the first arrives looking finished.

### 5.1 Writing in Czech

**Every rule above applies, and four more.**

**Do not translate an English construction into Czech.** A sentence that reads as a translation reads as
machine output to a Czech reader whatever its vocabulary. Write it in Czech.

**No internal identifiers in the body of the initiative at all**, in either language. A ČS reader has
never seen `A13`, `OPT-A` or `H1` and should not meet them in a document addressed to them.

**This is the initiative's rule and not every document's**, because the wording has been read
both ways. An id is how the run's own documents refer to each other: A4 places `H1`, A8 solves
it, the PRD traces to it, and a reader following the chain needs the handle.
§3 above is the rule for every other document,
and it forbids machinery in a heading — an artifact code, a stage number, a gate name, a skill name — which
a hypothesis or option id is not.

**Formal register, second person plural where the reader is addressed.** The document is from a bank to
its own people.

**Names from ČS's strategy are proper names, and stay as ČS writes them in either language.** A translated
name is one nobody at ČS recognises, and a reader searching their own documents for it finds nothing.

**Words of this workflow's own have a fixed Czech form too**, and the rows after the pillar names give them.

| Write | Never |
|---|---|
| Membership | Partnerství, or any other translation |
| The pillar names exactly as the Strategy Basis writes them in §2: on a Czech run the Czech name and on an English run the English name, where it gives both (Nový obslužný model pro firmy · New service model for business clients, Investice · Investments, Technologický Leadership · Technology leadership), and on any run the names it gives once (Super Human Super Digital, Level Up, AI First, Love Brand) | A translation or a paraphrase of any of them |
| člověk, in the form the sentence needs, for the person a run works with | osoba, for that person. A legal term stays as the law writes it, such as "fyzická osoba" |
| Domain Lead, in English | doménový vedoucí, vedoucí domény, doménový lead, or any other translation |
| běh, in the form the sentence needs, for a run | run, in Czech text |
| profil konkurenta, for a competitor card | karta konkurenta |
| varianta MVP, for an MVP option | možnost MVP |
| fáze analýzy konkurence, for the market stage | tržní fáze, fáze trhu |
| compliance, in English, as in oddíl compliance or bod compliance | a translation, such as soulad s předpisy |
| workflow, in English and neuter, as in samo workflow | pracovní postup |
| Product Manager, Business Analyst and Technical Lead, in English and declined as Czech needs, as in Product Managera | produktový manažer, business analytik, technický lead |
| paleta příkazů, for the command palette of VS Code | Command Palette, in Czech text |

**The list is ČS's to extend.** Whoever owns this body at ČS adds a name or a word when a run is found writing one another way.

---

<!-- history -->
## 6. Coverage bar

Its readers are every skill that writes prose into an artifact. This body is available when the skill can
answer, and a check could decide:

| Question | Where |
|---|---|
| Which words and phrases are banned, and what replaces them | §2.1, §2.2 |
| Which sentence and paragraph structures are banned | §2.3 |
| Which transitions and hedges are banned | §2.4, §2.5 |
| Which characters are banned | §2.6 |
| What a heading may and may not carry | §3 |
| What good prose does, as opposed to what it avoids | §4 |
| What changes in Czech | §5 |

**Assessment: met for the bans, and the positive half is not checkable and says so.** §2 and §3 are a
string search and a heading scan, and a check over the artifact body would decide them outright. **§4 is
a judgement and no check will ever settle it**, which puts it in the same class as every other judged
rule in this workflow: carried on the artifact, declared undecided, and waiting for a second model family
that does not exist yet.

---

<!-- /history -->
## 7. Open

| # | Question | Effect |
|---|---|---|
| **V-a** | Does the ban list apply to `notes/`, which no gate reads and which exists to record what went wrong | Currently no. The account of a defect is written for whoever investigates it, not for a stakeholder |
| **V-b** | Czech register for the initiative document is stated here and the Guild template may state its own | If they disagree, the Guild's template wins and this section is the defect |
