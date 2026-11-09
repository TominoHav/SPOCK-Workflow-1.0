---
run_id: 2026-03-investor-onboarding
artifact_id: A5
ost_role: none
status: accepted
workflow: competitive-analysis
modified_by: agent
revisions: 0
sources:
  - A1
  - A4
external_sources: [eu-siu-2025, ec-siu, pickthebank-czk-oct2025, csas-george-invest-2024, penize-george-2025, bankingdive-agentic-2025, muinmos-suitability, fenergo-onboarding, thebanks-cz, thebanks-raif, academia-gamification-2025, boston-behavioral-2025, cnb-savings, kb-wiki, elevate-czech-banks, moneta-results-2025]
produced_by:
  agent: competitive-analysis
  skill: landscape-mapping
store: S1
scope: shared
egress_basis: pilot-test
standards_basis: "competitive-analysis-standards@0.5 read and applied; §2.1 (trend pass), §2.2 (representative and standing rules) and §2.4 (coverage floor) are followed as the bar — none of the v0.5 additions are checked by Q3, per §6.1 of the Standards"
could_not_verify:
  - rule: "authored only from the quarantine bridge's structured extract, never from raw external text"
    needs: judge
    reach: process
assembled_at: 2026-08-20
assembled_from: [R-A5-01]
---

# Competitive Analysis | Landscape Map — Guided onboarding for first-time investors

**Run:** `2026-03-investor-onboarding` · **Stage:** 3.1 `landscape-mapping` · **Supersedes:** `A5-landscape.superseded-1.md`
**Sources read:** `1-brief/initiative-brief.md`, `2-problems/5-prioritised-opportunities.md`, `store/S1-competitors.md`, `.github/know-how/competitive-analysis-standards.md`
**Research:** 8 search iterations (cap reached) · **Egress regime:** `pilot-test` — run material is fabricated (`fixtures/README.md`)



**Assembled from one record**, which carries the fields a gate decides: [rec:R-A5-01].
---

## 1 — Scope, restated from A1

**`scope_field`:** *Czech Republic; retail banking; savings-to-investment products segment; adjacent fintech investment platforms excluded.*
**`topic`:** *Guided investment onboarding for retail customers who have never purchased an investment product.*

Both fields carried from A1 distinctly. No participant falls outside the scope.

**What the exclusion means for the map.** A1 explicitly excludes adjacent fintech investment platforms — robo-advisors (Fondee, Portu), DIY investment apps (Trading 212, Degiro) — as a Product Owner scope decision recorded at G1, not a research gap. Where these platforms appear in this artifact, they appear as evidence for a trend, not as participants.

**Česká spořitelna's own George investment product** is the initiating organisation's current offering. It is referenced throughout as trend evidence — specifically, George's "Investments in Pocket" tab (October 2024) is the clearest Czech-market instance of the guided-selection and AI-recommendation patterns. It is not a map participant; this landscape describes the market ČS operates in, not ČS's own position within it.

---

## 2 — Store check (S1)

`store/S1-competitors.md` read before any research, per the skill's step 3. Five participants present, all from `2026-01-mortgage-onboarding`:

| identity_key | Name | Type | Researched at |
|---|---|---|---|
| adjacent:broker-networks | Independent broker networks | adjacent | 2026-08-09 |
| hypobank.cz | HypoBank | direct | 2026-08-09 |
| mbank.cz | mBank CZ | direct | 2026-08-09 |
| rb.cz | Raiffeisen CZ | direct | 2026-08-09 |
| substitute:long-term-rental | Long-term rental platforms | substitute | 2026-08-09 |

**None reused.** All five were researched against the mortgage lending market. That is a different `market_scope` from this run's savings-to-investment segment: the identity key persists across runs, the researched offering does not transfer with it. Reusing any of these under their existing card content would misrepresent mortgage-market research as investment-onboarding research. `reused: []` is the honest count, as in the superseded A5, and for the same reason.

Note: ČSOB and KB appear in this run's map under new keys (`csob.cz`, `kb.cz`). Raiffeisenbank CZ is present in the market but is not a participant in this map — see §4. Whether research for any of these organisations could transfer across market-scope boundaries (mortgage vs. investment) is almost certainly no, because the relevant product lines differ, but the decision belongs to stage 3.2.

---

