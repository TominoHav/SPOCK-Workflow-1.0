---
run_id: 2026-03-investor-onboarding
artifact_id: A11
ost_role: artifact
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
produced_by:
  agent: product-owner
  skill: mvp-expansion
sources:
  - A10
  - A9
  - A7
external_sources: []
could_not_verify:
  - rule: "every compliance touchpoint is addressed in functionality, not merely listed"
    needs: judge
    reach: artifact
decision:
  gate: G5b
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: Product Owner
  accepted_at: 2026-08-13
  reason: "Accepted as it stands. The expansion of OPT-1 is at the depth an analyst can write requirements against, and the three compliance touchpoints it identified are the substantive addition: ID-2 named none, and an explanation layer sitting on a regulated product is not free of obligations merely because it leaves the questions alone. Each is addressed in the described functionality rather than listed. Accepted knowing the strategic case rests on market evidence alone and the compliance reasoning rests on regulation read directly, because neither the Strategy Basis nor the Compliance Guidelines exists — those are marked on the artifact and carried to stage 6 as open review processes rather than treated as settled."
  changed_during_refinement: none
  refinements: []
assembled_at: 2026-08-20
assembled_from: [R-A11-01]
---

# MVP | Expanded MVP — OPT-1: On-demand contextual help

**Run:** `2026-03-investor-onboarding` · **Stage:** 5.2 `mvp-expansion` · **Gate:** Q5 then G5b
**Expands:** OPT-1, selected at G5a by Igor Tadic (Product Owner), 2026-08-13
**Traces to:** A9 (ID-2) → A4 (H2, primary problem)



**Assembled from one record**, which carries the fields a gate decides: [rec:R-A11-01].
---

## What was selected, and why this document does not re-open it

OPT-1 was selected at G5a by the Product Owner. The decision is recorded in `5-mvp/1-mvp-options.md`.
This document expands that selection to analyst-ready depth. It does not compare OPT-1 with OPT-2 or
OPT-3; those alternatives are closed and remain in A10 unaltered.

The reasoning behind the selection: OPT-1 is the only option that asks the pilot's specific question —
whether a first-time investor will reach for help when it is offered in context — without imposing
explanation content on customers who did not seek it. OPT-2 shows explanations to everyone and adds
friction for those who did not need them. OPT-3 front-loads everything before the first question and
cannot help at the moment uncertainty actually arrives.

---

## The expanded option

### What it is

An explanation indicator is embedded at every question in the suitability questionnaire and at every
fund product label in the fund-selection screen. The indicator is visible but minimal — a tappable
element that occupies no significant layout space and shows nothing until the customer activates it.
On activation, an explanation appears. The customer dismisses it and continues. The questionnaire
questions, wording, answer options and sequence are unchanged.

This is the digital equivalent of what the branch adviser performs in person: vocabulary support at
the exact moment a customer needs it, without interrupting a customer who did not ask. Every
profiled competitor currently resolves H2 through the branch adviser (A7, ST5). No profiled competitor
has moved that resolution into the digital channel (A7, absences A1 and A2). OPT-1 is that move.

### What the indicators explain

**At each questionnaire question:**
- What the question is asking, in plain language
- Why the bank is required to ask it — the MiFID II obligation in accessible terms: to produce a risk
  profile that can be matched to a fund before any investment recommendation is made
- What the answer options imply for the customer's investment profile — generically, without
  referencing this customer's prior answers or accumulated profile state

**At each fund product label (dynamic, balanced, conservative, and equivalent):**
- What the label category means — the risk and return characteristics it describes
- How a customer's derived risk profile typically maps to this category
- A direction to the applicable Key Information Document for the regulated fund information the label
  represents

### What the mechanism does not change

The questionnaire questions, wording, answer options and sequence are unchanged. The fund product
list, sorting and pricing are unchanged. The questionnaire scoring logic and risk-profile derivation
are unchanged. The experience of a customer who does not activate any indicator is identical to today.

### What this option tests

Whether first-time investors discover and use a self-directed explanation mechanism at the moment of
uncertainty — whether on-demand access, offered in context at every question and every label, is
sufficient for the target segment to complete the questionnaire and reach a fund selection without the
branch fallback.

---

## Strategic touchpoints

The Strategy Basis does not exist. Every touchpoint below is identified from the market synthesis (A7)
and is marked `indicative_unverified_strategy` — a sentence rather than a verified claim until that body
lands.

**ST.a — First mover in digital educational support at the questionnaire**

The market synthesis records two absences directly relevant to OPT-1: no profiled competitor evidences
in-flow educational content embedded in the digital investment journey (A7 absence A2, H2), and none
evidences a vocabulary-accessible questionnaire for first-time investors (A7 absence A1, H2). All three
profiled competitors resolve H2 through the branch adviser (ST5); none has moved that function into the
digital channel. OPT-1 enters this space without a direct in-scope comparator.

**ST.b — Branch-to-digital migration, aligned with TR-B2**

Retail investment delivery has moved from branch adviser to in-app self-service at all three profiled
competitors (TR-B2). The branch adviser is the market's current resolution of H2 (ST5). OPT-1 follows
the migration direction the whole market is already following, and is the first in-scope deployment of
the educational function in the digital channel.

**ST.c — Savings-to-investment conversion at the vocabulary barrier**

TR-B1 identifies the failed first-investment attempt as the commercial event this run's initiative must
prevent. TR-B3 identifies vocabulary unfamiliarity as the primary conversion barrier for Czech
first-time investors. H2 is the evidence that this barrier sits at the suitability questionnaire
specifically. OPT-1 addresses the barrier at the exact point it occurs.

