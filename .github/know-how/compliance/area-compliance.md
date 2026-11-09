<!-- GENERATED from specifications/definitions/know-how/compliance/area-compliance.md. Do not edit this copy.
     Regenerate: node .github/scripts/know-how.mjs --write
     Know-how is read by skills, never written by them. It changes through a human-owned process,
     outside any run (PD90). -->

# Area · Compliance, Conduct and Product Regulation

**Version:** 0.3 · **Date:** 29 September 2026 · **First version:** 27 August 2026 · **Status:** For review
**Owner:** Česká spořitelna · **Written by:** Igor Tadić · **Read by:** `ideation` · `mvp-option-design` · `mvp-expansion` · `prd`

> **Source.** The twelve card fields are transcribed from *Regulatory map — Compliance*, supplied by ČS on
> 26 August 2026 and held at [specifications/regulatory-research/regulatory-map-compliance.md](../../../specifications/regulatory-research/regulatory-map-compliance.md).
>
> **What is ours in this file.** §6 the touchpoints, §7 what each regime obliges in operational terms, and
> §8 what is moving. The card names regimes and states no obligation, so a producer reading it alone
> cannot tell what a rule asks for. **These sections are a reading of public law by the pilot team, not a
> compliance opinion**, and the statutory reasoning behind them is in the dossier.

---

## 1. The card

**Regulatory area.** Compliance / Conduct / Product Regulation.

**Relevant in discovery.** YES — mandatory applicability screening. Every new product or material change
should be checked for client, product, distribution, conduct and accessibility impacts.

**Related regulatory areas.** GDPR and privacy · Legal and contracts · ICT and security · AI regulation ·
outsourcing and DORA depending on third-party or ICT dependency.

---

## 2. Sub-domains

| | Sub-domain | Depends on these inputs |
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

**Product type gates five of the thirteen and is this area's highest-value single input.** Without it S2,
S6, S7, S8 and S9 are all unresolvable, and four of those five open a separate approval track.

---

## 3. Triggers

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

---

## 4. Required inputs

**Seventeen, and each carries an id so that the screen's input gating can be checked rather than
asserted.** The names are the card's own. **The ids are ours**, and they exist because a screen must name
the input that was missing whenever it cannot determine a sub-domain, which needs a handle a check can
resolve.

**Where these are collected is not this card's business.** They are collected once, across all four areas,
at framing — [screening-inputs.md](../../../specifications/definitions/know-how/compliance/screening-inputs.md) carries the joined set and
`.github/registry/screening-inputs.yaml` is what maps every row below onto it. No input here is asked
twice because another area also needs it.

| | Required input |
|---|---|
| **C-I1** | Product or service description |
| **C-I2** | Bank role |
| **C-I3** | Product type |
| **C-I4** | Target users |
| **C-I5** | Target market |
| **C-I6** | Distribution model |
| **C-I7** | Channels |
| **C-I8** | Client journey |
| **C-I9** | Pricing and fees |
| **C-I10** | Client-facing communication |
| **C-I11** | Advice or recommendation involvement |
| **C-I12** | Suitability implications |
| **C-I13** | Third parties |
| **C-I14** | Sustainability claims |
| **C-I15** | Controls |
| **C-I16** | Complaints and monitoring assumptions |
| **C-I17** | Digital interfaces, documents and authentication |

---

## 5. Named checks

Eight, transcribed. **Five sub-domains carry no named check of their own** — S6, S7, S8, S9 and S12 — which
is a property of the card and not an omission here.

| Check | What it determines |
|---|---|
| **Product governance** | Whether the initiative creates or materially changes a regulated product, service, target market, distribution strategy or client outcome. If yes, which product-governance process and approvals apply |
| **Client communication** | Which client-facing disclosures, product information, terms, sales material, scripts and digital copy are affected, whether mandatory information or document updates are required, and whether communications remain understandable and balanced |
| **Distribution** | Whether sales channel, distributor, intermediary, partner or digital journey changes, and target-market consistency, responsibilities, controls and monitoring |
| **Suitability / appropriateness** | Where investment advice, portfolio management or execution and distribution of investment products are affected, whether suitability or appropriateness processes, data collection or controls change |
| **Pricing / fees** | Any new or changed price, fee, remuneration or incentive, and its client disclosure, conflicts, product-governance and fair-value implications |
| **Conflict / inducement** | Whether the initiative introduces incentives, commissions, preferential routing, internal sales pressure or other interests that could conflict with client interests |
| **Sustainability** | Where positioning, recommendation, disclosures or marketing carry sustainability characteristics, which taxonomy, SFDR or MiFID sustainability requirements apply and what the risk of a misleading claim is |
| **Accessibility** | Whether an in-scope consumer banking service, e-commerce service, payment or identification functionality, website, app, terminal, digital document, form, authentication process or support journey is affected, and which EAA requirements and acceptance criteria follow |

---

## 6. Product touchpoints

