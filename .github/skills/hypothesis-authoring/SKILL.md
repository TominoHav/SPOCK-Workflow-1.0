---
name: hypothesis-authoring
description: >
  Restate intake observations as standardized problem hypotheses, attach their evidence, and derive a
  trust tag for each. Never reads raw material. Trigger phrases: author hypotheses, problem
  hypotheses, trust tag, evidence, restate problems, stage 2 authoring.
---
# hypothesis-authoring

**Stage 2.2** · Agent `hypothesis-designer` · Pattern `single-shot` · Feeds **Q2**

## Contract

- **Inputs:** `{runs_root}/{run_id}/2-problems/2-intake-record.md` · `.github/know-how/method/evidence-standards.md` · `.github/know-how/writing/agent-interaction.md` · `.github/know-how/writing/output-voice.md` · `.github/know-how/writing/documentation-standards.md` · `.github/know-how/method/method-canon.md` *(§4.2 is what this stage is for, §10 where opportunities come from)*
- **Output:** `{runs_root}/{run_id}/2-problems/3-problem-hypotheses.md`
- **Record:** `{runs_root}/{run_id}/records/2-problems/` — **the output above is assembled from a record and does not stand alone.** Read [`.github/instructions/record-and-output.instructions.md`](../../instructions/record-and-output.instructions.md) before writing either: the fields a gate decides sit on the record, and an output carrying a production field is refused (C107, C108, C109). **The workflow writes the frames of the output and its record. Fill the record first; the document's frame follows with a section per hypothesis once the record names them, and a hypothesis you add after that gets its section from you.** Fill each `[[fill: …]]`; on a run started before 1.16.1 both frames come at once. **The envelope around them is not yours, and there is no task to run for it**: what is fixed comes with the frame, the checks read the rest as the workflow computes it, and the workflow writes that into the document when the person approves. On a run started before 1.16.1, `SPOCK: check what is written, then continue`, which you run after every document, fills it first.
- **Exclusions:** **never reads `2-problems/1-problem-material.md`** · never asserts a trust tag · never drops a hypothesis for its tag

## You do not read the raw material

You are given `A2b`. That is the quarantine boundary, and it is structural — not a rule you are asked to
follow. Evidence references still resolve into A2, through the `ref` each observation carries.

## Procedure

**1 — Restate each observation as a hypothesis**, one sentence, stating the problem.

**1a — Test the shape before anything else, and a problem never names a thing to build.**

The test is one question: **could more than one thing address this?** If only one could, the statement has
already chosen, and what it chose is the thing it names. *Advisers would use a self-service tool* presumes
the tool. *A buyer cannot get a figure without a full submission* admits a calculator, a pre-check, a
different assessment order, or a conversation.

A solution-shaped candidate takes **one of three outcomes**, and the middle one is the one two authors of
the same material most often miss. **The Evidence Standards §5.3 own this table; it is reproduced here and
that body wins on any difference:**

| | When | What you write |
|---|---|---|
| **Reduce into a new hypothesis** | An observation **reports the need beneath it**, and **no hypothesis in the set already states it** | The new hypothesis states the need and carries the original wording in `reduced_from` |
| **Record on the hypothesis that already states it** | An observation reports the need and **a hypothesis in the set already states it** | `reduced_from` goes on **that** hypothesis. No second hypothesis is created, and `rejected[]` stays empty |
| **Reject** | **No observation anywhere in the record reports a need beneath it** | It goes in `rejected[]` with the reason. **It is not a problem**, and it does not enter `hypotheses[]` |

> **Reject means the need has no observation at all. It never means the need is already stated.** That
> reading collapses row 2 into row 3, and it is not hypothetical: two separate measurements had a trial
> take it, rejecting a candidate whose need two hypotheses were already resting on. **Rows 2 and 3 divide
> on whether an observation reports the need, and on nothing else.**

