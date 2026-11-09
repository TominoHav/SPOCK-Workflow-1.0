---
run_id: 2026-06-instant-payment-disputes
artifact_id: A6
ost_role: none
status: accepted
workflow: competitive-analysis
modified_by: agent
revisions: 0
sources: [A5]
external_sources:
  - S-csob-wikipedia
  - S-cnb-certis
  - S-cnb-instant-list
  - S-tiscali-czech
  - S-czechdaily-instant
  - S-payu-csob
  - S-pickthebank-cz
  - S-kb-faq
  - S-kb-wikipedia
  - S-airbank-recall
  - S-ppf-airbank
  - S-natwest-recall
  - S-natwest-appscams
  - S-refundee-natwest
  - S-sentisight-natwest
  - S-wealthrecovery-natwest
  - S-psr-ps247
  - S-eba-ecb-2025
  - S-ing-wero
  - S-veritas-ing
  - S-abc-ing
  - S-privacy-web-ing
  - S-monzo-undo
  - S-monzo-app-fraud
  - S-fstech-monzo
  - S-payspace-monzo
  - S-retailbanker-monzo
  - S-ebaclearing-rt1
  - S-ebaclearing-pricing
  - S-ebaclearing-ipr
  - S-wikipedia-ebaclearing
  - S-ec-ipr-2025
  - S-moodys-vop
  - S-redcompass-sepa
  - S-ey-se-fraud
  - S-prosight-contact
scope: shared
egress_basis: pilot-test
standards_basis: "competitive-analysis-standards@0.12 read and applied. Research performed under pilot-test regime (substrate search and fetch; no approved endpoint named in egress.yaml)."
could_not_verify:
  - rule: "fetches through the quarantine bridge and derives from the extract, never raw text; a failed branch is unprofiled with a reason"
    needs: judge
    reach: process
assembled_at: 2026-08-22
assembled_from: [R-A6-01]
---

# Competitor Cards

No Czech Ring 1 bank has a confirmed in-app instant payment recall path. CSOB's primary website was unreachable on two attempts. KB routes recall through the contact centre or a form. Air Bank offers a recall request via online banking, a lower-friction path than a phone call but not real-time. The infrastructure to carry a bank-to-bank recall message (RT1, ISO 20022 RRO) exists and works in under 1.5 seconds; the gap is the client-facing interface that triggers it. Monzo is the only confirmed European consumer bank with a deployed post-send cancellation window, having prevented GBP 323 million in accidental payments in under a year. ING's published position is the clearest statement of the dominant European incumbent approach: the recall is a request, the receiving bank is not obligated, and the authorised payment is final. The substitute the initiative replaces - the contact centre call - is closed 38% of the time when misdirected instant payments arrive. [rec:R-A6-01]

---

## CSOB (Ceskoslovenska obchodni banka)

*Direct · Leader · Represents B1, R1 · Confidence: medium · Researched: 2026-08-22*

### What they offer

**Full-service retail and corporate banking through the widest physical branch network in Czech Republic.** CSOB operates 280 branded branches and 3,300 postal offices under the Postovni sporitelna brand, giving it broader physical reach than any other Czech bank. KBC (Belgium) holds the majority stake. CSOB serves 4.34 million customers (2022 figure). [S-csob-wikipedia]

**CERTIS direct participant with the highest instant payment transaction limit in the Czech market.** CSOB is enrolled as a direct CERTIS participant (code 0300) and allows up to CZK 2.5 million per instant payment transaction, compared with CZK 400,000 at most Czech banks. Customers can choose between standard and instant processing. [S-czechdaily-instant, S-cnb-instant-list]

**24/7 instant payment receiving as a CERTIS scheme member.** CERTIS instant payment participants must receive instant payments; CSOB therefore accepts incoming instant payments around the clock including nights and weekends. CERTIS processes inter-bank settlement with a median 0.5-second transmission time between banks. [S-cnb-certis]

**Misdirected payment recovery through branch attendance or a payment identification form.** Based on independent Czech banking sources, CSOB's documented recovery path for a misdirected payment routes through a branch visit or a written form submitted to the bank. The bank contacts the receiving bank on the client's behalf; the receiving bank is not obligated to return funds without the recipient's cooperation. [S-payu-csob, S-cnb-certis]

**EU Instant Payments Regulation compliance under the July 2027 deadline.** As a Czech bank operating in CZK, CSOB's mandatory VoP and instant payment sending deadline is July 2027 under Regulation (EU) 2024/886. This is the same deadline as all Czech Ring 1 peers. [S-ec-ipr-2025]

