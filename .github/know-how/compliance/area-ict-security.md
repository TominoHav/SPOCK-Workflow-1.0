<!-- GENERATED from specifications/definitions/know-how/compliance/area-ict-security.md. Do not edit this copy.
     Regenerate: node .github/scripts/know-how.mjs --write
     Know-how is read by skills, never written by them. It changes through a human-owned process,
     outside any run (PD90). -->

# Area · ICT and Security

**Version:** 0.2 · **Date:** 21 September 2026 · **First version:** 27 August 2026 · **Status:** For review
**Owner:** Česká spořitelna · **Written by:** Igor Tadić · **Read by:** `ideation` · `mvp-option-design` · `mvp-expansion` · `prd`

> **This card is ours.** **ČS has supplied no card for this area.** Every field below was written by the
> pilot team on 27 August 2026 from public EU and Czech law, in the twelve-field format the supplied
> Compliance card uses.
>
> **Nothing here is a security assessment.** It names which regulated obligations an initiative engages,
> not whether a design is secure. The bank's own security engineering standards sit outside this card and
> are not reproduced here.
>
> **The boundary with the other three.** GDPR asks whether personal data is protected. This area asks
> whether the bank's regulated obligations for operational resilience, authentication, third-party ICT
> dependency and incident reporting are engaged, whether personal data is involved or not.

---

## 1. The card

**Regulatory area.** ICT risk, digital operational resilience and cyber security.

**Relevant in discovery.** YES — mandatory applicability screening. Any initiative that adds a system, a
dependency, an interface or an authentication step changes the bank's ICT risk position.

**Related regulatory areas.** Compliance and conduct · GDPR and privacy · Legal and contracts · AI
regulation · outsourcing.

---

## 2. Sub-domains

| | Sub-domain | Depends on these inputs |
|---|---|---|
| **I1** | ICT risk management and governance | systems affected · criticality · bank role |
| **I2** | Authentication, identification and access control | digital interfaces and authentication · client journey |
| **I3** | ICT third-party dependency and concentration | third parties · hosting · criticality |
| **I4** | Incident detection, classification and reporting | systems affected · criticality · monitoring assumptions |
| **I5** | Operational resilience, continuity and exit | criticality · third parties · recovery expectations |
| **I6** | Change, testing and release assurance | systems affected · release approach |
| **I7** | Secure development and vulnerability management | systems affected · components used |
| **I8** | Cryptography, keys and credentials | digital interfaces and authentication · data at rest and in transit |
| **I9** | Logging, monitoring and auditability | systems affected · controls |
| **I10** | Hosting, data location and cloud | hosting and transfer locations · third parties |
| **I11** | Fraud prevention and transaction monitoring | product type · client journey |
| **I12** | Regulated cyber obligations and notifications | systems affected · whether the service is a regulated service |

**Whether the affected system supports a critical or important function is this area's gating input.** It
decides whether the heavier obligations of I3, I4 and I5 apply or whether the initiative sits inside the
ordinary framework.

---

## 3. Triggers

| | Trigger | Puts in play |
|---|---|---|
| **K1** | A new system, service or component is introduced | I1, I6, I7, I9 |
| **K2** | An existing system supporting a client-facing service changes materially | I1, I5, I6, I9 |
| **K3** | **A new third party, vendor or cloud service is depended on** | I3, I5, I10, I1 |
| **K4** | Authentication, identification or authorisation changes | I2, I8, and the Compliance area's payments sub-domain |
| **K5** | A payment can be initiated or authorised | I2, I11, I8 |
| **K6** | A new external interface or API is exposed | I2, I7, I9, I10 |
| **K7** | Data is hosted or processed in a new location | I10, I3, and **the GDPR area** |
| **K8** | The service becomes something clients depend on being available | I5, I4, I1 |
| **K9** | Credentials, keys, tokens or secrets are created or handled | I8, I2 |
| **K10** | Fraud exposure changes | I11, I4, I2 |
| **K11** | A new logging, monitoring or alerting need arises | I9, I4 |
| **K12** | Release cadence, environment or deployment approach changes | I6, I7, I5 |
| **K13** | Third-party or open-source components are added | I7, I3 |
| **K14** | The initiative touches a service the bank has registered as regulated | I12, I4, I1 |

