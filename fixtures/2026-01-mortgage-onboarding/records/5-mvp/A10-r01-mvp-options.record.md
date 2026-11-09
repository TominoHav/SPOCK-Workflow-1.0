---
run_id: 2026-01-mortgage-onboarding
record_id: R-A10-01
artifact_id: A10
item_id: ""
produced_by:
  agent: product-owner
  skill: mvp-option-design
produced_at: 2026-08-10
constraint_basis: none_stated
options:
  - id: O1
    statement: "In-app rescue inside the digital flow"
    approach: "Detect a stalled application inside the digital flow and offer, in the app, a way to reach a mortgage advisor by chat or a scheduled call, with the application state preserved so nothing is re-entered"
    differs_by: "The rescue lives entirely inside the digital channel. No outbound contact from the bank; the buyer stays in the app and chooses whether to pull in help"
    constraints_met: []
  - id: O2
    statement: "Outbound advisor callback"
    approach: "A stalled application raises a work item for a mortgage advisor, who calls the buyer back within a set window and resumes from exactly where they stopped"
    differs_by: "The rescue is a human outbound contact from the bank rather than an in-app prompt, moving the buyer from self-serve to assisted instead of waiting for them to ask"
    constraints_met: []
  - id: O3
    statement: "Scheduled advisor session"
    approach: "A stalled buyer is offered a booked video or branch appointment where an advisor co-completes the application with them, the started application carried into the session"
    differs_by: "The rescue resolves the stall through a scheduled session with a person rather than remote self-service, for the buyer who wants to be walked through it"
    constraints_met: []
---

# Record R-A10-01 — A10

One production. Not written for a reader; the document assembled from it is 5-mvp/1-mvp-options.md.
