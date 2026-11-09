# Area · Legal and Contracts

**Version:** 0.3 · **Date:** 29 September 2026 · **First version:** 27 August 2026 · **Status:** For review
<!-- history -->
**v0.3 drops the line asking for outputs built on this card to be marked** (BD-106), from 29 September 2026: the RegMap records that the card was written here.
**v0.2 adds §13, the touchpoints in Czech**, from 21 September 2026: a Czech run started on build 1.3 or later quotes it where an English run quotes §6.
**Parent contract:** [PILOT-BUSINESS-LOGIC.md](../../../PILOT-BUSINESS-LOGIC.md) v1.40.0
**Mechanism:** [compliance-guidelines.md](./compliance-guidelines.md) · **Dossier:** `specifications/regulatory-research/legal.md`
<!-- /history -->
**Owner:** Česká spořitelna · **Written by:** Igor Tadić · **Read by:** `ideation` · `mvp-option-design` · `mvp-expansion` · `prd`

> **This card is ours.** **ČS has supplied no card for this area.** Every field below was written by the
> pilot team on 27 August 2026 from public EU and Czech law, in the twelve-field format the supplied
> Compliance card uses.
>
> **Nothing here is legal advice.** The statutory reading is in the dossier, which no producer reads.
>
> **The boundary with the Compliance area.** That area asks whether a product may be sold and how it must
> be governed. This one asks whether the agreement with the client is validly formed, fairly termed and
> enforceable, and whether the paperwork the product depends on exists.

---

## 1. The card

**Regulatory area.** Legal, contracts and consumer contract law.

**Relevant in discovery.** YES — mandatory applicability screening. Any initiative that changes what a
client agrees to, how they agree to it, or what the bank promises, changes a contract.

**Related regulatory areas.** Compliance and conduct · GDPR and privacy · ICT and security.

---

## 2. Sub-domains

| | Sub-domain | Depends on these inputs |
|---|---|---|
| **L1** | Contract formation, and conclusion at a distance | client journey · channels · how agreement is captured |
| **L2** | Consumer contract terms and unfair terms | contract terms · target users |
| **L3** | Pre-contractual information duties | client-facing communication · product type · channels |
| **L4** | Withdrawal, termination and change of terms | contract terms · client journey · product type |
| **L5** | Electronic signature, identification and evidence | how agreement is captured · digital interfaces and authentication |
| **L6** | Language, form and the durable record | client-facing communication · target users · channels |
| **L7** | Intellectual property, content and licensing | third parties · content and brand used |
| **L8** | Supplier, partner and outsourcing contracts | third parties · distribution model |
| **L9** | Complaints, alternative dispute resolution and jurisdiction | complaints and monitoring assumptions · target users |
| **L10** | Liability, warranties and limitation | contract terms · product type |
| **L11** | Advertising claims and pre-contract commitments | client-facing communication · sustainability claims |
| **L12** | Licensing perimeter and permitted activity | bank role · product type · third parties |

**Whether the client agrees to anything is this area's gating question.** An initiative that changes no
term, captures no agreement and makes no promise engages L7 to L9 at most.

---

## 3. Triggers

| | Trigger | Puts in play |
|---|---|---|
| **N1** | A client agrees to something in the journey | L1, L2, L3, L5, L6 |
| **N2** | Contract terms, framework contract or T&Cs change | L2, L4, L3, L6 |
| **N3** | A contract is concluded without the parties meeting | L1, L3, L4, L5 |
| **N4** | A new pre-contractual document or disclosure is introduced | L3, L6 |
| **N5** | How the client signs or confirms changes | L5, L1, L6 |
| **N6** | The client can cancel, withdraw or terminate in the journey | L4, L1 |
| **N7** | A price, fee or term changes for existing clients | L4, L2, L3 |
| **N8** | Third-party content, data, brand or software is used | L7, L8 |
| **N9** | A supplier, partner or outsourcing arrangement is added or changed | L8, L12, L7 |
| **N10** | A complaint, dispute or claim route is created or changed | L9, L4 |
| **N11** | The bank promises a service level, guarantee or outcome | L10, L11, L2 |
| **N12** | A marketing claim is made that a client could rely on | L11, L3, L2 |
| **N13** | The activity itself may need a permission the bank does not hold | L12, L8 |
| **N14** | The product is offered to clients in another country | L1, L2, L6, L9, L12 |

---

## 4. Required inputs

