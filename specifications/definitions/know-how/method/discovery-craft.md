# Discovery Craft

**Version:** 0.1 · **Date:** 2 September 2026 · **First version:** 2 September 2026 · **Status:** For review
**What a producer knows before it starts, as distinct from what it is told to write.** Assembled from the
know-how survey and a second pass that read the survey's own sources
again.
**Parent contract:** [PILOT-BUSINESS-LOGIC.md](../../../PILOT-BUSINESS-LOGIC.md)
**Owner:** Česká spořitelna · **Written by:** Igor Tadić · **Read by:** `ideation` · `methodology-guidance` — every skill that produces a discovery asset or talks to a person about one

> **What this is.** Knowledge, not instruction. Nothing here tells you what to put in a document. It tells
> you what is true about discovery work, so that you can recognise a weak input when a person hands you
> one, say why it is weak in a sentence they can check, and reason about the material instead of
> processing it.
>
> **What this is not.** Not the method, and the method already holds more craft than its name suggests.
> [method-canon](./method-canon.md) §9.2 carries the eight ways an outcome is stated badly, §10.4
> what makes an opportunity well formed, §12 the four factors and §13 the five kinds of assumption.
> **All of that is knowledge you have and none of it is repeated here.** Where the two touch, the canon
> wins and this body is the defect.
>
> Not the shape of an artifact either. What a document must contain and how it must read are
> [documentation-standards](../writing/documentation-standards.md) and
> [output-voice](../writing/output-voice.md), and this body says nothing about either.
>
> **How to use it.** Each section states something that is true, then what it lets you notice, then what
> you say when you see the weak version. The last of the three is the point. Knowledge that cannot be
> turned into one sentence to a person is knowledge this body should not carry.

---

## 1. The person cannot simply tell you what they want, and this is not a failing of theirs

**Composing intent as prose is harder than recognising it in a list, and the gap is large.** Around half
the adult population in rich countries is classified low-literacy on the OECD's PIAAC measure, and the
set who find it hard to write new descriptive prose is larger still. Jakob Nielsen's estimate is that
under twenty per cent of people are articulate enough to get value out of a prompt, with ten per cent as
his own most likely figure (Nielsen, *The Articulation Barrier*, 2023).

**Above that sits a second gap, named at CHI 2024 as the gulf of envisioning.** Before a person can
instruct you or judge what you produced, they have to know three things: what the task should even be,
how to say it to you, and what a good result would look like. **A question assumes all three and supplies
none of them** (Subramonyam et al., CHI 2024).

**This is the single most useful thing in this body**, because everything this workflow does starts with
a person saying something into an empty space.

**What it lets you notice.** A thin answer is usually not a thin thought. It is a person who knows the
answer and cannot phrase it, or does not know what shape of answer you are asking for. Those two have
different remedies and neither of them is asking the same question again.

**What you say.** Offer the shapes an answer could take and let them pick or correct. *Teams usually put
one of three things here: a behaviour that changes, a number that moves, or a decision that gets easier.
Which is closest?* is a question a person can answer badly and still get somewhere useful.

---

## 2. A problem is a thing that happened to somebody, and three things get mistaken for one

**A stated problem is not a problem until it names a behaviour, carries the observation under it, and
leaves more than one way of answering it open.**

**A feeling is not a behaviour.** *Customers find the form confusing* cannot be checked by anybody.
*Customers stop at the income step and come back the next day to start again* either shows up in the data
or does not. The second is a problem and the first is a report of somebody's impression of one.

**An abstraction with no observation under it cannot be traced, sized or disproved**, and it survives
into the solutions stage, where somebody builds on it and nobody can say what it rested on.

**A solution wearing a problem's clothes is the third.** *Customers need a progress indicator* has already
chosen the answer. The problem under it is not knowing how much is left, and there are several ways to
answer that. **The shape test: if exactly one thing could address it, you are looking at a solution.**

**What you say.** Name the instance, not the rule. *You said customers find it confusing. What did you
see them do that made you say that?* is one exchange, and it produces the behaviour without you supplying
one.

---

## 3. What people say they will do and what they did are different evidence

**Interviews return intent. Behaviour returns fact. The gap between them is where most rework comes
from**, which is the practical reason the distinction matters rather than an epistemological one.

**The corollary that is easy to miss: discovery finds problems and validation tests solutions, and they
are different questions.** By the time a team has decided what to build, discovery has done its job and
has nothing left to say about whether the specific thing works. Most teams run only the first and are
surprised by the second.

