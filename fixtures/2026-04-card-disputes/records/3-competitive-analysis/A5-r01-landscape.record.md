---
run_id: 2026-04-card-disputes
record_id: R-A5-01
artifact_id: A5
item_id: ""
produced_at: 2026-08-17
produced_by:
  agent: competitive-analysis
  skill: landscape-mapping
bounds_hit: []
topic: "Card dispute and chargeback handling for retail cardholders"
scope_field: "Card dispute and chargeback handling for retail cardholders"

trends:
  - id: B1
    class: business
    name: "Rising card dispute volumes and operational pressure"
    impact: high
    horizon: short
    lifecycle: growing
  - id: B2
    class: business
    name: "Digital self-service dispute initiation replacing paper form and phone call"
    impact: high
    horizon: short
    lifecycle: growing
  - id: B3
    class: business
    name: "Customer expectation of real-time case status visibility"
    impact: high
    horizon: short
    lifecycle: growing
  - id: B4
    class: business
    name: "Proactive pre-dispute unauthorized transaction notification"
    impact: medium
    horizon: short
    lifecycle: growing
  - id: B5
    class: business
    name: "Resolution speed as a competitive signal"
    impact: medium
    horizon: medium
    lifecycle: growing
  - id: T1
    class: technology
    name: "Real-time push notification for card transaction alerts"
    impact: high
    horizon: short
    lifecycle: growing
  - id: T2
    class: technology
    name: "In-app dispute workflow enabling transaction-level claim initiation"
    impact: high
    horizon: short
    lifecycle: growing
  - id: T3
    class: technology
    name: "AI/ML automated chargeback adjudication"
    impact: high
    horizon: medium
    lifecycle: growing
  - id: T4
    class: technology
    name: "Scheme-level pre-chargeback alert and dispute network infrastructure"
    impact: medium
    horizon: short
    lifecycle: mature
  - id: R1
    class: regulatory
    name: "PSD3 and PSR: Enhanced consumer dispute rights and 14-day resolution"
    impact: high
    horizon: medium
    lifecycle: growing
    instrument: "Directive on payment services and electronic money services (PSD3) and Regulation on payment services in the EU (PSR)"
    effective: "Provisional political agreement 27 November 2025; formal adoption expected 2026–2027; national transposition 18–24 months thereafter (2027–2028)"
  - id: R2
    class: regulatory
    name: "DORA: Operational resilience requirements for digital payment systems"
    impact: medium
    horizon: short
    lifecycle: growing
    instrument: "Regulation (EU) 2022/2554 on digital operational resilience for the financial sector (DORA)"
    effective: "January 17, 2025"
  - id: R3
    class: regulatory
    name: "EU AI Act: Compliance requirements for AI systems in fraud detection and dispute adjudication"
    impact: medium
    horizon: medium
    lifecycle: growing
    instrument: "Regulation (EU) 2024/1689 on artificial intelligence (EU AI Act), Annex III financial services provisions"
    effective: "In force August 2024; high-risk AI system obligations for new systems August 2026, legacy systems February 2027 (Digital Omnibus amendment may extend to late 2027)"

