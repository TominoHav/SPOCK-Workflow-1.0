# Compliance in the discovery workflow — business requirements

**Date:** 1 October 2026 · **Release:** 1.14 · **Status:** **Requirements. The screen is built, and the description bindings and the escalation flag are built in part**: the flag fires only the triggers that rest on a question a solution could not settle. The complexity value is held by `CR-C6` and is not claimed. **All four areas have a card**: the Compliance card ČS supplied, and three the pilot team wrote from public law, which ČS has not reviewed · **Owner:** Igor Tadic
**Areas in scope:** Compliance · GDPR and privacy · Legal and contracts · ICT and security
**Source material:** *Regulatory map — Compliance*, one area card supplied by ČS, 26 August 2026
**Basis:** the supplied card and nothing else. **No earlier compliance design in this repository is carried forward**

> **What this is.** The business requirements for the compliance part of the discovery workflow, written
> so that they can be implemented against whatever the workflow structure turns out to be.
>
> **What this is not.** Not a design, not a build plan, not a schema. It names what must be true and how
> each statement would be tested, and leaves where the code goes to the implementation.
>
> **Deliberately written without stage numbers or artifact codes**, so that the workflow can change
> underneath the requirements. Requirements are anchored to **moments**
> — points in any discovery process where a particular thing becomes knowable — not to stages. **No
> requirement in §5 to §11 names a stage, an artifact code or a check**; §12 alone says where the build meets
> them, so the workflow can be rebuilt underneath the requirements without invalidating one of them.
>
> **One area of four came from ČS.** The mechanism below is area-generic and the Compliance card is its
> worked instance. The GDPR, Legal and ICT security cards were written by the pilot team from public law,
> and §13 says what working from one ČS card costs.

---

## 1. Scope

**Four regulatory areas.**

| | Area | Source we hold |
|---|---|---|
| **A1** | **Compliance, conduct and product regulation** | The supplied card. Thirteen sub-domains, thirteen triggers, fourteen escalation triggers, complete |
| **A2** | **GDPR and privacy** | **None from ČS.** A card the pilot team wrote from public law |
| **A3** | **Legal and contracts** | **None from ČS.** A card the pilot team wrote from public law |
| **A4** | **ICT and security** | **None from ČS.** A card the pilot team wrote from public law |

**Two areas the Compliance card names are deliberately out of scope: AI regulation, and outsourcing and
DORA.** They are not silent omissions. Every output this document specifies names them as uncovered,
because a reader who cannot see the edge of the work will assume there is no edge.

**AI is out as an area and still routed.** *AI-driven recommendation, scoring or client decision* is one of
the Compliance card's own escalation triggers, so the card sends an initiative that scores or advises clients
using a model to a specialist rather than screening it. **It is routed rather than screened**, which is the
correct disposition for an area we hold no map for; §12 says how far the build evaluates that trigger.

**Scheme rules are not regulation and are in none of the four.** CERTIS, the EPC rulebook, ISO 20022 and
card scheme agreements appear in the committed runs. They would have belonged to the Banking Constraints
body, which is retired and will not be written, so they are uncovered. Nothing here covers them.

---

## 2. What the four areas have to look like

**Every area supplies the same card, in the format ČS already used for Compliance.** The format is the
contract. An area that supplies less than this cannot be screened, and an area that supplies more is
carrying content this workflow will not read.

| Field | What it is for |
|---|---|
| **Regulatory area** | The name the output uses |
| **Relevant in discovery** | Whether screening is mandatory for this area |
| **Sub-domains** | The units the screen reports on, and the units a description binds to |
| **Primary applicability triggers** | The circumstances that put a sub-domain in play. **The screen is built from this row** |
| **Required discovery inputs** | What a description must state before the screen can resolve |
| **Standard reviewer questions** | What a person asks at a decision point |
| **Named checks** | The specific examinations the area expects, one per major sub-domain |
| **Expected evidence and artefacts** | What the record reports as produced, missing, or somebody else's |
| **Discovery brief output** | The items this area contributes to the record that leaves discovery |
| **Escalation triggers** | The conditions that route to a named specialist |
| **Primary legal sources** | Named regimes and citations. **Pointers only** |
| **Related regulatory areas** | The edge of this card, stated |

