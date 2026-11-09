---
run_id: 2026-07-standing-orders
artifact_id: A9
ost_role: solution
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
could_not_verify: []
produced_by:
  agent: product-owner
  skill: idea-scoring
sources: [A8, A8b, A4, A7]
external_sources: []
assembled_at: 2026-08-24
assembled_from: [R-A9-01]
decision:
  gate: G4
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: product_owner
  accepted_at: 2026-08-24
  changed_during_refinement: none
  refinements: []
  selection: I1
---

# Selected Idea | Unified Commitment Hub (I1)

I1 was selected at gate G4 on 2026-08-24. The selection was made with one sub-dimension scored on Potential, no sub-dimensions scored on Difficulty, and no rationale recorded beyond the choice itself. What the record supports is stated in the sections below; nothing beyond it is claimed on the selector's behalf.

[rec:R-A9-01]

---

## What was selected

I1, the Unified Commitment Hub, proposed by the product-owner agent in stage 4.1 of this run. The idea is a single section inside the George app that shows a retail client all three recurring commitment types -- standing orders, direct debits, and card-on-file subscriptions -- in one view, and lets the client stop any individual card subscription without the bank needing to block the whole card.

It is a product layer, not a new account feature. It sits above the bank's existing payment systems and the card-scheme layer, aggregating what those systems already hold and adding a targeted card payment control that does not currently exist in any Czech incumbent's consumer product.

The classification infrastructure the hub requires is not a gap the bank would need to fill from scratch. The Erste Group, Ceska sporitelna's parent, is a confirmed Tapix client. Tapix processes approximately 1.5 billion transactions per month through a single API covering all three commitment types without a single-type blind spot. The cross-type transaction intelligence is already at the group level. What this idea requires at the CS level is a decision to deploy the consumer product layer on top of infrastructure the group already holds.

The targeted card payment control is the other element to be built. Four participants in the competitive synthesis have built this capability (Revolut, Monzo, Lloyds, NatWest). No Czech incumbent has done so. The specific mechanism this bank would use depends on card-scheme permissions and internal card system capabilities that are not assessable in this run.

---

## What it solves

I1 addresses two of the three primary problems established in A4.

**H1 -- No unified view of recurring commitments.** The hub gives the client a single place to see every recurring commitment leaving their account. Standing orders, direct debits, and card subscriptions appear together. The client does not navigate to standing orders in one place, direct debits in another, and find no dedicated view at all for card subscriptions. Four independent first-hand witnesses confirmed the current fragmented state: the client navigating her own account, the contact centre agent going screen by screen during a call, the branch adviser at her desk, and the mandates desk operator who confirmed directly that no single register joins all three types.

**H2 -- No mechanism to stop a card subscription; the only option makes things worse.** The hub gives the client a targeted card payment control that stops a specific subscription without blocking the whole card. The current state is binary: block the card and stop everything, or stop nothing. Five qualifying sources confirmed this state, including the contact centre agent who described it as the call type that goes worst and the aggregated report recording 9,270 calls in twelve months where no bank action was possible. I1's own author named the mechanism gap explicitly: whether the targeted control takes the form of merchant-level blocking or per-subscription virtual card issuance depends on card scheme permissions and internal card system capabilities. The idea establishes the direction; which path is available to this bank requires constraints this run does not hold.

---

## Why this one

The selector identified I1 and recorded no rationale beyond the selection. What the record supports is stated here. Nothing further is claimed on the selector's behalf.

**I1 is one of three ideas scoring 30 of 30 on Potential.** That score reflects a single sub-dimension: strategic alignment. The scoring framework intends four sub-dimensions on Potential; three could not be assessed because the Banking Constraints body is absent from this run (PD164). A score of 30 of 30 means the idea aligns strongly to the one key result the Strategy Basis covers. It does not say the idea is strong across the full potential axis.

**Two other ideas share that score.** I3 (Type-honest commitment management) and I5 (Unified commitment register) both score 30 of 30 on strategic alignment by the same path as I1: each directly enables clients to complete standing-order or direct-debit changes in the app without contacting the bank, which is what the product metric measures. The three-way tie on the only scored sub-dimension means the scores alone do not distinguish between I1, I3, and I5.

**Difficulty is 0 of 0 for every idea in the set.** The Compliance Guidelines and Banking Constraints bodies define the difficulty sub-dimensions. Both are absent from this run (PD164). The selection was made with no read on cost, build complexity, or regulatory risk for any idea. This applies to I1 as much as to the ideas that were not chosen.

