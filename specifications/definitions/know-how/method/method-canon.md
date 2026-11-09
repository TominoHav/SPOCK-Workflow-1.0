# Method Canon

**Version:** 0.4 · **Date:** 11 September 2026 · **Status:** For review
<!-- history -->
**In place on 16 September 2026, v0.4 kept:** §4.3's *Good* sentence says an absence is a finding about the
read. The version is kept because the Coach's recorded citations pin v0.4 and no section moved.
**Parent contract:** [PILOT-BUSINESS-LOGIC.md](../../../PILOT-BUSINESS-LOGIC.md) v1.10 · **Backlog:** PT-N4
**v0.3** closes N4-b — the pilot now has a recorded stop — and adds §17, the two pieces of ČS's own
framework the Coach was asked about and could not answer: the Product Compass and the Service Blueprint.
<!-- /history -->
**Owner:** Česká spořitelna · **Written by:** Igor Tadić · **Read by:** 16 skills — written for `methodology-guidance`, and declared by every producing skill in the workflow

> **What this is.** The discovery method the Methodology Coach teaches: the opportunity solution tree,
> continuous discovery, what each of the seven stages is for, why it sits where it does, and what
> separates a good output at that stage from a poor one. **Taught in ČS's own vocabulary**, because the
> Coach explains the method the team is executing rather than a parallel one.
>
> **What this is not.** Not the agent — that is
> [methodology-coach.agent.md](../../../../.github/agents/methodology-coach.agent.md), and not the skill, which is PT-K10. Not a
> reproduction of any published work: **every claim here points at a source and carries none of its text.**
> And **not a standard the gates check against.** No gate reads this body. It is the only body in the
> pilot that teaches rather than constrains.
>
> **On the numbering.** §1 to §8 are the body's first sections and §9 to §16 follow them.
> **A section's number is its identity here**, and citations already recorded against §2, §5, §7 and §8
> resolve unchanged. That puts the body's own registers, the coverage bar and the open list, in the
> middle rather than at the end. That is the price of not breaking a citation, and it is worth paying.

---

## 1. Why this body exists, and the failure it prevents

**A model asked about a framework will produce something plausible and unattributable.** It will name the
levels, describe the practice, sound right, and cite nothing that resolves. **This project has already
made that mistake once** — an earlier draft wrote the canon while the document claimed to be citing it.
Nobody caught it by reading, because a fluent invention reads exactly like a faithful summary.

So the Coach answers from named sections of this document and from nothing else, and this document
answers from sources that exist and can be checked. **That is the whole mechanism.** A method claim
that cannot name a section here is returned unanswered, which is a worse experience and a true one.

**The second reason is narrower and sharper.** ČS runs its own discovery method, written down, and it
already names the opportunity solution tree as the instrument. A canon taught in a parallel vocabulary
would make the Coach a second opinion competing with the bank's own process. **Taught in the bank's
words, it is an explanation of what the team is already required to do.**

**What the credit to Teresa Torres rests on, and why it matters.** Everything attributed to ČS resolves to
a PDF in the corpus, and a credit to Torres resting on a book nobody here has opened would be the same shape
as the failure above wearing a citation. This body rests on **fifteen of her published articles, each read and each
listed in §6 with the address it was read at.** The book itself is still not held, so **a claim that
exists only in the book is not in this body**, and the Coach does not reach for it.

---

## 2. The tree, and it has four levels

**Outcome → Opportunity → Solution → Assumption test.** The structure comes from Teresa Torres's
continuous discovery practice (§6), and ČS adopts it directly: *Metodika Iniciativy* names the opportunity
solution tree as the instrument by which the whole of Initial Discovery is carried out, and maps the
levels onto its own Jira structure.

| Level | ČS's term | What it holds | Where it lives in Jira |
|---|---|---|---|
| **Outcome** | cíl / outcome | The change in customer behaviour the work is for, expressed as a measurable result rather than a thing to build. Linked upward to a bank Key Result or KPI | The initiative's parent link |
| **Opportunity** | opportunity | A customer need, pain or desire discovered in research. **Not a solution, and not a feature request** | Issue type `Opportunity` |
| **Solution** | solution | A way of addressing an opportunity. Several compete; one is chosen | `Epic` |
| **Assumption test** | experiment | The test of the riskiest belief behind a solution, run before committing to it | Below the epic, during Execution |

**The order is the argument, not a filing convention.** Opportunities are discovered before solutions are
generated, because a team that starts at the solution level has already decided what the problem is. And
an outcome stated as a customer behaviour, rather than as a delivery, is what makes the opportunity space
searchable at all: *reduce the time to a mortgage decision* admits many opportunities, *ship the new
mortgage screen* admits none.

**The tree is a shared picture before it is a document.** Its stated purpose is to put a team's combined
understanding somewhere everyone can see it, so that decisions are argued against a visible map rather
than against each other's recollection (§6, opportunity solution trees; benefits).

### 2.1 What the tree is for, stated as its author states it

Seven things it buys, and each is a reason to keep it rather than a feature of the drawing (§6, benefits).

1. **It holds business value and customer value in one frame**, so a team cannot quietly optimise one.
2. **It builds shared understanding**, because the picture is revisited and changed together.
3. **It makes continuous delivery possible**, by cutting a six-month lump into opportunities small enough
   to finish inside a sprint.
4. **It improves the decision itself**, by replacing *should we build this or not* with *which of these*.
5. **It speeds learning**, because a failed solution sends you back to a written-down belief about the
   customer rather than back to a blank sheet.
6. **Its shape tells you where to work next.** A thin opportunity space means you have not interviewed
   enough; a sprawling one means you have not chosen; an untested solution row means you have not run a
   test yet.
7. **It makes the reasoning showable**, so stakeholders can see what was considered and rejected instead
   of being asked to trust a conclusion.

### 2.2 One tree, one outcome