**Fourteen, and each carries an id so that the screen's input gating can be checked rather than
asserted.** The names are the card's own. **The ids are ours**, and they exist because a screen must name
the input that was missing whenever it cannot determine a sub-domain, which needs a handle a check can
resolve.

**Where these are collected is not this card's business.** They are collected once, across all four areas,
at framing — [screening-inputs.md](./screening-inputs.md) carries the joined set and
`.github/registry/screening-inputs.yaml` is what maps every row below onto it. No input here is asked
twice because another area also needs it.

| | Required input |
|---|---|
| **L-I1** | Bank role |
| **L-I2** | Product type |
| **L-I3** | Target users |
| **L-I4** | Channels |
| **L-I5** | Client journey |
| **L-I6** | How agreement is captured |
| **L-I7** | Contract terms affected |
| **L-I8** | Pre-contractual documents affected |
| **L-I9** | Client-facing communication |
| **L-I10** | Withdrawal and termination behaviour |
| **L-I11** | Third parties and what they supply |
| **L-I12** | Content, brand and software used |
| **L-I13** | Complaints and dispute routes |
| **L-I14** | Countries the product is offered in |

---

## 5. Named checks

| Check | What it determines |
|---|---|
| **Formation check** | Whether an enforceable agreement is formed, at what moment, and whether that moment is visible to the client |
| **Distance contract check** | Whether the contract is concluded at a distance and which pre-contractual information, withdrawal and confirmation duties follow |
| **Unfair terms check** | Whether any term would be assessed as unfair against a consumer, and whether the client had a real opportunity to read it |
| **Information duties check** | Which mandatory pre-contractual documents the product type requires, in what form and at what moment |
| **Withdrawal check** | Whether the client's right to withdraw exists, how long it runs, how it is exercised, and whether the journey supports it |
| **Signature and evidence check** | Whether the way agreement is captured is legally sufficient and reconstructable afterwards |
| **Durable record check** | Whether the client receives what they agreed, in a form they can keep and reproduce |
| **Third-party rights check** | Whether the bank has the rights to the content, data, brand or software it is using |
| **Supplier contract check** | Whether the arrangement carries the clauses the regime and the bank's own policy require |
| **Dispute route check** | Whether a complaint and alternative dispute resolution route exists and is described to the client |
| **Perimeter check** | Whether the activity falls inside a permission the bank holds, and whether a third party needs one |

---

## 6. Product touchpoints

### 6.1 Forming the agreement

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **LG-01** | The client taps something that creates an obligation | Does the client tap something in the solution that creates an obligation? | L1, L2, L5 | Product has to make the moment of agreement identifiable and clear to the client, because a client who did not realise they were agreeing has not agreed |
| **LG-02** | **The contract is concluded online or by phone** | Is a contract concluded online or by phone anywhere in the solution? | L1, L3, L4 | Product has to add pre-contract information, a withdrawal route and a fourteen-day window to the journey and ask legal about a withdrawal button, because the EU rule applied from June 2026 and Czech law is not confirmed |
| **LG-03** | Terms are accepted by scrolling, a checkbox or continuing | Does the solution accept terms by scrolling, a checkbox or continuing? | L2, L1 | Product has to give the client a real chance to read the terms and split acceptance where several things are being agreed, because a bundled acceptance is weaker than separate ones |
| **LG-04** | The client signs electronically | Does the client sign electronically anywhere in the solution? | L5, L1 | Product has to match the signature level to what the document needs and keep the evidence for years, because a signature nobody can prove later is not evidence |
| **LG-05** | The client is identified remotely | Does the solution identify the client remotely? | L5, L1, and **the ICT area** | Product has to keep identification, signature and authentication as three separate steps, because a journey that conflates them leaves a gap in each |
| **LG-06** | Agreement is captured by voice or in chat | Does the solution capture agreement by voice or in chat? | L5, L6, and **the GDPR area** | Product has to make the voice or chat record complete and retrievable, because that record is the only evidence the agreement happened |

