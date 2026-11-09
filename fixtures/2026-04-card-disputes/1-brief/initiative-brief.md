---
run_id: 2026-04-card-disputes
artifact_id: A1
produced_by:
  agent: product-owner
  skill: brief-creation
ost_role: outcome
status: accepted
sources: []
workflow: discovery
modified_by: human
revisions: 1
external_sources: []
could_not_verify:
  - rule: "no field is inferred; an unsupplied field is marked unknown with a reason"
    needs: judge
    reach: process

decision:
  gate: G1
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: product_owner
  accepted_at: 2026-08-17
  changed_during_refinement: none
  refinements: []
  note: "Accepted as it stood. `time_horizon` remains marked unknown rather than guessed — it is optional, it was not decided at brief time, and the Product Owner chose to accept without it, which is a recorded choice rather than an omission. This brief carries the first complete `goals[]` block in any run and C77 checked it against the Strategy Basis."
assembled_at: 2026-08-20
assembled_from: [R-A1-01]
---

# Discovery | Initiative Brief — Card dispute resolution in the digital channel

Customers who spot a transaction they did not make should be able to report it and know where it stands, without printing anything or ringing anyone. The measure is the share of card dispute cases raised digitally and closed with no inbound status call, and the signal that it is working is that customers stop ringing to ask where their case is. The scope is card dispute and chargeback handling for retail cardholders in the Czech Republic, with no country boundary applied to the market research. One thing was not settled at brief time and is recorded as such: how long this is meant to take. [rec:R-A1-01]

---

## The outcome we want
Customers who spot a transaction they did not make can report it and know where it stands, without
printing anything or ringing anyone.

**Restatement assessment.** The supplied outcome is already outcome-shaped: it names a customer
capability gained (can report; can track) and the friction removed (no paper form, no call). It does not
prescribe a thing to build. No restatement was proposed.

---

## Who this is for
Retail debit and credit card holders in the Czech Republic, all ages. Weight toward customers who have
had at least one disputed transaction.

---

## Why now
Card operations flagged rising dispute volumes and the paper form is the oldest journey still live in
the retail estate.


Rising volume is the operational half. The paper form is the customer half, and it is the oldest journey still live in the retail estate.

---

## What success looks like
**Product goal:** Card dispute cases raised and followed to resolution in the digital channel without a
call or a paper form.

**Metric:** Share of card dispute cases raised digitally and closed with no inbound status call.

**Key result:** AI-2 — Share of sales and service processes in primary digital channels that are fully
straight-through (AI First objective, Strategy Basis §2.7, direction: increase, type: C).

**Link:** A dispute raised on the paper form enters as a non-straight-through service process. It needs
manual keying by card operations, and it generates at least one status call that the contact-centre
agent cannot answer because they have no view of the case. Moving both the raise and the status view
into the app removes the keying step and the status call from the same case. Each case moved is one
service process converted from manual to straight-through, which is what AI-2 counts.

The link is the user's own statement and has not been amended. The mechanism is one step: disputes moved
to the digital channel become straight-through service processes, which is the quantity AI-2 tracks. The
product metric is specific to card disputes; AI-2 measures the broader class of all sales and service
processes. The metric is not AI-2 restated.


**Success signal.** Customers stop ringing to ask where their case is.

---

## What is in scope, and what is not
Card dispute and chargeback handling for retail cardholders.

No country boundary was applied. The user explicitly declined to narrow the scope to a single country
or to exclude any sector without a defensible reason. The search order (banking first, then outward) is
governed by the Competitive Analysis Standards and is not set here. Stage 3 receives this topic and
applies the Standards' own search sequence.


**Known constraints.**

- Chargeback timings are set by the card schemes and cannot be changed.

Further initiative-specific constraints were not determined at brief time. The user noted no other
specific constraint is yet worked out. Standing regulatory and technical bounds for card products live
in the Banking Constraints know-how, not in this field.

---

## What we could not establish
| Field | Reason | Note |
|---|---|---|
| `time_horizon` | not_yet_available | Not decided at brief time. |

`time_horizon` is optional. Its absence does not block the quality gate. G1 weighs whether the brief
is complete enough to proceed.


**How long this is meant to take.** No time horizon was decided at brief time. The field is optional and its absence does not block the gate, and it is recorded here rather than left to be noticed later.

**What else constrains this.** Beyond the card scheme timings, no initiative-specific constraint was worked out. The Banking Constraints and Compliance Guidelines bodies do not exist for this run, so nothing downstream is weighed for feasibility.

---

## How this was produced
**Run 2026-04-card-disputes, stage 1.1 brief-elicitation, decision gate G1.** The brief was elicited through conversation with the Product Owner. No field was inferred: anything the user could not supply is marked rather than filled in.

**Assembled from one record**, which carries the fields a check reads:

- **R-A1-01** — records/1-brief/A1-r01-brief.record.md

**G1 taken on 17 August 2026 by Igor Tadic, Product Owner.** Accepted as it stood, with no refinement
round. The record is in this artifact's frontmatter under `decision:` and in the run record at
[RUN-STATE.md](../RUN-STATE.md) stage 1. `by_agent: false` — no agent records a human decision.

`time_horizon` stays marked unknown rather than guessed. It is optional, it was not decided when the
brief was written, and accepting without it is the Product Owner's recorded choice.


**Not agent output.** One edit was made to this artifact by a person: *G1 recorded* (17 August 2026).
**What changed and why is in [notes/marked-edits.md](../notes/marked-edits.md)**, which no gate reads.

**Related runs.** None.
