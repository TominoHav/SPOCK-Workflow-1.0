<!-- GENERATED from specifications/definitions/know-how/compliance/screening-inputs.md. Do not edit this copy.
     Regenerate: node .github/scripts/know-how.mjs --write
     Know-how is read by skills, never written by them. It changes through a human-owned process,
     outside any run (PD90). -->

# Screening Inputs

**Version:** 0.2 · **Date:** 29 September 2026 · **First version:** 27 August 2026 · **Status:** For review
**Owner:** Česká spořitelna · **Written by:** Igor Tadić · **Read by:** `ideation`

> **What this is.** The set of facts a compliance screen has to be able to resolve, joined once across the
> four regulatory areas, with the question a person is actually asked for each. It is read by
> `brief-creation` at stage 1.
>
> **What this is not.** Not knowledge about regulation, and not a second copy of any area card. Nothing
> here says what a rule requires or which sub-domain an answer puts in play — the area bodies do that.
> This body says only what has to be asked, and when.
>
> **The names are the cards'. The ids, the grouping and the moment are ours**, and `C123` fails the build
> when the join stops holding.

---

## 1. Why the inputs are joined rather than listed per area

**The four cards name sixty-one required inputs between them, and forty-seven distinct facts.** Bank role
appears on three cards, client journey on three, third parties on three, product type on two. Asking a
person the same question once per area is how a fifteen-exchange conversation becomes a sixty-one-field
form, and a form nobody finishes produces gaps nobody reads.

**That would defeat the requirement rather than serve it.** `CR-B7` exists so that a missing input costs
something visible: an absent input forces *cannot determine* on every sub-domain that depends on it, and
that entry names the input by id. The value of the mechanism is entirely in the answers being real.

**So the ask is joined and the accounting is not.** Every one of the sixty-one card rows still resolves,
through the registry, to exactly one input in this document. An area added later declares its own rows and
they are claimed here; until every row is claimed exactly once, the build fails.

---

## 2. Rules

- **No input is inferred.** An input the person did not supply is marked unknown with a reason, never
  filled from the topic, from the outcome, or from what the product sounds like. This is the brief's rule
  (`Brief Fields` §4) applied to a second field set, and it is the same rule for the same reason.
- **An input is never silently absent.** Each one carries a value, or an unknown with a reason. There is no
  third state, and a screen run against a silently absent input reports clean where it examined nothing.
- **The reason is proposed and confirmed, never assumed from silence** — with the one declared exception in
  §4.
- **Marking an input unknown is an ordinary outcome**, and at framing it is the common one. What it costs
  is stated on the screen rather than hidden: the sub-domains that depended on it return *cannot determine*
  and name it.
- **The person may correct the grouping, the moment and the question.** None of the three is a fact about
  regulation; they are how the ask is arranged, and they are ours.

---

## 3. The inputs

**Forty-seven, in seven groups.** The group is an ask, not a schema — the questions in one group are put
together because a person answers them in one breath, not because a regulator grouped them.

`M1` is framing, when the initiative is described and nothing has been chosen. `M2` is the moment options
exist. Both are from `COMPLIANCE-REQUIREMENTS.md` §3, and neither is a stage number.

**The first column is the id.** A compliance screen's `missing_input` carries the bolded id in that
column — `third_parties`, `security_measures`. **The *Card rows* column is not an id space**: `S-I4` and
`C-I9` are pointers into one area card's own §4 table, and a screen citing one is refused. An
unlabelled column had a producer take an id from the wrong one, and the failure that caught it said only
that the registry did not declare it — true of the id space and false of the file, because the string is
in there.

### What this is

| Input id | Input | Needed by | Knowable at | Card rows |
|---|---|---|---|---|
| **`product_description`** | Product or service description | Compliance | **M1** | C-I1 |
| **`product_type`** | Product type | Compliance · Legal | **M1** | C-I3 · L-I2 |
| **`bank_role`** | Bank role | Compliance · Legal · ICT security | **M1** | C-I2 · L-I1 · S-I3 |
| **`target_users`** | Target users | Compliance · Legal | **M1** | C-I4 · L-I3 |
| **`target_market`** | Target market | Compliance | **M1** | C-I5 |

### How it reaches the client

| Input id | Input | Needed by | Knowable at | Card rows |
|---|---|---|---|---|
| **`distribution_model`** | Distribution model | Compliance | **M1** | C-I6 |
| **`channels`** | Channels | Compliance · Legal | **M1** | C-I7 · L-I4 |
| **`client_journey`** | Client journey | Compliance · Legal · ICT security | **M1** | C-I8 · L-I5 · S-I7 |
| **`digital_interfaces`** | Digital interfaces, documents and authentication | Compliance · ICT security | **M1** | C-I17 · S-I6 |
| **`client_communication`** | Client-facing communication | Compliance · Legal | **M1** | C-I10 · L-I9 |

### Money and advice

| Input id | Input | Needed by | Knowable at | Card rows |
|---|---|---|---|---|
| **`pricing_and_fees`** | Pricing and fees | Compliance | **M1** | C-I9 |
| **`advice_involvement`** | Advice or recommendation involvement | Compliance | **M1** | C-I11 |
| **`suitability_implications`** | Suitability implications | Compliance | **M1** | C-I12 |
| **`sustainability_claims`** | Sustainability claims | Compliance | **M1** | C-I14 |

### Personal data