A tree serves **one outcome**. A team handed several prioritises them and draws a separate tree for each,
because a tree is the path to a result and two results are two paths. A single tree covering a whole
company is explicitly the wrong instrument; that is a different kind of diagram (§6, opportunity solution
trees).

---

## 3. Where this pilot sits in the bank's own lifecycle, and where it stops

ČS's initiative lifecycle runs **Idea → Initial Discovery → Ready for Execution → Execution →
Evaluation → Done**, with **Waiting** and **Rejected** as recorded off-ramps.

**This pilot is Initial Discovery, instrumented.** It starts from a stated outcome and ends with an
initiative document carrying what the bank's Definition of Ready requires. Stage 7's output is the
handoff to the bank's backlog, which is exactly where Initial Discovery ends and the Implementation
Authority review begins.

**So the departure from the framework is precise, and it is not that the pilot forgot experiments.**

| | |
|---|---|
| **The fourth level lives in Execution** | ČS runs Execution dual-track: continuous discovery proceeds in parallel with delivery, engineers test feasibility against real data and real system performance, and new opportunities and solutions may open mid-flight |
| **The pilot stops before Execution** | Its last artifact is a definition, handed over. Nothing it produces is evidence of a tested assumption |
| **What follows from that** | Everything from the expanded MVP onward is a **definition** artifact. The selected idea was chosen on two scores and a rationale, not on a tested assumption. The MVP option set is the nearest thing to an experiment in the whole workflow and **it is not one** — it diverges on paper and is chosen on paper |
| **The pilot's own vocabulary** | `outcome · opportunity · solution · artifact`. The fourth role was replaced, and the replacement is the tell: **continuous discovery's validation half is absent by construction** |

**Rules**
- **Say the omission plainly when asked.** The one thing whose job is to explain the method must not
  conceal what this instance of it omits.
- **Do not propose adding an experiment level.** That is a change to the pilot's contract and a
  stakeholder's decision, not advice from something that writes nothing.
- **Parked opportunities are not a substitute for a loop.** Retaining an unpromoted problem keeps it
  available; it does not test anything. The distinction matters when someone asks whether the pilot
  "does continuous discovery": it does the discovery half and not the validation half.
- **The lifecycle has an exit.** A run can be stopped at any stage by
  a named person, with a reason from ČS's own set — `low_value`, `small_impact`, `high_risk`,
  `out_of_boundary` — and its artifacts are retained. **Teach stopping as a legitimate outcome**, because
  the bank teaches it that way and is unusually direct about it. **What the pilot does not model is
  `Waiting`**: the bank distinguishes *not now* from *no*, and the pilot has only the second. Say which
  one the person is asking about.
- **The full list of departures is §15.** The missing fourth level is the largest and not the only one.

---

## 4. The seven stages

Each entry answers the three questions the coverage bar sets: what the stage is for, why it sits where it
does, and what separates a good output from a poor one. **None of them rules on an artifact.**

### 4.1 Brief · outcome

**For.** Establishing the outcome the run is about, who it concerns, and what is already known — before
any problem is written down. In ČS's terms this is the Idea state made explicit enough to enter Initial
Discovery: an outcome, a hypothesis, and the trio that owns it.

**Why here.** Everything downstream is searched against this. A run whose outcome is a delivery rather
than a customer behaviour will produce opportunities that are all features, and the error is unrecoverable
later because nothing downstream can see it.

**Good.** The outcome names a change in customer behaviour and could be measured. What the user could not
supply is marked unknown rather than filled in. **Poor.** The outcome names a thing to build; gaps are
quietly completed with plausible content.

**Deeper.** §9 carries the three kinds of measure a team confuses at this stage, the eight ways an outcome
is stated badly, and how an outcome sits inside an OKR, which is how ČS states its goals.

### 4.2 Problems · opportunity

**For.** Turning supplied material into standardised problem hypotheses, each carrying what supports it,
and then prioritising them. This is the opportunity level of the tree.

**Why here.** Opportunities are discovered before solutions are generated. Reversing the two is the single
most common failure the framework exists to prevent, and it is invisible afterwards: a solution-first run
produces a tidy tree in which every opportunity happens to be addressable by the thing the team already
wanted to build.

**Good.** Each hypothesis is a customer need, stated so that more than one solution could address it, and
carries its evidence and a trust tag derived from that evidence rather than asserted. **Poor.** A
hypothesis that names a feature; a confident hypothesis resting on one source that reads as several.

**Deeper.** §10 carries where opportunities come from and what makes one well formed; §11 carries how the
opportunity space is structured; §12 carries how one is chosen to work on.

### 4.3 Market · opportunity, evidenced

**For.** Establishing what the market already does about these problems, and where it does nothing.

**Why here.** After the problems and before the ideas. Before the problems, market research shapes what
you go looking for, and the opportunity space narrows to what competitors already occupy. After the ideas,
it becomes a justification exercise for a decision already taken.

**Good.** Every synthesis element traces to a researched participant, and **an absence is recorded as a
finding about the read**: a problem no participant the stage read answers is a strong signal about those
participants, stated with who was read, and not a claim about the whole market. **Poor.** A
landscape that describes the market rather than answering the run's problems; a recommendation, which is
stage 4's job and not this one's.

### 4.4 Ideas · solution

**For.** Generating several distinct ways to address the prioritised problems, and scoring them on two
axes that are never merged.

**Why here.** This is the first stage at which a solution is legitimate, and the tree's shape is the
reason: solutions are generated **against** opportunities, several per opportunity, so that the chosen one
is chosen from alternatives rather than defended after the fact.

**Good.** Each idea is a genuinely different combination of problems rather than a rephrasing of its
neighbour, every primary problem is covered by something, and a score that cannot be anchored to a defined
band is declared unscored rather than given a zero. **Poor.** Four variations of one idea; a number with
no band behind it, which looks like measurement and is not.

**Deeper.** §13 carries how many solutions to hold against one opportunity and why comparing beats
deciding yes or no.

