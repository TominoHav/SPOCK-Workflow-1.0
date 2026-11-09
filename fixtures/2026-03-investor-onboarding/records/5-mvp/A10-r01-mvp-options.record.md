---
run_id: 2026-03-investor-onboarding
record_id: R-A10-01
artifact_id: A10
item_id: ""
produced_by:
  agent: product-owner
  skill: mvp-option-design
produced_at: 2026-08-13
bounds_hit: []
constraint_basis: "none_stated"
options:
  - id: OPT-1
    statement: "On-demand contextual help: an interactive explanation indicator on every questionnaire question and every fund product label, with explanation text accessible only when the customer activates the indicator."
    approach: "Pilots ID-2 by embedding a tap-to-expand explanation at each suitability questionnaire question and each fund-selection label. Each explanation states what the term means, why the bank is legally required to ask the question, and what the answer implies for the customer's investment profile. The questionnaire's questions, wording and sequence are unchanged. The educational function the branch adviser performs offline becomes available in the digital channel as a customer-initiated lookup that covers both the questionnaire and the fund-selection step."
    differs_by: "Education is available on demand and invisible by default on every screen. No explanation text is present until the customer activates an indicator. Unlike OPT-2, the screen layout at each question is uncluttered by visible explanation text. Unlike OPT-3, explanations are contextual and available at the moment of uncertainty rather than front-loaded before the questionnaire begins."
    constraints_met: []
  - id: OPT-2
    statement: "Proactive contextual explanation: short visible explanation text attached by default beneath every questionnaire question and every fund product label, requiring no customer action to read."
    approach: "Pilots ID-2 by making explanations a permanently visible element of every suitability questionnaire screen and every fund-selection screen. Each questionnaire question carries explanation text visibly below it, stating why the bank is required to ask the question and what each answer implies for the investment profile. Each fund product label carries its definition and risk characterisation visibly on the selection screen. The questionnaire's questions and wording are unchanged; the explanation is additional visible content on the same screen."
    differs_by: "Explanations are immediately visible on every relevant screen without any customer action. Every customer who reaches a screen sees the explanation whether or not they would have sought it. Unlike OPT-1, no discovery behaviour is required. Unlike OPT-3, explanations are distributed inline and contextual to each question rather than concentrated in a single pre-entry screen before the questionnaire opens."
    constraints_met: []
  - id: OPT-3
    statement: "Pre-entry orientation: a single screen presented before the questionnaire opens, explaining what the questionnaire is, why the bank conducts it, and what the core investment terms mean — with no inline explanations during the questionnaire or fund-selection flow."
    approach: "Pilots ID-2 by front-loading the educational function into a dedicated pre-questionnaire screen rather than distributing it inline across each question. Before the suitability questionnaire opens, the customer encounters a screen explaining what the questionnaire is, why the bank conducts it, and concise definitions of the core terms the questions will use — fund types, risk ratings, investment horizon — and the fund categories they will encounter in fund selection. The questionnaire itself and the fund-selection flow are then presented without additional explanation prompts. The questionnaire's questions, wording and sequence are unchanged."
    differs_by: "Education is concentrated into a single screen the customer encounters before the questionnaire rather than distributed across individual question screens during the flow. No explanation prompts appear during the questionnaire or fund-selection flow. Unlike OPT-1 and OPT-2, the educational function is complete before the customer encounters the first question; context is established upfront rather than available at each question as it appears."
    constraints_met: []
---

# Record R-A10-01 — A10

One production. Not written for a reader; the document assembled from it is 5-mvp/1-mvp-options.md.
