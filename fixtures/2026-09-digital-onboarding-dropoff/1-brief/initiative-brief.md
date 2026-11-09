---
run_id: 2026-09-digital-onboarding-dropoff
artifact_id: A1
ost_role: outcome
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "no field is inferred; an unsupplied field is marked unknown with a reason"
    needs: judge
    reach: process
produced_by:
  agent: product-manager
  skill: brief-creation
sources: []
external_sources: []
assembled_at: 2026-09-08
assembled_from: [R-A1-01]
decision:
  gate: G1
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: product manager
  accepted_at: 2026-09-08
  changed_during_refinement: none
  refinements: []
---

# Reducing digital onboarding drop-off

New ČSAS retail clients abandon the current digital onboarding journey before completing Bank Identity
creation, opening a current account, and gaining access to George. This run explores why, so more of them
finish the journey and understand where they stand in it while they do. [rec:R-A1-01]

## The outcome we want

More new retail clients complete digital onboarding and understand their current progress and remaining
steps. Supplied by the requester as an outcome rather than a solution; no restatement was needed.
[rec:R-A1-01]

## Who this is for

New ČSAS retail clients opening their first current account through the current digital onboarding
journey. [rec:R-A1-01]

## Why now

Not supplied. The requester had no stated trigger to give and asked that this be recorded as not known
rather than filled with something plausible. [rec:R-A1-01]

## What success looks like

| Part | Value |
|---|---|
| North star | 85% conversion from completed Bank Identity to an opened product in the online product journey |
| Product goal | Reduce avoidable abandonment in the current digital onboarding journey |
| Metric | End-to-end digital onboarding completion rate, targeted at 30% completion |
| Key result | AI-2 — share of sales and service processes in primary digital channels that are fully straight-through (Strategy Basis §2.7, AI First) |
| Link | Reducing avoidable abandonment in the onboarding journey directly increases the share of this service process that completes straight-through in the primary digital channel, which is what AI-2 measures |

**How the key result was resolved.** The requester's own document named OKR-540, OKR-422 and OKR-505 and
flagged the exact key result as unconfirmed. None of the three resolve against the Strategy Basis. The
agent offered NOM-3, NOM-4 and SHD-3 as nearest candidates; NOM-3 and NOM-4 were withdrawn on review
because that objective is scoped to business and corporate clients, and this run's segment is retail. The
agent then proposed AI-2, stated the mechanism, and the requester confirmed it. [rec:R-A1-01]

Success signal and qualitative signal are not settled — see below.

## What is in scope, and what is not

**Market scope.** Current ČSAS digital onboarding journey for new retail clients opening a current account
and obtaining access to George.

**Scope.** New retail client; current digital onboarding process; current account as the first product;
journey from entry through completed identity, product opening, and George access; existing supported
digital channels.

**Exclusions.** Existing-client access recovery; children, entrepreneurs, corporate clients, and
sanctioned clients; redesign of AML or KYC policy; product acquisition strategy; product pricing,
parameters, or eligibility rules; future EU Identity Wallet route.

**Product boundaries.** Onboarding does not own current-account features, parameters, or pricing; does not
own acquisition or demand generation; does not determine AML or KYC product conditions; the run covers the
current journey, not future-state identity methods. [rec:R-A1-01]

## What we could not establish

- **Success signal** — how the team would know the outcome had happened. Not settled by the requester.
- **Qualitative signal** — what a customer would say differently. Not settled by the requester.
- **Time horizon** — when the outcome is expected to be observable. Not settled by the requester.
- **Background** — why this is being explored now. No stated trigger to give.
- **Related runs** — none known to the requester, so recorded as none rather than unknown. [rec:R-A1-01]

## How this was produced

Stage 1 of the discovery run, by the Product Manager, running the `brief-creation` skill. The requester
supplied a use-case document (`USE_CASE_BRIEF_updated.md`) as brief input; its text is the source for the
topic, outcome, product goal, metric, customer segment, market scope and known boundaries. The key result
and the north-star/metric split were resolved through conversation, as recorded above. The gate for this
stage is `Q1`, checked independently of the producer; it has run and passed. The human decision at `G1` is
still to come.