> **Stop and read §15.3 before answering any question that compares this stage to the framework.**
> Everything above describes **what this pilot does**. It is not a description of the framework, and
> reading it as one produces a confidently wrong answer. **The framework generates solutions against one
> target opportunity; this stage generates them against a prioritised set.** Both are coherent. Someone
> who says the framework picks one opportunity is **right**, and telling them otherwise from this entry
> is a specific error this stage has made. §15.3, and the open item is N4-d.

### 4.5 MVP · solution, made concrete

**For.** Designing three whole ways to pilot the selected idea, which a person may add to, then expanding the one a person
chose.

**Why here.** Between choosing an idea and defining it. **This is the stage that looks most like an
experiment and is not one** — the options diverge, but they are compared on paper and chosen on paper. In
ČS's lifecycle the equivalent test happens after this point, inside Execution.

**Good.** Each option is a whole way to pilot the idea, not a phase or a subset of another, and none is
sequenced or preferred, because a person chooses immediately afterwards. **Poor.** Three options that are
really one option in three sizes; an option set that has already chosen.

### 4.6 PRD · artifact

**For.** Defining the selected option to the depth a delivery team can act on, and getting a named person
to agree it.

**Why here.** After the choice and before the handoff. The agreement is a separate act from the authoring,
by a different hand, which is why the document is produced with its agreement block present and empty.

**Good.** Every requirement traces back to something the run produced; the strategic alignment is stated
and checked; compliance obligations are designed into the requirements rather than listed beside them.
**Poor.** A document that reads complete and traces to nothing; a pre-signed agreement block.

### 4.7 Initiative · artifact

**For.** Expressing the agreed definition in the bank's own initiative form, so it can enter the backlog
and face the Implementation Authority.

**Why here.** Last, because it is a translation rather than a discovery step. Every fact in it comes from
the agreed PRD or is marked an assumption.

**Good.** Complete on its own terms against the bank's template, in Czech, free of implementation detail,
and carrying what the Definition of Ready asks for. **Poor.** An initiative carrying facts that appear
nowhere upstream; implementation decisions smuggled in as description.

---

## 5. The two disciplines the Coach holds

These are the two the Coach can hold against artifacts actually in front of it. Both are teaching
positions, never rulings.

**An opportunity is a customer need, never a solution.** The tell is that the statement names a thing to
build. *Advisers would use a self-service tool* is solution-shaped: it presumes the tool. The need beneath
it might be that advisers cannot answer a client's question without leaving the conversation, and that
need admits several solutions, of which a self-service tool is one. **Name the shape and the reason. Do
not call it wrong**, and do not rewrite it — that is the Hypothesis Designer's work and the Researcher's
decision at the gate.

**There is a test for it, and it is one question.** Can this be addressed in more than one way? If only
one approach exists, the statement is a solution wearing an opportunity's clothes (§6, opportunity
solution trees). The test is useful precisely because it does not require agreeing on what the customer
needs.

**Strategy lives in the opportunity space, not the solution space.** A team that treats idea selection as
the strategic decision has moved its strategy into the solution space without noticing. The run's
direction is set when the problem set is prioritised, and everything after that is execution against a
direction already chosen. **The Coach is the only thing positioned to say so**, because it is the only
thing that sees the whole run and rules on none of it. The framework puts it the same way: the choice of
which opportunity to pursue is where strategy actually gets made, and it accumulates from many such
choices rather than arriving as a plan (§6, prioritise opportunities).

---

## 6. Sources, and the rule about them

**A method is not owned; its expression is.** This canon encodes the practice and points at the source. It
carries no passage of anyone's text, and a claim that cannot name a source below does not belong here.

### 6.1 The bank's own method

| Source | What it supplies | How to cite it |
|---|---|---|
| **ČS, *Metodika Iniciativy*** — Market Intelligence corpus, `metodika-iniciativy`, pages 1–4 | The bank's initiative lifecycle, its adoption of the tree, the four verification areas, the Definition of Ready, the Implementation Authority gate | By title and page |

### 6.2 The framework, and what is actually held

**The book is named and not held.** *Continuous Discovery Habits* (Teresa Torres, 2021) is the origin of
the practice and is **not in this estate**. Nothing in this body rests on it. **A claim that exists only in
the book is not here, and the Coach does not supply one.**

**What is held is fifteen published articles**, read on 12 August 2026 at the addresses below. Every
framework claim in this canon traces to one of them. Cite by concept and by article; **never quote**.

| # | Article | What it supplies here |
|---|---|---|
| T1 | Opportunity Solution Trees: Visualize Your Discovery to Stay Aligned and Drive Outcomes · `producttalk.org/opportunity-solution-trees/` | The four levels, the nine-step build, the prerequisites, one tree per outcome, the more-than-one-way test, the iteration rhythm |
| T2 | Opportunity Solution Tree, definition and overview · `producttalk.org/glossary-discovery-opportunity-solution-tree/` | The level definitions in their shortest form; the tree as a device for making assumptions explicit |
| T3 | The Power of Opportunity Solution Trees: 7 Key Benefits Revealed · `producttalk.org/benefits-of-opportunity-solution-trees/` | The seven benefits in §2.1, and the shape-tells-you-where-to-work reading |
| T4 | Discovering Solutions: Quickly Determine Which Ideas Will Work · `producttalk.org/discovering-solutions/` | Testing assumptions rather than whole ideas; success criteria set before the test |
| T5 | Prioritize Opportunities, Not Solutions · `producttalk.org/prioritize-opportunities/` | The four assessment factors, row-by-row assessment, opportunities framed in the customer's voice, strategy as accumulated choices |
| T6 | Sourcing Opportunities: Unlocking the Power of Opportunity Mapping · `producttalk.org/sourcing-opportunities/` | Opportunities come from stories; what makes one well formed; garbage in, garbage out |
| T7 | Defining Product Outcomes: The 8 Most Common Mistakes · `producttalk.org/defining-product-outcomes/` | The eight mistakes in §9.2 |
| T8 | Evaluating Solutions: The 5 Types of Assumptions · `producttalk.org/five-types-of-assumptions/` | The five assumption types and the question each asks |
| T9 | Customer Interviews: How to Recruit, What to Ask, and How to Synthesize · `producttalk.org/customer-interviews/` | Story-based interviewing, what to avoid, recruiting, synthesis |
| T10 | Assumption Testing: Everything You Need to Know to Get Started · `producttalk.org/assumption-testing/` | The four test types, defining success in advance, what to record |
| T11 | How Compare and Contrast Decisions Lead to Better Product Outcomes · `producttalk.org/compare-and-contrast-decisions/` | Why comparing beats deciding yes or no; three to five options |
| T12 | The Interview Snapshot · `producttalk.org/2024/02/interview-snapshot/` | The snapshot's parts, and how snapshots roll up |
| T13 | 6 Guiding Principles for Effective Product Discovery · `producttalk.org/2018/08/effective-product-discovery/` | The six principles in §14.4 |
| T14 | Ask Teresa: What's the Difference Between OKRs and Outcomes? · `producttalk.org/okrs-vs-outcomes/` | §9.3, which is how ČS states its goals |
| T15 | Ask Teresa: Who's Responsible for What in the Product Trio? · `producttalk.org/2022/02/responsibility-in-a-product-trio/` | The trio and its shared accountability |

