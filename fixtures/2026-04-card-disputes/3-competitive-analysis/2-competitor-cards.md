---
run_id: 2026-04-card-disputes
artifact_id: A6
assembled_at: 2026-08-20
assembled_from: [R-A6-01, R-A6-02, R-A6-03, R-A6-04, R-A6-05, R-A6-06, R-A6-07, R-A6-08, R-A6-09, R-A6-10]
status: accepted
ost_role: none
workflow: competitive-analysis
modified_by: agent
revisions: 0
produced_by:
  agent: competitive-analysis
  skill: deep-dive
egress_basis: pilot-test
standards_basis: "competitive-analysis-standards@0.9 read and applied across all ten deep-dives"
external_sources:
  - 5nej-mbank-2026
  - 5nej-moneta-2026
  - airbank-2025-results
  - airbank-cenik
  - airbank-cs-duplicate
  - airbank-cs-fraud
  - airbank-myair
  - airbank-notifications
  - airbank-penize
  - bankingdive-n26-bafin
  - chargebackgurus-di
  - chargebacks911-process
  - chargebacks911-rules
  - csob-reklamace-form
  - csob-smart-notifications
  - csob-tac-nov-2025
  - ct24-reklamace-2023
  - dlapiper-psd3
  - dorkas-mbank-2025
  - ethoca-homepage
  - finance-cz-reklamace
  - financera-airbank
  - financera-csob-card-2026
  - financera-rb-2025
  - finex-airbank
  - finex-csob-card-2026
  - finex-kb-recenze
  - finex-mbank-2026
  - finex-rb-2025
  - finparada-moneta-2025
  - kb-fungovani-karet
  - kb-q1-2026
  - kb-reklamace
  - kb-stiznosti
  - kb-zneuziti-karty
  - kurzy-moneta-2025
  - londoninsider-revolut
  - mastercard-b2b-2025
  - mastercard-ethoca
  - mastercard-salesforce-2024
  - mbank-blog-2024
  - mesec-card-disputes
  - mesec-moneta-fee-2025
  - mesec-reklamace-2025
  - mesec-reklamace-karta
  - moneta-faq
  - moneta-press-2025
  - monzo-chargeback-help
  - monzo-dispute-help
  - monzo-plans-2026
  - monzo-safety-features
  - n26-chargeback-faq
  - n26-countries
  - n26-dispute-support
  - n26-plans
  - paymentsjournal-mastercard
  - penize-2banks
  - press-news-2025
  - rb-complaints
  - rb-ekonto-smart
  - rb-may2025-app
  - reviews-io-monzo
  - revolut-dispute-process
  - revolut-help-timelines
  - revolut-wikipedia
  - rivero-mastercard-tools
  - thepaypers-n26-bafin
  - top-cz-kb-recenze
  - top-mbank-2026
  - trustpilot-n26-search
  - which-monzo-fraud-2024
  - wikipedia-csob
  - wikipedia-kb
  - wise-revolut-cz
could_not_verify:
  - rule: "fetches through the quarantine bridge and derives from the extract, never raw text; a failed branch is unprofiled with a reason"
    needs: judge
    reach: process
store: S1
scope: shared
---

# Competitive Analysis | Competitor Deep-Dive — Card dispute and chargeback handling

Every Czech bank profiled here leaves a cardholder with no way to check a dispute after filing it, and all three neobanks give status the whole way through. Two of the six Czech banks let a cardholder open a dispute by tapping the transaction, and the other four require a PDF form, an email or a phone call. Three of the six send a notification for every card payment, none of them connects that notification to a dispute action, and all three neobanks do. Published resolution runs 15 to 35 working days at the Czech banks against 10 days for a fraud case at Revolut, and the 14-calendar-day ceiling in PSD3 puts every published Czech figure out of compliance on the day it transposes.

Ten participants are profiled: six Czech retail banks reachable by a Czech cardholder today, Revolut as the neobank operating in the Czech market, N26 and Monzo as the design references the Czech market is measured against, and Mastercard as the scheme whose rules bound what any of the others can do. Each section carries what the participant offers, what it claims sets it apart with the evidence behind the claim, where the journey stops, what it costs and what it is confirmed not to do.

---

## ČSOB (Československá Obchodní Banka)

Researched 2026-08-17 · direct participant · leader on B1 · confidence high [rec:R-A6-01]

### What they offer

Card dispute and chargeback handling for retail cardholders at ČSOB, the largest Czech retail bank by total assets (CZK 1,805 billion as of 2022) and one of the four largest by customer count (4.34 million). Dispute intake operates via a downloadable PDF form — Prohlášení držitele karty o sporné transakci — which the cardholder completes and submits by email to reklamace@csob.cz, via government data mailbox (ID 8qvdk3s), by post, or in person at one of 201 ČSOB branches. The ČSOB Smart mobile app provides free push notifications for every card payment and in-app card blocking, but does not offer structured in-app dispute initiation from a specific transaction. T&Cs effective November 1, 2025 commit to resolution within 15 working days (standard) or 35 working days maximum where independent obstacles prevent earlier resolution.

Retail debit and credit card holders in Czech Republic across ČSOB's 4.34 million customer base. ČSOB serves all retail segments through 201 ČSOB branches and up to 3,300 Czech Post service points, with digital self-service available through the ČSOB Smart mobile app (4.1/5 on Google Play, 65,000+ reviews).

**Push notification for every card payment.** Customer enables free push notifications in ČSOB Smart and receives an instant device alert for every card transaction — including merchant name and amount — enabling same-moment detection of an unauthorized payment before the statement period closes.

**Instant in-app card blocking.** Customer taps to block or suspend a payment card in ČSOB Smart immediately upon spotting an unauthorized charge, stopping further payments without calling a helpline or visiting a branch.

**Email dispute form submission to reklamace@csob.cz.** Customer downloads the Prohlášení držitele karty o sporné transakci PDF, completes it with transaction details, and emails it with supporting documents to reklamace@csob.cz — enabling submission without a branch visit. The form is the required intake mechanism; completion and electronic delivery can both be done digitally, but the form step itself is not eliminated.

**24/7 phone dispute reporting at 800 300 300.** Customer calls ČSOB's card operations line at any hour to report an unauthorized transaction and initiate a dispute verbally; the line handles card blocking, dispute registration, and general card queries around the clock.

**Card limits and internet payment controls in ČSOB Smart.** Customer sets per-card daily spending limits, enables or disables online card payments, and manages security settings in ČSOB Smart — providing preventive controls both before and immediately after discovering an unauthorized transaction.

**Data mailbox dispute submission (government system ID 8qvdk3s).** Customer submits a formal card dispute through Czech Republic's authenticated government data mailbox, providing electronically signed documentation without printing or physical presence — an alternative to email for formally executed complaint submissions.

**Pending transaction overview in ČSOB Smart.** Customer views pending blocks (Blokace) on their account in the Přehledy section of ČSOB Smart, showing transactions that have been authorized but not yet settled — providing partial transaction visibility during the period a dispute may be in progress.

**Formal dispute outcome notification.** Upon resolution ČSOB informs the cardholder of the outcome of the complaint proceedings in writing per its T&Cs — customer receives the bank's final decision on whether the disputed amount is returned.

### What stands out

**ČSOB Smart delivers immediate fraud response — push notification plus one-tap card block — enabling cardholder action within seconds of an unauthorized transaction without calling the bank.** Push notifications for every card payment are available free in ČSOB Smart; in-app card blocking is a confirmed feature, both documented in ČSOB Smart FAQ and app documentation. The notification-to-block flow requires no phone call or branch visit.

**Largest Czech retail bank by assets and customer count, providing the widest in-person dispute support network of any Czech ring-1 participant.** CZK 1,805 billion total assets, 4.34 million clients, 201 ČSOB branches plus Czech Post network confirmed by Wikipedia and Financera. No other Czech ring-1 retail bank has a comparable point-of-service footprint for cardholders who need face-to-face support.

**Multi-channel dispute filing — email, data mailbox, phone, branch, post — ensures no cardholder is locked out of the process regardless of digital access or ability.** All five channels confirmed in ČSOB T&Cs and reklamační řád: email reklamace@csob.cz, data mailbox ID 8qvdk3s, phone 800 300 300, in-person at 201 branches, written post to Praha 5. The breadth of channel optionality exceeds what most digital-only dispute providers offer.

### Where the journey stops

No in-app dispute initiation from a specific transaction — ČSOB is not among the Czech banks that allow a cardholder to click on a payment and dispute it directly in mobile or internet banking, requiring a separate form process instead

Customer reviews cite card blocking without prior warning, slow branch service, and extended wait times — friction in the very in-person channel the dispute process depends on for cardholders who cannot file digitally

Published resolution SLA of 15-35 working days will be non-compliant with PSD3's forthcoming 14-calendar-day maximum resolution requirement, creating regulatory exposure the bank has not publicly addressed

### What it costs

No published fee for submitting a legitimate card dispute — unauthorized transaction chargebacks are processed at no cost to the cardholder. The fee schedule effective 1 July 2026 includes a charge for unjustified card transaction complaints (neodůvodněná reklamace transakce kartou) billed per 15 minutes of bank staff time; the specific rate per 15-minute increment was not retrieved from publicly accessible sources. No differentiation is published between urgent and standard dispute processing. Submission channels — email, branch, post, data mailbox — carry no stated service charge.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks was recorded as something the research could not establish rather than as something the participant is confirmed not to do, and the two are not the same claim. What that costs is stated in the closing section.

---

## Komerční banka

Researched 2026-08-17 · direct participant · leader on B2, B3, T1, T2 · confidence high [rec:R-A6-02]

### What they offer

Universal Czech retail bank, second-largest by assets (CZK 1,536 billion, 1.6+ million customers, 241 branches), majority-owned by Société Générale (60%). Within card dispute handling: MojeBanka internet banking and Mobilní banka mobile app both provide transaction-level in-app dispute initiation from the transaction history, with guided documentation upload. Additional dispute channels: 24/7 phone support (955 512 230), email (reklamace_transakci@kb.cz with form), branch. Card management features: configurable payment notifications (Oznámení o platbách), self-service card lock/unlock, DCC control. KB 2025 transformation programme declared complete; 1,673,000 KB+ active users as of Q1 2026.

Retail banking customers in the Czech Republic — existing debit and credit cardholders across KB's 1.6+ million-strong customer base. Digital segment: 1,673,000 KB+ active users as of Q1 2026, up 537,000 year-on-year, making the app the primary service channel. The in-app dispute capability is accessible to any cardholder with a Mobilní banka or MojeBanka login.

**Transaction-level in-app dispute initiation.** Customer opens the transaction list in Mobilní banka (mobile app) or MojeBanka (internet banking), selects the disputed card payment, and KB's system guides them through the entire dispute submission process including documentation upload. No form download or branch visit required for initiation. Available for both debit and credit card transactions.

**Configurable card transaction push notifications (Oznámení o platbách).** Customer configures real-time card payment alerts via KB+ (Settings > Notifications > Outgoing Payments) or in MojeBanka (Settings gear icon > Payment Notifications > Card Usage). Once configured, a push notification or email is sent immediately after each card transaction occurs.

**Self-service card lock and unlock (zamknout kartu).** Customer can temporarily freeze their card from within KB+ or MojeBanka without calling the bank. The lock blocks all transactions and cash withdrawals without permanently cancelling the card. The customer can reverse the lock at any time from the same in-app interface.

**13-month dispute filing window.** The deadline for filing a card dispute is 13 months from the date of the disputed transaction — the longest published dispute window found among Czech retail banks in this run. KB advises customers to file as soon as the unauthorized transaction is discovered.

**Multi-channel dispute filing.** Card disputes can be filed via: in-app (Mobilní banka or MojeBanka, lowest-friction path); email (reklamace_transakci@kb.cz with completed Protokol o reklamaci form); phone (955 512 230, 24/7 card support line); or in person at any KB branch.

