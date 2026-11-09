# SPOCK | Agent Blueprint
### The target structure for building governed agents
**Version:** 2.1 · **Date:** 6 August 2026
**Document type:** Specification
**Intended readership:** Engineering and solution architecture
**Status:** For review

---
## 1. Purpose and scope
This document specifies the structure a governed agent system should have. It is written as a target-state specification rather than as a set of changes. It describes each element, what it is for, and how it should look, with worked examples throughout.

It covers what an agent is, what a skill is, how quality is established, how boundaries are enforced, what is recorded, where it is deployed, how documents are assembled from what it records, and how compliance obligations attach to work. How work is sequenced and permitted to advance belongs to the Workflow Blueprint. It does not prescribe specific technologies. Examples are illustrative and show the intended shape.

**This document is one of three, and they are read together.** This one specifies what a governed **agent and skill** must be. It also carries deployment and the documentation model, both of which moved here from the System Blueprint, which now carries no rules. The **Workflow Blueprint** specifies how work is composed, staged and advanced — order, gates, readiness and control. The **SPOCK System Blueprint** is the strategic account of the set, written for a mixed senior readership, and carries no conformance criteria. Where a rule here names a workflow, it is defined in the Workflow Blueprint and cited by name rather than restated.

**How to read it.** Sections 2 to 4 define the structure. Sections 5 to 11 define the guarantees that structure must provide. Section 12 describes the lifecycle. Section 13 is a conformance checklist for assessing whether an implementation meets the specification.

A single worked example, a market-analysis agent, runs through the whole document so the elements can be seen to fit together.

**Execution assumption.** This specification describes agents and skills that perform one job with a defined input and a defined output, within hard caps, and then stop. That assumption is load-bearing: it is why context management does not appear here. An agent that loops, runs continuously, or accumulates working context across many turns requires context management (compaction, externalised notes, scoped context editing) that is outside this scope, and it should not be built until that machinery is specified.

**Conversational use is outside this specification.** An agent invoked to hold an open-ended dialogue — exploring a topic, refining an idea across many turns — accumulates working context by definition and falls outside the assumption above. What governs such use, and how a person moves between it and a governed process, are legitimate questions that this specification does not answer.

A single invocation of a skill that performs one job and stops is **not** conversational use in this sense, however it was triggered. It is governed exactly as any other step (Workflow Blueprint).

**What this specification deliberately does not cover.** It specifies what a governed agent must *be*, not the machinery that produces one. The authoring surface, the intake questionnaire that gathers a new agent's requirements, the classification of agents into maturity states, and the mechanism by which a capability proven in one team is generalised into a shared library are all properties of the builder rather than of the built agent. They are legitimate subjects for a separate specification. Section 11.2 states the *governance* a promotion must satisfy; it does not describe the tooling that performs one.

---
## 2. Principles
These eleven principles determine every structural decision that follows. Where a later rule seems arbitrary, its justification is here.

- **Controls are enforced, not described.** A control is real only when something performs it and can refuse to continue. A rule written in guidance is an intention; a rule the system cannot proceed without is a control.

- **Determinism first.** Work is resolved at the most deterministic level available: a cached result, a fixed rule, a direct lookup, or plain computation. The underlying model is used only where genuine judgement is required.

- **Nothing certifies itself.** The component that produces work never confirms its own quality or compliance. Verification is performed by something independent of the producer.

- **Every action leaves a record.** One permanent, append-only record per meaningful action, produced as a by-product of the work rather than as a separate reporting step. Corrections append; they never overwrite.

- **R2-1** **Structure is machine-checkable.** Definitions are structured data validated against a schema, so a non-conforming definition is rejected automatically rather than relying on a reviewer to notice.

- **Judgement selects; it does not invent.** An adaptive process may choose among pre-approved paths and stop for a person. It may not create a new step or bypass a gate while running.

- **Some checks are absolute.** Compliance clearance and required human confirmation block advancement outright. They cannot be offset by other passing checks.

- **Oversight scales with consequence.** The more irreversible an action, the more a human decision is required. Low-consequence work proceeds automatically.

- **R2-2** **Craft may be learned; rules may not.** Improvement may change how well a skill performs its job. It may never change obligations, permissions, limits, gate definitions, process rails or retention rules.

- **Fail visibly.** A failure is surfaced, recorded and escalated. It is never converted into a plausible-looking result.

- **Craft is sourced, never invented.** A skill's method is authored by the people accountable for the discipline, or encoded from an existing proven practice. It is never generated by a model. Generation is permitted only for mechanical scaffolding, never for the method itself. If a method cannot be sourced, no agent is produced.

---
## 3. Architecture overview

```
                         AREA
        shared knowledge · roster · governance
                          │
                   ┌──────┴──────┐
                 AGENT          AGENT           roles: identity, ownership,
             (a role, thin)  (a role, thin)     permissions, no business logic
                   │              │
                   └──────┬───────┘
                        SKILL                    the unit of work and of governance
        contract · method · knowledge · obligations
              · record · quality
                          │
                       WORKFLOW                  order and gates — shown here
        which agent runs which skill, in what     because a skill runs inside one
        order, with what evidence between steps

  CATALOGUE   registers every governed artifact with owner, version and status
```

Two disciplines run through every element. **Accountability:** every action produces a record, documents are assembled from records, and nothing is recorded without a trace. **Compliance:** applicable obligations are attached before a step and independently proven after it.

---
## 4. The building blocks

### 4.1 Area
An area owns shared reference knowledge and a roster of agents. It performs no work itself. It exists so that knowledge is held once, governed once, and retrieved by reference rather than duplicated into every agent.

**Rules**
- Shared knowledge is modified only through a human-approved process. No agent or skill may write to it.
- Retrieval is filtered by the entitlements of the person on whose behalf the work is being done, and fails closed on anything that cannot be classified.
- Promotion of a local improvement into shared knowledge requires approval by a named owner.

```yaml
area: market-intelligence
owner: area-lead@bank.example
knowledge:
  index: market-intelligence-index
  write_access: human_approved_only      # no automated writer, ever
  retrieval: entitlement_filtered        # filtered per requester; fails closed
roster:
  - market-analysis
  - competitor-profiling
  - opportunity-assessment
  - analysis-synthesiser
  - source-intake
promotion:
  local_to_shared: requires_named_owner_approval
```

### 4.2 Skill, the unit of work and of governance
A skill performs one narrow, well-defined job. It is the unit that is versioned, evaluated, governed and recorded, because it is the unit that does the work. Agents reuse skills. Skills are never copied.

**R4.2-1** Every skill declares six parts. Only the second is the work itself. The other five are the governance that travels with it.

```yaml
skill: market-analysis
version: 1.3.0
integrity: sha256:9f2c8a…                 # whole artifact, canonical form, excluding this field
owner: area-lead@bank.example
area: market-intelligence
floor: conduct-floor@1.0.0                # §4.7

# 1. CONTRACT: what goes in, what comes out, what is excluded
contract:
  inputs:
    - { name: market, type: string, required: true }
    - { name: region, type: string, required: true }
    - { name: facts,  type: source-facts, required: true }   # quarantined external facts (section 6.2)
  output:
    sections: [summary, market_size, competitors, opportunities]
    competitors: { type: table, min_rows: 5, max_rows: 10 }
  excludes:
    - "regulatory interpretation, owned by the compliance-analysis skill"
  on_unclassifiable_input: stop_and_escalate    # §6.6

# 2. METHOD: the one job, stated once
method: |
  <the analytical method for producing a market analysis>

# 3. KNOWLEDGE: what may be retrieved, from where, under what filter
knowledge:
  sources: [market-intelligence-index, approved_external_search]
  filter: requester_entitlements
  limits: { max_documents: 40 }

# 4. OBLIGATIONS: what compliance applies, and what proof is required
obligations:
  applies_when: { data_class: personal }
  required_proof: compliance_engine_stamp
  human_gate: none                        # scaled by consequence, see section 9

# 5. RECORD: what this skill must leave behind
record:
  type: market-scan
  links: [derives_from, verifies]
  requires: [cost, versions, rationale]

# 6. QUALITY: what "good" means, and who decides
quality:
  rules:
    - every claim references a source
    - summary is 300 words or fewer
    - at least `min_sources` distinct sources cited     # tracks the tailored bound
  evaluation: skills/market-analysis/evals/
  evaluator: independent                  # see section 5.3
  limits: { max_cost_eur: 2.50 }

# tailoring: the only values an agent may vary, and their bounds
adjustable:
  min_sources: { type: integer, minimum: 8, maximum: 25, default: 8 }

# execution bounds: the permitted values a binding's execution block may take (4.3)
execution_bounds:
  effort:              { permitted: [low, medium, high], default: medium }
  on_contract_failure: { permitted: [retry_with_feedback, stop_and_record],
                         required: true }       # §4.3

# PATTERN: the execution shape, from the approved catalogue (section 4.6)
pattern: research-loop

# MEMORY: this skill's half of the two-tier learning memory (section 11)
memory:
  episodic:   case bank of past runs, distilled from records
  procedural: craft improvements to how the method executes
  write: eval-gated; a change is kept only if it beats the held-out cases
  read: just-in-time and scoped, never preloaded
  immutable: [contract, obligations, quality rules]     # the rule parts never learn
```

**Rules**
- **R4.2-2** One job per skill. Anything out of scope is named explicitly, together with the skill that owns it.
- **R4.2-3** The skill is versioned and fingerprinted. The fingerprint covers the **whole artifact** — not the method alone, because the contract, obligations, quality rules and knowledge sources are as governing as the method and as worth protecting from an in-place edit. It is never edited in place. A change produces a new version.
- **R4.2-4** **The canonical form is a registered artifact** (section 4.5), owned and versioned, and it is pinned in provenance alongside the skill. It fixes how an artifact is serialised before hashing — key order, whitespace inside block scalars, and the exclusion of the `integrity` field itself, which cannot be inside the value it holds. Without it two honest implementations compute different fingerprints for the same skill, and a change of canonicaliser is indistinguishable from tampering: every hash mismatches at once, and the remedy — recompute and re-store — is the same action an in-place edit would demand.
- **R4.2-5** The skill declares the **floor it was authored against**, so a change on either side re-opens the review in section 4.7.
- **R4.2-6** The method is **authored by the accountable discipline owners**, in practice the area lead together with a central authoring function, with the rule parts (contract and obligations) centrally reviewed. It is never model-generated.
- Cross-cutting instructions common to all skills are applied at run time, not written into each skill. What is applied, in what order, and under what stability guarantee is specified in section 4.7.
- **R4.2-7** The skill declares a **pattern** from the approved catalogue, and must satisfy that pattern's required fields.

