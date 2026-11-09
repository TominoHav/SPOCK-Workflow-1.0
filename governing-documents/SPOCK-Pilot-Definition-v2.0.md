# SPOCK | Pilot Definition

**Version:** 2.0

---
## 1. Scope
The pilot delivers part of the product discovery workflow, from an initiative brief to a delivery-ready initiative for Jira, built as a single connected agentic workflow. It covers seven stages, carried by four agents, and a person decides at the end of six of them. The market stage has no decision gate: it is accepted when its quality gate passes, or when a person signs off a check it cannot meet. Two more agents, the Methodology Coach and Workflow Support, stand outside the sequence and are called on demand.

**In scope**
- Hypothesis Design: a defined, standardized set of problems from material provided as input.
- Competitive Analysis: the market and feature standard for the brief topic, as inspiration.
- Ideation: several product ideas for the user to choose from.
- Roadmapping: three MVP options, to which the person may add up to three of their own (two to six in all), one chosen, expanded and accepted at G5b; and a product requirements document (PRD) for it, which is its own stage, written by the Business Analyst agent and agreed by the Product Manager (G6).
- Initiative Design: an initiative based on the PRD, written to Česká spořitelna's initiative template and ready for Jira. Creating it in Jira is not built: that step is parked until the authoritative Jira host is named, and with no host it cannot run. A person records the initiative's Jira key, or that it has none yet, and the initiative carries it.
- Methodology Coach: on-demand guidance on the discovery method itself, available at any moment and outside the sequence of stages.

**Out of scope**
- Synthetic research: the pilot does not generate simulated customers, synthetic personas, or AI-produced interview responses. No agent output is presented as customer evidence.

---
## 2. Workflow Description and Environment
The pilot delivers the front part of product discovery as a single connected workflow.

Goal is to bring level of standardization, quality enfocement and asset delivery to enable teams to focus on quality of the output and therefore increase speed and quality of the outcome. All that through agentic first discovery process integrated into Copilot environment.

Team starts with the initiative brief, the first stage, written with the Product Manager agent in conversation and decided at G1. The seven stages run in sequence, brief first: brief, problems, market, solutions, MVP, PRD, initiative. The market stage reads the problem list, so it runs after it. Each agent performs one defined job and hands its result to the next.

It enables the team stays in control throughout: a person decides at the end of six of the seven stages, choosing what moves forward where a choice is required. The market stage has no decision gate: it is accepted when its quality gate passes, or when a person signs off a check it cannot meet. The agents prepare the structured work, and the people apply judgment and make the decisions.

