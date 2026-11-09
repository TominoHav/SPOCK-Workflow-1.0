---
run_id: 2026-04-card-disputes
artifact_id: A9
ost_role: solution
status: accepted
workflow: discovery
modified_by: human
revisions: 0
sources:
  - A8
  - A8b
external_sources: []
could_not_verify: []
decision:
  gate: G4
  by_agent: false
  selection: ID-3
  accepted_by:
    - name: Igor Tadic
      role: Product Owner
  accepted_at: 2026-08-18
  reason: "Recorded from the selection as given, with no reasoning supplied. ID-3 scored 20 of 30 on strategic alignment against AI-2 (moderate band): notification-triggered digital filing removes the manual keying step, and status-call elimination is the named intermediate it does not itself carry. Six of the seven scoring dimensions were unscored at this gate because the Compliance Guidelines and the Banking Constraints are both absent, and the difficulty axis reported a denominator of 0, so the numbers on the table ranked strategic fit and nothing else."
  changed_during_refinement: none
  refinements: []
  note: "A recommendation was offered in conversation before the choice, stated as the assistant's own view and outside the artifact record. It named ID-4. The Product Owner selected ID-3. Recording that here rather than leaving the record to imply either an unaided choice or a recommendation taken. A8 reached this gate carrying no rank, recommendation or selection, which C59 confirmed at Q4."
assembled_at: 2026-08-20
assembled_from: [R-A9-01]
---

# Ideas | Selected Idea — ID-3

ID-3, the real-time push notification with a dispute action link, was selected at the decision gate on 18 August 2026 by the Product Owner. It answers H1, the problem that a cardholder finds an unauthorised charge weeks later because nothing announced it, and it is the one idea in the set that acts before a dispute exists. No reason was stated at the gate: the selection arrived as the id and an instruction to proceed, and it is recorded as it was made rather than reconstructed. [rec:R-A9-01]

---

## What was selected
**ID-3 — a real-time push notification on every card transaction, default-on, carrying a one-tap route
into a pre-filled dispute.**

Every card transaction fires a notification within seconds, to every cardholder, with no setup step. A
cardholder who does not recognise the charge taps one action in the notification and arrives at the
dispute screen with date, amount and merchant already filled in.

The full statement, description, problem binding and market evidence are in
[`4-solutions/1-solution-set.md`](./1-solution-set.md) and are not restated here. The scores and their denominators
are in [`4-solutions/2-solution-scores.md`](./2-solution-scores.md).

---

## What it solves
**H1 — no timely notification of an unauthorized transaction.** H1 is the third of the run's three
primary problems and carries trust `weak`: one origin, participant-d3, first-hand with complete
provenance, and the same corroboration caveat A4 records against H2. The prioritisation placed it third
because it is the precondition for the rest of the journey rather than the journey itself — a customer
who does not know cannot act.

H2 (forced to the paper form) and H3 (no acknowledgement, no status visibility) are the run's first and
second primary problems and **ID-3 does not target either**. The pre-filled dispute screen ID-3 opens is
the ID-2 flow reached by a different door; A8 states that dependency in ID-3's own steps. Nothing in ID-3
tells a cardholder where a filed case stands, which is what the brief's success signal names.

---

## Why this one
**The Product Owner gave the id and no reasoning.** This section records that rather than filling it.

What was on the table at the moment of the choice: five ideas, none ranked or recommended in the
artifact; strategic alignment scored for all five against key result AI-2, out of 30, with ID-3 at 20
(moderate) and ID-4 alone at 30 (strong); and six further dimensions declared unscored across both axes,
because the Compliance Guidelines and the Banking Constraints do not exist for this run. The difficulty
axis scored nothing at all, denominator 0.

A recommendation naming ID-4 was made in conversation, outside the record, and was not taken. That is on
the decision record above so the file cannot later be read as an unaided choice or as a recommendation
accepted.

---

## What it does not address
**H3, status after filing, is not in this idea.** ID-1 and ID-4 carried it and neither was selected. The problem with the strongest evidence in this run, four independent origins, is not the problem the selected idea answers.

**H2, the paper form, is only partly addressed.** A dispute action inside a notification is a digital entry point for the cardholder who receives the notification. A cardholder who finds the charge some other way still meets whatever intake exists.

**H4, the security outcome, is untouched**, and no participant in the market answers it either.

---

## What this carries into the next stage
Two constraints the MVP options inherit, both already on ID-3 in A8:

- **The ePrivacy consent question is the material design constraint.** Default-on is the design decision
  that distinguishes ID-3 from what KB and CSOB already offer, and it is the part that requires a consent
  mechanism satisfying the Czech implementation of the directive. The touchpoint is marked indicative:
  no Compliance Guidelines body exists to assess band, severity or obligation.
- **ID-3 opens a dispute screen it does not itself build.** Stage 5 has to decide how much of the filing
  flow a pilot of ID-3 includes, because the one-tap action has to land somewhere.

The non-selected ideas remain in A8 unaltered and available to a later run from the same problem set.

---

## What we could not establish
**Why this idea rather than another.** The Product Owner gave no rationale at the gate and none is invented here. A rationale written by an agent would read at stages 5 and 6 as though a person had weighed it, which is the one thing this record exists to keep straight.

**Whether the notification fires at authorisation or at settlement.** The market research could not establish this for any Czech participant, and it decides how much of H1 a notification actually answers.

---

## How this was produced
**Run 2026-04-card-disputes, stage 4, decision gate G4.** This artifact records a human selection. No agent produced the choice and no agent may.

**Assembled from one record**, which carries who selected, when, and the rationale field as it was given:

- **R-A9-01** — records/4-solutions/A9-r01-selection.record.md

**The set the choice was made from, and the scores that accompanied it, are unaltered** in the idea set and the idea scores. Nothing here re-opens them.
