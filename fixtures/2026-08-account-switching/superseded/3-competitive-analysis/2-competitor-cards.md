---
run_id: 2026-08-account-switching
artifact_id: A6
ost_role: none
status: produced
workflow: competitive-analysis
modified_by: agent
revisions: 0
could_not_verify:
    - rule: "fetches through the quarantine bridge and derives from the extract, never raw text; a failed branch is unprofiled with a reason"
      needs: judge
      reach: process
standards_basis: "Competitive Analysis Standards v0.13, 26 August 2026, self-assessed as met except the ten-card floor, which is met at exactly ten"
egress_basis: pilot-test
produced_by:
  agent: competitive-analysis
  skill: deep-dive
sources: [A5]
external_sources:
  - S-starlingbank-account-switching-help-page-and-fea
  - S-en-starling-bank-article
  - S-bankadvisor-starling-bank-review-2025
  - S-moneyweek-starling-bank-review-and-account-compa
  - S-moneysupermarket-starling-bank-comparison-listin
  - S-moneytothemasses-starling-bank-current-account-r
  - S-monzo-cass-switching-page-get-paid-early-page-sa
  - S-en-monzo-article
  - S-finder-monzo-bank-account-review-2026
  - S-moneytothemasses-monzo-current-account-review
  - S-moneysupermarket-monzo-account-comparison-listin
  - S-currentaccountswitch-cass-net-switching-data-q3-
  - S-en-revolut-article
  - S-moneyweek-revolut-bank-review-2026-and-cass-cove
  - S-pocketwise-revolut-uk-bank-account-review-2026
  - S-fintechcompass-revolut-uk-banking-licence-and-ca
  - S-techcrunch-revolut-uk-banking-licence-pra-fca-ap
  - S-currentaccountswitch-cass-participating-institut
  - S-natwest-switch-to-natwest-page-including-explici
  - S-which-natwest-current-account-review-and-cass-da
  - S-anna-uk-bank-switching-comparison-2026
  - S-bankinggeek-natwest-switching-service-review
  - S-swiftmoney-best-bank-account-switch-offers-uk-20
  - S-kbc-kbc-group-annual-report-2025-czech-republic-
  - S-thebanks-csob-bank-profile-czech-republic
  - S-en-ceskoslovenska-obchodni-banka-article
  - S-camunda-csob-process-automation-case-study-2024
  - S-bankycr-csob-digital-strategy-and-product-analys
  - S-pickthebank-csob-current-account-comparison-czec
  - S-kb-switch-your-bank-page-english-language-kb-cz-
  - S-societegenerale-komercni-banka-subsidiary-profil
  - S-thebanks-komercni-banka-profile-czech-republic
  - S-en-komercni-banka-article
  - S-bankycr-komercni-banka-kb-app-and-digital-strate
  - S-pickthebank-komercni-banka-current-account-compa
  - S-ppf-ppf-group-annual-report-2025-air-bank-segmen
  - S-kpmg-kpmg-cx-top-100-brands-2025-customer-bank-o
  - S-thebanks-air-bank-profile-czech-republic
  - S-en-air-bank-article
  - S-bankycr-air-bank-digital-strategy-and-product-an
  - S-pickthebank-air-bank-current-account-comparison-
  - S-which-how-to-switch-bank-accounts-self-managed-s
  - S-moneysavingexpert-bank-account-switching-guide-s
  - S-moneytothemasses-diy-bank-switching-how-to-move-
  - S-citizensadvice-moving-bank-accounts-what-you-nee
  - S-gocompare-self-managed-bank-account-switch-pros-
  - S-currentaccountswitch-cass-what-the-service-cover
  - S-which-lloyds-bank-current-account-review-and-cas
  - S-gocompare-lloyds-switching-incentive-comparison-
  - S-moneytothemasses-lloyds-bank-account-review-2026
  - S-moneysupermarket-lloyds-bank-account-comparison-
  - S-swiftmoney-uk-bank-switch-cash-offers-2026-inclu
  - S-moneta-investor-relations-homepage-investors-mon
  - S-thebanks-moneta-money-bank-profile-czech-republi
  - S-pickthebank-moneta-money-bank-deposits-and-accou
  - S-accenture-moneta-money-bank-digital-transformati
  - S-en-moneta-money-bank-article
  - S-bankycr-moneta-money-bank-digital-strategy-and-p