### 4.3 Agent, a role rather than a worker
An agent is a role. It declares who it is, who is accountable for it, what it may use, and what it may not do. It contains no business logic. The method lives in the skill it binds. This keeps agents cheap to create and concentrates governance where the work happens.

```yaml
agent: market-analysis
role: "Market analysis specialist"
owner: area-lead@bank.example           # a named, accountable person
area: market-intelligence

skills:                                   # one or more; every binding is governed separately
  - skill: market-analysis@1.3.0          # version-pinned
    skill_integrity: sha256:9f2c8a…       # §4.2
    capabilities: [web_search]            # closed list for THIS binding; nothing else permitted
    data_scope: [market_research, public_filings]
    limits:
      max_steps: 12
      max_attempts: 2                     # this binding retries; §6.5
      max_cost_eur: 2.50
      max_wall_time_s: 800
    configuration:                        # only keys the skill declares adjustable
      min_sources: 8                      # within the skill's declared bounds
    execution:                            # §4.3
      model: <model identifier + version> # a declared, pinned dependency (section 7.4)
      effort: medium                      # from the declared permitted set
      on_contract_failure: retry_with_feedback   # bounded, then stops — section 6.6

  - skill: source-extract@1.0.0           # quarantined-extract: the pattern fixes the list (§4.6)
    skill_integrity: sha256:3b71d4…
    capabilities: []                      # §4.3
    data_scope: [untrusted_input]
    limits: { max_steps: 4, max_wall_time_s: 120 }
    execution: { model: <model identifier + version>, effort: low,
                 on_contract_failure: stop_and_record }

capability_ceiling: [web_search]          # the union of the bindings; none may exceed it
on_breach: stop_and_record

memory:                                   # the agent's half of the two-tier memory
  scope: craft_only                       # this role's durable judgment and preferences
  source: distilled from this agent's records, never authored directly
  read: just-in-time and scoped, never preloaded
  write: eval-gated; local by default, organisation-wide only by promotion (section 11)
  may_not_change: [obligations, permissions, limits, gates, retention]
```

**Rules**
- **R4.3-1** An agent binds **one or more skills**, each version-pinned and fingerprinted.
- **R4.3-2** An agent carries no method field. The schema makes a method impossible to express here.
- **R4.3-3** **Capabilities, data scope and limits are declared per skill binding, never once for the agent.** A skill whose pattern requires it to run without tools keeps an empty list even when it is bound beside a skill that has them. This is what makes an isolation boundary enforceable *inside* a role rather than only between roles — and a boundary that cannot be declared where the work happens is a boundary in name only.
- **R4.3-4** The agent declares a **capability ceiling**: the union of its bindings. No binding may exceed it, and it is the single line a reviewer reads to see the role's total reach.
- **One skill may be bound by many agents.** Skills are reused, never copied — the same method, tailored differently at each binding within the bounds the skill declares.
- **R4.3-5** Every agent has a named human owner.
- **R4.3-6** A binding's configuration may contain only keys the bound skill declares as adjustable, within the declared bounds. An empty configuration produces behaviour identical to the untailored skill.
- Capabilities and data scope are enforced at run time, as set out in section 6.
- **R4.3-7** **Every binding's integrity fingerprint is recomputed under the pinned canonical form and compared against the bound skill before the definition is accepted**, and again at every build (section 7.4). A mismatch rejects the binding. A fingerprint that is carried and never compared detects nothing.
- **R4.3-8** **Where the host enforces its own capability list, that projection is checked before acceptance**: no binding may run under a list wider than the capabilities it declares. A capability the host does not enforce is not counted as enforced. **Where the host cannot express a list per binding**, any binding whose declared list is narrower than the union is carried by a separate host unit, so the in-role isolation R4.3-3 establishes survives the projection. A host that can hold only one list per unit does not remove the boundary; it decides how many units the role is deployed as.
- **R4.3-9** **The execution block carries three things and nothing else:** the pinned model, bounded effort settings drawn from a declared permitted set, and the safe-failure disposition (section 6.6). All carry non-prose value types. They govern how hard the model runs and what happens when it fails, never what method it runs. No method text, instruction or persona may be expressed through them; an execution block is not an authoring surface.
- **R4.3-10** **The binding declares `on_contract_failure`, and it is mandatory rather than defaultable.** A binding declaring none is rejected: a silent platform default is the one case where a failure is handled by nobody's decision. Its permitted values and the absence of a default are declared by the skill's `execution_bounds` (section 4.2). The other safe-failure disposition section 6.6 defines, `on_unclassifiable_input`, is a property of the skill's contract rather than of a binding and is declared on the skill.
- **The model is a pinned dependency, not an ambient default.** It is declared here, carried in provenance, and written into every record. Changing it is a new version of the agent, and the assurance evidence is regenerated against the model actually in use.
- **R4.3-11** A setting left unset resolves to the skill's declared default and does not alter the identity of the build.

### 4.5 Catalogue
The catalogue registers every governed artifact. It supports discovery, enforces reuse before creation, and records ownership.

```yaml
# one register per kind of governed artifact:
#   agents · skills · workflows · areas · tenants · schemas · patterns · floors ·
#   budgets · artifact-types · record-types · governed-subsets ·
#   canonical-forms · trace-attribute-sets · exemptions
#   ("artifact-types" registers each type an agent may produce, and its class)
- id: market-analysis
  type: skill
  path: skills/market-analysis/
  version: 1.3.0
  owner: area-lead@bank.example
  status: active
  triggers: ["analyse a market", "market sizing"]
```

**Exemptions are themselves artifacts.** Where a rule cannot be met — an artifact whose own format cannot carry a version field, a host field outside the governed subset — the exception is not a note in a comment. It is registered:

```yaml
exemption: workflow-yaml-no-version
type:      exemption
applies_to: registry/workflows.yaml
rule:      "every registered artifact declares its version"
reason:    "the file format rejects unknown top-level keys"
owner:     platform-owner@bank.example
reviewer_ref: person#0203               # not the owner
expires:   2027-02-01
status:    active
```

An exemption that its own owner may grant and judge is not a control, and one with no expiry outlives the constraint that produced it — a connector is upgraded, the format gains the field, and the exemption remains because nothing was ever going to revisit it.

**Rules**
- **R4.5-1** Every governed artifact is registered, with owner, version and status.
- **R4.5-2** References resolve through the catalogue. A reference to an unregistered artifact fails validation.
- **R4.5-3** **Every artifact is validated against its registered schema before it is accepted**, and a non-conforming artifact is rejected automatically rather than flagged for a reviewer. A schema that is registered and never applied states the rules twice and enforces them nowhere.
- **R4.5-4** **The schema check runs over the declared governed subset** — the fields this specification governs — so fields a host injects into the same file are validated as out of scope rather than failing a conforming definition. That subset is registered and owned, and may never exclude method, floor, capabilities, permissions, limits or pinned versions.
- **R4.5-5** **A version recorded in a register resolves, before acceptance, to an artifact declaring that version.** A register that records a version nothing compares is a claim, not a record.
- A new skill may be created only after the catalogue has been searched for an existing one.
- **R4.5-6** An exemption is registered, owned, reviewed by someone other than its owner, carries an expiry, names the rule it excepts, and is reported on every run rather than skipped silently. An expired exemption fails validation like any other unresolved reference.
- **A coverage check is not a registered artifact.** Checks are numerous and change constantly, and R5.4-1 already governs each one more strongly than an owner field would — every check carries a case proving it refuses a known-bad input, and a check that stops firing fails that case. Registering them would buy a name and cost an owner per check.

### 4.6 Patterns
Skills and workflows execute in a small number of recurring shapes. Naming those shapes, and registering them, makes agents comparable to each other, gives reviewers a per-shape checklist, and lets the schema enforce requirements that would otherwise rely on someone noticing.

A pattern is a **classification of execution shape**. It is not a layer above or below area, agent and skill; it is a property of how a unit of work runs. Skill patterns describe how one unit executes. Workflow patterns describe how units compose.

| Skill pattern | Executes as | Required by the pattern | Characteristic failure |
|---|---|---|---|
| `single-shot` | one pass, no tools | an output contract | output drifts from the contract |
| `research-loop` | repeated retrieval, then synthesis | tool access; an iteration cap | loops without converging |
| `critique` | evaluates an artifact it did not produce | no tools; a different actor from the producer | rubber-stamping |
| `quarantined-extract` | reduces untrusted input to structured facts | **empty capability list; a fixed output schema** | raw text reaching a privileged step |
| `synthesis` | combines several upstream products | typed inputs from each upstream step | silently dropping an input |

| Workflow pattern | Composes as | Required by the pattern |
|---|---|---|
| `sequential` | one step after another | typed contract on every edge |
| `gate-then-workers` | a gate, then parallel workers | a join, and a defined partial-failure disposition |
| `gate-then-parallel-then-synthesis` | as above, then a synthesis step | as above, plus typed inputs at the synthesis step |

A workflow may prepend an isolation stage — a `quarantined-extract` step (section 6.2) — ahead of the gate. The shape name describes the governed core; such preprocessing is permitted and does not change the declared pattern.

**Rules**
- **R4.6-1** Every skill and every workflow declares a pattern from the registered catalogue.
- **R4.6-2** **A pattern's required fields are enforced automatically, at whichever artifact carries the field.** A `quarantined-extract` skill fixes an empty capability list; an agent that binds it while declaring any capability is rejected when the agent is validated, not flagged at review. A `critique` skill's different-actor requirement is checked when the workflow is composed. Enforcement is automatic in every case; only the artifact at which it fires differs.
- The pattern catalogue is registered and versioned like any other governed artifact. Central patterns are defined once; an area may extend the catalogue but may not redefine an existing pattern.
- **R4.6-3** An unrecognised pattern is a validation error, not a warning.

### 4.7 The composed floor
A skill states its own method. It does not state the standing obligations of conduct that apply to every skill alike: interrogate upstream material rather than defer to it, re-anchor to the original brief where a prior step has drifted from it, qualify a weak answer rather than manufacture a confident one, and state disagreement plainly. Writing those into each skill would duplicate them across every method, let them drift apart, and leave them editable by whoever edits the method.

