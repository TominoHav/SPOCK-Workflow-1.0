---
run_id: 2026-07-standing-orders
record_id: R-A5-01
artifact_id: A5
item_id: ""
produced_at: 2026-08-24
bounds_hit: [web_searches_8_of_8]
trace_id: []
sources: [A1, A4]
external_sources:
  - S-moneta-smart-banka
  - S-kb-standard
  - S-natwest-subscription
  - S-tapix-subscription
  - S-revolut-wikipedia
  - S-bunq-wikipedia
  - S-kb-wikipedia
  - S-csob-wikipedia
  - S-mastercard-subscription-rules
  - S-nrf-psd3
  - S-lloyds-subscription-article
  - S-ulsterbank-subscription
# `produced_by` is NOT here. It belongs on the output only (artifact-fields.yaml §6.0).
topic: "Recurring commitment management for retail banking clients: standing orders, direct debit mandates, and card-on-file subscriptions"
scope_field: "Recurring commitment management for retail bank clients, covering standing orders, direct debit mandates, and card-on-file subscriptions. Czech retail banking as the primary competitive set, with European neobanks as comparators. Ceska sporitelna itself is not mapped as a participant."
trends:
  - id: B1
    class: business
    name: "Consumer demand for unified subscription management in banking apps"
    impact: high
    horizon: short
    lifecycle: growing
    description: "77% of consumers want to view and manage subscriptions in their banking app, and 39% would switch banks for this feature. Lloyds Bank cited 2.2 million customers who added new subscriptions during the COVID-19 lockdown, and Minna Technologies was brought in to meet the demand. The expectation that a banking app is the place to see and stop any recurring commitment is now stated consumer preference, not a marginal request."
    evidence: "S-lloyds-subscription-article"
    implication: "Directly addresses H1. The market has already established that clients want a unified view. Banks that do not offer it are losing a stated preference race, and the 39% switching intent converts to real client loss when neobanks make it easy."
  - id: B2
    class: business
    name: "Recurring payment chargebacks as a quantified cost of missing in-app subscription controls"
    impact: medium
    horizon: short
    lifecycle: mature
    description: "60% of Mastercard network chargebacks involve recurring payments. 76% of those chargebacks are disputed as unauthorised. 21% of US consumers have filed a chargeback specifically to cancel a recurring transaction, and 38% filed or threatened chargebacks because of unwanted subscription billing. Subscribers underestimate their monthly subscription spending by 2.5 times actual spend. These figures measure the client population that turned to chargebacks because no simpler cancellation path was available."
    evidence: "S-mastercard-subscription-rules"
    implication: "Bears on H2. The chargeback data quantifies what happens when clients cannot cancel card-on-file subscriptions cleanly: they use dispute mechanisms instead, at cost to the bank. The problem H2 names is not only a client experience problem; it is a bank operations cost."
  - id: B3
    class: business
    name: "European neobanks using financial control features as a competitive differentiator"
    impact: high
    horizon: medium
    lifecycle: growing
    description: "Revolut reached 68.3 million retail customers at year-end 2025, with revenue of GBP 4,515.8 million. Monzo relaunched its premium tier structure in 2024, and N26 competes on feature breadth across Europe. The features these banks lead with are not higher interest rates or lower fees; they are app capabilities that incumbents do not have, including recurring payment management. Bunq operates across 30 European countries with 14.5 million customers, licensing and expanding while incumbents have not built comparable app capability."
    evidence: "S-revolut-wikipedia, S-bunq-wikipedia"
    implication: "Bears on H1, H2, and H4. The neobank competitive gain is not from a single feature. It is from the cumulative experience gap across all three commitment types. A Czech retail client who can manage all recurring commitments end to end in Revolut has no equivalent capability in any Ring 1 Czech bank confirmed from public material."
  - id: T1
    class: technology
    name: "Pattern-based subscription detection across all payment channels without relying on card scheme data"
    impact: medium
    horizon: short
    lifecycle: mature
    description: "Tapix by Dateio identifies subscriptions, direct debits, standing orders, and pattern-based charges across all payment channels using pattern detection on transaction histories rather than on Mastercard or Visa data fields. Their database holds 60 billion enriched transactions across 25 categories with 520 tags, and their stated error rate is 1 per 6 million transactions. The technology is deployed in production at Revolut, bunq, Erste, OTP Bank, Raiffeisen Bank, and Societe Generale among others."
    evidence: "S-tapix-subscription"
    implication: "Directly enables H1. The technology to identify all three commitment types in a single transaction stream and surface them in one view exists and is in production at major European banks including Erste, which is Ceska sporitelna's own parent group. The question for this initiative is not whether the technology exists."
  - id: T2
    class: technology
    name: "In-app merchant-level recurring payment blocking without full card cancellation"
    impact: high
    horizon: short
    lifecycle: growing
    description: "Revolut allows customers to block recurring payments to a specific merchant from within the app without going to the merchant's website and without blocking the whole card. Lloyds Bank, through its partnership with Minna Technologies and Visa, lets customers view, manage, and cancel debit card subscriptions in-app with real-time push notifications about price changes. NatWest allows customers to cancel for the majority of merchants directly from the mobile app. All three are in production. No Czech Ring 1 bank has confirmed this capability from public material."
    evidence: "S-lloyds-subscription-article, S-natwest-subscription"
    implication: "Directly addresses H2. The technology to stop a card-on-file subscription from the bank's side, without blocking the whole card, is in production at Ring 3 banks. This capability is not the same as telling the client to go to the merchant. It is the bank acting on behalf of the client."
  - id: T3
    class: technology
    name: "Per-merchant virtual card numbers for subscription isolation"
    impact: low
    horizon: medium
    lifecycle: growing
    description: "Virtual card numbers can be generated per merchant, allowing the card associated with a specific subscription to be frozen without affecting other payments. Some neobanks including bunq support multiple virtual cards and multiple IBANs. This approach isolates subscription payments at the card level rather than at the merchant blocking layer T2 describes."
    evidence: "S-bunq-wikipedia"
    implication: "An alternative approach to H2. Merchant-level virtual card isolation would let a client stop a card-on-file subscription by freezing that card number only. It is a different technical path to the same consumer outcome. T2 (direct in-app merchant blocking) is more widely deployed and does not require the client to have set up separate cards per subscription."
  - id: R1
    class: regulatory
    name: "PSD3 and PSR provisional agreement aligning merchant-initiated transaction protections with direct debit rules"
    impact: high
    horizon: medium
    lifecycle: growing
    instrument: "PSD3 (Directive on payment services in the internal market) and PSR (Regulation on payment services), provisional political agreement of the European Parliament and Council, 27 November 2025"
    effective: "Expected Official Journal publication H1 2026. Entry into force 2027. Member states have 18 months from entry into force to transpose PSD3; PSR applies 18 months after entry into force. Payee verification obligation applies 24 months after entry into force."
    description: "On 27 November 2025, the European Parliament and Council reached a provisional political agreement on PSD3 and the accompanying PSR. Norton Rose Fulbright (March 2026) notes that merchant-initiated transactions under the new framework require strong customer authentication at mandate setup only, and that MITs are aligned with direct debit consumer protection measures, including refund rights. No participant on this map has published a PSD3-specific compliance roadmap."
    evidence: "S-nrf-psd3"
    implication: "Bears on H2 and H4. PSD3 explicitly aligns the consumer protections for card-on-file merchant-initiated transactions with those for direct debits, including refund rights. This removes the regulatory justification for treating the two commitment types differently. The initiative that addresses H4 before PSD3 comes into force will have solved the problem voluntarily; the initiative that waits will be required to solve it by 2027-2028."
  - id: R2
    class: regulatory
    name: "Card scheme subscription rules requiring merchant-level transparency and online cancellation pathways"
    impact: medium
    horizon: short
    lifecycle: mature
    instrument: "Mastercard Network Rules updated March 2022 and September 2022; Visa Subscription Management Requirements (ongoing)"
    effective: "Mastercard first batch in force March 2022; second batch in force October 2022. Visa requirements ongoing."
    description: "Mastercard introduced two rounds of subscription rule updates in 2022. Merchants must send confirmation emails at enrollment, issue payment receipts with cancellation instructions after each billing, send pre-billing reminders for plans billing less frequently than every 180 days, and provide online cancellation methods with the same prominence as signup. Tapix states their service addresses Visa subscription-management mandate requirements. These rules apply to merchants, not to banks."
    evidence: "S-mastercard-subscription-rules, S-tapix-subscription"
    implication: "Bears on H2. Card scheme rules have created a mandatory merchant-side cancellation pathway since October 2022. Banks are not covered by these rules and are not required to offer in-app cancellation. The rules shift some burden to merchants but leave the bank-side capability gap H2 names entirely unaddressed. The option for a bank to act as an intermediary, blocking recurring payments on the client's behalf, is not mandated and remains a product decision."
  - id: R3
    class: regulatory
    name: "Asymmetric consumer protection framework between card-on-file subscriptions and SEPA direct debits under PSD2"
    impact: medium
    horizon: short
    lifecycle: mature
    instrument: "Directive (EU) 2015/2366 (PSD2) and its delegated regulation on SCA; SEPA Core Direct Debit Rulebook (EPC016-06), European Payments Council"
    effective: "PSD2 fully applied across EEA from December 2020. SEPA SDD operational from 2009. The asymmetry is being addressed by PSD3, expected entry into force 2027."
    description: "Norton Rose Fulbright (March 2026) notes that PSD3 aligns merchant-initiated transaction protections with direct debit consumer protection, including refund rights. The phrase 'aligns with' confirms that before PSD3, card-on-file MITs did not carry equivalent consumer protections to SEPA direct debits. SEPA SDD gives consumers the right to revoke a mandate and banks must act on revocation; no equivalent mandate revocation right exists for card-on-file subscriptions under the card scheme framework."
    evidence: "S-nrf-psd3"
    implication: "The structural root of H4. The experience differs by commitment type because the law treats them differently. A standing order is the client's own bank instruction, revocable immediately. A direct debit runs under a SEPA mandate with defined revocation rights. A card-on-file subscription is a card scheme arrangement with no equivalent bank-side cancellation right. The bank cannot offer a consistent experience because the regulatory frameworks behind each type are different. H4 will persist until PSD3 addresses the MITs gap, and even then the implementation gap will remain if the bank does not build."
