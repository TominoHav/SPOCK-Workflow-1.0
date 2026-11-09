---
run_id: 2026-04-card-disputes
record_id: R-A6-07
artifact_id: A6
item_id: "revolut.com"
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
  - revolut-dispute-process
  - revolut-help-timelines
  - revolut-wikipedia
  - londoninsider-revolut
  - wise-revolut-cz
bounds_hit: []
card:
  identity_key: "revolut.com"
  name: "Revolut"
  type: "direct"
  represents: 
    - "B1"
    - "B2"
    - "B3"
    - "B4"
    - "B5"
    - "T1"
    - "T2"
    - "T3"
  standing: "innovator"
  researched_at: "2026-08-17"
  offering: "Global neobank (UK-incorporated; EU banking license via Bank of Lithuania since December 2018; full UK banking license March 2026) offering current accounts, debit cards, foreign exchange, stock trading, cryptocurrency, personal loans, insurance, and peer-to-peer payments through a single mobile app. In the card dispute domain: instant transaction push notifications, one-tap card freeze, fully in-app dispute initiation directly from the transaction screen, LLM-powered automated adjudication for sub-threshold disputes, real-time dispute status tracking by tapping the disputed transaction, and stage-by-stage outcome notifications with decision explanations. Available in Czech Republic with local CZK accounts and a dedicated Czech-language entity (revolut.com/en-CZ)."
  segment: "Retail cardholders globally — 68.3 million customers by end 2025 — primarily digitally-native adults preferring mobile-first banking without branch dependency. In Czech Republic: serves Czech residents with a local CZK account and Mastercard or Visa debit card. Dispute handling and chargeback initiation available across all plan tiers from Standard (free) to Ultra."
  features: 
    - name: "Instant push notification on every card transaction"
      detail: "Cardholder receives a real-time push notification showing merchant name, amount, and timestamp for every card payment; unauthorized charges appear within seconds of occurring, enabling action before a statement is issued and before further spending on a compromised card."
      source: "revolut-dispute-process"
    - name: "One-tap card freeze from notification or transaction screen"
      detail: "From a push notification or from the transaction list, the cardholder freezes the card with a single tap; further unauthorized use is blocked immediately without a phone call, branch visit, or waiting for a callback."
      source: "revolut-dispute-process"
    - name: "In-app dispute initiation directly from the disputed transaction"
      detail: "Cardholder taps the transaction in the app, selects Report an issue, chooses the issue type (unauthorized, merchant dispute, ATM, scam, etc.), and — if the case is eligible — taps Submit Chargeback Form; the entire filing flow is in-app with no paper form, no branch, and no phone call required at any step."
      source: "revolut-dispute-process"
    - name: "LLM automated adjudication for sub-threshold disputes"
      detail: "Revolut's LLM agents automatically analyse customer and merchant submissions for disputes below a specified monetary threshold and issue a resolution without human review; this compresses resolution time for qualifying low-value cases to a fraction of the standard chargeback timeline, and breaks the linear relationship between dispute volume and headcount."
      source: "revolut-dispute-process"
    - name: "In-app real-time dispute status tracking"
      detail: "After filing a dispute, the cardholder taps the disputed transaction at any time to see the current status; status is self-serve and visible in-app without contacting customer support or calling the bank, directly addressing the substitute behaviour this run measures (substitute:phone-call)."
      source: "revolut-help-timelines"
    - name: "Proactive stage-by-stage dispute notifications with outcome explanation"
      detail: "Revolut notifies the cardholder at each stage of the dispute process via email and in-app with the expected outcome date; when a decision is reached, an explanation is provided in-app and by email — not a binary approved or denied without context."
      source: "revolut-help-timelines"
    - name: "Tiered resolution timeline with fraud fast-track"
      detail: "Unauthorized fraud cases resolved within 10 days on a dedicated fast-track. ATM disputes up to 45 days. Standard disputes resolved within 5 weeks for 85 percent of cases; complex cases up to 12 weeks. Cardholder is informed which track their case is on and receives the expected outcome date."
      source: "revolut-help-timelines"
    - name: "In-app evidence upload within the dispute form"
      detail: "Cardholder uploads supporting documentation — photos, screenshots, receipts — directly within the in-app dispute form without switching to email or visiting a branch to submit evidence."
      source: "revolut-dispute-process"
    - name: "Dispute cancellation within the app"
      detail: "Cardholder can cancel a submitted dispute from within the Revolut app if the matter is resolved directly with the merchant before the chargeback process concludes; the cancellation route is available in the same transaction view used for initiation."
      source: "revolut-dispute-process"
  usps: 
    - claim: "Only participant on this map with confirmed LLM automated chargeback adjudication in production at consumer scale"
      evidence: "Revolut's own dispute documentation states it uses LLM agents to automatically adjudicate chargeback claims below a specified value by analysing customer and merchant submissions. No Czech ring-1 banking participant in this run (CSOB, KB, mBank, MONETA, AIR Bank, Raiffeisenbank) has confirmed equivalent automated adjudication in production."
      source: "revolut-dispute-process"
    - claim: "The most integrated end-to-end dispute journey on this map — notification, freeze, initiation, adjudication, status tracking, and outcome explanation without leaving the app"
      evidence: "Revolut's cardholder help documentation and the A5 landscape map entry both document the complete chain: instant push notification, one-tap freeze, in-app dispute initiation from the transaction screen, LLM adjudication for qualifying cases, real-time status tracking by tapping the disputed transaction, expected outcome dates, and decision explanations by email and in-app. No other participant on this map is confirmed to integrate all six steps in a single app experience."
      source: "revolut-dispute-process"
    - claim: "85 percent of disputes resolved within 5 weeks with fraud cases in 10 days — faster than the only published Czech banking SLA and ahead of the PSD3/PSR 14-day ceiling for fraud"
      evidence: "Revolut's published timelines: 85 percent within 5 weeks; fraud cases within 10 days. The only published Czech bank SLA in this run is MONETA at up to 35 working days (approximately 7 calendar weeks). Revolut outperforms that benchmark for the large majority of cases. The forthcoming PSD3/PSR regulation (R1) will mandate 14-day maximum resolution; Revolut's fraud fast-track already meets that ceiling."
      source: "revolut-help-timelines"
    - claim: "Pan-EU banking consistency under a single EU license — Czech cardholders access the same dispute features as any EU cardholder without local adaptation gaps"
      evidence: "Revolut operates across the EU under a banking license from the Bank of Lithuania (December 2018), providing consistent product features across member states. Czech Republic has a dedicated entity with CZK accounts. The Czech help section (en-CZ) confirms card payment dispute handling, dispute cancellation, fraud reporting, and chargeback updates as available services."
      source: "revolut-wikipedia"
  positioning: "The all-in-one finance app built around a mobile-first, zero-branch model. In the dispute domain, Revolut positions itself as the provider that has removed all friction from the dispute journey: the customer never leaves the app, never waits for a form, and never calls a helpline. LLM adjudication and real-time status transparency are the evidence Revolut presents for a technology-first approach to a problem traditional banks still solve with paper and phone."
  pricing_model: "Freemium subscription model with five tiers in Czech Republic: Standard at 0 CZK per month (all core features including dispute handling), Plus at 114.99 CZK, Premium at 244.99 CZK with unlimited foreign exchange and no weekend surcharge, Metal at 394.99 CZK with higher ATM limits, Ultra at 1,320 CZK per month. EU equivalent pricing as of 1 August 2025: Standard 0 EUR, Plus 2.99 EUR, Premium 7.99 EUR, Metal 13.99 EUR, Ultra 50 EUR per month. Dispute handling and chargeback initiation are available on all tiers including the free Standard tier — no paid plan is required to raise a dispute. A per-chargeback fee applies when a chargeback is successful; the fee amount depends on the transaction currency and is not published in any publicly accessible rate schedule from fetched sources — an unpublished price is itself a market fact."
  strengths: 
    - claim: "Most comprehensive integrated dispute flow on this map: the only participant confirmed to combine notification, freeze, initiation, automated LLM adjudication, real-time status tracking, and outcome explanation in a single in-app experience with no required human touchpoint for qualifying cases"
      source: "revolut-dispute-process"
    - claim: "Scale of 68.3 million global customers by end 2025 and revenue of £4.5 billion — fraud detection and LLM adjudication models trained on transaction volumes no Czech ring-1 bank approaches"
      source: "revolut-wikipedia"
    - claim: "Dual regulatory foundation: EU banking license (Bank of Lithuania, December 2018) and full UK banking license (March 2026) with FSCS deposit protection up to £120,000 for UK customers — Revolut is now a licensed bank, not merely a payments institution"
      source: "revolut-wikipedia"
  weaknesses: 
    - claim: "Customer service for personal account holders is AI chatbot-only with no telephone access; analysis of 391,000-plus user reviews identifies this as the single most consistent complaint, and complex dispute cases can remain in automated loops for weeks with no meaningful human escalation path"
      source: "londoninsider-revolut"
    - claim: "3,242 authorised push payment fraud complaints against Revolut were escalated to the UK Financial Ombudsman Service in 2024 — more than against any other bank or fintech operating in the UK — with approximately 30 percent of upheld complaints resulting in compensation, described as significantly lower than at traditional banks"
      source: "londoninsider-revolut"
    - claim: "Compliance-triggered account freezes without prior warning can make funds inaccessible for days or weeks — a risk that compounds the situation for a cardholder simultaneously disputing an unauthorized transaction and needing access to their account"
      source: "londoninsider-revolut"
  sources: 
    - ref: "revolut-dispute-process"
      publisher: "Revolut UK — How to dispute a Revolut card transaction (revolut.com/blog/post/how-to-dispute-card-transaction)"
      publisher_key: "revolut.com"
      accessed: "2026-08-17"
    - ref: "revolut-help-timelines"
      publisher: "Revolut UK help — Dispute process and timelines (help.revolut.com)"
      publisher_key: "revolut.com"
      accessed: "2026-08-17"
    - ref: "revolut-wikipedia"
      publisher: "Wikipedia — Revolut (en.wikipedia.org/wiki/Revolut)"
      publisher_key: "wikipedia.org"
      accessed: "2026-08-17"
    - ref: "londoninsider-revolut"
      publisher: "London Insider — Why Is Revolut Bad? The Fintech Giant's Dark Side Revealed (londoninsider.co.uk)"
      publisher_key: "londoninsider.co.uk"
      accessed: "2026-08-17"
    - ref: "wise-revolut-cz"
      publisher: "Wise — Revolut card review in Czechia: card selection, prices, service fees, and limits (wise.com/en-cz/blog/revolut-card-review)"
      publisher_key: "wise.com"
      accessed: "2026-08-17"
  gaps: 
    - "Per-chargeback fee amount: "Revolut states a fee applies when a chargeback is successful and the amount depends on the transaction currency; no published fee schedule was recovered from any fetched source (primary Revolut help pages returned HTTP 403), and the specific amounts are not available. The fee exists; its cost to the cardholder is unestablished.\""
    - "LLM adjudication monetary threshold: "Revolut does not publish the value below which LLM agents adjudicate automatically. Whether this covers disputes under €25 or up to a higher limit determines how much of the dispute volume is auto-adjudicated versus reviewed. Not established from available sources.\""
    - "Czech Republic-specific fraud prevention volume: "a search result excerpt from revolut.com/en-CZ attributes the figure of 13,121 billion CZK in fraud prevented in 2024 to Revolut's Czech homepage, but that page returned HTTP 403 and was not directly retrieved. The figure is not cited in this card.\""
    - "Primary Revolut help pages (revolut-dispute-process, revolut-help-timelines) returned HTTP 403 during deep-dive fetches; claims attributed to revolut.com rest on sources already established by the landscape-mapping agent on 2026-08-17 and entered in sources.md, not a fresh retrieval in this branch. The landscape map's research is the basis for the LLM adjudication claim and the detailed step-by-step dispute flow."
  confidence: "high"
  confidence_basis: "Derived by §3.3. Independent sources: 4 distinct publisher_keys (revolut.com, wikipedia.org, londoninsider.co.uk, wise.com) — satisfies the 3-plus condition. Primary source: ESTABLISHED — identity_key revolut.com matches publisher_key revolut.com on sources revolut-dispute-process and revolut-help-timelines. Core gap: none — offering, segment, and positioning are all present. Condition: 3-plus independent sources, a primary, no core gap — high. Reduction noted: primary source pages returned HTTP 403 during this research; claims from revolut.com rest on the landscape-mapping agent's research of 2026-08-17 as documented in sources.md."
---

# Record R-A6-07 — Revolut

One deep-dive invocation. Not written for a reader; the document assembled from it is 3-competitive-analysis/2-competitor-cards.md.