**Formal complaint response within 15 working days for payment service disputes.** KB commits to responding to payment service complaints within 15 working days, with general disputes handled within 30 calendar days. Complex cases — including those dependent on Mastercard or Visa scheme timelines — may extend beyond these periods. Outcome notification uses the same channel as the original submission.

**Card controls in KB+ (DCC, usage management).** Customer accesses Card Details and Management in KB+ to disable DCC (dynamic currency conversion, which can cause unexpected exchange rate fees at foreign POS terminals) and manage permitted card usage. This is a customer-controlled risk reduction capability that does not require a call.

**Downloadable dispute form for the email channel.** KB provides a downloadable Protokol o reklamaci PDF form on kb.cz for customers using the email dispute channel. Completed form plus supporting documentation (invoices, merchant communications, photos, expert assessments depending on dispute type) is sent to reklamace_transakci@kb.cz.

### What stands out

**One of only two Czech retail banks where a cardholder can dispute a transaction by clicking it in the transaction list — guided digital submission flow, no form download, no call required for initiation.** Peníze.cz (penize-2banks, accessed 2026-08-17) names KB alongside ČS/George as the only two Czech banks reaching this standard. KB's own dispute page confirms in-app initiation from Mobilní banka/MojeBanka. Finance.cz (August 2023) independently describes the flow as selecting the disputed payment in the transaction list and being guided through the entire process. The A5 load-bearing claim is tested and confirmed by two independent sources and KB's primary material.

**13-month dispute filing window — the longest published Czech retail bank timeframe found in this run.** KB's dispute support page states 13 months from the transaction date as the filing deadline. Other Czech bank pages reviewed in this run state shorter limits (30 days or 60 days for unauthorized transactions). KB's 13-month window was the longest found in ring-1 Czech retail banking research.

**Largest confirmed digital active user base among Czech universal banks: 1,673,000 KB+ users as of Q1 2026, up 537,000 year-on-year.** KB Q1 2026 financial results (kb-q1-2026) confirm 1,673,000 KB+ active users following completion of the KB 2025 transformation programme. This is the largest confirmed active digital banking user count in Czech banking not attributable to a neobank-only provider. The in-app dispute channel reaches the bank's primary customer interface.

**Configurable real-time card transaction alerts (Oznámení o platbách) supporting both push notification and email.** KB's card functions page (kb-fungovani-karet) documents the configuration path and confirms immediate notifications per card transaction when set up. No comparable named and documented configurable notification feature was confirmed for other Czech ring-1 incumbent banks in this run's research.

### Where the journey stops

Innovation perceived as slower than fintech and neobank competitors; complex banking operations still require branch visits despite KB+ scope — described as 'pomalejší inovace oproti konkurenci' (slower innovation than competitors) in a March 2026 review

Higher fees than digital-first competitors — independent reviews consistently cite charges for services offered free by neobanks as a recurring KB weakness

Disputed funds historically withheld during investigation rather than provisionally credited to the customer — noted as a disadvantage in Czech consumer media compared to providers that credit immediately. Source from December 2010; current practice may have changed.

### What it costs

No customer-facing fee for filing a card dispute via in-app, email, or phone — the dispute service is free for cardholders. Card replacement after confirmed fraud or loss: a fee exists; the specific amount was not confirmed from accessible sources during this research. Monthly account and card fees apply under KB's sazebník (updated May 2026, converting some annual card fees to monthly charges); no dispute-processing fee was found. KB's full retail fee schedule is published as a PDF at kb.cz but specific figures for card replacement and dispute-related services were not retrieved. An unpublished price is a market fact: the card replacement fee after fraud is a gap.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks was recorded as something the research could not establish rather than as something the participant is confirmed not to do, and the two are not the same claim. What that costs is stated in the closing section.

---

## mBank CZ

Researched 2026-08-17 · direct participant · leader on B2 · confidence high [rec:R-A6-03]

### What they offer

Digital-first Czech retail bank operating since 2007, owned by Commerzbank Group via mBank Group (formerly BRE Bank SA). Products: mKonto current account, mSpoření and eMax Plus savings accounts, mKreditka Standard credit card, mPůjčka Plus consumer loans, mortgages, and business banking. Card disputes filed via phone (mLinka) or internet banking portal; the mobile app routes dispute claims through the Contact section rather than from the transaction entry. Approximately 800,000 clients at end of 2025 across 30 branches in 17 Czech cities.

Czech retail customers who prefer fully digital self-service banking, particularly those seeking zero-fee current accounts. Secondary audience: small entrepreneurs (expanded offering introduced early 2024). The digital-first model and limited branch presence (30 locations) reduces reach for customers who require regular in-person service or frequent ATM withdrawals below 1,500 CZK.

**Internet banking portal card dispute submission.** Customers file card transaction disputes via mBank's internet banking portal, confirmed as one of two primary dispute channels alongside mLinka phone. The portal delivers a structured form path; specific guided steps and form fields are not publicly documented outside the bank's help resources. Whether the form is initiated from the transaction history or from a separate contact menu is not confirmed.

**mLinka phone dispute channel.** Customers report card disputes by calling mLinka (+420 222 111 999), available Monday to Friday 8:00-20:00 and weekends and public holidays 8:00-18:00. Confirmed alongside internet banking as one of the two primary dispute reporting routes.

**13-month card dispute filing window.** Customers may dispute any unauthorized card transaction up to 13 months retroactively from the transaction date, per the Czech statutory maximum under payment services law. mBank's documentation states customers should report immediately on discovery of the unauthorized transaction.

**Mobile app dispute path via Contact section (not transaction-level).** The mBank mobile app does not have a direct dispute button on individual transaction entries. Customers go to the Contact section within the app, submit a claim, and the form then guides them to identify the specific payment. This is not transaction-level initiation. mBank has announced plans to simplify this flow in a new app version, described as in development as of 2025.

**Real-time card transaction push notifications.** The mobile app delivers push notifications for card transactions via the Moje výdaje feature, alerting customers in real time to card activity. Enables early identification of unauthorized transactions. The notification does not connect to a dispute initiation action within the same flow.

**Zero-fee mKonto current account.** mKonto carries a 0 CZK monthly maintenance fee with free domestic transfers, free SEPA payments, and a free debit card. ATM withdrawals are free above 1,500 CZK; withdrawals below that threshold cost 29 CZK. Non-network ATM withdrawals are separately charged.

**Contactless wearable payment ecosystem.** mBank supports NFC contactless payments via Google Pay, Apple Pay, Garmin Pay, and Fitbit Pay. In June 2024 mBank became the first Czech bank to introduce a payment ring; a payment wristband followed in September 2024 and a children's payment wristband in November 2024.

**Biometric mobile login (mKlíč).** The mobile app supports fingerprint and face-recognition authentication via mKlíč, providing fast secure access to all app features without PIN entry.

**Finance Manager transaction categorization.** The app automatically categorizes card transactions by merchant category and presents a structured spending overview, giving customers visibility into card expenditure patterns.

**In-app customer support chat.** mBank provides a chat support channel within the mobile app for banking queries including dispute-related questions. The chat is not available on the desktop website. Availability during peak hours and response quality are noted as variable in customer reviews.

### What stands out

**Zero-fee full-service banking: free account, free domestic transfers, free debit card — one of the lowest-cost mainstream Czech bank offerings.** finex.cz (July 2026) rates Standard Fees at 95% and Digitalization at 95%. Account maintenance, domestic transfers, and debit card all confirmed free from mBank primary material and multiple independent reviews. ATM withdrawals free above 1,500 CZK; fee applies below.

**First Czech bank to introduce a payment ring (June 2024), leading wearable contactless payment adoption in the Czech market.** press.news reported the June 2024 payment ring launch as a Czech market first. Payment wristband followed September 2024 and children's wristband November 2024. No other Czech bank has been identified as having launched payment rings before this date.

**17+ years of digital-first banking in Czech Republic with a high-rated mobile platform.** mBank has operated in Czech Republic since 2007. finex.cz (July 2026) gives 95% Digitalization score and 88% overall. App supports biometric login, QR payments, multiple payment wallets, Finance Manager, and in-app chat — confirmed across finex.cz, 5nej.cz, and dorkas.cz.

**Competitive savings rate of 4.01% p.a. on mSpoření balances up to 500,000 CZK.** top.cz (2026) confirms 4.01% p.a. interest rate on savings up to 500,000 CZK, placing mBank competitively among Czech deposit-taking institutions.

### Where the journey stops

No transaction-level dispute initiation: the mobile app routes dispute claims through the Contact section rather than from the transaction entry, placing mBank below the standard set by ČS and KB — the only two Czech banks identified as enabling initiation directly from a specific payment in the transaction list

Customer satisfaction rating of 1.4 out of 5 on mapy.cz (55 respondents, 2026) with recurring complaints about unexplained account closures without warning and unsatisfactory responsiveness to disputed issues

Limited branch network of 30 locations in 17 Czech cities and no proprietary ATMs, creating barriers for customers with in-person needs and a fee friction point for ATM withdrawals below 1,500 CZK

### What it costs

mKonto current account: 0 CZK monthly maintenance fee, free domestic and SEPA transfers, free debit card. ATM withdrawals free above 1,500 CZK; 29 CZK fee per withdrawal below that threshold; non-network ATM withdrawals additionally charged. mSpoření savings: 4.01% p.a. on up to 500,000 CZK. mKreditka Standard credit card: 0 CZK issuance for first 3 months, interest-free period up to 54 days, credit limit 10,000-500,000 CZK; card maintenance fee after initial period and long-term fee schedule not confirmed from fetched sources. mKreditka e-Shop discontinued for new clients from July 1, 2025. Consumer loans (mPůjčka Plus): from 4.49% (RPSN from 4.59%). Dispute handling fees: not published. Full fee schedule (sazebník) available as PDF at mbank.cz; card-dispute-specific fees and international charges not confirmed.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks was recorded as something the research could not establish rather than as something the participant is confirmed not to do, and the two are not the same claim. What that costs is stated in the closing section.

---

## MONETA Money Bank

Researched 2026-08-17 · direct participant · leader on B1, B5 · confidence high [rec:R-A6-04]

### What they offer

Czech retail bank (one of the ten largest) offering card dispute handling via Internet Banking CARDS section and Smart Banka mobile app. Customers initiate a dispute by selecting a specific transaction and filing a claim directly from the transaction view — a transaction-level digital flow that eliminates paper forms and branch visits. MONETA handled 35,000 card payment disputes in calendar year 2024, a 29% year-on-year increase, and is the only Czech bank to have disclosed this volume figure. Dispute types covered: unauthorized transactions, undelivered goods, duplicate charges, unwanted subscriptions in mobile apps, failed ATM cash withdrawals, and duplicate merchant terminal billing.

Retail debit and credit cardholders in the Czech Republic across all age and income segments. Primary: existing MONETA customers (approximately 1.6 million; near-100% digital penetration as of FY2025). The dispute channel is designed for cardholders who want a home-based digital alternative to phone and branch dispute filing.

**Transaction-level dispute initiation in Smart Banka.** Customer opens Smart Banka, navigates to the CARDS section, selects the disputed transaction, and files a claim directly from that transaction view. No form download, phone call, or branch visit required. Confirmed as a core digital channel in the MONETA press release and in Finparada July 2025 reporting.

**Transaction-level dispute initiation in Internet Banking.** Customer logs into Internet Banking (web), selects the disputed transaction in the CARDS section, and initiates a claim from the transaction record. The claim form pre-populates with the transaction date, amount, and merchant name from the selected record.

**Messages-based dispute submission.** Customer files a dispute via the Messages section in Internet Banking or Smart Banka, selecting type Reklamace a stiznosti (Claims and Complaints). Supports written dispute description and document attachment as an alternative path to the transaction-level CARDS flow.

**Digital document upload during filing.** Customer attaches supporting evidence at the point of filing: order confirmation, merchant communication, proof of return, or other documentation. All submission is digital; no postal delivery of documents required.

