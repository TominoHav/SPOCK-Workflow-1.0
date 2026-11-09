---
run_id: 2026-09-savings-goals
record_id: R-A1b-01
artifact_id: A1b
item_id: ""
produced_at: 2026-08-28
bounds_hit: []
trace_id: []
sources: [A1]
external_sources: []
areas:
  - area: A1
    filled: true
    source: cs_card
    triggers_fired:
      - trigger: T2
        puts_in_play: [S2, S1]
      - trigger: T7
        puts_in_play: [S1]
      - trigger: T12
        puts_in_play: [S13, S1]
      - trigger: T13
        puts_in_play: [S13]
    sub_domains:
      - sub_domain: S1
        state: in_play
        because: "T7 changed client communication and T12 the client digital journey; the feature tells the client something in the app and by push message"
      - sub_domain: S2
        state: in_play
        because: "T2 marked a material product change; a new feature over an existing current account for a defined retail segment"
      - sub_domain: S3
        state: not_triggered
        because: "The description recommends nothing and steers the client nowhere; the goal and the amount are the client's own"
      - sub_domain: S4
        state: not_triggered
        because: "The description states no change to price, fee or terms"
      - sub_domain: S5
        state: not_triggered
        because: "No new partner and no remuneration; the description states there are no third parties"
      - sub_domain: S6
        state: not_triggered
        because: "The description states no investment functionality; the product type is given and it is not investment"
      - sub_domain: S7
        state: not_triggered
        because: "The description states no insurance functionality"
      - sub_domain: S8
        state: not_triggered
        because: "The set-aside moves the client's own money inside one account and initiates no payment; the description says so"
      - sub_domain: S9
        state: not_triggered
        because: "The description states no consumer credit"
      - sub_domain: S10
        state: not_triggered
        because: "The description states that nothing is claimed about sustainability"
      - sub_domain: S11
        state: not_triggered
        because: "Distribution stays in the bank's own channels and no third party enters the chain"
      - sub_domain: S12
        state: cannot_determine
        because: "Controls, reporting and auditability are described by a solution shape that does not exist yet"
        missing_input: controls_and_monitoring
      - sub_domain: S13
        state: in_play
        because: "T12 and T13 marked a client digital journey and an interface change; the client uses the new screens themselves"
  - area: A2
    filled: true
    source: authored_here
    triggers_fired:
      - trigger: P2
        puts_in_play: [G1, G2, G11]
      - trigger: P6
        puts_in_play: [G5, G1, G11]
      - trigger: P12
        puts_in_play: [G4, G2]
    sub_domains:
      - sub_domain: G1
        state: in_play
        because: "P2 marked existing account data used for a new purpose, and P6 marked special-category data as reachable; both need a basis per purpose"
      - sub_domain: G2
        state: in_play
        because: "P2 marked a new purpose and P12 a journey in which the client acts on their own data; both have to be told to the client"
      - sub_domain: G3
        state: cannot_determine
        because: "How long a completed or deleted goal is kept is described by a solution shape that does not exist yet"
        missing_input: retention_periods
      - sub_domain: G4
        state: in_play
        because: "P12 marked that the client can delete a goal inside the journey, which is a rights route the product itself carries"
      - sub_domain: G5
        state: in_play
        because: "P6 fired on the goal name: it is free text the client types, and a client can put health or other special-category data into it. Nothing asks for it and nothing stops it"
      - sub_domain: G6
        state: not_triggered
        because: "The automatic set-aside runs on a rule the client sets; the description states that nothing is inferred and no decision is made about the client"
      - sub_domain: G7
        state: not_triggered
        because: "The description states there is no marketing or tracking in the pilot"
      - sub_domain: G8
        state: not_triggered
        because: "The description states there are no third parties and no data leaves the bank"
      - sub_domain: G9
        state: cannot_determine
        because: "Where the data is hosted is described by a solution shape that does not exist yet"
        missing_input: hosting_and_data_location
      - sub_domain: G10
        state: cannot_determine
        because: "Security measures are described by a solution shape that does not exist yet"
        missing_input: security_measures
      - sub_domain: G11
        state: in_play
        because: "P2 and P6 both marked processing that has to be recorded, and the description states the impact assessment has not started"
      - sub_domain: G12
        state: not_triggered
        because: "No processor and no sub-processor; the description states there are none"
  - area: A3
    filled: true
    source: authored_here
    triggers_fired:
      - trigger: N6
        puts_in_play: [L4, L1]
    sub_domains:
      - sub_domain: L1
        state: in_play
        because: "N6 marked that the client can end the arrangement inside the journey; what they agreed to when switching it on has to be locatable"
      - sub_domain: L2
        state: not_triggered
        because: "No framework contract and no terms change; the description states the set-aside is a transfer between the client's own money in one account"
      - sub_domain: L3
        state: not_triggered
        because: "No new pre-contractual document is introduced; the description states there are none"
      - sub_domain: L4
        state: in_play
        because: "N6 marked that the client can delete a goal or switch the set-aside off at any time"
      - sub_domain: L5
        state: not_triggered
        because: "How the client signs or confirms does not change; the description states there is no signature and no new agreement"
      - sub_domain: L6
        state: not_triggered
        because: "No new client-facing document; the in-app text and the push message go through the existing communication route"
      - sub_domain: L7
        state: cannot_determine
        because: "Whether third-party content, brand or software is used is described by a solution shape that does not exist yet"
        missing_input: content_brand_and_software
      - sub_domain: L8
        state: not_triggered
        because: "No supplier, partner or outsourcing; the description states there are no third parties"
      - sub_domain: L9
        state: not_triggered
        because: "The complaints route does not change; the description names the existing one"
      - sub_domain: L10
        state: not_triggered
        because: "The description promises no service level, guarantee or outcome"
      - sub_domain: L11
        state: not_triggered
        because: "No marketing claim is made that a client could rely on"
      - sub_domain: L12
        state: not_triggered
        because: "The activity is deposit-taking the bank is already licensed for, and no new deposit product is created"
  - area: A4
    filled: true
    source: authored_here
    triggers_fired: []
    sub_domains:
      - sub_domain: I1
        state: cannot_determine
        because: "Which systems change is described by a solution shape that does not exist yet"
        missing_input: systems_affected
      - sub_domain: I2
        state: not_triggered
        because: "Authentication does not change; the description states the client signs in the existing way"
      - sub_domain: I3
        state: not_triggered
        because: "No third party, vendor or cloud service is depended on; the description states there are none"
      - sub_domain: I4
        state: cannot_determine
        because: "Incident classification rests on which systems are involved, which is not yet known"
        missing_input: systems_affected
      - sub_domain: I5
        state: cannot_determine
        because: "Recovery objectives are described by a solution shape that does not exist yet"
        missing_input: recovery_expectations
      - sub_domain: I6
        state: cannot_determine
        because: "Release and environment approach is described by a solution shape that does not exist yet"
        missing_input: release_and_environment
      - sub_domain: I7
        state: cannot_determine
        because: "Components and libraries are described by a solution shape that does not exist yet"
        missing_input: components_and_libraries
      - sub_domain: I8
        state: not_triggered
        because: "No credentials, keys or tokens are created or handled; the description states authentication is unchanged"
      - sub_domain: I9
        state: cannot_determine
        because: "Logging and monitoring needs are described by a solution shape that does not exist yet"
        missing_input: controls_and_monitoring
      - sub_domain: I10
        state: cannot_determine
        because: "Hosting and data location are described by a solution shape that does not exist yet"
        missing_input: hosting_and_data_location
      - sub_domain: I11
        state: not_triggered
        because: "No new payment leaves the bank, so no new fraud surface is created; the description says so"
      - sub_domain: I12
        state: not_triggered
        because: "The description states the pilot adds no new external dependency to a registered service"
