---
run_id: 2026-07-standing-orders
artifact_id: A11
ost_role: artifact
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "every compliance touchpoint is addressed in functionality, not merely listed"
    needs: judge
    reach: artifact
produced_by:
  agent: product-owner
  skill: mvp-expansion
sources: [A10, A9, A8, A4, A7]
external_sources: []
decision:
  gate: G5b
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: product_owner
  accepted_at: 2026-08-24
  changed_during_refinement: none
  refinements: []
  note: "Accepted as written, with no rationale recorded alongside the acceptance and none stated here. Two preconditions carry forward into the requirement stage rather than being resolved by this acceptance: whether the bank may place a per-merchant authorisation rule without blocking the card, and whether the group's transaction enrichment relationship extends to a Czech consumer deployment. Both are named in What has to be handled and neither is answerable from this run's material, because the Banking Constraints and the Compliance Guidelines do not exist (PD164)."
assembled_at: 2026-08-24
assembled_from: [R-A11-01]
---

# Expanded MVP | M2: Unified Commitment View with Merchant-Level Payment Block

M2 delivers the unified commitment view I1 described and adds the first bank-side card payment control any Czech retail bank has offered: a merchant-level authorisation block placed at stopping time, without blocking the physical card for other payments. The view answers H1; the block answers H2. Two questions about whether M2 is buildable as described are unresolved -- the card scheme permission the block depends on, and the deployment path for the Tapix classification layer the view depends on -- and both sit ahead of the build rather than inside it.

[rec:R-A11-01]

---

## What it is

M2 is the Unified Commitment Hub selected as I1 at G4, built to resolve H1 and H2 -- two of the three primary problems A4 established. It is a product layer added to the George app. Nothing about the client's account structure, card, or existing standing orders or direct debits changes until the client acts.

The hub has two distinct components. The first is a unified view: a single section in George that shows all three recurring commitment types leaving the client's account -- standing orders, direct debits, and card-on-file subscriptions -- in one list, each labelled by type with the amount and the next-due date. The Erste Group's existing Tapix relationship is the structural advantage here. Tapix identifies all three commitment types from transaction data through a single API with no type-specific blind spot; the group is a confirmed Tapix client. The unified view does not require the bank to build a classification layer from scratch. It requires a decision to deploy the consumer product on classification infrastructure the group already holds. Whether that deployment is available under the existing commercial arrangement is a question the PRD must resolve before requirements can be written.

The second component is the merchant-level payment block. When a client selects a card subscription entry in the unified view and initiates a stop, the bank places a per-merchant authorisation rule: a card scheme instruction that declines future charges from that merchant against that card number, without blocking the card for any other merchant or payment. The physical card stays active. No other commitment is affected.

The action is labelled a payment block, not a subscription cancellation. This is not a UX detail; it is the load-bearing distinction between what the bank can do and what the client may believe they are doing. George states this before the action and again on the confirmation screen: the block stops the merchant from charging the card; the client's subscription account with the merchant remains open; ending the subscription account is the client's action, not the bank's. This framing is designed in rather than noted separately, because the UX defect H3 names -- a control that looks like cancellation when it is a payment block -- is the direct consequence of not stating it. The 1,940 complaints in twelve months coded to "charged after I cancelled" came from that defect; M2 does not reproduce it.

Standing orders and direct debits remain manageable from the same view, consistent with existing bank capability. A client who opens the hub can see and act on all three types from one place. Card subscriptions are the type that currently has no stopping capability at the bank; M2 adds that capability as the second component.

M2 does not address H4: the inconsistent experience by commitment type. H4 is a primary problem in A4 and was not addressed by the idea selected at G4. The MVP stage inherits that gap. A requirement that drifts toward normalising the experience across the three commitment types is an H4 requirement and is out of scope here.

M2 follows the path Revolut and Lloyds have established: Revolut's Smart Subscriptions operates in the Czech market today with merchant-level blocking confirmed in A7; Lloyds built its equivalent in partnership with Minna Technologies in July 2020. No Czech incumbent has built the same.

---

## How it works

A client opens the George app and navigates to the unified commitment section. The section displays all three types in one list: standing orders with their beneficiary names and next payment dates, direct debits with their mandates and amounts, and card-on-file subscriptions with their merchant names, charge amounts, and charge frequencies. Each entry is labelled by type so the client sees immediately which management rules apply.

For standing orders and direct debits, the existing management capabilities are accessible from within the view. The client can cancel, amend, or pause those without leaving the section. The capability boundary here is the existing bank capability unchanged.

