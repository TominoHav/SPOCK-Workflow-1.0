---
part_of: A8
item_id: SOL1
statement: "A persistent, semantically-accurate progress display that runs through identity verification and into account opening, showing the client exactly what is done, what remains, and that identity creation is not the same as an open account."
compliance_touchpoints:
  - "TP-11 — client-facing screens change to add a persistent progress display naming each remaining step"
  - "TP-32 — the app/web view is changed wherever the display appears"
  - "TP-38 — the display's own engagement and any residual drop-off after it ships has to be monitored"
  - "LG-11 — showing a step count and a completion state functions as a statement of what remains, which the bank has to be able to stand behind"
  - "DP-01 — the client's current position in the journey is a new stored field tied to an identifiable applicant"
  - "DP-15 — that stored position becomes a data point a subject-access or deletion request would have to reach"
  - "IT-19 — a client-facing display that fails silently is a failure the client would notice"
  - "IT-20 — a persistent, cross-step display is a new way the journey can fail that did not exist as a single feature before"
  - "IT-22 — showing a computed state on screen means something new is being written to a log to compute it from"
---

## SOL1 - One progress state, always visible and honest

### What it is

A single, persistent progress indicator that runs alongside the whole onboarding journey — from the start
of identity verification through to the account genuinely being open — and that names the current step,
what remains, and the two states applicants currently conflate: "your identity has been created" and "your
account is open." It is not a generic percentage bar; it is a small set of named, sequential milestones the
client can see at every point in the journey, including the moment identity creation completes and account
opening has not yet started.

### What it does

It removes the two specific failures O1 and O3 name by replacing an absence of state with a persistent one.
For O1, an applicant partway through identity verification stops guessing how much is left, because the
remaining steps are named on screen the whole time they are working through it. For O3, an applicant who
has just finished creating their identity sees, in the same place, that account opening is the next
distinct step rather than the end of the journey — closing the exact gap the requester described applicants
falling into.

### How it does it

The indicator is a fixed strip present on every screen from the start of identity verification onward,
holding a short, named sequence of milestones rather than a percentage. When identity creation completes,
the indicator visibly advances to a milestone reading something like "identity created — account opening
next" rather than disappearing or reading complete, so the applicant cannot mistake one for the other
without being told otherwise on the same screen they are looking at. Staff-facing support tooling shows the
same milestone state, so a contact-centre agent sees exactly what the applicant sees when a call comes in
mid-journey.

### The problem it solves, and for whom

New ČSAS retail clients opening their first current account currently reach identity verification with no
reliable read on how much is left, and reach the end of identity creation believing — reasonably, given what
the screen shows them — that the account itself is already open. Both are new retail clients narrowed to
the same segment the brief and A4 both name: those who have started the current onboarding journey and have
not yet abandoned it.

### Opportunities it is built on

- **O1** — Losing track of what is left in identity verification. Takes the desired change directly:
  applicants who know how much of verification remains and what happens next continue rather than abandon
  at that step.
- **O3** — Identity creation mistaken for an open account. Takes the desired change directly: applicants
  who see, at the moment identity creation completes, that account opening is still ahead of them, continue
  rather than believing they are finished.

### Against the market

**Standards it is built on.** Five of the nine market participants profiled verify identity through
federated infrastructure (BankID) rather than a proprietary flow (`bankid-identity-verification`), which is
the same category of step this solution instruments — ČS already holds this standard by virtue of BankID
membership, and this solution does not change how identity is verified, only how its state is shown back to
the applicant during and after it.

**Trends it rides.** The synthesis's clearest single finding is that no participant profiled differentiates
on the identity-verification or account-opening step at all (`no-differentiation-at-opening-step`) — every
stated market claim concerns what happens after an account is open. This solution moves directly into that
unclaimed ground: it is not matching a competitor's progress display, because this pass found none to match,
and it is not competing on anything the market has already settled either.

### Strategic alignment

This run's product goal is reducing avoidable abandonment in the current digital onboarding journey,
measured by end-to-end digital onboarding completion rate against key result AI-2 (AI First: share of sales
and service processes in primary digital channels that are fully straight-through). The chain is one step:
applicants who no longer abandon at O1's and O3's steps complete the journey straight through in the same
digital channel they started in, which is exactly what AI-2 measures, per the brief's own stated link
between this metric and that key result.

The full touchpoint sweep behind this section is at [rec:R-A8-01].
