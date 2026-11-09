# SPOCK | Workflow Blueprint
### How work is composed, staged and permitted to advance
**Version:** 1.42 · **Date:** 11 September 2026
**Document type:** Specification
**Intended readership:** Engineering and solution architecture
**Status:** For review
**Version history:** kept with the master

---
## 1. Purpose and scope

This document specifies how governed work is **composed and advanced**: which agent runs which skill in what order, what evidence must exist between steps, where a person decides, and what decides whether work may proceed at all.

**It is one of three, and they are read together.** The **Agent Blueprint** specifies what a governed agent and skill must be. Deployment and the documentation model live there too. The **SPOCK System Blueprint** is the strategic account of the set and carries no rules. This one specifies what happens between them. Where a rule here names a skill, a record or a tenant, it is defined in the Agent Blueprint and cited rather than restated.

The principles in the Agent Blueprint section 2 govern this document unchanged, and are not repeated. Where a rule below seems arbitrary, its justification is there.

**Execution assumption.** A workflow is composed of steps that each perform one job and stop. A workflow itself may run for weeks; each step within it does not. That distinction is what makes the rest of this document possible.

**Where a workflow runs, and who runs it.** A workflow runs at the level of a **product** — one product, one repository, one tenant (Agent Blueprint §8.1). A team works at that level. One run belongs to one product; a workflow definition is deployed into many.

A run is worked by a **team, not an individual**. The roles that carry a discovery run are the product trio and an analyst, with research, design and delivery roles entering at the steps that call for them. This is why the control machinery in section 6 exists in the shape it does: the precondition check and the shared state vocabulary are what pass work between people who are not watching each other work, and a run that can hold at a gate for days is a run that changes hands.

Which named roles occupy those seats is a property of the organisation rather than of this specification, and no criterion tests it.

---
## 2. The workflow

A workflow states which agent runs which skill, in what order, what evidence must exist between steps, and where a person must decide. Agents and workflows are independent. One agent appears in many workflows, and one workflow uses many agents.

```yaml
workflow: market-discovery
version: 0.4.0
owner: discovery-lead@bank.example
kind: fixed                               # a fixed sequence; adaptive form below
pattern: gate-then-parallel-then-synthesis   # composition shape, from the catalogue (Agent Blueprint §4.6)

input:  { brief: string }
output: { records: [market-synthesis] }   # §3.5

steps:
  - id: intake                            # isolation: untrusted material → typed facts (Agent Blueprint §6.2)
    agent: source-intake
    skill: source-extract@1.0.0           # quarantined-extract: no tools, fixed output schema
    stage: exploratory
    produces: [source-facts]              # artifact types
    records:  [source-extract]            # record types written (§3.5)
    gate: { checker: independent, criteria: [output_matches_contract] }

  - id: scan                              # the gate step, before the fan-out
    agent: market-analysis
    skill: market-analysis@1.3.0
    stage: exploratory
    requires: [source-facts]                # supplies the skill's facts input; market and region come from the brief
    produces: [market-scan]
    records:  [market-scan]
    gate:
      checker: independent
      criteria: [output_matches_contract, quality_rules_passed]

  - id: competitors                       # parallel worker
    agent: competitor-profiling
    skill: competitor-profiling@1.0.0
    stage: exploratory
    requires: [market-scan]
    produces: [competitor-profile]
    records:  [competitor-profile]
    gate: { checker: independent, criteria: [output_matches_contract] }

  - id: opportunities                     # parallel worker
    agent: opportunity-assessment
    skill: opportunity-assessment@1.0.0
    stage: exploratory
    requires: [market-scan]
    produces: [opportunity-assessment]
    records:  [opportunity-assessment]
    gate: { checker: independent, criteria: [output_matches_contract] }

  - id: synthesis                         # joins the parallel outputs; §2 rules
    agent: analysis-synthesiser
    skill: analysis-synthesis@1.0.0
    stage: delivery
    requires: [market-scan, competitor-profile, opportunity-assessment]
    produces: [market-synthesis]
    records:  [market-synthesis]
    gate:
      checker: independent
      criteria: [edges_typed, review_complete]

join:
  at: synthesis
  on_partial_failure: hold_and_escalate   # a declared partial-failure disposition (Agent Blueprint §4.6)

human_gates:
  - { after: synthesis, role: accountable_owner, when: before_promotion }
  #   the record is produced here; a person promotes the document assembled from it

hard_stops: [compliance_proof_missing, trace_missing, required_signoff_missing]
runtime_routing: forbidden                 # steps cannot be added or reordered while running
limits: { max_cost_eur: 8.00, max_wall_time_s: 2400 }
```

Two shapes are permitted:

| Shape | May do | May never do |
|---|---|---|
| **Fixed** | run its declared steps in order | branch, add a step, skip a gate |
| **Adaptive** | choose among approved workflows; repeat one when evidence is insufficient; skip a step only where the definition permits; stop for a person | create a new step; bypass a hard stop |

An adaptive workflow is steered by an agent — a **Lead** — which selects the next block from the set the workflow declares. That is not ordering logic held by the agent: the order is the workflow's, and the agent exercises a choice the workflow already bounded. A Lead learns **how well it chooses**; it never learns **what it may choose from**, which is the craft-and-rules line in the Agent Blueprint §11.3.

The same declaration in its adaptive form. Note that it composes `market-discovery` above **by reference, as one step**, which is what R3-1 requires of any composed workflow:

```yaml
# LEAD-DRIVEN PROCESS: Product Discovery
#   An adaptive journey. A Lead steers among pre-built workflows + human gates.
#   Started by engaging the Lead. The route adapts; the building blocks do not.
workflow: product_discovery
  kind: adaptive                              # the second shape, not a second type
  invoked_by: engage(Discovery_Lead)          # a Lead runs it, not a command
  steered_by: Discovery_Lead
  blocks_it_may_route_among:                  # all pre-built, never invented at runtime
    - workflow: market-discovery                  # the workflow above, called as ONE step
    - workflow: competitive_landscape
    - workflow: qualitative_synthetic_research
    - workflow: quantitative_validation
    - gate(human): is_this_problem_worth_solving?     # a person decides
    - gate(human): ready_for_solution_design?
  steering_logic:                             # which block to pick, from the declared set only
  #   the Lead learns how well it chooses; it never learns what it may choose from
    - read readiness after each block
    - loop qual research if novelty has not faded     # adapt, within the rails
    - skip quant validation if the problem is already clear
    - pull in a person at the gates that matter
    - never create a new step; only route among the blocks above
  output: a validated problem + evidence, handed to the next stage
```

**Execution may be discontinuous.** A workflow is not required to run to completion in one sitting. It may hold at a human gate for days, resume with a different person, and continue — because its state is *derived* rather than *held*. The readiness signal (section 6.1) is calculated from records whenever a record is written, so a run's position is recoverable from what it has produced and never depends on a session having persisted.

A workflow therefore declares what its resumption depends on:

```yaml
resumption:
  input_staleness:                        # declared bounds on what this run depends on
    - { input: competitor-profile, max_age: 3 months, on_stale: re-research }
    - { input: source-facts,       max_age: 30 days,  on_stale: stop_and_escalate }
  re_entry: re-evaluate before the next step
```

**Rules**
- **R2-1** Sequencing belongs in the workflow. An agent definition never contains ordering logic.
- **R2-2** A step that reviews or verifies another step's output names a different agent than the one that produced it, in keeping with the principle that nothing certifies itself.
- **R2-3** **A workflow declares staleness bounds for the inputs it depends on, and re-evaluates them on re-entry before the next step runs.** A document is flagged when a source record *changes* (Agent Blueprint §10); a run must also notice when its evidence has merely become *old*. Without this, a run resumed after a long pause rests on evidence that was current when it started and is not current now, with nothing to say so.
- **R2-4** **An artifact produced outside a composition is not consumed by a composed workflow unless it has passed the gate it would have carried within one.** Without this rule the absence of composition is a route around every gate in the system: produce the artifact by direct invocation, then feed it in. The gate is a property of the artifact's intended use, not of how it happened to be created.
- **R2-5** **An agent never invokes another agent.** Composition is the workflow's job, and one agent deciding that another should run is ordering logic — which the first rule in this list already places outside an agent definition. This is stated separately because the consequence is not only structural: a role that can call another role acquires that role's reach without declaring it, and the capability ceiling in Agent Blueprint §4.3 stops describing what the role can cause to happen. Work that needs two roles is a workflow with two steps.

---
## 3. Composition

A workflow adds governance to skills that already know their job. Three things are composed: a workflow, a workflow composed **into** another workflow, and a skill run outside every workflow.

**Rules**
- **R3-1** Every workflow declares a name, a version and an owner, and is composed **by reference, never by restatement**. A workflow that restates another's steps has forked it.
- **R3-2** A composed workflow **brings its own quality gate**. The composing workflow does not reach inside it, and declares only what it requires out of it.
- **R3-3** A composed workflow may be run alone and is **still governed**, because its gate travels with it.
- **R3-4** A composing step **names the workflow it composes and resolves to that workflow's own declaration.** Composition by reference (R3-1) is governance only where the reference resolves: a step naming a workflow whose steps, gate and hard stops are written down nowhere has declared a composition and delivered none, and the composing workflow is then read as describing a build it does not describe. **What is checked is the resolution, never only the name.** A check that passes over an unresolvable reference — because the referenced workflow had no declaration when the check was written — cannot see the omission it exists to catch, and the exemption outlives the reason for it.
- **Composition adds governance. It never adds competence.**

### 3.1 Every agent is a front door, and none is a shortcut

A workflow may be entered by invoking any agent that appears in it. Where no run is in progress, invoking an agent that belongs to a later stage **starts a run at the beginning** and says where the work actually begins — it does not start midway. Where a run is in progress, the skill picks up at that run's position, subject to its precondition check.

This is what stops the sequence being advisory. An agent that could start wherever it was invoked would make every stage before it optional.

### 3.2 A closed composition runs without a person, and is therefore its own unit

Most compositions stop for someone. One that does not — triggered automatically, approved by nobody, writing into a store that outlives the run — is **specified, versioned, owned and reviewed as a unit of its own**, not as a passage inside a larger workflow.

The reason is not stylistic. A unit nobody watches is the one that most needs a boundary a reviewer can see.

### 3.3 Free roam is the absence of composition, not a peer of it

A skill run outside every workflow follows its own instructions only: the same agent, the same knowledge, the same output shape, without the constraints a workflow places on it. It is a first-class way to use a skill — how people try an agent before trusting it with a run, and how know-how gets used for work that is not a full cycle.

**It is not a mode.** There is composition, and there is its absence. The agent is not less aware of its context when invoked this way; it is simply not held to a protocol. Nothing about the skill changes — only what checks it.

**What composition adds — inside a workflow only**

- Precondition checks: a step will not advance without its declared inputs, accepted and fresh
- Sequence: a step runs where the composition puts it
- Gates: quality gates on shape, decision gates on content
- Coverage checks, and the conformance record they feed
- A run identifier, a position in run state, and staleness propagation
- Fixed storage, each artifact to its declared location under the run
- A decision record at every gate
- Permission to write to a store that outlives the run — area knowledge, promoted memory, the catalogue

**What travels with the skill — always**

- The know-how. What "good" means does not depend on how the skill was invoked
- The output contract. Free-roam output has the same shape as governed output
- The method, and the reasoning behind it
- The standing guarantees of the system it belongs to
- Its declared limits. An unbounded skill is one nothing can stop, however it was invoked

> The asymmetry is deliberate. A skill invoked outside a composition is not a lesser skill — it is the same skill with nothing checking it. Which is why its output carries that designation everywhere it goes: the difference is not quality, it is whether anything verified the quality.

### 3.4 The free-roam designation travels, and free roam writes to nothing durable

**Rules**
- **R3.4-1** Every artifact records the workflow that produced it, or records that it was produced outside one.
- **R3.4-2** The designation travels. Material produced outside a composition and later adopted into a run **stays marked**, and anything derived from it says so.
- **R3.4-3** **Free roam never writes to any store that outlives the run and is read by later work** — area knowledge, promoted memory, and the catalogue. Only a run, with a person adopting it, promotes anything into them; otherwise work that passed no gate enters the organisation's memory through the one path nothing checks. It does write its own **record and trace** like any other invocation: an uncomposed run that left no record would be the one piece of work the system could not account for.
- **R3.4-4** Adoption is a **human decision with a decision record**. Nothing is adopted silently, and a composed run consumes its own artifacts by default.
- **R3.4-5** A skill run outside a composition declares no gates and passes none. Its output has not been checked, and says so.
- **R3.4-6** **A system that offers uncomposed use declares how it is entered, and the entry is explicit.** The absence of composition still has to be asked for, and the request is recognised by a declared token rather than inferred from how a request is phrased. **Where a mode is inferred the usual cost is a badly shaped answer; here it is ungoverned output entering a governed run.** The token and the value the record carries are the same string, because a translation between what a person typed and what the record says is a place for the two to disagree.
- **R3.4-7** **A binding may be barred from uncomposed use, and the bar is declared where the work happens rather than described in prose.** The case that requires it is a quarantine step: material that neither the user nor an agent authored, handled outside a workflow, has no gate behind it and no record downstream of it. The declaration sits on the binding, so a role may carry uncomposed use while one of its bindings does not, and something compares the declaration against every surface that offers the entry.

> **Reference implementation — SPOCK discovery pilot, 14 August 2026.** Free roam was **fully built as a state and unreachable for eleven days.** The designation travelled, the mark was transitive, adoption was a recorded human decision, and nothing it produced could reach the durable store — while the only entry rule an agent read said that an agent with no run in progress starts a run at the brief. **Every control on the mode was therefore unexercised**, which is indistinguishable from a control that does not work. Giving it an explicit token made the modes a thing a wrapper could be wrong about on two surfaces, so a check compares each surface against the registry, and the quarantine binding declares the discovery mode alone. **The first invocation with the token produced a correctly marked, ungated artifact and the quarantine binding declined it, quoting its own rule** — and it also surfaced a field the producing skill had required since it was written and no schema declared, because the path that reaches that field is only reachable outside a run.

### 3.5 What a workflow owes the Agent Blueprint

A workflow does not define what an artifact *is*, what a record *is*, or where the system runs. It does have obligations to all three, and they are stated here because a workflow is where they are actually discharged.

**Every artifact a step produces declares its class** — output, asset or agentic asset, as the Agent Blueprint §10.1 defines them. The class is declared on the artifact type in the register, not chosen at run time by the step producing it.

**Class determines whether the step carries a decision gate.** An output does; an asset and an agentic asset do not. This is the rule that answers a question a workflow otherwise leaves unexplained — why some steps stop for a person and others do not. A step producing only assets and passing its quality gate advances without one, and that is a property of what it made rather than a convenience.

**Every step writes a record** (Agent Blueprint §7.1), and documents are assembled from those records rather than written alongside them (Agent Blueprint §10). A workflow declares which record types each step produces; it does not declare documents, because a document is a view over records and not a step's output.

**A refusal writes an event record.** A blocked precondition, a refused adoption, a stale input a run declines to advance past — each leaves an event record rather than only a state change, so a run that stopped is distinguishable from one that was never started.

**A run happens inside exactly one tenant**, and every record it writes carries that tenant. A workflow is not deployed across tenants; the same workflow definition is deployed into many, separately.

**Rules**
- **R3.5-1** A workflow declares, per step, the artifact types it produces and the record types it writes.
- **R3.5-2** A step producing an artifact whose type declares class `output` carries a decision gate. A step producing none does not.
- **R3.5-3** A workflow never declares documents. It declares records, and documents assemble from them.
- **R3.5-4** Every refusal a step makes writes an event record.
- **R3.5-5** A run resolves to exactly one tenant, and every artifact and record it writes carries it.

### 3.6 A step whose job is N of one kind is N invocations, not one

A workflow is composed of steps that each perform one job and stop (§1). Where that job is to produce **several instances of one kind of thing** — a profile per participant, an analysis per trend, a review per module — the step is composed as **one invocation per instance**, not as a single invocation that produces the set.

**This is a composition rule and not an efficiency one.** A single invocation asked for six of something divides one budget of attention six ways and meets its length bound while the last one is being written. The instances are not equally served: the first is thorough, the last is a sentence. **Nothing detects this**, because the artifact is well formed, every field is present, and the thinness is uniform enough to read as a house style. The gate sees a complete set.

**The downstream step is what pays.** A step that consumes the set and cannot go back to the source — one holding no outward capability, by design — has exactly what the producing step wrote. Depth not gathered at the producing step cannot be recovered anywhere, and the consuming step's output degrades into commentary while passing every check it faces.