For a card subscription entry, the client taps the entry and initiates a stop. Before the action proceeds, George shows a disclosure screen: this action will stop the named merchant from charging the card; the subscription account with the merchant will remain open; ending the account is the client's next action if they want to. The client confirms.

The bank places a per-merchant authorisation rule against the card. This is a card scheme-level instruction: future charges from this merchant against this card number are flagged for decline. The rule targets one merchant. All other merchants, all other cards, and all other commitments are unaffected. The physical card continues to work normally everywhere else.

George confirms the block is in place. The card subscription entry in the unified view shows its blocked status. The client sees that the next charge attempt from this merchant will fail. George also shows the client that the subscription account itself remains open, so the confirmation screen does not leave the client with an incomplete picture of what they achieved.

The Tapix classification layer is what keeps the unified view populated without client effort. Tapix processes transaction data and classifies each recurring item: card subscriptions from card-on-file charge patterns, standing orders from credit transfers, direct debits from debit mandates. The classification happens at the transaction level. A subscription the client signed up for three years ago appears in the view because Tapix identified the recurring pattern in the transaction data, not because the client registered it with the bank. This is what makes the view comprehensive rather than dependent on client memory: the coverage is derived from what actually left the account.

The merchant-level authorisation rule is the piece that requires card scheme permission. Under the current state at Czech incumbents, the only card-side stopping action available is a full-card block. That is the action H2 describes as making things worse: 9,270 calls in twelve months where no bank action was possible on card subscriptions, because the only available action was one the client could not accept. M2's distinction is the narrower rule: blocking one merchant while leaving the card active for all others. Whether the bank holds this permission under its Visa or Mastercard scheme agreements is a question the card scheme team must answer before this component can be built.

---

## What the pilot tests

M2 tests two questions in sequence, and the sequence matters: the first question is asked before any build begins.

**The capability question: can the bank place a per-merchant authorisation rule under its card scheme agreements?** This is the load-bearing dependency of the H2 component. If the answer is yes, the block capability is buildable and the pilot proceeds to design and build. If the answer is no, M2's H2 component cannot be built as described; the H2 delivery path is open again and the decision returns to whoever owns the option selection. The pilot begins this question by asking it before any build investment is made -- which is the most efficient point to ask it, and the point M2 was designed to surface it.

**The market question: does the merchant-level block satisfy clients who tried to stop a card subscription and were previously offered only a full card block?** This is what the pilot measures during the pilot period. The contact-centre agent in A2 described card subscription cases as the call type that goes worst; the aggregated report records 9,270 calls in twelve months where no bank action was possible. If a client who previously had no option now has a targeted block, the pilot measures whether that resolves the call -- whether clients use the block, whether they understand what it achieved, and whether they contact the bank afterward about the same subscription. The most likely complication the pilot will surface is the H3 dynamic: a client who places the block continues to hold a subscription account and may be confused about what they actually achieved, even with the disclosure screen. The pilot is designed to surface that gap, not to pretend it does not exist.

Secondary questions the pilot also provides evidence on:

Whether the unified view (H1) changes how clients manage their standing orders and direct debits once they can see all three types together. This is testable regardless of the H2 outcome: even if the scheme permission question returns a negative answer, the unified view component can still be piloted as M1, and the H1 question is answerable from that run.

Whether the Tapix classification layer is the deployable path to the CS consumer level, and what the deployment looks like in practice. This is a structural question about the Erste Group relationship, and the pilot is where the theoretical confirmation (TR1: confirmed Erste Group Tapix client) becomes an operational confirmation (CS consumer layer, Czech retail banking clients, George app integration).

The PRD must specify how each question is measured and at what point the measurement is read. A pilot that runs without a stated reading produces data; a pilot with a stated reading at a stated point produces a decision.

---

## What it means for the strategy

I1 was scored against the Strategy Basis at G4 on the AI-2 key result at the Strong band. This section names where M2 specifically -- the narrowed option -- serves or strains the key results in Strategy Basis §2. No re-scoring is performed here; the assessment happened at stage 4.1. A touchpoint names where the option meets a key result; it carries no band and no number.

**AI-2 (AI First) -- serves.** "Share of sales and service processes in primary digital channels that are fully straight-through." The brief's metric -- share of standing-order and direct-debit changes completed digitally without contact-centre contact -- is already anchored to AI-2. M2 extends the service scope: the unified view converts standing-order and direct-debit changes into straight-through digital processes (this is what the existing metric counts), and the merchant-level block converts card subscription stops into the same (which the existing metric does not yet count). Every client who stops a card subscription in George without calling the bank is completing a service process that AI-2 counts. The PRD must address whether the metric is extended to include card subscription stops or whether a separate pilot measure is defined for H2 outcomes. Leaving the metric extension implicit means the pilot produces data that does not map to the key result the brief is anchored to.

