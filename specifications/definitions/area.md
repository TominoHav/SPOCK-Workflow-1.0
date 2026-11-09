# Area · discovery

**Version:** 0.4 · **Date:** 1 October 2026 · **Release:** 1.14
**Parent contract:** [PILOT-BUSINESS-LOGIC.md](../PILOT-BUSINESS-LOGIC.md) · **Owner:** Igor Tadic
**Blueprint:** Agent Blueprint Specification v2.1 **§4.1 · §4.3**

> **What this is.** The area the pilot lives in: the shared knowledge it owns, the roster of agents it
> holds, and the governance that applies to all of them.
>
> **What this is not.** It performs no work. Every job is done by a skill, run by an agent.
>
> **`C90`, a repository check, reads this document against `agents.yaml`, `skills.yaml` and the know-how
> tree**, so its roster, its binding count and its knowledge list cannot drift from the registries unnoticed. §4a records what
> Blueprint v2.1 §4.3 asks and where the pilot stands on each rule.

---

## 1. Why there is one area, and why capabilities sit at the binding

The Blueprint's area *"owns shared reference knowledge and a roster of agents"* and exists *"so that
knowledge is held once, governed once, and retrieved by reference rather than duplicated."*

Our know-how is shared across roles — Compliance Guidelines is read by four skills across two roles,
Strategy Basis by four. **Splitting into six areas would duplicate the knowledge or fragment its
governance**, which is the thing a area exists to prevent. So: one area, six roles inside it, and
one agent per role.

**Capabilities, data scope and limits are declared per skill binding, and Competitive Analysis is the
reason.** That role's `landscape-mapping` and `deep-dive` bindings hold `search` and `retrieve` while `synthesis` —
**the same role, the same agent** — holds `[]`, which is what makes *every synthesis element came from
research that passed through a card* a declaration a check can read rather than a sentence. It is not
withheld at run time: all four bindings run in one wrapper that holds `fetch` and `websearch` (§4a,
R4.3-8), so the synthesis step is instructed to work from the cards. Declared once for the agent, that
split is unexpressible, and the boundary could only be asserted in prose. **An isolation boundary has
to be declarable where the work happens** (Blueprint §4.3, criterion 65) — which is also what carries the
quarantine boundary inside the Opportunity Designer (`hypothesis-designer`), where `material-intake` runs with `[]` beside three other bindings, and the
Business Analyst, where `prd` holds `[]` beside `repo_write` and `jira_write`. **That per-binding
declaration is the only place the intake boundary is expressed**, because one agent runs stage 2, so
intake's narrower capability list shares that agent's host unit, which is why R4.3-8 below is unsatisfied.

---

## 2. Knowledge

```yaml
area: discovery
owner: igor.tadic
knowledge:
  bodies:                          # twenty-two; six of them in know-how/compliance/
    - brief-fields
    - opportunity-framing
    - evidence-standards
    - competitive-analysis-standards
    - strategy-basis
    - stage-1-shapes
    - stage-3-shapes
    - stage-4-shapes
    - compliance-guidelines
    - area-compliance
    - area-gdpr
    - area-legal
    - area-ict-security
    - screening-inputs
    - prd-template
    - input-elicitation
    - initiative-template
    - method-canon
    - discovery-craft
    - agent-interaction
    - output-voice
    - documentation-standards
  write_access: human_approved_only    # no automated writer, ever
  retrieval: entitlement_filtered      # fails closed on anything unclassifiable
roster:                                # six agents; seventeen skill bindings across them — §3
  - product-manager
  - hypothesis-designer
  - competitive-analysis
  - business-analyst
  - methodology-coach
  - workflow-support
promotion:
  local_to_shared: requires_named_owner_approval
  strip_identifying: true               # AB-65 — remove team/person-specific detail before promotion
budget:                                 # AB-38 — declared placeholder, NOT active
  scope: area:discovery
  ceiling: null                         # unenforceable on Copilot (no per-run cost); Engineering enforces
  owner: igor.tadic
  status: declared_inactive
```

**Rules** (Blueprint §4.1)
- **Shared knowledge is modified only through a human-approved process.** No agent or skill may write to it.
- **Retrieval fails closed.** Anything that cannot be classified is not returned.
- **Promotion of a local improvement into shared knowledge requires a named owner's approval.**