**Ours, not the card's.** A touchpoint names the thing a product does. A producer can answer whether their
idea does it; they cannot reliably answer whether it engages *product governance*.

### 6.1 The product itself

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **TP-01** | A product that did not exist before is offered to clients | Does the solution offer clients a product that did not exist before? | S2, S1, S4, S12 | Product has to define the target market and the channels allowed to sell it before launch, because both are conditions of offering the product rather than follow-up documentation |
| **TP-02** | An existing product's features, limits or terms change materially | Does the solution change an existing product's features, limits or terms in a way a client would notice? | S2, S1, S12 | Product has to re-test the target market against the change and make drift visible in monitoring, because a product that moves outside its stated market should be caught before a client complains |
| **TP-03** | The product is offered to a client group it was not designed for | Does the solution offer a product to a client group it was not designed for? | S2, S3 | Product has to make sales outside the target market identifiable and reportable, because that is a data requirement on the product and not only a policy |
| **TP-04** | The product bundles or cross-sells another product | Does the solution bundle or cross-sell another product? | S2, S5, S1 | Product has to give each component its own target market and be able to explain the bundle price against the parts, because bundling does not merge the components' obligations |
| **TP-05** | The product is withdrawn, closed to new clients or migrated | Does the solution withdraw a product, close it to new clients, or migrate clients off it? | S2, S1, S12 | Product has to plan a communication and a route for existing clients, because withdrawing or migrating a product is itself a change of terms |

### 6.2 Money the client pays or receives

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **TP-06** | A fee, charge, spread or interest rate is introduced or changed | Does the solution introduce or change a fee, a charge, a spread or an interest rate? | S4, S1, S5 | Product has to tell clients before a fee or rate applies, in a form they can compare, because payment accounts also require the fee information document and the annual statement of fees to move |
| **TP-07** | Total cost to the client is shown or estimated in the journey | Does the solution show or estimate the total cost to the client anywhere in the journey? | S4, S1 | Product has to make the costs shown up front reconcile with what is actually charged, because investment products carry specific rules on how costs are aggregated |
| **TP-08** | Staff, a partner or an algorithm is rewarded differently depending on what the client chooses | Does the solution reward staff, a partner or an algorithm differently depending on what the client chooses? | S5, S4 | Product has to disclose any differential reward to staff, partners or an algorithm and assess it against client interest, because inducements are the most common source of a conduct finding |
| **TP-09** | A default option is pre-selected for the client | Does the solution pre-select a default option for the client? | S5, S1, S2 | Product has to justify any pre-selected default, because a default that favours the bank is a conflict of interest expressed as a design decision |
| **TP-10** | Pricing varies between clients for the same product | Does the solution price the same product differently for different clients? | S4, S5, S1, and **the GDPR area** | Product has to be able to explain why prices differ between clients, because model-driven pricing also brings automated decision-making rules |

### 6.3 What the client is told

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **TP-11** | Any client-facing screen, document, email, SMS or script changes | Does the solution change any client-facing screen, document, email, SMS or script? | S1 | Product has to have the wording reviewed against the fair, clear and not misleading standard and make marketing identifiable as marketing, because that is a legal test rather than a tone preference |
| **TP-12** | A mandatory pre-contractual document is produced or changed | Does the solution produce or change a document the client must be given before contracting? | S1, S6, S7, S9 | Product has to produce the right mandatory document in its fixed format at its fixed moment, because each product type has a different one and the timing is part of the obligation |
| **TP-13** | Terms and conditions or a framework contract change | Does the solution change terms and conditions or a framework contract? | S1, S8, and **the Legal area** | Product has to apply the notice period and the client's right to reject, because payment services set a specific notice period |
| **TP-14** | A comparison, ranking, recommendation or "best for you" is shown | Does the solution show a comparison, a ranking, a recommendation or a best-for-you result? | S1, S3, S5 | Product has to check whether the comparison or recommendation counts as regulated advice, because it is advice for some product types and a marketing claim in all of them |
| **TP-15** | A risk, limit or exclusion is described to the client | Does the solution describe a risk, a limit or an exclusion to the client? | S1, S6, S7 | Product has to give limits and exclusions the same visual weight as the benefits, because the test is whether the two are balanced |

### 6.4 Advice, assessment and decisions

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **TP-16** | The product recommends a specific option to a specific client | Does the solution recommend a specific option to a specific client? | S3, S5, S6 | Product has to collect the client data, run a suitability assessment and give the client a report, because recommending a specific option to a specific client is likely advice for investment products |
| **TP-17** | The client is asked about knowledge, experience, objectives or capacity to bear loss | Does the solution ask the client about their knowledge, experience, objectives or capacity to bear loss? | S3 | Product has to keep the client's answers as the suitability record, because those answers carry retention and quality obligations |
| **TP-18** | The client's creditworthiness is assessed | Does the solution assess the client's creditworthiness? | S9, S12, and **the AI area if a model does it** | Product has to constrain what data the assessment uses and check whether a model makes it, because a model-driven credit decision falls under the AI Act's high-risk rules |
| **TP-19** | A decision about a client is made without a person in the loop | Does the solution make a decision about a client with no person in the loop? | S1, S3, S12, and **the GDPR area** | Product has to build a route to human intervention into the journey, because automated decisions with legal or similar effect carry that right |
| **TP-20** | The client is asked about sustainability preferences | Does the solution ask the client about sustainability preferences? | S10, S3 | Product has to let the sustainability answer constrain what can be recommended, because for investment and insurance products it is a required part of the suitability assessment |

