---
run_id: 2026-07-standing-orders
artifact_id: A4
ost_role: opportunity
status: accepted
workflow: problems
modified_by: agent
revisions: 1
could_not_verify: []
produced_by:
  agent: hypothesis-designer
  skill: prioritisation
sources: [A3]
external_sources: []
decision:
  gate: G2
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: product_owner
  accepted_at: 2026-08-24
  changed_during_refinement: none
  refinements: []
  selection: [H1, H2, H4]
  note: "Accepted directly by the product owner in chat, 'agree with hypothesis selection'. The primary set is H1, H2 and H4, one for each clause of the brief's outcome, unchanged from the proposal. G2 names a second reviewer, the researcher governing evidence, and that half is the same unstaffed one as the four judged rules Q2 could not run: the evidence was graded by the mechanical trust arithmetic that C52 recomputes, not by an independent reader. H5 sits in the secondary tier on a weak tag, placed on fit to the brief's direct-debit metric rather than on evidence, and was accepted with the rest."
assembled_at: 2026-08-24
assembled_from: [R-A4-01]
---

# Problems | Prioritised problems

Three problems sit at the structural core of what the brief requires: the absence of a unified view of all recurring commitments, the bank's inability to stop a card subscription at all, and the inconsistent experience that makes end-to-end app management fail selectively by commitment type. H1, H2 and H4 are placed primary because each maps to one of the brief's three core requirements: visibility, stopping capability, and consistent process. H3, H6, H5 and H8 follow as secondary, ordered by how directly each bears on the primary problems and on what the brief measures. H7 is parked because it dissolves if H1 is solved; H9 is parked because it quantifies the problem rather than naming a discrete one; H10 is parked because it falls outside the brief's stated scope. [rec:R-A4-01]

---

## What we are solving first

The initiative's outcome requires the client to know what is leaving their account and to be able to change or stop any of it without calling the bank. Its product goal requires the client to manage a commitment end to end in the app. Three problems each block one of those requirements.

**H1: No unified view of recurring commitments.** Trust: `strong`.

Placed first. The brief's outcome opens with the clause that a client knows what recurring commitments are leaving their account. H1 is the current state that prevents exactly that: standing orders, direct debits, and card subscriptions are split across separate parts of the app, and card subscriptions have no dedicated recurring-payments view at all. Four independent first-hand witnesses saw this directly: the client navigating her own account, the contact centre agent going screen by screen during a call, the branch adviser at her desk, and the mandates desk operator who confirmed no single register joins all three types. Until a unified view exists the outcome cannot be achieved, because a client who cannot see all their commitments cannot manage them. H1 has the broadest evidence base of any hypothesis in this set: four qualifying origins, all first-hand.

**H2: No mechanism to stop a card subscription; the only option makes things worse.** Trust: `strong`.

Placed second. The brief's outcome requires the client to be able to stop any recurring commitment without calling the bank. H2 names the most complete version of why that fails for an entire commitment type: the bank has no mechanism to stop a card-on-file subscription on behalf of a client, and the only option it can offer, blocking the card, cancels every card payment the client holds and is therefore unusable. Five qualifying origins confirm this: the client who was offered and declined the card block; the contact centre agent who described it as the call type that goes worst; the branch adviser who confirmed the same answer at the desk; the mandates desk operator who confirmed requests of this type are sent back; and the aggregated report recording 9,270 calls in twelve months where no bank action was possible. Until H2 is addressed, the outcome's "any of them" clause is false for card subscriptions.

**H4: No consistent experience when changing a commitment; type determines what the bank can do and clients are not told this.** Trust: `strong`.

Placed third. The brief's product goal is that a client manages a recurring commitment end to end in the app without a contact-centre touch. H4 explains why that goal fails structurally rather than for one specific commitment: the process, capability, and timeline differ by type, and neither the client nor the client-facing staff can predict the difference before the contact starts. A standing order can be stopped on the same call in thirty seconds; a direct debit change may need a form and a wait; a card subscription cannot be stopped at all. Three qualifying first-hand origins, the client who discovered the contrast by navigating her own account, the contact centre agent who described having to answer "why one stops in thirty seconds and the next needs a form", and the mandates desk operator who explained the three operationally distinct systems, confirm both the structural difference and the failure to communicate it. H4 is placed primary because it is the structural reason the product goal cannot currently be met across all three commitment types.