**13-month dispute filing window.** Customer has up to 13 months from the transaction date to file a card payment dispute, the legal maximum in Czech Republic. Applies to all dispute categories including chargebacks for undelivered goods and unauthorized transactions. Confirmed by MONETA FAQ and mesec.cz.

**Fee-free dispute filing for unauthorized transactions and processing errors.** Filing a dispute for an unauthorized transaction or an incorrectly processed payment carries no fee. A 300 CZK fee applies only to voluntary chargebacks filed without a prior merchant resolution attempt; the bank discloses this fee and obtains client approval before proceeding. Fee structure effective April 1 2025.

**Online dispute form without login.** Customer can submit a dispute via a web form at moneta.cz without logging into Internet Banking or Smart Banka. Listed by mesec.cz as an available MONETA channel; serves customers with limited digital banking access or those preferring a written channel for complex disputes.

**Phone and chat dispute channels.** Customer calls 224 443 636 or uses web or app chat to file a dispute. These channels supplement digital self-service and are listed by MONETA and independently by mesec.cz as available for all dispute types. Fallback for customers who cannot or choose not to use the app or Internet Banking.

### What stands out

**Only Czech bank with a published card dispute volume — 35,000 disputes processed in calendar year 2024 with 29% year-on-year growth, the sole quantitative anchor in the Czech card dispute market.** MONETA press release (June 12 2025) states 35,000 card payment disputes in calendar year 2024 and 29% YoY growth. Independently corroborated: Finparada.cz (July 23 2025) editorial on MONETA dispute simplification states identical figures from a separate editorial angle; CT24 (December 30 2023) cited several thousand monthly chargebacks for MONETA with 10% December growth, consistent with a 2023 annual baseline of approximately 27,000 from which 29% growth reaches 35,000. No other Czech ring-1 bank has published an equivalent figure. The 35,000 covers all card payment dispute types, not only scheme chargebacks.

**Fully digital dispute filing from home — no paper form, email form, or branch visit required for any dispute type.** MONETA press release: clients can file from home through Internet Banking or Smart Banking. Finparada.cz (July 2025): old process required phone, postal mail, or in-person branch; digital channels replaced it and increased submission volumes, including cases clients previously would have abandoned. Mesec.cz (August 2025): Internet Banking, Smart Banka, online form, and chat confirmed as all-digital channels currently available.

**Published SLA of 35 working days maximum — the only Czech bank with a specific disclosed resolution time commitment, providing the market benchmark for H5.** MONETA press release and FAQ both state up to 35 working days as the resolution SLA. Mesec.cz (August 2025) confirms 35 working days as the legal maximum for disputes involving third parties and identifies MONETA as stating this as their SLA. No other Czech ring-1 bank reviewed in this research has published a specific resolution SLA.

**Digital simplification surfaced latent demand: online filing channels increased total submissions by capturing cases clients previously would not have filed.** MONETA press release: the introduction of online forms increased complaint submissions including cases clients might have previously ignored. Finparada.cz (July 2025) confirms this as MONETA's stated explanation for the 29% volume growth. The implication is that digital intake reveals actual dispute incidence that paper intake suppressed — a finding relevant to any Czech bank deploying similar digital channels.

### Where the journey stops

No evidenced in-app dispute status tracking — customers who file digitally have no confirmed way to see case progress after submission; resolution communicated only when the case is decided, up to 35 working days after filing, with no proactive interim updates described

At least one customer reports complaint handling as protracted — matters that should take days stretched into weeks

Published SLA of 35 working days (approximately 7 calendar weeks) is at the current legal maximum for third-party-involved disputes and will be non-compliant with the PSD3/PSR 14-day mandatory maximum expected to take effect 2027-2028

No confirmed card transaction push notification feature — Smart Banka real-time infrastructure is evidenced for personalized marketing triggers but no source reviewed lists proactive card transaction alerts among MONETA's dispute or fraud-response channels, leaving customers without a pre-dispute notification signal for unauthorized transactions

### What it costs

No dispute filing fee for unauthorized transactions, incorrectly processed payments, or standard chargebacks where merchant resolution was first attempted. Fee of 300 CZK for voluntary chargebacks filed without a prior merchant resolution attempt, effective April 1 2025; the bank discloses this fee and seeks client approval before proceeding. Fee of 1500 CZK for clearly unfounded, repetitive, or dishonestly motivated complaints. Published SLA: resolution communicated within 35 working days maximum. Dispute processing bundled with the customer account relationship; no standalone dispute service fee. Specific fee amounts are published in MONETA's fee schedule (sazebnik) effective April 1 2025; not displayed on the main dispute product pages — customers are referred to the fee schedule document.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks was recorded as something the research could not establish rather than as something the participant is confirmed not to do, and the two are not the same claim. What that costs is stated in the closing section.

---

## Air Bank

Researched 2026-08-17 · direct participant · leader on B1 · confidence high [rec:R-A6-05]

### What they offer

Czech retail bank serving 1.58 million clients with personal banking products: current accounts, payment cards (debit and virtual), consumer loans, mortgages, savings, and limited investments. Delivered primarily through the MyAir mobile app (85% client adoption, ~930k weekly logins) and internet banking, with 32 branches. Part of the PPF Group. In the card dispute context, Air Bank manages complaints through multi-channel submission — phone, app message, internet banking message, email, or branch — without offering transaction-level in-app dispute initiation from the transaction screen.

Retail customers in the Czech Republic. Primarily digital-first: 85% of 1.58 million clients use the MyAir mobile app with approximately 930,000 logging in on average five times per week. Air Bank targets customers who value transparent pricing and a high-quality mobile experience; 32 branches means digital and phone channels are the primary service pathway for most clients. The bank is a consumer lending leader (highest Czech market share in newly provided consumer loans in 2024 and 2025).

**Complaint submission via MyAir message or internet banking.** Customer can file a card dispute complaint as a free-text message through the MyAir mobile app or internet banking portal, routed to the bank's complaint team. This is a conversational messaging channel — the customer describes the dispute in their own words — not a structured transaction-level form. The full set of confirmed channels is: internet banking message, MyAir app message, email (info@airbank.cz), phone (547 134 134), and branch visit.

**Online complaint form for specific dispute scenarios.** Customer completes an online form at airbank.cz/poradna/reklamace/ for specific dispute scenarios: unauthorized payment, duplicate charge, or merchant denying receipt of payment. Required inputs include the last 4 digits of the card used, the transaction date and amount, and supporting documentation (order confirmation, merchant communication, or payment receipt depending on the dispute type).

**Immediate card lock via online banking and MyAir app.** Customer can lock or block their debit card immediately through online banking or the MyAir app if fraud or unauthorized use is suspected, preventing further charges while the dispute investigation proceeds. No branch visit or phone call is required for the block itself.

**Virtual payment cards (up to 7 new per week).** Customer can create up to 7 new virtual Mastercard payment cards per week through the MyAir app. Each virtual card carries its own card number, expiration date, and security code, separate from the physical debit card. Cards can be locked, unlocked, or discarded after a transaction, limiting fraud exposure on specific online purchases without requiring a dispute to be filed afterwards.

**Configurable account activity push notifications.** Customer can configure free push notifications via the MyAir app for account events including balance changes, failed payments, card blocks, and incoming transfers; SMS alerts cost 25 CZK per month for unlimited messages. Notifications are configurable per account and can be set for any change to the account. Whether Air Bank sends a real-time push notification on every individual card payment — as Revolut and N26 do — could not be confirmed from the fetched pages (see gaps).

**Phone as primary channel for unauthorized card transactions.** Air Bank's published guidance for unauthorized card transactions directs customers to call the customer service line (547 134 134) immediately on discovering the unauthorized payment. Phone operators can initiate the dispute, advise on card blocking, and coordinate next steps. This is the only channel Air Bank's own help pages name as the primary path for unauthorized transaction reports; other channels are confirmed available but not recommended as primary for this scenario.

**7 working-day clearing wait before some dispute categories can proceed.** For dispute categories such as merchant-not-acknowledging-payment and duplicate charges, Air Bank instructs customers to wait up to 7 working days to allow the transaction to settle before submitting a dispute. If no settlement occurs, the transaction disappears automatically; if it settles and the dispute still applies, the complaint form may then be submitted. This wait is required before the bank can action the claim and means same-day dispute filing is not available in these categories.

**13-month dispute window for unauthorized card transactions; 3-year window for other complaints.** Customers must report unauthorized card transactions within 13 months of execution, after which the claim is time-barred. Standard complaints (non-unauthorized-transaction) can be filed within 3 years. Air Bank recommends filing as soon as possible and ideally within 3 months of the event. This is a formal procedural boundary, not a resolution SLA.

### What stands out

**Transparent, fee-free current account with the entire fee schedule on one page.** Air Bank's official pricing (effective September 5, 2025) shows 0 CZK account maintenance, 0 CZK for two standard debit cards, and free push notification alerts. The bank markets the fee schedule as fitting on one page. Financera.cz independently scores Air Bank 100/100 for pricing (the maximum available score) among 33 Czech providers.

**85% mobile app adoption with approximately 930,000 weekly logins — the highest confirmed digital engagement rate among Czech ring-1 banks profiled in this run.** Air Bank 2025 annual results confirm approximately 85% of 1.58 million clients use the MyAir app, with approximately 930,000 clients logging in an average of five times per week. No Czech ring-1 bank (ČSOB, KB, mBank, MONETA, Raiffeisenbank) has published a comparable client-level digital adoption figure in the research for this run.

**Virtual card capability (up to 7 per week) allows proactive fraud containment before a dispute is needed — not confirmed for ČSOB, mBank CZ, or Raiffeisenbank in this run.** Air Bank allows customers to create up to 7 new virtual Mastercard cards per week, each with separate credentials, lockable and discardable individually. A virtual card issued for a specific merchant can be discarded immediately on suspicion of compromise, eliminating the need for a chargeback for future unauthorized charges from that credential. Top.cz confirms Czech Savings Bank and Partners Bank as Czech banks with single-use virtual cards; Revolut also offers them. Air Bank's multi-virtual-card capability is a documented security differentiator versus the other Czech ring-1 incumbent banks profiled here.

**Top-2 independent bank rating in every Czech banking review consulted — the strongest brand signal of any mid-size Czech retail bank.** Finex.cz: 97% overall, ranked 2nd among all Czech banks. Financera.cz: 83/100, ranked 3rd of 33 providers. These rankings place Air Bank above every other mid-size Czech incumbent bank and behind only Revolut (and, variably, KB) in independent assessments.

### Where the journey stops

Not among the two Czech banks with transaction-level card dispute initiation — customers cannot click on a specific payment in the transaction list to dispute it; they must navigate to a separate form or initiate a message outside the transaction context

No documented case status tracking for filed disputes — independent reporting on Air Bank's dispute channels does not describe any structured case-status-tracking capability; after submission customers receive no in-app or portal-based progress update

Small branch network (32 locations) limits in-person dispute support and escalation for customers outside major cities

Poor English-language customer support documented in multiple independent customer reviews — a material barrier for non-Czech-speaking customers needing to file or escalate a card dispute

### What it costs

Account maintenance: 0 CZK. Standard debit card: 0 CZK, up to two cards included. Foreign currency card (from July 2025): 100 CZK per month, waived if the customer makes at least 5 card payments and receives at least 25,000 CZK in the same month. ATM withdrawals: 0 CZK from 370+ Air Bank ATMs or via cashback at partner merchants; 35 CZK from non-partner Czech and international ATMs (effective September 5, 2025, increased by 10 CZK). Push notification alerts via MyAir: free. SMS account activity alerts: 25 CZK per month for unlimited messages. The bank markets the complete fee schedule as fitting on a single page.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks was recorded as something the research could not establish rather than as something the participant is confirmed not to do, and the two are not the same claim. What that costs is stated in the closing section.

