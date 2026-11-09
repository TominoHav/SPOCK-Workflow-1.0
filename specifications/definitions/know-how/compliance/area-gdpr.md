# Area · GDPR and Privacy

**Version:** 0.3 · **Date:** 29 September 2026 · **First version:** 27 August 2026 · **Status:** For review
<!-- history -->
**v0.3 drops the line asking for outputs built on this card to be marked** (BD-106), from 29 September 2026: the RegMap records that the card was written here.
**v0.2 adds §13, the touchpoints in Czech, and DP-11 names the ICT area without the sub-domain id "G13", which no card declares**, from 21 September 2026: a Czech run started on build 1.3 or later quotes it where an English run quotes §6.
**Parent contract:** [PILOT-BUSINESS-LOGIC.md](../../../PILOT-BUSINESS-LOGIC.md) v1.40.0
**Mechanism:** [compliance-guidelines.md](./compliance-guidelines.md) · **Dossier:** `specifications/regulatory-research/gdpr.md`
<!-- /history -->
**Owner:** Česká spořitelna · **Written by:** Igor Tadić · **Read by:** `ideation` · `mvp-option-design` · `mvp-expansion` · `prd`

> **This card is ours.** **ČS has supplied no card for this area.** Every field below was written by the
> pilot team on 27 August 2026 from public EU and Czech law, in the twelve-field format the supplied
> Compliance card uses, so that ČS can replace it with their own rather than start from a blank page.
>
> **Nothing here is a compliance opinion or legal advice.** The statutory reading behind it is in the
> dossier, which no producer reads.
>
> **This is the largest known gap in the four areas.** Across the eight committed runs, GDPR is the most
> frequently raised touchpoint of any regulatory concern, with ePrivacy behind it, and without this card the
> screen returns nothing for either.

---

## 1. The card

**Regulatory area.** GDPR, privacy and electronic communications.

**Relevant in discovery.** YES — mandatory applicability screening. Every initiative touching a client,
an employee or a prospect should be checked for what personal data it creates, moves, infers or exposes.

**Related regulatory areas.** Compliance and conduct · Legal and contracts · ICT and security · AI
regulation.

---

## 2. Sub-domains

| | Sub-domain | Depends on these inputs |
|---|---|---|
| **G1** | Lawful basis and purpose | purposes · lawful basis per purpose · bank role as controller or processor |
| **G2** | Transparency and client information | purposes · recipients · client journey |
| **G3** | Data minimisation and retention | categories of data · retention periods |
| **G4** | Data subject rights | purposes · client journey · systems holding the data |
| **G5** | Special category, biometric and children's data | categories of data · data subjects |
| **G6** | Automated decisions and profiling | profiling or automated decisions · effect on the client |
| **G7** | Marketing, cookies and electronic communications | marketing and tracking intent · channels |
| **G8** | Processors, joint controllers and recipients | processors · recipients · third parties |
| **G9** | International transfers | hosting and transfer locations · processors |
| **G10** | Security of processing and breach exposure | security measures · digital interfaces |
| **G11** | Accountability — DPIA, records, design | DPIA status · purposes · categories of data |
| **G12** | Banking secrecy and credit registers | recipients · third parties · product type |

**Whether personal data is processed at all is this area's gating input.** If it is not stated, every one
of the twelve returns *cannot determine*, and that is the correct output rather than a clean one.

---

## 3. Triggers

| | Trigger | Puts in play |
|---|---|---|
| **P1** | Personal data is collected that was not collected before | G1, G2, G3, G11 |
| **P2** | Existing personal data is used for a new purpose | G1, G2, G11 |
| **P3** | Data is obtained from a new source, or enriched from outside | G1, G2, G8, G12 |
| **P4** | Clients are profiled, scored or segmented | G6, G1, G11 |
| **P5** | A decision affecting a client is made without a person in the loop | G6, G2, G11 |
| **P6** | Biometric, health, or other special-category data is involved | G5, G1, G11 |
| **P7** | A child or a person under guardianship is a data subject | G5, G2 |
| **P8** | A new vendor, partner or group entity touches client data | G8, G9, G11, G12 |
| **P9** | Data is stored, processed or accessed outside the EEA | G9, G8 |
| **P10** | Marketing, tracking, analytics or cookies are involved | G7, G1, G2 |
| **P11** | Retention or deletion behaviour changes | G3, G4, G11 |
| **P12** | The client can see, export, correct or delete their data in the journey | G4, G2 |
| **P13** | Production personal data is used for testing, training or analytics | G1, G3, G10, G11 |
| **P14** | New credentials, identifiers or authentication data are handled | G5, G10, G1 |