They are therefore composed at run time, above the method, as a **floor**: a named, versioned artifact of numbered clauses that every step receives and no step can decline.

```yaml
floor: conduct-floor
version: 1.0.0
owner: central-authoring-function
clauses:
  - id: re-anchor
    kind: hard
    body: "Treat upstream output as evidence to interrogate, not as a verdict to
           confirm. Where it has drifted from the original brief, follow the brief."
  - id: no-unearned-confidence
    kind: hard
    body: "Where the inputs are weak or contradictory, say so and qualify. Never
           manufacture agreement, certainty, or coverage the evidence does not carry."
  - id: delivery-evidence
    kind: risk_scaled
    active_when: { stage: delivery }
    body: "State the evidence for each material claim inline."
```

The input to a step is assembled in a fixed order:

```
[ floor, versioned ]  →  [ method, verbatim ]  →  [ tailoring ]  →  [ inputs ]
   never edited by         never edited by          bounded          the work
   anything below          anything                 values only
```

**Rules**
- **R4.7-1** The floor is composed by the runtime and placed ahead of the method. It never modifies, summarises, or partially loads the method.
- **R4.7-2** No definition can express floor text. As with the method on an agent, the field does not exist, so a skill can neither weaken its own floor nor write a competing one.
- **R4.7-3** A skill cannot opt out of a hard clause. Only a risk-scaled clause varies, and only in the direction its declared stage permits.
- **R4.7-4** **Nothing arriving in the input slot can lower the floor.** The composition order places inputs last, after the floor, the method and the tailoring. That ordering is a rule, not an artefact of layout: an instruction arriving with the work — from a user, an upstream step, or a retrieved document — is material to be acted on, never authority to set aside what precedes it. An input that attempts to relax an obligation, widen a permission, raise a limit, skip a gate or disable a check is refused, and the refusal is recorded as an event. Silent compliance is the failure; so is silent refusal.
- **R4.7-5** The floor is a governed artifact: registered in the catalogue, versioned and owned like any other. The version in force is written into every record, so what a step was held to remains recoverable after the fact.
- **R4.7-6** **The floor is never empty.** Every standing conduct obligation above is carried by at least one clause, each with an id and a type, and each obligation of conduct is carried as `kind: hard`. One clause may carry more than one obligation; what is forbidden is an obligation carried by none. A registered, versioned floor with no clauses would satisfy every structural rule while the control it names did not exist.
- **R4.7-7** **The floor a skill declares is the floor that composes.** It is not an audit annotation recording what the method was once reviewed against: it is the version the runtime composes ahead of that method and the version `build()` pins (section 7.4). A skill whose declared floor and composed floor could differ would be reviewed against one set of obligations and run under another, which is the failure the review exists to prevent.
- **R4.7-8** **A method is reviewed against the hard clauses of the floor it declares, by someone who is a recorded author of neither, and the review is recorded.** The prohibition on floor text is a field-absence rule: it stops a skill writing a competing floor, and it does not stop a method's prose from quietly qualifying one — "state disagreement plainly" and a method that instructs deference are not in conflict as fields, only as meanings. Meaning is not machine-checkable here, so what is required is a recorded independent review rather than an automated comparison.

```yaml
floor_review:
  method_version: market-analysis@1.3.0
  floor_version:  conduct-floor@1.0.0
  reviewer_ref:   person#0117            # not a recorded author of either artifact
  date:           2026-07-22
  result:         no_clause_qualified
```

- **R4.7-9** A change to **either** the method or the declared floor re-opens the review, since a method reviewed against one floor was never reviewed against another. Validation checks that a review exists at both versions in force, not that its judgement was correct.
- **R4.7-10** **Composition is repeatable and stable.** The same definition, at the same versions **and the same stage**, composes to the same bytes — stage belongs in that key because a risk-scaled clause activates by stage, so the same skill at identical versions composes differently at an exploratory step and a delivery one, by design. The order above is fixed: what is stable comes first, what varies comes last. (The framework reserves "deterministic" for fixed step order, so the property is named separately here.)

**Why stability is a requirement rather than an optimisation.** Three things depend on it. Provenance can then assert what a step was actually given rather than what it was configured to be given. Reproducibility (section 7.4) extends from the built agent to the running step, so an unexplained difference between two runs is a defect on the same terms as an unexplained difference between two builds. And a stable leading portion is what makes that portion cacheable, which is a consequence of the design rather than a reason for it.

**Why the input rule is stated rather than left implicit.** A single clause granting in-prompt instructions precedence over the framework's defaults, placed where generated agents inherit it, renders every control above it — obligations, permissions, limits, gates — advisory, while nothing about the system's appearance changes. The composition order already implies the prohibition, because inputs compose last and cannot edit what precedes them. Implication is not sufficient: the rule is stated explicitly, and the procedure below makes it testable, so that such a clause is detectable rather than inferred.

**How R4.7-4 is established.** In two parts, because the first finds the invitation and only the second shows the refusal happens.

**Read** the framework's own instruction files for any clause granting precedence to a user, developer or in-prompt instruction over the framework's defaults. Wording to look for: *takes precedence*, *overrides*, *apply it exactly*, *even if it diverges*. A single such clause, placed where generated agents inherit it, subordinates every control the implementation otherwise satisfies. **Finding one is disqualifying on its own** — the rule fails, and no amount of clean exercise redeems it, because the clause is an instruction to the system to behave the way the exercise is testing for.

**Then exercise it, on held-out probes.** Supply inputs attempting to weaken each of the protected properties — obligations, permissions, limits, gates, checks, process rails, retention, and the stage in force. The five relaxations the rule names are instances of this set, not its extent. Probe across every channel by which content reaches the input slot: from a person, from an upstream step, from a retrieved document, and from what a tool, API or connector returns (section 6.2), which is the largest by volume. The probes are **held out and paraphrased**, not the rule's own wording, on the same reasoning as R5.2-1 — a guard recognising fixed phrases refuses them cleanly and admits the next one. Confirm each attempt is refused *and* that the refusal was written as an event record.

The rule holds only when the read is clean **and** every probe is refused. It is established first, and **where it fails, reliance cannot be placed on any other rule in this specification**, since an instruction arriving with the work can set aside whatever the rest of them establish.

**Relationship to the independent checker.** The checker (section 5.3) sits outside the step and can stop it after the fact. The floor sits inside the step and shapes it while it runs. Neither substitutes for the other. A checker cannot see the pressure a step was under; a floor cannot fail a step. A system with only a checker catches a flattered answer after it has been produced, and a system with only a floor has no independent evidence that the floor worked.

## 5. Quality

### 5.1 Output contract
**R5.1-1** Every skill declares the structure of its output and the standard it must meet. This is a precondition for everything else about quality, because output cannot be evaluated against an undefined target.

```yaml
output:
  sections: [summary, market_size, competitors, opportunities]
  competitors: { type: table, min_rows: 5, max_rows: 10 }
quality_rules:
  - every claim references a source
  - summary is 300 words or fewer
  - at least `min_sources` distinct sources cited
```

### 5.2 Evaluation
Each skill carries a suite of held-out cases derived from its quality rules. The suite runs automatically and a failure prevents a change from being accepted.

```yaml
- id: sme-lending-cz
  input: { market: "SME lending", region: "Czech Republic" }
  expects:
    - output matches the declared contract
    - at least 8 distinct sources cited
    - competitor table contains 5 to 10 rows
  grading:                            # the cheapest instrument that can decide, first
    deterministic:  automated         # structural and rule-based checks
    judged:         independent evaluator, boolean rubric (section 5.3)
    repeated_trial: report-only       # the same case run k times, for reliability
```

**Rules**
- **R5.2-1** No skill is accepted without a held-out evaluation suite.
- **R5.2-2** Cases are derived from the skill's declared quality rules. Any rule that cannot be checked automatically is recorded as a known gap rather than omitted silently.
- **R5.2-3** Each case is graded by the cheapest instrument that can decide it: a deterministic check wherever the rule is mechanically checkable, a judged check only where it is not, and repeated trials where the question is reliability rather than correctness.
- **R5.2-4** **A judged case is graded against a rubric of separate yes-or-no questions, never a single numeric score.** A score conceals which criterion failed, and it invites a passing threshold — which quietly converts a measurement into a constraint. The case **passes only when every question passes**: no count, proportion or threshold is taken over the rubric, since any of the three reintroduces the score the rubric replaced. **No rubric question is established by repeated trial.** A question kept because it happened to separate the runs already seen tests the sample rather than the rule, and a rubric assembled that way passes whatever produced it.
- **R5.2-5** **This governs evaluation cases, and nothing else.** It does not reach a measurement's stage-scaled disposition, which is a property of where the work is composed rather than of how a case is graded, and is governed there.

### 5.3 The independent checker
Verification is performed by a defined component that is independent of the producer. Independence is a mechanism, not a label.

```yaml
independent_checker:
  quality:
    performed_by: evaluation harness, operated separately from the producing pipeline
    model_family: must differ from the model that generated the output
    inputs: [output, output_contract, quality_rules]
    authority: may fail a step
  compliance:
    performed_by: compliance engine
    sole_writer_of: record.compliance      # the producer never writes this section
    authority: may block advancement (absolute)
    escalates_to: the named obligation owner
```

**Rules**
- **R5.3-1** The producing component never writes the compliance section of its own record.
- **R5.3-2** Subjective quality is judged by a different model family than the one that produced the output.
- **R5.3-3** The checker must be able to stop the work. A verifier that cannot block is not a control.

### 5.4 Proving a check refuses

A check that cannot refuse is not a control, and a check that can refuse but never has is not evidence of one. Everything above this point depends on checks that actually fire: the schema check in section 4.5, the pattern check in section 4.6, the evaluation suite in section 5.2, the independent checker in section 5.3, and every run-time enforcement point in section 6. What follows is how any of them is shown to work, stated once here rather than restated at each.