---

## 4. Required inputs

**Fourteen, and each carries an id so that the screen's input gating can be checked rather than
asserted.** The names are the card's own. **The ids are ours**, and they exist because a screen must name
the input that was missing whenever it cannot determine a sub-domain, which needs a handle a check can
resolve.

**Where these are collected is not this card's business.** They are collected once, across all four areas,
at framing — [screening-inputs.md](../../../specifications/definitions/know-how/compliance/screening-inputs.md) carries the joined set and
`.github/registry/screening-inputs.yaml` is what maps every row below onto it. No input here is asked
twice because another area also needs it.

| | Required input |
|---|---|
| **S-I1** | Systems affected |
| **S-I2** | Whether they support a critical or important function |
| **S-I3** | Bank role |
| **S-I4** | Third parties and what they supply |
| **S-I5** | Hosting and data location |
| **S-I6** | Digital interfaces and authentication |
| **S-I7** | Client journey |
| **S-I8** | Components and libraries used |
| **S-I9** | Data at rest and in transit |
| **S-I10** | Release and environment approach |
| **S-I11** | Recovery expectations |
| **S-I12** | Monitoring and alerting assumptions |
| **S-I13** | Fraud exposure |
| **S-I14** | Whether the affected service is one the bank has registered under the cyber regime |

---

## 5. Named checks

| Check | What it determines |
|---|---|
| **Criticality check** | Whether the affected system supports a critical or important function, which decides how much of the rest applies |
| **Authentication check** | Whether strong customer authentication applies, whether an exemption is relied on, and whether identification, authentication and signature are correctly separated |
| **Third-party check** | Whether a new ICT third-party dependency is created, whether it must be entered in the register of information, and whether the contract carries the mandatory clauses |
| **Concentration check** | Whether the dependency increases concentration on a provider the bank already relies on |
| **Incident check** | Whether the initiative changes what must be detected, classified and reported, and within what clock |
| **Resilience and exit check** | Whether recovery objectives are stated, whether continuity is possible without the provider, and whether an exit is executable |
| **Change assurance check** | Whether testing, environments and release controls cover the change, including resilience testing where designated |
| **Secure development check** | Whether components are known, tracked and patchable, and whether the development approach meets the standard |
| **Cryptography check** | Whether keys, credentials and secrets have an owner, a lifecycle and a rotation route |
| **Auditability check** | Whether what happened can be reconstructed afterwards, by someone who was not there |
| **Regulated service check** | Whether the affected service falls inside the bank's registration under the cyber regime, and what notification follows |

---

## 6. Product touchpoints

### 6.1 Getting in

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **IT-01** | The client logs in, or the login changes | Does the client log in anywhere in the solution, or does the solution change how login works? | I2, I8 | Product has to specify how strong the login is, how sessions end and how recovery works, because payment services regulate authentication and the same bar is expected elsewhere |
| **IT-02** | **The client authorises a payment** | Does the client authorise a payment anywhere in the solution? | I2, I11, and **the Compliance area** | Product has to apply strong customer authentication or record which exemption it relies on, because relying on an exemption is a decision somebody has to be able to point to |
| **IT-03** | A one-time code, push approval or biometric is used | Does the solution use a one-time code, a push approval or a biometric? | I2, I8, and **the GDPR area** | Product has to check the two factors are genuinely independent and say whether biometrics are used, because biometrics move the data into a stricter regime |
| **IT-04** | The client recovers access after losing a factor | Does the solution let a client recover access after losing a factor? | I2, I11 | Product has to design the recovery path to the same standard as the login, because recovery is where authentication is usually weakest and where account takeover happens |
| **IT-05** | The client is identified for the first time | Does the solution identify a client for the first time? | I2, and **the Legal and GDPR areas** | Product has to treat identification, authentication and signature as three separate steps, because a journey that merges them leaves a gap in all three |
| **IT-06** | A device or session is remembered | Does the solution remember a device or a session? | I2, I8 | Product has to record remembering a device as an exemption decision, because it lowers the authentication bar rather than just improving convenience |