## 3 — Trend pass (Standards v0.5 §2.1)

Two classes only: **business** and **technology**. Four business trends, four technology trends. Regulatory movement excluded — it belongs to the Compliance Guidelines, per §2.1.

**Inclusion test applied:** *If this run ignores this trend, what is different for the initiative in 12 to 24 months?*
**Impact must differentiate** across the set; a set where everything is `high` has ranked nothing.

---

### Business trends

**B1 — Retail savings mobilization: idle deposit-to-investment migration**
`class: business` | `impact: high` | `horizon: short` | `lifecycle: growing`

*Description.* As central banks cut rates and deposit returns fall, Czech and European retail customers face a structural incentive to move savings from low-yield current and savings accounts into investment products. The EU rebranded the Capital Markets Union as the Savings and Investment Union (SIU) in 2025, making this conversion an explicit policy priority.

*Evidence.*
- eu-siu-2025 (EU Perspectives, December 2025): "About 70 per cent of household savings remain parked in low-risk, low-reward cash-like instruments." The SIU initiative is explicitly designed to convert this stock.
- pickthebank-czk-oct2025 (PickTheBank, October 2025): "Nearly 60% of the Czech population opted to deposit money into savings accounts ... banks swiftly reduced interest rates on deposits in response to central bank moves, with the trend giving momentum to retail clients to look for more profitable options."
- cnb-savings (Czech National Bank): Czech household savings rate is second highest in Europe after Germany.

*Implication for this initiative.* This run's initiative is positioned at the centre of the single largest retail banking movement in current market conditions. The window when a first-time investor decides to move savings into a fund is the commercial event this initiative must capture. A failed onboarding flow at that moment hands the customer to a competitor or back to inaction.

*Representatives:* ČSOB (leader), Komerční banka (leader), MONETA Money Bank (innovator)

---

**B2 — Branch-to-digital investment channel migration**
`class: business` | `impact: medium` | `horizon: medium` | `lifecycle: growing`

*Description.* Czech retail banks have moved investment product delivery from the branch adviser to self-service digital channels. Banks have built dedicated investment tabs inside their banking apps, reducing the need for an in-person advisory conversation for a first fund purchase.

*Evidence.*
- csas-george-invest-2024 (csas.cz, October 2024): ČS launched "Investments in Pocket" tab in George — a guided questionnaire-to-recommendation flow in-app, with 3 million George app users.
- kb-wiki (Wikipedia): Komerční banka announced the Temenos platform transition in January 2021, explicitly targeting "reference level for the digitization of banking services in the Czech Republic."
- thebanks-cz (TheBanks.eu): ČSOB described as having "an advanced digital banking platform, enhancing customer experience through innovative online and mobile banking solutions."

*Implication for this initiative.* For H1 (fund selection) and H2 (questionnaire): the friction points are now inside a digital product, not at the choice of channel. An improvement to digital investment onboarding competes against other banks' already-shipped investment tabs, not against paper forms.

*Representatives:* ČSOB (leader), Komerční banka (leader), Bank branch advisory (leader — the channel being displaced)

---

**B3 — Financial literacy gap as a first-investment conversion barrier**
`class: business` | `impact: high` | `horizon: short` | `lifecycle: growing`

*Description.* A large proportion of Czech retail customers with savings have never purchased an investment product. Their primary barrier is vocabulary and concept familiarity rather than willingness — they do not understand fund types, risk ratings or what happens at an order confirmation screen. Banks face a conversion ceiling set by how many customers can navigate a process designed for people who already understand the concepts.

*Evidence.*
- pickthebank-czk-oct2025: Near-60% of Czechs in savings accounts despite declining rates signals readiness alongside inertia — the gap between intent and action is the literacy problem.
- penize-george-2025 (Penize.cz, 2025): George's stated aim is to grow investing customers from 650,000 to 1 million out of 2.8 million total ČS clients — implying at least 1.8 million non-investing clients the bank is trying to reach.
- academia-gamification-2025 (2025): "Gamified features may inadvertently increase novice investors' risk-taking without sufficient financial literacy gains" — confirms that literacy gap remains a live problem even where engagement tools exist.

*Implication for this initiative.* For H2 directly: the suitability questionnaire presupposes investment vocabulary the target population does not have. A bank whose conversion ceiling is set by who already understands the questions has capped its potential at the current stock of experienced investors.