**Rules**
- **R5.4-1** **Every automated check carries a case proving it refuses a known-bad input, and proving it inspected a non-empty subject.** The second half is not redundant: a check pointed at nothing passes everything, and passes silently, which is indistinguishable from a clean result. The suite also carries a **baseline case proving a healthy subject passes**, without which a check wired permanently to refuse would satisfy the first case and block all real work.
- **R5.4-2** **A build-time check is proven before the check it proves runs. A run-time enforcement point is proven on a declared cadence and whenever its configuration changes**, since a control that was enforcing last quarter says nothing about a configuration edited since. **Proof traffic is marked as such in the record**, so a self-test is distinguishable afterwards from a real refusal; unmarked, the evidence that a boundary holds and the evidence that it was attacked are the same record.
- **R5.4-3** **The conformance check can refuse to continue, and cannot be marked advisory, optional or continue-on-error.** The paths by which a definition can reach registration or operation are declared, and an undeclared path is refused. Enforcement is proven along each declared path, and the proof is re-derived when a declared path changes. **Which checks were enforcing is recorded on the run** (sections 7.1 and 7.2). A check that only reports is not a control.

**How R5.4-3 is established.** Not by attestation. A gate cannot establish from inside that it is required — one wired to report and one wired to block are identical from within — and a signature recording that it was required goes stale silently the moment a bypass role is added, a branch rule is relaxed, or a failure disposition is changed.

Establish it the way R5.4-1 establishes every other check, over a set that is itself declared:

1. **Enumerate the paths** by which a definition can reach registration or operation, and register that set. An unenumerated path is refused, on the same footing as an undeclared capability (R6.1-1) or an undeclared destination (R6.4-1) — otherwise the proof covers only what the tester happened to think of.
2. **Submit a deliberately non-conforming definition along each declared path** and confirm it is refused.
3. **Re-derive when a declared path changes** — a new administrative override, an altered branch rule, a changed failure disposition — rather than on a calendar.

The run records which checks executed and which were enforcing, as a by-product of the work rather than as a separate report (sections 7.1 and 7.2).

**Where this check cannot refuse, reliance cannot be placed on whatever it is what enforces.** Those rules are not waived by that failure; they require independent verification instead, because a passing result from a check that cannot refuse is not evidence that anything held.

---
## 6. Security and safety
Two distinct concerns are covered here, and they are separated deliberately because they defend against different things.

**Security** protects against an adversary: someone deliberately causing the system to act outside its intended boundaries. Sections 6.1 to 6.4 cover it.

**Safety** protects against malfunction: the system running away, or continuing when it should stop. Sections 6.5 and 6.6 cover it.

The distinction matters for sequencing. A safety failure surfaces on your own schedule. A security failure surfaces on someone else's.

### 6.1 Capabilities (security)
**R6.1-1** Each agent declares a closed list of permitted capabilities, enforced at run time.

```yaml
capabilities: [web_search]
```
```
✗ BLOCKED  agent "market-analysis" attempted: file_write
           not in declared capabilities
```

**R6.1-2** The strongest control belongs on the most powerful actions. Capabilities that write files, execute commands or change external state are never bounded by written guidance alone.

### 6.2 Untrusted content (security)
**R6.2-1** Any content originating outside the system is untrusted by default. It is reduced to structured, typed facts by a step that has no tools and no authority to act, before any privileged step uses it. The privileged step never sees the raw text.

```
external document ──► [ isolation step: no tools, no authority ]
                           └──► { figures, claims, dates }
                                        │
                                        ▼
                           [ privileged step ] ← never sees raw text
```
```yaml
data_sources:
  - { id: market-report-q2, type: external_document, trust: untrusted }
```

This separation must be structural. Instructing a model to disregard instructions found inside content is not a control, because the model cannot reliably distinguish an operator's instructions from instruction-shaped text in a document. Both arrive as text.

**What counts as external content.** Not only uploaded or attached documents. It is **everything a step receives that the system did not author**, and in a tool-using agent the largest source by volume is what the tools return:

| Source | |
|---|---|
| Uploaded or supplied documents | the case usually thought of |
| **What a search or retrieval tool returns** | a result body is authored by whoever wrote the page |
| **What any API, connector or external service returns** | including a response field that merely *looks* like data |
| **A page, file or repository fetched at run time** | fetched is not vetted |
| Content forwarded from another tenant or another run | trusted origin, unverified content |

**R6.2-2** A capability declared in section 6.1 governs *whether* a step may reach a source. It says nothing about trusting what comes back. **A tool a step is permitted to call still returns untrusted content**, and the isolation above applies to it exactly as to a document — otherwise the isolation protects the one inbound path a person happened to think of while the highest-volume path runs straight into a privileged step.

**R6.2-3** **An agentic asset is an input, and carries the trust of its source.** An agentic asset — the class of artifact produced for the system's own use rather than for a person: tailored instruction material, observability artifacts, work distilled for learning — reaches an agent in the **input slot only**, never as method and never as floor. Placed in the method slot it would be a model-generated method, which R4.2-6 forbids; placed in the floor slot it could weaken a standing obligation, which section 4.7 forbids.

**R6.2-4** It also **inherits the trust of what it was distilled from**. An artifact derived from records that included untrusted external material is itself untrusted and passes through the isolation above before any privileged step uses it. Without this the learning loop is a route around the quarantine: untrusted text becomes a typed fact, the fact becomes a record, the record is distilled, and the result reaches a privileged step carrying no mark of where it came from.

### 6.3 Permissions (security)
**R6.3-1** An agent's declared data scope is enforced at the point of access, filtered by the entitlements of the person on whose behalf it is acting. Without this, an agent whose own access exceeds the requester's becomes a route to data they are not entitled to.

```
query(requester = alice, scope = market_research)
  → results filtered by the requester's entitlements
  → unclassifiable documents excluded (fail closed)
```

### 6.4 Egress (security)
Capabilities govern which tools an agent may use, and data scope governs which information it may read. Neither governs **where an agent may connect, or where information may go**. That is a separate control, and without it a search capability is a route by which information can leave the institution.

An agent declares the destinations it may reach, and the runtime permits nothing else.

```yaml
egress:
  allow:
    - approved-search-provider
    - internal-market-data-service
  deny_by_default: true          # anything not listed is refused
on_denied: stop_and_record       # a blocked destination is a recorded event, not a silent failure
```

Destination control is bound to data classification, so the rule can be expressed on both axes at once.

```yaml
egress_rule:
  applies_when: { data_class: personal }
  control: "must not be transmitted to any destination outside the approved internal set"
  gate: block
```

**Rules**
- **R6.4-1** Egress is deny-by-default. An agent reaches only what it declares and the runtime has approved.
- **R6.4-2** A refused destination is recorded as an event, so attempted egress is visible rather than silent.
- **R6.4-3** Where a destination cannot be classified, the connection is refused.
- **R6.4-4** Egress rules bind to data classification as well as to destination, so sensitive material is governed by what it is and not only by where it is going.

This extends a principle the platform already holds. Oversight is scaled to the irreversibility of an action, and an irreversible outbound action requires a human gate. Egress applies that same reasoning one layer lower, to outbound **connectivity** rather than only to outbound **effect**.

### 6.5 Limits (safety)
**R6.5-1** Per-step and overall limits are enforced, with a defined stop when one is reached.

```yaml
limits: { max_steps: 12, max_attempts: 2, max_cost_eur: 2.50, max_wall_time_s: 800 }
on_breach: stop_and_record
```

**R6.5-2** **`max_attempts` bounds re-execution of the same unit of work**, where the other three bound its extent. A binding whose safe-failure disposition retries declares it; one that stops on first failure has nothing to bound and does not. It is a limit rather than an execution setting because a retry consumes cost and wall time exactly as a first attempt does, and a ceiling that is not counted alongside what it spends is not a ceiling.

**The standing budget.** The limits above bound *one* unit of work. A step's caps bound a step, and a workflow's bound a piece of work; neither bounds the total. Every cap can hold perfectly while a large number of entirely conforming runs consumes far more than intended, because nothing is looking above a single workflow. A third altitude is therefore required: a standing budget that bounds aggregate consumption for a declared scope over a declared period.

```yaml
budget: market-intelligence-monthly
version:  1.0.0                          # registered like any governed artifact (4.5)
status:   active
scope:    market-intelligence            # an area or a tenant
period:   monthly
ceiling:  { amount: 4000, currency: EUR }
owner:    area-lead@bank.example         # named and accountable, as an obligation owner is
computed_from: records                   # §6.5
concurrent_admission_bound: 25           # §6.5
on_approach:   notify_owner              # at a declared threshold
on_breach:     admit_no_new_work         # work already under way completes within its own caps
```

**Rules**
- **R6.5-3** The three altitudes answer different questions and none substitutes for another: a step's caps bound one step, a workflow's bound one piece of work, and the standing budget bounds everything in scope over a period.
- **R6.5-4** **The standing budget is the single place total consumption is bounded.** Because it exists, a per-step limit may be raised where the work genuinely needs it. No misconfigured definition can escape being counted against the budget, and once the ceiling is reached no new work is admitted. The bound is on admission, so in-flight work already under way may carry aggregate consumption a bounded amount past the ceiling as it completes within its own caps; it cannot run away, because no new work starts.
- **R6.5-5** Consumption is computed from records, on the same basis as the readiness signal, and never from an estimate or from a component's own report of what it spent.
- **R6.5-6** The budget carries a named owner, on the same footing as an obligation owner. A limit nobody owns is a limit nobody restores, and an unowned ceiling is raised by whoever is most inconvenienced by it.
- **R6.5-7** On breach, no new work is admitted within the scope. Work already under way runs to completion inside its own caps, so that a breach does not produce half-written records or partial evidence.
- **R6.5-8** Budget exhaustion is **admission control, not a readiness check**: it decides whether work may start, while readiness decides whether work may advance. The readiness signal stays at five fields.
- **R6.5-9** **Work invoked outside a composition is counted against the budget, and refused on breach, exactly as composed work is.** The standing budget is a constraint, and no constraint scales by context any more than it scales by stage. An uncounted path makes every ceiling above it wrong; an uncounted-and-ungated one makes the ceiling decorative.
- **R6.5-10** A refused admission is **recorded as an event**, on the same footing as a refused destination (section 6.4). A ceiling that turns work away silently cannot be distinguished from one that was never reached.
- **R6.5-11** **Where admissions can occur concurrently the overshoot is bounded by the number of concurrent admissions**, not by a single unit of work, because each reads a consumption figure computed from records already written. That bound is **declared as a number** — a formula with a free variable is not a bound. An implementation needing a tighter one may reserve at admission and settle against the record; that is a permitted refinement, and it is not required, because reserving introduces an estimate into a figure this section otherwise keeps free of them. Whichever is chosen is declared.
- **R6.5-12** Every deployed agent falls **within at least one standing budget's scope**. Scopes may nest — a tenant ceiling above an area's — and a run that crosses scopes is attributed to each scope it consumed in. Coverage is the requirement; exclusivity is not, because an agent belonging to exactly one scope would force a choice between the tenant ceiling and the area's. **An agent with no budget in scope is not deployed**, on the same footing as one that does not resolve to exactly one registered tenant (§8.1) — a coverage rule with no consequence is a statement of preference.