**ST.d — Pull model constrains friction risk**

The pull model leaves the screen a confident customer sees unchanged. This limits the risk of adding
friction for the segment that does not need explanations, which the selection reasoning identified as the
chief drawback of OPT-2. Strategy Basis absent — this is a design-level constraint on the option, not a
verified strategic priority.

---

## Compliance touchpoints

The Compliance Guidelines do not exist. Every touchpoint below is identified from general regulatory
knowledge and is marked accordingly. These are not validated obligations — they are identified
obligations that require compliance review before implementation.

A9 recorded that ID-2 "names no compliance touchpoint at all" because it adds a layer alongside the
questionnaire rather than altering it. That structural reasoning holds. But an explanation layer
that describes regulated questionnaire questions and regulated fund products is not automatically free
of obligations, and the PRD will need them resolved.

**CT.a — Suitability questionnaire integrity under MiFID II Article 25**

A MiFID II suitability questionnaire produces a legally required risk profile. Explanation text
attached to its questions must not bias customer answers, alter the effective meaning of those
questions, or undermine the questionnaire's validity as a regulated suitability assessment instrument.
If explanation text caused a customer to answer differently than they would have otherwise, the derived
risk profile would not reflect the customer's independent assessment — which is what Article 25 requires.

Addressed in OPT-1 functionality: indicators are invisible by default and customer-activated only, so
no explanation is presented to a customer who has not sought it. Explanation texts are generic and
factual and do not suggest which answer option is preferable; they explain what the question is asking,
not what to answer. Questionnaire progress and all prior entries are preserved throughout explanation
viewing and dismissal. A compliance review of each question's explanation text, confirming it cannot
reasonably be read as steering an answer, is required before deployment — an open requirement for
the PRD.

**CT.b — Fund product disclosure alignment under PRIIPs**

Fund product labels in the digital channel describe investment products subject to PRIIPs Regulation
(EU) 1286/2014 disclosure requirements. Explanation texts on these labels must be consistent with the
applicable Key Information Documents, must not simplify away required risk disclosures, and must not
function as a substitute for the KID.

Addressed in OPT-1 functionality: explanation texts for fund labels are authored against the applicable
PRIIPs KIDs and treat the KID as the authoritative source for regulated product information. The
explanation mechanism directs customers to the KID; the explanation text is supplementary context,
not the customer's sole disclosure pathway. A KID-alignment review for each fund label's explanation
text is required before deployment — an open requirement for the PRD.

**CT.c — Investment information versus investment advice under MiFID II Article 24**

Explaining what questionnaire answer options imply for a customer's investment profile approaches the
regulated distinction between investment information (permitted for an appropriately licensed bank) and
personalised investment advice (which carries its own regulatory conditions). The risk is at the
specific phrase "what the answer implies for the customer's investment profile."

Addressed in OPT-1 functionality: explanation texts are generic and apply identically to all customers.
They describe what the vocabulary means and what the answer categories entail in a fund-selection
context. They do not reference this specific customer's prior answers, accumulated profile state,
financial situation, or personal circumstances, and they make no personalised recommendation. A content
review confirming the information/advice boundary for each explanation text is required before
deployment — an open requirement for the PRD.

---

## What stage 6 is receiving

Stage 6 (the PRD) receives OPT-1 expanded to the depth above. Seven items are left open by this
expansion and must be resolved in the PRD:

1. **Indicator design**: trigger event, display format, dismiss mechanism — unresolved here; these
   shape accessibility requirements and mobile layout constraints
2. **Explanation content specification**: who authors and maintains the texts, character or word limit
   per question and per label, reading level target, Czech and English variants
3. **MiFID II Article 25 compliance review process**: the internal review workflow for question
   explanation texts before deployment
4. **PRIIPs KID alignment process**: the internal review workflow for fund label explanation texts
   against applicable KIDs
5. **Pilot measurement plan**: events logged, success metric for the pilot question, observation period
6. **Platform scope**: same or adapted interaction on iOS, Android and web
7. **Accessibility requirements**: WCAG level for the indicator and expansion mechanism

The compliance touchpoints above name obligations identified without the Compliance Guidelines. The PRD
is the point at which those guidelines would be applied — and until they exist, the review processes the
touchpoints require carry the compliance responsibility that the guidelines would normally supply.

> **Three touchpoints require a review and this list carries two.** Items 3 and 4 name the MiFID II
> Article 25 review (CT.a) and the PRIIPs KID alignment (CT.b). **CT.c's content review of the
> information-versus-advice boundary is named in its own section above and appears in no numbered item**,
> which is the one way an obligation identified here could have reached stage 6 as prose rather than as
> work. It did not: the agreed PRD carries all three as requirements R8, R9 and R10 with acceptance
> criteria. Corrected on 14 August by reading this document rather than its record.

Nothing in this document is a decision. G5b is the Product Owner's acceptance of this expansion before
stage 6 begins.

---

## Traceability

This artifact traces to A9 (ID-2, selected idea) and through it to A4 (H2, the run's only primary
problem). The A9 rationale, the A4 primary placement, and H2's trust tag (strong, two independent
origins, first-hand observation among them) are unchanged by this stage. The expansion adds depth to
the selected option; it does not alter the lineage that produced it.

---

## What this document does not do

Does not re-open the selection of OPT-1 or comment on OPT-2 or OPT-3. Does not alter A10, A9, A8,
A8b, A7, or A4. Does not run Q5 or report a gate result for its own output. Does not write a decision
record for G5b — a person takes that decision. Does not touch RUN-STATE.md.