**SHD-1 (Super Human Super Digital) -- serves.** "Clients having a regular relevant interaction." A view that surfaces upcoming charges and lets clients act on card subscriptions gives clients a reason to return to it. The interaction is relevant because it is directly about money leaving the account. The block makes the interaction actionable rather than purely informational: a client who opens the view and can act on what they see has a reason to open it again when the next charge is due. Regular use depends on the view being useful; usefulness requires both visibility (H1) and action (H2). M2 provides both.

**LVL-2 (Level Up) -- serves, defensively.** "Share of wallet." Revolut already operates merchant-level blocking in the Czech market today, confirmed in A7. A client who migrates to Revolut to get this capability is a client whose wallet share has moved. M2 closes the capability gap between the bank and the one competitor already operating with this functionality in Czech. The strategic argument is retention rather than acquisition: a client who can stop a subscription from George does not need to open a Revolut account to do the same thing. The wallet-share case is strongest while Revolut is the only Czech-market competitor with the capability, and it weakens as other incumbents build equivalents.

**TL-2b (Technology Leadership) -- strains, during build.** "Work in progress." M2 introduces two parallel build tracks before either component ships: the Tapix integration at the CS consumer layer, and the card authorisation block layer. The scheme permission investigation precedes both and is a third item consuming capacity. This adds to work in progress relative to M1, which carries only the Tapix integration. The strain is temporary: a positive scheme permission answer allows both tracks to proceed; a negative answer reduces scope to M1 and removes the card track, resolving the WIP strain at the cost of H2. The PRD should acknowledge this strain explicitly when sequencing the build.

---

## What has to be handled

Two preconditions. Neither is a risk to accept and carry into the build; both must be resolved before the build begins.

**The card scheme permission is unresolved, and M2's H2 component depends on it.**

Placing a per-merchant authorisation rule without blocking the full card requires the bank to hold that permission under its Visa or Mastercard scheme agreements. Whether that permission exists is the question the Banking Constraints body would answer. The Banking Constraints body is absent from this run by stakeholder decision (PD164, open since 13 August). The absence of the body does not transfer the question elsewhere or make it answerable from the run material; it makes it the first thing the PRD stage must commission.

This is a precondition of the build, not a risk note. A risk note accepts a risk and carries it forward. This is different: M2's H2 component is not buildable unless the permission exists, full stop. If the permission does not exist, M2 reduces to M1 -- the unified view without the card payment control -- and the H2 delivery path is open again.

The action the PRD stage should take is not to wait for the Banking Constraints body to be staffed. It is to commission the scheme permission question as a targeted investigation, owned by the bank's card operations team, against the bank's actual Visa and Mastercard scheme agreements, with a binary answer due before the first PRD review. The question is specific: does the bank hold permission to place a per-merchant authorisation rule on a client's card that prevents charges from one merchant without blocking the card for other merchants? A yes or no. A "we will need to check" is not an answer the PRD can work from; it is a request for the investigation to be scoped and owned.

The compliance touchpoints above address the scheme permission as a build gate rather than a background condition: the block capability is not offered to clients and not built until the permission is confirmed. The PRD inherits this gate.

**The Tapix consumer deployment path is unconfirmed, and the unified view depends on it.**

TR1 in A7 establishes that the Erste Group, Ceska sporitelna's parent, is a confirmed Tapix client. The classification intelligence that makes the unified view possible is already deployed at the group level. What is not confirmed is whether that group-level relationship extends to a Czech retail banking consumer product deployment under the same commercial arrangement -- covering CS specifically, Czech retail banking clients' transaction data, and the George app as the consumer surface.

This question sits under the whole option. M1, M2, and M3 all depend on the Tapix layer for the unified view. A commercial or architectural barrier to the CS consumer deployment would affect all three, not M2 alone. The Erste Group Tapix relationship is a structural advantage; it is not a deployment confirmation.

The PRD must confirm three things before the unified view can be specified for build: the commercial terms under which CS can access the Tapix consumer product layer, the data processing scope and whether Czech retail banking clients' transaction data is covered under the existing group-level arrangement or requires a separate instrument, and the technical integration model for the George app. Each of these may require a different conversation at a different level in the organisation. The PRD should identify who at CS and at Tapix answers each.