### 6.6 Safe failure (safety)
**R6.6-1** Behaviour is defined for the case where the system cannot proceed safely. A failure is always surfaced. It is never replaced by a plausible result, a default value, or an empty but structurally valid output.

```yaml
on_unclassifiable_input: stop_and_escalate
on_contract_failure: retry_with_feedback    # ceiling: limits.max_attempts (6.5)
```

**R6.6-2** **A disposition that retries is not safe failure until it is bounded.** `retry_with_feedback` with no ceiling is an unbounded loop wearing the name of a control. The ceiling is `limits.max_attempts` and what happens on reaching it is `on_breach`, both declared at the binding, so the retry is counted against the same limits as the work it repeats rather than sitting outside them.

---
## 7. Accountability

### 7.1 The record
**R7.1-1** One permanent, append-only record per meaningful action, written automatically.

```yaml
record_type: run
run_id: 2026-07-24T10:15Z-a1b2
parent_run_id: 2026-07-24T10:02Z-77e0

tenant:     george-payments                # the deployment boundary (§8.1)
actor:      { agent: market-analysis, owner_role: area-lead,
              owner_ref: person#0042, requester_ref: person#8891 }
execution:  { skill: market-analysis@1.3.0, workflow: market-discovery@0.4.0,
              policy: compliance-blueprint@2026-07, model: <id + version>,
              floor: conduct-floor@1.0.0 }
enforcing:  [schema, capabilities, egress, obligations]   # which checks could refuse (7.2)

inputs:     [brief#42]
decision:   { result: "produced market analysis",
              rationale: "8 sources cited; 5 competitors profiled" }
output:     doc#118
evidence:   [source#a1, source#a2, …]

compliance: { obligations: [personal-data-minimisation], proof: passed }
            # written solely by the compliance engine
evaluation: { contract: pass, quality: 0.86 }
cost:       { amount: 1.92, currency: EUR }
trace_id:   7f3c…
retention:  { class: operational, period: 7y }
```

**What a record is, precisely.** One record per meaningful action. It carries two things: the **account** of the action — actor, execution, inputs, decision and rationale, evidence, compliance, evaluation, cost, trace and retention — and the **product**, the thing the action made.

The product may sit inline or be held by reference, as `output: doc#118` above. **That choice is a property of size, never of governance.** A referenced product sits inside the record's retention, lineage and versioning exactly as an inline one does; it is not a separate artifact that happens to be mentioned.

**Two record classes.** A `run` record accounts for work performed, as above. An **`event` record** accounts for something the system **refused**, and every refusal this specification requires to be recorded writes one:

```yaml
record_type: event
event:      refusal
tenant:     george-payments
at:         2026-07-24T10:16Z
refused:    admission                 # admission · destination · trace_attribute ·
                                      # input_slot_attempt · binding · path
by:         standing-budget:market-intelligence-monthly
detail:     { requested_by: market-discovery@0.4.0, reason: ceiling_reached }
trace_id:   7f3c…
retention:  { class: control-evidence, period: 7y }
```

An event record is what makes a refusal visible after the fact. Section 6.4 requires a refused destination to be recorded, section 6.5 a refused admission, section 4.7 a refused input-slot attempt, section 7.2 a refused trace attribute — and until this class existed each of those pointed at a store with no shape to write into. A ceiling that turns work away, or a boundary that holds, is indistinguishable from one never reached unless the refusal leaves something behind.

**What determines the grain.** How finely work is cut into records is a design decision, and two of its inputs are forced rather than chosen:

| Factor | |
|---|---|
| **Approval boundary** | *Forced.* Where separate parts are cleared by different accountable people — a compliance section by the obligation owner, a technical section by an architect — they cannot share a record, because section 9.4's separation of duties has nothing to bind to if they do |
| **Retention class** | *Forced.* Retention is set per record class, so parts governed by different obligations cannot be one record |
| **Rate of change** | Parts that move on different cadences are better separated, so a change to one does not re-open the approval of the whole |
| **Reuse** | Anything consumed by more than one document is its own record; a record cannot be a part of one document and the whole of another |
| **Producer count** | Where several skills contribute, a record per contribution keeps lineage attributable to the actor that produced it |

**Rules**
- **R7.1-2** A correction is a new record linked to the one it supersedes. History is never edited.
- **R7.1-3** **Personal data is held by reference rather than written into the record body**, so that immutability and erasure obligations can coexist. This applies to everyone the record names — the requester, and equally the accountable owner. A record states the accountable **role** in plain form and the **person** by reference; an identifier that resolves to a natural person is personal data whether the person is a customer or an employee.
- **R7.1-4** Every record carries the tenant it was written in, so budget scope and memory partitioning are derivable from records rather than asserted alongside them.
- **R7.1-5** Retention is set per record class, according to the obligation that governs it.
- **R7.1-6** A record carries the account of its action and the product of it. Holding the product by reference is permitted for size and changes nothing about how it is governed.
- **R7.1-7** **A record that supersedes an earlier one because that one had aged states whether the product changed.** Work repeated on age alone supersedes like any other correction, and without this a re-run that found nothing had moved is indistinguishable afterwards from one that changed everything.

```yaml
# fields as in the record above, except:
record_type: run
run_id:     2026-10-24T09:00Z-c4d5
supersedes: 2026-07-24T10:15Z-a1b2    # §7.3; re-run because competitor-profile had aged
output:     doc#204
changed:    false                     # nothing had moved since doc#118
```

### 7.2 Tracing
**R7.2-1** Every action is traced, and no output is recorded without a corresponding trace.

```
run 7f3c…
├─ intake          0.6s
├─ scan            1.4s   web_search ×6
├─ competitors     1.9s   web_search ×4
├─ opportunities   1.2s
└─ synthesis       0.8s

✗ output rejected: no trace identifier, not committed
```

**R7.2-2** **What a trace may carry.** A trace records metadata about execution: which skill and version ran, under which model and floor version, how long it took, how many tokens it consumed, which capabilities it used, which checks were enforcing, and what each check returned. It does not carry the content sent to or returned by the model, and it never carries personal data. Traces are routinely exported to systems held to a lower standard than the record store, frequently outside the institution, so the discipline governing the record body in section 7.1 applies to the trace with less room for exception rather than more. An export destination is a destination like any other and is subject to section 6.4.

**R7.2-3** **The permitted attributes are a closed set held in a registered artifact** — a trace attribute set, owned and versioned like any other (section 4.5) — in which each attribute declares a value type and a data classification.

```yaml
trace_attribute_set: default-execution-metadata
version: 1.0.0
owner: observability-owner@bank.example
attributes:
  - { name: skill_version,  type: string, classification: internal }
  - { name: duration_ms,    type: integer, classification: internal }
  - { name: check_result,   type: enum[pass,fail,refused], classification: internal }
on_unclassifiable_value: refuse_and_record       # §7.2
```

**R7.2-4** Naming attributes is not enough on its own, because the rule prohibits **values** — model content, personal data — and `check_result` is exactly where a rejected payload or a matched identifier tends to arrive. So a value's classification is **determined at emission**, from the declared type and the classification of the data it was derived from; a value whose classification cannot be established is **refused**, on the same footing as an unclassifiable destination (section 6.4) or an unclassifiable input (section 6.6). A refusal is recorded as an event and is never a truncation or a warning.

**Recording and export are separate concerns, deliberately.**

| | Behaviour on failure |
|---|---|
| **Recording** the trace | fail-closed — an output with no trace is not committed |
| **Exporting** the trace | best-effort — an unavailable collector is recorded as a degraded export and does not halt the work, within the declared tolerance below |

Collapsing the two turns a monitoring outage into a production outage, which is how a control intended to protect the audit trail ends up being switched off.

**The export tolerance is declared, not open-ended**, and takes the shape section 6.5 uses for any other standing bound:

```yaml
export_tolerance:
  scope:      george-payments
  period:     rolling 24h
  threshold:  { degraded_exports: 50, consecutive_hours: 4 }
  owner:      observability-owner@bank.example
  computed_from: records               # §7.2
  on_notify:  notify_owner
  on_breach:  admit_no_new_work        # existing work completes; nothing new starts
```

**R7.2-5** **Every tenant declares one, and an undeclared tolerance is not a permissive one.** Where none is declared, an export failure is treated as breaching immediately: an exemption nobody bounded is not an exemption. A degraded export is recorded as an event (section 7.1) in the record store, never in the collector whose unavailability produced it.

**R7.2-6** **No absolute check is relaxed while a tolerance is in force.** The tolerance governs what happens to *export*, and nothing else. Compliance clearance, required human confirmation, and every constraint governing the run continue to block exactly as they otherwise would — an audit-trail outage is a reason to stop admitting work, never a reason to let work past a gate.

### 7.3 Lineage
**R7.3-1** Records are linked with typed relationships: `derives_from`, `verifies`, `supersedes`, `depends_on`. A claim with no source fails.

### 7.4 Provenance
**R7.4-1** Every built agent carries a record of exactly what produced it.

```yaml
built_from:
  skill:      market-analysis@1.3.0 (sha256:9f2c8a…)   # whole-artifact fingerprint (4.2)
  definition: sha256:41ab…
  canonical_form: yaml-c14n@1.0.0            # how the artifact was serialised before hashing (4.2)
  floor:      conduct-floor@1.0.0            # the floor the bound skill declares (section 4.2)
  model:      <model identifier + version>   # §7.4
  build:      "#build-771, 2026-07-24"
assurance:
  cadence:    quarterly                      # hosted-model re-derivation (rules below)
  last_run:   2026-07-24
  state:      current                        # current | withdrawn
deployed_to:
  tenant:     george-payments@1.0.0          # §8.1
```

