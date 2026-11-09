---
run_id: 2026-03-investor-onboarding
artifact_id: A7
ost_role: none
status: accepted
workflow: competitive-analysis
modified_by: agent
revisions: 0
produced_by:
  agent: competitive-analysis
  skill: synthesis
scope: run
sources:
  - A6
  - A5
  - A4
external_sources: []
standards_basis: "competitive-analysis-standards@0.5 read and applied. §4 is the synthesis bar. Tier grading per §4.1 is carried in the record and checked by C87 since 14 August — the tiers were in the evidence table and in no field a check could read, which is the defect trends[] had. The evidence table per §4.2 is still unchecked. All three cards carry confidence high since 14 August: the identity key moved to the domain form (§5.1), so §3.3's primary-source test resolves. The mismatch documented in A6 §2 was a key-format defect, not a research one. The emerging tier is structurally unreachable as a standard on this 3-participant map (2 leaders, 1 innovator): a minority is 1 participant, which falls below the 2-participant floor required for a standard. This is a finding about the map scope, not a gap in the synthesis procedure."
could_not_verify:
  - rule: "recommends no action; A7 carries the run id and is never written to S1 (run-scoped contract + empty capability list, not C24)"
    needs: judge
    reach: artifact
assembled_at: 2026-08-20
assembled_from: [R-A7-01]
---

# Competitive Analysis | Competitive Synthesis — Guided investment onboarding for first-time investors

**Run:** `2026-03-investor-onboarding` · **Stage:** 3.3 `synthesis` · **Gate:** Q3 (no decision gate)
**Inputs:** 3-competitive-analysis/2-competitor-cards.md (csob.cz, kb.cz, moneta.cz) · 3-competitive-analysis/1-landscape-map.md · 2-problems/5-prioritised-opportunities.md
**Profiled participants:** ČSOB (leader) · Komerční banka (leader) · MONETA Money Bank (innovator)
**Confidence: high** — all three cards, since 14 August. They read `medium` until then because of the
key-format defect A6 §2 records, which was never a research gap.



**Assembled from one record**, which carries the fields a gate decides: [rec:R-A7-01].
---

## 1 — Facet pass: Offering

All three profiled participants embed investment access within a full-service retail banking relationship. None is a standalone investment platform. The customer has already crossed an account-opening barrier before encountering H1 or H2; the investment journey is nested inside a banking app experience the customer already uses.

**ČSOB** offers the widest integrated breadth: managed mutual funds (ČSOB Asset Management), ETFs, bonds, and shares via Patria Finance subsidiary; micro-investing via card-payment rounding (ČSOB Drobné); regular fund investing (Pravidelné investování); bank-managed discretionary portfolio (Investice na míru); and DIP launched January 2024. Delivery: ČSOB Smart mobile app, ČSOB Investice web portal, 201 branch Financial Centers.

**Komerční banka** matches ČSOB in breadth and adds direct equity and ETF trading on six global exchanges (KB Broker), real estate crowdfunding via the Upvest subsidiary, and investment gold. The Amundi partnership (165 billion CZK AUM, 100+ funds) is the widest managed fund range across the three. Delivery: KB+ mobile app, MojeBanka web platform, video consultation with investment specialists, 399 branches.

**MONETA Money Bank** offers the narrowest and most curated suite: five proprietary MONETA funds (1 Cautious through 5 Dynamic) plus 48+ third-party funds from 10 global asset managers, DIP, and the in-app advisory service launched January 15, 2026. Delivery: Smart Banka mobile, Internet Banka, 140 branches.

**Synthesis across offerings:** The differentiator that bears on A4 problems is not product breadth but guided-path depth. ČSOB and KB build recommendation layers on top of wider catalogues; MONETA presents a narrower catalogue with the most direct single-recommendation path. Greater catalogue breadth at ČSOB and KB means a customer who passes the questionnaire still faces a wider choice set — H1 (choice overload) is present downstream of the questionnaire at both leaders, not only at the entry point.

