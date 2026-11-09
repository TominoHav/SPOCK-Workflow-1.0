---
run_id: 2026-03-investor-onboarding
artifact_id: A12
ost_role: artifact
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
produced_by:
  agent: business-analyst
  skill: prd
sources:
  - A11
  - A10
  - A9
  - A7
  - A4
  - A1
external_sources: []
could_not_verify: []
agreement_block:
  name: ""
  date: ""
assembled_at: 2026-08-20
assembled_from: [R-A12-01]
---

# PRD | Product Requirements, draft — OPT-1: On-demand contextual help

**Run:** `2026-03-investor-onboarding` · **Stage:** 6.1 `prd` · **Gate:** Q6 then G6
**Expands:** 5-mvp/2-expanded-mvp.md (OPT-1, accepted at G5b by Igor Tadic, 2026-08-13)
**Traces to:** A11 → A9 (ID-2) → A4 (H2, primary problem)

This document is a draft (A12). It becomes the agreed PRD (A13) when the Product Owner writes a name
and date in the agreement block at G6. The agreement block is present and empty; no agent writes into it.



**Assembled from one record**, which carries the fields a gate decides: [rec:R-A12-01].
---

## Overview

This document defines the product requirements for **OPT-1 (on-demand contextual help)**, the selected
MVP option for piloting **idea ID-2 (teaching built into the flow)** in run
`2026-03-investor-onboarding`.

The mechanism: an explanation indicator is embedded at every question in the suitability questionnaire
and at every fund product label in the fund-selection screen. The indicator is visible but minimal; no
explanation text is shown until the customer activates it. On activation, an explanation appears inline
or as an overlay. Dismissing it returns the customer to the original screen with all prior answers and
progress intact. The questionnaire questions, wording, answer options and sequence are unchanged.

This PRD targets **H2** — the suitability questionnaire's inaccessibility to first-time investors —
which is the run's only primary problem (A4). It does not target H1 (secondary) or H3 (parked).

The three compliance touchpoints identified in A11 (CT.a, CT.b, CT.c) are addressed in requirements
R8, R9 and R10 respectively. Seven items left open by A11 are partially addressed here; the ones that
cannot be resolved from the run material are named and assigned to dependencies.

Strategic alignment is validated for the second time in this document. The first pass was comparative,
at the ideas stage; this one confirms the narrowed MVP still serves the strategy. The Strategy Basis
does not exist; alignment is assessed against market evidence in A7 and the expanded MVP's own
strategic analysis in A11, and is marked indicative accordingly.

---

## Problem

**H2 — Suitability questionnaire inaccessible to first-time investors** (primary; trust: strong)

The suitability questionnaire uses vocabulary — fund types, risk ratings, investment horizon,
risk-tolerance categories — that presupposes investment experience the target customer does not have.
A first-time investor encountering the questionnaire has no way to know what a "balanced fund" implies
for how their money will be managed, why the bank is legally required to ask about their investment
horizon, or what "conservative" versus "dynamic" means for their risk profile.

Trust is strong. H2 carries two independent origins and a first-hand observation among them (A3).
This is the highest trust tag in the run.

Market evidence: all three profiled competitors require the suitability questionnaire as the mandatory
digital gate to fund investment (A7 ST1). All three resolve H2 through the branch adviser (A7 ST5).
No profiled competitor has built a digital equivalent of that resolution (A7 absences A1, A2). The
branch adviser performs the educational function in person; no bank has moved it into the digital
channel. OPT-1 is that move.

**What this PRD does not address:**
- **H1 — Choice at fund selection** (secondary; trust: weak) — in the run's prioritised problem set;
  not targeted by OPT-1.
- **H3 — Settlement mechanics uncertainty** (parked; trust: weak) — retained in the problem set for a
  future run.

---

## Users

The target user is a **Czech retail customer with savings in a current account who has never purchased
an investment product**, attempting to complete the suitability questionnaire in a banking app
(A1 customer_segment, A4 H2).

Their situation:
- They are approaching investment for the first time. They know they have savings and want to act on
  them; the vocabulary of investing is unfamiliar.