### 6.2 Depending on other people

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **IT-07** | **A vendor, SaaS product or cloud service is introduced** | Does the solution introduce a vendor, a SaaS product or a cloud service? | I3, I5, I10, and **the Legal area** | Product has to put the vendor contract, the register entry and an exit plan into the delivery plan, because the integration cannot go live without all three |
| **IT-08** | The dependency supports something clients rely on | Does anything the solution depends on support something clients rely on? | I3, I5, I1 | Product has to say whether the dependency supports a critical or important function, because that answer raises the bar on contract terms, testing, continuity and reporting |
| **IT-09** | The provider is one the bank already depends on heavily | Is a provider the solution uses one the bank already depends on heavily? | I3 | Product has to check the provider against what the bank already uses, because concentration is assessed at bank level and a sensible local choice can be the wrong one |
| **IT-10** | The provider subcontracts part of the service | Does a provider the solution uses subcontract part of its service? | I3, I5, and **the GDPR area** | Product has to find out who the provider subcontracts to and confirm the terms flow down, because the bank stays responsible along the whole chain |
| **IT-11** | Leaving the provider would be hard | Would leaving a provider the solution depends on be hard? | I5, I3 | Product has to design for leaving the provider, because exit has to be possible without unacceptable disruption and that constrains the product |
| **IT-12** | An open-source or third-party component is added | Does the solution add an open-source or third-party component? | I7, I3, and **the Legal area** | Product has to inventory the component and plan how it gets patched, because a component nobody tracks cannot be fixed when a vulnerability appears |

### 6.3 Where it runs and where the data sits

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **IT-13** | Data is stored in a new location or a new cloud region | Does the solution store data in a new location or a new cloud region? | I10, I3, and **the GDPR area** | Product has to answer where the data sits both as a resilience question and as a transfer question, because those two have different answers |
| **IT-14** | Support or administration happens from outside the EEA | Does the solution involve support or administration from outside the EEA? | I10, I3, and **the GDPR area** | Product has to count remote support from outside the EEA as access to the data, because access does not require a copy |
| **IT-15** | A new environment is created | Does the solution create a new environment? | I6, I10, and **the GDPR area** | Product has to say whether the new environment holds real client data, because production data in non-production environments is a recurring finding |

### 6.4 Exposing an interface

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **IT-16** | A new API or integration is exposed | Does the solution expose a new API or integration? | I2, I7, I9, I10 | Product has to define who may call the interface, how it gets security tested, what it logs and where it runs, because the bank must evidence each one separately |
| **IT-17** | A third party accesses accounts or initiates payments | Does a third party read accounts or start payments through the solution? | I2, I3, and **the Compliance area** | Product has to meet the open-banking interface's own availability, performance and reporting obligations, because they apply to the interface and not only to the service behind it |
| **IT-18** | A webhook, callback or partner push is accepted | Does the solution accept a webhook, a callback or a push from a partner? | I2, I7, I9 | Product has to define what it accepts from the partner and how it verifies it, because inbound trust is usually designed last and is where the weakness sits |

### 6.5 When something goes wrong

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **IT-19** | **The service could fail in a way clients notice** | Could the solution fail in a way clients would notice? | I4, I5, I1 | Product has to make the failure classifiable quickly, because major incidents run on a reporting clock that starts before anyone has diagnosed the cause |
| **IT-20** | A new failure mode is introduced | Does the solution introduce a way of failing that did not exist before? | I5, I4 | Product has to state recovery time and data loss objectives, because they cannot be assumed after the fact |
| **IT-21** | Fraud exposure changes | Does the solution change how exposed the bank or the client is to fraud? | I11, I4, I2 | Product has to update fraud detection alongside the product and confirm the reporting route, because detection tuned to the old journey misses the new one |
| **IT-22** | The initiative changes what is logged | Does the solution change what is written to a log? | I9, I4 | Product has to log enough for someone who was not there to reconstruct what happened, because that is the bar the logs are judged against |
| **IT-23** | A vulnerability is found in something the product uses | Does the solution use something a vulnerability could be found in? | I7, I4 | Product has to know how it would patch the component and how fast, because some products cannot be patched at all without a full release |

### 6.6 Building and releasing

