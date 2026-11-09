---
part_of: A8
item_id: SOL1
derived_from: 099b408fff92f179
touchpoints: 9
areas_in_play: [A1, A2, A3, A4]
open_items: 12
escalations: 5
---

### Compliance

In play: Compliance, conduct and product regulation (S1, S12, S13, S2) · GDPR and privacy (G1, G11, G2, G3, G4) · Legal and contracts (L10, L11) · ICT and security (I1, I4, I5, I9). 5 escalation trigger(s) fired: G-E6 in GDPR and privacy, because G11 is unresolved; G-E12 in GDPR and privacy, because G1 is unresolved; I-E1 in ICT and security, because I3 is unresolved; I-E12 in ICT and security, because I5 is unresolved; I-E13 in ICT and security, because I4 is unresolved. **No card names the role a fired trigger routes to**, so where each one goes is an open ask to ČS. 12 question(s) could not be answered from the solution as written, each naming the input that would settle it.

**# of touchpoints: 9**

#### Compliance, conduct and product regulation

*What the client is told*

> **TP-11 · Any client-facing screen, document, email, SMS or script changes** · engages S1
>
> Product has to have the wording reviewed against the fair, clear and not misleading standard and make marketing identifiable as marketing, because that is a legal test rather than a tone preference

*Accessibility*

> **TP-32 · Any client-facing website, app or web view changes** · engages S13
>
> Product has to meet the accessibility bar of perceivable, operable, understandable and robust, because it has been in force in Czechia since June 2025 and consumer banking is expressly in scope

*Controls*

> **TP-38 · Something about the product has to be monitored after launch** · engages S12, S2
>
> Product has to make sure the data needed for post-launch monitoring exists, because monitoring is an obligation and cannot run on data nobody collected

#### GDPR and privacy

*Collecting and holding*

> **DP-01 · The product stores personal data — any field about an identifiable person** · engages G1, G2, G3, G11
>
> Product has to write down why it needs each stored field and cut the ones it cannot justify, because every field needs a purpose and a legal basis on record

*Telling the client and letting them act*

> **DP-15 · The client asks for their data, or asks for it to be deleted** · engages G4, G3
>
> Product has to register the new data store with the team that answers access and deletion requests, because a store nobody told them about makes the client's right fail silently

#### Legal and contracts

*What the client is committed to*

> **LG-11 · The bank promises a time, a rate or an outcome** · engages L10, L11
>
> Product has to treat a promise made in the journey as a contractual term, because it binds whether or not it appears in the contract document

#### ICT and security

*When something goes wrong*

> **IT-19 · The service could fail in a way clients notice** · engages I4, I5, I1
>
> Product has to make the failure classifiable quickly, because major incidents run on a reporting clock that starts before anyone has diagnosed the cause

> **IT-20 · A new failure mode is introduced** · engages I5, I4
>
> Product has to state recovery time and data loss objectives, because they cannot be assumed after the fact

> **IT-22 · The initiative changes what is logged** · engages I9, I4
>
> Product has to log enough for someone who was not there to reconstruct what happened, because that is the bar the logs are judged against

#### Open items

- **DP-12**, GDPR and privacy — Production data is copied to a test, demo or analytics environment. **Settled by `release_and_environment`**
- **DP-26**, GDPR and privacy — **Data is stored or accessed outside the EEA**. **Settled by `hosting_and_data_location`**
- **DP-32**, GDPR and privacy — Something could go wrong in a way that exposes client data. **Settled by `security_measures`**
- **LG-22**, Legal and contracts — Open-source or third-party software is embedded. **Settled by `components_and_libraries`**
- **IT-12**, ICT and security — An open-source or third-party component is added. **Settled by `components_and_libraries`**
- **IT-13**, ICT and security — Data is stored in a new location or a new cloud region. **Settled by `hosting_and_data_location`**
- **IT-14**, ICT and security — Support or administration happens from outside the EEA. **Settled by `hosting_and_data_location`**
- **IT-15**, ICT and security — A new environment is created. **Settled by `release_and_environment`**
- **IT-23**, ICT and security — A vulnerability is found in something the product uses. **Settled by `components_and_libraries`**
- **IT-24**, ICT and security — Release cadence or deployment approach changes. **Settled by `release_and_environment`**
- **IT-25**, ICT and security — Testing scope changes. **Settled by `release_and_environment`**
- **IT-27**, ICT and security — The affected service is one the bank registered under the cyber regime. **Settled by `registered_under_cyber_regime`**
