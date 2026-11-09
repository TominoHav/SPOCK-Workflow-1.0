---
run_id: 2026-08-account-switching
record_id: A8-r01
artifact_id: A8
item_id: ""
produced_at: 2026-08-27
bounds_hit: []
trace_id: []
sources: [A1, A4, A7]
external_sources: []
ideas:
  - id: I1
    statement: "Read the customer's old-account payment data via open banking APIs and show them a live list of what is still pointing there, so they can track what has and has not moved and confirm the old account is empty before closing it."
    solves:
      - O1
      - O6
    supported_by:
      - TR-T3
      - P6
      - ST2
      - P4
    compliance_touchpoints:
      - "AISP authorisation and customer consent for reading a competitor bank's account mandate data under PSD2 - indicative; Compliance Guidelines body absent from this run and Banking Constraints body absent from this run"
  - id: I2
    statement: "Show the status of the switching request inside the app during the PAD window, and record the switch as complete only when salary arrives and recurring debits are confirmed transferred rather than when the form is processed."
    solves:
      - O3
      - O4
    supported_by:
      - ST1
      - P3
      - P7
      - TR-3
    compliance_touchpoints:
      - "PAD Article 15 completion reporting obligations - whether the bank's PAD completion definition is regulatory or operational affects whether redefining the product-level completion event is within product discretion - indicative; Compliance Guidelines body absent from this run"
  - id: I3
    statement: "Calculate when the customer's first salary will land based on their payroll cycle, tell them before they sign, and treat salary arrival as the event that confirms the switch is done."
    solves:
      - O2
      - O4
    supported_by:
      - ST5
      - P1
      - TR-B3
      - ST3
    compliance_touchpoints:
      - "GDPR data minimisation and purpose limitation for using salary transaction patterns to build a payroll timing model per customer - likely within standard current-account product scope but indicative; Compliance Guidelines body absent from this run"
  - id: I4
    statement: "Walk the customer through a payment category audit before the switch starts, naming which payments transfer automatically and which they must update themselves, so nothing is left running at the old account by surprise after it closes."
    solves:
      - O1
      - O3
    supported_by:
      - ST6
      - ST4
      - ST2
      - P3
    compliance_touchpoints:
      - "Consumer disclosure accuracy requirements under Czech payment services regulations - descriptions of PAD Article 10 exclusions in customer-facing materials must match the regulatory scope - indicative; Compliance Guidelines body absent from this run"
  - id: I5
    statement: "Detect the customer's first salary in the new account, run an open banking check on the old account at that moment, and give the customer a single confirmation that the salary has landed and nothing is still pointing at the old bank."
    solves:
      - O2
      - O6
    supported_by:
      - ST5
      - TR-B3
      - P4
      - ST2
    compliance_touchpoints:
      - "AISP authorisation for the old-account confirmation step raises the same PSD2 access question as I1 - indicative; Compliance Guidelines body absent from this run and Banking Constraints body absent from this run"
unproduced: []
evidence_basis:
---
