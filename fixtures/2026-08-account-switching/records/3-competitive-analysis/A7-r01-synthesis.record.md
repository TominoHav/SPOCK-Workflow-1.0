---
run_id: 2026-08-account-switching
record_id: A7-r01
artifact_id: A7
item_id: ""
produced_at: 2026-08-26
bounds_hit: []
trace_id: []
sources: []
external_sources: []
run_id: 2026-08-account-switching
standards:
  - key: ST1
    statement: "All nine guided switching services in this set automatically transfer standing orders, direct debits, and the existing account balance, and redirect incoming payments from the closed old account for a defined minimum period."
    traces_to: [csob.cz, kb.cz, airbank.cz, moneta.cz, starlingbank.com, monzo.com, revolut.com, natwest.com, lloydsbank.com]
    addresses: [O3, O4]
    tier: universal
    source_count: "9 of 10"
  - key: ST2
    statement: "Card-on-file merchant credentials are excluded from all guided switching schemes by statute or scheme rule, confirmed by every participant in this set, with no bank having deployed a tool to identify or migrate them."
    traces_to: [csob.cz, kb.cz, airbank.cz, moneta.cz, starlingbank.com, monzo.com, revolut.com, natwest.com, lloydsbank.com, "substitute:self-managed-switch"]
    addresses: [O1, O6]
    tier: universal
    source_count: "10 of 10"
  - key: ST3
    statement: "Named savings sub-accounts or budget pots within the main current account, without requiring a separate product application, are available at seven of ten participants: Starling Bank (Saving Spaces), Monzo (Pots), Revolut (Vaults), Komercni banka (10 saving envelopes), Air Bank (10 simultaneous accounts), Moneta (savings envelopes) and Lloyds Bank (Club Lloyds Monthly Saver)."
    traces_to: [starlingbank.com, monzo.com, revolut.com, kb.cz, airbank.cz, moneta.cz, lloydsbank.com]
    addresses: [O4]
    tier: common
    source_count: "7 of 10"
  - key: ST4
    statement: "Virtual cards linked to named sub-accounts or subscription categories are available at three participants, all marked innovator, providing a structural mechanism to reduce card-on-file exposure before a switch without eliminating it."
    traces_to: [starlingbank.com, monzo.com, revolut.com]
    addresses: [O1]
    tier: emerging
    source_count: "3 of 10"
  - key: ST5
    statement: "Salary-moment features that activate on the first salary receipt after a switch, either releasing the payment early or automatically allocating it across named pots, are deployed by two participants, both marked innovator, making salary arrival the operational definition of a completed switch."
    traces_to: [monzo.com, revolut.com]
    addresses: [O2, O4]
    tier: emerging
    source_count: "2 of 10"
  - key: ST6
    statement: "Explicit disclosure of the card-on-file exclusion in publicly accessible switching documentation, naming the type of payment affected and an example merchant, is provided by two participants."
    traces_to: [natwest.com, starlingbank.com]
    addresses: [O1]
    tier: emerging
    source_count: "2 of 10"
