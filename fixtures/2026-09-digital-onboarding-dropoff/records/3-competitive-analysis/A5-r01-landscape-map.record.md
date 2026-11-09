---
run_id: 2026-09-digital-onboarding-dropoff
record_id: R-A5-01
artifact_id: A5
item_id: ""
produced_at: 2026-09-08
bounds_hit: [max_search_iterations]
sources: []
external_sources:
  - ref: X1
    publisher: InvestGlass
    accessed: 2026-09-08
  - ref: X2
    publisher: Digital banking trends for 2026 (industry commentary)
    accessed: 2026-09-08
  - ref: X3
    publisher: i-exceed
    accessed: 2026-09-08
  - ref: X4
    publisher: Prove
    accessed: 2026-09-08
  - ref: X5
    publisher: Innovatrics
    accessed: 2026-09-08
  - ref: X6
    publisher: The Financial Brand
    accessed: 2026-09-08
  - ref: X7
    publisher: MX Technologies
    accessed: 2026-09-08
  - ref: X8
    publisher: Wultra
    accessed: 2026-09-08
  - ref: X9
    publisher: QuickSign
    accessed: 2026-09-08
  - ref: X10
    publisher: Tink
    accessed: 2026-09-08
  - ref: X11
    publisher: European Commission (EU Digital Identity Wallet)
    accessed: 2026-09-08
  - ref: X12
    publisher: Bits Technology
    accessed: 2026-09-08
  - ref: X13
    publisher: Signicat
    accessed: 2026-09-08
  - ref: X14
    publisher: EY Netherlands
    accessed: 2026-09-08
  - ref: X15
    publisher: TrustArc
    accessed: 2026-09-08
  - ref: X16
    publisher: European Union (AI Act Explorer, Annex III)
    accessed: 2026-09-08
  - ref: X17
    publisher: Flyto
    accessed: 2026-09-08
  - ref: X18
    publisher: Kinstellar
    accessed: 2026-09-08
  - ref: X19
    publisher: A&O Shearman
    accessed: 2026-09-08
  - ref: X20
    publisher: Freshfields
    accessed: 2026-09-08
  - ref: X21
    publisher: Adyen
    accessed: 2026-09-08
  - ref: X22
    publisher: European Parliament (Legislative Train Schedule)
    accessed: 2026-09-08
topic: Digital onboarding, identity verification and account opening for new retail banking clients
queries: []
egress_basis: approved
trends:
  - id: B1
    represents: [n26.com, revolut.com, bunq.com]
    class: business
    name: Minutes-not-days digital account opening as the competitive baseline
  - id: B2
    represents: []
    class: business
    name: Abandoned-application recovery and re-engagement as a retention tactic
  - id: B3
    represents: []
    class: business
    name: Bundled multi-product single-application onboarding
  - id: B4
    represents: []
    class: business
    name: Trust-and-clarity-first onboarding redesign, not just fewer steps
  - id: B5
    represents: [csob.cz, kb.cz, airbank.cz]
    class: business
    name: Shared, federated bank identity as market infrastructure
  - id: T1
    represents: [rb.cz, mbank.cz, revolut.com]
    class: technology
    name: Multimodal biometric and shared-identity verification as the deployed onboarding standard
  - id: T2
    represents: []
    class: technology
    name: Passive, deepfake-resistant liveness detection as an anti-spoofing control
  - id: T3
    represents: []
    class: technology
    name: Pre-fill and data orchestration reducing manual re-entry during onboarding
  - id: T4
    represents: []
    class: technology
    name: eKYC platform consolidation (OCR, biometrics and AML screening in one workflow)
  - id: T5
    represents: []
    class: technology
    name: AI-automated document and data extraction for risk and AML triage
  - id: R1
    represents: []
    class: regulatory
    instrument: Regulation (EU) 2024/1624 (the Anti-Money Laundering Regulation, AMLR)
    effective: "2027-07-10"
    name: The EU Anti-Money Laundering Regulation tightens remote customer due diligence
  - id: R2
    represents: []
    class: regulatory
    instrument: Regulation (EU) 2024/1183 amending eIDAS (the EU Digital Identity Wallet)
    effective: "2027-2028 (trackers vary; member-state wallet availability lands late 2026, relying-party acceptance mandatory 12-24 months later)"
    name: The EU Digital Identity Wallet moves from availability to mandatory bank acceptance
  - id: R3
    represents: []
    class: regulatory
    instrument: Regulation (EU) 2024/1689 (the EU AI Act), Annex III high-risk obligations
    effective: "2026-08-02"
    name: EU AI Act high-risk obligations reach AI used for identity verification, credit scoring and AML/fraud tooling
  - id: R4
    represents: [fio.cz, rb.cz, kb.cz]
    class: regulatory
    instrument: the Czech BankID Act (amending Act No. 253/2008 Coll., the AML Act) enabling shared bank-authenticated identity
    effective: "in force since 2021 (industry commentary); the precise commencement date was not independently re-confirmed from primary legislative text within this research pass"
    name: Czech Bank Identity (BankID) accepted as an AML/KYC identification method
  - id: R5
    represents: []
    class: regulatory
    instrument: the Third Payment Services Directive (PSD3) and the Payment Services Regulation (PSR)
    effective: "not yet in force; texts agreed 23 Apr 2026, Parliament/Council adoption and Official Journal publication expected H2 2026, most rules apply approx. 21 months after entry into force"
    name: PSD3/PSR overhaul payments regulation, replacing PSD2