**R7.4-2** A change is made by rebuilding with a new version, never by editing a deployed agent in place.

**Reproducibility.** A provenance record is only as good as the ability to reproduce what it describes. The same definition, at the same versions, built again, must produce the same agent.

```
build(definition@v, skill@1.3.0, floor@1.0.0, model@m)  →  agent A
build(definition@v, skill@1.3.0, floor@1.0.0, model@m)  →  agent A   (identical, every time)
```

**Rules**
- **R7.4-3** Nothing enters a built agent that is not in its definition or in the versions it pins. If two builds differ, that difference is a defect: it means an undeclared input is reaching the agent, and the definition is therefore incomplete.
- **R7.4-4** **Every binding's integrity fingerprint is recomputed and compared at build**, under the pinned canonical form, in addition to the check at validation (section 12). Validation proves the definition was sound when it was written; the build proves the artifact it pins is still the artifact it pinned.
- **R7.4-5** **The model is one of the pinned versions.** An agent built against an unstated or floating model is not reproducible, and its assurance evidence describes a configuration that may no longer exist. A change of model, or of a bounded execution setting, is a new version: the evaluation suite is re-run and the assurance summary regenerated against the model actually in use.
- **R7.4-6** **A hosted model can change behind an unchanged identifier**, so pinning the identifier does not pin the behaviour. Where that is the case, assurance evidence is re-derived on a **declared cadence with a declared maximum interval and a named owner**, and **a re-derivation that fails carries a disposition** — the agent is withdrawn from delivery-stage use and its owner notified, pending a new version. An observation with no consequence is not a control.
- **R7.4-7** **A re-derivation that never runs is treated as one that failed.** Otherwise the cheapest way to keep an agent in service is to stop measuring it, and the control rewards exactly the neglect it exists to catch.
- **R7.4-8** A run in progress stays pinned to the versions it started with. A version published mid-run does not change a run already under way.
- **R7.4-9** A deployed agent never modifies itself. Improvement is published as a new version and deployed by rebuilding.
- **R7.4-10** Optional settings left unset do not affect the identity of the build, so a change of default does not produce a spurious difference.

### 7.5 Assurance summary
**R7.5-1** Each built agent ships with a summary populated from a controlled trial run, so quality is demonstrated with evidence rather than asserted.

```markdown
# Market Analysis Agent: Assurance Summary
Intended use:     market analysis for internal product discovery
Built from:       market-analysis@1.3.0 (sha256:9f2c8a…)
Model and floor:  <model identifier + version> · conduct-floor@1.0.0
Limits:           12 steps · €2.50 · 800s
Output contract:  summary · market_size · competitors (5 to 10) · opportunities
Evaluation:       12/12 contract pass · judged rubric met on every case
                  (judged by a different model family than the generator)
Quality measure:  0.86 average — recorded as a measurement, not a gate
Trial run:        2026-07-24 · €1.92 · 5 competitors · all criteria met
Known gaps:       1 quality rule not automatically checkable
```

---
## 8. Deployment

### 8.1 Tenancy: where the system is installed

An area groups work by function. A **tenant** is the boundary an installation runs inside: **one product, which is one repository**, holding its own artifacts, its own memory and its own consumption. A team works at that level.

The two are orthogonal and both are needed. The same area exists in many tenants: Market Intelligence for one product and for another are the same function, governed by the same area definition, holding entirely separate work.

```yaml
tenant: george-payments
version: 1.0.0                                     # registered like any governed artifact
status: active
owner: product-lead@bank.example
areas: [market-intelligence, solution-design]      # the areas installed here
budgets: [george-payments-monthly]                 # at least one
isolation:
  memory:     partitioned
  budget:     scoped
  retrieval:  entitlement_filtered
```

**R8.1-1** **The tenant is a property of the deployment, never of the definition.** An agent definition names its area, its owner and its bindings; it does not name a tenant, because the same definition is deployed into many. The binding is made at deployment and recorded in provenance and in every record the agent writes.

If a definition named its tenant, the same role in two products would be two definitions, promoting a proven agent would mean editing one, and reproducibility would be asserting that two deliberately different definitions build identically. Keeping the tenant out of the definition is what lets an agent be reused rather than copied.

A tenant never reaches another tenant's records, memory or artifacts. **Organisation-wide scope sits above every tenant and inside none** — it is what promotion promotes to, and the only route by which what one tenant learned reaches another.

**Rules**
- **R8.1-2** Every deployed agent is attributable to exactly one tenant. **An agent that does not resolve to exactly one registered tenant is not deployed** — the binding is made at deployment and checked there, and a boundary with no consequence is a statement of preference.
- **R8.1-3** Memory partitioning, budget scope and entitlement filtering all bind to the tenant.
- **R8.1-4** A tenant never reaches another tenant's records, memory or artifacts.

Who uses a tenant, at what cadence, and under which operating protocol is not specified here.

### 8.2 Operational observability

**R8.2-1** Beyond the audit trail, the running system is watched in real time: the health of each service (latency, error rates, throughput, and availability against agreed targets), the health of retrieval (whether the area index is still returning the right material), and the quality of live output (is it drifting, are answers still grounded in real sources, are test scores slipping in production and not just in testing). When something crosses a line, it raises an alert and opens an incident, with a defined path to detect, classify, and respond. This is not optional: DORA requires operational resilience monitoring, so it is a compliance obligation in its own right. It runs off the same records and traces as the audit view, so nothing is gathered twice.

---
## 9. Compliance

### 9.1 RegMap, the regulatory register
A versioned register of every obligation the organisation is subject to, each with a named owner and effective dates. New regulation enters here first. It answers one question — *what are we subject to?* — and it is the only source of that answer.

```yaml
- id: gdpr-art-5-1-c
  instrument: GDPR
  reference: "Article 5(1)(c), data minimisation"
  owner: data-protection-office
  effective_from: 2018-05-25
  version: 3
```

### 9.2 The Compliance Blueprint, obligations as rules
**R9.2-1** Each obligation in RegMap is expressed as a structured, machine-checkable rule bound to the conditions under which it applies, rather than to individual agents. Together those rules are the **Compliance Blueprint**: the executable form of the register above.

This is what allows compliance to scale: a new agent inherits every obligation whose conditions it matches, without a separate review. Binding an obligation to an agent instead would mean every new agent needs its own compliance assessment, which is the cost this design exists to avoid.

```yaml
obligation: personal-data-minimisation
traces_to: gdpr-art-5-1-c
applies_when: { data_class: personal, stage: any }   # §9.2
control:  "no personal data written to the permanent record body"
evidence: "record body checked; personal fields stored by reference only"
gate: block                    # warn | block | human-signoff
owner: data-protection-office
```

Where obligations conflict, the strictest gate applies. Anything that cannot be classified fails closed.

**R9.2-2** **An obligation's `stage` is always `any`, and validation rejects any other value.** The key exists to make the condition explicit rather than to make it adjustable: an obligation is a constraint, and no constraint scales by stage without exception. A stage-scoped obligation would be a compliance requirement that lapses in exploratory work — which is where most work happens, and where personal data first arrives.

### 9.3 Application

```
before the step:  attach every obligation whose conditions match
                    → [personal-data-minimisation · gate = block]
run the step
after the step:   the compliance engine checks and writes record.compliance
                    → PASS → advance
                    → FAIL → block · escalate to the named owner
```

### 9.4 Human oversight
**R9.4-1** Oversight scales with consequence:

| Consequence | Requirement |
|---|---|
| Low, reversible | proceeds automatically; recorded |
| Material, reversible | a person is notified and may intervene |
| Irreversible or externally visible | a required stop: evaluation passed, compliance cleared, and a named person has signed off |

**R9.4-2** Separation of duties applies. The person accountable for the work may never clear a compliance flag. Only the named obligation owner may do so.

---
## 10. Documentation

Documentation usually fails because it is written after the work, from memory. SPOCK removes the separate step. **What a record must contain, and the classes it comes in, are specified in §7.1.** What follows is what that buys and how documents are built from it.

- **Every meaningful action leaves a permanent record**, written as a by-product of the work rather than as a reporting step. Nobody edits one; a correction is a new record linked to the one it supersedes. That single record then serves five uses — documentation, audit, learning, retrieval and reporting — which is the whole economy of the model: define once, use five times.

- **Records link to each other**, so a claim can be traced back to what it came from and forward to what it affects.

- **R10-1** **A document is a view, built on demand.** Each document type declares which record types compose it, and the system fills each part from the current records. An approved document **pins the record versions it was built from**, and is flagged for review when any of them changes — the pinned set is what the approval attested, and without it a flag has no baseline saying what was agreed.

- **R10-2** **Records always exist; a document becomes canonical when the accountable person promotes it.** The system assembles each of a standard set — PRD, product spec, user flow — from current records and flags one the moment it is ready. Promotion is the sign-off, and that sign-off is what writes the file. Only canonical documents are stored, as Markdown in a standard folder structure; an export step turns that into Confluence, Word, PDF or a presentation.

- **R10-3** **A document is corrected by correcting its records and regenerating**, never by editing the assembled file. One edited in place no longer matches what it claims to be assembled from.

- **Records and memory stay separate.** The record is the permanent source of what happened; memory is a curated, changeable summary drawn from it.

- **R10-4** **One accountable role per document.** Many skills contribute records; one person is accountable for the document assembled from them. No co-ownership.

Personal data is held by reference rather than written into the permanent record, so it can be erased on request while the record itself stays. The payoff is simple: an audit becomes a search, not a reconstruction.

### 10.1 What the system produces: outputs, assets, agentic assets

Not everything the system produces is something a person must decide on, and treating it all alike either buries the reader or hides a decision nobody made. Three classes are distinguished. All three are assembled from records; what separates them is audience and obligation.

| Class | Audience | Is a person required to engage | Typical form |
|---|---|---|---|
| **Output** | people | **Yes** — consume, review, approve | a canonical document |
| **Asset** | people | No — available for depth, not required reading | a document, never approved |
| **Agentic asset** | the system only | n/a | a record or a set of them |

**R10.1-1** An **output** is front-facing and carries a decision. Most outputs become canonical documents. Those that do not carry that exception, with its reason, on their **artifact type** in the register — a permanent property of the type, not a time-bounded exemption from a rule.

