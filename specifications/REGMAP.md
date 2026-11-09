# RegMap — where regulation lives in this build

**Generated. Do not edit.** `node .github/scripts/regmap.mjs --write`

**Registry:** [.github/registry/regmap.yaml](../.github/registry/regmap.yaml) · **Date:** 2026-08-27 · **Owner:** ceska-sporitelna

> **What this is.** The signpost. Which regulatory areas exist, which knowledge body carries
> each, which dossier holds the evidence behind it, which skills read it, and which named
> regimes sit inside each area.
>
> **What this is not.** Not knowledge. Nothing here states an obligation, a threshold or a date
> a producer acts on. The area bodies do that.

---

## The mechanism

Area-generic. How a description is screened, what the screen may say, how a complexity value is
formed, when an escalation flag fires, and what a producer must do with the result.

| Body | Read by |
|---|---|
| [compliance-guidelines.md](definitions/know-how/compliance/compliance-guidelines.md) | ideation · mvp-expansion · mvp-option-design · prd |

---

## The four areas

| | Area | Card | Sub-domains | Triggers | Touchpoints |
|---|---|---|---|---|---|
| **A1** | Compliance, conduct and product regulation | [area-compliance.md](definitions/know-how/compliance/area-compliance.md) | 13 | 13 | 39 |
| **A2** | GDPR and privacy | [area-gdpr.md](definitions/know-how/compliance/area-gdpr.md) | 12 | 14 | 32 |
| **A3** | Legal and contracts | [area-legal.md](definitions/know-how/compliance/area-legal.md) | 12 | 14 | 30 |
| **A4** | ICT and security | [area-ict-security.md](definitions/know-how/compliance/area-ict-security.md) | 12 | 14 | 27 |
| | **Total** | | **49** | **55** | **128** |

### Evidence behind each card

Read by no producer. It exists so a person can check where a statement on a card came from.

| | Dossier | Also |
|---|---|---|
| **A1** | [compliance.md](regulatory-research/compliance.md) | transcript at [regulatory-map-compliance.md](regulatory-research/regulatory-map-compliance.md) |
| **A2** | [gdpr.md](regulatory-research/gdpr.md) | — |
| **A3** | [legal.md](regulatory-research/legal.md) | — |
| **A4** | [ict-security.md](regulatory-research/ict-security.md) | — |

### Who reads what

Joined from `.github/registry/skills.yaml`, never asserted here.

| Body | Read by |
|---|---|
| area-compliance.md | ideation · mvp-expansion · mvp-option-design · prd |
| area-gdpr.md | ideation · mvp-expansion · mvp-option-design · prd |
| area-legal.md | ideation · mvp-expansion · mvp-option-design · prd |
| area-ict-security.md | ideation · mvp-expansion · mvp-option-design · prd |

**A2.** The regulatory concern producers raise most often, and the area with no ČS card. This is the one most worth ČS replacing.

**A3.** Carries the one live gap in the four — an EU application date that has passed with the national implementation not confirmed as in force.

---

## Not covered, and which of the two kinds

**An area nobody chose to cover and an area we meant to cover and could not are different
facts.** Both appear so that silence is never mistaken for clearance.

| | Not covered | Disposition | Why |
|---|---|---|---|
| **X1** | AI regulation | **Routed** | Out as an area by decision, and routed rather than screened: an AI-driven recommendation, scoring or client decision is the Compliance card's escalation trigger C-E9. No card names the role a trigger routes to, and the compliance section derived for each solution raises only the triggers that fire on an unresolved sub-domain, which C-E9 does not, so no section raises it. |
| **X2** | Outsourcing beyond ICT | **Routed** | DORA's ICT third-party chapter is inside A4. Outsourcing that is not ICT is routed rather than screened, and the EBA outsourcing guidelines are named on the A3 card as a pointer. |
| **X3** | Scheme rules and market infrastructure | **Uncovered** | CERTIS, the EPC rulebook, ISO 20022 and card scheme agreements are not regulation and are in none of the four areas. They would have belonged to the `banking-constraints` body, which is retired and will not be written, so they are uncovered with no owner rather than pending one. A screen that returns clean has said nothing about any of them, and nothing now claims it will. |

---

## The named regimes

**33 instruments.** 24 in force, 4 with a fixed future date, 3 not yet applicable law, 2 under revision.

**Pointers, not summaries.** What a regime requires is on the area body; why it says so is in the
dossier. `state` is the column to scan.

