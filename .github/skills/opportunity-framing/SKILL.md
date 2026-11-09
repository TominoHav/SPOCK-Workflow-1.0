---
name: opportunity-framing
description: >
  Frame every problem hypothesis as an opportunity on ČS's eleven-section template, asking the user for
  the three answers no material can supply and marking the rest. Trigger phrases: frame the
  opportunities, stage 2.3, opportunity framing, size the opportunities, opportunity outcome.
---
# opportunity-framing

**Stage 2.3** · Agent `hypothesis-designer` · Pattern `elicitation-dialogue` · Gates **Q2** then **G2**, and G2 is recorded on the prioritised opportunities, not on this artifact

## Contract

- **Inputs:** `{runs_root}/{run_id}/2-problems/3-problem-hypotheses.md` · `{runs_root}/{run_id}/1-brief/initiative-brief.md` · user dialogue · `.github/know-how/method/opportunity-framing.md` · `.github/know-how/writing/agent-interaction.md` · `.github/know-how/writing/input-elicitation.md` *(what to ask and how to tell a good answer from a thin one; `agent-interaction` owns the manner, this owns the substance)* · `.github/know-how/writing/output-voice.md` · `.github/know-how/writing/documentation-standards.md` · `.github/know-how/method/method-canon.md` *(§4.2 is what this stage is for, §11 structuring the opportunity space)*
- **Output:** `{runs_root}/{run_id}/2-problems/4-framed-opportunities.md`
- **Record:** `{runs_root}/{run_id}/records/2-problems/` — **the output above is assembled from a record and does not stand alone.** Read [`.github/instructions/record-and-output.instructions.md`](../../instructions/record-and-output.instructions.md) before writing either: the fields a gate decides sit on the record, and an output carrying a production field is refused (C107, C108, C109). **The workflow writes the frame of the output and its record; fill each `[[fill: …]]`.** **The envelope around them is not yours, and there is no task to run for it**: what is fixed comes with the frame, the checks read the rest as the workflow computes it, and the workflow writes that into the document when the person approves. On a run started before 1.16.1, `SPOCK: check what is written, then continue`, which you run after every document, fills it first.
- **Exclusions:** **never reads `2-problems/1-problem-material.md` or the intake record** · never proposes a solution · never recomputes a trust tag · never supplies an answer the user did not give

## You are one step further out than the quarantine boundary

`hypothesis-authoring` may not read the raw material, only the intake record. **You may not read either.**
You work from A3 and the brief, and nothing else in the run. That is not a convenience: an opportunity is
the last artifact before a person decides what the run pursues, and the further the raw text is from it,
the fewer places an instruction inside somebody's transcript can reach.

Evidence still resolves. Each hypothesis carries its own references, and they resolve back through A2b to
A2 without you opening either.

## Procedure

**1 — One opportunity per hypothesis, and every hypothesis is framed.** Including the ones you expect will
be parked. **The sizing is what the ordering at 2.4 is made on**, so it has to exist before the ordering
runs, and a framed opportunity that gets parked is a better input to the next run than a parked hypothesis.

`from` names the hypothesis. One hypothesis, one opportunity, none added and none dropped — **C115**.

**An opportunity's id is `O` and a number, `O1`, `O2` and on, and not its hypothesis's `H` id**: the opportunity
framed from `H3` may well be `O3`, and `from: H3` is what ties the two. **Its heading in the document is
`## O{n}: <its name> (from H{n})`**, naming the hypothesis its `from` names, and `## O{n}: <its name> (yours)` for an
opportunity a person brought; in a Czech run, `(z H{n})` and `(vaše)`. A person reading the document sees from the
heading what each opportunity rests on. `C115` holds the id and the heading on a run started on build 1.16 or later.

**A hypothesis added during the stage gets its own opportunity, and nothing already framed is renumbered.**
Its section in the document is yours to add: the frame gave one for each hypothesis `A3`'s record named when the
frame was written, and none is added after.
Frame it like the rest, with an id numbered on from the highest in the set, `O` and the next number, and ask the ranking question of step 3
again, as written, over the whole set with the new one in it, so the order covers every opportunity and a late one
is placed by the same question as the others. An opportunity already framed keeps its id, because the prioritised
lists name it by its id; where its hypothesis gained evidence, carry the new trust tag across.

**An opportunity a person brings carries `origin: person` on its entry.** Absent is the ordinary case and means you
framed it from a hypothesis. **You never set it on an opportunity you framed**: it records that a person brought the
opportunity, which is a claim only their having done so makes true. Where no hypothesis covers it, leave `from` out
and write `validation.trust: unknown`. Frame every other section as for any opportunity, name it in the document as
the person's with `(yours)` at the end of its heading, and give it an id numbered on from the highest in the set, `O` and the next number.

