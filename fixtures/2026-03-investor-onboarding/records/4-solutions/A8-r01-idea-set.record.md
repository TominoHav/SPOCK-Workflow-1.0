---
run_id: 2026-03-investor-onboarding
record_id: R-A8-01
artifact_id: A8
item_id: ""
produced_by:
  agent: product-owner
  skill: ideation
produced_at: 2026-08-13
bounds_hit: []
ideas:
  - id: ID-1
    statement: "Present a simplified suitability questionnaire path to customers with no declared investment history, using plain-language question variants and in-line term definitions that satisfy MiFID II while removing the vocabulary presupposed by the standard questionnaire."
    description: "The standard suitability questionnaire assumes familiarity with fund types and risk categories that first-time investors lack (TR-B3). An experience-level detection step routes no-experience customers to a simplified path: plain-language question wording, tooltip definitions for key terms, a contextual note on why each question is asked. The derived risk profile — the regulatory output — is unchanged. All three market participants use the questionnaire as the mandatory gate (ST1) and none has addressed the vocabulary barrier digitally; adaptive assessment engines are in production globally but have no in-scope Czech banking representative (TR-T1). This idea changes the questionnaire itself; ID-2 adds education around the unchanged questionnaire — they are different mechanisms for the same problem."
    solves:
      - H2
    supported_by:
      - ST1
      - TR-T1
      - TR-B3
      - ST5
    compliance_touchpoints:
      - "MiFID II suitability assessment is mandatory — any vocabulary adaptation must produce a legally valid risk profile with the same regulatory force as the standard path (indicative — Compliance Guidelines absent)"
  - id: ID-2
    statement: "Embed short contextual educational prompts at each stage of the questionnaire and fund-selection flow, explaining investment vocabulary, what the bank is legally required to ask, and what each answer implies for the customer's investment profile."
    description: "The financial literacy gap (TR-B3) causes customers to guess at terms they do not understand, producing risk profiles that do not reflect their situation or causing questionnaire abandonment. An inline education layer — expandable definitions, one-sentence explanations on each screen — does not change the questionnaire's structure or wording but gives customers the knowledge to answer accurately. The branch adviser (ST5) currently performs this educational role offline; this idea moves it into the digital channel. The idea also applies inline education to fund selection, where product labels (dynamic, conservative, balanced) presuppose literacy. This idea leaves the questionnaire questions unchanged; ID-1 changes them — the two mechanisms are distinct."
    solves:
      - H2
    supported_by:
      - TR-B3
      - ST1
      - ST5
      - ST3
    compliance_touchpoints: []
  - id: ID-3
    statement: "After the suitability assessment, present a single named fund matched to the customer's derived risk profile as the primary next step; catalogue browsing remains available as an opt-in path but is not required for purchase."
    description: "At ČSOB and KB, a customer who completes the questionnaire and is mapped to a risk category then faces a product catalogue — the point where choice overload (H1) occurs (P1). MONETA's January 2026 in-app advisory (P2) demonstrates that a flow terminating in a single named fund with immediate purchase is commercially viable in this market; the guided-selection trend (TR-B4) confirms this as the direction of travel across Czech retail banking. Making the recommendation the primary path and the catalogue an opt-in secondary path removes the requirement to choose from a list. This idea addresses fund-selection complexity after the questionnaire is complete and does not change the questionnaire. It prevents H1 from occurring by eliminating the catalogue as the mandatory next step; ID-4 recovers the customer after H1 has caused abandonment."
    solves:
      - H1
    supported_by:
      - P2
      - TR-B4
      - P1
      - ST1
      - ST3
    compliance_touchpoints: []
  - id: ID-4
    statement: "When a customer who has completed the suitability questionnaire exits fund selection without purchasing, trigger a contextual re-engagement — a push notification within 24 hours or an in-app card on next login — offering to resume at the point of exit or switch to a single-recommendation path."
    description: "A customer who reaches fund selection and abandons has a valid risk profile; the barrier is H1 (choice complexity), not the questionnaire. The market's current recovery is the branch fallback (ST5) — a physical-channel response to a digital exit event. Behavioural nudge technology (TR-T2) is deployed at excluded fintech platforms but has no in-scope Czech banking representative; MONETA's real-time offer engine (P5) applies to cross-sell within 7 seconds of a qualifying transaction, not to investment dropout recovery. The branch-to-digital migration (TR-B2) progressively removes the branch fallback for the target segment. This idea targets the specific moment H1 causes abandonment and operates after the questionnaire is complete; it does not prevent the exit — it recovers the customer after it has occurred."
    solves:
      - H1
    supported_by:
      - TR-T2
      - P5
      - ST5
      - TR-B2
    compliance_touchpoints:
      - "Push notification re-engagement requires explicit opt-in consent under GDPR and the ePrivacy Directive; re-engagement messages must not constitute unsolicited direct marketing (indicative — Compliance Guidelines absent)"
  - id: ID-5
    statement: "A dedicated onboarding flow for customers with no investment history that sequences adaptive suitability questions, inline vocabulary support, a single fund recommendation, and an immediate purchase step into one uninterrupted journey — treating questionnaire inaccessibility and fund-selection complexity as connected barriers in the same session."
    description: "H2 and H1 occur in sequence in the same session. A fix to one in isolation leaves the other unaddressed: a customer who passes an adapted questionnaire still faces the catalogue; a customer offered a recommendation never reached that point if the questionnaire stopped them first. An integrated flow — experience-level detection, adaptive question language, contextual explanations, single recommendation at exit, one-tap purchase — removes both barriers in order. MONETA's in-app advisory (P2) is the closest market reference but does not address vocabulary adaptation (TR-T1); that adaptive element is the differentiator this idea adds. The savings-mobilisation context (TR-B1), the literacy gap (TR-B3), the guided-selection trend (TR-B4), and the branch-to-digital migration (TR-B2) together describe the commercial need and the absence of a complete digital response. This idea carries the widest solves set and the most compliance surface in the set."
    solves:
      - H1
      - H2
    supported_by:
      - P2
      - TR-B1
      - TR-B3
      - TR-B4
      - TR-T1
      - ST1
      - ST3
      - TR-B2
    compliance_touchpoints:
      - "MiFID II suitability assessment — adaptive question language must produce a legally valid risk profile regardless of the simplified path taken (indicative — Compliance Guidelines absent)"
      - "GDPR — the risk profile derived from questionnaire responses is personal financial data; data handling, retention period and purpose limitation require appropriate controls (indicative — Compliance Guidelines absent)"
---

# Record R-A8-01 — A8

One production. Not written for a reader; the document assembled from it is 4-solutions/1-solution-set.md.
