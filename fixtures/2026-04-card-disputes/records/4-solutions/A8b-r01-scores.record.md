---
run_id: 2026-04-card-disputes
record_id: R-A8b-01
artifact_id: A8b
item_id: ""
produced_at: 2026-08-17
produced_by:
  agent: product-owner
  skill: scoring
bounds_hit: []
scores_basis: "Strategy Basis present — strategic alignment scored against key result AI-2 (AI First objective, Strategy Basis §2.7, direction increase, type C) at weight 30 of the potential axis. Banking Constraints absent — problem-solution fit (weight 35 of potential), market differentiation (weight 20 of potential), innovation opportunity (weight 15 of potential), technical complexity (weight 35 of difficulty), and operational change (weight 25 of difficulty) are unscored. Compliance Guidelines absent — regulatory and compliance risk (weight 40 of difficulty) is unscored. Potential denominator per idea: 30. Difficulty denominator per idea: 0."
scores:
  - idea: ID-1
    potential:
      denominator: 30
      sub_scores:
        - dimension: "Strategic alignment"
          score: 10
          band: "Weak"
          rationale: "ID-1 addresses the status-call half of the product metric but not the digital-filing half. The metric requires cases to be raised digitally AND closed with no inbound status call; status tracking covers the second condition only. Cases filed on paper remain non-straight-through regardless of tracking because manual keying still occurs, so they do not count as fully straight-through in AI-2. The path to AI-2 therefore depends on digitally-filed cases existing at CS at meaningful scale, which the run material does not establish. A path exists but rests on an untested condition. Scored against AI-2 via Strategy Basis §4 bands."
      unscored:
        - dimension: "Problem-solution fit"
          rationale: "Banking Constraints absent — band definition not available"
        - dimension: "Market differentiation"
          rationale: "Banking Constraints absent — band definition not available"
        - dimension: "Innovation opportunity"
          rationale: "Banking Constraints absent — band definition not available"
      rationale: "Strategic alignment: 10 of 30 (Weak). Status tracking addresses the status-call condition of the product metric but not the digital-filing condition; the path to AI-2 rests on an untested assumption about digital filing volume at CS. Three sub-dimensions unscored — Banking Constraints absent. Potential is 10 of 30, not of 100."
    difficulty:
      denominator: 0
      sub_scores: []
      unscored:
        - dimension: "Regulatory and compliance risk"
          rationale: "Compliance Guidelines absent — band definition not available"
        - dimension: "Technical complexity"
          rationale: "Banking Constraints absent — band definition not available"
        - dimension: "Operational change"
          rationale: "Banking Constraints absent — band definition not available"
      rationale: "No sub-dimension scored — Compliance Guidelines and Banking Constraints absent. ID-1 carries one GDPR compliance touchpoint (case status data as personal financial data); the Compliance Guidelines body would assess its regulatory weight when it lands."
  - idea: ID-2
    potential:
      denominator: 30
      sub_scores:
        - dimension: "Strategic alignment"
          score: 20
          band: "Moderate"
          rationale: "ID-2 enables digital dispute filing from the transaction screen, removing the manual keying step that makes the paper-form process non-straight-through. The path to AI-2 runs through one named intermediate: status call elimination. Digital filing alone means a cardholder who has submitted still has no view of where their case stands and will call; those calls make the process not fully straight-through under AI-2. Both steps hold — digital filing works and eliminates keying, and combining it with status tracking achieves fully straight-through — but the intermediate step is a capability ID-2 does not carry. The brief's link names both raise and status view as the complete mechanism; ID-2 supplies the raise half only. Scored against AI-2 via Strategy Basis §4 bands."
      unscored:
        - dimension: "Problem-solution fit"
          rationale: "Banking Constraints absent — band definition not available"
        - dimension: "Market differentiation"
          rationale: "Banking Constraints absent — band definition not available"
        - dimension: "Innovation opportunity"
          rationale: "Banking Constraints absent — band definition not available"
      rationale: "Strategic alignment: 20 of 30 (Moderate). Digital filing removes the keying step and contributes to straight-through processing; status call elimination is the named intermediate needed for fully straight-through. Both steps hold. Three sub-dimensions unscored — Banking Constraints absent. Potential is 20 of 30, not of 100."
    difficulty:
      denominator: 0
      sub_scores: []
      unscored:
        - dimension: "Regulatory and compliance risk"
          rationale: "Compliance Guidelines absent — band definition not available"
        - dimension: "Technical complexity"
          rationale: "Banking Constraints absent — band definition not available"
        - dimension: "Operational change"
          rationale: "Banking Constraints absent — band definition not available"
      rationale: "No sub-dimension scored — Compliance Guidelines and Banking Constraints absent. ID-2 carries two compliance touchpoints (GDPR on dispute submission data, PSD3 readiness on the 14-day ceiling); the Compliance Guidelines body would assess their regulatory weight when it lands."
  - idea: ID-3
    potential:
      denominator: 30
      sub_scores:
        - dimension: "Strategic alignment"
          score: 20
          band: "Moderate"
          rationale: "ID-3 delivers digital dispute filing via a one-tap notification action, removing the manual keying step that makes paper-form filing non-straight-through. The path to AI-2 has the same shape as ID-2: digital filing removes the keying step, but status calls persist after submission, so the process is not fully straight-through. The named intermediate is status call elimination, which ID-3 does not carry. Both steps hold: notification-triggered digital filing is real and eliminates keying; adding status tracking achieves fully straight-through. ID-3's distinction from ID-2 is the trigger point — the moment of the transaction rather than deliberate navigation — which affects adoption but not the strategic alignment band. Scored against AI-2 via Strategy Basis §4 bands."
      unscored:
        - dimension: "Problem-solution fit"
          rationale: "Banking Constraints absent — band definition not available"
        - dimension: "Market differentiation"
          rationale: "Banking Constraints absent — band definition not available"
        - dimension: "Innovation opportunity"
          rationale: "Banking Constraints absent — band definition not available"
      rationale: "Strategic alignment: 20 of 30 (Moderate). Notification-triggered digital filing removes the keying step; status call elimination is the named intermediate for fully straight-through. Same band as ID-2 — the trigger point differs, the path to AI-2 is the same shape. Three sub-dimensions unscored — Banking Constraints absent. Potential is 20 of 30, not of 100."
    difficulty:
      denominator: 0
      sub_scores: []
      unscored:
        - dimension: "Regulatory and compliance risk"
          rationale: "Compliance Guidelines absent — band definition not available"
        - dimension: "Technical complexity"
          rationale: "Banking Constraints absent — band definition not available"
        - dimension: "Operational change"
          rationale: "Banking Constraints absent — band definition not available"
      rationale: "No sub-dimension scored — Compliance Guidelines and Banking Constraints absent. ID-3 carries two compliance touchpoints (ePrivacy Directive on default-on notification consent, GDPR on notification content); the ePrivacy touchpoint is the most design-critical. The Compliance Guidelines body would assess their regulatory weight when it lands."
  - idea: ID-4
    potential:
      denominator: 30
      sub_scores:
        - dimension: "Strategic alignment"
          score: 30
          band: "Strong"
          rationale: "ID-4 delivers both conditions of the product metric in one capability: cases raised digitally via notification-triggered filing, and closed with no inbound status call via integrated status tracking. The brief's own link states the mechanism in one sentence: each dispute moved to digital — both raise and status view — is one service process converted from manual to straight-through, which is what AI-2 counts. ID-4 is the only idea in the set that delivers both halves simultaneously. The chain to AI-2 is one step with no intermediate: the integrated chain produces fully straight-through dispute processes, which is what AI-2 tracks. Scored against AI-2 via Strategy Basis §4 bands."
      unscored:
        - dimension: "Problem-solution fit"
          rationale: "Banking Constraints absent — band definition not available"
        - dimension: "Market differentiation"
          rationale: "Banking Constraints absent — band definition not available"
        - dimension: "Innovation opportunity"
          rationale: "Banking Constraints absent — band definition not available"
      rationale: "Strategic alignment: 30 of 30 (Strong). ID-4 is the only idea delivering both the digital-filing and the status-call conditions of the product metric, satisfying the brief's link to AI-2 in one step with no intermediate. Three sub-dimensions unscored — Banking Constraints absent. Potential is 30 of 30, not of 100 — one sub-dimension at full marks."
    difficulty:
      denominator: 0
      sub_scores: []
      unscored:
        - dimension: "Regulatory and compliance risk"
          rationale: "Compliance Guidelines absent — band definition not available"
        - dimension: "Technical complexity"
          rationale: "Banking Constraints absent — band definition not available"
        - dimension: "Operational change"
          rationale: "Banking Constraints absent — band definition not available"
      rationale: "No sub-dimension scored — Compliance Guidelines and Banking Constraints absent. ID-4 carries the widest compliance surface in the set: ePrivacy Directive (default-on notification consent), GDPR (personal data at all three chain stages), and PSD3 readiness (TR-R1, 14-day resolution ceiling, transposition 2027-2028). The Compliance Guidelines body would assess their regulatory weight when it lands."
  - idea: ID-5
    potential:
      denominator: 30
      sub_scores:
        - dimension: "Strategic alignment"
          score: 10
          band: "Weak"
          rationale: "ID-5 adds a structured post-resolution notification describing what was established about the security event. The product metric requires cases raised digitally and closed with no inbound status call; ID-5 operates after resolution and does not affect either condition. A path to AI-2 exists: if cardholders currently call post-resolution to ask about card security, a digital debrief would replace those calls with a straight-through notification, contributing to AI-2. Both steps in this path rest on untested assumptions — that post-resolution security enquiries are a material call volume at CS today, and that the debrief would eliminate rather than supplement those calls. H4 is a total market absence, so no evidence base exists for either assumption. Band: Weak — a path exists but both steps require verification. Scored against AI-2 via Strategy Basis §4 bands."
      unscored:
        - dimension: "Problem-solution fit"
          rationale: "Banking Constraints absent — band definition not available"
        - dimension: "Market differentiation"
          rationale: "Banking Constraints absent — band definition not available"
        - dimension: "Innovation opportunity"
          rationale: "Banking Constraints absent — band definition not available"
      rationale: "Strategic alignment: 10 of 30 (Weak). Post-resolution debrief does not move either condition of the product metric; the path to AI-2 runs through two untested assumptions about post-resolution security call volumes and debrief substitution effect. Three sub-dimensions unscored — Banking Constraints absent. Potential is 10 of 30, not of 100."
    difficulty:
      denominator: 0
      sub_scores: []
      unscored:
        - dimension: "Regulatory and compliance risk"
          rationale: "Compliance Guidelines absent — band definition not available"
        - dimension: "Technical complexity"
          rationale: "Banking Constraints absent — band definition not available"
        - dimension: "Operational change"
          rationale: "Banking Constraints absent — band definition not available"
      rationale: "No sub-dimension scored — Compliance Guidelines and Banking Constraints absent. ID-5 carries two compliance touchpoints: GDPR (post-resolution case records as personal financial data) and banking secrecy and anti-fraud disclosure limits (the disclosure vocabulary of the security debrief must be validated before specification). The banking secrecy touchpoint is the most design-critical. The Compliance Guidelines body would assess their regulatory weight when it lands."
---

# Record R-A8b-01 — A8b

One production. Not written for a reader; the document assembled from it is 4-solutions/2-solution-scores.md.