### 6.2 What the client is committed to

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **LG-07** | A new term, limit, exclusion or obligation is introduced | Does the solution introduce a new term, limit, exclusion or obligation? | L2, L3 | Product has to state the new term, limit or obligation plainly and where the client will see it, because a term that surprises a consumer is the classic unfair term |
| **LG-08** | The bank can change something unilaterally | Does the solution let the bank change something on its own? | L2, L4 | Product has to build notice, a stated reason and usually an exit route into any unilateral change, because a change clause without them is vulnerable |
| **LG-09** | The contract renews automatically | Does anything in the solution renew automatically? | L2, L4 | Product has to send a reminder before auto-renewal and give an exit, because automatic renewal is a heavily scrutinised term |
| **LG-10** | A fee applies on an event rather than on use | Does the solution apply a fee on an event rather than on use? | L2, L3, and **the Compliance area** | Product has to relate any event-based fee to what the event actually costs the bank, because penalty-shaped charges are assessed against actual cost |
| **LG-11** | The bank promises a time, a rate or an outcome | Does the solution promise the client a time, a rate or an outcome? | L10, L11 | Product has to treat a promise made in the journey as a contractual term, because it binds whether or not it appears in the contract document |
| **LG-12** | Liability is limited or excluded | Does the solution limit or exclude the bank's liability? | L10, L2 | Product has to check any liability limit against consumer rules, because some limits are constrained and some cannot be excluded at all |

### 6.3 Getting out

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **LG-13** | **The client can withdraw within a cooling-off period** | Can the client withdraw within a cooling-off period in the solution? | L4, L1, L3 | Product has to build the cooling-off period into the journey and not only into the contract, because it runs fourteen days for most distance financial services and thirty for life insurance and pension products where information came late |
| **LG-14** | The client cancels or closes in the journey | Can the client cancel or close something inside the solution's journey? | L4, L9 | Product has to make cancelling at least as easy as the rules require, because a cancellation route that ends in a branch visit is a finding waiting to happen |
| **LG-15** | Terms change for existing clients | Does the solution change terms for clients who already have the product? | L4, L2, L3 | Product has to define the notice period, the client's right to reject and what happens if they do, because changing terms for existing clients needs all three |
| **LG-16** | The bank ends the relationship | Does the solution let the bank end the relationship? | L4, L10, L9 | Product has to give notice and reasons when the bank ends the relationship, because payment accounts carry specific rules on both |

### 6.4 Documents and language

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **LG-17** | The client receives a document they can keep | Does the client receive a document they can keep? | L6, L3 | Product has to give the client a document they can keep unchanged, because a link to a live web page usually does not qualify |
| **LG-18** | A document is produced in a language | Does the solution produce a document in a particular language? | L6, L2 | Product has to produce documents in Czech for Czech consumers, because a term only available in another language is weak |
| **LG-19** | A document is generated rather than authored | Does the solution generate a document rather than someone authoring it? | L6, L2, L3 | Product has to treat the document generator as a legal artefact, because generated terms still have to be complete, consistent and readable |
| **LG-20** | The client has to find a document later | Does the client have to find a document again later? | L6, L4, and **the Compliance area** | Product has to make documents retrievable later, because retrievability is part of the obligation and part of the accessibility bar |

### 6.5 Other people's rights and other people's contracts

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **LG-21** | Third-party content, imagery, fonts or data are used | Does the solution use third-party content, imagery, fonts or data? | L7 | Product has to check the licence covers the use actually made, including showing it to clients, because client-facing display is often outside a standard licence |
| **LG-22** | Open-source or third-party software is embedded | Does the solution embed open-source or third-party software? | L7, L8 | Product has to check what the open-source licences oblige, because some reach the product itself and some require notices the client sees |
| **LG-23** | A partner's brand appears in the journey | Does a partner's brand appear anywhere in the solution's journey? | L7, L8, and **the Compliance area** | Product has to establish the right to use the partner's brand and who answers for what the client sees, because both follow from putting it in the journey |
| **LG-24** | A supplier processes something the product depends on | Does a supplier process something the solution depends on? | L8, and **the ICT and GDPR areas** | Product has to get contract clauses covering exit, audit, subcontracting and continuity, because ICT suppliers carry a specific mandatory set on top of those |
| **LG-25** | The product depends on a partner's own permission | Does the solution depend on a permission a partner holds? | L12, L8 | Product has to establish whose permission covers the activity and what happens if the partner loses it, because the product stops if it rests on a permission that lapses |

### 6.6 When it goes wrong

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **LG-26** | A complaint route is created or changed | Does the solution create a complaint route or change one? | L9, and **the Compliance area** | Product has to meet the complaint timing obligations, keep a record and tell the client about alternative dispute resolution, because all three are required of the route itself |
| **LG-27** | The client is told where to go if they disagree | Does the solution tell the client where to go if they disagree? | L9 | Product has to tell the client about the Financial Arbitrator where it applies, because the duty to inform sits with the bank |
| **LG-28** | A claim, refund or compensation route exists | Does the solution create a claim, refund or compensation route? | L9, L10, L4 | Product has to define who decides a claim, on what standard and within what time, because a refund route without those three is not a route |

