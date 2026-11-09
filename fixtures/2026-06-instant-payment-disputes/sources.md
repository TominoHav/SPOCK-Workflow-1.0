# Sources — 2026-06-instant-payment-disputes

> **This run's market research is real.** Every source below was fetched during stage 3.1 (2026-08-22) or stage 3.2 (2026-08-22) and the facts recorded against it are what those pages said. Sources marked as analyses of a primary document were fetched; the primary document was not fetched separately. **The table carries no column for the URL. The URL is included in the publisher cell as a workaround; this is a shape defect and is noted in the stage 3.1 landscape map's production account.**

One row per `ref` an artifact in this run cites. The `publisher_key` is what decides whether two sources are one party or two, and is the field the source floor is counted on.

## Stage 3.1 sources (landscape mapping)

| ref | publisher | publisher_key | accessed |
|---|---|---|---|
| `S-eba-ecb-2025` | Flagright, analysis of the joint 2025 EBA-ECB Payment Fraud Report (https://www.flagright.com/post/2025-eba-ecb-payment-fraud-report-key-insights-and-takeaways-for-fintechs-and-psps). Note: Flagright is a commercial compliance vendor; the primary report is the EBA-ECB joint publication, which was not fetched separately. | `flagright.com` | 2026-08-22 |
| `S-psr-ps247` | Payment Systems Regulator, Policy Statement PS24/7 (https://www.psr.org.uk/publications/policy-statements/ps247-faster-payments-app-scams-reimbursement-requirement-confirming-the-maximum-level-of-reimbursement/) | `psr.org.uk` | 2026-08-22 |
| `S-monzo-undo` | Monzo Bank Limited, blog post on undo payments feature published 13 May 2025 (https://monzo.com/blog/undo-payments) | `monzo.com` | 2026-08-22 |
| `S-monzo-app-fraud` | Monzo Bank Limited, help page on getting money back after APP fraud (https://monzo.com/help/monzo-fraud-category/Getting-your-money-back-authorised-push-payment-fraud). Second page from the same publisher as S-monzo-undo; one independent source, two pages. | `monzo.com` | 2026-08-22 |
| `S-natwest-recall` | NatWest, support page for reclaiming funds sent to an incorrect payee (https://www.natwest.com/support-centre/banking-from-home/make-payments/how-do-i-reclaim-funds-i-have-sent-to-an-incorrect-payee.html) | `natwest.com` | 2026-08-22 |
| `S-ec-ipr-2025` | European Commission, Directorate-General for Financial Stability, Financial Services and Capital Markets Union, published 10 October 2025 (https://finance.ec.europa.eu/news/new-eu-rules-make-instant-euro-payments-faster-and-safer-2025-10-10_en) | `finance.ec.europa.eu` | 2026-08-22 |
| `S-ey-ipr` | Ernst and Young, EU instant payments regulation analysis (https://www.ey.com/en_gl/insights/financial-services/emeia/eu-instant-payments-regulation-five-key-hurdles-for-banks-to-clear) | `ey.com` | 2026-08-22 |
| `S-moodys-vop` | Moody's, analysis of EPC Verification of Payee rules published November 2025 (https://www.moodys.com/web/en/us/kyc/resources/insights/verification-of-payee-epc-instant-payment-rules-for-2025.html) | `moodys.com` | 2026-08-22 |
| `S-ebaclearing-rt1` | EBA CLEARING, RT1 service description (https://www.ebaclearing.eu/services-instant-payments/rt1/) | `ebaclearing.eu` | 2026-08-22 |
| `S-starling-home` | Starling Bank Limited, FCA registration 730166, home page (https://www.starlingbank.com/) | `starlingbank.com` | 2026-08-22 |
| `S-veritas-ing` | Veritas Advisory Group, analysis of ING's refund policy for scam victims (https://veritas-advisory-group.com/blog/will-ing-refund-scammed-money/) | `veritas-advisory-group.com` | 2026-08-22 |
| `S-trustsphere-app` | TrustSphere Network, APP fraud reimbursement landscape 2026 (https://www.trustsphere.ai/post/authorised-push-payment-scams-in-2026-reimbursement-reform-and-the-last-mile-battle). Note: conflicting figure for the PSR reimbursement cap (GBP 415,000 vs PSR's own GBP 85,000); PSR's own publication preferred. | `trustsphere.ai` | 2026-08-22 |

**12 stage 3.1 sources across 11 distinct parties.**

## Stage 3.2 sources (deep dive)

| ref | publisher | publisher_key | accessed |
|---|---|---|---|
| `S-cnb-certis` | Czech National Bank, CERTIS instant payments description (https://www.cnb.cz/en/payments/certis/instant-payments-description/). Median inter-bank transmission 0.5 s, 99th percentile 1.5 s, CZK 2.5M maximum. | `cnb.cz` | 2026-08-22 |
| `S-cnb-instant-list` | Czech National Bank, List of Instant Payments Participants version 20 valid from 23 March 2026 (https://www.cnb.cz/export/sites/cnb/en/payments/.galleries/certis/download/list_instant_payments.pdf). Lists CSOB (0300), KB (0100), Air Bank (3030) as direct participants. | `cnb.cz` | 2026-08-22 |
| `S-cnb-instant-vol` | Czech National Bank, instant payments overview page (https://www.cnb.cz/en/payments/certis/instant-payments/). 43.6 million instant payments in June 2026; 46% of total interbank by April 2026. | `cnb.cz` | 2026-08-22 |
| `S-tiscali-czech` | Tiscali, article on Czech bank processes for misdirected instant payments (https://www.tiscali.cz/jestli-jste-poslali-penize-na-spatny-ucet-mate-jen-par-minut-nez-bude-pozde-banka-muze-platbu-zastavit-686992). Describes per-bank recall paths: Ceska sporitelna via George app, Air Bank in-app, KB via form/email, MONETA via internet banking message. | `tiscali.cz` | 2026-08-22 |
| `S-czechdaily-instant` | Czech Daily, article on Czech banks offering instant payment services (https://czechdaily.cz/czech-banks-offer-instant-payment-services/). CSOB limit CZK 2.5M; KB sends as instant by default; Air Bank and CS pioneered instant payments February 2019. | `czechdaily.cz` | 2026-08-22 |
| `S-payu-csob` | PayU, payment methods encyclopedia entry for CSOB (https://corporate.payu.com/resource-hub/payment-methods-encyclopedia/csob/). Market position, customer count 1.6M, branch network. | `corporate.payu.com` | 2026-08-22 |
| `S-pickthebank-cz` | PickTheBank, Czech Republic banking guide (https://pickthebank.eu/banks/czech-republic/). Rates CSOB second, KB third, Air Bank seventh in Czech top 10. | `pickthebank.eu` | 2026-08-22 |
| `S-csob-wikipedia` | Wikipedia, article on Ceskoslovenska obchodni banka (https://en.wikipedia.org/wiki/%C4%8Ceskoslovensk%C3%A1_obchodn%C3%AD_banka). KBC parent, 4.34M customers (2022), CZK 1,806bn total assets (2022), 280 branches, 3,300 postal offices. | `en.wikipedia.org` | 2026-08-22 |
| `S-kb-faq` | Komercni banka, FAQ: what to do if payment order submitted incorrectly (https://www.kb.cz/en/faq-and-support/accounts-and-payments/what-should-i-do-if-i-submitted-my-payment-order-incorrectly). Process: call +420 955 551 505, visit branch, or email; 2-3 business days if account does not exist; cannot force recipient. | `kb.cz` | 2026-08-22 |
| `S-kb-wikipedia` | Wikipedia, article on Komercni banka (https://en.wikipedia.org/wiki/Komer%C4%8Dn%C3%AD_banka). Societe Generale subsidiary (60%); 1.6M customers; CZK 1,536tn assets (2024); net income CZK 17.4bn. | `en.wikipedia.org` | 2026-08-22 |
| `S-airbank-recall` | Air Bank, support page: spatne odeslana platba (https://www.airbank.cz/co-vas-nejvic-zajima/spatne-odeslana-platba/). Cannot reverse sent payments; can cancel future-dated via app; 4 business days if account does not exist; formal request via online banking after that; cannot force recipient. | `airbank.cz` | 2026-08-22 |
| `S-ppf-airbank` | PPF Group, Air Bank company page (https://www.ppf.eu/en/our-companies/airbank). 1.6M customers end-2025; CX Bank of the Year for 9th consecutive year (KPMG CX Top 100 Brands); fastest-growing Czech bank over several years; 32 branches. | `ppf.eu` | 2026-08-22 |
| `S-onesafe-airbank` | OneSafe, guide to digital banks in Czech Republic (https://www.onesafe.io/blog/digital-banks-in-czech-republic). Lists Air Bank among top six; notes free current account and loyalty cashback. Promotional article from a competing fintech; used for independent market position context only. | `onesafe.io` | 2026-08-22 |
| `S-natwest-appscams` | NatWest, APP scams protection page (https://www.natwest.com/fraud-and-security/how-we-protect-you/our-codes/app-scams.html). PSR mandatory reimbursement from 7 Oct 2024; GBP 85,000 cap; 5 business days typical, 35 maximum; GBP 100 excess (waived for vulnerable customers). | `natwest.com` | 2026-08-22 |
| `S-refundee-natwest` | Refundee, guide on NatWest APP fraud reimbursement 2026 (https://www.refundee.com/blog/will-natwest-refund-scammed-money-uk-2026). Process, eligibility, documented case of GBP 44,000 recovered after initial wrongful rejection. | `refundee.com` | 2026-08-22 |
| `S-sentisight-natwest` | SentiSight, analysis of NatWest-OpenAI partnership (https://www.sentisight.ai/natwest-first-uk-bank-partners-with-openai/). Cora+ chatbot 150% customer satisfaction improvement; 25 AI use cases operational; OpenAI full production Q4 2025. | `sentisight.ai` | 2026-08-22 |
| `S-wealthrecovery-natwest` | Wealth Recovery Solicitors, NatWest fraud refund guide (https://wealthrecovery.co.uk/resources/natwest-recovering-funds-lost-to-bank-fraud/). Documents pattern of wrongly denied claims and grounds for appeal. | `wealthrecovery.co.uk` | 2026-08-22 |
| `S-ing-wero` | ING Group, Wero payment service announcement 2026 (https://www.ing.com/news/2026/wero-europes-new-way-to-pay.html). Wero: 48M users, France/Germany/Belgium/Netherlands, instant cross-border, purchase protection by end-2026. | `ing.com` | 2026-08-22 |
| `S-abc-ing` | ABC News Australia, case of customer losing savings in ING phishing scam, published 11 March 2026 (https://www.abc.net.au/news/2026-03-11/nt-ing-bank-customer-loses-life-savings-in-phishing-scam/106435848). AFCA ruled against ING November 2025; ING described fraud detection as "increasingly difficult"; ordered to reimburse AUD 48,000 plus compensation. | `abc.net.au` | 2026-08-22 |
| `S-privacy-web-ing` | Privacy-web.nl, article on ING compensating spoofing victims (https://privacy-web.nl/en/nieuws/ing-compenseert-slachtoffers-van-spoofing/). Dutch banks established minimum spoofing reimbursement conditions from 2021; police report required; Consumentenbond praised ING response. | `privacy-web.nl` | 2026-08-22 |
| `S-fstech-monzo` | FStech, article on Monzo Undo Payments preventing GBP 323M of accidental payments (https://www.fstech.co.uk/fst/Monzo_Undo_Payments_Tool_323m_Accidental_Payments.php). 1.6M reversals; average GBP 202; average 9 seconds for customer to notice; largest single reversal GBP 2.5M. | `fstech.co.uk` | 2026-08-22 |
| `S-payspace-monzo` | PaySpace Magazine, article on Monzo wrongly denying scam refunds 2025 (https://payspacemagazine.com/news/monzo-tops-uk-banks-for-wrongly-denying-scam-refunds-in-2025-ombudsman-data-shows/). FCA fined Monzo GBP 21.1M July 2025 for financial crime control failures; 34% wrongful rejection rate at FOS (3,372 cases); onboarded 34,000+ high-risk customers 2020-2022. | `payspacemagazine.com` | 2026-08-22 |
| `S-retailbanker-monzo` | Retail Banker International, article on Monzo undo payments feature (https://www.retailbankerinternational.com/news/monzo-undo-payments-feature/). Feature described as "first in the banking sector"; gradual rollout; UK residents only; adjustable 10/30/60s options. | `retailbankerinternational.com` | 2026-08-22 |
| `S-ebaclearing-pricing` | EBA CLEARING, RT1 pricing page (https://www.ebaclearing.eu/services-instant-payments/rt1/pricing/). Joining fee EUR 30,000; annual fee EUR 30,000; EUR 12,000 interface service; 0.002 EUR per transaction above 5,000 daily. | `ebaclearing.eu` | 2026-08-22 |
| `S-ebaclearing-ipr` | EBA CLEARING, announcement on 9 October 2025 IPR changeover (https://www.ebaclearing.eu/eba-clearing-services-successfully-complete-9-october-2025-changeover/). VoP mandatory for eurozone from 9 Oct 2025; ~50 RT1/STEP2 participants went live with FPAD VoP functionality. | `ebaclearing.eu` | 2026-08-22 |
| `S-wikipedia-ebaclearing` | Wikipedia, article on EBA Clearing (https://en.wikipedia.org/wiki/EBA_Clearing). Founded 1998; 53 shareholders; EURO1 and STEP2-T designated systemically important by ECB since 2014; headquarters Paris. | `en.wikipedia.org` | 2026-08-22 |
| `S-redcompass-sepa` | Red Compass Labs, analysis of 7 SEPA Instant Payments Rulebook updates (https://www.redcompasslabs.com/insights/sepa-instant-payments-rulebook-7-updates-you-need-to-know/). One recall request per transaction; beneficiary PSP must respond within 15 business days; PACS.28 follow-up message available. | `redcompasslabs.com` | 2026-08-22 |
| `S-ey-se-fraud` | EY Sweden, article on the customer experience inside fraud recovery (https://www.ey.com/en_se/insights/financial-services/the-untold-side-of-fraud-inside-the-customers-experience). Customers absorb ~80% of reported fraud losses in Sweden; actual cases 2-2.9x higher than reported; current bank responses are reactive and loss-focused. | `ey.com` | 2026-08-22 |
| `S-prosight-contact` | ProSight Financial Association, article on the contact centre as fraud prevention front line (https://www.prosightfa.org/insights/the-contact-center-is-the-front-line-in-fraud-prevention/). Staffing and training gaps; friction vs. security trade-off; focus on technology rather than performance metrics. | `prosightfa.org` | 2026-08-22 |

**28 stage 3.2 sources across 22 distinct parties** (counting both stages: 40 source rows, 28 distinct publisher keys; several sources share a publisher_key, as the table above shows).

**Failed page fetches — stage 3.1 (carried forward):**

| attempted URL | error | participant affected |
|---|---|---|
| https://www.csob.cz/en/csob/payment-system-and-regulatory-compliance | HTTP 500 | csob.cz |
| https://www.abnamro.nl/en/personal/payments/making-payments/instant-payments.html | HTTP 503 | Not on map |
| https://www.barclays.co.uk/fraud-and-scams/latest-scams/ | HTTP 403 | barclays.co.uk |
| https://verification-of-payee.eu/instant-payments-regulation | HTTP 404 | Not on map |

**Failed page fetches — stage 3.2:**

| attempted URL | error | participant affected |
|---|---|---|
| https://www.csob.cz/v-obraze/blog/clanky/co-mam-delat-kdyz-poslu-omylem-penize-na-jiny-ucet | HTTP 500 | csob.cz (second attempt) |
| https://www.penize.cz/osobni-ucty/430148-banky-zrychli-reklamaci-chybne-poslanych-plateb-z-uctu | HTTP 403 | Czech banking context |
| https://www.trustpilot.com/review/www.csob.cz | HTTP 403 | csob.cz |
| https://advokatfara.com/en/news/payment-recall-how-to-stop-fraudulent-transfer/ | HTTP 403 | Czech recall legal context |
| https://tradersunion.com/reviews/kb-cz/ | HTTP 403 | kb.cz |
| https://www.taylorwessing.com/en/insights-and-events/insights/2025/06/app-fraud-testing-the-limits-of-recovery | HTTP 403 | NatWest context |
| https://www.finextra.com/newsarticle/47271/monzo-tops-the-charts-for-refusing-refunds-to-scam-victims | HTTP 403 | Monzo |
| https://ibsintelligence.com/ibsi-news/natwest-openai-partner-to-boost-ai-powered-banking-services/ | HTTP 403 | NatWest |
| https://www.ingwb.com/en/payments-and-collections/faqs-on-instant-payments-vop | timeout | ing.com |
| https://www.financial-ombudsman.org.uk/decisions-case-studies/... | HTTP 403 | Monzo |
| https://developer.ing.com/openbanking/inspiration/news/... | no content | ing.com |
| https://thebanks.eu/banks/10909 | HTTP 403 | airbank.cz |
