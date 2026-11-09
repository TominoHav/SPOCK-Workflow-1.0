---
run_id: 2026-09-savings-goals
artifact_id: A3
ost_role: opportunity
status: accepted
workflow: problems
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "never reads A2 raw material, only the A2b intake record"
    needs: judge
    reach: process
  - rule: "no hypothesis names a thing to build; a solution-shaped candidate is reduced to the need beneath it or recorded as not a problem"
    needs: judge
    reach: content
produced_by:
  agent: hypothesis-designer
  skill: hypothesis-authoring
sources: [A2b]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A3-01]
---

# Discovery | Problem hypotheses: goal-based saving

Five hypotheses from eleven observations. **Two are strong and three are weak**, and the tag is arithmetic on the evidence rather than a judgement about how convincing the sentence reads. [rec:R-A3-01]

No hypothesis names a thing to build. One candidate was reduced to the need underneath it and is recorded below.

## What the material says

**The same absence appears in three different accounts.** One client never decides to save, one cannot tell committed money from spare money in a single balance, and one saves successfully only where the deciding was removed.

**Two clients argued against a savings account rather than for one.** That is not a feature request and it is the finding with two independent origins behind it.

## Where it came from

Eleven observations from four origins: three retail clients interviewed on 26 and 27 August, and a note from the savings team.

Nine observations are first-hand and fully provenanced. Two come from the note, are relayed, and carry no number.

## H1: There is no moment at which the client decides to save

**Strong.** Three observations, two origins, first-hand. One client opened a savings account, deposited once and never came back, and named the obstacle as the absence of a decision rather than unwillingness. Another saves only where the decision was taken out of her hands.

Disconfirming: a client who saves regularly by deciding each time, with no automation.

## H2: Committed money and spare money look the same in one balance

**Weak.** Two observations, both first-hand and both from one person. He described the balance as one number in which the committed part does not feel committed, and asked for labelling rather than locking.

**One origin is what makes this weak, not the quality of what he said.** The observations are specific and the sentence is clear; nobody else in the material says it.

Disconfirming: a client holding one balance who reports no difficulty knowing what is spare.

## H3: The product meant to help is itself a reason not to

**Strong.** Two observations, two origins, first-hand. One client described a second account as another account, another statement and money moving back and forth. Another keeps salary, mortgage and daily banking here and saves at a different bank.

Disconfirming: clients who open a savings account and fund it regularly.

## H4: An account opened at the bank's prompting receives one deposit

**Weak.** One first-hand case and one relayed report that carries no number and says so. The client's account was opened during a mortgage quote and holds 800 CZK.

Disconfirming: the number the savings team has not pulled, which would settle it either way.

## H5: A client saving automatically does not track the balance

**Weak.** One observation, one origin, first-hand. She checks every few months and describes the surprise as the pleasant part.

Disconfirming: clients who abandon automated saving because they lost track of it.

## What we could not establish

**A candidate was reduced rather than carried.** "Clients need round-ups" appeared directly in the material as something that works. It names a thing to build, so it is not a hypothesis; the need underneath it is H1, and round-ups are one answer to it among several.

Whether the savings team's pattern holds at the size the note implies. The note itself says nobody pulled the number.

## How this was produced

Step 2.2, `hypothesis-authoring`, agent `hypothesis-designer`. **This step never reads the raw material**, only the intake record, which is why the quarantine boundary is worth having.

Every trust tag is derived from the observations cited: two or more origins with at least one first-hand reading gives strong, and anything less gives weak. Two hypotheses moved when the arithmetic was run against what had been written.
