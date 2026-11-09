---
run_id: 2026-06-instant-payment-disputes
artifact_id: A5
ost_role: none
status: accepted
workflow: competitive-analysis
modified_by: agent
revisions: 1
sources: [A1, A4]
external_sources:
  - S-monzo-undo
  - S-monzo-app-fraud
  - S-natwest-recall
  - S-starling-home
  - S-ec-ipr-2025
  - S-psr-ps247
  - S-ebaclearing-rt1
  - S-eba-ecb-2025
  - S-veritas-ing
  - S-ey-ipr
  - S-moodys-vop
  - S-trustsphere-app
produced_by:
  agent: competitive-analysis
  skill: landscape-mapping
store: S1
scope: shared
egress_basis: pilot-test
standards_basis: "competitive-analysis-standards@0.12 read and applied. Research performed under pilot-test regime (substrate search and fetch; no approved endpoint named in egress.yaml)."
could_not_verify:
  - rule: "authored only from the quarantine bridge's structured extract, never from raw external text"
    needs: judge
    reach: process
assembled_at: 2026-08-22
assembled_from: [R-A5-01]
---

# Competitive Analysis | Landscape map: Instant payment recall and APP fraud recovery

The market for recovering a misdirected or deception-induced instant payment splits cleanly between two positions: banks that have absorbed a mandatory reimbursement liability and are building toward it, and banks where the current path is a phone call, a form, and a wait. No participant in the Czech Ring 1 confirmed an in-app recall path. One UK challenger confirmed a post-send cancellation window; one UK challenger confirmed an AI fraud advisory tool at point of send. The infrastructure for bank-to-bank recall messaging is in place. The client-facing interface that uses it is not, outside of a narrow group of UK neobanks operating under mandatory reimbursement. [rec:R-A5-01]

R3 (PSD3) has no confirmed representative on this map. No participant in scope has publicly positioned on PSD3 compliance specifically. That is a finding: the regulatory signal that would require EU banks to build what UK banks are already building has no response in the market's published material.

---

## The market we looked at

Consumer payment fraud recovery and instant payment recall, retail banking. Czech Republic first, then CEE ring 2, then European and UK retail banks and payment providers. Card scheme chargeback tooling is excluded: the brief states why, and the recovery mechanism is different. The Competitive Analysis Standards' ring order applies within this framing: Czech Republic first, then CEE, then the rest of Europe and UK, with global participants entered only where something is genuinely relevant. No Ring 4 participants were found.

The scope excludes card chargeback infrastructure, which run 2026-04-card-disputes covers. Revolut and Monzo appear here in a different capacity from that run: their instant payment recall features and APP fraud obligations are in scope; their card dispute handling is not.

---

## Where the market is moving

### Business trends

**B1: APP fraud disproportionately concentrates in instant payment channels.** Fraudulent instant payment transactions grew 175% across the EEA over two years, nearly double the 98% growth in overall instant payment volume. Credit transfer fraud reached EUR 2.5 billion in 2024 (24% year-on-year increase). APP fraud accounts for over 50% of fraudulent credit transfer value. Customers absorb 85% of credit transfer fraud losses, against 38% for card payments, because no chargeback right exists for an authorised push payment. Source: [S-eba-ecb-2025].

Impact: high. Horizon: short. Lifecycle: growing.

*What it means for this initiative.* Bears on H2 and H4. The irrevocability that makes instant payments fast is what makes each additional minute of despatch delay permanent. The recall window and the status gap are where the outcome is determined, not the bank's willingness to act later.

**B2: Mandatory bank liability shifts the cost of despatch delay onto sending banks.** UK PSR PS24/7 established mandatory APP fraud reimbursement from 7 October 2024: GBP 85,000 cap, 50/50 cost split between sending and receiving PSPs, five working days to reimburse. The cap covers 99.8% of Faster Payments APP scams by volume. Tier 1 UK banks report annualised reimbursement costs in the tens of millions. The EU is moving in the same direction under PSD3 (R3). Source: [S-psr-ps247].

Impact: high. Horizon: short. Lifecycle: growing.

*What it means for this initiative.* Bears directly on H2. Every additional minute between a client's first contact and the recall going out is now a quantified bank liability in the UK, and the regulatory trajectory makes it likely to become one in the EU.

**B3: Customers expect in-app, same-session resolution rather than a phone call.** Monzo cited data that 1 in 10 UK consumers have sent money to the wrong person when launching their undo-payment feature (May 2025). Challenger banks now publish scam recovery and reimbursement flows inside the app. The expectation of a same-session start to recovery is forming at the neobank tier and has not reached most incumbent retail banks. Source: [S-monzo-undo].