---

## 4. Required inputs

**Sixteen, and each carries an id so that the screen's input gating can be checked rather than
asserted.** The names are the card's own. **The ids are ours**, and they exist because a screen must name
the input that was missing whenever it cannot determine a sub-domain, which needs a handle a check can
resolve.

**Where these are collected is not this card's business.** They are collected once, across all four areas,
at framing — [screening-inputs.md](./screening-inputs.md) carries the joined set and
`.github/registry/screening-inputs.yaml` is what maps every row below onto it. No input here is asked
twice because another area also needs it.

| | Required input |
|---|---|
| **G-I1** | Whether personal data is processed |
| **G-I2** | Categories of data subjects |
| **G-I3** | Categories of personal data |
| **G-I4** | Whether special-category data is present |
| **G-I5** | Purposes |
| **G-I6** | Lawful basis per purpose |
| **G-I7** | Source of the data |
| **G-I8** | Recipients |
| **G-I9** | Processors and sub-processors |
| **G-I10** | Hosting and transfer locations |
| **G-I11** | Retention periods |
| **G-I12** | Whether profiling or automated decisions occur and their effect |
| **G-I13** | Marketing and tracking intent |
| **G-I14** | Security measures |
| **G-I15** | Whether a data protection impact assessment exists or is required |
| **G-I16** | The client's route to exercise their rights |

---

## 5. Named checks

| Check | What it determines |
|---|---|
| **Lawful basis check** | Whether every purpose has a stated basis, and whether consent is being relied on where it cannot be freely given |
| **Purpose limitation check** | Whether existing data is being used for something it was not collected for, and if so what makes that lawful |
| **Minimisation and retention check** | Whether each field is needed for a stated purpose, and whether a retention period exists and is enforceable |
| **Transparency check** | Whether the privacy notice and the in-journey information cover what actually happens, at the moment it happens |
| **Rights journey check** | Whether access, rectification, erasure, restriction, portability and objection can be satisfied for the data this initiative creates |
| **Automated decision check** | Whether a decision has legal or similarly significant effect, and whether human intervention, explanation and contest exist in the journey |
| **Tracking and marketing check** | Whether consent is obtained before storage or access on the device, and whether it is as easy to refuse as to accept |
| **Third-party check** | Whether each recipient is a processor, a joint controller or a separate controller, and whether the arrangement matches |
| **Transfer check** | Whether data leaves the EEA, and on what mechanism |
| **Accountability check** | Whether a DPIA is required, whether the record of processing moves, and whether the design decisions were made before build rather than after |
| **Banking secrecy check** | Whether client information protected by banking secrecy is disclosed, and on what basis |

---

## 6. Product touchpoints

