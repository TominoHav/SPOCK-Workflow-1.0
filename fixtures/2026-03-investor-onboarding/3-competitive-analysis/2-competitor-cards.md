---
run_id: 2026-03-investor-onboarding
artifact_id: A6
ost_role: none
status: accepted
workflow: competitive-analysis
modified_by: agent
revisions: 2
produced_by:
  agent: competitive-analysis
  skill: deep-dive
store: S1
scope: shared
egress_basis: pilot-test
standards_basis: "competitive-analysis-standards@0.5 read. Re-emitted with entry shapes declared in §3.1: features[] carries name/detail/source; usps[] carries claim/evidence/source (unchanged from prior emit); pricing_model is one prose string. ČSOB pricing_model folded from nested map to prose — no figures lost. MONETA confidence corrected from high to medium by human edit on 2026-08-13; confidence_basis carried verbatim from corrected file. identity_key namespace defect recorded in prose body §2. §6.1 reduction applies throughout."
could_not_verify:
  - rule: "fetches through the quarantine bridge and derives from the extract, never raw text; a failed branch is unprofiled with a reason"
    needs: judge
    reach: process
sources:
  - A5
  - notes/card-csob
  - notes/card-kb
  - notes/card-moneta
external_sources: [csob-investice-portal, csob-smart-search, finex-csob-2026, fintechstrategy-csob-2025, vpenize-csob-dip, mesec-dip-comparison, banky-csob-review, financera-csob-2026, kbc-group-data, kb-investments-en, kb-portfolio-cs, kb-regular-investing-cs, kb-minimums-cs, kb-premium-investments-en, amundi-kb-homepage, temenos-kb-live-2022, temenos-kb-success-2023, kb-wiki, finex-kb-review, top-cz-kb-review, moneta-investice-2026, e15-moneta-advisory-jan2026, finex-moneta-review-2024, pymnts-moneta-realtime-2025, yahoo-moneta-fy2025-earnings, 5nej-moneta-review-2025]
assembled_at: 2026-08-20
assembled_from: [R-A6-01]
---

# Competitive Analysis | Competitor Deep-Dive — Guided onboarding for first-time investors

Three Czech banks were profiled and all three sell investing to people who already bank with them, which means none of them has to solve the hardest part of first-time investing: getting someone to start at all. Each offers a digital investment account inside an existing banking relationship, and each treats the onboarding step as an extension of that relationship rather than as the moment a customer decides whether investing is for them. What none of the three publishes is what a first-time investor is told before the first purchase.

---

## ČSOB (Československá Obchodní Banka)

Researched 2026-08-13 · direct participant · leader on B1, B2, B3, B4, T3, T4 · confidence high [rec:R-A6-01]

### What they offer

Retail investment platform spanning managed mutual funds (ČSOB Asset Management), ETFs, bonds, and shares accessible via Patria Finance subsidiary. Delivered through ČSOB Investice web portal, ČSOB Smart mobile app, and 201 branch Financial Centers. Core products: regular fund investing (Pravidelné investování), bank-managed bespoke portfolio (Investice na míru), micro-investing via card-payment rounding (ČSOB Drobné), and a tax-advantaged long-term investment account (DIP, launched January 2024). Part of a fully integrated banking, investment, insurance, and pension proposition under KBC Group ownership.

Retail banking customers in the Czech Republic, primarily existing ČSOB account holders. Primary target: savings customers being moved into investment products, including explicitly first-time investors ("úplný začátečník" — complete beginners). Secondary: Premium clients with higher monthly minimums (4,000 CZK vs. 1,500 CZK standard). DIP targets customers with long-term retirement or savings goals. ČSOB Drobné specifically targets zero-commitment entry — no investment knowledge or decision required from the customer after initial setup. Total active base: 4.3 million clients.

**Investment suitability questionnaire.** Customer answers orientation questions in-app or in-branch; bank derives investment profile (conservative, balanced, growth, or dynamic) and recommends a matching fund portfolio — the mandatory MiFID II suitability step is embedded in both digital and branch journeys.

**ČSOB Smart app investment management.** Customer can view fund composition, see portfolio manager news updates, initiate regular investment orders, and navigate to the Investment Portal — all in-app; fund composition visibility added February 2025.

