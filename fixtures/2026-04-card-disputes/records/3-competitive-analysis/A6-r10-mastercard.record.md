---
run_id: 2026-04-card-disputes
record_id: R-A6-10
artifact_id: A6
item_id: "mastercard.com"
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
  - mastercard-b2b-2025
  - mastercard-salesforce-2024
  - mastercard-ethoca
  - ethoca-homepage
  - chargebackgurus-di
  - rivero-mastercard-tools
  - chargebacks911-process
  - chargebacks911-rules
  - paymentsjournal-mastercard
bounds_hit: []
card:
  identity_key: "mastercard.com"
  name: "Mastercard (Ethoca and dispute management platform)"
  type: "adjacent"
  represents: 
    - "T3"
    - "T4"
  standing: "leader"
  researched_at: "2026-08-17"
  offering: "Mastercard operates the global payment network and scheme infrastructure underpinning all Mastercard-branded card transactions. In the card dispute space its offering has three layers: (1) the mandatory scheme framework — chargeback rules, reason codes, process timelines, and compliance monitoring every Mastercard issuer must follow; (2) dispute-lifecycle tooling — the Mastercom platform through which issuers and acquirers manage formal chargebacks from initiation through arbitration; and (3) optional pre-dispute and fraud-deflection products — Ethoca Alerts (pre-chargeback merchant-issuer alert network), Ethoca Consumer Clarity (transaction enrichment for banking apps and call centres), and Decision Intelligence Pro (AI fraud scoring at authorization). Mastercard does not serve retail cardholders directly; issuers build the cardholder experience on top of the scheme rails. Every bank that issues Mastercard cards is already bound by the mandatory layer; the optional products require separate commercial adoption."
  segment: "Payment issuers (card-issuing banks and credit unions), acquirers (merchant-acquiring banks), and merchants. Every bank in scope for this run that issues Mastercard cards — including Česká spořitelna — is already in this segment and bound by mandatory scheme rules. Optional products (Ethoca Alerts, Consumer Clarity, Decision Intelligence Pro) are sold separately; issuer adoption is voluntary and varies across the estate."
  features: 
    - name: "Scheme chargeback filing and timeline framework"
      detail: "Mastercard's rules give cardholders a 120-day filing window from the transaction date, extended to 540 days in specific cases such as subscription services where a merchant ceases operating. Merchant response through second presentment is 45 days for most dispute categories; digital goods and services received a 30-day window following a 2025 rule change. Pre-arbitration is mandatory before arbitration for cardholder dispute (4853) and point-of-interaction error (4834) categories; optional for authorization (4808) and fraud (4837) chargebacks. These timelines are scheme-mandated and cannot be shortened or extended by individual issuers — they are the hard outer constraints for every Mastercard dispute on this map."
      source: "chargebacks911-process"
    - name: "Reason code framework structuring every dispute"
      detail: "Mastercard assigns every card dispute to one of six reason code categories: authorization errors (4808, 4834), no cardholder authorization/fraud (4837, 4849, 4870, 4871), cardholder disputes (4853 — with 11 subcategories), installment billing (4850), and disputes not classified elsewhere (4854, US-only). The reason code determines what evidence is required from the merchant, which process stages are mandatory, and what the issuer must supply to support the chargeback. Codes are scheme-mandated; issuers cannot modify or create their own categories."
      source: "chargebacks911-rules"
    - name: "Mastercom dispute lifecycle management platform"
      detail: "Mastercom is the centralized platform through which all Mastercard issuers and acquirers manage the formal chargeback lifecycle — filing, second presentment, pre-arbitration, and arbitration. Mastercard consolidated its previously fragmented dispute management systems into Mastercom and installed a rules engine to eliminate noise from the ecosystem. It handles automated document exchange, compliance tracking, and pre-chargeback workflows. All Mastercard dispute processing runs through Mastercom or compatible acquirer systems."
      source: "rivero-mastercard-tools"
    - name: "Ethoca Alerts pre-chargeback merchant notification network"
      detail: "Ethoca Alerts connects issuing banks to enrolled merchants so that when a cardholder signals a dispute, the merchant receives a near-real-time notification with a window to refund the purchase and cancel fulfillment before the formal chargeback is filed. The issuer sends the dispute signal; the merchant decides whether to refund. Resolution data: 30-40% chargeback reduction for enrolled merchant portfolios; 80% of eligible disputes from Fiserv issuers resolved in under 24 hours via the Ethoca channel. Worldpay integrated the network for over one million merchants in March 2024. Adoption by issuers and merchants is not mandatory — both parties join the network separately."
      source: "mastercard-ethoca"
    - name: "Ethoca Consumer Clarity transaction enrichment"
      detail: "Consumer Clarity provides recognizable merchant information — trading name, logo, and itemized receipt data — to issuing banks, displaying it in banking apps and call-center tools when a cardholder queries a transaction. By resolving transaction-recognition confusion before the cardholder concludes the charge was fraudulent, it deflects first-party disputes before they enter the formal scheme process. Consumer Clarity is an optional product; issuers choose whether to integrate it into their banking app and call-center tooling."
      source: "ethoca-homepage"
    - name: "Decision Intelligence Pro AI fraud scoring at authorization"
      detail: "Decision Intelligence Pro generates a real-time fraud risk score for every Mastercard transaction at the moment of authorization, analyzing 1 trillion network data points in under 50 milliseconds. Issuers can incorporate the score into their own fraud decisioning — approving low-risk transactions, declining high-risk ones, or routing to step-up authentication. Because the model runs across the full Mastercard network rather than one issuer's portfolio, it surfaces cross-issuer fraud patterns no individual issuer's model can replicate. Published performance: 20% average improvement in fraud detection. Use of the score is the issuer's own choice."
      source: "chargebackgurus-di"
    - name: "Mastercom Collaboration pre-dispute issuer-acquirer information exchange"
      detail: "Mastercom Collaboration enables issuers and acquirers to exchange dispute information and negotiate resolution before filing a formal chargeback. By moving dispute conversation upstream — before the scheme's formal timeline starts — it allows more disputes to be resolved cooperatively, reducing the formal chargeback count and associated fees. This is an optional capability within Mastercom, not required for scheme participation."
      source: "paymentsjournal-mastercard"
    - name: "Third-party CRM integration via Ethoca API"
      detail: "Issuers can connect Ethoca Alerts and Consumer Clarity data to third-party case management and CRM platforms. Mastercard and Salesforce launched a live integration with Salesforce Financial Services Cloud in May 2024, enabling bank dispute agents to manage intake, case tracking, reporting, and prevention from a unified platform with Mastercard dispute intelligence embedded. Available to existing Salesforce FSC customers from the announcement date, without custom Mastercard API development by the issuer."
      source: "mastercard-salesforce-2024"
  usps: 
    - claim: "The only scheme whose mandatory rules set the outer timeline of every Mastercard card dispute — the 120-day cardholder filing window and the 45-day response deadline are scheme rules no issuer can change"
      evidence: "Chargebacks911 confirms the 120-day cardholder filing window, 540-day extended cases, and the 45-day merchant response window as Mastercard scheme requirements. No issuer-level decision changes these limits; they are contractual conditions of network participation. The distinction matters for initiative design: an issuer citing scheme timelines as a reason not to speed up resolution is citing a ceiling, not a floor — scheme rules do not prevent faster internal processing."
      source: "chargebacks911-process"
    - claim: "Ethoca Alerts is the largest pre-chargeback alert network operating within the Mastercard scheme, with published 30-40% chargeback reduction and 80% same-day resolution rates at Fiserv-issuer scale"
      evidence: "Mastercard/Ethoca publishes the 30-40% chargeback reduction figure and the 80% resolution-under-24-hours rate for eligible Fiserv-issuer disputes. Worldpay enrolled over one million merchants in March 2024. These are the only published performance figures for a pre-chargeback alert service in the Mastercard ecosystem, and represent the ceiling for dispute deflection an issuer can access by joining the network."
      source: "mastercard-ethoca"
    - claim: "Decision Intelligence Pro is the only AI fraud score that runs on the full Mastercard network at authorization time, before any issuer-side fraud model runs"
      evidence: "Chargebackgurus, citing Mastercard State of Chargebacks data, reports that Decision Intelligence Pro analyzes 1 trillion data points per transaction in under 50 milliseconds with a 20% average fraud detection improvement. Because the model spans the full network rather than one issuer's portfolio, it surfaces fraud patterns no single issuer's proprietary model can replicate. The structural capability is derived from Mastercard's position as the network operator, not from any feature an issuer can build independently."
      source: "chargebackgurus-di"
    - claim: "Consumer Clarity deflects first-party fraud — the largest single chargeback driver — at the moment of cardholder confusion, before a dispute enters the formal scheme process"
      evidence: "Ethoca describes Consumer Clarity as providing recognizable purchase information to reduce transaction confusion and first-party fraud by displaying merchant data in the issuing bank's app at the point of inquiry. Because first-party fraud (friendly fraud) originates when cardholders fail to recognize a legitimate transaction and report it as fraudulent, placing the correct information in front of the cardholder at that moment stops the dispute before it is filed."
      source: "ethoca-homepage"
  positioning: "Mastercard positions itself as the neutral, universal payment network infrastructure whose rules and intelligence products are the prerequisite for any Mastercard card-based payment service. In the dispute space specifically, Mastercard emphasises moving resolution upstream — before the formal chargeback is filed — through merchant-issuer collaboration (Ethoca Alerts), transaction enrichment (Consumer Clarity), and AI-driven fraud deflection (Decision Intelligence Pro), reducing cost and cycle time for all network participants while maintaining the scheme's mandatory compliance framework as the baseline."
  pricing_model: "Mastercard's issuer-facing scheme fees — network assessment fees, per-dispute processing fees, and optional product fees — are not publicly disclosed and are set by bilateral agreement or confidential scheme tariff. The EU Dispute Administration Fee (DAF) is a scheme-assessed charge applied per chargeback, per second presentment, and per arbitration chargeback in EU markets; the DAF amount is scheme-determined and is not published in publicly available sources. Merchant-facing chargeback fees assessed by acquiring banks under Mastercard scheme guidelines are independently reported at $20-$100 per chargeback by third-party analytics sources, but these fees are acquirer-assessed, not Mastercard-direct. Optional products — Ethoca Alerts, Consumer Clarity, Decision Intelligence Pro — carry pricing negotiated directly with Mastercard; no list prices for any of these products are publicly available. Pricing is not a public market fact for this participant by design: scheme pricing is a confidential commercial relationship, and an unpublished price is the accurate description of the market."
  strengths: 
    - claim: "Ethoca Alerts reduces formal chargebacks by 30-40% for enrolled merchants and resolves 80% of eligible Fiserv-issuer disputes in under 24 hours — the best-evidenced pre-dispute deflection performance in the Mastercard network"
      source: "mastercard-ethoca"
    - claim: "Decision Intelligence Pro delivers a 20% average fraud detection improvement at 50-millisecond latency across 1 trillion data points — a scale and speed no issuer-side fraud model can match at authorization time"
      source: "chargebackgurus-di"
    - claim: "Mastercard-Salesforce FSC integration (live May 2024) gives issuers a ready-made unified dispute management platform with embedded Ethoca data, without requiring custom Mastercard API development"
      source: "mastercard-salesforce-2024"
    - claim: "Mastercard processes 337 million chargebacks annually by 2026 on its network — the scheme handles more dispute volume at a single governance layer than any individual issuer can influence independently"
      source: "mastercard-salesforce-2024"
  weaknesses: 
    - claim: "The scheme's 45-day chargeback cycle is the binding outer limit on resolution speed; no issuer-side digital investment reduces the formal scheme deadline — only faster internal adjudication closes the gap below that ceiling"
      source: "chargebacks911-process"
    - claim: "Ethoca Alerts network effectiveness is entirely dependent on merchant enrollment — unconnected merchants generate no alerts, and coverage is therefore uneven across card portfolios; Czech-specific merchant enrollment is not publicly established"
      source: "rivero-mastercard-tools"
    - claim: "Consumer Clarity and Ethoca Alerts are opt-in products requiring separate commercial agreements and technical integration; an issuer that has not contracted and integrated them derives no benefit from the scheme's pre-dispute deflection capabilities, however long it has been a Mastercard issuer"
      source: "rivero-mastercard-tools"
  sources: 
    - ref: "mastercard-b2b-2025"
      publisher: "Mastercard B2B — b2b.mastercard.com"
      publisher_key: "mastercard.com"
      accessed: "2025"
    - ref: "mastercard-salesforce-2024"
      publisher: "Mastercard Newsroom — newsroom.mastercard.com"
      publisher_key: "mastercard.com"
      accessed: "2026-08-17"
    - ref: "mastercard-ethoca"
      publisher: "Mastercard / Ethoca — ethoca.com (Mastercard subsidiary, acquired 2019)"
      publisher_key: "ethoca.com"
      accessed: "2026-08-17"
    - ref: "ethoca-homepage"
      publisher: "Ethoca — ethoca.com"
      publisher_key: "ethoca.com"
      accessed: "2026-08-17"
    - ref: "chargebackgurus-di"
      publisher: "Chargebackgurus — chargebackgurus.com"
      publisher_key: "chargebackgurus.com"
      accessed: "2026-08-17"
    - ref: "rivero-mastercard-tools"
      publisher: "Rivero — rivero.tech"
      publisher_key: "rivero.tech"
      accessed: "2026-08-17"
    - ref: "chargebacks911-process"
      publisher: "Chargebacks911 — chargebacks911.com"
      publisher_key: "chargebacks911.com"
      accessed: "2026-08-17"
    - ref: "chargebacks911-rules"
      publisher: "Chargebacks911 — chargebacks911.com"
      publisher_key: "chargebacks911.com"
      accessed: "2026-08-17"
    - ref: "paymentsjournal-mastercard"
      publisher: "PaymentsJournal — paymentsjournal.com"
      publisher_key: "paymentsjournal.com"
      accessed: "2026-08-17"
  gaps: 
    - "Czech-market Ethoca enrollment: "Whether Czech Mastercard issuers including Česká spořitelna have adopted Ethoca Alerts and Consumer Clarity is not established from public sources. Mastercard does not publish issuer-level adoption data. This is the most material gap for the initiative: Ethoca enrollment determines whether the pre-dispute deflection channel is already available to ČS or requires a new commercial relationship with Mastercard.\""
    - "Decision Intelligence Pro adoption by Czech issuers: "Whether Czech banks actively incorporate the DI Pro fraud score in their authorization decisioning is not established. The score is generated at scheme level regardless; how issuers weight it is the open question.\""
    - "Mastercard First-Party Trust programme (June 2025): "A Mastercard press release titled 'Scaling efforts to combat friendly fraud — First-Party Trust' appeared in search results with a June 2025 date; the page returned HTTP 403 on fetch and its capabilities could not be established. The programme is noted here as a gap rather than a feature claim.\""
    - "Dispute Administration Fee (EU) amount: "The DAF is scheme-assessed per chargeback, second presentment, and arbitration chargeback in EU markets, but the specific fee amount is not published in publicly available sources.\""
    - "Mastercard issuer scheme pricing: "Assessment fees, per-dispute fees, and optional product pricing are confidential. No list price for any Mastercard dispute product was found in any public source. This is a gap by design — scheme pricing is a commercial relationship.\""
    - "Mastercom API documentation: "Mastercom's integration interface for issuer-side automation (digital dispute initiation systems, status update feeds) was described at product level only; technical API specifications were not available in fetched sources.\""
  confidence: "high"
  confidence_basis: "Derived by §3.3. Independent sources: 6 distinct publisher_keys — mastercard.com (primary), ethoca.com, chargebackgurus.com, rivero.tech, chargebacks911.com, paymentsjournal.com. 6 exceeds the 3+ condition. Primary source established: publisher_key mastercard.com equals identity_key mastercard.com (via mastercard-b2b-2025 and mastercard-salesforce-2024). No core gap: offering, segment and positioning are all present. Result: high. Note on ethoca.com: Ethoca is a wholly-owned Mastercard subsidiary (acquired 2019); ethoca.com is Mastercard-controlled. By §3.3's rule, publisher_key equality and nothing else decides independence, so ethoca.com is counted as distinct from mastercard.com. Even excluding ethoca.com from the count — treating it as the same party — the remaining independent publisher_keys (mastercard.com, chargebackgurus.com, rivero.tech, chargebacks911.com, paymentsjournal.com) still satisfy the 3+ condition with a primary present and no core gap, and the result remains high."
---

# Record R-A6-10 — Mastercard (Ethoca and dispute management platform)

One deep-dive invocation. Not written for a reader; the document assembled from it is 3-competitive-analysis/2-competitor-cards.md.
