---
part_of: A8
item_id: SOL6
statement: "A live handoff to a banker — by branch or contact centre — who sees the applicant's own in-progress application exactly as it stands and finishes it with them, at the two moments a client is most likely to reach for a person without having abandoned outright: losing track mid-verification, and a failed scan they cannot resolve alone."
compliance_touchpoints:
  - "TP-11 — staff scripts and any client-facing message about calling in or visiting a branch change to reflect that a live application can be continued rather than restarted"
  - "TP-36 — the support and contact-centre journey itself changes — staff now see and continue a digital application in progress rather than starting a fresh one"
  - "TP-38 — how often the handoff is used, and whether it improves completion, has to be monitored after launch"
  - "TP-39 — a record of what the banker saw and did has to exist to reconstruct a disputed handoff"
  - "DP-01 — the client's in-progress application remains a stored field tied to an identifiable applicant, now read by a second internal audience"
  - "DP-13 — the privacy notice has to describe that branch and contact-centre staff can see an in-progress digital application"
  - "DP-15 — the same stored application is a store a subject-access or deletion request would have to reach"
  - "DP-29 — staff tooling reading the applicant's live application state is a new interface exposing personal data"
  - "DP-31 — branch and contact-centre staff gain access to an applicant's in-progress data they could not see before"
  - "LG-05 — the applicant is identified again, by phone or in person, before the banker continues their application"
  - "IT-16 — a new integration is needed so staff tooling can read the same state the digital journey produces"
  - "IT-19 — a banker who cannot see the correct application state is a failure the client would notice directly"
  - "IT-20 — the staff-facing handoff is a new way the journey can fail that did not exist before"
  - "IT-21 — a handoff that identifies a caller by less than the full identity check is a plausible social-engineering vector"
  - "IT-22 — what a banker saw and changed on a live application is new information a log has to carry"
---

## SOL6 - A banker finishes it with you, on the same application

### What it is

A live handoff capability between the digital onboarding journey and the branch or contact-centre channel
that already exists: when an applicant reaches out — by phone or in person — at one of two specific
moments, the banker who takes the call or greets them at the branch opens the applicant's own application
exactly where it stands and finishes it with them, on the spot. Not a fresh start on a separate track, and
not a parallel process — the human channel continues the one digital application already begun, rather
than beginning a second one.

### What it does

For O1, an applicant who has lost track of how much of identity verification remains, and calls or visits
rather than guessing further, is told exactly where they stand by a banker looking at their own record —
and the banker completes the remaining steps with them live, on that record, rather than sending them back
to the app to try again alone. For O2, an applicant whose document scan failed and who cannot tell whether
to retry or restart gets the actual state of that scan resolved by a person looking at exactly what
happened, on the same application, rather than retrying blind and then giving up.

### How it does it

Branch and contact-centre staff tooling is given a read into the same milestone state the digital journey
itself tracks, so a banker sees precisely where an applicant's own application stands without asking them
to explain it from scratch. Before any of that state is shown, the applicant is identified — over the
phone or in person — through the same identity check the digital journey itself uses, never a lighter one,
so a caller cannot reach another person's in-progress application by claiming to be them. Once identified,
the banker resumes at the exact step the digital session stopped: working through the remaining
identity-verification questions live, or resolving the specific reason a scan failed and re-capturing the
document there and then if needed. This is not a new channel offering a redesigned experience — it is the
branch and contact-centre channel the market already relies on for exactly this, given visibility into
where a specific digital application actually stands.

### The problem it solves, and for whom

New ČSAS retail clients who reach identity verification and lose track of where they stand (O1), or whose
document scan fails and who cannot tell whether their progress survived (O2), and who reach for a person
rather than push through alone or quietly abandon. This run's own market work found this is already how
people cope with exactly this kind of friction: the branch visit or the contact-centre call is what an
applicant already falls back to when a digital path breaks down. The gap is not that people never ask for
help — it is that today's fallback restarts them rather than resuming what they had already done.

### Opportunities it is built on

- **O1** — Losing track of what is left in identity verification. Takes the desired change by letting a
  banker state exactly what remains, read from the applicant's own record, rather than the applicant
  discovering it alone or not at all.
- **O2** — Not knowing whether progress was saved after a failed scan. Takes the desired change by having a
  person resolve, on the same application, exactly what happened to the scan and what — if anything —
  needs to be redone.

### Against the market

**Standards it is built on.** None of the nine organisations this pass profiled shows a handoff that
carries a digital application's own state into its branch or contact-centre channel — this is not a
settled market pattern to match, and the market's own substitute, the branch visit or contact-centre call,
is the fallback this run's own applicants already use.

**Trends it rides.** No participant profiled shows any save-and-resume capability at all
(`no-visible-resume-capability`), and this run's own competitive work found that gap extends into the human
channel too: the branch visit or contact-centre call this market already falls back to does not, today,
carry a digital application's state forward either — an applicant who reaches a branch or a call centre
typically starts data collection over rather than resuming it. This solution is aimed exactly at that gap,
in the one channel this market's own applicants already reach for.

### Strategic alignment

This is a different chain than the other five solutions carry, and it is worth stating plainly rather than
folding it into the same claim. This run's metric — end-to-end digital onboarding completion rate — still
counts an application this solution helps complete: fewer applicants abandon at O1's and O2's moments, and
more accounts open. But key result AI-2 (AI First) measures the share of sales and service processes in
primary digital channels that are fully straight-through, and a completion reached through a banker on the
phone or at a branch is not a straight-through digital completion in the sense AI-2 counts. This solution
serves the run's own completion-rate metric directly and serves AI-2's own mechanism only partially, and
that difference is the honest account of its strategic alignment rather than a claim to match the other
five.

The full touchpoint sweep behind this section is at [rec:R-A8-06].