**Rules**
- **R3.6-1** Where a step's output is a set of instances of one kind, the workflow composes it as one invocation per instance, each carrying its own effort bound, and a join that assembles the set.
- **R3.6-2** The assembling join **transfers what each invocation produced and does not re-author it.** It may add the envelope, reconcile identifiers and record an instance that failed; it does not summarise, normalise prose, or correct a value an invocation derived. A join that rewrites its inputs is a second producer wearing an assembler's name, and the record of what each instance actually found is lost before any check reads it.
- **R3.6-3** An instance whose invocation fails is **recorded as unproduced with its reason** and does not remove the others. A partial set is a stated result; a silently short one is indistinguishable from a complete one.
- **R3.6-4** Where a producing step feeds a consuming step that holds no capability to gather more, the producing step's **effort bound is set per instance** rather than per step. A bound set per step is spent by the instances that happen to run first.
- **R3.6-5** **A step whose output holds N items emits incrementally, one item per write.** This is the join's rule first — fanning out sets each instance's bound (R3.6-4) and leaves the join holding the sum of every instance that ran, so a join composed as a single emit is bounded by one invocation's output ceiling while its input grows with the fan-out. **But the bound is a property of the output, not of the join**, and it applies equally to a single step asked for a set nobody fanned out: an idea set, a hypothesis set, a requirement list. **The step that fails is the one whose size nobody set.** An over-ceiling emit produces nothing at all — not a truncated artifact, not a partial item — and because its inputs are intact on disk it reads as work in progress rather than as a failure.
- **R3.6-7** **A step's input is bounded as its output is, and the two fail differently.** An over-ceiling output produces nothing and leaves its inputs intact, so it reads as work in progress (R3.6-5); an over-ceiling *input* spends the step's whole budget before a first write, so it reads as a step still working. **Neither is diagnosed by elapsed time.** The signal is whether the step has written since it started, and a step that has read for longer than comparable steps took end to end, without writing, is composed wrong rather than slow. Where declared inputs exceed what a step can hold, the workflow names the extent required rather than the document containing it — the section, the line range, the artifact rather than the specification around it — and drops inputs the step does not read. **Splitting the output does not fix an input bound**, and a workflow answering an input failure by writing in passes has changed what the step can be seen to be doing without changing what it costs.
- **R3.6-6** **A step reports the artifact, not the work.** A step that has assembled, transformed or written declares its output by reading it back and confirming it is well formed. A report describing what the step did is a claim about the step; the gate's subject is the file.
- **R3.6-8** **Each instance of a fan-out writes its own output, and that output is retained.** An instance writing into the shared artifact cannot run beside another, because the artifact is one file; and where the instances write into it, **nothing independent of the join survives for the join to be checked against.** R3.6-2 says the join transfers and does not re-author, and until the instances' own outputs are on disk that rule can only be asserted. The retained set is not an artifact and no gate reads it as one.
- **R3.6-10** **A rule enforced only by comparing the artifact against the retained instances holds for a fanned-out step and for no other composition of the same step.** R3.6-8's retained set is what makes the join checkable, and the check it enables disappears the moment that step is composed as a single invocation, or was run before the fan-out existed. Where what the comparison protects is a value **the record does not carry** — a name, a title, a label living only in the prose — the rule is stated against the document as well, or the same loss recurs everywhere there are no parts to compare against. **The retained set proves one instance of a defect; it does not bound where the defect can occur.**
- **R3.6-9** **A fan-out's cardinality is read against the set the step set out to produce, not against the part of it that came back.** A step that named eight instances, lost three and delivered five is inside a three-to-seven bound and has silently overshot its own decision. The bound belongs to the naming step's output, and R3.6-3's record of what was lost is what makes the sum readable.
- **R3.6-11** **A phase of a fan-out that transfers rather than authors is performed by a program, not by an invocation carrying a rule.** *Transfers and does not re-author* (R3.6-2) is a constraint stated against a producer that could break it; a program that concatenates retained instances in the order the naming step declared cannot summarise, normalise or re-title, because it does not read what it copies. **Where a phase's whole job is transfer or derivation from material already on disk, composing it as an invocation is a control asserted where a structural one was available.**
- **R3.6-12** **Where an instance writes more than one file, each file declares one destination, and the comparison against the artifact reads only the files whose destination is the artifact.** An instance that writes its output beside its own working material has two kinds of file under one folder; a comparison that walks the folder demands the working material appear in the document a reader is handed. **The destination is a property of the file and is declared with it**, not inferred from where it sits.
- **R3.6-13** **A derived output names the version of the input it was derived from, by content, and the assembling step refuses one that names a version the input no longer has.** An instance re-authored after a derivation ran otherwise publishes the previous version's derivation against the current version's work, and nothing on the page says so. **Content and not a timestamp**: a repository's files carry the modification times of whoever obtained them last, so a freshness rule reading the clock fails every retained set on a fresh copy and passes a stale file somebody touched.
- **R3.6-14** **A decision that gates an artifact produced in its own stage is recorded as a decision, never as a gate.** A gate signature says a stage passed and is therefore recorded on a stage that has reached review; a stage reaches review only once it holds everything it owes. **So an artifact that cannot be written until somebody chooses waits on a signature that waits on the artifact**, and every side of that cycle can be correct in isolation. A decision says a person decided and needs no state of the stage, which is what makes it the right instrument here. **The gate that remains is the one taken over the finished set**, and it is the first point at which a check comparing the artifact to the choice can see both.

> **Reference implementation — SPOCK discovery pilot, 17 August 2026.** The same market stage, run at the composition rule's own scale. Ten participants, one invocation each, produced 1,810 lines of cards — and the join was dispatched as a single emit. It read all ten, attempted the whole artifact in one output, hit the ceiling, produced nothing, and re-read the same files forty-one times without ever writing. **Its own report said the assembly was complete.** Re-composed as one write and six appends, two or three cards at a time, it landed in eight writes. The second failure was the same shape one level down: the file it produced carried all ten cards and no closing frontmatter delimiter, and the step reported success on an artifact that could not be parsed. **Both were caught by running the gate, neither by reading the report.**

> **Reference implementation — the same pilot, later the same day, and it is why R3.6-5 is about the output rather than about the join.** The idea set is one step with no fan-out behind it: five ideas, five fixed sections each, one artifact. **It was dispatched twice as a single generation and wrote zero bytes both times**, the second attempt after a brief that suggested writing in passes and left the judgement to the step. Re-dispatched with one idea per write as a requirement, **it landed in twelve writes and twelve landed** — six for the sections, five more to promote them to the heading form the check reads, and one for the envelope. Across both artifacts that day the tally was five single-generation attempts producing nothing and twenty incremental writes all landing. **The failure had been attributed to the join's size and it was the output's shape.**

> **Reference implementation — SPOCK discovery pilot, 19 August 2026, and it is the first fan-out this estate composed on purpose rather than in repair.** The idea step was recomposed as one invocation naming the set, one invocation per idea, and a transferring join, then run in free roam beside the single-pass set it would replace, over the same brief, problems and synthesis. **The predicted signature of attention division was absent from the single pass**: its five ideas ran 662, 614, 673, 732 and 742 words with no decay by position, its last two the longest, and the fan-out came back shorter on average and more variable, each instance carrying its own budget. **What the fan-out did find was a defect the single pass had and nothing was looking for**: three of its five ideas were a fourth with a problem taken off, a scope ladder in a set a decision gate compares, and the comparative test that survives contact — *can either of these be described as the other plus or minus a component* — had been written for the options step downstream and never applied to the ideas feeding it. **Two findings came from the running rather than the output.** The join carried all twenty-five sections word for word and replaced every idea's heading with its bare id, dropping the name each instance gave it, which R3.6-8's retained set made visible and nothing else would have caught. And **an absolute path in a dispatch brief does not pin an instance to a checkout**: three of five wrote into a different working tree of the same repository, where the procedure under test did not exist.

> **Reference implementation — SPOCK discovery pilot, 20 August 2026, and both findings are about a control that was written and then not reached.** The pilot's discovery workflow composes two workflows of its own and **named a contract file for one of them and none for the other**, so the one composed workflow that reaches outward had its steps, its quarantine boundary, its gate and its hard stops written down nowhere. The build's contract checker passed it **by an explicit exemption in its own code**, added when the second workflow genuinely had no declaration yet and carrying a comment that said so; the exemption outlived its reason by weeks, and the check that exists to catch a contract describing a build it no longer matches was blind to the contract that did not exist. Writing the missing declaration surfaced a second exemption of the same shape: the rule that a step names a skill of its own workflow had been narrowed to fire on one contract by name, so the new one was admitted unchecked. **Neither exemption was a decision anybody would defend; both were true when written.** In the same session the estate found the other half of R3.6-8's limit. An idea's name lives in its heading and in no field of its record, so a join replacing headings with bare ids removed the name from the run — **caught by comparing the artifact against the retained instances, and catchable by nothing else**, which meant the identical loss in a set produced by a single invocation had no instrument at all. R3.6-10 is that gap stated as a rule.

> **Reference implementation — SPOCK discovery pilot, 13 August 2026.** The market stage profiles selected participants into durable cards, and its synthesis holds an empty capability list by design so that *every element traces to a card* cannot be satisfied by going and looking. The stage had been specified as one invocation producing every card. Composed instead as one invocation per participant, with its own five-search routine and its own budget, three participants produced cards carrying ten, ten and eight named product capabilities with published prices — the field the synthesis actually aggregates. **The depth was not available to the synthesis by any other route**, and the specification's own delegation of the card's field set to a body of know-how had said nothing about how many invocations wrote it. The join was specified as transfer-only in the same change, after its first emit re-authored a nested field into a shape the specification did not declare.

### 3.7 A step is instructed with the test it must pass, not with the material it should use

A step's instruction is part of its composition and not a note attached to it. **Where that instruction names material — a constraint, a candidate, a document to imitate — the step builds its output around the material named.** This is not a failure of the step. It is the instruction being followed, and the material arrives back shaped as the answer whether or not it was offered as one.

**The failure is invisible in the output and visible only against the source.** An option set built around the constraint the instruction happened to name is a well-formed option set. A document copying the shape of an earlier one carries that one's stale version string in a field nobody re-derived. Every field is present, every check of shape passes, and what is wrong is that the step answered a question the instruction asked by accident.

**What survives contact is a test rather than a subject.** An instruction giving the step a test to apply to its own output — *can either of these be described as the other plus or minus a component* — constrains the result without supplying it, and leaves the step the work the step exists to do. An instruction naming the dimensions to vary has already done that work, badly, from outside the step.

**Rules**
- **R3.7-1** A step's instruction states the **test its output must pass** and the **bounds it runs under**. Where it names material, it names it as source to read rather than as subject to build on, and the distinction is explicit.
- **R3.7-2** Where an instruction offers an example, a prior artifact or a pattern to follow, it states **which properties of it transfer** — the shape, the section set, the envelope — and that every value carried across is re-derived at the point of use. **A prior artifact is a source of form and never of content**, including the content of its own metadata.
- **R3.7-3** Where a step's output has a permitted range, the instruction states that **the floor is a legitimate answer**. A range whose floor is never named is read as a target, and a step pads to it rather than return fewer items than it believes were asked for.
- **R3.7-4** Where an instruction is corrected and the step's next output carries a new defect of the same class, the **instruction is corrected again before the step is**. A step that produced three defects under three instructions has demonstrated one thing about the step and three about the instruction.

> **Reference implementation — SPOCK discovery pilot, 18 August 2026.** One run, seven stages, **five returns to a producer and every one of them caused by the brief.** The pilot-option step was told the consent question was the material design constraint and returned an option varying consent, which piloted the position a named competitor already holds rather than the idea selected at the gate. Re-briefed with a card freeze offered as an available design choice, it returned three options forming a scope ladder, each containing the one before it. Re-briefed a third time with a test — whether either option can be described as the other plus or minus a component — and with two stated as a legal answer under a two-to-three bound, **it returned two options differing on one design decision, neither containing the other.** The requirement step was told to follow an earlier run's front matter as the envelope pattern and copied that run's `structure_basis` of `prd_template@0.2` against a body at v0.4; told to carry the compliance touchpoints across from the upstream artifact with their basis intact, it copied that artifact's object shape into a field the register declares as a value list, which the run-scoped check does not read and the estate check refuses. **The producers were instances of two different agents and the defects were one class.**

---
---
---
### 3.8 What a step produced and what a person reads are two files

A step produces a **record**. A person reads a **document**, and the document is assembled from one or more records. Holding both in one file is the arrangement most implementations start with, and it fails in one direction: the fields a gate reads accumulate at the top, the prose beneath them shrinks to a summary of what is already above it, and the file a reviewer opens becomes the smaller half of itself.

**Rules**
- **R3.8-1** **A record is one production, not one stage.** A step that runs once writes one; a step composed as a fan-out (§3.6) writes one per instance; a step that needs three rounds writes three. This is what makes the transfer rule of R3.6-2 checkable at every step rather than only where a fan-out happened to leave instances behind.
- **R3.8-2** **A field a gate decides lives on the record, and the line is drawn by a question rather than by taste: can two records of the same document answer it differently?** If they can, it belongs to the record. If it is one value for the whole document, or if it records what a *person* decided about the document, it stays on the document. Getting this backwards in either direction is visible immediately: a per-production field on the document has two places for one fact, and a document-level field on the records has the same fact written N times with nothing keeping them equal.
- **R3.8-3** **The assembly is checked in both directions, and the second direction is the one that matters.** Every citation in a document must resolve to a record, and every record must be cited by the document it feeds. A generated reader-facing copy could not drift from its source; **an assembled document can drop a record, read perfectly, and pass every other check in the estate.** Ten things researched and nine written up is a failure the single-file arrangement could not have and this one can.
- **R3.8-4** **A document whose readership forbids internal identifiers cites in its record list and not in its body.** Where a body of know-how rules that a document carries no run identifier, stage number or gate name — because it is read by people who have never heard of one — a citation is exactly such an identifier. The body half of R3.8-3 is waived for that document and the record half is not, so a dropped record still fails.

> **Reference implementation — SPOCK discovery pilot, 20 August 2026.** The pilot ran on one file per artifact for six weeks. Its competitor deep-dive was **155,638 characters of record behind 8,839 characters of reading**: the participants, their capabilities, their pricing and their sources were all present, all in fields, and a reviewer opening the document met a summary of what the assembly had done. Splitting the two moved the same run to 98% reader-facing with nothing added and nothing lost.
>
> **The field line was settled by running the first assembly rather than by deciding it.** Three fields were moved to the records on the argument that they described a production, and three checks refused the document within a second, each correctly: they are one value for every record behind an output and two of them record what a person did *after* the assembly. That is the whole content of R3.8-2, learned in one attempt.

---

## 4. Stage: blocking compared with scoring

Two instruments, wired differently:

| | Nature | On failure |
|---|---|---|
| **Constraint** (schema match, spend cap, required field, obligation) | binary | halts |
| **Measurement** (subjective quality, thoroughness, tone) | graded | records a score and informs; does not halt in a reversible stage, and may halt at a delivery stage (see below) |

**R4-1** A measurement does not gate execution in a reversible stage; at a delivery stage it may halt, as the stage table below sets out. A constraint is never reported as a percentage.

**Scaling by stage.** Oversight scales with consequence, and that scaling reaches the automated checks as well as the human ones. The same skill may be required to halt on a quality shortfall where the work is about to become irreversible, and merely to record the same shortfall where the work is exploratory and will be reviewed again later.

| Stage | Measurement shortfall | Constraint failure |
|---|---|---|
| Exploratory, reversible | recorded; work proceeds; a person is informed | halts |
| Delivery, irreversible or externally visible | halts | halts |

**Rules**
- **R4-2** Only a measurement's disposition may vary by stage. Which stage applies is a property of the work, declared in the workflow, and never chosen by the skill being checked.
- **R4-3** **A skill invoked outside a workflow has no declared stage, and the strictest stage applies** — for the disposition of every measurement, and equally for which risk-scaled floor clauses activate (Agent Blueprint §4.7). Both follow from stage, so resolving only the first would leave a directly invoked skill running under a thinner floor than any workflow step. The stage is never supplied by the caller: a runtime that could name its own stage would select which clauses compose and could turn a delivery-stage halt into record-and-proceed, which is the shape of flexibility that removes governance rather than adding reach.
- **R4-4** Every constraint enumerated above is evidenced as refusing a known-bad input **in each stage the work runs in, and on the stageless path**, since direct invocation is a third context and not a stage. The evidence is **re-derived when a stage binding is added**: a case set covering the stages that existed when it was written says nothing about a stage introduced since.
- **R4-5** **No constraint scales.** Schema conformance, spend and time limits, the standing budget, the quarantine boundary, capability and data-scope limits, egress rules and compliance obligations block at every stage without exception. A stage that relaxes any of them is not a lower-risk stage; it is an ungoverned one.
- **R4-6** The disposition in force is recorded alongside the result, so a shortfall that was tolerated remains visible afterwards as a tolerated shortfall rather than as a pass.

---
## 5. Process-level assurance

Evaluating each skill is not sufficient for a process built from several of them. Reliability compounds downward: seven steps at 95 per cent each is roughly 70 per cent end to end, which is worse than intuition suggests and worse than any individual step's result implies.

A workflow therefore carries a second tier of assurance, distinct from its skills' evaluation suites, which asserts two things:

```yaml
workflow_assurance:
  achieves_goal:
    cases: workflows/market-discovery/evals/
    asserts: "the assembled output satisfies the workflow's declared output, not
              merely that each step satisfied its own contract"
  edges_match:
    asserts: "what each step produces satisfies the declared input of the step
              that consumes it, for every edge in the workflow"
```

