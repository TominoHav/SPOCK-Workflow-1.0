# Dossier · GDPR and privacy

**Date:** 27 August 2026 · **Supports:** [area-gdpr.md](../definitions/know-how/compliance/area-gdpr.md)
**Status:** Evidence. Not legal advice, not reviewed by a lawyer, not read by any producer.

> **ČS supplied no card for this area.** The card was written here from the sources below, in the format
> the Compliance card uses, so ČS can replace it rather than start from nothing.

---

## 1. The core regime

**Regulation (EU) 2016/679 (GDPR)**, directly applicable. **Czech Act No. 110/2019 Coll.** on personal data
processing, **effective 24 April 2019**, is the national adaptation: it implements GDPR and Directive (EU)
2016/680 for law-enforcement processing, and Title V establishes the **Úřad pro ochranu osobních údajů
(ÚOOÚ)** as the central authority with GDPR's full sanctioning instruments.

**The act carries no banking-sector specific provisions.** Banking-specific constraints come from the
Banking Act and AML law, not from data protection law.

Sources: [ÚOOÚ on Act No. 110/2019 Coll.](https://uoou.gov.cz/en/legislation/act-no-1102019-coll) ·
[CMS expert guide, Czech Republic](https://cms.law/en/int/expert-guides/cms-expert-guide-to-data-protection-and-cyber-security-laws/czech-republic). Read 27 August 2026.

### Obligations the card turns into touchpoints

| GDPR | What it requires | Card touchpoint |
|---|---|---|
| Art. 5, 6, 9 | A lawful basis per purpose; special categories need an Article 9 condition as well | DP-01, DP-02, DP-08 |
| Art. 5(1)(c), (e) | Minimisation and storage limitation | DP-03, DP-04, DP-07 |
| Art. 12 to 14 | Transparency, in clear language, at the right time | DP-13, DP-14 |
| Art. 15 to 21 | Access, rectification, erasure, restriction, portability, objection | DP-15, DP-16, DP-17 |
| Art. 22 | Automated decisions with legal or similarly significant effect | DP-10 |
| Art. 25 | Data protection by design and by default | DP-01, DP-29 |
| Art. 28 | Processor contracts with mandatory content, and sub-processors | DP-23 |
| Art. 26 | Joint controller arrangements, with the essence made available to the client | DP-25 |
| Ch. V | Transfers outside the EEA and their mechanism | DP-26 |
| Art. 30 | Record of processing | DP-01, DP-08 |
| Art. 32 to 34 | Security of processing; **72-hour breach notification** to the authority | DP-29 to DP-32 |
| Art. 35 | Data protection impact assessment before high-risk processing | DP-10, DP-11 |

---

## 2. Automated decisions and scoring

**Article 22** restricts decisions based solely on automated processing which produce legal effects or
similarly significantly affect the data subject. Where permitted, the controller must implement safeguards
including the right to obtain human intervention, to express a point of view and to contest.

**Court of Justice, Case C-634/21 (*SCHUFA Holding*).** The Court held that the automated establishment of
a probability value about a person's ability to meet a payment commitment constitutes an automated
individual decision within Article 22 **where a third party draws strongly on that value** in deciding
whether to enter into a contract.

**Why this is on the card and not only in the AI section.** A bank producing or consuming a score is inside
the GDPR regime whether or not the AI Act's high-risk obligations have started applying. **The two regimes
have different clocks and the GDPR one is already running.**

---

## 3. The device and electronic marketing

**Directive 2002/58/EC (ePrivacy)**, Article 5(3). In Czechia the rule is **§89(3) of Act No. 127/2005
Coll.** on electronic communications. The 2021 amendment aligning with the European Electronic
Communications Code **replaced opt-out with opt-in, effective 1 January 2022**.

Cookies and similar technologies may not be placed on or read from a user's device without prior consent,
unless strictly necessary for a service the user explicitly requested. **ÚOOÚ published a monitoring
report, allowed a grace period, warned that continued non-compliance would be sanctioned, and has audited
websites under its annual control plans since.**

**This regime is independent of GDPR.** It bites whether or not the data is personal, which is the point a
product team most often misses: a consent posture that satisfies GDPR does not thereby satisfy §89(3).

Sources: [CEE Legal Matters on the 2022 change](https://ceelegalmatters.com/czech-republic/17964-stricter-rules-for-cookies-in-the-czech-republic-from-2022) ·
[Library of Congress on the ECA amendment](https://www.loc.gov/item/global-legal-monitor/2021-10-17/czech-republic-amendment-to-electronic-communications-act-strengthens-consumer-protection-in-line-with-european-union-standards/). Read 27 August 2026.

**The ePrivacy Regulation that would have replaced the directive has not been adopted.** Nothing here
should be scoped on the assumption that it will.

---

## 4. Banking secrecy, sitting alongside

**Act No. 21/1992 Coll. on banks** protects information about a client's affairs independently of data
protection law. It is the reason a lawful basis is not the end of the question when data moves inside a
group or out to a third party. **Act No. 253/2008 Coll.** on measures against money laundering supplies
both an obligation and a retention duty for identification data, and it constrains erasure.

---

## 5. Adjacent instruments

**Data Act, Regulation (EU) 2023/2854.** Access to data generated by connected products, and cloud
switching obligations that reach vendor selection.

**eIDAS 2, Regulation (EU) 2024/1183**, in force **20 May 2024**. Member States are to provide at least one
certified EU Digital Identity Wallet **during late 2026**, with obligated organisations required to accept
it approximately twelve months later, so **late 2027** on current estimates. **Entities subject to AML
rules, banks among them, carry a mandatory acceptance obligation.**

Sources: [Arthur Cox on the EUDI Wallet](https://www.arthurcox.com/knowledge/the-eu-digital-identity-wallet-what-companies-need-to-know/) ·
[Gataca eIDAS2 timeline](https://www.gataca.io/resources/blog/eIDAS2-timeline/). Read 27 August 2026.

**FiDA.** Adoption expected mid-2026 with obligations phased from 2027. Carries an obligation to give
clients a dashboard controlling access to their financial data.

---

## 6. Why this area is called the largest gap

Across the eight committed discovery runs in this repository, **GDPR is the most frequently raised
regulatory touchpoint of any kind**, with ePrivacy second. Until 27 August 2026 the four-area map covered
neither, so the screen returned nothing for the concern producers raise most often, unprompted.

**That is the argument for a card written by us being better than no card**, and it is also the reason this
one most needs ČS to replace it.

---

## 7. Where this dossier is thin

**ČS's own privacy framework is absent.** The bank's record of processing, its DPIA threshold, its standard
processor terms, its retention schedule and its DPO's own guidance are not public and are not here. **The
card names what the regime requires and cannot name how ČS satisfies it.**

**EDPB guidelines were not surveyed.** Individual guidelines on consent, transparency, automated
decision-making and transfers exist and shape practice. Only the statutory positions were established here.

**ÚOOÚ decisions were not read.** Enforcement patterns would sharpen the card and were not researched.

**The interaction between erasure rights and AML retention was not worked through.** It is a real tension
in every onboarding initiative and it needs ČS legal rather than a reading of two statutes.