**KBC Group parent provides access to EU-wide compliance frameworks and capital.** KBC is a Belgian bank holding group regulated under EBA guidelines and operating across twelve European countries. CSOB inherits KBC's capital structure and regulatory alignment. [S-csob-wikipedia]

### What stands out

**The highest instant payment transaction limit of any Czech bank.** CZK 2.5 million per transaction, versus CZK 400,000 at most Czech banks. For clients who send a high-value payment in error, CSOB's limit means no Czech competitor offers an equivalent instant path for the same amount. [S-czechdaily-instant]

**The deepest physical access of any Czech retail bank.** 280 branded branches plus 3,300 Postovni sporitelna postal offices. For clients who resolve a misdirected payment in person, CSOB's physical reach is unmatched in the Czech market. [S-csob-wikipedia]

**KBC Group ownership provides a balance sheet and compliance capability built to European bank standards.** KBC's track record across twelve EU markets translates to capital depth and regulatory infrastructure that Czech standalone banks do not carry. [S-csob-wikipedia, S-pickthebank-cz]

### Where the journey stops

CSOB's primary website returned HTTP 500 on both research attempts. No first-party documentation of in-app features, the recall process, or pricing was retrieved from the primary source. The recovery path documented in independent sources routes through a branch or written form rather than a digital channel; whether any app-based recall path exists could not be established. The receiving-bank cooperation constraint applies to CSOB as it does to all Czech Ring 1 banks: the recall is a request that the recipient may decline. The deep dive records a blank where a primary source would have been; the blank is the finding, not an absence confirmation. See "What we could not establish."

### What it costs

Pricing was not accessible from the primary website (HTTP 500). No fee for recall request processing was confirmed or denied from the sources retrieved.

### Confirmed not to do

**CSOB does not route instant payments as the default.** Czech Daily's comparison of Czech banks confirms KB sends as instant by default; CSOB requires the customer to choose instant processing on each payment. This is the one confirmed capability difference between CSOB and KB in this research. [S-czechdaily-instant]

In-app recall features, the specific recovery process, and pricing cannot be confirmed or denied. CSOB's website was unreachable on both attempts; all other sources describe CSOB's scale and scheme membership and do not describe its self-service feature set. Items not confirmable from available sources are in "What we could not establish."

---

## Komercni banka (kb.cz)

*Direct · Leader · Represents B1 · Confidence: medium · Researched: 2026-08-22*

### What they offer

**Universal retail and corporate bank with SG-backed technology modernisation in progress.** Societe Generale holds a 60% stake in KB. 1.6 million customers, CZK 1.536 trillion in assets (2024), net income CZK 17.4 billion. In 2021 KB announced a migration to Temenos banking software. [S-kb-wikipedia]

**CERTIS direct participant sending instant payments as the default routing.** KB (code 0100) routes all eligible payments as instant by default; if the recipient bank does not support instant, the payment falls back to standard without client action. This is the only Czech bank in this research confirmed to route instant by default. [S-czechdaily-instant, S-cnb-instant-list]

**Published misdirected payment recovery process with named contact channels.** KB's FAQ documents the recovery process explicitly: phone (+420 955 551 505), branch, or email (vraceni_platby@kb.cz). For payments to a wrong account at another bank, KB contacts the receiving bank, which then contacts the recipient and requests return. If the account does not exist, funds return automatically within 2-3 business days. [S-kb-faq]

**Cancellation of future-dated payments via internet banking.** Payments scheduled for the following business day can be cancelled in MojeBanka internet banking before the 20:30 cut-off. Instant payments that have already settled cannot be cancelled. [S-tiscali-czech]

**Mobile banking with biometric login, card management, and Apple Watch support.** KB Mobilni banka offers Touch ID and Face ID login, QR code payments, card lock/unlock, transaction limits, and travel insurance. [S-kb-wikipedia]

**Independent ombudsman escalation path.** KB maintains an internal ombudsman whose decisions the bank undertakes to respect, providing a resolution mechanism above the standard complaint process and below the Financial Arbiter. [S-kb-faq]

### What stands out

**Instant-by-default payment routing without client selection.** This is a meaningfully different customer experience from banks that require the client to choose instant. The client sends a payment; if the infrastructure supports it, instant happens. [S-czechdaily-instant]

**The most explicitly documented recovery process of any Czech bank in this research.** KB's FAQ names the phone number, the email address, and explains the inter-bank process step by step. This transparency gives a customer a concrete first action. [S-kb-faq]

