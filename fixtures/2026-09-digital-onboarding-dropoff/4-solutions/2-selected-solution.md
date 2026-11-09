---
run_id: 2026-09-digital-onboarding-dropoff
artifact_id: A9
ost_role: solution
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
sources: [A8]
external_sources: []
assembled_at: 2026-09-08
assembled_from: [R-A9-01]
decision:
  gate: G4
  by_agent: false
  selection: SOL3
  accepted_by:
    - name: Igor Tadic
      role: product manager
  accepted_at: 2026-09-08
  changed_during_refinement: none
  refinements: []
---

# SOL3, selected

SOL3 — a durable session that survives the client leaving — is the solution taken forward from the six A8
carries: the only one of the six that recovers an applicant who has already left, rather than making the
live journey clearer or prompting harder while it is still open. [rec:R-A9-01]

<!-- SELECTED -->

## SOL3 - A session that survives the client leaving

### What it is

A single underlying capability — durable session state that outlives the browser tab or app session that
created it — surfaced to the applicant two ways: as a live, updating estimate of what remains during
identity verification, and, where the applicant leaves entirely, as an exact point of return rather than a
blank new application.

### What it does

For O1, the applicant sees not just which step they are on but a live estimate of what is left, because the
state behind that estimate persists rather than resetting with every screen. For O4, the same persisted
state is what lets an applicant who genuinely leaves — closes the app, changes device, comes back days later
— resume exactly where they stopped, rather than being told, in effect, that nothing they did was kept.

### How it does it

The applicant's progress is written to durable session storage as they move through identity verification,
not held only in the current screen or device. While they are actively in the journey, that state powers a
live estimate of remaining steps and time. **A half-finished application is kept for up to 30 days from the
applicant's last activity, and this window is stated to the applicant, not left implicit.** Past it, the
saved state is deleted and a returning applicant starts over; the 30 days is this solution's own declared
boundary, chosen so the bank can state a retention period rather than hold one open-endedly.

**Getting back in is never a matter of holding a link.** If the applicant leaves and returns — closes the
app, changes device, comes back days later — they re-run the same identity check the original application
used, in full, before their saved state is shown to them at all. A link, an email or an SMS may tell the
applicant that a saved application exists and invite them back, but **the link itself carries no authority
to resume**: it points them at the identity check, and the check is what decides whether their session is
rebuilt, never a token in a URL. The same check, not a lighter one, because a shortcut around it is exactly
what would make a found or forwarded link into someone else's way into another person's application.

### The problem it solves, and for whom

New ČSAS retail clients partway through identity verification currently have no reliable sense of how much
remains (O1), and those who leave the journey partway, for any reason, currently cannot resume the same
application and must start a new one from scratch (O4).

### Opportunities it is built on

- **O1** — Losing track of what is left in identity verification. Takes the desired change directly: a
  live, persisted estimate replaces the absence of any read on remaining effort.
- **O4** — No way back into a dropped application. Takes the desired change directly: applicants who abandon
  partway can pick up where they left off instead of starting several applications.

### Against the market

**Standards it is built on.** Re-verifying an applicant on return sits downstream of the same federated
identity infrastructure (BankID) five of nine participants already use (`bankid-identity-verification`) —
this solution does not change how identity is verified, only that a returning applicant is asked to prove it
again before their saved state is restored.

**Trends it rides.** This is the synthesis's clearest opening: no participant profiled shows any
save-and-resume capability at all (`no-visible-resume-capability`). The universal absence of differentiation
at the opening step (`no-differentiation-at-opening-step`) also applies to O1 directly — no competitor is
instrumenting the verification step with a live estimate either.

### Strategic alignment

Both the estimate and the resumption reduce abandonment at the exact steps the run's metric — end-to-end
digital onboarding completion rate — measures, and that metric's stated one-step link to key result AI-2
(AI First) is the brief's own. An applicant who resumes and completes, rather than starting a duplicate
application or not returning at all, is a straight-through completion in the same digital channel.

The full touchpoint sweep behind this section is at [rec:R-A8-03].

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

<!-- /SELECTED -->

## What was selected

SOL3, carried whole above from A8: durable session state that outlives the browser tab or app session that
created it, surfaced during identity verification as a live estimate of what remains, and, where the
applicant leaves entirely, as an exact point of return rather than a blank new application.

## What it solves

O1 — losing track of what is left in identity verification — and O4 — no way back into a dropped
application. Both are taken by the one underlying capability: persisted session state, shown live while
the applicant is still in the journey and rebuilt for them if they leave and return.

## Why this one

It is the only one of the six that recovers applicants who have already left, rather than making the live
journey clearer or prompting harder while it is still open. The other five all act on an applicant who is
still in the journey, or who left recently enough for an outbound message to reach them — SOL3 is the one
that answers a client who abandoned last week and would otherwise have nothing to come back to, because the
session itself is what survived rather than a reminder or a nudge.

Two conditions were raised against the original design and both are now part of it rather than left as
compliance questions: resumption runs through the applicant's original identity check in full, never
through a link that is itself the key, and a retention window — 30 days from last activity — is stated to
the applicant rather than held open-ended.

## What it does not address

SOL3 does not touch O2 — an applicant who hits a failed scan and cannot tell whether their progress was
kept still has no explicit confirmation of that under this solution alone — and it does not touch O3,
where identity creation is mistaken for an open account. Both remain open opportunities this run's other
solutions addressed and this selection does not carry forward.

## What this carries into the next stage

SOL3's own open compliance items — hosting and data location, security measures, components and
libraries, release and environment, and the rest named on A8 — carry forward unresolved rather than
answered here; they become inputs the MVP options have to be designed against rather than questions this
stage settles. The two design commitments made at this stage — the 30-day retention window and resumption
gated by the original identity check — carry forward as fixed rather than as open questions for stage 5 to
revisit.

## What we could not establish

Whether O2 and O3 should be picked up as a second, later change, or left for a future run, is not decided
here — this stage records the selection and the gap, not what happens to what was not chosen.

## How this was produced

Stage 4.3 (Solutions, selection), `ideation@0.1`, agent `product-manager`. The solution above is carried
from `4-solutions/parts/SOL3.md` and its derived compliance section word for word, filled into the region
above once the decision recording SOL3 as the selection exists. The reasoning in "Why this one" restates,
in fuller form, what the person said when making the selection, recorded in full at [rec:R-A9-01]; it is
not a fresh judgement of this step's own. `G4` is the decision this artifact carries, and it is a person's,
not this step's, to record.

