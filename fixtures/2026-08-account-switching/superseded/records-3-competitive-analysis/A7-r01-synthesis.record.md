---
artifact_id: A7
record_id: A7-r01
version: r01
run_id: "2026-08-account-switching"
produced_at: "2026-08-26T13:15:00Z"
produced_by: synthesis@0.1
trace_id: "CA-a-2026-08-26-A7"
egress_basis: pilot-test
could_not_verify:
  - rule: "recommends no action; A7 carries the run id and is never written to S1 (run-scoped contract + empty capability list, not C24)"
    needs: judge
    reach: artifact

standards:
  - key: STD-1
    title: "Standing orders and direct debit mandates transfer automatically within every bank's switching service"
    tier: universal
    source_count: "9 of 10"
    traces_to: [natwest.com, monzo.com, starlingbank.com, revolut.com, lloydsbank.com, kb.cz, csob.cz, moneta.cz, airbank.cz]
    absences: ["substitute:self-managed-switch"]
    addresses: [O1]

  - key: STD-2
    title: "Incoming payments to the closed account are redirected to the new account for a defined period"
    tier: common
    source_count: "6 of 10"
    traces_to: [natwest.com, monzo.com, starlingbank.com, revolut.com, lloydsbank.com, kb.cz]
    absences: [csob.cz, moneta.cz, airbank.cz, "substitute:self-managed-switch"]
    addresses: [O1]

  - key: STD-3
    title: "The old account balance transfers to the new account as part of the switch"
    tier: common
    source_count: "6 of 10"
    traces_to: [natwest.com, monzo.com, starlingbank.com, revolut.com, lloydsbank.com, kb.cz]
    absences: [csob.cz, moneta.cz, airbank.cz, "substitute:self-managed-switch"]
    addresses: []

patterns:
  - key: PAT-1
    title: "No bank transfers card-on-file subscription credentials; every participant leaves this for the customer to handle manually"
    tier: universal
    source_count: "10 of 10"
    traces_to: [natwest.com, monzo.com, starlingbank.com, revolut.com, lloydsbank.com, kb.cz, csob.cz, moneta.cz, airbank.cz, "substitute:self-managed-switch"]
    addresses: [O1, O7]

  - key: PAT-2
    title: "No participant provides any view of what is still pointing at the old account after the switch completes"
    tier: universal
    source_count: "9 of 10"
    traces_to: [natwest.com, monzo.com, starlingbank.com, revolut.com, lloydsbank.com, kb.cz, csob.cz, moneta.cz, airbank.cz]
    addresses: [O1, O3]

  - key: PAT-3
    title: "No switching service notifies the customer's employer; salary redirection is always the customer's manual responsibility"
    tier: universal
    source_count: "9 of 10"
    traces_to: [natwest.com, monzo.com, starlingbank.com, revolut.com, lloydsbank.com, kb.cz, csob.cz, moneta.cz, airbank.cz]
    addresses: [O2]

  - key: PAT-4
    title: "Czech banks publish no day-by-day switching timeline; UK CASS participants either publish one or name 7 working days"
    tier: emerging
    source_count: "5 of 10"
    traces_to: [csob.cz, kb.cz, moneta.cz, airbank.cz, "substitute:self-managed-switch"]
    addresses: [O3, O4]

  - key: PAT-5
    title: "UK neobanks build salary-moment features (early release, automatic distribution) specifically for the post-switch activation"
    tier: emerging
    source_count: "2 of 10"
    traces_to: [monzo.com, revolut.com]
    addresses: [O2]

trends:
  - key: TR-1
    title: "Cash switch incentives signal net outflow pressure at UK incumbents and have not reversed it"
    tier: emerging
    source_count: "2 of 10"
    traces_to: [natwest.com, lloydsbank.com]
    addresses: []

  - key: TR-2
    title: "Salary feature products are converging across UK neobanks as the primary post-switch differentiation model"
    tier: emerging
    source_count: "2 of 10"
    traces_to: [monzo.com, revolut.com]
    addresses: [O2]

  - key: TR-3
    title: "Documentation transparency is standard practice in the UK switching market and absent in Czech; the gap maps to the opportunities this run is addressing"
    tier: emerging
    source_count: "5 of 10"
    traces_to: [natwest.com, csob.cz, kb.cz, moneta.cz, airbank.cz]
    addresses: [O3, O4]
---
