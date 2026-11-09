# SPOCK | Pilot Definition
---
## 1. Scope
The pilot delivers part of the product discovery workflow, from an initiative brief to a delivery-ready initiative for Jira, built as a single connected agentic workflow. It covers five capabilities, delivered by four agents, with a human review or selection point between each stage. A fifth agent, the Methodology Coach, sits alongside the workflow and is called on demand.

**In scope**
- Hypothesis Design: a defined, standardized set of problems from material provided as input.
- Competitive Analysis: the market and feature standard for the brief topic, as inspiration.
- Ideation: several product ideas for the user to choose from.
- Roadmapping: two or three MVP options and a product requirements document (PRD) for the selected option.
- Initiative Design: an initiative created in Jira based on the PRD.
- Methodology Coach: on-demand guidance on the discovery method itself, available at any moment and outside the sequence of stages.

**Out of scope**
- Synthetic research: the pilot does not generate simulated customers, synthetic personas, or AI-produced interview responses. No agent output is presented as customer evidence.

---
## 2. Workflow Description and Environment
The pilot delivers the front part of product discovery as a single connected workflow.

Goal is to bring level of standardization, quality enfocement and asset delivery to enable teams to focus on quality of the output and therefore increase speed and quality of the outcome. All that through agentic first discovery process integrated into Copilot environment.

Team starts with an initiative brief, two research steps run in parallel, and their findings feed a converging path that shapes a chosen idea into a delivery-ready initiative. Each agent performs one defined job and hands its result to the next.

It enables the team stays in control throughout: at each stage a person reviews the output and, where a choice is required, decides what moves forward. The agents prepare the structured work, and the people apply judgment and make the decisions.

```
                    ┌───────────────────┐
                    │  INITIATIVE BRIEF │
                    └─────────┬─────────┘
              ┌───────────────┴───────────────┐
              ▼                               ▼
   ┌───────────────────┐           ┌───────────────────┐
   │ 1  Competitive    │           │ 2  Hypothesis     │
   │    Analysis       │           │    Design         │
   │  → market &       │           │  → defined        │
   │    feature        │           │    problem        │
   │    standards      │           │    list           │
   └─────────┬─────────┘           └─────────┬─────────┘
             └───────────────┬───────────────┘
                             ▼
                  ┌───────────────────┐
                  │ 3  Ideation       │   ◆ Human in the Loop
                  │                   │     the user selects
                  │  → several ideas  │     the ideas to pursue
                  └─────────┬─────────┘
                            ▼
                  ┌───────────────────┐
                  │ 4  Roadmapping    │   ◆ Human in the Loop
                  │  → 2-3 MVP        │     the user selects an
                  │    options + PRD  │     MVP option and
                  │                   │     answers the questions
                  └─────────┬─────────┘
                            ▼
                  ┌───────────────────┐
                  │ 5  Initiative     │   ◆ Human in the Loop
                  │    Design         │     the team reviews
                  │  → Jira initiative│     before it becomes a
                  │                   │     delivery item
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
```

**The Methodology Coach sits outside the flow.** The five stages above run in sequence, each one handing its output to the next. The Methodology Coach does not. It is a standalone agent the user calls directly, at any moment, when a question about the method comes up: what a stage is for, why the steps are ordered as they are, what separates a well-framed problem from a poorly-framed one, or how to read what an agent has produced. It takes no input from the previous stage and passes nothing to the next. Calling it does not interrupt, advance, or alter the workflow, and a team can complete the pilot without ever using it.

**Environment.** The pilot runs inside the GitHub Copilot environment. All agents and their outputs are held in a single, shared repository. This keeps the pilot within a single environment, and means every input, output, and decision is recorded in one place and can be traced.

The agents run as one connected workflow rather than as separate assistants. Each agent reads its inputs from a defined place, produces its output in a set format under a fixed naming convention, and passes it to the next stage. Because each handoff is a saved file, every step can be reviewed, corrected, and reused, and no stage depends on information passed silently from the one before it.

---
## 3. Agent Description
The pilot is delivered by four agents in the workflow, supported by one standalone agent outside it. Each agent holds one or more skills. A skill is a single, focused job with defined inputs, a structured output, and a quality standard.

| Area                      | Agent                | Skills                                                       |
|---------------------------|----------------------|--------------------------------------------------------------|
| Market Intelligence       | Competitive Analysis | Landscape Mapping, Competitive Deep-Dive, Competitive Synthesis (TBC) |
| Research                  | Customer Research    | Hypothesis Designer (further skills TBC)                     |
| Product                   | Product Owner        | Ideation, Roadmapping                                        |
| Analysis & Specifications | Business Analyst     | Initiative Designer                                          |
| Method & Enablement       | Methodology Coach    | Methodology Guidance (further skills TBC)                    |

