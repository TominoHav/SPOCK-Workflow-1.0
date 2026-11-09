---
run_id: 2026-08-account-switching
record_id: A10-r01
artifact_id: A10
item_id: ""
produced_at: 2026-08-27
bounds_hit: []
trace_id: []
sources: [A9, A7]
external_sources: []
constraint_basis: none_stated
options:
  - id: OPT-A
    statement: "Reads active payment mandates from the old account throughout the full switching window, refreshing on demand, and confirms account closure when the list reaches zero."
    approach: "The customer grants PSD2 AISP consent at switch initiation. The app retrieves standing orders and direct debits from the old account and shows them in a persistent switching view. As each mandate transfers to the new account, it leaves the list. When the list shows no active payment instructions, the app confirms the old account holds no open mandates and the customer has a basis to close it."
    differs_by: "Runs throughout the entire switching window with on-demand refresh, rather than firing at a single point in time or on a customer trigger. Tests whether a persistent, depleting view of mandate state changes how customers manage the switch."
    constraints_met: []
  - id: OPT-B
    statement: "Reads the old account once on the formal switch completion date and delivers a single report showing whether any active mandates remain."
    approach: "AISP consent is collected at switch initiation. No reading takes place during the switching window. When the bank records the switch complete, one AISP call retrieves the current list of standing orders and direct debits. The customer receives one message: either the old account holds no active payment instructions and they have a basis to close it, or here are the items still running."
    differs_by: "Makes one AISP read at the formal completion date rather than running throughout the window. Tests whether the value of the mandate check lies in a definitive end-of-process confirmation rather than in ongoing tracking."
    constraints_met: []
  - id: OPT-C
    statement: "Makes the old-account mandate read customer-initiated: AISP consent is collected at initiation, but no read runs until the customer explicitly requests it during the switching window."
    approach: "The switching section of the app carries a check control. When the customer taps it, one AISP call retrieves the current standing orders and direct debits from the old account and displays the result. The customer can request this at any point during the window and any number of times. No check runs on any schedule and no check runs automatically."
    differs_by: "The read is triggered by the customer rather than by a schedule or a system event. Tests whether customers will proactively seek mandate visibility and at which moments in the switch they reach for it."
    constraints_met: []
---