---

## What comes after

H3, H6, H5 and H8 support the primary problems and remain relevant while contacts continue.

**H3: Client believes they cancelled but continues to be charged.** Trust: `strong`.

Placed first in secondary. H3 describes the experience failure that H2's primary placement creates: a client who uses the George app to "cancel" a card subscription continues to be charged, and receives no explanation of what their action achieved or failed to achieve. A branch adviser relayed a client who had "turned it off in George" two months earlier and was still being charged 349 crowns monthly, a client confused by how a bank's app can confirm a cancellation that the bank cannot execute. The aggregated report records 1,940 complaints in twelve months coded to "charged after I cancelled." Three qualifying origins across client, branch, and report. H3 is placed here rather than parked because the problem it names, the UX deception of a control that looks like a cancellation without effecting one, requires its own fix even if H2's capability gap is closed; solving H2 eliminates the continuing charge, but the misleading George control needs to be redesigned separately.

**H6: Post-merchant-cancellation disputes fall between teams; the client receives contradictory information.** Trust: `strong`.

Placed second in secondary. H6 describes the downstream consequence of the card subscription problem for cases where the client has already tried the merchant route: a client who cancelled with the merchant, was charged again, and arrived at the bank as a card dispute ends up passed to a different team, by which point they have been told contradictory things about whose problem it is. 6,110 calls in twelve months had the same client calling about a recurring payment within the previous ninety days, confirming the repeat-contact pattern. Two qualifying origins: the contact centre agent (first-hand) who named this as the hardest case type, and the aggregated report that quantifies its scale. H6 is placed before H5 because it is strongly evidenced and describes a high-volume escalation path within the scope the brief addresses.

**H5: Client expects mandate cancellation to settle past charges and the underlying obligation; it does neither.** Trust: `weak`.

Placed third in secondary despite a weak trust tag. The sole qualifying origin is the mandates desk operator, first-hand, who described that cancelling a mandate stops only future collections and does not undo charges already taken or settle the underlying arrangement, while clients expect both. One first-hand witness; the two-origin threshold is not met. H5 is placed in secondary rather than parked because the brief's metric names direct-debit changes explicitly ("share of standing-order and direct-debit changes completed digitally") and H5 describes a gap in the client's experience of completing exactly that action. Brief-fit outranks the trust tag here: the metric measures the commitment type this hypothesis is about, and the expectation gap is what a client encounters after completing the digital action the metric counts. The weak tag should be noted at the decision gate; the mandates desk is the most authoritative source for the mechanics of this gap, and no corroborating origin existed in the material supplied.

**H8: Bank staff handling one commitment case cannot see the client's others; related problems go unnoticed.** Trust: `strong`.

Placed last in secondary. H8 describes a gap that matters while clients continue to contact the bank: a contact centre agent or mandates desk operator who handles one commitment case has no cross-commitment view and cannot alert the client to related problems in the same interaction. The mandates desk operator confirmed that cancellation forms carry only the mandate they are about, so she cannot warn a client about other commitments while processing one case. Two qualifying first-hand origins: the contact centre agent and the mandates desk operator. H8 is placed last in secondary because the brief's product goal is to eliminate the contact-centre touch, not to improve it. H8 describes the current state of contacts that the initiative aims to make unnecessary. Until the digital channel is capable enough that contacts stop, every contact that does happen carries this limitation. Addressing H1 in the digital channel may also create the data that would give staff a view they currently lack.

---

## What we are not solving now

**H7: Fear of cancelling the wrong thing stops clients from acting; they continue paying for what they want to stop.** Trust: `weak`.

Parked. H7 is a consequence of H1, not an independent problem. The client did not cancel anything on the evening in question because she feared stopping a needed payment with no complete list to check against. That fear is the behavioral manifestation of H1's absence: a unified view of all commitments is the thing that would let a client act with confidence. H7 dissolves if H1 is solved. The observation and tag are retained in full and are available to any follow-on run at no additional evidencing cost. Single qualifying origin: the client, first-hand.

**H9: More than half of recurring commitment contacts require bank intervention beyond the digital channel; volume is rising.** Trust: `weak`.

