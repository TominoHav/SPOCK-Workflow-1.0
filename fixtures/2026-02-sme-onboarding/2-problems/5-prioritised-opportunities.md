---
run_id: 2026-02-sme-onboarding
artifact_id: A4
ost_role: opportunity
status: accepted
workflow: problems
modified_by: human
revisions: 0
external_sources: []
sources:
  - A3
produced_by:
  agent: hypothesis-designer
  skill: prioritisation
# Problems | Prioritised Problem Set
could_not_verify: []
decision:
  gate: G2
  by_agent: false
  accepted_by:
    - name: Petr Havel
      role: researcher
    - name: Martina Kolářová
      role: product_owner
  accepted_at: 2026-08-03
  changed_during_refinement: none
  refinements: []
  note: The Researcher confirmed the evidence and the Product Owner set the scope. The proposed ordering was confirmed unchanged, so no list was altered after the proposal. H6 and H7 are parked and retained, not discarded
assembled_at: 2026-08-20
assembled_from: [R-A4-01]
---

# Prioritised problem set — SME onboarding fix

Seven hypotheses, each placed exactly once. Every entry is its A3 hypothesis unchanged — same statement,
same evidence, same trust tag. Nothing was re-tagged here, and prioritisation is not a route to change a
tag.

| | Statement | Trust | List |
|---|---|---|---|
| **H1** | The document upload step neither completes nor reports a failure, so an applicant cannot tell whether the upload has been accepted | `strong` | primary |
| **H2** | SME applicants who are blocked at the document upload step leave the application without completing it, and do not return to it | `strong` | primary |
| **H3** | Applicants who hold the correct documents are still unable to get through the document upload step | `weak` | secondary |
| **H4** | The failure at the document upload step recurs on a repeat attempt and on a different device, so it is not resolved by the applicant trying again | `weak` | secondary |
| **H5** | Applicants who stall at the bank onboarding open the account with a fintech provider instead, where the same task takes about ten minutes on a phone | `weak` | secondary |
| **H6** | Drop-off in SME onboarding concentrates between identity verification and first funding, with the largest single gap at document submission | `weak` | parked |
| **H7** | Applicants abandon the application because the document upload step times out | `unrated` | parked |


**Assembled from one record**, which carries the fields a gate decides: [rec:R-A4-01].
## The ordering was a proposal, and the reasoning behind it

**H1 and H2 primary.** They are the only two hypotheses with two independent origins, and they are the two
the run's outcome is about — the fault at the upload step, and the applicant lost because of it. Between
them they cover what the material actually reports, first-hand, from both sides of the counter.

**H3, H4 and H5 secondary.** Each is real, each rests on a single origin, and each narrows the problem in a
way the primaries do not. H3 rules out document readiness as the explanation — the client held the correct
papers. H4 says the failure survives a retry and a change of device, so it is not the applicant's browser.
H5 is the cost of the failure, and it sits inside the brief's `market_scope`, which puts fintech business
accounts in scope. They are promoted at their true weight rather than on the strength of a good story.

**H6 parked.** It is the only statement about scale and it has an empty qualifying set — no production
date, no underlying source, no figures. It also reaches wider than the run, from identity verification to
first funding, and A1 records that the product owner deliberately bounded this run to the upload step. One
field would change the first objection; the second is a scope decision, not an evidence one.

**H7 parked, and this is the consequential one.** H7 is the product owner's stated cause and the premise
the brief was written on. It is `unrated` — the claim restates itself, and the timeout logs that would make
it testable were named in A1 `external_sources[]` and never supplied as material. Promoting an unevidenced
causal claim would have made the run about a belief; parking it keeps the belief visible and testable
instead. **H1 covers the same ground with evidence behind it**, stating what was observed at that step
rather than why.

## The decision

**Confirmed as proposed, by two reviewers judging different things.**

| Reviewer | Governs | Recorded |
|---|---|---|
| **Petr Havel**, Researcher | the evidence | Confirmed the hypotheses are well formed and correctly evidenced |
| **Martina Kolářová**, Product Owner | the scope | Confirmed which problems this run pursues |

Neither overrules the other, and no list was altered after the proposal, so `revisions` stays at 0. The
record carries `by_agent: false` — C14 — because no agent promoted anything here. The proposal was the
agent's; the promotion was theirs.

`modified_by` was `agent` when this artifact was written: the decision was recorded by the skill from what
the reviewers decided, and no person had edited the file directly. It says `human` now, because the direct
edit this paragraph anticipated has since happened — see the marked edit at the foot of this file.

## Parked is retained, and there is a route back

`parked[]` is never emptied — C29. Both entries keep their statement, their evidence and their tag, and
both have a stated route back into scope:

- **H7** revives the moment the engineering timeout logs are supplied as A2 material and pass through
  `material-intake`. That is the only route — the brief is not an evidence route, and C35 is what enforces
  it.
- **H6** needs one field. A production date for the deck puts A2-item-5 into the qualifying set. Its
  underlying source and figures would do more.

They are also the cheapest input the next run on this topic will have — already stated, already evidenced
as far as the material allows, already tagged.

## What is carried, unresolved

The judgement that would change this list is whether the adviser's unnamed client is participant P1. Under
evidence-standards §4.1 the ticket's origin is the reporter, so the count is two and H1 and H2 are
`strong`. Resolved the other way, both become `weak` and the case for promoting them rests on relevance
rather than corroboration. It is recorded rather than closed.

## What this artifact does not do

No gate result is reported. Q2 is checked independently of this skill, and a producer that certifies its
own work is self-assessed rather than verified. This artifact is written, and it stops.

---

## Marked human edits — two, and the account is in `notes/`

**Not agent output.** Two edits were made to this artifact by a person: *decision record brought to the one form* (6 August 2026) · *the quality gate's date corrected* (10 August 2026). **What changed and why is in [notes/marked-edits.md](../notes/marked-edits.md)**, which no gate reads.