**This is the ask to ČS for the three missing areas**, and it is a much smaller ask than "give us your
privacy guidelines". The format exists, one card is written in it, and it names its own deliverable.

---

## 3. The six moments

Compliance work attaches to what has become knowable, not to a stage number.

| | Moment | What is true by then |
|---|---|---|
| **M1** | **Framing** | The initiative is described. Nothing has been chosen |
| **M2** | **Options exist** | Several candidate directions have been generated |
| **M3** | **Options compared** | The options are evaluated against each other and one is chosen |
| **M4** | **Scoped** | The chosen direction is cut down to something buildable |
| **M5** | **Specified** | Requirements are written against it |
| **M6** | **Handed over** | The delivery document leaves discovery |

**A moment is not a stage.** Two moments may land in one stage, one moment may be spread across two, and a
restructured workflow may reach them in a different order. What each requirement needs is that the thing it
depends on has become knowable, which is what the right-hand column states.

---

## 4. The four outputs

**O1 · The applicability screen.** Which sub-domains, across all four areas, are in play. Three states, a
stated reason for each. Produced at M2 for each option.

**O2 · The regulatory complexity value.** One of four levels, per option, at M3. It answers *how much work
does the regulation add* and feeds the difficulty side of option comparison.

**O3 · The considerations carried into the description.** From M4 onward, every sub-domain the accepted
screen put in play is bound to something concrete in the document being written.

**O4 · The escalation flag.** Binary, per option, carried beside O2 and never inside it.

**O1 comes first and the other three depend on it.** Nothing can be scored, described or escalated until
something has established which sub-domains are in play.

---

## 5. The knowledge — CR-A

**CR-A1 · The four areas are held as knowledge that is read by producers and written by no producer.**
*Testable:* no process that produces a run artifact has write access. A change is dated, attributed to a
named person, and does not originate inside a run.

**CR-A2 · Each area declares all twelve fields of §2, and an area missing any of them is declared unfilled
rather than partially used.**
*Testable:* each area either carries twelve fields or is marked unfilled. No area is screened from a
partial card.
*Why:* an area screened from three of twelve fields returns confident answers built on a fraction of its
own map, and nothing downstream can tell that apart from a complete screen.
*Filled is about the card, not its author:* a card the pilot team wrote is filled when it carries all
twelve fields, and ČS may replace it with its own (`CR-B5`). Every requirement below
that speaks of a filled area includes the unreviewed cards.

**CR-A3 · Each area's card carries pointers to legal sources and no summary of what those sources say.**
The Compliance card names MiFID II and Czech ZPKT, PRIIPs, IDD and Czech insurance distribution rules,
payment services legislation, consumer credit legislation, consumer protection rules, SFDR and Taxonomy,
ČNB guidance, ESMA and EBA guidelines, Directive (EU) 2019/882 and Czech Act No. 424/2023 Coll.
*Testable:* every legal reference is a name and a citation. No entry states an obligation, a threshold or a
date that is not transcribed from a supplied card.
*Why:* a summary of a regime written by us would be read by producers as authority. It would age, and it
would put an unreviewed legal reading into documents ČS receives.

**CR-A4 · Every statement is attributed.**
*Testable:* each section names its source, and the RegMap records for each area whether ČS supplied its card.
*Why:* a card ČS sends has to replace ours without anything that reads it changing.

**CR-A5 · Adding or replacing one area must not require reopening the other three.**
*Testable:* each area is a self-contained unit. A card added or amended changes no statement inside another
area's card.
*Why:* three of the four are expected to arrive later and separately. If the first one has to be revisited
each time, the map never converges.

---

## 6. The screen — CR-B

### 6.1 What it does

**CR-B1 · The screen evaluates the description against every area's applicability triggers, and each
trigger that fires names the sub-domains it puts in play.**
*Testable:* every sub-domain placed in play resolves to at least one fired trigger, and every fired trigger
resolves to at least one sub-domain.

**CR-B2 · Each sub-domain in each filled area, reviewed or not, returns exactly one of three states.**

- **In play** — a trigger fired and named it
- **Not triggered by this description** — no trigger fired
- **Cannot determine** — a trigger may or may not have fired, and the input needed to settle it is absent

*Testable:* no sub-domain in a filled area is left blank, and no state outside these three appears.