> **Entitlement-filtered retrieval is a transferred requirement, not a live property (AB-65).** The
> `entitlement_filtered` value names a fail-closed control Engineering must implement before any sensitive
> corpus is wired into a retrieval path; the PoC's know-how is repository files with no per-requester filter
> and does not provide it. Promotion carries a `strip_identifying` step so team- or person-specific
> detail is removed before anything is promoted beyond its local scope (§11.2).
>
> **Human-only write is declared and instructed, not withheld.** Every producing agent holds `editFiles`,
> so nothing stops it editing a know-how file; a changed copy under `.github/know-how/` fails `C41` against
> its original, and `C41` is a repository check, so it runs at no stage gate.

---

## 3. Roster — six agents, seventeen skill bindings

**One agent per role, each binding one or more skills** (Blueprint §4.3). **Capabilities, data scope and
limits are declared per binding, never once for the agent** (criterion 65), and each agent declares a
**capability ceiling** — the union of its bindings, which no binding may exceed and which is the single
line a reviewer reads to see a role's total reach.

The agent registry, `.github/registry/agents.yaml`, is the authority on what each binding declares.

| Agent · role · ceiling | Binds skill | Capabilities at this binding | Egress |
|---|---|---|---|
| **`product-manager`** — Product Manager<br>`capability_ceiling: []` | `brief-creation@0.1` | `[]` — conversation only. It elicits; it never fetches | — |
| | `ideation@0.1` | `[]` — **and it carries the compliance screening.** It reads the area cards and reaches nothing: it examines a solution against a list somebody else wrote | — |
| | `mvp-option-design@0.1` | `[]` | — |
| | `mvp-expansion@0.1` | `[]` | — |
| **`hypothesis-designer`** — Opportunity Designer<br>`capability_ceiling: []` | `material-intake@0.1` | **`[]` — the quarantine boundary**, fixed by pattern `quarantined-extract` | — |
| | `hypothesis-authoring@0.1` | `[]` — and **`data_scope` excludes A2**, the other half of the boundary, declared in the registry and not withheld by the wrapper | — |
| | `opportunity-framing@0.1` | `[]` — conversation and the run's own files. **`data_scope` excludes A2 and A2b**, so the boundary is declared one step further out, and likewise not withheld | — |
| | `prioritisation@0.1` | `[]` | — |
| **`competitive-analysis`** — Competitive Analysis<br>`capability_ceiling: [search, retrieve]` | `landscape-mapping@0.1` | `[search, retrieve]` — **outward** | the search provider `egress.yaml` names · fetch reaches any public page · no host list |
| | `market-content-extract@0.1` | **`[]` — the quarantine bridge**, fixed by pattern `quarantined-extract`: it turns fetched page text into structured facts and reaches nothing | — |
| | `deep-dive@0.1` | `[search, retrieve]` — **outward** | the search provider `egress.yaml` names · fetch reaches any public page · no host list |
| | `synthesis@0.1` | `[]` — works on the cards, not the market | — |
| **`business-analyst`** — Business Analyst<br>`capability_ceiling: [repo_write, jira_write]` | `prd@0.1` | `[]` — authors from the run; reaches nothing | — |
| | `initiative-authoring@0.1` | `[repo_write]` — the initiative path convention, inside the pilot's own repository | — (internal) |
| | `initiative-propagation@0.1` | `[jira_write]` — the only write outside the repository | `<the Jira host>` · deny-by-default · **parked, and unfillable until the host is named** |
| **`methodology-coach`** — Methodology Coach<br>`capability_ceiling: []` | `methodology-guidance@0.1` | `[]` — the **price of the unlimited read scope**, not a convenience | — |
| **`workflow-support`** — Workflow Support<br>`capability_ceiling: []` | `workflow-support@0.1` | `[]` — it reads the run's record and changes nothing; `editFiles` has no path scope here, so an agent that could edit one file could edit every file | — |

