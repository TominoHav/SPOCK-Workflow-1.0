---
run_id: 2026-08-account-switching
artifact_id: A5
ost_role: none
status: produced
workflow: competitive-analysis
modified_by: agent
revisions: 0
could_not_verify:
    - rule: "authored only from the quarantine bridge's structured extract, never from raw external text"
      needs: judge
      reach: process
standards_basis: "Competitive Analysis Standards v0.13, 26 August 2026, self-assessed as met except the ten-card floor, which is met at exactly ten"
egress_basis: pilot-test
produced_by:
  agent: competitive-analysis
  skill: landscape-mapping
sources: [A1, A4, A3b]
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
assembled_at: "2026-08-26T10:15:00Z"
assembled_from: [A5-r01]
---

# Account switching market: landscape

[rec:A5-r01]

The Czech retail banking market offers a PAD-compliant switching service but has not moved beyond the regulatory floor. The UK market shows what above-floor differentiation looks like. Both markets share the same structural limit: card-on-file payments fall outside the switching scheme, and that gap is the most material friction point for the opportunities this run is addressing.

---

## Business trends

**Main-bank inertia concentrated in the payment attachment gap (B1)**

CASS recorded 1,054,521 switches in 2025 against a UK current-account base of roughly 70 million accounts. Czech research cited in stage 2 found approximately one-third of initiated switches incomplete. The take-up rate in both markets is low for the same reason. Direct debits and standing orders transfer automatically. Card-linked payments - subscriptions, recurring charges stored by merchants against a card number - do not. Employer salary notifications do not. The residual list of things a customer must handle manually is short enough to seem manageable and long enough to make most people stop.

The initiative directly addresses this gap through O1 (what is still attached to the old account) and O3 (request tracking). The structural cause of inertia is the same thing the initiative is trying to solve.

**Digital challengers using switching gains as a growth metric (B2)**

Monzo reported 9,934 net CASS gains in Q3 2025. Starling Bank reported 4.6 million accounts in its 2025 annual report, a 10% year-on-year increase. Nationwide reported 41,450 net CASS gains in the same quarter. These figures are published. Incumbents do not publish them.

The challengers have built product features specifically for the transition moment: Monzo Salary Sorter divides incoming salary across Pots on arrival; Revolut Early Salary releases the payment 24 hours before standard clearing. Both features target salary receipt as the signal that the switch is complete and the new account is primary.

Czech challengers (Air Bank, mBank) operate in the same direction but have not published switching volumes. Air Bank's 9th consecutive CX award from KPMG is the available proxy for its competitive strength.

**Salary receipt as the operational signal for main-bank status (B3)**

Monzo and Revolut have converged on a single event as the definition of a successful switch: the first salary payment landing in the new account. Salary Sorter and Early Salary are both activations of that moment. The competitive logic is that whoever receives salary holds the main-bank position, and the race to capture it starts the moment a switch is filed.

This is directly relevant to O2 (salary timing). The UK market has answered it with a product feature, not a process change.

---

## Technology trends

**Standardized 7-working-day switching infrastructure (T1)**

CASS completed 99.8% of switches within 7 working days in 2025 across more than 50 participating institutions. PAD mandates the same timeline for EU member states. The infrastructure is mature. It transfers balance, direct debits, standing orders, and redirects incoming payments for at least 3 years in the UK. Czech banks offer the PAD-mandated service; they publish less detail about the daily progression than UK incumbents do.

NatWest publishes a Day 1 through Day 6-7 timeline that sets a reference point for what "done" looks like from the customer's view. No Czech bank has a public equivalent. This absence is directly relevant to O3 and O4.

**Automated card-linked payment migration tooling (T2 - unrepresented in this market)**

Galileo Financial Technologies launched Galileo Payment Switch in May 2025. Visa announced Enhanced Subscription Manager in 2026. Both products automate the step that every switching scheme currently leaves to the customer: migrating card-on-file credentials to the new card at the merchant. Neither tool has been confirmed in deployment by any retail banking participant in this set. The technology exists and is commercially available. No bank in scope has integrated it into a consumer switching journey. T2 is the answer to O1 and O7; it is available and not yet deployed.

**AISP-enabled visibility of old-account payment activity (T3 - emerging)**

PSD3 and PSR (provisional agreement November 2025, expected in force 2027) require payment providers to give consumers access to their full payment history via authorised third-party APIs. A 2025 consumer survey found 75% of respondents expect their new bank to show them what is still active on the old account. No participant in this set has confirmed a product feature that reads a switcher's old-account payment history via open banking and surfaces it in the new account interface. This would answer O1 directly without requiring the card scheme tools that T2 describes.

