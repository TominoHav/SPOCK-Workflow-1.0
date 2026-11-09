---
run_id: 2026-09-savings-goals
artifact_id: A11
ost_role: artifact
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "every compliance touchpoint is addressed in functionality, not merely listed"
    needs: judge
    reach: artifact
produced_by:
  agent: product-owner
  skill: mvp-expansion
sources: [A10, A9, A8c, A1b]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A11-01]
decision:
  gate: G5b
  by_agent: false
  accepted_by:
    - name: Igor Tadić
      role: Product Lead
  accepted_at: 2026-08-28
  changed_during_refinement: none
  refinements: []
---

# Discovery | Expanded MVP: round-ups into one named goal

**OPT-A is selected.** A client names one goal, and every card payment rounds up to the nearest fifty crowns with the difference moving into it. [rec:R-A11-01]

Ten regulatory sub-domains the screen put in play are bound below to something concrete in this document: eight as requirements, two as open items with an owner.

## What it is

One named savings goal with a target amount, funded by rounding up card payments to the nearest fifty crowns.

The goal sits as an envelope on the client's savings account, which is where every Czech implementation puts it. **The pilot group is retail clients aged 25 to 45 with a current account, an active app and no funded savings product.**

## How it works

The client names the goal and sets a target. Switching the rule on records what they agreed to. From then on each card payment rounds up and the difference moves from the current account into the goal.

The client can see progress, add money by hand, take money back, switch the rule off, or delete the goal, at any time. **The money is theirs throughout and nothing is locked.**

Nothing changes about how any payment works. The round-up is a separate transfer between the client's own places, after the payment has settled.

## What the pilot tests

Whether money the client never decided to move accumulates into something they chose, and whether they leave it there.

Three things get measured: how many clients in the group set a goal, how many still have the rule on after ninety days, and how much has accumulated. **The second is the one that decides**, because a rule switched off in week two says the saving did not stick.

It does not test whether choosing the destination matters, which was OPT-C, or whether a deliberate weekly amount works better, which was OPT-B.

## What it means for the strategy

Money accumulating in a goal here is money not sitting at another bank, which is share of wallet. A saving habit that needs no decision is the thing three clients in the material said they lacked.

**Both links carry `indicative_unverified_strategy`.** The `strategy-basis` body exists and carries bands, but nobody outside this run has confirmed this pilot's link to a key result.

## What has to be handled

**Eight requirements.** In-app text for the rule and the progress display, approved by client communications. A pilot group defined so it can be queried. An EAA accessibility check on the three new screens before launch. A processing record naming the purpose and the basis. The new purpose described in the app and the privacy notice. A record of what the client agreed to when switching the rule on. Deletion of a goal returning the money. Switching the rule off at any time.

**Two open items, both with the data protection officer and both before launch.** Whether the pilot needs an impact assessment. And what to do about the goal name, which is free text a client can put health or other special-category data into.

**The goal-name question is the one that changes the build.** Constraining the field is a requirement; accepting it is a risk acceptance. The two produce different documents at stage 6.

## What the requirement stage needs

Final wording for the in-app text and the progress display. The pilot group defined so it can be queried in the data. The behaviour when a round-up would take the balance below zero. What happens to accumulated money when a goal is deleted.

And a decision on the two open items. **Requirements can be written without them; the pilot cannot launch without them.**

## What we could not establish

How many clients in the pilot group pay by card often enough for fifty-crown round-ups to accumulate anything meaningful. Air Bank publishes roughly 3,600 CZK a year at two card payments a day, on ten-crown rounding. Nobody supplied the equivalent for this group.

Whether fifty crowns is right. Air Bank rounds to ten and the UK banks to one pound, and fifty is a choice this document made.

## How this was produced

Step 5.2, `mvp-expansion`, agent `product-owner`. Expands one option from A10, not all three.

The ten regulatory sub-domains are inherited from the option screen for I1 in A8c and none was re-derived. Each carries an area, a sub-domain and a trigger from the card rather than free prose.
