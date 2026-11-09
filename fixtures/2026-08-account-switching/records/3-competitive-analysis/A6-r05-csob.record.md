---
run_id: 2026-08-account-switching
record_id: A6-r05
artifact_id: A6
item_id: csob.cz
produced_at: "2026-08-26"
bounds_hit: []
trace_id: []
sources:
  - A5
external_sources:
  - S-kbc-kbc-group-annual-report-2025-czech-republic-
  - S-en-ceskoslovenska-obchodni-banka-article
  - S-camunda-csob-process-automation-case-study-2024
  - S-kyndryl-csob-process-transformation-partnership-2026
  - S-wise-csob-bank-account-review
  - S-ncino-csob-selects-ncino-commercial-sme-lending-2025
  - S-financera-csob-customer-reviews-and-ratings
egress_basis: pilot-test
could_not_verify:
  - rule: "fetches through the quarantine bridge and derives from the extract, never raw text; a failed branch is unprofiled with a reason"
    needs: judge
    reach: process
card:
  identity_key: csob.cz
  name: CSOB
  researched_at: "2026-08-26"
  confidence: medium
  primary_unreachable: "csob.cz returned HTTP 500 on 26 August 2026. Pages attempted: main site, payment system and regulatory compliance page (csob.cz/en/csob/payment-system-and-regulatory-compliance), English-language price list PDF valid from 1 July 2026 (csob.cz/documents/10710/1232445/sazebnik-fo-en.pdf). All returned HTTP 500. No primary content was retrieved. Card rests on seven secondary publishers."
  sources:
    - publisher_key: kbc.com
      publisher: "KBC Group"
      ref: "S-kbc-kbc-group-annual-report-2025-czech-republic-"
      accessed: "2026-08-26"
    - publisher_key: en.wikipedia.org
      publisher: "Wikipedia"
      ref: "S-en-ceskoslovenska-obchodni-banka-article"
      accessed: "2026-08-26"
    - publisher_key: camunda.com
      publisher: "Camunda"
      ref: "S-camunda-csob-process-automation-case-study-2024"
      accessed: "2026-08-26"
    - publisher_key: kyndryl.com
      publisher: "Kyndryl"
      ref: "S-kyndryl-csob-process-transformation-partnership-2026"
      accessed: "2026-08-26"
    - publisher_key: wise.com
      publisher: "Wise"
      ref: "S-wise-csob-bank-account-review"
      accessed: "2026-08-26"
    - publisher_key: ncino.com
      publisher: "nCino"
      ref: "S-ncino-csob-selects-ncino-commercial-sme-lending-2025"
      accessed: "2026-08-26"
    - publisher_key: financera.cz
      publisher: "Financera"
      ref: "S-financera-csob-customer-reviews-and-ratings"
      accessed: "2026-08-26"
---
