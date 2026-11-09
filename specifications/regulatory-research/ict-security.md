# Dossier · ICT and security

**Date:** 27 August 2026 · **Supports:** [area-ict-security.md](../definitions/know-how/compliance/area-ict-security.md)
**Status:** Evidence. Not legal advice, not a security assessment, not read by any producer.

> **ČS supplied no card for this area.** The card was written here from the sources below.

---

## 1. DORA

**Regulation (EU) 2022/2554**, adopted 14 December 2022, **fully applicable since 17 January 2025**. It
covers more than twenty categories of financial entity and **applies to all EU banks**, including
significant and less significant institutions and EU branches of third-country banks.

| Obligation | What it means |
|---|---|
| ICT risk management framework | Governance, identification, protection, detection, response and recovery |
| Incident classification and reporting | Major incidents on a staged clock — an initial report, an intermediate report and a final report |
| **Register of information** | Every ICT third-party contractual arrangement, maintained and reportable |
| **Article 30 contractual content** | Service description, service levels, the entity's audit rights, the regulator's audit rights, data security standards, business continuity obligations, sub-contracting terms and termination rights |
| Concentration risk | Assessed at entity level, so a locally reasonable provider choice can be the wrong one |
| Threat-led penetration testing | For designated entities and functions |

**The European Supervisory Authorities designated the first nineteen critical ICT third-party providers on
18 November 2025**, including the major cloud providers. Designated providers come under direct oversight
with periodic penalty payments of up to 1% of average daily worldwide turnover.

**Why this changes a product decision.** Adding a mainstream cloud service is no longer only an
architecture choice. It creates a register entry, a contractual clause set, a concentration position and an
exit obligation, and it may sit inside a directly supervised relationship.

Sources: [ESMA DORA page](https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/digital-operational-resilience-act-dora) ·
[DORA Article 28 third-party requirements](https://www.fluxforce.ai/regulations/eu-dora-article-28-third-party-risk) ·
[DORA for banks, 2026](https://www.regulation-dora.eu/banking). Read 27 August 2026.

---

## 2. NIS2 and the Czech Cybersecurity Act

**Directive (EU) 2022/2555 (NIS2)**, transposed in Czechia by **Act No. 264/2025 Sb.**, the new
Cybersecurity Act, **in force 1 November 2025**. The supervisory authority is **NÚKIB**.

The act broadens the scope of regulated entities across energy, healthcare, finance, digital infrastructure
and other sectors. **Two national deviations go beyond the directive and both reach a product team:**
mandatory reporting of **all** cyber security incidents rather than only significant ones, and extensive
supply chain security obligations.

**The clocks.** Regulated entities have **60 days** to identify the regulated services they provide and
notify NÚKIB. **Incident reporting and the implementation of security measures each begin one year after
receipt of the registration confirmation**, which means obligations for many entities are landing across
2026.

**For a bank, DORA is the sector-specific regime** and governs where the two overlap. The Czech act still
reaches services the bank has registered, which is why the card asks whether the affected service is one of
them rather than assuming either answer.

Sources: [Rowan Legal on the new Cybersecurity Act](https://rowan.legal/en/news/new-cybersecurity-act-to-implement-nis2/) ·
[Bird & Bird, Czech NIS2 implementation](https://www.twobirds.com/en/insights/2025/czech-republic/czech-republic-%E2%80%93-nis2-implementation) ·
[PwC Czech Republic](https://www.pwc.com/cz/en/akademie/cyber-security-act.html). Read 27 August 2026.

---

## 3. Strong customer authentication

**PSD2 Article 97**, transposed at **§223 of Czech Act No. 370/2017 Coll.**, **required in Czechia from
1 January 2021**. It applies where the payer accesses a payment account online, initiates an electronic
payment transaction, or performs any other act carrying a risk of payment fraud, misuse of a payment
instrument, or misuse of payment account information, or where account information is requested through an
account information service provider.

The technical standard is **Delegated Regulation (EU) 2018/389**, which sets the exemptions, the dynamic
linking requirement for remote payment transactions, and the requirements for interfaces serving
third-party providers.

**An exemption is a decision with a record**, not an absence of a requirement. That framing is on the card
because in practice an exemption is usually inherited from a platform default.

Sources: [Act No. 370/2017 Coll.](https://www.zakonyprolidi.cz/cs/2017-370) ·
[Silné ověření klienta, epravo](https://www.epravo.cz/top/clanky/silne-overeni-klienta-pri-poskytovani-platebnich-sluzeb-109952.html). Read 27 August 2026.

---

## 4. Guidance that still applies

**EBA Guidelines on ICT and security risk management (EBA/GL/2019/04)** and **EBA Guidelines on outsourcing
arrangements (EBA/GL/2019/02)**, with ČNB supervisory expectations. DORA has absorbed much of the ICT
content; the outsourcing guidelines continue to reach non-ICT arrangements.

**Cyber Resilience Act, Regulation (EU) 2024/2847**, sets security requirements for products with digital
elements, phasing in after its 2024 adoption. It reaches software placed on the market, so a
client-installed component can fall inside it while an internal system does not.

---

## 5. Two incident regimes, three clocks

An initiative can create a reportable event under more than one regime, and **the triggers, clocks and
recipients differ**:

| Regime | Trigger | Recipient |
|---|---|---|
| **DORA** | A major ICT-related incident under the classification criteria | The competent authority, on a staged clock |
| **Czech Cybersecurity Act** | **Any** cyber security incident, under the national deviation | NÚKIB |
| **GDPR Art. 33** | A personal data breach | ÚOOÚ, **within 72 hours** of awareness, and affected clients where risk is high |

**An event can be reportable under one and not the others.** This is on the card because a product team
designing detection usually designs for one of the three.

---

## 6. What is moving

**PSD3 and the Payment Services Regulation** are not yet applicable law. Authentication rules, fraud
liability allocation and third-party interface obligations all move with them, applying around 21 months
after publication. **An authentication design scoped in 2026 will still be in service when they land.**

**eIDAS 2 wallets** arrive during late 2026 with acceptance obligations roughly a year later.

**Czech Cybersecurity Act obligation clocks** are running through 2026 for registered entities.

---

## 7. Where this dossier is thin

**ČS's own ICT and security standards are absent**, and they are the operative constraint for any real
initiative. The card names what the regulation requires; the bank's own bar is higher and is not public.

**Whether and which ČS services are registered under Act No. 264/2025 Sb. is unknown.** The card asks the
question rather than assuming an answer, and someone at ČS can settle it in one sentence.

**DORA's classification criteria were not worked through.** What counts as a major incident is set by
delegated regulation and matters for the detection design; the thresholds were not extracted here.

**No architecture was reviewed.** This is a map of which obligations an initiative engages, not an
assessment of any system.