The first four agents each own one or more stages of the workflow. The Methodology Coach owns none; it is called on demand and sits outside the sequence.

### Competitive Analysis Agent
**Area:** Market Intelligence.  
**Skills:** Landscape Mapping, Competitive Deep-Dive, Competitive Synthesis (TBC).  

A market intelligence agent. It researches the global banking and fintech market and benchmarks it for a given product topic. Its Landscape Mapping skill surveys the market for the topic, Competitive Deep-Dive profiles the strongest players, and Competitive Synthesis distils the findings into the product and feature standards that represent the market norm.

### Customer Research Agent
**Area:** Research.  
**Skills:** Hypothesis Designer (further skills TBC).  

A research agent. It reads the material a team already holds and frames it as clear, testable problems. Its Hypothesis Designer skill separates evidence from assumption, recovers the real problem where a solution has already been assumed, and states the result as a standardized set of problems.

### Product Owner Agent
**Area:** Product.  
**Skills:** Ideation, Roadmapping.  

A product agent that owns the move from problem to defined scope. Its Ideation skill generates and frames candidate product ideas; its Roadmapping skill develops a chosen idea into MVP options and a PRD.

### Business Analyst Agent
**Area:** Analysis and Specifications.  
**Skills:** Initiative Designer.  

A delivery-analysis agent that prepares validated product direction for engineering. Its Initiative Designer skill structures an agreed direction into an initiative and records it in Jira.

### Methodology Coach Agent
**Area:** Method and Enablement.  
**Skills:** Methodology Guidance (further skills TBC).  
**Position:** Standalone; not a stage in the workflow.  

An enablement agent that explains the discovery method to the people running it. Its Methodology Guidance skill answers why the workflow is built the way it is, what each stage is for, what a good output at that stage looks like, and how to interpret what an agent has produced. It is the only agent that takes no handoff from a previous stage and passes nothing to a following one: the user calls it directly, at any moment, and it produces no workflow artifact. It advises on method, not on content. It does not judge whether a given competitive analysis, problem list, idea, or PRD is correct, does not approve or decide anything, and does not stand in for the accountable reviewer at any stage.

---
## 4. Workflow Process
Each step shows what feeds in, what it produces, and where a person reviews or decides. Steps 1 and 2 run in parallel; steps 3 to 5 run in sequence.

### Step #1: Competitive Analysis
**Input:** the initiative brief.
**Output:** the market and feature standards for the topic, each traced to its source; carried forward to Ideation.
**Human in the Loop:** the Product Owner reviews the standards before they are used as evidence.

### Step #2: Hypothesis Design
**Input:** the research material and context the team already holds.
**Output:** a standardized problem list, with the evidence, assumptions, and open questions behind it; carried forward to Ideation.
**Human in the Loop:** the Customer Researcher reviews the list to confirm the key problems.

### Step #3: Ideation
**Input:** the market and feature standards, the problem list, and any direction from the user.
**Output:** several ideas in a set format, ready to compare.
**Human in the Loop:** the Product Owner selects the ideas to take into roadmapping.

### Step #4: Roadmapping
**Input:** a selected idea, and the user's answers to the agent's questions.
**Output:** two or three MVP options, and a PRD for the option the user selects.
**Human in the Loop:** the Product Owner reviews and agrees the PRD. The agent does not approve scope.

### Step #5: Initiative Design
**Input:** the agreed PRD.
**Output:** an initiative in Jira (the Jira connection is still to be confirmed).
**Human in the Loop:** the Business Analyst and Product Owner review the initiative before it becomes a delivery item.

### Available at any point: Methodology Coach
Not a step. The user calls it directly, whenever a question about the method comes up, before starting, mid-stage, or after receiving an output.
**Input:** a question from the user, and the output being looked at where that helps.
**Output:** an explanation of the method, and where useful a pointer to the relevant part of it. Nothing is written into the workflow.
**Human in the Loop:** none required. The Coach produces no workflow output, so nothing it returns needs review before the workflow continues. It advises on method only and never substitutes for the accountable reviewer at a stage.

### Human oversight across the flow
Human review is not a single final step. It applies each time the workflow produces an output. Before that output is passed to the next stage or treated as a source of truth, an accountable person checks it for accuracy and completeness, challenges unsupported statements, and confirms it is fit for use.

The intended change in day-to-day work is that teams spend less time producing outputs and more time applying judgment, validating evidence, and making accountable decisions. The workflow provides structured assistance but accountability stays with people.
