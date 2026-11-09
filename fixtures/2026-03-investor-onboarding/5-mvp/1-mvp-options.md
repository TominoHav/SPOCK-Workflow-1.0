---
run_id: 2026-03-investor-onboarding
artifact_id: A10
ost_role: artifact
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
produced_by:
  agent: product-owner
  skill: mvp-option-design
sources:
  - A9
  - A8
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
  selection: OPT-1
  accepted_by:
    - name: Igor Tadic
      role: Product Owner
  accepted_at: 2026-08-13
  reason: "OPT-1, the pull model. Explanation is available on every question and every fund label and stays invisible until the customer asks for it, so the screen a confident customer sees is unchanged. Chosen over OPT-2, which shows the explanation to everyone and adds friction for people who did not need it, and over OPT-3, which front-loads the whole explanation before the first question and cannot help at the moment uncertainty actually arrives. The pilot's question is whether a first-time investor will reach for help when it is offered in context, and this is the option that asks it."
  changed_during_refinement: none
  refinements: []
  note: "The option set reached this decision undecided — no preference marker, no ranking, no nomination, and each option stating how it differs from the others (R6.7-5). `constraints_met` is empty on all three because the Banking Constraints do not exist, so no option has been validated against the bank's operating frame; the selection was made on the pilot's own question rather than on feasibility, and that limit is recorded rather than left to be inferred."
assembled_at: 2026-08-20
assembled_from: [R-A10-01]
---

# MVP | MVP Options — ID-2: teaching built into the flow

**Run:** `2026-03-investor-onboarding` · **Stage:** 5.1 `mvp-option-design` · **Gate:** Q5 then G5a
**Inputs:** 4-solutions/3-selected-solution.md · 4-solutions/1-solution-set.md · 3-competitive-analysis/3-competitive-synthesis.md
**Options produced:** 3



**Assembled from one record**, which carries the fields a gate decides: [rec:R-A10-01].
---

## What is being piloted

**ID-2: teaching built into the flow, with the suitability questionnaire's questions unchanged.**

Short contextual explanations at each stage of the questionnaire and the fund-selection flow — what a
term means, what the bank is legally required to ask, what an answer implies. The questionnaire's
structure and wording are untouched. The same educational support extends to fund selection, where
product labels (dynamic, conservative, balanced) presuppose the financial literacy the target customer
lacks.

It solves H2 — the run's only primary problem. It does not target H1 (secondary) or H3 (parked).

The market synthesis (A7) records two relevant absences: no profiled participant evidences a vocabulary-
adaptive questionnaire for first-time investors, and no profiled participant evidences in-flow financial
education embedded in the digital investment journey. The branch adviser (ST5) is the market's current
resolution of the vocabulary barrier, performing the educational role in person. No bank has moved this
into the digital channel. The three options below are whole ways to pilot that move.

---

## How to read this set

Three options are presented in written order. **The order of the list is not a preference.** No option
carries a preference marker, a ranking claim, or a recommendation. A person selects one at G5a; that
selection is recorded in the decision block in the front matter.

Each option is a complete alternative to choose between, not a phase or starting point of another. The
three differ in when and how the educational function is delivered — the mechanism, not the idea. The
mechanism shapes what the pilot can learn, so the choice here is also a choice of what question the
pilot answers.

---

## The Banking Constraints reduction

The Banking Constraints do not exist yet. `constraints_met: []` on every option reflects this: the
fields are present and empty, not omitted. What degrades is the validation that each delivery mechanism
is feasible inside the bank's actual operating frame — the constraint anchor is absent, not the
characterisation of how the options differ from each other. `constraint_basis: none_stated` records this
on the artifact. The three `differs_by` fields still distinguish the alternatives; what is missing is
the check that a given difference is bank-material.

---

## OPT-1 — On-demand contextual help

An info indicator appears on every questionnaire question and every fund product label. Activating the
indicator reveals a short explanation: what the term means, why the bank is legally required to ask the
question, and what the answer implies for the customer's investment profile. No explanation text is
visible until the customer activates the indicator. The questionnaire's questions, wording and sequence
are unchanged.

This moves the branch adviser's educational function into the digital channel as a customer-initiated
mechanism. Customers who need clarification access it at the moment of confusion; customers who do not
need it encounter only an unobtrusive indicator on an otherwise unchanged screen. The mechanism operates
across both the questionnaire and fund-selection steps, so the full scope of ID-2 is piloted.

**What this option tests:** Whether customers who need help will discover and use a self-directed
mechanism without prompting — whether on-demand access is sufficient for the target segment to close H2.

---

## OPT-2 — Proactive contextual explanation

A short explanation is visible by default beneath every questionnaire question and every fund product
label. No activation is required. At each questionnaire screen, the explanation states why the bank is
required to ask the question and what each answer implies for the investment profile. At each
fund-selection screen, the product label carries its definition and risk characterisation visibly
alongside the label.

This moves the branch adviser's educational function into the digital channel as a universal element
of every relevant screen. Every customer who reaches a screen sees the explanation, whether or not they
would have sought it. The mechanism operates across both the questionnaire and fund-selection steps.

**What this option tests:** Whether proactive explanation — visible without any customer action — changes
questionnaire completion rates and profile accuracy; and whether persistent visible text creates friction
for customers who do not need it.

---

## OPT-3 — Pre-entry orientation

A single screen appears before the suitability questionnaire opens. It explains what the questionnaire
is, why the bank conducts it, and provides concise definitions of the core investment terms the
questions will use — fund types, risk ratings, investment horizon — along with the fund categories the
customer will encounter in fund selection. The questionnaire itself and the fund-selection flow are then
presented without additional explanation prompts. The questionnaire's questions, wording and sequence
are unchanged.

This moves the branch adviser's educational function into the digital channel as a front-loaded
framing step. The customer enters the questionnaire already oriented: the regulatory context is
established, the key terms are defined, and both the questionnaire and fund-selection vocabulary have
been covered before the first question appears.

**What this option tests:** Whether upfront framing — knowing the regulatory context and core terms
before the questionnaire begins — changes the customer's ability to complete the questionnaire and
produce an accurate risk profile; and whether orientation at entry is sufficient without inline support
at each subsequent step.

---

## What this artifact does not do

Does not score, rank, order, or recommend any option. Does not select an option — a person does that
at G5a. Does not run Q5 or report a gate result for its own output. Does not write A11 — that is
`mvp-expansion`, a separate binding that runs after a person has selected at G5a. Does not touch A9,
A8, A8b, A7, A4, or RUN-STATE.md.