### 6.7 Perimeter

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **LG-29** | The activity might need a permission | Might the activity the solution introduces need a permission the bank does not hold? | L12 | Product has to check whether the bank holds the permission the activity needs, because a missing permission turns a feature into a licensing project |
| **LG-30** | The product is offered outside Czechia | Is the solution offered outside Czechia? | L1, L2, L6, L9, L12 | Product has to check the consumer rules of any country it is offered in, because consumer law follows the consumer and another country's mandatory rules can apply to the same journey |

---

## 7. What the regimes oblige

### 7.1 Consumer contracts — L1, L2, L3, L4, L6

**Act No. 89/2012 Coll., the Civil Code.** Obligations from contracts concluded with consumers sit at
**§1810 to §1867**, and **contracts for financial services concluded at a distance at §1841 to §1851**.

A financial service contract for these purposes covers banking, credit, payment and insurance services,
supplementary pension products, currency exchange, electronic money, investment services and trading in
investment instruments, and crypto-asset services.

What follows from the distance regime: pre-contractual information in text form covering identity, the
service, total price with all fees and taxes, risks, the means of payment, contract duration, supervision,
the withdrawal procedure and the dispute route; **a fourteen-day withdrawal right** from conclusion, or
thirty days for life insurance and pension products where information arrived after conclusion; and named
exceptions, including contracts whose price depends on financial market movements and short-term travel
insurance.

Unfair terms are assessed against the consumer and a term that is not transparent is treated accordingly.

### 7.2 Consumer protection and advertising — L2, L11

**Act No. 634/1992 Coll.** on consumer protection, and the **Unfair Commercial Practices Directive**
2005/29/EC. A misleading act or omission is judged by its effect on the average consumer's decision, which
reaches design as much as copy.

### 7.3 Signature, identification and evidence — L5

**eIDAS**, Regulation (EU) No 910/2014, with Czech **Act No. 297/2016 Coll.** on trust services. Three
levels of electronic signature, and the level needed depends on what the document is and what the bank
needs to prove later. **eIDAS 2**, Regulation (EU) 2024/1183, adds the EU Digital Identity Wallet.

### 7.4 Disputes — L9

**Act No. 229/2002 Coll.** establishes the **Financial Arbitrator**, whose competence covers payment
services, consumer credit, life insurance, investment funds and currency exchange among others. The client
must be told the route exists. The **Czech Trade Inspection Authority** covers general consumer matters.

### 7.5 Perimeter and supplier arrangements — L8, L12

**Act No. 21/1992 Coll.** on banks sets what a bank may do and on what permission. Outsourcing and
third-party arrangements carry contractual requirements from the EBA guidelines and, where the dependency
is ICT, from **DORA** — carried in the ICT area.

### 7.6 Intellectual property — L7

**Act No. 121/2000 Coll.** on copyright, and the licence terms of whatever is actually used.

---

## 8. What is moving

| Instrument | State as at 27 August 2026 | What changes |
|---|---|---|
| **Distance marketing of financial services · Directive (EU) 2023/2673** | **The EU application date of 19 June 2026 has passed**, and it repealed Directive 2002/65/EC from that date. The transposition deadline was 19 December 2025. **The Czech transposing amendment was still moving through Parliament during 2026** and its final status should be confirmed before anything is scoped against it | Expanded pre-contractual information duties, rules on online presentation and dark patterns, protection where an online tool answers the client, and **a withdrawal button in the interface**. A distance journey designed now should be designed to it |
| **eIDAS 2 · EU Digital Identity Wallet** | Member State wallets expected during late 2026, acceptance obligations roughly twelve months later | Banks will have to accept the wallet for identification. An identification journey scoped now should assume it |
| **Consumer Credit Directive 2** | Applies from 20 November 2026, carried in the Compliance area | Contract and information duties for credit change with it |

**This area carries the one live gap in the four.** An EU-level date has passed and the national
implementation is not confirmed as landed. **That is a question for ČS legal rather than something this
workflow resolves**, and a distance-contract initiative should raise it rather than assume either answer.

---