| | Touchpoint | Question | Engages | What it means for the product |
|---|---|---|---|---|
| **IT-24** | Release cadence or deployment approach changes | Does the solution change how often or how releases are deployed? | I6, I5 | Product has to match change controls to how critical the service is, because a faster release cadence on a critical service raises the control requirement |
| **IT-25** | Testing scope changes | Does the solution change what is tested? | I6, I7, I5 | Product has to say whether resilience testing applies, because it is a designated obligation for some entities and functions rather than optional practice |
| **IT-26** | Secrets, keys or certificates are introduced | Does the solution introduce a secret, a key or a certificate? | I8, I9 | Product has to name an owner, a rotation schedule and an expiry process for every secret and certificate, because an expired certificate is an outage |
| **IT-27** | The affected service is one the bank registered under the cyber regime | Does the solution affect a service the bank registered under the cyber regime? | I12, I4, I1 | Product has to check whether the service is one the bank registered under the cyber regime, because that brings security and incident-reporting duties and Czech rules go beyond the EU minimum |

---

## 7. What the regimes oblige

### 7.1 Digital operational resilience — I1, I3, I4, I5, I6

**DORA**, Regulation (EU) 2022/2554, **fully applicable since 17 January 2025**, reaching all EU banks
including branches of third-country banks.

An ICT risk management framework. Classification of incidents against set criteria, with **major incidents
reported on a staged clock — an initial report, an intermediate report and a final report**. A **register
of information** covering every ICT third-party contractual arrangement, maintained and reportable.
**Mandatory contractual content** for ICT third-party arrangements under Article 30: service description,
service levels, the entity's and the regulator's audit and access rights, data security, continuity
obligations, sub-contracting terms, and termination and exit. Concentration risk assessed. **Threat-led
penetration testing** for designated entities and functions.

Providers designated as critical ICT third parties come under direct European supervisory authority
oversight. **The first designations were made in November 2025 and include the major cloud providers**,
which means an ordinary cloud choice can now sit inside a supervised relationship.

### 7.2 Cyber security — I12, I4, I1

**NIS2**, Directive (EU) 2022/2555, transposed in Czechia by **Act No. 264/2025 Sb.**, the new
Cybersecurity Act, **in force since 1 November 2025**. The supervisory authority is **NÚKIB**.

Regulated entities identify their regulated services and register with NÚKIB, with security measures and
incident reporting obligations running from a period after registration is confirmed. **The Czech act goes
beyond the directive in two ways that matter to a product team**: reporting reaches all cyber security
incidents rather than only significant ones, and supply chain security obligations are extensive.

For a bank, DORA is the sector-specific regime and takes precedence where the two overlap, but the Czech
cyber act still reaches services the bank has registered.

### 7.3 Authentication — I2, I8

**PSD2**, Directive (EU) 2015/2366, transposed by Czech **Act No. 370/2017 Coll.**, with strong customer
authentication at **§223** and **required in Czechia since 1 January 2021**. The technical standard is
**Delegated Regulation (EU) 2018/389**, which also sets the exemptions and the requirements for interfaces
serving third-party providers.

Two independent elements from knowledge, possession and inherence, with dynamic linking for remote payment
transactions. **An exemption is a decision to be recorded, not a default.**

### 7.4 ICT risk and outsourcing guidance — I1, I3, I5

**EBA Guidelines on ICT and security risk management** (EBA/GL/2019/04) and **EBA Guidelines on
outsourcing arrangements** (EBA/GL/2019/02), alongside ČNB supervisory expectations. DORA has absorbed much
of the ICT content, and the outsourcing guidelines continue to reach non-ICT arrangements.

### 7.5 Product security — I7

**Cyber Resilience Act**, Regulation (EU) 2024/2847, sets security requirements for products with digital
elements, with obligations phasing in. It reaches software the bank places on the market rather than
software it merely uses, and a client-installed component can fall inside it.

### 7.6 Security of processing — I8, I9, I10

**GDPR** Articles 32 to 34 sit alongside all of the above wherever personal data is involved, with the
**72-hour breach notification** to the supervisory authority. The two incident regimes have different
triggers, different clocks and different recipients, and **an incident can be reportable under one and not
the other**.

---

## 8. What is moving