### 6.1 Collecting and holding

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **DP-01** | **The product stores personal data** — any field about an identifiable person | Does the solution store any field about an identifiable person? | G1, G2, G3, G11 | Product has to write down why it needs each stored field and cut the ones it cannot justify, because every field needs a purpose and a legal basis on record |
| **DP-02** | An identity document, photograph or selfie is captured | Does the solution capture an identity document, a photograph or a selfie? | G5, G1, G10 | Product has to say whether the image is only stored or is also matched against a face, because face matching is biometric data and needs a stronger legal condition |
| **DP-03** | The client uploads a file the bank did not ask for | Can the client upload a file the solution did not ask for? | G1, G3, G5 | Product has to decide whether unsolicited uploads are stored at all, because files the bank did not ask for routinely contain health and other sensitive data |
| **DP-04** | Free-text fields are offered to the client or to staff | Does the solution offer a free-text field to a client or to staff? | G3, G5 | Product has to justify each free-text field and say what happens to what people type into it, because free text cannot be limited in advance and is where sensitive data arrives unplanned |
| **DP-05** | Voice, video or chat is recorded | Does the solution record voice, video or chat? | G1, G2, G5 | Product has to show a notice at the moment recording starts and say whether the voice is used to identify anyone, because voice used for identification is biometric data |
| **DP-06** | Location, device or behavioural signals are captured | Does the solution capture location, device or behavioural signals? | G1, G7, G6 | Product has to say whether location, device or behaviour data is used for anything beyond running the service, because any further use needs its own legal basis |
| **DP-07** | Data is kept after the client relationship ends | Does the solution keep data after the client relationship ends? | G3, G11, G12 | Product has to set a retention period per purpose and say how deletion and legal holds interact, because banking and anti-money-laundering rules require keeping data clients can otherwise ask to erase |

### 6.2 Using it for something new

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **DP-08** | Data collected for one product is used by another | Does the solution use data that was collected for a different product? | G1, G2, G11 | Product has to name the new purpose and check it against the one the data was collected for, because reusing data across products is the most common finding in a privacy review and is invisible in a feature description |
| **DP-09** | Clients are segmented, scored or ranked | Does the solution segment, score or rank clients? | G6, G1 | Product has to state what the segment or score is used for and what it changes for the client, because ranking people is profiling whether or not a decision follows |
| **DP-10** | **A decision about a client is automated** — approval, limit, price, refusal, block | Does the solution automate a decision about a client, such as an approval, a limit, a price, a refusal or a block? | G6, G2, G11, and **the AI area** | Product has to build a route to a human, a way for the client to give their side and a way to contest, plus an explanation of how the decision works, because the Court of Justice has held credit scoring to be a decision of this kind |
| **DP-11** | A model is trained on client data | Does the solution train a model on client data? | G1, G3, and **the ICT and AI areas** | Product has to name training as its own purpose with its own basis, because using client data to train a model is not covered by the basis for running the service |
| **DP-12** | Production data is copied to a test, demo or analytics environment | Does the solution copy production data into a test, demo or analytics environment? | G1, G3, G10 | Product has to say whether real client data is copied into test, demo or analytics environments and on what basis, because copying is processing and this is the most common thing a delivery team does without noticing |

### 6.3 Telling the client and letting them act

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **DP-13** | The privacy notice needs to change | Does the solution do something with personal data that the existing privacy notice does not describe? | G2 | Product has to update the privacy notice before launch, because a product doing something the notice does not describe is running without the transparency the law requires |
| **DP-14** | Information has to reach the client at the moment something happens | Does the solution need to tell the client something at the moment it happens, rather than beforehand? | G2 | Product has to put the information at the moment the thing happens, because a notice on a website is not information given at the point a photograph is taken |
| **DP-15** | The client asks for their data, or asks for it to be deleted | Does the solution create a store of client data that a request to see or delete data would have to reach? | G4, G3 | Product has to register the new data store with the team that answers access and deletion requests, because a store nobody told them about makes the client's right fail silently |
| **DP-16** | The client withdraws consent | Does the solution rely on a consent the client can withdraw? | G1, G4, G7 | Product has to make withdrawing consent as easy as giving it and define what the product does afterwards, because a withdrawal the product ignores is not a withdrawal |
| **DP-17** | The client objects to processing or to marketing | Can a client object to what the solution does, or to marketing the solution sends? | G4, G7 | Product has to stop marketing to anyone who objects, with no exception path, because objection to direct marketing is absolute |