**Rules**
- **R5-1** A workflow that composes more than one skill declares process-level assurance before it is approved.
- **R5-2** Edge checking is structural and automatic: every typed output must satisfy the typed input consuming it. It is checked at build over the workflow contract, because edge satisfaction is a property of the definition and gives the same answer for every run, not a property any single run establishes.
- Goal-level cases are graded like any other evaluation, by the independent checker.
- **R5-3** The end-to-end result is reported alongside the per-step results, never in place of them.
- **R5-4** Each tier is labelled by what actually enforces it. The goal tier is graded only where its evaluation suite exists; until it does, it is declared **pending**, and the assurance must not read as graded with no suite behind it. A goal tier that claims a grade it cannot produce is a false pass, the failure this document exists to prevent.
- **R5-5** **A declared reduction is true at the time it is written, and is checked against what the run actually had.** A step that states it could not do something — a knowledge body it lacked, a source it could not reach, a comparison it could not make — is declaring a limit on its own output, and that declaration is how a governed workflow stays honest about the difference between what it produced and what it owed. **A reduction that is not true spends that credibility on nothing**, and it does worse than mislead: it stands in front of the question it claims to have been prevented from answering, so the obligations the missing thing would have imposed are never assessed. Where the run's own record can settle the claim — the body was present, the destination was approved, the prior artifact existed — the claim is settled against the record and not accepted on the step's word.

- **R5-6** **A shared resource being available is a claim about the resource. Each consumer's use of it is a separate claim, and the second is never inferred from the first.** A workflow that records a knowledge body, a template or a standard as available has said something true about a file. It has said nothing about whether the steps declaring that file as an input actually read it, and the two drift in the ordinary course of building: the resource lands, and the steps that were written while it was missing keep the wording they were written with. **The register is the last place the drift will show**, because the register is a property of the resource. So availability and consumption are recorded as two states, and where a step declares an input, something checks that the declared path resolves and that the version the run recorded is the version the resource carries.

> A reduction is the mirror image of R5-4. R5-4 refuses assurance that reads stronger than what enforces it; R5-5 refuses a limitation that reads weaker than what the run could actually do. Both are the same failure seen from opposite ends, which is why one criterion carries them. **R5-6 is the third face of it**: a resource that reads stronger than its consumers' use of it, which no amount of checking the resource will ever reveal.

> **Reference implementation — SPOCK discovery pilot, 11 August 2026.** The pilot's own generator proves the two copies of every knowledge body agree, byte for byte, from either direction. **Nothing proved that the steps declaring a body as an input used it.** On the day the count of available bodies rose to five, three of the market stage's four steps still carried a written reduction saying their body was absent, six days after it landed; a fourth step read a body its registry entry did not declare at all, and that step is the one making the identity and proximity judgements the whole trust arithmetic later depends on. Both were found by reading the steps against the register, by hand. **Neither is visible from the register**, and the pilot's build carried no check that a declared input resolves or that a recorded version matches the resource — recorded as the gap R5-6 names.

> **Reference implementation — SPOCK discovery pilot, 10 August 2026.** All three artifacts of the market stage declared the workflow's Competitive Analysis Standards absent. The body had been committed six days before the artifacts were authored and every status document listed it as available throughout. **The claim was false when it was written**, and it was standing in front of the question it purported to have been prevented from answering: with the body present, the rules it states were the ones the stage owed, and two of them were not met. One card never met the source floor; another rested on a comparison the standard forbids. The false reduction cost more than the two defects, because a workflow that can declare an untrue limit can declare any of them.

> **Reference implementation — SPOCK discovery pilot, 7 August 2026.** The Discovery workflow declares `workflow_assurance` in its contract, and a build check (its check **C48**) walks the seven steps to prove every artifact a step requires is produced by an earlier one — all edges connect from brief to initiative — and refuses a goal tier that reads as graded while its eval suite does not yet exist (R5-4). The record types per step and the artifact class→gate derivation of §3.5 are enforced by the same build (its check C44). This is the first end-to-end confirmation that §5 and §3.5 are implementable as written.

- **R5-7** **A consumer using a shared resource says nothing about anyone having declared that it does, and the two are established by different instruments.** R5-6 separates *the resource is available* from *this consumer used it*. There is a third claim underneath both, and it is the one nothing looks at: **that the consumer's declared inputs are the inputs it actually reads.** A check over declarations cannot see a dependency nobody declared — there is no entry to be wrong. **Reading the consuming step's own instructions is a different instrument, not a rearrangement of the same one**, and where a step names a resource by path in the procedure it performs, the declaration is compared against that text rather than against nothing.
- **R5-8** **Where repeated trials of one input disagree, the finding may be the rule rather than the producer, and a rule that admits two legal outcomes will produce both.** A variance measurement reports which properties moved; it does not say why, and the cheapest wrong conclusion is that the model is unreliable. **Read the disagreeing outputs against the rule before concluding anything about the producer**: where each trial argued correctly from the same sentence, the sentence is what varies. Amending it is the fix, and **the amendment is measured rather than assumed** — an amendment can move variance to a different property instead of removing it, and a rule change declared successful without a second measurement is the same false pass this document exists to refuse.

- **R5-9** **A declared reduction names the condition that lifts it, and that condition is one something can test.** R5-5 settles whether a reduction was true when it was written. **Nothing settles whether it is still true**, and a reduction is written precisely because something is missing, which is a state that ends. Its wording is authored once, at the moment of the gap, and is then carried forward by every step inheriting that procedure, so **the ordinary lifecycle of a reduction is that its cause is removed and its text survives**. A reduction whose lifting condition is stated only in prose is a permanent reduction, because the sole instrument that can retire it is somebody remembering it exists. The condition is stated as something the build evaluates — this resource resolves, this destination is approved, this version is at least that one — and **a reduction whose condition now holds is refused rather than reported**, in the same direction R5-5 refuses one that was never true.

> **This is the gap R5-6's own reference implementation recorded and did not close.** That entry describes three steps still carrying a reduction six days after the body landed, and notes that it was found by reading the steps against the register by hand. Finding it by hand is what happens when the reduction names no condition: there is nothing for a check to evaluate, so the only reader is a person who already knows.

> **Reference implementation — SPOCK discovery pilot, 27 August 2026.** The pilot wrote the compliance knowledge body that five of its steps had declared as an input since the registry was built and that none had ever had. **Four of those steps carry a section headed "the reduction until the Compliance Guidelines land"**, each instructing the producer to mark every compliance touchpoint indicative in its own text and naming the absent body as the reason. The body landed. **Nothing in the build can notice**, so on the next run those four steps will read knowledge that exists, mark their output as produced without it, and pass every check: the artifact field exists, the check over it is founding and green, and the reduction is now false in exactly the way R5-5 refuses. It was true when written, which is why R5-5 cannot see it, and the register shows the body present, which is why R5-6 cannot see it either. Recorded as the gap R5-9 names, with the four sections owed.



> **The direction matters more than it sounds.** An undeclared dependency is invisible to every downstream control that reasons from declarations: what a run records having read, what an assurance pass re-proves, what an impact assessment walks when the resource changes. **The step is compliant with everything anyone checks and is reading a document nobody knows it reads.**

> **Reference implementation — SPOCK discovery pilot, 12 August 2026.** The step that assigns the origin and proximity of every observation — the two fields the workflow's entire evidence arithmetic is computed from — cited its standards document by path twice inside its own numbered procedure, and its registry entry declared no know-how at all. The declaration check was green throughout and its own comment stated the gap and concluded that no rearrangement of it would find one. **That was correct and it was not the end of the matter.** A scan of every step's text against its declarations found exactly one instance, which is the result worth having: the check is what keeps it at one.

---
> **Reference implementation — SPOCK discovery pilot, 14 August 2026.** The variance subject was declared on 12 August, before any agent-driven run existed, so that the first measurement would be measured rather than described afterwards. Taken on 14 August: three trials of one step against one held-out input, compared only on the structural properties the gate already computes. **Four of ten properties held.** The trust arithmetic was identical in every trial and every place the rule had a determinate answer; what moved was the composition, and one judgement inside it — **the same solution-shaped candidate was reduced twice and rejected once, and the rule permitted both.** The rule was amended and the measurement repeated the same day: both substantive hypotheses then came out identical across all three trials, and **the split survived**, on a reading of the amended rule that collapsed its new clause into the old one. A third amendment closes that reading and is recorded as unmeasured.

**R5-14** **Text a step copies verbatim from a governed source body is not prose that step wrote, and the style and vocabulary rules that apply to authored prose do not apply to it.** A body written by somebody else carries their words, including words the estate bans from its own writing. **The remedy is to mark the copy as a quotation rather than to exempt the file that holds it**: an exemption reaches everything in the file, and a marked quotation says what a reader is looking at.

---
## 6. Control, how work advances

### 6.1 The readiness signal
Whether work may proceed is decided by a signal calculated from five independent checks, recomputed whenever a new record is written.

```yaml
readiness:
  evidence:           pass      # required records exist
  evaluation:         pass      # quality checks passed
  compliance:         PASS      # absolute: blocks if failed
  documentation:      pass      # trace and links complete
  human_confirmation: PENDING   # absolute: blocks until given

result: HOLD
reason: "human_confirmation outstanding"
```

**Rules**
- **R6.1-1** Compliance and human confirmation are absolute. A failure or absence blocks advancement regardless of every other check.
- **R6.1-2** The signal is calculated from records, never from a component's assertion that it has finished.
- **R6.1-3** No component calculates its own contribution to the signal.

### 6.2 Separation of control from execution
**R6.2-1** The component that decides whether work advances performs no work itself, and cannot modify the process it is enforcing. Its only outputs are advance, hold, and escalate.

### 6.3 Gate procedure
**R6.3-1** At every gate, in this order:

```
1. state what is being checked
2. identify the independent checker
3. attach the required evidence
4. evaluate absolute checks first
5. record the decision and its rationale
6. advance · hold · escalate
```

**R6.3-2** **On re-entry**, a gate reached after a pause performs one step before the rest: the staleness bounds the workflow declares (section 2) are re-evaluated against the inputs this step depends on, and a breached bound takes its declared disposition. This is placed here rather than left to the workflow because a rule with no enforcement point is guidance, and the gate is the only place a run is inspected before it proceeds.

**R6.3-3** **The automated check precedes the human decision, and the record shows it — as far as its own granularity allows.** Nothing reaches a person unchecked, so a decision gate dated before the quality gate that admits the step to review describes a sequence that cannot have happened. **The two timestamps are compared, not merely required to exist.** An inverted pair is the signature of a record written to close a gap rather than to register an event — a decision backfilled to make a run read as complete — and it is invisible to a check that only asks whether each gate is present. Where a record is genuinely written later than the event, it carries the date of the **event**, and that date still falls on or after the check.

**A comparison is only as good as its operands, so the shape is checked before the order.** An absent timestamp, an empty one, or one in a format that does not sort — a date written `2026-8-4` sorts after `2026-08-10` — all defeat an ordering test silently, and an inverted pair then reads as ordered. Requiring the field to be present and well formed is part of this rule, not a separate concern: **the cheapest edit that defeats a comparison is deleting the thing it compares.**

**Where a record carries dates rather than timestamps, same-day satisfies this rule.** A check and a decision on one day is the ordinary case, and a stricter reading would demand a precision the record does not hold. An implementation that stores dates therefore enforces *the decision does not precede the check*, and **says so in its own specification** — a relaxation argued only where the code is written is a relaxation nobody agreed to.

**R6.3-4** **The record names what ran the check, and it is never the step's own producer.** Step 2 of R6.3-1 requires the independent checker to be identified at every gate; **that identification is part of the record, not a step performed and forgotten.** A gate record that does not say who ran it cannot be shown afterwards to have been independent, and one naming the producer of the step it grades is self-assessment wearing a gate's name — the producer agreeing with itself, which is the failure an independent checker exists to prevent.

**The runner is required and non-empty for the same reason the timestamps are:** the cheapest edit that defeats a check is deleting the thing it reads. Where the automated half of a gate is a program rather than a person, no agent or skill of the workflow belongs in that field at all — an automated gate has no producer running it, and a record naming one is either false or describes a gate that should not have been trusted.

**Enforced from both sides, from one definition.** The writer refuses to create such a record and the gate refuses one that arrives any other way — a hand edit, a backfill, or a record written before the rule existed. Both read the same list of who counts as a producer, because a rule encoded in two places is a rule that can come to disagree with itself.

**R6.3-5** **A value the specification calls derived is recomputed at the gate, never read from the record — and the recorded verdict of a gate's own automated half is such a value.** Where a field is defined as a function of other fields — a tag calculated from the evidence beneath it, a count summed from its entries, a tier read off what exists, **the pass or fail a check computed** — the gate applies the function and compares the result to what the record or the artifact claims. **Reading the field is not checking it.** A derived value written by the step that produced the artifact is that step's assertion about itself, and a governed gate that accepts an assertion where it could perform a calculation has left the one thing it was cheapest to verify unverified.

**A wrong derived value arrives with a rationale, which is what makes it survive review.** The step that computed it wrongly explains it confidently, and a person at the gate reads a coherent account of a conclusion nothing tested. Presence checks on the inputs do not close this: that the evidence exists and that its references resolve are each necessary and neither is sufficient, because the defect is in the arithmetic between them.

**One implementation, shared by the gate and the evaluation suite.** Where the same derivation is exercised by held-out cases and by the gate, both call the same function rather than each carrying its own — two implementations of one rule are two rules that can drift, and the suite then proves something the gate does not run. The independence that matters here is code against agent, not file against file.

> **Reference implementation — SPOCK discovery pilot, 10 August 2026.** A problem hypothesis carries a trust tag the pilot's specification calls derived and non-negotiable, calculated from how many independent origins its evidence has and how close each is to the person who experienced the problem. **Nothing at any gate had ever recomputed it.** Two checks stood in front of it and neither could reach it: one refuses a hypothesis with evidence and no tag, the other refuses a reference that does not resolve — both necessary, neither sufficient, because a hypothesis citing two references that shared a single origin could be labelled strong, pass its gate, and carry a rationale explaining the strength. That is the failure the whole evidence discipline exists to prevent, standing behind two green checks. The arithmetic already existed inside the evaluation suite and graded seventeen held-out cases; it moved to a shared module so the gate and the suite call one function, and the suite now proves the function the gate runs.

> **Reference implementation — the same pilot, 29 August 2026, and it is the same defect one field over.** The workflow was driven for the first time on the surface it delivers into, where the producing agent cannot run a program at all — correctly, because a producer that runs the check over its own work has assessed itself rather than been verified. **Every earlier run for seven months had been driven from a surface where one actor invoked the step, ran the gate and wrote the record**, so the verdict and the check were never separable enough to disagree and nothing had ever needed them to be. Separated, the verdict is a word somebody types: a run was driven to an accepted final stage with all six earlier stages still reading `pending`, in six commands each exiting zero, both halves of its last gate recorded as passes that no check had produced. **A run committed seven months earlier already carried the same shape** — a later stage accepted over an earlier one that was only produced — and every command in that repository reported it sound. The verdict field had been governed for who may be named in it and never for whether the thing named ever ran.

**R6.3-6** **What the gate could not check travels on the artifact the decision is taken on, not only in the run's record.** A gate that names the rules it was unable to run has declared its known gaps, and **where that declaration lives decides whether anyone reads it: the person at the gate opens one document and decides.** A statement held in the run record, in an assurance summary, or in a report they would have to know to go and look for reaches them only if they already suspected it was there — and the reliable outcome of *you must know to go and look* is that nobody looks.

**It is derived, so it is recomputed rather than read** (R6.3-5). The list follows from the rules bound to the step that produced the artifact and from which of them an instrument actually decided, so the gate computes it and refuses a stored list that disagrees. A list written by the producing step is that step's own account of what nobody checked about it, which is the self-assessment R6.3-4 refuses in the runner field, wearing different clothes.

**Where a rule cannot be settled by reading the artifact at all, the statement says so.** Some rules are about how the output was produced — whether a value was supplied or invented, whether a step consulted only what it was permitted to read — and no reader of the finished document can decide them however carefully they read. **Marking that distinction is the difference between a reviewer who knows to stop and one who searches a document for an answer it cannot hold.** It also prices the alternatives honestly: a second opinion bought to close such a gap reads the same finished document and closes nothing.

**An empty statement is written, not omitted.** Where every rule of a step was decided by a check, the artifact says so explicitly. Silence and *nothing to report* are indistinguishable to a reader, and only one of them is a claim somebody made.

> **Reference implementation — SPOCK discovery pilot, 12 August 2026.** Every quality gate had stated its unrun tally since the tier was built, and it stated it on the run record — the one document nobody opens in order to decide. Each artifact now carries the rules its producing step's gate could not decide, each marked as needing a judge or a check nobody has written, and each judged one marked further by whether the answer is in the document at all. The list is recomputed at the gate and a stored list that disagrees fails. **The limit is published with it:** where a second step writes into an artifact it did not produce, its rules appear in the gate's tally and not on the artifact, because the artifact records one producer and a second source of truth for who wrote what would cost more than the gap it closes.

---

- **R6.3-7** **A gate with no judged rules has no judged half, and is never counted as one that ran.** Where a gate's coverage is reported as a proportion — *n of m gates run their judged half* — the arithmetic must distinguish a gate whose judged rules were all decided from a gate that had none to decide. **They are not the same state and only one of them is evidence.** A gate that has no judged rules is a gate where every rule fell to a mechanical instrument, which is a good outcome and says nothing whatever about whether a judged instrument exists, is configured, or has ever run.

