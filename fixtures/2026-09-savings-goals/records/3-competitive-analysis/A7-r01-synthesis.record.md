---
run_id: 2026-09-savings-goals
record_id: R-A7-01
artifact_id: A7
item_id: ""
produced_at: 2026-08-28
bounds_hit: []
trace_id: []
sources: [A6, A4, A3b]
external_sources: []
standards:
  - key: ST1
    statement: "The bank lets a client divide one savings balance into named parts"
    source_count: "10 of 10"
    tier: universal
    traces_to: [csas.cz, airbank.cz, csob.cz, kb.cz, moneta.cz, mbank.cz, rb.cz, monzo.com, starlingbank.com, revolut.com]
    addresses: [O1, O3]
  - key: ST2
    statement: "The division is managed in the mobile app, not only in internet banking"
    source_count: "10 of 10"
    tier: universal
    traces_to: [csas.cz, airbank.cz, csob.cz, kb.cz, moneta.cz, mbank.cz, rb.cz, monzo.com, starlingbank.com, revolut.com]
    addresses: [O1, O2]
  - key: ST3
    statement: "Dividing the money does not change what it earns; one balance keeps earning together"
    source_count: "6 of 10"
    tier: common
    traces_to: [csas.cz, csob.cz, kb.cz, moneta.cz, rb.cz, mbank.cz]
    addresses: [O2]
  - key: ST4
    statement: "The client sets a target amount on each part"
    source_count: "6 of 10"
    tier: common
    traces_to: [csob.cz, kb.cz, rb.cz, monzo.com, starlingbank.com, revolut.com]
    addresses: [O1, O4]
  - key: ST5
    statement: "Money is swept into savings automatically, without the client deciding each time"
    source_count: "4 of 10"
    tier: emerging
    traces_to: [rb.cz, airbank.cz, monzo.com, starlingbank.com]
    addresses: [O1]
  - key: ST6
    statement: "The client can spend from a named part without unwinding it first"
    source_count: "3 of 10"
    tier: emerging
    traces_to: [csob.cz, monzo.com, starlingbank.com]
    addresses: [O3]
patterns:
  - key: P1
    statement: "The set-aside sits on a savings account in every Czech implementation and inside the everyday account at every UK one"
    traces_to: [csas.cz, csob.cz, kb.cz, rb.cz, monzo.com, starlingbank.com]
    addresses: [O2, O3]
  - key: P2
    statement: "Named parts are equipment rather than a differentiator: every participant found has them, and what separates them is what happens around them"
    traces_to: [csas.cz, csob.cz, kb.cz, moneta.cz, mbank.cz, rb.cz]
    addresses: [O2]
  - key: P3
    statement: "Where automatic sweeping exists, the two Czech implementations differ in whether the client picks the destination"
    traces_to: [rb.cz, airbank.cz, starlingbank.com]
    addresses: [O1]
  - key: P4
    statement: "The banks that publish usage figures for these features are the ones that have automatic sweeping"
    traces_to: [rb.cz, mbank.cz]
    addresses: [O4]
trends:
  - key: TR1
    statement: "Round-ups arrived in the Czech market in the last two years and are still held by two banks out of seven profiled"
    traces_to: [rb.cz, airbank.cz]
    addresses: [O1]
  - key: TR2
    statement: "Published rates on comparison sites run ahead of what the banks' own pages say, by a full percentage point in the one case checked against a primary source"
    traces_to: [monzo.com]
    addresses: [O4]
absences:
  - problem: O3
    statement: "Nothing found addresses seeing what is already committed inside one balance. Every implementation is about money moved aside, and none about money already spoken for. The market does not answer this opportunity."
  - problem: O5
    statement: "No participant publishes whether a client who saves automatically wants progress shown or available. Two publish take-up figures and none publishes anything about how the saving is watched. The market does not answer this opportunity."
---

# Record R-A7-01 — A7

One production. The document assembled from it is 3-competitive-analysis/3-competitive-synthesis.md.
