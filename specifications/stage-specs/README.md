# Stage specifications

**2 October 2026** · **Release:** 1.14

**One document per stage, saying what that stage does in enough detail to build it.** The parent contract,
[PILOT-BUSINESS-LOGIC.md](../PILOT-BUSINESS-LOGIC.md), says what every stage does and how the seven fit
together. It is deliberately even: each stage gets a card, a step list, a gate and a rules block, and that is
the right shape for a document a reader takes end to end.

**It is not enough to build a stage from.** Stage 4's card is forty lines. The specification behind it is
eight hundred, and the difference is where every decision that was actually made lives: what each section of
an output must contain and what it must not, what a person is asked and when, what the effort costs, what
the machinery does versus what a model does, and what the stage deliberately does not fix.

**A stage specification describes what the build does.** The parent contract and every stage spec describe
the latest release, and where either disagrees with the build, that document is the defect.

---

## Status

| Stage | | Specification | Live-run evidence |
|---|---|---|---|
| **1** | Brief | [STAGE-1-SPEC.md](./STAGE-1-SPEC.md) — thirteen parts | yes |
| **2** | Problems | [STAGE-2-SPEC.md](./STAGE-2-SPEC.md) — thirteen parts | yes |
| **3** | Market | [STAGE-3-SPEC.md](./STAGE-3-SPEC.md) — thirteen parts | yes |
| **4** | Solutions | [STAGE-4-SPEC.md](./STAGE-4-SPEC.md) — thirteen parts | yes, two runs |
| **5** | MVP | [STAGE-5-SPEC.md](./STAGE-5-SPEC.md) — thirteen parts | yes |
| **6** | PRD | [STAGE-6-SPEC.md](./STAGE-6-SPEC.md) — thirteen parts | yes |
| **7** | Initiative | [STAGE-7-SPEC.md](./STAGE-7-SPEC.md) — thirteen parts | yes |

---

## The one instruction that matters

**Write the spec from live runs, not from the rules.** A rule a producer reads does not show it the shape:
a producer can declare every rule correctly and still write the wrong shape. **What decides the outcome is
whether anything showed the shape.**

A specification written by reading the contract and restating it will reproduce the contract and find
nothing. **The material to write one from is the run that failed and the journal that recorded it**, and
every stage has both.

**Where that material is.** Not here. The per-stage drafts for all seven, and the findings, the issues, the
redesign and the raw session journals stage 4's spec was written from, are working material and do not ship
with this repository.

---

## The shape

Stage 4's specification is the template. Thirteen parts, and **the numbering is worth keeping** so that a
reader who knows one stage's spec can find their way around another's.

| Part | | What it answers |
|---|---|---|
| **1** | Purpose and scope | What the stage is for, why it sits here, what it does not do, and what good and poor look like |
| **2** | Inputs | Which artifacts it reads, which know-how its producers hold, and what happens when an input is absent |
| **3** | The steps | Every step in order, numbered, each with its own rules. Which steps need a person and which do not |
| **4** | The output and its sections | What the stage produces, section by section, **each with a length, a binding saying what it must cite, and what it must not contain** |
| **5** | Compliance | Where and how the stage touches the regulatory areas, if it does |
| **6** | Scoring | What the stage scores, or what it carries instead of a score |
| **7** | Artifacts and records | Every file the stage writes, who writes it, and where it goes |
| **8** | Gates and checks | What the gate verifies, as floors rather than craft, and what no program can decide |
| **9** | The decision | What a person decides, what they are asked, and what the record captures |
| **10** | Loops and re-entry | What a person may change, when, what it costs, and how a later stage sends the run back |
| **11** | Bounds | Every number the stage is held to, whose it is, and whether a check reads it or the agent is only instructed to keep it |
| **12** | What the build does not yet do | Where each gap is stated |
| **13** | Open questions | What is still undecided, as plain questions |

**A gap is stated where it belongs, in the present tense.** The part it concerns says the stage does not yet
do something, and why, and part 12 lists where those lines are. When the build closes a gap, the line goes
and the part describes what the build does. **Part 13 holds only questions still open**; a question the build
has answered is deleted.

---

## How one is kept current

**The team drafts each specification from the build, and Igor approves it.** One pass per stage, reading its
skills, its contract, its gate and its fields, part by part, in the order of the thirteen parts. Every sentence
that no longer holds is rewritten to what the build does, and every difference between the build and the parent
contract is raised as a finding rather than settled here. **Run the full pass.** Approving thirteen parts
separately does not make them agree with each other.

---

## What a stage spec is not

**Not the reasoning.** Why an option was chosen over another, what the evidence was, what it cost — none of
that is here. This repository ships, and a decision's working is not part of what ships.

**Not the implementation plan.** Part 12 lists what the build does not yet do. The sequencing, the risks and
the state of the work are not recorded here.

**Not a replacement for the parent contract.** A stage spec is read by whoever builds or revises that stage.
`PILOT-BUSINESS-LOGIC.md` describes the whole workflow. The check register, `.github/COVERAGE-CHECKS.md`, is
generated by `register.mjs`, one card per check: its title, what it checks, why and who it applies to from
`.github/registry/checks.yaml`, where it runs from `gates.mjs`, and what passes from `.github/registry/shapes.yaml`;
each run check's why is its line in §7.4. **A stage specification names a check and says what it guards against;
it does not restate the check's clauses.** Each check's full rule is in that register; the content register joins
the registries and takes only §6.1's table from the business logic.