---

## 2 — Facet pass: Segment

All three profiled participants target the same primary segment: Czech retail banking customers holding savings who have not yet purchased an investment product. The savings-to-investment conversion of existing account holders is the explicit commercial objective at all three.

**ČSOB** (4.3 million clients) explicitly names "complete beginners" (úplný začátečník) as a target and has designed ČSOB Drobné specifically for customers who lack investment knowledge and cannot commit to a minimum.

**Komerční banka** (~1.6 million current-account holders across 399 branches) positions the 100 CZK/month entry minimum — the lowest confirmed figure across the three — as its accessibility claim. The breadth of KB's catalogue (stocks, ETFs, real estate, gold, premium management) creates a more complex decision environment for a first-time investor than the entry minimum implies.

**MONETA Money Bank** (~1.6 million clients, near-100% digital penetration as of FY2025) targets savings-account holders moving toward a first investment. MONETA's digital-first profile makes it the participant most closely matched to the A4 target customer: a savings holder who will complete the investment flow entirely via app or not at all.

**Synthesis across segments:** Segment is not a differentiator — all three compete for the same savings-to-investment mover. The differentiator is reach and depth of digital guidance. MONETA's near-100% digital penetration means its customers encounter H1 and H2 at scale with less natural recourse to the branch fallback, which gives MONETA a structural reason to invest in the in-app guided path (P2) that ČSOB and KB, with larger branch networks, have not yet matched.

---

## 3 — Facet pass: Features

This facet was worked against all 28 features across the three cards (ČSOB: 10, KB: 10, MONETA: 8). Standards ST1 through ST6 and patterns P1 through P5 derive from this pass.

**3.1 Suitability questionnaire (ST1, P1, P2, absence A1)**

All three gate fund investment behind a suitability questionnaire. The design differences are the most directly material findings to H2.

ČSOB derives four risk profiles (conservative, balanced, growth, dynamic); the MiFID II step is embedded in both digital and branch journeys. Adaptive features are unconfirmed — ČSOB product pages returned HTTP 500 throughout this research and the questionnaire's content, question count, and response to no-experience customers are not established.

KB maps the questionnaire to six labelled KB Portfolio strategies (Reserve through Stock Index). The questionnaire operates in-app, in-branch, and via video call. Question count, content, and adaptive logic are not publicly described.

MONETA's 25-question advisory (January 2026, confirmed by e15.cz and moneta.cz) is the most detailed and most recently launched. Its output is a single named fund recommendation purchasable immediately within Smart Banka — no separate fund-navigation step. The 25 questions are not described as adaptive to investor knowledge level.

No card across the three records a questionnaire that adjusts its vocabulary or question set for first-time investors (absence A1). The branch adviser (ST5) is each bank's current answer to H2; no digital equivalent is evidenced.

**Note on the card-over-map rule for KB:** A5 attributed T3 (AI fund recommendation) and T4 (agentic onboarding automation) to Komerční banka from its Temenos platform selection. The KB card records no AI-powered recommendation engine or agentic automation in its investment features. KB's investment recommendation is delivered by a standard six-strategy questionnaire mapping and human advisers (branch or video call). Pattern P4 records the platform-level capability; the card is used over the landscape map where the two disagree, as the task requires.

**Note on MONETA's innovator standing (two components treated separately):** Under B4 (guided fund selection), MONETA's innovator standing is feature-backed: the 25-question in-app advisory with immediate purchase is confirmed by e15.cz (January 2026) and moneta.cz primary material. Whether this feature predates equivalent flows at ČSOB or KB is not established. Under B1 (savings mobilisation), MONETA's innovator standing rests on organisational character — digital-first, more agile, smaller — rather than a specific product feature distinguishing it from the leaders; the MONETA card records this as a gap. These two components are not averaged: B4-based innovator standing is concrete and feature-backed; B1-based innovator standing is structural and gap-qualified.