assembled_at: "2026-08-26T13:00:00Z"
assembled_from: [A6-r01, A6-r02, A6-r03, A6-r04, A6-r05, A6-r06, A6-r07, A6-r08, A6-r09, A6-r10]
---

# Competitor profiles: account switching market

Ten participants profiled across two rounds. All ten at medium confidence: the derivation rule requires offering, segment, or positioning fields on the card for a higher rating, and none of these cards carry those fields, so the ceiling is medium regardless of source count. Primary source was confirmed for KB (English switching page accessible), NatWest, Starling Bank, and Monzo; primary was unreachable for Revolut (403), Air Bank (404), CSOB (500), Lloyds Bank (error page), and Moneta product pages (404). The findings from all ten cards are usable; the gap is that the participant's own voice is absent for five of them.

The structural finding across all ten is identical: every bank in this set transfers direct debits and standing orders, and every bank leaves card-on-file subscription payments for the customer to handle manually. The difference between them is whether they acknowledge this gap explicitly, and whether they offer anything to reduce its cost.

---

## Starling Bank

[rec:A6-r01]

**Confidence: medium** | Direct | Innovator | Represents B2, T1

Starling runs a full CASS switch in-app, with the old account closing on switch day. The customer enters the old bank's details and Starling coordinates everything else. The switch is complete-or-nothing: no partial option exists.

**What stands out.** Virtual cards provide a structural reduction of the card-on-file problem. Customers who route subscriptions through a virtual card rather than their main card have fewer credentials to update when anything changes - in a switch or otherwise. Starling is the only participant in this set that offers this in combination with a switching service. 4.6 million accounts growing 10% year-on-year confirms the model is working without cash incentives.

**Where it stops.** Card-on-file subscriptions require manual updating, as for all CASS participants. No post-switch view of what is still pointing at the closed account. Employer salary notification is the customer's responsibility.

**Pricing.** Standard account: no monthly fee.

---

## Monzo

[rec:A6-r02]

**Confidence: medium** | Direct | Innovator | Represents B2, B3, T1

Full CASS switch in-app. 9,934 net CASS gains in Q3 2025, the figure Monzo publishes and incumbents do not. The two features that define Monzo's switching proposition are Salary Sorter and Get Paid Early.

Salary Sorter divides incoming salary automatically across up to 20 named Pots - bills, savings, spending - the moment salary arrives. The customer sets the rules before the first post-switch salary; Monzo executes them without further action. Get Paid Early releases salary 24 hours before standard clearing. Together they make the first salary deposit in the new account a materially different event than it would be at any other bank in this set.

**What stands out.** The product sequence is designed around the salary moment. Switch to activate both features; receive first salary; money is already organized. No other participant makes the switch completion event into a planning session. Monzo is also the only neobank that publishes its CASS net gain figure, which confirms that switching volume is a managed growth metric.

**Where it stops.** Card-on-file subscriptions are not transferred. No post-switch view of what is still running on the old account. Employer notification is the customer's responsibility, though Get Paid Early masks the single-cycle gap.

**Pricing.** Basic: no monthly fee. Extra: GBP 3. Perks: GBP 7. Max: GBP 17.

---

## Revolut

[rec:A6-r03]

**Confidence: medium** | Direct | Innovator | Represents B2, B3

Full UK banking licence from PRA and FCA since March 2026. CASS membership followed the licence. 13+ million UK customers migrating from e-money accounts to the banking product. FSCS protection up to GBP 85,000 (plus 6-month temporary high balance protection).

Early Salary releases salary 24 hours before standard clearing, the same mechanism as Monzo's Get Paid Early. Multi-currency accounts (36 currencies at interbank rate) differentiate Revolut from the other neobanks for internationally mobile customers.

**What stands out.** The banking licence changes Revolut's competitive position structurally. For nine years it operated without CASS access or FSCS protection; both are now available for UK accounts. The Czech Revolut product remains an e-money account; Czech customers who switch to Revolut cannot rely on PAD-compliant switching as an outbound destination.

