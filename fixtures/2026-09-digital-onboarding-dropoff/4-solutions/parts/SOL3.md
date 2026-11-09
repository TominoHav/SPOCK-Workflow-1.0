---
part_of: A8
item_id: SOL3
statement: "A durable session that survives the client leaving — surfaced during identity verification as a live estimate of what remains, and, if the client leaves entirely, as an exact point of return rather than a restart."
compliance_touchpoints:
  - "TP-11 — the verification screens gain a live estimate and the resumption flow adds new client-facing screens, including the stated 30-day retention window"
  - "TP-15 — the stated time or step estimate, and the stated 30-day retention window, are disclosed limits the bank has to be able to stand behind"
  - "TP-32 — the app/web view changes for the estimate and for the resume entry point"
  - "TP-33 — returning to a saved session re-runs the applicant's original identity check in full"
  - "TP-38 — resumption and abandonment-after-resumption both need their own post-launch monitoring"
  - "TP-39 — a record of what state the session was saved at has to exist to resolve a disputed resumption"
  - "DP-01 — the session's saved state is a new field held against an identifiable applicant, for up to the stated 30 days"
  - "DP-07 — a half-finished application is kept for a stated 30 days from last activity, then deleted; the period is declared rather than open-ended"
  - "DP-15 — the saved session is a store a subject-access or deletion request would have to reach"
  - "DP-29 — the resumption endpoint is a new interface exposing the applicant's partially completed data, gated by the same identity check as the original application"
  - "LG-05 — the applicant re-runs the same identity check the original application used before any saved state is shown, never a link alone"
  - "LG-07 — the stated 30-day retention window is a new limit told to the client"
  - "LG-11 — the live step and time estimate, and the stated retention window, function as stated expectations the bank is held to"
  - "IT-01 — returning to a saved session is a changed form of login, gated by the same identity check as the original application rather than a link"
  - "IT-04 — this is, by design, the recovery-after-losing-a-session case"
  - "IT-06 — the session itself is what is being remembered, by design, across time and device, for up to the stated 30 days"
  - "IT-16 — a resumption endpoint is a new API the journey did not have before"
  - "IT-19 — a session that fails to restore correctly is a failure the client would notice directly"
  - "IT-20 — durable session state is a new way the journey can fail that a stateless journey did not have"
  - "IT-22 — restoring and expiring session state is new information a log has to carry"
---

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
