---
run_id: 2026-07-standing-orders
artifact_id: A10
ost_role: artifact
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "2..3 options, each a whole way to pilot the idea, never a subset or a phase of another"
    needs: judge
    reach: artifact
  - rule: "every constraint referenced resolves into the Banking Constraints"
    needs: check
produced_by:
  agent: product-owner
  skill: mvp-option-design
sources: [A9, A8, A4, A7]
external_sources: []
decision:
  gate: G5a
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: product_owner
  accepted_at: 2026-08-24
  changed_during_refinement: none
  refinements: []
  selection: M2
  note: "M2 was selected and no rationale was recorded with the selection, so none is stated here. What the option set says about M2 stands on its own: it answers H2 by blocking one merchant's authorisations, it makes the card scheme permission question a precondition of the build rather than a later surprise, and it is the mechanism a client can be told about in one sentence. M1 and M3 are not fallbacks and are not expanded."
assembled_at: 2026-08-24
assembled_from: [R-A10-01]
---

# MVP Options | Unified Commitment Hub

Three whole ways to pilot I1 are on the table, and one of the three does not depend on the card scheme question at all. I1 has two components: a unified view of all three recurring commitment types (H1) and a mechanism to stop a card subscription without blocking the whole card (H2). H1 has no feasibility dependency -- the Tapix classification layer is already deployed at the Erste Group parent. H2 has an unresolved fork: whether the bank uses a merchant-level authorisation block or per-subscription virtual card credentials depends on card scheme permissions that no existing body in this run covers. The three options below differ on whether they include H2 at all, and if so, by which mechanism.

[rec:R-A10-01]

---

## M1 -- Unified view, no card mechanism dependency

**Pilot the unified commitment view across all three recurring commitment types, without a card payment control mechanism.**

The George app gains a single section that shows every recurring commitment leaving a client's account: standing orders, direct debits, and card-on-file subscriptions in one list, each labelled by type, with the amount and next-due date. The classification intelligence that identifies all three types already exists at the Erste Group level through the Tapix relationship (TR1). This option uses that infrastructure to close H1 -- the visibility gap -- without touching the card stopping question.

For card subscription entries, the view displays the merchant name, the amount, and the charge frequency. No bank-side stopping action is offered from this view. George states plainly that stopping a card subscription requires contacting the merchant, because the bank cannot currently stop it from the bank side. This is the honest position every participant in A7 that has addressed this topic has confirmed: the bank cannot cancel the merchant contract.

Standing orders and direct debits remain manageable from the same view, consistent with the bank's existing capability. The client who opens this section can act on those two types without leaving the view.

The card scheme question -- whether the bank can place a per-merchant block or issue virtual credentials per subscription -- does not affect this option. The pilot can proceed to design, build, and launch without waiting for the Banking Constraints body, because this option makes no claim that requires a card scheme answer.

What this pilot tests: whether unified visibility alone moves client behaviour on H1, and whether the Erste Group Tapix relationship is the deployable path to the CS consumer layer. Those two questions are answerable without resolving the card mechanism question.

---

## M2 -- Unified view with merchant-level payment block

**Pilot the unified commitment view plus a per-merchant authorisation block as the H2 delivery mechanism.**

The George app gains the same cross-type view as M1: standing orders, direct debits, and card subscriptions in one list with type labels and next-due dates. M2 adds a card stopping action that M1 does not include. When a client selects a card subscription entry and initiates a stop, the bank places a per-merchant authorisation rule that prevents future charges from that merchant against the client's card, without blocking the card for any other payment. The physical card remains active for every other merchant.

The action in George is labelled as a payment block, not a subscription cancellation. This labelling is not a UX detail -- it is where H3's fix begins. Every participant in A7 that has built this capability (Revolut, Lloyds, NatWest) confirms the same ceiling: the bank stops the payment mandate but does not cancel the merchant contract. George states this for the client before they act and again on the confirmation screen: the block stops the merchant charging this card; the client's subscription account with the merchant remains open, and ending that account is the client's action.

This option follows the Revolut and Lloyds path. Revolut's Smart Subscriptions uses per-merchant blocking and already operates in the Czech market with this capability today. Lloyds built its Manage Subscriptions feature in partnership with Minna Technologies in July 2020 using the same blocking approach.

This option depends on the card scheme question. Placing a per-merchant authorisation rule without blocking the full card requires the bank to hold that permission under its Visa or Mastercard scheme agreements. That permission is not confirmed or denied in any source this run has access to. The Banking Constraints body is where that answer would sit. If the bank does not hold the permission, this option is not buildable as described.

What this pilot tests: whether the bank can place a per-merchant authorisation rule under its scheme agreements, and whether the merchant-level blocking UX satisfies clients who tried to stop a card subscription and were previously offered only a full card block.

---

## M3 -- Unified view with per-subscription virtual card credentials

**Pilot the unified commitment view plus per-subscription virtual card credentials as the H2 delivery mechanism.**

The George app gains the same cross-type view as M1 and M2: standing orders, direct debits, and card subscriptions in one list with type labels and next-due dates. M3 adds a card stopping action that operates differently from M2. At the point each card subscription is detected and added to the view, the bank issues a distinct virtual card credential for that subscription. The merchant that holds the client's card number for billing holds this virtual number, not the physical card number. When the client initiates a stop on that subscription entry, the bank revokes the virtual credential -- a bank-side action that deletes the card number the merchant is billing. The merchant's next charge attempt fails because the credential it holds no longer exists. No authorisation block rule is placed at the scheme level, and the physical card is unaffected.

The action in George carries the same honest framing as M2: the credential deletion stops the merchant from charging this card; the client's subscription account with the merchant remains open. As with M2, George states this before the client acts and again on the confirmation.

