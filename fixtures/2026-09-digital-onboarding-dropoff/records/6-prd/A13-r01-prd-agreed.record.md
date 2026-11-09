---
run_id: 2026-09-digital-onboarding-dropoff
record_id: R-A13-01
artifact_id: A13
item_id: ""
produced_at: 2026-09-08
bounds_hit: []
trace_id: []
sources: [A11, A9, A4, A3b, A1]
external_sources: []
sections:
  - id: overview
    status: present
    reason: ""
  - id: problem
    status: present
    reason: ""
  - id: users
    status: present
    reason: ""
  - id: success_measures
    status: present
    reason: ""
  - id: requirements
    status: present
    reason: ""
  - id: non_functional
    status: present
    reason: ""
  - id: out_of_scope
    status: present
    reason: ""
  - id: dependencies
    status: present
    reason: ""
requirements:
  - id: R1
    traces_to: [A11, A4]
  - id: R2
    traces_to: [A11, A4]
  - id: R3
    traces_to: [A11]
  - id: R4
    traces_to: [A11]
  - id: R5
    traces_to: [A11]
  - id: R6
    traces_to: [A11]
  - id: R7
    traces_to: [A11]
  - id: R8
    traces_to: [A11]
alignment_validation: "Checked against AI-2 (share of sales and service processes in primary digital channels that are fully straight-through, AI First) and TL-1 (clients affected by outages of key digital channels, Technology leadership), Strategy Basis v0.1. The product goal — new ČSAS retail clients who abandon digital onboarding partway complete the same application rather than starting a new one — is one step from AI-2: a resumed, completed application is a straight-through completion in the same digital channel rather than a duplicate application or no return at all. That one-step chain, stated at A11, is unchanged by narrowing from the two MVP options to OPT1; OPT1 is the full capability A9 and A11 describe, so nothing in the chain from product goal to AI-2 was cut. TL-1 is a strain rather than a serving: the durable session store and the resumption endpoint are a new failure surface, and R8 below is what keeps TL-1 from moving the wrong way rather than assuming it neutral. Both objectives are named because the second, confirmatory pass this document runs asks whether the narrowed thing still serves the strategy it was banded on, not only the one it serves best."
compliance_touchpoints:
  - area: "A3"
    sub_domain: "L5"
    trigger: "N5"
    resolution: requirement
    names: "R2"
    owner: ""
    decided_at: ""
    reason: ""
    touchpoint: "The client is identified remotely — identification (the re-run check), authentication and any signature step stay three separate steps at resumption, exactly as the original application (LG-05)"
    basis: "compliance-guidelines@0.1 · A3/L5"
  - area: "A4"
    sub_domain: "I2"
    trigger: "K4"
    resolution: requirement
    names: "R2"
    owner: ""
    decided_at: ""
    reason: ""
    touchpoint: "The client logs in, or the login changes — the resumption path is specified to the same authentication strength and session-ending behaviour as login elsewhere in the journey (IT-01)"
    basis: "compliance-guidelines@0.1 · A4/I2"
  - area: "A4"
    sub_domain: "I2"
    trigger: "K4"
    resolution: requirement
    names: "R2"
    owner: ""
    decided_at: ""
    reason: ""
    touchpoint: "The client recovers access after losing a factor — recovering a session after full abandonment is designed to the same recovery standard as any other recovery path (IT-04)"
    basis: "compliance-guidelines@0.1 · A4/I2"
  - area: "A4"
    sub_domain: "I2"
    trigger: "K4"
    resolution: requirement
    names: "R2"
    owner: ""
    decided_at: ""
    reason: ""
    touchpoint: "A device or session is remembered — remembering an applicant's progress across a device or session is recorded as a deliberate exemption decision at design time (IT-06)"
    basis: "compliance-guidelines@0.1 · A4/I2"
  - area: "A2"
    sub_domain: "G1"
    trigger: "P1"
    resolution: requirement
    names: "R3"
    owner: ""
    decided_at: ""
    reason: ""
    touchpoint: "The product stores personal data — the session-state field is documented with its purpose (resuming an incomplete application) and its legal basis before it is built (DP-01)"
    basis: "compliance-guidelines@0.1 · A2/G1"
  - area: "A2"
    sub_domain: "G3"
    trigger: "P11"
    resolution: requirement
    names: "R3"
    owner: ""
    decided_at: ""
    reason: ""
    touchpoint: "Data is kept after the client relationship ends — the 30-day-then-delete rule is this field's own retention period, and deletion runs automatically at expiry (DP-07)"
    basis: "compliance-guidelines@0.1 · A2/G3"
  - area: "A3"
    sub_domain: "L2"
    trigger: "N2"
    resolution: requirement
    names: "R3"
    owner: ""
    decided_at: ""
    reason: ""
    touchpoint: "A new term, limit or obligation is introduced — the 30-day window is stated plainly at the point an applicant would first notice it, leaving the journey, not only in a terms document (LG-07)"
    basis: "compliance-guidelines@0.1 · A3/L2"
  - area: "A3"
    sub_domain: "L10"
    trigger: "N11"
    resolution: requirement
    names: "R3"
    owner: ""
    decided_at: ""
    reason: ""
    touchpoint: "The bank promises a time, a rate or an outcome — the live estimate and the 30-day window are treated as commitments the bank has to be able to stand behind (LG-11)"
    basis: "compliance-guidelines@0.1 · A3/L10"
  - area: "A1"
    sub_domain: "S1"
    trigger: "T7"
    resolution: requirement
    names: "R3"
    owner: ""
    decided_at: ""
    reason: ""
    touchpoint: "A risk, limit or exclusion is described to the client — the 30-day window and the requirement to re-verify identity are shown with the same visual weight as the resumption capability itself (TP-15)"
    basis: "compliance-guidelines@0.1 · A1/S1"
  - area: "A2"
    sub_domain: "G10"
    trigger: "P14"
    resolution: requirement
    names: "R4"
    owner: ""
    decided_at: ""
    reason: ""
    touchpoint: "A new interface exposes personal data — access control and audit logging for the resumption endpoint are specified at design time: who may call it, under what session, and what is logged (DP-29)"
    basis: "compliance-guidelines@0.1 · A2/G10"
  - area: "A4"
    sub_domain: "I9"
    trigger: "K6"
    resolution: requirement
    names: "R4"
    owner: ""
    decided_at: ""
    reason: ""
    touchpoint: "A new API or integration is exposed — the resumption endpoint's callers, its security testing, its logging and its hosting are each specified before build, on both channels (IT-16)"
    basis: "compliance-guidelines@0.1 · A4/I9"
  - area: "A4"
    sub_domain: "I9"
    trigger: "K11"
    resolution: requirement
    names: "R4"
    owner: ""
    decided_at: ""
    reason: ""
    touchpoint: "The initiative changes what is logged — session writes, resumption attempts and expiries are logged at a level that lets someone reconstruct what happened to one applicant's session afterward (IT-22)"
    basis: "compliance-guidelines@0.1 · A4/I9"
  - area: "A1"
    sub_domain: "S1"
    trigger: "T7"
    resolution: requirement
    names: "R5"
    owner: ""
    decided_at: ""
    reason: ""
    touchpoint: "Any client-facing screen, document, email, SMS or script changes — the progress display, the retention-window disclosure and the resumption screens are new client-facing wording, reviewed against the fair, clear, not-misleading standard, with any promotional framing marked as such (TP-11)"
    basis: "compliance-guidelines@0.1 · A1/S1"
  - area: "A1"
    sub_domain: "S13"
    trigger: "T13"
    resolution: requirement
    names: "R6"
    owner: ""
    decided_at: ""
    reason: ""
    touchpoint: "Any client-facing website, app or web view changes — the progress display and resumption screens, on both channels, are built and tested to the same accessibility bar as the rest of the journey (TP-32)"
    basis: "compliance-guidelines@0.1 · A1/S13"
  - area: "A1"
    sub_domain: "S13"
    trigger: "T13"
    resolution: requirement
    names: "R6"
    owner: ""
    decided_at: ""
    reason: ""
    touchpoint: "Authentication, identification or a payment step changes — the re-run identity check invoked at resumption is accessibility-tested as its own step rather than assumed covered by the original journey's check (TP-33)"
    basis: "compliance-guidelines@0.1 · A1/S13"
  - area: "A1"
    sub_domain: "S12"
    trigger: "T2"
    resolution: requirement
    names: "R7"
    owner: ""
    decided_at: ""
    reason: ""
    touchpoint: "Something about the product has to be monitored after launch — completion, resumption and drop-off after each new screen are instrumented on both channels from first release (TP-38)"
    basis: "compliance-guidelines@0.1 · A1/S12"
  - area: "A1"
    sub_domain: "S12"
    trigger: "T2"
    resolution: requirement
    names: "R7"
    owner: ""
    decided_at: ""
    reason: ""
    touchpoint: "A record has to be kept to prove what a client was told or agreed — the retention-window disclosure and the resumption invitation shown to an applicant are logged with what was shown and when (TP-39)"
    basis: "compliance-guidelines@0.1 · A1/S12"
  - area: "A4"
    sub_domain: "I5"
    trigger: "K8"
    resolution: requirement
    names: "R8"
    owner: ""
    decided_at: ""
    reason: ""
    touchpoint: "The service could fail in a way clients notice — a failed resumption or a failed live estimate is classified as an incident type before launch, so it can be triaged on the reporting clock (IT-19)"
    basis: "compliance-guidelines@0.1 · A4/I5"
  - area: "A4"
    sub_domain: "I4"
    trigger: "K8"
    resolution: requirement
    names: "R8"
    owner: ""
    decided_at: ""
    reason: ""
    touchpoint: "A new failure mode is introduced — recovery time and data-loss objectives for the new session store are stated before launch rather than assumed (IT-20)"
    basis: "compliance-guidelines@0.1 · A4/I4"
  - area: "A2"
    sub_domain: "G4"
    trigger: "P12"
    resolution: open_item
    names: ""
    owner: "not yet named — carried unresolved from A11; an ask to ČS"
    decided_at: "not yet decided"
    reason: ""
    touchpoint: "The client asks for their data, or asks for it to be deleted — no team has yet been named as the owner of registering this new store against ČS's access-and-deletion process (DP-15)"
    basis: "compliance-guidelines@0.1 · A2/G4"
unexamined_areas: []
dropped_touchpoints: []
agreement_block:
  name: ""
  date: ""
---