### 6.4 Marketing, tracking and the device

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **DP-18** | A cookie, SDK, pixel or local storage is used | Does the solution use a cookie, an SDK, a tracking pixel or local storage? | G7 | Product has to ask for consent before any cookie, SDK, pixel or local storage that is not strictly needed to deliver what the user asked for, because Czech law has required prior consent since January 2022 and analytics does not count as strictly needed |
| **DP-19** | A consent banner or preference centre changes | Does the solution change a consent banner or a preference centre? | G7, G1 | Product has to make refusing as easy as accepting and ship no pre-ticked boxes, because consent given by default is not consent |
| **DP-20** | Marketing is sent by email, SMS or push | Does the solution send marketing by email, SMS or push? | G7, G4 | Product has to obtain consent for electronic marketing and put an unsubscribe route in every message, because each message carries the obligation separately |
| **DP-21** | A third-party analytics or advertising tool is added | Does the solution add a third-party analytics or advertising tool? | G7, G8, G9 | Product has to disclose the tool as a recipient and check where its data goes, because an analytics or advertising tool is usually both a recipient and a transfer outside the EEA |
| **DP-22** | Content or offers are personalised | Does the solution personalise content or offers for a client? | G6, G7, G1 | Product has to state the legal basis for personalising, because personalisation is profiling and the basis is rarely as simple as a feature ticket assumes |

### 6.5 Other people touching the data

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **DP-23** | A vendor, SaaS tool or partner processes client data | Does a vendor, a SaaS tool or a partner process client data for the solution? | G8, G9, G10, and **the ICT area** | Product has to get a processor contract with the required content and find out who the vendor subcontracts to, because the bank stays responsible for what its processors and their subcontractors do |
| **DP-24** | Data is shared with another entity in the group | Does the solution share client data with another entity in the group? | G8, G12 | Product has to treat the other group entity as a separate recipient, because a group is not one controller by default and banking secrecy applies inside it |
| **DP-25** | Data is shared with a partner who decides what to do with it | Does the solution share client data with a partner who decides what to do with it? | G8, G2 | Product has to establish whether the partner decides anything for itself, and if so document the arrangement and summarise it for the client, because deciding makes them a controller rather than a processor |
| **DP-26** | **Data is stored or accessed outside the EEA** | Does the solution store client data outside the EEA, or let anyone reach it from outside the EEA? | G9, G8 | Product has to name a transfer mechanism, including for remote support access, because support from outside the EEA is a transfer even when no data is copied |
| **DP-27** | Data goes to a credit register or comes from one | Does the solution send data to a credit register or read data from one? | G12, G1, G2 | Product has to tell the client and name the basis, because sending data to a credit register or taking it from one is an act the client can see and act on |
| **DP-28** | A public authority requests client data | Does the solution need a route for handing client data to a public authority? | G12, G1 | Product has to check whether a route for authority requests exists and build one if it does not, because banking secrecy sets who may be told what and the product may have no path for it |

### 6.6 Keeping it safe

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **DP-29** | A new interface exposes personal data | Does the solution add an interface that exposes personal data? | G10, and **the ICT area** | Product has to define access control and logging for the new interface as part of the design, because both are design decisions with a legal consequence |
| **DP-30** | An identifier is displayed, logged or put in a URL | Does the solution display an identifier, write one to a log, or put one in a URL? | G10, G3 | Product has to keep identifiers out of URLs, because a URL leaks through browser referrers, server logs and screenshots |
| **DP-31** | Staff gain access to data they could not see before | Does the solution give staff access to data they could not see before? | G10, G3, G12 | Product has to scope staff access to what each role needs, because access scope is data minimisation in practice and banking secrecy limits it internally too |
| **DP-32** | Something could go wrong in a way that exposes client data | Could the solution fail in a way that exposes client data? | G10, G11 | Product has to plan how a breach is detected and reported, because notification runs on a 72-hour clock and may require telling clients as well |

---

## 7. What the regimes oblige

### 7.1 The core regime — G1 to G6, G8 to G11

**GDPR**, Regulation (EU) 2016/679, with Czech **Act No. 110/2019 Coll.** on personal data processing,
effective 24 April 2019. The supervisory authority is the **Úřad pro ochranu osobních údajů (ÚOOÚ)**.

