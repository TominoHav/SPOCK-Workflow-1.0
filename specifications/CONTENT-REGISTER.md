# Content register — what this build is made of

**Generated. Do not edit.** `node .github/scripts/content-register.mjs --write`

**Registry:** [specifications/documents.yaml](documents.yaml) · **Date:** 2026-08-27 · **Owner:** igor.tadic

> **What this is.** One page that says what exists: which stages run, who runs them, what each
> produces, what governs it and where to look. **Every row is joined from the registry that
> already holds it**, so nothing here can disagree with the build without failing the build.
>
> **What this is not.** Not a source of record for anything. It copies nothing that another
> file owns, and where a set is large it gives the count and the pointer rather than the rows.

---

## Stages, and who runs them

**17 skill bindings across 6 agents.** From [skills.yaml](../.github/registry/skills.yaml) and [agents.yaml](../.github/registry/agents.yaml).

| Stage | Skill | Agent | Pattern | Produces | State |
|---|---|---|---|---|---|
| 1.1 | `brief-creation` | `product-manager` | elicitation-dialogue | A1 | built |
| 2.1 | `material-intake` | `hypothesis-designer` | quarantined-extract | A2b | built |
| 2.2 | `hypothesis-authoring` | `hypothesis-designer` | single-shot | A3 | built |
| 2.3 | `opportunity-framing` | `hypothesis-designer` | elicitation-dialogue | A3b | built |
| 2.4 | `prioritisation` | `hypothesis-designer` | elicitation-dialogue | A4 | built |
| 3.1 | `landscape-mapping` | `competitive-analysis` | research-loop | A5 | built |
| 3.2 | `deep-dive` | `competitive-analysis` | research-loop | A6 | built |
| 3.3 | `synthesis` | `competitive-analysis` | synthesis | A7 | built |
| 4.1 | `ideation` | `product-manager` | single-shot | A8 | built |
| 5.1 | `mvp-option-design` | `product-manager` | single-shot | A10 | built |
| 5.2 | `mvp-expansion` | `product-manager` | single-shot | A11 | built |
| 6.1 | `prd` | `business-analyst` | synthesis | A12, A13 | built |
| 7.1 | `initiative-authoring` | `business-analyst` | single-shot | A14 | built |
| 7.2 | `initiative-propagation` | `business-analyst` | best-effort-propagation | A15 | parked |
| — | `workflow-support` | `workflow-support` | elicitation-dialogue | — | built |
| — | `methodology-guidance` | `methodology-coach` | elicitation-dialogue | — | built |
| — | `market-content-extract` | `competitive-analysis` | quarantined-extract | — | built |

## Artifacts

**20 in a complete run.** From §6.1's register in [PILOT-BUSINESS-LOGIC.md](PILOT-BUSINESS-LOGIC.md), which is the source of record for the class and the gate that derives from it.

| | Artifact | Produced | Class | Gate |
|---|---|---|---|---|
| A1 | Initiative Brief | 1.1 | output | G1 |
| A1b | Initiative Screen | retired | asset | — |
| A2 | Problem material | human | — | — |
| A2b | Intake Record | 2.1 | asset | quarantine boundary |
| A3 | Problem Hypothesis Set | 2.2 | asset | — |
| A3b | Framed Opportunities | 2.3 | asset | — |
| A4 | Prioritised Opportunities | 2.4 + human | output | G2 |
| A5 | Landscape Map | 3.1 | asset | Q3 |
| A6 | Competitor Deep-Dive | 3.2 | asset | Q3 |
| A7 | Competitive Synthesis | 3.3 | asset | Q3 |
| A8 | Solution Set | 4.1 | asset | Q4 |
| A8c | Option Screens | retired | asset | — |
| A8b | Solution Scores | retired | asset | — |
| A9 | Selected Solution | G4 human | output | G4 |
| A10 | MVP Options | 5.1 | asset | — |
| A11 | Expanded MVP | 5.2 | output | G5b |
| A12 | PRD (draft) | 6.1 | asset | — |
| A13 | PRD (agreed) | 6.2 + human | output | G6 |
| A14 | Initiative document | 7.1 | output | G7 |
| A15 | Jira initiative | 7.2 | asset | — |

## Checks

**45 run at every stage; 64 are repository-scoped and appear in no gate.** Per gate: Q1 2 · Q2 21 · Q3 22 · Q4 20 · Q5 11 · Q6 11 · Q7 7, plus the universal set.

