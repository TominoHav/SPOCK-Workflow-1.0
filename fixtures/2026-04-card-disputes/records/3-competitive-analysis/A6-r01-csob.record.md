---
run_id: 2026-04-card-disputes
record_id: R-A6-01
artifact_id: A6
item_id: "csob.cz"
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
  - csob-reklamace-form
  - csob-smart-notifications
  - csob-tac-nov-2025
  - penize-2banks
  - finex-csob-card-2026
  - financera-csob-card-2026
  - wikipedia-csob
  - dlapiper-psd3
bounds_hit: []
card:
  identity_key: "csob.cz"
  name: "ČSOB (Československá Obchodní Banka)"
  type: "direct"
  represents: 
    - "B1"
  standing: "leader"
  researched_at: "2026-08-17"
  offering: "Card dispute and chargeback handling for retail cardholders at ČSOB, the largest Czech retail bank by total assets (CZK 1,805 billion as of 2022) and one of the four largest by customer count (4.34 million). Dispute intake operates via a downloadable PDF form — Prohlášení držitele karty o sporné transakci — which the cardholder completes and submits by email to reklamace@csob.cz, via government data mailbox (ID 8qvdk3s), by post, or in person at one of 201 ČSOB branches. The ČSOB Smart mobile app provides free push notifications for every card payment and in-app card blocking, but does not offer structured in-app dispute initiation from a specific transaction. T&Cs effective November 1, 2025 commit to resolution within 15 working days (standard) or 35 working days maximum where independent obstacles prevent earlier resolution."
  segment: "Retail debit and credit card holders in Czech Republic across ČSOB's 4.34 million customer base. ČSOB serves all retail segments through 201 ČSOB branches and up to 3,300 Czech Post service points, with digital self-service available through the ČSOB Smart mobile app (4.1/5 on Google Play, 65,000+ reviews)."
  features: 
    - name: "Push notification for every card payment"
      detail: "Customer enables free push notifications in ČSOB Smart and receives an instant device alert for every card transaction — including merchant name and amount — enabling same-moment detection of an unauthorized payment before the statement period closes."
      source: "csob-smart-notifications"
    - name: "Instant in-app card blocking"
      detail: "Customer taps to block or suspend a payment card in ČSOB Smart immediately upon spotting an unauthorized charge, stopping further payments without calling a helpline or visiting a branch."
      source: "csob-smart-notifications"
    - name: "Email dispute form submission to reklamace@csob.cz"
      detail: "Customer downloads the Prohlášení držitele karty o sporné transakci PDF, completes it with transaction details, and emails it with supporting documents to reklamace@csob.cz — enabling submission without a branch visit. The form is the required intake mechanism; completion and electronic delivery can both be done digitally, but the form step itself is not eliminated."
      source: "csob-reklamace-form"
    - name: "24/7 phone dispute reporting at 800 300 300"
      detail: "Customer calls ČSOB's card operations line at any hour to report an unauthorized transaction and initiate a dispute verbally; the line handles card blocking, dispute registration, and general card queries around the clock."
      source: "csob-tac-nov-2025"
    - name: "Card limits and internet payment controls in ČSOB Smart"
      detail: "Customer sets per-card daily spending limits, enables or disables online card payments, and manages security settings in ČSOB Smart — providing preventive controls both before and immediately after discovering an unauthorized transaction."
      source: "csob-smart-notifications"
    - name: "Data mailbox dispute submission (government system ID 8qvdk3s)"
      detail: "Customer submits a formal card dispute through Czech Republic's authenticated government data mailbox, providing electronically signed documentation without printing or physical presence — an alternative to email for formally executed complaint submissions."
      source: "csob-tac-nov-2025"
    - name: "Pending transaction overview in ČSOB Smart"
      detail: "Customer views pending blocks (Blokace) on their account in the Přehledy section of ČSOB Smart, showing transactions that have been authorized but not yet settled — providing partial transaction visibility during the period a dispute may be in progress."
      source: "csob-smart-notifications"
    - name: "Formal dispute outcome notification"
      detail: "Upon resolution ČSOB informs the cardholder of the outcome of the complaint proceedings in writing per its T&Cs — customer receives the bank's final decision on whether the disputed amount is returned."
      source: "csob-tac-nov-2025"
  usps: 
    - claim: "ČSOB Smart delivers immediate fraud response — push notification plus one-tap card block — enabling cardholder action within seconds of an unauthorized transaction without calling the bank"
      evidence: "Push notifications for every card payment are available free in ČSOB Smart; in-app card blocking is a confirmed feature, both documented in ČSOB Smart FAQ and app documentation. The notification-to-block flow requires no phone call or branch visit."
      source: "csob-smart-notifications"
    - claim: "Largest Czech retail bank by assets and customer count, providing the widest in-person dispute support network of any Czech ring-1 participant"
      evidence: "CZK 1,805 billion total assets, 4.34 million clients, 201 ČSOB branches plus Czech Post network confirmed by Wikipedia and Financera. No other Czech ring-1 retail bank has a comparable point-of-service footprint for cardholders who need face-to-face support."
      source: "wikipedia-csob"
    - claim: "Multi-channel dispute filing — email, data mailbox, phone, branch, post — ensures no cardholder is locked out of the process regardless of digital access or ability"
      evidence: "All five channels confirmed in ČSOB T&Cs and reklamační řád: email reklamace@csob.cz, data mailbox ID 8qvdk3s, phone 800 300 300, in-person at 201 branches, written post to Praha 5. The breadth of channel optionality exceeds what most digital-only dispute providers offer."
      source: "csob-tac-nov-2025"
  positioning: "Stable, comprehensive Czech financial institution backed by KBC Group, serving 4.34 million retail customers through the widest physical network in Czech retail banking. Card dispute handling is positioned around multi-channel accessibility and the credibility of scale rather than digital-first self-service. No explicit public positioning statement specific to card dispute handling was found."
  pricing_model: "No published fee for submitting a legitimate card dispute — unauthorized transaction chargebacks are processed at no cost to the cardholder. The fee schedule effective 1 July 2026 includes a charge for unjustified card transaction complaints (neodůvodněná reklamace transakce kartou) billed per 15 minutes of bank staff time; the specific rate per 15-minute increment was not retrieved from publicly accessible sources. No differentiation is published between urgent and standard dispute processing. Submission channels — email, branch, post, data mailbox — carry no stated service charge."
  strengths: 
    - claim: "In-app push notifications and one-tap card blocking in ČSOB Smart enable immediate fraud containment without a phone call — a digital security response capability confirmed at one of the Czech market's largest banks"
      source: "csob-smart-notifications"
    - claim: "201 branches plus Czech Post service points provide the widest physical dispute support network in Czech retail banking, reaching cardholders who cannot or prefer not to use digital channels"
      source: "financera-csob-card-2026"
    - claim: "Finex.cz rates ČSOB 95% overall (5th among Czech banks) — reflecting broad product range and established market reputation"
      source: "finex-csob-card-2026"
  weaknesses: 
    - claim: "No in-app dispute initiation from a specific transaction — ČSOB is not among the Czech banks that allow a cardholder to click on a payment and dispute it directly in mobile or internet banking, requiring a separate form process instead"
      source: "penize-2banks"
    - claim: "Customer reviews cite card blocking without prior warning, slow branch service, and extended wait times — friction in the very in-person channel the dispute process depends on for cardholders who cannot file digitally"
      source: "financera-csob-card-2026"
    - claim: "Published resolution SLA of 15-35 working days will be non-compliant with PSD3's forthcoming 14-calendar-day maximum resolution requirement, creating regulatory exposure the bank has not publicly addressed"
      source: "dlapiper-psd3"
  sources: 
    - ref: "csob-reklamace-form"
      publisher: "ČSOB — Reklamace transakcí platebních karet PDF dispute form, platbakartou.csob.cz"
      publisher_key: "csob.cz"
      accessed: "2026-08-17"
    - ref: "csob-smart-notifications"
      publisher: "ČSOB — ČSOB Smart app push notification and card management documentation and FAQ, csob.cz"
      publisher_key: "csob.cz"
      accessed: "2026-08-17"
    - ref: "csob-tac-nov-2025"
      publisher: "ČSOB — Obchodní podmínky pro platební karty (business terms for payment cards), effective November 1, 2025, csob.cz"
      publisher_key: "csob.cz"
      accessed: "2026-08-17"
    - ref: "penize-2banks"
      publisher: "Peníze.cz — Jak reklamovat platbu kartou? Jen dvě banky vám to maximálně usnadní, penize.cz"
      publisher_key: "penize.cz"
      accessed: "2026-08-17"
    - ref: "finex-csob-card-2026"
      publisher: "Finex.cz — ČSOB recenze a přehled produktů 2026, finex.cz"
      publisher_key: "finex.cz"
      accessed: "2026-08-17"
    - ref: "financera-csob-card-2026"
      publisher: "Financera.cz — ČSOB recenze 2026, financera.cz"
      publisher_key: "financera.cz"
      accessed: "2026-08-17"
    - ref: "wikipedia-csob"
      publisher: "Wikipedia — Ceskoslovenska obchodni banka article, en.wikipedia.org"
      publisher_key: "wikipedia.org"
      accessed: "2026-08-17"
    - ref: "dlapiper-psd3"
      publisher: "DLA Piper — PSD3 and PSR: Proposed reforms to the EU Payments Framework, dlapiper.com"
      publisher_key: "dlapiper.com"
      accessed: "2026-08-17"
  gaps: 
    - "Digital form requirement detail: "the PDF dispute form (Prohlášení držitele karty o sporné transakci at platbakartou.csob.cz) is confirmed as the required intake mechanism, but the binary-encoded PDF was not readable in this research. Whether the form must be physically printed and hand-signed before scanning, or whether a digitally completed and electronically signed PDF is accepted for email submission, is not established. The landscape map's characterisation — download, print, sign, scan — is consistent with all evidence gathered but the print-and-sign step is not directly confirmed from a readable source in this run.\""
    - "Dispute status tracking (H3): "no evidence of any mechanism for cardholders to see the current status of a filed dispute was found in ČSOB Smart, on csob.cz, or in any independent review. The T&Cs commit to communicating the outcome but make no mention of interim status updates. Whether a case reference number is issued at submission enabling status queries by phone is not established. This is the single largest gap against the run's primary hypothesis.\""
    - "Security outcome disclosure (H4): "what ČSOB communicates to the cardholder about the security investigation — confirmation of fraud, whether the merchant was notified, whether the card scheme was involved — is not described in any publicly available source reviewed.\""
    - "Ethoca pre-chargeback integration: "whether ČSOB has integrated Mastercard Ethoca Alerts for pre-chargeback deflection is not established. Given ČSOB's scale as a Mastercard issuer this is plausible but unconfirmed.\""
    - "Fee for unjustified disputes: "the sazebník effective 1 July 2026 confirms a per-15-minute charge for unjustified card transaction complaints but the specific rate was not retrieved from any publicly accessible source; the PDF was not directly readable.\""
    - "Push notification timing: "whether ČSOB Smart notifies at card authorization (enabling freeze before settlement) or only at settlement is not established. Authorization-time notification would materially change H1's gap assessment.\""
  confidence: "high"
  confidence_basis: "Derived by §3.3 of competitive-analysis-standards@0.9. Independent sources: 6 distinct publisher_keys across sourced fields — csob.cz, penize.cz, finex.cz, financera.cz, wikipedia.org, dlapiper.com. Satisfies the 3+ condition. Primary source: ESTABLISHED — publisher_key csob.cz equals identity_key csob.cz; the §3.3 equality test resolves. No core gap: offering, segment, and positioning are all present and evidenced. 3+ independent sources, a primary, no core gap: high."
---

# Record R-A6-01 — ČSOB (Československá Obchodní Banka)

One deep-dive invocation. Not written for a reader; the document assembled from it is 3-competitive-analysis/2-competitor-cards.md.