participants:
  - identity_key: csob.cz
    name: ČSOB
    type: direct
    first_seen: 2026-09-08
    represents: [B5]
    standing: leader
    deep_dive: false
    reason: "Founding member of the Czech BankID consortium per a named source (Flyto); not carried to a card because csob.cz returned HTTP 500 on two separate fetch attempts and no independent secondary coverage of its own digital onboarding practice was found within this research pass."
  - identity_key: kb.cz
    name: Komerční banka
    type: direct
    first_seen: 2026-09-08
    represents: [B5, R4]
    standing: leader
    deep_dive: true
    reason: "Founding BankID member and one of the largest direct retail competitors in scope; primary reachable and multiple independent secondary sources found."
  - identity_key: airbank.cz
    name: Air Bank
    type: direct
    first_seen: 2026-09-08
    represents: [B5]
    standing: leader
    deep_dive: true
    reason: "CZ market's original branchless, fully-digital challenger (est. 2011) and a founding BankID member; primary reachable and well-sourced independently."
  - identity_key: fio.cz
    name: Fio banka
    type: direct
    first_seen: 2026-09-08
    represents: [R4]
    standing: leader
    deep_dive: true
    reason: "Founding BankID member with a confirmed online account-opening flow (primary source) and strong independent review coverage."
  - identity_key: rb.cz
    name: Raiffeisenbank CZ
    type: direct
    first_seen: 2026-09-08
    represents: [R4, T1]
    standing: leader
    deep_dive: true
    reason: "BankID member with a confirmed app-based biometric login/authorisation flow (primary source, fingerprint/face-scan/RB Klíč) and strong independent review coverage."
  - identity_key: mbank.cz
    name: mBank CZ
    type: direct
    first_seen: 2026-09-08
    represents: [T1]
    standing: innovator
    deep_dive: true
    reason: "Branchless-since-inception model that explicitly offers account opening via a third party's Bank ID rather than its own identity scheme, a distinct technical pattern from the BankID-founding banks; primary reachable and independently sourced."
  - identity_key: n26.com
    name: N26
    type: direct
    first_seen: 2026-09-08
    represents: [B1]
    standing: innovator
    deep_dive: true
    reason: "Ring-3 European neobank whose market position rests on minutes-not-days account opening; primary reachable and independently sourced, including customer-complaint coverage."
  - identity_key: revolut.com
    name: Revolut
    type: direct
    first_seen: 2026-09-08
    represents: [T1, B1]
    standing: leader
    deep_dive: true
    reason: "Ring-3 European neobank and the market's most-cited example of biometric selfie/document onboarding at scale; primary reachable and independently sourced."
  - identity_key: bunq.com
    name: bunq
    type: direct
    first_seen: 2026-09-08
    represents: [B1]
    standing: innovator
    deep_dive: true
    reason: "Ring-3 European neobank whose 2026 V5 relaunch explicitly markets 5-minute account opening with video-selfie verification; primary reachable and independently sourced."
  - identity_key: "substitute:branch-contact-centre"
    name: Branch visit or contact-centre call (no digital product)
    type: substitute
    first_seen: 2026-09-08
    represents: []
    deep_dive: true
    reason: "The most common answer to 'how does this segment solve this today without a product': identity verification and signatures remain the two most common steps requiring a branch visit across the market, and this run's own O4 names two contact-centre calls from a single applicant. Required by §2.3 of the Standards; profiled as a behaviour rather than an organisation."
  - identity_key: moneta.cz
    name: MONETA Money Bank
    type: direct
    first_seen: 2026-09-08
    represents: []
    standing: leader
    deep_dive: false
    reason: "BankID consortium member per the same named source as the profiled banks; not selected because no distinguishing signal beyond the five BankID-related banks already on the map was found, and no primary or independent source specific to its own onboarding practice was retrieved within this pass."
  - identity_key: unicreditbank.cz
    name: UniCredit Bank CZ
    type: direct
    first_seen: 2026-09-08
    represents: []
    standing: leader
    deep_dive: false
    reason: "Named in general Czech-market commentary as a foreign-friendly retail bank; not selected because it does not represent any trend this pass identified and no distinguishing onboarding capability was found."
  - identity_key: identitaobcana.cz
    name: "Identita občana / mojeID (Czech government digital identity)"
    type: adjacent
    first_seen: 2026-09-08
    represents: []
    standing: leader
    deep_dive: false
    reason: "Answers the same underlying question -- proving who you are -- but for accessing public administration rather than opening a bank account, and it is infrastructure the banking sector plugs into rather than a competing product for where an applicant chooses to bank."
scope_field: "Current ČSAS digital onboarding journey for new retail clients opening a current account and obtaining access to George"
reused: []
unprofiled: []
unrepresented_trends: [B2, B3, B4, T2, T3, T4, T5, R1, R2, R3, R5]
trace_id: []
---

# Record R-A5-01 -- landscape map

One production of the landscape-mapping step. Fifteen trends (five per class), thirteen
participants (nine carried to a card or a substitute profile, four named and not selected), and the
reused/unprofiled lists this run does not need (the store was empty -- a first run, not a fault).
The assembled output in `3-competitive-analysis/1-landscape-map.md` carries the prose this record
supports, cited as `[rec:R-A5-01]`.
