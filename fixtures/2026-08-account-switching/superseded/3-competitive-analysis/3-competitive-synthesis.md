---
run_id: 2026-08-account-switching
artifact_id: A7
ost_role: none
status: produced
workflow: competitive-analysis
modified_by: agent
revisions: 0
could_not_verify:
    - rule: "recommends no action; A7 carries the run id and is never written to S1 (run-scoped contract + empty capability list, not C24)"
      needs: judge
      reach: artifact
standards_basis: "Competitive Analysis Standards v0.13, 26 August 2026, self-assessed as met except the ten-card floor, which is met at exactly ten"
egress_basis: pilot-test
produced_by:
  agent: competitive-analysis
  skill: synthesis
sources: [A6, A4, A3b]
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
assembled_at: "2026-08-26T13:30:00Z"
assembled_from: [A7-r01]
---

# Competitive synthesis: account switching

[rec:A7-r01]

Ten banks and one substitute profiled. The market has a settled floor (PAD/CASS compliance) and an open ceiling. Every participant meets the floor. None has reached the ceiling, because the ceiling requires either card-scheme-level tooling or regulatory extension - neither of which any single bank controls. The opening for CS is in the space between the floor and the ceiling: process transparency, completion visibility, and the post-switch experience that no Czech bank has built.

---

## What the market has settled on

**STD-1 (universal).** Standing orders and direct debit mandates transfer automatically. 9 of 10 banks in this set confirm it; the substitute does not offer it because it operates outside the scheme entirely. This is the floor. No participant differentiates by meeting it.

**STD-2 (common).** Incoming payments to the closed old account redirect to the new account. 6 of 10 participants confirm this - the UK participants where CASS governs it. Czech banks offer the PAD minimum (13 months); English-language documentation of this for Czech banks was not accessible.

**STD-3 (common).** The old account balance transfers to the new account. 6 of 10 participants confirm this in English. The substitute does not do it; Czech bank confirmation was limited to KB.

---

## Recurring design choices

**PAT-1 (universal).** No bank transfers card-on-file subscription credentials. All 10 participants - banks and substitute alike - leave card-on-file updates to the customer. This is not a product decision. It is a structural consequence of how card networks store credentials at the merchant. Addresses O1 and O7.

**PAT-2 (universal).** No participant shows the customer what is still pointing at the old account after the switch. The switching service ends when the scheme completes. 9 of 10 banks confirm the absence; only the substitute differs because it keeps the old account open and the payment stream visible throughout. Addresses O1 and O3.

**PAT-3 (universal).** No switching service notifies the customer's employer. Salary redirection is manual in every bank and scheme. 9 of 10 banks confirm this. Addresses O2.

**PAT-4 (emerging).** Czech banks publish no switching timeline in English. UK participants publish either a day-by-day schedule (NatWest: Day 1 through Day 6-7) or a headline figure (7 working days). 5 of 10 participants have no published timeline: the four Czech banks and the substitute. Addresses O3 and O4.

**PAT-5 (emerging).** UK neobanks build salary-moment features specifically for the first post-switch salary. Salary Sorter (Monzo) and Early Salary (Revolut) both activate on salary receipt in the new account. 2 of 10 participants have deployed this approach. Addresses O2.

---

## Market direction

**TR-1 (emerging).** Cash switch incentives from UK incumbents (NatWest, Lloyds - GBP 200-500) have not reversed net CASS outflows. The incentive is a response to losing; it is not a solution to it. Product experience, not money, is what the challengers are winning on. Confirmed by 2 participants. Bears on none of the listed A4 opportunities directly; it is a signal about what does not work.

**TR-2 (emerging).** Salary feature products are converging among UK neobanks as the post-switch differentiation model. Both Monzo and Revolut have built salary release and salary distribution features aimed at the moment the first post-switch salary lands. 2 of 10 participants. Addresses O2.

**TR-3 (emerging).** Documentation transparency is standard practice in the UK switching market and absent for Czech banks in English. NatWest publishes a named exclusion list with a merchant example; KB is the only Czech bank with an English switch page. 5 of 10 participants demonstrate the gap. Addresses O3 and O4.

---

## Facet 1: Offering

**[universal]** Every bank's core switching offer is direct debit and standing order transfer within a fixed window. This is PAD or CASS compliance. It is the offer, not a product. No participant describes it as a feature they have designed; it is a requirement they fulfill. Addresses O1 (partial).

**[universal]** Card-on-file subscriptions are excluded from every offer in this set. Ten participants, one structural exclusion. The offer every bank makes is incomplete in the same way. No participant has built an offer that closes the card-on-file gap. Addresses O1 and O7.

**[common]** Six of ten participants include incoming payment redirection as part of the offer. UK participants confirm it at 3 years (CASS); Czech banks confirm the PAD minimum in Czech-language terms only. The offer scope is wider in the UK market than the Czech documentation suggests. Addresses O1.

**[rare]** One participant (Starling Bank) offers virtual card issuance in conjunction with its switching service, reducing the number of card-on-file credentials that would need updating in any future switch. This is a structural reduction of the problem rather than a solution to it, but no other participant in the set offers anything equivalent. Addresses O1 and O7.

