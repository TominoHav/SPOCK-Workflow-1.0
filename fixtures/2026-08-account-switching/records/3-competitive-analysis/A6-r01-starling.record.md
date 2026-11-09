---
run_id: 2026-08-account-switching
record_id: A6-r01
artifact_id: A6
item_id: starlingbank.com
produced_at: "2026-08-26"
bounds_hit: []
trace_id: []
sources:
  - A5
external_sources:
  - S-starlingbank-account-switching-help-page-and-fea
  - S-en-starling-bank-article
  - S-bankadvisor-starling-bank-review-2025
  - S-moneyweek-starling-bank-review-and-account-compa
  - S-moneysupermarket-starling-bank-comparison-listin
  - S-moneytothemasses-starling-bank-current-account-r
  - S-pocketwise-starling-bank-fees-uk-2026
  - S-goodmoneyguide-starling-bank-review-2025
  - S-trustpilot-starling-bank-customer-reviews
egress_basis: pilot-test
could_not_verify:
  - rule: "fetches through the quarantine bridge and derives from the extract, never raw text; a failed branch is unprofiled with a reason"
    needs: judge
    reach: process

card:
  identity_key: starlingbank.com
  name: Starling Bank
  type: direct
  represents:
    - B2
    - T1
  standing: innovator
  researched_at: "2026-08-26"
  confidence: high
  sources:
    - publisher_key: starlingbank.com
      ref: S-starlingbank-account-switching-help-page-and-fea
      publisher: Starling Bank
      accessed: "2026-08-26"
    - publisher_key: en.wikipedia.org
      ref: S-en-starling-bank-article
      publisher: Wikipedia
      accessed: "2026-08-26"
    - publisher_key: bankadvisor.co.uk
      ref: S-bankadvisor-starling-bank-review-2025
      publisher: Bank Advisor
      accessed: "2026-08-26"
    - publisher_key: moneyweek.com
      ref: S-moneyweek-starling-bank-review-and-account-compa
      publisher: MoneyWeek
      accessed: "2026-08-26"
    - publisher_key: moneysupermarket.com
      ref: S-moneysupermarket-starling-bank-comparison-listin
      publisher: MoneySuperMarket
      accessed: "2026-08-26"
    - publisher_key: moneytothemasses.com
      ref: S-moneytothemasses-starling-bank-current-account-r
      publisher: Money to the Masses
      accessed: "2026-08-26"
    - publisher_key: pocketwise.co.uk
      ref: S-pocketwise-starling-bank-fees-uk-2026
      publisher: Pocketwise
      accessed: "2026-08-26"
    - publisher_key: goodmoneyguide.com
      ref: S-goodmoneyguide-starling-bank-review-2025
      publisher: Good Money Guide
      accessed: "2026-08-26"
    - publisher_key: trustpilot.com
      ref: S-trustpilot-starling-bank-customer-reviews
      publisher: Trustpilot
      accessed: "2026-08-26"
---