**CR-B3 · The screen never uses the words "not applicable".**
The middle state is a statement about the description, never about the regulation.
*Testable:* the phrase does not appear in any screen output. Each non-triggered entry is phrased as what
the description did not contain.
*Why:* "not applicable" is a compliance judgement and this workflow does not make them.

**CR-B4 · "Cannot determine" never collapses into "not triggered".**
*Testable:* a screen carrying no "cannot determine" entries can be shown to have had every input each
sub-domain depends on either supplied or evaluated as irrelevant. A screen that resolved everything from an
incomplete description is a defect.

**CR-B5 · An area with no ČS card is screened from the card written for it.**
*Testable:* GDPR, Legal and ICT security are screened from the cards written from public law, and the RegMap's
`source` says so; no screen prints it.
*Why:* ČS can replace any of the three with its own card, and the screen then reads that card.

### 6.2 Input dependency

**CR-B6 · Each sub-domain declares the inputs it needs, and an absent input forces "cannot determine" on
every sub-domain that depends on it.**
*Testable:* every "cannot determine" names the specific input that was missing. Every supplied input that
gates a sub-domain leaves that sub-domain resolved.

**CR-B7 · Each area's required inputs are asked at M2, of each option, and any the option cannot answer is
explicitly marked unknown with a reason.**
*Testable:* each declared input carries a value or an explicit unknown with a reason, on every option. None
is silently absent.
*Why:* **a screen cannot run against a description that does not hold what it screens**, and an unstated
input that produces a visible "cannot determine" is what makes the gap cost something rather than pass
quietly. The inputs are asked once an option exists, because a person cannot say whether an idea engages a
regime before the idea exists.

### 6.3 One screen per option

**CR-B8 · The screen runs at M2 against each option separately.**
*Testable:* one screen exists per option.

**CR-B9 · Each option is screened on its own answers, never on a set shared across the options.**
*Testable:* every option's screen carries its own answer to every question on the four cards.
*Why:* if every option shared an identical set, the value in §7 would be the same for all of them and
contribute nothing to the comparison it exists to serve. **The per-option screen is what makes the
difficulty side of the comparison discriminating.** A payment-credential product and a notification change
carry different regulatory reach, and only the option-level screen sees it.

**CR-B10 · A person accepts the screen before anything downstream reads it.**
*Testable:* the accepted screen carries a named person and a date. No value, description or record is
produced from an unaccepted screen.

### 6.4 The Compliance area, worked

**This subsection is one area's content and is the pattern the other three follow when their cards land.**

Triggers to sub-domains:

| | Trigger | Puts in play |
|---|---|---|
| **T1** | New product | S2, S1, S4, S12, plus the product-specific sub-domain |
| **T2** | Material product change | S2, S1, S12 |
| **T3** | Change in price, fees or terms | S4, S1, S5 |
| **T4** | New or changed target market | S2, S3 |
| **T5** | New distribution channel | S11, S2, S1 |
| **T6** | New partner or intermediary | S11, S5, S12 |
| **T7** | Changed client communication or disclosure | S1 |
| **T8** | Investment, insurance, payment or credit functionality | S6, S7, S8 or S9 by type, plus S3 for investment and insurance |
| **T9** | New recommendation or advice model | S3, S5, S6 |
| **T10** | AI or scoring affecting clients | S1, S3, S12 |
| **T11** | Sustainability or ESG claims | S10, S1 |
| **T12** | Client-facing digital journey | S13, S1 |
| **T13** | Accessibility-impacting interface or document change | S13 |

Sub-domains and the inputs that gate them:

| | Sub-domain | Depends on |
|---|---|---|
| **S1** | Client protection and communications | client-facing communication · client journey |
| **S2** | Product governance and target market | product type · target market · target users · bank role |
| **S3** | Suitability and appropriateness | advice or recommendation involvement · suitability implications |
| **S4** | Pricing, fees and fair value | pricing and fees |
| **S5** | Conflicts and inducements | pricing and remuneration · distribution model · third parties |
| **S6** | Investment products · MiFID II · PRIIPs | product type |
| **S7** | Insurance · IDD | product type |
| **S8** | Payments and payment functionality | product type · digital interfaces and authentication |
| **S9** | Consumer credit | product type |
| **S10** | ESG and sustainability claims | sustainability claims |
| **S11** | Distribution and third parties | distribution model · channels · third parties |
| **S12** | Controls, reporting and auditability | controls · complaints and monitoring assumptions |
| **S13** | Accessibility · EAA | digital interfaces and documents · client journey · channels |

