---
run_id: 2026-09-digital-onboarding-dropoff
artifact_id: A4
ost_role: opportunity
status: accepted
workflow: problems
modified_by: agent
revisions: 0
could_not_verify: []
produced_by:
  agent: hypothesis-designer
  skill: prioritisation
sources: [A3b]
external_sources: []
assembled_at: 2026-09-08
assembled_from: [R-A4-01]
decision:
  gate: G2
  by_agent: false
  selection: G2
  accepted_by:
    - name: Igor Tadic
      role: product manager
  accepted_at: 2026-09-08
  changed_during_refinement: none
  refinements: []
---

# Prioritised opportunities

A proposal: three opportunities primary, one secondary, one parked [rec:R-A4-01]. **The order places O3
and O1 ahead of O4, which differs from the requester's own account of what costs the business most** —
said here rather than matched quietly, and the reasoning is below.

## What we are solving first

**O3 — Identity creation mistaken for an open account.** Its funnel drop-off (22.9%) is the largest single
cliff in the journey, and the requester independently ranked its customer importance second only to O4,
before O1 or O2 had been discussed at all.

**O1 — Losing track of what is left in identity verification.** Ties O3 for the largest funnel cliff
(22.2%). The requester separately rated its importance high — losing an applicant this late, after the
hardest part is already done, costs more than losing one at the start. Not ranked against O3 directly, so
placed just behind it on the marginally smaller drop-off figure.

**O4 — No way back into a dropped application.** The single worst experience per applicant it affects,
by the requester's own account, and the only opportunity in this set with any complete-provenance
evidence behind it. Placed third rather than first because its customer volume is unmeasured and expected
smaller than O1 or O3 — on the two factors this run has actual numbers for, the funnel's own drop-off
rates, O1 and O3 are larger.

## What comes after

**O2 — Not knowing whether progress was saved after a failed scan.** Moderate on every factor: smaller,
unmeasured volume; medium importance; a single reference at `weak`. Nothing argues for or against
promoting it further, so it sits secondary rather than primary or parked.

## What we are not solving now

**O5 — Confirmation steps feel repetitive on a completed journey.** Affects the largest raw number of
applicants of the five — everyone who completes — and is parked anyway. Its own company-factor entry
says its contribution to this run's outcome is indirect at best: it is friction on a journey that already
completed, not the drop-off this run exists to reduce, and the requester rates it an irritation rather
than a loss. Retained and visible; not deleted.

## How we decided the order

ČS's four sizing factors, read off A3b: customer volume and frequency, strategic fit to the brief's
outcome, customer importance, and the trust tag as a secondary weight. None of the four averages into a
score.

**Where this proposal disagrees with the requester.** Asked directly, the requester named O4 as costing
the business most, and that judgement about the experience itself is not in question — it is the only
opportunity here with a dated, established-origin observation behind it, and the worst single outcome for
the applicants it touches. But prioritisation weighs documented volume and strategic fit alongside
importance, not importance alone, and on the one factor this run can actually measure — the funnel's own
drop-off rates — O1 and O3 sit on the two largest cliffs in the entire journey (22.2% and 22.9%), while
O4's volume is the requester's own expectation of "smaller," with no figure behind it. That is what moves
O3 and O1 ahead of O4 in this proposal.

**This is a proposal, not a decision.** Promotion, the order and what gets parked are the requester's to
make at G2; this is the starting point for that conversation.

## What we could not establish

- Root cause is unknown on all five opportunities — no RCA has been run on any of them, which limits how
  confidently any of them can be acted on regardless of where they sit in this order.
- Market factors (2b on every opportunity) is deferred to stage 3, which has not run yet, so the ordering
  above is made without it.

## How this was produced

Stage 2.4 (Prioritisation), `prioritisation@0.1`, agent `hypothesis-designer`, reading A3b and the
requester's own direction — nothing else in the run.

Every opportunity is placed in exactly one list, none added and none dropped. Each entry is the id of an
A3b opportunity, unchanged: the sizing, the trust tag and the risks all stay on A3b, and nothing here
restates them. `parked[]` carries O5 and stays visible rather than emptied.