**Where it stops.** Card-on-file subscriptions outside CASS scope. No post-switch view of old-account residual payments. Czech e-money status means Revolut cannot serve as a PAD-compliant inbound destination for Czech bank switchers.

**Pricing.** Standard: no monthly fee. Plus: GBP 3.99. Premium: GBP 7.99. Metal: GBP 14.99. Ultra: GBP 45.

---

## NatWest

[rec:A6-r04]

**Confidence: medium** | Direct | Leader | Represents T1, R3

Full CASS switch with a published Day 1 through Day 6-7 timeline. Incoming payments redirect from the old account indefinitely. Net CASS outflows in early 2025 despite a seasonal cash incentive programme.

NatWest publishes an explicit list of what does not transfer: card payments and subscriptions, with Amazon named as an example. "For some card payments you will need to provide your new card details to the business (e.g. Amazon) in the same way as you would now if your card expired." This is the clearest published statement of the card-on-file gap in this set.

**What stands out.** The Day 1 through Day 6-7 timeline is the benchmark for what a completion-visible switching journey looks like. No Czech bank publishes anything comparable. The gap between NatWest's published schedule and what Czech banks offer in English is the distance between the O3 status quo and the O3 opportunity.

**Where it stops.** NatWest documents the card-on-file exclusion but offers no tool to identify which merchants hold the old card details. After Day 7, the customer has no NatWest view of what is still pointing at the closed account.

**Pricing.** Flex: GBP 2/month, waivable. Reward: GBP 2/month with offsetting cashback. Premiere: GBP 31/month.

---

## Air Bank

[rec:A6-r07]

**Confidence: medium** | Direct | Innovator | Represents B2, T3

1.6 million customers by end of 2025, grown from 1.07 million in 2022. 9th consecutive KPMG CX Top 100 Brands award as Customer Bank of the Year - the only bank in this set with an independent, consecutive CX recognition at that frequency. My Air app integrates investment in US stocks and European ETFs directly into the banking account, a depth of product not offered by CSOB, KB, or Moneta at the primary account level.

Cvak contactless payment at Albert supermarket tills reduces card-on-file exposure: customers who pay regular Albert purchases via Cvak rather than a stored card have fewer credentials to update in a future switch.

**What stands out.** Air Bank has the best-documented customer experience track record of any Czech bank in this set, by a significant margin. It is the participant selected to represent T3 (AISP-enabled old-account visibility) because its digital depth makes it the most likely Czech bank to pursue this capability. T3 is not confirmed; Air Bank is the candidate, not the answer.

**Where it stops.** No English-language public material describes the switching service. Pricing is in Czech only. Primary site was inaccessible; all data sourced from parent company PPF Group and secondary publishers.

---

## CSOB

[rec:A6-r05]

**Confidence: medium** | Direct | Leader | Represents R1, R3

4.34 million retail customers: the largest Czech retail bank. 280 branded branches plus 3,300 Czech Post agency branches. 1,805 billion CZK in assets. KBC Group subsidiary with access to group-wide digital banking technology.

PAD-compliant switching service confirmed by regulation. Camunda adopted for process automation and cross-channel unification (announced 2024). The Camunda investment is aimed at process efficiency and channel consistency; whether the switching customer journey is within scope is not disclosed.

**What stands out.** CSOB's English-language switching documentation is zero. The bank offers the service; no English page describes it. This is the baseline across the Czech market. The 3,300 Czech Post agency points represent a distribution advantage no challenger can replicate.

**Where it stops.** All switching information is in Czech only. The research cannot confirm what the CSOB switching journey includes beyond the PAD minimum, or what the customer experience looks like.

---

## Komercni banka

[rec:A6-r06]

**Confidence: medium** | Direct | Leader | Represents R1, B1

The only Czech bank in this set with a dedicated English-language "Switch your bank" page. The page states what transfers automatically (standing orders, direct debits, payment orders with future maturity, old balance) and names what the customer must do manually (notify employer, update invoices and regular clients, contact utilities, update payment templates). Old account closure on request.

KB+ unified app: personal and business accounts, payments, investments, and loans in one interface. Migration to KB+ takes 10 minutes online with a mobile phone. Societe Generale 60% ownership and Temenos platform.