**3.2 DIP (ST2)**

DIP is legally standardised across participants (48,000 CZK/year deductible, employer contributions up to 50,000 CZK/year, 10-year minimum, withdrawal from age 60). All three offer it as a named feature. Differentiation is on onboarding experience and fee structure, not product terms. ČSOB launched January 2, 2024 and initially required branch routing or Patria Finance for new investors completing full digital setup.

**3.3 Mobile app (ST3)**

ČSOB Smart (fund composition visibility added February 2025), KB+ (independently rated 94% by finex.cz, described as clear and modern), and MONETA Smart Banka (rated 4.8/5, 200+ functions, 41 products available in-app) all deliver the investment journey within the banking app. KB+ receives the most consistently positive independent ratings; MONETA Smart Banka carries the highest app store rating across the three.

**3.4 Branch advisory (ST5)**

All three retain branch advisory as the fallback. ČSOB: 201 Financial Centers. KB: 399 branches plus video consultation with investment specialists — KB is the only profiled participant offering video advisory as a named feature, reducing the physical friction of the branch fallback without requiring an in-person visit. MONETA: 140 branches.

**3.5 Multi-bank account consolidation (ST6)**

ČSOB (Multibanking cross-bank view) and MONETA (described on moneta.cz primary material as the first Czech banking app with multi-bank account management; claim recency not independently confirmed in 2026) both surface cross-bank savings data. KB has no equivalent feature in this card. For a savings-to-investment mover, a cross-bank savings view reduces the cognitive cost of assembling a full savings picture before making a first investment decision.

**3.6 Features present at no profiled participant — absences A1, A2, A3**

No card records:
- An adaptive questionnaire adjusting for first-time-investor vocabulary (absence A1 — H2)
- In-flow educational content explaining fund types, risk ratings or investment terminology before or during the questionnaire (absence A2 — H2)
- A dropout-recovery mechanism for customers who exit fund selection without completing a choice (absence A3 — H1)

T1 (automated suitability assessment) and T2 (behavioural nudge technology) are both in production globally (A5) but neither has an in-scope representative among Czech retail banking competitors. These three absences are the most direct market signal this synthesis delivers to stage 4.

---

## 4 — Facet pass: USPs

**ČSOB USPs bearing on A4 problems:**
ČSOB Drobné (card-payment rounding, automatic investment at 300 CZK accumulation, zero minimum, no subsequent customer decision required) is the most radical reduction of H1 across all three cards — it removes the fund selection decision entirely after a one-time setup. It applies to a micro-investing use case, not the standard savings-conversion flow, so it does not resolve H1 for a customer attempting a first deliberate fund purchase. The DIP zero-entry-fee promotion (July 2025–December 2026) reduces price uncertainty at fund selection but does not address choice complexity. The KBC Group technology transformation (Temenos T24, Camunda) is a capability signal, not a confirmed feature.

**KB USPs bearing on A4 problems:**
The 100 CZK/month minimum entry (the lowest confirmed in this card set) reduces the financial stakes at the point where H1 and H2 create doubt; a customer less afraid of the monetary commitment may be more willing to push through a difficult questionnaire. The Temenos Transact foundation (P4) carries platform-level potential relevant to H2 that is not yet deployed in the investment flow.

**MONETA USPs bearing on A4 problems:**
MONETA's in-app guided fund advisory (January 2026) is the most directly relevant USP to H1 in this card set. A 25-question flow ending in a single named fund with immediate in-app purchase eliminates the catalogue-navigation step where H1 occurs at ČSOB and KB. This USP directly addresses the B4 trend and is the feature that earns MONETA's innovator standing on that trend.

---

## 5 — Facet pass: Pricing

All three operate a bundled pricing model: no standalone investment account fee; investment access is included within the banking relationship. The universal pattern is ST4: fee schedules published as PDFs or disclosed at branch, not on main product pages.