**2 — Derive the seven sections the run already answers.** The description and the as-is behaviour from
the hypothesis and its own evidence quotes. The outcome from the brief's `outcome`, narrowed to this one
opportunity. The segment from the brief's `customer_segment`, narrowed. The validation from the
hypothesis's trust tag, its origin count and its disconfirming condition, **carried across and never
recomputed** — framing adds no evidence. Company factors from the brief's `goals[]`, naming the key result.
The metrics from `success_signal`, `goals[].metric`, `qualitative_signal` and `time_horizon`.

**3 — Ask the person for what the material cannot answer, as a ranking over the whole set.** List the
opportunities, one line each, then ask as written below, and in a Czech run as the Czech block under it gives it:

```
To put these opportunities in order I need two answers from you. An order is enough; you do not need figures.

1. Which of them reaches the most customers, and which the fewest? Put them in order, most first. Two you think
are about the same can share a place.
2. Which of them hurts customers most when it happens? Put them in order, worst first.

If you cannot tell them apart, say so, and the order will rest on the evidence behind each one. Where a figure
exists, it usually sits with product analytics or the complaints team.
```

<!-- cs:S2-RANK -->
**In a Czech run:**

```
Abych tyto příležitosti seřadil, potřebuji od vás dvě odpovědi. Stačí pořadí, čísla k tomu nepotřebujete.

1. Která z nich se týká nejvíce klientů a která nejméně? Seřaďte je od té, která se týká nejvíce klientů. Dvě, které považujete za zhruba stejné, mohou sdílet jedno místo.
2. Která z nich klienty nejvíce trápí, když nastane? Seřaďte je od té nejhorší.

Pokud je od sebe nedokážete rozlišit, řekněte to a pořadí se bude opírat o důkazy u každé z nich. Pokud nějaké číslo existuje, obvykle ho má produktová analytika nebo tým, který řeší stížnosti.
```
<!-- /cs:S2-RANK -->

Write each opportunity's place as `sizing.customers.rank` and `sizing.impact.rank`, 1 for the most and the
worst. Where the person gives a figure, the figure goes in that factor's `statement` and the place follows from
it. Where the person cannot rank, write no `rank` and mark the factor `unknown` with their reason.

**Then ask why each problem occurs**, per opportunity where the material does not say, or once where the answer
is the same for the set.

**You never supply one of these.** Marking a field unknown with its reason is a legitimate outcome and it is what
G2 weighs.

**An answer the user gives is an assumption, not evidence.** Root cause carries
`basis: assumption`; customer impact carries `basis: judgement`. Neither inherits the opportunity's trust
tag, for the same reason a solution-shaped candidate asserted at stage 1 is rejected at 2.2: a person's
assertion is the hypothesis rather than evidence for it — **C116**.

**4 — Market factors is deferred, not unknown.** Write `basis: deferred_to_stage_3`. Stage 3 produces
exactly this material and runs after G2, so nobody can answer it here. **`unknown` says nobody knows**,
which is untrue and hides that the answer is coming — **C117**.

**5 — The outcome states a change in behaviour and never a thing to build.** This is the section the whole
step exists for, and it is the same test the hypothesis step applies one stage back: could more than one
thing produce this change? *A banker stops asking a colleague who we know* is an outcome. *A search box
across the business lines* is a solution wearing one's clothes.

**Nothing before this required a problem to connect to what the run is for.** A hypothesis could be well
evidenced, correctly tagged, promoted at G2 and have no stated path to the brief's outcome. This field is
that path, and no check can decide it: whether a sentence names a thing to build is a reading of the
sentence, so it is declared judged and carried on the artifact for the person at the gate.

**6 — Alternatives stay empty, and the field says why.** Stage 4 produces solution directions and stage 7
links them back. A framing step that proposed one would pre-empt the stage the whole order of this
workflow exists to protect. An absent field and a deliberately empty one read the same to a person and
must not to a check — **C118**.

> **Worked examples, §8b of the framing body.** Four sizing answers repeated word for word on nine of nine
> opportunities, beside a version that states the shared ones once in the opening and says what is different
> about each. And a document that ends at housekeeping, beside one that says what the nine problems add up
> to. **Read both before you write, and the line under each saying what the second version does.**

**7 — Write the artifact, then stop.** State what you produced, which fields went unanswered and why.

> **You do not run the quality gate.** Blueprint §5.3 requires the checker to be independent of the producer — *"a verifier that cannot block is not a control"*, and one that the producer operates is not independent. You may trigger it with `SPOCK: check what is written, then continue`, and triggering it is not running it: you relay what it wrote. **Never report a gate result for your own output.**

