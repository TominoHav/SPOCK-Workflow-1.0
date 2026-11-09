---
run_id: 2026-04-card-disputes
artifact_id: A10
ost_role: artifact
status: accepted
workflow: discovery
modified_by: human
revisions: 2
produced_by:
  agent: product-owner
  skill: mvp-option-design
sources:
  - A9
  - A8
  - A7
external_sources: []
could_not_verify:
  - rule: "2..3 options, each a whole way to pilot the idea, never a subset or a phase of another"
    needs: judge
    reach: artifact
  - rule: "every constraint referenced resolves into the Banking Constraints"
    needs: check
decision:
  gate: G5a
  by_agent: false
  selection: OPT-A
  accepted_by:
    - name: Igor Tadic
      role: Product Owner
  accepted_at: 2026-08-18
  reason: "No reason was stated at the gate. The selection arrived as the option id alone and is recorded as it was made, the same shape as the G4 selection on A9. What was on the table: two options building identical components, differing only in what makes a notification fire, with constraints_met empty on both because the Banking Constraints do not exist, so neither option has been validated against the bank's operating frame."
  changed_during_refinement: none
  refinements: []
  note: "A recommendation was offered in conversation before the choice, stated as the assistant's own view and outside the artifact record. It named OPT-A, on the grounds that OPT-B's outcome would be confounded with the quality of a risk profile that has not been written, and that OPT-A's notification-volume risk is measurable inside the pilot through opt-out and action rates. The Product Owner selected OPT-A, so the recommendation was taken. Recording that rather than leaving the record to imply an unaided choice. The option set reached this gate carrying no rank, preference marker or nomination, which C58 confirmed."
assembled_at: 2026-08-20
assembled_from: [R-A10-01]
---

# MVP | MVP Options — universal or risk-filtered transaction notification

Two pilot options were put forward and they differ on one decision: whether every card transaction fires a notification, or only the ones a risk model flags. Neither is a subset of the other and neither is a staged version of the other, so the choice is a real choice rather than a question of how much to do. What running either would teach is different, and that is what the choice should turn on. [rec:R-A10-01]

**ID-3 — a real-time push notification on every card transaction, default-on for all cardholders without
any setup, carrying a one-tap action into a pre-filled dispute screen.**

Every card transaction fires a push notification within seconds, to every cardholder, with no setup step
required. A cardholder who did not authorise the charge taps one action and arrives at a dispute screen
with date, amount, and merchant already filled in. The idea is stated in full in A8 and the selection is
confirmed in A9.

Two constraints the options below inherit, stated on ID-3 in A8 and recorded in A9:

- **The ePrivacy consent question is the material design constraint.** Default-on is what separates ID-3
  from the Czech incumbent approach. It is a constraint every option satisfies, not a dimension the
  options differ on.
- **ID-3 opens a dispute screen it does not itself build.** Both options build the same purpose-built
  pre-filled dispute screen; this is a shared design decision, not an axis of difference.

The two options differ on what triggers the notification. A8's statement says "on every card transaction"
and step 1 says "within seconds" — that is a design decision this pilot must make. Reasonable pilots make
it differently: one fires on every transaction, the other fires only on transactions matching a defined
risk profile. This changes the cardholder's relationship with the notification in kind, not in degree,
and each produces data the other cannot.


---

## OPT-A — Universal transaction notification
The notification fires on every card transaction within seconds of posting. A cardholder receives a
notification on every purchase — routine daily spending as well as unusual charges. The notification
identifies the charge (time, amount, merchant) and carries a dispute action. The one-tap dispute action
opens the pre-filled dispute screen built for this pilot: date, amount, and merchant pre-filled from the
transaction record.

All cardholders are enrolled by default. Notification frequency tracks card activity: a cardholder who
makes ten transactions in a day receives ten notifications.

**What this option tests:** Whether real-time awareness of every transaction — the notification as a
routine receipt on every charge — changes cardholder dispute behavior; and whether notification
frequency at cardholder activity levels produces engagement or diminishing attention over the pilot
period.

---

## OPT-B — Risk-signal transaction notification
The notification fires within seconds on transactions matching a bank-defined risk profile; transactions
outside that profile post silently. All cardholders are enrolled by default. The notification arrives
specifically when a charge warrants the cardholder's attention. The one-tap dispute action opens the
same pre-filled dispute screen as OPT-A.

The cardholder who receives this notification knows the bank has identified something about the
transaction as warranting review. This implicit signal does not exist in OPT-A, where the notification
arrives on every charge regardless of its profile.

**What this option tests:** Whether targeted alerting — arriving only when a transaction matches risk
criteria associated with unauthorized use — drives dispute behavior; and whether the implicit signal of
receiving a notification (this charge warranted it) changes the cardholder's response compared to a
notification received on every purchase.

---

## How to choose between them
Two options are presented in written order. The order of the list is not a preference. No option carries
a preference marker, a ranking claim, or a recommendation. A person selects one at G5a; that selection is
recorded in the decision block in the front matter.

Each option is a complete alternative. Both build the same components — a default-on notification system
and a purpose-built pre-filled dispute screen. They differ in the trigger condition for the notification.
The trigger condition changes the cardholder's experience in kind and determines what each pilot can
measure.

---

## What we could not establish
**What either option costs to build.** The Banking Constraints do not exist yet. `constraints_met: []` on every option reflects this: the
fields are present and empty, not omitted. What degrades is the validation that each approach is feasible
inside the bank's actual operating frame. `constraint_basis: none_stated` records this on the artifact.


**What the regulatory load is.** No Compliance Guidelines body exists for this run, so the touchpoints each option carries are identified from run material and marked indicative. No band, severity or obligation has been assessed.

---

## How this was produced
**Run 2026-04-card-disputes, stage 5.1 mvp-options, quality gate Q5 then decision gate G5a.** The options were derived from the selected idea and the problems it traces to.

**Assembled from one record**, which carries each option, what it tests and what it excludes as fields a check reads:

- **R-A10-01** — records/5-mvp/A10-r01-options.record.md

Does not score, rank, order, or recommend any option. Does not select an option — a person does at G5a.
Does not run Q5 or report a gate result for its own output. Does not write A11 — that is
`mvp-expansion`, a separate binding that runs after a person selects at G5a. Does not touch A9, A8,
A8b, A7, A4, or RUN-STATE.md.
