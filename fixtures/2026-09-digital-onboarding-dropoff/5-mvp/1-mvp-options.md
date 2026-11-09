---
run_id: 2026-09-digital-onboarding-dropoff
artifact_id: A10
ost_role: artifact
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
produced_by:
  agent: product-manager
  skill: mvp-option-design
sources: [A9]
external_sources: []
assembled_at: 2026-09-08
assembled_from: [R-A10-01]
could_not_verify:
  - rule: "2..3 options, each a whole way to pilot the solution, never a subset or a phase of another"
    needs: judge
    reach: artifact
decision:
  gate: G5a
  by_agent: false
  selection: OPT1
  accepted_by:
    - name: Igor Tadic
      role: product manager
  accepted_at: 2026-09-08
  changed_during_refinement: none
  refinements: []
---

# Ways to pilot the durable-session solution

Two whole ways to pilot SOL3 — the durable session that survives a client leaving, selected at the last
stage. None is a phase of another and none is presented as preferred; they appear in the order they were
written. Each states what sets it apart, and none is validated against a bank-material frame — see
"How this was produced". [rec:R-A10-01]

## OPT1 — The full capability, both channels

The full capability the selected solution describes, exactly as specified — durable session state kept
for up to 30 days from last activity and stated to the applicant as such, the live estimate powered by
it, and cross-device resumption gated by a full re-run of the original identity check before any saved
state is shown — built on both the app and the web channel together, from the start. [rec:R-A10-01]

**What sets it apart.** It solves O1 and O4 together, in full, across both channels, so an applicant who
starts on the app and returns on the web — or the reverse — is exactly the case this option answers. It
is the only one of the two carrying the 30-day durable store and the cross-device resumption endpoint at
all. [rec:R-A10-01]

## OPT2 — Short-lived, same-device recovery

The live estimate as in OPT1, plus a narrow recovery path: if the applicant leaves and returns on the
same device within the same day, the journey resumes from where they left off, riding on the device's own
existing session rather than a new authenticated resumption endpoint. Return on a different device, after
the same day, or once the session has expired, and the applicant starts over exactly as they do today —
there is no 30-day store and no separate identity re-check built for this pilot. [rec:R-A10-01]

**What sets it apart.** It solves O1 in full and O4 only partially — the same-day, same-device case, a
narrower slice of "no way back into a dropped application" than the selected solution states in full. It
introduces a bounded, short-lived session extension rather than a new durable applicant record, and no
new authentication path. Regulatory reach is lighter than OPT1's: a short-lived stored state rather than
a 30-day one, no cross-device resumption endpoint, and no 30-day retention question to answer.
[rec:R-A10-01]

## How to choose between them

OPT1 teaches whether the full capability — durable, cross-device, gated by a full re-verification — is
what actually recovers an applicant who has genuinely left, including one who switches device along the
way. OPT2 teaches whether recovering only the same-day, same-device case captures a meaningful share of
abandonment, without any 30-day store or cross-device resumption. Neither is a step toward the other:
OPT1 is not OPT2 with a wider scope bolted on, and OPT2 is not a phase of OPT1 — they are two different
answers to how much of "no way back into a dropped application" is worth building at all. [rec:R-A10-01]

**How the chosen option's effect gets measured — a live control group against a fixed pilot window, or a
single cohort read before-and-after — is not a third way of piloting the solution and is not decided
here.** Whichever option is selected is built the same way regardless of how its result will be read
afterwards; that is a measurement decision made once, after selection, and belongs to the stage that
expands the chosen option rather than to the choice between OPT1 and OPT2. [rec:R-A10-01]

## What we could not establish

Whether any of these three differences is bank-material could not be established. The screen that would
compare an option's regulatory reach against ČS's own frame reads a Banking Constraints body, and that
body was retired on 30 August 2026 and will not be written — so `constraints_met[]` is empty on every
option above, and `constraint_basis: none_stated` on the record is the whole of what this document says
about it. Each option's `differs_by` is a stated difference, not a confirmed one. [rec:R-A10-01]

## How this was produced

Stage 5.1 of the discovery workflow, the `mvp-option-design` skill, run by the Product Manager. Read the
selected solution (A9, including its own sections rather than only the decision) and the competitive
synthesis (A7), against the four compliance area cards' applicability-trigger tables, to shape where the
two options should genuinely differ. A first pass drew a third option from how the pilot's effect would be
measured — a control group against a fixed window — rather than from what would be built; on review that
is one option wearing two labels, so it was withdrawn rather than kept to reach three. The floor this
skill sets is two, and two is what stood up. Produced in one pass (`single-shot`, effort `medium`); no
bound was reached. This document passes Q5 next, then a person selects one option at G5a — nothing here is
a recommendation and no option is marked preferred. [rec:R-A10-01]