---

## Regulatory trends

**EU PAD mandating standardized switching services (R1)**

Directive 2014/92/EU has been in force since September 2016 and is transposed into Czech law. Article 10 requires Czech banks to transfer standing orders, direct debit mandates, and incoming credits within 15 business days on request. This is the floor below which no Czech bank may operate. CSOB, KB, Moneta, Raiffeisenbank, and Air Bank all offer a PAD-compliant service. The directive defines what must happen; it does not define the customer experience, the communication cadence, or the tracking interface.

*Instrument: Directive 2014/92/EU of the European Parliament and of the Council of 23 July 2014. In force since 18 September 2016.*

**PSD3 and PSR extending open banking access (R2)**

The provisional trilogue agreement of November 2025 extends open banking obligations and introduces payment account permission dashboards. The relevance for switching is direct: a permission dashboard that lists all active payment mandates on an account would make the card-on-file gap visible to the customer at a glance. Czech transposition timing is not yet published; the 18-month member-state transposition period following entry into force places earliest Czech effect around late 2028 or early 2029.

*Instrument: PSD3 and PSR (provisional agreement 27 November 2025). Expected in force 2027.*

**Card-on-file payments structurally outside PAD switching scope (R3)**

PAD Article 10 covers direct debit mandates and standing orders. Card-on-file payments are outside its scope because the payment instruction originates with the merchant against a card number, not a bank account. NatWest states this explicitly on its switch page: customers must update card details manually "in the same way as you would now if your card expired." Starling Bank's switch page confirms the same exclusion. This is not a product decision by any bank. It is a structural consequence of how Visa and Mastercard store credentials at the merchant. No bank in scope can change it unilaterally; only scheme-level tooling (T2) or legislative extension of PAD scope can close it.

This finding bears directly on O1 and O7. Both opportunities address the gap this regulation creates.

*Instrument: Directive 2014/92/EU Article 10, interpreted through Visa and Mastercard stored credential network rules. In force since 2016.*

---

## Participants selected for profiling

| Participant | Type | Standing | Represents | Profiled |
|---|---|---|---|---|
| CSOB | direct | leader | R1, R3 | yes - round 1 |
| Komercni banka | direct | leader | R1, B1 | yes - round 1 |
| Air Bank | direct | innovator | B2, T3 | yes - round 1 |
| Starling Bank | direct | innovator | B2, T1 | yes - round 1 |
| Monzo | direct | innovator | B2, B3, T1 | yes - round 1 |
| Revolut | direct | innovator | B2, B3 | yes - round 1 |
| NatWest | direct | leader | T1, R3 | yes - round 1 |
| Self-managed switch | substitute | leader | B1 | yes - round 1 |
| Moneta Money Bank | direct | leader | R1 | yes - round 2 |
| Lloyds Bank | direct | leader | T1, R3 | yes - round 2 |
| Raiffeisenbank CZ | direct | leader | - | not profiled |
| mBank CZ | direct | innovator | B2 | not profiled |
| Branch adviser switch | substitute | leader | B1 | not profiled |

Raiffeisenbank CZ is not profiled because its Czech incumbent position is covered by CSOB and KB, and no material differentiation in switching approach is expected. mBank CZ is not profiled because Air Bank covers the Czech digital challenger position with a stronger evidence base. The branch-adviser substitute maps onto the same friction points as the self-managed substitute; profiling both would produce a duplicate finding set.

T2 is unrepresented. The technology is commercially available but no participant in this competitive set has deployed it in a consumer switching journey.

---

## What we could not establish

No CASS-equivalent switching statistics exist for the Czech market in English-language public material. Czech banks do not publish switching volumes. The Czech switching completion rate cited in stage 2 was derived from run material, not confirmed by a Czech banking authority or regulator. The PAD annual report from the European Banking Authority would be the authoritative source; it was not accessed in this run.

---

## How this was produced

Research used 6 of 8 permitted landscape-mapping search iterations. All findings derive from the quarantine bridge's structured extract; no raw page text was written into this document. The egress regime in force is pilot-test. No CS-approved endpoint exists; all searches used the substrate's own search and fetch capability as the single named destination in egress.yaml for this regime. Material produced under pilot-test is not equivalent to material produced under an approved endpoint. Every artifact in this stage carries egress_basis: pilot-test.