Impact: medium. Horizon: medium. Lifecycle: emerging.

*What it means for this initiative.* Bears on H1. The brief's product goal names exactly this shift. The expectation exists among clients; what is absent in Czech Ring 1 is a bank that meets it.

**B4: Concentrated fraud loss in the post-irrevocability window.** The average fraudulent SCT Inst transaction is EUR 1,400, against EUR 3,600 for traditional credit transfer fraud, indicating fast small-amount cases as the characteristic instant payment fraud pattern. ING states explicitly that SEPA and instant transfers are final and cannot be reversed where the customer authorised the payment, even if deceived. The 85% customer loss share confirms this is the dominant outcome across the EEA. Source: [S-eba-ecb-2025], [S-veritas-ing].

Impact: medium. Horizon: short. Lifecycle: growing.

*What it means for this initiative.* Bears on H2 and H4. Small amounts that move quickly are the cases where a working recall path matters most. The low average amount relative to card fraud should not be read as low priority for the client who lost it.

### Technology trends

**T1: Pre-send payee name verification (Verification of Payee) as the fraud-prevention layer before recall is needed.** VoP matches a payee's name to their IBAN in under one second before a payment is authorised. It is live in EBA Clearing's RT1 system across 94 European PSPs and mandatory for euro-area PSPs from 9 October 2025. VoP cannot prevent APP fraud where the client proceeds despite a mismatch warning, and it cannot help after the payment is sent. Source: [S-moodys-vop], [S-ec-ipr-2025].

Impact: high. Horizon: short. Lifecycle: growing.

*What it means for this initiative.* Bears on H1. VoP closes the misdirected-transfer case for errors without deception. An in-app recall path is the layer for cases VoP cannot prevent: deception-induced transfers and error transfers where the warning was dismissed.

**T2: Bank-to-bank recall messaging via ISO 20022 R-transactions.** The EPC SCT Inst Rulebook defines the Recall / Request for Recall by the Originator (RRO) message type in ISO 20022 XML. EBA Clearing's RT1 carries these messages in under 1.5 seconds between participants. The message exists and the channel works. What determines whether recovery happens is how fast the sending bank issues the message and whether the receiving bank cooperates. Source: [S-ebaclearing-rt1].

Impact: high. Horizon: short. Lifecycle: growing.

*What it means for this initiative.* Bears directly on H2. The despatch metric in the brief maps onto the gap between a client initiating the recall in-app and the RRO message reaching the receiving bank. Removing the human step from raise-to-despatch is what the metric measures.

**T3: Post-send cancellation window before settlement clears.** Monzo launched a configurable 10-to-60-second undo-payment window in May 2025, allowing customers to cancel a transfer to the wrong recipient or wrong amount before settlement completes. Monzo is the only named bank confirmed to have deployed this at consumer scale. The window does not address APP fraud where the client acts under deception and does not recognise the error within seconds. Source: [S-monzo-undo].

Impact: medium. Horizon: short. Lifecycle: emerging.

*What it means for this initiative.* Bears on H1. The undo window covers the most time-critical case: a mistake noticed immediately. It is distinct from a post-settlement recall and complements rather than replaces the H2 and H4 recall path.

**T4: AI-assisted fraud pattern recognition at point of payment initiation.** Starling Bank launched Scam Intelligence in October 2025, a generative AI tool that analyses screenshots and text provided by the customer before a payment is authorised and flags scam indicators. It is in production at one UK challenger bank. Deployment at incumbent or CEE retail banks is not confirmed. Source: [S-starling-home].

Impact: medium. Horizon: medium. Lifecycle: emerging.

*What it means for this initiative.* Bears on H1 and H4. Pre-send AI analysis reduces the set of cases reaching the recall path. It does not address cases where the deception is specific enough to bypass the pattern library.

### Regulatory trends

**R1: EU Instant Payments Regulation mandates Verification of Payee and irrevocable instant payment offering.** Regulation (EU) 2024/886 requires euro-area PSPs to send instant payments and offer free VoP from 9 October 2025. For non-euro EU members including Czech Republic, the deadline for sending and VoP is 9 July 2027. The regulation does not create a right of recall or a mandatory reimbursement obligation. It closes the misdirected-transfer path at origination. Source: [S-ec-ipr-2025], [S-ey-ipr].