**ČSOB Drobné micro-investing.** Every card payment is rounded up to the nearest 20 CZK; when 300 CZK accumulates it is automatically invested into ČSOB Bohatství fund — customer sets it up once, no further decision required, no minimum upfront amount.

**Pravidelné investování (regular monthly investment).** Customer configures a standing monthly order via ČSOB Smart or the Investment Portal; minimum 1,500 CZK/month (standard) or 4,000 CZK/month (Premium); invested in selected managed funds at a consistent cadence (cost-averaging).

**Investice na míru (bank-managed discretionary portfolio).** After completing the questionnaire, the bank constructs and actively manages a custom fund combination matched to the customer's risk profile; customer defines goals and risk tolerance and does not select individual funds.

**DIP (Dlouhodobý investiční produkt).** Tax-advantaged long-term investment account launched January 2, 2024; 10-year minimum hold, withdrawal from age 60; customer deducts contributions up to 48,000 CZK/year from taxable income; setup online via Patria Finance WebTrader or at ČSOB branch.

**Patria Finance digital brokerage access.** ČSOB subsidiary enables online trading in stocks, ETFs and bonds; provides fully digital DIP setup using banking identity or document photos with immediate activation; purchase fees at 50% discount vs. standard ČSOB rates.

**ČSOB Investice web portal.** Browser-based platform covering mutual fund shares, bonds, investment certificates, structured deposits and discretionary portfolios across the ČSOB group — accessible independently of the mobile app.

**Branch and Financial Center in-person advisory.** Personal adviser supports investment questionnaire completion, Investment Services Agreement signing and product setup; required for new investors opening DIP on the ČSOB core platform (201 branches, 1,022 ATMs).

**Multibanking cross-bank view.** Customer can see accounts from other Czech banks within the ČSOB Smart app alongside ČSOB investments and insurance, providing a consolidated financial position in a single interface.

### What stands out

**Fee-free regular investing for the lifetime of the investment when set up during the promotional window.** ČSOB promotes 'you pay no fees for the entire lifetime of the regular investment' for products set up July 2025–December 2026. Confirmed by csob.cz search result extracts and vpenize.cz DIP review confirming zero entry fee for regular monthly standing orders with unlimited validity. Promotional scope is clearly bounded; beyond the window, fee status for new investments is not confirmed from retrieved sources.

**DIP provides tax deduction of up to 48,000 CZK per year with zero entry fee on regular ČSOB-fund purchases.** vpenize.cz confirms: DIP account management free; entry fee zero for regular monthly standing orders with unlimited validity; tax deduction up to 48,000 CZK/year; savings of 7,200 CZK at 15% tax rate, 11,040 CZK at 23% rate; employer contributions up to 50,000 CZK/year without social/health insurance obligations.

**ČSOB Drobné enables entry into investing with no minimum upfront decision — fully automated after single setup.** Card payment rounding to nearest 20 CZK; automatic investment when 300 CZK accumulates in ČSOB Bohatství. Confirmed in csob.cz search result extracts (ČSOB Smart app feature) and financera.cz review. No minimum investment required; customer makes no subsequent investment decisions.

**Integrated bank-insurer model provides investments, banking, insurance, and pension in one relationship.** kbc.com group data confirms KBC Group's integrated bank-insurer model applied across subsidiaries including ČSOB. csob.cz confirmed product range spanning mutual funds, pension insurance, life insurance, and building savings alongside banking. Confirmed by finex.cz review noting ČSOB covers 'all financial needs in one place.'

**KBC Group technology transformation (Temenos T24 + Camunda) positions ČSOB for improved digital investment capabilities.** fintechstrategy.com (July 2025): UP!Core transformation program rebuilding IT ecosystem around Temenos T24; Camunda-powered Customer Journey Manager deployed; OTP Bank Slovak client migration to T24 completed. This is a capability-building claim backed by deployment evidence, not yet a feature claim — the investment onboarding benefits of T24 are not yet specifically evidenced in retrieved sources.

*Their own positioning.* Stable, comprehensive Czech financial institution where customers can manage banking, savings, investments, insurance, and pension in one relationship. Investment positioning emphasizes safety and accessibility for first-time investors, with bank-managed options (Investice na míru, ČSOB Drobné) designed for customers who lack investment experience or do not want to make fund-selection decisions themselves. Supported by the scale and credibility of the KBC Group.