**[rare]** One participant (Monzo) offers a post-switch account organization feature (Salary Sorter) that turns the switch completion moment into a financial planning interaction. The offer is a budget setup tool, not a switching tool, but it activates on the switch event. Addresses O2.

---

## Facet 2: Segment

**[universal]** All ten participants target retail current-account holders seeking a primary banking relationship. The switching market is defined by this segment; there is no specialist or niche switching market in this set.

**[common]** Six of ten participants have salary-specific features or messaging that address salary earners as the primary target. UK neobanks are explicit (Salary Sorter, Early Salary); Czech banks have not published salary-specific switching messaging in English. Addresses O2.

**[common]** Five UK participants target the segment that has lived with an incumbent and is evaluating a digital-first bank as an upgrade. The targeting is implicit in the product features (App-first switching, salary features, in-app account management) rather than stated explicitly in switching documentation.

**[rare]** One participant (Revolut) explicitly targets internationally mobile customers with multi-currency banking needs. Revolut's multi-currency account is the feature that differentiates it from Monzo and Starling for this sub-segment. No Czech bank targets this segment in its English-language switching documentation. Bears on none of the listed A4 opportunities.

---

## Facet 3: Features

**[universal]** Automated payment mandate redirection (direct debits, standing orders) is the foundational feature every bank in this set provides. 9 of 10 banks confirm it in English-language public material. The substitute does not have it; the substitute is the behavior that results from its absence. Addresses O1.

**[universal]** No participant has a feature that identifies which merchants hold the customer's card-on-file details. Ten participants, zero exceptions. The feature does not exist at the retail banking level. Card scheme tools (Galileo Payment Switch, Visa Enhanced Subscription Manager) provide this capability at the infrastructure level; no bank in this set has integrated them into a consumer-facing product. Addresses O1 and O7.

**[common]** In-app or online switch initiation without a branch visit. Six of ten participants offer this clearly. Czech bank documentation on this was either incomplete (KB confirms internet banking initiation) or absent in English. Addresses O4.

**[rare]** Day-by-day switching timeline published before the switch begins. One participant (NatWest) publishes a Day 1 through Day 6-7 schedule. No Czech bank in the set publishes anything comparable. The feature addresses O3 directly: the customer knows what "done" looks like before starting. Addresses O3 and O4.

---

## Facet 4: USPs

**[universal]** PAD or CASS compliance is not a USP. All nine banks in the set meet the requirement. The compliance baseline generates no differentiation, and no participant markets it as an advantage. A CS initiative that improves switching by meeting a higher fraction of the PAD requirement is still not differentiating on compliance.

**[common]** Digital-first account opening and management is a stated or implied differentiator for six of ten participants. Czech banks (Air Bank, Moneta, KB) claim it; UK neobanks (Monzo, Starling, Revolut) demonstrate it in product depth. The claim is becoming table stakes. Bears on none of the listed A4 opportunities directly; it is the channel through which all other features reach the customer.

**[rare]** Salary-moment activation (early release or automatic distribution) as a post-switch product event. Two UK neobanks have built this. No Czech bank has anything comparable. This is the only confirmed instance of a bank turning the switch completion event into a distinct product experience. Addresses O2.

**[rare]** Independent, consecutive customer satisfaction recognition. One participant (Air Bank, 9 consecutive KPMG CX awards) has this. No UK participant has published an equivalent series. Within the Czech market, Air Bank's CX record is the only externally verified quality signal. Bears on none of the listed A4 opportunities directly; it is the context for assessing Air Bank's T3 potential.

---

## Facet 5: Pricing

**[common]** No switching fee at any participant. Eight of ten participants confirm this in English; two Czech banks had incomplete English pricing data but no switching fee was found. The absence of a switching fee is near-universal practice. Addresses O4 (removes one barrier to completion).

**[common]** Monthly fee for the basic UK incumbent account (GBP 2-3, often waivable). Four UK incumbents confirmed this model. No Czech bank confirmed a comparable monthly fee in English. The UK base account is slightly more expensive than Czech at the base tier but includes cashback or lifestyle benefits that offset the fee. Bears on none of the listed A4 opportunities.

**[rare]** Zero-fee with no conditions: Moneta (0 CZK/month with no qualifying spend) and Monzo (basic account at zero). Two participants confirmed a genuinely unconditional zero-fee offer. Addresses O4 in a narrow sense: no pricing barrier to completing the switch. Bears on O4 marginally.

**[rare]** Cash switch incentive (GBP 200-500): two UK incumbents (Lloyds, NatWest). No Czech bank in the set runs a cash incentive programme. The incentive is a response to measured net outflows; it is not a product improvement. Bears on none of the listed A4 opportunities.

---

## Facet 6: Differentiation

