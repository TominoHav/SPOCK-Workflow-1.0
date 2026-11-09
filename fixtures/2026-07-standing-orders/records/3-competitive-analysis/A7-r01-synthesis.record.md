---
run_id: 2026-07-standing-orders
record_id: R-A7-01
artifact_id: A7
item_id: ""
produced_at: 2026-08-24
bounds_hit: [standards, patterns, trends]
trace_id: []
sources: [A5, A6]
external_sources: []
# `produced_by` is NOT here. It belongs on the output only (artifact-fields.yaml §6.0).
standards:
  - key: ST1
    statement: "Digital self-service standing order lifecycle management is the near-universal floor across retail banking participants in this cohort, present in digital or human-mediated form at 9 of 11 participants."
    tier: universal
    source_count: "9 of 11"
    traces_to:
      - csob.cz
      - kb.cz
      - airbank.cz
      - moneta.cz
      - revolut.com
      - n26.com
      - lloydsbank.com
      - natwest.com
      - substitute:contact-centre-call
    addresses:
      - H4
  - key: ST2
    statement: "Recurring commitment management is architecturally separated by payment type across every consumer-facing participant; no participant in this cohort delivers a confirmed unified view of standing orders, direct debits and card-on-file subscriptions in a single interface."
    tier: universal
    source_count: "10 of 11"
    traces_to:
      - csob.cz
      - kb.cz
      - airbank.cz
      - moneta.cz
      - revolut.com
      - monzo.com
      - n26.com
      - lloydsbank.com
      - natwest.com
      - substitute:contact-centre-call
    addresses:
      - H1
      - H4
  - key: ST3
    statement: "In-app visibility of card-on-file subscriptions as a named product feature is present in 4 of 11 participants, all operating outside the Czech retail banking market."
    tier: emerging
    source_count: "4 of 11"
    traces_to:
      - revolut.com
      - monzo.com
      - lloydsbank.com
      - natwest.com
    addresses:
      - H1
      - H2
      - H4
  - key: ST4
    statement: "Where in-app card payment controls exist, they block charges but cannot cancel the underlying merchant contract; all five participants with any form of subscription or recurring card payment control confirm this boundary."
    tier: emerging
    source_count: "5 of 11"
    traces_to:
      - revolut.com
      - lloydsbank.com
      - natwest.com
      - monzo.com
      - substitute:contact-centre-call
    addresses:
      - H2
      - H3
      - H4
  - key: ST5
    statement: "Per-subscription virtual card isolation at the card-number level, allowing a recurring card charge to be stopped without blocking the whole card or contacting the merchant, is present in 2 of 11 participants."
    tier: emerging
    source_count: "2 of 11"
    traces_to:
      - revolut.com
      - monzo.com
    addresses:
      - H2
  - key: ST6
    statement: "Proactive notification of upcoming or changed subscription charges is present in 2 of 11 participants and absent from all Czech-market participants in this cohort."
    tier: emerging
    source_count: "2 of 11"
    traces_to:
      - revolut.com
      - lloydsbank.com
    addresses:
      - H4
  - key: ST7
    statement: "Cross-type recurring payment intelligence covering card subscriptions, standing orders and direct debits through a single API is commercially deployed by 1 of 11 participants as B2B infrastructure, with no confirmed consumer-facing Czech bank product."
    tier: rare
    source_count: "1 of 11"
    traces_to:
      - tapix.io
      - revolut.com
    addresses:
      - H1
      - H2