### Where the journey stops

Described as 'traditional rather than innovative' in investments; perceived as slower to adopt digital features than neobank competitors

Charges fees for services competitors offer free — specifically noted as a recurring criticism versus digital competitors

DIP setup for new investors initially required a branch visit on ČSOB's core platform; full digital onboarding routed through subsidiary Patria Finance rather than the main ČSOB app

Mobile app received 4.1/5 on Google Play with customer comments noting it 'could be better'; some services restricted to Czech citizens only

### What it costs

Bundled model: investment services are part of a broader banking relationship with no separate account fee for the Investment Portal or the mobile app investment features; individual products carry their own cost structures. Regular investing: entry fee zero for regular monthly standing orders (vpenize.cz); fee-free for the investment lifetime when opened July 2025–December 2026 (csob.cz); minimum 1,500 CZK/month standard, 4,000 CZK/month Premium. DIP: account management free (vpenize.cz); entry fee zero for regular standing orders in ČSOB-managed funds (vpenize.cz); lump-sum DIP entry fee not confirmed from directly retrieved sources — csob.cz returned HTTP 500 and a 3% figure appears in comparison site search result text but was not verified against a directly retrieved source; Patria Finance purchase fee 50% discount vs. standard ČSOB rates (vpenize.cz); tax benefit up to 48,000 CZK/year deductible from taxable income (vpenize.cz). Fund TERs: not confirmed — ČSOB's MiFID cost disclosure PDF identified in search results but returned HTTP 500; individual TERs for ČSOB Bohatství, ČSOB Akciový and ČSOB Premiéra not confirmed from fetched sources. One-off investment entry fee: not confirmed from retrieved sources. Premium fee schedule: not published in retrieved sources; Premium tier exists (4,000 CZK/month minimum) but tier-specific fee schedule not retrieved.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks was recorded as something the research could not establish rather than as something the participant is confirmed not to do, and the two are not the same claim.

---

## Komerční banka

Researched 2026-08-13 · direct participant · leader on B1, B2, B3, T3, T4 · confidence high [rec:R-A6-01]

### What they offer

Universal Czech retail bank offering a full-spectrum investment product suite: Amundi-branded mutual funds (100+, via the Amundi-KB joint platform managing 165 billion CZK AUM), KB Portfolio managed strategies (six risk-labelled options), direct stock and ETF trading via KB Broker on global exchanges, Upvest real estate crowdfunding, investment gold, insurance-linked investments (Vital Invest), and a tax-advantaged long-term investment product (DIP). Investment access is delivered through the KB+ mobile app and MojeBanka web platform, with branch and video-call adviser support.

Czech retail banking customers broadly: approximately 1.6 million current-account holders across 399 branches. Primary investment segment: existing KB customers converting savings to investment products. First-time investor entry is available from 100 CZK/month. Premium segment (250,000 CZK+ portfolio) served through private asset management with dedicated manager.

**Amundi mutual fund selection.** Customer selects from 100+ equity, bond, mixed, ESG and thematic funds (Amundi, KB Portfolio series) categorised by risk level (1-7 scale), investment horizon and market focus; available in CZK, EUR, USD, JPY; minimum 100 CZK/month regular or 5,000 CZK one-time.

**KB Portfolio managed strategies.** Customer chooses one of six risk-labelled professionally managed strategies: Reserve (risk 2/7, 1-2yr, 1-4% expected annual return), Conservative (3/7, 3yr, 2-5%), Balanced (3/7, 4yr, 3-6%), Dynamic (3/7, 5yr+, 4-7%), Dividend (4/7, 5yr+, 5-8%), Stock Index (4/7, 6yr+, 5-10%); Amundi fund managers handle ongoing allocation.

**Online investment suitability questionnaire.** Customer completes risk-profile assessment in-app or in-branch before fund selection; outcome maps to the KB Portfolio strategy range; access also available via bank adviser or video call.

**KB Broker direct securities trading.** Customer buys and sells individual stocks and ETFs on global exchanges (Nasdaq, NYSE, Euronext, Xetra, Prague Stock Exchange, London Stock Exchange) via KB+ mobile app.