> **This is the failure the report exists to refuse, arriving inside the report.** A tally that counts *nothing left unrun* as *the judged half ran* will, at the moment the last judged rule at some gate becomes mechanical, begin announcing judged coverage that no judge produced — and it will do so on exactly the day the underlying position improved, which is when nobody is looking for a regression. The gate with no judged half is named as such in the report and counted in neither column.

### 6.4 Precondition check

Before a step advances a run, the agent verifies its declared inputs. If any is **missing, ungated or stale**, it states what it is waiting for and stops. It will still converse, answer questions and explain what it needs — it will not produce a partial or placeholder artifact to fill the gap.

This is what makes a sequence governed rather than merely documented, and it is what carries a handoff between people: those working a run are not watching each other, the run state is what tells the next person their step is ready.

```
   agent invoked
        │
        ▼
   ┌────────────────────────────────┐
   │ read run state                 │
   │ inputs present, gated, fresh?  │─── no ──► converses freely
   └────────────┬───────────────────┘           states what it awaits
                │ yes                           DOES NOT ADVANCE
                ▼
        execute · write · update run state
```

**Rules**
- **R6.4-1** Every agent reads run state before acting.
- **R6.4-2** A missing, ungated or stale input blocks advancement.
- **R6.4-3** A blocked agent never produces a partial or placeholder artifact.
- **R6.4-4** Where a precondition is that an artifact exists, and that artifact is the record of a person's
  decision, **the decision creates it and nothing creates it earlier.** A step that writes it in advance,
  carrying an empty place for the mark, turns the precondition into a claim about a producer rather than
  about a person: the artifact is there, the gate downstream is satisfied, and nobody has decided anything.
  **The mark is recorded first and the artifact is assembled from it.**

### 6.5 One state vocabulary

**R6.5-1** A step and the artifact it produced never describe themselves differently, because both use one vocabulary.

| State | Meaning |
|---|---|
| `pending` | not started |
| `running` | the skill is executing |
| `blocked` | a **precondition** failed — a declared input is missing, unaccepted or stale |
| `produced` | the artifact exists, not yet checked |
| `q_failed` | the **quality gate** failed — returned to the skill, no person involved |
| `in_review` | with the accountable person |
| `refined` | changed during review, awaiting acceptance |
| `accepted` | decision gate passed, decision record written |
| `stale` | an upstream step was re-run. **Retained, not deleted** |
| `superseded` | replaced by a later version |

**R6.5-2** **`blocked` and `q_failed` are deliberately distinct.** `blocked` is about what a step was *given*; `q_failed` is about what it *produced*. A blocked step waits for someone else; a failed one returns to its own skill. Conflating them hides which actually happened.

**R6.5-3** **An artifact the reader cannot parse is a third outcome, and it is reported as itself.** A quality gate reads artifacts; where one is malformed at the serialisation level the gate has nothing to evaluate, and reporting that as a gate failure — or worse, as a silent absence of results — is a false statement about work that may be entirely sound. **The failure mode is specific and it scales past the artifact**: a reader that abandons a run on the first unparsable file reports no result for any of them, which is indistinguishable from a run whose every artifact is broken. So a parse failure names the file and the position, is counted separately from a check outcome, and **does not suppress the results of artifacts that parsed.**

> **And the producer is told what the reader accepts.** Where an implementation's reader supports less than the serialisation format it nominally uses, that restriction is stated where a producer reads its instructions, not left to be discovered by a producer that used a legal construct. **A restriction nobody wrote down is not a restriction, it is a trap**, and the cost is paid by the most careful producer — the one that reached for the format's own facility for a long value.

### 6.6 Staleness retains, and advancing past it is a recorded decision

**R6.6-1** Re-running step N marks steps N+1 onward `stale` and **retains their artifacts**. A run does not advance past a stale input until it is rebuilt, or a person explicitly accepts it and that acceptance is recorded. Nothing is lost and nothing silently rots.

**R6.6-2** **A human decision is recorded against a version of an artifact, and re-deriving that artifact empties the record of its meaning without failing anything.** R6.6-1 governs the artifacts a re-run invalidates downstream. This governs the one it invalidates *behind* it: a decision names elements by identifier, identifiers are assigned positionally by the step that produced them, and a second run of that step legitimately assigns the same identifiers to different things. **The record still parses, still resolves, and now says something nobody decided.** So a decision record binds to the artifact version it was taken against — a content hash, a revision count, whatever the run already carries — and re-deriving an artifact a decision was recorded on either re-opens that decision or is refused.

> **This is the failure staleness does not catch, because it runs the other way.** Everything downstream is marked and retained; the decision sits behind the re-run and is touched by no cascade. The identifiers are what make it invisible: a set that was `H1 H2 H3` is still `H1 H2 H3`, so every check resolving a placement against a hypothesis passes and the artifact reads as a correct record of a choice two people made about different problems. **The cheapest route to it is a re-run performed for an unrelated reason** — correcting one field, adopting a new carrier, re-running under a fixed build — where nobody involved is thinking about the decision at all.

> **Reference implementation — SPOCK discovery pilot, 12 August 2026.** Three artifacts carried the wrong value in one governed field, and the correct remedy looked like re-running the stage that produced them rather than editing them by hand. The re-run was legitimate and its output was better: a fresh intake reduced the same material to seven observations where the committed record held eight, and a fresh hypothesis set produced five hypotheses where the committed one held three. **Both readings were defensible and the identifiers overlapped.** The decision gate on the next artifact named `H1`, `H2` and `H3`, taken by two people the previous day against the old set, and nothing anywhere would have failed. The re-runs were discarded, the committed artifacts restored, and the field corrected as a marked human edit — **the one-line hand edit was the safe option and the principled re-run was the dangerous one**, which is the inversion this rule exists to make visible before somebody meets it.

### 6.8 A workflow that cannot stop is not governed

Every state vocabulary in section 6.5 describes a step on its way to being accepted. **A run also ends without completing**, and a workflow that has no way to say so is describing a process nobody operates.

**Rules**
- **R6.8-1** A workflow declares how a run **ends without completing**, and that ending is a recorded human decision carrying who took it, when, and a reason from a closed set. **A lifecycle whose only terminal state is success cannot be conformed to**: work is abandoned in every organisation, and where the record has no way to express it the run either stays open indefinitely or leaves the record altogether — and neither is distinguishable from work still in progress.
- **R6.8-2** **A state in the vocabulary with no writer is not a state, it is a word.** Where a definition names a state, something must be able to put a run into it and something must read it, and a state a run can be left in while advancing past it is one nothing reads. This is R7-8's principle applied to the lifecycle rather than to an exclusion, and it fails the same way: nothing exercises the state, so its absence looks like nothing ever needing it.
- **R6.8-3** **Stopping is available at every stage, not only at a gate.** The value of a run can collapse at any point, including after work a team is reluctant to discard, and a workflow that permits stopping only where it already pauses makes the sunk cost decide. The reason is drawn from a **closed set** rather than free text, because a stop nobody can classify cannot be counted, compared or learned from.
- **R6.8-4** **Stopping retains the artifacts.** A stopped run is recorded as stopped, never deleted and never quietly abandoned: what it produced is what the next run on the same subject inherits, and the reason it stopped is the most valuable thing it produced.
- **R6.8-5** **Where the surrounding organisation distinguishes *not now* from *no*, a workflow modelling only one of them declares which.** The two look identical in a record that has one exit and they are opposite decisions — one expects to be revisited and the other does not. **Collapsing them is worse than omitting one**, because a run that was merely queued is then indistinguishable from one that was judged not worth doing.

> **Reference implementation — SPOCK discovery pilot, 13 August 2026.** `abandoned` had been in the run vocabulary since the first version of the pilot's contract, with **no writer path and nothing reading it**, and was marked in the transition table as unimplemented. So the only lifecycle the pilot could express went forward, for months, and nothing noticed — a workflow that can only succeed looks correct until somebody asks what happens when it should not continue. The bank's own initiative methodology is unusually direct in the other direction: better to reject an initiative than to do something that does not make sense, and it may be closed at any phase. The state was given a writer taking a named person, a date and one of four reasons drawn from the bank's own stop outcomes, and a check refusing both a stop that names no decider and a run that is not stopped carrying part of a stop record. **The organisation's `Waiting` — low priority, no capacity, a technical or business blocker — was deliberately not modelled**, and the definition says so rather than folding *not now* into *no*.

### 6.7 A stage may carry more than one decision gate

Most stages hold one human decision. A stage that both **selects** among alternatives and then **commits** to the selection holds two: the selection and the commitment are distinct human acts, each recorded. They are carried by **separate skills either side of the selection**, so the committing skill cannot re-open a choice it did not make — a single skill spanning the decision would read its own prior output across it and carry the incentive to commit to whatever it had argued most persuasively.

**Rules**
- **R6.7-1** A stage declares the set of decision gates it carries. Where it carries more than one, each is a separate human decision with its own record: the run's state records the stage-level decision that admits the stage to `accepted`, and each artifact carries the record of the specific gate it passed. One-per-stage is the common case, not the rule.
- **R6.7-2** The decision-record check expects **exactly the stage's declared set** of decision gates on an accepted stage — no fewer, since a missing decision is a stage advanced past a gate nobody gave, and no more, since an extra is a decision nobody made.
- **R6.7-3** Where a stage selects then commits, the selecting and committing skills are **distinct bindings**, and the committing skill's data scope makes the alternatives readable but not re-openable.
- **R6.7-4** **A record kept at stage level is compared at stage level.** Where a stage carries several decision records, any check that compares a stage-scoped record against an artifact-scoped one **sums across the stage's carriers** rather than comparing the stage total to each artifact in turn. Comparing a stage total against one carrier makes the truthful record fail on every other carrier, and **the cheapest way to make such a check pass is to copy the entry onto the artifacts it does not belong to** — fabricating a decision nobody took. A check whose easiest remedy is a false record is worse than no check, because it converts a control into an instruction to lie.
- **R6.7-5** **The alternatives reach the human decision undecided.** A set of options put in front of a person carries no stated preference, no ranking presented as a conclusion and no nomination of one member — and each option states how it differs from the others, because an option that cannot say how it differs is a rephrasing of another one and the set is not a set. **This is refused on the artifact carrying the alternatives, not only on the decision record.** A decision record arriving pre-decided is already refused; the same failure one step earlier wears no decision's name and passes, and by the time the person sees it the choice has been made by the step that was only supposed to lay it out. Where scores or estimates are produced they are declared advisory and the choice is declared open, and **the order of a list is not read as a preference** — a list has an order whatever anyone intends, so what is refused is a preference stated, not a sequence observed.

> **Reference implementation — SPOCK discovery pilot, 10 August 2026.** Stage 5 (MVP) carries two decision gates: **G5a** selects one of two-or-three whole pilot options, **G5b** accepts the expansion of the selected one. `mvp-option-design` diverges and stops at G5a; the separate `mvp-expansion` converges on the single selected option at G5b, with the alternatives readable but not expandable. The run's state records the stage decision as `G5`; the option set carries the G5a selection record and the expansion carries the G5b acceptance. The decision-record check (its check C40) was extended to require exactly the G5a and G5b records on the accepted stage — the first stage in the pilot to carry two, and the case that turned R6.7-2 from an assumption into a rule. **R6.7-4 was found the same way and later**: a mirror comparing the run's refinement rounds against each artifact's read a stage-level count against a per-artifact one, so a genuine round on the option set reported as a mismatch on the expansion, and the only way to green the gate was to copy the round onto an artifact that never carried it. Caught in adversarial review, not by a suite of 163 passing cases.

---
## 7. Coverage checks

A coverage check is a **mechanical check at a step boundary**: no model judgement, passes or fails. They are the cheapest route to controls that are performed rather than described, and they are what a workflow's conformance record is built from.

**Rules**
- **R7-1** **The set is closed by derivation, not by a register** (Agent Blueprint §4.5). Every check is derived from a rule this document or a composed workflow states, and every such rule has a check. A rule with no check is a description; a check with no rule is a check nobody agreed to.
- **R7-2** A check that runs and is not derivable from a rule is the same defect as a rule with no check — both mean the set and the rules have come apart.
- **R7-3** Every check carries a case proving it fails on a known-bad input, and the suite carries a baseline case proving a healthy run passes (Agent Blueprint §5.4).
- **R7-4** **The workflow that declares a check owns it**, declares the cadence at which a run-time enforcement point is re-proven (Agent Blueprint §5.4), and re-runs the derivation when either a rule or a check changes. The set having no register removes a name, not the accountability: the owner is the workflow owner.
- **R7-5** A coverage check never judges quality. It establishes that something *identified* did not quietly become *ignored*.
- **R7-6** **Every check records the failure that caused it, in a field, and a check that leaves it blank is refused at build.** R7-1 says where a check comes from — the rule it derives from. This says why it was written, which is a different question and the one nobody can answer later. **A check with no recorded cause is a control nobody can ever retire**, because the thing it was built to stop cannot be found again, so the set only ever grows and every clean-up becomes an argument from memory. The cause travels with the check rather than with the person who remembers it: a commit message, a decision-log entry and a conversation are all outside the artifact, and the check outlives all three.

> **A guessed cause is worse than none, because it reads as evidence.** Where a check predates the practice and its cause cannot be recovered from the record, it says so in a declared value reserved for exactly that — never left blank, and never reconstructed. A field that admits *this one is founding* stays honest; one that forces a story invites a plausible invention that a later reader has no way to distinguish from a real failure.

- **R7-7** **A rule a mechanical check must decide is carried in a field the check can read, never in prose.** A coverage check performs no judgement (R7-5), so a requirement written into free text is a requirement nothing enforces — the rule is stated, the check is impossible, and the gap is invisible because the rule looks written. Where a rule turns on identity, on sameness or on independence between two things, the record carries a **key** and the check compares keys. Prose cannot settle whether two descriptions name one party or two, and a check that tries either fails on wording or passes on it.

> The general form is a question to ask of every rule as it is written: *what field does the check read?* If the answer is a sentence, the rule is a description. A derivation of a rule that already carries a key inherits the key too, or it inherits only the wording and loses the thing that made the original enforceable.

- **R7-8** **A declared exclusion is enforced by a check, not by the declaration.** Where a definition states that something must not happen — a binding that does not run, a destination that is not approved, a step held out of a release — the statement is a description of intent until something refuses the artifact it would have produced. This is R6.3-2's principle applied to the register: a rule with no enforcement point is guidance. **The exclusion is the case most likely to go unchecked**, because nothing is expected to exercise it and its absence therefore looks like success.
- **R7-9** **A governed field is checked against the set of values it may hold, not merely for being present.** Declaring that a field is governed — recording it, versioning it, naming its owner — establishes that somebody is accountable for it. It establishes nothing about whether what the field says is true. Where the field names a thing outside the definition — a model, an endpoint, a destination, a version of something the workflow does not own — the register of what it may name is carried in the build, and a value absent from that register is refused. **Otherwise governance buys an audit trail of a value nobody read**, and the gap is invisible precisely because the governance is visible: the field is there, its owner is named, its history is recorded, and it is wrong.
- **R7-25** **A check that compares two things derived from the same read is not a control.** Where a check proves a generated surface still matches what it derives from, both sides must not share the read that could be wrong. A shared read makes the check agree with itself: it reports agreement while both halves are empty, and it does so most convincingly at the moment something has just broken.

> **Reference implementation — SPOCK discovery pilot, 20 August 2026.** A shared store outliving every run held sixteen participants. The fields it derives from moved to a different file, its generator kept reading the old one, and it rewrote the store to nothing. **The check guarding it compared the store against its own derivation from the runs, both sides used the broken read, and it reported agreement.** In production this surfaces months later as work being redone with no error anywhere.

- **R7-26** **A case proving a check can fail is anchored on material carrying the defect, so repairing the defect disarms the case.** R7-3 requires the case; this says what maintains it. A suite must report a mutation that matched nothing as a broken test rather than as a pass, and a case whose defect has been repaired is re-anchored to material that still carries it — never rewritten to build the defect it is asserting, which proves the check against material invented for it. **A case exercising a guard inside a check asserts the quantity that guard changes, never the presence of what it names**: where a guard's effect is to exclude one of several matches, a case matching the name still passes with the guard deleted.

> **Reference implementation — SPOCK discovery pilot, 20 August 2026.** Four cases stopped testing anything in one session, each at the moment the defect it staged was fixed. **Ninety more broke at once** when the fields they mutate moved between files, which is the cheaper failure: a mutation that matches nothing is loud, and a case that still passes while staging nothing is silent.

- **R7-45** **A check whose selector returns nothing passes, so a change to the shape of what it selects over is a change to every check that selects.** R7-26 says a *case* that matched nothing is a broken test. This is the same failure one level up, in the check itself, and it is the harder of the two to see because no suite is watching. **When a shared resource gains a dimension — a tree gains a level, a record gains a variant, an identifier gains a part — its consumers break asymmetrically.** A consumer that traverses the resource meets a shape it does not expect and fails loudly, in the same hour, with a stack trace. **A consumer that matches a pattern against it simply stops matching**, returns an empty set, and reports the pass that an empty set always produces. The loud one is the safe one. So the audit when a resource changes shape is over the consumers that *select*, not the ones that *read*, and **a check reports the size of what it examined** so that a selector which has stopped selecting is visible in its passing message rather than only in the failure that never arrives.

