---
artifact_id: A5
record_id: A5-r01
version: r01
run_id: "2026-08-account-switching"
produced_at: "2026-08-26T10:00:00Z"
produced_by: landscape-mapping@0.1
trace_id: "CA-a-2026-08-26-A5"
egress_basis: pilot-test
standards_basis: "Competitive Analysis Standards v0.4, section 6 self-assessed as met"
could_not_verify:
  - rule: "authored only from the quarantine bridge's structured extract, never from raw external text"
    needs: judge
    reach: process
bounds:
  participants_limit: 25
  deep_dive_limit: 8
  search_iterations: 8
  search_iterations_used: 6
  bounds_hit: false

scope: "Moving a main banking relationship from one provider to another for retail current-account holders. Primary competitive set: Czech retail banks operating under PAD. Comparator set: UK banks with established CASS participation, used to establish what settled practice looks like and where its limits are."

trends:
  - id: B1
    class: business
    name: "Main-bank inertia concentrated in the payment attachment gap"
    confidence: high
    horizon: short
    trajectory: mature
    evidence: "CASS recorded 1,054,521 switches in 2025 against a UK current-account base of approximately 70 million accounts, a take-up rate below 2%. Czech market research cited in stage 2 found approximately one-third of initiated switches incomplete. The structural cause is consistent: direct debits and standing orders transfer automatically, but card-linked payments (subscriptions, recurring charges) and employer salary notifications do not. The gap between what the scheme covers and what a customer needs to move creates enough residual friction that most do not start."

  - id: B2
    class: business
    name: "Digital challengers using switching gains as a growth metric"
    confidence: high
    horizon: medium
    trajectory: growing
    evidence: "Monzo reported 9,934 net CASS gains in Q3 2025. Starling Bank reported 4.6 million accounts in its 2025 annual report, a 10% increase from 4.2 million. Nationwide reported 41,450 net CASS gains in Q3 2025. These challengers publish switching numbers where incumbents do not, and have built product features (Monzo Salary Sorter, Revolut Early Salary) specifically to accelerate salary capture after a switch completes."

  - id: B3
    class: business
    name: "Salary receipt as the operational signal for main-bank status"
    confidence: high
    horizon: short
    trajectory: mature
    evidence: "Monzo Salary Sorter automatically divides incoming salary across Pots the moment it arrives. Revolut Early Salary releases the payment 24 hours before the standard clearing date. Both features target the moment salary hits the account as the one event that defines primary banking relationship. The competitive inference is that whoever receives salary has the main-bank position, and product design has converged on that signal rather than account tenure or product count."

  - id: T1
    class: technology
    name: "Standardized 7-working-day switching infrastructure"
    confidence: high
    horizon: short
    trajectory: mature
    evidence: "CASS (UK) completed 99.8% of switches within 7 working days in 2025 across 50+ participating institutions. PAD 2014/92/EU mandates the same 15-business-day timeline for EU member states. The infrastructure transfers balance, direct debits, and standing orders; redirects incoming payments for 3 years (UK) or 13 months (PAD minimum). NatWest publishes a Day 1 to Day 6-7 timeline on its switch page. Czech banks including KB, CSOB, and Moneta offer the PAD-mandated service but publish less detail about what each day involves."

  - id: T2
    class: technology
    name: "Automated card-linked payment migration tooling"
    confidence: high
    horizon: short
    trajectory: emerging
    evidence: "Galileo Financial Technologies (SoFi Technologies subsidiary) launched Galileo Payment Switch in May 2025, enabling banks to automatically migrate card-on-file credentials across merchants when a customer switches. Visa announced Enhanced Subscription Manager in 2026, allowing merchants to receive automatic card credential updates rather than waiting for customer action. Neither tool has been confirmed in deployment by any retail banking participant in this competitive set. The tooling exists; no bank in scope has integrated it into a consumer switching journey."

  - id: T3
    class: technology
    name: "AISP-enabled visibility of old-account payment activity for switchers"
    confidence: high
    horizon: short
    trajectory: emerging
    evidence: "PSD3 and PSR (provisional agreement November 2025, expected in force 2027) require payment service providers to allow consumers to see their full payment history via authorised third-party access. A 2025 consumer survey found 75% of respondents expect their new bank to show them what is still running on the old account. No participant in this set has confirmed a product feature that uses open banking API access to show a switcher their old-account recurring payments in the new account's interface. Air Bank, as the most digitally advanced Czech retail bank, is the most likely to have the capability; this is unconfirmed."

  - id: R1
    class: regulatory
    name: "EU PAD mandating standardized account switching services"
    instrument: "Directive 2014/92/EU of the European Parliament and of the Council of 23 July 2014 on the comparability of fees related to payment accounts, payment account switching and access to payment accounts with basic features (Payment Accounts Directive)"
    effective: "In force since 18 September 2016; transposed into Czech law, binding on all Czech banks"
    confidence: high
    horizon: short
    trajectory: mature
    evidence: "PAD Article 10 requires member-state credit institutions to offer a switching service covering transfer of standing orders, direct debit mandates, and incoming credit redirections within 15 business days. Czech banks operate this service. The directive defines the floor; it does not define the ceiling, so differentiation above the floor is permitted and pursued by UK challengers in particular."

  - id: R2
    class: regulatory
    name: "PSD3 and PSR extending open banking access and payment service standards"
    instrument: "PSD3 (revised Payment Services Directive) and PSR (Payment Services Regulation) - provisional trilogue agreement reached 27 November 2025"
    effective: "Expected entry into force 2027; member state transposition period 18 months thereafter; Czech national implementation date not yet published"
    confidence: high
    horizon: medium
    trajectory: growing
    evidence: "PSD3/PSR require payment account providers to give consumers and authorised third parties access to payment data and permission dashboards. The relevance for account switching is direct: a permission dashboard that shows all active payment mandates on an account would make the invisible card-on-file gap visible to the customer. No Czech bank has confirmed a roadmap item for this use case."

  - id: R3
    class: regulatory
    name: "Card-on-file payments structurally outside PAD switching scope"
    instrument: "Directive 2014/92/EU Article 10 (scope of switching obligation), interpreted through Visa and Mastercard card scheme network rules on stored credential transactions"
    effective: "Scope limitation in force since 2016; card scheme stored credential rules pre-date PAD"
    confidence: high
    horizon: short
    trajectory: mature
    evidence: "PAD Article 10 covers direct debit mandates and standing orders only. Card-on-file payments (subscriptions, recurring charges stored by merchants against a specific card number) are outside the directive's scope because the payment instruction originates with the merchant against a card number, not a bank account. NatWest publishes explicitly: customers must update card details manually in the same way as they would if their card expired. Starling Bank's switch page confirms the same exclusion."