**Regular investment standing orders.** Customer sets automatic monthly contributions from 100 CZK via KB+ or MojeBanka; modifiable or cancellable at any time; no withdrawal fee; redemption within approximately one week.

**Upvest real estate crowdfunding.** Customer invests in specific Czech property development projects from 5,000 CZK per project via KB's fintech subsidiary (96% KB-owned since 2020); no entry fee for KB clients.

**Investment gold.** Customer purchases a precious metals investment product through the KB investment platform.

**Long-term investment product (DIP).** Tax-advantaged retirement savings vehicle combining fund investment with employer contribution support; dedicated fee schedule.

**Video consultation with KB investment specialists.** Customer books a remote advisory session without a branch visit for fund selection guidance and portfolio questions.

**Private asset management (premium).** Bespoke portfolio managed by a dedicated BRICK Asset Management or KB private banker; minimum 250,000 CZK invested; combines KB funds with active management and wider asset class access.

### What stands out

**Amundi partnership: access to Europe's largest asset manager at 100 CZK/month minimum, the lowest confirmed entry point among Czech incumbent banks.** Amundi-KB Czech platform manages 165 billion CZK AUM across 250,000+ clients; kb.cz markets 100 CZK/month as the entry point for regular investing (amundi-kb.cz homepage; kb.cz/cs/obcane/investice/pravidelne-investovani)

**Société Générale group backing provides capital strength, technology access, and international asset management reach beyond what Czech-independent banks can offer.** SG holds 60% of KB (Wikipedia); KB Premium lists group-level qualified investor funds, structured investment certificates, and private equity access unavailable from smaller Czech competitors (kb.cz/en/kb-premium/investments)

**Temenos Transact core banking foundation enabling new product launches at approximately half prior development cost, with 24/7 system availability.** Temenos Transact went live February 2022; the 2023 Temenos success story confirmed development time reduced by approximately 50%; over one million clients migrated by end of 2024 on track for all 1.6 million by end 2025 (temenos.com)

**Upvest proprietary fintech subsidiary for real estate crowdfunding — an alternative investment channel integrated into KB's platform that no other listed Czech incumbent bank holds in-house.** KB acquired 96% of Upvest in 2020; KB clients invest with no entry fee per the investment products page (Wikipedia; kb.cz/en/individuals/investments)

*Their own positioning.* Full-service Czech banking institution targeting the digital banking leadership position among Czech banks, with investment access backed by Société Générale group resources and the Amundi partnership. Customer-facing message: start investing from 100 CZK/month with professional fund management, within your existing banking relationship.

### Where the journey stops

Fund management fee percentages not published online: customers cannot price-compare without downloading a binary PDF or visiting a branch, which creates friction for first-time investors considering KB

Digital innovation lag relative to fintech competitors: complex investment operations require branch contact; personalized fund recommendation depends on human advisors rather than automated tools

Negative customer sentiment on independent review aggregators: Trustpilot and tradersunion.com are reported to show predominantly negative reviews, with complaints including fund underperformance relative to global ETFs at high fees and poor international-customer communication

### What it costs

Model type: tiered by product; no standalone investment account fee — investment access is bundled with bank account ownership. Published minimums: Regular fund investing: 100 CZK/month One-time fund investment: 5,000 CZK (stated on support page) Upvest real estate projects: 5,000 CZK per project; no entry fee for KB clients Investment management (private): 250,000 CZK minimum portfolio Account maintenance fees (not investment-specific): Start tier: 39 CZK/month Comfort tier: 89 CZK/month Exclusive tier: 169 CZK/month Fund management fees: NOT publicly stated on the main investment product pages. A pricing schedule for Amundi Invest funds (KB document CZ-014, dated 13 January 2025) is referenced on kb.cz but was not readable in text format during this research (binary PDF). Customers are directed to branch staff or the Key Investor Information Document (KIID) for specific percentages. Unpublished pricing is itself a market fact: competitors who publish fee tables give customers a direct comparison point that KB does not currently provide online.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks was recorded as something the research could not establish rather than as something the participant is confirmed not to do, and the two are not the same claim.