---

## Raiffeisenbank CZ

Researched 2026-08-17 · direct participant · leader on B2 · confidence high [rec:R-A6-06]

### What they offer

Fifth-largest Czech retail bank (7.74% market share, 1.91 million customers, 125 branches, 157 ATMs), part of Raiffeisen Bank International group. In card dispute handling: customers may file a card dispute via branch visit, customer service phone line (7 a.m.-10 p.m.), email, authenticated in-app chat (eKonto app, post-login), or by downloading and submitting the bank's Word document form ('Reklamace transakce realizované platební kartou'). Immediate card blocking is available 24/7 via a dedicated phone line (+420 412 446 402). Formal dispute SLA: 15 working days for payment services disputes (standard), up to 35 working days for complex cases with mandatory customer notification if the extension applies. No structured digital self-service dispute portal or transaction-level in-app dispute initiation is confirmed.

Czech personal retail debit and credit cardholders across banking segments — from basic eKonto Smart (zero monthly fee) to Premium Banking clients. The eKonto mobile app and internet banking are the primary digital channels; digital penetration is growing. Business cardholder dispute handling is in scope for the bank but is not separately profiled in this card.

**24/7 dedicated card blocking line.** Customers call +420 412 446 402 at any hour to immediately block a compromised, lost, or stolen card — no app login, branch visit, or business hours required. Operates separately from the standard customer service line and is the fastest route to stopping unauthorized card use.

**In-app authenticated chat for transaction dispute notification.** After logging into the eKonto mobile app, customers can send text messages to bank employees who can receive reports about specific transactions. The chat is restricted to authenticated (logged-in) users, making it a digital alternative to calling during the 7 a.m.-10 p.m. service window — but it is a conversational channel, not a self-service structured intake form.

**Downloadable card transaction dispute form.** The 'Reklamace transakce realizované platební kartou' Word document (.doc) is available on rb.cz. Customers complete the form and submit it at a branch or by email — it is the structured document the bank uses to formally record and process a chargeback claim, making it the entry point to the bank's dispute workflow.

**Email dispute submission.** Customers can send their completed dispute form and supporting documentation to info@rb.cz, enabling dispute filing without a branch visit at any time. The email reaches the bank's complaints department directly (Raiffeisenbank, a.s., Reklamace, Olomouc).

**Transaction history with advanced filter.** The eKonto mobile app (improved May 2025) allows filtering the transaction list by payment direction, time period, amount, payment type, and category — enabling customers to identify and locate a disputed transaction before contacting the bank to file.

**Self-service card blocking and activation in digital banking.** Customers can block or activate their debit or credit card directly within internet banking and the eKonto mobile app — a self-service security action for suspected card fraud that does not require calling the bank.

**Dispute resolution SLA with mandatory escalation notification.** The bank commits to a 15 working day response for payment services disputes. If the standard timeline cannot be met, it must notify the customer of the reason and provide a final resolution within 35 working days — a legal obligation to communicate any delay rather than leaving the customer without information.

**Multi-channel complaint submission.** Card disputes can be filed via five distinct paths: branch visit (125 branches), customer service phone line (7 a.m.-10 p.m.), email, in-app chat, and downloadable form. No single channel is the required route — customers choose based on availability and preference.

### What stands out

**Authenticated in-app chat removes phone-queue wait for dispute notification.** The eKonto app chat operates after login, enabling customers to message bank employees during bank hours about specific transactions — confirmed on the rb.cz complaints page and noted in independent reviews citing a 'Communication centre' within the app (finex.cz). For customers who prefer text to phone, this eliminates hold-time friction during the 7 a.m.-10 p.m. service window. Scope is limited: the chat is a communication tool and does not initiate a structured dispute workflow or issue a case reference.

**24/7 card blocking without app dependency or branch access.** A dedicated card emergency line (+420 412 446 402) is listed on rb.cz/en/about-us/contacts/reklamace as operating 24 hours, 7 days a week. Customers who discover unauthorized card use outside banking hours can block the card immediately without requiring internet access, a bank app, or a branch visit. The 24/7 blocking line is independent of the standard customer service line.

**Five distinct dispute submission paths reduce access barriers for different customer situations.** rb.cz/en/about-us/contacts/reklamace lists branch, phone, email, in-app chat, and downloadable form. The bank's own public statement that 'several easy and quick ways to file complaints' exist is corroborated by this actual channel list. Customers without easy branch access (rural locations, non-standard hours) have multiple alternatives. Framing is access rather than digital self-service — the emphasis is on channel count, not structured digital workflows.

### Where the journey stops

No structured self-service digital dispute initiation — the formal card dispute process requires completing and submitting a Word document form; Raiffeisenbank is not among the two Czech banks confirmed as enabling transaction-level in-app dispute filing

No digital dispute status tracking — once a dispute is filed, no self-service channel to check case progress is identified; the only route to a status update is to contact the bank again through the same channels used to file

Public website chat reported as providing 'no responses' by independent reviewers — the publicly accessible digital communication channel does not reliably function as a dispute intake, and the in-app authenticated chat has not been independently confirmed as a formal dispute channel

### What it costs

No fee for filing or processing a card dispute. Account maintenance: eKonto Smart (CHYTRÝ účet) carries no monthly maintenance fee and includes a free Visa Classic debit card and free ATM withdrawals worldwide; the Active Account tier carries 49 CZK per month. February 2025 fee changes increased cash deposit fees to 49 CZK per additional monthly deposit (up from 29 CZK) and cash withdrawal fees to 150 CZK (up from 120 CZK). Card-dispute-specific fee lines are not separately enumerated in publicly accessible pages; the full price schedule is published as PDFs at rb.cz/attachments/ceniky/price-list-pi-1.pdf and price-list-pi-2.pdf, which returned binary content in this research and could not be read.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks was recorded as something the research could not establish rather than as something the participant is confirmed not to do, and the two are not the same claim. What that costs is stated in the closing section.

---

## Revolut

Researched 2026-08-17 · direct participant · innovator on B1, B2, B3, B4, B5, T1, T2, T3 · confidence high [rec:R-A6-07]

### What they offer

Global neobank (UK-incorporated; EU banking license via Bank of Lithuania since December 2018; full UK banking license March 2026) offering current accounts, debit cards, foreign exchange, stock trading, cryptocurrency, personal loans, insurance, and peer-to-peer payments through a single mobile app. In the card dispute domain: instant transaction push notifications, one-tap card freeze, fully in-app dispute initiation directly from the transaction screen, LLM-powered automated adjudication for sub-threshold disputes, real-time dispute status tracking by tapping the disputed transaction, and stage-by-stage outcome notifications with decision explanations. Available in Czech Republic with local CZK accounts and a dedicated Czech-language entity (revolut.com/en-CZ).

Retail cardholders globally — 68.3 million customers by end 2025 — primarily digitally-native adults preferring mobile-first banking without branch dependency. In Czech Republic: serves Czech residents with a local CZK account and Mastercard or Visa debit card. Dispute handling and chargeback initiation available across all plan tiers from Standard (free) to Ultra.

**Instant push notification on every card transaction.** Cardholder receives a real-time push notification showing merchant name, amount, and timestamp for every card payment; unauthorized charges appear within seconds of occurring, enabling action before a statement is issued and before further spending on a compromised card.

**One-tap card freeze from notification or transaction screen.** From a push notification or from the transaction list, the cardholder freezes the card with a single tap; further unauthorized use is blocked immediately without a phone call, branch visit, or waiting for a callback.

**In-app dispute initiation directly from the disputed transaction.** Cardholder taps the transaction in the app, selects Report an issue, chooses the issue type (unauthorized, merchant dispute, ATM, scam, etc.), and — if the case is eligible — taps Submit Chargeback Form; the entire filing flow is in-app with no paper form, no branch, and no phone call required at any step.

**LLM automated adjudication for sub-threshold disputes.** Revolut's LLM agents automatically analyse customer and merchant submissions for disputes below a specified monetary threshold and issue a resolution without human review; this compresses resolution time for qualifying low-value cases to a fraction of the standard chargeback timeline, and breaks the linear relationship between dispute volume and headcount.

**In-app real-time dispute status tracking.** After filing a dispute, the cardholder taps the disputed transaction at any time to see the current status; status is self-serve and visible in-app without contacting customer support or calling the bank, directly addressing the substitute behaviour this run measures (substitute:phone-call).

**Proactive stage-by-stage dispute notifications with outcome explanation.** Revolut notifies the cardholder at each stage of the dispute process via email and in-app with the expected outcome date; when a decision is reached, an explanation is provided in-app and by email — not a binary approved or denied without context.

**Tiered resolution timeline with fraud fast-track.** Unauthorized fraud cases resolved within 10 days on a dedicated fast-track. ATM disputes up to 45 days. Standard disputes resolved within 5 weeks for 85 percent of cases; complex cases up to 12 weeks. Cardholder is informed which track their case is on and receives the expected outcome date.

**In-app evidence upload within the dispute form.** Cardholder uploads supporting documentation — photos, screenshots, receipts — directly within the in-app dispute form without switching to email or visiting a branch to submit evidence.

**Dispute cancellation within the app.** Cardholder can cancel a submitted dispute from within the Revolut app if the matter is resolved directly with the merchant before the chargeback process concludes; the cancellation route is available in the same transaction view used for initiation.

### What stands out

**Only participant on this map with confirmed LLM automated chargeback adjudication in production at consumer scale.** Revolut's own dispute documentation states it uses LLM agents to automatically adjudicate chargeback claims below a specified value by analysing customer and merchant submissions. No Czech ring-1 banking participant in this run (CSOB, KB, mBank, MONETA, AIR Bank, Raiffeisenbank) has confirmed equivalent automated adjudication in production.

**The most integrated end-to-end dispute journey on this map — notification, freeze, initiation, adjudication, status tracking, and outcome explanation without leaving the app.** Revolut's cardholder help documentation and the A5 landscape map entry both document the complete chain: instant push notification, one-tap freeze, in-app dispute initiation from the transaction screen, LLM adjudication for qualifying cases, real-time status tracking by tapping the disputed transaction, expected outcome dates, and decision explanations by email and in-app. No other participant on this map is confirmed to integrate all six steps in a single app experience.

**85 percent of disputes resolved within 5 weeks with fraud cases in 10 days — faster than the only published Czech banking SLA and ahead of the PSD3/PSR 14-day ceiling for fraud.** Revolut's published timelines: 85 percent within 5 weeks; fraud cases within 10 days. The only published Czech bank SLA in this run is MONETA at up to 35 working days (approximately 7 calendar weeks). Revolut outperforms that benchmark for the large majority of cases. The forthcoming PSD3/PSR regulation (R1) will mandate 14-day maximum resolution; Revolut's fraud fast-track already meets that ceiling.

**Pan-EU banking consistency under a single EU license — Czech cardholders access the same dispute features as any EU cardholder without local adaptation gaps.** Revolut operates across the EU under a banking license from the Bank of Lithuania (December 2018), providing consistent product features across member states. Czech Republic has a dedicated entity with CZK accounts. The Czech help section (en-CZ) confirms card payment dispute handling, dispute cancellation, fraud reporting, and chargeback updates as available services.

### Where the journey stops

Customer service for personal account holders is AI chatbot-only with no telephone access; analysis of 391,000-plus user reviews identifies this as the single most consistent complaint, and complex dispute cases can remain in automated loops for weeks with no meaningful human escalation path

3,242 authorised push payment fraud complaints against Revolut were escalated to the UK Financial Ombudsman Service in 2024 — more than against any other bank or fintech operating in the UK — with approximately 30 percent of upheld complaints resulting in compensation, described as significantly lower than at traditional banks

Compliance-triggered account freezes without prior warning can make funds inaccessible for days or weeks — a risk that compounds the situation for a cardholder simultaneously disputing an unauthorized transaction and needing access to their account

### What it costs