**I1 solves H1 and H2, two of the three primary problems.** The selector chose the idea that addresses the visibility gap and the stopping capability gap. The third primary problem, H4 (inconsistent experience by commitment type), is not addressed by I1.

The selector recorded no rationale beyond the selection. No further inference is made here.

---

## What it does not address

**H4 is a primary problem the selected idea does not cover.** H4 names the inconsistent experience when a client changes a recurring commitment: the process, capability, and timeline differ by commitment type, and neither the client nor client-facing staff can predict the difference before the contact starts. A standing order can be stopped in thirty seconds; a direct debit change may need a form and a wait; a card subscription cannot be stopped at all. Three first-hand witnesses confirmed both the structural difference and the failure to communicate it. A4 placed H4 in the primary tier because it is the structural reason the product goal cannot currently be met across all three commitment types.

The idea set addresses H4 through I3 and I5. Those ideas were not selected. The MVP stage inherits a concept that addresses two of the three primary problems and leaves the third unaddressed.

**The card payment control mechanism is not resolved.** I1 names the gap and the direction. What it cannot establish is which mechanism fills the gap for this bank specifically. Two mechanisms exist in the market: merchant-level blocking, as Revolut deploys, and per-subscription virtual card issuance, as Monzo deploys. Whether either is available to Ceska sporitelna depends on card scheme permissions and internal card system capabilities. I1's author stated this directly: "The idea names the gap and the direction; the feasibility of which mechanism fills it requires constraints this run does not hold." The Banking Constraints body is absent from this run by stakeholder decision (PD164). The H2 component of I1 is sound as a direction; the build path for it is open.

---

## What this carries into the next stage

The MVP stage (stage 5) receives a selected idea with one unresolved feasibility question at the centre of its H2 component and one primary problem outside its scope.

**The card payment control mechanism question is open.** The hub requires a targeted card payment control that stops a specific subscription without blocking the whole card. Which mechanism delivers that control -- merchant-level blocking or per-subscription virtual card issuance -- is not determinable without the Banking Constraints body. The MVP stage can design the user-facing product, the unified view, and the standing order and direct debit components of the hub in full. It cannot specify the card payment control mechanism or confirm the H2 delivery path until the Banking Constraints body is available.

**H4 is not inherited by this selection.** The MVP stage works from a concept that addresses H1 and H2. H4 remains an unaddressed primary problem. Any MVP design that is constructed around I1 will not, by inheritance from this selection, address the inconsistent experience by commitment type.

**The Tapix parent relationship is an established structural input, with a caveat.** TR1 establishes that the Erste Group is a confirmed Tapix client. The classification layer the hub's unified view depends on is already deployed at the group level. Whether that group-level relationship extends to a CS-level consumer product deployment under the same commercial arrangement is a bank constraint this run cannot assess. The MVP stage inherits the structural advantage as a stated fact and the deployment path as an open question.

---

## What we could not establish

**Why I1 was preferred over I3 or I5.** Three ideas tied on the only scored sub-dimension. The selector chose I1. No rationale was recorded. The basis for preferring I1 to the other two Strong-rated ideas is not available from this record.

**Difficulty for any idea in the set.** The Compliance Guidelines and Banking Constraints bodies define the difficulty sub-dimensions. Both are absent from this run (PD164). Difficulty is 0 of 0 across all five ideas. The selection was made without a read on cost, build complexity, or regulatory risk for any idea.

**Which card payment control mechanism is available to this bank.** Whether merchant-level blocking or per-subscription virtual card issuance is available under this bank's card scheme agreements cannot be assessed without the Banking Constraints body. This question is carried into stage 5 unresolved.

**Whether the Tapix group relationship extends to a CS-level consumer deployment.** TR1 confirms Erste Group as a Tapix client. No publicly confirmed Czech retail banking deployment exists. The commercial and architectural path from the group-level relationship to a CS consumer product depends on bank constraints this run cannot assess.

---

## How this was produced

Run 2026-07-standing-orders, stage 4, decision record for G4. This invocation documents a selection already made; it does not make or propose one. The idea set (A8) was read for I1's five sections, which are the source for what the idea is in this document. The scores (A8b) were read for the comparison table and for what the scored and unscored sub-dimensions cover. The prioritised problems (A4) were read for H1, H2, and H4 and their placement. The competitive synthesis (A7) was read for the card payment control mechanism evidence and the H4 context.

The selector named I1 on 2026-08-24 and recorded no rationale. The five sections above draw on the source artifacts and state explicitly where the record stops. I1's five sections in A8 are the authoritative source for what the idea is; they are summarised here rather than reproduced in full.

Assembled from one record: R-A9-01 (records/4-solutions/A9-r01-selected.record.md).

