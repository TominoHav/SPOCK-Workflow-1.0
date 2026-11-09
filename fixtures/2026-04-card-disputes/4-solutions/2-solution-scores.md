---
run_id: 2026-04-card-disputes
artifact_id: A8b
ost_role: solution
status: accepted
workflow: discovery
modified_by: human
revisions: 0
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

Four of the five ideas score 10 out of 30 on potential and one scores 20, and every one of them scores nothing at all on difficulty because there is nothing to score it against. ID-4, the integrated response chain, is the only idea that reaches both halves of the product measure, which is what separates it. **The difficulty axis has a denominator of zero on all five**, because the Banking Constraints and Compliance Guidelines bodies do not exist for this run, so a reader at the decision gate is choosing on value with no read on cost. [rec:R-A8b-01]

The numbers below are out of the denominators actually available, never out of 100. Three sub-dimensions of potential and all three of difficulty went unscored, and each says why in its own words rather than being left blank.

---

## The comparison

| Idea | Potential | Difficulty | Sub-dimensions scored |
|---|---|---|---|
| **ID-1** | 10 of 30 | 0 of 0 | 1 of 4 potential, 0 of 3 difficulty |
| **ID-2** | 20 of 30 | 0 of 0 | 1 of 4 potential, 0 of 3 difficulty |
| **ID-3** | 20 of 30 | 0 of 0 | 1 of 4 potential, 0 of 3 difficulty |
| **ID-4** | 30 of 30 | 0 of 0 | 1 of 4 potential, 0 of 3 difficulty |
| **ID-5** | 10 of 30 | 0 of 0 | 1 of 4 potential, 0 of 3 difficulty |

**One dimension carried the whole comparison.** Strategic alignment is the only sub-dimension any idea was scored on, so the ranking above is a ranking on strategic alignment wearing the name of potential. That is stated here rather than in a footnote, because a reader who takes these as potential scores is reading a number that does not exist.

---

## ID-1

**Strategic alignment: 10 of 30, Weak.** ID-1 addresses the status-call half of the product metric but not the digital-filing half. The metric requires cases to be raised digitally AND closed with no inbound status call; status tracking covers the second condition only. Cases filed on paper remain non-straight-through regardless of tracking because manual keying still occurs, so they do not count as fully straight-through in AI-2. The path to AI-2 therefore depends on digitally-filed cases existing at CS at meaningful scale, which the run material does not establish. A path exists but rests on an untested condition. Scored against AI-2 via Strategy Basis §4 bands.

**Difficulty: nothing scored.** No sub-dimension scored — Compliance Guidelines and Banking Constraints absent. ID-1 carries one GDPR compliance touchpoint (case status data as personal financial data); the Compliance Guidelines body would assess its regulatory weight when it lands.

---

## ID-2

**Strategic alignment: 20 of 30, Moderate.** ID-2 enables digital dispute filing from the transaction screen, removing the manual keying step that makes the paper-form process non-straight-through. The path to AI-2 runs through one named intermediate: status call elimination. Digital filing alone means a cardholder who has submitted still has no view of where their case stands and will call; those calls make the process not fully straight-through under AI-2. Both steps hold — digital filing works and eliminates keying, and combining it with status tracking achieves fully straight-through — but the intermediate step is a capability ID-2 does not carry. The brief's link names both raise and status view as the complete mechanism; ID-2 supplies the raise half only. Scored against AI-2 via Strategy Basis §4 bands.

**Difficulty: nothing scored.** No sub-dimension scored — Compliance Guidelines and Banking Constraints absent. ID-2 carries two compliance touchpoints (GDPR on dispute submission data, PSD3 readiness on the 14-day ceiling); the Compliance Guidelines body would assess their regulatory weight when it lands.

---

## ID-3

**Strategic alignment: 20 of 30, Moderate.** ID-3 delivers digital dispute filing via a one-tap notification action, removing the manual keying step that makes paper-form filing non-straight-through. The path to AI-2 has the same shape as ID-2: digital filing removes the keying step, but status calls persist after submission, so the process is not fully straight-through. The named intermediate is status call elimination, which ID-3 does not carry. Both steps hold: notification-triggered digital filing is real and eliminates keying; adding status tracking achieves fully straight-through. ID-3's distinction from ID-2 is the trigger point — the moment of the transaction rather than deliberate navigation — which affects adoption but not the strategic alignment band. Scored against AI-2 via Strategy Basis §4 bands.

**Difficulty: nothing scored.** No sub-dimension scored — Compliance Guidelines and Banking Constraints absent. ID-3 carries two compliance touchpoints (ePrivacy Directive on default-on notification consent, GDPR on notification content); the ePrivacy touchpoint is the most design-critical. The Compliance Guidelines body would assess their regulatory weight when it lands.

---

## ID-4

**Strategic alignment: 30 of 30, Strong.** ID-4 delivers both conditions of the product metric in one capability: cases raised digitally via notification-triggered filing, and closed with no inbound status call via integrated status tracking. The brief's own link states the mechanism in one sentence: each dispute moved to digital — both raise and status view — is one service process converted from manual to straight-through, which is what AI-2 counts. ID-4 is the only idea in the set that delivers both halves simultaneously. The chain to AI-2 is one step with no intermediate: the integrated chain produces fully straight-through dispute processes, which is what AI-2 tracks. Scored against AI-2 via Strategy Basis §4 bands.

