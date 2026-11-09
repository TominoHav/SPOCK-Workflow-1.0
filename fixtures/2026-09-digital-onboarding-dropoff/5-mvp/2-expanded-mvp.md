---
run_id: 2026-09-digital-onboarding-dropoff
artifact_id: A11
ost_role: artifact
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
produced_by:
  agent: product-manager
  skill: mvp-expansion
sources: [A9, A10, A3b]
external_sources: []
assembled_at: 2026-09-08
assembled_from: [R-A11-01]
could_not_verify:
  - rule: "every compliance touchpoint is addressed in functionality, not merely listed"
    needs: judge
    reach: artifact
decision:
  gate: G5b
  by_agent: false
  selection: OPT1
  accepted_by:
    - name: Igor Tadic
      role: product manager
  accepted_at: 2026-09-08
  changed_during_refinement: none
  refinements: []
---

# The full durable-session capability, both channels

OPT1, expanded: the durable session, the live estimate and cross-device resumption, built on the app and
the web together from the start, gated at return by a full re-run of the original identity check. Twenty
compliance touchpoints are designed into the functionality below; one and five escalations remain open
items with no named owner, and eight build-time questions this stage cannot yet answer are named rather
than assumed. [rec:R-A11-01]

## What it is

The capability the selected solution describes, taken to build depth, on both channels from the first
release. Applicant progress during identity verification is written to durable session storage rather than
held only in the current screen or device. That stored state does two things: while the applicant is
still in the journey, it powers a live, updating estimate of what remains; if the applicant leaves —
closes the app, changes device, comes back days later — it is what a returning applicant can be restored
into, rather than a blank new application. [rec:R-A11-01]

## How it works

The session write happens continuously as the applicant moves through identity verification, on whichever
channel they are using. The live estimate reads from that same state, so what it shows is never stale
relative to what the applicant has actually done. The state is kept for up to 30 days from the applicant's
last activity, and this window is disclosed to the applicant at the point they would first notice it —
leaving the journey — rather than only in a terms document; past 30 days the state is deleted and a
returning applicant starts over.

Resumption is never a matter of holding a link. A link, an email or an SMS may tell an applicant that a
saved application exists and invite them back, but it carries no authority to resume on its own — it points
them at the identity check, and the check decides whether the session is rebuilt. Whichever channel the
applicant returns through, app or web, they re-run the same identity check the original application used,
in full, before any saved state is shown to them. Both channels carry the full capability from the first
release: there is no channel restricted to the estimate only and none excluded from resumption, because
the evidence this run already holds is an applicant who left on one channel and returned on another, and a
pilot that could not see that case would not be testing what was selected. [rec:R-A11-01]

## What the pilot tests

Whether a durable, cross-device session — not an in-session estimate alone, not a same-day, same-device
recovery — is what actually recovers an applicant who has genuinely left. The opportunities behind it are
O1 (losing track of what is left in identity verification) and O4 (no way back into a dropped
application), both sized against this run's one business measure, end-to-end digital onboarding completion
rate, targeted at 30% (key result AI-2). Neither opportunity's behavioural, qualitative or horizon measure
is settled in A3b, so this pilot is what would have to establish them, not something that can read them
off a document that does not yet state them. [rec:R-A11-01]

## What it means for the strategy

**Serves AI-2** — share of sales and service processes in primary digital channels that are fully
straight-through. An applicant who resumes and completes is a straight-through completion in the same
digital channel, rather than a duplicate application or no return at all, and that is the direct mechanism
this pilot's own measure feeds. **Strains TL-1** — clients affected by outages of key digital channels. A
new durable store and a new resumption endpoint on both channels is a new failure surface that did not
exist before, and this has to be built to keep TL-1 from moving the wrong way rather than assumed neutral.
[rec:R-A11-01]

A product goal follows directly from what the pilot tests: new ČSAS retail clients who abandon digital
onboarding partway complete the same application rather than starting a new one. A product-level metric
follows too: the share of resumed sessions that go on to complete, read alongside the completion rate AI-2
already measures. A horizon, an owner and a kill criterion are not obvious from this expansion — nothing
here fixes how long the pilot should run, who owns the call to stop it, or what result would end it — and
stage 6 will need to source those rather than invent them. [rec:R-A11-01]

## What has to be handled

Twenty touchpoints carried from the selected solution's own screen are designed into the functionality
above, not left as notes. [rec:R-A11-01]

#### Compliance, conduct and product regulation

> **TP-11** — the progress display, the retention-window disclosure and the resumption screens are new
> client-facing wording, reviewed against the fair, clear, not-misleading standard before release, with any
> promotional framing marked as such.

> **TP-15** — the 30-day retention window and the requirement to re-verify identity to resume are shown
> with the same visual weight as the resumption capability itself.

> **TP-32** — the progress display and resumption screens, on both channels, are built and tested to the
> same accessibility bar as the rest of the journey before release.

> **TP-33** — the re-run identity check invoked at resumption is accessibility-tested as its own step
> rather than assumed covered by the original journey's check.

> **TP-38** — completion, resumption and drop-off after each new screen are instrumented on both channels
> from first release, so the data the pilot is read against exists before launch.

