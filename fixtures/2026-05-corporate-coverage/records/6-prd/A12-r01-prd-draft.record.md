---
run_id: 2026-05-corporate-coverage
record_id: R-A12-01
artifact_id: A12
item_id: ""
produced_at: 2026-08-20
produced_by:
  agent: business-analyst
  skill: prd
bounds_hit: []
constraint_basis: "indicative — no Banking Constraints body exists for this run, so no requirement below is weighed for technical complexity, operational change or cost."
structure_basis: "prd-template@0.4 — the eight sections are the template's and are closed by it."
sections:
  - id: overview
    status: present
  - id: problem
    status: present
  - id: users
    status: present
  - id: success_measures
    status: present
  - id: requirements
    status: present
  - id: non_functional
    status: present
  - id: out_of_scope
    status: present
  - id: dependencies
    status: present
compliance_touchpoints:
  - "GDPR purpose limitation on every source read (indicative; A5 trend R2)"
  - "Works council agreement where the answer identifies the nearest employee (indicative; A5 trend R3)"
alignment_validation: "The product goal this PRD serves is that a banker assembling what the bank knows does it by asking once rather than by searching several systems and asking colleagues. Its measure is the time from a who-do-we-know question to an actionable answer and the share answered without interrupting a colleague, and R10 and R12 are what make both reportable. The key result is SHD-4, the average time a banker spends daily on administration, and the chain has one step in it. LVL-2 is not claimed: ID-1 makes an approach possible and does not cause one, so a wallet movement inside a pilot window would not be attributable, and no requirement here is written against it."
requirements:
  - id: R1
    traces_to: [A11, A4]
  - id: R2
    traces_to: [A11, A4]
  - id: R3
    traces_to: [A11, A4]
  - id: R4
    traces_to: [A11, A4]
  - id: R5
    traces_to: [A11, A4]
  - id: R6
    traces_to: [A11, A4]
  - id: R7
    traces_to: [A11, A4]
  - id: R8
    traces_to: [A11, A4]
  - id: R9
    traces_to: [A11, A4]
  - id: R10
    traces_to: [A11, A4]
  - id: R11
    traces_to: [A11, A4]
  - id: R12
    traces_to: [A11, A4]
  - id: R13
    traces_to: [A11, A4]
  - id: R14
    traces_to: [A11, A4]
---

# Record R-A12-01 — A12

One prd-authoring invocation. Not written for a reader; the document assembled from it is 6-prd/1-prd-draft.md.
