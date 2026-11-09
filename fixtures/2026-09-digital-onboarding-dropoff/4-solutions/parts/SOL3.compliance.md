---
part_of: A8
item_id: SOL3
derived_from: 105954a7d61a6c0c
touchpoints: 20
areas_in_play: [A1, A2, A3, A4]
open_items: 20
escalations: 5
---

### Compliance

In play: Compliance, conduct and product regulation (S1, S12, S13, S2, S3, S6, S7, S8) · GDPR and privacy (G1, G10, G11, G12, G2, G3, G4) · Legal and contracts (L1, L10, L11, L2, L3, L5) · ICT and security (I1, I10, I11, I2, I4, I5, I7, I8, I9). 5 escalation trigger(s) fired: G-E6 in GDPR and privacy, because G11 is unresolved; G-E12 in GDPR and privacy, because G1 is unresolved; I-E1 in ICT and security, because I3 is unresolved; I-E12 in ICT and security, because I5 is unresolved; I-E13 in ICT and security, because I4 is unresolved. **No card names the role a fired trigger routes to**, so where each one goes is an open ask to ČS. 20 question(s) could not be answered from the solution as written, each naming the input that would settle it.

**# of touchpoints: 20**

#### Compliance, conduct and product regulation

*What the client is told*

> **TP-11 · Any client-facing screen, document, email, SMS or script changes** · engages S1
>
> Product has to have the wording reviewed against the fair, clear and not misleading standard and make marketing identifiable as marketing, because that is a legal test rather than a tone preference

> **TP-15 · A risk, limit or exclusion is described to the client** · engages S1, S6, S7
>
> Product has to give limits and exclusions the same visual weight as the benefits, because the test is whether the two are balanced

*Accessibility*

> **TP-32 · Any client-facing website, app or web view changes** · engages S13
>
> Product has to meet the accessibility bar of perceivable, operable, understandable and robust, because it has been in force in Czechia since June 2025 and consumer banking is expressly in scope

> **TP-33 · Authentication, identification or a payment step changes** · engages S13, S8
>
> Product has to check the authentication, identification and payment steps individually for accessibility, because a CAPTCHA, an SMS-code timeout or a signature pad each fail on their own

*Controls*

> **TP-38 · Something about the product has to be monitored after launch** · engages S12, S2
>
> Product has to make sure the data needed for post-launch monitoring exists, because monitoring is an obligation and cannot run on data nobody collected

> **TP-39 · A record has to be kept to prove what a client was told or agreed** · engages S12, S1, S3
>
> Product has to keep records that can reconstruct what a client was told, because retention periods differ by product type

#### GDPR and privacy

*Collecting and holding*

> **DP-01 · The product stores personal data — any field about an identifiable person** · engages G1, G2, G3, G11
>
> Product has to write down why it needs each stored field and cut the ones it cannot justify, because every field needs a purpose and a legal basis on record

> **DP-07 · Data is kept after the client relationship ends** · engages G3, G11, G12
>
> Product has to set a retention period per purpose and say how deletion and legal holds interact, because banking and anti-money-laundering rules require keeping data clients can otherwise ask to erase

*Telling the client and letting them act*

> **DP-15 · The client asks for their data, or asks for it to be deleted** · engages G4, G3
>
> Product has to register the new data store with the team that answers access and deletion requests, because a store nobody told them about makes the client's right fail silently

*Keeping it safe*

> **DP-29 · A new interface exposes personal data** · engages G10
>
> Product has to define access control and logging for the new interface as part of the design, because both are design decisions with a legal consequence

#### Legal and contracts

*Forming the agreement*

> **LG-05 · The client is identified remotely** · engages L5, L1
>
> Product has to keep identification, signature and authentication as three separate steps, because a journey that conflates them leaves a gap in each

*What the client is committed to*

> **LG-07 · A new term, limit, exclusion or obligation is introduced** · engages L2, L3
>
> Product has to state the new term, limit or obligation plainly and where the client will see it, because a term that surprises a consumer is the classic unfair term

> **LG-11 · The bank promises a time, a rate or an outcome** · engages L10, L11
>
> Product has to treat a promise made in the journey as a contractual term, because it binds whether or not it appears in the contract document

#### ICT and security

*Getting in*

> **IT-01 · The client logs in, or the login changes** · engages I2, I8
>
> Product has to specify how strong the login is, how sessions end and how recovery works, because payment services regulate authentication and the same bar is expected elsewhere

> **IT-04 · The client recovers access after losing a factor** · engages I2, I11
>
> Product has to design the recovery path to the same standard as the login, because recovery is where authentication is usually weakest and where account takeover happens

> **IT-06 · A device or session is remembered** · engages I2, I8
>
> Product has to record remembering a device as an exemption decision, because it lowers the authentication bar rather than just improving convenience

*Exposing an interface*

> **IT-16 · A new API or integration is exposed** · engages I2, I7, I9, I10
>
> Product has to define who may call the interface, how it gets security tested, what it logs and where it runs, because the bank must evidence each one separately

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
- **DP-23**, GDPR and privacy — A vendor, SaaS tool or partner processes client data. **Settled by `third_parties`**
- **DP-26**, GDPR and privacy — **Data is stored or accessed outside the EEA**. **Settled by `hosting_and_data_location`**
- **DP-32**, GDPR and privacy — Something could go wrong in a way that exposes client data. **Settled by `security_measures`**
- **LG-22**, Legal and contracts — Open-source or third-party software is embedded. **Settled by `components_and_libraries`**
- **LG-24**, Legal and contracts — A supplier processes something the product depends on. **Settled by `third_parties`**
- **IT-07**, ICT and security — **A vendor, SaaS product or cloud service is introduced**. **Settled by `third_parties`**
- **IT-08**, ICT and security — The dependency supports something clients rely on. **Settled by `critical_or_important_function`**
- **IT-09**, ICT and security — The provider is one the bank already depends on heavily. **Settled by `third_parties`**
- **IT-10**, ICT and security — The provider subcontracts part of the service. **Settled by `third_parties`**
- **IT-11**, ICT and security — Leaving the provider would be hard. **Settled by `recovery_expectations`**
- **IT-12**, ICT and security — An open-source or third-party component is added. **Settled by `components_and_libraries`**
- **IT-13**, ICT and security — Data is stored in a new location or a new cloud region. **Settled by `hosting_and_data_location`**
- **IT-14**, ICT and security — Support or administration happens from outside the EEA. **Settled by `hosting_and_data_location`**
- **IT-15**, ICT and security — A new environment is created. **Settled by `release_and_environment`**
- **IT-23**, ICT and security — A vulnerability is found in something the product uses. **Settled by `components_and_libraries`**
- **IT-24**, ICT and security — Release cadence or deployment approach changes. **Settled by `release_and_environment`**
- **IT-25**, ICT and security — Testing scope changes. **Settled by `release_and_environment`**
- **IT-26**, ICT and security — Secrets, keys or certificates are introduced. **Settled by `security_measures`**
- **IT-27**, ICT and security — The affected service is one the bank registered under the cyber regime. **Settled by `registered_under_cyber_regime`**
