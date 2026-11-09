---
run_id: 2026-04-card-disputes
record_id: R-A6-03
artifact_id: A6
item_id: "mbank.cz"
produced_at: "2026-08-17"
produced_by:
  agent: competitive-analysis
  skill: deep-dive
workflow: competitive-analysis
modified_by: agent
revisions: 0
egress_basis: "pilot-test"
standards_basis: "competitive-analysis-standards@0.9 read and applied across all ten deep-dive research branches. §3.1 field set carried exactly: features[] entries carry name/detail/source; usps[] entries carry claim/evidence/source; strengths[] and weaknesses[] entries carry claim/source; pricing_model is one prose string; sources[] entries carry ref/publisher/publisher_key/accessed. Confidence derived by §3.3 on each card; C66 recomputes at Q3. Assembly only — no re-research, no re-deriving. standards_basis is not indicative: the body exists at v0.9 and was read in full."
external_sources:
  - mbank-blog-2024
  - penize-2banks
  - finex-mbank-2026
  - top-mbank-2026
  - 5nej-mbank-2026
  - dorkas-mbank-2025
  - press-news-2025
bounds_hit: []
card:
  identity_key: "mbank.cz"
  name: "mBank CZ"
  type: "direct"
  represents: 
    - "B2"
  standing: "leader"
  researched_at: "2026-08-17"
  offering: "Digital-first Czech retail bank operating since 2007, owned by Commerzbank Group via mBank Group (formerly BRE Bank SA). Products: mKonto current account, mSpoření and eMax Plus savings accounts, mKreditka Standard credit card, mPůjčka Plus consumer loans, mortgages, and business banking. Card disputes filed via phone (mLinka) or internet banking portal; the mobile app routes dispute claims through the Contact section rather than from the transaction entry. Approximately 800,000 clients at end of 2025 across 30 branches in 17 Czech cities."
  segment: "Czech retail customers who prefer fully digital self-service banking, particularly those seeking zero-fee current accounts. Secondary audience: small entrepreneurs (expanded offering introduced early 2024). The digital-first model and limited branch presence (30 locations) reduces reach for customers who require regular in-person service or frequent ATM withdrawals below 1,500 CZK."
  features: 
    - name: "Internet banking portal card dispute submission"
      detail: "Customers file card transaction disputes via mBank's internet banking portal, confirmed as one of two primary dispute channels alongside mLinka phone. The portal delivers a structured form path; specific guided steps and form fields are not publicly documented outside the bank's help resources. Whether the form is initiated from the transaction history or from a separate contact menu is not confirmed."
      source: "mbank-blog-2024"
    - name: "mLinka phone dispute channel"
      detail: "Customers report card disputes by calling mLinka (+420 222 111 999), available Monday to Friday 8:00-20:00 and weekends and public holidays 8:00-18:00. Confirmed alongside internet banking as one of the two primary dispute reporting routes."
      source: "mbank-blog-2024"
    - name: "13-month card dispute filing window"
      detail: "Customers may dispute any unauthorized card transaction up to 13 months retroactively from the transaction date, per the Czech statutory maximum under payment services law. mBank's documentation states customers should report immediately on discovery of the unauthorized transaction."
      source: "mbank-blog-2024"
    - name: "Mobile app dispute path via Contact section (not transaction-level)"
      detail: "The mBank mobile app does not have a direct dispute button on individual transaction entries. Customers go to the Contact section within the app, submit a claim, and the form then guides them to identify the specific payment. This is not transaction-level initiation. mBank has announced plans to simplify this flow in a new app version, described as in development as of 2025."
      source: "penize-2banks"
    - name: "Real-time card transaction push notifications"
      detail: "The mobile app delivers push notifications for card transactions via the Moje výdaje feature, alerting customers in real time to card activity. Enables early identification of unauthorized transactions. The notification does not connect to a dispute initiation action within the same flow."
      source: "5nej-mbank-2026"
    - name: "Zero-fee mKonto current account"
      detail: "mKonto carries a 0 CZK monthly maintenance fee with free domestic transfers, free SEPA payments, and a free debit card. ATM withdrawals are free above 1,500 CZK; withdrawals below that threshold cost 29 CZK. Non-network ATM withdrawals are separately charged."
      source: "finex-mbank-2026"
    - name: "Contactless wearable payment ecosystem"
      detail: "mBank supports NFC contactless payments via Google Pay, Apple Pay, Garmin Pay, and Fitbit Pay. In June 2024 mBank became the first Czech bank to introduce a payment ring; a payment wristband followed in September 2024 and a children's payment wristband in November 2024."
      source: "press-news-2025"
    - name: "Biometric mobile login (mKlíč)"
      detail: "The mobile app supports fingerprint and face-recognition authentication via mKlíč, providing fast secure access to all app features without PIN entry."
      source: "finex-mbank-2026"
    - name: "Finance Manager transaction categorization"
      detail: "The app automatically categorizes card transactions by merchant category and presents a structured spending overview, giving customers visibility into card expenditure patterns."
      source: "finex-mbank-2026"
    - name: "In-app customer support chat"
      detail: "mBank provides a chat support channel within the mobile app for banking queries including dispute-related questions. The chat is not available on the desktop website. Availability during peak hours and response quality are noted as variable in customer reviews."
      source: "dorkas-mbank-2025"
  usps: 
    - claim: "Zero-fee full-service banking: free account, free domestic transfers, free debit card — one of the lowest-cost mainstream Czech bank offerings"
      evidence: "finex.cz (July 2026) rates Standard Fees at 95% and Digitalization at 95%. Account maintenance, domestic transfers, and debit card all confirmed free from mBank primary material and multiple independent reviews. ATM withdrawals free above 1,500 CZK; fee applies below."
      source: "finex-mbank-2026"
    - claim: "First Czech bank to introduce a payment ring (June 2024), leading wearable contactless payment adoption in the Czech market"
      evidence: "press.news reported the June 2024 payment ring launch as a Czech market first. Payment wristband followed September 2024 and children's wristband November 2024. No other Czech bank has been identified as having launched payment rings before this date."
      source: "press-news-2025"
    - claim: "17+ years of digital-first banking in Czech Republic with a high-rated mobile platform"
      evidence: "mBank has operated in Czech Republic since 2007. finex.cz (July 2026) gives 95% Digitalization score and 88% overall. App supports biometric login, QR payments, multiple payment wallets, Finance Manager, and in-app chat — confirmed across finex.cz, 5nej.cz, and dorkas.cz."
      source: "finex-mbank-2026"
    - claim: "Competitive savings rate of 4.01% p.a. on mSpoření balances up to 500,000 CZK"
      evidence: "top.cz (2026) confirms 4.01% p.a. interest rate on savings up to 500,000 CZK, placing mBank competitively among Czech deposit-taking institutions."
      source: "top-mbank-2026"
  positioning: "Digital bank for modern life — full-service Czech retail banking entirely online, zero account fees, accessible from any device. Targets customers who manage banking from their phone and rarely or never need a branch."
  pricing_model: "mKonto current account: 0 CZK monthly maintenance fee, free domestic and SEPA transfers, free debit card. ATM withdrawals free above 1,500 CZK; 29 CZK fee per withdrawal below that threshold; non-network ATM withdrawals additionally charged. mSpoření savings: 4.01% p.a. on up to 500,000 CZK. mKreditka Standard credit card: 0 CZK issuance for first 3 months, interest-free period up to 54 days, credit limit 10,000-500,000 CZK; card maintenance fee after initial period and long-term fee schedule not confirmed from fetched sources. mKreditka e-Shop discontinued for new clients from July 1, 2025. Consumer loans (mPůjčka Plus): from 4.49% (RPSN from 4.59%). Dispute handling fees: not published. Full fee schedule (sazebník) available as PDF at mbank.cz; card-dispute-specific fees and international charges not confirmed."
  strengths: 
    - claim: "finex.cz rates mBank 95% for digitalization and 95% for standard fees, placing it 10th overall among Czech banks with a modern and clearly structured platform"
      source: "finex-mbank-2026"
    - claim: "First in the Czech market to introduce a payment ring (June 2024), demonstrating concrete product innovation in contactless payment technology ahead of larger incumbent banks"
      source: "press-news-2025"
    - claim: "Approximately 800,000 Czech retail clients at end of 2025, representing sustained growth over 17+ years as a digital-only bank"
      source: "top-mbank-2026"
  weaknesses: 
    - claim: "No transaction-level dispute initiation: the mobile app routes dispute claims through the Contact section rather than from the transaction entry, placing mBank below the standard set by ČS and KB — the only two Czech banks identified as enabling initiation directly from a specific payment in the transaction list"
      source: "penize-2banks"
    - claim: "Customer satisfaction rating of 1.4 out of 5 on mapy.cz (55 respondents, 2026) with recurring complaints about unexplained account closures without warning and unsatisfactory responsiveness to disputed issues"
      source: "top-mbank-2026"
    - claim: "Limited branch network of 30 locations in 17 Czech cities and no proprietary ATMs, creating barriers for customers with in-person needs and a fee friction point for ATM withdrawals below 1,500 CZK"
      source: "finex-mbank-2026"
  sources: 
    - ref: "mbank-blog-2024"
      publisher: "mBank CZ — 'Co jsou blokace plateb a jak fungují reklamace transakcí?', mbank.cz blog, published September 5, 2024"
      publisher_key: "mbank.cz"
      accessed: "2026-08-17"
    - ref: "penize-2banks"
      publisher: "Peníze.cz — 'Jak reklamovat platbu kartou? Jen dvě banky vám to maximálně usnadní', Czech bank card dispute comparison, penize.cz"
      publisher_key: "penize.cz"
      accessed: "2026-08-17"
    - ref: "finex-mbank-2026"
      publisher: "Finex.cz — mBank: Recenze a přehled produktů (updated July 24, 2026), finex.cz/banka/mbank"
      publisher_key: "finex.cz"
      accessed: "2026-08-17"
    - ref: "top-mbank-2026"
      publisher: "Top.cz — mBank recenze (2026), top.cz/mbank-recenze"
      publisher_key: "top.cz"
      accessed: "2026-08-17"
    - ref: "5nej-mbank-2026"
      publisher: "5nej.cz — mBank Recenze a zkušenosti v roce 2026, 5nej.cz/mbank-recenze"
      publisher_key: "5nej.cz"
      accessed: "2026-08-17"
    - ref: "dorkas-mbank-2025"
      publisher: "Dorkas.cz — mBank recenze: Stojí za to v roce 2025?, dorkas.cz"
      publisher_key: "dorkas.cz"
      accessed: "2026-08-17"
    - ref: "press-news-2025"
      publisher: "Press.news — Co chystá vaše banka v roce 2025? Přehled novinek, press.news"
      publisher_key: "press.news"
      accessed: "2026-08-17"
  gaps: 
    - "Post-submission status tracking for card disputes: "what confirmation the customer receives (reference number, email, in-app notification) after filing via phone or internet banking, and whether any status channel exists during resolution, is not stated in any available source. This is the primary gap against H3 (no status visibility).\""
    - "Internet banking dispute form structure: "whether the portal presents a guided, categorised form (dispute type selection, structured document upload) or an unstructured message field is not confirmed from available sources.\""
    - "Card-dispute-specific resolution SLA: "the Reklamační řád (November 2025) sets a general complaint deadline of 30 days aim, up to 140 days maximum. Whether card disputes follow a tighter SLA aligned with Mastercard/Visa scheme timelines (typically 45 business days) is not confirmed.\""
    - "New simplified dispute app: "mBank announced a forthcoming simplified dispute flow in a new application version, in development as of 2025. Whether this app has since launched and whether it introduces transaction-level initiation is not confirmed.\""
    - "Mastercard Ethoca Alerts integration: "whether mBank as a Mastercard issuer has integrated Ethoca pre-chargeback alert infrastructure is not established.\""
  confidence: "high"
  confidence_basis: "Derived by §3.3. Independent sources: 7 distinct publisher_keys (mbank.cz, penize.cz, finex.cz, top.cz, 5nej.cz, dorkas.cz, press.news). Primary source: ESTABLISHED — publisher_key mbank.cz equals identity_key mbank.cz, satisfying §3.3 equality test. No core gap: offering, segment and positioning all present. 3+ independent sources, a primary, no core gap: high."
---

# Record R-A6-03 — mBank CZ

One deep-dive invocation. Not written for a reader; the document assembled from it is 3-competitive-analysis/2-competitor-cards.md.