**On the extracted Czech.** The corpus text layer drops several diacritics, so the extraction is legible
and misspelled. **Read it for meaning; go to the source PDF for any wording that will be reproduced.** No
wording from it is reproduced here.

---

<!-- The coverage bar stays in the generated body on purpose: the held-out eval suite reads it to check that the sections it names are on disk, so fencing it here made the canon look incomplete. Whether a producer reads a section is not the only question — something else may. -->
## 7. Coverage bar

**Sixteen skills declare this body, and `methodology-guidance` is the one it was written for.** **The Coach reads
three further method bodies and every answer names the body it came from.** What follows is what **this**
body answers:

| Question | Where |
|---|---|
| What this stage is for | §4.1–§4.7 |
| Why it sits where it does | §4.1–§4.7, each *Why here* |
| What separates a good output here from a poor one | §4.1–§4.7, each *Good* and *Poor* |
| What the tree is, and that it has four levels | §2 |
| What the tree is for | §2.1 |
| Where this pilot departs from the framework, and why that is not an oversight | §3, §15 |
| Whether a statement is opportunity-shaped or solution-shaped, and the reason | §5 |
| What kind of measure an outcome should be | §9.1 |
| Why an outcome is badly stated | §9.2 |
| How an outcome relates to an OKR | §9.3 |
| Where opportunities come from | §10 |
| What makes an opportunity well formed | §10.4 |
| How the opportunity space is structured | §11 |
| What the shape of a tree says about the work | §11.2 |
| What must be true before a tree exists | §11.3 |
| How opportunities are assessed and one is chosen | §12 |
| How many solutions to hold, and why | §13.1–§13.2 |
| What kinds of assumption underlie a solution, and which to test first | §13.3–§13.4 |
| Who does discovery and at what rhythm | §14.1–§14.2 |
| The failure modes, and how to recognise one | §14.3 |
| Which source any claim rests on | §6 |
| What the Product Compass is, and where the pilot's product goal lives instead | §17.1 |
| Where a service blueprint fits, and whether the pilot builds one | §17.2 |
| Whether stopping a run is legitimate, and what the bank's `Waiting` is | §3, §8 |
| How to answer when the canon does not carry it | §16 |

**Assessment: met for what this body owns, with two limits and one correction.** Every question above
resolves to a named section. **The gap is that
this body cannot say what the bank's Implementation Authority actually asks**, because *Metodika
Iniciativy* names the panel and points at a separate document the corpus does not contain (N4-a). A
question about what happens to an initiative after stage 7 is returned unanswered, which is correct and
unsatisfying.

**A second limit, and it is not a gap.** The book is not held (§6.2), so a question whose answer exists
only there is returned unanswered for the same reason. Fifteen articles is a wide base and it is not the
whole of the practice, and the Coach says which it is answering from.

**The correction, and it is this body's and not the Coach's.** The sentence above the table claimed the
Coach could answer without reaching outside this document. It could not, and the list of what was missing
is not short: why a person cannot simply state what they want, what makes a problem's severity sizeable,
when discovery stops, what an MVP is a bet on, what a capability list fails to settle, and how a trust tag
is derived rather than asserted. **This body names a trust tag three times and derives it nowhere.** Every
one of those is answered in a body the build already had, so the Coach was refusing questions its own
repository could answer.

**They were not merged into this body, on purpose.** `rule-echoes` matches an exact clause, so it holds a
one-sentence rule and not eight sections, and an absorbed passage would be a second copy with no staleness
detector on it. The Coach reads
[discovery-craft](./discovery-craft.md), [evidence-standards](./evidence-standards.md) and
[opportunity-framing](./opportunity-framing.md) beside this one instead. **Where this body and one of those touch,
this body wins** — `discovery-craft` §11 says so of itself and lists the overlaps. The trust arithmetic is
the exception and runs the other way.

---

## 8. Open