> **Reference implementation — SPOCK discovery pilot, 27 August 2026.** The knowledge tree gained its first subfolder, to hold four regulatory area cards that must be replaceable one at a time. **Four consumers walked that tree and every one had to move.** One traversed it and died on the first run with an unambiguous error naming the directory. **The check that compares each step's declared inputs against the resources its own procedure names — the R5-7 instrument — matched a path pattern that stopped at the first separator**, so for every body in the new folder it would have selected nothing, found no discrepancy in either direction, and reported that all steps and all declarations agreed. It was repaired only because the loud failure sent someone to look at the other three. A third consumer's list of knowledge bodies then failed correctly, on a comment split across two lines above it, which is the same class caught by a check that was counting.


- **R7-46** **A surface that restates a governed set for a reader is joined to that set, or it is a fork of it.** A registry, a catalogue, a check register, a body of know-how: each is a set the build governs and can enumerate. Where a document written for a person restates one of them — a table of what to call each artifact, a list of what a skill's evaluator is, a count of the rules a gate decides, an inventory of the places the substrate discovers definitions — **the restatement is not a derived value a gate recomputes (R6.3-5) and not an assembled document whose citations resolve (R3.8-3)**. It is prose, it is what an agent or a person actually reads, and nothing in the ordinary run of checking looks at it. **Every such restatement is complete on the day it is written and shortens thereafter**, because the governed set grows by a registered act and the prose grows by somebody remembering. R7-27 governs how a join walks once one exists; this rule is that a join has to exist. The comparison is both ways: a member of the set the surface omits is the failure that matters, and a member the surface names that the set does not carry is the surface describing a thing the build does not have.

> **Reference implementation — SPOCK discovery pilot, 29 August 2026.** Five instances in one build, none of which any check had ever looked at. A rule that forbids naming an internal code in front of a person was served by a table carrying **seventeen of twenty artifact codes** — so the three it omitted were precisely the three an agent had no words for and would have named by their code. A registry asserted `evaluator: independent` **nineteen times, once per skill, and it was false for 22 of the 71 rules**: nineteen are judged with no judge configured anywhere, and the honest three-way split had been sitting in a comment two lines from the mirror it described. A shared module's list of skill identifiers held **sixteen against a nineteen-entry registry**, and the three it had lost were invisible to the one rule written to catch that identifier leaking into a document a bank reads. An assurance registry declared a subject whose cadence **no check read**, because the checking side carried its own list of subjects. And the workspace settings scoped **two of the four locations** the substrate discovers agent definitions from, while the check reporting that scope counted only the two — so its pass line read as though discovery were fully governed. In four of the five the surface was the thing a reader trusts most, and in every one of them the set was correct and the sentence about it was not.


- **R7-47** **A rule the governed set carries can be withdrawn as well as introduced, and a rule deleted outright is a rule that never existed.** Where finished work is graded against a set of rules, the set is dated: a run is held to the rules that governed it, never to a bar written after it ran, and every such model therefore records when a rule began. **Almost none of them records when one ended**, because introduction is the case everybody meets first and withdrawal arrives once, late, and looks like housekeeping. Removing the entry is then the obvious act, and it rewrites history rather than ending it: every finished run whose derived record names that rule now names one the model cannot produce, and each of them fails a check that recomputes the record — **so the work is failed for having been correct at the time**. The two failures look identical from the failing side and have opposite causes, which is why the withdrawal date is a field rather than a deletion. **The absence is only visible the first time something is retired**, and by then the runs that carry the rule are the ones the retirement breaks.

> **Reference implementation — SPOCK discovery pilot, 30 August 2026.** A body of know-how declared by two bindings and never written was retired by the stakeholder, and with it a rule requiring every constraint an option references to resolve into that body. **Deleting the rule failed nine of the ten committed runs**, on two checks each: the gate's tally of what it could not decide, and every artifact's own list of unverified rules, both of which are recomputed at the gate precisely so a producer cannot certify itself. The model had carried an introduction date since the first rule was scoped by one and had no counterpart for withdrawal. **The date chosen was the day of the retirement**, and the newest date in any committed run was two days earlier, so once the field existed not one run moved.

- **R7-48** **A case proving a check can fail is written in the form the defect actually takes, and a case exercising only the form the check already sees measures nothing.** R7-26 keeps a case anchored to material carrying its defect; this governs which material that is. **A check refuses a pattern, and the pattern is where it is blind** — the wrong prefix, the second occurrence, the sentence rather than the marking. A case written by mutating whatever most conveniently trips the check will pass on the day it is written and every day after, and the one thing it can never establish is the check's reach. So a suite reporting that every check has been observed failing is reporting that each has one arm that works, which is a weaker claim than it reads as, and the gap between the two is invisible from every direction: the check passes, the arm passes, and a check agreeing with a correctly-formed case looks exactly like a check that sees everything. **The case is derived from how the defect appeared in the world**, the same way R7-29 derives a held-out suite from finished work rather than from the rule it grades.

- **R7-27** **A check that joins two sets states which direction it walks, and walks both unless it states why one direction cannot fail.** A join compared one way is a control over one direction only: it refuses a member of the first set with no counterpart in the second, and is not looking at a member of the second with no counterpart in the first. **The unchecked direction is the dangerous one whenever the second set is what exists rather than what was declared**, because that is where a thing can appear without anything having claimed it — and it is invisible by construction, since the check reports a pass over everything it was given.

> **Reference implementation — SPOCK discovery pilot, twice, eleven days apart.** **10 August:** the register a reader consults to learn what a run produces was compared against the schemas the specification declares, in one direction. A row naming an artifact with no schema failed; a schema with no row was not looked at, and the register listed sixteen rows against seventeen artifacts. Two programs read that register and neither could see the omission. **21 August:** a run's record of which artifacts each step produced was compared against the artifacts, in one direction. An artifact no step claimed was invisible — and **five other checks resolve an artifact's step through that same list and skip in silence what they cannot place**, so a document that four runs carried had never been read by any of them. The second was found while repairing an unrelated defect, in the same repository that had corrected the first.

- **R7-28** **Where a check needs to know when a step ran, it reads a field that records that step and never one that records the whole unit of work.** A unit-level timestamp moves whenever any part of the unit is written, so a write to one step re-dates every other step in it. **A rule scoped on whether something existed when a step ran then changes its answer for work nobody has touched**, and it changes it at the moment somebody edits a neighbour, which is exactly when nobody is looking at the step that moved. Where a step carries no timestamp of its own, the outputs it produced do, and those do not move.

> **Reference implementation — SPOCK discovery pilot, 21 August 2026.** A check excuses a step from a body of know-how written after that step ran, and took the run record's own last-updated field as when an ungated step ran. Adding a missing artifact id to a different step of a run that had stopped eighteen days earlier moved that field to the present, and the stopped step was immediately required to have read a body published after it stopped. **Nothing about the step had changed.** The outputs it produced carry their own production date, which is the field that answers the question and the only one that cannot be moved by an edit somewhere else.

- **R7-29** **A held-out suite is derived from a corpus of finished work, never from the rule it grades, and the corpus is expected to correct the rule.** R7-3 requires a case that fires and R7-26 requires it to stay anchored; this says where the case comes from. **A case written from the rule can only restate it**, so it passes on the day it is written and every day after, and the one thing it can never find is the rule being short of a form the work actually takes. A case written from a defect somebody found in finished work fails against the rule about as often as it passes, and each of those failures is the rule learning something.

> **Reference implementation — SPOCK discovery pilot, 21 August 2026.** Fifteen of sixteen steps declared a held-out suite that did not exist, and all of them were built in one day from a review of sixty-nine finished documents. **Three cases failed on the day they were written, and two of the three were the rule being wrong rather than the expectation**: a repository path counted as one kind of defect and not as another, and the execution environment — *produced with no tools* — counted as neither, though it is the first thing one document tells its reader about itself. The third had been written counting signatures where the rule counts lines. **None of the three could have been written from the rule**, because each of them is a way the rule did not yet know work could go wrong.

- **R7-30** **A step is finished when what its contract says it produces exists, and never because the checks that would have read the missing work found nothing to read.** A gate reports on the checks that applied, so a step which produced one of its three outputs is graded on the one, and every check bound to the other two reports *not applicable* and is counted as nothing to answer for. **The verdict is then a true statement about a third of the work and reads as a statement about all of it.** The contract is what says how much there was to do, and it is the only surface that can say so: a step's own record of what it produced is written by whoever ran it and agrees with itself by construction. Where an output is deliberately not produced, the exemption is read from the declaration that parks it and named in the verdict, so a permanent absence stays visible rather than becoming silence.

> **Reference implementation — SPOCK discovery pilot, 22 August 2026.** A market step had produced its landscape map and neither its competitor profiles nor its synthesis, and its gate returned a pass at thirty-three of thirty-three. **Nine of the checks it skipped were the two missing outputs, and one of them said so in its own message: *absent — the step did not run*.** A check reported that the step had not run, inside a gate reporting that it had passed. It was the one step in that workflow with no human decision behind its gate, which is what made it visible; every other step was relying on a person noticing.

- **R7-31** **A field written by a composition's parallel instances carries its entry shape in the declaration, or the instances diverge and the join is faithful to the divergence.** A declaration naming a list and stopping there is enough for one producer, because a producer writing the same field five times agrees with itself and its own first choice becomes the shape. **Five producers writing it once each have nothing to agree with except the declaration**, so where the declaration is silent the artifact carries two shapes and the reader of the set cannot tell a variation from a mistake. The join must not resolve it: an assembler that normalises the odd one out has destroyed the evidence that the declaration was short.

> **Reference implementation — SPOCK discovery pilot, 22 August 2026.** A step composed as a fan-out declared a list of compliance touchpoints and said nothing about what an entry was. **Four of five instances wrote plain strings and the fifth wrote objects with a topic and a note.** The join propagated both and said in its report that the gate would meet them, which is the join behaving correctly. The generated field carrier had inferred the shape from the majority and told the next producer the wrong thing, and the check that caught it says why that is worse than saying nothing: **a carrier that states the wrong shape is followed.** The same field name is declared with an explicit entry shape on a later artifact of the same workflow, and there nobody diverged.

- **R7-32** **Where a rule can be settled by a search, the producer's report that it holds is not evidence that it does.** A producer asked whether its output breaks a rule answers by reading, and reading is what the rule defeats: a rule that survives to be worth stating is usually one whose violation is invisible at reading speed. **The report is honest and wrong**, which is the worst of the three possible states, because a reader of the report stops looking. The check costs a second and is the only thing that can settle it, so the rule is bound to a check before it is bound to an instruction, and the instruction tells the producer to run the search rather than to be careful.

> **Reference implementation — SPOCK discovery pilot, 22 and 23 August 2026.** Three producers were told a single character is banned, all three had the body naming it in their own contract, and all three reported the document clean. **They carried eight, two and eleven instances.** One of them listed two further breaches in its report and left both in the document, which is worse still: the reader of that report concludes the rest was fixed. The fourth producer was told to search for the character rather than read for it, did, and found none.

- **R7-33** **The shape a producer must write is carried where the producer reads, and a design record is not that place.** A workflow's artifacts have a shape, the shape is what every check reads, and it is normally written down where the workflow is designed. **A producer is sent to its own instructions, and what is not there does not exist for it.** So a shape recorded only in the design is enforced against producers who were never told it, and the failure is invisible to everyone who already knows: an operator carrying the knowledge cannot notice it is missing from the page. The test is not whether the shape is written down. It is whether it is reachable from the first file the producer opens.

> **Reference implementation — SPOCK discovery pilot, 22 August 2026.** The pilot's artifacts had been split into a record and a document assembled from it two days earlier, and the split was written in the design and in none of the sixteen step instructions, none of the six agent definitions and neither of the two workspace instruction files. **The first run driven from the written word alone failed its first gate on five checks, and not one of them was the producer's mistake.** Five earlier runs had passed because every one was driven by a session that already knew. Three further artifacts in the same run arrived with no content at all for the same reason one level down: the field *names* were reachable and the *structure* was not, and a flat list of names is not a schema.

- **R7-34** **A check reports the size of what it examined, because an empty result and an empty search print the same word.** A check searches for the thing it refuses and passes when it finds none. That is right when the search looked and wrong when it could not look: a field that moved, a heading form no producer writes, a list nothing populates, a key prefix no artifact can carry. **The two states are indistinguishable in the output** — the check that examined everything and found nothing, and the check that examined nothing — and only one of them is coverage. So a verdict carries the count of what was examined, and a check whose examined set is empty while the artifact it governs is not says so instead of passing. A check that cannot fail is not a weak control. It is the appearance of one.

> **Reference implementation — SPOCK discovery pilot, 23 August 2026.** An audit by readers with no memory of having built the estate returned ninety-one findings that survived refutation, and **twenty-six of them were checks that did not decide what they claimed to decide.** One looked for the account of a person's edits under a heading form the newest run does not write, found none, and reported authorship marked on every artifact. One resolved a citation against the source set only where the citation carried a key prefix that exists nowhere in the estate and that a second check forbids any artifact from carrying, so a market synthesis could cite a participant nobody had researched and pass. One reported that it had examined six unscored dimensions held in a list no run has ever written to. **Every gate in the estate was green while all ninety-one were true**, which is the finding, and no count of what any of them examined was ever printed.

- **R7-35** **A completed run is not amended so that a corrected check passes over it.** Correcting a check that could not fail means it will now judge finished work for the first time, and some of that work will not pass. **The failure is the record.** Amending the run so the corrected check goes green destroys the evidence the run exists to carry and leaves the workflow asserting a property it does not have — and the amendment is always available, always cheaper than the alternative, and always indistinguishable afterwards from work that was right the first time. This is version scoping seen from the other side: scoping refuses to hold a run to a bar written after it ran, and this refuses to rewrite a run so a bar it genuinely missed reads as met.

> **Reference implementation — SPOCK discovery pilot, 23 August 2026.** Eleven documents of the pilot's sixth run contradicted the records they were assembled from, and that run is the only one in the estate driven with nobody supplying what the written procedures left out, so those eleven are what the workflow produces under that condition. Two of the repair plans proposed correcting the run's own record so the corrected check would pass; both were refused, and **the tool that applies a repair now refuses any edit to a finished run rather than leaving the refusal to whoever is reading the plan.** The run fell from eighty of eighty checks to seventy-seven. All three failures were true before the repair and all three had been reported as passing.

- **R7-36** **A step that writes something a later step executes proves it is well formed before the write is finished, and reverts whole when it is not.** Where a step produces a check, a generated carrier or a script, the next reader either runs it or fails somewhere else entirely, and the distance between the two makes the cause expensive to find. **The write and the well-formedness test are one step**, not a step and a later verification, and a production that fails the test leaves nothing behind: a partly-applied change is a state no contract describes and no check is written against. This is R7-32 one level down — that rule refuses a producer's report that a rule holds, and this refuses a production nobody parsed.

> **Reference implementation — SPOCK discovery pilot, 23 August 2026.** A repair to the competitor store was written by exact replacement and the replacement spliced the module mid-expression. Every consumer threw on import and the repository check crashed rather than failing, which is the worst available outcome because a crash reports nothing about the estate. The module was restored, **the applier was given a compile step that runs immediately after the write and rolls the whole production back**, and the same repair, re-planned from scratch by a different reader under an explicit instruction to compile its own output, failed the same way and was rolled back automatically.

- **R7-37** **Parallel proposals against one artifact are serialised at the artifact, and a proposal quoting a state that has moved is refused rather than approximated.** Where several instances of a step each derive a change to the same artifact, every one is derived against a state only the first can still be true of. **The second proposal is not stale in a way its author can see**, because it was correct when it was written and nothing tells it otherwise. So an artifact takes one proposal at a time, each later proposal is re-derived against the state the earlier ones left, and a proposal whose quoted anchor no longer resolves is refused whole. Matching it approximately is how a change lands somewhere its author never looked.

> **Reference implementation — SPOCK discovery pilot, 23 August 2026.** Fifty-five repairs were planned in parallel, each against the estate as it stood at the start. Twenty were refused at application because another repair had already changed the text they quoted — two plans against one generator, three against one repository check — and every refusal was correct: in each case the earlier repair had made the later one either unnecessary or wrong. **Three findings turned out to have been closed by a repair to a neighbouring one**, which a re-derivation found and a merge would have buried under a redundant edit.

- **R7-38** **A step composed as N invocations declares the record shape a later invocation can add to, and a record that can only be written once says so.** Composing a step per item is half the decision; the other half is where the items land. **A record carrying the whole set writes that set once**, and a second production of the same step carrying the same field is folded away by whatever assembles them, because first-value-wins is the only rule an assembler can apply without knowing which of two conflicting values is later. The instances are correct, the artifact is short, and every content check reads the shorter number and passes. So the shape is declared with the composition rather than left to whichever shape the first run happened to use, and **an assembler refuses a second value for a field that already carries one rather than dropping it** — the drop is what makes the loss silent, and silence is the whole defect.

> **Reference implementation — SPOCK discovery pilot, 24 August 2026.** The market stage's research bound stops at eight participants and its coverage floor asks for ten, so a market with nothing fresh to reuse needs a second production to clear its own floor. The second production wrote three competitor cards into a record carrying the plural field the first had already set. **The three cards were on disk, cited in the body, listed in the assembly manifest, and both join checks passed on them**, while every content check read eight. Nothing failed. Six runs and no step had ever been run twice, so the mechanism the floor depends on had never been exercised.

