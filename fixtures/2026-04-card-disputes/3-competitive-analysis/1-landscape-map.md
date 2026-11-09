---
run_id: 2026-04-card-disputes
artifact_id: A5
ost_role: none
status: accepted
workflow: competitive-analysis
modified_by: agent
revisions: 0
sources:
  - A1
  - A4
external_sources:
  - chargeflow-2026
  - concentrix-2025
  - chargebacks911-2026
  - mastercard-b2b-2025
  - investujeme-cs-2021
  - moneta-press-2025
  - penize-2banks
  - kb-reklamace
  - csob-reklamace-form
  - mbank-blog-2024
  - moneta-faq
  - airbank-penize
  - rb-complaints
  - revolut-dispute-process
  - revolut-help-timelines
  - n26-dispute-support
  - monzo-dispute-help
  - latinia-2025
  - backbase-ai
  - mastercard-ethoca
  - chargebackgurus-di
  - aoshearman-psd3
  - dlapiper-psd3
  - mayerbrown-dora
  - dlapiper-dora
  - goodwin-ai-act
  - artificialintelligenceact-annex3
  - finparada-moneta-2025
produced_by:
  agent: competitive-analysis
  skill: landscape-mapping
store: S1
scope: shared
egress_basis: pilot-test
standards_basis: "competitive-analysis-standards@0.9 read and applied. §2.1 (three-class trend pass, B/T/R 3–5 each), §2.2 (representative and standing rules), §2.2a (banking before fintech, ring order), §2.4 (coverage floor — ten participants selected for a card) all applied. §6.1 of the Standards states which rules are now checked by C81 (trend classes, instrument, effective), C88 (representatives), C86 (card field set — applies at stage 3.2), C87 (standard tiers — applies at stage 3.3). Standards_basis is not indicative — the body exists at v0.9 and was read in full."
could_not_verify:
  - rule: "authored only from the quarantine bridge's structured extract, never from raw external text"
    needs: judge
    reach: process
assembled_at: 2026-08-20
assembled_from: [R-A5-01]
---

# Competitive Analysis | Landscape Map — Card dispute and chargeback handling for retail cardholders

**Run:** `2026-04-card-disputes` · **Stage:** 3.1 `landscape-mapping` · **Agent:** `competitive-analysis`
**Sources read:** `1-brief/initiative-brief.md`, `2-problems/5-prioritised-opportunities.md`, `store/S1-competitors.md`,
`.github/know-how/competitive-analysis-standards.md`, `.github/artifact-fields.yaml`, `.github/registry/egress.yaml`
**Research:** egress regime `pilot-test` (run material is fabricated) · 19 search iterations · 6 fetches (2 returned 403; 4 retrieved)

---

No Czech bank in this market lets a cardholder see what is happening to a dispute once it has been filed, and the three neobanks a Czech cardholder can reach or compare against all do. Twelve participants were mapped against twelve trends across business, technology and regulation, and ten were taken forward for deep research. The trend that decides the initiative is not the move to digital filing, which Czech banking has started, but the move to visibility after filing, which it has not. [rec:R-A5-01]
## The market we looked at

**`scope_field`:** *Card dispute and chargeback handling for retail cardholders.*

**`topic`:** *How retail customers report a disputed or fraudulent card transaction and follow it to resolution.*

**Geography resolution — the two fields disagree and this section resolves the disagreement explicitly.**

A1 carries two relevant fields that point in different directions:

- `market_scope`: *"Card dispute and chargeback handling for retail cardholders."* No country boundary. A1 records that the Product Owner explicitly declined to narrow scope to a single country.
- `customer_segment`: *"Retail debit and credit card holders in the Czech Republic, all ages."* Czech Republic only.

These fields answer different questions. `customer_segment` describes who the initiative is built for — Czech retail cardholders. `market_scope` describes what market the competitive analysis covers — the whole card dispute and chargeback handling space, which operates under Mastercard and Visa scheme rules globally.

**Resolution applied:** `scope_field` is written in the market's own terms (no country boundary), matching A1's explicit decision. The participant search follows the Standards §2.2a ring order, which anchors at the Czech Republic (ring 1) and expands outward. The ring order is the research sequence, not a set of exclusion criteria: participants from rings 2–4 appear on this map where they are genuinely relevant to the digital dispute capability that Czech retail cardholders will be compared against.

Specifically: Revolut, which operates in Czech Republic, appears as a ring-1 participant despite being a global fintech — it serves Czech retail cardholders and is directly comparable. N26 (ring 3, EU) and Monzo (ring 3, UK) appear because they pioneered the in-app dispute model that defines the competitive standard, and their presence on the map explains what the Czech market is being measured against. Mastercard (adjacent) appears because scheme infrastructure underlies every participant's dispute process.

**What is excluded and why:** No explicit scope exclusion was made at A1 for this market. Business and retail banking are both in scope. Non-card dispute channels (direct debits, bank transfers, SEPA disputes) are out of scope — this map covers card disputes and chargebacks specifically, because that is what A1's `market_scope` and the run's hypotheses target.

---

---


## Where the market is moving

**Three classes: business, technology, regulatory.** 5 business, 4 technology, 3 regulatory.

**Inclusion test:** *If this run ignores this trend, what is different for the initiative in 12 to 24 months?*
**Impact must differentiate** across the set: a set where everything is `high` has ranked nothing.

---

### Business trends

**B1 — Rising card dispute volumes and operational pressure**
`class: business` | `impact: high` | `horizon: short` | `lifecycle: growing`

Global chargeback volume increased 41% between 2023 and 2026, from 238 million to 337 million transactions, with losses projected to reach $41.69 billion by 2028 (chargeflow-2026). First-party "friendly fraud" accounts for 36% of all reported fraud in 2024, up from 15% a year earlier. Every disputed payment takes the consumer's bank an average of 2.5 phone calls to resolve; approximately 60% of payment disputes escalate into formal chargebacks (concentrix-2025). In the Czech market: MONETA Money Bank handled 35,000 card disputes in 2024, a 29% year-on-year increase, and was already on pace for further acceleration in 2025 (moneta-press-2025, June 2025). MONETA explicitly attributes part of the volume growth to the introduction of online filing: "the introduction of online forms increased complaint submissions, including cases clients might have previously ignored." This implies actual dispute volume is higher than what paper-based intake captured — digital intake surfaces latent demand.