- They encounter questionnaire questions that ask about risk tolerance, investment horizon, and
  financial situation in terms that presuppose experience they do not have.
- Without an explanation of what these terms mean in context, they either guess, abandon, or call the
  branch. The branch adviser resolves this today in person (A7 ST5).
- MONETA's 25-question digital advisory (A7 P2) is the market's most direct in-app resolution of H1;
  no profiled bank has moved the equivalent of the branch adviser's educational function into the
  digital questionnaire itself.

The target user is not a persona invented here. They are drawn directly from the brief's customer
segment (A1) and H2's problem statement (A4, A3). A customer who already understands the
questionnaire's vocabulary is not OPT-1's target; OPT-1 is designed so that customer encounters only
an unobtrusive indicator on an otherwise unchanged screen.

---

## Success measures

**Pilot question (from A11):** Whether first-time investors discover and use the explanation mechanism
at the moment of uncertainty, and whether on-demand access in context at every question and every label
is sufficient for the target segment to complete the questionnaire and reach a fund selection without
the branch fallback.

**What to measure:**

| Measure | What it shows |
|---|---|
| Indicator activation rate | The proportion of target-segment customers who activate at least one explanation during a questionnaire session |
| Questionnaire completion rate | Among target-segment customers, the proportion who complete the full questionnaire in the pilot period |
| Branch fallback rate | The rate at which target-segment customers exit the digital flow and complete through a branch during the pilot period |
| Explanation dwell time | Time spent viewing an explanation per activation, as a proxy for engagement with the content |

**Baselines not established.** The current-process questionnaire completion rate for first-time
investors, the branch fallback rate, and typical time-to-completion are not in the run material.
These baselines must be established before the pilot launches; without them the measures above cannot
be interpreted as improvement, decline, or neutral.

**Pilot measurement plan: open.** Open item 5 from A11. The specific events to be logged (indicator
shown, indicator activated, explanation viewed, explanation dismissed, dwell time), the success
threshold for the pilot question, and the observation period are not specified in this PRD. These must
be decided by the product team before the pilot launches. The required measurement infrastructure and
the plan itself are listed in the dependencies section (D9, D10).

---

## Requirements

### R1 — Explanation indicator at every questionnaire question

An explanation indicator must be present at every question in the suitability questionnaire, visible
on that question screen without requiring any customer action beyond navigating to that question.

**Traces to:** A11

**Acceptance criteria:**
- Given a customer opens the suitability questionnaire and navigates to any question, when the
  question screen is displayed, then an explanation indicator is visible on that screen.
- Given an explanation indicator is present on a questionnaire question screen, when the customer has
  not activated it, then no explanation text is shown on the question screen.

---

### R2 — Explanation indicator at every fund product label

An explanation indicator must be present at every fund product label in the fund-selection screen,
visible alongside each label without requiring any customer action beyond navigating to the
fund-selection screen.

**Traces to:** A11

**Acceptance criteria:**
- Given a customer has passed the suitability questionnaire and navigated to the fund-selection screen,
  when the screen is displayed, then an explanation indicator is visible alongside every fund product
  label on that screen.
- Given an explanation indicator is present alongside a fund label, when the customer has not
  activated it, then no explanation text is shown for that label.

---

### R3 — No explanation text without customer activation

No explanation text for any questionnaire question or fund product label must be shown to a customer
who has not activated the indicator for that specific item in the current session.

**Traces to:** A11, A4

*CT.a addressed in part: explanation text is withheld until customer activation, so no explanation is
presented to a customer who has not sought it.*

**Acceptance criteria:**
- Given a customer navigates through every questionnaire question and the full fund-selection screen
  without activating any indicator, when their experience is compared with a session run without any
  indicators present, then the question text, answer options, fund labels, and all interactive
  elements are identical.
- Given a customer has not activated the indicator for a specific questionnaire question, when any
  other indicator on the same screen is activated or dismissed, then the unexplored question shows no
  explanation text.

---

### R4 — Questionnaire explanation content

On activation of a questionnaire indicator, the explanation text must state in plain language: what
the question is asking; why the bank is required to ask it under MiFID II; and what each answer option
implies for a customer's investment profile, stated generically and with no reference to this
customer's prior answers or accumulated profile state.

