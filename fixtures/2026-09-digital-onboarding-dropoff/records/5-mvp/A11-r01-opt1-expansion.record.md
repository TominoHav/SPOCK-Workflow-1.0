---
run_id: 2026-09-digital-onboarding-dropoff
record_id: R-A11-01
artifact_id: A11
item_id: ""
produced_at: 2026-09-08
bounds_hit: []
trace_id: []
sources: [A9, A10, A3b]
external_sources: []
option_id: OPT1
description: "The full capability the selected solution describes, built on both the app and the web channel from the start. Applicant progress during identity verification is written to durable session storage rather than held only in the current screen or device, and that stored state powers a live, updating estimate of what remains while the applicant is still in the journey. If the applicant leaves — closes the app, changes device, comes back days later — the same stored state is what lets them resume, but only after they re-run the original identity check in full on whichever channel they return through; nothing about a link or a notification carries authority to resume on its own. The stored state is kept for up to 30 days from the applicant's last activity and this window is disclosed to the applicant, not left implicit; past it, the state is deleted and a returning applicant starts over. Both channels carry the full capability from the first release — there is no channel restricted to the estimate only and no channel excluded from resumption — because the evidence this run already holds is a participant who left on one channel and returned on another, and a pilot that could not see that case would not be testing what was selected."
strategic_touchpoints:
  - touchpoint: "AI-2 — share of sales and service processes in primary digital channels that are fully straight-through, direction increase. Serves it directly: an applicant who resumes and completes is a straight-through completion in the same digital channel, rather than a duplicate application or no return at all."
    basis: "strategy-basis@0.1 · AI First / AI-2"
  - touchpoint: "TL-1 — clients affected by outages of key digital channels, direction decrease. Strains it, not serves it: a new durable store and a new resumption endpoint live on both channels is a new failure surface that did not exist before, and this pilot has to be built to keep TL-1 from moving the wrong way rather than assumed neutral."
    basis: "strategy-basis@0.1 · Technology leadership / TL-1"