| | Regime | Citation | National | Areas | State | Date |
|---|---|---|---|---|---|---|
| **R01** | MiFID II | Directive 2014/65/EU | Act No. 256/2004 Coll. (ZPKT) | A1 | in force | since 2018-01-03 |
| **R02** | PRIIPs | Regulation (EU) No 1286/2014 | — | A1 | in force | since 2018-01-01 |
| **R03** | Insurance Distribution Directive | Directive (EU) 2016/97 | Act No. 170/2018 Coll. | A1 | in force | — |
| **R04** | PSD2 | Directive (EU) 2015/2366 | Act No. 370/2017 Coll. | A1, A4 | in force | since 2018-01-13 |
| **R05** | Consumer Credit Directive | Directive 2008/48/EC | Act No. 257/2016 Coll. | A1 | in force | — |
| **R06** | Consumer Credit Directive 2 | Directive (EU) 2023/2225 | amendment to Act No. 257/2016 Coll. | A1 | applies from a fixed date | applies 2026-11-20 |
| **R07** | European Accessibility Act | Directive (EU) 2019/882 | Act No. 424/2023 Coll. | A1 | in force | since 2025-06-28 |
| **R08** | SFDR | Regulation (EU) 2019/2088 | — | A1 | **moving** | — |
| **R09** | Taxonomy Regulation | Regulation (EU) 2020/852 | — | A1 | in force | — |
| **R10** | Unfair Commercial Practices Directive | Directive 2005/29/EC | Act No. 634/1992 Coll. | A1, A3 | in force | — |
| **R11** | Payment Accounts Directive | Directive 2014/92/EU | — | A1 | in force | — |
| **R12** | EBA product oversight and governance guidelines | EBA/GL/2015/18, amended by EBA/GL/2026/07 | — | A1 | in force | since 2017-01-03 |
| **R13** | Retail Investment Strategy | amends MiFID II, IDD, Solvency II, UCITS, AIFMD and PRIIPs | — | A1 | **not yet applicable law** | — |
| **R14** | GDPR | Regulation (EU) 2016/679 | Act No. 110/2019 Coll. | A2 | in force | — |
| **R15** | ePrivacy Directive | Directive 2002/58/EC | Act No. 127/2005 Coll., §89(3) | A2 | in force | since 2022-01-01 |
| **R16** | Banking secrecy | Act No. 21/1992 Coll. on banks | — | A2, A3 | in force | — |
| **R17** | AML | Act No. 253/2008 Coll. | — | A2, A3 | in force | — |
| **R18** | Data Act | Regulation (EU) 2023/2854 | — | A2, A4 | in force | — |
| **R19** | Civil Code — consumer and distance financial services contracts | Act No. 89/2012 Coll., §1810 to §1867 and §1841 to §1851 | — | A3 | in force | — |
| **R20** | Distance marketing of consumer financial services | Directive (EU) 2023/2673 | — | A3 | **moving** | applies 2026-06-19 |
| **R21** | eIDAS | Regulation (EU) No 910/2014 | Act No. 297/2016 Coll. | A3, A4 | in force | — |
| **R22** | eIDAS 2 — EU Digital Identity Wallet | Regulation (EU) 2024/1183 | — | A2, A3, A4 | applies from a fixed date | — |
| **R23** | Financial Arbitrator | Act No. 229/2002 Coll. | — | A3 | in force | — |
| **R24** | Copyright | Act No. 121/2000 Coll. | — | A3 | in force | — |
| **R25** | DORA | Regulation (EU) 2022/2554 | — | A4 | in force | since 2025-01-17 |
| **R26** | NIS2 | Directive (EU) 2022/2555 | Act No. 264/2025 Sb., the Cybersecurity Act | A4 | in force | since 2025-11-01 |
| **R27** | Strong customer authentication technical standard | Delegated Regulation (EU) 2018/389 | — | A4, A1 | in force | — |
| **R28** | EBA ICT and security risk management guidelines | EBA/GL/2019/04 | — | A4 | in force | — |
| **R29** | EBA outsourcing guidelines | EBA/GL/2019/02 | — | A4, A3 | in force | — |
| **R30** | Cyber Resilience Act | Regulation (EU) 2024/2847 | — | A4 | applies from a fixed date | — |
| **R31** | PSD3 and the Payment Services Regulation | successor to Directive (EU) 2015/2366 | — | A1, A4 | **not yet applicable law** | — |
| **R32** | FiDA — financial data access | proposed regulation | — | A1, A2 | **not yet applicable law** | — |
| **R33** | AI Act | Regulation (EU) 2024/1689, amended by Regulation (EU) 2026/1744 | — | *X1* | applies from a fixed date | — |

### What is moving

**The rows to check before quoting a date to anybody.**

- **R06 · Consumer Credit Directive 2** — The nearest hard date in the map. Brings buy-now-pay-later into scope

- **R08 · SFDR** — Under review during 2026 toward a simplified product categorisation

- **R13 · Retail Investment Strategy** — Member States approved 12 June 2026, publication expected September 2026

- **R20 · Distance marketing of consumer financial services** — **The live gap.** The EU application date has passed and repealed Directive 2002/65/EC. The Czech transposing amendment was still moving through Parliament during 2026 and its status should be confirmed with ČS legal

- **R22 · eIDAS 2 — EU Digital Identity Wallet** — Member State wallets expected during late 2026, private-sector acceptance obligations roughly twelve months later. Banks carry a mandatory acceptance obligation

- **R30 · Cyber Resilience Act** — Phasing in. Reaches software placed on the market rather than software merely used

- **R31 · PSD3 and the Payment Services Regulation** — Political agreement November 2025, not applicable law as at 27 August 2026. Applies around 21 months after publication. PSD2 continues to govern

- **R32 · FiDA — financial data access** — Adoption expected mid-2026, obligations phased from 2027

- **R33 · AI Act** — **Verified 27 August 2026.** The Digital Omnibus on AI, Regulation (EU) 2026/1744 of 8 July 2026, defers the Annex III high-risk obligations from 2 August 2026 to 2 December 2027, and Annex I embedded systems to 2 August 2028. Creditworthiness and credit scoring are Annex III high-risk. Prohibited practices applied from 2 February 2025 and general-purpose model rules from 2 August 2025

---

## Notes carried on regimes in force

- **R04 · PSD2** — Strong customer authentication at §223, required in Czechia from 1 January 2021

- **R07 · European Accessibility Act** — Consumer banking services expressly in scope. Producers do not name accessibility unprompted, although the runs are client-facing digital journeys

- **R12 · EBA product oversight and governance guidelines** — Amended 30 June 2026 to cover ESG features and greenwashing risk in retail banking products

- **R15 · ePrivacy Directive** — Czech opt-in model for cookies since 1 January 2022. The ePrivacy Regulation was never adopted

- **R25 · DORA** — First nineteen critical ICT third-party providers designated 18 November 2025

- **R26 · NIS2** — Czech rules go beyond the directive — all incidents reportable, extensive supply chain obligations. Registration and obligation clocks running through 2026

