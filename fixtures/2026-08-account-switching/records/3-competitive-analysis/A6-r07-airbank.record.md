---
run_id: 2026-08-account-switching
record_id: A6-r07
artifact_id: A6
item_id: airbank.cz
produced_at: "2026-08-26"
bounds_hit: []
trace_id: []
sources:
  - A5
external_sources:
  - S-ppf-ppf-group-annual-report-2025-air-bank-segmen
  - S-kpmg-kpmg-cx-top-100-brands-2025-customer-bank-o
  - S-thebanks-air-bank-profile-czech-republic
  - S-en-air-bank-article
  - S-bankycr-air-bank-digital-strategy-and-product-an
  - S-pickthebank-air-bank-current-account-comparison-
  - S-trustpilot-air-bank-customer-reviews-airbank-cz
  - S-wise-air-bank-international-payment-fees-czechia
  - S-aroundprague-best-bank-in-czechia-air-bank
egress_basis: pilot-test
could_not_verify:
  - rule: "fetches through the quarantine bridge and derives from the extract, never raw text; a failed branch is unprofiled with a reason"
    needs: judge
    reach: process
card:
  identity_key: airbank.cz
  name: Air Bank
  type: direct
  represents:
    - B2
    - T3
  standing: innovator
  researched_at: "2026-08-26"
  sources:
    - publisher_key: ppf.eu
      ref: S-ppf-ppf-group-annual-report-2025-air-bank-segmen
      publisher: PPF Group
      accessed: "2026-08-26"
    - publisher_key: kpmg.com
      ref: S-kpmg-kpmg-cx-top-100-brands-2025-customer-bank-o
      publisher: KPMG
      accessed: "2026-08-26"
    - publisher_key: thebanks.eu
      ref: S-thebanks-air-bank-profile-czech-republic
      publisher: The Banks EU
      accessed: "2026-08-26"
    - publisher_key: en.wikipedia.org
      ref: S-en-air-bank-article
      publisher: Wikipedia
      accessed: "2026-08-26"
    - publisher_key: bankycr.cz
      ref: S-bankycr-air-bank-digital-strategy-and-product-an
      publisher: Banky CR
      accessed: "2026-08-26"
    - publisher_key: pickthebank.eu
      ref: S-pickthebank-air-bank-current-account-comparison-
      publisher: Pick the Bank
      accessed: "2026-08-26"
    - publisher_key: trustpilot.com
      ref: S-trustpilot-air-bank-customer-reviews-airbank-cz
      publisher: Trustpilot
      accessed: "2026-08-26"
    - publisher_key: wise.com
      ref: S-wise-air-bank-international-payment-fees-czechia
      publisher: Wise
      accessed: "2026-08-26"
    - publisher_key: aroundprague.cz
      ref: S-aroundprague-best-bank-in-czechia-air-bank
      publisher: Around Prague
      accessed: "2026-08-26"
  confidence: medium
  primary_unreachable: true
---
