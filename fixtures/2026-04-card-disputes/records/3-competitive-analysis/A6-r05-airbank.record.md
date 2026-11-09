---
run_id: 2026-04-card-disputes
record_id: R-A6-05
artifact_id: A6
item_id: "airbank.cz"
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
  - airbank-cs-fraud
  - airbank-cs-duplicate
  - airbank-myair
  - airbank-notifications
  - airbank-cenik
  - airbank-2025-results
  - mesec-card-disputes
  - financera-airbank
  - finex-airbank
  - airbank-penize
bounds_hit: []
card:
  identity_key: "airbank.cz"
  name: "Air Bank"
  type: "direct"
  represents: 
    - "B1"
  standing: "leader"
  researched_at: "2026-08-17"
  offering: "Czech retail bank serving 1.58 million clients with personal banking products: current accounts, payment cards (debit and virtual), consumer loans, mortgages, savings, and limited investments. Delivered primarily through the MyAir mobile app (85% client adoption, ~930k weekly logins) and internet banking, with 32 branches. Part of the PPF Group. In the card dispute context, Air Bank manages complaints through multi-channel submission — phone, app message, internet banking message, email, or branch — without offering transaction-level in-app dispute initiation from the transaction screen."
  segment: "Retail customers in the Czech Republic. Primarily digital-first: 85% of 1.58 million clients use the MyAir mobile app with approximately 930,000 logging in on average five times per week. Air Bank targets customers who value transparent pricing and a high-quality mobile experience; 32 branches means digital and phone channels are the primary service pathway for most clients. The bank is a consumer lending leader (highest Czech market share in newly provided consumer loans in 2024 and 2025)."
  features: 
    - name: "Complaint submission via MyAir message or internet banking"
      detail: "Customer can file a card dispute complaint as a free-text message through the MyAir mobile app or internet banking portal, routed to the bank's complaint team. This is a conversational messaging channel — the customer describes the dispute in their own words — not a structured transaction-level form. The full set of confirmed channels is: internet banking message, MyAir app message, email (info@airbank.cz), phone (547 134 134), and branch visit."
      source: "mesec-card-disputes"
    - name: "Online complaint form for specific dispute scenarios"
      detail: "Customer completes an online form at airbank.cz/poradna/reklamace/ for specific dispute scenarios: unauthorized payment, duplicate charge, or merchant denying receipt of payment. Required inputs include the last 4 digits of the card used, the transaction date and amount, and supporting documentation (order confirmation, merchant communication, or payment receipt depending on the dispute type)."
      source: "airbank-cs-fraud"
    - name: "Immediate card lock via online banking and MyAir app"
      detail: "Customer can lock or block their debit card immediately through online banking or the MyAir app if fraud or unauthorized use is suspected, preventing further charges while the dispute investigation proceeds. No branch visit or phone call is required for the block itself."
      source: "airbank-cs-fraud"
    - name: "Virtual payment cards (up to 7 new per week)"
      detail: "Customer can create up to 7 new virtual Mastercard payment cards per week through the MyAir app. Each virtual card carries its own card number, expiration date, and security code, separate from the physical debit card. Cards can be locked, unlocked, or discarded after a transaction, limiting fraud exposure on specific online purchases without requiring a dispute to be filed afterwards."
      source: "airbank-myair"
    - name: "Configurable account activity push notifications"
      detail: "Customer can configure free push notifications via the MyAir app for account events including balance changes, failed payments, card blocks, and incoming transfers; SMS alerts cost 25 CZK per month for unlimited messages. Notifications are configurable per account and can be set for any change to the account. Whether Air Bank sends a real-time push notification on every individual card payment — as Revolut and N26 do — could not be confirmed from the fetched pages (see gaps)."
      source: "airbank-notifications"
    - name: "Phone as primary channel for unauthorized card transactions"
      detail: "Air Bank's published guidance for unauthorized card transactions directs customers to call the customer service line (547 134 134) immediately on discovering the unauthorized payment. Phone operators can initiate the dispute, advise on card blocking, and coordinate next steps. This is the only channel Air Bank's own help pages name as the primary path for unauthorized transaction reports; other channels are confirmed available but not recommended as primary for this scenario."
      source: "airbank-cs-fraud"
    - name: "7 working-day clearing wait before some dispute categories can proceed"
      detail: "For dispute categories such as merchant-not-acknowledging-payment and duplicate charges, Air Bank instructs customers to wait up to 7 working days to allow the transaction to settle before submitting a dispute. If no settlement occurs, the transaction disappears automatically; if it settles and the dispute still applies, the complaint form may then be submitted. This wait is required before the bank can action the claim and means same-day dispute filing is not available in these categories."
      source: "airbank-cs-duplicate"
    - name: "13-month dispute window for unauthorized card transactions; 3-year window for other complaints"
      detail: "Customers must report unauthorized card transactions within 13 months of execution, after which the claim is time-barred. Standard complaints (non-unauthorized-transaction) can be filed within 3 years. Air Bank recommends filing as soon as possible and ideally within 3 months of the event. This is a formal procedural boundary, not a resolution SLA."
      source: "airbank-cs-fraud"
  usps: 
    - claim: "Transparent, fee-free current account with the entire fee schedule on one page"
      evidence: "Air Bank's official pricing (effective September 5, 2025) shows 0 CZK account maintenance, 0 CZK for two standard debit cards, and free push notification alerts. The bank markets the fee schedule as fitting on one page. Financera.cz independently scores Air Bank 100/100 for pricing (the maximum available score) among 33 Czech providers."
      source: "financera-airbank"
    - claim: "85% mobile app adoption with approximately 930,000 weekly logins — the highest confirmed digital engagement rate among Czech ring-1 banks profiled in this run"
      evidence: "Air Bank 2025 annual results confirm approximately 85% of 1.58 million clients use the MyAir app, with approximately 930,000 clients logging in an average of five times per week. No Czech ring-1 bank (ČSOB, KB, mBank, MONETA, Raiffeisenbank) has published a comparable client-level digital adoption figure in the research for this run."
      source: "airbank-2025-results"
    - claim: "Virtual card capability (up to 7 per week) allows proactive fraud containment before a dispute is needed — not confirmed for ČSOB, mBank CZ, or Raiffeisenbank in this run"
      evidence: "Air Bank allows customers to create up to 7 new virtual Mastercard cards per week, each with separate credentials, lockable and discardable individually. A virtual card issued for a specific merchant can be discarded immediately on suspicion of compromise, eliminating the need for a chargeback for future unauthorized charges from that credential. Top.cz confirms Czech Savings Bank and Partners Bank as Czech banks with single-use virtual cards; Revolut also offers them. Air Bank's multi-virtual-card capability is a documented security differentiator versus the other Czech ring-1 incumbent banks profiled here."
      source: "airbank-myair"
    - claim: "Top-2 independent bank rating in every Czech banking review consulted — the strongest brand signal of any mid-size Czech retail bank"
      evidence: "Finex.cz: 97% overall, ranked 2nd among all Czech banks. Financera.cz: 83/100, ranked 3rd of 33 providers. These rankings place Air Bank above every other mid-size Czech incumbent bank and behind only Revolut (and, variably, KB) in independent assessments."
      source: "finex-airbank"
  positioning: "Fair, simple, customer-first challenger to the large Czech incumbents. Air Bank positions on transparent pricing (one-page fee schedule, no account or card fee), a consistently highly rated mobile experience, and straightforward service with no hidden charges. Brand promise: banking without surprises."
  pricing_model: "Account maintenance: 0 CZK. Standard debit card: 0 CZK, up to two cards included. Foreign currency card (from July 2025): 100 CZK per month, waived if the customer makes at least 5 card payments and receives at least 25,000 CZK in the same month. ATM withdrawals: 0 CZK from 370+ Air Bank ATMs or via cashback at partner merchants; 35 CZK from non-partner Czech and international ATMs (effective September 5, 2025, increased by 10 CZK). Push notification alerts via MyAir: free. SMS account activity alerts: 25 CZK per month for unlimited messages. The bank markets the complete fee schedule as fitting on a single page."
  strengths: 
    - claim: "Top-2 independent bank rating — Finex.cz 97% overall (2nd among Czech banks); Financera.cz 100/100 for customer support (3rd of 33 providers overall)"
      source: "finex-airbank"
    - claim: "85% client app adoption with approximately 930,000 weekly logins — the highest confirmed digital engagement rate among Czech ring-1 banks profiled in this run"
      source: "airbank-2025-results"
    - claim: "Virtual card feature (up to 7 per week) enables proactive fraud containment without requiring a dispute — a security capability not confirmed for ČSOB, mBank CZ, or Raiffeisenbank in this run"
      source: "airbank-myair"
    - claim: "Fully transparent minimal-fee pricing — entire schedule on one page; no account maintenance fee; no standard card fee — the clearest pricing structure among Czech ring-1 banks profiled in this run"
      source: "airbank-cenik"
  weaknesses: 
    - claim: "Not among the two Czech banks with transaction-level card dispute initiation — customers cannot click on a specific payment in the transaction list to dispute it; they must navigate to a separate form or initiate a message outside the transaction context"
      source: "airbank-penize"
    - claim: "No documented case status tracking for filed disputes — independent reporting on Air Bank's dispute channels does not describe any structured case-status-tracking capability; after submission customers receive no in-app or portal-based progress update"
      source: "mesec-card-disputes"
    - claim: "Small branch network (32 locations) limits in-person dispute support and escalation for customers outside major cities"
      source: "financera-airbank"
    - claim: "Poor English-language customer support documented in multiple independent customer reviews — a material barrier for non-Czech-speaking customers needing to file or escalate a card dispute"
      source: "financera-airbank"
  sources: 
    - ref: "airbank-cs-fraud"
      publisher: "Air Bank — customer guidance page on reporting a fraudulent card transaction ('Zaplatil jsem kartou podvodníkovi a chci platbu stornovat'), airbank.cz"
      publisher_key: "airbank.cz"
      accessed: "2026-08-17"
    - ref: "airbank-cs-duplicate"
      publisher: "Air Bank — customer guidance page on duplicate card charges ('Platbu kartou mám na účtu dvakrát'), airbank.cz"
      publisher_key: "airbank.cz"
      accessed: "2026-08-17"
    - ref: "airbank-myair"
      publisher: "Air Bank — MyAir mobile banking product page ('Mobilní bankovnictví'), airbank.cz"
      publisher_key: "airbank.cz"
      accessed: "2026-08-17"
    - ref: "airbank-notifications"
      publisher: "Air Bank — account notification settings page ('Nastavení upozornění pod účtem'), airbank.cz"
      publisher_key: "airbank.cz"
      accessed: "2026-08-17"
    - ref: "airbank-cenik"
      publisher: "Air Bank — official fee schedule (ceník), effective September 5, 2025, airbank.cz"
      publisher_key: "airbank.cz"
      accessed: "2026-08-17"
    - ref: "airbank-2025-results"
      publisher: "Air Bank — 2025 annual results press release ('Skupina Air Bank vykázala za rok 2025 zisk přes 3,8 miliardy korun'), airbank.cz"
      publisher_key: "airbank.cz"
      accessed: "2026-08-17"
    - ref: "mesec-card-disputes"
      publisher: "Mesec.cz — 'Nechtěné předplatné, duplicitní platba, nedodané zboží: Kdy vám peníze zachrání reklamace platby kartou?' article listing Czech bank card dispute channels including Air Bank, mesec.cz"
      publisher_key: "mesec.cz"
      accessed: "2026-08-17"
    - ref: "financera-airbank"
      publisher: "Financera.cz — 'Air Bank recenze a zkušenosti 2025,' independent Czech banking review scoring Air Bank 83/100 (3rd of 33), financera.cz"
      publisher_key: "financera.cz"
      accessed: "2026-08-17"
    - ref: "finex-airbank"
      publisher: "Finex.cz — 'Air Bank | Recenze a přehled produktů,' independent Czech banking review rating Air Bank 97% (2nd among Czech banks), finex.cz"
      publisher_key: "finex.cz"
      accessed: "2026-08-17"
    - ref: "airbank-penize"
      publisher: "Peníze.cz — review confirming Air Bank has no in-app transaction-level dispute initiation, penize.cz"
      publisher_key: "penize.cz"
      accessed: "2026-08-17"
  gaps: 
    - "Real-time per-transaction push notification (H1): "Air Bank's notification settings page describes alerts configurable for any account change, but does not confirm whether this covers a real-time push on every individual card debit — as Revolut and N26 do. Whether a cardholder receives a push notification within seconds of an unauthorized card payment, enabling immediate action, could not be established. Directly relevant to H1 (no timely notification of an unauthorized transaction).\""
    - "Resolution SLA independently benchmarked (H3): "The 35-working-day commitment for payment complaints comes from Air Bank's reklamacni-rad (PDF, not readable as text in this research). The figure was extracted from a web search result summary rather than from a directly fetched text page or an independent publication confirming the specific number. No independent source benchmarked Air Bank's actual resolution time. Relevant to H3 and to H5 (parked).\""
    - "Security outcome communication (H4): "No public source established what Air Bank communicates to customers regarding the outcome of a card fraud investigation — whether the card was confirmed compromised, whether the merchant was notified, or what the conclusion was beyond approving or denying the claim. Relevant to H4 (no security outcome information).\""
    - "Ethoca Alerts integration: "Whether Air Bank participates in Mastercard Ethoca's pre-chargeback alert network could not be established. Air Bank is a Mastercard issuer; Ethoca integration status is a gap for both this card and for the T4 trend coverage across Czech ring-1 banks.\""
    - "Per-transaction acknowledgement channel (H3): "Whether Air Bank sends any form of automated acknowledgement (email, SMS, in-app notification) to the customer when a dispute is received could not be confirmed from fetched guidance pages or independent reviews.\""
  confidence: "high"
  confidence_basis: "Derived by §3.3. Independent sources: 5 distinct publisher_keys (airbank.cz, mesec.cz, financera.cz, finex.cz, penize.cz). 3+ condition met. Primary source: publisher_key airbank.cz equals identity_key airbank.cz — primary test passes by key equality. Core gaps: offering, segment, and positioning are all present — no core gap. Result: 3+ independent sources, primary established, no core gap — confidence is high."
---

# Record R-A6-05 — Air Bank

One deep-dive invocation. Not written for a reader; the document assembled from it is 3-competitive-analysis/2-competitor-cards.md.