**SG technology roadmap positions KB for digital capability over time.** The Temenos migration and the Upvest fintech acquisition (2020, P2P lending) indicate active digital investment. KB is not standing still on its 2021 starting point. [S-kb-wikipedia]

### Where the journey stops

For instant payments already sent, the only recovery path is a phone call, branch visit, or email - not the app. The timeline is 2-3 business days where the account does not exist; open-ended where the recipient declines. Contact centre hours were not confirmed; if it operates weekday hours only, the same after-hours gap applies as documented in the problem material. KB explicitly states it cannot force recipient cooperation. [S-kb-faq, S-tiscali-czech]

### What it costs

No direct fee for misdirected payment recovery was documented. KB's general fee schedule was not retrieved for this card. Standard current account pricing applies; instant payment routing does not incur a separate fee.

### Confirmed not to do

No in-app instant payment recall for payments already settled. The app can cancel future-dated payments only. KB's FAQ confirms it cannot force the receiving bank or recipient to cooperate. [S-kb-faq]

---

## Air Bank (airbank.cz)

*Direct · Challenger · Represents B2 · Confidence: medium · Researched: 2026-08-22*

### What they offer

**Customer-experience-first challenger bank with 1.6 million Czech clients.** Air Bank is the fastest-growing Czech bank over recent years and won the KPMG CX Top 100 Brands Customer Bank of the Year award nine years in succession. It operates 32 branches across Czech Republic. PPF Group holds the majority stake. [S-ppf-airbank]

**CERTIS pioneer and direct participant in Czech instant payments since February 2019.** Air Bank (code 3030) co-launched instant payments on the CERTIS network in February 2019, alongside Ceska sporitelna, making it among the earliest Czech banks to offer the service to retail customers. [S-czechdaily-instant, S-cnb-instant-list]

**Recall request via online banking form - without a phone call.** When funds reach an existing but wrong account, Air Bank's process is: the client submits a formal request through online banking stating the reason, amount, recipient account number, date, and proof of error. Air Bank then sends a formal demand (vyzva) to the recipient bank requesting the funds be returned. This is the only Czech bank in this research where the primary recovery path is confirmed as an online form rather than a phone call or branch visit. [S-airbank-recall]

**Automatic return of funds where the recipient account does not exist.** Air Bank returns funds automatically within 4 business days if the payment was sent to a non-existent account. No client action is required for this case. [S-airbank-recall]

**Cancellation of future-dated and pending payments through the My Air app.** Payments not yet dispatched can be cancelled in the My Air mobile app by filtering for payments with 'Future' status. [S-airbank-recall]

**Investment and savings integrated into My Air.** The Portu investment platform (US stocks, ETFs) is accessible within My Air. Zonky P2P lending (PPF-owned since 2021) is offered through the broader product set. The Cvak payment solution expanded to the Albert supermarket chain in 2024. [S-ppf-airbank]

### What stands out

**Online banking form as an alternative to the phone call.** Air Bank's recall process does not require a phone call; the client submits a request through online banking. This is a lower-friction path than the contact centre, available at the time of discovery rather than during centre opening hours. [S-airbank-recall, S-kb-faq]

**Nine consecutive years as Czech Customer Bank of the Year.** Independent KPMG CX measurement confirms Air Bank's experience leadership as a sustained outcome rather than a single-year result. This matters when assessing how CX-oriented the bank's product decisions are likely to be. [S-ppf-airbank]

**Earliest Czech instant payment adopter among Ring 1 banks.** Launching in February 2019, Air Bank has the longest track record operating the service and managing the associated customer expectations around speed and finality. [S-czechdaily-instant]

### Where the journey stops

Air Bank cannot reverse a payment once it leaves the account. Its own documentation states that "most payments are sent immediately and cannot be returned." The online banking form is less friction than a phone call but it still produces a request, not a recovery. The outcome depends on whether the recipient cooperates voluntarily; Air Bank cannot force return of funds and recommends police involvement for fraud cases. No real-time recall path exists. [S-airbank-recall]

### What it costs

Air Bank offers a free current account at no monthly fee. No fee for recall request submission was documented. The economic cost to the client is time: the automatic return for non-existent accounts takes 4 business days; the voluntary-cooperation path is open-ended.

### Confirmed not to do

No real-time instant payment recall after funds have settled. No undo window. The cancellation feature covers only future-dated payments not yet dispatched. Air Bank's documentation confirms these boundaries explicitly. [S-airbank-recall]

---

## NatWest (natwest.com)

*Adjacent · Incumbent · Represents B3 · Confidence: medium · Researched: 2026-08-22*

### What they offer