This option follows the Monzo path. Monzo's virtual card mechanism -- where cards with configurable expiry dates can be used for subscriptions and then allowed to expire -- is the closest confirmed market analogue. The mechanism gives the bank a unilateral action (revoking a credential it issued) that sits within the bank's card issuance authority rather than requiring a scheme-level blocking permission. Whether that distinction changes the permission picture depends on how the bank's card scheme agreements treat virtual card issuance for this purpose.

This option also depends on the card scheme question, but through a different permission path than M2. The bank must be permitted to issue one virtual card credential per identified subscription under its scheme agreements. The Banking Constraints body is where that answer would sit. If the bank cannot issue virtual cards per subscription under its agreements, this option is not buildable as described.

The data architecture of this option differs from M2 in a way that matters for the pilot design. Virtual credentials must be issued at detection -- when each subscription is first identified in the view -- rather than at stopping time. A client who has not yet stopped any subscription still has credentials issued on their behalf. The pilot scope must therefore include the credential issuance lifecycle, not only the stopping action.

What this pilot tests: whether per-subscription virtual card issuance is permissible under the bank's scheme agreements, and whether clients understand and trust the credential model as a mechanism for stopping a subscription charge.

---

## How to choose between them

The three options divide along two axes: whether H2 is in scope at all, and if so, which card mechanism delivers it.

**The H2 axis.** M1 deliberately excludes the card stopping mechanism. M2 and M3 both include it. Choosing M1 means accepting that the pilot will validate H1 only and that H2 remains unaddressed until a separate initiative resolves the card question. Choosing M2 or M3 means committing to resolve the card scheme question before the pilot can be built.

**The mechanism axis (M2 vs M3).** M2 places a merchant-level block at stopping time; M3 issues a per-subscription credential at detection time and revokes it at stopping time. The two mechanisms may have different permission requirements under the bank's card scheme agreements. The practical and UX differences are also real: M2 is simpler to explain to a client (you blocked this merchant from charging your card); M3 requires the client to understand that their subscription is held against a different card number from their physical card. M3's credential issuance adds a pre-stop data step that M2 does not require.

**What each option would teach:**

Running M1 teaches whether a unified visibility layer changes client behaviour on H1 and whether the Erste Group Tapix relationship is the path to building it at CS. It does not teach anything about which H2 mechanism works or whether either is permissible.

Running M2 teaches whether the bank can place a per-merchant authorisation block under its scheme agreements, and whether clients find merchant-level blocking a satisfactory way to stop a subscription charge. If the scheme permission does not exist, this option reveals that before build investment is made.

Running M3 teaches whether the bank can issue per-subscription virtual card credentials under its scheme agreements, and whether clients understand and accept the credential model. It also teaches about the operational cost of issuing and managing credentials at detection scale before any client stops a subscription.

None of these three is the only way to learn these things. What the person choosing at G5a decides is which question is worth asking first, and how much of the card scheme risk they want to carry into the pilot.

---

## What we could not establish

**Whether the bank can place a merchant-level authorisation block.** M2 depends on the bank holding card scheme permission to place a per-merchant authorisation rule without a whole-card block. Whether that permission exists under the bank's Visa or Mastercard agreements is the central question the Banking Constraints body would answer. That body is absent from this run (PD164, open since 13 August). This question is stated on M2 rather than as a general caveat, because M1 and M3 do not share this dependency.

**Whether the bank can issue per-subscription virtual card credentials.** M3 depends on the bank's card scheme agreements permitting virtual card issuance at the per-subscription level for this purpose. Whether that permission exists is a different question from M2's but also sits in the Banking Constraints body. It is stated on M3 for the same reason: M1 and M2 do not share this dependency.

**Whether the Erste Group Tapix relationship is the CS deployment path.** TR1 establishes that the Erste Group is a confirmed Tapix client. No Czech retail banking consumer product deployment is publicly confirmed. Whether the group-level relationship translates to a CS consumer product under the same commercial arrangement is a bank constraint this run cannot assess. All three options rest on the Tapix classification layer for the unified view; all three carry this open question.

**The constraints_met field for each option.** The Banking Constraints body is absent. Where an option would reference a specific constraint (for example, a scheme rule that permits or restricts a mechanism), the reference cannot be verified against any body this run holds. The field is empty across all three options and the artifact carries `constraint_basis: none_stated`.

---

## How this was produced

Run 2026-07-standing-orders, stage 5.1, mvp-option-design. This invocation designed the option set for I1, the Unified Commitment Hub selected at G4 on 2026-08-24 by Igor Tadic.

Four source artifacts were read: A9 (selected idea and its five sections), A8 (I1's full five sections from the idea set), A4 (prioritised problems, for H1 and H2 as the problems I1 addresses), and A7 (competitive synthesis, for the card mechanism market evidence).

The central fork is the card scheme question that A9 carried into this stage. Two card mechanisms exist in the market: merchant-level blocking (Revolut, Lloyds) and per-subscription virtual card credentials (Monzo). Whether either is available to this bank requires the Banking Constraints body. Rather than stating this as a general caveat, the option set uses it as the differentiating axis: M1 sidesteps it, M2 depends on the blocking permission, M3 depends on the credential issuance permission. The three options are therefore genuinely different in their feasibility dependencies, not only in their UX.

The Banking Constraints body is absent from this run (PD164). The reduction described in the mvp-option-design skill applies: `constraint_basis: none_stated`, `constraints_met: []` on every option, divergence discipline unchanged.

Assembled from one record: R-A10-01 (records/5-mvp/A10-r01-options.record.md).
