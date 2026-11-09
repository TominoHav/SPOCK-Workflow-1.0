---
run_id: 2026-04-card-disputes
record_id: R-A6-09
artifact_id: A6
item_id: "monzo.com"
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
  - monzo-dispute-help
  - monzo-chargeback-help
  - monzo-safety-features
  - monzo-plans-2026
  - which-monzo-fraud-2024
  - reviews-io-monzo
bounds_hit: []
card:
  identity_key: "monzo.com"
  name: "Monzo"
  type: "direct"
  represents: 
    - "B2"
    - "B4"
  standing: "innovator"
  researched_at: "2026-08-17"
  offering: "UK digital bank offering a full current account managed entirely through the Monzo mobile app. Core product includes Mastercard card payments, in-app dispute initiation from the transaction screen, real-time push notification for every card use, instant in-app card freeze, and in-app case status tracking — all without requiring a phone call, branch visit, or printed form. Dispute handling covers card payments only; bank transfers and direct debits are excluded. Additional features include savings pots, budgeting categories, peer-to-peer transfers, and overdraft facility. Paid subscription plans (Extra, Perks, Max) add travel insurance, phone insurance, and virtual cards. Monzo is FCA/PRA authorised in the UK and holds FSCS deposit protection up to £120,000 per person. It does not hold an EU banking licence and does not serve Czech Republic residents."
  segment: "UK retail banking customers aged 18 and over seeking smartphone-native banking with no branch dependency. Primary audience: individuals who want to manage their entire banking relationship, including fraud response and dispute handling, through a mobile app. Not available to Czech Republic residents. Profiled in this run as a reference point — the documented design originator of the in-app dispute model that Revolut, N26, and ČS George built against — rather than as a direct competitor for the Czech retail card-dispute market."
  features: 
    - name: "In-app dispute initiation from the transaction screen"
      detail: "Customer taps any transaction in the activity feed, scrolls to 'Something wrong? Get help,' selects the heading matching their situation, and taps 'Dispute this transaction.' No form download, branch visit, or phone call is required at any step. Scope is card payments only; transfers and direct debits are not covered by this flow."
      source: "monzo-chargeback-help"
    - name: "Real-time push notification on every card use"
      detail: "Every card transaction — online or in person — triggers an immediate push alert to the customer's device showing the merchant name, location, and amount at the moment of the transaction. Enables instant recognition of an unauthorized charge before a statement is produced."
      source: "monzo-safety-features"
    - name: "In-app card freeze and instant unfreeze"
      detail: "Customer stops all transactions on their Monzo card with a few taps in the app and reverses the freeze with equal ease, without committing to card cancellation or replacement. Designed for suspected unauthorized use or loss — allows immediate suspension while the customer investigates."
      source: "monzo-safety-features"
    - name: "In-app dispute status tracking"
      detail: "Dispute progress is visible in the Help tab and directly on the disputed transaction. Monzo commits to 'always let you know what's happening' throughout the process, including notification before any provisional credit is reversed if a merchant challenge succeeds."
      source: "monzo-dispute-help"
    - name: "Provisional temporary refund during dispute"
      detail: "Where possible, Monzo issues a provisional credit upfront at the point of dispute initiation, before final determination. Not available for every dispute type. The provisional refund becomes permanent if the merchant agrees or does not respond within 8 weeks; it may be reversed if the merchant demonstrates the charge was correct, with advance notice to the customer."
      source: "monzo-dispute-help"
    - name: "Guided in-app question flow for dispute documentation"
      detail: "Monzo collects claim type, supporting documents (receipts, proof of merchant contact), and case details through automated in-app questions. The intake step requires no human agent. The customer submits evidence digitally without posting documents or visiting a branch."
      source: "monzo-chargeback-help"
    - name: "Three opt-in anti-fraud controls for high-value transfers (July 2024)"
      detail: "Known Locations (blocks bank transfers outside designated locations such as home or work), Trusted Contacts (requires a Monzo-using contact to verify via call or video), and Secret QR Codes (requires scanning a code kept on a separate device or printout). Applies to bank transfers and savings withdrawals above daily limits. Customer must enable at least two of three as backup."
      source: "which-monzo-fraud-2024"
    - name: "Call Status Tool for impersonation fraud prevention (September 2023)"
      detail: "In-app feature that verifies in real time whether an incoming call claiming to be from Monzo is genuine. Reported to have identified more than 4,000 fraud attempts in the period since launch through the time of reporting."
      source: "which-monzo-fraud-2024"
  usps: 
    - claim: "Full end-to-end dispute journey with no non-digital step — initiation, status tracking, and outcome notification all accessible through the disputed transaction itself"
      evidence: "Monzo help documentation confirms dispute initiation from the transaction tap, automated guided question collection, status visible in the Help tab and on the transaction, and proactive notification of outcome changes including advance notice before provisional credit reversal. No form download, branch visit, or phone call is required at any step of the process."
      source: "monzo-dispute-help"
    - claim: "Provisional temporary credit offered upfront during the dispute window to protect customer cash flow before final determination"
      evidence: "Monzo commits to issuing a provisional refund 'whenever we can' at the point of dispute initiation, reducing the customer cash-flow impact during the 8-12 week resolution period. Note: under UK FCA Payment Services Regulations 2017, banks must refund unauthorized transaction amounts within one business day in most cases — this may reflect a regulatory obligation rather than solely a product choice. The corresponding EU/Czech obligation under PSD2 is a compliance question for the synthesis to flag."
      source: "monzo-dispute-help"
    - claim: "82% customer satisfaction score in Which? banking survey, third highest among UK banks — independently measured"
      evidence: "Which?, the UK consumer advocacy body, recorded Monzo at 82% customer satisfaction in its banking survey (July 2024 reporting), placing it third overall among UK banks. This is an independently measured score, not a self-reported metric."
      source: "which-monzo-fraud-2024"
    - claim: "Three new anti-fraud controls introduced in July 2024, extending dispute prevention to stolen-phone and impersonation-scam scenarios beyond what the card-dispute channel alone addresses"
      evidence: "Known Locations, Trusted Contacts, and Secret QR Codes launched July 2024 for bank transfers and savings withdrawals. Call Status Tool launched September 2023, with more than 4,000 fraud attempt detections reported through the time of the Which? article. These tools address fraud vectors (stolen phone used for transfers, impersonation by phone) that card-dispute handling cannot resolve after the fact."
      source: "which-monzo-fraud-2024"
  positioning: "Monzo positions itself as the bank that works from your phone — every banking action, including fraud response, dispute initiation, and case tracking, managed through the app without requiring a branch, a printed form, or a telephone call. In the UK retail banking market Monzo is a reference standard for digital dispute handling, cited by Which? as third in customer satisfaction. It is not positioned as a Czech banking competitor; the relevance to this run is as the design originator of the in-app dispute model that ČS George (October 2021), Revolut, and N26 built against."
  pricing_model: "Free current account at £0 per month includes full dispute handling, in-app card freeze, and real-time notifications. Paid subscription plans replaced the retired Plus (£5/month) and Premium (£15/month), both closed to new sign-ups since April 2024: Extra at £3 per month, Perks at £9 per month, Max at £19 per month (three-month minimum commitment, ages 18 to 69 only). Max adds worldwide travel insurance, worldwide phone insurance, and UK and Europe breakdown cover. Virtual cards for payment-data protection are available on paid plans. Dispute handling is included in all tiers at no additional charge; no dispute-specific fees are published separately. FSCS deposit protection applies to all tiers up to £120,000 per person. Prices are denominated in GBP; Monzo does not operate in the Czech Republic and these tariffs are not directly comparable to Czech bank pricing."
  strengths: 
    - claim: "Complete in-app dispute journey without any non-digital step — claim filed, status tracked, outcome notified, all through the disputed transaction"
      source: "monzo-dispute-help"
    - claim: "Real-time push notification on every card use, showing merchant name, location, and amount, enables the fastest possible customer recognition of unauthorized activity"
      source: "monzo-safety-features"
    - claim: "82% customer satisfaction in Which? banking survey, third among UK banks — independently measured at the point of the July 2024 reporting"
      source: "which-monzo-fraud-2024"
    - claim: "Card freeze accessible from the app in a few taps without requiring card replacement or cancellation, reversible with equal ease — enables immediate suspension of a potentially compromised card while the customer investigates"
      source: "monzo-safety-features"
  weaknesses: 
    - claim: "Low independent customer rating: 1.6 out of 5 from 239 reviews on Reviews.io (14% recommendation rate) — recurring themes include delayed dispute processing with reported 7-plus day waiting periods before a case is accepted, provisional refunds reversed after initial approval, and AI-only chat support with no escalation path to a human agent"
      source: "reviews-io-monzo"
    - claim: "Accounts frozen without notice or explanation cited by multiple independent reviewers, with customers unable to access funds for two to four days — undermines the instant-response positioning and is particularly disruptive for customers who have already reported fraud"
      source: "reviews-io-monzo"
    - claim: "Dispute outcome communication described as 'zero communication throughout' in independent customer reviews — the in-app status tracking documented in Monzo's own help pages does not consistently translate to proactive updates in practice"
      source: "reviews-io-monzo"
  sources: 
    - ref: "monzo-dispute-help"
      publisher: "Monzo — 'How the dispute process works,' dispute-process-explainer help page, monzo.com"
      publisher_key: "monzo.com"
      accessed: "2026-08-17"
    - ref: "monzo-chargeback-help"
      publisher: "Monzo — 'Being overcharged / items not arriving,' chargebacks help page, monzo.com"
      publisher_key: "monzo.com"
      accessed: "2026-08-17"
    - ref: "monzo-safety-features"
      publisher: "Monzo — 'Shopping with Monzo: virtual cards and instant notifications,' money-safety learn page, monzo.com"
      publisher_key: "monzo.com"
      accessed: "2026-08-17"
    - ref: "monzo-plans-2026"
      publisher: "Monzo — 'Monzo Plans: Our Take on Packaged Bank Accounts,' plans page, monzo.com"
      publisher_key: "monzo.com"
      accessed: "2026-08-17"
    - ref: "which-monzo-fraud-2024"
      publisher: "Which? — 'Monzo unveils three fraud-fighting tools,' consumer journalism reporting 82% satisfaction score and July 2024 security feature launch, which.co.uk"
      publisher_key: "which.co.uk"
      accessed: "2026-08-17"
    - ref: "reviews-io-monzo"
      publisher: "Reviews.io — Monzo customer reviews, 1.6/5 from 239 reviews (14% recommendation rate), reviews.io"
      publisher_key: "reviews.io"
      accessed: "2026-08-17"
  gaps: 
    - "Unauthorized transaction (fraud) dispute timeline: "Monzo's help pages publish 8-to-12-week timelines for merchant disputes. Timelines specifically for unauthorized transaction reports (where no merchant contest is expected and UK FCA PSRs 2017 may require provisional credit within one business day) are not separately documented. Whether the Czech/EU PSD2 equivalent produces the same obligation is a compliance question, not a Monzo feature. The synthesis should attribute the provisional credit USP to the capability and note the UK regulatory context separately.\""
    - "Proportion of disputes receiving provisional temporary refund: "Monzo states it offers provisional credit 'whenever we can' without publishing criteria or a percentage. Whether this applies to substantially all unauthorized-transaction disputes or to a narrower subset cannot be determined from retrieved sources.\""
    - "Scope of July 2024 anti-fraud controls: "Which? and Monzo documentation indicate Known Locations, Trusted Contacts, and Secret QR Codes apply to bank transfers and savings withdrawals above daily limits. Whether any of these controls extend to card payment authorization is not confirmed in retrieved sources. If the scope is non-card only, these features are adjacent to, not part of, the card dispute flow this run profiles.\""
    - "Dispute volume data: "Monzo does not publish card dispute volume statistics or year-on-year trends. No equivalent to MONETA's 35,000 disputes in 2024 figure exists for Monzo in retrieved sources; comparative volume analysis against Czech ring-1 participants is not possible.\""
  confidence: "high"
  confidence_basis: "Derived by §3.3. Independent sources: 3 distinct publisher_keys — monzo.com, which.co.uk, reviews.io — satisfies the 3+ condition. Primary source: ESTABLISHED — card identity_key monzo.com equals publisher_key monzo.com in the sources list, so §3.3's equality test resolves. No core gap: offering, segment, and positioning are all present and non-empty. Result: 3+ independent sources, a primary, no core gap — high."
---

# Record R-A6-09 — Monzo

One deep-dive invocation. Not written for a reader; the document assembled from it is 3-competitive-analysis/2-competitor-cards.md.