| # | Question | Effect |
|---|---|---|
| **N4-a** | **What the Implementation Authority panel asks.** *Metodika Iniciativy* makes answering it mandatory at the end of Initial Discovery and links to a document the corpus does not carry. Since the pilot's stage 7 hands over exactly at that boundary, the Coach can describe where the initiative goes and not what it will be asked | A question about the gate immediately after the pilot's last stage is returned unanswered. **Does not affect any of the seven stage entries** |
| ~~**N4-b**~~ | **Closed, and more fully than the recommendation asked.** The recommendation was to carry stopping as method only. It became workflow as well: `abandoned` had sat in the run vocabulary with no writer and no reader, and now has both, with ČS's four stop reasons and C78 on the record. **The residue is `Waiting`**, which stays unmodelled and is named as a limitation in §3 rather than collapsed into stopping | — |
| **N4-c** | **The `PT-N` backlog numbering is contested** (Q-p): the Compliance Guidelines were tagged PT-N3, which is the Competitive Analysis Standards. This body takes **PT-N4** as first-free. **Recommendation: fix the series by register order and record the rule**, so the next four bodies do not each make their own choice | Two bodies could claim one identifier, and a backlog reference would resolve to the wrong document |
| **N4-d** | **The pilot generates ideas against a prioritised set of problems; the framework generates them against one target opportunity** (§15.3). Both are defensible and they are not the same practice. **This is a contract question, not a canon question** — the Coach names the difference and proposes no change | Until it is decided, the Coach explains the pilot's shape and the framework's shape and says which is which |
| **N4-e** | **The book is not held** (§6.2). Fifteen articles is a wide base and not the whole practice. **Recommendation: acquire *Continuous Discovery Habits* and record what it adds**, rather than closing the gap by inference | A question answerable only from the book is returned unanswered, which is correct and avoidable |

---

## 9. Outcomes, and the three things teams call one

### 9.1 The three kinds of measure, and which one a team can act on

A team is usually given the wrong one, and the tree cannot help until this is fixed (T1, T7).

| Kind | What it measures | Why it is the wrong root, or the right one |
|---|---|---|
| **Business outcome** | The health of the business, usually money: revenue, new customers, retention | **Too far away.** Very few product teams move a financial number directly, so a team given one cannot tell whether its work is working |
| **Product outcome** | A customer behaviour in the product, or a customer's sentiment about it | **The right root.** It is within the team's reach, and it is a leading indicator of the business outcome behind it |
| **Traction metric** | Adoption of a single feature | **Too narrow.** It presumes the feature is the answer, which is the decision discovery is supposed to make |

**The test for a traction metric is one question:** could a customer be happy and never use this feature?
If yes, then driving its adoption is pushing a happy customer toward something they do not want, and it
is not an outcome (T7).

**The chain a team should be able to state.** A product outcome sits under a business outcome and leads
it. If nobody can say which business outcome the product outcome feeds, the work is unanchored, and that
is a gap in the brief rather than a gap in the tree (T7, mistake 2).

### 9.2 The eight ways an outcome is stated badly

Each is a real failure with a named remedy (T7). The first four are the ones this pilot's stage 1 meets.

| # | The mistake | Why it fails | Instead |
|---|---|---|---|
| 1 | **An output dressed as an outcome** — *launch the Android app* | It is a yes or no event. Nothing about it says whether anything changed for a customer | State the behaviour the launch is supposed to change |
| 2 | **Not connected to business value** | The team can hit it and nobody can say what it bought | Name the business outcome it leads |
| 3 | **Outside the team's control** — *grow revenue* | The team cannot move it directly, so it cannot learn from it | Translate down into a product outcome the team touches |
| 4 | **A traction metric** | It presumes the feature (§9.1) | Choose a measure that spans more than one way of getting value |
| 5 | **Too many cross-team dependencies** | Progress depends on teams with other priorities | Fit the outcome inside one team, or align several around one |
| 6 | **Measuring the action, not the value** — applications sent rather than jobs found | The action is easy to count and is not what the customer came for | Measure the value, imperfectly at first, and improve the measure |
| 7 | **Sentiment with no behaviour attached** — a satisfaction score alone | Too broad to steer by; it says something moved and not what to do | Pair it with a behaviour |
| 8 | **No accountability model** | Nobody agreed what happens when the number does not move | Agree in advance that the response is learning, not blame |

### 9.3 Outcomes and OKRs, which is how ČS states its goals

**An OKR is a format for expressing an outcome, not a different thing** (T14). The objective is the
qualitative half and the key results are the measurable half. An OKR can carry a business outcome or a
product outcome, and which one it carries is the question that matters.

**So the order of work is: decide the outcome, then format it.** A team that starts from the OKR template
tends to fill it with what is easy to measure. The harder and more useful question is which outcome is
worth pursuing, and the format follows.

**Why this matters here.** ČS carries bank-wide objectives with named owners and quantified key results,
and the pilot scores strategic alignment against them. **The alignment question is therefore an
outcome question**: does this run's outcome lead one of the bank's, and by what mechanism.

---

## 10. Where opportunities come from

### 10.1 Story-based interviewing

**Opportunities come from stories about specific past behaviour, and from nothing else** (T6, T9). The
reason is a property of people rather than a preference about method: asked what they generally do,
people report the version of themselves they would like to be. Asked what they did the last time, they
describe what happened.

- **Ask for the last time, not the usual case.** *Tell me about the last time you…* rather than *what do
  you normally do when…* (T9).
- **Excavate.** A first answer is short. The interviewer's work is helping the person rebuild the
  sequence, moment by moment, until the detail arrives. This is a skill and it improves with practice (T9).
- **Do not ask what they would want, or what they would do in future.** Predictions about oneself are
  unreliable in a specific direction, which is why the practice avoids them (T9).
- **A usability test is not an interview.** It examines a solution; an interview discovers opportunities
  (T9).
- **Recruit at the moment of the behaviour where possible** — inside the product, through customer-facing
  colleagues, or through a standing group of willing customers. Ask for a short, specific, clearly framed
  conversation rather than a vague hour (T9).

### 10.2 The interview snapshot

**One page per interview, made every time** (T12). Its parts each do a job:

| Part | Why it is there |
|---|---|
| Name, photo, a few facts | Makes the person recallable and lets findings be grouped by segment later |
| A memorable quote | Brings the whole story back months later, and carries the emotion a summary loses |
| The opportunities | The needs, pains and desires that surfaced in the story. This is what the tree is built from |
| Insights | Things worth knowing that are not yet actionable |
| An experience map | The story drawn as a sequence, which is where synthesis actually happens |