Every purpose needs a lawful basis. Data is limited to what the purpose needs and kept no longer than the
purpose requires. The client is told what happens, in clear language, at a time that lets them act. The
client's rights of access, rectification, erasure, restriction, portability and objection have to be
satisfiable for whatever the initiative creates. Processing that is likely to result in high risk needs a
data protection impact assessment **before** processing starts. A personal data breach is notified to the
authority within 72 hours of awareness, and to affected clients where the risk is high.

**Automated decision-making with legal or similarly significant effect** carries its own regime: the client
gets meaningful information about the logic, and a route to human intervention, to express a view and to
contest. **The Court of Justice has held that producing a credit score which a third party draws strongly
on is itself such a decision** (Case C-634/21, *SCHUFA*), which places scoring in this regime rather than
outside it.

### 7.2 The device and electronic marketing — G7

**ePrivacy Directive** 2002/58/EC, transposed in Czechia at **§89(3) of Act No. 127/2005 Coll.** on
electronic communications. **Since 1 January 2022 Czechia operates an opt-in model**: nothing may be stored
on or read from a user's device without prior consent, unless it is strictly necessary for a service the
user explicitly requested. ÚOOÚ has audited cookie banners under its annual control plans since the grace
period ended.

This regime is separate from GDPR and applies whether or not the data is personal. **A product team that
has satisfied GDPR has not thereby satisfied this.**

### 7.3 Banking secrecy — G12

**Act No. 21/1992 Coll.** on banks protects information about a client's affairs independently of data
protection law. It constrains disclosure outward and inside a group, and it sets who may be told what and
on whose authority. **AML obligations under Act No. 253/2008 Coll.** run alongside it and supply both a
basis and a retention obligation for identification data.

### 7.4 Adjacent instruments

**Data Act**, Regulation (EU) 2023/2854, reaches data generated by connected products and cloud switching.
**eIDAS 2**, Regulation (EU) 2024/1183, brings the EU Digital Identity Wallet, which is an identity and
authentication matter carried in the ICT area and a personal data matter here.

---

## 8. What is moving

| Instrument | State as at 27 August 2026 | What changes |
|---|---|---|
| **ePrivacy Regulation** | Still not adopted. The 2002 directive and Act No. 127/2005 Coll. continue to govern | A product built on today's cookie rules should expect them to move, not to relax |
| **eIDAS 2 · EU Digital Identity Wallet** | Member States are to provide a certified wallet during late 2026, with private-sector acceptance obligations following roughly twelve months later | **Banks and other AML-obliged entities will have to accept the wallet.** An identity or onboarding initiative scoped now should assume it |
| **FiDA · financial data access** | Adoption expected around mid-2026, obligations phased from 2027 | Client-permissioned sharing of financial data beyond payment accounts, with a consent dashboard obligation |
| **Data Act** | In application | Cloud switching and data access obligations that reach vendor choices |

---

## 9. Expected evidence and artefacts

Record of processing entry · lawful basis assessment per purpose · legitimate interests assessment where
relied on · privacy notice text, and the in-journey information · data protection impact assessment where
required · processor contract and sub-processor list · joint controller arrangement where applicable ·
transfer mechanism and transfer impact assessment · retention schedule entry · rights-fulfilment route ·
consent and preference records · cookie and tracker inventory with consent evidence · access control and
logging design · breach detection and notification route · banking secrecy assessment where data leaves
the bank · DPO consultation record.

**Mandatory client-facing documents in this area**, for the level-3 clause: the privacy notice, the consent
mechanism where consent is the basis, and the information given about an automated decision.

**Product-specific regulated regimes**, for the level-4 clause: G5 special-category and biometric data,
G6 automated decisions with legal or similarly significant effect, and G9 transfers outside the EEA.

---

## 10. Discovery brief output