participants:
  - identity_key: csob.cz
    name: "CSOB"
    type: direct
    standing: leader
    represents: [R1, R3]
    deep_dive: true
    round: 1
    reason: "Largest Czech retail bank by customers and assets; primary direct competitor for any switching scenario in the Czech market"

  - identity_key: kb.cz
    name: "Komercni banka"
    type: direct
    standing: leader
    represents: [R1, B1]
    deep_dive: true
    round: 1
    reason: "Second-largest Czech retail bank with the only English-language switching page among Czech banks; key benchmark for Czech market transparency on switching"

  - identity_key: airbank.cz
    name: "Air Bank"
    type: direct
    standing: innovator
    represents: [B2, T3]
    deep_dive: true
    round: 1
    reason: "Digitally differentiated Czech challenger with nine consecutive KPMG CX awards; most likely Czech bank to have developed above-floor switching capability"

  - identity_key: moneta.cz
    name: "Moneta Money Bank"
    type: direct
    standing: leader
    represents: [R1]
    deep_dive: true
    round: 2
    reason: "Fourth major Czech retail bank with a stated digital leadership ambition; included to determine whether Czech digital investment extends to the switching journey"

  - identity_key: rb.cz
    name: "Raiffeisenbank CZ"
    type: direct
    standing: leader
    represents: []
    deep_dive: false
    reason: "Czech Ring 1 incumbent; included in landscape scope, not profiled because CSOB and KB cover the same incumbent archetype with stronger evidence"

  - identity_key: mbank.cz
    name: "mBank CZ"
    type: direct
    standing: innovator
    represents: [B2]
    deep_dive: false
    reason: "Czech digital challenger; included in landscape scope, not profiled because Air Bank covers the same challenger archetype with stronger evidence and CX recognition"

  - identity_key: starlingbank.com
    name: "Starling Bank"
    type: direct
    standing: innovator
    represents: [B2, T1]
    deep_dive: true
    round: 1
    reason: "UK neobank with published switching volumes and a fully digital CASS journey; benchmark for what a documented, digital-first switching service looks like"

  - identity_key: monzo.com
    name: "Monzo"
    type: direct
    standing: innovator
    represents: [B2, B3, T1]
    deep_dive: true
    round: 1
    reason: "UK neobank with highest published net CASS gains and salary features designed specifically for post-switch activation; benchmark for challenger switching strategy"

  - identity_key: revolut.com
    name: "Revolut"
    type: direct
    standing: innovator
    represents: [B2, B3]
    deep_dive: true
    round: 1
    reason: "UK neobank with Early Salary feature and new banking licence since March 2026; second data point on salary-moment product design alongside Monzo"

  - identity_key: natwest.com
    name: "NatWest"
    type: direct
    standing: leader
    represents: [T1, R3]
    deep_dive: true
    round: 1
    reason: "UK incumbent with published day-by-day switching timeline and explicit card-on-file exclusion statement; primary benchmark for switching documentation standards"

  - identity_key: lloydsbank.com
    name: "Lloyds Bank"
    type: direct
    standing: leader
    represents: [T1, R3]
    deep_dive: true
    round: 2
    reason: "UK incumbent with highest published cash switch incentive; included to assess whether incentive spend is a substitute for journey improvement"

  - identity_key: "substitute:self-managed-switch"
    name: "Self-managed switch (no guided service)"
    type: substitute
    standing: leader
    represents: [B1]
    deep_dive: true
    round: 1
    reason: "Customer-managed account transition without any bank-provided switching service; establishes the friction baseline and the residual need this run addresses"

  - identity_key: "substitute:branch-adviser"
    name: "Branch adviser-assisted switch"
    type: substitute
    standing: leader
    represents: [B1]
    deep_dive: false
    reason: "Branch-assisted variant of the self-managed approach; included in landscape scope, not profiled because friction maps to the same set as the self-managed substitute"

reused: []
unrepresented_trends: [T2, R2]
unprofiled:
  - identity_key: rb.cz
    reason: "Czech Ring 1 incumbent position covered by CSOB and KB with stronger evidence base; no material differentiation in switching approach expected"
  - identity_key: mbank.cz
    reason: "Czech digital challenger position covered by Air Bank; Air Bank has higher profile, stronger evidence, and 9x CX award baseline that mBank cannot match"
  - identity_key: "substitute:branch-adviser"
    reason: "The branch-adviser substitute journey maps onto the same friction points as the self-managed substitute; profiling both would produce a duplicate finding set"
---
