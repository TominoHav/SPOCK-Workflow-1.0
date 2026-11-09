---
run_id: 2026-07-standing-orders
artifact_id: A5
ost_role: none
status: accepted
workflow: competitive-analysis
modified_by: agent
revisions: 1
could_not_verify:
  - rule: "authored only from the quarantine bridge's structured extract, never from raw external text"
    needs: judge
    reach: process
standards_basis: "Competitive Analysis Standards v0.13, 23 August 2026, §6 self-assessed as met"
egress_basis: pilot-test
produced_by:
  agent: competitive-analysis
  skill: landscape-mapping
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
assembled_at: 2026-08-24
assembled_from: [R-A5-01]
---

# Competitive Analysis | Landscape map: Recurring commitment management

Czech retail banks offer digital control over standing orders and direct debits but none of the Ring 1 banks examined from public material offers in-app management of card-on-file subscriptions. European neobanks -- Revolut with 68.3 million users chief among them -- have made unified recurring payment management a competitive differentiator, and the underlying subscription detection technology is already deployed at Erste, Ceska sporitelna's parent group. Three regulatory threads converge on this space at the same time: PSD3 will bring card-on-file merchant-initiated transaction protections in line with direct debit rules from 2027-2028, Mastercard and Visa have required merchant-side cancellation pathways since October 2022, and chargeback data quantifies what it costs the bank when none of these tools reach the client. [rec:R-A5-01]

## The market we looked at

The scope for this research is recurring commitment management for retail banking clients: the ability to see, change, and stop standing orders, direct debit mandates, and card-on-file subscriptions from within a bank product. The primary competitive set is Czech retail banking. European neobanks are comparators rather than direct competitors in the Czech market, included because they are the market where the capability gap is widest and best documented.

Ceska sporitelna is not mapped as a participant. The run exists to inform what the initiative must match or exceed, not to benchmark the client against itself.

Participants were assigned to three rings:

Ring 1 covers Czech retail banking incumbents and digital challengers: CSOB, Komercni banka, Air Bank, MONETA Money Bank, Raiffeisenbank CZ, and mBank CZ.

Ring 2 is empty for this scope. There are no Czech-market adjacents (aggregators, PFM platforms, or open-banking providers) with confirmed market presence that sit between Ring 1 and the B2B technology providers in Ring 3.

Ring 3 covers European neobanks and B2B technology providers whose features or products define what the state of the art is: Revolut, Monzo, N26, Bunq, Lloyds Bank, NatWest, Tapix by Dateio, and Minna Technologies.

Three substitute paths are mapped because they are what a retail client does today when the bank cannot help: calling the bank, going to the merchant's website to cancel, or blocking the entire card.

## Where the market is moving

Nine trends were identified: three business, three technology, and three regulatory. All nine have at least one participant in this map as a representative.

**Business trends**

B1 -- Consumer demand for unified subscription management in banking apps. 77% of consumers want to see and manage their subscriptions inside their banking app; 39% say they would switch banks for this feature. Lloyds Bank documented 2.2 million customers who added new subscriptions during the COVID-19 lockdown period and brought in Minna Technologies to meet the resulting demand. This is now stated consumer preference, not a marginal use case. High impact, short horizon, growing.

B2 -- Recurring payment chargebacks as a quantified cost of missing in-app controls. 60% of Mastercard network chargebacks involve recurring payments, and 76% of those chargebacks are disputed as unauthorised. 21% of US consumers have filed a chargeback specifically to cancel a recurring transaction, and 38% did so or threatened to because of unwanted subscription billing. Subscribers underestimate their monthly subscription spend by 2.5 times actual spend. These figures measure the population that turned to disputes because no simpler cancellation path was available through their bank. Medium impact, short horizon, mature.

B3 -- European neobanks using financial control features as a competitive differentiator. Revolut reached 68.3 million retail customers at year-end 2025, with revenue of GBP 4,515.8 million. Bunq operates across 30 European countries with 14.5 million customers and expanding. The features these banks lead with are not higher interest rates or lower fees; they are app capabilities that incumbents have not built, including recurring payment management. The competitive gain is from the cumulative experience gap across all three commitment types in one app. High impact, medium horizon, growing.

**Technology trends**

T1 -- Pattern-based subscription detection across all payment channels without relying on card scheme data fields. Tapix by Dateio identifies subscriptions, direct debits, standing orders, and pattern-based charges using transaction pattern detection across all payment channels, not Mastercard or Visa data. Their database holds 60 billion enriched transactions across 25 categories with 520 tags, and their stated error rate is 1 per 6 million transactions. The technology is in production at Revolut, bunq, Erste, OTP Bank, Raiffeisen Bank, and Societe Generale among others. The relevance to this run is that Erste is Ceska sporitelna's parent group. Medium impact, short horizon, mature.