**Product type gates five of the thirteen and is this area's highest-value single input.** Without it, S2,
S6, S7, S8 and S9 are all unresolvable, and four of those five are the sub-domains that open a separate
approval track.

The seventeen inputs: product or service description · bank role · product type · target users · target
market · distribution model · channels · client journey · pricing and fees · client-facing communication ·
advice or recommendation involvement · suitability implications · third parties · sustainability claims ·
controls · complaints and monitoring assumptions · digital interfaces, documents and authentication.

---

## 7. The complexity value — CR-C

### 7.1 What it measures

**CR-C1 · The value measures complexity, meaning the work the regulation adds. It does not measure risk.**
Complexity is how many areas fire, how deep the review goes, whether specialist sign-off opens, and what
evidence has to be produced. Risk is the chance and the cost of being wrong, and it is carried by the
escalation flag in §8.
*Testable:* the level definitions reference only structural facts. No level is defined by likelihood or by
severity of harm.
*Why:* the value sits on the difficulty side of an option comparison, and difficulty is cost to deliver.
Mixing the two produces a number that answers neither question.

**CR-C2 · One value per option, computed across all four areas, and it takes one of four levels.**

| Level | Value | Definition |
|---|---|---|
| **1 · Minimal** | **10** | No area in play. Nothing any trigger list names is changed |
| **2 · Contained** | **20** | One area in play, no mandatory client-facing document or artefact required, no escalation trigger fired |
| **3 · Substantial** | **30** | Two areas in play, **or** any mandatory client-facing document or artefact required, **or** any escalation trigger fired |
| **4 · Heavy** | **40** | Three or more areas in play, **or** a product-specific regulated regime engaged, **or** the initiative creates a new regulated product |

Product-specific regimes are the Compliance area's S6, S7, S8 and S9. Mandatory client-facing documents in
that area are the ones its card names: KID, IPID, target-market assessment, approved client disclosures,
and an accessibility statement. **Each further area adds its own list when its card lands, and adds nothing
to the level definitions themselves.**

*Testable:* every value produced is 10, 20, 30 or 40, names its level, and names the specific clause of the
definition that placed it there.
*Why:* the cards support four distinguishable levels and nothing finer. A value of 27 would carry a
precision nothing behind it can justify, and the difference between a 24 in one run and a 24 in another
would be unrecoverable.

**CR-C3 · The value scales on areas, not on raw sub-domain count.**
*Testable:* moving one sub-domain in or out of play within an area already in play does not change the
level unless it engages a product-specific regime or a mandatory artefact.
*Why:* four filled areas would hold roughly forty-five sub-domains between them. A level defined on raw
count would sit at its ceiling for almost every initiative and would stop separating anything.

**CR-C4 · Every value states which areas and which sub-domains produced it.**
*Testable:* the list on the value matches the accepted option-level screen exactly.

### 7.2 When it is not produced

**CR-C5 · The value is produced only when no unresolved sub-domain could change the level. Otherwise it is
unscored, never zero, and the unresolved sub-domains are named.**
*Testable:* where any "cannot determine" entry could move the level under either resolution, the output
carries an unscored marking with the entries named. Where an unresolved entry cannot change the level, the
value is produced and the entry is still shown.
*Why:* an option already at level 4 because a payments regime is engaged does not become unscorable because
one unrelated sub-domain is open. Refusing to score there would punish a well-described option for an
irrelevant gap.

**CR-C6 · An unfilled or unreviewed area makes the value unscored on every option, on every run, until ČS
reviews or replaces its card.**
*Testable:* while any of the four areas has no ČS-reviewed card, no complexity value is produced, and the
output names those areas as the reason.
*Why:* this is the hardest requirement in the document and it is the one that keeps the rest honest. A
value computed across one area the bank stands behind and three it has not reviewed would be a number about
a quarter of the question, presented as a number about the whole of it. **Producing nothing is
recoverable. Producing a confident quarter-answer is not.**

**CR-C7 · An unscored value is reported with its denominator, never as a percentage.**
*Testable:* the output states which sub-dimensions of the difficulty side were scored and which were not,
and reports the total available rather than a proportion of what happened to be scorable.

### 7.3 Comparability

