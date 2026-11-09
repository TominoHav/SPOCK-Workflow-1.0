---
run_id: 2026-06-instant-payment-disputes
record_id: R-A5-01
artifact_id: A5
item_id: ""
produced_at: 2026-08-22
produced_by:
  agent: competitive-analysis
  skill: landscape-mapping
revisions: 1
bounds_hit: [max_search_iterations]
topic: "Instant payment recall and APP fraud recovery for retail banking"
scope_field: "Consumer payment fraud and recovery of misdirected credit transfers, retail banking. Czech Republic first, then European retail banks and payment providers. Card scheme chargeback tooling excluded."
trends:
  - id: B1
    class: business
    name: "APP fraud disproportionately concentrates in instant payment channels"
    impact: high
    horizon: short
    lifecycle: growing
    description: "Fraudulent instant payment transactions grew 175% over two years across the EEA, nearly double the 98% growth in overall instant payment volume. Credit transfer fraud reached EUR 2.5 billion in 2024, a 24% year-on-year increase, with APP fraud accounting for over 50% of fraudulent credit transfer value. Customers bear 85% of credit transfer fraud losses, compared with 38% for card payments, because no chargeback right exists for an authorised push payment."
    evidence: "eba-ecb-fraud-report-2025"
    implication: "Bears on H2 and H4. The irrevocability that makes instant payments fast is what makes each additional minute of processing delay a permanent loss. The despatch window and the status gap are where the outcome is determined."
  - id: B2
    class: business
    name: "Mandatory bank liability shifts the cost of despatch delay onto sending banks"
    impact: high
    horizon: short
    lifecycle: growing
    description: "The UK PSR introduced mandatory APP fraud reimbursement on 7 October 2024, splitting cost 50/50 between sending and receiving PSPs up to GBP 85,000 per claim and covering 99.8% of Faster Payments APP scams by volume. Reimbursement within five business days is the standard, 35 for complex cases. EU-level discussion under PSD3 moves in the same direction. The compliance cost is now a direct function of how long a bank takes to initiate recall."
    evidence: "psr-ps247-2024"
    implication: "Bears directly on H2. Every additional minute between a client's first contact and the recall going out is a quantified liability for the sending bank, not merely a service quality gap."
  - id: B3
    class: business
    name: "Customers expect in-app, same-session resolution rather than a phone call"
    impact: medium
    horizon: medium
    lifecycle: emerging
    description: "One in ten UK consumers have sent money to the wrong person. Monzo's May 2025 launch of a configurable undo-payment window was positioned around this data point. Challenger banks now publish scam recovery and APP reimbursement flows inside the app rather than referring clients to a phone number. The expectation that a resolution can start in the session where the error was noticed is forming at the neobank tier and has not yet reached most incumbent retail banks."
    evidence: "monzo-undo-payments-2025"
    implication: "Bears on H1. The brief's product goal names exactly this shift: a client opens the app rather than reaching for the phone, and the contact centre stops being where recovery starts."
  - id: B4
    class: business
    name: "Concentrated fraud loss in the post-irrevocability window"
    impact: medium
    horizon: short
    lifecycle: growing
    description: "The average fraudulent SCT Inst transaction is EUR 1,400, against EUR 3,600 for traditional credit transfer fraud, indicating that fast small-amount transactions are the characteristic instant payment fraud case. ING states explicitly that SEPA and instant transfers are final and cannot be reversed where the customer authorised the payment, even under deception. Customers absorbing 85% of credit transfer fraud losses confirms that the irrevocable outcome is the majority result."
    evidence: "eba-ecb-fraud-report-2025"
    implication: "Bears on H2 and H4. The small amounts that move quickly are precisely the cases where a working recall path matters most; their low value relative to traditional fraud should not be read as low impact."
  - id: T1
    class: technology
    name: "Pre-send payee name verification (Verification of Payee) as the fraud-prevention layer before recall is needed"
    impact: high
    horizon: short
    lifecycle: growing
    description: "VoP checks match a payee's name to their IBAN in under one second (three-second maximum per scheme rules) before a payment is authorised. It is deployed in production by EBA Clearing's RT1 system across 94 European PSPs, and mandatory for euro-area PSPs from 9 October 2025 under EU IPR 2024/886. VoP does not prevent APP fraud where the customer proceeds despite a mismatch warning, and it cannot help after the payment is sent."
    evidence: "moodys-vop-2025"
    implication: "Bears on H1. VoP is the layer that closes the misdirected-transfer case for errors without deception. An in-app recall path is the complementary layer for cases where VoP was overridden or where deception was the mechanism."
  - id: T2
    class: technology
    name: "Bank-to-bank recall messaging via ISO 20022 R-transactions"
    impact: high
    horizon: short
    lifecycle: growing
    description: "The EPC SCT Inst Rulebook defines R-transactions including the Recall / Request for Recall by the Originator (RRO) message type, formatted in ISO 20022 XML. EBA Clearing's RT1 system carries these messages in under 1.5 seconds between participants. The message exists; what determines whether recovery is possible is how fast the sending bank can issue it and whether the receiving bank cooperates."
    evidence: "ebaclearing-rt1-2024"
    implication: "Bears directly on H2. The despatch metric in the brief maps precisely onto the gap between a client initiating the recall in-app and the RRO message reaching the receiving bank. Removing the human from the raise-to-despatch step is what closes that gap."
  - id: T3
    class: technology
    name: "Post-send cancellation window before settlement clears"
    impact: medium
    horizon: short
    lifecycle: emerging
    description: "Monzo launched a configurable 10-to-60-second undo-payment window in May 2025, allowing customers to cancel a transfer before settlement completes. The feature is optional, defaults to 15 seconds, and applies to transfers to the wrong recipient or wrong amount. Monzo is the only named bank confirmed to have deployed this at consumer scale. The window does not address APP fraud where the customer acts under deception and does not recognise the error within seconds."
    evidence: "monzo-undo-payments-2025"
    implication: "Bears on H1. The undo window covers the most time-critical case: an error noticed immediately. It is distinct from a post-settlement recall and complements rather than replaces the recall path H2 and H4 address."
  - id: T4
    class: technology
    name: "AI-assisted fraud pattern recognition at point of payment initiation"
    impact: medium
    horizon: medium
    lifecycle: emerging
    description: "Starling Bank launched Scam Intelligence in October 2025, a generative AI tool that analyses screenshots and text provided by the customer before a payment is authorised. The tool flags concerns such as generic photos, low prices and known scam patterns, and is positioned as a scam advisor rather than a payment blocker. It is in production at one UK challenger bank; deployment at incumbent or CEE retail banks is not confirmed."
    evidence: "starling-home-2025"
    implication: "Bears on H1 and H4. Pre-send AI analysis surfaces scam indicators the client can act on before authorising. It reduces the set of cases reaching the recall path, but does not address cases where the AI tool is bypassed or where the deception is too specific to match known patterns."
  - id: R1
    class: regulatory
    name: "EU Instant Payments Regulation mandates Verification of Payee and irrevocable instant payment offering"
    impact: high
    horizon: short
    lifecycle: growing
    description: "EU IPR 2024/886 requires euro-area PSPs to offer instant payments and mandatory VoP from 9 October 2025. For non-euro EU members including Czech Republic, the deadline for sending and VoP is 9 July 2027. The regulation does not create a right of recall or a mandatory reimbursement obligation; it closes the misdirected-transfer entry point by requiring VoP before authorisation."
    evidence: "ec-ipr-announcement-2025"
    implication: "Bears on H1 and the regulatory framing for Ceska sporitelna. Czech banks have until July 2027 to implement VoP. For the two years before that deadline, the recall path is the only available response to misdirected instant payments."
    instrument: "Regulation (EU) 2024/886 of the European Parliament and of the Council of 13 March 2024 amending Regulations (EU) No 260/2012 and (EU) 2021/1230 and Directives 98/26/EC and 2015/2366 as regards instant credit transfers in euro"
    effective: "Euro-area PSPs: receiving instant payments mandatory from 9 January 2025, sending and VoP mandatory from 9 October 2025. Non-euro EU members including Czech Republic: sending and VoP mandatory from 9 July 2027."
  - id: R2
    class: regulatory
    name: "UK PSR mandatory APP fraud reimbursement creates a quantified liability for despatch delay"
    impact: high
    horizon: short
    lifecycle: mature
    description: "PSR PS24/7 established mandatory reimbursement for Faster Payments and CHAPS APP fraud victims from 7 October 2024, with a GBP 85,000 cap that fully covers 99.8% of cases by volume and 90% by value. Cost splits 50/50 between sending and receiving PSPs. Reimbursement must be made within five working days. Tier 1 UK banks are seeing annualised reimbursement costs in the tens of millions of pounds. The regime shifts the economic incentive: faster despatch reduces both the fraud outcome and the bank's reimbursement obligation."
    evidence: "psr-ps247-2024"
    implication: "Bears on H2 and sets the direction for EU-level rules. The UK model demonstrates that a working in-app recall path is not a differentiator but a minimum requirement under a liability regime. Czech banks are not yet under an equivalent obligation but the direction of regulation is established."
    instrument: "PSR Specific Direction 20 as amended July 2024, published as Policy Statement PS24/7, Payment Systems Regulator"
    effective: "7 October 2024 for Faster Payments and CHAPS in the United Kingdom"
  - id: R3
    class: regulatory
    name: "PSD3 proposes extended consumer protection and potential APP fraud liability at EU level"
    impact: medium
    horizon: medium
    lifecycle: growing
    description: "The EU Third Payment Services Directive proposes to update the PSD2 framework with stronger consumer protection measures, including provisions relevant to APP fraud liability that would bring EU PSPs closer to the UK PSR model. The proposal is in legislative process; no participant in scope has published a compliance roadmap specifically referencing PSD3."
    evidence: "ec-psd3-proposal-2023"
    implication: "Bears on all three primary problems. If adopted, PSD3 would extend to Czech and EU banks a liability framework that makes automated recall despatch a financial necessity rather than a service quality choice."
    instrument: "Proposal for a Directive on payment services and electronic money services in the internal market, COM(2023) 366 final, European Commission, published 28 June 2023"
    effective: "In legislative process; trilogue ongoing. Expected transposition period applies after formal adoption. No firm effective date set."