patterns:
  - key: P1
    statement: "UK neobanks treat the switch as a product design event rather than a compliance process, building features that activate at salary arrival: Monzo via Salary Sorter and Get Paid Early, Revolut via Early Salary. No Czech bank or UK incumbent has deployed a salary-moment feature of this kind."
    traces_to: [monzo.com, revolut.com]
    addresses: [O2, O4]
  - key: P2
    statement: "UK incumbents facing net CASS outflows are responding with escalating cash incentives rather than journey improvements: NatWest raised its offer from £150 to £200 within a single year, Lloyds ran two campaigns at £250 then £200-£500 within four months of 2026."
    traces_to: [natwest.com, lloydsbank.com]
    addresses: []
  - key: P3
    statement: "Czech PAD-compliant banks operate at or close to the statutory switching floor with no documented above-floor feature for customer communication, timeline visibility or post-switch confirmation in English-language public material."
    traces_to: [csob.cz, kb.cz, airbank.cz, moneta.cz]
    addresses: [O3, O4, O6]
  - key: P4
    statement: "The self-managed approach keeps the old account open throughout the transition, giving the customer a continuous view of what payments remain attached to it, and is the only approach in this set where the customer can confirm nothing remains before closing the account."
    traces_to: ["substitute:self-managed-switch"]
    addresses: [O1, O6]
  - key: P5
    statement: "Three participants extend their banking proposition into bundled non-banking services: Monzo into eSIM mobile, Air Bank into investment through Portu and telecoms through Unity, Revolut into multi-currency wealth accounts, deepening the relationship a switch must overcome."
    traces_to: [monzo.com, airbank.cz, revolut.com]
    addresses: []
  - key: P6
    statement: "The card-credential migration tooling that would automate the update of merchant-stored card details on a switch (Galileo Payment Switch, Visa Enhanced Subscription Manager) is commercially available and confirmed as undeployed by every participant in this set."
    traces_to: [natwest.com, starlingbank.com, "substitute:self-managed-switch"]
    addresses: [O1]
  - key: P7
    statement: "NatWest publishes a day-by-day switching timeline naming Day 1 through Day 6-7 on its switch page, committing the bank to specific outcomes on specific days. No other participant in this set publishes an equivalent. One participant practising something is that participant, not a market standard; this is retained as a pattern to keep the O3 benchmark visible."
    traces_to: [natwest.com]
    addresses: [O3]
trends:
  - key: TR-B3
    statement: "UK neobanks are converging on salary arrival as the operational definition of a completed switch: Monzo built Salary Sorter and Get Paid Early before 2026, and Revolut added Early Salary following its March 2026 banking licence. Two independent innovators reached the same product conclusion; no Czech bank or UK incumbent has matched it."
    traces_to: [monzo.com, revolut.com]
    addresses: [O2, O4]
  - key: TR-2
    statement: "UK incumbents are escalating cash switch incentives in response to measured CASS outflows: NatWest moved from £150 to £200 within 2026, Lloyds ran two campaigns reaching £500 within the first four months of 2026. Incentive value is rising while the post-switch journey is unchanged."
    traces_to: [natwest.com, lloydsbank.com]
    addresses: []
  - key: TR-3
    statement: "Czech banks with stated digital leadership ambitions have invested in platform modernisation and real-time capability but have not extended that investment to the switching journey in English-language public material as of August 2026. The gap between stated digital ambition and the switching customer's experience is the largest single opening the Czech market is not yet taking."
    traces_to: [moneta.cz, airbank.cz]
    addresses: [O3, O4]
  - key: TR-4
    statement: "Process transformation at CSOB (Camunda BPM from 2024, Kyndryl partnership from June 2026) and Moneta (AWS/SAS real-time marketing infrastructure in production April 2026) are reshaping operational layers at two Czech incumbents, with no confirmed switching journey application in either programme."
    traces_to: [csob.cz, moneta.cz]
    addresses: []
  - key: TR-T3
    statement: "No participant in this set has deployed a product that reads a switching customer's old-account payment data via open banking APIs. The technology is available under current open banking rules. PSD3 and PSR (provisional trilogue November 2025, force expected 2027) will extend the obligation. No participant has a confirmed roadmap response to either."
    traces_to: [airbank.cz, "substitute:self-managed-switch", natwest.com]
    addresses: [O1]
key: "The card-on-file gap is structural and universal: no guided switching service in this set touches it, no bank has deployed the tooling that would automate merchant credential updates, and the technology exists commercially while every participant leaves the problem to the customer. The Czech market has not moved above the PAD floor in any externally visible way. A bank that builds above it does not compete with the market as it stands; it competes with the self-managed switch, which is the only approach that currently keeps old-account visibility intact and is what every guided service loses on when customers compare the two."
absences:
  - problem: "No participant in this set offers a post-switch tool showing the customer which payments remain attached to a closed old account. Virtual card pre-switch mitigation (three innovators) and explicit card-on-file disclosure (two participants) are partial market responses to O1. Neither constitutes an answer to the confirmed-empty question behind O6, where the customer needs to know no payment is still arriving before they close the account. The complete market answer to the core capability behind O1 and O6 does not yet exist in any consumer banking product in this set."
---
