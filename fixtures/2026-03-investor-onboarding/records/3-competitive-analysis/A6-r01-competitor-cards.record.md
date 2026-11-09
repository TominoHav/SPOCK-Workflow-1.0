---
run_id: 2026-03-investor-onboarding
record_id: R-A6-01
artifact_id: A6
item_id: ""
produced_by:
  agent: competitive-analysis
  skill: deep-dive
produced_at: 2026-08-13
bounds_hit: []
cards:
  - identity_key: csob.cz
    name: "ČSOB (Československá Obchodní Banka)"
    type: direct
    represents:
      - B1
      - B2
      - B3
      - B4
      - T3
      - T4
    standing: leader
    researched_at: 2026-08-13
    offering: "Retail investment platform spanning managed mutual funds (ČSOB Asset Management), ETFs, bonds, and shares accessible via Patria Finance subsidiary. Delivered through ČSOB Investice web portal, ČSOB Smart mobile app, and 201 branch Financial Centers. Core products: regular fund investing (Pravidelné investování), bank-managed bespoke portfolio (Investice na míru), micro-investing via card-payment rounding (ČSOB Drobné), and a tax-advantaged long-term investment account (DIP, launched January 2024). Part of a fully integrated banking, investment, insurance, and pension proposition under KBC Group ownership."
    segment: "Retail banking customers in the Czech Republic, primarily existing ČSOB account holders. Primary target: savings customers being moved into investment products, including explicitly first-time investors (\"úplný začátečník\" — complete beginners). Secondary: Premium clients with higher monthly minimums (4,000 CZK vs. 1,500 CZK standard). DIP targets customers with long-term retirement or savings goals. ČSOB Drobné specifically targets zero-commitment entry — no investment knowledge or decision required from the customer after initial setup. Total active base: 4.3 million clients."
    features:
      - name: "Investment suitability questionnaire"
        detail: "Customer answers orientation questions in-app or in-branch; bank derives investment profile (conservative, balanced, growth, or dynamic) and recommends a matching fund portfolio — the mandatory MiFID II suitability step is embedded in both digital and branch journeys."
      - name: "ČSOB Smart app investment management"
        detail: "Customer can view fund composition, see portfolio manager news updates, initiate regular investment orders, and navigate to the Investment Portal — all in-app; fund composition visibility added February 2025."
        source: csob-investice-portal
      - name: "ČSOB Drobné micro-investing"
        detail: "Every card payment is rounded up to the nearest 20 CZK; when 300 CZK accumulates it is automatically invested into ČSOB Bohatství fund — customer sets it up once, no further decision required, no minimum upfront amount."
        source: financera-csob-2026
      - name: "Pravidelné investování (regular monthly investment)"
        detail: "Customer configures a standing monthly order via ČSOB Smart or the Investment Portal; minimum 1,500 CZK/month (standard) or 4,000 CZK/month (Premium); invested in selected managed funds at a consistent cadence (cost-averaging)."
        source: vpenize-csob-dip
      - name: "Investice na míru (bank-managed discretionary portfolio)"
        detail: "After completing the questionnaire, the bank constructs and actively manages a custom fund combination matched to the customer's risk profile; customer defines goals and risk tolerance and does not select individual funds."
      - name: "DIP (Dlouhodobý investiční produkt)"
        detail: "Tax-advantaged long-term investment account launched January 2, 2024; 10-year minimum hold, withdrawal from age 60; customer deducts contributions up to 48,000 CZK/year from taxable income; setup online via Patria Finance WebTrader or at ČSOB branch."
        source: vpenize-csob-dip
      - name: "Patria Finance digital brokerage access"
        detail: "ČSOB subsidiary enables online trading in stocks, ETFs and bonds; provides fully digital DIP setup using banking identity or document photos with immediate activation; purchase fees at 50% discount vs. standard ČSOB rates."
        source: vpenize-csob-dip
      - name: "ČSOB Investice web portal"
        detail: "Browser-based platform covering mutual fund shares, bonds, investment certificates, structured deposits and discretionary portfolios across the ČSOB group — accessible independently of the mobile app."
        source: csob-investice-portal
      - name: "Branch and Financial Center in-person advisory"
        detail: "Personal adviser supports investment questionnaire completion, Investment Services Agreement signing and product setup; required for new investors opening DIP on the ČSOB core platform (201 branches, 1,022 ATMs)."
      - name: "Multibanking cross-bank view"
        detail: "Customer can see accounts from other Czech banks within the ČSOB Smart app alongside ČSOB investments and insurance, providing a consolidated financial position in a single interface."
        source: csob-investice-portal
    usps:
      - claim: "Fee-free regular investing for the lifetime of the investment when set up during the promotional window"
        evidence: "ČSOB promotes 'you pay no fees for the entire lifetime of the regular investment' for products set up July 2025–December 2026. Confirmed by csob.cz search result extracts and vpenize.cz DIP review confirming zero entry fee for regular monthly standing orders with unlimited validity. Promotional scope is clearly bounded; beyond the window, fee status for new investments is not confirmed from retrieved sources."
      - claim: "DIP provides tax deduction of up to 48,000 CZK per year with zero entry fee on regular ČSOB-fund purchases"
        evidence: "vpenize.cz confirms: DIP account management free; entry fee zero for regular monthly standing orders with unlimited validity; tax deduction up to 48,000 CZK/year; savings of 7,200 CZK at 15% tax rate, 11,040 CZK at 23% rate; employer contributions up to 50,000 CZK/year without social/health insurance obligations."
      - claim: "ČSOB Drobné enables entry into investing with no minimum upfront decision — fully automated after single setup"
        evidence: "Card payment rounding to nearest 20 CZK; automatic investment when 300 CZK accumulates in ČSOB Bohatství. Confirmed in csob.cz search result extracts (ČSOB Smart app feature) and financera.cz review. No minimum investment required; customer makes no subsequent investment decisions."
      - claim: "Integrated bank-insurer model provides investments, banking, insurance, and pension in one relationship"
        evidence: "kbc.com group data confirms KBC Group's integrated bank-insurer model applied across subsidiaries including ČSOB. csob.cz confirmed product range spanning mutual funds, pension insurance, life insurance, and building savings alongside banking. Confirmed by finex.cz review noting ČSOB covers 'all financial needs in one place.'"
      - claim: "KBC Group technology transformation (Temenos T24 + Camunda) positions ČSOB for improved digital investment capabilities"
        evidence: "fintechstrategy.com (July 2025): UP!Core transformation program rebuilding IT ecosystem around Temenos T24; Camunda-powered Customer Journey Manager deployed; OTP Bank Slovak client migration to T24 completed. This is a capability-building claim backed by deployment evidence, not yet a feature claim — the investment onboarding benefits of T24 are not yet specifically evidenced in retrieved sources."
    positioning: "Stable, comprehensive Czech financial institution where customers can manage banking, savings, investments, insurance, and pension in one relationship. Investment positioning emphasizes safety and accessibility for first-time investors, with bank-managed options (Investice na míru, ČSOB Drobné) designed for customers who lack investment experience or do not want to make fund-selection decisions themselves. Supported by the scale and credibility of the KBC Group."
    pricing_model: "Bundled model: investment services are part of a broader banking relationship with no separate account fee for the Investment Portal or the mobile app investment features; individual products carry their own cost structures. Regular investing: entry fee zero for regular monthly standing orders (vpenize.cz); fee-free for the investment lifetime when opened July 2025–December 2026 (csob.cz); minimum 1,500 CZK/month standard, 4,000 CZK/month Premium. DIP: account management free (vpenize.cz); entry fee zero for regular standing orders in ČSOB-managed funds (vpenize.cz); lump-sum DIP entry fee not confirmed from directly retrieved sources — csob.cz returned HTTP 500 and a 3% figure appears in comparison site search result text but was not verified against a directly retrieved source; Patria Finance purchase fee 50% discount vs. standard ČSOB rates (vpenize.cz); tax benefit up to 48,000 CZK/year deductible from taxable income (vpenize.cz). Fund TERs: not confirmed — ČSOB's MiFID cost disclosure PDF identified in search results but returned HTTP 500; individual TERs for ČSOB Bohatství, ČSOB Akciový and ČSOB Premiéra not confirmed from fetched sources. One-off investment entry fee: not confirmed from retrieved sources. Premium fee schedule: not published in retrieved sources; Premium tier exists (4,000 CZK/month minimum) but tier-specific fee schedule not retrieved."
    strengths:
      - claim: "Second-largest Czech bank (CZK 1,920 billion assets, 4.3M clients) with 201 branches — can support both digital and in-person investment onboarding at scale"
        source: "financera.cz (4.3M clients, Google Play rating), kbc.com group data (CZK 1,920bn assets December 2024)"
      - claim: "DIP zero-entry-fee structure on regular orders is competitive versus providers charging standard entry fees on all purchase types"
        source: "vpenize.cz (zero entry fee for regular standing orders confirmed); mesec.cz (Raiffeisenbank compared as a more aggressively marketed alternative, suggesting ČSOB's pricing is competitive where matched)"
      - claim: "ČSOB Drobné lowers the investment entry barrier further than any explicit minimum — card payment rounding requires no investment knowledge or upfront decision"
        source: "csob.cz search result extracts; financera.cz independent review confirming the rounding mechanism"
      - claim: "Technology modernization underway with confirmed Temenos T24 migration and Camunda process automation deployed"
        source: "fintechstrategy.com (July 2025): UP!Core program, Camunda Customer Journey Manager, OTP Bank migration completed"
    weaknesses:
      - claim: "Described as 'traditional rather than innovative' in investments; perceived as slower to adopt digital features than neobank competitors"
        source: "finex.cz independent review (explicitly 'traditional rather than innovative in investments'); financera.cz review ('slower digital innovation compared to neobanks'); banky.cz review ('conservative pricing model compared to digital competitors')"
      - claim: "Charges fees for services competitors offer free — specifically noted as a recurring criticism versus digital competitors"
        source: "banky.cz review: 'poplatky i za služby, které jsou u konkurence zdarma' (fees for services competitors offer free). Independent review, not based on ČSOB's own material."
      - claim: "DIP setup for new investors initially required a branch visit on ČSOB's core platform; full digital onboarding routed through subsidiary Patria Finance rather than the main ČSOB app"
        source: "mesec.cz independent DIP comparison article: 'ČSOB initially required in-person branch visits rather than online enrollment' for new investors at DIP launch (January 2024); 'Patria Finance offered fully digital alternative' — framing Patria as the workaround rather than the main channel."
      - claim: "Mobile app received 4.1/5 on Google Play with customer comments noting it 'could be better'; some services restricted to Czech citizens only"
        source: "financera.cz: Google Play rating 4.1/5 (65,000+ reviews), customer comment 'by mohla být lepší'; 'limited digital services — many services only available to Czech citizens'"
    sources:
      - ref: csob-investice-portal
        publisher: "ČSOB — csob.cz / investice.csob.cz product pages and ČSOB Smart App Store listing"
        publisher_key: csob.cz
        accessed: 2026-08-13
      - ref: finex-csob-2026
        publisher: "Finex.cz — independent Czech financial product review site"
        publisher_key: finex.cz
        accessed: 2026-08-13
      - ref: fintechstrategy-csob-2025
        publisher: "FinTech Strategy — fintech journalism and executive analysis"
        publisher_key: fintechstrategy.com
        accessed: 2026-08-13
      - ref: vpenize-csob-dip
        publisher: "Vpenize.cz — independent Czech personal finance review site"
        publisher_key: vpenize.cz
        accessed: 2026-08-13
      - ref: mesec-dip-comparison
        publisher: "Mesec.cz — independent Czech financial comparison and editorial site"
        publisher_key: mesec.cz
        accessed: 2026-08-13
      - ref: banky-csob-review
        publisher: "Banky.cz — independent Czech banking review site"
        publisher_key: banky.cz
        accessed: 2026-08-13
      - ref: financera-csob-2026
        publisher: "Financera.cz — independent Czech financial product review site"
        publisher_key: financera.cz
        accessed: 2026-08-13
      - ref: kbc-group-data
        publisher: "KBC Group — group investor and press releases (kbc.com)"
        publisher_key: kbc.com
        accessed: 2026-08-13
    gaps:
      - field: pricing_model.fund_ter
        reason: "ČSOB's MiFID cost disclosure PDF (csob.cz/documents/mifid-naklady-a-poplatky.pdf) was identified in search results but returned HTTP 500 on direct fetch. Individual fund TERs for ČSOB Bohatství, ČSOB Akciový and ČSOB Premiéra are not confirmed from any retrieved source. The cost structure within the fund is opaque from retrieved material."
      - field: pricing_model.entry_fee_lumpsum
        reason: "Entry fee for one-off (non-regular) DIP purchases not confirmed from directly retrieved sources. A figure of 3% appears in aggregated search result text attributed to comparison sites, but was not verified against a source that could be attributed independently. Not included to avoid mis-attributing a number."
      - field: features.suitability_questionnaire_detail
        reason: "The investment questionnaire is referenced in multiple sources as the onboarding entry point, but its specific questions, number of items, whether it adapts to first-time investor knowledge level, and how it handles customers with no investment experience are not established. csob.cz product pages returned HTTP 500; the Ambis Business School PDF (is.ambis.cz) found in search results is an academic study, not ČSOB's current live questionnaire. This is the specific gap identified as highest value in A5 §6 and it remains unresolved — ČSOB's online pages were inaccessible."
      - field: features.ai_recommendation_detail
        reason: "T3 (AI fund recommendation) and T4 (agentic onboarding automation) were attributed to ČSOB in A5 based on 'advanced digital banking platform' evidence. Retrieved sources confirm Camunda Customer Journey Manager is deployed (fintechstrategy.com) and Temenos T24 migration is underway, but whether the investment onboarding journey specifically uses AI recommendation or adaptive automation is not confirmed. The investment questionnaire flow appears to be a standard static or semi-static questionnaire producing a profile, not a specifically AI-powered adaptive engine — this is an absence of evidence, not evidence of absence."
      - field: pricing_model.premium_fee_schedule
        reason: "Premium client tier exists (minimum 4,000 CZK/month investment) but Premium-specific fee structure beyond the minimum threshold is not published in retrieved sources."
      - field: features.mobile_onboarding_ux
        reason: "Step-by-step UX of in-app investment onboarding (screen count, dropout point design, what happens if a first-time investor selects a risk level inconsistent with their knowledge, whether there are educational interludes) is not described in retrieved sources. The eman.cz developer case study described the app build methodology but not the investment onboarding flow specifically."
    confidence: high
    confidence_basis: "Derived by §3.3. Independent sources: 8 distinct publisher_keys (csob.cz, finex.cz, fintechstrategy.com, vpenize.cz, mesec.cz, banky.cz, financera.cz, kbc.com) — satisfies the 3+ condition. No core gap: offering, segment, and positioning are all present. Primary source: ESTABLISHED — the card's own domain appears as a publisher_key among its sources, so §3.3's equality test resolves. 3+ independent sources, a primary, no core gap: high. **REVISED 2026-08-14 from medium.** The identity key was a namespace form (czb:*) and every publisher key was a domain, so the two could never be equal and no card in this run could reach high — a defect in the key format, not in the research. §5.1 now states the format and C54 reads it; the keys migrated with the store, which is one operation because S1 is generated."

  - identity_key: kb.cz
    name: "Komerční banka"
    type: direct
    represents:
      - B1
      - B2
      - B3
      - T3
      - T4
    standing: leader
    researched_at: 2026-08-13
    offering: "Universal Czech retail bank offering a full-spectrum investment product suite: Amundi-branded mutual funds (100+, via the Amundi-KB joint platform managing 165 billion CZK AUM), KB Portfolio managed strategies (six risk-labelled options), direct stock and ETF trading via KB Broker on global exchanges, Upvest real estate crowdfunding, investment gold, insurance-linked investments (Vital Invest), and a tax-advantaged long-term investment product (DIP). Investment access is delivered through the KB+ mobile app and MojeBanka web platform, with branch and video-call adviser support."
    segment: "Czech retail banking customers broadly: approximately 1.6 million current-account holders across 399 branches. Primary investment segment: existing KB customers converting savings to investment products. First-time investor entry is available from 100 CZK/month. Premium segment (250,000 CZK+ portfolio) served through private asset management with dedicated manager."
    features:
      - name: "Amundi mutual fund selection"
        detail: "Customer selects from 100+ equity, bond, mixed, ESG and thematic funds (Amundi, KB Portfolio series) categorised by risk level (1-7 scale), investment horizon and market focus; available in CZK, EUR, USD, JPY; minimum 100 CZK/month regular or 5,000 CZK one-time."
        source: kb-investments-en
      - name: "KB Portfolio managed strategies"
        detail: "Customer chooses one of six risk-labelled professionally managed strategies: Reserve (risk 2/7, 1-2yr, 1-4% expected annual return), Conservative (3/7, 3yr, 2-5%), Balanced (3/7, 4yr, 3-6%), Dynamic (3/7, 5yr+, 4-7%), Dividend (4/7, 5yr+, 5-8%), Stock Index (4/7, 6yr+, 5-10%); Amundi fund managers handle ongoing allocation."
        source: kb-portfolio-cs
      - name: "Online investment suitability questionnaire"
        detail: "Customer completes risk-profile assessment in-app or in-branch before fund selection; outcome maps to the KB Portfolio strategy range; access also available via bank adviser or video call."
        source: kb-investments-en
      - name: "KB Broker direct securities trading"
        detail: "Customer buys and sells individual stocks and ETFs on global exchanges (Nasdaq, NYSE, Euronext, Xetra, Prague Stock Exchange, London Stock Exchange) via KB+ mobile app."
        source: kb-investments-en
      - name: "Regular investment standing orders"
        detail: "Customer sets automatic monthly contributions from 100 CZK via KB+ or MojeBanka; modifiable or cancellable at any time; no withdrawal fee; redemption within approximately one week."
        source: kb-regular-investing-cs
      - name: "Upvest real estate crowdfunding"
        detail: "Customer invests in specific Czech property development projects from 5,000 CZK per project via KB's fintech subsidiary (96% KB-owned since 2020); no entry fee for KB clients."
        source: kb-investments-en
      - name: "Investment gold"
        detail: "Customer purchases a precious metals investment product through the KB investment platform."
        source: kb-investments-en
      - name: "Long-term investment product (DIP)"
        detail: "Tax-advantaged retirement savings vehicle combining fund investment with employer contribution support; dedicated fee schedule."
        source: kb-investments-en
      - name: "Video consultation with KB investment specialists"
        detail: "Customer books a remote advisory session without a branch visit for fund selection guidance and portfolio questions."
        source: kb-investments-en
      - name: "Private asset management (premium)"
        detail: "Bespoke portfolio managed by a dedicated BRICK Asset Management or KB private banker; minimum 250,000 CZK invested; combines KB funds with active management and wider asset class access."
        source: kb-premium-investments-en
    usps:
      - claim: "Amundi partnership: access to Europe's largest asset manager at 100 CZK/month minimum, the lowest confirmed entry point among Czech incumbent banks"
        evidence: "Amundi-KB Czech platform manages 165 billion CZK AUM across 250,000+ clients; kb.cz markets 100 CZK/month as the entry point for regular investing (amundi-kb.cz homepage; kb.cz/cs/obcane/investice/pravidelne-investovani)"
      - claim: "Société Générale group backing provides capital strength, technology access, and international asset management reach beyond what Czech-independent banks can offer"
        evidence: "SG holds 60% of KB (Wikipedia); KB Premium lists group-level qualified investor funds, structured investment certificates, and private equity access unavailable from smaller Czech competitors (kb.cz/en/kb-premium/investments)"
      - claim: "Temenos Transact core banking foundation enabling new product launches at approximately half prior development cost, with 24/7 system availability"
        evidence: "Temenos Transact went live February 2022; the 2023 Temenos success story confirmed development time reduced by approximately 50%; over one million clients migrated by end of 2024 on track for all 1.6 million by end 2025 (temenos.com)"
      - claim: "Upvest proprietary fintech subsidiary for real estate crowdfunding — an alternative investment channel integrated into KB's platform that no other listed Czech incumbent bank holds in-house"
        evidence: "KB acquired 96% of Upvest in 2020; KB clients invest with no entry fee per the investment products page (Wikipedia; kb.cz/en/individuals/investments)"
    positioning: "Full-service Czech banking institution targeting the digital banking leadership position among Czech banks, with investment access backed by Société Générale group resources and the Amundi partnership. Customer-facing message: start investing from 100 CZK/month with professional fund management, within your existing banking relationship."
    pricing_model: "Model type: tiered by product; no standalone investment account fee — investment access is bundled with bank account ownership. Published minimums: Regular fund investing: 100 CZK/month One-time fund investment: 5,000 CZK (stated on support page) Upvest real estate projects: 5,000 CZK per project; no entry fee for KB clients Investment management (private): 250,000 CZK minimum portfolio Account maintenance fees (not investment-specific): Start tier: 39 CZK/month Comfort tier: 89 CZK/month Exclusive tier: 169 CZK/month Fund management fees: NOT publicly stated on the main investment product pages. A pricing schedule for Amundi Invest funds (KB document CZ-014, dated 13 January 2025) is referenced on kb.cz but was not readable in text format during this research (binary PDF). Customers are directed to branch staff or the Key Investor Information Document (KIID) for specific percentages. Unpublished pricing is itself a market fact: competitors who publish fee tables give customers a direct comparison point that KB does not currently provide online."
    strengths:
      - claim: "Amundi partnership delivers 100+ institutional-quality funds at the lowest confirmed Czech bank entry minimum (100 CZK/month)"
        source: "amundi-kb.cz (165bn CZK AUM, 250,000+ Czech clients); kb.cz/cs/obcane/investice/pravidelne-investovani"
      - claim: "KB+ mobile app consolidates banking, investment, trading, and payments in one platform; consistently rated among the better Czech banking apps"
        source: "finex.cz (94% overall rating, 6th place among Czech banks; notes 'clear and modern online banking'); top.cz (confirms app quality and biometric access)"
      - claim: "Breadth of investment products in a single banking relationship: mutual funds, direct equities/ETFs, real estate crowdfunding, gold, insurance-linked products, DIP retirement savings"
        source: "kb.cz/en/individuals/investments (primary)"
      - claim: "SG group capital and technology resources provide a structural advantage for product development speed and premium market access"
        source: "wikipedia.org (SG 60% ownership confirmed); kb.cz/en/kb-premium/investments (group-level products)"
      - claim: "Temenos core banking foundation: faster product launches, 24/7 availability, 50% development time reduction versus legacy architecture"
        source: "temenos.com (2022 live announcement, 2023 success story)"
    weaknesses:
      - claim: "Fund management fee percentages not published online: customers cannot price-compare without downloading a binary PDF or visiting a branch, which creates friction for first-time investors considering KB"
        source: "finex.cz (independently rates 'higher fees' as a key weakness); top.cz (confirms higher fees versus online-only banks); observation from this research (fee table not found on any fetched product page)"
      - claim: "Digital innovation lag relative to fintech competitors: complex investment operations require branch contact; personalized fund recommendation depends on human advisors rather than automated tools"
        source: "top.cz ('slower innovation relative to fintech competitors'; 'limited flexibility requiring branch visits for complex operations'); finex.cz (confirms branch dependency)"
      - claim: "Negative customer sentiment on independent review aggregators: Trustpilot and tradersunion.com are reported to show predominantly negative reviews, with complaints including fund underperformance relative to global ETFs at high fees and poor international-customer communication"
        source: "Search result summary for KB customer reviews query (referencing Trustpilot at kb.cz and tradersunion.com); direct fetch of both sources returned HTTP 403 — claims attributed to search-result summary, not to fetched content; see gaps"
    sources:
      - ref: kb-investments-en
        publisher: "Komerční banka a.s. — Investments for individuals (English product page), kb.cz/en/individuals/investments"
        publisher_key: kb.cz
        accessed: 2026-08-13
      - ref: kb-portfolio-cs
        publisher: "Komerční banka a.s. — KB Portfolio product page, kb.cz/cs/obcane/investice/kb-portfolio"
        publisher_key: kb.cz
        accessed: 2026-08-13
      - ref: kb-regular-investing-cs
        publisher: "Komerční banka a.s. — Pravidelné investování, kb.cz/cs/obcane/investice/pravidelne-investovani"
        publisher_key: kb.cz
        accessed: 2026-08-13
      - ref: kb-minimums-cs
        publisher: "Komerční banka a.s. — Minimální výše investice (support page), kb.cz/cs/podpora/investovani/minimalni-vyse-investice"
        publisher_key: kb.cz
        accessed: 2026-08-13
      - ref: kb-premium-investments-en
        publisher: "Komerční banka a.s. — KB Premium Investments, kb.cz/en/kb-premium/investments"
        publisher_key: kb.cz
        accessed: 2026-08-13
      - ref: amundi-kb-homepage
        publisher: "Amundi-KB — Czech fund platform homepage, amundi-kb.cz"
        publisher_key: amundi-kb.cz
        accessed: 2026-08-13
      - ref: temenos-kb-live-2022
        publisher: "Temenos — Komerční banka goes live on Temenos Core (press release, 1 February 2022), temenos.com/news/2022/02/01/komercni-banka-part-of-the-societe-generale-group-goes-live-on-temenos-core-to-power-digital-future"
        publisher_key: temenos.com
        accessed: 2026-08-13
      - ref: temenos-kb-success-2023
        publisher: "Temenos — Komerční banka success story 2023, temenos.com/success-story/komercni-banka-success-story-2023"
        publisher_key: temenos.com
        accessed: 2026-08-13
      - ref: kb-wiki
        publisher: "Wikipedia — Komerční banka, en.wikipedia.org/wiki/Komerční_banka"
        publisher_key: wikipedia.org
        accessed: 2026-08-13
      - ref: finex-kb-review
        publisher: "Finex.cz — Komerční banka recenze a přehled produktů (independent Czech banking review), finex.cz/banka/komercni-banka"
        publisher_key: finex.cz
        accessed: 2026-08-13
      - ref: top-cz-kb-review
        publisher: "Top.cz — Komerční banka recenze 2026 (independent Czech review site), top.cz/komercni-banka-recenze"
        publisher_key: top.cz
        accessed: 2026-08-13
    gaps:
      - "Specific fund management fee percentages (Amundi Invest): the January 2025 KB pricing schedule PDF (CZ-014) is referenced on kb.cz but returned binary content unreadable in text format; no specific management or entry fee percentages recovered from any fetched page; this is the single most material gap for the pricing_model field"
      - "T3 (AI fund recommendation) not confirmed — direct finding: KB's Temenos implementation covers core banking, deposit products, and REST API integrations; no AI-powered investment recommendation, personalisation engine, or robo-advisor was found on any KB product or support page, or in the two Temenos implementation documents. The Temenos 2023 success story mentions AI exploration for fraud detection and developer tooling (roadmap items), not live capabilities; no investment-specific AI features are referenced. The A5 landscape map attributed T3 to KB via Temenos platform inference — that inference is not supported by direct evidence from this research. KB's investment recommendation as of this research date is delivered by: (a) a standard online suitability questionnaire mapping to one of six KB Portfolio risk strategies, and (b) human advisors via branch or video call. T3 is unconfirmed for KB."
      - "T4 (agentic onboarding automation) partially confirmed at infrastructure level only: Temenos Transact is confirmed live as of February 2022, replacing the legacy core. However, the features live at launch were onboarding and deposit products — not specifically investment onboarding automation. No evidence of end-to-end automated investment onboarding without human intervention was found. T4 attributed in A5 from platform inference, same limitation as T3."
      - "Suitability questionnaire content and adaptive features: KB Portfolio page confirms an online questionnaire exists, but its specific questions, length, logic, and whether it is adaptive (vs static) were not accessible without completing it as a live customer"
      - "Independent review content from Trustpilot (kb.cz) and tradersunion.com: both returned HTTP 403 during fetch attempts; the customer complaint pattern in weakness 3 rests on a search-result summary, not on directly fetched content. The claim is recorded but its source quality is degraded"
      - "KB investment fund customer count: the Amundi-KB platform figure (250,000+ clients) covers the joint KB-Amundi distribution platform; it is not confirmed as the count of KB-only investment customers"
    confidence: high
    confidence_basis: "Derived by §3.3. Independent sources: 6 distinct publisher_keys (kb.cz, amundi-kb.cz, temenos.com, wikipedia.org, finex.cz, top.cz) — satisfies the 3+ condition. No core gap: offering, segment and positioning are all present. Primary source: ESTABLISHED — the card's own domain appears as a publisher_key among its sources, so §3.3's equality test resolves. 3+ independent sources, a primary, no core gap: high. **REVISED 2026-08-14 from medium.** The identity key was a namespace form (czb:*) and every publisher key was a domain, so the two could never be equal and no card in this run could reach high — a defect in the key format, not in the research. The researching agent recorded that mismatch as a gap and refused to work around it by redefining the key mid-card, which was the correct refusal; §5.1 now states the format and C54 reads it. **The gap entry it wrote is removed rather than migrated**: the key substitution turned it into the sentence *kb.cz does not equal kb.cz*, and a gap that no longer exists is not a gap."

  - identity_key: moneta.cz
    name: "MONETA Money Bank"
    type: direct
    represents:
      - B1
      - B4
    standing: innovator
    researched_at: 2026-08-13
    offering: "Czech retail bank (one of the ten largest) serving 1.6 million customers with a digital-first model. Investment suite: (1) five proprietary MONETA funds (MONETA 1 Cautious through MONETA 5 Dynamic, risk-rated from bonds-focused to equity-focused); (2) 48+ third-party open-ended mutual funds from 10 global asset managers available through Smart Banka and Internet Banka; (3) Long-term Investment Product (DIP) with tax deduction up to CZK 48,000/year and employer contributions up to CZK 50,000/year; (4) in-app investment advisory service — 25-question questionnaire recommends one of five MONETA funds and the fund is purchasable immediately in-app (launched January 15, 2026). Minimum entry: CZK 300/month for MONETA funds; CZK 500 for some third-party funds. Channels: Smart Banka mobile app, Internet Banka, 140 branches."
    segment: "Czech retail customers (primary) and SME segment (secondary). Within retail, the investment offering targets savings-account holders who are moving toward their first investment product. Client base nearing 100% digital penetration (FY2025 results). Also serves long-term retirement savers via the DIP product."
    positioning: "Self-described as \"the most innovative financial services organisation in the Czech Republic.\" Positions Smart Banka's low minimum (CZK 300) and 25-question in-app advisory as lowering the investment entry barrier for first-time investors, in contrast to higher-minimum or branch-first investment channels."
    features:
      - name: "In-app fund advisory questionnaire"
        detail: "Customer answers 25 questions in Smart Banka; app recommends one of five MONETA funds matching stated objectives; the recommended fund is purchasable immediately within the app without leaving the channel. Launched January 15, 2026."
        source: e15-moneta-advisory-jan2026
      - name: "Five-tier proprietary fund range"
        detail: "MONETA 1 (Cautious, primarily state and corporate bonds) through MONETA 5 (Dynamic, almost exclusively equities); each carries a plain-language risk label; investable from CZK 300/month."
        source: moneta-investice-2026
      - name: "Multi-bank account management in Smart Banka"
        detail: "Customer can view and manage accounts held at other Czech banks within the MONETA app; described on primary site as the first Czech banking app to provide this capability."
        source: moneta-investice-2026
      - name: "Real-time personalised offer engine"
        detail: "Decision-making rules engine triggers contextual offers within 7 seconds of a qualifying customer transaction (e.g. travel insurance offer delivered 7 seconds after airfare purchase); deployed via AWS, SAS and Trask."
        source: pymnts-moneta-realtime-2025
      - name: "Long-term Investment Product (DIP)"
        detail: "Customer invests monthly into mutual funds within a tax-advantaged wrapper; deducts up to CZK 48,000/year from taxable income; employer may contribute up to CZK 50,000/year; minimum hold 10 years, withdrawal from age 60."
        source: moneta-investice-2026
      - name: "Third-party fund marketplace"
        detail: "48+ open-ended mutual funds from Goldman Sachs AM, Fidelity International, Franklin Templeton, J&T, Generali Investments, UNIQA, Invesco, East Capital, Petrus Advisers and MBH Fund Management — all purchasable through Smart Banka or Internet Banka without a branch visit."
        source: moneta-investice-2026
      - name: "Online-only investment execution"
        detail: "All fund purchases and sales completable digitally; most redemptions processed within 5 business days; exit fees are CZK 0 for most open-ended funds."
        source: moneta-investice-2026
      - name: "New thematic fund additions (end-2025)"
        detail: "J&T WOOD Defense (direct defence industry equities) and Generali Bond Opportunities Fund (targets return 2 percentage points above Czech savings account returns) added to catalogue."
        source: moneta-investice-2026
    usps:
      - claim: "In-app guided fund advisory — 25-question questionnaire delivers fund recommendation and enables immediate purchase within Smart Banka"
        evidence: "e15.cz (January 2026), article by Kamila Ondráčková, confirms January 15, 2026 launch date; quotes Jiří Fait (MONETA product manager for investments): 'Interest in our funds exceeded expectations after Q1, prompting online service expansion to reach investors avoiding branch visits.' Confirmed on moneta.cz primary pages."
      - claim: "First Czech banking app to provide multi-bank account management"
        evidence: "Stated on moneta.cz primary material; referenced as a distinguishing capability in third-party reviews (finex.cz, 5nej.cz search result descriptions). Independent head-to-head verification — confirming no competitor offered this first — was not found in this research."
      - claim: "Lowest investment entry point in the in-scope competitor set: CZK 300/month"
        evidence: "Stated on moneta.cz/sporeni-a-investice/podilove-fondy and moneta.cz/sporeni-a-investice/fondy-od-monety. Competitive comparison for ČSOB and KB minimums was not independently verified in this research."
      - claim: "Banking Innovator of the Year — Hospodářské noviny award, four consecutive years"
        evidence: "Cited in finex.cz product review (updated December 2024) as a 2022 award (four consecutive years at that point). Whether the streak continued through 2023–2025 is not confirmed by this research."
    pricing_model: "No monthly account fee for Smart Banka or Tom current account. Investment-specific pricing: - Entry fees: vary by individual fund; specific percentages not published on product pages; available in PDF fee schedule at moneta.cz/dokumenty-ke-stazeni/sazebniky — not accessible in this research. Specific numbers are not fully public. - Exit fees: CZK 0 for most open-ended mutual funds. For 5-year closed-end funds, early redemption fee is 3–10% depending on the fund. - Management fees (TER): not disclosed on product pages; described as deducted before fund performance figures are published. Specific percentages not found in accessible sources. - DIP wrapper: no separate account fee; underlying fund management fees apply. - In-branch or phone investment transaction: CZK 2,495. - Statements by mail or branch collection: fee applies; amount not specified in accessible pages."
    strengths:
      - claim: "Smart Banka rated 4.8/5, among the top-rated banking apps in Czech Republic and Slovakia; 'Innovation of the Year 2023' award; 200+ functions, 41 products available in-app"
        source: moneta-investice-2026
      - claim: "Near-100% digital penetration of client base (8.3% increase YoY, FY2025); 24% increase in fund sales through digital channels"
        source: yahoo-moneta-fy2025-earnings
      - claim: "In-app investment advisory with immediate purchase launched January 2026 — concrete guided-selection feature with 25-question questionnaire, directly addressing the B4 trend"
        source: e15-moneta-advisory-jan2026
      - claim: "First Czech banking app with multi-bank account management — a concrete first-mover digital capability (recency of 'first' status in 2026 not independently confirmed)"
        source: moneta-investice-2026
      - claim: "Strong financial performance: net profit CZK 6.5bn (+12% YoY, FY2025), cost-to-income below 42%, outperformed guidance by CZK 500mn"
        source: yahoo-moneta-fy2025-earnings
      - claim: "Real-time personalised offer engine (7-second trigger post-qualifying transaction), deployed via AWS, SAS and Trask — demonstrates technology investment depth"
        source: pymnts-moneta-realtime-2025
    weaknesses:
      - claim: "Fee schedule described as 'unclear and complex' (nepřehledný a složitý sazebník); specific entry fee percentages for individual funds not disclosed on main product pages — customers must access a PDF"
        source: finex-moneta-review-2024
      - claim: "Weekend customer support limited to chatbot only — insufficient for complex investment queries at a key decision moment"
        source: 5nej-moneta-review-2025
      - claim: "Customer satisfaction gap: editorial rating 9.4/10 versus user-reported average 6/10 from 62 respondents — suggests actual customer experience diverges from promotional assessments"
        source: 5nej-moneta-review-2025
    confidence: high
    confidence_basis: "Derived by §3.3, and CORRECTED BY HUMAN EDIT on 2026-08-13 — the researching agent wrote 'high'. Independent sources: 6 distinct publisher_keys (moneta.cz, e15.cz, finex.cz, pymnts.com, yahoo.com, 5nej.cz) — satisfies the 3+ condition. No core gap: offering, segment and positioning are all present. Primary source: ESTABLISHED — the card's own domain appears as a publisher_key among its sources, so §3.3's equality test resolves. 3+ independent sources, a primary, no core gap: high. **REVISED 2026-08-14 from medium.** The identity key was a namespace form (czb:*) and every publisher key was a domain, so the two could never be equal and no card in this run could reach high — a defect in the key format, not in the research. §5.1 now states the format and C54 reads it; the keys migrated with the store, which is one operation because S1 is generated."
    gaps:
      - "Entry fee percentages for MONETA funds and third-party funds: fee schedule is published as a PDF at moneta.cz/dokumenty-ke-stazeni/sazebniky but the detailed table was not accessible via web fetch. The pricing shape is known (varies by fund, exit fees zero for most); the specific numbers are not public in the accessible format."
      - "Management fees (TER/ongoing charges) for the five proprietary MONETA funds: referenced as deducted before performance figures are shown, but specific percentages were not found in accessible sources."
      - "Innovator standing under B4 (guided fund selection) — timing advantage not confirmed: MONETA's in-app advisory launched January 15, 2026 (e15.cz, confirmed). Whether ČSOB or KB have equivalent in-app guided fund-selection features and when they launched is not established by this research. The feature is real and concrete; the precedence over direct competitors is not confirmed."
      - "Innovator standing under B1 (savings mobilisation): the specific product or feature distinguishing MONETA as an innovator (versus a leader) on this trend was not found. MONETA is a growing, digital-first player; what it does differently from ČSOB and KB on B1 was not established by this research."
      - "Whether multi-bank account management remains a unique differentiator in 2026 or has since been matched by competitors: the 'first Czech banking app' claim references a state as of approximately 2022–2023; current status relative to ČSOB and KB is not confirmed."
      - "Total assets under management (AUM) across the five proprietary MONETA funds: not found in accessible sources."
    sources:
      - ref: moneta-investice-2026
        publisher: "MONETA Money Bank"
        publisher_key: moneta.cz
        origin_key: moneta.cz
        accessed: 2026-08-13
      - ref: e15-moneta-advisory-jan2026
        publisher: "e15.cz"
        publisher_key: e15.cz
        origin_key: e15.cz
        accessed: 2026-08-13
      - ref: finex-moneta-review-2024
        publisher: "Finex.cz"
        publisher_key: finex.cz
        origin_key: finex.cz
        accessed: 2026-08-13
      - ref: pymnts-moneta-realtime-2025
        publisher: "PYMNTS"
        publisher_key: pymnts.com
        origin_key: pymnts.com
        accessed: 2026-08-13
      - ref: yahoo-moneta-fy2025-earnings
        publisher: "Yahoo Finance"
        publisher_key: yahoo.com
        origin_key: yahoo.com
        accessed: 2026-08-13
      - ref: 5nej-moneta-review-2025
        publisher: "5nej.cz"
        publisher_key: 5nej.cz
        origin_key: 5nej.cz
        accessed: 2026-08-13
---

# Record R-A6-01 — A6

One production. Not written for a reader; the document assembled from it is 3-competitive-analysis/2-competitor-cards.md.