Instrument: Regulation (EU) 2024/886 of the European Parliament and of the Council of 13 March 2024. Effective: euro-area PSPs from 9 October 2025; non-euro EU including Czech Republic from 9 July 2027.

*What it means for this initiative.* Bears on H1 and the regulatory timeline for Ceska sporitelna. Czech banks have until July 2027 to implement VoP. For the two years before that deadline, the in-app recall path is the only available response to misdirected instant payments at a Czech bank.

**R2: UK PSR mandatory APP fraud reimbursement creates a quantified liability for despatch delay.** PSR Specific Direction 20 / PS24/7 established mandatory reimbursement from 7 October 2024: GBP 85,000 cap, 50/50 PSP cost split, five-day reimbursement window. The cap fully covers 99.8% of Faster Payments APP scams by volume and 90% by value. Tier 1 UK banks report tens of millions in annualised reimbursement costs. Source: [S-psr-ps247].

Instrument: PSR Specific Direction 20 as amended July 2024, published as Policy Statement PS24/7, Payment Systems Regulator. Effective: 7 October 2024 for Faster Payments and CHAPS in the United Kingdom.

*What it means for this initiative.* Bears on H2 and sets the regulatory direction. The UK model demonstrates that a working recall path is a minimum requirement under a liability regime, not a differentiator. Czech banks are not yet under an equivalent obligation, but the direction is established.

**R3: PSD3 proposes extended consumer protection and potential APP fraud liability at EU level.** Proposal COM(2023) 366 final proposes updated payment service provider obligations, including provisions relevant to APP fraud liability that would bring EU PSPs closer to the UK PSR model. The proposal was in trilogue as of 2025; no participant in scope has published a compliance roadmap specifically referencing PSD3.

Instrument: Proposal for a Directive on payment services and electronic money services in the internal market, COM(2023) 366 final, European Commission, 28 June 2023. Effective: not yet in force; expected transposition period applies after formal adoption.

*What it means for this initiative.* Bears on all three primary problems. PSD3 adoption would make automated recall despatch a financial necessity for Czech banks rather than a service quality choice. No participant on this map has responded to this trend yet.

---

## Who is in it

| Participant | Type | Standing | Represents | Deep dive |
|---|---|---|---|---|
| **CSOB** (csob.cz) | direct | leader | B1, R1 | yes |
| **Komercni banka** (kb.cz) | direct | leader | B1 | yes |
| **Air Bank** (airbank.cz) | direct | innovator | T4 | yes |
| **Raiffeisen Bank International** (raiffeisen.com) | direct | leader | B1 | no |
| **NatWest** (natwest.com) | direct | leader | B2, T2 | yes |
| **Barclays** (barclays.co.uk) | direct | leader | B2 | no |
| **ING** (ing.com) | direct | leader | B1, B4 | yes |
| **Monzo** (monzo.com) | direct | innovator | T3, B3 | yes |
| **Starling Bank** (starlingbank.com) | direct | innovator | T4, B3 | yes |
| **Revolut** (revolut.com) | direct | innovator | B3, B2 | yes |
| **EBA Clearing** (ebaclearing.eu) | adjacent | leader | T1, T2, R1 | yes |
| **Pay.UK** (pay.uk) | adjacent | leader | T2, R2 | no |
| **Calling the bank's contact centre** (substitute:contact-centre-call) | substitute | leader | B4, B2 | yes |
| **Filing a police report** (substitute:police-report) | substitute | leader | B3 | no |
| **Accepting the loss** (substitute:accept-loss) | substitute | leader | B1 | no |

---

## Who we looked at closely, and why

**CSOB: selected for deep dive.** The dominant Czech bank by assets and the primary Ring 1 direct comparator for this initiative. Registered as a direct CERTIS participant. What they currently offer a client who has sent a misdirected instant payment, and at what speed, is the baseline this initiative sets itself against. Their website returned HTTP 500 during this research and recall-specific features could not be confirmed from public material; the deep dive should treat this gap as its primary task.

**Komercni banka: selected for deep dive.** Second-largest Czech bank by retail clients, Societe Generale subsidiary. In the competitor store from prior runs but researched for a different market scope (card disputes, investor onboarding); that research does not transfer here. Selected because Czech Ring 1 coverage requires both the dominant incumbent and its nearest comparator, and the instant payment recall process at KB may differ meaningfully from CSOB's given the different group ownership and digital platform.