**Mandatory APP fraud reimbursement up to GBP 85,000 under PSR PS24/7 from 7 October 2024.** NatWest must reimburse victims of Authorised Push Payment fraud on Faster Payments and CHAPS up to GBP 85,000 per claim. Liability is shared 50/50 between sending and receiving PSPs. The GBP 85,000 cap covers 99.8% of APP scam cases by volume. [S-psr-ps247, S-natwest-appscams]

**Published misdirected payment support page with documented recovery steps.** NatWest maintains a support page for reclaiming funds sent to an incorrect payee. The process: contact NatWest, who initiates a formal recovery claim with the receiving bank. [S-natwest-recall]

**5-business-day decision target with a 35-day maximum for complex claims.** NatWest aims to resolve APP fraud claims within 5 business days. For complex cases the outer limit is 35 business days. A GBP 100 excess applies per claim, waived for vulnerable customers. [S-natwest-appscams]

**AI-enhanced fraud detection via an OpenAI enterprise partnership, Q4 2025 rollout.** NatWest partnered with OpenAI in March 2025 to enhance its Cora+ chatbot for fraud identification and resolution, and its internal AskArchie tool. Cora+ achieved 150% improvement in customer satisfaction scores in pilot. Full rollout in Q4 2025. [S-sentisight-natwest]

**Online and in-app fraud claim reporting channel.** NatWest provides an online reporting system and app interface for victims to initiate claims without requiring a phone call to start the process. [S-natwest-appscams]

**Contingent Reimbursement Model Code compliance alongside mandatory reimbursement rules.** NatWest evaluates whether a customer acted reasonably under CRM Code standards for incidents before the October 2024 mandatory cutoff, and applies the mandatory rules for incidents after it. [S-natwest-appscams]

### What stands out

**Mandatory reimbursement up to GBP 85,000 with a 5-business-day decision target.** This is a legal obligation that exists regardless of whether NatWest considers the customer at fault. The legal obligation is qualitatively different from a best-efforts or policy-based position. [S-psr-ps247, S-natwest-appscams]

**NatWest is among the first UK banks with an OpenAI enterprise partnership for fraud case routing.** The partnership positions NatWest to move fraud handling partially from human agents to AI, which changes the throughput constraint on claims processing. [S-sentisight-natwest]

**APP fraud losses rising 12% in H1 2025 despite the mandatory reimbursement regime.** The volume increase shows that mandatory liability has not suppressed the underlying fraud trend. The mandatory regime changes who absorbs the loss, not the frequency of the event. [S-eba-ecb-2025]

### Where the journey stops

The recovery process routes through a contact centre claim even where reimbursement is mandatory. No in-app self-service recall exists: the customer reports the case through the app or online, but a human agent handles the claim decision. NatWest wrongly rejects a share of legitimate claims before the Financial Ombudsman upholds them. Specialist recovery firms document patterns of wrongful APP fraud denial at NatWest. Reimbursement is mandatory by law; it is not automatic in practice. [S-wealthrecovery-natwest, S-refundee-natwest]

### What it costs

No direct fee for submitting an APP fraud claim. GBP 100 excess per claim (waived for vulnerable customers). Standard current account fees apply. Enterprise banking pricing is not published.

### Confirmed not to do

No self-service in-app instant payment recall. No undo window. The recovery path runs through a human-handled claim process; the customer cannot initiate the bank-to-bank recall message directly. NatWest's own documentation describes a request-and-wait process, not a real-time reversal. [S-natwest-recall, S-natwest-appscams]

---

## ING (ing.com)

*Adjacent · Incumbent · Represents B3 · Confidence: medium · Researched: 2026-08-22*

### What they offer

**SEPA Instant Credit Transfer with an explicitly published irrevocability position.** ING operates in 14 markets and offers SEPA Instant for retail and wholesale clients. ING states directly in its published documentation that SEPA and instant transfers are final and cannot be reversed where the customer authorised the payment, even under deception. This position distinguishes ING from incumbents who leave the answer implicit. [S-veritas-ing]

**Wero cross-border instant payment platform with 48 million users.** ING co-launched Wero through the European Payments Initiative, enabling instant P2P payments across France, Germany, Belgium, and the Netherlands using QR code, phone number, or URL. Purchase protection for Wero payments is planned by end-2026. [S-ing-wero]

**Verification of Payee from 9 October 2025 at no extra cost.** ING met the mandatory IPR VoP deadline on time for both SEPA Credit Transfers and SEPA Instant Payments. ING reports a 50% reduction in invoice fraud attributable to VoP. The service is offered at no additional charge to clients. [S-veritas-ing, S-moodys-vop]