## 9. Expected evidence and artefacts

Contract and terms text, with the change marked · pre-contractual information pack for the product type ·
distance-contract information set where applicable · withdrawal terms and the journey that supports them ·
unfair terms review · signature and identification design with the level chosen and why · durable medium
design · language and translation record · third-party licences covering the actual use · supplier contract
with the required clauses · complaints and alternative dispute resolution text · liability and service-level
commitments · perimeter assessment where a permission is in question · legal opinion where one was taken.

**Mandatory client-facing documents in this area**, for the level-3 clause: the pre-contractual information
set, the contract or framework contract itself, the withdrawal information, and the dispute-route
information.

**Product-specific regulated regimes**, for the level-4 clause: L12 where the activity may fall outside a
permission the bank holds, and L1 where a contract is concluded at a distance in a product type with its
own regime.

---

## 10. Discovery brief output

What the client agrees to and at what moment · which contract terms change · which pre-contractual
documents are required · how agreement is captured and at what signature level · withdrawal and termination
behaviour · notice and change-of-terms handling · language and durable-medium implications · third-party
rights relied on · supplier contract implications · complaints and dispute route · liability and promises
made · perimeter questions · required controls and evidence · unresolved questions · required specialist
approvals.

---

## 11. Escalation triggers

**Thirteen, each with an id so the flag can be checked rather than asserted.** The names are the card's own
and **the ids are ours**, for the reason §4's are: a fired trigger has to name itself, and a name a check
can resolve is what makes that testable.

**No card names the role a fired trigger routes to.** The ČS transcript
at [regulatory-map-compliance.md](../../../regulatory-research/regulatory-map-compliance.md) lists the fourteen
triggers and no roles, and the three cards written here follow it.
**`CR-D4` is not satisfiable today**, exactly as `CR-E7` is not: the flag fires, names the trigger and the
area, and says the card carries no role. It is an ask to ČS rather than something we can fill in, and
filling it in would be us deciding who at the bank reviews what.

**`fires_on` is the sub-domain whose unresolved state fires the trigger regardless** (`CR-D5`). A trigger
that exists to catch uncertainty must not be silenced by the uncertainty it exists to catch.

| | Trigger | Fires on an unresolved | Routes outside the four areas |
|---|---|---|---|
| **L-E1** | Inability to identify the moment of contract formation | L1 | — |
| **L-E2** | A new contract type | — | — |
| **L-E3** | A contract concluded at a distance in a product type not already offered that way | — | — |
| **L-E4** | A unilateral change clause | — | — |
| **L-E5** | A limitation or exclusion of liability against consumers | — | — |
| **L-E6** | A new signature or remote identification method | — | — |
| **L-E7** | An activity that may fall outside a permission the bank holds | L12 | — |
| **L-E8** | A new supplier or outsourcing arrangement the product depends on | — | — |
| **L-E9** | Third-party content or software whose licence does not clearly cover the use | — | — |
| **L-E10** | An offer to clients outside Czechia | — | — |
| **L-E11** | A new complaint or claim route | — | — |
| **L-E12** | A promise of an outcome, rate or service level | — | — |
| **L-E13** | Uncertainty about whether a national implementation is in force | — | — |

---

## 12. Primary legal sources

Act No. 89/2012 Coll., the Civil Code, §1810 to §1867 and §1841 to §1851 · Act No. 634/1992 Coll. on
consumer protection · Unfair Commercial Practices Directive 2005/29/EC · Directive (EU) 2023/2673 on
distance marketing of consumer financial services · eIDAS, Regulation (EU) No 910/2014 · eIDAS 2,
Regulation (EU) 2024/1183 · Act No. 297/2016 Coll. on trust services · Act No. 21/1992 Coll. on banks ·
Act No. 229/2002 Coll. on the Financial Arbitrator · Act No. 121/2000 Coll. on copyright · EBA guidelines
on outsourcing arrangements.

---

## 13. Product touchpoints in Czech

A Czech run's compliance sections quote these words where the run was started on build 1.3 or later; an English run, and a run started on an earlier build or recording none, quote §6. Each row carries the id and the sub-domains of its row in §6, under the group at the same place, and `repo-check` (C119) fails where the two tables differ. The questions stay in §6 only, in English: a solution's answers are keyed by §6's ids, whatever the run's language.

