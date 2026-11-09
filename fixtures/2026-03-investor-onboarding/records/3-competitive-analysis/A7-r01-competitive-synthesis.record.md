---
run_id: 2026-03-investor-onboarding
record_id: R-A7-01
artifact_id: A7
item_id: ""
produced_by:
  agent: competitive-analysis
  skill: synthesis
produced_at: 2026-08-13
bounds_hit: []
standards:
  - key: ST1
    statement: "All three profiled participants require customers to complete a suitability questionnaire before accessing fund investment; the questionnaire is the mandatory digital onboarding gate to fund selection at every in-scope competitor."
    tier: universal
    source_count: "3 of 3"
    traces_to:
      - csob.cz
      - kb.cz
      - moneta.cz
    addresses:
      - H1
      - H2
  - key: ST2
    statement: "All three profiled participants offer a DIP (Dlouhodobý investiční produkt) tax-advantaged long-term investment account as a named product within their core retail investment suite."
    tier: universal
    source_count: "3 of 3"
    traces_to:
      - csob.cz
      - kb.cz
      - moneta.cz
    addresses:
      - H1
      - H2
  - key: ST3
    statement: "All three profiled participants deliver investment access through a proprietary mobile banking app as the primary digital channel; both the questionnaire and the fund purchase occur within the app."
    tier: universal
    source_count: "3 of 3"
    traces_to:
      - csob.cz
      - kb.cz
      - moneta.cz
    addresses:
      - H1
      - H2
  - key: ST4
    statement: "No profiled participant publishes management or entry fee percentages on its main investment product pages; customers are directed to a PDF fee schedule or branch staff to obtain specific figures."
    tier: universal
    source_count: "3 of 3"
    traces_to:
      - csob.cz
      - kb.cz
      - moneta.cz
    addresses:
      - H1
  - key: ST5
    statement: "All three profiled participants maintain in-person branch advisory as an available fallback channel alongside the digital investment journey; the branch adviser is the market's current resolution of a failed digital questionnaire."
    tier: universal
    source_count: "3 of 3"
    traces_to:
      - csob.cz
      - kb.cz
      - moneta.cz
    addresses:
      - H2
  - key: ST6
    statement: "ČSOB and MONETA embed multi-bank account consolidation in their retail banking app, giving customers a cross-bank savings view alongside the investment offering; KB has no equivalent feature evidenced in this card."
    tier: common
    source_count: "2 of 3"
    traces_to:
      - csob.cz
      - moneta.cz
    addresses:
      - H1
patterns:
  - key: P1
    statement: "ČSOB and KB map the suitability questionnaire to a risk category or labelled strategy — four profiles at ČSOB, six labelled KB Portfolio strategies at KB — after which the customer selects a fund from a product catalogue; no direct single-fund recommendation is produced without further customer navigation."
    traces_to:
      - csob.cz
      - kb.cz
    addresses:
      - H1
      - H2
  - key: P2
    statement: "MONETA's in-app advisory (launched January 2026, confirmed by e15.cz and moneta.cz) delivers a single fund recommendation from 25 questions and enables immediate purchase without leaving the app or switching channel; this complete questionnaire-to-purchase loop is not evidenced at ČSOB or KB."
    traces_to:
      - moneta.cz
    addresses:
      - H1
  - key: P3
    statement: "ČSOB and KB each offer a premium or private-management tier — ČSOB Investice na míru at 4,000 CZK/month and KB private asset management at 250,000 CZK portfolio minimum — providing adviser-mediated discretionary management; no equivalent tier is evidenced at MONETA."
    traces_to:
      - csob.cz
      - kb.cz
    addresses:
      - H1
      - H2
  - key: P4
    statement: "ČSOB and KB each cite enterprise platform investments — ČSOB: Camunda Customer Journey Manager deployed and Temenos T24 underway; KB: Temenos Transact live since February 2022 — that carry adaptive automation capability at the platform level; neither bank's investment questionnaire or fund-selection flow is confirmed to use these capabilities as of this research."
    traces_to:
      - csob.cz
      - kb.cz
    addresses:
      - H2
  - key: P5
    statement: "MONETA operates a real-time personalised offer engine that triggers contextual cross-sell offers within 7 seconds of a qualifying customer transaction, deployed via AWS, SAS and Trask; behavioural trigger technology is present in this market but its application to investment onboarding dropout is not evidenced."
    traces_to:
      - moneta.cz
    addresses:
      - H1
trends:
  - key: TR-B1
    statement: "Retail savings mobilisation: declining Czech deposit rates and the EU Savings and Investment Union (2025) are converting idle savings accounts into investment products; the failed first-investment attempt is the commercial event this run's initiative must prevent."
    traces_to:
      - A5
    addresses:
      - H1
      - H2
  - key: TR-B2
    statement: "Branch-to-digital migration: investment product delivery has moved from branch adviser to in-app self-service at all three profiled participants; the friction points H1 and H2 describe now live inside the digital product, not at the channel choice."
    traces_to:
      - A5
    addresses:
      - H2
  - key: TR-B3
    statement: "Financial literacy gap: vocabulary and concept unfamiliarity is the primary conversion barrier for Czech first-time investors; the suitability questionnaire presupposes familiarity with fund types and risk ratings that the target population lacks."
    traces_to:
      - A5
    addresses:
      - H2
  - key: TR-B4
    statement: "Guided fund selection: Czech retail banks are reducing visible product counts and adding recommendation layers in response to choice overload; MONETA's in-app advisory (January 2026) is the most advanced in-scope implementation."
    traces_to:
      - A5
    addresses:
      - H1
  - key: TR-T1
    statement: "Automated suitability assessment: adaptive questionnaire engines (Muinmos, Fenergo) are in production at financial institutions globally; no in-scope Czech retail bank is confirmed to have deployed one in its investment onboarding flow."
    traces_to:
      - A5
    addresses:
      - H2
  - key: TR-T2
    statement: "Behavioural nudge technology: dropout-recovery prompts and in-app nudges are deployed at excluded fintech platforms; no in-scope Czech retail bank is confirmed to use them in its investment fund-selection or questionnaire flow."
    traces_to:
      - A5
    addresses:
      - H1
absences:
  - problem: H2
    statement: "No profiled participant evidences a suitability questionnaire that adapts its vocabulary or question set for customers with no prior investment experience; T1 (automated suitability assessment) has no in-scope representative."
  - problem: H2
    statement: "No profiled participant evidences in-flow educational content embedded in the digital investment journey to explain fund types, risk ratings or investment vocabulary before or during the questionnaire."
  - problem: H1
    statement: "No profiled participant evidences a dropout-recovery mechanism for customers who exit in-app fund selection without completing a choice; the branch fallback (ST5) is the market's current response."
  - problem: H3
    statement: "No profiled participant evidences settlement-timeline transparency features at the order confirmation screen; H3 is parked in this run and the absence is recorded for a future run in which it is load-bearing."
---

# Record R-A7-01 — A7

One production. Not written for a reader; the document assembled from it is 3-competitive-analysis/3-competitive-synthesis.md.
