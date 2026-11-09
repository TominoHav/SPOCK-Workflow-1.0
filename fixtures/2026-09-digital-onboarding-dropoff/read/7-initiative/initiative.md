> **Reading copy of the initiative document.** The text below the line is identical to the source document. The machine record stays in the source and is not repeated here. This file is generated, so do not edit it; a hand edit fails the build.

---

# [SPOCK-1245] - Durable session for identity verification and resumption

Applicants who reach identity verification abandon at the single largest drop in the onboarding funnel, and applicants who leave onboarding partway have no way back into the same application. This initiative keeps a durable record of an applicant's progress through identity verification, on the app and the web together, and uses it two ways: while the applicant is still in the journey, to show a live estimate of what remains, and if the applicant leaves entirely, to restore them into the same application once they prove their identity again. Success is read against the end-to-end digital onboarding completion rate, targeted at 30% completion, alongside the share of resumed sessions that go on to complete.

## Insight

Applicants who reach identity verification lose track of how much is left and what happens next, and abandon at the step carrying the largest single drop in the funnel, 22.2%. Separately, applicants who leave onboarding partway, for any reason, cannot resume the same application — they start a new one, or they do not come back at all.

Both observations rest on the same kind of source rather than on two independent ones, so they are carried here as a read that needs confirming rather than a settled fact. Neither gap is closed anywhere else in the market either: no bank profiled during this run's own look at the competitive landscape offers a returning applicant any way back into a dropped application, and none instruments the identity-verification step with a live estimate.

## Business objective

This initiative feeds AI-2, the share of sales and service processes in primary digital channels that are fully straight-through. An applicant who resumes and completes the same application, rather than starting a duplicate one or not returning at all, is a straight-through completion in the same digital channel — the direct mechanism AI-2 measures. It also bears on TL-1, clients affected by outages of key digital channels, because a new store and a new endpoint are a new part of the channel that can fail; this initiative is built to hold that strain rather than assume it away.

The initiative is finished when its result is read against a threshold fixed in advance: if fewer than one in twenty applicants who abandon come back through the resumption path, the pilot stops, because that result would mean those applicants left for reasons this capability never touched.

## Outcome

Applicants who are partway through identity verification know how much is left and continue rather than abandon. Applicants who leave onboarding partway, on any device and for any reason, come back and finish the same application instead of starting a new one or leaving for good.

## Success metrics

### Behavioural

End-to-end digital onboarding completion rate, targeted at 30% completion — the run's own business measure. Read alongside it, the share of resumed sessions that go on to complete.

Today's end-to-end completion rate, against which the 30% target is read, is not established in the material this initiative draws on. It is due before the pilot starts, and the stop condition above does not wait on it.

### Business

AI-2. A completion that would otherwise have been a duplicate application, or no return at all, becomes a straight-through completion in the primary digital channel.

### Client perception

Not gathered. Nothing in the material this initiative draws on measures how resuming, or seeing a progress estimate, feels to an applicant, and none is invented here.

## Initiative scope

### In scope

- A durable session that keeps an applicant's progress in identity verification, written continuously rather than held only in the current screen or device, on the app and the web from the first release.
- A live, updating estimate of what is left, shown while the applicant is still in identity verification, that never falls behind what the applicant has actually done.
- A way back for an applicant who leaves the journey partway, on any channel, gated by a full re-run of the same identity check the original application used — never a lighter one, and never a link that grants entry on its own.
- Disclosure to the applicant, at the moment they leave, of how long their progress is kept and that returning means proving their identity again — shown with the same weight as the offer to come back, not only in a terms document.
- Automatic deletion of a session's stored progress after thirty days with no activity.
- Access control on the resumption path, and a record of who called it, under what session, and what happened.
- The same accessibility standard applied to the new screens and to the repeated identity check as to the rest of the journey, tested and recorded separately for each.
- A record of when an applicant reaches, completes, resumes or drops off at each new screen, and of what a disclosure or invitation showed and when, from the first release.
- A named incident type for a failed resumption or a failed estimate, and stated recovery objectives for the new session store, both fixed before launch.

### Out of scope

- An applicant who does not know whether their progress was saved after a failed identity scan, and an applicant who mistakes finishing identity verification for having an open account — both considered during this run and neither addressed here.
- A shorter, same-device-only way back, considered as an alternative and not the one taken forward.
- A future digital identity wallet route, and recovery of access for clients who already bank with ČS — both outside what this run was asked to look at.
- Children, entrepreneurs, corporate clients and sanctioned clients — outside what this run was asked to look at.
- Anti-money-laundering or know-your-customer policy, product pricing, parameters, eligibility rules, and how the bank acquires clients — none of this changes what identity verification checks or what the account costs.

## High-level acceptance criteria

- An applicant who finishes a part of identity verification sees the next screen's estimate reflect it, never the estimate that was true a step ago.
- An applicant who left on one channel and returns on another is taken through the full identity check before anything saved is shown to them.
- An applicant whose identity check fails on return, or whose thirty days have passed, is told plainly what happened rather than shown a partial or broken restore.
- An applicant is told, at the point they leave, how long their progress is kept and that they will need to prove their identity again, with the same weight as the offer to return.
- Every new screen's wording is reviewed against the fair, clear and not-misleading standard, and every new screen is tested to the same accessibility bar as the rest of the journey, before release — each recorded on its own rather than as one pass covering all of them.
- Completion, resumption and drop-off at each new screen can be measured from the first day it is live.

## Dependencies

| Dependency | What it affects | Status |
|---|---|---|
| Which team at ČS a fired compliance or privacy escalation is routed to | Five open escalations, across privacy and security, have nowhere named to go | Open — no card this run carries names one; an ask to ČS |
| Who owns registering the new session store against ČS's own access-and-deletion process | The store cannot go live undocumented against that process | Open — no owner named |
| Eight build-time choices behind the new store and endpoint — which vendor, where it is hosted, what security controls protect it, the deployment and testing approach, whether open-source or third-party components are used, how hard it would be to leave a chosen provider, and whether the service falls under the cyber-incident regime | Sizing and building the new store and endpoint depends on each being settled | Open — a delivery-team decision, not this document's |
| An update-cadence or latency target for the live estimate | Nothing in the material this initiative draws on states one, and a team sizing the estimate needs one | Open |
| Today's end-to-end completion rate | The number the 30% target is read against | Due before the pilot starts, owned by Igor Tadić; the stop condition above does not wait on it |

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| The new session store and resumption path become a new way the channel can fail, working against the outage measure this initiative is read against | A named incident type covers a failed resumption or a failed estimate, and recovery-time and data-loss objectives for the store are stated before launch |
| Fewer than one in twenty applicants who abandon use the way back, meaning abandonment is driven by something this capability never touches | The pilot stops rather than building further on a capability the evidence has already answered |
| A forwarded or found link lets someone other than the applicant into a saved session | The link never grants entry on its own; only a full re-run of the identity check decides whether a session is rebuilt |
| New wording or a new screen misleads an applicant, or excludes one who uses assistive technology | Wording is reviewed against the fair, clear and not-misleading standard, and each new screen is accessibility-tested on its own before release |

## Open questions

- Which team at ČS the five open compliance and privacy escalations, and the session-store registration, are routed to.
- Which vendor, hosting location and security controls the new store and resumption path use, and whether either falls under a third-party-risk or cyber-incident regime.
- What cadence or latency the live estimate needs to hold, since no baseline exists today.
- What today's end-to-end completion rate is, against which the 30% target is read.

## References

- [Product requirements: durable session for identity verification and resumption](../../6-prd/2-prd-agreed.md)