**The test for *already states it* is the reference set, not the wording.** If every observation that would
support the reduced hypothesis is already attached to another hypothesis, the need is already in the set.
**A new hypothesis earns its place by bringing at least one observation the set does not already rest on.**

**Reduce from the observations, never from your own reasoning.** The need beneath *advisers would use a
tool* might be that advisers cannot answer a client without leaving the conversation — and if no
observation says that, **you have invented it**. That is the failure this whole workflow exists to stop,
and it is more dangerous here than anywhere else because a reduced statement reads as evidenced.

**Shape and evidence are different questions.** A problem-shaped statement with no evidence is a problem
and rates `unrated`. A solution-shaped statement with excellent evidence is still not a problem.
**`rejected[]` carries no trust tag**, because there is nothing to tag.

**Nothing is deleted.** A rejected candidate stays visible with its reason, and a person can disagree
with you at G2.

**2 — Attach evidence.** Each hypothesis carries the observations supporting it, **by their `id` where
the intake gave them one and by the item's `ref` where it did not.**

- **Prefer the id, always.** It names the observation the hypothesis rests on. The item's ref names the
  interview it came out of, and where that interview yielded six observations the ref cites all six: the
  trust arithmetic then grades this hypothesis on observations it never claimed, and C69 cannot tell two
  hypotheses drawn from one interview apart. **A run failed Q2 on exactly that**, for
  citing an item when it rested on one line of it.

- **A reference that only restates the hypothesis is not evidence for it.** The user's own assertion *is* the hypothesis
- The test is whether an **observation** is present, not whether a conclusion is absent

**3 — Compute the trust tag.** Do not write one directly. The arithmetic:

- Take the **qualifying set** — references whose `provenance_complete` is true
- Count **distinct origins** in it. The origin is the party the claim comes from, not the container

| Tag | Condition |
|---|---|
| `strong` | qualifying set holds **2+ independent origins**, **and at least one of its observations is `first_hand`** |
| `weak` | at least one reference exists, and the qualifying set **fails either condition** |
| `unrated` | **no references at all** |

**Write the route beside the tag, in these words** (`evidence-standards` §5.1b). `weak` does three
different jobs and a reader cannot tell them apart from the word alone:

| the arithmetic that produced it | what you write |
|---|---|
| one origin, an observation somebody witnessed | **`weak` · one origin, first-hand**, then who, and that nothing repeats it |
| one origin, everything aggregated | **`weak` · one origin, aggregated**, then that it is the widest claim in the set and the least witnessed |
| references exist and none of them qualifies | **`weak` · nothing qualified**, then that the qualifying set is empty rather than small |

**The third is not a thinner version of the first.** One says a person said this once; the other says
nobody who counts said it at all.

**Name the item a claim rests on in the sentence, not the record.** *Ticket CC-51204 of 3 August*, not an
internal reference a reader cannot follow. **And a missing number is a named ask in the same sentence**:
*No count was recorded. The reporting job behind the July operations note holds that population.* Never
*no exact count available*, which four producers wrote on one run against a rule that already forbade it.

**Both conditions, never just the origin count.** Two origins independently relaying what other people told
them is real signal and is kept, but nobody in that set saw it, and `strong` is the tag that sends a team
off to spend a stage solving something. **The witness test reads the observations in the qualifying set,
not its origins** — one first-hand observation is the bar, and it need not come from the origin that
supplied the others. A reference with no `proximity` can never be the witness.

**Incomplete provenance removes a reference from the count; it does not cap the hypothesis.** Three
origins where one lacks a date rates `strong` on the two that are complete. A rule that penalised extra
material would teach authors to attach less.

**4 — Record the rationale** for every tag: the origin count, **the proximity mix**, and what fell out of
the qualifying set and why, and, where a hypothesis rests on one origin, whose account it is.

> **Worked examples, §5.1c of the Evidence Standards.** A claim citing the document's own production
> record, beside one citing the supplied item with the person and the date on it. And a `weak` tag doing
> three different jobs, beside two entries that say which route each took. **One needs a second source. The
> other needs its first.**

