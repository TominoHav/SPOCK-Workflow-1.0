---
run_id: 2026-06-instant-payment-disputes
artifact_id: A4
ost_role: opportunity
status: accepted
workflow: problems
modified_by: agent
revisions: 0
sources: [A3]
external_sources: []
produced_by:
  agent: hypothesis-designer
  skill: prioritisation
could_not_verify: []
decision:
  gate: G2
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: product_owner
  accepted_at: 2026-08-22
  changed_during_refinement: none
  refinements: []
  selection: [H2, H1, H4]
  note: "Accepted in every placement, including H1 in the primary set on a weak tag. The proposal argued that the brief's own product goal names the thing H1 says a client cannot do, so fit to the requirement outranks resting on one origin, and the product owner accepted that reading rather than the tag."
assembled_at: 2026-08-22
assembled_from: [R-A4-01]
---

# Problems | Prioritised problems

Three problems sit at the core of what the brief asks for: the delay from a client's first contact to the recall going out, the absence of an in-app route to start that process, and the two questions no one in the bank can answer while the client waits. H2, H1 and H4 are placed primary because each maps directly to one of those three. H5, H7 and H6 follow as secondary, ordered by how directly each bears on what the brief measures. H3 is parked: the desk operator confirmed it in person, but removing the person from the despatch path removes the queue from the problem. [rec:R-A4-01]

---

## What we are solving first

The initiative's metric, its stated product goal and its second outcome clause each name a different problem. H2, H1 and H4 are placed primary because each maps to one of them.

**H2: The path from a client's call to a recall being sent takes two hours at minimum on a weekday.** Trust: `strong`.

Placed first. The brief's metric is median minutes from the client raising the case to the recall being despatched. H2 is the only hypothesis that names and quantifies the thing the metric measures. Two first-hand witnesses describe the handoff from both sides: the contact centre agent who fills the form and cannot send the recall, and the desk operator who works cases in arrival order and has sent requests four days after payment knowing nothing remained. The aggregated report is the third origin. This is the problem the brief was written to close.

**H1: No way to start a recovery attempt from the app.** Trust: `weak`.

Placed second. The brief's product goal is that a client can start a recall attempt in the app in the minutes after sending, and the success signal is that the client opens the app rather than reaching for the phone. H1 is the current state that the product goal is designed to replace. The trust tag is weak: one witness, the client who acted within two minutes of recognising fraud, with no second independent origin in the qualifying set. A note referencing competitor banks with in-app recall was reduced to this hypothesis but its origin is unestablished and contributes nothing to the count. The evidence is thin; the fit to the brief's stated requirement is not.

**H4: Neither the contact centre nor the branch can answer the two questions clients always ask.** Trust: `strong`.

Placed third. The brief's outcome is that a client knows in the same session whether the money is coming back. H4 is why that is not possible in the current process: neither the contact centre agent nor the branch adviser can confirm whether the recall has gone out or whether recovery is still possible at the moment of speaking. Four independent origins support this, three of them first-hand. It has the most witnesses of any hypothesis in this set.

---

## What comes after

H5, H7 and H6 support the primary problems without driving the metric directly.

**H5: The contact centre is unreachable for the thirty-eight per cent of cases that arrive outside weekday hours.** Trust: `strong`.

Placed fourth. A fix for H1 and H2 that is available only on weekdays leaves 38 per cent of affected clients with nothing to act on at the moment they need it most. The evidence: the client's own account of calling at 19:40 on a Friday and reaching a recorded message saying the payments team operates weekdays only, plus the figure from the twelve-month report. Two independent origins; the report is what makes the second origin available. Without it, H5 would be weak. The ordering should be read with that in mind.

**H7: A client receives no information during the nine days between filing and hearing the outcome.** Trust: `strong`.

Placed fifth. H7 is what the current wait looks like from the client's side: a form sent by email, then nine days of silence, then a letter saying the receiving bank declined and not saying when the request had been sent. Three independent origins: the client first-hand, a branch adviser relaying a different client's account, and the nine-day median from the aggregated report. One first-hand witness in the qualifying set. Addressing H2 shortens the wait; H7 names what fills it.