**CR-C8 · Levels are absolute and not relative to the other options in the run.**
*Testable:* a level assigned to an option depends only on that option's own screen, and is unchanged by
adding or removing other options from the run.

---

## 8. The escalation flag — CR-D

**CR-D1 · Each area's escalation triggers are evaluated separately from the screen and produce one binary
flag with every fired trigger named.**
The Compliance area's fourteen: new regulated product · materially changed target market · new advice or
recommendation model · significant pricing or fee change · new incentive or remuneration model · possible
misselling risk · unclear product classification · new distribution partner · AI-driven recommendation,
scoring or client decision · sustainability claim · EAA applicability uncertainty · identified accessibility
barrier · regulatory complaint or finding · inability to define adequate controls.
*Testable:* each declared trigger in each filled area is evaluated and returns fired or not fired. A fired
trigger names itself and its area.

**CR-D2 · The flag contributes no points and is displayed beside the value at every point a person
decides.**
*Testable:* the value can be recomputed from the screen alone with no reference to the flag. The flag
appears in every presentation the value appears in.
*Why:* a single trigger firing is a fact a person needs. An option can be structurally simple and still
carry one high-severity trigger, one sustainability claim for instance, and a weighted average would erase
it.

**CR-D3 · One exception, stated rather than hidden: a fired escalation trigger sets a floor of level 3.**
This is the one place the flag touches the value, it is visible in the level definition in §7, and it can be
removed without touching anything else.
*Testable:* no option with a fired trigger carries level 1 or 2.

**CR-D4 · A fired trigger names the role its card routes it to, and the routing is not performed by the
workflow.**
*Testable:* each fired trigger carries a named role. Nothing in the workflow opens a review, notifies a
specialist or writes to a system of record.

**CR-D5 · Triggers that fire on uncertainty must not be suppressed by a "cannot determine" state.**
In the Compliance area, *EAA applicability uncertainty* and *inability to define adequate controls* are
triggered precisely by the condition that leaves S13 or S12 unresolved.
*Testable:* an unresolved S13 fires the EAA uncertainty trigger. An unresolved S12 fires the controls
trigger. Neither is reported as "cannot determine" on the flag.

**CR-D6 · The AI trigger routes an area this map does not cover, and says so where it fires.**
*Testable:* a fired *AI-driven recommendation, scoring or client decision* trigger states that AI regulation
is outside the four areas and that the routing is the whole of what this workflow does about it.

---

## 9. Carried into the description — CR-E

### 9.1 The binding rule

**CR-E1 · From M4 onward, every sub-domain the accepted screen put in play is bound to exactly one of three
things in the document being written.**

1. **A requirement that addresses it**, named and locatable in that document
2. **An accepted open item**, with a named owner and the point at which it will be decided
3. **A stated reason it no longer applies**, because the scope narrowed after the screen was accepted

*Testable:* every in-play sub-domain resolves to one of the three. A sub-domain appearing with none of them
is a listing and is refused.
*Why:* what makes a consideration real is that something in the document changes because of it. Whether it
is *adequately* addressed needs a person to judge. **Whether it is addressed at all does not.** A sub-domain
naming no requirement, no owned open item and no reason has been listed and not addressed, and that half is
settled without a reader.

**CR-E2 · Each binding names its area, its sub-domain and the trigger that fired it, not free text.**
*Testable:* every entry resolves to one declared area, one of that area's sub-domains, and one of its
triggers.
*Why:* touchpoints written as free prose make no two runs comparable. Naming the sub-domain is what makes
coverage countable.

**CR-E3 · An area with no card is named in the description as unexamined, at every moment from M4 on.**
*Testable:* an area the RegMap gives no card is named as unexamined in the scoped, specified and handover
documents.

### 9.2 Carry-forward

**CR-E4 · Later documents inherit the earlier set. They do not re-derive it.**
*Testable:* every sub-domain in play at M4 appears at M5 and M6, in one of the three bound forms.

**CR-E5 · Adding a sub-domain later is permitted and requires the trigger that fired it, plus a re-run and
re-acceptance of the screen.**
*Testable:* any sub-domain present at M5 or M6 and absent at M4 carries a named trigger and an accepted
screen dated after the addition.

**CR-E6 · Dropping a sub-domain requires a written reason and a named person.**
*Testable:* every dropped entry carries both. A silent disappearance between two documents is a defect.
*Why:* a set each producer re-derives from scratch drifts between documents. The chain is the control, and
it only works in both directions.

