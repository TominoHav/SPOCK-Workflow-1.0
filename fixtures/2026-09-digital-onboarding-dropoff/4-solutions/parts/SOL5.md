---
part_of: A8
item_id: SOL5
statement: "One self-service recovery action, available to the client both immediately after a failed scan and, separately, after full abandonment, that returns them to exactly where their application stood."
compliance_touchpoints:
  - "TP-11 — a new recovery entry point is added at the scan-failure moment and as a standalone return route"
  - "TP-15 — where a recovery window is time-limited, that limit has to be disclosed to the client"
  - "TP-32 — the app/web view changes for the recovery entry points"
  - "TP-33 — resuming re-runs an authentication or identification step"
  - "TP-38 — how often the recovery action is used, and by whom, has to be monitored after launch"
  - "TP-39 — a record of what state was recovered supports resolving a disputed resumption"
  - "DP-01 — the recoverable application state is a new field held against an identifiable applicant for longer than a single visit"
  - "DP-15 — that stored state is a store a subject-access or deletion request would have to reach"
  - "DP-29 — the recovery endpoint is a new interface exposing the applicant's partially completed data"
  - "DP-30 — the recovery route plausibly carries an identifying or session token in its own URL or code"
  - "LG-05 — the applicant is identified again, remotely, at the point of recovery"
  - "LG-22 — the recovery mechanism itself, if built on a third-party or open-source component, carries a licence to check"
  - "IT-01 — recovering into a saved application is a changed form of login"
  - "IT-03 — a one-time code or equivalent step-up is a plausible way to re-verify the returning applicant"
  - "IT-04 — this is, by design, the recovery-after-losing-access case, generalised to any exit point"
  - "IT-06 — the saved application state is what is being remembered, by design, across time and device"
  - "IT-16 — a recovery endpoint is a new API the journey did not have before"
  - "IT-19 — a recovery action that fails to restore the correct state is a failure the client would notice directly"
  - "IT-20 — the recovery action is a new way the journey can fail that a single-attempt journey did not have"
  - "IT-21 — a recovery route reachable outside the original session is a plausible account-recovery-style fraud vector"
  - "IT-22 — recovering and expiring saved state is new information a log has to carry"
---

## SOL5 - Retry and return are the same button

### What it is

One recovery action, available to the client wherever they might need it — immediately after a failed
document scan, or later, after abandoning the journey outright — that returns them to exactly the state
their application was in, rather than a blank form.

### What it does

For O2, the applicant who hits a failed scan is given the same action, immediately, that lets them either
retry the specific step or confirm their prior progress is intact, instead of being left to guess. For O4,
an applicant who abandons entirely, at any step, uses the identical action later to pick their application
back up exactly where they left it, rather than starting a new one.

### How it does it

The action is a single, consistently placed control — a button or link — that, wherever it appears, checks
what state the applicant's application was last in and restores it after a short re-verification step.
Immediately after a failed scan it appears as part of the failure screen itself. As a standalone route (a
saved link, or logging back in and being offered it directly), it serves the applicant who left entirely, at
whatever step they left at. One mechanism, reached two ways, rather than two separate features.

### The problem it solves, and for whom

New ČSAS retail clients who fail a document scan currently retry once and then abandon rather than risk
repeating the whole process (O2), and those who abandon onboarding partway, for any reason, currently start
an entirely new application rather than resuming the one they already invested in (O4).

### Opportunities it is built on

- **O2** — Not knowing whether progress was saved after a failed scan. Takes the desired change directly:
  the same recovery action removes the uncertainty by letting the applicant act on their actual saved state
  rather than guess at it.
- **O4** — No way back into a dropped application. Takes the desired change directly: applicants who abandon
  partway resume the same application rather than starting several.

### Against the market

**Standards it is built on.** Re-verifying an applicant at the point of recovery sits downstream of the same
federated identity infrastructure five of nine participants already use (`bankid-identity-verification`) —
nothing about how identity itself is verified changes here.

**Trends it rides.** This is the same opening as the synthesis's clearest finding: no participant profiled
shows any save-and-resume capability at all (`no-visible-resume-capability`), which is precisely O4. The
universal absence of differentiation at the identity-verification and account-opening step
(`no-differentiation-at-opening-step`) covers O2 the same way: no competitor profiled offers a recovery
action at a failed scan either. This solution differs from a proactive-outreach approach in being entirely
client-initiated: the applicant reaches for the action rather than the bank reaching out to them.

### Strategic alignment

Applicants who recover and complete, rather than abandoning at a failed scan or starting a duplicate
application, are straight-through completions in the same digital channel — which is exactly what the run's
metric, end-to-end digital onboarding completion rate, counts, through the one-step link to key result AI-2
(AI First) the brief already states.

The full touchpoint sweep behind this section is at [rec:R-A8-05].
