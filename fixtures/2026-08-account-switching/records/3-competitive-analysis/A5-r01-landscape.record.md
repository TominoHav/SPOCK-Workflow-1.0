---
run_id: 2026-08-account-switching
record_id: A5-r01
artifact_id: A5
item_id: ""
produced_at: "2026-08-26"
bounds_hit: []
trace_id: []
sources:
  - A1
  - A4
  - A3b
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

topic: "Account switching for retail current-account holders moving their main banking relationship from one provider to another"

trends:
  - id: B1
    represents: []
    class: business
    name: "Main-bank inertia concentrated in the payment attachment gap"
  - id: B2
    represents: []
    class: business
    name: "Digital challengers using switching gains as a growth metric"
  - id: B3
    represents: []
    class: business
    name: "Salary receipt as the operational signal for main-bank status"
  - id: T1
    represents: []
    class: technology
    name: "Standardized 7-working-day switching infrastructure"
  - id: T2
    represents: []
    class: technology
    name: "Automated card-linked payment migration tooling"
  - id: T3
    represents: []
    class: technology
    name: "AISP-enabled visibility of old-account payment activity for switchers"
  - id: R1
    represents: []
    class: regulatory
    name: "EU PAD mandating standardized account switching services"
    instrument: "Directive 2014/92/EU of the European Parliament and of the Council of 23 July 2014 (Payment Accounts Directive)"
    effective: "In force since 18 September 2016; transposed into Czech law"
  - id: R2
    represents: []
    class: regulatory
    name: "PSD3 and PSR extending open banking access and payment service standards"
    instrument: "PSD3 (revised Payment Services Directive) and PSR (Payment Services Regulation), provisional trilogue agreement reached 27 November 2025"
    effective: "Expected entry into force 2027; member state transposition 18 months thereafter; Czech national implementation date not yet published"
  - id: R3
    represents: []
    class: regulatory
    name: "Card-on-file payments structurally outside PAD switching scope"
    instrument: "Directive 2014/92/EU Article 10, interpreted through Visa and Mastercard stored credential network rules"
    effective: "Scope limitation in force since 2016; card scheme stored credential rules pre-date PAD"

participants:
  - identity_key: csob.cz
    name: "CSOB"
    type: direct
    first_seen: "2026-03-investor-onboarding"
    represents:
      - R1
      - R3
    standing: leader
    deep_dive: true
    reason: "Largest Czech retail bank by customers and assets; primary direct competitor for any switching scenario in the Czech market"
  - identity_key: kb.cz
    name: "Komercni banka"
    type: direct
    first_seen: "2026-03-investor-onboarding"
    represents:
      - R1
      - B1
    standing: leader
    deep_dive: true
    reason: "Second-largest Czech retail bank with the only English-language switching page among Czech banks; key benchmark for Czech market transparency on switching"
  - identity_key: airbank.cz
    name: "Air Bank"
    type: direct
    first_seen: "2026-04-card-disputes"
    represents:
      - B2
      - T3
    standing: innovator
    deep_dive: true
    reason: "Digitally differentiated Czech challenger with nine consecutive KPMG CX awards; most likely Czech bank to have developed above-floor switching capability"
  - identity_key: moneta.cz
    name: "Moneta Money Bank"
    type: direct
    first_seen: "2026-03-investor-onboarding"
    represents:
      - R1
    standing: leader
    deep_dive: true
    reason: "Fourth major Czech retail bank with a stated digital leadership ambition; included to determine whether Czech digital investment extends to the switching journey"
  - identity_key: rb.cz
    name: "Raiffeisenbank CZ"
    type: direct
    first_seen: "2026-01-mortgage-onboarding"
    represents: []
    standing: leader
    deep_dive: false
    reason: "Czech incumbent position covered by CSOB and KB with stronger evidence base; no material differentiation in switching approach expected"
  - identity_key: mbank.cz
    name: "mBank CZ"
    type: direct
    first_seen: "2026-01-mortgage-onboarding"
    represents:
      - B2
    standing: innovator
    deep_dive: false
    reason: "Czech digital challenger position covered by Air Bank, which carries stronger evidence and nine consecutive KPMG CX awards"
  - identity_key: starlingbank.com
    name: "Starling Bank"
    type: direct
    first_seen: "2026-06-instant-payment-disputes"
    represents:
      - B2
      - T1
    standing: innovator
    deep_dive: true
    reason: "UK neobank with published switching volumes and a fully digital CASS journey; benchmark for what a documented, digital-first switching service looks like"
  - identity_key: monzo.com
    name: "Monzo"
    type: direct
    first_seen: "2026-04-card-disputes"
    represents:
      - B2
      - B3
      - T1
    standing: innovator
    deep_dive: true
    reason: "UK neobank with highest published net CASS gains and salary features designed specifically for post-switch activation; benchmark for challenger switching strategy"
  - identity_key: revolut.com
    name: "Revolut"
    type: direct
    first_seen: "2026-04-card-disputes"
    represents:
      - B2
      - B3
    standing: innovator
    deep_dive: true
    reason: "UK neobank with Early Salary feature and banking licence since March 2026; second data point on salary-moment product design alongside Monzo"
  - identity_key: natwest.com
    name: "NatWest"
    type: direct
    first_seen: "2026-06-instant-payment-disputes"
    represents:
      - T1
      - R3
    standing: leader
    deep_dive: true
    reason: "UK incumbent with published day-by-day switching timeline and explicit card-on-file exclusion statement; primary benchmark for switching documentation standards"
  - identity_key: lloydsbank.com
    name: "Lloyds Bank"
    type: direct
    first_seen: "2026-07-standing-orders"
    represents:
      - T1
      - R3
    standing: leader
    deep_dive: true
    reason: "UK incumbent with the highest published cash switch incentive; included to assess whether incentive spend substitutes for journey improvement"
  - identity_key: "substitute:self-managed-switch"
    name: "Self-managed switch (no guided service)"
    type: substitute
    first_seen: "2026-08-account-switching"
    represents:
      - B1
    standing: leader
    deep_dive: true
    reason: "Customer-managed account transition without any bank-provided switching service; establishes the friction baseline and the residual need this run addresses"
  - identity_key: "substitute:branch-adviser"
    name: "Branch adviser-assisted switch"
    type: substitute
    first_seen: "2026-08-account-switching"
    represents:
      - B1
    standing: leader
    deep_dive: false
    reason: "Branch-assisted variant of the self-managed approach; friction maps to the same points as the self-managed substitute, so profiling both would produce a duplicate finding set"

scope_field: "Moving a main banking relationship from one provider to another, for retail current-account holders"

reused: []

unprofiled:
  - identity_key: rb.cz
    reason: "Czech incumbent position covered by CSOB and KB with stronger evidence base; no material differentiation in switching approach expected"
  - identity_key: mbank.cz
    reason: "Czech digital challenger position covered by Air Bank, which carries stronger evidence and nine consecutive KPMG CX awards"
  - identity_key: "substitute:branch-adviser"
    reason: "Branch-adviser journey maps onto the same friction points as the self-managed substitute; profiling both would produce a duplicate finding set"

unrepresented_trends:
  - T2
  - R2
---
