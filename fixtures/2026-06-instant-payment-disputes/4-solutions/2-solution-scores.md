---
run_id: 2026-06-instant-payment-disputes
artifact_id: A8b
ost_role: solution
status: accepted
workflow: discovery
assembled_at: 2026-08-22
assembled_from:
  - R-A8b-01
modified_by: agent
revisions: 0
external_sources: []
could_not_verify: []
---

# Instant payment recall: idea scores

Three of the five ideas score 30 of 30 on strategic alignment; one scores 20 of 30 and one scores 10 of 30. A score of 30 here is one sub-dimension at full marks: the instrument scored on one of seven dimensions and the other six are blank. [rec:R-A8b-01]

## The comparison

| Idea | Band | Strategic alignment | Potential | Difficulty |
|---|---|---|---|---|
| IDEA-01 Client-initiated instant recall | Strong | 30 | 30 of 30 | 0 of 0 |
| IDEA-02 Recall status in the app | Moderate | 20 | 20 of 30 | 0 of 0 |
| IDEA-03 Contact-to-despatch instrument | Weak | 10 | 10 of 30 | 0 of 0 |
| IDEA-04 In-app recall available at any hour | Strong | 30 | 30 of 30 | 0 of 0 |
| IDEA-05 Automated recall despatch and real-time status feed | Strong | 30 | 30 of 30 | 0 of 0 |

**Three ideas share the top band and nothing here separates them.** Strategic alignment is the only
sub-dimension this run could score, and the three that reach it do so by the same mechanism: a client
action that produces an outbound recall with no person in the chain. What would tell them apart is
feasibility, and the difficulty axis scored nothing at all.

## IDEA-01: Client-initiated instant recall

**Band: Strong. Strategic alignment: 30 of 30.**

The client triggers the recall from the mobile app with no human in the chain between the trigger and the outbound message. One step to AI-2: a service process with no human in it is fully straight-through by definition, and a fully straight-through service process in the primary digital channel is what AI-2 counts. Both halves hold. The mobile app is the primary digital channel, and no agent or operator touches the case between the client's confirmation and the despatch.

## IDEA-02: Recall status in the app

**Band: Moderate. Strategic alignment: 20 of 30.**

The idea converts phone-based status inquiries into digital self-service. The path to AI-2 has one named thing in between: the conversion of voice-based status queries to in-app updates and push notifications. Once that conversion holds, the status inquiry is a fully straight-through service process in the primary digital channel, which is AI-2. Both steps hold. The idea does not move the brief's product metric (median minutes from client raising the case to recall being despatched); it converts a different service process. That places the alignment one step removed from the mechanism the brief's link names, which makes this Moderate rather than Strong.

## IDEA-03: Contact-to-despatch instrument

**Band: Weak. Strategic alignment: 10 of 30.**

The idea adds timestamps and a measurement layer; it does not change the recall process itself. The path to AI-2 runs through: timestamps exist, delay is measured, a decision is made to change the process, the process changes, the process becomes fully straight-through, AI-2 increases. That chain exceeds two steps. The steps from measurement to process change rest on decisions and actions outside this idea's scope; at least one step rests on an assumption no evidence in this run supports. A path exists, but the Strategy Basis says a chain longer than two steps is Weak at best. The band is Weak.

## IDEA-04: In-app recall available at any hour

**Band: Strong. Strategic alignment: 30 of 30.**

The client triggers the recall from the app at any hour of the day or week, with no human in the chain between the trigger and the outbound message. One step to AI-2: the in-app trigger is a fully straight-through service process in the primary digital channel at any hour, which is what AI-2 counts. Both halves hold. The 24/7 scope means the 38 per cent of cases arriving outside weekday hours are included in the conversion to straight-through.

## IDEA-05: Automated recall despatch and real-time status feed

**Band: Strong. Strategic alignment: 30 of 30.**

The idea automates recall despatch from the moment a claim is registered. For the digital submission path, claim registration through the app leads directly to an automated RRO message with no human in the despatch step, making the end-to-end service process fully straight-through in the primary digital channel. One step to AI-2: a fully straight-through service process in the primary digital channel is what AI-2 counts. That step holds. Contact-centre and branch registration paths involve a human in the registration step and are not fully straight-through; the alignment is scored on the digital path within this idea, where the mechanism is complete.

## What we could not establish

Six sub-dimensions are unscored because the bodies that define their bands are absent from this run. All six absences are the same kind: the body is missing, not present with a gap in what the run supplied.

**Potential (70 of the 100 potential points not scored).** Problem-solution fit (35 points), market differentiation (20 points) and innovation opportunity (15 points) all require the Banking Constraints. Without it no band can be applied. The Banking Constraints was parked by the stakeholder on 13 August.

**Difficulty (all 100 difficulty points not scored, denominator 0).** Regulatory and compliance risk (40 points) requires the Compliance Guidelines. Technical complexity (35 points) and operational change (25 points) require the Banking Constraints. Neither body exists for this run.

A potential score of 30 out of 30 is one sub-dimension at full marks, not a strong idea assessed across five. A reader who needs to compare ideas on feasibility, regulatory exposure or operational cost cannot conclude anything from this artifact: those questions require bodies this run does not have.

## How this was produced

Stage 4.2, binding `idea-scoring` of the `product-owner` design agent, run `2026-06-instant-payment-disputes`. Inputs: `fixtures/2026-06-instant-payment-disputes/4-solutions/1-solution-set.md` (A8), `1-brief/initiative-brief.md` (A1), `2-problems/5-prioritised-opportunities.md` (A4), `.github/know-how/strategy-basis.md`. The Banking Constraints and Compliance Guidelines were declared inputs and are absent from this run; the reduction is that five of seven sub-dimensions are unscored and both denominators are reported as counts rather than percentages.

Assembled from one record: **R-A8b-01** (`records/4-solutions/A8b-r01-scores.record.md`).

Gates: Q4 (quality) then G4 (human decision). Neither has run.

Rules no check decided: `could_not_verify: []`. Nothing to carry.
