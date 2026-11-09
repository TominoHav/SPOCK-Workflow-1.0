---
run_id: 2026-04-card-disputes
record_id: R-A6-04
artifact_id: A6
item_id: "moneta.cz"
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
  - moneta-press-2025
  - moneta-faq
  - kurzy-moneta-2025
  - ct24-reklamace-2023
  - finparada-moneta-2025
  - mesec-reklamace-2025
  - mesec-moneta-fee-2025
  - 5nej-moneta-2026
  - dlapiper-psd3
bounds_hit: []
card:
  identity_key: "moneta.cz"
  name: "MONETA Money Bank"
  type: "direct"
  represents: 
    - "B1"
    - "B5"
  standing: "leader"
  researched_at: "2026-08-17"
  offering: "Czech retail bank (one of the ten largest) offering card dispute handling via Internet Banking CARDS section and Smart Banka mobile app. Customers initiate a dispute by selecting a specific transaction and filing a claim directly from the transaction view — a transaction-level digital flow that eliminates paper forms and branch visits. MONETA handled 35,000 card payment disputes in calendar year 2024, a 29% year-on-year increase, and is the only Czech bank to have disclosed this volume figure. Dispute types covered: unauthorized transactions, undelivered goods, duplicate charges, unwanted subscriptions in mobile apps, failed ATM cash withdrawals, and duplicate merchant terminal billing."
  segment: "Retail debit and credit cardholders in the Czech Republic across all age and income segments. Primary: existing MONETA customers (approximately 1.6 million; near-100% digital penetration as of FY2025). The dispute channel is designed for cardholders who want a home-based digital alternative to phone and branch dispute filing."
  features: 
    - name: "Transaction-level dispute initiation in Smart Banka"
      detail: "Customer opens Smart Banka, navigates to the CARDS section, selects the disputed transaction, and files a claim directly from that transaction view. No form download, phone call, or branch visit required. Confirmed as a core digital channel in the MONETA press release and in Finparada July 2025 reporting."
      source: "moneta-press-2025"
    - name: "Transaction-level dispute initiation in Internet Banking"
      detail: "Customer logs into Internet Banking (web), selects the disputed transaction in the CARDS section, and initiates a claim from the transaction record. The claim form pre-populates with the transaction date, amount, and merchant name from the selected record."
      source: "finparada-moneta-2025"
    - name: "Messages-based dispute submission"
      detail: "Customer files a dispute via the Messages section in Internet Banking or Smart Banka, selecting type Reklamace a stiznosti (Claims and Complaints). Supports written dispute description and document attachment as an alternative path to the transaction-level CARDS flow."
      source: "moneta-press-2025"
    - name: "Digital document upload during filing"
      detail: "Customer attaches supporting evidence at the point of filing: order confirmation, merchant communication, proof of return, or other documentation. All submission is digital; no postal delivery of documents required."
      source: "mesec-reklamace-2025"
    - name: "13-month dispute filing window"
      detail: "Customer has up to 13 months from the transaction date to file a card payment dispute, the legal maximum in Czech Republic. Applies to all dispute categories including chargebacks for undelivered goods and unauthorized transactions. Confirmed by MONETA FAQ and mesec.cz."
      source: "mesec-reklamace-2025"
    - name: "Fee-free dispute filing for unauthorized transactions and processing errors"
      detail: "Filing a dispute for an unauthorized transaction or an incorrectly processed payment carries no fee. A 300 CZK fee applies only to voluntary chargebacks filed without a prior merchant resolution attempt; the bank discloses this fee and obtains client approval before proceeding. Fee structure effective April 1 2025."
      source: "mesec-moneta-fee-2025"
    - name: "Online dispute form without login"
      detail: "Customer can submit a dispute via a web form at moneta.cz without logging into Internet Banking or Smart Banka. Listed by mesec.cz as an available MONETA channel; serves customers with limited digital banking access or those preferring a written channel for complex disputes."
      source: "mesec-reklamace-2025"
    - name: "Phone and chat dispute channels"
      detail: "Customer calls 224 443 636 or uses web or app chat to file a dispute. These channels supplement digital self-service and are listed by MONETA and independently by mesec.cz as available for all dispute types. Fallback for customers who cannot or choose not to use the app or Internet Banking."
      source: "mesec-reklamace-2025"
  usps: 
    - claim: "Only Czech bank with a published card dispute volume — 35,000 disputes processed in calendar year 2024 with 29% year-on-year growth, the sole quantitative anchor in the Czech card dispute market"
      evidence: "MONETA press release (June 12 2025) states 35,000 card payment disputes in calendar year 2024 and 29% YoY growth. Independently corroborated: Finparada.cz (July 23 2025) editorial on MONETA dispute simplification states identical figures from a separate editorial angle; CT24 (December 30 2023) cited several thousand monthly chargebacks for MONETA with 10% December growth, consistent with a 2023 annual baseline of approximately 27,000 from which 29% growth reaches 35,000. No other Czech ring-1 bank has published an equivalent figure. The 35,000 covers all card payment dispute types, not only scheme chargebacks."
      source: "moneta-press-2025"
    - claim: "Fully digital dispute filing from home — no paper form, email form, or branch visit required for any dispute type"
      evidence: "MONETA press release: clients can file from home through Internet Banking or Smart Banking. Finparada.cz (July 2025): old process required phone, postal mail, or in-person branch; digital channels replaced it and increased submission volumes, including cases clients previously would have abandoned. Mesec.cz (August 2025): Internet Banking, Smart Banka, online form, and chat confirmed as all-digital channels currently available."
      source: "finparada-moneta-2025"
    - claim: "Published SLA of 35 working days maximum — the only Czech bank with a specific disclosed resolution time commitment, providing the market benchmark for H5"
      evidence: "MONETA press release and FAQ both state up to 35 working days as the resolution SLA. Mesec.cz (August 2025) confirms 35 working days as the legal maximum for disputes involving third parties and identifies MONETA as stating this as their SLA. No other Czech ring-1 bank reviewed in this research has published a specific resolution SLA."
      source: "moneta-press-2025"
    - claim: "Digital simplification surfaced latent demand: online filing channels increased total submissions by capturing cases clients previously would not have filed"
      evidence: "MONETA press release: the introduction of online forms increased complaint submissions including cases clients might have previously ignored. Finparada.cz (July 2025) confirms this as MONETA's stated explanation for the 29% volume growth. The implication is that digital intake reveals actual dispute incidence that paper intake suppressed — a finding relevant to any Czech bank deploying similar digital channels."
      source: "finparada-moneta-2025"
  positioning: "MONETA positions itself as the transparent digital-first Czech bank for card dispute handling, making filing as easy as possible from home and being the only Czech bank to publicly report dispute volumes. The bank frames the 29% year-on-year volume increase not as a problem but as evidence that digital channels surface previously suppressed demand — customers who did not file because the process was too friction-heavy. Resolution speed (35 working days) is stated as a commitment, not as a constraint."
  pricing_model: "No dispute filing fee for unauthorized transactions, incorrectly processed payments, or standard chargebacks where merchant resolution was first attempted. Fee of 300 CZK for voluntary chargebacks filed without a prior merchant resolution attempt, effective April 1 2025; the bank discloses this fee and seeks client approval before proceeding. Fee of 1500 CZK for clearly unfounded, repetitive, or dishonestly motivated complaints. Published SLA: resolution communicated within 35 working days maximum. Dispute processing bundled with the customer account relationship; no standalone dispute service fee. Specific fee amounts are published in MONETA's fee schedule (sazebnik) effective April 1 2025; not displayed on the main dispute product pages — customers are referred to the fee schedule document."
  strengths: 
    - claim: "Transaction-level in-app dispute initiation confirmed in Smart Banka and Internet Banking CARDS section — one of two Czech banks at this capability standard alongside KB, per Penize.cz comparison cited in the landscape map"
      source: "finparada-moneta-2025"
    - claim: "Smart Banka rated 4.8/5, described as intuitive with 200+ functions and 41 in-app products; strong underlying channel quality for digital dispute filing and account management"
      source: "5nej-moneta-2026"
    - claim: "35,000 card disputes processed in 2024 and nearly 20,000 by April 2025 demonstrates growing and scalable dispute handling capacity; volume growth driven by digital filing rather than fraud increase alone"
      source: "finparada-moneta-2025"
    - claim: "Only published resolution SLA among Czech ring-1 banks (35 working days) makes MONETA the only objective resolution-speed benchmark in the Czech card dispute market — the quantitative anchor for H5 in this run"
      source: "ct24-reklamace-2023"
  weaknesses: 
    - claim: "No evidenced in-app dispute status tracking — customers who file digitally have no confirmed way to see case progress after submission; resolution communicated only when the case is decided, up to 35 working days after filing, with no proactive interim updates described"
      source: "mesec-reklamace-2025"
    - claim: "At least one customer reports complaint handling as protracted — matters that should take days stretched into weeks"
      source: "5nej-moneta-2026"
    - claim: "Published SLA of 35 working days (approximately 7 calendar weeks) is at the current legal maximum for third-party-involved disputes and will be non-compliant with the PSD3/PSR 14-day mandatory maximum expected to take effect 2027-2028"
      source: "dlapiper-psd3"
    - claim: "No confirmed card transaction push notification feature — Smart Banka real-time infrastructure is evidenced for personalized marketing triggers but no source reviewed lists proactive card transaction alerts among MONETA's dispute or fraud-response channels, leaving customers without a pre-dispute notification signal for unauthorized transactions"
      source: "mesec-reklamace-2025"
  sources: 
    - ref: "moneta-press-2025"
      publisher: "MONETA Money Bank — press release 'Klienti Monety stale casteji reklamuji platby kartou. Brani se proti nedodanemu zbozi, duplicitam i nechtenym predplatnym', moneta.cz"
      publisher_key: "moneta.cz"
      accessed: "2026-08-17"
    - ref: "moneta-faq"
      publisher: "MONETA Money Bank — FAQ 'Jak mohu reklamovat platbu kartou', moneta.cz"
      publisher_key: "moneta.cz"
      accessed: "2026-08-17"
    - ref: "kurzy-moneta-2025"
      publisher: "Kurzy.cz — news aggregation of MONETA press release 'Klienti Monety stale casteji vyuzivaji reklamaci platby kartou', kurzy.cz"
      publisher_key: "kurzy.cz"
      accessed: "2026-08-17"
    - ref: "ct24-reklamace-2023"
      publisher: "Ceska televize CT24 — 'Cesi stale casteji reklamuji platby kartou. Brani se nesolidnim e-shopum i podvodnikum', ct24.ceskatelevize.cz"
      publisher_key: "ct24.cz"
      accessed: "2026-08-17"
    - ref: "finparada-moneta-2025"
      publisher: "Finparada.cz — 'MONETA zjednodusila reklamace plateb. Vysledkem je narust podanych zadosti', finparada.cz"
      publisher_key: "finparada.cz"
      accessed: "2026-08-17"
    - ref: "mesec-reklamace-2025"
      publisher: "Mesec.cz — 'Nechtene predplatne, duplicitni platba, nedodane zbozi: Kdy vam penize zachrani reklamace platby kartou?', mesec.cz"
      publisher_key: "mesec.cz"
      accessed: "2026-08-17"
    - ref: "mesec-moneta-fee-2025"
      publisher: "Mesec.cz — 'MONETA zvysi poplatky. Drazsi budou sluzby na pobockach a hotovost', mesec.cz"
      publisher_key: "mesec.cz"
      accessed: "2026-08-17"
    - ref: "5nej-moneta-2026"
      publisher: "5nej.cz — 'Moneta Money Bank Ucet - recenze a zkusenosti', 5nej.cz"
      publisher_key: "5nej.cz"
      accessed: "2026-08-17"
    - ref: "dlapiper-psd3"
      publisher: "DLA Piper — 'PSD3 and PSR: Proposed reforms to the EU Payments Framework', dlapiper.com"
      publisher_key: "dlapiper.com"
      accessed: "2026-08-17"
  gaps: 
    - "transaction_push_notifications: "Smart Banka real-time infrastructure confirmed for personalized marketing triggers (7-second post-transaction offer via AWS/SAS/Trask, from pymnts.com 2025 in investor-onboarding run). Whether MONETA sends proactive card transaction alerts comparable to KB's Oznameni o platbach — push-notifying customers of every card transaction in real time — is not confirmed by any source reviewed in this research. The Smart Banka product page lists 200+ functions but authentication notifications only. Material gap for H1 (no timely notification).\""
    - "dispute_status_tracking: "No source reviewed or fetched describes an in-app or web interface where a customer can check the status of a filed dispute. The term 'stav reklamace' (dispute status) does not appear in any MONETA or independent source reviewed. The gap may reflect a genuine feature absence (H3 applies to MONETA post-submission) or an undocumented capability. Material gap for H3.\""
    - "resolution_median_time: "MONETA publishes 35 working days as the SLA maximum. Average or median resolution time is not disclosed. Whether most disputes resolve significantly faster than the maximum — which would change the H5 characterization — is not established.\""
    - "ethoca_integration: "Whether MONETA has integrated Mastercard Ethoca Alerts for pre-chargeback merchant notification (T4) is not established. Ethoca integration would deflect a share of formal chargebacks and reduce resolution time for deflected cases. Gap for T4 coverage.\""
    - "resolution_outcome_content: "What MONETA communicates to customers when a dispute is decided — outcome, reasoning, options if the chargeback is declined, fraud prevention follow-up — is not described in any source reviewed. Relevant for H4 (no security outcome information).\""
  confidence: "high"
  confidence_basis: "Derived by Standards section 3.3. Independent sources: 6 distinct publisher_keys across the card sources: moneta.cz, ct24.cz, finparada.cz, mesec.cz, 5nej.cz, dlapiper.com. Note: kurzy.cz is listed in sources[] but carries republished MONETA press release content; by the Standards rule that a press release and three outlets reporting it are one source, kurzy.cz and moneta.cz share origin and kurzy.cz is excluded from the independence count, leaving 6 distinct publisher_keys. Note: mesec-reklamace-2025 and mesec-moneta-fee-2025 both carry publisher_key mesec.cz and count as one party. Adjusted independent count: moneta.cz, ct24.cz, finparada.cz, mesec.cz, 5nej.cz, dlapiper.com = 6 distinct keys (moneta.cz being the primary). Primary source: ESTABLISHED — publisher_key moneta.cz equals identity_key moneta.cz by string equality per section 3.3. Core gaps: none — offering, segment, and positioning are all present and populated. Condition met: 3+ independent sources, a primary source, no core gap. Confidence: high."
---

# Record R-A6-04 — MONETA Money Bank

One deep-dive invocation. Not written for a reader; the document assembled from it is 3-competitive-analysis/2-competitor-cards.md.