**Traces to:** A11, A4

*CT.a addressed in part: explanation texts are generic and do not reference the customer's prior
answers or profile state, so they cannot bias the customer's independent assessment. CT.c addressed
in part: explanation texts describe what answer options mean for a risk profile generically, without
referencing this customer's specific financial circumstances.*

**Acceptance criteria:**
- Given a customer activates a questionnaire explanation indicator, when the explanation is displayed,
  then the text addresses all three content elements in R4 for that specific question.
- Given a customer has provided one or more prior questionnaire answers before activating an
  indicator, when the explanation text for any question is displayed, then the explanation text does
  not reference the customer's prior answers, accumulated profile state, or any customer-specific
  information.
- Given two customers who have given different prior answers view the explanation for the same
  questionnaire question, then the explanation text displayed to each is identical.

---

### R5 — Fund label explanation content

On activation of a fund product label indicator, the explanation text must state: what the label
category means in terms of risk and return characteristics; how a customer's derived risk profile
typically maps to this category; and a direction to the applicable Key Information Document for the
regulated fund information the label represents.

**Traces to:** A11, A4

*CT.b addressed in part: explanation texts for fund labels direct customers to the applicable KID
and are supplementary context, not a substitute for the regulated disclosure.*

**Acceptance criteria:**
- Given a customer activates a fund product label explanation indicator, when the explanation is
  displayed, then the text addresses all three content elements in R5 for that specific label.
- Given a fund label explanation directs the customer to the applicable Key Information Document,
  when the KID reference is present, then it identifies the correct KID for that fund product.
- Given a customer reads a fund label explanation in full without accessing the KID, when they return
  to the fund-selection screen, then the fund's KID remains accessible through its standard disclosure
  pathway and the explanation has not replaced it.

---

### R6 — State preservation on dismiss

Dismissing an explanation must return the customer to the questionnaire or fund-selection screen with
all prior questionnaire answers, page state, and navigation progress in exactly the state they were in
before the indicator was activated.

**Traces to:** A11, A4

*CT.a addressed in part: questionnaire progress and all prior entries are preserved throughout
explanation viewing and dismissal, confirming the explanation mechanism does not disrupt the
integrity of the suitability assessment.*

**Acceptance criteria:**
- Given a customer activates a questionnaire explanation at any point during the questionnaire, when
  they dismiss the explanation, then all prior question answers are preserved, the current question
  is in the same state as before activation, and no questionnaire progress has been lost.
- Given a customer activates a fund label explanation and then dismisses it, when they return to the
  fund-selection screen, then the screen state is identical to the moment before activation.
- Given a customer activates and dismisses multiple explanations in sequence during a single session,
  when they complete the questionnaire, then their answers reflect only their deliberate input and no
  session state was corrupted by explanation activity.

---

### R7 — Questionnaire unchanged

The suitability questionnaire questions, wording, answer options and sequence must be identical in the
version with explanation indicators to the version without, and the questionnaire scoring logic and
risk-profile derivation algorithm must not change.

**Traces to:** A11, A4

*CT.a addressed in part: the questionnaire's legal validity as a regulated suitability assessment
instrument is preserved because neither the questions, the answer options, nor the scoring logic are
altered.*

**Acceptance criteria:**
- Given the explanation indicator mechanism is deployed, when any question in the suitability
  questionnaire is displayed, then the question text, wording, answer options and their sequence are
  identical to those displayed before indicators were added.
- Given a customer completes the questionnaire with the explanation mechanism active, when the scoring
  logic processes their answers, then the risk-profile derivation produces the same result as it would
  produce for identical answers on the version without indicators.
- Given a compliance review examines the questionnaire with indicators deployed, when the reviewer
  compares each question against the pre-indicator version, then no question text, answer option,
  or sequence element has changed.

---

### R8 — Compliance review: suitability questionnaire integrity (CT.a)

Each questionnaire question's explanation text must undergo a documented compliance review confirming
the text cannot reasonably be read as steering a customer's answer before that text may be deployed
to production; any text that does not pass this review must be revised and re-reviewed before
deployment is permitted.

**Traces to:** A11, A4