Whether personal data is processed and on what basis · categories of data and data subjects · whether
special-category data is involved · purposes, and any new purpose for existing data · profiling and
automated decisions and their effect on the client · recipients, processors and group sharing · transfers
outside the EEA and the mechanism · retention and deletion behaviour · the client's route to exercise
rights · tracking and marketing implications · whether a DPIA is required · banking secrecy implications ·
required controls and evidence · unresolved questions · required specialist approvals.

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
| **G-E1** | Special-category or biometric data | — | — |
| **G-E2** | A child or a person under guardianship as a data subject | — | — |
| **G-E3** | An automated decision with legal or similarly significant effect | — | where it is model-driven the Compliance area's AI trigger fires alongside, and both say AI regulation is not one of the four |
| **G-E4** | Large-scale systematic monitoring | — | — |
| **G-E5** | A new transfer outside the EEA | — | — |
| **G-E6** | A data protection impact assessment indicated | G11 | — |
| **G-E7** | A new processor with access to client data | — | — |
| **G-E8** | Client data used for a purpose other than the one it was collected for | — | — |
| **G-E9** | Production personal data in a non-production environment | — | — |
| **G-E10** | Disclosure engaging banking secrecy | — | — |
| **G-E11** | A credit register interaction | — | — |
| **G-E12** | Inability to state a lawful basis for a stated purpose | G1 | — |
| **G-E13** | A personal data breach route that does not exist | — | — |

---

## 12. Primary legal sources

GDPR, Regulation (EU) 2016/679 · Czech Act No. 110/2019 Coll. on personal data processing · ePrivacy
Directive 2002/58/EC · Czech Act No. 127/2005 Coll. on electronic communications, §89(3) · Act No. 21/1992
Coll. on banks, banking secrecy · Act No. 253/2008 Coll. on measures against money laundering · Data Act,
Regulation (EU) 2023/2854 · eIDAS 2, Regulation (EU) 2024/1183 · EDPB guidelines and ÚOOÚ guidance ·
Court of Justice, Case C-634/21 (*SCHUFA*).

---

## 13. Product touchpoints in Czech

A Czech run's compliance sections quote these words where the run was started on build 1.3 or later; an English run, and a run started on an earlier build or recording none, quote §6. Each row carries the id and the sub-domains of its row in §6, under the group at the same place, and `repo-check` (C119) fails where the two tables differ. The questions stay in §6 only, in English: a solution's answers are keyed by §6's ids, whatever the run's language.

### 13.1 Sběr a uchovávání

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **DP-01** | **Produkt ukládá osobní údaje**, tedy jakékoli pole o identifikovatelné osobě | G1, G2, G3, G11 | Produkt musí u každého ukládaného pole zapsat, proč ho potřebuje, a vypustit ta, která zdůvodnit nedokáže, protože každé pole potřebuje zaznamenaný účel a právní základ |
| **DP-02** | Pořizuje se snímek dokladu totožnosti, fotografie nebo selfie | G5, G1, G10 | Produkt musí uvést, zda se snímek jen ukládá, nebo se i porovnává s obličejem, protože porovnání obličeje pracuje s biometrickými údaji a vyžaduje přísnější právní podmínku |
| **DP-03** | Klient nahrává soubor, o který banka nežádala | G1, G3, G5 | Produkt musí rozhodnout, zda se nevyžádané soubory vůbec ukládají, protože soubory, o které banka nežádala, běžně obsahují údaje o zdraví a další citlivé údaje |
| **DP-04** | Klientovi nebo zaměstnancům se nabízejí pole pro volný text | G3, G5 | Produkt musí každé pole pro volný text zdůvodnit a určit, co se stane s tím, co do něj lidé napíší, protože volný text nelze předem omezit a právě tudy neplánovaně přicházejí citlivé údaje |
| **DP-05** | Nahrává se hlas, video nebo chat | G1, G2, G5 | Produkt musí zobrazit upozornění ve chvíli, kdy nahrávání začíná, a uvést, zda se hlas používá k identifikaci, protože hlas použitý k identifikaci je biometrický údaj |
| **DP-06** | Zaznamenávají se údaje o poloze, zařízení nebo chování | G1, G7, G6 | Produkt musí uvést, zda se údaje o poloze, zařízení nebo chování používají k čemukoli nad rámec provozu služby, protože každé další použití potřebuje vlastní právní základ |
| **DP-07** | Údaje se uchovávají i po skončení vztahu s klientem | G3, G11, G12 | Produkt musí pro každý účel stanovit dobu uchování a určit, jak se výmaz a zákonné uchování navzájem ovlivňují, protože bankovní předpisy a předpisy proti praní peněz vyžadují uchovávat údaje, jejichž výmaz by jinak klient mohl požadovat |