escalation:
  flag: true
  fired:
    - area: A1
      trigger: C-E11
      because: "Accessibility is in play and its effect on the interface cannot be judged from the framing"
      routes_to: unstated
    - area: A1
      trigger: C-E14
      because: "Controls cannot be described for this framing, because they are described by a solution shape that does not exist yet. The trigger fires on the unresolvedness itself"
      routes_to: unstated
    - area: A2
      trigger: G-E1
      because: "The goal name is free text and a client can type special-category data into it. Nothing asks for it and nothing stops it, which is exactly the case this trigger is for"
      routes_to: unstated
    - area: A2
      trigger: G-E6
      because: "New purposes over existing account data, and the impact assessment has not started"
      routes_to: unstated
    - area: A4
      trigger: I-E12
      because: "Recovery objectives cannot be stated from the framing"
      routes_to: unstated
    - area: A4
      trigger: I-E13
      because: "A plausible incident cannot be classified while the systems involved are unknown"
      routes_to: unstated
uncovered:
  - area: X1
    disposition: "Routed, not screened. AI regulation is not one of the four areas"
  - area: X2
    disposition: "Routed. Non-ICT outsourcing is not screened"
  - area: X3
    disposition: "Not covered. Payment scheme rules and market infrastructure are not regulation and sit in none of the four areas"
---

# Record R-A1b-01 — A1b

One production. The document assembled from it is 1-brief/initiative-screen.md.
