---
run_id: 2026-08-account-switching
record_id: A6-r06
artifact_id: A6
item_id: kb.cz
produced_at: "2026-08-26"
bounds_hit: []
trace_id: []
sources:
  - A5
external_sources:
  - S-kb-switch-your-bank-page-english-language-kb-cz-
  - S-kb-kb-plus-product-page-kb-cz-en
  - S-kb-standard-plan-account-page-kb-cz-en
  - S-societegenerale-komercni-banka-subsidiary-profil
  - S-thebanks-komercni-banka-profile-czech-republic
  - S-en-komercni-banka-article
  - S-pickthebank-komercni-banka-current-account-compa
  - S-trustpilot-komercni-banka-kb-cz-customer-review
  - S-temenos-komercni-banka-goes-live-temenos-core-dig
egress_basis: pilot-test
could_not_verify:
  - rule: "fetches through the quarantine bridge and derives from the extract, never raw text; a failed branch is unprofiled with a reason"
    needs: judge
    reach: process
card:
  identity_key: kb.cz
  name: Komercni banka
  type: direct
  represents:
    - R1
    - B1
  standing: leader
  researched_at: "2026-08-26"
  confidence: high
  sources:
    - publisher_key: kb.cz
      ref: S-kb-switch-your-bank-page-english-language-kb-cz-
      publisher: Komercni banka
      accessed: "2026-08-26"
    - publisher_key: kb.cz
      ref: S-kb-kb-plus-product-page-kb-cz-en
      publisher: Komercni banka
      accessed: "2026-08-26"
    - publisher_key: kb.cz
      ref: S-kb-standard-plan-account-page-kb-cz-en
      publisher: Komercni banka
      accessed: "2026-08-26"
    - publisher_key: societegenerale.com
      ref: S-societegenerale-komercni-banka-subsidiary-profil
      publisher: Societe Generale
      accessed: "2026-08-26"
    - publisher_key: thebanks.eu
      ref: S-thebanks-komercni-banka-profile-czech-republic
      publisher: The Banks EU
      accessed: "2026-08-26"
    - publisher_key: en.wikipedia.org
      ref: S-en-komercni-banka-article
      publisher: Wikipedia
      accessed: "2026-08-26"
    - publisher_key: pickthebank.eu
      ref: S-pickthebank-komercni-banka-current-account-compa
      publisher: Pick the Bank
      accessed: "2026-08-26"
    - publisher_key: trustpilot.com
      ref: S-trustpilot-komercni-banka-kb-cz-customer-review
      publisher: Trustpilot
      accessed: "2026-08-26"
    - publisher_key: temenos.com
      ref: S-temenos-komercni-banka-goes-live-temenos-core-dig
      publisher: Temenos
      accessed: "2026-08-26"
---
