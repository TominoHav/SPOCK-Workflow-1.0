<!-- GENERATED from specifications/definitions/know-how/product/stage-1-shapes.md. Do not edit this copy.
     Regenerate: node .github/scripts/know-how.mjs --write
     Know-how is read by skills, never written by them. It changes through a human-owned process,
     outside any run (PD90). -->

# Stage 1 Shapes

**Version:** 0.1 · **Date:** 11 September 2026 · **Status:** For review
**Owner:** Česká spořitelna · **Written by:** Igor Tadić · **Read by:** the skill that writes the initiative brief

---

## What this body is for, and when to open it

**Open it when a gate has just refused something you wrote.** It is keyed on the message, not on the rule.
Each entry gives the message, the shape that produced it, and the shape that passes.

**It exists because the alternative is measurable.** A producer of the brief without it read
`check.mjs` **nineteen times** looking for what `C100` and `C163` wanted, and that turn cost **280 credits**,
more than a whole stage 4 with a body like this. **Reading the checker is not a
fallback, it is the failure this file exists to remove.**

---

## 1 · `C100` — the brief came back with no sections at all

**What the gate said:** the §3 section set for `A1` is not on the document.

**The shape that produced it.** One `#` title, then flowing prose with bold labels inside the paragraphs:

```markdown
# Brief — First transaction to a new account

Newly acquired clients open a CZK personal account but never transfer any money to it. …

**Goal.** The north star is 1.748 million primary clients …

**What could not be established.** The success signal, the qualitative signal …
```

**Why a producer writes it.** `documentation-standards` §3b carries four worked examples, and every one of
them is a bold inline label inside prose — `**What is here.**`, `**How solid the evidence is.**` The examples
sit at line 317 of the same file whose §3.1 fixes the headings at line 91. **They are about making a sentence
land harder and they are not a layout.** The producer read them as one.

**The shape that passes.** Five `##` sections, in this order, then the two closing ones:

```markdown
# Brief — First transaction to a new account

<one paragraph of standfirst, no heading>

## The outcome we want
## Who this is for
## Why now
## What success looks like
## What is in scope, and what is not
## What we could not establish
## How this was produced
```

**Under `language: cs` the same seven carry their Czech names**, from §3.12 of the documentation standards.
Never mix the columns.

**Where a heading would be empty it still appears**, carrying a sentence saying so and why. §3's own words:
a producer that deviates has produced a regression, not a style.

---

## 2 · `C98` — the last two sections are missing or renamed

**What the gate said:** every document closes with `What we could not establish` and `How this was produced`,
under those exact names, in that order, and nothing after them.

**The shape that produced it.** A bold inline label doing the job of the heading, and no procedural section
at all:

```markdown
**What could not be established.** The success signal, the qualitative signal, and any known constraints …

**Assembled from one record**, which carries the fields a gate decides: [rec:R-A1-01].
```

Two things are wrong and only one is visible. The unknowns section is a bold label rather than a `##`
heading, **and its name is not the name**: `What could not be established` is not
`What we could not establish`. **The names are the rule.** A document calling its unknowns *Limitations* and
its procedure *Notes* carries the same two sections and cannot be read across runs.

**The shape that passes.**

```markdown
## What we could not establish

The success signal, the qualitative signal, and any known constraints specific to this initiative were
asked for directly and marked unknown at the product manager's request, rather than guessed.

## How this was produced

Assembled from one record, which carries the fields a gate decides: [rec:R-A1-01].
```

**Nothing comes after `How this was produced`.**

---

## 3 · `C163` — a gap recorded as the person's silence, with nothing saying they were asked

**What the gate said:** a gap whose reason is a claim about what a person said must have something recording
that the person was asked.

**The shape that produced it.** An unknown whose reason asserts a silence:

```yaml
unknowns:
  - field: success_signal
    reason: declined
    note: "Marked unknown at the product manager's request."
```

`declined` and `not_known` are claims about what a person did. **The record has to carry that they were
asked**, not only that they did not answer.

**The shape that passes.** Ask for the field, out loud, and record that you did:

```yaml
unknowns:
  - field: success_signal
    reason: declined
    asked: true
    note: "Asked directly at the review of the brief; the product manager said it is not established
      anywhere upstream and asked for it to be marked unknown."
```

**A gap you never raised is not a declined gap**, and the difference is the whole of this check. An artifact
produced before 3 September 2026 is read against the model it was produced under and is not held to this.

---

## 4 · The rule behind all three

**The example beats the rule, and it did so twice in one day.** `C100` and `C98` were both produced by
§3b's worked examples teaching a layout the section above them forbids. Seven hours later the same producer
class read ten fabricated Czech-headed initiatives and still wrote English headings, because that instruction
sat in the file it opened rather than one section below the rule it contradicted.

**So: where a body carries both a fixed structure and a worked example, the structure wins.** Examples govern
sentences. They never govern the section set.

---

## 5 · Coverage bar

This body covers the three checks `Q1` has actually refused a document on: `C100`, `C98`, `C163`. The other
checks in that gate have never failed a driven run, and **an entry written from the rule rather than from a
failure is what this pattern replaces.** When one of them refuses something, it gets an entry here with the
message it printed.

## 6 · Open

**Nothing here is enforced.** No check reads this body; the instruction is the whole mechanism, exactly as it
is for stage 4.