### 6.5 Who sells it and through what

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **TP-21** | A new channel opens — app, web, branch, phone, partner site | Does the solution open a new channel, such as app, web, branch, phone or a partner site? | S11, S2, S1, S13 | Product has to test each channel against the target market and meet accessibility on any digital one, because both apply per channel |
| **TP-22** | A third party introduces, distributes or white-labels the product | Does a third party introduce, distribute or white-label what the solution offers? | S11, S5, S12 | Product has to split responsibilities with the partner explicitly and set up information flowing both ways, because the partner's own conduct becomes something the bank monitors |
| **TP-23** | The product appears on a comparison site or via an affiliate | Does the solution appear on a comparison site or reach clients through an affiliate? | S11, S1, S5 | Product has to treat affiliate remuneration as an inducement and check what the affiliate claims, because the affiliate's claims become the bank's problem |
| **TP-24** | Sales targets, incentives or league tables change for staff | Does the solution change sales targets, incentives or league tables for staff? | S5, S12 | Product has to control sales pressure rather than assume it away, because incentives and league tables are a named conflict source |

### 6.6 Payments, accounts and credentials

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **TP-25** | The client initiates, authorises or receives a payment | Does the client initiate, authorise or receive a payment anywhere in the solution? | S8, S13, and **the ICT area** | Product has to apply strong customer authentication or record the exemption it relies on, because an exemption has to be a decision rather than an omission |
| **TP-26** | A payment instrument or credential is issued, changed or revoked | Does the solution issue, change or revoke a payment instrument or a credential? | S8, S1, and **the ICT area** | Product has to tell the client the issuance, blocking and liability rules, because those rules are specific and the client has to know them |
| **TP-27** | A third party accesses account data or initiates a payment on the client's behalf | Does the solution let a third party read account data or start a payment on the client's behalf? | S8, S11, and **the GDPR area** | Product has to support open-banking access rights and consent, because the interface itself is regulated |
| **TP-28** | A payment account is opened, switched or closed | Does the solution open, switch or close a payment account? | S8, S1, S4 | Product has to meet the payment accounts information and switching obligations, because they apply to opening, switching and closing alike |
| **TP-29** | A transaction is refused, held, reversed or disputed | Does the solution refuse, hold, reverse or dispute a transaction? | S8, S1, S12 | Product has to meet the timing obligations for refusals and disputes, because they are a frequent complaint source |

### 6.7 Sustainability

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **TP-30** | The product, its name or its marketing claims a sustainability characteristic | Does the solution, its name or its marketing claim a sustainability characteristic? | S10, S1 | Product has to substantiate any sustainability claim at the level it is made, because naming is separately constrained for funds |
| **TP-31** | Sustainability information is disclosed about a product or the entity | Does the solution disclose sustainability information about a product or about the bank? | S10 | Product has to follow the prescribed form and content for sustainability disclosure, because the regime is prescriptive and currently under revision |

### 6.8 Accessibility

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **TP-32** | Any client-facing website, app or web view changes | Does the solution change any client-facing website, app or web view? | S13 | Product has to meet the accessibility bar of perceivable, operable, understandable and robust, because it has been in force in Czechia since June 2025 and consumer banking is expressly in scope |
| **TP-33** | Authentication, identification or a payment step changes | Does the solution change an authentication, identification or payment step? | S13, S8 | Product has to check the authentication, identification and payment steps individually for accessibility, because a CAPTCHA, an SMS-code timeout or a signature pad each fail on their own |
| **TP-34** | A document, form, statement or contract is produced for a client | Does the solution produce a document, form, statement or contract for a client? | S13, S1 | Product has to make the document itself accessible, because a scanned image of a signed page is the common failure |
| **TP-35** | A self-service terminal, ATM or kiosk is involved | Does the solution involve a self-service terminal, an ATM or a kiosk? | S13 | Product has to include terminals, ATMs and kiosks in the accessibility scope, because they are covered in their own right |
| **TP-36** | A support journey, chat, callback or complaint route changes | Does the solution change a support journey, a chat, a callback or a complaint route? | S13, S12 | Product has to hold support, chat and complaint routes to the same accessibility bar, because support is part of the service |