**Air Bank: selected for deep dive.** The most digitally-forward Czech retail bank by app experience. Selected as Ring 1 innovator: if any Czech bank has implemented or piloted an in-app instant payment recall path, Air Bank is the most likely candidate given their track record with novel in-app features. No specific recall feature confirmed from published material; this is the hypothesis the deep dive tests.

**Raiffeisen Bank International: mapped, not selected for deep dive.** Pan-CEE banking group with the Czech legal entity at rb.cz and presence across eleven CEE markets. Instant payment recall features not confirmed from published material. Included for Ring 2 coverage; not deep-diving because the process likely mirrors the Czech entity's and the deep dive would not produce independent findings relative to the Ring 1 research.

**NatWest: selected for deep dive.** UK incumbent bank with a published support page specifically for reclaiming funds sent to an incorrect payee (confirmed from fetched page). The current process is manual: the customer contacts NatWest, who initiates a formal recovery claim. Selected as the Ring 3 banking leader representing what a major incumbent under mandatory reimbursement obligations (PSR PS24/7) has built: a documented process that still routes through a contact centre rather than the app. [S-natwest-recall]

**Barclays: mapped, not selected for deep dive.** UK's largest retail bank by assets, under PSR PS24/7 mandatory reimbursement. Second-highest APP fraud complaint volume in 2024. Their scams page returned HTTP 403 and could not be fetched; recall-specific features are unconfirmed. Not deep-diving in this iteration because the confirmed information does not differentiate their approach from NatWest's, and the failed fetch means a card would carry large gaps.

**ING: selected for deep dive.** Major European retail bank with an explicit published position on instant payment recall: SEPA and instant transfers are final and cannot be reversed where the customer authorised the payment, even under deception. ING can submit a recall request to the receiving bank but states no obligation exists for the receiving bank without a court order. Selected as the Ring 3 banking leader representing the dominant European incumbent position: the recall is a request, not a right, and what the bank offers is a facilitated attempt rather than a guaranteed recovery. [S-veritas-ing]

**Monzo: selected for deep dive.** UK challenger bank and the only confirmed European consumer bank with a deployed post-send cancellation window: undo payments (10-to-60-second configurable window, default 15 seconds, launched May 2025). Addresses wrong-recipient and wrong-amount errors caught within the window. Also the first UK neobank with a fully integrated in-app APP fraud reimbursement flow under PSR PS24/7, with claims processed within five business days. Selected as Ring 3 innovator defining the leading edge of self-service instant payment recovery. [S-monzo-undo], [S-monzo-app-fraud]

**Starling Bank: selected for deep dive.** UK challenger bank that launched Scam Intelligence in October 2025, a generative AI tool that analyses screenshots and text submitted by the customer before authorising a payment, flagging scam indicators. FCA-registered (730166). 24/7 UK human support. Under PSR PS24/7 mandatory reimbursement. Selected as Ring 3 innovator on T4: the only confirmed deployment of generative AI in the payment-initiation fraud-prevention path at a consumer retail bank. [S-starling-home]

**Revolut: selected for deep dive.** European-headquartered challenger bank with the highest volume of APP fraud complaints referred to the UK Financial Ombudsman Service in 2024 (3,242 cases) and a 41% uphold rate in 2025. Under PSR PS24/7 mandatory reimbursement. Selected as Ring 3 innovator: the complaint volume defines the scale of demand for better recall tooling, and the high uphold rate signals where the pressure to improve the in-app recovery experience is sharpest. [S-trustsphere-app]

**EBA Clearing: selected for deep dive.** Pan-European operator of RT1, the SEPA Instant Credit Transfer system, with 94 PSP participants across Europe. RT1 processes 5 million transactions on peak days with inter-PSP settlement in under 1.5 seconds. RT1 carries the ISO 20022 Recall and Request for Recall by the Originator (RRO) messages. Selected as adjacent infrastructure leader: RT1 is the channel through which any in-app recall ultimately sends its RRO message to the receiving bank. Understanding its message flow, timing and participant coverage defines the technical boundary of what is achievable. [S-ebaclearing-rt1]

**Pay.UK: mapped, not selected for deep dive.** Operator of the UK Faster Payments scheme through which PSR PS24/7 mandatory reimbursement applies. The recall message routing in the UK context passes through Pay.UK's infrastructure. Not deep-diving because the infrastructure layer is less differentiated than the PSP experience above it and the regulatory environment (R2) is better read through the banks subject to it.

