---
run_id: 2026-06-instant-payment-disputes
record_id: R-A7-01
artifact_id: A7
item_id: ""
produced_at: 2026-08-22
produced_by:
  agent: competitive-analysis
  skill: synthesis
revisions: 0
bounds_hit: []
standards:
  - statement: "Post-settlement recovery is a request, not a reversal, at all profiled banks and substitutes"
    traces_to: [csob.cz, kb.cz, airbank.cz, natwest.com, ing.com, monzo.com, ebaclearing.eu, "substitute:contact-centre-call"]
    addresses: [H1, H2]
    tier: universal
    source_count: "8 of 8"
  - statement: "The contact centre or an equivalent form-based channel is the primary recovery interface at five of eight profiled participants"
    traces_to: [csob.cz, kb.cz, airbank.cz, natwest.com, "substitute:contact-centre-call"]
    addresses: [H1, H2, H4]
    tier: common
    source_count: "5 of 8"
  - statement: "Instant payment settlement is irrevocable under current scheme rules at all profiled banks"
    traces_to: [csob.cz, kb.cz, airbank.cz, natwest.com, ing.com, monzo.com, ebaclearing.eu]
    addresses: [H1, H2]
    tier: universal
    source_count: "7 of 8"
  - statement: "Mandatory APP fraud reimbursement exists at two UK participants only"
    traces_to: [natwest.com, monzo.com]
    addresses: [H2]
    tier: emerging
    source_count: "2 of 8"
  - statement: "Verification of Payee at or before payment dispatch is present at three profiled participants, none of them Czech Ring 1"
    traces_to: [ing.com, ebaclearing.eu, natwest.com]
    addresses: [H1]
    tier: emerging
    source_count: "3 of 8"
  - statement: "In-app or online claim submission for recall or APP fraud is available at three participants, two of them innovators"
    traces_to: [natwest.com, monzo.com, airbank.cz]
    addresses: [H2, H4]
    tier: emerging
    source_count: "3 of 8"
patterns:
  - statement: "Wrongful claim rejection after mandatory reimbursement is documented at both UK participants despite legal obligation"
    traces_to: [natwest.com, monzo.com]
    addresses: [H2]
  - statement: "Prevention mechanisms operate only before or at payment dispatch and provide no post-settlement recovery path"
    traces_to: [ing.com, ebaclearing.eu, natwest.com, monzo.com]
    addresses: [H1, H2]
  - statement: "A post-send cancellation window operating before settlement was deployed by one innovator at retail scale"
    traces_to: [monzo.com]
    addresses: [H1]
  - statement: "ISO 20022 RRO inter-bank recall messaging is available through the RT1 infrastructure but no retail participant exposes a client-initiated trigger for it"
    traces_to: [ebaclearing.eu]
    addresses: [H1, H4]
trends:
  - statement: "Mandatory APP fraud reimbursement is expanding legislatively from the UK toward the EU under PSD3"
    traces_to: [natwest.com, monzo.com, ebaclearing.eu]
    addresses: [H2]
  - statement: "Verification of Payee is becoming mandatory across EU PSPs by 9 October 2025, Czech Ring 1 by July 2027"
    traces_to: [ing.com, ebaclearing.eu]
    addresses: [H1]
  - statement: "Mandatory reimbursement creates a quantified financial incentive to reduce the time between incident and recall despatch"
    traces_to: [natwest.com, monzo.com]
    addresses: [H2, H4]
  - statement: "AI-assisted fraud detection before payment dispatch is emerging among UK participants"
    traces_to: [natwest.com]
    addresses: [H2]
absences:
  - problem: H1
    statement: "A client-initiated post-settlement instant payment recall trigger was looked for at all eight profiled participants and found at none. No Czech Ring 1 bank, no EU incumbent, and no UK neobank provides a self-service in-app or online-banking recall at the instant layer. The network infrastructure (CERTIS, RT1, ISO 20022 RRO) exists; the client-facing interface does not."
  - problem: H2
    statement: "Mandatory APP fraud reimbursement covering Czech and EU clients was looked for and not found. PSR PS24/7 covers NatWest and Monzo for UK clients only. ING, CSOB, KB, and Air Bank operate under no equivalent legal obligation. PSD3 would extend mandatory reimbursement to EU PSPs; it was not yet in force at the time of research."
  - problem: H4
    statement: "A mechanism allowing a retail client to act before irrevocable settlement completes was looked for and found only as a pre-settlement cancellation window at Monzo. For Czech Ring 1 banks, no pre-settlement intervention and no post-settlement client-triggered recall exists at the instant layer. The despatch-speed problem shares the same structural absence as H1."
  - problem: H3
    statement: "H3 does not appear in the landscape map (A5) or any competitor card (A6). The synthesis cannot assess the market response to it. This problem is recorded as outside the scope of what this run's research can establish."
  - problem: H5
    statement: "H5 does not appear in the landscape map (A5) or any competitor card (A6). The synthesis cannot assess the market response to it. This problem is recorded as outside the scope of what this run's research can establish."
  - problem: H6
    statement: "H6 does not appear in the landscape map (A5) or any competitor card (A6). The synthesis cannot assess the market response to it. This problem is recorded as outside the scope of what this run's research can establish."
  - problem: H7
    statement: "H7 does not appear in the landscape map (A5) or any competitor card (A6). The synthesis cannot assess the market response to it. This problem is recorded as outside the scope of what this run's research can establish."
---

# Record R-A7-01 — A7

Synthesis assembled from A5 (landscape map, R-A5-01) and A6 (competitor cards, R-A6-01, 8 participants profiled). No outward reach was used at this stage. All findings trace to a card or to the landscape map. No new sources were added.

**Scope.** Run-scoped. A7 does not write to S1. The synthesis is not reused across runs.

**Egress.** The pilot-test egress basis from stages 3.1 and 3.2 is carried through as provenance. No fetch was performed in stage 3.3. `egress_basis: pilot-test` on A7 reflects the regime under which its inputs were produced, not a new fetch.

**Participants not in the evidence table.** Revolut and Starling Bank are unprofiled (bound exceeded; see R-A6-01). Raiffeisen Bank International, Barclays, Pay.UK, substitute:police-report, and substitute:accept-loss are on the landscape map and not profiled with cards. Landscape-level observations about these participants (Revolut complaint volume, Starling Scam Intelligence) are attributed to the landscape map, not graded as card-backed findings.