### 6.9 Controls

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **TP-37** | The product generates a client complaint route or changes one | Does the solution create a route for client complaints, or change one? | S12, S1 | Product has to meet the complaint timing and record obligations and feed the results into product monitoring, because complaint data is an input to monitoring rather than a separate track |
| **TP-38** | Something about the product has to be monitored after launch | Does the solution create something that has to be monitored after launch? | S12, S2 | Product has to make sure the data needed for post-launch monitoring exists, because monitoring is an obligation and cannot run on data nobody collected |
| **TP-39** | A record has to be kept to prove what a client was told or agreed | Does the solution need a record kept to prove what a client was told or agreed? | S12, S1, S3 | Product has to keep records that can reconstruct what a client was told, because retention periods differ by product type |

---

## 7. What the regimes oblige

**Ours. Operational statements, each naming its instrument. The statutory reading is in the dossier.**

### 7.1 Product governance — S2, S11

**MiFID II** (Directive 2014/65/EU, Czech ZPKT Act No. 256/2004 Coll.) with Delegated Directive (EU)
2017/593, and **EBA Guidelines on product oversight and governance for retail banking products**
(EBA/GL/2015/18, applicable from 3 January 2017, **amended by EBA/GL/2026/07 of 30 June 2026** to cover
products with ESG features and greenwashing risk). **IDD** (Directive (EU) 2016/97, Czech Act No. 170/2018
Coll.) with Delegated Regulation (EU) 2017/2358.

What they ask for: a target market defined per product before launch, a distribution strategy consistent
with it, periodic review, monitoring of sales outside the target market, and a two-way information flow
between manufacturer and distributor. The EBA guidelines reach mortgages, personal loans, deposits,
payment accounts, payment services and electronic money, which is most of retail banking.

The ČNB expects consistent application of the MiFID II product governance requirements and has published
its position on them.

### 7.2 Client communications — S1

**Unfair Commercial Practices Directive** 2005/29/EC and Czech Act No. 634/1992 Coll. on consumer
protection, plus the sectoral standards: information must be fair, clear and not misleading, and marketing
must be identifiable as marketing.

### 7.3 Suitability and appropriateness — S3

**MiFID II** Article 25 with Delegated Regulation (EU) 2017/565. Advice and portfolio management require a
suitability assessment and a suitability report to the client. Non-advised sales of complex products
require an appropriateness test. **Sustainability preferences are part of the suitability assessment**
(Delegated Regulation (EU) 2021/1253).

### 7.4 Costs, charges and fair value — S4

**MiFID II** Article 24(4): aggregated costs and charges ex-ante and ex-post. **Payment Accounts
Directive** 2014/92/EU: a fee information document before the contract and a statement of fees at least
annually. **PRIIPs** carries cost disclosure inside the KID.

### 7.5 Conflicts and inducements — S5

**MiFID II** Articles 23 and 24(9) with Delegated Directive (EU) 2017/593, and **IDD** Articles 27 to 29.
An inducement must be designed to enhance quality of service and must not impair the duty to act in the
client's best interest, and it must be disclosed.

### 7.6 Investment products — S6

**PRIIPs Regulation** (EU) No 1286/2014 with Delegated Regulation (EU) 2017/653, applying since 1 January
2018. A key information document must be given to a retail investor **in good time before the transaction**.
Structured deposits fall in scope where they meet the definition. Czech investment services sit under
**ZPKT Act No. 256/2004 Coll.**

### 7.7 Insurance — S7

**IDD** and Czech **Act No. 170/2018 Coll.** on insurance and reinsurance distribution. A demands-and-needs
test before conclusion, and an **IPID** in the standardised format of Commission Implementing Regulation
(EU) 2017/1469 for non-life products.

### 7.8 Payments — S8

**PSD2** (Directive (EU) 2015/2366) transposed by Czech **Act No. 370/2017 Coll.** on payment services,
effective 13 January 2018. **Strong customer authentication** sits at §223 and has been required in
Czechia since 1 January 2021, with the technical standard in Delegated Regulation (EU) 2018/389.
Framework-contract information duties, execution timing, refusal, liability for unauthorised transactions
and the third-party access regime all sit here.

### 7.9 Consumer credit — S9

**Consumer Credit Directive** 2008/48/EC transposed by Czech **Act No. 257/2016 Coll.** Pre-contractual
information in the standard form, the APRC, a mandatory creditworthiness assessment, and a fourteen-day
withdrawal right. **See §8 — this regime changes on 20 November 2026.**

### 7.10 Sustainability — S10

**SFDR** (Regulation (EU) 2019/2088) and the **Taxonomy Regulation** (EU) 2020/852, plus MiFID and IDD
sustainability preferences. **ESMA's guidelines on ESG and sustainability terms in fund names** set an 80%
threshold for a fund using such a term. The EBA's 2026 amendment to the POG guidelines brings ESG features
and greenwashing risk into retail banking product governance.

### 7.11 Accessibility — S13

