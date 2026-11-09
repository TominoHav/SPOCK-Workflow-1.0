---
run_id: 2026-06-instant-payment-disputes
record_id: R-A8-01
artifact_id: A8
item_id: ""
produced_at: 2026-08-22
produced_by:
  agent: product-owner
  skill: ideation
bounds_hit: []
ideas:
  - id: IDEA-01
    statement: "A client-facing interface in the CS mobile app that sends an inter-bank recall message to the receiving bank the moment the client acts, removing the contact centre handoff from the raise-to-despatch chain."
    description: "The client identifies the instant payment in the CS mobile app, selects a recall reason, and confirms. The bank's system sends the recall message through the inter-bank network without a human step. The client sees confirmation that the recall has been sent in the same session."
    solves:
      - H1
      - H2
    supported_by:
      - A7-standard-post-settlement-request
      - A7-pattern-rro-no-client-trigger
      - A7-absence-H1
    compliance_touchpoints:
      - "EPC SCT Inst Rulebook and CERTIS scheme rules govern the RRO message format, the one-per-transaction limit and the 15-business-day receiving-bank response window. Indicative: Compliance Guidelines absent from this run."
      - "PSD2 liability framework for authorised push payments: where the client authorised the payment under deception, who bears the loss shapes what the bank can and cannot represent when confirming the recall has been sent. Indicative: Compliance Guidelines absent from this run."
      - "AML controls on the recall path: a client-initiated recall reverses a payment the client authorised and needs controls that prevent the mechanism from being used to reverse a legitimate payment for non-recovery purposes. Indicative: Compliance Guidelines absent from this run."
  - id: IDEA-02
    statement: "In-app case status tracking that updates the client at each stage of the recall process, from filing to outcome, without routing status queries through the contact centre."
    description: "A persistent status view of the client's open recall case, surfaced in the Sporitelna app and updated at each event in the inter-bank process. The client sees when the recall message went out and what the receiving bank said, in the app, without calling."
    solves:
      - H4
      - H7
    supported_by:
      - A7-standard-contact-centre-primary
      - A7-standard-in-app-claim-submission
      - A7-trend-incentive-to-reduce-time
    compliance_touchpoints:
      - "GDPR data display: surfacing transaction identifiers, counterparty account fragments and case status in a client-facing screen requires a compliant data handling basis. Indicative; Compliance Guidelines absent from this run."
      - "PSD2 and EBA dispute notification: CNB and EBA guidance may specify required formats or minimum timelines for communicating recall outcomes to the client. Indicative; Compliance Guidelines absent from this run."
  - id: IDEA-03
    statement: "A two-field addition to the back-office recall form that records when the client first contacted the bank and when the recall was despatched, giving the bank the time-to-despatch metric it has never had."
    description: "The form the recalls desk works from carries no timestamp for when the client first called and no timestamp for when the recall went out. Adding both creates the measurement baseline the initiative requires."
    solves:
      - H2
      - H6
    supported_by:
      - A7-standard-mandatory-reimbursement-uk
      - A7-absence-H2
      - A7-trend-incentive-to-reduce-time
    compliance_touchpoints:
      - "Indicative (Compliance Guidelines absent): data governance and retention requirements for operational timestamps added to a payment dispute record."
      - "Indicative (Compliance Guidelines absent): scheme or regulatory rules governing what a bank must record to demonstrate recall despatch timing, relevant if PSD3 mandatory reimbursement takes effect."
  - id: IDEA-04
    statement: "A recall request trigger in the ČS mobile app, operating at every hour, so a client who discovers a misdirected instant payment on a Friday evening can act immediately rather than waiting until Monday."
    description: "An in-app recall trigger on the instant payment record lets a retail client initiate a post-settlement recall without calling the contact centre. The app passes the request to the bank's backend, which sends the RRO message to the receiving bank directly. The path operates at every hour of the day and week, serving the 38 per cent of cases that arrive outside weekday business hours."
    solves:
      - H1
      - H5
    supported_by:
      - A7-standard-contact-centre-primary
      - A7-absence-H1
    compliance_touchpoints:
      - "Client recall obligation under Czech payment law: Indicative - Whether an in-app recall request carries the same legal standing as one routed through the contact centre requires review against Czech payment law and the bank's own terms of service. Banking Constraints and Compliance Guidelines are absent from this run."
      - "RRO message obligations under the EPC SCT Inst Rulebook: Indicative - The EPC SCT Inst Rulebook governs how a sending bank initiates an RRO message and the 15-day response window. Whether CERTIS carries an RRO-equivalent for CZK instant payments is unconfirmed in this run's synthesis; the euro-area path via RT1 is confirmed. Banking Constraints and Compliance Guidelines are absent from this run."
      - "APP fraud liability and loss allocation: Indicative - Where the client authorised the payment under deception, who carries the loss is governed by rules the brief records as out of scope. Sending the recall does not settle the liability question. Banking Constraints and Compliance Guidelines are absent from this run."
      - "GDPR and data governance for in-app fraud reports: Indicative - The client submits a description of a fraud event through the app. Retention, handling and transmission of that description to the receiving bank need a data protection review under GDPR and ČS-specific data governance rules. Banking Constraints and Compliance Guidelines are absent from this run."
  - id: IDEA-05
    statement: "A claim registered through any channel triggers an automated recall message to the receiving bank within seconds, and the despatch confirmation is visible to the client and to any front-line staff they contact in the same session."
    description: "The recall goes out automatically when the claim is registered. The two-hour minimum from client contact to recall being sent becomes seconds. Both the client and the contact centre agent see the despatch confirmation before the call ends, answering the two questions clients always ask in the moment rather than leaving them open for days."
    solves:
      - H2
      - H4
    supported_by:
      - A7-standard-in-app-claim-submission
      - A7-trend-incentive-to-reduce-time
      - A7-absence-H4
    compliance_touchpoints:
      - "PSD3 mandatory reimbursement liability. If PSD3 extends mandatory APP fraud liability to Czech banks, the time between a client's report and the recall message going out becomes a quantified bank liability. This idea cuts that time directly. The specific timeline obligation will depend on how PSD3 is transposed and implemented. Indicative only: Banking Constraints and Compliance Guidelines are absent from this run."
      - "CERTIS CZK recall message capability. The synthesis confirmed RT1 carries the ISO 20022 RRO for euro-area payments. Whether CERTIS supports an equivalent for CZK-denominated instant payments is unconfirmed in this run's material. An automated despatch targeting Czech Ring 1 banks depends on that capability existing under CNB scheme rules not examined here. Indicative only: Banking Constraints and Compliance Guidelines are absent from this run."
      - "Accuracy of the despatch confirmation. The status visible to the client and the agent states that a recall message has been sent. If the message fails to deliver or the receiving bank declines it, the standing of that statement under consumer protection rules requires examination. Indicative only: Banking Constraints and Compliance Guidelines are absent from this run."