### 9.3 Where it stops today

**CR-E7 · The compliance chain must reach the document that leaves discovery.**
*Testable:* the handover document carries the bound set.
*Status:* **not satisfiable by us alone.** The document ČS receives is written against a thirteen-section
template owned by their Product Management Guild. It has no compliance section and we do not own the
template. **This is a request to ČS, not a change we can make**, and until it is answered the chain reaches
the specification and stops one step short of the people who act on it.

---

## 10. The record that leaves — CR-F

**CR-F1 · One compliance record per run, assembled from the run's own content, carrying each filled area's
declared brief-output items.**
The Compliance area's fifteen: applicable regulatory regimes · bank role · target client and target market ·
distribution model · conduct and client risks · pricing and fee implications · required disclosures ·
suitability and appropriateness impact · conflicts and incentives · ESG implications · accessibility impact ·
required controls and evidence · regulatory dependencies · unresolved questions · required specialist
approvals.
*Testable:* every declared item present, each either carrying content drawn from the run or explicitly
stating that the run produced none.

**CR-F2 · The record names each filled area's expected evidence artefacts and states which the run has
produced, which it has not, and which are somebody else's to produce.**
*Testable:* each named artefact carries one of those three dispositions. None is omitted.

**CR-F3 · The record names every area the bank's own map does not cover, and distinguishes the two kinds.**
Out of scope by decision: AI regulation, and outsourcing and DORA. In scope and unreviewed, resting on cards
ČS has not reviewed: GDPR, Legal, ICT security.
*Testable:* all five appear, in the correct one of the two categories.
*Why:* an area nobody chose to cover and an area covered only by our own reading of public law are different
facts, and a reader acts differently on each.

**CR-F4 · Every statement in the record carries its source.**
*Testable:* each entry names the document and the location within the run it was drawn from, or is marked as
a stated gap.

**CR-F5 · The record is regenerated from the run's content each time it is produced.**
*Testable:* the record contains no value that is not derivable from the run's own documents at the time of
production.
*Why:* a record maintained by hand alongside the run drifts away from it, and a compliance record that
disagrees with the work it describes is worse than none.

**CR-F6 · Nothing is written into Jira, SmartCase or any other system of record.**
*Testable:* no process producing any output in this document holds write access outside the run's own files.

---

## 11. Where the authority sits — CR-G

**CR-G1 · The workflow assembles. It does not assess.**
It reports which triggers the description fired, which sub-domains that puts in play, and what the run bound
to each. **It forms no opinion about whether a regulation applies.**
*Testable:* no output states a conclusion about applicability. Every applicability statement resolves to a
trigger and to the text in the description that fired it.

**CR-G2 · Five decisions are a person's and each names them.**

| | Decision | Moment |
|---|---|---|
| **1** | Accepting each option's screen | M2 |
| **2** | Accepting an unscored complexity value, or the level assigned | M3 |
| **3** | Whether each in-play sub-domain is adequately bound | M4, M5 |
| **4** | Whether a fired escalation trigger is routed, and to whom | any |
| **5** | Everything after handover | M6 onward |

*Testable:* each carries a named person and a date. None is inferred from a document's existence.

**CR-G3 · Complete never means approved.**
*Testable:* every output carrying a completeness statement also carries the sentence that completeness means
the evidence is ready for review and nothing more.

**CR-G4 · Withdrawn (BD-106).**

---

## 12. What is built from what we hold