**European Accessibility Act**, Directive (EU) 2019/882, transposed by Czech **Act No. 424/2023 Coll.**,
**effective 28 June 2025**. Consumer banking services, e-commerce services and self-service terminals are
expressly in scope, and the act reaches banking identification, security and payment functionality.

The technical bar is **EN 301 549**, which for web content aligns to **WCAG 2.1 level AA**. A provider may
claim disproportionate burden, and that claim is itself an assessed and documented artefact rather than a
decision. The micro-enterprise exemption is under ten employees and does not reach a bank.

Oversight sits with the Ministry of Industry and Trade for the framework and the Czech Trade Inspection
Authority for services.

### 7.12 Controls and records — S12

**MiFID II** Article 16 organisational requirements, complaints-handling guidelines from ESMA and the EBA,
and record-keeping obligations that differ by product type.

---

## 8. What is moving

**The section that goes stale first.** Check it before quoting a date.

| Instrument | State as at 27 August 2026 | What changes |
|---|---|---|
| **Consumer Credit Directive 2 · (EU) 2023/2225** | **Applies from 20 November 2026.** Transposition deadline was 20 November 2025. Czech implementation is an amendment to Act No. 257/2016 Coll. | Brings buy-now-pay-later and small short-term credit into scope, revises pre-contractual information, tightens creditworthiness assessment and constrains advertising. **Roughly three months away.** Any credit initiative scoped now lands after it |
| **Retail Investment Strategy** | Member States approved it on 12 June 2026. Publication in the Official Journal was expected in September 2026 | Amends MiFID II, IDD, Solvency II, UCITS, AIFMD and PRIIPs. An enhanced inducements test rather than a ban, a value-for-money assessment for manufacturers and distributors, harmonised cost disclosure, rules on marketing and finfluencers, and a modernised PRIIPs KID. Transposition 24 months after publication, most rules 30 months, PRIIPs rules 18 months |
| **PSD3 and the Payment Services Regulation** | **Not yet applicable law.** Political agreement 27 November 2025, Council endorsement April 2026, Parliament vote May 2026. Publication expected mid to late 2026, applying around 21 months later | PSD2 and Act No. 370/2017 Coll. still govern. Any payments initiative should expect the framework to move during delivery |
| **SFDR review · "SFDR 2.0"** | In legislative process during 2026 | A simplified product categorisation. Sustainability claims made now may need re-labelling |
| **EBA POG guidelines** | **Amended 30 June 2026** by EBA/GL/2026/07 | ESG features and greenwashing risk are now inside retail banking product governance |
| **FiDA · financial data access** | Adoption expected around mid-2026, obligations phased from 2027 | Extends data access beyond payment accounts. A data-sharing initiative should expect it |

---

## 9. Expected evidence and artefacts

Transcribed from the card. The record states which the run produced, which it did not, and which are
somebody else's.

Regulatory impact assessment · product sheet · target-market assessment · approved client disclosures ·
KID or IPID where applicable · conflict-of-interest assessment · pricing and fee assessment · control list ·
RACI and sign-off · gate record · monitoring plan · training and sales materials · compliance opinion ·
accessibility scope assessment · accessibility requirements and acceptance criteria · accessibility test
evidence · remediation records · accessibility statement where applicable.

**Mandatory client-facing documents in this area**, for the level-3 clause of the complexity value: KID,
IPID, target-market assessment, approved client disclosures, and an accessibility statement.

**Product-specific regulated regimes**, for the level-4 clause: S6, S7, S8 and S9.

---

## 10. Discovery brief output

Fifteen items, transcribed. Each carries content drawn from the run or explicitly states that the run
produced none.

Applicable regulatory regimes · bank role · target client and target market · distribution model · conduct
and client risks · pricing and fee implications · required disclosures · suitability and appropriateness
impact · conflicts and incentives · ESG implications · accessibility impact · required controls and
evidence · regulatory dependencies · unresolved questions · required specialist approvals.

---

## 11. Escalation triggers

**Fourteen, each with an id so the flag can be checked rather than asserted.** The names are the card's own
and **the ids are ours**, for the reason §4's are: a fired trigger has to name itself, and a name a check
can resolve is what makes that testable.

**No card names the role a fired trigger routes to.** The ČS transcript
at [regulatory-map-compliance.md](../../../specifications/regulatory-research/regulatory-map-compliance.md) lists the fourteen
triggers and no roles, and the three cards written here follow it.
**`CR-D4` is not satisfiable today**, exactly as `CR-E7` is not: the flag fires, names the trigger and the
area, and says the card carries no role. It is an ask to ČS rather than something we can fill in, and
filling it in would be us deciding who at the bank reviews what.

**`fires_on` is the sub-domain whose unresolved state fires the trigger regardless** (`CR-D5`). A trigger
that exists to catch uncertainty must not be silenced by the uncertainty it exists to catch.