---

## What the requirement stage needs

The PRD stage receives M2 with two unconfirmed preconditions and a selected idea that leaves one primary problem unaddressed. Before requirements can be written, eight items must be resolved. None of them are items the PRD invents; each requires a concrete answer from a person who can give one.

**1. Card scheme permission: a binary answer before any M2 requirement is written.**

The block capability cannot be designed for build until the bank's card scheme team confirms or denies the permission. The question is specific: does the bank hold permission under its Visa and Mastercard scheme agreements to place a per-merchant authorisation rule on a client's card without blocking the card for other merchants? The PRD must name who owns this question, who gives the answer, and when the answer is due. The answer is due before the first PRD review, not as an input to a later review. A yes allows the block capability to be designed; a no removes it from scope and reduces M2 to M1. Commission this investigation as the first deliverable; everything else in the PRD that touches the H2 component waits on it.

**2. Tapix consumer deployment: three confirmations, three conversations.**

The unified view cannot be specified until three things are confirmed: (a) the commercial terms under which CS can deploy the Tapix consumer product layer for Czech retail banking clients; (b) whether Czech retail banking client transaction data is within scope of the existing group-level data processing arrangement or requires a separate instrument; and (c) the technical integration model for the George app. Each of these is a different conversation at a different level. The PRD must identify who at CS and who at Tapix gives each answer, and sequence the three confirmations so that the unified view requirements are not written on an unconfirmed foundation.

**3. Success measure: proxy, direction, and reading point.**

This is the item most likely to be skipped and the one that most determines whether the pilot produces a decision.

The brief's current metric -- share of standing-order and direct-debit changes completed digitally with no contact-centre contact within 48 hours -- does not cover card subscription stops, because there is currently no capability to measure and no baseline. The metric baseline was explicitly flagged as unknown in the brief record (R-A1-01). Two gaps must be closed before the pilot can produce a decision rather than data:

First, the PRD must define a proxy metric for H2 outcomes. A reasonable proxy is the count of merchant blocks placed combined with the direction of change in card-subscription-related contact-centre contacts during the pilot period. This bank has never measured card-subscription contact-centre contacts as a category distinct from other recurring-payment contacts; the PRD must confirm whether that split is measurable from the contact-centre data, and if not, find the proxy that is. The direction of the proxy is the threshold: blocks placed and contacts decreasing is a positive signal; blocks placed and contacts unchanged or rising means M2 is not solving H2 in the way the brief described.

Second, the PRD must state when the reading happens -- the specific point at which someone decides whether the pilot answered the question. A pilot with a proxy metric but no reading point produces data indefinitely. The reading point is where a named person reads the data and decides pass or fail.

A pilot with no declared threshold produces data and no decision. The data from a pilot without a threshold is not worthless; it cannot be read as a decision by someone who was not in the room when the pilot ran.

**4. H2 UX labelling: specified at requirement level, not left to design.**

The pre-action disclosure text, the action label, and the post-action state display must be written into the PRD as requirements, not as design guidelines. The reason is H3: 1,940 complaints in twelve months coded to "charged after I cancelled" came from a UX where the label implied cancellation and the action was something else. A design team that inherits vague requirements about "honest labelling" can reproduce the H3 error while satisfying the requirement as written. The PRD must be specific enough that the distinction between a payment block and a subscription cancellation is unavoidable in any implementation that passes requirement review.

**5. H4 scope boundary: explicitly stated in the PRD.**

M2 addresses H1 and H2. H4 -- no consistent experience when changing a commitment; type determines what the bank can do and clients are not told this -- is a primary problem in A4 that M2 does not address and that the selected idea I1 does not address. The PRD must state this boundary explicitly. Without it, requirements that normalise the experience across all three commitment types will enter the set, the pilot scope will grow, and the H1 and H2 questions will take longer to answer because the build is larger. The H4 boundary is not obvious from the product concept; a client-facing person looking at the unified view will ask why the standing-order cancellation experience is different from the card subscription stopping experience. The PRD's answer must be "H4 is out of scope for this pilot" and must be written before those conversations happen.

**6. Contact-centre handoff: the client journey beyond the block.**

Every participant in A7 that has built card payment controls confirms the same ceiling: the bank stops the payment mandate but cannot cancel the merchant contract, because the contract sits with the merchant. M2 does not change this ceiling. The PRD must specify what happens after the block for the cases the block does not fully resolve:

A merchant that charges on a different card number. The block targets one card; if the merchant holds credentials for a second card, the block on the first card does not stop the charge on the second.