*Addresses compliance touchpoint CT.a — MiFID II Article 25, suitability questionnaire integrity.
The Compliance Guidelines are absent; this requirement is identified from MiFID II Article 25
regulatory knowledge. Compliance validation by the bank's compliance function is required before
implementation.*

**Acceptance criteria:**
- Given any questionnaire question's explanation text is prepared for deployment, when a documented
  compliance review has not been completed and its outcome recorded for that specific text, then that
  text must not be deployed to production.
- Given a compliance review determines that a questionnaire explanation text can reasonably be read
  as steering a customer's answer toward a specific option or risk-profile outcome, when the review
  result is recorded, then the text is classified as failing the review, is revised, and must pass a
  further review before deployment is permitted.
- Given a compliance review determines that a questionnaire explanation text cannot reasonably be
  read as steering an answer, when the review outcome is recorded with a named reviewer and date,
  then the text may proceed to deployment.

---

### R9 — KID-alignment review: fund product disclosure (CT.b)

Each fund product label's explanation text must undergo a documented KID-alignment review confirming
the text is consistent with the applicable Key Information Document and does not omit or contradict
any required disclosure before that text may be deployed to production; any text that does not pass
this review must be revised and re-reviewed before deployment is permitted.

**Traces to:** A11, A4

*Addresses compliance touchpoint CT.b — PRIIPs Regulation (EU) 1286/2014, fund product disclosure
alignment. The Compliance Guidelines are absent; this requirement is identified from PRIIPs
regulatory knowledge. Compliance validation by the bank's compliance function is required before
implementation.*

**Acceptance criteria:**
- Given any fund product label's explanation text is prepared for deployment, when a documented
  KID-alignment review has not been completed and its outcome recorded for that specific text and
  the applicable KID, then that text must not be deployed to production.
- Given a KID-alignment review determines that a fund label explanation omits a required PRIIPs
  disclosure, contradicts the applicable KID, or implies the explanation substitutes for the KID,
  when the review result is recorded, then the text is classified as failing the review, is revised,
  and must pass a further review before deployment is permitted.
- Given a KID-alignment review confirms that a fund label explanation is consistent with the
  applicable KID and does not omit or contradict any required disclosure, when the outcome is
  recorded with a named reviewer and date, then the text may proceed to deployment.

---

### R10 — Content review: investment information versus advice boundary (CT.c)

Each questionnaire indicator explanation text must undergo a documented content review confirming it
constitutes investment information and not personalised investment advice before deployment, and must
not reference the specific customer's prior answers, financial situation, income, investment
objectives, or personal circumstances; any text that does not pass this review must be revised and
re-reviewed before deployment is permitted.

**Traces to:** A11, A4

*Addresses compliance touchpoint CT.c — MiFID II Article 24, investment information versus
personalised investment advice boundary. The Compliance Guidelines are absent; this requirement is
identified from MiFID II Article 24 regulatory knowledge. Compliance validation by the bank's
compliance function is required before implementation.*

**Acceptance criteria:**
- Given any questionnaire indicator explanation text is prepared for deployment, when a documented
  information/advice boundary review has not been completed and its outcome recorded for that
  specific text, then that text must not be deployed to production.
- Given a content review determines that a questionnaire explanation constitutes personalised
  investment advice — because it references the customer's specific circumstances, makes a
  personalised recommendation, or can only be read correctly in light of the customer's individual
  financial position — when the review result is recorded, then the text fails the review, is
  revised, and must pass a further review before deployment is permitted.
- Given any explanation text contains a reference to the specific customer's prior questionnaire
  answers, financial situation, income, investment objectives, risk profile, or personal
  circumstances, when that text is reviewed, then it fails the review on this ground alone and must
  be revised before deployment is permitted.

---

## Non-functional requirements

These are stated to the depth this run can support. The Compliance Guidelines are absent; the bank's
security and data governance standards are not in the run material. Where a requirement cannot be
stated with a number or a verifiable condition, the reason is given rather than a placeholder value.

