# Documentation — what to read, and what not to edit

**Generated. Do not edit.** `node .github/scripts/signpost.mjs --write`

**Registry:** [specifications/documents.yaml](documents.yaml) · **Date:** 2026-08-27 · **Owner:** igor.tadic

> **Two kinds of file, and the difference matters before you change one.** The first group is
> written by people and may be edited. **The second is produced by a script from a source of
> record**, and an edit to one of those is undone the next time anything regenerates and fails a
> check in the meantime. Each row in the second group names what regenerates it and what fails.

---

## Written by a person

**21 documents, and these are the ones to read.** They may be edited, and a change to one is a change to the thing itself rather than to a copy of it.

| Document | What it is for | Who reads it |
|---|---|---|
| [`specifications/BUSINESS-LOGIC-OVERVIEW.md`](BUSINESS-LOGIC-OVERVIEW.md) | The workflow explained for anyone who did not build it: what each stage does and why the order holds, without the machinery. The tester guide is written on top of it, so that the guide and the overview cannot come to describe seven stages two different ways. | a tester, the business owner, engineering, C147, C158 |
| [`specifications/onboarding/TESTER-GUIDE.md`](onboarding/TESTER-GUIDE.md) | What a tester needs beside SETUP.md and the testing scenarios pack: what they can and cannot establish, the provider and the agent list, how a stage goes, what correct behaviour looks like at each of the seven stages, the one probe the pack does not carry, what to record, what to do when it breaks, and what to report the same hour. | a tester at ČS, the person coordinating the dry run, C161 |
| [`specifications/COMPLIANCE-REQUIREMENTS.md`](COMPLIANCE-REQUIREMENTS.md) | The business requirements for compliance in the workflow, anchored to moments rather than stages so the workflow can be rebuilt underneath them. CR-A to CR-G. | whoever changes the compliance screen or its bindings |
| [`specifications/definitions/area.md`](definitions/area.md) | The area the pilot lives in: its shared knowledge, its roster of agents and the governance every binding in it carries. | C90 |
| [`specifications/definitions/cross-cutting/composed-behaviours.md`](definitions/cross-cutting/composed-behaviours.md) | The nine behaviours composition adds to a skill, and which of them a check actually enforces. | whoever changes the composed floor |
| [`specifications/definitions/cross-cutting/free-roam.md`](definitions/cross-cutting/free-roam.md) | Which agents may be invoked outside every workflow and which may not, with the reason for each exclusion. The roster is read off agents.yaml, which decides it; what free roam is stays in PILOT-BUSINESS-LOGIC §4.3-§4.5. | C178 |
| [`specifications/definitions/cross-cutting/model-diversification.md`](definitions/cross-cutting/model-diversification.md) | The independent checker: why a producer's own family cannot judge it, and what the build does while no second family is configured. | C90, whoever configures the independent checker |
| [`specifications/definitions/cross-cutting/observability.md`](definitions/cross-cutting/observability.md) | Records, traces, logs and metrics: what a run keeps about itself and what may be retained from a trace. | C90, whoever changes tracing or the run record |
| [`specifications/definitions/cross-cutting/run-state.md`](definitions/cross-cutting/run-state.md) | S2, the run's own record of where it is: the status vocabulary, the legal transitions and what a stage records when it runs. | whoever changes the run record or its writer |
| [`specifications/definitions/PATTERN-CATALOGUE.md`](definitions/PATTERN-CATALOGUE.md) | The execution shapes a skill or workflow may declare, and what each one requires. Extends the Agent Blueprint's five rather than redefining them. | C90 |
| [`specifications/onboarding/KNOW-HOW-OWNERS.md`](onboarding/KNOW-HOW-OWNERS.md) | Who keeps each area of know-how: Česká spořitelna owns every area and names the person at ČS for each; the bodies and registries in each area, where their sources live, and how a change is made. | the person at ČS who keeps an area of know-how, the business owner at ČS who names them |
| [`specifications/PILOT-BUSINESS-LOGIC.md`](PILOT-BUSINESS-LOGIC.md) | The parent contract. Stages, agents, artifacts, gates, checks, scoring and conformance — the source of truth for the build. | C42, C44, C46, C64, C73, C132, C135, C156, check.mjs through the field declarations, whoever changes the build |
| [`specifications/REPOSITORY-MAP.md`](REPOSITORY-MAP.md) | How the repository is laid out for somebody opening it for the first time: what every folder holds and is for, the seven stages end to end, and each file type with a worked example of it. | a person arriving, the engineer at CS who inherits the repository |
| [`specifications/stage-specs/README.md`](stage-specs/README.md) | The way in to stage-specs/. What a stage specification is, the thirteen-part shape stage 4's uses as the template, and how one is kept current. | whoever revises a stage specification |
| [`specifications/stage-specs/STAGE-1-SPEC.md`](stage-specs/STAGE-1-SPEC.md) | Stage 1 in enough detail to build it: what the brief commits the run to, what it refuses to infer, the nine bodies its producer holds and what each is for, and what an absent input does. | whoever builds or revises stage 1 |
| [`specifications/stage-specs/STAGE-2-SPEC.md`](stage-specs/STAGE-2-SPEC.md) | Stage 2 in enough detail to build it: the four steps and the boundary each sits behind, the derived trust tag, the G2 gate and who signs it, the five hard stops, and why one agent carries a step that holds no tools. | whoever builds or revises stage 2 |
| [`specifications/stage-specs/STAGE-3-SPEC.md`](stage-specs/STAGE-3-SPEC.md) | Stage 3 in enough detail to build it: the four steps including the bridge declared with no tools and owning no position, the source floor, the store, and the gate that is the stage's only reader. | whoever builds or revises stage 3 |
| [`specifications/stage-specs/STAGE-4-SPEC.md`](stage-specs/STAGE-4-SPEC.md) | Stage 4 in enough detail to build it: the eight steps, the eight sections of an idea and what each must cite, the 128-question compliance sweep, what replaces scoring, the gate as floors, the decision, the bounds, and what the build has to change to get there. | whoever builds or revises stage 4 |
| [`specifications/stage-specs/STAGE-5-SPEC.md`](stage-specs/STAGE-5-SPEC.md) | Stage 5 in enough detail to build it: one stage with two halves and two decisions, why stage 4's distinctness rule deliberately does not apply, the option ceiling that is the person's and the three that are the producer's, and why the option is chosen as a recorded decision. | whoever builds or revises stage 5 |
| [`specifications/stage-specs/STAGE-6-SPEC.md`](stage-specs/STAGE-6-SPEC.md) | Stage 6 in enough detail to build it: six inputs into the run's largest synthesis, why the agreed PRD is a different artifact rather than a status, the two loop bounds and why they differ in kind, and the alignment statement. | whoever builds or revises stage 6 |
| [`specifications/stage-specs/STAGE-7-SPEC.md`](stage-specs/STAGE-7-SPEC.md) | Stage 7 in enough detail to build it: the thirteen-section template ČS owns rather than this project, the language rule and the check that counts function words, and the propagation binding that has never run. | whoever builds or revises stage 7 |

