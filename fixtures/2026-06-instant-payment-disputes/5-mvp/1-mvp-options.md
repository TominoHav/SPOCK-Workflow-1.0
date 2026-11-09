---
run_id: 2026-06-instant-payment-disputes
artifact_id: A10
ost_role: artifact
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
sources:
  - A9
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
  accepted_by:
    - name: Igor Tadic
      role: product_owner
  accepted_at: 2026-08-22
  changed_during_refinement: none
  refinements: []
  selection: OPT-B
  note: "OPT-B answers OPT-A's operational question on the way through, because the despatch automation has to work before any client confirmation can be sent, and it puts a timestamped record in the client's hands, which is the nearest thing in the option set to the brief's own success signal. OPT-A and OPT-C are not fallbacks and are not expanded."
assembled_at: 2026-08-22
assembled_from:
  - R-A10-01
---

# MVP options: automated recall despatch and real-time status feed

Three approaches to piloting IDEA-05 sit in this document. Each attaches the ISO 20022 recall message to the moment a claim is registered; they differ by where the registration originates and who receives the confirmation. The choice is a person's. [rec:R-A10-01]

---

## OPT-A: Despatch confirmation to staff only

Staff register a recall claim through existing contact-centre or branch systems. Registration triggers the automated outbound ISO 20022 message to the receiving bank. The attending agent receives a timestamped confirmation before the call or visit ends. The client is informed verbally by the agent. No client-facing system is changed.

This approach addresses H2 directly: the despatch fires automatically at registration, removing the handoff chain and the queue at the recalls desk. It addresses the agent half of H4: the agent can confirm the recall went out, with a timestamp, in the same session. The client half of H4 - whether the client receives their own confirmation - is not delivered digitally; it travels by voice.

The integration scope is the narrowest of the three. The pilot touches claim registration tooling and the back-office outbound messaging stack. No new channel is required, no client surface is changed, and no online banking or mobile app changes are in scope.

## OPT-B: Despatch confirmation to staff and client

Staff register a recall claim through existing contact-centre or branch systems. Registration triggers the automated ISO 20022 message to the receiving bank. Both the attending agent and the client receive a timestamped confirmation in the same session - the agent through their tooling, the client through SMS or push notification. The client holds their own record without depending on the agent to relay it.

This approach addresses H2 and all of H4. The agent can confirm despatch in session, and the client receives the same fact independently, in writing. The two questions H4 identifies - whether the recall was sent and whether recovery is still possible - each have an answer the client can hold without making a follow-up call.

The integration scope extends beyond OPT-A at one point: in addition to claim registration and the outbound recall message, the pilot must build or connect an outbound notification channel to the client. Where an existing SMS or push gateway is available that build is contained. Where one is not, it is the material addition this option carries over OPT-A.

## OPT-C: Client self-registration with automated despatch

The client registers the recall claim through a digital surface in online banking, without calling or visiting a branch. Registration triggers the automated ISO 20022 recall message to the receiving bank. Confirmation returns in the same digital surface. No staff member is in the registration path.

This approach addresses H2 for clients who register digitally. It addresses H4 through the digital surface rather than through a staff session. It also narrows the H5 gap that the IDEA-05 selection left open: the out-of-hours constraint binds only when registration requires a staffed channel, and a digital surface available at any hour changes that for clients willing to use it.

The integration scope is different from OPT-A and OPT-B, not larger in the same direction. OPT-A and OPT-B both build automation into the staff-side claim registration flow. OPT-C builds a client-facing registration flow instead. The back-office despatch mechanism is the same as in either of the other two; what changes is the surface that triggers it and the person who initiates the action.

## How to choose between them

OPT-A teaches whether the despatch automation is reliable when embedded in an existing staff workflow. The primary uncertainty it resolves is operational: does the automated outbound recall message work at real registration volume, does it fire within the session window, and do agents trust the confirmation enough to relay it confidently?

OPT-B teaches whether a direct client confirmation changes behaviour. The primary uncertainty it resolves is behavioural: does a client who receives their own timestamped record call back less, escalate less, or report a better experience? This question cannot be answered under OPT-A, where the client's only information is what the agent says.

OPT-C teaches whether clients can reliably self-register a recall and whether the out-of-hours access constraint can be addressed without a staffed channel. The primary uncertainty it resolves is structural: is staff mediation a necessary part of the registration step, or an artefact of the current process that a digital surface can replace for the clients willing to use one?

The questions are independent. Choosing OPT-A does not produce the data OPT-B would collect. OPT-C answers a different question from either of the other two. No combination of outcomes from one option predicts what the others would find.

## What we could not establish

Banking Constraints are absent from this run. Whether any option carries a regulatory or technical constraint the others do not is unknown. `constraints_met[]` is empty for all three options and cannot be populated until the constraints body is assembled and applied. The record carries `constraint_basis: none_stated`.

The CERTIS path for CZK-denominated payments is unconfirmed. The competitive synthesis established the euro-area RT1 infrastructure for EUR instant payments; it did not confirm an equivalent recall message path for CZK payments through CERTIS. All three options as written apply to the ISO 20022 recall mechanism generally. If the CERTIS question is not resolved before the pilot scope is fixed, each option will need to be scoped to EUR payments only.

Whether any option encounters an obstacle in the Compliance Guidelines body is also unknown. Compliance Guidelines are absent from this run. Compliance touchpoints are addressed in the expansion step, not here.

## How this was produced

Run 2026-06-instant-payment-disputes, stage 5.1, skill mvp-option-design, agent product-owner. Inputs read: A9 (selected idea, `4-solutions/3-selected-solution.md`) and A7 (competitive synthesis, `3-competitive-analysis/3-competitive-synthesis.md`).

Banking Constraints are absent. The divergence discipline ran unchanged: three whole alternatives, each with a stated `differs_by`, none sequenced, none preferred. What degrades is the validation that a difference is bank-material. `constraint_basis: none_stated` on the record; `constraints_met[]` is empty for all options.

Compliance Guidelines are absent. No compliance touchpoints are addressed in A10; that belongs to the expansion step (A11), per Q5 and §6.11.

No gate has run. Q5 and G5a follow this document.

Assembled from one record: R-A10-01 (`records/5-mvp/A10-r01-options.record.md`).
