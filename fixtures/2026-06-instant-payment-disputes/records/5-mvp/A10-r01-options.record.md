---
run_id: 2026-06-instant-payment-disputes
record_id: R-A10-01
artifact_id: A10
item_id: ""
produced_at: 2026-08-22
created_at: 2026-08-22
produced_by:
  agent: product-owner
  skill: mvp-option-design
bounds_hit: []
sources:
  - A9
  - A7
external_sources: []
trace_id: []
constraint_basis: none_stated
options:
  - id: OPT-A
    statement: "Attach automated ISO 20022 recall despatch to claim registration through existing staff channels, and deliver timestamped confirmation to the attending staff member in session only."
    approach: "Staff register a recall claim through existing contact-centre or branch systems. Registration triggers the automated outbound recall message to the receiving bank. The attending agent receives a timestamped confirmation before the call or visit ends. No client-facing system is changed."
    differs_by: "Confirmation reaches the staff member only. The client is informed verbally by the agent. The pilot touches back-office systems and staff tooling, not client-facing systems."
    constraints_met: []
  - id: OPT-B
    statement: "Attach automated ISO 20022 recall despatch to claim registration through existing staff channels, and deliver timestamped confirmation simultaneously to the attending staff member and directly to the client through an outbound digital channel."
    approach: "Staff register a recall claim through existing systems. Registration triggers the automated recall message to the receiving bank. Both the attending agent and the client receive a timestamped confirmation in the same session. The client holds their own record without depending on staff relay."
    differs_by: "Confirmation reaches both staff and client simultaneously through separate channels. The client holds an independent digital record. The pilot builds an outbound client notification alongside the despatch automation."
    constraints_met: []
  - id: OPT-C
    statement: "Build a digital self-service registration surface in online banking that allows the client to initiate a recall without calling or visiting a branch, with automated ISO 20022 recall despatch firing at the moment of registration."
    approach: "The client registers the claim through a digital surface in online banking. Registration triggers the automated recall message to the receiving bank. Confirmation returns in the same digital surface. No staff member is in the registration path."
    differs_by: "Registration is a client-initiated digital action with no staff involvement. The pilot tests whether clients can reliably self-register a recall claim and whether the out-of-hours access constraint can be addressed without a staffed channel."
    constraints_met: []
---