```
                  ┌───────────────────┐
                  │ 1  Brief          │   ◆ Human in the Loop
                  │  → initiative     │     the Product Manager
                  │    brief          │     decides the brief (G1)
                  └─────────┬─────────┘
                            ▼
                  ┌───────────────────┐
                  │ 2  Hypothesis     │   ◆ Human in the Loop
                  │    Design         │     the Researcher or the
                  │  → prioritised    │     Product Manager
                  │    problem list   │     approves the list (G2)
                  └─────────┬─────────┘
                            ▼
                  ┌───────────────────┐
                  │ 3  Competitive    │     no decision gate:
                  │    Analysis       │     accepted when its
                  │  → market &       │     quality gate passes,
                  │    feature        │     or when a person signs
                  │    standards      │     off a check it cannot
                  │                   │     meet
                  └─────────┬─────────┘
                            ▼
                  ┌───────────────────┐
                  │ 4  Ideation       │   ◆ Human in the Loop
                  │                   │     the Product Manager
                  │  → several ideas  │     chooses one solution
                  │                   │     (G4)
                  └─────────┬─────────┘
                            ▼
                  ┌───────────────────┐
                  │ 5  Roadmapping    │   ◆ Human in the Loop
                  │  → three MVP      │     one option chosen,
                  │    options, one   │     expanded and
                  │    expanded       │     accepted (G5b)
                  └─────────┬─────────┘
                            ▼
                  ┌───────────────────┐
                  │ 6  PRD            │   ◆ Human in the Loop
                  │  → PRD            │     the Product Manager
                  │                   │     agrees the PRD (G6)
                  └─────────┬─────────┘
                            ▼
                  ┌───────────────────┐
                  │ 7  Initiative     │   ◆ Human in the Loop
                  │    Design         │     the Product Manager
                  │  → initiative,    │     approves it as a
                  │    ready for Jira │     delivery item (G7)
                  └───────────────────┘


   ─────────────────────  alongside the whole flow  ─────────────────────

   ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
     ◇  Methodology Coach                                  standalone
   │                                                                 │
     not a stage. the user calls it directly, at any moment, before,
   │ during, or after any step above. it answers questions about the │
     method, takes no handoff, produces no workflow output, and
   │ changes nothing in the flow.                                    │
    ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘

   ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
     ◇  Workflow Support                                   standalone
   │                                                                 │
     not a stage. the user calls it directly, at any moment, to
   │ learn what state a run is in and which task moves it. it takes  │
     no handoff, produces no workflow output, passes nothing on,
   │ and changes nothing in the flow.                                │
    ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

**The Methodology Coach sits outside the flow.** The seven stages above run in sequence, each one handing its output to the next. The Methodology Coach does not. It is a standalone agent the user calls directly, at any moment, when a question about the method comes up: what a stage is for, why the steps are ordered as they are, what separates a well-framed problem from a poorly-framed one, or how to read what an agent has produced. It takes no input from the previous stage and passes nothing to the next. Calling it does not interrupt, advance, or alter the workflow, and a team can complete the pilot without ever using it.

**Environment.** The pilot runs inside the GitHub Copilot environment. All agents and their outputs are held in a single, shared repository. This keeps the pilot within a single environment, and means every input, output, and decision is recorded in one place and can be traced.

**What a person needs.** VS Code with GitHub Copilot and GitHub Copilot Chat, signed in with a Česká spořitelna GitHub account, and Node.js, which runs every step the workflow takes. The model to choose in the chat is named in the setup guide, and the agents cannot see which model is chosen. Each run's files live in one folder per run, in the runs folder the repository names.

**Every step a person takes is a task.** Starting a run, approving a stage, recording a choice, signing off a check, sending a stage back and stopping a run are each a task the person runs from VS Code. The agents prepare the work and name the task; the person runs it and types their own name into it.

The agents run as one connected workflow rather than as separate assistants. Each agent reads its inputs from a defined place, produces its output in a set format under a fixed naming convention, and passes it to the next stage. Because each handoff is a saved file, every step can be reviewed, corrected, and reused, and no stage depends on information passed silently from the one before it.

---
## 3. Agent Description
The pilot is delivered by four agents in the workflow, supported by two standalone agents outside it. The four carry the seven stages: the Product Manager the brief, the solutions and the MVP; the Opportunity Designer the problems; Competitive Analysis the market; and the Business Analyst the PRD and the initiative. The Methodology Coach and Workflow Support stand outside the sequence and are called on demand. Each agent holds one or more skills. A skill is a single, focused job with defined inputs, a structured output, and a quality standard.

| Area                      | Agent                | Skills                                                       |
|---------------------------|----------------------|--------------------------------------------------------------|
| Market Intelligence       | Competitive Analysis | Landscape Mapping, Market Content Extract, Deep Dive, Synthesis |
| Research                  | Opportunity Designer | Material Intake, Hypothesis Authoring, Opportunity Framing, Prioritisation |
| Product                   | Product Manager      | Brief Creation, Ideation, MVP Option Design, MVP Expansion   |
| Analysis & Specifications | Business Analyst     | PRD, Initiative Authoring; Initiative Propagation, parked    |
| Method & Enablement       | Methodology Coach    | Methodology Guidance                                         |
| —                         | Workflow Support     | Workflow Support                                             |

The first four agents each own one or more stages of the workflow. The Methodology Coach and Workflow Support own none; each is called on demand and sits outside the sequence.

### Competitive Analysis Agent
**Area:** Market Intelligence.  
**Skills:** Landscape Mapping, Market Content Extract, Deep Dive, Synthesis.  

A market intelligence agent. It researches the global banking and fintech market and benchmarks it for a given product topic. Its Landscape Mapping skill surveys the market for the topic, Deep Dive profiles the strongest players, and Synthesis distils the findings into the product and feature standards that represent the market norm.

### Opportunity Designer Agent
**Area:** Research.  
**Skills:** Material Intake, Hypothesis Authoring, Opportunity Framing, Prioritisation.  

A research agent. It reads the material a team already holds and frames it as clear, testable problems. Its Hypothesis Authoring skill separates evidence from assumption, recovers the real problem where a solution has already been assumed, and states the result as a standardized set of problems.

### Product Manager Agent
**Area:** Product.  
**Skills:** Brief Creation, Ideation, MVP Option Design, MVP Expansion.  

A product agent that owns the move from problem to defined scope. Its Brief Creation skill writes the initiative brief with the person in conversation; its Ideation skill generates and frames candidate product ideas; its MVP Option Design skill develops the chosen idea into MVP options, and its MVP Expansion skill expands the option chosen.

### Business Analyst Agent
**Area:** Analysis and Specifications.  
**Skills:** PRD, Initiative Authoring; Initiative Propagation, parked.  

A delivery-analysis agent that prepares validated product direction for engineering. Its PRD skill writes the PRD from the expanded MVP, and its Initiative Authoring skill structures an agreed direction into an initiative. Recording it in Jira, the Initiative Propagation skill, is not built: that step is parked until the authoritative Jira host is named.

### Methodology Coach Agent
**Area:** Method and Enablement.  
**Skills:** Methodology Guidance.  
**Position:** Standalone; not a stage in the workflow.  

An enablement agent that explains the discovery method to the people running it. Its Methodology Guidance skill answers why the workflow is built the way it is, what each stage is for, what a good output at that stage looks like, and how to interpret what an agent has produced. It is one of two agents that take no handoff from a previous stage and pass nothing to a following one, Workflow Support being the other: the user calls it directly, at any moment, and it produces no workflow artifact. It advises on method, not on content. It does not judge whether a given competitive analysis, problem list, idea, or PRD is correct, does not approve or decide anything, and does not stand in for the accountable reviewer at any stage.

### Workflow Support Agent
**Skills:** Workflow Support.  
**Position:** Standalone; not a stage in the workflow.  

An agent that says what state a run is in and which task moves it. Like the Methodology Coach, it takes no handoff, produces no workflow artifact and passes nothing on, and the user calls it directly, at any moment.

---
## 4. Workflow Process
Each step shows what feeds in, what it produces, and where a person reviews or decides. The seven stages run in sequence, brief first.

### Step #1: Brief
**Input:** what the person tells the Product Manager agent in conversation, and any document they supply.
**Output:** the initiative brief.
**Human in the Loop:** the Product Manager decides the brief at G1.

### Step #2: Hypothesis Design
**Input:** the research material and context the team already holds.
**Output:** a standardized problem list, with the evidence, assumptions, and open questions behind it; carried forward to Ideation.
**Human in the Loop:** the Researcher or the Product Manager, at G2: one approval, by either of them alone, accepts the stage. The workflow contract declares that the Researcher judges whether each opportunity is well formed and evidenced and the Product Manager which ones the run pursues; nothing in the build enforces that split.

### Step #3: Competitive Analysis
**Input:** the initiative brief and the prioritised problem list.
**Output:** the market and feature standards for the topic, each traced to its source; carried forward to Ideation.
**Human in the Loop:** nobody approves the market stage: it is accepted when its quality gate passes, or when a person signs off a check it cannot meet. In the solutions stage the person reads the market findings each solution cites.

### Step #4: Ideation
**Input:** the market and feature standards, the problem list, and any direction from the user.
**Output:** several ideas in a set format, ready to compare.
**Human in the Loop:** the Product Manager chooses one solution (G4), with the reason recorded, and only that one is taken forward.

### Step #5: Roadmapping
**Input:** a selected idea, and the user's answers to the agent's questions.
**Output:** three MVP options, to which the person may add up to three of their own (two to six in all); one is chosen and expanded.
**Human in the Loop:** a person chooses one option, and the Product Manager accepts it, expanded, at G5b.

### Step #6: PRD
**Input:** the expanded MVP, with the initiative brief and the prioritised problem list.
**Output:** the PRD, written by the Business Analyst agent, with its agreement block left empty for a person to sign.
**Human in the Loop:** the Product Manager agrees the PRD (G6). The agent does not approve scope.

### Step #7: Initiative Design
**Input:** the agreed PRD.
**Output:** an initiative document on Česká spořitelna's initiative template, carrying the Jira key the person records, or saying it has none yet. Creating the initiative in Jira is not built: it is parked until the authoritative Jira host is named.
**Human in the Loop:** the Product Manager approves the initiative as a delivery item (G7); the Business Analyst is the agent that writes it.

### Available at any point: Methodology Coach
Not a step. The user calls it directly, whenever a question about the method comes up, before starting, mid-stage, or after receiving an output.
**Input:** a question from the user, and the output being looked at where that helps.
**Output:** an explanation of the method, and where useful a pointer to the relevant part of it. Nothing is written into the workflow.
**Human in the Loop:** none required. The Coach produces no workflow output, so nothing it returns needs review before the workflow continues. It advises on method only and never substitutes for the accountable reviewer at a stage.

### Human oversight across the flow
Human review is not a single final step. A person decides at the end of six of the seven stages: before a stage's output is passed to the next stage or treated as a source of truth, an accountable person checks it for accuracy and completeness, challenges unsupported statements, and confirms it is fit for use. The market stage has no decision gate: it is accepted when its quality gate passes, or when a person signs off a check it cannot meet. The documents between a stage's start and its output (the intake record, the hypotheses, the framed opportunities, the landscape and the cards) are none of them a separate decision: the person answers the framing questions as the framed opportunities are written, and at the G2 stop sees what each hypothesis rests on.

The intended change in day-to-day work is that teams spend less time producing outputs and more time applying judgment, validating evidence, and making accountable decisions. The workflow provides structured assistance but accountability stays with people.

**A quality gate comes before every decision.** When an agent has written a stage's output, the workflow runs that stage's quality gate, a set of automated checks run separately from the agent, and only then is a person asked to decide. A stage that fails its quality gate is not put to a person for a decision; it goes back to the agent, or, where only a person can clear the failure, to the task that does.

**Who decides at each gate.** The Pilot Definition gives G1, the brief, to the Product Manager; G2, the problem list, to the Researcher or the Product Manager, one approval by either of them alone accepting the stage; and G4, the chosen solution, G5b, the expanded MVP, G6, the agreed PRD, and G7, the initiative, to the Product Manager. Someone in another role may still approve: the approval is recorded under the role they typed, with a heads-up that names the role this document gives the gate, and it is not refused.

**A check the run cannot meet is signed off, with a reason.** Where a quality gate fails on something the run genuinely cannot meet, a person may sign that check off, saying why it cannot be met and what was decided, in their own name. The gate stays recorded as failed, with the signature beside it. A few checks can never be signed off, because they guard the record itself and the workflow's own files. One signature carries forward: a sign-off on a failure about a stage already accepted holds at the later gates until that stage changes.

**A stage can be sent back.** A person may send an accepted stage back to be redone, with their name and reason. Its acceptance ends, the answers and decisions on it are kept on the record as withdrawn, and every later stage that has been through its gate is marked out of date, to be kept or redone once the stage is accepted again. Nothing is deleted.

**Stopping a run is final.** A person stops a run with their name and one of four reasons. Its documents stay where and as they are, still readable, and nothing can move the run on afterwards.

**A person's name is theirs to type.** Every decision, approval, agreement and sign-off records the name the person typed, as typed. No agent fills it in, and a name that is an agent's is refused.