participants:
  - identity_key: csob.cz
    name: "CSOB (Ceskoslovenska obchodni banka)"
    type: direct
    standing: leader
    represents: [B1, R1]
    first_seen: 2026-08-22
    deep_dive: true
    reason: "Largest Czech bank by assets and primary direct comparator for this initiative. Registered as a direct participant in CERTIS, Czech Republic's real-time interbank settlement system. Their instant payment recall process and any in-app recall features are the baseline against which this initiative sets itself. Their website returned HTTP 500 during research; recall-specific features are unconfirmed and should be the primary focus of the deep dive."
  - identity_key: kb.cz
    name: "Komercni banka"
    type: direct
    standing: leader
    represents: [B1]
    first_seen: 2026-08-22
    deep_dive: true
    reason: "Second-largest Czech bank by retail clients, subsidiary of Societe Generale. In the competitor store under a different market scope (card disputes, investor onboarding); that research does not transfer to instant payment recall. Relevant as a direct Ring 1 competitor. No instant payment recall specific features confirmed from published material during this research; should be investigated in the deep dive."
  - identity_key: airbank.cz
    name: "Air Bank"
    type: direct
    standing: innovator
    represents: [T4]
    first_seen: 2026-08-22
    deep_dive: true
    reason: "Most digitally-forward Czech retail bank by app experience, known for pioneering in-app service features in the Czech market. Selected as Ring 1 innovator: if any Czech bank has implemented or piloted an in-app instant payment recall path, Air Bank is the most likely candidate. No specific recall feature confirmed from published material; this is the hypothesis the deep dive should test."
  - identity_key: raiffeisen.com
    name: "Raiffeisen Bank International"
    type: direct
    standing: leader
    represents: [B1]
    first_seen: 2026-08-22
    deep_dive: false
    reason: "Mapped, not selected for deep dive. Pan-CEE banking group operating in Czech Republic (rb.cz), Austria, and eleven further CEE markets, giving Ring 2 coverage. Instant payment recall features not confirmed from published material in this research round. Included because it is the dominant Ring 2 banking group; its recall process likely mirrors the Czech legal entity and the deep dive would not produce independent findings at this stage."
  - identity_key: natwest.com
    name: "NatWest"
    type: direct
    standing: leader
    represents: [B2, T2]
    first_seen: 2026-08-22
    deep_dive: true
    reason: "UK incumbent bank with a published support page specifically for reclaiming funds sent to an incorrect payee. The process is manual: the customer contacts NatWest who initiates a formal recovery claim. Selected as the Ring 3 banking leader representing the current state of the art in an incumbent under APP fraud mandatory reimbursement (PSR PS24/7): a well-documented process that still routes through a contact centre rather than app-self-service."
  - identity_key: barclays.co.uk
    name: "Barclays"
    type: direct
    standing: leader
    represents: [B2]
    first_seen: 2026-08-22
    deep_dive: false
    reason: "Mapped, not selected for deep dive. UK's largest retail bank by assets, under PSR PS24/7 mandatory reimbursement. Second-highest APP fraud complaint rate by volume in 2024 (399 card fraud cases per Financial Ombudsman data). Their scams page (barclays.co.uk/fraud-and-scams/latest-scams/) returned HTTP 403 and could not be fetched; recall-specific features are unconfirmed. Not deep-diving because the confirmed facts about their process are insufficient to differentiate it from NatWest's at this stage."
  - identity_key: ing.com
    name: "ING"
    type: direct
    standing: leader
    represents: [B1, B4]
    first_seen: 2026-08-22
    deep_dive: true
    reason: "Major European retail bank with explicit public statements that SEPA and instant transfers are final and cannot be reversed where the customer authorised the payment. ING can submit a recall request to the receiving bank but states no obligation exists for that bank to cooperate without a court order. Selected as the Ring 3 banking leader representing the dominant European incumbent position: the recall is a request, not a right, and the bank's role is to facilitate it quickly rather than guarantee the outcome."
  - identity_key: monzo.com
    name: "Monzo"
    type: direct
    standing: innovator
    represents: [T3, B3]
    first_seen: 2026-08-22
    deep_dive: true
    reason: "UK challenger bank and the only confirmed European consumer bank with a deployed post-send cancellation window (undo payments, 10-60 seconds, launched May 2025). Also the first UK neobank with a fully integrated in-app APP fraud reimbursement flow under PSR PS24/7, with claims processed within 5 business days. Selected as the Ring 3 innovator that defines the leading edge of the self-service recall experience."
  - identity_key: starlingbank.com
    name: "Starling Bank"
    type: direct
    standing: innovator
    represents: [T4, B3]
    first_seen: 2026-08-22
    deep_dive: true
    reason: "UK challenger bank that launched Scam Intelligence in October 2025, a generative AI tool that analyses screenshots and text to flag scam indicators before a payment is authorised. FCA-registered (730166). Selected as the Ring 3 innovator on the AI-assisted fraud detection trend: the only confirmed deployment of generative AI in the payment-initiation fraud-prevention path at a consumer retail bank."
  - identity_key: revolut.com
    name: "Revolut"
    type: direct
    standing: innovator
    represents: [B3, B2]
    first_seen: 2026-08-22
    deep_dive: true
    reason: "European-headquartered challenger bank with the highest volume of APP fraud complaints referred to the UK Financial Ombudsman Service in 2024 (3,242 cases) and a 41% uphold rate in 2025, the highest of any UK bank. Selected as the Ring 3 innovator whose complaint volume both defines the scale of demand for better recall tooling and signals where the regulatory pressure is sharpest. Under PSR PS24/7 mandatory reimbursement."
  - identity_key: ebaclearing.eu
    name: "EBA Clearing"
    type: adjacent
    standing: leader
    represents: [T1, T2, R1]
    first_seen: 2026-08-22
    deep_dive: true
    reason: "Pan-European operator of RT1, the SEPA Instant Credit Transfer system, with 94 PSP participants across Europe. RT1 processes 5 million transactions on peak days with inter-PSP settlement in under 1.5 seconds. RT1 carries the ISO 20022 Recall and Request for Recall by the Originator (RRO) messages that constitute the technical backbone of bank-to-bank recall for instant payments. Selected as the adjacent infrastructure leader: RT1 is the channel through which any in-app recall eventually sends its recall message to the receiving bank."
  - identity_key: pay.uk
    name: "Pay.UK (Vocalink)"
    type: adjacent
    standing: leader
    represents: [T2, R2]
    first_seen: 2026-08-22
    deep_dive: false
    reason: "Mapped, not selected for deep dive. Pay.UK operates the UK Faster Payments scheme, through which PSR PS24/7 mandatory reimbursement applies. The recall message routing in the UK context passes through Pay.UK's infrastructure. Not deep-diving because the infrastructure is less differentiated than the PSP layer above it and the regulatory environment (R2) is better read through the banks subject to it."
  - identity_key: substitute:contact-centre-call
    name: "Calling the bank's contact centre"
    type: substitute
    standing: leader
    represents: [B4, B2]
    first_seen: 2026-08-22
    deep_dive: true
    reason: "The current path for a Czech retail client who needs to recall a misdirected instant payment, documented in this run's problem material: client calls the contact centre, agent fills a form, the form travels to the recalls desk, the desk sends the recall. Minimum two hours on a weekday, Monday if the call arrives Friday evening; contact centre is closed outside weekday hours. Selected for deep dive because this is the thing the initiative is designed to replace: understanding exactly what it costs is necessary before estimating what replacing it is worth."
  - identity_key: substitute:police-report
    name: "Filing a police report"
    type: substitute
    standing: leader
    represents: [B3]
    first_seen: 2026-08-22
    deep_dive: false
    reason: "Mapped, not selected for deep dive. Filing a police report is what banks including ING require before processing a recall claim in APP fraud cases. It is a parallel process that does not itself trigger a bank recall but is sometimes a prerequisite for the bank acting. Not deep-diving because it is well-understood and does not carry information distinctive to the instant payment recall context."
  - identity_key: substitute:accept-loss
    name: "Accepting the loss without acting"
    type: substitute
    standing: leader
    represents: [B1]
    first_seen: 2026-08-22
    deep_dive: false
    reason: "Mapped, not selected for deep dive. The EBA-ECB 2025 report confirms that customers bear 85% of credit transfer fraud losses, meaning the majority outcome across the EEA is that the client absorbs the loss. This is not a product but the dominant current outcome. Included because any alternative the initiative creates competes primarily with this, not with a capable incumbent."
reused: []
unprofiled: []
unrepresented_trends: [R3]
---

# Record R-A5-01 — A5

One landscape-mapping invocation. Not written for a reader; the document assembled from it is 3-competitive-analysis/1-landscape-map.md.

**Failed page fetches this run:** csob.cz/en/csob/payment-system-and-regulatory-compliance (HTTP 500), abnamro.nl/en/personal/payments/making-payments/instant-payments.html (HTTP 503), barclays.co.uk/fraud-and-scams/latest-scams/ (HTTP 403), verification-of-payee.eu/instant-payments-regulation (HTTP 404). These four pages were attempted and not retrieved. Participants derived from those attempted fetches are on the map with their limitations stated.