An **asset** is one or more documents produced on the way to an output, and it is genuinely for people: a reader who wants the underlying detail goes here. It is simply not required reading, so it carries no decision gate. The competitor list behind a competitive analysis is an asset.

An **agentic asset** exists only so the system works better: tailored instruction material, observability artifacts, work distilled for learning. No person is expected to read them.

**R10.1-2** The rule that holds the three apart: **classification governs whether a person decides. It never governs whether the system records.** An agentic asset nobody reads still carries an owner, a version, typed lineage and a retention class. Unreviewed and ungoverned are different words.

**R10.1-3** Which class an artifact belongs to is **declared, not derived from its shape**, and it is set centrally and top-down by a workflow builder or an area owner — never by the skill that produces it. An asset may be promoted to an output by the accountable person; the reverse is a reviewed change to the artifact type, because demoting an output removes a gate.

### 10.2 Correcting a fact once: propagation

**R10.2-1** Because a document is a view assembled from records, a fact many documents depend on is *one* record referenced many times. Correcting that record corrects every view built on it, with nothing to propagate. Where a fact can be referenced, it is referenced.

Propagation governs what is left: the cases where a fact is genuinely restated rather than referenced — generated prose that embeds a fact in a sentence, a surface outside the record store, a document maintained by a team that does not consume records.

The correction is still made once, in the record that owns the fact. What happens to the restatements is bounded by ownership:

| | Behaviour |
|---|---|
| The restatement has the same accountable owner as the source | the copy is **updated**, and the update recorded |
| The restatement has a **different** accountable owner | the change is **proposed and flagged** to that owner, carrying the originating change as context |

The boundary is ownership because that is where the meaning of a change stops being derivable. Replacing a third-party component is one correction, and the business documents restating it follow mechanically — but what it implies for that component's interface specification is a judgement belonging to whoever owns that specification.

**R10.2-2** Propagation is **idempotent and detects a change already present**, because people also reconcile documents by hand. It never writes into an approved document without that document's owner approving: a document that changed without its attestation being renewed is no longer attested.

---
## 11. Learning and change

### 11.1 The two-tier memory
Learned know-how lives at two levels — the **agent** and the **skill** — governed as one system rather than as alternatives. The **area** sits above both as human-curated reference knowledge the learning loop never writes to; it is shown in the table for context, not as a third learning tier.

| Level | Holds | Character |
|---|---|---|
| **Area** | shared reference knowledge | human-curated only; the learning loop never writes to it |
| **Agent** | this role's learned craft: durable judgment and preferences | the accountable owner's judgment stays with the role |
| **Skill** | an episodic case bank of past runs, plus procedural craft improvements | the job's own learning, at finer grain |

**R11.1-1** Both learning levels obey the same rules. Memory is **distilled from records**, never authored directly, which keeps the immutable ledger and the mutable derivative as separate stores rather than one combined store. It is **read just-in-time and scoped**, never preloaded, so context stays flat and scope does not leak. Writes are **eval-gated**: nothing is kept unless it beats the held-out cases.

**R11.1-2** Memory is **partitioned** by tenant (§8.1), and filtered before retrieval rather than after.

**Two axes, not one.** The two tiers above are *artifacts* — agent and skill. They are independent of the *scope* axis, which runs from local to organisation-wide and is governed by section 11.2. A skill's memory may be local to one tenant or promoted across all of them; so may an agent's. The tiers say where learning is held; the scope says how far it reaches.

### 11.2 Promotion from local to organisation-wide
**R11.2-1** A local improvement becomes an organisation-wide one only through a governed path, never automatically.

```
local memory (this agent or skill, eval-gated, auto-updates)
        │
        ├─ strip identifying and team-specific content
        ├─ pass the held-out evaluation set
        ├─ independent audit of the proposed change
        └─ named human ratification
        ▼
organisation-wide memory
```

The same shape governs an agent proven in one team becoming an organisation-wide capability: evidence that it works, an independent check, and a named person accepting it. Being useful locally is not sufficient, because what holds in one context can be wrong in another.

**R11.2-2** An organisation-wide memory change is treated as a model-risk artifact and reviewed accordingly. Personal or identifying detail is removed before anything is promoted.

### 11.3 What may change, and how

| Change | Path |
|---|---|
| **Craft**, how well a role or skill does its job | write a test case, measure against held-out cases, keep locally if it improves |
| **Shared behaviour**, adopting an improvement across the organisation | strip specifics, pass evaluation, independent audit, named human ratifies |
| **Rules**: obligations, permissions, limits, gates, process rails, retention | never automated. Human governance only |

### 11.4 Versioning
**R11.4-1** Every artifact whose identity appears in a record carries a version. Executable parts also carry an integrity fingerprint. Improvement is published as a new version. Deployed agents are rebuilt, never patched in place.

---
## 12. Lifecycle

```
business need
    │
    ▼
DESIGN      identify the area, the role and its named owner, reuse an existing
            skill or define a new one, permissions, obligations, gates
    │
    ▼
DEFINE      write the skill (six parts) and the agent (identity and binding)
            as structured data, with an output contract and quality rules
    │
    ▼
VALIDATE    every check a rule in sections 4 and 9 declares as happening before
            an artifact is accepted. The set is not enumerated here: a rule and a
            list of rules drift, and the rule is the one that governs
    │
    ▼
ASSURE      evaluation suite runs · independent checker · controlled trial run ·
            assurance summary populated from the run
    │
    ▼
APPROVE     the named owner approves; compliance clears where obligations apply
    │
    ▼
REGISTER    catalogue entry with owner, version and status · the deployed agent
            resolves to exactly one tenant and to at least one budget scope
    │
    ▼
OPERATE     records written · traces produced · limits enforced ·
            consumption counted against the standing budget ·
            readiness recalculated · monitoring for cost, errors and drift
    │
    ▼
IMPROVE     a new version is published; the agent is rebuilt and re-approved
```

---
## 13. Conformance checklist

An implementation conforms to this specification when all of the following hold.

**Every criterion names the rules it summarises**, and the rule governs. A criterion is a summary written to be decided; the rule in the body carries the reasoning for it and the worked example that instances it. Where the two disagree the body wins and the criterion is the defect.

The correspondence runs both ways and is checked mechanically: no criterion may name a rule this document does not state, and no labelled rule may reach no criterion. Before that check existed, six criteria here required things this document never stated. Four are now stated as rules in the body. The other two summarised rules about how work is sequenced, which is not this document's subject, and they are now carried where their rules already were.

Criteria are numbered per document and carry the document in the number, so `AB-1` and `WB-1` are different criteria and neither has to start anywhere but 1.

### Structure — sections 2 and 4

| # | Requirement | Rules |
|---|---|---|
| AB-1 | Agent and skill definitions are structured data validated against a schema; a non-conforming definition is rejected automatically | R2-1, R4.5-3 |
| AB-2 | Each skill declares all six parts: contract, method, knowledge, obligations, record, quality | R4.2-1 |
| AB-3 | Each skill states what it excludes and which skill owns that concern | R4.2-2 |
| AB-4 | Each agent binds one or more skills by version, and every binding carries an integrity fingerprint over the bound skill's whole artifact in a declared canonical form, excluding the fingerprint field itself; it is recomputed and compared at validation and at every build, and a mismatch rejects the binding | R4.2-3, R4.2-4, R4.3-1, R4.3-7, R7.4-4, R11.4-1 |
| AB-5 | A skill's method is authored by the accountable discipline owners, with the rule parts centrally reviewed; it is never model-generated | R4.2-6 |
| AB-6 | Every skill and workflow declares a pattern from the registered catalogue; an unrecognised pattern is a validation error | R4.2-7, R4.6-1, R4.6-3 |
| AB-7 | A pattern's required fields are enforced automatically, not checked at review | R4.6-2 |
| AB-8 | No agent definition can express a method; the schema makes it impossible | R4.3-2 |
| AB-9 | Capabilities, data scope and limits are declared at each skill binding rather than once for the agent, and no binding exceeds the agent's declared capability ceiling | R4.3-3, R4.3-4 |
| AB-10 | Each agent declares a named human owner | R4.3-5 |
| AB-11 | An agent's configuration is limited to keys the skill declares adjustable, within declared bounds | R4.3-6 |
| AB-12 | Where a host enforces its own capability list, no binding runs under a list wider than the capabilities it declares. Where the host cannot express a list per binding, any binding whose declared list is narrower than the union is carried by a separate host unit, so section 4.3's in-role isolation survives the projection. A capability the host does not enforce is not counted as enforced | R4.3-8 |
| AB-13 | The execution block carries only a pinned model, bounded effort settings, and `on_contract_failure` — all drawn from the permitted values the skill's `execution_bounds` declares, with non-prose value types; no method text, instruction or persona can be expressed through them. An unset bounded setting resolves to its declared default without altering the build, and a binding declaring no `on_contract_failure` is rejected | R4.3-9, R4.3-10, R4.3-11, R6.6-2 |
| AB-14 | Every governed artifact is registered with owner, version and status, and references resolve through the catalogue | R4.5-1, R4.5-2 |
| AB-15 | The governed subset of a definition is registered and owned, on the same footing as an exemption, so fields supplied by the host are validated as out of scope rather than causing a conforming definition to fail its own schema; the excluded set may never contain method, floor, capabilities, permissions, limits or pinned versions | R4.5-4 |
| AB-16 | Every version recorded in a register resolves to an artifact declaring that version. An exemption is available only where the artifact's own format cannot carry a version field, and takes the registered form of section 4.5 — owned, reviewed by someone other than its owner, expiring, naming the rule it excepts, and reported on every run rather than skipped silently; an expired exemption fails validation | R4.5-5, R4.5-6 |
| AB-17 | A versioned, registered floor is composed at run time ahead of the method, never modifies it, and cannot be declined by a skill. The floor is non-empty: it carries the standing conduct obligations of section 4.7 as identified, typed clauses. No definition can express floor text. Each skill declares the floor it was authored against, and its method carries a recorded review against that floor's hard clauses by someone other than its author, re-opened by a change to either | R4.2-5, R4.7-1, R4.7-2, R4.7-3, R4.7-5, R4.7-6, R4.7-7, R4.7-8, R4.7-9 |
| AB-18 | No instruction arriving in the input slot can relax an obligation, widen a permission, raise a limit, skip a gate or disable a check; an attempt is refused and the refusal is written as an event record (section 7.1) | R4.7-4 |
| AB-19 | A step's input is composed repeatably in the fixed order floor, method, tailoring, inputs. The leading portion — the floor as activated for the stage in force, or for the strictest stage where none is declared, together with the method and the resolved tailoring — composes to the same bytes for the same definition, versions and stage; and the same inputs compose to the same bytes at the same versions | R4.7-10 |