---

## MONETA Money Bank

Researched 2026-08-13 · direct participant · innovator on B1, B4 · confidence high [rec:R-A6-01]

### What they offer

Czech retail bank (one of the ten largest) serving 1.6 million customers with a digital-first model. Investment suite: (1) five proprietary MONETA funds (MONETA 1 Cautious through MONETA 5 Dynamic, risk-rated from bonds-focused to equity-focused); (2) 48+ third-party open-ended mutual funds from 10 global asset managers available through Smart Banka and Internet Banka; (3) Long-term Investment Product (DIP) with tax deduction up to CZK 48,000/year and employer contributions up to CZK 50,000/year; (4) in-app investment advisory service — 25-question questionnaire recommends one of five MONETA funds and the fund is purchasable immediately in-app (launched January 15, 2026). Minimum entry: CZK 300/month for MONETA funds; CZK 500 for some third-party funds. Channels: Smart Banka mobile app, Internet Banka, 140 branches.

Czech retail customers (primary) and SME segment (secondary). Within retail, the investment offering targets savings-account holders who are moving toward their first investment product. Client base nearing 100% digital penetration (FY2025 results). Also serves long-term retirement savers via the DIP product.

**In-app fund advisory questionnaire.** Customer answers 25 questions in Smart Banka; app recommends one of five MONETA funds matching stated objectives; the recommended fund is purchasable immediately within the app without leaving the channel. Launched January 15, 2026.

**Five-tier proprietary fund range.** MONETA 1 (Cautious, primarily state and corporate bonds) through MONETA 5 (Dynamic, almost exclusively equities); each carries a plain-language risk label; investable from CZK 300/month.

**Multi-bank account management in Smart Banka.** Customer can view and manage accounts held at other Czech banks within the MONETA app; described on primary site as the first Czech banking app to provide this capability.

**Real-time personalised offer engine.** Decision-making rules engine triggers contextual offers within 7 seconds of a qualifying customer transaction (e.g. travel insurance offer delivered 7 seconds after airfare purchase); deployed via AWS, SAS and Trask.

**Long-term Investment Product (DIP).** Customer invests monthly into mutual funds within a tax-advantaged wrapper; deducts up to CZK 48,000/year from taxable income; employer may contribute up to CZK 50,000/year; minimum hold 10 years, withdrawal from age 60.

**Third-party fund marketplace.** 48+ open-ended mutual funds from Goldman Sachs AM, Fidelity International, Franklin Templeton, J&T, Generali Investments, UNIQA, Invesco, East Capital, Petrus Advisers and MBH Fund Management — all purchasable through Smart Banka or Internet Banka without a branch visit.

**Online-only investment execution.** All fund purchases and sales completable digitally; most redemptions processed within 5 business days; exit fees are CZK 0 for most open-ended funds.

**New thematic fund additions (end-2025).** J&T WOOD Defense (direct defence industry equities) and Generali Bond Opportunities Fund (targets return 2 percentage points above Czech savings account returns) added to catalogue.

### What stands out

**In-app guided fund advisory — 25-question questionnaire delivers fund recommendation and enables immediate purchase within Smart Banka.** e15.cz (January 2026), article by Kamila Ondráčková, confirms January 15, 2026 launch date; quotes Jiří Fait (MONETA product manager for investments): 'Interest in our funds exceeded expectations after Q1, prompting online service expansion to reach investors avoiding branch visits.' Confirmed on moneta.cz primary pages.

**First Czech banking app to provide multi-bank account management.** Stated on moneta.cz primary material; referenced as a distinguishing capability in third-party reviews (finex.cz, 5nej.cz search result descriptions). Independent head-to-head verification — confirming no competitor offered this first — was not found in this research.

**Lowest investment entry point in the in-scope competitor set: CZK 300/month.** Stated on moneta.cz/sporeni-a-investice/podilove-fondy and moneta.cz/sporeni-a-investice/fondy-od-monety. Competitive comparison for ČSOB and KB minimums was not independently verified in this research.

**Banking Innovator of the Year — Hospodářské noviny award, four consecutive years.** Cited in finex.cz product review (updated December 2024) as a 2022 award (four consecutive years at that point). Whether the streak continued through 2023–2025 is not confirmed by this research.

