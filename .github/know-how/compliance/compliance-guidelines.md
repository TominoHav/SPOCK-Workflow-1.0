<!-- GENERATED from specifications/definitions/know-how/compliance/compliance-guidelines.md. Do not edit this copy.
     Regenerate: node .github/scripts/know-how.mjs --write
     Know-how is read by skills, never written by them. It changes through a human-owned process,
     outside any run (PD90). -->

# Compliance Guidelines

**Version:** 0.3 · **Date:** 30 September 2026 · **First version:** 27 August 2026 · **Status:** For review
**Owner:** Česká spořitelna · **Written by:** Igor Tadić · **Read by:** `ideation` · `mvp-option-design` · `mvp-expansion` · `prd`

> **What this is.** The mechanism. How a description is screened against the four regulatory areas, what
> the screen may and may not say, how a complexity value is formed, when an escalation flag fires, and
> what a producer must do with the result. **It carries no area's content.** The four areas are one file
> each in this folder, and this document is what reads them.
>
> **What this is not.** Not legal advice, not a compliance opinion, and not an assessment. **The workflow
> assembles and does not assess** (§9). It reports which triggers a description fired and what the run
> bound to each. It forms no view about whether a regulation applies.
>
> **One card is the bank's and three were written here.** The Compliance area is transcribed from a card ČS
> supplied on 26 August 2026. GDPR, Legal and ICT security were written here from public EU and Czech law
> because no ČS card exists for them. §10 says where that is recorded.

---

## 1. The four areas

| | Area | File | Source |
|---|---|---|---|
| **A1** | Compliance, conduct and product regulation | [area-compliance.md](../../../specifications/definitions/know-how/compliance/area-compliance.md) | **ČS card**, supplied 26 August 2026, status unconfirmed |
| **A2** | GDPR and privacy | [area-gdpr.md](../../../specifications/definitions/know-how/compliance/area-gdpr.md) | **Ours.** Written from public sources, no ČS card exists |
| **A3** | Legal and contracts | [area-legal.md](../../../specifications/definitions/know-how/compliance/area-legal.md) | **Ours.** Written from public sources, no ČS card exists |
| **A4** | ICT and security | [area-ict-security.md](../../../specifications/definitions/know-how/compliance/area-ict-security.md) | **Ours.** Written from public sources, no ČS card exists |

**Two areas are deliberately outside and are routed rather than screened.** AI regulation, and outsourcing
and DORA's third-party chapter where the dependency is somebody else's. Both fire escalation triggers that
name a specialist, and the routing is the whole of what this workflow does about them. An output that
fires one says so in the words §8.4 gives it.

**Scheme rules are regulation to nobody and are in none of the four.** CERTIS, the EPC rulebook, ISO 20022
and card scheme agreements belong to the Banking Constraints body, **which is retired and will not be
written**. That is settled, not pending: `constraint_basis: none_stated`
is the declared marker and it is the whole of what any document should say about it. **Do not narrate the
absence in prose** — a
phrase such as *declared and not yet written*, copied into the document ČS receives, tells a reader
somebody is coming back to it.
Nothing here covers them, and a screen that returns clean has said nothing about any of them.

**Each area is self-contained.** A card added or amended changes no statement inside another area's file,
which is what lets the three unconfirmed ones be replaced one at a time when ČS supplies its own.

---

## 2. What each area file carries

Twelve fields, the format the ČS Compliance card already used. **The format is the contract.** An area
supplying less than this cannot be screened, and an area supplying more is carrying content nothing reads.

| Field | What it is for |
|---|---|
| Regulatory area | The name an output uses |
| Relevant in discovery | Whether screening is mandatory for this area |
| Sub-domains | The units the screen reports on |
| Primary applicability triggers | The circumstances that put a sub-domain in play. **The screen is built from this row** |
| Required discovery inputs | What a description must state before the screen can resolve |
| Standard reviewer questions | What a person asks at a decision point |
| Named checks | The specific examinations the area expects |
| Expected evidence and artefacts | What the record reports as produced, missing, or somebody else's |
| Discovery brief output | What this area contributes to the record leaving discovery |
| Escalation triggers | The conditions that route to a named specialist |
| Primary legal sources | Named regimes and citations |
| Related regulatory areas | The edge of this card, stated |

**An area file also carries product touchpoints**, which the ČS format does not have. A touchpoint names
the thing a product does that engages a sub-domain, in the vocabulary of a product person rather than a
lawyer. It is the row a producer actually reads, and §11 says why it is there.