| Instrument | State as at 27 August 2026 | What changes |
|---|---|---|
| **Czech Cybersecurity Act · Act No. 264/2025 Sb.** | In force since 1 November 2025. **Registration and the obligation clocks are running through 2026 for affected entities** | Which services are registered decides what I12 reaches. A product team should ask rather than assume |
| **PSD3 and the Payment Services Regulation** | Political agreement reached, not yet applicable law. Expected to apply around 21 months after publication | Authentication rules, fraud liability and third-party interface obligations all move. An authentication design scoped now should expect it |
| **Cyber Resilience Act** | Obligations phasing in following its 2024 adoption | Reaches products with digital elements placed on the market |
| **DORA critical provider oversight** | First designations made November 2025 | A cloud dependency may now sit inside a directly supervised relationship |
| **eIDAS 2 · EU Digital Identity Wallet** | Wallets expected during late 2026, acceptance obligations roughly twelve months later | Adds an identification route the bank will have to accept |

---

## 9. Expected evidence and artefacts

Criticality assessment for the affected function · ICT risk assessment · register of information entry for
any new ICT third-party arrangement · third-party contract carrying the mandatory clauses · concentration
assessment · exit strategy and its test · continuity and recovery objectives · incident classification and
reporting route · resilience testing scope where designated · authentication design with the level and any
exemption relied on and why · cryptographic key and secret lifecycle · component inventory and
vulnerability management route · logging and audit design · hosting and data location record · security
review or sign-off · NÚKIB registration position for the affected service.

**Mandatory artefacts in this area**, for the level-3 clause: the register of information entry, the
third-party contractual clause set, and the exit strategy, wherever a new ICT third-party dependency
supporting an important function is created.

**Product-specific regulated regimes**, for the level-4 clause: I2 where strong customer authentication
applies, I3 where a critical or important function depends on a third party, and I12 where a registered
regulated service is affected.

---

## 10. Discovery brief output

Systems affected and their criticality · authentication and identification implications · new ICT
third-party dependencies and their concentration effect · hosting and data location · resilience,
continuity and recovery implications · incident detection and reporting implications · fraud exposure ·
logging and auditability implications · secure development and component implications · change and testing
implications · cyber registration implications · required controls and evidence · regulatory dependencies ·
unresolved questions · required specialist approvals.

---

## 11. Escalation triggers

**Thirteen, each with an id so the flag can be checked rather than asserted.** The names are the card's own
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
| **I-E1** | A new ICT third-party dependency supporting a critical or important function | I3 | — |
| **I-E2** | A new cloud provider or region | — | — |
| **I-E3** | Increased concentration on an existing provider | — | — |
| **I-E4** | An exit that cannot be executed | — | — |
| **I-E5** | A change to strong customer authentication or reliance on a new exemption | — | — |
| **I-E6** | A new external interface exposed to third parties | — | — |
| **I-E7** | Data hosted or accessed outside the EEA | — | — |
| **I-E8** | A new failure mode affecting a client-facing service | — | — |
| **I-E9** | A material change in fraud exposure | — | — |
| **I-E10** | A component with no patch route | — | — |
| **I-E11** | A change to a service registered under the cyber regime | — | — |
| **I-E12** | Inability to state recovery objectives | I5 | — |
| **I-E13** | Inability to classify a plausible incident under the reporting criteria | I4 | — |

---

## 12. Primary legal sources

DORA, Regulation (EU) 2022/2554 · NIS2, Directive (EU) 2022/2555 · Czech Act No. 264/2025 Sb., the
Cybersecurity Act · PSD2, Directive (EU) 2015/2366 · Czech Act No. 370/2017 Coll. on payment services,
§223 · Delegated Regulation (EU) 2018/389 on strong customer authentication · EBA Guidelines on ICT and
security risk management, EBA/GL/2019/04 · EBA Guidelines on outsourcing arrangements, EBA/GL/2019/02 ·
Cyber Resilience Act, Regulation (EU) 2024/2847 · GDPR, Regulation (EU) 2016/679, Articles 32 to 34 ·
eIDAS 2, Regulation (EU) 2024/1183 · ČNB and NÚKIB supervisory guidance.

---

## 13. Product touchpoints in Czech