| Output | State | Blocked on |
|---|---|---|
| **O1 · The screen** | **Built.** A compliance section on every solution at stage 4, derived by a script (`SPOCK: stage 4 — derive the compliance sections`) from the solution's answers to every question the four cards carry, all four areas on every section. **`C125`** and **`C126`**, on stage 4's quality gate, guard against a section that is not what its answers derive, one that says *not applicable*, and one that leaves an area out. The two committed runs holding the retired `A1b` and `A8c` are read against the model they were produced under. | ČS reviewing or replacing the three cards written here does not gate the screen |
| **O2 · The complexity value** | **Not built and not claimed.** `CR-C6` holds it until ČS reviews or replaces the three cards written here | ČS reviewing or replacing the three cards, and ČS review of the levels in §7 |
| **O3 · The description bindings** | **Partly built.** `CR-E1`, `CR-E2` and `CR-E4` to `CR-E6` on `A11`, `A12` and `A13`. **`C130`**, on stage 5's and stage 6's quality gates, guards against a bound touchpoint that resolves to nothing; **`C131`**, on stage 6's, against a touchpoint that disappears between documents unstated. **`CR-E3` is checked and cannot yet fire**: the check names an area as unexamined when it has no card, and every area has one | `CR-E7`, which is a request to ČS about their handover template |
| **O4 · The escalation flag** | **Partly built.** The derived section names every escalation trigger that fired, or says none did. On a solution set from 7 September 2026 a trigger fires only where its card names a sub-domain the solution's answers left unresolved, which is `CR-D5`; the other triggers, the AI trigger of `CR-D6` among them, are not evaluated, so `CR-D1` is not met. **`C129`**, on stage 4's quality gate, counts the triggers fired and has no failure it can report on such a set | **`CR-D1`**, for the triggers no question reaches. **`CR-D4`. No card names a routing role** — the ČS transcript lists fourteen triggers and none, and the three cards written here inherited the claim without the content. The derived section says that no card names the role a fired trigger routes to |

**The levels in §7 are ours and not the bank's.** They are derived from the Compliance card's own structure,
because the card contains no severity bands. **They must be reviewed by ČS before any option is compared on
them.**

**The screen is built while the value is held.** It is the output that changes what a person sees at a
decision point, and it runs on all four areas. The value is the output that waits until ČS reviews or replaces the three cards written here.

---

## 13. What producers raise unprompted, and what the cards catch

**This section is observation, not design.** It is what producers wrote unprompted, before a screen asked
them anything, and it is here because it is the only measurement available of what the areas catch.

**GDPR is the concern producers raise most often, with ePrivacy behind it.** **The supplied Compliance card
covers neither**, so the GDPR card written from public law is the one that maps it, until ČS sends its own.

**Producers did not name accessibility as a compliance touchpoint**, although the runs are client-facing
digital journeys. The Compliance area's own S13 fires on T12 for a client-facing digital journey, and the
Czech act has been in force since 28 June 2025. **The Compliance card alone catches something producers do
not raise on their own**, which is why the screen runs on every solution.

**Producers also left pricing and fees, conflicts and inducements, ESG claims, consumer credit, insurance and
product governance unraised.** Six of the thirteen sub-domains on the Compliance card reach a run only
because the screen asks about them.

---

## 14. Open

| # | Question | Effect if unanswered |
|---|---|---|
| **Q1** | **Is the supplied Compliance card an approved ČS document or a working draft?** It asserts the Czech act's effective date in a form that reads as self-verification | The RegMap keeps its status unconfirmed, and producers read it as knowledge either way |
| **Q2** | **Will ČS supply cards for GDPR, Legal and ICT security in the §2 format?** Someone there produced the Compliance one, so the format exists and the ask names its own deliverable | The complexity value is never produced, per CR-C6, and three of four areas rest on cards the pilot team wrote from public law |
| **Q3** | **Will the handover template gain a compliance section?** It is owned by the Product Management Guild and CR-E7 cannot be met without them | The chain reaches the specification and stops before the people who act on it |
| **Q4** | **Are the levels in §7 acceptable as a starting point?** They are structural and reviewable, and they are not the bank's | Option comparison would run on a scale ČS has not seen |
| **Q5** | **Does the floor rule in CR-D3 stand?** It is the one place the escalation flag touches the value | Removing it is a one-line change and the rest of §7 and §8 are unaffected |
| **Q6** | **Does CR-C6 stand?** Holding the value until ČS reviews or replaces the three cards written here is the strictest requirement here, and the alternative is a quarter-answer presented as a whole one | If it is relaxed, say explicitly what a value computed over one area is allowed to claim |
| **Q8** | **Which role does each escalation trigger route to?** `CR-D4` requires a fired trigger to name one and **no card carries any**: the supplied ČS transcript lists fourteen triggers and no roles, and the three cards written here inherited the claim without the content. **We will not fill it in** — deciding who at the bank reviews what is not ours to do | Every derived section that names a fired trigger says no card names its role. The flag fires, names its trigger and its area, and stops one step short of the person who would act on it, **the same shape as the handover template question** |
