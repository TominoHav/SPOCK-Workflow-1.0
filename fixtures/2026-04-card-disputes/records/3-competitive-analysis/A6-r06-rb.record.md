---
run_id: 2026-04-card-disputes
record_id: R-A6-06
artifact_id: A6
item_id: "rb.cz"
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
  - rb-complaints
  - rb-ekonto-smart
  - rb-may2025-app
  - financera-rb-2025
  - finex-rb-2025
  - penize-2banks
bounds_hit: []
card:
  identity_key: "rb.cz"
  name: "Raiffeisenbank CZ"
  type: "direct"
  represents: 
    - "B2"
  standing: "leader"
  researched_at: "2026-08-17"
  offering: "Fifth-largest Czech retail bank (7.74% market share, 1.91 million customers, 125 branches, 157 ATMs), part of Raiffeisen Bank International group. In card dispute handling: customers may file a card dispute via branch visit, customer service phone line (7 a.m.-10 p.m.), email, authenticated in-app chat (eKonto app, post-login), or by downloading and submitting the bank's Word document form ('Reklamace transakce realizované platební kartou'). Immediate card blocking is available 24/7 via a dedicated phone line (+420 412 446 402). Formal dispute SLA: 15 working days for payment services disputes (standard), up to 35 working days for complex cases with mandatory customer notification if the extension applies. No structured digital self-service dispute portal or transaction-level in-app dispute initiation is confirmed."
  segment: "Czech personal retail debit and credit cardholders across banking segments — from basic eKonto Smart (zero monthly fee) to Premium Banking clients. The eKonto mobile app and internet banking are the primary digital channels; digital penetration is growing. Business cardholder dispute handling is in scope for the bank but is not separately profiled in this card."
  features: 
    - name: "24/7 dedicated card blocking line"
      detail: "Customers call +420 412 446 402 at any hour to immediately block a compromised, lost, or stolen card — no app login, branch visit, or business hours required. Operates separately from the standard customer service line and is the fastest route to stopping unauthorized card use."
      source: "rb-complaints"
    - name: "In-app authenticated chat for transaction dispute notification"
      detail: "After logging into the eKonto mobile app, customers can send text messages to bank employees who can receive reports about specific transactions. The chat is restricted to authenticated (logged-in) users, making it a digital alternative to calling during the 7 a.m.-10 p.m. service window — but it is a conversational channel, not a self-service structured intake form."
      source: "rb-complaints"
    - name: "Downloadable card transaction dispute form"
      detail: "The 'Reklamace transakce realizované platební kartou' Word document (.doc) is available on rb.cz. Customers complete the form and submit it at a branch or by email — it is the structured document the bank uses to formally record and process a chargeback claim, making it the entry point to the bank's dispute workflow."
      source: "rb-complaints"
    - name: "Email dispute submission"
      detail: "Customers can send their completed dispute form and supporting documentation to info@rb.cz, enabling dispute filing without a branch visit at any time. The email reaches the bank's complaints department directly (Raiffeisenbank, a.s., Reklamace, Olomouc)."
      source: "rb-complaints"
    - name: "Transaction history with advanced filter"
      detail: "The eKonto mobile app (improved May 2025) allows filtering the transaction list by payment direction, time period, amount, payment type, and category — enabling customers to identify and locate a disputed transaction before contacting the bank to file."
      source: "rb-may2025-app"
    - name: "Self-service card blocking and activation in digital banking"
      detail: "Customers can block or activate their debit or credit card directly within internet banking and the eKonto mobile app — a self-service security action for suspected card fraud that does not require calling the bank."
      source: "rb-ekonto-smart"
    - name: "Dispute resolution SLA with mandatory escalation notification"
      detail: "The bank commits to a 15 working day response for payment services disputes. If the standard timeline cannot be met, it must notify the customer of the reason and provide a final resolution within 35 working days — a legal obligation to communicate any delay rather than leaving the customer without information."
      source: "rb-complaints"
    - name: "Multi-channel complaint submission"
      detail: "Card disputes can be filed via five distinct paths: branch visit (125 branches), customer service phone line (7 a.m.-10 p.m.), email, in-app chat, and downloadable form. No single channel is the required route — customers choose based on availability and preference."
      source: "rb-complaints"
  usps: 
    - claim: "Authenticated in-app chat removes phone-queue wait for dispute notification"
      evidence: "The eKonto app chat operates after login, enabling customers to message bank employees during bank hours about specific transactions — confirmed on the rb.cz complaints page and noted in independent reviews citing a 'Communication centre' within the app (finex.cz). For customers who prefer text to phone, this eliminates hold-time friction during the 7 a.m.-10 p.m. service window. Scope is limited: the chat is a communication tool and does not initiate a structured dispute workflow or issue a case reference."
      source: "rb-complaints"
    - claim: "24/7 card blocking without app dependency or branch access"
      evidence: "A dedicated card emergency line (+420 412 446 402) is listed on rb.cz/en/about-us/contacts/reklamace as operating 24 hours, 7 days a week. Customers who discover unauthorized card use outside banking hours can block the card immediately without requiring internet access, a bank app, or a branch visit. The 24/7 blocking line is independent of the standard customer service line."
      source: "rb-complaints"
    - claim: "Five distinct dispute submission paths reduce access barriers for different customer situations"
      evidence: "rb.cz/en/about-us/contacts/reklamace lists branch, phone, email, in-app chat, and downloadable form. The bank's own public statement that 'several easy and quick ways to file complaints' exist is corroborated by this actual channel list. Customers without easy branch access (rural locations, non-standard hours) have multiple alternatives. Framing is access rather than digital self-service — the emphasis is on channel count, not structured digital workflows."
      source: "rb-complaints"
  positioning: "Raiffeisenbank CZ frames its complaint handling as accessible and multi-channel, emphasizing that several routes to filing exist rather than promoting digital self-service or case transparency. No specific public claim about digital-first dispute handling, case status visibility, or resolution speed as a competitive differentiator has been identified in retrieved material."
  pricing_model: "No fee for filing or processing a card dispute. Account maintenance: eKonto Smart (CHYTRÝ účet) carries no monthly maintenance fee and includes a free Visa Classic debit card and free ATM withdrawals worldwide; the Active Account tier carries 49 CZK per month. February 2025 fee changes increased cash deposit fees to 49 CZK per additional monthly deposit (up from 29 CZK) and cash withdrawal fees to 150 CZK (up from 120 CZK). Card-dispute-specific fee lines are not separately enumerated in publicly accessible pages; the full price schedule is published as PDFs at rb.cz/attachments/ceniky/price-list-pi-1.pdf and price-list-pi-2.pdf, which returned binary content in this research and could not be read."
  strengths: 
    - claim: "eKonto mobile app provides modern digital banking — biometric authentication, transaction history, and self-service card management — independently rated competitively among Czech banking apps"
      source: "finex-rb-2025"
    - claim: "Formal 15 working day dispute SLA for payment services with legally mandated escalation notification if the standard timeline cannot be met — a documented and enforceable commitment"
      source: "rb-complaints"
    - claim: "Fifth-largest Czech bank with 125 branches and 157 ATMs, providing dispute submission access across most Czech cities and regions for customers who prefer in-person filing"
      source: "finex-rb-2025"
    - claim: "Active app investment demonstrated by May 2025 improvements — enhanced transaction history filter, cash withdrawal scheduling, savings goals — indicates ongoing digital capability development"
      source: "rb-may2025-app"
  weaknesses: 
    - claim: "No structured self-service digital dispute initiation — the formal card dispute process requires completing and submitting a Word document form; Raiffeisenbank is not among the two Czech banks confirmed as enabling transaction-level in-app dispute filing"
      source: "penize-2banks"
    - claim: "No digital dispute status tracking — once a dispute is filed, no self-service channel to check case progress is identified; the only route to a status update is to contact the bank again through the same channels used to file"
      source: "financera-rb-2025"
    - claim: "Public website chat reported as providing 'no responses' by independent reviewers — the publicly accessible digital communication channel does not reliably function as a dispute intake, and the in-app authenticated chat has not been independently confirmed as a formal dispute channel"
      source: "financera-rb-2025"
  sources: 
    - ref: "rb-complaints"
      publisher: "Raiffeisenbank CZ — 'Complaints — Raiffeisenbank,' official contact channels and complaint options page, rb.cz/en/about-us/contacts/reklamace"
      publisher_key: "rb.cz"
      accessed: "2026-08-17"
    - ref: "rb-ekonto-smart"
      publisher: "Raiffeisenbank CZ — 'Personal account CHYTRÝ účet (eKonto Smart),' product page, rb.cz/en/personal/accounts-and-banking/ekonto-smart"
      publisher_key: "rb.cz"
      accessed: "2026-08-17"
    - ref: "rb-may2025-app"
      publisher: "Raiffeisenbank CZ — 'Mobilní aplikace Raiffeisenbank přináší další vylepšení,' press release 30 May 2025, rb.cz/informacni-servis/pro-media/tiskove-zpravy/tiskove-zpravy-2025/tiskove-zpravy-202505/30052025-mobilni-bankovnictvi"
      publisher_key: "rb.cz"
      accessed: "2026-08-17"
    - ref: "financera-rb-2025"
      publisher: "Financera.cz — 'Raiffeisenbank recenze 2025 — Opravdu se vyplatí?' independent bank review, financera.cz/recenze/raiffeisenbank/"
      publisher_key: "financera.cz"
      accessed: "2026-08-17"
    - ref: "finex-rb-2025"
      publisher: "Finex.cz — 'Raiffeisenbank — Recenze a přehled produktů,' independent Czech banking review, finex.cz/banka/raiffeisenbank/"
      publisher_key: "finex.cz"
      accessed: "2026-08-17"
    - ref: "penize-2banks"
      publisher: "Peníze.cz — 'Jak reklamovat platbu kartou? Jen dvě banky vám to maximálně usnadní,' Czech retail bank card dispute comparison establishing the two banks with transaction-level in-app initiation, penize.cz"
      publisher_key: "penize.cz"
      accessed: "2026-08-17"
  gaps: 
    - "Whether the in-app chat enables formal dispute initiation with a case reference or is communication-only: "the bank employee interaction in chat could either create a formal complaint record in the bank's system or be advisory without opening a case. The official complaints page does not list chat as a formal channel; the formal process references branch visit or the downloadable form. This is the single most material gap for assessing the actual reach of RB's digital dispute capability — if chat reliably creates a formal record, B2 is more substantive than the current evidence establishes.\""
    - "Whether Raiffeisenbank CZ has integrated Mastercard Ethoca Alerts for pre-chargeback dispute deflection: "Czech bank Ethoca adoption is a gap identified at landscape stage for all ring-1 participants and remains unestablished for rb.cz specifically.\""
    - "Actual dispute resolution times: "the 15 working day standard SLA and 35 working day maximum are confirmed from published complaint rules. Whether these targets are met and what the median resolution time for card disputes is are not published in accessible material.\""
    - "Full card-specific fee schedule: "rb.cz price list PDFs (PI-1-2026-05-01, PI-2-2026-05-01) are publicly available but returned binary content during this research and could not be read. Card-dispute-related fee lines, if any, could not be confirmed.\""
  confidence: "high"
  confidence_basis: "Derived by §3.3. Independent publisher_keys: rb.cz (rb-complaints, rb-ekonto-smart, rb-may2025-app), financera.cz (financera-rb-2025), finex.cz (finex-rb-2025), penize.cz (penize-2banks) — 4 distinct publisher_keys, satisfying the 3+ condition. Primary source: ESTABLISHED — publisher_key rb.cz matches identity_key rb.cz; the §3.3 equality test resolves. No core gap: offering, segment, and positioning are all present. 3+ independent sources, a primary, no core gap: high."
---

# Record R-A6-06 — Raiffeisenbank CZ

One deep-dive invocation. Not written for a reader; the document assembled from it is 3-competitive-analysis/2-competitor-cards.md.
