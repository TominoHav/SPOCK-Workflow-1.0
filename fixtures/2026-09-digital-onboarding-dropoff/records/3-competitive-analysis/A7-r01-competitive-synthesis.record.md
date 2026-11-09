---
run_id: 2026-09-digital-onboarding-dropoff
record_id: R-A7-01
artifact_id: A7
item_id: ""
produced_at: 2026-09-08
bounds_hit: []
sources: []
external_sources: []
run_id: 2026-09-digital-onboarding-dropoff
standards:
  - key: mobile-app-primary-channel
    statement: "A mobile app is the primary channel for opening and managing the account."
    traces_to: [kb.cz, airbank.cz, fio.cz, rb.cz, mbank.cz, n26.com, revolut.com, bunq.com]
    addresses: []
    tier: universal
    source_count: "8 of 9"
  - key: fee-free-base-account
    statement: "A fee-free base current account with no ongoing maintenance charge is offered."
    traces_to: [airbank.cz, fio.cz, rb.cz, mbank.cz, n26.com, revolut.com, bunq.com]
    addresses: []
    tier: common
    source_count: "7 of 9"
  - key: in-app-investing
    statement: "In-app investing (stocks, ETFs, funds, or a robo-advisory) is reachable from the same account."
    traces_to: [kb.cz, airbank.cz, fio.cz, rb.cz, n26.com, revolut.com]
    addresses: []
    tier: common
    source_count: "6 of 9"
  - key: bankid-identity-verification
    statement: "Bank-authenticated shared identity (BankID), as an issuer or as a relying party, is used for identity verification."
    traces_to: [kb.cz, airbank.cz, fio.cz, rb.cz, mbank.cz]
    addresses: [O1, O3]
    tier: common
    source_count: "5 of 9"
  - key: no-differentiation-at-opening-step
    statement: "No participant's own stated USPs differentiate on the identity-verification or account-opening step itself; every stated claim concerns what happens after the account is open."
    traces_to: [kb.cz, airbank.cz, fio.cz, rb.cz, mbank.cz, n26.com, revolut.com, bunq.com, "substitute:branch-contact-centre"]
    addresses: [O1, O2, O3, O4]
    tier: universal
    source_count: "9 of 9"
  - key: life-stage-account-variants
    statement: "Life-stage account variants (children, teens, joint) are offered as stages of one relationship rather than as separate products."
    traces_to: [kb.cz, mbank.cz, n26.com]
    addresses: []
    tier: emerging
    source_count: "3 of 9"
  - key: tiered-paid-plans
    statement: "A tiered, paid plan ladder is layered on a free base tier."
    traces_to: [n26.com, revolut.com, bunq.com]
    addresses: []
    tier: emerging
    source_count: "3 of 9"
patterns:
  - key: proprietary-auth-key-branding
    statement: "Two participants (Komerční banka's KB Klíč, Raiffeisenbank's RB Klíč) market a named, proprietary authentication key rather than describing login as a generic feature."
    traces_to: [kb.cz, rb.cz]
    addresses: []
  - key: named-ai-assistant
    statement: "Two participants (Air Bank's Aneta, Revolut's AIR) offer a branded, named in-app assistant rather than an unbranded help feature."
    traces_to: [airbank.cz, revolut.com]
    addresses: []
  - key: budgeting-tool-two-neobanks
    statement: "Two of the three ring-3 neobanks (Revolut's salary-switch and budgeting tools, bunq's Money Pockets) build automated budgeting into the core app."
    traces_to: [revolut.com, bunq.com]
    addresses: []
  - key: lending-bundled-four-of-nine
    statement: "Four participants (Komerční banka, Air Bank, Fio banka, Raiffeisenbank CZ) bundle consumer lending or mortgage origination into the same digital channel as the current account; the count does not cleanly fit a standard's tier and is recorded here instead."
    traces_to: [kb.cz, airbank.cz, fio.cz, rb.cz]
    addresses: []
  - key: friction-after-opening
    statement: "Where independent review sources describe friction, it clusters after account opening -- support access, account freezes, forced app migrations, branch experience -- rather than at the opening step itself."
    traces_to: [kb.cz, airbank.cz, fio.cz, rb.cz, n26.com, revolut.com, bunq.com]
    addresses: [O4]
  - key: business-segment-crossover
    statement: "Three participants (Fio banka, Raiffeisenbank CZ, bunq) extend the same retail app to serve business or self-employed clients; the count does not cleanly fit a standard's tier."
    traces_to: [fio.cz, rb.cz, bunq.com]
    addresses: []
trends:
  - key: speed-as-baseline-confirmed
    statement: "All three ring-3 neobanks confirm A5's B1 trend directly on their own sites: minutes-not-days account opening is the stated default, not a differentiator."
    traces_to: [n26.com, revolut.com, bunq.com]
    addresses: []
  - key: no-visible-resume-capability
    statement: "No participant profiled, across every primary and independent source consulted, publicly shows a save-and-resume capability for a partially completed application."
    traces_to: [kb.cz, airbank.cz, fio.cz, rb.cz, mbank.cz, n26.com, revolut.com, bunq.com, "substitute:branch-contact-centre"]
    addresses: [O4]
absences:
  - problem: "O1 -- losing track of what is left in identity verification: no participant profiled shows a progress indicator or time estimate during identity verification."
  - problem: "O2 -- not knowing whether progress was saved after a failed scan: no participant profiled shows a stated save-state message after a failed document scan."
  - problem: "O3 -- identity creation mistaken for an open account: no participant profiled shows an explicit confirmation step distinguishing 'identity created' from 'account open'."
trace_id: []
---

# Record R-A7-01 -- competitive synthesis

One production of the synthesis step, worked facet by facet across the nine cards A6 carries. Seven
standards, six patterns, two trends, three absences. The assembled output in
`3-competitive-analysis/3-competitive-synthesis.md` carries the prose this record supports, cited as
`[rec:R-A7-01]`.