**ČSOB:** entry fee zero for regular standing orders in the promotional window (July 2025–December 2026); DIP account management free; fund management TERs not retrieved (MiFID cost disclosure PDF returned HTTP 500); lump-sum DIP entry fee unconfirmed (a 3% figure appears in comparison search text but was not verified against a directly retrieved source); premium-tier fee schedule not published. Minimum: 1,500 CZK/month standard, 4,000 CZK/month Premium; ČSOB Drobné has no minimum.

**Komerční banka:** no separate investment account fee; regular investing from 100 CZK/month; one-time fund investment from 5,000 CZK; Upvest no entry fee for KB clients; private asset management minimum 250,000 CZK. Fund management fee percentages not published on product pages; a January 2025 pricing schedule PDF (CZ-014) is referenced on kb.cz but was not readable in text format. Independent reviewers (finex.cz, top.cz) consistently identify higher fees as a weakness versus digital competitors.

**MONETA:** no monthly account fee; exit fees CZK 0 for most open-ended funds; early redemption fee 3–10% for 5-year closed-end funds; in-branch or phone investment transaction CZK 2,495; entry and management fee percentages not on product pages (PDF fee schedule at moneta.cz/dokumenty not retrieved). Fee schedule described by finex.cz as "unclear and complex."

**Pricing synthesis:** Fee opacity is structural and universal across all three participants (ST4). No competitor has differentiated on price transparency. KB's 100 CZK/month and MONETA's 300 CZK/month are the named low-entry minimums; ČSOB Drobné is the lowest effective entry. Fee opacity compounds H1 by adding cost uncertainty to an already-complex choice: a first-time investor evaluating funds cannot price-compare without leaving the digital flow.

---

## 6 — Facet pass: Differentiation

**MONETA versus ČSOB and KB:** MONETA is differentiated by the in-app advisory (P2), the highest app rating (4.8/5), near-100% digital client penetration, and the most curated catalogue. Its scale (140 branches, narrower product range) limits reach but concentrates investment in the digital onboarding experience most relevant to the A4 target customer. MONETA's in-app advisory is the only feature in the three cards that addresses H1 end-to-end within the digital channel without a branch fallback or catalogue step.

**ČSOB versus KB:** Both are full-service incumbents with large branch networks, questionnaire-to-catalogue patterns (P1), and confirmed platform investments without confirmed adaptive questionnaire deployment (P4). ČSOB differentiates with ČSOB Drobné (unique micro-investing mechanism that avoids H1 by eliminating the choice), the DIP promotional fee period, and the integrated bank-insurer model. KB differentiates with the lower entry minimum (100 CZK/month), Amundi fund breadth, and the Upvest real estate niche. ČSOB's Drobné is the only feature across all three cards that systematically avoids H1 — by removing the choice rather than guiding it — but it applies to a different use case than the savings-conversion flow H1 describes.

**What no competitor has done:** No profiled participant has differentiated on questionnaire accessibility for first-time investors, in-flow financial education, or onboarding dropout recovery. H2 and the H2-absence cluster (A1, A2) point at a space the market has not entered. H1's absence (A3) identifies a dropout-recovery gap that even MONETA's in-app advisory does not address once a customer has exited.

---

## 7 — Evidence table (§4.2 of the Standards)

Confidence for this synthesis: **high** across all three cards, since 14 August. Each carries 6 to 8 independent publisher keys, no core gap, and its own domain among its sources, so §3.3's primary-source test resolves. **It read `medium` until then** for a reason that was never about the research: A5 keyed participants in a namespace form (`czb:*`) while every publisher key is a domain, so the equality test could not pass for any card in this run. A6 §2 carries the history and C54 now reads the format.