unproduced: []
---

# Record R-A8-01 - A8 phase 1 slate

Phase 1 invocation only. Names the slate; authors no ideas. Five entries. The assembled document (4-solutions/1-solution-set.md) is produced at the join, not here.

**Missing know-how.** Two bodies declared for this skill are absent from this run.

- **Banking Constraints** — absent. No idea is weighed for feasibility. Phase 2 cannot test whether a proposed mechanism is permitted under the bank's internal rules.
- **Compliance Guidelines** — absent. The skill procedure requires holding the Compliance Guidelines in context before naming ideas, so compliance shapes the ideas rather than being checked after. This run cannot do that. Phase 2 compliance_touchpoints[] will be marked indicative, naming this absent body, per the skill's declared reduction.

**A7 element keys used in supported_by[].** The A7 record (R-A7-01) carries no explicit id field on its synthesis elements. The keys in supported_by[] derive from the record's statement text as follows.

- A7-standard-post-settlement-request: standards[0] "Post-settlement recovery is a request, not a reversal, at all profiled banks and substitutes" (universal, addresses H1 H2)
- A7-standard-contact-centre-primary: standards[1] "The contact centre or an equivalent form-based channel is the primary recovery interface at five of eight profiled participants" (common, addresses H1 H2 H4)
- A7-standard-mandatory-reimbursement-uk: standards[3] "Mandatory APP fraud reimbursement exists at two UK participants only" (emerging, addresses H2)
- A7-standard-in-app-claim-submission: standards[5] "In-app or online claim submission for recall or APP fraud is available at three participants, two of them innovators" (emerging, addresses H2 H4)
- A7-pattern-rro-no-client-trigger: patterns[3] "ISO 20022 RRO inter-bank recall messaging is available through the RT1 infrastructure but no retail participant exposes a client-initiated trigger for it" (addresses H1 H4)
- A7-trend-incentive-to-reduce-time: trends[2] "Mandatory reimbursement creates a quantified financial incentive to reduce the time between incident and recall despatch" (addresses H2 H4)
- A7-absence-H1: absences[0] "A client-initiated post-settlement instant payment recall trigger was looked for at all eight profiled participants and found at none" (problem H1)
- A7-absence-H2: absences[1] "Mandatory APP fraud reimbursement covering Czech and EU clients was looked for and not found" (problem H2)
- A7-absence-H4: absences[2] "A mechanism allowing a retail client to act before irrevocable settlement completes was looked for and found only as a pre-settlement cancellation window at Monzo; for Czech Ring 1 banks, none exists at the instant layer" (problem H4)

**Coverage.** H1 is addressed by IDEA-01 and IDEA-04. H2 is addressed by IDEA-01, IDEA-03, and IDEA-05. H4 is addressed by IDEA-02 and IDEA-05. All three primary problems are addressed across the slate.

**H5, H6, H7 in supported_by[].** These secondary problems are not surfaced in A7 (confirmed absent: R-A7-01 absences for H5, H6, H7). Ideas addressing them (IDEA-02 solves H7, IDEA-03 solves H6, IDEA-04 solves H5) cite A7 elements that bear on the co-solved primary problem. This is stated rather than concealed.