---

## Generated — do not edit by hand

**16 surfaces.** Each is produced from a source of record. **Editing one directly does two things**: the change is lost the next time its generator runs, and until then the check named beside it fails the build. **Change the source, then regenerate.**

| Surface | Made from | Regenerate with | Fails as |
|---|---|---|---|
| [`specifications/CONTENT-REGISTER.md`](CONTENT-REGISTER.md) | What this build is made of, joined from the registries that already hold it: stages, agents, skills, artifacts, checks, know-how, generated surfaces and these documents. | `node .github/scripts/content-register.mjs` | `C135` |
| [`specifications/DOCUMENTATION.md`](DOCUMENTATION.md) | specifications/documents.yaml | `node .github/scripts/signpost.mjs` | `C173` |
| [`specifications/onboarding/TASKS.md`](onboarding/TASKS.md) | Every task a person can run, what each does, and which boxes it opens. Generated from .vscode/tasks.json, which is the only place any of it is stated. | `node .github/scripts/task-page.mjs` | `C179` |
| [`specifications/REGMAP.md`](REGMAP.md) | The signpost for regulatory knowledge: four areas, which body carries each, which dossier holds the evidence, and thirty-three named regimes with their status. | `node .github/scripts/regmap.mjs` | `C119` |
| `.github/artifact-fields.yaml` | §6 of specifications/PILOT-BUSINESS-LOGIC.md | `node .github/scripts/artifact-fields.mjs` | `C73` |
| `.github/composed-behaviours.yaml` | COMPOSED_FLOOR in .github/scripts/gates.mjs | `node .github/scripts/floor.mjs` | `C45` |
| `.github/could-not-verify.yaml` | the gate model in .github/scripts/gates.mjs | `node .github/scripts/unverified.mjs` | `C72` |
| `.github/COVERAGE-CHECKS.md` | the cards in checks.yaml, §7.4, gates.mjs, check.mjs and shapes.yaml | `node .github/scripts/register.mjs` | `C44` |
| `.github/know-how/` | specifications/definitions/know-how/ | `node .github/scripts/know-how.mjs` | `C41` |
| `.github/OPERATING-A-RUN.md` | the workflow contracts, the gate model, the scripts register and the run tree | `node .github/scripts/operator.mjs` | `C144` |
| `.github/release-files.json` | every file under .github/ and .vscode/ in the release copy, and the release in .github/build | `node .github/scripts/release-files.mjs` | `C189` |
| `.github/store/S1-competitors.md` | the competitor cards of the committed example runs and of the runs a person keeps | `node .github/scripts/store.mjs` | `C74` |
| `{runs_root}/{run_id}/read/7-initiative/initiative.md` | A14, with its machine record stripped | `node .github/scripts/reading-copy.mjs` | `C96` |
| `{runs_root}/{run_id}/README.md` | the run's own record | `node .github/scripts/run-readme.mjs` | `C79` |
| `specifications/CONTENT-REGISTER.md` | every registry, plus this file | `node .github/scripts/content-register.mjs` | `C135` |
| `specifications/REGMAP.md` | .github/registry/regmap.yaml plus the skill bindings | `node .github/scripts/regmap.mjs` | `C119` |

---

## Folders another registry owns

**2 folders.** The files in them are accounted for by the registry named, not by the document register, so they do not appear above.

| Folder | Owned by | Checked by |
|---|---|---|
| `specifications/definitions/know-how/` | .github/registry/skills.yaml, specifications/definitions/area.md | C41, C68, C90, C94 |
| `specifications/regulatory-research/` | .github/registry/regmap.yaml | C119 |

---

**Anything under `specifications/` that is in none of the three groups fails `C135`**, which is what stops a document being added and then forgotten.
