---
run_id: 2026-08-account-switching
record_id: A6-r08
artifact_id: A6
item_id: "substitute:self-managed-switch"
produced_at: "2026-08-26"
bounds_hit: []
trace_id: []
sources:
  - A5
external_sources:
  - S-which-how-to-switch-bank-accounts-self-managed-s
  - S-moneysavingexpert-bank-account-switching-guide-s
  - S-moneytothemasses-diy-bank-switching-how-to-move-
  - S-citizensadvice-moving-bank-accounts-what-you-nee
  - S-gocompare-self-managed-bank-account-switch-pros-
  - S-currentaccountswitch-cass-what-the-service-cover
  - S-moneysupermarket-switching-bank-accounts-guide
could_not_verify:
  - rule: "fetches through the quarantine bridge and derives from the extract, never raw text; a failed branch is unprofiled with a reason"
    needs: judge
    reach: process
egress_basis: pilot-test
card:
  identity_key: "substitute:self-managed-switch"
  name: "Self-managed switch (no guided service)"
  type: substitute
  represents:
    - B1
  standing: leader
  researched_at: "2026-08-26"
  confidence: medium
  sources:
    - publisher_key: "which.co.uk"
      ref: "S-which-how-to-switch-bank-accounts-self-managed-s"
      publisher: "Which?"
      accessed: "2026-08-26"
    - publisher_key: "moneysavingexpert.com"
      ref: "S-moneysavingexpert-bank-account-switching-guide-s"
      publisher: "MoneySavingExpert"
      accessed: "2026-08-26"
    - publisher_key: "moneytothemasses.com"
      ref: "S-moneytothemasses-diy-bank-switching-how-to-move-"
      publisher: "Money to the Masses"
      accessed: "2026-08-26"
    - publisher_key: "citizensadvice.org.uk"
      ref: "S-citizensadvice-moving-bank-accounts-what-you-nee"
      publisher: "Citizens Advice"
      accessed: "2026-08-26"
    - publisher_key: "gocompare.com"
      ref: "S-gocompare-self-managed-bank-account-switch-pros-"
      publisher: "Go Compare"
      accessed: "2026-08-26"
    - publisher_key: "currentaccountswitch.co.uk"
      ref: "S-currentaccountswitch-cass-what-the-service-cover"
      publisher: "Current Account Switch Service"
      accessed: "2026-08-26"
    - publisher_key: "moneysupermarket.com"
      ref: "S-moneysupermarket-switching-bank-accounts-guide"
      publisher: "MoneySuperMarket"
      accessed: "2026-08-26"
unprofiled: []
---
