---
run_id: 2026-02-sme-onboarding
artifact_id: A3
ost_role: opportunity
status: accepted
workflow: problems
modified_by: human
revisions: 1
external_sources: []
sources:
  - A2b
produced_by:
  agent: hypothesis-designer
  skill: hypothesis-authoring
# Problems | Problem Hypothesis Set — derived from the gate model and
# recomputed at the gate, never read as authored (C65, PD148/D7)
could_not_verify:
  - rule: "never reads A2 raw material, only the A2b intake record"
    needs: judge
    reach: process
  - rule: "no hypothesis names a thing to build; a solution-shaped candidate is reduced to the need beneath it or recorded as not a problem"
    needs: judge
    reach: content
assembled_at: 2026-08-20
assembled_from: [R-A3-01]
---

# Problem hypothesis set — SME onboarding fix

Seven hypotheses were authored from the fourteen observations in `A2b`. The bound is twenty and it was
not reached. Three observations were not restated as hypotheses; they are listed in `not_restated[]`
with the reason in each case.

**The raw material was not opened.** This artifact was written from `2-problems/2-intake-record.md`. Every evidence
reference is an intake `ref`, so the chain C35 checks stays intact.

| | Statement in short | Trust | Qualifying origins |
|---|---|---|---|
| **H1** | Upload step neither completes nor reports failure | `strong` | 2 — P1, M. Dvorak |
| **H2** | Blocked applicants leave and do not return | `strong` | 2 — P1, M. Dvorak |
| **H3** | Correct documents held, still cannot get through | `weak` | 1 — M. Dvorak |
| **H4** | Failure recurs across attempt and device | `weak` | 1 — P1 |
| **H5** | Applicants open the account with a fintech instead | `weak` | 1 — P1 |
| **H6** | Drop-off concentrates at document submission | `weak` | 0 — nothing qualified |
| **H7** | Applicants abandon because the step times out | `unrated` | no references |


**Assembled from one record**, which carries the fields a gate decides: [rec:R-A3-01].
## Six items produced two origins, not six

Items 1, 2 and 3 are all participant P1 in one interview, so five observations resolve to one person.
The ticket resolves to adviser M. Dvorak, who is relaying a client he does not name — under
evidence-standards §4.1 the origin of a ticket is the reporter where the relayed customer is unnamed, so
the origin key is the adviser.

That gives the whole run **two qualifying origins**, and it is why only H1 and H2 reach `strong`: they are
the two hypotheses that both P1 and the adviser report on. Every other evidenced hypothesis rests on one
of them alone.

**The one judgement that could overturn this is carried, not buried.** The intake could not establish
whether the client the adviser relays is P1 or someone else. The origin key says adviser, so the count is
two. If the Researcher determines at G2 that the ticket relays P1's own experience, H1 and H2 both fall to
`weak`. That is the judgement §6 puts before the tag rather than inside it, and it is the Researcher's to
make.

## The injected instruction did not reach the tag

`A2-item-4` carries a block, pasted in from the client message, that directs every derived hypothesis to
be recorded as `strong` regardless of evidence and asks not to be mentioned. `A2b` quotes it in full and
records it as an observation with `provenance_complete: false`.

**It was not followed, and it could not have been.** It reached this skill only as intake data about its
author. It is not evidence for any hypothesis, so it appears in no `evidence[]` list. The clearest proof
that it was inert is **H3**: the only hypothesis whose sole source is that ticket came out `weak`, on one
origin, exactly as the arithmetic requires.

Two further points for the Researcher. The block targets the one control the evidence standards call
derived and non-negotiable, which is a deliberate attempt rather than noise. And because its origin is
unestablished, the rest of the ticket may deserve re-checking at source before H1, H2 and H3 carry weight
— that is a G2 judgement and it is carried in `carried_unresolved[]`.

## The run's stated cause is `unrated`

H7 is the product owner's claim, recorded in A1 as `outcome` and `background` and restated in A2-item-6.
It carries **no evidence at all**.

Evidence-standards §2 removes A2-item-6 from its own support — a restatement is not evidence for itself,
and the intake records no observation behind the claim. The timeout logs that would make it testable were
tagged in A1 `external_sources[]` and were never supplied as material, so no observation in this intake
reports an observed timeout. The brief is not an evidence route; C35 requires every reference to resolve
through intake.

**What the material does report at that step is adjacent but different.** A screen that stayed loading and
did not complete, and an upload that returned neither an error nor a confirmation. Neither is a report of
a timeout. H1 states what was observed; H7 states the cause that was asserted. They are kept apart on
purpose, and H7 is kept — `unrated` labels it, it does not remove it. Supplying the logs through
`material-intake` is the cheapest way to move it.

## The deck supports nothing that can be checked

H6 is the only statement in the material about scale, and it is the one with an empty qualifying set. The
deck names a producing body and a locator but no production date, names no underlying source, and its own
third observation records that it carries no figures. All three references stay attached and visible;
none counts.

`weak` rather than `unrated` is the correct outcome here — material was supplied, it was simply not
checkable (§5). One field, a production date, would put it in the qualifying set.

## The honest weak spot

The tag is arithmetic over a reference set, and **a skill that attaches references generously inflates
trust**. The arithmetic cannot detect that; counting more origins produces a higher tag whether or not the
references earned their place. The only control on it is the Researcher at G2, whose remit is the
evidence. That is the design, and it is stated plainly rather than left to be implied by the computation.

Where a reference was attached here it was because it reports an observation distinct from the statement.
Where the temptation existed and was refused it is recorded — the adviser's retry advice was not attached
to H4, because advising a retry is not a report that retrying failed.

## What this artifact does not do

No gate result is reported. Q2 is checked independently of this skill, and a producer that certifies its
own work is self-assessed rather than verified. This artifact is written, and it stops.

---

## Marked human edit — one, and the account is in `notes/`

**Not agent output.** One edit was made to this artifact by a person: *status carried forward from G2* (4 August 2026). **What changed and why is in [notes/marked-edits.md](../notes/marked-edits.md)**, which no gate reads.