**Four of the seventeen bindings hold any capability at all, and only two of them reach outward** —
`landscape-mapping` and `deep-dive`, both `[search, retrieve]`, both on one agent. The other two write into a
system of record: `initiative-authoring` (`repo_write`, inside the pilot's own repository) and
`initiative-propagation` (`jira_write`, outside it). The remaining thirteen bindings are conversation and
files. **Four of the six agents carry an empty ceiling**, so no binding under them can acquire a
capability without the ceiling changing first — one line, one review.

That concentration is the point — it is a short list to review and a short list to revoke. **These are the
declared lists.** Copilot grants tools per agent, so a binding declared `[]` runs with its agent's wrapper
grant; where that grant allows what the declaration forbids, the agent is instructed not to use it (§4a,
R4.3-8).

> **Whether `repo_write` counts as *external* is an open question (§6).** One reading treats the repository
> as the pilot's own substrate and `repo_write` as internal; the other counts it among the capability-holders.
> **The count is not what is disputed — four bindings hold a capability and two reach outward on either
> reading — the *classification* is.** `egress` is declared on destination rather
> than on externality, which is what §4 says, so nothing in the table above waits on the answer.

**The role is the agent.** A Product Manager talks to "the Product Manager"; the workflow routes to whichever
of that agent's bindings is due, and every workflow step still names an agent **and** a skill
(Blueprint §4.4).

**The quarantine bridge is built.** The `quarantined-extract` bridge between fetch and card authoring is
`market-content-extract@0.1`, empty capabilities, on the `competitive-analysis` agent.
**`agents.yaml` marks all seventeen bindings built, and `skills.yaml` marks `initiative-propagation`
parked**: it cannot run until the Jira host it writes to is named.

---

## 4. What every agent declares

Per Blueprint §4.3, which binds two things to the agent and everything that governs what work may reach to
the skill binding. **This section says what the registries declare, and names each field the blueprint
asks for that no registry here carries**, because a field described as declared and held nowhere is a
control nobody can check.

### At the agent

**`agents.yaml` declares, on all six:**

- **`id`** · **`name`** · **`area`** — `discovery` on all six
- **`owner`** — a named accountable person: Igor Tadic
- **`modes`** — `discovery` on all six, and `free-roam` on the four agents that own a stage
- **`capability_ceiling`** — the union of the bindings. **No binding may exceed it**, and it is the one
  line a reviewer reads to see the role's total reach. `[]` on `product-manager`, `hypothesis-designer`,
  `methodology-coach` and `workflow-support`; `[search, retrieve]` on `competitive-analysis`;
  `[repo_write, jira_write]` on `business-analyst`
- **`bindings`** — **one or more**, each governed separately. **No method field**: the method lives in the
  skill, and the registry has nowhere to express one (criterion 2)

**No registry here declares `on_breach`**, which the blueprint puts at the agent.

### At each skill binding

Declared per binding and **never once for the agent** (Blueprint §4.3, criterion 65). A binding whose
pattern requires an empty capability list keeps one even when it sits beside a binding that holds tools.

**`agents.yaml` declares, on all seventeen bindings:**

- **`skill`** — exactly one per binding, version-pinned
- **`capabilities`** — a closed list, **at this binding**. Nothing outside it is permitted, and a
  capability that widens on request is not a closed list
- **`pattern`** — from the approved catalogue, including the [SPOCK area extension](./PATTERN-CATALOGUE.md).
  Per binding, so a second execution shape is declared at a second binding of a skill rather than as a
  second pattern on one skill

**And `data_scope` on six of them** — which artifacts and know-how the binding may read, on
`brief-creation`, `material-intake`, `hypothesis-authoring`, `opportunity-framing`, `prioritisation` and
`initiative-authoring`. It is declared only in the registry: `hypothesis-authoring` excludes A2 and
`initiative-authoring` excludes A12, and the agent running either can still read any file in the
repository, so the scope is what the agent is instructed to read, not a limit the substrate enforces.

**`skills.yaml` declares, on all seventeen skills:**

- **`execution: { family, model }`** — the model family and the pinned model
- **`bounds`** — the skill's effort bounds. The producer is instructed to record reaching one, in `bounds_hit`
  on its production record, because silent truncation is what a bound exists to prevent; no script reads the
  declared bounds
- **`evaluation`** — the path to the skill's held-out suite, under `quality`. The Blueprint accepts no
  skill without one (§5.2); four skills have none and state why in `evaluation_absent`, which `C105`, a
  repository check, accepts

**Egress is declared once, in `egress.yaml`, and on no binding.** It names the approved destination and the
regime in force, which is open by default and to be narrowed later: nothing restricts a binding to a list of hosts. A capability says which tool may be used and nothing about where that
tool may connect, which is why the destination is declared apart from the capability list.

**No registry here declares `skill_integrity`, `limits`, `effort`, `on_contract_failure` or
`configuration`**, which the blueprint asks for at the binding. §4a says where the pilot stands on the rules
behind them.

### Area defaults

| | Value | Note |
|---|---|---|
| `model` | family `anthropic-claude`, pin `claude-sonnet-5` | **Declared on all seventeen skills in `skills.yaml` as `execution: { family, model }`, and C47 validates both.** `family` is the governed word (R5.3-2 constrains it), and `model` is the pin (AB-53 re-derives against it). **The pin is held in the registry because a pin held only in the agent files cannot require a checker to differ from a producer.** No binding overrides the family or the pin |
| `on_breach` | `stop_and_record`, **declared by no registry** | The blueprint puts it at the agent. No registry here carries the field, so nothing a check reads declares it |
| `on_contract_failure` | `retry_with_feedback (max 2) → stop_and_record`, **decided and declared by no registry** | At the binding, terminal per §6.6. **The bounded form was chosen over the bare `retry_with_feedback`, which names no terminal state (AB-13)**, and no binding in the registries carries the field |
| `max_cost_eur` | **declared by no registry, and not enforceable on this substrate** | Copilot exposes no per-run cost, so a spend cap here would be a constraint nothing measures |
| `model` re-derivation | cadence ≤ 30 days · owner · withdraw-on-failure · **not performable yet** | **AB-53.** A Copilot-hosted model can change behind an unchanged identifier, so the blueprint requires assurance re-derived on a stated cadence (at most every 30 days) with a named owner, and a re-derivation that fails or does not run within the interval withdraws the agent from delivery-stage use. `assurance.yaml` declares the cadence and the owner (Igor Tadic, pending an Engineering owner) and records the subject as `not_performable`, so no re-derivation runs and nothing is withdrawn. Enforcement transfers to Engineering |

> **`max_cost_eur` is a constraint, and §5.4 says no constraint scales.** We cannot enforce it in Copilot.
> Declaring no cap and saying why is the honest disposition; claiming a spend cap we cannot measure would be
> the dishonest one. **It transfers to Engineering as a named requirement.**

---

## 4a. What Blueprint v2.1 §4.3 added, and what the pilot does about each

The repository pins **v2.1**. §4.1 is unchanged in substance from v1.4 — shared knowledge is
human-write-only, retrieval fails closed, promotion needs a named owner — so §2 stands as written.
**§4.3 gained six numbered rules and a memory block**, and each one's position here is stated rather than
assumed, because a rule nobody placed reads as satisfied.

| v2.1 rule | Where the pilot stands |
|---|---|
| **R4.3-7** — the integrity fingerprint is **recomputed and compared** before acceptance and at every build; *a fingerprint that is carried and never compared detects nothing* | **Not satisfied.** No binding declares `skill_integrity`, and **nothing computes or compares a fingerprint** |
| **R4.3-8** — where the host cannot express a capability list per binding, a binding whose list is narrower than the union is **carried by a separate host unit** | **Not satisfied, by decision.** One agent runs stage 2, so intake's narrower capability list shares that agent's host unit and a person picks once. Copilot declares tools per agent, so the `material-intake` binding runs inside a host unit granted `editFiles`, `runTask` and `getTaskOutput`, which is what this rule exists to prevent. **The boundary rests on the declared task list and the name a person types on an acceptance**, and it is recorded as unsatisfied rather than argued into compliance. **`competitive-analysis` has the same gap:** its four bindings mix `[search, retrieve]` with `[]`, so the quarantine bridge and the synthesis run inside a file granted fetch. This row and the substrate mapping's `reason` in `agents.yaml` declare the gap |
| **R4.3-9** — the execution block carries the pinned model, bounded effort and the failure disposition, **and nothing else** | **Divergent, and named here rather than left to a reader.** The block carries `family` and `model`, and neither effort nor a failure disposition. `family` is there because R5.3-2 governs it and independence is decided on it; it is a non-prose value and expresses no method, which is what the rule protects |
| **R4.3-10** — `on_contract_failure` is mandatory at the binding, and its permitted values are declared by the skill's `execution_bounds` | **Not satisfied.** No binding declares `on_contract_failure` and no skill declares `execution_bounds`, so the permitted set is a decision rather than a declaration a check can read |
| **R4.3-11** — a setting left unset resolves to the skill's declared default and does not alter the identity of the build | **Not reached.** No binding leaves a governed setting unset today |
| **memory** — the agent's half of the two-tier memory: craft only, distilled from records, eval-gated, and never able to change obligations, permissions, limits, gates or retention | **Absent by design, and worth saying so.** No agent here declares a memory block and none accumulates anything across runs. The durable memory this pilot has is the competitor store (S1), which is an artifact under §6.15 and not an agent's craft memory |

**The area registers no tenant, and R8.1-2 says an agent that does not resolve to exactly one registered
tenant is not deployed.** Nothing in this repository names a tenant — not this document, not
`agents.yaml`, not the workflow contracts. **For a proof of concept that deploys nothing, that is very
likely correct**, and it is recorded nowhere as a choice, which is the state this repository calls a gap
with no owner rather than a decision. It is an open question in §6.

---

## 5. Quality — what applies to every binding in the roster

Per Blueprint §5. These are area-wide and not restated per role, and where the pilot does not meet one the
line says so.

- **A skill needs a held-out evaluation suite** (§5.2), derived from that skill's declared quality rules. Four
  skills have none and state why in the registry, which `C105` accepts
- **Each case is graded by the cheapest instrument that can decide it** — deterministic first, judged only where a rule is not mechanically checkable, repeated trials where the question is reliability
- **A judged case is a rubric of separate yes-or-no questions, never a numeric score** (§5.2). A score hides which criterion failed and invites a passing threshold, which turns a measurement into a constraint
- **The independent checker runs on a different model family than the producer, and can stop the work** (§5.3). A verifier that cannot block is not a control. **None is configured** (`assurance.yaml`, `state: absent`), so the judged half of every gate does not run
- **Constraints halt at every stage and never scale** (§5.4) — schema, the quarantine boundary, capability and data-scope limits, obligations. Only measurements vary by stage. Here schema is checked at every gate, while the quarantine boundary and the data-scope limits are declared and instructed (§3, §4a)
- **The workflow carries its own assurance, separate from its skills'** (§5.5) — goal-level cases plus automatic edge checking. Edge checking is built (`C48`, a repository check: every step's edges connect from brief to initiative); the goal-level suite is not, so the goal tier is not graded