**The rows are not copied here.** [.github/COVERAGE-CHECKS.md](../.github/COVERAGE-CHECKS.md) is generated from §7.4, the gate model and the implementation together, and `register.mjs --verify` fails when those three disagree. A second copy would be a fourth surface to keep in step.

## Know-how

**22 bodies on disk**, in [specifications/definitions/know-how](definitions/know-how), generated into `.github/know-how/` and compared in both directions by `C41`.

| Body | Area | Read by |
|---|---|---|
| `area-compliance.md` | compliance | `ideation`, `mvp-option-design`, `mvp-expansion`, `prd` |
| `area-gdpr.md` | compliance | `ideation`, `mvp-option-design`, `mvp-expansion`, `prd` |
| `area-ict-security.md` | compliance | `ideation`, `mvp-option-design`, `mvp-expansion`, `prd` |
| `area-legal.md` | compliance | `ideation`, `mvp-option-design`, `mvp-expansion`, `prd` |
| `compliance-guidelines.md` | compliance | `ideation`, `mvp-option-design`, `mvp-expansion`, `prd` |
| `screening-inputs.md` | compliance | `ideation` |
| `competitive-analysis-standards.md` | market | `landscape-mapping`, `deep-dive`, `synthesis` |
| `discovery-craft.md` | method | `ideation`, `methodology-guidance` |
| `evidence-standards.md` | method | `brief-creation`, `material-intake`, `hypothesis-authoring`, `methodology-guidance` |
| `method-canon.md` | method | `brief-creation`, `material-intake`, `hypothesis-authoring`, `opportunity-framing`, `prioritisation`, `ideation`, `mvp-option-design`, `mvp-expansion`, `prd`, `initiative-authoring`, `initiative-propagation`, `methodology-guidance`, `landscape-mapping`, `market-content-extract`, `deep-dive`, `synthesis` |
| `opportunity-framing.md` | method | `opportunity-framing`, `prioritisation`, `methodology-guidance` |
| `brief-fields.md` | product | `brief-creation` |
| `initiative-template.md` | product | `initiative-authoring` |
| `prd-template.md` | product | `prd` |
| `stage-1-shapes.md` | product | `brief-creation` |
| `stage-3-shapes.md` | product | `landscape-mapping`, `deep-dive`, `synthesis` |
| `stage-4-shapes.md` | product | `ideation` |
| `strategy-basis.md` | product | `brief-creation`, `ideation`, `mvp-expansion`, `prd` |
| `agent-interaction.md` | writing | `brief-creation`, `material-intake`, `hypothesis-authoring`, `opportunity-framing`, `prioritisation`, `ideation`, `mvp-option-design`, `mvp-expansion`, `prd`, `initiative-authoring`, `initiative-propagation`, `workflow-support`, `methodology-guidance`, `landscape-mapping`, `market-content-extract`, `deep-dive`, `synthesis` |
| `documentation-standards.md` | writing | `brief-creation`, `material-intake`, `hypothesis-authoring`, `opportunity-framing`, `prioritisation`, `ideation`, `mvp-option-design`, `mvp-expansion`, `prd`, `initiative-authoring`, `landscape-mapping`, `deep-dive`, `synthesis` |
| `input-elicitation.md` | writing | `brief-creation`, `opportunity-framing` |
| `output-voice.md` | writing | `brief-creation`, `material-intake`, `hypothesis-authoring`, `opportunity-framing`, `prioritisation`, `ideation`, `mvp-option-design`, `mvp-expansion`, `prd`, `initiative-authoring`, `landscape-mapping`, `deep-dive`, `synthesis` |

## Scoring

**2 standalone scores, neither a fraction of anything** — Strategic alignment and Regulatory complexity, each anchored to a body that says what its bands mean. **5 sub-dimensions are out of the model**, each recorded with what it would have measured. From [scoring.yaml](../.github/registry/scoring.yaml).

## Generated surfaces, and what guards each

**12 of them.** A generated file that nothing regenerates and nothing guards is the worst of both: it reads as derived and is maintained by hand.