T2 -- In-app merchant-level recurring payment blocking without full card cancellation. Revolut allows customers to block recurring payments to a specific merchant from within the app, without going to the merchant's site and without blocking the whole card. Lloyds Bank, through Minna Technologies and Visa, lets customers view, manage, and cancel debit card subscriptions in-app with real-time push notifications about price changes. NatWest lets customers cancel recurring card payments for the majority of merchants directly from the mobile app. All three are in production. No Czech Ring 1 bank has confirmed this capability from public material. High impact, short horizon, growing.

T3 -- Per-merchant virtual card numbers for subscription isolation. Virtual card numbers can be generated per merchant, so the card associated with a specific subscription can be frozen without affecting other payments. Bunq supports this approach through multiple virtual cards and multiple IBANs. The approach isolates subscription payments at the card level rather than at the merchant blocking layer T2 describes. T2 is more widely deployed and does not require the client to have set up separate cards per subscription in advance. Low impact, medium horizon, growing.

**Regulatory trends**

R1 -- PSD3 and PSR provisional agreement aligning merchant-initiated transaction protections with direct debit rules. On 27 November 2025, the European Parliament and Council reached a provisional political agreement on PSD3 and the accompanying PSR. Norton Rose Fulbright (March 2026) notes that merchant-initiated transactions under the new framework require strong customer authentication at mandate setup only, and that MITs are aligned with direct debit consumer protection measures including refund rights. Expected Official Journal publication is H1 2026. Entry into force is 2027. Member states have 18 months from entry into force to transpose PSD3; PSR applies 18 months after entry into force. High impact, medium horizon, growing.

R2 -- Card scheme subscription transparency rules requiring online cancellation pathways at the merchant. Mastercard introduced two rounds of subscription rule updates in 2022, effective March and October. Merchants must send confirmation emails at enrollment, issue payment receipts with cancellation instructions after each billing, send pre-billing reminders for plans billing less frequently than every 180 days, and provide online cancellation methods with the same prominence as signup. Tapix states their service addresses Visa subscription-management mandate requirements. These rules apply to merchants, not to banks, and leave the bank-side capability gap entirely unaddressed. Medium impact, short horizon, mature.

R3 -- Asymmetric consumer protection between card-on-file subscriptions and SEPA direct debits under PSD2. SEPA SDD gives consumers the right to revoke a mandate and banks must act on revocation. No equivalent mandate revocation right exists for card-on-file subscriptions under the card scheme framework. Norton Rose Fulbright (March 2026) notes that PSD3 aligns MIT protections with direct debit consumer protection including refund rights; the phrase "aligns with" confirms that before PSD3 the two were not aligned. This asymmetry is the structural root of H4: the client experience differs by commitment type because the regulation differs by commitment type. Medium impact, short horizon, mature.

## Who is in it

17 participants are mapped. 11 are selected for deep dive (marked Y below).

| Participant | Type | Ring | Standing | Trends represented | Deep dive |
|---|---|---|---|---|---|
| CSOB | direct | 1 | leader | R3 | Y |
| Komercni banka | direct | 1 | leader | none | Y |
| Air Bank | direct | 1 | innovator | T1 | Y |
| MONETA Money Bank | direct | 1 | leader | none | Y |
| Raiffeisenbank CZ | direct | 1 | leader | none | N |
| mBank CZ | direct | 1 | innovator | B3 | N |
| Revolut | direct | 3 | innovator | B3, T2, R1 | Y |
| Monzo | direct | 3 | innovator | B3, R1 | Y |
| N26 | direct | 3 | innovator | B3 | Y |
| Bunq | direct | 3 | innovator | T3 | N |
| Lloyds Bank | direct | 3 | leader | B1, T2, R2 | Y |
| NatWest | direct | 3 | leader | B1, R1 | Y |
| Tapix by Dateio | adjacent | 3 | innovator | B1, T1, R2 | Y |
| Minna Technologies | adjacent | 3 | innovator | T2 | N |
| Contact centre call | substitute | none | leader | B2, R3 | Y |
| Manual merchant cancellation | substitute | none | leader | B2, R2 | N |
| Card block | substitute | none | leader | B2, R3 | N |

## Who we looked at closely, and why

**CSOB** is the largest Czech bank by assets with 4.34 million clients, making it the baseline comparator for this initiative. Public material confirms standard digital services including online banking and a mobile app. No in-app card-on-file subscription management was found in public material during this research. Website pages relevant to recurring payment management were not accessible in this run or the prior instant-payment-disputes run (HTTP 500 both times). The deep dive established what the Ring 1 leader offers from available secondary sources: digital management of standing orders and direct debits, with no confirmed equivalent for card-on-file subscriptions. Selected because any initiative at Ceska sporitelna must match or exceed the Ring 1 benchmark.

