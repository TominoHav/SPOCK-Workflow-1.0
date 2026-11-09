---
run_id: 2026-04-card-disputes
record_id: R-A8-01
artifact_id: A8
item_id: ""
produced_at: 2026-08-17
produced_by:
  agent: product-owner
  skill: ideation
bounds_hit: []
ideas:
  - id: ID-1
    statement: "A read-only case status view that a cardholder opens from the disputed transaction in their CS app to see where a filed dispute stands, regardless of the channel it was filed through."
    description: "A cardholder who has filed a dispute by any means — paper form, phone, or future digital channel — can open their CS app, tap the disputed transaction, and see a live status: filed, under investigation, awaiting merchant response, or resolved. Each status change sends a proactive push notification. No Czech bank has built this capability: ST6 (emerging, 3/10) is held exclusively by the three innovators, and the absence register in A7 records it as confirmed at every Czech bank card from independent sources."
    solves:
      - H3
    supported_by:
      - ST6
      - TR-B3
      - P3
    compliance_touchpoints:
      - "GDPR: case status data — the disputed transaction record, case state, and bank investigation phase — is personal financial data requiring controls on processing basis, access rights, and retention period (indicative — Compliance Guidelines absent, touchpoints identified from run material only)"
  - id: ID-2
    statement: "A dispute-filing flow accessed directly from the suspicious transaction in the CS app, pre-filling date, amount, and merchant from the transaction record so the cardholder adds a description and submits."
    description: "A cardholder taps an unrecognised transaction in the app and initiates a dispute from that screen, without navigating to a separate form or contacting the bank by phone. KB and MONETA have reached this standard (ST4, emerging, 5/10) alongside all three innovators; CSOB requires a PDF emailed to reklamace@csob.cz. P1 establishes the operational risk of solving H2 alone: MONETA's 29% YoY volume growth after intake simplification shows that digital filing reveals latent demand rather than converting existing volume."
    solves:
      - H2
    supported_by:
      - ST4
      - P1
      - TR-B2
    compliance_touchpoints:
      - "GDPR: the dispute submission captures personal financial data including the cardholder's description of the unauthorized use; data-handling and retention controls are required (indicative — Compliance Guidelines absent, touchpoints identified from run material only)"
      - "PSD3 readiness: in-app dispute initiation creates the digital channel through which the 14-calendar-day maximum resolution ceiling will need to operate when PSD3 transposes (TR-R1, expected 2027-2028); channel design choices made now affect compliance posture at transposition (indicative — Compliance Guidelines absent, touchpoints identified from run material only)"
  - id: ID-3
    statement: "A real-time push notification on every card transaction, default-on for all cardholders without setup, that includes a one-tap action link opening the pre-filled dispute screen in the CS app for any charge the cardholder did not authorise."
    description: "Every card transaction fires a push notification within seconds. A cardholder who did not make the purchase taps a single action in the notification and arrives at a pre-filled dispute screen. The default-on design is what distinguishes this from the Czech incumbent approach: KB requires manual activation; CSOB makes the feature enableable (ST2, common, 6/10); the three innovators push to all cardholders without setup. No Czech bank connects a push notification to a dispute action — TR-B4 records that link as exclusive to the three innovators."
    solves:
      - H1
    supported_by:
      - ST2
      - TR-B4
      - P2
    compliance_touchpoints:
      - "ePrivacy Directive: default-on push notifications require valid consent under the Czech implementation of the ePrivacy Directive; the consent mechanism must satisfy the directive's requirements while the feature is presented as default-on (indicative — Compliance Guidelines absent, touchpoints identified from run material only)"
      - "GDPR: transaction-level push notification content is personal financial data; processing basis and notification content scope require controls (indicative — Compliance Guidelines absent, touchpoints identified from run material only)"
  - id: ID-4
    statement: "A single in-app journey, triggered by a real-time push notification, that takes a cardholder from first awareness of an unauthorized charge through optional card freeze, digital dispute filing, and post-submission status tracking in one uninterrupted session."
    description: "P2 documents that Revolut, N26, and Monzo have each built this four-step sequence as a complete chain with no non-digital step required at any stage. P4 documents that no Czech bank has confirmed any link between these capabilities. The integrated design is the one the synthesis verdict names as the opening: status tracking (H3) that no Czech bank has built, combined with transaction-level intake (H2) that only two Czech banks have reached, on a real-time notification trigger (H1) that no Czech bank connects to a dispute action. TR-R1 (PSD3, 14-calendar-day ceiling, transposition 2027-2028) makes the underlying infrastructure a regulatory requirement, not only a competitive improvement."
    solves:
      - H1
      - H2
      - H3
    supported_by:
      - P2
      - P4
      - ST4
      - ST6
      - TR-B4
      - TR-R1
    compliance_touchpoints:
      - "ePrivacy Directive: default-on push notification consent applies to the notification trigger in this chain (indicative — Compliance Guidelines absent, touchpoints identified from run material only)"
      - "GDPR: personal financial data is processed at each stage of the chain — notification content, dispute submission, and case status — requiring controls across all three processing activities (indicative — Compliance Guidelines absent, touchpoints identified from run material only)"
      - "PSD3 readiness: the integrated chain builds the digital processing infrastructure the 14-calendar-day maximum resolution ceiling will require at transposition (TR-R1, expected 2027-2028); design decisions made now will determine compliance posture (indicative — Compliance Guidelines absent, touchpoints identified from run material only)"
  - id: ID-5
    statement: "A structured post-resolution notification that tells the cardholder, after a dispute is decided, what was established about the unauthorized transaction and what protective action was taken by the bank."
    description: "H4 is a total market absence: no profiled participant — Czech or neobank — discloses what it communicates to the cardholder about the security investigation following a confirmed unauthorized transaction. The current market standard across all ten participants is binary outcome communication (refunded or not, per ST5) with nothing about card compromise, merchant notification, or fraud prevention action taken. This idea extends the resolution notification from a financial verdict to a structured debrief in two parts: financial outcome and a plain-language summary of what was established about the security event, within whatever disclosure limits apply."
    solves:
      - H4
    supported_by:
      - ST5
      - P3
    compliance_touchpoints:
      - "GDPR: investigation outcome data is sensitive personal financial data; retention period and access controls for post-resolution case records require controls distinct from those on the active dispute (indicative — Compliance Guidelines absent, touchpoints identified from run material only)"
      - "Banking secrecy and anti-fraud disclosure limits: what can be disclosed to the cardholder about a security investigation may be constrained by internal legal or regulatory rules; the post-resolution disclosure vocabulary must be designed within these limits before the feature is specified (indicative — Compliance Guidelines absent, touchpoints identified from run material only)"
---

# Record R-A8-01 — A8

One production. Not written for a reader; the document assembled from it is 4-solutions/1-solution-set.md.