| Surface | Generated from | Generator | Guard |
|---|---|---|---|
| `.github/know-how/` | specifications/definitions/know-how/ | `.github/scripts/know-how.mjs` | C41 |
| `.github/artifact-fields.yaml` | §6 of specifications/PILOT-BUSINESS-LOGIC.md | `.github/scripts/artifact-fields.mjs` | C73 |
| `.github/could-not-verify.yaml` | the gate model in .github/scripts/gates.mjs | `.github/scripts/unverified.mjs` | C72 |
| `.github/composed-behaviours.yaml` | COMPOSED_FLOOR in .github/scripts/gates.mjs | `.github/scripts/floor.mjs` | C45 |
| `.github/COVERAGE-CHECKS.md` | the cards in checks.yaml, §7.4, gates.mjs, check.mjs and shapes.yaml | `.github/scripts/register.mjs` | C44 |
| `specifications/REGMAP.md` | .github/registry/regmap.yaml plus the skill bindings | `.github/scripts/regmap.mjs` | C119 |
| `specifications/CONTENT-REGISTER.md` | every registry, plus this file | `.github/scripts/content-register.mjs` | C135 |
| `.github/store/S1-competitors.md` | the competitor cards of the committed example runs and of the runs a person keeps | `.github/scripts/store.mjs` | C74 |
| `.github/OPERATING-A-RUN.md` | the workflow contracts, the gate model, the scripts register and the run tree | `.github/scripts/operator.mjs` | C144 |
| `.github/release-files.json` | every file under .github/ and .vscode/ in the release copy, and the release in .github/build | `.github/scripts/release-files.mjs` | C189 |
| `{runs_root}/{run_id}/README.md` | the run's own record | `.github/scripts/run-readme.mjs` | C79 |
| `{runs_root}/{run_id}/read/7-initiative/initiative.md` | A14, with its machine record stripped | `.github/scripts/reading-copy.mjs` | C96 |

## Design documents

**25 registered**, 2 folders governed by another registry and 1 exempt with a reason. From [specifications/documents.yaml](documents.yaml).