Freemium subscription model with five tiers in Czech Republic: Standard at 0 CZK per month (all core features including dispute handling), Plus at 114.99 CZK, Premium at 244.99 CZK with unlimited foreign exchange and no weekend surcharge, Metal at 394.99 CZK with higher ATM limits, Ultra at 1,320 CZK per month. EU equivalent pricing as of 1 August 2025: Standard 0 EUR, Plus 2.99 EUR, Premium 7.99 EUR, Metal 13.99 EUR, Ultra 50 EUR per month. Dispute handling and chargeback initiation are available on all tiers including the free Standard tier — no paid plan is required to raise a dispute. A per-chargeback fee applies when a chargeback is successful; the fee amount depends on the transaction currency and is not published in any publicly accessible rate schedule from fetched sources — an unpublished price is itself a market fact.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks was recorded as something the research could not establish rather than as something the participant is confirmed not to do, and the two are not the same claim. What that costs is stated in the closing section.

---

## N26

Researched 2026-08-17 · direct participant · innovator on B3, B4, T1, T2 · confidence high [rec:R-A6-08]

### What they offer

EU neobank (BaFin-licensed, passported across 24 EU/EEA countries). Delivers mobile-first retail banking with no branches. Core product for cardholders: Mastercard debit card on tiered subscription plans (Standard free through Metal at 16.90 EUR/month). In the card dispute and chargeback space: fully in-app dispute initiation from the transaction list, automatic card blocking and free replacement card ordering on submission for unauthorized transactions, and real-time status tracking via in-app 'Check progress' on the disputed transaction. Dispute resolution routes through N26 analyst review, then Mastercard chargeback process engaging the merchant.

Retail banking customers across 24 EU/EEA countries: Austria, Belgium, Denmark, Estonia, Finland, France, Germany, Greece, Iceland, Ireland, Italy, Latvia, Liechtenstein, Lithuania, Luxembourg, Netherlands, Norway, Poland, Portugal, Slovakia, Slovenia, Spain, Sweden, Switzerland. Czech Republic is explicitly excluded — N26 does not offer banking accounts to Czech Republic residents (confirmed from official N26 country availability page, 2026-08-17). Primary customer profile: mobile-first, tech-savvy urban retail customers preferring digital-only banking without branches. EU expat community is a secondary segment.

**In-app dispute initiation from the transaction list.** Customer opens the Home tab, selects the disputed transaction, taps 'There's something wrong,' and follows on-screen guided steps to submit the dispute — no phone call, branch visit, form download, or email required at any step. Covers both unauthorized transactions (fraud) and authorized transactions (merchant errors, undelivered goods).

**Automatic card blocking on unauthorized-transaction dispute submission.** For disputes citing unauthorized card use, N26 blocks the card the moment the chargeback request is submitted, within the same flow. No separate action or customer service contact is required to complete the block — it happens automatically on submission.

**Free replacement card ordering embedded in the dispute flow.** After card blocking is confirmed, the customer is immediately redirected to the Cards tab to order a replacement card at no cost (standard delivery). Express delivery is available for 25 EUR. The ordering step is part of the dispute submission sequence — no separate customer service contact is needed.

**Self-service dispute status tracking via 'Check progress'.** Customer accesses the disputed transaction in their transaction list and taps 'Check progress' to see the current state of their case at any time. The status screen is available from the moment of submission through to resolution — the customer does not need to call to find out where their case stands.

**Proactive in-app dispute progress updates.** N26 states it will 'update you in the app whenever there's progress' — the customer does not need to initiate a status check to learn that something has changed. If additional documentation is needed, N26 contacts the customer through the app. All case communication is channelled in-app throughout the resolution period.

**Real-time push notifications for all card transactions.** Cardholders receive instant push notifications for every card transaction on all plans, enabling immediate identification of an unauthorized charge and same-session dispute initiation. The notification is the entry point for the notification-to-dispute-to-block sequence the run's problems target.

**90-day in-app dispute filing window.** Customers can file a dispute through the in-app flow up to 90 days after the transaction date. For goods not received, Mastercard's 120-day chargeback guideline applies. The app enforces the window — the dispute button becomes unavailable after 90 days. Disputes cannot be filed after this window without contacting support directly.

**Purchase protection on Metal plan (up to 2,500 EUR per claim).** Metal tier subscribers (16.90 EUR/month) receive purchase protection covering eligible purchases up to 2,500 EUR per claim through Allianz Assistance — an additional layer beyond the Mastercard chargeback process. Standard, Smart, and Go tiers do not include purchase protection; dispute outcomes on those tiers depend entirely on Mastercard chargeback resolution.

### What stands out

**Best-documented real-time in-app dispute status tracking in the mapped European market — the customer sees case progress without calling.** The 'Check progress' feature on the disputed transaction, combined with proactive in-app push updates 'whenever there's progress,' is the clearest documented implementation of continuous, always-available dispute status visibility in the market. The pull-and-push model (customer can check at any time; N26 also notifies proactively) removes the need for status-enquiry calls throughout the resolution period. The landscape map identifies this as the best-documented in-app dispute status tracking model on the map.

**Dispute submission, card blocking, and replacement card ordering completed as a single uninterrupted in-app flow.** N26 documentation states: 'Your card will be automatically blocked as soon as you submit the chargeback request' and the customer is then 'redirected to the Cards tab' to order a replacement. Three steps requiring separate actions or calls in most banking models — dispute filing, card cancellation, card replacement ordering — are a single continuous in-app sequence with no break in context.

**Complete unauthorized-transaction response (notification, dispute, block, status) without a phone call, form download, or branch visit at any step.** All four steps are documented as in-app on N26's own support pages: push notification on transaction, 'There's something wrong' dispute initiation, automatic card block, in-app 'Check progress' status tracking. No point in the documented flow references a phone number, downloadable form, or branch. This is the model the run's problem statement describes as the target outcome for a Czech banking initiative.

### Where the journey stops

BaFin's December 2025 special audit found 'serious deficiencies in risk and complaint management' at N26 — a regulatory finding that the bank's complaint handling is materially substandard, issued by its own home regulator

Customer complaints document chargebacks denied by invoking merchant terms and conditions, with customers told to 'resolve this with local authorities' — a pattern of chargeback refusal inconsistent with N26's in-app dispute marketing

Customer reports document significant delays between dispute submission and fund access — including cases of funds frozen for over a month where N26 had confirmed a 2 to 3 day refund timeline — indicating no effective interim access to disputed funds

### What it costs

Four tiers by monthly subscription fee: Standard (free, no monthly fee), Smart (4.90 EUR/month), Go (9.90 EUR/month), Metal (16.90 EUR/month). Multi-month pre-payment discounts available on premium tiers. Core dispute capabilities — in-app dispute initiation, automatic card blocking, replacement card ordering, and 'Check progress' status tracking — are available on all four tiers and are not gated by subscription level. 24/7 in-app chat support is included on all tiers; phone support is restricted to Go and Metal, with Metal receiving a priority line. Purchase protection up to 2,500 EUR per claim is Metal-only. Standard delivery of replacement card is free on all tiers for unauthorized transaction disputes; express delivery costs 25 EUR. No provisional credit or interim refund policy is documented on any tier. Deposit protection up to 100,000 EUR applies across all tiers under the BaFin deposit guarantee scheme.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks was recorded as something the research could not establish rather than as something the participant is confirmed not to do, and the two are not the same claim. What that costs is stated in the closing section.

---

## Monzo

Researched 2026-08-17 · direct participant · innovator on B2, B4 · confidence high [rec:R-A6-09]

### What they offer

UK digital bank offering a full current account managed entirely through the Monzo mobile app. Core product includes Mastercard card payments, in-app dispute initiation from the transaction screen, real-time push notification for every card use, instant in-app card freeze, and in-app case status tracking — all without requiring a phone call, branch visit, or printed form. Dispute handling covers card payments only; bank transfers and direct debits are excluded. Additional features include savings pots, budgeting categories, peer-to-peer transfers, and overdraft facility. Paid subscription plans (Extra, Perks, Max) add travel insurance, phone insurance, and virtual cards. Monzo is FCA/PRA authorised in the UK and holds FSCS deposit protection up to £120,000 per person. It does not hold an EU banking licence and does not serve Czech Republic residents.

UK retail banking customers aged 18 and over seeking smartphone-native banking with no branch dependency. Primary audience: individuals who want to manage their entire banking relationship, including fraud response and dispute handling, through a mobile app. Not available to Czech Republic residents. Profiled in this run as a reference point — the documented design originator of the in-app dispute model that Revolut, N26, and ČS George built against — rather than as a direct competitor for the Czech retail card-dispute market.

**In-app dispute initiation from the transaction screen.** Customer taps any transaction in the activity feed, scrolls to 'Something wrong? Get help,' selects the heading matching their situation, and taps 'Dispute this transaction.' No form download, branch visit, or phone call is required at any step. Scope is card payments only; transfers and direct debits are not covered by this flow.

**Real-time push notification on every card use.** Every card transaction — online or in person — triggers an immediate push alert to the customer's device showing the merchant name, location, and amount at the moment of the transaction. Enables instant recognition of an unauthorized charge before a statement is produced.

**In-app card freeze and instant unfreeze.** Customer stops all transactions on their Monzo card with a few taps in the app and reverses the freeze with equal ease, without committing to card cancellation or replacement. Designed for suspected unauthorized use or loss — allows immediate suspension while the customer investigates.

**In-app dispute status tracking.** Dispute progress is visible in the Help tab and directly on the disputed transaction. Monzo commits to 'always let you know what's happening' throughout the process, including notification before any provisional credit is reversed if a merchant challenge succeeds.

**Provisional temporary refund during dispute.** Where possible, Monzo issues a provisional credit upfront at the point of dispute initiation, before final determination. Not available for every dispute type. The provisional refund becomes permanent if the merchant agrees or does not respond within 8 weeks; it may be reversed if the merchant demonstrates the charge was correct, with advance notice to the customer.

**Guided in-app question flow for dispute documentation.** Monzo collects claim type, supporting documents (receipts, proof of merchant contact), and case details through automated in-app questions. The intake step requires no human agent. The customer submits evidence digitally without posting documents or visiting a branch.

**Three opt-in anti-fraud controls for high-value transfers (July 2024).** Known Locations (blocks bank transfers outside designated locations such as home or work), Trusted Contacts (requires a Monzo-using contact to verify via call or video), and Secret QR Codes (requires scanning a code kept on a separate device or printout). Applies to bank transfers and savings withdrawals above daily limits. Customer must enable at least two of three as backup.

**Call Status Tool for impersonation fraud prevention (September 2023).** In-app feature that verifies in real time whether an incoming call claiming to be from Monzo is genuine. Reported to have identified more than 4,000 fraud attempts in the period since launch through the time of reporting.

### What stands out

**Full end-to-end dispute journey with no non-digital step — initiation, status tracking, and outcome notification all accessible through the disputed transaction itself.** Monzo help documentation confirms dispute initiation from the transaction tap, automated guided question collection, status visible in the Help tab and on the transaction, and proactive notification of outcome changes including advance notice before provisional credit reversal. No form download, branch visit, or phone call is required at any step of the process.

**Provisional temporary credit offered upfront during the dispute window to protect customer cash flow before final determination.** Monzo commits to issuing a provisional refund 'whenever we can' at the point of dispute initiation, reducing the customer cash-flow impact during the 8-12 week resolution period. Note: under UK FCA Payment Services Regulations 2017, banks must refund unauthorized transaction amounts within one business day in most cases — this may reflect a regulatory obligation rather than solely a product choice. The corresponding EU/Czech obligation under PSD2 is a compliance question for the synthesis to flag.

**82% customer satisfaction score in Which? banking survey, third highest among UK banks — independently measured.** Which?, the UK consumer advocacy body, recorded Monzo at 82% customer satisfaction in its banking survey (July 2024 reporting), placing it third overall among UK banks. This is an independently measured score, not a self-reported metric.