### 13.2 Použití k novému účelu

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **DP-08** | Údaje získané pro jeden produkt používá jiný produkt | G1, G2, G11 | Produkt musí pojmenovat nový účel a porovnat ho s účelem, pro který byly údaje získány, protože opakované použití údajů napříč produkty je nejčastějším zjištěním při posouzení ochrany osobních údajů a v popisu funkce není vidět |
| **DP-09** | Klienti se segmentují, skórují nebo řadí | G6, G1 | Produkt musí uvést, k čemu segment nebo skóre slouží a co pro klienta mění, protože řazení lidí je profilování bez ohledu na to, zda z něj plyne rozhodnutí |
| **DP-10** | **Rozhodnutí o klientovi je automatizované**: schválení, limit, cena, zamítnutí, blokace | G6, G2, G11, **oblast AI** | Produkt musí zajistit cestu k člověku, možnost klienta vyjádřit svůj názor a rozhodnutí napadnout a také vysvětlení, jak rozhodnutí funguje, protože Soudní dvůr EU označil úvěrové skórování za rozhodnutí tohoto druhu |
| **DP-11** | Na údajích klientů se trénuje model | G1, G3, **oblasti „ICT a bezpečnost“ a AI** | Produkt musí trénování pojmenovat jako samostatný účel s vlastním právním základem, protože použití údajů klientů k trénování modelu nepokrývá základ pro provoz služby |
| **DP-12** | Produkční data se kopírují do testovacího, ukázkového nebo analytického prostředí | G1, G3, G10 | Produkt musí uvést, zda se skutečné údaje klientů kopírují do testovacího, ukázkového nebo analytického prostředí a na jakém základě, protože kopírování je zpracováním a jde o nejčastější věc, kterou vývojový tým udělá, aniž si toho všimne |

### 13.3 Informování klienta a výkon jeho práv

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **DP-13** | Je třeba změnit informace o zpracování osobních údajů | G2 | Produkt musí informace o zpracování osobních údajů aktualizovat před spuštěním, protože produkt, který dělá něco, co tyto informace nepopisují, běží bez transparentnosti, kterou zákon vyžaduje |
| **DP-14** | Informace se ke klientovi musí dostat ve chvíli, kdy se něco děje | G2 | Produkt musí informaci poskytnout ve chvíli, kdy k dané věci dochází, protože upozornění na webu není informací poskytnutou ve chvíli pořízení fotografie |
| **DP-15** | Klient žádá o své údaje nebo o jejich výmaz | G4, G3 | Produkt musí nové úložiště údajů nahlásit týmu, který vyřizuje žádosti o přístup a výmaz, protože úložiště, o kterém tým neví, způsobí, že právo klienta tiše selže |
| **DP-16** | Klient odvolává souhlas | G1, G4, G7 | Produkt musí zajistit, aby odvolání souhlasu bylo stejně snadné jako jeho udělení, a určit, co produkt udělá potom, protože odvolání, které produkt ignoruje, není odvoláním |
| **DP-17** | Klient vznáší námitku proti zpracování nebo proti marketingu | G4, G7 | Produkt musí přestat oslovovat marketingem každého, kdo vznese námitku, bez jakékoli výjimky, protože námitka proti přímému marketingu je absolutní |