**This pilot runs neither validation nor testing** ([method-canon](./method-canon.md) §3). Knowing
that is what keeps its output honestly labelled: everything it produces is a hypothesis with evidence
behind it, and none of it has been tested.

**What it lets you notice.** Material that is entirely interviews is entirely intent. That is usable and
it is not the same as behaviour, and the difference belongs on the observation rather than in a hedge.

**What you say.** *This is what people told you they would do. Do you have anything on what they did?*
And where the answer is no, that is the answer and the run goes on.

---

## 4. Motivation is how much friction somebody tolerates, not how enthusiastic they are

**A mortgage applicant fills fifty fields. Somebody scrolling past a consumer loan advert leaves at one.
Same form, opposite outcome.** The form is not the variable. What the person stands to gain or lose is.

**This is what makes a problem's severity sizeable at all.** The same three-step process is a trivial
irritation for one customer and the reason another abandons the product. Without knowing which, severity
is a guess with a number on it.

**The trap is measuring your best users.** Engagement metrics come from the people who already care, and
they describe the motivated tail rather than the median.

**What it lets you notice.** A brief that describes an audience and says nothing about what is at stake
for them has left out the one input that makes the rest of the run sizeable.

**What you say.** *What happens to this customer if they do not finish? That is what tells us whether a
three-step process is an annoyance or the reason they leave.*

---

## 5. Discovery has no natural endpoint, so the end is a decision

**Nobody arrives to say you have validated enough.** Discovery feels safe because no bet has been placed,
and perfect information never turns up. A team in month six that still does not know is usually not
waiting on data.

**Which is why the decision this run feeds, and the date it is taken, are inputs rather than
formalities.** A run with no stopping point does not stop.

**What it lets you notice.** *We want to explore the area* is a run with no end. So is a decision with no
date on it.

**What you say.** *Who takes the decision this feeds, and when? That is what tells us how much of this we
can afford to do.*

---

## 6. Several options beat one, because people judge goodness relatively

**A single option forces the question should we build this, which people answer badly. Several force
which of these, which people answer well.** The canon owns the counts and the pairing rule (§13.1) and the
reason (§13.2). What sits on top of it is the failure the reason predicts.

**Options that share a premise are one option.** Not one idea and a variant, not a spectrum: one. A set
whose members differ only in degree gives the reviewer the illusion of a choice and none of the benefit,
because whatever they pick they have picked the same bet.

**Diversity is a property of what you drew from.** Options come out different when they were built from
different inputs: a different constraint released, a different moment in the journey, a different party
doing the work, a different level of ambition. **Told to be diverse and given nothing to be diverse
about, a producer rewrites the same idea in different words**, which is the most reliably observed
failure in the thirty production discovery outputs the survey read.

**An idea is a solution, not a rephrased pain.** Restating the problem in the future tense is the other
half of the same failure.

**What you say.** *These two are betting on the same thing, so the choice between them is not really a
choice. Do you want a third that bets on something else?*

---

## 7. Innovation is a released constraint, and most of a product should not have one

**Novelty is not innovation.** Something is innovative when it drops a constraint everybody else is still
working under. If you cannot name the constraint, you have a feature list.

**And then the part teams skip, which pulls the other way and is usually the more valuable of the two.
Most of a product should follow what the market has already settled.** A customer arrives comparing it to
the applications they already use, and every ordinary thing you got wrong spends attention that the new
thing then does not get. **Losing on the basics means the innovation never lands.**

**So differentiate sharply in one or two places and blend in everywhere else**, and sequence the
differentiator behind the basics rather than in front of them. An option innovating in six places has not
chosen.

**Anything two or more participants in the market already do is a standard.** Presenting one as a
difference is the most common way a discovery document loses a room.

**What it lets you notice.** An option list where everything is novel, and an option list where nothing
is. Both are the same failure to choose.

**What you say.** *That is what most of the market already does, so it belongs in the part we match rather
than the part we differentiate on. Where do you want the one thing we are actually different at?*

---

## 8. A capability list washes out and a comparison decides

**How beats what.** Two products with the same feature list are told apart by what using them is actually
like, and a reader cannot get that from a list. A side-by-side on one real task does in a paragraph what
a table of ticks cannot do at all.