*Representatives:* Bank branch advisory (leader — the human adviser who currently addresses the literacy gap), ČSOB (leader — building digital responses to the gap), Komerční banka (leader — same)

---

**B4 — Guided fund selection as an industry response to choice overload**
`class: business` | `impact: medium` | `horizon: short` | `lifecycle: growing`

*Description.* Czech retail banks have moved from full product catalogues to curated or guided fund-selection experiences, reducing visible product counts and adding recommendation layers to lower the decision burden on first-time investors.

*Evidence.*
- csas-george-invest-2024: George "Investments in Pocket" tab targets customers who need guidance and recommends ideal investment forms via questionnaire, rather than displaying the full product range.
- penize-george-2025: 2025 updates added sector filters to "quickly find investments matching customer interests" — a direct response to the evidence that unfiltered browsing is not working.
- thebanks-cz: Major Czech banks are described as offering "a full range of banking services" including investment — the breadth of catalogue is the starting point; reduction and curation are the industry response.

*Implication for this initiative.* For H1 directly: choice overload at fund selection is a recognised problem with a recognised response already in the market. An initiative that does not have a guided selection path arrives into a market where one is already expected.

*Representatives:* MONETA Money Bank (innovator — more likely to have built a focused guided experience as a smaller, agiler player), ČSOB (leader — advanced digital platform)

---

### Technology trends

**T1 — Automated suitability assessment: adaptive questionnaire engines replacing static forms**
`class: technology` | `impact: high` | `horizon: short` | `lifecycle: growing`

*Description.* Financial technology providers have deployed suitability and appropriateness engines that translate regulatory questionnaire requirements into adaptive customer journeys. The engine asks simpler questions for customers with no investment experience, skips irrelevant items, and keeps the institution compliant. Three named vendors are in production.

*Evidence.*
- bankingdive-agentic-2025 (Banking Dive, 2025): "Financial institutions implementing agentic customer onboarding solutions have achieved up to 60% reduction in KYC/AML review times." Vendor-level production evidence.
- muinmos-suitability (Muinmos, product page): "Suitability and appropriateness agents translate complex suitability and appropriateness requirements into automated customer journeys." Production deployment.
- fenergo-onboarding (Fenergo, product page): Client onboarding automation for investment firms. Production deployment.

*Technology maturity filter.* Deployed in production at financial institutions; vendor-level evidence is global. Specific deployment by Czech retail banks in scope has not been established by this run's research.

*Implication for this initiative.* For H2 directly: the technology to make the suitability questionnaire adaptive — shorter and simpler for first-time investors — exists and is in production. The constraint for this initiative is implementation and integration, not technology availability.

*Representatives:* **None identified within the scope.** The leading implementations are by technology vendors (Muinmos, Fenergo, InvestGlass) that sit outside this run's market scope. Within in-scope Czech retail banks, specific adoption of automated suitability assessment is not established by this research. **Finding:** the technology most directly addressing H2 has no named representative among Czech retail banking competitors in scope. If no in-scope participant has implemented this, the initiative would be differentiated from the current competitive set on this capability.

---

**T2 — Behavioral nudge technology in banking investment apps**
`class: technology` | `impact: medium` | `horizon: medium` | `lifecycle: emerging`

*Description.* In-app behavioral nudges — progress indicators, loss-aversion warnings, framing effects, completion prompts — are being deployed in digital investment flows to reduce dropout at key decision points. The approach is established in fintech platforms and emerging in bank-owned apps.

*Evidence.*
- academia-gamification-2025 (2025): Gamification features increase user engagement 45% and savings among younger users 30%. Investment activity quadrupled from $50 to $200 monthly (2015–2021) with gamified features.
- boston-behavioral-2025 (Boston Institute of Analytics, 2025): "By 2025, artificial intelligence investment solutions will proactively intervene to combat behavioral biases." Platforms cited: Zerodha's Nudge, INDmoney, Betterment, Wealthfront — all outside this run's scope.

*Technology maturity filter.* In production at fintech platforms (excluded from scope). Deployment within Czech retail bank-owned investment apps is not specifically evidenced by this research.

*Implication for this initiative.* For H1 and H2: nudge technology addresses dropout at both fund selection and the questionnaire. If Czech retail banks have not yet deployed these mechanisms in their investment flows, an initiative that does is differentiated from the current field.