### 13.1 Uzavření smlouvy

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **LG-01** | Klient klepne na něco, čím vzniká závazek | L1, L2, L5 | Produkt musí zajistit, aby okamžik souhlasu byl rozpoznatelný a pro klienta jasný, protože klient, který si neuvědomil, že souhlasí, nesouhlasil |
| **LG-02** | **Smlouva se uzavírá online nebo po telefonu** | L1, L3, L4 | Produkt musí do cesty klienta doplnit předsmluvní informace, cestu k odstoupení a čtrnáctidenní lhůtu a zeptat se právního útvaru na tlačítko pro odstoupení, protože pravidlo EU se uplatňuje od června 2026 a česká transpozice zatím není potvrzena |
| **LG-03** | Podmínky se přijímají posunutím stránky, zaškrtnutím políčka nebo pokračováním | L2, L1 | Produkt musí klientovi dát skutečnou možnost podmínky přečíst a rozdělit souhlas tam, kde se souhlasí s více věcmi, protože souhlas se vším najednou je slabší než samostatné souhlasy |
| **LG-04** | Klient podepisuje elektronicky | L5, L1 | Produkt musí úroveň podpisu přizpůsobit tomu, co dokument vyžaduje, a důkazy uchovávat po léta, protože podpis, který později nikdo neprokáže, není důkazem |
| **LG-05** | Klient je identifikován na dálku | L5, L1, **oblast „ICT a bezpečnost“** | Produkt musí identifikaci, podpis a ověření držet jako tři samostatné kroky, protože cesta, která je slučuje, nechává mezeru v každém z nich |
| **LG-06** | Souhlas se zachycuje hlasem nebo v chatu | L5, L6, **oblast „GDPR a ochrana osobních údajů“** | Produkt musí zajistit, aby záznam hlasu nebo chatu byl úplný a dohledatelný, protože tento záznam je jediným důkazem, že k dohodě došlo |

### 13.2 K čemu se klient zavazuje

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **LG-07** | Zavádí se nová podmínka, limit, výluka nebo povinnost | L2, L3 | Produkt musí novou podmínku, limit nebo povinnost uvést srozumitelně a tam, kde ji klient uvidí, protože podmínka, která spotřebitele překvapí, je typickou nepřiměřenou podmínkou |
| **LG-08** | Banka může něco změnit jednostranně | L2, L4 | Produkt musí do každé jednostranné změny zabudovat oznámení, uvedený důvod a obvykle i možnost odejít, protože ujednání o změně bez nich je napadnutelné |
| **LG-09** | Smlouva se automaticky prodlužuje | L2, L4 | Produkt musí před automatickým prodloužením poslat připomínku a nabídnout možnost odejít, protože automatické prodloužení je velmi přísně posuzovaná podmínka |
| **LG-10** | Poplatek se účtuje za událost, ne za používání | L2, L3, **oblast „Compliance, pravidla jednání a produktová regulace“** | Produkt musí každý poplatek za událost vztáhnout k tomu, co událost bance skutečně stojí, protože poplatky, které mají povahu sankce, se posuzují podle skutečných nákladů |
| **LG-11** | Banka slibuje lhůtu, sazbu nebo výsledek | L10, L11 | Produkt musí slib učiněný na cestě klienta považovat za smluvní podmínku, protože zavazuje bez ohledu na to, zda je uveden ve smluvním dokumentu |
| **LG-12** | Odpovědnost se omezuje nebo vylučuje | L10, L2 | Produkt musí každé omezení odpovědnosti ověřit podle spotřebitelských pravidel, protože některá omezení jsou sama omezena a některou odpovědnost nelze vyloučit vůbec |

### 13.3 Odstoupení a ukončení

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **LG-13** | **Klient může odstoupit ve lhůtě na rozmyšlenou** | L4, L1, L3 | Produkt musí lhůtu na rozmyšlenou zabudovat do cesty klienta, a ne jen do smlouvy, protože u většiny finančních služeb na dálku trvá čtrnáct dní a u životního pojištění a penzijních produktů třicet, pokud informace přišly pozdě |
| **LG-14** | Klient v rámci cesty ruší nebo ukončuje službu | L4, L9 | Produkt musí zajistit, aby zrušení bylo nejméně tak snadné, jak pravidla vyžadují, protože cesta ke zrušení, která končí návštěvou pobočky, je zjištění, které dříve či později přijde |
| **LG-15** | Mění se podmínky pro stávající klienty | L4, L2, L3 | Produkt musí určit lhůtu pro oznámení, právo klienta změnu odmítnout a co se stane, když ji odmítne, protože změna podmínek pro stávající klienty vyžaduje všechny tři náležitosti |
| **LG-16** | Banka ukončuje vztah s klientem | L4, L10, L9 | Produkt musí při ukončení vztahu ze strany banky dodržet výpovědní lhůtu a uvést důvody, protože u platebních účtů platí pro obojí zvláštní pravidla |