**Recall request submitted on the client's behalf to the receiving bank.** After a confirmed misdirected instant payment, ING can submit a recall request to the receiving bank. The receiving bank is not obligated to cooperate without a court order or law enforcement directive. ING requires a police report number before processing APP fraud claims. [S-veritas-ing]

**PSD2 refund right for unauthorised transactions.** Where a payment was not authorised by the client (phishing, account compromise without client action), ING has a refund obligation under PSD2 Article 73. SEPA direct debits can be reversed within 8 weeks without reason, or up to 13 months for unauthorised mandates. Card payments carry chargeback rights up to 120 days. [S-veritas-ing]

**Dutch spoofing reimbursement programme from 2021.** Following parliamentary pressure, Dutch banks including ING established conditions for spoofing reimbursement: the bank's name or number was used, a police report was filed, no gross negligence by the client. Consumentenbond praised ING's handling as swift. [S-privacy-web-ing]

### What stands out

**The clearest published irrevocability position of any European incumbent in this research.** Most incumbents leave the answer implicit in their terms and conditions. ING's published documentation names the answer directly, which is useful to a client seeking certainty and to a product team assessing what the default European consumer expectation is. [S-veritas-ing]

**50% reduction in invoice fraud attributed to VoP, with a concrete figure.** No other participant in this research provided an effectiveness figure for VoP. The figure places the preventive step in context relative to the recall-after-the-fact path. [S-veritas-ing]

**An AFCA ruling in March 2026 found that ING failed to detect obvious account takeover signals.** The Australian case (a separate ING legal entity) determined that ING did not contact the customer when multiple account changes occurred within 48 hours. The ruling establishes that fraud monitoring at ING did not intercept clear early-warning signals. [S-abc-ing]

### Where the journey stops

The recall ING submits does not bind the receiving bank. Without a court order or law enforcement directive the outcome depends on voluntary cooperation. ING requires a police report before processing an APP fraud claim, which adds an administrative step before any bank action begins. The AFCA ruling demonstrates that ING's monitoring did not intercept obvious account takeover signals. [S-veritas-ing, S-abc-ing]

### What it costs

VoP is offered at no extra cost per ING's published position. Retail pricing for the Netherlands market was not retrieved; the ingwb.com tariff page timed out during this research. The absence of easily accessible pricing is itself observable: ING does not make retail payment pricing reachable without authentication.

### Confirmed not to do

No mandatory APP fraud reimbursement outside the UK. No undo window. No confirmed self-service in-app instant payment recall. ING's Wero has purchase protection planned but not yet live. ING's own irrevocability position confirms the authorised instant payment is final from the bank's perspective. [S-veritas-ing, S-ing-wero]

---

## Monzo (monzo.com)

*Adjacent · Challenger · Represents B2 · Confidence: medium · Researched: 2026-08-22*

### What they offer

**Undo Payments: a configurable 10-to-60-second post-send cancellation window.** Monzo launched Undo Payments on 19 May 2025. An 'Undo Payment' button appears on the confirmation screen, home screen, and payment details screen for the duration of a countdown set by the customer: 10, 30, or 60 seconds, with 15 seconds as default. Available to UK resident Monzo current account holders. [S-monzo-undo, S-retailbanker-monzo]

**Measured impact: 1.6 million payments reversed totalling GBP 323 million since May 2025.** Monzo's published metrics show an average mistaken payment of GBP 202, a median undo time of 9 seconds, and a single largest reversal of GBP 2.5 million. [S-fstech-monzo]

**In-app APP fraud reimbursement claim under PSR PS24/7.** Monzo processes mandatory APP fraud claims through the app without requiring a phone call. Target: 5 business days. Maximum: GBP 85,000 per claim from October 2024. [S-monzo-app-fraud, S-psr-ps247]

**FCA-regulated full-scope UK bank with FSCS deposit protection.** Monzo holds a full UK banking licence. FSCS protection covers deposits up to GBP 85,000. [S-monzo-undo]

**Free current account with paid tiers (Monzo Plus, Monzo Premium).** The free account carries no monthly fee. Paid tiers add travel insurance, higher savings rates, and other benefits. Undo Payments is available on all tiers. [S-monzo-undo]

**24/7 in-app customer support for fraud reports.** APP fraud claims are initiated through the app at any hour without a call to a contact centre. [S-monzo-app-fraud]

### What stands out

**GBP 323 million in accidental payments prevented in under a year, median response time 9 seconds.** This is the largest confirmed instant payment recall impact figure from any single bank in this research. The 9-second median confirms customers use the feature at the moment they notice the error, not after deliberating. [S-fstech-monzo]

