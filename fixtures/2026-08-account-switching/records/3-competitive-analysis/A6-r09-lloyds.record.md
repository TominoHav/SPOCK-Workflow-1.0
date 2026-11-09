---
run_id: 2026-08-account-switching
record_id: A6-r09
artifact_id: A6
item_id: "lloydsbank.com"
produced_at: "2026-08-26T00:00:00Z"
bounds_hit: []
trace_id: []
sources:
  - A5
external_sources:
  - S-which-lloyds-bank-current-account-review-and-cas
  - S-gocompare-lloyds-switching-incentive-comparison-
  - S-moneytothemasses-lloyds-bank-account-review-2026
  - S-moneysupermarket-lloyds-bank-account-comparison-
  - S-swiftmoney-uk-bank-switch-cash-offers-2026-inclu
  - S-pocketwise-lloyds-bank-review-and-fees-2026
  - S-selectra-lloyds-bank-current-account-review-2026
  - S-trustpilot-lloyds-bank-customer-reviews-2026
egress_basis: pilot-test
could_not_verify:
  - rule: "fetches through the quarantine bridge and derives from the extract, never raw text; a failed branch is unprofiled with a reason"
    needs: judge
    reach: process
card:
  identity_key: lloydsbank.com
  name: "Lloyds Bank"
  researched_at: "2026-08-26"
  sources:
    - publisher_key: which.co.uk
      ref: S-which-lloyds-bank-current-account-review-and-cas
      publisher: "Which?"
      accessed: "2026-08-26"
    - publisher_key: gocompare.com
      ref: S-gocompare-lloyds-switching-incentive-comparison-
      publisher: "Go Compare"
      accessed: "2026-08-26"
    - publisher_key: moneytothemasses.com
      ref: S-moneytothemasses-lloyds-bank-account-review-2026
      publisher: "Money to the Masses"
      accessed: "2026-08-26"
    - publisher_key: moneysupermarket.com
      ref: S-moneysupermarket-lloyds-bank-account-comparison-
      publisher: "MoneySuperMarket"
      accessed: "2026-08-26"
    - publisher_key: swiftmoney.com
      ref: S-swiftmoney-uk-bank-switch-cash-offers-2026-inclu
      publisher: "Swift Money"
      accessed: "2026-08-26"
    - publisher_key: pocketwise.co.uk
      ref: S-pocketwise-lloyds-bank-review-and-fees-2026
      publisher: "Pocketwise"
      accessed: "2026-08-26"
    - publisher_key: selectra.co.uk
      ref: S-selectra-lloyds-bank-current-account-review-2026
      publisher: "Selectra"
      accessed: "2026-08-26"
    - publisher_key: trustpilot.com
      ref: S-trustpilot-lloyds-bank-customer-reviews-2026
      publisher: "Trustpilot"
      accessed: "2026-08-26"
  confidence: medium
  primary_unreachable: true
---