**4b — Where your evidence contradicts an earlier document of this stage, record it.** In one run the intake
said *six people described not checking who a payment was going to*; weighing the evidence, the hypothesis step
found four observations. The intake had passed its checks, which read its shape and never whether a count is true.
The record carries it:

```yaml
contradictions:
  - id: K1
    document: A2b
    claim: "Šest lidí popsalo, že nekontrolují, komu platba odchází"
    evidence: "O3, O7, O9 and O12 say it; no other observation does, so the material holds four"
    resolution: open
```

Then tell the person what the document says, what the observations show, and that stage 2 waits on their
decision: the claim corrected, or kept with their reason. Where they say correct it, correct that document and
write `resolution: corrected`; the gate then confirms the quoted words are gone.

**5 — Write the artifact, then stop.** State what you produced and anything you could not resolve.

**When material is added during the stage, the set grows and nothing is renumbered.** A new observation is
evidence on the hypothesis that already states its need, which keeps its id and has its trust tag recomputed,
or it starts a new hypothesis, numbered on from the highest id in the set. **Never renumber a hypothesis**: the
framed opportunities and the prioritised lists name each one by its id.

> **You do not run the quality gate.** Blueprint §5.3 requires the checker to be independent of the producer — *"a verifier that cannot block is not a control"*, and one that the producer operates is not independent. You may trigger it with `SPOCK: check what is written, then continue`, and triggering it is not running it: you relay what it wrote. **Never report a gate result for your own output.**

## Worked boundaries

| Situation | Tag | Because |
|---|---|---|
| Four quotes, one participant, all complete | `weak` | One origin. Volume is not corroboration |
| Two participants, same session, both complete | `strong` | The participant is the origin, not the session — and each is `first_hand` on their own experience |
| Three origins, one missing its date | `strong` | The qualifying set still holds two, and at least one saw it |
| Two origins, both missing dates | `weak` | Qualifying set empty; references exist |
| A deck citing a survey, plus that survey | `weak` | One origin — the survey |
| User typed the problem, cited nothing else | `unrated` | A restatement is not evidence for itself |
| **Two advisers, two unnamed clients, both complete** | **`weak`** | **Two independent origins, but both `relayed` — nobody in the set saw it.** The evidence is kept and the rationale says why |
| **A funnel deck and a survey summary, both complete, different bodies** | **`weak`** | Two independent origins, both `aggregated`. A count of events is not a witness to one |
| **One participant on their own case, plus one adviser relaying a client** | **`strong`** | Two origins, and the participant is `first_hand`. One witness in the set is the bar |
| **Two relayed origins complete, plus an undated `first_hand` observation** | **`weak`** | The witness test reads the **qualifying set**. An incomplete reference supplies neither an origin nor a witness |
| One SME client's own account of a loan refused without explanation, and nothing else in the material about SME clients | `weak` · one origin, first-hand | **The statement says what the material shows**: *One SME client describes stress after a loan refused without explanation*, not *SME clients are stressed when…*. The rationale names the client and says nothing repeats it. A wider claim waits for a second origin |
| An observation that speaks of an offer the material does not show the bank has | as its evidence rates | **State the need the observation reports**, not the offer: *Clients want part of their income set aside on arrival*, not *Clients do not use the income-routing offer*. Where the material does not say the bank has the offer, the rationale says so, so the person is never asked to size something that does not exist |

## Gates and obligations

- Feeds **Q2** — `C1` every hypothesis has ≥1 reference or is `unrated` · `C2` no reference resolves outside A2 · `C35` every reference resolves through an intake observation · `C52` the trust tag is recomputed from the arithmetic at the gate and refused where it was asserted · `C27` no hypothesis is dropped for its tag
- **No evidence means `unrated`, not exclusion.** Keep it, label it

## Bounds

| Bound | Value | On reaching it |
|---|---|---|
| Hypotheses emitted | **20** | Say what you did not restate. Beyond 20 the set stops being reviewable |

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