- **R7-39** **A document with repeated sections is created with its opening and extended one section per write.** The producing surface has an output ceiling, and a response that exceeds it is refused rather than truncated. **A refused write delivers nothing**: everything the producer holds is in the response it was writing, so the work is not partly saved, it is absent. The ceiling belongs to the surface rather than to any one step, so this is not a rule about the largest artifact — it is a rule about every artifact whose length is a function of how much the run found. **Small and certain beats whole and lost**, and a thin first pass on disk can be extended where a complete one that was refused cannot be recovered.

> **Reference implementation — SPOCK discovery pilot, 24 August 2026.** The market synthesis was attempted twice in one pass by a producer that had read every card correctly, and both attempts were cut off mid-response at the output ceiling. **Two hours of work reached disk as zero bytes.** The second attempt had been instructed to write incrementally and did not, because an instruction to write in pieces competes with a step whose shape invites one emission; composing the step per facet removed the invitation and the same work landed in seven minutes per instance.

- **R7-40** **A check reads the field the specification declares, and the comparison between the two runs in both directions.** A check naming a field nothing writes does not fail. It builds an empty set, and the guard that stops an absent artifact failing a check then stops a present one being checked at all. **The artifacts are correct, the citations resolve, and the comparison never happens** — and this is invisible from every direction: the check passes, the artifacts are well formed, and a check that agrees with a correct artifact looks exactly like a check that read nothing. Only an artifact that omits the field can tell the two apart, and by then the guarantee has been asserted for as long as the check has existed.

> **Reference implementation — SPOCK discovery pilot, 24 August 2026.** The check binding every idea to a market element built its set of valid names from a field named `id`, and the specification names that field `key`. Three runs carried seventeen, sixteen and fourteen element keys and cited them correctly from their idea sets. **The check reported that every idea binds a market element, on every run, without comparing one.** The rule requiring the two lists to be compared both ways had been in force since 17 August and was implemented in one direction only.

- **R7-41** **A step's own account of the gate it faces is compared against that gate, and neither side is the source for the other.** A producer reads its step's page, not the gate's implementation, so the page is where a rule reaches the work. **The two drift in both directions and each is invisible to the other**: a page describing a rule the check has stopped using sends the producer to a bar that no longer exists, and a page declaring a rule unchecked tells the producer that a real refusal cannot happen. The second is worse, because a producer told a bar is unenforced writes to the cheaper standard and is right to. So the gate's own list is what the page states, and a page asserting that a rule is decided by nothing is a claim about the build that the build can answer.

> **Reference implementation — SPOCK discovery pilot, 24 August 2026.** One stage disagreed with its gate twice in an afternoon, in opposite directions. Its mapping step described a coverage floor as counting intentions where the check had counted delivered work since the previous day, and its synthesis step named two of the five checks reading its output and then stated that the rest were decided by nothing — of the three it omitted, two decided exactly the rules it called unenforced. **Measured across the estate, one step named none of the five checks that judge it and had no gate section at all.**

- **R7-42** **Anything a run copies down at the time it runs is compared against the model as it stood then, and never against the model as it stands now.** A workflow records what it was held to: the words of a rule it could not verify, the count of what its gate did not decide, the artifacts its contract said the stage produces, the version of a body it read. Every one of those is a true statement about a moment. **Add anything to the model afterwards and each of them becomes a false one, without a single file changing** — and the failure arrives as a red check on finished work, which offers two bad answers and no good one. Editing the record to agree makes the record worthless. Freezing the model makes the workflow unable to learn. So the comparison carries a date, the addition carries the date it was added, and work is measured against what existed when it was done.

> **Reference implementation — SPOCK discovery pilot, 26 August 2026.** A stage was inserted into a workflow that had run seven times. **Four separate controls failed the finished runs in one afternoon and none of them had a defect in it.** The rule text that travels onto the artifact was reworded, so every artifact carrying the old words disagreed with the model. A rule was added to a gate, so every run record's frozen tally of what the gate did not decide was short. A step was added to the contract, so every stage that had claimed to run was missing an artifact that did not exist when it ran. A know-how body was added, so every stage was recorded as not having read something written after it finished. **The fourth already had the exemption and it did not fire**, because the excuse was written to cover a body still at its first version and this one had been corrected once. The generalisation is not any of the four. It is that a model which grows has to be readable backwards, and that this is not obvious until the third time it bites.

- **R7-43** **A specification and the checks that enforce it move in one change, and the only thing that proves they did is running the step.** Renaming what a stage produces is a documentation change until a check resolves against the old name, and then it is a defect that passes every static comparison: the registers agree with each other, the schema agrees with the carrier, the skill agrees with the registry, and the check quietly resolves a set nothing is in. **A producer following the new specification writes the right artifact and is refused; a producer following the old one is accepted.** No amount of reading catches this, because every document is internally consistent and the disagreement lives between a sentence and a predicate.

> **Reference implementation — SPOCK discovery pilot, 26 August 2026.** The prioritised set was respecified to carry framed opportunities rather than problem hypotheses. The schema, the skill, the registry, the contract and the workflow's own prose all moved. **Three checks did not**, and each of them resolved the prioritised entries against the hypothesis set. All eight repository checks passed, all seven committed runs passed, and the defect surfaced only when the new stage ran for the first time and its correct output was refused. **Writing the superseded identifiers would have made the gate green and the artifact wrong.**

- **R7-44** **A carrier generated from a specification is proved by producing from it once, not by reading it.** Where the shape a producer copies is derived from prose, the derivation is a parser and the prose is its input, and prose that reads unambiguously to a person is routinely ambiguous to it. The carrier is then wrong in the one direction nobody inspects: it is well formed, it is plausible, and it is what the step's own instructions tell the producer to copy. **A producer that obeys the instruction fails; a producer that ignores it and reads the specification succeeds.** That inversion is the tell, and it is only visible from a production.

> **Reference implementation — SPOCK discovery pilot, 26 August 2026.** A new artifact declared four sizing factors, each carrying an answer and the standing of that answer. The generator flattened them into one standing under the first factor, because the two were named on one line of prose. The skill instructed the producer in bold to copy the generated shape rather than compose it, and **a producer that had done so would have failed two of the four checks written for that artifact on its first attempt.** The step's first execution reported it, having read the specification instead of the carrier it was told to use.

- **R7-10** **An enumeration a reader acts on is derived where it lives, and no second surface restates it or its size.** R7-1 closes the check set by derivation rather than by a register, and the reason generalises: a copy of a set is a claim about that set which ages on its own clock. **The failure is not a copy that looks stale** — a copy that looks wrong gets fixed. The failure is a copy that is short by an item and reads as complete, because a count is plausible at every value and nothing in the reader's hand says what it should have been. Where a set decides whether work may advance — the decisions still owed, the prerequisites still unmet, the checks a gate runs — the surface a person reads either derives the set from its source or cites that source and asserts nothing about how many.

> **Reference implementation — SPOCK discovery pilot, 11 August 2026.** The pilot made the model a governed per-binding field and checked that its family differed from the family it judged. Neither read the identifier. Every binding pinned a string with a dot where the scheme uses a hyphen — the value the vendor's own error documentation gives as its worked example of an identifier that does not resolve — and **no agent on that surface could start for a week while every check stayed green.** It was found by invoking an agent, which had never been done, because every artifact in both proven runs was authored by hand. The correction was mechanical; the rule is that nothing was looking.

> **The check reads the producer, not the artifact identifier.** A binding parked for any reason is parked whatever it writes, so keying the refusal to a particular artifact re-teaches the check every time another binding is parked. The list of exclusions is mirrored from the register the same way any other list is mirrored, and the mirror is itself checked, because a copy that can drift from its source is a second source.

> **Reference implementation — SPOCK discovery pilot, 10 August 2026.** All three rules were found in one session of finishing the check set, and each had been a stated requirement nothing enforced.
>
> **R7-6.** The reason a check existed lived in a commit message, a decision-log entry or somebody's memory, which made the repository's best habit the one thing holding it together least. A `Caused by` column was added to the check register and the build now refuses a check that leaves it blank. Of fifty checks, eighteen name a specific failure drawn only from what the record already said — the trees that drifted with the source copy behind, two contracts missing their checks, a backfilled gate, five checks registered for every stage and named by no gate, a vendor card that read as two parties. Thirty-two read `founding`, the honest answer for the set that predates the practice. Nothing was reconstructed.
>
> **R7-7.** A competitor card must rest on two sources independent of each other, and had done since the schema was written, with nothing able to enforce it: the publisher was prose. One run cited a vendor's own product walkthrough and the same vendor's own product pages, and that pair read as two independent sources for six days. The intake side of the same workflow had solved this months earlier — every observation carries an origin key, because *"an adviser relaying an unnamed client"* and *"that adviser"* are one person described twice — and the market-side standard declared itself a derivation of that exact rule while carrying no key of its own. It inherited the wording and not the key.
>
> **R7-8.** One binding is parked because the authoritative host it would write to is unnamed; under deny-by-default egress an unnamed host means there is no allow list to write, so the binding cannot run at all. That was a sentence in a register. Nothing stopped its artifact appearing in a run, and its presence would have meant outward reach with no approved destination — the one thing deny-by-default exists to prevent.

- **R7-11** **A rule no check can decide is often blocked on the standard being undecidable, not on the check being difficult.** R7-1 closes the set by derivation, and R7-7 requires the rule to be carried in a field a check can read. Both assume the rule has a determinate answer. Where it does not — where the standard admits two values for one input, or names a set nobody has closed, or makes a claim about a state the run does not retain — **no check can be written, and the absence reads as an engineering backlog rather than as an unfinished standard.** Before recording a rule as *awaiting a check*, establish which it is. The remedy for the second is a decision about the standard, and the check that follows is usually trivial.

> **Three shapes recur.** The standard's bands overlap, so two runs with identical inputs may both be right and the check has no answer to compare against. The standard names a set it never closes, so the artifact enumerates its own sections and can be short by the one that mattered while reading as complete. Or the rule is a claim about what one step did, and **two steps write the artifact**, so only the later state survives and the claim has nothing to be true or false about.

- **R7-12** **Where a rule constrains what one step may do to another step's output, separate the artifacts rather than retain a copy of the earlier state.** Retaining a pre-change copy makes the rule checkable: the two states are compared and an unexpected difference fails. **Separating the artifacts makes the rule unbreakable**, because the later step's artifact has no field for the thing it was forbidden to change. The second is stronger for the same reason a capability a step does not hold is stronger than an instruction it is asked to follow — it removes the act rather than detecting it.

> **And a retained copy is a copy.** It must be proven faithful, which means a check whose only purpose is policing a duplicate the design chose to create; it can drift; and the drift is invisible in exactly the way R7-10 describes. **Separation removes the check rather than adding one.** The later artifact carries the key of the thing it refers to and nothing else, so there is no second version of anything.

- **R7-13** **A carrier that tells a producer what to write carries the shape and the assigned value, not only the name — and every claim it makes is verified against something that did not generate it.** R7-10 requires an enumeration a reader acts on to be derived where it lives. A producer is such a reader, and a set of field names is not the whole of what it needs: it also needs to know which of them hold values rather than objects, which additional record rides on the artifact because of the gate it faces, and which single value a register assigns this artifact for a governed field. **A name without a shape is inferred, and the shape a competent producer infers is reasonable** — the upstream object copied whole into a field that wanted its identifier, the plausible synonym for a field it never saw named. Each inference is defensible in isolation and each one fails a check.

> **A carrier stating a shape wrongly is worse than one stating none**, because a producer follows it against the specification. So a derived carrier's claims are checked against a source that did not produce them — the committed runs, the register, the worked example — and a claim the derivation cannot make safely is omitted rather than guessed. **The failure mode is specific: a generator reading a specification's prose will read an enumeration of a field's legal values as a list of sibling fields**, and the resulting carrier confidently instructs the producer to build three lists that do not exist. The remedy is to make the specification say structurally what it means, not to teach the generator prose.

- **R7-14** **A governed field is checked against the value the register assigns it, not merely against the set of values the field may hold.** R7-9 closes the outer question: the value is one the register knows. This closes the inner one: it is the one the register gives *this* artifact, this binding, this step. **A field with a small legal vocabulary is where the two diverge invisibly**, because every wrong answer is a legal answer and the check reports a pass on all of them. Where a register assigns one value per subject, the check reads the assignment and not the vocabulary.

- **R7-15** **Where a specification delegates a field set to another body, that body carries the shape of an entry and not only the name of the field — and a field added there is added with its shape in the same change.** R7-13 governs the carrier a producer reads. This governs the source that carrier is generated from: delegation is legitimate and it moves the obligation rather than discharging it. **A list field named without its entry shape is the same defect one level out**, and it fails the same way — every producer invents a reasonable set of keys, each defensible, none the same as another's, and the check that refuses undeclared fields refuses all of them.

> **Where an entry's structure genuinely differs per instance, the field is prose and is declared as prose.** A map whose keys are invented per row is not a schema; it is free text carrying punctuation that a checker will mistake for structure. Naming it prose costs the reader nothing and stops three producers inventing three vocabularies for one field.

> **Reference implementation — SPOCK discovery pilot, 13 August 2026.** Two list fields were added to a delegated body to raise the depth of a durable artifact, each specified by name, cardinality and intent, and neither by the shape of one entry. Three producers ran against it and **invented nineteen field names between them** — two synonyms for the same idea across two cards, and twelve keys naming one participant's own price list. The check that refuses a field nothing declares refused the artifact twice. The remedy was to fix the entry shapes at the source and to declare the third field prose, since its structure differs per participant in a way no schema can carry. **Every inference was reasonable and the specification had asked for them**, which is the point: the producer was not permissive, the delegation was incomplete.

> **The sibling sweep is part of the rule.** When a check is corrected for reading presence rather than value, every check of the same shape is re-read in the same change. Otherwise the correction lands on the one that was noticed and its neighbours keep the flaw — with the comment describing the flaw sitting directly above them, which is how it survives a reader who is looking for it.

> **Reference implementation — SPOCK discovery pilot, 12 August 2026.** A field carrier generated from the specification fixed the first agent-authored artifact of a stage completely on a re-run with an identical prompt, and did not fix the second, which failed six checks. It had given the names and nothing else: a list whose entries are identifiers was written as the whole upstream objects, and the decision record's fields sat in a block of their own so a producer writing the artifact its gate reviews never connected the two. **Adding shape then produced a wrong claim on its first build** — the specification declared four lists' entry fields at the same indent as the lists themselves, so the generator read three of them as plain values when the committed runs carry objects. The specification was corrected rather than the parser taught prose, and the carrier's claims are now verified against the committed runs. **Separately, three artifacts in the same run carried a legal but wrong value in one governed field and every gate passed**: the check compared against the five-word vocabulary, never against the register that assigns one word per artifact. The comment two lines above it described that exact flaw, corrected in a neighbouring check months earlier.

> **Reference implementation — SPOCK discovery pilot, 12 August 2026.** Three rules at three different gates had stood as *awaiting a check* for between two and nine days, and none of them was waiting on code. One had bands that overlapped at a boundary value, so the same evidence could be graded two ways and neither was wrong; making the bands a disjoint partition took an afternoon and the check that followed took minutes. One asked that every section of a template be present and there was no template. **The remaining two were a single defect seen from both sides**: one step generated candidates and a second scored them into the same artifact, so *no candidate arrives carrying a score* was a claim about the first step against a file the second had already written, and *the second step changes nothing but the scores* was a comparison against a state nobody kept. **The artifact was split rather than duplicated.** The scoring step now writes an artifact holding an identifier and two values, with no field for the candidate's own content, and both rules moved from undecidable to structurally impossible in the same change. Of the rules that had needed a check nobody had written, one remained.

- **R7-16** **A check requiring that the current standard set be recorded as used is evaluated against the standards that existed when the step ran, not against those that exist now.** R5-6 makes a step record which version of each shared resource it used, and the obvious check reads that record against what is on disk. **That check is correct for a live step and wrong for a finished one**, because adding a standard retroactively makes every completed run non-conformant for failing to cite a document that did not exist. The remedy is not to weaken the check but to give it the one fact it is missing: when the step ran.

> **The failure presents as a real finding, which is why it survives review.** A completed run turning red the moment a new body lands reads exactly like a run that skipped a standard, and the cheapest way to green it is to edit the run's record to claim it read the body — **fabricating history to satisfy a check**, which is R6.7-4's failure in a different place: a check whose easiest remedy is a false record is worse than no check.

> **Comparing dates is not enough, and the trap is the one a first implementation falls into.** A body's header carries the date of its *current* version, not the date it first existed, so excusing any body dated after the step excuses a long-standing standard from every step older than its most recent revision. **Every way of not knowing must make the check stricter rather than laxer**: an unparseable date, an absent step time and a body that has been revised at all all fall through to *required*, and only a body still at its first version and dated after the step is excused.

> **Reference implementation — SPOCK discovery pilot, 13 August 2026.** A new body of know-how landed and the check comparing each stage's recorded standards against what its skills declare failed a run that had been complete for three days, demanding it have read a document written after it finished. A date clause was added. **The first cut of that clause used the body's header date and silently excused a two-week-old standard from every stage predating its latest revision** — the negative-test suite caught it within a minute, on a case written for the original defect months earlier. The clause was narrowed to first-version bodies only, and the ungated case falls back to the run record's own last-written date, so the requirement arrives exactly when a stage is next gated rather than sitting red against work nobody has touched.