**Komercni banka** is the second-largest Czech retail bank by client count (1.6 million customers) and a subsidiary of Societe Generale, whose broader group has deployed Tapix for subscription intelligence across other markets. Public material confirms management of standing payment orders, automatic transfers, and direct debit mandates. No in-app card-on-file subscription management confirmed. Selected alongside CSOB to complete the Ring 1 incumbent picture. The Societe Generale parent connection makes Komercni banka a participant with access to the T1 technology base already in use within its group.

**Air Bank** is the most digitally-forward Czech retail bank by reputation, known for introducing in-app features ahead of other Czech banks. The reused card from run 2026-06-instant-payment-disputes (researched_at 2026-08-22) confirms Air Bank's Czech-language website is accessible and Air Bank has confirmed in-app digital features: the Czech support page was fetched in that run and showed in-app cancellation of future-dated payments and an online banking request path. 1.6 million customers end-2025, CX Bank of the Year for 9 consecutive years (KPMG). The reused card covers instant payment recall, not subscription management. Whether Air Bank has in-app management of card-on-file subscriptions remains unanswered. Selected as Ring 1 innovator because if any Czech bank has built unified recurring payment detection, Air Bank is the most likely.

**MONETA Money Bank** provided the clearest public confirmation of digital standing order and direct debit management among Czech Ring 1 banks. Their Smart Banka app documentation states that users can set up, change, or cancel standing orders and direct debits directly in the app. The app is described as having over 200 functions and 41 products available fully online. No card-on-file subscription management feature was mentioned in accessible English material. Selected because they demonstrate the current Ring 1 ceiling for the two manageable commitment types, against which the initiative's card-on-file gap is most directly visible.

**Revolut** is the primary Ring 3 neobank comparator for this scope. Confirmed features include: a Subscriptions section that displays direct debits and recurring card payments in a single list, the ability to block a recurring payment to a specific merchant from within the app without going to the merchant and without blocking the whole card, and advance notifications before scheduled payments. Revolut uses Tapix for subscription intelligence. Revenue was GBP 4,515.8 million at year-end 2025 across 68.3 million retail customers. Under UK PSR mandatory reimbursement requirements from a regulator operating on principles aligned with PSD3's direction. Selected because Revolut directly addresses all three primary problems (H1, H2, H4) in production, at scale, and is the neobank most likely to be the alternative a Czech retail client would consider.

**Monzo** is a UK neobank under PSR mandatory reimbursement requirements. Relaunched premium tier structure (Extra, Perks, Max) in 2024, competing on app capabilities against Revolut and incumbents. The reused card from run 2026-06-instant-payment-disputes covers Monzo's undo payments feature and APP fraud reimbursement. No confirmation of third-party card-on-file subscription management from either the reused card or this run's research. Selected as a second Ring 3 neobank innovator to test whether the Revolut feature set is specific to Revolut or representative of the neobank category.

**N26** is a German neobank operating across Europe. Confirmed that N26 manages subscriptions to its own banking tiers through the app. No confirmed feature for managing third-party card-on-file subscriptions was found. Selected as the European neobank (German-headquartered, EU-licensed) to test whether the subscription management feature gap is universal across the neobank category or specific to Revolut's market position.

**Lloyds Bank** is the most complete public evidence case for the full initiative scope. Confirmed: in July 2020, Lloyds Bank launched a subscription management service in partnership with Minna Technologies and Visa, enabling in-app view, management, and cancellation of debit card subscriptions with real-time push notifications about price changes and renewal notices. Their digital service director stated at launch that direct debits and standing orders were already manageable online; the new feature specifically addressed card subscriptions as a separate, previously unmanageable category. 16 million online customers, 12 million mobile app users. Selected because they solved exactly H1 and H2 in production and documented the problem-solution pairing in published material.

**NatWest** displays subscriptions -- defined as recurring card payments -- in the mobile app for the past 12 months, alongside but separate from direct debits and standing orders. Users can cancel recurring card payments for the majority of merchants directly from the mobile app. The published help content notes that stopping a payment through the app does not end the contract and advises checking the subscription terms. The app's own vocabulary distinguishes subscriptions (varying recurring card payments) from direct debits and standing orders, which is the three-type distinction H4 points at. Selected because they represent T2 in production at a Ring 3 incumbent and their consumer-facing language makes the three-commitment-type distinction explicit.