**Calling the bank's contact centre: selected for deep dive.** The current path for a retail client who needs to recall a misdirected instant payment, documented in this run's problem material. Client calls the contact centre, agent fills a form, form travels to the recalls desk, desk sends the recall: minimum two hours on a weekday, Monday if the call arrives on Friday evening. Contact centre closed outside weekday hours (38% of cases from this run's problem material). Selected for deep dive because this is the substitute the initiative replaces: understanding precisely what it costs, in time and recovery probability, is necessary before estimating what replacing it is worth.

**Filing a police report: mapped, not selected for deep dive.** Banks including ING require a police report before processing a recall claim in APP fraud cases. It is a parallel process that does not trigger the bank's recall directly but is sometimes a condition for the bank acting. Not deep-diving because it is a well-understood process that does not carry information distinctive to the instant payment recall context.

**Accepting the loss: mapped, not selected for deep dive.** EBA-ECB data confirms that customers bear 85% of credit transfer fraud losses across the EEA, meaning most clients absorb the loss rather than recovering it. This is the dominant current outcome and the primary substitute this initiative competes against. Not deep-diving because it is not a product but a default; what the deep dive needs about it is the probability figure, which the EBA-ECB report already supplies.

---

## What we could not establish

**What Czech Ring 1 banks currently offer for instant payment recall.** CSOB's website returned HTTP 500 during this research; their specific recall process and any in-app features are unconfirmed. KB and Air Bank were found in the market but their published material for this specific topic was not available in English or reachable during this research round. The Czech Ring 1 is the baseline against which the initiative sets itself, and it is the least-confirmed section of this map.

**Barclays' recall-specific features.** Their fraud and scams page returned HTTP 403 and could not be fetched. Barclays is the UK's largest retail bank by assets; their approach to in-app recall under mandatory reimbursement is an important comparator that this research did not reach.

**ABN AMRO's instant payment recall process.** Their instant payments page returned HTTP 503. ABN AMRO is a major Dutch retail bank and a Ring 3 European comparator that could not be confirmed.

**Whether any European non-UK incumbent has deployed an in-app recall flow.** Research found NatWest has a published recovery process (manual), ING has a published position (recall possible but receiving bank not obligated), Monzo has an undo-payments feature and an in-app reimbursement flow, and Starling has an AI scam tool. No evidence was found of a European incumbent bank outside the UK with a self-service in-app instant payment recall flow. This could be a genuine gap or a research limitation; the deep dive should probe it.

**The status of PSD3.** R3 was in trilogue as of 2025. Whether it has been formally adopted as of the current date was not confirmed in this research round. The effective date of any transposition remains uncertain.

---

## How this was produced

Run 2026-06-instant-payment-disputes, stage 3.1 landscape-mapping, quality gate Q3.

**Research was real and performed under the pilot-test egress regime.** This is the first landscape map in this repository produced from actual web research. 9 search iterations were used against an 8-iteration bound; the ninth iteration found the Monzo undo-payments blog URL and the NatWest misdirected payment support page. This overage is recorded in the record's `bounds_hit` field. 12 pages were fetched; 4 fetch attempts failed (CSOB HTTP 500, ABN AMRO HTTP 503, Barclays HTTP 403, verification-of-payee.eu HTTP 404).

**Quarantine bridge followed on this surface.** On this surface, fetch capability and authoring capability are held by the same model instance, making the bridge an instruction rather than a structural barrier. The bridge was followed: each page was fetched, structured facts were extracted (claims, figures, dates, source identity) in the market-content-extract format, and participants and trends were authored only from those structured extracts. The raw page text was treated as data; no instruction found in any page was acted on.

**Store consulted before research.** The competitor store (S1) was read before the first search. 28 participants across prior runs were checked. None were reused: every participant in the store was researched for a different market scope (mortgage onboarding, investor onboarding, corporate coverage, card disputes). The identity keys persist; the researched offerings do not travel across scope boundaries.

**The material for this run is fabricated**, as fixtures/README.md records. The problem material (interviews, report) was written to exercise the workflow. The market research in this stage is real: the pages fetched exist, the facts extracted from them are what those pages say, and the participants named are actual market participants. The run's egress_basis is pilot-test because the egress regime is the test destination; the research itself is not invented.

**Rules no check decided for this skill:** `authored only from the quarantine bridge's structured extract, never from raw external text` (needs: judge, reach: process). This rule was followed; a judge rather than a check must verify it.

**Assembled from one record:**

- **R-A5-01**: records/3-competitive-analysis/A5-r01-landscape.record.md