**Performance.** No latency targets are established in the run material. The current investment
questionnaire's response-time profile is not in the run. A target for explanation display latency —
the time from indicator activation to explanation text visible — must be set before implementation
begins, derived from the bank's platform performance standards or from a measurement of the current
digital investment journey. The target is not stated here because none has been derived from the run
material; inventing a number would be worse than stating that one is needed.

**Security.** Explanation texts are generic content and not customer personal data. No security
requirements beyond those already governing the existing investment questionnaire and fund-selection
flow have been identified in the run material. The Compliance Guidelines, which would normally
specify security requirements at this level, do not exist.

**Data handling.** Questionnaire answers are not modified or read by the explanation mechanism.
Explanation texts are static, customer-independent content that do not vary by customer. Customer
activation events — which indicators were shown, which were activated, dwell time — would be new
data points generated by the pilot. Their classification, retention period, and processing basis
under GDPR and applicable Czech data protection law are not specified in the run material and must be
established before the pilot logs anything. The measurement plan (open item 5, dependency D10) must
address data handling as part of its specification.

**Accessibility.** The WCAG conformance level required for the explanation indicator and the
expansion mechanism is not specified in the run material. This is open item 7 from A11 and is a
decision for the product team or the bank's accessibility standard to supply. At a minimum, before
that decision is made: the indicator must be operable via keyboard and screen reader; the expanded
explanation must be fully accessible via assistive technology; colour contrast for the indicator and
explanation text must meet the conformance level once decided. Whether that level is AA or AAA is not
this run's to decide without the bank's standard.

**Availability.** No availability target is specified in the run material. The explanation mechanism
must not reduce the availability of the suitability questionnaire or fund-selection screen below
whatever commitment those screens already operate under; that commitment is not in the run material.

---

## Out of scope

**OPT-2 — Proactive contextual explanation (visible by default).**
Considered at stage 5.1 and excluded at G5a. Explanation text visible by default on every
questionnaire question and fund label imposes explanation content on every customer regardless of
whether they sought it. The Product Owner's selection reasoning at G5a identified adding friction for
the segment that does not need explanations as the chief drawback of this approach (A10 decision).
Remains in A10, unchanged.

**OPT-3 — Pre-entry orientation (single screen before questionnaire).**
Considered at stage 5.1 and excluded at G5a. A single explanation screen before the questionnaire
begins cannot provide help at the moment uncertainty arrives at a specific question; it explains the
context before the difficulty rather than at it (A10 decision). Remains in A10, unchanged.

**H1 — Choice at fund selection (secondary problem).**
H1 is in the run's prioritised problem set as secondary (A4). OPT-1 does not address H1. An
initiative targeting H1 starts a new run from the same problem set (PD12).

**H3 — Settlement mechanics uncertainty (parked problem).**
H3 is retained in the run's parked list (A4) for a future run in which it is load-bearing. Not
addressed here.

**Modification of the suitability questionnaire questions, wording or scoring.**
Explicitly excluded. The questionnaire is the regulated instrument underpinning the bank's suitability
assessment. Ideas that modify the questionnaire itself (ID-1, ID-5 from A8) were considered at stage 4
and not selected. ID-5 in particular was deferred — not rejected — because it carries the widest
compliance surface in the idea set while the Compliance Guidelines do not exist (A9 rationale). ID-5
remains available for a separate run.

**Modification of the fund product list, pricing, sorting or scoring logic.**
Explicitly excluded. The fund catalogue, fund sorting, pricing display, and risk-profile derivation
are unchanged.

**Automated or AI-generated explanation content.**
The mechanism as specified delivers authored, reviewed and approved texts. Whether content could be
generated or personalised dynamically is not examined in this run and is outside the scope of the
pilot.

---

## Dependencies

Each dependency names what is needed, who owns it, and what happens to this PRD without it.