| | Trigger | Fires on an unresolved | Routes outside the four areas |
|---|---|---|---|
| **C-E1** | New regulated product | — | — |
| **C-E2** | Materially changed target market | — | — |
| **C-E3** | New advice or recommendation model | — | — |
| **C-E4** | Significant pricing or fee change | — | — |
| **C-E5** | New incentive or remuneration model | — | — |
| **C-E6** | Possible misselling risk | — | — |
| **C-E7** | Unclear product classification | — | — |
| **C-E8** | New distribution partner | — | — |
| **C-E9** | AI-driven recommendation, scoring or client decision | — | AI regulation is not one of the four areas — routing is the whole of what this workflow does about it |
| **C-E10** | Sustainability claim | — | — |
| **C-E11** | EAA applicability uncertainty | S13 | — |
| **C-E12** | Identified accessibility barrier | — | — |
| **C-E13** | Regulatory complaint or finding | — | — |
| **C-E14** | Inability to define adequate controls | S12 | — |

---

## 12. Primary legal sources

Transcribed pointers, with the citations §7 uses.

MiFID II, Directive 2014/65/EU · Czech ZPKT, Act No. 256/2004 Coll. · PRIIPs, Regulation (EU) No 1286/2014 ·
IDD, Directive (EU) 2016/97 · Czech insurance distribution, Act No. 170/2018 Coll. · PSD2, Directive (EU)
2015/2366 · Czech payment services, Act No. 370/2017 Coll. · Consumer Credit Directive 2008/48/EC ·
Czech consumer credit, Act No. 257/2016 Coll. · Consumer Credit Directive 2, Directive (EU) 2023/2225 ·
Czech consumer protection, Act No. 634/1992 Coll. · Unfair Commercial Practices, Directive 2005/29/EC ·
Payment Accounts Directive 2014/92/EU · SFDR, Regulation (EU) 2019/2088 · Taxonomy, Regulation (EU)
2020/852 · sectoral ČNB guidance · ESMA and EBA guidelines, including EBA/GL/2015/18 as amended by
EBA/GL/2026/07.

**Accessibility sources.** Directive (EU) 2019/882 · Czech Act No. 424/2023 Coll., applicable from
28 June 2025 · EN 301 549 and WCAG 2.1 level AA.

---

## 13. Product touchpoints in Czech

A Czech run's compliance sections quote these words where the run was started on build 1.3 or later; an English run, and a run started on an earlier build or recording none, quote §6. Each row carries the id and the sub-domains of its row in §6, under the group at the same place, and `repo-check` (C119) fails where the two tables differ. The questions stay in §6 only, in English: a solution's answers are keyed by §6's ids, whatever the run's language.

### 13.1 Samotný produkt

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **TP-01** | Klientům se nabízí produkt, který dosud neexistoval | S2, S1, S4, S12 | Produkt musí před spuštěním vymezit cílový trh a kanály, kterými se smí prodávat, protože obojí je podmínkou nabízení produktu, nikoli dokumentací doplňovanou dodatečně |
| **TP-02** | Vlastnosti, limity nebo podmínky existujícího produktu se podstatně mění | S2, S1, S12 | Produkt musí změnu znovu ověřit proti cílovému trhu a zajistit, aby byl posun vidět v monitoringu, protože produkt, který se dostane mimo svůj stanovený trh, je třeba zachytit dřív, než si klient stěžuje |
| **TP-03** | Produkt se nabízí skupině klientů, pro kterou nebyl navržen | S2, S3 | Produkt musí zajistit, aby prodeje mimo cílový trh byly rozpoznatelné a vykazatelné, protože jde o datový požadavek na produkt, a ne jen o pravidlo |
| **TP-04** | Produkt se prodává v balíčku s jiným produktem nebo se k němu jiný produkt doprodává | S2, S5, S1 | Produkt musí každé složce stanovit vlastní cílový trh a umět vysvětlit cenu balíčku ve vztahu k jednotlivým složkám, protože spojením do balíčku se povinnosti jednotlivých složek neslučují |
| **TP-05** | Produkt se ruší, uzavírá pro nové klienty nebo se klienti převádějí jinam | S2, S1, S12 | Produkt musí naplánovat komunikaci a cestu pro stávající klienty, protože zrušení nebo převod produktu je samo o sobě změnou podmínek |