**Which is why a difference claim has to name something.** A participant, a capability gap, a stop on the
journey. *Unlike existing solutions* asserts a difference against nobody and cannot be checked, defended
or disproved.

**What you say.** *Different from whom, doing what?* And where the answer does not come, the claim is not
ready rather than wrong.

---

## 9. An MVP is a bet with a number on it, and the number comes first

**The question an MVP answers is what would have to be true for this to be worth continuing.** A version
with no number attached cannot answer it, because whoever describes the result afterwards will describe
it as a success.

**Design the learning in before the build, not after.** A measurement added later measures whatever was
easy to instrument, which is rarely the thing that mattered. The behaviour data a v1 produces is what a v2
is built from, and a v1 that produced none leaves v2 to opinion.

**And the expectation to hold about all of it: more than half of a first version gets reworked inside a
year.** That is the default rather than a failure, and it is the cost of turning a hypothesis into
knowledge. Better competitive work and faster exposure reduce the share. Nothing eliminates it.

**What you say.** *What number would tell you this worked? If there is not one yet, who sets it?*

---

## 10. Decide what you are judging before you look at it

**Set the bar before the result arrives**, whether the thing being judged is an experiment, an option or a
person's answer. Deciding afterwards is how a team reads its own hopes into a number.

**Apply the same parameter to everything you are comparing**, including your own work. A review that
grades one item on outcomes and the next on effort has compared nothing.

**What it lets you notice.** A success criterion that appears after the result. A set of options where
each is defended on a different basis.

---

## 11. What this body deliberately does not hold

**The canon holds these and they are not repeated here.** Read them there.

| Knowledge | Where |
|---|---|
| The three kinds of measure, and which one a team can act on | method-canon §9.1 |
| The eight ways an outcome is stated badly, each with its remedy | method-canon §9.2 |
| Where opportunities come from, and story-based interviewing | method-canon §10.1 to §10.3 |
| The four properties of a well-formed opportunity | method-canon §10.4 |
| Structuring the opportunity space, and what the shape of a tree tells you | method-canon §11 |
| Choosing what to work on, the four factors, one target rather than a ranked list | method-canon §12 |
| Three to five solutions against one opportunity, and why | method-canon §13.1 to §13.2 |
| The five kinds of assumption and how they are tested | method-canon §13.3 to §13.4 |

**The trust arithmetic is [evidence-standards](../method/evidence-standards.md)** and nothing here
changes what makes a tag strong or weak.

---

## 12. Coverage bar

Its readers are `ideation` and `methodology-guidance`: every skill that produces a discovery asset or
talks to a person about one. **A Coach not bound to this body** tells a person asking
when discovery stops that the canon does not carry it while this body sits one folder over.

| Question | Where | Could a check decide it |
|---|---|---|
| Why a person cannot state what they want, and what follows | §1 | No |
| What separates a problem from a feeling, an abstraction and a solution | §2 | No |
| What said and did are worth, and what this pilot does not test | §3 | No |
| What makes severity sizeable | §4 | No |
| Why a run needs a decision and a date | §5 | **Partly.** Present or marked is a field in the brief |
| Why options that share a premise are one option | §6 | No |
| What innovation is, and where market standards belong | §7 | No |
| Why a difference claim must name something | §8 | No |
| What an MVP is a bet on | §9 | No |
| Setting the bar before the result | §10 | No |

**Assessment: this body is knowledge and almost none of it is checkable, which is the correct result
rather than a gap.** A check can read whether a field is present. No check can read whether a producer
understood why it was asked for. **One clause is mechanical**, the brief's decision and date, and it is
mechanical because it is a field elsewhere rather than because this body made it so.

**Nothing in this build reads this body beyond a skill declaring it**, which is the same bar
[agent-interaction](../writing/agent-interaction.md) §12 states about itself. **A skill declaring this
body has read it and nothing checks that it reasoned with it.**

---

## 13. Open

| # | Question | Effect |
|---|---|---|
| **D-a** | §4's friction tolerance is knowledge with no field behind it | Either `brief-fields` gains one, or the agent knows to ask and the answer lands in the background text where nothing can use it |
| **D-b** | §6 says options sharing a premise are one option, and the canon caps the set at three to five | Merging two brings the set under the floor. The floor is the canon's and the merge is right, so the stage bodies have to say which gives way |
| **D-c** | §1's figures are external research quoted here as knowledge | They are cited to source and dated. Whether a ČS-facing body should carry an external population statistic at all is a call for the owner |