**What stands out.** KB names the customer's remaining obligations in English: employer, utilities, invoices. This is the honest statement of the PAD gap. No timeline is given; the customer knows scope but not schedule. NatWest's Day 1 through Day 6-7 schedule is the gap between KB's transparency and the standard set by the UK market leader.

**Where it stops.** No switching timeline stated. Card-on-file payments not mentioned (neither transfer nor explicit exclusion stated). No tool to identify which payees need updating. No post-switch view of old-account activity.

---

## Self-managed switch (substitute)

[rec:A6-r08]

**Confidence: medium** | Substitute | Leader | Represents B1

The customer keeps both accounts open, observes what payments continue to arrive on the old account, and redirects them one by one. No scheme participation required. No deadline.

**What stands out.** This is the only approach that gives the customer a live view of what is still attached to the old account. Customers choose it specifically because a guided service closes the account before they know what was missed. The cost is "considerable attention to detail" - consumer guides converge on this phrase. A portion of customers who start a self-managed switch end up maintaining both accounts indefinitely.

**Where it stops.** No systematic tool to find all card-on-file entries. Employer notification is fully manual. No defined completion state. The process ends when the customer decides it is safe to close the old account, with no external confirmation that the judgment is correct.

**Cost.** Monthly fees on the old account continue during the transition. Overdraft fees if a redirected payment lands after the customer has reduced the old account balance.

---

## Lloyds Bank

[rec:A6-r09]

**Confidence: medium** | Direct | Leader | Represents T1, R3

CASS full switch with 7-day guarantee. Club Lloyds: GBP 3/month for a monthly lifestyle benefit (Disney+, cinema tickets, or magazine) chosen by the customer. Cash switch incentive of GBP 200-500 - the highest published by any incumbent in this set.

**What stands out.** The cash incentive signals that Lloyds has measured the cost of CASS outflows and decided that paying customers to switch in is cheaper than losing them. No Czech bank in this set runs anything comparable. Club Lloyds' lifestyle benefit turns the fee into a choice rather than a charge.

**Where it stops.** Primary page was unavailable. Card-on-file exclusion inferred from CASS-wide rules rather than a Lloyds-specific document. No confirmed post-switch view of old-account residual payments.

**Pricing.** Classic: no monthly fee. Club Lloyds: GBP 3/month, waivable. Silver: GBP 13/month.

---

## Moneta Money Bank

[rec:A6-r10]

**Confidence: medium** | Direct | Leader | Represents R1

Ucet Tom Plus: 0 CZK/month with no qualifying spend condition and free worldwide ATM withdrawals. Smart Banka app: biometric authentication, instant payments, full digital product origination. Internet Banka available for desktop users. Moneta states a strategic aim to be "the digital leader in the Czech market."

**What stands out.** Zero-fee with no conditions is the cleanest base retail offer of the five Czech banks profiled. The "digital leader" ambition is stated; whether it extends to the switching journey is not confirmed. The Accenture case study evidence is from 2022-2024; 2026 product development above that baseline is not documented in public material.

**Where it stops.** No English-language description of the switching service scope, timeline, or interface. Card-on-file exclusion applies by regulation; no Moneta-specific documentation found in English.

---

## What we could not establish

Five of the ten participants had primary pages that were unreachable: Revolut (403), Air Bank (404), CSOB (500), Lloyds Bank (error page), and Moneta main product pages (404). Moneta's investor relations subdomain was accessible and constitutes a primary source for strategic claims; product-level documentation was not available in English.

No Czech bank published switching volumes in English-language public material. The Czech switching take-up rate cited in stage 2 comes from run material, not from a Czech banking regulator or authority. Czech-language sources would provide materially more detail on the switching services of CSOB, Air Bank, KB, and Moneta; this research used English-language public material only.

T3 (AISP-enabled old-account payment visibility) is unconfirmed for all participants. Air Bank is the candidate; no one in this set has confirmed the capability.

---

## How this was produced

Ten participants were profiled across two rounds: eight in round 1, two in round 2 (Lloyds Bank and Moneta Money Bank). Each participant's record is at `records/3-competitive-analysis/A6-r0N-[participant].record.md`. All findings derive from the quarantine bridge's structured extract. The egress regime in force is pilot-test. Research was conducted under the substrate's own search and fetch capability as the single named destination in egress.yaml.
