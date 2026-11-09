# Know-how owners

**Česká spořitelna owns every area of know-how on this page.** For each area, ČS names the person at ČS who
keeps it current and writes that name into the table below. Nobody outside ČS holds an area, and nobody holds
one on ČS's behalf while its name is empty.

Know-how is what the agents read and never write: what counts as evidence, how a market is researched, what a
brief, a PRD and an initiative must hold, how a compliance area is screened, how a document reads. It changes
only through a person, outside any run. This page says what there is to own, where it lives, and how a
change is made.

---

## 1. The areas and who keeps them

| Area | What it decides | Owner | Person at ČS |
|---|---|---|---|
| **Compliance** | Which regulatory areas a solution touches, what each area's card asks, and what a compliance section says | Česká spořitelna | *to be named by ČS, from compliance* |
| **Market** | How competitors and trends are researched, and where the research may search | Česká spořitelna | *to be named by ČS* |
| **Method** | What counts as evidence, how problems become opportunities, and the method every stage follows | Česká spořitelna | *to be named by ČS* |
| **Product** | What the brief, the solutions, the PRD and the initiative must hold, and the strategy they are measured against | Česká spořitelna | *to be named by ČS* |
| **Writing** | How the agents talk to a person and how every document reads | Česká spořitelna | *to be named by ČS* |

**The four regulatory area cards need their person in compliance, not in product.** The Compliance card was
built from a card ČS supplied. The GDPR, ICT and security, and legal cards were written by the pilot team from
public law, and ČS has not confirmed them. §13 of every card, the touchpoints in Czech that a Czech run quotes,
is the pilot team's translation, including §13 of the Compliance card. No output says which cards the pilot team
wrote.

---

## 2. What each area holds

Each body of know-how is one file, and the link is its source, the file to edit. The registries are the lists
the checks read beside the bodies.

### Compliance

| Body or registry | Source |
|---|---|
| Area · Compliance, Conduct and Product Regulation | [`compliance/area-compliance.md`](../definitions/know-how/compliance/area-compliance.md) |
| Area · GDPR and Privacy | [`compliance/area-gdpr.md`](../definitions/know-how/compliance/area-gdpr.md) |
| Area · ICT and Security | [`compliance/area-ict-security.md`](../definitions/know-how/compliance/area-ict-security.md) |
| Area · Legal and Contracts | [`compliance/area-legal.md`](../definitions/know-how/compliance/area-legal.md) |
| Compliance Guidelines | [`compliance/compliance-guidelines.md`](../definitions/know-how/compliance/compliance-guidelines.md) |
| Screening Inputs | [`compliance/screening-inputs.md`](../definitions/know-how/compliance/screening-inputs.md) |
| The RegMap: which regulatory areas exist, which card carries each, and the regimes inside each | [`regmap.yaml`](../../.github/registry/regmap.yaml) |
| The screening inputs: what a compliance screen needs to know, joined across the four cards | [`screening-inputs.yaml`](../../.github/registry/screening-inputs.yaml) |

### Market

| Body or registry | Source |
|---|---|
| Competitive Analysis Standards | [`market/competitive-analysis-standards.md`](../definitions/know-how/market/competitive-analysis-standards.md) |
| The approved search destination, and the regime a run's market research is done under | [`egress.yaml`](../../.github/registry/egress.yaml) |

### Method

| Body | Source |
|---|---|
| Discovery Craft | [`method/discovery-craft.md`](../definitions/know-how/method/discovery-craft.md) |
| Evidence Standards | [`method/evidence-standards.md`](../definitions/know-how/method/evidence-standards.md) |
| Method Canon | [`method/method-canon.md`](../definitions/know-how/method/method-canon.md) |
| Opportunity Framing | [`method/opportunity-framing.md`](../definitions/know-how/method/opportunity-framing.md) |

### Product

| Body | Source |
|---|---|
| Brief Fields | [`product/brief-fields.md`](../definitions/know-how/product/brief-fields.md) |
| Initiative Template, the build's copy of the Guild's template | [`product/initiative-template.md`](../definitions/know-how/product/initiative-template.md) |
| PRD Template | [`product/prd-template.md`](../definitions/know-how/product/prd-template.md) |
| Stage 1 Shapes | [`product/stage-1-shapes.md`](../definitions/know-how/product/stage-1-shapes.md) |
| Stage 3 Shapes | [`product/stage-3-shapes.md`](../definitions/know-how/product/stage-3-shapes.md) |
| Stage 4 Shapes | [`product/stage-4-shapes.md`](../definitions/know-how/product/stage-4-shapes.md) |
| Strategy Basis | [`product/strategy-basis.md`](../definitions/know-how/product/strategy-basis.md) |

### Writing

| Body | Source |
|---|---|
| Agent Interaction | [`writing/agent-interaction.md`](../definitions/know-how/writing/agent-interaction.md) |
| Documentation Standards | [`writing/documentation-standards.md`](../definitions/know-how/writing/documentation-standards.md) |
| Input Elicitation | [`writing/input-elicitation.md`](../definitions/know-how/writing/input-elicitation.md) |
| Output Voice | [`writing/output-voice.md`](../definitions/know-how/writing/output-voice.md) |

---

## 3. Where it lives

- **The source** is under `specifications/definitions/know-how/`, one folder per area. It is the only copy
  anyone edits.
- **The build copy** is under `.github/know-how/`, and it is what the agents read. It is generated from the
  source and its first lines say so. An edit made there fails the repository check (`C41`) and is erased the
  next time the copy is generated.
- **The three registries** are in `.github/registry/`. They have no copy and are edited where they are.

---

## 4. How a change is made

**A body of know-how:**

1. The area's person at ČS decides the change and makes it in the source.
2. In the body's header they raise the **Version:**, set the **Date:**, and add one line to its history block,
   between `<!-- history -->` and `<!-- /history -->`, adding the pair under the header where the body has none,
   saying what changed and why. A run records the version of every body it read, so a change under an unchanged
   version cannot be told apart from what came before.
3. Every body's **Owner:** line reads Česká spořitelna. Once the area's person has reviewed the whole body, its
   **Status:** becomes *Approved* and its **Owner:** line adds their name after Česká spořitelna. The
   **Written by:** line keeps the pilot-team author, who wrote the body and does not own it.
4. An engineer generates the build copy and runs the checks. Both checks exit 0 before the change is
   committed:

   ```bash
   node .github/scripts/know-how.mjs --write
   node .github/scripts/repo-check.mjs
   node .github/scripts/check.test.mjs
   ```

**A registry:** each one's `owner:` reads `ceska-sporitelna`, and its `written_by:` names who wrote it. The
change is made in the file itself, with its `version:` raised and, where it has one, its `date:` set. A change to
the screening inputs is made in the Screening Inputs body in the same change, because the repository check
compares the registry with both the four cards and that body (`C123`). A change to the RegMap is followed by
`node .github/scripts/regmap.mjs --write`, which rewrites `specifications/REGMAP.md`, and the repository check
compares the two (`C119`). Then the same two checks run.