**[universal]** The structural limit (card-on-file exclusion) is identical for every participant. No player in this set differentiates by closing the gap, because no bank can close it unilaterally. The card scheme's credential storage rules and PAD's scope limitation are outside any single bank's control. What banks differentiate on is the experience around the edges of this limit - how transparent they are about it, and what they offer alongside it. Addresses O1 and O7.

**[common]** English-language documentation of the switching journey scope is standard in the UK market (five UK participants) and present for one Czech bank (KB). Four Czech banks offer no English-language switching documentation. The documentation gap maps directly to O3 and O4: a customer who cannot read Czech has no reference for what the Czech switching process includes, how long it takes, or what they must do after it completes. Addresses O3 and O4.

**[emerging]** Product investment above the PAD/CASS compliance floor. Three participants have made confirmed investments in switching-adjacent features that go beyond the regulatory minimum: Starling (virtual cards, Bills Manager), Monzo (Salary Sorter, Get Paid Early), and Air Bank (My Air investing, Cvak payment). These investments serve the primary account relationship, not the switching event, but they change what the post-switch experience looks like. Addresses O2 (for Monzo and Revolut specifically).

**[rare]** Card-scheme-level tooling to migrate card-on-file credentials (Galileo Payment Switch, Visa Enhanced Subscription Manager) is commercially available and deployed by no retail bank in this set. Zero of ten participants have integrated it. The technology is the answer to O1 and O7 at the scheme level. Its absence from every participant confirms that whoever deploys it first will be the first in this market to close the gap. Addresses O1 and O7.

---

## Verdict

### Diagnosis

The account switching market in both Czech and UK retail banking rests on the same compliance infrastructure and shares the same structural gap. PAD and CASS have solved the payment mandate redirection problem. They have not solved the card-on-file problem and they cannot: it falls outside their scope by design.

Czech banks fulfill the PAD requirement and stop. UK banks fulfill the CASS requirement and, in two cases (Monzo, Revolut), build salary features on top of it. No bank in either market has solved O1 (what is still attached), O3 (request tracking), or O4 (completion definition) in a customer-facing product. These are open problems in the competitive set. They are the problems this run is addressing.

### Parity

Direct debit and standing order transfer is parity. Every bank offers it. Incoming payment redirection is near-parity for UK banks and unconfirmed but probable for Czech banks. Digital account opening is on track to become parity across the Czech market; Air Bank and Moneta have it, KB is close. No-fee switching is parity.

The only feature that was recently above parity and is now approaching it is digital-first account management. The feature that remains above parity everywhere in this set is completion transparency: knowing when the switch is done, what was transferred, and what remains to handle.

### The opening

Three gaps are open across the whole market.

First: no bank shows the customer what is still attached to the old account after the switch. NatWest documents the gap honestly (card payments require manual updating); no Czech bank does in English. The self-managed substitute is the only approach that closes this gap, and it closes it by keeping the old account open and watching it - not by building a feature.

Second: no bank provides a completion signal. The customer does not know when the move is "done" in a definitive sense. NatWest's Day 1 through Day 6-7 timeline is the closest any participant comes; it names when the old account closes, not when the customer's entire payment landscape has been updated.

Third: card scheme tooling (Galileo, Visa) is commercially available and deployed nowhere in this set. The first bank to integrate it into a consumer switching journey will be the first to close the gap that every other bank in the UK and Czech market currently leaves open.

CS would be the first Czech bank to build any of these three things, and the first bank in either market to build the first or second. The third requires a commercial integration decision, not a product design decision.

### Risk

Two risks.

The card-on-file gap is structural. CS cannot close it with a customer-facing feature alone. A tool that helps customers find their card-on-file entries (AISP-enabled, as T3 describes) is adjacent to the solution but not equivalent to it. The gap between "we show you what is running on your old account" and "we move it for you" is the gap between transparency and resolution. Both matter; they are not the same product.

UK neobanks are not winning switching by improving switching documentation. They are winning it by building salary features that make the new account feel like the primary bank from Day 1. If the CS initiative addresses O3 and O4 (process transparency) but not O2 (the salary moment), it will be ahead of the Czech peer set and behind the direction the UK market has confirmed as the competitive model.

---

## What we could not establish

No Czech bank published switching volumes in English-language public material. The Czech switching completion rate cited in stage 2 comes from run material, not a Czech banking authority. Air Bank's AISP capability (T3) is unconfirmed; the bank is the candidate, not the answer. Moneta's switching service scope, timeline, and customer interface are documented in Czech only; this synthesis relies on the zero-fee account headline and the Smart Banka digital claim. Lloyds Bank's switching page was inaccessible; the card-on-file exclusion attributed to Lloyds is inferred from CASS-wide rules, not a Lloyds-specific document.

Galileo Payment Switch and Visa Enhanced Subscription Manager are confirmed commercially available. Whether any Czech bank has begun commercial discussions with either vendor is not known from public material.

---

## How this was produced

Synthesis derives from the ten competitor cards produced in the deep-dive phase. No new research was conducted at this stage. All synthesis elements trace to one or more cards in the set; no element was introduced from landscape material or external sources. The egress regime in force is pilot-test. A7 is run-scoped and is not written to S1.