*Their own positioning.* Self-described as "the most innovative financial services organisation in the Czech Republic." Positions Smart Banka's low minimum (CZK 300) and 25-question in-app advisory as lowering the investment entry barrier for first-time investors, in contrast to higher-minimum or branch-first investment channels.

### Where the journey stops

Fee schedule described as 'unclear and complex' (nepřehledný a složitý sazebník); specific entry fee percentages for individual funds not disclosed on main product pages — customers must access a PDF

Weekend customer support limited to chatbot only — insufficient for complex investment queries at a key decision moment

Customer satisfaction gap: editorial rating 9.4/10 versus user-reported average 6/10 from 62 respondents — suggests actual customer experience diverges from promotional assessments

### What it costs

No monthly account fee for Smart Banka or Tom current account. Investment-specific pricing: - Entry fees: vary by individual fund; specific percentages not published on product pages; available in PDF fee schedule at moneta.cz/dokumenty-ke-stazeni/sazebniky — not accessible in this research. Specific numbers are not fully public. - Exit fees: CZK 0 for most open-ended mutual funds. For 5-year closed-end funds, early redemption fee is 3–10% depending on the fund. - Management fees (TER): not disclosed on product pages; described as deducted before fund performance figures are published. Specific percentages not found in accessible sources. - DIP wrapper: no separate account fee; underlying fund management fees apply. - In-branch or phone investment transaction: CZK 2,495. - Statements by mail or branch collection: fee applies; amount not specified in accessible pages.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks was recorded as something the research could not establish rather than as something the participant is confirmed not to do, and the two are not the same claim.

---

## What we could not establish

**ČSOB (Československá Obchodní Banka).**

- **field** — pricing_model.fund_ter
- **reason** — ČSOB's MiFID cost disclosure PDF (csob.cz/documents/mifid-naklady-a-poplatky.pdf) was identified in search results but returned HTTP 500 on direct fetch. Individual fund TERs for ČSOB Bohatství, ČSOB Akciový and ČSOB Premiéra are not confirmed from any retrieved source. The cost structure within the fund is opaque from retrieved material.
- **field** — pricing_model.entry_fee_lumpsum
- **reason** — Entry fee for one-off (non-regular) DIP purchases not confirmed from directly retrieved sources. A figure of 3% appears in aggregated search result text attributed to comparison sites, but was not verified against a source that could be attributed independently. Not included to avoid mis-attributing a number.
- **field** — features.suitability_questionnaire_detail
- **reason** — The investment questionnaire is referenced in multiple sources as the onboarding entry point, but its specific questions, number of items, whether it adapts to first-time investor knowledge level, and how it handles customers with no investment experience are not established. csob.cz product pages returned HTTP 500; the Ambis Business School PDF (is.ambis.cz) found in search results is an academic study, not ČSOB's current live questionnaire. This is the specific gap identified as highest value in A5 §6 and it remains unresolved — ČSOB's online pages were inaccessible.
- **field** — features.ai_recommendation_detail
- **reason** — T3 (AI fund recommendation) and T4 (agentic onboarding automation) were attributed to ČSOB in A5 based on 'advanced digital banking platform' evidence. Retrieved sources confirm Camunda Customer Journey Manager is deployed (fintechstrategy.com) and Temenos T24 migration is underway, but whether the investment onboarding journey specifically uses AI recommendation or adaptive automation is not confirmed. The investment questionnaire flow appears to be a standard static or semi-static questionnaire producing a profile, not a specifically AI-powered adaptive engine — this is an absence of evidence, not evidence of absence.
- **field** — pricing_model.premium_fee_schedule
- **reason** — Premium client tier exists (minimum 4,000 CZK/month investment) but Premium-specific fee structure beyond the minimum threshold is not published in retrieved sources.
- **field** — features.mobile_onboarding_ux
- **reason** — Step-by-step UX of in-app investment onboarding (screen count, dropout point design, what happens if a first-time investor selects a risk level inconsistent with their knowledge, whether there are educational interludes) is not described in retrieved sources. The eman.cz developer case study described the app build methodology but not the investment onboarding flow specifically.

**Komerční banka.**