---

## 3. The six moments

Compliance work attaches to what has become knowable, not to a stage number.

| | Moment | What is true by then | Where it lands today |
|---|---|---|---|
| **M1** | Framing | The initiative is described. Nothing has been chosen | Stage 1, the brief |
| **M2** | Options exist | Candidate directions have been generated | Stage 4.1, ideation |
| **M3** | Options compared | The options are evaluated and one is chosen | Stage 4.3, idea scoring |
| **M4** | Scoped | The chosen direction is cut to something buildable | Stage 5, the MVP |
| **M5** | Specified | Requirements are written against it | Stage 6, the PRD |
| **M6** | Handed over | The delivery document leaves discovery | Stage 7, the initiative |

**M1 has no home in this build and it is the widest gap here.** No stage-1 skill declares this body, so
the required inputs of §5 are not collected when they first become knowable. Of the Compliance area's
seventeen inputs alone, three have a home in today's brief and fourteen do not. The consequence is
mechanical: a screen run at M2 against a description that never held what it screens returns *cannot
determine* on most of it, correctly, and the gap costs a producer time rather than passing quietly.

---

## 4. The screen

### 4.1 What it does

**The screen evaluates the description against every area's applicability triggers.** Each trigger that
fires names the sub-domains it puts in play. Every sub-domain placed in play resolves to at least one
fired trigger, and every fired trigger resolves to at least one sub-domain.

**Each sub-domain returns exactly one of three states.**

- **In play** — a trigger fired and named it
- **Not triggered by this description** — no trigger fired
- **Cannot determine** — a trigger may or may not have fired, and the input needed to settle it is absent

No sub-domain is left blank. No fourth state exists.

### 4.2 Two phrases that are refused

**Never write "not applicable".** The middle state is a statement about the description, never about the
regulation. Write what the description did not contain: *the description names no pricing or fee change,
so S4 was not triggered*. **"Not applicable" is a compliance judgement and this workflow does not make
them.**

**Never let "cannot determine" become "not triggered".** They look alike on a page and they are opposite
facts. One says the description was examined and nothing fired. The other says the description could not
be examined. A screen carrying no *cannot determine* entries has to be one where every input each
sub-domain depends on was either supplied or evaluated as irrelevant. **A screen that resolved everything
from an incomplete description is a defect, not a clean run.**

### 4.3 Input gating

**Each sub-domain declares the inputs it needs, and an absent input forces *cannot determine* on every
sub-domain that depends on it.** Every *cannot determine* names the specific input that was missing, so a
reader knows what to go and get rather than that something was unclear.

### 4.4 Two levels

**The screen runs at M2 against each option separately.** Compliance is answered per solution, and no screen
runs against the initiative as a whole.

**The per-option screen is what makes the difficulty side of the comparison discriminating.** If every
option inherits an identical set, the value in §6 is the same for all of them and contributes nothing to
the comparison it exists to serve. A payment-credential product and a notification change carry different
regulatory reach, and only the option-level screen sees it.

### 4.5 A person accepts it

**No value, description or record is produced from an unaccepted screen.** The accepted screen carries a
named person and a date.

---

## 5. Required inputs

Each area declares the inputs its sub-domains depend on. **An input not supplied is marked unknown with a
reason. None is silently absent.**

The union across the four areas is collected at M1. Where an area's input duplicates another's, it is
collected once and read by both.

**The highest-value single input is product type**, which gates five of the Compliance area's thirteen
sub-domains and four of those five open a separate approval track. **The second is whether personal data
is processed and on what basis**, which gates most of the GDPR area.

**Both have a home.** The union is forty-seven facts across the sixty-one card rows,
declared in [screening-inputs.md](../../../specifications/definitions/know-how/compliance/screening-inputs.md), collected by `brief-creation` at framing and
carried on the brief in `screening_inputs[]`. A screen resolves a *cannot determine* against that set and
names the input by its id.

---

## 6. The complexity value

### 6.1 What it measures

**It measures complexity, meaning the work the regulation adds. It does not measure risk.** Complexity is
how many areas fire, how deep the review goes, whether specialist sign-off opens, and what evidence has to
be produced. Risk is the chance and the cost of being wrong, and it is carried by the escalation flag in
§7.

The value sits on the difficulty side of an option comparison, and difficulty is cost to deliver. **Mixing
the two produces a number that answers neither question.**