> **TP-39** — the retention-window disclosure and the resumption invitation shown to an applicant are
> logged with what was shown and when.

#### GDPR and privacy

> **DP-01** — the session-state field is documented with its purpose (resuming an incomplete application)
> and its legal basis before it is built.

> **DP-07** — the 30-day-then-delete rule already fixed in the selected solution is this field's own
> retention period, and deletion runs automatically at expiry.

> **DP-15** — **open, no named owner.** No team has yet been named as the owner of registering this new
> store against ČS's access-and-deletion process. An ask to ČS, not something this run can assign.

> **DP-29** — access control and audit logging for the resumption endpoint are specified at design time:
> who may call it, under what session, and what is logged.

#### Legal and contracts

> **LG-05** — resumption keeps identification (the re-run check), authentication and any signature step as
> three separate steps, exactly as the original application does.

> **LG-07** — the 30-day window is stated plainly at the point an applicant would first notice it —
> leaving the journey — not only in a terms document.

> **LG-11** — the live estimate and the 30-day window are treated as commitments the bank has to be able
> to stand behind, reviewed as contractual terms rather than as UI copy.

#### ICT and security

> **IT-01** — the resumption path is specified to the same authentication strength, session-ending
> behaviour and recovery standard as login elsewhere in the journey.

> **IT-04** — recovering a session after full abandonment is designed to the same standard as any other
> recovery path, because this is exactly that case.

> **IT-06** — remembering an applicant's progress across a device or session is recorded as a deliberate
> exemption decision at design time, not treated as a side effect of the feature.

> **IT-16** — the resumption endpoint's callers, its security testing, its logging and its hosting are each
> specified before build, on both channels.

> **IT-19** — a failed resumption or a failed live estimate is classified as an incident type before
> launch, so it can be triaged on the reporting clock.

> **IT-20** — recovery time and data-loss objectives for the new session store are stated before launch
> rather than assumed.

> **IT-22** — session writes, resumption attempts and expiries are logged at a level that lets someone
> reconstruct what happened to one applicant's session afterward.

#### Open items

Five escalation triggers fired on the selected solution's screen — G-E6 and G-E12 in GDPR and privacy,
I-E1, I-E12 and I-E13 in ICT and security — each because a sub-domain (G11, G1, I3, I5, I4) could not be
resolved. No card names which specialist any of the five routes to, carried unchanged from A9: this is an
ask to ČS, not a gap this stage can close on its own, and DP-15 above joins them as a sixth item with no
named owner. [rec:R-A11-01]

Eight things this pilot's technical build will have to settle and this stage cannot: which vendor, SaaS
tool or partner would process client data for it; where the new store and endpoint would be hosted, and
whether outside the EEA; what security controls protect them; the deployment approach, testing scope and
whether a new environment is created; whether open-source or third-party components are used to build it;
whether the new dependency supports something clients rely on in the DORA sense; how hard it would be to
leave a chosen provider; and whether this service would be registered under the cyber regime. Each was
already carried forward unresolved from the selected solution — this expansion is where they become
inputs the build has to answer, not where they get answered. [rec:R-A11-01]

## What the requirement stage needs

Acceptance criteria for four things: the live estimate's accuracy and update cadence during identity
verification; the exact resumption gate — the applicant completes the original identity check in full, on
whichever channel they return through, before any saved state is shown, on both app and web; the 30-day
retention and automatic-deletion behaviour, including what a returning applicant sees once it has expired;
and the specific completion and resumption measures this pilot reads against AI-2. The product goal and
product-level metric named above carry forward as stated; horizon, owner and kill criterion do not, and
stage 6 sources them rather than inventing them. DP-15's registration and the five escalation routings
above have no named owner yet and are open questions the requirement stage inherits rather than resolves.
[rec:R-A11-01]

## What we could not establish

Whether any of the eight build-time questions above changes what this pilot can ethically or legally do —
rather than only how it is hosted or built — could not be established, because each depends on a vendor
or infrastructure choice nobody has made yet. Which specialist the five open escalations and DP-15's
registration route to could not be established either; no card carried this run reads names one, and it is
recorded as an ask to ČS rather than guessed. [rec:R-A11-01]

## How this was produced

Stage 5.2 of the discovery workflow, the `mvp-expansion` skill, run by the Product Manager. OPT1 was the
option selected — stated by the person accountable for the run in conversation on 2026-09-08, choosing
between the two options A10 carries. **The formal record of that selection at G5a, and the acceptance of
this expansion at G5b, had not been written by the workflow's own task when this document was produced**;
the person directed that both be signed together once the stage was written, rather than in the order the
contract otherwise runs them, because the task that records a mid-stage selection could not be completed
from the terminal available in this session. Nothing above is a person's decision recorded by this step —
that remains true regardless — and this document does not carry a `decision:` block until a person signs
one. Read the selected solution (A9, its own sections and the compliance screen it carries rather than
only the decision), the framed opportunities (A3b, for O1 and O4's own success measures) and the Strategy
Basis, against the two options A10 carries, expanding exactly the one selected and leaving the other
untouched. Produced in one pass (`single-shot`, effort `medium`); no bound was reached. [rec:R-A11-01]
