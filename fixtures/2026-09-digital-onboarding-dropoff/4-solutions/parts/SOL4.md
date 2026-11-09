---
part_of: A8
item_id: SOL4
statement: "An explicit confirmation, in the client's own terms, at the two points in the journey where the current design leaves an inference gap: immediately after a failed document scan, and immediately after identity is created."
compliance_touchpoints:
  - "TP-11 — two new confirmation screens are added at the scan-failure and identity-completion moments"
  - "TP-32 — the app/web view changes at both points"
  - "TP-38 — whether the confirmations actually reduce abandonment at these two points has to be monitored after launch"
  - "TP-39 — a record of the confirmation the applicant was shown supports resolving a later dispute about what they were told"
  - "DP-01 — a flag marking that the applicant was shown each confirmation is a new stored field tied to the applicant"
  - "DP-15 — that flag is a store a subject-access request would have to reach"
  - "IT-19 — a confirmation that fails to display, or displays the wrong state, is a failure the client would notice directly"
  - "IT-20 — the two new confirmation points are new places the journey can fail that did not exist before"
  - "IT-22 — recording that each confirmation was shown is new information a log has to carry"
---

## SOL4 - Say what just happened, at the two points that cause doubt

### What it is

Two short, explicit confirmation screens placed exactly where the current design currently leaves the
applicant to guess: immediately after a document scan fails, stating plainly whether their progress was
kept, and immediately after identity creation completes, stating plainly that the account itself is a
separate step still ahead.

### What it does

For O2, the applicant who hits a failed scan is told, in one sentence, whether the work they have already
done still counts — removing the guess that currently ends in a retry-then-abandon pattern. For O3, the
applicant who finishes identity creation is told, at that exact moment, that the account is not yet open —
removing the same conflation the desired change names, at the moment it happens rather than afterwards.

### How it does it

Both are interstitial confirmation screens the applicant must see and acknowledge before continuing, not a
passive banner. After a failed scan, the screen states plainly what was and was not retained and gives one
explicit next action. After identity creation completes, the screen states plainly that identity is created
and the account is a distinct next step, before the applicant is moved anywhere else. Neither screen changes
what the underlying identity or scanning process does — only what the applicant is told about it, at the
moment it matters.

### The problem it solves, and for whom

New ČSAS retail clients who fail a document scan currently do not know whether to retry or restart (O2), and
those who complete identity creation currently believe, reasonably, that the account is already open (O3) —
both are gaps in what the client is told at one specific moment, rather than gaps in what the underlying
process does.

### Opportunities it is built on

- **O2** — Not knowing whether progress was saved after a failed scan. Takes the desired change directly: an
  explicit statement of what was saved replaces the current silence.
- **O3** — Identity creation mistaken for an open account. Takes the desired change directly: an explicit
  statement at the moment identity completes replaces the current absence of any distinction.

### Against the market

**Standards it is built on.** Document scanning and identity creation sit on the same federated
infrastructure five of nine participants already use (`bankid-identity-verification`) — this solution
changes nothing about how the scan or the identity check itself works, only what the applicant is told
immediately after each one.

**Trends it rides.** The universal absence of differentiation at the identity-verification and
account-opening step (`no-differentiation-at-opening-step`) explicitly names O2 and O3 among the
opportunities no participant profiled competes on — this solution moves directly into that space, at the two
narrowest points in it. What either would cost the bank to build is not established by anything this run
holds.

### Strategic alignment

Both confirmations reduce abandonment at the exact steps the run's metric — end-to-end digital onboarding
completion rate — measures. That metric's one-step link to key result AI-2 (AI First) is stated in the
brief; an applicant who continues past a failed scan or past identity creation, rather than abandoning at
either, is a straight-through completion the same key result counts.

The full touchpoint sweep behind this section is at [rec:R-A8-04].