### 13.2 Peníze, které klient platí nebo dostává

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **TP-06** | Zavádí se nebo mění poplatek, úhrada, spread nebo úroková sazba | S4, S1, S5 | Produkt musí klienty informovat dřív, než se poplatek nebo sazba začne uplatňovat, a to ve srovnatelné podobě, protože u platebních účtů se musí změnit i sdělení o poplatcích a roční výpis poplatků |
| **TP-07** | Na cestě klienta se zobrazují nebo odhadují celkové náklady | S4, S1 | Produkt musí zajistit, aby náklady zobrazené předem odpovídaly tomu, co se skutečně účtuje, protože u investičních produktů platí zvláštní pravidla pro sčítání nákladů |
| **TP-08** | Zaměstnanci, partner nebo algoritmus jsou odměňováni různě podle toho, co si klient vybere | S5, S4 | Produkt musí každou rozdílnou odměnu zaměstnanců, partnerů nebo algoritmu zveřejnit a posoudit vůči zájmu klienta, protože pobídky jsou nejčastějším zdrojem zjištění v oblasti jednání s klienty |
| **TP-09** | Klientovi je předvybrána výchozí možnost | S5, S1, S2 | Produkt musí každou předvybranou výchozí možnost zdůvodnit, protože výchozí volba, která zvýhodňuje banku, je střet zájmů zabudovaný do návrhu produktu |
| **TP-10** | Cena stejného produktu se u různých klientů liší | S4, S5, S1, **oblast „GDPR a ochrana osobních údajů“** | Produkt musí umět vysvětlit, proč se ceny mezi klienty liší, protože cenotvorba řízená modelem s sebou nese i pravidla pro automatizované rozhodování |

### 13.3 Co se klient dozví

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **TP-11** | Mění se jakákoli obrazovka, dokument, e-mail, SMS nebo scénář, se kterým se klient setká | S1 | Produkt musí nechat znění posoudit podle standardu korektní, jasné a nezavádějící komunikace a označit marketing jako marketing, protože jde o právní test, nikoli o otázku tónu |
| **TP-12** | Vytváří se nebo mění povinný předsmluvní dokument | S1, S6, S7, S9 | Produkt musí vytvořit správný povinný dokument v předepsaném formátu a v předepsaný okamžik, protože každý typ produktu má jiný a načasování je součástí povinnosti |
| **TP-13** | Mění se obchodní podmínky nebo rámcová smlouva | S1, S8, **oblast „Právo a smlouvy“** | Produkt musí dodržet lhůtu pro oznámení změny a právo klienta změnu odmítnout, protože platební služby stanoví konkrétní lhůtu pro oznámení |
| **TP-14** | Zobrazuje se srovnání, pořadí, doporučení nebo „nejlepší pro vás“ | S1, S3, S5 | Produkt musí ověřit, zda srovnání nebo doporučení není regulovaným poradenstvím, protože u některých typů produktů jím je a u všech je marketingovým tvrzením |
| **TP-15** | Klientovi se popisuje riziko, limit nebo výluka | S1, S6, S7 | Produkt musí dát limitům a výlukám stejnou vizuální váhu jako přínosům, protože se posuzuje, zda jsou obě strany vyvážené |

### 13.4 Poradenství, posouzení a rozhodnutí

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **TP-16** | Produkt doporučuje konkrétnímu klientovi konkrétní možnost | S3, S5, S6 | Produkt musí získat údaje o klientovi, provést posouzení vhodnosti a předat klientovi zprávu, protože doporučení konkrétní možnosti konkrétnímu klientovi je u investičních produktů pravděpodobně poradenstvím |
| **TP-17** | Klient je dotazován na znalosti, zkušenosti, cíle nebo schopnost nést ztrátu | S3 | Produkt musí odpovědi klienta uchovat jako záznam o vhodnosti, protože se na ně vztahují povinnosti uchování a kvality |
| **TP-18** | Posuzuje se úvěruschopnost klienta | S9, S12, **oblast AI, pokud to dělá model** | Produkt musí omezit, jaká data posouzení používá, a ověřit, zda ho provádí model, protože úvěrové rozhodnutí řízené modelem spadá pod pravidla AI Actu pro vysoce rizikové systémy |
| **TP-19** | O klientovi se rozhoduje bez účasti člověka | S1, S3, S12, **oblast „GDPR a ochrana osobních údajů“** | Produkt musí do cesty klienta zabudovat možnost lidského zásahu, protože automatizovaná rozhodnutí s právními nebo obdobnými účinky toto právo zakládají |
| **TP-20** | Klient je dotazován na preference v oblasti udržitelnosti | S10, S3 | Produkt musí zajistit, aby odpověď o udržitelnosti omezovala, co lze doporučit, protože u investičních a pojistných produktů je povinnou součástí posouzení vhodnosti |

### 13.5 Kdo produkt prodává a jakými kanály

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **TP-21** | Otevírá se nový kanál: aplikace, web, pobočka, telefon, web partnera | S11, S2, S1, S13 | Produkt musí každý kanál ověřit vůči cílovému trhu a u každého digitálního kanálu splnit požadavky na přístupnost, protože obojí platí pro každý kanál zvlášť |
| **TP-22** | Třetí strana produkt zprostředkovává, distribuuje nebo ho nabízí pod vlastní značkou | S11, S5, S12 | Produkt musí s partnerem výslovně rozdělit odpovědnosti a nastavit tok informací oběma směry, protože jednání partnera se stává něčím, co banka monitoruje |
| **TP-23** | Produkt se objevuje na srovnávacím webu nebo přes affiliate partnera | S11, S1, S5 | Produkt musí odměnu affiliate partnera posuzovat jako pobídku a kontrolovat, co partner tvrdí, protože tvrzení partnera se stávají problémem banky |
| **TP-24** | Mění se prodejní cíle, pobídky nebo žebříčky zaměstnanců | S5, S12 | Produkt musí prodejní tlak řídit, a ne předpokládat, že neexistuje, protože pobídky a žebříčky jsou výslovně uváděným zdrojem střetu zájmů |

