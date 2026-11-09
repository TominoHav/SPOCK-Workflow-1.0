---
run_id: 2026-06-instant-payment-disputes
record_id: R-A6-01
artifact_id: A6
item_id: ""
produced_at: 2026-08-22
produced_by:
  agent: competitive-analysis
  skill: deep-dive
revisions: 0
bounds_hit: [max_participants_researched]
cards:
  - identity_key: csob.cz
    name: "CSOB (Ceskoslovenska obchodni banka)"
    primary_unreachable: "csob.cz was fetched twice, at stage 3.1 and again at stage 3.2 on 2026-08-22, and returned HTTP 500 both times. The participant publishes material and none of it could be retrieved."
    type: direct
    represents: [B1, R1]
    standing: leader
    researched_at: 2026-08-22
    sources:
      - ref: S-csob-wikipedia
        publisher: "Wikipedia, article on Ceskoslovenska obchodni banka"
        publisher_key: en.wikipedia.org
        accessed: 2026-08-22
      - ref: S-cnb-certis
        publisher: "Czech National Bank, CERTIS instant payments description"
        publisher_key: cnb.cz
        accessed: 2026-08-22
      - ref: S-tiscali-czech
        publisher: "Tiscali, article on Czech bank misdirected payment processes"
        publisher_key: tiscali.cz
        accessed: 2026-08-22
      - ref: S-czechdaily-instant
        publisher: "Czech Daily, article on Czech banks and instant payment services"
        publisher_key: czechdaily.cz
        accessed: 2026-08-22
      - ref: S-payu-csob
        publisher: "PayU, payment methods encyclopedia entry for CSOB"
        publisher_key: corporate.payu.com
        accessed: 2026-08-22
      - ref: S-pickthebank-cz
        publisher: "PickTheBank, Czech Republic banking guide"
        publisher_key: pickthebank.eu
        accessed: 2026-08-22
    confidence: medium

  - identity_key: kb.cz
    name: "Komercni banka"
    type: direct
    represents: [B1]
    standing: leader
    researched_at: 2026-08-22
    sources:
      - ref: S-kb-faq
        publisher: "Komercni banka, FAQ on incorrect payment order recovery"
        publisher_key: kb.cz
        accessed: 2026-08-22
      - ref: S-kb-wikipedia
        publisher: "Wikipedia, article on Komercni banka"
        publisher_key: en.wikipedia.org
        accessed: 2026-08-22
      - ref: S-tiscali-czech
        publisher: "Tiscali, article on Czech bank misdirected payment processes"
        publisher_key: tiscali.cz
        accessed: 2026-08-22
      - ref: S-cnb-certis
        publisher: "Czech National Bank, CERTIS instant payments description"
        publisher_key: cnb.cz
        accessed: 2026-08-22
      - ref: S-pickthebank-cz
        publisher: "PickTheBank, Czech Republic banking guide"
        publisher_key: pickthebank.eu
        accessed: 2026-08-22
      - ref: S-czechdaily-instant
        publisher: "Czech Daily, article on Czech banks and instant payment services"
        publisher_key: czechdaily.cz
        accessed: 2026-08-22
    confidence: medium

  - identity_key: airbank.cz
    name: "Air Bank"
    type: direct
    represents: [T4]
    standing: innovator
    researched_at: 2026-08-22
    sources:
      - ref: S-airbank-recall
        publisher: "Air Bank, support page on misdirected payment (spatne odeslana platba)"
        publisher_key: airbank.cz
        accessed: 2026-08-22
      - ref: S-ppf-airbank
        publisher: "PPF Group, Air Bank company profile"
        publisher_key: ppf.eu
        accessed: 2026-08-22
      - ref: S-cnb-certis
        publisher: "Czech National Bank, CERTIS instant payments description"
        publisher_key: cnb.cz
        accessed: 2026-08-22
      - ref: S-pickthebank-cz
        publisher: "PickTheBank, Czech Republic banking guide"
        publisher_key: pickthebank.eu
        accessed: 2026-08-22
      - ref: S-czechdaily-instant
        publisher: "Czech Daily, article on Czech banks and instant payment services"
        publisher_key: czechdaily.cz
        accessed: 2026-08-22
      - ref: S-onesafe-airbank
        publisher: "OneSafe, guide to digital banks in Czech Republic"
        publisher_key: onesafe.io
        accessed: 2026-08-22
    confidence: medium

  - identity_key: natwest.com
    name: "NatWest"
    type: direct
    represents: [B2, T2]
    standing: leader
    researched_at: 2026-08-22
    sources:
      - ref: S-natwest-recall
        publisher: "NatWest, support page for reclaiming funds sent to an incorrect payee"
        publisher_key: natwest.com
        accessed: 2026-08-22
      - ref: S-natwest-appscams
        publisher: "NatWest, APP scams protection page"
        publisher_key: natwest.com
        accessed: 2026-08-22
      - ref: S-refundee-natwest
        publisher: "Refundee, guide on NatWest APP fraud reimbursement 2026"
        publisher_key: refundee.com
        accessed: 2026-08-22
      - ref: S-sentisight-natwest
        publisher: "SentiSight, analysis of NatWest-OpenAI partnership"
        publisher_key: sentisight.ai
        accessed: 2026-08-22
      - ref: S-wealthrecovery-natwest
        publisher: "Wealth Recovery Solicitors, NatWest fraud refund guide"
        publisher_key: wealthrecovery.co.uk
        accessed: 2026-08-22
      - ref: S-psr-ps247
        publisher: "Payment Systems Regulator, Policy Statement PS24/7"
        publisher_key: psr.org.uk
        accessed: 2026-08-22
      - ref: S-eba-ecb-2025
        publisher: "Flagright, analysis of 2025 EBA-ECB Payment Fraud Report"
        publisher_key: flagright.com
        accessed: 2026-08-22
    confidence: medium

  - identity_key: ing.com
    name: "ING"
    type: direct
    represents: [B1, B4]
    standing: leader
    researched_at: 2026-08-22
    sources:
      - ref: S-ing-wero
        publisher: "ING Group, Wero payment service announcement 2026"
        publisher_key: ing.com
        accessed: 2026-08-22
      - ref: S-veritas-ing
        publisher: "Veritas Advisory Group, analysis of ING refund policy for scam victims"
        publisher_key: veritas-advisory-group.com
        accessed: 2026-08-22
      - ref: S-abc-ing
        publisher: "ABC News Australia, ING phishing case AFCA ruling March 2026"
        publisher_key: abc.net.au
        accessed: 2026-08-22
      - ref: S-privacy-web-ing
        publisher: "Privacy-web.nl, article on ING spoofing victim compensation 2021"
        publisher_key: privacy-web.nl
        accessed: 2026-08-22
      - ref: S-psr-ps247
        publisher: "Payment Systems Regulator, Policy Statement PS24/7"
        publisher_key: psr.org.uk
        accessed: 2026-08-22
      - ref: S-eba-ecb-2025
        publisher: "Flagright, analysis of 2025 EBA-ECB Payment Fraud Report"
        publisher_key: flagright.com
        accessed: 2026-08-22
    confidence: medium

  - identity_key: monzo.com
    name: "Monzo"
    type: direct
    represents: [T3, B3]
    standing: innovator
    researched_at: 2026-08-22
    sources:
      - ref: S-monzo-undo
        publisher: "Monzo Bank, blog post on undo payments feature May 2025"
        publisher_key: monzo.com
        accessed: 2026-08-22
      - ref: S-monzo-app-fraud
        publisher: "Monzo Bank, help page on APP fraud reimbursement"
        publisher_key: monzo.com
        accessed: 2026-08-22
      - ref: S-fstech-monzo
        publisher: "FStech, article on Monzo undo payments preventing GBP 323M"
        publisher_key: fstech.co.uk
        accessed: 2026-08-22
      - ref: S-payspace-monzo
        publisher: "PaySpace Magazine, article on Monzo wrongly denying scam refunds 2025"
        publisher_key: payspacemagazine.com
        accessed: 2026-08-22
      - ref: S-retailbanker-monzo
        publisher: "Retail Banker International, article on Monzo undo payments feature"
        publisher_key: retailbankerinternational.com
        accessed: 2026-08-22
      - ref: S-psr-ps247
        publisher: "Payment Systems Regulator, Policy Statement PS24/7"
        publisher_key: psr.org.uk
        accessed: 2026-08-22
      - ref: S-eba-ecb-2025
        publisher: "Flagright, analysis of 2025 EBA-ECB Payment Fraud Report"
        publisher_key: flagright.com
        accessed: 2026-08-22
    confidence: medium

  - identity_key: ebaclearing.eu
    name: "EBA Clearing"
    type: adjacent
    represents: [T1, T2, R1]
    standing: leader
    researched_at: 2026-08-22
    sources:
      - ref: S-ebaclearing-rt1
        publisher: "EBA CLEARING, RT1 service description"
        publisher_key: ebaclearing.eu
        accessed: 2026-08-22
      - ref: S-ebaclearing-pricing
        publisher: "EBA CLEARING, RT1 pricing page"
        publisher_key: ebaclearing.eu
        accessed: 2026-08-22
      - ref: S-ebaclearing-ipr
        publisher: "EBA CLEARING, 9 October 2025 IPR changeover announcement"
        publisher_key: ebaclearing.eu
        accessed: 2026-08-22
      - ref: S-wikipedia-ebaclearing
        publisher: "Wikipedia, article on EBA Clearing"
        publisher_key: en.wikipedia.org
        accessed: 2026-08-22
      - ref: S-ec-ipr-2025
        publisher: "European Commission, Instant Payments Regulation announcement October 2025"
        publisher_key: finance.ec.europa.eu
        accessed: 2026-08-22
      - ref: S-moodys-vop
        publisher: "Moody's, analysis of EPC Verification of Payee rules November 2025"
        publisher_key: moodys.com
        accessed: 2026-08-22
      - ref: S-redcompass-sepa
        publisher: "Red Compass Labs, analysis of SEPA Instant Payments Rulebook updates"
        publisher_key: redcompasslabs.com
        accessed: 2026-08-22
      - ref: S-ey-ipr
        publisher: "Ernst and Young, EU instant payments regulation analysis"
        publisher_key: ey.com
        accessed: 2026-08-22
    confidence: medium

  - identity_key: substitute:contact-centre-call
    name: "Calling the bank's contact centre"
    type: substitute
    represents: [B4, B2]
    standing: leader
    researched_at: 2026-08-22
    sources:
      - ref: S-cnb-certis
        publisher: "Czech National Bank, CERTIS instant payments description"
        publisher_key: cnb.cz
        accessed: 2026-08-22
      - ref: S-eba-ecb-2025
        publisher: "Flagright, analysis of 2025 EBA-ECB Payment Fraud Report"
        publisher_key: flagright.com
        accessed: 2026-08-22
      - ref: S-psr-ps247
        publisher: "Payment Systems Regulator, Policy Statement PS24/7"
        publisher_key: psr.org.uk
        accessed: 2026-08-22
      - ref: S-ey-se-fraud
        publisher: "EY Sweden, article on the customer experience inside fraud recovery"
        publisher_key: ey.com
        accessed: 2026-08-22
      - ref: S-prosight-contact
        publisher: "ProSight Financial Association, contact centre as fraud prevention front line"
        publisher_key: prosightfa.org
        accessed: 2026-08-22
      - ref: S-tiscali-czech
        publisher: "Tiscali, article on Czech bank misdirected payment processes"
        publisher_key: tiscali.cz
        accessed: 2026-08-22
    confidence: medium

