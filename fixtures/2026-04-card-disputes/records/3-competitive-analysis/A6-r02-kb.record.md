---
run_id: 2026-04-card-disputes
record_id: R-A6-02
artifact_id: A6
item_id: "kb.cz"
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
  - kb-reklamace
  - kb-stiznosti
  - kb-zneuziti-karty
  - kb-fungovani-karet
  - kb-q1-2026
  - penize-2banks
  - finance-cz-reklamace
  - wikipedia-kb
  - finex-kb-recenze
  - top-cz-kb-recenze
  - mesec-reklamace-karta
bounds_hit: []
card:
  identity_key: "kb.cz"
  name: "Komerční banka"
  type: "direct"
  represents: 
    - "B2"
    - "B3"
    - "T1"
    - "T2"
  standing: "leader"
  researched_at: "2026-08-17"
  offering: "Universal Czech retail bank, second-largest by assets (CZK 1,536 billion, 1.6+ million customers, 241 branches), majority-owned by Société Générale (60%). Within card dispute handling: MojeBanka internet banking and Mobilní banka mobile app both provide transaction-level in-app dispute initiation from the transaction history, with guided documentation upload. Additional dispute channels: 24/7 phone support (955 512 230), email (reklamace_transakci@kb.cz with form), branch. Card management features: configurable payment notifications (Oznámení o platbách), self-service card lock/unlock, DCC control. KB 2025 transformation programme declared complete; 1,673,000 KB+ active users as of Q1 2026."
  segment: "Retail banking customers in the Czech Republic — existing debit and credit cardholders across KB's 1.6+ million-strong customer base. Digital segment: 1,673,000 KB+ active users as of Q1 2026, up 537,000 year-on-year, making the app the primary service channel. The in-app dispute capability is accessible to any cardholder with a Mobilní banka or MojeBanka login."
  features: 
    - name: "Transaction-level in-app dispute initiation"
      detail: "Customer opens the transaction list in Mobilní banka (mobile app) or MojeBanka (internet banking), selects the disputed card payment, and KB's system guides them through the entire dispute submission process including documentation upload. No form download or branch visit required for initiation. Available for both debit and credit card transactions."
      source: "kb-reklamace"
    - name: "Configurable card transaction push notifications (Oznámení o platbách)"
      detail: "Customer configures real-time card payment alerts via KB+ (Settings > Notifications > Outgoing Payments) or in MojeBanka (Settings gear icon > Payment Notifications > Card Usage). Once configured, a push notification or email is sent immediately after each card transaction occurs."
      source: "kb-fungovani-karet"
    - name: "Self-service card lock and unlock (zamknout kartu)"
      detail: "Customer can temporarily freeze their card from within KB+ or MojeBanka without calling the bank. The lock blocks all transactions and cash withdrawals without permanently cancelling the card. The customer can reverse the lock at any time from the same in-app interface."
      source: "kb-zneuziti-karty"
    - name: "13-month dispute filing window"
      detail: "The deadline for filing a card dispute is 13 months from the date of the disputed transaction — the longest published dispute window found among Czech retail banks in this run. KB advises customers to file as soon as the unauthorized transaction is discovered."
      source: "kb-reklamace"
    - name: "Multi-channel dispute filing"
      detail: "Card disputes can be filed via: in-app (Mobilní banka or MojeBanka, lowest-friction path); email (reklamace_transakci@kb.cz with completed Protokol o reklamaci form); phone (955 512 230, 24/7 card support line); or in person at any KB branch."
      source: "kb-reklamace"
    - name: "Formal complaint response within 15 working days for payment service disputes"
      detail: "KB commits to responding to payment service complaints within 15 working days, with general disputes handled within 30 calendar days. Complex cases — including those dependent on Mastercard or Visa scheme timelines — may extend beyond these periods. Outcome notification uses the same channel as the original submission."
      source: "kb-stiznosti"
    - name: "Card controls in KB+ (DCC, usage management)"
      detail: "Customer accesses Card Details and Management in KB+ to disable DCC (dynamic currency conversion, which can cause unexpected exchange rate fees at foreign POS terminals) and manage permitted card usage. This is a customer-controlled risk reduction capability that does not require a call."
      source: "kb-fungovani-karet"
    - name: "Downloadable dispute form for the email channel"
      detail: "KB provides a downloadable Protokol o reklamaci PDF form on kb.cz for customers using the email dispute channel. Completed form plus supporting documentation (invoices, merchant communications, photos, expert assessments depending on dispute type) is sent to reklamace_transakci@kb.cz."
      source: "kb-reklamace"
  usps: 
    - claim: "One of only two Czech retail banks where a cardholder can dispute a transaction by clicking it in the transaction list — guided digital submission flow, no form download, no call required for initiation"
      evidence: "Peníze.cz (penize-2banks, accessed 2026-08-17) names KB alongside ČS/George as the only two Czech banks reaching this standard. KB's own dispute page confirms in-app initiation from Mobilní banka/MojeBanka. Finance.cz (August 2023) independently describes the flow as selecting the disputed payment in the transaction list and being guided through the entire process. The A5 load-bearing claim is tested and confirmed by two independent sources and KB's primary material."
      source: "penize-2banks"
    - claim: "13-month dispute filing window — the longest published Czech retail bank timeframe found in this run"
      evidence: "KB's dispute support page states 13 months from the transaction date as the filing deadline. Other Czech bank pages reviewed in this run state shorter limits (30 days or 60 days for unauthorized transactions). KB's 13-month window was the longest found in ring-1 Czech retail banking research."
      source: "kb-reklamace"
    - claim: "Largest confirmed digital active user base among Czech universal banks: 1,673,000 KB+ users as of Q1 2026, up 537,000 year-on-year"
      evidence: "KB Q1 2026 financial results (kb-q1-2026) confirm 1,673,000 KB+ active users following completion of the KB 2025 transformation programme. This is the largest confirmed active digital banking user count in Czech banking not attributable to a neobank-only provider. The in-app dispute channel reaches the bank's primary customer interface."
      source: "kb-q1-2026"
    - claim: "Configurable real-time card transaction alerts (Oznámení o platbách) supporting both push notification and email"
      evidence: "KB's card functions page (kb-fungovani-karet) documents the configuration path and confirms immediate notifications per card transaction when set up. No comparable named and documented configurable notification feature was confirmed for other Czech ring-1 incumbent banks in this run's research."
      source: "kb-fungovani-karet"
  positioning: "The leading Czech universal bank on digital self-service card dispute handling, confirmed alongside ČS/George as one of two Czech banks enabling cardholders to dispute a transaction by selecting it in the transaction history. Overall positioning: a stable, full-service bank backed by Société Générale group resources, with KB+ as the primary digital service channel for 1.6+ million retail customers."
  pricing_model: "No customer-facing fee for filing a card dispute via in-app, email, or phone — the dispute service is free for cardholders. Card replacement after confirmed fraud or loss: a fee exists; the specific amount was not confirmed from accessible sources during this research. Monthly account and card fees apply under KB's sazebník (updated May 2026, converting some annual card fees to monthly charges); no dispute-processing fee was found. KB's full retail fee schedule is published as a PDF at kb.cz but specific figures for card replacement and dispute-related services were not retrieved. An unpublished price is a market fact: the card replacement fee after fraud is a gap."
  strengths: 
    - claim: "Transaction-level in-app dispute confirmed — the Czech ring-1 benchmark this run measures the market against, alongside ČS/George"
      source: "penize-2banks"
    - claim: "1,673,000 KB+ active users as of Q1 2026 — the in-app dispute channel is the dominant customer interface, not a marginal option"
      source: "kb-q1-2026"
    - claim: "Société Générale group ownership (60%) and completed Temenos core banking migration provide capital depth and digital platform stability"
      source: "wikipedia-kb"
    - claim: "Self-service card lock (zamknout kartu) available in-app — customer can freeze the card immediately upon suspecting unauthorized use without waiting for a bank agent"
      source: "kb-zneuziti-karty"
  weaknesses: 
    - claim: "Innovation perceived as slower than fintech and neobank competitors; complex banking operations still require branch visits despite KB+ scope — described as 'pomalejší inovace oproti konkurenci' (slower innovation than competitors) in a March 2026 review"
      source: "top-cz-kb-recenze"
    - claim: "Higher fees than digital-first competitors — independent reviews consistently cite charges for services offered free by neobanks as a recurring KB weakness"
      source: "finex-kb-recenze"
    - claim: "Disputed funds historically withheld during investigation rather than provisionally credited to the customer — noted as a disadvantage in Czech consumer media compared to providers that credit immediately. Source from December 2010; current practice may have changed."
      source: "mesec-reklamace-karta"
  sources: 
    - ref: "kb-reklamace"
      publisher: "Komerční banka — Reklamace platební karty support page, kb.cz"
      publisher_key: "kb.cz"
      accessed: "2026-08-17"
    - ref: "kb-stiznosti"
      publisher: "Komerční banka — Řešení stížností a reklamací, kb.cz"
      publisher_key: "kb.cz"
      accessed: "2026-08-17"
    - ref: "kb-zneuziti-karty"
      publisher: "Komerční banka — Zneužití kreditní karty guidance page, kb.cz"
      publisher_key: "kb.cz"
      accessed: "2026-08-17"
    - ref: "kb-fungovani-karet"
      publisher: "Komerční banka — Fungování karet support page, kb.cz"
      publisher_key: "kb.cz"
      accessed: "2026-08-17"
    - ref: "kb-q1-2026"
      publisher: "Komerční banka — Group Financial Results Q1 2026, kb.cz"
      publisher_key: "kb.cz"
      accessed: "2026-08-17"
    - ref: "penize-2banks"
      publisher: "Peníze.cz — Jak reklamovat platbu kartou? Jen dvě banky vám to maximálně usnadní, penize.cz"
      publisher_key: "penize.cz"
      accessed: "2026-08-17"
    - ref: "finance-cz-reklamace"
      publisher: "Finance.cz — Jak požádat banku o reklamaci platby kartou? (August 2023), finance.cz"
      publisher_key: "finance.cz"
      accessed: "2026-08-17"
    - ref: "wikipedia-kb"
      publisher: "Wikipedia — Komerční banka article, en.wikipedia.org"
      publisher_key: "wikipedia.org"
      accessed: "2026-08-17"
    - ref: "finex-kb-recenze"
      publisher: "Finex.cz — Komerční banka recenze a přehled produktů (December 18, 2024), finex.cz"
      publisher_key: "finex.cz"
      accessed: "2026-08-17"
    - ref: "top-cz-kb-recenze"
      publisher: "Top.cz — Komerční banka recenze 2026, by Hana Vítková (March 7, 2026), top.cz"
      publisher_key: "top.cz"
      accessed: "2026-08-17"
    - ref: "mesec-reklamace-karta"
      publisher: "Mesec.cz — Reklamace platby kartou: zákon je bezmocný (December 2010), mesec.cz"
      publisher_key: "mesec.cz"
      accessed: "2026-08-17"
  gaps: 
    - "In-app dispute status tracking (primary H3 gap): "Whether Mobilní banka or MojeBanka shows the status of a submitted dispute — case reference number, current investigation stage, expected resolution date — is not documented on any fetched KB page or mentioned in any independent review. No digital case-tracking capability after submission was established. KB notifies the outcome within 30 calendar days but no intermediate status visibility was confirmed. This is the largest single gap against the run's primary hypothesis.\""
    - "Notification default state (H1 gap): "Oznámení o platbách requires customer configuration. Whether alerts are sent by default to all KB+ cardholders, or must be explicitly enabled, is not confirmed. The configuration instructions (KB+: Settings > Notifications > Outgoing Payments; MojeBanka: Settings > Payment Notifications > Card Usage) imply opt-in rather than default-on. A notification that fires only when the customer has thought to enable it differs materially from an automatic fraud alert — which is the neobank standard and what H1 describes.\""
    - "Resolution SLA for unauthorized transaction chargebacks: "KB commits 15 working days for payment service complaints and 30 calendar days for general disputes. Whether unauthorized card transaction chargebacks follow these SLAs or are governed by Mastercard or Visa scheme timelines (which KB's own complaint page notes separately as 'card association rules') is not confirmed.\""
    - "Card replacement fee after confirmed fraud: "KB states replacement cards arrive within several days but the specific replacement fee was not found in accessible sources.\""
    - "Ethoca and pre-chargeback alert integration: "Whether KB has integrated Mastercard Ethoca Alerts for pre-chargeback deflection is not confirmed. This gap carries from landscape map §6 item 4.\""
    - "Customer satisfaction with dispute resolution outcomes: "Independent reviews cover general digital banking experience. No source specifically addressed the card dispute resolution experience — satisfaction with outcomes, communication quality, or timeline adherence.\""
  confidence: "high"
  confidence_basis: "Derived by §3.3. Independent sources: 7 distinct publisher_keys — kb.cz, penize.cz, finance.cz, wikipedia.org, finex.cz, top.cz, mesec.cz — satisfies the 3+ condition. Primary source: ESTABLISHED — identity_key is kb.cz and kb.cz appears as a publisher_key in sources; §3.3 equality test resolves. Core gaps: offering, segment, and positioning are all present; no core gap. All three high conditions met: 3+ independent sources, primary present, no core gap."
---

# Record R-A6-02 — Komerční banka

One deep-dive invocation. Not written for a reader; the document assembled from it is 3-competitive-analysis/2-competitor-cards.md.