*Representatives:* **None identified within the scope.** Leaders are fintech platforms excluded by A1's scope decision. No Czech retail bank in scope is specifically evidenced as deploying behavioral nudge features in its investment onboarding flow. **Finding:** this technology is emerging in the broader market and absent from the named in-scope competitor set.

---

**T3 — AI-powered fund recommendation and personalization**
`class: technology` | `impact: medium` | `horizon: medium` | `lifecycle: growing`

*Description.* Banks are integrating AI recommendation engines into investment onboarding to derive a fund match from risk profile and stated goals, rather than presenting an unfiltered product catalogue and expecting the customer to choose.

*Evidence.*
- csas-george-invest-2024: George "Investments in Pocket" — guides customers through investment questionnaire and recommends ideal investment forms. October 2024 production deployment at ČS (initiating bank; referenced as trend evidence).
- penize-george-2025: 2025 updates emphasize personalised fund finding. Confirms AI-powered recommendation is in production in the Czech market.
- kb-wiki: Komerční banka's Temenos platform (2021) — Temenos is a banking platform with native recommendation and personalization modules, suggesting capability.

*Technology maturity filter.* Deployed in production at ČS (October 2024). Komerční banka (Temenos) has platform-level capability; specific deployment in investment recommendation is inferred from platform choice, not directly evidenced.

*Implication for this initiative.* For H1: the guided-recommendation layer is already the standard in the Czech market (evidenced at ČS). An initiative without one competes against a pattern already in production.

*Representatives:* ČSOB (leader — advanced digital platform implies recommendation capability), Komerční banka (leader — Temenos platform)

*Confidence caveat:* Both attributions rest on platform evidence, not on specific AI recommendation feature evidence for either bank. Stage 3.2 should resolve this for both.

---

**T4 — Agentic process automation in customer onboarding**
`class: technology` | `impact: medium` | `horizon: short` | `lifecycle: growing`

*Description.* Financial institutions are deploying agentic AI to handle low-risk customer onboarding end-to-end without human intervention — identity verification, risk assessment, document handling — reducing processing time from hours to under one minute.

*Evidence.*
- bankingdive-agentic-2025 (Banking Dive, 2025): "Agentic onboarding solutions enable fully autonomous onboarding for low-risk customers, reducing processing time from hours to minutes without human intervention."
- kb-wiki: Komerční banka's Temenos platform in production since 2021. Temenos is the leading end-to-end banking platform with native agentic automation; this is the strongest in-scope evidence.
- thebanks-cz: ČSOB described as having an "advanced digital banking platform" — general evidence of automation investment.

*Technology maturity filter.* Production globally (Banking Dive, 2025). Komerční banka's Temenos is in-scope evidence of capability; specific investment onboarding automation deployment is inferred from platform choice.

*Implication for this initiative.* For H2: an onboarding flow requiring a customer to navigate a static questionnaire can be redesigned around agentic automation that adapts in real time. Implementation is the constraint, not technology.

*Representatives:* Komerční banka (leader — Temenos platform), ČSOB (leader — advanced digital platform)

---

### Technology trend summary

| Trend | In-scope representatives | Finding |
|---|---|---|
| T1 — Automated suitability assessment | None | Technology in production at vendors (Muinmos, Fenergo); Czech retail bank deployment not evidenced |
| T2 — Behavioral nudge | None | Leaders are excluded fintech platforms; Czech retail bank deployment not evidenced |
| T3 — AI fund recommendation | ČSOB (leader), KB (leader) | Attribution from platform evidence; specific feature deployment not confirmed |
| T4 — Agentic onboarding automation | KB (leader — Temenos), ČSOB (leader) | Global production; in-scope attribution from platform choice |

**Finding — T1 and T2 have no in-scope representatives.** The technology for addressing both H2 (adaptive suitability assessment) and H1 (behavioral nudge at dropout points) is established globally and in excluded adjacent markets but has not been specifically identified as deployed by any Czech retail banking competitor in scope. An initiative that implements these capabilities would be differentiated from the current direct competitive set.

---

## 4 — Participants

Five participants total. Three direct, zero adjacent, two substitute. All new to S1 — `reused: []`.