**Share the snapshot, not the transcript** (T12). A transcript is unread; a snapshot is looked at.

### 10.3 The experience map

An individual experience map is one person's story drawn as a sequence of moments. **The comprehensive
experience map is the amalgamation of many** (T12), and it is the thing that makes the opportunity space
structurable, because moments are what opportunities hang from (§11.1).

### 10.4 What makes an opportunity well formed

Four properties, and a statement missing them is not yet usable (T6).

- **Specific**, not a category. *I could not find anything to watch* is a category; *I could not tell
  whether I would like this film* is a specific need.
- **Bounded in a moment.** It happened at a point in the experience, which is what lets it hang from that
  moment on the map.
- **Carrying its context.** The circumstances are part of the need.
- **Attached to a customer**, so it can be sized and segmented later.

**Phrase it in the customer's voice, not the business's** (T5). *I cannot tell what this will cost me* is
an opportunity. *We want customers to use the calculator* is a business wish with an opportunity's
formatting.

**And the shape test from §5 still applies:** if only one thing could address it, it is a solution.

---

## 11. Structuring the opportunity space

### 11.1 The four steps

Synthesis is messy and it is not unstructured (T1, T6).

1. **Draw the comprehensive experience map** from every story collected.
2. **Turn the moments of that map into the top-level opportunities.** The structure comes from the
   customer's experience, not from the team's org chart or the product's menu.
3. **Group each individual opportunity under the moment it belongs to.**
4. **Structure inside each branch**, establishing which opportunities are parents, which are children and
   which are siblings.

**Down the tree, opportunities get smaller.** A project-sized opportunity at the top decomposes into ones
small enough to address inside a sprint, which is what makes continuous delivery possible rather than
aspirational (T1, T3).

**There is no single correct grouping.** More than one structure is defensible. The value is in being
forced to decide, because deciding exposes what the team does not know (T5).

### 11.2 What the shape of the tree tells you

The drawing is also a diagnostic (T3).

| Shape | What it means | What to do |
|---|---|---|
| **Thin opportunity space** | Not enough interviews behind it | Interview |
| **Sprawling opportunity space** | No choice has been made | Assess and choose a target (§12) |
| **Solutions with nothing under them** | Assumptions not surfaced or not tested | Identify assumptions and test (§13) |
| **One opportunity with one solution** | The decision has been framed as yes or no | Generate alternatives (§13.2) |

### 11.3 The prerequisites, and what happens without them

Three things must be true before a tree is worth drawing (T1).

1. **A theory of who the customer is** and what value they are being offered.
2. **A defined outcome** — one, and of the right kind (§9.1).
3. **Three or four story-based interviews already done.**

**Without them, teams struggle badly**, and the failure is specific: opportunities get generated from what
the team already believes. That produces a tidy tree built out of assumptions, which is worse than no tree
because it looks like evidence (T1, T6).

**Do not wait for a good first draft.** The first opportunity space is expected to be poor. Choose a target
quickly, and expect the structure to settle around the sixth to eighth interview. Revisit the space every
three or four interviews, which is roughly monthly at one interview a week (T1).

---

## 12. Choosing what to work on

### 12.1 Assessing opportunities, and the four factors

Four things are weighed, and none of them is a formula (T5).

| Factor | The question |
|---|---|
| **Sizing** | How many customers does it affect, and how often? |
| **Market** | What does addressing it do to our position against competitors? |
| **Company** | How well does it fit the vision, the mission and the strategic objectives? |
| **Customer** | How much does it matter to the customer? |

**Resist turning these into a score that decides.** They inform a subjective decision that a person owns
and may get wrong (T5). This is the same position the pilot takes with its own scores: they inform,
they decide nothing.

### 12.2 Row by row, not whole-tree

**Do not assess every opportunity on the tree.** Assess the top row only. Once the leading top-level
opportunity is chosen, ignore the other branches entirely and assess only that opportunity's children.
Repeat down the branch (T5, T1).

**The reason is that comparing unlike things is unreliable.** Opportunities at different levels and in
different branches are not comparable, and a ranked list of all of them is a false precision. Siblings
are comparable, which is why the assessment happens row by row.

### 12.3 One target opportunity, not a ranked list

**The output of assessment is a single target opportunity**, and solutions are then generated for that
one alone (T5, T1). Working one small opportunity at a time is what makes a genuine comparison of
solutions possible.

**It is a reversible decision.** Choosing a target is a door you can walk back through: if the solutions
against it disappoint, move to another opportunity. Treating it as irreversible is what makes teams
over-analyse the choice (T5).

**Strategy is the accumulation of these choices**, not a document that precedes them (T5). This is the
same claim as §5's second discipline, from the other end.

### 12.4 Effort is not a property of an opportunity

**Do not bring effort into the assessment of opportunities** (T1). Effort belongs to solutions, and a
solution has not been chosen yet. Weighing effort at the opportunity level smuggles an unstated solution
into the decision, and it is usually the obvious one.

---

## 13. Solutions, and the assumptions under them

### 13.1 Three to five, against one opportunity

**Generate widely for the target opportunity, then narrow to three to five to explore properly** (T11,
T1). Fewer than three does not create a comparison. Many more than five spreads the work too thin to
learn anything from any of them.

**Pair a solution with one opportunity, not several.** A solution attached to several opportunities
becomes a project, and the point of the tree was to avoid projects (T1).

### 13.2 Comparing beats deciding yes or no

**A single option forces the question *should we build this*, which people answer badly.** Several options
force *which of these*, which people answer well. Goodness is easier to judge as a relative property than
an absolute one (T11).

**A single option also invites falling in love with the first idea**, and first ideas are rarely the good
ones. Generating more ideas is what produces better ideas (T11).

**This is why the pilot's MVP stage holds whole options and forbids sequencing them** (§4.5).
It is the framework's compare-and-contrast shape, without the tests that would normally decide it.

### 13.3 The five kinds of assumption

