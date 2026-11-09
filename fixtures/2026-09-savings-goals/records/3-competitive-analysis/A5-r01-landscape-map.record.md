---
run_id: 2026-09-savings-goals
record_id: R-A5-01
artifact_id: A5
item_id: ""
produced_at: 2026-08-28
bounds_hit: []
trace_id: []
sources: [A1, A4, A3b]
external_sources:
  - S-csas-obalky-faq
  - S-csob-obalky
  - S-kb-sporici-ucet
  - S-mesec-airbank-2026
  - S-e15-airbank-drobne
  - S-penize-airbank-drobne
  - S-moneyspot-moneta
  - S-financera-sporici
  - S-finder-pots
  - S-easyearns-compare
  - S-abel-roundups
  - S-frontiers-saving
  - S-partnersnews-pb
topic: "Goal-based saving and automated set-aside for retail clients, Czech retail banking"
scope_field: "Retail banking. The search began with Czech banks because the segment is Czech, and widened to European neobanks operating in CZ and to UK banks that introduced these features first and are the reference implementation."
trends:
  - id: TB1
    class: business
    name: "Named savings envelopes on a savings account are standard equipment in Czech retail banking, not a differentiator"
    represents: [csas.cz, csob.cz, kb.cz, moneta.cz, rb.cz, mbank.cz]
  - id: TB2
    class: business
    name: "The set-aside sits on a savings account everywhere in the Czech market, never inside the current account"
    represents: [csas.cz, csob.cz, kb.cz, airbank.cz]
  - id: TB3
    class: business
    name: "Automatic round-ups have arrived in the Czech market: two banks have them, and the first has passed 100 million crowns swept"
    represents: [rb.cz, airbank.cz, monzo.com, starlingbank.com]
  - id: TB4
    class: business
    name: "Envelope counts are capped and the cap differs by bank, from eight to unlimited"
    represents: [csas.cz, kb.cz, mbank.cz, partnersbanka.cz]
  - id: TT1
    class: technology
    name: "Paying directly out of an envelope is offered by one bank and is a different mechanism from displaying a balance"
    represents: [csob.cz]
  - id: TT2
    class: technology
    name: "Round-ups are computed at card authorisation and swept to a savings destination, which needs a transfer path the display does not"
    represents: [rb.cz, airbank.cz, monzo.com, starlingbank.com]
  - id: TT3
    class: technology
    name: "The envelope is a display over one deposit balance rather than separate accounts, so the money earns interest together"
    represents: [moneta.cz, csas.cz, kb.cz]
  - id: TR1
    class: regulatory
    name: "Accessibility of digital interfaces for consumer banking services"
    instrument: "Directive (EU) 2019/882, Act No. 424/2023 Coll."
    effective: "2025-06-28"
    represents: [csas.cz, airbank.cz]
  - id: TR2
    class: regulatory
    name: "Deposit-taking and the terms attaching to a savings account as a product"
    instrument: "Directive 2014/49/EU, Act No. 21/1992 Coll."
    effective: "2016-06-04"
    represents: [csas.cz, kb.cz]
  - id: TR3
    class: regulatory
    name: "Lawful basis and purpose limitation where existing account data is used to compute something new for the client"
    instrument: "Regulation (EU) 2016/679, Art. 6"
    effective: "2018-05-25"
    represents: [csas.cz, revolut.com]
participants:
  - identity_key: csas.cz
    name: "Česká spořitelna"
    type: direct
    first_seen: 2026-08-28
    represents: [TB1, TB2, TB4, TR1, TT3, TR2, TR3]
    standing: leader
    deep_dive: true
    reason: "Our own starting position, and it already has the feature this run was briefed to consider. Up to nine envelopes on the savings account, progress visible in George"
  - identity_key: airbank.cz
    name: "Air Bank"
    type: direct
    first_seen: 2026-08-28
    represents: [TB2, TB3, TT2]
    standing: innovator
    deep_dive: true
    reason: "The only Czech bank with automatic round-ups, launched October 2026, sweeping into an envelope on the savings account"
  - identity_key: csob.cz
    name: "ČSOB"
    type: direct
    first_seen: 2026-08-28
    represents: [TB1, TB2, TT1]
    standing: leader
    deep_dive: true
    reason: "The only Czech bank found that lets a client pay directly out of a full envelope, which is a mechanism beyond display"
  - identity_key: kb.cz
    name: "Komerční banka"
    type: direct
    first_seen: 2026-08-28
    represents: [TB1, TB2, TB4, TT3, TR2]
    standing: leader
    deep_dive: true
    reason: "Ten envelopes with names and target amounts, and drag-and-drop between envelopes in the app"
  - identity_key: moneta.cz
    name: "Moneta Money Bank"
    type: direct
    first_seen: 2026-08-28
    represents: [TB1, TB2, TT3]
    standing: leader
    deep_dive: true
    reason: "Envelopes on the savings account with the money physically in one place, described in a secondary source rather than the bank's own page"
  - identity_key: mbank.cz
    name: "mBank"
    type: direct
    first_seen: 2026-08-28
    represents: [TB1, TB4]
    standing: leader
    deep_dive: true
    reason: "Up to eight goals, and the only one found where the envelope cap is tied to an interest ceiling"
  - identity_key: rb.cz
    name: "Raiffeisenbank"
    type: direct
    first_seen: 2026-08-28
    represents: [TB1, TB2, TB3, TB4, TT2]
    standing: innovator
    deep_dive: true
    reason: "The most complete Czech implementation found: ten goals with a name, a target amount and a target date, plus round-ups, and published usage figures for both"
  - identity_key: monzo.com
    name: "Monzo"
    type: adjacent
    first_seen: 2026-08-28
    represents: [TB3, TT2]
    standing: innovator
    deep_dive: true
    reason: "Pots plus round-ups, the reference implementation the Czech market is following"
  - identity_key: starlingbank.com
    name: "Starling Bank"
    type: adjacent
    first_seen: 2026-08-28
    represents: [TB3, TT2]
    standing: innovator
    deep_dive: true
    reason: "Spaces with goals-based saving and round-ups to a chosen Space"
  - identity_key: revolut.com
    name: "Revolut"
    type: direct
    first_seen: 2026-08-28
    represents: [TB1, TB3, TR3]
    standing: innovator
    deep_dive: true
    reason: "Operates in CZ. Pockets and Vaults, including group vaults for shared goals, which nothing in the Czech market has"
  - identity_key: partnersbanka.cz
    name: "Partners Banka"
    type: direct
    first_seen: 2026-08-28
    represents: [TB4]
    standing: leader
    deep_dive: false
    reason: "Unlimited savings accounts used as envelopes, which is the same outcome by a different mechanism. Reported in a source published by the bank's own group"
unprofiled: [partnersbanka.cz]
unrepresented_trends: []
---

# Record R-A5-01 — A5

One production. The document assembled from it is 3-competitive-analysis/1-landscape-map.md.