compliance_touchpoints:
  - area: A1
    sub_domain: "S1"
    trigger: T7
    touchpoint: "TP-11 — the progress display, the retention-window disclosure and the resumption screens are new client-facing wording"
    resolution: requirement
    names: ["wording review against the fair, clear, not-misleading standard"]
    owner: ""
    decided_at: ""
    reason: "wording is reviewed before release, with any promotional framing marked as such"
    basis: "compliance-guidelines@0.1 · A1/S1"
  - area: A1
    sub_domain: "S1"
    trigger: T7
    touchpoint: "TP-15 — the 30-day retention window and the requirement to re-verify identity to resume are limits stated to the applicant"
    resolution: requirement
    names: ["equal visual weight for stated limits"]
    owner: ""
    decided_at: ""
    reason: "both are shown with the same visual weight as the resumption capability itself, not in fine print below it"
    basis: "compliance-guidelines@0.1 · A1/S1"
  - area: A1
    sub_domain: "S13"
    trigger: T12
    touchpoint: "TP-32 — the progress display and resumption screens are new views on both the app and the web channel"
    resolution: requirement
    names: ["accessibility conformance on both channels"]
    owner: ""
    decided_at: ""
    reason: "both are built and tested to the same accessibility bar as the rest of the journey before release"
    basis: "compliance-guidelines@0.1 · A1/S13"
  - area: A1
    sub_domain: "S13"
    trigger: T13
    touchpoint: "TP-33 — the re-run identity check invoked at resumption is a changed identification step"
    resolution: requirement
    names: ["accessibility testing of the re-verification step"]
    owner: ""
    decided_at: ""
    reason: "it is accessibility-tested as its own step rather than assumed covered by the original journey's check"
    basis: "compliance-guidelines@0.1 · A1/S13"
  - area: A1
    sub_domain: "S12"
    trigger: T2
    touchpoint: "TP-38 — completion, resumption and drop-off after each new screen have to be monitored"
    resolution: requirement
    names: ["post-launch monitoring instrumentation"]
    owner: ""
    decided_at: ""
    reason: "all three are instrumented on both channels from first release, so the data the pilot is read against exists before launch"
    basis: "compliance-guidelines@0.1 · A1/S12"
  - area: A1
    sub_domain: "S12"
    trigger: T2
    touchpoint: "TP-39 — the retention-window disclosure and the resumption invitation shown to an applicant need a record"
    resolution: requirement
    names: ["a record of what was disclosed and when"]
    owner: ""
    decided_at: ""
    reason: "both are logged with what was shown and when, so a later dispute is answerable"
    basis: "compliance-guidelines@0.1 · A1/S12"
  - area: A2
    sub_domain: "G1"
    trigger: P1
    touchpoint: "DP-01 — the session-state field is a new stored field tied to an identifiable applicant"
    resolution: requirement
    names: ["a documented purpose and legal basis for the session-state field"]
    owner: ""
    decided_at: ""
    reason: "it is documented with its purpose (resuming an incomplete application) and its legal basis before it is built"
    basis: "area-gdpr@0.1 (ours, no ČS card) · A2/G1"
  - area: A2
    sub_domain: "G3"
    trigger: P11
    touchpoint: "DP-07 — the session-state field is kept beyond the applicant's immediate use of it"
    resolution: requirement
    names: ["the 30-day-then-delete retention rule"]
    owner: ""
    decided_at: ""
    reason: "the 30-day-then-delete rule already fixed in the selected solution is this field's own retention period, and deletion runs automatically at expiry"
    basis: "area-gdpr@0.1 (ours, no ČS card) · A2/G3"
  - area: A2
    sub_domain: "G4"
    trigger: P12
    touchpoint: "DP-15 — the session-state store has to be reachable by an access-or-deletion request"
    resolution: open_item
    names: []
    owner: "ČS's data-protection function — no individual named yet"
    decided_at: "before this pilot's launch, once ČS names the process owner"
    reason: "no team has yet been named as the owner of registering this new store against ČS's access-and-deletion process — an ask to ČS, not something this run can assign"
    basis: "area-gdpr@0.1 (ours, no ČS card) · A2/G4"
  - area: A2
    sub_domain: "G10"
    trigger: P14
    touchpoint: "DP-29 — the resumption endpoint exposes an applicant's partially completed data"
    resolution: requirement
    names: ["access control and audit logging for the resumption endpoint"]
    owner: ""
    decided_at: ""
    reason: "access control and audit logging for the endpoint are specified at design time: who may call it, under what session, and what is logged"
    basis: "area-gdpr@0.1 (ours, no ČS card) · A2/G10"
  - area: A3
    sub_domain: "L5"
    trigger: N5
    touchpoint: "LG-05 — resumption re-runs remote identification"
    resolution: requirement
    names: ["identification, authentication and signature kept as separate steps"]
    owner: ""
    decided_at: ""
    reason: "identification (the re-run check), authentication and any signature step stay three separate steps, exactly as the original application does"
    basis: "area-legal@0.1 (ours, no ČS card) · A3/L5"
  - area: A3
    sub_domain: "L2"
    trigger: N2
    touchpoint: "LG-07 — the 30-day retention window is a new stated limit"
    resolution: requirement
    names: ["the retention window stated at the point the applicant would notice it"]
    owner: ""
    decided_at: ""
    reason: "it is stated plainly at the point an applicant would first notice it — leaving the journey — not only in a terms document"
    basis: "area-legal@0.1 (ours, no ČS card) · A3/L2"
  - area: A3
    sub_domain: "L10"
    trigger: N11
    touchpoint: "LG-11 — the live estimate and the 30-day window are stated commitments"
    resolution: requirement
    names: ["the live estimate and retention window treated as contractual terms"]
    owner: ""
    decided_at: ""
    reason: "both are treated as contractual terms the bank is held to, reviewed as such rather than as UI copy"
    basis: "area-legal@0.1 (ours, no ČS card) · A3/L10"
  - area: A4
    sub_domain: "I2"
    trigger: K4
    touchpoint: "IT-01 — resumption is a changed form of returning to the journey"
    resolution: requirement
    names: ["resumption held to the same authentication standard as login"]
    owner: ""
    decided_at: ""
    reason: "it is specified to the same authentication strength, session-ending behaviour and recovery standard as login elsewhere in the journey"
    basis: "area-ict-security@0.1 (ours, no ČS card) · A4/I2"
  - area: A4
    sub_domain: "I2"
    trigger: K5
    touchpoint: "IT-04 — resumption after full abandonment is, by design, exactly this recovery case"
    resolution: requirement
    names: ["recovery-path design applied to resumption"]
    owner: ""
    decided_at: ""
    reason: "it is designed to the same standard as any other recovery path, not a lighter one"
    basis: "area-ict-security@0.1 (ours, no ČS card) · A4/I2"
  - area: A4
    sub_domain: "I2"
    trigger: K4
    touchpoint: "IT-06 — the durable session remembers an applicant's progress across device and time"
    resolution: requirement
    names: ["remembered-session recorded as a deliberate exemption decision"]
    owner: ""
    decided_at: ""
    reason: "this is recorded as a deliberate exemption decision at design time, not treated as a side effect of the feature"
    basis: "area-ict-security@0.1 (ours, no ČS card) · A4/I2"
  - area: A4
    sub_domain: "I2"
    trigger: K6
    touchpoint: "IT-16 — the resumption endpoint is a new API the journey did not have before"
    resolution: requirement
    names: ["callers, security testing, logging and hosting specified for the new endpoint"]
    owner: ""
    decided_at: ""
    reason: "who may call it, how it gets security tested, what it logs and where it runs are each specified before build, on both channels"
    basis: "area-ict-security@0.1 (ours, no ČS card) · A4/I2"
  - area: A4
    sub_domain: "I4"
    trigger: K8
    touchpoint: "IT-19 — a failed resumption or a failed live estimate is a client-visible failure"
    resolution: requirement
    names: ["incident classification for resumption and estimate failures"]
    owner: ""
    decided_at: ""
    reason: "each is classified as an incident type before launch, so it can be triaged on the reporting clock rather than diagnosed from scratch"
    basis: "area-ict-security@0.1 (ours, no ČS card) · A4/I4"
  - area: A4
    sub_domain: "I5"
    trigger: K8
    touchpoint: "IT-20 — the durable store and the resumption endpoint are new ways the journey can fail"
    resolution: requirement
    names: ["stated recovery-time and data-loss objectives for the new store"]
    owner: ""
    decided_at: ""
    reason: "recovery time and data-loss objectives for the new store are stated before launch rather than assumed"
    basis: "area-ict-security@0.1 (ours, no ČS card) · A4/I5"
  - area: A4
    sub_domain: "I9"
    trigger: K11
    touchpoint: "IT-22 — session writes, resumption attempts and expiries are new information a log has to carry"
    resolution: requirement
    names: ["logging sufficient to reconstruct a session's history"]
    owner: ""
    decided_at: ""
    reason: "logging is specified at a level that lets someone reconstruct what happened to one applicant's session after the fact"
    basis: "area-ict-security@0.1 (ours, no ČS card) · A4/I9"