*Implication for this initiative.* Rising volumes amplify the cost of every friction point in the dispute journey. The brief's success signal ("customers stop ringing to ask where their case is") is an operational cost problem as much as a customer experience one: each case without a digital status channel generates at least one inbound call. An intake channel that captures latent demand digitally also means the volume growth seen at MONETA is a realistic projection for ČS once digital filing is available. H3 (no status visibility) is the primary driver of the per-case call rate; B1 is what makes resolving H3 operationally material.

*Representatives:* csob.cz (leader — largest Czech retail bank by assets and customer count, highest absolute dispute processor by market position), moneta.cz (leader — 35,000 disputes in 2024 with 29% YoY growth is the only published Czech bank dispute volume figure; represents the market's volume trajectory), revolut.com (innovator — uses LLM adjudication to handle dispute volumes at scale without proportional headcount growth, representing the technology response to volume pressure)

---

**B2 — Digital self-service dispute initiation replacing paper form and phone call**
`class: business` | `impact: high` | `horizon: short` | `lifecycle: growing`

Czech and European banks are moving dispute intake from paper forms and phone-based reporting to digital self-service — online banking portals or in-app transaction-level flows. The movement is measurably uneven and the Czech count of banks at the transaction-level standard is moving. Peníze.cz (published July 7, 2025) assessed the Czech market and found that only two banks allow complaints to be filed "by clicking on a specific payment in the online transaction list, adding further details, and simply submitting it directly in a mobile app or online banking" (penize-2banks) — Česká spořitelna (George, since October 2021, investujeme-cs-2021) and Komerční banka (MojeBanka and KB+, kb-reklamace). Two weeks after that assessment, Finparada (July 23, 2025) reported that MONETA simplified its dispute filing; the stage 3.2 deep-dive confirms MONETA offers transaction-level initiation in both Smart Banka CARDS section and Internet Banking — customers select the disputed transaction and file directly from the transaction view, with the form pre-populating date, amount and merchant from the record (finparada-moneta-2025, moneta-press-2025). The count is at least three Czech banks at this standard and growing. ČSOB — the largest Czech retail bank — still requires customers to download a PDF "Statement of cardholder on disputed transaction," fill it on a computer, print it, sign it, and then scan or photograph it for electronic submission (csob-reklamace-form). This is a paper-form intake process with an electronic delivery step; it is not a digital dispute channel. In the European market, Revolut has made its dispute process "fully in-app" with initiation directly from the transaction screen (revolut-dispute-process); mBank CZ offers dispute initiation via online banking portal or phone (mbank-blog-2024).

*Implication for this initiative.* H2 (forced to paper form; no digital dispute channel) maps directly to this trend. The market has split: Czech banking leaders (ČS/George, KB, MONETA) and European neobanks (Revolut, Monzo, N26) have completed the digital shift; the majority of Czech banks (ČSOB, AIR Bank, most others) have not. An initiative that removes the remaining paper-form journeys from ČS is not pioneering — it is closing a gap with the Czech market's own leaders, and the gap is narrowing as more Czech banks adopt the standard. This shifts the differentiation question to what happens after submission, where H3 (no status visibility) is the primary open problem.

*Representatives:* kb.cz (leader — MojeBanka and KB+ transaction-level click-to-dispute, confirmed Czech banking leader at the digital standard), moneta.cz (leader — transaction-level dispute initiation in Smart Banka CARDS section and Internet Banking confirmed by stage 3.2 deep-dive, finparada-moneta-2025), mbank.cz (leader — online banking dispute initiation available, a digital alternative to paper form and phone), revolut.com (innovator — fully in-app from transaction screen, no form at any step)

---

**B3 — Customer expectation of real-time case status visibility**
`class: business` | `impact: high` | `horizon: short` | `lifecycle: growing`

Customers who submit a dispute receive no meaningful progress update under the typical Czech bank model. The evidenced result: an average of 2.5 phone calls per dispute resolved (concentrix-2025), each a status enquiry that the bank's card operations team cannot fully answer because scheme timelines are not visible to the frontline. The substitute today — calling the bank — is simultaneously the dominant behaviour and evidence of the failure: it confirms the customer has no other way to find out where their case stands. The market's direction is in-app case status tracking: N26 offers "Check progress" directly on the disputed transaction, with automatic app updates "whenever there's progress" (n26-dispute-support). Revolut shows an 85% resolution rate within 5 weeks, with status visible throughout (revolut-help-timelines).

*Implication for this initiative.* H3 (no acknowledgement and no status visibility) is the primary hypothesis. It is the only `strong`-trust hypothesis in the run — four independent origins, two first-hand observations, spanning a customer, two front-line agents, and the Head of Cards. The brief's success signal names it directly: "customers stop ringing to ask where their case is." This is the single trend where the initiative's design will be most tested by stage 4: the in-app status tracking standard is already set by N26, Revolut, and Monzo; closing the gap requires both the technical capability (T2) and the operational data feed from card operations into the customer-facing channel.

*Representatives:* revolut.com (innovator — timeline transparency throughout, 85% within 5 weeks, status visible in app), n26.com (innovator — "Check progress" in-app with automatic push updates), substitute:phone-call (leader — the dominant current channel: customers call to get status because no digital alternative exists; this is the substitute this trend is displacing)

---

**B4 — Proactive pre-dispute unauthorized transaction notification**
`class: business` | `impact: medium` | `horizon: short` | `lifecycle: growing`

Digital-first banks notify cardholders of card transactions in real time via push notification — including unauthorized ones. The notification gives the customer the choice to freeze the card and initiate a dispute within seconds of the transaction, rather than discovering fraud through a paper statement days or weeks later. This pre-dispute notification window is the upstream precondition for the dispute journey: a customer who does not receive a notification must discover the unauthorized transaction themselves, narrowing the effective response window. US consumers lost an estimated $12.5 billion to fraud in 2024, a 30% increase from 2023 (latinia-2025). Revolut integrates notification, card freeze, and dispute initiation into a single flow (revolut-dispute-process). N26 automatically blocks the card and enables replacement ordering within the same dispute submission action (n26-dispute-support). Monzo provides instant transaction notifications and in-app card freeze.

*Implication for this initiative.* H1 (no timely notification of an unauthorized transaction) maps directly to this trend. H1 is placed third (behind H3 and H2) on A4 because notification timing gates entry to the whole dispute journey — a customer who does not know about the transaction cannot dispute it. The market response is an end-to-end flow (notification → freeze → dispute initiation) that reduces the gap between transaction and customer action to seconds. Among Czech ring-1 banking participants, no bank has been specifically evidenced as having deployed this integrated flow; Revolut, N26, and Monzo (all operating in European markets, Revolut in Czech Republic) have.

**Finding — no Czech banking leader on B4:** All three representatives of B4 are innovators. No Czech ring-1 bank (ČSOB, KB, mBank, MONETA, AIR Bank, Raiffeisenbank) has been established in this research as having deployed integrated pre-dispute notification as a named product feature. This is a finding for stage 4: the technology gap is not between ČS and its Czech competitors — it is between Czech retail banking as a whole and the neobank standard.

*Representatives:* revolut.com (innovator), n26.com (innovator), monzo.com (innovator)

---

**B5 — Resolution speed as a competitive signal**
`class: business` | `impact: medium` | `horizon: medium` | `lifecycle: growing`

Resolution time is becoming a named differentiator in card dispute handling. The fastest digital-first providers resolve 85% of disputes within five weeks via automated adjudication (revolut-help-timelines). The published benchmark in Czech banking is MONETA's 35 working-day SLA (moneta-press-2025 — up to 35 working days per the FAQ), which translates to approximately seven calendar weeks. PSD3/PSR (R1) will mandate a 14-day maximum resolution period; if implemented, the current Czech market standard will be non-compliant by approximately 2027–2028. The gap between the fastest market resolution (Revolut, ~5 weeks) and the forthcoming regulatory ceiling (14 days) is narrowing the window within which slow resolution is commercially and legally acceptable.

*Implication for this initiative.* H5 (resolution time above market benchmarks) is parked on A4, pending evidence on ČS's actual resolution times. This trend provides the external benchmarks: the current Czech best-in-class is 35 working days; the coming regulatory minimum is 14 days; the neobank comparison is 5 weeks for 85% of cases with AI adjudication. A dispute intake initiative that does not address the adjudication step risks improving the customer's submission experience while leaving resolution speed unchanged.

*Representatives:* moneta.cz (leader — 35-working-day published SLA, the only Czech bank with a specific resolution time commitment evidenced in this research), revolut.com (innovator — 85% within 5 weeks via LLM adjudication)

---

### Technology trends

**T1 — Real-time push notification for card transaction alerts**
`class: technology` | `impact: high` | `horizon: short` | `lifecycle: growing`

Banks and neobanks deploy push notification infrastructure to alert cardholders of card transactions in real time. The notification shows transaction details (merchant, amount, timestamp) immediately on the cardholder's device, enabling them to freeze the card or initiate a dispute without waiting for a statement. The technology is in production at all major neobanks and at the most digitally advanced Czech banks. The growing edge — not the notification itself, but its integration with an immediate dispute initiation action — is where differentiation is occurring.

*Technology maturity filter.* Payment notification (transaction alerts) is in production at KB (Oznámení o platbách in KB+, kb-reklamace), at Revolut (integrated with freeze + dispute, revolut-dispute-process), at N26 (integrated with card block + replacement, n26-dispute-support), and across all major neobanks. The technology is mature as a notification tool. Integration with instant dispute initiation — rather than awareness alone — is where the market is still developing. Czech banking deployment of the integrated flow is not established for any ring-1 bank other than KB (notification) and possibly through other channels; specific push-to-dispute integration in Czech banking is not confirmed.

*Evidence.* latinia-2025: Consumer fraud losses $12.5 billion in 2024 (+30% from 2023); push notifications enable action "before small problems become expensive ones." kb-reklamace: KB+ offers Oznámení o platbách (payment notifications) via app or email, one of Czech banking's documented notification implementations. revolut-dispute-process: Instant notification + card freeze + dispute initiation in one flow, in production in Czech Republic and European markets.

*Implication for this initiative.* H1 (no timely notification) is the problem T1 is the technology response to. The notification layer is already deployed in some Czech banking (KB) and in full-stack form at neobanks. An initiative addressing H1 at ČS is deploying mature technology; the challenge is not feasibility but integration with the dispute initiation step.

*Representatives:* kb.cz (leader — Oznámení o platbách payment notifications, one of Czech banking's documented notification implementations), revolut.com (innovator — integrated notification → freeze → dispute in one flow), n26.com (innovator — instant block + replacement order + dispute, no separate step for each)

---

**T2 — In-app dispute workflow enabling transaction-level claim initiation**
`class: technology` | `impact: high` | `horizon: short` | `lifecycle: growing`

Banks deploy structured in-app dispute workflows that allow customers to initiate a chargeback directly from the disputed transaction in their banking app — without downloading a form, calling a helpline, or visiting a branch. The workflow collects the claim type, supporting documentation, and submission confirmation digitally. The technology is confirmed in production at ČS (George, October 2021), KB (MojeBanka/KB+), MONETA (Smart Banka via messages), Revolut, Monzo, and N26 — six organisations across Czech and European banking. In Czech banking it is the most rapidly advancing technology in the dispute space.

*Technology maturity filter.* Six confirmed production deployments: ČS/George (October 2021, investujeme-cs-2021), KB/MojeBanka and KB+ (kb-reklamace), MONETA/Smart Banka CARDS section and Internet Banking (moneta-press-2025; finparada-moneta-2025, July 2025; transaction-level CARDS flow confirmed by stage 3.2 deep-dive — customer selects the disputed transaction and files directly from the transaction view), Revolut (fully in-app, revolut-dispute-process), N26 (in-app from Home tab, n26-dispute-support), Monzo (automated in-app form, monzo-dispute-help). The technology is mature and growing in Czech retail banking specifically; the gap is between adopters and non-adopters (ČSOB, AIR Bank, mBank limited), not between Czech banking and a global standard.

*Evidence.* investujeme-cs-2021: ČS George in-app dispute, launched October 6, 2021 — "Clients don't need to call, visit a branch, or fill out a complaint form." kb-reklamace: KB's MojeBanka and Mobile Banking allow customers to find the affected payment, click "Stěžovat," and be guided through document upload. finparada-moneta-2025: MONETA simplified dispute filing (July 23, 2025); stage 3.2 deep-dive confirms transaction-level CARDS initiation in both Smart Banka and Internet Banking. n26-dispute-support: Home tab → select transaction → "There's something wrong" → guided steps → submit; status tracking in same screen. revolut-dispute-process: Fully in-app, "redesigned to be easier and faster."

*Implication for this initiative.* H2 (forced to paper form) is the technology gap T2 closes. ČSOB's continued PDF-form requirement (csob-reklamace-form) is not a technology limitation — ČS George's own implementation shows the technology is available and in production in the Czech market since 2021. An initiative implementing T2 at ČS is catching up to the Czech standard, not crossing a technology frontier.

*Representatives:* kb.cz (leader — transaction-level click-to-dispute in MojeBanka/KB+, confirmed Czech banking leader at the digital standard), moneta.cz (leader — transaction-level initiation in Smart Banka CARDS section and Internet Banking, confirmed by stage 3.2 deep-dive), revolut.com (innovator — fully in-app, document upload, case reference issued immediately), n26.com (innovator — in-app from Home tab, real-time status tracking in same screen)

---

**T3 — AI/ML automated chargeback adjudication**
`class: technology` | `impact: high` | `horizon: medium` | `lifecycle: growing`

AI and machine learning are being deployed to adjudicate chargeback claims automatically for high-volume, low-complexity categories — particularly unauthorized transactions where card data is confirmed stolen and merchant dispute is unlikely. The system analyses customer and merchant submissions, applies scheme eligibility rules, and issues a resolution without human review for qualifying cases, reducing resolution time from weeks to hours for the automated tier. The technology is in production at Revolut and at Mastercard scheme level; ČS uses a robot for approximately 20% of George disputes (investujeme-cs-2021), but ČS is the initiating bank, not a participant.

*Technology maturity filter.* Revolut's LLM agents for sub-threshold disputes are in production (revolut-dispute-process). Mastercard's Decision Intelligence Pro is in production at global scale: 1 trillion data points per transaction in under 50 milliseconds, 20% average fraud detection improvement (chargebackgurus-di). Backbase documents AI dispute automation in banking more broadly (backbase-ai). Three confirmed production deployments across neobank and scheme levels. Czech retail bank deployment (other than ČS, the initiating bank) has not been established in this research.

*Evidence.* revolut-dispute-process: "Revolut utilises LLM agents to automatically adjudicate chargeback claims below a specified value by analysing customer and merchant submissions." chargebackgurus-di: Mastercard Decision Intelligence Pro scans 1 trillion data points per transaction in under 50 milliseconds, lifting fraud detection by an average of 20%. backbase-ai: "AI banking dispute resolution automation breaks the linear relationship between volume and cost."

*Implication for this initiative.* T3 is the technology that would make PSD3's 14-day resolution requirement achievable at ČS's dispute volumes (H5, parked). It also directly addresses H3 (no status visibility) by reducing the resolution period and therefore the period during which status is unknown. No Czech ring-1 bank participant has confirmed T3 deployment; this is a differentiation opportunity if the initiative deploys AI adjudication for the highest-volume categories (unauthorized transactions by confirmed fraudulent card use).

**Finding — no Czech retail bank participant with confirmed AI adjudication:** Among ring-1 Czech banking participants (ČSOB, KB, mBank, MONETA, AIR Bank, Raiffeisenbank), no AI chargeback adjudication deployment has been established by this research. The two representatives are Revolut (European, operates in CZ) and Mastercard (scheme infrastructure). ČS (initiating bank) uses a robot for 20% of George disputes — not a participant, but evidence the technology is viable in Czech context.

*Representatives:* revolut.com (innovator — LLM agents for sub-threshold dispute adjudication), mastercard.com (leader — Decision Intelligence Pro at scheme scale, 1 trillion datapoints, 50ms response)

---

**T4 — Scheme-level pre-chargeback alert and dispute network infrastructure**
`class: technology` | `impact: medium` | `horizon: short` | `lifecycle: mature`

Payment schemes operate centralised platforms — Mastercard Ethoca Alerts and Visa's equivalent — that connect issuers and merchants to share dispute data before a formal chargeback is filed. When a cardholder reports an unauthorized transaction to their issuing bank, the platform notifies the merchant simultaneously, giving the merchant a 72-hour window to refund the purchase and stop fulfilment — deflecting the chargeback before it enters the formal dispute process. Ethoca Alerts reduces chargebacks by 30–40% at participating merchants; 80% of eligible Fiserv-issuer disputes are resolved in under 24 hours via the platform (mastercard-ethoca). Worldpay integrated Ethoca Alerts for over one million merchants in March 2024. Ethoca expanded across Asia Pacific in April 2025. The infrastructure is mature; the adoption question is whether Czech issuers have integrated it.

*Technology maturity filter.* Ethoca Alerts is in production at Mastercard globally (mastercard-ethoca, accessed 2026-08-17). Worldpay partnership with Mastercard: March 2024. Asia Pacific expansion: April 2025. The platform is mature at the scheme level; Czech issuer integration is not confirmed from this research.

*Implication for this initiative.* T4's infrastructure is available to ČS as a Mastercard issuer. An initiative that integrates Ethoca-style pre-chargeback alerting would deflect a share of formal chargebacks — reducing the cases that must be adjudicated, which reduces the per-case cost and total volume (B1 impact) while improving resolution speed for the deflected cases (B5 impact). Czech bank adoption of Ethoca is not confirmed and is a gap for stage 3.2.

**Finding — one representative:** T4 has one named representative on this map (Mastercard as adjacent), because the Czech retail banks' Ethoca integration status could not be established from this research. The platform exists; Czech bank deployment is the open question.

*Representatives:* mastercard.com (leader — Ethoca platform operator, scheme-level infrastructure connecting issuers and merchants)

---

### Regulatory trends

**R1 — PSD3 and PSR: Enhanced consumer dispute rights and 14-day resolution**
`class: regulatory` | `impact: high` | `horizon: medium` | `lifecycle: growing`
`instrument:` Directive on payment services and electronic money services (PSD3) and Regulation on payment services in the EU (PSR)
`effective:` Provisional political agreement 27 November 2025; formal adoption expected 2026–2027; national transposition 18–24 months thereafter (2027–2028)

The EU's revision of its payments framework introduces provisions that directly constrain how Czech banks must handle card disputes. The most significant: disputes (including chargebacks) must be resolved within 14 days (dlapiper-psd3). The PSR also expands fraud liability reversal to cover impersonation fraud not covered under PSD2. The provisional political agreement between the European Parliament and the Council was reached on 27 November 2025 (aoshearman-psd3); formal adoption is expected through the EU legislative process, with national transposition 18–24 months after formal adoption — approximately 2027–2028. PSR provisions (as a Regulation rather than a Directive) may apply simultaneously across EU member states, potentially as early as 2026.

*Evidence.* aoshearman-psd3: "Provisional political agreement on 27 November 2025" on PSD3 and PSR. One of the package's objectives is "more expansive anti-fraud protections for consumers making payments in the EU." dlapiper-psd3: "Disputes (including chargebacks) must be resolved within 14 days under PSD3." "Many PSR provisions could kick in by 2026 for all EU countries simultaneously."

*Implication for this initiative.* Current Czech banking SLAs (MONETA: 35 working days, KB: "several weeks to several months") would be non-compliant with a 14-day resolution requirement. A digital dispute intake channel that automates adjudication for high-volume categories (T3) is not optional for meeting a 14-day SLA. This initiative — which improves the intake and status visibility steps — directly supports PSD3/PSR compliance if it is coupled with back-end adjudication automation. H5 (parked: resolution time above market benchmarks) would move from parked to primary if the PSD3 effective date were confirmed and ČS's current resolution time established.

No participant representative: R1 applies to all EU financial institutions; no single map participant uniquely represents it above others.

---

**R2 — DORA: Operational resilience requirements for digital payment systems**
`class: regulatory` | `impact: medium` | `horizon: short` | `lifecycle: growing`
`instrument:` Regulation (EU) 2022/2554 on digital operational resilience for the financial sector (DORA)
`effective:` January 17, 2025

DORA, in force since January 17, 2025, applies to all EU financial entities including banks and payment institutions. It requires resilience across five pillars: ICT risk management, incident management and reporting, resilience testing, third-party risk management, and cyber threat information sharing. The incident management and reporting pillar requires banks to detect, classify, and report major ICT incidents within defined windows. A digital dispute channel that processes unauthorized transaction reports — and whose unavailability would directly affect customers' ability to exercise chargeback rights — is subject to DORA's ICT resilience requirements. Third-party dispute processing platforms (scheme APIs, AI adjudication services) require DORA-compliant contractual arrangements.

*Evidence.* mayerbrown-dora: "Beginning January 17, 2025, the Digital Operational Resilience Act (DORA) applies to almost all EU financial entities, including banks, insurers and reinsurers, brokers, payment and electronic money institutions." dlapiper-dora: Five pillars confirmed. mayerbrown-dora: "43% of organisations admitted they wouldn't be fully compliant by the deadline" — compliance is still catching up.

*Implication for this initiative.* Any new digital dispute channel must demonstrate ICT resilience from day one under DORA. For a bank the size of ČS, DORA compliance is a standing requirement, not a new one — but the specific obligation to have a resilient, reportable channel for unauthorized transaction handling must be designed in, not retrofitted. Third-party integrations (Ethoca, AI adjudication platforms) require DORA-aligned contracts. This is a compliance tail that affects the build and procurement aspects of any initiative in this space.

No participant representative: DORA affects all EU financial institutions equally.

---

**R3 — EU AI Act: Compliance requirements for AI in fraud detection and dispute adjudication**
`class: regulatory` | `impact: medium` | `horizon: medium` | `lifecycle: growing`
`instrument:` Regulation (EU) 2024/1689 on artificial intelligence (EU AI Act), Annex III financial services provisions
`effective:` In force August 2024; high-risk AI system obligations for new systems August 2026, legacy systems February 2027 (Digital Omnibus amendment may extend Annex III obligations to late 2027)

The EU AI Act (in force August 2024) classifies certain AI systems in financial services as high-risk under Annex III, including systems for creditworthiness assessment. Fraud detection AI that supports (rather than replaces) human decision-making may avoid the high-risk classification. However, AI that autonomously blocks account access or denies an essential financial service — such as an AI system that automatically declines a chargeback claim — qualifies as high-risk, with corresponding conformity assessment, human oversight, documentation, and registration obligations (goodwin-ai-act). New AI systems must comply by August 2026; legacy systems by February 2027 (with a possible Digital Omnibus extension to late 2027).

*Evidence.* goodwin-ai-act: "Annex III of the EU AI Act classifies as high-risk certain AI systems intended to be used for evaluating the creditworthiness of natural persons." Fraud detection is exempt if "supporting human decision-making without directly blocking access"; if the system "blocks account access or denies essential financial services," elevated obligations apply. artificialintelligenceact-annex3: Annex III full text for Annex III paragraph 5(b) financial services high-risk AI.

*Implication for this initiative.* T3 (AI/ML automated chargeback adjudication) is directly in scope of this regulation. Revolut's LLM adjudication for sub-threshold disputes — which autonomously decides whether a chargeback is granted — would qualify as high-risk AI under this reading if deployed in the EU. An initiative that deploys AI adjudication at ČS (a regulated EU institution) must assess its EU AI Act classification before go-live. This is not a reason to avoid AI adjudication; it is a compliance obligation to design around, and one that is better identified at the discovery stage than at the build stage.

No participant representative: R3 applies to any institution deploying AI in the relevant categories; no single map participant uniquely represents it above others.

**Finding — all three regulatory trends are unrepresented (`unrepresented_trends: [R1, R2, R3]`).** PSD3/PSR, DORA, and the EU AI Act apply uniformly to all EU financial institutions operating in this market — they are mandatory compliance baselines, not capabilities a market participant chooses to adopt. No single participant uniquely represents R1, R2, or R3 the way a product capability like in-app dispute initiation can be attributed to KB or Revolut. The finding is not a gap in the map but a fact about the market: the regulation is already dated and nobody in scope has the option of answering it or not. What varies between participants is how prepared they are — and preparation, unlike adoption of a product capability, is not visible in public-facing material and is a gap for stage 3.2's card research.

---

---


## Who is in it

**12 participants named, 10 selected for deep dive, 2 substitutes not profiled.** All new to S1 for this market scope. `reused: []`.

### Ring order applied

| Ring | Participants |
|---|---|
| **Ring 1 — Czech** (banking first, then fintech) | csob.cz, kb.cz, mbank.cz, moneta.cz, airbank.cz, rb.cz, revolut.com |
| **Ring 3 — European** (rest of EU and UK) | n26.com, monzo.cz, mastercard.com |
| **Substitute** | substitute:phone-call, substitute:do-nothing |

Note: Revolut is placed ring 1 because it operates in Czech Republic and serves Czech retail cardholders directly. N26 is placed ring 3 because its Czech Republic availability could not be confirmed from the fetched support pages (countries listed: AT, DE, ES, FR, IT); it may be ring 1 or ring 2 — stage 3.2 should confirm. Monzo is ring 3 (UK). No ring 2 (CEE) or ring 4 (global) participants have been selected. Ring 4 was not entered — Revolut and Monzo as ring-1/3 innovators cover the global comparison without needing a ring-4 entry, and no ring-4 participant was found to do something no nearer participant does.

Ring 2 (CEE) note: OTP Bank (Hungary), Erste Bank (CEE), and other CEE participants were not researched. Ring 1 and ring 3 cover the relevant trend representatives. A subsequent run may enter ring 2 if ring-1 and ring-3 research reveals a CEE-specific pattern not established here.

### Direct participants

| identity_key | Name | Standing | Represents | Deep dive |
|---|---|---|---|---|
| csob.cz | ČSOB | leader | B1 | yes |
| kb.cz | Komerční banka | leader | B2, B3, T1, T2 | yes |
| mbank.cz | mBank CZ | leader | B2 | yes |
| moneta.cz | MONETA Money Bank | leader | B1, B2, B5, T2 | yes |
| airbank.cz | AIR Bank | leader | B1 | yes |
| rb.cz | Raiffeisenbank CZ | leader | B2 | yes |
| revolut.com | Revolut | innovator | B1, B2, B3, B4, B5, T1, T2, T3 | yes |
| n26.com | N26 | innovator | B3, B4, T1, T2 | yes |
| monzo.com | Monzo | innovator | B2, B4 | yes |

### Adjacent participants

| identity_key | Name | Standing | Represents | Deep dive |
|---|---|---|---|---|
| mastercard.com | Mastercard (Ethoca / dispute platform) | leader | T3, T4 | yes |

### Substitute participants

| identity_key | Name | Standing | Represents | Deep dive |
|---|---|---|---|---|
| substitute:phone-call | Calling the bank's card line | leader | B3 | no |
| substitute:do-nothing | Not reporting — accepting the loss | leader | B1 | no |

**Leader/innovator split.** Leaders: csob.cz, kb.cz, mbank.cz, moneta.cz, airbank.cz, rb.cz, mastercard.com, substitute:phone-call, substitute:do-nothing (9). Innovators: revolut.com, n26.com, monzo.com (3). Both kinds are present across the map (§2.2). ✓

**Substitute requirement met.** Two substitutes are present. `substitute:phone-call` is the dominant service substitute (what customers actually do today). `substitute:do-nothing` is the behavioural substitute (the significant portion of fraudulent transactions that are never reported). Both are required by §2 and both are explicit. ✓

**rb.cz note — B2 attributed.** Raiffeisenbank CZ offers online chat via mobile and internet banking for dispute and complaint support (rb-complaints). This is a digital dispute channel that displaces paper and phone — the B2 criterion. Transaction-level structured dispute initiation (T2) is not confirmed; the in-app chat is a conversational digital channel, not a structured transaction-level flow. B2 is attributed because the B2 trend is defined as digital self-service dispute initiation replacing paper form and phone call, which the in-app chat meets. Stage 3.2 should confirm whether a structured dispute flow exists alongside the chat channel.

---

---


## Who we looked at closely, and why

**Selected for stage 3.2 (10 participants):** csob.cz, kb.cz, mbank.cz, moneta.cz, airbank.cz, rb.cz, revolut.com, n26.com, monzo.com, mastercard.com

This is the coverage floor (C75: ten participants carry a card). The reasons for each selection are in the `reason` field on each participant entry in the front matter. Summary of the logic:

- **Four Czech incumbents (csob.cz, kb.cz, mbank.cz, moneta.cz):** The ring-1 banks whose capabilities will define what ČS is competing against. Covers the market's full digital capability range from KB (best in Czech class) to ČSOB (paper form).
- **Two Czech challengers (airbank.cz, rb.cz):** Extends ring-1 coverage to the challenger banks, establishing whether the digital capability gap is specific to the larger incumbents or market-wide.
- **Two European innovators (revolut.com, n26.com):** Revolut is ring 1 (operates in CZ) and the market's clearest innovator benchmark. N26 is ring 3 but represents the most detailed in-app status tracking documented in the research.
- **One ring-3 UK originator (monzo.com):** Monzo is the design originator of the in-app dispute model; profiling it establishes whether the model has evolved since 2021 when ČS and Revolut implemented from it.
- **One adjacent (mastercard.com):** The scheme infrastructure is not optional context — it is the platform every initiative participant must build on. Understanding Mastercard's current dispute platform capabilities (Ethoca, Mastercom, Decision Intelligence Pro) is a prerequisite to scoping what the initiative can build.

**Not selected for deep dive — 2 participants:**
- `substitute:phone-call`: Not a profilable organisation. It is a customer behaviour and a distributed call-centre service category spanning all Czech retail banks. The finding is its existence and dominance, not its feature set.
- `substitute:do-nothing`: Not a profilable organisation. It is a customer behaviour confirmed by inference from MONETA's evidence (digital filing increased submissions, confirming latent demand not captured by paper).

---

---


## What we could not establish

This run's search budget recovered the trend landscape and identified trend-representative participants in Czech banking and across European neobanks. What it could not establish — gaps for stage 3.2's per-participant search budget:

1. **N26 Czech Republic availability.** The N26 support page confirms operation in AT, DE, ES, FR, IT; Czech Republic is not on the listed page. Stage 3.2 should confirm whether Czech Republic residents can open N26 accounts before attributing N26 as ring 1.
2. **Raiffeisenbank CZ's specific dispute channel.** Chat-based support in mobile/internet banking is confirmed but no transaction-level dispute initiation evidence was found. Stage 3.2 should establish whether a structured dispute flow exists.
3. **mBank CZ's in-app vs. portal dispute.** The mBank blog (September 2024) confirms online banking as a dispute channel but does not specify whether this is transaction-level in-app initiation or a web form in a portal. Stage 3.2 should clarify.
4. **Ethoca adoption by Czech issuers.** Whether ČSOB, KB, or any other Czech ring-1 bank has integrated Mastercard Ethoca Alerts is not established. This gap affects T4's coverage.
5. **Czech bank-specific resolution times.** MONETA's 35 working-day SLA is the only Czech bank resolution time figure in this research. ČSOB, KB, mBank, AIR Bank, and Raiffeisenbank resolution SLAs are unknown from publicly available material.
6. **AIR Bank's back-end dispute capabilities.** Confirmed: no in-app dispute initiation from a transaction screen. Not confirmed: whether disputes filed through other channels (phone, email, branch) are subject to any specific SLA or digital tracking.
7. **Schema note — `represents[]` cardinality: Standards §3.1 vs Business Logic §6.6.** The Competitive Analysis Standards §3.1 defines `represents[]` as `0..n` on A6 competitor cards (a card may exist without trend attribution). The Pilot Business Logic §6.6 defines `represents[]` as `1..n` on A5 landscape map participants (a participant is on the map as a representative of at least one trend). Both documents use the same field name at different cardinalities on different artifacts. This discrepancy was encountered during this run when applying the §3.1 cardinality to the rb.cz map participant entry rather than the §6.6 cardinality. The A5 map is governed by §6.6; the A6 card is governed by §3.1. Future producers should read both documents together and apply the cardinality appropriate to the artifact being produced.
8. **Schema note — `unrepresented_trends[]` undeclared until this run.** C88 reads `unrepresented_trends[]` on A5 to check that every trend is either represented by a participant or explicitly listed as unanswered. The field was declared in no document and in no carrier until 17 August; no producer had the field name to write. This is the mirror of the trends grouping defect: that one was a value in §6.6 that the generator read as three field names; this one was a field the gate has always checked that never appeared in §6.6 or the carrier at all. Both are logged as PT-036. `unrepresented_trends: [R1, R2, R3]` is correct — R1 (PSD3/PSR), R2 (DORA), R3 (EU AI Act) are mandatory baselines that apply to all EU participants equally and are not capabilities any single map participant uniquely represents.
9. **Build note — `trends[]` grouping shape.** The artifact field carrier (`.github/artifact-fields.yaml`) listed `business`, `technology` and `regulatory` as named fields of A5 rather than `class`, which caused this run to write `trends:` as a map keyed by class name rather than a flat list with `class` on each entry. The generator read three backtick-delimited class names in §6.6 as field names and did not declare `class` at all. The correct shape is a flat list: each trend entry carries `id`, `class`, and its other fields. §6.6 has been corrected and the carrier regenerated; the fix applied here. A producer following the carrier will produce the flat shape correctly going forward.
10. **Research-discipline finding — market count asserted from a single undated source, refuted by the deep-dive.** The B2 and T2 sections of this map asserted that "only two Czech banks" have reached transaction-level digital dispute initiation, citing Peníze.cz (penize-2banks) with its access date but without establishing its publication date. The stage 3.2 deep-dive established that MONETA has transaction-level initiation in both Smart Banka CARDS section and Internet Banking — a third Czech bank at the standard, sourced to Finparada (July 23, 2025) and the MONETA press release. The Peníze.cz publication date was subsequently established as July 7, 2025 — two weeks before the Finparada reporting of MONETA's simplification — which makes the chronological explanation the most plausible: the Peníze.cz assessment preceded the change rather than either source being wrong. The discipline failure is the assertion of a market count from one source without establishing its age. A count sourced to a single assessment with an unestablished date is not a verified fact; it is a snapshot that may already be stale. The map has been corrected and `finparada-moneta-2025` added to sources.
11. **Build note — `sources.md` requirement.** This artifact names 27 external citations. Since 14 August, citations for a run live in one `sources.md` per run rather than inside each artifact. C80 refuses any artifact naming a `ref` that does not resolve in `sources.md`. `fixtures/2026-04-card-disputes/sources.md` was created as part of this correction, carrying all 27 refs. Future producers should create `sources.md` before writing their first citation ref.

---

---


## How this was produced

Does not write A6 (competitor cards) or A7 (synthesis). Does not run Q3 or report a gate result for its own output — Q3 is checked independently and stage 3 has no human decision gate behind it. Does not write to `store/S1-competitors.md` — the store is generated from committed runs and never hand-edited. Does not advance the RUN-STATE. Does not recommend an action — describing the market is this stage's job; generating ideas from it is stage 4's. Does not attribute trends to participants where research did not establish them — `rb.cz`'s B2 attribution rests on the confirmed in-app chat in mobile/internet banking (rb-complaints), not an inference. T2 is not attributed to rb.cz because transaction-level structured dispute initiation was not confirmed.

**Assembled from one record**, which carries the participant set, the trends and the selection decisions as fields a check reads:

- **R-A5-01** — `records/3-competitive-analysis/A5-r01-landscape.record.md`

| ref | Publisher | What it is | Accessed / Published |
|---|---|---|---|
| chargeflow-2026 | Chargeflow, chargeflow.io | "Chargeback Statistics 2026: Trends, Costs & Solutions" — global volume and loss statistics | 2026-08-17 |
| concentrix-2025 | Concentrix, concentrix.com | "Chargeback Management: Solving the Hidden Costs of Disputes" — per-dispute call count | 2026-08-17 |
| chargebacks911-2026 | Chargebacks911, chargebacks911.com | "Chargeback Stats: All the Key Dispute Data Points for 2026" — volume data | 2026-08-17 |
| mastercard-b2b-2025 | Mastercard B2B, b2b.mastercard.com | "What's the true cost of a chargeback in 2025?" | 2025 |
| investujeme-cs-2021 | Investujeme.cz, investujeme.cz | "Spořitelna spustila online reklamaci plateb v mobilní aplikaci George" — ČS George dispute launch | October 6, 2021 |
| moneta-press-2025 | MONETA Money Bank, moneta.cz | "Klienti Monety stále častěji reklamují platby kartou" — volume statistics, digital channels | June 12, 2025 |
| penize-2banks | Peníze.cz, penize.cz | "Jak reklamovat platbu kartou? Jen dvě banky vám to maximálně usnadní" — Czech bank comparison | Accessed 2026-08-17 |
| kb-reklamace | Komerční banka, kb.cz | "Reklamace — Platební karty — Komerční banka" — KB's dispute process page | Accessed 2026-08-17 |
| csob-reklamace-form | ČSOB, platbakartou.csob.cz | "REKLAMACE TRANSAKCÍ PLATEBNÍCH KARET" — PDF form requirement documented | Accessed 2026-08-17 |
| mbank-blog-2024 | mBank CZ, mbank.cz | "Co jsou blokace plateb a jak fungují reklamace transakcí?" — mBank dispute channels | September 5, 2024 |
| moneta-faq | MONETA Money Bank, moneta.cz | "Jak mohu reklamovat platbu kartou" — FAQ dispute process | Accessed 2026-08-17 |
| airbank-penize | Peníze.cz via airbank.cz | Confirms AIR Bank has no in-app transaction-level dispute | Accessed 2026-08-17 |
| rb-complaints | Raiffeisenbank CZ, rb.cz | "Complaints — Raiffeisenbank" — contact channels for complaints | Accessed 2026-08-17 |
| revolut-dispute-process | Revolut UK, revolut.com | "How to dispute a Revolut card transaction" — in-app process, LLM adjudication | Accessed 2026-08-17 |
| revolut-help-timelines | Revolut UK help, help.revolut.com | "Dispute process and timelines" — resolution timeline data | Accessed 2026-08-17 |
| n26-dispute-support | N26, support.n26.com | "How to dispute a card transaction and request a chargeback" — in-app steps, status tracking | Accessed 2026-08-17 |
| monzo-dispute-help | Monzo, monzo.com | "How the dispute process works" — in-app form, automated questions | Accessed 2026-08-17 |
| latinia-2025 | Latinia, latinia.com | "Push Notification Trends for 2025" — fraud loss data, push notification banking | 2025 |
| backbase-ai | Backbase, backbase.com | "AI Banking Dispute Resolution Automation" — AI dispute automation in banking | Accessed 2026-08-17 |
| mastercard-ethoca | Mastercard / Ethoca, ethoca.com | "Ethoca Alerts" — pre-chargeback alert network, resolution statistics | Accessed 2026-08-17 |
| chargebackgurus-di | Chargebackgurus, chargebackgurus.com | "Chargeback Stats and Insights from Mastercard's State of Chargebacks Report" — Decision Intelligence Pro data | Accessed 2026-08-17 |
| aoshearman-psd3 | A&O Shearman, aoshearman.com | "Combatting payment account fraud: latest regulatory developments in the EU" — PSD3/PSR agreement | 2025 |
| dlapiper-psd3 | DLA Piper, dlapiper.com | "PSD3 and PSR: Proposed reforms to the EU Payments Framework" — 14-day resolution, timeline | March 2026 |
| mayerbrown-dora | Mayer Brown, mayerbrown.com | "EU's Digital Operational Resilience Act Takes Effect" — DORA in-force date, scope | January 2025 |
| dlapiper-dora | DLA Piper, dlapiper.com | "Application of DORA: Key considerations" — five pillars | February 2025 |
| goodwin-ai-act | Goodwin Law, goodwinlaw.com | "EU AI Act: Key Points for Financial Services Businesses" — Annex III classification, timelines | August 2024 |
| artificialintelligenceact-annex3 | EU AI Act reference, artificialintelligenceact.eu | "Annex III: High-Risk AI Systems" — full Annex III text | Accessed 2026-08-17 |

---

**The research ran under Standards v0.9 and this document is written to v0.12.** What that exposes, and the one card that does not meet the source floor v0.10 introduced, is recorded in the deep-dive's own closing section.

**What the store already held.** `store/S1-competitors.md` read before any research, per Standards §2.3 and skill step 3.

**Participants found in S1 at run date 2026-08-17:**

| identity_key | Name | Type | Researched at | Source run |
|---|---|---|---|---|
| adjacent:broker-networks | Independent broker networks | adjacent | 2026-08-09 | 2026-01-mortgage-onboarding |
| csob.cz | ČSOB | direct | 2026-08-13 | 2026-03-investor-onboarding |
| hypobank.cz | HypoBank | direct | 2026-08-09 | 2026-01-mortgage-onboarding |
| kb.cz | Komerční banka | direct | 2026-08-13 | 2026-03-investor-onboarding |
| mbank.cz | mBank CZ | direct | 2026-08-09 | 2026-01-mortgage-onboarding |
| moneta.cz | MONETA Money Bank | direct | 2026-08-13 | 2026-03-investor-onboarding |
| rb.cz | Raiffeisen CZ | direct | 2026-08-09 | 2026-01-mortgage-onboarding |
| substitute:branch-advisory | Bank branch advisory service | substitute | 2026-08-13 | 2026-03-investor-onboarding |
| substitute:do-nothing | Current-account and savings-account inertia | substitute | 2026-08-13 | 2026-03-investor-onboarding |
| substitute:long-term-rental | Long-term rental platforms | substitute | 2026-08-09 | 2026-01-mortgage-onboarding |

**Reuse decision: none reused.**

All ten S1 participants were researched against different market scopes — mortgage lending onboarding and savings-to-investment onboarding — neither of which is card dispute and chargeback handling. The Standards §2.3 and §5 are clear: identity keys persist across runs; researched offerings do not transfer with them. Carrying any of these cards forward would present mortgage- or investment-market research as card-dispute research.

Six identity keys from S1 are inherited and reused on this map: `csob.cz`, `kb.cz`, `mbank.cz`, `moneta.cz`, `rb.cz`, and `substitute:do-nothing`. Their identity keys are the join across runs; their prior card content is not imported. The remaining S1 participants (`adjacent:broker-networks`, `hypobank.cz`, `substitute:branch-advisory`, `substitute:long-term-rental`) do not appear on this map because they are not relevant to card dispute handling. `substitute:do-nothing` appears on this map under the same key but represents a different behaviour (not reporting a fraudulent transaction) from its prior use (not investing — savings inertia). This is noted in the participant's `reason` field and in `reused: []`.

`reused: []` — the participant count reused from S1 with their prior card content applied: zero.

---
