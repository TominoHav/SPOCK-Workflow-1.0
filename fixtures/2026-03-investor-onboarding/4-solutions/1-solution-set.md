---
run_id: 2026-03-investor-onboarding
artifact_id: A8
ost_role: solution
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
sources:
  - A1
  - A4
  - A7
external_sources: []
produced_by:
  agent: product-owner
  skill: ideation
could_not_verify:
  - rule: "3..7 ideas, each a distinct combination of problems, never a rephrasing"
    needs: judge
    reach: artifact
assembled_at: 2026-08-20
assembled_from: [R-A8-01]
---

# Ideas | Idea Set — Guided onboarding for first-time investors

**Run:** `2026-03-investor-onboarding` · **Stage:** 4.1 `ideation`
**Inputs:** 1-brief/initiative-brief.md · 2-problems/5-prioritised-opportunities.md · 3-competitive-analysis/3-competitive-synthesis.md
**Ideas generated:** 5 · **Target:** 5



**Assembled from one record**, which carries the fields a gate decides: [rec:R-A8-01].
---

## How to read this set

Five ideas are presented in generated order. The set carries no scores, no ranking, and no ordering claim. Scoring follows in A8b; selection follows in A9, each on a separate artifact. A human makes the selection at G4. Nothing here implies any idea is better than any other.

Two pairs share a `solves[]` set. The pairs address their shared problem through genuinely different mechanisms at different points in the customer journey.

- **ID-1 vs ID-2 (both solve H2):** ID-1 changes the questionnaire's question language. ID-2 adds education around the unchanged questionnaire. A customer encountering ID-1 answers differently-worded versions of the same questions; a customer encountering ID-2 reads explanations before answering standard questions.
- **ID-3 vs ID-4 (both solve H1):** ID-3 prevents fund-selection abandonment by offering a single recommendation instead of a catalogue. ID-4 recovers a customer after abandonment has already occurred. One operates before H1 has caused an exit; the other operates after it has.

## Primary problem coverage (C26)

| Primary problem | Addressed by |
|---|---|
| H2 — suitability questionnaire inaccessible to first-time investors (strong) | ID-1, ID-2, ID-5 |

H1 (secondary) is addressed by ID-3, ID-4, ID-5. H3 is parked in A4 and is not a target for this idea set. The A7 absences section records an H3 absence for a future run in which it is load-bearing.

## What the market stage contributes

A7's absences are the most direct signal to this stage. No profiled participant has addressed a vocabulary-adaptive questionnaire for first-time investors, in-flow financial education, or onboarding dropout recovery. The four absences name the space; the five ideas differ in which part of that space they occupy.

MONETA's in-app advisory (P2) is the closest market reference for ID-3 and ID-5 — a 25-question flow terminating in a single named fund with immediate purchase. Neither ČSOB nor KB has matched it. Adaptive assessment engines (TR-T1) and behavioural nudge technology (TR-T2) are in production globally but have no in-scope Czech banking representative. These absences are the productive signal: the ideas address a space the market has acknowledged and none has resolved digitally.

## Compliance mode in this artifact

The Compliance Guidelines are absent. Each compliance touchpoint is named from the run material and marked indicative in the touchpoint's own text, naming the absent body. The `scores_basis` field records this reduction. The shaping the guidelines would provide — how compliance concerns shape the idea's design boundaries — is applied when they land. C7 checks that each named touchpoint is addressed in the idea's description; that check runs against what is written here.

---

## ID-1 — Adaptive suitability questionnaire

The standard questionnaire assumes investment vocabulary the target segment does not have. An experience-level detection step — self-declared at the start of the flow — routes no-experience customers to a simplified path: plain-language question variants, tooltip definitions for key terms (fund type, risk rating, investment horizon), and a brief note on why each question is legally required. The derived risk profile is unchanged.

All three market participants use the questionnaire as the mandatory gate (ST1) and none has addressed the vocabulary barrier digitally. Adaptive suitability assessment engines — Muinmos, Fenergo — are in production at financial institutions globally but have no in-scope Czech retail banking representative (TR-T1). TR-B3 names vocabulary and concept unfamiliarity as the primary conversion barrier for Czech first-time investors. The branch adviser (ST5) is each bank's current resolution of a failed digital questionnaire; this idea addresses the failure in the digital channel rather than handing it to a person.