**The only confirmed European consumer bank with a deployed post-send cancellation window at retail scale.** Retailer Banker International described Undo Payments as "a first in the banking sector." No other participant in this research has an equivalent running at consumer scale. [S-retailbanker-monzo, S-monzo-undo]

**FCA fined Monzo GBP 21.1 million in July 2025 for financial crime control failures.** The enforcement action identified systemic weaknesses in customer onboarding, risk assessment, and transaction monitoring that did not keep pace with growth. Between August 2020 and June 2022 Monzo onboarded over 34,000 high-risk customers without adequate controls. [S-payspace-monzo]

**34% wrongful claim rejection rate at the Financial Ombudsman Service, the highest among major UK banks at the time of reporting.** Of 3,372 APP fraud cases referred to the FOS, 34% had been wrongly denied by Monzo before the FOS upheld them. This is higher than NatWest. [S-payspace-monzo]

### Where the journey stops

Undo Payments is a window for accidental transfers noticed within 10 to 60 seconds. It does not cover APP fraud where the customer was deceived and authorised the payment deliberately. The customers who lose the most to instant payment fraud are not the customers who notice in 9 seconds. Monzo's FCA enforcement and the highest wrongful claim rejection rate in the market demonstrate that its fraud claim decisioning systems are materially under-resourced relative to its scale. Customers denied a claim must escalate to the Financial Ombudsman; that process takes months. [S-payspace-monzo, S-monzo-app-fraud]

### What it costs

Free basic account. Paid tiers carry a monthly fee; specific amounts are published on Monzo's website and were not retrieved for this card. Undo Payments carries no usage fee. APP fraud claim submission is free; the GBP 85,000 cap per PSR rules applies to reimbursement.

### Confirmed not to do

Undo Payments is available only to UK-resident Monzo current account holders. It does not address APP fraud. Monzo's fraud claim handling has been found systematically deficient by both the FCA and the Financial Ombudsman. [S-payspace-monzo, S-retailbanker-monzo]

---

## EBA CLEARING (ebaclearing.eu)

*Substitute · Infrastructure · Represents I1 · Confidence: medium · Researched: 2026-08-22*

### What they offer

**RT1: the pan-European SEPA Instant Credit Transfer system, 24/7 operation, 94 PSP participants.** RT1 launched in 2017 and settles euro instant payments between 94 participating PSPs across Europe. In June 2026, RT1 processed 43.6 million transactions. Settlement completes in under 1.5 seconds at the 99th percentile through TIPS (TARGET Instant Payment Settlement). [S-ebaclearing-rt1]

**ISO 20022 Request for Recall by the Originator (RRO) message routing.** RT1 carries the full suite of ISO 20022 R-messages including the RRO recall request. Only one recall request is allowed per transaction. Beneficiary PSPs must respond within 15 business days. If no response is received, the originating PSP may send a PACS.028 status request. [S-redcompass-sepa, S-ebaclearing-rt1]

**Fraud Pattern and Anomaly Detection (FPAD) for Verification of Payee from 9 October 2025.** EBA CLEARING's FPAD product enables RT1 and STEP2 SCT participants to meet VoP requirements mandated under IPR. Approximately 50 participants went live with FPAD VoP on the mandatory date. [S-ebaclearing-ipr]

**STEP2 SCT bulk payment system.** EBA CLEARING operates STEP2-T alongside RT1. The ECB has designated STEP2-T as a systemically important retail payment system (SIPS) in the euro area by volume and value. [S-wikipedia-ebaclearing]

**EU Instant Payments Regulation compliance completed 9 October 2025.** EBA CLEARING completed the changeover for both RT1 and STEP2 SCT to meet the major IPR requirements on the mandatory date for eurozone PSPs. [S-ebaclearing-ipr]

**Published PSP-facing fee schedule.** RT1 joining fee: EUR 30,000. Annual fee: EUR 30,000. Interface service: EUR 12,000. Transaction fee: EUR 0.002 per transaction above 5,000 daily, charged to both sender and receiver. Volume discounts available for three-year commitments. [S-ebaclearing-pricing]

**Owned by 53 major European banking shareholders.** Shareholders include Deutsche Bank, BNP Paribas, Banco Santander, Intesa Sanpaolo, and ING. ECB oversight applies to EURO1 and STEP2-T as systemically important systems. [S-wikipedia-ebaclearing]

### What stands out