**Three new anti-fraud controls introduced in July 2024, extending dispute prevention to stolen-phone and impersonation-scam scenarios beyond what the card-dispute channel alone addresses.** Known Locations, Trusted Contacts, and Secret QR Codes launched July 2024 for bank transfers and savings withdrawals. Call Status Tool launched September 2023, with more than 4,000 fraud attempt detections reported through the time of the Which? article. These tools address fraud vectors (stolen phone used for transfers, impersonation by phone) that card-dispute handling cannot resolve after the fact.

### Where the journey stops

Low independent customer rating: 1.6 out of 5 from 239 reviews on Reviews.io (14% recommendation rate) — recurring themes include delayed dispute processing with reported 7-plus day waiting periods before a case is accepted, provisional refunds reversed after initial approval, and AI-only chat support with no escalation path to a human agent

Accounts frozen without notice or explanation cited by multiple independent reviewers, with customers unable to access funds for two to four days — undermines the instant-response positioning and is particularly disruptive for customers who have already reported fraud

Dispute outcome communication described as 'zero communication throughout' in independent customer reviews — the in-app status tracking documented in Monzo's own help pages does not consistently translate to proactive updates in practice

### What it costs

Free current account at £0 per month includes full dispute handling, in-app card freeze, and real-time notifications. Paid subscription plans replaced the retired Plus (£5/month) and Premium (£15/month), both closed to new sign-ups since April 2024: Extra at £3 per month, Perks at £9 per month, Max at £19 per month (three-month minimum commitment, ages 18 to 69 only). Max adds worldwide travel insurance, worldwide phone insurance, and UK and Europe breakdown cover. Virtual cards for payment-data protection are available on paid plans. Dispute handling is included in all tiers at no additional charge; no dispute-specific fees are published separately. FSCS deposit protection applies to all tiers up to £120,000 per person. Prices are denominated in GBP; Monzo does not operate in the Czech Republic and these tariffs are not directly comparable to Czech bank pricing.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks was recorded as something the research could not establish rather than as something the participant is confirmed not to do, and the two are not the same claim. What that costs is stated in the closing section.

---

## Mastercard (Ethoca and dispute management platform)

Researched 2026-08-17 · adjacent infrastructure · leader on T3, T4 · confidence high [rec:R-A6-10]

### What they offer

Mastercard operates the global payment network and scheme infrastructure underpinning all Mastercard-branded card transactions. In the card dispute space its offering has three layers: (1) the mandatory scheme framework — chargeback rules, reason codes, process timelines, and compliance monitoring every Mastercard issuer must follow; (2) dispute-lifecycle tooling — the Mastercom platform through which issuers and acquirers manage formal chargebacks from initiation through arbitration; and (3) optional pre-dispute and fraud-deflection products — Ethoca Alerts (pre-chargeback merchant-issuer alert network), Ethoca Consumer Clarity (transaction enrichment for banking apps and call centres), and Decision Intelligence Pro (AI fraud scoring at authorization). Mastercard does not serve retail cardholders directly; issuers build the cardholder experience on top of the scheme rails. Every bank that issues Mastercard cards is already bound by the mandatory layer; the optional products require separate commercial adoption.

Payment issuers (card-issuing banks and credit unions), acquirers (merchant-acquiring banks), and merchants. Every bank in scope for this run that issues Mastercard cards — including Česká spořitelna — is already in this segment and bound by mandatory scheme rules. Optional products (Ethoca Alerts, Consumer Clarity, Decision Intelligence Pro) are sold separately; issuer adoption is voluntary and varies across the estate.

**Scheme chargeback filing and timeline framework.** Mastercard's rules give cardholders a 120-day filing window from the transaction date, extended to 540 days in specific cases such as subscription services where a merchant ceases operating. Merchant response through second presentment is 45 days for most dispute categories; digital goods and services received a 30-day window following a 2025 rule change. Pre-arbitration is mandatory before arbitration for cardholder dispute (4853) and point-of-interaction error (4834) categories; optional for authorization (4808) and fraud (4837) chargebacks. These timelines are scheme-mandated and cannot be shortened or extended by individual issuers — they are the hard outer constraints for every Mastercard dispute on this map.

**Reason code framework structuring every dispute.** Mastercard assigns every card dispute to one of six reason code categories: authorization errors (4808, 4834), no cardholder authorization/fraud (4837, 4849, 4870, 4871), cardholder disputes (4853 — with 11 subcategories), installment billing (4850), and disputes not classified elsewhere (4854, US-only). The reason code determines what evidence is required from the merchant, which process stages are mandatory, and what the issuer must supply to support the chargeback. Codes are scheme-mandated; issuers cannot modify or create their own categories.

**Mastercom dispute lifecycle management platform.** Mastercom is the centralized platform through which all Mastercard issuers and acquirers manage the formal chargeback lifecycle — filing, second presentment, pre-arbitration, and arbitration. Mastercard consolidated its previously fragmented dispute management systems into Mastercom and installed a rules engine to eliminate noise from the ecosystem. It handles automated document exchange, compliance tracking, and pre-chargeback workflows. All Mastercard dispute processing runs through Mastercom or compatible acquirer systems.

**Ethoca Alerts pre-chargeback merchant notification network.** Ethoca Alerts connects issuing banks to enrolled merchants so that when a cardholder signals a dispute, the merchant receives a near-real-time notification with a window to refund the purchase and cancel fulfillment before the formal chargeback is filed. The issuer sends the dispute signal; the merchant decides whether to refund. Resolution data: 30-40% chargeback reduction for enrolled merchant portfolios; 80% of eligible disputes from Fiserv issuers resolved in under 24 hours via the Ethoca channel. Worldpay integrated the network for over one million merchants in March 2024. Adoption by issuers and merchants is not mandatory — both parties join the network separately.

**Ethoca Consumer Clarity transaction enrichment.** Consumer Clarity provides recognizable merchant information — trading name, logo, and itemized receipt data — to issuing banks, displaying it in banking apps and call-center tools when a cardholder queries a transaction. By resolving transaction-recognition confusion before the cardholder concludes the charge was fraudulent, it deflects first-party disputes before they enter the formal scheme process. Consumer Clarity is an optional product; issuers choose whether to integrate it into their banking app and call-center tooling.

**Decision Intelligence Pro AI fraud scoring at authorization.** Decision Intelligence Pro generates a real-time fraud risk score for every Mastercard transaction at the moment of authorization, analyzing 1 trillion network data points in under 50 milliseconds. Issuers can incorporate the score into their own fraud decisioning — approving low-risk transactions, declining high-risk ones, or routing to step-up authentication. Because the model runs across the full Mastercard network rather than one issuer's portfolio, it surfaces cross-issuer fraud patterns no individual issuer's model can replicate. Published performance: 20% average improvement in fraud detection. Use of the score is the issuer's own choice.

**Mastercom Collaboration pre-dispute issuer-acquirer information exchange.** Mastercom Collaboration enables issuers and acquirers to exchange dispute information and negotiate resolution before filing a formal chargeback. By moving dispute conversation upstream — before the scheme's formal timeline starts — it allows more disputes to be resolved cooperatively, reducing the formal chargeback count and associated fees. This is an optional capability within Mastercom, not required for scheme participation.

**Third-party CRM integration via Ethoca API.** Issuers can connect Ethoca Alerts and Consumer Clarity data to third-party case management and CRM platforms. Mastercard and Salesforce launched a live integration with Salesforce Financial Services Cloud in May 2024, enabling bank dispute agents to manage intake, case tracking, reporting, and prevention from a unified platform with Mastercard dispute intelligence embedded. Available to existing Salesforce FSC customers from the announcement date, without custom Mastercard API development by the issuer.

### What stands out

**The only scheme whose mandatory rules set the outer timeline of every Mastercard card dispute — the 120-day cardholder filing window and the 45-day response deadline are scheme rules no issuer can change.** Chargebacks911 confirms the 120-day cardholder filing window, 540-day extended cases, and the 45-day merchant response window as Mastercard scheme requirements. No issuer-level decision changes these limits; they are contractual conditions of network participation. The distinction matters for initiative design: an issuer citing scheme timelines as a reason not to speed up resolution is citing a ceiling, not a floor — scheme rules do not prevent faster internal processing.

**Ethoca Alerts is the largest pre-chargeback alert network operating within the Mastercard scheme, with published 30-40% chargeback reduction and 80% same-day resolution rates at Fiserv-issuer scale.** Mastercard/Ethoca publishes the 30-40% chargeback reduction figure and the 80% resolution-under-24-hours rate for eligible Fiserv-issuer disputes. Worldpay enrolled over one million merchants in March 2024. These are the only published performance figures for a pre-chargeback alert service in the Mastercard ecosystem, and represent the ceiling for dispute deflection an issuer can access by joining the network.

**Decision Intelligence Pro is the only AI fraud score that runs on the full Mastercard network at authorization time, before any issuer-side fraud model runs.** Chargebackgurus, citing Mastercard State of Chargebacks data, reports that Decision Intelligence Pro analyzes 1 trillion data points per transaction in under 50 milliseconds with a 20% average fraud detection improvement. Because the model spans the full network rather than one issuer's portfolio, it surfaces fraud patterns no single issuer's proprietary model can replicate. The structural capability is derived from Mastercard's position as the network operator, not from any feature an issuer can build independently.

**Consumer Clarity deflects first-party fraud — the largest single chargeback driver — at the moment of cardholder confusion, before a dispute enters the formal scheme process.** Ethoca describes Consumer Clarity as providing recognizable purchase information to reduce transaction confusion and first-party fraud by displaying merchant data in the issuing bank's app at the point of inquiry. Because first-party fraud (friendly fraud) originates when cardholders fail to recognize a legitimate transaction and report it as fraudulent, placing the correct information in front of the cardholder at that moment stops the dispute before it is filed.

### Where the journey stops

The scheme's 45-day chargeback cycle is the binding outer limit on resolution speed; no issuer-side digital investment reduces the formal scheme deadline — only faster internal adjudication closes the gap below that ceiling

Ethoca Alerts network effectiveness is entirely dependent on merchant enrollment — unconnected merchants generate no alerts, and coverage is therefore uneven across card portfolios; Czech-specific merchant enrollment is not publicly established

Consumer Clarity and Ethoca Alerts are opt-in products requiring separate commercial agreements and technical integration; an issuer that has not contracted and integrated them derives no benefit from the scheme's pre-dispute deflection capabilities, however long it has been a Mastercard issuer

### What it costs

Mastercard's issuer-facing scheme fees — network assessment fees, per-dispute processing fees, and optional product fees — are not publicly disclosed and are set by bilateral agreement or confidential scheme tariff. The EU Dispute Administration Fee (DAF) is a scheme-assessed charge applied per chargeback, per second presentment, and per arbitration chargeback in EU markets; the DAF amount is scheme-determined and is not published in publicly available sources. Merchant-facing chargeback fees assessed by acquiring banks under Mastercard scheme guidelines are independently reported at $20-$100 per chargeback by third-party analytics sources, but these fees are acquirer-assessed, not Mastercard-direct. Optional products — Ethoca Alerts, Consumer Clarity, Decision Intelligence Pro — carry pricing negotiated directly with Mastercard; no list prices for any of these products are publicly available. Pricing is not a public market fact for this participant by design: scheme pricing is a confidential commercial relationship, and an unpublished price is the accurate description of the market.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks was recorded as something the research could not establish rather than as something the participant is confirmed not to do, and the two are not the same claim. What that costs is stated in the closing section.

---

## What we could not establish

**ČSOB (Československá Obchodní Banka).**