**H6: The time from a client's first contact to a recall being sent has never been measured.** Trust: `strong`.

Placed sixth. The bank cannot know whether the delay costs recovery because it has never measured the delay. Two first-hand witnesses confirm this: the contact centre agent keeping a personal notebook because no system tracks outcomes at the case level, and the desk operator who confirmed the form carries no timestamp for when the client first called. The aggregated report confirms both fields were requested from the source system and neither exists. H6 is placed last in secondary because it is a prerequisite for knowing whether the initiative worked, not a problem the initiative directly solves.

---

## What we are not solving now

**H3: Fraud recall cases wait in the same queue as all other investigation types.** Trust: `weak`.

Parked. The desk operator confirmed this in person: fraud recalls with a time constraint are worked in the same queue as all other investigation types, in arrival order. One first-hand witness; no second origin. The trust tag is weak for the same reason H1's is - a single origin, however direct and first-hand, does not reach the two-origin threshold.

H3 is parked not primarily for the trust tag but for a structural reason. If the initiative removes the person from the raise-and-despatch path, there is no queue to order. H3 is a sub-problem of H2, and it dissolves if H2 is solved. It is retained in full. The observation and the tag carry into any follow-on run at no additional cost.

---

## How we decided the order

The brief states one metric - median minutes from the client raising the case to the recall being despatched - and one product goal: a client starts a recall attempt in the app without a person picking the case up first. The outcome adds a second requirement: the client knows in the same session whether the money is coming back.

Five of the seven hypotheses carry a strong trust tag; two carry weak. The five that are strong all reach that tag partly through the same origin: the twelve-month contact centre payments queue report, which is aggregated across 4,830 cases. The report is a genuine second origin for each, but it is an aggregated one - a count of events, not a witness to any of them. The trust tags do not separate those five as much as their spread suggests.

Among the five strong hypotheses, the witness counts differ. H4 has three first-hand witnesses from four origins; it is the most independently attested problem in the set. H2 and H6 each have two first-hand witnesses plus the report. H7 has one first-hand witness plus one relayed account plus the report. H5 has one first-hand witness plus the report: of the five, H5 is the one most dependent on the report as its second origin. A reviewer who doubted the report's completeness would find H5 falling to weak while H2, H4, H6 and H7 remained strong.

The two weak hypotheses - H1 and H3 - each rest on one first-hand witness and no second origin. They are weak for the same reason. H1 is placed in primary despite the weak tag because the brief's stated product goal requires exactly what H1 says is absent. H3 is parked because it is a sub-problem that the proposed solution to H2 dissolves.

Ordering within the primary and secondary groups follows the brief's requirements in sequence: the metric first (H2), the product goal second (H1), the outcome's second clause third (H4), out-of-hours access fourth (H5), the client's communication experience during the wait fifth (H7), measurement sixth (H6).

This is a proposal. No placement is decided until G2.

---

## What we could not establish

**Whether the delay costs recovery.** The contact centre agent's observation that cases raised in the same hour are the ones where funds come back is the clearest signal in the record that time-to-recall affects outcome. He stated it without a number and confirmed the team has never been shown one. The eleven per cent recovery rate in the report carries no breakdown by time elapsed before the recall was sent. The premise the initiative rests on is not established in this material.

**What any of this costs to build.** No Banking Constraints body exists for this run. None of the placements is weighed for feasibility and the ordering rests on brief fit and evidence alone.

---

## How this was produced

Seven hypotheses authored in stage 2.2 are placed into one of three lists: primary, secondary and parked. Every hypothesis lands in exactly one list; none is dropped.

The placements above are a proposal from the prioritisation skill. No placement is decided until the decision gate, where the Researcher reviews the evidence and the Product Owner governs the scope. The two review different things about the same list.

The rules no check decided for this skill: `could_not_verify: []`. Nothing to carry.

Assembled from one record:

- **R-A4-01**: records/2-problems/A4-r01-prioritisation.record.md

The material is fabricated. Every person, figure and quotation in A2 was written on 22 August 2026 to exercise this workflow. The trust arithmetic, the hypotheses and these placements were derived from those twenty-eight observations exactly as they would be from real material.