## The eleven sections, and the twelfth that is not here

ČS's Opportunity template numbers its sections 1 to 12 and carries no section 6. **Carry eleven and invent
no twelfth.** The mapping from each to its source is in
[`.github/know-how/method/opportunity-framing.md`](../../know-how/method/opportunity-framing.md), which is the authority
and wins on any difference with this file.

**Section 12, the recommended next step, is not yours.** It is a disposition a person takes, G2 is where a
person decides, and G2 is after 2.4. It lives on A4 as `dispositions[]`, beside the decision that sets it.
An artifact produced here that carried it would be guessing.

**The record keeps all eleven on every opportunity. The prose carries what differs.** Where a field's
answer is identical across the whole set — market factors deferred to the market stage, company factors
unknown — state it once in the document's opening and do not repeat it per opportunity. **In one run
thirty-one of ninety-nine field-fills were the same words every time**, which is eleven sections satisfied
and a reader given four facts. Where one opportunity has nothing different to say about a field, say that
rather than restating the constant.

## What a material-only run will leave unanswered

Three of the eleven, commonly: how many customers and how often, how important this is to them, and why
the problem occurs. **That is the no-inference rule working rather than this step failing**, and the run's
own prose should say so plainly rather than letting a thin document read as a careless one.

`2026-05-corporate-coverage` is the case worth knowing. All four origins are bank staff and no customer was
ever asked, so customer impact has nothing behind it at all. Nothing in A3 or A4 says that today, and
section 2 is what makes it visible.

## Gates and obligations

- **Q2** — `C115` every hypothesis framed exactly once · `C116` a supplied answer carries its basis ·
  `C117` market factors deferred rather than unknown · `C118` alternatives empty with the reason. Plus C1,
  C2, C33, C34, C35 across the stage and the universal checks
- **G2** — the Researcher governs whether each opportunity is well formed and correctly evidenced, and the
  Product Manager governs which ones the run pursues. **You do not decide and do not record a decision**
- **The outcome clause is judged, not checked.** It appears in your `could_not_verify` block, which is
  where a reviewer at the gate reads what no check settled

## Bounds

One opportunity per A3 hypothesis. The set is the size the hypothesis set is, and there is no floor or
ceiling of your own: a run with four hypotheses frames four.

Elicitation: **3 rounds** across the whole set for the three asked fields. Beyond that, mark what is
still missing and stop rather than pressing.

## Edge cases

| Situation | What you do |
|---|---|
| A hypothesis rated `unrated` | Frame it like any other. **The trust tag is carried, not applied as a filter** — dropping one for its tag is the failure C27 exists to catch one step back |
| The brief marks `goals` unknown | Company factors is `basis: unknown`, naming the brief's own mark as the reason. Do not reach for a key result the brief did not name |
| The brief marks `qualitative_signal` unknown | `metrics.qualitative` is unknown with that reason. It is an optional brief field and the ordinary outcome |
| The user answers "I don't know" to all three | Mark all three, say so in the body, and continue. **A framed opportunity with three marks is still a framed opportunity** and it is a more honest input to G2 than three invented numbers |
| The user gives you a solution when asked for a root cause | Record what they said as the assumption it is, and do not promote it into `alternatives`. Section 9 stays empty |
| Two hypotheses would frame to the same outcome | Frame both. **They are two hypotheses until a person merges them**, and that merge is the Researcher's call at G2, not yours |
| Amending after G2 | Send the stage back first with `SPOCK: send a stage back to be redone`, because an accepted document stays as it was approved. A person's own change is then recorded with `SPOCK: record that I edited a document`, and leave `revisions` as it is: rework is counted by the workflow at its gates. A changed opportunity marks the prioritisation and everything downstream **stale** |

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

**Your artifact's field set is declared in §6.4b of the parent and generated into
[`.github/artifact-fields.yaml`](../../artifact-fields.yaml). Use those names and no others.**

**Do not invent a field name that reads reasonably.** The shapes an agent infers are reasonable, and that
is the failure: the first agent-driven hypothesis set wrote `evidence` as a list of objects copying the
upstream record rather than a list of refs, `trust_rationale` where §6 says `rationale`, and `original`
where the rejection schema says `statement`. **Four checks failed and the worst of them reported the
artifact claiming a trust tag the arithmetic did not derive** — which reads as an agent inflating a tag and
was nothing of the kind.

**Every artifact carries the envelope as well as its own set.** Where §6 delegates a set to a body of
know-how, that body is the source. C73 refuses the carrier when it drifts from §6.

**Your artifact has no decision gate of its own**, so you never write a `decision:` block. G2 decides over
A4, and a stub carrying only a gate name is a decision record with nobody in it, which **C40 refuses**.