patterns:
  - key: P1
    statement: "Czech-market incumbents (csob.cz, kb.cz, airbank.cz, moneta.cz) confirm the scope of digital recurring payment management as standing orders only, explicitly excluding card subscription visibility and management from their consumer products."
    traces_to:
      - csob.cz
      - kb.cz
      - airbank.cz
      - moneta.cz
    addresses:
      - H1
      - H2
      - H4
  - key: P2
    statement: "The participants with the most capable subscription management (monzo.com, lloydsbank.com, natwest.com, n26.com) operate outside the Czech market and are not available to Czech retail banking customers, concentrating the H1 and H2 capability gap in the Czech market."
    traces_to:
      - monzo.com
      - lloydsbank.com
      - natwest.com
      - n26.com
    addresses:
      - H1
      - H2
  - key: P3
    statement: "Participants offering dedicated subscription management describe their product in the client's commercial vocabulary (subscriptions, recurring payments) while Czech-market participants use the bank's operational vocabulary (standing orders), and the vocabulary divide maps precisely to the capability divide."
    traces_to:
      - revolut.com
      - lloydsbank.com
      - natwest.com
      - tapix.io
    addresses:
      - H4
  - key: P4
    statement: "Across every participant that has built in-app subscription management, the product frames its capability as payment blocking or merchant signposting, not as resolution of the commercial contract; no participant in this cohort cancels a card-on-file authority from the bank side."
    traces_to:
      - revolut.com
      - lloydsbank.com
      - natwest.com
      - monzo.com
    addresses:
      - H2
      - H3
  - key: P5
    statement: "The two Czech incumbents whose primary sites were inaccessible throughout research (csob.cz, moneta.cz) cannot have their capability, scope or pricing confirmed from primary documentation; this information gap is part of what H4 names as the problem of clients not knowing which capabilities apply before contact."
    traces_to:
      - csob.cz
      - moneta.cz
    addresses:
      - H4
  - key: P6
    statement: "B2B subscription intelligence infrastructure (tapix.io) is embedded in consumer-facing products (revolut.com) without consumer awareness, and the same vendor serves Erste Group, Ceska sporitelna's parent, without a publicly confirmed Czech bank consumer product deployment."
    traces_to:
      - tapix.io
      - revolut.com
    addresses:
      - H1
  - key: P7
    statement: "Standing order management documentation quality varies substantially across Czech-market participants, from Air Bank's documented create-edit-pause-cancel lifecycle with step-by-step screenshots to CSOB's unconfirmable scope and MONETA's lifecycle unspecified beyond payment templates."
    traces_to:
      - airbank.cz
      - csob.cz
      - kb.cz
      - moneta.cz
    addresses:
      - H4
trends:
  - key: TR1
    statement: "B2B subscription intelligence infrastructure is scaling across European banking: Tapix processes approximately 1.5 billion transactions monthly and in September 2025 OTP Bank selected it as its sole enrichment provider; confirmed clients include Revolut, Raiffeisenbank, UniCredit and Erste Group, Ceska sporitelna's parent."
    traces_to:
      - tapix.io
      - revolut.com
    addresses:
      - H1
      - H2
  - key: TR2
    statement: "UK incumbent banks built subscription management capability as a competitive and regulatory response: Lloyds launched in July 2020 via the Minna Technologies partnership and NatWest followed with a dedicated subscriptions tab, establishing the feature as expected at UK retail scale."
    traces_to:
      - lloydsbank.com
      - natwest.com
    addresses:
      - H2
      - H3
  - key: TR3
    statement: "Czech-market standing order channels are migrating to digital-only: KB eliminated paper submission at branches on 1 January 2024 and Air Bank and MONETA are positioned as digital-first, concentrating standing order self-service in digital channels while leaving non-digital customers with no self-service path."
    traces_to:
      - kb.cz
      - airbank.cz
      - moneta.cz
    addresses:
      - H4
  - key: TR4
    statement: "Virtual card proliferation is emerging as a subscription isolation mechanism: Revolut offers Czech users up to 20 active virtual cards for recurring payment isolation and Monzo provides auto-delete virtual cards at the Extra tier, giving a card-credential-level path to ending a recurring charge without merchant contact."
    traces_to:
      - revolut.com
      - monzo.com
    addresses:
      - H2
  - key: TR5
    statement: "The regulatory gap between card-on-file subscriptions and SEPA direct debits is closing under PSD3: the provisional political agreement of November 2025 aligns merchant-initiated transaction protections with direct debit consumer protection including refund rights, with entry into force expected 2027-2028."
    traces_to:
      - substitute:contact-centre-call
      - natwest.com
    addresses:
      - H2
      - H4
  - key: TR6
    statement: "Mastercard card scheme rules updated in 2022 created mandatory merchant-side online cancellation pathways but left the bank-side capability gap entirely unaddressed, establishing that in-app subscription management is a product decision that no current regulation mandates."
    traces_to:
      - tapix.io
      - substitute:contact-centre-call
    addresses:
      - H2
  - key: TR7
    statement: "UK neobanks and incumbents with subscription management capability include the feature in their free or base tiers, setting a market expectation that subscription management carries zero additional cost to the customer."
    traces_to:
      - revolut.com
      - monzo.com
      - n26.com
    addresses:
      - H1
absences:
  - problem: H5
  - problem: H6
  - problem: H8
---

# Record R-A7-01 -- A7

One synthesis invocation. Not written for a reader; the document assembled from it is 3-competitive-analysis/3-competitive-synthesis.md.