Every solution rests on beliefs. Five kinds, each with its own question (T8).

| Kind | The question it asks |
|---|---|
| **Desirability** | Why do we believe customers want this, and will do their part to get value from it? |
| **Viability** | Why do we believe this is good for the business? |
| **Feasibility** | Why do we believe we can build it? Technical, legal, compliance, security and organisational |
| **Usability** | Why do we believe a customer can find it, understand it and complete it? |
| **Ethical** | Could this cause harm? |

**Two ways to surface them.** Story-map the solution and ask what has to be true at each step; and walk
the lines of your own tree, asking why this solution would address that opportunity in a way that moves
that outcome (T8).

**ČS asks four of these five under its own names** — desirability, feasibility, viability, and legal and
ethical sustainability — which folds the fifth into the fourth. Usability sits inside desirability in the
bank's phrasing. **When teaching at ČS, use the bank's four and say where the fifth went.**

### 13.4 Testing them

**Test the assumption, not the whole idea** (T4). A whole idea fails for reasons you cannot separate.

- **Start with desirability.** If someone essential is not willing to do their part, nothing else
  matters (T8).
- **Prioritise by risk and by evidence:** what is both critical to success and weakly supported goes
  first (T10).
- **Four kinds of test** — a prototype that simulates the moment, a one-question survey about behaviour,
  mining data you already hold, and an engineering spike for a feasibility question (T10).
- **Set the bar before you run it.** Decide what result would count as success in advance. Deciding
  afterwards is how a team reads its own hopes into the numbers (T4, T10).
- **Record the assumption, who was tested, the test, the bar, the result and what was done about it**
  (T10).

**None of this happens inside the pilot** (§3). It is taught because the team will meet it in Execution,
and because knowing what was skipped is what keeps the pilot's output honestly labelled.

---

## 14. How the practice runs

### 14.1 The trio

**A product manager, a designer and an engineer, doing discovery together** (T15). Each leads where their
expertise is strongest: engineers on feasibility, designers on usability, the product manager on
viability.

**But all three are accountable for all five risks.** Leading is not owning. The point of shared
accountability is that it prevents the argument between three specialists defending three positions, and
replaces it with one group answering one question (T15).

**ČS uses the same word — trio — and the pilot's brief records who it is.**

### 14.2 The weekly rhythm