- **Digital form requirement detail** — the PDF dispute form (Prohlášení držitele karty o sporné transakci at platbakartou.csob.cz) is confirmed as the required intake mechanism, but the binary-encoded PDF was not readable in this research. Whether the form must be physically printed and hand-signed before scanning, or whether a digitally completed and electronically signed PDF is accepted for email submission, is not established. The landscape map's characterisation — download, print, sign, scan — is consistent with all evidence gathered but the print-and-sign step is not directly confirmed from a readable source in this run.
- **Dispute status tracking (H3)** — no evidence of any mechanism for cardholders to see the current status of a filed dispute was found in ČSOB Smart, on csob.cz, or in any independent review. The T&Cs commit to communicating the outcome but make no mention of interim status updates. Whether a case reference number is issued at submission enabling status queries by phone is not established. This is the single largest gap against the run's primary hypothesis.
- **Security outcome disclosure (H4)** — what ČSOB communicates to the cardholder about the security investigation — confirmation of fraud, whether the merchant was notified, whether the card scheme was involved — is not described in any publicly available source reviewed.
- **Ethoca pre-chargeback integration** — whether ČSOB has integrated Mastercard Ethoca Alerts for pre-chargeback deflection is not established. Given ČSOB's scale as a Mastercard issuer this is plausible but unconfirmed.
- **Fee for unjustified disputes** — the sazebník effective 1 July 2026 confirms a per-15-minute charge for unjustified card transaction complaints but the specific rate was not retrieved from any publicly accessible source; the PDF was not directly readable.
- **Push notification timing** — whether ČSOB Smart notifies at card authorization (enabling freeze before settlement) or only at settlement is not established. Authorization-time notification would materially change H1's gap assessment.

**Komerční banka.**