unexamined_areas:
  - "third_parties — which vendor, SaaS tool or partner processes client data for this pilot is not yet chosen"
  - "hosting_and_data_location — where the new session store and resumption endpoint are hosted, and whether outside the EEA, is not yet decided"
  - "security_measures — the security controls protecting the new store and endpoint are not yet specified"
  - "release_and_environment — deployment approach, testing scope and whether a new environment is created are not yet decided"
  - "components_and_libraries — whether open-source or third-party components are used to build this is not yet known"
  - "critical_or_important_function — whether the new dependency supports something clients rely on in the DORA sense is not yet assessed"
  - "recovery_expectations — how hard it would be to leave a chosen provider is not yet assessed"
  - "registered_under_cyber_regime — whether this service is registered under the cyber regime is not yet determined"
analyst_input: "The PRD needs acceptance criteria for: the live estimate's accuracy and update cadence during identity verification; the exact resumption gate (the applicant must complete the original identity check in full, on whichever channel they return through, before any saved state is shown, on both app and web); the 30-day retention and automatic-deletion behaviour, including what a returning applicant sees once it has expired; and the specific completion and resumption measures this pilot reads against AI-2. Product goal and product-level metric are stated in this document; horizon, owner and kill criterion are not obvious from this expansion and stage 6 will need to source them rather than invent them. DP-15's registration and the five escalation routings above have no named owner yet and are open questions the PRD inherits rather than resolves."
---