**Compliance touchpoint:** MiFID II suitability assessment remains mandatory. Vocabulary adaptation must preserve the legal validity and regulatory force of the derived risk profile.

---

## ID-2 — Inline financial education layer

Educational prompts appear at each questionnaire and fund-selection screen: expandable definitions of key terms, a one-sentence note on why the bank is legally asking each question, and an indication of what each answer implies for the customer's profile. The questionnaire's structure, question wording, and sequence are unchanged.

The branch adviser currently performs this educational function offline (ST5) — answering "what does this question mean?" before or during the questionnaire, and explaining fund labels before fund selection. This idea moves that function into the digital channel without modifying the questionnaire that all three participants already operate (ST1, ST3). The literacy gap named by TR-B3 is addressed at the point of confusion rather than through a separate onboarding track or rerouting.

No compliance touchpoints beyond those already present on the questionnaire.

---

## ID-3 — Single named-fund recommendation path

After the questionnaire derives a risk profile, the app presents one named fund matched to that profile as the next step — not a risk category followed by a catalogue. The customer accepts and proceeds to purchase in one tap, or declines and enters the full catalogue. ČSOB and KB route customers to a risk category, then to a catalogue (P1) — the catalogue navigation is where H1 occurs. MONETA's January 2026 in-app advisory (P2) demonstrates that a single-recommendation termination is commercially viable in this market and earns MONETA its innovator standing on the guided-selection trend (TR-B4).

This idea does not change the questionnaire. It addresses the fund-selection step after the questionnaire has been completed. A customer who abandons after receiving the recommendation is still in dropout — ID-4 addresses that case.

No compliance touchpoints beyond those on the suitability questionnaire.

---

## ID-4 — Dropout recovery re-engagement

A customer who completes the questionnaire and then abandons fund selection has a valid risk profile. The barrier at that point is H1 alone — choice complexity, not the questionnaire. The market's current recovery is the branch fallback (ST5), a physical-channel response to a digital exit that requires the customer to initiate contact. No profiled participant has a digital dropout-recovery mechanism for investment fund selection.

Behavioural nudge technology (TR-T2) is in production at excluded fintech platforms. MONETA's real-time offer engine (P5) fires contextual cross-sell prompts within 7 seconds of a qualifying transaction; the same capability applied to investment dropout is not evidenced at MONETA or any other in-scope participant. The branch-to-digital migration (TR-B2) progressively removes the branch fallback option for the target segment.

A contextual re-engagement — push notification within 24 hours, or an in-app card on next login — offers to resume at the point of exit or switch to a single-recommendation path. The idea targets the exit event H1 causes. It does not prevent H1; it recovers the customer after it has occurred.

**Compliance touchpoint:** Push notifications require explicit opt-in consent under GDPR and the ePrivacy Directive. Re-engagement messages must not constitute unsolicited direct marketing.

---

## ID-5 — Integrated first-investor journey

H2 (questionnaire vocabulary barrier) and H1 (fund-selection complexity) occur in sequence in the same session for a first-time investor. Addressing one in isolation leaves the other standing as a barrier. An integrated flow handles both in order within a single journey: experience-level detection, adaptive question language, contextual vocabulary support throughout, a single fund recommendation at questionnaire exit, one-tap purchase — no re-entry between steps, no catalogue navigation unless the customer opts in.

MONETA's in-app advisory (P2) is the closest market reference: a 25-question flow to a single named fund purchasable immediately. MONETA's questionnaire is not described as adaptive to investor knowledge level (TR-T1); the vocabulary adaptation element is the differentiator this idea adds to the MONETA model. The savings-mobilisation trend (TR-B1) and the financial literacy gap (TR-B3) name the commercial context; the guided-selection trend (TR-B4) and the branch-to-digital migration (TR-B2) name the direction of travel and the diminishing fallback option.

This idea has the widest `solves[]` set in the set — both H1 and H2 — and therefore the largest compliance surface.

**Compliance touchpoints:** MiFID II suitability assessment — adapted question language must produce a legally valid risk profile. GDPR — the risk profile derived from questionnaire responses is personal financial data requiring data-handling, retention and purpose-limitation controls.

---

## What this artifact does not do

Does not score, rank, order, or recommend. Does not select an idea — a person does, at G4, after scoring in A8b. Does not run Q4 or report a gate result for its own output. Does not write A8b, A9, or any other artifact. Does not touch A1, A4, A7, or RUN-STATE.md.