- **In-app dispute status tracking (primary H3 gap)** — Whether Mobilní banka or MojeBanka shows the status of a submitted dispute — case reference number, current investigation stage, expected resolution date — is not documented on any fetched KB page or mentioned in any independent review. No digital case-tracking capability after submission was established. KB notifies the outcome within 30 calendar days but no intermediate status visibility was confirmed. This is the largest single gap against the run's primary hypothesis.
- **Notification default state (H1 gap)** — Oznámení o platbách requires customer configuration. Whether alerts are sent by default to all KB+ cardholders, or must be explicitly enabled, is not confirmed. The configuration instructions (KB+: Settings > Notifications > Outgoing Payments; MojeBanka: Settings > Payment Notifications > Card Usage) imply opt-in rather than default-on. A notification that fires only when the customer has thought to enable it differs materially from an automatic fraud alert — which is the neobank standard and what H1 describes.
- **Resolution SLA for unauthorized transaction chargebacks** — KB commits 15 working days for payment service complaints and 30 calendar days for general disputes. Whether unauthorized card transaction chargebacks follow these SLAs or are governed by Mastercard or Visa scheme timelines (which KB's own complaint page notes separately as 'card association rules') is not confirmed.
- **Card replacement fee after confirmed fraud** — KB states replacement cards arrive within several days but the specific replacement fee was not found in accessible sources.
- **Ethoca and pre-chargeback alert integration** — Whether KB has integrated Mastercard Ethoca Alerts for pre-chargeback deflection is not confirmed. This gap carries from landscape map §6 item 4.
- **Customer satisfaction with dispute resolution outcomes** — Independent reviews cover general digital banking experience. No source specifically addressed the card dispute resolution experience — satisfaction with outcomes, communication quality, or timeline adherence.

**mBank CZ.**

- **Post-submission status tracking for card disputes** — what confirmation the customer receives (reference number, email, in-app notification) after filing via phone or internet banking, and whether any status channel exists during resolution, is not stated in any available source. This is the primary gap against H3 (no status visibility).
- **Internet banking dispute form structure** — whether the portal presents a guided, categorised form (dispute type selection, structured document upload) or an unstructured message field is not confirmed from available sources.
- **Card-dispute-specific resolution SLA** — the Reklamační řád (November 2025) sets a general complaint deadline of 30 days aim, up to 140 days maximum. Whether card disputes follow a tighter SLA aligned with Mastercard/Visa scheme timelines (typically 45 business days) is not confirmed.
- **New simplified dispute app** — mBank announced a forthcoming simplified dispute flow in a new application version, in development as of 2025. Whether this app has since launched and whether it introduces transaction-level initiation is not confirmed.
- **Mastercard Ethoca Alerts integration** — whether mBank as a Mastercard issuer has integrated Ethoca pre-chargeback alert infrastructure is not established.

**MONETA Money Bank.**

- **transaction_push_notifications** — Smart Banka real-time infrastructure confirmed for personalized marketing triggers (7-second post-transaction offer via AWS/SAS/Trask, from pymnts.com 2025 in investor-onboarding run). Whether MONETA sends proactive card transaction alerts comparable to KB's Oznameni o platbach — push-notifying customers of every card transaction in real time — is not confirmed by any source reviewed in this research. The Smart Banka product page lists 200+ functions but authentication notifications only. Material gap for H1 (no timely notification).
- **dispute_status_tracking** — No source reviewed or fetched describes an in-app or web interface where a customer can check the status of a filed dispute. The term 'stav reklamace' (dispute status) does not appear in any MONETA or independent source reviewed. The gap may reflect a genuine feature absence (H3 applies to MONETA post-submission) or an undocumented capability. Material gap for H3.
- **resolution_median_time** — MONETA publishes 35 working days as the SLA maximum. Average or median resolution time is not disclosed. Whether most disputes resolve significantly faster than the maximum — which would change the H5 characterization — is not established.
- **ethoca_integration** — Whether MONETA has integrated Mastercard Ethoca Alerts for pre-chargeback merchant notification (T4) is not established. Ethoca integration would deflect a share of formal chargebacks and reduce resolution time for deflected cases. Gap for T4 coverage.
- **resolution_outcome_content** — What MONETA communicates to customers when a dispute is decided — outcome, reasoning, options if the chargeback is declined, fraud prevention follow-up — is not described in any source reviewed. Relevant for H4 (no security outcome information).

**Air Bank.**

- **Real-time per-transaction push notification (H1)** — Air Bank's notification settings page describes alerts configurable for any account change, but does not confirm whether this covers a real-time push on every individual card debit — as Revolut and N26 do. Whether a cardholder receives a push notification within seconds of an unauthorized card payment, enabling immediate action, could not be established. Directly relevant to H1 (no timely notification of an unauthorized transaction).
- **Resolution SLA independently benchmarked (H3)** — The 35-working-day commitment for payment complaints comes from Air Bank's reklamacni-rad (PDF, not readable as text in this research). The figure was extracted from a web search result summary rather than from a directly fetched text page or an independent publication confirming the specific number. No independent source benchmarked Air Bank's actual resolution time. Relevant to H3 and to H5 (parked).
- **Security outcome communication (H4)** — No public source established what Air Bank communicates to customers regarding the outcome of a card fraud investigation — whether the card was confirmed compromised, whether the merchant was notified, or what the conclusion was beyond approving or denying the claim. Relevant to H4 (no security outcome information).
- **Ethoca Alerts integration** — Whether Air Bank participates in Mastercard Ethoca's pre-chargeback alert network could not be established. Air Bank is a Mastercard issuer; Ethoca integration status is a gap for both this card and for the T4 trend coverage across Czech ring-1 banks.
- **Per-transaction acknowledgement channel (H3)** — Whether Air Bank sends any form of automated acknowledgement (email, SMS, in-app notification) to the customer when a dispute is received could not be confirmed from fetched guidance pages or independent reviews.

**Raiffeisenbank CZ.**

- **Whether the in-app chat enables formal dispute initiation with a case reference or is communication-only** — the bank employee interaction in chat could either create a formal complaint record in the bank's system or be advisory without opening a case. The official complaints page does not list chat as a formal channel; the formal process references branch visit or the downloadable form. This is the single most material gap for assessing the actual reach of RB's digital dispute capability — if chat reliably creates a formal record, B2 is more substantive than the current evidence establishes.
- **Whether Raiffeisenbank CZ has integrated Mastercard Ethoca Alerts for pre-chargeback dispute deflection** — Czech bank Ethoca adoption is a gap identified at landscape stage for all ring-1 participants and remains unestablished for rb.cz specifically.
- **Actual dispute resolution times** — the 15 working day standard SLA and 35 working day maximum are confirmed from published complaint rules. Whether these targets are met and what the median resolution time for card disputes is are not published in accessible material.
- **Full card-specific fee schedule** — rb.cz price list PDFs (PI-1-2026-05-01, PI-2-2026-05-01) are publicly available but returned binary content during this research and could not be read. Card-dispute-related fee lines, if any, could not be confirmed.

**Revolut.**

- **Per-chargeback fee amount** — Revolut states a fee applies when a chargeback is successful and the amount depends on the transaction currency; no published fee schedule was recovered from any fetched source (primary Revolut help pages returned HTTP 403), and the specific amounts are not available. The fee exists; its cost to the cardholder is unestablished.
- **LLM adjudication monetary threshold** — Revolut does not publish the value below which LLM agents adjudicate automatically. Whether this covers disputes under €25 or up to a higher limit determines how much of the dispute volume is auto-adjudicated versus reviewed. Not established from available sources.
- **Czech Republic-specific fraud prevention volume** — a search result excerpt from revolut.com/en-CZ attributes the figure of 13,121 billion CZK in fraud prevented in 2024 to Revolut's Czech homepage, but that page returned HTTP 403 and was not directly retrieved. The figure is not cited in this card.
- **0** — P
- **1** — r
- **2** — i
- **3** — m
- **4** — a
- **5** — r
- **6** — y
- **7** — 
- **8** — R
- **9** — e
- **10** — v
- **11** — o
- **12** — l
- **13** — u
- **14** — t
- **15** — 
- **16** — h
- **17** — e
- **18** — l
- **19** — p
- **20** — 
- **21** — p
- **22** — a
- **23** — g
- **24** — e
- **25** — s
- **26** — 
- **27** — (
- **28** — r
- **29** — e
- **30** — v
- **31** — o
- **32** — l
- **33** — u
- **34** — t
- **35** — -
- **36** — d
- **37** — i
- **38** — s
- **39** — p
- **40** — u
- **41** — t
- **42** — e
- **43** — -
- **44** — p
- **45** — r
- **46** — o
- **47** — c
- **48** — e
- **49** — s
- **50** — s
- **51** — ,
- **52** — 
- **53** — r
- **54** — e
- **55** — v
- **56** — o
- **57** — l
- **58** — u
- **59** — t
- **60** — -
- **61** — h
- **62** — e
- **63** — l
- **64** — p
- **65** — -
- **66** — t
- **67** — i
- **68** — m
- **69** — e
- **70** — l
- **71** — i
- **72** — n
- **73** — e
- **74** — s
- **75** — )
- **76** — 
- **77** — r
- **78** — e
- **79** — t
- **80** — u
- **81** — r
- **82** — n
- **83** — e
- **84** — d
- **85** — 
- **86** — H
- **87** — T
- **88** — T
- **89** — P
- **90** — 
- **91** — 4
- **92** — 0
- **93** — 3
- **94** — 
- **95** — d
- **96** — u
- **97** — r
- **98** — i
- **99** — n
- **100** — g
- **101** — 
- **102** — d
- **103** — e
- **104** — e
- **105** — p
- **106** — -
- **107** — d
- **108** — i
- **109** — v
- **110** — e
- **111** — 
- **112** — f
- **113** — e
- **114** — t
- **115** — c
- **116** — h
- **117** — e
- **118** — s
- **119** — ;
- **120** — 
- **121** — c
- **122** — l
- **123** — a
- **124** — i
- **125** — m
- **126** — s
- **127** — 
- **128** — a
- **129** — t
- **130** — t
- **131** — r
- **132** — i
- **133** — b
- **134** — u
- **135** — t
- **136** — e
- **137** — d
- **138** — 
- **139** — t
- **140** — o
- **141** — 
- **142** — r
- **143** — e
- **144** — v
- **145** — o
- **146** — l
- **147** — u
- **148** — t
- **149** — .
- **150** — c
- **151** — o
- **152** — m
- **153** — 
- **154** — r
- **155** — e
- **156** — s
- **157** — t
- **158** — 
- **159** — o
- **160** — n
- **161** — 
- **162** — s
- **163** — o
- **164** — u
- **165** — r
- **166** — c
- **167** — e
- **168** — s
- **169** — 
- **170** — a
- **171** — l
- **172** — r
- **173** — e
- **174** — a
- **175** — d
- **176** — y
- **177** — 
- **178** — e
- **179** — s
- **180** — t
- **181** — a
- **182** — b
- **183** — l
- **184** — i
- **185** — s
- **186** — h
- **187** — e
- **188** — d
- **189** — 
- **190** — b
- **191** — y
- **192** — 
- **193** — t
- **194** — h
- **195** — e
- **196** — 
- **197** — l
- **198** — a
- **199** — n
- **200** — d
- **201** — s
- **202** — c
- **203** — a
- **204** — p
- **205** — e
- **206** — -
- **207** — m
- **208** — a
- **209** — p
- **210** — p
- **211** — i
- **212** — n
- **213** — g
- **214** — 
- **215** — a
- **216** — g
- **217** — e
- **218** — n
- **219** — t
- **220** — 
- **221** — o
- **222** — n
- **223** — 
- **224** — 2
- **225** — 0
- **226** — 2
- **227** — 6
- **228** — -
- **229** — 0
- **230** — 8
- **231** — -
- **232** — 1
- **233** — 7
- **234** — 
- **235** — a
- **236** — n
- **237** — d
- **238** — 
- **239** — e
- **240** — n
- **241** — t
- **242** — e
- **243** — r
- **244** — e
- **245** — d
- **246** — 
- **247** — i
- **248** — n
- **249** — 
- **250** — s
- **251** — o
- **252** — u
- **253** — r
- **254** — c
- **255** — e
- **256** — s
- **257** — .
- **258** — m
- **259** — d
- **260** — ,
- **261** — 
- **262** — n
- **263** — o
- **264** — t
- **265** — 
- **266** — a
- **267** — 
- **268** — f
- **269** — r
- **270** — e
- **271** — s
- **272** — h
- **273** — 
- **274** — r
- **275** — e
- **276** — t
- **277** — r
- **278** — i
- **279** — e
- **280** — v
- **281** — a
- **282** — l
- **283** — 
- **284** — i
- **285** — n
- **286** — 
- **287** — t
- **288** — h
- **289** — i
- **290** — s
- **291** — 
- **292** — b
- **293** — r
- **294** — a
- **295** — n
- **296** — c
- **297** — h
- **298** — .
- **299** — 
- **300** — T
- **301** — h
- **302** — e
- **303** — 
- **304** — l
- **305** — a
- **306** — n
- **307** — d
- **308** — s
- **309** — c
- **310** — a
- **311** — p
- **312** — e
- **313** — 
- **314** — m
- **315** — a
- **316** — p
- **317** — '
- **318** — s
- **319** — 
- **320** — r
- **321** — e
- **322** — s
- **323** — e
- **324** — a
- **325** — r
- **326** — c
- **327** — h
- **328** — 
- **329** — i
- **330** — s
- **331** — 
- **332** — t
- **333** — h
- **334** — e
- **335** — 
- **336** — b
- **337** — a
- **338** — s
- **339** — i
- **340** — s
- **341** — 
- **342** — f
- **343** — o
- **344** — r
- **345** — 
- **346** — t
- **347** — h
- **348** — e
- **349** — 
- **350** — L
- **351** — L
- **352** — M
- **353** — 
- **354** — a
- **355** — d
- **356** — j
- **357** — u
- **358** — d
- **359** — i
- **360** — c
- **361** — a
- **362** — t
- **363** — i
- **364** — o
- **365** — n
- **366** — 
- **367** — c
- **368** — l
- **369** — a
- **370** — i
- **371** — m
- **372** — 
- **373** — a
- **374** — n
- **375** — d
- **376** — 
- **377** — t
- **378** — h
- **379** — e
- **380** — 
- **381** — d
- **382** — e
- **383** — t
- **384** — a
- **385** — i
- **386** — l
- **387** — e
- **388** — d
- **389** — 
- **390** — s
- **391** — t
- **392** — e
- **393** — p
- **394** — -
- **395** — b
- **396** — y
- **397** — -
- **398** — s
- **399** — t
- **400** — e
- **401** — p
- **402** — 
- **403** — d
- **404** — i
- **405** — s
- **406** — p
- **407** — u
- **408** — t
- **409** — e
- **410** — 
- **411** — f
- **412** — l
- **413** — o
- **414** — w
- **415** — .

**N26.**

- **Resolution timeline** — N26 does not publish a target resolution time for chargebacks. The only statement is 'disputes can take time to resolve as several parties are involved.' No SLA, no median time, no H5 comparison is possible from this research.
- **Provisional credit policy** — whether N26 applies a temporary credit during dispute resolution under PSD2/PSD3 obligations could not be established from fetched sources. The absence is noted on the card; it cannot be stated as a confirmed negative without an independent source.
- **In-app status granularity** — N26 states updates arrive 'whenever there's progress' but does not specify what constitutes a progress event, how many named status states exist, or what each communicates to the customer. The comparison to Revolut's timeline transparency is not established.
- **Dispute denial rate and outcome statistics** — the share of submitted disputes that N26 declines to advance to Mastercard is not published. The denial pattern in customer reviews is qualitative, not quantitative.
- **Czech Republic availability** — settled as absent — N26 does not offer banking accounts to Czech Republic residents (confirmed from n26-countries, 2026-08-17). N26 is a ring-3 European reference point for this run, not a capability directly available to Czech cardholders. Any Czech ČS initiative that implements comparable dispute status tracking is closing a gap with the European neobank standard, not with a direct local competitor.

**Monzo.**

- **Unauthorized transaction (fraud) dispute timeline** — Monzo's help pages publish 8-to-12-week timelines for merchant disputes. Timelines specifically for unauthorized transaction reports (where no merchant contest is expected and UK FCA PSRs 2017 may require provisional credit within one business day) are not separately documented. Whether the Czech/EU PSD2 equivalent produces the same obligation is a compliance question, not a Monzo feature. The synthesis should attribute the provisional credit USP to the capability and note the UK regulatory context separately.
- **Proportion of disputes receiving provisional temporary refund** — Monzo states it offers provisional credit 'whenever we can' without publishing criteria or a percentage. Whether this applies to substantially all unauthorized-transaction disputes or to a narrower subset cannot be determined from retrieved sources.
- **Scope of July 2024 anti-fraud controls** — Which? and Monzo documentation indicate Known Locations, Trusted Contacts, and Secret QR Codes apply to bank transfers and savings withdrawals above daily limits. Whether any of these controls extend to card payment authorization is not confirmed in retrieved sources. If the scope is non-card only, these features are adjacent to, not part of, the card dispute flow this run profiles.
- **Dispute volume data** — Monzo does not publish card dispute volume statistics or year-on-year trends. No equivalent to MONETA's 35,000 disputes in 2024 figure exists for Monzo in retrieved sources; comparative volume analysis against Czech ring-1 participants is not possible.

**Mastercard (Ethoca and dispute management platform).**

- **Czech-market Ethoca enrollment** — Whether Czech Mastercard issuers including Česká spořitelna have adopted Ethoca Alerts and Consumer Clarity is not established from public sources. Mastercard does not publish issuer-level adoption data. This is the most material gap for the initiative: Ethoca enrollment determines whether the pre-dispute deflection channel is already available to ČS or requires a new commercial relationship with Mastercard.
- **Decision Intelligence Pro adoption by Czech issuers** — Whether Czech banks actively incorporate the DI Pro fraud score in their authorization decisioning is not established. The score is generated at scheme level regardless; how issuers weight it is the open question.
- **Mastercard First-Party Trust programme (June 2025)** — A Mastercard press release titled 'Scaling efforts to combat friendly fraud — First-Party Trust' appeared in search results with a June 2025 date; the page returned HTTP 403 on fetch and its capabilities could not be established. The programme is noted here as a gap rather than a feature claim.
- **Dispute Administration Fee (EU) amount** — The DAF is scheme-assessed per chargeback, second presentment, and arbitration chargeback in EU markets, but the specific fee amount is not published in publicly available sources.
- **Mastercard issuer scheme pricing** — Assessment fees, per-dispute fees, and optional product pricing are confidential. No list price for any Mastercard dispute product was found in any public source. This is a gap by design — scheme pricing is a commercial relationship.
- **Mastercom API documentation** — Mastercom's integration interface for issuer-side automation (digital dispute initiation systems, status update feeds) was described at product level only; technical API specifications were not available in fetched sources.

---

## How this was produced

**Run `2026-04-card-disputes`, stage 3.2 `deep-dive`, quality gate Q3.** The Competitive Analysis agent's deep-dive skill produced ten records on 17 August 2026, one per participant, each one a separate invocation with its own sources. This document was assembled from those ten records on 20 August 2026 and adds nothing to them: every capability, claim, limitation and price below was written by the invocation that researched it, and the assembly transferred it (R3.6-2).

**The records this document was assembled from**, each named by the participant it covers:

- **R-A6-01** — ČSOB (Československá Obchodní Banka) — `records/3-competitive-analysis/A6-r01-csob.record.md`
- **R-A6-02** — Komerční banka — `records/3-competitive-analysis/A6-r02-kb.record.md`
- **R-A6-03** — mBank CZ — `records/3-competitive-analysis/A6-r03-mbank.record.md`
- **R-A6-04** — MONETA Money Bank — `records/3-competitive-analysis/A6-r04-moneta.record.md`
- **R-A6-05** — Air Bank — `records/3-competitive-analysis/A6-r05-airbank.record.md`
- **R-A6-06** — Raiffeisenbank CZ — `records/3-competitive-analysis/A6-r06-rb.record.md`
- **R-A6-07** — Revolut — `records/3-competitive-analysis/A6-r07-revolut.record.md`
- **R-A6-08** — N26 — `records/3-competitive-analysis/A6-r08-n26.record.md`
- **R-A6-09** — Monzo — `records/3-competitive-analysis/A6-r09-monzo.record.md`
- **R-A6-10** — Mastercard (Ethoca and dispute management platform) — `records/3-competitive-analysis/A6-r10-mastercard.record.md`

**Egress `pilot-test`, and the run material is fabricated.** The participants, sources and figures were researched through a test destination rather than an approved one, and `fixtures/README.md` records that this run's problem material was written rather than gathered. A reader taking any figure below into a real decision needs to re-source it.

**The research ran under Standards v0.9 and these documents are written to v0.12.** The ten deep-dives were performed on 17 August under the version in force then; the documents were re-assembled on 20 August under the version that moved the participant profile onto the page. The run record says v0.12 because that is the bar these documents are written to, and it exposes one thing the older version did not check: **the source floor rose to six independent parties at v0.10, and Air Bank's card rests on five.** Ten sources resolve to airbank.cz, mesec.cz, financera.cz, finex.cz and penize.cz. That is a defect in the research rather than in the assembly, it is left standing rather than papered over, and closing it needs a sixth independent party on that card.

**Standards basis: `competitive-analysis-standards@0.9`, read and applied across all ten deep-dives.** §3.1 of that body at v0.12 moved the participant profile out of the record and into the document, which is the shape this document is in; the records were produced before that version and keep their fields, which is why the record and the document both hold the profile and only the document is written for a reader.

**No card records a confirmed absence.** Every gap in every participant is recorded as something the research could not establish, and `Confirmed not to do` is empty on all ten. *Their own documentation lists the alternatives and not this one* is a confirmation; *we found nothing* is not, and only the second kind is present here. The synthesis that reads these cards treats an absence as confirmed at every Czech bank on the strength of independent sources, and that claim rests on the sources rather than on this field.

**Rules no check decided at this gate** are carried on the records that produced the material, not here.
