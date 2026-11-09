---
part_of: A8
item_id: SOL2
statement: "Proactive, bank-initiated outreach — push, SMS or email — triggered when a client completes identity but stalls before account opening, or abandons the journey outright, each message stating plainly what has and has not happened and offering a direct way back in."
compliance_touchpoints:
  - "TP-11 — new client-facing message templates for two distinct moments in the journey"
  - "TP-38 — outreach effectiveness and complaint volume need their own post-launch monitoring"
  - "TP-39 — a record of which message was sent and when has to exist to answer a client who disputes being contacted"
  - "DP-01 — a new stored field marks that an applicant reached O3's or O4's trigger condition"
  - "DP-13 — the privacy notice has to describe this new purpose — contacting an applicant about an incomplete application — as service communication, distinct from the marketing purposes it already lists"
  - "DP-15 — the new trigger and outreach record is a store a subject-access or deletion request would have to reach"
  - "DP-17 — an applicant can still ask not to receive this contact, as a general objection to processing rather than a marketing opt-out, because it is not marketing"
  - "DP-29 — the trigger logic itself is a new interface reading and acting on personal data"
  - "DP-30 — a direct link back into the application plausibly carries an identifying token in its own URL"
  - "IT-16 — a new trigger and notification API is introduced to detect the stall or abandonment condition and fire the message"
  - "IT-19 — a client-facing message that fires wrongly or not at all is a visible failure"
  - "IT-20 — the trigger logic is a new way the journey can fail that did not exist before"
  - "IT-21 — a link inviting a client back into an unfinished application is a plausible phishing pattern fraud teams have to account for"
  - "IT-22 — firing, suppressing and recording each outreach message is new information a log has to carry"
---

## SOL2 - The bank follows up when the moment passes

### What it is

A rule-based, bank-initiated outreach capability: when an applicant reaches one of two specific states —
has completed identity creation but has not continued into account opening (O3), or has abandoned the
onboarding journey outright at any step (O4) — the bank sends a message through an existing channel (push,
SMS or email) stating plainly what has and has not happened, and offering one direct link back into the
application.

### What it does

For O3, it catches the applicant who believed identity creation was the finish line and tells them, outside
the session they have already closed, that one step remains. For O4, it catches every abandonment regardless
of where it happened and offers a way back rather than leaving the applicant to start over on their own
initiative or not at all. Both moments are treated as the bank's initiative rather than the client's;
behaviourally, an applicant who would not have returned on their own now receives a specific, worded
invitation to.

### How it does it

A trigger watches for the two states — no continuation into account opening within a set window after
identity completes, and no journey activity within a set window at any earlier step — and fires exactly one
message per trigger, worded to the state it fired on rather than a generic reminder. The message states what
is done and what is left in one sentence and carries a single link that returns the applicant to precisely
where they stopped. No further messages are sent once the applicant returns or the application is completed
or formally abandoned.

**This is service communication about an application the applicant already started, not marketing about a
product they have not chosen, and the two are kept distinct by construction rather than by a label attached
afterwards.** The message concerns only the status of an application already in progress, carries no
promotional content, no offer, no rate and no comparison, and is sent under the same basis that lets the
bank tell an applicant their own application needs attention — not under marketing consent, and not opted
out of by a marketing preference. **What makes it one and not the other is the content and the trigger**: it
fires only because this specific applicant started this specific application, and it says only what has and
has not happened to it. A message promoting a different product, a better rate, or an unrelated offer would
be marketing and would need marketing consent under a different basis entirely; this message never carries
either, so it is never that.

### The problem it solves, and for whom

New ČSAS retail clients who leave the current onboarding journey — whether believing, wrongly, that they are
finished (O3), or abandoning it entirely partway through (O4) — currently have no route back other than
remembering to return and, for those who abandon outright, starting an entirely new application from
scratch.

### Opportunities it is built on

- **O3** — Identity creation mistaken for an open account. Takes the desired change by reaching the
  applicant after the session has already closed, when the in-journey UI can no longer reach them.
- **O4** — No way back into a dropped application. Takes the desired change directly: applicants who
  abandoned partway are invited to pick up where they left off rather than starting over.

### Against the market

**Standards it is built on.** None directly — outreach of this kind is not one of the seven standards this
pass found, so this solution is not matching a settled market pattern.

**Trends it rides.** The synthesis's strongest single finding is that no participant profiled shows any
save-and-resume capability for a dropped application (`no-visible-resume-capability`) — this is precisely
O4, and the market this pass reached has not visibly solved it at all, proactively or otherwise. The
universal absence of differentiation at the opening step (`no-differentiation-at-opening-step`) also covers
O3 directly: nobody competes on catching a client who mistakenly believes they are finished.

### Strategic alignment

Applicants recovered by this outreach convert an abandoned or stalled application into a completed one,
which is exactly what the run's metric — end-to-end digital onboarding completion rate — counts, and that
metric's link to key result AI-2 (AI First) is the one step the brief already states. The chain does not
require a second link: a recovered application is a straight-through completion in the same digital channel.

The full touchpoint sweep behind this section is at [rec:R-A8-02].