> **§5.5 is the one most easily skipped and the one this pilot most needs.** Seven stages at 95 per cent
> each is roughly 70 per cent end to end. Per-skill evals cannot see that; only workflow-level assurance
> can.

---

## 6. Open

| # | Question | Effect |
|---|---|---|
| **D-a** | **Entitlement-filtered retrieval is not implemented.** Recommendation: acceptable for the PoC, **required before the problem corpus carries sensitive research** — which this project already holds | Blueprint §4.1 requires it; we declare the gap |
| **D-b** | **`max_cost_eur` unenforceable on Copilot.** Recommendation: declare per binding, record as a known gap, transfer as a requirement | A constraint we cannot enforce is a constraint in name only |
| **D-c** | **The independent checker needs a second model family** (§5.3). Copilot offers model choice; which families are enabled is an administrator setting. **Decide it: enable one, use a sampled human check, or accept the gap** | Without it, judged evals are self-assessment |
| **D-e** | **Is `repo_write` an external capability?** One reading says no; the other counts it among the capability-holders. The **count** is settled in §3 — four bindings hold a capability, two reach outward — and what remains is the classification. Recommendation: **`repo_write` is internal, `jira_write` is not** — the repository is the pilot's own substrate and Jira is a third-party host — **and `egress` is declared on destination, not on externality**, which is what §4 says | A classification stated two ways in one register. Not a live disagreement about which binding holds what |
| **D-j** | **This pilot registers no tenant anywhere**, and R8.1-2 says an agent that does not resolve to exactly one registered tenant is not deployed. Recommendation: **record it as correct for a proof of concept that deploys nothing**, and name the tenant at the same moment the pilot acquires a deployment target. What is refused is leaving it unstated | A rule the build satisfies by accident reads the same as one it fails |
| **D-f** | **No binding declares `skill_integrity`, and nothing computes or compares a fingerprint.** v2.1's R4.3-7 requires the fingerprint to be recomputed and compared before acceptance and at every build, so declaring the field alone would satisfy nothing | R4.3-7 is not satisfied (§4a) |
| **D-g** | **The failure disposition is decided and declared nowhere.** The bounded `retry_with_feedback (max 2) → stop_and_record` is preferred over the bare form, which names no terminal state (AB-13). No binding in the registries carries `on_contract_failure`, and R4.3-10 makes it mandatory at the binding | R4.3-10 is not satisfied (§4a) |
| **D-h** | **The parent contract declares none of the Blueprint's governance fields.** Its §9 and §9.1 give agent, skills, reads, writes and know-how, and declare no per-binding capability list, no `capability_ceiling`, no `skill_integrity`, no `on_breach`, no `egress` and no stage class. Recommendation: **the parent is the business logic and need not carry the governance schema**, and one Discovery-level `workflow_assurance` and stage-class declaration are owed to it | The parent reads as conformant because it is silent, not because it agrees |