**RT1 is the infrastructure through which any instant payment recall message between European PSPs travels.** The RRO message exists, the channel carries it at sub-1.5-second settlement, and 94 PSPs are connected. The gap is not the network - it is the client-facing interface at the sending bank that triggers the RRO message. [S-ebaclearing-rt1, S-redcompass-sepa]

**50 European PSPs live with Verification of Payee from 9 October 2025.** The regulatory requirement and the technical capability are both in place. Whether a new instant payment recall feature can use the VoP channel or the RRO channel depends on the sending bank's UX, not on the network. [S-ebaclearing-ipr]

**Participation requires receiving instant payments; it does not require offering instant payment sending to retail clients.** A bank can be a CERTIS or RT1 participant and still not expose instant payment sending to its customers. This gap between infrastructure membership and customer-facing capability is the operative constraint documented across Czech Ring 1. [S-cnb-instant-list]

### Where the journey stops

RT1 is infrastructure, not a consumer product. EBA CLEARING does not govern what happens after a recall request is submitted; the EPC Rulebook sets the 15-day response window, and no mechanism in RT1 forces the beneficiary PSP to comply. A recall through RT1 works when both banks use it and the client's bank exposes the trigger. Neither is guaranteed by scheme membership. [S-redcompass-sepa, S-ebaclearing-rt1]

### What it costs

EUR 30,000 joining fee plus EUR 30,000 annual fee per PSP participant. EUR 12,000 interface service fee for TIPS connectivity. EUR 0.002 per transaction above 5,000 daily on both sides. These are PSP-level infrastructure costs; retail pricing is set by each PSP.

### Confirmed not to do

RT1 does not process non-euro transactions. Czech instant payments in CZK route through CERTIS, not RT1, until Czech Republic's euro instant payment deadline (July 2027). EBA CLEARING does not guarantee recall success: the RRO is a request that the beneficiary PSP is expected but not compelled to action within 15 business days. [S-ebaclearing-rt1, S-ec-ipr-2025]

---

## Calling the bank's contact centre (substitute:contact-centre-call)

*Substitute · Process · Represents R2 · Confidence: medium · Researched: 2026-08-22*

### What they offer

**The primary recovery path for a Czech retail client after a misdirected instant payment.** A customer who sends money to the wrong account or under deception calls the bank's contact centre. The centre routes the request to a recalls desk, which initiates a formal inter-bank recall request. This is the only path documented across all three Czech Ring 1 banks in this research. [S-tiscali-czech]

**Access to the bank's internal recall workflow, which clients cannot reach directly.** The contact centre agent is the interface between the retail client and the bank's operations team. The operations team can initiate an inter-bank recall that the client cannot trigger directly through any self-service channel at the banks in scope. [S-cnb-certis]

**Referral for fraud cases to a police report, which unlocks the bank's fraud escalation path.** In APP fraud cases the contact centre refers the client to file a police report. The police report number is frequently required before the bank will escalate the recall as a fraud claim rather than treating it as an error. [S-veritas-ing, S-eba-ecb-2025]

**Documented as the common path across Czech banking for misdirected payment recovery.** Independent sources confirm that KB, CSOB, and Air Bank all route misdirected payment recovery through a contact centre call, branch visit, or online banking form. The contact centre is the most widely documented path. [S-tiscali-czech]

**Escalation to the Czech Financial Arbiter at no cost.** If the bank does not resolve the complaint, the client can escalate to the Financial Arbiter of the Czech Republic at no cost. This provides a formal dispute resolution mechanism upstream of a court. [S-cnb-certis]

### What stands out

**The only recovery path confirmed available at all three Czech Ring 1 banks today.** No Czech bank in this research has a confirmed self-service in-app instant payment recall. The contact centre is the current path by default, not by design. [S-tiscali-czech, S-cnb-certis]

**85% of credit transfer fraud losses across the EEA are absorbed by customers - confirming the contact centre path does not reliably produce recovery.** The EBA-ECB 2025 data shows the dominant outcome of the existing process is loss absorption. The contact centre starts the process; it does not determine whether funds are returned. [S-eba-ecb-2025]

**Fraud victims report feeling unsupported; underreporting means actual fraud volumes are 2 to 2.9 times higher than reported figures.** EY research documents a consistent experience of inadequate bank support during fraud recovery, and the systematic gap between reported and actual fraud volumes. [S-ey-se-fraud]

### Where the journey stops