| # | What is needed | Owner | Without it |
|---|---|---|---|
| D1 | Strategy Basis | Bank strategy team (not identified in this run) | Alignment validation remains indicative and unverified against the bank's strategy. A11 ST.a–ST.d carry this mark and it is carried forward here |
| D2 | Compliance Guidelines | Bank compliance team | The three compliance review processes in R8, R9 and R10 must be owned by a compliance function; no review workflow can be designed without them. The touchpoints were identified from regulation directly and require compliance validation before implementation |
| D3 | Banking Constraints | Bank product or engineering (not identified) | Indicator interaction design (D4) and platform scope (D11) cannot be validated against the bank's operating constraints. Feasibility of the chosen indicator pattern per platform is unconfirmed |
| D4 | Indicator interaction design | UX/design and delivery team | Trigger event (tap/click/hover), display format (tooltip/bottom sheet/inline expansion), and dismiss mechanism are not specified (A11 open item 1). These decisions shape the accessibility requirements and mobile layout constraints; no implementation can begin without them |
| D5 | Explanation content authoring and governance | To be established | Who authors and maintains the explanation texts, the character or word limit per question and per label, the reading level target, and whether Czech-only or Czech and English variants are required are not specified (A11 open item 2). R4 and R5 cannot be fulfilled until these decisions are made |
| D6 | MiFID II Article 25 compliance review process | Bank compliance team | R8 requires a documented compliance review for each questionnaire explanation text before deployment. The internal review workflow — who reviews, what the review tests, how the outcome is recorded, who may approve deployment — must be designed and staffed |
| D7 | PRIIPs KID alignment review process | Bank compliance team | R9 requires a documented KID-alignment review for each fund label explanation text. The internal review workflow must be designed and staffed; a current copy of each applicable KID is required as an input to each review |
| D8 | MiFID II Article 24 content review process | Bank compliance team | R10 requires a documented information/advice boundary review for each questionnaire explanation text. The internal review workflow must be designed and staffed |
| D9 | Pilot measurement infrastructure | Product team and engineering | Event logging for indicator displayed, indicator activated, explanation viewed, dwell time, and questionnaire completion; analytics capacity; data retention policy for pilot events. Without this infrastructure the pilot question cannot be answered |
| D10 | Pilot measurement plan | Product team | Open item 5 from A11. The specific events to log, the success threshold for the pilot question, and the observation period must be decided before launch. The measurement plan must also address data handling (non_functional, data handling) |
| D11 | Platform scope decision | Product team and engineering | Whether the indicator interaction is identical on iOS, Android and web or adapted per platform is not specified (A11 open item 6). This affects implementation scope and testing scope per platform |
| D12 | Accessibility level decision | Product team or bank accessibility standard | The WCAG conformance level for the indicator and expansion mechanism is not specified (A11 open item 7). The non_functional section names minimum behaviour; the conformance level must be set before implementation |

**Open items from A11 — resolution status in this PRD:**

| Item | What A11 named | Status |
|---|---|---|
| 1 — Indicator interaction design | Trigger, format, dismiss mechanism | Open — needs the delivery team and UX (D4). Shapes accessibility requirements and platform constraints |
| 2 — Explanation content specification | Author, limits, reading level, language variants | Open — needed before R4 and R5 can be authored (D5) |
| 3 — MiFID II Article 25 review process | Internal review workflow for questionnaire texts | Requirement written (R8). Review workflow design and staffing needed (D6) |
| 4 — PRIIPs KID alignment process | Internal review workflow for fund label texts | Requirement written (R9). Review workflow design and staffing needed (D7) |
| 5 — Pilot measurement plan | Events, success metric, observation period | Open — named in success_measures and dependencies (D9, D10) |
| 6 — Platform scope | iOS, Android, web — same or adapted | Open — named in dependencies (D11) |
| 7 — Accessibility requirements | WCAG level for indicator and expansion | Open — named in non_functional and dependencies (D12) |

**Absent bodies and how they are carried forward:**
The **Strategy Basis** is absent; alignment validation is marked `indicative_unverified_strategy`
throughout (alignment_validation.basis and A11 strategic touchpoints). The **Compliance Guidelines**
are absent; the three compliance touchpoints (CT.a, CT.b, CT.c) were identified from regulation
read directly and each compliance requirement (R8, R9, R10) states this and names the required
validation. The **Banking Constraints** are absent; `constraint_basis: none_stated` records this on
the artifact and D3 names it as a dependency.

---

*This is A12, a draft PRD. The agreement block above is present and empty. It is completed by the
Product Owner at G6, whose name and date make this document A13 and authorise stage 7.*