### 6.2 The four levels

One value per option, computed across all four areas.

| Level | Value | Definition |
|---|---|---|
| **1 · Minimal** | **10** | No area in play. Nothing any trigger list names is changed |
| **2 · Contained** | **20** | One area in play, no mandatory client-facing document or artefact required, no escalation trigger fired |
| **3 · Substantial** | **30** | Two areas in play, **or** any mandatory client-facing document or artefact required, **or** any escalation trigger fired |
| **4 · Heavy** | **40** | Three or more areas in play, **or** a product-specific regulated regime engaged, **or** the initiative creates a new regulated product |

Every value produced is 10, 20, 30 or 40, names its level, and names the specific clause that placed it
there. **The levels are ours and not the bank's**, derived from the cards' own structure because no card
contains severity bands. They must be reviewed by ČS before any option is compared on them.

**The value scales on areas, not on raw sub-domain count.** The four areas hold forty-nine sub-domains
between them. A level defined on raw count would sit at its ceiling for almost every initiative and would
stop separating anything.

Product-specific regimes and mandatory client-facing documents are named by each area file. Each area adds
its own list and adds nothing to the level definitions themselves.

### 6.3 When it is not produced

**The value is produced only when no unresolved sub-domain could change the level.** Otherwise it is
unscored, never zero, and the unresolved sub-domains are named.

Where an unresolved entry cannot change the level, the value is produced and the entry is still shown. An
option already at level 4 because a payments regime is engaged does not become unscorable because one
unrelated sub-domain is open.

**An unscored value is reported with its denominator, never as a percentage.** The output states which
sub-dimensions were scored and which were not, and reports the total available.

### 6.4 What the value may claim

Levels are absolute and not relative to the other options in the run. A level assigned to an option
depends only on that option's own screen, and is unchanged by adding or removing other options.

---

## 7. The escalation flag

**Each area's escalation triggers are evaluated separately from the screen and produce one binary flag
with every fired trigger named.** Each fired trigger names itself, its area, and the role its card routes
it to.

**The flag contributes no points and is displayed beside the value at every point a person decides.** The
value can be recomputed from the screen alone with no reference to the flag. An option can be structurally
simple and still carry one high-severity trigger, and a weighted average would erase it.

**One exception, stated rather than hidden: a fired escalation trigger sets a floor of level 3.** This is
the one place the flag touches the value, it is visible in the level definition in §6.2, and it can be
removed without touching anything else.

**Triggers that fire on uncertainty are not suppressed by a *cannot determine* state.** Some triggers are
fired precisely by the condition that leaves a sub-domain unresolved. Where an area declares such a
trigger, an unresolved sub-domain fires it rather than reporting the flag as undetermined.

**The routing is not performed by the workflow.** Nothing here opens a review, notifies a specialist or
writes to a system of record. The flag names the role and stops.

---

## 8. What a producer does with the result

### 8.1 The binding rule

**From M4 onward, every sub-domain the accepted screen put in play is bound to exactly one of three things
in the document being written.**

1. **A requirement that addresses it**, named and locatable in that document
2. **An accepted open item**, with a named owner and the point at which it will be decided
3. **A stated reason it no longer applies**, because the scope narrowed after the screen was accepted

**A sub-domain appearing with none of the three is a listing and is refused.** What makes a consideration
real is that something in the document changes because of it. Whether it is *adequately* addressed needs a
person to judge. Whether it is addressed at all does not.

### 8.2 Each binding names three things

Its area, its sub-domain, and the trigger that fired it. **Not free text.** Across the eight runs on disk
the touchpoints are written as free prose and no two runs are comparable. Naming the sub-domain is what
makes coverage countable.

### 8.3 Carry-forward

**Later documents inherit the earlier set and do not re-derive it.** Every sub-domain in play at M4 appears
at M5 and M6, in one of the three bound forms.

**Adding a sub-domain later is permitted** and requires the trigger that fired it, plus a re-run and
re-acceptance of the screen. **Dropping one requires a written reason and a named person.** A silent
disappearance between two documents is a defect.

### 8.4 Wording an uncovered area

**An area routed rather than screened is named where it fires.** A fired AI trigger states that AI
regulation sits outside the four areas and that the routing is the whole of what this workflow does about
it.

---

## 9. Where the authority sits

**The workflow assembles. It does not assess.** No output states a conclusion about applicability. Every
applicability statement resolves to a trigger and to the text in the description that fired it.