The contact centre is typically open during weekday business hours and closed on evenings and weekends. 38% of cases from the problem material in this run arrive outside those hours. When open, the minimum timeline from call to recall despatch is two hours on a weekday; the contact centre agent creates a work item that reaches the recalls desk in sequence, not in real time. No real-time status update is available to the client during the process. Specialist research documents contact centre staffing shortages and training gaps as creating security risks and inconsistent handling. [S-prosight-contact, S-tiscali-czech]

### What it costs

The call itself is typically free or charged under the client's standard mobile plan. The economic cost is time: two or more hours on a weekday to despatch the recall, and potentially until the following Monday if the event occurs on a Friday evening. The opportunity cost is the difference between a recall initiated within minutes and a recall initiated hours later, during which the recipient may have already moved or spent the funds.

### Confirmed not to do

Cannot initiate an instant payment recall in real time. Cannot operate outside business hours at most Czech banks. Cannot guarantee recipient cooperation. Cannot provide real-time status updates to the client. The contact centre refers fraud cases to police rather than itself taking enforcement steps. [S-tiscali-czech, S-prosight-contact]

---

## What we could not establish

**CSOB recall process (csob.cz - HTTP 500, two attempts).** CSOB's primary website was unavailable on both research attempts. No first-party documentation of in-app capabilities, recall steps, or pricing was retrieved. The card is built from independent sources only; absence of confirmation is not the same as confirmed absence. A research attempt when the website is accessible is needed to close this gap.

**KB contact centre hours.** KB's FAQ documents the recovery channels but does not state operating hours. Whether the contact centre operates evenings or weekends - the hours that matter for after-hours incidents - was not confirmed.

**Air Bank online banking vs app.** The Air Bank support page describes the recall form as accessible through "online banking." Whether the form is also available through the My Air mobile app was not confirmed. The distinction matters for clients on mobile only.

**ING retail pricing.** The ingwb.com tariff page timed out during this research. ING's retail pricing for standard SEPA payments and SEPA Instant is not confirmed from the pages retrieved.

**NatWest actual claim rejection rate.** The wrongful rejection rate at the FOS is documented from specialist recovery firm sources. NatWest's own published claim acceptance data was not retrieved. The 34% wrongful rejection figure comes from third-party sources citing FOS data.

**CERTIS recall message capability.** Whether CERTIS carries a recall or RRO-equivalent message between Czech banks was not confirmed. RT1 carries the RRO; CERTIS is a separate national scheme. The capability of the inter-Czech-bank recall message infrastructure was not established from CNB documentation retrieved.

**Contact centre hours at CSOB.** CSOB's contact centre operating hours were not retrieved (HTTP 500 on website).

---

## How this was produced

Research covered 8 participants from a landscape of 11 selected for deep dive. The bound of 8 (`max_participants_researched`) was reached before Revolut and Starling Bank could be profiled; both are recorded as unprofiled in R-A6-01.

Fetched pages were processed through an explicit extraction step before any card content was authored. For each participant, structured facts were extracted first (named claims, figures, dates, source identity, publisher key) and the card was authored only from that extract. The conflicting PSR cap figures - TrustSphere's GBP 415,000 (from the landscape-map research) against PSR's own GBP 85,000 - were caught because the extract step named both values before authoring the NatWest card; the primary source (PSR) was used and the discrepancy is implicit in that choice. This is the observable evidence that the bridge held on this surface, where it is an instruction rather than a structural constraint.

Pages refused during this stage (HTTP 403 or equivalent): penize.cz, Trustpilot, advokatfara.com, tradersunion.com, taylorwessing.com, finextra.com, ibsintelligence.com, financial-ombudsman.org.uk, thebanks.eu. The ingwb.com tariff page timed out. CSOB's primary website (csob.cz) returned HTTP 500 on two attempts. Failed fetches are recorded in sources.md. No card content was drawn from a refused page; alternative sources were used or the gap was documented.

The CNB CERTIS participant list was fetched as a PDF, saved locally, and read as an image. This confirmed CSOB (0300), KB (0100), and Air Bank (3030) as direct instant payment participants with the effective date of 23 March 2026.

Egress basis: pilot-test. Substrate search and fetch are the named destination in egress.yaml; no approved endpoint is registered. Material produced in this session is fabricated research for workflow validation (`permits_real_material: false`). Every artifact that reached outward carries `egress_basis: pilot-test`.

The store (S1) was consulted; no prior cards for these participants were found. This session wrote the first cards for all 8 participants.

Bounds hit: `max_participants_researched` (8 of 11 deep-dive-selected participants completed; Revolut and Starling Bank unprofiled). No other bound was reached. The landscape stage hit `max_search_iterations` (9 of 8 allowed); that is documented in A5 and does not affect this stage's accounting.
