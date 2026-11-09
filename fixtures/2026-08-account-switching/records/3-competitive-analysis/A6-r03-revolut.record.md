---
run_id: 2026-08-account-switching
record_id: A6-r03
artifact_id: A6
item_id: revolut.com
produced_at: "2026-08-26"
bounds_hit: []
trace_id: []
sources:
  - A5
external_sources:
  - S-en-revolut-article
  - S-moneyweek-revolut-bank-review-2026-and-cass-cove
  - S-pocketwise-revolut-uk-bank-account-review-2026
  - S-fintechcompass-revolut-uk-banking-licence-and-ca
  - S-techcrunch-revolut-uk-banking-licence-pra-fca-ap
  - S-currentaccountswitch-cass-participating-institut
  - S-bankinggeek-revolut-current-account-review-2026
  - S-goodmoneyguide-revolut-customer-review-2026
egress_basis: pilot-test
could_not_verify:
  - rule: "fetches through the quarantine bridge and derives from the extract, never raw text; a failed branch is unprofiled with a reason"
    needs: judge
    reach: process
card:
  identity_key: revolut.com
  name: Revolut
  type: direct
  represents:
    - B2
    - B3
  standing: innovator
  researched_at: "2026-08-26"
  confidence: medium
  primary_unreachable: true
  sources:
    - publisher_key: en.wikipedia.org
      ref: S-en-revolut-article
      publisher: Wikipedia
      accessed: "2026-08-26"
    - publisher_key: moneyweek.com
      ref: S-moneyweek-revolut-bank-review-2026-and-cass-cove
      publisher: MoneyWeek
      accessed: "2026-08-26"
    - publisher_key: pocketwise.co.uk
      ref: S-pocketwise-revolut-uk-bank-account-review-2026
      publisher: Pocketwise
      accessed: "2026-08-26"
    - publisher_key: fintechcompass.net
      ref: S-fintechcompass-revolut-uk-banking-licence-and-ca
      publisher: Fintech Compass
      accessed: "2026-08-26"
    - publisher_key: techcrunch.com
      ref: S-techcrunch-revolut-uk-banking-licence-pra-fca-ap
      publisher: TechCrunch
      accessed: "2026-08-26"
    - publisher_key: currentaccountswitch.co.uk
      ref: S-currentaccountswitch-cass-participating-institut
      publisher: Current Account Switch Service
      accessed: "2026-08-26"
    - publisher_key: bankinggeek.com
      ref: S-bankinggeek-revolut-current-account-review-2026
      publisher: Banking Geek
      accessed: "2026-08-26"
    - publisher_key: goodmoneyguide.com
      ref: S-goodmoneyguide-revolut-customer-review-2026
      publisher: Good Money Guide
      accessed: "2026-08-26"
---
