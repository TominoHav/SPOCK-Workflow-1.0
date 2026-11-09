---
run_id: 2026-08-account-switching
record_id: A6-r04
artifact_id: A6
item_id: "natwest.com"
produced_at: "2026-08-26"
bounds_hit: []
trace_id: []
sources:
  - A5
external_sources:
  - S-natwest-switch-to-natwest-page-including-explici
  - S-which-natwest-current-account-review-and-cass-da
  - S-anna-uk-bank-switching-comparison-2026
  - S-bankinggeek-natwest-switching-service-review
  - S-swiftmoney-best-bank-account-switch-offers-uk-20
  - S-currentaccountswitch-cass-net-switching-data-q3-
  - S-finder-natwest-current-accounts-2026
  - S-pocketwise-natwest-fees-2026
  - S-trustpilot-natwest-customer-reviews-2026
egress_basis: pilot-test
could_not_verify:
  - rule: "fetches through the quarantine bridge and derives from the extract, never raw text; a failed branch is unprofiled with a reason"
    needs: judge
    reach: process
card:
  identity_key: natwest.com
  name: "NatWest"
  researched_at: "2026-08-26"
  confidence: high
  sources:
    - publisher_key: natwest.com
      ref: S-natwest-switch-to-natwest-page-including-explici
      publisher: "NatWest"
      accessed: "2026-08-26"
    - publisher_key: which.co.uk
      ref: S-which-natwest-current-account-review-and-cass-da
      publisher: "Which?"
      accessed: "2026-08-26"
    - publisher_key: anna.money
      ref: S-anna-uk-bank-switching-comparison-2026
      publisher: "Anna Money"
      accessed: "2026-08-26"
    - publisher_key: bankinggeek.com
      ref: S-bankinggeek-natwest-switching-service-review
      publisher: "Banking Geek"
      accessed: "2026-08-26"
    - publisher_key: swiftmoney.com
      ref: S-swiftmoney-best-bank-account-switch-offers-uk-20
      publisher: "Swift Money"
      accessed: "2026-08-26"
    - publisher_key: currentaccountswitch.co.uk
      ref: S-currentaccountswitch-cass-net-switching-data-q3-
      publisher: "Current Account Switch Service"
      accessed: "2026-08-26"
    - publisher_key: finder.com
      ref: S-finder-natwest-current-accounts-2026
      publisher: "Finder"
      accessed: "2026-08-26"
    - publisher_key: pocketwise.co.uk
      ref: S-pocketwise-natwest-fees-2026
      publisher: "Pocketwise"
      accessed: "2026-08-26"
    - publisher_key: trustpilot.com
      ref: S-trustpilot-natwest-customer-reviews-2026
      publisher: "Trustpilot"
      accessed: "2026-08-26"
---