| Standard | Exhibited by | Tier | Confidence | What it means for this run |
|---|---|---|---|---|
| ST1 — Suitability questionnaire as mandatory onboarding gate | ČSOB, KB, MONETA (3/3) | Universal | High | H2 targets the exact gate every competitor uses; no competitor has made this gate accessible to first-timers; an initiative that solves H2 is working on a problem the entire market has acknowledged and none has resolved digitally |
| ST2 — DIP as part of core retail investment suite | ČSOB, KB, MONETA (3/3) | Universal | High | DIP onboarding is a concrete instance where both H1 and H2 occur; the product is legally standardised so differentiation must come from the onboarding experience |
| ST3 — Mobile app as primary digital investment channel | ČSOB, KB, MONETA (3/3) | Universal | High | Both H1 and H2 occur inside the app; the app is the correct intervention surface and any improvement is immediately comparable across all three competitors |
| ST4 — Fee opacity (management and entry fees not on main product pages) | ČSOB, KB, MONETA (3/3) | Universal | High | Compounds H1 by adding cost uncertainty to an already complex choice; no competitor offers a fee comparison within the digital flow |
| ST5 — Branch advisory as fallback alongside digital | ČSOB, KB, MONETA (3/3) | Universal | High | Branch is the market's current solution when the digital questionnaire fails (H2); a digital fix competes against a fallback that is well-established and trusted, even if it carries a friction cost |
| ST6 — Multi-bank account consolidation in the banking app | ČSOB, MONETA (2/3) | Common | High | KB is not present; ČSOB and MONETA give savings-to-investment movers a cross-bank savings view that provides context at the moment H1 occurs |

**Tier note — why emerging is absent from standards:** With 3 profiled participants (ČSOB: leader, KB: leader, MONETA: innovator), a minority in this set is 1 participant. One participant cannot constitute a standard. Patterns P2 and P5 (MONETA-only findings that align with B4 and T2 respectively) capture what the `emerging` tier would name at a higher participant count; they appear as patterns because 1 participant is a choice, not a standard. Stage 4 should weight P2 and P5 as emerging-direction signals regardless of their pattern classification.

---

## 8 — Absences (findings, not empty sections)

**A1 — H2 — No adaptive questionnaire for first-time investors**
The technology to make a suitability questionnaire adaptive (T1: Muinmos, Fenergo) is in production at specialist vendors globally and has no in-scope Czech retail bank representative. All three participants' questionnaires are static or of unconfirmed adaptivity. The specific gap H2 names — questions presupposing investment experience — is unaddressed by any competitor's digital channel. An initiative that implements adaptive question logic for first-time investors has no in-scope digital peer.

**A2 — H2 — No in-flow financial education during onboarding**
No card records an educational interlude embedded in the investment questionnaire or fund selection flow to explain investment vocabulary (fund types, risk ratings, what a suitability question is asking). The branch adviser currently performs this role offline. No digital equivalent is evidenced at any profiled participant.

**A3 — H1 — No dropout-recovery mechanism in fund selection**
No card records a mechanism to re-engage customers who exit the in-app fund selection without completing a choice. T2 (behavioural nudge technology) is deployed at excluded fintech platforms but has no in-scope representative. The market's current response to H1 dropout is the branch fallback (ST5) — an offline solution to a digital abandonment.

**A4 — H3 (parked) — No settlement-timeline transparency at order confirmation**
No profiled participant evidences features addressing settlement and payment timing at the investment order confirmation screen. H3 is parked in this run (A4 decision, 2026-08-12) but is recorded here for a future run in which it is load-bearing.

---

## 9 — What this artifact does not do

Does not research. This binding holds an empty capability list; every element above traces to a card in A6 or to A5. Does not write to S1. Does not run Q3 or report a gate result for its own output. Does not recommend any action — stage 4 generates ideas from this material; this step describes the market. Does not touch RUN-STATE.md, A5, A6, or any file outside fixtures/2026-03-investor-onboarding/3-competitive-analysis/3-competitive-synthesis.md.