A Czech run's compliance sections quote these words where the run was started on build 1.3 or later; an English run, and a run started on an earlier build or recording none, quote §6. Each row carries the id and the sub-domains of its row in §6, under the group at the same place, and `repo-check` (C119) fails where the two tables differ. The questions stay in §6 only, in English: a solution's answers are keyed by §6's ids, whatever the run's language.

### 13.1 Přihlášení a přístup

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **IT-01** | Klient se přihlašuje nebo se mění přihlášení | I2, I8 | Produkt musí určit, jak silné je přihlášení, jak relace končí a jak funguje obnova přístupu, protože platební služby ověřování regulují a stejná laťka se očekává i jinde |
| **IT-02** | **Klient autorizuje platbu** | I2, I11, **oblast „Compliance, pravidla jednání a produktová regulace“** | Produkt musí uplatnit silné ověření klienta nebo zaznamenat, o kterou výjimku se opírá, protože spoléhání na výjimku je rozhodnutí, na které musí někdo umět ukázat |
| **IT-03** | Používá se jednorázový kód, schválení push notifikací nebo biometrie | I2, I8, **oblast „GDPR a ochrana osobních údajů“** | Produkt musí ověřit, že oba faktory jsou skutečně nezávislé, a uvést, zda se používá biometrie, protože biometrie přesouvá údaje do přísnějšího režimu |
| **IT-04** | Klient obnovuje přístup po ztrátě faktoru | I2, I11 | Produkt musí cestu k obnově přístupu navrhnout na stejné úrovni jako přihlášení, protože obnova bývá nejslabším místem ověřování a právě tam dochází k převzetí účtu |
| **IT-05** | Klient je poprvé identifikován | I2, **oblasti „Právo a smlouvy“ a „GDPR a ochrana osobních údajů“** | Produkt musí identifikaci, ověření a podpis řešit jako tři samostatné kroky, protože cesta, která je slučuje, nechává mezeru ve všech třech |
| **IT-06** | Aplikace si pamatuje zařízení nebo relaci | I2, I8 | Produkt musí zapamatování zařízení zaznamenat jako rozhodnutí o výjimce, protože snižuje laťku ověření, a ne jen zvyšuje pohodlí |

### 13.2 Závislost na třetích stranách

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **IT-07** | **Zavádí se dodavatel, SaaS produkt nebo cloudová služba** | I3, I5, I10, **oblast „Právo a smlouvy“** | Produkt musí do plánu dodávky zařadit smlouvu s dodavatelem, zápis do registru a plán odchodu, protože integrace nemůže bez všech tří jít do provozu |
| **IT-08** | Závislost podporuje něco, na co klienti spoléhají | I3, I5, I1 | Produkt musí uvést, zda závislost podporuje kritickou nebo důležitou funkci, protože tato odpověď zvyšuje nároky na smluvní podmínky, testování, kontinuitu a reporting |
| **IT-09** | Poskytovatel je ten, na kterém banka už silně závisí | I3 | Produkt musí poskytovatele porovnat s tím, co banka už používá, protože koncentrace se posuzuje na úrovni banky a volba rozumná pro jeden produkt může být pro banku jako celek špatná |
| **IT-10** | Poskytovatel zadává část služby subdodavateli | I3, I5, **oblast „GDPR a ochrana osobních údajů“** | Produkt musí zjistit, komu poskytovatel zadává subdodávky, a potvrdit, že se podmínky přenášejí dál, protože banka zůstává odpovědná po celém řetězci |
| **IT-11** | Odejít od poskytovatele by bylo obtížné | I5, I3 | Produkt musí s odchodem od poskytovatele počítat už v návrhu, protože odchod musí být možný bez nepřijatelného narušení, což produkt omezuje |
| **IT-12** | Přidává se open-source komponenta nebo komponenta třetí strany | I7, I3, **oblast „Právo a smlouvy“** | Produkt musí komponentu zapsat do evidence a naplánovat, jak se bude záplatovat, protože komponentu, kterou nikdo nesleduje, nelze opravit, když se objeví zranitelnost |

