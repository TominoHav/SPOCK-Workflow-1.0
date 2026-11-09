---
run_id: 2026-08-account-switching
record_id: A6-r02
artifact_id: A6
item_id: monzo.com
produced_at: "2026-08-26T15:00:00Z"
bounds_hit: []
trace_id: []
sources:
  - A5
external_sources:
  - S-monzo-cass-switching-page-get-paid-early-page-sa
  - S-en-monzo-article
  - S-finder-monzo-bank-account-review-2026
  - S-moneytothemasses-monzo-current-account-review
  - S-moneysupermarket-monzo-account-comparison-listin
  - S-currentaccountswitch-cass-net-switching-data-q3-
  - S-smartmoneypeople-monzo-current-account-reviews
  - S-fintechmagazine-monzo-fy26-results
egress_basis: pilot-test
could_not_verify:
  - rule: "fetches through the quarantine bridge and derives from the extract, never raw text; a failed branch is unprofiled with a reason"
    needs: judge
    reach: process
card:
  identity_key: monzo.com
  name: Monzo
  researched_at: "2026-08-26"
  confidence: high
  sources:
    - publisher_key: monzo.com
      ref: S-monzo-cass-switching-page-get-paid-early-page-sa
      publisher: Monzo
      accessed: "2026-08-26"
    - publisher_key: en.wikipedia.org
      ref: S-en-monzo-article
      publisher: Wikipedia
      accessed: "2026-08-26"
    - publisher_key: finder.com
      ref: S-finder-monzo-bank-account-review-2026
      publisher: Finder
      accessed: "2026-08-26"
    - publisher_key: moneytothemasses.com
      ref: S-moneytothemasses-monzo-current-account-review
      publisher: Money to the Masses
      accessed: "2026-08-26"
    - publisher_key: moneysupermarket.com
      ref: S-moneysupermarket-monzo-account-comparison-listin
      publisher: MoneySuperMarket
      accessed: "2026-08-26"
    - publisher_key: currentaccountswitch.co.uk
      ref: S-currentaccountswitch-cass-net-switching-data-q3-
      publisher: Current Account Switch Service
      accessed: "2026-08-26"
    - publisher_key: smartmoneypeople.com
      ref: S-smartmoneypeople-monzo-current-account-reviews
      publisher: Smart Money People
      accessed: "2026-08-26"
    - publisher_key: fintechmagazine.com
      ref: S-fintechmagazine-monzo-fy26-results
      publisher: FinTech Magazine
      accessed: "2026-08-26"
---