### 13.4 Marketing, sledování a zařízení

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **DP-18** | Používá se cookie, SDK, pixel nebo lokální úložiště | G7 | Produkt musí požádat o souhlas před použitím jakékoli cookie, SDK, pixelu nebo lokálního úložiště, které nejsou nezbytně nutné k poskytnutí toho, oč uživatel požádal, protože český zákon vyžaduje předchozí souhlas od ledna 2022 a analytika se za nezbytně nutnou nepovažuje |
| **DP-19** | Mění se lišta pro souhlas nebo centrum preferencí | G7, G1 | Produkt musí zajistit, aby odmítnutí bylo stejně snadné jako přijetí, a nesmí mít předem zaškrtnutá políčka, protože souhlas udělený ve výchozím nastavení není souhlasem |
| **DP-20** | Marketing se rozesílá e-mailem, SMS nebo push notifikací | G7, G4 | Produkt musí získat souhlas s elektronickým marketingem a do každé zprávy vložit možnost odhlášení, protože povinnost se vztahuje na každou zprávu zvlášť |
| **DP-21** | Přidává se analytický nebo reklamní nástroj třetí strany | G7, G8, G9 | Produkt musí nástroj uvést jako příjemce a ověřit, kam jeho data proudí, protože analytický nebo reklamní nástroj je obvykle příjemcem a zároveň předáním mimo EHP |
| **DP-22** | Obsah nebo nabídky se personalizují | G6, G7, G1 | Produkt musí uvést právní základ personalizace, protože personalizace je profilování a její základ je málokdy tak jednoduchý, jak předpokládá zadání funkce |

### 13.5 Další subjekty, které s údaji pracují

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **DP-23** | Údaje klientů zpracovává dodavatel, SaaS nástroj nebo partner | G8, G9, G10, **oblast „ICT a bezpečnost“** | Produkt musí zajistit zpracovatelskou smlouvu s požadovaným obsahem a zjistit, komu dodavatel zadává subdodávky, protože banka zůstává odpovědná za to, co dělají její zpracovatelé a jejich subdodavatelé |
| **DP-24** | Údaje se sdílejí s jinou společností ve skupině | G8, G12 | Produkt musí jinou společnost skupiny považovat za samostatného příjemce, protože skupina není automaticky jedním správcem a bankovní tajemství platí i uvnitř ní |
| **DP-25** | Údaje se sdílejí s partnerem, který sám rozhoduje, co s nimi udělá | G8, G2 | Produkt musí zjistit, zda partner o něčem rozhoduje sám, a pokud ano, zdokumentovat ujednání a klientovi ho shrnout, protože rozhodování z něj dělá správce, nikoli zpracovatele |
| **DP-26** | **Údaje se ukládají nebo jsou přístupné mimo EHP** | G9, G8 | Produkt musí určit mechanismus předání, a to i pro vzdálený přístup podpory, protože podpora mimo EHP je předáním, i když se žádná data nekopírují |
| **DP-27** | Údaje se předávají do úvěrového registru nebo se z něj získávají | G12, G1, G2 | Produkt musí klienta informovat a uvést právní základ, protože předání údajů do úvěrového registru nebo jejich převzetí z něj je úkon, který klient vidí a na který může reagovat |
| **DP-28** | Orgán veřejné moci žádá o údaje klienta | G12, G1 | Produkt musí ověřit, zda existuje cesta pro žádosti úřadů, a pokud ne, vytvořit ji, protože bankovní tajemství určuje, komu se smí co sdělit, a produkt pro to nemusí mít žádnou cestu |

### 13.6 Zabezpečení

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **DP-29** | Nové rozhraní zpřístupňuje osobní údaje | G10, **oblast „ICT a bezpečnost“** | Produkt musí řízení přístupu a logování nového rozhraní definovat jako součást návrhu, protože obojí je návrhové rozhodnutí s právním důsledkem |
| **DP-30** | Identifikátor se zobrazuje, loguje nebo vkládá do URL | G10, G3 | Produkt musí identifikátory držet mimo URL, protože URL uniká přes referrer prohlížeče, serverové logy a snímky obrazovky |
| **DP-31** | Zaměstnanci získávají přístup k údajům, které dosud neviděli | G10, G3, G12 | Produkt musí přístup zaměstnanců omezit na to, co každá role potřebuje, protože rozsah přístupu je minimalizace údajů v praxi a bankovní tajemství ho omezuje i uvnitř banky |
| **DP-32** | Něco se může pokazit tak, že budou vyzrazeny údaje klientů | G10, G11 | Produkt musí naplánovat, jak se únik zjistí a ohlásí, protože ohlášení podléhá 72hodinové lhůtě a může vyžadovat i informování klientů |