| Document | What it is for | Generated |
|---|---|---|
| [`specifications/PILOT-BUSINESS-LOGIC.md`](PILOT-BUSINESS-LOGIC.md) | The parent contract. Stages, agents, artifacts, gates, checks, scoring and conformance — the source of truth for the build. | no |
| [`specifications/onboarding/KNOW-HOW-OWNERS.md`](onboarding/KNOW-HOW-OWNERS.md) | Who keeps each area of know-how: Česká spořitelna owns every area and names the person at ČS for each; the bodies and registries in each area, where their sources live, and how a change is made. | no |
| [`specifications/onboarding/TESTER-GUIDE.md`](onboarding/TESTER-GUIDE.md) | What a tester needs beside SETUP.md and the testing scenarios pack: what they can and cannot establish, the provider and the agent list, how a stage goes, what correct behaviour looks like at each of the seven stages, the one probe the pack does not carry, what to record, what to do when it breaks, and what to report the same hour. | no |
| [`specifications/stage-specs/README.md`](stage-specs/README.md) | The way in to stage-specs/. What a stage specification is, the thirteen-part shape stage 4's uses as the template, and how one is kept current. | no |
| [`specifications/stage-specs/STAGE-2-SPEC.md`](stage-specs/STAGE-2-SPEC.md) | Stage 2 in enough detail to build it: the four steps and the boundary each sits behind, the derived trust tag, the G2 gate and who signs it, the five hard stops, and why one agent carries a step that holds no tools. | no |
| [`specifications/stage-specs/STAGE-3-SPEC.md`](stage-specs/STAGE-3-SPEC.md) | Stage 3 in enough detail to build it: the four steps including the bridge declared with no tools and owning no position, the source floor, the store, and the gate that is the stage's only reader. | no |
| [`specifications/stage-specs/STAGE-5-SPEC.md`](stage-specs/STAGE-5-SPEC.md) | Stage 5 in enough detail to build it: one stage with two halves and two decisions, why stage 4's distinctness rule deliberately does not apply, the option ceiling that is the person's and the three that are the producer's, and why the option is chosen as a recorded decision. | no |
| [`specifications/stage-specs/STAGE-6-SPEC.md`](stage-specs/STAGE-6-SPEC.md) | Stage 6 in enough detail to build it: six inputs into the run's largest synthesis, why the agreed PRD is a different artifact rather than a status, the two loop bounds and why they differ in kind, and the alignment statement. | no |
| [`specifications/stage-specs/STAGE-7-SPEC.md`](stage-specs/STAGE-7-SPEC.md) | Stage 7 in enough detail to build it: the thirteen-section template ČS owns rather than this project, the language rule and the check that counts function words, and the propagation binding that has never run. | no |
| [`specifications/stage-specs/STAGE-4-SPEC.md`](stage-specs/STAGE-4-SPEC.md) | Stage 4 in enough detail to build it: the eight steps, the eight sections of an idea and what each must cite, the 128-question compliance sweep, what replaces scoring, the gate as floors, the decision, the bounds, and what the build has to change to get there. | no |
| [`specifications/stage-specs/STAGE-1-SPEC.md`](stage-specs/STAGE-1-SPEC.md) | Stage 1 in enough detail to build it: what the brief commits the run to, what it refuses to infer, the nine bodies its producer holds and what each is for, and what an absent input does. | no |
| [`specifications/BUSINESS-LOGIC-OVERVIEW.md`](BUSINESS-LOGIC-OVERVIEW.md) | The workflow explained for anyone who did not build it: what each stage does and why the order holds, without the machinery. The tester guide is written on top of it, so that the guide and the overview cannot come to describe seven stages two different ways. | no |
| [`specifications/COMPLIANCE-REQUIREMENTS.md`](COMPLIANCE-REQUIREMENTS.md) | The business requirements for compliance in the workflow, anchored to moments rather than stages so the workflow can be rebuilt underneath them. CR-A to CR-G. | no |
| [`specifications/REGMAP.md`](REGMAP.md) | The signpost for regulatory knowledge: four areas, which body carries each, which dossier holds the evidence, and thirty-three named regimes with their status. | yes, C119 |
| [`specifications/DOCUMENTATION.md`](DOCUMENTATION.md) | The signpost. Every document a person can read, in reading order, split into the ones written by a person and the ones a script produces from a source of record, with what regenerates each and what fails if it is edited by hand. | yes, C173 |
| [`specifications/CONTENT-REGISTER.md`](CONTENT-REGISTER.md) | What this build is made of, joined from the registries that already hold it: stages, agents, skills, artifacts, checks, know-how, generated surfaces and these documents. | yes, C135 |
| [`specifications/definitions/area.md`](definitions/area.md) | The area the pilot lives in: its shared knowledge, its roster of agents and the governance every binding in it carries. | no |
| [`specifications/definitions/PATTERN-CATALOGUE.md`](definitions/PATTERN-CATALOGUE.md) | The execution shapes a skill or workflow may declare, and what each one requires. Extends the Agent Blueprint's five rather than redefining them. | no |
| [`specifications/definitions/cross-cutting/composed-behaviours.md`](definitions/cross-cutting/composed-behaviours.md) | The nine behaviours composition adds to a skill, and which of them a check actually enforces. | no |
| [`specifications/definitions/cross-cutting/model-diversification.md`](definitions/cross-cutting/model-diversification.md) | The independent checker: why a producer's own family cannot judge it, and what the build does while no second family is configured. | no |
| [`specifications/definitions/cross-cutting/observability.md`](definitions/cross-cutting/observability.md) | Records, traces, logs and metrics: what a run keeps about itself and what may be retained from a trace. | no |
| [`specifications/onboarding/TASKS.md`](onboarding/TASKS.md) | Every task a person can run, what each does, and which boxes it opens. Generated from .vscode/tasks.json, which is the only place any of it is stated. | yes, C179 |
| [`specifications/definitions/cross-cutting/free-roam.md`](definitions/cross-cutting/free-roam.md) | Which agents may be invoked outside every workflow and which may not, with the reason for each exclusion. The roster is read off agents.yaml, which decides it; what free roam is stays in PILOT-BUSINESS-LOGIC §4.3-§4.5. | no |
| [`specifications/definitions/cross-cutting/run-state.md`](definitions/cross-cutting/run-state.md) | S2, the run's own record of where it is: the status vocabulary, the legal transitions and what a stage records when it runs. | no |
| [`specifications/REPOSITORY-MAP.md`](REPOSITORY-MAP.md) | How the repository is laid out for somebody opening it for the first time: what every folder holds and is for, the seven stages end to end, and each file type with a worked example of it. | no |

**Folders another registry owns**, and which one:

| Folder | Governed by | Checks |
|---|---|---|
| `specifications/definitions/know-how/` | .github/registry/skills.yaml, specifications/definitions/area.md | C41, C68, C90, C94 |
| `specifications/regulatory-research/` | .github/registry/regmap.yaml | C119 |

**Folders outside the register, each with the reason:**

- `specifications/evidence/` — **Measured evidence kept beside the build.** It holds the variance proof `assurance.yaml` names and the first free-roam dispatch, because a registry pointing outside the repository is a claim a reader cannot check. It is exempt rather than registered because evidence is dated by nature and its purpose ends when the measurement is retaken.

## Regulation

**A pointer, never a copy.** [specifications/REGMAP.md](REGMAP.md) is the signpost for regulatory knowledge and is itself generated, from `regmap.yaml` plus the skill bindings, with `C119` behind it. Restating four areas and thirty-three regimes here would put the estate's most volatile facts in two places.