- **Specific fund management fee percentages (Amundi Invest)** — the January 2025 KB pricing schedule PDF (CZ-014) is referenced on kb.cz but returned binary content unreadable in text format; no specific management or entry fee percentages recovered from any fetched page; this is the single most material gap for the pricing_model field"
- **T3 (AI fund recommendation) not confirmed — direct finding** — KB's Temenos implementation covers core banking, deposit products, and REST API integrations; no AI-powered investment recommendation, personalisation engine, or robo-advisor was found on any KB product or support page, or in the two Temenos implementation documents. The Temenos 2023 success story mentions AI exploration for fraud detection and developer tooling (roadmap items), not live capabilities; no investment-specific AI features are referenced. The A5 landscape map attributed T3 to KB via Temenos platform inference — that inference is not supported by direct evidence from this research. KB's investment recommendation as of this research date is delivered by: (a) a standard online suitability questionnaire mapping to one of six KB Portfolio risk strategies, and (b) human advisors via branch or video call. T3 is unconfirmed for KB."
- **T4 (agentic onboarding automation) partially confirmed at infrastructure level only** — Temenos Transact is confirmed live as of February 2022, replacing the legacy core. However, the features live at launch were onboarding and deposit products — not specifically investment onboarding automation. No evidence of end-to-end automated investment onboarding without human intervention was found. T4 attributed in A5 from platform inference, same limitation as T3."
- **Suitability questionnaire content and adaptive features** — KB Portfolio page confirms an online questionnaire exists, but its specific questions, length, logic, and whether it is adaptive (vs static) were not accessible without completing it as a live customer"
- **Independent review content from Trustpilot (kb.cz) and tradersunion.com** — both returned HTTP 403 during fetch attempts; the customer complaint pattern in weakness 3 rests on a search-result summary, not on directly fetched content. The claim is recorded but its source quality is degraded"
- **KB investment fund customer count** — the Amundi-KB platform figure (250,000+ clients) covers the joint KB-Amundi distribution platform; it is not confirmed as the count of KB-only investment customers"

**MONETA Money Bank.**

- **Entry fee percentages for MONETA funds and third-party funds** — fee schedule is published as a PDF at moneta.cz/dokumenty-ke-stazeni/sazebniky but the detailed table was not accessible via web fetch. The pricing shape is known (varies by fund, exit fees zero for most); the specific numbers are not public in the accessible format."
- **Management fees (TER/ongoing charges) for the five proprietary MONETA funds** — referenced as deducted before performance figures are shown, but specific percentages were not found in accessible sources."
- **Innovator standing under B4 (guided fund selection) — timing advantage not confirmed** — MONETA's in-app advisory launched January 15, 2026 (e15.cz, confirmed). Whether ČSOB or KB have equivalent in-app guided fund-selection features and when they launched is not established by this research. The feature is real and concrete; the precedence over direct competitors is not confirmed."
- **Innovator standing under B1 (savings mobilisation)** — the specific product or feature distinguishing MONETA as an innovator (versus a leader) on this trend was not found. MONETA is a growing, digital-first player; what it does differently from ČSOB and KB on B1 was not established by this research."
- **Whether multi-bank account management remains a unique differentiator in 2026 or has since been matched by competitors** — the 'first Czech banking app' claim references a state as of approximately 2022–2023; current status relative to ČSOB and KB is not confirmed."
- **Total assets under management (AUM) across the five proprietary MONETA funds** — not found in accessible sources."

**No card records a confirmed absence.** Every gap above is something the research could not establish. *Their own documentation lists the alternatives and not this one* is a confirmation; *we found nothing* is not, and only the second kind is present here.

---

## How this was produced

**Stage 3.2 deep-dive, quality gate Q3.** Three participants were researched, one invocation each, on the dates each card carries. This document adds nothing to them: every capability, claim, limitation and price below was written by the invocation that researched it. **The research ran under Competitive Analysis Standards v0.4**, which did not yet require five to ten named capabilities or three to five evidenced claims per card, and the cards carry what that version asked for. **Research regime pilot-test, and the run material is fabricated.**

**Assembled from one record**, which carries every card and the fields a gate decides:

- **R-A6-01** — records/3-competitive-analysis/A6-r01-competitor-cards.record.md