| Input id | Input | Needed by | Knowable at | Card rows |
|---|---|---|---|---|
| **`personal_data_processed`** | Whether personal data is processed | GDPR | **M1** | G-I1 |
| **`data_subject_categories`** | Categories of data subjects | GDPR | **M1** | G-I2 |
| **`personal_data_categories`** | Categories of personal data | GDPR | **M1** | G-I3 |
| **`special_category_data`** | Whether special-category data is present | GDPR | **M1** | G-I4 |
| **`processing_purposes`** | Purposes | GDPR | **M1** | G-I5 |
| **`lawful_basis`** | Lawful basis per purpose | GDPR | **M1** | G-I6 |
| **`data_source`** | Source of the data | GDPR | **M1** | G-I7 |
| **`data_recipients`** | Recipients | GDPR | **M1** | G-I8 |
| **`profiling_or_automated_decisions`** | Whether profiling or automated decisions occur, and their effect | GDPR | **M1** | G-I12 |
| **`marketing_and_tracking`** | Marketing and tracking intent | GDPR | **M1** | G-I13 |
| **`dpia_status`** | Whether a data protection impact assessment exists or is required | GDPR | **M1** | G-I15 |
| **`rights_route`** | The client's route to exercise their rights | GDPR | **M1** | G-I16 |

### Agreement and paperwork

| Input id | Input | Needed by | Knowable at | Card rows |
|---|---|---|---|---|
| **`agreement_capture`** | How agreement is captured | Legal | **M1** | L-I6 |
| **`contract_terms_affected`** | Contract terms affected | Legal | **M1** | L-I7 |
| **`precontractual_documents`** | Pre-contractual documents affected | Legal | **M1** | L-I8 |
| **`withdrawal_and_termination`** | Withdrawal and termination behaviour | Legal | **M1** | L-I10 |
| **`countries_offered`** | Countries the product is offered in | Legal | **M1** | L-I14 |

### Who else, and what could go wrong

| Input id | Input | Needed by | Knowable at | Card rows |
|---|---|---|---|---|
| **`third_parties`** | Third parties and what they supply | Compliance · Legal · ICT security | **M1** | C-I13 · L-I11 · S-I4 |
| **`complaints_and_disputes`** | Complaints, disputes and monitoring assumptions | Compliance · Legal | **M1** | C-I16 · L-I13 |
| **`fraud_exposure`** | Fraud exposure | ICT security | **M1** | S-I13 |
| **`registered_under_cyber_regime`** | Whether the affected service is registered under the cyber regime | ICT security | **M1** | S-I14 |

### The shape of the build

| Input id | Input | Needed by | Knowable at | Card rows |
|---|---|---|---|---|
| **`systems_affected`** | Systems affected | ICT security | **M2** | S-I1 |
| **`critical_or_important_function`** | Whether the systems support a critical or important function | ICT security | **M2** | S-I2 |
| **`hosting_and_data_location`** | Hosting, data location and transfers | GDPR · ICT security | **M2** | G-I10 · S-I5 |
| **`processors_and_subprocessors`** | Processors and sub-processors | GDPR | **M2** | G-I9 |
| **`retention_periods`** | Retention periods | GDPR | **M2** | G-I11 |
| **`security_measures`** | Security measures | GDPR | **M2** | G-I14 |
| **`data_at_rest_and_in_transit`** | Data at rest and in transit | ICT security | **M2** | S-I9 |
| **`components_and_libraries`** | Components and libraries used | ICT security | **M2** | S-I8 |
| **`release_and_environment`** | Release and environment approach | ICT security | **M2** | S-I10 |
| **`recovery_expectations`** | Recovery expectations | ICT security | **M2** | S-I11 |
| **`controls_and_monitoring`** | Controls, reporting and monitoring | Compliance · ICT security | **M2** | C-I15 · S-I12 |
| **`content_brand_and_software`** | Content, brand and software used | Legal | **M2** | L-I12 |
---

## 4. The two declared defaults

**Everything else in this body forbids assuming an answer. These two are stated instead of assumed, which
is the opposite thing**, and it is the treatment `language` already has in the parent's §6.2: the value is
written, the reason is written, and the person can change it in the same reply.

**D1 · An input marked `M2` is written unknown with `not_yet_available`, and the note says this body
declared it so.** It is not asked at framing. Nobody can say what components a build uses before anything
has been designed, and a question with no answerable form produces either a guess or an abandoned
conversation. **The mark is still a mark**: the twelve `M2` inputs appear on the brief, they are visible,
and the screen reports what they cost.

**D2 · Where `personal_data_processed` is answered *no*, the remaining eleven inputs in its group resolve
to `not_applicable` rather than being asked.** The reason names the answer that closed them. This is the
one place an answer resolves other inputs, and it is here because the GDPR card's own structure gates
twelve sub-domains on that single question.

**Neither default survives a person saying otherwise.** A `M2` input the person can answer at framing is
answered at framing, and an input they want asked is asked.

---

## 6. Open

| # | Question | Effect |
|---|---|---|
| **SI-a** | **Three of the four cards were written here rather than supplied by ČS**, so thirty of the forty-seven inputs rest on our reading of what those areas need. `Q2` of the requirements is the ask that closes it | The ask is honest and the areas behind three quarters of it are unreviewed |
| **SI-b** | **Whether the seven groups match how a ČS product manager actually thinks about an initiative.** They are ours and were arranged from the card content, not from watching anyone answer them | A group that cuts across how someone thinks costs exchanges and produces worse answers. Cheap to change, and it changes no card |
| **SI-c** | **Whether thirty-five questions at framing is affordable.** The bound is declared at eight exchanges for this pass and the ninth run is the first measurement of what it actually takes | If it runs long, the answer is fewer groups rather than fewer inputs — an input dropped is a sub-domain that reports clean having examined nothing |
| **SI-d** | **Whether `M2` inputs should be collected at all at framing, or simply declared absent until options exist.** Written as `D1` because `CR-B7` says every declared input is accounted for at M1, and a list of twelve marked entries is what makes the gap visible | Removing them would make the brief shorter and the screen's *cannot determine* entries unexplained |