**Tapix by Dateio** is a B2B subscription intelligence provider in production at European banks including Revolut, Bunq, Erste, OTP Bank, Raiffeisen Bank, Societe Generale, Soldo, and National Bank of Greece. Their database holds 60 billion enriched transactions across 25 categories with 520 tags, with a stated error rate of 1 per 6 million transactions. The technology identifies subscriptions, direct debits, standing orders, and pattern-based charges using transaction pattern detection rather than Mastercard or Visa data fields, giving it coverage across all three commitment types without depending on card scheme enrichment. They state explicitly that their service addresses Visa subscription-management mandate requirements. Selected as adjacent innovator because their live client list answers the question of which European incumbents have already adopted T1: the list includes Erste, Ceska sporitelna's parent group.

**Contact centre call** is the current path a Ceska sporitelna retail client follows to change or cancel a recurring commitment. Based on the problem material from this run (H1, H2, H4), the outcome differs by commitment type. A standing order change can be completed by phone with a short call and a bank-side instruction; the bank controls the instruction directly. A direct debit mandate change requires a different set of steps because the mandate runs at a third party. A card-on-file subscription cannot be stopped by the bank from the bank's side at all; the contact centre can advise the client to contact the merchant but cannot act. Selected for deep dive because this is the substitute the initiative replaces, and the differentiated outcome across the three types within this single channel is the strongest available evidence base for H4.

## What we could not establish

**Air Bank's in-app subscription management** was not established from this run's research or the reused card. The reused card from run 2026-06-instant-payment-disputes (researched_at 2026-08-22) confirmed Air Bank's Czech-language website is accessible and Air Bank has in-app digital features. That card covers instant payment recall, not subscription management. Whether Air Bank offers in-app management of card-on-file subscriptions is the question neither this run's research nor the reused card answers.

**CSOB's recurring payment management detail** could not be confirmed. Website pages returned access errors (HTTP 500) in this run and in the instant-payment-disputes run two days prior. The finding that CSOB does not offer card-on-file management is a negative inference from absence of published material, not a confirmed feature gap.

**mBank CZ's specific payment management features** were not accessible in this run. The Czech-language payment management page returned HTTP 404. The reused card from run 2026-04-card-disputes covers card dispute handling and does not address subscription management.

**Revolut's subscription management for EU card-on-file specifically** was confirmed via Wikipedia and secondary source summaries rather than from Revolut's own help pages (HTTP 403 in this run). The feature is confirmed as existing from those sources. The specific scope -- whether it covers EU Mastercard and Visa recurring charges in addition to UK -- was not confirmed from primary Revolut pages.

**Monzo's third-party subscription management** was not confirmed from this run's research or the reused card. The reused card from run 2026-06-instant-payment-disputes covers Monzo's undo payments feature and APP fraud reimbursement, not card-on-file subscription management.

**Whether Tapix or any equivalent T1 provider is deployed at Ceska sporitelna** is unknown. Tapix's published client list does not mention Ceska sporitelna. The parent (Erste) is confirmed on their list. Whether Ceska sporitelna operates independently or inherits Erste-level contracts was not resolvable from public material.

## How this was produced

The research for this map used 8 web search iterations (the hard bound for this skill) and attempted page fetches against 17 specific URLs. Seven page fetches returned errors: revolut.com/news (HTTP 403), lloydsbank.com subscription page (HTTP error page), mastercard.com/europe subscription management (HTTP 403), paymentexpert.com/psd3 (HTTP 403), help.revolut.com/subscriptions (HTTP 403), airbank.cz/en/ (HTTP 404), and mbank.cz/osobni-finance/moje-platby/ (HTTP 404). Successful fetches covered Moneta Smart Banka, Komercni banka standard offering, NatWest subscription management help, Tapix by Dateio capabilities, Revolut Wikipedia entry, Bunq Wikipedia entry, Komercni banka Wikipedia, CSOB Wikipedia, Mastercard subscription rules (secondary source), Norton Rose Fulbright PSD3 briefing, a banking industry article on the Lloyds Bank and Minna Technologies partnership, and Ulster Bank subscription management help (as a NatWest group member confirming the feature across the group).

The competitor store (S1) was checked before research began. Ten of the seventeen mapped participants had entries in the store, all within the 180-day freshness window. None were reused: every one of those cards was researched for a different market scope -- instant payment recall or card dispute handling -- and the researched offering does not travel across scope boundaries. The identity keys persist; the researched offerings do not. `reused: []` on the record is the finding, not an omission.

All fetched page text passed through the quarantine bridge (market-content-extract) before authoring. The authoring step drew only from structured extracts produced by the bridge, not from raw page text. This is a process claim that a reader cannot verify from this document; it is listed in could_not_verify with reach: process.

The egress regime in force for this run is pilot-test. No CS-approved search endpoint has been named; the substrate's search and fetch capability is the single named destination under this regime. Research conducted under a test destination is not research conducted under an approved one, and this artifact carries that mark.

**Assembled from one record:**

- **R-A5-01**: records/3-competitive-analysis/A5-r01-landscape.record.md