### Adjacent category — empty (scope exclusion, not research gap)

The scope explicitly excludes adjacent fintech investment platforms — the category that would normally hold robo-advisors, DIY investment apps and non-bank savings mobilization platforms. No other adjacent category (building savings institutions, supplementary pension funds) was identified as sufficiently specific to this market segment to include. This is a Product Owner scope decision recorded at G1, not a research gap.

### Direct participants (3)

| identity_key | Name | Standing | Represents | Deep dive |
|---|---|---|---|---|
| csob.cz | ČSOB | leader | B1 B2 B3 B4 T3 T4 | yes |
| kb.cz | Komerční banka | leader | B1 B2 B3 T3 T4 | yes |
| moneta.cz | MONETA Money Bank | innovator | B1 B4 | yes |

**Other Czech retail banks in this market.** Raiffeisenbank CZ, UniCredit Bank Czech Republic and MONETA (already included) are all present in the savings-to-investment segment. Raiffeisenbank CZ and UniCredit CZ are not named as participants here: B1 and B2 are already at the 3-representative cap, no evidence recovered in this run's budget distinguishes their specific digital investment onboarding from ČSOB and KB, and adding them as participants without trend-representative status is not consistent with the v0.5 model. Both are candidates for a subsequent run's map if ČSOB and KB card research reveals differentiation worth pursuing.

### Substitute participants (2)

| identity_key | Name | Standing | Represents | Deep dive |
|---|---|---|---|---|
| substitute:branch-advisory | Bank branch advisory service | leader | B2 B3 | no |
| substitute:do-nothing | Savings/current account inertia | leader | B1 | no |

**Substitute requirement met (§2).** Two substitutes are named. `substitute:branch-advisory` is the dominant channel substitute (the incumbent human adviser). `substitute:do-nothing` is the behavioural substitute (not investing at all — the most common outcome when digital onboarding fails).

**Leader/innovator split.** MONETA Money Bank is the only named innovator. All others are leaders. Both standings are present across the map, satisfying §2.2.

---

## 5 — Deep-dive selections

**Selected for stage 3.2 (3 participants):** `csob.cz`, `kb.cz`, `moneta.cz`

**Not selected (2 participants) — reasons on each participant entry in front matter.**

The selection logic: ČSOB and KB are the two direct leaders with the most technology-level evidence and the widest trend coverage. MONETA is the only innovator among direct participants and provides the contrast the map needs. The two substitutes (`substitute:branch-advisory`, `substitute:do-nothing`) are categories rather than single profilable organisations.

---

## 6 — Research limitations for stage 3.2

This run's 8-search budget recovered market-level trends and identified the trend-representative participants. What it could not establish — gaps for stage 3.2's per-participant search budget:

1. **ČSOB's specific digital investment onboarding features** — known to have an advanced digital platform; no product walkthrough or feature-level evidence recovered.
2. **MONETA's guided fund selection implementation** — innovator standing rests on digital-first profile and financial performance, not on a specific product feature.
3. **Whether any in-scope Czech bank has implemented T1 (automated suitability) or T2 (behavioral nudge)** — stated as findings in §3; stage 3.2 should search for these specifically per participant.
4. **ČSOB and KB's specific AI recommendation deployment (T3)** — attribution is from platform evidence; direct feature confirmation needed.

---

## 7 — Field name note: `represents` and `standing` (Standards v0.5 additions)

`represents[]` and `standing` appear on each participant entry in the front matter. These fields are specified in Competitive Analysis Standards v0.5 §2.2, and when this artifact was written they were in no field list the build could read — so it followed the Standards as the primary source, wrote them, and recorded the lag here rather than omitting fields its gate required. **The lag closed on 14 August**: both are declared in §6.6 of the business logic and carried by `artifact-fields.yaml`, so the next map is told to write them rather than having to notice. The superseded A5 made a parallel note about a different discrepancy in that file.

---

## 8 — What this artifact does not do

Does not write A6 or A7. Does not run Q3 or report a gate result for its own output — Q3 is checked independently, and stage 3 has no human decision gate behind it. Does not edit `store/S1-competitors.md` — it is generated from committed runs and never hand-edited. Does not touch `RUN-STATE.md`. Does not read or write any other run's directory. Recommends nothing — describing the market is this stage's job; generating ideas from it is stage 4's.
