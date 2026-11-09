---
run_id: 2026-09-digital-onboarding-dropoff
record_id: R-A10-01
artifact_id: A10
item_id: ""
produced_at: 2026-09-08
bounds_hit: []
trace_id: []
constraint_basis: none_stated
sources: [A9]
external_sources: []
options:
  - id: OPT1
    statement: "The full capability A9 describes, on both channels from the start — durable session state, the live estimate, and cross-device resumption gated by a full re-run of the original identity check."
    approach: "Build A9 exactly as specified — durable session state kept for up to 30 days from last activity and stated to the applicant as such, the live estimate powered by it, and cross-device resumption gated by a full re-run of the original identity check before any saved state is shown — on both the app and the web channel together, from the start."
    differs_by: "Solves O1 and O4 together, in full, across both channels, so an applicant who starts on the app and returns on the web — or the reverse — is exactly the case this option answers. It is the only option carrying the 30-day durable store and the cross-device resumption endpoint at all."
    constraints_met: []
  - id: OPT2
    statement: "Short-lived, same-device recovery — the estimate plus a same-day, same-device return, without cross-device resumption or a 30-day window."
    approach: "Build the live estimate as in OPT1, and add a narrow recovery path: if the applicant leaves and returns on the same device within the same day, the journey resumes from where they left off, using the device's own existing session rather than a new authenticated resumption endpoint. If the applicant returns on a different device, after the same day, or the session has expired, they start over exactly as they do today — there is no 30-day store and no separate identity re-check built for this pilot."
    differs_by: "Solves O1 fully and O4 partially — only the same-day, same-device case, which is a narrower slice of 'no way back into a dropped application' than A9 states. It introduces a bounded, short-lived session extension rather than a new durable applicant record, and no new authentication path: recovery rides on the device's existing session rather than a re-run identity check. Regulatory reach is lighter than OPT1's — a short-lived stored state rather than a 30-day one, no cross-device resumption endpoint, and no 30-day retention question to answer."
    constraints_met: []
---
