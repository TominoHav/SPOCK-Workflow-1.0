---
name: initiative-propagation
description: >
  Push the completed initiative document to Jira where a connection exists. The one skill permitted to
  fail without failing the run. Trigger phrases: propagate initiative, push to Jira, create Jira
  initiative, stage 7.2.
---
# initiative-propagation

**Stage 7.2** · Agent `business-analyst` · Pattern `best-effort-propagation` · Capability `[jira_write]`

## Contract

- **Inputs:** `{runs_root}/{run_id}/7-initiative/initiative.md` · `.github/know-how/writing/agent-interaction.md` · `.github/know-how/method/method-canon.md` *(§4.7 is what this stage is for)*
- **Output:** `{runs_root}/{run_id}/7-initiative/jira-initiative.md` — the propagation record
- **Exclusions:** never invents an identifier · never edits A14 · never blocks the run
- **When:** after stage 7 is accepted, never before. **While the Jira host is not named, it does not run at all**: the run completes on the initiative document without it, and nothing waits on it

## You are allowed to give up

**This is the only skill in the workflow permitted to fail without failing the run.**

**A14 is complete independently of A15** — `C16` checks exactly that. The run finishes on the initiative
document. Propagation is a convenience that saves someone re-typing it, not a step the discovery depends
on.

So: if the connection is absent, the credentials are missing, the host is unreachable, or the identifier
does not resolve — **record the failure and stop.** Do not retry indefinitely, do not fall back to a
different host, and do not report the run as incomplete.

## Blocked, and not on effort

**The authoritative Jira host is not decided (D11).** The ČS instruction file names
`csas.atlassian.net`; a real artifact in the other repository extract uses `jira.csin.cz`. Two sources,
two answers, and **it is not ours to infer.**

Under deny-by-default egress this binding **cannot declare an allow list until the host is named**, so it
cannot run at all rather than merely failing. **Say so and stop** if invoked before that is settled.

## Procedure, once unblocked

**1 — Read A14 and take its `id` and `jiraLink`.** They must already agree; if they do not, that is an
A14 defect and you return it rather than fixing it.

**2 — Propagate.** Create or update the initiative at the named host.

**3 — Record the outcome** in A15: the identifier, the host, the timestamp, and whether it succeeded.

**4 — On failure, record the failure** with its reason, and say the run is complete regardless.

## Bounds

**Max 2 propagation retries**, then stop and record. An unreachable host does not become reachable by
asking a third time.

> **You do not run the quality gate.** Q7 is checked independently of you. You may trigger it with
> `SPOCK: check what is written, then continue`, and triggering it is not running it: you relay what it wrote.

## Gates and obligations

- **Q7** — `C16` the initiative document is complete on its own, independently of whether the Jira item
  exists. The run completes on `A14`.
- **`C57`** — **egress is deny-by-default, and with no named host there is no allow list, so this binding
  does not run at all.** It is not a warning: an artifact produced by a parked binding fails the check,
  because a binding with no approved destination reaching outward is the one thing deny-by-default exists
  to prevent.

## Carry what you could not verify

**Your artifact carries a `could_not_verify` field and you do not write it.** The workflow computes it from the
quality rules bound to your skill, using the same function the check recomputes it with, so a copied list cannot
drift from the one it is compared against. The frame carries it where the workflow wrote one, the checks read it as
computed, and the approval writes it; on a run started before 1.16.1, `SPOCK: check what is written, then continue`
fills it.
[`.github/could-not-verify.yaml`](../../could-not-verify.yaml) is still the readable statement of what
yours holds, and reading it tells you what the person at the gate will see. **Copying it into the front
matter costs more than it saves**: a producer that got one line of it wrong spent
longer finding out than writing the document.

**It is not your assessment of your own output.** It is the list of quality rules bound to you that no
check decides, so the person at the decision gate sees them on the document they are deciding on rather
than on a record they would have to know to go and look for. **C65 recomputes it at the gate** and refuses
an artifact whose list disagrees with the gate model.

**Do not write this list from memory and do not edit the carrier.** It is derived: a rule moving from
*needs a check* to *decided by a check* changes it, and a copy kept by hand in sixteen files goes wrong
silently and in the direction that reads as complete. C72 refuses the carrier when it drifts.

## The field names of what you write

**Your artifact's field set is declared in §6 of the parent and generated into
[`.github/artifact-fields.yaml`](../../artifact-fields.yaml). Use those names and no others.**

**Do not invent a field name that reads reasonably.** The shapes an agent infers are reasonable, and that
is the failure: the first agent-driven hypothesis set wrote `evidence` as a list of objects copying the
upstream record rather than a list of refs, `trust_rationale` where §6 says `rationale`, and `original`
where the rejection schema says `statement`. **Four checks failed and the worst of them reported the
artifact claiming a trust tag the arithmetic did not derive** — which reads as an agent inflating a tag and
was nothing of the kind. With evidence carried as objects nothing matches an observation, so the qualifying
set is empty and everything derives `weak`. The reasoning had been right throughout.

**Every artifact carries the envelope as well as its own set.** Where §6 delegates a set to a body of
know-how, that body is the source. C73 refuses the carrier when it drifts from §6.

**The carrier's entry for your artifact has a `gate:` line. It tells you which gate reviews what you
wrote; it is not a field you write.** Where it names a `G` gate, your artifact carries the decision
record too — under `decision:` on the artifact itself, in §7.5's names. `accepted_by` and `accepted_at`, never
`decided_by` or `decided_at`. **You decide nothing:** `by_agent` is always `false` and you write only the
decision a named human actually made.

**Until that decision exists, you omit the block entirely.** An artifact you have just
produced has not been to its gate, so there is no decision to record — and a stub carrying only the gate
name is a decision record with nobody in it, which **C40 refuses**. Write `decision:` when the decision
has been taken and not one moment earlier.

**A field listed under `value_entries` carries single values, not objects.** Write the id the §6 line
names and stop. Copying the upstream object in there is what failed six checks on the first agent-written
A4 — `primary` filled with whole hypotheses where it wanted `H2`.