participants:
  - identity_key: csob.cz
    name: "CSOB (Ceskoslovenska obchodni banka)"
    type: direct
    first_seen: 2026-08-24
    represents: [R3]
    standing: leader
    deep_dive: true
    reason: "Largest Czech bank by assets with 4.34 million clients (2022). Primary Ring 1 direct comparator. Public sources confirm standing order and direct debit management services. No in-app card-on-file subscription management confirmed from public material. Website pages relevant to digital subscription management were not accessible during this research or the prior instant-payment-disputes run (HTTP 500 both times). Selected for deep dive because it is the baseline the initiative compares itself against."
  - identity_key: kb.cz
    name: "Komercni banka"
    type: direct
    first_seen: 2026-08-24
    represents: []
    standing: leader
    deep_dive: true
    reason: "Second-largest Czech bank by retail clients (1.6 million customers), subsidiary of Societe Generale with total assets of CZK 1,536 billion (2024). Public sources confirm management of standing payment orders, automatic transfers, and direct debit mandates. No specific in-app card-on-file subscription management confirmed. Selected for deep dive to complete Ring 1 incumbent coverage alongside CSOB."
  - identity_key: airbank.cz
    name: "Air Bank"
    type: direct
    first_seen: 2026-08-24
    represents: [T1]
    standing: innovator
    deep_dive: true
    reason: "The most digitally-forward Czech retail bank by app experience, known for introducing novel in-app features ahead of other Czech banks. Selected as Ring 1 innovator for T1: if any Czech bank has deployed unified recurring payment detection or in-app subscription management, Air Bank is the most likely candidate. The reused card (run 2026-06-instant-payment-disputes, 2026-08-22) confirms Air Bank's Czech website is accessible and the bank has in-app digital features. That card covers instant payment recall, not subscription management. No specific subscription management feature confirmed."
  - identity_key: moneta.cz
    name: "MONETA Money Bank"
    type: direct
    first_seen: 2026-08-24
    represents: []
    standing: leader
    deep_dive: true
    reason: "Major Czech retail bank. Their Smart Banka app confirms: users can set up, change, or cancel standing orders and direct debits directly in the app. The app is described as having over 200 functions and 41 products available fully online. No card-on-file subscription management mentioned in their published English material. Selected for deep dive as the Czech bank with the most explicit public confirmation of digital standing order and direct debit management."
  - identity_key: rb.cz
    name: "Raiffeisenbank CZ"
    type: direct
    first_seen: 2026-08-24
    represents: []
    standing: leader
    deep_dive: false
    reason: "Mapped, not selected for deep dive. Major Czech retail bank, subsidiary of Raiffeisen Bank International. No specific recurring payment management features confirmed from public material in this research. Included for Ring 1 coverage breadth. The Ring 1 deep dive thesis is covered by CSOB, KB, MONETA and Air Bank."
  - identity_key: mbank.cz
    name: "mBank CZ"
    type: direct
    first_seen: 2026-08-24
    represents: [B3]
    standing: innovator
    deep_dive: false
    reason: "Mapped, not selected for deep dive. Czech subsidiary of Polish mBank, known for digital-first retail banking. The Czech payment management page returned HTTP 404 during this research. Included as Ring 1 digital innovator representing B3 (neobank-style digital competition within Czech retail banking). Air Bank covers the innovator hypothesis for Ring 1 deep dive."
  - identity_key: revolut.com
    name: "Revolut"
    type: direct
    first_seen: 2026-08-24
    represents: [B3, T2, R1]
    standing: innovator
    deep_dive: true
    reason: "European-headquartered neobank with 68.3 million retail customers at year-end 2025, revenue GBP 4,515.8 million. Confirmed to have launched a Subscriptions feature that tracks direct debits and recurring card payments in one place, allows blocking of payments per merchant from within the app without going to the merchant's site, and sends notifications before scheduled payments. Uses Tapix for subscription intelligence. Under UK PSR mandatory reimbursement requirements (R1 predecessor). Selected as the primary Ring 3 neobank innovator that most directly addresses all three primary problems."
  - identity_key: monzo.com
    name: "Monzo"
    type: direct
    first_seen: 2026-08-24
    represents: [B3, R1]
    standing: innovator
    deep_dive: true
    reason: "UK neobank. Relaunched premium tier structure (Extra, Perks, Max) in 2024. Under PSR mandatory reimbursement requirements. Selected as Ring 3 neobank innovator benchmarking alongside Revolut. Specific subscription management features for third-party subscriptions were not confirmed from fetched pages in this research round or from the reused card (which covers undo payments and APP fraud reimbursement)."
  - identity_key: n26.com
    name: "N26"
    type: direct
    first_seen: 2026-08-24
    represents: [B3]
    standing: innovator
    deep_dive: true
    reason: "German neobank operating across Europe. Confirmed to offer account subscription management for its own banking tiers. Search results indicate N26 does not offer third-party subscription management of the type Revolut confirmed. Selected as Ring 3 European neobank for coverage of the German-headquartered neobank competing for European retail clients in the same geography as Czech neobank users."
  - identity_key: bunq.com
    name: "Bunq"
    type: direct
    first_seen: 2026-08-24
    represents: [T3]
    standing: innovator
    deep_dive: false
    reason: "Mapped, not selected for deep dive. Dutch neobank licensed across 30 European countries, 14.5 million customers worldwide (2023), user deposits EUR 4.5 billion (early 2024). Uses Tapix for subscription intelligence. Offers multiple IBANs and multiple virtual cards, representing the T3 (per-merchant virtual card) approach. No specific subscription management features for third-party subscriptions confirmed from public material. Revolut covers the neobank innovator deep dive for T2 and B3."
  - identity_key: lloydsbank.com
    name: "Lloyds Bank"
    type: direct
    first_seen: 2026-08-24
    represents: [B1, T2, R2]
    standing: leader
    deep_dive: true
    reason: "UK retail bank with 16 million online customers and 12 million mobile app users. Confirmed to have launched subscription management in partnership with Minna Technologies and Visa in July 2020, enabling in-app view, management, and cancellation of debit card subscriptions with real-time push notifications about price changes. Their digital service director confirmed at launch that direct debits and standing orders were already manageable online; the new feature addressed card subscriptions as a separate category. Selected as the Ring 3 banking leader that has implemented the unified three-type view the initiative requires."
  - identity_key: natwest.com
    name: "NatWest"
    type: direct
    first_seen: 2026-08-24
    represents: [B1, R1]
    standing: leader
    deep_dive: true
    reason: "UK retail bank. Confirmed to display subscriptions (recurring card payments) in the mobile app for the past 12 months. Users can cancel for the majority of merchants from within the app. The app explicitly distinguishes subscriptions (varying recurring card payments) from direct debits and standing orders. The published explanation notes that stopping a payment does not end the contract. Selected as Ring 3 banking leader for their confirmed three-way distinction between commitment types in the app."
  - identity_key: tapix.io
    name: "Tapix by Dateio"
    type: adjacent
    first_seen: 2026-08-24
    represents: [B1, T1, R2]
    standing: innovator
    deep_dive: true
    reason: "B2B subscription intelligence provider for banks. In-production at Revolut, bunq, Erste, OTP Bank, Raiffeisen Bank, Societe Generale, Soldo, and National Bank of Greece among others. Identifies subscriptions, direct debits, standing orders, and pattern-based charges using pattern detection, not card scheme data fields, giving it coverage across all three commitment types. Database of 60 billion enriched transactions, 25 categories, 520 tags, error rate of 1 per 6 million. States it addresses Visa subscription-management mandate requirements. Selected as adjacent innovator because their client list shows which European incumbents have already adopted unified subscription detection, including Erste, Ceska sporitelna's parent group."
  - identity_key: minna.tech
    name: "Minna Technologies"
    type: adjacent
    first_seen: 2026-08-24
    represents: [T2]
    standing: innovator
    deep_dive: false
    reason: "Mapped, not selected for deep dive. Swedish fintech that delivered the Lloyds Bank subscription management feature in partnership with Visa in 2020. Provides the in-app cancellation capability (T2) to a banking incumbent. The Lloyds Bank deep dive covers the consumer-facing output of their technology."
  - identity_key: substitute:contact-centre-call
    name: "Calling the bank to manage recurring commitments"
    type: substitute
    first_seen: 2026-08-24
    represents: [B2, R3]
    standing: leader
    deep_dive: true
    reason: "The current path a retail client follows to change or cancel any recurring commitment, documented in this run's problem material. A standing order change can be made on a short call. A direct debit mandate change requires more steps. A card-on-file subscription cannot be stopped from the bank's side at all. Selected for deep dive because this is what the initiative replaces, and the differentiated outcome by commitment type within this single channel is the evidence base for H4."
  - identity_key: substitute:manual-merchant-cancellation
    name: "Cancelling subscriptions directly at the merchant"
    type: substitute
    first_seen: 2026-08-24
    represents: [B2, R2]
    standing: leader
    deep_dive: false
    reason: "Mapped, not selected for deep dive. When the bank cannot act on a card-on-file subscription, the client goes to the merchant's website or app. Mastercard and Visa scheme rules since 2022 require merchants to provide online cancellation pathways with the same prominence as sign-up. Not deep-diving because the limitation is documented: merchants do not always comply, and this path fails when the merchant is unresponsive, unreachable, or based outside the EU."
  - identity_key: substitute:card-block
    name: "Blocking the card to stop card-on-file subscriptions"
    type: substitute
    first_seen: 2026-08-24
    represents: [B2, R3]
    standing: leader
    deep_dive: false
    reason: "Mapped, not selected for deep dive. The only bank-side mechanism confirmed for stopping a card-on-file subscription: blocking the entire physical or virtual card, which cancels every other card payment. Not a viable alternative for clients with other active card payments. Included because it is what the bank currently offers for H2, making the asymmetry with standing order and direct debit cancellation visible."
reused: []
unprofiled: []
unrepresented_trends: []
---

# Record R-A5-01 - A5

One landscape-mapping invocation. Not written for a reader; the document assembled from it is 3-competitive-analysis/1-landscape-map.md.

**Failed page fetches this research round:** revolut.com/news (HTTP 403), lloydsbank.com subscription page (HTTP error page), mastercard.com/europe subscription management (HTTP 403), paymentexpert.com/psd3 (HTTP 403), help.revolut.com/subscriptions (HTTP 403), airbank.cz/en/ (HTTP 404), mbank.cz/osobni-finance/moje-platby/ (HTTP 404). These pages were attempted and not retrieved; participants with unconfirmed detail are noted in their deep_dive reason field.

**Search iterations used:** 8 of 8 (bound reached).
