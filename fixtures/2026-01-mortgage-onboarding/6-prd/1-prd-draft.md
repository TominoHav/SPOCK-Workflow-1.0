---
run_id: 2026-01-mortgage-onboarding
artifact_id: A12
ost_role: artifact
status: accepted
workflow: discovery
modified_by: human
revisions: 0
external_sources: []
sources:
  - A11
  - A1
  - A4
produced_by:
  agent: business-analyst
  skill: prd
# PRD | Product Requirements, draft — derived from the gate model and
# recomputed at the gate, never read as authored (C65, PD148/D7)
could_not_verify: []
agreement_block:
  name: ""
  date: ""
assembled_at: 2026-08-20
assembled_from: [R-A12-01]
---

# PRD (draft) — in-app rescue for the stalled first-time buyer

> **Fictional.** Invented to exercise the stage-6 gate. See [fixtures/README.md](../README.md).
>
> **Reduced run.** The PRD Template, the Strategy Basis and the Compliance Guidelines are all absent. The
> authoring method is unchanged: every section present or marked not-applicable with a reason, the
> mandatory alignment validation, compliance addressed inside the requirements, traceability to A11, and
> the agreement block left present and empty. What degrades is standing: the structure is `non_standard`
> until the PRD Template lands, and the alignment validation is `indicative_unverified_strategy`.


**Assembled from one record**, which carries the fields a gate decides: [rec:R-A12-01].
## Overview

A pilot that answers **I2** — the buyer who stalls mid-onboarding — by detecting the stall inside the
digital flow and offering, in place, a route to a mortgage advisor, with the application preserved so
nothing is re-entered. It is the definition of the expanded MVP at [A11](../5-mvp/2-expanded-mvp.md).

## Problem

It carries the primary problem **H1**, which rates `strong` on two independent origins, and closes **H2**,
the gap the competitive synthesis named as unanswered by the market. **H2 rates `weak`** and that travels
with it: it is real and thinly evidenced, and nothing downstream should read it as more.

## Users

First-time buyers and movers applying for a mortgage in the digital flow, who reach a step they cannot
complete alone. From the brief and from **H1**: they are not abandoning the bank, they are stuck at one
moment and have no route out of it that keeps what they have already entered. The advisor is a user of
this too, and a second-order one: they receive the hand-off and inherit the state.

## Success measures

**Declared not applicable, with its reason.** The current-process baseline has not been supplied, so a
measurable target cannot be set this run. Naming a number here without one would be a target nobody could
be held to and a comparison with nothing behind it.

## Requirements

Requirements trace to the expanded MVP [A11](../5-mvp/2-expanded-mvp.md), and through it to the selected idea A9
and the prioritised problems A4. **No requirement appears that A4 did not carry.**

> **The statements moved here on 14 August and the front matter now carries only the id and the trace.**
> They had been written in the record and nowhere else, and this section pointed at the front matter as
> the place to read them — so the document said *the requirements are elsewhere*, which is the one thing a
> PRD may not say. It also said PR1 to PR4 while the record carried three.

### PR1 — The onboarding flow detects a stall

The onboarding flow detects a stall (inactivity beyond a set threshold on a step, or a repeated validation error on the same field) and offers, in the app, a route to a mortgage advisor

**Traces to:** A11

### PR2 — The hand-off carries the saved application state to the advi

The hand-off carries the saved application state to the advisor, so the buyer resumes rather than restarts

**Traces to:** A11

### PR3 — The offer is dismissible

The offer is dismissible and does not block the buyer from continuing on their own

**Traces to:** A11

## Non-functional requirements

**Declared not applicable, and the reason matters.** The run has no measured baseline for the current
process and the Compliance Guidelines are absent, so any latency, availability or retention figure written
here would be invented. The single threshold the requirements actually depend on, the inactivity period
that counts as a stall, is named as unset inside PR1 rather than guessed in a section that would make it
look derived.

## Out of scope

Anything that takes the buyer out of the digital channel to start again, and any change to the
underwriting decision itself. Both were considered at the MVP stage and cut: the first defeats the point
of a rescue, and the second is a different initiative with a different owner.

## Dependencies

**Advisor capacity is the dependency this run identified and did not resolve.** The rescue routes stalled
buyers to a mortgage advisor, and nothing here establishes that the advisors have the hours for the volume
the detection will produce. The alignment validation names it as the one place this pulls against the
strategy. Owner: unassigned at handover, and stage 7 carries it forward as an open dependency rather than
a risk nobody owns.

---

## Marked human edit — one, and the account is in `notes/`

**Not agent output.** One edit was made to this artifact by a person: *the eight headings* (12 August 2026). **What changed and why is in [notes/marked-edits.md](../notes/marked-edits.md)**, which no gate reads.