### 13.4 Dokumenty a jazyk

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **LG-17** | Klient dostává dokument, který si může ponechat | L6, L3 | Produkt musí klientovi dát dokument, který si může ponechat v nezměněné podobě, protože odkaz na živou webovou stránku obvykle nestačí |
| **LG-18** | Dokument se vytváří v určitém jazyce | L6, L2 | Produkt musí dokumenty pro české spotřebitele vytvářet v češtině, protože podmínka dostupná jen v jiném jazyce je slabá |
| **LG-19** | Dokument se generuje, místo aby ho někdo napsal | L6, L2, L3 | Produkt musí generátor dokumentů považovat za právní artefakt, protože i generované podmínky musí být úplné, konzistentní a čitelné |
| **LG-20** | Klient musí dokument později dohledat | L6, L4, **oblast „Compliance, pravidla jednání a produktová regulace“** | Produkt musí zajistit, aby dokumenty byly později dohledatelné, protože dohledatelnost je součástí povinnosti i požadavků na přístupnost |

### 13.5 Práva a smlouvy třetích stran

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **LG-21** | Používá se obsah, obrázky, písma nebo data třetích stran | L7 | Produkt musí ověřit, že licence pokrývá skutečné použití včetně zobrazení klientům, protože zobrazení klientům často leží mimo standardní licenci |
| **LG-22** | Vkládá se open-source software nebo software třetích stran | L7, L8 | Produkt musí ověřit, co open-source licence ukládají, protože některé dosahují až na samotný produkt a některé vyžadují upozornění, která klient vidí |
| **LG-23** | Na cestě klienta se objevuje značka partnera | L7, L8, **oblast „Compliance, pravidla jednání a produktová regulace“** | Produkt musí zajistit právo používat značku partnera a určit, kdo odpovídá za to, co klient vidí, protože obojí plyne z umístění značky do cesty klienta |
| **LG-24** | Dodavatel zpracovává něco, na čem produkt závisí | L8, **oblasti „ICT a bezpečnost“ a „GDPR a ochrana osobních údajů“** | Produkt musí zajistit smluvní ujednání o ukončení spolupráce, auditu, subdodávkách a kontinuitě, protože pro dodavatele ICT navíc platí konkrétní povinný soubor ujednání |
| **LG-25** | Produkt závisí na vlastním povolení partnera | L12, L8 | Produkt musí zjistit, čí povolení činnost pokrývá a co se stane, když ho partner ztratí, protože produkt se zastaví, pokud stojí na povolení, které zanikne |

### 13.6 Když se něco pokazí

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **LG-26** | Vytváří se nebo mění cesta pro stížnosti | L9, **oblast „Compliance, pravidla jednání a produktová regulace“** | Produkt musí dodržet lhůty pro vyřízení stížností, vést záznam a informovat klienta o mimosoudním řešení sporů, protože všechny tři požadavky se vztahují přímo na tuto cestu |
| **LG-27** | Klient se dozvídá, kam se obrátit, pokud nesouhlasí | L9 | Produkt musí klienta informovat o finančním arbitrovi tam, kde se uplatní, protože informační povinnost leží na bance |
| **LG-28** | Existuje cesta pro nárok, vrácení peněz nebo odškodnění | L9, L10, L4 | Produkt musí určit, kdo o nároku rozhoduje, podle jakého měřítka a v jaké lhůtě, protože cesta k vrácení peněz bez těchto tří věcí není cestou |

### 13.7 Regulatorní perimetr

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **LG-29** | Činnost může vyžadovat povolení | L12 | Produkt musí ověřit, zda banka má povolení, které činnost vyžaduje, protože chybějící povolení mění funkci v licenční projekt |
| **LG-30** | Produkt se nabízí mimo Česko | L1, L2, L6, L9, L12 | Produkt musí ověřit spotřebitelská pravidla každé země, kde se nabízí, protože spotřebitelské právo následuje spotřebitele a na stejnou cestu klienta se mohou vztahovat kogentní pravidla jiné země |