**Difficulty: nothing scored.** No sub-dimension scored — Compliance Guidelines and Banking Constraints absent. ID-4 carries the widest compliance surface in the set: ePrivacy Directive (default-on notification consent), GDPR (personal data at all three chain stages), and PSD3 readiness (TR-R1, 14-day resolution ceiling, transposition 2027-2028). The Compliance Guidelines body would assess their regulatory weight when it lands.

---

## ID-5

**Strategic alignment: 10 of 30, Weak.** ID-5 adds a structured post-resolution notification describing what was established about the security event. The product metric requires cases raised digitally and closed with no inbound status call; ID-5 operates after resolution and does not affect either condition. A path to AI-2 exists: if cardholders currently call post-resolution to ask about card security, a digital debrief would replace those calls with a straight-through notification, contributing to AI-2. Both steps in this path rest on untested assumptions — that post-resolution security enquiries are a material call volume at CS today, and that the debrief would eliminate rather than supplement those calls. H4 is a total market absence, so no evidence base exists for either assumption. Band: Weak — a path exists but both steps require verification. Scored against AI-2 via Strategy Basis §4 bands.

**Difficulty: nothing scored.** No sub-dimension scored — Compliance Guidelines and Banking Constraints absent. ID-5 carries two compliance touchpoints: GDPR (post-resolution case records as personal financial data) and banking secrecy and anti-fraud disclosure limits (the disclosure vocabulary of the security debrief must be validated before specification). The banking secrecy touchpoint is the most design-critical. The Compliance Guidelines body would assess their regulatory weight when it lands.

---

## What we could not establish

**Six of the nine sub-dimensions could not be scored at all, and the same two missing bodies explain every one of them.**

- **Problem-solution fit** — Banking Constraints absent — band definition not available
- **Market differentiation** — Banking Constraints absent — band definition not available
- **Innovation opportunity** — Banking Constraints absent — band definition not available
- **Regulatory and compliance risk** — Compliance Guidelines absent — band definition not available
- **Technical complexity** — Banking Constraints absent — band definition not available
- **Operational change** — Banking Constraints absent — band definition not available

**What that costs, stated plainly.** The whole difficulty axis scored zero out of zero on every idea. A reader at the decision gate could see which idea best serves the strategy and had no way to see which was cheapest, riskiest or most likely to fail on a regulatory point. Five ideas went to a person to choose between on value alone.

**What would close it.** The Banking Constraints body would supply the bands for problem-solution fit, market differentiation, innovation opportunity, technical complexity and operational change. The Compliance Guidelines body would supply the band for regulatory and compliance risk. Both are declared and neither is written.

---

## How this was produced

**Run 2026-04-card-disputes, stage 4.2 scoring, quality gate Q4.** Scoring is a separate step from generation and reads the idea set without editing it. The ideas carry no score, no rank and no recommendation of their own; those live here.

**Assembled from one record**, which carries every sub-score, its band, its rationale and every unscored dimension as fields a check reads:

- **R-A8b-01** — records/4-solutions/A8b-r01-scores.record.md

**The strategic alignment basis.** **Product metric:** Share of card dispute cases raised digitally and closed with no inbound status call.

**Key result:** AI-2 — Share of sales and service processes in primary digital channels that are fully

straight-through (direction: increase, Strategy Basis §2.7).

**Link (from A1):** A dispute raised on the paper form enters as a non-straight-through service process:

manual keying by card operations, plus a status call the contact-centre agent cannot answer. Moving both

the raise and the status view into the app removes the keying step and the status call from the same

case. Each case moved is one service process converted from manual to straight-through, which is what

AI-2 counts.

**Bands applied (Strategy Basis §4):**

- Strong (30): Product metric leads to key result in one step, stateable in a sentence.

- Moderate (20): Reaches key result through one named intermediate, both steps hold.

- Weak (10): A path exists but at least one step rests on an assumption nobody has checked.

- None (0): No path, or the only path is the key result restated.

Scoring is against AI-2 only — the key result the brief's link names. Other key results individual ideas

may touch are noted in rationale but not scored separately.

**Has:** Strategic alignment scored for all five ideas with band, score out of 30, and rationale. Six
sub-dimensions declared unscored per idea with the body that would anchor each. Both denominators stated
per idea (potential: 30; difficulty: 0).

**Does not have:** Scores for problem-solution fit, market differentiation, innovation opportunity,
regulatory risk, technical complexity, or operational change — Banking Constraints and Compliance
Guidelines absent. Potential is out of 30, not 100. Difficulty is out of 0.

The scores inform the decision. The person at G4 selects one idea reading both axes with their rationale.
No idea is ranked, recommended, or filtered here.

**Scores are out of what was available and never out of 100.** A denominator that shrinks when a body is missing is the honest form: rescaling to a familiar total would hide that two thirds of the model could not run.