unprofiled:
  - identity_key: revolut.com
    name: "Revolut"
    reason: "max_participants_researched bound exceeded. All 8 research branches were used by the Czech Ring 1 participants (csob.cz, kb.cz, airbank.cz), NatWest, ING, Monzo, EBA Clearing, and the contact-centre substitute. Revolut's map entry documents the key finding: highest APP fraud complaint volume referred to the UK Financial Ombudsman Service in 2024 (3,242 cases) and 41% uphold rate in 2025 [S-trustsphere-app]. That finding is available to the synthesis from the landscape map."
  - identity_key: starlingbank.com
    name: "Starling Bank"
    reason: "max_participants_researched bound exceeded. Starling's map entry documents the Scam Intelligence AI tool launched October 2025 [S-starling-home]. Monzo covers the neobank innovator position at this stage; Starling's T4 signal is available to the synthesis from the landscape map."
---

# Record R-A6-01 — A6

Eight research branches opened, eight completed. Bound: max_participants_researched = 8. Two participants marked for deep dive in A5 could not be reached within the bound: revolut.com and starlingbank.com; both recorded above as unprofiled with reason.

**CSOB note.** csob.cz returned HTTP 500 on both fetch attempts (stage 3.1 and stage 3.2). The card carries no primary source and is rated medium confidence. The offering section documents what public sources establish; the recall-specific features gap is named in `What we could not establish`.

**Egress.** All research performed under pilot-test regime (egress.yaml, substrate search and fetch). Permit: fabricated run material only. Real ČS material does not research under this regime.