- **R7-17** **Where the record cannot establish whether a shared resource was available when a step ran, the run declares the gap on its own record rather than the check widening its tolerance.** R7-16 excuses a resource that landed strictly after the step. The case it does not reach is the one where both carry the same date and the record has no finer granularity: the resource may have landed an hour before the step or an hour after, and nothing on file decides it.

> **Widening the comparison is the wrong repair and it is the one that looks consistent.** A definition that already reads an ordering rule permissively for want of clock times will be cited as precedent, and the two cases are not alike: ordering two *recorded events* permissively leaves both events on the record, whereas excusing a resource decides that a step did not read something and writes nothing down. **It also reverses R7-16's own bias**, under which every way of not knowing makes the check stricter. The reader of that run is then shown nothing at all — no failure, no record, no gap.

> **So the run says so.** The record carries, per step, the resources that were present and that the step did not read, each with a reason, and the check accepts the declaration and **reports how many it accepted** in its passing line. A gap a definition decided to keep is carried the way every other such gap is carried — named, counted, and visible on every future run of the checks — rather than resolved into silence by a comparison.

> **Re-deriving the step is not the alternative it appears to be.** R6.6-2 already refuses it: the decisions taken on those artifacts name elements by identifier, and a second run of the producing step reassigns those identifiers to different things. **The expensive mistake here is the one that feels most principled** — correcting the record by re-running the work rather than by describing it.

> **Reference implementation — SPOCK discovery pilot, 14 August 2026.** A body of strategic guidance landed on the same day three stages of a live run were produced and accepted, hours after them. The check reported three stages failing to record a standard their skills declare, and every word of the report was accurate. Widening the date clause was rejected for reversing the check's stated bias; re-running the three stages was rejected on R6.6-2, because the decisions on them named a selected idea and a selected option that a fresh run would reassign, and one of the three was a signed agreement. **The gap was recorded forward-only** and the check now reports three declared gaps alongside its pass. Four negative cases refuse the ways the declaration can be abused: a gap with no reason, a resource claimed both read and unread, a declaration against a resource the step never had to read, and one filed against a step the run does not have.

- **R7-18** **A record more than one program writes round-trips every field any of them requires, and an emptiness test treats the writing program's own placeholder as absent.** Where a definition has a strict reader and a permissive writer over one file, two failures follow and neither is visible from either program alone. **The writer drops what its parser cannot represent**, so a field a person adds by hand survives until the next unrelated command and then vanishes with nothing reporting it. And **the writer's placeholder for *not yet supplied* satisfies a check written as *is this field absent***, so the very mark of an incomplete record is the value that passes the check meant to refuse it.

> **Both are silent, and that is what makes them worth a rule.** A deleted field leaves a record that parses, passes and is missing a fact somebody wrote down deliberately. A placeholder accepted as a value leaves a check that has never failed and never could. **A writer that cannot re-emit what it read is not a writer, it is a filter**, and the fields it silently removes are exactly the ones a person added because no program creates them.

> **Reference implementation — SPOCK discovery pilot, 14 August 2026.** The run-state writer's loader reads one indent level as a `key: value` pair, so a list nested beneath a stage parsed as a key named after its first bullet; three hand-written entries were erased by a single unrelated stage command, and the run's checks stayed green throughout. The field was moved to the top level beside the two lists already sitting there for the same documented reason, and the writer taught to re-emit it. In the same file, an acceptance test written as *is the field absent* was satisfied by the empty string the writer stamps on every unaccepted entry: **a stale artifact had passed that check for four days with both of its acceptance fields blank.**

- **R7-19** **A governed value that may legitimately be either real or fabricated carries which of the two it is, in a field, and the fabricated form is refused wherever the surrounding record permits real material.** Definitions that allow a fixture value — a supplied identifier, an invented source, a stand-in reference — usually record that fact in prose beside the value, which no check reads. **The value then reads identically to a real one to every program and to every reader who did not open that paragraph**, and the run it belongs to can be cited as evidence of something it never was.

> **The refusal arm is what makes the field more than a label.** Marking a value fabricated is worth little if nothing acts on the mark; the definition names the condition under which the fabricated form is illegitimate — a run researching under an approved regime, a run carrying real material — and refuses the combination outright.

> **Reference implementation — SPOCK discovery pilot, 14 August 2026.** The pilot met this twice. Its citation marker was added after a check passed a fabricated source identically to a retrieved one. Four days later the same shape surfaced on the deliverable's issue identifier: the rule had always been that the identifier is *asked for and never invented by the agent*, which a key a person supplies satisfies however they obtained it, and a completed run had carried a fictional one for four days with that fact recorded only in a sentence of prose in the document's own body. A basis field now names the source of the key, and the fabricated form is refused on any run whose research regime permits real material.

- **R7-20** **A rule a body of standards states has a field on the artifact it governs, or the answer lands in prose where no check can reach it.** Delegating a field set to a body (R7-13) lets the body move without a schema change, which is what makes it worth doing. **The failure it invites is a body adding a rule and the artifact having nowhere to put the answer.** A conscientious producer then does the only thing available: it writes the answer into the document's prose, where a reader finds it and every check is blind to it.

> **It presents as compliance, which is why review does not catch it.** The producer did what it was asked. The artifact reads well. A person at the gate can see the answer and confirm it is there. **The only party that cannot is the one that would fail the run**, and nothing in the record distinguishes this from a rule nobody followed.

> **The tell is a body whose coverage statement says a rule is unchecked and does not say where its answer lives.** Unchecked because nobody wrote the check is a backlog item. Unchecked because the artifact has no field for it is a defect, and the two look identical in a coverage table.

> **Reference implementation — SPOCK discovery pilot, 14 August 2026.** Two instances found the same day, and the second was found by writing the check for the first. The competitive standards had required a trend pass since their first version, and the landscape map's schema declared no `trends[]` — so both committed runs wrote their trends into the map's prose. Adding the field and its check surfaced the same shape one section down: standards had been graded by tier since v0.5, the synthesis schema had no `tier`, and the run that took the rule most seriously had built **a full evidence table in prose** with every grade in it, none of which any check could read. **The more diligent the producer, the more convincing the artifact, and the less the record proves.**

- **R7-21** **Where a document's structure is required, the check reads the document; a self-reported list of what it contains is a different claim.** An artifact that declares its own sections is asserting completeness, and the assertion can be true of the declaration while false of the body. Both are worth checking and they are not the same check.

> **The declaration is cheaper and it is the one usually built**, because the record is already parsed and the body is prose. That is a reasonable place to start and a bad place to stop: an artifact can declare thirteen sections addressed over a body carrying three headings, and the gate that reads the declaration passes it.

> **A fixed heading set is the precondition.** A structure a reader cannot locate in the document can only ever be checked by the artifact's own word for it, so closing the section set is what makes the second check possible at all — the ordering is: fix the headings, then check the body, and the self-report becomes a convenience rather than the evidence.

> **Reference implementation — SPOCK discovery pilot, 14 August 2026.** One artifact of seventeen had a fixed section set, and it was the only one that could be diffed against its template — the check for the other sixteen could not be written, because there was nothing to compare a body to. Its check reads the declaration and its own comment admits the gap. Three artifacts were given fixed sets in one pass and their checks read the body instead; the first of them immediately caught an idea declared in the record with no write-up at all, which the declaration-reading form would have passed.

- **R7-22** **Where a definition is read by a generator to produce the instruction a producer follows, the definition's prose conventions become machine syntax, and the set of names it yields is checked in both directions.** Generating the producer's field list from the specification is what stops the two drifting (R7-13). **What it also does is make every typographic choice in the specification load-bearing**, because the generator cannot tell a field named in backticks from a value named in backticks, an omitted list marker from a scalar, or a rule stated in prose from one stated nowhere.

> **The failure is silent in the direction that reads healthy.** A value promoted to a field name tells the producer to write a structure the gate refuses. A field the gate reads and the generator never yields is a field the producer cannot know exists. In both cases the producer follows its instruction exactly, the artifact is refused, and **the defect is attributed to the producer rather than to the surface that instructed it.**

> **Two checks close it and neither is sufficient alone.** Every name the generated instruction declares is one that something reads — a gate, a committed artifact, or a delegated body. Every field a gate reads is one the generated instruction declares. The first catches a value that became a field; the second catches a field that never became anything.

> **Reference implementation — SPOCK discovery pilot, 17 August 2026.** Four instances in one stage, each found by a person reading a failure and none by a check. A field declared without its list marker and described as *the original wording* drew four different shapes from three producers across two rounds. A parser's refusal of folded scalars was documented in no surface, and the second producer to meet it lost a round to a clean refusal that suppressed every gate result for the run. **A trend class set written as three backticked words became three fields of the artifact**, so the generated instruction told every producer to group its trends under them and never named the field the gate actually reads — the map that followed it was refused for a shape it had been instructed to write. And a field a check had read since it was written was declared in no document and no generated surface at all, so no producer could satisfy it. **Correcting the third instance introduced two more of the same kind inside the correction**, an identifier range and a cross-reference, each caught only by regenerating and reading the output.

- **R7-23** **A check that exempts an artifact from a bar establishes the exemption from the artifact's own claim to be in scope, never from the absence of the thing the bar requires.** A bar introduced after work exists needs a scope rule, or it fails every artifact that predates it. **The tempting rule is that an artifact missing the new structure predates the bar.** It cannot be, because that is equally the description of an artifact that was subject to the bar and did not meet it.

> **The exemption then excuses exactly the miss it was written to catch**, and reports it in the language of a rule not applying rather than a rule failing — which is the one wording a reviewer does not investigate.

> **The scope is a signal the artifact carries only if it was trying.** A card carrying some of the depth fields is held to all of them; one carrying none predates the depth bar. A synthesis carrying a verdict section is held to the verdict's parts; one carrying no verdict at all predates the requirement. **The signal is chosen so that meeting the bar badly is in scope and never attempting it is out.**

> **Reference implementation — SPOCK discovery pilot, 17 August 2026.** The verdict check scoped itself on finding none of its four required headings, and a synthesis that had written all four parts, in the right order, as bold labels under a heading named for the verdict was reported as *authored before the verdict existed — its four parts are not required of it.* The bar it had substantially met was skipped rather than passed. Re-scoped on the presence of a verdict section, the same check failed that artifact, still exempted the older run that carries no verdict at all, and still passed the run that carries four headings.

- **R7-24** **Where more than one layer of checks binds an artifact, a pass by the narrower layer is not the verdict.** A check scoped to one unit of work cannot see a rule the estate holds about the shape of a field, and a check scoped to the estate does not run per unit. The step admitting work states **which layers ran**, and a layer that did not run is reported as not run rather than absorbed into the pass of one that did.

---
- **R7-49** **Where the actor that advances work is not the person, a command the workflow runs for itself takes no input, and a command that needs something only a person holds is a stop with a named way back in.** The two are indistinguishable in a list of commands and behave in opposite ways. A command carrying an input puts a box in front of the person that the actor cannot fill — which is precisely the control an acceptance needs, because a decision recorded without a person having done anything is not a decision — and precisely the wrong shape for the move the workflow makes to advance itself, because **the actor's turn ends at the box and the command's result is no longer retrievable afterwards**. So the workflow stalls with nobody asked, the actor cannot report that it stalled, and the person is left holding a run that stopped for no visible reason. **The distinction is a property of the substrate rather than a preference**: it has to be established by running one command of each shape and watching, and it then decides the shape of every step that triggers anything. A model that treats *the actor triggers the mechanical work* as one uniform move will build both kinds the same way and get the acceptance and the advance wrong in opposite directions.

- **R7-50** **Whatever advances work applies the same scopes as whatever grades it, and a scope written into one of the two is a stage that cannot finish.** A grading model earns its exemptions: an artifact whose only producer is withdrawn, a step added after a stage ran. Each is written where the grading happens, because that is where the failure appeared. **The thing that moves work forward reads the same declaration and rarely inherits the exemption**, so it asks for an artifact nothing can produce, forever, while every check reports the work sound — the two answers are never compared because nobody thinks of them as the same question. **It is invisible from both sides**: the grader is right, the driver is faithful to the declaration, and only somebody trying to finish the work meets the contradiction. The remedy is that the scoping is a function both call rather than a rule each states, which is the same reason a contract is read by one parser rather than restated by every reader.

- **R7-51** **A unit of work is assigned to a person before it starts, and that person is the only one whose approval it accepts.** Where the assignment is inferred at the end — copied from whoever signed — the record names one person in a role that is the act of signing rather than anything anybody holds, and a real organisation has four different people across a discovery: the one who frames the problem, the one who shapes the opportunities, the one who chooses, the one who signs the requirements. **A record that cannot tell them apart cannot say who stands behind any stage**, which is the whole of what an approval is for. Asking at the end is not a weaker version of asking at the start; it is a different question, and the answer to it is always the person who happened to be there. The assignment is offered as a choice from everybody the run already knows, because two spellings of one name are two people to every count that reads the record, and it is asked every time even where the answer never changes.

- **R7-52** **A decision is refused until the record says the thing being decided was put in front of somebody.** Where a substrate reaches every command or none — and a substrate that lets an actor run one task lets it run all of them — the grant cannot be the control, and the input box the actor raises appears before any of the workflow's own code runs. So what is enforced is the order rather than the access: the receipt is written by whatever prints it, at the moment it prints it, and a signature arriving without one goes nowhere. **A rule saying "do not ask for a signature before you have said what it is for" is not a control**, and four occurrences across two runs is what it takes to learn that. The refusal also covers the receipt itself: a decision presented on a document that is not on disk was not presented.

- **R7-53** **A step that briefs work runs before the work; a step that assembles it runs after; and a model with one moment for both gets the first one silently wrong.** Where the driver runs a stage's registered steps at a single point in the stage's life, that point is chosen for the assembling steps, because those are the ones that visibly fail when it is wrong. **The briefing step then hands a producer its instructions on the way out**, produces nothing anybody reads, and the stage runs as the single pass the composition existed to prevent — with every check reporting the work sound, because a fan-out that never fanned out looks exactly like a stage that had one thing to do. The moment is declared per step rather than assumed for all.

## 8. Conformance checklist

An implementation conforms when all of the following hold.

**Every criterion names the rules it summarises**, and the rule governs. Where a criterion and the body disagree, the body wins and the criterion is the defect. The correspondence is checked mechanically in both directions: a criterion may not name a rule this document does not state, and a labelled rule may not reach no criterion.

Criteria are numbered per document and carry the document in the number, so `WB-1` names a criterion of this document and nothing else.

**WB-2 and WB-3 were carried here from the Agent Blueprint.** Both summarise rules stated in section 2 of this document and in no section of that one, so an assessor reading them there was being held to a requirement that document never made. Their wording is unchanged; only their home is.

### Composition and sequence — section 2

| # | Requirement | Rules |
|---|---|---|
| WB-1 | A verifying step names a different agent than the producing step | R2-2 |
| WB-2 | Sequencing appears only in workflows; no agent contains ordering logic | R2-1 |
| WB-3 | Within the governed boundary no agent invokes another agent, and no declared capability resolves to an agent inside that boundary; work requiring two roles is a workflow with two steps, so that a role's declared capability ceiling describes everything it can cause to happen. What a third-party service does internally is not observable from a binding and is governed as a destination (Agent Blueprint §6.4) rather than as a role | R2-5 |
| WB-4 | An artifact produced outside a composition is not consumed by a composed workflow unless it has passed the gate it would have carried within one | R2-4 |
| WB-5 | A workflow declares staleness bounds for the inputs it depends on and re-evaluates them on re-entry before the next step runs | R2-3, R6.3-2 |

### Composition — sections 3.4 and 3.5