A client who wants to end the subscription account, not just stop the card charge. The block stops the payment; the subscription account with the merchant remains open. What is the bank's response when the client asks the bank to help them end the account?

A block placed but a charge that appeared anyway. What is the investigation path and who owns it?

None of these cases is unusual; A7 confirms that every participant with this capability faces the same handoff question. Leaving it unspecified means the contact centre inherits it with no defined answer, which is where H6 (post-merchant-cancellation disputes falling between teams) originates.

**7. Pilot population and scope: deliberately defined before build.**

The pilot must specify who is enrolled (which clients), which merchant types and card schemes are in scope for the block, how long the pilot runs, and what measurement instrument captures outcome. A merchant block removes a merchant from a client's card for future charges. It cannot be self-reversed by the client; reversing it requires a bank-side action. A pilot that enrolls the wrong population or covers merchants where the block is ambiguous in effect -- merchants who bill on multiple card numbers, merchants in a category where the block is legally restricted -- will produce data that is harder to read and harder to explain.

The PRD must also define the recoverability procedure: what happens when a block is placed incorrectly, what the resolution path is, and who the client contacts. The recoverability procedure is a requirement, not an operational afterthought; it is what makes a pilot safe to run.

**8. Kill criterion: a named person and a named reading point for each known kill.**

The PRD Template §2.3 names a horizon, an owner, and a kill criterion. M2 has two known kills and both require the PRD to name a person, not just a condition.

The first kill is pre-build: the scheme permission returns a negative answer. This is binary and the decision is not complicated; whoever receives the card scheme team's answer owns the call to reduce scope to M1. The PRD must name that person.

The second kill is during the pilot: merchant blocks are placed but card-subscription contact-centre contacts do not decrease directionally. This means M2 is not solving H2 in the way the problem was understood. The PRD must name who reads the pilot data at the stated reading point and has authority to call the pilot on this ground. Without a named person, the decision defaults to whoever is running the pilot and may not be made.

Neither kill criterion is a number. Both are directional. Both require a person. The PRD must name both.

---

## What we could not establish

**Whether the bank holds card scheme permission to place a per-merchant authorisation rule.** The Banking Constraints body (PD164) is absent from this run by stakeholder decision. The scheme permission question is named and carried forward as a precondition of the build; it is not answered here and cannot be answered from this run's material. A check of the bank's Visa and Mastercard scheme agreements, conducted by the card operations team, is what answers it.

**Whether the Erste Group Tapix relationship extends to a Czech consumer product deployment.** TR1 in A7 confirms Erste Group as a confirmed Tapix client. No Czech retail banking consumer product deployment is publicly confirmed. The commercial terms, the data processing scope, and the technical integration model for such a deployment are not assessable from any source this run holds. The group relationship is the structural advantage; it is not the deployment confirmation.

**What the Compliance Guidelines say about the merchant-level block.** The Compliance Guidelines are absent from this run (PD164). The compliance touchpoints above were identified on the basis of the run material and general knowledge of the domain; they are marked indicative_unverified_compliance. A rule in the Compliance Guidelines may add touchpoints not named above or change the framing of the ones that are. The list above is the starting point for the PRD's compliance review, not a clearance.

---

## How this was produced

Run 2026-07-standing-orders, stage 5.2, mvp-expansion. M2 was selected at G5a on 2026-08-24 by Igor Tadic. This invocation expands M2 only; M1 and M3 are not commented on, re-ranked, or compared.

Five source artifacts were read: A10 (M2's statement, approach, and differs_by from the option record, and the decision record confirming M2 was selected at G5a), A9 (I1, the selected idea, and what it carries into the MVP stage), A8 (I1's full five sections from the idea set, for the H1 and H2 resolution narrative), A4 (H1 and H2 as the primary problems M2 addresses, and H4 as the primary problem M2 does not address), and A7 (the competitive synthesis, for the merchant-level blocking market evidence, the Tapix infrastructure evidence, and the H3 ceiling confirmed by every participant that has built card payment controls).

The Strategy Basis was read for the strategic touchpoints. All touchpoints name a key result from §2 of that body and state whether M2 serves or strains it.

The Banking Constraints body is absent (PD164); the scheme permission question is stated as a precondition and is not assessed. The Compliance Guidelines are absent (PD164); compliance touchpoints are marked indicative_unverified_compliance. Both reductions are applied as the mvp-expansion skill describes.

Assembled from one record: R-A11-01 (records/5-mvp/A11-r01-expanded.record.md).