participants:
  - identity_key: csob.cz
    name: "ČSOB (Československá obchodní banka)"
    type: direct
    first_seen: 2026-08-17
    represents:
      - B1
    standing: leader
    deep_dive: true
    reason: "Largest Czech retail bank by total assets and customer count. Processes the market's highest absolute dispute volume by scale. Confirmed leader on B1. Critically: still requires customers to download, print, sign, and scan a PDF form for card dispute submission (csob-reklamace-form, confirmed 2026-08-17) — the oldest intake process live in the Czech retail estate and direct evidence of H2 at a competitor. Selected for deep dive to establish the incumbent baseline and because no other participant makes H2 more concrete."

  - identity_key: kb.cz
    name: "Komerční banka"
    type: direct
    first_seen: 2026-08-17
    represents:
      - B2
      - B3
      - T1
      - T2
    standing: leader
    deep_dive: true
    reason: "One of at least three Czech banks confirmed to have reached the standard of digital dispute initiation directly from the transaction screen — alongside ČS/George and MONETA (confirmed by stage 3.2 deep-dive; the Peníze.cz two-bank assessment was published July 7, 2025, two weeks before Finparada reported MONETA's simplification on July 23, 2025). MojeBanka and KB+ both support find-payment → click \"Stěžovat\" (Complain) → guided upload flow (kb-reklamace). KB+ also offers Oznámení o platbách (payment notifications) for real-time card transaction alerts. Leader on B2 (digital dispute), B3 (notification to payment notification parity), T1 (payment notification in production), T2 (transaction-level in-app dispute). Selected for deep dive as the best-evidenced Czech incumbent on the digital dispute capability this initiative must build against."

  - identity_key: mbank.cz
    name: "mBank CZ"
    type: direct
    first_seen: 2026-08-17
    represents:
      - B2
    standing: leader
    deep_dive: true
    reason: "Digital-first Czech challenger (Polish mBank group), one of the first online-only banks in the Czech Republic. Dispute process available via phone (mLine) and online banking (mbank-blog-2024, September 2024). Offers a 13-month dispute window — longer than the 30-day standard at most Czech banks. Represents B2 as a leader (digital/online dispute available as an alternative to branch or paper), though specific in-app transaction-level initiation is not confirmed from this research. Selected for deep dive as a ring-1 Czech challenger with established digital banking credentials, to establish whether their digital claim extends to in-app dispute."

  - identity_key: moneta.cz
    name: "MONETA Money Bank"
    type: direct
    first_seen: 2026-08-17
    represents:
      - B1
      - B2
      - B5
      - T2
    standing: leader
    deep_dive: true
    reason: "The only Czech bank participant with a published dispute volume figure: 35,000 card disputes in 2024, a 29% year-on-year increase (moneta-press-2025, June 2025). Transaction-level dispute initiation confirmed in Smart Banka CARDS section and Internet Banking — customers select the disputed transaction and file directly from the transaction view, with the claim form pre-populating date, amount and merchant (finparada-moneta-2025, July 2025; moneta-press-2025). This capability was not reflected in the Peníze.cz two-bank assessment (published July 7, 2025); Finparada reported the simplification two weeks later (July 23, 2025). Leader on B1 (volume data), B2 (transaction-level digital dispute initiation, confirmed by stage 3.2 deep-dive), B5 (35 working-day SLA, the Czech market benchmark for resolution speed), and T2 (transaction-level in-app dispute workflow confirmed in Smart Banka and Internet Banking). Selected for deep dive as the only Czech bank participant with specific volume data, and to establish whether the Peníze.cz two-bank assessment held."

  - identity_key: airbank.cz
    name: "Air Bank"
    type: direct
    first_seen: 2026-08-17
    represents:
      - B1
    standing: leader
    deep_dive: true
    reason: "Direct Czech ring-1 retail bank, part of the PPF Group. Confirmed via penize-2banks and airbank-penize that Air Bank does NOT offer in-app dispute initiation from a specific transaction — customers cannot click on a payment to dispute it. Represents B1 as a leader (they are a direct participant in the Czech card dispute market and process disputes, just through traditional channels). Selected for deep dive to complete ring-1 Czech banking coverage and to establish whether their digital banking capability extends to dispute handling despite the confirmed absence of transaction-level in-app initiation."

  - identity_key: rb.cz
    name: "Raiffeisenbank CZ"
    type: direct
    first_seen: 2026-08-17
    represents:
      - B2
    standing: leader
    deep_dive: true
    reason: "Direct Czech ring-1 retail bank, part of Raiffeisen Bank International (RBI) group. Dispute contact channels include customer service line (7am–10pm), 24/7 card blocking, email, and online chat via mobile and internet banking (rb-complaints). The online chat in mobile and internet banking is a digital dispute channel — it displaces the need to call or write a paper complaint — which qualifies as B2 (digital self-service dispute initiation replacing paper form and phone call). Transaction-level structured dispute initiation (T2) is not confirmed; the in-app chat is a conversational digital channel, not a structured transaction-level flow. Represents B2 as a leader. Selected for deep dive to establish whether a structured dispute flow exists alongside the chat channel, and to complete ring-1 Czech banking coverage."

  - identity_key: revolut.com
    name: "Revolut"
    type: direct
    first_seen: 2026-08-17
    represents:
      - B1
      - B2
      - B3
      - B4
      - B5
      - T1
      - T2
      - T3
    standing: innovator
    deep_dive: true
    reason: "The most comprehensive digital-first dispute provider on this map and the only participant that represents all five business trends and three of four technology trends as an innovator. Fully in-app dispute initiation from the transaction screen (T2, B2), LLM-agents for automatic adjudication of sub-threshold disputes (T3, B1), real-time integrated notification → freeze → dispute flow (T1, B4), 85% of disputes resolved within 5 weeks (B5, B3). Operates in Czech Republic (ring 1). Selected for deep dive as the market's clearest innovator benchmark — the design every Czech bank initiative should be compared against — and as the only in-scope participant with confirmed AI adjudication."

  - identity_key: n26.com
    name: "N26"
    type: direct
    first_seen: 2026-08-17
    represents:
      - B3
      - B4
      - T1
      - T2
    standing: innovator
    deep_dive: true
    reason: "EU neobank (ring 3 — European), licensed by BaFin and passported across the EU. Czech Republic availability not confirmed from this research (support page lists AT, DE, ES, FR, IT — CZ not stated). Included as ring-3 European participant because the capability set is genuinely relevant: in-app dispute from Home tab, real-time status tracking in app (\"track its progress,\" \"we'll update you in the app whenever there's progress\"), card auto-blocked on dispute submission, replacement ordered in same flow (n26-dispute-support). This is the clearest documented model of real-time case status tracking (B3, T2) and integrated notification (T1, B4) in the European market. Innovator on all four attributed trends. Selected for deep dive; if Czech Republic availability is confirmed at stage 3.2, it becomes a ring-1 participant."

  - identity_key: monzo.com
    name: "Monzo"
    type: direct
    first_seen: 2026-08-17
    represents:
      - B2
      - B4
    standing: innovator
    deep_dive: true
    reason: "UK neobank (ring 3 — European, UK). Not available in Czech Republic. Included because Monzo is the documented originator of the in-app dispute model now adopted by Revolut, N26, and others — it is the design benchmark that ring-1 and ring-3 EU participants have built against. In-app dispute form with automated guided questions and document upload (monzo-dispute-help). Card-payments scope explicitly. Innovator on B2 (in-app dispute initiated from transaction) and B4 (instant notifications enabling pre-dispute action). Ring 4 is not claimed — UK is ring 3. Selected for deep dive to establish what the originator of the model looks like, and whether features introduced since 2021 (Revolut and ČS's implementation year) are part of the Monzo baseline."

  - identity_key: mastercard.com
    name: "Mastercard (Ethoca and dispute management platform)"
    type: adjacent
    first_seen: 2026-08-17
    represents:
      - T3
      - T4
    standing: leader
    deep_dive: true
    reason: "Adjacent participant: Mastercard is not a retail bank and does not serve retail cardholders directly, but operates the scheme-level infrastructure through which all card disputes travel. Ethoca Alerts (T4): connects issuers and merchants to share dispute data in near-real-time, deflecting chargebacks before they enter the formal process — 30–40% chargeback reduction, 80% of Fiserv-issuer eligible disputes resolved in under 24 hours (mastercard-ethoca). Decision Intelligence Pro (T3): scans 1 trillion data points per transaction in under 50 milliseconds, 20% average fraud detection improvement (chargebackgurus-di). Leader on both T3 and T4 — the established scale player in the scheme infrastructure that every issuer on this map uses. Selected for deep dive because any initiative that improves dispute handling in Czech banking must work with Mastercard's platform, and understanding its current capabilities and APIs is prerequisite to scope."

  - identity_key: substitute:phone-call
    name: "Calling the bank's card operations or customer service line"
    type: substitute
    first_seen: 2026-08-17
    represents:
      - B3
    standing: leader
    deep_dive: false
    reason: "The dominant current substitute for digital status tracking and dispute initiation: customers call the bank's card line to report a disputed transaction or to ask where their case stands. Leader on B3 — the phone call IS the current leader in providing case status (however inefficiently), because there is no digital alternative in most Czech banks. This is the behavior the brief's success signal directly names: \"customers stop ringing to ask where their case is.\" Not selected for deep dive — it is a customer behaviour and a call-centre service category, not a profilable organisation."

  - identity_key: substitute:do-nothing
    name: "Not reporting the disputed transaction — accepting the loss"
    type: substitute
    first_seen: 2026-08-17
    represents:
      - B1
    standing: leader
    deep_dive: false
    reason: "The behavioural substitute: cardholders who spot a suspicious transaction but do not report it — because the process is too friction-heavy, the amount is too small, or they do not know chargebacks exist. Leader on B1 in the sense that a significant share of the dispute volume is suppressed rather than filed, and the introduction of digital intake increases submission rates (moneta-press-2025 confirms this: \"introduction of online forms increased complaint submissions, including cases clients might have previously ignored\"). Not selected for deep dive — it is a customer behaviour, not a profilable organisation. Note: a prior run's substitute:do-nothing card described savings-account inertia in the investment context — the identity key is reused but that card's findings do not transfer here."

reused: []
unprofiled: []
unrepresented_trends:
  - R1
  - R2
  - R3
---

# Record R-A5-01 — A5

One landscape-mapping invocation. Not written for a reader; the document assembled from it is 3-competitive-analysis/1-landscape-map.md.