**At least one customer interview a week, attended by the trio** (T9, and the practice's own definition).
The point is not the number. It is that discovery stops being a phase that happens before building and
becomes something running continuously alongside it.

**Small and often beats large and rare.** A weekly cadence means a disproven opportunity is replaced
within days rather than at the end of a research project.

**This is the largest thing the pilot does not do.** The pilot runs on material supplied at the start of
a run (§15.1). It is a bounded discovery, not a continuous one, and the Coach says so rather than letting
*discovery* carry the continuous meaning by association.

### 14.3 The failure modes, and how to recognise one

Each is common, each is named in the sources, and each has a tell (T1, T5, T6, T7, T11).

| Failure | The tell |
|---|---|
| **Opportunities invented rather than discovered** | Nobody can name the interview an opportunity came from |
| **A tree with no outcome** | The team is mapping because mapping is the practice, not to reach a result |
| **The outcome is an output** | It can be finished. Outcomes move; outputs complete |
| **Skipping the structure step** | A flat list of opportunities with a tree drawn around it |
| **Prioritising a whole list at once** | Unlike things ranked against each other, usually with a scoring formula |
| **Effort weighed at the opportunity level** | The cheap opportunity wins and nobody said which solution they were pricing |
| **One solution per opportunity** | Every decision arrives as yes or no |
| **Ideas generated across many opportunities at once** | Many first ideas, none explored, and a shallow result |
| **Testing whole ideas instead of assumptions** | A test that failed and nobody can say which belief was wrong |
| **Success defined after the result** | The bar and the outcome were decided in the same conversation |
| **A tree for the whole company** | It stopped fitting on a wall and stopped helping anybody |

### 14.4 The six principles underneath all of it

Compressed, from the framework's own summary (T13).

1. **Start from empathy** for a specific target customer, and ignore the ones you are not for.
2. **Keep exploring the problem space** rather than treating it as a phase that closes.
3. **Map to get clear.** Draw individually first, then together, because a shared picture aligns people
   that discussion does not.
4. **Use theory as inspiration**, distinguishing durable truths about people from passing technology.
5. **Co-create with customers**, involving them in making rather than only in reacting.
6. **Surface and test assumptions**, rather than building the whole idea to find out.

**And the one about working together:** divide the work, come together for the decisions (T13).

---

## 15. What this pilot does with the practice, and where it cannot follow

**This is the section a person actually needs**, because the pilot is a real instrument with real
departures, and a Coach that teaches the framework without mapping it produces advice nobody can act on.
**Name the departure, name why, and do not propose changing the contract** (§3).

### 15.1 The pilot discovers from supplied material, not from weekly interviews

The framework builds the opportunity space from stories the trio collects, weekly, forever (§10.1, §14.2).
**The pilot's stage 2 works from material supplied at the start of a run** — research notes, transcripts,
tickets — reduced behind a quarantine boundary into observations, each carrying a reference to its source.

**What survives.** The discipline that an opportunity must rest on evidence rather than on belief, and the
tell that catches its absence: the pilot derives a trust tag from what the evidence actually is, rather
than letting a confident hypothesis assert its own standing.

**What does not.** The cadence, and the ability to go back and ask. **A pilot run cannot interview
anybody**, so an opportunity that turns out to be thin cannot be enriched, only marked.

**So the practical advice differs.** In the framework, a thin opportunity space means interview more. In
the pilot, it means the supplied material was thin, and the honest response is to say so rather than to
fill the space by inference.

### 15.2 The pilot has one opportunity level, not a structured space

The framework structures the opportunity space into moments and branches, and assesses row by row (§11,
§12.2). **The pilot carries a flat set of problem hypotheses with a prioritisation over them.**

**What survives.** Prioritising problems rather than solutions, and the rule that scores inform rather
than decide (§12.1).

**What does not.** The parent-child structure, and with it the row-by-row assessment that makes comparison
reliable. **A pilot prioritisation compares things the framework would say are not comparable.**

**How the Coach handles it.** Explain the row-by-row reason — that siblings compare and strangers do not —
and let the person decide what to make of it. Do not restructure their problem set; that is the Hypothesis
Designer's work and the Researcher's decision at the gate.

### 15.3 The pilot generates ideas against a set of problems, not one target

**This is the sharpest difference, and it is not a defect in either.** The framework chooses one target
opportunity and generates three to five solutions against that one, precisely to avoid the shallow result
that comes from spreading ideas across many opportunities (§12.3, §13.1). **The pilot's stage 4 generates
ideas against the whole prioritised set, and a good idea there is one that combines problems well.**

**Both are coherent.** The framework optimises for depth on one need and a genuine comparison. The pilot
optimises for a single initiative that answers a set of related problems, which is the unit the bank's
backlog actually accepts.

**What the Coach says.** Name both shapes, say which one the person is standing in, and name the risk the
framework is guarding against so they can watch for it: several ideas that are each somebody's first idea,
none explored in depth. **Recorded as N4-d. It is a contract question, and the Coach proposes no change.**

### 15.4 The pilot compares options on paper and never tests them

Covered in §3 and §13.2. **The MVP option set is the compare-and-contrast shape without the assumption
tests**, so it gets the benefit of framing the decision as *which of these* and none of the benefit of
evidence. The choice is made by a person at a gate, on a rationale.

### 15.5 What the pilot adds that the framework does not carry

Not everything is a subtraction, and a Coach that only names losses misleads.

- **A derived trust tag on every problem**, computed from what the evidence is rather than asserted.
- **A market stage between problems and ideas**, with an absence recorded as a finding.
- **A gate on every stage**, with the decision recorded against a named person.
- **A stated reduction** whenever the run proceeded without something it wanted, carried in the artifact
  rather than in someone's memory.

**These are instruments for a bounded, auditable run**, which is a different job from a continuous
practice. Say that plainly rather than grading one against the other.

---

## 16. How to answer

**These are the Coach's habits, not new method.** They exist because the rules in §1 are easy to state and
easy to drift from under a direct question.

### 16.1 The shape of a good answer

1. **Answer the question**, in the bank's vocabulary.
2. **Name the section** it came from.
3. **Say where the pilot stands** relative to it, if the person is in a run (§15).
4. **Stop.** Do not append advice about their artifact.

### 16.2 What to do when the canon does not carry it

**Say so, name what is missing, and point at where the answer lives if you know.** Do not fill the gap
from recollection and do not soften the refusal into a hedge, because a hedged answer is read as an
answer. On the third attempt at one question the canon cannot answer, say so and stop rather than grind.

**The two standing gaps are §7's:** what the Implementation Authority asks (N4-a), and anything that
exists only in the book (§6.2, N4-e).

### 16.3 The line the Coach does not cross

**Explaining the method is coaching. Ruling on an artifact is a gate's job.** *This reads as a solution
rather than a need, and here is why the framework separates them* is coaching. *This hypothesis should not
have been promoted* is the Researcher's decision at G2.

**What holds the line is that the Coach writes nothing.** Only a person can act on what it says, and that
act is recorded against that person at a gate. That protects against propagation. **It does not protect
against deference** — a Researcher who stops exercising the judgement the gate exists to capture is a
failure no check can see, and the Coach should be direct about that if asked.

---

## 17. Two pieces of the bank's own framework the Coach must not invent

**Both are ČS's, both are proprietary, and both were asked about before this section existed.** They sit
here rather than in §2 because they are not part of the tree: they are what surrounds it at ČS.

### 17.1 The Product Compass

**The Compass is the bank's single source of truth for a product's direction**, created at a Product
Definition Workshop and then kept as a living document. It carries two levels: a management summary
(alignment with the bank's strategy, the North Star and its KPIs, current focus, strategic decisions) and
a team level (positioning, customer needs, solutions, strategic principles, the outcome roadmap, the
performance dashboard).

**Its place in the order is the thing to teach.** The Compass says **why and what**. The opportunity
solution tree finds **which solution**. The Way of Working says **how** it reaches production. Measured
impact returns to the Compass through the performance dashboard, which is what closes the loop.

**It is mandatory at ČS, not a nice-to-have**, and it is where a team's product goal lives.

> **The pilot has no Compass, and this is the departure to name.** A run's product goal is supplied in its
> own brief instead, with a written link to a bank key result (Strategy Basis §3). **So the level exists in
> the bank's method and the pilot does not inherit one** — it asks for it. A person whose team has a
> Compass should take the product goal from it rather than invent one at stage 1.

### 17.2 The Service Blueprint

**A service blueprint is one of the places opportunities come from.** It lays a service out in bands — what
the customer does and needs, the frontstage they see, the backstage the team runs, and the supporting
systems and processes underneath — and **the points where a customer hits friction in that map become
opportunities for the tree**.

**Why it earns a place beside story-based interviewing** (§10.1): it makes the backstage visible. An
interview surfaces what the customer experienced; a blueprint shows the internal step that caused it. ČS
names it as a designer's instrument specifically, and as the bridge between empathy and the decisions the
tree records.

**The pilot does not build one.** Stage 2 works from supplied material (§15.1), and a blueprint would be
one more kind of material a user could supply rather than something the workflow produces.

### 17.3 The trio, in ČS's own phrasing

§14.1 carries the trio from the framework. **ČS states it more sharply and the phrasing is worth using:
three perspectives, not three chairs.** Business, customer and technical feasibility must each be present
at a decision. There may be several trios, or one person temporarily holding more than one perspective.
**What matters is that all three are in the room for the decision, not how many people are.**
