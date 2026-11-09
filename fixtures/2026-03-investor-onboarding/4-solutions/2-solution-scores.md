---
run_id: 2026-03-investor-onboarding
artifact_id: A8b
ost_role: solution
status: accepted
workflow: discovery
modified_by: agent
revisions: 1
sources:
  - A8
  - A4
  - A7
external_sources: []
produced_by:
  agent: product-owner
  skill: idea-scoring
could_not_verify: []
assembled_at: 2026-08-20
assembled_from: [R-A8b-01]
---

# Ideas | Idea Scores — five ideas against the axes that could be scored

Five ideas were scored and the difficulty axis has a denominator of zero on every one of them, because the bodies that define the difficulty bands do not exist for this run. What a reader at the decision gate could see was value; what they could not see was cost, risk or regulatory load on any idea. The numbers below are out of the denominators actually available and never out of a hundred. [rec:R-A8b-01]

---

## The comparison

| Idea | Potential | Difficulty | Sub-dimensions scored |
|---|---|---|---|
| **ID-1** | 0 of 0 | 0 of 0 | 0 of 7 |
| **ID-2** | 0 of 0 | 0 of 0 | 0 of 7 |
| **ID-3** | 0 of 0 | 0 of 0 | 0 of 7 |
| **ID-4** | 0 of 0 | 0 of 0 | 0 of 7 |
| **ID-5** | 0 of 0 | 0 of 0 | 0 of 7 |

**Read the denominators before the numbers.** A denominator of zero means the model could not run on that axis at all, and a score out of a shrunken denominator is never a score out of a hundred. Rescaling to a familiar total would hide exactly how much of the model was unavailable.

---

## ID-1

**Potential: nothing scored.** Banking Constraints and Strategy Basis absent — no sub-dimension scored. The idea targets the exact mandatory gate all three competitors use (ST1) and no competitor has addressed the vocabulary barrier digitally; adaptive assessment technology (TR-T1) has no in-scope Czech banking representative. It solves H2, the primary problem. The mechanism is changing questionnaire language — the contrast with ID-2, which explains rather than changes, is the choice a person at G4 must make between the two.

**Difficulty: nothing scored.** Banking Constraints and Compliance Guidelines absent — no sub-dimension scored. The idea carries an explicit MiFID II touchpoint: adapted question language must produce a legally valid risk profile. Of the ideas in the set, ID-1 and ID-5 are the ones that modify the regulatory instrument itself; this is the compliance surface a Compliance Guidelines band would assess first.

---

## ID-2

**Potential: nothing scored.** Banking Constraints and Strategy Basis absent — no sub-dimension scored. The idea addresses H2 by adding education around the unchanged questionnaire, not by changing its language — the contrast with ID-1. The branch adviser (ST5) currently performs this educational role offline; no competitor has moved it into the digital channel (A7 absence A2). Both ID-1 and ID-2 solve H2; the choice between them is whether to change what customers are asked or explain what they are asked.

**Difficulty: nothing scored.** Banking Constraints and Compliance Guidelines absent — no sub-dimension scored. Unlike ID-1, this idea does not modify the questionnaire itself — it adds an explanatory layer alongside the existing regulatory instrument. No compliance touchpoints are named beyond those already on the questionnaire.

---

## ID-3

**Potential: nothing scored.** Banking Constraints and Strategy Basis absent — no sub-dimension scored. The idea addresses H1 by preventing fund-selection abandonment before it occurs. MONETA already demonstrates this model (P2) — a flow terminating in a single named fund with immediate purchase — which reduces differentiation against MONETA specifically; a factor the market differentiation sub-dimension would weigh. The contrast with ID-4: ID-3 prevents the exit H1 causes, ID-4 recovers after it has occurred.

**Difficulty: nothing scored.** Banking Constraints and Compliance Guidelines absent — no sub-dimension scored. No compliance touchpoints are listed; this idea changes the fund-selection flow after the questionnaire completes and does not modify the regulatory instrument.

---

## ID-4

**Potential: nothing scored.** Banking Constraints and Strategy Basis absent — no sub-dimension scored. The idea addresses H1 through recovery after abandonment, not prevention — the contrast with ID-3. No competitor has a digital dropout-recovery mechanism for investment fund selection (A7 absence A3); behavioural nudge technology (TR-T2) has no in-scope Czech banking representative. The space is unoccupied in the market.

**Difficulty: nothing scored.** Banking Constraints and Compliance Guidelines absent — no sub-dimension scored. The idea carries an explicit GDPR and ePrivacy Directive touchpoint: push notification re-engagement requires explicit opt-in consent and must not constitute unsolicited direct marketing. Of the H1-targeted ideas, this is the one with a named compliance surface.

---

## ID-5

**Potential: nothing scored.** Banking Constraints and Strategy Basis absent — no sub-dimension scored. The only idea in the set that solves both H1 and H2 in a single uninterrupted journey. MONETA P2 is the closest market reference — questionnaire to single named fund with immediate purchase — but does not address vocabulary adaptation (TR-T1); that element has no in-scope Czech banking representative. The widest solves set and the widest market gap in the set.

**Difficulty: nothing scored.** Banking Constraints and Compliance Guidelines absent — no sub-dimension scored. The idea carries the widest compliance surface in the set: both the MiFID II touchpoint (adapted question language must produce a legally valid risk profile) and the GDPR touchpoint (questionnaire responses as personal financial data requiring data-handling and retention controls). It combines the most mechanisms — adaptive questionnaire, inline education, single recommendation, one-tap purchase — which the technical complexity and operational change sub-dimensions would assess.

---

## What we could not establish

**Every dimension the scoring could not run, and the body whose absence explains it.**

- **Problem-solution fit** — Banking Constraints absent — band definition not available
- **Strategic alignment** — Strategy Basis absent — band definition not available
- **Market differentiation** — Banking Constraints absent — band definition not available
- **Innovation opportunity** — Banking Constraints absent — band definition not available
- **Regulatory and compliance risk** — Compliance Guidelines absent — band definition not available
- **Technical complexity** — Banking Constraints absent — band definition not available
- **Operational change** — Banking Constraints absent — band definition not available

**What that costs a reader at the decision gate.** They can see which idea best serves whatever could be scored, and they cannot see which is cheapest, riskiest or most likely to fail on a regulatory point. The ideas went to a person to choose between on an incomplete picture, and this section is where that is said rather than implied by a blank column.

---

## How this was produced

**Stage 4.2 scoring, quality gate Q4.** Scoring is a separate step from generation and reads the idea set without editing it. The ideas carry no score, no rank and no recommendation of their own.

**Scoring basis.** All three band-defining bodies absent — Strategy Basis (anchors strategic alignment, weight 30 of potential), Compliance Guidelines (anchors regulatory and compliance risk, weight 40 of difficulty), Banking Constraints (anchors the remaining five sub-dimensions). Every sub-dimension is unscored; both axes report denominator 0. No band is invented and no score is estimated against a missing band.

**Assembled from one record**, which carries every sub-score, its rationale and every unscored dimension:

- **R-A8b-01** — records/4-solutions/A8b-r01-idea-scores.record.md