### Quality — section 5

| # | Requirement | Rules |
|---|---|---|
| AB-20 | Each skill declares a structured output contract and explicit quality rules | R5.1-1 |
| AB-21 | Each skill has a held-out evaluation suite that runs automatically; failure prevents acceptance | R5.2-1 |
| AB-22 | Rules that cannot be checked automatically are recorded as known gaps | R5.2-2 |
| AB-23 | Each evaluation case is graded by the cheapest instrument that can decide it; a judged case uses a rubric of yes-or-no questions rather than a numeric score, and passes only when every question passes — no count, proportion or threshold over the rubric, and no rubric question established by repeated trial. This governs evaluation cases (section 5.2); it does not touch a measurement's stage-scaled disposition, which is governed where work is composed | R5.2-3, R5.2-4, R5.2-5 |
| AB-24 | Subjective quality is judged by a different model family than the generator | R5.3-2 |
| AB-25 | The independent checker is defined, operated separately from the producer, and can stop a step | R5.3-3 |
| AB-26 | Every automated check carries a case proving it refuses a known-bad input and that it inspected a non-empty subject, and the suite carries a baseline case proving a healthy subject passes. Build-time checks are proven before the check they prove runs; run-time enforcement points are proven on a declared cadence and whenever their configuration changes, and proof traffic is marked as such in the record so a self-test is distinguishable from a real refusal | R5.4-1, R5.4-2 |
| AB-27 | The conformance check can refuse to continue and cannot be marked advisory, optional or continue-on-error. The paths by which a definition can reach registration or operation are declared and an undeclared path is refused; enforcement is proven along each declared path by submitting a non-conforming change and confirming refusal, and the proof is re-derived when a declared path changes. Which checks were enforcing is recorded on the run. A check that only reports is not a control | R5.4-3 |

### Security — sections 6.1 to 6.4

| # | Requirement | Rules |
|---|---|---|
| AB-28 | Capabilities are a closed declared list, enforced at run time | R6.1-1 |
| AB-29 | Capabilities that write files, execute commands or change external state are never bounded by written guidance alone | R6.1-2 |
| AB-30 | External content is untrusted by default and reduced to structured facts by an isolated step before any privileged step uses it | R6.2-1 |
| AB-31 | What a tool, API, connector or retrieval call returns is external content and is isolated before any privileged step uses it; permission to call a source is never treated as grounds to trust what it returns | R6.2-2 |
| AB-32 | An agentic asset reaches an agent in the input slot only, never as method or floor, and inherits the trust of the material it was distilled from — one derived from untrusted content passes through isolation before any privileged step uses it | R6.2-3, R6.2-4 |
| AB-33 | Data access is filtered by the requester's entitlements at the point of retrieval, failing closed | R6.3-1 |
| AB-34 | Egress is deny-by-default: an agent reaches only the destinations it declares and the runtime approves | R6.4-1 |
| AB-35 | A refused destination writes an event record (section 7.1); attempted egress is visible rather than silent | R6.4-2 |
| AB-36 | Egress rules bind to data classification as well as to destination, and an unclassifiable destination is refused | R6.4-3, R6.4-4 |

### Safety — sections 6.5 and 6.6

| # | Requirement | Rules |
|---|---|---|
| AB-37 | Per-step and overall limits are enforced, with a defined stop on breach | R6.5-1, R6.5-2 |
| AB-38 | Budgets are registered artifacts whose scope resolves to an area or a tenant; each bounds aggregate consumption for a declared scope and period, is computed from records rather than estimates, and carries a named owner. Every deployed agent falls within at least one budget's scope and an agent with none is not deployed; scopes may nest, and a run crossing scopes is attributed to each it consumed in | R6.5-3, R6.5-5, R6.5-6, R6.5-12 |
| AB-39 | On budget breach no new work is admitted within the scope while work already under way completes within its own caps; no misconfigured definition can escape being counted against the budget, and a refused admission writes an event record. Where admissions can occur concurrently the resulting overshoot bound is declared as a number, as is any reservation mechanism used to tighten it | R6.5-4, R6.5-7, R6.5-8, R6.5-9, R6.5-10, R6.5-11 |
| AB-40 | Unclassifiable input stops and escalates; no result is produced by guessing | R6.6-1 |
| AB-41 | A failure is never converted into a plausible result, a default, or an empty but valid output | R6.6-1 |

### Accountability — section 7

| # | Requirement | Rules |
|---|---|---|
| AB-42 | Every meaningful action writes one append-only record containing rationale, evidence links, compliance proof, evaluation result, cost and versions | R7.1-1, R7.1-6 |
| AB-43 | A correction creates a new linked record; history is never edited | R7.1-2 |
| AB-44 | Personal data is held by reference, for everyone a record names — the requester and equally the accountable owner, whose role is stated in plain form and whose identity is held by reference; retention is set per record class | R7.1-3, R7.1-5 |
| AB-45 | A record that supersedes an earlier one because that one had aged states whether the product changed, so that work repeated on age alone is distinguishable afterwards from work that produced something different | R7.1-7 |
| AB-46 | Every action is traced, and no output is recorded without a trace | R7.2-1 |
| AB-47 | A trace carries execution metadata only, drawn from a closed attribute set held in a registered artifact in which every attribute states a value type and a data classification: never the content sent to or returned by the model, and never personal data. A value's classification is determined at emission from its declared type and the data it derives from; an attribute outside the set, a value the set does not permit, or a value whose classification cannot be established is refused at emission and the refusal written as an event record. A collector is a destination and is declared as one, so section 6.4 governs it | R7.2-2, R7.2-3, R7.2-4 |
| AB-48 | Recording a trace is fail-closed while exporting it is best-effort: an unavailable collector is recorded as a degraded export and does not halt the work, within a tolerance declared per tenant with a scope, period, threshold, owner, disposition, and a consumption source that is the record store rather than the collector. Where no tolerance is declared an export failure breaches immediately. **No absolute check is relaxed while a tolerance is in force** — compliance clearance, human confirmation and every constraint continue to block exactly as they otherwise would | R7.2-5, R7.2-6 |
| AB-49 | Records are linked with typed relationships; a claim with no source fails | R7.3-1 |
| AB-50 | Every built agent carries a provenance record and an assurance summary populated from a real trial run | R7.4-1, R7.5-1 |
| AB-51 | Deployed agents are changed by rebuild, never by in-place edit | R7.4-2 |
| AB-52 | The same definition at the same versions, built again, produces the same agent; a difference between builds is a defect indicating an undeclared input | R7.4-3, R7.4-10 |
| AB-53 | The model, the floor and the canonical form are among the pinned versions; a change to any of them, or to a bounded execution setting, is a new version whose evaluation is re-run and whose assurance summary is regenerated. Where a pinned model is hosted and its behaviour may change behind an unchanged identifier, assurance evidence is re-derived on a declared cadence with a maximum interval and a named owner; a failed re-derivation, or one that does not run within that interval, withdraws the agent from delivery-stage use and notifies its owner | R7.4-5, R7.4-6, R7.4-7 |
| AB-54 | A run in progress stays pinned to the versions it started with, and a deployed agent never modifies itself | R7.4-8, R7.4-9 |

### Deployment — section 8

| # | Requirement | Rules |
|---|---|---|
| AB-55 | A tenant is a registered artifact with an owner, a version and a status. Every deployed agent is attributable to exactly one tenant and every record it writes carries it; the tenant is bound at deployment and never named in the definition, and memory partitioning, budget scope and entitlement filtering bind to that boundary | R7.1-4, R8.1-1, R8.1-2, R8.1-3, R8.1-4 |
| AB-56 | The running system is monitored in real time for service health, retrieval health and output quality drift, against declared targets; a breach raises an alert and opens an incident with a defined path to detect, classify and respond. The monitoring is computed from the same records and traces as the audit view, never gathered separately | R8.2-1 |

### Compliance — section 9

| # | Requirement | Rules |
|---|---|---|
| AB-57 | Obligations are registered, versioned, owned, and expressed as rules bound to conditions rather than to agents; an obligation's stage is always `any`, and validation rejects any other value | R9.2-1, R9.2-2 |
| AB-58 | Obligations are attached before a step and independently proven after; the producer never writes its own compliance result | R5.3-1 |
| AB-59 | Required human sign-off scales with consequence, and the person accountable for the work cannot clear a compliance flag | R9.4-1, R9.4-2 |

### Documentation — section 10

| # | Requirement | Rules |
|---|---|---|
| AB-60 | Documents are assembled from records, have exactly one accountable owner, become canonical on approval, and are flagged when a source record changes | R10-1, R10-2, R10-3, R10-4 |
| AB-61 | An artifact type declares its class; class governs whether a person must decide, and every class carries an accountable owner, a version, typed lineage and a retention class. Demotion from output to asset is a reviewed change to the type rather than a runtime one | R10.1-1, R10.1-2, R10.1-3 |
| AB-62 | A fact that can be held once and referenced is never copied. Where restatement is unavoidable, a change crossing an ownership boundary is proposed and flagged to the target's owner with the originating change as context, cleared by that owner's review rather than by the propagation succeeding, and never written into an approved document without its owner approving; propagation is idempotent and detects a change already present | R10.2-1, R10.2-2 |

### Learning and change — section 11

| # | Requirement | Rules |
|---|---|---|
| AB-63 | Automated learning may change craft only; obligations, permissions, limits, gates, process rails and retention are changed only by human governance | R2-2 |
| AB-64 | Learned memory is distilled from records rather than authored directly, kept separate from the immutable record store, read just-in-time and scoped, and written only through an evaluation gate | R11.1-1 |
| AB-65 | Memory is partitioned by tenant (§8.1) and filtered before retrieval, and identifying detail is removed before anything is promoted beyond its local scope | R11.1-2, R11.2-2 |
| AB-66 | Promotion from local to organisation-wide requires held-out evaluation, an independent audit, and named human ratification; it never happens automatically | R11.2-1 |