| # | Requirement | Rules |
|---|---|---|
| WB-6 | Every workflow declares a name, version and owner and is composed by reference, never by restatement; a composed workflow brings its own quality gate, is still governed when run alone, and the composing workflow declares only what it requires out of it | R3-1, R3-2, R3-3 |
| WB-7 | Every artifact records the workflow that produced it or records that it was produced outside one; that designation travels to anything derived from it, work produced outside a composition writes its own record and trace but never to a store that outlives the run — area knowledge, promoted memory, or the catalogue, and adoption into a run is a human decision carrying a decision record | R3.4-1, R3.4-2, R3.4-3, R3.4-4, R3.4-5 |
| WB-8 | A workflow declares, per step, the artifact types it produces and the record types it writes; a step producing an artifact whose type declares class `output` carries a decision gate and one producing none does not, and a workflow declares no documents because a document is a view over records | R3.5-1, R3.5-2, R3.5-3 |
| WB-9 | A run resolves to exactly one tenant and every artifact and record it writes carries it; every refusal a step makes — a blocked precondition, a refused adoption, a declined advance past a stale input — writes an event record | R3.5-4, R3.5-5 |
| WB-50 | A system offering uncomposed use declares how it is entered, by an explicit token that is never inferred from phrasing and is the same string the record carries; a binding may be barred from uncomposed use, declared where the work happens, and every surface offering the entry is compared against that declaration | R3.4-6, R3.4-7 |
| WB-40 | Where a step's output is a set of instances of one kind, it is composed as one invocation per instance with a per-instance effort bound and an assembling join; the join transfers what each invocation produced rather than re-authoring it, and an instance that failed is recorded as unproduced with its reason rather than shortening the set silently | R3.6-1, R3.6-2, R3.6-3, R3.6-4 |
| WB-52 | The assembling join's output bound is the size of the assembled set rather than one invocation's ceiling, and it emits incrementally against it; every step declaring an output reads it back and confirms it is well formed before reporting, so that what is reported is the artifact and not the work | R3.6-5, R3.6-6 |
| WB-100 | Where an artifact in a stage cannot be written until a person chooses, that choice is recorded as a decision and never as a gate signature; the gate that remains is taken over the finished set, so no stage waits on a signature that waits on the artifact the signature would admit | R3.6-14 |
| WB-57 | Each instance of a fanned-out step writes its own output and that output is retained beside the assembled artifact, so the assembling join can be compared against what the instances produced rather than taken on its word | R3.6-8 |
| WB-59 | A composing step names the workflow it composes and resolves to that workflow's own declaration; a reference resolving to nothing is refused rather than passed over, and no exemption written for a workflow that had no declaration yet survives the writing of one | R3-4 |
| WB-60 | Where what a comparison against the retained instances protects is a value the record does not carry, the rule protecting it is also stated against the document, so it holds where the same step is composed as a single invocation and no instances were retained | R3.6-10 |
| WB-95 | A fan-out phase whose job is transfer or derivation from material on disk is performed by a program rather than by an invocation carrying a rule against re-authoring | R3.6-11 |
| WB-96 | Where an instance writes more than one file, each declares one destination, and the comparison against the assembled artifact reads only the files bound for it | R3.6-12 |
| WB-97 | A derived output names by content the version of the input it was derived from, and the assembling step refuses a version the input no longer has | R3.6-13 |
| WB-98 | Text copied verbatim from a governed source body is marked as a quotation, and the estate's own style and vocabulary rules are not applied to it | R5-14 |
| WB-58 | A fanned-out step's cardinality bound is evaluated against the set the naming step declared, together with the instances recorded as unproduced, rather than against the instances that returned | R3.6-9 |
| WB-54 | A step's input is bounded as its output is; where declared inputs exceed what a step can hold, the extent required is named rather than the document containing it, and a step that has read without writing for longer than comparable steps took end to end is diagnosed by its writes rather than by elapsed time | R3.6-7 |
| WB-55 | A step's instruction states the test its output must pass rather than the material to build on; a prior artifact offered as a pattern transfers form and never content, including its metadata values; the floor of a permitted range is stated as a legitimate answer; and a repeated defect of one class is corrected in the instruction before the step | R3.7-1, R3.7-2, R3.7-3, R3.7-4 |


### Record and document — section 3.8

| # | Requirement | Rules |
|---|---|---|
| WB-61 | A record is one production, and a fan-out writes one record per instance | R3.8-1 |
| WB-62 | A field two records of one document could answer differently sits on the record; one value for the whole document, or a human decision about it, sits on the document | R3.8-2 |
| WB-63 | Every citation resolves to a record, and every record is cited by the document it feeds | R3.8-3 |
| WB-64 | A document whose readership forbids internal identifiers cites in its record list, and the record half of the join still holds | R3.8-4 |

### Stage and assurance — sections 4 and 5

| # | Requirement | Rules |
|---|---|---|
| WB-37 | A consuming step's declared inputs are compared against the resources its own procedure names, so a dependency nobody declared is refused; a check over declarations alone cannot establish this | R5-7 |
| WB-51 | Disagreement between repeated trials of one input is read against the rule before it is attributed to the producer, and a rule amended in response is measured again rather than declared convergent | R5-8 |
| WB-85 | Every reduction a step declares names the condition that lifts it in a form the build evaluates, and a reduction whose condition now holds is refused rather than reported | R5-9 |
| WB-10 | Constraints halt and measurements score; neither is wired as the other | R4-1 |
| WB-11 | Only a measurement's disposition varies by stage; the stage is declared by the workflow, never chosen by the skill being checked and never supplied by a caller. A skill invoked outside a workflow has no declared stage and the strictest stage applies — to every measurement's disposition and equally to which risk-scaled floor clauses activate — and the stage and disposition in force are recorded with the result | R4-2, R4-3, R4-6 |
| WB-12 | No constraint scales by stage: schema conformance, spend and time limits, the standing budget, the quarantine boundary, capability and data-scope limits, egress rules and compliance obligations block at every stage without exception. For each constraint, and for each stage the work runs in and the stageless path of direct invocation, a case exists proving it refuses a known-bad input there, re-derived when a stage binding is added | R4-4, R4-5 |
| WB-13 | A workflow composing more than one skill carries process-level assurance: that the assembled output achieves the workflow's goal, and that every edge's output satisfies the input consuming it | R5-1, R5-2 |
| WB-14 | End-to-end results are reported alongside per-step results, never in place of them | R5-3 |
| WB-26 | Every assurance tier is labelled by what actually enforces it, and a goal tier whose evaluation suite does not exist reads `pending` rather than graded; symmetrically, every reduction a step declares is true when it is written and is settled against the run's own record wherever that record can settle it, so a limitation is neither weaker nor stronger than what the run could actually do | R5-4, R5-5 |

### Control — section 6

| # | Requirement | Rules |
|---|---|---|
| WB-36 | Gate coverage reported as a proportion distinguishes a gate whose judged rules were all decided from a gate that had none; a gate with no judged half is named as such and counted in neither column | R6.3-7 |
| WB-15 | The readiness signal is calculated from records whenever a record is written, and gates advancement | R6.1-2, R6.1-3 |
| WB-16 | Compliance clearance and human confirmation are absolute and cannot be offset | R6.1-1 |
| WB-17 | The component that decides advancement performs no work and cannot alter the process | R6.2-1 |
| WB-99 | An artifact that is the record of a person's decision does not exist before the decision; the mark is recorded first and the artifact assembled from it, so a downstream precondition naming that artifact is satisfied only by a decision somebody made | R6.4-4 |
| WB-18 | Absolute checks are evaluated before any other check at a gate | R6.3-1 |
| WB-25 | Every recorded gate names what ran its automated check; the field is present and non-empty, and it never names the step's own producer — nor, where the check is a program, any agent or skill of the workflow. The rule is enforced at write time and at the gate, from one shared definition of what counts as a producer | R6.3-4 |
| WB-24 | On every gated step the two gate timestamps are present, well formed and **compared** — not merely required to exist — and the decision does not precede the check that admits the step to review; a record written later carries the date of the event, and an implementation storing dates rather than timestamps declares that same-day satisfies the rule | R6.3-3 |
| WB-19 | A step verifies its declared inputs before advancing; a missing, ungated or stale input blocks advancement, and a blocked step never produces a partial or placeholder artifact | R6.4-1, R6.4-2, R6.4-3 |
| WB-20 | One state vocabulary is shared by run state and artifact envelope, and a precondition failure is recorded distinctly from a quality-gate failure | R6.5-1, R6.5-2 |
| WB-41 | An artifact the reader cannot parse is reported as a parse failure naming the file and position, counted separately from any check outcome, and does not suppress the results of artifacts that parsed; where the reader supports less than the serialisation format it nominally uses, that restriction is stated where a producer reads its instructions | R6.5-3 |
| WB-21 | Re-running a step marks those downstream stale and retains their artifacts; advancing past a stale input requires a recorded human acceptance | R6.6-1 |
| WB-38 | A decision record binds to the artifact version it was taken against, and re-deriving an artifact a decision was recorded on either re-opens that decision or is refused; identifiers assigned positionally are not treated as stable across runs of the step that assigns them | R6.6-2 |
| WB-27 | A value the specification calls derived is recomputed at the gate and compared to what the record or the artifact claims, never read from either, including the recorded verdict of a gate's own automated half; where the same derivation is exercised by an evaluation suite, both call one implementation rather than each carrying its own | R6.3-5 |
| WB-34 | Every artifact a decision is taken on carries the rules its gate could not decide, recomputed at the gate rather than read from the record, marking which need a judge and which need a check nobody has written, and marking a rule whose answer the artifact cannot hold; where every rule was decided, the artifact says so rather than staying silent | R6.3-6 |
| WB-43 | A run has a declared way to end without completing: a recorded human decision carrying who, when and a reason from a closed set, available at every stage rather than only at a gate, retaining the artifacts; no state in the vocabulary lacks a writer and a reader; and where the organisation distinguishes *not now* from *no*, a workflow modelling one of them declares which | R6.8-1, R6.8-2, R6.8-3, R6.8-4, R6.8-5 |
| WB-23 | A stage may carry more than one decision gate; where it does, each is a separate recorded human decision, the run records the stage-level decision and each artifact its own, the selecting and committing skills are distinct bindings, the decision-record check expects exactly the stage's declared set — no fewer and no more — a stage-scoped record is compared by summing across the stage's carriers, never against one of them, and the artifact carrying the alternatives reaches the decision with no stated preference and no nominated member, each option stating how it differs from the others | R6.7-1, R6.7-2, R6.7-3, R6.7-4, R6.7-5 |

### Coverage checks — section 7

| # | Requirement | Rules |
|---|---|---|
| WB-65 | No check compares two things derived from the same read | R7-25 |
| WB-86 | A check reports the size of what it examined, so a selector returning nothing is visible in the pass; when a shared resource changes shape, the consumers audited are the ones that select against it rather than the ones that read it | R7-45 |
| WB-87 | Every surface that restates a governed set for a reader is joined to that set in both directions by a check, so a set that grows cannot leave the sentence describing it behind | R7-46 |
| WB-88 | The rule set a gate grades against records when a rule was withdrawn as well as when it was introduced, and a retired rule is dated out rather than deleted, so finished work is never failed for having been correct at the time | R7-47 |
| WB-89 | Every case proving a check can fail is written in the form its defect takes in the world, never in whichever form most conveniently trips the check, so a suite's coverage claim is about the check's reach and not about one arm | R7-48 |
| WB-90 | Every command the workflow triggers for itself takes no input, and every command needing what only a person holds is declared a stop with a named way back in | R7-49 |
| WB-91 | The scopes a grading model applies are read by whatever advances the work, from one place, so the driver and the grader cannot disagree about what a stage owes | R7-50 |
| WB-92 | A unit of work names the person accountable for it before it starts, and no other person's approval is accepted on it | R7-51 |
| WB-93 | A decision is refused unless the record says its subject was put in front of a person, and the receipt is written by whatever presents it | R7-52 |
| WB-94 | Each step the workflow runs for a unit of work declares the moment in that unit's life at which it runs | R7-53 |
| WB-66 | A mutation that matches nothing is reported as a broken test, a case whose defect was repaired is re-anchored rather than rebuilt, and a case exercising a guard asserts the quantity that guard changes | R7-26 |
| WB-67 | A check joining two sets states which direction it walks and walks both, unless it states why one direction cannot fail | R7-27 |
| WB-68 | A check needing to know when a step ran reads a field recording that step, never one recording the whole unit of work | R7-28 |
| WB-69 | A held-out suite is derived from a corpus of finished work rather than from the rule it grades | R7-29 |
| WB-70 | A step is finished against the contract that says what it produces, never against its own record of what it produced, and a deliberate absence is read from the declaration that parks it and named in the verdict | R7-30 |
| WB-71 | Every field a composition's parallel instances write carries its entry shape in the declaration, and the join propagates a divergence rather than normalising it | R7-31 |
| WB-72 | Every rule a search can settle is bound to a check, and no producer's report that it holds is accepted in place of one | R7-32 |
| WB-73 | Every shape a producer must write is reachable from the instructions that producer is sent to, and never recorded only where the workflow is designed | R7-33 |
| WB-74 | Every check reports the size of the set it examined alongside its verdict, and a check whose examined set is empty while the artifact it governs is not reports that rather than passing | R7-34 |
| WB-75 | A completed run is never amended so that a corrected check passes over it; the correction goes to the check and the run carries the failure | R7-35 |
| WB-76 | Every step producing something a later step executes tests that it is well formed as part of the write, and reverts the whole production when the test fails | R7-36 |
| WB-77 | An artifact takes one proposed change at a time, later proposals are re-derived against the state earlier ones left, and a proposal whose quoted anchor no longer resolves is refused rather than matched approximately | R7-37 |
| WB-78 | Every step composed as N invocations declares the record shape a later invocation adds to, and every assembler refuses a second value for a field that already carries one rather than dropping it | R7-38 |
| WB-79 | Every document whose section count grows with what the run found is created with its opening and extended one section per write | R7-39 |
| WB-80 | Every field name a check reads is compared against the fields the specification declares, in both directions, and a check whose valid set is empty while the artifact it governs is present reports that rather than passing | R7-40 |
| WB-81 | Every step's stated account of the checks its gate runs is compared against that gate's own list, and a step asserting that a rule is decided by nothing is refused where a check decides it | R7-41 |
| WB-82 | Every comparison against a model a run recorded at the time carries the date that record was made, every addition to the model carries the date it was added, and finished work is measured against what existed when it was done | R7-42 |
| WB-83 | Every rename of what a step produces or consumes moves the specification, the registers and the checks that resolve against it in one change, and the change is proved by running the step rather than by re-reading the documents | R7-43 |
| WB-84 | Every carrier generated from a specification is exercised by one production before a step is told to copy it, and a step instructing a producer to copy a shape it has never produced is refused | R7-44 |
| WB-22 | Every rule declaring a coverage check has one, and every coverage check derives from a rule that declares it; the derivation is re-run when either changes, and a check that cannot be traced to a rule is removed rather than kept. This is what closes the set, in place of a register | R7-1, R7-2, R7-3, R7-4, R7-5 |
| WB-28 | Every check records, in a field, the failure that caused it; the build refuses a check that leaves the field blank, and a check whose cause cannot be recovered from the record carries a declared value reserved for that case rather than a reconstruction | R7-6 |
| WB-29 | Every rule a mechanical check must decide is carried in a field the check can read; where a rule turns on identity, sameness or independence, the record carries a key and the check compares keys rather than prose | R7-7 |
| WB-30 | Every exclusion a definition declares — a parked binding, an unapproved destination, a step held out of a release — is refused by a check reading the producer rather than the artifact identifier, and any list of exclusions mirrored from its register is itself checked against that register | R7-8 |
| WB-31 | A shared resource's availability and each consumer's use of it are recorded as two states, and the second is never inferred from the first; where a step declares an input, the declared path is checked to resolve and the version the run recorded is checked against the version the resource carries | R5-6 |
| WB-32 | Every governed field naming something outside the definition is checked against a register of the values it may hold, carried in the build, and a value absent from that register is refused | R7-9 |
| WB-35 | Every rule recorded as awaiting a check is established as awaiting a CHECK rather than an unfinished standard; where a rule constrains what one step may do to another step's output, the artifacts are separated rather than a copy of the earlier state retained | R7-11 · R7-12 |
| WB-33 | Every enumeration a reader acts on — the decisions still owed, the prerequisites still unmet, the checks a gate runs — is derived from its source at the point of reading, or cited without a count; no second surface restates the set or its size | R7-10 |
| WB-45 | Where the record cannot establish whether a shared resource was available when a step ran, the run declares the gap per step with a reason and the check reports how many it accepted, rather than the comparison widening its tolerance or the step being re-derived | R7-17 |
| WB-53 | Where a generator derives a producer's instruction from the specification, every name that instruction declares is one something reads and every field a gate reads is one that instruction declares, compared in both directions; and a check exempting an artifact from a bar scopes the exemption on the artifact's own claim to be in scope, never on the absence of what the bar requires | R7-22, R7-23 |
| WB-56 | Where more than one layer of checks binds an artifact, the step admitting the work states which layers ran, and a layer that did not run is reported as not run rather than absorbed into the pass of one that did | R7-24 |
| WB-46 | A record more than one program writes round-trips every field any of them requires, and a test for an absent field treats the writing program's own placeholder for *not yet supplied* as absent | R7-18 |
| WB-47 | A governed value that may legitimately be fabricated carries which of the two it is in a field rather than in prose, and the fabricated form is refused wherever the surrounding record permits real material | R7-19 |
| WB-48 | Every rule a delegated body states has a field on the artifact it governs, and a coverage statement distinguishes a rule unchecked for want of a check from one unchecked for want of a field | R7-20 |
| WB-49 | Where a document's structure is required, the check reads the document rather than the artifact's self-reported list of its own sections, and the heading set is fixed so that it can | R7-21 |
| WB-39 | A carrier telling a producer what to write carries shape and assigned value as well as name, omits a claim its derivation cannot make safely, and has every claim it does make verified against a source that did not generate it; a governed field is checked against the value its register assigns that subject rather than against the field's vocabulary, and correcting a check of that shape re-reads its siblings in the same change | R7-13 · R7-14 |
| WB-44 | A check requiring the current standard set to be recorded as used is evaluated against the standards that existed when the step ran; every way of not knowing — an unparseable date, an absent step time, a body that has been revised — makes the check stricter rather than laxer | R7-16 |
| WB-42 | Where a specification delegates a field set to another body, that body carries the shape of an entry as well as the name of the field, and a field added there is added with its shape in the same change; a field whose entry structure genuinely differs per instance is declared prose rather than left as an undeclared map | R7-15 |