**Five decisions are a person's and each names them.**

| | Decision | Moment |
|---|---|---|
| 1 | Accepting each option-level screen | M2 |
| 2 | Accepting an unscored value, or the level assigned | M3 |
| 3 | Whether each in-play sub-domain is adequately bound | M4, M5 |
| 4 | Whether a fired escalation trigger is routed, and to whom | any |
| 5 | Everything after handover | M6 onward |

Each carries a named person and a date. **None is inferred from a document's existence.**

**Complete never means approved.** Every output carrying a completeness statement also carries the
sentence that completeness means the evidence is ready for review and nothing more.

**Nothing is written into Jira, SmartCase or any other system of record** by anything reading this body.

---

## 10. Where the cards came from

**Three of four cards were written here.** They are a reading of public EU and Czech law, current as at
27 August 2026, assembled from the sources each area file cites. They are not a compliance opinion.

**Which card came from where is recorded once, in the RegMap.** `.github/registry/regmap.yaml` gives each area a
`source`: `cs_card` where ČS supplied the card, `authored_here` where it was written here. The build reads it, so
a card ČS sends replaces ours without changing anything that reads it. No output prints it.

**The legal detail behind each card is held separately** in `specifications/regulatory-research/`, one file per
area. That material is evidence for the card and is read by no producer. **A summary of a regime written
by us and read by a producer as authority is the thing this split exists to prevent.** The area files
carry obligations in operational terms and cite the instrument; the dossier carries the statutory reading
and the reasoning.

**The dates move and some of them moved this year.** Each area file carries a *what is moving* section
naming the instruments whose application date is not yet fixed or has recently changed. It is the section
that goes stale first and the one to check before quoting a date to anybody.

---

## 11. Why touchpoints were added

**The ČS card describes checks a reviewer performs. A producer at stage 4 is not a reviewer.** Asked
whether an idea engages *product governance and target market*, a product person reasonably answers that
they do not know, because the phrase names a control rather than a thing a product does.

**A touchpoint names the thing a product does.** Storing a client's identity document. Deciding an
outcome without a person in the loop. Charging a fee that was not charged before. Sending a client a
notification about their money. A producer can answer whether their idea does that, and the touchpoint
carries the sub-domain it engages.

**This is what makes the screen answerable at the moment it runs**, and it is the difference between a
screen that returns thirteen *cannot determine* entries and one that returns a usable set. Across the eight
committed runs, no producer has ever named pricing and fees, conflicts and inducements, ESG claims,
consumer credit, insurance or product governance unprompted, and **not one named accessibility** while
every one of them is a client-facing digital journey.

---

## 12. Open

| # | Question | Effect if unanswered |
|---|---|---|
| **Q1** | **Is the ČS Compliance card approved or a working draft?** It asserts a Czech act's effective date in a form that reads as self-verification | The RegMap keeps its status unconfirmed, and producers read it as knowledge either way |
| **Q2** | **Will ČS replace the three cards we wrote?** The format exists and one card is written in it, so the ask names its own deliverable | The three stay the ones written here, and the complexity value keeps resting on them |
| **Q3** | **Does a card we wrote count as filled for the complexity value?** The requirements held the value until all four cards landed. Four now exist and three are ours | If it does not, no value is ever produced. If it does, the value rests on three cards ČS has not reviewed |
| **Q4** | **Are the levels in §6.2 acceptable as a starting point?** They are structural and reviewable, and they are not the bank's | Option comparison runs on a scale ČS has not seen |
| **Q5** | **Does the floor rule in §7 stand?** It is the one place the escalation flag touches the value | Removing it is a one-line change and the rest of §6 and §7 are unaffected |
| **Q6** | ~~**Where are the required inputs collected?**~~ **Closed.** They are collected at framing. The sixty-one card rows join to forty-seven inputs in [screening-inputs.md](../../../specifications/definitions/know-how/compliance/screening-inputs.md), `brief-creation` declares that body and asks them in seven groups, and `A1` carries the answers in `screening_inputs[]` | Was: the screen returns mostly *cannot determine* and the value is unscored for a second, avoidable reason. **What remains open is whether thirty-five questions at framing is affordable**, which the ninth run measures (SI-c) |
| **Q7** | **Will the handover template gain a compliance section?** It is owned by the Product Management Guild | The chain reaches the specification and stops before the people who act on it |