### 13.3 Kde služba běží a kde jsou data

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **IT-13** | Data se ukládají na novém místě nebo v novém cloudovém regionu | I10, I3, **oblast „GDPR a ochrana osobních údajů“** | Produkt musí otázku, kde data jsou, zodpovědět jako otázku odolnosti i jako otázku předání, protože tyto dvě otázky mají různé odpovědi |
| **IT-14** | Podpora nebo správa probíhá mimo EHP | I10, I3, **oblast „GDPR a ochrana osobních údajů“** | Produkt musí vzdálenou podporu mimo EHP považovat za přístup k datům, protože přístup nevyžaduje kopii |
| **IT-15** | Vytváří se nové prostředí | I6, I10, **oblast „GDPR a ochrana osobních údajů“** | Produkt musí uvést, zda nové prostředí obsahuje skutečné údaje klientů, protože produkční data v neprodukčních prostředích jsou opakujícím se zjištěním |

### 13.4 Zpřístupnění rozhraní

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **IT-16** | Zpřístupňuje se nové API nebo integrace | I2, I7, I9, I10 | Produkt musí určit, kdo smí rozhraní volat, jak se bude bezpečnostně testovat, co loguje a kde běží, protože banka musí každou z těchto věcí doložit zvlášť |
| **IT-17** | Třetí strana přistupuje k účtům nebo zadává platby | I2, I3, **oblast „Compliance, pravidla jednání a produktová regulace“** | Produkt musí splnit povinnosti rozhraní pro open banking týkající se dostupnosti, výkonu a reportingu, protože se vztahují na samo rozhraní, a ne jen na službu za ním |
| **IT-18** | Přijímá se webhook, callback nebo zpráva zaslaná partnerem | I2, I7, I9 | Produkt musí určit, co od partnera přijímá a jak to ověřuje, protože důvěra v příchozí data se obvykle navrhuje až nakonec a právě tam je slabé místo |

### 13.5 Když se něco pokazí

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **IT-19** | **Služba může selhat tak, že si toho klienti všimnou** | I4, I5, I1 | Produkt musí zajistit, aby selhání šlo rychle klasifikovat, protože u závažných incidentů běží lhůta pro hlášení dřív, než někdo zjistí příčinu |
| **IT-20** | Vzniká nový způsob selhání | I5, I4 | Produkt musí stanovit cílovou dobu obnovy a přípustnou ztrátu dat, protože je nelze dodatečně předpokládat |
| **IT-21** | Mění se vystavení podvodům | I11, I4, I2 | Produkt musí spolu s produktem aktualizovat detekci podvodů a potvrdit cestu hlášení, protože detekce nastavená na starou cestu klienta tu novou mine |
| **IT-22** | Iniciativa mění, co se loguje | I9, I4 | Produkt musí logovat dost na to, aby si člověk, který u toho nebyl, dokázal zpětně složit, co se stalo, protože podle této laťky se logy posuzují |
| **IT-23** | V něčem, co produkt používá, se najde zranitelnost | I7, I4 | Produkt musí vědět, jak by komponentu záplatoval a jak rychle, protože některé produkty nelze bez celého vydání záplatovat vůbec |

### 13.6 Vývoj a nasazování

| | Kontaktní bod | Týká se | Co to znamená pro produkt |
|---|---|---|---|
| **IT-24** | Mění se frekvence vydávání nebo způsob nasazování | I6, I5 | Produkt musí kontroly změn přizpůsobit tomu, jak kritická služba je, protože rychlejší vydávání u kritické služby zvyšuje nároky na kontroly |
| **IT-25** | Mění se rozsah testování | I6, I7, I5 | Produkt musí uvést, zda se uplatní testování odolnosti, protože pro některé subjekty a funkce je stanovenou povinností, a ne volitelnou praxí |
| **IT-26** | Zavádějí se tajemství, klíče nebo certifikáty | I8, I9 | Produkt musí pro každé tajemství a certifikát určit vlastníka, harmonogram obměny a postup při vypršení platnosti, protože certifikát s prošlou platností znamená výpadek |
| **IT-27** | Dotčená služba je ta, kterou banka zaregistrovala v režimu kybernetické bezpečnosti | I12, I4, I1 | Produkt musí ověřit, zda jde o službu, kterou banka zaregistrovala v režimu kybernetické bezpečnosti, protože s tím souvisejí povinnosti v oblasti bezpečnosti a hlášení incidentů a česká pravidla jdou nad minimum EU |