Parked. H9 quantifies the gap the initiative addresses rather than naming a discrete problem to solve. 31,600 calls annually, 56% requiring intervention beyond the digital channel, with monthly volume rising from 2,180 to 3,040 over twelve months. This is the size of the opportunity the brief's metric would capture if moved. But H9 does not name what prevents digital resolution; the problems that do are H1, H2 and H4, which are placed primary. The weak tag is arithmetically certain: one qualifying origin, the aggregated report, which is an aggregated source and cannot provide the first-hand observation that `strong` requires regardless of volume. The volume figures are retained because they are the best available quantification of the metric's current position.

**H10: Subscription confusion creates an opening for phishing; clients cannot tell legitimate bank communications from fraudulent ones.** Trust: `weak`.

Parked. H10 is outside the brief's stated scope. The brief's outcome is that a client can manage recurring commitments without calling the bank; it does not address the security surface that arises when a client is uncertain whether a cancellation took effect. H10 describes a real problem (a client who had attempted a cancellation nearly acted on a phishing message that exploited that uncertainty) but it belongs to a fraud or security domain rather than to this initiative. One qualifying origin: the branch adviser, providing two references from a single origin (one relayed, one first-hand on the message's origin). The tag is weak for the same reason as H7 and H5: one origin regardless of proximity. The observation is retained for any future run that scopes fraud-adjacent problems in the recurring-payment space.

---

## How we decided the order

The brief states one outcome, one product goal, and one metric. The outcome has two clauses: the client knows what is leaving their account, and the client can change or stop any of it without calling the bank. The product goal requires managing end to end in the app. The metric measures standing-order and direct-debit changes completed digitally without contact-centre contact.

Six of the ten hypotheses carry a strong trust tag. All three primary hypotheses are strong. Among the six strong hypotheses, evidence breadth differs: H1 has four first-hand origins (the broadest in the set), H2 has five qualifying references across four first-hand and one aggregated origin, H4 has three first-hand origins, H3 and H8 each have two, H6 has two. The aggregated report, shared by H2, H3, H6, and H9, is a genuine second origin for each but is aggregated: it provides volume counts, not a witness to any individual case. A reviewer who weighted first-hand witness counts would find H1 and H2 most strongly supported, with H4, H3, H8, and H6 behind them in that order.

The four weak hypotheses (H5, H7, H9, H10) each rest on one qualifying origin. H5 is the only one placed in secondary, because the brief's metric names the commitment type it is about. The other three are parked: H7 because it dissolves if H1 is solved, H9 because it quantifies rather than names a discrete problem, H10 because it is outside the brief's scope.

The one placement where brief-fit outranks the trust tag is H5, placed third in secondary on a weak tag. The reasoning is stated above and should be reviewed at the decision gate.

The two unresolved questions from A3 are carried forward: whether card subscription cases dominate the 31,600 annual calls (cannot be confirmed from the report), and whether the bank's inability to stop card subscriptions is a scheme limitation or a build choice (the only source is an undated note with no established provenance). The second question is material to H2's solution path.

This is a proposal. No placement is decided until G2.

---

## What we could not establish

**Volume by commitment type.** The monthly report records all recurring-commitment calls in a single reason group. Three interviews consistently point to card subscriptions as the type driving the worst call outcomes and the highest client frustration, but the share of the 31,600 annual calls they represent cannot be confirmed from the available data.

**Whether the scheme stops card subscriptions.** The undated note asks whether the bank's inability to stop card subscriptions from the app is a card-scheme limitation or a build choice. The note carries no established provenance. The question is material to H2: the solution path differs substantially depending on whether the gap is structural or addressable through a build.

---

## How this was produced

Ten hypotheses authored in stage 2.2 are placed into exactly one of three lists: primary, secondary, and parked. Every hypothesis from A3 lands in exactly one list; none is dropped.

The placements above are a proposal from the prioritisation skill. No placement is decided until the decision gate, where the Researcher reviews the evidence and the Product Owner governs the scope. The two review different things about the same list.

The rules no check decided for this skill: `could_not_verify: []`. Nothing to carry.

The material is fabricated. Every person, figure, and quotation in A2 was written on 24 August 2026 to exercise this workflow. The trust arithmetic, the hypotheses, and these placements were derived from those observations exactly as they would be from real material.

Assembled from one record:

- **R-A4-01**: records/2-problems/A4-r01-prioritisation.record.md