### 13.6 Platby, účty a přístupové údaje

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **TP-25** | Klient zadává, autorizuje nebo přijímá platbu | S8, S13, **oblast „ICT a bezpečnost“** | Produkt musí uplatnit silné ověření klienta nebo zaznamenat výjimku, o kterou se opírá, protože výjimka musí být rozhodnutím, ne opomenutím |
| **TP-26** | Vydává se, mění nebo ruší platební prostředek nebo přístupový údaj | S8, S1, **oblast „ICT a bezpečnost“** | Produkt musí klientovi sdělit pravidla pro vydání, blokaci a odpovědnost, protože tato pravidla jsou konkrétní a klient je musí znát |
| **TP-27** | Třetí strana přistupuje k údajům o účtu nebo zadává platbu jménem klienta | S8, S11, **oblast „GDPR a ochrana osobních údajů“** | Produkt musí podporovat přístupová práva a souhlasy podle open bankingu, protože regulované je samo rozhraní |
| **TP-28** | Platební účet se zakládá, převádí nebo ruší | S8, S1, S4 | Produkt musí splnit informační povinnosti a povinnosti při změně platebního účtu, protože platí pro založení, převod i zrušení |
| **TP-29** | Transakce je odmítnuta, pozdržena, stornována nebo reklamována | S8, S1, S12 | Produkt musí dodržet lhůty pro odmítnutí a reklamace, protože jsou častým zdrojem stížností |

### 13.7 Udržitelnost

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **TP-30** | Produkt, jeho název nebo marketing tvrdí vlastnost v oblasti udržitelnosti | S10, S1 | Produkt musí každé tvrzení o udržitelnosti doložit na úrovni, na které je učiněno, protože pojmenování fondů je omezeno samostatně |
| **TP-31** | Zveřejňují se informace o udržitelnosti produktu nebo banky | S10 | Produkt musí u zveřejnění informací o udržitelnosti dodržet předepsanou formu a obsah, protože režim je předepsaný do detailu a právě se reviduje |

### 13.8 Přístupnost

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **TP-32** | Mění se jakýkoli web, aplikace nebo webové zobrazení pro klienty | S13 | Produkt musí splnit požadavky na přístupnost, tedy vnímatelnost, ovladatelnost, srozumitelnost a robustnost, protože v Česku platí od června 2025 a spotřebitelské bankovnictví do nich výslovně spadá |
| **TP-33** | Mění se krok ověření, identifikace nebo platby | S13, S8 | Produkt musí kroky ověření, identifikace a platby posoudit z hlediska přístupnosti každý zvlášť, protože každý z těchto prvků (CAPTCHA, časový limit SMS kódu, podpisová plocha) může selhat sám o sobě |
| **TP-34** | Pro klienta se vytváří dokument, formulář, výpis nebo smlouva | S13, S1 | Produkt musí zpřístupnit i samotný dokument, protože naskenovaný obrázek podepsané stránky je obvyklé selhání |
| **TP-35** | Jde o samoobslužný terminál, bankomat nebo kiosek | S13 | Produkt musí do rozsahu přístupnosti zahrnout terminály, bankomaty a kiosky, protože se na ně požadavky vztahují samostatně |
| **TP-36** | Mění se cesta podpory, chat, zpětné volání nebo cesta pro stížnosti | S13, S12 | Produkt musí podporu, chat a cesty pro stížnosti držet na stejné úrovni přístupnosti, protože podpora je součástí služby |

### 13.9 Kontrolní mechanismy

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **TP-37** | Produkt vytváří nebo mění cestu pro stížnosti klientů | S12, S1 | Produkt musí dodržet lhůty a evidenční povinnosti u stížností a promítat výsledky do monitoringu produktu, protože data o stížnostech jsou vstupem monitoringu, ne samostatnou agendou |
| **TP-38** | Něco na produktu je třeba po spuštění monitorovat | S12, S2 | Produkt musí zajistit, aby data potřebná pro monitoring po spuštění existovala, protože monitoring je povinnost a nemůže běžet nad daty, která nikdo nesbíral |
| **TP-39** | Je třeba uchovat záznam, který prokáže, co bylo klientovi sděleno nebo s čím souhlasil | S12, S1, S3 | Produkt musí uchovávat záznamy, ze kterých lze zpětně zjistit, co bylo klientovi sděleno, protože doby uchování se liší podle typu produktu |
